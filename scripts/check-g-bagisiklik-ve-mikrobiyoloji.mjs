// G · bagisiklik-ve-mikrobiyoloji: çekirdek, sayfanın formüllerini yinelemeyen referanslarla sınanır.
// Büyüme: Baranyi kapalı biçimi (sınırsız besin), ayrı bir Euler tümlevi, korunum N + (K − N0)s = K, gürültüsüz veriden geri kazanım.
// Klon seçimi: belleksiz modelde ikinci yanıt = birinci, h/2 ikiz tümlev, aşının koruması. Sürü bağışıklığı: ikiye bölmeyle sönme
// olasılığı, dallanma süreci ortalaması 1/(1 − R). MİK: ψ(zMİK) = 0, lojistik kapalı biçim ayrı RK4 ile. Seçilim: kalabalıksız üstel
// kapalı biçim. Ayrıştırıcı ve 1 800 üretilmiş soru, sorunun metninden bağımsız yeniden hesaplanarak. `--browser` arayüzü 390 px açık
// ve 1280 px koyu temada dener.
import fs from 'node:fs';
import assert from 'node:assert/strict';
const SLUG='bagisiklik-ve-mikrobiyoloji';
const html=fs.readFileSync(new URL('../'+SLUG+'.html',import.meta.url),'utf8');
const source=html.split('/* KERNEL-BEGIN */')[1]?.split('/* KERNEL-END */')[0];
assert(source,'Çekirdek sınır işaretleri gerekli');
const K=new Function('"use strict";'+source+';return BagisiklikLab;')();
let checks=0;
const eq=(a,b,msg)=>{assert.equal(a,b,(msg??'')+` · ${a} ≠ ${b}`);checks++;};
const ok=(c,msg)=>{assert(c,msg??'koşul sağlanmadı');checks++;};
const near=(a,b,tol,msg)=>{assert(Math.abs(a-b)<=tol,(msg||'')+` ${a} ≠ ${b} (±${tol})`);checks++;};
const rel=(a,b,r,msg)=>near(a,b,r*Math.abs(b),msg);
const M='−',N='\u202F';
ok(Object.isFrozen(K)&&Object.isFrozen(K.SIZES)&&Object.isFrozen(K.EVIDENCE)&&Object.isFrozen(K.IM)&&Object.isFrozen(K.PD));

/* ── Sayı biçimi ── */
eq(K.fmt(-3.25,2),M+'3,25');eq(K.fmt(12345.6,1),'12'+N+'345,6');eq(K.fmt(9999,0),'9999');eq(K.fmt(-0.001,2),'0,00');
eq(K.fmtSci(4.7e21,1),'4,7 × 10²¹');eq(K.fmtSci(9.96e5,1),'1,0 × 10⁶');eq(K.fmtSci(2e-8,0),'2 × 10⁻⁸');eq(K.pct(0.9444,1),'%94,4');eq(K.fmtN(1414.2,4),'1414');eq(K.fmtN(250000,3),'2,50 × 10⁵');

/* ── 1 · Boyutlar ve Semmelweis (açılan kaynaklarla aynı sayılar) ── */
const S=Object.fromEntries(K.SIZES.map(s=>[s.id,s]));
eq(S.virus.lo,20e-9);eq(S.virus.hi,900e-9);eq(S.prok.lo,0.1e-6);eq(S.prok.hi,5e-6);eq(S.euk.lo,10e-6);eq(S.euk.hi,100e-6);
{const c=K.sizeCompare('prok','virus');rel(c.ratio,Math.sqrt(0.1e-6*5e-6)/Math.sqrt(20e-9*900e-9),1e-12);rel(c.min,0.1e-6/900e-9,1e-12);rel(c.max,5e-6/20e-9,1e-12);rel(c.perMm,1e-3/Math.sqrt(5e-13),1e-12);}
const LOUDON={r1:[71395,897,12.5],r2:[28429,1509,53.0],r3a:[23509,1505,66.6],r3b:[13097,731,55.8],r4a:[20204,1989,90.2],r4b:[17791,691,33.8],r5a:[47938,1712,35.7],r5b:[40770,1248,30.6]};
for(const[id,[b,d,pr]]of Object.entries(LOUDON)){const R=K.semmelweisRow(id);eq(R.births,b);eq(R.deaths,d);eq(R.printed,pr);near(R.computed,d/b*1000,1e-9);eq(R.agrees,Math.abs(Math.round(d/b*10000)/10-pr)<0.15,id);}
eq(['r3a','r4a','r4b'].every(id=>!K.semmelweisRow(id).agrees),true,'tutarsız üç satır');eq(['r1','r2','r3b','r5a','r5b'].every(id=>K.semmelweisRow(id).agrees),true);
near(K.semmelweisRow('r4a').computed,98.4,0.05,'metindeki 98,4 ile aynı');
for(const c of K.KOCH_CASES){for(let k=0;k<=4;k++)eq(K.kochCheck(c.id,k).ok,c.fails.length?c.fails.includes(k):k===0,c.id+k);}
eq(K.GROUPS.find(g=>g.id==='virus').cell.startsWith('hayır'),true);

