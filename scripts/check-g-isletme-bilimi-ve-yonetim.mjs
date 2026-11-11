// G: işletme bilimi laboratuvarı. Çekirdek (BizLab) sayfanın formüllerini yinelemeyen başvurularla sınanır:
// kaba kuvvet sayım, Horner/Durand–Kerner kökleri, geometrik seri, bağımsız T-hesap defteri, politika sayımı,
// ayrı bir üreteçle Monte Carlo. `--browser`: 390 px açık ve 1280 px koyu temada arayüz denetimleri.
import fs from 'node:fs';
import vm from 'node:vm';
import assert from 'node:assert/strict';
const html=fs.readFileSync(new URL('../isletme-bilimi-ve-yonetim.html',import.meta.url),'utf8');
const source=html.split('/* KERNEL-BEGIN */')[1]?.split('/* KERNEL-END */')[0];
assert(source,'KERNEL sınırları gerekli');
const context={window:{}};vm.createContext(context);vm.runInContext(source,context);
const K=context.window.BizLab;assert(Object.isFrozen(K));
let checks=0;
const near=(a,b,tol=1e-9,msg='')=>{assert(Number.isFinite(a)&&Math.abs(a-b)<=tol*Math.max(1,Math.abs(b)),`${msg} ${a} ≠ ${b}`);checks++;};
const plain=x=>x!==null&&typeof x==='object'?JSON.parse(JSON.stringify(x)):x; // vm bağlamından gelen diziler başka prototip taşır
const eq=(a,b,msg='')=>{assert.deepEqual(plain(a),plain(b),msg||`${JSON.stringify(a)} ≠ ${JSON.stringify(b)}`);checks++;};
const yes=(c,msg)=>{assert(c,msg);checks++;};
let seed=12345;const rnd=()=>{seed=(Math.imul(seed,1103515245)+12345)>>>0;return seed/4294967296;}; // bağımsız LCG

/* ── 1. Başabaş ── */
{
 const profit=(F,p,v,Q)=>Q*p-Q*v-F; // bağımsız kâr
 for(const F of[0,1000,10000,30000,60000])for(const v of[0,20,40,69])for(const p of[10,45,70,100])for(const Q0 of[0,400,1200,2000])for(const cap of[200,1500,2000]){
  const r=K.cvp({F,cap,Q0,target:12000,delta:.1,products:[{p,v,w:1}]});
  if(p<=v){eq(r.bepTheory,null);if(F>0)eq(r.bepMeasured,null);continue;}
  near(profit(F,p,v,r.bepTheory),0,1e-9*Math.max(1,F));near(profit(F,p,v,r.targetTheory),12000,1e-9);
  let whole=0;while(profit(F,p,v,whole)<0)whole++; // kaba kuvvet sayım
  eq(r.bepWhole,whole);near(r.bepMeasured,r.bepTheory,1e-9);yes(whole-r.bepMeasured>=-1e-9&&whole-r.bepMeasured<1+1e-9);
  near(r.bepRevTheory,r.bepTheory*p,1e-9);near(r.targetMeasured,r.targetTheory,1e-9);
  const Qs=Math.min(Q0,cap),pi0=profit(F,p,v,Qs);eq(r.sold,Qs);near(r.base.profit,pi0,1e-9);
  if(r.dolMeasured!==null){const Q1=Math.min(Q0*1.1,cap),pi1=profit(F,p,v,Q1);near(r.dolMeasured,((pi1-pi0)/pi0)/((Q1-Qs)/Qs),1e-7);near(r.dolMeasured,r.dolTheory,1e-7);near(r.dolTheory,Qs/(Qs-r.bepTheory),1e-7);near(r.dolTheory*r.mosTheory,1,1e-9);near(r.mosMeasured,r.mosTheory,1e-7);}
  else yes(r.dolReason==='zero-profit'||r.dolReason==='no-move');
 }
 // Sayfanın varsayılanı ve hazır ayarları (elle hesap)
 const d=K.cvp({F:30000,cap:1500,Q0:1200,target:12000,delta:.1,products:[{p:70,v:40,w:1}]});
 near(d.bepTheory,1000);near(d.bepRevTheory,70000);near(d.base.profit,6000);near(d.dolMeasured,6,1e-9);near(d.targetTheory,1400);near(d.mosTheory,1/6);
 const labor=K.cvp({F:12000,cap:1500,Q0:1200,target:12000,delta:.1,products:[{p:70,v:55,w:1}]}),auto=K.cvp({F:54000,cap:1500,Q0:1200,target:12000,delta:.1,products:[{p:70,v:20,w:1}]});
 near(labor.base.profit,6000);near(auto.base.profit,6000);near(labor.dolMeasured,3,1e-9);near(auto.dolMeasured,10,1e-9);near(labor.bepTheory,800);near(auto.bepTheory,1080);
 const frac=K.cvp({F:10000,cap:1500,Q0:400,target:2000,delta:.1,products:[{p:70,v:40,w:1}]});near(frac.bepTheory,1000/3);eq(frac.bepWhole,334);near(frac.base.profit,2000);
 const off=K.cvp({F:30000,cap:1500,Q0:1200,target:12000,delta:.1,products:[{p:70,v:60,w:1}]});near(off.bepTheory,3000);near(off.bepMeasured,3000);near(off.base.profit,-18000);
 const zero=K.cvp({F:30000,cap:1500,Q0:1000,target:0,delta:.1,products:[{p:70,v:40,w:1}]});eq(zero.dolMeasured,null);eq(zero.dolReason,'zero-profit');
 const full=K.cvp({F:30000,cap:1000,Q0:1500,target:0,delta:.1,products:[{p:80,v:40,w:1}]});eq(full.dolReason,'no-move');eq(full.clipped,true);
 // Karma: paket yöntemiyle bağımsız başabaş
 for(let k=0;k<300;k++){const prods=[0,1,2].map(()=>({p:10+Math.floor(rnd()*91),v:Math.floor(rnd()*91),w:Math.floor(rnd()*11)})),F=1000*Math.floor(rnd()*61),W=prods.reduce((s,x)=>s+x.w,0);
  const r=K.cvp({F,cap:1500,Q0:1200,target:5000,delta:.2,products:prods});
  if(W===0){eq(r.defined,false);continue;}
  const bundleCm=prods.reduce((s,x)=>s+x.w*(x.p-x.v),0);
  if(bundleCm<=0){eq(r.bepTheory,null);continue;}
  const total=F/bundleCm*W;near(r.bepTheory,total,1e-9);
  const pr=prods.reduce((s,x)=>s+total*x.w/W*(x.p-x.v),0)-F;near(pr,0,1e-7*Math.max(1,F));
  if(total<=200000)near(r.bepMeasured,total,1e-7);else eq(r.bepMeasured,null);
 }
 const mix=K.cvp({F:30000,cap:1500,Q0:1200,target:12000,delta:.1,products:[{p:50,v:30,w:5},{p:80,v:40,w:3},{p:100,v:45,w:2}]});
 near(mix.mix.cm,33);near(mix.mix.price,69);near(mix.bepTheory,30000/33);near(mix.base.profit,9600);
 // Basamaklı sabit maliyet: bağımsız parçalı fonksiyonla tarama
 for(const cap of[400,1000,1500])for(const F of[10000,30000])for(const p of[50,70]){const c={F,cap,Q0:cap,target:0,delta:.1,capMode:'step',stepF:10000,products:[{p,v:40,w:1}]},r=K.cvp(c);
  const f=Q=>Q*(p-40)-F-(Q>cap?10000*(Math.ceil(Q/cap)-1):0);let q=0;while(q<=200000&&f(q)<0)q++;eq(r.bepWhole,q>200000?null:q);
  near(r.next.profit,f(cap*1.1),1e-9);eq(r.stepCrossed,true);if(r.dolMeasured!==null)yes(Math.abs(r.dolMeasured-r.dolTheory)>1e-6,'basamakta formül ayrışmalı');else eq(r.dolReason,'zero-profit');}
 for(const bad of[{F:-1},{cap:0},{Q0:-1},{delta:0},{delta:-1},{capMode:'x'}]){assert.throws(()=>K.cvp({F:1,cap:1,Q0:1,target:0,delta:.1,products:[{p:2,v:1,w:1}],...bad}));checks++;}
}

