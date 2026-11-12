// Uçak Mühendisliği ve Aerodinamik laboratuvarı: çekirdeğin bağımsız denetimi.
// Başvurular sayfanın formüllerini yinelemez: potansiyel akış burada ayrı bir karmaşık sayı sınıfıyla ve sayısal
// türevle kurulur (teğetlik, Kutta koşulu, sıkışmazlık, dönmesizlik denetlenir), kuvvet başka bir kareleme ile
// toplanır, parçacıklar zaman adımlı RK4 ile izlenir; performans kaba taramayla, atmosfer ayrı bir hidrostatik
// integralle ve yayımlanmış ISA tablosuyla (Wikipedia "International Standard Atmosphere": 11 km 22 632 Pa,
// 0,3639 kg/m³; 20 km 5 474,9 Pa, 0,0880 kg/m³), dönüş korunum yasaları ve çevrel çemberle, menzil ve kalkış
// ağırlık / hız değişkeninde Simpson integraliyle sınanır.
// Kullanım: node scripts/check-g-ucak-muhendisligi-ve-aerodinamik.mjs [--browser]
import fs from 'node:fs';
import vm from 'node:vm';
import assert from 'node:assert/strict';
import { canvasInk, canvasInkAll, assertCanvasDrawn } from './lib/canvas-check.mjs';
const SLUG='ucak-muhendisligi-ve-aerodinamik';
const html=fs.readFileSync(new URL(`../${SLUG}.html`,import.meta.url),'utf8');
const source=html.split('/* KERNEL-BEGIN */')[1]?.split('/* KERNEL-END */')[0];
assert(source,'KERNEL sınırları gerekli');
const context={window:{}};vm.createContext(context);vm.runInContext(source,context);
const K=context.window.AeroLab;assert(K&&Object.isFrozen(K),'AeroLab dondurulmuş olmalı');
let checks=0;
const near=(a,b,tol=1e-9,msg='')=>{assert(Number.isFinite(a)&&Math.abs(a-b)<=tol*Math.max(1,Math.abs(b)),`${msg} ${a} ≠ ${b} (tol ${tol})`);checks++;};
const ok=(c,msg)=>{assert(c,msg);checks++;};
const eq=(a,b,msg='')=>{assert.equal(a,b,msg+` (${a} ≠ ${b})`);checks++;};
const RAD=Math.PI/180,g=9.80665;
const simpson=(f,a,b,n=2000)=>{let s=f(a)+f(b);const h=(b-a)/n;for(let i=1;i<n;i++)s+=f(a+i*h)*(i%2?4:2);return s*h/3;};

/* ───── 01 Joukowski: bağımsız karmaşık potansiyel ───── */
class C{constructor(r,i=0){this.r=r;this.i=i;}add(o){return new C(this.r+o.r,this.i+o.i);}sub(o){return new C(this.r-o.r,this.i-o.i);}mul(o){return new C(this.r*o.r-this.i*o.i,this.r*o.i+this.i*o.r);}
 div(o){const d=o.r*o.r+o.i*o.i;return new C((this.r*o.r+this.i*o.i)/d,(this.i*o.r-this.r*o.i)/d);}abs(){return Math.hypot(this.r,this.i);}conj(){return new C(this.r,-this.i);}
 static exp(t){return new C(Math.cos(t),Math.sin(t));}log(){return new C(Math.log(this.abs()),Math.atan2(this.i,this.r));}}
const one=new C(1),I=new C(0,1);
function ref(eps,kap,alphaDeg){ // her şey sıfırdan: geometri kaba taramayla, sirkülasyon firar kenarındaki durma koşulundan sayısal kökle
 const z0=new C(-eps,kap),a=Math.hypot(1+eps,kap),zeta=th=>z0.add(C.exp(th).mul(new C(a))),map=z=>z.add(one.div(z));
 const thTE=-Math.atan2(kap,1+eps);let best=0,thLE=Math.PI;for(let th=2;th<4.3;th+=1e-4){const p=map(zeta(th)),d=Math.hypot(p.r-2,p.i);if(d>best){best=d;thLE=th;}}
 for(const st of[1e-6,1e-8]){const c0=thLE;for(let k=-150;k<=150;k++){const th=c0+k*st,p=map(zeta(th)),d=(p.r-2)**2+p.i**2;if(d>best*best){best=Math.sqrt(d);thLE=th;}}}
 const le=map(zeta(thLE)),delta=Math.atan2(-le.i,2-le.r),am=alphaDeg*RAD+delta;
 const dW=(z,gam)=>{const d=z.sub(z0);return C.exp(-am).sub(new C(a*a).mul(C.exp(am)).div(d.mul(d))).add(I.mul(new C(gam)).div(d));}; // dW/dζ, Γ = 2π·gam
 // Kutta: firar kenarında (ζ = 1) daire düzlemindeki hız sıfır olmalı → gam'ı ikiye bölmeyle bul
 let lo=-10,hi=10;const tang=gam=>{const w=dW(zeta(thTE),gam),t=C.exp(thTE).mul(I);return(w.mul(t)).r;};for(let i=0;i<200;i++){const m=(lo+hi)/2;if((tang(m)<0)===(tang(lo)<0))lo=m;else hi=m;}
 const gam=(lo+hi)/2,vel=z=>{const w=dW(z,gam).div(one.sub(one.div(z.mul(z))));return[w.r,-w.i];};
 return{z0,a,zeta,map,thTE,thLE,le,c:best,delta,am,gam,dW,vel};}
