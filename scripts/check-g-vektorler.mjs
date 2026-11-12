// G · vektorler.html kalıcı denetimi.
// Çekirdek (KERNEL-BEGIN/END arası) node'da yüklenir ve sayfanın kendi formüllerini yinelemeyen
// referanslarla sınanır: kosinüs teoremi, polarizasyon ve Lagrange özdeşlikleri, Heron alanı ve ızgara
// sayımı, Gauss eleme determinantı, ayrı bir Euler integratörü, dümen açıları üzerinde kaba kuvvet arama.
// `--browser`: 390 px aydınlık ve 1280 px karanlıkta gerçek arayüz denetimleri.
import fs from 'node:fs';
import vm from 'node:vm';
import assert from 'node:assert/strict';
import { canvasInk, canvasInkAll, assertCanvasDrawn } from './lib/canvas-check.mjs';
const html=fs.readFileSync(new URL('../vektorler.html',import.meta.url),'utf8');
const source=html.split('/* KERNEL-BEGIN */')[1]?.split('/* KERNEL-END */')[0];
assert(source,'Çekirdek sınırları (KERNEL-BEGIN/END) gerekli');
const context={window:{}};vm.createContext(context);vm.runInContext(source,context);
const K=context.window.VectorLab;assert(K&&Object.isFrozen(K),'VectorLab dondurulmuş olmalı');
let checks=0;
const near=(actual,expected,tol=1e-9,msg='')=>{assert(Math.abs(actual-expected)<=tol*Math.max(1,Math.abs(expected)),`${msg} ${actual} ≠ ${expected}`);checks++;};
const ok=(cond,msg)=>{assert(cond,msg);checks++;};
const eq=(a,b,msg)=>{assert.equal(a,b,msg);checks++;};
const RAD=Math.PI/180;
// Tekrarlanabilir rastgele sayı (mulberry32)
let seed=20261111;const rnd=()=>{seed|=0;seed=seed+0x6D2B79F5|0;let t=Math.imul(seed^seed>>>15,1|seed);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296;};
const grid=(lo,hi,step)=>Math.round((lo+rnd()*(hi-lo))/step)*step;
const wrap=d=>((d+180)%360+360)%360-180;

// ── 1. Kutupsal ↔ bileşen ──
for(const[x,y,m,d]of[[4,3,5,36.86989764584402],[0,3,3,90],[-3,0,3,180],[0,-2,2,270],[3,-4,5,306.86989764584402],[-1,-1,Math.SQRT2,225]]){const p=K.polar(x,y);near(p.mag,m);near(p.deg,d);const[a,b]=K.fromPolar(p.mag,p.deg);near(a,x,1e-12);near(b,y,1e-12);}
eq(K.polar(0,0).deg,null);eq(K.polar(0,0).mag,0);

// ── 2. Toplama: bileşen toplamı, üçgen çözümü ve kosinüs teoremi ──
for(let i=0;i<400;i++){const a=grid(.1,8,.1),b=grid(.1,8,.1),ta=grid(0,359,1),gam=grid(0,180,1),A=K.fromPolar(a,ta),B=K.fromPolar(b,ta+gam),S=K.sumComponents([{x:A[0],y:A[1],k:1},{x:B[0],y:B[1],k:1}]);near(S.mag,Math.sqrt(Math.max(0,a*a+b*b+2*a*b*Math.cos(gam*RAD))),1e-7,'kosinüs teoremi');
 // çıkarma: |A − B|² = a² + b² − 2ab cos γ
 const D=K.sumComponents([{x:A[0],y:A[1],k:1},{x:B[0],y:B[1],k:-1}]);near(D.mag,Math.sqrt(Math.max(0,a*a+b*b-2*a*b*Math.cos(gam*RAD))),1e-7,'çıkarma');}
let worstMag=0,worstDeg=0;
for(let i=0;i<3000;i++){const n=1+Math.floor(rnd()*4),T=Array.from({length:n},()=>({x:grid(-8,8,.1),y:grid(-8,8,.1),k:grid(-3,3,.25)})),S=K.sumComponents(T),C=K.chainSolve(T);worstMag=Math.max(worstMag,Math.abs(S.mag-C.mag));ok(Math.abs(S.mag-C.mag)<1e-6,'çizim/bileşen büyüklüğü');if(S.mag>.05){ok(C.deg!==null,'çizim yönü tanımlı');const dd=Math.abs(wrap(S.deg-C.deg));worstDeg=Math.max(worstDeg,dd);ok(dd<1e-4,'çizim/bileşen yönü '+dd);}
 // çokgen (üçgen) eşitsizliği ve sıra bağımsızlığı
 ok(S.mag<=S.upper+1e-9&&S.mag>=S.lower-1e-9,'üçgen eşitsizliği');const Rv=K.sumComponents([...T].reverse());near(Rv.x,S.x,1e-9);near(Rv.y,S.y,1e-9);}
// hazır düzenler ve denge görevleri
{const d=K.sumComponents([{x:4,y:0,k:1},{x:0,y:3,k:1}]);near(d.mag,5);near(d.deg,36.86989764584402);near(d.upper,7);near(d.lower,1);
 near(K.sumComponents([{x:4,y:0,k:1},{x:-3,y:0,k:1}]).mag,1);
 const cl=[{x:3,y:0,k:1},{x:0,y:4,k:1},{x:-3,y:-4,k:1}];ok(K.sumComponents(cl).mag<1e-12);const cc=K.chainSolve(cl);ok(cc.mag<.005,'kapalı üçgen çizimden: '+cc.mag);
 const four=K.sumComponents([{x:3,y:1,k:1},{x:1,y:3,k:1},{x:-2,y:2,k:1},{x:-1,y:-2.5,k:1}]);near(four.x,1);near(four.y,3.5);
 for(const[[ax,ay],[bx,by],[cx,cy]]of[[[3,0],[0,4],[-3,-4]],[[4,3],[-1,2],[-3,-5]],[[2.5,-1.5],[3.5,4.5],[-6,-3]]]){ok(K.sumComponents([{x:ax,y:ay,k:1},{x:bx,y:by,k:1},{x:cx,y:cy,k:1}]).mag<1e-12,'denge görevi');}
 near(K.sumComponents([{x:4,y:0,k:1},{x:0,y:3,k:-1}]).deg,323.13010235415598);near(K.sumComponents([{x:4,y:0,k:2},{x:0,y:3,k:1}]).mag,Math.sqrt(73));}

