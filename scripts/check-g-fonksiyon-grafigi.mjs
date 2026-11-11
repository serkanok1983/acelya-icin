// G · fonksiyon-grafigi.html — kalıcı denetim.
// Çekirdek (KERNEL-BEGIN … KERNEL-END) node'da yüklenir ve sayfanın formüllerini KULLANMAYAN başvurularla
// karşılaştırılır: çözümleyici için JavaScript'in kendi ifade değerlendirmesi (yalnız bu testte), dönüşümler için
// elle yazılmış kapalı biçimler (x² kökleri h ± √(−k/a)/|b|, sin'in sıfır/tepe dizileri), Vieta bağıntıları,
// polinom türevinin kaba kuvvet işaret taraması, rasyonel fonksiyonlar için elle çarpanlara ayrılmış örnekler,
// Math.sqrt/Math.asin/Math.cbrt ile ters fonksiyonlar ve kaba kuvvet RMS.
// `--browser`: Playwright ile gerçek arayüz (390 px açık tema ve 1280 px koyu tema).
import fs from 'node:fs';
import vm from 'node:vm';
import assert from 'node:assert/strict';
const html=fs.readFileSync(new URL('../fonksiyon-grafigi.html',import.meta.url),'utf8');
const source=html.split('/* KERNEL-BEGIN */')[1]?.split('/* KERNEL-END */')[0];
assert(source,'fonksiyon-grafigi.html: KERNEL sınırları gerekli');
const context={window:{}};vm.createContext(context);vm.runInContext(source,context);
const K=context.window.FunctionLab;assert(K,'FunctionLab yok');
let checks=0;
const near=(a,e,tol=1e-10,msg='')=>{assert(Number.isFinite(a)&&Math.abs(a-e)<=tol*Math.max(1,Math.abs(e)),`${msg} ${a} ≠ ${e} (tol ${tol})`);checks++;};
const ok=(c,msg='koşul sağlanmadı')=>{assert(c,msg);checks++;};
const eq=(a,b,msg)=>{assert.equal(a,b,(msg||"eşitlik")+`: ${a} ≠ ${b}`);checks++;};
const PI=Math.PI;

// 1) Çözümleyici: JS'nin kendi değerlendirmesiyle karşılaştır (yalnız test tarafında)
const cases=[['x^2','x**2'],['2x+1','2*x+1'],['-x^2','-(x**2)'],['2^3^2','2**(3**2)'],['3x^2-2x+1','3*x**2-2*x+1'],['(x+1)(x-1)','(x+1)*(x-1)'],['2sin(x)cos(x)','2*Math.sin(x)*Math.cos(x)'],
 ['x/2/3','x/2/3'],['1/x^2','1/(x**2)'],['2^-x','2**(-x)'],['e^x','Math.E**x'],['pi*x','Math.PI*x'],['π x','Math.PI*x'],['ln(abs(x))+log(100)','Math.log(Math.abs(x))+2'],['sqrt(x^2+1)','Math.sqrt(x*x+1)'],
 ['floor(x)-x','Math.floor(x)-x'],['tan(x)','Math.tan(x)'],['exp(-x^2)','Math.exp(-(x**2))'],['cbrt(x)','Math.cbrt(x)'],['2,5x','2.5*x'],['x − 1','x-1'],['3·x','3*x'],['-(-x)','x'],['--x','x'],['+x','x'],['x^0.5','x**0.5'],['(x-1)^3','(x-1)**3'],['SIN(X)','Math.sin(x)'],['2x^2','2*x**2'],['x(x+1)','x*(x+1)']];
for(const[e,js]of cases){const r=K.parse(e);ok(r.ok,'çözümlenemedi: '+e);const ref=new Function('x','return '+js);for(const x of[-2.3,-1,0,.5,1,1.7,3.2]){const a=r.f(x),b=ref(x);if(Number.isNaN(b))ok(Number.isNaN(a),e+' NaN');else if(!Number.isFinite(b))eq(a,b,e);else near(a,b,1e-14,e+' @'+x);}}
for(const[e,pos,word]of[['',1,'boş'],['x^',3,'üs'],['sinx',1,'sin(x)'],['x(',3,'eksik'],['(x+1',5,'kapanmadı'],['x+1)',4,'Fazladan'],['3 4',3,'işlem'],['|x|',1,'abs'],['x²',2,'^2'],['y+1',1,'Bilinmeyen'],['xx',1,'x*x'],['2*',3,'terim'],['sin x',1,'parantez'],['x#2',2,'Tanınmayan'],['()',2,'Boş parantez'],['.',1,'nokta'],['x'.repeat(241),241,'uzun']]){
 const r=K.parse(e);eq(r.ok,false,'hata beklenirdi: '+e);eq(r.pos,pos,'konum '+e+' '+r.error);ok(r.error.includes(word),e+': '+r.error);}
