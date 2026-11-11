// Matris dönüşümleri laboratuvarı: çekirdeğin bağımsız denetimi (+ --browser ile arayüz denetimi).
// Başvurular sayfanın formüllerini tekrar etmez: açı-uzunluk alanı, kaba kuvvet taraması, kofaktör tersi,
// karmaşık aritmetikle karakteristik determinant, nokta nokta bileşke, matris kuvveti (kare alma), yoğun örnekleme.
// Kullanım: node scripts/check-g-matris-donusumleri.mjs [--browser]
import fs from 'node:fs';
import vm from 'node:vm';
import assert from 'node:assert/strict';
const SLUG='matris-donusumleri';
const html=fs.readFileSync(new URL(`../${SLUG}.html`,import.meta.url),'utf8');
const source=html.split('/* KERNEL-BEGIN */')[1]?.split('/* KERNEL-END */')[0];
assert(source,'KERNEL sınırları gerekli');
const context={window:{}};vm.createContext(context);vm.runInContext(source,context);
const K=context.window.MatrixLab;assert(K&&Object.isFrozen(K)&&Object.isFrozen(K.SHAPES.house.outline),'MatrixLab dondurulmuş olmalı');
let checks=0;
const near=(a,b,tol=1e-9,msg='')=>{assert(Number.isFinite(a)&&Math.abs(a-b)<=tol*Math.max(1,Math.abs(b)),`${msg} ${a} ≠ ${b} (tol ${tol})`);checks++;};
const ok=(c,msg)=>{assert(c,msg);checks++;};
const eq=(a,b,msg='')=>{assert.equal(a,b,msg+` (${a} ≠ ${b})`);checks++;};
let seed=12345;const rnd=()=>{seed=(seed*1103515245+12345)%2147483648;return seed/2147483648;};const r5=()=>Math.round((rnd()*6-3)*20)/20;
const D2R=Math.PI/180;
// bağımsız yardımcılar
const mm=(A,B)=>A.map((_,i)=>B[0].map((_,j)=>A[i].reduce((s,_,k)=>s+A[i][k]*B[k][j],0)));
const mv=(A,v)=>A.map(r=>r.reduce((s,x,j)=>s+x*v[j],0));
const maxDiff=(A,B)=>Math.max(...A.flat().map((x,i)=>Math.abs(x-B.flat()[i])));
const I2=[[1,0],[0,1]],I3=[[1,0,0],[0,1,0],[0,0,1]];
function parallelogramArea(u,v){const a=Math.atan2(v[1],v[0])-Math.atan2(u[1],u[0]);return Math.hypot(...u)*Math.hypot(...v)*Math.sin(a);}

/* ── 1. Alan, yönelim, rank ── */
for(let n=0;n<400;n++){const A=[[r5(),r5()],[r5(),r5()]],an=K.analyse(A),u=[A[0][0],A[1][0]],v=[A[0][1],A[1][1]],ref=parallelogramArea(u,v);
 near(an.area,ref,1e-9,'işaretli alan');near(an.det,ref,1e-9,'det');
 if(Math.abs(ref)>1e-6)eq(an.orientation,ref>0?'korunur':'ters','yönelim');}
for(const A of[[[1,2],[0.5,1]],[[1,0],[0,0]],[[2,-4],[-1,2]]]){const an=K.analyse(A);eq(an.rank,1,'çökme');eq(an.orientation,'coker');}
eq(K.analyse([[0,0],[0,0]]).rank,0);eq(K.analyse([[1e-6,2e-6],[3e-6,1e-6]]).rank,2,'küçük ölçekli ama tekil olmayan matris göreli eşikle rank 2');
// ev: çatı yukarıda, saat yönü tersine, sol-sağ simetrik değil
{const H=K.SHAPES.house.outline,apex=H.reduce((a,b)=>b[1]>a[1]?b:a);ok(apex[1]>1&&apex[0]>0.2&&apex[0]<0.9,'çatı yukarıda');ok(K.shoelace(H)>0,'ev saat yönü tersine');const mir=H.map(([x,y])=>[1-x,y]);ok(H.some(p=>!mir.some(q=>Math.hypot(p[0]-q[0],p[1]-q[1])<1e-9)),'ev aynaya göre simetrik değil');ok(K.shoelace(K.SHAPES.F.outline)>0,'F saat yönü tersine');
 for(let n=0;n<50;n++){const A=[[r5(),r5()],[r5(),r5()]];near(K.shoelace(K.mapPoly(A,H)),K.det2(A)*K.shoelace(H),1e-9,'alan çarpanı');}}
