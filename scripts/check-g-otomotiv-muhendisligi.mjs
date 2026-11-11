// Otomotiv Mühendisliği laboratuvarı: çekirdeğin bağımsız denetimi.
// Başvurular sayfanın formüllerini yinelemez: geometri ikiye bölmeyle çözülür ve sayısal türevlenir,
// integraller başka yöntemle (yamuk / orta nokta / analitik kapalı biçim) alınır, kökler kaba taramayla aranır.
// Yayımlanmış değerler: Wikipedia "Piston motion equations" (l=6, r=2 → 73,1753°), OpenStax UP1 Örnek 6.15 ve 6.16.
// Kullanım: node scripts/check-g-otomotiv-muhendisligi.mjs [--browser]
import fs from 'node:fs';
import vm from 'node:vm';
import assert from 'node:assert/strict';
const SLUG='otomotiv-muhendisligi';
const html=fs.readFileSync(new URL(`../${SLUG}.html`,import.meta.url),'utf8');
const source=html.split('/* KERNEL-BEGIN */')[1]?.split('/* KERNEL-END */')[0];
assert(source,'KERNEL sınırları gerekli');
const context={window:{}};vm.createContext(context);vm.runInContext(source,context);
const K=context.window.AutoLab;assert(K&&Object.isFrozen(K),'AutoLab dondurulmuş olmalı');
let checks=0;
const near=(a,b,tol=1e-9,msg='')=>{assert(Math.abs(a-b)<=tol*Math.max(1,Math.abs(b)),`${msg} ${a} ≠ ${b} (tol ${tol})`);checks++;};
const ok=(c,msg)=>{assert(c,msg);checks++;};
const eq=(a,b,msg='')=>{assert.equal(a,b,msg+` (${a} ≠ ${b})`);checks++;};
const g=9.81,RAD=Math.PI/180;
const root=(f,lo,hi)=>{let flo=f(lo);for(let i=0;i<60;i++){const m=(lo+hi)/2,fm=f(m);if((fm<0)===(flo<0)){lo=m;flo=fm;}else hi=m;}return(lo+hi)/2;};

/* ───── 01 krank-biyel: geometri ikiye bölmeyle, türevler sonlu farkla ───── */
// Krank pimi P=(r sinθ, r cosθ); piston pimi eksende (0,y), |P−(0,y)| = l. y'yi kapalı formül kullanmadan bul.
const pinY=(deg,r,l)=>{const px=r*Math.sin(deg*RAD),py=r*Math.cos(deg*RAD);return root(y=>Math.hypot(px,y-py)-l,py,py+l+1e-9);};
const sGeo=(deg,r,l)=>r+l-pinY(deg,r,l);
for(const[r,l]of[[.04,.14],[.05,.11],[.03,.18],[.04,.12],[2,6]]){
 for(let deg=0;deg<=720;deg+=7.5){const w=250,e=K.piston(deg,r,l,w),h=.05;
  near(e.s,sGeo(deg,r,l),1e-9,'yol');
  const d1=(sGeo(deg+h,r,l)-sGeo(deg-h,r,l))/(2*h*RAD),d2=(sGeo(deg+h,r,l)-2*sGeo(deg,r,l)+sGeo(deg-h,r,l))/(h*RAD)**2;
  ok(Math.abs(e.v-w*d1)<=2e-6*w*r,'hız sonlu fark');ok(Math.abs(e.a-w*w*d2)<=2e-5*w*w*r,'ivme sonlu fark');
  // iki terimli yaklaşım: kalan terim r·λ³/8 mertebesinde olmalı
  const a=K.pistonApprox(deg,r,l,w),lam=r/l;ok(Math.abs(a.s-e.s)<=r*lam**3*.2,'iki terim yol sınırı');}
 // en büyük hızın açısı: sonlu farkla bulunan hızın kaba taramayla en büyüğü
 let best=0,at=0;for(let d=40;d<=90;d+=.002){const v=K.piston(d,r,l).v;if(v>best){best=v;at=d;}}
 near(K.maxSpeedAngle(r,l),at,5e-5,'v_max açısı');ok(K.maxSpeedAngle(r,l)<90,'90° değil');
 const sc=K.kinScan(r,l,300);near(sc.aMax,300*300*r*(1+r/l),1e-9,'ÜÖN ivmesi');eq(sc.aMaxAt,0);near(sc.aBdc,K.piston(180,r,l,300).a,1e-9);
 ok(sc.aMin<=sc.aBdc+1e-9,'en negatif ivme AÖN değerinden büyük olamaz');ok((r/l>.25)===(sc.aMinAt<179.9),'λ>1/4 ise en negatif ivme AÖN dışında');
 // ortalama piston hızı: bir turda alınan yol / tur süresi
 const n=50,T=1/n;let path=0;for(let i=0;i<3600;i++)path+=Math.abs(sGeo((i+1)/10,r,l)-sGeo(i/10,r,l));near(path/T,2*(2*r)*n,1e-7,'2·s·n');
}
near(K.maxSpeedAngle(2,6),73.1753,2e-6,'Wikipedia örneği 73,1753°');
near(K.perpAngle(2,6),Math.atan2(6,2)/RAD,1e-12);ok(Math.abs(K.perpAngle(2,6)-K.maxSpeedAngle(2,6))>1,'biyel ⟂ krank açısı tam değil');
assert.throws(()=>K.piston(10,.05,.04));checks++;assert.throws(()=>K.piston(NaN,.04,.14));checks++;

