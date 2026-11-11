// G · elektrikli-araclar.html kalıcı denetimi.
// Çekirdek (KERNEL-BEGIN/END arası) node'da yüklenir ve sayfanın kendi çözüm yollarını yinelemeyen
// referanslarla sınanır: altın oran araması ve sayısal türev (en uzun menzil hızı), sabit ivmeli evrelerin
// elle çıkarılmış kapalı biçim enerji integralleri, ayrı bir Euler integratörü, Newton kökü (en yüksek hız),
// hız üzerinden Simpson kareleme (0–100 süresi, rejenerasyon), OCV'nin analitik integrali, sabit akım
// süresi Q·Δs/I, sabit gerilim ve güç sınırı evreleri için SoC üzerinden kareleme, enerji dengeleri.
// `--browser`: 390 px aydınlık ve 1280 px karanlıkta gerçek arayüz denetimleri.
import fs from 'node:fs';
import vm from 'node:vm';
import assert from 'node:assert/strict';
const html=fs.readFileSync(new URL('../elektrikli-araclar.html',import.meta.url),'utf8');
const source=html.split('/* KERNEL-BEGIN */')[1]?.split('/* KERNEL-END */')[0];
assert(source,'Çekirdek sınırları (KERNEL-BEGIN/END) gerekli');
const context={window:{}};vm.createContext(context);vm.runInContext(source,context);
const K=context.window.EVLab;assert(K&&Object.isFrozen(K),'EVLab dondurulmuş olmalı');
let checks=0;
const near=(actual,expected,tol=1e-9,msg='')=>{assert(Math.abs(actual-expected)<=tol*Math.max(1,Math.abs(expected)),`${msg} ${actual} ≠ ${expected}`);checks++;};
const ok=(cond,msg)=>{assert(cond,msg);checks++;};
const eq=(a,b,msg='eşitlik')=>{assert.equal(a,b,msg);checks++;};
let seed=20261111;const rnd=()=>{seed|=0;seed=seed+0x6D2B79F5|0;let t=Math.imul(seed^seed>>>15,1|seed);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296;};
const U=(a,b)=>a+(b-a)*rnd();
const simpson=(fn,a,b,n=2000)=>{const h=(b-a)/n;let s=fn(a)+fn(b);for(let i=1;i<n;i++)s+=(i%2?4:2)*fn(a+i*h);return s*h/3;};
const g=9.80665,rho=1.225;
const base={m:1800,cda:.6,crr:.01,eta:.9,paux:500,grade:0};

// 1 · Elle hesaplanmış varsayılan durum (90 km/sa = 25 m/s)
{const s=K.steady(base,25);near(s.aero,229.6875,1e-12);near(s.roll,176.5197,1e-12);near(s.pWheel,10155.18,1e-10);near(s.pBatt,10155.18/.9+500,1e-12);near(s.whkm,(10155.18/.9+500)/25/3.6,1e-12);near(K.rangeKm(base,25,60000),60000/s.whkm,1e-12);
 near(s.parts.aero+s.parts.road+s.parts.loss+s.parts.aux,s.whkm,1e-12,'paylar toplamı');}
// eğim: %10 yokuşta kuvvetler dik üçgenden
{const c={...base,grade:.1},s=K.steady(c,20),hyp=Math.hypot(1,.1);near(s.grade,1800*g*.1/hyp,1e-12);near(s.roll,.01*1800*g/hyp,1e-12);}
// 2 · En uzun menzil hızı: altın oran araması ve sayısal türev, rastgele araçlar
const golden=(fn,a,b)=>{const q=(Math.sqrt(5)-1)/2;let c=b-q*(b-a),d=a+q*(b-a);for(let i=0;i<200;i++){if(fn(c)<fn(d))b=d;else a=c;c=b-q*(b-a);d=a+q*(b-a);}return(a+b)/2;};
for(let i=0;i<60;i++){const c={m:U(1000,2600),cda:U(.4,1.2),crr:U(.006,.02),eta:U(.7,.98),paux:U(300,6000),grade:U(0,.1)},v=K.vOptClosed(c),f=u=>K.steady(c,u).whkm,vg=golden(f,1,60);near(vg,v,2e-6,'altın oran');
 const h=1e-4*v;near((f(v+h)-f(v-h))/(2*h)*v/f(v),0,1e-6,'türev');const r=K.road(c);near((c.paux/v)/(r.A*v*v/c.eta),2,1e-12,'iki kat kuralı');
 const br=K.rangeArgmax(c);if(v*3.6>5.2&&v*3.6<199.8){eq(br.kind,'interior');near(br.v,v,1e-5,'tarama');near(br.whkm,f(v),1e-8);}}
