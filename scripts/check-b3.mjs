// B3: gerçek HTML çekirdeklerini bağımsız matematiksel referanslarla denetler.
import fs from 'node:fs';
import vm from 'node:vm';
import assert from 'node:assert/strict';
const root = new URL('..', import.meta.url);
let checks=0;
const equal=(a,b,label)=>{assert.deepEqual(a,b,label);checks++;};
const near=(a,b,label,tol=1e-10)=>{assert.ok(Number.isFinite(a)&&Math.abs(a-b)<=tol*Math.max(1,Math.abs(b)),`${label}: ${a} ≠ ${b}`);checks++;};
function kernel(slug,start,end,name){
  const source=fs.readFileSync(new URL(slug+'.html',root),'utf8');
  const a=source.indexOf(start),b=source.indexOf(end,a);
  assert.ok(a>=0&&b>a,slug+': saf çekirdek sınırları');
  const c=vm.createContext({window:{}});vm.runInContext(source.slice(a,b),c);
  assert.ok(c.window[name],name+': API');return c.window[name];
}
const L=kernel('lorenz-cekici2','/* KERNEL-BEGIN','/* KERNEL-END','Lorenz3DLab');
// RK4'ten ayrı yöntem: 60 basamaklı Decimal Taylor çözümü. Katsayılar için
// (n+1)a[n+1]=10(b[n]-a[n]); (n+1)b[n+1]=ρa[n]-b[n]-Σa[k]c[n-k];
// (n+1)c[n+1]=Σa[k]b[n-k]-(8/3)c[n]. 24. mertebe/h=.01 ile
// 32. mertebe/h=.005 sonuçları bu 16 kısa-zaman örneğinde <6.7e-30 ayrıldı.
const references = [{"initial":[1,1,1],"T":0.01,"rho":28,"expected":[1.0125657329784086,1.259920026252339,0.9848910449164658]},{"initial":[1,1,1],"T":0.02,"rho":28,"expected":[1.0488214558212,1.5240008488727028,0.9731143389932783]},{"initial":[1,1,1],"T":0.05,"rho":28,"expected":[1.2875547703617354,2.400160447160348,0.9638061868677973]},{"initial":[1,1,1],"T":0.1,"rho":28,"expected":[2.133107618644515,4.471420177185415,1.1138988857786363]},{"initial":[1,1,1],"T":0.5,"rho":28,"expected":[1.1982729680495448,-8.86719772973715,32.454740211503754]},{"initial":[1,1,1],"T":1.0,"rho":28,"expected":[-9.378570010925062,-8.357033788426644,29.36232533736343]},{"initial":[0,1,0],"T":0.1,"rho":28,"expected":[0.912038722693902,2.0919283957886514,0.062451497455035865]},{"initial":[0,1,0],"T":1.0,"rho":28,"expected":[-9.443146568466759,-9.378901383390055,28.337792282828584]},{"initial":[0,1,0],"T":2.0,"rho":28,"expected":[-7.709081127330481,-8.449518436887024,24.99252248606243]},{"initial":[1,2,3],"T":0.05,"rho":0.5,"expected":[1.3438074093794543,1.7650271702432594,2.7308412839312877]},{"initial":[1,2,3],"T":0.05,"rho":20,"expected":[1.5851864756340666,2.9712805597588283,2.7753341562691167]},{"initial":[1,2,3],"T":0.05,"rho":28,"expected":[1.6894197258440742,3.5122516633300513,2.796575889439699]},{"initial":[1,2,3],"T":0.05,"rho":40,"expected":[1.8516276758387542,4.376279576533007,2.8320609508459533]},{"initial":[-5,5,30],"T":0.1,"rho":40,"expected":[0.07290242602741145,2.375640922373909,22.400898907937705]},{"initial":[0,0,6],"T":1.0,"rho":28,"expected":[0.0,0.0,0.41690070733680923]},{"initial":[0,0,10],"T":1.0,"rho":28,"expected":[0.0,0.0,0.6948345122280154]}];
for(const r of references){
  const P={sigma:10,rho:r.rho,beta:8/3};
  const actual=L.trajectory(r.initial,r.T,.00025,'rk4',P).points.at(-1);
  actual.forEach((v,i)=>near(v,r.expected[i],'Lorenz: bağımsız Taylor referansı',2e-9));
}
for(const initial of [[1,1,1],[0,1,0],[-2,3,10],[0,0,10]]){
  const copy=initial.slice(),a=L.trajectory(initial,.5,.0025),b=L.trajectory([-initial[0],-initial[1],initial[2]],.5,.0025);
  equal(initial,copy,'Çekirdek girdiyi değiştirmez');
  equal(a.points.length,201,'Başlangıç dahil adım sayımı');
  near(a.times.at(-1),.5,'Son zaman');
  for(let i=0;i<a.points.length;i+=10)for(let k=0;k<3;k++)near(b.points[i][k],a.points[i][k]*(k===2?1:-1),'Lorenz yansıma simetrisi');
}
for(const q of [[0,0,0],[Math.sqrt(72),Math.sqrt(72),27],[-Math.sqrt(72),-Math.sqrt(72),27]]){
  L.derivative(q).forEach(v=>near(v,0,'Denge noktasında türev sıfır'));
  L.rk4(q,.01).forEach((v,i)=>near(v,q[i],'Denge noktasında sayısal adım sabit'));
}
const axis=L.trajectory([0,0,10],1,.005).points.at(-1);
near(axis[0],0,'Değişmez eksen x');near(axis[1],0,'Değişmez eksen y');
near(axis[2],10*Math.exp(-8/3),'Değişmez eksenin analitik çözümü',1e-9);
for(const mode of ['classic','axis']){
  const r=L.convergence(1,.005,mode);
  equal(r.rows.every(row=>row.rk4Error<row.eulerError),true,'Kısa referans örneğinde RK4 daha küçük fark');
  equal(r.rows.slice(1).every((row,i)=>row.rk4Error<r.rows[i].rk4Error),true,'Adım yarılamada RK4 farkı azalır');
  equal(r.rows.slice(1).every((row,i)=>row.eulerError<r.rows[i].eulerError),true,'Adım yarılamada Euler farkı azalır');
  equal(r.rk4Ratio>15&&r.rk4Ratio<18,true,'Asimptotik RK4 adım-fark oranı');
}
for(const p of [[1,2,3],[-20,15,40],[0,0,0]])for(const yaw of [-180,-90,0,25,180])for(const pitch of [-90,0,20,90]){
  const out=L.project(p,yaw,pitch);
  near(Math.hypot(...out),Math.hypot(...p),'3B kamera dönüşü uzaklığı korur');
}
const path=L.trajectory([1,1,1],5,.005);
for(const direction of [-1,1])for(const height of [20,27,35,60]){
  const section=L.section(path,height,direction,0);
  equal(section.pairs.length,Math.max(0,section.kept.length-1),'Kesit noktası ve ardışık çift sayısı');
  for(const hit of section.kept){
    near(hit.point[2],height,'Kesit noktası istenen düzlemde');
    equal(direction*L.derivative(hit.point)[2]>0,true,'Kesit seçilen yönde enine geçer');
    equal(hit.alpha>0&&hit.alpha<=1,true,'Geçiş adımın içinde');
    const i=Math.ceil(hit.t/path.h-1e-9),a=path.points[i-1],b=path.points[i];
    const t=(height-a[2])/(b[2]-a[2]);
    near(hit.t,(i-1+t)*path.h,'Geçiş zamanının bağımsız interpolasyonu');
    hit.point.forEach((v,k)=>near(v,a[k]+t*(b[k]-a[k]),'Geçiş konumu'));
  }
  const empty=L.section(path,height,direction,10000);
  equal(empty.kept.length,0,'Bütün geçişler atılabilir');equal(empty.interval,null,'Veri yokken dönüş aralığı tanımsız');
}

