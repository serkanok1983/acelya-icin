// G · tibbi-goruntuleme-fizigi.html — kalıcı denetim.
// Çekirdek (KERNEL-BEGIN … KERNEL-END) node'da yüklenir ve sayfanın formüllerini KULLANMAYAN başvurularla karşılaştırılır:
// açılan NIST/CODATA/Stanford/doz tablolarından yeniden yazılmış sayılar, SI tanım sabitleriyle hc/(eU), Kramers
// spektrumunun kapalı biçimli ortalaması, elips kirişlerinin kaba kuvvet çizgi tümlevi ve kütle korunumu, testin kendi
// frekans uzayı (DFT, |ω| rampa) süzgeçli geri izdüşümü, süzgeçsiz geri izdüşümün 1/r halesi, ultrason varış zamanları
// t = 2Σd/c, Gauss çukur eşiği c·σt, spin yankısı için tam kapalı biçim 1 − 2e^(−(TR−TE/2)/T1) + e^(−TR/T1),
// PET zayıflaması için tek boyutlu kiriş tümlevi, alıştırma metinlerinden geri okunan sayılarla bağımsız çözüm.
// `--browser`: Playwright ile gerçek arayüz (390 px açık tema ve 1280 px koyu tema).
import fs from 'node:fs';
import vm from 'node:vm';
import assert from 'node:assert/strict';
import { canvasInk, assertCanvasDrawn } from './lib/canvas-check.mjs';
const html=fs.readFileSync(new URL('../tibbi-goruntuleme-fizigi.html',import.meta.url),'utf8');
const source=html.split('/* KERNEL-BEGIN */')[1]?.split('/* KERNEL-END */')[0];
assert(source,'KERNEL sınırları gerekli');
const context={window:{}};vm.createContext(context);vm.runInContext(source,context);
const K=context.window.TGF;assert(K,'TGF yok');assert(Object.isFrozen(K),'çekirdek donmuş olmalı');
let checks=0;
const near=(a,e,tol=1e-10,msg='')=>{assert(Number.isFinite(a)&&Math.abs(a-e)<=tol*Math.max(1,Math.abs(e)),`${msg} ${a} ≠ ${e} (tol ${tol})`);checks++;};
const rel=(a,e,tol,msg='')=>{assert(Number.isFinite(a)&&Math.abs(a-e)<=tol*Math.abs(e),`${msg} ${a} ≠ ${e} (göreli ${tol})`);checks++;};
const ok=(c,msg='koşul sağlanmadı')=>{assert(c,msg);checks++;};
const eq=(a,b,msg)=>{assert.equal(a,b,(msg||'eşitlik')+`: ${a} ≠ ${b}`);checks++;};
const NB=' ';

// 1) Sayı biçimi
for(const[x,sd,s]of[[12345.678,4,'12'+NB+'346'],[1234,4,'1234'],[0.5,4,'0,5'],[-2.5,4,'−2,5'],[0,4,'0'],[2.64e-7,3,'2,64·10⁻⁷'],[NaN,4,'—']])eq(K.fmt(x,sd),s,'fmt '+x);
for(const[x,dp,s]of[[-0.0001,2,'0,00'],[12345.6,1,'12'+NB+'345,6'],[63.8662,4,'63,8662']])eq(K.fix(x,dp),s,'fix '+x);

// 2) NIST tabloları (açılan sayfalardan yeniden yazıldı) ve ara değerleme
const NIST={water:{60:0.2059,100:0.1707,20:0.8096,10:5.329},tissue:{60:0.2048,40:0.2688,150:0.1492},bone:{60:0.3148,30:1.331,100:0.1855},adipose:{60:0.1974,80:0.1800},air:{60:0.1875,150:0.1356},al:{60:0.2778,10:26.23,30:1.128}};
for(const m in NIST)for(const E in NIST[m])near(K.muRho(m,+E),NIST[m][E],1e-12,`μ/ρ ${m} ${E}`);
for(const[m,r]of[['water',1],['tissue',1.06],['bone',1.92],['adipose',0.95],['air',0.001205],['al',2.699]])near(K.MAT[m].rho,r,1e-12,'ρ '+m);
ok(Number.isNaN(K.muRho('bone',15)),'tablo dışı enerji NaN');ok(Number.isNaN(K.muRho('water',200)),'150 keV üstü NaN');
for(const m of['water','tissue','bone','adipose','air'])for(let E=20;E+1.7<=150;E+=1.7){const a=K.muRho(m,E),b=K.muRho(m,E+1.7);ok(a>b,`μ/ρ ${m} enerjiyle azalır (${E})`);}
near(K.MU_W511,0.09597,2e-4,'511 keV su μ');
// log-log ara değerleme: aynı aralıkta kuvvet yasası E^k tam yeniden üretilir
{const k=Math.log(0.2059/0.2269)/Math.log(60/50);near(K.muRho('water',55),0.2269*Math.pow(55/50,k),1e-12,'kuvvet yasası ara değer');}
// HU tanımı
near(K.HU(K.mu('water',60),60),0,1e-12);near(K.HU(K.mu('air',60),60),-1000,1e-12);near(K.HU(K.mu('tissue',60),60),54.3967,1e-4);near(K.HU(K.mu('bone',60),60),1937.609,1e-5);near(K.HU(K.mu('adipose',60),60),-89.316,1e-4);
ok(K.HU(K.mu('adipose',60),60)<-85&&K.HU(K.mu('adipose',60),60)>-125,'yağ HU, Wikipedia aralığı −120…−90 civarında');

// 3) Foton sayma: e^(−μx), ortanca = ln2/μ, ortalama = 1/μ
for(const[m,E]of[['tissue',60],['bone',30],['water',100],['al',40]])for(const seed of[1,2,3,4,5]){
 const mu=K.mu(m,E),xs=[0.5/mu,1/mu,2/mu],N=40000,R=K.mcSlab(N,mu,xs,seed);
 xs.forEach((x,i)=>{const p=Math.exp(-mu*x),sd=Math.sqrt(p*(1-p)/N);ok(Math.abs(R.counts[i]/N-p)<4.5*sd,`MC ${m} ${E} ${seed} x=${x}: ${R.counts[i]/N} vs ${p}`);});
 rel(R.median,Math.LN2/mu,0.03,'ortanca HVL');rel(R.mean,1/mu,0.03,'ortalama serbest yol');}
eq(K.mcSlab(1000,0.2,[1e6],1).counts[0],0,'kalın engel');