eq(K.vOptClosed({...base,paux:0}),null);eq(K.rangeArgmax({...base,paux:0}).kind,'low');eq(K.rangeArgmax({...base,grade:-.06,paux:0}).kind,'charging');
ok(K.steady({...base,grade:-.06},10).pWheel<0,'inişte eksi güç');near(K.steady({...base,grade:-.06,paux:0},10,.5).pBatt,K.steady({...base,grade:-.06,paux:0},10,1).pBatt/2,1e-12);
// log–log eğimler
{const xs=[],y2=[],y3=[];for(let k=30;k<=150;k+=5){const u=k/3.6,s=K.steady(base,u);xs.push(u);y2.push(s.aero);y3.push(s.aero*u);}near(K.fitSlope(xs,y2),2,1e-12);near(K.fitSlope(xs,y3),3,1e-12);near(K.fitSlope([1,2,4],[5,5,5]),0,1e-12);}

// 3 · Sürüş çevrimi: sabit ivmeli evrelerin kapalı biçim integralleri
function cycleRef(c,o){const th=Math.atan(c.grade),A=.5*rho*c.cda,B=c.crr*c.m*g*Math.cos(th)+c.m*g*Math.sin(th),v=o.vc,ke=.5*c.m*v*v,xa=v*v/(2*o.a),xb=v*v/(2*o.d),xc=o.L-xa-xb;
 const out=(ke+A*v**4/(4*o.a)+B*v*v/(2*o.a))/c.eta+(A*v*v+B)*xc/c.eta,work=ke-A*v**4/(4*o.d)-B*v*v/(2*o.d),back=o.frac*c.eta*work,T=v/o.a+xc/v+v/o.d+o.idle,aux=c.paux*T;return{out,back,fric:(1-o.frac)*work,aux,T,net:out+aux-back,aero:A*(v**4/(4*o.a)+v*v*xc+v**4/(4*o.d))};}
for(let i=0;i<40;i++){const c={m:U(1000,2600),cda:U(.4,1.2),crr:U(.006,.02),eta:U(.7,.98),paux:U(0,6000),grade:U(0,.03)},o={vc:U(6,25),L:U(1500,20000),a:U(.5,3),d:U(2,3),idle:U(0,60),frac:U(0,1)},r=K.cycle(c,o),ref=cycleRef(c,o);
 near(r.E.out,ref.out,1e-9,'çekiş');near(r.E.back,ref.back,1e-9,'geri');near(r.E.fric,ref.fric,1e-8,'disk');near(r.E.aux,ref.aux,1e-9);near(r.E.aero,ref.aero,1e-9);near(r.t,ref.T,1e-10);near(r.x,o.L,1e-10);near(r.net,ref.net,1e-9);near(r.whkm,ref.net/o.L/3.6,1e-9);near(r.residual/r.E.out,0,1e-10,'denge');eq(r.reached,true);near(r.v,0,1e-12);}
// adım yarılama ikizi ve ayrı Euler integratörü (işaret değişimli zor durum: yumuşak fren, yüksek hız)
{const c={...base,cda:1.2,m:1000,paux:0},o={vc:140/3.6,L:6000,a:1,d:.5,idle:0,frac:.7},r1=K.cycle(c,o),r2=K.cycle(c,{...o,dt:.0025});near(r1.net,r2.net,1e-6,'dt ikizi');near(r1.residual/r1.E.out,0,1e-10);ok(r1.E.fric>0&&r1.E.back>0);
 const A=.5*rho*c.cda,B=c.crr*c.m*g;let out=0,back=0,v=0,x=0;const h=1e-4;const st=(acc)=>{const vm=v+acc*h/2,pw=(c.m*acc+A*vm*vm+B)*vm;if(pw>=0)out+=pw/c.eta*h;else back+=-pw*o.frac*c.eta*h;x+=vm*h;v+=acc*h;};
 while(v<o.vc-1e-9)st(o.a);const xb=o.vc*o.vc/(2*o.d);out+=(A*o.vc**2+B)*(o.L-x-xb)/c.eta;while(v>1e-9)st(-o.d);near(r1.E.out,out,2e-4,'Euler çekiş');near(r1.E.back,back,2e-4,'Euler geri');}
// tepe hıza ulaşamayan kısa durak arası
{const r=K.cycle(base,{vc:140/3.6,L:100,a:1,d:1,idle:10,frac:.5});eq(r.reached,false);near(r.vPeak,10,1e-12);near(r.x,100,1e-10);near(r.t,30,1e-10);near(r.residual/r.E.out,0,1e-10);}
// soğuk hava: yalnız yardımcı güç değişir; fark tam P_y·T kadardır
{const o={vc:50/3.6,L:500,a:1.5,d:1.5,idle:20,frac:.7},e9=K.cycle(base,o),e85=K.cycle({...base,etaRegen:.85},o);near(e85.E.back,e9.E.back*.85/.9,1e-12,'etaRegen ölçeği');near(e85.whkm,e9.whkm+e9.E.back*(1-.85/.9)/e9.x/3.6,1e-12);near(e85.whkm,137.546,1e-5);near(e85.residual/e85.E.out,0,1e-10);near(K.steady({...base,grade:-.06,paux:0,etaRegen:.5},10).pBatt,K.steady({...base,grade:-.06,paux:0,eta:.5},10).pBatt,1e-12);}
{const o={vc:50/3.6,L:500,a:1.5,d:1.5,idle:20,frac:.7},a=K.cycle(base,o),b=K.cycle({...base,paux:3000},o);near(b.net-a.net,2500*a.t,1e-9);near(a.t,2*(50/3.6)/1.5+(500-(50/3.6)**2/1.5)/(50/3.6)+20,1e-10);}

