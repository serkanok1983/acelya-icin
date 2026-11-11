// Kepler Yasaları laboratuvarı: çekirdeğin bağımsız denetimi.
// Başvurular sayfanın integratörünü ve formüllerini yinelemez: yörünge konumu Kepler denkleminin (elips:
// M = E − e sin E, hiperbol: M = e sinh H − H) Newton yöntemiyle çözülmesinden, alanlar bu analitik konumlardan
// kurulan çokgenden ve kapalı biçim (ab/2)·(E − e sin E) bağıntısından, iki cisim ise ayrı bir sabit adımlı
// hız-Verlet (leapfrog) integratörüyle hesaplanır. Gezegen verisi NASA NSSDCA Planetary Fact Sheet'ten
// (nssdc.gsfc.nasa.gov/planetary/factsheet, Kasım 2026'da açıldı) elle yazılmıştır.
// Kullanım: node scripts/check-g-kepler-yasalari.mjs [--browser]
import fs from 'node:fs';
import vm from 'node:vm';
import assert from 'node:assert/strict';
const SLUG='kepler-yasalari';
const html=fs.readFileSync(new URL(`../${SLUG}.html`,import.meta.url),'utf8');
const source=html.split('/* KERNEL-BEGIN */')[1]?.split('/* KERNEL-END */')[0];
assert(source,'KERNEL sınırları gerekli');
const context={window:{}};vm.createContext(context);vm.runInContext(source,context);
const K=context.window.KeplerLab;assert(K&&Object.isFrozen(K),'KeplerLab dondurulmuş olmalı');
let checks=0;
const near=(a,b,tol=1e-9,msg='')=>{assert(Number.isFinite(a)&&Math.abs(a-b)<=tol*Math.max(1,Math.abs(b)),`${msg} ${a} ≠ ${b} (tol ${tol})`);checks++;};
const ok=(c,msg)=>{assert(c,msg);checks++;};
const eq=(a,b,msg='')=>{assert.equal(a,b,msg+` (${a} ≠ ${b})`);checks++;};
const PI=Math.PI,MU1=4*PI*PI;

/* ── bağımsız analitik çözüm ── */
function elements(r0,v0,alpha,mu){ // r0 x ekseninde, hız açısı alpha (radyal yönden)
 const vr=v0*Math.cos(alpha),vt=v0*Math.sin(alpha),h=r0*vt,E=v0*v0/2-mu/r0,p=h*h/mu;
 const e=Math.sqrt(Math.max(0,1+2*E*p/mu)); // e² = 1 + 2Eh²/μ²
 const nu0=Math.atan2(vr*p/h,p/r0-1); // e cos ν = p/r − 1, e sin ν = p·v_r/h
 return{h,E,p,e,a:E<0?-mu/(2*E):E>0?-mu/(2*E):Infinity,rp:p/(1+e),nu0,omega:-nu0};}
function keplerPos(el,t,mu){ // günberiden ölçülen süreye karşı konum (günberi doğrultusu ω)
 const{a,e}=el;let x,y;if(e<1){const n=Math.sqrt(mu/a**3),Mm=((n*t)%(2*Math.PI)+2*Math.PI)%(2*Math.PI);let E=e>0.8?Math.PI:Mm;for(let i=0;i<60;i++)E-=(E-e*Math.sin(E)-Mm)/(1-e*Math.cos(E));x=a*(Math.cos(E)-e);y=a*Math.sqrt(1-e*e)*Math.sin(E);}
 else{const A=-a,n=Math.sqrt(mu/A**3),Mm=n*t;let H=Math.asinh(Mm/e);for(let i=0;i<80;i++)H-=(e*Math.sinh(H)-H-Mm)/(e*Math.cosh(H)-1);x=A*(e-Math.cosh(H));y=A*Math.sqrt(e*e-1)*Math.sinh(H);}
 const c=Math.cos(el.omega),s=Math.sin(el.omega);return[x*c-y*s,x*s+y*c];}
function timeFromPeri(el,nu,mu){const{a,e}=el;if(e<1){const E=2*Math.atan(Math.sqrt((1-e)/(1+e))*Math.tan(nu/2));return(E-e*Math.sin(E))/Math.sqrt(mu/a**3);}const A=-a,H=2*Math.atanh(Math.sqrt((e-1)/(e+1))*Math.tan(nu/2));return(e*Math.sinh(H)-H)/Math.sqrt(mu/A**3);}

