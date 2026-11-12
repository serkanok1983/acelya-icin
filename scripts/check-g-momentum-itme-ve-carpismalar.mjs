// Kalıcı denetim: momentum-itme-ve-carpismalar.html çekirdeği (window.MomentumLab) bağımsız referanslara karşı sınanır.
// Referanslar sayfanın formüllerini yeniden kullanmaz: kapalı biçimler burada elle türetilmiştir; ayrıca enerji ve momentum
// korunumu, Galileo değişmezliği, ayrı yazılmış küçük adımlı Euler integratörleri ve yumuşak küre (yay) çarpışması kullanılır.
// `--browser`: Playwright arayüz denetimi (390 px açık + 1280 px koyu).
import fs from 'node:fs';
import vm from 'node:vm';
import assert from 'node:assert/strict';
const SLUG='momentum-itme-ve-carpismalar';
const html=fs.readFileSync(new URL(`../${SLUG}.html`,import.meta.url),'utf8');
const source=html.split('/* KERNEL-BEGIN */')[1]?.split('/* KERNEL-END */')[0];
assert(source,'Çekirdek sınır işaretleri gerekli');
const context={window:{}};vm.createContext(context);vm.runInContext(source,context);
const K=context.window.MomentumLab;assert(Object.isFrozen(K));
let checks=0;
const near=(a,e,tol=1e-9,label='')=>{assert(Math.abs(a-e)<=tol*Math.max(1,Math.abs(e)),`${label} ${a} ≠ ${e}`);checks++;};
const ok=(c,label)=>{assert(c,label);checks++;};
const lcg=seed=>{let s=seed>>>0;return()=>(s=(Math.imul(s,1664525)+1013904223)>>>0)/4294967296;};

/* ── 1. Kuvvet atımı: itme = alan = Δp ── */
// Kapalı biçimler (burada türetildi): sabit F → v = v0 − Fτ/m, x = v0τ − Fτ²/(2m); üçgen → alan Fτ/2, x(τ) = v0τ − Fτ²/(4m);
// yarım sinüs → alan 2Fτ/π, x(τ) = v0τ − Fτ²/(πm).
for(const m of[.1,1,5,70])for(const v0of of[.5,2,13.9])for(const tauMs of[1,5,50,200])for(const F of[0,10,1234.5]){const tau=tauMs/1000,v0=v0of;
 const ref={rect:{A:F*tau,x:v0*tau-F*tau*tau/(2*m)},tri:{A:F*tau/2,x:v0*tau-F*tau*tau/(4*m)},sine:{A:2*F*tau/Math.PI,x:v0*tau-F*tau*tau/(Math.PI*m)}};
 for(const shape of['rect','tri','sine']){const r=K.pulseRun({m,v0,shape,tau,F});const sc=Math.max(m*v0,ref[shape].A);
  near(r.J,-ref[shape].A,shape==='sine'?1e-6:1e-10,'J alan');near(r.dp,-ref[shape].A,1e-9*sc,'Δp');ok(Math.abs(r.J-r.dp)<=1e-6*sc,'J = Δp');
  near(r.xEnd,ref[shape].x,1e-9,'x(τ)');near(r.peak,F,1e-12,'tepe');near(r.tc,tau,1e-12);}}
// Durduran tepe kuvvet: son hız sıfır, ezilme yolu ∫v dt: sabit F → v0τ/2, üçgen → v0τ/2, sinüs → v0τ/2
for(const shape of['rect','tri','sine'])for(const[m,v0,tau]of[[1,2,.05],[5,13.9,.005],[70,4.4,.15]]){const F=K.stopPeak({m,v0,shape,tau}),r=K.pulseRun({m,v0,shape,tau,F});ok(Math.abs(r.vEnd)<1e-9*v0,'durdu');near(r.xEnd,v0*tau/2,1e-9,'durma yolu');near(r.Favg,m*v0/tau,1e-6,'ortalama kuvvet');}
// Aynı itme, uzun süre: tepe kuvvet süreyle ters orantılı
{const a=K.pulseRun({m:5,v0:13.9,shape:'sine',tau:.005,F:K.stopPeak({m:5,v0:13.9,shape:'sine',tau:.005})}),b=K.pulseRun({m:5,v0:13.9,shape:'sine',tau:.06,F:K.stopPeak({m:5,v0:13.9,shape:'sine',tau:.06})});near(b.peak/a.peak,5/60,1e-12,'tepe oranı');near(a.J,b.J,1e-6);near(a.peak,5*13.9*Math.PI/(2*.005),1e-12);}
// Yay teması: Δt = π√(m/k), v_son = −v0, tepe v0√(km), her örnekte ½kx² + ½mv² sabit
for(const m of[.1,1,5,70])for(const v0 of[.5,2,13.9])for(const k of[200,2000,200000]){const r=K.pulseRun({m,v0,shape:'spring',k}),E=.5*m*v0*v0;
 near(r.tc,Math.PI*Math.sqrt(m/k),1e-9,'yay süresi');near(r.vEnd,-v0,1e-9,'geri sekme');near(r.dp,-2*m*v0,1e-9);near(r.J,-2*m*v0,2e-6,'yay itmesi');ok(Math.abs(r.peak-v0*Math.sqrt(k*m))<=1e-6*v0*Math.sqrt(k*m),'yay tepe');near(r.xMax,v0*Math.sqrt(m/k),1e-6);
 for(let i=0;i<r.S.length;i+=97){const[t,F,v,x]=r.S[i];near(.5*k*x*x+.5*m*v*v,E,1e-9,'enerji');near(F,-k*x,1e-12);}}
