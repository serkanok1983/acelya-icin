// Kalıcı denetim: hareket-ve-grafikler.html çekirdeği (window.MotionGraphLab) bağımsız referanslara karşı sınanır.
// Referanslar sayfanın formüllerini yeniden kullanmaz: hareket burada küçük adımlı bir Verlet integratörüyle yeniden
// kurulur, dönüş anları ince ızgarada işaret değişimi + ikiye bölme ile, yol kaba kuvvet toplamıyla, Riemann toplamları
// ayrı bir döngüyle, Savitzky–Golay katsayıları normal denklemlerin Gauss eleme çözümüyle, gürültü kuramı çok tohumlu
// Monte Carlo ortalamasıyla, bulmaca uyuşmazlığı 10⁵ noktalı orta nokta toplamıyla bulunur. `--browser`: Playwright UI denetimi.
import fs from 'node:fs';
import vm from 'node:vm';
import assert from 'node:assert/strict';
const SLUG='hareket-ve-grafikler';
const html=fs.readFileSync(new URL(`../${SLUG}.html`,import.meta.url),'utf8');
const source=html.split('/* KERNEL-BEGIN */')[1]?.split('/* KERNEL-END */')[0];
assert(source,'Çekirdek sınır işaretleri gerekli');
const context={window:{}};vm.createContext(context);vm.runInContext(source,context);
const K=context.window.MotionGraphLab;assert(Object.isFrozen(K));
let checks=0;
const near=(actual,expected,tol=1e-9,label='')=>{assert(Math.abs(actual-expected)<=tol*Math.max(1,Math.abs(expected)),`${label} ${actual} ≠ ${expected}`);checks++;};
const ok=(cond,label)=>{assert(cond,label);checks++;};

/* ── Bağımsız hareket: a(t) parça parça doğrusal, Verlet (hız-Verlet, a yalnız t'ye bağlı → ikinci mertebe) ── */
function verlet(spec,h=2e-4){let x=spec.x0??0,v=spec.v0??0,t0=0;const out=[[0,x,v]];
  for(const sg of spec.segs){const a1s=sg.a1??sg.a0,acc=u=>sg.a0+(a1s-sg.a0)*u/sg.T,n=Math.max(1,Math.round(sg.T/h)),dt=sg.T/n;
    for(let i=0;i<n;i++){const u=i*dt,a0=acc(u),am=acc(u+dt/2),a1=acc(u+dt);x+=v*dt+dt*dt*(a0+2*am)/6;v+=dt*(a0+4*am+a1)/6;out.push([t0+(i+1)*dt,x,v]);}t0+=sg.T;}
  return{pts:out,T:t0};}
// not: doğrusal a için x adımı dt²(a₀ + 2a_m)/6, v adımı Simpson kuralı: ikisi de bu sınıfta tamdır; yalnız adım sınırları sayfadan bağımsızdır.
const specs=[
  {x0:0,v0:0,segs:[{T:3,a0:0,a1:2},{T:3,a0:0,a1:0},{T:4,a0:-2,a1:-2}]},
  {x0:0,v0:0,segs:[{T:4,a0:1.5},{T:3,a0:-2},{T:3,a0:0}]},
  {x0:0,v0:15,segs:[{T:3,a0:-9.81}]},
  {x0:-4,v0:2,segs:[{T:4,a0:0},{T:1,a0:-4},{T:4,a0:0}]},
  {x0:7,v0:-3,segs:[{T:2.5,a0:4,a1:-6},{T:1.2,a0:-1,a1:3},{T:.7,a0:10},{T:5,a0:-.3,a1:.9}]}];