/* ── 2 · Büyüme ── */
function baranyiLn(t,mu,lag,N0){if(lag===0)return Math.log(N0)+mu*t;const h0=mu*lag;return Math.log(N0)+mu*t+Math.log(Math.exp(-mu*t)+Math.exp(-h0)-Math.exp(-mu*t-h0));}
for(const td of[20,30,45,90])for(const lag of[0,0.5,1.5,3]){const p={...K.growthDefaults(),td,lag,K:1e30,N0:1e3};const sim=K.simulateGrowth(p);const mu=Math.LN2/(td/60);
  for(const t of[0.5,2,5,10,20])near(Math.log(K.sampleAt(sim,t)),baranyiLn(t,mu,lag,1e3),2e-6,`Baranyi td=${td} λ=${lag} t=${t}`);
  // asimptotik gecikme: büyük t'de ln N − (ln N0 + μ(t − λ)) → 0
  if(lag>0)near(Math.log(K.sampleAt(sim,20))-(Math.log(1e3)+mu*(20-lag)),0,1e-3);}
/* Ayrı Euler tümlevi (adım 1e-4 saat) ile varsayılan kültür */
function euler(p,T){const mu=Math.LN2/(p.td/60),Ks=0.02,C=p.K-p.N0;let N=p.N0,s=1,al=p.lag>0?Math.exp(-mu*p.lag):1,t=0,tDep=null;const h=1e-4,out={};
  for(let i=1;i<=Math.round(T/h);i++){const g=mu*s*(1+Ks)/(Ks+s)*al;const dead=tDep!==null&&t>=tDep+p.Ts;const dN=(g-(dead?p.kd:0))*N,ds=-g*N/C,da=mu*al*(1-al);const s0=s;N+=h*dN;s=Math.max(0,s+h*ds);al+=h*da;t=i*h;if(tDep===null&&s0>=0.01&&s<0.01)tDep=t;if(i%5000===0)out[Math.round(t*10)/10]=N;}return{out,tDep};}
{const p=K.growthDefaults();const sim=K.simulateGrowth(p);const E=euler(p,24);near(sim.tDep,E.tDep,2e-3,'besin bitiş zamanı');
  for(const t of[1,3,6,9,11,12,14,16,18,20,22,24])rel(K.sampleAt(sim,t),E.out[t],0.01,'Euler t='+t);
  for(let i=0;i<sim.t.length;i++)if(sim.tOn===null||sim.t[i]<=sim.tOn)rel(sim.N[i]+(p.K-p.N0)*sim.s[i],p.K,1e-7,'korunum');
  ok(sim.N.at(-1)<sim.N[Math.round(sim.tOn/sim.dt)]*Math.exp(-p.kd*(24-sim.tOn))*1.001,'ölüm evresi kd hızında');}
/* Gürültüsüz veride üstel pencere gerçeği verir; gürültülü veride 20 seri */
{const p={...K.growthDefaults(),sigma:0};const d=K.growthData(p);const f=K.fitWindow(d,4.5,9,p.N0);rel(f.td,30,0.01);near(f.lag,1.5,0.06);near(f.fit.r2,1,1e-4);}
let worst=0,worstLag=0,sumTd=0;for(let s=1;s<=20;s++){const p={...K.growthDefaults(),seed:s};const d=K.growthData(p);const f=K.fitWindow(d,3,8,p.N0);ok(f.ok);sumTd+=f.td;worst=Math.max(worst,Math.abs(f.td-30)/30);worstLag=Math.max(worstLag,Math.abs(f.lag-1.5));const pl=K.plateau(d);ok(Math.abs(Math.log10(pl.N/1e9))<0.12,'durağan düzey s='+s);}
ok(worst<0.09,'20 seride ikilenme süresi hatası < %9 (standart hata ≈ %3,2): '+worst);rel(sumTd/20,30,0.03,'20 serinin ortalaması');ok(worstLag<0.35,'gecikme hatası '+worstLag);
{const p=K.growthDefaults();const d=K.growthData(p);const w=K.steepestWindow(d);ok(w.t1>=2&&w.t2<=11.5,'en dik bölge üstel evrede');const f=K.fitWindow(d,14,20,p.N0);eq(f.ok,false,'durağan/ölüm penceresi tanımsız');ok(/büyüme yok/.test(f.why));eq(K.fitWindow(d,5,5.5,p.N0).ok,false);}
{const sim=K.simulateGrowth(K.growthDefaults());eq(K.phaseAt(sim,0.5),'gecikme');eq(K.phaseAt(sim,5),'üstel');eq(K.phaseAt(sim,13),'durağan');eq(K.phaseAt(sim,20),'ölüm');}
assert.throws(()=>K.simulateGrowth({...K.growthDefaults(),K:100,N0:1000}));checks++;

