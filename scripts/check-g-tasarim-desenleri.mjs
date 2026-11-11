// Tasarım Desenleri laboratuvarı: kalıcı denetim.
// Çekirdek (KERNEL-BEGIN/END) sayfadan yüklenir; başvurular sayfanın formüllerini YENİDEN KULLANMAZ:
//  - Observer: kapalı biçimler (E·n, E·n·(1+c)), bu dosyada tutulan küme modeliyle sızıntı sayımı, rastgele işlem dizilerinde değişmezler,
//  - Strategy/State: bu dosyada elle yazılmış fiyat işlevleri ve switch'li ikinci bir otomat; gösterilen kaynak metninin yeniden derlenmesi,
//  - Decorator: dizilerle yazılmış ikinci (akışsız) bir boru hattı, düzenli ifadeyle RLE, Buffer ile onaltılık; a(n) = n·(a(n−1)+1) yinelemesi,
//  - Composite: JSON üzerinde ayrı bir indirgeme; Bridge: ad kümeleri ve elle yazılmış beklenen çizimler,
//  - Adapter: bilinen sabit noktalar (32 °F = 0 °C, −40 = −40, 1 mil = 1.609344 km), Singleton: düz bir değişkenle kaba kuvvet.
// Kullanım: node scripts/check-g-tasarim-desenleri.mjs [--browser]
import fs from 'node:fs';
import vm from 'node:vm';
import assert from 'node:assert/strict';
const SLUG='tasarim-desenleri';
const html=fs.readFileSync(new URL(`../${SLUG}.html`,import.meta.url),'utf8');
const source=html.split('/* KERNEL-BEGIN */')[1]?.split('/* KERNEL-END */')[0];
assert(source,'KERNEL sınırları gerekli');
const context={window:{}};vm.createContext(context);vm.runInContext(source,context);
const K=context.window.PatternLab;let checks=0;
const eq=(a,b,msg)=>{const x=JSON.stringify(a),y=JSON.stringify(b);assert(x===y,`${msg||'eşitlik'}: ${x} ≠ ${y}`);checks++;};
const ok=(v,msg)=>{assert(v,msg);checks++;};
const near=(a,b,tol,msg)=>{assert(Math.abs(a-b)<=tol,`${msg||''} ${a} ≠ ${b}`);checks++;};
let seed=20261111;const rnd=()=>(seed=(seed*1664525+1013904223)>>>0)/2**32,ri=(a,b)=>a+Math.floor(rnd()*(b-a+1)),pick=a=>a[ri(0,a.length-1)];
const shuffle=a=>{const b=a.slice();for(let i=b.length-1;i>0;i--){const j=ri(0,i);[b[i],b[j]]=[b[j],b[i]];}return b;};
const fact=n=>n<2?1:n*fact(n-1);

// ---------- 1. Observer ----------
const NORMAL=['ekran','gunluk','grafik'];
for(const snapshot of[true,false])for(let n=0;n<=3;n++)for(const E of[1,2,7]){
  const L=K.observerLab({attach:NORMAL.slice(0,n),snapshot});L.emit(E);const s=L.state();
  eq([s.delivered,s.expected,s.emissions,s.events],[E*n,E*n,E,E],`E·n, n=${n}`);eq(s.last.depth,1);eq(s.last.depthTheory,1);eq(K.observerTheory(E,n,0),E*n);
}
// zincir: E·n·(1+c); türeticinin konumu ne olursa olsun
for(const snapshot of[true,false])for(let c=0;c<=4;c++)for(let pos=0;pos<=3;pos++)for(const E of[1,3]){
  const ids=NORMAL.slice();ids.splice(pos,0,'turetici');const L=K.observerLab({attach:ids,snapshot,chain:c});L.emit(E);const s=L.state(),n=4;
  eq([s.delivered,s.expected,s.emissions],[E*n*(1+c),E*n*(1+c),E*(1+c)],`zincir c=${c} pos=${pos}`);eq([s.last.depth,s.last.depthTheory],[1+c,1+c]);eq(s.last.halted,false);
  // türeticiden sonra gelenler en derin (türetilmiş) olayı asıl olaydan önce alır
  if(c>0&&pos<3){const after=K.OBSERVERS[ids[pos+1]][0],seen=s.last.log.filter(e=>e.t==='call'&&e.name===after).map(e=>e.depth);eq(seen,Array.from({length:c+1},(_,i)=>c-i),'ters sıra');}
  if(c>0&&pos>0){const before=K.OBSERVERS[ids[0]][0],seen=s.last.log.filter(e=>e.t==='call'&&e.name===before).map(e=>e.depth);eq(seen,Array.from({length:c+1},(_,i)=>i),'düz sıra');}
}
// kendini çıkaran gözlemci: canlı listede arkasındaki atlanır, kopyada atlanmaz
for(let pos=0;pos<=3;pos++){
  const ids=NORMAL.slice();ids.splice(pos,0,'tek');
  const live=K.observerLab({attach:ids,snapshot:false}),r=live.emit(1);
  eq([r.expected,r.delivered],[4,pos<3?3:4],`canlı pos=${pos}`);eq(r.skipped,pos<3?[K.OBSERVERS[ids[pos+1]][0]]:[]);eq(live.has('tek'),false);eq(live.emit(1).delivered,3);eq(live.emit(1).skipped,[]);
  const safe=K.observerLab({attach:ids,snapshot:true}),q=safe.emit(1);eq([q.expected,q.delivered,q.skipped.length],[4,4,0]);eq(safe.emit(1).delivered,3);eq(safe.state().registered,3);
}
// geri besleme döngüsü derinlik sınırında kesilir
for(const snapshot of[true,false]){const L=K.observerLab({attach:['ekran','turetici','gunluk'],snapshot,loop:true}),r=L.emit(1);eq([r.halted,r.depth,r.depthTheory,r.emissions,r.delivered],[true,K.MAX_DEPTH,12,12,36]);L.set({loop:false,chain:0});eq(L.emit(1).delivered,3);}
// sızıntı: bu dosyadaki küme modeliyle rastgele işlem dizileri; kopya kipinde teslim = beklenen değişmezi
for(let trial=0;trial<300;trial++){
  const snapshot=trial%3!==0,chain=ri(0,3),L=K.observerLab({snapshot,chain,attach:shuffle(['ekran','gunluk','grafik','tek','turetici']).slice(0,ri(0,5))});
  const open=[],dead=new Set();let leakedRef=0,wastedRef=0,closed=0,detached=0;
  for(let step=0;step<25;step++){
    const op=ri(0,6);
    if(op===0&&L.state().registered<12)open.push(L.openWindow());
    else if(op===1){const d=rnd()<.5,name=L.closeWindow(d);eq(name,open.length?open[open.length-1]:null);if(name){open.pop();closed++;if(d)detached++;else{dead.add(name);leakedRef++;}}}
    else if(op===2)L.attach(pick(['ekran','gunluk','grafik','tek','turetici']));
    else if(op===3)L.detach(pick(['ekran','gunluk','grafik','tek','turetici']));
    else{const r=L.emit(1);wastedRef+=r.log.filter(e=>e.t==='call'&&dead.has(e.name)).length;ok(r.delivered<=r.expected,'teslim beklenenden çok olamaz');
      if(snapshot){eq(r.delivered,r.expected,'kopyada her yayım başındaki listeye ulaşır');eq(r.skipped,[]);}
      eq(r.expected-r.delivered,r.skipped.length,'eksik bildirim = atlanan');eq(r.log.filter(e=>e.t==='call').length,r.delivered);}
    const s=L.state();eq([s.leaked,s.leakTheory,s.wasted,s.openWindows],[leakedRef,closed-detached,wastedRef,open.length]);eq(s.list.filter(g=>!g.alive).map(g=>g.ad).sort(),[...dead].sort());
  }
}
{const L=K.observerLab({attach:NORMAL});for(let i=0;i<3;i++)L.openWindow();for(let i=0;i<3;i++)L.closeWindow(false);L.emit(2);const s=L.state();eq([s.registered,s.leaked,s.leakTheory,s.wasted,s.delivered,s.expected],[6,3,3,6,12,12]);eq(L.closeWindow(false),null);
  const M=K.observerLab({attach:NORMAL});M.openWindow();M.closeWindow(true);M.emit(1);eq([M.state().leaked,M.state().wasted,M.state().delivered],[0,0,3]);}
