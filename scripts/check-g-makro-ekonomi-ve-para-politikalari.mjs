// Makro ekonomi laboratuvarı: çekirdeğin bağımsız denetimi.
// Başvurular sayfanın formüllerini yinelemez: sızıntı dengesi ve bilanço çözümü, doğrudan üs alma,
// benzetim verisinden kurulan geçiş matrisi, Solow'un Bernoulli kapalı çözümü ve ikinci bir integratör (orta nokta RK2).
import fs from 'node:fs';
import vm from 'node:vm';
import assert from 'node:assert/strict';
const SLUG='makro-ekonomi-ve-para-politikalari';
const html=fs.readFileSync(new URL(`../${SLUG}.html`,import.meta.url),'utf8');
const source=html.split('/* KERNEL-BEGIN */')[1]?.split('/* KERNEL-END */')[0];
assert(source,'Çekirdek sınırları gerekli');
const context={window:{}};vm.createContext(context);vm.runInContext(source,context);
const K=context.window.MakroLab;assert(Object.isFrozen(K));
let checks=0;
const near=(a,e,tol=1e-9,msg='')=>{assert(Math.abs(a-e)<=tol*Math.max(1,Math.abs(e)),`${msg} ${a} ≠ ${e}`);checks++;};
const eq=(a,b,msg)=>{assert.equal(a,b,msg);checks++;};
const ok=(c,msg)=>{assert(c,msg);checks++;};
const kahan=a=>{let s=0,c=0;for(const x of a){const y=x-c,t=s+y;c=(t-s)-y;s=t;}return s;};
const firstN=(q)=>{for(let N=1;N<1e6;N++)if(1-Math.pow(q,N)>=0.95-1e-12)return N;};

// 1a · Harcama çarpanı: sızıntı dengesi (enjeksiyon = sızıntılar) ve doğrudan toplama.
for(const c of[0.05,0.5,0.8,0.95])for(const t of[0,0.2,0.5])for(const m of[0,0.1,0.4])for(const d of[0,0.5,1])for(const N of[1,10,60]){
 const G=100,r=K.spending({G,c,t,m,d,N}),leak=t+(1-c)*(1-t)+m,pass=1-leak;
 if(pass<-1e-12){eq(r.valid,false);continue;}
 if(Math.abs(pass)<1e-12)continue; // sınırda kayan nokta işareti belirsiz
 eq(r.valid,true);const inj=G*(1-d),terms=Array.from({length:N},(_,k)=>inj*Math.pow(pass,k));
 near(r.sum,kahan(terms),1e-11,'sum');near(r.closed,kahan(terms),1e-11,'closed');near(r.limit,inj/leak,1e-11,'limit');near(r.countedLimit,inj/leak,1e-10,'counted');near(r.mult*G,inj/leak,1e-11);
 near(r.leaks.tax+r.leaks.saving+r.leaks.imports+r.inFlight,inj,1e-11,'leak identity');
 for(const row of r.rows)near(row.tax+row.saving+row.imports+row.passed,row.income,1e-12);
 near(r.leaks.tax,t*r.sum,1e-11);near(r.leaks.imports,m*r.sum,1e-11);
 if(inj>0){eq(r.n95,firstN(pass),`n95 c${c} t${t} m${m}`);eq(r.n95Theory,r.n95);}else{eq(r.n95,null);eq(r.n95Theory,null);}
}
near(K.spending({G:100,c:0.8,t:0,m:0,d:0,N:60}).limit,500);near(K.spending({G:100,c:0.8,t:0.2,m:0.1,d:0,N:10}).mult,1/0.46);
near(K.spending({G:100,c:0.8,t:0.2,m:0.1,d:0,N:10}).sum,216.932972784207,1e-12);eq(K.spending({G:100,c:0.05,t:0.5,m:0.4,d:0,N:5}).valid,false);
eq(K.spending({G:100,c:0.05,t:0,m:0,d:0,N:3}).n95,1); // q = 0,05: tek turda tam %95