// 4 · Motor: en yüksek hız Newton köküyle, üç bölge
const mot0={tmax:300,pmax:100000,gear:9,rw:.33,nmax:16000},car0={...base,paux:0};
for(let i=0;i<60;i++){const c={m:U(1000,2600),cda:U(.4,1.2),crr:U(.006,.02),eta:U(.7,.98),paux:0,grade:U(0,.1)},mot={tmax:U(100,700),pmax:U(40000,400000),gear:U(5,14),rw:U(.28,.38),nmax:U(8000,20000)},mi=K.motorInfo(c,mot),th=Math.atan(c.grade),A=.5*rho*c.cda,B=c.crr*c.m*g*Math.cos(th)+c.m*g*Math.sin(th),F0=c.eta*mot.gear*mot.tmax/mot.rw,vb=mot.pmax/mot.tmax*mot.rw/mot.gear,vr=mot.nmax*2*Math.PI/60*mot.rw/mot.gear;
 near(mi.F0,F0,1e-12);near(mi.vBase,vb,1e-12);near(mi.vRpm,vr,1e-12);let expect;
 if(F0<=B)expect=0;else{let v=80;for(let k=0;k<200;k++)v-=(A*v**3+B*v-c.eta*mot.pmax)/(3*A*v*v+B);if(v<vb)v=Math.sqrt((F0-B)/A);expect=Math.min(v,vr);}
 near(mi.vTop,expect,1e-9,'kapalı biçim');near(mi.vRoot,expect,1e-9,'ikiye bölme');if(expect>0&&expect<vr){near(K.tractive(c,mot,expect),A*expect**2+B,1e-8,'kuvvet dengesi');}}
{const mi=K.motorInfo(car0,mot0);eq(mi.region,'power');eq(mi.rpmLimited,false);ok(Math.abs(mi.vTop*3.6-216.03)<.01,'varsayılan en yüksek hız');
 eq(K.motorInfo(car0,{...mot0,gear:12}).rpmLimited,true);eq(K.motorInfo(car0,{...mot0,tmax:100,pmax:400000,gear:5,nmax:20000}).region,'torque');eq(K.motorInfo({...car0,m:2600,grade:.1,crr:.02},{...mot0,tmax:100,gear:5}).region,'none');
 near(K.tractive(car0,mot0,5),.9*9*300/.33,1e-12);near(K.tractive(car0,mot0,30),.9*100000/30,1e-12);eq(K.tractive(car0,mot0,70),0);}
// 0–100: hız üzerinden kareleme t = ∫ m dv / F_net (taban hızda bölünmüş) ve dirençsiz kapalı biçim
for(const[c,mot]of[[car0,mot0],[{...car0,m:2400,cda:1,grade:.04},{...mot0,pmax:200000,tmax:500}],[{...car0,m:1200},{...mot0,gear:7,pmax:60000}]]){const mi=K.motorInfo(c,mot),vt=100/3.6;if(mi.vTop<=vt)continue;const r=K.road(c),net=u=>K.tractive(c,mot,u)-r.A*u*u-r.B,vb=Math.min(mi.vBase,vt),tq=simpson(u=>c.m/net(u),0,vb)+(vt>vb?simpson(u=>c.m/net(u),vb,vt):0),xq=simpson(u=>c.m*u/net(u),0,vb)+(vt>vb?simpson(u=>c.m*u/net(u),vb,vt):0),run=K.accelRun(c,mot,vt);
 eq(run.ok,true);near(run.t,tq,2e-5,'0–100 süresi');near(run.x,xq,5e-5,'0–100 yolu');near(run.v,vt,1e-12);near(run.residual/run.E.out,0,1e-6,'hızlanma dengesi');near(run.E.out-run.E.drive-run.E.aero-run.E.roll-run.E.grade,.5*c.m*vt*vt,1e-6,'kinetik enerji');ok(run.t>K.accelIdeal(c,mot,vt),'direnç süreyi uzatır');}
{const c={m:1800,cda:1e-9,crr:0,eta:.9,paux:0,grade:0},run=K.accelRun(c,mot0,100/3.6);near(run.t,K.accelIdeal(c,mot0,100/3.6),2e-6,'dirençsiz sınır');const vb=100000/300*.33/9,F0=.9*9*300/.33;near(K.accelIdeal(c,mot0,100/3.6),1800*vb/F0+1800*((100/3.6)**2-vb*vb)/(2*.9*100000),1e-12);near(K.accelIdeal(c,mot0,5),1800*5/F0,1e-12);}
eq(K.accelRun(car0,mot0,300/3.6).ok,false,'ulaşılamayan hız');