for(const sp of specs){const m=K.build(sp),R=verlet(sp);near(m.T,R.T,1e-12,'toplam süre');
  for(const[t,x,v]of R.pts.filter((_,i)=>i%97===0)){const e=K.at(m,t);near(e.x,x,1e-9,'x(t) Verlet');near(e.v,v,1e-9,'v(t) Verlet');}
  // dönüş anları: ızgarada işaret değişimi + ikiye bölme; duruş aralıkları atlanır
  const vv=t=>K.at(m,t).v,ref=[],N=20000,sg=t=>{const v=vv(t);return Math.abs(v)<1e-10?0:Math.sign(v);};let lastS=0,lastT=0;
  for(let i=0;i<=N;i++){const t=m.T*i/N,s=sg(t);if(!s)continue;if(lastS&&s!==lastS){let lo=lastT,hi=t;for(let it=0;it<80;it++){const md=(lo+hi)/2;if(sg(md)===lastS)lo=md;else hi=md;}ref.push((lo+hi)/2);}lastS=s;lastT=t;}
  const tr=K.turnarounds(m);ok(tr.length===ref.length,`dönüş sayısı ${tr.length} ≠ ${ref.length}`);tr.forEach((t,i)=>near(t,ref[i],1e-6,'dönüş anı'));
  // yol: ince ızgarada Σ|Δx|; yer değiştirme
  for(const[ta,tb]of[[0,m.T],[0,m.T*.37],[m.T*.2,m.T*.9]]){let s=0,px=K.at(m,ta).x;const n=200000;for(let i=1;i<=n;i++){const x=K.at(m,ta+(tb-ta)*i/n).x;s+=Math.abs(x-px);px=x;}near(K.pathLength(m,ta,tb),s,1e-7,'yol');ok(K.pathLength(m,ta,tb)>=Math.abs(K.at(m,tb).x-K.at(m,ta).x)-1e-12,'yol ≥ |Δx|');}}
{const m=K.build(specs[0]);near(K.turnarounds(m)[0],7.5,1e-12);near(K.pathLength(m,0,10),20.5,1e-12);near(m.xEnd,8,1e-12);near(m.vEnd,-5,1e-12);
 const b=K.build(specs[2]);near(K.turnarounds(b)[0],15/9.81,1e-12,'tepe anı v₀/g');near(K.pathLength(b,0,3),2*15*15/(2*9.81)-(15*3-9.81*9/2),1e-12,'top yolu');
 ok(K.turnarounds(K.build(specs[1])).length===0,'dur-bekle dönüş değil');}

/* ── Sonlu fark: Taylor kuramı ve mertebe ── */
for(const sp of specs){const m=K.build(sp);for(let k=0;k<60;k++){const t=m.T*(k+.5)/60;for(const h of[.2,.05,.01]){
  const F=K.slope(m,t,h,'forward'),C=K.slope(m,t,h,'central'),B=K.slope(m,t,h,'backward');const x=u=>K.at(m,u).x,v=K.at(m,t).v;
  if(F.ok){near(F.est,(x(t+h)-x(t))/h,1e-9,'ileri');if(!F.straddle)near(F.err,F.theory,1e-6,'ileri kuram');}
  if(B.ok){near(B.est,(x(t)-x(t-h))/h,1e-9,'geri');if(!B.straddle)near(B.err,B.theory,1e-6,'geri kuram');}
  if(C.ok){near(C.est,(x(t+h)-x(t-h))/(2*h),1e-9,'merkezî');if(!C.straddle){near(C.err,C.theory,1e-6,'merkezî kuram');const C2=K.slope(m,t,h/2,'central');if(Math.abs(C.err)>1e-8)near(C.err/C2.err,4,1e-6,'merkezî mertebe 2');}}
  ok(!F.ok||Math.abs(F.exact-v)<1e-12,'kesin v');}}}
{const m=K.build(specs[0]),F=K.slope(m,1.5,.2,'forward'),C=K.slope(m,1.5,.2,'central');near(F.err,1*.1+(2/3)*.04/6,1e-12,'varsayılan ileri hata');near(C.err,(2/3)*.04/6,1e-10,'varsayılan merkezî hata');
 ok(!K.slope(m,9.9,.2,'central').ok&&!K.slope(m,.1,.2,'central').ok&&K.slope(m,.1,.2,'forward').ok,'aralık dışı tanımsız');ok(K.slope(m,3,.2,'central').straddle,'sıçrama aşılır');near(K.slope(m,3,.2,'central').err,(-2)*.2/4+ -(2/3)*0,2e-2,'sıçramada hata ≈ Δa·h/4');}

