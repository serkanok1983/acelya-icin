// Uluslararası ilişkiler laboratuvarı: çekirdeğin bağımsız denetimi.
// Başvurular sayfanın formüllerini yinelemez: belirlenimci strateji çiftlerinin kapalı geometrik toplamları,
// ayrı yazılmış bir oyun benzetimi (kendi üreteci ve kendi strateji kodlarıyla), Richardson için Taylor serili matris
// üsteli ve karakteristik polinom, oylama için bütün sıralamaların kaba kuvvet sayımı ve Konsey kuralının doğrudan sayımı.
import fs from 'node:fs';
import assert from 'node:assert/strict';
import { canvasInk, canvasInkAll, assertCanvasDrawn } from './lib/canvas-check.mjs';
const SLUG='uluslararasi-iliskiler';
const html=fs.readFileSync(new URL(`../${SLUG}.html`,import.meta.url),'utf8');
const source=html.split('/* KERNEL-BEGIN */')[1]?.split('/* KERNEL-END */')[0];
assert(source,'Çekirdek sınırları gerekli');
// Çekirdek ana bağlamda çalıştırılır (vm bağlamındaki genel ad aramaları benzetimi onlarca kat yavaşlatır).
const win={};new Function('window',source)(win);
const K=win.IRLab;assert(Object.isFrozen(K));
let checks=0;
const near=(a,e,tol=1e-9,msg='')=>{assert(Math.abs(a-e)<=tol*Math.max(1,Math.abs(e)),`${msg} ${a} ≠ ${e}`);checks++;};
const eq=(a,b,msg)=>{assert.equal(a,b,msg);checks++;};
const ok=(c,msg)=>{assert(c,msg);checks++;};
const AX={T:5,R:3,P:1,S:0};

// 1a · Tek atım: tanımdan bağımsız sayım.
{const lcg=(s=>()=>(s=(s*1664525+1013904223)>>>0)/4294967296)(12345);
 for(let it=0;it<400;it++){const p={T:Math.round(lcg()*20)/2,R:Math.round(lcg()*20)/2,P:Math.round(lcg()*20)/2,S:Math.round(lcg()*20)/2},o=K.oneShot(p);
  const tab={'1,1':[p.R,p.R],'1,0':[p.S,p.T],'0,1':[p.T,p.S],'0,0':[p.P,p.P]},ne=[];
  for(const a of[1,0])for(const b of[1,0]){const[u,v]=tab[a+','+b];if(u>=tab[(1-a)+','+b][0]&&v>=tab[a+','+(1-b)][1])ne.push(a+','+b);}
  eq(o.nash.map(x=>x.join(',')).sort().join(' '),ne.sort().join(' '),'nash');
  const c=K.pdCheck(p);eq(c.order,p.T>p.R&&p.R>p.P&&p.P>p.S);eq(c.rca,2*p.R>p.T+p.S);
  if(c.order){eq(o.dominantA,0);eq(o.dominantB,0);eq(o.nash.length,1);eq(o.nash[0].join(','),'0,0');eq(o.pareto.length,3);ok(!o.pareto.some(x=>x.join(',')==='0,0'));}}
 const stag=K.oneShot({T:3,R:5,P:1,S:0});eq(stag.dominantA,null);eq(stag.nash.length,2); // geyik avı: iki denge, baskın strateji yok
 eq(K.pdCheck({T:5,R:2.5,P:1,S:0}).rca,false);eq(K.pdCheck({T:5,R:2.5,P:1,S:0}).order,true);eq(K.pdCheck(AX).valid,true);}

// 1b · Belirlenimci çiftlerin kesin beklenen kazancı: kapalı geometrik toplamlar.
for(const p of[AX,{T:7,R:4,P:2,S:0.5},{T:10,R:6,P:1,S:0}])for(const d of[0,0.3,0.5,0.9,0.95,0.99]){const{T,R,P,S}=p,g1=1/(1-d),V=(sA,sB,g=1/3)=>K.exactValue({pay:p,sA,sB,delta:d,noise:0,g});
 let v=V('tft','alld');near(v.VA,S+d*P*g1,1e-10,'tft-alld A');near(v.VB,T+d*P*g1,1e-10);
 v=V('alld','grim');near(v.VA,T+d*P*g1,1e-10,'alld-grim');near(v.VB,S+d*P*g1,1e-10);
 for(const[a,b]of[['tft','tft'],['grim','grim'],['pavlov','pavlov'],['gtft','gtft'],['allc','tft'],['grim','pavlov'],['allc','allc'],['gtft','grim']]){v=V(a,b);near(v.VA,R*g1,1e-10,a+b);near(v.VB,R*g1,1e-10);near(v.coopA,1,1e-10);}
 v=V('allc','alld');near(v.VA,S*g1,1e-10);near(v.VB,T*g1,1e-10);
 v=V('pavlov','alld');near(v.VA,(S+d*P)/(1-d*d),1e-10,'pavlov-alld');near(v.VB,(T+d*P)/(1-d*d),1e-10);
 v=V('rand','allc');near(v.VA,(R+T)/2*g1,1e-10);near(v.VB,(R+S)/2*g1,1e-10);
 v=V('rand','alld');near(v.VA,(S+P)/2*g1,1e-10);
 for(const g of[0,0.25,1/3,1]){v=V('gtft','alld',g);near(v.VA,S+d*(g*S+(1-g)*P)*g1,1e-10,'gtft-alld');near(v.VB,T+d*(g*T+(1-g)*P)*g1,1e-10);}
 near(v.expectedRounds,g1,1e-12);near(V('alld','alld').perRoundA,P,1e-10);
 // gürültüyle: koşulsuz stratejilerde her tur bağımsız
 for(const e of[0.01,0.05,0.2]){const w=K.exactValue({pay:p,sA:'allc',sB:'allc',delta:d,noise:e});near(w.perRoundA,(1-e)*(1-e)*R+e*(1-e)*(S+T)+e*e*P,1e-10,'allc noise');near(w.coopA,1-e,1e-10);
  const x=K.exactValue({pay:p,sA:'alld',sB:'allc',delta:d,noise:e});near(x.perRoundA,e*(1-e)*R+e*e*S+(1-e)*(1-e)*T+(1-e)*e*P,1e-10,'alld-allc noise');}}