// 4) Spektrum: λmin = hc/(eU) SI tanım sabitlerinden; Kramers ortalaması kapalı biçim
const h=6.62607015e-34,c=299792458,e=1.602176634e-19;
for(const kv of[40,80,120,150])near(K.spectrum(kv,0).lamMin*1e-9,h*c/(e*kv*1e3),1e-8,'Duane–Hunt '+kv);
for(const kv of[40,50,60,69]){const E0=kv,a=10,mean=(E0-a)*(E0-a)/2/(E0*Math.log(E0/a)-(E0-a));rel(K.spectrum(kv,0,0.05).mean,mean,2e-3,'Kramers ortalama '+kv);eq(K.spectrum(kv,0).lines.length,0,'K çizgisi yok '+kv);}
eq(K.spectrum(80,0).lines.length,3);near(K.W_K,69.525,1e-12);eq(K.W_LINES.map(l=>l.E).join(),'57.9817,59.31824,67.2443','X-Ray Data Booklet çizgileri');
for(const kv of[60,80,120]){let prev=0;for(const al of[0,1,2.5,4,6]){const m=K.spectrum(kv,al).mean;ok(m>prev,'filtre ortalamayı artırır');prev=m;}const H=K.hvlPoly(K.spectrum(kv,2.5));ok(H.hvl2>H.hvl1,'ışın sertleşmesi HVL₂ > HVL₁');
 // bağımsız: enerji ağırlıklı geçen kesri test kendi döngüsüyle hesaplar
 const sp=K.spectrum(kv,2.5);let A=0,B=0;sp.E.forEach((E,i)=>{const w=sp.N[i]*sp.dE*E;A+=w;B+=w*Math.exp(-K.muRho('water',E)*H.hvl1);});sp.lines.forEach(L=>{A+=L.count*L.E;B+=L.count*L.E*Math.exp(-K.muRho('water',L.E)*H.hvl1);});near(B/A,0.5,1e-6,'HVL₁ tanımı');}

// 5) Elips kirişleri: kaba kuvvet çizgi tümlevi, disk kapalı biçimi, kütle korunumu
const insideIndep=(E,x,y)=>{const ca=Math.cos(E.phi||0),sa=Math.sin(E.phi||0),u=(x-E.x)*ca+(y-E.y)*sa,v=-(x-E.x)*sa+(y-E.y)*ca;return(u/E.a)**2+(v/E.b)**2<=1;};
const lineInt=(E,th,s)=>{const n=20000,L=40;let cnt=0;for(let i=0;i<n;i++){const t=-L/2+(i+0.5)*L/n,x=s*Math.cos(th)-t*Math.sin(th),y=s*Math.sin(th)+t*Math.cos(th);if(insideIndep(E,x,y))cnt++;}return cnt*L/n;};
for(const E of[{x:1,y:-2,a:5,b:2,phi:0.4},{x:-3,y:1,a:1.5,b:4,phi:-1.1},{x:0,y:0,a:3,b:3}])for(const th of[0,0.3,1.2,2.5])for(const s of[-2,0,1.3,3]){near(K.chord(E,th,s),lineInt(E,th,s),3e-3,`kiriş ${th} ${s}`);}
for(const s of[0,1,2.5,3.9])near(K.chord({x:0,y:0,a:4,b:4},0.7,s),2*Math.sqrt(16-s*s),1e-12,'disk kirişi');
for(const def of[K.CHEST_DEF,K.ABD_DEF]){const ph=K.buildPhantom(def,60),mass=ph.reduce((a,E)=>a+E.d*Math.PI*E.a*E.b,0);for(const th of[0,0.5,1.4,2.9]){let sum=0;const n=4000;for(let i=0;i<n;i++){const s=-20+(i+0.5)*40/n;sum+=K.project(ph,th,s)*40/n;}rel(sum,mass,2e-4,'∫p ds = kütle, θ='+th);}}
// göğüs: kemik kontrastı kapalı biçim
{const C=K.chestStats(60,1,0,1);near(C.boneC,1-Math.exp(-(0.3148*1.92-0.2048*1.06)*(3.6+1.2)),1e-9,'kemik kontrastı');rel(C.nodC,1-Math.exp(-(0.2048*1.06-0.2048*0.26)*2*Math.sqrt(1-0)) ,0.15,'düğüm kontrastı (merkez kirişe yakın)');
 ok(K.chestStats(100,1,0,1).boneC<C.boneC,'yüksek enerjide kemik kontrastı azalır');}
{let n=0,sum=0;for(let s=1;s<=30;s++){const C=K.chestStats(60,1,2000,s);sum+=C.nodCmeas;n++;}rel(sum/n,K.chestStats(60,1,0,1).nodC,0.05,'gürültülü kontrastın ortalaması kurama yakın');}