// özdeşlikten A'ya yolda det'in sıfırları: kaba kuvvet taraması
for(let n=0;n<300;n++){const A=[[r5(),r5()],[r5(),r5()]],dp=K.detPath(A),N=20000,roots=[];let prev=1;for(let i=1;i<=N;i++){const t=i/N,M=K.lerpI(A,t),d=M[0][0]*M[1][1]-M[0][1]*M[1][0];if(i<N&&(d===0||Math.sign(d)!==Math.sign(prev)))roots.push(t-0.5/N);prev=d;}
 if(roots.every(r=>r>2e-3&&r<1-2e-3)&&!(roots.length===0&&dp.roots.length===2&&Math.abs(dp.roots[0]-dp.roots[1])<2e-3)){eq(dp.roots.length,roots.length,'det yolu kök sayısı '+JSON.stringify(A));dp.roots.forEach((r,i)=>near(r,roots[i],1e-4,'det yolu kökü'));}}
eq(K.detPath([[-1,0],[0,-1]]).roots[0],0.5,'180° dönmenin doğrusal yolu t = 0.5te sıfır matristen geçer');

/* ── 2. Ters, Gauss–Jordan, Cramer ── */
const cof3=M=>{const c=(i,j)=>{const r=[0,1,2].filter(x=>x!==i),s=[0,1,2].filter(x=>x!==j);return((i+j)%2?-1:1)*(M[r[0]][s[0]]*M[r[1]][s[1]]-M[r[0]][s[1]]*M[r[1]][s[0]]);};const d=M[0].reduce((t,x,j)=>t+x*c(0,j),0);return{d,inv:[0,1,2].map(i=>[0,1,2].map(j=>c(j,i)/d))};};
for(let n=0;n<300;n++){const A=[[r5(),r5()],[r5(),r5()]],d=A[0][0]*A[1][1]-A[0][1]*A[1][0],inv=K.inv2(A),G=K.gaussJordan(A);
 if(Math.abs(d)>1e-6){ok(inv&&G.inverse,'ters var');ok(maxDiff(mm(A,inv),I2)<1e-12*Math.max(1,1/Math.abs(d)),'A·A⁻¹ = I');ok(maxDiff(mm(G.inverse,A),I2)<1e-12*Math.max(1,1/Math.abs(d))*10,'GJ');ok(maxDiff(G.inverse,inv)<1e-11*Math.max(1,1/d**2),'GJ = formül');
  const last=G.steps[G.steps.length-1].M;ok(maxDiff(last.map(r=>r.slice(0,2)),I2)<1e-12,'GJ sonunda sol yarı I');
  const b=[r5(),r5()],c=K.cramer(A,b),g=K.intersectRows(A,b),x=mv(inv,b);near(c.x[0],x[0],1e-9);near(c.x[1],x[1],1e-9);ok(!g.parallel&&Math.hypot(g.x[0]-x[0],g.x[1]-x[1])<1e-9*Math.max(1,Math.hypot(...x)),'doğru kesişimi');}
 else if(d===0){eq(inv,null,'tekil: ters yok');eq(G.inverse,null);}}
for(let n=0;n<200;n++){const M=[0,1,2].map(()=>[0,1,2].map(()=>r5()));const{d,inv}=cof3(M),G=K.gaussJordan(M);if(Math.abs(d)>1e-3){ok(maxDiff(G.inverse,inv)<1e-9*Math.max(1,1/Math.abs(d)),'3×3 GJ = kofaktör tersi');}}
{const G=K.gaussJordan([[1,2],[0.5,1]]);eq(G.inverse,null);eq(G.rank,1);eq(G.failCol,1);ok(G.steps.some(s=>s.kind==='fail'),'tekillik adımı kaydedilir');}
{const G=K.gaussJordan([[0,1],[2,0]]);ok(G.steps.some(s=>s.kind==='swap'),'sıfır pivotta satır değişimi');near(G.inverse[0][1],0.5);}
{const c=K.cramer([[1,2],[2,4]],[1,2]);ok(c.singular&&c.consistent,'çakışık doğrular');const d=K.cramer([[1,2],[2,4]],[1,3]);ok(d.singular&&!d.consistent,'paralel doğrular');const g=K.intersectRows([[1,2],[2,4]],[1,2]);ok(g.parallel&&g.same);ok(!K.intersectRows([[1,2],[2,4]],[1,3]).same);}
{const c=K.cramer([[1,-1],[1,1]],[1,3]);near(c.x[0],2);near(c.x[1],1);near(c.D,2);near(c.Dx,4);near(c.Dy,2);}
// bileşke: AB ≠ BA, det çarpımsal
for(let n=0;n<100;n++){const A=[[r5(),r5()],[r5(),r5()]],B=[[r5(),r5()],[r5(),r5()]],AB=K.mul(A,B);ok(maxDiff(AB,mm(A,B))<1e-12,'çarpım');near(K.det2(AB),K.det2(A)*K.det2(B),1e-9,'det çarpımsal');const p=[r5(),r5()];ok(Math.hypot(...mv(AB,p).map((x,i)=>x-mv(A,mv(B,p))[i]))<1e-9,'ABx = A(Bx)');}
ok(maxDiff(K.mul([[1,-1],[1,1]],[[1,1],[0,1]]),[[1,0],[1,2]])===0&&maxDiff(K.mul([[1,1],[0,1]],[[1,-1],[1,1]]),[[2,0],[1,1]])===0,'varsayılan AB ve BA');

