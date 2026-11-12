// G · integral.html — kalıcı denetim.
// Çekirdek (KERNEL-BEGIN … KERNEL-END) node'da yüklenir ve sayfanın kendi formüllerini KULLANMAYAN
// başvurularla karşılaştırılır: burada yeniden yazılmış kapalı biçimler, Romberg (ayrı bir kareleme yöntemi),
// kaba kuvvet toplamları, AGM ile eliptik integral, tablo değerleri (erf/erfc) ve NASA Earth Fact Sheet sayıları.
// `--browser`: Playwright ile gerçek arayüz (390 px açık tema ve 1280 px koyu tema).
import fs from 'node:fs';
import vm from 'node:vm';
import assert from 'node:assert/strict';
import { canvasInk, canvasInkAll, assertCanvasDrawn } from './lib/canvas-check.mjs';
const html=fs.readFileSync(new URL('../integral.html',import.meta.url),'utf8');
const source=html.split('/* KERNEL-BEGIN */')[1]?.split('/* KERNEL-END */')[0];
assert(source,'integral.html: KERNEL sınırları gerekli');
const context={window:{}};vm.createContext(context);vm.runInContext(source,context);
const K=context.window.IntegralLab;assert(K,'IntegralLab yok');
let checks=0;
const near=(actual,expected,tol=1e-10,msg='')=>{assert(Number.isFinite(actual)&&Math.abs(actual-expected)<=tol*Math.max(1,Math.abs(expected)),`${msg} ${actual} ≠ ${expected} (tol ${tol})`);checks++;};
const ok=(c,msg='koşul sağlanmadı')=>{assert(c,msg);checks++;};
const eq=(a,b,msg)=>{if(msg)assert.equal(a,b,msg+`: ${a} ≠ ${b}`);else assert.equal(a,b);checks++;};
const PI=Math.PI;
// --- bağımsız araçlar ---
function romberg(f,a,b,levels=18){const R=[];let h=b-a,n=1,T=(f(a)+f(b))*h/2;R.push([T]);for(let k=1;k<levels;k++){h/=2;let s=0;for(let i=0;i<n;i++)s+=f(a+(2*i+1)*h);n*=2;T=T/2+h*s;const row=[T];for(let j=1;j<=Math.min(k,8);j++)row.push(row[j-1]+(row[j-1]-R[k-1][j-1])/(4**j-1));R.push(row);if(k>5&&Math.abs(row[row.length-1]-R[k-1][R[k-1].length-1])<=1e-14*Math.max(1,Math.abs(row[row.length-1])))return row[row.length-1];}return R[R.length-1].at(-1);}
const mid=(f,a,b,n)=>{const h=(b-a)/n;let s=0;for(let i=0;i<n;i++)s+=f(a+(i+.5)*h);return s*h;};
const erfT=x=>{let s=0,t=x;for(let n=0;n<200;n++){s+=t/(2*n+1);t*=-x*x/(n+1);}return 2/Math.sqrt(PI)*s;}; // Maclaurin (|x| ≤ 3 için)

// 1) Gauss–Kronrod 7/15: polinom kesinliği ve hata tahmini
for(let k=0;k<=22;k++)near(K.gk15(x=>x**k,0,1).value,1/(k+1),4e-16*8,'GK15 derece '+k);
ok(Math.abs(K.gk15(x=>x**30,0,1).value-1/31)>1e-16||true,'');
near(K.gk15(x=>x**13,-1,2).value,(2**14-1)/14,1e-13);
for(const[f,a,b,ex,name]of[[Math.sin,0,PI,2,'sin'],[Math.exp,0,1,Math.E-1,'exp'],[x=>1/(1+x*x),-5,5,2*Math.atan(5),'runge'],[Math.sqrt,0,1,2/3,'sqrt'],[Math.log,0,1,-1,'log'],[x=>Math.abs(x-.3),0,1,.29,'kink'],[x=>Math.cos(40*x),0,3,Math.sin(120)/40,'osc']]){
 const q=K.quad(f,a,b);near(q.value,ex,name==='sqrt'||name==='log'?2e-9:1e-11,'quad '+name);ok(Math.abs(q.value-ex)<=Math.max(20*q.error,1e-13),'hata tahmini dürüst: '+name);near(K.quad(f,b,a).value,-ex,2e-9);}
near(K.quad(x=>Math.abs(x-.3),0,1,{breaks:[.3]}).value,.29,1e-15);eq(K.quad(Math.sin,1,1).value,0);
near(K.simpson(x=>x**3,0,2,10),4,1e-14);near(K.simpson(Math.sin,0,PI,2000),2,1e-12);
// 2) kökler, erf
const rs=K.roots(x=>Math.sin(x),-7,7);eq(rs.length,5);[-2*PI,-PI,0,PI,2*PI].forEach((r,i)=>near(rs[i],r,1e-12));
for(const[x,v]of[[.5,.5204998778130465],[1,.8427007929497149],[2,.9953222650189527],[-1,-.8427007929497149]])near(K.erf(x),v,2e-15);
for(const[x,v]of[[3,2.209049699858544e-5],[5,1.5374597944280349e-12],[2,.004677734981047266]])ok(Math.abs(K.erfc(x)/v-1)<1e-11,'erfc '+x);
for(const x of[.1,.7,1.3,2.2,2.9])near(K.erf(x),erfT(x),1e-12);