// 5 · Rejeneratif frenleme: hız üzerinden kareleme, enerji dengesi
for(let i=0;i<60;i++){const c={m:U(1000,2600),cda:U(.4,1.2),crr:U(.006,.02),eta:U(.7,.98),paux:0,grade:U(0,.05)},v0=U(6,44),d=U(1.6,4),o={limit:U(10000,300000),etaRegen:U(.5,.95),frac:i%5===0?0:1},th=Math.atan(c.grade),A=.5*rho*c.cda,B=c.crr*c.m*g*Math.cos(th)+c.m*g*Math.sin(th);
 const cl=K.regenClosed(c,v0,d,o),run=K.brakeRun(c,v0,d,o),ke=.5*c.m*v0*v0;if(c.m*d-B-A*v0*v0<0){eq(cl,null);continue;}
 const pb=u=>(c.m*d-B)*u-A*u**3,wheel=simpson(u=>Math.min(o.frac*pb(u),o.limit),0,v0,20000)/d,work=simpson(pb,0,v0)/d;
 near(cl.wheel,wheel,1e-6,'kapalı biçim / kareleme');near(cl.batt,o.etaRegen*wheel,1e-6);near(cl.brakeWork,work,1e-9);near(cl.ke,ke,1e-12);near(run.E.back,cl.batt,2e-5,'integral / kapalı biçim');near(run.E.fric,work-wheel,3e-5*Math.max(1,work/Math.max(work-wheel,1)));
 near(run.E.back+run.E.fric+run.E.regenLoss+run.E.aero+run.E.roll+run.E.grade,ke,1e-9,'kinetik enerji dağılımı');near(run.x,v0*v0/(2*d),1e-10);near(run.t,v0/d,1e-10);near(run.residual/ke,0,1e-10);eq(run.E.out,0);}
{const cl=K.regenClosed(car0,100/3.6,2.5,{limit:80000,etaRegen:.85});ok(Math.abs(cl.batt/3600-138.9)<.06,'varsayılan geri kazanım');eq(K.regenClosed({...car0,cda:1.2,m:1000},160/3.6,.5,{}),null);
 const hard=K.brakeRun({...car0,cda:1.2,m:1000},160/3.6,.5,{limit:80000,etaRegen:.85});ok(hard.E.out>0,'motor bir süre çeker');near(hard.residual/(hard.E.out+.5*1000*(160/3.6)**2),0,1e-10);
 eq(K.regenClosed(car0,20,2,{limit:1e9,etaRegen:1}).wheel===K.regenClosed(car0,20,2,{limit:1e9,etaRegen:1}).brakeWork,true);eq(K.regenClosed(car0,20,2,{frac:0}).batt,0);}

// 6 · Hücre ve paket
near(K.ocv(0),3,1e-9);near(K.ocv(1),4.2,1e-9);for(let i=1;i<=1000;i++)ok(K.ocv(i/1000)>K.ocv((i-1)/1000),'OCV tekdüze');
near(K.OCV_MEAN,simpson(K.ocv,0,1,20000),1e-9,'ortalama gerilim');
const prim=s=>3.43*s+.335*s*s+.43*.04*Math.exp(-s/.04)+.1*.05*Math.exp(-(1-s)/.05); // elle alınmış ilkel
for(const k of[{s:96,p:2,q:90,r:.0012},{s:192,p:1,q:90,r:.0012},{s:48,p:6,q:20,r:.004},{s:220,p:3,q:120,r:.0004}]){const pk=K.pack(k);near(pk.Q,k.p*k.q,1e-12);near(pk.R,k.s*k.r/k.p,1e-12);eq(pk.cells,k.s*k.p);near(pk.vMax,4.2*k.s,1e-9);near(pk.vMin,3*k.s,1e-9);near(pk.eWh,k.s*k.p*k.q*(prim(1)-prim(0)),1e-9);near(K.storedWh(pk,0,1),pk.eWh,1e-6,'sayısal enerji');near(K.storedWh(pk,.2,.7),k.s*k.p*k.q*(prim(.7)-prim(.2)),1e-8);
 for(const soc of[.05,.5,1])for(const P of[5000,100000,350000]){const d=K.discharge(pk,soc,P),V=k.s*K.ocv(soc);near(d.pMax,V*V/(4*pk.R),1e-12);if(P>d.pMax){eq(d.ok,false);continue;}near((V-d.I*pk.R)*d.I,P,1e-9,'güç dengesi');near(d.Iroot,d.I,1e-9,'kök');ok(d.I<=V/(2*pk.R)*(1+1e-12),'küçük kök');near(d.vt,V-d.sag,1e-12);near(d.heat,d.sag*d.I,1e-9);near(d.crate,d.I/pk.Q,1e-12);near(d.eff,d.vt/V,1e-9,'verim = V_uç/V_oc');}}
