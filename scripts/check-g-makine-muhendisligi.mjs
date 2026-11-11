// G · makine-muhendisligi: çekirdeğin bağımsız denetimi + isteğe bağlı tarayıcı denetimi (--browser).
// Referanslar sayfanın kendi formüllerini yeniden kullanmaz: kapalı üs yasaları ve Simpson alanı (çevrim),
// tam kesir aritmetiği ve Wikipedia'daki z_g·ω_g + z_ç·ω_ç = (z_g+z_ç)·ω_t bağıntısı (dişli), karmaşık genlik
// cebiri ve ayrı bir Verlet integratörü (titreşim), doğrudan direnç toplamı, atış yöntemi ve kürenin
// özdeğer serisi (ısı).
import fs from 'node:fs';
import vm from 'node:vm';
import assert from 'node:assert/strict';
const html=fs.readFileSync(new URL('../makine-muhendisligi.html',import.meta.url),'utf8');
const source=html.split('/* KERNEL-BEGIN */')[1]?.split('/* KERNEL-END */')[0];
assert(source,'Çekirdek sınır işaretleri gerekli');
const context={window:{}};vm.createContext(context);vm.runInContext(source,context);
const K=context.window.MakineLab;let checks=0;
const near=(a,e,tol=1e-9,msg='')=>{assert(Math.abs(a-e)<=tol*Math.max(1,Math.abs(e)),`${msg} ${a} ≠ ${e} (tol ${tol})`);checks++;};
const abs=(a,e,tol,msg='')=>{assert(Math.abs(a-e)<=tol,`${msg} ${a} ≠ ${e} (±${tol})`);checks++;};
const ok=(c,msg)=>{assert(c,msg);checks++;};
const simpson=(f,a,b,n=2000)=>{const h=(b-a)/n;let s=f(a)+f(b);for(let i=1;i<n;i++)s+=(i%2?4:2)*f(a+i*h);return h*s/3;};
ok(Object.isFrozen(K),'çekirdek dondurulmuş olmalı');

/* ---- 01 çevrimler ---- */
const R=0.287,k=1.4,cv=R/(k-1),cp=k*cv,T1=300,P1=100,v1=R*T1/P1;
for(const r of[2,5,9,14,22,30])for(const T3 of[1200,1800,2600]){
 // Otto: üs yasalarıyla köşeler, işi P(v) eğrilerinin Simpson alanından
 const T2=T1*r**(k-1);const o=K.cycle({kind:'otto',r,Tmax:T3});
 if(T3<=T2){ok(!o.valid,'Otto geçersiz olmalı');}else{const v2=v1/r,P2=P1*r**k,P3=P2*T3/T2,wExp=simpson(v=>P3*(v2/v)**k,v2,v1),wCmp=simpson(v=>P1*(v1/v)**k,v2,v1),w=wExp-wCmp,q=cv*(T3-T2);
  const g=3e-5*(wExp+wCmp);abs(o.wMeas,w,g,'Otto iş');abs(o.etaMeas,w/q,g/q,'Otto verim');abs(o.etaMeas,1-1/r**(k-1),g/q);abs(o.loopQ,o.loopW,2*g,'∮Tds=∮Pdv');abs(o.qin-o.qout,o.wMeas,g);near(o.states[1].T,T2,1e-8);near(o.states[2].P,P3,1e-8);near(o.states[3].s,o.states[2].s,1e-8,'izentropik');ok(o.etaMeas<o.carnot,'Carnot tavanı');abs(o.mep,w/(v1-v2),g/(v1-v2));}
 // Diesel
 const d=K.cycle({kind:'diesel',r,Tmax:T3}),rc=T3/T2;
 if(!(rc>1&&rc<=r)){ok(!d.valid,'Diesel geçersiz olmalı');ok(d.why===(rc>1?'cutoff':'tmax'));}else{const v2=v1/r,v3=v2*rc,P2=P1*r**k,w=P2*(v3-v2)+simpson(v=>P2*(v3/v)**k,v3,v1)-simpson(v=>P1*(v1/v)**k,v2,v1),q=cp*(T3-T2);
  const g=3e-5*(d.wc+d.wt);abs(d.wMeas,w,g,'Diesel iş');abs(d.etaMeas,w/q,g/q);near(d.rc,rc,1e-8);abs(d.loopQ,d.loopW,2*g);ok(d.etaMeas<1-1/r**(k-1),'Diesel < Otto aynı r');ok(d.etaMeas<d.carnot);abs(d.qin-d.qout,d.wMeas,g);}
 // Brayton: ideal ve kayıplı, rejeneratörlü
 for(const[ec,et,eps]of[[1,1,0],[.85,.88,0],[.85,.88,.8],[1,1,.95],[.7,.7,.5]]){const b=K.cycle({kind:'brayton',r,Tmax:T3,etaC:ec,etaT:et,eps}),tau=r**((k-1)/k),T2a=T1+(T1*tau-T1)/ec,T4a=T3-et*(T3-T3/tau);
  if(T3<=T2a){ok(!b.valid);continue;}const e=T4a>T2a?eps:0,wn=cp*(T3-T4a)-cp*(T2a-T1),q=cp*(T3-(T2a+e*(T4a-T2a)));
  const g=3e-5*(b.wc+b.wt);abs(b.wMeas,wn,g,'Brayton iş');abs(b.etaMeas,wn/q,g/q,'Brayton verim');near(b.states[1].T,T2a,1e-8);near(b.states[3].T,T4a,1e-8);near(b.qin-b.qout,b.wBalance,1e-9);ok(b.regen===(T4a>T2a));
  if(ec===1&&et===1){abs(b.loopW,wn,g,'alan=iş');abs(b.loopQ,b.loopW,2*g);if(eps===0)abs(b.etaMeas,1-1/tau,g/q);ok(b.reversible);}else{ok(!b.reversible);ok(b.states[1].s>1e-6&&b.states[3].s>b.states[2].s,'tersinmez adımda entropi artar');ok(b.loopW>b.wBalance,'tersinmezde alan işten büyük');}
  if(wn>0)ok(b.etaMeas<b.carnot,'Carnot tavanı (Brayton)');}}
{const b=K.cycle({kind:'brayton',r:10,Tmax:1400});near(b.wMeas,397.445,1e-5);near(b.etaMeas,0.482053,1e-5);near(b.rOpt,(1400/300)**1.75,1e-9);
 // en çok iş: komşu basınç oranları daha az iş verir
 const w=r=>K.cycleTheory({kind:'brayton',r,Tmax:1400}).w;ok(w(b.rOpt)>w(b.rOpt*1.05)&&w(b.rOpt)>w(b.rOpt*.95));
 const ro=(.85*.88*1400/300)**1.75,w2=r=>K.cycleTheory({kind:'brayton',r,Tmax:1400,etaC:.85,etaT:.88}).w;ok(w2(ro)>w2(ro*1.05)&&w2(ro)>w2(ro*.95),'kayıplı en çok iş');}