// Bağımsız integratör: yarım sinüs atımını çok küçük adımlı yarı örtük Euler ile
{const m=2,v0=3,tau=.04,F=150;let v=v0,x=0;const h=tau/400000;for(let i=0;i<400000;i++){const t=(i+.5)*h;v-=F*Math.sin(Math.PI*t/tau)/m*h;x+=v*h;}const r=K.pulseRun({m,v0,shape:'sine',tau,F});near(r.vEnd,v,1e-9,'Euler v');near(r.xEnd,x,1e-6,'Euler x');}
assert.throws(()=>K.pulseRun({m:0,v0:1,shape:'rect',tau:.1,F:1}));assert.throws(()=>K.pulseRun({m:1,v0:1,shape:'kare',tau:.1,F:1}));checks+=2;

/* ── 2. 1-B çarpışma ── */
const R=lcg(11);
for(let n=0;n<400;n++){const m1=.1+9.9*R(),m2=.1+9.9*R(),u1=-3+6*R(),u2=-3+6*R(),e=Math.round(R()*20)/20,k=[2000,5000,20000,100000][n%4],q=K.collide1D({m1,m2,u1,u2,e,k});
 if(u1<=u2){ok(!q.approach,'yaklaşmıyor');continue;}
 // Elle: momentum ve bağıl hız koşulu → doğrusal denklem çözümü
 const det=m1+m2,v2=(m1*u1+m2*u2+m1*e*(u1-u2))/det,v1=v2-e*(u1-u2);
 near(q.v1,v1,1e-9,'v1');near(q.v2,v2,1e-9,'v2');const p0=m1*u1+m2*u2,sc=m1*Math.abs(u1)+m2*Math.abs(u2);ok(Math.abs(m1*q.v1+m2*q.v2-p0)<=1e-12*sc,'momentum');
 const K0=.5*m1*u1*u1+.5*m2*u2*u2,K1=.5*m1*q.v1**2+.5*m2*q.v2**2,mu=m1*m2/(m1+m2),loss=(1-e*e)*.5*mu*(u1-u2)**2;near(K0-K1,loss,1e-9*K0/Math.max(loss,1e-300)+1e-9,'kayıp');
 ok(Math.abs(q.loop-loss)<=1e-5*K0,'döngü alanı = kayıp');near(q.dmax,(u1-u2)*Math.sqrt(mu/k),1e-9,'δmax');near(q.d0,q.dmax*(1-e*e),1e-12);
 const T=Math.PI/2*Math.sqrt(mu/k);near(q.tc,e>0?T*(1+e):T,1e-9,'temas süresi');ok(q.S.every(s=>s[3]>=-1e-9),'çekici kuvvet yok');}