// Stanford Ansiklopedisi: hatalı iki kısas oyuncusu uzun oyunda rastgele oyunun ortalamasına, (R+S+T+P)/4'e yaklaşır.
near(K.exactValue({pay:AX,sA:'tft',sB:'tft',delta:0.99999,noise:0.05}).perRoundA,2.25,2e-3,'TFT yankı limiti');
ok(K.exactValue({pay:AX,sA:'gtft',sB:'gtft',delta:0.95,noise:0.05,g:1/3}).perRoundA>K.exactValue({pay:AX,sA:'tft',sB:'tft',delta:0.95,noise:0.05}).perRoundA+0.15,'cömert kısas gürültüde kısastan iyi');
ok(K.exactValue({pay:AX,sA:'pavlov',sB:'pavlov',delta:0.95,noise:0.05}).perRoundA>K.exactValue({pay:AX,sA:'tft',sB:'tft',delta:0.95,noise:0.05}).perRoundA,'Pavlov gürültüde kısastan iyi');
near(K.molander(AX),1/3,1e-12);

// 1c · Ayrı yazılmış benzetim: kendi üreteci, kendi strateji kodları, sabit ufuklu iskonto toplamı.
{const xs=(s=>()=>{s^=s<<13;s>>>=0;s^=s>>>17;s^=s<<5;s>>>=0;return s/4294967296;})(2463534242);
 const rule={allc:()=>1,alld:()=>0,rand:()=>0.5,tft:h=>h.n?h.opp:1,gtft:(h,g)=>!h.n||h.opp?1:g,grim:h=>h.everDefected?0:1,pavlov:h=>!h.n||h.me===h.opp?1:0};
 const sim=(p,sA,sB,d,e,g,M)=>{let tot=0,tot2=0;const H=Math.ceil(Math.log(1e-7)/Math.log(d));for(let m=0;m<M;m++){const hA={n:0},hB={n:0};let disc=1,acc=0;for(let t=0;t<H;t++){let a=xs()<rule[sA](hA,g)?1:0,b=xs()<rule[sB](hB,g)?1:0;if(xs()<e)a=1-a;if(xs()<e)b=1-b;acc+=disc*(a?(b?p.R:p.S):(b?p.T:p.P));disc*=d;hA.n=hB.n=1;hA.me=a;hA.opp=b;hB.me=b;hB.opp=a;if(!b)hA.everDefected=1;if(!a)hB.everDefected=1;}tot+=acc;tot2+=acc*acc;}const mean=tot/M;return{mean,se:Math.sqrt((tot2/M-mean*mean)/M)};};
 for(const[sA,sB]of[['tft','tft'],['gtft','gtft'],['pavlov','pavlov'],['grim','grim'],['tft','pavlov'],['grim','gtft'],['pavlov','alld'],['rand','grim'],['tft','rand'],['gtft','pavlov']])for(const[d,e]of[[0.8,0.05],[0.9,0.1]]){const r=sim(AX,sA,sB,d,e,0.3,30000),x=K.exactValue({pay:AX,sA,sB,delta:d,noise:e,g:0.3});ok(Math.abs(r.mean-x.VA)<5*r.se+1e-4,`MC ${sA}×${sB} δ${d} ε${e}: ${r.mean} vs ${x.VA} (se ${r.se})`);}}

// 1d · Çekirdeğin kendi maçları: belirlenimci çiftte tur tur kesin kazanç; uzunluk dağılımı; tohum.
for(const seed of[1,7,99,12345])for(const d of[0,0.5,0.95]){const m=K.playMatch({pay:AX,sA:'tft',sB:'alld',delta:d,seed});eq(m.scoreA,AX.S+(m.rounds-1)*AX.P);eq(m.scoreB,AX.T+(m.rounds-1)*AX.P);eq(m.moves.length,m.rounds);eq(m.moves[0].join(''),'10');
 const again=K.playMatch({pay:AX,sA:'tft',sB:'alld',delta:d,seed});eq(again.rounds,m.rounds);if(d===0)eq(m.rounds,1);
 const g=K.playMatch({pay:AX,sA:'grim',sB:'pavlov',delta:d,seed});eq(g.scoreA,3*g.rounds);
 const longer=K.playMatch({pay:AX,sA:'tft',sB:'alld',delta:Math.min(0.99,d+0.04),seed});ok(longer.rounds>=m.rounds,'uzunluk δ ile tekdüze');}
for(const d of[0.5,0.9,0.95]){const r=K.measurePair({pay:AX,sA:'allc',sB:'allc',delta:d,seed:3,matches:4000}),mu=1/(1-d),sd=Math.sqrt(d)/(1-d);ok(Math.abs(r.meanRounds-mu)<5*sd/Math.sqrt(4000),'ortalama uzunluk '+r.meanRounds);near(r.perRoundA,3,1e-12);}
for(const[sA,sB,e]of[['tft','tft',0.05],['gtft','gtft',0.05],['pavlov','alld',0.1],['rand','grim',0]])for(const seed of[1,7,500]){const o={pay:AX,sA,sB,delta:0.95,noise:e,g:0.33,seed},m=K.measurePair({...o,matches:2000}),x=K.exactValue(o);ok(Math.abs(m.perRoundA-x.perRoundA)<0.12&&Math.abs(m.perRoundB-x.perRoundB)<0.12,`ölçüm ${sA}×${sB} tohum ${seed}: ${m.perRoundA} vs ${x.perRoundA}`);}
// yankı: gürültülü kısas × kısas maçında İB/Bİ nöbetleşmesi görülür
{let alt=0;for(let seed=1;seed<=40;seed++){const m=K.playMatch({pay:AX,sA:'tft',sB:'tft',delta:0.98,noise:0.05,seed}).moves;for(let i=1;i<m.length;i++)if(m[i][0]!==m[i][1]&&m[i-1][0]!==m[i-1][1]&&m[i][0]!==m[i-1][0])alt++;}ok(alt>100,'yankı nöbetleşmesi '+alt);}