// ── 3. Eksen döndürme: değişmezler ──
for(let i=0;i<500;i++){const x=grid(-8,8,.1),y=grid(-8,8,.1),u=grid(-8,8,.1),v=grid(-8,8,.1),p=grid(-180,180,1),q=grid(-180,180,1),[xp,yp]=K.axes(x,y,p),[up,vp]=K.axes(u,v,p);near(Math.hypot(xp,yp),Math.hypot(x,y),1e-12,'büyüklük değişmez');near(xp*up+yp*vp,x*u+y*v,1e-10,'skaler çarpım değişmez');near(xp*vp-yp*up,x*v-y*u,1e-10,'alan değişmez');
 const[x2,y2]=K.axes(xp,yp,q),[x3,y3]=K.axes(x,y,p+q);near(x2,x3,1e-10);near(y2,y3,1e-10);const[x0,y0]=K.axes(xp,yp,-p);near(x0,x,1e-10);near(y0,y,1e-10);
 const pol=K.polar(x,y);if(pol.mag>0){near(xp,pol.mag*Math.cos((pol.deg-p)*RAD),1e-10,'bileşen = |V|cos(θ−φ)');near(yp,pol.mag*Math.sin((pol.deg-p)*RAD),1e-10);}}
{const[a,b]=K.axes(4,3,36.86989764584402);near(a,5);ok(Math.abs(b)<1e-12);const[c,d]=K.axes(4,3,90);near(c,3);near(d,-4);}

// ── 4. Skaler ve vektörel çarpım özdeşlikleri ──
const v3=()=>[grid(-5,5,.1),grid(-5,5,.1),grid(-5,5,.1)],add=(a,b)=>a.map((v,i)=>v+b[i]),sub=(a,b)=>a.map((v,i)=>v-b[i]),n2=a=>a[0]*a[0]+a[1]*a[1]+a[2]*a[2];
const detGauss=m=>{const M=m.map(r=>[...r]);let det=1;for(let c=0;c<3;c++){let p=c;for(let r=c+1;r<3;r++)if(Math.abs(M[r][c])>Math.abs(M[p][c]))p=r;if(Math.abs(M[p][c])<1e-14)return 0;if(p!==c){[M[p],M[c]]=[M[c],M[p]];det=-det;}det*=M[c][c];for(let r=c+1;r<3;r++){const f=M[r][c]/M[c][c];for(let k=c;k<3;k++)M[r][k]-=f*M[c][k];}}return det;};
for(let i=0;i<1500;i++){const A=v3(),B=v3(),C=v3(),d=K.dot3(A,B),X=K.cross3(A,B),a=K.norm3(A),b=K.norm3(B);
 near(d,(n2(add(A,B))-n2(sub(A,B)))/4,1e-9,'polarizasyon');near(n2(X),n2(A)*n2(B)-d*d,1e-8,'Lagrange');ok(Math.abs(K.dot3(X,A))<1e-9&&Math.abs(K.dot3(X,B))<1e-9,'A×B ⊥ A, B');
 const Y=K.cross3(B,A);for(let k=0;k<3;k++)near(Y[k],-X[k],1e-12,'ters değişme');
 // BAC−CAB ve Jacobi
 const L=K.cross3(A,K.cross3(B,C)),R=sub(B.map(v=>v*K.dot3(A,C)),C.map(v=>v*K.dot3(A,B)));for(let k=0;k<3;k++)near(L[k],R[k],1e-8,'BAC−CAB');
 const J=add(add(L,K.cross3(B,K.cross3(C,A))),K.cross3(C,K.cross3(A,B)));ok(Math.hypot(...J)<1e-8,'Jacobi');
 if(a>0&&b>0){const th=K.angle3(A,B),ref=Math.acos(Math.max(-1,Math.min(1,d/(a*b))))/RAD;ok(Math.abs(th-ref)<2e-5,'açı '+th+' / '+ref);near(a*b*Math.cos(th*RAD),d,1e-9,'|A||B|cos θ');near(a*b*Math.sin(th*RAD),K.norm3(X),1e-9,'|A||B|sin θ');
  // alan: çokgen (bağcık) ↔ Heron
  const c=K.norm3(sub(A,B)),s=(a+b+c)/2,heron=2*Math.sqrt(Math.max(0,s*(s-a)*(s-b)*(s-c))),pl=K.plane(A,B);ok(Math.abs(pl.area-heron)<1e-5*Math.max(1,heron),'Heron '+pl.area+' / '+heron);near(pl.area,K.norm3(X),1e-9,'alan = |A×B|');
  const pr=K.project(A,B);near(pr.scalar,a*Math.cos(th*RAD),1e-9,'izdüşüm');ok(Math.abs(K.dot3(sub(A,pr.vec),B))<1e-9,'A − izd ⊥ B');}
 // skaler üçlü çarpım: Gauss eleme, döngüsel simetri, Gram
 const t=K.triple(A,B,C);near(t,detGauss([A,B,C]),1e-8,'determinant');near(K.triple(B,C,A),t,1e-9);near(K.triple(B,A,C),-t,1e-9);ok(Math.abs(K.gramVolume(A,B,C)-Math.abs(t))<1e-5*Math.max(1,Math.abs(t)),'Gram hacmi');}