/* ── 2. Paranın zaman değeri ── */
{
 const horner=(f,r)=>{const x=1/(1+r);let s=0;for(let t=f.length-1;t>=0;t--)s=s*x+f[t];return s;};
 const realRoots=f=>{ // Durand–Kerner: Σ f_t x^t = 0, x = 1/(1+r)
  let c=[...f];while(c.length>1&&c[c.length-1]===0)c.pop();const n=c.length-1;if(n<1)return[];const a=c.map(x=>x/c[n]);
  let z=Array.from({length:n},(_,k)=>{const ang=2*Math.PI*k/n+.4,m=1.3;return[m*Math.cos(ang),m*Math.sin(ang)];});
  const mul=(u,v)=>[u[0]*v[0]-u[1]*v[1],u[0]*v[1]+u[1]*v[0]],div=(u,v)=>{const d=v[0]*v[0]+v[1]*v[1];return[(u[0]*v[0]+u[1]*v[1])/d,(u[1]*v[0]-u[0]*v[1])/d];};
  for(let it=0;it<2000;it++)z=z.map((zi,i)=>{let pv=[1,0];for(let k=n-1;k>=0;k--){pv=mul(pv,zi);pv[0]+=a[k];}let den=[1,0];z.forEach((zj,j)=>{if(j!==i)den=mul(den,[zi[0]-zj[0],zi[1]-zj[1]]);});const q=div(pv,den);return[zi[0]-q[0],zi[1]-q[1]];});
  return z.filter(v=>Math.abs(v[1])<1e-7&&v[0]>0).map(v=>1/v[0]-1).sort((x,y)=>x-y);};
 for(let k=0;k<400;k++){const n=2+Math.floor(rnd()*6),f=Array.from({length:n},()=>Math.round((rnd()-.45)*2000)),r=Math.round(rnd()*80)/200;
  near(K.npv(f,r),horner(f,r),1e-9);const l=K.ledger(f,r);near(l.npv,horner(f,r),1e-9);near(l.final,horner(f,r)*(1+r)**(n-1),1e-9);
  const mine=K.irrAll(f),ref=realRoots(f).filter(x=>x>-.9+1e-6&&x<10-1e-6);
  for(const x of mine)near(horner(f,x),0,1e-6*Math.max(1,...f.map(Math.abs)));
  // tarama basit kökleri kaçırmamalı (yakın çift kökler dışında)
  const sep=ref.every((x,i)=>!i||x-ref[i-1]>5e-3);if(sep&&mine.length===ref.length)mine.forEach((x,i)=>near(x,ref[i],1e-6));else yes(mine.length<=ref.length+1);
  yes(mine.length<=K.signChanges(f),'Descartes: kök sayısı ≤ işaret değişimi');
 }
 // Geleneksel akış: tek işaret değişimi → en çok bir kök (Descartes), kök varsa NBD orada işaret değiştirir
 for(let k=0;k<200;k++){const f=[-(500+Math.floor(rnd()*1500)),...Array.from({length:5},()=>Math.floor(rnd()*600))];const roots=K.irrAll(f);yes(roots.length<=1);eq(K.signChanges(f),f.slice(1).some(x=>x>0)?1:0);
  if(roots.length){yes(K.npv(f,roots[0]-1e-4)>0&&K.npv(f,roots[0]+1e-4)<0);const lg=K.irrByLedger(f,roots[0]);near(lg,roots[0],1e-9);}}
 // Kapalı çözümlü ikinci dereceler
 eq(K.irrAll([-1000,2300,-1320]).map(x=>+x.toFixed(9)),[.1,.2]);eq(K.irrAll([-1000,2000,-1100]).length,0);eq(K.signChanges([-1000,2300,-1320]),2);
 for(let k=0;k<100;k++){const r1=Math.round(rnd()*40)/100,r2=r1+.05+Math.round(rnd()*40)/100,f=[-1000,1000*((1+r1)+(1+r2)),-1000*(1+r1)*(1+r2)],got=K.irrAll(f);eq(got.length,2);near(got[0],r1,1e-7);near(got[1],r2,1e-7);}
 near(K.irrAll([-100,110])[0],.1,1e-9);near(K.irrAll([-100,0,121])[0],.1,1e-9);
 // Sayfanın varsayılan projeleri
 const A=[-1000,500,400,300,100,0,0],B=[-1000,100,300,400,600,0,0];
 near(K.npv(A,0),300);near(K.npv(B,0),400);near(K.npv(A,.05),-1000+500/1.05+400/1.05**2+300/1.05**3+100/1.05**4);
 const ia=K.irrAll(A)[0],ib=K.irrAll(B)[0],x=K.crossover(A,B);eq(x.length,1);yes(ia>ib);near(K.npv(A,x[0]),K.npv(B,x[0]),1e-9);
 yes(K.npv(B,.05)>K.npv(A,.05)&&K.npv(A,.10)>K.npv(B,.10)&&x[0]>.05&&x[0]<.10,'sıralama kesişimde dönmeli');
 near(ia,.14488844,1e-7);near(ib,.11790556,1e-7);near(x[0],.07167280,1e-7);
 // Geri ödeme ve kârlılık endeksi
 let p=K.payback(A,0);eq(p.whole,3);near(p.interpolated,2+100/300);p=K.payback(B,0);eq(p.whole,4);near(p.interpolated,3+200/600);
 p=K.payback(A,.05);eq(p.whole,3);near(p.interpolated,2+(1000-500/1.05-400/1.05**2)/(300/1.05**3));
 eq(K.payback([-1000,100,100],0).reached,false);eq(K.payback([-1000,2300,-1320],0).relapse,true);eq(K.payback(A,0).relapse,false);eq(K.payback([100,200],0).defined,false);eq(K.profitabilityIndex([100,200],.1),null);
 near(K.profitabilityIndex(A,.05),(500/1.05+400/1.05**2+300/1.05**3+100/1.05**4)/1000);
 for(let k=0;k<100;k++){const f=[-(100+Math.floor(rnd()*900)),...Array.from({length:4},()=>Math.floor(rnd()*500))],r=rnd()*.3;near(K.profitabilityIndex(f,r),1+K.npv(f,r)/(-f[0]),1e-9);}
 // Anüite: geometrik seri ve ödeme planı
 for(const P of[1000,10000,100000])for(const i of[0,.001,.015,.05])for(const n of[1,2,12,60]){
  const pay=K.annuity(P,i,n);let pv=0;for(let k=1;k<=n;k++)pv+=pay/(1+i)**k;near(pv,P,1e-9);
  const s=K.schedule(P,i,n,pay);near(s.final,0,1e-7*P/Math.max(P,1)+1e-6);near(s.totalPrincipal,P,1e-9);near(s.totalInterest,pay*n-P,1e-7);eq(s.rows.length,n);
  yes(s.rows.every((x,j)=>!j||x.balance<s.rows[j-1].balance+1e-9));near(K.paymentBySimulation(P,i,n),pay,1e-9);}
 near(K.annuity(10000,.015,12),916.7999,1e-7);near(1/K.annuity(1,.10,5),3.7908,2e-5); // ders kitabı anüite çarpanı (%10, 5 dönem)
 near(K.annuity(1200,0,12),100);
 for(const call of[()=>K.npv([1],-1),()=>K.npv([],.1),()=>K.npv([NaN],.1),()=>K.annuity(0,.1,5),()=>K.annuity(100,-.1,5),()=>K.annuity(100,.1,2.5)]){assert.throws(call);checks++;}
}

