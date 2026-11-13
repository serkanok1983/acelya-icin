// Lineer cebir ve özdeğerler laboratuvarı: çekirdeğin bağımsız denetimi (+ --browser ile arayüz denetimi).
// Başvurular sayfanın yöntemlerini tekrar etmez: Cramer kuralı ve Laplace açılımı (kendi BigInt kesirleriyle),
// küçükler (minör) taramasıyla rank, kapalı biçimli özdeğerler, Jacobi'ye karşı QR, doğrunun kapalı eğim formülü,
// kapalı biçimli tekil değerler, rastgele rank-k rakiplerle Eckart–Young.
// Kullanım: node scripts/check-g-lineer-cebir-ve-ozdegerler.mjs [--browser]
import fs from 'node:fs';
import vm from 'node:vm';
import assert from 'node:assert/strict';
const SLUG='lineer-cebir-ve-ozdegerler';
const html=fs.readFileSync(new URL(`../${SLUG}.html`,import.meta.url),'utf8');
const source=html.split('/* KERNEL-BEGIN */')[1]?.split('/* KERNEL-END */')[0];
assert(source,'KERNEL sınırları gerekli');
const context={window:{}};vm.createContext(context);vm.runInContext(source,context);
const K=context.window.LinAlgLab;assert(K&&Object.isFrozen(K),'LinAlgLab dondurulmuş olmalı');
let checks=0;
const ok=(c,msg)=>{assert(c,msg);checks++;};
const eq=(a,b,msg='')=>{assert.equal(a,b,msg+` (${a} ≠ ${b})`);checks++;};
const near=(a,b,tol=1e-9,msg='')=>{assert(Number.isFinite(a)&&Math.abs(a-b)<=tol*Math.max(1,Math.abs(b)),`${msg} ${a} ≠ ${b} (tol ${tol})`);checks++;};
let seed=2024;const rnd=()=>{seed=(seed*1103515245+12345)%2147483648;return seed/2147483648;};const ri=(a,b)=>a+Math.floor(rnd()*(b-a+1));

/* bağımsız kesir aritmetiği: [pay, payda] BigInt çiftleri */
const g_=(a,b)=>{a=a<0n?-a:a;b=b<0n?-b:b;while(b){[a,b]=[b,a%b];}return a;};
const Q=(n,d=1n)=>{n=BigInt(n);d=BigInt(d);if(d<0n){n=-n;d=-d;}const g=g_(n,d)||1n;return[n/g,d/g];};
const qa=(x,y)=>Q(x[0]*y[1]+y[0]*x[1],x[1]*y[1]),qs=(x,y)=>Q(x[0]*y[1]-y[0]*x[1],x[1]*y[1]),qm=(x,y)=>Q(x[0]*y[0],x[1]*y[1]),qd=(x,y)=>Q(x[0]*y[1],x[1]*y[0]);
const fromK=f=>Q(f.n,f.d),same=(f,q)=>f.n===q[0]&&f.d===q[1];
function det(M){const n=M.length;if(n===1)return M[0][0];let s=Q(0);for(let j=0;j<n;j++){if(M[0][j][0]===0n)continue;const minor=M.slice(1).map(r=>r.filter((_,c)=>c!==j));const t=qm(M[0][j],det(minor));s=j%2?qs(s,t):qa(s,t);}return s;}
function combos(n,k,st=0,acc=[],out=[]){if(acc.length===k){out.push(acc.slice());return out;}for(let i=st;i<n;i++){acc.push(i);combos(n,k,i+1,acc,out);acc.pop();}return out;}
function rankMinors(M){const m=M.length,n=M[0].length;for(let k=Math.min(m,n);k>0;k--)for(const rs of combos(m,k))for(const cs of combos(n,k))if(det(rs.map(i=>cs.map(j=>M[i][j])))[0]!==0n)return k;return 0;}
const randQ=()=>rnd()<0.2?Q(ri(-5,5),ri(1,4)):Q(ri(-6,6));
const toK=M=>M.map(r=>r.map(q=>K.F(q[0],q[1])));

