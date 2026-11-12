// Kalıcı denetim: altin-oran.html çekirdeği, sayfanın kendi formüllerini yinelemeyen başvurularla sınanır:
// φ'nin tam cebiri ve bilinen ondalık açılımlar, Fibonacci özdeşlikleri ve Hurwitz sabiti, kaba kuvvet en iyi
// kesir araması, logaritmik sarmalın kapalı biçimleri, O(n²) komşu araması. `--browser` arayüzü de sınar.
import fs from 'node:fs';
import assert from 'node:assert/strict';
import { canvasInk, canvasInkAll, assertCanvasDrawn } from './lib/canvas-check.mjs';
const html=fs.readFileSync(new URL('../altin-oran.html',import.meta.url),'utf8');
const source=html.split('/* KERNEL-BEGIN */')[1]?.split('/* KERNEL-END */')[0];
assert(source,'Çekirdek sınır işaretleri gerekli');
// vm bağlamı tiplenmiş dizileri çok yavaşlatıyor; çekirdek ana bağlamda, sahte bir window ile yüklenir.
const K=new Function('window',source+';return window.GoldenLab;')({});
let checks=0;
const near=(a,e,tol=1e-9,msg='')=>{assert(Math.abs(a-e)<=tol*Math.max(1,Math.abs(e)),`${msg} ${a} ≠ ${e}`);checks++;};
const ok=(c,msg)=>{assert(c,msg);checks++;};
const eq=(a,b,msg)=>{if(msg===undefined)assert.deepEqual(a,b);else assert.deepEqual(a,b,msg);checks++;};
const PHI=(1+Math.sqrt(5))/2;

// 1. φ'nin tam cebiri, kesim ve ikiye bölme
near(K.PHI*K.PHI,K.PHI+1,1e-15);near(1/K.PHI,K.PHI-1,1e-15);near(K.HURWITZ*K.HURWITZ*5,1,1e-15);near(K.GOLDEN_ANGLE,360*(2-PHI),1e-14);
{const s=K.section(1/PHI);near(s.diff,0,1e-14);near(s.ab,PHI,1e-14);near(s.wa,PHI,1e-14);
 for(let t=.5;t<=.95;t+=.01){const r=K.section(t);near(r.a+r.b,1,1e-15);ok(Math.sign(r.diff)===Math.sign(t-1/PHI),'fark işareti '+t);}
 // a/b − 1/a kesin artan: yalnız bir kök
 let prev=-Infinity;for(let t=.5;t<=.95;t+=.001){const d=K.section(t).diff;ok(d>prev,'tekdüzelik');prev=d;}
 for(let n=1;n<=40;n++){const b=K.bisect(n);ok(b.lo<PHI&&PHI<b.hi,'kök aralıkta '+n);near(b.hi-b.lo,2**-n,1e-15);ok(Math.abs(b.mid-PHI)<=b.bound,'sınır '+n);near(b.bound,2**-(n+1),1e-15);}
 near(K.bisect(10).mid,1.61767578125,1e-15);}

// 2. Sabitlerin 60 basamağı (bilinen açılımlar) ve tam sayı cebiri
{const ref={phi:'1618033988749894848204586834365638117720309179805762862135448',sqrt2:'1414213562373095048801688724209698078569671875376948073176679',e:'2718281828459045235360287471352662497757247093699959574966967',pi:'3141592653589793238462643383279502884197169399375105820974944'},C=K.constants(),S=10n**70n,abs=x=>x<0n?-x:x;
 for(const k of Object.keys(ref))eq(C[k].toString().slice(0,61),ref[k],k);
 ok(abs(C.phi*C.phi-C.phi*S-S*S)<10n*S,'φ² = φ + 1 (70 basamak)');ok(abs(C.sqrt2*C.sqrt2-2n*S*S)<10n*S,'√2² = 2');}

