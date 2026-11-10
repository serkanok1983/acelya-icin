// B2: canlı HTML içindeki hesapları bağımsız referans ve geometrik değişmezlerle sınar.
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import assert from 'node:assert/strict';
import { fileURLToPath } from 'node:url';
const root = fileURLToPath(new URL('..', import.meta.url));
let checks = 0;
const equal = (a,b,label) => { assert.deepEqual(a,b,label); checks++; };
const near = (a,b,label,tol=1e-10) => { assert.ok(Math.abs(a-b)<=tol*Math.max(1,Math.abs(b)),`${label}: ${a} ≠ ${b}`); checks++; };
function kernel(slug,start,end) {
 const html=fs.readFileSync(path.join(root,slug+'.html'),'utf8'), a=html.indexOf(start), b=html.indexOf(end,a);
 assert.ok(a>=0&&b>a,slug+': hesap çekirdeği bulunamadı');
 const context=vm.createContext({window:{}});
 vm.runInContext(html.slice(a,b),context,{filename:slug+'.html'});
 return context.window;
}
const {ThreeLimitsLab:L}=kernel('sierpinski-fraktali-peano-egrisi-altin-oran','const $=id=>','let active=');
const phi=(1+Math.sqrt(5))/2;
for(let n=0;n<=8;n++) {
 const ts=L.triangles(n), side=2**(-n);
 equal(ts.length,3**n,'Sierpiński: parça sayısı');
 equal(ts.every(t=>t.every(([x,y])=>x>=0&&x<=1&&y>=0&&y<=Math.sqrt(3)/2)),true,'Sierpiński: noktalar başlangıç sınırları içinde');
 const maxEdgeError=Math.max(...ts.flatMap(t=>t.map((p,i)=>Math.abs(Math.hypot(p[0]-t[(i+1)%3][0],p[1]-t[(i+1)%3][1])-side))));
 near(maxEdgeError,0,'Sierpiński: bütün kenarlar aynı küçülme oranını korur');
 for(const a of [1,8,16]) {
  const m=L.triangleMeasurements(n,a);
  near(m.area,Math.sqrt(3)*a*a/4*(3/4)**n,'Köşe alanı geometrik seriyle uyuşur');
  near(m.perimeter,3*a*(3/2)**n,'Bütün kenarların toplamı (dış çevreden ayrı)');
 }
}
equal(JSON.parse(JSON.stringify(L.peano(1))),[[0,0],[0,1],[0,2],[1,2],[1,1],[1,0],[2,0],[2,1],[2,2]],'Peano: ilk 3×3 yönlü sıra');
for(let n=1;n<=4;n++) {
 const ps=L.peano(n),q=3**n;
 equal(ps.length,q*q,'Peano: 9ⁿ hücre');
 equal(new Set(ps.map(p=>p.join(','))).size,q*q,'Peano: her hücreye tam bir ziyaret');
 equal(ps.every(([x,y])=>Number.isInteger(x)&&Number.isInteger(y)&&x>=0&&y>=0&&x<q&&y<q),true,'Peano: hücre indisleri kare içinde');
 equal(ps.slice(1).every((p,i)=>Math.abs(p[0]-ps[i][0])+Math.abs(p[1]-ps[i][1])===1),true,'Peano: bütün ardışık hücreler kenar komşusu');
 near(L.peanoMeasurements(n).length,q-1/q,'Peano: gerçek merkez yolu uzunluğu');
 if(n>1) {
  const coarse=L.peano(n-1);
  equal(ps.every((p,i)=>Math.floor(p[0]/3)===coarse[Math.floor(i/9)][0]&&Math.floor(p[1]/3)===coarse[Math.floor(i/9)][1]),true,'Peano: dokuzlu bloklar önceki düzeyin sırasını korur');
 }
}
const fib=[0,1];for(let n=2;n<=22;n++)fib.push(fib[n-1]+fib[n-2]);
for(let n=0;n<=20;n++) near(L.fibonacciRatio(n).value,fib[n+2]/fib[n+1],'Fibonacci indisleri 0-adımlı oranla uyumlu');
for(let j=0;j<=56;j++) {
 const start=.2+j*.05,values=L.ratios(start);
 for(let n=1;n<=20;n++) {
  const exact=(fib[n+1]*start+fib[n])/(fib[n]*start+fib[n-1]);
  near(values[n],exact,'Altın oran: bağımsız kesirli doğrusal dönüşüm referansı',1e-13);
 }
 for(const tol of [.01,.0001,.000001]) {
  const n=L.targetStep(start,tol);
  equal(n>=0&&n<=20,true,'Hata hedefi ilk 20 adımda ulaşılır');
  equal(Math.abs(values[n]-phi)<=tol,true,'Seçilen adım hedefi sağlar');
  equal(values.slice(0,n).every(v=>Math.abs(v-phi)>tol),true,'Hedef için önceki hiçbir adım yeterli değildir');
 }
}
near(L.ratios(.2)[1],6,'İlk adım hata büyütebilir');
equal([.01,.0001,.000001].map(t=>L.targetStep(1,t)),[5,10,15],'Fibonacci başlangıcının hedef adımları');