// 1e · Grim eşiği: kapalı formül, ikiye bölmeyle bağımsız kök ve taramadan ölçüm.
for(const p of[AX,{T:7,R:4,P:2,S:0.5},{T:10,R:6,P:1,S:0},{T:4,R:3,P:1,S:0}]){const seeds=p===AX?[1,4,42]:[4];const f=d=>p.R/(1-d)-(p.T+d*p.P/(1-d));let lo=0,hi=0.999999;for(let i=0;i<80;i++){const mid=(lo+hi)/2;if(f(mid)<0)lo=mid;else hi=mid;}near(K.grimThreshold(p),lo,1e-9,'grim eşiği');
 for(const seed of seeds){const s=K.grimScan({pay:p,seed,matches:1000});ok(s.crossing!==null&&Math.abs(s.crossing-lo)<0.04,`tarama ${JSON.stringify(p)} tohum ${seed}: ${s.crossing} vs ${lo}`);eq(s.rows.length,100);near(s.rows[0].dev,p.T,1e-12);for(const r of s.rows)near(r.coop,p.R,1e-12);}}
near(K.grimThreshold(AX),0.5,1e-12);
// eşiğin iki yanı: kesin değerlerle
ok(K.exactValue({pay:AX,sA:'alld',sB:'grim',delta:0.49}).VA>K.exactValue({pay:AX,sA:'grim',sB:'grim',delta:0.49}).VA);ok(K.exactValue({pay:AX,sA:'alld',sB:'grim',delta:0.51}).VA<K.exactValue({pay:AX,sA:'grim',sB:'grim',delta:0.51}).VA);
// grim'e karşı hiçbir tek seferlik sapma, eşiğin üstünde kazandırmaz: k. turda bozup sonra hep bozma, kapalı toplamla
for(const d of[0.6,0.9])for(let k=0;k<6;k++){const dev=3*(1-d**k)/(1-d)+d**k*(5+d*1/(1-d));ok(dev<3/(1-d)+1e-12);}

// 1f · Turnuva: gürültüsüz, δ = 0,95 için bağımsız kapalı değerlerle birkaç hücre ve iç tutarlılık.
{const t=K.tournament({pay:AX,delta:0.95,noise:0,g:0.33,seed:7,matches:400}),S=t.strategies,ix=k=>S.indexOf(k);eq(S.length,7);
 near(t.exact[ix('tft')][ix('alld')],0.05*(0+0.95*1/0.05),1e-10);near(t.exact[ix('alld')][ix('tft')],0.05*(5+0.95/0.05),1e-10);near(t.exact[ix('tft')][ix('tft')],3,1e-10);near(t.exact[ix('allc')][ix('alld')],0,1e-10);near(t.exact[ix('alld')][ix('allc')],5,1e-10);
 for(let i=0;i<7;i++){near(t.avgExact[i],t.exact[i].reduce((s,v)=>s+v,0)/7,1e-12);ok(Math.abs(t.avgMeasured[i]-t.avgExact[i])<0.06,'turnuva ölçüm–kuram '+S[i]);ok(t.rankExact[i]>=1&&t.rankExact[i]<=7);}
 // gürültüsüz ve belirlenimci çiftlerde ölçüm de kesindir (toplam kazanç / toplam tur, ortak uzunluklar)
 near(t.measured[ix('tft')][ix('grim')],3,1e-12);
 const noisy=K.tournament({pay:AX,delta:0.95,noise:0.05,g:0.33,seed:7,matches:400});ok(noisy.exact[ix('tft')][ix('tft')]<noisy.exact[ix('gtft')][ix('gtft')]);ok(noisy.exact[ix('grim')][ix('grim')]<noisy.exact[ix('pavlov')][ix('pavlov')]);}