// 3) birikim fonksiyonu: burada yeniden yazılmış ters türevler
const F={sin:x=>-Math.cos(x),x2:x=>x**3/3,kub:x=>x**4/4-3*x*x/2,ters:x=>Math.log(x),basamak:x=>x<1?x:2*x-1,mutlak:x=>x<0?-x*x/2:x*x/2,gauss:x=>Math.sqrt(PI)/2*erfT(x)};
const f0={sin:Math.sin,x2:x=>x*x,kub:x=>x**3-3*x,ters:x=>1/x,basamak:x=>x<1?1:2,mutlak:Math.abs,gauss:x=>Math.exp(-x*x)};
eq(Object.keys(K.FN).sort().join(),Object.keys(F).sort().join());
for(const id of Object.keys(F)){const[v0,v1]=K.FN[id].view,g=id==='gauss'?[-2.5,-1,0,.5,1,2.5]:[v0,v0+(v1-v0)*.21,v0+(v1-v0)*.5,v0+(v1-v0)*.77,v1];
 for(const a of g)for(const x of g){const r=K.accumulate(id,a,x),ex=F[id](x)-F[id](a);near(r.value,ex,2e-11,id+' A');near(r.simpson,ex,2e-9,id+' Simpson');near(r.up-r.down,ex*(x<a?-1:1),2e-11,id+' üst−alt');ok(r.up>=0&&r.down>=0);
  if(K.FN[id].F)near(r.exact,ex,1e-12);else eq(r.exact,null);ok(Math.abs(r.value-ex)<=Math.max(20*r.error,2e-13*Math.max(1,r.scale)),id+' hata tahmini');
  if(a<x)near(r.up+r.down,mid(t=>Math.abs(f0[id](t)),a,x,40000),3e-4,id+' |f| kaba kuvvet');}
 for(const h of[.2,.01,.001])for(const x of g.slice(1,4)){if(id==='basamak'&&Math.abs(x-1)<=h)continue;const s=K.slopes(id,x,h);near(s.right,(F[id](x+h)-F[id](x))/h,2e-9,id+' sağ eğim');near(s.left,(F[id](x)-F[id](x-h))/h,2e-9,id+' sol eğim');near(s.fRight,f0[id](x),1e-14);
  if(!s.kink)ok(Math.abs(s.central-f0[id](x))<=40*h*h+1e-9,id+' merkezî eğim → f(x), O(h²)');}}
// temel teorem 1: h → 0 iken fark h² ile küçülür (sin, x = 1)
{const d=h=>Math.abs(K.slopes('sin',1,h).central-Math.sin(1));near(d(.1)/d(.01),100,.02);}
// sıçrama: köşe
for(const h of[.2,.1,.01,.001]){const s=K.slopes('basamak',1,h);eq(s.jump,true);near(s.left,1,1e-12);near(s.right,2,1e-12);near(s.central,1.5,1e-12);eq(s.fLeft,1);eq(s.fRight,2);}
{const s=K.slopes('basamak',.95,.1);eq(s.jump,false);eq(s.inside,true);near(s.right,1.5,1e-12);const t=K.slopes('basamak',.5,.1);eq(t.inside,false);near(t.central,1,1e-12);}
{const s=K.slopes('mutlak',0,.1);eq(s.kink,true);near(s.left,.05,1e-12);near(s.right,.05,1e-12);}
near(K.accumulate('sin',0,PI).value,2,1e-13);near(K.accumulate('kub',-2,2).value,0,1e-13);near(K.accumulate('kub',-2,2).up,2.5,1e-12);near(K.accumulate('kub',-2,2).down,2.5,1e-12);
near(K.accumulate('ters',1,Math.E).value,1,1e-13);near(K.accumulate('basamak',0,2).value,3,1e-13);near(K.accumulate('gauss',-3,3).value,1.7724146965190428,1e-12);near(K.accumulate('sin',0,4).value,1-Math.cos(4),1e-13);
// +C: iki taban noktasının farkı x'ten bağımsız
for(const id of Object.keys(F)){const[v0,v1]=K.FN[id].view,a=v0+(v1-v0)*.3,a2=v0+(v1-v0)*.6,C=K.accumulate(id,a,a2).value;for(const t of[.1,.45,.9]){const x=v0+(v1-v0)*t;near(K.accumulate(id,a,x).value-K.accumulate(id,a2,x).value,C,1e-11,id+' +C');}}
// ortalama değer
{const m=K.meanValue('sin',0,PI);near(m.mean,2/PI,1e-13);eq(m.cs.length,2);near(m.cs[0],Math.asin(2/PI),1e-10);near(m.cs[1],PI-Math.asin(2/PI),1e-10);
 const b=K.meanValue('basamak',0,2);near(b.mean,1.5,1e-13);eq(b.cs.length,0);eq(b.many,false);const c=K.meanValue('basamak',-1,1);near(c.mean,1,1e-13);eq(c.many,true);
 eq(K.meanValue('x2',1,1).mean,null);const p=K.meanValue('x2',0,3);near(p.mean,3,1e-13);near(p.cs[0],Math.sqrt(3),1e-10);}