/* ───── 01 Otto: sıcaklıklarla kapalı biçim ve bağımsız yamuk integrali ───── */
for(const rc of[6,10,14])for(const p1 of[4e4,1e5,2e5])for(const q of[5e5,2.5e6])for(const[bore,stroke,rod]of[[.08,.08,.14],[.1,.06,.18],[.06,.1,.11]]){
 const c={bore,stroke,rod,rc,p1,T1:300,q,rpm:3000,cyl:4},E=K.engineSummary(c),R=287,gam=1.4,cv=R/(gam-1);
 const A=Math.PI*bore**2/4,Vd=A*stroke,Vc=Vd/(rc-1),m=p1*(Vd+Vc)/(R*300),T2=300*rc**.4,T3=T2+q/cv,T4=T3/rc**.4,W=m*cv*((T3-T2)-(T4-300));
 near(E.Vd,Vd,1e-12);near((E.Vd+E.Vc)/E.Vc,rc,1e-12,'çizilen ölü hacim r_c ile uyumlu');near(E.hc*A,Vc,1e-12);
 near(E.W,W,1e-10,'W = m c_v [(T3−T2) − (T4−T1)]');near(E.Wnum,W,1e-7,'∮p dV');near(E.T3,T3,1e-12);near(E.p3,p1*rc*T3/300,1e-10,'p3 ideal gaz');near(E.p4,p1*T4/300,1e-10);
 // bağımsız yamuk integrali: hacim ikiye bölmeli geometriden, basınç p V^γ = sabit
 let Wt=0;const V=d=>Vc+A*sGeo(d,stroke/2,rod),N=1500;for(let i=0;i<N;i++){const a=180+180*i/N,b=180+180*(i+1)/N,pa=p1*((Vd+Vc)/V(a))**gam,pb=p1*((Vd+Vc)/V(b))**gam;Wt+=(pa+pb)/2*(V(b)-V(a));const a2=a+180,b2=b+180,p3=p1*rc**gam*T3/T2,qa=p3*(Vc/V(a2))**gam,qb=p3*(Vc/V(b2))**gam;Wt+=(qa+qb)/2*(V(b2)-V(a2));}
 near(E.Wnum,Wt,1e-4,'yamuk ∮p dV');
 near(E.imep*Vd,E.Wnum,1e-12);near(E.torque*4*Math.PI,E.Wnum*4,1e-12);near(E.power,E.torque*3000*2*Math.PI/60,1e-12,'P = τ·ω');near(E.meanPiston,2*stroke*50,1e-12);
 near(K.workTo(180,c),p1*Vd,1e-9,'emme işi p1·Vd');near(K.workTo(360,c),p1*Vd-m*cv*(T2-300),1e-7,'sıkıştırma sonu');near(K.workTo(720,c),E.Wnum,1e-12);
 for(let d=0;d<720;d+=5){const s=K.gasState(d,c);eq(s.intake,d<180);eq(s.exhaust,d>=540);ok(s.V>=Vc*(1-1e-12)&&s.V<=(Vd+Vc)*(1+1e-12),'hacim aralığı');if(d>=180&&d<540)near(s.p*s.V/s.T,m*R,1e-9,'ideal gaz');}
 near(K.gasState(0,c).V,Vc,1e-12);near(K.gasState(180,c).V,Vd+Vc,1e-12);near(K.gasState(360,c).p,E.p3,1e-10);near(K.gasState(539.999,c).p,E.p4,1e-4);
}
near(1-10**-.4,K.otto({bore:.08,stroke:.08,rod:.14,rc:10,p1:1e5,T1:300,q:1e6}).eta,1e-12);
assert.throws(()=>K.otto({bore:.08,stroke:.08,rod:.03,rc:10,p1:1e5,T1:300,q:1e6}));checks++;