/* ── 3 · Klon seçimi ── */
const st=(p,o)=>{const s=K.simulateImmune(p,o);return[s,K.exposureStats(s,0),s.ev.length>1?K.exposureStats(s,1):null];};
for(let seed=1;seed<=10;seed++){const aff=K.repertoire(seed);const[sim,a,b]=st({...K.imDefaults(),seed});eq(sim.responders,aff.filter(x=>x>=0.8).length);
  if(!sim.responders){ok(a.lag===null);continue;}
  ok(a.lag>6&&a.lag<16,'birincil saptama '+a.lag);ok(b.lag<a.lag/4,'ikincil daha hızlı '+seed);ok(b.peak>3*a.peak,'ikincil tepe daha yüksek '+seed);ok(b.maxA*50<a.maxA,'ikinci karşılaşmada mikrop yükü düşük '+seed);ok(b.tPeak<a.tPeak,'tepeye daha erken');
  const[,a0,b0]=st({...K.imDefaults(),seed,mem:0});near(b0.lag,a0.lag,0.15,'belleksiz: ikincil = birincil');rel(b0.peak,a0.peak,0.03);rel(b0.maxA,a0.maxA,0.03);
  ok(sim.Ab.every(v=>v>=0)&&sim.A.every(v=>v>=0));}
{const[s1,a1]=st(K.imDefaults());const[s2,a2]=st(K.imDefaults(),{dt:0.005});rel(a1.peak,a2.peak,0.005,'h/2 ikizi: tepe');near(a1.lag,a2.lag,0.02);}
{const[,,vacc]=st({...K.imDefaults(),first:'asi'});const[,naive]=st({...K.imDefaults(),second:'yok'});ok(vacc.maxA<naive.maxA/100,'aşı korur: '+vacc.maxA+' / '+naive.maxA);}
{const[s,a,b]=st({...K.imDefaults(),second:'yok'});eq(s.ev.length,1);eq(b,null);eq(a.kind,'enf');}
{let none=null;for(let seed=1;seed<=400&&none===null;seed++)if(K.repertoire(seed).every(x=>x<0.8))none=seed;if(none!==null){const[s,a]=st({...K.imDefaults(),seed:none});eq(s.responders,0);eq(a.lag,null);}checks++;}

/* ── 4 · Sürü bağışıklığı ── */
for(const R0 of[1.5,2,5,12,18])near(K.herdThreshold(R0),(R0-1)/R0,1e-12);eq(K.herdThreshold(0.8),0);
near(K.herdThreshold(18),0.9444,1e-4,'kızamık 1 − 1/18 ≈ %94,4 (DSÖ: yaklaşık %95)');near(K.herdThreshold(5),0.8,1e-12,'çocuk felci: %80 eşik ⇔ R₀ = 5');
{const c=K.coverageNeeded(18,0.95);eq(c.reach,true);near(c.vc,(17/18)/0.95,1e-12);eq(K.coverageNeeded(18,0.9).reach,false);const d=K.coverageNeeded(5,0.95);near(d.vc,0.8/0.95,1e-12);eq(d.reach,true);}
near(K.rEff(18,0.9,0.95),18*(1-0.855),1e-12);
function qBisect(R){let lo=0,hi=1-1e-9;for(let i=0;i<200;i++){const m=(lo+hi)/2;(Math.exp(R*(m-1))-m>0?lo=m:hi=m);}return(lo+hi)/2;}
for(const R of[1.2,1.5,2,3,5])near(K.extinctionProb(R),qBisect(R),1e-6,'sönme olasılığı R='+R);eq(K.extinctionProb(0.9),1);
for(const R of[0.3,0.5,0.8]){const B=K.branching(R,4000,11);rel(B.meanSmall,1/(1-R),0.08,'ortalama zincir R='+R);eq(B.big,0);}
for(const R of[1.5,2,3]){const B=K.branching(R,1500,5);near(B.bigFrac,1-qBisect(R),0.05,'büyük salgın payı R='+R);}
{let s=0;const r=K.rng(3);for(let i=0;i<20000;i++)s+=K.poisson(r,2.6);near(s/20000,2.6,0.05,'Poisson ortalaması');}
const EV={t1:[0.99,0.92,1.06],t2:[0.84,0.70,1.01],t3:[1.00,0.77,1.31],t4:[0.90,0.83,0.98],h1:[0.93,0.85,1.02]};
for(const e of K.EVIDENCE){assert.deepEqual([e.est,e.lo,e.hi],EV[e.id]);checks++;ok(e.lo<=e.est&&e.est<=e.hi);ok(e.hi>=1?!/üstünde/.test(K.ciReading(e)):/altında/.test(K.ciReading(e)));}
ok(/1’i içeriyor/.test(K.ciReading(K.EVIDENCE[0])));ok(/1’in üstünde/.test(K.ciReading({lo:1.3,hi:1.7})));

/* ── 5 · MİK ve seçilim ── */
for(const z of[0.3,1,4,16])for(const pm of[0.6,1])near(K.psi(z,z,pm),0,1e-12,'ψ(zMİK) = 0');
near(K.psi(0,1),1,1e-12);near(K.psi(1e6,1),-2,1e-6);{let prev=Infinity;for(let k=-20;k<=30;k++){const v=K.psi(2**(k/4),1);ok(v<prev,'ψ azalan');prev=v;}}
function rk(C,z,T){const a=K.psi(C,z),b=1/1e9;let n=5e5;const f=x=>(a-b*x)*x,h=0.001;for(let i=0;i<T/h;i++){const k1=f(n),k2=f(n+h/2*k1),k3=f(n+h/2*k2),k4=f(n+h*k3);n+=h/6*(k1+2*k2+2*k3+k4);}return n;}
for(const C of[0,0.25,0.9,1,1.1,4])rel(K.tubeN(C,1,18),rk(C,1,18),1e-5,'tüp lojistiği C='+C);
for(const s of K.STRAINS)for(let rep=1;rep<=20;rep++)for(const T of[2,8,12,18,24]){const A=K.micAssay(s.id,rep,T);ok(A.consistent,'tüpler tutarlı');
  ok(A.tubes.filter(t=>t.C>=A.z).every(t=>!t.turbid),'eşiğin üstü berrak');if(A.mic!=null){ok(A.tubes.filter(t=>t.C<A.mic).every(t=>t.turbid));const up=K.TUBES.find(c=>c>=A.z);ok(up===undefined||A.mic<=up,'okunan MİK eşiğin üstündeki ilk tüpü aşmaz');}eq(A.ctrlTurbid,T>=4);}
{const A=K.micAssay('A',1,18);eq(A.mic,1);near(A.z,0.95,0.01);}
{const p={...K.selDefaults(),C:2};const s=K.simulateSelection(p,{K:1e30,floor:false,dt:0.01});const gS=K.psi(2,1,1),gR=K.psi(2,16,0.9);
  rel(s.S1,p.N0*(1-p.f0)*Math.exp(gS*48),1e-6,'kalabalıksız S');rel(s.R1,p.N0*p.f0*Math.exp(gR*48),1e-6,'kalabalıksız R');const r=p.f0/(1-p.f0)*Math.exp((gR-gS)*48);near(s.theoryFrac,r/(1+r),1e-12);near(s.frac,r/(1+r),1e-6);}