// 1b · Mevduat çarpanı: bilanço denklemleri C = cu·D, R = (rr+e)·D, C + R = B.
for(const rr of[0.01,0.1,0.5])for(const cu of[0,0.2,1])for(const e of[0,0.3,0.5])for(const N of[1,10,60]){
 const B=100,r=K.deposits({B,rr,cu,e,N}),Dep=B/(rr+e+cu),M=Dep*(1+cu),pass=1-(rr+e+cu)/(1+cu);
 eq(r.valid,true);near(r.limit,M,1e-11);near(r.countedLimit,M,1e-9);near(r.mult,M/B,1e-11);
 const terms=Array.from({length:N},(_,k)=>B*Math.pow(pass,k));near(r.sum,kahan(terms),1e-11);near(r.closed,kahan(terms),1e-11);
 near(r.totals.currency+r.totals.reserve+r.inFlight,B,1e-11,'base');near(r.totals.currency+r.totals.deposit,r.sum,1e-11);near(r.totals.currency,cu*r.totals.deposit,1e-11);near(r.totals.reserve,(rr+e)*r.totals.deposit,1e-11);
 for(const row of r.rows){near(row.currency+row.deposit,row.receipt,1e-12);near(row.reserve+row.loan,row.deposit,1e-12);}
 if(Math.abs(pass)>1e-12){eq(r.n95,firstN(pass));eq(r.n95Theory,r.n95);}
}
{const big=K.deposits({B:100,rr:0.1,cu:0.2,e:0,N:60});near(big.limit,400);near(K.deposits({B:100,rr:0.1,cu:0,e:0,N:10}).mult,10);near(K.deposits({B:100,rr:0.1,cu:0.2,e:0,N:10}).sum,377.474594116211,1e-12);
 const full=K.deposits({B:100,rr:0.5,cu:0,e:0.5,N:5});near(full.sum,100);eq(full.n95,1);}

// 2a · Bileşik büyüme: ölçülen süre gerçekten ikiye katlıyor mu; Fisher çarpımı.
for(const pct of[0.5,1,2,7,10,35,60,100]){const pi=pct/100,d=K.doubling(pi);near(Math.pow(1+pi,d.measured),2,1e-10,'doubling');near(Math.pow(1+pi,d.exact),2,1e-12);near(d.rule70*pct,70,1e-12);near(d.rule72*pct,72,1e-12);
 for(const ip of[0,3,15,50,100])for(const T of[1,20,50]){const i=ip/100,r=K.compounding({pi,i,T,S:1000});near((1+r.fisherExact)*(1+pi),1+i,1e-12);near((1+r.realMeasured)*(1+pi),1+i,1e-11);near(r.cash[T]*r.price[T],1000,1e-11);near(r.real[T]*r.price[T],r.bal[T],1e-11);near(r.fisherApprox-r.fisherExact,r.fisherExact*pi,1e-11);near(r.price[T],Math.exp(T*Math.log1p(pi)),1e-11);}}
near(K.doubling(0.1).exact,7.272540897341713,1e-12);near(K.compounding({pi:0.1,i:0.15,T:20,S:1000}).cash[20],148.6436280241437,1e-11);
ok(Math.abs(K.doubling(0.02).rule70/K.doubling(0.02).exact-1)<0.001);ok(K.doubling(1).rule70/K.doubling(1).exact-1<-0.29);

// 2b · Miktar özdeşliği.
for(const shock of'MVPY')for(const adjust of['M','V','P','Y','PY'])for(const size of[-0.5,0.1,1])for(const share of[0,0.3,1]){
 const base={M:200,V:4,P:1,Y:800},r=K.quantity({...base,shock,size,adjust,share}),bad=adjust===shock||(adjust==='PY'&&'PY'.includes(shock));eq(r.valid,!bad);if(bad)continue;
 near(r.after.M*r.after.V,r.after.P*r.after.Y,1e-12);near(r.after[shock],base[shock]*(1+size),1e-12);
 for(const k of'MVPY')if(k!==shock&&!adjust.includes(k))eq(r.after[k],base[k]);
 if(adjust==='PY'){const lp=Math.log(r.after.P/base.P),ly=Math.log(r.after.Y/base.Y);near(lp+ly,Math.log1p(size),1e-12);near(lp,share*Math.log1p(size),1e-12);}}