// 3. Sürekli kesirler: bilinen açılımlar, Fibonacci yakınsakları, Hurwitz sabiti
{const f=K.contFrac('phi',30);eq(f.rows.length,30);ok(f.rows.every(r=>r.a===1),'φ = [1; 1, 1, …]');
 let a=0n,b=1n;for(const r of f.rows){[a,b]=[b,a+b];eq(r.p,b.toString());eq(r.q,a.toString());
  // |φ − F(n+1)/F(n)| = φ^(−n)/F(n)  ⇒  q²·hata = F(n)/φ^n  → 1/√5
  near(r.scaled,Number(a)/PHI**(r.k+1),1e-10,'ölçekli hata k='+r.k);}
 near(f.rows[29].scaled,1/Math.sqrt(5),1e-9);ok(f.rows.every((r,i)=>(r.scaled<K.HURWITZ)===(i%2===1)),'φ: tek sıralılar sınırın altında');near(K.contFrac('phi',30).digits,2*Math.log10(PHI),1e-6);
 ok(K.contFrac('sqrt2',30).rows.every((r,i)=>r.a===(i?2:1)),'√2 = [1; 2, 2, …]');
 eq(K.contFrac('e',30).rows.map(r=>r.a),[2,...Array.from({length:29},(_,i)=>i%3===1?2*(i+2)/3:1)]);
 eq(K.contFrac('pi',30).rows.map(r=>r.a),[3,7,15,1,292,1,1,1,2,1,3,1,14,2,1,1,2,2,2,2,1,84,2,1,1,15,3,13,1,4]);
 eq(K.contFrac('pi',4).rows.map(r=>r.p+'/'+r.q),['3/1','22/7','333/106','355/113']);near(K.contFrac('pi',4).rows[3].err,Math.abs(Math.PI-355/113),1e-6);
 const vals={phi:PHI,sqrt2:Math.SQRT2,e:Math.E,pi:Math.PI};
 for(const kind of Object.keys(vals)){const R=K.contFrac(kind,30).rows,x=vals[kind];near(K.contFrac(kind,5).value,x,1e-15);
  ok(R.every(r=>r.scaled<1),kind+': q²·hata < 1');for(let i=1;i<R.length;i++)ok(R[i].scaled<.5||R[i-1].scaled<.5,kind+': ardışık ikiliden biri < 1/2');for(let i=2;i<R.length;i++)ok(Math.min(R[i].scaled,R[i-1].scaled,R[i-2].scaled)<K.HURWITZ,kind+': ardışık üçlüden biri < 1/√5 (Borel)');
  ok(R.every((r,i)=>!i||r.sign!==R[i-1].sign),kind+': yakınsaklar sırayla alttan ve üstten');
  // Kaba kuvvet: yakınsak, paydası q'yu geçmeyen bütün kesirler içinde |q·x − p| değerini en küçük yapandır.
  for(const r of R){const q=+r.q,p=+r.p;if(q>3000||q<2)continue;const mine=Math.abs(q*x-p);let bestQ=0,best=Infinity;for(let d=1;d<=q;d++){const v=Math.abs(d*x-Math.round(d*x));if(v<best-1e-13){best=v;bestQ=d;}}eq(bestQ,q,kind+' en iyi payda '+q);near(mine,best,1e-9);near(r.err,Math.abs(x-p/q),Math.max(1e-6,1e-15/Math.abs(x-p/q)));}}
 // φ, dört sayı içinde her sırada en yavaş yakınsayandır (payda en küçük).
 for(const kind of['sqrt2','e','pi']){const R=K.contFrac(kind,30).rows;ok(R.every((r,i)=>i<2||BigInt(r.q)>=BigInt(f.rows[i].q)),kind+' paydaları φ’ninkinden büyük');ok(K.contFrac(kind,30).digits>f.digits,kind+' daha hızlı');}
 const t=K.contFrac('typed',60,'3,14159');ok(t.finite&&t.exact);const L=t.rows[t.rows.length-1];eq(BigInt(L.p)*100000n,BigInt(L.q)*314159n);eq(L.err,0);eq(L.scaled,0);
 eq(K.contFrac('typed',12,'1.618').rows.map(r=>r.a),[1,1,1,1,1,1,1,1,1,1,1,5]);eq(K.contFrac('typed',60,'0,75').rows.map(r=>r.a),[0,1,3]);eq(K.contFrac('typed',60,'2').rows.map(r=>r.a),[2]);
 for(const bad of['','abc','-1','1,2,3','0','1e5','1.'])eq(K.contFrac('typed',12,bad),null,'geçersiz: '+bad);
 assert.throws(()=>K.contFrac('zeta',5));checks++;assert.throws(()=>K.contFrac('phi',0));checks++;}

