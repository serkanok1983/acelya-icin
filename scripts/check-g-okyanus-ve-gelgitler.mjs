// Okyanus ve gelgitler laboratuvarı: çekirdeğin bağımsız denetimi (+ --browser ile arayüz denetimi).
// Başvurular sayfanın yöntemlerini tekrar etmez: gelgit ivmesi için kuvvet serisi ve Legendre açılımı, NASA bilgi
// sayfalarındaki GM değerleri ve Wikipedia'daki %46 / 54 cm / 25 cm; bileşen hızları (°/sa) üzerinden vuru dönemi;
// harmonik uyum için Gram–Schmidt QR ve rastgele evreli sentetik kayıt; UNESCO raporunun sınama yoğunlukları;
// dispersiyon için sayısal türev ve iki sınır; sığlaşma için enerji akısının korunumu.
// Kullanım: node scripts/check-g-okyanus-ve-gelgitler.mjs [--browser]
import fs from 'node:fs';
import vm from 'node:vm';
import assert from 'node:assert/strict';
const SLUG='okyanus-ve-gelgitler';
const html=fs.readFileSync(new URL(`../${SLUG}.html`,import.meta.url),'utf8');
const source=html.split('/* KERNEL-BEGIN */')[1]?.split('/* KERNEL-END */')[0];
assert(source,'KERNEL sınırları gerekli');
const context={window:{}};vm.createContext(context);vm.runInContext(source,context);
const K=context.window.OceanLab;assert(K&&Object.isFrozen(K),'OceanLab dondurulmuş olmalı');
let checks=0;
const ok=(c,msg)=>{assert(c,msg);checks++;};
const eq=(a,b,msg='')=>{assert.equal(a,b,msg+` (${a} ≠ ${b})`);checks++;};
const near=(a,b,tol=1e-9,msg='')=>{assert(Number.isFinite(a)&&Math.abs(a-b)<=tol*Math.max(1,Math.abs(b)),`${msg} ${a} ≠ ${b} (tol ${tol})`);checks++;};
const rel=(a,b,tol,msg='')=>{assert(Number.isFinite(a)&&Math.abs(a/b-1)<=tol,`${msg} ${a} / ${b} − 1 = ${a/b-1} (tol ${tol})`);checks++;};

/* ── 1. Gelgit kuvveti ── */
const C=K.C;
// NASA: Ay GM = 0.00490 × 10⁶ km³/s², Güneş GM = 132 712 × 10⁶ km³/s² (kütle oranı × Dünya GM ile tutarlı mı?)
rel(K.muOf(C.MM),4.90e12,2e-3,'Ay GM');rel(K.muOf(C.MS),1.32712e20,2e-5,'Güneş GM');
rel(C.GME/C.R**2,9.82,2e-3,'GM/R² ≈ 9.82 (dönmesiz yüzey çekimi)');
// yakın yüz: GM/d²[(1 − x)⁻² − 1] = (GM/d²) Σ (n+1)xⁿ (n ≥ 1); uzak yüz: Σ (n+1)(−x)ⁿ ile
const series=(mu,d,sgn)=>{const x=C.R/d;let s=0,t=1;for(let n=1;n<400;n++){t*=sgn*x;s+=(n+1)*t;if(Math.abs(t)<1e-18)break;}return mu/(d*d)*s;};
for(const m of[0.1,1,3.7,10])for(const dM of[10,20,50,150,363.3,384.4,405.5,500]){const r=K.tide(m,dM),mu=K.muOf(m*C.MM),d=dM*1e6;
 rel(r.near,series(mu,d,1),1e-9,'yakın yüz serisi');rel(r.far,-series(mu,d,-1),1e-9,'uzak yüz serisi');
 rel(r.approx,2*mu*C.R/d**3,1e-12,'2GMR/d³');rel(r.side,mu*C.R/(d*d+C.R*C.R)**1.5,1e-9,'yan nokta (geometri)');
 // Legendre açılımı: η(θ) = (μ/g) Σₙ≥₂ Rⁿ/dⁿ⁺¹ Pₙ(cos θ); en büyük θ = 0'da
 const g0=C.GME/C.R**2,etaL=th=>{const c=Math.cos(th);let p0=1,p1=c,s=0;for(let n=2;n<300;n++){const p2=((2*n-1)*c*p1-(n-1)*p0)/n;const term=(C.R/d)**n/d*p2;s+=term;p0=p1;p1=p2;if(Math.abs(C.R/d)**n<1e-17)break;}return mu/g0*s;};
 rel(r.eq.high,etaL(0),1e-7,'denge tepesi (Legendre)');let lo=Infinity;for(let i=0;i<=20000;i++){const v=etaL(Math.PI*i/20000);if(v<lo)lo=v;}rel(r.eq.low,lo,2e-6,'denge çukuru (Legendre taraması)');
 rel(r.eqTh,1.5*mu/g0*C.R**2/d**3,1e-12,'P₂ yükselti farkı');
}
// gelgit ivmesi, gelgit potansiyelinin eksi gradyanıdır (iki ayrı fonksiyon tutarlı mı)
for(const[x,y]of[[1,0],[0,1],[-1,0],[0.6,0.8],[-0.3,0.5]]){const mu=K.muOf(C.MM),d=C.DM,X=x*C.R,Y=y*C.R,h=10;const a=K.field(mu,d,X,Y,'tidal');
 rel(a[0]===0?1:a[0],a[0]===0?1:-(K.tidalPotential(mu,d,X+h,Y)-K.tidalPotential(mu,d,X-h,Y))/(2*h),2e-4,'ax = −∂Φ/∂x');if(Math.abs(a[1])>1e-12)rel(a[1],-(K.tidalPotential(mu,d,X,Y+h)-K.tidalPotential(mu,d,X,Y-h))/(2*h),2e-4,'ay = −∂Φ/∂y');
 const pull=K.field(mu,d,X,Y,'pull'),cen=K.field(mu,d,X,Y,'centre');near(a[0],pull[0]-cen[0],1e-15);near(a[1],pull[1]-cen[1],1e-15);}
