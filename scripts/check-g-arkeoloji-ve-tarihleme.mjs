// Arkeoloji ve tarihleme: çekirdeğin bağımsız denetimi.
// Başvurular sayfanın yollarını yinelemez: elle yazılmış matris ve TPQ tabloları, geri izlemeli sıralama sayımı,
// IntCal20 verisinin resmî dosyadan alınan SHA-256 özeti ve elle kopyalanmış satırları, ayrı bir ara değer + eşik
// ikiye bölme ile HPD hesabı, toplamlar formülüyle korelasyon, "önce artan sonra azalan" tanımıyla tek tepelilik.
import fs from 'node:fs';
import vm from 'node:vm';
import crypto from 'node:crypto';
import assert from 'node:assert/strict';
const SLUG='arkeoloji-ve-tarihleme';
const html=fs.readFileSync(new URL(`../${SLUG}.html`,import.meta.url),'utf8');
const source=html.split('/* KERNEL-BEGIN */')[1]?.split('/* KERNEL-END */')[0];
assert(source,'Çekirdek sınırları gerekli');
const context={window:{}};vm.createContext(context);vm.runInContext(source,context);
const K=context.window.Arkeo;let checks=0;
const eq=(a,b,m)=>{const x=JSON.stringify(a),y=JSON.stringify(b);assert(x===y,(m?m+': ':'')+x+' ≠ '+y);checks++;},ok=(c,m)=>{assert(c,m);checks++;};
const near=(a,b,tol,m)=>{assert(Math.abs(a-b)<=tol,`${m}: ${a} ≉ ${b}`);checks++;};
let seed=20261113;const rnd=()=>{seed=(seed*1664525+1013904223)>>>0;return seed/4294967296;},ri=n=>Math.floor(rnd()*n);
ok(Object.isFrozen(K)&&Object.isFrozen(K.UNITS)&&Object.isFrozen(K.IC.c14),'çekirdek dondurulmuş');

/* 0. Sayı ve takvim biçimi */
const NB=' ';
for(const[x,d,s]of[[0.5,2,'0,50'],[-1.25,2,'−1,25'],[9950,0,'9950'],[10000,0,'10'+NB+'000'],[12460,0,'12'+NB+'460'],[-0.001,2,'0,00']])eq(K.fmt(x,d),s,'fmt '+x);
eq(K.bpLabel(500),'MS 1450');eq(K.bpLabel(1950),'MÖ 1');eq(K.bpLabel(1949),'MS 1');eq(K.bpLabel(2700),'MÖ 751');
eq(K.rangeLabel(2700,2360),'MÖ 751–411');eq(K.rangeLabel(1000,800),'MS 950–1150');eq(K.rangeLabel(2000,1900),'MÖ 51 – MS 50');

/* 1. Stratigrafi: elle yazılmış doğrudan ilişkiler (Harris matrisi) */
const EXP_R=['2>3','3>1','1>4','4>6','4>9','6>5','5>7','7>8','9>10','10>8','8>11'];
eq(K.TRUTH_R.map(([a,b])=>a+'>'+b).sort(),EXP_R.slice().sort(),'indirgenmiş matris');
eq(K.OBS.length,15);const red=K.OBS.map(([a,b])=>a+'>'+b).filter(e=>!EXP_R.includes(e)).sort();eq(red,['3>4','3>9','4>5','6>7'],'fazlalık temaslar');
/* geri izlemeyle tam sıralama sayımı (sayfanın alt küme DP'sinden bağımsız) */
function countOrders(edges,nodes){const pre=new Map(nodes.map(n=>[n,[]]));for(const[a,b]of edges)pre.get(b).push(a);let c=0;const used=new Set();
  const rec=()=>{if(used.size===nodes.length){c++;return;}for(const n of nodes)if(!used.has(n)&&pre.get(n).every(p=>used.has(p))){used.add(n);rec();used.delete(n);}};rec();return c;}