// 4. Kare kesme: alan korunumu, örtüşmezlik, Öklid algoritmasıyla kare sayısı, φ'de kendine benzerlik ve kararsızlık
{const euclid=(p,q)=>{let n=0;while(q){n+=Math.floor(p/q);[p,q]=[q,p%q];}return n;};
 for(const[p,q]of[[8,5],[3,2],[13,8],[7,4],[2,1],[12,5],[55,34],[23,10]]){const R=K.squareRemoval(p/q,40);ok(R.done,'rasyonel biter '+p+'/'+q);eq(R.squares.length,euclid(p,q),'kare sayısı = sürekli kesir terimleri toplamı');near(R.squares.reduce((s,c)=>s+c.s*c.s,0),p/q,1e-9);}
 for(const r of[PHI,Math.SQRT2,1.37,2.39,1.618034]){const R=K.squareRemoval(r,12);near(R.squares.reduce((s,c)=>s+c.s*c.s,0)+R.rest.w*R.rest.h,r,1e-12);
  for(const c of R.squares)ok(c.x>-1e-12&&c.y>-1e-12&&c.x+c.s<r+1e-12&&c.y+c.s<1+1e-12,'kare dikdörtgenin içinde');
  for(let i=0;i<R.squares.length;i++)for(let j=i+1;j<R.squares.length;j++){const a=R.squares[i],b=R.squares[j];ok(Math.min(a.x+a.s,b.x+b.s)-Math.max(a.x,b.x)<1e-9||Math.min(a.y+a.s,b.y+b.s)-Math.max(a.y,b.y)<1e-9,'kareler örtüşmez');}
  let x=r;for(const row of R.rows.slice(0,6)){near(row.ratio,x,1e-9*PHI**(2*row.step));x=x>=2?x-1:1/(x-1);}}
 const G=K.squareRemoval(PHI,14);ok(G.rows.every(r=>Math.abs(r.ratio-PHI)<1e-9),'φ: on dört adımda kendine benzer');G.rows.forEach((r,i)=>near(r.long,PHI**(1-i),1e-9));
 const D=K.squareRemoval(1.618034,14).rows.map(r=>r.ratio-PHI);for(let i=1;i<10;i++)near(D[i]/D[i-1],-PHI*PHI,.01,'sapma −φ² ile büyür');
 assert.throws(()=>K.squareRemoval(.9,3));checks++;}

// 5. Beşgen: 2cos36° = φ, dönmeden bağımsızlık, iç beşgenin yarıçapı R/φ²
for(const rot of[0,7,36,71.5])for(const R of[1,3.7]){const P=K.pentagon(rot,4,R);near(P.ds,2*Math.cos(Math.PI/5),1e-12);near(P.ds,PHI,1e-12);near(P.su,PHI,1e-11);near(P.um,PHI,1e-11);near(P.scale,PHI*PHI,1e-11);near(P.side,2*R*Math.sin(Math.PI/5),1e-12);near(P.diagonal,P.end+P.middle+P.end,1e-12);near(P.side,P.end+P.middle,1e-12);
 P.levels.forEach((L,l)=>L.forEach(v=>near(Math.hypot(v[0],v[1]),R/PHI**(2*l),1e-10)));for(let l=1;l<P.sides.length;l++)near(P.sides[l-1]/P.sides[l],PHI*PHI,1e-10);}

// 6. Dönen kareler ve çeyrek çemberler: döşeme, süreklilik, kutbun kapalı biçimi, sapmanın bağımsız hesabı
{const W=K.whirl(12);near(W.squares.reduce((s,c)=>s+c.s*c.s,0)+W.rest.w*W.rest.h,PHI,1e-12);W.squares.forEach((c,i)=>near(c.s,PHI**-i,1e-12));
 W.arcs.forEach((A,i)=>{const st=[A.cx+A.r*Math.cos(A.a0),A.cy+A.r*Math.sin(A.a0)],en=[A.cx+A.r*Math.cos(A.a1),A.cy+A.r*Math.sin(A.a1)];near(Math.hypot(st[0]-W.points[i][0],st[1]-W.points[i][1]),0,1e-12);near(Math.hypot(en[0]-W.points[i+1][0],en[1]-W.points[i+1][1]),0,1e-12);
  if(i){const B=W.arcs[i-1],J=W.points[i];near((B.cx-J[0])*(A.cy-J[1])-(B.cy-J[1])*(A.cx-J[0]),0,1e-12);}});// teğet süreklidir: iki merkez ve bağlantı noktası doğrusal
 // Kutup: büyük dikdörtgenin köşegeni ile kalan dikdörtgenin köşegeninin kesişimi (bağımsız yol)
 const x1=0,y1=1,x2=PHI,y2=0,x3=1,y3=0,x4=PHI,y4=1,den=(x1-x2)*(y3-y4)-(y1-y2)*(x3-x4),ix=((x1*y2-y1*x2)*(x3-x4)-(x1-x2)*(x3*y4-y3*x4))/den,iy=((x1*y2-y1*x2)*(y3-y4)-(y1-y2)*(x3*y4-y3*x4))/den;
 near(ix,PHI**3/(PHI*PHI+1),1e-12);near(iy,1/(PHI*PHI+1),1e-12);const A=K.arcProfile(8,400);near(A.pole[0],ix,2e-7);near(A.pole[1],iy,2e-7);A.ratios.forEach(r=>near(r,PHI,2e-6));
 // Sapma: ilk yay için kapalı biçimli kutupla, yoğun örnekleme (çekirdekten 50 kat sık)
 const r0=Math.hypot(ix,iy),th0=Math.atan2(-iy,-ix);let mx=-1,mn=1;for(let j=0;j<=20000;j++){const u=Math.PI-(Math.PI/2)*j/20000,X=1+Math.cos(u)-ix,Y=Math.sin(u)-iy;let d=th0-Math.atan2(Y,X);while(d<-1e-9)d+=2*Math.PI;const e=Math.hypot(X,Y)/(r0*PHI**(-d/(Math.PI/2)))-1;mx=Math.max(mx,e);mn=Math.min(mn,e);}
 near(A.max,mx,2e-6);near(A.min,mn,2e-6);ok(mx>.0110&&mx<.0112&&mn<-.0109&&mn>-.0111,'sapma ±%1,1');A.perArc.forEach(a=>{near(a.max,mx,2e-6);near(a.min,mn,2e-6);});
 for(let k=0;k<8;k++)near(A.dev[k*401],0,2e-6,'bağlantıda sapma sıfır');}