// düzlemde açı = kutupsal açıların farkı; alan = ızgara sayımı
for(let i=0;i<300;i++){const A=[grid(-5,5,.1),grid(-5,5,.1),0],B=[grid(-5,5,.1),grid(-5,5,.1),0];if(!K.norm3(A)||!K.norm3(B))continue;const dd=Math.abs(wrap(K.polar(B[0],B[1]).deg-K.polar(A[0],A[1]).deg));near(K.angle3(A,B),dd,1e-9,'düzlem açısı');}
for(const[A,B]of[[[4,1,0],[2,3,0]],[[3,2,0],[-2,3,0]],[[5,0,0],[1.5,4,0]],[[-2.5,3,0],[4,1.5,0]]]){const h=.01,cz=A[0]*B[1]-A[1]*B[0];let n=0;const xs=[0,A[0],B[0],A[0]+B[0]],ys=[0,A[1],B[1],A[1]+B[1]];for(let x=Math.min(...xs)+h/2;x<Math.max(...xs);x+=h)for(let y=Math.min(...ys)+h/2;y<Math.max(...ys);y+=h){const s=(x*B[1]-y*B[0])/cz,t=(A[0]*y-A[1]*x)/cz;if(s>=0&&s<=1&&t>=0&&t<=1)n++;}const counted=n*h*h,pl=K.plane(A,B);ok(Math.abs(counted-pl.area)<.01*pl.area,'ızgara sayımı '+counted+' / '+pl.area);}
{const A=[4,1,0],B=[2,3,0],C=[1,1,3];near(K.dot3(A,B),11);const X=K.cross3(A,B);eq(X[0],0);eq(X[1],0);near(X[2],10);near(K.plane(A,B).area,10);near(K.angle3(A,B),42.27368900609373,1e-9);near(K.project(A,B).scalar,11/Math.sqrt(13));near(K.triple(A,B,C),30);near(K.gramVolume(A,B,C),30,1e-9);
 eq(K.relation([3,2,0],[-2,3,0]),'perp');eq(K.relation([2,1,0],[4,2,0]),'parallel');eq(K.relation([2,1,0],[-4,-2,0]),'anti');eq(K.relation([0,0,0],[1,2,3]),'zero');eq(K.relation(A,B),'none');eq(K.angle3([0,0,0],B),null);eq(K.project(A,[0,0,0]),null);near(K.angle3([2,1,0],[-4,-2,0]),180);near(K.angle3([2,1,0],[4,2,0]),0,1e-9);near(K.plane([2,1,0],[4,2,0]).area,0,1e-9);
 const S=K.cross3([2,1,2],[-1,3,1]);near(S[0],-5);near(S[1],-4);near(S[2],7);near(K.dot3([2,1,2],[-1,3,1]),3);}

// ── 5. İş: bileşen ↔ açı, iş–enerji teoremi (ayrı 2B Euler integratörü) ──
for(const c of[{alpha:30,beta:20,F:50,d:4,m:5},{alpha:0,beta:0,F:10,d:2,m:1},{alpha:45,beta:-30,F:100,d:10,m:8},{alpha:10,beta:40,F:30,d:.5,m:2.5},{alpha:60,beta:0,F:100,d:3,m:10}]){const r=K.work(c);near(r.WF.comp,r.WF.geo,1e-10);near(r.Wg.comp,r.Wg.geo,1e-10);near(r.Wg.geo,-c.m*9.81*c.d*Math.sin(c.alpha*RAD),1e-12);
 // Bağımsız: Kartezyen düzlemde F, ağırlık ve normal kuvvetle yarı-kapalı Euler, dt = 2e-5 s
 const al=c.alpha*RAD,e=[Math.cos(al),Math.sin(al)],nrm=[-Math.sin(al),Math.cos(al)],Fv=[c.F*Math.cos(al+c.beta*RAD),c.F*Math.sin(al+c.beta*RAD)],Wv=[0,-c.m*9.81],N=-(Fv[0]*nrm[0]+Fv[1]*nrm[1]+Wv[1]*nrm[1]),tot=[Fv[0]+Wv[0]+N*nrm[0],Fv[1]+Wv[1]+N*nrm[1]];near(N,r.normal,1e-9,'normal kuvvet');
 if(N>=0&&tot[0]*e[0]+tot[1]*e[1]>0){let x=0,y=0,vx=0,vy=0,s=0,prev=0,pvx=0,pvy=0;const dt=2e-5;while(s<c.d){prev=s;pvx=vx;pvy=vy;vx+=tot[0]/c.m*dt;vy+=tot[1]/c.m*dt;x+=vx*dt;y+=vy*dt;s=x*e[0]+y*e[1];}const f=(c.d-prev)/(s-prev),ux=pvx+(vx-pvx)*f,uy=pvy+(vy-pvy)*f,KE=.5*c.m*(ux*ux+uy*uy);ok(Math.abs(KE-r.net)<2e-3*Math.abs(r.net),'iş–enerji (Euler) '+KE+' / '+r.net);ok(Math.abs(r.dK-r.net)<1e-4*Math.abs(r.net),'iş–enerji (sayfa) '+r.dK+' / '+r.net);near(r.vEnd*r.vEnd,2*r.a*c.d,1e-4,'v² = 2ad');eq(r.why,null);}}
{const r=K.work({alpha:30,beta:20,F:50,d:4,m:5});near(r.WF.geo,187.93852415718166,1e-9);near(r.Wg.geo,-98.1,1e-9);near(r.net,89.83852415718166,1e-9);
 eq(K.work({alpha:30,beta:0,F:10,d:4,m:5}).why,'still');eq(K.work({alpha:30,beta:0,F:10,d:4,m:5}).dK,null);eq(K.work({alpha:0,beta:60,F:100,d:4,m:5}).why,'lift');near(K.work({alpha:0,beta:60,F:100,d:4,m:5}).WF.geo,200,1e-9);}