// 6) BT: bağımsız frekans uzayı FBP, disk değeri, 1/r halesi, açıyla azalan hata, rampa çekirdeği
{const nd=256,ds=K.CT_SPAN/nd,h=K.rampKernel(nd,ds,'ramlak');let sm=0;for(const v of h)sm+=v;ok(Math.abs(sm*ds*ds)<2/(Math.PI**2*(nd-1)),'Ram–Lak toplamı ≈ 0');near(h[nd-1],1/(4*ds*ds),1e-12);near(h[nd],-1/(Math.PI**2*ds*ds),1e-12);eq(h[nd+1],0);}
const disk=[{x:0,y:0,a:8,b:8,d:0.2}];
{const S=K.sinogram(disk,180,256,0,1);const img=K.backproject(S,K.filterSino(S,'ramlak'));const R=K.roiMean(img,0,0,5);rel(R.mean,0.2,0.01,'FBP disk merkezi');ok(R.sd<0.004,'FBP disk düzgün');
 // testin kendi FBP'si: sıfır dolgulu DFT, |ω| rampa, doğrusal ara değerleme
 const nd=S.nd,M=1024,ds=S.ds,Q=new Float64Array(S.P.length);
 for(let a=0;a<S.nA;a++){const re=new Float64Array(M),im=new Float64Array(M);for(let i=0;i<nd;i++)re[i]=S.P[a*nd+i];
  const Fr=new Float64Array(M),Fi=new Float64Array(M);for(let k=0;k<M;k++){let x=0,y=0;for(let i=0;i<nd;i++){const ang=-2*Math.PI*k*i/M;x+=re[i]*Math.cos(ang);y+=re[i]*Math.sin(ang);}const kk=k<=M/2?k:M-k,w=kk/(M*ds);Fr[k]=x*w;Fi[k]=y*w;}
  for(let i=0;i<nd;i++){let x=0;for(let k=0;k<M;k++){const ang=2*Math.PI*k*i/M;x+=Fr[k]*Math.cos(ang)-Fi[k]*Math.sin(ang);}Q[a*nd+i]=x/M;}}
 const N=128,px=K.CT_FOV/N;let dmax=0;for(let j=0;j<N;j++)for(let i=0;i<N;i++){const x=-16+(i+0.5)*px,y=16-(j+0.5)*px;if(x*x+y*y>36)continue;let v=0;for(let a=0;a<S.nA;a++){const t=(x*Math.cos(S.th[a])+y*Math.sin(S.th[a])-S.s0)/ds,k=Math.floor(t),f=t-k;v+=Q[a*nd+k]*(1-f)+Q[a*nd+k+1]*f;}v*=Math.PI/S.nA;dmax=Math.max(dmax,Math.abs(v-img[j*N+i]));}
 ok(dmax<0.006,'sayfa FBP ile bağımsız frekans uzayı FBP uyumlu: en büyük fark '+dmax);}
{const pt=[{x:0,y:0,a:0.3,b:0.3,d:1}],S=K.sinogram(pt,180,256,0,1),img=K.backproject(S,K.filterSino(S,'none'));const v=r=>K.roiMean(img,r,0,0.3).mean;rel(v(3)/v(6),2,0.06,'süzgeçsiz geri izdüşüm 1/r');rel(v(2)/v(8),4,0.08,'1/r (2–8 cm)');}
{const ph=K.abdPhantom(),T=K.truthImage(ph);const r=nA=>K.ctStats(K.ctRun({nA,nd:128,I0:0,seed:1,filter:'ramlak'}),T).rmse;const a=r(8),b=r(32),cc=r(128);ok(a>b&&b>cc,`açı arttıkça hata azalır ${a} ${b} ${cc}`);
 const C=K.ctStats(K.ctRun({nA:180,nd:256,I0:0,seed:1,filter:'ramlak'}),T);ok(Math.abs(C.cyst)<8&&Math.abs(C.tissue-54.4)<8&&Math.abs(C.fat+89.3)<12&&Math.abs(C.bone-1937.6)<40,'HU geri kurulumu '+JSON.stringify(C));
 const n1=K.ctStats(K.ctRun({nA:90,nd:128,I0:1e6,seed:1,filter:'ramlak'}),T).tissueSd,n2=K.ctStats(K.ctRun({nA:90,nd:128,I0:1e4,seed:1,filter:'ramlak'}),T).tissueSd;rel(n2/n1,10,0.35,'gürültü 1/√I₀');
 const sh=K.ctStats(K.ctRun({nA:90,nd:128,I0:1e5,seed:1,filter:'shepp'}),T).tissueSd,rl=K.ctStats(K.ctRun({nA:90,nd:128,I0:1e5,seed:1,filter:'ramlak'}),T).tissueSd;ok(sh<rl,'Shepp–Logan gürültüyü azaltır');}

// 7) Ultrason
const LZ={air:0.0004,water:1.48,blood:1.68,muscle:1.65,liver:1.64,kidney:1.64,fat:1.33};
for(const m in LZ)rel(K.zOf(m),LZ[m],0.02,'Z = ρc, Stanford tablosu '+m);
ok(K.zOf('bone')>5&&K.zOf('bone')<7.8,'kemik Z kaynak aralığında');near(K.C_ASSUMED,1540,0);
for(const a in K.US)for(const b in K.US){const R=K.reflR(K.zOf(a),K.zOf(b));near(R,K.reflR(K.zOf(b),K.zOf(a)),1e-15);ok(R>=0&&R<1);}
ok(K.reflR(K.zOf('muscle'),K.zOf('air'))>0.998,'doku–hava neredeyse tam');near(K.reflR(1.7,7.8)*100,41,0.01,'ders notu örneği kas–kemik %41');near(K.reflR(1.38,1.7)*100,1.1,0.05,'ders notu örneği yağ–kas %1,1');
for(const key in K.LAYERS)for(const f of[2,5,10]){const L=K.LAYERS[key],M=K.measureEchoes(L,f,2);let t=0;M.forEach((m,i)=>{t+=2*(L[i].t/100)/K.US[L[i].m].c;near(m.t,t,1e-12,'t = 2Σd/c');if(10*Math.log10(m.I)>-150){rel(m.tMeas,t,1e-3,`ölçülen varış ${key} ${f} ${i}`);rel(m.dShown,1540*m.tMeas/2*100,1e-12);}});}
{const M=K.measureEchoes(K.LAYERS.fat,5,2);rel(M[0].dShown/M[0].z,1540/1430,1e-3,'yağda derinlik hatası');}
for(const f of[2,5,10])for(const n of[1,3,5]){const th=n*1540/(f*1e6)/(2*Math.sqrt(2*Math.LN2))*1000;let lo=0.01,hi=10;for(let i=0;i<40;i++){const md=(lo+hi)/2;if(K.twoEcho(md,f,n).resolved)hi=md;else lo=md;}rel(hi,th,0.03,`çukur eşiği ${f} ${n}`);near(K.twoEcho(1,f,n).rule,n*1540/(f*1e6)/2*1000,1e-9);}
for(const f of[2,5,10])near(K.penetration(f),60/(2*0.5*f),1e-12);
for(const f0 of[2,5,8])for(const v of[-1.2,-0.3,0.5,1.4])for(const th of[0,45,60,80])for(const prf of[2000,5000,12000]){const fd=2*f0*1e6*v*Math.cos(th*Math.PI/180)/1540;near(K.dopplerShift(f0,v,th),fd,1e-9);const al=((fd%prf)+prf*1.5)%prf-prf/2;near(K.aliasF(fd,prf),al,1e-9,'örtüşme');const M=K.dopplerMeasure(fd,prf,3);ok(Math.abs(M.fMeas-al)<0.004*prf||Math.abs(Math.abs(M.fMeas-al)-prf)<0.004*prf,`Doppler tepe ${fd} ${prf}: ${M.fMeas} vs ${al}`);}
eq(K.dopplerShift(5,0.5,90),0,'θ = 90° tam sıfır');
{const B=K.bmode(5,7),nx=B.nx,nz=B.nz,col=x=>Math.floor((x+4)/8*nx),row=z=>Math.floor(z/12*nz),mean=(x0,x1,z0,z1)=>{let s=0,n=0;for(let i=col(x0);i<col(x1);i++)for(let j=row(z0);j<row(z1);j++){s+=B.img[j*nx+i];n++;}return s/n;};
 ok(mean(1.8,2.6,3,6)<mean(-0.6,0.4,3,6)-0.2,'kaburga arkası akustik gölge');ok(mean(-2.0,-1.2,8.2,9.5)>mean(0.2,1.0,8.2,9.5),'kist arkası güçlenme');ok(mean(-2,-1.2,6,7)<mean(0.2,1,6,7)-0.2,'kist yankısız');}