near(K.quantity({M:200,V:4,P:1,Y:800,shock:'Y',size:0.1,adjust:'P'}).change.P,1/1.1-1,1e-12);near(K.quantity({M:200,V:4,P:1,Y:800,shock:'M',size:0.1,adjust:'P'}).change.P,0.1,1e-12);

// 2c · Taylor: bağımsız benzetim, veriden kurulan geçiş matrisi, uzun dönem büyüme.
near(K.taylorRate({rstar:2,pi:4,target:2,a:0.5,b:0.5,gap:0}),7);near(K.taylorRate({rstar:2,pi:2,target:2,a:0.5,b:0.5,gap:0}),4); // Taylor (1993), s. 202: hedefte %4
for(const a of[-0.5,-0.25,0,0.05,0.5,1,1.5,2,2.5,3])for(const b of[0,0.5,1,2])for(const sigma of[0.1,1,1.5])for(const kappa of[0.05,0.5,1]){
 const p={rstar:2,target:3,a,b,sigma,kappa,shock:2},s=K.taylorSim({...p,T:6}),e=K.taylorEig(p);
 // Bağımsız yürütme: reel faiz açığı üzerinden.
 let dp=2,y=0;for(let t=1;t<=6;t++){const gapR=a*dp+b*y;y=-sigma*gapR;dp=dp+kappa*y;near(s.pi[t]-3,dp,1e-9);near(s.y[t],y,1e-9);}
 near(s.i[0],2+5+a*2,1e-12);near(s.r[0]-2,a*2,1e-12); // 1 puan enflasyon → reel faiz a puan
 // x1 = A x0, x2 = A x1 → A = [x1 x2][x0 x1]^-1; özdeğerler bu A'nın karakteristik polinomunun kökü olmalı.
 const x=[0,1,2].map(t=>[s.pi[t]-3,s.y[t]]),det0=x[0][0]*x[1][1]-x[1][0]*x[0][1];
 if(Math.abs(det0)>1e-6){const inv=[[x[1][1]/det0,-x[1][0]/det0],[-x[0][1]/det0,x[0][0]/det0]],A=[[x[1][0]*inv[0][0]+x[2][0]*inv[1][0],x[1][0]*inv[0][1]+x[2][0]*inv[1][1]],[x[1][1]*inv[0][0]+x[2][1]*inv[1][0],x[1][1]*inv[0][1]+x[2][1]*inv[1][1]]],tr=A[0][0]+A[1][1],dt=A[0][0]*A[1][1]-A[0][1]*A[1][0];
  for(const l of[e.l1,e.l2])near(l*l-tr*l+dt,0,1e-8,`char a${a} b${b}`);}
 const m=K.taylorMeasure(p);near(m.rho,e.rhoShock,1e-6,`rho a${a} b${b} σ${sigma} κ${kappa}`);
 // Uzun dönem büyüme: sapma biçiminde, yeniden ölçeklenen bağımsız yürütme (modüller iyi ayrışıyorsa).
 const lo=Math.min(Math.abs(e.l1),Math.abs(e.l2));if(a!==0&&lo<0.9*e.rho){let u=1,v=0,lg=0;for(let t=0;t<800;t++){const nv=-sigma*(a*u+b*v),nu=u+kappa*nv,nn=Math.hypot(nu,nv);if(t>=400)lg+=Math.log(nn/Math.hypot(u,v));u=nu/nn;v=nv/nn;}near(Math.exp(lg/400),e.rho,1e-6,`growth a${a} b${b} σ${sigma} κ${kappa}`);}
 // Taylor ilkesi: a < 0 → ıraksar, a = 0 → birim kök, küçük a > 0 → yakınsar.
 if(a<0)ok(e.rho>1);if(a===0){near(e.rho,Math.max(1,sigma*b),1e-12);eq(e.rhoShock,1);}else eq(e.rhoShock,e.rho);if(a>0&&e.upperA!==null&&a<e.upperA-1e-9)ok(e.rho<1,`stable a${a} b${b} σ${sigma} κ${kappa}`);if(e.upperA!==null&&a>e.upperA+1e-9)ok(e.rho>1);
}
{const p={rstar:2,target:2,a:0,b:0.5,sigma:1,kappa:0.5,shock:2},s=K.taylorSim({...p,T:40});near(s.pi[40],4);near(s.y[40],0);
 const d=K.taylorEig({...p,a:0.5});near(d.l1,0.8430703308172536,1e-12);near(d.l2,-0.5930703308172536,1e-12);near(d.upperA,2);near(K.taylorMeasure({...p,a:0.5}).rho,d.l1,1e-8);
 eq(K.taylorMeasure({...p,shock:0}).rho,null);near(K.taylorMeasure({...p,a:2,b:0}).rho,0);ok(Math.abs(K.taylorSim({...p,a:0.5,T:40}).pi[40]-2)<0.01);ok(Math.abs(K.taylorSim({...p,a:-0.25,T:40}).pi[40]-2)>20);}