// RK4 izentropu: P·v^k ve T·P^((1−k)/k) korunur
{const a=K.isentrope(300,0.861,0.861/20,'v',{T1:300,P1:100});for(const p of a)near(p.P*p.v**k,a[0].P*a[0].v**k,1e-8);const b=K.isentrope(1400,3000,100,'p',{T1:300,P1:100});for(const p of b)near(p.T*p.P**((1-k)/k),1400*3000**((1-k)/k),1e-8);}
for(const call of[()=>K.cycleTheory({kind:'x',r:5,Tmax:1000}),()=>K.cycleTheory({kind:'otto',r:1,Tmax:1000}),()=>K.cycleTheory({kind:'brayton',r:5,Tmax:1000,etaC:0})]){assert.throws(call);checks++;}

/* ---- 02 dişliler ---- */
const big=(a)=>a.reduce((p,x)=>p*BigInt(x),1n);
for(const stages of[[[20,60]],[[20,60],[18,72]],[[12,48],[12,60],[20,60]],[[80,12],[37,41]],[[17,53],[19,47],[23,29]]])for(const idler of[0,25,13]){
 const T=K.train({stages,idler,m:2,nIn:1500,Pin:5,eta:.98}),num=big(stages.map(s=>s[1])),den=big(stages.map(s=>s[0])),meshes=stages.length+(idler?1:0);
 near(T.ratio,Number(num)/Number(den),1e-12);ok(BigInt(T.num)*den===BigInt(T.den)*num,'tam kesir');ok(T.dir===(meshes%2?-1:1),'yön');ok(T.meshes===meshes);
 near(T.Tout*Math.abs(T.nOut)*2*Math.PI/60,5000*.98**meshes,1e-10,'güç dengesi');near(T.Tin*1500*2*Math.PI/60,5000,1e-12);near(T.Pout+T.loss,5,1e-12);
 // diş sayarak: giriş den·K tur atınca çıkış tam sayı tur atmalı (kaba kuvvet, küçük adımlar)
 const turns=Number(num)<400?Number(num):7,steps=turns*360;let a=T.shafts.map(()=>0);for(let i=0;i<steps;i++)a=K.trainAdvance(T.shafts,a,2*Math.PI/360);
 near(a[0]/(2*Math.PI),turns,1e-9);near(a.at(-1)/(2*Math.PI),T.dir*turns*Number(den)/Number(num),1e-8,'sayılan tur');
 // çevre hızı eşitliği: her kavramada |n|·z aynı
 for(let j=1;j<T.shafts.length;j++)near(Math.abs(T.shafts[j].n)*T.shafts[j].zin,Math.abs(T.shafts[j-1].n)*T.shafts[j-1].zout,1e-10,'çevre hızı');
 T.centres.forEach((c,j)=>near(c,2*(T.shafts[j].zout+T.shafts[j+1].zin)/2,1e-12));}