for(const[C,z]of[[0.25,'alt'],[1,'pencere'],[8,'pencere'],[16,'ust'],[64,'ust']])eq(K.selZone(C,1,16),z);
{const d=K.selDefaults();const w=K.simulateSelection({...d,C:4});ok(w.frac>0.999&&w.extS!==null,'pencerede dirençliler kazanır');const hi=K.simulateSelection({...d,C:32});eq(hi.frac,null,'iki MİK üstünde ikisi de tükenir');
  const lo=K.simulateSelection({...d,C:0.0625});ok(lo.frac<d.f0,'ilaçsıza yakın, maliyet dirençliyi geriletir');const lo0=K.simulateSelection({...d,C:0.0625,cost:0});ok(lo0.frac>d.f0,'maliyetsizken MİK’in 1/16’sında bile dirençli payı artar');
  const sub=K.simulateSelection({...d,C:0.5});ok(sub.frac>sub.theoryFrac,'MİK altında kalabalık seçilimi büyütür');}

/* ── Ayrıştırıcı ── */
const pv=s=>K.parseNum(s).v;
for(const[s,v]of[['30',30],['2,5',2.5],['2.5',2.5],['−3',-3],['3/4',0.75],['1 000 000',1e6],['1.000.000',1e6],['1'+N+'280',1280],['0.693',0.693],['8 × 10^6',8e6],['8·10⁶',8e6],['8x10^6',8e6],['8*10^6',8e6],['8e6',8e6],['8 milyon',8e6],['2 milyar',2e9],['10^9',1e9],['10⁹',1e9],['1,5 × 10⁻³',1.5e-3],['%94,4',94.4],['94,4 %',94.4],['yüzde 80',80],['30 dk',30],['1,5 saat',1.5],['4 µg/mL',4],['0,25 ug/ml',0.25],['x = 12',12],['td = 30 dakika',30],['1,280 × 10⁵',128000]])near(pv(s),v,1e-9*Math.max(1,Math.abs(v)),s);
eq(K.parseNum('1,5 saat').mins,90);eq(K.parseNum('2 gün').mins,2880);eq(K.parseNum('%5').pct,true);eq(K.parseNum('5').pct,false);
for(const s of['','abc','2,,5','1.2.3,4,5','3 elma','1/0','e5','10 ^ ','%'])assert.throws(()=>K.parseNum(s),K.ParseError,s),checks++;
for(const[s,c]of[['Bakteri','bakteri'],['VİRÜS','virus'],['virus','virus'],['arkea','arke'],['Maya','mantar'],['protista','protist'],['  mantar. ','mantar']])eq(K.parseClass(s),c,s);
for(const s of['','hücre','bitki'])assert.throws(()=>K.parseClass(s),K.ParseError),checks++;

/* ── Alıştırma üreteci: 150 × 11 tür; hedef sorunun metninden bağımsız yeniden hesaplanır ── */
const numsOf=p=>[...p.replace(/(\d)\s(?=\d{3}\b)/g,'$1').matchAll(/(\d+(?:,\d+)?)(?: × 10([⁻⁰¹²³⁴⁵⁶⁷⁸⁹]+))?/g)].map(m=>Number(m[1].replace(',','.'))*(m[2]?10**Number([...m[2]].map(c=>'⁰¹²³⁴⁵⁶⁷⁸⁹'.indexOf(c)<0?'-':'⁰¹²³⁴⁵⁶⁷⁸⁹'.indexOf(c)).join('')):1));
let generated=0;const seen=new Set();
for(let L=1;L<=3;L++)for(const[type]of K.TYPES[L-1])for(let n=1;n<=150;n++){const ex=K.makeExercise(L,n,type);generated++;seen.add(ex.prompt);eq(ex.type,type);ok(ex.steps.length>=2&&ex.hint.length>15);ok(!/-\d/.test(ex.prompt+ex.answer+ex.steps.join(' ').replace(/e\^|10\^|2\^|\^/g,'')),'tire yerine eksi: '+ex.prompt);
  const g=K.grade(ex,ex.answer);eq(g.st,'dogru',`${type} ${n}: “${ex.answer}” → ${g.msg}`);const p=ex.prompt,x=numsOf(p);
  if(type==='sinif'){const it=K.CLASS_ITEMS.find(([d])=>p.endsWith(d));eq(ex.target,it[1]);}
  else if(type==='katlanma'){const[N0,td,t]=x;rel(ex.target,N0*2**(t/td),1e-12,p);}
  else if(type==='ikilenme'){const[N0,N1,t]=[x[0],x[2],x[1]];rel(ex.target,t/Math.log2(N1/N0),1e-6,p);}
  else if(type==='esik'){near(ex.target,100*(1-1/x[0]),1e-9,p);}
  else if(type==='kapsama'){const R0=x[0],E=x[1]/100,v=(1-1/R0)/E;eq(!!ex.impossible,v>1,p);if(v<=1)near(ex.target,100*v,1e-9);}
  else if(type==='reff'){const[R0,v,E]=[x[0],x[1]/100,x[2]/100];near(ex.target,R0*(1-v*E),1e-9,p);}
  else if(type==='sure'){const[N0,td,Nt]=x;rel(ex.target,td*Math.log(Nt/N0)/Math.LN2,1e-9,p);}
  else if(type==='yanit'){const Q=x[0],g=x[1];rel(ex.target,Math.log(Q)/g,1e-9,p);}
  else if(type==='direnc'){const[f0,dg,t]=x;const r=f0/(1-f0)*Math.exp(dg*t);near(ex.target,100*r/(1+r),1e-9,p);}
  else if(type==='mik'){const rows=[...p.matchAll(/(\d+(?:,\d+)?) → (bulanık|berrak)/g)].map(m=>[Number(m[1].replace(',','.')),m[2]]);eq(rows.length,10);const first=rows.find(r=>r[1]==='berrak');eq(ex.target,first[0]);ok(rows.every((r,i)=>i===0||!(r[1]==='bulanık'&&rows[i-1][1]==='berrak')));}
  else if(type==='boyut'){ok(ex.target>1);}
  else assert.fail('denetlenmeyen tür '+type);}
