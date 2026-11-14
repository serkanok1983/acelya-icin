// G · populasyon-genetigi: çekirdek, sayfanın formüllerini yinelemeyen referanslarla sınanır.
// Binom örnekleyici: tam olasılık kütlesine ki-kare uyumu. χ² kuyruğu: yoğunluğun Simpson tümlevi ve bilinen sınır değerleri.
// HW: bütün çiftleşmelerin Mendel sayımıyla kaba kuvvet. Seçilim: zigot → hayatta kalan → alel sayımı. Sürüklenme ve seçilim:
// Wright–Fisher Markov zincirinin doğrusal cebirle tam çözümü (sabitlenme olasılığı, koşullu sabitlenme süresi), Kimura ve
// Kimura–Ohta yaklaşımları buna karşı; simülasyon çok tekrarla ve sabit tohumlarla. Ada modeli: çok tohumun ortalaması. Soy tahmini:
// olabilirlik ızgara araması. Ayrıştırıcı ve 1 800 üretilmiş soru, sorunun metninden bağımsız yeniden hesaplanarak.
// `--browser` arayüzü 390 px açık ve 1280 px koyu temada dener.
import fs from 'node:fs';
import assert from 'node:assert/strict';
const SLUG='populasyon-genetigi';
const html=fs.readFileSync(new URL('../'+SLUG+'.html',import.meta.url),'utf8');
const source=html.split('/* KERNEL-BEGIN */')[1]?.split('/* KERNEL-END */')[0];
assert(source,'Çekirdek sınır işaretleri gerekli');
const K=new Function('"use strict";'+source+';return PopGenLab;')();
let checks=0;
const eq=(a,b,msg)=>{assert.equal(a,b,(msg??'')+` · ${a} ≠ ${b}`);checks++;};
const ok=(c,msg)=>{assert(c,msg??'koşul sağlanmadı');checks++;};
const near=(a,b,tol,msg)=>{assert(Math.abs(a-b)<=tol,(msg||'')+` ${a} ≠ ${b} (±${tol})`);checks++;};
const rel=(a,b,r,msg)=>near(a,b,r*Math.abs(b),msg);
const M='−',N_=' ';
ok(Object.isFrozen(K)&&Object.isFrozen(K.DATASETS)&&Object.isFrozen(K.MISTAKES)&&Object.isFrozen(K.TYPES)&&Object.isFrozen(K.APPORTION));

/* ── Sayı biçimi ── */
eq(K.fmt(-3.25,2),M+'3,25');eq(K.fmt(12345.6,1),'12'+N_+'345,6');eq(K.fmt(9999,0),'9999');eq(K.fmt(-0.001,2),'0,00');
eq(K.fmtSci(5e-6,0),'5 × 10⁻⁶');eq(K.sig(0.0031623,3),'0,00316');eq(K.sig(0.5,3),'0,500');eq(K.sig(1.2e-6,2),'1,2 × 10⁻⁶');eq(K.pct(0.0392,2),'%3,92');eq(K.fmtP(0.0004),'< 0,001');eq(K.pEq(0.0004),'P < 0,001');eq(K.pEq(0.362),'P = 0,362');eq(K.fmtP(0.3620),'0,362');

/* ── Bağımsız yardımcılar ── */
const pmf=(n,p)=>{const a=new Float64Array(n+1);let l=n*Math.log1p(-p);a[0]=Math.exp(l);for(let k=0;k<n;k++){l+=Math.log((n-k)/(k+1))+Math.log(p)-Math.log1p(-p);a[k+1]=Math.exp(l);}return a;};
function solve(A,b){const n=b.length;A=A.map(r=>r.slice());b=b.slice();for(let i=0;i<n;i++){let m=i;for(let r=i+1;r<n;r++)if(Math.abs(A[r][i])>Math.abs(A[m][i]))m=r;[A[i],A[m]]=[A[m],A[i]];[b[i],b[m]]=[b[m],b[i]];
  for(let r=i+1;r<n;r++){const f=A[r][i]/A[i][i];if(!f)continue;for(let c=i;c<n;c++)A[r][c]-=f*A[i][c];b[r]-=f*b[i];}}const x=new Array(n).fill(0);for(let i=n-1;i>=0;i--){let s=b[i];for(let c=i+1;c<n;c++)s-=A[i][c]*x[c];x[i]=s/A[i][i];}return x;}
/* Wright–Fisher zinciri: kopya sayısı i → Binom(2N, p′(i)), p′ seçilimden sonra (bağımsız kaba kuvvet seçilim adımıyla) */
function bruteSel(p,w){const z=[p*p,2*p*(1-p),(1-p)**2].map((f,i)=>f*w[i]);const tot=z[0]+z[1]+z[2];return(2*z[0]+z[1])/(2*tot);}
function wfExact(N,w){const n2=2*N,T=[];for(let i=1;i<n2;i++){const pp=bruteSel(i/n2,w);T.push(pmf(n2,pp));}
  const m=n2-1,A=[],bf=[];for(let i=0;i<m;i++){const row=new Array(m).fill(0);for(let j=0;j<m;j++)row[j]=(i===j?1:0)-T[i][j+1];A.push(row);bf.push(T[i][n2]);}
  const u=solve(A,bf);const As=[],ones=[];for(let i=0;i<m;i++){const row=new Array(m).fill(0);for(let j=0;j<m;j++)row[j]=(i===j?1:0)-T[i][j+1]*u[j]/u[i];As.push(row);ones.push(1);}
  const tc=solve(As,ones);return{u:i=>u[i-1],tFix:i=>tc[i-1]};}