ok(K.train({stages:[[12,48]],m:1}).minZ===12);near(K.train({stages:[[12,48]],m:1}).undercut,17.097,1e-4);
for(const zs of[12,18,30,47,60])for(const zp of[12,15,23,40])for(const fixed of['ring','carrier','sun']){const p=K.planet({zs,zp,fixed,nIn:1500}),q=K.planetRigid({zs,zp,fixed,wIn:1500}),zr=zs+2*zp;
 ok(p.zr===zr);near(zs*p.ns+zr*p.nr,(zs+zr)*p.nc,1e-10,'temel bağıntı');near(q.ws,p.ns,1e-10);near(q.wc,p.nc,1e-10);near(q.wr,p.nr,1e-10);near(q.wp,p.np,1e-10,'planet dönüşü');
 // kaymasız yuvarlanma: planetin iki temas noktasında hız eşitliği (test içinde yeniden kurulur)
 const rs=zs/2,rp=zp/2,rr=zr/2,vc=p.nc*(rs+rp);near(vc-p.np*rp,p.ns*rs,1e-9);near(vc+p.np*rp,p.nr*rr,1e-9);ok(p.planets===((zs+zr)%3===0?3:2));
 if(fixed==='ring')near(p.ratio,1+zr/zs,1e-12);if(fixed==='carrier')near(p.ratio,-zr/zs,1e-12);if(fixed==='sun')near(p.ratio,zr/(zs+zr),1e-12);}
for(const call of[()=>K.train({stages:[]}),()=>K.train({stages:[[20.5,40]]}),()=>K.planet({zs:30,zp:15,fixed:'x'}),()=>K.train({stages:[[20,40]],eta:1.2})]){assert.throws(call);checks++;}

/* ---- 03 titreşim ---- */
const cabs=(re,im)=>Math.hypot(re,im);
function steady(c){const w=2*Math.PI*c.f,cd=2*c.zeta*Math.sqrt(c.k*c.m),dr=c.k-c.m*w*w,di=cd*w,den=cabs(dr,di);
 if(c.mode==='base')return{X:c.Y*cabs(c.k,cd*w)/den,Z:c.Y*c.m*w*w/den,TR:cabs(c.k,cd*w)/den};const F0=c.me*w*w;return{X:F0/den,F:F0*cabs(c.k,cd*w)/den,TR:cabs(c.k,cd*w)/den};}
for(const m of[5,50,200])for(const kk of[5e3,2e5,5e5])for(const zeta of[.02,.1,.5,1])for(const rr of[.3,.9,1,1.2,Math.SQRT2,2,3.5]){const fn=Math.sqrt(kk/m)/(2*Math.PI);
 for(const mode of['base','unb']){const c={mode,m,k:kk,zeta,f:rr*fn,Y:.002,me:.01},s=steady(c),q=K.vibSim(c),th=K.vibTheory(c);
  near(q.X,s.X,3e-4,'X '+JSON.stringify(c));near(q.TR,s.TR,3e-4,'TR');near(th.X,s.X,1e-10);near(th.TR,s.TR,1e-10);near(q.peak,s.X,2e-3,'tepe');ok(q.settled);
  if(mode==='base')near(q.Z,s.Z,3e-4,'Z');else near(q.F,s.F,3e-4,'F');if(Math.abs(rr-Math.SQRT2)<1e-12)near(th.TR,1,1e-12,'√2 eşiği');if(Math.abs(rr-Math.SQRT2)>1e-6)ok((th.TR<1)===(rr>Math.SQRT2),'yalıtım yalnız r>√2');}}