/* ── 1. Ayrıştırma ve Gauss ── */
for(const[t,n,d]of[['3',3n,1n],['-2.5',-5n,2n],['0,25',1n,4n],['3/4',3n,4n],['−7/14',-1n,2n],['.5',1n,2n],['1.000001',1000001n,1000000n]]){const f=K.parse(t);ok(f&&f.n===n&&f.d===d,'parse '+t);}
for(const t of['','abc','1/0','1/2/3','12345','2e3','1..2'])eq(K.parse(t),null,'geçersiz '+t);
for(let it=0;it<250;it++){const m=ri(1,5),n=ri(1,5);const A=Array.from({length:m},()=>Array.from({length:n},randQ));if(rnd()<0.3&&m>1)A[m-1]=A[0].map((x,j)=>qa(x,A[1%m][j]));const b=Array.from({length:m},randQ);
 const s=K.solveSystem(toK(A),b.map(q=>K.F(q[0],q[1])));const rA=rankMinors(A),rAb=rankMinors(A.map((r,i)=>[...r,b[i]]));
 eq(s.rank,rA,'rank A (minörler)');eq(s.rankAug,rAb,'rank [A|b]');eq(s.kind,rAb>rA?'none':rA===n?'unique':'infinite','çözüm türü');eq(s.rank+s.nullity,n,'rank–sıfırlık');
 if(s.xp){A.forEach((r,i)=>{let v=Q(0);r.forEach((a,j)=>v=qa(v,qm(a,fromK(s.xp[j]))));ok(v[0]===b[i][0]&&v[1]===b[i][1],'A·xp = b (bağımsız)');});
  s.nullBasis.forEach(v=>A.forEach(r=>{let t=Q(0);r.forEach((a,j)=>t=qa(t,qm(a,fromK(v[j]))));eq(t[0],0n,'A·v = 0');}));}
 if(m===n&&rA===n){const D=det(A);for(let j=0;j<n;j++){const Aj=A.map((r,i)=>r.map((x,c)=>c===j?b[i]:x));ok(same(s.xp[j],qd(det(Aj),D)),'Cramer');}}
 const last=s.steps[s.steps.length-1].M,R=s.R;ok(last.every((r,i)=>r.every((x,j)=>K.feq(x,R[i][j]))),'son adım = RREF');
 s.pivots.forEach((c,i)=>{ok(K.feq(R[i][c],K.ONE),'pivot 1');R.forEach((r,k)=>{if(k!==i)ok(K.isZ(r[c]),'pivot sütunu temiz');});});}
// işlem sayımı: yoğun rastgele kesirli sistemlerde formül tam tutar
for(let n=1;n<=5;n++)for(let rep=0;rep<6;rep++){const A=Array.from({length:n},()=>Array.from({length:n},()=>Q(ri(1,9)*(rnd()<.5?-1:1),ri(1,7))));const b=Array.from({length:n},()=>Q(ri(1,9),ri(1,5)));const s=K.solveSystem(toK(A),b.map(q=>K.F(q[0],q[1])));
 if(s.kind!=='unique')continue;const dense=s.steps.every(st=>st.kind!=='swap');const th=K.gjTheory(n);if(dense&&s.ops.fwd===th.fwd){ok(s.ops.back<=th.back,'geri sayım ≤ kuram (pivot zaten 1 ise bölme yok)');}else ok(s.ops.fwd<=th.fwd,'sıfır atlanınca sayım azalır');}
{const s=K.solveSystem([[2,1,-1],[-3,-1,2],[-2,1,2]],[8,-11,-3]);eq(s.xp.map(K.str).join(','),'2,3,−1');eq(s.ops.fwd,11);eq(s.ops.back,6);eq(s.steps.length-1,9);}
{const s=K.solveSystem([[2,1,3,1,4],[1,3,2,5,1],[3,2,4,1,2],[1,4,1,3,5],[4,1,2,2,3]],[1,2,3,4,5]);eq(s.ops.fwd,50);eq(s.ops.back,15);}
{const s=K.solveSystem([[0,2,1],[1,1,1],[2,0,3]],[3,3,5]);eq(s.steps[1].kind,'swap');eq(s.xp.map(K.str).join(','),'1,1,1');}
{const s=K.solveSystem([[1,0],[1,1],[1,2],[1,3]],[1,2,2,4]);eq(s.kind,'none');eq(s.rank,2);eq(s.rankAug,3);}
// 04'teki dört nokta: kapalı eğim formülüyle c₀ = c₁ = 0.9, ‖r‖² = 0.70
{const r=K.leastSquares([[1,0],[1,1],[1,2],[1,3]],[1,2,2,4]);near(r.exact[0],0.9,1e-12);near(r.exact[1],0.9,1e-12);near(r.rnorm**2,0.7,1e-12);}
ok(html.includes('pivotun sağındaki (b dahil)'),'sayım kuralı metni b sütununu ve pivotun sağını söyler');
for(const n of[3,10,50,200]){const c=K.countSweep(n,n),th=K.gjTheory(n);eq(c.fwd,th.fwd,'tarama yoğun');eq(c.back,th.back);}
near(K.countSweep(200,200).fwd/(200**3/3),1.0074,1e-3,'n=200 oranı');
for(const n of[2,4,7,30])eq(K.gjTheory(n).fwd,(()=>{let s=0;for(let k=1;k<n;k++)s+=(n-k)*(n-k+2);return s;})(),'kapalı biçim = toplam');