const F=kernel('fibo','// PURE KERNEL START','// PURE KERNEL END','FibonacciGeometryLab');
// Hızlı ikiye katlama referansı: üretimdeki sırayla toplama yönteminden ayrı.
function fibonacciPair(n){if(n===0)return[0n,1n];const[a,b]=fibonacciPair(Math.floor(n/2)),c=a*(2n*b-a),d=a*a+b*b;return n%2?[d,c+d]:[c,d];}
for(let n=0;n<=500;n++){
  const e=F.exact(n),[a,b]=fibonacciPair(n);
  equal(e.fn,a,'Fibonacci: bağımsız ikiye katlama referansı');equal(e.next,b,'Sonraki Fibonacci terimi');
  equal(e.sum,a*b,'Karelerin toplamı bağımsız çarpımla aynı');
}
for(let n=1;n<=12;n++){
  const layout=F.layout(n),squares=layout.squares;
  equal(squares.length,n,'n=1 dahil doğru kare sayısı');
  for(let i=0;i<n;i++){
    const q=squares[i];near(q.s,Number(fibonacciPair(i+1)[0]),'Kare kenarı');
    equal(q.x>=layout.xmin&&q.y>=layout.ymin&&q.x+q.s<=layout.xmax&&q.y+q.s<=layout.ymax,true,'Kare dış dikdörtgenin içinde');
    for(let j=0;j<i;j++){
      const p=squares[j],overlap=Math.max(0,Math.min(q.x+q.s,p.x+p.s)-Math.max(q.x,p.x))*Math.max(0,Math.min(q.y+q.s,p.y+p.s)-Math.max(q.y,p.y));
      near(overlap,0,'Karelerin içleri örtüşmez');
    }
    for(const t of [0,.25,.5,.75,1]){
      const p=F.pointOnArc(q,t);
      near(Math.hypot(p[0]-q.center[0],p[1]-q.center[1]),q.s,'Yayın gerçek yarıçapı');
      equal(p[0]>=q.x-1e-10&&p[0]<=q.x+q.s+1e-10&&p[1]>=q.y-1e-10&&p[1]<=q.y+q.s+1e-10,true,'Yay kendi karesinin içinde');
    }
    if(i){
      const p=squares[i-1],end=F.pointOnArc(p,1),start=F.pointOnArc(q,0);
      near(Math.hypot(end[0]-start[0],end[1]-start[1]),0,'Komşu yay uçları birleşir');
      const a=[end[0]-p.center[0],end[1]-p.center[1]],b=[start[0]-q.center[0],start[1]-q.center[1]];
      near((a[0]*b[0]+a[1]*b[1])/(p.s*q.s),1,'Birleşimde teğet yönü korunur');
    }
  }
  for(const scale of [.25,1,2]){
    const g=F.geometry(n,scale),[fn,fn1]=fibonacciPair(n);
    near(g.area,Number(fn*fn1)*scale**2,'Fibonacci karelerinin ölçülen alanı');
    near(g.rectangle,g.area,'Boşluk ve örtüşme olmadan dikdörtgen dolumu');
    near(g.perimeter,2*Number(fn+fn1)*scale,'Dış çevre');
    near(g.arc,Math.PI*scale/2*(Number(fibonacciPair(n+2)[0])-1),'Yay uzunluğu toplamı');
  }
}
for(const i of [1,2,5,11])for(const m of [1,2,8,32,128]){
  const a=F.arcData(i,m),R=Number(fibonacciPair(i)[0]);
  near(a.measured,2*m*R*Math.sin(Math.PI/(4*m)),'Kiriş uzunluğu toplamı');
  equal(a.measured<a.theory,true,'Sonlu kirişler gerçek yaydan kısadır');
  near(a.k1,1/R,'Çember eğriliği');
  if(m<128)equal(F.arcData(i,m+1).error<a.error,true,'Kiriş sayısı arttıkça eksik uzunluk azalır');
}
const M=kernel('mandelbrot+lorenz','/* PURE KERNEL START */','/* PURE KERNEL END */','MapFlowLab');
for(const [c,z0,N,escape] of [[0,[0,0],20,null],[0,[2,0],20,1],[-2,[0,0],20,null],[.26,[0,0],20,null],[.26,[0,0],100,30],[0,[2,1],5,0]]){
  const before=z0.slice(),r=M.mapOrbit(c,z0,N);
  equal(r.escape,escape,'Harita: kritik/deneme/ilk kaçış ayrımı');equal(z0,before,'Harita girdisi değişmez');
  equal(r.points.length,(escape??N)+1,'İlk kaçışta durma');
  for(let n=0;n<r.points.length;n++)equal(Math.hypot(...r.points[n])>2,n===escape,'Kaçış eşitlik değil, sıkı eşitsizlik');
}
const complex=M.mapOrbit(.2,[.5,.25],1).points[1];
near(complex[0],.3875,'Karmaşık kare: eşzamanlı gerçek bileşen');near(complex[1],.25,'Karmaşık kare: sanal bileşen');
for(const c of [-2,-1,-.3,0,.26,.5])for(const z of [[0,0],[.1,.7],[-.5,.25]]){
  const a=M.mapOrbit(c,z,100),b=M.mapOrbit(c,[z[0],-z[1]],100);
  equal(a.escape,b.escape,'Gerçek c için eşlenik kaçış zamanı');
  a.points.forEach((p,n)=>{near(p[0],b.points[n][0],'Eşlenik gerçek bileşen');near(p[1],-b.points[n][1],'Eşlenik sanal bileşen');});
}
for(const r of references){
  const q=r.initial.slice(),a=M.flow(q,r.T,Math.round(r.T/.00025),r.rho);
  equal(q,r.initial,'Akış girdisi değişmez');
  a.last.forEach((v,i)=>near(v,r.expected[i],'Harita-akış: bağımsız Taylor çözümü',2e-9));
}
const local=M.localComparison([1,1,1],.05,28);
[0,26,-5/3].forEach((v,i)=>near(local.derivative[i],v,'Anlık türev'));
[1,2.3,11/12].forEach((v,i)=>near(local.euler[i],v,'Tek Euler tahmini'));
near(local.error,.3081265900450597,'Euler/akış uzaklığı',1e-8);
near(M.localComparison([0,0,0],.1,28).error,0,'Denge için sıfır fark');
for(const r of [0,.5,1,1.1,2])for(let n=0;n<=8;n++)for(const T of [0,.1,1,3]){
  const e=M.exactPair(r,n,6,T);
  near(e.powers.at(-1),r**(2**n),'Tekrarlı karenin kapalı formu');
  near(e.axis.last[2],6*Math.exp(-8*T/3),'Akışın bağımsız üstel çözümü',1e-9);
  near(e.axis.last[0],0,'Özel eksen x');near(e.axis.last[1],0,'Özel eksen y');
}