assert.throws(()=>K.observerLab({attach:['yok']}),e=>e.name==='RangeError');checks++;
// gösterilen kaynak gerçekten bu sınıftır
{const Konu=new Function('return '+K.SOURCES.konu)();for(const mode of[true,false]){const k=new Konu(mode),seen=[];const a={guncelle(){seen.push('a');k.cikar(a);}},b={guncelle(){seen.push('b');}};k.ekle(a);k.ekle(b);k.ekle(b);k.bildir({});eq(seen,mode?['a','b']:['a']);eq(k.gozlemciler.length,1);}
  ok(K.SOURCES.konu.includes('Array<Gozlemci>'),'tür parametresi kaynakta duruyor');}

// ---------- 2. Strategy / State ----------
const refShip={standart:{ucret:(kg,km,sp)=>35+6*kg,gun:(kg,km)=>2+Math.ceil(km/500),karbon:(kg,km)=>kg*km/10},
  ekspres:{ucret:(kg,km)=>60+9*kg+km/20,gun:()=>1,karbon:(kg,km)=>kg*km/4},
  esik:{ucret:(kg,km,sp)=>sp<500?35+6*kg:0,gun:(kg,km)=>3+Math.ceil(km/500),karbon:(kg,km)=>kg*km/10},
  dron:{ucret:(kg,km)=>20+km/2,gun:()=>0,karbon:(kg,km)=>kg*km/50}};
for(const[addR,addC]of[[false,false],[true,false],[false,true],[true,true]]){
  const m=K.matrix(K.KARGO,addR,addC),A=K.byColumn(m),B=K.byRow(m),r=3+addR,c=2+addC;
  eq([m.rows.length,m.cols.length,A.units.length,B.units.length],[r,c,c,r]);
  for(let kg=.5;kg<=30;kg+=2.5)for(let km=10;km<=1500;km+=170)for(const sepet of[0,450,500,550,2000])m.rows.forEach((row,i)=>{for(const col of m.cols){
    const o={kg,km,sepet},a=K.callColumn(A,row,col,o),b=K.callRow(B,row,col,o),ref=refShip[row][col](kg,km,sepet);
    near(a.value,ref,1e-9,`${row}.${col}`);eq(a.value,b.value);eq([a.comps,a.hops,b.comps,b.hops],[i+1,0,0,1]);
    eq(new Function('s','return '+m.cell[row][col].src)(o),a.value,'gösterilen kaynak = çalışan işlev');}});
  const o={kg:4,km:300,sepet:350};eq(m.rows.reduce((s,row)=>s+K.callColumn(A,row,'ucret',o).comps,0),r*(r+1)/2);
  // ekleme sayımı: iki gerçek modelin farkı
  const base=K.matrix(K.KARGO,false,false),dA=K.diffUnits(K.byColumn(base),A),dB=K.diffUnits(K.byRow(base),B),th=K.editTheory(3,2,+addR,+addC);
  eq([dA.changed.length,dA.added.length,dB.changed.length,dB.added.length],[addR?2:0,+addC,addC?3:0,+addR]);eq([th.kosullu.changed,th.kosullu.added,th.desen.changed,th.desen.added],[addR?2:0,+addC,addC?3:0,+addR]);
  eq([dA.newCells,dB.newCells,th.cells],[r*c-6,r*c-6,r*c-6]);eq(dA.removed.length+dB.removed.length,0);
  assert.throws(()=>K.callColumn(A,'yok','ucret',o),e=>e.name==='RangeError');assert.throws(()=>K.callRow(B,'yok','ucret',o),e=>e.name==='RangeError');assert.throws(()=>K.callRow(B,'standart','yok',o),e=>e.name==='RangeError');checks+=3;
}
{const o={kg:4,km:300,sepet:350},B=K.byRow(K.matrix(K.KARGO,true,true));eq(['standart','ekspres','esik','dron'].map(r=>K.callRow(B,r,'ucret',o).value),[59,111,59,170]);eq(['standart','ekspres','esik','dron'].map(r=>K.callRow(B,r,'gun',o).value),[3,1,4,0]);eq(K.callRow(B,'esik','ucret',{...o,sepet:500}).value,0);}
// bağımsız otomat (switch ile)
function refMachine(cap,bakim,anahtar){
  let st='bos',stok=cap,kredi=0,kasa=0;
  return{send(ev){
    if(ev==='doldur'){stok=cap;if(st==='tukendi')st='bos';}
    else if(ev==='anahtar'){if(!anahtar)throw new Error('yok');if(bakim){if(st==='bakim')st=stok>0?'bos':'tukendi';else{kredi=0;kasa=0;st='bakim';}}else kasa=0;}
    else switch(st){
      case'bos':if(ev==='jeton'){kredi=1;st='para';}break;
      case'para':if(ev==='sec'){stok--;kredi=0;kasa++;st=stok>0?'bos':'tukendi';}else if(ev==='iade'){kredi=0;st='bos';}break;
      default:break;}
    return st;},get:()=>({st,stok,kredi,kasa})};
}
for(const bakim of[false,true])for(const anahtar of[false,true])for(let cap=1;cap<=5;cap++){
  const evs=['jeton','sec','iade','doldur',...(anahtar?['anahtar']:[])],sN=3+bakim,eN=4+anahtar,reached=new Set(['bos']);
  for(let trial=0;trial<25;trial++){
    const V=K.vendingMachine({stok:cap,bakim,anahtar}),R=refMachine(cap,bakim,anahtar);let comps=0;
    for(let i=0;i<40;i++){const ev=rnd()<.45?pick(['jeton','sec']):pick(evs),before=V.state().state,step=V.send(ev),to=R.send(ev),s=V.state(),g=R.get();reached.add(to);
      eq([step.from,step.to,s.state,s.stateB,s.stok,s.kredi,s.kasa],[before,to,to,to,g.stok,g.kredi,g.kasa],`otomat ${ev}`);comps+=V.matrix.rows.indexOf(before)+1;eq(step.comps,V.matrix.rows.indexOf(before)+1);}
    const s=V.state();eq([s.agree,s.steps,s.hops,s.comps,s.cells],[true,40,40,comps,sN*eN]);
  }
  const V=K.vendingMachine({stok:cap,bakim,anahtar}),ex=V.explore(),expect=['bos','para','tukendi',...(bakim&&anahtar?['bakim']:[])];
  eq(ex.reachable,expect,'erişilebilir durumlar');eq([...reached].sort(),expect.slice().sort(),'rastgele yürüyüş aynı kümeye ulaşır');
  const dA=K.diffUnits(K.byColumn(K.matrix(K.SATIS,false,false)),V.conditional),dB=K.diffUnits(K.byRow(K.matrix(K.SATIS,false,false)),V.pattern),th=K.editTheory(3,4,+bakim,+anahtar);
  eq([dA.changed.length,dA.added.length,dB.changed.length,dB.added.length,dA.newCells,dB.newCells],[th.kosullu.changed,th.kosullu.added,th.desen.changed,th.desen.added,th.cells,th.cells]);eq(th.cells,sN*eN-12);
  eq([th.kosullu.changed,th.desen.changed],[bakim?4:0,anahtar?3:0]);
  // gösterilen gövde yeniden derlenince aynı geçişi verir
  for(const r of V.matrix.rows)for(const c of V.matrix.cols)for(let stok=0;stok<=cap;stok++){const a={stok,kapasite:cap,kredi:1,kasa:2,mesaj:''},b={...a};eq(new Function('m',V.matrix.cell[r][c].src)(a),V.matrix.cell[r][c].run(b));eq(a,b);}
  assert.throws(()=>V.send('yok'),e=>e.name==='RangeError');checks++;
}
{const V=K.vendingMachine({stok:2});eq(['jeton','sec','jeton','sec','jeton','sec'].map(e=>V.send(e).to),['para','bos','para','tukendi','tukendi','tukendi']);eq([V.state().kasa,V.state().stok],[2,0]);eq(V.send('doldur').to,'bos');}