/* ── 2. Alt uzaylar ve bağımsızlık ── */
for(let it=0;it<150;it++){const m=ri(2,4),n=ri(2,4);const A=Array.from({length:m},()=>Array.from({length:n},()=>Q(ri(-3,3))));if(rnd()<.5)A[m-1]=A[0].map((x,j)=>qs(qm(Q(2),x),A[1][j]));const s=K.subspaces(toK(A)),r=rankMinors(A);
 eq(s.rank,r);eq(s.dims.nul,n-r);eq(s.dims.left,m-r);eq(s.col.length,r);
 s.nul.forEach(v=>A.forEach(row=>{let t=Q(0);row.forEach((a,j)=>t=qa(t,qm(a,fromK(v[j]))));eq(t[0],0n,'çekirdek');}));
 s.left.forEach(v=>{for(let j=0;j<n;j++){let t=Q(0);A.forEach((row,i)=>t=qa(t,qm(row[j],fromK(v[i]))));eq(t[0],0n,'sol çekirdek');}});
 // sütun bazı A'nın her sütununu gerer: [baz | sütun] rankı değişmez
 for(let j=0;j<n;j++){const M=Array.from({length:m},(_,i)=>[...s.col.map(c=>fromK(c[i])),A[i][j]]);eq(rankMinors(M),r,'sütun uzayı gerer');}}
{const s=K.subspaces([[1,2,3],[2,4,7],[3,6,10]]);eq(s.nul.map(v=>v.map(K.str).join(',')).join(),'2,−1,0');eq(s.left.map(v=>v.map(K.str).join(',')).join(),'1,1,−1');}
{const d=K.dependency([[1,2,3],[4,5,6],[7,8,9]].map(v=>v.map(x=>K.F(x))));eq(d.independent,false);eq(d.rank,2);eq(d.coeffs.map(K.str).join(','),'1,−2,1');ok(d.check,'bağıntı');}
{const d=K.dependency([[1,0,1],[1,1,0],[0,1,1]].map(v=>v.map(x=>K.F(x))));eq(d.independent,true);eq(d.rank,3);}
{const d=K.dependency([[1,2],[3,4],[5,6]].map(v=>v.map(x=>K.F(x))));eq(d.independent,false);ok(d.check);}

/* ── 3. Karakteristik polinom ve özdeğerler ── */
for(let it=0;it<120;it++){const n=ri(2,4);const A=Array.from({length:n},()=>Array.from({length:n},()=>Q(ri(-4,4),ri(1,2))));const cp=K.charPoly(toK(A));
 for(const lam of[-2,0,1,3]){const M=A.map((r,i)=>r.map((x,j)=>qs(i===j?Q(lam):Q(0),x)));const D=det(M);ok(same(K.pevalF(cp,K.F(lam)),D),'det(λI−A) Laplace');}}
const lamList=A=>K.eigen(A).list;
{const L=lamList([[2,1,0],[1,2,1],[0,1,2]]).map(e=>e.re);near(L[0],2+Math.SQRT2,1e-12);near(L[1],2,1e-12);near(L[2],2-Math.SQRT2,1e-12);}
{const L=lamList([[2,-1,0,0],[-1,2,-1,0],[0,-1,2,-1],[0,0,-1,2]]).map(e=>e.re),ref=[1,2,3,4].map(k=>2-2*Math.cos(k*Math.PI/5)).sort((a,b)=>b-a);L.forEach((x,i)=>near(x,ref[i],1e-12,'yay zinciri'));}
{const e=K.eigen([[0,2,-1],[-1,3,0],[2,-2,4]]);eq(e.diagC,false);const two=e.list.find(x=>x.exact&&K.str(x.exact)==='2');eq(two.alg,2);eq(two.geo,1);eq(K.str(e.trace),'7');eq(K.str(e.det),'12');}
{const e=K.eigen([[2,0,0],[3,-1,3],[6,-6,8]]);eq(e.diagR,true);eq(e.list.find(x=>K.str(x.exact)==='2').geo,2);}
{const e=K.eigen([[11,-8,4],[18,-13,8],[10,-8,7]]);const c=e.list.filter(x=>x.im!==0);eq(c.length,2);near(c[0].re,1,1e-12);near(Math.abs(c[0].im),2,1e-12);eq(e.diagC,true);eq(e.diagR,false);}
{const e=K.eigen([[14,-6,5,-4],[8,-1,3,-3],[-2,2,1,0],[16,-8,7,-4]]);eq(e.list.map(x=>K.str(x.exact)).join(','),'4,3,2,1');e.list.forEach(x=>ok(x.resid<1e-12,'Av = λv'));}
for(let it=0;it<80;it++){const n=ri(2,4);const A=Array.from({length:n},()=>Array.from({length:n},()=>ri(-5,5)));const e=K.eigen(A);let s=0,pr=[1,0];const all=[];e.list.forEach(x=>{for(let k=0;k<x.alg;k++)all.push(x);});eq(all.length,n,'kat toplamı n');
 all.forEach(x=>{s+=x.re;pr=[pr[0]*x.re-pr[1]*x.im,pr[0]*x.im+pr[1]*x.re];});near(s,A.reduce((t,r,i)=>t+r[i],0),1e-7,'iz');near(pr[0],K.num(e.det),1e-6,'det');
 if(e.sym){ok(e.list.every(x=>x.im===0),'simetrik → gerçek');}}