/* ── 3. Özdeğerler, tarama, kuvvet yinelemesi ── */
const cdet=(A,re,im)=>{const a=[A[0][0]-re,-im],d=[A[1][1]-re,-im],ad=[a[0]*d[0]-a[1]*d[1],a[0]*d[1]+a[1]*d[0]];return Math.hypot(ad[0]-A[0][1]*A[1][0],ad[1]);};
let realCases=0,complexCases=0;
for(let n=0;n<600;n++){const A=[[r5(),r5()],[r5(),r5()]],e=K.eig2(A),s=Math.max(...A.flat().map(Math.abs))||1;
 if(e.type==='complex'){complexCases++;ok(cdet(A,e.re,e.im)<1e-9*s*s,'karmaşık kök det(A−λI)=0');const sw=K.sweep(A,1);eq(sw.dirs.length,0,'karmaşıkta gerçel doğrultu yok');
  // kaba kuvvet: 0.01° adımlı taramada v × Av hiç işaret değiştirmez
  let sg=0,flip=false;for(let i=0;i<18000;i++){const t=i*0.01*D2R,v=[Math.cos(t),Math.sin(t)],w=mv(A,v),c=v[0]*w[1]-v[1]*w[0];if(sg&&Math.sign(c)!==sg)flip=true;sg=Math.sign(c)||sg;}ok(!flip,'karmaşıkta işaret değişmez');continue;}
 if(e.type!=='real')continue;realCases++;
 e.values.forEach((l,i)=>{ok(cdet(A,l,0)<1e-9*s*s,'gerçel kök');const v=e.vectors[i],w=mv(A,v);ok(Math.hypot(w[0]-l*v[0],w[1]-l*v[1])<1e-7*s,'Av = λv');});
 ok(Math.abs(e.values[0])>=Math.abs(e.values[1]),'|λ₁| ≥ |λ₂|');
 if(e.disc>1e-3*s*s){const sw=K.sweep(A,1);eq(sw.dirs.length,2,'iki doğrultu '+JSON.stringify(A));for(const v of e.vectors){const th=K.dirAngle(v),m=sw.dirs.map(d=>({d,x:Math.abs(((d.th-th)%180+270)%180-90)})).sort((a,b)=>a.x-b.x)[0];ok(m.x<0.2,'tarama doğrultusu '+m.x);const lam=e.values[e.vectors.indexOf(v)];ok(Math.abs(m.d.lambda-lam)<2e-3*s,'tarama λ');}}}