eq(K.discharge(K.pack({s:48,p:1,q:20,r:.004}),.05,350000).ok,false);
// 400 V / 800 V: aynı hücreler
for(const k of[{s:96,p:2,q:90,r:.0012},{s:60,p:4,q:50,r:.002},{s:100,p:6,q:20,r:.0035}])for(const soc of[.1,.5,.95])for(const P of[20000,100000,200000]){const v=K.voltageCompare(k,soc,P,.02);if(!v.ok)continue;near(v.db.Iroot/v.da.Iroot,.5,1e-9);near(v.cableB/v.cableA,.25,1e-9,'kablo ısısı dörtte bir');near(v.cellB/v.cellA,1,1e-9,'hücre ısısı aynı');near(v.db.voc/v.da.voc,2,1e-12);near(v.b.eWh,v.a.eWh,1e-12);near(v.b.R/v.a.R,4,1e-12);}
eq(K.voltageCompare({s:96,p:3,q:90,r:.0012},.5,1e5,.02),null);

// 7 · Şarj: sabit akım süresi Q·Δs/I, SoC üzerinden kareleme, enerji dengesi
const pk0=K.pack({s:96,p:2,q:90,r:.0012}),co0={s0:.1,pMax:150000,iMax:500,cRate:2,rCable:.02};
{const r=K.chargeSim(pk0,co0);near(K.timeAt(r.trace,.8),.7*180*3600/360,1e-9,'10→80 sabit akım');near(K.timeAt(r.trace,.5),.4*180*3600/360,1e-9);eq(K.timeAt(r.trace,.05),null);eq(K.timeAt(r.trace,.9999),null);
 const cc=K.ccTheory(pk0,co0);near(r.modeT.cc,cc.time,1e-6,'CC süresi');near(pk0.vMax-pk0.voc(cc.sSwitch),360*pk0.R,1e-9,'geçiş koşulu');near(r.modeT.cc+r.modeT.cp+r.modeT.cv,r.tEnd,1e-12);
 // sabit gerilim evresi: t = ∫ cap·R ds / (V_max − V_oc), s_geçiş → kesme akımı
 const cap=180*3600;let lo=cc.sSwitch,hi=1;for(let i=0;i<200;i++){const m=(lo+hi)/2;if((pk0.vMax-pk0.voc(m))/pk0.R>.05*180)lo=m;else hi=m;}const sEnd=(lo+hi)/2,tcv=simpson(s=>cap*pk0.R/(pk0.vMax-pk0.voc(s)),cc.sSwitch,sEnd,20000);
 near(r.sEnd,sEnd,1e-6,'bitiş doluluğu');near(r.modeT.cv,tcv,2e-5,'CV süresi');near(r.tEnd,cc.time+tcv,2e-5);eq(r.end,'cutoff');
 near(r.E.stored/3600,96*180*(prim(r.sEnd)-prim(.1)),1e-6,'depolanan = ∫V dQ');near(r.E.charger,r.E.stored+r.E.heatCell+r.E.heatCable,1e-12);near(r.E.heatCable/r.E.heatCell,.02/pk0.R,1e-9);
 const heatCC=360*360*pk0.R*cc.time,heatCV=simpson(s=>cap*(pk0.vMax-pk0.voc(s)),cc.sSwitch,sEnd,20000) /* I²R dt = I·R·cap ds */;near(r.E.heatCell,heatCC+heatCV,2e-5,'hücre ısısı');
 const r2=K.chargeSim(pk0,{...co0,dt:.25});near(r.tEnd,r2.tEnd,1e-5,'dt ikizi');near(r.E.charger,r2.E.charger,1e-6);
 const t80=K.timeAt(r.trace,.8);ok((r.tEnd-t80)/((r.sEnd-.8))>2*t80/.7,'son dilim yüzde başına en az iki kat yavaş');ok(Math.abs(t80/60-21)<1e-6&&Math.abs(r.tEnd/60-35.63)<.01,'varsayılan süreler');}
// güç sınırlı (CP) şarj: t = ∫ cap ds / I_p(s)
for(const[pMax,rk]of[[11000,.02],[50000,0],[50000,.05]]){const o={...co0,pMax,rCable:rk},r=K.chargeSim(pk0,o),Rt=pk0.R+rk,ip=s=>{const V=pk0.voc(s);return(-V+Math.sqrt(V*V+4*Rt*pMax))/(2*Rt);};eq(r.trace[0].mode,'cp');eq(K.ccTheory(pk0,o),null);
 near(K.timeAt(r.trace,.8),simpson(s=>180*3600/ip(s),.1,.8),1e-6,'CP süresi');for(const p of r.trace)if(p.mode==='cp'){near(p.p,pMax,1e-9,'güç sabit');break;}ok(Math.max(...r.trace.map(p=>p.p))<=pMax*(1+1e-9));ok(Math.max(...r.trace.map(p=>p.v))<=pk0.vMax*(1+1e-9),'gerilim sınırı');}