// 7. Logaritmik sarmal: kapalı biçimler, sabit açı, sonlu yay uzunluğu, kiriş hatasının analitik büyüklüğü
for(const g of[PHI**4,6.854102,3,1.5,1.2,12])for(const probe of[0,2,4.25,8]){const L=K.logSpiral(g,probe,1.203,3.3),b=Math.log(g)/(2*Math.PI),h=2*Math.PI/1440;
 near(L.measured.quarter,g**.25,1e-11);near(L.measured.turn,g,1e-11);near(L.r,1.203*g**(-probe/4),1e-11);
 const psi=Math.atan2(1,b)*180/Math.PI;near(L.theory.psi,psi,1e-12);near((L.measured.psi-psi)*Math.PI/180,b*h*h/3,.02*b*h*h/3+1e-12,'kiriş hatası b·h²/3');
 // ∫ sqrt(r² + r'²) dθ = r·sqrt(1+b²)/b (kutba kadar); bağımsız: Simpson ile sayısal integral
 let S=0;const N=20000,T=40/b,f=t=>L.r*Math.exp(-b*t)*Math.sqrt(1+b*b);for(let i=0;i<=N;i++)S+=(i===0||i===N?1:i%2?4:2)*f(T*i/N);S*=T/N/3;near(L.theory.length,S,1e-9);near(L.measured.length,S,3e-6);ok(L.measured.length<S,'çokgen yol eğriden kısadır');}
{const G=K.logSpiral(PHI**4,2);near(G.b,Math.log(PHI)/(Math.PI/2),1e-14);near(G.b,.3063489,1e-7);near(90-G.theory.psi,17.03239113,1e-8);near(PHI**4,6.854101966,1e-9);near(K.logSpiral(3,2).measured.quarter,1.316074,1e-6);assert.throws(()=>K.logSpiral(1,2));checks++;}

// 8. Vogel modeli: ızgara araması ile O(n²) kaba kuvvet aynı komşuyu bulur
const brute=(n,alpha)=>{const X=[],Y=[],a=alpha*Math.PI/180;for(let k=1;k<=n;k++){X[k]=Math.sqrt(k)*Math.cos(k*a);Y[k]=Math.sqrt(k)*Math.sin(k*a);}const idx=[],dist=[];let min=Infinity,sum=0;for(let i=1;i<=n;i++){let b=Infinity,bj=0;for(let j=1;j<=n;j++)if(j!==i){const d=Math.hypot(X[i]-X[j],Y[i]-Y[j]);if(d<b){b=d;bj=j;}}idx[i]=bj;dist[i]=b;min=Math.min(min,b);sum+=b;}return{idx,dist,min,mean:sum/n};};
const hex=Math.sqrt(2*Math.PI/Math.sqrt(3));near(K.HEX,hex,1e-15);
{// Altıgen örgünün yoğunluğu 1/π olmalı: büyük bir dairede nokta say
 let c=0;const Rr=60;for(let i=-80;i<=80;i++)for(let j=-80;j<=80;j++){const x=hex*(i+j/2),y=hex*j*Math.sqrt(3)/2;if(x*x+y*y<=Rr*Rr)c++;}near(c/(Math.PI*Rr*Rr),1/Math.PI,.01,'altıgen örgü yoğunluğu');}