/* ───── 02 aktarma: bağımsız kuvvet modeli, kaba tarama, ikinci integratör ───── */
const HP=550*.3048*4.4482216152605,LBFT=.3048*4.4482216152605;
near(K.UNITS.imp.pw,HP,1e-12,'hp tanımı');near(K.UNITS.imp.tq,LBFT,1e-12,'lbf·ft tanımı');
const tq=(n,c)=>c.tauMax*(1-c.beta*((n-c.nPeak)/3000)**2);
const mk=(o={})=>{const c={tauMax:200,nPeak:3500,beta:.4,i1:3.5,iTop:.8,N:5,final:4,rw:.31,eta:.92,m:1400,cda:.65,crr:.012,grade:0,mu:1,share:.58,...o};c.gears=K.gearRatios(c.i1,c.iTop,c.N);return c;};
const F=(v,gi,c)=>{let n=v*c.gears[gi]*c.final/c.rw*60/(2*Math.PI);if(gi===0&&n<c.nPeak)n=c.nPeak;const al=Math.atan(c.grade);return Math.min(tq(n,c)*c.gears[gi]*c.final*c.eta/c.rw,c.mu*c.share*c.m*g*Math.cos(al));};
const Rz=(v,c)=>{const al=Math.atan(c.grade);return .5*1.2*c.cda*v*v+c.m*g*(c.crr*Math.cos(al)+Math.sin(al));};
const cases=[{}, {beta:.1},{beta:.5,nPeak:2500},{nPeak:4500,tauMax:400},{N:6,i1:4.5,iTop:.6},{N:4,i1:2.5,iTop:1},{final:5,tauMax:400,cda:.45},{grade:.12},{grade:-.1},{mu:.5},{mu:.1},{share:.42},{share:1,mu:1.2},{m:2400,tauMax:100},{rw:.36,eta:.8},{rw:.26,eta:.98,crr:.025,cda:1.1},{grade:.3}];
for(const o of cases){const c=mk(o);
 const gr=c.gears;near(gr[0],c.i1,1e-12);near(gr[c.N-1],c.iTop,1e-12);for(let i=1;i<c.N-1;i++)near(gr[i]/gr[i+1],gr[i-1]/gr[i],1e-10,'geometrik kademe');
 // tepe güç: 0,5 d/dk adımla kaba tarama
 let bp=0,bn=0;for(let n=1000;n<=6500;n+=.5){const P=tq(n,c)*n*2*Math.PI/60;if(P>bp){bp=P;bn=n;}}
 const pk=K.peakPower(c),pt=K.peakPowerTheory(c);near(pk.P,bp,1e-8,'tepe güç');ok(Math.abs(pk.n-bn)<=.5,'tepe güç devri');near(pt.P,bp,1e-8,'tepe güç kapalı biçim');ok(Math.abs(pt.n-bn)<=.5);
 for(let n=1000;n<=6500;n+=250){near(K.torque(n,c),tq(n,c),1e-12);ok(K.torque(n,c)>0,'tork artı');near(K.powerW(n,c),tq(n,c)*n*2*Math.PI/60,1e-12);}
 // birim kesişmeleri
 const ci=K.crossing(c,'imp'),cs=K.crossing(c,'si'),cp=K.crossing(c,'ps');near(ci.theory,33000/(2*Math.PI),1e-12,'5252');near(cs.theory,60000/(2*Math.PI),1e-12,'9549');eq(cs.measured,null);eq(cp.measured,null);near(cp.theory,60*735.49875/(2*Math.PI),1e-12);
 near(ci.measured,5252.113122,1e-9,'ölçülen kesişme');near(tq(ci.measured,c)/LBFT,tq(ci.measured,c)*ci.measured*2*Math.PI/60/HP,1e-9,'kesişmede sayı değerleri eşit');
 // azami hız: 0,002 m/s adımlı kaba tarama
 let vb=-1,gb=-1;const vg=[];c.gears.forEach((_,gi)=>{vg[gi]=-1;const lo=gi?1000*2*Math.PI/60*c.rw/(c.gears[gi]*c.final):0,hi=6500*2*Math.PI/60*c.rw/(c.gears[gi]*c.final);for(let v=hi;v>=lo;v-=.002)if(F(v,gi,c)-Rz(v,c)>=0){vg[gi]=v;if(v>vb){vb=v;gb=gi;}break;}});
 const top=K.topSpeed(c);if(vb<0)eq(top,null,'azami hız yok '+JSON.stringify(o)+' '+JSON.stringify(top));else{ok(Math.abs(top.v-vb)<=.0025,`azami hız ${top.v} / ${vb}`);ok(Math.abs(vg[top.gear]-vb)<=.0025,'azami hız vitesi '+JSON.stringify(o));ok(top.revLimited||Math.abs(F(top.v,top.gear,c)-Rz(top.v,c))<1e-3,'kökte kuvvet = direnç');
  const id=K.topSpeedIdeal(c);if(id!==null&&id<250){near(bp*c.eta,Rz(id,c)*id,1e-8,'ideal dişli güç dengesi');if(c.mu>=.5)ok(top.v<=id*(1+1e-9),'gerçek dişli ideal hızı geçemez');}}
 // en büyük eğim: 0,0005 adımlı kaba tarama
 const c0={...c};let gbest=0;for(let gd=0;gd<=3;gd+=.0005){c0.grade=gd;let can=false;const hi=6500*2*Math.PI/60*c.rw/(c.gears[0]*c.final);for(let i=0;i<=300;i++){const v=hi*i/300;if(F(v,0,c0)-Rz(v,c0)>0){can=true;break;}}if(can)gbest=gd;else break;}
 const mg=K.maxGrade(c),mt=K.maxGradeTheory(c);ok(Math.abs(mg-gbest)<=.001,`eğim ${mg} / ${gbest}`);ok(Math.abs(mt.grade-mg)<=1e-6,`eğim kapalı biçim ${mt.grade} / ${mg}`);
 // 0–100: ikinci integratör (orta nokta, 1e-4 s), aynı vites çizelgesi ve bağımsız kuvvet modeli
 for(const opt of[{shiftRpm:6000},{shiftRpm:3500},{optimal:true}]){const run=K.accelRun(c,opt),sp=opt.optimal?K.shiftPoints(c).map(s=>s.v):c.gears.slice(0,-1).map((_,gi)=>opt.shiftRpm*2*Math.PI/60*c.rw/(c.gears[gi]*c.final));
  let t=0,v=0,x=0,gi=0,done=false,work=0;const dt=1e-4,vE=100/3.6,last=c.N-1;
  while(t<90){while(gi<last&&v>=sp[gi])gi++;const lim=Math.min(vE,6500*2*Math.PI/60*c.rw/(c.gears[gi]*c.final)),a1=(F(v,gi,c)-Rz(v,c))/c.m;if(a1<=1e-4)break;const vm2=v+dt/2*a1,a2=(F(vm2,gi,c)-Rz(vm2,c))/c.m,v2=v+dt*a2;
   if(v2>=Math.min(lim,gi<last?sp[gi]:Infinity)){const tg=Math.min(lim,gi<last?sp[gi]:Infinity),f=(tg-v)/(v2-v);t+=f*dt;x+=f*dt*(v+tg)/2;work+=(F(vm2,gi,c)-Rz(vm2,c))*f*dt*(v+tg)/2;v=tg;if(tg>=vE-1e-12){done=true;break;}if(gi<last&&tg>=sp[gi]-1e-12){gi++;continue;}break;}
   work+=(F(vm2,gi,c)-Rz(vm2,c))*dt*vm2;x+=dt*vm2;t+=dt;v=v2;}
  eq(run.ok,done,`0–100 ulaşılabilirlik ${JSON.stringify(o)} ${JSON.stringify(opt)}`);
  if(done){near(run.t,t,3e-4,'0–100 süresi (orta nokta)');near(run.x,x,5e-4,'0–100 yolu');near(K.accelQuad(c,opt),run.t,2e-5,'∫ m dv/(F−R)');near(work,.5*c.m*vE*vE,2e-3,'iş-enerji');
   for(let i=1;i<run.traj.length;i++)ok(run.traj[i][0]>=run.traj[i-1][0]&&run.traj[i][1]>=run.traj[i-1][1]-1e-12,'t ve v tekdüze');}
  else ok(['kuvvet','devir','süre'].includes(run.reason),'neden');}
 // en iyi geçiş: kesişmede kuvvetler eşit ya da devir sınırı; ortak devir taramasında daha iyisi yok
 const sps=K.shiftPoints(c);sps.forEach((p,gi)=>{if(p.redline){near(p.n,6500,1e-9);ok(F2(p.v,gi,c)>=F2(p.v,gi+1,c)-1e-6,'sınırda alt vites hâlâ güçlü');}else{near(F2(p.v,gi,c),F2(p.v,gi+1,c),1e-7,'kesişmede kuvvet eşit');ok(p.n<6500&&p.n>c.nPeak,'kesişme tepe tork ile sınır arasında');}});
 const ro=K.accelRun(c,{optimal:true});if(ro.ok){let bt=Infinity;for(let n=2000;n<=6500;n+=250){const r2=K.accelRun(c,{shiftRpm:n});if(r2.ok&&r2.t<bt)bt=r2.t;}ok(ro.t<=bt+2e-4,`en iyi geçiş kaba taramadan kötü olamaz ${ro.t} / ${bt}`);}
}
function F2(v,gi,c){let n=v*c.gears[gi]*c.final/c.rw*60/(2*Math.PI);if(gi===0&&n<c.nPeak)n=c.nPeak;return tq(n,c)*c.gears[gi]*c.final*c.eta/c.rw;}
{const c=mk();const sp=K.shiftPoints(c);ok(sp.every(p=>!p.redline),'varsayılan durumda kesişme devir sınırının altında');let bt=Infinity,bn=0;for(let n=5900;n<=6500;n+=10){const r=K.accelRun(c,{shiftRpm:n});if(r.t<bt){bt=r.t;bn=n;}}ok(Math.abs(bn-sp[0].n)<=30,`kaba taramanın en iyi devri ${bn}, kesişme ${sp[0].n}`);
 ok(K.accelRun(c,{shiftRpm:3500}).t>K.accelRun(c,{optimal:true}).t+.3,'tepe tork devrinde geçiş belirgin yavaş');
 eq(K.accelRun(mk({grade:.3})).ok,false);eq(K.topSpeed(mk({grade:.3,mu:.1})),null);}