const CASES=[[.1,.04,4],[.1,0,5],[.05,.08,0],[.2,.04,10],[.03,0,8],[.1,.04,-6],[.25,.15,20],[.03,.15,-10],[.15,0,0]];
for(const[eps,kap,al]of CASES){const R=ref(eps,kap,al),J=K.jk(eps,kap,al);
 near(J.c,R.c,1e-8,'veter');ok(Math.abs(J.delta-R.delta)<1e-7,'δ');near(J.gam,R.gam,1e-6,'Kutta sirkülasyonu');near(J.a,R.a,1e-12);
 // hız alanı: çekirdek ile bağımsız kurulum, yüzeyde ve uzakta
 for(const[k,th]of[[1,.3],[1,2.9],[1,4.4],[1.4,1],[3,5],[20,2]]){const z=R.z0.add(C.exp(th).mul(new C(k*R.a))),v=K.jkVel(J,z.r,z.i),w=R.vel(z);near(v[0],w[0],1e-5,'u');near(v[1],w[1],1e-5,'v');}
 // yüzeyde akış teğet: normal bileşen sıfır (normal, bağımsız haritanın sonlu farkından)
 const ring=K.jkRing(J,1,720);for(let i=5;i<720;i+=37){const p=ring[i],h=1e-6,a=R.map(R.zeta(p.th-h)),b=R.map(R.zeta(p.th+h)),tx=b.r-a.r,ty=b.i-a.i,tn=Math.hypot(tx,ty);near(p.x,R.map(R.zeta(p.th)).r,1e-10);ok(Math.abs(p.u*ty-p.v*tx)/tn<1e-6*(1+p.q),'teğetlik');near(p.cp,1-p.q*p.q,1e-12);}
 // Kutta: firar kenarında hız sonlu ve iki yandan aynı
 const te=ring[0],up=ring[1],dn=ring[719];ok(Number.isFinite(te.q)&&te.q<5,'firar kenarı hızı sonlu');ok(Math.abs(up.q-te.q)<.05&&Math.abs(dn.q-te.q)<.05,'firar kenarında süreklilik');
 // uzak alan serbest akıma gider; dünya çerçevesinde yatay
 const far=K.jkVel(J,4000,3000),fw=K.jkWorld(J,far[0],far[1]);near(fw[0],1,2e-3);ok(Math.abs(fw[1])<2e-3,'uzakta akım yatay');
 // sıkışmazlık ve dönmesizlik: profil düzleminde sonlu fark
 for(const[x,y]of[[-3,1],[0,1.5],[1,-1.2],[3.5,.4],[-2.6,-.5]]){const h=1e-4,V=(x,y)=>{const zz=K.jkInv(J,x,y);return K.jkVel(J,zz[0],zz[1]);},ux=(V(x+h,y)[0]-V(x-h,y)[0])/(2*h),vy=(V(x,y+h)[1]-V(x,y-h)[1])/(2*h),uy=(V(x,y+h)[0]-V(x,y-h)[0])/(2*h),vx=(V(x+h,y)[1]-V(x-h,y)[1])/(2*h);ok(Math.abs(ux+vy)<1e-6,'div = 0');ok(Math.abs(vx-uy)<1e-6,'rot = 0');
  const zz=K.jkInv(J,x,y),back=K.jkMap(zz[0],zz[1]);near(back[0],x,1e-10);near(back[1],y,1e-10);
  // akım fonksiyonu: ∂ψ/∂y = u, ∂ψ/∂x = −v (eşleme eksenlerinde)
  const psi=(x,y)=>{const q=K.jkInv(J,x,y);return K.jkPsi(J,q[0],q[1]);},v0=V(x,y);near((psi(x,y+h)-psi(x,y-h))/(2*h),v0[0],1e-6,'ψ_y = u');near(-(psi(x+h,y)-psi(x-h,y))/(2*h),v0[1],1e-6,'−ψ_x = v');}
 ok(Math.abs(K.jkPsi(J,...[R.zeta(1.1).r,R.zeta(1.1).i]))<1e-12,'yüzey bir akım çizgisi');
 // kuvvet: bağımsız hız alanı + orta nokta kuralı (N = 40 000), Bernoulli
 let fx=0,fy=0;const N=40000;for(let i=0;i<N;i++){const t0=R.thTE+2*Math.PI*i/N,t1=R.thTE+2*Math.PI*(i+1)/N,a=R.map(R.zeta(t0)),b=R.map(R.zeta(t1)),v=R.vel(R.zeta((t0+t1)/2)),cp=1-v[0]*v[0]-v[1]*v[1];fx-=cp*(b.i-a.i);fy+=cp*(b.r-a.r);}
 const clRef=(-fx*Math.sin(R.am)+fy*Math.cos(R.am))/R.c,cdRef=(fx*Math.cos(R.am)+fy*Math.sin(R.am))/R.c,F=K.jkForces(J),T=K.jkTheory(J);
 near(F.cl,clRef,2e-4,'C_l basınç integrali');ok(Math.abs(cdRef)<2e-4&&Math.abs(F.cd)<1e-9,'d\'Alembert: C_d = 0');
 near(F.cl,2*(2*Math.PI*R.gam)/R.c,1e-6,'Kutta–Joukowski: C_l = 2Γ/(Uc)');near(T.cl,F.cl,1e-9,'kapalı biçim');near(T.gamma,2*Math.PI*R.gam,1e-6);
 // kontrol eğrileri: sirkülasyon her eğride aynı, basınç + momentum = kaldırma, sürükleme yok
 for(const k of[1,1.25,2,3,10]){const c=K.jkContour(J,k);near(c.gamma,2*Math.PI*R.gam,1e-6,'Γ çizgi integrali');near(c.gamma,T.gamma,1e-10);near(c.clP+c.clM,F.cl,1e-9,'kontrol hacmi dengesi');ok(Math.abs(c.cdP+c.cdM)<1e-9,'kontrol hacminde sürükleme yok');if(k===1)ok(Math.abs(c.clM)<1e-9,'yüzeyde momentum akısı yok');}
 if(Math.abs(F.cl)>.05){const c=K.jkContour(J,300);near(c.clP/F.cl,.5,2e-3,'uzakta basınç payı ½');near(c.clM/F.cl,.5,2e-3,'uzakta momentum payı ½');const c3=K.jkContour(J,3);ok(c3.clP/F.cl>.5&&c3.clP/F.cl<1,'yakında basınç payı baskın');}
 // geometri: kaba taramayla kalınlık ve kamber
 const G=K.jkGeom(J),cd=Math.cos(R.delta),sd=Math.sin(R.delta),up2=new Map(),lo2=new Map();for(let i=0;i<200000;i++){const th=R.thTE+2*Math.PI*i/200000,p=R.map(R.zeta(th)),xi=((p.r-R.le.r)*cd+(p.i-R.le.i)*sd)/R.c,eta=(-(p.r-R.le.r)*sd+(p.i-R.le.i)*cd)/R.c,b=Math.round(xi*200),m=th<R.thLE?up2:lo2;if(Math.abs(xi*200-b)<.02)m.set(b,eta);}
 let tc=0,hc=0;for(let b=1;b<200;b++)if(up2.has(b)&&lo2.has(b)){tc=Math.max(tc,up2.get(b)-lo2.get(b));const m=(up2.get(b)+lo2.get(b))/2;if(Math.abs(m)>Math.abs(hc))hc=m;}
 near(G.tc,tc,2e-3,'t/c');ok(Math.abs(G.hc-hc)<2e-4,'h/c');
 // sıfır kaldırma açısı: ölçülen kök = −(β + δ); ince kanat −2h/c buna yakın
 const a0=K.jkAlpha0(eps,kap);ok(Math.abs(a0-T.alpha0)<1e-6,'α₀ kökü');ok(Math.abs(K.jkForces(K.jk(eps,kap,a0)).cl)<1e-7,'α₀\'da C_l = 0');ok(Math.abs(a0+2*hc/RAD)<.12+.6*kap/RAD*eps,'ince kanat α₀ yakın');
 near(T.alpha0,-(Math.atan2(kap,1+eps)+R.delta)/RAD,1e-6);
 // moment: basınç merkezi tanımı x_cp·C_n = −C_m,LE; simetrikte c/4 yakınında
 if(F.xcp!==null)near(F.cm4,-(F.xcp-.25)*F.cn,1e-9,'C_m(c/4) ile basınç merkezi tutarlı');
 if(kap===0&&Math.abs(al)>1)ok(Math.abs(F.xcp-.25)<.02,'simetrik profilde basınç merkezi ≈ c/4');
 ok(F.cpMin<0&&F.cpMin>=1-Math.max(...ring.map(p=>p.q))**2-1e-12,'C_p,min');ok(Math.max(...ring.map(p=>p.cp))<=1+1e-12,'C_p ≤ 1');
}
// simetrik profil kapalı biçimi, çember yayı ve düz levha sınırı
for(const eps of[.03,.1,.25])for(const al of[-5,3,12]){near(K.jkForces(K.jk(eps,0,al)).cl,2*Math.PI*(1+eps/(1+eps))*Math.sin(al*RAD),1e-7,'simetrik Joukowski');ok(Math.abs(K.jk(eps,0,al).delta)<1e-7,'simetrikte δ = 0');}
for(const kap of[.05,.15])for(const al of[0,6]){const J=K.jk(0,kap,al),b=Math.atan(kap);near(J.c,4,1e-9,'çember yayı veteri 4b');near(K.jkContour(J,2).clKJ,2*Math.PI*Math.sin(al*RAD+b)/Math.cos(b),1e-7,'çember yayı');}
for(const al of[2,9])near(K.jkContour(K.jk(1e-9,0,al),2).clKJ,2*Math.PI*Math.sin(al*RAD),1e-6,'düz levha 2π sin α');
ok(K.jkTheory(K.jk(.1,.04,4)).slope>2*Math.PI,'kalınlık eğimi 2π\'nin üstüne çıkarır');
// kaldırma doğrusal değil sinüs: α + δ + β = 90°'ye dek tırmanır, perdövites yok (modelin sınırı)
{let prev=-9;for(let a=-10;a<=20;a++){const c=K.jkForces(K.jk(.1,.04,a),360).cl;ok(c>prev,'model C_l hep artar');prev=c;}}
// geçiş süreleri: zaman adımlı RK4 ile bağımsız parçacık izleme (daire düzleminde dζ/dt = conj(W')/|z'|²)
for(const[eps,kap,al]of[[.1,.04,4],[.1,0,0],[.2,.04,10],[.1,.04,-6]]){const J=K.jk(eps,kap,al),R=ref(eps,kap,al),tr=K.jkTransit(J,.07),E=K.jkEnds(J);
 const run=sgn=>{const y0=tr.ys+sgn*.07*J.c,st=K.jkInv(J,tr.xs*Math.cos(R.am)-y0*Math.sin(R.am),tr.xs*Math.sin(R.am)+y0*Math.cos(R.am));let z=new C(st[0],st[1]),t=0;const f=z=>{const w=R.dW(z,R.gam),p=one.sub(one.div(z.mul(z)));return w.conj().div(new C(p.abs()**2));},xw=z=>{const p=R.map(z);return p.r*Math.cos(R.am)+p.i*Math.sin(R.am);},dt=.004;
  for(let i=0;i<1e6;i++){const k1=f(z),k2=f(z.add(k1.mul(new C(dt/2)))),k3=f(z.add(k2.mul(new C(dt/2)))),k4=f(z.add(k3.mul(new C(dt)))),nz=z.add(k1.add(k2.mul(new C(2))).add(k3.mul(new C(2))).add(k4).mul(new C(dt/6)));if(xw(nz)>=E.te[0]){const a=xw(z),b=xw(nz);return(t+dt*(E.te[0]-a)/(b-a))/J.c;}z=nz;t+=dt;}};
 near(tr.tUp,run(1),2e-3,'üst geçiş süresi');near(tr.tLow,run(-1),2e-3,'alt geçiş süresi');const cl=K.jkForces(J).cl;
 if(cl>.05)ok(tr.tUp<tr.tLow-.05&&tr.tUp<tr.tFree,'kaldırma varken üstteki hava önce varır (eşit geçiş süresi yanlış)');else if(cl<-.05)ok(tr.tLow<tr.tUp-.05,'eksi kaldırmada alttaki önce varır');else ok(Math.abs(tr.tUp-tr.tLow)<2e-3,'kaldırma yokken eşit');
 // durma akım çizgisinin başlangıcı gerçekten ψ = 0 üzerinde ve akım çizgileri ψ'yi korur
 const L=K.jkStream(J,tr.xs,tr.ys+.3*J.c,E.te[0]+J.c,.03),psiAt=p=>{const q=K.jkInv(J,p[0]*J.ca-p[1]*J.sa,p[0]*J.sa+p[1]*J.ca);return K.jkPsi(J,q[0],q[1]);};ok(Math.abs(psiAt(L[L.length-1])-psiAt(L[0]))<2e-3,'akım çizgisi ψ sabit');ok(L[L.length-1][0]>E.te[0]+J.c,'akım çizgisi sağ kenara varır');ok(L.every((p,i)=>i===0||p[2]>L[i-1][2]),'süre artan');}