/* ── 1. birinci yasa ── */
const CASES=[[1,1.44,90],[1,1,90],[1,1.2,60],[0.5,0.7,120],[2.5,1.8,45],[3,0.3,150],[1,0.05,15],[0.3,1.99,90],[1.5,1.6,100]];
for(const[r0,q,ang]of CASES){const R=K.firstLaw({r0,q,angleDeg:ang}),mu=MU1,v0=Math.sqrt(q*mu/r0),el=elements(r0,v0,ang*PI/180,mu),m=R.measured;
 ok(R.track.closed,'bağlı yol kapanmalı');near(m.e,el.e,2e-7,'e (yoldan)');near(m.rp,el.rp,2e-7,'r_p');near(m.ra,el.a*(1+el.e),2e-7,'r_a');near(m.a,el.a,2e-7,'a');near(m.T,2*PI*Math.sqrt(el.a**3/mu),2e-7,'T');
 near(R.theory.e,el.e,1e-9);near(R.theory.a,el.a,1e-9);near(R.theory.rp,el.rp,1e-9);
 ok(R.track.driftE<5e-7&&R.track.driftH<5e-7,'korunum');
 // yol üzerindeki ara noktalar analitik Kepler konumuyla örtüşmeli
 const tp=-timeFromPeri(el,el.nu0,mu);for(const p of R.track.path.filter((_,i)=>i%97===0)){const[x,y]=keplerPos(el,p[0]-tp,mu);ok(Math.hypot(p[1]-x,p[2]-y)<3e-6*Math.max(1,el.a)/Math.sqrt(1-el.e),'Kepler denklemiyle konum '+r0+'/'+q+'/'+ang);}
 if(el.e>1e-3){ok(R.peri&&Math.abs(R.peri.r-el.rp)<1e-8*el.rp+1e-12,'günberi olayı');near(R.peri.v,Math.sqrt(mu*(1+el.e)/el.rp),1e-7,'v_p');near(R.peri.r*R.peri.v,R.apo.r*R.apo.v,1e-7,'r_p v_p = r_a v_a');}}
// açık yollar
for(const[r0,q,ang]of[[1,2,90],[1,2.56,90],[1,2.56,120],[2,3,70],[0.6,2.2,140]]){const R=K.firstLaw({r0,q,angleDeg:ang}),v0=Math.sqrt(q*MU1/r0),el=elements(r0,v0,ang*PI/180,MU1);
 ok(!R.track.closed&&R.track.escaped,'açık yol kaçar');eq(R.measured.T,null);eq(R.measured.a,null);near(R.theory.e,el.e,1e-8,'e kuram');
 if(ang>=90){near(R.measured.rp,el.rp,1e-8,'açık yolda günberi');near(R.measured.e,el.e,1e-7,'e ölçülen');}else{eq(R.measured.rp,null,'günberi geçmişte: ölçülmez');}
 eq(R.theory.kind,q===2?'parabol':'hiperbol');const last=R.track.path[R.track.path.length-1],r=Math.hypot(last[1],last[2]);
 ok(r>30*Math.max(r0,el.rp),'uzak sınırı aşıldı');near((last[3]**2+last[4]**2)/2-MU1/r,el.E,1e-7*Math.max(1,MU1/r0),'enerji korunur');
 if(el.e>1.0001){const tp=-timeFromPeri(el,el.nu0,MU1);const[x,y]=keplerPos(el,last[0]-tp,MU1);ok(Math.hypot(last[1]-x,last[2]-y)<1e-5*r,'hiperbolde Kepler konumu');}}