// ---------- 3. Decorator / Composite ----------
const refRle=t=>t.replace(/(.)\1{0,8}/gs,(run,ch)=>run.length+ch);
function refPipeline({text,order,piece,buffer,key}){
  let chunks=[];for(let i=0;i<text.length;i+=piece)chunks.push(text.slice(i,i+piece));
  const calls=[];
  for(const id of order){calls.push(chunks.length);
    if(id==='tampon'){const all=chunks.join('');chunks=[];for(let i=0;i<all.length;i+=buffer)chunks.push(all.slice(i,i+buffer));}
    else if(id==='sikistir')chunks=chunks.map(refRle);
    else if(id==='onaltilik')chunks=chunks.map(c=>Buffer.from(c,'latin1').toString('hex').toUpperCase());
    else{let pos=0;chunks=chunks.map(c=>[...c].map(ch=>{const v=(ch.charCodeAt(0)-32+key+pos++)%95;return String.fromCharCode(32+v);}).join(''));}}
  calls.push(chunks.length);return{output:chunks.join(''),calls};
}
const ALPHA='abAB 01~!z';
for(let trial=0;trial<600;trial++){
  const len=ri(1,64),runny=rnd()<.6;let text='';while(text.length<len)text+=runny?pick([...ALPHA]).repeat(ri(1,12)):String.fromCharCode(ri(32,126));text=text.slice(0,len);
  const order=shuffle(Object.keys(K.WRAPPERS)).slice(0,ri(0,4)),cfg={text,order,piece:ri(1,8),buffer:ri(2,16),key:ri(1,20)},r=K.runPipeline(cfg),ref=refPipeline(cfg);
  eq(r.output,ref.output,`boru hattı ${order} «${text}»`);eq(r.calls,ref.calls);eq(r.roundTrip,true,'geri çözme');eq(r.decoded,text);eq([r.inLen,r.outLen,r.sinkWrites,r.totalWrites],[len,ref.output.length,ref.calls[order.length],ref.calls.reduce((a,b)=>a+b,0)]);
  const j=order.indexOf('tampon'),th=K.pipelineTheory(len,cfg.piece,order,cfg.buffer,j>=0?r.chars[j]:0);eq([th.total,th.sink],[r.totalWrites,r.sinkWrites],'çağrı kuramı');
  if(j<0)eq(r.totalWrites,(order.length+1)*Math.ceil(len/cfg.piece));
  eq(K.rleCoz(K.rleKodla(text)),text);eq(K.rleKodla(text),refRle(text));
  if(trial<60){const all=K.allOrders(cfg);eq(all.length,fact(order.length));ok(all.every(x=>x.roundTrip));eq(new Set(all.map(x=>x.order.join())).size,all.length);}
}
{const cfg={text:'aaaaaaaabbbbbbbbccccccccdddddddd',order:['tampon','sikistir','sifrele'],piece:4,buffer:8,key:3},r=K.runPipeline(cfg);
  eq([r.output,r.outLen,r.calls,r.totalWrites,r.sinkWrites],[';e=h?kAn',8,[8,4,4,4],20,4]);
  eq(K.allOrders(cfg).map(x=>x.outLen),[8,64,16,16,64,64]);eq(K.runPipeline({...cfg,order:[]}).output,cfg.text);
  eq(K.runPipeline({...cfg,text:'tasarim desenleri bedelsiz degil'}).outLen,64);eq(K.runPipeline({...cfg,order:['onaltilik']}).output.slice(0,4),'6161');
  for(const bad of['','ş','a'.repeat(65),'a\n'])ok(!K.validText(bad));ok(K.validText('a'.repeat(64)));assert.throws(()=>K.runPipeline({...cfg,text:'ç'}),e=>e.name==='RangeError');assert.throws(()=>K.runPipeline({...cfg,order:['tampon','tampon']}),e=>e.name==='RangeError');assert.throws(()=>K.rleCoz('1'),e=>e.name==='SyntaxError');checks+=3;
  // gösterilen sınıflar yeniden derlenince aynı işi yapar
  const lib=new Function('rleKodla',`${K.SOURCES.sarmalayici}\n${K.SOURCES.tampon}\n${K.SOURCES.sikistir}\n${K.SOURCES.sifrele}\nreturn{Tampon,Sikistir,Sifrele};`)(refRle),sink={p:[],yaz(x){this.p.push(x);},kapat(){}};
  const head=new lib.Tampon(new lib.Sikistir(new lib.Sifrele(sink,3)),8);for(let i=0;i<32;i+=4)head.yaz(cfg.text.slice(i,i+4));head.kapat();eq(sink.p.join(''),';e=h?kAn');}
// sınıf patlaması: ikili katsayılar ve a(n) = n·(a(n−1)+1)
{const C=(n,k)=>fact(n)/fact(k)/fact(n-k);let a=0;
  for(let n=1;n<=12;n++){let sub=0,ord=0;for(let k=1;k<=n;k++){sub+=C(n,k);ord+=C(n,k)*fact(k);}a=n*(a+1);
    eq(K.enumerateCombos(n).count,sub);eq(K.comboTheory(n).subsets,sub);eq(K.comboTheory(n).ordered,ord);eq(ord,a);if(n<=10)eq(K.enumerateOrdered(n),a);}
  eq([K.enumerateCombos(4).count,K.enumerateOrdered(4),K.enumerateOrdered(10)],[15,64,9864100]);
  const names=K.enumerateCombos(4,['A','B','C','D']).sample;eq(names.length,15);eq(new Set(names).size,15);eq(names[2],'ABAkış');
  for(let n=1;n<=5;n++){let c=0;const items=Array.from({length:n},(_,i)=>i);for(let mask=1;mask<1<<n;mask++)c+=K.permutations(items.filter(i=>mask>>i&1)).length;eq(K.enumerateOrdered(n),c);}
  assert.throws(()=>K.enumerateCombos(0),e=>e.name==='RangeError');assert.throws(()=>K.enumerateOrdered(11),e=>e.name==='RangeError');checks+=2;}