ok(realCases>200&&complexCases>50,'yeterli örnek '+realCases+'/'+complexCases);
// sayfadaki hazır durumlar
{const s=K.sweep([[2,1],[1,2]],1);eq(s.dirs.length,2);near(s.dirs[0].th,45,1e-9);near(s.dirs[1].th,135,1e-9);near(s.dirs[0].lambda,3,1e-9);near(s.dirs[1].lambda,1,1e-9);}
{const s=K.sweep([[1,2],[1,0]],1),th=Math.atan2(1,2)/D2R;eq(s.dirs.length,2);ok(Math.abs(s.dirs[0].th-th)<0.01&&Math.abs(s.dirs[0].th-th)>1e-5,'ölçülen doğrultu kuramdan küçük ama sıfır olmayan farkla');ok(Math.abs(s.dirs[0].lambda-2)<1e-3);near(s.dirs[1].lambda,-1,1e-9,'negatif λ zıt yön');}
{const e=K.eig2([[1,1],[0,1]]);eq(e.type,'defective');const s=K.sweep([[1,1],[0,1]],1);eq(s.dirs.length,1);eq(s.dirs[0].kind,'teget');near(s.dirs[0].th,0,1e-9);}
{const A=[[1,1],[0,1]],R=[[Math.cos(0.3),-Math.sin(0.3)],[Math.sin(0.3),Math.cos(0.3)]],Ri=[[Math.cos(0.3),Math.sin(0.3)],[-Math.sin(0.3),Math.cos(0.3)]],B=mm(mm(R,A),Ri),s=K.sweep(B,1);eq(K.eig2(B).type,'defective');eq(s.dirs.length,1,'ızgara dışı teğet kök');eq(s.dirs[0].kind,'teget');ok(Math.abs(s.dirs[0].th-0.3/D2R)<0.05,'teğet kök parabolle '+s.dirs[0].th);}
{const s=K.sweep([[1.5,0],[0,1.5]],1);eq(s.all,true);eq(K.eig2([[1.5,0],[0,1.5]]).type,'scalar');}
{const e=K.eig2([[1,-1],[1,1]]);eq(e.type,'complex');near(e.re,1);near(e.im,1);near(e.arg,45);const s=K.sweep([[1,-1],[1,1]],1);ok(s.pts.every(p=>Math.abs(p.alpha-45)<1e-9),'dönme-ölçeklemede α sabit = arg λ');}
{const s=K.sweep([[1,2],[2,4]],1);eq(s.dirs.length,2);ok(s.dirs.some(d=>Math.abs(d.lambda)<1e-3),'tekil: λ = 0 doğrultusu');}
// kuvvet yinelemesi
for(let n=0;n<300;n++){const A=[[r5(),r5()],[r5(),r5()]],e=K.eig2(A);if(e.type!=='real')continue;const q=Math.abs(e.values[1]/e.values[0]);if(q>0.9||q<0.05)continue;const p=K.power(A,rnd()*180);if(p.collapsed)continue;ok(p.converged,'yakınsar');near(p.lambda,e.values[0],1e-6,'baskın λ');const v=e.vectors[0];ok(Math.abs(p.vector[0]*v[1]-p.vector[1]*v[0])<1e-8,'baskın doğrultu');if(p.rate!==null&&p.d.length>8)ok(Math.abs(p.rate-q)<0.03*q+1e-3,'oran |λ₂/λ₁| '+p.rate+' / '+q);}
{const p=K.power([[2,1],[1,2]],100);ok(p.converged);eq(p.iterations,22);near(p.rate,1/3,1e-5);near(p.lambda,3,1e-12);}
{const p=K.power([[1,-1],[1,1]],100);eq(p.converged,false);eq(p.iterations,300);}
{const p=K.power([[0,1],[1,0]],100);eq(p.converged,false);}
{const p=K.power([[1,1],[0,1]],100);eq(p.converged,false);ok(p.rate>0.98,'çift kökte oran 1e yakın');}
{const p=K.power([[1,2],[2,4]],Math.atan2(-1,2)/D2R+180);ok(p.collapsed||p.iterations<=3,'çekirdekte başlangıç');}
// köşegenleştirme
for(let n=0;n<200;n++){const A=[[r5(),r5()],[r5(),r5()]],D=K.diagonalize(A);if(!D.ok)continue;ok(maxDiff(mm(mm(D.P,D.D),D.Pinv),A)<1e-8,'PDP⁻¹ = A');near(D.residual,maxDiff(mm(mm(D.P,D.D),D.Pinv),A),1e-6);}
eq(K.diagonalize([[1,1],[0,1]]).ok,false);eq(K.diagonalize([[1,-1],[1,1]]).reason,'complex');

/* ── 4. Uygulamalar ── */
// grafik hattı: noktaya doğrudan uygulanan işlemlerle karşılaştır
const ops={S:(p,o)=>[o.px+o.sx*(p[0]-o.px),o.py+o.sy*(p[1]-o.py)],R:(p,o)=>{const c=Math.cos(o.deg*D2R),s=Math.sin(o.deg*D2R),x=p[0]-o.px,y=p[1]-o.py;return[o.px+c*x-s*y,o.py+s*x+c*y];},T:(p,o)=>[p[0]+o.tx,p[1]+o.ty]};
for(let n=0;n<60;n++){const o={tx:r5(),ty:r5(),deg:Math.round(rnd()*72-36)*5,sx:r5(),sy:r5(),px:r5(),py:r5()};for(const ord of['SRT','STR','RST','RTS','TSR','TRS']){const M=K.pipeline(ord,o).M;for(const p0 of K.SHAPES.house.outline){let p=[...p0];for(const ch of ord)p=ops[ch](p,o);const q=K.applyH(M,p0);ok(Math.hypot(q[0]-p[0],q[1]-p[1])<1e-9,'homojen = noktasal '+ord);}ok(Math.abs(M[2][0])+Math.abs(M[2][1])===0&&M[2][2]===1,'afin son satır');}}
{const o={tx:1.5,ty:0.5,deg:45,sx:2,sy:1,px:0.5,py:0.5},a=K.pipeline('SRT',o),b=K.pipeline('TRS',o);ok(maxDiff(a.M,b.M)>1,'sıra önemli');const q=K.applyH(a.M,[0.5,0.5]);near(q[0],2);near(q[1],1);
 const c=K.pipeline('SRT',{...o,sx:1.5,sy:1.5}),RS=K.mul(c.ops.R,c.ops.S),SR=K.mul(c.ops.S,c.ops.R);ok(maxDiff(RS,SR)<1e-12,'eşit ölçekte R ve S değişmeli');}