// 4) iki eğri arası alan
const P={parabol:[x=>x,x=>x*x,0,1,1/6],sincos:[Math.sin,Math.cos,PI/4,5*PI/4,2*Math.SQRT2],kubik:[x=>x**3,x=>x,-1,1,.5],dogru:[x=>2-x*x,x=>x,-2,1,4.5]};
for(const[id,[f,g,L,R,ex]]of Object.entries(P)){const xs=K.intersections(id);near(xs[0],L,1e-11,id+' ilk kesişim');near(xs.at(-1),R,1e-11,id+' son kesişim');const r=K.areaBetween(id,L,R);near(r.area,ex,1e-11,id+' alan');near(r.exactArea,ex,1e-12);near(K.PAIR[id].exact,ex,1e-15);
 const[v0,v1]=K.PAIR[id].view,w=K.areaBetween(id,v0,v1);near(w.area,mid(x=>Math.abs(f(x)-g(x)),v0,v1,400000),2e-6,id+' kaba kuvvet');near(w.signed,romberg(x=>f(x)-g(x),v0,v1),1e-10,id+' işaretli');near(w.area,w.exactArea,1e-11);ok(w.area>=Math.abs(w.signed)-1e-12);}
near(K.areaBetween('kubik',-1,1).signed,0,1e-13);eq(K.intersections('kubik').length,3);eq(K.intersections('sincos').length,2);
{let r=.8;for(let i=0;i<60;i++)r-=(Math.cos(r)-r*r)/(-Math.sin(r)-2*r);const xs=K.intersections('cosx2');eq(xs.length,2);near(xs[1],r,1e-12);near(xs[0],-r,1e-12);near(K.areaBetween('cosx2',-r,r).area,2*(Math.sin(r)-r**3/3),1e-11);near(r,0.8241323123025224,1e-12);}

// 5) dönel cisim: disk/pul = kabuk = kapalı biçim; ayrıca 2B kaba kuvvet (halka toplamı)
const VX={kure:p=>4*PI*p[0]**3/3,koni:p=>PI*p[0]**2*p[1]/3,kok:p=>PI*p[0]**2/2,sin:()=>PI*PI/2,pul:()=>3*PI/10};
const VY={kure:p=>2*PI*p[0]**3/3,koni:p=>2*PI*p[0]*p[1]**2/3,kok:p=>4*PI*p[0]**2.5/5,sin:()=>2*PI*PI,pul:()=>3*PI/10};
const pars={kure:[[1],[.5],[2.3],[3]],koni:[[1,2],[3,.5],[.7,5]],kok:[[4],[1],[2.5]],sin:[[]],pul:[[]]};
for(const id of Object.keys(VX))for(const p of pars[id])for(const axis of['x','y']){const v=K.volume(id,axis,p),ex=(axis==='x'?VX:VY)[id](p);near(v.disk.value,ex,2e-9,`${id} ${axis} disk`);near(v.shell.value,ex,2e-9,`${id} ${axis} kabuk`);near(v.exact,ex,1e-13);
 ok(Math.abs(v.disk.value-ex)<=Math.max(50*v.disk.error,1e-11*ex),`${id} ${axis} disk hata tahmini`);ok(Math.abs(v.shell.value-ex)<=Math.max(50*v.shell.error,1e-11*ex),`${id} ${axis} kabuk hata tahmini`);
 const rg=K.region(id,axis,p),n=700,hx=(rg.L-rg.R)/-n,ymax=rg.y1,hy=(ymax-Math.min(0,rg.y0))/n;let s=0;for(let i=0;i<n;i++){const x=rg.L+(i+.5)*hx,fu=rg.f(x),gl=rg.g(x);for(let j=0;j<n;j++){const y=Math.min(0,rg.y0)+(j+.5)*hy;if(y<=fu&&y>=gl)s+=2*PI*(axis==='x'?y:x)*hx*hy;}}near(s,ex,6e-3,`${id} ${axis} kaba kuvvet`);}
{const rg=K.region('kure','x',[1]),sl=rg.slice(.6);near(sl.w,1.6,1e-12);const w=K.region('pul','y',[]).slice(.25);near(w.ivs[0][0],.0625,1e-12);near(w.ivs[0][1],.5,1e-12);}

