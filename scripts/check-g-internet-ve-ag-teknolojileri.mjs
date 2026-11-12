// G · internet-ve-ag-teknolojileri: çekirdeğin bağımsız denetimi.
// Başvurular sayfanın kendi formüllerini yinelemez: BigInt adres aritmetiği, Floyd–Warshall,
// kapalı biçimler + Monte Carlo, elle sayılmış DNS sorguları. `--browser` ile arayüz denetimi (390 açık, 1280 koyu).
import fs from 'node:fs';
import vm from 'node:vm';
import assert from 'node:assert/strict';
import { canvasInk, canvasInkAll, assertCanvasDrawn } from './lib/canvas-check.mjs';
const SLUG='internet-ve-ag-teknolojileri';
const html=fs.readFileSync(new URL(`../${SLUG}.html`,import.meta.url),'utf8');
const source=html.split('/* KERNEL-BEGIN */')[1]?.split('/* KERNEL-END */')[0];
assert(source,'KERNEL-BEGIN / KERNEL-END sınırları gerekli');
const context={window:{}};vm.createContext(context);vm.runInContext(source+';globalThis.K=NetLab;',context);
const K=context.K;let checks=0;
const ok=(c,m)=>{assert(c,m);checks++;};
const eq=(a,b,m)=>{assert.equal(a,b,`${m||'eşitlik'}: ${String(a)} ≠ ${String(b)}`);checks++;};
const near=(a,b,tol,m)=>{assert(Math.abs(a-b)<=tol*Math.max(1,Math.abs(b)),`${m||''} ${a} ≠ ${b} (tol ${tol})`);checks++;};
const throws=(f,m)=>{assert.throws(f,undefined,m);checks++;};
// Testin kendi üreteci (sayfanınkinden farklı: 48 bit LCG, BigInt)
let lcg=0x1234ABCDn;const rnd=()=>{lcg=(lcg*25214903917n+11n)&((1n<<48n)-1n);return Number(lcg>>16n)/2**32;};
const rint=(a,b)=>a+Math.floor(rnd()*(b-a+1));

/* ---------- 1. IPv4: BigInt ile bağımsız aritmetik ---------- */
const big4=s=>s.split('.').reduce((v,o)=>v*256n+BigInt(o),0n);
const str4=v=>[24n,16n,8n,0n].map(sh=>((v>>sh)&255n).toString()).join('.');
for(let i=0;i<4000;i++){
  const a=BigInt(rint(0,65535))*65536n+BigInt(rint(0,65535)),p=i<33?i:rint(0,32),text=str4(a);
  eq(K.parseV4(text),Number(a));eq(K.fmtV4(Number(a)),text);
  const size=1n<<BigInt(32-p),net=a/size*size,last=net+size-1n,c=K.cidr(Number(a),p);
  eq(BigInt(c.network),net);eq(BigInt(c.total),size);eq(BigInt(c.mask),(1n<<32n)-size);eq(BigInt(c.wildcard),size-1n);
  if(p<=30){eq(BigInt(c.broadcast),last);eq(BigInt(c.first),net+1n);eq(BigInt(c.last),last-1n);eq(BigInt(c.usable),size-2n);}
  else if(p===31){eq(c.broadcast,null);eq(c.usable,2);eq(BigInt(c.first),net);eq(BigInt(c.last),net+1n);}
  else{eq(c.broadcast,null);eq(c.usable,1);eq(BigInt(c.first),a);eq(BigInt(c.last),a);}
  const b=rnd()<.5?net+BigInt(Math.floor(rnd()*Number(size))):BigInt(rint(0,65535))*65536n+BigInt(rint(0,65535));
  eq(K.sameSubnet(Number(a),Number(b),p),b/size===a/size);
}
for(const bad of['','1.2.3','1.2.3.4.5','256.1.1.1','192.0.2.300','1.2.3.-4','01.2.3.4','1.2.3.04','a.b.c.d','1..2.3','1.2.3.4/24','1,2,3,4','0x10.1.1.1','1.2.3.4 5','１.2.3.4'])throws(()=>K.parseV4(bad),'parseV4 '+bad);
for(const bad of[-1,33,1.5,NaN,'8'])throws(()=>K.maskOf(bad));
for(const bad of['192.0.2.0','192.0.2.0/33','192.0.2.0/-1','192.0.2.0/2.5','192.0.2.0/','/24','192.0.2.0/024'])throws(()=>K.parseCidr(bad),'parseCidr '+bad);
eq(K.parseCidr('192.0.2.0/24').prefix,24);
{const c=K.cidr(K.parseV4('192.0.2.77'),26);eq(K.fmtV4(c.network),'192.0.2.64');eq(K.fmtV4(c.broadcast),'192.0.2.127');eq(c.usable,62);eq(K.fmtV4(c.mask),'255.255.255.192');
 eq(K.cidr(K.parseV4('172.16.5.200'),20).network,K.parseV4('172.16.0.0'));eq(K.fmtV4(K.cidr(K.parseV4('172.16.5.200'),20).broadcast),'172.16.15.255');eq(K.cidr(0,0).total,4294967296);}
// Özel aralıklar: RFC 1918 / 5737 uçları
for(const[a,frag]of[['10.255.255.255','10.0.0.0/8'],['11.0.0.0','Genel'],['172.15.255.255','Genel'],['172.16.0.0','172.16.0.0/12'],['172.31.255.255','172.16.0.0/12'],['172.32.0.0','Genel'],['192.168.1.1','192.168.0.0/16'],['192.0.2.1','TEST-NET-1'],['198.51.100.7','TEST-NET-2'],['203.0.113.9','TEST-NET-3'],['203.0.114.0','Genel'],['127.0.0.1','Geri döngü'],['169.254.1.1','Bağlantı-yerel'],['224.0.0.1','Çoklu yayın'],['100.64.0.1','100.64.0.0/10'],['100.128.0.0','Genel'],['8.8.8.8','Genel']])ok(K.classify(K.parseV4(a)).includes(frag),'classify '+a);