// asimptot: hata ≈ 3R/(2d), eğim → −1
{const mu=K.muOf(C.MM);for(const q of[100,300,1000]){rel(K.relErrNear(mu,q*C.R),1.5/q,2/q,'hata ≈ 3R/2d');}
 const sl=n=>{const a=K.relErrNear(mu,n*C.R*1.01),b=K.relErrNear(mu,n*C.R/1.01);return Math.log(a/b)/Math.log(1.01**2);};near(sl(5000),-1,1e-3);ok(sl(60.34)<-1.01&&sl(60.34)>-1.04,'Ay uzaklığında eğim −1.02 civarı');ok(sl(3)<-1.5,'yakında eğim −1 değil');}
// Wikipedia (Tide): Güneş etkisi Ay'ınkinin ≈ %46'sı; denge gelgiti ≈ 54 cm (Ay), ≈ 25 cm (Güneş), 79 / 29 cm
{const r=K.tide(1,384.4);near(r.ratioTh,(C.MS/C.MM)*(C.DM/C.DS)**3,1e-12);near(r.ratioTh,0.459,2e-3,'%46');ok(Math.abs(r.eq.range-0.54)<0.01,'≈ 54 cm');ok(Math.abs(r.sun.eq.range-0.25)<0.01,'≈ 25 cm');
 ok(Math.abs(r.spring-0.79)<0.01&&Math.abs(r.neap-0.29)<0.01,'79 / 29 cm');ok(r.ratio<r.ratioTh&&r.ratioEq<r.ratioTh,'tam oran formülden küçük (Ay yaklaşımı eksik)');
 near(r.errNear,0.02542,2e-4);near(r.errFar,-0.02432,2e-4);near(r.slope,-1.0225,1e-3);}
for(const bad of[[0,384],[1,6],[-1,100]]){assert.throws(()=>K.tide(...bad));checks++;}

/* ── 2. Gelgit takvimi ── */
// hızlar (°/sa, kaynak tablosu): M₂ 28.9841042, S₂ 30, K₁ 15.0410686, O₁ 13.9430356 ⇒ dönemler
rel(K.CONS[0].T,360/28.9841042,3e-7);rel(K.CONS[1].T,360/30,1e-12);rel(K.CONS[2].T,360/15.0410686,3e-7);rel(K.CONS[3].T,360/13.9430356,3e-7);
rel(K.SN_THEORY,360/(30-28.9841042)/24,3e-7,'büyük–küçük gelgit dönemi (hız farkından)');near(K.SN_THEORY,14.765,1e-4);
rel(K.rayleigh(2,3),360/(15.0410686-13.9430356)/24,3e-6);
// uç bulucu: saf kosinüsün tepeleri tam katlarda
{const T=K.CONS[0].T,hw=K.extrema(t=>Math.cos(2*Math.PI*t/T),0,100,0.25,'max');hw.forEach((e,i)=>{near(e.t,(i+1)*T,1e-4);near(e.v,1,1e-5);});
 const v=K.vertex3([0,1],[1.3,3],[3,2]),a=-(1.56667/2.21),b=(1-9*a)/3;near(v.t,-b/(2*a),1e-4,"vertex3");near(v.v,1-b*b/(4*a),1e-4,"vertex3 y");}