const refTree=s=>s.c?s.c.reduce((a,c)=>{const r=refTree(c);return{sum:a.sum+r.sum,nodes:a.nodes+r.nodes,depth:Math.max(a.depth,1+r.depth),leaves:a.leaves+r.leaves};},{sum:0,nodes:1,depth:1,leaves:0}):{sum:s.kb,nodes:1,depth:1,leaves:1};
function randTree(d){if(d>=6||rnd()<.35)return{ad:'d',kb:ri(1,500)};return{ad:'k',c:Array.from({length:ri(0,4)},()=>randTree(d+1))};}
for(const spec of[...Object.values(K.TREES),{ad:'boş',c:[]},{ad:'tek',kb:7},...Array.from({length:200},()=>randTree(0))]){
  const e=K.evalTree(spec),r=refTree(spec);eq([e.total,e.flat,e.calls,e.nodes,e.depth,e.leaves,e.composites],[r.sum,r.sum,r.nodes,r.nodes,r.depth,r.leaves,r.nodes-r.leaves]);eq(e.nodes,JSON.stringify(spec).split('"ad"').length-1);
  eq(K.cloneSpec(spec),spec);ok(K.cloneSpec(spec)!==spec);}
eq(Object.values(K.TREES).map(t=>{const e=K.evalTree(t);return[e.total,e.nodes,e.depth];}),[[300,11,4],[305,8,4],[1,6,6]]);

// ---------- 4. Bridge / Abstract Factory / Adapter / Singleton ----------
for(let N=1;N<=8;N++)for(let M=1;M<=8;M++){
  const g=K.generateWidgets(N,M);eq([new Set(g.inheritNames).size,new Set(g.bridgeNames).size,new Set(g.factoryNames).size,g.equal,g.pairs.length],[N*M,N+M,N*M+M,N*M,N*M]);
  const th=K.widgetTheory(N,M,M-1);eq([th.inherit,th.bridge,th.factory,th.addPlatformInherit,th.addPlatformBridge],[N*M,N+M,N*M+M,N,1]);
  if(M<8){const h=K.generateWidgets(N,M+1);eq([h.inheritNames.filter(x=>!g.inheritNames.includes(x)).length,h.bridgeNames.filter(x=>!g.bridgeNames.includes(x)).length],[N,1]);}
  for(let j=0;j<M;j++){const u=K.buildUi(N,M,j),t=K.widgetTheory(N,M,j);eq([u.compsNaive,u.compsFactory,u.sitesNaive,u.sitesFactory,u.same,u.naive.length],[N*(j+1),j+1,N,1,true,N]);eq([t.compsNaive,t.compsFactory],[N*(j+1),j+1]);eq(u.naive,g.pairs.filter(p=>p.platform===K.PLATFORMS[j][0]).map(p=>p.bridge));}
}
{const g=K.generateWidgets(8,8),at=(p,f)=>g.pairs.find(x=>x.product===p&&x.platform===f).bridge;
  eq([at('Dugme','Windows'),at('OnayKutusu','Mac'),at('Kaydirici','Linux'),at('MetinKutusu','Android'),at('Menu','Windows'),at('Sekme','Mac'),at('Liste','Linux'),at('Ipucu','Windows')],['[Tamam]','(v) Kabul','<--o-->','{ad_}','[Dosya][Görünüm]','v (1)(2)','* bir * iki','[?] x']);
  assert.throws(()=>K.generateWidgets(0,3),e=>e.name==='RangeError');assert.throws(()=>K.generateWidgets(3,9),e=>e.name==='RangeError');assert.throws(()=>K.buildUi(3,3,3),e=>e.name==='RangeError');checks+=3;}
for(const[F,C]of[[32,0],[212,100],[-40,-40],[68,20],[50,10],[-4,-20]])near(K.adapterDemo(F,0,0).c,C,1e-12,'°F→°C');
near(K.adapterDemo(0,60,5280).kmh,96.56064,1e-12);near(K.adapterDemo(0,60,5280).m,1609.344,1e-9);near(K.adapterDemo(0,1,1).m,.3048,1e-15);near(K.adapterDemo(0,100,0).kmh,160.9344,1e-12);
{let worst=0;for(let F=-40;F<=212;F+=7)for(let mph=0;mph<=150;mph+=13)for(let ft=0;ft<=30000;ft+=2300){const d=K.adapterDemo(F,mph,ft);worst=Math.max(worst,d.roundTripError);eq([d.calls,d.targetCalls],[3,3]);near(d.back.f,F,1e-9);near(d.back.mph,mph,1e-9);near(d.back.ft,ft,1e-9);}ok(worst<1e-9,'gidiş dönüş hatası yalnız yuvarlama');
  const d=K.adapterDemo(68,30,3000);eq([d.c.toFixed(2),d.kmh.toFixed(2),d.m.toFixed(2)],['20.00','48.28','914.40']);
  const Ad=new Function('return '+K.SOURCES.adaptor)();eq(new Ad({getTempF:()=>212,getWindMph:()=>1,getAltitudeFt:()=>10}).sicaklikC(),100);}
// Singleton: düz bir değişkenle kaba kuvvet
const IDS=['fatura','indirim','muaf'],EXPECT={fatura:120,indirim:110,muaf:100};
function refRun(order,mode){let shared=20,instances=mode==='paylasilan'?1:order.length;const pass=order.map(id=>{let kdv=mode==='paylasilan'?shared:20;if(id==='indirim')kdv=10;if(id==='muaf')kdv=0;if(mode==='paylasilan')shared=kdv;return 100+kdv===EXPECT[id];});return{pass,instances};}
for(const mode of['paylasilan','sifirla','enjekte']){let passing=0;
  for(const order of K.permutations(IDS)){const r=K.runTests(order,mode),ref=refRun(order,mode);eq(r.results.map(x=>x.pass),ref.pass,`${mode} ${order}`);eq(r.instances,ref.instances);eq(r.allPass,ref.pass.every(Boolean));if(r.allPass)passing++;eq(r.results.map(x=>x.expected),order.map(id=>EXPECT[id]));}
  const all=K.allTestOrders(IDS,mode),th=K.testOrderTheory(3,mode);eq([all.total,all.passing],[6,passing]);eq([th.total,th.passing,th.instances],[6,mode==='paylasilan'?2:6,mode==='paylasilan'?1:3]);eq(all.passing,th.passing);}
eq(K.runTests(['indirim','fatura','muaf'],'paylasilan').results.map(x=>[x.seen,x.got,x.pass]),[[20,110,true],[10,110,false],[10,100,true]]);
eq(K.runTests(['fatura'],'paylasilan').allPass,true);eq([K.testOrderTheory(4,'paylasilan').passing,K.testOrderTheory(4,'enjekte').passing],[6,24]);
assert.throws(()=>K.runTests(IDS,'yok'),e=>e.name==='RangeError');assert.throws(()=>K.runTests(['yok'],'enjekte'),e=>e.name==='RangeError');checks+=2;
{const A=new Function('return '+K.SOURCES.ayarlar)();A.ornek=null;A.ornekSayisi=0;ok(A.tekil()===A.tekil());eq([A.ornekSayisi,A.tekil().kdv],[1,20]);}
// çalıştırmalar arasında durum sızmıyor
eq(K.runTests(['fatura','indirim','muaf'],'paylasilan').allPass,true);eq(K.runTests(['fatura','indirim','muaf'],'paylasilan').instances,1);