const IDS=K.UNITS.map(u=>u.id);
eq(countOrders(K.TRUTH_R,IDS),10,'geri izleme: 10 sıralama');eq(K.linearExtensions(K.TRUTH_R),10,'DP: 10 sıralama');eq(K.linearExtensions(K.OBS.map(([a,b])=>[a,b])),10,'fazlalık sayıyı değiştirmez');
/* kapanış: el ile — her birimden önceki birimler */
const BEFORE={2:[3,1,4,6,5,7,9,10,8,11],3:[1,4,6,5,7,9,10,8,11],1:[4,6,5,7,9,10,8,11],4:[6,5,7,9,10,8,11],6:[5,7,8,11],5:[7,8,11],7:[8,11],9:[10,8,11],10:[8,11],8:[11],11:[]};
const C=K.closure(K.TRUTH_R);for(const u of IDS)eq([...C.get(u)].sort((a,b)=>a-b),BEFORE[u].slice().sort((a,b)=>a-b),'kapanış '+u);
/* rastgele alt kümeler: DP = geri izleme; indirgeme kapanışı korur */
for(let r=0;r<150;r++){const pairs=[];for(const a of IDS)for(const b of BEFORE[a])if(rnd()<0.18)pairs.push([a,b]);
  eq(K.linearExtensions(pairs),countOrders(pairs,IDS),'DP rastgele '+r);
  const R1=K.closure(pairs),R2=K.closure(K.reduce(pairs));for(const u of IDS)eq([...R1.get(u)].sort(),[...R2.get(u)].sort(),'indirgeme kapanışı korur');
  const rr=K.reduce(pairs);for(const[a,b]of rr){const others=rr.filter(e=>!(e[0]===a&&e[1]===b));ok(!K.closure(others).get(a).has(b),'indirgenmiş kenar gerekli');}}
/* sınıflandırma */
const cl=K.classify([[2,3],[3,4],[4,1],[6,9],[8,11]]);eq(cl.items.map(i=>i.k),['dogrudan','dolayli','ters','iliskisiz','dogrudan']);eq(cl.bad,2);eq(cl.done,false);
const conf=K.classify([[2,3],[3,1],[1,4],[4,9],[9,10],[10,4]]);ok(conf.cycle&&conf.cycle[0]===conf.cycle[conf.cycle.length-1],'döngü kapalı');eq([...new Set(conf.cycle)].sort((a,b)=>a-b),[4,9,10],'döngü 4-9-10');
eq(K.classify(K.TRUTH_R.map(e=>[e[0],e[1]])).done,true);const all=K.classify(K.OBS.map(e=>[e[0],e[1]]));eq(all.done,true);eq(all.redundant.length,4);
eq(K.classify([]).missing.length,11);eq(K.findCycle([[1,2],[2,3]]),null);
const L=K.layers(K.TRUTH_R);eq(IDS.map(u=>L.get(u)),[2,0,1,3,5,4,6,7,4,5,8],'katmanlar');

