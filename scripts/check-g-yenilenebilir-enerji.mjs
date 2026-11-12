// Yenilenebilir enerji laboratuvarı: çekirdeğin bağımsız denetimi (+ --browser ile arayüz denetimi).
// Başvurular sayfanın yöntemlerini tekrar etmez: Betz için türevin kökü ve kaba ızgara; Weibull momentleri için
// kapalı biçimler (Γ(1/2) = √π, Rayleigh 6/π) ve ayrı bir trapez integrali; kapasite faktörü için başka bir üreteçle
// Monte Carlo; hücre için denklemin artığı, R_s = 0 kapalı biçimi ve kaba gerilim taraması; güneş geometrisi için
// vektör iç çarpımı; pompaj için seviyenin kapalı çözümü h(t); depo sığası için kendi kayıpsız benzetimimiz.
// Kullanım: node scripts/check-g-yenilenebilir-enerji.mjs [--browser]
import fs from 'node:fs';
import vm from 'node:vm';
import assert from 'node:assert/strict';
const SLUG='yenilenebilir-enerji';
const html=fs.readFileSync(new URL(`../${SLUG}.html`,import.meta.url),'utf8');
const source=html.split('/* KERNEL-BEGIN */')[1]?.split('/* KERNEL-END */')[0];
assert(source,'KERNEL sınırları gerekli');
const context={window:{}};vm.createContext(context);vm.runInContext(source,context);
const K=context.window.RenewableLab;assert(K&&Object.isFrozen(K),'RenewableLab dondurulmuş olmalı');
let checks=0;
const ok=(c,msg)=>{assert(c,msg);checks++;};
const eq=(a,b,msg='')=>{assert.equal(a,b,msg+` (${a} ≠ ${b})`);checks++;};
const near=(a,b,tol=1e-9,msg='')=>{assert(Number.isFinite(a)&&Math.abs(a-b)<=tol*Math.max(1,Math.abs(b)),`${msg} ${a} ≠ ${b} (tol ${tol})`);checks++;};
const rel=(a,b,tol,msg='')=>{assert(Number.isFinite(a)&&Math.abs(a/b-1)<=tol,`${msg} ${a} / ${b} − 1 = ${a/b-1} (tol ${tol})`);checks++;};
// sfc32 (sayfanın mulberry32 üretecinden farklı bir algoritma)
let sa=0x9e3779b9,sb=0x243f6a88,sc=0xb7e15162,sdd=1;const lcg=()=>{sa>>>=0;sb>>>=0;sc>>>=0;sdd>>>=0;let t=(sa+sb)|0;sa=sb^(sb>>>9);sb=(sc+(sc<<3))|0;sc=(sc<<21)|(sc>>>11);sdd=(sdd+1)|0;t=(t+sdd)|0;sc=(sc+t)|0;return((t>>>0)+0.5)/4294967296;};for(let i=0;i<20;i++)lcg();

/* ── 1. Rüzgâr ── */
// dC_P/da = 4(1 − a)(1 − 3a) = 0 ⇒ a = 1/3, C_P = 16/27 (Wikipedia: 16/27 ≈ %59.3; iz hızı 1/3)
{const b=K.betz();near(b.a,1/3,1e-7,'Betz a');near(b.cp,16/27,1e-13,'Betz C_P');near(16/27,0.593,1e-3,'%59.3');near(1-2*b.a,1/3,1e-6,'iz hızı v/3');
 let best=0,ab=0;for(let i=0;i<=200000;i++){const a=0.5*i/200000,c=4*a*(1-a)**2;if(c>best){best=c;ab=a;}}near(b.cp,best,1e-10,'kaba ızgara');near(b.a,ab,1e-5);}
for(let i=0;i<=50;i++){const a=0.5*i/50,d=K.disc(a);
 // enerji akısı: ṁ = ρA·v(1 − a); ½ṁ(v² − v_w²) ÷ ½ρAv³
 near(d.cpEnergy,(1-a)*(1-(1-2*a)**2),1e-14);near(d.cpThrust,d.cpEnergy,1e-13,'itki × disk hızı = enerji akısı');near(d.cp,d.cpEnergy,1e-13);
 near(d.areaUp*1,d.vd,1e-14,'süreklilik önde');if(a<0.5)near(d.areaWake*d.vw,d.vd,1e-12,'süreklilik izde');ok(d.ct>=d.cp-1e-15,'C_T ≥ C_P');}