for(const st of Object.keys(K.STATIONS)){const A=K.STATIONS[st];for(const days of[30,45,90]){const sn=K.springNeap(A,days);ok(sn.ok,'ölçülebilir '+st);rel(sn.period,K.SN_THEORY,st==='biloxi'?5e-3:3e-4,'dönem '+st+' '+days);
  if(sn.springRange!==null)rel(sn.springRange,2*(A[0]+A[1]),2e-3,'büyük açıklık');if(sn.neapRange!==null&&Math.abs(A[0]-A[1])>5)rel(sn.neapRange,2*Math.abs(A[0]-A[1]),5e-3,'küçük açıklık');}}
eq(K.springNeap([58,13.7,0,0],10).ok,false,'10 gün yetmez');eq(K.springNeap([58,0,10,0],30).why,'mod','S₂ yoksa tanımsız');
rel(K.inequality([58,0,0,0],30).perDay,24/K.CONS[0].T,1e-4,'yalnız M₂: günde 1.932');near(K.inequality([58,0,0,0],30).meanDiff,0,1e-4);
ok(K.inequality(K.STATIONS.biloxi,30).perDay<1.2,'Biloxi günlük');ok(K.inequality(K.STATIONS.sf,30).meanDiff>50,'SF eşitsiz');
// uyum: kendi rastgele evreli sentetik kaydımız, gürültüsüz ⇒ genlik ve evre tam
let sd=11;const rnd=()=>{sd=(sd*1103515245+12345)%2147483648;return sd/2147483648;};
for(let it=0;it<20;it++){const A=[0,1,2,3].map(()=>5+100*rnd()),ph=[0,1,2,3].map(()=>360*rnd()-180),mean=20*rnd()-10,days=20+Math.floor(40*rnd());const t=[],y=[];
 for(let i=0;i<=days*24;i++){t.push(i);let v=mean;for(let j=0;j<4;j++)v+=A[j]*Math.cos(2*Math.PI*i/K.CONS[j].T-ph[j]*Math.PI/180);y.push(v);}
 const f=K.harmonicFit(t,y,[0,1,2,3]);ok(f.ok);near(f.mean,mean,1e-6);f.comps.forEach((c,k)=>{rel(c.A,A[k],1e-6,'genlik');near(((c.phase-ph[k]+540)%360)-180,0,1e-5,'evre');});near(f.rms,0,1e-6);}
// Gram–Schmidt QR ile bağımsız en küçük kareler: gürültülü kayıtta katsayılar aynı mı
function qrLS(cols,y){const Q=[],R=cols.map(()=>new Array(cols.length).fill(0));cols.forEach((c,j)=>{let v=c.slice();for(let k=0;k<j;k++){const r=Q[k].reduce((s,q,i)=>s+q*c[i],0);R[k][j]=r;v=v.map((x,i)=>x-r*Q[k][i]);}
 for(let k=0;k<j;k++){const r=Q[k].reduce((s,q,i)=>s+q*v[i],0);R[k][j]+=r;v=v.map((x,i)=>x-r*Q[k][i]);}const n=Math.hypot(...v);R[j][j]=n;Q.push(v.map(x=>x/n));});
 const qy=Q.map(q=>q.reduce((s,x,i)=>s+x*y[i],0)),x=new Array(cols.length).fill(0);for(let i=cols.length-1;i>=0;i--){let s=qy[i];for(let k=i+1;k<cols.length;k++)s-=R[i][k]*x[k];x[i]=s/R[i][i];}return x;}
for(const[days,set]of[[30,'all'],[8,'all'],[30,'semi'],[15,'m2']]){const rec=K.record(K.STATIONS.sf,days,5,7),idx=K.FITSETS[set];const cols=[rec.t.map(()=>1)];idx.forEach(i=>{const w=2*Math.PI/K.CONS[i].T;cols.push(rec.t.map(t=>Math.cos(w*t)),rec.t.map(t=>Math.sin(w*t)));});
 const x=qrLS(cols,rec.y),f=K.harmonicFit(rec.t,rec.y,idx);f.coef.forEach((c,i)=>near(c,x[i],1e-7,'QR = normal denklemler'));}
// istatistik: 60 tohumda M₂ genlik hatasının standart sapması ≈ σ√(2/N)
{const errs=[];for(let seed=1;seed<=60;seed++){const rec=K.record(K.STATIONS.sf,30,5,seed);errs.push(K.harmonicFit(rec.t,rec.y,[0,1,2,3]).comps[0].A-58);}
 const m=errs.reduce((a,b)=>a+b,0)/errs.length,sdv=Math.sqrt(errs.reduce((a,b)=>a+(b-m)**2,0)/(errs.length-1));rel(sdv,5*Math.sqrt(2/721),0.3,'σ√(2/N)');ok(Math.abs(m)<0.15,'yansız');}