for(const n of[2,50,137,400,1000])for(const alpha of[0,1,45,90,99.502,120,137.3,137.508,K.GOLDEN_ANGLE,144,151.136,180]){const B=brute(n,alpha),N=K.nearest(n,alpha);near(N.min,B.min,1e-12);near(N.mean,B.mean,1e-12);near(K.qMin(n,alpha),B.min/hex,1e-12);near(K.packing(n,alpha).qMin,B.min/hex,1e-12);
 for(let i=1;i<=n;i++){assert(Math.abs(N.dist[i]-B.dist[i])<1e-12);}checks++;}
{const fib=new Set([1,2,3,5,8,13,21,34,55,89,144,233,377]);
 for(let n=50;n<=1000;n+=50){const P=K.parastichy(n,K.GOLDEN_ANGLE);eq(P.kind,'fibonacci','altın açıda ardışık Fibonacci, n='+n);ok(fib.has(P.m1)&&fib.has(P.m2));const B=brute(n,K.GOLDEN_ANGLE);let all=true;for(let i=1;i<=n;i++)if(!fib.has(Math.abs(i-B.idx[i])))all=false;ok(all,'her tohumun en yakın komşusu Fibonacci kadar ötede, n='+n);near(K.qMin(n,K.GOLDEN_ANGLE),K.qMin(50,K.GOLDEN_ANGLE),1e-12,'Q n’den bağımsız');}
 const P=K.parastichy(500,137.508);eq([Math.min(P.m1,P.m2),Math.max(P.m1,P.m2)],[34,55]);eq(K.parastichy(1000,137.508).kind,'fibonacci');eq(K.parastichy(500,99.502).kind,'lucas');eq(K.parastichy(500,137.3).kind,null);
 for(let q=2;q<=12;q++)for(let p=1;p<=q/2;p++){let a=p,b=q;while(b)[a,b]=[b,a%b];if(a!==1)continue;const R=K.parastichy(500,360*p/q);eq(R.m1,q,'ışın sayısı '+p+'/'+q);eq(K.fracTurn(360*p/q),{p,q});ok(R.nn.qMin<.2,'ışınlarda paketleme çöker');}
 eq(K.parastichy(500,0).m2,null);eq(K.fracTurn(K.GOLDEN_ANGLE),null);eq(K.fracTurn(100),{p:5,q:18});eq(K.seqKind(55,34),'fibonacci');eq(K.seqKind(29,47),'lucas');eq(K.seqKind(21,97),null);eq(K.seqKind(8,21),null);
 const g=K.qMin(500,K.GOLDEN_ANGLE);near(g,.8410840554,1e-9);ok(g>K.qMin(500,99.5016)&&K.qMin(500,99.5016)>K.qMin(500,77.955)&&K.qMin(500,77.955)>.8,'soylu açılar sıralı');ok(K.qMin(500,137.3)<.6&&K.qMin(500,137.6)<.6,'tepe dar');
 let last=1;for(const n of[50,200,500,1000]){const S=K.scanFull(n);ok(S.best.q>=g-1e-12,'tarama altın açıdan kötü olamaz');const d=Math.abs(S.best.alpha-K.GOLDEN_ANGLE);ok(d<.1&&d<=last+1e-9,'en iyi açı altın açıya iner, n='+n+' fark '+d);last=d;ok(S.alpha.every((a,i)=>!i||a>=S.alpha[i-1]),'tarama sıralı');
  // Bağımsız kaba tarama: 1° adımda hiçbir açı daha iyi değil
  for(let a=1;a<=180;a+=1)ok(brute(Math.min(n,200),a).min/hex<=S.best.q+ (n>200?.01:1e-9),'kaba tarama '+a);}
 eq(K.nearRatios(.02),['8/5','13/8']);const five=[];for(let q=1;q<=10;q++)for(let p=q;p<=3*q;p++){let a=p,b=q;while(b)[a,b]=[b,a%b];if(a===1&&Math.abs(p/q/PHI-1)<=.05)five.push(p+'/'+q);}eq(K.nearRatios(.05),five);eq(five.length,5);
 assert.throws(()=>K.nearest(1,10));checks++;assert.throws(()=>K.qMin(10,NaN));checks++;}
console.log(`G altın oran: ${checks.toLocaleString('tr-TR')} bağımsız cebir, sürekli kesir, sarmal ve komşu araması kontrolü PASS`);