assert.throws(()=>K.disc(0.6));assert.throws(()=>K.disc(-0.01));checks+=2;
near(K.windPower(1.225,100,8,0.512),0.5*1.225*Math.PI*2500*512*0.512,1e-12);rel(K.windPower(1.225,100,16,0.3)/K.windPower(1.225,100,8,0.3),8,1e-14,'küp');
// Γ ve Weibull momentleri
near(K.gamma(0.5),Math.sqrt(Math.PI),1e-13);near(K.gamma(5),24,1e-12);near(K.gamma(1.5),Math.sqrt(Math.PI)/2,1e-13);near(K.gamma(10),362880,1e-11);
near(K.ratioTheory(2),6/Math.PI,1e-12,'Rayleigh ⟨v³⟩/⟨v⟩³ = 6/π');near(K.ratioTheory(1),6,1e-11,'üstel dağılım 3!/1');
const trap=(f,a,b,n)=>{const h=(b-a)/n;let s=(f(a)+f(b))/2;for(let i=1;i<n;i++)s+=f(a+i*h);return s*h;};
for(const k of[1.2,1.5,2,2.7,4])for(const mean of[3,7,12]){const c=K.weibullScale(mean,k),pdf=v=>K.weibullPdf(v,k,c),top=c*12;
 // momentler doğrudan v üzerinde (v^m f(v) ~ v^(k+m−1), sıfırda tekil değil)
 const E=g=>trap(v=>g(v)*pdf(v),0,top,200000);rel(E(v=>v),mean,1e-5,'⟨v⟩');rel(E(v=>v**3)/mean**3,K.ratioTheory(k),1e-5,'⟨v³⟩/⟨v⟩³');near(trap(pdf,0.05*c,top,60000)+K.weibullCdf(0.05*c,k,c),1,1e-4,'normalize');
 near(K.weibullCdf(c,k,c),1-Math.exp(-1),1e-14);near(K.weibullCdf(mean,k,c),trap(pdf,1e-9,mean,20000),2e-5,'CDF');}
{const s=K.windSamples(7,2,200000,3);let m=0,m3=0;for(const v of s){m+=v;m3+=v**3;}m/=s.length;m3/=s.length;rel(m,7,0.006,'örnek ortalaması');rel(m3/m**3,6/Math.PI,0.02,'örnek oranı');
 const a=K.windSamples(7,2,10,9),b=K.windSamples(7,2,10,9);for(let i=0;i<10;i++)eq(a[i],b[i],'tohum tekrarlanır');}
// güç eğrisi ve kapasite faktörü: başka üreteçle ters CDF Monte Carlo ve kendi eğrimiz
const turb={D:100,Pr:2.5e6,cp:0.45,vin:3,vout:25};
{const vr=K.ratedSpeed(turb,1.225);rel(K.windPower(1.225,100,vr,0.45),2.5e6,1e-12,'P(v_r) = P_r');near(vr,10.4917,1e-4);
 eq(K.curveP(turb,1.225,2.99),0);eq(K.curveP(turb,1.225,25),0);eq(K.curveP(turb,1.225,20),2.5e6);
 for(const[mean,k]of[[7,2],[9,1.5],[5,3]]){const st=K.windStats({mean,k,N:2000,seed:1,turb,rho:1.225}),c=K.weibullScale(mean,k);let s=0;const N=300000;
  for(let i=0;i<N;i++){const v=c*Math.pow(-Math.log(lcg()),1/k);s+=v<3||v>=25?0:Math.min(2.5e6,0.5*1.225*Math.PI*2500*v**3*0.45);}
  rel(st.cfTh,s/N/2.5e6,0.012,'CF integrali ≈ Monte Carlo');
  near(st.fBelowTh,1-Math.exp(-((3/c)**k)),1e-12);near(st.fAboveTh,Math.exp(-((25/c)**k)),1e-12);}
 const st=K.windStats({mean:7,k:2,N:10000,seed:7,turb,rho:1.225});near(st.cf,0.380538,1e-5);near(st.cfTh,0.386125,1e-5);near(st.ratio,1.907758,1e-5);
 const big=K.windStats({mean:7,k:2,N:100000,seed:7,turb,rho:1.225});ok(Math.abs(big.cf/big.cfTh-1)<0.01,'büyük örnekte CF farkı < %1');
 ok(!K.windStats({mean:7,k:2,N:1000,seed:1,turb:{...turb,cp:0.2,Pr:6e6,vout:15},rho:1.007}).ratedReachable,'anma gücü ulaşılamaz');}

/* ── 2. Güneş hücresi ── */
const base={G:1000,T:25,Rs:0.005,Rsh:100,n:1};
for(const o of[base,{...base,G:200},{...base,T:65},{...base,Rs:0.03},{...base,Rsh:1},{...base,n:1.6,T:-10},{...base,G:50,Rsh:10**-0.5},{...base,Rs:0.05,G:1200,T:75}]){
 const p=K.cellParams(o);
 for(let i=0;i<=40;i++){const V=0.7*i/40,I=K.current(p,V),u=V+I*p.Rs;near(p.IL-p.I0*Math.expm1(u/p.nVt)-u/p.Rsh-I,0,1e-12,'denklem artığı');}
 const Voc=K.voc(p);near(K.current(p,Voc),0,1e-9,'I(V_oc) = 0');
 // kaba gerilim taraması: P_max ve V_mp
 let bp=0,bv=0;for(let i=0;i<=20000;i++){const V=Voc*i/20000,P=V*K.current(p,V);if(P>bp){bp=P;bv=V;}}const m=K.mpp(p);near(m.P,bp,1e-7,'P_mp tarama');near(m.V,bv,Voc*2e-4,'V_mp tarama');}