/* ───── 03 standart atmosfer ───── */
const R_AIR=287.05287,T0=288.15,P0=101325;
near(K.RHO0,1.225,1e-5,'ρ₀');near(K.isa(0).a,340.294,1e-5,'a₀');near(K.isa(0).T,288.15,1e-12);
// yayımlanmış tablo (Wikipedia ISA / ISO 2533): taban değerleri
{const a=K.isa(11000),b=K.isa(20000);near(a.T-273.15,-56.5,1e-9);ok(Math.abs(a.p-22632)<.6,'p(11 km) = 22 632 Pa');ok(Math.abs(a.rho-.3639)<5e-5,'ρ(11 km) = 0,3639');near(b.T-273.15,-56.5,1e-9);ok(Math.abs(b.p-5474.9)<.06,'p(20 km) = 5 474,9 Pa');ok(Math.abs(b.rho-.088)<5e-5,'ρ(20 km) = 0,0880');}
// bağımsız hidrostatik integral: d(ln p)/dh = −g/(R·T(h)), orta nokta kuralı, 0,5 m adım; sıcaklık profili tanımdan
{const Tdef=h=>h<=11000?288.15-.0065*h:216.65;let lnp=Math.log(P0),h=0;const marks=new Set([500,3000,5000,8000,11000,11100,15000,20000]);
 while(h<20000){lnp-=g/(R_AIR*Tdef(h+.25))*.5;h+=.5;if(marks.has(h)){const p=Math.exp(lnp),a=K.isa(h),i=K.isaIntegrate(h);near(a.p,p,1e-7,'p(h) '+h);near(a.rho,p/(R_AIR*Tdef(h)),1e-7,'ρ(h)');near(i.p,p,1e-7,'RK4 hidrostatik');near(a.T,Tdef(h),1e-12);near(a.sigma*a.theta,a.delta,1e-12,'σθ = δ');near(a.a,Math.sqrt(1.4*R_AIR*a.T),1e-12);near(K.isaAltForRho(a.rho),h,1e-6,'ters ISA');}}}
ok(K.isa(-50).h===0&&K.isa(25000).h===20000,'aralık dışı kırpılır');eq(K.isaIntegrate(0).steps,0);ok(K.isa(5000).rho<K.isa(4900).rho);
// jeopotansiyel–geometrik fark (sayfa metni): 20 km'de ~63 m
{const r=6356766,H=20000,z=r*H/(r-H);ok(Math.abs(z-H-63)<1,'20 km\'de geometrik fark ≈ 63 m');}