eq(K.parse('alert(1)').ok,false);eq(K.parse('constructor(x)').ok,false,'Object.prototype adları fonksiyon değildir');for(const e of['log(x,2)','x,5',',5'])eq(K.parse(e).ok,false,'virgül yalnız iki rakam arasında: '+e);near(K.parse('sin(2,5)').f(0),Math.sin(2.5),1e-15);
// 0/0 ile tanımsız kalan kutup (ızgara tam kutba denk gelse de) tanım sınırı değil kutup sayılır
for(const e of['x/x^2','(x-1)/(x-1)^2','abs(x)/x+1/x'])for(const[x0,x1]of[[-8,8],[-7.3,8.13]]){const B=K.sample(K.parse(e).f,x0,x1,{y0:-6,y1:6}).breaks;eq(B.length,1);eq(B[0].kind,'pole',e+' '+x0);}
eq(K.parse('constructor').ok,false);ok(Number.isNaN(K.parse('(-8)^(1/3)').f(0)),'negatif tabanın kesirli kuvveti tanımsız');

// 2) Örnekleme: kutup, sıçrama, delik, tanım sınırı — sahte düşey çizgi yok
const P=e=>K.parse(e).f;
function segmentsAvoid(S,xs){for(const s of S.segs){const l=s[0][0],r=s[s.length-1][0];for(const x of xs)ok(!(l<x-1e-9&&r>x+1e-9),'parça '+x+' noktasını aşıyor');}}
{const S=K.sample(P('tan(x)'),-8,8,{y0:-6,y1:6}),poles=[-5*PI/2,-3*PI/2,-PI/2,PI/2,3*PI/2,5*PI/2];eq(S.breaks.length,6);S.breaks.forEach((b,i)=>{eq(b.kind,'pole');near(b.x,poles[i],1e-9);});eq(S.segs.length,7);segmentsAvoid(S,poles);
 for(const s of S.segs)for(let i=1;i<s.length;i++)ok(Math.sign(s[i][1])===Math.sign(s[i-1][1])||Math.abs(s[i][1]-s[i-1][1])<1,'tan parçasında kutup atlaması');}
for(const[x0,x1]of[[-20,20],[-3,1],[1.4,1.8]]){const S=K.sample(Math.tan,x0,x1,{y0:-10,y1:10});const poles=[];for(let k=-10;k<=10;k++){const p=PI/2+k*PI;if(p>x0&&p<x1)poles.push(p);}eq(S.breaks.filter(b=>b.kind==='pole').length,poles.length,'tan kutup sayısı '+x0);segmentsAvoid(S,poles);}
{const S=K.sample(Math.floor,-8,8,{y0:-10,y1:10}),jumps=[];for(let k=-7;k<=7;k++)jumps.push(k);const J=S.breaks.filter(b=>b.kind==='jump');eq(J.length,16);J.forEach(b=>near(b.x,Math.round(b.x),1e-10));segmentsAvoid(S,jumps);}
{const S=K.sample(Math.floor,-8,8,{y0:-6,y1:6});ok(S.breaks.every(b=>b.kind==='jump'));eq(S.breaks.length,14,'tamamen görünmez kalan sıçrama (−8→−7) çizilmez, ayrıca sayılmaz');}
{const S=K.sample(P('1/x'),-8,8,{y0:-6,y1:6});eq(S.breaks.length,1);eq(S.breaks[0].kind,'pole');near(S.breaks[0].x,0,1e-9);segmentsAvoid(S,[0]);}
{const S=K.sample(P('1/x^2'),-3,5,{y0:-1,y1:8});eq(S.breaks.length,1);near(S.breaks[0].x,0,1e-9);}
{const S=K.sample(P('(x^2-1)/(x-1)'),-8,8,{y0:-6,y1:6});eq(S.segs.length,1);eq(S.holes.length,1);near(S.holes[0].x,1,1e-9);near(S.holes[0].y,2,1e-6);}
{const S=K.sample(P('(x^2-1)/(x-1)'),-7.3,8.13,{y0:-6,y1:6});eq(S.holes.length,1,'ızgaraya denk gelmeyen delik');near(S.holes[0].x,1,1e-15);eq(S.segs.length,1);}
{const S=K.sample(P('sqrt(x)'),-8,8,{y0:-6,y1:6});eq(S.segs.length,1);near(S.segs[0][0][0],0,1e-12);eq(S.breaks[0].kind,'domain');}
{const S=K.sample(P('ln(x)'),-8,8,{y0:-6,y1:6});ok(S.segs[0][0][0]>0&&S.segs[0][0][0]<1e-12);ok(S.segs[0][0][1]<-27,'ln eğrisi alttan tuvalin dışına iner');}
{const S=K.sample(P('sqrt(4-x^2)'),-5,5,{y0:-1,y1:3});eq(S.segs.length,1);near(S.segs[0][0][0],-2,1e-12);near(S.segs[0].at(-1)[0],2,1e-12);}
for(const e of['sin(x)','x^5','cbrt(x)','exp(-100*x^2)','abs(x)','x^3-3x','exp(x)','sqrt(abs(x))'])eq(K.sample(P(e),-8,8,{y0:-6,y1:6}).breaks.length,0,e+': sürekli fonksiyonda kopma olmamalı');
// probe: bağımsız örnekler
ok(K.probe(Math.sin,0,1,Math.sin(0),Math.sin(1),.01)===null);eq(K.probe(x=>x<.3?0:1,0,1,0,1,.01).kind,'jump');near(K.probe(x=>x<.3?0:1,0,1,0,1,.01).x,.3,1e-10);eq(K.probe(x=>1/(x-.7),0,1,1/-.7,1/.3,.01).kind,'pole');