// Galileo: iki hıza aynı sabit eklenince sıkışma geçmişi değişmez, son hızlar sabit kadar kayar
for(const c of[-1.3,.7,2.5]){const a=K.collide1D({m1:2,m2:1,u1:3,u2:-1,e:.5,k:5000}),b=K.collide1D({m1:2,m2:1,u1:3+c,u2:-1+c,e:.5,k:5000});near(b.v1-c,a.v1,1e-9);near(b.v2-c,a.v2,1e-9);near(b.dmax,a.dmax,1e-12);near(b.tc,a.tc,1e-12);}
// Bağımsız integratör: iki cismin konumlarıyla, kendi histerezis mantığıyla, küçük adımlı yarı örtük Euler
function euler1D({m1,m2,u1,u2,e,k},h=2e-7){let x1=0,x2=0,v1=u1,v2=u2,dmax=0,unl=false;const k2=e>0?k/(e*e):Infinity;for(let i=0;i<5e6;i++){const d=x1-x2;let F=0;if(!unl){if(d<0&&i>10)break;F=k*Math.max(d,0);if(v1-v2<0&&i>0){unl=true;dmax=d;}}if(unl){if(e===0){const V=(m1*v1+m2*v2)/(m1+m2);return{v1:V,v2:V};}const d0=dmax*(1-e*e);if(d<=d0)break;F=k2*(d-d0);}v1-=F/m1*h;v2+=F/m2*h;x1+=v1*h;x2+=v2*h;}return{v1,v2};}
for(const P of[{m1:2,m2:1,u1:3,u2:-1,e:.5,k:5000},{m1:1,m2:1,u1:1.5,u2:0,e:1,k:5000},{m1:10,m2:.1,u1:1,u2:0,e:1,k:5000},{m1:.5,m2:3,u1:2,u2:.5,e:.3,k:2000}]){const q=K.collide1D(P),r=euler1D(P);near(q.v1,r.v1,2e-3,'Euler v1');near(q.v2,r.v2,2e-3,'Euler v2');}
{const q=K.collide1D({m1:2,m2:1,u1:3,u2:-1,e:0,k:5000});near(q.v1,5/3,1e-12);near(q.v2,5/3,1e-12);near(q.loop,16/3,1e-6,'yapışma kaybı');}
assert.throws(()=>K.collide1D({m1:1,m2:1,u1:1,u2:0,e:1.2,k:1}));checks++;

/* ── 3. Diskler ── */
const two=(m1,m2,u,b,e)=>{const st={x:[-1,0],y:[b,0],vx:[u,0],vy:[0,0],m:[m1,m2],r:[.1,.1],t:0,coll:0};for(let i=0;i<240*6;i++)K.discStep(st,1/240,{e});return st;};
for(let n=0;n<300;n++){const m1=.1+4.9*R(),m2=.1+4.9*R(),u=.2+2.8*R(),b=.199*R(),e=Math.round(R()*20)/20,st=two(m1,m2,u,b,e),D=.2;
 ok(e>0?st.coll===1:st.coll>=1,`tek çarpışma ${st.coll} ${[m1,m2,u,b,e]}`);near(m1*st.vx[0]+m2*st.vx[1],m1*u,1e-12,'P_x');ok(Math.abs(m1*st.vy[0]+m2*st.vy[1])<1e-12*m1*u,'P_y');
 // 2. disk merkezler doğrultusunda: açı −arcsin(b/D)
 near(Math.atan2(st.vy[1],st.vx[1]),-Math.asin(b/D),1e-9,'θ2');
 // Teğet bağıl hız değişmez, normal bileşen −e kat: kayıp (1 − e²)·½μ·(u cos α)²
 const ca=Math.sqrt(1-(b/D)**2),mu=m1*m2/(m1+m2),K1=.5*m1*(st.vx[0]**2+st.vy[0]**2)+.5*m2*(st.vx[1]**2+st.vy[1]**2);near(.5*m1*u*u-K1,(1-e*e)*.5*mu*(u*ca)**2,1e-9,'disk kaybı');
 if(Math.abs(m1-m2)<1e-12&&e===1&&b>0){const dot=st.vx[0]*st.vx[1]+st.vy[0]*st.vy[1];ok(Math.abs(dot)<1e-12,'90°');}}