// 2a · Richardson: özdeğerler karakteristik polinomu sağlar; denge sağ tarafı sıfırlar.
const expm=(A,t)=>{let s=0,n=Math.max(Math.abs(A[0][0]),Math.abs(A[0][1]),Math.abs(A[1][0]),Math.abs(A[1][1]))*Math.abs(t);while(n>0.25){n/=2;s++;}const B=A.map(r=>r.map(v=>v*t/2**s)),mul=(X,Y)=>[[X[0][0]*Y[0][0]+X[0][1]*Y[1][0],X[0][0]*Y[0][1]+X[0][1]*Y[1][1]],[X[1][0]*Y[0][0]+X[1][1]*Y[1][0],X[1][0]*Y[0][1]+X[1][1]*Y[1][1]]];let E=[[1,0],[0,1]],term=[[1,0],[0,1]];for(let k=1;k<30;k++){term=mul(term,B).map(r=>r.map(v=>v/k));E=E.map((r,i)=>r.map((v,j)=>v+term[i][j]));}for(let i=0;i<s;i++)E=mul(E,E);return E;};
let rsCases=0;
for(const a of[0,0.5,1.2,2])for(const b of[0,0.5,1.2])for(const m of[0.05,1,2])for(const n of[0.4,1])for(const g of[-0.5,0,1])for(const h of[-0.4,1]){const c={a,b,m,n,g,h},r=K.richardson(c);rsCases++;
 for(const l of[r.lambda1,r.lambda2])near((-m-l)*(-n-l)-a*b,0,1e-9,'karakteristik polinom');near(r.lambda1+r.lambda2,-(m+n),1e-12);near(r.lambda1*r.lambda2,m*n-a*b,1e-10);ok(r.lambda1>=r.lambda2);eq(r.stable,m*n>a*b+1e-12);
 if(r.equilibrium){const[fx,fy]=K.rsRhs(c,r.equilibrium.x,r.equilibrium.y);near(fx,0,1e-9);near(fy,0,1e-9);eq(r.stable,r.lambda1<0);}
 // RK4 ile kapalı çözüm: z(t) = z* + e^{At}(z0 − z*); denge yoksa z' = Az + c için artırılmış 3×3 yerine küçük adımlı karşılaştırma atlanır
 if(r.equilibrium){const x0=3,y0=1.5,T=2,sim=K.rsSimulate(c,{x0,y0,tMax:T,stopAtZero:false}),E=expm([[-m,a],[b,-n]],T),ex=r.equilibrium,xe=ex.x+E[0][0]*(x0-ex.x)+E[0][1]*(y0-ex.y),ye=ex.y+E[1][0]*(x0-ex.x)+E[1][1]*(y0-ex.y);eq(sim.X.length,201);near(sim.X[200],xe,2e-8,'RK4 x');near(sim.Y[200],ye,2e-8,'RK4 y');}}
ok(rsCases===432);
// 2b · Yörüngeden ölçüm (yalnız örneklerden) kuramla uyuşur: özdeğerler ve denge; kararlılık benzetimde de görülür.
{let two=0;for(const a of[0.3,0.5,1.2,1.5])for(const b of[0.2,0.5,1.2])for(const m of[0.6,1,1.4])for(const n of[0.5,1])for(const[x0,y0]of[[5,0.5],[1,4],[2.5,2]]){const c={a,b,m,n,g:1,h:0.6},r=K.richardson(c),sim=K.rsSimulate(c,{x0,y0,stopAtZero:false}),ms=K.rsMeasure(sim);
  if(r.singular)continue;if(ms.modes===2){two++;near(ms.lambdas[0],r.lambda1,2e-5,`λ1 ölçüm ${JSON.stringify(c)} ${x0},${y0}`);near(ms.lambdas[1],r.lambda2,2e-4,'λ2 ölçüm');near(ms.equilibrium.x,r.equilibrium.x,1e-4,'x* ölçüm');near(ms.equilibrium.y,r.equilibrium.y,1e-4,'y* ölçüm');}
  if(!r.stable)ok(sim.escaped||Math.hypot(sim.X[sim.steps],sim.Y[sim.steps])>50*Math.hypot(x0,y0),'kararsız ⇒ büyüme');else eq(sim.escaped,null,'kararlı ⇒ kaçış yok');if(r.stable){const dist=i=>Math.hypot(sim.X[i]-r.equilibrium.x,sim.Y[i]-r.equilibrium.y);near(dist(sim.steps)/dist(0),0,Math.max(1e-6,20*Math.exp(r.lambda1*200)),'yakınsama hızı e^(λ₁t) ile sınırlı');if(r.lambda1<-0.1)ok(sim.lastSpeed<1e-6);}}
 ok(two>150,'iki kipli ölçüm sayısı '+two);}
// simetrik başlangıç: tek kip, özdeğer −m + a
{const c={a:0.5,b:0.5,m:1,n:1,g:1,h:1},ms=K.rsMeasure(K.rsSimulate(c,{x0:5,y0:5}));eq(ms.modes,1);near(ms.lambdas[0],-0.5,1e-7);near(ms.equilibrium.x,2,1e-7);
 eq(K.rsMeasure(K.rsSimulate(c,{x0:2,y0:2})).modes,0);eq(K.rsMeasure(K.rsSimulate(c,{x0:2,y0:2})).reason,'still');
 const r=K.richardson(c);near(r.equilibrium.x,2);near(r.equilibrium.y,2);near(r.lambda1,-0.5);near(r.lambda2,-1.5);near(r.det,0.75);
 const run=K.richardson({a:1.2,b:1.2,m:1,n:1,g:0.5,h:0.5});near(run.lambda1,0.2,1e-12);near(run.lambda2,-2.2,1e-12);eq(run.stable,false);
 const edge=K.richardson({a:1.2,b:1.2,m:1,n:1,g:-0.4,h:-0.4});near(edge.equilibrium.x,2,1e-12);near(edge.equilibrium.y,2,1e-12);
 const below=K.rsSimulate({a:1.2,b:1.2,m:1,n:1,g:-0.4,h:-0.4},{x0:1.5,y0:2}),above=K.rsSimulate({a:1.2,b:1.2,m:1,n:1,g:-0.4,h:-0.4},{x0:2.5,y0:2});ok(below.zero&&!below.escaped,'eşiğin altı sıfıra iner');ok(above.escaped&&!above.zero,'eşiğin üstü kaçar');
 eq(K.richardson({a:1,b:1,m:1,n:1,g:1,h:1}).singular,true);eq(K.richardson({a:1,b:1,m:1,n:1,g:1,h:1}).equilibrium,null);near(K.richardson({a:1,b:1,m:1,n:1,g:1,h:1}).lambda1,0,1e-12);}
