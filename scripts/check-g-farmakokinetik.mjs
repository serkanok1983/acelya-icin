// G · farmakokinetik.html — kalıcı denetim.
// Çekirdek (KERNEL-BEGIN … KERNEL-END) node'da yüklenir ve sayfanın formüllerini KULLANMAYAN başvurularla
// karşılaştırılır: (1) başka biçimde yazılmış kapalı formüller (2^(−t/t½), Bateman farkı, döngüyle süperpozisyon,
// Lambert W ile Michaelis–Menten çözümü), (2) bu dosyada yazılmış BAĞIMSIZ bir sayısal ODE çözücü (Richardson
// ekstrapolasyonlu Heun yöntemi; sayfa RK4 kullanır), (3) Simpson integrali, altın oran araması, ikiye bölme,
// (4) elle yazılmış çözümleyici tablosu ve alıştırma parametrelerinden bağımsız çözüm (500 tohum × 3 seviye).
// `--browser`: Playwright ile gerçek arayüz (390 px açık tema ve 1280 px koyu tema).
import fs from 'node:fs';
import vm from 'node:vm';
import assert from 'node:assert/strict';
import { canvasInk, assertCanvasDrawn } from './lib/canvas-check.mjs';
const html=fs.readFileSync(new URL('../farmakokinetik.html',import.meta.url),'utf8');
const source=html.split('/* KERNEL-BEGIN */')[1]?.split('/* KERNEL-END */')[0];
assert(source,'farmakokinetik.html: KERNEL sınırları gerekli');
const context={window:{}};vm.createContext(context);vm.runInContext(source,context);
const K=context.window.Farmako;assert(K,'Farmako yok');assert(Object.isFrozen(K),'çekirdek donmuş olmalı');
let checks=0;
const near=(a,e,tol=1e-10,msg='')=>{assert(Number.isFinite(a)&&Math.abs(a-e)<=tol*Math.max(1,Math.abs(e)),`${msg} ${a} ≠ ${e} (tol ${tol})`);checks++;};
const rel=(a,e,tol,msg='')=>{assert(Number.isFinite(a)&&Math.abs(a-e)<=tol*Math.abs(e),`${msg} ${a} ≠ ${e} (göreli ${tol})`);checks++;};
const ok=(c,msg='koşul sağlanmadı')=>{assert(c,msg);checks++;};
const eq=(a,b,msg)=>{assert.equal(a,b,(msg||'eşitlik')+`: ${a} ≠ ${b}`);checks++;};
const NB=' ';
const L2=Math.log(2);

// ── Bağımsız araçlar ──
// Heun (RK2) adımı + Richardson: iki yarım adım ile bir tam adımın birleşimi, yerel hata O(h⁴)
function heun(f,t,y,h){const a=f(t,y),yp=y.map((v,i)=>v+h*a[i]),b=f(t+h,yp);return y.map((v,i)=>v+h/2*(a[i]+b[i]));}
function odeSolve(f,y0,T,h,jumps){ // jumps: [{t, add:[...]}] — t, h'nin katı
 let y=y0.slice(),t=0;const n=Math.round(T/h),J=new Map((jumps||[]).map(j=>[Math.round(j.t/h),j.add]));const out=[];
 for(let i=0;i<=n;i++){if(J.has(i))y=y.map((v,j)=>v+J.get(i)[j]);out.push(y.slice());if(i===n)break;
  const full=heun(f,t,y,h),half=heun(f,t+h/2,heun(f,t,y,h/2),h/2);y=half.map((v,j)=>v+(v-full[j])/3);t+=h;}
 return out;
}
function simpson(f,a,b,n=4000){const h=(b-a)/n;let s=f(a)+f(b);for(let i=1;i<n;i++)s+=(i%2?4:2)*f(a+i*h);return s*h/3;}
function golden(f,a,b){const g=(Math.sqrt(5)-1)/2;let c=b-g*(b-a),d=a+g*(b-a);for(let i=0;i<200;i++){if(f(c)>f(d))b=d;else a=c;c=b-g*(b-a);d=a+g*(b-a);}return(a+b)/2;}
const bisect=(f,lo,hi)=>{let flo=f(lo);for(let i=0;i<300;i++){const m=(lo+hi)/2,fm=f(m);if((fm>0)===(flo>0)){lo=m;flo=fm;}else hi=m;}return(lo+hi)/2;};
// Lambert W (ana dal, x ≥ 0) Halley yinelemesiyle
function lambertW(x){let w=x<1?x:Math.log(x)-Math.log(Math.log(x)+1e-300);if(x>=1&&w<0.5)w=0.5;for(let i=0;i<100;i++){const e=Math.exp(w),f=w*e-x,dw=f/(e*(w+1)-(w+2)*f/(2*w+2));w-=dw;if(Math.abs(dw)<1e-15*Math.max(1,Math.abs(w)))break;}return w;}

// 1) Sayı biçimi
for(const[x,sd,s]of[[12345.678,4,'12'+NB+'346'],[1234,4,'1234'],[0.5,4,'0,5'],[-2.5,4,'−2,5'],[0,4,'0'],[1e12,4,'10¹²'],[1.2e-5,4,'1,2·10⁻⁵'],[NaN,4,'—'],[72.13475,4,'72,13'],[6.9314718,4,'6,931']])eq(K.fmt(x,sd),s,'fmt '+x);
for(const[x,dp,s]of[[-0.0001,2,'0,00'],[12345.6,1,'12'+NB+'345,6'],[0.93750,4,'0,9375']])eq(K.fix(x,dp),s,'fix '+x);