/* ── 3. Çift taraflı kayıt ── */
{
 const b=K.books([...K.SAMPLE_PERIOD]); // elle hesaplanan örnek dönem
 eq([b.is.sales,b.is.cogs,b.is.gross,b.is.ebit,b.is.net],[40000,24000,16000,4000,2500]);
 eq([b.bs.cash,b.bs.ar,b.bs.inv,b.bs.ppeNet,b.bs.assets,b.bs.ap,b.bs.loan,b.bs.equity],[34500,15000,6000,36000,91500,10000,30000,51500]);
 eq([b.cf.op,b.cf.investing,b.cf.financing,b.cf.total,b.indirect.op],[-4500,-40000,79000,34500,-4500]);
 near(b.ratios.current,5.55);near(b.ratios.quick,4.95);near(b.ratios.roe,2500/51500);near(b.ratios.dupont,2500/51500,1e-12);near(b.ratios.inventoryTurnover,4);near(b.ratios.coverage,4000/1500);eq(b.debits,273500);eq(b.credits,273500);
 // Bağımsız defter: hesapları tek tek işleyen ayrı bir model (tam sayı tutarlar)
 const types=['capital','borrow','buyPpe','buyInv','sale','collect','paySupplier','wages','depreciate','payInterest','repay','dividend'];
 let accepted=0,rejected=0;
 for(let run=0;run<400;run++){
  const S={cash:0,ar:0,inv:0,ppe:0,acc:0,ap:0,loan:0,cap:0,div:0,sales:0,cogs:0,wages:0,dep:0,int:0,opc:0,invc:0,finc:0},list=[];
  for(let k=0;k<25;k++){const type=types[Math.floor(rnd()*types.length)],amount=100*(1+Math.floor(rnd()*200)),e={type,amount};if(type==='sale'){e.costRatio=[.25,.5,.75,1][Math.floor(rnd()*4)];e.cash=rnd()<.5;}
   const net=S.sales-S.cogs-S.wages-S.dep-S.int;let okay=true;
   switch(type){
    case'capital':S.cash+=amount;S.cap+=amount;S.finc+=amount;break;
    case'borrow':S.cash+=amount;S.loan+=amount;S.finc+=amount;break;
    case'buyPpe':if(amount>S.cash)okay=false;else{S.cash-=amount;S.ppe+=amount;S.invc-=amount;}break;
    case'buyInv':S.inv+=amount;S.ap+=amount;break;
    case'sale':{const c=amount*e.costRatio;if(c>S.inv)okay=false;else{S.inv-=c;S.cogs+=c;S.sales+=amount;if(e.cash){S.cash+=amount;S.opc+=amount;}else S.ar+=amount;}break;}
    case'collect':if(amount>S.ar)okay=false;else{S.ar-=amount;S.cash+=amount;S.opc+=amount;}break;
    case'paySupplier':if(amount>S.ap||amount>S.cash)okay=false;else{S.ap-=amount;S.cash-=amount;S.opc-=amount;}break;
    case'wages':if(amount>S.cash)okay=false;else{S.cash-=amount;S.wages+=amount;S.opc-=amount;}break;
    case'depreciate':if(amount>S.ppe-S.acc)okay=false;else{S.acc+=amount;S.dep+=amount;}break;
    case'payInterest':if(S.loan<=0||amount>S.cash)okay=false;else{S.cash-=amount;S.int+=amount;S.opc-=amount;}break;
    case'repay':if(amount>S.loan||amount>S.cash)okay=false;else{S.loan-=amount;S.cash-=amount;S.finc-=amount;}break;
    case'dividend':if(amount>net-S.div||amount>S.cash)okay=false;else{S.div+=amount;S.cash-=amount;S.finc-=amount;}break;}
   if(okay){list.push(e);accepted++;}else{rejected++;let err=null;try{K.books([...list,e]);}catch(x){err=x;}yes(err?.name==='RangeError','geçersiz kayıt reddedilmeli: '+type);eq(err.index,list.length);}
  }
  const r=K.books(list),net=S.sales-S.cogs-S.wages-S.dep-S.int,assets=S.cash+S.ar+S.inv+S.ppe-S.acc,equity=S.cap+net-S.div;
  near(r.bs.cash,S.cash);near(r.bs.ar,S.ar);near(r.bs.inv,S.inv);near(r.bs.ppeNet,S.ppe-S.acc);near(r.bs.assets,assets);near(r.bs.ap,S.ap);near(r.bs.loan,S.loan);near(r.bs.equity,equity);near(r.is.net,net);near(r.is.sales,S.sales);
  near(r.cf.op,S.opc);near(r.cf.investing,S.invc);near(r.cf.financing,S.finc);near(S.opc+S.invc+S.finc,S.cash);
  near(assets,S.ap+S.loan+equity);near(r.checks.balance,0,1e-6);near(r.checks.trial,0,1e-6);near(r.checks.cash,0,1e-6);near(r.checks.operating,0,1e-6);
  near(r.indirect.op,net+S.dep-S.ar-S.inv+S.ap,1e-9);yes(Math.min(r.bs.cash,r.bs.ar,r.bs.inv,r.bs.ap,r.bs.loan,r.bs.ppeNet)>=-1e-9);
  if(r.ratios.roe!==null&&r.ratios.dupont!==null){near(r.ratios.dupont,net/equity,1e-9);near(r.ratios.roe,net/equity,1e-12);}
  if(equity<=0)eq(r.ratios.roe,null);if(S.ap===0)eq(r.ratios.current,null);
  eq(r.journal.length,list.length);near(r.debits,r.journal.reduce((s,j)=>s+j.lines.reduce((t,l)=>t+l.amount,0),0));
 }
 yes(accepted>3000&&rejected>1000,`fuzz kapsamı ${accepted}/${rejected}`);
 const empty=K.books([]);eq(empty.bs.assets,0);eq(empty.ratios.roe,null);eq(empty.ratios.current,null);
 for(const bad of[[{type:'wages',amount:1}],[{type:'capital',amount:0}],[{type:'capital',amount:-5}],[{type:'capital',amount:NaN}],[{type:'x',amount:5}],[{type:'capital',amount:2e7}],[{type:'capital',amount:100},{type:'payInterest',amount:10}],[{type:'buyInv',amount:100},{type:'sale',amount:100,costRatio:1.2}],[{type:'capital',amount:100},{type:'dividend',amount:10}]]){assert.throws(()=>K.books(bad));checks++;}
 // Kâr ≠ nakit: veresiye satış kârı artırır, kasayı artırmaz
 const cr=K.books([{type:'capital',amount:1000},{type:'buyInv',amount:600},{type:'sale',amount:1000,costRatio:.6,cash:false}]);eq([cr.is.net,cr.cf.op,cr.bs.cash],[400,0,1000]);
}