/* VLSM: çakışmama, hizalama, en küçük yeten blok */
for(let i=0;i<600;i++){
  const bp=rint(8,26),base=(BigInt(rint(0,65535))*65536n+BigInt(rint(0,65535)))>>BigInt(32-bp)<<BigInt(32-bp),n=rint(1,6),hosts=Array.from({length:n},()=>rint(1,Math.max(1,2**(32-bp)/rint(2,16))));
  let need=0n;const sizes=hosts.map(h=>{let b=2n;while((1n<<b)<BigInt(h)+2n)b++;return 1n<<b;});sizes.forEach(x=>need+=x);
  const total=1n<<BigInt(32-bp);
  if(need>total){throws(()=>K.vlsm(Number(base),bp,hosts),'vlsm taşma');continue;}
  const v=K.vlsm(Number(base),bp,hosts);eq(v.allocs.length,n);eq(BigInt(v.used),need);eq(BigInt(v.free),total-need);
  const seen=[];
  for(const a of v.allocs){const sz=BigInt(a.size),net=BigInt(a.network);
    eq(net%sz,0n);ok(net>=base&&net+sz<=base+total,'blok içinde');ok(a.usable>=a.hosts,'yeter');ok(a.size===4||a.size/2-2<a.hosts,'en küçük blok');eq(a.usable,a.size-2);eq(BigInt(a.broadcast),net+sz-1n);eq(a.size,2**(32-a.prefix));
    for(const[s,e]of seen)ok(net>=e||net+sz<=s,'çakışma yok');seen.push([net,net+sz]);}
  eq(v.allocs.map(a=>a.hosts).sort((x,y)=>x-y).join(),hosts.slice().sort((x,y)=>x-y).join());
}
{const v=K.vlsm(K.parseV4('192.0.2.0'),24,[100,50,20,2]);eq(v.allocs.map(a=>K.fmtV4(a.network)+'/'+a.prefix).join(' '),'192.0.2.0/25 192.0.2.128/26 192.0.2.192/27 192.0.2.224/30');eq(v.used,228);eq(v.free,28);
 const e=K.vlsm(K.parseV4('192.0.2.0'),24,[62,62,62,62]);eq(e.free,0);eq(e.freeStart,null);eq(e.allocs.every(a=>a.prefix===26),true);
 throws(()=>K.vlsm(K.parseV4('192.0.2.0'),24,[200,100]));throws(()=>K.vlsm(K.parseV4('192.0.2.1'),24,[10]));throws(()=>K.vlsm(K.parseV4('192.0.2.0'),24,[]));throws(()=>K.vlsm(K.parseV4('192.0.2.0'),24,[0]));throws(()=>K.vlsm(K.parseV4('192.0.2.0'),24,[2.5]));}
// Sığmayan istek: ileti toplam gereksinimi ve blok boyunu söyler (yalnız son isteği suçlamaz)
{let m='';try{K.vlsm(K.parseV4('192.0.2.0'),24,[100,50,20,2,26]);}catch(e){m=e.message;}ok(/sığmıyor/.test(m)&&/toplam 260 adres/.test(m)&&/blokta 256 adres/.test(m)&&/2 cihazlık alt ağ \(\/30, 4 adres\)/.test(m),'VLSM taşma iletisi: '+m);
 m='';try{K.vlsm(K.parseV4('10.0.0.0'),8,[16777214,2]);}catch(e){m=e.message;}ok(/toplam 16\.777\.220 adres/.test(m)&&/blokta 16\.777\.216 adres/.test(m),'VLSM taşma iletisi binlik ayırıcı: '+m);}
/* En uzun önek: kaba kuvvet */
for(let i=0;i<3000;i++){
  const pick=K.ROUTES[rint(0,K.ROUTES.length-1)],a=rnd()<.7?big4(pick[0])+BigInt(rint(0,255)):BigInt(rint(0,65535))*65536n+BigInt(rint(0,65535));
  let best=-1,bl=-1;const m=[];K.ROUTES.forEach((r,j)=>{const sz=1n<<BigInt(32-r[1]);if(a/sz===big4(r[0])/sz){m.push(j);if(r[1]>bl){bl=r[1];best=j;}}});
  const res=K.lpm(K.ROUTES,Number(a&0xFFFFFFFFn));eq(res.best,best);eq(res.matches.join(),m.join());
}
eq(K.ROUTES[K.lpm(K.ROUTES,K.parseV4('203.0.113.200')).best][1],27);eq(K.ROUTES[K.lpm(K.ROUTES,K.parseV4('203.0.113.140')).best][1],25);eq(K.ROUTES[K.lpm(K.ROUTES,K.parseV4('192.0.2.70')).best][1],26);eq(K.ROUTES[K.lpm(K.ROUTES,K.parseV4('198.18.0.1')).best][1],0);

/* ---------- IPv6: bağımsız BigInt ayrıştırıcı ve RFC 5952 örnekleri ---------- */
const ref6=v=>{const g=[];for(let i=7n;i>=0n;i--)g.push((v>>(16n*i))&0xFFFFn);let bs=-1,bl=0,cs=-1,cl=0;g.forEach((x,i)=>{if(x===0n){if(cs<0){cs=i;cl=0;}cl++;if(cl>bl){bs=cs;bl=cl;}}else cs=-1;});
  const h=a=>a.map(x=>x.toString(16)).join(':');return bl<2?h(g):h(g.slice(0,bs))+'::'+h(g.slice(bs+bl));};
for(let i=0;i<3000;i++){
  let v=0n;const zeroP=rnd();for(let k=0;k<8;k++)v=(v<<16n)|(rnd()<zeroP?0n:BigInt(rint(0,rnd()<.5?255:65535)));
  eq(K.compressV6(v),ref6(v));eq(K.parseV6(K.compressV6(v)),v);eq(K.parseV6(K.fullV6(v)),v);eq(K.parseV6(K.shortV6(v).toUpperCase()),v);eq(K.fullV6(v).length,39);
  eq(K.fullV6(v),v.toString(16).padStart(32,'0').match(/.{4}/g).join(':'));
}
for(const[a,b]of[['2001:0db8:0000:0000:0000:ff00:0042:8329','2001:db8::ff00:42:8329'],['2001:db8:0:0:1:0:0:1','2001:db8::1:0:0:1'],['2001:0db8::0001','2001:db8::1'],['2001:db8:0:1:1:1:1:1','2001:db8:0:1:1:1:1:1'],['2001:0:0:1:0:0:0:1','2001:0:0:1::1'],['2001:DB8:AAAA:BBBB:CCCC:DDDD:EEEE:0001','2001:db8:aaaa:bbbb:cccc:dddd:eeee:1'],['0:0:0:0:0:0:0:0','::'],['0:0:0:0:0:0:0:1','::1'],['1:0:0:0:0:0:0:0','1::'],['1:2:3:4:5:6:7::','1:2:3:4:5:6:7:0'],['::2:3:4:5:6:7:8','0:2:3:4:5:6:7:8']])eq(K.compressV6(K.parseV6(a)),b,a);
for(const bad of['','2001:db8::1::1',':::','1:2:3:4:5:6:7','1:2:3:4:5:6:7:8:9','12345::1','g::1','::ffff:192.0.2.1','1:2:3:4:5:6:7:8::','::1:2:3:4:5:6:7:8','fe80::1%eth0','1::2:3:4:5:6:7:8','2001:db8:::1',':1:2:3:4:5:6:7','1:2:3:4:5:6:7:','2001:db8::/32'])throws(()=>K.parseV6(bad),'parseV6 '+bad);
eq((2n**128n).toString(),'340282366920938463463374607431768211456');

/* ---------- 2. Yönlendirme: Floyd–Warshall ile karşılaştırma ---------- */
const NN=K.TOPO.nodes.length;
function floyd(links,weight){const d=Array.from({length:NN},(_,i)=>Array.from({length:NN},(_,j)=>i===j?0:Infinity));for(const l of links)if(l.up){const w=weight(l);d[l.a][l.b]=Math.min(d[l.a][l.b],w);d[l.b][l.a]=Math.min(d[l.b][l.a],w);}
  for(let k=0;k<NN;k++)for(let i=0;i<NN;i++)for(let j=0;j<NN;j++)if(d[i][k]+d[k][j]<d[i][j])d[i][j]=d[i][k]+d[k][j];return d;}