/* ── Riemann toplamları: ayrı döngü; kapalı biçimler ── */
for(const sp of specs){const m=K.build(sp);for(const[ta,tb]of[[0,m.T],[m.T*.13,m.T*.81]])for(const n of[1,3,10,64])for(const rule of['left','right','mid'])for(const q of['v','a']){
  const h=(tb-ta)/n;let s=0;for(let i=0;i<n;i++){const t=ta+(i+(rule==='left'?0:rule==='right'?1:.5))*h;const eps=rule==='right'?-1e-9*h:1e-12;s+=K.at(m,Math.min(m.T,Math.max(0,t+eps)))[q];}
  const r=K.riemann(m,ta,tb,n,rule,q);near(r.sum,s*h,1e-6,'Riemann');near(r.exact,q==='v'?K.at(m,tb).x-K.at(m,ta).x:K.at(m,tb).v-K.at(m,ta).v,1e-12);}}
// sabit ivmede sol kural hatası tam −a·h·(tb−ta)/2, orta nokta tam
for(const a of[-3,.5,2])for(const n of[1,5,40]){const m=K.build({x0:1,v0:-2,segs:[{T:6,a0:a}]});near(K.riemann(m,0,6,n,'left','v').sum-K.riemann(m,0,6,n,'left','v').exact,-a*(6/n)*6/2,1e-9,'sol hata');near(K.riemann(m,0,6,n,'mid','v').sum,K.riemann(m,0,6,n,'mid','v').exact,1e-12,'orta tam');}
// değişken ivme (kübik x): orta nokta hatası (tb−ta)·h²·j/24·… → mertebe 2
{const m=K.build({x0:0,v0:0,segs:[{T:4,a0:-1,a1:3}]}),e=n=>K.riemann(m,0,4,n,'mid','v').sum-K.riemann(m,0,4,n,'mid','v').exact;near(e(8)/e(16),4,1e-9,'orta mertebe');near(e(8),-(1)*4*(.5**2)/24,1e-9,'orta hata = −j·L·h²/24');}

/* ── Sabit ivme denklemleri ve RK4 ── */
for(const sp of specs){const m=K.build(sp),R=verlet(sp);m.segs.forEach((s,k)=>{const KN=K.kinematics(m,k);const idx=R.pts.findIndex(p=>Math.abs(p[0]-s.t1)<1e-9);near(KN.x,R.pts[idx][1],1e-8,'RK4 x');near(KN.v,R.pts[idx][2],1e-8,'RK4 v');
  near(KN.rows[0].pred,KN.rows[0].meas,1e-9,'v = v₀ + aT (ortalama a ile her zaman)');if(KN.constA)KN.rows.forEach(r=>near(r.pred,r.meas,1e-9,'sabit a: '+r.eq));else{near(KN.rows[1].pred-KN.rows[1].meas,s.j*s.T**3/12,1e-9,'jT³/12');near(KN.rows[3].pred-KN.rows[3].meas,s.j*s.T**3/12,1e-9);}});}

/* ── Sensör: süzgeç katsayıları ve gürültü ── */
function lsq(m,deg){// normal denklemler, Gauss eleme: i = −m..m, kuvvetler 0..deg; türev katsayıları
  const rows=[];for(let i=-m;i<=m;i++)rows.push(Array.from({length:deg+1},(_,p)=>i**p));const n=deg+1,N=Array.from({length:n},(_,a)=>Array.from({length:n},(_,b)=>rows.reduce((s,r)=>s+r[a]*r[b],0)));
  const inv=N.map((r,i)=>[...r,...Array.from({length:n},(_,j)=>+(i===j))]);for(let c=0;c<n;c++){let p=c;for(let r=c+1;r<n;r++)if(Math.abs(inv[r][c])>Math.abs(inv[p][c]))p=r;[inv[c],inv[p]]=[inv[p],inv[c]];const d=inv[c][c];inv[c]=inv[c].map(v=>v/d);for(let r=0;r<n;r++)if(r!==c){const f=inv[r][c];inv[r]=inv[r].map((v,j)=>v-f*inv[c][j]);}}
  const I=inv.map(r=>r.slice(n));return p=>rows.map(r=>r.reduce((s,v,b)=>s+I[p][b]*v,0));}