// 3 · Solow: Bernoulli kapalı çözümü z = k^(1−α), z' = (1−α)(s − D z) ve ikinci integratör.
const bern=(p,k0,t)=>{const D=p.n+p.g+p.delta,zs=p.s/D,z0=Math.pow(k0,1-p.alpha);return Math.pow(zs+(z0-zs)*Math.exp(-(1-p.alpha)*D*t),1/(1-p.alpha));};
const rate=(k,p)=>p.s*Math.pow(k,p.alpha)-(p.n+p.g+p.delta)*k;
const bisect=p=>{let lo=1e-9,hi=1e6;for(let i=0;i<200;i++){const mid=Math.sqrt(lo*hi);if(rate(mid,p)>0)lo=mid;else hi=mid;}return Math.sqrt(lo*hi);};
for(const alpha of[0.2,0.33,0.6])for(const s of[0.05,0.2,0.45])for(const[delta,n,g]of[[0.05,0.01,0.02],[0.02,-0.01,0],[0.1,0.04,0.05]]){
 const p={alpha,s,delta,n,g},st=K.solowSteady(p),ks=bisect(p),lam=(1-alpha)*(n+g+delta);
 near(st.k,ks,1e-9,'k*');near(st.y,Math.pow(ks,alpha),1e-9);near(st.c,(1-s)*Math.pow(ks,alpha),1e-9);near(st.halfLife*lam,Math.LN2,1e-12);
 for(const f of[0.05,0.25,3]){const k0=f*st.k,T=150,path=K.solowPath({...p,k0,T});eq(path.k.length,1501);
  for(const j of[1,10,100,500,1000,1500])near(path.k[j],bern(p,k0,path.t[j]),1e-6,'RK4 vs Bernoulli');
  // İkinci integratör: orta nokta RK2, adım 0,01 yıl.
  let k=k0;for(let j=0;j<5000;j++){const h=0.01,mid=k+h/2*rate(k,p);k+=h*rate(mid,p);}near(path.k[500],k,1e-5,'RK4 vs RK2');
  const m=K.solowMeasureSteady(p,k0);ok(m.converged);near(m.k,ks,1e-8,'measured k*');
  const hz=K.solowHalfLife(path,0,Math.pow(st.k,1-alpha),x=>Math.pow(x,1-alpha)),hk=K.solowHalfLife(path,0,st.k);
  if(Math.LN2/lam<T-1){near(hz.t,Math.LN2/lam,1e-4,'z half-life');}
  // k açığının yarılanma anı: Bernoulli çözümünün tersinden.
  const zs=Math.pow(st.k,1-alpha),z0=Math.pow(k0,1-alpha),zh=Math.pow((k0+st.k)/2,1-alpha),th=-Math.log((zh-zs)/(z0-zs))/lam;
  if(th<T-1)near(hk.t,th,1e-4,'k half-life');else eq(hk.t,null);}
 eq(K.solowHalfLife(K.solowPath({...p,k0:st.k,T:50}),0,st.k).reason,'atSteady');
 // Altın kural: tarama α'yı bulmalı; bağımsız denetim için komşu s değerlerinde ikiye bölmeyle bulunan c* daha küçük olmalı.
 const gold=K.goldenBrute(p);near(gold.s,alpha,1e-9,'golden');const cOf=x=>{const q={...p,s:x};return(1-x)*Math.pow(bisect(q),alpha);};ok(cOf(alpha)>cOf(alpha+0.002)&&cOf(alpha)>cOf(alpha-0.002));near(gold.c,cOf(alpha),1e-8);
 // Şok: 20. yılda s iki katına; eski durağan durumdan Bernoulli ile.
 const s2=2*s,p2={...p,s:s2},sh=K.solowPath({...p,k0:st.k,T:300,shockT:20,s2});near(sh.k[200],st.k,1e-9,'şoktan önce durağan');eq(sh.s[199],s);eq(sh.s[200],s2);
 for(const j of[250,500,3000])near(sh.k[j],bern(p2,st.k,sh.t[j]-20),1e-6,'şok sonrası');
 near(K.solowSteady(p2).y/st.y,Math.pow(2,alpha/(1-alpha)),1e-12);
 // Şoktan hemen sonra büyüme g + α(n+g+δ); uzun dönemde g.
 near(g+alpha*K.solowRate(st.k,p2)/st.k,g+alpha*(n+g+delta),1e-10);
}
{const p={alpha:0.33,s:0.2,delta:0.05,n:0.01,g:0.02},st=K.solowSteady(p);near(st.k,3.9259097478746208,1e-12);near(st.halfLife,12.93185038358107,1e-12);
 const path=K.solowPath({...p,k0:0.25*st.k,T:150});near(K.solowHalfLife(path,0,st.k).t,15.0421,1e-4);
 const sh=K.solowPath({...p,k0:st.k,T:400,shockT:20,s2:0.4}),end=sh.k.length-1,gEnd=p.g+p.alpha*Math.log(sh.k[end]/sh.k[end-1])/sh.dt;near(gEnd,0.02,1e-6,'uzun dönem büyüme g');near(Math.pow(sh.k[end]/st.k,p.alpha),Math.pow(2,0.33/0.67),1e-6);}