for(const b of[.01,.05,.1,.15,.199]){const st=two(1,1,1,b,1);near(Math.abs(Math.atan2(st.vy[0],st.vx[0])-Math.atan2(st.vy[1],st.vx[1])),Math.PI/2,1e-12,'eşit kütle 90°');}
{const st=two(1,1,1,0,1);ok(Math.hypot(st.vx[0],st.vy[0])<1e-12,'kafa kafaya: durur');const s2=two(1,1,1,.21,1);ok(s2.coll===0&&s2.vx[0]===1,'ıska');}
// Yumuşak küre: sert doğrusal yay temasıyla küçük adımlı ayrı integratör, e = 1. Sonlu temas süresi O(√(μ/k)) sapma verir;
// k dört katına çıkınca sapma yarıya inmeli (sert küre sınırına yakınsama).
{const m1=1.7,m2=.6,u=1.3,b=.07,st=two(m1,m2,u,b,1);const soft=kk=>{const h=2e-7;let x=[-.25,0],y=[b,0],vx=[u,0],vy=[0,0];for(let i=0;i<1.5e6;i++){const dx=x[1]-x[0],dy=y[1]-y[0],d=Math.hypot(dx,dy);if(d<.2){const f=kk*(.2-d),nx=dx/d,ny=dy/d;vx[0]-=f*nx/m1*h;vy[0]-=f*ny/m1*h;vx[1]+=f*nx/m2*h;vy[1]+=f*ny/m2*h;}for(const j of[0,1]){x[j]+=vx[j]*h;y[j]+=vy[j]*h;}}return Math.max(...[0,1].map(j=>Math.hypot(vx[j]-st.vx[j],vy[j]-st.vy[j])))/u;};
 const e1=soft(4e6),e2=soft(1.6e7);ok(e1<3e-3,'yumuşak küre yakın '+e1);ok(e2<.6*e1,`yakınsama ${e1} → ${e2}`);}
// Periyodik kutu: momentum yuvarlama düzeyinde, e = 1'de enerji korunur, e < 1'de enerji azalır, örtüşme yok
for(const seed of[1,2,3,4,5])for(const mix of['equal','mixed'])for(const e of[1,.6]){const st=K.boxInit({N:24,W:2.4,H:1.3,r:.07,mix,seed}),P=()=>[st.m.reduce((a,m,i)=>a+m*st.vx[i],0),st.m.reduce((a,m,i)=>a+m*st.vy[i],0)],E=()=>st.m.reduce((a,m,i)=>a+.5*m*(st.vx[i]**2+st.vy[i]**2),0),p0=P(),E0=E(),sc=st.m.reduce((a,m,i)=>a+m*Math.hypot(st.vx[i],st.vy[i]),0);let Ep=E0;
 for(let i=0;i<240*15;i++){K.discStep(st,1/240,{e,W:2.4,H:1.3});if(i%60===0){const En=E();ok(En<=Ep*(1+1e-12),'enerji artmaz');Ep=En;}}
 const p=P();ok(Math.hypot(p[0]-p0[0],p[1]-p0[1])<1e-12*sc,'kutu momentumu');if(e===1)near(E(),E0,1e-9,'kutu enerjisi');else ok(E()<E0,'kayıp');ok(st.coll>20,'çarpışma oldu');
 let minD=Infinity;for(let i=0;i<24;i++)for(let j=i+1;j<24;j++){let dx=st.x[j]-st.x[i],dy=st.y[j]-st.y[i];dx-=2.4*Math.round(dx/2.4);dy-=1.3*Math.round(dy/1.3);minD=Math.min(minD,Math.hypot(dx,dy));}ok(minD>.14-1e-9,'örtüşme yok');
 // ½P²/M kaybolamaz
 const M=st.m.reduce((a,b)=>a+b,0);ok(E()>=.5*(p0[0]**2+p0[1]**2)/M-1e-12,'K ≥ P²/2M');}

/* ── 4. Roket ── */
for(const u of[1000,3000,4500])for(const Rr of[1.1,5,20])for(const mdot of[10,100,1000]){const mf=1e4/Rr,r=K.rocketRun({stages:[{mp:1e4-mf,ms:0}],mL:mf,u,mdot,g:0});near(r.dv,u*Math.log(Rr),1e-9,'Tsiolkovsky');near(r.t,(1e4-mf)/mdot,1e-12);
 // yükseklik: ∫ u ln(m0/m) dt kapalı biçimi, m = m0 − ṁt: h = u·[t − (m/ṁ)·ln(m0/m)]
 near(r.h,u*(r.t-(mf/mdot)*Math.log(Rr)),1e-8,'yükseklik');
 for(const g of[1.62,9.81]){const q=K.rocketRun({stages:[{mp:1e4-mf,ms:0}],mL:mf,u,mdot,g}),tb=(1e4-mf)/mdot,ml=mdot*u/g;
  if(ml>=1e4){near(q.dv,u*Math.log(Rr)-g*tb,1e-9,'g kaybı');ok(q.tLift===0);}else if(ml>mf){const tl=(1e4-ml)/mdot;near(q.tLift,tl,1e-12);near(q.dv,u*Math.log(ml/mf)-g*(tb-tl),1e-9,'rampa bekleme');}else{ok(q.tLift===null&&q.dv===0,'kalkmaz');}}}