const P=kernel('fibo+pascal','// PURE KERNEL START','// PURE KERNEL END','FibonacciPascalLab');
// Binom katsayısına üretimdeki çarpım/bölme yerine Pascal toplamasıyla ulaş.
const rows=[[1n]];
for(let n=1;n<=100;n++)rows.push(Array.from({length:n+1},(_,k)=>(rows[n-1][k-1]??0n)+(rows[n-1][k]??0n)));
for(let n=0;n<=100;n++){
  for(let k=0;k<=n;k++)equal(P.choose(n,k),rows[n][k],'Bağımsız Pascal katsayısı');
  const d=P.diagonal(n);
  equal(d.sum,fibonacciPair(n+1)[0],'Sığ köşegen: bağımsız hızlı Fibonacci');
  d.terms.forEach(a=>{equal(a.row+a.k,n,'Doğru sığ köşegen hücresi');equal(a.value,rows[n-a.k][a.k],'Gerçek Pascal hücresinin değeri');});
}
// Şeritte domino başlangıçları: bit maskesinde bitişik 1 yasak.
// Özyinelemeli 1/2-dizisi üreticisinden bağımsız bir örtme gösterimi.
for(let n=0;n<=12;n++){
  const masks=[];
  for(let mask=0;mask<2**Math.max(0,n-1);mask++)if(!(mask&(mask<<1)))masks.push(mask);
  const counts=Array(Math.floor(n/2)+1).fill(0n);
  masks.forEach(mask=>{counts[mask.toString(2).replace(/0/g,'').length]++;});
  const all=P.tilings(n),encoded=[];
  for(const tiles of all){
    let position=0,mask=0;
    for(const tile of tiles){equal(tile===1||tile===2,true,'Kare veya domino taşı');if(tile===2)mask|=1<<position;position+=tile;}
    equal(position,n,'Şerit tam kapanır');encoded.push(mask);
  }
  equal([...encoded].sort((a,b)=>a-b),masks,'Gerçek döşemeler bağımsız örtmelerle aynı');
  equal(new Set(encoded).size,encoded.length,'Aynı döşeme iki kez sayılmaz');
  for(let k=0;k<counts.length;k++){
    const a=P.tilingData(n,k);
    equal(a.count,counts[k],'Sabit domino sayısı bağımsız örtme sayımı');
    equal(a.theory,counts[k],'Binom katsayısı gerçek örtme sayısına eşit');
  }
  for(let t=0;t<=5;t++){
    let sum=0n,moment=0n;
    counts.forEach((count,k)=>{const w=count*BigInt(t)**BigInt(k);sum+=w;moment+=BigInt(k)*w;});
    const a=P.colored(n,t);
    equal(a.sum,sum,'Renkli sayım bağımsız örtmelerden');equal(a.moment,moment,'Renkli domino sayısının toplamı');
    near(a.mean,Number(moment)/Number(sum),'Eş olasılıklı renkli döşemelerin ortalaması');
  }
}
for(let n=0;n<=100;n++)for(let t=0;t<=5;t++){
  const a=P.colored(n,t);
  equal(a.sum,a.recurrence,'Binom açılımı ve ilk taşa göre yineleme aynı');
  equal(a.terms.reduce((s,v)=>s+v.weight,0n),a.sum,'Gösterilen katkılar toplamı');
  if(t===0){equal(a.sum,1n,'Sıfır renk: yalnız kareler');equal(a.moment,0n,'Sıfır renk: hiç domino yok');}
  if(t===1)equal(a.sum,fibonacciPair(n+1)[0],'Tek renk Fibonacci indisi');
}
console.log(JSON.stringify({checks,pages:4,errors:0}));