ok(seen.size>generated*0.3,'sorular yeterince çeşitli: '+seen.size+'/'+generated);
for(let L=1;L<=3;L++)for(let n=1;n<=30;n++)eq(K.makeExercise(L,n).prompt,K.makeExercise(L,n).prompt);
/* Notlama: tipik yanlış ve yarım cevaplar */
const G=(e,s)=>K.grade(e,s).st;
{const e={kind:'pct',target:94.444,tol:0.6,type:'esik'};eq(G(e,'%94,4'),'dogru');eq(G(e,'0,944'),'dogru');eq(G(e,'94'),'dogru');eq(G(e,'%5,6'),'yanlis');ok(/1\/R₀/.test(K.grade(e,'5,6').msg));eq(G(e,'abc'),'gecersiz');eq(G(e,''),'gecersiz');}
{const e={kind:'num',unit:'dk',target:30,tol:0.02,type:'ikilenme'};eq(G(e,'30'),'dogru');eq(G(e,'0,5 saat'),'dogru');eq(G(e,'30,4 dk'),'dogru');eq(G(e,'31,5'),'yaklasik');eq(G(e,'11,25'),'yanlis');eq(G(e,'%30'),'gecersiz');}
{const e={kind:'num',target:8e6,tol:0.02};eq(G(e,'8 milyon'),'dogru');eq(G(e,'8e6'),'dogru');eq(G(e,'8 × 10^5'),'yanlis');}
{const e={kind:'class',target:'virus'};eq(G(e,'virüs'),'dogru');eq(G(e,'bakteri'),'yanlis');eq(G(e,'mikrop'),'gecersiz');}
{const e={kind:'pct',impossible:true,target:null,tol:0.6};eq(G(e,'ulaşılamaz'),'dogru');eq(G(e,'%99'),'yanlis');}
{const e={kind:'num',unit:'gün',target:4.6,tol:0.03};eq(G(e,'4,6 gün'),'dogru');eq(G(e,'4,6'),'dogru');}

/* ── Hatalar ── */
eq(K.MISTAKES.length,8);eq(K.MISTAKES.filter(m=>m.kind==='kavram').length,5);
for(const R0 of[2,5,18])for(const E of[0.7,0.9,1])for(const n of[2,3,5]){const X=K.mistakeNumbers(R0,E,n);ok(X.esik.right.endsWith(K.pct(1-1/R0,1)));ok(X.esik.wrong.endsWith(K.pct(1/R0,1)));ok(X.ikilenme.right.endsWith(K.fmt(90/n,2)+' dk'));ok(X.ikilenme.wrong.endsWith(K.fmt(90/2**n,2)+' dk'));
  const vc=(1-1/R0)/E;ok(vc<=1?X.kapsama.right.endsWith(K.pct(vc,1)):/ulaşılamaz/.test(X.kapsama.right));}


/* Doğrulayıcı eklemeleri: Taylor 2014 satır etiketi, bellek azalmaz (90 = 150. gün), birim uyumu, noktasız I */
ok(K.EVIDENCE.find(e=>e.id==='t4').n.includes('duruma göre gruplanmış'));ok(!K.EVIDENCE.some(e=>/Aşılanma ve otizm \(birleşik\)/.test(e.what)));
{const a=K.simulateImmune({...K.imDefaults(),t2:90}),b=K.simulateImmune({...K.imDefaults(),t2:150});const sa=K.exposureStats(a,1),sb=K.exposureStats(b,1);near(sa.lag,sb.lag,1e-3);rel(sa.peak,sb.peak,1e-4);rel(sa.maxA,sb.maxA,1e-3);}
for(const w of['BAKTERI','PROTIST','VIRÜS','VIRUS','Arke'])ok(['bakteri','protist','virus','arke'].includes(K.parseClass(w)),w);
{const find=(L,t)=>{for(let n=1;;n++){const e=K.makeExercise(L,n,t);if(e.target!=null)return e;}};
  eq(K.grade(find(2,'ikilenme'),'45 µg/mL').st,'gecersiz');eq(K.grade(find(1,'boyut'),'40 nm').st,'gecersiz');eq(K.grade(find(2,'mik'),'2 saat').st,'gecersiz');eq(K.grade(find(1,'katlanma'),'5 dk').st,'gecersiz');
  const e=find(2,'ikilenme');eq(K.grade(e,K.fmt(e.target/60,4)+' saat').st,'dogru');const m=find(2,'mik');eq(K.grade(m,K.fmt(m.target,3,true)+' mg/L').st,'dogru');}