/* ── Binom örnekleyici: iki dal, ki-kare uyumu ── */
for(const[n,p]of[[10,0.3],[40,0.05],[100,0.5],[200,0.37],[2000,0.5],[2000,0.993],[1000,0.012]]){const r=K.rng(K.mix('binom',n,p));const R=60000,c=new Float64Array(n+1);for(let i=0;i<R;i++)c[K.binom(r,n,p)]++;
  const P=pmf(n,p);let chi=0,df=-1,eAcc=0,oAcc=0;for(let k=0;k<=n;k++){eAcc+=R*P[k];oAcc+=c[k];if(eAcc>=10||k===n){chi+=(oAcc-eAcc)**2/eAcc;df++;eAcc=0;oAcc=0;}}
  ok(K.chi2Sf(chi,df)>0.001,`binom(${n},${p}) χ²=${chi.toFixed(1)} sd=${df}`);}
eq(K.binom(K.rng(1),50,0),0);eq(K.binom(K.rng(1),50,1),50);

/* ── χ² kuyruğu: yoğunluğun tümlevi ── */
const chiPdf=(x,k)=>Math.exp((k/2-1)*Math.log(x)-x/2-(k/2)*Math.LN2-K.lgamma(k/2));
const simpson=(f,a,b,n=20000)=>{const h=(b-a)/n;let s=f(a)+f(b);for(let i=1;i<n;i++)s+=(i%2?4:2)*f(a+i*h);return s*h/3;};
for(const[x,k]of[[0.83,1],[3.84,1],[5,1],[2,2],[7.5,3],[12,5],[0.2,4]]){const tail=k===1?1-2*simpson(t=>Math.exp(-t*t/2)/Math.sqrt(2*Math.PI),0,Math.sqrt(x)):simpson(t=>chiPdf(t,k),x,x+200);near(K.chi2Sf(x,k),tail,2e-6,`χ² ${x} sd ${k}`);}
near(K.chi2Sf(3.841458820694124,1),0.05,1e-9);near(K.chi2Sf(5.991464547107979,2),0.05,1e-9);near(K.chi2Sf(6.634896601021214,1),0.01,1e-9);
{const[l,h]=K.wilson(40,2000);near(l,0.01472,2e-4);near(h,0.02712,2e-4);}

/* ── 1 · Hardy–Weinberg ── */
{const F=K.chi2HW(1469,138,5);near(F.chi2,0.83,0.005,'Ford 1971, Wikipedia: χ² = 0,83');near(F.p,0.954,0.0005);near(F.E[0],1467.4,0.05);near(F.E[1],141.2,0.05);near(F.E[2],3.4,0.05);eq(F.df,1);ok(F.small);}
{const A=K.chi2HW(92,216,192);near(A.chi2,5.0,1e-9);near(A.p,0.4,1e-12);near(A.F,0.1,1e-12);ok(A.pval<0.05&&K.chi2Sf(A.chi2,2)>0.05,'sd 1 reddeder, sd 2 reddetmez');}
{const W=K.chi2HW(340,320,340);near(W.F,1-320/500,1e-12);ok(W.pval<1e-10);}
ok(!K.chi2HW(10,0,0).ok);ok(!K.chi2HW(0,0,0).ok);
/* Kaba kuvvet: rastgele ebeveyn genotipleri → bütün çiftleşmeler → yavru oranları HW, p korunur */
for(const[P,H,Q]of[[0.5,0,0.5],[0.1,0.7,0.2],[0.3,0.3,0.4],[0,1,0]]){const g=[P,H,Q],gam=[[1],[0.5,0.5],[0,1]].map(a=>a.length===1?[1,0]:a);const off=[0,0,0];
  for(let i=0;i<3;i++)for(let j=0;j<3;j++){const a=gam[i],b=gam[j];off[0]+=g[i]*g[j]*a[0]*b[0];off[1]+=g[i]*g[j]*(a[0]*b[1]+a[1]*b[0]);off[2]+=g[i]*g[j]*a[1]*b[1];}
  const p=P+H/2,E=K.hwExpected(p);for(let k=0;k<3;k++)near(off[k],E[k],1e-12);near(off[0]+off[1]/2,p,1e-12);}
{const c=K.gameteUnion(0.3,200000,7),E=K.hwExpected(0.3);for(let k=0;k<3;k++)near(c[k]/200000,E[k],0.004);eq(K.gameteUnion(0.3,200,1).join(),K.gameteUnion(0.3,200,1).join());}
/* χ² testinin boyutu: doğru H₀ altında ret oranı ≈ %5 */
{let rej=0;const R=4000;for(let s=1;s<=R;s++){const c=K.gameteUnion(0.4,300,s);const t=K.chi2HW(...c);if(t.pval<0.05)rej++;}near(rej/R,0.05,0.012,'I. tür hata oranı');}
{const X=K.xLinked(0.08);near(X.female,0.0064,1e-15);near(X.carrier,0.1472,1e-12);near(X.ratio,12.5,1e-12);}
{const pA=0.28,pB=0.06,r=1-pA-pB,al=[['A',pA],['B',pB],['O',r]];const ph={A:0,B:0,AB:0,O:0};for(const[a,x]of al)for(const[b,y]of al){const s=[a,b].sort().join('');ph[s==='AA'||s==='AO'?'A':s==='BB'||s==='BO'?'B':s==='AB'?'AB':'O']+=x*y;}
  const Z=K.abo(pA,pB);for(const k of['A','B','AB','O'])near(Z[k],ph[k],1e-12,k);ok(K.abo(0.7,0.5)===null);}