// 2) Tek bölme IV: kapalı biçim 2^(−t/t½), bağımsız ODE, Simpson AUC
for(const th of[0.5,2,5,13.5,24])for(const[D,V]of[[500,50],[50,5],[1000,200]]){
 const k=K.kOf(th),T=K.ivTheory(D,V,k);near(T.C0,D/V,1e-15);near(T.th,th,1e-14);near(T.CL,L2/th*V,1e-14);
 near(T.AUC,simpson(t=>D/V*Math.pow(2,-t/th),0,60*th,6000),1e-9,'AUC Simpson');
 const ref=odeSolve((t,y)=>[-k*y[0]],[D/V],4*th,th/200);
 for(const j of[0,50,200,537,800])if(j<ref.length){near(K.ivConc(D,V,k,j*th/200),D/V*Math.pow(2,-j/200),1e-13);near(ref[j][0],D/V*Math.pow(2,-j/200),1e-7,'ODE IV');}
 const S=K.simIV(D,V,k,4*th);for(const t of[0.1,th,2.5*th])near(S.C[K.idx(S,t)],D/V*Math.pow(2,-K.idx(S,t)*S.h/th),1e-8,'sayfa RK4 IV');
 near(K.crossDown(S,D/V/2),th,1e-7,'ölçülen t½');near(K.crossDown(S,D/V/8),3*th,1e-7,'ölçülen 3 t½');
}
eq(K.ivConc(500,50,0.1,-1),0);

// 3) Ağızdan: Bateman farkı, bağımsız ODE (bağırsak + kan), altın oran araması ile tepe, Simpson AUC
for(const[F,D,V,ka,th]of[[0.8,500,50,1,5],[1,100,20,3,2],[0.5,800,100,0.1,5],[0.3,250,40,0.5,12],[0.9,500,50,0.2,3]]){
 const k=L2/th,bat=t=>F*D*ka/(V*(ka-k))*(Math.exp(-k*t)-Math.exp(-ka*t));
 for(const t of[0.1,1,3.3,10,40])near(K.oralConc(F,D,V,ka,k,t),bat(t),1e-11,'Bateman');
 const h=0.002,ref=odeSolve((t,y)=>[-ka*y[0],ka*y[0]/V-k*y[1]],[F*D,0],40,h);
 for(const t of[1,3.3,10,39.99])near(ref[Math.round(t/h)][1],bat(Math.round(t/h)*h),1e-7,'ODE ağız');
 const T=K.oralTheory(F,D,V,ka,k),tm=golden(bat,0,100);near(T.tmax,tm,1e-7,'tmax altın oran');near(T.Cmax,bat(tm),1e-12,'Cmax');
 near(T.AUC,simpson(bat,0,Math.max(60/k,60/ka),20000),1e-7,'ağız AUC Simpson');
 const S=K.simOral(F,D,V,ka,k,Math.min(144,Math.max(24,6*Math.max(th,L2/ka)))),pk=K.peak(S);near(pk.t,T.tmax,1e-4,'ölçülen tmax');near(pk.C,T.Cmax,1e-6,'ölçülen Cmax');
}
{const k=0.3;near(K.oralConc(1,100,10,k,k,2),100/10*k*2*Math.exp(-k*2),1e-14,'ka = k limiti');near(K.oralConc(1,100,10,k*(1+1e-10),k,2),K.oralConc(1,100,10,k,k,2),1e-8,'ka ≈ k sürekli');near(K.oralTmax(k,k),1/k,1e-15);eq(K.oralConc(1,1,1,1,0.5,0),0);}

// 4) Tekrarlı doz: döngüyle süperpozisyon, ODE + sıçramalar, geometrik seri, uzun benzetimle kararlı durum
const superpose=(D,V,k,tau,n,DL,t)=>{let c=0;for(let j=0;j<n;j++){const tj=j*tau;if(t>=tj-1e-12)c+=(j===0&&DL?DL:D)/V*Math.exp(-k*(t-tj));}return c;};
for(const[D,V,th,tau,n,DL]of[[300,50,5,6,8,0],[300,50,5,6,8,531.2],[1000,200,24,4,20,0],[50,5,0.5,12,3,0],[500,40,8,8,12,900]]){
 const k=L2/th;for(const t of[0,0.5,tau-0.01,tau,tau*2.5,(n-1)*tau,n*tau+3])near(K.multiConc(D,V,k,tau,n,DL,t),superpose(D,V,k,tau,n,DL,t),1e-11,`çoklu doz t=${t}`);
 const h=0.01,jumps=[];for(let j=0;j<n;j++)jumps.push({t:j*tau,add:[(j===0&&DL?DL:D)/V]});const ref=odeSolve((t,y)=>[-k*y[0]],[0],n*tau+tau,h,jumps);
 for(const j of[1,0.5,n-1].map(x=>Math.round(x*tau/h)))near(ref[j][0],superpose(D,V,k,tau,n,DL,j*h),1e-7,'ODE çoklu');
 const S=K.simMulti({D,V,k,tau,n,DL,T:n*tau+tau});near(S.C[K.idx(S,(n-1)*tau)],superpose(D,V,k,tau,n,DL,(n-1)*tau),1e-9,'sayfa RK4 son tepe');near(S.pre[K.idx(S,(n-1)*tau)],superpose(D,V,k,tau,n,DL,(n-1)*tau-1e-9),1e-8,'doz öncesi dip');
}
for(const[th,tau]of[[5,6],[2,24],[24,1],[8,8]]){
 const k=L2/th,ss=K.steady(300,50,k,tau);let sum=0;for(let j=0;j<5000;j++)sum+=Math.exp(-k*tau*j);near(ss.R,sum,1e-10,'R geometrik seri');
 near(ss.Cmax,superpose(300,50,k,tau,4000,0,3999*tau),1e-9,'Css,max uzun benzetim');near(ss.Cmin,superpose(300,50,k,tau,4000,0,4000*tau),1e-9,'Css,min');
 near(ss.Cavg,simpson(t=>superpose(300,50,k,tau,4000,0,3999*tau+t),0,tau,2000)/tau,1e-8,'Css,ort integral');
 for(const n of[1,2,5,9])near(K.accN(k,tau,n),superpose(1,1,k,tau,n,0,(n-1)*tau),1e-12,'birikim n');
}
near(K.steady(300,50,L2/5,6).R,1.7707742684229333,1e-12);near(K.steady(300,50,L2/5,6).Cmax,10.6246456105376,1e-12);