/* ───── 02 kutup eğrisi ve performans ───── */
const PLANES=[{m:1100,S:16.2,b:11,cd0:.03,e:.8,clmax:1.5,h:2000},{m:450,S:10.5,b:15,cd0:.012,e:.9,clmax:1.4,h:1000},{m:1600,S:14,b:9,cd0:.035,e:.75,clmax:1.6,h:0},{m:3000,S:8,b:7,cd0:.05,e:.5,clmax:1,h:8000},{m:300,S:30,b:25,cd0:.008,e:1,clmax:2.4,h:0}];
for(const c of PLANES){const P=K.polar(c),T=K.perfTheory(P),M=K.perfScan(P),rho=K.isa(c.h).rho,W=c.m*g,AR=c.b*c.b/c.S;
 // tanımdan sürükleme ve kaba tarama (0,002 m/s)
 const D=V=>{const q=.5*rho*V*V,cl=W/(q*c.S);return q*c.S*(c.cd0+cl*cl/(Math.PI*c.e*AR));};let dBest=Infinity,vd=0,pBest=Infinity,vp=0;for(let V=4;V<300;V+=.002){const d=D(V);if(d<dBest){dBest=d;vd=V;}if(d*V<pBest){pBest=d*V;vp=V;}}
 near(M.vmd,vd,2e-4,'V_md tarama');near(M.dmin,dBest,1e-8,'D_min');near(M.vmp,vp,2e-4,'V_mp tarama');near(M.pmin,pBest,1e-8,'P_min');
 near(T.vmd,vd,2e-4,'V_md kapalı');near(T.vmp,vp,2e-4,'V_mp kapalı');near(T.ldmax,W/dBest,1e-8,'(L/D)maks');near(T.ldmax,.5*Math.sqrt(Math.PI*c.e*AR/c.cd0),1e-12);near(T.pmin,pBest,1e-8);near(T.vmp/T.vmd,3**-.25,1e-12);near(M.ldmp/M.ldmax,Math.sqrt(3)/2,1e-6,'en az güçte L/D = 0,866·maks');
 const d=K.dragAt(P,T.vmd);near(d.Dp,d.Di,1e-9,'en az sürüklemede parazit = indüklenmiş');near(K.dragAt(P,T.vmp).Di,3*K.dragAt(P,T.vmp).Dp,1e-9,'en az güçte indüklenmiş = 3 × parazit');
 near(.5*rho*T.vs**2*c.S*c.clmax,W,1e-12,'V_s\'de L = W');near(K.dragAt(P,37).D,D(37),1e-12);near(K.dragAt(P,37).cl*.5*rho*37*37*c.S,W,1e-12);
 // süzülüş: bağımsız kartezyen RK4 (hız bileşenleri), kendi yoğunluk fonksiyonu
 for(const cl of[M.clmd,Math.min(c.clmax,M.clmp),.6*M.clmd]){if(c.h===0){eq(K.glideSim(P,cl,0).range,0);continue;}const cdv=c.cd0+cl*cl/(Math.PI*c.e*AR),G=K.glideSim(P,cl,c.h),rhoAt=h=>{const hh=Math.max(0,h),T=hh<=11000?T0-.0065*hh:216.65,p=P0*(T/T0)**(g/(R_AIR*.0065));return p/(R_AIR*T);};
  let s=[0,c.h,G.V0*Math.cos(G.gam0),G.V0*Math.sin(G.gam0)];const f=s=>{const V=Math.hypot(s[2],s[3]),k=.5*rhoAt(s[1])*V*c.S/c.m;return[s[2],s[3],k*(-cdv*s[2]-cl*s[3]),k*(-cdv*s[3]+cl*s[2])-g];},ax=(s,k,h)=>s.map((v,i)=>v+h*k[i]),dt=.05;
  for(let i=0;i<5e6;i++){const k1=f(s),k2=f(ax(s,k1,dt/2)),k3=f(ax(s,k2,dt/2)),k4=f(ax(s,k3,dt)),n=s.map((v,j)=>v+dt/6*(k1[j]+2*k2[j]+2*k3[j]+k4[j]));if(n[1]<=0){const fr=s[1]/(s[1]-n[1]);s=s.map((v,j)=>v+fr*(n[j]-v));break;}s=n;}
  near(G.range,s[0],2e-5,'süzülüş menzili (bağımsız integratör)');near(G.ld,cl/cdv,1e-12);
  // kuram: h·L/D kabaca, enerji düzeltmesiyle sıkı
  ok(G.range>c.h*G.ld&&G.range/(c.h*G.ld)<1.13,'h·(L/D) alt sınır, fark kinetik enerjiden');near(G.range,(c.h+(G.V0**2-G.V1**2)/(2*g))*G.ld,1e-2,'enerji düzeltmeli süzülüş');ok(G.V1<G.V0,'alçaldıkça gerçek hız düşer');
  ok(G.path[0][1]===c.h&&G.path[G.path.length-1][1]===0,'yol uçları');}
 ok(K.glideSim(P,M.clmd,c.h||500).range>=K.glideSim(P,.6*M.clmd,c.h||500).range,'en iyi süzülüş en uzağa gider');}

/* ───── 03 dönüş ve V–n ───── */
for(const[V,phi]of[[69.65,45],[55,30],[20,80],[120,5],[150,60],[30,1]]){const M=K.turnMeasure(V,phi),T=K.turnTheory(V,phi),n=1/Math.cos(phi*RAD),dt=1/120;
 // bağımsız ölçüm: yörüngenin üç noktasından çevrel çember ve sonlu farkla merkezcil ivme; hız ve irtifa korunur
 const pts=[];let s=[0,0,0,V,0,0];const N=Math.round(M.period/dt);for(let i=0;i<=N;i++){if(i===0||i===Math.round(N/3)||i===Math.round(2*N/3))pts.push(s.slice());if(i===N)pts.push(s.slice());s=K.turnStep(s,phi,n,dt);}
 const[a,b,c]=pts,d=2*(a[0]*(b[1]-c[1])+b[0]*(c[1]-a[1])+c[0]*(a[1]-b[1])),ux=((a[0]**2+a[1]**2)*(b[1]-c[1])+(b[0]**2+b[1]**2)*(c[1]-a[1])+(c[0]**2+c[1]**2)*(a[1]-b[1]))/d,uy=((a[0]**2+a[1]**2)*(c[0]-b[0])+(b[0]**2+b[1]**2)*(a[0]-c[0])+(c[0]**2+c[1]**2)*(b[0]-a[0]))/d,Rc=Math.hypot(a[0]-ux,a[1]-uy);
 near(M.radius,Rc,1e-5,'çevrel çember yarıçapı');near(M.radius,V*V/(g*Math.tan(phi*RAD)),1e-5,'r = V²/(g tan φ)');near(M.period,2*Math.PI*Rc/V,1e-5,'T = 2πr/V');near(M.rate,T.rate,1e-5);near(M.rate*M.period,360,1e-12);near(M.n,n,1e-12);
 const end=pts[3];ok(Math.hypot(end[0],end[1])<V*dt*1.01,'bir periyot sonra başa döner');near(Math.hypot(end[3],end[4],end[5]),V,1e-9,'hız korunur');ok(Math.abs(end[2])<1e-6&&M.zdev<1e-6,'irtifa korunur');ok(uy<0,'sağa dönüş');
 const s1=K.turnStep(a,phi,n,dt),acc=K.turnAcc(a,Math.sin(phi*RAD),Math.cos(phi*RAD),n);near(Math.hypot(acc[3],acc[4]),g*Math.tan(phi*RAD),1e-9,'yatay ivme g·tan φ');ok(Math.abs(acc[5])<1e-12,'düşey ivme 0');near(Math.hypot(acc[3],acc[4],acc[5]+g),n*g,1e-12,'kaldırma n·g');ok(s1[1]<0);
 // çubuğu çekmeden yatış: enerji korunumu V² − V₀² = 2g·Δh ve ilk andaki düşey ivme g(1 − cos φ)
 const D=K.turnDrop(V,phi,5);near(D.V*D.V-V*V,2*g*D.drop,1e-7,'enerji korunumu');const a1=K.turnAcc([0,0,0,V,0,0],Math.sin(phi*RAD),Math.cos(phi*RAD),1);near(-a1[5],g*(1-Math.cos(phi*RAD)),1e-12);ok(D.drop>0&&Math.abs(D.drop/D.theory-1)<.12,'irtifa kaybı yaklaşık ½g(1−cos φ)t²');}
eq(K.turnMeasure(60,0),null);near(K.turnTheory(100,60).n,2,1e-12,'60°\'de n = 2');
for(const c of[{ws:68,clmax:1.5,nmax:3.8,nmin:-1.5,vne:85,negRatio:.7},{ws:150,clmax:1,nmax:9,nmin:-4,vne:200,negRatio:.7},{ws:30,clmax:2.4,nmax:2,nmin:-1,vne:60,negRatio:.7}]){const E=K.vn(c);
 near(.5*1.225*E.vs**2*c.clmax,c.ws*g,1e-5,'V_s tanımı');near(E.nStall(E.vs),1,1e-12);near(E.nStall(E.va),c.nmax,1e-12,'V_A köşesi');near(E.nStallNeg(E.vaNeg),c.nmin,1e-12);near(E.nStall(2*E.vs),4,1e-12,'n ∝ V²');near(E.vs*Math.sqrt(2),Math.sqrt(2*2*c.ws*g/(1.225*c.clmax)),1e-5,'V_s√n');
 eq(K.vnState(c,E,E.vs*1.5,1),'ok');eq(K.vnState(c,E,E.vs*1.2,2),'stall');eq(K.vnState(c,E,c.vne+1,1),'vne');if(E.va<c.vne)eq(K.vnState(c,E,c.vne,c.nmax+.1),'struct');eq(K.vnState(c,E,E.va,c.nmax),'ok');}