for(const call of[()=>K.spending({G:100,c:1.2,t:0,m:0,d:0,N:5}),()=>K.deposits({B:-1,rr:0.1,cu:0,e:0,N:5}),()=>K.doubling(0),()=>K.solowSteady({alpha:1,s:0.2,delta:0.05,n:0,g:0}),()=>K.solowPath({alpha:0.3,s:0.2,delta:0.05,n:0,g:0,k0:0,T:10}),()=>K.taylorRate({rstar:NaN,pi:1,target:1,a:1,b:1,gap:0})]){assert.throws(call);checks++;}
// 1c · q matematiksel olarak tam 0 olan kaydırıcı birleşimleri: kayan nokta artığı işareti bozmamalı (tek tur, çarpan 1 − d).
for(let ci=1;ci<=19;ci++)for(let ti=0;ti<=50;ti++)for(let mi=0;mi<=40;mi++){if(ci*5*(100-ti)!==mi*100)continue;const c=ci*0.05,t=ti/100,m=mi/100;
 for(const d of[0,0.5]){const r=K.spending({G:100,c,t,m,d,N:10});ok(r.valid,`q = 0 geçerli olmalı: c=${c} t=${t} m=${m}`);eq(r.q,0);near(r.mult,1-d,1e-12);near(r.sum,100*(1-d),1e-12);near(r.limit,100*(1-d),1e-12);eq(r.n95,1);eq(r.rows[1].income,0);near(r.leaks.tax+r.leaks.saving+r.leaks.imports+r.inFlight,100*(1-d),1e-12);}}