// ── 6. Tork ──
for(let i=0;i<400;i++){const c={r:grid(.05,.5,.01),rho:grid(0,360,5),F:grid(1,200,1),phi:grid(-180,180,1)},r=K.torque(c);near(r.tz,r.geo,1e-9,'τ_z = rF sin φ');ok(Math.abs(Math.abs(r.tz)-r.armTorque)<1e-9,'|τ| = F·d⊥');near(K.torque({...c,rho:c.rho+73}).tz,r.tz,1e-9,'ρ\'den bağımsız');
 // kuvveti etki çizgisi boyunca kaydırmak torku değiştirmez
 const s=grid(-2,2,.1),p=[r.rv[0]+s*r.Fv[0]/c.F,r.rv[1]+s*r.Fv[1]/c.F];ok(Math.abs(p[0]*r.Fv[1]-p[1]*r.Fv[0]-r.tz)<1e-9,'etki çizgisi');}
{const r=K.torque({r:.25,rho:30,F:80,phi:90});near(r.tz,20);near(r.arm,.25);near(K.torque({r:.25,rho:30,F:80,phi:0}).tz,0,1e-9);ok(K.torque({r:.25,rho:30,F:80,phi:0}).arm<1e-12);near(K.torque({r:.25,rho:30,F:80,phi:30}).tz,10);near(K.torque({r:.25,rho:30,F:80,phi:-90}).tz,-20);eq(K.torque({r:.25,rho:30,F:0,phi:90}).arm,null);}

// ── 7. Bağıl hız: kapalı formlar, ayrı integratör, kaba kuvvet eniyileme ──
{const c={w:100,u:3,v:5,theta:0,profile:'uniform'},r=K.simulate(c,1/60);near(r.time,20,1e-12);near(r.drift,60,1e-12);near(Math.hypot(r.drift,c.w)/r.time,Math.sqrt(34),1e-12);near(r.path,Math.hypot(60,100),1e-9);near(K.theory(c).track,30.96375653207352,1e-12);
 const z=K.simulate({...c,theta:36.87},1/60);near(z.time,25.00003,1e-6);ok(Math.abs(z.drift)<1e-3,'sin θ = u/v: sürüklenme '+z.drift);
 const o=K.optimum(c);near(o.path.theta,36.86989764584402);near(o.path.time,25);near(o.fast.time,20);near(o.fast.drift,60);eq(o.path.kind,'zero');
 const o2=K.optimum({...c,u:5,v:3});eq(o2.path.kind,'min');near(o2.path.theta,36.86989764584402);near(o2.path.drift,100*4/3);eq(K.optimum({...c,u:4,v:4}).path.kind,'limit');near(K.optimum({...c,u:0}).path.theta,0);}
for(let i=0;i<300;i++){const c={w:grid(20,400,10),u:grid(0,5,.1),v:grid(.5,6,.1),theta:grid(-85,85,.01),profile:'uniform'},cs=Math.cos(c.theta*RAD),sn=Math.sin(c.theta*RAD),T=c.w/(c.v*cs),Dr=(c.u-c.v*sn)*T,r=K.simulate(c,1/60),t=K.theory(c);near(r.time,T,1e-9,'geçiş süresi');ok(Math.abs(r.drift-Dr)<1e-8*Math.max(1,Math.abs(Dr),c.w),'sürüklenme');near(t.time,T,1e-12);near(t.speed,Math.hypot(c.u-c.v*sn,c.v*cs),1e-12);
 // adım boyundan bağımsızlık (varış anı adımın içinde bulunur)
 const h=K.simulate(c,1/7);near(h.time,r.time,1e-9);ok(Math.abs(h.drift-r.drift)<1e-8*Math.max(1,c.w),'adım bağımsızlığı');}
for(let i=0;i<25;i++){const c={w:grid(20,400,10),u:grid(.5,5,.1),v:grid(.5,6,.1),theta:grid(-60,60,.5),profile:'parabolic'},r=K.simulate(c,1/60),uni=K.simulate({...c,profile:'uniform'},1/60);
 // Bağımsız integratör: açık Euler, orta nokta değil, çok küçük adım
 const n=200000,T=c.w/(c.v*Math.cos(c.theta*RAD)),dt=T/n;let x=0,y=0;for(let k=0;k<n;k++){const s=y/c.w;x+=(6*c.u*s*(1-s)-c.v*Math.sin(c.theta*RAD))*dt;y+=c.v*Math.cos(c.theta*RAD)*dt;}ok(Math.abs(x-r.drift)<2e-4*Math.max(1,Math.abs(r.drift),c.w),'parabolik akıntı (Euler) '+x+' / '+r.drift);near(r.time,T,1e-9);ok(Math.abs(r.drift-uni.drift)<1e-8*Math.max(1,c.w),'sürüklenme yalnız ortalama akıntıya bağlı');ok(r.path>=uni.path-1e-9,'eğri yol daha kısa olamaz');}