/* ───── 04 seyir, yük–menzil, kalkış ───── */
const BASE={engine:'prop',program:'cl',ct:17e-6,cp:270/3.6e9,eta:.8,m0:1056,mf:154,S:16.2,AR:7.5,cd0:.03,e:.8,h0:2000,V0:55},JET={engine:'jet',program:'cl',ct:17e-6,cp:270/3.6e9,eta:.8,m0:57000,mf:15000,S:125,AR:9.5,cd0:.02,e:.82,h0:10000,V0:230};
for(const base of[BASE,JET,{...BASE,V0:41,h0:0,mf:300,m0:1100},{...JET,V0:180,h0:6000,ct:30e-6}])for(const engine of['prop','jet'])for(const program of['cl','hv','hcl']){const c={...base,engine,program},S=K.cruiseSim(c),T=K.cruiseTheory(c);
 // bağımsız: ağırlık değişkeninde Simpson; uçuş noktası tanımdan
 const rho0=K.isa(c.h0).rho,Kk=1/(Math.PI*c.e*c.AR),W0=c.m0*g,W1=(c.m0-c.mf)*g,cl0=2*W0/(rho0*c.V0**2*c.S);
 const pt=W=>{let V=c.V0,cl=cl0;if(program==='hv')cl=2*W/(rho0*V*V*c.S);if(program==='hcl')V=Math.sqrt(2*W/(rho0*c.S*cl0));const D=W*(c.cd0+Kk*cl*cl)/cl;return{V,D,md:engine==='jet'?c.ct*D:c.cp*D*V/c.eta};};
 const Rref=simpson(W=>pt(W).V/(g*pt(W).md),W1,W0),Eref=simpson(W=>1/(g*pt(W).md),W1,W0);
 near(S.range,Rref,1e-8,`menzil ${engine}/${program}`);near(S.time,Eref,1e-8,'havada kalış');near(T.range,Rref,1e-8,'kapalı biçim menzil');near(T.time,Eref,1e-8,'kapalı biçim süre');
 near(S.samples[S.samples.length-1][2],W1,1e-12,'yakıt tam biter');ok(S.steps===S.samples.length-1&&S.steps>10);
 const ld0=cl0/(c.cd0+Kk*cl0*cl0),simple=(engine==='jet'?c.V0/(g*c.ct):c.eta/(g*c.cp))*ld0*Math.log(W0/W1);near(T.simple,simple,1e-12,'yalın Breguet');
 if(program==='cl')near(S.range,simple,1e-8,'sabit C_L ve hızda Breguet tam');if(program==='hcl'&&engine==='prop')near(S.range,simple,1e-8);if(program==='hcl'&&engine==='jet')ok(S.range<simple,'jet yavaşlarsa menzil kısalır');
 if(program==='hv')ok(S.range<=T.C.ldmax/ld0*simple*(1+1e-9),'L/D en büyüğü aşamaz');
 // en iyi menzil hızı: kaba tarama
 if(base===BASE||base===JET){let best=0,vb=0;for(let V=25;V<315;V+=.05){const r=K.cruiseTheory({...c,V0:V}).range;if(r>best){best=r;vb=V;}}near(K.bestRangeV(c),vb,2e-3,'en iyi menzil hızı');
  const clb=2*W0/(rho0*vb*vb*c.S),clmd=Math.sqrt(c.cd0/Kk);if(program!=='hv')near(clb,engine==='jet'?clmd/Math.sqrt(3):clmd,4e-3,'en iyi menzil C_L kuramı');}}
// seyir tırmanışı: sonda yoğunluk W ile orantılı düşer
{const S=K.cruiseSim(JET);near(S.end.rho/K.isa(10000).rho,(57000-15000)/57000,1e-9);ok(K.isaAltForRho(S.end.rho)>10000);near(S.end.ld,S.C.ld0,1e-12);}
// defter örneğinin sayısı: V = 250 m/s, c = 0,6/saat, L/D = 18, W₀/W₁ = 1,3 → ≈ 7 100 km
near(250*3600/.6*18*Math.log(1.3)/1000,7084,1e-3,'Breguet örnek');
// dM: yakıt sıfırsa menzil sıfır; yük–menzil
eq(K.cruiseSim({...BASE,mf:0}).range,0);
for(const[fe,fpm,ft]of[[.62,.27,.14],[.55,.25,.30],[.4,.3,.5],[.65,.3,.05]]){const pr=K.payloadRange(BASE,fe,fpm,ft,1100),B=K.loadOut(fe,fpm,ft,fpm),D=K.loadOut(fe,fpm,ft,0);
 near(B.tow,Math.min(1,fe+fpm+ft),1e-12);near(B.fuel,Math.min(ft,1-fe-fpm),1e-12);near(D.fuel,Math.min(ft,1-fe),1e-12);eq(pr.A[0],0);ok(pr.B[0]<=pr.C[0]+1e-6&&pr.C[0]<=pr.D[0]+1e-6,'B ≤ C ≤ D');near(pr.C[1],Math.max(0,Math.min(fpm,1-fe-ft)),1e-12,'C noktası yükü');
 near(pr.B[0],K.cruiseTheory({...BASE,m0:B.tow*1100,mf:B.fuel*1100}).range,1e-12);for(let i=2;i<pr.curve.length;i++)ok(pr.curve[i][0]>=pr.curve[i-1][0]-1e-6&&pr.curve[i][1]<=pr.curve[i-1][1]+1e-12,'eğri tek yönlü');
 const L=K.loadOut(fe,fpm,ft,.9);near(L.pay,fpm,1e-12,'yük sınırlanır');ok(L.tow<=1+1e-12);}
// kalkış: hız değişkeninde Simpson (s = ∫V dV/a, t = ∫dV/a); ivme kuvvetlerden
for(const c of[{m:1056,S:16.2,cd0:.03,K:1/(Math.PI*.8*7.5),clg:.3,clmax:1.6,mu:.03,tw:.3,rho:1.225,kLO:1.2},{m:57000,S:125,cd0:.02,K:1/(Math.PI*.82*9.5),clg:.3,clmax:1.8,mu:.03,tw:.3,rho:1.225,kLO:1.2},{m:1056,S:16.2,cd0:.05,K:.05,clg:.6,clmax:1.2,mu:.1,tw:.15,rho:K.isa(3000).rho,kLO:1.2},{m:500,S:30,cd0:.008,K:.03,clg:0,clmax:2.6,mu:.02,tw:.6,rho:1.225,kLO:1.2}]){
 const W=c.m*g,acc=V=>{const q=.5*c.rho*V*V*c.S,L=q*c.clg,D=q*(c.cd0+c.K*c.clg**2);return(c.tw*W-D-c.mu*(W-L))/c.m;},vs=Math.sqrt(2*W/(c.rho*c.S*c.clmax)),vlo=1.2*vs,S=K.takeoffSim(c),T=K.takeoffTheory(c);
 ok(S.ok&&T.ok);near(S.T.vlo,vlo,1e-12);near(S.T.acc(17),acc(17),1e-12,'ivme kuvvetlerden');const sRef=simpson(V=>V/acc(V),0,vlo),tRef=simpson(V=>1/acc(V),0,vlo);
 near(S.s,sRef,1e-8,'kalkış koşusu');near(S.t,tRef,1e-8,'kalkış süresi');near(T.s,sRef,1e-8,'kapalı biçim');ok(Math.abs(T.sMean/sRef-1)<.02,'ortalama ivme kestirimi %2 içinde');ok(.5*c.rho*vlo*vlo*c.S*c.clg<W,'koşuda tekerlekler yerde');near(S.samples[S.samples.length-1][2],vlo,1e-12);}
{const c={m:1056,S:16.2,cd0:.03,K:.053,clg:.3,clmax:1.6,mu:.1,tw:.1,rho:1.225,kLO:1.2};ok(!K.takeoffSim(c).ok&&!K.takeoffTheory(c).ok&&K.takeoffSim(c).s===Infinity,'itki yetmezse kalkamaz');
 const a={m:1056,S:16.2,cd0:.03,K:.053,clg:.3,clmax:1.6,mu:.03,tw:.3,rho:1.225,kLO:1.2};ok(K.takeoffTheory({...a,rho:K.isa(2000).rho}).s>K.takeoffTheory(a).s*1.15,'yüksek pistte koşu uzar');ok(K.takeoffTheory({...a,m:1300}).s>K.takeoffTheory(a).s,'ağır uçak daha uzun koşar');}