// R_s = 0 ⇒ akım açık: I = I_L − I₀(e^{V/nV_T} − 1) − V/R_sh
{const p=K.cellParams({...base,Rs:0});for(const V of[0,0.2,0.45,0.6])near(K.current(p,V),p.IL-p.I0*Math.expm1(V/p.nVt)-V/p.Rsh,1e-12,'R_s = 0');
 // ideal hücrede V_oc = nV_T ln(I_L/I₀ + 1) = 0.620 V her n için (I₀ böyle ayarlanır)
 for(const n of[1,1.3,2]){const q=K.cellParams({...base,n,Rs:0,Rsh:Infinity});near(K.voc(q),0.62,1e-9,'V_oc,ref');}
 // V_T = kT/q: 25 °C'de 25.69 mV
 near(p.Vt,0.0256926,1e-6);}
// ideal hücrenin V_mp'si dP/dV = 0'ı sağlar (kendi sonlu farkımız)
{const q=K.cellParams({...base,Rs:0,Rsh:Infinity}),I=V=>q.IL-q.I0*Math.expm1(V/q.nVt),V=K.vmpIdeal(K.voc(q),q.nVt),h=1e-6;near(((V+h)*I(V+h)-(V-h)*I(V-h))/(2*h),0,1e-6,'dP/dV = 0');}
// sıcaklık: kendi sonlu farkımız (h = 0.05 K) ve kuram
{const r=K.cell(base),hv=(K.voc(K.cellParams({...base,T:25.05}))-K.voc(K.cellParams({...base,T:24.95})))/0.1;near(r.dVdT,hv,1e-7,'dV/dT');rel(r.dVdT,r.dVdTth,2e-3,'dV/dT kuramı');near(r.dVdT*1000,-1.923,2e-3);
 ok(K.voc(K.cellParams({...base,T:65}))<K.voc(K.cellParams({...base,T:25})),'ısınınca V_oc düşer');const v=K.vocVsT(base);rel(v.fit.slope,r.dVdT,0.03,'uydurma eğimi');}
// ışınım: I_sc ∝ G; V_oc farkı ≈ nV_T ln(G/1000)
{const a=K.cell({...base,Rsh:1e4}),b=K.cell({...base,G:200,Rsh:1e4});rel(b.Isc/a.Isc,0.2,1e-4,'I_sc ∝ G');near(b.Voc-a.Voc,a.p.nVt*Math.log(0.2),3e-4,'V_oc logaritmik');}
// FF: FF₀ formülü kendi hesabımızla; ölçülen FF ≤ FF₀; varsayılan değerler
{const r=K.cell(base),v=r.Voc/r.p.nVt;near(r.ff0,(v-Math.log(v+0.72))/(v+1),1e-14);ok(r.FF<r.ff0,'FF < FF₀');near(r.FF,0.80336,1e-4);near(r.Pmp,1.89250,1e-4);near(r.eta,0.189250,1e-5);
 ok(Math.abs(r.FF/r.FFapprox-1)<0.005,'yaklaşım varsayılan durumda %0.5 içinde');ok(K.cell({...base,Rs:0.03}).FF<0.7,'R_s FF\'yi düşürür');ok(K.cell({...base,Rsh:1}).FF<r.FF,'R_sh FF\'yi düşürür');
 ok(K.cell({...base,n:1.5}).FF<r.FF,'n büyüdükçe FF düşer');ok(r.eta*100<K.C.SQ.best,'SQ altında');eq(K.C.SQ.best,33.16);eq(K.C.SQ.gap,1.34);}

/* ── 3. Güneş geometrisi ── */
const D2R=Math.PI/180;
// vektör iç çarpımı: Güneş (doğu, kuzey, yukarı) ve panel normali
const sunV=(phi,dec,w)=>{const P=phi*D2R,D=dec*D2R,O=w*D2R;return[-Math.cos(D)*Math.sin(O),Math.sin(D)*Math.cos(P)-Math.cos(D)*Math.sin(P)*Math.cos(O),Math.sin(P)*Math.sin(D)+Math.cos(P)*Math.cos(D)*Math.cos(O)];};
const nrm=(beta,gam)=>{const b=beta*D2R,g=gam*D2R;return[-Math.sin(b)*Math.sin(g),-Math.sin(b)*Math.cos(g),Math.cos(b)];};
for(let i=0;i<400;i++){const phi=-60+130*lcg(),dec=-23.44+46.88*lcg(),w=-180+360*lcg(),beta=90*lcg(),gam=-180+360*lcg();const s=sunV(phi,dec,w),n=nrm(beta,gam);
 near(K.cosIncidence(phi,dec,w,beta,gam),s[0]*n[0]+s[1]*n[1]+s[2]*n[2],1e-12,'cos θ = s·n');near(Math.hypot(...s),1,1e-12);near(K.cosIncidence(phi,dec,w,0,gam),K.cosZenith(phi,dec,w),1e-12,'β = 0');}