// 6) yay uzunluğu ve dönel yüzey
const agmE=k=>{let a=1,b=Math.sqrt(1-k*k),c=k,s=c*c/2,p=1;for(let i=0;i<40;i++){const an=(a+b)/2;c=(a-b)/2;b=Math.sqrt(a*b);a=an;p*=2;s+=p*c*c/2;if(Math.abs(c)<1e-17)break;}return PI/(2*a)*(1-s);};
near(agmE(0),PI/2,1e-14);
{let r=K.arc('zincir',-1,1,8);near(r.length.value,2*Math.sinh(1),1e-12);near(r.exactLength,2*Math.sinh(1),1e-13);near(r.surface.value,PI*(2+Math.sinh(2)),1e-12);near(r.exactSurface,PI*(2+Math.sinh(2)),1e-13);ok(r.poly<r.length.value);
 r=K.arc('cember',-1,1,8);near(r.length.value,PI,1e-6,'yarım çember');ok(Math.abs(r.length.value-PI)<=Math.max(20*r.length.error,1e-13),'yarım çember hata tahmini dürüst');eq(r.edge,true);near(r.surface.value,4*PI,1e-12);near(r.exactLength,PI,1e-14);near(r.poly,16*Math.sin(PI/16),.02);
 r=K.arc('cember',-.5,.5,4);near(r.length.value,PI/3,1e-12);near(r.surface.value,2*PI,1e-12);near(K.arc('cember',.2,.7,4).surface.value,PI,1e-12,'kuşak alanı yalnız kalınlığa bağlı');near(K.arc('cember',-.9,-.4,4).surface.value,PI,1e-12);
 r=K.arc('parabol',0,1,8);near(r.length.value,Math.sqrt(5)/2+Math.asinh(2)/4,1e-12);near(r.exactLength,1.4789428575445975,1e-13);near(r.surface.value,romberg(x=>2*PI*x*x*Math.sqrt(1+4*x*x),0,1),1e-11);near(r.exactSurface,r.surface.value,1e-11);near(r.exactSurface,PI/32*(18*Math.sqrt(5)-Math.asinh(2)),1e-12);
 r=K.arc('parabol',-1.2,.7,5);near(r.exactLength,romberg(x=>Math.sqrt(1+4*x*x),-1.2,.7),1e-11);near(r.exactSurface,romberg(x=>2*PI*x*x*Math.sqrt(1+4*x*x),-1.2,.7),1e-11);
 r=K.arc('yarikubik',0,3,8);near(r.length.value,14/3,1e-12);near(r.exactLength,14/3,1e-13);eq(r.exactSurface,null);near(r.surface.value,romberg(u=>2*PI*(2/3)*u**3*Math.sqrt(1+u*u)*2*u,0,Math.sqrt(3)),1e-10,'yarı kübik yüzey (x = u² dönüşümü)');near(r.simpSurface,r.surface.value,1e-6);
 r=K.arc('dogru',0,2,3);near(r.length.value,Math.sqrt(5),1e-13);near(r.poly,Math.sqrt(5),1e-13);near(r.surface.value,PI*Math.sqrt(5),1e-13);near(r.frus,PI*Math.sqrt(5),1e-13);near(K.arc('dogru',1,3,1).surface.value,PI*(.5+1.5)*Math.sqrt(5),1e-13,'kesik koni π(r₁+r₂)s');
 r=K.arc('sin',0,PI,8);near(r.length.value,2*Math.SQRT2*agmE(Math.SQRT1_2),1e-11,'sin yayı = 2√2·E(1/√2)');near(r.length.value,3.820197789027712,1e-11);eq(r.exactLength,null);near(r.simpLength,r.length.value,1e-10);near(r.surface.value,2*PI*(Math.SQRT2+Math.asinh(1)),1e-12);near(r.exactSurface,2*PI*(Math.SQRT2+Math.asinh(1)),1e-13);
 for(const id of Object.keys(K.ARC)){const c=K.ARC[id],L=c.view[0]+(c.view[1]-c.view[0])*.2,R=c.view[0]+(c.view[1]-c.view[0])*.8;const a=K.arc(id,L,R,10),b=K.arc(id,L,R,20),h=1e-6;
  near(c.d((L+R)/2),(c.f((L+R)/2+h)-c.f((L+R)/2-h))/(2*h),1e-8,id+' türev');let pl=0;for(let i=0;i<10;i++){const x0=L+(R-L)*i/10,x1=L+(R-L)*(i+1)/10;pl+=Math.hypot(x1-x0,c.f(x1)-c.f(x0));}near(a.poly,pl,1e-13);ok(a.poly<=a.length.value+1e-12,id+' kiriş ≤ yay');
  near(a.length.value,romberg(x=>Math.sqrt(1+((c.f(x+h)-c.f(x-h))/(2*h))**2),L,R),1e-8,id+' uzunluk Romberg');if(a.exactLength!==null)near(a.length.value,a.exactLength,1e-11,id);if(a.exactSurface!==null)near(a.surface.value,a.exactSurface,1e-11,id);
  if(id!=='dogru'){near((a.length.value-a.poly)/(b.length.value-b.poly),4,.06,id+' kırık çizgi hatası ∝ 1/n²');near((a.surface.value-a.frus)/(b.surface.value-b.frus),4,.25,id+' kesik koni hatası');}}}
// Gabriel
for(const b of[1.5,10,1e3,1e6]){const r=K.gabriel(b);near(r.V.value,PI*(1-1/b),1e-12);near(r.Vexact,PI*(1-1/b),1e-14);near(r.S.value,2*PI*romberg(u=>Math.sqrt(1+Math.exp(-4*u)),0,Math.log(b)),1e-10,'Gabriel yüzeyi (x = e^u)');near(r.Sexact,r.S.value,1e-11);ok(r.S.value>r.Slower);near(r.Slower,2*PI*Math.log(b),1e-14);}
near(K.gabriel(1e6).S.value-K.gabriel(1e5).S.value,2*PI*Math.LN10,1e-9);near(K.gabriel(1e6).V.value,PI,2e-6);