if(process.argv.includes('--browser')){
 const {chromium}=await import('playwright');const {createServer}=await import('node:http');const {join,extname}=await import('node:path');const {fileURLToPath}=await import('node:url');const root=fileURLToPath(new URL('../',import.meta.url));
 const server=createServer((req,res)=>{const file=join(root,decodeURIComponent(new URL(req.url,'http://localhost').pathname));if(!fs.existsSync(file)||fs.statSync(file).isDirectory()){res.writeHead(404).end();return;}res.setHeader('Content-Type',({'.html':'text/html; charset=utf-8','.js':'text/javascript; charset=utf-8','.css':'text/css; charset=utf-8'})[extname(file)]||'application/octet-stream');res.end(fs.readFileSync(file));});await new Promise(r=>server.listen(0,'127.0.0.1',r));let browser;
 try{browser=await chromium.launch();const before=checks;
  for(const[theme,width]of[['light',390],['dark',1280]]){const ctx=await browser.newContext({viewport:{width,height:900},deviceScaleFactor:width<500?2:1,locale:'tr-TR'});await ctx.addInitScript(t=>{localStorage.setItem('acelya-theme',t);localStorage.setItem('acelya-sound-muted','1');},theme);const page=await ctx.newPage();page.setDefaultTimeout(8000);const errors=[],foreign=[];page.on('pageerror',e=>errors.push(e.message));page.on('console',m=>{if(m.type()==='error')errors.push(m.text());});page.on('request',r=>{if(!/^(http:\/\/127\.0\.0\.1|data:|blob:|https:\/\/fonts\.(googleapis|gstatic)\.com\/)/.test(r.url()))foreign.push(r.url());/* yazı tipleri ortak temadan gelir; sayfanın kendisi dış kaynak yüklemez */});
   await page.goto(`http://127.0.0.1:${server.address().port}/altin-oran.html`);
   const click=id=>page.locator('#'+id).click(),read=async id=>(await page.locator('#'+id).textContent()).trim(),range=(id,v)=>page.locator('#'+id).evaluate((e,v)=>{e.value=v;e.dispatchEvent(new Event('input',{bubbles:true}));},v),type=async(id,v)=>{await page.locator('#'+id).fill(v);await page.locator('#'+id).dispatchEvent('change');},has=async(id,text)=>{const t=await read(id);assert(t.includes(text),`${id}: "${t}" içinde "${text}" yok`);checks++;},lacks=async(id,text)=>{const t=await read(id);assert(!t.includes(text),`${id}: "${t}" içinde "${text}" olmamalı`);checks++;},noflow=async tag=>{eq(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),true,'yatay taşma: '+tag);};
   eq(await page.title(),'Altın Oran: φ Sayısı, Sarmallar ve Yaprak Dizilimi');eq(await page.evaluate(()=>getComputedStyle(document.body).overflowY!=='hidden'&&!document.querySelector('script[src^="http"]')),true);
   // Her denetimin etiketi, her tuvalin adı var
   eq(await page.evaluate(()=>[...document.querySelectorAll('main input,main select')].filter(e=>!(e.labels&&e.labels.length)).map(e=>e.id)),[]);eq(await page.evaluate(()=>[...document.querySelectorAll('main canvas')].filter(c=>c.getAttribute('role')!=='img'||!c.getAttribute('aria-label')).length),0);eq(await page.evaluate(()=>[...document.querySelectorAll('main button')].filter(b=>!b.textContent.trim()).length),0);
   // Sekme 1 · varsayılan
   await has('segAB','2,333333');await has('segWA','1,428571');await has('segDiff','0,904762');await has('phiClosed','1,618033988750');await has('bisMid','1,617675781250');await has('bisErr','0,000358');await has('bisBound','sınırın içinde');await has('segStatus','sola kaydır');
   await click('cutGolden');await has('segAB','1,618034');await has('segWA','1,618034');await has('segDiff','1,07 × 10⁻⁷');await has('segStatus','altı basamakta eşit');eq(await page.locator('#cutBox').inputValue(),'0,618034');
   await click('cutHalf');await has('segAB','1,000000');await has('segWA','2,000000');await has('segStatus','sağa kaydır');await range('cut',.95);await has('segAB','19,000000');await has('cutOut','0,950');
   await type('cutBox','0.6');await has('segAB','1,500000');eq(await page.locator('#cutBox').inputValue(),'0,6');await page.locator('#cutBox').fill('abc');eq(await page.locator('#cutBox').getAttribute('aria-invalid'),'true');await has('segAB','1,500000');await page.locator('#cutBox').dispatchEvent('change');eq(await page.locator('#cutBox').inputValue(),'0,6');await type('cutBox','7');eq(await page.locator('#cutBox').inputValue(),'0,95');
   await page.locator('#segCanvas').focus();await click('cutGolden');await page.locator('#segCanvas').focus();await page.keyboard.press('ArrowRight');await has('cutOut','0,619');await page.keyboard.press('ArrowLeft');await has('segAB','1,618034');
   await range('bisN',1);await has('bisMid','1,750000000000');await range('bisN',40);await has('bisBound','sınırın içinde');await has('bisErr','× 10⁻¹³');
   await has('rectLast','1,618034');await has('rectStatus','kendi küçük kopyasını');await page.locator('#rectKind').selectOption('f85');await has('rectStatus','5. adımda tam bir kareyle bitti');await has('rectLast','Kalan yok');await has('rectRows','tam kare: bitti');await page.locator('#rectKind').selectOption('dec');await range('rectSteps',14);await has('rectLast','1,626058');await has('rectStatus','Kendine benzerlik yok');await has('rectStatus','1,6150 → 1,6261');
   await page.locator('#rectKind').selectOption('custom');eq(await page.locator('#rectRatio').isDisabled(),false);await range('rectRatio',2.4);await has('rectFirst','2,400000');await range('rectRatio',1.2);await has('rectFirst','1,200000');await page.locator('#rectKind').selectOption('sqrt2');eq(await page.locator('#rectRatio').isDisabled(),true);await has('rectRows','2,414214');await range('rectSteps',1);await has('rectLast','2,414214');
   await has('pentDS','1,618033989');await has('pentScale','2,618033989');await range('pentRot',72);await range('pentDepth',4);await has('pentSU','1,618033989');await has('pentUM','1,618033989');await range('pentDepth',1);await has('pentDS','1,618033989');
   await has('cfExp','[1; 1, 1, 1, 1, 1, 1, 1, 1, …]');await has('cfLast','0,447209');await has('cfBelow','6 / 12');await has('cfDigits','0,4179');await has('cfDigitsT','0,4180');await has('cfRows','233');await has('cfStatus','Fibonacci');eq(await page.locator('#cfTyped').isDisabled(),true);
   await page.locator('#cfKind').selectOption('pi');await has('cfExp','[3; 7, 15, 1, 292');await has('cfRows','355');await has('cfRows','2,67 × 10⁻⁷');await has('cfStatus','En büyük terim 292');await range('cfTerms',30);await has('cfBelow','/ 30');await range('cfTerms',4);await has('cfLast','0,003406');
   await range('cfTerms',12);await page.locator('#cfKind').selectOption('e');await has('cfExp','[2; 1, 2, 1, 1, 4, 1, 1, 6');await page.locator('#cfKind').selectOption('sqrt2');await range('cfTerms',12);await has('cfLast','0,353553');
   await page.locator('#cfKind').selectOption('typed');eq(await page.locator('#cfTyped').isDisabled(),false);await has('cfStatus','rasyonel');await has('cfStatus','809/500');await has('cfLast','0');await page.locator('#cfTyped').fill('3.14');await has('cfExp','[3; 7, 7]');await page.locator('#cfTyped').fill('x');await has('cfStatus','okunamadı');await has('cfExp','—');eq(await page.locator('#cfTyped').getAttribute('aria-invalid'),'true');await page.locator('#cfTyped').fill('1,4142135623730950488');await has('cfExp','[1; 2, 2, 2, 2');
   await noflow('phi');await click('phiReset');await has('segAB','2,333333');await has('cfExp','[1; 1, 1');await has('rectLast','1,618034');eq(await page.locator('#rectSteps').inputValue(),'8');eq(await page.locator('#cfTyped').inputValue(),'1,618');
   // Tuval üzerinde tekerlek sayfayı kaydırır (eski sayfanın kusuru)
   if(width>500){await page.locator('#rectCanvas').scrollIntoViewIfNeeded();const y0=await page.evaluate(()=>scrollY);await page.locator('#rectCanvas').hover();await page.mouse.wheel(0,400);await page.waitForTimeout(250);ok(await page.evaluate(()=>scrollY)>y0+100,'tuval tekerleği yutmamalı');await page.evaluate(()=>scrollTo(0,0));}
   // Sekme 2
   await click('tab-spiral');await has('spQuarter','1,618034');await has('spTurn','6,854102');await has('spPsi','72,9677°');await has('spPsiT','72,9676°');await has('spPsiT','kuram 17,0324°');await has('spLen','1,568748');await has('spLenT','1,568749');await has('spDev','+%1,109 / −%1,097');await has('spJoint','1,618034');await has('spJointT','1,170820');await has('spStatus','Altın sarmal');
   await range('probe',8);await has('spPsi','72,9677°');await has('spQuarter','1,618034');await range('probe',0);await has('spLen','4,107035');await has('spPsi','72,9677°');
   await click('spNautilus');await has('spQuarter','1,316074');await has('spTurn','3,000000');await has('spPsi','80,0822°');await has('spStatus','altın değil');await has('spStatus','öğretim değeri');eq(await page.locator('#growthBox').inputValue(),'3');await click('spTight');await has('spQuarter','1,106682');await lacks('spStatus','öğretim değeri');
   await range('growth',12);await has('spTurn','12,000000');await range('growth',1.2);await has('spQuarter','1,046635');await has('spPsi','88,3379°');await type('growthBox','6,854');await has('spQuarter','1,618028');await has('spStatus','altın değil');await has('spStatus','1,618028 katına çıkıyor (φ = 1,618034 değil)');await has('spStatus','1,000015 katı');await type('growthBox','6.854102');await has('spStatus','Altın sarmal');await type('growthBox','99');eq(await page.locator('#growthBox').inputValue(),'12');
   await page.locator('#showArcs').uncheck();await page.locator('#showArcs').check();await noflow('spiral');await click('spNautilus');await click('spiralReset');await has('spTurn','6,854102');eq(await page.locator('#probe').inputValue(),'2');eq(await page.locator('#growthBox').inputValue(),'6,854102');
   // Sekme 3
   await click('tab-leaf');await has('leafFam','34 ve 55');await has('leafFamT','ardışık Fibonacci sayıları');await has('leafQ','0,8411');await has('leafMean','0,8898');await has('leafStatus','Altın açı');await has('leafStatus','1. ve 4. tohumun arasıdır (uzaklık 1,6020)');await page.waitForFunction(()=>!document.getElementById('leafBest').textContent.includes('taranıyor'));await has('leafBest','137,518° · Q = 0,8414');await has('leafBestT','137,5078°');await has('leafBestT','altın açı 360°/φ²');await lacks('leafBestT','kuram');
   await click('leafQuarter');await has('leafFam','4 ışın');await has('leafFamT','sarmal ailesi yok');await has('leafStatus','turun tam 1/4 katı');await has('leafStatus','4 ışına');await has('leafQ','0,0471');await click('leafFifth');await has('leafStatus','2/5');await has('leafQ','0,0588');await click('leafNear');await has('leafFam','21 kol (ikinci aile zayıf: 97)');await has('leafFamT','yalnız 21 kol seçiliyor');await lacks('leafFam','21 ve 97');await has('leafQ','0,5773');await has('leafStatus','zayıf');await has('leafStatus','8/21');
   await click('leafLucas');await has('leafFam','29 ve 47');await has('leafFamT','Lucas');await has('leafQ','0,8262');await click('leafGolden');await click('alphaPlus');await has('alphaOut','137,518°');await click('alphaMinus');await click('alphaMinus');await has('alphaOut','137,498°');await has('leafQ','0,8172');
   await range('alpha',0);await has('leafFam','1 ışın');await range('alpha',1);await has('leafFam','tek aile');await range('alpha',0);await has('leafStatus','1 ışına');await range('alpha',180);await has('leafStatus','1/2');await type('alphaBox','137.508');await has('leafFam','34 ve 55');await type('alphaBox','500');eq(await page.locator('#alphaBox').inputValue(),'180');
   await click('leafGolden');await range('seeds',50);await has('leafFam','8 ve 13');await has('leafQ','0,8411');await page.waitForFunction(()=>!document.getElementById('leafBest').textContent.includes('taranıyor'));await has('leafBest','137,580°');await range('seeds',1000);await has('leafFam','55 ve 89');await page.waitForFunction(()=>!document.getElementById('leafBest').textContent.includes('taranıyor'));await has('leafBest','137,512°');
   await page.locator('#showFam').uncheck();await noflow('leaf');await click('leafReset');await has('seedsOut','500');await has('leafFam','34 ve 55');eq(await page.locator('#showFam').isChecked(),true);await page.waitForFunction(()=>!document.getElementById('leafBest').textContent.includes('taranıyor'));
   // Klavye: sekmeler ve R
   await page.locator('#tab-leaf').focus();await page.keyboard.press('Home');eq(await page.locator('#tab-phi').getAttribute('aria-selected'),'true');await page.keyboard.press('ArrowRight');eq(await page.locator('#tab-spiral').getAttribute('aria-selected'),'true');eq(await page.locator('#panel-spiral').isVisible(),true);await page.keyboard.press('End');eq(await page.locator('#tab-leaf').getAttribute('aria-selected'),'true');await page.keyboard.press('ArrowRight');eq(await page.locator('#tab-phi').getAttribute('aria-selected'),'true');await page.keyboard.press('ArrowLeft');eq(await page.locator('#tab-leaf').getAttribute('aria-selected'),'true');
   await click('leafQuarter');await page.locator('h1').click();await page.keyboard.press('r');await has('alphaOut','137,508°');await click('leafQuarter');await page.locator('#alphaBox').focus();await page.keyboard.press('r');await has('alphaOut','90°');await click('leafReset');
   await has('mythTol','8/5, 13/8');await has('mythTol','5 tanesi');
   eq(await page.evaluate(()=>Object.isFrozen(GoldenLab)&&!Object.getOwnPropertyDescriptor(window,'GoldenLab').writable),true);
   // Tuvaller gerçekten çizilmiş (tek renk değil)
   for(const[tabId,ids]of[['tab-phi',['segCanvas','rectCanvas','pentCanvas','cfCanvas']],['tab-spiral',['spCanvas','spChart','spDevChart']],['tab-leaf',['leafCanvas','leafChart','leafZoom']]]){await click(tabId);await page.waitForTimeout(300);for(const id of ids)ok(assertCanvasDrawn(await canvasInk(page,'#'+id),{minDistinct:4,label:id}),id+' boş');await noflow(tabId);}
   assert.deepEqual(errors,[]);checks++;assert.deepEqual(foreign,[]);checks++;await ctx.close();}
  console.log(`G altın oran: ${checks-before} tarayıcı kontrolü (390 px aydınlık + 1280 px koyu; sekmeler, hazır ayarlar, sınırlar, klavye, taşma) PASS`);
 }finally{await browser?.close();await new Promise(r=>{server.closeAllConnections?.();server.close(r);});}
}
