// Kalıcı denetim: newton-hareket-yasalari.html çekirdeği (window.NewtonLab) bağımsız referanslara karşı sınanır.
// Referanslar sayfanın formüllerini yeniden kullanmaz: kapalı biçimler burada elle yazılmıştır, ayrıca iş–enerji dengesi,
// momentum korunumu ve farklı bir integratör (küçük adımlı açık Euler / RK4) kullanılır. `--browser`: Playwright UI denetimi.
import fs from 'node:fs';
import vm from 'node:vm';
import assert from 'node:assert/strict';
const SLUG='newton-hareket-yasalari';
const html=fs.readFileSync(new URL(`../${SLUG}.html`,import.meta.url),'utf8');
const source=html.split('/* KERNEL-BEGIN */')[1]?.split('/* KERNEL-END */')[0];
assert(source,'Çekirdek sınır işaretleri gerekli');
const context={window:{}};vm.createContext(context);vm.runInContext(source,context);
const K=context.window.NewtonLab;assert(Object.isFrozen(K));
let checks=0;const g=9.81;
const near=(actual,expected,tol=1e-9,label='')=>{assert(Math.abs(actual-expected)<=tol*Math.max(1,Math.abs(expected)),`${label} ${actual} ≠ ${expected}`);checks++;};
const ok=(cond,label)=>{assert(cond,label);checks++;};
const lcg=seed=>{let s=seed>>>0;return()=>(s=(Math.imul(s,1664525)+1013904223)>>>0)/4294967296;};

/* ── 1. Coulomb sürtünmesi ve blok ── */
for(const m of[.5,2,10])for(const mus of[0,.04,.5,1.2])for(const muk of[0,.02,.3,1]){if(muk>mus)continue;const N=m*g;
  for(const frac of[0,.25,.999,1]){const F=frac*mus*N,r=K.friction({N,mus,muk,F,v:0});ok(r.regime==='static','eşik altı statik');near(r.f,-F,1e-12,'statik f = −F');near(r.net,0);}
  const F=mus*N*1.001+1e-6,r=K.friction({N,mus,muk,F,v:0});ok(r.regime==='kinetic','eşik üstü kinetik');near(r.f,-muk*N);near(r.net,F-muk*N);
  near(K.friction({N,mus,muk,F:0,v:3}).f,-muk*N);near(K.friction({N,mus,muk,F:0,v:-3}).f,muk*N);}