/* ── 3 · Seçilim (deterministik) ── */
for(const w of[[1.1,1.05,1],[1,1,0.5],[0.2,1,0.9],[1,0.9,1],[1.3,0.7,0.2]])for(const p of[0.01,0.2,0.5,0.93]){const b=bruteSel(p,w);near(K.selStep(p,w),b,1e-14);const q=1-p,wb=K.meanFitness(p,w);near(b-p,p*q*(p*(w[0]-w[1])+q*(w[1]-w[2]))/wb,1e-14,'Δp formülü');}
{const e=K.equilibrium([0.2,1,0.9]);near(e.p,0.1/0.9,1e-12);ok(e.stable);near(bruteSel(e.p,[0.2,1,0.9]),e.p,1e-14);ok(K.selStep(e.p+0.05,[0.2,1,0.9])<e.p+0.05&&K.selStep(e.p-0.05,[0.2,1,0.9])>e.p-0.05,'kararlı');
  const u=K.equilibrium([1,0.9,1]);near(u.p,0.5,1e-12);ok(!u.stable);ok(K.selStep(0.55,[1,0.9,1])>0.55,'kararsız');eq(K.equilibrium([1.1,1.05,1]),null);}
for(const s of[0.01,0.1]){const w=[1+s,1+s/2,1];const t=K.timeTo(0.05,0.99,w),a=K.additiveApproxTime(0.05,0.99,s);rel(t,a,s===0.01?0.01:0.08,'eklemeli süre');}
{let p=0.05,t=0;while(p<0.99){p=bruteSel(p,[1.1,1.05,1]);t++;}eq(K.timeTo(0.05,0.99,[1.1,1.05,1]),t);eq(K.timeTo(0.3,0.9,[1,1,1]),null);}
/* Ortalama uyum seçilimle azalmaz (Fisher) */
for(const w of[[1.1,1.05,1],[0.2,1,0.9],[1,0.9,1]]){const tr=K.selTraj(0.3,w,200);for(let t=0;t<200;t++)ok(K.meanFitness(tr[t+1],w)>=K.meanFitness(tr[t],w)-1e-12);}
/* Mutasyon–seçilim dengesi: yinelenen değer bir kuşak sonra değişmez ve yaklaşımlarla uyuşur */
for(const[mu,s,h,r]of[[1e-5,1,0,0.002],[1e-6,0.25,0,0.003],[1e-5,1,0.05,0.01],[1e-5,0.5,0.2,0.005]]){const it=K.msbIterate(mu,s,h);const qs=1-bruteSel(1-it.q,[1,1-h*s,1-s]);near(qs+mu*(1-qs),it.q,1e-9*it.q+1e-15,'denge');rel(it.q,h===0?Math.sqrt(mu/s):mu/(h*s),r,`msb ${mu} ${s} ${h}`);}

/* ── 2 · Sürüklenme: tam Markov zinciri ve simülasyon ── */
{const N=20,X=wfExact(N,[1,1,1]);for(const i of[1,8,20,33])near(X.u(i),i/40,1e-9,'nötr u = p₀');
  const ko=K.fixTimeKO(N,0.5),ex=X.tFix(20);rel(ko,ex,0.06,'Kimura–Ohta, N = 20');
  const R=K.wfRun({N,p0:0.5,T:3000,R:4000,seed:3,keep:0});const nf=R.tFix.length,abs=nf+R.tLost.length;eq(abs,4000,'hepsi yutuldu');const ci=K.wilson(nf,abs);ok(0.5>=ci[0]&&0.5<=ci[1],'sabitlenme payı p₀ aralıkta');
  const mt=R.tFix.reduce((a,b)=>a+b,0)/nf;rel(mt,ex,0.05,'koşullu sabitlenme süresi, tam zincire göre');
  const th=K.hTheory(R.sizes);for(const t of[10,20,40])rel(R.H[t]/R.H[0],th[t],0.04,'H(t), t = '+t);rel(th[40],(1-1/40)**40,1e-12);}
{const N=50,R=K.wfRun({N,p0:0.3,T:200,R:5000,seed:11,keep:0});const th=K.hTheory(R.sizes);for(const t of[25,50,100])rel(R.H[t]/R.H[0],th[t],0.03,'N = 50, t = '+t);
  let sd=0;for(const x of R.finalP)sd+=(x-R.P[200])**2;sd=Math.sqrt(sd/4999);near(R.P[200],0.3,4*sd/Math.sqrt(5000),'ortalama p korunur');}
{const o={N:200,p0:0.5,T:150,R:3000,seed:5,keep:0,bottle:{t0:50,len:5,Nb:5}};const R=K.wfRun(o);const th=K.hTheory(R.sizes);eq(R.sizes[52],5);eq(R.sizes[49],200);
  rel(R.H[55]/R.H[50],(1-1/10)**5,0.04,'darboğaz kaybı');rel(R.H[150]/R.H[0],th[150],0.05);rel(K.harmonicNe(R.sizes),150/(145/200+5/5),1e-12);}
eq(K.harmonicNe([1000,10,1000,1000]).toFixed(4),(4/(3/1000+1/10)).toFixed(4));
{const a=K.wfRun({N:30,p0:0.4,T:50,R:20,seed:9}),b=K.wfRun({N:30,p0:0.4,T:50,R:20,seed:9});eq(a.finalP.join(),b.finalP.join(),'tohumlu');}
/* Seçilimli zincir: Kimura yaklaşımı ve simülasyon */
for(const[N,s]of[[50,0.02],[50,-0.01],[25,0.05]]){const X=wfExact(N,[1+s,1+s/2,1]);const ex=X.u(1);rel(K.kimuraU(N,s,1/(2*N)),ex,0.08,`Kimura N=${N} s=${s}`);
  const f=K.fixSim({N,s,R:20000,seed:K.mix('fs',N,s)});ok(ex>=f.ci[0]&&ex<=f.ci[1],`fixSim N=${N} s=${s}: ${f.frac} [${f.ci}] tam ${ex}`);}
near(K.kimuraU(100,0,0.3),0.3,1e-15);near(K.kimuraU(1000,0.01,1/2000),(1-Math.exp(-0.01))/(1-Math.exp(-20)),1e-15);