near(K.decl(172),23.44,2e-3,'21 Haziran');near(K.decl(355),-23.44,2e-3,'21 Aralık');ok(Math.abs(K.decl(80))<0.5,'21 Mart');
for(const phi of[-50,0,23,41,60]){const st=K.sunTimes(phi,80);near(st.len,24*Math.acos(-Math.tan(phi*D2R)*Math.tan(K.decl(80)*D2R))/Math.PI,1e-9,'gün uzunluğu (kendi formülümüz)');near(st.len,st.lenTh,1e-9,'gün uzunluğu');}
for(const N of[1,100,172,250,355])near(K.sunTimes(0,N).len,12,1e-9,'ekvator 12 sa');
{const a=K.sunTimes(69.5,355),b=K.sunTimes(69.5,172);eq(a.len,0,'kutup gecesi');eq(b.len,24,'kutup gündüzü');eq(K.dayEnergy({phi:69.5,N:355,beta:30,dev:0,alb:0.2}).panel,0);}
near(K.airMass(0),1/(1+0.50572*96.07995**-1.6364),1e-14);rel(K.airMass(89.9999),37.9,0.01,'ufukta ≈ 37.9 (kaynak)');rel(K.airMass(60),2,0.005,'z = 60° ⇒ ≈ 2');
{const cs=K.clearSky(1/K.airMass(0)>0?Math.cos(0):1);rel(cs.dni,1353*0.7**Math.pow(K.airMass(0),0.678),1e-14);rel(cs.ghi,1.1*cs.dni,1e-14,'Meinel 1.1 çarpanı (z = 0)');eq(K.clearSky(-0.1).dni,0);}
// atmosfer dışı günlük enerji: kendi trapez integralimiz ve kapalı formül
for(const[phi,N]of[[41,172],[41,355],[0,80],[-35,10],[65,172],[70,172]]){const de=K.dayEnergy({phi,N,beta:0,dev:0,alb:0}),f=t=>Math.max(0,1361*(1+0.0345*Math.cos(2*Math.PI*N/365))*K.cosZenith(phi,K.decl(N),15*(t-12)));
 rel(de.extra,trap(f,0,24,200000),2e-6,'H₀ trapez');rel(de.extra,de.extraTh,1e-6,'H₀ kapalı');rel(de.panel,de.horiz,1e-12,'β = 0 panel = yatay');ok(de.track>=de.panel-1e-9,'izleyen ≥ sabit');}
// yıllık örnekleyici, gün gün toplama eşit; en iyi eğim kaba ızgaranın tepesinde
{const o={phi:41,N:1,beta:30,dev:0,alb:0.2};let s=0;for(let N=1;N<=365;N++)s+=K.dayEnergy({...o,N},48).panel;rel(K.annual(o),s,1e-12,'yıllık toplam');
 const r=K.optTilt(o);let bb=0,be=0;for(let b=0;b<=90;b+=0.1){const e=r.f(b);if(e>be){be=e;bb=b;}}near(r.beta,bb,0.06,'en iyi eğim ızgarası');near(r.beta,36.26,0.02);
 rel(K.optTilt({...o,phi:-41}).beta,r.beta,0.02,'güney yarıküre simetrik');ok(K.optTilt({...o,dev:90}).beta<1,'batıya bakan panel yatar');ok(Math.abs(K.optTilt({...o,phi:0}).beta)<0.5,'ekvatorda yatay');}

/* ── 4. Hidroelektrik ve depolama ── */
rel(K.hydroPower(0.9,100,100),0.9*1000*9.80665*1e4,1e-14);eq(K.syncSpeed(8),375);eq(K.syncSpeed(1),3000);
rel(K.NS_BOUNDS[0]/10,Math.sqrt(745.699872/1000)/Math.pow(0.3048,1.25),1e-12,'inç-libre → metrik');near(K.NS_BOUNDS[0],38.13,1e-3);
eq(K.nsType(20),'pelton');eq(K.nsType(200),'francis');eq(K.nsType(1000),'kaplan');eq(K.headTypes(100).join(),'francis,pelton');eq(K.headTypes(1).length,0);eq(K.headTypes(50).join(),'kaplan,francis');
near(K.specificSpeed(375,K.hydroPower(0.9,100,100)/1000,100),375*Math.sqrt(88259.85)/100**1.25,1e-9);
for(const o of[{A:5e5,d:20,H0:300,Pp:250e6,Qt:100,ep:0.88,et:0.9},{A:1e5,d:40,H0:50,Pp:50e6,Qt:20,ep:0.6,et:0.95},{A:2e6,d:5,H0:800,Pp:1e9,Qt:400,ep:0.95,et:0.6}]){const c=K.pumpedCycle(o),rg=1000*9.80665;
 const hExact=t=>-o.H0+Math.sqrt(o.H0**2+2*o.ep*o.Pp*t/(rg*o.A));for(const[t,h]of c.up.filter((_,i)=>i%50===0))near(h,hExact(t),1e-8,'h(t) kapalı');
 rel(c.tFill,(rg*o.A*(o.H0*o.d+o.d**2/2))/(o.ep*o.Pp),1e-6,'dolum süresi');rel(c.rt,o.ep*o.et,1e-6,'gidiş-dönüş');rel(c.tDrain,o.A*o.d/o.Qt,1e-9);rel(c.Eout,o.et*rg*o.A*(o.H0*o.d+o.d**2/2),1e-6);}