// sönüm, eşiğin altında iletimi azaltır, üstünde artırır
{const b={mode:'base',m:50,k:2e5,Y:.002},fn=Math.sqrt(2e5/50)/(2*Math.PI),tr=(z,r)=>K.vibSim({...b,zeta:z,f:r*fn}).TR;ok(tr(.3,1)<tr(.1,1));ok(tr(.3,2.5)>tr(.1,2.5));ok(tr(.05,3)<1&&tr(.05,.8)>1);}
// ayrı integratör (hız-Verlet, küçük adım) ile aynı kalıcı genlik
{const c={mode:'base',m:50,k:2e5,zeta:.1,f:20,Y:.002},w=2*Math.PI*20,cd=2*.1*Math.sqrt(2e5*50),dt=1e-5;let x=0,v=0,t=0,peak=0;const a=(t,x,v)=>(-c.k*(x-c.Y*Math.sin(w*t))-cd*(v-c.Y*w*Math.cos(w*t)))/c.m;
 for(let i=0;i<300000;i++){const a0=a(t,x,v),vh=v+dt/2*a0;x+=dt*vh;t+=dt;const a1=a(t,x,vh);v=vh+dt/2*a1;if(t>2.5&&Math.abs(x)>peak)peak=Math.abs(x);}near(K.vibSim(c).X,peak,2e-3,'Verlet');near(K.vibSim(c).X,7.2352e-4,1e-4);}
// tek adım fonksiyonu: sönümsüz serbest salınımda enerji korunur
{const c={mode:'base',m:2,k:800,zeta:1e-12,f:1,Y:0},a=K.vibAcc(c);let s={t:0,x:.01,v:0};for(let i=0;i<5000;i++)s=K.vibStep(a,s,1e-3);near(.5*800*s.x**2+.5*2*s.v**2,.5*800*1e-4,1e-6,'enerji');near(s.x,.01*Math.cos(20*5),1e-5);}
near(K.vibTheory({mode:'base',m:50,k:2e5,zeta:.1,f:20,Y:.002}).dst,50*9.80665/2e5,1e-12);
for(const call of[()=>K.vibTheory({mode:'base',m:0,k:1,zeta:.1,f:1,Y:1}),()=>K.vibTheory({mode:'zz',m:1,k:1,zeta:.1,f:1})]){assert.throws(call);checks++;}

/* ---- 04 ısı ---- */
const ks=[.5,.72,1.4,.15,.035,.04,.12,50];let seed=7;const rnd=()=>(seed=(seed*16807)%2147483647)/2147483647;
for(let trial=0;trial<120;trial++){const layers=[{k:ks[Math.floor(rnd()*8)],L:.01+.39*rnd()},{k:ks[Math.floor(rnd()*8)],L:rnd()<.25?0:.4*rnd()},{k:ks[Math.floor(rnd()*8)],L:rnd()<.25?0:.4*rnd()}],hi=2+28*rnd(),ho=5+55*rnd(),Ti=15+15*rnd(),To=-30+75*rnd(),w=K.wall({layers,hi,ho,Ti,To});
 let Rt=1/hi+1/ho;for(const l of layers)if(l.L>0)Rt+=l.L/l.k;const q=(Ti-To)/Rt;near(w.qNum,q,2e-7,'duvar akısı');near(w.U,1/Rt,1e-12);ok(w.converged,'yakınsama');near(w.faceNum[0],Ti-q/hi,1e-6);near(w.faceNum.at(-1),To+q/ho,1e-6);
 // her katmanda Fourier yasası sayısal yüz sıcaklıklarıyla
 w.layers.forEach((l,i)=>near(l.k*(w.faceNum[i]-w.faceNum[i+1])/l.L,q,1e-5*Math.max(1,l.k/l.L/10),'Fourier'));ok(w.nodes.every((n,j)=>j===0||(q>=0?n.T<=w.nodes[j-1].T+1e-9:n.T>=w.nodes[j-1].T-1e-9)),'tekdüze profil');}
{const w=K.wall({layers:[{k:.5,L:.02},{k:.72,L:.19},{k:.035,L:.05}],hi:8,ho:25,Ti:20,To:-5});near(w.qNum,13.175506,1e-6);near(w.U,0.52702,1e-5);const z=K.wall({layers:[{k:1,L:.1}],hi:8,ho:25,Ti:20,To:20});near(z.qNum,0,1e-12);ok(z.converged);}
// kanat: θ''=m²θ için atış yöntemi (RK4 + sekant), sayfadaki ne cosh formülü ne de sonlu fark
function shoot(c){const P=Math.PI*c.D,A=Math.PI*c.D**2/4,m2=c.h*P/(c.k*A),thb=c.Tb-c.Tinf,n=4000,h=c.L/n;const run=g=>{let y=thb,z=g;for(let i=0;i<n;i++){const k1y=z,k1z=m2*y,k2y=z+h/2*k1z,k2z=m2*(y+h/2*k1y),k3y=z+h/2*k2z,k3z=m2*(y+h/2*k2y),k4y=z+h*k3z,k4z=m2*(y+h*k3y);y+=h/6*(k1y+2*k2y+2*k3y+k4y);z+=h/6*(k1z+2*k2z+2*k3z+k4z);}return c.tip==='adiabatic'?z:c.tip==='conv'?c.k*z+c.h*y:y;};
 const g0=0,g1=-1,f0=run(g0),f1=run(g1),g=g0-f0*(g1-g0)/(f1-f0);let y=thb,z=g;for(let i=0;i<n;i++){const k1y=z,k1z=m2*y,k2y=z+h/2*k1z,k2z=m2*(y+h/2*k1y),k3y=z+h/2*k2z,k3z=m2*(y+h/2*k2y),k4y=z+h*k3z,k4z=m2*(y+h*k3y);y+=h/6*(k1y+2*k2y+2*k3y+k4y);z+=h/6*(k1z+2*k2z+2*k3z+k4z);}return{q:-c.k*A*g,tip:c.Tinf+y};}