// 8) MR
near(K.GAMMA_BAR,42.577478461,0,'CODATA 2022');near(K.larmor(1.5),63.8662176915,1e-12);near(K.larmor(3),127.732435383,1e-12);
for(const B of[0.1,1.5,3,7])rel(K.precess(B).fMeas,K.larmor(B),1e-5,'ölçülen Larmor (sıfır geçişinde doğrusal ara değerleme) '+B);
const seExact=(T1,T2,TR,TE)=>(1-2*Math.exp(-(TR-TE/2)/T1)+Math.exp(-TR/T1))*Math.exp(-TE/T2);
for(const k in K.TIS){const T=K.TIS[k];for(const[TR,TE]of[[500,15],[4000,100],[4000,15],[1200,60]]){near(K.blochSE(T.T1,T.T2,TR,TE),seExact(T.T1,T.T2,TR,TE),1e-7,`Bloch ${k} ${TR}/${TE}`);near(K.seSimple(T.T1,T.T2,TR,TE),(1-Math.exp(-TR/T.T1))*Math.exp(-TE/T.T2),1e-15);}}
{const s=k=>K.seSimple(K.TIS[k].T1,K.TIS[k].T2,500,15),t=k=>K.seSimple(K.TIS[k].T1,K.TIS[k].T2,4000,100);ok(s('fat')>s('wm')&&s('wm')>s('gm')&&s('gm')>s('csf'),'T1 ağırlıklı sıralama');ok(t('csf')>t('gm')&&t('csf')>t('wm')&&t('csf')>t('fat'),'T2 ağırlıklı: BOS en parlak');}
for(const[k,T1,T2]of[['fat',245,70],['wm',780,90],['gm',920,100],['csf',4350,2200],['muscle',880,50],['liver',490,40]]){eq(K.TIS[k].T1,T1);eq(K.TIS[k].T2,T2);}
for(const G of[5,10,20])for(const N of[64,128,256]){const R=K.freqEncode([{x0:-0.05,x1:0.05,rho:1}],G,N);near(R.fov,100/(42.577478461e6*G/1000*1e-5),1e-12,'FOV');let bi=0;R.prof.forEach((v,i)=>{if(v>R.prof[bi])bi=i;});ok(Math.abs(R.xs[bi])<=R.dx/2+1e-9,'nokta kaynak merkezde');
 const W=K.freqEncode([{x0:-3,x1:3,rho:0.8}],G,N);if(W.fov>8){const mid=W.prof[W.xs.findIndex(x=>x>=0)];rel(mid,0.8,0.08,'geniş nesne yoğunluğu');}}
{const obj=[{x0:6,x1:7,rho:1}],R=K.freqEncode(obj,40,128),C=K.feCentroids(R,obj);ok(C[0].outside,'FOV dışında');near(C[0].wrapped,6.5-R.fov,1e-9,'katlanma konumu');ok(Math.abs(C[0].meas-C[0].wrapped)<R.dx,'katlanmış nesne ölçülen konum');}
{const R=K.freqEncode(K.FE_OBJ.two,10,128);K.feCentroids(R,K.FE_OBJ.two).forEach(c=>ok(Math.abs(c.meas-c.trueC)<R.dx/2,'merkez ölçümü'));}

// 9) PET
near(K.ME_C2_KEV,510.99895069,0);near(K.HALF.f18.T,109.734,0);near(K.HALF.tc99m.T,6.0066*60,1e-12);
for(const t of[0,60,109.734,300])near(K.remaining(t,109.734),Math.exp(-Math.LN2*t/109.734),1e-14);
{// kuram, düzgün diskte bağımsız tek boyutlu kiriş tümleviyle
 const R=K.PET_RB,mu=K.MU_W511;let a=0,b=0;const n=200000;for(let i=0;i<n;i++){const p=(i+0.5)*R/n,L=2*Math.sqrt(R*R-p*p);a+=L*Math.exp(-mu*L);b+=L;}
 rel(K.petTheoryFraction(0,0,1,true,200,180),a/b,2e-3,'PET kuramı (düzgün disk)');eq(K.petTheoryFraction(0,0,1,false),1);}
{let sum=0;const th=K.petTheoryFraction(5,3,8,true);for(let s=1;s<=10;s++){const P=K.petSim({n:20000,hx:5,hy:3,ratio:8,att:true,tofPs:0,seed:s});sum+=P.det/P.em;}rel(sum/10,th,0.02,'PET algılanan kesir (10 tohum)');}
{const P=K.petSim({n:5000,hx:-4,hy:2,ratio:8,att:false,tofPs:400,seed:2});eq(P.det,P.em,'zayıflamasız her çift kaydedilir');rel(P.tofSdMeas,29.9792458*0.4/2.3548/2,0.06,'TOF σx = cσt/2');}
{let good=0;for(let s=1;s<=10;s++){const P=K.petSim({n:20000,hx:5,hy:3,ratio:12,att:true,tofPs:0,seed:s});if(Math.hypot(P.est.x-5,P.est.y-3)<2)good++;if(s===1)ok(Math.hypot(P.est.x-5,P.est.y-3)<2,'varsayılan tohumda sıcak bölge bulunur');}ok(good>=8,'varsayılan ayarda 10 tohumun en az 8\'inde sıcak bölge bulunur: '+good);}
// sinogram + FBP, olay sayısı arttıkça daha güvenilir: 100 000 olayda bulunur
ok(Math.hypot(K.petSim({n:100000,hx:-6,hy:-4,ratio:8,att:true,tofPs:0,seed:4}).est.x+6,0)<2,'100 000 olay');