// QR algoritması: simetrik matrislerde Jacobi ile, oranlarda kuramla
for(let it=0;it<40;it++){const n=ri(2,4);const B=Array.from({length:n},()=>Array.from({length:n},()=>rnd()*4-2));const S=B.map((r,i)=>r.map((x,j)=>(x+B[j][i])/2));const J=K.jacobiEig(S),q=K.qrAlgorithm(S,{shift:'wilkinson'});ok(q.converged,'Wilkinson yakınsar');const ql=q.eig.map(x=>x.re).sort((a,b)=>b-a);ql.forEach((x,i)=>near(x,J.values[i],1e-9,'QR = Jacobi'));
 const V=J.vectors;let rec=0;for(let i=0;i<n;i++)for(let j=0;j<n;j++){let v=0;for(let k=0;k<n;k++)v+=V[k][i]*J.values[k]*V[k][j];rec=Math.max(rec,Math.abs(v-S[i][j]));}ok(rec<1e-12,'VΛVᵀ = S');}
{const q=K.qrAlgorithm([[2,1,0],[1,2,1],[0,1,2]]),r=K.qrRates(q.hist,q.scale);near(r[0].rate,2/(2+Math.SQRT2),2e-3);near(r[1].rate,(2-Math.SQRT2)/2,2e-3);eq(q.iters,51);}
{const q=K.qrAlgorithm([[14,-6,5,-4],[8,-1,3,-3],[-2,2,1,0],[16,-8,7,-4]]),r=K.qrRates(q.hist,q.scale);near(r[0].rate,0.75,5e-3);near(r[1].rate,2/3,5e-3);near(r[2].rate,0.5,5e-3);}
{const q=K.qrAlgorithm([[0,1],[1,0]]);eq(q.converged,false);eq(q.iters,500);ok(K.qrAlgorithm([[0,1],[1,0]],{shift:'wilkinson'}).converged,'kaydırma ±1 ayırır');}
{const q=K.qrAlgorithm([[11,-8,4],[18,-13,8],[10,-8,7]]);ok(q.converged,'karmaşık blok kabul');const c=q.eig.filter(x=>x.im!==0);near(c[0].re,1,1e-9);near(Math.abs(c[0].im),2,1e-9);}
{const w=K.qrAlgorithm([[0,2,-1],[-1,3,0],[2,-2,4]],{shift:'wilkinson'});const err=Math.max(...w.eig.filter(x=>Math.abs(x.re-2)<1e-3).map(x=>Math.abs(x.re-2)));ok(err>1e-10&&err<1e-6,'kusurlu λ √ε ölçeğinde duyarlı: '+err);}