// 5) İnfüzyon: ODE ile kararlı düzey ve 1 − 2^(−m)
for(const[R0,Ti,V,th,DL]of[[50,48,50,5,0],[100,10,20,8,0],[20,96,100,2,0],[50,48,50,5,360.67]]){
 const k=L2/th,h=0.01,rate=(t)=>t<Ti-1e-9?R0/V:0;
 // Heun: oran adım başına sabit (adım başlangıcı) — yalnız sabit oranlı parçalarda karşılaştırılır
 const ref=odeSolve((t,y)=>[R0/V-k*y[0]],[DL/V],Ti,h);
 for(const m of[1,2,4,7])if(m*th<=Ti)near(ref[Math.round(m*th/h)][0],K.infConc(R0,Ti,V,k,DL,m*th),1e-7,'ODE infüzyon');
 if(!DL)for(const m of[1,2,3,4,5])if(m*th<=Ti)near(K.infConc(R0,Ti,V,k,0,m*th)/(R0/(k*V)),1-Math.pow(2,-m),1e-13,'1 − 2^−m');
 const after=K.infConc(R0,Ti,V,k,DL,Ti+th);near(after,K.infConc(R0,Ti,V,k,DL,Ti)/2,1e-12,'infüzyon sonrası yarılanma');
 const S=K.simInf({R0,Tinf:Ti,V,k,DL,T:Ti+12});near(S.C[K.idx(S,Ti)],K.infConc(R0,Ti,V,k,DL,Ti),1e-9,'sayfa RK4 infüzyon');near(S.C[K.idx(S,Ti+6)],K.infConc(R0,Ti,V,k,DL,Ti+6),1e-8,'sayfa RK4 infüzyon sonrası');
 if(!DL&&Ti>4*th){near(K.crossUp(S,0.5*R0/(k*V)),th,1e-6,'ölçülen %50');near(K.crossUp(S,0.9*R0/(k*V)),th*Math.log2(10),1e-6,'ölçülen %90');}
}
near(K.infConc(50,48,50,L2/5,50/(L2/5),3),50/(L2/5*50),1e-13,'yükleme dozuyla düz');

// 6) İki bölme: ODE, özdeğer bağıntıları, Simpson AUC
for(const[D,V1,k10,k12,k21]of[[500,20,0.3,0.6,0.2],[100,5,2,0.05,0.05],[1000,100,0.05,2,2],[500,20,0.5,0.5,0.5]]){
 const T=K.twoComp(D,V1,k10,k12,k21);near(T.alpha+T.beta,k10+k12+k21,1e-13);near(T.alpha*T.beta,k10*k21,1e-13);near(T.A+T.B,D/V1,1e-13);ok(T.alpha>T.beta&&T.beta>0);
 const h=0.002,ref=odeSolve((t,y)=>[-(k10+k12)*y[0]+k21*y[1],k12*y[0]-k21*y[1]],[D,0],30,h);
 for(const t of[0,0.1,1,7,30])near(ref[Math.round(t/h)][0]/V1,K.twoConc(T,Math.round(t/h)*h),1e-7,'ODE iki bölme');
 near(T.AUC,simpson(t=>K.twoConc(T,t),0,40/T.beta,40000),1e-7,'AUC iki bölme');
 const S=K.sim2C({D,V1,k10,k12,k21,T:30});near(S.C[2000],K.twoConc(T,20),1e-9,'sayfa RK4 iki bölme');
}
{const T=K.twoComp(500,20,0.3,0.6,0.2);near(T.alpha,1.042442890089805,1e-12);near(T.beta,0.05755710991019477,1e-12);near(L2/T.beta,12.0428,1e-4);}

// 7) Doymuş atılım: Lambert W kapalı biçimi, ODE, değişken yarılanma, AUC oranı
for(const[C0,Vm,Km]of[[20,2,4],[2,10,50],[60,0.5,0.5],[10,1,10]]){
 const W=t=>Km*lambertW(C0/Km*Math.exp((C0-Vm*t)/Km));
 const h=0.01,ref=odeSolve((t,y)=>[-Vm*y[0]/(Km+y[0])],[C0],20,h);
 for(const t of[0.5,2,7.77,15,20]){near(K.mmConc(C0,Vm,Km,t),W(t),1e-10,'MM Lambert W');near(ref[Math.round(t/h)][0],W(t),1e-7,'MM ODE');}
 for(const C of[C0/2,C0/10])near(K.mmTime(C0,C,Vm,Km),bisect(t=>W(t)-C,0,1e4),1e-8,'mmTime');
 near(K.mmHalving(C0,Vm,Km),bisect(t=>W(t)-C0/2,0,1e4),1e-8,'ilk yarılanma');
 near(K.mmAUC(C0,Vm,Km),simpson(W,0,bisect(t=>W(t)-C0*1e-12,0,1e5),40000),1e-6,'MM AUC');
 const W2=t=>Km*lambertW(2*C0/Km*Math.exp((2*C0-Vm*t)/Km));near(K.mmAUCRatio(C0,Km),simpson(W2,0,bisect(t=>W2(t)-C0*1e-12,0,1e5),40000)/K.mmAUC(C0,Vm,Km),1e-6,'AUC oranı');ok(K.mmAUCRatio(C0,Km)>2,'oran > 2');
 const S=K.simMM({C0,Vm,Km,T:Math.ceil(1.2*K.mmHalving(C0,Vm,Km))+1});near(K.crossDown(S,C0/2),K.mmHalving(C0,Vm,Km),1e-6,'ölçülen ilk yarılanma');
}
{const a=K.mmHalving(20,2,4),b=K.mmHalving(0.01,2,4);near(a,6.386294361119891,1e-12);ok(a>4*b,'yarılanma derişime bağlı');near(K.mmAUCRatio(20,4),48/14,1e-14);near(K.mmAUC(20,2,4),140,1e-14);}