/* ── 4 · Ada modeli ve akrabalı yetişme ── */
for(const[N,m]of[[50,0.01],[25,0.04],[100,0.002]]){let F=0;const seeds=[1,2,3,4,5,6];const T=Math.round(Math.min(1500,8/(2*m+1/(2*N))));
  for(const s of seeds){const I=K.islandRun({n:40,N,m,T,seed:s,p0:0.5});let a=0,c=0;for(let t=Math.floor(T/2);t<=T;t++)if(Number.isFinite(I.F[t])){a+=I.F[t];c++;}F+=a/c;}F/=seeds.length;
  const eqF=K.fstEq(N,m);rel(F,eqF,0.08,`F_ST N=${N} m=${m}`);const th=K.fstTheory(N,m,3000);near(th[3000],eqF,1e-9);{/* bağımsız: V′ = (1 − m)²V(1 − 1/(2N)) + (pq − (1 − m)²V)/(2N) yinelemesi */let V=0;for(let t=0;t<20000;t++)V=(1-m)**2*V+(0.25-(1-m)**2*V)/(2*N);near(V/0.25,eqF,1e-9);}rel(K.fstApprox(N,m),eqF,0.06);}
{const I=K.islandRun({n:40,N:10,m:0,T:400,seed:2,p0:0.5});ok(Array.from(I.F).every(x=>!Number.isFinite(x)||x<=1+1e-12),'F_ST ≤ 1');const last=Array.from(I.F).filter(Number.isFinite).pop();near(last,1,1e-12,'bütün demeler sabit: F_ST = 1');}
for(const[p,F]of[[0.99,1/16],[0.6,0.25],[0.3,1],[0.5,0]]){const G=K.inbreed(p,F),q=1-p;const ibd=[p,0,q],hw=[p*p,2*p*q,q*q];for(let k=0;k<3;k++)near(G[k],F*ibd[k]+(1-F)*hw[k],1e-15);near(G[0]+G[1]/2,p,1e-15);}
near(K.inbreed(0.99,1/16)[2]/K.inbreed(0.99,0)[2],1+99/16,1e-9);

/* ── 5 · Klinler, bölüştürme, soy tahmini ── */
{const C=K.makeClines(1);eq(C.P.length,400);eq(C.D,40);
  for(const[k,u]of[[2,0],[3,0],[3,0.4],[5,-0.2],[6,0.1]]){const G=K.groupsOf(40,k,u);const A=K.apportion(C,G);near(A.within+A.amongDemes+A.amongGroups,1,1e-12);ok(A.amongDemes>=-1e-12&&A.amongGroups>=0);eq(new Set(G.g).size,k,'her grup dolu');
    /* kaba kuvvet: bütün alelleri havuzla */let HT=0,HS=0;for(const row of C.P){const pt=row.reduce((a,b)=>a+b,0)/40;HT+=2*pt*(1-pt);for(let j=0;j<k;j++){const ds=[...Array(40).keys()].filter(d=>G.g[d]===j);const pg=ds.reduce((a,d)=>a+row[d],0)/ds.length;HS+=ds.length/40*2*pg*(1-pg);}}
    near(A.amongGroups,(HT-HS)/HT,1e-12);}
  const all=K.apportion(C,{g:Int32Array.from({length:40},(_,i)=>i),k:40});near(all.amongDemes,0,1e-12);const w=K.apportion(C,K.groupsOf(40,3,0)).within;near(w,all.within,1e-12);ok(w>0.85&&w<0.93,'köy içi pay insan verisine benzer düzeyde: '+w);
  for(const[d,k]of[[3,2],[20,2],[37,2]]){const G=K.groupsOf(40,k,0),f=K.refFreqs(C,G),g=K.sampleIndividual(C,d,1);const q=K.admixEM(g,f,2,2000);let best=0,bl=-Infinity;for(let x=0;x<=1000;x++){const ll=K.admixLogLik(g,f,[x/1000,1-x/1000]);if(ll>bl){bl=ll;best=x/1000;}}near(q[0],best,0.003,'EM = ızgara, köy '+d);}
  {const g=K.sampleIndividual(C,1,1),q=K.admixEM(g,K.refFreqs(C,K.groupsOf(40,3,0)),3);ok(q[0]>0.6,'uçtaki köyden kişi çoğunlukla 1. grup');}}

/* ── Ayrıştırıcı ── */
const P=s=>K.parseNum(s).v;
for(const[s,v]of[['0,25',0.25],['0.25',0.25],['1/4',0.25],['%25',0.25],['25 %',0.25],['yüzde 25',0.25],['2,5e-3',0.0025],['2,5 × 10^-3',0.0025],['2,5·10⁻³',0.0025],['2.5x10^-3',0.0025],['10^-4',1e-4],['1 000',1000],['12 345,5',12345.5],['1.000.000',1e6],[',5',0.5],['−0,1',-0.1],['3,16 × 10^(-3)',0.00316],['  0,0392 ',0.0392],['1 000',1000]])near(P(s),v,1e-12,s);
ok(K.parseNum('%3,92').pct);ok(!K.parseNum('3,92').pct);
for(const s of['','abc','2,,5','1.2.3,4,5','3 elma','1/0','e5','10 ^ ','%','%%5','5%5','0,2 0,3'])assert.throws(()=>K.parseNum(s),K.ParseError,s),checks++;