/* ── 4. En küçük kareler ve SVD ── */
for(const sd of[1,7,19,33])for(const N of[4,12,40]){const d=K.lsData({model:'line',N,sigma:.7,seed:sd,x0:0,w:10}),{A}=K.design(d.x,2,false),r=K.leastSquares(A,d.y);
 const xb=d.x.reduce((s,v)=>s+v,0)/N,yb=d.y.reduce((s,v)=>s+v,0)/N,sl=d.x.reduce((s,v,i)=>s+(v-xb)*(d.y[i]-yb),0)/d.x.reduce((s,v)=>s+(v-xb)**2,0);near(r.exact[1],sl,1e-12,'eğim formülü');near(r.exact[0],yb-sl*xb,1e-12,'kesişim');
 Object.values(r.methods).forEach(m=>ok(m.err<1e-13,'iyi koşullu'));ok(r.exactCos<1e-12,'artık ⟂ sütunlar');}
{const d=K.lsData({model:'parab',N:12,sigma:.5,seed:7,x0:1000,w:1});const bad=K.leastSquares(K.design(d.x,3,false).A,d.y),good=K.leastSquares(K.design(d.x,3,true).A,d.y);
 ok(bad.cond>1e12,'kötü koşul '+bad.cond);ok(!bad.methods.normal.x||bad.methods.normal.err>1e-4,'normal denklemler bozulur');ok(bad.methods.mgs.err<1e-8,'MGS dayanır');ok(bad.methods.cgs.orth>1e3*bad.methods.mgs.orth,'CGS dikliği kaybeder');
 ok(good.cond<100,'ortalanmış');Object.values(good.methods).forEach(m=>ok(m.err<1e-13,'ortalanmış doğru'));
 // ortalama yalnız tabanı değiştirir: uydurulan değerler aynı
 const fb=x=>bad.exact[0]+bad.exact[1]*x+bad.exact[2]*x*x,xb=d.x.reduce((s,v)=>s+v,0)/12,fg=x=>good.exact[0]+good.exact[1]*(x-xb)+good.exact[2]*(x-xb)**2;d.x.forEach(x=>near(fb(x),fg(x),1e-6,'aynı eğri'));}
{const s=K.svdEig([[3,0],[4,5]]);near(s.S[0],3*Math.sqrt(5),1e-14);near(s.S[1],Math.sqrt(5),1e-14);ok(s.recon<1e-14);const s2=K.svdValues([[3,0],[4,5]]);near(s2[0],3*Math.sqrt(5),1e-14);}
{const s=K.svdEig([[1,1],[1,0],[0,1]]);near(s.S[0],Math.sqrt(3),1e-14);near(s.S[1],1,1e-14);eq(s.U.length,3);ok(s.orthU<1e-14,'tamamlanan U dik');}
{const dl=1e-6,l1=(2+dl+Math.sqrt(dl*dl+4))/2,ref=dl/l1;const a=K.svdEig([[1,1],[1,1+dl]]).S[1],b=K.svdValues([[1,1],[1,1+dl]])[1];near(b,ref,1e-9,'Jacobi küçük σ');ok(Math.abs(a-ref)/ref>1e-6,'AᵀA küçük σ’yı kaybeder');}
for(let it=0;it<30;it++){const m=ri(2,3),n=ri(2,3),A=Array.from({length:m},()=>Array.from({length:n},()=>rnd()*6-3));const s=K.svdEig(A),s2=K.svdValues(A);ok(s.recon<1e-12,'UΣVᵀ = A');ok(Math.max(s.orthU,s.orthV)<1e-12,'dik');s.S.forEach((x,i)=>near(x,s2[i],1e-7,'iki yöntem'));
 const fro=A.flat().reduce((t,x)=>t+x*x,0);near(s.S.reduce((t,x)=>t+x*x,0),fro,1e-12,'Σσ² = ‖A‖²');}
// Eckart–Young: rastgele rank-k rakipler hiçbir zaman daha iyi değil
for(const pat of Object.keys(K.PATTERN_NAMES))for(const noise of[0,0.2]){const img=K.pattern(pat,{noise,seed:3}),sv=K.svdEig(img);const fro=img.flat().reduce((t,x)=>t+x*x,0);
 for(const k of[0,1,2,3,5,8,20]){const L=K.lowRank(img,k,sv);near(L.errF2,L.tail,1e-9,'‖A−Aₖ‖² = kuyruk');if(k===0)near(L.errF2,fro,1e-12);const E=img.map((r,i)=>r.map((x,j)=>x-L.Ak[i][j]));near(K.specNorm(E,600),k<20?sv.S[k]:0,2e-3,'‖A−Aₖ‖₂ = σₖ₊₁');
  ok(K.columnSelect(img,k).errF2>=L.errF2-1e-9,'sütun seçimi daha iyi değil');
  for(let t=0;t<3&&k>0&&k<20;t++){const B=Array.from({length:20},()=>Array.from({length:k},()=>rnd()-.5));// rastgele k boyutlu sütun uzayına en iyi izdüşüm
   const Qs=[];for(let j=0;j<k;j++){const v=B.map(r=>r[j]);for(const q of Qs){const d=K.dot(q,v);v.forEach((_,i)=>v[i]-=d*q[i]);}const nv=K.norm(v);Qs.push(v.map(x=>x/nv));}
   let e=0;for(let j=0;j<20;j++){const c=img.map(r=>r[j]);for(const q of Qs){const d=K.dot(q,c);c.forEach((_,i)=>c[i]-=d*q[i]);}e+=K.dot(c,c);}ok(e>=L.errF2-1e-9,'rastgele rank-k rakip');}}}