// 8) Böbrek fikir modeli
near(K.renalCL(10,0.7,1),10,1e-15);near(K.renalCL(10,0.7,0.5),6.5,1e-15);near(K.renalCL(10,0.7,0),3,1e-15);eq(K.FE,0.7);eq(K.THER.lo,4);eq(K.THER.hi,12);

// 9) Ölçüm yardımcıları
{const S={t:Float64Array.from([0,1,2]),C:Float64Array.from([8,4,2]),h:1};near(K.crossDown(S,2*Math.SQRT2),1.5,1e-14,'log ara değerleme');near(K.trapz(S,0,2),9,1e-15);eq(K.crossDown(S,1),null);
 const P={t:Float64Array.from([0,1,2,3]),C:Float64Array.from([0,3,4,3]),h:1};const p=K.peak(P);near(p.t,2,1e-15);near(p.C,4,1e-15);
 const Q={t:Float64Array.from([0,1,2,3]),C:Float64Array.from([1,2,3,4]),h:1};near(K.crossUp(Q,2.5),1.5,1e-15);}
{const F=K.lineFit([1,2,3,4],[3,5,7,9]);near(F.m,2);near(F.c,1);near(F.r2,1);}

// 10) Veriden kestirim
for(let s=1;s<=60;s++){
 const D0=K.fitData('tek',0,s),R0=K.regress(D0.t,D0.C,0,500),T=D0.truth;near(R0.k,T.k,1e-10,'gürültüsüz k');near(R0.V,T.V,1e-9,'gürültüsüz V');near(R0.CL,T.CL,1e-9);ok(T.th>=3&&T.th<=9&&T.V>=30&&T.V<=90);
 const D1=K.fitData('tek',10,s),R1=K.regress(D1.t,D1.C,0,500);ok(Math.abs(R1.k/T.k-1)<0.2,`tohum ${s}: k ${R1.k} / ${T.k}`);ok(Math.abs(R1.V/T.V-1)<0.25,`tohum ${s}: V`);
 near(K.guessRMS(D1.t,D1.C,0,500,R1.k,R1.V),R1.rms,1e-12,'regresyon RMS');ok(K.guessRMS(D1.t,D1.C,0,500,R1.k*1.1,R1.V)>R1.rms&&K.guessRMS(D1.t,D1.C,0,500,R1.k,R1.V*0.9)>R1.rms,'regresyon en küçük RMS');
 // gürültü düzeyi yalnız ölçekler: ln(C/C_gerçek) gürültüyle doğru orantılı
 const D2=K.fitData('tek',20,s);D1.C.forEach((c,i)=>near(Math.log(D2.C[i]/D0.C[i]),2*Math.log(c/D0.C[i]),1e-9,'gürültü ölçekleme'));
 const E0=K.fitData('iki',0,s),Tt=E0.truth,late=K.regress(E0.t,E0.C,10,500),early=K.regress(E0.t,E0.C,0,500);
 ok(Math.abs(late.k/Tt.beta-1)<0.03,`tohum ${s}: uç evre k ≈ β (${late.k} / ${Tt.beta})`);ok(early.k>1.3*Tt.beta,`tohum ${s}: erken noktalar k'yi büyütür`);
 near(Tt.A*Math.exp(-Tt.alpha*1)+Tt.B*Math.exp(-Tt.beta*1),E0.C[2],1e-12);
}
eq(K.regress([1],[2],0,500),null,'tek nokta');eq(JSON.stringify(K.fitData('tek',10,7)),JSON.stringify(K.fitData('tek',10,7)),'tekrarlanabilir');
{const T=K.fitTruth('tek',1);eq(T.th,4.9);eq(T.V,64);}

// 11) Çözümleyici (elle yazılmış tablo)
const ACC=[['2,5','time',2.5],['2.5','time',2.5],['2,5 saat','time',2.5],['2,5 h','time',2.5],['2,5sa','time',2.5],['150 dk','time',2.5],['150 min','time',2.5],['9000 sn','time',2.5],['1 gün','time',24],['2,5 SAAT','time',2.5],
 ['4 mg/L','conc',4],['4 mg/l','conc',4],['4 µg/mL','conc',4],['4 μg/ml','conc',4],['0,004 g/L','conc',4],['4000 ng/mL','conc',4],['0,4 mg/dL','conc',4],
 ['50 L','vol',50],['50000 mL','vol',50],['50 000 mL','vol',50],['6 L/sa','clear',6],['100 mL/dk','clear',6],['6 l/h','clear',6],
 ['0,5 g','mass',500],['500 mg','mass',500],['1 000','mass',1000],['50 mg/sa','rate',50],['50 mg/h','rate',50],['72,13 mg·sa/L','auc',72.13],['72,13 mg*h/L','auc',72.13],['72,13 mg h/L','auc',72.13],['72,13 mg.saat/L','auc',72.13],
 ['0,1 /h','rconst',0.1],['0,1 1/saat','rconst',0.1],['0,1 h⁻¹','rconst',0.1],['0,1 h-1','rconst',0.1],['0,001 1/dk','rconst',0.06],['%87,5','pct',87.5],['87,5 %','pct',87.5],['87,5','pct',87.5],['1/8','ratio',0.125],['1,77','ratio',1.77],['1,77 kat','ratio',1.77],['−3','ratio',-3],['- 3','ratio',-3],['.5','ratio',0.5]];