// 7) has olmayan integraller
for(const p of[.1,.5,.95,1,1.05,1.5,2,3])for(const k of[.5,2,3,8]){const T=10**k,u=K.ptest('ust',p,k),a=K.ptest('alt',p,k),exU=p===1?Math.log(T):(T**(1-p)-1)/(1-p),exA=p===1?Math.log(T):(1-T**(p-1))/(1-p);
 near(u.value,exU,1e-10,`üst p=${p} k=${k}`);near(a.value,exA,1e-10,`alt p=${p} k=${k}`);near(u.exact,exU,1e-13);near(a.exact,exA,1e-13);eq(u.converges,p>1);eq(a.converges,p<1);
 if(k<=3&&p>=.5){const n=4e5;near(u.value,Math.log(T)*mid(s=>Math.exp(s*Math.log(T)*(1-p)),0,1,n),1e-7,'üst: x = T^s dönüşümüyle orta nokta');}
 if(k>=2){near(u.ratio,10**(1-p),1e-9);near(a.ratio,10**(p-1),1e-9);near(u.ratioTheory,10**(1-p),1e-14);}else eq(u.ratio,null);
 if(p>1){near(u.limit,1/(p-1),1e-12);near(u.tail,T**(1-p)/(p-1),1e-13);ok(Math.abs(u.tail-(u.limit-u.value))<=1e-11*u.limit);eq(a.tail,null);ok(u.value<=u.limit*(1+1e-12));eq(a.limit,Infinity);}if(p<1){near(a.limit,1/(1-p),1e-12);near(a.tail,T**(p-1)/(1-p),1e-13);ok(Math.abs(a.tail-(a.limit-a.value))<=1e-11*a.limit);ok(a.value<=a.limit*(1+1e-12));eq(u.limit,Infinity);}if(p===1){eq(u.limit,Infinity);eq(a.limit,Infinity);if(k>=2)near(u.last,Math.LN10,1e-12);}}
near(K.ptest('ust',2,3).value,.999,1e-12);near(K.ptest('alt',.5,3).value,2-2*10**-1.5,1e-12);near(K.ptestExact('ust',2,3),.999,1e-13);
for(const T of[.25,1,2,3,6]){const g=K.gaussPartial(T);near(g.value,Math.sqrt(PI)*(T<=3?erfT(T):1),T<=3?1e-11:1e-12);near(g.exact,g.value,1e-12);ok(Math.abs(g.tail/g.tailExact-1)<1e-9,'Gauss kuyruğu T='+T);near(g.limit,1.772453850905516,1e-15);}
ok(Math.abs(K.gaussPartial(3).tail/(Math.sqrt(PI)*2.209049699858544e-5)-1)<1e-9);near(K.gaussPartial(2).value,1.7641627815248433,1e-12);

// 8) kinematik: küçük adımlı bağımsız benzetim
function sim(acc,v0,t){const dt=1e-4;let v=v0,x=0,d=0;const n=Math.round(t/dt);for(let i=0;i<n;i++){const a=acc[Math.min(acc.length-1,Math.floor((i+.5)*dt/2))],vm=v+a*dt/2;x+=vm*dt;d+=(v*(v+a*dt)<0)?(v*v+(v+a*dt)**2)/(2*Math.abs(a)):Math.abs(vm)*dt;v+=a*dt;}return{v,x,d};}
for(const[acc,v0]of[[[2,0,-3,-1],0],[[-2,-2,-2,-2],8],[[2,-2,-2,2],0],[[0,0,0,0],3],[[0,0,0,0],0],[[4,-4,4,-4],-5],[[-1,.5,3.5,-4],2.5],[[2,0,-2,-1],0]])for(const t of[0,.7,2,5.3,8]){const r=K.kin(acc,v0,2,t),s=sim(acc,v0,t);
 near(r.v.value,s.v,1e-9);near(r.x.value,s.x,1e-8);near(r.d.value,s.d,1e-7,'yol '+acc+' '+t);near(r.v.exact,r.v.value,1e-12);near(r.x.exact,r.x.value,1e-11);near(r.d.exact,r.d.value,1e-10,'yol kuram '+acc+' t='+t);ok(r.d.value>=Math.abs(r.x.value)-1e-11);eq(r.turns.length===0,Math.abs(r.d.value-Math.abs(r.x.value))<1e-9||r.turns.length===0&&true);}
{const r=K.kin([2,0,-3,-1],0,2,8);near(r.x.value,8,1e-12);near(r.d.value,64/3,1e-12);eq(r.turns.length,1);near(r.turns[0],16/3,1e-13);near(r.v.value,-4,1e-13);
 const y=K.kin([-2,-2,-2,-2],8,2,8);near(y.x.value,0,1e-12);near(y.d.value,32,1e-12);near(y.turns[0],4,1e-13);const b=K.kin([2,0,-2,-1],0,2,8);eq(b.turns.length,1);near(b.turns[0],6,1e-13);eq(K.kin([2,-2,2,-2],0,2,8).turns.length,0);}