/* ── Alıştırma üreteci: 150 × 12 tür; hedef sorunun metninden bağımsız yeniden hesaplanır ── */
const nm=s=>Number(s.replace(/[  ]/g,'').replace(',','.'));
const sup=s=>Number([...s].map(c=>c==='⁻'?'-':String('⁰¹²³⁴⁵⁶⁷⁸⁹'.indexOf(c))).join(''));
let generated=0;const seen=new Set();
for(let L=1;L<=3;L++)for(const[type]of K.TYPES[L-1])for(let n=1;n<=150;n++){const ex=K.makeExercise(L,n,type);generated++;seen.add(ex.prompt);eq(ex.type,type);ok(ex.steps.length>=2&&ex.hint.length>15);
  ok(!/(^|[^\w])-\d/.test(ex.prompt+ex.answer+ex.steps.join(' ').replace(/e\^\(−|\^/g,'')),'tire yerine eksi: '+ex.prompt);ok(!/[̀-ͯ]/.test(ex.prompt+ex.hint+ex.steps.join('')),'birleşik aksan');
  const g=K.grade(ex,ex.answer);eq(g.st,'dogru',`${type} ${n}: “${ex.answer}” → ${g.msg}`);const p=ex.prompt;let m;
  if(type==='frek'){m=p.match(/([\d ]+) AA, ([\d ]+) Aa ve ([\d ]+) aa/);const[a,h,b]=[m[1],m[2],m[3]].map(nm);near(ex.target,(2*a+h)/(2*(a+h+b)),1e-12,p);ok(a>0&&h>0&&b>0);}
  else if(type==='hwbek'){m=p.match(/p = ([\d,]+)\. ([\d ]+) kişilik/);const pp=nm(m[1]),N=nm(m[2]);near(ex.target,2*pp*(1-pp)*N,1e-9,p);}
  else if(type==='xbag'){m=p.match(/%(\d+) sıklıkla/);const q=nm(m[1])/100;near(ex.target,q*q,1e-12,p);}
  else if(type==='ki2'){m=p.match(/AA = ([\d ]+), Aa = ([\d ]+), aa = ([\d ]+)/);const O=[m[1],m[2],m[3]].map(nm),n2=O[0]+O[1]+O[2],pp=(2*O[0]+O[1])/(2*n2);const E=[pp*pp,2*pp*(1-pp),(1-pp)**2].map(x=>x*n2);near(ex.target,O.reduce((s,o,i)=>s+(o-E[i])**2/E[i],0),1e-9,p);ok(E.every(e=>e>=5));}
  else if(type==='het'){m=p.match(/p₀ = ([\d,]+) olan, N = ([\d ]+) bireylik.*?(\d+) kuşak/);const pp=nm(m[1]),N=nm(m[2]),t=nm(m[3]);rel(ex.target,2*pp*(1-pp)*Math.exp(t*Math.log1p(-1/(2*N))),1e-9,p);}
  else if(type==='tasiyici'){m=p.match(/doğumlarda ([\d ]+)’de 1/);const q=1/Math.sqrt(nm(m[1]));near(ex.target,2*q*(1-q),1e-12,p);}
  else if(type==='ne'){m=p.match(/büyüklükleri: ([\d,  ]+)\. Bu/);const s=m[1].split(', ').map(nm);rel(ex.target,s.length/s.reduce((a,b)=>a+1/b,0),1e-12,p);}
  else if(type==='dp'){m=p.match(/w\(A₁A₁\) = ([\d,]+), w\(A₁A₂\) = ([\d,]+), w\(A₂A₂\) = ([\d,]+).*p = ([\d,]+) ise/);const w=[m[1],m[2],m[3]].map(nm),pp=nm(m[4]);near(ex.target,bruteSel(pp,w),1e-12,p);}
  else if(type==='denge'){m=p.match(/s = ([\d,]+), t = ([\d,]+)\./);const s=nm(m[1]),t=nm(m[2]);const e=K.equilibrium([1-s,1,1-t]);near(ex.target,e.p,1e-12,p);near(bruteSel(e.p,[1-s,1,1-t]),e.p,1e-12);}
  else if(type==='fst'){m=p.match(/N = ([\d ]+) birey.*m = ([\d,]+)\)?/);const N=nm(m[1]),mm=nm(m[2]);near(ex.target,1/(1+4*N*mm),1e-12,p);}
  else if(type==='msb'){m=p.match(/s = ([\d,]+); .*μ = (\d+) × 10([⁻⁰¹²³⁴⁵⁶⁷⁸⁹]+)/);const s=nm(m[1]),mu=nm(m[2])*10**sup(m[3]);rel(ex.target,Math.sqrt(mu/s),1e-12,p);}
  else if(type==='sabit'){m=p.match(/N = ([\d ]+) bireylik.*s = ([\d,]+)\. Sabit/);const N=nm(m[1]),s=nm(m[2]);rel(ex.target,s===0?1/(2*N):(1-Math.exp(-s))/(1-Math.exp(-2*N*s)),1e-12,p);}
  else assert.fail('denetlenmeyen tür '+type);}
ok(seen.size>generated*0.4,'sorular yeterince çeşitli: '+seen.size+'/'+generated);
for(let L=1;L<=3;L++)for(let n=1;n<=30;n++)eq(K.makeExercise(L,n).prompt,K.makeExercise(L,n).prompt);
/* Notlama: tipik yanlışlar ve biçimler */
const G=(e,s)=>K.grade(e,s);
{const e={kind:'prob',target:0.0392,tol:0.02*0.0392,answer:'%3,92',wrong:{'0.02':'q','0.0004':'q2'}};eq(G(e,'%3,92').st,'dogru');eq(G(e,'0,0392').st,'dogru');eq(G(e,'3,92').st,'dogru');eq(G(e,'yüzde 3,9').st,'dogru');eq(G(e,'0,02').msg,'q');eq(G(e,'1/2500').msg,'q2');eq(G(e,'0,041').st,'yaklasik');eq(G(e,'0,5').st,'yanlis');eq(G(e,'abc').st,'gecersiz');eq(G(e,'').st,'gecersiz');}
{const find=t=>{for(let n=1;;n++){const e=K.makeExercise(2,n,t);return e;}};const e=find('tasiyici');const q=Number(Object.keys(e.wrong)[0]);eq(G(e,K.fmt(q,4)).st,'yanlis');ok(/alel sıklığı/.test(G(e,K.fmt(q,4)).msg));
  const h=K.makeExercise(2,3,'het');const w=Number(Object.keys(h.wrong)[0]);if(Math.abs(w-h.target)>3*h.tol)ok(/2N/.test(G(h,String(w)).msg));
  const ne=K.makeExercise(2,2,'ne');const ar=Number(Object.keys(ne.wrong)[0]);ok(/aritmetik/.test(G(ne,String(ar)).msg));}