// 2c · Sıfıra iniş anı adımın içinde bulunur: ayrık durumda kapalı form x(t) = g/m + (x0 − g/m)e^{−mt}.
for(const m of[0.5,1,2])for(const g of[-0.5,-1.3])for(const x0 of[0.7,3,10]){const sim=K.rsSimulate({a:0,b:0,m,n:1,g,h:1},{x0,y0:1}),t=Math.log((x0-g/m)/(-g/m))/m;ok(sim.zero&&sim.zero.who==='x');near(sim.zero.t,t,1e-4,'sıfır anı (adım içi doğrusal ara değer; adım sonuna yuvarlansa hata 1e-2 olurdu)');near(sim.zero.x,0,1e-12);}
{const d=K.rsSimulate({a:0.5,b:0.5,m:1,n:1,g:-0.5,h:-0.5},{x0:3,y0:3});eq(d.zero.who,'xy');near(d.zero.t,Math.log((3+1)/1)/0.5,1e-4,'simetrik silahsızlanma anı');}
assert.throws(()=>K.richardson({a:-1,b:0,m:1,n:1,g:0,h:0}));checks++;

// 3a · Oylama: bütün sıralamaların ve bütün alt kümelerin kaba kuvvet sayımı (n ≤ 7).
const perms=function*(arr,k=arr.length){if(k<=1){yield arr;return;}for(let i=0;i<k;i++){yield*perms(arr,k-1);const j=k%2?0:i;[arr[j],arr[k-1]]=[arr[k-1],arr[j]];}};
const gcd=(a,b)=>b?gcd(b,a%b):a;
const brute=(w,q)=>{const n=w.length,piv=Array(n).fill(0);let total=0;for(const p of perms(w.map((_,i)=>i))){total++;let s=0;for(const i of p){s+=w[i];if(s>=q){piv[i]++;break;}}}
 const sw=Array(n).fill(0);let win=0,min=0;const rec=(i,set,sum)=>{if(i===n){if(sum>=q){win++;let all=true;for(const j of set){if(sum-w[j]<q)sw[j]++;else all=false;}if(all)min++;}return;}rec(i+1,set,sum);rec(i+1,[...set,i],sum+w[i]);};rec(0,[],0);return{piv,total,sw,win,min};};
{const lcg=(s=>()=>(s=(s*69069+1)>>>0)/4294967296)(777);for(let it=0;it<120;it++){const n=1+Math.floor(lcg()*7),w=Array.from({length:n},()=>Math.floor(lcg()*9)),tot=w.reduce((s,v)=>s+v,0);if(!tot)continue;const q=1+Math.floor(lcg()*tot),g=K.votingGame(w,q),b=brute(w,q);
 eq(g.winning,b.win,'kazanan');eq(g.minimal,b.min,'asgari');let sum=0;g.players.forEach((p,i)=>{eq(p.swings,b.sw[i],'kritik');const d=gcd(b.piv[i],b.total)||b.total;eq(p.ssNum+'/'+p.ssDen,(b.piv[i]/d)+'/'+(b.total/d),`S–S kesir [${q};${w}] oyuncu ${i}`);near(p.ss,b.piv[i]/b.total,1e-12);eq(p.dummy,b.sw[i]===0);eq(p.dummy,b.piv[i]===0,'etkisiz ⇔ S–S = 0');sum+=p.ss;
  eq(p.veto,tot-w[i]<q,'veto');});near(sum,1,1e-12,'etkinlik');
 for(let i=0;i<n;i++)for(let j=i+1;j<n;j++)if(w[i]===w[j]){eq(g.players[i].swings,g.players[j].swings);eq(g.players[i].ssNum,g.players[j].ssNum);}else if(w[i]>w[j])ok(g.players[i].ss>=g.players[j].ss-1e-15,'tekdüzelik');}}
// 3b · Güvenlik Konseyi kuralı (BM Şartı md. 27/3): kural doğrudan sayılır, ağırlıklı gösterimle karşılaştırılır.
{const w=[7,7,7,7,7,1,1,1,1,1,1,1,1,1,1],g=K.votingGame(w,39);let same=0,win=0;for(let m=0;m<32768;m++){const perm=(m&31)===31;let el=0;for(let i=5;i<15;i++)el+=m>>i&1;const rule=perm&&el>=4;let s=0;for(let i=0;i<15;i++)if(m>>i&1)s+=w[i];if(rule===(s>=39))same++;if(rule)win++;}eq(same,32768,'ağırlıklı gösterim = kural');
 const C=(n,k)=>{let r=1;for(let i=1;i<=k;i++)r=r*(n-k+i)/i;return Math.round(r);},f=n=>n<=1?1n:BigInt(n)*f(n-1);
 eq(win,[4,5,6,7,8,9,10].reduce((s,k)=>s+C(10,k),0));eq(g.winning,848);eq(g.minimal,C(10,4));eq(g.minimal,210);
 // seçilmiş üye belirleyicidir ⇔ ondan önce tam beş daimî ve üç seçilmiş üye sıralanır: C(9,3)·8!·6!/15!
 const num=BigInt(C(9,3))*f(8)*f(6),den=f(15),gg=(a,b)=>b?gg(b,a%b):a,d=gg(num,den);eq((num/d)+'/'+(den/d),'4/2145');
 for(let i=0;i<5;i++){eq(g.players[i].ssNum+'/'+g.players[i].ssDen,'421/2145');eq(g.players[i].veto,true);eq(g.players[i].swings,848);eq(g.players[i].dummy,false);}
 for(let i=5;i<15;i++){eq(g.players[i].ssNum+'/'+g.players[i].ssDen,'4/2145');eq(g.players[i].veto,false);eq(g.players[i].swings,C(9,3));}
 near(g.players[0].ss,0.19627039627,1e-10);near(g.players[5].ss,0.00186480186,1e-9);eq(5*421+10*4,2145);eq(g.totalSwings,5*848+10*84);near(g.players[0].banzhaf,848/5080,1e-12);near(g.players[5].banzhaf,84/5080,1e-12);eq(g.proper,true);eq(g.dictator,-1);
 // aynı oyunun Wikipedia'daki gösterimi [44; 8×5, 1×10] aynı endeksleri verir
 const alt=K.votingGame([8,8,8,8,8,1,1,1,1,1,1,1,1,1,1],44);eq(alt.winning,848);eq(alt.players[0].ssNum+'/'+alt.players[0].ssDen,'421/2145');eq(alt.players[9].ssNum+'/'+alt.players[9].ssDen,'4/2145');
 // usul kararı (md. 27/2): on beş eşit oy, dokuz gerekir
 const proc=K.votingGame(Array(15).fill(1),9);eq(proc.winning,[9,10,11,12,13,14,15].reduce((s,k)=>s+C(15,k),0));eq(proc.minimal,C(15,9));for(const p of proc.players){eq(p.ssNum+'/'+p.ssDen,'1/15');eq(p.veto,false);eq(p.swings,C(14,8));}}