for(let trial=0;trial<400;trial++){
  const links=K.defaultLinks();
  if(trial){for(const l of links){l.delay=rint(1,40);l.up=rnd()>.22;}}
  const fwD=floyd(links,l=>l.delay),fwH=floyd(links,()=>1),BIG=1e4,fwDH=floyd(links,l=>l.delay*BIG+1),fwHD=floyd(links,l=>BIG+l.delay);
  for(const metric of['delay','hop']){
    for(let s=0;s<NN;s++){const t=K.spf(NN,links,s,metric);
      for(let v=0;v<NN;v++){
        if(!Number.isFinite(fwD[s][v])){eq(t.delay[v],Infinity);continue;}
        if(metric==='delay'){eq(t.delay[v],fwD[s][v]);eq(t.delay[v]*BIG+t.hops[v],fwDH[s][v]);}
        else{eq(t.hops[v],fwH[s][v]);eq(t.hops[v]*BIG+t.delay[v],fwHD[s][v]);}
      }}
    const dproc=rint(0,50)/10,r=K.forward({links,dproc,ttl:64,metric}),dst=NN-1;
    if(!Number.isFinite(fwD[0][dst])){eq(r.status,'unreachable');ok(K.traceroute({links,dproc,metric}).at(-1).reply==='unreachable');continue;}
    eq(r.status,'ok');eq(r.path[0],0);eq(r.path.at(-1),dst);
    let sum=0;for(let i=0;i<r.path.length-1;i++){const l=links.find(x=>x.up&&((x.a===r.path[i]&&x.b===r.path[i+1])||(x.b===r.path[i]&&x.a===r.path[i+1])));ok(l,'yol üzerindeki bağlantı var ve açık');sum+=l.delay;}
    eq(new Set(r.path).size,r.path.length);eq(r.linkSum,sum);eq(r.routers,r.path.length-2);eq(r.ttl,64-r.routers);
    const hopsRef=metric==='delay'?fwDH[0][dst]%BIG:fwH[0][dst],delayRef=metric==='delay'?fwD[0][dst]:fwHD[0][dst]%BIG;
    eq(r.path.length-1,hopsRef);eq(sum,delayRef);near(r.time,delayRef+(hopsRef-1)*dproc,1e-12);
    // TTL: k < yönlendirici sayısı + 1 ise k. yönlendiricide atılır
    for(let k=1;k<=r.routers;k++){const x=K.forward({links,dproc,ttl:k,metric});eq(x.status,'ttl');eq(x.at,r.path[k]);eq(x.ttl,0);}
    eq(K.forward({links,dproc,ttl:r.routers+1,metric}).status,'ok');eq(K.forward({links,dproc,ttl:r.routers+1,metric}).ttl,1);
    const tr=K.traceroute({links,dproc,metric});eq(tr.length,r.path.length-1);tr.forEach((row,i)=>{eq(row.node,r.path[i+1]);eq(row.hop,i+1);});
    near(tr.at(-1).oneWay,r.time,1e-12);near(tr.at(-1).rtt,2*r.time,1e-12);eq(tr.at(-1).reply,'echo');
    for(let i=1;i<tr.length;i++)ok(tr[i].oneWay>tr[i-1].oneWay,'kümülatif gecikme artar');
  }
}
{const L=K.defaultLinks(),name=p=>p.map(i=>K.TOPO.nodes[i].id).join('-');
 const d=K.forward({links:L,dproc:.5,ttl:64,metric:'delay'});eq(name(d.path),'K-R1-R3-R5-R4-R6-H');eq(d.time,22.5);eq(d.linkSum,20);eq(d.ttl,59);
 const h=K.forward({links:L,dproc:.5,ttl:64,metric:'hop'});eq(name(h.path),'K-R1-R2-R4-R6-H');eq(h.time,24);eq(h.ttl,60);
 const t3=K.forward({links:L,dproc:.5,ttl:3});eq(t3.status,'ttl');eq(K.TOPO.nodes[t3.at].id,'R5');eq(t3.time,13);
 L[6].up=false;const c=K.forward({links:L,dproc:.5,ttl:64});eq(name(c.path),'K-R1-R2-R4-R6-H');eq(c.time,24);
 L[0].up=false;const u=K.forward({links:L,dproc:.5,ttl:64});eq(u.status,'unreachable');eq(u.at,0);
 eq(K.traceroute({links:K.defaultLinks(),dproc:.5}).map(r=>r.rtt).join(),'2.5,11.5,26.5,31.5,42.5,45');
 throws(()=>K.forward({links:K.defaultLinks(),ttl:0}));throws(()=>K.forward({links:K.defaultLinks(),ttl:1.5}));throws(()=>K.spf(NN,K.defaultLinks(),0,'x'));}

/* ---------- Sarmalama: bayt bayt bağımsız sayım ---------- */
for(const ip of[4,6])for(const mtu of[1280,1500,9000])for(const payload of[0,1,5,6,7,25,26,27,100,1000,mtu-(ip===4?40:60)-1,mtu-(ip===4?40:60),mtu-(ip===4?40:60)+1,4000,8999,9000,20000]){
  const ipH=ip===4?20:40,e=K.encapsulate(payload,ip,mtu);let left=payload,frames=0,total=0,pad=0;
  do{const take=Math.min(left,mtu-ipH-20);left-=take;let ethPayload=take+20+ipH;if(ethPayload<46){pad+=46-ethPayload;ethPayload=46;}ok(ethPayload<=mtu,'MTU aşılmaz');total+=14+ethPayload+4;frames++;}while(left>0);
  eq(e.count,frames);eq(e.frameBytes,total);eq(e.pad,pad);eq(e.headerBytes,total-payload);eq(e.wireBytes,total+20*frames);eq(e.segs.reduce((s,x)=>s+x.data,0),payload);ok(e.segs.every(s=>s.frame>=64&&s.frame<=mtu+18),'çerçeve 64…MTU+18');
  near(e.overhead,(total-payload)/total,1e-12);
}
eq(K.encapsulate(1000,4,1500).frameBytes,1058);eq(K.encapsulate(1,4,1500).frameBytes,64);eq(K.encapsulate(1,4,1500).pad,5);eq(K.encapsulate(1460,4,1500).frameBytes,1518);eq(K.encapsulate(4000,4,1500).count,3);eq(K.encapsulate(4000,4,1500).frameBytes,4174);eq(K.encapsulate(4000,6,1500).mss,1440);
throws(()=>K.encapsulate(-1,4,1500));throws(()=>K.encapsulate(10,5,1500));throws(()=>K.encapsulate(10,6,576));throws(()=>K.encapsulate(1.5,4,1500));