for(const[s,kind,v]of ACC){const r=K.parseQty(s,kind);ok(r.ok,`kabul edilmeli: ${s} (${kind}) ${r.error||''}`);near(r.value,v,1e-12,s);}
const REJ=[['','time',/sayı yaz/],[null,'time',/sayı yaz/],['   ','time',/sayı yaz/],['ln2/4','time',/Önce sayıyı/],['abc','time',/Önce sayıyı/],['2^3','ratio',/İfade/],['2*3','ratio',/İfade/],['3 s','time',/belirsiz/],['4 mg/L','time',/süre istiyor/],['2 saat','conc',/derişim istiyor/],['0,1 1/saat','time',/hız sabiti birimi/],
 ['5 furlong','time',/tanınmadı/],['1.000,5','mass',/Tek bir ondalık/],['2 5','time',/Tek bir sayı/],['2 saat 30 dk','time',/Tek bir sayı/],['3/0','ratio',/Payda sıfır/],['--3','ratio',/tanınmadı|Önce/]];
for(const[s,kind,re]of REJ){const r=K.parseQty(s,kind);eq(r.ok,false,'reddedilmeli: '+s);ok(re.test(r.error),`${s}: ${r.error}`);}
{const ex={kind:'time',answer:2.5};eq(K.grade(ex,'2,5').status,'correct');eq(K.grade(ex,'150 dk').status,'correct');eq(K.grade(ex,'2,52').status,'correct');eq(K.grade(ex,'2,58').status,'close');eq(K.grade(ex,'3').status,'wrong');eq(K.grade(ex,'150').status,'close');ok(/Dakika/.test(K.grade(ex,'150').msg));eq(K.grade(ex,'2,5 mg').status,'invalid');}
{const ex={kind:'pct',answer:87.5};eq(K.grade(ex,'%87,5').status,'correct');eq(K.grade(ex,'0,875').status,'close');ok(/yüzde/.test(K.grade(ex,'0,875').msg));}
// doğrulayıcı: noktalı binlik ipucu, boş birim parantezi, Türkçe ek hataları
{const ex={kind:'mass',answer:1000};const g=K.grade(ex,'1.000');eq(g.status,'close');ok(/boşluk/.test(g.msg));eq(K.grade(ex,'1 000').status,'correct');eq(K.grade({kind:'mass',answer:2.5},'2.500').status,'correct');
 const r=K.parseQty('2,467 1/sa','ratio');eq(r.ok,false);ok(!/\(\)/.test(r.error),'boş birim parantezi: '+r.error);}
for(let s=1;s<=500;s++){const e=K.genExercise(3,s);if(e.type==='renal'){ok(!/%'si|'ine/.test(e.html),'renal ek: '+e.html);ok(/düzeyine/.test(e.html));}}

// 12) Alıştırmalar: parametrelerden BAĞIMSIZ çözüm (ODE, ikiye bölme, altın oran, seri), metinde parametreler görünür
const ode1=(k,C0,t)=>{const n=Math.max(200,Math.ceil(t/0.01));return odeSolve((x,y)=>[-k*y[0]],[C0],t,t/n)[n][0];};
const solveIndep={
 halfToK:p=>bisect(k=>Math.exp(-k*p.th)-0.5,1e-6,50),
 kToHalf:p=>bisect(t=>Math.exp(-p.k*t)-0.5,0,1e4),
 c0:p=>p.D/p.V,
 halvings:p=>ode1(L2/p.th,p.C0,p.t),
 clear:p=>bisect(k=>Math.exp(-k*p.th)-0.5,1e-6,50)*p.V,
 concAt:p=>ode1(L2/p.th,p.D/p.V,p.t),
 timeTo:p=>bisect(t=>p.D/p.V*Math.pow(0.5,t/p.th)-p.C,0,1e4),
 auc:p=>simpson(t=>p.D/p.V*Math.pow(0.5,t/p.th),0,80*p.th,8000),
 infCss:p=>{const V=10,k=p.CL/V;return odeSolve((t,y)=>[p.R0/V-k*y[0]],[0],60/k,0.05/k).at(-1)[0];},
 infRate:p=>p.Css*p.CL,
 ssFrac:p=>{const V=1,k=L2/p.th;return 100*odeSolve((t,y)=>[1/V-k*y[0]],[0],p.t,p.t/2000)[2000][0]*k*V;},
 tmaxEx:p=>{const k=L2/p.th;return golden(t=>Math.exp(-k*t)-Math.exp(-p.ka*t),0,200);},
 accum:p=>{const r=Math.pow(0.5,p.tau/p.th);let s=0;for(let j=0;j<3000;j++)s+=Math.pow(r,j);return s;},
 cssAvg:p=>{const V=10,k=p.CL/V;return simpson(t=>superpose(p.F*p.D,V,k,p.tau,3000,0,2999*p.tau+t),0,p.tau,2000)/p.tau;},
 loading:p=>p.C*p.V/p.F,
 kFromTwo:p=>bisect(th=>p.C1*Math.pow(0.5,(p.t2-p.t1)/th)-p.C2,0.01,1e4),
 renal:p=>{const CL=p.CLn*(1-p.fe)+p.CLn*p.fe*p.f/100;return bisect(t=>Math.exp(-CL/p.V*t)-0.5,0,1e5);},
};
const shownNum=s=>String(s).replace(/<[^>]+>/g,'');
const seen={1:new Set(),2:new Set(),3:new Set()};
for(const L of[1,2,3])for(let s=1;s<=500;s++){
 const ex=K.genExercise(L,s);seen[L].add(ex.type);ok(Number.isFinite(ex.answer)&&ex.answer>0,`L${L} s${s} cevap`);ok(!/NaN|undefined|Infinity/.test(ex.html+ex.steps.join('')+ex.hint),`L${L} s${s} metin`);
 const ref=solveIndep[ex.type];assert(ref,'bağımsız çözücü yok: '+ex.type);rel(ex.answer,ref(ex.p),2e-6,`L${L} s${s} ${ex.type}`);
 const txt=shownNum(ex.html);for(const[key,v]of Object.entries(ex.p)){const f=key==='fe'?K.fmt(v*100,4):K.fmt(v,4);ok(txt.includes(f),`L${L} s${s} ${ex.type}: ${key} = ${f} metinde yok`);}
 ok(/İlaç A/.test(ex.html),'her soru uydurma İlaç A için');
 eq(K.grade(ex,ex.shown).status,'correct',`L${L} s${s} gösterilen cevap doğru sayılmalı (${ex.shown})`);
 eq(JSON.stringify(K.genExercise(L,s)),JSON.stringify(ex),'tohum tekrarlanabilir');}