const {BarnsleyLab:B}=kernel('barnsley-egreltiotu','const MAPS=','/* Arayüz ve çizim. */');
const images=[[0,.32],[.93,3.26],[-.32,2.27],[.41,1.18]],dets=[0,.7241,.1038,-.1088];
for(let i=0;i<4;i++) {
 const A=B.maps[i],out=B.affine(A,1,2),metric=B.linearMetrics(A);
 near(out[0],images[i][0],'Barnsley: kaynak matrisinin x görüntüsü');
 near(out[1],images[i][1],'Barnsley: kaynak matrisinin y görüntüsü');
 near(metric.det,dets[i],'Barnsley: yönelimli alan çarpanı');
 const square=[[0,0],[1,0],[1,1],[0,1]].map(p=>B.affine(A,...p));
 near(B.polygonArea(square),Math.abs(dets[i]),'Barnsley: köşe alanı determinantın mutlak değeri');
 let measuredMax=0;
 for(let n=0;n<1440;n++) {const a=n*Math.PI/720,x=Math.cos(a),y=Math.sin(a);measuredMax=Math.max(measuredMax,Math.hypot(A.a*x+A.b*y,A.c*x+A.d*y));}
 near(measuredMax,metric.max,'Barnsley: birim çember taraması tekil değeri doğrular',1e-6);
 equal(metric.max<1,true,'Dört özgün dönüşüm Öklid normunda kontraktif');
}
near(B.linearMetrics(B.counter).det,.4,'Karşı örneğin alanı küçülür');
near(B.linearMetrics(B.counter).max,2,'Karşı örnekte uzaklık büyüyebilir');
for(const [weights,x,y] of [[[1,85,7,7],2659956/3338159,20588360/3338159],[[25,25,25,25],273/9770,2821/1954],[[40,40,10,10],1899/44957,138205/89914],[[0,100,0,0],640/241,2400/241]]) {
 const mean=B.meanFor(weights);
 near(mean[0],x,'Barnsley durağan x: bağımsız rasyonel denklem çözümü');
 near(mean[1],y,'Barnsley durağan y: bağımsız rasyonel denklem çözümü');
}
for(const seed of [0,1,2026,4294967295]) {
 const short=B.generate(seed,[1,85,7,7],100),long=B.generate(seed,[1,85,7,7],1000);
 equal(Array.from(long.points.slice(0,200)),Array.from(short.points),'N artınca aynı tohumun nokta öneki korunur');
 equal(Array.from(long.indices.slice(0,100)),Array.from(short.indices),'N artınca kural dizisinin öneki korunur');
 equal(long.counts.reduce((a,b)=>a+b,0),1000,'Atılan 100 adım sayımlara girmez');
 equal(long.trace.at(-1).step,1100,'Tablo başlangıçtan sayar');
 equal(Array.from(long.last),Array.from(long.points.slice(-2)),'Son nokta ve çizim dizisi aynı');
 equal(Array.from(long.points),Array.from(B.generate(seed,[1,85,7,7],1000).points),'Aynı tohum deneyin tamamını yeniden üretir');
}
const stem=B.generate(2026,[1,0,0,0],1000);
equal(Array.from(stem.points).every(x=>x===0),true,'Yalnız sap ve sıfır başlangıcı tek nokta üretir');
const only=B.generate(2026,[0,1,0,0],1000);
equal(Array.from(only.indices).every(i=>i===1),true,'Sıfır ağırlıklı dönüşümler seçilmez');
near(only.last[0],640/241,'Tek etkin dönüşümün sabit noktası x');
near(only.last[1],2400/241,'Tek etkin dönüşümün sabit noktası y');
assert.throws(()=>B.probabilities([0,0,0,0]));checks++;
assert.throws(()=>B.probabilities([1,-1,1,1]));checks++;