assert.throws(()=>K.friction({N:1,mus:.2,muk:.3,F:0,v:0}));checks++;
// Sabit kuvvet: x = ½·a·T², v = a·T; farklı adımlarla
for(const dt of[1/60,1/240,.0137])for(const[m,mus,muk,F]of[[2,.5,.3,10],[1,0,0,3],[5,.6,.3,40],[.5,1,.7,6]]){const N=m*g,a=(F-muk*N)/m;let s={x:0,v:0,t:0};const n=Math.round(2/dt);for(let i=0;i<n;i++)s=K.slideStep(s,{m,N,mus,muk,F},dt);const T=n*dt;near(s.t,T,1e-9);near(s.v,a*T,1e-9,'v=aT');near(s.x,.5*a*T*T,1e-9,'x=½aT²');}
// Durma yolu v0²/(2μk·g), durma süresi v0/(μk·g); adım durma anına denk gelmese de
for(const dt of[1/60,1/240,.0137])for(const v0 of[.3,2,7.5])for(const muk of[.02,.3,.7])for(const m of[.5,4]){const N=m*g;let s={x:0,v:v0,t:0},stop=null;for(let i=0;i<200000&&stop===null;i++){s=K.slideStep(s,{m,N,mus:muk+.1,muk,F:0},dt);if(s.stopT!==null)stop=s.stopT;}near(s.x,v0*v0/(2*muk*g),1e-10,'durma yolu');near(stop,v0/(muk*g),1e-10,'durma süresi');ok(s.v===0,'tam sıfır hız');const after=K.slideStep(s,{m,N,mus:muk+.1,muk,F:0},1);near(after.x,s.x,0);}
// Sürtünmesiz yüzey: hız sonsuza dek sabit
{let s={x:0,v:1.7,t:0};for(let i=0;i<240*600;i++)s=K.slideStep(s,{m:2,N:2*g,mus:0,muk:0,F:0},1/240);near(s.v,1.7,0);near(s.x,1.7*600,1e-9);}
// İş–enerji dengesi: rastgele parça parça sabit kuvvet programı
for(const seed of[1,2,3,4,5,6,7,8]){const R=lcg(seed),m=.5+R()*9,mus=R()*1.2,muk=mus*R(),N=m*g;let s={x:0,v:0,t:0},W=0,F=0;for(let i=0;i<4800;i++){if(i%240===0)F=R()<.25?0:R()*60;const n=K.slideStep(s,{m,N,mus,muk,F},1/240),dx=n.x-s.x;ok(dx>=0,'geri kayma yok');W+=F*dx-muk*N*dx;s=n;}near(W,.5*m*s.v*s.v,1e-8,'iş–enerji');}
// İkinci integratör: küçük adımlı açık Euler, kendi yapış–kay mantığıyla
function eulerBlock({m,mus,muk,prog,T,h=2e-6}){const N=m*g;let x=0,v=0;for(let t=0;t<T-h/2;t+=h){const F=prog(t);let a;if(v===0){a=Math.abs(F)<=mus*N?0:(F-Math.sign(F)*muk*N)/m;}else a=(F-Math.sign(v)*muk*N)/m;const vn=v+a*h;if(v!==0&&vn*v<0){x+=v*h/2;v=0;}else{x+=v*h;v=vn;}}return{x,v};}
for(const[m,mus,muk]of[[2,.5,.3],[1,.6,.3],[3,.05,.03]]){const prog=t=>t<1?mus*m*g*1.3:t<1.5?0:t<2.5?mus*m*g*.5:mus*m*g*2;let s={x:0,v:0,t:0};for(let i=0;i<240*3;i++)s=K.slideStep(s,{m,N:m*g,mus,muk,F:prog((i+.5)/240)},1/240);const e=eulerBlock({m,mus,muk,prog,T:3});near(s.x,e.x,2e-4,'Euler x');near(s.v,e.v,2e-4,'Euler v');}

/* ── 2. Atwood ve yarı-Atwood ── */
for(const M of[.2,.5,2])for(const m of[.01,.05,.3])for(const mu of[0,.02,.1])for(const mp of[0,.05,.2]){const q=K.pulley({mode:'half',M,m,mu,mp});
  if(m<=mu*M){ok(!q.moves,'sürtünme tutar');near(q.a,0);near(q.Th,m*g);continue;}
  const a=(m-mu*M)*g/(M+m+mp/2);near(q.a,a,1e-12,'yarı-Atwood a');near(q.Th,m*(g-a),1e-12);near(q.Tc,M*a+mu*M*g,1e-12);near(q.Th-q.Tc,mp/2*a,1e-9,'makara torku');ok(q.Th<m*g,'T < mg');
  // Enerji: d kadar yolda ½(M+m+mp/2)v² = (m − μM)·g·d
  for(const d of[.2,.8,1]){const r=K.gateRun({a:q.a,d});near(.5*(M+m+mp/2)*r.v**2,(m-mu*M)*g*d,1e-9,'enerji');near(r.t,Math.sqrt(2*d/a),1e-10,'kapı süresi');}}