// kablo akım sınırı: 400 V paket 250 A ile, 800 V paket hücre sınırıyla dolar
{const a=K.chargeSim(pk0,{...co0,iMax:250}),b=K.chargeSim(K.pack({s:192,p:1,q:90,r:.0012}),{...co0,iMax:250});near(K.timeAt(a.trace,.8),.7*180*3600/250,1e-9);near(K.timeAt(b.trace,.6),.5*90*3600/180,1e-9);ok(Math.max(...b.trace.map(p=>p.p))<=150000*(1+1e-9));}
{const r=K.chargeSim(pk0,{...co0,s0:.79,cRate:4,iMax:600,pMax:350000});ok(r.sEnd>.99&&r.tEnd>0);const z=K.chargeSim(pk0,{...co0,s0:.9995});eq(z.tEnd,0);}
// 8 · Geçersiz girdiler
for(const call of[()=>K.steady(base,0),()=>K.steady({...base,eta:0},10),()=>K.road({...base,m:0}),()=>K.ocv(1.2),()=>K.pack({s:96.5,p:2,q:90,r:.001}),()=>K.discharge(pk0,.5,-1),()=>K.chargeSim(pk0,{...co0,s0:1}),()=>K.cycle(base,{vc:0,L:1,a:1,d:1,idle:0,frac:1}),()=>K.tractive(car0,{...mot0,gear:0},1),()=>K.motorInfo({...car0,grade:-.05},mot0),()=>K.fitSlope([1],[1]),()=>K.simulate(base,[{kind:'uç'}]),()=>K.steady({...base,m:NaN},10)]){assert.throws(call);checks++;}
console.log(`G elektrikli-araclar: ${checks.toLocaleString('tr-TR')} bağımsız çekirdek kontrolü PASS`);