const {PenroseLab:P}=kernel('penrose-dosemesi','const PHI=','const state=');
const refs=[[10,0],[10,10],[20,30],[50,80],[130,210],[340,550],[890,1440],[2330,3770]];
for(let n=0;n<=7;n++) {
 const ts=P.subdivide(P.wheel(),n),sum=P.summarize(ts),pairs=P.pairBases(ts);
 equal([sum.a,sum.b],refs[n],'Penrose: doğrudan geometri sayımı');
 near(sum.area,5*Math.sin(Math.PI/5),'Penrose: ongen alanı her bölmede korunur');
 near(sum.minSide,phi**(-n),'Penrose: en kısa eş kenar');
 near(sum.maxSide,phi**(-n),'Penrose: en uzun eş kenar');
 equal(2*pairs.total+pairs.unpaired,ts.length,'Tam dörtgenler ve sınır yarımları bütün üçgenleri sayar');
}
const cross=(a,b,c)=>(b[0]-a[0])*(c[1]-a[1])-(b[1]-a[1])*(c[0]-a[0]);
const inside=(p,t)=>{const signs=t.map((a,i)=>cross(a,t[(i+1)%3],p));return signs.every(v=>v>=-1e-10)||signs.every(v=>v<=1e-10);};
function clippedArea(subject,clip) {
 let polygon=subject,sign=Math.sign(cross(...clip));
 for(let k=0;k<3;k++) {
  const a=clip[k],b=clip[(k+1)%3],out=[];
  for(let i=0;i<polygon.length;i++) {
   const p=polygon[i],q=polygon[(i+1)%polygon.length],dp=sign*cross(a,b,p),dq=sign*cross(a,b,q),pin=dp>=0,qin=dq>=0;
   if(pin)out.push(p);
   if(pin!==qin){const t=dp/(dp-dq);out.push([p[0]+t*(q[0]-p[0]),p[1]+t*(q[1]-p[1])]);}
  }
  polygon=out;
 }
 return Math.abs(polygon.reduce((v,p,i)=>{const q=polygon[(i+1)%polygon.length];return v+p[0]*q[1]-p[1]*q[0];},0))/2;
}
for(const type of [0,1])for(const hand of [0,1])for(const L of [1,2,5]) {
 const parent=P.singleTriangle(type,L,hand),parts=P.splitTriangle(parent);
 equal(parts.length,type===0?2:3,'Robinson: bir adımda doğru parça sayısı');
 equal(parts.every(t=>t.slice(1).every(p=>inside(p,parent.slice(1)))),true,'Robinson: her çocuk ana üçgen içinde');
 for(let i=0;i<parts.length;i++)for(let j=0;j<i;j++) near(clippedArea(parts[i].slice(1),parts[j].slice(1)),0,'Robinson: çocuk içleri örtüşmez');
 for(let n=0;n<=4;n++) {
  const sum=P.summarize(P.subdivide([parent],n));
  near(sum.area,L*L*Math.sin((type===0?36:108)*Math.PI/180)/2,'Robinson: alan korunumu');
  near(sum.minSide,L/phi**n,'Robinson: ölçekleme ve aynalama uzunluğu');
  near(sum.maxSide,L/phi**n,'Robinson: bütün eş kenarlar aynı');
 }
}
for(const theta of [36,72])for(let a=-2;a<=2;a+=.25)for(let b=-2;b<=2;b+=.25) {
 const r=P.lattice(theta,a,b),angle=theta*Math.PI/180;
 near(r.length,Math.sqrt(Math.max(0,a*a+b*b+2*a*b*Math.cos(angle))),'Kafes: kosinüs teoremiyle öteleme uzunluğu');
 equal(r.matches,Number.isInteger(a)&&Number.isInteger(b),'Kafes: yalnız tam sayı baz katsayıları periyot/özdeşlik verir');
 equal(r.identity,a===0&&b===0,'Sıfır öteleme periyottan ayrılır');
}
near(P.lattice(72,1,0).area/P.lattice(36,1,0).area,phi,'İşaretsiz iki karonun alan oranı');
console.log(JSON.stringify({checks,pages:3,errors:0}));