for(const m1 of[.1,.5,1])for(const m2 of[.1,.55,1])for(const mp of[0,.1]){const q=K.pulley({mode:'atwood',M:m1,m:m2,mp}),a=(m2-m1)*g/(m1+m2+mp/2);near(q.a,a,1e-12,'Atwood a');near(q.Th,m2*(g-a),1e-12);near(q.Tc,m1*(g+a),1e-12);ok(q.moves===(m1!==m2));const sw=K.pulley({mode:'atwood',M:m2,m:m1,mp});near(sw.a,-q.a,1e-12);if(mp===0)near(q.Th,2*m1*m2*g/(m1+m2),1e-12,'T = 2m₁m₂g/(m₁+m₂)');}
// Kapı zamanlaması adım büyüklüğünden bağımsız; ayrıca bağımsız Euler
for(const dt of[1/30,1/60,1/240,1/1000,.0123])for(const a of[.05,.8918181818,4.2])for(const d of[.2,.8,1]){near(K.gateRun({a,d,dt}).t,Math.sqrt(2*d/a),1e-11,'kapı/dt');}
{const a=.8918181818181818,h=1e-6;let s=0,v=0,t=0;while(s<.8){v+=a*h;s+=v*h;t+=h;}near(K.gateRun({a,d:.8}).t,t,2e-5,'Euler kapı');}
ok(K.gateRun({a:0,d:.5})===null);ok(K.gateRun({a:-1,d:.5})===null);
// Üreteç: belirlenimli, yaklaşık standart normal
{const A=K.rng(7),B=K.rng(7);let sum=0,sq=0;const n=40000;for(let i=0;i<n;i++){const x=A.gauss();ok(x===B.gauss());sum+=x;sq+=x*x;}checks-=n-1;ok(Math.abs(sum/n)<.02,'ortalama');ok(Math.abs(sq/n-1)<.03,'varyans');ok(K.rng(1).gauss()!==K.rng(2).gauss());}
{const f=K.linfit([0,1,2,3],[1,3,5,7]);near(f.slope,2);near(f.intercept,1);near(f.r2,1);}
const loads=[.02,.04,.06,.08,.1,.12];
// Gürültüsüz veri serisi: eğim ve kesim kapalı biçimle
for(const Mtot of[.25,.55,1.05,2.3])for(const mu of[0,.01,.02])for(const mp of[0,.1,.2])for(const d of[.2,.8]){const r=K.dataRun({mode:'half',Mtot,loads,mu,mp,d}),Meff=Mtot+mp/2,moved=loads.filter(L=>L>mu*(Mtot-L));ok(r.points.filter(p=>p.moved).length===moved.length);if(moved.length>=2){near(r.fit.slope,(1+mu)/Meff,1e-9,'eğim');near(r.fit.intercept,-mu*g*Mtot/Meff,1e-8,'kesim');near(r.Mfit,Meff/(1+mu),1e-9);}
  const at=K.dataRun({mode:'atwood',Mtot,loads,mp,d});near(at.Mfit,Meff,1e-9,'Atwood eğim');near(at.fit.intercept,0,1e-9);}
// Gürültülü seri: 99 tohumun hepsinde makul, ortalaması yansız
for(const[sigma,worst,bias]of[[.0005,.006,.001],[.002,.025,.003],[.005,.06,.008]]){let sum=0,mx=0;for(let seed=1;seed<=99;seed++){const r=K.dataRun({mode:'half',Mtot:.55,loads,d:.8,sigma,seed}),e=r.Mfit/.55-1;sum+=e;mx=Math.max(mx,Math.abs(e));const again=K.dataRun({mode:'half',Mtot:.55,loads,d:.8,sigma,seed});ok(again.Mfit===r.Mfit,'aynı tohum aynı seri');checks--;}ok(mx<worst,`σ=${sigma}: en kötü ${mx}`);ok(Math.abs(sum/99)<bias,`σ=${sigma}: yanlılık ${sum/99}`);}
assert.throws(()=>K.dataRun({mode:'half',Mtot:.1,loads,d:.8}));checks++;