/* ── 4. Karar ağacı ── */
{
 const acts=['launch','drop'];
 const exact=(c,pol)=>{ // ortak dağılım üzerinden doğrudan sayım
  let m=0;for(const high of[1,0])for(const pos of[1,0]){const pr=(high?c.p:1-c.p)*(pos?(high?c.sens:c.fpos):1-(high?c.sens:c.fpos));
   let v=0;if(pol.first==='launch')v=high?c.H:c.L;else if(pol.first==='test')v=((pos?pol.pos:pol.neg)==='launch'?(high?c.H:c.L):0)-c.cost;m+=pr*v;}return m;};
 const cases=[];for(const p of[0,.1,.33,.4,.5,.75,1])for(const H of[0,100,300,500])for(const L of[-300,-150,0])for(const cost of[0,20,100])for(const sens of[.5,.85,1])for(const fpos of[0,.2,.5])cases.push({p,H,L,cost,sens,fpos});
 for(const c of cases){const t=K.tree(c);
  const pols=[{first:'drop',pos:'drop',neg:'drop'},{first:'launch',pos:'drop',neg:'drop'}];for(const a of acts)for(const b of acts)pols.push({first:'test',pos:a,neg:b});
  const vals=pols.map(q=>exact(c,q)),top=Math.max(...vals);near(t.bestValue,top,1e-9);near(exact(c,t.policy),top,1e-9);
  near(t.emvTest,Math.max(...vals.slice(2)),1e-9);near(t.emvLaunch,vals[1],1e-9);
  const perfect=c.p*Math.max(c.H,0)+(1-c.p)*Math.max(c.L,0);near(t.evpi,perfect-Math.max(vals[0],vals[1]),1e-9);
  yes(t.evsi>=-1e-9&&t.evsi<=t.evpi+1e-9,'0 ≤ test bilgisi ≤ kusursuz bilgi');near(t.evsi,t.emvTest+c.cost-Math.max(0,t.emvLaunch),1e-9);
  near(t.pPos+t.pNeg,1);if(t.postPos!==null&&t.postNeg!==null)near(t.pPos*t.postPos+t.pNeg*t.postNeg,c.p,1e-9); // toplam olasılık
  if(c.sens===1&&c.fpos===0)near(t.evsi,t.evpi,1e-9);if(c.sens===c.fpos)near(t.evsi,0,1e-9);
  const d=K.distribution(c,t.policy);near(d.mean,top,1e-9);near(d.outcomes.reduce((s,o)=>s+o.prob,0),1,1e-12);
  const cr=K.criteria(c),rows={launch:[c.H,c.L],follow:[c.sens*c.H-c.cost,c.fpos*c.L-c.cost],drop:[0,0]};
  const bestOf=(f,dir)=>{const v=Object.entries(rows).map(([k,x])=>[k,f(x)]),m=dir*Math.max(...v.map(x=>dir*x[1]));return v.filter(x=>Math.abs(x[1]-m)<1e-9).map(x=>x[0]);};
  eq(cr.maximin,bestOf(x=>Math.min(...x),1));eq(cr.maximax,bestOf(x=>Math.max(...x),1));
  const bh=Math.max(...Object.values(rows).map(x=>x[0])),bl=Math.max(...Object.values(rows).map(x=>x[1]));eq(cr.minimaxRegret,bestOf(x=>Math.max(bh-x[0],bl-x[1]),-1));
  eq(cr.laplace,bestOf(x=>(x[0]+x[1])/2,1));near(cr.rows[1].emv,exact(c,{first:'test',pos:'launch',neg:'drop'}),1e-9);
 }
 const D={p:.4,H:300,L:-150,cost:20,sens:.85,fpos:.2},t=K.tree(D);
 near(t.emvLaunch,30);near(t.emvTest,64);near(t.pPos,.46);near(t.postPos,.34/.46);near(t.postNeg,.06/.54);near(t.evpi,90);near(t.evsi,54);eq(t.best,'test');eq(t.policy,{first:'test',pos:'launch',neg:'drop'});
 const cr=K.criteria(D);eq([cr.maximin,cr.maximax,cr.minimaxRegret,cr.laplace,cr.emv],[['drop'],['launch'],['follow'],['follow'],['follow']]);
 // Dönüş noktaları: kapalı biçim (parça doğruların kesişimi) ve ince ızgara
 const sw=K.switchPoints(D);eq(sw.length,2);near(sw[0].p,20/114,1e-7);near(sw[1].p,40/66,1e-7);eq([sw[0].from,sw[0].to,sw[1].from,sw[1].to],['drop','test','test','launch']);
 for(const c of cases.filter((_,i)=>i%37===0)){const s=K.switchPoints(c);let prev=K.tree({...c,p:0}).best,n=0;for(let k=1;k<=20000;k++){const b=K.tree({...c,p:k/20000}).best;if(b!==prev){n++;prev=b;}}yes(Math.abs(s.length-n)<=1,'dönüş sayısı');for(const w of s)yes(w.p>0&&w.p<1);}
 near(K.switchPoints({...D,cost:100}).find(w=>w.to==='launch').p,1/3,1e-7); // pahalı test: yalnız sür/vazgeç dönüşü −L/(H−L)
 // Monte Carlo: sayfanın üreteci birçok tohumda, ayrıca bağımsız üreteçle
 for(const pol of[t.policy,{first:'launch',pos:'drop',neg:'drop'},{first:'test',pos:'launch',neg:'launch'}]){const ex=exact(D,pol);let inside=0;const zs=[];
  for(let s=1;s<=60;s++){const r=K.simulate(D,pol,10000,s),z=(r.mean-ex)/r.se;zs.push(z);if(Math.abs(z)<=2)inside++;yes(Math.abs(z)<4.5,'tohum '+s+' z='+z);near(r.counts.reduce((a,o)=>a+o.count,0),10000);}
  yes(inside>=50&&inside<=60,'2 standart hata kapsaması '+inside+'/60');const mz=zs.reduce((a,b)=>a+b,0)/60;yes(Math.abs(mz)<.45,'z ortalaması '+mz);
  let sum=0,sum2=0;const N=200000;for(let k=0;k<N;k++){const high=rnd()<D.p,pos=rnd()<(high?D.sens:D.fpos);let v=0;if(pol.first==='launch')v=high?D.H:D.L;else v=((pos?pol.pos:pol.neg)==='launch'?(high?D.H:D.L):0)-D.cost;sum+=v;sum2+=v*v;}
  const m=sum/N,se=Math.sqrt((sum2/N-m*m)/N);yes(Math.abs(m-ex)<4.5*se,'bağımsız MC');const dd=K.distribution(D,pol);near(dd.variance,sum2/N-m*m,.03);}
 const r0=K.simulate(D,t.policy,10000,2026),r1=K.simulate(D,t.policy,10000,2026);eq(r0.mean,r1.mean);yes(K.simulate(D,t.policy,10000,2027).mean!==r0.mean);near(r0.mean,64.12,1e-9);
 near(K.simulate(D,{first:'drop',pos:'drop',neg:'drop'},1000,5).se,0);
 const g=K.mulberry32(1);let s=0,q=0;for(let k=0;k<200000;k++){const u=g();s+=u;q+=u*u;yes(u>=0&&u<1)||0;}checks-=200000;near(s/200000,.5,.005);near(q/200000-(.5)**2,1/12,.01);checks+=1;
 for(const call of[()=>K.tree({...D,p:1.2}),()=>K.tree({...D,cost:-1}),()=>K.simulate(D,t.policy,1,1),()=>K.simulate(D,t.policy,100,-1),()=>K.simulate(D,t.policy,100,1.5)]){assert.throws(call);checks++;}
}
console.log(`G işletme bilimi: ${checks.toLocaleString('tr-TR')} bağımsız çekirdek kontrolü PASS`);