for(const w of[3,5,7,15,31])for(const dt of[.01,.05]){const F=K.filters('sg',w,dt),m=(w-1)/2,c1=lsq(m,2)(1),c2=lsq(m,2)(2);F.v.off.forEach((o,i)=>near(F.v.c[i],c1[o+m]/dt,1e-9,'SG v katsayısı'));F.a.off.forEach((o,i)=>near(F.a.c[i],2*c2[o+m]/(dt*dt),1e-7,'SG a katsayısı'));near(F.v.lag,0,1e-12);
  const T=K.filters('trail',w,dt);near(T.v.lag,(w-1)*dt/2,1e-9,'geriye dönük gecikme');near(T.v.norm,Math.SQRT2/(w*dt),1e-9,'MA gürültü normu');near(K.filters('center',w,dt).v.lag,0,1e-12);}
{const F=K.filters('none',1,.05);near(F.v.norm,Math.SQRT2/.05,1e-12,'√2/Δt');near(F.a.norm,Math.sqrt(6)/.0025,1e-9,'√6/Δt²');}
// gürültü: 60 tohum ortalaması kurama oturur (tek tohum ±15 % olabilir)
for(const meth of['none','trail','center','sg'])for(const[f,sig]of[[20,.001],[50,.004]]){let a=0,b=0,c=0,d=0;const n=60;for(let seed=1;seed<=n;seed++){const r=K.sense({profile:'constant',f,sigma:sig,seed,method:meth,w:7,lag:false}),E=meth==='none'?r.rawV:r.smV,A=meth==='none'?r.rawA:r.smA;a+=E.noiseRms**2;b+=E.noiseTh**2;c+=A.noiseRms**2;d+=A.noiseTh**2;}
  ok(Math.abs(Math.sqrt(a/b)-1)<.04,`${meth} v gürültüsü ${Math.sqrt(a/b)}`);ok(Math.abs(Math.sqrt(c/d)-1)<.06,`${meth} a gürültüsü ${Math.sqrt(c/d)}`);}
// gürültü bağımsız yeniden üretim: ham fark std'si; kesme hatası sinc kapalı biçimi; gecikme
{const r=K.sense({profile:'spring',f:20,sigma:.001,seed:1});const nz=r.xs.map((x,i)=>x-r.clean[i]),dv=[];for(let i=0;i+1<nz.length;i++)dv.push((nz[i+1]-nz[i])*20);near(r.rawV.noiseRms,Math.sqrt(dv.reduce((s,x)=>s+x*x,0)/dv.length),1e-12,'ham v gürültüsü');
 let bs=0,nn=0;for(let i=0;i+1<r.clean.length;i++){const tm=(i+.5)/20,e=(r.clean[i+1]-r.clean[i])*20-.25*Math.PI*Math.cos(Math.PI*tm);bs+=e*e;nn++;}near(r.rawV.biasRms,Math.sqrt(bs/nn),1e-12);near(r.rawV.biasTh,r.rawV.biasRms,1e-9,'sinc kesme kuramı (tam periyotlar)');
 for(const w of[3,7,15]){const q=K.sense({profile:'incline',f:20,sigma:0,seed:1,method:'trail',w});near(q.smV.lagMeas,(w-1)/40,1e-6,'eğik rayda gecikme');near(q.smV.totRms,.4*(w-1)/40,1e-9,'gecikme yanlılığı = a·τ');}
 const s=K.sense({profile:'incline',f:30,sigma:0,method:'sg',w:9});near(s.smV.totRms,0,1e-9,'SG parabolde tam');near(s.smA.totRms,0,1e-7);}
// optimum f: kuram eğrisinin kaba kuvvet minimumu
for(const sig of[.0005,.001,.004]){const P=K.PROFILES.spring;let best=0,bv=Infinity;for(let f=1;f<=200;f+=.01){const dt=1/f,z=P.w*dt/2,e=2*sig*sig*f*f+(P.A*P.w*(1-Math.sin(z)/z))**2/2;if(e<bv){bv=e;best=f;}}ok(Math.abs(K.optimumF('spring',sig)/best-1)<.05,`optimum f ${K.optimumF('spring',sig)} ~ ${best}`);}
ok(K.optimumF('incline',.001)===null&&K.optimumF('spring',0)===null);
{const A=K.rng(7),B=K.rng(7);let s=0,q=0;const n=40000;for(let i=0;i<n;i++){const g=A.gauss();assert(g===B.gauss());s+=g;q+=g*g;}ok(Math.abs(s/n)<.02&&Math.abs(q/n-1)<.03,'Gauss');}