/* ── Hatalar ── */
eq(K.MISTAKES.length,8);eq(K.MISTAKES.filter(m=>m.kind==='kavram').length,5);eq(new Set(K.MISTAKES.map(m=>m.id)).size,8);
{const by=Object.fromEntries(K.MISTAKES.map(m=>[m.id,m]));ok(by.baskin.right.includes('%19'));ok(by.eniyi.right.includes('0,111'));ok(by.tasiyici.right.includes('%3,92'));ok(by.df.right.includes('5,00')&&by.df.right.includes('0,025'));ok(by.ne.right.includes('38,8'));
  const t=Math.ceil(1/0.005-1/0.01-1e-9);eq(t,100);ok(by.cekinik.right.includes(' '+t+' kuşak'),'q_t = q₀/(1 + t·q₀) kapalı biçimi '+t);ok(by.cekinik.right.includes('0,00316'));
  ok(by.surukleme.right.includes('%1,00'));ok(by.hwyok.right.includes('0,36 / 0,48 / 0,16'));
  for(const m of K.MISTAKES)ok(!/[̀-ͯ]/.test(m.title+m.wrong+m.right+m.why),'birleşik aksan '+m.id);}
console.log(`G ${SLUG}: ${checks.toLocaleString('tr-TR')} bağımsız çekirdek kontrolü PASS (${generated} üretilmiş soru)`);