/* 2. Radyokarbon */
near(K.convAge(0.5),5568,1e-9,'yarı ömür');near(K.convAge(Math.exp(-1)),5568/Math.LN2,1e-9,'ortalama ömür');near(5568/Math.LN2,8033,0.1,'8033');
near(K.cambAge(0.5),5730,1e-9,'Cambridge');near(K.convAge(0.7),2865.1,0.1,'oran 0,7');near(K.convSigma(0.7,0.003),34.43,0.01,'σ');near(K.fractionFromAge(K.convAge(0.31)),0.31,1e-12,'ters');
/* veri bütünlüğü: intcal.org/curves/intcal20.14c'nin 0–15 000 kal. BP satırları ("kal,¹⁴C,σ"), artan sırada, \n ile */
const lines=K.IC.cal.map((c,i)=>`${c},${K.IC.c14[i]},${K.IC.sig[i]}`);eq(lines.length,7001);
eq(crypto.createHash('sha256').update(lines.join('\n')).digest('hex'),'80c7345ba97598d52d2601868f1b36747ae7dd5a74385a1ade9f6cd8644f476f','IntCal20 özeti');
const ROWS={0:[199,11],1:[197,11],2500:[2482,14],2700:[2496,11],3000:[2889,16],5000:[4439,15],10000:[8872,21],12000:[10306,18],15000:[12595,38]};
for(const[c,[r,s]]of Object.entries(ROWS)){const i=K.IC.cal.indexOf(+c);eq([K.IC.c14[i],K.IC.sig[i]],[r,s],'satır '+c);eq(K.curveAt(+c),[r,s]);}
/* bağımsız kalibrasyon: kendi ara değer + eşik ikiye bölme HPD */
function myCurve(t){let j=0;while(K.IC.cal[j+1]<=t&&j<K.IC.cal.length-2)j++;const a=K.IC.cal[j],b=K.IC.cal[j+1],u=(t-a)/(b-a);return[K.IC.c14[j]*(1-u)+K.IC.c14[j+1]*u,K.IC.sig[j]*(1-u)+K.IC.sig[j+1]*u];}
function myCal(mu,sd,lo,hi){const ts=[],ps=[];for(let t=lo;t<=hi;t++){const[r,s]=myCurve(t);const v=sd*sd+s*s;ts.push(t);ps.push(Math.exp(-((mu-r)**2)/(2*v))/Math.sqrt(v));}const z=ps.reduce((a,b)=>a+b,0);return{ts,ps:ps.map(p=>p/z)};}
function myHpd({ts,ps},lev){let a=0,b=Math.max(...ps);for(let k=0;k<60;k++){const m=(a+b)/2;const mass=ps.reduce((s,p)=>s+(p>=m?p:0),0);if(mass>=lev)a=m;else b=m;}const runs=[];let cur=null;ps.forEach((p,i)=>{if(p>=a){if(!cur){cur={young:ts[i],old:ts[i]};runs.push(cur);}cur.old=ts[i];}else cur=null;});return runs;}
const CASES={'3000/25':[2700,3700],'2450/25':[2100,2900],'800/25':[500,1100],'10000/40':[10900,12100],'4500/30':[4800,5600],'1200/30':[900,1400]};
for(const[k,[lo,hi]]of Object.entries(CASES)){const[mu,sd]=k.split('/').map(Number);const c=K.calibrate(mu,sd);let tot=0;for(let t=0;t<=K.CAL_MAX;t++)tot+=c.dens[t];near(tot,1,1e-9,'normal '+k);
  const mine=myCal(mu,sd,lo,hi);near(mine.ps.reduce((a,b)=>a+b,0),1,1e-9,'');
  let massOut=0;for(let t=0;t<=K.CAL_MAX;t++)if(t<lo||t>hi)massOut+=c.dens[t];ok(massOut<1e-4,'pencere dışı kütle '+k);
  for(const lev of[0.683,0.954]){const P=K.hpd(c.dens,lev),M=myHpd(mine,lev);
    /* sayfanın her aralığı dışa yuvarlanmış: kendi aralıklarımın her biri bir sayfa aralığının içinde, uçlar ≤ 5 yıl uzakta (küçük kütleli kırıntılar hariç) */
    for(const m of M){const host=P.find(p=>p.young<=m.young&&p.old>=m.old);ok(host,`${k} %${lev}: ${m.old}–${m.young} sayfa aralığı içinde`);}
    for(const p of P){const inside=M.filter(m=>m.young>=p.young&&m.old<=p.old);ok(inside.length>0,'boş sayfa aralığı yok');near(Math.min(...inside.map(m=>m.young)),p.young,5,'genç uç '+k);near(Math.max(...inside.map(m=>m.old)),p.old,5,'yaşlı uç '+k);}
    const sum=P.reduce((s,r)=>s+r.p,0);ok(sum>=lev&&sum<lev+c.max+1e-12,`${k} kütle ${sum}`);ok(P.every((r,i)=>i===0||r.old<P[i-1].young),'sıralı ve ayrık');}
  let cm=0,med=-1;for(let i=0;i<mine.ts.length;i++){cm+=mine.ps[i];if(cm>=0.5){med=mine.ts[i];break;}}near(c.median,med,1,'ortanca '+k);}