/* ── Bulmaca ── */
for(let level=1;level<=5;level++)for(let seed=1;seed<=60;seed++){const pz=K.puzzle(level,seed),p=pz.params,L=K.LEVELS[level];
  for(const k of L.free){const[lo,hi,st]=k[0]==='a'?K.GRID.a:K.GRID[k];ok(p[k]>=lo&&p[k]<=hi&&Math.abs((p[k]-lo)/st-Math.round((p[k]-lo)/st))<1e-12,'ızgarada');}
  const m=pz.model,turns=K.turnarounds(m).length;if(level>=3)ok(turns>=1,`düzey ${level} dönüş içerir`);if(level===1)ok(p.v0!==0);
  near(K.mismatch(level,p,p).rms,0,0,'kendisiyle sıfır');
  if(seed<=6){const u={x0:0,v0:0,a1:0,a2:.5,a3:-1,a4:2},mm=K.mismatch(level,p,u),mu=K.build(K.puzzleSpec(level,u)),q=pz.kind;let s=0;const n=100000;for(let i=0;i<n;i++){const t=m.T*(i+.5)/n,d=K.at(mu,t)[q]-K.at(m,t)[q];s+=d*d;}near(mm.rms,Math.sqrt(s/n),1e-6,'RMS orta nokta');}}
ok(K.puzzle(3,5).params.a1===K.puzzle(3,5).params.a1&&JSON.stringify(K.puzzle(2,9).params)===JSON.stringify(K.puzzle(2,9).params),'belirlenimli');
// sınırlar
for(const bad of[{segs:[]},{segs:[{T:0,a0:1}]},{segs:[{T:1,a0:30}]},{segs:Array(7).fill({T:1,a0:0})},{segs:[{T:20,a0:0},{T:20,a0:0},{T:20,a0:0},{T:1,a0:0}]},{x0:NaN,segs:[{T:1,a0:0}]}]){assert.throws(()=>K.build(bad));checks++;}
console.log(`G ${SLUG}: ${checks.toLocaleString('tr-TR')} bağımsız Verlet, kaba kuvvet, kapalı biçim ve Monte Carlo kontrolü PASS`);