ok(K.harmonicFit(...Object.values(K.record(K.STATIONS.sf,5,5,7)).slice(0,2),[0,1,2,3]).cond>K.harmonicFit(...Object.values(K.record(K.STATIONS.sf,30,5,7)).slice(0,2),[0,1,2,3]).cond*2,'kısa kayıt kötü koşullu');
{const a=K.rng(5),b=K.rng(5);for(let i=0;i<10;i++)eq(a(),b());const g=K.gaussRng(3);let s=0,s2=0;for(let i=0;i<20000;i++){const v=g();s+=v;s2+=v*v;}ok(Math.abs(s/20000)<0.03&&Math.abs(s2/20000-1)<0.04,'Gauss');}
{const S=[[4,1,0],[1,3,1],[0,1,2]],e=K.symEig(S);near(e[0]+e[1]+e[2],9,1e-12);near(e[0]*e[1]*e[2],18,1e-10);}

/* ── 3. Deniz suyu ── */
// UNESCO Tech. Pap. Mar. Sci. 44, s. 22 (python-seawater sınama değerleri), T₆₈ ölçeğinde
for(const[S,T68,r]of[[0,0,999.842594],[0,30,995.65113374],[35,0,1028.10633141],[35,30,1021.72863949]])near(K.rhoUnesco(T68/1.00024,S),r,1e-10,'UNESCO '+S+','+T68);
ok(Math.abs(K.rhoUnesco(25,35)-1023.6)<0.5,'Wikipedia: 25 °C, 35 ⇒ ≈ 1023.6 kg/m³');ok(K.rhoUnesco(20,35)>1020&&K.rhoUnesco(-1,38)<1032,'yüzey aralığı');
near(K.maxDensityT(0),3.98,2e-3,'saf su en yoğun ≈ 4 °C');eq(K.maxDensityT(34.5),null,'deniz suyunda −2 °C altında');ok(K.maxDensityT(10)<K.maxDensityT(0),'tuz en yoğun sıcaklığı düşürür');
// doğrusal denklem: kendi merkezi farkımızla teğet
{const h=1e-4;rel(K.LIN.rT,(K.rhoUnesco(10+h,35)-K.rhoUnesco(10-h,35))/(2*h),1e-5);rel(K.LIN.rS,(K.rhoUnesco(10,35+h)-K.rhoUnesco(10,35-h))/(2*h),1e-5);}
for(let it=0;it<60;it++){const A={T:-2+30*rnd(),S:30+10*rnd()},B={T:-2+30*rnd(),S:30+10*rnd()},f=rnd();
 const lin=K.mix(A,B,f,'linear');near(lin.excess,0,1e-9,'doğrusal ⇒ fazla yok');
 const m=K.mix(A,B,f,'unesco');ok(m.excess>-0.02,'büyük ΔS, küçük ΔT ile fazla biraz negatif olabilir, ama −0.02 kg/m³ altına inmez');if(Math.abs(m.excess)>0.002)eq(Math.sign(m.excess),Math.sign(m.excessTh),'işaret ikinci mertebe ile aynı');
 // bağımsız: fazlayı doğrudan tanımdan, çekirdeğin mix'ini kullanmadan
 const rho=K.rhoUnesco,d=rho(f*A.T+(1-f)*B.T,f*A.S+(1-f)*B.S)-(f*rho(A.T,A.S)+(1-f)*rho(B.T,B.S));near(m.excess,d,1e-9);
 if(Math.abs(A.T-B.T)>3&&Math.abs(A.T-B.T)<15)rel(m.excessTh,m.excess,0.15,'ikinci mertebe');else if(Math.abs(A.T-B.T)>=15)rel(m.excessTh,m.excess,0.25,'ikinci mertebe (büyük ΔT)');
 near(1+m.contr,(1/m.rM)/(f/m.rA+(1-f)/m.rB),1e-12);}
{const A={T:2,S:34.5},Sb=K.equalDensityS(15,K.rhoUnesco(2,34.5),'unesco');near(K.rhoUnesco(15,Sb),K.rhoUnesco(2,34.5),1e-9);near(Sb,37.0726,1e-3);
 const m=K.mix(A,{T:15,S:37.07},0.5,'unesco');near(m.excess,0.243,2e-3);ok(m.rM>m.rA&&m.rM>m.rB,'eşit yoğunluklu iki sudan daha ağır karışım');
 const q=K.mix(A,{T:15,S:37.07},0.25,'unesco');rel(q.excess/m.excess,0.75,0.05,'f(1 − f) ölçeklemesi');
 const e1=K.mix({T:9,S:34.8},{T:11,S:35.2},0.5,'unesco').excess,e2=K.mix({T:9.5,S:34.9},{T:10.5,S:35.1},0.5,'unesco').excess;rel(e2/e1,0.25,0.01,'Δ² ölçeklemesi');}