console.log(`G ${SLUG}: ${checks.toLocaleString('tr-TR')} bağımsız çekirdek kontrolü PASS (${generated} üretilmiş soru)`);
if(process.argv.includes('--browser')){
  const {chromium}=await import('playwright');const {createServer}=await import('node:http');const {join,extname}=await import('node:path');const {fileURLToPath}=await import('node:url');const root=fileURLToPath(new URL('../',import.meta.url));
  const server=createServer((req,res)=>{const file=join(root,decodeURIComponent(new URL(req.url,'http://localhost').pathname));if(!fs.existsSync(file)||fs.statSync(file).isDirectory()){res.writeHead(404).end();return;}res.setHeader('Content-Type',({'.html':'text/html; charset=utf-8','.js':'text/javascript; charset=utf-8','.css':'text/css; charset=utf-8'})[extname(file)]||'application/octet-stream');res.end(fs.readFileSync(file));});await new Promise(r=>server.listen(0,'127.0.0.1',r));let browser;const before=checks;
  try{browser=await chromium.launch();
    for(const[theme,width]of[['light',390],['dark',1280]]){
      const page=await browser.newPage({viewport:{width,height:900},deviceScaleFactor:width===390?2:1});await page.addInitScript(t=>{localStorage.setItem('acelya-theme',t);localStorage.setItem('acelya-sound-muted','1');},theme);page.setDefaultTimeout(8000);
      const errors=[];page.on('pageerror',e=>errors.push(e.message));
      page.on('response',r=>{if(r.status()>=400&&!new RegExp('shared/digest/'+SLUG+'\\.js$').test(r.url()))errors.push(r.status()+' '+r.url());});
      page.on('console',m=>{if(m.type()==='error'&&!/Failed to load resource/.test(m.text()))errors.push(m.text());});
      await page.goto(`http://127.0.0.1:${server.address().port}/${SLUG}.html`);await page.waitForTimeout(300);
      const click=id=>page.locator('#'+id).click(),read=async id=>(await page.locator('#'+id).textContent()).replace(/\u202F/g,' '),set=(id,v)=>page.locator('#'+id).evaluate((e,v)=>{if(e.type==='checkbox')e.checked=v;else e.value=v;e.dispatchEvent(new Event(e.tagName==='SELECT'||e.type==='checkbox'?'change':'input',{bubbles:true}));},v),
        is=async(id,t)=>{eq(await read(id),t,id);},has=async(id,t)=>{const s=await read(id);ok(s.includes(t),`${id}: “${s}” içinde “${t}” yok`);},fits=async()=>eq(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),true,'yatay taşma');
      eq(await page.evaluate(()=>[...document.querySelectorAll('.app-content input,.app-content select')].filter(e=>!document.querySelector('label[for="'+e.id+'"]')).map(e=>e.id).join()),'','etiketsiz denetim');
      eq(await page.evaluate(()=>[...document.querySelectorAll('.app-content svg.bm-svg')].every(c=>c.getAttribute('role')==='img'&&!!c.getAttribute('aria-label'))),true,'svg erişilebilirliği');
      eq(await page.evaluate(()=>Object.isFrozen(BagisiklikLab)&&!Object.getOwnPropertyDescriptor(window,'BagisiklikLab').writable),true);
      eq(await page.evaluate(()=>/[̀-ͯ]/.test(document.body.innerText)),false,'birleşik aksan işareti yok');
      eq(await page.evaluate(()=>document.querySelectorAll('input[type=number]').length),0);eq(await page.evaluate(()=>document.title.length<=80),true);
      await has('yardim','112');await has('yardim','tanı koymaz');await has('yardim','yapay veri');
      eq(await page.locator('.bm-next a').count(),4);for(const h of['salgin-modelleri-sir','dogal-secilim','homeostaz-ve-geri-besleme','gen-ifadesi-ve-molekuler-biyoloji'])eq(await page.locator(`.bm-next a[href="${h}.html"]`).count(),1,h);
      eq(await page.locator('a[href="farmakokinetik.html"],a[href="epidemiyoloji-ve-klinik-arastirma.html"]').count()>=2,true,'yolun sonraki basamaklarına bağlantı');eq(await page.evaluate(()=>document.body.textContent.split('(hazırlanıyor)').length-1),0,'hazırlanıyor notu kalmadı');
      await has('panel-direnc','hekiminize danışın');
      // 01 · Mikrop dünyası
      await is('szRatio','5,27 kat');await is('szPerMm','1414');await set('szA','euk');await set('szB','prok');await is('szRatio','44,7 kat');await click('szP1');await is('szRatio','5,27 kat');
      eq(await page.locator('#groupTable tbody tr').count(),5);
      await is('smComp','binde 98,4');await is('smPrinted','binde 90,2');await has('smStatus','98,4');await is('smRatioA','2,53 kat (hesaplanan)');await is('smRatioB','1,17 kat (hesaplanan)');
      await set('smRow','r5a');await is('smComp','binde 35,7');await has('smStatus','tutarlı');await set('smRow','r4b');await is('smComp','binde 38,8');await has('smStatus','farklı');
      eq(await page.locator('#kochFb').isHidden(),true);await click('kP1');eq(await page.locator('#kochFb').getAttribute('data-st'),'dogru');await click('kP2');eq(await page.locator('#kochFb').getAttribute('data-st'),'yanlis');
      await set('kochCase','sarbon');eq(await page.locator('#kochFb').isHidden(),true);await click('kP0');eq(await page.locator('#kochFb').getAttribute('data-st'),'dogru');await set('kochCase','hiv');await click('kP3');eq(await page.locator('#kochFb').getAttribute('data-st'),'dogru');
      await click('mikropReset');eq(await page.locator('#kochCase').inputValue(),'hpylori');await is('smComp','binde 98,4');await fits();
      await page.locator('#tab-mikrop').focus();await page.keyboard.press('ArrowRight');eq(await page.locator('#tab-buyume').getAttribute('aria-selected'),'true');eq(await page.locator('#panel-mikrop').isHidden(),true);
      // 02 · Büyüme
      await is('grTd','29,6 dk');await is('grTdT','30,0 dk');await is('grLag','1,54 / 1,50 saat');await has('grStatus','üstel evrede');await is('grDep','11,52. saat');await is('grInv','1,0000 × 10⁹');await is('grGen','10,1 kuşak');await is('grTdInOut','30 dk');await is('grLagInOut','1,50 saat');
      await set('grSig','0');await has('grStatus','gecikme evresinin sonuna');await has('grStatus','Ölçüm gürültüsü sıfır');ok(!(await read('grStatus')).includes('gürültüsünden'),'σ = 0 iken gürültü suçlanmaz');await set('grSig','0.1');await has('grStatus','ölçüm gürültüsünden');await set('grW1','14');await set('grW2','20');await is('grTd','—');await has('grStatus','tanımsız');await set('grW1','9');await set('grW2','14');await has('grStatus','evresinden');
      await click('grAuto');const w1=Number(await page.locator('#grW1').inputValue());ok(w1>=2&&w1<=7,'en dik bölge '+w1);await has('grStatus','üstel evrede');
      await set('grW2','2');await set('grW1','5');await has('grStatus','Pencere sonu');
      await set('grSig','0');await click('grAuto');const td0=Number((await read('grTd')).replace(' dk','').replace(',','.'));near(td0,30,0.3,'gürültüsüz');
      await click('grP1');await is('grTdT','20,0 dk');await has('grStatus','üstel evrede');await click('grP3');await has('grMax','1,00 × 10⁷');await set('grK','7');await set('grN0','6');await has('grStatus','10 katı');await is('grTd','—');
      await page.locator('h1').click();await page.keyboard.press('r');await is('grTd','29,6 dk');await fits();
      // 03 · Bağışıklık
      await click('tab-bagisiklik');await is('imLag','1.: 11,0 gün · 2.: 0,8 gün');await is('imPk','1.: 2183 · 2.: 23 073');await is('imTp','1.: 20,6 gün · 2.: 8,4 gün');await is('imAg','1.: 7860 · 2.: 28,5');await has('imStatus','4 klon seçildi');await is('clTitle','Klonlar: 20. gün');
      await click('imP3');await is('imLag','1.: 11,0 gün · 2.: 11,0 gün');await has('imStatus','Belleğe kalan pay sıfır');await click('imP2');await has('imAg','1.: çoğalmaz');await has('imStatus','Aşılanmış modelde');
      await set('imSecond','yok');eq(await page.locator('#imT2').isDisabled(),true);await has('imStatus','Tek karşılaşma');await set('imDay','100');await is('clTitle','Klonlar: 100. gün');
      await has('panel-bagisiklik','bellek hücreleri hiç ölmez');await click('bagisiklikReset');await is('imLag','1.: 11,0 gün · 2.: 0,8 gün');eq(await page.locator('#imT2').isDisabled(),false);await fits();
      // 04 · Aşı ve kanıt
      await page.locator('#tab-bagisiklik').focus();await page.keyboard.press('ArrowRight');eq(await page.locator('#tab-asi').getAttribute('aria-selected'),'true');
      await is('hPc','%94,4');await is('hVc','%99,4');await is('hReff','2,61');await has('hBig','%90,6');await has('hStatus','≥ 1');
      await click('hP2');await is('hPc','%80,0');await is('hVc','%84,2');await is('hReff','1,20');await set('hV','90');await is('hReff','0,73');await has('hMean','/ 3,64');await has('hStatus','< 1');await set('hR0','1');await is('hPc','%0');
      await set('hR0','18');await set('hE','90');await is('hVc','ulaşılamaz');await click('asiReset');await is('hVc','%99,4');
      await is('fpEst','OR = 0,99');await is('fpCI','0,92 – 1,06');await set('fpRow','h1');await is('fpEst','HR = 0,93');await has('fpN','657 461');await set('fpRow','t4');await has('fpRead','altında');await has('fpN','duruma göre gruplanmış');await is('fpEst','OR = 0,90');
      await set('fpHyp',true);eq(await page.locator('#fpRow option').count(),6);await set('fpRow','hyp');await has('fpRead','yapay');await has('fpRead','1’in üstünde');await set('fpHyp',false);eq(await page.locator('#fpRow option').count(),5);await is('fpEst','OR = 0,99');await fits();
      // 05 · Direnç
      await click('tab-direnc');await is('micMeas','1 µg/mL');await is('micZ','0,95 µg/mL');await has('micCtrlN','geçerli');
      await set('micStrain','C');ok(/µg\/mL$/.test(await read('micMeas')));await set('micT','2');await has('micStatus','okunamaz');await has('micCtrlN','geçersiz');await set('micT','8');{const A=await page.evaluate(()=>BagisiklikLab.micAssay('C',1,8));await has('micStatus',A.mic<A.z?'altında':'bir önceki tüple');}{let hit=0;for(let r=1;r<=20;r++){const A=K.micAssay('B',r,8);if(A.mic!=null&&A.mic<A.z)hit++;}ok(hit>0,'kısa beklemede MİK eşiğin altında okunabilir');}await set('micT','18');
      for(let r=1;r<=6;r++){await set('micRep',String(r));const m=await read('micMeas'),z=Number((await read('micZ')).split(' ')[0].replace(',','.'));const mv=Number(m.replace(/[^\d,]/g,'').replace(',','.'));ok(mv<=[...K.TUBES].find(c=>c>=z),'MİK okuması '+m+' z='+z);}
      await is('selZone','Seçilim penceresi');await has('selSR','0 / 9,1 × 10⁸');await has('selStatus','zaten var olan mutantı seçer');
      await click('selP3');await is('selFrac','iki suş da tükendi');await has('selStatus','ikisi de tükendi');await click('selP1');await is('selZone','Duyarlıların MİK’inin altında');await is('selCOut','0,5 µg/mL');await has('selStatus','MİK’in altında bile');
      await set('selC','-2');await is('selFrac','%0,025');await has('selStatus','25,3 kat');await has('selStatus','Kalabalıksız kuram tersini');ok(!(await read('selStatus')).includes('geride kal'),'durum çıktıyla çelişmemeli');await set('selCost','0');await has('selStatus','çıktı');ok(!(await read('selStatus')).includes('maliyet'),'maliyet sıfırken maliyet suçlanmaz');await set('selC','-4');await set('selCost','0.1');await has('selStatus','düştü');await click('direncReset');await is('selZone','Seçilim penceresi');await is('micMeas','1 µg/mL');await fits();
      await page.locator('#tab-direnc').focus();await page.keyboard.press('Home');eq(await page.locator('#tab-mikrop').getAttribute('aria-selected'),'true');await page.keyboard.press('End');eq(await page.locator('#tab-direnc').getAttribute('aria-selected'),'true');
      // Alıştırma
      eq(await page.locator('#pStep').isDisabled(),true);const a1=await page.evaluate(()=>BagisiklikLab.makeExercise(1,1).answer);await set('pAns',a1);await click('pCheck');eq(await page.locator('#pFb').getAttribute('data-st'),'dogru');await has('pScore','1 soru doğru, 1 deneme');
      await set('pAns','???');await click('pCheck');eq(await page.locator('#pFb').getAttribute('data-st'),'gecersiz');await click('pHint');eq(await page.locator('#pHintBox').isVisible(),true);
      const nst=await page.evaluate(()=>BagisiklikLab.makeExercise(1,1).steps.length);for(let i=0;i<nst;i++)await click('pStep');eq(await page.locator('#pSteps li').count(),nst);eq(await page.locator('#pStep').isDisabled(),true);
      await click('pNew');await is('pNoOut','2');eq(await page.locator('#pSteps').isHidden(),true);
      for(const L of['1','2','3']){await set('pLevel',L);const nT=await page.locator('#pType option').count();eq(nT,[0,3,4,4][+L]+1);for(let i=1;i<nT;i++){await page.locator('#pType').selectOption({index:i});const ans=await page.evaluate(()=>{const L=+document.getElementById('pLevel').value,n=+document.getElementById('pNo').value,t=document.getElementById('pType').value;return BagisiklikLab.makeExercise(L,n,t).answer;});
        await set('pAns',ans);await page.locator('#pAns').press('Enter');eq(await page.locator('#pFb').getAttribute('data-st'),'dogru','arayüz notlaması '+ans);}}
      // Hatalar
      eq(await page.locator('#mistakes .bm-card').count(),8);await has('mk-esik-w','%5,6');await has('mk-esik-r','%94,4');await has('mk-kapsama-r','ulaşılamaz');await has('mk-ikilenme-r','30,00 dk');
      await set('mR0','5');await set('mE','0.95');await set('mN','4');await has('mk-esik-r','%80,0');await has('mk-kapsama-r','%84,2');await has('mk-ikilenme-r','22,50 dk');await has('mk-ikilenme-w','5,63 dk');
      for(const t of['mikrop','buyume','bagisiklik','asi','direnc']){await click('tab-'+t);await fits();eq(await page.locator('#panel-'+t).isVisible(),true);
        eq(await page.evaluate(t=>[...document.querySelectorAll('#panel-'+t+' svg.bm-svg')].every(s=>s.childElementCount>3&&s.viewBox.baseVal.width>=300),t),true,t+' svg boş');}
      assert.deepEqual(errors,[]);checks++;await page.close();}
    console.log(`G ${SLUG}: ${checks-before} tarayıcı kontrolü PASS (390 px açık, 1280 px koyu)`);
  }finally{await browser?.close();await new Promise(r=>server.close(r));}
}