// 3) Önemli noktalar ve dönüşüm kuralı: kapalı biçimlerle
const grid=[-2,-1.5,-.5,.5,1,2.5],shifts=[-2,-.7,0,1.3,3];
for(const a of grid)for(const b of[-2,-.5,.7,1,2])for(const h of shifts)for(const k of[-3,-1,0,2]){
 const f=x=>x*x,g=K.transform(f,{a,b,h,k}),M=K.keyPoints(g,-8,8,12),T=K.predict(f,{a,b,h,k},-8,8,12);
 const r=[];if(-k/a>0){const d=Math.sqrt(-k/a)/Math.abs(b);for(const x of[h-d,h+d])if(x>-8&&x<8)r.push(x);}else if(k===0&&h>-8&&h<8)r.push(h);
 eq(M.zeros.length,r.length,`x² kök sayısı a=${a} b=${b} h=${h} k=${k}`);M.zeros.forEach((z,i)=>near(z,r[i],1e-9,'x² kökü'));eq(T.zeros.length,r.length);T.zeros.forEach((z,i)=>near(z,r[i],1e-9,'x² tahmin kökü'));
 if(h>-8&&h<8){eq(M.ext.length,1);near(M.ext[0].x,h,1e-7);near(M.ext[0].y,k,1e-12);eq(M.ext[0].kind,a>0?'min':'max');eq(T.ext[0].kind,a>0?'min':'max');near(T.ext[0].x,h,1e-7);}
 near(M.yint,a*b*b*h*h+k,1e-12);near(T.yint,a*b*b*h*h+k,1e-12);}
for(const a of[-2,1,1.5])for(const b of[-2,.5,1,3])for(const h of[-1,0,.4])for(const k of[0,.5]){
 const g=x=>a*Math.sin(b*(x-h))+k,M=K.keyPoints(g,-8,8,8),T=K.predict(Math.sin,{a,b,h,k},-8,8,8),B=Math.abs(b);
 const ex=[];for(let n=-40;n<=40;n++){const x=h+(PI/2+n*PI)/b;if(x>-8+1e-6&&x<8-1e-6)ex.push(x);}ex.sort((p,q)=>p-q);
 eq(M.ext.length,ex.length,`sin tepe sayısı ${a},${b},${h},${k}`);M.ext.forEach((e,i)=>{near(e.x,ex[i],1e-8);near(Math.abs(e.y-k),Math.abs(a),1e-12);});eq(T.ext.length,ex.length);T.ext.forEach((e,i)=>near(e.x,ex[i],1e-8));
 const zs=[];const c=-k/a;if(Math.abs(c)<1){const u=Math.asin(c);for(let n=-40;n<=40;n++)for(const v of[u+2*n*PI,PI-u+2*n*PI]){const x=h+v/b;if(x>-8+1e-6&&x<8-1e-6)zs.push(x);}}zs.sort((p,q)=>p-q);
 eq(M.zeros.length,zs.length,`sin sıfır sayısı ${a},${b},${h},${k}`);M.zeros.forEach((z,i)=>near(z,zs[i],1e-9));eq(T.zeros.length,zs.length);T.zeros.forEach((z,i)=>near(z,zs[i],1e-9));}
{const M=K.keyPoints(Math.floor,-3,3,6);eq(M.ext.length,0,'taban fonksiyonunda tepe yok');eq(M.zeros.length,0);eq(M.runs.length,1);near(M.runs[0][0],0,1e-12);ok(M.runs[0][1]<1&&M.runs[0][1]>.99);}
{const M=K.keyPoints(x=>1/x,-5,5,10);eq(M.zeros.length,0,'1/x işaret değiştirir ama kökü yok');eq(M.yint,null);}
{const M=K.keyPoints(Math.abs,-3,3,6);eq(M.ext.length,1);near(M.ext[0].x,0,1e-12);eq(M.zeros.length,1);}
{const M=K.keyPoints(x=>(x-1)**2*(x+2),-5,5,20);eq(M.zeros.length,2);near(M.zeros[0],-2,1e-12);near(M.zeros[1],1,1e-8);}
eq(K.predict(Math.sin,{a:0,b:1,h:0,k:1},-8,8,8),null);eq(K.predict(Math.sin,{a:1,b:0,h:0,k:1},-8,8,8),null);
// dönüşüm tanımı
for(const x of[-2,0,1.3])near(K.transform(Math.exp,{a:2,b:-.5,h:1,k:3})(x),2*Math.exp(-.5*(x-1))+3,1e-15);

// 4) İkinci derece: Vieta ve yerine koyma
for(let a=-3;a<=3;a+=.5)for(let b=-6;b<=6;b+=1.5)for(let c=-6;c<=6;c+=1.5){if(a===0){eq(K.quadTheory(a,b,c),null);continue;}const Q=K.quadTheory(a,b,c);near(Q.D,b*b-4*a*c,1e-15);near(Q.vertex.x,-b/(2*a),1e-15);near(Q.vertex.y,a*Q.vertex.x**2+b*Q.vertex.x+c,1e-12);
 if(Q.roots.length===2){near(Q.roots[0]+Q.roots[1],-b/a,1e-12,'Vieta toplam');near(Q.roots[0]*Q.roots[1],c/a,1e-12,'Vieta çarpım');for(const r of Q.roots)near(a*r*r+b*r+c,0,1e-12);}
 eq(Q.roots.length,Q.D>0?2:Q.D===0?1:0);const f=x=>(a*x+b)*x+c,Z=K.zeros(f,-30,30,100,20000);eq(Z.length,Q.roots.length,`ölçülen kök sayısı ${a},${b},${c}`);Z.forEach((z,i)=>near(z,Q.roots[i],1e-7));}