for(const L of[1,2,3]){eq([...seen[L]].sort().join(),[...K.GEN_TYPES[L]].sort().join(),'seviye '+L+' bütün türleri üretir');ok(seen[L].size>=5);}

// 13) Yaygın hatalar
for(const id of K.MISTAKE_IDS)for(let s=1;s<=60;s++){const M=K.mistake(id,s),v=M.v;
 const indep={yariSifir:()=>ode1(L2/v.th,v.C0,v.th),dozIkiKat:()=>bisect(t=>2*v.C0*Math.pow(0.5,t/v.th)-v.Ct,0,1e4),kararliDoz:()=>bisect(t=>1-Math.pow(0.5,t/v.th)-0.9,0,1e4),biyoYari:()=>v.th,
  sikDoz:()=>{const V=10,k=v.CL/V,tau=6;return simpson(t=>superpose(v.Dg/4,V,k,tau,3000,0,2999*tau+t),0,tau,2000)/tau;},
  mmSabit:()=>{const W=t=>v.Km*lambertW(v.C0/v.Km*Math.exp((v.C0-v.Vm*t)/v.Km));return bisect(t=>W(t)-v.C0/2,0,1e4);},
  egimYari:()=>-K.lineFit([0,1,2,3],[0,1,2,3].map(t=>Math.log(Math.pow(0.5,t/v.th)))).m}[id]();
 rel(M.right,indep,1e-6,`${id} tohum ${s}`);ok(Math.abs(M.wrong-M.right)>1e-6*Math.max(1,Math.abs(M.right)),`${id} tohum ${s}: yanlış kural tesadüfen doğru çıkmamalı`);}
ok(K.MISTAKE_IDS.length>=5,'en az beş yaygın hata');

console.log(`G farmakokinetik: ${checks.toLocaleString('tr-TR')} bağımsız çekirdek kontrolü PASS`);