// Kademeler: kapalı biçim
for(const[mL,eps,sig]of[[500,.1,.75],[100,.04,.5],[3000,.3,.95]]){const rest=1e4-mL,ms=eps*rest,mp=(1-eps)*rest,u=3000,a=K.rocketRun({stages:[{mp,ms:0}],mL:mL+ms,u,mdot:100}),b=K.rocketRun({stages:[{mp:mp*sig,ms:ms*sig},{mp:mp*(1-sig),ms:ms*(1-sig)}],mL,u,mdot:100});
 near(a.dv,u*Math.log(1e4/(mL+ms)),1e-9);const m1=1e4-mp*sig,m2=m1-ms*sig;near(b.dv,u*(Math.log(1e4/m1)+Math.log(m2/(mL+ms*(1-sig)))),1e-9,'iki kademe');ok(b.dv>a.dv,'kademe kazanır');near(b.burn[0].v,u*Math.log(1e4/m1),1e-9);}
// Bağımsız Euler: g ile
{const u=3000,mdot=100,g=9.81;let v=0,m=1e4;const h=1e-4;for(let t=0;t<80-h/2;t+=h){v+=(mdot*u/(m-mdot*h/2)-g)*h;m-=mdot*h;}near(K.rocketRun({stages:[{mp:8000,ms:0}],mL:2000,u,mdot,g}).dv,v,1e-8,'Euler roket');}
// Paket defteri: N = 1 kapalı biçim, alttan yaklaşır, hata ≤ u·Δm·(1/m_f − 1/m0)
for(const N of[1,10,100,1000,100000]){const v=K.packetDv({m0:1e4,mf:2000,u:3000,N}),exact=3000*Math.log(5),dm=8000/N;ok(v<exact,'alttan');ok(exact-v<=3000*dm*(1/2000-1/1e4)+1e-9,'hata sınırı');if(N===1)near(v,3000*.8,1e-12);}
ok(K.packetDv({m0:1e4,mf:2000,u:3000,N:100000})>K.packetDv({m0:1e4,mf:2000,u:3000,N:1000}),'N ile artar');
near(K.packetDv({m0:1e4,mf:2000,u:3000,N:100}),4780.697673453379,1e-12,'N = 100');
console.log(`G ${SLUG}: ${checks.toLocaleString('tr-TR')} bağımsız kapalı biçim, korunum, Euler ve yumuşak küre kontrolü PASS`);