near(K.waterPerKgBattery(200,100),720000/980.665,1e-12);near(K.volumePerMWh(300),3.6e9/(1000*9.80665*300),1e-12);
// kendi kayıpsız benzetimimiz: en küçük sığa ikiye bölmeyle
function ownLossless(net){const run=E=>{let s=E,un=0;for(let r=0;r<3;r++){un=0;for(const x of net){const e=x*K.DT_H;if(e>=0)s=Math.min(E,s+e);else{const t=Math.min(s,-e);s-=t;un+=-e-t;}}}return un;};let lo=0,hi=1e5;for(let i=0;i<80;i++){const m=(lo+hi)/2;if(run(m)>1e-6)lo=m;else hi=m;}return hi;}
for(const o of[{Dm:100,solar:200,wind:150,regime:'orta',eta:1,E:300},{Dm:80,solar:300,wind:50,regime:'sakin',eta:1,E:0},{Dm:150,solar:100,wind:400,regime:'ruzgarli',eta:1,E:100}]){const r=K.toyDay(o);
 if(r.lossless!==null){near(r.lossless,ownLossless(r.net),1e-6,'ardışık tepe = kayıpsız benzetim');if(r.required!==null)near(r.required,r.lossless,1e-5,'η = 1 ⇒ iki yol aynı');}
 rel(r.demand,o.Dm*24,1e-12,'talep ortalaması');let se=0;for(let i=0;i<288;i++)se+=o.solar*Math.max(0,Math.sin(Math.PI*((i+0.5)/12-6)/12))/12;rel(r.solarE||1,se||1,1e-12);near(r.surplus-r.deficit,r.solarE+r.windE-r.demand,1e-9,'enerji dengesi');}
{const r=K.toyDay({Dm:100,solar:200,wind:150,regime:'orta',eta:0.8,E:300});near(r.required,596.2,0.05/596);near(r.lossless,533.26,1e-4);near(r.sim.unmet,264.93,1e-3);ok(r.required>r.lossless,'kayıp sığayı büyütür');
 const s=K.simulate(r.net,r.required*1.001,0.8);ok(s.unmet<1e-3,'gereken sığada açık yok');ok(K.simulate(r.net,r.required*0.98,0.8).unmet>0.1,'biraz küçüğünde açık var');
 eq(K.toyDay({Dm:100,solar:0,wind:0,regime:'orta',eta:0.8,E:300}).required,null,'denge yoksa tanımsız');eq(K.toyDay({Dm:50,solar:0,wind:400,regime:'ruzgarli',eta:0.8,E:0}).required,0,'açık yoksa depo gerekmez');}
console.log(`G yenilenebilir enerji: ${checks.toLocaleString('tr-TR')} bağımsız çekirdek kontrolü PASS`);