// sütun: N² kendi sonlu farkımızla (adım 0.01 m), kararlılık bayrakları
for(const key of Object.keys(K.COLUMNS))for(const eos of['unesco','linear']){const p=K.COLUMNS[key],c=K.column(p,eos),rho=K.rhoOf(eos),X=(z,a,b)=>b+(a-b)*0.5*(1-Math.tanh((z-p.zc)/p.w));
 const r=z=>rho(X(z,p.Ts,p.Td),X(z,p.Ss,p.Sd)),h=0.01,N2=9.80665/r(p.zc)*(r(p.zc+h)-r(p.zc-h))/(2*h);rel(c.N2c,N2,5e-4,'N²(z_c) '+key);rel(c.N2th,c.N2c,2e-3,'doğrusallaştırılmış kuram '+key);
 eq(c.unstable,key==='kararsiz','kararsızlık '+key);near(c.drho,r(1000)-r(0),1e-9);}
{const m=K.mix({T:-2,S:40},{T:0,S:30},0.5,'unesco');ok(m.excess<-0.01,'soğuk suda büyük ΔS: karışım hafifler');}
ok(K.column({Ts:10,Td:10,Ss:35,Sd:35,zc:100,w:20},'unesco').flat,'karışık sütun');

/* ── 4. Dalgalar ── */
const g=9.80665;
for(const L of[0.5,5,100,1000,2e5])for(const h of[0.1,1,10,100,4000]){const W=K.wave(L,h),k=2*Math.PI/L;near(W.omega**2,g*k*Math.tanh(k*h),1e-12,'dispersiyon');
 const dk=k*1e-5,num=(Math.sqrt(g*(k+dk)*Math.tanh((k+dk)*h))-Math.sqrt(g*(k-dk)*Math.tanh((k-dk)*h)))/(2*dk);rel(W.cg,num,1e-7,'c_g = dω/dk (sayısal)');
 rel(K.solveK(W.omega,h),k,1e-10,'ters dispersiyon');ok(W.cg<=W.c*(1+1e-12)&&W.cg>=W.c/2*(1-1e-12),'c/2 ≤ c_g ≤ c');}
rel(K.wave(1,20).c,Math.sqrt(g/(2*Math.PI)),1e-12,'derin sınır');near(K.wave(1,20).ratio,0.5,1e-12);rel(K.wave(1e4,1).c,Math.sqrt(g),2e-4,'sığ sınır');
rel(Math.sqrt(g*4000),198.06,1e-4,'4 km ⇒ ≈ 200 m/s');eq(K.wave(100,4000).regime,'deep');eq(K.wave(100,1).regime,'shallow');eq(K.wave(100,10).regime,'mid');
for(const[L,h,tc,tg]of[[100,4000,6e-3,4e-3],[100,10,3e-3,1e-3],[100,1,1e-4,1e-4],[2e5,4000,1e-3,1e-3],[3,0.5,4e-3,2e-3]]){const r=K.measurePacket(L,h);rel(r.cMeas,r.c,tc,'tepe hızı '+L+'/'+h);rel(r.cgMeas,r.cg,tg,'zarf hızı '+L+'/'+h);}
// paket: t = 0'da zarfın tepesi x = 0'da ve η(0,0) = 1 (ağırlıklar normalize)
{const W=K.wave(100,4000),cs=K.packetComps(W.k,4000);eq(cs.length,K.PACKET_N);near(K.packetAt(cs,W.k,W.omega,0,0).eta,1,1e-12);near(K.packetAt(cs,W.k,W.omega,0,0).env,1,1e-12);}
for(const[L,h0,h1]of[[2e5,4000,10],[100,4000,10],[100,4000,2],[1e4,500,5]]){const s=K.shoal(L,h0,h1,0.5),W0=K.wave(L,h0),cg1=K.cg(K.solveK(W0.omega,h1),h1);
 near(0.25*W0.cg,s.A1**2*cg1,1e-10,'enerji akısı korunur');rel(s.A1green,0.5*(h0/h1)**0.25,1e-12);rel(2*Math.PI/s.lambda1*h1*Math.tanh(2*Math.PI/s.lambda1*h1)*g/h1,W0.omega**2,1e-9,'dönem sabit');}