/* ekranda gösterilen başvuru değerleri */
const show=(mu,sd,lev)=>K.hpd(K.calibrate(mu,sd).dens,lev).map(r=>`${r.old}-${r.young}`).join(' ');
eq(show(3000,25,0.683),'3235-3150 3090-3080');eq(show(3000,25,0.954),'3325-3295 3250-3105 3095-3075');
eq(show(2450,25,0.954),'2700-2630 2620-2580 2575-2560 2540-2360');eq(K.spanOf(K.hpd(K.calibrate(2450,25).dens,0.954)),305);
eq(show(800,25,0.954),'735-675');eq(show(10000,40,0.954),'11695-11665 11650-11270');eq(K.calibrate(3000,25).median,3188);
ok(K.calibrate(11500,150).edge===false,'üst sınırda kesilme yok');
ok(!/karton|900 mezar/.test(html),'Petrie: şerit malzemesi ve mezar sayısı kaynakta yok');ok(html.includes('ratio10=Math.round(10*span/(4*sd))'),'oran tam sayılardan yuvarlanır');

/* 3. Dendrokronoloji (sentetik) */
eq(K.MASTER.length,400);eq(K.M_START,1201);eq(K.M_END,1600);
function pearson2(a,b){const n=a.length;let sx=0,sy=0,sxx=0,syy=0,sxy=0;for(let i=0;i<n;i++){sx+=a[i];sy+=b[i];sxx+=a[i]*a[i];syy+=b[i]*b[i];sxy+=a[i]*b[i];}return(n*sxy-sx*sy)/Math.sqrt((n*sxx-sx*sx)*(n*syy-sy*sy));}
for(let r=0;r<200;r++){const n=5+ri(80),a=[],b=[];for(let i=0;i<n;i++){a.push(rnd());b.push(rnd()+0.3*a[i]);}near(K.pearson(a,b),pearson2(a,b),1e-9,'korelasyon');}
near(K.tval(0.5,27),0.5*5/Math.sqrt(0.75),1e-12,'t');
/* kayan ortalama: elle */
const dt=K.detrend([1,2,3,4,5],3);near(dt[0],1/1.5,1e-12,'');near(dt[2],1,1e-12,'');near(dt[4],5/4.5,1e-12,'');
for(let s=1;s<=25;s++)for(const[n,no]of[[60,0.3],[80,0.3],[40,0.5]]){const x=K.makeSample(n,no,s);const sc=K.scan(K.detrend(x));eq(sc.best[0],K.TRUE_END,`tohum ${s}, ${n} halka, gürültü ${no}`);
  const m=K.matchAt(K.detrend(x),K.TRUE_END);near(m.r,pearson2(K.detrend(x),K.MASTER_I.slice(K.TRUE_END-n+1-1201,K.TRUE_END-1201+1)),1e-9,'doğru konum r');}
{const s=K.detrend(K.makeSample(60,0.3));const sc=K.scan(s);eq(sc.list.length,341);near(sc.best[1],0.8293,1e-4,'varsayılan r');near(K.matchAt(s,1450).r,-0.0281,1e-4,'1450 r');
 const riv=sc.list.filter(([e])=>Math.abs(e-1497)>=3).sort((a,b)=>b[1]-a[1])[0];eq(riv[0],1368);
 const sh=K.scan(K.detrend(K.makeSample(20,1)));ok(sh.best[0]!==1497,'kısa gürültülü örnek yanılıyor');eq(sh.best[0],1431);
 const lg=K.scan(K.detrend(K.makeSample(80,0.3)));eq(lg.best[0],1497);near(lg.best[1],0.9130,1e-4,'80 halka');}