// adım yarılanınca hata ~η⁴ azalır (RK4); kaba adımda fark integrasyondandır
{const c=K.firstLaw({r0:1,q:1.44,angleDeg:90,eta:0.2}),m=K.firstLaw({r0:1,q:1.44,angleDeg:90,eta:0.1}),f=K.firstLaw({r0:1,q:1.44,angleDeg:90,eta:0.05});const Tt=(1/0.56)**1.5,ec=Math.abs(c.measured.T-Tt),em=Math.abs(m.measured.T-Tt),ef=Math.abs(f.measured.T-Tt);ok(ec/em>10&&em/ef>10,'RK4 yakınsaması '+ec/em+' '+em/ef);ok(c.track.driftE>1e-6&&c.track.driftE<1e-3,'kaba adımda görünür enerji sapması');}
// sınır: en büyük hız ve en yakın günberi; birimler
{const R=K.firstLaw({r0:1,q:1.99,angleDeg:90});near(R.measured.a,100,1e-6);near(R.measured.T,1000,1e-6);near(K.KMS,4.740470463533348,1e-12,'1 AU/yıl km/s');near(K.firstLaw({r0:1,q:1,angleDeg:90}).vc*K.KMS,2*PI*149597870700/(365.25*86400)/1000,1e-12,'1 AU çember hızı');}
for(const bad of[{r0:0,q:1,angleDeg:90},{r0:1,q:0,angleDeg:90},{r0:1,q:1,angleDeg:0},{r0:1,q:1,angleDeg:180},{r0:NaN,q:1,angleDeg:90}]){assert.throws(()=>K.firstLaw(bad));checks++;}

/* ── 2. ikinci yasa ── */
for(const[a,e,N,k]of[[1,0.6,12,1000],[1,0.6,12,1],[1,0.6,12,10],[2,0.9,24,100],[0.5,0,4,2],[5,0.21,7,20]]){const A=K.equalAreas({a,e,N,k}),mu=MU1,T=2*PI*Math.sqrt(a**3/mu),b=a*Math.sqrt(1-e*e),el={a,e,omega:0};
 near(A.T,T,1e-7,'periyot');near(A.areaTh,PI*a*b/N,1e-12,'πab/N');
 // bağımsız: aynı anlardaki analitik konumlardan çokgen alanı
 const ref=[];for(let i=0;i<N;i++){let s=0;for(let j=i*k;j<(i+1)*k;j++){const t0=j*T/(N*k),t1=(j+1)*T/(N*k),p=keplerPos(el,t0,mu),q=keplerPos(el,t1,mu);s+=0.5*(p[0]*q[1]-q[0]*p[1]);}ref.push(s);}
 A.slices.forEach((s,i)=>near(s,ref[i],2e-7,'çokgen dilim '+i));
 // kapalı biçim: gerçek (eğri kenarlı) alan her dilimde πab/N; çokgen bundan küçüktür ve k arttıkça yaklaşır
 A.slices.forEach(s=>ok(s<=A.areaTh*(1+1e-8),'çokgen yaydan küçük'));
 if(e>0.1&&k<=100)ok(A.spread/A.twinSpread>3.5&&A.spread/A.twinSpread<4.5,'kiriş hatası k⁻² ile azalır');
 ok((A.hMax-A.hMin)/A.hMax<1e-9,'h sabit');near(A.hMin,Math.sqrt(mu*a*(1-e*e)),1e-8,'h = √(GM a(1−e²))');
 if(e>0){near(A.peri.r,a*(1-e),1e-8);near(A.apo.r,a*(1+e),1e-8);near(A.peri.v/A.apo.v,(1+e)/(1-e),1e-7,'hız oranı');}else{eq(A.peri,null);eq(A.apo,null);}
 ok(A.closure<1e-6,'tur kapanır');}
{const A=K.equalAreas({a:1,e:0.6,N:12,k:1});ok(A.slices[0]<A.slices[5]&&A.slices[11]<A.slices[6],'kaba üçgende günberi dilimi daha çok kaybeder');ok(A.spread>0.3,'k = 1 belirgin eşitsizlik');}
{const A=K.equalAreas({a:1,e:0.6,N:12,k:1000});ok(A.spread<1e-6,'ince ölçümde dilimler eşit');}