/* ── 3a. Yayla ayrılan arabalar ── */
function rk4Spring({m1,m2,k,x0},h=1e-5){const mu=m1*m2/(m1+m2);let c=x0,w=0,t=0;const f=(c,w)=>[w,-(k/mu)*c];for(;;){const[a1,b1]=f(c,w),[a2,b2]=f(c+h/2*a1,w+h/2*b1),[a3,b3]=f(c+h/2*a2,w+h/2*b2),[a4,b4]=f(c+h*a3,w+h*b3),cn=c+h/6*(a1+2*a2+2*a3+a4),wn=w+h/6*(b1+2*b2+2*b3+b4);if(cn<=0){const fr=c/(c-cn);return{t:t+h*fr,vrel:-(w+(wn-w)*fr)};}c=cn;w=wn;t+=h;}}
for(const m1 of[.25,.5,2])for(const m2 of[.25,1,2])for(const k of[20,50,200])for(const x0 of[.02,.08,.1]){const p={m1,m2,k,x0,L0:.2},s=K.springRun(p),mu=m1*m2/(m1+m2),vrel=x0*Math.sqrt(k/mu);
  near(s.sep,Math.PI/2*Math.sqrt(mu/k),2e-6,'ayrılma süresi');near(s.v1,-vrel*m2/(m1+m2),1e-6,'v1');near(s.v2,vrel*m1/(m1+m2),1e-6,'v2');
  ok(Math.abs(m1*s.v1+m2*s.v2)<1e-12*mu*vrel+1e-15,'momentum korunur');near(.5*m1*s.v1**2+.5*m2*s.v2**2,.5*k*x0*x0,2e-6,'enerji');near(s.J1,-s.J2,1e-12,'itmeler zıt');near(s.J2,m2*s.v2,1e-12,'itme = Δp');near(s.maxF,k*x0,1e-12);
  near(Math.abs(s.v1/s.v2),m2/m1,1e-9,'hız oranı');}
{const p={m1:.5,m2:1,k:50,x0:.08,L0:.2},r=rk4Spring(p),s=K.springRun(p),half=K.springRun(p,{dt:5e-5});near(s.sep,r.t,1e-6,'RK4 süre');near(s.v2-s.v1,r.vrel,1e-6,'RK4 bağıl hız');ok(Math.abs(half.sep-r.t)<=Math.abs(s.sep-r.t)+1e-12,'h/2 ikizi yakınsar');
  // Her adımda: kuvvetler tek bir sayıdan gelir, ivmeler ters kütle oranında, kütle merkezi yerinde
  let st=K.springStart(p);const cm0=(p.m1*st.x1+p.m2*st.x2);for(let i=0;i<1000;i++){const F=K.springForce(p,st.x1,st.x2);st=K.springStep(st,p,1e-4);ok(Math.abs(p.m1*st.x1+p.m2*st.x2-cm0)<1e-13,'kütle merkezi');ok(Math.abs(p.m1*st.v1+p.m2*st.v2)<1e-13,'anlık momentum');ok(F>=0);}
  const after=K.springRun(p,{after:.5});near(after.v1,s.v1,1e-12,'ayrıldıktan sonra sabit hız');ok(after.F===0);}

/* ── 3b. Dayalı bloklar ── */
for(const m1 of[.5,1,5])for(const m2 of[.5,3,5])for(const F of[1,12,40])for(const mu of[0,.1,.5])for(const side of['left','right']){const q=K.contact({m1,m2,F,mu,side}),mp=side==='left'?m1:m2,mf=side==='left'?m2:m1;
  if(F<=mu*(m1+m2)*g){ok(!q.moves&&q.C===null,'kaymıyorsa C yazılmaz');continue;}
  near(q.a,F/(m1+m2)-mu*g,1e-10,'blok ivmesi');near(q.C,F*mf/(m1+m2),1e-10,'temas kuvveti');near(mp*q.a,F-q.C-mu*mp*g,1e-9,'itilen blok dengesi');near(mf*q.a,q.C-mu*mf*g,1e-9,'öndeki blok dengesi');ok(q.C<F,'C < F');
  near(q.C+K.contact({m1,m2,F,mu,side:side==='left'?'right':'left'}).C,F,1e-10,'iki yönün toplamı F');}