/* ---------- 3. ARQ: kesin durumlar + Monte Carlo ---------- */
// Kayıpsız kanal: kesin sayılar
for(const r of[1,4,9])for(const W of[1,3,8,32])for(const g of[0,3]){
  const sw=K.arq({proto:'sw',W,r,g,p:0,q:0,N:500,seed:3});eq(sw.tx,500);eq(sw.slots,500*(1+r));eq(sw.timeouts,0);
  for(const proto of['gbn','sr']){const s=K.arq({proto,W,r,g,p:0,q:0,N:500,seed:3});eq(s.tx,500);eq(s.retx,0);eq(s.timeouts,0);
    if(W>=1+r)eq(s.slots,500+r);else ok(Math.abs(s.slots-500*(1+r)/W)<=2+r,'pencere sınırlı hız W/(1+r)');}
}
// Aynı tohum aynı sonucu verir; tohum değişince değişir
{const c={proto:'gbn',W:8,r:4,g:0,p:.1,q:0,N:2000,seed:2026},a=K.arq(c),b=K.arq(c),d=K.arq({...c,seed:2027});eq(a.tx,b.tx);eq(a.slots,b.slots);ok(a.tx!==d.tx||a.slots!==d.slots,'tohum etkili');ok(a.tx>=2000&&a.slots>=a.tx,'tx ≥ N, dilim ≥ tx');eq(a.tx+a.idle,a.slots);}
// Bağımsız Monte Carlo (testin kendi üreteci): dur ve bekle için deneme sayısı ve dilim
function swReference(p,q,r,g,N){let tx=0,slots=0;for(let i=0;i<N;i++){for(;;){tx++;if(rnd()>=p&&rnd()>=q){slots+=1+r;break;}slots+=1+r+g;}}return{tx:tx/N,slots:slots/N};}
const many=(cfg,seeds,N)=>{let tx=0,slots=0;for(let s=1;s<=seeds;s++){const x=K.arq({...cfg,N,seed:s*7919+13});tx+=x.tx;slots+=x.slots;}return{tx:tx/(seeds*N),slots:slots/(seeds*N)};};
for(const[r,g,p,q]of[[4,0,.1,0],[2,3,.3,0],[6,0,.2,.1],[1,0,.45,.25],[10,5,.05,.05]]){
  const s=(1-p)*(1-q),TO=1+r+g,m=many({proto:'sw',W:1,r,g,p,q},12,20000),ref=swReference(p,q,r,g,240000),th=K.arqTheory({proto:'sw',W:1,r,g,p,q});
  near(m.tx,1/s,.012,'DB gönderim');near(m.slots,(1+r)+(1/s-1)*TO,.012,'DB dilim');near(ref.tx,1/s,.012,'başvuru MC');near(m.tx,ref.tx,.02,'MC–MC');near(m.slots,ref.slots,.02,'MC–MC dilim');
  near(th.txPer,1/s,1e-12);near(th.slotsPer,(1+r)+(1/s-1)*TO,1e-12);near(th.efficiency*th.slotsPer,1,1e-12);
}
// N geri git, q = 0: gönderim/paket = 1 + min(W, TO)·p/(1−p); W ≥ 1+r ise dilim/paket = 1 + TO·p/(1−p)
for(const[W,r,g,p]of[[8,4,0,.1],[5,4,0,.2],[16,4,0,.3],[8,4,2,.1],[6,4,3,.15],[4,6,0,.2],[2,9,0,.1],[3,5,4,.25],[32,20,0,.02],[32,3,10,.4],[1,4,0,.2]]){
  const m=many({proto:'gbn',W,r,g,p,q:0},12,20000),TO=1+r+g,th=K.arqTheory({proto:'gbn',W,r,g,p,q:0});
  near(m.tx,1+Math.min(W,TO)*p/(1-p),.015,`GBN gönderim W=${W} r=${r} g=${g} p=${p}`);near(th.txPer,1+Math.min(W,TO)*p/(1-p),1e-12);
  if(W>=1+r){near(m.slots,1+TO*p/(1-p),.015,`GBN dilim W=${W} r=${r}`);near(th.slotsPer,1+TO*p/(1-p),1e-12);}else{eq(th.slotsPer,null);eq(th.slotsWhy,'window');}
}
eq(K.arqTheory({proto:'gbn',W:8,r:4,g:0,p:.1,q:.1}).txPer,null);
// Seçici yineleme: gönderim/paket = 1/s (kesin); verim üst sınırı aşılmaz
for(const[W,r,g,p,q]of[[8,4,0,.1,0],[4,6,0,.2,0],[8,4,2,.1,.1],[16,4,0,.3,0],[32,10,0,.4,.2],[2,3,5,.25,0],[1,4,0,.2,.1]]){
  const s=(1-p)*(1-q),m=many({proto:'sr',W,r,g,p,q},12,20000),th=K.arqTheory({proto:'sr',W,r,g,p,q}),swSlots=(1+r)+(1/s-1)*(1+r+g);
  near(m.tx,1/s,.012,'SR gönderim');eq(th.bound,true);near(th.efficiency,Math.min(s,W/swSlots),1e-12);ok(1/m.slots<=th.efficiency*1.005,`SR verim ≤ sınır (W=${W})`);
  if(W===1)near(m.slots,swSlots,.012,'SR W=1 ≡ dur ve bekle');
}
// Sıralama: aynı kanalda verim DB ≤ GBN ≤ SR (ortalama)
{const c={W:8,r:4,g:0,p:.1,q:0},a=many({...c,proto:'sw'},6,10000),b=many({...c,proto:'gbn'},6,10000),d=many({...c,proto:'sr'},6,10000);ok(a.slots>b.slots&&b.slots>d.slots,'verim sırası');}
// Günlük: her kayıt bir dilim, sıra numaraları geçerli
{const s=K.arq({proto:'sr',W:8,r:4,g:0,p:.2,q:.1,N:300,seed:5,logSlots:200});ok(s.log.length>0&&s.log.every((e,i)=>e.t<200&&e.seq>=0&&e.seq<300&&(i===0||e.t>s.log[i-1].t)),'günlük sıralı');ok(s.log.filter(e=>e.outcome==='deliver'||e.outcome==='buffer').length<=300,'her paket bir kez kabul');}
for(const bad of[{proto:'x'},{p:1},{p:-.1},{W:0},{r:0},{N:0},{g:-1},{q:1}])throws(()=>K.arq({proto:'gbn',W:8,r:4,g:0,p:.1,q:0,N:10,seed:1,...bad}));

/* ---------- Tıkanıklık: kapalı biçimler ---------- */
for(let W=8;W<=100;W++)for(const ss of[2,16,64]){
  const fl=Math.floor(W/2),r=K.congestion({wmax:W,ssthresh:ss,rounds:1200,mode:'reno'});
  near(r.mean,(fl+W)/2,1e-12,'Reno ortalaması');near(r.cycleLen,W-fl+1,1e-12);near(r.ideal,.75*W,1e-12);if(W%2===0)near(r.mean,.75*W,1e-12);else near(r.ideal-r.mean,.25,1e-12);
  ok(r.w.every(v=>v>=1&&v<=W),'1 ≤ cwnd ≤ W_max');ok(r.losses.every(k=>r.w[k]===W),'kayıp W_max turunda');
  // Zaman aşımı tepkisi: 1,2,4,… (< eşik), sonra eşik…W
  const t=K.congestion({wmax:W,ssthresh:ss,rounds:1200,mode:'tahoe'});let sum=0,len=0;for(let v=1;v<fl;v*=2){sum+=v;len++;}for(let v=fl;v<=W;v++){sum+=v;len++;}
  near(t.mean,sum/len,1e-12,'Tahoe ortalaması W='+W);near(t.cycleLen,len,1e-12);ok(t.mean<r.mean,'1’e inmek ortalamayı düşürür');
}
{const c=K.congestion({wmax:40,ssthresh:16,rounds:200,mode:'reno'});eq(c.w.slice(0,6).join(),'1,2,4,8,16,17');eq(c.mean,30);eq(c.losses[0],28);eq(c.cycleLen,21);eq(c.losses.length,9);
 eq(K.congestion({wmax:100,ssthresh:16,rounds:60,mode:'reno'}).mean,null);near(K.congestion({wmax:40,ssthresh:16,rounds:200,mode:'tahoe'}).mean,661/26,1e-12);
 throws(()=>K.congestion({wmax:3,ssthresh:16,rounds:10,mode:'reno'}));throws(()=>K.congestion({wmax:40,ssthresh:16,rounds:10,mode:'cubic'}));}