near(K.current({w:100,u:3,profile:'parabolic'},50),4.5);near(K.current({w:100,u:3,profile:'parabolic'},0),0);
// Kaba kuvvet: 0.001° ızgarada kapalı formlarla arama (çekirdeğin taramasından bağımsız)
const brute=(c,lo=-85,hi=85,step=.001)=>{let bt=null,bd=null;const N=Math.round((hi-lo)/step);for(let i=0;i<=N;i++){const th=lo+i*step,cs=Math.cos(th*RAD),t=c.w/(c.v*cs),d=Math.abs((c.u-c.v*Math.sin(th*RAD))*t);if(!bt||t<bt.t)bt={th,t};if(!bd||d<bd.d)bd={th,d};}return{bt,bd};};
for(const[w,u,v]of[[100,3,5],[100,5,3],[200,2,2.5],[60,4.9,5],[400,5,.5],[100,0,4],[150,1,6],[100,3,2.9],[100,4,4],[80,2.5,2.5]]){const c={w,u,v,theta:0,profile:'uniform'},b=brute(c),o=K.optimum(c),sc=K.scan(c);ok(Math.abs(b.bt.th)<1e-9,'en kısa süre θ = 0');near(b.bt.t,o.fast.time,1e-12);near(sc.time.theta,0,1e-9);near(sc.time.time,w/v,1e-9);
 if(v!==u){ok(Math.abs(b.bd.th-o.path.theta)<(o.path.kind==='min'?.05:.002),`kaba kuvvet açısı ${b.bd.th} / ${o.path.theta}`);ok(Math.abs(b.bd.d-o.path.drift)<1e-4*w,'en az sürüklenme');ok(Math.abs(sc.drift.theta-b.bd.th)<(o.path.kind==='min'?.06:.011),`tarama açısı ${sc.drift.theta} / ${b.bd.th}`);ok(Math.abs(Math.abs(sc.drift.drift)-o.path.drift)<(o.path.kind==='min'?1e-6*w:2e-4*w)+1e-9,'tarama değeri');eq(sc.drift.edge,false);}
 else{eq(o.path.kind,'limit');near(b.bd.th,85,1e-9);eq(sc.drift.edge,true);near(sc.drift.theta,85);}
 // parabolik dağılımda tarama aynı açıyı bulur
 const sp=K.scan({...c,profile:'parabolic'});near(sp.time.theta,0,1e-9);ok(Math.abs(sp.drift.theta-sc.drift.theta)<.011,'parabolik tarama');}
// hazırlanmış (prep) yapılandırma başka bir açıyla yeniden kullanılınca eski sin/cos taşınmaz
{const P=K.prep({w:100,u:3,v:5,theta:20,profile:'uniform'}),s1=K.scan(P),s0=K.scan({w:100,u:3,v:5,theta:0,profile:'uniform'});near(s1.time.theta,s0.time.theta,1e-12);near(s1.drift.theta,s0.drift.theta,1e-12);near(K.simulate({...P,theta:0},1/60).time,20,1e-12);near(K.simulate({...P,profile:'parabolic'},1/60).path>K.simulate(P,1/60).path?1:0,1);}
// ── 8. Geçersiz girdiler ──
for(const call of[()=>K.polar(NaN,1),()=>K.simulate({w:100,u:3,v:0,theta:0},.1),()=>K.simulate({w:100,u:3,v:5,theta:90},.1),()=>K.theory({w:-1,u:3,v:5,theta:0}),()=>K.work({alpha:30,beta:0,F:10,d:0,m:5}),()=>K.torque({r:-1,rho:0,F:1,phi:0}),()=>K.simulate({w:100,u:3,v:5,theta:0},0)]){assert.throws(call);checks++;}
console.log(`G vektörler: ${checks.toLocaleString('tr-TR')} bağımsız çekirdek kontrolü PASS (çizim–bileşen en büyük fark: ${worstMag.toExponential(1)}, ${worstDeg.toExponential(1)}°)`);