/* ── 3c. Eğik düzlem ── */
for(const mus of[.05,.3,.5,1.2])for(const muk of[0,.03,.3])for(const m of[.5,1,5]){if(muk>mus)continue;const thc=Math.atan(mus)*180/Math.PI,lo=Math.floor(thc*10-1e-9)/10,hi=lo+.1;
  ok(K.incline({m,mus,muk,deg:lo}).regime==='static',`${lo}° tutar`);ok(K.incline({m,mus,muk,deg:Math.round(hi*10)/10+(Math.abs(hi-thc)<1e-9?.1:0)}).regime==='kinetic',`${hi}° kaydırır`);
  const st=K.incline({m,mus,muk,deg:lo});near(-st.f,m*g*Math.sin(lo*Math.PI/180),1e-12,'statik f = mg sinθ');near(st.N,m*g*Math.cos(lo*Math.PI/180),1e-12);
  const deg=Math.min(60,Math.ceil(thc+3)),th=deg*Math.PI/180,q=K.incline({m,mus,muk,deg,v:0}),a=g*(Math.sin(th)-muk*Math.cos(th));near(q.a,a,1e-12,'kayma ivmesi');
  let s={x:0,v:0,t:0};while(s.x<1)s=K.slideStep(s,{m,N:q.N,mus,muk,F:q.drive},1/240);near(.5*m*s.v*s.v,(q.drive-muk*q.N)*s.x,1e-9,'eğimde iş–enerji');near(s.x,.5*a*s.t*s.t,1e-9);}
near(K.incline({m:1,mus:.5,muk:.3,deg:26.6}).a,1.7610207326800706,1e-12);
assert.throws(()=>K.incline({m:1,mus:.5,muk:.3,deg:90}));checks++;
console.log(`G newton-hareket-yasalari: ${checks.toLocaleString('tr-TR')} bağımsız kapalı biçim, iş–enerji, momentum ve ikinci integratör kontrolü PASS`);