for(const[c,t,m]of[[0.35,0.20,0.28],[0.10,0.30,0.07],[0.20,0.30,0.14],[0.25,0.32,0.17],[0.40,0.30,0.28],[0.50,0.32,0.34],[0.50,0.34,0.33]])ok(K.spending({G:100,c,t,m,d:0,N:10}).valid,'yazarın q = 0 listesi');
ok(!K.spending({G:100,c:0.35,t:0.20,m:0.29,d:0,N:10}).valid,'q < 0 hâlâ geçersiz');
console.log(`G makro: ${checks.toLocaleString('tr-TR')} bağımsız geometrik seri, bilanço, özdeğer ve integratör kontrolü PASS`);

if(process.argv.includes('--browser')){
 const {createRequire}=await import('node:module');const {createServer}=await import('node:http');const {join,extname}=await import('node:path');const {fileURLToPath}=await import('node:url');const root=fileURLToPath(new URL('../',import.meta.url));
 let chromium;for(const dir of[root,...(process.env.NODE_PATH||'').split(':').filter(Boolean),'/opt/node-tools']){try{({chromium}=createRequire(join(dir,'package.json'))('playwright'));break;}catch{}}
 assert(chromium,'playwright bulunamadı');
 const server=createServer((req,res)=>{const file=join(root,decodeURIComponent(new URL(req.url,'http://localhost').pathname));if(!fs.existsSync(file)||fs.statSync(file).isDirectory()){res.writeHead(404).end();return;}res.setHeader('Content-Type',({'.html':'text/html; charset=utf-8','.js':'text/javascript; charset=utf-8','.css':'text/css; charset=utf-8'})[extname(file)]||'application/octet-stream');res.end(fs.readFileSync(file));});
 await new Promise(r=>server.listen(0,'127.0.0.1',r));let browser;
 try{browser=await chromium.launch();const before=checks;
  for(const[width,theme]of[[390,'light'],[1280,'dark']]){
   const ctx=await browser.newContext({viewport:{width,height:900},deviceScaleFactor:width<500?2:1});const page=await ctx.newPage();
   await page.addInitScript(t=>{localStorage.setItem('acelya-theme',t);localStorage.setItem('acelya-sound-muted','1');},theme);page.setDefaultTimeout(5000);
   const errors=[];page.on('pageerror',e=>errors.push(e.message));page.on('console',m=>{if(m.type()==='error'&&!/404|Failed to load resource/.test(m.text()))errors.push(m.text());});
   await page.goto(`http://127.0.0.1:${server.address().port}/${SLUG}.html`);
   const click=id=>page.locator('#'+id).click(),read=id=>page.locator('#'+id).textContent(),
    range=(id,v)=>page.locator('#'+id).evaluate((e,v)=>{e.value=v;e.dispatchEvent(new Event('input',{bubbles:true}));},v),
    has=async(id,text)=>{const t=await read(id);assert(t.includes(text),`${id}: "${t}" içinde "${text}" yok`);checks++;},
    clean=async panel=>{const t=await page.locator('#panel-'+panel).innerText();assert(!/NaN|undefined|Infinity|null|\[object/.test(t),`${panel}: bozuk metin`);checks++;},
    fits=async()=>{eq(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),true,'yatay taşma '+width);},
    inked=async id=>{ok(await page.locator('#'+id).evaluate(c=>{const d=c.getContext('2d').getImageData(0,0,c.width,c.height).data,s=new Set();for(let i=0;i<d.length;i+=4*97)s.add(d[i]+','+d[i+1]+','+d[i+2]);return s.size>3;}),id+' boş');},
    extremes=async panel=>{const ids=await page.locator(`#panel-${panel} input[type=range]`).evaluateAll(a=>a.map(e=>e.id));
     for(const which of['min','max']){for(const id of ids)await page.locator('#'+id).evaluate((e,w)=>{if(!e.disabled){e.value=e[w];e.dispatchEvent(new Event('input',{bubbles:true}));}},which);await clean(panel);await fits();}};
   // Etiketler: her denetimin <label for> ve her kaydırıcının çıktısı var.
   eq(await page.evaluate(()=>[...document.querySelectorAll('main input,main select')].filter(e=>!document.querySelector(`label[for="${e.id}"]`)).length),0);
   eq(await page.evaluate(()=>[...document.querySelectorAll('main input[type=range]')].filter(e=>!document.getElementById(e.id+'Out')?.textContent).length),0);
   eq(await page.evaluate(()=>[...document.querySelectorAll('main canvas')].filter(c=>c.getAttribute('role')!=='img'||!c.getAttribute('aria-label')).length),0);
   // 01
   await has('spQ','0,5400');await has('spMult','2,1739');await has('spSum','216,9330');await has('spClosedForm','216,9330');await has('spLimit','217,3913');await has('spN95','5. tur / 5. tur');await has('spLeak','= 100,0000');
   await has('depMult','4,0000');await has('depSum','377,4746');await has('depLimit','400,0000');await has('depN95','11. tur / 11. tur');await has('depBase','= 100,0000');await inked('spCanvas');await inked('depCanvas');
   await click('spClosed');await has('spMult','5,0000');await has('spLimit','500,0000');await range('spN',60);await has('spSum','499,9992');
   await click('spFull');await has('spMult','0,0000');await has('spN95','Tanımsız');await has('spStatus','d = 1');await click('spHalf');await has('spMult','2,5000');
   await range('mpc',0.05);await range('taxT',0.5);await range('impM',0.4);await has('spStatus','sıfırın altında');await has('spSum','—');
   await range('crowdD',0);await range('mpc',0.35);await range('taxT',0.2);await range('impM',0.28);await has('spQ','0,0000');await has('spMult','1,0000');await has('spStatus','q = 0');await has('spN95','1. tur / 1. tur');await has('spLeak','= 100,0000');await clean('carpan');
   await click('carpanResetTop');await has('spSum','216,9330');await range('mpc',0.5);
   await click('depNoCash');await has('depMult','10,0000');await click('depHoard');await has('depMult','2,5000');
   await extremes('carpan');await click('carpanReset');await has('spSum','216,9330');await has('depSum','377,4746');await has('injGOut','100 birim');await fits();
   // 02
   await click('tab-enf');await has('dblMeasured','7,2725');await has('dblExact','7,2725');await has('dbl70','7,0000');await has('dbl70','−%3,75');await has('fisherExact','+%4,5455');await has('fisherApprox','+0,4545 puan');await has('realMeasured','+%4,5455');await has('cashPower','148,64');
   await inked('cmpCanvas');await inked('ruleCanvas');await inked('tyCanvas');
   await click('cmpHigh');await has('fisherExact','−%6,2500');await has('fisherApprox','−%10,0000');await has('dbl70','1,1667');await click('cmpLow');await has('dblExact','35,0028');await has('dbl70','35,0000');
   await has('qeExact','P: +%10,0000');await has('qeResidual','0');await page.locator('#qeShock').selectOption('Y');await has('qeExact','P: −%9,0909');await has('qeApprox','P: −%10,0000');
   await page.locator('#qeShock').selectOption('P');await has('qeStatus','kullanılamaz');await page.setViewportSize({width:width+10,height:900});await page.waitForTimeout(150);await page.setViewportSize({width,height:900});await page.waitForTimeout(150);await has('qeStatus','kullanılamaz');eq(await page.locator('#qeAdjust').inputValue(),'Y');
   await page.locator('#qeShock').selectOption('M');ok(!(await read('qeStatus')).includes('kullanılamaz'),'bildirim yeni seçimle silinir');await page.locator('#qeAdjust').selectOption('PY');eq(await page.locator('#qeShare').isDisabled(),false);await has('qeExact','P: +%4,8809');await page.locator('#qeAdjust').selectOption('V');eq(await page.locator('#qeShare').isDisabled(),true);await has('qeExact','V: −%9,0909');
   await has('tyRate','%7,00');await has('tyReal','+1,00 puan');await has('tyEig','0,8431');await has('tyRho','0,843070');await has('tyRhoMeasured','0,843070');await has('tyHalf','4,06');
   await click('tyZero');await has('tyRho','1,000000');await has('tyRhoMeasured','1,000000');await has('tyEnd','%4,0000');await has('tyStatus','sönmüyor');await has('tyHalf','Tanımsız');
   await click('tyNeg');await has('tyRho','1,085582');await has('tyStatus','Taylor ilkesi çiğneniyor');await range('tyA',2);await has('tyStatus','üst sınırında');await range('tyA',3);await has('tyStatus','aşırı tepki');
   await range('tyB',0);await range('tyA',2);await has('tyRhoMeasured','0,000000');await has('tyHalf','Hemen söner');await range('tyShock',0);await has('tyRhoMeasured','şok yok');await has('tyStatus','Şok sıfır');
   await click('tyT93');await range('tyShock',2);await has('tyRho','0,843070');await range('tyA',1);await has('tyEig','0,7071 ve −0,7071');await has('tyStatus','iki dönemde bir basamakla');await range('tyA',1.5);await has('tyStatus','işaret değiştirerek');await click('enfResetTop');await has('tyRho','0,843070');
   await extremes('enf');await click('enfReset');await has('dblMeasured','7,2725');await has('qeExact','P: +%10,0000');await has('tyRate','%7,00');await fits();
   // 03
   await click('tab-solow');await has('solKstar','3,925910');await has('solKmeas','3,925910');await has('solYC','y* = 1,5704');await has('solYC','c* = 1,2563');await has('solGoldBrute','s = 0,330');await has('solHalfTheory','12,932');await has('solHalfZ','12,932');await has('solHalfK','15,042');
   await inked('solPhase');await inked('solTime');await inked('solGold');
   await click('solGolden');await has('solGoldTheory','s altın kuralda');await click('solowReset');await click('solDouble');eq(await page.locator('#solK0').isDisabled(),true);await has('solGoldTheory','şok sonrası s = 0,40 altın kuralın üstünde');await has('solStatus','1,4066');await has('solStatus','1,4069');await has('solStatus','%4,64');await has('solGrowthEnd','%2,000');
   await range('solCursor',20);await has('solGrowth','%4,6');await range('solK0',1);await page.locator('#solMode').selectOption('none');await range('solK0',1);await has('solHalfK','Tanımsız');
   await range('solDelta',2);await range('solN',-1);await range('solG',0);await range('solT',50);await range('solK0',0.25);await has('solHalfK','Ufuk içinde yarılanmadı');await has('solStatus','ufuk yetmedi');
   await extremes('solow');await click('solowReset');await has('solKstar','3,925910');eq(await page.locator('#solCursor').inputValue(),'0');await fits();
   // Klavye: sekmeler ve R.
   await page.locator('#tab-solow').focus();await page.keyboard.press('Home');eq(await page.locator('#tab-carpan').getAttribute('aria-selected'),'true');await page.keyboard.press('ArrowRight');eq(await page.locator('#tab-enf').getAttribute('aria-selected'),'true');await page.keyboard.press('End');eq(await page.locator('#tab-solow').getAttribute('aria-selected'),'true');await page.keyboard.press('ArrowRight');eq(await page.locator('#tab-carpan').getAttribute('aria-selected'),'true');
   await range('mpc',0.5);await has('spMult','1,4286');await page.locator('h1').click();await page.keyboard.press('r');await has('spMult','2,1739');
   eq(await page.evaluate(()=>Object.isFrozen(MakroLab)&&!Object.getOwnPropertyDescriptor(window,'MakroLab').writable),true);
   assert.deepEqual(errors,[]);checks++;await ctx.close();}
  console.log(`G makro: ${checks-before} kalıcı tarayıcı kontrolü (390 px açık + 1280 px koyu; sekmeler, hazır değerler, sıfırlama, sınırlar, klavye) PASS`);
 }finally{await browser?.close();await new Promise(r=>server.close(r));}
}