/* 4. Seriasyon */
const unimodal=v=>{let i=0;while(i+1<v.length&&v[i+1]>=v[i])i++;while(i+1<v.length&&v[i+1]<=v[i])i++;return i===v.length-1;};
const contiguous=v=>{const s=v.join('');return !/10+1/.test(s);};
for(const row of K.FREQ)eq(row.reduce((a,b)=>a+b,0),100,'yüzde toplamı');for(const row of K.FREQ_BI)eq(row.reduce((a,b)=>a+b,0),100,'yüzde toplamı VI');
function perms(a){return a.length<=1?[a]:a.flatMap((x,i)=>perms([...a.slice(0,i),...a.slice(i+1)]).map(p=>[x,...p]));}
const P7=perms([0,1,2,3,4,5,6]);
const goodF=P7.filter(o=>K.FREQ[0].every((_,c)=>unimodal(o.map(i=>K.FREQ[i][c])))).map(o=>o.map(i=>K.ASM[i]).join(''));eq(goodF.sort(),['DAFCGBE','EBGCFAD'],'tek tepeli sıralar');
const sF=K.solve(K.FREQ,'freq');eq(sF.best,0);eq(sF.orders.map(o=>o.map(i=>K.ASM[i]).join('')).sort(),['DAFCGBE','EBGCFAD']);
for(const o of P7.slice(0,800)){const s=K.scoreOrder(K.FREQ,o,'freq');for(let c=0;c<5;c++)eq(s.cols[c]===0,unimodal(o.map(i=>K.FREQ[i][c])),'sapma 0 ⇔ tek tepeli');}
eq(K.scoreOrder(K.FREQ,[0,1,2,3,4,5,6],'freq').total,444);eq(K.scoreOrder(K.FREQ,[0,1,2,3,4,5,6],'freq').ok,0);
eq(P7.filter(o=>K.FREQ_BI[0].every((_,c)=>unimodal(o.map(i=>K.FREQ_BI[i][c])))).length,0,'VI. türle hiçbir sıra tümüyle tek tepeli değil');
const sB=K.solve(K.FREQ_BI,'freq');eq(sB.best,72);eq(sB.orders.map(o=>o.map(i=>K.ASM[i]).join('')).sort(),['DAFCGBE','EBGCFAD']);
const P8=perms([0,1,2,3,4,5,6,7]);const goodP=P8.filter(o=>K.PRES[0].every((_,c)=>contiguous(o.map(i=>K.PRES[i][c])))).map(o=>o.map(i=>K.GRAVES[i]).join(''));eq(goodP.sort(),['37518426','62481573'],'ardışık birler');
const sP=K.solve(K.PRES,'pres');eq(sP.best,0);eq(sP.orders.length,2);eq(K.scoreOrder(K.PRES,[0,1,2,3,4,5,6,7],'pres').total,22);

/* 5. TPQ / TAQ: elle yazılmış tablo */
const F0=K.FINDS.map(f=>({year:f.year,unit:f.unit}));const W=K.windows(F0,{4:365});
const EXP_W={2:[1974,null],3:[351,null],1:[351,null],4:[351,365],6:[337,365],5:[300,365],7:[212,365],9:[351,365],10:[212,365],8:[212,365],11:[null,365]};
for(const[u,[t,q]]of Object.entries(EXP_W)){eq(W[u].tpq,t===null?-Infinity:t,'TPQ '+u);eq(W[u].taq,q===null?Infinity:q,'TAQ '+u);eq(W[u].ok,true);}
const W2=K.windows(F0.map(f=>f.year===1974?{year:1974,unit:9}:f),{4:365});eq(IDS.filter(u=>!W2[u].ok).sort((a,b)=>a-b),[4,9],'sızma çelişkisi');
const W3=K.windows(F0,{});eq(W3[4].taq,Infinity);eq(IDS.every(u=>W3[u].ok),true);
near(K.tlAge(5,0.25,3,0.15).age,5000/3,1e-9,'TL');near(K.tlAge(5,0.25,3,0.15).sigma,(5000/3)*Math.hypot(0.05,0.05),1e-9,'TL σ');near(K.obsAge(3,4.5),2000,1e-9,'obsidyen');near(K.obsAge(3,5.4),5000/3,1e-9,'obsidyen k×1,2');