if(process.argv.includes('--browser')){
 const {chromium}=await import('playwright');const {createServer}=await import('node:http');const {join,extname}=await import('node:path');const {fileURLToPath}=await import('node:url');const root=fileURLToPath(new URL('../',import.meta.url));
 const server=createServer((req,res)=>{const file=join(root,decodeURIComponent(new URL(req.url,'http://localhost').pathname));if(!file.startsWith(root)||!fs.existsSync(file)||fs.statSync(file).isDirectory()){res.writeHead(404).end();return;}res.setHeader('Content-Type',({'.html':'text/html; charset=utf-8','.js':'text/javascript; charset=utf-8','.css':'text/css; charset=utf-8'})[extname(file)]||'application/octet-stream');res.end(fs.readFileSync(file));});await new Promise(r=>server.listen(0,'127.0.0.1',r));let browser;const before=checks;
 try{browser=await chromium.launch();
  for(const[width,theme]of[[390,'light'],[1280,'dark']]){
   const ctx=await browser.newContext({viewport:{width,height:900},deviceScaleFactor:width<500?2:1});const page=await ctx.newPage();await page.addInitScript(t=>{localStorage.setItem('acelya-theme',t);localStorage.setItem('acelya-sound-muted','1');},theme);page.setDefaultTimeout(8000);const errors=[];page.on('pageerror',e=>errors.push(e.message));page.on('console',m=>{if(m.type()==='error'&&!/404/.test(m.text()))errors.push(m.text());});
   await page.goto(`http://127.0.0.1:${server.address().port}/${SLUG}.html`);await page.waitForFunction(()=>window.NewtonLabUI&&document.getElementById('b1f').textContent);
   const click=id=>page.locator('#'+id).click(),read=id=>page.locator('#'+id).textContent(),set=(id,v)=>page.locator('#'+id).evaluate((e,v)=>{e.value=v;e.dispatchEvent(new Event(e.tagName==='SELECT'?'change':'input',{bubbles:true}));},v),adv=s=>page.evaluate(s=>NewtonLabUI.advance(s),s),has=async(id,text)=>{const t=await read(id);assert(t.includes(text),`[${width}] #${id}: "${t}" içinde "${text}" yok`);checks++;},noOverflow=async label=>{ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),`[${width}] yatay taşma: ${label}`);};
   // Erişilebilirlik: her denetimin etiketi, her tuvalin rolü, salt okunur çekirdek
   ok(await page.evaluate(()=>[...document.querySelectorAll('.app-content input,.app-content select')].every(e=>e.id&&document.querySelector(`label[for="${e.id}"]`))),'her denetimde label');
   ok(await page.evaluate(()=>[...document.querySelectorAll('.app-content canvas')].every(c=>c.getAttribute('role')==='img'&&c.getAttribute('aria-label'))),'tuval rolleri');
   ok(await page.evaluate(()=>Object.isFrozen(NewtonLab)&&!Object.getOwnPropertyDescriptor(window,'NewtonLab').writable),'çekirdek salt okunur');
   ok(await page.evaluate(()=>[...document.querySelectorAll('.app-content input[type=range]')].every(e=>{const k=(+e.defaultValue-+e.min)/+e.step;return Math.abs(k-Math.round(k))<1e-6;})),'varsayılanlar adım ızgarasında');
   ok(await page.evaluate(()=>[...document.querySelectorAll('#b1surf option')].filter(o=>o.value!=='custom').every(o=>o.value.split('|').every(v=>Math.abs(+v*100-Math.round(+v*100))<1e-9))),'hazır yüzeyler kaydırıcı adımında');
   // Sekme 1
   await has('b1f','6,00 N · statik, F ile eşit');await has('b1fmax','9,81 N');await has('b1net','0,00 N');await has('b1aTh','0,000 m/s²');await has('b1aMeas','duruyor');await has('b1Status','f = F = 6,00 N');
   await set('b1F',9.8);await adv(.5);await has('b1f','9,80 N · statik');await has('b1v','0,00 m/s · 0,00 m');
   await set('b1F',10);await adv(1);await has('b1f','5,89 N · kinetik');await has('b1net','4,11 N');await has('b1aTh','2,057 m/s²');await has('b1aMeas','2,057 m/s²');await has('b1aMeas','0,00 %');
   await click('b1Cut');await has('b1FOut','0,0 N');await adv(.2);await has('b1Status','Kuvvet kesildi ama blok hemen durmuyor');await adv(8);await has('b1stop','fark 0,00 %');await has('b1f','0,00 N · yok');await has('b1Status','kayıp durdu');
   {const st=await page.evaluate(()=>NewtonLabUI.state().block);near(st.stopRes.meas,st.stopRes.v0**2/(2*.3*g),1e-9,'UI durma yolu');near(st.WF+st.Wf,0,1e-7,'UI iş–enerji (durunca sıfır)');}
   await click('b1Ramp');await has('b1Ramp','Artırmayı durdur');await adv(6);await has('b1break','9,8 N tuttu, 9,9 N kaydırdı · kuram 9,81 N');await has('b1Ramp','Kuvveti yavaşça artır');await has('b1FOut','9,9 N');
   await set('b1surf','0|0');await has('b1musOut','0,00');await has('b1mukOut','0,00');await set('b1F',5);await adv(1);await click('b1Cut');await adv(.5);const v1=(await page.evaluate(()=>NewtonLabUI.state().block.v));await adv(4);const v2=(await page.evaluate(()=>NewtonLabUI.state().block.v));ok(v1>0&&v1===v2,'hava rayında hız sabit');await has('b1stop','tanımsız · μ_k = 0');await has('b1Status','hiç durmaz');await has('b1net','0,00 N');
   await set('b1surf','1|0.7');await has('b1musOut','1,00');await has('b1mukOut','0,70');await set('b1muk',1.1);await has('b1musOut','1,10');ok(await page.locator('#b1surf').inputValue()==='custom','elle ayar');await set('b1mus',.2);await has('b1mukOut','0,20');
   await set('b1m',10);await set('b1mus',1.2);await set('b1muk',1.2);await set('b1F',60);await adv(.5);await has('b1f','60,00 N · statik');await set('b1m',.5);await set('b1F',60);await adv(.5);await has('b1f','5,89 N · kinetik');
   await click('b1Toggle');await has('b1Toggle','Devam et');await has('b1Status','Duraklatıldı');const xa=await page.evaluate(()=>NewtonLabUI.state().block.x);await adv(.5);ok(xa===await page.evaluate(()=>NewtonLabUI.state().block.x),'duraklatınca konum sabit');
   await click('blockReset');await has('b1f','6,00 N · statik');await has('b1Toggle','Duraklat');await has('b1break','—');ok(await page.locator('#b1surf').inputValue()==='0.5|0.3','yüzey sıfırlandı');await noOverflow('sekme 1');
   // Sekme 2
   await click('tab-pulley');await has('p2naive','0,8918 m/s²');await has('p2full','0,8918 m/s²');await has('p2Th','kuram 0,4459 N');await has('p2mg','0,4905 N');await has('p2time','“Bırak” ile ölç');
   await click('p2Go');await adv(2.5);await has('p2time','1,3394 s');await has('p2meas','0,8918 m/s²');await has('p2diff','0,00 %');await has('p2Th','ölçülen 0,4459 N');await has('p2Status','T = m·(g − a) = 0,4459 N');
   await click('p2Data');await has('fitM','0,5500 kg');await has('fitDiff','0,00 %');await has('fitN','6 nokta');await has('fitRows','2,1178');
   await set('p2mp',.1);await has('p2full','0,8175 m/s²');await has('p2time','“Bırak” ile ölç');await has('fitStatus','Ayarlar seriden sonra değişti');await click('p2Go');await adv(2.5);await has('p2meas','0,8175 m/s²');await has('p2diffN','−8,33 %');await has('p2Th','ölçülen 0,4496 N');await has('p2Tc','ölçülen 0,4088 N');await click('p2Data');await has('fitM','0,6000 kg');await has('fitDiff','+9,09 %');await has('fitStatus','M_toplam + m_p/2 = 0,6000 kg');
   await set('p2mp',0);await set('p2mu',.02);await click('p2Data');await has('fitM','0,5392 kg');await has('fitB','−0,1962 m/s²');
   await set('p2mu',0);await set('p2noise','0.002');await click('p2Data');await has('fitM','0,5481 kg');await has('fitDiff','−0,35 %');await set('p2seed',2);await click('p2Data');const m2=await read('fitM');ok(m2!=='0,5481 kg'&&/^0,5[3-6]\d\d kg$/.test(m2),'tohum sonucu değiştirir: '+m2);await set('p2noise','0');await set('p2seed',1);
   await set('p2M',2);await set('p2m',.05);await set('p2mu',.1);await has('p2full','0,0000 m/s²');await click('p2Go');await has('p2time','tanımsız');await has('p2Status','T = m·g doğrudur');await click('p2Data');await has('fitM','tanımsız');
   await set('p2mode','atwood');await has('p2naive','0,4671 m/s²');await has('p2Th','kuram 5,1386 N');await has('p2mg','5,3955 N');await click('p2Go');await adv(3.5);await has('p2time','1,8507 s');await has('p2meas','0,4671 m/s²');await click('p2Data');await has('fitM','1,0500 kg');await has('fitColLoad','Kütle farkı');
   await set('p2m2',.5);await has('p2full','0,0000 m/s²');await has('p2Status','İki kütle eşit');await click('p2Go');await has('p2time','tanımsız');await set('p2m2',.45);await has('p2naive','−0,5163 m/s²');await click('p2Go');await adv(3.5);await has('p2meas','−0,5163 m/s²');
   await click('pulleyReset');await has('p2naive','0,8918 m/s²');await has('fitM','—');ok(await page.locator('#p2mode').inputValue()==='half','düzenek sıfırlandı');await noOverflow('sekme 2');
   // Sekme 3
   await click('tab-third');await has('t3c1','−4,000 N');await has('t3c2','+4,000 N');await has('t3c8','kuram 128,25 ms');await click('t3Go');await adv(.3);await has('t3c4','2,0000');await adv(6);await has('t3c7','−0,6532 · +0,3266 m/s (−0,6532 · +0,3266)');await has('t3c8','128,25 ms · 128,25 ms · fark 0,00 %');await has('t3c6','0,0000 kg·m/s');await has('t3c1','0,000 N');await has('t3Status','At–araba');
   await set('sm1',2);await set('sm2',2);await set('sk',200);await set('sx0',.1);await set('sslow','1');await has('t3c1','−20,000 N');await click('t3Go');await adv(2);await has('t3c7','−0,7071 · +0,7071');
   await set('t3exp','contact');await has('t3Go','İtmeye başla');await click('t3Go');await adv(1);await has('t3c1','9,000 N · 9,000 N · fark 0,00 %');await has('t3c3','3,0000 · 3,0000 m/s²');await has('t3c7','3,000 N');await set('cside','right');await click('t3Go');await adv(1);await has('t3c1','3,000 N · 3,000 N');await set('cside','left');await set('cmu',.2);await click('t3Go');await adv(1);await has('t3c1','9,000 N · 9,000 N');await has('t3c3','1,0380 · 1,0380');await set('cmu',.5);await set('cF',1);await has('t3c1','tanımsız');await has('t3Status','statik belirsizlik');
   await set('t3exp','incline');await has('t3Go','Yavaşça eğ');await has('t3c4','0,000 N · yok');await click('t3Go');await adv(16);await has('t3c1','26,5° tuttu, 26,6° kaydırdı · 26,57°');await has('t3c2','0,4986 – 0,5008 · 0,50');await has('t3c7','1,7610 · 1,7610 m/s² · fark 0,00 %');await has('idegOut','26,6°');
   await set('im',5);await has('t3c7','kayıyor');await adv(3);await has('t3c7','1,7610 · 1,7610');await has('t3c1','26,5° tuttu, 26,6° kaydırdı');/* kütle değişince kritik açı okuması korunur */await set('ideg',20);await has('t3c4','statik, bileşenle eşit');await has('t3c7','blok kaymıyor');await set('imus',1.2);await set('irate','5');await click('t3Go');await adv(14);await has('t3c1','50,1° tuttu, 50,2° kaydırdı');await set('ideg',60);await adv(3);await has('t3c1','“Yavaşça eğ” ile ölç');
   await click('thirdReset');await has('t3Go','Yayı bırak');await has('t3c1','−4,000 N');await has('idegOut','0,0°');await noOverflow('sekme 3');
   // Doğrulayıcı ekleri: dayalı blok grafiği altyazısı yöne göre yanlış kütleyi anmaz; kuvvet seçilen hızda kendiliğinden kesilir
   await set('t3exp','contact');await set('cside','right');await has('t3ChartATitle','m₁');ok(!(await read('t3ChartACap')).includes('m₂'),'altyazı m₂ demez');await click('thirdReset');
   await click('tab-block');await click('blockReset');await set('b1auto','4');await set('b1F',10);await adv(5);await has('b1stop','2,718 m · 2,718 m · fark 0,00 %');await has('b1FOut','0,0 N');await set('b1m',4);await set('b1F',20);await adv(8);await has('b1stop','2,718 m · 2,718 m · fark 0,00 %');await click('blockReset');ok(await page.locator('#b1auto').inputValue()==='0','sıfırlama otomatik kesmeyi kapatır');await has('b1FOut','6,0 N');
   // Klavye
   await page.locator('#tab-third').focus();await page.keyboard.press('Home');ok(await page.locator('#tab-block').getAttribute('aria-selected')==='true','Home');await page.keyboard.press('ArrowRight');ok(await page.locator('#tab-pulley').getAttribute('aria-selected')==='true','ArrowRight');await page.keyboard.press('End');ok(await page.locator('#tab-third').getAttribute('aria-selected')==='true','End');await page.keyboard.press('ArrowLeft');await page.keyboard.press('ArrowLeft');ok(await page.locator('#tab-block').getAttribute('aria-selected')==='true','ArrowLeft');
   await page.locator('#tab-block').blur();await page.evaluate(()=>document.activeElement.blur());await page.keyboard.press('Space');await has('b1Toggle','Devam et');await page.keyboard.press('Space');await has('b1Toggle','Duraklat');await set('b1F',20);await page.keyboard.press('r');await has('b1FOut','6,0 N');
   await page.locator('#b1F').focus();await page.keyboard.press('Space');await has('b1Toggle','Duraklat');
   await page.waitForTimeout(300);assert.deepEqual(errors,[]);checks++;await ctx.close();}
  console.log(`G newton-hareket-yasalari: ${checks-before} tarayıcı kontrolü (390 açık + 1280 koyu: sekmeler, hazırlar, sınırlar, sıfırlama, klavye, taşma, konsol) PASS`);
 }finally{await browser?.close();await new Promise(r=>server.close(r));}
}