// 10) Doz tablosu (açılan kaynaklardan yeniden yazıldı)
const DT={eks:['<0.001','<0.01',0.001],dexa:[0.001,null,0.001],dis:[0.005,'<0.01',null],gogus:[0.1,0.02,0.02],mamo:[0.28,null,0.21],bel:[1.4,1.3,1.5],btbas:[1.6,2,2],kemiksint:[null,4,6.3],btgogus:[6.1,8,6.1],petyalniz:[null,null,7],btkarin:[7.7,10,7.7],petbt:[22.7,null,null]};
eq(K.DOSES.length,Object.keys(DT).length);for(const d of K.DOSES){eq(JSON.stringify([d.ri,d.uk,d.msd]),JSON.stringify(DT[d.id]),'doz '+d.id);const r=K.doseRange(d);ok(r.lo<=r.hi);}
near(K.bgDays(2.4,2.4),365,1e-12);near(K.doseRange(K.DOSES.find(d=>d.id==='btkarin')).hi,10,0);

// 11) Cevap çözümleyici
for(const[s,v]of[['12',12],['−3',-3],['2,5',2.5],['2.5',2.5],['1 000',1000],['1/8',0.125],['12,5 %',12.5],['%12,5',12.5],[' 3,19 ',3.19],['-0,5',-0.5]]){const r=K.parseAnswer(s);ok(r.ok,'kabul: '+s);near(r.value,v,1e-15,s);}
for(const[s,re]of[['',/sayı yaz/],[null,/sayı yaz/],['3 cm',/birimsiz/],['2^3',/Yalnız sayı/],['1/0',/sıfır/],['1/2/3',/Tek bir kesir/],['1.000,5',/Tek bir ondalık/],['2 5',/binlik/],['µs',/Yalnız/]]){const r=K.parseAnswer(s);eq(r.ok,false,'red: '+s);ok(re.test(r.error),s+': '+r.error);}
{const ex={mode:'approx',answer:50.05,tol:0.1,unitHint:{k:2,msg:'2\'ye bölmeyi'}};eq(K.grade(ex,'50,1').status,'correct');eq(K.grade(ex,'50,5').status,'close');ok(/bölmeyi/.test(K.grade(ex,'100,1').msg||''),'gidiş-dönüş ipucu');}
{const ex={mode:'approx',answer:1469.4,tol:0.5,unitHint:{k:0.5,msg:'2 çarpanını'}};ok(/çarpanını/.test(K.grade(ex,'735').msg||''),'Doppler 2 çarpanı ipucu, yarı değer tamsayıya yuvarlanmış');}
// Doğrulayıcı: geçen yüzde sorularında cevap iki ondalıkla anlamlı (≥ %0,5)
for(let s=1;s<=500;s++){const ex=K.genExercise(2,s);if(ex.type==='transEx')ok(ex.answer>=0.5,'transEx cevabı çok küçük: '+ex.answer);}
// Doğrulayıcı (13 Kasım 2026): sayıya Türkçe ek, okunuşun son sözcüğüne göre
for(const[s,t,w]of[['%84','iyelik',"%84'ü"],['%26,9','iyelik-belirtme',"%26,9'unu"],['%33,7','iyelik-belirtme',"%33,7'sini"],['%60','iyelik',"%60'ı"],['%100','iyelik',"%100'ü"],['%0','iyelik',"%0'ı"],['%20','iyelik-belirtme',"%20'sini"],['%6','iyelik',"%6'sı"],['%70','iyelik',"%70'i"],['%3,05','iyelik-belirtme',"%3,05'ini"],['%1000','iyelik',"%1000'i"],['%40','iyelik',"%40'ı"],['%3','belirtme',"%3'ü"],['%2','belirtme',"%2'yi"]])eq(K.ek(s,t),w,'ek '+s);
// Doğrulayıcı: gürültü σ 50 pikselden; ölçülen/kuram oranı tohumlar üzerinde ≈ 1, yayılımı ≈ %10
{for(const I0 of[200,2000,20000]){const r=[];for(let s=1;s<=40;s++){const C=K.chestStats(60,1,I0,s);eq(C.sdN,50,'σ şeridi 50 piksel');r.push(C.sdRef/C.sdTheory);}const m=r.reduce((a,b)=>a+b)/r.length,sd=Math.sqrt(r.reduce((a,b)=>a+(b-m)**2,0)/(r.length-1));ok(Math.abs(m-1)<0.05,`σ ölçülen/kuram ortalaması ${m}`);ok(sd>0.05&&sd<0.16,`σ oranı yayılımı ${sd}`);}}
// Doğrulayıcı: TOF ayrı rastgele akış kullanır; kaydedilen çiftler ve görüntü TOF'tan bağımsız
{const P0=K.petSim({n:20000,hx:5,hy:3,ratio:12,att:true,tofPs:0,seed:1});for(const tof of[600,400,200]){const P=K.petSim({n:20000,hx:5,hy:3,ratio:12,att:true,tofPs:tof,seed:1});eq(P.det,P0.det,'TOF çift sayısını değiştirmez '+tof);eq(P.est.x,P0.est.x);eq(P.est.y,P0.est.y);}}
{const ex={mode:'approx',answer:28.38,tol:0.01,pctOf:true};ok(/yüzde/.test(K.grade(ex,'0,2838').msg||''),'yüzde ipucu');}