// ---------- biçim ve sayfa yapısı ----------
eq([K.fmt(12),K.fmt(-3),K.fmt(.25,2),K.fmt(-40,2),K.fmt(-0.001,2),K.fmt(NaN),K.fmt(9864100)],['12','−3','0.25','−40.00','0.00','—','9864100']);
ok(Object.isFrozen(K));
const cat=html.split('id="katalog"')[1].split('</section>')[0],groups=cat.split('<tbody>').slice(1).map(t=>(t.split('</tbody>')[0].match(/<tr id="desen-/g)||[]).length);
eq(groups,[5,7,11],'23 GoF deseni: 5 + 7 + 11');
const names=[...cat.matchAll(/<tr id="desen-[a-z-]+"><th scope="row">([^<]+)<\/th><td>([^<]+)<\/td><td>/g)].map(m=>m[1]);
ok(/id="desen-observer">.*?ortak arayüzleriyle tanır/.test(cat),'katalog: Observer amacı konu–gözlemci bağını doğru anlatmalı');ok(!/dinleyenleri tanımaz|kimi çağırdığını bilmez|kimlerin dinlediğini bilmeden/.test(html),'Observer: «konu gözlemcilerini bilmez» biçimindeki yanlış anlatım geri gelmemeli');
eq(names,['Abstract Factory','Builder','Factory Method','Prototype','Singleton','Adapter','Bridge','Composite','Decorator','Facade','Flyweight','Proxy','Chain of Responsibility','Command','Interpreter','Iterator','Mediator','Memento','Observer','State','Strategy','Template Method','Visitor']);
for(const loose of['Spring','Redux','React','Express','Context API','try-catch','@decorator'])ok(!html.includes(loose),'gevşek çerçeve eşlemesi yok: '+loose);
const ids=[...html.split('<script>')[0].matchAll(/\sid="([^"]+)"/g)].map(m=>m[1]);eq(ids.length,new Set(ids).size,'yinelenen id yok');
ok(!/\p{Extended_Pictographic}/u.test(html.replace(/[↑↓→←©®]/g,'')),'emoji yok');
ok(!/[̀-ͯ]/.test(html.normalize('NFC').replace(/[À-ɏ]/g,'')),'birleşik işaret yok');ok(!/https?:\/\/[^"']*\.(js|css|woff2?)/.test(html),'dış betik/yazı tipi yok');
console.log(`G ${SLUG}: ${checks.toLocaleString('tr-TR')} bağımsız çekirdek kontrolü PASS`);

if(process.argv.includes('--browser')){
  const {chromium}=await import('playwright');const {createServer}=await import('node:http');const {join,extname}=await import('node:path');const {fileURLToPath}=await import('node:url');const root=fileURLToPath(new URL('../',import.meta.url));
  const server=createServer((req,res)=>{const file=join(root,decodeURIComponent(new URL(req.url,'http://localhost').pathname));if(!fs.existsSync(file)||fs.statSync(file).isDirectory()){res.writeHead(404).end();return;}res.setHeader('Content-Type',({'.html':'text/html; charset=utf-8','.js':'text/javascript; charset=utf-8','.css':'text/css; charset=utf-8'})[extname(file)]||'application/octet-stream');res.end(fs.readFileSync(file));});
  await new Promise(r=>server.listen(0,'127.0.0.1',r));let browser;const before=checks;
  try{
    browser=await chromium.launch();
    for(const[width,height,theme]of[[390,900,'light'],[1280,900,'dark']]){
      const ctx=await browser.newContext({viewport:{width,height},deviceScaleFactor:2});const page=await ctx.newPage();
      await page.addInitScript(t=>{localStorage.setItem('acelya-theme',t);localStorage.setItem('acelya-sound-muted','1');},theme);page.setDefaultTimeout(5000);
      const errors=[];page.on('pageerror',e=>errors.push(e.message));page.on('console',m=>{if(m.type()==='error'&&!/404|Failed to load resource/.test(m.text()))errors.push(m.text());});
      const url=`http://127.0.0.1:${server.address().port}/${SLUG}.html`;
      await page.goto(url);await page.waitForSelector('#gTopOlc');
      const click=id=>page.locator('#'+id).click(),read=async id=>(await page.locator('#'+id).textContent()).trim(),
        range=(id,v)=>page.locator('#'+id).evaluate((e,v)=>{e.value=v;e.dispatchEvent(new Event('input',{bubbles:true}));},v),
        sel=(id,v)=>page.locator('#'+id).selectOption(v),is=async(id,t)=>{eq(await read(id),String(t),id);},has=async(id,t)=>{const v=await read(id);assert(v.includes(t),`${id}: «${v}» içinde «${t}» yok`);checks++;},
        lacks=async(id,t)=>{const v=await read(id);assert(!v.includes(t),`${id}: «${v}» içinde «${t}» olmamalı`);checks++;},
        three=async(p,a,b,c)=>{await is(p+'Olc',a);await is(p+'Kuram',b);await is(p+'Fark',c);},
        val=id=>page.locator('#'+id).inputValue(),checked=id=>page.locator('#'+id).isChecked(),disabled=id=>page.locator('#'+id).isDisabled(),
        noOverflow=async where=>{eq(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),true,'yatay taşma: '+where+' @'+width);},
        count=async q=>page.locator(q).count();
      const labelCheck=async where=>{eq(await page.evaluate(()=>[...document.querySelectorAll('.app-content input,.app-content select,.app-content textarea')].filter(e=>!(e.labels&&e.labels.length)&&!e.getAttribute('aria-label')).map(e=>e.id)),[],'etiketsiz denetim: '+where);
        eq(await page.evaluate(()=>[...document.querySelectorAll('.app-content button')].filter(b=>!(b.textContent.trim().length>1||b.getAttribute('aria-label'))).map(b=>b.id)),[],'adsız düğme: '+where);};
      await labelCheck('açılış');
      eq(await page.evaluate(()=>[...document.querySelectorAll('.app-content canvas')].filter(c=>c.getAttribute('role')!=='img'||!c.getAttribute('aria-label')).length),0);
      eq(await page.evaluate(()=>Object.isFrozen(PatternLab)&&!Object.getOwnPropertyDescriptor(window,'PatternLab').writable),true);
      eq(await count('#katalog tbody tr'),23);
      // --- sekme 1: Observer
      await three('gTop',0,0,0);await is('gSonOlc','—');await is('gDerOlc','—');await has('gozlemciDurum','Henüz olay yok');await has('gozlemciDurum','3 gözlemci');eq(await count('#gListe li'),3);
      await click('olayBtn');await three('gSon',3,3,0);await three('gTop',3,3,0);await three('gDer',1,1,0);await has('gOlay','1 olay / 1 yayım');await has('gozlemciDurum','E · n = 1 · 3 = 3');eq(await count('#gGunluk li'),4);
      await click('olay5Btn');await three('gTop',18,18,0);await has('gOlay','6 olay / 6 yayım');
      await page.locator('#g-grafik').uncheck();await click('olayBtn');await three('gSon',2,2,0);await three('gTop',20,20,0);
      await click('hazirTek');eq(await val('dolasma'),'canli');await three('gSon',3,4,'−1');await has('gozlemciDurum','«Günlük» bu yayımı hiç almadı');await has('gGunluk','Günlük ATLANDI');eq(await checked('g-tek'),false);eq(await count('#gListe li'),3);
      await click('olayBtn');await three('gSon',3,3,0);await three('gTop',6,7,'−1');
      await click('gozlemciReset');await page.locator('#g-gunluk').uncheck();await page.locator('#g-grafik').uncheck();await page.locator('#g-tek').check();await page.locator('#g-gunluk').check();await page.locator('#g-grafik').check();
      await click('olayBtn');await three('gSon',4,4,0);await has('gozlemciDurum','kopyasını dolaştığı için kimse atlanmadı');eq(await checked('g-tek'),false);
      await page.locator('#g-tek').check();await sel('dolasma','canli');await click('olayBtn');await three('gSon',4,4,0);await has('gozlemciDurum','listenin sonundaydı');
      await click('hazirSizinti');eq(await checked('kapatCikar'),false);await three('gSiz',3,3,0);await three('gTop',12,12,0);await has('gBosa','6 bildirim');await has('gBosa','3 ölü abonelik');eq(await count('#gListe li.dead'),3);eq(await disabled('pencereKapat'),true);await has('gozlemciDurum','3 bildirim kapanmış pencerelere gitti');
      await click('pencereAc');await page.locator('#kapatCikar').check();await click('pencereKapat');await three('gSiz',3,3,0);eq(await count('#gListe li'),6);
      await click('hazirZincir');eq(await val('zincir'),'2');await three('gSon',9,9,0);await three('gDer',3,3,0);await has('gOlay','1 olay / 3 yayım');await has('gozlemciDurum','3 · 3 = 9');await has('gozlemciDurum','«Günlük» türetilmiş olayı asıl olaydan önce aldı');
      await range('zincir',4);await click('olayBtn');await three('gSon',15,15,0);await three('gDer',5,5,0);await range('zincir',0);await click('olayBtn');await three('gSon',3,3,0);await three('gDer',1,1,0);
      await page.locator('#dongu').check();eq(await disabled('zincir'),true);await click('olayBtn');await three('gSon',36,36,0);await three('gDer',12,12,0);await has('gozlemciDurum','Geri besleme döngüsü');await has('gGunluk','derinlik sınırı 12');
      for(const id of['ekran','gunluk','turetici'])await page.locator('#g-'+id).uncheck();await click('olayBtn');await three('gSon',0,0,0);await has('gListe','Liste boş');
      for(let i=0;i<13;i++)if(!(await disabled('pencereAc')))await click('pencereAc');eq(await disabled('pencereAc'),true);eq(await count('#gListe li'),12);
      await page.locator('summary',{hasText:'Konu sınıfı'}).click();await has('konuKod','Array<Gozlemci>');await has('konuKod','this.gozlemciler.slice()');
      await noOverflow('sekme 1');await click('gozlemciReset');await three('gTop',0,0,0);eq([await val('dolasma'),await val('zincir'),await checked('dongu'),await checked('kapatCikar'),await checked('g-grafik'),await checked('g-turetici')],['kopya','1',false,true,true,false]);eq(await count('#gListe li'),3);
      // klavye: R sıfırlar, form denetiminde yok sayılır
      await click('olayBtn');await page.locator('h1').click();await page.keyboard.press('r');await three('gTop',0,0,0);
      // --- sekme 2: Strategy ve State
      await click('tab-strateji');await is('sUcretA','59.00');await is('sUcretB','59.00');await is('sUcretFark','0');await is('sGun','3 gün');await three('sKars',1,1,0);await three('sTum',6,6,0);await is('sKosDeg',0);await is('sDesEk',0);await is('sHucre',0);await has('stratejiDurum','Henüz ekleme yok');
      eq(await count('#sKodKosullu li'),12);eq(await count('#sKodDesen li'),12);eq(await count('#sKodKosullu li.new'),0);await has('sKodKosullu','if (tur === "standart") return 35 + 6 * s.kg;');await has('sKodDesen','s.sepet >= 500 ? 0 : 35 + 6 * s.kg');
      await sel('kargo','ekspres');await is('sUcretA','111.00');await is('sGun','1 gün');await three('sKars',2,2,0);await sel('kargo','esik');await is('sUcretA','59.00');await three('sKars',3,3,0);await has('stratejiDurum','eşiğinin altında');
      await range('sepet',500);await is('sUcretA','0.00');await is('sUcretB','0.00');await has('stratejiDurum','ücret 0');await range('sepet',450);await is('sUcretA','59.00');
      await range('agirlik',30);await range('mesafe',1500);await is('sUcretA','215.00');await is('sGun','6 gün');await range('agirlik',0.5);await range('mesafe',10);await is('sUcretA','38.00');await has('agirlikOut','0.5 kg');
      await page.locator('#ekTur').check();await is('sKosDeg',2);await is('sKosDegK',2);await is('sKosEk',0);await is('sDesDeg',0);await is('sDesEk',1);await is('sDesEkK',1);await is('sHucre',2);await is('sHucreK',2);await three('sTum',10,10,0);eq(await count('#sKodKosullu li.new'),2);eq(await count('#sKodDesen li.new'),4);eq(await val('kargo'),'esik');
      await sel('kargo','dron');await is('sUcretA','25.00');await is('sGun','aynı gün');await three('sKars',4,4,0);
      await page.locator('#ekIslem').check();await is('sKosDeg',2);await is('sKosEk',1);await is('sDesDeg',3);await is('sDesDegK',3);await is('sDesEk',1);await is('sHucre',6);await is('sHucreK',6);await has('sGun','g CO₂');await has('stratejiDurum','İki ekleme birden');
      await page.locator('#ekTur').uncheck();eq(await val('kargo'),'standart');await is('sKosDeg',0);await is('sKosEk',1);await is('sDesDeg',3);await is('sDesEk',0);await is('sHucre',3);await has('stratejiDurum','Karbon tahmini eklendi');
      // otomat
      await has('fDurum','«Boşta»');await has('fDurum','evet');await is('fStok','2 / 0 / 0');await three('fHucre',12,12,0);await three('fEris',3,3,0);await three('fHop',0,0,0);eq(await page.locator('#evAnahtar').isVisible(),false);
      await click('evJeton');await has('fDurum','«Jeton var»');await is('fStok','2 / 1 / 0');await has('durumDurum','Jeton alındı');eq(await count('#gecisTablo td.on'),1);await click('evJeton');await has('durumDurum','İkinci jeton geri verildi');await click('evIade');await has('fDurum','«Boşta»');await click('evSec');await has('durumDurum','Önce jeton at');
      await click('hazirTuket');await has('fDurum','«Tükendi»');await is('fStok','0 / 0 / 2');await three('fHop',4,4,0);await has('fKars','6 (4 olayda)');await click('evJeton');await has('durumDurum','Stok yok; jeton geri verildi');await click('evDoldur');await has('fDurum','«Boşta»');await is('fStok','2 / 0 / 2');
      await range('stok',5);await is('fStok','5 / 0 / 0');await has('fGunluk','Henüz olay');await click('hazirTuket');await has('fDurum','«Tükendi»');await three('fHop',10,10,0);await range('stok',1);await click('evJeton');await click('evSec');await has('fDurum','«Tükendi»');
      await page.locator('#ekDurum').check();await three('fHucre',16,16,0);await three('fEris',3,4,'−1');await is('fKosDeg',4);await is('fKosDegK',4);await is('fKosEk',0);await is('fDesDeg',0);await is('fDesEk',1);await is('fHucre',4);await has('durumDurum','hiçbir geçiş ona götürmüyor');await has('gecisTablo','(erişilemez)');
      await page.locator('#ekOlay').check();await three('fHucre',20,20,0);await three('fEris',4,4,0);await is('fKosDeg',4);await is('fKosEk',1);await is('fDesDeg',3);await is('fDesEk',1);await is('fHucre',8);await is('fHucreK',8);eq(await page.locator('#evAnahtar').isVisible(),true);
      await click('evJeton');await click('evAnahtar');await has('fDurum','«Bakımda»');await has('durumDurum','Jeton iade edildi; bakıma alındı');await click('evSec');await has('fDurum','«Bakımda»');await click('evAnahtar');await has('fDurum','«Boşta»');await has('fDurum','evet');
      await page.locator('#ekDurum').uncheck();await three('fHucre',15,15,0);await three('fEris',3,3,0);await is('fKosDeg',0);await is('fKosEk',1);await is('fDesDeg',3);await is('fDesEk',0);await click('evAnahtar');await has('durumDurum','Kasa boşaltıldı');
      await click('makineBastan');await has('fGunluk','Henüz olay');await page.locator('summary',{hasText:'iki sürüm yan yana'}).click();await has('fKodKosullu','if (m.durum === "bos") { m.kredi = 1;');await has('fKodDesen','anahtar(m) {');
      await labelCheck('sekme 2');await noOverflow('sekme 2');await click('stratejiReset');await is('sUcretA','59.00');eq([await val('kargo'),await val('agirlik'),await val('mesafe'),await val('sepet'),await val('stok'),await checked('ekTur'),await checked('ekIslem'),await checked('ekDurum'),await checked('ekOlay')],['standart','4','300','350','2',false,false,false,false]);await three('fHucre',12,12,0);await is('fStok','2 / 0 / 0');
      // --- sekme 3: Decorator ve Composite
      await click('tab-sarmal');await is('dCikti','«;e=h?kAn»');await has('dUzun','8 karakter · girdi 32 · oran 0.25');await is('dGeri','Girdiyle aynı: evet');await three('dCag',20,20,0);await three('dHed',4,4,0);eq(await count('#siraTablo tbody tr'),6);eq(await count('#siraTablo tbody tr.on'),1);await has('sarmalDurum','8 ile 64 karakter arasında');await has('sarmalDurum','çıktı 64 karakter olurdu');await has('sarmalDurum','yerleri değişse 16 karakter');eq(await count('#dGunluk li'),20);
      await click('sarSonra-tampon');await has('dUzun','16 karakter');await three('dHed',2,2,0);await three('dCag',20,20,0);await has('sarmalDurum','parça sınırını aşan tekrarı göremiyor');eq(await page.evaluate(()=>document.activeElement.id),'sarSonra-tampon');
      await click('sarOnce-sifrele');await click('sarOnce-sifrele');await has('boruGoster','Kaynak · 32 karakter, 8 parça→Şifrele · 8 çağrı→Sıkıştır · 8 çağrı→Tampon · 8 çağrı→Hedef · 8 yazma');await has('dUzun','64 karakter · girdi 32 · oran 2.00');await has('sarmalDurum','Şifreleme sıkıştırmadan önce');await has('sarmalDurum','Çıktı girdiden uzun');eq(await disabled('sarOnce-sifrele'),true);eq(await page.evaluate(()=>document.activeElement.id),'sarSonra-sifrele');
      await page.locator('#sar-onaltilik').check();eq(await count('#siraTablo tbody tr'),24);await is('dGeri','Girdiyle aynı: evet');await three('dCag',(await read('dCagKuram')),(await read('dCagOlc')),0);
      for(const id of['tampon','sikistir','sifrele','onaltilik'])await page.locator('#sar-'+id).uncheck();await is('dCikti','«aaaaaaaabbbbbbbbccccccccdddddddd»');await three('dCag',8,8,0);await three('dHed',8,8,0);await has('sarmalDurum','Hiç sarmalayıcı yok');eq(await count('#siraTablo tbody tr'),1);eq(await disabled('tamponB'),true);eq(await disabled('anahtarK'),true);
      await page.locator('#sar-sikistir').check();await range('parca',1);await has('dUzun','64 karakter');await three('dCag',64,64,0);await range('parca',8);await has('dUzun','8 karakter');await three('dCag',8,8,0);await click('metinDuz');await has('dUzun','64 karakter · girdi 32');await click('metinTekrar');await has('dUzun','8 karakter');
      await page.locator('#metin').fill('şifre');eq(await page.locator('#metinMesaj').isVisible(),true);await has('metinMesaj','ASCII');await has('dUzun','girdi 32');await page.locator('#metin').fill('');await has('metinMesaj','boş');await page.locator('#metin').fill('x'.repeat(65));await has('metinMesaj','En çok 64');await page.locator('#metin').fill('x'.repeat(64));eq(await page.locator('#metinMesaj').isVisible(),false);await has('dUzun','girdi 64');await page.locator('#metin').fill('a');await is('dCikti','«1a»');await three('dCag',2,2,0);
      await page.locator('#metin').fill('<b>&"x"</b>');await page.locator('#sar-sikistir').uncheck();await is('dCikti','«<b>&"x"</b>»');await has('dGunluk','Hedef.yaz("<b>&"x"<")');
      await three('pAlt',15,15,0);await three('pSir',64,64,0);await is('pDek','4 sınıf');await has('patlamaDurum','TamponAkış');await range('ozellikN',10);await three('pAlt',1023,1023,0);await three('pSir',9864100,9864100,0);await lacks('patlamaDurum','Bir özellik daha');await range('ozellikN',1);await three('pAlt',1,1,0);await three('pSir',1,1,0);await has('patlamaDurum','desen bir şey kazandırmaz');await range('ozellikN',5);await three('pAlt',31,31,0);await three('pSir',325,325,0);await has('patlamaDurum','31 yerine 63');
      await is('cTopOlc',300);await is('cTopKuram',300);await is('cTopFark',0);await three('cCag',11,11,0);await is('cYapi','6 / 5 / 4');await has('cSecili','proje (klasör) · 300 kB · 11 çağrı');eq(await count('#agacListe button'),11);eq(await disabled('dugumSil'),true);
      await click('dugum-0');await has('cSecili','README.md (dosya) · 4 kB · 1 çağrı');eq(await disabled('dugumDosya'),true);eq(await disabled('dugumKlasor'),true);await has('agacDurum','yaprak');eq(await page.evaluate(()=>document.activeElement.id),'dugum-0');
      await click('dugum-3');await has('cSecili','testler (klasör) · 0 kB · 1 çağrı');await has('agacDurum','boş');await range('yeniBoyut',500);await click('dugumDosya');await is('cTopOlc',800);await is('cTopKuram',800);await three('cCag',12,12,0);await range('yeniBoyut',1);await click('dugumDosya');await is('cTopOlc',801);await click('dugumKlasor');await three('cCag',14,14,0);await is('cYapi','8 / 6 / 4');
      await click('dugum-1');await click('dugumSil');await is('cTopOlc',745);await three('cCag',8,8,0);await has('cSecili','proje (klasör)');
      await sel('agac','zincir');await is('cTopOlc',1);await three('cCag',6,6,0);await is('cYapi','1 / 5 / 6');await click('dugum-0-0-0-0');await click('dugumKlasor');await click('dugum-0-0-0-0-1');await click('dugumKlasor');await click('dugum-0-0-0-0-1-0');await click('dugumKlasor');await click('dugum-0-0-0-0-1-0-0');eq(await disabled('dugumKlasor'),true);await has('agacDurum','Derinlik sınırına');await is('cYapi','1 / 8 / 8');
      await sel('agac','siparis');await is('cTopOlc',305);await three('cCag',8,8,0);await click('dugum-kok');for(let i=0;i<40;i++)if(!(await disabled('dugumDosya')))await click('dugumDosya');eq(await disabled('dugumDosya'),true);await three('cCag',40,40,0);await is('cTopFark',0);await has('agacDurum','Düğüm sınırına');
      await page.locator('summary',{hasText:'sarmalayıcı sınıfları'}).click();await has('sarmalKod','class Tampon extends Sarmalayici');
      await labelCheck('sekme 3');await noOverflow('sekme 3');await click('sarmalReset');await is('dCikti','«;e=h?kAn»');eq([await val('metin'),await val('parca'),await val('tamponB'),await val('anahtarK'),await val('ozellikN'),await val('agac'),await val('yeniBoyut'),await checked('sar-onaltilik'),await checked('sar-tampon')],['aaaaaaaabbbbbbbbccccccccdddddddd','4','8','3','4','proje','50',false,true]);await three('cCag',11,11,0);await three('pAlt',15,15,0);await has('boruGoster','Tampon · 8 çağrı→Sıkıştır · 4 çağrı→Şifrele · 4 çağrı');
      await range('tamponB',2);await three('dCag',(await read('dCagKuram')),(await read('dCagOlc')),0);await has('dUzun','32 karakter');await range('tamponB',16);await has('dUzun','8 karakter');await three('dHed',2,2,0);await range('anahtarK',20);await is('dGeri','Girdiyle aynı: evet');await click('sarmalReset');
      // --- sekme 4
      await click('tab-fabrika');await three('kKal',12,12,0);await three('kKop',7,7,0);await is('kEkOlc','4 / 1');await is('kEkKuram','4 / 1');await three('kEs',12,12,0);await three('kFab',15,15,0);await is('kKarOlc','12 / 3');await is('kKarKuram','12 / 3');await has('fabrikaDurum','5 sınıf daha az');eq(await count('#ornekTablo tbody tr'),4);await has('ornekTablo','<Tamam>');await has('ornekTablo','<*> Kabul');
      await sel('platformSec','0');await is('kKarOlc','4 / 1');await has('ornekTablo','[Tamam]');await range('urunN',8);await range('platformM',8);await three('kKal',64,64,0);await three('kKop',16,16,0);await is('kEkOlc','8 / 1');await three('kEs',64,64,0);await three('kFab',72,72,0);await sel('platformSec','7');await is('kKarOlc','64 / 8');await is('kKarKuram','64 / 8');
      await range('platformM',1);eq(await val('platformSec'),'0');await three('kKal',8,8,0);await three('kKop',9,9,0);await has('fabrikaDurum','Bridge 1 sınıf daha fazla ister');await range('urunN',1);await three('kKal',1,1,0);await three('kKop',2,2,0);await is('kEkOlc','1 / 1');await range('urunN',2);await range('platformM',2);await has('fabrikaDurum','iki sayı eşit');
      await is('aC','20.00 °C');await is('aKm','48.28 km/saat');await is('aM','914.40 m');await has('aGeri','ölçülen 0');await three('aCag',3,3,0);await is('aSabit','−40 °F → −40.00 °C');await range('fahr',-40);await is('aC','−40.00 °C');await has('fahrOut','−40 °F');await range('fahr',212);await is('aC','100.00 °C');await range('fahr',32);await is('aC','0.00 °C');await range('mph',150);await is('aKm','241.40 km/saat');await range('mph',0);await is('aKm','0.00 km/saat');await range('fit',30000);await is('aM','9144.00 m');await range('fit',0);await is('aM','0.00 m');
      await range('fahr',71);await has('adaptorDurum','71 °F');await has('aGeri','ölçülen');
      await is('tGecen','3 / 3');await three('tOrn',1,1,0);await three('tSir',2,2,0);await has('tBagli','Evet: 6 sıralamadan 4 tanesinde');await has('tekilDurum','Şans eseri');eq(await disabled('testOnce-fatura'),true);
      await click('testSonra-fatura');await is('tGecen','2 / 3');await has('tekilDurum','«fatura» testi kaldı');await has('tekilDurum','«indirim günü» ortak nesnede %10');await has('tekilDurum','120 bekledi, 110 buldu');await has('testTablo','kaldı');eq(await page.evaluate(()=>document.activeElement.id),'testSonra-fatura');
      await click('testSonra-fatura');await has('tekilDurum','«muaf ürün» ortak nesnede %0');await has('tekilDurum','120 bekledi, 100 buldu');eq(await disabled('testSonra-fatura'),true);
      await sel('paylasim','sifirla');await is('tGecen','3 / 3');await three('tOrn',3,3,0);await three('tSir',6,6,0);await has('tBagli','Hayır');await sel('paylasim','enjekte');await is('tGecen','3 / 3');await three('tOrn',3,3,0);await three('tSir',6,6,0);await has('tekilDurum','sıra önemsiz');await sel('paylasim','paylasilan');await is('tGecen','2 / 3');
      await page.locator('summary',{hasText:'Ayarlar sınıfı'}).click();await has('ayarlarKod','static tekil()');await page.locator('summary',{hasText:'MetrikAdaptor'}).click();await has('adaptorKod','1.609344');
      await labelCheck('sekme 4');await noOverflow('sekme 4');await click('fabrikaReset');await three('kKal',12,12,0);await is('kKarOlc','12 / 3');eq([await val('urunN'),await val('platformM'),await val('platformSec'),await val('fahr'),await val('mph'),await val('fit'),await val('paylasim')],['4','3','2','68','30','3000','paylasilan']);await is('tGecen','3 / 3');await is('aC','20.00 °C');
      await page.locator('#fahr').focus();await page.keyboard.press('r');eq(await val('fahr'),'68');
      // sekme klavyesi ve derin bağlantı
      await page.locator('#tab-fabrika').focus();await page.keyboard.press('Home');eq(await page.locator('#tab-gozlemci').getAttribute('aria-selected'),'true');await page.keyboard.press('ArrowRight');eq(await page.locator('#tab-strateji').getAttribute('aria-selected'),'true');await page.keyboard.press('End');eq(await page.locator('#tab-fabrika').getAttribute('aria-selected'),'true');await page.keyboard.press('ArrowRight');eq(await page.locator('#tab-gozlemci').getAttribute('aria-selected'),'true');await page.keyboard.press('ArrowLeft');eq(await page.locator('#tab-fabrika').getAttribute('aria-selected'),'true');
      eq(await page.evaluate(()=>document.activeElement.id),'tab-fabrika');eq(await count('[role=tabpanel]:not([hidden])'),1);eq(await count('[role=tab][tabindex="0"]'),1);eq(new URL(page.url()).hash,'#fabrika');
      await page.locator('#desen-observer a').click();await page.waitForFunction(()=>document.getElementById('tab-gozlemci').getAttribute('aria-selected')==='true');eq(await page.locator('#tab-gozlemci').getAttribute('aria-selected'),'true');eq(await page.locator('#panel-gozlemci').isVisible(),true);
      await page.goto(url+'#sarmal');await page.reload();await page.waitForSelector('#dCikti');eq(await page.locator('#tab-sarmal').getAttribute('aria-selected'),'true');await is('dCikti','«;e=h?kAn»');
      await noOverflow('son');assert.deepEqual(errors,[],'konsol/sayfa hatası @'+width);checks++;await ctx.close();
    }
    console.log(`G ${SLUG}: ${checks-before} tarayıcı kontrolü (390 px açık + 1280 px koyu; sekmeler, hazırlar, sınır değerleri, klavye, derin bağlantı, taşma, etiketler) PASS`);
  }finally{await browser?.close();await new Promise(r=>server.close(r));}
}