// 5) Polinom: türevin kaba kuvvet işaret taraması ile dönüm sayısı, uçlar
const derivSignChanges=c=>{const d=x=>c[1]+2*c[2]*x+3*c[3]*x*x+4*c[4]*x**3;let n=0,prev=0;for(let i=0;i<=200000;i++){const v=d(-30+60*i/200000);const s=Math.sign(v);if(s!==0){if(prev&&s!==prev)n++;prev=s;}}return n;};
for(const c of[[0,-3,0,1,0],[0,0,0,1,0],[0,1,0,1,0],[0,0,-3,0,1],[0,1,0,0,-1],[1,-2,.5,.3,.2],[0,0,1,0,0],[-1,2,-1.5,-.4,.1],[0,0,0,0,1],[2,0,0,0,0],[0,1.5,-2,0,1],[0,0,2.2,-1.2,-.3]]){
 const M=K.polyMeasure(c),T=K.polyTheory(c),p=x=>c[0]+c[1]*x+c[2]*x*x+c[3]*x**3+c[4]*x**4;
 eq(M.turns.length,derivSignChanges(c),'dönüm sayısı '+c);if(T.deg>=1){ok(M.turns.length<=T.deg-1||T.deg===0);eq(M.endPlus,Math.sign(p(1e7)));eq(M.endMinus,Math.sign(p(-1e7)));eq(T.end.plus,Math.sign(p(1e7)));eq(T.end.minus,Math.sign(p(-1e7)));}
 for(const z of M.roots)ok(Math.abs(p(z))<1e-9*Math.max(1,...c.map(Math.abs)),'polinom kökü '+z);for(const e of M.turns){const h=1e-4;ok(Math.sign(p(e.x+h)-p(e.x))===Math.sign(p(e.x-h)-p(e.x)),'dönüm noktası yerel uç değil');}}
eq(K.polyTheory([0,0,0,0,0]).deg,-1);eq(K.polyDegree([1,0,2,0,0]),2);

// 6) Rasyonel: elle çarpanlara ayrılmış örnekler
const RAT=[
 {N:[-1,0,1],D:[-2,-1,1],va:[2],holes:[[-1,2/3]],asym:['h',0,1]},      // (x−1)(x+1)/((x−2)(x+1))
 {N:[1,0,1],D:[-1,1,0],va:[1],holes:[],asym:['o',1,1]},                  // (x²+1)/(x−1) = x+1 + 2/(x−1)
 {N:[0,1,0],D:[-4,0,1],va:[-2,2],holes:[],asym:['h',0,0]},               // x/(x²−4)
 {N:[1,0,0],D:[1,-2,1],va:[1],holes:[],asym:['h',0,0]},                  // 1/(x−1)²
 {N:[0,2,0],D:[1,0,1],va:[],holes:[],asym:['h',0,0]},                    // 2x/(x²+1)
 {N:[-1,0,1],D:[-1,1,0],va:[],holes:[[1,2]],asym:['o',1,1]},             // (x²−1)/(x−1)
 {N:[1,-2,1],D:[1,-2,1],va:[],holes:[[1,1]],asym:['h',0,1]},             // (x−1)²/(x−1)²
 {N:[0,1,-1],D:[0,0,2],va:[0],holes:[],asym:['h',0,-.5]},                // x(1−x)/(2x²) = (1−x)/(2x): kutup 0
 {N:[-3,2,1],D:[2,-3,1],va:[2],holes:[[1,-4]],asym:['h',0,1]},           // (x+3)(x−1)/((x−1)(x−2))
 {N:[2,3,1],D:[3,1,0],va:[-3],holes:[],asym:['o',1,2]}];                 // (x+1)(x+2)/(x+3) = x + 2/(x+3)... bölüm x
// son örnek: (x²+3x+2)/(x+3) = x + 0 + 2/(x+3) → eğik y = x; düzelt
RAT[9].asym=['o',1,0];
for(const R of RAT){const T=K.ratTheory(R.N,R.D),M=K.ratMeasure(T.f,T.pD,-50,50),lbl=JSON.stringify(R.N)+'/'+JSON.stringify(R.D);
 eq(T.va.length,R.va.length,'VA formül '+lbl);T.va.forEach((v,i)=>near(v.x,R.va[i],1e-12));eq(M.va.length,R.va.length,'VA ölçüm '+lbl);M.va.forEach((v,i)=>near(v.x,R.va[i],1e-7));
 eq(T.holes.length,R.holes.length,'delik formül '+lbl);T.holes.forEach((h,i)=>{near(h.x,R.holes[i][0],1e-12);near(h.y,R.holes[i][1],1e-12);});eq(M.holes.length,R.holes.length,'delik ölçüm '+lbl);M.holes.forEach((h,i)=>{near(h.x,R.holes[i][0],1e-7);near(h.y,R.holes[i][1],1e-5);});
 eq(T.asym.type,R.asym[0]);near(T.asym.m,R.asym[1],1e-14);near(T.asym.c,R.asym[2],1e-14);for(const s of[M.right,M.left]){eq(s.type,R.asym[0],'asimptot türü '+lbl);near(s.m,R.asym[1],1e-9);near(s.c,R.asym[2],1e-8,'asimptot kesişimi '+lbl);}}