if(process.argv.includes('--browser')){
 const {chromium}=await import('playwright');const {createServer}=await import('node:http');const {join,extname}=await import('node:path');const {fileURLToPath}=await import('node:url');const root=fileURLToPath(new URL('../',import.meta.url));
 const server=createServer((req,res)=>{const file=join(root,decodeURIComponent(new URL(req.url,'http://localhost').pathname));if(!fs.existsSync(file)||fs.statSync(file).isDirectory()){res.writeHead(404).end();return;}res.setHeader('Content-Type',({'.html':'text/html; charset=utf-8','.js':'text/javascript; charset=utf-8','.css':'text/css; charset=utf-8'})[extname(file)]||'application/octet-stream');res.end(fs.readFileSync(file));});await new Promise(r=>server.listen(0,'127.0.0.1',r));let browser;
 try{browser=await chromium.launch();const before=checks;
 for(const[width,theme]of[[390,'light'],[1280,'dark']]){const page=await browser.newPage({viewport:{width,height:900},deviceScaleFactor:width<500?2:1});await page.addInitScript(t=>{localStorage.setItem('acelya-theme',t);localStorage.setItem('acelya-sound-muted','1');},theme);page.setDefaultTimeout(5000);const errors=[];page.on('pageerror',e=>errors.push(e.message));page.on('console',m=>{if(m.type()==='error'&&!/404/.test(m.text()))errors.push(m.text());});await page.goto(`http://127.0.0.1:${server.address().port}/elektrikli-araclar.html`);
  const click=id=>page.locator('#'+id).click(),read=id=>page.locator('#'+id).textContent(),range=(id,v)=>page.locator('#'+id).evaluate((e,v)=>{e.value=v;e.dispatchEvent(new Event('input',{bubbles:true}));},v),has=async(id,text)=>{const t=await read(id);assert(t.includes(text),`${width}px ${id}: "${t}" içinde "${text}" yok`);checks++;};
  const clean=async tag=>{const bad=await page.evaluate(()=>[...document.querySelectorAll('section:not([hidden]) strong[id],section:not([hidden]) em[id],section:not([hidden]) [role=status],section:not([hidden]) td,section:not([hidden]) output,section:not([hidden]) caption')].filter(e=>/NaN|undefined|Infinity|null/.test(e.textContent)||(e.matches('strong[id],[role=status],output')&&!e.textContent.trim())).map(e=>(e.id||e.tagName)+': '+e.textContent));assert.deepEqual(bad,[],width+'px '+tag);checks++;eq(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),true,width+'px taşma '+tag);assert.deepEqual(errors,[],width+'px '+tag);checks++;};
  const painted=async id=>{eq(await page.locator('#'+id).evaluate(c=>{const d=c.getContext('2d').getImageData(0,0,c.width,c.height).data,s=new Set();for(let i=0;i<d.length;i+=4*97)s.add(d[i]<<16|d[i+1]<<8|d[i+2]);return s.size>3;}),true,width+'px tuval '+id);};
  // erişilebilirlik: her denetimin etiketi, her tuvalin rolü
  eq(await page.evaluate(()=>[...document.querySelectorAll('main.app-content input,main.app-content select,main.app-content textarea')].every(e=>e.id&&document.querySelector('label[for="'+e.id+'"]'))),true,'etiketler');eq(await page.evaluate(()=>[...document.querySelectorAll('main.app-content canvas')].every(c=>c.getAttribute('role')==='img'&&!!c.getAttribute('aria-label'))),true);eq(await page.evaluate(()=>document.querySelectorAll('main.app-content input[type=range]').length),35);
  eq(await page.evaluate(()=>[...document.querySelectorAll('main.app-content input[type=range]')].every(e=>{const n=(+e.value-+e.min)/+e.step;return Math.abs(n-Math.round(n))<1e-6;})),true,'varsayılanlar adım ızgarasında');
  // 01 · sürüş
  await has('fAero','230 N');await has('fRoll','177 N');await has('pBatt','11,78 kW');await has('cons','130,9 Wh/km');await has('range','458 km');await has('vOptMeas','30,57 km/sa');await has('vOptTheory','30,57 km/sa');await has('vOptDiff','0,000 %');await has('auxRatio','2,000');await has('slopeAero','2,000');await has('slopeLocal','1,040');await has('slopeLocalTh','1,040');await has('cycCons','137,5 Wh/km');await has('cycCity','137,5');await has('cycHwy','188,7');await has('cycBackPct','%59,5');await has('cycEtaNote','şu an %85');await has('cycBal','0,000000 Wh');await painted('rangeCanvas');await painted('consCanvas');await painted('cycleCanvas');
  await click('auxCold');await has('pauxOut','3,0 kW');await has('vOptMeas','55,55 km/sa');await has('vOptTheory','55,55 km/sa');await has('cycCity','228,2');await has('cycHwy','210,3');await has('cycStatus','Şehir daha pahalı');
  await click('auxNone');await has('vOptMeas','İç tepe yok');await has('vOptTheory','Tanımsız');await has('auxRatio','—');await has('driveStatus','iç tepesi yok');
  await click('auxMild');await click('cycHwyBtn');await has('cycCons','188,7 Wh/km');await has('cycLOut','20,0 km');await click('cycCityBtn');await has('cycCons','137,5');await range('cycRegen',100);await has('cycBackPct','%85,0');await range('cycRegen',70);
  await range('cycL',.1);await range('cycV',140);await has('cycStatus','yetmiyor');await range('cycRegen',0);await has('cycBack','0,0 Wh');
  await range('grade',-6);await range('speed',30);await range('paux',0);await range('cycRegen',100);await has('range','Tanımsız');await has('driveStatus','jeneratör');await has('vOptMeas','Tanımsız');await clean('iniş');
  for(const edge of['min','max']){await page.evaluate(edge=>{document.querySelectorAll('#panel-drive input[type=range]').forEach(e=>{e.value=e[edge];});document.getElementById('mass').dispatchEvent(new Event('input',{bubbles:true}));},edge);await clean('sürüş '+edge);}
  await click('driveReset');await has('cons','130,9 Wh/km');await has('cycCons','137,5');await has('gradeOut','0,0 %');await clean('sürüş');
  // 02 · batarya
  await click('tab-pack');await has('packV','361,4 V');await has('packE','64,85 kWh');await has('packETh','64,85 kWh');await has('packI','290,08 A');await has('packITh','290,08 A');await has('packC','1,61 C');await has('packHeat','4,85 kW');await has('vcRows','0,2500');await has('vcRows','1,0000');await has('vcRows','192s1p');await has('chT1','21,00 dk');await has('chT2','14,63 dk');await has('chRatio','2,46 kat');await has('chCC','21,68 dk');await has('chCCTh','21,68 dk');await has('chCCDiff','0,0000 %');await has('chSwitch','%82,3');await has('chStatus','sabit akım → sabit gerilim');await painted('ocvCanvas');await painted('chargeCanvas');
  await click('pack800');await has('packV','722,9 V');await has('packI','145,04 A');await has('packHeat','4,85 kW');await has('vcCaption','yarı gerilimli 96s2p');await has('vcRows','192s1p (seçili)');await has('vcRows','0,2500');await has('vcRows','1,0000');await has('packStatus','bağlansaydı');await has('chT1','21,00 dk');
  await click('pack400');await click('chCable');await has('chIOut','250 A');await has('chT1','30,24 dk');await click('pack800');await has('chT1','21,00 dk');
  await click('pack400');await click('chAC');await has('chCC','Yok');await has('chStatus','güç sınırı');await has('chStatus','belirgin biçimde yavaşlamıyor');await click('chDC50');await has('chPOut','50 kW');await click('chDC150');await has('chT1','21,00 dk');
  await range('pLoad',350);await range('cellS',48);await range('cellP',1);await range('cellR',4);await range('soc',5);await has('packI','—');await has('packStatus','gerçek kökü yok');await clean('paket aşırı yük');
  for(const edge of['min','max']){await page.evaluate(edge=>{document.querySelectorAll('#panel-pack input[type=range]').forEach(e=>{e.value=e[edge];});document.getElementById('soc').dispatchEvent(new Event('input',{bubbles:true}));},edge);await clean('batarya '+edge);}
  await click('packReset');await has('packI','290,08 A');await has('chT1','21,00 dk');await has('chS0Out','10 %');await clean('batarya');
  // 03 · motor
  await click('tab-motor');await has('mBase','44,0 km/sa');await has('mF0','7364 N');await has('mTop','216,03 km/sa');await has('mTopTh','216,03 km/sa');await has('mTopDiff','0,0000 %');await has('mAcc','9,87 s');await has('mAccTh','9,21 s');await has('rKE','192,9 Wh');await has('rBatt','138,9 Wh');await has('rBattTh','138,9 Wh');await has('rDiff','0,0000 %');await has('rDist','154,3 m; 11,11 s');await has('rBal','0,000000 Wh');await has('brakeRows','179,3');await has('flowRows','%100,0');await has('vehSummary','1800 kg');await painted('forceCanvas');await painted('brakeCanvas');
  eq(await page.locator('#flowBar span').count(),6,'akış dilimleri (yokuş sıfır)');
  await click('gearShort');await has('mTopWhy','Devir sınırı');await has('mTop','165,88 km/sa');await click('gearLong');await has('mTopWhy','Sabit güç');
  await click('brakeGentle');await has('regenStatus','diskler hiç çalışmıyor');await click('brakeHard');await has('decOut','4,0 m/s²');await has('regenStatus','aşıyor');
  await range('v0',160);await range('pmax',40);await has('flowCaption','çıkamıyor');
  await range('tmax',100);await range('gear',5);await range('mGrade',10);await has('mTop','—');await has('motorStatus','kalkamıyor');await has('flowCaption','kalkamıyor');await clean('motor kalkamıyor');
  for(const edge of['min','max']){await page.evaluate(edge=>{document.querySelectorAll('#panel-motor input[type=range]').forEach(e=>{e.value=e[edge];});document.getElementById('v0').dispatchEvent(new Event('input',{bubbles:true}));},edge);await clean('motor '+edge);}
  await click('motorReset');await has('mTop','216,03 km/sa');await has('rBatt','138,9 Wh');await clean('motor');
  // sekme 1'deki araç sekme 3'e taşınır
  await click('tab-drive');await range('mass',2600);await click('tab-motor');await has('vehSummary','2600 kg');await has('rKE','278,6 Wh');
  // ortak değerler: Motoru sıfırla aracı, Sürüşü sıfırla geri kazanım verimini de varsayılana döndürür
  await click('motorReset');await has('vehSummary','m = 1800 kg');await has('rKE','192,9 Wh');await has('massOut','1800 kg');await range('rEta',60);await click('tab-drive');await has('cycCons','153,1');await has('cycEtaNote','şu an %60');await click('driveReset');await has('cycCons','137,5');await has('rEtaOut','85 %');
  // klavye: sekmeler ve R
  await page.locator('#tab-drive').focus();await page.keyboard.press('End');eq(await page.locator('#tab-motor').getAttribute('aria-selected'),'true');await page.keyboard.press('ArrowRight');eq(await page.locator('#tab-drive').getAttribute('aria-selected'),'true');await page.keyboard.press('ArrowLeft');eq(await page.locator('#tab-motor').getAttribute('aria-selected'),'true');await page.keyboard.press('Home');eq(await page.locator('#tab-drive').getAttribute('aria-selected'),'true');eq(await page.locator('#panel-pack').isHidden(),true);
  await range('speed',150);await page.locator('#speed').focus();await page.keyboard.press('r');await has('speedOut','150 km/sa');await page.evaluate(()=>document.activeElement.blur());await page.keyboard.press('r');await has('speedOut','90 km/sa');
  eq(await page.evaluate(()=>Object.isFrozen(EVLab)&&!Object.getOwnPropertyDescriptor(window,'EVLab').writable),true);await clean('son');await page.close();}
 console.log(`G elektrikli-araclar: ${checks-before} tarayıcı kontrolü (390 px aydınlık + 1280 px karanlık) PASS`);
 }finally{await browser?.close();await new Promise(r=>server.close(r));}
}