/* ── 3. üçüncü yasa ── */
for(const[M,e]of[[1,0],[4,0],[0.25,0.6],[1,0.8],[2.35,0.35]]){const R=K.thirdLaw({M,e});eq(R.orbits.length,5);
 for(const o of R.orbits){near(o.T,2*PI*Math.sqrt(o.a**3/(MU1*M)),1e-7,'T kapalı biçim');near(o.aMeas,o.a,1e-7,'a ölçülen');near(o.ratio,1/M,2e-7,'T²/a³ = 1/M');}
 // bağımsız en küçük kareler (log10 ile)
 const xs=R.orbits.map(o=>Math.log10(o.aMeas)),ys=R.orbits.map(o=>Math.log10(o.T)),mx=xs.reduce((a,b)=>a+b)/5,my=ys.reduce((a,b)=>a+b)/5;let sxy=0,sxx=0;xs.forEach((x,i)=>{sxy+=(x-mx)*(ys[i]-my);sxx+=(x-mx)**2;});
 near(R.fit.slope,sxy/sxx,1e-10,'eğim');near(R.fit.slope,1.5,1e-7,'eğim 3/2');near(R.ratioTh,1/M,1e-12);}
{const P=K.planetData(),NASA=[['Merkür',57.909,87.969],['Venüs',108.210,224.701],['Dünya',149.598,365.256],['Mars',227.956,686.980],['Jüpiter',778.479,4332.589],['Satürn',1432.041,10755.699],['Uranüs',2867.043,30685.400],['Neptün',4514.953,60189.018]];
 // yıldızıl dönem + bilgi sayfasının a'sı: iç gezegenler 2·10⁻⁴ içinde, Jüpiter kütle düzeltmesine yakın; JPL ortalama a ile (Standish, 1800–2050) hepsi 1/(1+m/M☉)'ye 1,3·10⁻³ içinde
 const JPL=[0.38709927,0.72333566,1.00000261,1.52371034,5.20288700,9.53667594,19.18916464,30.06992276],MASS=[0.33010,4.8673,5.9722,0.64169,1898.13,568.32,86.811,102.409];
 eq(P.rows.length,8);NASA.forEach(([n,a,T],i)=>{eq(P.rows[i].name,n);eq(P.rows[i].aMkm,a);eq(P.rows[i].Tday,T);near(P.rows[i].a,a*1e9/149597870700,1e-12);near(P.rows[i].T,T/365.25,1e-12);});
 ok(Math.abs(P.fit.slope-1.5)<0.005,'NASA eğimi 3/2 yakınında: '+P.fit.slope);ok(P.fit.r2>0.99999,'NASA log-log doğrusal');near(P.rows[2].ratio,1,1e-3,'Dünya T²/a³ ≈ 1');ok(P.rows.every(r=>Math.abs(r.ratio-1)<0.013),'her gezegen %1,3 içinde');ok(P.rows.slice(0,4).every(r=>Math.abs(r.ratio-1)<2e-4),'iç gezegenler 2·10⁻⁴ içinde');near(P.rows[4].ratio,1/(1+1898.13e24/1.98847e30),7e-4,'Jüpiter kütle düzeltmesi');
 P.rows.forEach((r,i)=>{eq(r.m24,MASS[i]);ok(Math.abs(r.T*r.T/JPL[i]**3*(1+r.m24/1.98847e6)-1)<1.3e-3,'JPL ortalama a ile '+r.name);});near(P.fit.slope,1.4990195,1e-6,'NASA eğimi');}

/* ── 4. iki cisim: bağımsız leapfrog ── */
function leapfrog(M,m,a,e,steps){const mu=MU1*(M+m),rp=a*(1-e),vp=Math.sqrt(mu*(1+e)/rp),T=2*PI*Math.sqrt(a**3/mu),dt=T/steps;let x1=-m/(M+m)*rp,y1=0,x2=M/(M+m)*rp,y2=0,u1=0,w1=-m/(M+m)*vp,u2=0,w2=M/(M+m)*vp;
 const acc=()=>{const dx=x2-x1,dy=y2-y1,r3=Math.hypot(dx,dy)**3;return[MU1*m*dx/r3,MU1*m*dy/r3,-MU1*M*dx/r3,-MU1*M*dy/r3];};let A=acc(),ang=0,prev=0,t=0,cross=null,rmin=Infinity,rmax=0,d1min=Infinity,d1max=0;
 for(let i=0;i<steps*1.2;i++){u1+=dt/2*A[0];w1+=dt/2*A[1];u2+=dt/2*A[2];w2+=dt/2*A[3];x1+=dt*u1;y1+=dt*w1;x2+=dt*u2;y2+=dt*w2;A=acc();u1+=dt/2*A[0];w1+=dt/2*A[1];u2+=dt/2*A[2];w2+=dt/2*A[3];t+=dt;
  const th=Math.atan2(y2-y1,x2-x1);let d=th-prev;if(d<-PI)d+=2*PI;if(d>PI)d-=2*PI;if(cross===null&&ang+d>=2*PI)cross=t-dt*(ang+d-2*PI)/d;ang+=d;prev=th;const r=Math.hypot(x2-x1,y2-y1);rmin=Math.min(rmin,r);rmax=Math.max(rmax,r);const d1=Math.hypot(x1-(M*x1+m*x2)/(M+m),y1-(M*y1+m*y2)/(M+m));d1min=Math.min(d1min,d1);d1max=Math.max(d1max,d1);}
 return{T:cross,a:(rmin+rmax)/2,a1:(d1min+d1max)/2};}