assert.throws(()=>K.gearRatios(1,2,5));checks++;assert.throws(()=>K.crossing(mk(),'x'));checks++;

/* ───── 03 fren: kapalı biçimler, enerji dengesi, kaba tarama ───── */
for(const v0 of[30/3.6,100/3.6,200/3.6])for(const mu of[.05,.3,.7,1.2])for(const grade of[-.15,0,.15])for(const tr of[0,1,2.5]){
 const al=Math.atan(grade),a=g*(mu*Math.cos(al)+Math.sin(al)),th=K.stopTheory({v0,tr,mu,grade}),sim=K.stopSim({v0,tr,mu,grade});
 near(th.react,v0*tr,1e-12);near(th.dec,a,1e-12);
 if(a<=0){eq(sim.stopped,false);eq(th.total,Infinity);eq(sim.total,Infinity);continue;}
 near(th.brake,v0*v0/(2*a),1e-12);near(sim.total,v0*tr+v0*v0/(2*a),1e-9,'benzetim = formül');near(sim.time,tr+v0/a,1e-9);
 near(.5*1400*v0*v0,1400*(mu*g*Math.cos(al)+g*Math.sin(al))*sim.brake,1e-9,'enerji dengesi');ok(Math.abs(sim.energy.resid)<=1e-6*sim.energy.ke,'artık');
 // hava direnci: dv/dt = −(a + k v²) için analitik çözüm
 for(const cda of[.45,.65,1.1]){const m=1400,k=.5*1.2*cda/m,sd=K.stopSim({v0,tr,mu,grade,drag:true,m,cda});near(sd.brake,Math.log(1+k*v0*v0/a)/(2*k),1e-8,'hava dirençli fren yolu');near(sd.time-tr,Math.atan(v0*Math.sqrt(k/a))/Math.sqrt(a*k),1e-8,'hava dirençli süre');ok(sd.brake<sim.brake,'hava direnci yolu kısaltır');
  near(sd.energy.wf+sd.energy.wd+sd.energy.du,sd.energy.ke,1e-8,'enerji: sürtünme + hava + potansiyel');near(sd.energy.wd,sd.energy.ke-m*a*sd.brake,1e-6,'hava işi');
  // h/2 ikizi: adım hatası ihmal edilebilir
  near(K.stopSim({v0,tr,mu,grade,drag:true,m,cda,dt:1/480}).brake,sd.brake,1e-9,'h/2 ikizi');}
 const tj=sim.traj;for(let i=1;i<tj.length;i++)ok(tj[i][0]>=tj[i-1][0]&&tj[i][1]>=tj[i-1][1]-1e-12&&tj[i][2]<=tj[i-1][2]+1e-12,'yörünge tekdüze');near(tj[tj.length-1][1],sim.total,1e-12);eq(tj[tj.length-1][2],0);
}
near(K.stopTheory({v0:100/3.6,tr:1,mu:.7,grade:0}).total,27.7778+56.1821,1e-5,'varsayılan durma');
for(const psi of[.4,.58,.65])for(const chi of[.35/3.2,.55/2.6,1/2.2])for(const phi of[.5,.7,.9])for(const mu of[.05,.3,.7,1,1.2]){
 const b={psi,chi,phi,mu},lt=K.lockTheory(b),lm=K.lockScan(b);
 // kaba tarama: z'yi artır, hangi aksın istediği sürtünme önce μ·N'yi aşıyor?
 let zb=null,fb=null;for(let z=0;z<=6;z+=2e-5){const Nf=psi+z*chi,Nr=1-psi-z*chi,f=phi*z>mu*Nf,r=(1-phi)*z>mu*Nr;if(f||r){zb=z;fb=f&&r?'both':f?'front':'rear';break;}}
 ok(Math.abs(lm.z-zb)<=3e-5,`kilit z ${lm.z} / ${zb}`);near(lt.z,lm.z,1e-9,'kilit kapalı biçim');if(Math.abs(lt.zf-lt.zr)>1e-3){eq(lm.first,fb);eq(lt.first,fb);}
 ok(lt.z<=mu*(1+1e-12),'sabit dağılım ideali geçemez');near(lt.eff,lt.z/mu,1e-12);
 const ld=K.axleLoads(b,lm.z);near(ld.front+ld.rear,1,1e-12);near(ld.front,psi+lm.z*chi,1e-12,'arka temas noktasına göre moment dengesi');
 // ideal pay: iki aks birlikte z = μ'de kilitlenir
 const id=K.lockTheory({psi,chi,phi:lt.idealShare,mu});eq(id.first,'both');near(id.z,mu,1e-9,'ideal dağılımda z = μ');
 ok((lt.first==='front')===(phi-psi>mu*chi+1e-12)||lt.first==='both','z* = (φ−ψ)/χ ölçütü');
}
for(const r of[20,100,500])for(const bank of[0,5,15,31,35])for(const mu of[.05,.3,.7,1.2])for(const[t,h]of[[1.55,.55],[1.3,.9],[1.9,.35],[1.2,1]]){
 const c={r,bank,mu,ssf:t/(2*h)},th=bank*RAD,ct=K.cornerTheory(c),cm=K.cornerScan(c);
 // dünya ekseninde kuvvet dengesi: N cosθ − f sinθ = g ; N sinθ + f cosθ = v²/r (birim kütle)
 const solve=v=>{const ac=v*v/r,N=g*Math.cos(th)+ac*Math.sin(th),f=ac*Math.cos(th)-g*Math.sin(th);return{N,f,ac};};
 for(const v of[0,9,33,80]){const q=solve(v);near(q.N*Math.cos(th)-q.f*Math.sin(th),g,1e-9,'düşey denge');near(q.N*Math.sin(th)+q.f*Math.cos(th),q.ac,1e-9,'merkezcil denge');}
 const st=K.cornerState(c,17);const s17=solve(17);near(st.need,s17.f/s17.N,1e-12);near(st.inner+st.outer,1,1e-12);
 // dış tekerlek temas noktasına göre moment: CG'nin konumu d = (−t/2)e + h n ; kuvvet (a_c, −g)
 const tip=v=>{const ac=v*v/r,dx=-t/2*Math.cos(th)-h*Math.sin(th),dy=-t/2*Math.sin(th)+h*Math.cos(th);return dx*(-g)-dy*ac;};
 let vs=Infinity,vr=Infinity;for(let v=0;v<=400;v+=.005){const q=solve.call(null,v);if(vs===Infinity&&q.f>mu*q.N)vs=v;if(vr===Infinity&&tip(v)<0)vr=v;if(vs<Infinity&&vr<Infinity)break;}
 const cmp=(a,b,msg)=>{if(b===Infinity)ok(a===Infinity||a>399,msg);else ok(Math.abs(a-b)<=.006,`${msg} ${a} / ${b}`);};
 cmp(cm.vSlide,vs,'kayma taraması');cmp(cm.vRoll,vr,'devrilme taraması');cmp(ct.vSlide,vs,'kayma formülü');cmp(ct.vRoll,vr,'devrilme formülü');
 eq(ct.first,mu<c.ssf?'slide':mu>c.ssf?'roll':'both');if(vs<Infinity&&vr<Infinity&&Math.abs(vs-vr)>.02)eq(vs<vr,mu<c.ssf,'hangisi önce');
 near(ct.vFlat,Math.sqrt(mu*g*r),1e-12);near(ct.vIdeal**2/(r*g),Math.tan(th),1e-10,'tan θ = v²/(r g)');
 if(ct.vMin>0){const q=solve(ct.vMin);near(q.f,-mu*q.N,1e-9,'alt sınırda sürtünme yukarı doğru tam');}
 if(bank===0){near(ct.vSlide,Math.sqrt(mu*g*r),1e-12);near(ct.vRoll,Math.sqrt(g*r*t/(2*h)),1e-12,'a_y = g t/(2h)');}
}
// OpenStax UP1 Örnek 6.15: r = 500 m, v = 25 m/s → μ ≈ 0,13 ; Örnek 6.16: r = 100 m, 31° → 24,3 m/s
eq(K.cornerState({r:500,bank:0,ssf:1.4},25).need.toFixed(2),'0.13');eq(K.cornerTheory({r:100,bank:31,mu:.7,ssf:1.4}).vIdeal.toFixed(1),'24.3');
for(const mu of[.1,.7,1])for(const ax of[0,3,9])for(const ay of[0,4,8]){const f=K.frictionCircle(ax,ay,mu);near(f.use,Math.sqrt(ax*ax+ay*ay),1e-12);eq(f.inside,ax*ax+ay*ay<=(mu*g)**2*(1+1e-9));if(ay<mu*g){near(Math.hypot(f.brakeLeft,ay),mu*g,1e-12,'kalan fren çember üzerinde');}else eq(f.brakeLeft,0);}
// OpenStax Tablo 6.1 değerleri sayfada anılıyor ve düğmeler bu değerlere gidiyor
for(const t of['Kuru beton, tutunan: 1,0','Kuru beton, kayan: 0,7','Islak beton, tutunan: 0,5','Islak beton, kayan: 0,3','statik 1,0; kinetik 0,7','statik 0,5–0,7; kinetik 0,3–0,5','73,1753'])ok(html.includes(t),'sayfa metni: '+t);
ok(!/[̀-ͯ]/.test(html),'birleşik işaret yok');ok(!/https?:\/\/[^"']*\.(js|css|woff2?)/.test(html.replace(/href="https:[^"]*"/g,'')),'dış betik yok');
// her hazır değer kaydırıcı adımıyla ulaşılabilir
{const ranges={};for(const m of html.matchAll(/<input id="(\w+)" type="range" min="([-\d.]+)" max="([-\d.]+)" step="([\d.]+)" value="([-\d.]+)"/g))ranges[m[1]]={min:+m[2],max:+m[3],step:+m[4],value:+m[5]};
 eq(Object.keys(ranges).length,38,'kaydırıcı sayısı');const reach=(id,v)=>{const r=ranges[id];assert(r,id);const k=(v-r.min)/r.step;ok(v>=r.min-1e-9&&v<=r.max+1e-9&&Math.abs(k-Math.round(k))<1e-6,`${id}=${v} ulaşılabilir`);};
 for(const[id,r]of Object.entries(ranges))reach(id,r.value);
 for(const[id,v]of[['strokeMm',80],['rodMm',120],['strokeMm',100],['rodMm',110],['strokeMm',60],['rodMm',180],['gradePct',12],['mu2',.5],['finalDrive',4.6],['mu3',1],['mu3',.7],['mu3',.5],['mu3',.3],['mu3',.1],['cgH',.9],['trackW',1.3],['cornerR',100],['bankDeg',31]])reach(id,v);}