rel(K.shoal(2e5,4000,10,0.5).A1,K.shoal(2e5,4000,10,0.5).A1green,5e-3,'tsunami: Green ≈ enerji akısı');ok(K.shoal(100,4000,10,0.5).A1<0.5,'rüzgâr dalgası: Green geçersiz');
for(const[v,x]of[[3.602,4000],[5.301,2e5],[2,100],[1,10],[0,1],[-1,0.1],[3,1000]])near(K.logVal(v),x,1e-12,'logVal '+v);
console.log(`G okyanus ve gelgitler: ${checks.toLocaleString('tr-TR')} bağımsız çekirdek kontrolü PASS`);

if(process.argv.includes('--browser')){
 const {createRequire}=await import('node:module');const {createServer}=await import('node:http');const {join,extname}=await import('node:path');const {fileURLToPath}=await import('node:url');const root=fileURLToPath(new URL('../',import.meta.url));
 let chromium;for(const dir of[root,...(process.env.NODE_PATH||'').split(':').filter(Boolean)]){try{({chromium}=createRequire(join(dir,'package.json'))('playwright'));break;}catch(_){}}if(!chromium)({chromium}=await import('playwright'));
 const server=createServer((req,res)=>{const file=join(root,decodeURIComponent(new URL(req.url,'http://localhost').pathname));if(!file.startsWith(root)||!fs.existsSync(file)||fs.statSync(file).isDirectory()){res.writeHead(404).end();return;}res.setHeader('Content-Type',({'.html':'text/html; charset=utf-8','.js':'text/javascript; charset=utf-8','.css':'text/css; charset=utf-8'})[extname(file)]||'application/octet-stream');res.end(fs.readFileSync(file));});await new Promise(r=>server.listen(0,'127.0.0.1',r));let browser;
 try{browser=await chromium.launch();const before=checks;
 for(const[width,theme]of[[390,'light'],[1280,'dark']]){const ctx=await browser.newContext({viewport:{width,height:900},deviceScaleFactor:width===390?2:1,locale:'tr-TR'});await ctx.addInitScript(t=>{localStorage.setItem('acelya-theme',t);localStorage.setItem('acelya-sound-muted','1');},theme);const page=await ctx.newPage();page.setDefaultTimeout(8000);const errors=[];page.on('pageerror',e=>errors.push(e.message));page.on('console',m=>{if(m.type()==='error'&&!/Failed to load resource/.test(m.text()))errors.push(m.text());});page.on('response',r=>{if(r.status()>=400)errors.push(r.status()+' '+r.url());});await page.goto(`http://127.0.0.1:${server.address().port}/${SLUG}.html`,{waitUntil:'load'});await page.waitForTimeout(400);
  const click=id=>page.locator('#'+id).click(),read=async id=>(await page.locator('#'+id).textContent()).trim(),set=(id,v)=>page.locator('#'+id).evaluate((e,v)=>{if(e.type==='checkbox')e.checked=v;else e.value=v;e.dispatchEvent(new Event(e.tagName==='SELECT'||e.type==='checkbox'?'change':'input',{bubbles:true}));},v),is=async(id,t)=>{const got=await read(id);assert.equal(got,t,id);checks++;},has=async(id,t)=>{const got=await read(id);assert(got.includes(t),`${id}: "${got}" içinde "${t}" yok`);checks++;},hasnt=async(id,t)=>{const got=await read(id);assert(!got.includes(t),`${id}: "${got}" içinde "${t}" olmamalı`);checks++;},noflow=async tag=>{eq(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),true,'yatay taşma: '+tag+' @'+width);};
  const painted=async id=>{const n=await page.locator('#'+id).evaluate(c=>{const g=c.getContext('2d'),d=g.getImageData(0,0,c.width,c.height).data;const set=new Set();for(let i=0;i<d.length;i+=4)set.add((d[i]>>4)+','+(d[i+1]>>4)+','+(d[i+2]>>4));return set.size;});ok(n>4,'tuval boş: '+id);};
  eq(await page.evaluate(()=>[...document.querySelectorAll('.app-content input,.app-content select')].filter(e=>!e.labels||!e.labels.length).map(e=>e.id).join(',')),'','etiketsiz denetim');
  eq(await page.evaluate(()=>[...document.querySelectorAll('.app-content canvas')].every(c=>c.getAttribute('role')==='img'&&c.getAttribute('aria-label'))),true);eq(await page.evaluate(()=>Object.isFrozen(OceanLab)&&!Object.getOwnPropertyDescriptor(window,'OceanLab').writable),true);
  eq(await page.evaluate(()=>/[̀-ͯ]/.test(document.body.innerText)),false,'birleşik işaret yok');eq(await page.evaluate(()=>document.body.dataset.page),SLUG);
  eq(await page.evaluate(()=>[...document.querySelectorAll('.app-content input[type=range]')].every(e=>{const s=+e.step,v=(+e.value-+e.min)/s;return Math.abs(v-Math.round(v))<1e-6;})),true,'varsayılanlar adım ızgarasında');
  // 01
  await is('fNear','1,128 × 10⁻⁶ m/s²');await is('fApprox','1,100 × 10⁻⁶ m/s²');await is('fErr','+2,54 % · −2,43 %');await is('fErrTh','±2,49 %');await is('fSlope','−1,023 · −1');
  await is('fHL','+0,363 m · −0,178 m');await is('fEta','0,541 m');await is('fEtaTh','0,535 m · +1,12 %');await is('fRatio','0,4479');await is('fRatioTh','0,4592 · −2,47 %');await is('fSun','0,246 m · 0,787 m · 0,295 m');
  await has('fStatus','iki şişkinlik');await hasnt('fStatus','Uyarı');await painted('fCanvas');await painted('fChart');await noflow('force');
  await click('fPrePeri');await is('fEta','0,641 m');await is('fDOut','363,3 bin km · 57,02 R');await click('fPreApo');await is('fEta','0,461 m');await is('fRatio','0,5264');
  await click('fPreNear');await has('fStatus','Uyarı');await is('fErr','+81,04 % · −33,32 %');await is('fDOut','20,0 bin km · 3,14 R');
  await set('fView','pull');await set('fView','centre');await set('fView','approx');await set('fBulge',false);await painted('fCanvas');
  await set('fM',10);await set('fD',500);await is('fMOut','10,0 × Ay');await has('fStatus','yaklaşık eşit ama ters');await set('fM',0.1);await set('fD',10);await has('fStatus','Uyarı');await has('fStatus','birinci mertebe yetmez');await hasnt('fStatus','eşit ama ters');await click('fReset');await is('fEta','0,541 m');eq(await page.locator('#fView').inputValue(),'tidal');eq(await page.locator('#fBulge').isChecked(),true);
  await set('fD',150);await page.locator('h1').click();await page.keyboard.press('r');await is('fDOut','384,4 bin km · 60,34 R');
  // 02
  await click('tab-cal');await page.waitForTimeout(100);await is('cSN','14,767 gün');await is('cSNth','14,765 gün · +0,01 %');await is('cRange','143,4 · 88,6 cm');await is('cRangeTh','143,4 · 88,6 cm');await is('cHW','1,932 · yarım günlükte 1,932');await is('cIneq','79,2 cm');await is('cF','0,834');await is('cRay','14,77 · 13,66 gün');await is('cRms','4,98 cm · 5,0 cm');await is('cCond','1,48 · 0,26 cm');
  eq(await page.locator('#cRows tr').count(),4);await has('cRows','57,99');await painted('cCanvas');await painted('cZoom');await noflow('cal');
  await set('cSta','eastport');await is('cM2Out','268,7 cm');await is('cRange','621,4 · 453,4 cm');await is('cF','0,089');
  await set('cSta','biloxi');await has('cHW','1,037');await is('cF','4,597');await set('cSta','m2s2');await is('cIneq','1,9 cm');await is('cF','0,000');
  await set('cSta','sf');await set('cDays',10);await is('cSN','— (kayıt kısa)');await has('cStatus','ayırma süresinden');await has('cStatus','σ√(2/N) = 0,46 cm');await has('cCond','0,46 cm');await set('cDays',5);await set('cDays',90);await is('cDaysOut','90 gün');
  await set('cDays',30);await set('cFitSet','m2');await is('cRms','33,62 cm · 5,0 cm');await has('cStatus','sızar');await has('cStatus','Uyumda S₂, K₁, O₁ yok');await has('cRows','uydurulmadı');
  await set('cS2',0);eq(await page.locator('#cSta').inputValue(),'serbest');await is('cSN','— (S₂ ya da M₂ yok)');
  for(const id of['cM2','cS2','cK1','cO1'])await set(id,0);await has('cStatus','Bütün genlikler sıfır');await is('cHW','—');await set('cNoise',0);await set('cNoise',30);await set('cSeed',99);await noflow('cal 0');
  await click('cReset');await is('cSN','14,767 gün');await is('cM2Out','58,0 cm');eq(await page.locator('#cFitSet').inputValue(),'all');
  // 03
  await click('tab-ts');await page.waitForTimeout(100);await is('tRhoAB','1027,571 · 1027,569 kg/m³');await is('tRhoM','1027,813 kg/m³');await is('tExcess','+0,243 kg/m³');await is('tExcessTh','+0,242 kg/m³ · +0,6 %');await is('tContr','−2,37 × 10⁻⁴');await is('tTmax','3,98 °C · −2 °C altında');
  await is('tN2','5,86 × 10⁻⁴ s⁻²');await is('tN2max','6,16 × 10⁻⁴ s⁻² · 112 m');await is('tNper','4,2 dk');await is('tDrho','+4,796 kg/m³');await has('tColStatus','doğrusal olmamasından');await painted('tCanvas');await painted('tCol');await noflow('ts');
  await click('tPreCold');await is('tSBOut','36,20');await is('tExcess','+0,282 kg/m³');await click('tPreSalt');await has('tStatus','neredeyse doğrusal');await set('tEos','linear');await is('tExcess','0,000 kg/m³');await has('tStatus','Doğrusal durum denkleminde');
  await set('tEos','unesco');await set('tTA',-2);await set('tSA',40);await set('tTB',30);await click('tEqual');await has('tStatus','30–40 aralığının dışında');await set('tTA',2);await set('tSA',34.5);await set('tTB',15);await click('tEqual');await is('tSBOut','37,07');await set('tTA',-2);await set('tSA',40);await set('tTB',0);await set('tSB',30);await has('tStatus','daha hafif');
  await set('tF',0);await has('tStatus','karışım yok');await set('tF',1);await set('tTA',-2);await set('tTA',30);await set('tSA',30);await set('tSA',40);
  await set('tCPre','kutup');await has('tColStatus','sıcaklık farkı sütunu bozmaya');await set('tCPre','kararsiz');await has('tColStatus','Kararsız');await is('tN2max','— (kararlı katman yok)');await is('tNper','—');
  await set('tTs',10);eq(await page.locator('#tCPre').inputValue(),'serbest');await set('tTs',10);await set('tTd',10);await set('tSs',35);await set('tSd',35);await has('tColStatus','karışık');await set('tZc',600);await set('tW',5);await set('tZc',20);await set('tW',200);await noflow('ts edge');
  await click('tReset');await is('tExcess','+0,243 kg/m³');await is('tN2','5,86 × 10⁻⁴ s⁻²');
  // 04
  await click('tab-wave');await page.waitForTimeout(150);await is('wK','0,0628 rad/m · 251 · 8,00 s');await is('wCm','12,44 m/s');await is('wC','12,49 m/s · −0,430 %');await is('wCgm','6,263 m/s');await is('wCg','6,247 m/s · +0,26 %');await is('wRatio','0,5000');await has('wReg','derin su');
  await is('wTsu','198,1 m/s (713 km/sa) · 12,49 m/s');await is('wTime','1,40 sa');await is('wL1','70,9 m');await is('wA1','0,466 m');await has('wStatus2','geçersiz');await painted('wCanvas');await painted('wChart');await painted('wShoal');await noflow('wave');
  await click('wPreTsu');await is('wLOut','200 km');await is('wHOut','4,00 km');await is('wC','197,5 m/s · −0,009 %');await is('wA1','2,227 m');await is('wA1g','2,236 m · +0,4 %');await has('wStatus2','uyuşur');await has('wReg','sığ su');
  await click('wPreMid');await has('wReg','geçiş');await has('wStatus2','h₁ ≥ h₀');await click('wPreShallow');await is('wHOut','1,00 m');await is('wCg','3,125 m/s · 0,00 %');
  await set('wL',0);await set('wH',-1);await set('wL',5.7);await set('wH',3.8);await set('wH1',-1);await set('wH1',3);await set('wA0',2);await set('wDist',15000);await is('wDistOut','15000 km');await noflow('wave edge');
  await click('wPlay');eq(await page.locator('#wPlay').getAttribute('aria-pressed'),'true');await page.locator('h1').click();await page.keyboard.press('Space');eq(await page.locator('#wPlay').getAttribute('aria-pressed'),'false');
  await page.keyboard.press('r');await is('wLOut','100 m');await is('wHOut','4,00 km');await click('wReset');await is('wA1','0,466 m');
  // sekme klavyesi
  await page.locator('#tab-wave').focus();await page.keyboard.press('Home');eq(await page.locator('#tab-force').getAttribute('aria-selected'),'true');await page.keyboard.press('ArrowRight');eq(await page.locator('#tab-cal').getAttribute('aria-selected'),'true');await page.keyboard.press('End');eq(await page.locator('#tab-wave').getAttribute('aria-selected'),'true');await page.keyboard.press('ArrowLeft');eq(await page.locator('#tab-ts').getAttribute('aria-selected'),'true');eq(await page.locator('#panel-force').isHidden(),true);
  ok(await page.evaluate(()=>!!document.querySelector('.digest')&&!!window.ACELYA_DIGEST?.['okyanus-ve-gelgitler']),'defter yüklenmeli');
  assert.deepEqual(errors,[]);checks++;await ctx.close();}
 console.log(`G okyanus ve gelgitler: ${checks-before} arayüz kontrolü (390 açık, 1280 koyu) PASS`);
 }finally{await browser?.close();await new Promise(r=>server.close(r));}
}