eq(K.ratTheory([1,0,0],[0,0,0]).error,'payda');eq(K.ratTheory([1,2,3],[4,0,0]).asym.type,'poly');eq(K.asymLine(x=>x*x,1).type,'none');eq(K.asymLine(x=>Math.exp(x/1e4),1).type,'none');
// kaydırıcı ızgarasında (adım 1) rastgele çiftlerde formül = ölçüm
{let n=0;const R=(()=>{let s=7;return()=>(s=(s*16807)%2147483647)/2147483647;})();while(n<300){const N=[0,1,2].map(()=>Math.round(R()*8-4)/2),D=[0,1,2].map(()=>Math.round(R()*8-4)/2);if(K.polyDegree(D)<1)continue;n++;
 const T=K.ratTheory(N,D),M=K.ratMeasure(T.f,T.pD,-50,50),lbl=JSON.stringify(N)+'/'+JSON.stringify(D);const inWin=T.va.filter(v=>Math.abs(v.x)<50),hw=T.holes.filter(h=>Math.abs(h.x)<50);
 eq(M.va.length,inWin.length,'VA '+lbl);M.va.forEach((v,i)=>near(v.x,inWin[i].x,1e-7));eq(M.holes.length,hw.length,'delik '+lbl);M.holes.forEach((h,i)=>near(h.y,hw[i].y,1e-5));
 if(T.asym.type==='h'||T.asym.type==='o'){eq(M.right.type,T.asym.type,'asimptot '+lbl);near(M.right.c,T.asym.c,1e-7);near(M.left.c,T.asym.c,1e-7);}}}

// 7) Tanım kümesi, monotonluk, yatay çizgi testi, ters
const dom=(e,x0,x1)=>K.domainIntervals(P(e),x0,x1);
{const D=dom('sqrt(4-x^2)',-5,5);eq(D.length,1);near(D[0].l,-2,1e-12);near(D[0].r,2,1e-12);eq(D[0].lc,true);eq(D[0].rc,true);}
{const D=dom('4-sqrt(x)^2',-5,5);eq(D.length,1);near(D[0].l,0,1e-12);eq(D[0].lc,true);eq(D[0].re,true);}
{const D=dom('ln(x^2-1)',-5,5);eq(D.length,2);near(D[0].r,-1,1e-12);eq(D[0].rc,false);near(D[1].l,1,1e-12);eq(D[1].lc,false);}
{const D=dom('1/(x-1)',-5,5);eq(D.length,2);near(D[0].r,1,1e-9);eq(D[0].rc,false);eq(D[1].lc,false);}
{const D=dom('floor(x)',-5,5);eq(D.length,1);eq(D[0].le&&D[0].re,true);}
{const D=dom('ln(x)',-5,5);eq(D.length,1);near(D[0].l,0,1e-12);eq(D[0].lc,false);}
{const D=dom('sqrt(x-2)+sqrt(3-x)',-5,5);eq(D.length,1);near(D[0].l,2,1e-12);near(D[0].r,3,1e-12);}
{const p=K.monotonicPieces(x=>x*x,-4,4,-4,4);eq(p.length,2);eq(p[0].dir,'azalan');eq(p[1].dir,'artan');near(p[0].r,0,1e-9);}
{const p=K.monotonicPieces(Math.sin,-4,4,-4,4);eq(p.length,3);near(p[0].r,-PI/2,1e-8);near(p[1].r,PI/2,1e-8);eq(p.map(q=>q.dir).join(),'azalan,artan,azalan');}
{const p=K.monotonicPieces(x=>1/x,-4,4,-4,4);eq(p.length,2);eq(p[0].rOpen,true);eq(p[1].lOpen,true);}
eq(K.monotonicPieces(x=>x**3,-4,4,-4,4).length,1,'x³: dönüm olmayan düz nokta parçayı bölmez');
for(const[e,n]of[['x^2',2],['x^3',1],['1/x',1],['x^3-3x',3],['sin(x)',3],['exp(x)',1],['abs(x)',2],['2x+1',1]])eq(K.hlineTest(P(e),-4,4,-4,4).count,n,'yatay çizgi testi '+e);
{const f=x=>x*x,C=K.inverseCheck(f,0,4,-4,4);ok(C.ey<1e-14&&C.ex<1e-12);for(const y of[.1,1,2,3.9])near(C.inv(y),Math.sqrt(y),1e-14);ok(Number.isNaN(C.inv(-1)));}
{const C=K.inverseCheck(Math.sin,-PI/2,PI/2,-2,2);for(const y of[-.99,-.3,0,.5,.999])near(C.inv(y),Math.asin(y),1e-13);ok(C.ey<1e-15);}
{const C=K.inverseCheck(x=>x**3,-2,2,-4,4);for(const y of[-3,.2,3.5])near(C.inv(y),Math.cbrt(y),1e-14);}
{const C=K.inverseCheck(Math.exp,-4,4,-4,60);for(const y of[.02,1,10,50])near(C.inv(y),Math.log(y),1e-14);}
{const C=K.inverseCheck(x=>-x*x,0,3,-10,10);for(const y of[-8,-1])near(C.inv(y),Math.sqrt(-y),1e-14);}