/* ---------- 4. DNS ---------- */
// Elle sayılmış soğuk çözümlemeler: [ad, tür, durum, sorgu, ms, yanıt]
const coldCases=[['www.example.com','A','ok',4,110,'192.0.2.10'],['example.com','A','ok',3,90,'192.0.2.10'],['example.com','AAAA','ok',3,90,'2001:db8:10::10'],['example.com','MX','ok',3,90,'10 posta.example.com'],['example.com','NS','ok',3,90,'ns1.example.com'],
 ['www.example.com','CNAME','ok',3,90,'example.com'],['dukkan.example.com','A','ok',7,205,'198.51.100.80'],['blog.example.com','AAAA','ok',6,185,'2001:db8:80::80'],['ders.okul.example','A','ok',9,285,'203.0.113.80'],
 ['kutuphane.okul.example','AAAA','ok',3,85,'2001:db8:113::110'],['yok.example.com','A','nxdomain',3,90,null],['posta.example.com','AAAA','nodata',3,90,null],['a.b.zzz','A','nxdomain',1,30,null],['com','NS','ok',2,70,'a.tld-com.test'],['yok.example','A','nxdomain',2,70,null],['WWW.Example.COM.','A','ok',4,110,'192.0.2.10']];
for(const[name,type,st,q,ms,ans]of coldCases){const r=K.resolve(K.createResolver(),name,type);eq(r.status,st,name);eq(r.queries,q,name+' sorgu');eq(r.time,ms,name+' ms');if(ans)eq(r.answers[0],ans);eq(r.steps.filter(s=>!s.cache).length,q);}
// Bağımsız sayım: zincirdeki her ad için henüz öğrenilmemiş bölge kesimleri + 1
const zoneNames=K.ZONES.map(z=>z.zone),zonePath=n=>{const out=[''];const labs=n.split('.');for(let i=labs.length-1;i>=0;i--){const suf=labs.slice(i).join('.');if(zoneNames.includes(suf))out.push(suf);}return out;};
const recOf=n=>{const zp=zonePath(n),z=K.ZONES.find(x=>x.zone===zp.at(-1));return z.rec[n]||null;};
for(const z of K.ZONES)for(const name of Object.keys(z.rec))for(const type of K.DNS_TYPES){
  const known=new Set(['']);let cur=name,expect=0,status='ok';
  for(let guard=0;guard<8;guard++){const zp=zonePath(cur);let fresh=zp.filter(x=>!known.has(x)).length;zp.forEach(x=>known.add(x));expect+=fresh+1;const rec=recOf(cur);
    if(!rec){status='nxdomain';break;}if(rec[type])break;if(rec.CNAME&&type!=='CNAME'){cur=rec.CNAME[0];continue;}status='nodata';break;}
  const st=K.createResolver(),r=K.resolve(st,name,type);eq(r.queries,expect,name+' '+type);eq(r.status,status);
  const warm=K.resolve(st,name,type);eq(warm.queries,0,'ılık: 0 sorgu');eq(warm.status,status);eq(warm.answers.join(),r.answers.join());
}
// TTL saati
{const st=K.createResolver(),q=()=>K.resolve(st,'www.example.com','A').queries;eq(q(),4);eq(q(),0);K.advance(st,299);eq(q(),0);K.advance(st,2);eq(q(),1);eq(q(),0);K.advance(st,300);eq(q(),2);
 K.advance(st,3000);eq(q(),3);K.advance(st,3601);eq(q(),3);K.advance(st,86400);eq(q(),4);
 const s2=K.createResolver();K.resolve(s2,'www.example.com','A');eq(K.resolve(s2,'posta.example.com','A').queries,1);eq(K.resolve(s2,'example.net','A').queries,3);eq(K.resolve(s2,'example.org','A').queries,3);eq(K.resolve(s2,'barindirma.example.net','A').queries,1);
 const s3=K.createResolver();eq(K.resolve(s3,'yok.example.com','A').queries,3);eq(K.resolve(s3,'yok.example.com','A').queries,0);eq(K.resolve(s3,'yok.example.com','AAAA').queries,0);K.advance(s3,60);eq(K.resolve(s3,'yok.example.com','A').queries,1);
 const s4=K.createResolver();K.resolve(s4,'www.example.com','A');eq(K.cacheView(s4).length,4);K.advance(s4,600);eq(K.cacheView(s4).length,2);K.advance(s4,3000);eq(K.cacheView(s4).length,1);K.advance(s4,90000);eq(K.cacheView(s4).length,0);
 eq(K.serverAnswer('','www.example.com','A').kind,'referral');eq(K.serverAnswer('com','www.example.com','A').zone,'example.com');eq(K.serverAnswer('example.com','www.example.com','A').kind,'cname');eq(K.serverAnswer('example.com','www.example.net','A').kind,'refused');}