if(process.argv.includes('--browser')){
 const {chromium}=await import('playwright');const {createServer}=await import('node:http');const {join,extname}=await import('node:path');const {fileURLToPath}=await import('node:url');const root=fileURLToPath(new URL('../',import.meta.url));
 const server=createServer((req,res)=>{const file=join(root,decodeURIComponent(new URL(req.url,'http://localhost').pathname));if(!file.startsWith(root)||!fs.existsSync(file)||fs.statSync(file).isDirectory()){res.writeHead(404).end();return;}res.setHeader('Content-Type',({'.html':'text/html; charset=utf-8','.js':'text/javascript; charset=utf-8','.css':'text/css; charset=utf-8'})[extname(file)]||'application/octet-stream');res.end(fs.readFileSync(file));});await new Promise(r=>server.listen(0,'127.0.0.1',r));let browser;const before=checks;
 try{browser=await chromium.launch();
  for(const[width,theme]of[[390,'light'],[1280,'dark']]){
   const ctx=await browser.newContext({viewport:{width,height:900},deviceScaleFactor:width<500?2:1});const page=await ctx.newPage();await page.addInitScript(t=>{localStorage.setItem('acelya-theme',t);localStorage.setItem('acelya-sound-muted','1');},theme);page.setDefaultTimeout(8000);const errors=[];page.on('pageerror',e=>errors.push(e.message));page.on('console',m=>{if(m.type()==='error')errors.push(m.text());});page.on('response',r=>{if(r.status()>=400)errors.push(r.status()+' '+r.url());});
   await page.goto(`http://127.0.0.1:${server.address().port}/${SLUG}.html`);await page.waitForFunction(()=>window.MomentumLabUI&&document.getElementById('t1Jth').textContent);
   const click=id=>page.locator('#'+id).click(),read=id=>page.locator('#'+id).textContent(),set=(id,v)=>page.locator('#'+id).evaluate((e,v)=>{if(e.type==='checkbox')e.checked=v;else e.value=v;e.dispatchEvent(new Event(e.tagName==='SELECT'||e.type==='checkbox'?'change':'input',{bubbles:true}));},v),adv=s=>page.evaluate(s=>MomentumLabUI.advance(s),s),has=async(id,t)=>{const x=await read(id);assert(x.includes(t),`[${width}] #${id}: "${x}" içinde "${t}" yok`);checks++;},noOverflow=async l=>ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),`[${width}] yatay taşma: ${l}`);
   ok(await page.evaluate(()=>[...document.querySelectorAll('.app-content input,.app-content select')].every(e=>e.id&&document.querySelector(`label[for="${e.id}"]`))),'her denetimde label');
   ok(await page.evaluate(()=>[...document.querySelectorAll('.app-content canvas')].every(c=>c.getAttribute('role')==='img'&&c.getAttribute('aria-label'))),'tuval rolleri');
   ok(await page.evaluate(()=>new Set([...document.querySelectorAll('[id]')].map(e=>e.id)).size===document.querySelectorAll('[id]').length),'kimlikler tekil');
   ok(await page.evaluate(()=>Object.isFrozen(MomentumLab)&&!Object.getOwnPropertyDescriptor(window,'MomentumLab').writable),'çekirdek salt okunur');
   ok(await page.evaluate(()=>[...document.querySelectorAll('.app-content input[type=range]')].every(e=>{const k=(+e.defaultValue-+e.min)/+e.step;return Math.abs(k-Math.round(k))<1e-6;})),'varsayılanlar adım ızgarasında');
   ok(!/fonts\.googleapis|atlas\.(css|js)|cdn/i.test(await page.content()),'harici kaynak yok');
   // Sekme 1
   await has('t1Jth','−2,000 N·s');await has('t1J','“Çarpıştır” ile ölç');await has('t1peak','kuram 62,83 N');await click('t1Go');await adv(1.5);await has('t1J','şimdiye dek');await adv(3);
   await has('t1J','−2,000 N·s');await has('t1dp','−2,000 kg·m/s · J ile fark 0,00 %');await has('t1vEnd','0,000 m/s');await has('t1peak','62,83 N · 62,83 N');await has('t1avg','40,00 N');await has('t1crush','5,00 cm');await has('t1Status','Araba tam durdu');
   await set('t1preset','dash');await has('t1J','“Çarpıştır” ile ölç');await click('t1Go');await adv(4);await has('t1peak','21834,07 N');await set('t1preset','bag');await click('t1Go');await adv(4);await has('t1peak','1819,51 N');await has('t1acc','37,1 g');await has('t1ghost','5,0 ms · 21834,1 N · −69,500 N·s');await has('t1Status','süre 12,00 katına çıktı, tepe kuvvet 0,083 katına indi');
   await set('t1preset','lock');await click('t1Go');await adv(4);await has('t1peak','48380,53 N');await set('t1preset','bend');await click('t1Go');await adv(4);await has('t1peak','3225,37 N');
   await set('t1preset','spring');ok(await page.locator('#t1kF').isVisible()&&!(await page.locator('#t1tauF').isVisible()),'yay alanları');await click('t1Go');await adv(4);await has('t1dur','70,25 ms · 70,25 ms');await has('t1vEnd','−2,000 m/s');await has('t1J','−4,000 N·s');await has('t1peak','89,44 N');
   await set('t1shape','rect');ok(await page.locator('#t1preset').inputValue()==='custom','elle');await set('t1mode','free');ok(await page.locator('#t1F').isVisible(),'serbest alan');await set('t1tau',50);await set('t1F','20,5');await click('t1Go');await adv(4);await has('t1J','−1,025 N·s');await has('t1vEnd','+0,975 m/s');await has('t1Status','İtme yetmedi');
   await set('t1F','80');await click('t1Go');await adv(4);await has('t1vEnd','−2,000 m/s');await has('t1Status','geri döndü');await set('t1F','0');await click('t1Go');await adv(4);await has('t1Status','Kuvvet sıfır');await set('t1F','abc');await has('t1Status','Tepe kuvvet 0 ile');
   await set('t1tau',200);await set('t1m',80);await set('t1v',15);await set('t1mode','stop');await click('t1Go');await adv(4);await has('t1vEnd','0,000 m/s');await set('t1tau',1);await set('t1m',.1);await set('t1v',.1);await click('t1Go');await adv(4);await has('t1dp','−0,010 kg·m/s');
   await click('t1Toggle');await has('t1Toggle','Devam et');await click('pulseReset');await has('t1Toggle','Duraklat');await has('t1J','“Çarpıştır” ile ölç');await has('t1ghost','—');ok(await page.locator('#t1shape').inputValue()==='sine','sıfırlandı');await noOverflow('sekme 1');
   // Sekme 2
   await click('tab-c1d');await has('t2v1','kuram +1,000 m/s');await has('t2loss','kuram 4,000 J');await click('t2Go');await adv(.2);await has('t2v1','ölçülüyor');await adv(4);await has('t2v1','+1,000 · +1,000 m/s');await has('t2v2','+3,000 · +3,000 m/s');await has('t2P','+5,000 → +5,000');await has('t2K','9,500 → 5,500 J');await has('t2loss','4,000 · 4,000 J · fark 0,00 %');await has('t2loop','4,000 J');await has('t2eMeas','0,500');await has('t2tc','27,21 · 27,21 ms');await has('t2dmax','46,2 mm');
   await set('t2cm',true);await has('t2cmR','+1,333, −2,667 → −0,667, +1,333 m/s');await set('t2cm',false);await has('t2cmR','+1,667 m/s');
   await set('t2preset','swap');await click('t2Go');await adv(4);await has('t2v1','0,000 · 0,000');await has('t2v2','+1,500 · +1,500');await has('t2Status','takas');
   await set('t2preset','heavy');await click('t2Go');await adv(4);await has('t2v2','+1,980 · +1,980');await has('t2Status','2·u₁');
   await set('t2preset','light');await click('t2Go');await adv(4);await has('t2v1','−0,980 · −0,980');
   await set('t2preset','stick');await click('t2Go');await adv(4);await has('t2v1','+1,667 · +1,667');await has('t2loss','5,333 · 5,333');
   await set('t2u1',-1);ok(await page.locator('#t2preset').inputValue()==='custom','elle');await has('t2Status','yaklaşmıyor');await has('t2v1','tanımsız');await click('t2Go');await adv(3);await has('t2v1','tanımsız');
   await set('t2m1',10);await set('t2m2',10);await set('t2u1',3);await set('t2u2',-3);await set('t2k','2000');await click('t2Go');await adv(4);await has('t2Status','dibe vururdu');await set('t2speed','0.05');await click('t2Go');await adv(4);await has('t2v1','ölçülüyor');
   await click('c1dReset');await has('t2v1','kuram +1,000');ok(await page.locator('#t2speed').inputValue()==='1','hız sıfırlandı');await noOverflow('sekme 2');
   // Sekme 3
   await click('tab-c2d');await has('t3th1','“Başlat” ile ölç');await click('t3Go');await adv(5);await has('t3sep','90,00° · 90,00° · fark 0,00°');await has('t3th2','−30,00° · −30,00°');await has('t3px','+1,000 → +1,000');await has('t3py','0,000 → 0,000');await has('t3cm','(+0,5000, 0,0000) · (+0,5000, 0,0000)');await has('t3line','0,0000 mm');
   await set('t3preset','head');await click('t3Go');await adv(5);await has('t3th1','disk durdu');await has('t3sep','tanımsız');await has('t3Status','açı tanımsızdır');
   await set('t3preset','heavy');await click('t3Go');await adv(5);await has('t3sep','40,89° · 40,89°');await has('t3Status','90°\'den küçük');
   await set('t3preset','inel');await click('t3Go');await adv(5);await has('t3K','0,1406 · 0,1406 J');await has('t3sep','66,59° · 66,59°');
   await set('t3preset','graze');await click('t3Go');await adv(5);await has('t3th2','−71,81°');await has('t3Status','Sıyırma');
   await set('t3preset','miss');await has('t3geo','ıska');await click('t3Go');await adv(5);await has('t3sep','çarpışma yok');
   await set('t3m1',.5);await set('t3m2',5);await set('t3b',.1);await click('t3Go');await adv(6);await has('t3Status','90°\'den büyük');
   await set('t3mode','box');ok(await page.locator('#t3BoxStats').isVisible(),'kutu');await click('t3Go');await adv(5);await has('t3bP','(+0,6320, +2,7799)');await has('t3bP0','(+0,6320, +2,7799)');const drift=await page.evaluate(()=>MomentumLabUI.state().c2d.drift);ok(drift<1e-12,'UI kutu momentumu '+drift);
   await set('t3e',.5);await adv(5);await has('t3bP','(+0,6320, +2,7799)');await has('t3Status','kinetik enerji azalıyor');await set('t3mix','mixed');await set('t3N','40');await set('t3seed','3');await click('t3Go');await adv(5);ok(await page.evaluate(()=>MomentumLabUI.state().c2d.drift)<1e-12,'karışık kutu');
   await click('c2dReset');ok(await page.locator('#t3TwoStats').isVisible(),'sıfırlama iki diske döner');await has('t3th1','“Başlat” ile ölç');await noOverflow('sekme 3');
   // Sekme 4
   await click('tab-rocket');await has('t4ts','4828,3 m/s');await has('t4pk','4780,7 m/s · Tsiolkovsky ile fark −0,99 %');await click('t4Go');await adv(7);await has('t4dv','4828,3 m/s');await has('t4diff','0,000000 m/s');await has('t4now','143,43 km');
   await set('t4g','9.81');await click('t4Go');await adv(7);await has('t4dv','4043,5 m/s · kapalı biçim 4043,5 m/s');await has('t4gl','784,8 m/s · 784,8 m/s');await has('t4tb','80,0 s · 3,06');
   await set('t4mdot',30);await click('t4Go');await adv(7);await has('t4Status','rampada bekledi');await has('t4dv','· kapalı biçim');{const r=await read('t4dv');const[a,b]=r.split(' · kapalı biçim ');ok(a===b,'rampa: sayısal = kapalı biçim '+r);}
   await set('t4mdot',10);await set('t4R',1.1);await has('t4Status','hiç kalkmaz');await set('t4N','100000');await has('t4pk','fark 0,00 %');await set('t4N','1');
   await set('t4exp','stage');await set('t4g','0');await set('t4mdot',100);ok(await page.locator('#t4StageStats').isVisible(),'kademe');await click('t4Go');await adv(7);await has('t4s1','5793,1 m/s · 5793,1 m/s');await has('t4s2','7157,0 m/s · 7157,0 m/s');await has('t4gain','+1363,9 m/s');await has('t4sR','6,897 · 2,787 × 3,898 = 10,866');
   await set('t4g','9.81');await click('t4Go');await adv(7);await has('t4gain','+1363,9 m/s');await has('t4sgl','838,8 m/s · 838,8 m/s');
   await click('rocketReset');await has('t4ts','4828,3 m/s');ok(await page.locator('#t4exp').inputValue()==='single','roket sıfırlandı');await noOverflow('sekme 4');
   // Klavye
   await page.locator('#tab-rocket').focus();await page.keyboard.press('Home');ok(await page.locator('#tab-pulse').getAttribute('aria-selected')==='true','Home');await page.keyboard.press('ArrowRight');ok(await page.locator('#tab-c1d').getAttribute('aria-selected')==='true','ArrowRight');await page.keyboard.press('End');ok(await page.locator('#tab-rocket').getAttribute('aria-selected')==='true','End');await page.keyboard.press('ArrowLeft');await page.keyboard.press('ArrowLeft');await page.keyboard.press('ArrowLeft');ok(await page.locator('#tab-pulse').getAttribute('aria-selected')==='true','ArrowLeft');
   await page.evaluate(()=>document.activeElement.blur());await page.keyboard.press('Space');ok((await page.evaluate(()=>MomentumLabUI.state().pulse.phase))==='play','Boşluk başlatır');await page.keyboard.press('Space');await has('t1Toggle','Devam et');await set('t1m',7);await page.evaluate(()=>document.activeElement.blur());await page.keyboard.press('r');await has('t1mOut','1,0 kg');
   await page.locator('#t1m').focus();await page.keyboard.press('Space');ok((await page.evaluate(()=>MomentumLabUI.state().pulse.phase))==='idle','denetimde Boşluk yok sayılır');
   ok(await page.evaluate(()=>!!(window.ACELYA_DIGEST&&window.ACELYA_DIGEST['momentum-itme-ve-carpismalar'])),'defter yüklendi');ok(await page.evaluate(()=>{const t=document.body.textContent;return t.includes('uzun ve alçak bir eğriyle')&&t.includes('dış kuvvet (kütleçekimi) yokken toplam momentum');}),'düzeltilen açıklamalar');await page.waitForTimeout(300);assert.deepEqual(errors,[]);checks++;await ctx.close();}
  console.log(`G ${SLUG}: ${checks-before} tarayıcı kontrolü (390 açık + 1280 koyu: sekmeler, hazırlar, sınırlar, sıfırlama, klavye, taşma, konsol) PASS`);
 }finally{await browser?.close();await new Promise(r=>server.close(r));}
}