if(process.argv.includes('--browser')){
 const {createRequire}=await import('node:module');const {createServer}=await import('node:http');const {join,extname}=await import('node:path');const {fileURLToPath}=await import('node:url');const root=fileURLToPath(new URL('../',import.meta.url));
 let chromium;for(const dir of[root,...(process.env.NODE_PATH||'').split(':').filter(Boolean),'/opt/node-tools']){try{({chromium}=createRequire(join(dir,'package.json'))('playwright'));break;}catch(_){}}
 if(!chromium)({chromium}=await import('playwright'));
 const server=createServer((req,res)=>{const file=join(root,decodeURIComponent(new URL(req.url,'http://localhost').pathname));if(!file.startsWith(root)||!fs.existsSync(file)||fs.statSync(file).isDirectory()){res.writeHead(404).end();return;}res.setHeader('Content-Type',({'.html':'text/html; charset=utf-8','.js':'text/javascript; charset=utf-8','.css':'text/css; charset=utf-8'})[extname(file)]||'application/octet-stream');res.end(fs.readFileSync(file));});
 await new Promise(r=>server.listen(0,'127.0.0.1',r));let browser;const before=checks;
 try{browser=await chromium.launch();
  for(const[width,theme]of[[390,'light'],[1280,'dark']]){
   const ctx=await browser.newContext({viewport:{width,height:900},deviceScaleFactor:width<500?2:1,locale:'tr-TR'});await ctx.addInitScript(t=>{localStorage.setItem('acelya-theme',t);localStorage.setItem('acelya-sound-muted','1');},theme);
   const page=await ctx.newPage();page.setDefaultTimeout(6000);const errors=[];page.on('pageerror',e=>errors.push(e.message));page.on('console',m=>{if(m.type()==='error'&&!/404|Failed to load resource/.test(m.text()))errors.push(m.text());});
   await page.goto(`http://127.0.0.1:${server.address().port}/farmakokinetik.html`,{waitUntil:'load'});await page.waitForTimeout(400);
   const click=id=>page.locator('#'+id).click(),read=async id=>(await page.locator('#'+id).textContent()).trim(),has=async(id,t)=>{const s=await read(id);assert(s.includes(t),`[${width}] #${id}: "${s}" içinde "${t}" yok`);checks++;};
   const range=(id,v)=>page.locator('#'+id).evaluate((e,v)=>{e.value=v;e.dispatchEvent(new Event('input',{bubbles:true}));},v),pick=(id,v)=>page.locator('#'+id).selectOption(v),settle=()=>page.waitForTimeout(120);
   const noOverflow=async w=>{eq(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),true,`[${width}] yatay taşma: ${w}`);};
   const painted=async id=>{ok(assertCanvasDrawn(await canvasInk(page,'#'+id),{minDistinct:4,label:`[${width}] ${id}`}),`[${width}] ${id} boş`);};
   eq(await page.evaluate(()=>[...document.querySelectorAll('main input,main select')].filter(e=>!(e.labels&&e.labels.length)&&!e.getAttribute('aria-label')).map(e=>e.id).join()),'','etiketsiz denetim');
   eq(await page.evaluate(()=>[...document.querySelectorAll('main canvas')].every(c=>c.getAttribute('role')==='img'&&c.getAttribute('aria-label'))),true);
   eq(await page.evaluate(()=>[...document.querySelectorAll('main button')].filter(b=>!b.textContent.trim()&&!b.getAttribute('aria-label')).length),0,'adsız düğme');
   eq(await page.evaluate(()=>/[̀-ͯ]/.test(document.querySelector('main').textContent)),false,'birleşik işaret');
   eq(await page.evaluate(()=>document.title.length<=80),true,'başlık ≤ 80');
   eq(await page.evaluate(()=>[...document.querySelectorAll('main input[type=number]')].length),0,'type=number yok');
   await has('safeNote','Bu bir doz önerisi değildir; ilaç kullanımı için hekime ya da eczacıya danışın.');await has('safeNote','acil durumda 112');await has('safeNote','uydurma');
   eq(await page.evaluate(()=>[...document.querySelectorAll('.fk-bridge a')].map(a=>a.getAttribute('href')).filter(h=>/bagisiklik|epidemiyoloji|tibbi-goruntuleme/.test(h)).length),3,'yoldaki üç komşu derse bağlantı');
   ok((await read('bridgeH'))==='Bundan sonra');ok(!(await page.locator('.fk-bridge').textContent()).includes('(hazırlanıyor)'));ok((await page.locator('.fk-bridge a[href="tibbi-goruntuleme-fizigi.html"]').count())===1);
   // sekme klavyesi
   await page.locator('#tab-t1').focus();await page.keyboard.press('ArrowRight');await settle();eq(await page.locator('#tab-t2').getAttribute('aria-selected'),'true');await page.keyboard.press('End');await settle();eq(await page.locator('#panel-t6').isVisible(),true);await page.keyboard.press('Home');await settle();eq(await page.locator('#panel-t1').isVisible(),true);await page.keyboard.press('ArrowLeft');await settle();eq(await page.locator('#tab-t6').getAttribute('aria-selected'),'true');await click('tab-t1');await settle();
   // 01
   await has('admeText','Emilim');await click('adme-E');await settle();await has('admeText','klerens');eq(await page.locator('#adme-E').getAttribute('aria-pressed'),'true');
   await painted('t1c');await has('t1Stats','10 mg/L');await has('t1Stats','0,1386 1/sa');await has('t1Stats','6,931 L/sa');await has('t1Stats','72,13 mg·sa/L');await has('t1Stats','5 sa');await has('t1Stats','2,5 mg/L');await has('t1Status','%25 kadarı');
   await range('t1t',25);await settle();await has('t1Status','pratikte atılmış');await range('t1D',1000);await settle();await has('t1Stats','144,3');await range('t1h',24);await range('t1t',144);await settle();await painted('t1c');
   await page.locator('#t1log').check();await settle();await painted('t1c');await range('t1h',0.5);await range('t1V',5);await settle();await painted('t1c');await has('t1Stats','0,5 sa');
   await click('t1Reset');await settle();await has('t1Stats','72,13');eq(await page.locator('#t1log').isChecked(),false);await has('admeText','Emilim');
   await noOverflow('01');
   // 02
   await click('tab-t2');await settle();await painted('t2c');await has('t2Stats','2,294 sa');await has('t2Stats','5,821 mg/L');await has('t2Stats','57,71');await has('t2Stats','0,8');
   await click('t2Pslow');await settle();await has('t2Status','flip-flop');await has('t2Stats','8,456 sa');await has('t2Stats','0,099');await has('t2kaOut','0,1');await click('t2Pfast');await settle();await has('t2Status','katı');
   await range('t2ka',5);await settle();await has('t2Status','katı');await page.locator('#t2iv').uncheck();await page.locator('#t2log').check();await settle();await painted('t2c');
   await click('t2Reset');await settle();await has('t2Stats','2,294 sa');await has('t2Status','alan değişmez');eq(await page.locator('#t2iv').isChecked(),true);
   await noOverflow('02');
   // 03
   await click('tab-t3');await settle();await painted('t3c');await painted('t3r');await has('t3Stats','1,771');await has('t3Stats','10,62 mg/L');await has('t3Stats','4,625 mg/L');await has('t3Stats','7,213 mg/L');
   ok((await read('t3Table')).includes('0,9987'),'tablo 1 − r^8');ok((await read('t3Table')).includes('(j − 1)·τ anında'),'tablo başlığı: tepe zamanı');await has('t3Status','aralık sonu dibi');await has('t3Status','%93,75');
   await page.locator('#t3load').check();await settle();await has('t3Status','Yükleme dozu');await has('t3Table','yükleme');await page.locator('#t3load').uncheck();
   await range('t3D',600);await settle();await has('t3Status','üstüne');await range('t3n',1);await settle();await has('t3Stats','12 mg/L');
   await pick('t3Mode','inf');await settle();eq(await page.locator('#t3R').isVisible(),true);eq(await page.locator('#t3D').isVisible(),false);await has('t3Stats','7,213 mg/L');await has('t3Stats','16,61 sa');await has('t3Title','infüzyon');ok((await read('t3Table')).includes('0,9375'));
   await range('t3Ti',10);await settle();await has('t3Status','bitiyor');await has('t3Stats','ulaşılmadı');await page.locator('#t3load').check();await settle();await has('t3Status','hemen');await painted('t3c');
   await range('t3fr',30);await settle();await has('t3rStats','6,931 → 3,535 L/sa');await has('t3rStatus','klinisyen');await painted('t3r');await click('t3rReset');await settle();await has('t3rStatus','normal');
   await click('t3Reset');await settle();eq(await page.locator('#t3Mode').inputValue(),'bolus');await has('t3Stats','1,771');eq(await page.locator('#t3load').isChecked(),false);
   await noOverflow('03');
   // 04
   await click('tab-t4');await settle();await painted('t4c');await painted('t4m');await has('t4Stats','0,05756');await has('t4Stats','1,042');await has('t4Stats','83,33');await has('t4Stats','12,04 sa');
   await range('t4k10',1);await range('t4k12',0.05);await range('t4k21',1);await settle();await has('t4Status','çok yakın');await click('t4Reset');await settle();await has('t4Stats','0,05756');
   await has('t4mStats','6,386 sa');await has('t4mStats','1,386 sa');await has('t4mStats','140');await has('t4mStats','3,429');await has('t4mStatus','doymuş');ok((await read('t4mTable')).includes('1,543 sa'));
   await range('t4mD',100);await range('t4mKm',50);await settle();await has('t4mStatus','birinci derece');await page.locator('#t4mlog').check();await settle();await painted('t4m');await click('t4mReset');await settle();await has('t4mStats','6,386 sa');
   await noOverflow('04');
   // 05
   await click('tab-t5');await settle();await painted('t5c');await has('t5Status','Gerçek değerler gizli');ok(!(await read('t5Stats')).includes('Gerçek'),'gerçek gizli');ok((await read('t5Data')).includes('yapay veri'));
   await click('t5Fit');await settle();await has('t5Stats','0,1433');await has('t5Stats','14 nokta');await click('t5Truth');await settle();await has('t5Stats','4,9 sa');await has('t5Stats','64 L');
   await range('t5s',2);await settle();ok(!(await read('t5Stats')).includes('Gerçek'),'yeni veri: gerçek yeniden gizli');
   await pick('t5Kind','iki');await settle();await click('t5Fit');await settle();await has('t5Status','dağılım evresinde');await range('t5st',9);await settle();await has('t5Status','uç evreyi');await has('t5stOut','10 sa');await click('t5Truth');await settle();await has('t5Stats','V₁');await painted('t5c');
   await range('t5n',0);await page.locator('#t5log').uncheck();await settle();await painted('t5c');await click('t5Reset');await settle();await has('t5Status','gizli');eq(await page.locator('#t5Kind').inputValue(),'tek');
   await noOverflow('05');
   // 06
   await click('tab-t6');await settle();const ex=await page.evaluate(()=>{const e=window.Farmako.genExercise(1,1);return{shown:e.shown,answer:e.answer,kind:e.kind};});
   await page.locator('#t6A').fill('ln2/4');await click('t6Check');await settle();await has('t6F','Önce sayıyı');eq(await page.locator('#t6A').getAttribute('aria-invalid'),'true');
   await page.locator('#t6A').fill('99999');await click('t6Check');await settle();await has('t6F','Henüz değil');eq(await page.locator('#t6H').isVisible(),false);await click('t6Hint');eq(await page.locator('#t6H').isVisible(),true);
   await page.locator('#t6A').fill(ex.shown);await page.locator('#t6A').press('Enter');await settle();await has('t6F','Doğru');await has('t6Score','1 soru doğru, 2 denetleme');
   if(ex.kind==='conc'){await page.locator('#t6A').fill(String(ex.answer*1000).replace('.',',')+' ng/mL');await click('t6Check');await settle();await has('t6F','Doğru');}
   await click('t6Sol');eq(await page.locator('#t6SolBox').isVisible(),true);await has('t6Steps',ex.shown);await click('t6Next');await settle();await has('t6SOut','2');eq(await page.locator('#t6SolBox').isVisible(),false);eq(await page.locator('#t6A').inputValue(),'');
   for(const L of['2','3']){await pick('t6L',L);await settle();const e=await page.evaluate(L=>window.Farmako.genExercise(+L,2).shown,L);await page.locator('#t6A').fill(e);await click('t6Check');await settle();await has('t6F','Doğru');}
   await range('t6S',500);await settle();await click('t6Next');await settle();await has('t6SOut','1');await click('t6Reset');await settle();await has('t6Score','0 soru doğru');eq(await page.locator('#t6L').inputValue(),'1');
   eq(await page.locator('.fk-mcard').count(),7,'yedi hata kartı');const m0=await read('m-dozIkiKat');await click('mb-dozIkiKat');await settle();ok(m0!==await read('m-dozIkiKat'),'Başka sayılar metni değiştirir');await has('m-sikDoz','ikisinde de');
   await noOverflow('06');
   // tema değişince yeniden çizim
   await click('tab-t3');await settle();await page.evaluate(t=>document.documentElement.setAttribute('data-theme',t),theme==='light'?'dark':'light');await page.waitForTimeout(150);await painted('t3c');
   eq(errors.join(' | '),'',`[${width}] konsol hatası`);await ctx.close();
  }
  console.log(`G farmakokinetik: ${checks-before} kalıcı tarayıcı kontrolü PASS (390 px açık, 1280 px koyu)`);
 }finally{await browser?.close();await new Promise(r=>server.close(r));}
}