// 3c · AET 1958 [12; 4,4,4,2,2,1] ve öğretim örnekleri: kaba kuvvetle.
{const w=[4,4,4,2,2,1],g=K.votingGame(w,12),b=brute(w,12);eq(g.players[5].dummy,true);eq(g.players[5].ssNum,'0');eq(b.piv[5],0);eq(b.sw[5],0);eq(g.players[0].ssNum+'/'+g.players[0].ssDen,'7/30');eq(g.players[3].ssNum+'/'+g.players[3].ssDen,'3/20');near(g.players[0].banzhaf,b.sw[0]/b.sw.reduce((s,v)=>s+v,0),1e-12);near(g.players[0].banzhaf,5/21,1e-12);near(g.players[3].banzhaf,1/7,1e-12);eq(g.winning,b.win);eq(g.minimal,b.min);
 const toy=K.votingGame([50,49,1],51);eq(toy.players[0].ssNum+'/'+toy.players[0].ssDen,'2/3');eq(toy.players[1].ssNum+'/'+toy.players[1].ssDen,'1/6');eq(toy.players[2].ssNum+'/'+toy.players[2].ssDen,'1/6');eq(toy.players[0].veto,true);near(toy.players[0].banzhaf,0.6,1e-12);
 const maj=K.votingGame([1,1,1,1,1],3);for(const p of maj.players){eq(p.ssNum+'/'+p.ssDen,'1/5');near(p.banzhaf,0.2,1e-12);}eq(maj.winning,16);eq(maj.minimal,10);
 const dict=K.votingGame([5,2,1],5);eq(dict.dictator,0);eq(dict.players[1].dummy,true);eq(dict.players[0].ssNum+'/'+dict.players[0].ssDen,'1/1');
 eq(K.votingGame([1,1,1,1],2).proper,false);eq(K.votingGame([1,1],3).feasible,false);eq(K.votingGame([1,1],3).winning,0);
 for(const call of[()=>K.votingGame([],1),()=>K.votingGame([1.5,2],2),()=>K.votingGame([1,2],0),()=>K.votingGame(Array(17).fill(1),3),()=>K.votingGame([-1,2],1)]){assert.throws(call);checks++;}}
// 3d · Rastgele sıralama ölçümü kesin değerin örnekleme hatası içinde.
for(const[w,q]of[[[7,7,7,7,7,1,1,1,1,1,1,1,1,1,1],39],[[4,4,4,2,2,1],12],[[50,49,1],51]])for(const seed of[1,2,77]){const g=K.votingGame(w,q),mc=K.shapleySample(w,q,20000,seed);near(mc.estimate.reduce((s,v)=>s+v,0),1,1e-12);g.players.forEach((p,i)=>ok(Math.abs(mc.estimate[i]-p.ss)<5*Math.sqrt(Math.max(p.ss*(1-p.ss),1e-6)/20000)+1e-9,`örnekleme ${w} oyuncu ${i}: ${mc.estimate[i]} vs ${p.ss}`));}

console.log(`G ${SLUG}: ${checks.toLocaleString('tr-TR')} bağımsız çekirdek kontrolü PASS`);