assert.throws(()=>K.pipeline('SSR',{tx:0,ty:0,deg:0,sx:1,sy:1,px:0,py:0}));checks++;
// Markov: P^1024 (kare alma) satırları durağan dağılım
const matpow=(P,e)=>{let R=P;for(let i=0;i<e;i++)R=mm(R,R);return R;};
const chains={hava:[[0.7,0.2,0.1],[0.3,0.4,0.3],[0.2,0.3,0.5]],iki:[[0.9,0.1],[0.5,0.5]]};
for(let n=0;n<40;n++){const k=2+Math.floor(rnd()*2),P=Array.from({length:k},()=>{const r=Array.from({length:k},()=>0.05+rnd());const s=r.reduce((a,b)=>a+b);return r.map(x=>x/s);});chains['r'+n]=P;}
for(const[name,P]of Object.entries(chains)){const n=P.length,L=matpow(P,10),S=K.stationary(P),R=K.markov(P,Array.from({length:n},(_,i)=>i?0:1));ok(S.unique,'tek durağan '+name);for(let i=0;i<n;i++)near(S.pi[i],L[0][i],1e-9,'π = P^1024 satırı '+name);ok(R.converged,'yineleme yakınsar');for(let i=0;i<n;i++)near(R.pi[i],L[1%n][i],1e-10,'yineleme π');
 const E=K.markovEig(P);for(const o of E.others){if(o.im===0){const M=P.map((r,i)=>r.map((x,j)=>x-(i===j?o.re:0)));near(n===2?M[0][0]*M[1][1]-M[0][1]*M[1][0]:K.det3(M),0,1e-9,'diğer özdeğer kök');}else{ok(n===3,'karmaşık yalnız 3×3');}}
 if(R.rate!==null&&E.others.every(o=>o.im===0)&&E.second>0.05&&R.delta.length>15)ok(Math.abs(R.rate-E.second)<0.02,'oran |λ₂| '+name+' '+R.rate+' / '+E.second);}
{const P=chains.hava,S=K.stationary(P);near(S.pi[0],21/46,1e-12);near(S.pi[1],13/46,1e-12);near(S.pi[2],12/46,1e-12);near(K.markovEig(P).second,(1.6-1+Math.sqrt(0.36-4*K.det3(P)))/2,1e-12);}
{const S=K.stationary([[0.9,0.1],[0.5,0.5]]);near(S.pi[0],5/6,1e-12);near(K.markovEig([[0.9,0.1],[0.5,0.5]]).second,0.4,1e-12);}
{const R=K.markov([[0,1],[1,0]],[1,0]);eq(R.converged,false);near(K.stationary([[0,1],[1,0]]).pi[0],0.5);near(K.markovEig([[0,1],[1,0]]).second,1);}
{const P=[[0.5,0.25,0.25],[0,1,0],[0,0,1]];eq(K.stationary(P).unique,false);const R=K.markov(P,[1,0,0]);ok(R.converged);near(R.pi[1],0.5,1e-9);near(K.markovEig(P).second,1);}
for(const bad of[[[0.5,0.6],[0.5,0.5]],[[1.2,-0.2],[0,1]],[[1]]]){assert.throws(()=>K.markov(bad,[1,0]));checks++;}
// tekil değerler: yoğun kaba kuvvet örneklemesi
for(let n=0;n<200;n++){const A=[[r5(),r5()],[r5(),r5()]],S=K.svd2(A);let mx=0,mn=Infinity;for(let i=0;i<20000;i++){const t=i*Math.PI/10000,w=mv(A,[Math.cos(t),Math.sin(t)]),r=Math.hypot(...w);mx=Math.max(mx,r);mn=Math.min(mn,r);}
 const tq=(mx*mx+1)*(Math.PI/20000)**2;ok(Math.abs(S.s1**2-mx*mx)<=tq,'σ₁ kaba kuvvet');ok(Math.abs(S.s2**2-mn*mn)<=tq,'σ₂ kaba kuvvet');near(S.s1*S.s2,Math.abs(A[0][0]*A[1][1]-A[0][1]*A[1][0]),1e-9,'σ₁σ₂ = |det|');
 const E=K.ellipse(A);ok(Math.abs(E.max.r-S.s1)<1e-9*Math.max(1,S.s1),'ölçülen büyük yarı eksen');ok(Math.abs(E.min.r-S.s2)<1e-9*Math.max(1,S.s1),'ölçülen küçük yarı eksen');
 if(S.s1-S.s2>1e-3)ok(Math.abs(((E.axis-S.axis)%180+270)%180-90)<1e-4,'eksen açısı');}
{const A=[[2,1],[1,1]],S=K.svd2(A),phi=(1+Math.sqrt(5))/2;near(S.s1,phi*phi,1e-12);near(S.s2,1/(phi*phi),1e-12);const e=K.eig2(A);near(Math.abs(e.values[0]),S.s1,1e-12,'simetrikte σ = |λ|');}
for(const bad of[()=>K.analyse([[1,NaN],[0,1]]),()=>K.inv2([[1,2]]),()=>K.sweep([[1,0],[0,1]],7),()=>K.lerpI([[1,0],[0,1]],1.5),()=>K.gaussJordan([[1,2,3],[4,5,6]])]){assert.throws(bad);checks++;}
console.log(`G matris dönüşümleri: ${checks.toLocaleString('tr-TR')} bağımsız alan/ters/özdeğer/tarama/yineleme/homojen/Markov/SVD kontrolü PASS`);