console.log(`G ${SLUG}: ${checks.toLocaleString('tr-TR')} bağımsız çekirdek kontrolü PASS`);

if(process.argv.includes('--browser')){
 const{createRequire}=await import('node:module');const{createServer}=await import('node:http');const{join,extname}=await import('node:path');const{fileURLToPath}=await import('node:url');const rootDir=fileURLToPath(new URL('../',import.meta.url));
 const{chromium}=createRequire(join(rootDir,'package.json'))('playwright');
 const server=createServer((req,res)=>{const file=join(rootDir,decodeURIComponent(new URL(req.url,'http://localhost').pathname));if(!fs.existsSync(file)||fs.statSync(file).isDirectory()){res.writeHead(404).end();return;}res.setHeader('Content-Type',({'.html':'text/html; charset=utf-8','.js':'text/javascript; charset=utf-8','.css':'text/css; charset=utf-8'})[extname(file)]||'application/octet-stream');res.end(fs.readFileSync(file));});
 await new Promise(r=>server.listen(0,'127.0.0.1',r));let browser;const before=checks;
 try{browser=await chromium.launch();
  for(const[width,theme]of[[390,'light'],[1280,'dark']]){
   const ctx=await browser.newContext({viewport:{width,height:900},deviceScaleFactor:width===390?2:1,locale:'tr-TR'});await ctx.addInitScript(t=>{localStorage.setItem('acelya-theme',t);localStorage.setItem('acelya-sound-muted','1');},theme);
   const page=await ctx.newPage();page.setDefaultTimeout(6000);const errors=[];page.on('pageerror',e=>errors.push(e.message));page.on('console',m=>{if(m.type()==='error'&&!/404|Failed to load resource/.test(m.text()))errors.push(m.text());});
   await page.goto(`http://127.0.0.1:${server.address().port}/${SLUG}.html`);await page.waitForTimeout(400);
   const click=id=>page.locator('#'+id).click(),read=async id=>(await page.locator('#'+id).textContent()).trim();
   const set=(id,v)=>page.locator('#'+id).evaluate((e,v)=>{if(e.type==='checkbox'){e.checked=v;e.dispatchEvent(new Event('change',{bubbles:true}));}else{e.value=v;e.dispatchEvent(new Event(e.tagName==='SELECT'?'change':'input',{bubbles:true}));}},v);
   const has=async(id,t)=>{const s=await read(id);assert(s.includes(t),`${id}: "${s}" içinde "${t}" yok`);checks++;};
   const noOverflow=async w=>{eq(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),true,'yatay taşma: '+w);};
   const clean=async name=>{const t=await page.locator('#panel-'+name).innerText();ok(!/NaN|undefined|Infinity|null/.test(t),name+' panelinde bozuk sayı: '+(t.match(/.{0,30}(NaN|undefined|Infinity|null).{0,30}/)||[''])[0]);};
   // erişilebilirlik: her denetimin etiketi, her tuvalin rolü
   eq(await page.evaluate(()=>[...document.querySelectorAll('main input,main select')].every(e=>e.labels&&e.labels.length>0&&e.labels[0].textContent.trim().length>2)),true,'etiketler');
   eq(await page.evaluate(()=>[...document.querySelectorAll('main canvas')].every(c=>c.getAttribute('role')==='img'&&c.getAttribute('aria-label').length>20)),true,'tuval rolleri');
   eq(await page.evaluate(()=>Object.isFrozen(AutoLab)&&!Object.getOwnPropertyDescriptor(window,'AutoLab').writable),true);
   // 01 motor: animasyon zamana bağlı
   eq(await read('engToggle'),'Duraklat');const a0=+await page.locator('#crankDeg').inputValue();await page.waitForTimeout(1000);const a1=+await page.locator('#crankDeg').inputValue();const adv=((a1-a0)%720+720)%720;ok(adv>80&&adv<170,'120 °/s gösterim hızı: 1 s\'de '+adv+'°');
   await set('crankDeg',0);eq(await read('engToggle'),'Oynat');
   await has('vAngle','75,14°');await has('vAngleSub','75,52°');await has('vAngleSub','74,05°');await has('vMax','13,07 m/s');await has('aMax','5.076 m/s²');await has('aMin','−2.834 m/s²');await has('aMinSub','154,9°');await has('mps','8,00 m/s');await has('vols','402,1 cm³ · 44,7 cm³');await has('volsSub','10,00');await has('wCycle','468,5 J');await has('wCycleSub','468,5 J');await has('etaM','%60,19');await has('imep','11,65 bar');await has('torque','149,1 N·m');await has('power','46,9 kW');await has('strokeNow','Emme');await has('strokeSub','Emme supabı açık');
   await set('crankDeg',400);await has('strokeNow','Genişleme');await has('gasNow','2.917 kPa');await has('wSoFar','174,1 J');await has('strokeSub','egzoz supabı kapalı');
   await click('stepFwd');eq(await page.locator('#crankDeg').inputValue(),'420');await click('stepBack');eq(await page.locator('#crankDeg').inputValue(),'390');await click('stepBack');eq(await page.locator('#crankDeg').inputValue(),'360');await set('crankDeg',395);await click('stepFwd');eq(await page.locator('#crankDeg').inputValue(),'420');await set('crankDeg',395);await click('stepBack');eq(await page.locator('#crankDeg').inputValue(),'390');await set('crankDeg',700);await click('stepFwd');eq(await page.locator('#crankDeg').inputValue(),'0');await click('stepBack');eq(await page.locator('#crankDeg').inputValue(),'690');
   await click('preWiki');await has('vAngle','73,18°');await click('preShort');await has('kinCaption','2,20');await has('aMinSub','AÖN');await click('preLong');await has('vAngle','80,7');
   await set('engRpm',7000);await set('strokeMm',100);await has('mps','23,33 m/s');await has('mpsSub','20–25');await set('heatQ',2500);await has('engStatus','Uyarı');
   for(const id of['strokeMm','rodMm','boreMm','compR','engRpm','cylN','intakeP','heatQ','animSpeed','crankDeg'])for(const end of['min','max']){await page.locator('#'+id).evaluate((e,end)=>{e.value=e[end];e.dispatchEvent(new Event('input',{bubbles:true}));},end);await clean('engine');}
   await set('crankDeg',400);eq(await read('engToggle'),'Oynat');await click('engineReset');await has('vAngle','75,14°');eq(await read('engToggle'),'Duraklat','sıfırlama açılış durumuna döner: animasyon çalışır');ok(+await page.locator('#crankDeg').inputValue()<120,'sıfırlama krankı başa alır');eq(await page.locator('#rodMm').inputValue(),'140');await noOverflow('motor');
   // klavye: sekmeler, boşluk, R
   await page.locator('#tab-engine').focus();await page.keyboard.press('ArrowRight');eq(await page.locator('#tab-drive').getAttribute('aria-selected'),'true');eq(await page.locator('#panel-engine').isHidden(),true);await page.keyboard.press('End');eq(await page.locator('#tab-brake').getAttribute('aria-selected'),'true');await page.keyboard.press('ArrowRight');eq(await page.locator('#tab-engine').getAttribute('aria-selected'),'true');await page.keyboard.press('ArrowLeft');eq(await page.locator('#tab-brake').getAttribute('aria-selected'),'true');await page.keyboard.press('Home');eq(await page.locator('#tab-engine').getAttribute('aria-selected'),'true');
   await page.locator('h1').click();await page.keyboard.press('Space');eq(await read('engToggle'),'Oynat');await page.keyboard.press('Space');eq(await read('engToggle'),'Duraklat');await page.keyboard.press('Space');await set('rodMm',120);await page.locator('h1').click();await page.keyboard.press('r');eq(await page.locator('#rodMm').inputValue(),'140');eq(await read('engToggle'),'Duraklat');await set('stopGrade',-10);await has('stopGradeOut','−10');await has('preTall','Yüksek');ok((await page.locator('#panel-brake .om-note').allTextContents()).join(' ').includes('fren dağılımı kartları da değişir'),'Yüksek ve dar notu');await set('stopGrade',0);
   // 02 aktarma
   await click('tab-drive');await has('pkPower','95,0 kW · 5.310 d/dk');await has('pkPowerSub','5.310 d/dk');await has('crossN','kesişmiyor');await has('crossSub','9.549,3');await has('topV','209,1 km/h · 5. vites');await has('topVSub','210,3 km/h');await has('maxGrade','%56,8');await has('maxGradeSub','çekiş');await has('tracLim','7.966 N');await has('tracSub','8.310 N');await has('t100','7,83 s');await has('t100Sub','RK4 7,828 s');await has('t100OptSub','0,014 s');await has('t100Opt','7,81 s');await has('gearRows','6.217');await has('gearRows','2,420');
   await set('unitSel','imp');await has('crossN','5.252,1 d/dk');await has('crossSub','5.252,1');await has('pkPowerSub','127,4 hp');await set('unitSel','ps');await has('crossSub','7.023,5');await has('crossN','kesişmiyor');
   await set('shiftRpm',3500);const slow=parseFloat((await read('t100')).replace(',','.'));ok(slow>8.5,'erken vites yavaşlatır: '+slow);await has('driveStatus','kaybettiriyor');
   await click('preClimb');await has('gradePctOut','12 %');const tc=await read('topV');ok(/km\/h/.test(tc),'yokuşta azami hız');await click('preWet');await has('tracLim','3.9');await has('tracSub','patinaj');await click('preFinal');await has('finalDriveOut','4,60');
   await set('gradePct',30);await set('mu2',.1);await has('topV','hareket edemiyor');await has('t100','ulaşılamıyor');await has('runNow','—');await clean('drive');
   await click('driveReset');await has('t100','7,83 s');eq(await page.locator('#unitSel').inputValue(),'si');
   await click('runToggle');eq(await read('runToggle'),'Duraklat');await page.waitForTimeout(1200);const rn=parseFloat((await read('runNow')).replace(',','.'));ok(rn>.8&&rn<1.8,'oynatma gerçek zamanlı: '+rn);await set('tauMax',205);eq(await read('runToggle'),'0–100\'ü oynat');await has('runNow','0,00 s');
   for(const id of['tauMax','nPeak','betaK','gearN','gear1','gearTop','finalDrive','tyreR','drvEta','shiftRpm','vehMass','cdA','crr','gradePct','mu2'])for(const end of['min','max']){await page.locator('#'+id).evaluate((e,end)=>{e.value=e[end];e.dispatchEvent(new Event('input',{bubbles:true}));},end);await clean('drive');}
   for(const v of['rwd','awd','fwd']){await set('driveSel',v);await clean('drive');}
   await click('driveReset');await has('topV','209,1 km/h');await noOverflow('aktarma');
   // 03 fren ve viraj
   await click('tab-brake');await has('dReact','27,78 m');await has('dBrake','56,18 m');await has('dTotal','83,96 m');await has('dTotalSub','83,96 m');await has('tStop','5,05 s');await has('eBal','540,1 kJ');await has('lockZ','Arka aks · z = 0,656');await has('lockZSub','0,736');await has('brakeEff','%93,7');await has('idealShare','%72,8');await has('axLoads','Ön %64,5');await has('vSlide','94,3 km/h');await has('vRoll','133,8 km/h');await has('firstFail','Önce kayar');await has('needMu','0,503');await has('circUse','%84,1');
   await set('dragOn',true);await has('dTotal','83,10 m');await has('eBal','8,3');await set('dragOn',false);
   await click('muDry');await has('dBrake','39,33 m');await click('muWet');await has('dBrake','78,65 m');await has('lockZ','Ön aks');await click('muWetK');await has('dBrake','131,09 m');await click('muIce');await has('dBrake','393,27 m');await has('mu3Out','0,10');await click('muDryK');await has('dBrake','56,18 m');
   await set('stopGrade',-15);await set('mu3',.1);await has('dTotal','duramıyor');await has('dBrake','Tanımsız');await has('stopStatus','≤ 0');await has('stopNow','—');
   await click('brakeReset');await has('dTotal','83,96 m');
   await click('stopToggle');await page.waitForTimeout(1300);const sn=parseFloat((await read('stopNow')).replace(',','.'));ok(sn>.9&&sn<1.9,'fren oynatması gerçek zamanlı: '+sn);await set('stopV',105);eq(await read('stopToggle'),'Freni oynat');await has('stopNow','0,00 s');await set('stopV',100);
   await click('preTall');await has('firstFail','Önce kayar');await click('muDry');await has('firstFail','Önce devrilir');await has('vRollSub','0,72 g');await set('cornerV',120);await has('cornerStatus','devrilmeye');
   await click('brakeReset');await click('preBank');await has('vIdeal','87,4 km/h');await has('vIdealSub','24,28 m/s');await set('mu3',.05);await has('vIdealSub','içe kayar');await set('cornerV',10);await has('cornerStatus','içe doğru kayar');
   await click('brakeReset');await set('brakeAx',12);await has('axLoads','Ön %');await has('brakeStatus','üstünde');await has('cornerStatus','dışında');
   for(const id of['stopV','stopTr','mu3','stopGrade','wheelBase','cgH','frontShare','brakeFront','brakeAx','cornerR','bankDeg','cornerV','trackW'])for(const end of['min','max']){await page.locator('#'+id).evaluate((e,end)=>{e.value=e[end];e.dispatchEvent(new Event('input',{bubbles:true}));},end);const t=await page.locator('#panel-brake').innerText();ok(!/NaN|undefined|null/.test(t),'fren panelinde bozuk sayı ('+id+' '+end+')');}
   await click('brakeReset');await has('vSlide','94,3 km/h');await noOverflow('fren');
   await page.locator('h1').click();await page.keyboard.press('Space');eq(await read('stopToggle'),'Duraklat');await page.keyboard.press('r');eq(await read('stopToggle'),'Freni oynat');
   // tema değişince tuvaller yeniden çizilir; hata yok
   await page.evaluate(()=>{document.documentElement.dataset.theme=document.documentElement.dataset.theme==='light'?'dark':'light';});await page.waitForTimeout(200);
   for(const t of['engine','drive','brake']){await click('tab-'+t);await page.waitForTimeout(150);eq(await page.evaluate(n=>[...document.querySelectorAll('#panel-'+n+' canvas')].every(c=>c.width>100&&c.height>60),t),true,'tuval boyutu '+t);await noOverflow(t);}
   assert.deepEqual(errors,[]);checks++;await ctx.close();}
  console.log(`G ${SLUG}: ${checks-before} tarayıcı kontrolü (390 açık, 1280 koyu) PASS`);
 }finally{await browser?.close();await new Promise(r=>server.close(r));}
}