/* ───── sayfa metni ve denetimler ───── */
for(const t of['22.632 Pa','5.474,9 Pa','0,3639','0,0880','d\'Alembert','8π(a/c)·sin(α + δ + β)','2π(1 + ε/(1 + ε))·sin α','Serbest akım hep soldan sağa ve yataydır; yalnız profil döner','daha erken varır','öğretim değerleri','International Standard Atmosphere'])ok(html.includes(t),'sayfa metni: '+t);
ok(!/eşit sürede var(ır|mak zorunda)[^”]*doğru/.test(html),'eşit geçiş süresi savunulmuyor');
ok(!/[̀-ͯ]/.test(html),'birleşik işaret yok');ok(!/https?:\/\/[^"']*\.(js|css|woff2?)/.test(html.replace(/href="https:[^"]*"/g,'')),'dış betik yok');ok(!/type="number"/.test(html),'type=number yok');
{const ranges={};for(const m of html.matchAll(/<input id="(\w+)" type="range" min="([-\d.]+)" max="([-\d.]+)" step="([\d.]+)" value="([-\d.]+)"/g))ranges[m[1]]={min:+m[2],max:+m[3],step:+m[4],value:+m[5]};
 eq(Object.keys(ranges).length,41,'kaydırıcı sayısı');const reach=(id,v)=>{const r=ranges[id];assert(r,id);const k=(v-r.min)/r.step;ok(v>=r.min-1e-9&&v<=r.max+1e-9&&Math.abs(k-Math.round(k))<1e-6,`${id}=${v} ulaşılabilir`);};
 for(const[id,r]of Object.entries(ranges))reach(id,r.value);
 const presets={epsT:[.1,.05,.2],kapC:[0,.08,.04],pMass:[1100,450,1600],pS:[16.2,10.5,14],pSpan:[11,15,9],pCd0:[.03,.012,.035],pE:[.8,.9,.75],pClmax:[1.5,1.4,1.6],aBank:[30,45,60],rCt:[17],rMtow:[1.1,60],rS:[16.2,125],rAR:[7.5,9.5],rCd0:[.03,.02],rE:[.8,.82],rEmpty:[62,55],rPayMax:[27,25],rTank:[14,30],rPay:[20],rAlt:[2000,10000],rV:[55,230],tClmax:[1.6,1.8]};
 for(const[id,vs]of Object.entries(presets))for(const v of vs)reach(id,v);
 // kütle dökümü kaydırıcıları hiçbir birleşimde yakıtsız bırakmaz: boş + en büyük yük ≤ %95
 ok(ranges.rEmpty.max+ranges.rPayMax.max<=95,'boş + yük < MTOW');ok(ranges.tClg.max<ranges.tClmax.min/1.44,'yer koşusunda kaldırma ağırlığı geçmez');}
console.log(`G ${SLUG}: ${checks.toLocaleString('tr-TR')} bağımsız çekirdek kontrolü PASS`);