for(const[m,a,e]of[[0.3,1,0.3],[1,1,0],[0.01,3,0.7],[0.5,0.5,0.5],[1,2,0.65]]){const R=K.twoBody({m,a,e}),L=leapfrog(1,m,a,e,200000),mu=MU1*(1+m);
 near(R.T,L.T,2e-6,'T leapfrog');near(R.aRel,L.a,2e-5,'a leapfrog');near(R.a1,L.a1,2e-5,'a_M leapfrog');
 near(R.T,2*PI*Math.sqrt(a**3/mu),1e-7,'T = 2π√(a³/G(M+m))');near(R.a1,a*m/(1+m),1e-7);near(R.a2,a/(1+m),1e-7);near(R.a1/R.a2,m,1e-7,'a_M/a_m = m/M');ok(R.com<1e-12,'kütle merkezi sabit');
 near(R.ratio,1/(1+m),1e-7,'T²/a³ = 1/(M+m)');near(R.th.TK/R.T,Math.sqrt(1+m),1e-7,'Kepler biçimi √(1+m/M) kadar uzun');near(R.muRed,m/(1+m),1e-14);}
for(const bad of[{m:0,a:1,e:0},{m:1,a:0,e:0},{m:1,a:1,e:1}]){assert.throws(()=>K.twoBody(bad));checks++;}
assert.throws(()=>K.equalAreas({a:1,e:1,N:4,k:1}));assert.throws(()=>K.thirdLaw({M:0}));checks+=2;
console.log(`G ${SLUG}: ${checks.toLocaleString('tr-TR')} bağımsız Kepler denklemi, çokgen alan, leapfrog ve NASA verisi kontrolü PASS`);