for(const D of[.002,.005,.02])for(const L of[.01,.1,.2])for(const kk of[400,60,15])for(const h of[5,50,200])for(const tip of['adiabatic','conv','fixed']){const c={D,L,k:kk,h,Tb:100,Tinf:25,tip},f=K.fin(c),mL=f.mL;if(mL>9)continue;const s=shoot(c);
 near(f.qTheory,s.q,1e-6,'kanat q formül '+JSON.stringify(c));near(f.qNum,s.q,2e-4,'kanat q sayısal');near(f.tipTheory,s.tip,1e-6,'uç');near(f.tipNum,s.tip,2e-4);ok(f.etaTheory>0&&(tip==='fixed'||f.etaTheory<=1),'verim ≤ 1');near(f.m,Math.sqrt(4*h/(kk*D)),1e-12);}
{const a=K.fin({D:.005,L:.1,k:235,h:25,Tb:100,Tinf:25,tip:'adiabatic'}),b=K.fin({D:.005,L:.1,k:235,h:25,Tb:100,Tinf:25,tip:'adiabatic',N:400});near(a.qNum,2.32130,1e-5);
 near((a.qNum-a.qTheory)/(b.qNum-b.qTheory),4,.05,'ikinci mertebe yakınsama');const long=K.fin({D:.005,L:.3,k:15,h:100,Tb:100,Tinf:25,tip:'adiabatic'}),longer=K.fin({D:.005,L:.6,k:15,h:100,Tb:100,Tinf:25,tip:'adiabatic'});near(long.qTheory,longer.qTheory,1e-6,'uzun kanat doyar');}
// küre: özdeğer serisiyle hacim ortalaması; 1 − ζ·cot ζ = Bi_R
function sphereMean(BiR,Fo){let sum=0;for(let n=1;n<=40;n++){let lo=(n-1)*Math.PI+1e-9,hi=n*Math.PI-1e-9;const g=z=>1-z/Math.tan(z)-BiR;for(let i=0;i<80;i++){const mid=(lo+hi)/2;if(g(mid)>0)hi=mid;else lo=mid;}const z=(lo+hi)/2,C=4*(Math.sin(z)-z*Math.cos(z))/(2*z-Math.sin(2*z));sum+=C*Math.exp(-z*z*Fo)*3*(Math.sin(z)-z*Math.cos(z))/z**3;}return sum;}
for(const c of[{D:.02,rho:8930,cp:385,k:400,h:50},{D:.05,rho:2500,cp:750,k:1.4,h:500},{D:.1,rho:2500,cp:750,k:1.4,h:1000},{D:.03,rho:7900,cp:480,k:15,h:300},{D:.005,rho:2700,cp:900,k:235,h:5}]){const l=K.lump({...c,Ti:200,Tinf:25}),Rr=c.D/2,alpha=c.k/(c.rho*c.cp),BiR=c.h*Rr/c.k;
 near(l.Bi,c.h*c.D/6/c.k,1e-12);near(l.tau,c.rho*c.cp*c.D/(6*c.h),1e-12);near(sphereMean(BiR,alpha*l.tE/Rr**2),Math.exp(-1),4e-3,'1/e anı (seri)');near(l.atTau.mean,sphereMean(BiR,alpha*l.tau/Rr**2),4e-3,'τ anında ortalama');
 if(l.Bi<.01)near(l.tE,l.tau,5e-3,'küçük Bi: toplu model');if(l.Bi>1)ok(l.tE>1.5*l.tau&&l.spread>.4,'büyük Bi: toplu model bozulur');ok(l.atTau.c>=l.atTau.mean-1e-9&&l.atTau.mean>=l.atTau.s-1e-9,'merkez ≥ ortalama ≥ yüzey');}
{const x=K.thomas([0,1,1],[2,2,2],[1,1,0],[4,8,8]);near(x[0],1,1e-12);near(x[1],2,1e-12);near(x[2],3,1e-12);const y=K.rk4((t,y)=>[y[0]],0,[1],.1);near(y[0],Math.exp(.1),1e-6);}
for(const call of[()=>K.wall({layers:[{k:1,L:0}],hi:8,ho:25,Ti:20,To:0}),()=>K.fin({D:0,L:.1,k:1,h:1,Tb:1,Tinf:0,tip:'adiabatic'}),()=>K.fin({D:.01,L:.1,k:1,h:1,Tb:1,Tinf:0,tip:'x'}),()=>K.lump({D:.01,rho:1,cp:1,k:0,h:1,Ti:1,Tinf:0})]){assert.throws(call);checks++;}
console.log(`G makine-muhendisligi: ${checks} bağımsız çevrim, dişli, titreşim ve ısı çekirdek kontrolü PASS`);