// desen rankları, tam aritmetikle (gürültüsüz desenler 0/1 tam sayı)
for(const[pat,r]of[['arti',2],['satranc',2]])eq(K.subspaces(K.pattern(pat)).rank,r,pat+' rankı');
for(const pat of Object.keys(K.PATTERN_NAMES)){const exact=K.subspaces(K.pattern(pat)).rank,sv=K.svdValues(K.pattern(pat));eq(sv.filter(x=>x>1e-7*sv[0]).length,exact,pat+': sayısal rank = tam rank');}
console.log(`G lineer cebir: ${checks.toLocaleString('tr-TR')} bağımsız çekirdek kontrolü PASS`);

if(process.argv.includes('--browser')){
 const {createRequire}=await import('node:module');const {createServer}=await import('node:http');const {join,extname}=await import('node:path');const {fileURLToPath}=await import('node:url');const root=fileURLToPath(new URL('../',import.meta.url));
 let chromium;for(const dir of[root,...(process.env.NODE_PATH||'').split(':').filter(Boolean)]){try{({chromium}=createRequire(join(dir,'package.json'))('playwright'));break;}catch(_){}}if(!chromium)({chromium}=await import('playwright'));
 const server=createServer((req,res)=>{const file=join(root,decodeURIComponent(new URL(req.url,'http://localhost').pathname));if(!file.startsWith(root)||!fs.existsSync(file)||fs.statSync(file).isDirectory()){res.writeHead(404).end();return;}res.setHeader('Content-Type',({'.html':'text/html; charset=utf-8','.js':'text/javascript; charset=utf-8','.css':'text/css; charset=utf-8'})[extname(file)]||'application/octet-stream');res.end(fs.readFileSync(file));});await new Promise(r=>server.listen(0,'127.0.0.1',r));let browser;
 try{browser=await chromium.launch();const before=checks;
 for(const[width,theme]of[[390,'light'],[1280,'dark']]){const ctx=await browser.newContext({viewport:{width,height:900},deviceScaleFactor:width===390?2:1,locale:'tr-TR'});await ctx.addInitScript(t=>{localStorage.setItem('acelya-theme',t);localStorage.setItem('acelya-sound-muted','1');},theme);const page=await ctx.newPage();page.setDefaultTimeout(8000);const errors=[];page.on('pageerror',e=>errors.push(e.message));page.on('console',m=>{if(m.type()==='error')errors.push(m.text());});page.on('response',r=>{if(r.status()>=400)errors.push(r.status()+' '+r.url());});await page.goto(`http://127.0.0.1:${server.address().port}/${SLUG}.html`,{waitUntil:'load'});await page.waitForTimeout(400);
  const click=id=>page.locator('#'+id).click(),read=async id=>(await page.locator('#'+id).textContent()).trim(),set=(id,v)=>page.locator('#'+id).evaluate((e,v)=>{if(e.type==='checkbox')e.checked=v;else e.value=v;e.dispatchEvent(new Event(e.tagName==='SELECT'||e.type==='checkbox'?'change':'input',{bubbles:true}));},v),type=async(id,v)=>{await page.locator('#'+id).fill(String(v));},is=async(id,t)=>{const got=await read(id);assert.equal(got,t,id);checks++;},has=async(id,t)=>{const got=await read(id);assert(got.includes(t),`${id}: "${got}" içinde "${t}" yok`);checks++;},noflow=async tag=>{eq(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),true,'yatay taşma: '+tag+' @'+width);};
  const labels=async()=>eq(await page.evaluate(()=>[...document.querySelectorAll('.app-content input,.app-content select')].filter(e=>!e.labels||!e.labels.length).map(e=>e.id).join(',')),'','etiketsiz denetim');
  await labels();eq(await page.evaluate(()=>[...document.querySelectorAll('.app-content canvas')].every(c=>c.getAttribute('role')==='img'&&c.getAttribute('aria-label'))),true);eq(await page.evaluate(()=>Object.isFrozen(LinAlgLab)&&!Object.getOwnPropertyDescriptor(window,'LinAlgLab').writable),true);
  eq(await page.evaluate(()=>/[̀-ͯ]/.test(document.body.innerText)),false,'birleşik işaret yok');eq(await page.evaluate(()=>!!document.querySelector('script[src*="atlas"],script[src*="stem"],link[href*="googleapis"]')),false,'eski STEM dosyaları yok');
  // 01
  await is('gRank','3 · 3');await is('gKind','tek çözüm');await has('gSol','x₁ = 2 · x₂ = 3 · x₃ = −1');await is('gOpsF','11');await is('gOpsB','6');await is('gOpsTh','11 · 6');await is('gOpsLead','9,000 · 1,222');await is('gStepOut','9 / 9');await has('gCheck','tam olarak sağlanıyor');await noflow('gauss');
  await click('gFirst');await is('gStepOut','0 / 9');await click('gNext');await has('gStepText','R2 ← R2 + (3/2)·R1');await has('gMatrix','1/2');await click('gLast');await is('gStepOut','9 / 9');
  await set('gPre','yok');await is('gKind','çözüm yok');await is('gRank','2 · 3');await has('gSol','0 = 1');
  await set('gPre','sonsuz');await has('gKind','sonsuz: 2');await is('gFree','x₂, x₄');await has('gSol','t₂');await has('gNullity','2 + 2 = 4');
  await set('gPre','yogun');await is('gOpsF','50');await is('gOpsB','15');await has('gOpsLead','1,200');await set('gPre','takas');await has('gOps','R1 ↔ R2');await set('gPre','asiri');await has('gSol','En küçük kareler');await has('gSol','dört noktası');await is('gOpsTh','— (kare değil)');
  await set('gPre','kesir');await has('gSol','x₁ = −8 · x₂ = 15');await type('g_0_0','abc');await has('gStatus','Geçersiz');await is('gRank','—');await type('g_0_0','1/2');await has('gSol','x₁ = −8');eq(await page.locator('#gPre').inputValue(),'serbest');
  await set('gRows','5');await set('gCols','5');eq(await page.locator('#gGrid input').count(),30);await labels();await noflow('gauss 5×6');
  await page.locator('h1').click();await page.keyboard.press('r');await is('gRank','3 · 3');await is('gOpsF','11');
  eq((await page.locator('#gSweep tr').count()),7);await has('gSweep','1,0074');
  // 02
  await click('tab-sub');await page.waitForTimeout(100);await is('sRank','2');await is('sDims','2 · 2 · 1 · 1');await has('sOrthRN','90,000°');await has('sOrthCL','90,000°');await is('sAngle','14,963°');await has('sRows','(2, −1, 0)');await has('sRows','(1, 1, −1)');await is('sDepKind','bağımlı');await has('sDep','v₁ − 2·v₂ + v₃ = 0');await noflow('sub');
  await set('sPre','lap');await is('sAngle','90,000°');await has('sStatus','A simetrik');await set('sPre','dokuz');await is('sAngle','90,000°');await has('sStatus','rastlantı');
  await set('sPre','full');await is('sDims','3 · 3 · 0 · 0');await has('sOrthRN','N(A) = {0}');await has('sAngle','N(A) = {0}');
  await set('sPre','wide');await is('sDims','2 · 2 · 2 · 1');eq(await page.locator('#sPlate').isHidden(),true);await set('sPre','r1');await is('sDims','1 · 1 · 2 · 2');
  await set('sView','output');await set('sView','both');await click('sDepPre');await is('sDepKind','bağımsız');await type('sV2','1, 2');await has('sDep','farklı');await type('sV2','1,5 2 0');await is('sDepKind','bağımsız');
  {await page.locator('#sCanvas').focus();await page.keyboard.press('ArrowLeft');await page.keyboard.press('ArrowUp');const b=await page.locator('#sCanvas').boundingBox();await page.mouse.move(b.x+b.width/2,b.y+b.height/2);await page.mouse.down();await page.mouse.move(b.x+b.width/2+60,b.y+b.height/2+20);await page.mouse.up();}
  await click('sReset');await is('sAngle','14,963°');await is('sDepKind','bağımlı');await noflow('sub reset');
  // 03
  await click('tab-eig');await page.waitForTimeout(100);await is('eChar','λ³ − 6λ² + 10λ − 4');await is('eFact','(λ − 2)(λ² − 4λ + 2)');await is('eIters','51 · 5');await has('eRates','0,5858');await has('eRates','0,2929');await has('eSym','A = Aᵀ');await has('eDiag','köşegenleşir');await has('eTrace','6 · 6,000000000');await has('eDet','4 · 4,000000000');await noflow('eig');
  await set('eMode','wilkinson');await is('eKOut','5 / 5');await set('eK',0);await has('eAkTitle','k = 0');await set('eMode','none');
  await set('ePre','defect');await has('eDiag','köşegenleşmez');await has('eDiag','cebirsel 2 > geometrik 1');await has('eFact','(λ − 3)(λ − 2)²');await set('eMode','wilkinson');await has('eStatus','√ε');await set('eMode','none');
  await set('ePre','rep');await has('eDiag','köşegenleşir');await has('eRates','tekrarlı');
  await set('ePre','cplx');await has('eRows','1,0000 + 2,0000i');await has('eDiag','ℂ üzerinde');await has('eRates','karmaşık blok');
  await set('ePre','swap');await has('eIters','500 adımda yakınsamadı · 1');await has('eStatus','ayıramaz');await has('eRates','yakınsamaz');
  await set('ePre','dist4');await is('eFact','(λ − 4)(λ − 3)(λ − 2)(λ − 1)');await has('eSym','dik değil');await set('ePre','lap4');await is('eChar','λ⁴ − 8λ³ + 21λ² − 20λ + 5');
  await type('e_0_0','x');await has('eStatus','Geçersiz');await type('e_0_0','1');eq(await page.locator('#ePre').inputValue(),'serbest');await click('eReset');await is('eIters','51 · 5');
  // 04
  await click('tab-ls');await page.waitForTimeout(100);await is('lCond','11,3');await is('lRn','2,126');await has('lStatus','İyi koşullu');await noflow('ls');
  await click('lPreBad');await has('lCond','× 10¹³');await has('lStatus','Kötü koşullu');await has('lRows','Normal denklemler');await click('lPreFix');await has('lStatus','İyi koşullu');eq(await page.locator('#lCentre').isChecked(),true);
  await page.evaluate(()=>{const c=document.getElementById('lCanvas').getContext('2d');if(!c.__rec){const o=c.fillText.bind(c);c.fillText=(t,...a)=>{(window.__lsT=window.__lsT||[]).push(String(t));return o(t,...a);};c.__rec=1;}window.__lsT=[];});
  await click('lPreFour');await page.waitForTimeout(150);{const T=await page.evaluate(()=>window.__lsT);for(const t of['0,00','0,75','1,50','2,25','3,00'])ok(T.includes(t),'x çentiği adımdan seçilen ondalıkla: '+t+' yok ('+T.join(' | ')+')');ok(!T.includes('0,8'),'0,75 çentiği 0,8 diye yuvarlanmaz');}
  await has('lRows','(0,900; 0,900)');await is('lRn','0,8367');await has('lStatus','‖r‖² = 0,7000');await set('lN',5);eq(await page.evaluate(()=>document.getElementById('lStatus').textContent.includes('dört noktası')),false,'sürgü özel veriyi bırakır');await click('lPreGood');
  await set('lSigma',0);await is('lSigmaOut','0,00');await has('lStatus','Artık neredeyse sıfır');await is('lOrth','— (r ≈ 0)');await set('lX0',1000);await is('lX0Out','1000');await set('lN',4);await is('lNOut','4');
  await set('lKind','svd');await is('vSig','6,708204 · 2,236068');await is('vRank','2 / 2');await has('vStatus','κ = 3,00');await set('vPre','yakin');await has('vStatus','ε·κ²');await set('vPre','tekil');await is('vRank','1 / 2');await set('vPre','uzun');await has('vMats','Σ');await set('vPre','genis');await type('v_0_0','?');await has('vStatus','Geçersiz');await noflow('svd');
  await set('lKind','img');await is('iErr','6,8678');await is('iTail','6,8678');await is('iSpecN','1,6489 · 1,6489');await is('iStore','123 · 400');await has('iStatus','= %23,92.');await has('iStatus','%30,8');await set('iPat','arti');await set('iK',2);await has('iStatus','k ≥ rank');await set('iNoise',0.1);await is('iNoiseOut','0,10');await set('iK',20);await is('iStore','820 · 400');await noflow('img');
  await click('lReset');eq(await page.locator('#lKind').inputValue(),'ls');await is('lCond','11,3');
  // sekme klavyesi
  await page.locator('#tab-ls').focus();await page.keyboard.press('Home');eq(await page.locator('#tab-gauss').getAttribute('aria-selected'),'true');await page.keyboard.press('ArrowRight');eq(await page.locator('#tab-sub').getAttribute('aria-selected'),'true');await page.keyboard.press('End');eq(await page.locator('#tab-ls').getAttribute('aria-selected'),'true');await page.keyboard.press('ArrowLeft');eq(await page.locator('#tab-eig').getAttribute('aria-selected'),'true');
  assert.deepEqual(errors,[]);checks++;await ctx.close();}
 console.log(`G lineer cebir: ${checks-before} arayüz kontrolü (390 açık, 1280 koyu) PASS`);
 }finally{await browser?.close();await new Promise(r=>server.close(r));}
}