if(process.argv.includes('--browser')){
 const{createRequire}=await import('node:module');const{createServer}=await import('node:http');const{join,extname}=await import('node:path');const{fileURLToPath}=await import('node:url');const rootDir=fileURLToPath(new URL('../',import.meta.url));
 const{chromium}=createRequire(join(rootDir,'package.json'))('playwright');
 const server=createServer((req,res)=>{const file=join(rootDir,decodeURIComponent(new URL(req.url,'http://localhost').pathname));if(!fs.existsSync(file)||fs.statSync(file).isDirectory()){res.writeHead(404).end();return;}res.setHeader('Content-Type',({'.html':'text/html; charset=utf-8','.js':'text/javascript; charset=utf-8','.css':'text/css; charset=utf-8'})[extname(file)]||'application/octet-stream');res.end(fs.readFileSync(file));});
 await new Promise(r=>server.listen(0,'127.0.0.1',r));let browser;const before=checks;
 try{browser=await chromium.launch();
  for(const[width,theme]of[[390,'light'],[1280,'dark']]){
   const ctx=await browser.newContext({viewport:{width,height:900},deviceScaleFactor:width===390?2:1,locale:'tr-TR'});await ctx.addInitScript(t=>{localStorage.setItem('acelya-theme',t);localStorage.setItem('acelya-sound-muted','1');},theme);
   const page=await ctx.newPage();page.setDefaultTimeout(8000);const errors=[];page.on('pageerror',e=>errors.push(e.message));page.on('console',m=>{if(m.type()==='error'&&!/404|Failed to load resource/.test(m.text()))errors.push(m.text());});
   await page.goto(`http://127.0.0.1:${server.address().port}/${SLUG}.html`);await page.waitForTimeout(400);
   const click=id=>page.locator('#'+id).click(),read=async id=>(await page.locator('#'+id).textContent()).trim(),val=id=>page.locator('#'+id).inputValue();
   const set=(id,v)=>page.locator('#'+id).evaluate((e,v)=>{if(e.type==='checkbox'){e.checked=v;e.dispatchEvent(new Event('change',{bubbles:true}));}else{e.value=v;e.dispatchEvent(new Event(e.tagName==='SELECT'?'change':'input',{bubbles:true}));}},v);
   const has=async(id,t)=>{const s=await read(id);assert(s.includes(t),`${id}: "${s}" içinde "${t}" yok`);checks++;};
   const noOverflow=async w=>{eq(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),true,'yatay taşma: '+w);};
   const clean=async name=>{const t=await page.locator('#panel-'+name).innerText();ok(!/NaN|undefined|Infinity|null/.test(t),name+' panelinde bozuk sayı: '+(t.match(/.{0,30}(NaN|undefined|Infinity|null).{0,30}/)||[''])[0]);};
   const sweep=async(name,ids)=>{for(const id of ids){const r=await page.locator('#'+id).evaluate(e=>[e.min,e.max,e.step]);for(const v of[r[0],r[1]]){await set(id,v);await clean(name);}}};
   // etiketler: her denetimin <label for> eşleşmesi var
   eq(await page.evaluate(()=>[...document.querySelectorAll('input,select')].every(e=>document.querySelector(`label[for="${e.id}"]`)||e.closest('label'))),true,'etiketsiz denetim');
   eq(await page.evaluate(()=>[...document.querySelectorAll('canvas.kp-canvas,canvas.kp-chart')].every(c=>c.getAttribute('role')==='img'&&c.getAttribute('aria-label'))),true,'tuval rolü');
   // 1 · varsayılan elips
   await has('m1Rp','1,0000');await has('m1Ra','2,5714');await has('m1A','1,7857');await has('m1E','0,4400');await has('m1T','2,3863');await has('t1T','2,3863');await has('m1Vp','35,74');await has('l1V0','35,74 km/s');await has('l1Vce','29,79 / 42,12');await has('l1Eps','−11,054');await has('l1Status','Elips');
   await click('l1PreCircle');await has('m1E','0,0000');await has('l1Status','Çember');await has('m1T','1,0000');
   await click('l1PreTilt');eq(await val('l1Ang'),'60');await has('m1Rp','0,5886');await has('m1Ra','1,9114');await has('m1E','0,5292');await has('m1T','1,3975');
   await click('l1PrePara');eq(await val('l1Q'),'2');await has('l1Status','Parabol');await has('m1T','—');await has('t1A','∞');await has('m1E','1,0000');
   await click('l1PreHyper');await has('l1Status','Hiperbol');await has('m1E','1,5600');await has('t1A','hiperbolde a < 0');
   await set('l1Ang',60);await has('m1Rp','—');await has('l1Status','Günberi geçmişte');
   await set('l1Q',0.05);await set('l1Ang',15);await has('l1Status','Uyarı');
   await click('l1Reset');await set('l1Eta','0.2');await has('l1Status','Kaba adım');await has('m1T','2,3862');
   await sweep('ellipse',['l1R0','l1Q','l1Ang']);await click('l1Reset');await has('m1T','2,3863');eq(await val('l1Eta'),'0.01');await clean('ellipse');await noOverflow('elips');
   // klavye: Boşluk duraklatır, R sıfırlar
   await page.locator('h1').click();await page.keyboard.press('Space');await has('l1Pause','Devam et');await page.keyboard.press('Space');await has('l1Pause','Duraklat');
   await set('l1Q',2);await page.locator('h1').click();await page.keyboard.press('r');eq(await val('l1Q'),'1.44');
   // 2 · eşit alanlar
   await click('tab-area');await has('l2Area','0,20944 / 0,20944');await has('l2T','1,00000 yıl');await has('l2Peri','0,4000 AU · 59,57 km/s');await has('l2Apo','1,6000 AU · 14,89 km/s');await has('l2Ratio','4,0000 / 4,0000');await has('l2Status','Dilimler eşit');await has('l2Status','oran 4,00');
   await click('l2PreCoarse');eq(await val('l2K'),'1');await has('l2Status','ölçülebilir fark');await has('l2Spread','0,358');
   await click('l2PreComet');await has('l2Ratio','19,0000 / 19,0000');await set('l2E',0);await has('l2Peri','tanımsız');await has('l2Status','Çember');
   await sweep('area',['l2A','l2E','l2N']);for(const k of['1','2','10','100','1000']){await set('l2K',k);await clean('area');}
   await click('l2Reset');await has('l2Area','0,20944 / 0,20944');await noOverflow('alan');
   // 3 · üçüncü yasa
   await click('tab-third');await has('l3Slope','1,500000');await has('l3Ratio','1,000000');await has('l3PSlope','1,4990');await has('l3PRatio','0,9878 – 1,0027');await has('l3PlanetRows','4.332,589');await has('l3PlanetRows','60.189,018');await has('l3PlanetRows','0,9886');await has('l3PlanetRows','0,9985');await has('l3Status','Neptün, 0,9878');await has('l3Status','Jüpiter\'de 0,9985');ok(!(await read('l3Status')).includes('ölçülemez'),'eski açıklama kalktı');
   await click('l3PreHeavy');await has('l3Ratio','0,250000');await has('l3Slope','1,500000');await click('l3PreLight');await has('l3Ratio','4,000000');await click('l3PreEcc');await has('l3Ratio','1,000000');await has('l3Status','yasada e yok');
   await set('l3Real',false);eq(await page.locator('#l3PlanetWrap').isHidden(),true);await sweep('third',['l3M','l3E']);await click('l3Reset');eq(await page.locator('#l3Real').isChecked(),true);await has('l3Ratio','1,000000');await noOverflow('üçüncü');
   // 4 · iki cisim
   await click('tab-two');await has('m4T','0,87706');await has('l4Status','m/(M + m) = 0,2308 katı');await has('t4T','0,87706');await has('l4TK','1,00000');await has('m4A1','0,23077');await has('m4A2','0,76923');await has('l4Ratio','0,30000');await has('l4Mu','0,2308');await has('l4Com','10⁻¹³');
   await click('l4PreTwin');await has('m4T','0,70711');await has('l4Status','Eşit kütlelerde');await click('l4PreJup');await has('l4Status','neredeyse kıpırdamaz');await set('l4View','rel');await page.waitForTimeout(100);
   await sweep('two',['l4m','l4A','l4E']);await click('l4Reset');eq(await val('l4View'),'com');await has('m4T','0,87706');await noOverflow('iki cisim');
   // sekme klavyesi
   await page.locator('#tab-two').focus();await page.keyboard.press('Home');eq(await page.locator('#tab-ellipse').getAttribute('aria-selected'),'true');await page.keyboard.press('ArrowLeft');eq(await page.locator('#tab-two').getAttribute('aria-selected'),'true');await page.keyboard.press('End');eq(await page.locator('#tab-two').getAttribute('aria-selected'),'true');await page.keyboard.press('ArrowRight');eq(await page.locator('#tab-ellipse').getAttribute('aria-selected'),'true');
   eq(await page.evaluate(()=>Object.isFrozen(KeplerLab)&&!Object.getOwnPropertyDescriptor(window,'KeplerLab').writable),true);
   // gezegen ekranda kalır (simulasyon-notlari düzeltmesi): tuvalde kırmızı nokta görüntü kutusunun içinde
   for(const pre of['l1PreEllipse','l1PreHyper','l1PrePara']){await click(pre);await page.waitForTimeout(1200);eq(await page.evaluate(()=>{const c=document.getElementById('c1Orbit'),r=c.getBoundingClientRect(),[x,y]=(c.dataset.planet||'-1,-1').split(',').map(Number);return x>=0&&y>=0&&x<=r.width&&y<=r.height;}),true,'gezegen tuvalde: '+pre);}
   await page.evaluate(()=>{document.documentElement.dataset.theme=document.documentElement.dataset.theme==='light'?'dark':'light';});await page.waitForTimeout(200);
   for(const t of['ellipse','area','third','two']){await click('tab-'+t);await page.waitForTimeout(150);eq(await page.evaluate(n=>[...document.querySelectorAll('#panel-'+n+' canvas')].every(c=>c.width>100&&c.height>60),t),true,'tuval boyutu '+t);await clean(t);await noOverflow(t);}
   assert.deepEqual(errors,[]);checks++;await ctx.close();}
  console.log(`G ${SLUG}: ${checks-before} tarayıcı kontrolü (390 açık, 1280 koyu) PASS`);
 }finally{await browser?.close();await new Promise(r=>server.close(r));}
}