if(process.argv.includes('--browser')){
  const {chromium}=await import('playwright');const {createServer}=await import('node:http');const {join,extname}=await import('node:path');const {fileURLToPath}=await import('node:url');const root=fileURLToPath(new URL('../',import.meta.url));
  const server=createServer((req,res)=>{const file=join(root,decodeURIComponent(new URL(req.url,'http://localhost').pathname));if(!fs.existsSync(file)||fs.statSync(file).isDirectory()){res.writeHead(404).end();return;}res.setHeader('Content-Type',({'.html':'text/html; charset=utf-8','.js':'text/javascript; charset=utf-8','.css':'text/css; charset=utf-8'})[extname(file)]||'application/octet-stream');res.setHeader('Connection','close');res.end(fs.readFileSync(file));});await new Promise(r=>server.listen(0,'127.0.0.1',r));let browser;const before=checks;
  try{browser=await chromium.launch();
    for(const[theme,width]of[['light',390],['dark',1280]]){
      const page=await browser.newPage({viewport:{width,height:900},deviceScaleFactor:width===390?2:1});await page.addInitScript(t=>{localStorage.setItem('acelya-theme',t);localStorage.setItem('acelya-sound-muted','1');},theme);page.setDefaultTimeout(8000);
      const errors=[];page.on('pageerror',e=>errors.push(e.message));
      page.on('response',r=>{if(r.status()>=400&&!new RegExp('shared/digest/'+SLUG+'\\.js$').test(r.url()))errors.push(r.status()+' '+r.url());});
      page.on('console',m=>{if(m.type()==='error'&&!/Failed to load resource/.test(m.text()))errors.push(m.text());});
      await page.goto(`http://127.0.0.1:${server.address().port}/${SLUG}.html`);await page.waitForTimeout(300);
      const click=id=>page.locator('#'+id).click(),read=async id=>(await page.locator('#'+id).textContent()).replace(/ /g,' '),set=(id,v)=>page.locator('#'+id).evaluate((e,v)=>{if(e.type==='checkbox')e.checked=v;else e.value=v;e.dispatchEvent(new Event(e.tagName==='SELECT'||e.type==='checkbox'?'change':'input',{bubbles:true}));},v);
      const waitFor=async(id,pred,desc)=>{try{await page.waitForFunction(([id,src])=>{const e=document.getElementById(id);return e&&new Function('s','return '+src)(e.textContent.replace(/ /g,' '));},[id,pred],{timeout:6000});}catch{}const s=await read(id);ok(new Function('s','return '+pred)(s),`${id}: “${s}” ${desc}`);};
      const is=(id,t)=>waitFor(id,'s==='+JSON.stringify(t),'≠ “'+t+'”'),has=(id,t)=>waitFor(id,'s.includes('+JSON.stringify(t)+')','içinde “'+t+'” yok');
      const fits=async()=>eq(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),true,'yatay taşma');
      eq(await page.evaluate(()=>[...document.querySelectorAll('.app-content input,.app-content select')].filter(e=>!document.querySelector('label[for="'+e.id+'"]')).map(e=>e.id).join()),'','etiketsiz denetim');
      eq(await page.evaluate(()=>[...document.querySelectorAll('.app-content svg.pg-svg')].every(c=>c.getAttribute('role')==='img'&&!!c.getAttribute('aria-label'))),true,'svg erişilebilirliği');
      eq(await page.evaluate(()=>Object.isFrozen(PopGenLab)&&!Object.getOwnPropertyDescriptor(window,'PopGenLab').writable),true);
      eq(await page.evaluate(()=>/[̀-ͯ]/.test(document.body.innerText+document.body.textContent)),false,'birleşik aksan işareti yok');
      eq(await page.evaluate(()=>document.querySelectorAll('input[type=number]').length),0);eq(await page.evaluate(()=>document.title.length<=80),true);
      await has('yardim','yapay veri');await has('yardim','sıralamaz');await has('yardim','kaydetmez');
      for(const h of['genetik-caprazlama','dogal-secilim','nufus-ekolojisi','rastgele-yuruyus','hipotez-testi-ve-guven-araligi'])eq(await page.locator(`.pg-next a[href="${h}.html"]`).count(),1,h);
      eq(await page.evaluate(()=>document.body.textContent.split('(hazırlanıyor)').length-1),0,'hazırlanıyor notu kalmadı');eq(await page.locator('a[href="biyoinformatik-ve-dizi-hizalama.html"],a[href="gen-muhendisligi.html"]').count()>=2,true);
      // 01 · HW
      await is('hwObs','18 / 78 / 104');await is('hwExp','18,0 / 84,0 / 98,0');await is('hwChi','χ² = 0,37 · P = 0,543');await has('hwStatus','reddedilmez');
      await set('hwP','0.01');await set('hwN','20');{const s=await read('hwChi');ok(s==='—'||s.startsWith('χ²'));}await click('hwP1');await is('hwExp','5,0 / 10,0 / 5,0');
      {let rej=0;for(let s=1;s<=40;s++){await set('hwSeed',String(s));if((await read('hwStatus')).includes('I. tür'))rej++;}ok(rej<=8,'I. tür hata sayısı '+rej);}
      await click('hwNew');await click('hwReset');await is('hwObs','18 / 78 / 104');
      await is('chChi','0,83 · P = 0,362');await is('chExp','1467,4 / 141,2 / 3,4');await has('chStatus','reddedilmez');await has('chNote','Ford');
      await set('chData','akraba');await is('chChi','5,00 · P = 0,025');await has('chStatus','reddedilir');await is('chF','0,100');
      await set('chData','wahlund');await has('chStatus','Wahlund');await set('chAa','abc');await has('chStatus','tam sayı');await set('chAa','0');await set('chAA','0');await has('chStatus','tek alel');
      await click('chReload');await is('chChi','129,60 · P < 0,001');ok(!(await read('chChi')).includes('= <'));
      await set('xQ','0.1');await is('xFemale','%1,00');await is('xRatio','10,0 kat');await set('aboA','0.6');await set('aboB','0.6');eq(await page.locator('#aboB').inputValue(),'0.4');await has('aboNote','r = 1 − p − q = 0,00');
      await click('hwReset');await is('chChi','0,83 · P = 0,362');await is('xMale','%8,0');await fits();
      await page.locator('#tab-hw').focus();await page.keyboard.press('ArrowRight');eq(await page.locator('#tab-drift').getAttribute('aria-selected'),'true');eq(await page.locator('#panel-hw').isHidden(),true);
      // 02 · Sürüklenme
      const D=K.wfRun({N:50,p0:0.5,T:400,R:200,seed:1,keep:30,bottle:null}),thD=K.hTheory(D.sizes);
      await is('drMeanP',K.fmt(D.P[400],3)+' / 0,500');await is('drHStar',K.fmt(D.H[100]/D.H[0],3)+' / '+K.fmt(thD[100],3));await has('drFix','%'+K.fmt(100*D.fixBy[400],1));await is('drNe','50,0');
      await has('drTfix',' / 138,6 kuşak');await has('drStatus','p₀');eq(await page.locator('#drNb').isDisabled(),true);
      await click('drP3');await has('drStatus','Darboğazda heterozigotluk');await has('drNeN','darboğaz 5 kuşak');eq(await page.locator('#drNb').isDisabled(),false);await has('drTfixN','kapalı biçim yok');
      await click('drP4');await has('drStatus','Kurucu etkisi');await set('drBt0','300');await set('drT','200');await has('drStatus','T’den sonra');
      await click('drP1');await is('drFixP',(()=>{const r=K.wfRun({N:10,p0:0.5,T:100,R:200,seed:1,keep:30});const nf=r.tFix.length,nl=r.tLost.length;return K.fmt(nf/(nf+nl),3)+' / 0,500';})());
      await set('drT','50');await set('drN','500');await has('drFixPN','T’yi artır');
      await page.locator('h1').click();await page.keyboard.press('r');await is('drNe','50,0');await is('drMeanP',K.fmt(D.P[400],3)+' / 0,500');eq(await page.locator('#drBott').isChecked(),false);await fits();
      // 03 · Seçilim
      await click('tab-sel');await is('selMode','Eklemeli');await is('selEq','yok');await is('selTime',K.timeTo(0.05,0.99,[1.1,1.05,1])+' kuşak');await has('selTimeN','yaklaşım');await has('selStatus','logit');
      await click('selRec');await is('selMode','A₁ çekinik');await has('selStatus','görmez');await click('selDom');await is('selMode','A₁ baskın');await has('selStatus','son adım');
      await click('selOver');await is('selMode','Heterozigot üstünlüğü');await is('selEq','0,667 (kararlı)');await click('selUnder');await has('selEq','0,500 (kararsız)');await has('selStatus','p 0’a');
      await click('selSickle');await is('selEq','0,111 (kararlı)');await has('selStatus','karşı örneğidir');await set('selW11','0');await set('selW12','0');await set('selW22','0');await has('selStatus','tanımsız');
      await set('selW11','1');await set('selW12','1');await set('selW22','1');await is('selMode','Nötr');await click('selReset');await is('selMode','Eklemeli');
      {const f=K.fixSim({N:100,s:0.01,R:2000,seed:1});await is('sdFix',K.fmt(f.fixed,0)+' / 2000 = '+K.sig(f.frac,3));}await is('sdU',K.sig(K.kimuraU(100,0.01,1/200),3));await is('sdNs','1,00');await has('sdNsN','ikisi de');
      await click('sdP1');await is('sdU','0,00500');await has('sdStatus','Nötr');await click('sdP2');await is('sdNs','0,50');await has('sdNsN','sürüklenme');await click('sdP3');await has('sdStatus','Zararlı');await click('sdReset');await is('sdNs','1,00');
      await is('msEq','0,00316');await is('msRec','0,00316');await has('msDom','h = 0');await set('msH','0.1');await has('msStatus','μ/(hs)');await is('msDom','0,000100');await set('msH','0.01');await has('msStatus','tam uymuyor');await click('msReset');await is('msEq','0,00316');
      await page.locator('h1').click();await page.keyboard.press('r');await is('selMode','Eklemeli');await fits();
      // 04 · Göç
      await click('tab-gen');await is('isTh',K.fmt(K.fstEq(50,0.01),3));await is('isApx','0,333');await has('isApxN','0,50');{const s=await read('isFst');const v=Number(s.replace(',','.'));near(v,K.fstEq(50,0.01),0.08);}
      await click('isP1');await is('isApx','1,000');await is('isTh','1,000');{const v=Number((await read('isFst')).replace(',','.'));ok(v>0.9&&v<=1,'göç yokken F_ST ≤ 1: '+v);}await has('isStatus','Göç yok');await click('isP2');await has('isApxN','Nm = 1,00');await is('isApx','0,200');await click('isP3');await has('isApxN','Nm = 5,00');await click('isReset');await is('isApx','0,333');
      await is('inRatio','7,19 kat');ok((await page.locator('#inF').textContent()).includes('Anne ya da baba bir kardeşler'));await is('inPer','7,19 / 1,00');await set('inF','0');await has('inStatus','HW');await set('inF','1');await is('inRatio','100,00 kat');await click('inReset');await is('inRatio','7,19 kat');await fits();
      // 05 · İnsan
      await page.locator('#tab-gen').focus();await page.keyboard.press('ArrowRight');eq(await page.locator('#tab-insan').getAttribute('aria-selected'),'true');
      eq(await page.locator('#appTable tbody tr').count(),2);await has('appTable','%85,4');await has('appTable','%93–95');
      {const C=K.makeClines(1),A=K.apportion(C,K.groupsOf(40,3,0));await is('clWithin',K.pct(A.within,1));await is('clGroups',K.pct(A.amongGroups,1));
        const q=K.admixEM(K.sampleIndividual(C,19,1),K.refFreqs(C,K.groupsOf(40,3,0)),3);await has('clStatus',q.map((x,i)=>(i+1)+'. grup '+K.pct(x,0)).join(', '));}
      const w0=await read('clWithin');await set('clK','5');await set('clOff','0.3');await is('clWithin',w0);const s5=await read('clStatus');ok(s5.includes('5. grup'));await set('clD','1');await has('clStatus','1. köyden');await set('clSeed','7');ok((await read('clWithin'))!==''&&true);
      await click('clReset');await is('clWithin',w0);await has('panel-insan','NASEM');await has('panel-insan','sıralamaz');await fits();
      await page.locator('#tab-insan').focus();await page.keyboard.press('Home');eq(await page.locator('#tab-hw').getAttribute('aria-selected'),'true');await page.keyboard.press('End');eq(await page.locator('#tab-insan').getAttribute('aria-selected'),'true');
      // Alıştırma
      eq(await page.locator('#pStep').isDisabled(),false);const a1=await page.evaluate(()=>PopGenLab.makeExercise(1,1).answer);await set('pAns',a1);await click('pCheck');eq(await page.locator('#pFb').getAttribute('data-st'),'dogru');await has('pScore','1 soru doğru, 1 deneme');
      await set('pAns','???');await click('pCheck');eq(await page.locator('#pFb').getAttribute('data-st'),'gecersiz');await click('pHint');eq(await page.locator('#pHintBox').isVisible(),true);
      const nst=await page.evaluate(()=>PopGenLab.makeExercise(1,1).steps.length);for(let i=0;i<nst;i++)await click('pStep');eq(await page.locator('#pSteps li').count(),nst);eq(await page.locator('#pStep').isDisabled(),true);
      await click('pNew');await is('pNoOut','2');eq(await page.locator('#pSteps').isHidden(),true);
      for(const L of['1','2','3']){await set('pLevel',L);const nT=await page.locator('#pType option').count();eq(nT,[0,3,4,5][+L]+1);for(let i=1;i<nT;i++){await page.locator('#pType').selectOption({index:i});const ans=await page.evaluate(()=>{const L=+document.getElementById('pLevel').value,n=+document.getElementById('pNo').value,t=document.getElementById('pType').value;return PopGenLab.makeExercise(L,n,t).answer;});
        await set('pAns',ans);await page.locator('#pAns').press('Enter');eq(await page.locator('#pFb').getAttribute('data-st'),'dogru','arayüz notlaması '+ans);}}
      // Hatalar
      eq(await page.locator('#mistakes .pg-card').count(),8);await has('mk-tasiyici-r','%3,92');await has('mk-df-r','3,84');await has('mk-ne-r','38,8');
      for(const t of['hw','drift','sel','gen','insan']){await click('tab-'+t);await page.waitForTimeout(150);await fits();eq(await page.locator('#panel-'+t).isVisible(),true);
        eq(await page.evaluate(t=>[...document.querySelectorAll('#panel-'+t+' svg.pg-svg')].every(s=>s.childElementCount>2&&s.viewBox.baseVal.width>=300),t),true,t+' svg boş');}
      assert.deepEqual(errors,[]);checks++;await page.close();}
    console.log(`G ${SLUG}: ${checks-before} tarayıcı kontrolü PASS (390 px açık, 1280 px koyu)`);
  }finally{await browser?.close();server.closeAllConnections?.();await new Promise(r=>server.close(r));}
}