if(process.argv.includes('--browser')){
 const {chromium}=await import('playwright');const {createServer}=await import('node:http');const {join,extname}=await import('node:path');const {fileURLToPath}=await import('node:url');const root=fileURLToPath(new URL('../',import.meta.url));
 const server=createServer((req,res)=>{const file=join(root,decodeURIComponent(new URL(req.url,'http://localhost').pathname));if(!file.startsWith(root)||!fs.existsSync(file)||fs.statSync(file).isDirectory()){res.writeHead(404).end();return;}res.setHeader('Content-Type',({'.html':'text/html; charset=utf-8','.js':'text/javascript; charset=utf-8','.css':'text/css; charset=utf-8','.json':'application/json','.svg':'image/svg+xml','.png':'image/png'})[extname(file)]||'application/octet-stream');res.end(fs.readFileSync(file));});await new Promise(r=>server.listen(0,'127.0.0.1',r));let browser;
 try{browser=await chromium.launch();const before=checks;
  for(const[width,height,theme]of[[390,900,'light'],[1280,900,'dark']]){
   const ctx=await browser.newContext({viewport:{width,height},deviceScaleFactor:width<500?2:1});const page=await ctx.newPage();await page.addInitScript(t=>{localStorage.setItem('acelya-theme',t);localStorage.setItem('acelya-sound-muted','1');},theme);page.setDefaultTimeout(8000);const errors=[];page.on('pageerror',e=>errors.push(e.message));page.on('console',m=>{if(m.type()==='error'&&!/Failed to load resource/.test(m.text()))errors.push(m.text());});
   await page.goto(`http://127.0.0.1:${server.address().port}/${SLUG}.html`);await page.waitForFunction(()=>document.getElementById('pdStatus').textContent.length>20);
   const settle=()=>page.evaluate(()=>new Promise(r=>requestAnimationFrame(()=>requestAnimationFrame(r))));
   const click=async id=>{await page.locator('#'+id).click();await settle();},read=id=>page.locator('#'+id).textContent(),has=async(id,t)=>{const s=await read(id);assert(s.includes(t),`${id}: «${t}» yok → ${s.slice(0,260)}`);checks++;},lacks=async(id,t)=>{const s=await read(id);assert(!s.includes(t),`${id}: «${t}» olmamalı`);checks++;};
   const range=async(id,v)=>{await page.locator('#'+id).evaluate((e,v)=>{e.value=v;e.dispatchEvent(new Event('input',{bubbles:true}));},v);await settle();},type=async(id,v)=>{await page.locator('#'+id).fill(v);await settle();},sel=async(id,v)=>{await page.locator('#'+id).selectOption(v);await settle();};
   const noOverflow=async tag=>{eq(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),true,`yatay taşma: ${tag} @${width}`);};
   const painted=async id=>{eq(assertCanvasDrawn(await canvasInk(page,'#'+id),{minDistinct:4,label:id}),true,'tuval boş: '+id);};
   // erişilebilirlik: her denetimin etiketi, her tuvalin rolü
   eq(await page.evaluate(()=>[...document.querySelectorAll('main input,main select')].every(e=>e.id&&document.querySelector('label[for="'+e.id+'"]'))),true,'etiket');
   eq(await page.evaluate(()=>[...document.querySelectorAll('main canvas')].every(c=>c.getAttribute('role')==='img'&&c.getAttribute('aria-label'))),true,'tuval rolü');
   eq(await page.evaluate(()=>Object.isFrozen(IRLab)&&!Object.getOwnPropertyDescriptor(window,'IRLab').writable),true);
   eq(await page.evaluate(()=>/[̀-ͯ]/.test(document.querySelector('main').textContent.normalize('NFC'))),false,'birleşik işaret');
   // Sekme 1: varsayılan durum
   await has('pdDominant','Bozma');await has('pdNash','(Bozma, Bozma)');await has('pdOrder','Sağlanıyor');await has('pdRca','6,0 > 5,0');await has('pdExpLen','20,00');
   await has('pdCompare','0,950');await has('pdCompare','1,200');await has('pdCompare','0,500');await has('pdStatus','koşulları sağlanıyor');await has('pdStatus','üstünde');await has('pdMolander','0,333');await has('pdMolander','%25');await has('pdMolander','1/3');
   eq(await page.locator('#pdTour tr').count(),7);eq(await page.locator('#pdSelf tr').count(),7);await painted('pdCanvas');await painted('pdScan');await noOverflow('pd');
   // kazanç doğrulaması
   await range('pdR',2.5);await has('pdRca','Sağlanmıyor');await has('pdStatus','2R > T + S sağlanmıyor');await range('pdR',6);await has('pdOrder','Sağlanmıyor');await has('pdStatus','tutuklu ikilemi değildir');await has('pdNash','(İşbirliği, İşbirliği) ve (Bozma, Bozma)');await has('pdDominant','Yok');
   await range('pdR',3);await range('pdT',2);await range('pdS',2);await has('pdDominant','İşbirliği');await has('pdNash','(İşbirliği, İşbirliği)');await lacks('pdNash',' ve ');await click('pdReset');await has('pdOrder','Sağlanıyor');
   // δ sınırları ve eşik
   await click('pdOne');await has('pdExpLen','1,00');await has('pdRounds','1');await has('pdStatus','tek turdur');await has('pdMeanLen','1,00');
   await range('pdDelta',0.99);await has('pdExpLen','100,00');await range('pdDelta',0.5);await has('pdStatus','tam eşikte');await range('pdDelta',0.3);await has('pdStatus','altında');await sel('pdA','alld');await sel('pdB','grim');await has('pdCompare','3,800');
   // gürültü hazır ayarları
   await click('pdEcho');eq(await page.locator('#pdA').inputValue(),'tft');eq(await page.locator('#pdNoise').inputValue(),'0.05');await has('pdStatus','yankı');await has('pdSelfEps','0,05');
   const selfRows=await page.locator('#pdSelf tr').allTextContents();ok(selfRows.length===7);
   await click('pdForgive');eq(await page.locator('#pdB').inputValue(),'gtft');await range('pdNoise',0.2);await range('pdG',1);await range('pdG',0);await range('pdNoise',0);await lacks('pdStatus','yankı');
   // tohum
   await type('pdSeed','abc');await has('pdStatus','Tohum 1 ile 999999');await has('pdRounds','—');await type('pdSeed','0');await has('pdStatus','Tohum 1 ile 999999');await type('pdSeed','41');await lacks('pdStatus','Tohum 1 ile');await click('pdNewSeed');eq(await page.locator('#pdSeed').inputValue(),'42');
   await click('pdReset');eq(await page.locator('#pdSeed').inputValue(),'4');await has('pdCompare','0,950');
   // R kısayolu: form denetiminde değilken sıfırlar
   await range('pdDelta',0.4);await page.locator('h1').click();await page.keyboard.press('r');await settle();eq(await page.locator('#pdDelta').inputValue(),'0.95');
   await page.locator('#pdSeed').focus();await page.keyboard.press('r');
   await click('pdReset');
   // Sekme 2
   await click('tab-rs');await has('rsCompare','2,0000');await has('rsCompare','−0,5000');await has('rsCompare','−1,5000');await has('rsMN','1,0000');await has('rsAB','0,2500');await has('rsOutcome','Dengeye yerleşti');await has('rsStatus','Kararlı');await painted('rsPhase');await painted('rsTime');await noOverflow('rs');
   const cmp=async()=>page.locator('#rsCompare tr').evaluateAll(rs=>rs.map(r=>[...r.cells].map(c=>c.textContent)));
   let rows=await cmp();for(const r of rows){eq(r[1],r[2],'kuram = ölçülen (4 basamak): '+r[0]);eq(r[3],'0,0000');}
   await click('rsRunaway');await has('rsOutcome','Sınırsız büyüme');await has('rsStatus','Kararsız');await has('rsCompare','0,2000');await has('rsCompare','−2,2000');rows=await cmp();eq(rows[2][1],rows[2][2]);
   await click('rsDisarm');await has('rsOutcome','sıfıra indi');await has('rsStatus','negatif bölgede');await has('rsCompare','−1,0000');
   await click('rsEdge');await has('rsOutcome','sıfıra indi');await has('rsStatus','eşiktir');await click('rsEdgeUp');await has('rsOutcome','Sınırsız büyüme');await has('rsStatus','eşiktir');
   await click('rsStable');await has('rsOutcome','Dengeye yerleşti');
   // sınır değerler
   await range('rsA',1);await range('rsB',1);await has('rsStatus','Sınır durum');await has('rsCompare','Tanımsız');await range('rsA',0);await range('rsB',0);await has('rsStatus','Kararlı');await range('rsX0',1);await range('rsY0',1);await has('rsStatus','dengenin üzerinde');
   await range('rsX0',5);await range('rsY0',5);await range('rsA',0.5);await range('rsB',0.5);await has('rsStatus','tek bir üstel kip');
   await range('rsA',2);await range('rsB',2);await range('rsM',0.05);await range('rsN',0.05);await range('rsG',2);await range('rsH',2);await range('rsX0',10);await range('rsY0',10);await has('rsOutcome','Sınırsız büyüme');
   await range('rsG',-2);await range('rsH',-2);await range('rsX0',0);await range('rsY0',0);await has('rsOutcome','sıfıra indi');await noOverflow('rs sınır');
   await click('rsReset');await has('rsCompare','2,0000');eq(await page.locator('#rsX0').inputValue(),'5');
   // Sekme 3
   await click('tab-vt');await has('vtWin','848');await has('vtMin','210');await has('vtVeto','D1, D2, D3, D4, D5');await has('vtDummy','Yok');await has('vtRows','421 / 2145');await has('vtRows','4 / 2145');await has('vtRows','%19,627');await has('vtRows','%0,186');await has('vtStatus','421/2145');await has('vtRule','Md. 27/3');await has('vtRule','veto sayılmaz');await painted('vtCanvas');await noOverflow('vt');eq(await page.locator('#vtRows tr').count(),15);
   await sel('vtPreset','unscproc');await has('vtRows','1 / 15');await has('vtVeto','Yok');await sel('vtPreset','majority');await has('vtWin','16 / 32');await has('vtRows','1 / 5');
   await sel('vtPreset','eec');await has('vtDummy','Lük');await has('vtRows','7 / 30');await has('vtRows','3 / 20');await has('vtRows','etkisiz');await has('vtStatus','Lüksemburg');await has('vtRows','%23,81');
   await sel('vtPreset','toy');await has('vtRows','2 / 3');await has('vtRows','1 / 6');await has('vtVeto','A');
   // özel giriş ve sınırlar
   await type('vtWeights','5, 2, 1');await type('vtQuota','5');eq(await page.locator('#vtPreset').inputValue(),'custom');await has('vtStatus','diktatör');await has('vtRows','diktatör');await has('vtDummy','B, C');
   await type('vtQuota','9');await has('vtStatus','aşıyor');await has('vtWin','—');await type('vtQuota','0');await has('vtStatus','pozitif bir tam sayı');await type('vtQuota','4');await type('vtWeights','1, 1, x');await has('vtStatus','tam sayı olmalı');await type('vtWeights','');await has('vtStatus','boş');
   await type('vtWeights','1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1');await has('vtStatus','En çok 15');await type('vtWeights','1,1,1,1');await type('vtQuota','2');await has('vtStatus','İki ayrık koalisyon');await has('vtWin','11 / 16');
   await type('vtWeights','3;2;2');await type('vtQuota','4');await has('vtRows','1 / 3');await type('vtSeed','x');await has('vtStatus','Tohum');await type('vtSeed','5');await click('vtNewSeed');eq(await page.locator('#vtSeed').inputValue(),'6');await noOverflow('vt özel');
   await click('vtReset');eq(await page.locator('#vtPreset').inputValue(),'unsc');eq(await page.locator('#vtSeed').inputValue(),'1');await has('vtRows','421 / 2145');
   // klavye: sekmeler
   await page.locator('#tab-vt').focus();await page.keyboard.press('Home');eq(await page.locator('#tab-pd').getAttribute('aria-selected'),'true');await page.keyboard.press('ArrowRight');eq(await page.locator('#tab-rs').getAttribute('aria-selected'),'true');await page.keyboard.press('End');eq(await page.locator('#tab-vt').getAttribute('aria-selected'),'true');await page.keyboard.press('ArrowRight');eq(await page.locator('#tab-pd').getAttribute('aria-selected'),'true');await page.keyboard.press('ArrowLeft');eq(await page.locator('#tab-vt').getAttribute('aria-selected'),'true');
   eq(await page.locator('#panel-pd').isHidden(),true);eq(await page.locator('#panel-vt').isVisible(),true);await noOverflow('son');
   assert.deepEqual(errors,[]);checks++;await ctx.close();}
  console.log(`G ${SLUG}: ${checks-before} tarayıcı kontrolü (390 açık + 1280 koyu) PASS`);
 }finally{await browser?.close();await new Promise(r=>server.close(r));}
}