if(process.argv.includes('--browser')){
 const {chromium}=await import('playwright');const {createServer}=await import('node:http');const {join,extname}=await import('node:path');const {fileURLToPath}=await import('node:url');const root=fileURLToPath(new URL('../',import.meta.url));
 const server=createServer((req,res)=>{const file=join(root,decodeURIComponent(new URL(req.url,'http://localhost').pathname));if(!file.startsWith(root)||!fs.existsSync(file)||fs.statSync(file).isDirectory()){res.writeHead(404).end();return;}res.setHeader('Content-Type',({'.html':'text/html; charset=utf-8','.js':'text/javascript; charset=utf-8','.css':'text/css; charset=utf-8'})[extname(file)]||'application/octet-stream');res.end(fs.readFileSync(file));});await new Promise(r=>server.listen(0,'127.0.0.1',r));let browser;const before=checks;
 try{browser=await chromium.launch();
  for(const[width,theme]of[[390,'light'],[1280,'dark']]){
   const ctx=await browser.newContext({viewport:{width,height:900},deviceScaleFactor:width<500?2:1});const page=await ctx.newPage();await page.addInitScript(t=>{localStorage.setItem('acelya-theme',t);localStorage.setItem('acelya-sound-muted','1');},theme);page.setDefaultTimeout(8000);const errors=[];page.on('pageerror',e=>errors.push(e.message));page.on('console',m=>{if(m.type()==='error')errors.push(m.text());});page.on('response',r=>{if(r.status()>=400)errors.push(r.status()+' '+r.url());});
   await page.goto(`http://127.0.0.1:${server.address().port}/${SLUG}.html`);await page.waitForFunction(()=>window.MotionGraphLabUI&&document.getElementById('r1x').textContent!=='—');
   const click=id=>page.locator('#'+id).click(),read=id=>page.locator('#'+id).textContent(),set=(id,v)=>page.locator('#'+id).evaluate((e,v)=>{e.value=v;e.dispatchEvent(new Event(e.tagName==='SELECT'?'change':'input',{bubbles:true}));},v),has=async(id,text)=>{const t=await read(id);assert(t.includes(text),`[${width}] #${id}: "${t}" içinde "${text}" yok`);checks++;},noOverflow=async label=>{ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),`[${width}] yatay taşma: ${label}`);};
   const panelOverflow=async label=>ok(await page.evaluate(()=>[...document.querySelectorAll('section:not([hidden]) .mg-panel input, section:not([hidden]) .mg-panel select')].every(e=>{const r=e.getBoundingClientRect(),p=e.closest('.mg-panel').getBoundingClientRect();return r.width===0||r.right<=p.right+1;})),`[${width}] panel içinde taşma: ${label}`);
   ok(await page.evaluate(()=>[...document.querySelectorAll('.app-content input,.app-content select')].every(e=>e.id&&document.querySelector(`label[for="${e.id}"]`))),'her denetimde label');
   ok(await page.evaluate(()=>[...document.querySelectorAll('.app-content canvas')].every(c=>c.getAttribute('role')==='img'&&c.getAttribute('aria-label'))),'tuval rolleri');
   ok(await page.evaluate(()=>Object.isFrozen(MotionGraphLab)&&!Object.getOwnPropertyDescriptor(window,'MotionGraphLab').writable),'çekirdek salt okunur');
   ok(await page.evaluate(()=>[...document.querySelectorAll('.app-content input[type=range]')].every(e=>{const k=(+e.defaultValue-+e.min)/+e.step;return Math.abs(k-Math.round(k))<1e-6;})),'varsayılanlar adım ızgarasında');
   ok(await page.evaluate(()=>!/fonts\.googleapis|atlas\.(css|js)|cdn/.test(document.documentElement.outerHTML)),'atlas ve dış kaynak yok');
   // Sekme 1
   await has('r1x','1,50 s · 0,375 m');await has('r1v','0,750 m/s · 1,000 m/s²');await has('r1fwd','0,8544 m/s · 0,104 · 0,104');await has('r1cen','0,7544 m/s · 0,00444 · 0,00444');await has('r1order','ileri 1,03 · merkezî 2,00');await has('r1turn','7,500 s');await has('r1disp','0,375 m · 0,375 m');await has('r1Status','j = 0,667 m/s³');await panelOverflow('sekme 1');
   await set('r1t',8);await has('r1disp','14,000 m · 14,500 m');await has('r1cen','−1,0000 m/s');await has('r1order','merkezî yuvarlama düzeyi');await has('r1Status','x(t) bir parabol');await has('r1Status','alınan yol (14,500 m)');
   await set('r1t',3);await has('r1v','a sıçrar: 2,00 → 0,00 m/s²');await has('r1cen','kuram yok (sıçrama)');await has('r1Status','parça sınırını aşıyor');
   await set('r1t',9.9);await has('r1cen','tanımsız');await has('r1Status','dışına taşıyor');await set('r1t',10);await has('r1avg','0,800 m/s · 2,050 m/s');
   await set('r1Preset','ball');await has('r1turn','1,529 s');await has('r1Valid','toplam 3,00 s');ok(await page.locator('#r1t').getAttribute('max')==='3','imleç sınırı');await set('r1t',3);await has('r1disp','0,855 m · 22,081 m');
   await set('r1Preset','stop');await set('r1t',9);await has('r1turn','yok');await has('r1disp','21,000 m · 21,000 m');
   await set('r1Preset','back');await set('r1t',9);await has('r1disp','0,000 m · 17,000 m');await has('r1turn','4,500 s');
   await set('r1s1T','abc');await has('r1Valid','Geçersiz değer');ok(await page.locator('#r1s1T').getAttribute('aria-invalid')==='true','geçersiz işaretlenir');ok(await page.locator('#r1Preset').inputValue()==='custom','elle');
   await set('r1s1T','2,5');await has('r1Valid','toplam 10,50 s');await click('r1Add');await has('r1Valid','4 parça, toplam 12,50 s');await page.locator('[data-del="3"]').click();await has('r1Valid','3 parça, toplam 10,50 s');
   await set('r1s0a1','−3');await has('r1Valid','3 parça');
   await click('readReset');await has('r1x','1,50 s · 0,375 m');ok(await page.locator('#r1Preset').inputValue()==='ramp');
   // klavye: tuval üstünde ok tuşları, Boşluk oynatır
   await page.locator('#r1Canvas').focus();await page.keyboard.press('ArrowRight');await has('r1x','1,51 s');await page.keyboard.press('Shift+ArrowLeft');await has('r1x','1,41 s');
   await page.evaluate(()=>document.activeElement.blur());await page.keyboard.press('Space');await has('r1Play','Durdur');await page.evaluate(()=>MotionGraphLabUI.advance(1));await has('r1x','2,4');await page.keyboard.press('Space');await has('r1Play','İmleci oynat');
   await click('r1Play');await page.evaluate(()=>MotionGraphLabUI.advance(12));await has('r1x','10,00 s');await has('r1Play','İmleci oynat');
   await page.locator('#r1h').focus();await page.keyboard.press('Space');await has('r1Play','İmleci oynat');
   await set('r1h','0.5');await page.evaluate(()=>document.activeElement.blur());await page.keyboard.press('r');await has('r1hOut','0,20 s');await noOverflow('sekme 1');
   // Sekme 2
   await click('tab-area');await has('a2sum','10,6667 m');await has('a2exact','8,0000 m');await has('a2err','2,67 · 1,29 m');await has('a2order','1,05 · kuram 1');await has('a2mean','20,5000 m');await has('a2ErrCap','sol −1,00, sağ −1,00, orta −2,00');await has('a2Kin','25,0000 m²/s²');await has('a2KinStatus','ivme sabit');await panelOverflow('sekme 2');
   await set('a2rule','mid');await has('a2sum','7,9167 m');await has('a2order','2,00 · kuram 2');
   await set('a2seg','0');await has('a2Kin','+50,00 %');await has('a2Kin','−33,33 %');await has('a2KinStatus','1,5000 m (j·T³/12)');
   await set('a2q','a');await has('a2exact','−5,0000 m/s');await has('a2order','kuram 1');await has('a2ErrCap','üç kural da −1');await set('a2rule','mid');await has('a2sum','−5,0000 m/s');await has('a2Status','hücre sınırları ivmenin sıçradığı anlara');await set('a2n',7);await has('a2Status','sıçrıyor');await set('a2n',10);
   await set('a2q','v');await set('a2t1',6.5);await set('a2t2',9.5);await has('a2err','0 · 0 m');await has('a2order','yuvarlama düzeyi');await has('a2chord','−1,0000 · −1,0000 m/s');
   await set('a2t2',6.5);ok(+(await page.locator('#a2t1').inputValue())<+(await page.locator('#a2t2').inputValue()),'t₁ < t₂ korunur');
   await set('a2n',200);await set('a2t1',0);await set('a2t2',10);await has('a2sum','h = 0,0500 s');await set('a2Preset','ball');await has('a2exact','0,8550 m');ok(await page.locator('#a2t2').inputValue()==='3','aralık hazıra uyar');
   await click('areaReset');await has('a2sum','10,6667 m');await noOverflow('sekme 2');
   // Sekme 3
   await click('tab-sensor');await has('s3N','N = 81 örnek · Δt = 50,0 ms');await has('s3vn','0,0285 · 0,0283 m/s · +0,81 %');await has('s3an','0,947 · 0,980 m/s²');await has('s3vb','5,71 × 10⁻⁴ · 5,71 × 10⁻⁴');await has('s3sn','düzeltme kapalı');await has('s3Status','ölçülen 6 Hz, kuram (gürültü ile kesme hatası dengelenince) 6,1 Hz');ok(!!(await page.waitForFunction(()=>!!window.ACELYA_DIGEST?.['hareket-ve-grafikler'],null,{timeout:8000})),'defter yüklendi');ok(await page.locator('#s3w').isDisabled(),'w kapalıyken devre dışı');await panelOverflow('sekme 3');
   await set('s3meth','trail');await has('s3lag','150,0 ms · 150,0 ms');await has('s3sn','0,00400 · 0,00404 m/s');await has('s3Status','büyük: gecikme');
   await set('s3meth','sg');await has('s3tot','0,0285 · 0,0156 m/s');await set('s3meth','center');await has('s3lag','0,0 ms · 0,0 ms');
   await set('s3prof','incline');await set('s3meth','trail');await has('s3lag','150,5 ms · 150,0 ms');await has('s3vb','kuram 0');
   await set('s3sig',0);await has('s3vn','σ = 0');await has('s3Status','σ = 0');ok(!(await read('s3Status')).includes('0,0 kat'),'σ = 0 iken kat yazılmaz');
   await set('s3prof','constant');await has('s3lag','tanımsız');await set('s3f',2);await set('s3w',31);await has('s3sn','pencere veriden uzun');
   await set('s3seed','xx');ok(await page.locator('#s3seed').getAttribute('aria-invalid')==='true');await click('sensorReset');await has('s3vn','0,0285 · 0,0283');await click('s3New');ok(await page.locator('#s3seed').inputValue()==='2');ok(!(await read('s3vn')).startsWith('0,0285'),'yeni tohum yeni gürültü');await click('sensorReset');await noOverflow('sekme 3');
   // Sekme 4
   await click('tab-puzzle');await has('p4rms','1,00 m');await has('p4score','18');ok(await page.locator('#p4a1F').isHidden(),'düzey 1 ivme gizli');await panelOverflow('sekme 4');
   await set('p4x0',-1);await set('p4v0',.5);await has('p4score','100');await has('p4Status','Tam eşleşme');
   for(let l=2;l<=5;l++){await set('p4lvl',String(l));const st=await page.evaluate(()=>MotionGraphLabUI.state().puzzle);for(const[k,v]of Object.entries(st.params))if(await page.locator('#p4'+k).isVisible())await set('p4'+k,v);await has('p4score','100');}
   await set('p4lvl','4');await has('p4Title','v–t');ok(await page.locator('#p4x0F').isHidden(),'düzey 4 x₀ gizli');await set('p4lvl','3');await set('p4x0',3.5);await set('p4v0',.5);await set('p4a1',1);await has('p4Status','2. parçada');await click('p4Reveal');await has('p4Sol','−2,0');await has('p4Reveal','Çözümü gizle');
   await click('p4New');ok(await page.locator('#p4seed').inputValue()==='2');ok(await page.locator('#p4SolWrap').isHidden(),'yeni bulmacada çözüm gizli');
   await click('puzzleReset');await has('p4score','18');await noOverflow('sekme 4');
   // Sekme klavyesi
   await page.locator('#tab-puzzle').focus();await page.keyboard.press('Home');ok(await page.locator('#tab-read').getAttribute('aria-selected')==='true','Home');await page.keyboard.press('ArrowRight');ok(await page.locator('#tab-area').getAttribute('aria-selected')==='true','ArrowRight');await page.keyboard.press('End');ok(await page.locator('#tab-puzzle').getAttribute('aria-selected')==='true','End');await page.keyboard.press('ArrowLeft');ok(await page.locator('#tab-sensor').getAttribute('aria-selected')==='true','ArrowLeft');
   // tuvaller boş değil
   for(const id of['s3Canvas','s3Trade']){ok(await page.evaluate(id=>{const c=document.getElementById(id),d=c.getContext('2d').getImageData(0,0,c.width,c.height).data;const set=new Set();for(let i=0;i<d.length;i+=4)set.add(d[i]<<16|d[i+1]<<8|d[i+2]);return set.size>20;},id),'tuval çizildi '+id);}
   await page.waitForTimeout(300);assert.deepEqual(errors,[]);checks++;await ctx.close();}
  console.log(`G ${SLUG}: ${checks-before} tarayıcı kontrolü (390 açık + 1280 koyu: sekmeler, hazırlar, sınırlar, sıfırlama, klavye, taşma, konsol) PASS`);
 }finally{await browser?.close();await new Promise(r=>server.close(r));}
}