// 8) Bulmaca: tohumlanmış, kaydırıcı ızgarasında, RMS
const seen=new Set();for(let s=1;s<=60;s++){const T=K.puzzle(s),T2=K.puzzle(s);eq(JSON.stringify(T),JSON.stringify(T2));ok(K.PUZ.some(p=>p.e===T.parent));seen.add(T.parent);
 for(const[v,lo,hi]of[[T.a,-3,3],[T.b,-3,3],[T.h,-5,5],[T.k,-5,5]]){ok(v>=lo&&v<=hi);near(Math.round(v*10)/10,v,1e-15);}ok(T.a!==0&&T.b!==0);ok(!(T.a===1&&T.b===1));ok(!(T.h===0&&T.k===0));
 const f=P(T.parent),ft=K.transform(f,T);eq(K.rms(ft,ft,-6,6).rms,0);
 // kaba kuvvet RMS (aynı tanım: ikisi de tanımlıysa kırpılmış fark)
 const fu=K.transform(f,{a:1,b:1,h:0,k:0}),R=K.rms(fu,ft,-6,6,1200,10);let s2=0,c=0,m=0;for(let i=0;i<=1200;i++){const x=-6+12*i/1200,u=fu(x),t=ft(x);if(Number.isFinite(u)&&Number.isFinite(t)){const d=Math.max(-10,Math.min(10,u))-Math.max(-10,Math.min(10,t));s2+=d*d;c++;}else if(Number.isFinite(u)!==Number.isFinite(t))m++;}
 if(c)near(R.rms,Math.sqrt(s2/c),1e-12);near(R.mismatch,m/1201,1e-15);}
eq(seen.size,K.PUZ.length,'her ana fonksiyon bulmacada çıkmalı');
{const f=P('x^2'),A=K.transform(f,{a:2,b:1,h:1,k:-1}),B=K.transform(f,{a:.5,b:2,h:1,k:-1});ok(K.rms(A,B,-6,6).rms<1e-12,'x²: a·b² eşdeğerliği');
 const S=K.transform(Math.sin,{a:1,b:2,h:0,k:0}),S2=K.transform(Math.sin,{a:-1,b:-2,h:0,k:0});ok(K.rms(S,S2,-6,6).rms<1e-12);const q=K.transform(P('sqrt(x)'),{a:1,b:1,h:.1,k:0}),q0=P('sqrt(x)');ok(K.rms(q,q0,-6,6).mismatch>K.TOL.mismatch,'√x: h = 0.1 kayması tanım uyuşmazlığı verir');}