if(process.argv.includes('--browser')){
 const {chromium}=await import('playwright');const {createServer}=await import('node:http');const {join,extname}=await import('node:path');const {fileURLToPath}=await import('node:url');const root=fileURLToPath(new URL('../',import.meta.url));
 const server=createServer((req,res)=>{const file=join(root,decodeURIComponent(new URL(req.url,'http://localhost').pathname));if(!fs.existsSync(file)||fs.statSync(file).isDirectory()){res.writeHead(404).end();return;}res.setHeader('Content-Type',({'.html':'text/html; charset=utf-8','.js':'text/javascript; charset=utf-8','.css':'text/css; charset=utf-8'})[extname(file)]||'application/octet-stream');res.end(fs.readFileSync(file));});await new Promise(r=>server.listen(0,'127.0.0.1',r));let browser;
 try{browser=await chromium.launch();const before=checks;
  for(const[width,theme]of[[390,'light'],[1280,'dark']]){const page=await browser.newPage({viewport:{width,height:900},deviceScaleFactor:width<500?2:1});await page.addInitScript(t=>{localStorage.setItem('acelya-theme',t);localStorage.setItem('acelya-sound-muted','1');},theme);page.setDefaultTimeout(8000);const errors=[];page.on('pageerror',e=>errors.push(e.message));page.on('console',m=>{if(m.type()==='error'&&!/Failed to load resource/.test(m.text()))errors.push(m.text());});
   await page.goto(`http://127.0.0.1:${server.address().port}/makine-muhendisligi.html`);
   const click=id=>page.locator('#'+id).click(),read=id=>page.locator('#'+id).textContent(),sel=(id,v)=>page.locator('#'+id).selectOption(v),range=(id,v)=>page.locator('#'+id).evaluate((e,v)=>{e.value=v;e.dispatchEvent(new Event('input',{bubbles:true}));},v),has=async(id,text)=>{const t=await read(id);assert(t.includes(text),`${id}: "${t}" içinde "${text}" yok`);checks++;},
    fits=async tag=>{const d=await page.evaluate(()=>document.documentElement.scrollWidth-innerWidth);assert(d<=0,`yatay taşma ${tag} @${width}: ${d}px`);checks++;},waitHas=async(id,text)=>{await page.waitForFunction(([id,text])=>document.getElementById(id).textContent.includes(text),[id,text]);checks++;};
   // erişilebilirlik: her denetimin etiketi, her canvas'ın rolü
   const unl=await page.evaluate(()=>[...document.querySelectorAll('main input,main select')].filter(e=>!document.querySelector('label[for="'+e.id+'"]')).map(e=>e.id));assert.deepEqual(unl,[]);checks++;
   ok(await page.evaluate(()=>[...document.querySelectorAll('main canvas')].every(c=>c.getAttribute('role')==='img'&&c.getAttribute('aria-label'))),'canvas rolleri');
   ok(await page.evaluate(()=>Object.isFrozen(MakineLab)&&!Object.getOwnPropertyDescriptor(window,'MakineLab').writable),'salt okunur çekirdek');
   // 01
   await has('cycW','397,4 kJ/kg');await has('cycEtaM','48,21 %');await has('cycEtaTh','48,21 %');await has('cycEtaD','fark 0,00');await has('cycCarnot','78,57 %');await has('cycBwr','41,4 %');await has('cycROut','10,0');await fits('cyc');
   await click('cycBest');await has('cycROut','15,0');await has('cycW','405,7');await click('cycReal');await has('cycEtaM','34,40 %');await has('cycW','266,6');await has('cycStatus','Tersinmez');
   await click('cycRegen');await has('cycEtaM','45,76 %');await has('cycStatus','T_x = 858 K');await has('cycRows','rejeneratör');await range('cycR',30);await has('cycStatus','etkisi sıfır alındı');
   await sel('cycKind','otto');await has('cycROut','9,0');await has('cycEtaM','58,48 %');await has('cycMep','810 kPa');ok(await page.locator('#cycEtaC').isDisabled(),'Otto: türbin denetimleri kapalı');
   await range('cycR',30);await range('cycTmax',800);await has('cycW','—');await has('cycStatus','tanımsız');
   await sel('cycKind','diesel');await has('cycEtaM','61,76 %');await has('cycStatus','r_c = 2,31');await range('cycR',2);await range('cycTmax',2600);await has('cycStatus','Kesme oranı');await has('cycEtaM','—');
   await click('cycReset');await has('cycW','397,4 kJ/kg');ok(!(await page.locator('#cycEtaC').isDisabled()),'sıfırlama Brayton\'a döner');
   for(const id of['cycR','cycTmax','cycEtaC','cycEtaT','cycEps'])for(const end of['min','max']){await page.locator('#'+id).evaluate((e,end)=>{e.value=e[end];e.dispatchEvent(new Event('input',{bubbles:true}));},end);}await has('cycStatus',' ');await click('cycReset');
   // 02
   await click('tab-gear');await has('gearRatioT','12,0000 : 1');await has('gearRatioFrac','12 / 1');await has('gearNout','125,00 dev/dk · saat yönünde');await has('gearTout','366,85 N·m');await has('gearPout','4,802 kW');await has('gearRatioM','1 turu');
   await sel('gearSpeed','2');await waitHas('gearRatioM','12,0000');await has('gearRatioD','fark 0,0000 %');await fits('gear');
   await sel('gearIdler','1');await has('gearNout','saat yönünün tersine');await has('gearStatus','Avara');await has('gearRatioT','12,0000');await waitHas('gearRatioM','−12,0000 (ters yön)');
   await click('gearSixty');await has('gearRatioT','60,0000 : 1');await has('gearStatus','12 dişli');await has('gearNout','25,00 dev/dk');await click('gearToggle');await has('gearToggle','Sürdür');await click('gearToggle');
   await sel('gearMode','planet');await has('gearRatioT','3,0000 : 1');await has('gearNout','500,00');await has('gearStatus','üç planet eşit aralıkla takılabilir');await waitHas('gearRatioM','3,0000');
   await sel('gearFixed','carrier');await has('gearRatioT','−2,0000');await waitHas('gearRatioM','−2,0000');await sel('gearFixed','sun');await has('gearRatioT','0,6667');await waitHas('gearRatioM','0,6667');await range('zs',31);await has('gearStatus','iki planet');
   for(const id of['z1a','z1b','z2a','z2b','z3a','z3b','zi','zs','zp','gearN','gearP','gearEta'])for(const end of['min','max']){await page.locator('#'+id).evaluate((e,end)=>{e.value=e[end];e.dispatchEvent(new Event('input',{bubbles:true}));},end);}await page.waitForTimeout(200);
   await click('gearReset');await has('gearRatioT','12,0000 : 1');await has('gearTitle','Kademeli');await fits('gear2');
   // 03
   await click('tab-vib');await has('vibFn','10,066 Hz · r = 1,987');await has('vibXM','0,7235 mm');await has('vibXT','0,7235 mm');await has('vibTRM','0,3618');await has('vibTRT','0,3618');await has('vibStatus','yalıtım bölgesi');await has('vibExtra','2,6545 mm');await has('vibFOut','20,0 Hz · 1200 dev/dk');await fits('vib');
   await click('vibRes');await has('vibFOut','10,1 Hz');await has('vibStatus','Rezonans bölgesi');await has('vibTRM','5,0');await click('vibCross');await has('vibFOut','14,2 Hz');await has('vibTRT','1,00');await click('vibIso');await has('vibFOut','30,2 Hz');await has('vibStatus','% 85,');
   await range('vibZeta',0.5);await has('vibStatus','% 63,');await sel('vibMode','unb');await has('vibExtraLabel','Zemine iletilen kuvvet');await has('vibStatus','m₀·e/m = 0,200 mm');ok(await page.locator('#f-vibY').isHidden()&&await page.locator('#f-vibMe').isVisible(),'uyarıma göre alanlar');
   await click('vibToggle');await has('vibToggle','Sürdür');await click('vibRestart');await has('vibToggle','Durdur');
   for(const id of['vibM','vibK','vibZeta','vibF','vibMe'])for(const end of['min','max']){await page.locator('#'+id).evaluate((e,end)=>{e.value=e[end];e.dispatchEvent(new Event('input',{bubbles:true}));},end);}await has('vibXD','fark');await page.waitForTimeout(400);
   await click('vibReset');await has('vibXM','0,7235 mm');await has('vibTRLabel','X/Y');
   // 04
   await click('tab-heat');await has('hQ','13,176 W/m²');await has('hQT','13,176 W/m²');await has('hQTS','fark 0,0000 %');await has('hU','0,527');await has('hTs','18,35 °C');await has('heatStatus','% 75,3');await fits('wall');
   await click('wBare');await has('hQ','53,3');await has('heatStatus','Tuğla');await click('wThick');await has('hU','0,30');await range('wTo',20);await range('wTi',20);await has('heatStatus','ısı akmıyor');await has('hQ','0,000 W/m²');
   for(const id of['wL1','wL2','wL3','wHi','wHo','wTi','wTo'])for(const end of['min','max']){await page.locator('#'+id).evaluate((e,end)=>{e.value=e[end];e.dispatchEvent(new Event('input',{bubbles:true}));},end);}for(const id of['wM1','wM2','wM3'])await sel(id,'7');await has('hQ','W/m²');
   await sel('heatExp','fin');await has('hQ','2,3213 W');await has('hQT','2,3213 W');await has('hEta','78,815 %');await has('hTip','76,490 °C');await has('hmL','0,923');await fits('fin');
   await sel('fTip','conv');await has('hQ','2,3385 W');await sel('fTip','fixed');await has('hTip','25,000 °C');await sel('fTip','adiabatic');await click('fSteel');await has('heatStatus','sonsuz uzun');await click('fLong');await has('fLOut','30,0 cm');
   for(const id of['fD','fL','fH','fTb'])for(const end of['min','max']){await page.locator('#'+id).evaluate((e,end)=>{e.value=e[end];e.dispatchEvent(new Event('input',{bubbles:true}));},end);}
   await sel('heatExp','lump');await has('hBi','0,0004');await has('hTau','229,20 s');await has('hTe','229,32 s');await has('hBiS','toplu model uygun');await fits('lump');
   await click('lGlass');await has('hBi','2,9762');await has('hBiS','uygun değil');await has('hTe','81,37 s');await has('heatStatus','geç iniyor');await click('lSmall');await has('hBi','4,2·10⁻⁵');await has('heatStatus','Bi = 4,2·10⁻⁵');await has('heatStatus','0,025 yüzde puanı');
   for(const id of['lD','lH'])for(const end of['min','max']){await page.locator('#'+id).evaluate((e,end)=>{e.value=e[end];e.dispatchEvent(new Event('input',{bubbles:true}));},end);}for(const v of['0','1','2','3','4'])await sel('lMat',v);await has('hTau',' s');
   await click('heatReset');await has('hQ','13,176 W/m²');await has('heatTitle','Bileşik duvar');
   // klavye: sekmeler ve kısayollar
   await page.locator('#tab-heat').focus();await page.keyboard.press('Home');ok(await page.locator('#tab-cyc').getAttribute('aria-selected')==='true','Home');await page.keyboard.press('ArrowRight');ok(await page.locator('#tab-gear').getAttribute('aria-selected')==='true','→');await page.keyboard.press('End');ok(await page.locator('#tab-heat').getAttribute('aria-selected')==='true','End');await page.keyboard.press('ArrowRight');ok(await page.locator('#tab-cyc').getAttribute('aria-selected')==='true','sarma');await page.keyboard.press('ArrowLeft');await page.keyboard.press('ArrowLeft');ok(await page.locator('#tab-vib').getAttribute('aria-selected')==='true','←');
   await range('vibF',33);await page.locator('#tab-vib').blur();await page.evaluate(()=>document.body.focus());await page.keyboard.press('r');await has('vibFOut','20,0 Hz');await page.keyboard.press(' ');await has('vibToggle','Sürdür');await page.keyboard.press(' ');await has('vibToggle','Durdur');
   await page.locator('#vibF').focus();await range('vibF',33);await page.keyboard.press('r');await has('vibFOut','33,0 Hz');
   ok(await page.evaluate(()=>!/[̀-ͯ]/.test(document.querySelector('main').textContent.normalize('NFC'))),'birleşik işaret yok');
   await fits('son');assert.deepEqual(errors,[]);checks++;await page.close();}
  console.log(`G makine-muhendisligi: ${checks-before} tarayıcı kontrolü (390 açık + 1280 koyu; sekmeler, hazır ayarlar, sınır değerler, klavye) PASS`);
 }finally{await browser?.close();await new Promise(r=>server.close(r));}
}