if(process.argv.includes('--browser')){
 const{createRequire}=await import('node:module');const{createServer}=await import('node:http');const{join,extname}=await import('node:path');const{fileURLToPath}=await import('node:url');const rootDir=fileURLToPath(new URL('../',import.meta.url));
 const{chromium}=createRequire(join(rootDir,'package.json'))('playwright');
 const server=createServer((req,res)=>{const file=join(rootDir,decodeURIComponent(new URL(req.url,'http://localhost').pathname));if(!fs.existsSync(file)||fs.statSync(file).isDirectory()){res.writeHead(404).end();return;}res.setHeader('Content-Type',({'.html':'text/html; charset=utf-8','.js':'text/javascript; charset=utf-8','.css':'text/css; charset=utf-8'})[extname(file)]||'application/octet-stream');res.end(fs.readFileSync(file));});
 await new Promise(r=>server.listen(0,'127.0.0.1',r));let browser;const before=checks;
 try{browser=await chromium.launch();
  for(const[width,theme]of[[390,'light'],[1280,'dark']]){
   const ctx=await browser.newContext({viewport:{width,height:900},deviceScaleFactor:width===390?2:1,locale:'tr-TR'});await ctx.addInitScript(t=>{localStorage.setItem('acelya-theme',t);localStorage.setItem('acelya-sound-muted','1');},theme);
   const page=await ctx.newPage();page.setDefaultTimeout(8000);const errors=[];page.on('pageerror',e=>errors.push(e.message));page.on('console',m=>{if(m.type()==='error'&&!/404|Failed to load resource/.test(m.text()))errors.push(m.text());});
   await page.goto(`http://127.0.0.1:${server.address().port}/${SLUG}.html`);await page.waitForTimeout(400);
   const click=id=>page.locator('#'+id).click(),read=async id=>(await page.locator('#'+id).textContent()).trim(),val=id=>page.locator('#'+id).inputValue();
   const set=(id,v)=>page.locator('#'+id).evaluate((e,v)=>{if(e.type==='checkbox'){e.checked=v;e.dispatchEvent(new Event('change',{bubbles:true}));}else{e.value=v;e.dispatchEvent(new Event(e.tagName==='SELECT'?'change':'input',{bubbles:true}));}},v);
   const has=async(id,t)=>{const s=await read(id);if(process.env.SOFT&&!s.includes(t)){console.log(`SOFT ${id}: "${s}" içinde "${t}" yok`);return;}assert(s.includes(t),`${id}: "${s}" içinde "${t}" yok`);checks++;};
   const hasNot=async(id,t)=>{const s=await read(id);assert(!s.includes(t),`${id}: "${s}" içinde "${t}" olmamalı`);checks++;};
   const noOverflow=async w=>{eq(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),true,'yatay taşma: '+w);};
   const clean=async name=>{const t=await page.locator('#panel-'+name).innerText();ok(!/NaN|undefined|Infinity|null|∞/.test(t),name+' panelinde bozuk sayı: '+(t.match(/.{0,30}(NaN|undefined|Infinity|null|∞).{0,30}/)||[''])[0]);};
   const sweep=async(name,ids)=>{for(const id of ids)for(const end of['min','max']){await page.locator('#'+id).evaluate((e,end)=>{e.value=e[end];e.dispatchEvent(new Event('input',{bubbles:true}));},end);await clean(name);}};
   const painted=async id=>{const st=await canvasInk(page,'#'+id);assertCanvasDrawn(st,{minDistinct:2,label:id});return st.distinct;};
   // erişilebilirlik
   eq(await page.evaluate(()=>[...document.querySelectorAll('main input,main select')].every(e=>e.labels&&e.labels.length>0&&e.labels[0].textContent.trim().length>2)),true,'etiketler');
   eq(await page.evaluate(()=>[...document.querySelectorAll('main canvas')].every(c=>c.getAttribute('role')==='img'&&c.getAttribute('aria-label').length>20)),true,'tuval rolleri');
   eq(await page.evaluate(()=>Object.isFrozen(AeroLab)&&!Object.getOwnPropertyDescriptor(window,'AeroLab').writable),true);
   eq(await page.locator('[role=tab]').count(),4);eq(await page.locator('main canvas').count(),14);
   // 01 kanat profili: varsayılan durum
   eq(await read('foilToggle'),'Duraklat');
   await has('clP','0,7227');await has('clPSub','= 0,7227 (fark 0,000000)');await has('clThin','0,6634');await has('clThinSub','6,859');await has('cdP','0,000000');await has('a0','−2,048°');await has('a0Sub','−2,049°');await has('geom','t/c = %11,8 · h/c = %1,79');
   await has('cpMin','−1,49 · x/c = 0,018 (üst)');await has('cpMinSub','78,9 m/s');await has('transit','1,875 / 2,144 c/U');await has('transitSub','0,269 c/U');await has('transitSub','buluşmaz');await has('share','Basınç %55,6 · momentum %44,4');await has('cmom','−0,0592');await has('cmom','0,332');await has('liftDim','1.660 N/m');await has('liftDimSub','27,10 m²/s');await has('foilStatus','alt yüzeyde');
   for(const id of['flowCanvas','cpCanvas','clCanvas'])ok(await painted(id)>6,id+' çizildi');
   // duman çizgileri zamanla ilerler; duraklat durdurur
   const snap=()=>page.locator('#flowCanvas').evaluate(c=>c.toDataURL().length+':'+c.toDataURL().slice(5000,5200));const s0=await snap();await page.waitForTimeout(300);ok(await snap()!==s0,'duman çizgileri hareketli');
   await click('foilToggle');eq(await read('foilToggle'),'Oynat');const s1=await snap();await page.waitForTimeout(250);eq(await snap(),s1,'duraklatınca durur');
   // kontrol eğrisi: yüzeyde tamamı basınç, uzakta yarı yarıya
   await set('ctrlK',1);await has('share','Basınç %100,0 · momentum %0,0');await set('ctrlK',10);await has('share','Basınç %50,5 · momentum %49,5');await has('shareSub','0,7227');
   // hazır profiller ve sıfır kaldırma
   await click('preSym');await has('a0','0,000°');await has('geom','h/c = %0,00');await set('alpha',0);await has('clP','0,0000');await has('share','Tanımsız');await has('transitSub','neredeyse aynı anda varıyor');await has('cmom','tanımsız');await has('foilStatus','sıfıra çok yakın');
   await set('alpha',5);await has('clP','0,5974');await has('cmom','0,254');await has('clThin','0,5483');
   await click('preThin');eq(await val('epsT'),'0.05');eq(await val('kapC'),'0.08');await set('alpha',0);await has('clP','0,4992');await has('a0','−4,337°');await click('goZero');eq(await val('alpha'),'-4.5');await has('clP','−0,0');await has('cmom','x_cp/c = çok uzakta');await has('cmomSub','sınırsız büyür');
   await click('preThick');await set('alpha',10);await has('clP','1,5005');await has('geom','t/c = %21,5');
   await set('alpha',-6);await has('transitSub','Alttan');await has('foilStatus','aşağı doğru');
   await set('alpha',16);await has('foilStatus','Uyarı');await has('foilStatus','ayrılmaya');await set('epsT',.03);await set('alpha',10);await has('foilStatus','emme tepesi');await set('foilV',100);await has('foilStatus','sıkışmazlık');
   await sweep('foil',['alpha','epsT','kapC','ctrlK','foilV','foilChord']);
   await set('showCp',false);await set('showSmoke',false);ok(await painted('flowCanvas')>4);
   await click('foilReset');await has('clP','0,7227');eq(await val('ctrlK'),'3');eq(await read('foilToggle'),'Duraklat');eq(await page.locator('#showCp').isChecked(),true);eq(await page.locator('#showSmoke').isChecked(),true);await noOverflow('profil');
   // boyutlu örnek: L′ hızın karesiyle büyür
   await set('foilV',100);await has('liftDim','6.640 N/m');await set('foilV',50);await set('foilChord',3);await has('liftDim','3.320 N/m');await click('foilReset');
   // klavye: sekmeler, boşluk, R
   await page.locator('#tab-foil').focus();await page.keyboard.press('ArrowRight');eq(await page.locator('#tab-perf').getAttribute('aria-selected'),'true');eq(await page.locator('#panel-foil').isHidden(),true);await page.keyboard.press('End');eq(await page.locator('#tab-range').getAttribute('aria-selected'),'true');await page.keyboard.press('ArrowRight');eq(await page.locator('#tab-foil').getAttribute('aria-selected'),'true');await page.keyboard.press('ArrowLeft');eq(await page.locator('#tab-range').getAttribute('aria-selected'),'true');await page.keyboard.press('Home');eq(await page.locator('#tab-foil').getAttribute('aria-selected'),'true');eq(await page.locator('#tab-foil').getAttribute('tabindex'),'0');eq(await page.locator('#tab-perf').getAttribute('tabindex'),'-1');
   await page.locator('h1').click();await page.keyboard.press('Space');eq(await read('foilToggle'),'Oynat');await page.keyboard.press('Space');eq(await read('foilToggle'),'Duraklat');await set('kapC',.1);await page.locator('h1').click();await page.keyboard.press('r');eq(await val('kapC'),'0.04');
   await page.locator('#alpha').focus();await page.keyboard.press('r');eq(await val('alpha'),'4','denetim içinde R sıfırlamaz');
   // 02 performans
   await click('tab-perf');await has('vStall','29,7 m/s (107 km/h)');await has('vStallSub','7,47');await has('opPoint','C_L = 0,529 · L/D = 11,78');await has('opPointSub','parazit 611 + indüklenmiş 304');await has('vMd','42,0 m/s');await has('vMdSub','41,99 m/s (fark %0,00)');await has('ldMax','12,51');await has('ldMaxSub','= 12,51');await has('vMp','31,9 m/s');await has('vMpSub','31,91 m/s');await has('pMin','31,78 kW');await has('pMinSub','%86,6');
   await has('glideBest','25,21 km');await has('glideBestSub','25,01 km (fark %0,80)');await has('glideBestSub','= 25,21 km (fark %0,00)');await has('glideNow','23,83 km · 1 : 11,8');await has('perfStatus','üstünde');
   for(const id of['thrustCanvas','powerCanvas','polarCanvas','glideCanvas'])ok(await painted(id)>6,id+' çizildi');
   await click('goVmd');eq(await val('pV'),'42');await has('opPoint','L/D = 12,51');await has('opPointSub','parazit 431 + indüklenmiş 431');
   await set('pV',35);await has('perfStatus','arka yüzü');await set('pV',25);await has('opPoint','Tutunma kaybının altında');await has('glideNow','Tutunma kaybı');await has('perfStatus','üretemez');
   await click('preGlider');await has('ldMax','35,53');await has('vStall','24,4 m/s');eq(await val('pSpan'),'15');await click('preLoaded');await has('ldMax','9,87');await click('preTrainer');await has('ldMax','12,51');
   await set('pAlt',0);await has('glideBest','—');await has('glideNowSub','İrtifayı artır');await has('vStall','26,9 m/s');await set('pAlt',8000);await has('vStall','41,1 m/s');
   await sweep('perf',['pMass','pS','pSpan','pCd0','pE','pClmax','pAlt','pV']);
   await click('perfReset');await has('vMd','42,0 m/s');eq(await val('pV'),'50');await noOverflow('performans');
   // 03 atmosfer ve manevra
   await click('tab-atmo');await has('isaNow','70,109 kPa · 0,9091 kg/m³');await has('isaNowSub','70,109 kPa');await has('isaNowSub','−4,50 °C');await has('sigmaNow','σ = 0,7421 · a = 328,6 m/s');await has('tasNow','69,6 m/s (251 km/h)');await has('tasNowSub','Mach 0,212');await has('nNow','1,414');
   await has('turnR','494,6 m');await has('turnRSub','= 494,6 m (fark %0,00)');await has('turnRate','8,07 °/s · 44,6 s');await has('vsTurn','32,0 m/s');await has('vsTurnSub','26,9');await has('vaNow','52,5 m/s');await has('dropNow','36,2 m');await has('dropNowSub','35,9 m');await has('atmoStatus','zarfın içinde');
   const rows=await read('isaRows');for(const t of['−56,50 °C','22.632,0 Pa','22.632 Pa','0,3639','5.474,9 Pa','0,0880','1,2250','101.325,0 Pa'])ok(rows.includes(t),'ISA satırı: '+t);
   for(const id of['isaCanvas','turnCanvas','bankCanvas','vnCanvas'])ok(await painted(id)>5,id+' çizildi');
   await click('bank60');await has('nNow','2,000');await has('vsTurnSub','%41,4');await has('turnR','285,6 m');await click('bank30');await has('nNow','1,155');await has('turnR','856,8 m');await click('bank45');
   // yarıçap gerçek hızın karesiyle büyür: aynı gösterge hızında irtifa artınca
   await set('aAlt',0);await has('turnR','367,1 m');await has('tasNow','60,0 m/s');await set('aVe',120);await has('turnR','1.468,4 m');await set('aVe',60);
   await set('aAlt',11000);await has('isaNow','22,632 kPa · 0,3639 kg/m³');await set('aAlt',20000);await has('isaNow','5,475 kPa · 0,0880 kg/m³');await has('isaNowSub','stratosfer');await has('sigmaNow','295,1 m/s');await set('aAlt',3000);
   // zarf dışı durumlar
   await set('aVe',30);await set('aBank',60);await has('atmoStatus','tutunma kaybına');await has('atmoStatus','yalnız kinematik');await set('aVe',70);await set('aBank',78);await has('atmoStatus','yapısal sınır');await set('aBank',45);await set('aVe',120);await has('atmoStatus','V_NE');
   await set('aBank',0);await has('turnR','Tanımsız');await has('turnRate','0 °/s');await has('dropNow','0 m');await has('nNow','1,000');await click('turnToggle');eq(await read('turnToggle'),'Dönüşü oynat','yatış yokken oynatma başlamaz');
   await click('atmoReset');await has('turnR','494,6 m');
   // canlı dönüş: zamanla ilerler, parametre değişince baştan başlar
   await click('turnToggle');eq(await read('turnToggle'),'Duraklat');await page.waitForTimeout(1200);const tn=parseFloat((await read('turnNow')).replace('t = ','').replace(',','.'));ok(tn>2&&tn<6.5,'canlı dönüş 3,2 kat hızlı ilerliyor: '+tn);await has('turnNowSub','İrtifa değişimi 0,0 m');
   await set('aBank',50);eq(await read('turnToggle'),'Dönüşü oynat');await has('turnNow','t = 0,0 s');
   await set('aNoPull',true);await click('turnToggle');await page.waitForTimeout(900);await has('turnNowSub','n = 1');const dz=parseFloat((await read('turnNowSub')).replace('İrtifa değişimi ','').replace('−','-').replace(',','.'));ok(dz<-2,'çubuk çekilmezse irtifa kaybı: '+dz);
   await page.locator('h1').click();await page.keyboard.press('Space');eq(await read('turnToggle'),'Dönüşü oynat');await page.keyboard.press('Space');eq(await read('turnToggle'),'Duraklat');await page.keyboard.press('r');eq(await read('turnToggle'),'Dönüşü oynat');eq(await page.locator('#aNoPull').isChecked(),false);eq(await val('aBank'),'45');
   await sweep('atmo',['aAlt','aVe','aBank','aWS','aClmax','aNmax','aNmin','aVne']);
   await click('atmoReset');await has('nNow','1,414');await noOverflow('atmosfer');
   // 04 menzil
   await click('tab-range');await has('mission','1.056 kg kalkış · 154 kg yakıt');await has('missionSub','1,1707');await has('cruise0','C_L = 0,420 · L/D = 10,67');await has('rMeas','1.829 km');await has('rMeasSub','(fark %0,00)');await has('eMeas','9,24 saat');await has('endState','İrtifa 3.539 m');await has('bestV','41,1 m/s');await has('bestVSub','2.149 km');await has('sens','+%10,0');await has('sensSub','+%11,1');
   await has('prPts','B 1.381 km · C 1.787 km · D 2.053 km');await has('toRoll','185,5 m');await has('toRollSub','= 185,5 m (fark %0,00)');await has('toRollSub','185,3 m');await has('toV','30,6 m/s (110 km/h)');await has('rangeStatus','tam doğrudur');ok(!(await page.locator('#rangeStatus').textContent()).includes('transonik'),'pervaneli varsayılanda transonik notu yok');
   eq(await page.locator('#rCtField').isHidden(),true);eq(await page.locator('#rCpField').isVisible(),true);
   for(const id of['cruiseCanvas','prCanvas','toCanvas'])ok(await painted(id)>6,id+' çizildi');
   await set('rProgram','hv');await has('rMeas','1.751 km');await has('rMeasSub','%4,49');await has('endState','L/D = 9,74');await has('rangeStatus','sapar');await set('rProgram','hcl');await has('rMeas','1.829 km');await has('endState','Hız 50,8 m/s');await has('eMeas','9,61 saat');
   await set('rProgram','cl');await click('goBestV');eq(await val('rV'),'41');await has('cruise0','L/D = 12,53');await has('rMeas','2.149 km');
   await set('rPay',27);await has('mission','1.100 kg kalkış · 121 kg yakıt');await has('missionSub','MTOW sınırında');await set('rPay',30);await has('rangeStatus','sınırlandı');await set('rPay',0);await has('mission','836 kg kalkış');
   await click('preJet');eq(await val('rEngine'),'jet');eq(await val('rMtow'),'60');eq(await page.locator('#rCtField').isVisible(),true);eq(await page.locator('#rEtaField').isHidden(),true);await has('mission','60.000 kg kalkış · 15.000 kg yakıt');await has('cruise0Sub','Mach 0,768');await has('rangeStatus','Mach 0,77: transonik seyir');await has('rMeas','6.201 km');await has('endState','İrtifa 12.027 m');await has('toRoll','1.187,0 m');
   await set('rProgram','hv');await has('rMeas','5.760 km');await set('rProgram','hcl');await has('rangeStatus','iyimser');await set('rV',260);await has('rangeStatus','Mach 0,87');
   await set('rAlt',12000);await set('rV',120);await has('rangeStatus','tutunma kaybına');
   await click('preProp');eq(await val('rEngine'),'prop');await has('rMeas','1.829 km');
   await set('tElev',2000);await has('toRoll','225,7 m');await has('toVSub','%21,7');await set('tElev',0);await set('tTw',.1);await set('tMu',.1);await has('toRoll','Kalkamıyor');await set('tTw',.3);await set('tMu',.03);await has('toRoll','185,5 m');
   await sweep('range',['rCp','rEta','rMtow','rS','rAR','rCd0','rE','rEmpty','rPayMax','rTank','rPay','rAlt','rV','tTw','tMu','tClmax','tClg','tElev']);
   await set('rEngine','jet');await sweep('range',['rCt','rMtow','rAlt','rV']);for(const v of['hv','hcl','cl']){await set('rProgram',v);await clean('range');}
   await click('rangeReset');await has('rMeas','1.829 km');eq(await val('rEngine'),'prop');eq(await val('rProgram'),'cl');await noOverflow('menzil');
   // tema değişince tuvaller yeniden çizilir; hata yok
   await page.evaluate(()=>{document.documentElement.dataset.theme=document.documentElement.dataset.theme==='light'?'dark':'light';});await page.waitForTimeout(200);
   for(const t of['foil','perf','atmo','range']){await click('tab-'+t);await page.waitForTimeout(150);eq(await page.evaluate(n=>[...document.querySelectorAll('#panel-'+n+' canvas')].every(c=>c.width>100&&c.height>60),t),true,'tuval boyutu '+t);await clean(t);await noOverflow(t);}
   assert.deepEqual(errors,[]);checks++;await ctx.close();}
  console.log(`G ${SLUG}: ${checks-before} tarayıcı kontrolü (390 açık, 1280 koyu) PASS`);
 }finally{await browser?.close();await new Promise(r=>server.close(r));}
}