// 12) Alıştırmalar: metinden geri oku, bağımsız çöz
const N=s=>Number(String(s).replace(/[  ]/g,'').replace('−','-').replace(',','.'));
const solve={
 hvlEx:q=>Math.log(2)/N(q.match(/μ = ([\d,]+) cm⁻¹/)[1]),
 nHvl:q=>Math.pow(2,-N(q.match(/(\d+) yarı değer/)[1])),
 echoDepth:q=>1540*N(q.match(/gönderdikten (\d+) µs/)[1])*1e-6/2*1000,
 larmorEx:q=>42.577478461*N(q.match(/([\d,]+) T'lık/)[1]),
 reflEx:q=>{const m=q.match(/Z = ([\d,]+) MRayl\) dokusundan .*Z = ([\d,]+) MRayl/),a=N(m[1]),b=N(m[2]);return 100*((b-a)/(b+a))**2;},
 transEx:q=>{const m=q.match(/μ = ([\d,]+) cm⁻¹ olan bir dokudan (\d+) cm/);return 100*Math.exp(-N(m[1])*N(m[2]));},
 huEx:q=>1000*(N(q.match(/μ = ([\d,]+) cm⁻¹ olan bir dokunun/)[1])-0.2059)/(0.2059-0.0002),
 dopplerEx:q=>{const m=q.match(/f₀ = ([\d,]+) MHz, kan hızı (\d+) cm\/s, .* açı (\d+)°/);return 2*N(m[1])*1e6*N(m[2])/100*Math.cos(N(m[3])*Math.PI/180)/1540;},
 decayEx:q=>100*Math.exp(-Math.log(2)*N(q.match(/Üretimden (\d+) dakika/)[1])/109.734),
 penEx:q=>{const m=q.match(/alma aralığı (\d+) dB.* ([\d,]+) MHz'lik/);return N(m[1])/(2*0.5*N(m[2]));},
 seEx:q=>{const m=q.match(/TR = (\d+) ms, TE = (\d+) ms .*T1 = (\d+), T2 = (\d+) ms.*T1 = (\d+), T2 = (\d+) ms/),[TR,TE,a1,a2,b1,b2]=m.slice(1).map(N);return(1-Math.exp(-TR/a1))*Math.exp(-TE/a2)/((1-Math.exp(-TR/b1))*Math.exp(-TE/b2));},
 doseEx:q=>{const d=N(q.match(/GOV\.UK: ([\d,]+) mSv/)[1]);if(/kaç göğüs filmine/.test(q))return d/0.02;const bg=N(q.match(/doğal ışınım ([\d,]+) mSv/)[1]);return d/(bg/365);},
 fatEx:q=>N(q.match(/gerçek kalınlığı ([\d,]+) cm/)[1])*10*1540/1430,
 petEx:q=>100*Math.exp(-0.096*N(q.match(/toplam (\d+) cm yol/)[1])),
};
const seen={1:new Set(),2:new Set(),3:new Set()};
for(const L of[1,2,3])for(let s=1;s<=400;s++){
 const ex=K.genExercise(L,s);seen[L].add(ex.type);ok(Number.isFinite(ex.answer),`L${L} s${s} cevap`);ok(!/NaN|undefined|Infinity/.test(ex.html+ex.steps.join('')+ex.hint),`L${L} s${s} metin`);
 const f=solve[ex.type];assert(f,'bağımsız çözücü yok: '+ex.type);const v=f(ex.html);
 ok(Math.abs(ex.answer-v)<=1e-6*Math.max(1,Math.abs(v)),`L${L} s${s} ${ex.type}: ${ex.answer} ≠ ${v}`);
 eq(K.grade(ex,ex.shown).status,'correct',`L${L} s${s} gösterilen cevap doğru sayılmalı (${ex.shown})`);
 eq(JSON.stringify(K.genExercise(L,s)),JSON.stringify(ex),'tohum tekrarlanabilir');}
for(const L of[1,2,3])eq([...seen[L]].sort().join(),[...K.GEN_TYPES[L]].sort().join(),'seviye '+L+' bütün türler');

// 13) Yaygın yanılgılar
ok(K.MISTAKE_IDS.length>=5,'en az beş yanılgı');
for(const id of K.MISTAKE_IDS)for(let s=1;s<=40;s++){const M=K.mistake(id,s),v=M.v;ok(Number.isFinite(M.wrong)&&Number.isFinite(M.right),id);
 if(id==='btTek'){eq(M.wrong,0,'tek izdüşüm ayıramaz');near(M.right,2,1e-12);continue;}
 if(id==='mrXray'){near(M.right,4.135667696e-15*42.577478461e6*v.B,1e-12);ok(M.wrong/M.right>1e10);continue;}
 if(id==='ikiHvl'){near(M.right,100/2**v.n,1e-12);ok(M.right>0);continue;}
 if(id==='doppler90'){eq(M.wrong,0);if(v.th<90)ok(M.right>0);continue;}
 if(id==='frekans'){ok(M.wrong>M.right,'düşük frekans daha derin');continue;}
 if(id==='dozOnemsiz'){near(M.right,v.n*v.d,1e-12);continue;}
 if(id==='dozEsit'){ok(M.right>5,'doz oranları çok farklı');continue;}
 if(id==='sesHizi'){near(M.right,100*((K.zOf(v.b)-K.zOf(v.a))/(K.zOf(v.b)+K.zOf(v.a)))**2,1e-12);ok(Math.abs(M.wrong-M.right)>0.5,'hız farkı yansıma değildir');continue;}}

console.log(`G tibbi-goruntuleme-fizigi: ${checks.toLocaleString('tr-TR')} bağımsız çekirdek kontrolü PASS`);

if(process.argv.includes('--browser')){
 const {createRequire}=await import('node:module');const {createServer}=await import('node:http');const {join,extname}=await import('node:path');const {fileURLToPath}=await import('node:url');const root=fileURLToPath(new URL('../',import.meta.url));
 let chromium;for(const dir of[root,...(process.env.NODE_PATH||'').split(':').filter(Boolean),'/opt/node-tools']){try{({chromium}=createRequire(join(dir,'package.json'))('playwright'));break;}catch(_){}}
 if(!chromium)({chromium}=await import('playwright'));
 const server=createServer((req,res)=>{const file=join(root,decodeURIComponent(new URL(req.url,'http://localhost').pathname));if(!file.startsWith(root)||!fs.existsSync(file)||fs.statSync(file).isDirectory()){res.writeHead(404).end();return;}res.setHeader('Content-Type',({'.html':'text/html; charset=utf-8','.js':'text/javascript; charset=utf-8','.css':'text/css; charset=utf-8'})[extname(file)]||'application/octet-stream');res.end(fs.readFileSync(file));});
 await new Promise(r=>server.listen(0,'127.0.0.1',r));let browser;const before=checks;
 // varsayılan durum için beklenen metinler çekirdekten
 const fx=K.fix,sp80=K.spectrum(80,2.5),H80=K.hvlPoly(sp80);
 const CT=K.ctStats(K.ctRun({nA:90,nd:128,I0:1e6,seed:1,filter:'ramlak'}),K.truthImage(K.abdPhantom()));
 const P0=K.petSim({n:20000,hx:5,hy:3,ratio:12,att:true,tofPs:0,seed:1});
 try{browser=await chromium.launch();
  for(const[width,theme]of[[390,'light'],[1280,'dark']]){
   const ctx=await browser.newContext({viewport:{width,height:900},deviceScaleFactor:width<500?2:1,locale:'tr-TR'});await ctx.addInitScript(t=>{localStorage.setItem('acelya-theme',t);localStorage.setItem('acelya-sound-muted','1');},theme);
   const page=await ctx.newPage();page.setDefaultTimeout(8000);const errors=[];page.on('pageerror',e=>errors.push(e.message));page.on('console',m=>{if(m.type()==='error'&&!/404|Failed to load resource/.test(m.text()))errors.push(m.text());});
   await page.goto(`http://127.0.0.1:${server.address().port}/tibbi-goruntuleme-fizigi.html`,{waitUntil:'load'});await page.waitForTimeout(600);
   const click=id=>page.locator('#'+id).click(),read=async id=>(await page.locator('#'+id).textContent()).trim(),has=async(id,t)=>{const s=await read(id);assert(s.includes(t),`[${width}] #${id}: "${s}" içinde "${t}" yok`);checks++;};
   const range=(id,v)=>page.locator('#'+id).evaluate((e,v)=>{e.value=v;e.dispatchEvent(new Event('input',{bubbles:true}));},v),pick=(id,v)=>page.locator('#'+id).selectOption(v),settle=(ms)=>page.waitForTimeout(ms||150);
   const noOverflow=async w=>{eq(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),true,`[${width}] yatay taşma: ${w}`);};
   const painted=async id=>{ok(assertCanvasDrawn(await canvasInk(page,'#'+id),{minDistinct:3,label:`[${width}] ${id}`}),`[${width}] ${id} boş`);};
   eq(await page.evaluate(()=>[...document.querySelectorAll('main input,main select')].filter(e=>!(e.labels&&e.labels.length)&&!e.getAttribute('aria-label')).map(e=>e.id).join()),'','etiketsiz denetim');
   eq(await page.evaluate(()=>[...document.querySelectorAll('main canvas')].every(c=>c.getAttribute('role')==='img'&&c.getAttribute('aria-label'))),true,'tuval rolü');
   eq(await page.evaluate(()=>/[̀-ͯ]/.test(document.querySelector('main').textContent)),false,'birleşik işaret');
   eq(await page.evaluate(()=>document.title.length<=80),true,'başlık ≤ 80');
   eq(await page.evaluate(()=>document.querySelectorAll('main input[type=number]').length),0,'type=number yok');
   await has('careNote','112');await has('careNote','tanı koymaz');
   eq(await page.evaluate(()=>[...document.querySelectorAll('main a[href$=".html"]')].map(a=>a.getAttribute('href')).filter(h=>h==='epidemiyoloji-ve-klinik-arastirma.html').length),1,'epidemiyoloji sayfasına bağlantı');
   eq(await page.evaluate(()=>/hazırlanıyor/.test(document.querySelector('main').textContent)),false,'hazırlanıyor ibaresi kalmadı');
   // sekme klavyesi
   await page.locator('#tab-t1').focus();await page.keyboard.press('ArrowRight');await settle(700);eq(await page.locator('#tab-t2').getAttribute('aria-selected'),'true');await page.keyboard.press('End');await settle();eq(await page.locator('#panel-t7').isVisible(),true);await page.keyboard.press('Home');await settle();eq(await page.locator('#panel-t1').isVisible(),true);await page.keyboard.press('ArrowLeft');await settle();eq(await page.locator('#tab-t7').getAttribute('aria-selected'),'true');await click('tab-t1');await settle(300);
   // 01
   await has('t1sStats','15,50 pm');await has('t1sStats',fx(sp80.mean,1)+' keV');await has('t1sStats',fx(H80.hvl1*10,1)+' mm');await has('t1sStatus','Kα');await painted('t1s');
   await range('t1kv',60);await settle();await has('t1sStatus','K çizgisi yok');await click('t1sP2');await settle();await has('t1sStats','10,33 pm');await click('t1sP1');await settle();await has('t1sStatus','Filtre yok');await click('t1sReset');await settle();await has('t1sStats','15,50 pm');
   await has('t1aStats','0,2171 cm⁻¹');await has('t1aStats','3,193 cm');await has('t1aStats','0,3378');await painted('t1a');
   await click('t1aP1');await settle(300);await has('t1aStatus','fotoelektrik');await pick('t1N','1000');await range('t1x',20);await settle(300);await has('t1aStatus','ölçülemez');await click('t1aReset');await settle(300);await has('t1aStats','3,193 cm');
   await has('t1pStats','%84,4');await has('t1pStats','%26,92');await has('t1pStatus',"%84'ü kemik");await has('t1pStatus',"%26,9'unu kesiyor");await has('t1pStats','doku olsaydı gelecek fotona göre');await has('t1pStats','(50 piksel)');await painted('t1p');await painted('t1r');await range('t1pr',0);await settle();await has('t1pStatus','Düğüm yok');await pick('t1pE','100');await settle();await has('t1pStats','%57,2');await pick('t1pI','200');await range('t1pr',2);await settle();await has('t1pStats','CNR');await click('t1pReset');await settle();await has('t1pStats','%84,4');
   await noOverflow('01');
   // 02
   await click('tab-t2');await settle(900);await painted('t2ph');await painted('t2sg');await painted('t2rc');await painted('t2pf');
   await has('t2Stats',fx(CT.rmse,0)+' HU');await has('t2Stats',fx(CT.tissue,0)+' HU');await has('t2Status','202');
   await click('t2P1');await settle(900);await has('t2Status','Yalnız 8 açı');await has('t2Status','çizgi artefaktlarından gelir');await click('t2P2');await settle(900);await has('t2Stats','birimsiz');await has('t2Status','1/r');await click('t2Reset');await settle(1200);await has('t2Stats',fx(CT.rmse,0)+' HU');
   await click('t2P3');await settle(900);await has('t2Status','1000 foton');await click('t2Reset');await settle(1200);
   await has('t2huOut','54,5 HU');await page.locator('#t2mu').fill('0.6044');await settle();await has('t2huOut','kortikal kemik');await page.locator('#t2mu').fill('abc');await settle();eq(await page.locator('#t2mu').getAttribute('aria-invalid'),'true');await page.locator('#t2mu').fill('0,2171');await settle();
   await noOverflow('02');
   // 03
   await click('tab-t3');await settle(500);await has('t3rStats','%28,244');await pick('t3b','air');await settle();await has('t3rStatus','jel');await pick('t3a','fat');await pick('t3b','fat');await settle();await has('t3rStatus','yankı yok');await click('t3rReset');await settle();await has('t3rStats','%28,244');
   await has('t3eRows','1,50 cm');await has('t3eRows','20,98 µs');await has('t3eRows','+1,2 mm');await painted('t3am');
   await pick('t3lay','bone');await settle();await has('t3aStatus','gölge');await pick('t3lay','fat');await settle();await has('t3eRows','4,31 cm');await has('t3aStatus',"yağ kalınlığının %7,7'si kadar");await pick('t3lay','cyst');await settle();await has('t3aStatus','güçlenme');await page.locator('#t3tgc').uncheck();await settle();await has('t3aStatus','TGC kapalı');await click('t3aReset');await settle();await has('t3eRows','20,98 µs');
   await has('t3sStats','0,308 mm');await has('t3sStats','evet');await range('t3rd',0.2);await settle();await has('t3sStats','hayır');await click('t3sReset');await settle();await has('t3sStats','evet');await painted('t3rs');
   await painted('t3bm');await pick('t3bf','15');await settle(400);await has('t3bStats','4,0 cm');await click('t3bReset');await settle(300);
   await has('t3dStats','1623 Hz');await painted('t3d');await click('t3dP1');await settle();await has('t3dStatus','90°');await click('t3dP2');await settle();await has('t3dStatus','örtüşme');await has('t3dStatus',"Hz'i aşıyor");await click('t3dReset');await settle();await has('t3dStats','1623 Hz');
   await noOverflow('03');
   // 04
   await click('tab-t4');await settle(500);await has('t4lStats','63,8662 MHz');await painted('t4l');await click('t4B3');await settle();await has('t4lStats','127,7324');await click('t4lReset');await settle();
   await has('t4cStatus','T1 ağırlıklı');await has('t4cStatus','en parlak yağ');await has('t4Rows','0,7023');await painted('t4c');await painted('t4img');
   await click('t4P2');await settle(300);await has('t4cStatus','T2 ağırlıklı');await has('t4cStatus','en parlak BOS');await click('t4P3');await settle(300);await has('t4cStatus','PD');await click('t4cReset');await settle(300);await has('t4cStatus','T1 ağırlıklı');
   await has('t4fStats','23,49 cm');await has('t4fStats','1,83 mm');await painted('t4fe');await range('t4G',40);await settle(300);await has('t4fStatus','katlanma');await pick('t4obj','wide');await range('t4G',15);await settle(300);await has('t4fStatus','katlanma');await click('t4fReset');await settle(300);await has('t4fStats','23,49 cm');
   await noOverflow('04');
   // 05
   await click('tab-t5');await settle(1200);await has('t5dStats','%46,9');await has('t5dStats','%79,4');await painted('t5dc');await pick('t5tr','tc99m');await settle();await has('t5dStats','6,0066 saat');await click('t5dReset');await settle();
   await has('t5Stats','510,999 keV');await has('t5Stats',K.fmt(P0.det,7));await painted('t5ring');await painted('t5img');
   await pick('t5tof','400');await settle(1200);await has('t5Stats','2,55');await has('t5Stats',K.fmt(P0.det,7));await has('t5Status','TOF 400 ps');await page.locator('#t5att').uncheck();await settle(1200);await has('t5Status','Zayıflama kapalı');await click('t5Reset');await settle(1500);await has('t5Stats',K.fmt(P0.det,7));
   await range('t5seed',3);await settle(1500);await has('t5Status','sıcak bölgeden geliyor');await range('t5c',1);await settle(1500);await has('t5Status','1 : 1');await click('t5Reset');await settle(1500);
   await noOverflow('05');
   // 06
   await click('tab-t6');await settle(300);await painted('t6c');await has('t6Stats','6,1–8 mSv');await has('t6Stats','2,5 yıl – 3,3 yıl');await has('t6Rows','22,7');
   await pick('t6ex','gogus');await settle();await has('t6Stats','0,02–0,1 mSv');await pick('t6bg','3');await settle();await has('t6Stats','2 gün – 12 gün');await click('t6Reset');await settle();await has('t6Stats','6,1–8 mSv');
   await noOverflow('06');
   // 07
   await click('tab-t7');await settle();const ex=await page.evaluate(()=>{const e=window.TGF.genExercise(1,1);return{shown:e.shown,html:e.html};});
   ok((await page.locator('#t7Q').innerHTML()).includes(ex.html));await page.locator('#t7A').fill('3 cm');await click('t7Check');await settle();await has('t7F','birimsiz');eq(await page.locator('#t7A').getAttribute('aria-invalid'),'true');
   await page.locator('#t7A').fill('99999');await click('t7Check');await settle();await has('t7F','Henüz değil');eq(await page.locator('#t7H').isVisible(),false);await click('t7Hint');eq(await page.locator('#t7H').isVisible(),true);
   await page.locator('#t7A').fill(ex.shown);await page.locator('#t7A').press('Enter');await settle();await has('t7F','Doğru');await has('t7Score','1 soru doğru, 2 denetleme');
   await click('t7Sol');eq(await page.locator('#t7SolBox').isVisible(),true);await click('t7Next');await settle();await has('t7SOut','2');eq(await page.locator('#t7SolBox').isVisible(),false);
   for(const L of['2','3']){await pick('t7L',L);await settle();const e=await page.evaluate(L=>window.TGF.genExercise(+L,2).shown,L);await page.locator('#t7A').fill(e);await click('t7Check');await settle();await has('t7F','Doğru');}
   await click('t7Reset');await settle();await has('t7Score','0 soru doğru');eq(await page.locator('#t7L').inputValue(),'1');
   eq(await page.locator('.tg-mcard').count(),8,'sekiz yanılgı kartı');const m0=await read('m-ikiHvl');await click('mb-ikiHvl');await settle();ok(m0!==await read('m-ikiHvl'),'Başka sayılar');await has('m-btTek','ayırt edemez');
   await noOverflow('07');
   await click('tab-t4');await settle(300);await page.evaluate(t=>document.documentElement.setAttribute('data-theme',t),theme==='light'?'dark':'light');await page.waitForTimeout(300);await painted('t4c');
   eq(errors.join(' | '),'',`[${width}] konsol hatası`);await ctx.close();
  }
  console.log(`G tibbi-goruntuleme-fizigi: ${checks-before} kalıcı tarayıcı kontrolü PASS (390 px açık, 1280 px koyu)`);
 }finally{await browser?.close();await new Promise(r=>server.close(r));}
}