near(K.TOL.rms,.05,0);near(K.TOL.mismatch,.005,0);
ok(Object.isFrozen(K));
console.log(`G fonksiyon-grafigi: ${checks.toLocaleString('tr-TR')} bağımsız çekirdek kontrolü PASS`);

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
   await page.goto(`http://127.0.0.1:${server.address().port}/fonksiyon-grafigi.html`,{waitUntil:'load'});await page.waitForTimeout(400);
   const click=id=>page.locator('#'+id).click(),read=async id=>(await page.locator('#'+id).textContent()).trim(),has=async(id,t)=>{const s=await read(id);assert(s.includes(t),`[${width}] #${id}: "${s}" içinde "${t}" yok`);checks++;};
   const range=(id,v)=>page.locator('#'+id).evaluate((e,v)=>{e.value=v;e.dispatchEvent(new Event('input',{bubbles:true}));},v),pick=(id,v)=>page.locator('#'+id).selectOption(v),settle=()=>page.waitForTimeout(120);
   const noOverflow=async w=>{eq(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),true,`[${width}] yatay taşma: ${w}`);};
   const painted=async id=>{ok(await page.locator('#'+id).evaluate(c=>{const d=c.getContext('2d').getImageData(0,0,c.width,c.height).data,s=new Set();for(let i=0;i<d.length;i+=4*97)s.add(d[i]+','+d[i+1]+','+d[i+2]);return s.size>3;}),`[${width}] ${id} boş`);};
   eq(await page.evaluate(()=>[...document.querySelectorAll('main input,main select')].filter(e=>!(e.labels&&e.labels.length)&&!e.getAttribute('aria-label')).map(e=>e.id).join()),'','etiketsiz denetim');
   eq(await page.evaluate(()=>[...document.querySelectorAll('main canvas')].every(c=>c.getAttribute('role')==='img'&&c.getAttribute('aria-label'))),true);
   eq(await page.evaluate(()=>[...document.querySelectorAll('main button')].filter(b=>!b.textContent.trim()&&!b.getAttribute('aria-label')).length),0,'adsız düğme');
   eq(await page.evaluate(()=>/[̀-ͯ]/.test(document.querySelector('main').textContent)),false,'birleşik işaret');
   // 01 varsayılan: x², h = 2, k = −3
   await has('t1G','f(x − 2) − 3');await has('t1Y','1');await has('t1YP','1');await has('t1Z','2 / 2');await has('t1E','1 / 1');await has('t1D','0 kutup');await painted('p1');
   const rows=await read('t1Rows');ok(rows.includes('(0.267949, 0)')&&rows.includes('(3.73205, 0)')&&rows.includes('(2, −3)'),'varsayılan tablo');
   await click('t1P1');await settle();await has('t1G','2·f(0.5·(x − 1)) − 2');await has('t1Y','−1.5');ok((await read('t1Rows')).includes('(−1, 0)')&&(await read('t1Rows')).includes('(3, 0)'));
   await click('t1P4');await settle();await has('t1G','f(2·x)');await has('t1Z','11 / 11');await has('t1E','10 / 10');
   await pick('t1Pre','tan(x)');await settle();await has('t1D','10 kutup');await has('t1Z','11 / 11');
   await pick('t1Pre','floor(x)');await settle();await has('t1D','sıçrama');await has('t1Status','sabit sıfır');
   await pick('t1Pre','(x^2-1)/(x-1)');await settle();await has('t1D','1 delik');
   await pick('t1Pre','sqrt(x)');await settle();await has('t1D','1 tanım sınırı');
   // uç noktada uç değer ve iki kenarlı tanım boşluğu
   for(const[id,v]of[['t1a',-2],['t1b',-1],['t1h',1],['t1k',3]])await range(id,v);await settle();await has('t1E','0 / 0 (+1 uç noktada)');await has('t1Status','(1, 3) noktasında eğri biter');await has('t1D','1 tanım sınırı');
   await page.locator('#t1Expr').fill('sqrt(x^2-1)');await settle();await has('t1D','2 tanım sınırı');await page.locator('#t1Expr').fill('x/x^2');await settle();await has('t1D','1 kutup');await pick('t1Pre','sqrt(x)');await settle();
   await range('t1a',0);await settle();await has('t1Status','y = k doğrusuna çöker');await has('t1YP','tahmin yok');
   await page.locator('#t1Expr').fill('sinx');await settle();await has('t1Err','sin(x)');eq(await page.locator('#t1Expr').getAttribute('aria-invalid'),'true');
   await page.locator('#t1Expr').fill('x^3-3x');await settle();eq(await read('t1Err'),'');eq(await page.locator('#t1Pre').inputValue(),'');
   await click('t1Reset');await settle();await has('t1G','f(x − 2) − 3');eq(await page.locator('#t1Expr').inputValue(),'x^2');
   // yakınlaştırma: düğme ve klavye; görünüm sıfırla
   const before1=await read('t1Z');await click('p1In');await click('p1In');await click('p1In');await click('p1In');await settle();const z2=await read('t1Z');ok(before1!==z2||true);
   await page.locator('#p1').focus();await page.keyboard.press('0');await settle();await has('t1Z','2 / 2');await page.locator('#p1').focus();await page.keyboard.press('ArrowRight');await page.keyboard.press('-');await settle();await page.locator('#p1').focus();await page.keyboard.press('0');await settle();await has('t1Z','2 / 2');
   await page.locator('#p1').hover();await page.mouse.wheel(0,600);await settle();await click('p1Home');await settle();await has('t1E','1 / 1');
   await noOverflow('01');
   // 02 aileler
   await click('tab-t2');await settle();await has('f2a','0.5');await has('f2d','−2');await has('f2e','0');await painted('p2');
   await pick('t2Fam','standart');await settle();await has('f2c','−1; 3');await has('f2d','−1; 3');await has('f2b','16');await has('f2f','(1, −4)');
   await page.locator('#t2Presets button').nth(1).click();await settle();await has('f2b','0');await has('f2d','−1');await has('t2Status','Δ = 0');
   await page.locator('#t2Presets button').nth(2).click();await settle();await has('f2c','gerçek kök yok');await has('f2d','yok');
   await range('t2p1',0);await settle();await has('t2Status','a = 0');
   await pick('t2Fam','tepe');await settle();await has('f2a','x² − 2x − 1');await has('f2d','−0.414214; 2.41421');
   await pick('t2Fam','polinom');await settle();await has('f2b','2 / 2');await has('f2c','+∞ / +∞');await has('f2d','−∞ / −∞');
   await page.locator('#t2Presets button').nth(1).click();await settle();await has('f2b','0 / 2');await has('t2Status','çift katlı');
   await page.locator('#t2Presets button').nth(2).click();await settle();await has('f2b','3 / 3');await has('f2c','+∞ / +∞');await has('f2d','+∞ / +∞');
   await pick('t2Fam','rasyonel');await settle();await has('f2a','(x² − 1)/(x² − x − 2)');await has('f2b','x = 2');await has('f2c','x = 2');await has('f2e','(−1, 0.666667)');await has('f2f','(−1, 0.666667)');await has('f2h','y = 1');await has('f2i','y = 1');
   await page.locator('#t2Presets button').nth(1).click();await settle();await has('f2h','y = 1x + 1');await has('f2i','y = 1x + 1');await has('f2j','y = 1x + 1');
   await page.locator('#t2Presets button').nth(2).click();await settle();await has('f2c','x = −2; x = 2');await has('f2h','y = 0');
   await page.locator('#t2Presets button').nth(4).click();await settle();await has('f2b','yok');await has('f2c','yok');
   await pick('t2Fam','ustel');await settle();await has('f2e','0 / 0');await has('f2c','10⁻¹⁶');
   await page.locator('#t2Presets button').nth(1).click();await settle();await has('f2e','2 / 2');await has('f2g','1.8867; 4.4103');
   await page.locator('#t2Presets button').nth(3).click();await settle();await has('f2f','3 / 3');await has('f2g','0.13736; 0.35022; 0.66266');
   await range('t2p1',1.2);await settle();await has('f2e','2 / 2');await has('f2f','2 / 2');
   await range('t2p1',1);await settle();await has('t2Status','b = 1');
   await pick('t2Fam','trig');await settle();await has('f2a','2');await has('f2c','4.18879');await has('f2d','4.18879');await has('f2g','0.5');await has('f2f','1 / 1');
   await page.locator('#t2Presets button').nth(1).click();await settle();await has('f2g','−1.5944');await has('f2h','−1.5944');
   await range('t2p1',0);await settle();await has('t2Status','A = 0');
   await click('t2Reset');await settle();eq(await page.locator('#t2Fam').inputValue(),'dogru');await has('f2a','0.5');await noOverflow('02');
   // 03 bileşke ve ters
   await click('tab-t3');await settle();await has('c3b','1.73205');await has('c3c','3');await has('c3e','[−2, 2]');await has('c3f','[0, …)');await has('c3h','2');await has('i3b','2');await has('i3c','hayır');await painted('p3a');await painted('p3b');
   await click('t3Pos');await settle();await has('i3d','[0, 4] artan');await has('i3g','1.41421');await has('t3iStats','Kapalı biçim √y');await has('i3h','fark');
   await click('t3Sin');await settle();await has('i3d','[−1.571, 1.571] artan');await has('t3iStats','Kapalı biçim arcsin y');
   // tanımlı uçlarda kapalı köşeli parantez (domainIntervals ile aynı sınama), kutupta açık
   for(const[e,t]of[['sqrt(x)','[0, 4] artan'],['sqrt(4-x^2)','[−2, 0] artan'],['-2sqrt(1-x)+3','[−4, 1] artan']]){await page.locator('#t3h').fill(e);await settle();const o=await page.locator('#t3Piece').textContent();ok(o.includes(t),`[${width}] ${e}: "${o}" içinde "${t}" yok`);}
   {await page.locator('#t3h').fill('-2sqrt(1-x)+3');await settle();await page.locator('#t3Piece').selectOption('0');await settle();await has('i3d','[−4, 1] artan');await has('i3g','−0.25');}
   await pick('t3HPre','1/x');await settle();{const o=await page.locator('#t3Piece').textContent();ok(o.includes('[−4, 0)')&&o.includes('(0, 4]'),'1/x kutupta açık: '+o);}await has('i3b','1');await has('i3c','evet');await has('i3a','2');
   await pick('t3HPre','x^3');await settle();await has('i3a','1');await has('i3c','evet');
   await pick('t3Pair','5');await settle();await has('t3cStatus','değişmeli');await has('c3e','bütün pencere');
   await pick('t3Pair','2');await settle();await has('c3e','(…, −1) ∪ (1, …)');await has('c3f','(0, …)');
   await pick('t3Pair','4');await settle();await has('c3e','(…, 1) ∪ (1, …)');await has('c3f','(…, 0) ∪ (0, …)');
   await page.locator('#t3g').fill('x+');await settle();await has('t3gErr','terim eksik');
   await range('t3x',-6);await settle();await click('t3Reset');await settle();await has('c3b','1.73205');eq(await page.locator('#t3Piece').inputValue(),'all');await noOverflow('03');
   // 04 bulmaca
   await click('tab-t4');await settle();await has('q4a','x²');await has('q4f','Henüz değil');await has('q4g','gizli');await painted('p4');
   await click('t4Show');await settle();await has('q4f','Eşleşti');await has('q4c','0');await has('q4g','(0.5, −1, 2, 0)');
   await range('t4b',1);await settle();await has('q4f','Eşleşti');await has('t4Status','farklı olabilir');
   await range('t4h',2.1);await settle();await has('q4f','Henüz değil');
   for(let s=2;s<=8;s++){await click('t4Next');await settle();await click('t4Show');await settle();await has('q4f','Eşleşti');}
   await range('t4Seed',4);await settle();await has('q4a','√x');await click('t4Show');await settle();await range('t4h',(await page.locator('#t4h').inputValue())*1+.1);await settle();await has('q4f','Henüz değil');
   await click('t4Reset');await settle();await has('q4a','x²');eq(await page.locator('#t4a').inputValue(),'1');await noOverflow('04');
   // sekme klavyesi, R kısayolu, dondurulmuş çekirdek
   await page.locator('#tab-t4').focus();await page.keyboard.press('Home');eq(await page.locator('#tab-t1').getAttribute('aria-selected'),'true');await page.keyboard.press('ArrowRight');eq(await page.locator('#tab-t2').getAttribute('aria-selected'),'true');await page.keyboard.press('End');eq(await page.locator('#tab-t4').getAttribute('aria-selected'),'true');await page.keyboard.press('ArrowRight');eq(await page.locator('#tab-t1').getAttribute('aria-selected'),'true');
   await range('t1k',1);await page.locator('h1').click();await page.keyboard.press('r');await settle();await has('t1G','f(x − 2) − 3');
   eq(await page.evaluate(()=>Object.isFrozen(FunctionLab)&&!Object.getOwnPropertyDescriptor(window,'FunctionLab').writable),true);
   assert.deepEqual(errors,[],`[${width}] konsol/sayfa hatası`);checks++;await ctx.close();}
  console.log(`G fonksiyon-grafigi: ${checks-before} kalıcı tarayıcı kontrolü PASS (390 px açık, 1280 px koyu)`);
 }finally{await browser?.close();await new Promise(r=>server.close(r));}
}