if(process.argv.includes('--browser')){
 const {createRequire}=await import('node:module');const {createServer}=await import('node:http');const {join,extname}=await import('node:path');const {fileURLToPath}=await import('node:url');const root=fileURLToPath(new URL('../',import.meta.url));
 let chromium;for(const dir of[root,...(process.env.NODE_PATH||'').split(':').filter(Boolean),'/opt/node-tools']){try{({chromium}=createRequire(join(dir,'package.json'))('playwright'));break;}catch(_){}}if(!chromium)({chromium}=await import('playwright'));
 const server=createServer((req,res)=>{const file=join(root,decodeURIComponent(new URL(req.url,'http://localhost').pathname));if(!file.startsWith(root)||!fs.existsSync(file)||fs.statSync(file).isDirectory()){res.writeHead(404).end();return;}res.setHeader('Content-Type',({'.html':'text/html; charset=utf-8','.js':'text/javascript; charset=utf-8','.css':'text/css; charset=utf-8'})[extname(file)]||'application/octet-stream');res.end(fs.readFileSync(file));});await new Promise(r=>server.listen(0,'127.0.0.1',r));let browser;
 try{browser=await chromium.launch();const before=checks;
 for(const[width,theme]of[[390,'light'],[1280,'dark']]){const ctx=await browser.newContext({viewport:{width,height:900},deviceScaleFactor:width===390?2:1,locale:'tr-TR'});await ctx.addInitScript(t=>{localStorage.setItem('acelya-theme',t);localStorage.setItem('acelya-sound-muted','1');},theme);const page=await ctx.newPage();page.setDefaultTimeout(8000);const errors=[];page.on('pageerror',e=>errors.push(e.message));page.on('console',m=>{if(m.type()==='error'&&!/404|Failed to load resource/.test(m.text()))errors.push(m.text());});await page.goto(`http://127.0.0.1:${server.address().port}/vektorler.html`,{waitUntil:'load'});await page.waitForTimeout(400);
  const click=id=>page.locator('#'+id).click(),read=async id=>(await page.locator('#'+id).textContent()).trim(),range=(id,v)=>page.locator('#'+id).evaluate((e,v)=>{e.value=v;e.dispatchEvent(new Event(e.tagName==='SELECT'||e.type==='checkbox'?'change':'input',{bubbles:true}));},v),type=async(id,v)=>{await page.locator('#'+id).fill(String(v));await page.locator('#'+id).press('Enter');},is=async(id,t)=>{const got=await read(id);assert.equal(got,t,id);checks++;},has=async(id,t)=>{const got=await read(id);assert(got.includes(t),`${id}: "${got}" içinde "${t}" yok`);checks++;},noflow=async tag=>{eq(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),true,'yatay taşma: '+tag+' @'+width);};
  // her denetimin etiketi, her tuvalin adı var
  eq(await page.evaluate(()=>[...document.querySelectorAll('.app-content input,.app-content select')].filter(e=>!e.labels||!e.labels.length).map(e=>e.id).join(',')),'','etiketsiz denetim');eq(await page.evaluate(()=>[...document.querySelectorAll('.app-content canvas')].every(c=>c.getAttribute('role')==='img'&&c.getAttribute('aria-label'))),true);eq(await page.evaluate(()=>Object.isFrozen(VectorLab)&&!Object.getOwnPropertyDescriptor(window,'VectorLab').writable),true);
  // 01 · varsayılan
  await is('vRmag','5.00');await is('vRmagDraw','5.00');await is('vRmagDiff','0.000');await is('vRdir','36.87°');await is('vRdirDraw','36.87°');await is('vRxy','(4.00, 3.00)');await is('vRunit','(0.800, 0.600)');await is('vAngAB','90.00°');await is('vTri','1.00 ≤ 5.00 ≤ 7.00');await is('vEq','Kapalı');await has('vSelInfo','|A| = 4.00 · θ = 0.00°');await noflow('vec');
  // eksen döndürme: bileşenler değişir, büyüklük kalır
  await range('axRot',30);await has('vRrot','(4.96, 0.60)');await has('vRrotMag','5.00 · fark 0.000');await is('vRmag','5.00');await range('axRot',37);await has('vRrot','(5.00, −0.01)');await range('axRot',-180);await has('vRrot','(−4.00, −3.00)');await range('axRot',0);
  // çıkarma ve skaler çarpan
  await range('vSel',1);await click('vNeg');await is('vRxy','(4.00, −3.00)');await is('vRdir','323.13°');await is('vKOut','−1.00');await range('vK',0);await is('vRmag','4.00');await has('vecStatus','k = 0');await range('vK',1);await range('vSel',0);await range('vK',2);await is('vRmag','8.54');await range('vK',1);
  // kutupsal giriş, klavye, sınırlar
  await type('vMag','3');await type('vAng','30');await is('vXOut','2.60');await is('vYOut','1.50');await has('vSelInfo','|A| = 3.00 · θ = 30.00°');await type('vMag','12');await has('vecStatus','en çok 8.00');await has('vSelInfo','|A| = 8.00');await type('vMag','abc');await has('vecStatus','uygulanmadı');await type('vMag','2,5');await has('vSelInfo','|A| = 2.50');await page.locator('#vAng').focus();await page.keyboard.press('ArrowUp');await has('vSelInfo','θ = 31.00°');await page.locator('#vMag').focus();await page.keyboard.press('ArrowDown');await has('vSelInfo','|A| = 2.40');
  await range('vX',8);await range('vY',-8);await has('vSelInfo','|A| = 11.31 · θ = 315.00°');
  // hazır düzenler
  await click('preOpp');await is('vRmag','1.00');await is('vAngAB','180.00°');await is('vTri','1.00 ≤ 1.00 ≤ 7.00');await click('preClosed');await is('vRmag','0.00');await is('vRdir','tanımsız');await is('vRdirDraw','tanımsız');await is('vRdirDiff','—');await is('vRunit','tanımsız (R = 0)');await has('vecStatus','sıfır vektörü');await click('preFour');await is('vRxy','(1.00, 3.50)');await is('vRmag','3.64');await is('vRmagDraw','3.64');await is('vRdir','74.05°');await is('vRdirDraw','74.05°');eq(await page.locator('#vCount').inputValue(),'4');
  await range('vCount',1);await is('vAngAB','— (tek ok)');await is('vRmag','3.16');
  // denge görevleri
  for(const[n,cx,cy,mag]of[[1,-3,-4,'5.00'],[2,-3,-5,'5.83'],[3,-6,-3,'6.71']]){await range('eqTask',n);await has('vEq','denge yok');eq(await page.locator('#vSel').isDisabled(),true);eq(await page.locator('#vSel').inputValue(),'2');await range('vX',cx);await range('vY',cy);await has('vEq','Denge sağlandı · |R| = 0.00');await has('vecStatus','büyüklüğü '+mag);await range('vX',cx+.1);await has('vEq','denge yok');await click('eqShow');await has('vEq','Denge sağlandı');}
  await range('eqTask',0);await is('vEq','Kapalı');eq(await page.locator('#vSel').isDisabled(),false);
  // sürükleme (işaretçi): A'nın ucunu (2, 2)'ye taşı
  await click('vecReset');await is('vRmag','5.00');{const g=await page.evaluate(()=>{const c=document.getElementById('vecCanvas'),r=c.getBoundingClientRect();return{x:r.left,y:r.top,w:r.width,h:r.height};}),sc=(Math.min(g.w,g.h)/2-26)/5,P=(x,y)=>[g.x+g.w/2+x*sc,g.y+g.h/2-y*sc];await page.locator('#vecCanvas').scrollIntoViewIfNeeded();const g2=await page.evaluate(()=>{const r=document.getElementById('vecCanvas').getBoundingClientRect();return{x:r.left,y:r.top};}),dx=g2.x-g.x,dy=g2.y-g.y,a=P(4,0),b=P(2,2);await page.mouse.move(a[0]+dx,a[1]+dy);await page.mouse.down();await page.mouse.move(b[0]+dx,b[1]+dy,{steps:6});await page.mouse.up();await is('vXOut','2.00');await is('vYOut','2.00');await is('vRxy','(2.00, 5.00)');}
  await click('vecReset');await is('vRxy','(4.00, 3.00)');
  // 02 · varsayılan
  await click('tab-prod');await page.waitForTimeout(100);await is('pDotComp','11.00');await is('pDotGeo','11.00');await is('pDotDiff','0.000');await is('pCrossMag','10.00');await is('pArea','10.00');await is('pAreaDiff','0.000');await is('pTripDet','30.00');await has('pTripC','C = (1.00, 1.00, 3.00)');await has('prodStatus','C = (1.00, 1.00, 3.00) ile A·(B×C) = 30.00');await is('pTripGram','30.00');await is('pMags','4.12 · 3.61');await is('pTheta','42.27° · cos θ = 0.740');await is('pProj','3.05 · (1.69, 2.54, 0.00)');await is('pCross','(0.00, 0.00, 10.00)');await is('pCrossBA','(0.00, 0.00, −10.00)');await has('pDir','+z');await has('prodStatus','Ne dik ne paralel');await noflow('prod');
  await click('prePerp');await is('pDotComp','0.00');await is('pTheta','90.00° · cos θ = 0.000');await is('pCrossMag','13.00');await has('prodStatus','A ⊥ B');await click('prePar');await is('pCrossMag','0.00');await is('pArea','0.00');await is('pDotComp','10.00');await is('pTheta','0.00° · cos θ = 1.000');await is('pDir','tanımsız (A × B = 0)');await has('prodStatus','A ∥ B');await click('preAnti');await is('pDotComp','−10.00');await is('pTheta','180.00° · cos θ = −1.000');await has('prodStatus','zıt yönlü');await has('pProj','−2.24');
  await click('preSpace');await is('pDotComp','3.00');await is('pCross','(−5.00, −4.00, 7.00)');eq(await page.evaluate(()=>/-\d/.test(document.getElementById('panel-prod').innerText)),false,'kısa çizgili eksi (U+2212 olmalı)');eq(await page.evaluate(()=>[...document.querySelectorAll('#eqTask option')].some(o=>/-\d/.test(o.textContent))),false);await is('pCrossMag','9.49');await is('pArea','9.49');await is('pAreaDiff','0.000');await has('pDir','n = (−0.527, −0.422, 0.738)');await has('dotCaption','düzleme çevrildi');
  await range('swapAB',true);await page.locator('#swapAB').evaluate(e=>{e.checked=true;e.dispatchEvent(new Event('change',{bubbles:true}));});await has('prodStatus','Sıra değişti');
  for(const id of['aX','aY','aZ'])await range(id,0);await is('pTheta','tanımsız (sıfır vektör)');await is('pDotGeo','0.00');await has('prodStatus','Vektörlerden biri sıfır');for(const id of['bX','bY','bZ'])await range(id,0);await is('pProj','tanımsız (B = 0)');
  for(const id of['aX','aY','aZ','bX','bY','bZ'])await range(id,5);await is('pCrossMag','0.00');await range('bX',-5);await range('viewAz',-180);await range('viewEl',85);await is('pDotComp','25.00');
  await page.locator('#tripleBox summary').click();await page.locator('#showC').evaluate(e=>{e.checked=true;e.dispatchEvent(new Event('change',{bubbles:true}));});await range('cZ',0);await range('cX',1);await range('cY',1);
  await click('prodReset');await is('pDotComp','11.00');eq(await page.locator('#swapAB').isChecked(),false);eq(await page.locator('#showC').isChecked(),false);await is('viewAzOut','35°');
  // uygulama: iş
  await has('appRows','187.94 J');await has('appRows','−98.10 J');await has('appRows','89.84 J');await has('appStatus','yolun sonuna vardı');await range('incF',10);await has('appStatus','yukarı çıkmaz');await has('appRows','—');await range('incF',100);await range('incBeta',60);await range('incAlpha',0);await has('appStatus','yüzeyden kalkar');await range('incBeta',0);await range('incAlpha',60);await range('incF',100);await range('incD',10);await range('incM',10);await has('appStatus','yolun sonuna vardı');await has('appRows','1000.00 J');await range('incBeta',-60);await range('incAlpha',0);await range('incD',.5);await range('incM',.5);await has('appRows','25.00 J');await click('appReset');await has('appRows','187.94 J');
  // uygulama: tork
  await range('appSel','torque');await has('appRows','20.00 N·m');await has('appStatus','saat yönünün tersine');await range('tqPhi',0);await has('appStatus','cıvata dönmez');await range('tqPhi',-90);await has('appRows','−20.00 N·m');await has('appStatus','saat yönünde');await range('tqPhi',30);await has('appRows','10.00 N·m');await has('appStatus','0.125 m');await range('tqF',0);await has('appStatus','Kuvvet sıfır');await range('tqF',200);await range('tqR',.5);await range('tqPhi',180);await range('tqRho',360);await has('appRows','0.00 N·m');await range('tqPhi',90);await has('appRows','100.00 N·m');await click('appReset');await has('appRows','20.00 N·m');await noflow('prod-app');
  // 03 · varsayılan
  await click('tab-river');await page.waitForTimeout(150);await is('rvTimeT','20.00 s');await is('rvDriftT','60.00 m');await is('rvSpeedT','5.83 m/s');await is('rvTrackT','30.96°');await is('rvPathT','116.62 m');await is('rvFastTh','0.00°');await is('rvFastVal','20.00 s');await is('rvFastScanTh','0.00°');await is('rvFastScanVal','20.00 s');await is('rvPathTh','36.87°');await is('rvPathVal','0.00 m');await is('rvPathScanTh','36.87°');await is('rvPathScanVal','0.00 m');await is('rvTimeM','ölçülüyor…');
  // Boşluk duraklatır; R sıfırlar
  await page.locator('h1').click();await page.keyboard.press('Space');await is('rvToggle','Devam et');const t1=await read('rvLive');await page.waitForTimeout(300);eq(await read('rvLive'),t1,'duraklatılınca zaman durur');await page.keyboard.press('Space');await is('rvToggle','Duraklat');
  await click('rvSkip');await is('rvTimeM','20.00 s');await is('rvDriftM','60.00 m');await is('rvSpeedM','5.83 m/s');await is('rvTrackM','30.96°');await is('rvPathM','116.62 m');await has('rvTimeD','0.000 s');await has('rvDriftD','0.000 m');await is('rvToggle','Tekrar oynat');await has('riverStatus','60.00 m akıntı yönünde');await noflow('river');
  // gerçek zamanlı koşu da aynı sonuca varır (125×)
  await range('rvRate',125);await click('rvToggle');await page.waitForFunction(()=>document.getElementById('rvTimeM').textContent==='20.00 s',null,{timeout:6000});await is('rvDriftM','60.00 m');await range('rvRate',5);
  // en az sürüklenme rotası
  await click('rvStraight');await is('rvThetaOut','36.87°');eq(await page.locator('#rvThetaBox').inputValue(),'36.87');await is('rvTimeM','ölçülüyor…');await click('rvSkip');await is('rvTimeM','25.00 s');await is('rvDriftM','0.00 m');await is('rvTrackM','0.00°');await has('riverStatus','B noktasına vardı: sürüklenme gösterilen duyarlıkta 0.00 m.');await click('rvFast');await is('rvThetaOut','0.00°');
  // parabolik dağılım: süre ve sürüklenme aynı, yol daha uzun
  await range('rvProfile','parabolic');await is('rvPathT','— (eğri yol)');await click('rvSkip');await is('rvTimeM','20.00 s');await is('rvDriftM','60.00 m');await has('riverStatus','parabolik');const pm=parseFloat(await read('rvPathM'));ok(pm>116.62&&pm<125,'eğri yol '+pm);await range('rvProfile','uniform');
  // v < u ve v = u
  await range('rvU',5);await range('rvV',3);await is('rvPathTh','36.87°');await is('rvPathVal','133.33 m');await is('rvPathScanTh','36.87°');await is('rvPathScanVal','133.33 m');await click('rvStraight');await click('rvSkip');await is('rvDriftM','133.33 m');await has('riverStatus','v < u');await range('rvV',5);await is('rvPathTh','90° (sınır)');await has('rvPathScanTh','85.00° (uç)');await click('rvStraight');await is('rvThetaOut','85.00°');await click('rvSkip');await has('riverStatus','v = u');
  // sınır değerler ve yazarak giriş
  await range('rvU',0);await range('rvV',.5);await range('rvW',400);await range('rvTheta',-85);await click('rvSkip');await is('rvTimeT','9178.97 s');await is('rvTimeM','9178.97 s');await has('riverStatus','Ortam durgun');await type('rvThetaBox','12,5');await is('rvThetaOut','12.50°');await type('rvThetaBox','200');await is('rvThetaOut','85.00°');await type('rvThetaBox','x');await is('rvThetaOut','85.00°');await range('rvW',20);await range('rvU',5);await range('rvV',6);await range('rvTheta',85);await click('rvSkip');await has('rvTimeM',' s');await noflow('river-edge');
  // uçak senaryosu: aynı matematik, başka birimler
  await click('riverReset');await range('rvMode','plane');await is('rvWOut','100 km');await is('rvVOut','50 m/s (180 km/h)');await is('rvUOut','30 m/s (108 km/h)');await is('rvTimeT','33.33 dk');await is('rvDriftT','60.00 km');await is('rvSpeedT','58.31 m/s');await is('rvPathTh','36.87°');await has('rvThetaLab','Yengeç');await click('rvStraight');await click('rvSkip');await is('rvTimeM','41.67 dk');await is('rvDriftM','0.00 km');await has('riverStatus','Uçak');await noflow('plane');
  await click('riverReset');eq(await page.locator('#rvMode').inputValue(),'boat');await is('rvThetaOut','0.00°');await is('rvTimeT','20.00 s');
  // R: etkin sekmeyi sıfırlar (denetim dışında)
  await range('rvU',1);await page.locator('h1').click();await page.keyboard.press('r');await is('rvUOut','3.0 m/s');
  // sekme klavyesi
  await page.locator('#tab-river').focus();await page.keyboard.press('Home');eq(await page.locator('#tab-vec').getAttribute('aria-selected'),'true');await page.keyboard.press('ArrowRight');eq(await page.locator('#tab-prod').getAttribute('aria-selected'),'true');await page.keyboard.press('End');eq(await page.locator('#tab-river').getAttribute('aria-selected'),'true');await page.keyboard.press('ArrowRight');eq(await page.locator('#tab-vec').getAttribute('aria-selected'),'true');eq(await page.locator('#panel-prod').isHidden(),true);await is('vRmag','5.00');
  // tuvaller gerçekten çiziliyor
  for(const[tabId,ids]of[['tab-vec',['vecCanvas']],['tab-prod',['dotCanvas','crossCanvas','appCanvas']],['tab-river',['rvCanvas','rvVec']]]){await click(tabId);await page.waitForTimeout(150);for(const id of ids)ok(assertCanvasDrawn(await canvasInk(page,'#'+id),{minW:200,minDistinct:5,label:id}),id+' boş');}
  await noflow('son');assert.deepEqual(errors,[]);checks++;await ctx.close();}
 console.log(`G vektörler: ${checks-before} arayüz kontrolü PASS (390 px aydınlık + 1280 px karanlık)`);
 }finally{await browser?.close();await new Promise(r=>server.close(r));}
}