if(process.argv.includes('--browser')){
 const {chromium}=await import('playwright');const {createServer}=await import('node:http');const {join,extname}=await import('node:path');const {fileURLToPath}=await import('node:url');const root=fileURLToPath(new URL('../',import.meta.url));
 const server=createServer((req,res)=>{const file=join(root,decodeURIComponent(new URL(req.url,'http://localhost').pathname));if(!fs.existsSync(file)||fs.statSync(file).isDirectory()){res.writeHead(404).end();return;}res.setHeader('Content-Type',({'.html':'text/html; charset=utf-8','.js':'text/javascript; charset=utf-8','.css':'text/css; charset=utf-8'})[extname(file)]||'application/octet-stream');res.end(fs.readFileSync(file));});await new Promise(r=>server.listen(0,'127.0.0.1',r));let browser;
 try{browser=await chromium.launch();const before=checks;
  for(const[width,theme]of[[390,'light'],[1280,'dark']]){
   const page=await browser.newPage({viewport:{width,height:900},deviceScaleFactor:width===390?2:1});await page.addInitScript(t=>{localStorage.setItem('acelya-theme',t);localStorage.setItem('acelya-sound-muted','1');},theme);page.setDefaultTimeout(5000);
   const errors=[];page.on('pageerror',e=>errors.push(e.message));page.on('console',m=>{if(m.type()==='error'&&!/404/.test(m.text()))errors.push(m.text());});
   await page.goto(`http://127.0.0.1:${server.address().port}/isletme-bilimi-ve-yonetim.html`);
   const click=id=>page.locator('#'+id).click(),read=id=>page.locator('#'+id).textContent(),
    range=(id,v)=>page.locator('#'+id).evaluate((e,v)=>{e.value=v;e.dispatchEvent(new Event('input',{bubbles:true}));},v),
    type=(id,v)=>page.locator('#'+id).evaluate((e,v)=>{e.value=v;e.dispatchEvent(new Event('input',{bubbles:true}));},v),
    has=async(id,text)=>{const t=await read(id);assert(t.includes(text),`${width}px ${id}: “${text}” yok → ${t.slice(0,260)}`);checks++;},
    lacks=async(id,text)=>{const t=await read(id);assert(!t.includes(text),`${width}px ${id}: “${text}” olmamalı`);checks++;},
    fits=async()=>{eq(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),true,width+'px yatay taşma');},
    painted=async id=>{yes(await page.locator('#'+id).evaluate(c=>{const d=c.getContext('2d').getImageData(0,0,c.width,c.height).data,s=new Set();for(let i=0;i<d.length;i+=4*97)s.add(d[i]+','+d[i+1]+','+d[i+2]);return s.size>3;}),id+' boş');};
   // Her denetimin etiketi var
   eq(await page.evaluate(()=>[...document.querySelectorAll('main input,main select')].filter(e=>!document.querySelector('label[for="'+e.id+'"]')).map(e=>e.id)),[]);
   eq(await page.evaluate(()=>[...document.querySelectorAll('main canvas')].filter(c=>c.getAttribute('role')!=='img'||!c.getAttribute('aria-label')).length),0);
   eq(await page.evaluate(()=>/[̀-ͯ]/.test(document.querySelector('main').textContent.normalize('NFC'))),false);
   // 01 Başabaş
   await has('cvpBep','1.000 adet');await has('cvpBepRev','70.000 TL');await has('cvpProfit','6.000 TL');eq((await read('cvpDol')).trim(),'6');await has('cvpRows','16,667 %');await has('cvpRows','1.400 adet');await has('cvpFOut','30.000 TL');await painted('cvpCanvas');await fits();
   await click('cvpPreLabor');eq((await read('cvpDol')).trim(),'3');await has('cvpBep','800 adet');await has('cvpProfit','6.000 TL');
   await click('cvpPreAuto');eq((await read('cvpDol')).trim(),'10');await has('cvpBep','1.080 adet');await has('cvpProfit','6.000 TL');
   await page.locator('#cvpDelta').selectOption('-0.1');await has('cvpRows','−100 %');await has('cvpStatus','−100 %');
   await click('cvpPreFrac');await has('cvpBep','333,33 adet');await has('cvpRows','334 adet');await has('cvpProfit','2.000 TL');
   await click('cvpPreOff');await has('cvpBep','3.000 adet');await has('cvpStatus','kapasitenin');await has('cvpStatus','dışında');await has('cvpProfit','−18.000 TL');
   await click('cvpReset');await range('cvpP',40);await has('cvpBep','Yok');await has('cvpStatus','başabaş yoktur');await range('cvpP',10);await has('cvpStatus','büyütür');
   await click('cvpReset');await range('cvpQ',1400);await has('cvpStatus','kapasiteye takıldı');await has('cvpStatus','1.500 adede');await has('cvpStatus','7,14 %');await page.locator('#cvpDelta').selectOption('-0.1');await lacks('cvpStatus','kapasiteye takıldı');await click('cvpReset');await lacks('cvpStatus','kapasiteye takıldı');
   await click('cvpReset');await range('cvpQ',1000);await has('cvpDol','Tanımsız');await has('cvpStatus','tanımsız');
   await range('cvpQ',2000);await has('cvpStatus','1.500 adette kalır');await has('cvpDol','Tanımsız');await has('cvpStatus','Kapasite dolu');
   await page.locator('#cvpCapMode').selectOption('step');await range('cvpQ',1400);await has('cvpStatus','basamak yaptı');await lacks('cvpDol','Tanımsız');
   await click('cvpReset');eq(await page.locator('#cvpCapMode').inputValue(),'limit');await range('cvpF',0);await has('cvpBep','0 adet');await range('cvpF',60000);await range('cvpV',90);await range('cvpP',100);await range('cvpCap',200);await range('cvpQ',2000);await has('cvpBep','6.000 adet');await fits();
   await click('cvpReset');await page.locator('#cvpMode').selectOption('mix');await has('cvpBep','909,09 adet');await has('cvpMixRows','454,55 adet');await has('cvpRows','33 TL');eq(await page.locator('#cvpMixBox').isVisible(),true);eq(await page.locator('#cvpSingleBox').isVisible(),false);
   for(const i of[1,2,3])await range('mixW'+i,0);await has('cvpBep','Tanımsız');await has('cvpStatus','karma tanımlı değil');await fits();
   await click('cvpReset');eq(await page.locator('#cvpMode').inputValue(),'single');await has('cvpBep','1.000 adet');eq(await page.locator('#cvpMixBox').isVisible(),false);
   // 02 Zaman değeri
   await click('tab-tvm');await has('tvNpvA','180,42 TL');await has('tvNpvB','206,5 TL');await has('tvIrrA','14,489 %');await has('tvIrrB','11,791 %');await has('tvCross','7,167 %');await has('tvPick','NBD: B · İVO: A');await has('tvmStatus','Sıralama çatışıyor');await has('tvmStatus','r = 5,0 % için');await painted('tvmCanvas');
   await has('tvmMore','3. dönem · 2,333 dönem');await has('loanRows','916,799929 TL');await has('loanTable','916,80');await has('tvRateOut','5,0 %');
   await range('tvRate',10);await has('tvPick','NBD: A · İVO: A');await has('tvNpvA','78,82 TL');await range('tvRate',0);await has('tvNpvA','300 TL');await has('tvNpvB','400 TL');await range('tvRate',40);await has('tvNpvA','−');
   await click('tvPreMulti');await has('tvIrrA','10 % ve 20 %');await has('tvmStatus','2 İVO bulundu');await has('tvNpvA','1,89 TL');await has('tvPick','Tek proje');await has('tvmMore','yeniden eksiye düşüyor');
   await click('tvPreNone');await has('tvIrrA','Bulunamadı');await has('tvmStatus','uygulanamaz');
   await click('tvPreSingle');await has('tvIrrA','14,489 %');await has('tvCross','—');await has('tvRateOut','5,0 %');await has('tvNpvA','180,42 TL');
   await type('cfA1','abc');await has('tvmStatus','sayı değil');eq(await page.locator('#cfA1').getAttribute('aria-invalid'),'true');await type('cfA1','500,5');eq(await page.locator('#cfA1').getAttribute('aria-invalid'),'false');await lacks('tvmStatus','sayı değil');
   for(let t=0;t<7;t++)await type('cfA'+t,'0');await has('tvmStatus','bütün akışları 0');await type('cfA0','100');await has('tvmMore','Tanımsız');
   await range('loanI',0);await range('loanN',1);await has('loanRows','10.000 TL');await range('loanN',60);await range('loanI',5);await range('loanP',100000);await has('loanRows','5.282,818');await fits();
   await click('tvmReset');await has('tvNpvA','180,42 TL');await has('loanRows','916,799929 TL');eq(await page.locator('#cfB4').inputValue(),'600');
   // 03 Mali tablolar
   await click('tab-books');await has('bkAssets','91.500 TL');await has('bkLE','91.500 TL');await has('bkProfit','2.500 TL');await has('bkOpCash','−4.500 TL');await has('bkRatios','5,55');await has('bkRatios','4,854 %');await has('booksRows','4,8544 %');await has('bkJournal','11 · Kâr payı dağıtımı');await painted('booksCanvas');
   await type('bkAmount','50000');await click('bkUndo');await page.locator('[data-do="wages"]').click();await has('booksStatus','Kayıt reddedildi');await has('booksStatus','Kasada yeterli para yok');await has('bkAssets','92.500 TL');
   await type('bkAmount','5000');await page.locator('[data-do="sale"]').click();await has('bkProfit','4.500 TL');await has('bkOpCash','−4.500 TL');await has('bkAssets','94.500 TL');await has('bkLE','94.500 TL');
   await page.locator('#bkSaleKind').selectOption('cash');await range('bkCost',100);await type('bkAmount','3000');await page.locator('[data-do="sale"]').click();await has('bkOpCash','−1.500 TL');await has('bkProfit','4.500 TL');
   await type('bkAmount','9000');await page.locator('[data-do="sale"]').click();await has('booksStatus','Stok yetersiz');await type('bkAmount','x');await page.locator('[data-do="capital"]').click();await has('booksStatus','Tutar sıfırdan büyük');eq(await page.locator('#bkAmount').getAttribute('aria-invalid'),'true');
   await click('bkClear');await has('bkAssets','0 TL');await has('bkRatios','Tanımsız · payda 0');await has('booksStatus','Defter boş');await click('bkUndo');await has('booksStatus','Geri alınacak kayıt yok');
   await type('bkAmount','1000');await page.locator('[data-do="borrow"]').click();await page.locator('[data-do="wages"]').click();await has('bkRatios','Yorumlanamaz');await has('booksRows','0 TL');
   await click('booksReset');await has('bkAssets','91.500 TL');eq(await page.locator('#bkAmount').inputValue(),'5000');eq(await page.locator('#bkSaleKind').inputValue(),'credit');
   for(const k of['collect','paySupplier','depreciate','payInterest','repay','dividend','buyPpe','buyInv','capital','borrow']){await type('bkAmount','500');await page.locator(`[data-do="${k}"]`).click();await lacks('booksStatus','reddedildi');}
   await has('bkJournal','21 · ');await has('booksRows','0 TL');await fits();await click('booksReset');
   // 04 Karar ağacı
   await click('tab-tree');await has('trBest','Test pazarı yap');await has('trEmv','64 TL');await has('trEvpi','90 TL');await has('trEvsi','54 TL');await has('treeRows','64,12 ± 1,632 TL');await has('treeRows','0,333333');await has('treeStatus','p = 0,1754');await has('treeStatus','0,40 → 0,7391');await has('treeStatus','0,40 → 0,1111');await has('trCritStatus','(p = 0,40)');await has('treeStatus','p = 0,6061');await has('treeOutline','182,61 TL');await has('treeOutline','0,7391');
   await has('trCritStatus','Maksimin: Vazgeç. Maksimaks: Doğrudan piyasaya sür. Minimaks pişmanlık: Test et, sonuca uy.');await painted('treeSensCanvas');await painted('treeHistCanvas');
   const first=await read('treeRows');await click('trReseed');eq(await page.locator('#trSeed').inputValue(),'2027');yes(await read('treeRows')!==first);await type('trSeed','2026');eq(await read('treeRows'),first);
   await type('trSeed','-3');await has('treeStatus','1 kullanıldı');await type('trSeed','2026');await page.locator('#trN').selectOption('100000');await has('treeRows','±');await page.locator('#trN').selectOption('1000');
   await page.locator('#trPolicy').selectOption('launch');await has('treeRows','30 TL');await has('treeRows','60 %');await page.locator('#trPolicy').selectOption('drop');await has('treeStatus','rastgele değil');await page.locator('#trPolicy').selectOption('follow');await has('treeRows','64 TL');
   await click('trPrePerfect');await has('trEvsi','90 TL');await has('trEvpi','90 TL');await has('trEmv','100 TL');
   await click('trPreBlind');await has('trEvsi','0 TL');await has('trBest','Doğrudan piyasaya sür');await has('treeStatus','değeri sıfır');
   await click('treeReset');await range('trP',0);await has('trBest','Vazgeç');await has('trEvpi','0 TL');await range('trP',1);await has('trBest','Doğrudan piyasaya sür');await has('trEmv','300 TL');await range('trFpos',0);await range('trP',0);await has('treeOutline','olasılık 0');
   await click('treeReset');await range('trL',0);await has('treeRows','Yok');await range('trH',0);await has('trBest','=');await range('trCost',100);await fits();
   await click('treeReset');await range('trCost',54);await has('trBest','Doğrudan piyasaya sür = Test pazarı yap');eq(await page.locator('#treeOutline li.is-tie').count(),2);eq(await page.locator('#treeOutline>li>ul>li.is-cut').count(),1);await has('treeStatus','hiçbiri budanmaz');await range('trCost',55);eq(await page.locator('#treeOutline li.is-tie').count(),0);
   await range('trP',.9);await range('trCost',77);await type('trSeed','5');await click('trPreBlind');await has('trPOut','0,40');await has('trCostOut','20 TL');eq(await page.locator('#trSeed').inputValue(),'2026');await has('trEmv','30 TL');await has('trEvsi','0 TL');
   await range('trH',100);await range('trCost',3);await click('trPrePerfect');await has('trHOut','300 TL');await has('trEmv','100 TL');await has('trEvsi','90 TL');
   await click('treeReset');await has('trEmv','64 TL');eq(await page.locator('#trSeed').inputValue(),'2026');eq(await page.locator('#trN').inputValue(),'10000');
   // Klavye, R kısayolu, çekirdek koruması
   await page.locator('#tab-tree').focus();await page.keyboard.press('Home');eq(await page.locator('#tab-cvp').getAttribute('aria-selected'),'true');await page.keyboard.press('ArrowRight');eq(await page.locator('#tab-tvm').getAttribute('aria-selected'),'true');await page.keyboard.press('End');eq(await page.locator('#tab-tree').getAttribute('aria-selected'),'true');await page.keyboard.press('ArrowRight');eq(await page.locator('#tab-cvp').getAttribute('aria-selected'),'true');await page.keyboard.press('ArrowLeft');eq(await page.locator('#tab-tree').getAttribute('aria-selected'),'true');
   eq(await page.locator('#panel-cvp').isHidden(),true);eq(await page.locator('#panel-tree').isVisible(),true);
   await range('trP',.9);await page.locator('h1').click();await page.keyboard.press('r');await has('trPOut','0,40');
   await range('trP',.9);await page.locator('#trSeed').focus();await page.keyboard.press('r');await has('trPOut','0,90');await click('treeReset');
   eq(await page.evaluate(()=>Object.isFrozen(BizLab)&&!Object.getOwnPropertyDescriptor(window,'BizLab').writable),true);
   await page.evaluate(()=>{document.documentElement.dataset.theme=document.documentElement.dataset.theme==='light'?'dark':'light';});await painted('treeSensCanvas');
   for(const t of['cvp','tvm','books','tree']){await click('tab-'+t);await fits();}
   assert.deepEqual(errors,[],width+'px konsol hatası');checks++;await page.close();
  }
  console.log(`G işletme bilimi: ${checks-before} arayüz kontrolü (390 px açık + 1280 px koyu) PASS`);
 }finally{await browser?.close();await new Promise(r=>server.close(r));}
}