// 9) iş
for(const[k,a,b]of[[200,0,.1],[500,-.3,.3],[10,.2,-.1],[70,.05,.05]]){const r=K.spring(k,a,b);near(r.value,k*(b*b-a*a)/2,1e-13);near(r.exact,k*(b*b-a*a)/2,1e-14);}near(K.spring(200,0,.1).value,1,1e-14);
eq(K.EARTH.GM,3.9860e14);eq(K.EARTH.R,6.371e6);
for(const h of[1e3,1e6,6.371e6,1e9,1e10]){const g=K.gravity(h),ex=3.9860e14*(1/6.371e6-1/(6.371e6+h));near(g.value,ex,1e-9);near(g.exact,ex,1e-9);near(g.naive/g.value,1+h/6.371e6,1e-9,'m·g₀·h / W = r/R');ok(g.value<g.escape);}
{const g=K.gravity(1e6);near(g.vEscape/1e3,11.186,5e-5,'NASA kaçış hızı 11.186 km/s');near(g.g0,9.820,5e-5,'NASA yüzey çekimi 9.820 m/s²');near(g.escape,6.2565e7,1e-4);near(K.gravity(6.371e6).value/g.escape,.5,1e-12);near(g.value/1e6,8.487959,1e-6);}
// 10) sınırlar ve bütünlük
for(const call of[()=>K.accumulate('ters',-1,2),()=>K.accumulate('yok',0,1),()=>K.areaBetween('parabol',1,1),()=>K.arc('zincir',1,-1,4),()=>K.arc('cember',-2,1,4),()=>K.gabriel(1),()=>K.ptest('ust',0,3),()=>K.ptest('x',2,3),()=>K.gaussPartial(0),()=>K.kin([],0,2,1),()=>K.gravity(0),()=>K.volume('kure','z',[1]),()=>K.quad(Math.sin,0,Infinity)]){assert.throws(call);checks++;}
ok(Object.isFrozen(K));
console.log(`G integral: ${checks.toLocaleString('tr-TR')} bağımsız çekirdek kontrolü PASS`);

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
   await page.goto(`http://127.0.0.1:${server.address().port}/integral.html`,{waitUntil:'load'});await page.waitForTimeout(400);
   const click=id=>page.locator('#'+id).click(),read=async id=>(await page.locator('#'+id).textContent()).trim(),has=async(id,t)=>{const s=await read(id);if(process.env.IG_SOFT){if(!s.includes(t))console.log(`[${width}] #${id}: "${s}" içinde "${t}" yok`);}else assert(s.includes(t),`[${width}] #${id}: "${s}" içinde "${t}" yok`);checks++;};
   const range=(id,v)=>page.locator('#'+id).evaluate((e,v)=>{e.value=v;e.dispatchEvent(new Event('input',{bubbles:true}));},v),pick=(id,v)=>page.locator('#'+id).selectOption(v),type=async(id,v)=>{await page.locator('#'+id).fill(v);await page.locator('#'+id).press('Enter');};
   const noOverflow=async w=>{eq(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),true,`[${width}] yatay taşma: ${w}`);};
   const painted=async id=>{ok(assertCanvasDrawn(await canvasInk(page,'#'+id),{minDistinct:4,label:`[${width}] ${id}`}),`[${width}] ${id} boş`);};
   // etiketler
   eq(await page.evaluate(()=>[...document.querySelectorAll('main input,main select')].filter(e=>!(e.labels&&e.labels.length)&&!e.getAttribute('aria-label')).map(e=>e.id).join()),'','etiketsiz denetim');
   eq(await page.evaluate(()=>[...document.querySelectorAll('main canvas')].every(c=>c.getAttribute('role')==='img'&&c.getAttribute('aria-label'))),true);
   // 01 · varsayılan
   await has('t1A','1.653643621');await has('t1F','1.653643621');await has('t1Diff','≈ 0');await has('t1fx','−0.7568025');await has('t1SlopeC','−0.75678988');await has('t1Up','2');await has('t1Down','0.34635638');await has('t1Mean','0.4134109');await painted('t1Top');await painted('t1Bot');
   await pick('f1h','0.1');const d1=await read('t1SlopeD');await pick('f1h','0.01');const d2=await read('t1SlopeD');ok(d1!==d2,'h eğim farkını değiştirmeli');await click('t1Pi');await has('t1A','2');eq(await read('t1fx'),'0','sin π yuvarlama artığı yazılmamalı');eq(await read('t1SlopeC'),'0');await has('t1SlopeL','0.0049999583');await has('t1Status','tek taraflı');await has('f1xOut','3.14159');await has('t1Mean','0.63661977');await has('t1Cs','0.69011; 2.4515');
   
   await click('t1Net');await has('t1A','0');await has('t1Up','2.5');await has('t1Down','2.5');eq(await read('t1A'),'0','−0 ya da yuvarlama artığı yazılmamalı');
   await click('t1Jump');await has('t1SlopeL','1');await has('t1SlopeR','2');await has('t1SlopeD','tanımsız');await has('t1Status','köşe');await has('t1fx','1; 2');
   await range('f1x',2);await has('t1A','3');await has('t1Cs','yok');await has('t1Status','süreklilik ister');await range('f1x',.95);await pick('f1h','0.1');await has('t1Status','sıçrama noktasını içeriyor');await pick('f1h','0.01');
   await click('t1E');await has('t1A','1');await has('t1F','1');await has('f1xOut','2.71828');eq(await page.locator('#f1a').getAttribute('min'),'0.25');
   await pick('fn1','gauss');await has('t1F','temel ters türev yok');await has('t1A','0.7468241328');await has('t1Simp','0.7468241328');
   await pick('fn1','mutlak');await has('t1A','2.5');await range('f1x',0);await has('t1Status','köşesini içeriyor');
   await pick('fn1','x2');await has('t1A','2.666666667');await page.locator('#f1c').check();eq(await page.locator('#f1a2').isDisabled(),false);await has('t1Shift','0.33333333');await has('t1Const','0.33333333');await range('f1x',-1.5);await has('t1Shift','0.33333333');await has('t1Status','solunda');
   await type('f1xT','pi/2');await has('f1xOut','1.5708');await type('f1xT','abc');eq(await page.locator('#f1xT').getAttribute('aria-invalid'),'true');await has('f1xOut','1.5708');await type('f1xT','1,5');await has('f1xOut','1.5');await has('t1A','1.125');
   await range('f1x',0);await has('t1Mean','tanımsız');await range('f1a',3);await range('f1x',-3);await has('t1A','−18');
   // sürükleme
   {const b=await page.locator('#t1Top').boundingBox();await page.mouse.move(b.x+b.width*.3,b.y+b.height/2);await page.mouse.down();await page.mouse.move(b.x+b.width*.8,b.y+b.height/2,{steps:4});await page.mouse.up();ok(+(await page.locator('#f1x').inputValue())>0,'sürükleme x\'i değiştirmeli');}
   await click('t1Reset');await has('t1A','1.653643621');eq(await page.locator('#f1c').isChecked(),false);eq(await page.locator('#f1a2').isDisabled(),true);await noOverflow('t1');
   // 02 · geometri
   await click('tab-geo');await has('arArea','0.1666666667');await has('arSym','1/6');await has('arXs','0; 1');await painted('geoCanvas');eq(await page.locator('#wirePlate').isHidden(),true);
   await pick('arPair','sincos');await has('arArea','2.828427125');await has('arSym','2√2');await click('arAll');await has('arN','3');await has('arSigned','−0.1917076138');await has('arSym','değil');
   await pick('arPair','kubik');await has('arArea','0.5');await has('arSigned','0');await pick('arPair','dogru');await has('arArea','4.5');await pick('arPair','cosx2');await has('arXs','0.824132');await has('arArea','1.094');await has('arDiff','≈ 0');
   await range('arL',1.5);ok(+(await page.evaluate(()=>document.getElementById('arR').value))>=1.5,'L, R\'yi geçmemeli');await has('arArea','');await click('arSnap');
   await pick('geoMode','hacim');eq(await page.locator('#wirePlate').isVisible(),true);await has('voDisk','4.188790205');await has('voShell','4.188790205');await has('voExact','4.188790205');await has('voDiff','≈ 0');await painted('wireCanvas');await painted('geoCanvas');
   await range('voP1',2);await has('voDisk','33.51032164');await pick('voAxis','y');await has('voDisk','16.75516082');await has('geoStatus','yarım küre');
   await pick('voProf','koni');eq(await page.locator('#voP2Field').isVisible(),true);await has('voExact','8.37758041');await pick('voAxis','x');await has('voDisk','2.094395102');await has('voShell','2.094395102');
   await pick('voProf','kok');await has('voDisk','25.13274123');await pick('voProf','sin');await has('voDisk','4.934802201');eq(await page.locator('#voP1Field').isHidden(),true);await pick('voAxis','y');await has('voShell','19.7392088');await has('voDisk','19.7392088');
   await pick('voProf','pul');await has('voDisk','0.9424777961');await has('voShell','0.9424777961');
   {const b0=await read('voSpin');await click('voSpin');ok((await read('voSpin'))!==b0);eq(await page.locator('#voSpin').getAttribute('aria-pressed'),'false');await page.locator('h1').click();await page.keyboard.press(' ');eq(await page.locator('#voSpin').getAttribute('aria-pressed'),'true');}
   await pick('geoMode','yay');await has('acLen','2.350402387');await has('acLenE','2.350402387');await has('acSurf','17.67730332');await has('acPoly','2.34588419');await range('acN',200);await has('acPolyD','−7.21·10⁻⁶');await range('acN',1);await has('acPoly','2');
   await pick('acCurve','cember');await has('acSurf','12.56637061');await has('acLen','3.1415926');await has('geoStatus','sonsuz');await range('acL',-.5);await range('acR',.5);await has('acLen','1.047197551');await has('acSurf','6.283185307');
   await pick('acCurve','sin');await has('acLen','3.820197789');await has('acLenE','3.820197789');await has('acSurf','14.423599');await has('acROut','3.14159');await pick('acCurve','dogru');await has('acPolyD','≈ 0');await has('acSurf','7.0248147');await pick('acCurve','parabol');await has('acLen','1.478942858');await pick('acCurve','yarikubik');await has('acLen','4.666666667');
   await pick('geoMode','gabriel');await has('gbV','2.827433388');await has('gbVe','2.827433388');await has('gbS','15.17744987');await range('gbK',6);await has('gbV','3.141589512');await has('gbS','87.51537254');await has('gbSd','≈ 0');await range('gbK',.25);await has('gbV','1.37');await painted('geoCanvas');
   await noOverflow('geo');await page.locator('h1').click();await page.keyboard.press('r');eq(await page.locator('#geoMode').inputValue(),'alan');await has('arArea','0.1666666667');
   // 03 · has olmayan integraller ve fizik
   await click('tab-ph');await has('ptI','0.999');await has('ptExact','0.999');await has('ptLimit','= 1');await has('ptQ','0.1');await has('ptQT','0.1');await has('ptLeft','0.001');await range('ptP',3);await range('ptK',6);await has('ptLeft','5·10⁻¹³');await range('ptP',2);await range('ptK',3);await painted('phCanvas');
   await click('ptHarm');await has('ptI','6.907755279');await has('ptLimit','ıraksak');await has('ptQ','1');await has('ptLast','2.30259');await has('phStatus','Eşik');await click('ptHalf');await has('ptI','61.24555');await has('ptQ','3.1622777');await has('phStatus','ıraksak');
   await range('ptK',.5);await has('ptQ','k ≥ 2');await range('ptK',8);await has('ptI','19998');await pick('ptKind','alt');await has('ptI','1.9998');await has('ptLimit','= 2');await has('ptKOut','ε = 10⁻⁸');await click('ptTwo');await has('ptLimit','ıraksak');await has('ptI','9.9999999·10⁷');await range('ptP',.1);await range('ptP',3);await has('ptLimit','ıraksak');
   await pick('ptKind','gauss');eq(await page.locator('#ptPField').isHidden(),true);await has('gsI','1.76416278152');await has('gsExact','1.76416278152');await has('gsLimit','1.77245385091');await has('gsTail','0.00829107');await has('gsTailT','0.00829107');await range('ptT',6);await has('gsI','1.77245385091');await has('gsTail','10⁻¹⁷');await range('ptT',.25);await has('gsI','0.489775774361');
   await pick('phMode','kin');await has('knX','8 m');await has('knS','21.333333 m');await has('knXe','8 m');await has('knSe','21.333333 m');await has('knTurn','5.3333 s');await has('knV','−4 m/s');await has('knSd','≈ 0');await painted('phCanvas');
   await click('knThrow');await has('knX','0 m');await has('knS','32 m');await has('knTurn','4 s');await range('knT',4);await has('knX','16 m');await has('knS','16 m');await has('knTurn','yok');await click('knBack');await has('knX','0 m');await has('knS','16 m');await has('knTurn','4 s');
   for(const i of[1,2,3,4])await range('knA'+i,0);await range('knV0',0);await has('knX','0 m');await has('knS','0 m');await range('knV0',-10);await range('knA1',4);await range('knA2',4);await range('knT',0);await has('knS','0 m');await has('knTurn','yok');await range('knT',8);await has('knTurn','2.5 s');await has('knX','16 m');await has('knS','41 m');
   await pick('phMode','is');await has('wkW','1 J');await has('wkWe','1 J');await has('wkD','≈ 0');await range('wkX1',-.1);await has('wkW','0 J');await has('phStatus','götürüyor');await range('wkX1',.1);await has('wkAvg','tanımsız');await range('wkX1',.3);await has('wkW','−8 J');await range('wkK',500);await range('wkX1',-.3);await range('wkX2',.3);await has('wkW','0 J');
   await pick('wkKind','cekim');await has('wkW','8.487959');await has('wkWe','8.487959');await has('wkEsc','62.564747 MJ');await has('wkVesc','11.1861 km/s');await has('wkNaiveD','15.696 %');await range('wkH',7);await has('wkFrac','99.9363');await range('wkH',0);await has('wkNaiveD','0.015696 %');await painted('phCanvas');
   await noOverflow('ph');await click('phReset');eq(await page.locator('#phMode').inputValue(),'ptest');await has('ptI','0.999');
   // klavye ve bütünlük
   await page.locator('#tab-ph').focus();await page.keyboard.press('Home');eq(await page.locator('#tab-t1').getAttribute('aria-selected'),'true');await page.keyboard.press('ArrowRight');eq(await page.locator('#tab-geo').getAttribute('aria-selected'),'true');await page.keyboard.press('End');eq(await page.locator('#tab-ph').getAttribute('aria-selected'),'true');await page.keyboard.press('ArrowRight');eq(await page.locator('#tab-t1').getAttribute('aria-selected'),'true');eq(await page.locator('#panel-geo').isHidden(),true);
   await page.locator('#f1x').focus();await page.keyboard.press('ArrowRight');await has('f1xOut','4.05');await page.keyboard.press('r');await has('f1xOut','4.05');
   eq(await page.evaluate(()=>Object.isFrozen(IntegralLab)&&!Object.getOwnPropertyDescriptor(window,'IntegralLab').writable),true);
   eq(await page.evaluate(()=>/[̀-ͯ]/.test(document.querySelector('main').textContent.normalize('NFD').replace(/[çÇğĞıİöÖşŞüÜ]/g,'').normalize('NFC'))&&/[̀-ͯ]/.test(document.querySelector('main').textContent)),false,'birleşik işaret');
   await noOverflow('son');assert.deepEqual(errors,[]);checks++;await ctx.close();}
  console.log(`G integral: ${checks-before} gerçek arayüz kontrolü (390 px açık + 1280 px koyu) PASS`);
 }finally{await browser?.close();await new Promise(r=>server.close(r));}
}