if(process.argv.includes('--browser')){
 const {createRequire}=await import('node:module');const {createServer}=await import('node:http');const {join,extname}=await import('node:path');const {fileURLToPath}=await import('node:url');const root=fileURLToPath(new URL('../',import.meta.url));
 let chromium;for(const dir of[root,...(process.env.NODE_PATH||'').split(':').filter(Boolean)]){try{({chromium}=createRequire(join(dir,'package.json'))('playwright'));break;}catch(_){}}if(!chromium)({chromium}=await import('playwright'));
 const server=createServer((req,res)=>{const file=join(root,decodeURIComponent(new URL(req.url,'http://localhost').pathname));if(!file.startsWith(root)||!fs.existsSync(file)||fs.statSync(file).isDirectory()){res.writeHead(404).end();return;}res.setHeader('Content-Type',({'.html':'text/html; charset=utf-8','.js':'text/javascript; charset=utf-8','.css':'text/css; charset=utf-8'})[extname(file)]||'application/octet-stream');res.end(fs.readFileSync(file));});await new Promise(r=>server.listen(0,'127.0.0.1',r));let browser;
 try{browser=await chromium.launch();const before=checks;
 for(const[width,theme]of[[390,'light'],[1280,'dark']]){const ctx=await browser.newContext({viewport:{width,height:900},deviceScaleFactor:width===390?2:1,locale:'tr-TR'});await ctx.addInitScript(t=>{localStorage.setItem('acelya-theme',t);localStorage.setItem('acelya-sound-muted','1');},theme);const page=await ctx.newPage();page.setDefaultTimeout(8000);const errors=[];page.on('pageerror',e=>errors.push(e.message));page.on('console',m=>{if(m.type()==='error'&&!/404|Failed to load resource/.test(m.text()))errors.push(m.text());});await page.goto(`http://127.0.0.1:${server.address().port}/${SLUG}.html`,{waitUntil:'load'});await page.waitForTimeout(400);
  const click=id=>page.locator('#'+id).click(),read=async id=>(await page.locator('#'+id).textContent()).trim(),set=(id,v)=>page.locator('#'+id).evaluate((e,v)=>{if(e.type==='checkbox')e.checked=v;else e.value=v;e.dispatchEvent(new Event(e.tagName==='SELECT'||e.type==='checkbox'?'change':'input',{bubbles:true}));},v),type=async(id,v)=>{await page.locator('#'+id).fill(String(v));await page.locator('#'+id).press('Enter');},is=async(id,t)=>{const got=await read(id);assert.equal(got,t,id);checks++;},has=async(id,t)=>{const got=await read(id);assert(got.includes(t),`${id}: "${got}" içinde "${t}" yok`);checks++;},noflow=async tag=>{eq(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),true,'yatay taşma: '+tag+' @'+width);};
  eq(await page.evaluate(()=>[...document.querySelectorAll('.app-content input,.app-content select')].filter(e=>!e.labels||!e.labels.length).map(e=>e.id).join(',')),'','etiketsiz denetim');eq(await page.evaluate(()=>[...document.querySelectorAll('.app-content canvas')].every(c=>c.getAttribute('role')==='img'&&c.getAttribute('aria-label'))),true);eq(await page.evaluate(()=>Object.isFrozen(MatrixLab)&&!Object.getOwnPropertyDescriptor(window,'MatrixLab').writable),true);
  eq(await page.evaluate(()=>/[̀-ͯ]/.test(document.body.innerText)),false,'birleşik işaret yok');
  // 01 · varsayılan
  eq(await page.locator('#mAreaRatio').evaluate(e=>e.previousElementSibling.textContent),'Şeklin alan oranı (işaretli), ölçülen','alan oranı işaretli diye etiketli');
  await is('mDetMeas','1.500');await is('mDetForm','1.500');await is('mDetDiff','0');await is('mAreaRatio','1.500');await is('mOrient','korunur (det > 0)');await is('mRank','2 · 2.250');await has('mCols','Aî = (1.250, 0.500) · Aĵ = (−0.500, 1.000)');await noflow('map');
  await set('mFamily','donme');await is('mDetMeas','1.000');await is('mParamOut','30°');await has('mCols','Aî = (0.866, 0.500)');eq(await page.locator('#mA11t').inputValue(),'0.866');await set('mParam',180);await has('mCols','Aî = (−1.000, 0.000)');await has('mapStatus','t = 0.500');eq(await page.evaluate(()=>/-0\.000/.test(document.getElementById('panel-map').innerText)),false,'−0.000 yazılmaz');
  await set('mFamily','yansima');await is('mDetMeas','−1.000');await is('mOrient','ters döner (det < 0)');await has('mapStatus','Yönelim ters döndü');await set('mFamily','izdusum');await is('mRank','1 · 1.000');await has('mapStatus','Çökme');await has('mapStatus','30.00°');await is('mAreaRatio','0.000');
  await set('mFamily','tekil');await has('mapStatus','det = 0');await set('mFamily','kesme');await is('mDetMeas','1.000');await has('mapStatus','alan korunuyor');await set('mFamily','olcek');await set('mParam',-1);await is('mOrient','ters döner (det < 0)');await set('mFamily','ozdes');await is('mRank','2 · 2.000');eq(await page.locator('#mParamField').isHidden(),true);
  await type('mA12t','0,75');await is('mA12Out','0.750');eq(await page.locator('#mFamily').inputValue(),'serbest');await type('mA12t','abc');await has('mapStatus','Geçersiz');await is('mA12Out','0.750');await type('mA12t','9');await is('mA12Out','5.000');await has('mapStatus','sınırına');await page.locator('#mA12t').focus();await page.keyboard.press('ArrowDown');await is('mA12Out','4.950');
  await set('mA21',-2);await is('mA21Out','−2.000');await set('mT',0.5);await is('mTOut','0.50');await has('mapStatus','Ara değer t = 0.50');await set('mT',0);await is('mDetMeas','1.000');
  await click('mapReset');await is('mDetMeas','1.500');await is('mTOut','1.00');
  // oynatma: Boşluk başlatır, t = 1'de durur
  await page.locator('h1').click();await page.keyboard.press('Space');await is('mPlay','Durdur');await page.waitForFunction(()=>document.getElementById('mTOut').textContent==='1.00',null,{timeout:6000});await page.waitForTimeout(100);await is('mPlay',"Özdeşlikten A'ya oynat");await is('mDetMeas','1.500');
  // sürükleme: Aî ucunu (2, 0)'a taşı
  {await page.locator('#mapCanvas').scrollIntoViewIfNeeded();const g=await page.evaluate(()=>{const c=document.getElementById('mapCanvas'),r=c.getBoundingClientRect();return{x:r.left,y:r.top,w:r.width,h:r.height};});const R=+(await page.locator('#mapCanvas').getAttribute('data-r'));
   const k=Math.min(g.w,g.h)/(2*R);
   const P=(x,y)=>[g.x+g.w/2+x*k,g.y+g.h/2-y*k],a=P(1.25,0.5),b=P(2,0);await page.mouse.move(a[0],a[1]);await page.mouse.down();await page.mouse.move(b[0],b[1],{steps:6});await page.mouse.up();await is('mA11Out','2.000');await is('mA21Out','0.000');await is('mDetMeas','2.000');eq(await page.locator('#mFamily').inputValue(),'serbest');}
  await page.locator('h1').click();await page.keyboard.press('r');await is('mDetMeas','1.500');
  // 02
  await click('tab-comp');await page.waitForTimeout(100);await is('cDets','2.000 · 1.000 → çarpım 2.000');await is('cDetAB','2.000 · 2.000');await is('cComm','1.000');await has('cProdAB','(AB)₁₁');await has('cProdAB','1.000·1.000 + (−1.000)·0.000 = 1.000');await has('cProdBA','2.000');await has('compStatus','AB ≠ BA');
  await has('cInvF','0.500');await has('cGJ','S₂ ← S₂ − 1.000·S₁');await has('cGJ','S₂ ← S₂ ÷ 2.000');await has('cResid','Geri dönüş');await is('cSolGraph','(2.000, 1.000)');await is('cSolCramer','(2.000, 1.000)');await has('solveStatus','Tek çözüm');await has('cCramerLine','Dₓ');await noflow('comp');
  await set('cBpre','rot90');await set('cApre','rot90');await is('cComm','0.000 (değişmeli)');await has('compStatus','AB = BA');
  await set('cApre','tekil');await has('cResid','A tekil');await has('cInvF','A⁻¹ yok');await has('cGJ','Pivot yok');await has('solveStatus','tutarsız');await set('cR1',1);await set('cR2',0.5);await has('solveStatus','sonsuz');await is('cSolGraph','aynı doğru');
  await set('cView','inverse');await has('compTitle','A⁻¹');await set('cApre','yakin');await has('cResid','Koşul sayısı');await type('cA11','2');eq(await page.locator('#cApre').inputValue(),'serbest');await click('cSwap');await has('cB11','');
  await click('compReset');await is('cComm','1.000');eq(await page.locator('#cBpre').inputValue(),'kesx');await is('cSolGraph','(2.000, 1.000)');
  // 03
  await click('tab-eig');await page.waitForTimeout(100);await has('eChar','λ₁ = 3.000, λ₂ = 1.000');await has('eDirRows','45.00°');await has('eDirRows','135.00°');await has('eigStatus','İki gerçel');await is('pIter','22 · yakınsadı');await is('pLam','3.000');await is('pRate','0.333');await has('pRateTh','0.333');await has('pDir','45.00° · 45.00°');await has('eDiag','PDP⁻¹');await noflow('eig');
  await click('pClear');await is('pIter','0 (x₀)');await click('pStep');await click('pStep');await is('pIter','2');await has('pRate','en az 3');await click('pRun');await is('pIter','22 · yakınsadı');
  // x₀ tam ikinci öz doğrultuda (135°): yanlış "yakınsadı" ve negatif adım tahmini yazılmaz
  await set('pStart',135);await is('pIter','1 · durdu, v₂ üzerinde');await has('pStatus','c₁ = 0');await has('pStatus','λ₂ = 1.000');eq(/tahmini ≈|≈ -|≈ −/.test(await read('pStatus')),false,'v₂ başlangıcında adım tahmini yok');await is('pLam','1.000');
  await set('pStart',100);await is('pIter','22 · yakınsadı');await has('pStatus','≈ 22 adım');
  await set('ePre','neg');await has('eChar','λ₁ = 2.000, λ₂ = −1.000');await has('eDirRows','−1.000');await has('eigStatus','Negatif λ');await is('pRate','0.500');
  await set('ePre','jordan');await has('eigStatus','tek bir öz doğrultu');await has('eDirRows','teğet');await has('eDiag','Jordan');await has('pRateTh','1 (doğrusal değil');
  await set('ePre','scalar');await has('eDirRows','Her doğrultu');await has('eigStatus','A = λI');
  await set('ePre','rot');await has('eChar','1.000 ± 1.000 i');await has('eigStatus','Gerçel özvektör yok');await has('eigStatus','45.00°');await has('pStatus','yakınsama yok');await has('eDiag','karmaşık');
  await set('ePre','pm');await has('pStatus','|λ₁| = |λ₂|');await set('ePre','sing');await has('eigStatus','λ = 0');
  await set('ePre','sym');await page.locator('h1').click();await page.keyboard.press('Space');await is('ePlay','Duraklat');await page.waitForTimeout(250);await has('eDirRows','taranıyor');await has('eigStatus','Tarama');await click('eSkip');await has('eDirRows','135.00°');
  await type('eA12','1,5');eq(await page.locator('#ePre').inputValue(),'serbest');await has('eChar','λ₂');await set('pStart',0);await set('eTheta',30);await is('eThetaOut','30.00°');
  await page.locator('h1').click();await page.keyboard.press('R');await has('eChar','λ₁ = 3.000');await is('pStartOut','100°');
  // 04
  await click('tab-app');await page.waitForTimeout(100);await is('gPivot','(2.000, 1.000)');await is('gDiff','1.268');await is('gComm','0.707');await is('gDet','2.000 · 2.000');await has('appStatus','Sıra önemli');await noflow('pipe');
  await set('gOrder','TRS');await has('appTitle','Ötele → Döndür → Ölçekle');await set('gSy',2);await has('gComm','değişmeli');await set('gSx',0);await is('gInv','tekil: ters yok');await click('appReset');await is('gPivot','(2.000, 1.000)');
  await set('aKind','markov');await is('kIter','37');await is('kPiIter','(0.457, 0.283, 0.261)');await is('kPiEig','(0.457, 0.283, 0.261)');await has('kRateTh','0.473');await is('kRate','0.473');await noflow('markov');
  await set('kPre','iki');await is('kPiEig','(0.833, 0.167)');await has('kRateTh','0.400');await set('kPre','donemli');await has('kIter','yakınsamadı');await has('appStatus','dönemli');await set('kPre','yutucu');await is('kPiEig','tek değil (λ = 1 katlı)');await has('appStatus','ayrışık');
  await set('kPre','hava');await set('k01',0.95);await is('k01Out','0.90');eq(await page.locator('#kPre').inputValue(),'serbest');await set('kN','2');eq(await page.locator('#k02').isHidden(),true);await click('appReset');await is('kIter','37');
  await set('aKind','svd');await is('sMaxM','2.618');await has('sMaxT','2.618');await is('sMinM','0.382');await is('sAxis','31.72° · 31.72°');await has('appStatus','σᵢ = |λᵢ|');eq(await page.locator('#sC').isDisabled(),true);
  await set('sSym',false);await set('sC',-1);await has('appStatus','simetrik değil');await set('sA',1);await set('sB',-1);await set('sC',1);await set('sD',1);await has('appStatus','σ₁ = σ₂');await set('sC',-1);await has('appStatus','tekil');await click('appReset');await is('sMaxM','2.618');await noflow('svd');
  // sekme klavyesi
  await page.locator('#tab-app').focus();await page.keyboard.press('Home');eq(await page.locator('#tab-map').getAttribute('aria-selected'),'true');await page.keyboard.press('ArrowRight');eq(await page.locator('#tab-comp').getAttribute('aria-selected'),'true');await page.keyboard.press('End');eq(await page.locator('#tab-app').getAttribute('aria-selected'),'true');await page.keyboard.press('ArrowLeft');eq(await page.locator('#tab-eig').getAttribute('aria-selected'),'true');
  assert.deepEqual(errors,[]);checks++;await ctx.close();}
 console.log(`G matris dönüşümleri: ${checks-before} arayüz kontrolü (390 açık, 1280 koyu) PASS`);
 }finally{await browser?.close();await new Promise(r=>server.close(r));}
}