for(const bad of['','.','a..b','-a.com','a-.com','çay.example','a b.com','a_b.com','x'.repeat(64)+'.com',('a'.repeat(60)+'.').repeat(5)+'com','http://example.com','example.com/'])throws(()=>K.validName(bad),'validName '+bad);
eq(K.validName(' Example.COM. '),'example.com');throws(()=>K.resolve(K.createResolver(),'example.com','TXT'));
// Belgeleme aralıkları: modeldeki her IPv4 adresi RFC 5737 bloklarında, her IPv6 adresi 2001:db8::/32 içinde
const all4=[...K.TOPO.nodes.map(n=>n.addr),...K.ZONES.map(z=>z.addr),...K.ZONES.flatMap(z=>Object.values(z.rec).flatMap(r=>r.A||[]))];
for(const a of all4)ok(/TEST-NET/.test(K.classify(K.parseV4(a))),'belgeleme adresi '+a);
for(const a of K.ZONES.flatMap(z=>Object.values(z.rec).flatMap(r=>r.AAAA||[])))eq(K.parseV6(a)>>96n,0x20010db8n);
for(const n of K.ZONES.flatMap(z=>Object.keys(z.rec)))ok(/^(com|net|org)$|(^|\.)example(\.com|\.net|\.org)?$/.test(n),'ayrılmış ad '+n);
ok(Object.isFrozen(K)&&Object.isFrozen(K.ZONES)&&Object.isFrozen(K.TOPO.links),'çekirdek dondurulmuş');
// Sayfa iskeleti
ok(/<h1>[^<]+<\/h1>/.test(html),'<h1> var');eq((html.match(/<p class="hint">/g)||[]).length,1);ok(!/[̀-ͯ]/.test(html),'birleşik işaret yok');ok(!/\p{Extended_Pictographic}/u.test(html.replace(/[←→↑↓©®™]/g,'')),'emoji yok');
ok(!/sınıf(ı)? [ABC]\b|[ABC] sınıfı/i.test(html),'sınıflı adresleme güncel diye sunulmuyor');ok(!/93\.184\.216\.34/.test(html),'eski example.com adresi yok');ok(!/https?:\/\/(?!www\.rfc-editor\.org)[^"']+\.(js|css)/.test(html),'dış betik yok');
console.log(`G ${SLUG}: ${checks.toLocaleString('tr-TR')} bağımsız çekirdek denetimi PASS`);

if(process.argv.includes('--browser')){
  const{chromium}=await import('playwright');const{createServer}=await import('node:http');const{join,extname}=await import('node:path');const{fileURLToPath}=await import('node:url');
  const root=fileURLToPath(new URL('../',import.meta.url));
  const server=createServer((req,res)=>{const file=join(root,decodeURIComponent(new URL(req.url,'http://localhost').pathname));if(!fs.existsSync(file)||fs.statSync(file).isDirectory()){res.writeHead(404).end();return;}res.setHeader('Content-Type',({'.html':'text/html; charset=utf-8','.js':'text/javascript; charset=utf-8','.css':'text/css; charset=utf-8'})[extname(file)]||'application/octet-stream');res.end(fs.readFileSync(file));});
  await new Promise(r=>server.listen(0,'127.0.0.1',r));let browser,code=0;
  try{
    browser=await chromium.launch();
    for(const[theme,width]of[['light',390],['dark',1280]]){
      const before=checks,ctx=await browser.newContext({viewport:{width,height:900},deviceScaleFactor:width<500?2:1,locale:'tr-TR'}),page=await ctx.newPage();
      await page.addInitScript(t=>{localStorage.setItem('acelya-theme',t);localStorage.setItem('acelya-sound-muted','1');},theme);
      page.setDefaultTimeout(6000);const errors=[];page.on('pageerror',e=>errors.push(e.message));page.on('console',m=>{if(m.type()==='error'&&!/Failed to load resource/.test(m.text()))errors.push(m.text());});
      await page.goto(`http://127.0.0.1:${server.address().port}/${SLUG}.html`);await page.waitForFunction(()=>window.NetLab&&document.getElementById('routeMeasured').textContent);
      const click=id=>page.locator('#'+id).click(),read=async id=>(await page.locator('#'+id).textContent()).trim();
      const has=async(id,t)=>{const v=await read(id);assert(v.includes(t),`[${width}] #${id}: “${v}” içinde “${t}” yok`);checks++;};
      const is=async(id,t)=>{const v=await read(id);assert.equal(v,t,`[${width}] #${id}`);checks++;};
      const range=(id,v)=>page.locator('#'+id).evaluate((e,v)=>{e.value=v;e.dispatchEvent(new Event('input',{bubbles:true}));},String(v));
      const type=async(id,v)=>{await page.locator('#'+id).fill(v);};
      const choose=(id,v)=>page.locator('#'+id).selectOption(v);
      const noOverflow=async tag=>{const[sw,iw]=await page.evaluate(()=>[document.documentElement.scrollWidth,innerWidth]);assert(sw<=iw,`[${width}] ${tag}: yatay taşma ${sw} > ${iw}`);checks++;};
      const painted=async id=>{assertCanvasDrawn(await canvasInk(page,'#'+id),{minDistinct:4,label:`[${width}] ${id}`});checks++;};
      eq(await page.evaluate(()=>document.documentElement.dataset.theme||'dark'),theme);
      eq(await page.locator('h1').count(),1);eq(await page.locator('main.app-content > p.hint').count(),1);
      // Erişilebilirlik: her denetimin etiketi, her tuvalin rolü
      const unlabeled=await page.evaluate(()=>[...document.querySelectorAll('main.app-content input,main.app-content select')].filter(e=>!e.closest('.digest-root,[data-digest]')&&!document.querySelector('label[for="'+e.id+'"]')).map(e=>e.id));
      assert.deepEqual(unlabeled,[]);checks++;
      eq(await page.evaluate(()=>[...document.querySelectorAll('canvas.nt-canvas')].every(c=>c.getAttribute('role')==='img'&&c.getAttribute('aria-label'))),true);
      eq(await page.evaluate(()=>Object.isFrozen(NetLab)&&!Object.getOwnPropertyDescriptor(window,'NetLab').writable),true);

      /* 01 */
      await is('routeMeasured','22,5 ms');await is('routeTheory','22,5 ms');await is('routeDiff','0,0 ms');await is('routeTtlEnd','59');await is('routeHops','6 bağlantı · 5 yönlendirici');await is('routeRtt','45,0 ms');
      await has('routeStatus','K → R1 → R3 → R5 → R4 → R6 → H');await has('routeStatus','1 + 4 + 7 + 2 + 5 + 1 = 20 ms');await has('traceRows','203.0.113.20');eq(await page.locator('#traceRows tr').count(),6);eq(await page.locator('#fwdRows tr').count(),7);await painted('routeCanvas');
      await click('routeCut');await is('routeMeasured','24,0 ms');await has('routeStatus','Kopuk bağlantı: R3–R5');await has('routeStatus','K → R1 → R2 → R4 → R6 → H');await is('routeTtlEnd','60');await has('linkToggle','onar');
      await click('linkToggle');await is('routeMeasured','22,5 ms');
      await click('routeTtl3');await is('routeMeasured','Varmadı · TTL bitti');await has('routeTtlEnd','R5');await has('routeStatus','en az 6');eq(await page.locator('#routeStatus').evaluate(e=>e.classList.contains('nt-bad')),true);
      await range('routeTtl',1);await has('routeTtlEnd','R1');await range('routeTtl',6);await is('routeTtlEnd','1');await range('routeTtl',64);
      await choose('routeMetric','hop');await is('routeMeasured','24,0 ms');await is('routeHops','5 bağlantı · 4 yönlendirici');await choose('routeMetric','delay');
      await choose('linkSel','0');await click('linkToggle');await is('routeMeasured','Varmadı · yol yok');await is('routeTheory','Tanımsız · yol yok');await is('routeDiff','—');await has('traceRows','ulaşılamıyor');await click('linkToggle');
      await choose('linkSel','7');await range('linkDelay',40);await is('routeMeasured','24,0 ms');await has('routeStatus','R2 → R4');await range('routeProc',0);await is('routeMeasured','22,0 ms');await range('routeProc',5);await is('routeTheory','42,0 ms');
      await click('yolReset');await is('routeMeasured','22,5 ms');eq(await page.locator('#linkSel').inputValue(),'6');eq(await page.locator('#routeTtl').inputValue(),'64');
      // Zamana bağlı canlandırma: Boşluk tuşu paketi gönderir, saat formül değerinde durur
      await range('routeSlow',20);await page.locator('h1').click();await page.keyboard.press('Space');
      await page.waitForFunction(()=>/TTL \d+\.$/.test(document.getElementById('routeClock').textContent),null,{timeout:3000}).then(()=>checks++);
      await page.waitForFunction(()=>document.getElementById('routeClock').textContent==='Paket saati: 22,5 ms.',null,{timeout:8000});checks++;
      await is('encTotal','1.058 bayt');await is('encFormula','1.058 bayt');await is('encOver','%5,5');await is('encSegs','1 · MSS 1.460 bayt');await is('encWire','1.078 bayt');
      await click('encTiny');await is('encTotal','64 bayt');await is('encHead','63 bayt');await is('encOver','%98,4');await has('encStatus','5 bayt dolgu');await has('encBar','Dolgu');
      await click('encMss');await is('encTotal','1.518 bayt');await click('encBig');await is('encSegs','3 · MSS 1.460 bayt');await is('encTotal','4.174 bayt');await is('encFormula','4.174 bayt');eq(await page.locator('#encRows tr').count(),3);
      await choose('encIp','6');await is('encSegs','3 · MSS 1.440 bayt');await choose('encMtu','9000');await is('encSegs','1 · MSS 8.940 bayt');await range('encPayload',9000);await is('encSegs','2 · MSS 8.940 bayt');
      await page.locator('h1').click();await page.keyboard.press('r');await is('encTotal','1.058 bayt');await noOverflow('yol');

      /* 02 */
      await click('tab-arq');await is('arqTxM','1,587');await is('arqTxT','1,556');await is('arqTxD','+%2,0');await is('arqEffM','%62,9');await is('arqEffT','%64,3');await is('arqEffD','−%2,1');await has('arqStatus','3.179 dilimde');eq(await page.locator('#arqRows tr').count(),3);await has('arqRows','≤ %90,0');await painted('arqCanvas');
      await click('arqClean');await is('arqTxM','1,000');await is('arqTxT','1,000');await is('arqEffM','%99,8');await is('arqEffT','%100,0');await has('arqStatus','Kanal kayıpsız');
      await click('arqHeavy');await has('arqTxT','3,143');await choose('arqProto','sw');eq(await page.locator('#arqW').isDisabled(),true);await is('arqTxT','1,429');await is('arqEffT','%14,0');await has('arqWOut','sabit');
      await choose('arqProto','sr');await is('arqTxT','1,429');await has('arqEffT','≤ %70,0');await has('arqEffD','sınırın');eq(await page.locator('#arqW').isDisabled(),false);
      await choose('arqProto','gbn');await range('arqW',3);await has('arqEffT','W < 1 + r');await has('arqStatus','Pencere 1 + r = 5');await range('arqW',8);await range('arqQ',.1);await has('arqTxT','q > 0');await is('arqTxD','—');await range('arqQ',0);
      await range('arqG',2);await has('arqGOut','TO = 7');await range('arqR',20);await has('arqROut','200 ms');await range('arqR',1);await range('arqP',.5);await has('arqTxM',',');await range('arqW',1);await range('arqW',32);
      await type('arqSeed','abc');await is('arqTxM','—');await has('arqStatus','Tohum');eq(await page.locator('#arqSeed').getAttribute('aria-invalid'),'true');await type('arqSeed','0');await is('arqTxM','—');await type('arqSeed','7');await has('arqTxM',',');
      await click('arqNewSeed');eq(await page.locator('#arqSeed').inputValue(),'8');await range('arqView',50);await has('arqViewOut','50. dilim');
      await is('ccMean','30,00 MSS');await is('ccIdeal','30,00 MSS');await is('ccDiff','%0,0');await is('ccRate','3,50 Mb/s');await is('ccCycle','21,0 tur · 2,1 s');await is('ccLoss','9 kayıp / 200 tur');await painted('ccCanvas');
      await range('ccWmax',41);await is('ccMean','30,50 MSS');await is('ccIdeal','30,75 MSS');await is('ccDiff','−%0,8');await has('ccStatus','tek sayı');await range('ccWmax',40);
      await choose('ccMode','tahoe');await is('ccMean','25,42 MSS');await is('ccDiff','−%15,3');await has('ccStatus','30,00 MSS verir');await choose('ccMode','reno');
      await range('ccWmax',100);await range('ccRounds',60);await is('ccMean','Tanımsız · iki kayıp gerekli');await is('ccDiff','—');await is('ccRate','—');await range('ccRounds',400);await is('ccMean','75,00 MSS');await range('ccWmax',8);await range('ccSsth',2);await is('ccMean','6,00 MSS');await range('ccRtt',10);await is('ccRate','7,01 Mb/s');
      await click('arqReset');await is('arqTxM','1,587');await is('ccMean','30,00 MSS');eq(await page.locator('#arqSeed').inputValue(),'2026');eq(await page.locator('#arqView').inputValue(),'0');await noOverflow('arq');

      /* 03 */
      await click('tab-adr');await is('cidrNet','192.0.2.64/26');await is('cidrBc','192.0.2.127');await is('cidrMask','255.255.255.192');await is('cidrRange','192.0.2.65 – 192.0.2.126');await is('cidrUsable','62 / 64');await is('cidrSame','Hayır · 192.0.2.128/26');await has('cidrType','TEST-NET-1');
      eq((await read('cidrBits')).replace(/\s/g,'').includes('11000000.00000000.00000010.01001101'),true);eq(await page.locator('#cidrBits .n').first().evaluate(e=>getComputedStyle(e).color!==getComputedStyle(document.querySelector('#cidrBits .h')).color),true);
      await click('cidrP31');await is('cidrUsable','2 / 2');await has('cidrBc','Yok');await is('cidrRange','192.0.2.76 – 192.0.2.77');await has('cidrStatus','RFC 3021');
      await click('cidrP32');await is('cidrUsable','1 / 1');await is('cidrRange','192.0.2.77');await is('cidrNet','192.0.2.77/32');await has('cidrStatus','tek adres');
      await range('cidrPrefix',0);await is('cidrNet','0.0.0.0/0');await is('cidrUsable','4.294.967.294 / 4.294.967.296');await has('cidrStatus','varsayılan rota');await is('cidrSame','Evet · aynı ağ');
      await range('cidrPrefix',24);await is('cidrSame','Evet · aynı ağ');await type('cidrAddr','192.0.2.0');await has('cidrStatus','ağ adresinin kendisi');await type('cidrAddr','192.0.2.255');await has('cidrStatus','yayın adresi');
      await click('cidrBad');await is('cidrNet','—');await has('cidrStatus','0–255');eq(await page.locator('#cidrAddr').getAttribute('aria-invalid'),'true');await type('cidrAddr','1.2.3');await has('cidrStatus','Geçersiz adres');await type('cidrAddr','01.2.3.4');await has('cidrStatus','Baştaki sıfır');
      await type('cidrAddr','10.1.2.3');await has('cidrType','RFC 1918');await type('cidrOther','x');await is('cidrSame','Geçersiz ikinci adres');
      await has('vlsmRows','192.0.2.224/30');await has('vlsmCaption','228 adres dağıtıldı, 28 adres boş');eq(await page.locator('#vlsmRows tr').count(),4);await click('vlsmEqual');await has('vlsmCaption','0 adres boş');await has('vlsmRows','192.0.2.192/26');
      await click('vlsmOver');await has('vlsmStatus','sığmıyor');await has('vlsmStatus','toplam 384 adres');await has('vlsmStatus','blokta 256 adres');eq(await page.locator('#vlsmRows tr').count(),0);await type('vlsmHosts','10, x');await has('vlsmStatus','pozitif tam sayı');await type('vlsmHosts','10');await type('vlsmBase','192.0.2.1/24');await has('vlsmStatus','ağ adresiyle başlamalı');await type('vlsmBase','192.0.2.0/33');await has('vlsmStatus','Geçersiz blok');
      await has('lpmStatus','/27');await has('lpmStatus','e5');eq(await page.locator('#lpmRows tr.nt-best').count(),1);eq(await page.locator('#lpmRows tr.nt-hit').count(),3);await click('lpmA');await has('lpmStatus','/25');await click('lpmB');await has('lpmStatus','/26');await click('lpmC');await has('lpmStatus','yalnızca varsayılan rotaya');await type('lpmDest','999.1.1.1');await has('lpmStatus','Geçersiz hedef');eq(await page.locator('#lpmRows tr.nt-best').count(),0);
      await is('v6Full','2001:0db8:0000:0000:0000:ff00:0042:8329');await is('v6Short','2001:db8:0:0:0:ff00:42:8329');await is('v6Comp','2001:db8::ff00:42:8329');await is('v6Net','2001:db8::/64');await is('v6Iid','0:ff00:42:8329');await has('v6Status','340.282.366.920.938.463.463.374.607.431.768.211.456');await has('v6Status','18.446.744.073.709.551.616');
      await click('v6A');await is('v6Comp','2001:db8::1:0:0:1');await click('v6B');await is('v6Comp','::1');await has('v6Status','zaten önerilen');await click('v6C');await is('v6Comp','—');await has('v6Status','yalnız bir kez');await type('v6Addr','2001:db8:0:1:1:1:1:1');await has('v6Status','“::” kullanılmaz');
      await click('adrReset');await is('cidrNet','192.0.2.64/26');await is('v6Comp','2001:db8::ff00:42:8329');await has('vlsmRows','192.0.2.224/30');await has('lpmStatus','/27');eq(await page.locator('[aria-invalid=true]').count(),0);await noOverflow('adr');

      /* 04 */
      await click('tab-dns');await is('dnsQ','4 sorgu');await is('dnsCold','4 sorgu');await is('dnsSaved','0 sorgu · 0 ms');await is('dnsTime','110 ms (soğuk: 110 ms)');await is('dnsTotal','4 / 4 sorgu');await is('dnsClock','t = 0 s');await has('dnsStatus','192.0.2.10');eq(await page.locator('#dnsSteps tr').count(),4);eq(await page.locator('#dnsCache tr').count(),4);await painted('dnsCanvas');
      await click('dnsGo');await is('dnsQ','0 sorgu');await is('dnsSaved','4 sorgu · 110 ms');await is('dnsTotal','4 / 8 sorgu');await has('dnsStatus','önbellekten');
      await click('dnsAdd300');await is('dnsClock','t = 300 s');await has('dnsStatus','Süresi dolan 1 kayıt');await click('dnsGo');await is('dnsQ','1 sorgu');await is('dnsTime','20 ms (soğuk: 110 ms)');
      await click('dnsAdd3600');await click('dnsGo');await is('dnsQ','3 sorgu');await click('dnsAdd86400');await click('dnsGo');await is('dnsQ','4 sorgu');
      await click('dnsChain');await is('dnsQ','5 sorgu');await is('dnsCold','7 sorgu');await has('dnsStatus','198.51.100.80');await has('dnsStatus','2 takma ad');
      await click('dnsNx');await is('dnsQ','1 sorgu');await has('dnsStatus','NXDOMAIN');await click('dnsGo');await is('dnsQ','0 sorgu');await click('dnsAdd60');await click('dnsGo');await is('dnsQ','1 sorgu');
      await type('dnsName','example.com');await choose('dnsType','MX');await page.locator('#dnsName').press('Enter');await has('dnsStatus','10 posta.example.com');await choose('dnsType','AAAA');await click('dnsGo');await has('dnsStatus','2001:db8:10::10');await choose('dnsType','NS');await click('dnsGo');await has('dnsStatus','ns1.example.com');await choose('dnsType','CNAME');await click('dnsGo');await has('dnsStatus','NODATA');
      await type('dnsName','çay.example');await click('dnsGo');await has('dnsStatus','Geçersiz ad');eq(await page.locator('#dnsName').getAttribute('aria-invalid'),'true');await type('dnsName','a..b');await click('dnsGo');await has('dnsStatus','Boş etiket');
      await type('dnsName','ornek.zzz');await choose('dnsType','A');await click('dnsGo');await is('dnsQ','1 sorgu');await has('dnsSteps','Kök sunucu');
      await click('dnsFlush');await has('dnsCache','Önbellek boş');await type('dnsName','ders.okul.example');await click('dnsGo');await is('dnsQ','9 sorgu');await is('dnsTime','285 ms (soğuk: 285 ms)');
      await page.locator('.nt-zone summary').click();await has('zoneRows','kutuphane.okul.example');eq(await page.locator('#dnsNames option').count()>10,true);
      await click('dnsReset');await is('dnsQ','4 sorgu');await is('dnsTotal','4 / 4 sorgu');await is('dnsClock','t = 0 s');eq(await page.locator('#dnsName').inputValue(),'www.example.com');await noOverflow('dns');

      /* Klavye */
      await page.locator('#tab-dns').focus();await page.keyboard.press('Home');eq(await page.locator('#tab-yol').getAttribute('aria-selected'),'true');await page.keyboard.press('ArrowRight');eq(await page.locator('#tab-arq').getAttribute('aria-selected'),'true');await page.keyboard.press('End');eq(await page.locator('#tab-dns').getAttribute('aria-selected'),'true');await page.keyboard.press('ArrowRight');eq(await page.locator('#tab-yol').getAttribute('aria-selected'),'true');await page.keyboard.press('ArrowLeft');eq(await page.locator('#tab-dns').getAttribute('aria-selected'),'true');
      eq(await page.locator('[role=tabpanel]:not([hidden])').count(),1);eq(await page.locator('#tab-dns').getAttribute('tabindex'),'0');eq(await page.locator('#tab-yol').getAttribute('tabindex'),'-1');
      // Form denetimindeyken R sıfırlamaz
      await click('tab-adr');await page.locator('#cidrAddr').fill('10.0.0.1');await page.locator('#cidrAddr').press('r').catch(()=>{});eq((await page.locator('#cidrAddr').inputValue()).startsWith('10.0.0.1'),true);
      // Tema değişince tuval yeniden çizilir, taşma olmaz
      await click('tab-yol');await page.evaluate(t=>{document.documentElement.dataset.theme=t;},theme==='light'?'dark':'light');await page.waitForTimeout(80);await painted('routeCanvas');await noOverflow('tema');
      assert.deepEqual(errors,[],`[${width}] konsol/JS hatası`);checks++;
      console.log(`G ${SLUG}: ${width} px ${theme} · ${checks-before} arayüz denetimi PASS`);await ctx.close();
    }
  }catch(e){console.error(e);code=1;}finally{await browser?.close();server.closeAllConnections?.();await new Promise(r=>server.close(r));}
  process.exit(code);
}