if(process.argv.includes('--browser')){
 const {createRequire}=await import('node:module');const {createServer}=await import('node:http');const {join,extname}=await import('node:path');const {fileURLToPath}=await import('node:url');const root=fileURLToPath(new URL('../',import.meta.url));
 let chromium;for(const dir of[root,...(process.env.NODE_PATH||'').split(':').filter(Boolean)]){try{({chromium}=createRequire(join(dir,'package.json'))('playwright'));break;}catch(_){}}if(!chromium)({chromium}=await import('playwright'));
 const server=createServer((req,res)=>{const file=join(root,decodeURIComponent(new URL(req.url,'http://localhost').pathname));if(!file.startsWith(root)||!fs.existsSync(file)||fs.statSync(file).isDirectory()){res.writeHead(404).end();return;}res.setHeader('Content-Type',({'.html':'text/html; charset=utf-8','.js':'text/javascript; charset=utf-8','.css':'text/css; charset=utf-8'})[extname(file)]||'application/octet-stream');res.end(fs.readFileSync(file));});await new Promise(r=>server.listen(0,'127.0.0.1',r));let browser;
 const digestOk=fs.existsSync(new URL(`../shared/digest/${SLUG}.js`,import.meta.url));
 try{browser=await chromium.launch();const before=checks;
 for(const[width,theme]of[[390,'light'],[1280,'dark']]){const ctx=await browser.newContext({viewport:{width,height:900},deviceScaleFactor:width===390?2:1,locale:'tr-TR'});await ctx.addInitScript(t=>{localStorage.setItem('acelya-theme',t);localStorage.setItem('acelya-sound-muted','1');},theme);const page=await ctx.newPage();page.setDefaultTimeout(8000);const errors=[];
  page.on('pageerror',e=>errors.push(e.message));page.on('console',m=>{if(m.type()==='error'&&!/Failed to load resource/.test(m.text()))errors.push(m.text());});page.on('response',r=>{if(r.status()>=400)errors.push(r.status()+' '+r.url());});
  await page.goto(`http://127.0.0.1:${server.address().port}/${SLUG}.html`,{waitUntil:'load'});await page.waitForTimeout(500);
  const click=id=>page.locator('#'+id).click(),read=async id=>(await page.locator('#'+id).textContent()).trim(),set=(id,v)=>page.locator('#'+id).evaluate((e,v)=>{e.value=v;e.dispatchEvent(new Event(e.tagName==='SELECT'?'change':'input',{bubbles:true}));},v),is=async(id,t)=>{const got=await read(id);assert.equal(got,t,id);checks++;},has=async(id,t)=>{const got=await read(id);assert(got.includes(t),`${id}: "${got}" içinde "${t}" yok`);checks++;},hasnt=async(id,t)=>{const got=await read(id);assert(!got.includes(t),`${id}: "${got}" içinde "${t}" olmamalı`);checks++;},noflow=async tag=>{eq(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),true,'yatay taşma: '+tag+' @'+width);};
  const warn=async(id,w)=>{eq(await page.locator('#'+id).evaluate(e=>e.classList.contains('is-warn')),w,'uyarı '+id);};
  const painted=async id=>{const n=await page.locator('#'+id).evaluate(c=>{const g=c.getContext('2d'),d=g.getImageData(0,0,c.width,c.height).data;const set=new Set();for(let i=0;i<d.length;i+=4)set.add((d[i]>>4)+','+(d[i+1]>>4)+','+(d[i+2]>>4));return set.size;});ok(n>4,'tuval boş: '+id);};
  eq(await page.evaluate(()=>[...document.querySelectorAll('.app-content input,.app-content select')].filter(e=>!e.labels||!e.labels.length).map(e=>e.id).join(',')),'','etiketsiz denetim');
  eq(await page.evaluate(()=>[...document.querySelectorAll('.app-content canvas')].every(c=>c.getAttribute('role')==='img'&&c.getAttribute('aria-label'))),true);eq(await page.evaluate(()=>Object.isFrozen(RenewableLab)&&!Object.getOwnPropertyDescriptor(window,'RenewableLab').writable),true);
  eq(await page.evaluate(()=>/[̀-ͯ]/.test(document.body.innerText)),false,'birleşik işaret yok');eq(await page.evaluate(()=>document.body.dataset.page),SLUG);
  const noDot=async tag=>{eq(await page.evaluate(()=>{const t=document.querySelector('.app-content').textContent+' '+[...document.querySelectorAll('.app-content output')].map(e=>e.textContent).join(' ');return(t.match(/\d\.\d/g)||[]).length;}),0,'ondalık nokta kalmamalı: '+tag);};await noDot('başlangıç');ok((await page.title()).length<=80,'başlık ≤ 80');
  eq(await page.evaluate(()=>[...document.querySelectorAll('.app-content input[type=range]')].every(e=>{const s=+e.step,v=(+e.value-+e.min)/s;return Math.abs(v-Math.round(v))<1e-6;})),true,'varsayılanlar adım ızgarasında');
  // 01 · Rüzgâr
  await is('wCpNow','0,5120 · 0,5120');await is('wCt','0,640 · 0,800 · 0,600');await is('wBetzA','0,333333 · 0,333333 · 0,00000 %');await is('wBetzCp','0,592593 · 0,592593 · 0,00000 %');
  await is('wPow','1,26 MW · 1,46 MW');await is('wPD','314 W/m²');await is('wCube','8,000 · 8');await is('wMean','6,948 · 7,000 m/s · −0,74 %');await is('wRatio','1,9078 · 1,9099 · −0,11 %');
  await is('wPDm','392 · 205 W/m²');await is('wVr','7,90 m/s · 10,49 m/s');await is('wCF','38,1 % · 38,6 % · −1,45 %');await is('wAEP','8,33 GWh');await is('wHours','13,6 % · 16,3 % · 0,00 %');await is('wHoursTh','13,4 % · 17,1 % · 0,00 %');
  await has('wStatus','0,864');await warn('wStatus',false);await has('wStatus2','10\u202f000 örnekte');await painted('wDisc');await painted('wCp');await painted('wDist');await noflow('wind');
  await click('wPreBetz');await is('wCpNow','0,5926 · 0,5926');await is('wPow','1,46 MW · 1,46 MW');await click('wPreHigh');await warn('wStatus',true);await has('wStatus','Uyarı: a = 0,450');await click('wPreLow');await is('wAOut','0,100');
  await set('wA',0);await is('wCube','— · 8');await has('wStatus','güç sıfır');await set('wA',0.5);await is('wCt','1,000 · 0,500 · 0,000');await set('wV',30);await has('wStatus','v ≤ 15 m/s');await set('wV',1);await set('wD',10);await set('wD',200);await set('wRho','1.007');await noflow('wind edge');
  await click('wReset');await set('wK',1.5);await set('wMeanV',9);await set('wN','100000');await is('wRatio','2,7246 · 2,7185 · +0,22 %');await is('wCF','48,3 % · 48,4 % · −0,18 %');await is('wPDm','1214 · 446 W/m²');
  await set('wD',50);await set('wCpOp',0.2);await set('wPr',6);await is('wVr','9,97 m/s · — (v_r ≥ devreden çıkma)');await has('wStatus2','anma gücü hiç görülmez');await warn('wStatus2',true);await set('wVin',2);await set('wVout',15);await set('wK',4);await set('wMeanV',12);await set('wSeed',99);await noflow('wind dist edge');
  await click('wReset');await is('wCF','38,1 % · 38,6 % · −1,45 %');await is('wCpNow','0,5120 · 0,5120');eq(await page.locator('#wN').inputValue(),'10000');eq(await page.locator('#wRho').inputValue(),'1.225');
  await set('wA',0.3);await page.locator('h1').click();await page.keyboard.press('r');await is('wAOut','0,200');
  // 02 · Hücre
  await click('tab-cell');await page.waitForTimeout(100);await is('cIsc','3,7998 A · 3,8000 A');await is('cVoc','620,0 mV · 620,0 mV · −0,01 %');await is('cMpp','524,0 mV · 3,611 A · 1,893 W');await is('cVmpTh','540,5 · 540,5 mV · 0,000 %');
  await is('cFF','0,8034 · 0,8058 · −0,30 %');await is('cEta','18,93 % · 33,16 % (1,34 eV), Si ≈ 32 %');await is('cTc','−1,923 · −1,923 mV/K · −0,01 %');await is('cLoss','3,49 % (68,3 mW)');await is('cLogG','0,0 · 0,0 mV');
  await warn('cStatus',false);await painted('cIV');await painted('cTemp');await noflow('cell');
  await click('cPreHot');await is('cVoc','542,5 mV · 542,5 mV · −0,01 %');await is('cMpp','444,2 mV · 3,624 A · 1,610 W');await is('cTc','−1,952 · −1,952 mV/K · −0,01 %');
  await click('cPreCloud');await is('cLogG','−41,5 · −41,4 mV');await is('cEta','17,86 % · 33,16 % (1,34 eV), Si ≈ 32 %');await click('cPreRs');await is('cFF','0,6679 · 0,6786 · −1,57 %');await is('cRsOut','30 mΩ');
  await click('cPreRsh');await is('cRshOut','1,00 Ω');await is('cFF','0,6977 · 0,6971 · +0,08 %');await is('cLoss','17,20 % (337,2 mW)');await warn('cStatus',false);await set('cG',50);await set('cRsh',-0.5);await is('cVoc','60,1 mV · 543,0 mV · — (R_sh baskın)');await is('cFF','0,2500 · — (yaklaşım geçersiz)');await has('cStatus','şönt direnç belirliyor');await warn('cStatus',true);await hasnt('cStatus','düşer');
  await set('cT',75);await set('cT',-10);await set('cN',2);await set('cRs',0.05);await set('cG',1200);await set('cRsh',3);await noflow('cell edge');await click('cPreStc');await is('cMpp','524,0 mV · 3,611 A · 1,893 W');
  await set('cN',1.5);await click('cReset');await is('cNOut','1,00');await is('cFF','0,8034 · 0,8058 · −0,30 %');
  // 03 · Güneş
  await click('tab-sun');await page.waitForTimeout(300);await is('gDec','23,44° · 0,0° · 72,4°');eq(await page.locator('#gDec').evaluate(e=>e.previousElementSibling.textContent.startsWith("Güneş'in sapma açısı (deklinasyon) δ")),true,'δ etiketi');eq(await page.evaluate(()=>/Eğim açısı/.test(document.body.innerText)),false,'δ eğimle karışmamalı');await is('gInc','12,4° · 2,3 %');await is('gIrr','936 · 986 · 1015 W/m²');await is('gLen','14,952 sa · 14,952 sa · 0,0000 %');
  await is('gH0','11,5727 · 11,5727 kWh/m² · 0,0000 %');await is('gE','8,02 · 8,58 · 12,14 kWh/m²');await is('gTrack','+51,3 %');await is('gOpt','36,3° · 41,0° · −4,7°');await is('gAnn','2319 · 2331 kWh/m² · 0,5 %');
  await has('gStatus','gün doğumu 04:31');await page.waitForTimeout(800);await painted('gDay');await painted('gSky');await painted('gTilt');await noflow('sun');
  await click('gPreWin');await set('gT',10);await is('gDec','−23,44° · −30,0° · 19,8°');await is('gInc','45,2° · 29,6 %');await is('gE','3,85 · 2,09 · 5,35 kWh/m²');await is('gLen','9,048 sa · 9,048 sa · 0,0000 %');
  await click('gPreArc');await is('gLen','0,000 sa · 0,000 sa · —');await is('gTrack','—');await has('gStatus','Kutup gecesi');await warn('gStatus',true);await click('gPreSum');await has('gStatus','kutup gündüzü');await is('gLen','24,000 sa · 24,000 sa · —');
  await click('gPreEqu');await click('gPreEq');await is('gLen','12,000 sa · 12,000 sa · 0,0000 %');await click('gPreIst');await click('gUseOpt');await is('gBetaOut','36°');
  await set('gDev',90);await has('gStatus2','doğuya ya da batıya');await set('gPhi',-60);await set('gN',1);await set('gT',0);await set('gT',24);await set('gAlb',0.8);await set('gBeta',90);await set('gDev',-90);await noflow('sun edge');
  await click('gReset');await is('gOpt','36,3° · 41,0° · −4,7°');await is('gTOut','12:00');
  // 04 · Hidro
  await click('tab-hydro');await page.waitForTimeout(150);await is('hP','98,07 MW · 88,26 MW');await is('hNsV','375,0 dev/dk · 352');await is('hType','Francis · Francis, Pelton');await is('hJet','44,3 m/s');await warn('hStatus',false);
  await is('hEst','8444,6 · 8444,6 MWh · 0,0000 %');await is('hFill','38,4 sa · 38,4 sa · 0,0000 %');await is('hRT','79,20 % · 79,20 % · 0,0000 %');await is('hDrain','27,8 sa · 282 → 265 MW');await is('hBat','245 kg · 1224 m³');
  await is('hTot','2400 · 1528 · 1260 MWh');await is('hBal','921 · 533 MWh');await is('hReq','596,2 MWh · 533,3 MWh');await is('hUnmet','264,9 · 585,8 MWh');await painted('hNs');await painted('hCyc');await painted('hDay');await noflow('hydro');
  await click('hPreLow');await is('hNsV','125,0 dev/dk · 1478');await is('hType','Kaplan · Kaplan, Francis');await set('hRt',1);await is('hReq','533,3 MWh · 533,3 MWh');
  await click('hPreHigh');await is('hNsV','750,0 dev/dk · 33,3');await is('hType','Pelton · Pelton');await set('hRt',0.8);await set('hReg','ruzgarli');await is('hReq','196,7 MWh · 175,9 MWh');await is('hUnmet','0,0 · 1063,9 MWh');
  await click('hPreMid');await set('hPP',1);await warn('hStatus',true);await set('hH',0);await has('hStatus','karşılaştırılamaz');await set('hQ',-1);await set('hH',3);await set('hQ',3);await set('hPP',48);
  await set('hSol',0);await set('hWind',0);await is('hReq','— (günlük denge yok) · —');await warn('hStatus2',true);await set('hCap',0);await set('hCap',1500);
  for(const id of['hA','hDd','hH0','hPp','hQt','hEb','hEp','hEt','hDm'])await set(id,await page.locator('#'+id).getAttribute('max'));for(const id of['hA','hDd','hH0','hPp','hQt','hEb','hEp','hEt','hDm'])await set(id,await page.locator('#'+id).getAttribute('min'));await noflow('hydro edge');await noDot('uç değerler');
  await click('hReset');await is('hReq','596,2 MWh · 533,3 MWh');await is('hEst','8444,6 · 8444,6 MWh · 0,0000 %');eq(await page.locator('#hReg').inputValue(),'orta');
  // sekme klavyesi
  await page.locator('#tab-hydro').focus();await page.keyboard.press('Home');eq(await page.locator('#tab-wind').getAttribute('aria-selected'),'true');await page.keyboard.press('ArrowRight');eq(await page.locator('#tab-cell').getAttribute('aria-selected'),'true');await page.keyboard.press('End');eq(await page.locator('#tab-hydro').getAttribute('aria-selected'),'true');await page.keyboard.press('ArrowLeft');eq(await page.locator('#tab-sun').getAttribute('aria-selected'),'true');eq(await page.locator('#panel-wind').isHidden(),true);
  ok(digestOk,'defter dosyası olmalı');ok(await page.evaluate(s=>!!window.ACELYA_DIGEST?.[s],SLUG),'defter yüklenmeli');
  assert.deepEqual(errors,[]);checks++;await ctx.close();}
 console.log(`G yenilenebilir enerji: ${checks-before} arayüz kontrolü (390 açık, 1280 koyu) PASS`);
 }finally{await browser?.close();await new Promise(r=>server.close(r));}
}