console.log(`G arkeoloji-ve-tarihleme: ${checks.toLocaleString('tr-TR')} bağımsız stratigrafi, kalibrasyon, dendro, seriasyon ve TPQ kontrolü PASS`);

if(process.argv.includes('--browser')){
  const {chromium}=await import('playwright');const {createServer}=await import('node:http');const {join,extname}=await import('node:path');const {fileURLToPath}=await import('node:url');const root=fileURLToPath(new URL('../',import.meta.url));
  const server=createServer((req,res)=>{const file=join(root,decodeURIComponent(new URL(req.url,'http://localhost').pathname));if(!fs.existsSync(file)||fs.statSync(file).isDirectory()){res.writeHead(404).end();return;}res.setHeader('Content-Type',({'.html':'text/html; charset=utf-8','.js':'text/javascript; charset=utf-8','.css':'text/css; charset=utf-8'})[extname(file)]||'application/octet-stream');res.end(fs.readFileSync(file));});await new Promise(r=>server.listen(0,'127.0.0.1',r));let browser;
  ok(fs.existsSync(new URL(`../shared/digest/${SLUG}.js`,import.meta.url)),'Keşif Defteri dosyası var');
  try{browser=await chromium.launch();const before=checks;
  for(const[width,theme]of[[390,'light'],[1280,'dark']]){
    const page=await browser.newPage({viewport:{width,height:900},deviceScaleFactor:width===390?2:1,hasTouch:width===390});await page.addInitScript(t=>{localStorage.setItem('acelya-theme',t);localStorage.setItem('acelya-sound-muted','1');},theme);page.setDefaultTimeout(8000);
    const errors=[];page.on('pageerror',e=>errors.push(e.message));page.on('console',m=>{if(m.type()==='error')errors.push(m.text());});page.on('response',r=>{if(r.status()>=400)errors.push(r.status()+' '+r.url());});
    await page.goto(`http://127.0.0.1:${server.address().port}/${SLUG}.html`);
    const click=id=>page.locator('#'+id).click(),read=id=>page.locator('#'+id).textContent(),has=async(id,text)=>{const t=await read(id);assert(t.includes(text),`${id}: “${t}” içinde “${text}” yok (${width})`);checks++;},
      range=(id,v)=>page.locator('#'+id).evaluate((e,v)=>{e.value=v;e.dispatchEvent(new Event('input',{bubbles:true}));},v),sel=(id,v)=>page.locator('#'+id).selectOption(v),
      noflow=async tag=>{eq(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),true,'yatay taşma: '+tag+' '+width);};
    eq(await page.evaluate(()=>document.title.length<=80&&document.title.startsWith('Arkeoloji ve Tarihleme: ')),true);eq(await page.locator('[role=tab]').count(),5);
    await page.waitForSelector('.digest',{timeout:8000});await page.locator('.digest').first().scrollIntoViewIfNeeded();ok(await page.locator('.digest').first().isVisible(),'Keşif Defteri görünür');
    /* 1. sekme */
    await has('sxFound','0 / 11');await has('sxExt','39 916 800'.replace(/ /g,' '));await has('sxStatus','en geç birimden başla');
    await page.locator('#sxBadges .sx-u[data-u="2"]').click();await has('sxStatus','2 · Boru hendeğinin dolgusu');await page.locator('#sxBadges .sx-u[data-u="3"]').click();await has('sxFound','1 / 11');await has('sxList','doğru, doğrudan');
    await sel('sxLater','3');await sel('sxEarlier','4');await click('sxAdd');await has('sxRed','1');await has('sxList','fazlalık');
    await sel('sxLater','6');await sel('sxEarlier','9');await click('sxAdd');await has('sxBad','1');await has('sxStatus','sıraları bilinmiyor');
    await page.locator('#sxList button[data-del="2"]').click();await has('sxBad','0');
    await sel('sxLater','4');await sel('sxEarlier','1');await click('sxAdd');await has('sxStatus','kesitle çelişiyor');
    await click('sxSolve');await has('sxFound','11 / 11');await has('sxExt','10');await has('sxStatus','Matris tam');eq(await page.locator('#hmSvg .hm-node').count(),11);eq(await page.locator('#hmSvg .hm-edge').count(),11);
    await click('sxAll');await has('sxRed','4');await has('sxStatus','4 ilişki doğru ama fazlalık');eq(await page.locator('#hmSvg .hm-edge').count(),11);
    await click('sxConflict');await has('sxStatus','döngüsü');await has('sxExt','0 (döngü var)');ok(await page.locator('#hmSvg .hm-edge.bad').count()===3,'döngü kenarları kırmızı');
    await click('stratReset');await has('sxFound','0 / 11');await noflow('strat');
    /* 2. sekme */
    await click('tab-radyo');await has('c4Age','2865 ± 34 ¹⁴C BP');await has('c4Camb','2949');await has('c4Diff','83 yıl');await has('c4Half','0,51');
    await range('c4F','50');await has('c4Age','5568 ±');await has('c4Half','1,00');await range('c4F','1');await has('c4Status','alanının');eq(await page.locator('#c4Send').isDisabled(),true);
    await range('c4F','70');await click('c4Send');await has('calMuOut','2865 BP');await has('calSdOut','± 35 yıl');
    await click('radyoReset');await has('calR68','3235–3150 kal. BP (MÖ 1286–1201)');await has('calR95','3250–3105 kal. BP');await has('calMed','3188 kal. BP');await has('calSpan','195 takvim yılı');
    await click('calP2450');await has('calSpan','305');await has('calStatus','toplam 305 yıl tutuyor (3,1 kat)');await range('calSd','10');await has('calSpan','220');await has('calStatus','(5,5 kat)');await click('calP2450');await has('calR95','2540–2360 kal. BP (MÖ 591–411)');await has('calStatus','plato');
    await click('calP800');await has('calR95','735–675 kal. BP (MS 1215–1275)');await has('calStatus','dik');await click('calP10000');await has('calStatus','2 ayrı aralığa');
    await range('calMu','11500');await range('calSd','150');await has('calMuOut','11'+NB+'500 BP');ok(!(await read('calStatus')).includes('kesik'),'kesilme yok');
    eq(await page.evaluate(()=>{const c=document.getElementById('calCanvas');return c.width>0&&c.height>0;}),true);await click('radyoReset');await noflow('radyo');
    /* 3. sekme */
    await click('tab-dendro');await has('dnR','−0,028 (n = 60)');await has('dnBest','Henüz taranmadı');await has('dnFell','terminus post quem');
    await click('dnScanBtn');await has('dnBest','MS 1497 · r = 0,829');await has('dnSecond','MS 1368');await has('dnStatus','Tepe belirgin');
    await range('dnEnd','1497');await has('dnR','0,829');await page.locator('#dnBark').check();await has('dnFell','MS 1497 büyüme mevsiminden sonra');
    await page.locator('#dnReveal').check();await has('dnStatus','tarama doğru buldu');
    await click('dnPShort');await has('dnBest','Henüz taranmadı');await click('dnScanBtn');await has('dnBest','MS 1431');await has('dnStatus','tarama yanıldı');await has('dnStatus','güvenilir değil');
    eq(await page.locator('#dnEnd').getAttribute('min'),'1220');await click('dnPLong');await click('dnScanBtn');await has('dnBest','MS 1497 · r = 0,913');
    await click('dendroReset');await has('dnNOut','60 halka');await has('dnEndOut','MS 1450');eq(await page.locator('#dnReveal').isChecked(),false);await noflow('dendro');
    /* 4. sekme */
    await click('tab-seri');await has('srOk','0 / 5');await has('srTot','444');await has('srSolver','DAFCGBE, EBGCFAD');
    await click('srSolve');await has('srOk','5 / 5');await has('srStatus','yönü vermez');await click('srFlip');await has('srTot','0');
    await page.locator('#srBody button[data-mv="0"][data-d="1"]').click();ok((await read('srTot'))!=='0','taşıma sapma yaratır');
    await page.locator('#srBi').check();await has('srSolver','en küçük sapma 72');await click('srSolve');await has('srStatus','iki kez moda');await has('srOk','5 / 6');
    await sel('srMode','pres');await has('srOkLab','Kesintisiz');await has('srTot','22');eq(await page.locator('#srBi').isDisabled(),true);await click('srSolve');await has('srTot','0');await has('srSolver','3-7-5-1-8-4-2-6');
    await click('seriReset');await has('srOk','0 / 5');await noflow('seri');
    /* 5. sekme */
    await click('tab-capraz');await has('tqStatus','MS 351 – MS 365');eq(await page.locator('#tqRows td.bad').count(),0);
    await click('tqIntrude');await has('tqStatus','Çelişki: 4, 9');eq(await page.locator('#tqRows td.bad').count(),4);
    await page.locator('#tqTaq').uncheck();await has('tqStatus','Tutarlı');await sel('tq-s1974','0');await page.locator('#tqTaq').check();await has('tqStatus','MS 351 – MS 365');
    await sel('tq-y300','0');ok(!(await read('tqStatus')).includes('yazıtlı taş'),'yazıt kaldırıldı');
    await has('tlOut','1667 ± 118 yıl');await has('obOut','2000 yıl');await range('obK','9');await has('obOut','1000 yıl');await range('tlRate','0.5');await has('tlOut','10'+NB+'000');
    await click('caprazReset');await has('tqStatus','Duvar (5)');await has('obOut','2000 yıl');await noflow('capraz');
    /* klavye, R, etiketler, biçim */
    await page.locator('#tab-capraz').focus();await page.keyboard.press('Home');eq(await page.locator('#tab-strat').getAttribute('aria-selected'),'true');await page.keyboard.press('ArrowLeft');eq(await page.locator('#tab-capraz').getAttribute('aria-selected'),'true');await page.keyboard.press('End');await page.keyboard.press('ArrowRight');eq(await page.locator('#tab-strat').getAttribute('aria-selected'),'true');
    await click('sxSolve');await page.locator('h1').click();await page.keyboard.press('r');await has('sxFound','0 / 11');
    eq(await page.evaluate(()=>[...document.querySelectorAll('main input,main select')].filter(e=>!(e.labels&&e.labels.length)&&!e.getAttribute('aria-label')).map(e=>e.id)),[]);
    eq(await page.evaluate(()=>[...document.querySelectorAll('main canvas, main svg[role]')].filter(c=>c.getAttribute('role')!=='img').length),0);
    eq(await page.evaluate(()=>Object.isFrozen(Arkeo)&&!Object.getOwnPropertyDescriptor(window,'Arkeo').writable),true);
    eq(await page.evaluate(()=>/[̀-ͯ⃗]/.test(document.body.textContent.normalize('NFC'))),false,'birleşik işaret');
    eq(await page.evaluate(()=>/\d\.\d/.test([...document.querySelectorAll('.ar-stat strong,.ar-status,output,.ar-note,#tqRows')].map(e=>e.textContent).join(' '))),false,'ondalık nokta');
    for(const t of['strat','radyo','dendro','seri','capraz']){await click('tab-'+t);await noflow('sekme '+t);}
    assert.deepEqual(errors,[]);checks++;await page.close();
  }
  console.log(`G arkeoloji-ve-tarihleme: ${checks-before} tarayıcı kontrolü (390 açık / 1280 koyu; beş sekme, hazırlar, sınırlar, klavye) PASS`);
  }finally{await browser?.close();await new Promise(r=>server.close(r));}
}
