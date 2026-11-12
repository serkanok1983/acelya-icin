// Kalıcı denetim: mikro-ekonomi-ve-uretim-faktorleri.html çekirdeği (window.MikroLab).
// Başvurular sayfanın kendi çözücülerini yinelemez: Cramer kuralı, çokgen alanı (shoelace), kaba Riemann toplamı,
// sabit ızgara taraması, harcama fonksiyonunun kapalı biçimi ve maliyetin elle yazılmış tersi kullanılır.
// Kullanım: node scripts/check-g-mikro-ekonomi-ve-uretim-faktorleri.mjs [--browser]
import fs from 'node:fs';
import vm from 'node:vm';
import assert from 'node:assert/strict';
import { canvasInk, canvasInkAll, assertCanvasDrawn } from './lib/canvas-check.mjs';
const SLUG='mikro-ekonomi-ve-uretim-faktorleri';
const html=fs.readFileSync(new URL(`../${SLUG}.html`,import.meta.url),'utf8');
const source=html.split('/* KERNEL-BEGIN */')[1]?.split('/* KERNEL-END */')[0];
assert(source,'KERNEL işaretleri gerekli');
const context={window:{}};vm.createContext(context);vm.runInContext(source,context);
const K=context.window.MikroLab;let checks=0;
const near=(actual,expected,tol=1e-6,what='')=>{assert(Number.isFinite(actual)&&Math.abs(actual-expected)<=tol*Math.max(1,Math.abs(expected)),`${what} ${actual} ≠ ${expected}`);checks++;};
const ok=(cond,what='koşul')=>{assert(cond,what);checks++;};
const eq=(a,b,what='eşitlik')=>{assert.equal(a,b,what);checks++;};
const shoelace=pts=>Math.abs(pts.reduce((s,[x,y],i)=>{const[X,Y]=pts[(i+1)%pts.length];return s+x*Y-X*y;},0))/2;
const riemann=(f,a,b,n=20000)=>{let s=0;const h=(b-a)/n;for(let i=0;i<n;i++)s+=f(a+(i+.5)*h);return s*h;};

/* ---------- 01 piyasa ---------- */
for(const a of[60,120,200])for(const b of[.2,1,3])for(const c of[0,20,50])for(const d of[.2,1,3]){
 // Cramer: P + bQ = a ; P − dQ = c
 const det=-d-b,Q=(c-a)/det,P=(-a*d-b*c)/det,f=K.market({a,b,c,d}).free;
 near(f.Q,Q,1e-9,'Q*');near(f.P,P,1e-9,'P*');near(f.QTh,Q,1e-12);near(f.PTh,P,1e-12);
 near(f.cs,shoelace([[0,P],[0,a],[Q,P]]),1e-9,'CS');near(f.ps,shoelace([[0,P],[0,c],[Q,P]]),1e-9,'PS');
 near(f.cs,riemann(q=>a-b*q-P,0,Q),1e-7,'CS Riemann');near(f.csTh,f.cs,1e-9);near(f.psTh,f.ps,1e-9);
 near(f.ed,-(1/b)*P/Q,1e-6,'ed');near(f.es,(1/d)*P/Q,1e-6,'es');near(f.edTh,f.ed,1e-6);near(f.esTh,f.es,1e-6);
 // hasılat: bağımsız sabit ızgara taraması
 let best=0,bq=0;for(let i=0;i<=20000;i++){const q=a/b*i/20000,v=(a-b*q)*q;if(v>best){best=v;bq=q;}}
 near(f.revQ,bq,2e-4,'argmax TR');near(f.revMax,best,1e-7);near(f.revQTh,a/(2*b),1e-12);near(f.edRev,-1,1e-5,'birim esneklik');
 for(const t of[1,7,20,40,60]){
  const r=K.market({a,b,c,d,mode:'tax',t}).iv;eq(r.active,true);
  if(t>=a-c){eq(r.closed,true);eq(r.Q,0);eq(r.exponent,null);eq(r.share,null);near(r.dwl,f.cs+f.ps,1e-9,'kapalı piyasa kaybı');near(r.dwlTh,r.dwl,1e-9);continue;}
  // kama: talep fiyatı − arz fiyatı = t; bağımsız çözüm ızgara + doğrusal ara değer yerine doğrudan cebir
  const Qt=(a-c-t)/(b+d),Pb=a-b*Qt,Psel=c+d*Qt;near(Pb-Psel,t,1e-12);
  near(r.Q,Qt,1e-9,'Qt');near(r.Pb,Pb,1e-9);near(r.Psell,Psel,1e-9);near(r.gov,t*Qt,1e-9);
  near(r.share,(Pb-P)/t,1e-8,'pay');near(r.shareTh,b/(b+d),1e-9,'esneklik formülü = eğim formülü');near(r.share+(P-Psel)/t,1,1e-8);
  near(r.dwl,shoelace([[Qt,Pb],[Qt,Psel],[Q,P]]),1e-9,'DWL');near(r.dwlTh,r.dwl,1e-9);near(r.exponent,2,1e-9,'kare yasası');
  near(r.cs+r.ps+r.gov+r.dwl,f.cs+f.ps,1e-9,'refah muhasebesi');near(r.dW,-r.dwl,1e-8);
  near(r.cs,riemann(q=>a-b*q-Pb,0,Qt),1e-7);near(r.ps,riemann(q=>Psel-c-d*q,0,Qt),1e-7);
  const dbl=K.market({a,b,c,d,mode:'tax',t:t/2}).iv;near(r.dwl/dbl.dwl,4,1e-9,'vergi iki katı, kayıp dört katı');
 }
 for(const t of[5,20]){const r=K.market({a,b,c,d,mode:'subsidy',t}).iv,Qs=(a-c+t)/(b+d),Pb=a-b*Qs;
  if(Pb<=0){eq(r.valid,false);continue;}eq(r.valid,true);near(r.Q,Qs,1e-9);near(r.Pb,Pb,1e-9);near(r.Psell,Pb+t,1e-9);near(r.gov,-t*Qs,1e-9);
  near(r.dwl,shoelace([[Q,P],[Qs,Pb],[Qs,Pb+t]]),1e-9,'sübvansiyon kaybı');near(r.cs+r.ps+r.gov+r.dwl,f.cs+f.ps,1e-9);near(r.share,b/(b+d),1e-8);ok(r.Q>Q,'sübvansiyon miktarı artırır');}
 for(const pc of[0,10,35,50,90,150,200]){
  const ce=K.market({a,b,c,d,mode:'ceiling',pc}).iv,fl=K.market({a,b,c,d,mode:'floor',pc}).iv;
  eq(ce.active,pc<P-1e-9*a);eq(fl.active,pc>P+1e-9*a);
  if(ce.active){const qs=Math.max(0,(pc-c)/d),qd=(a-pc)/b;near(ce.Q,qs,1e-9);near(ce.gapQ,qd-qs,1e-9,'kıtlık');ok(ce.gapQ>0);
   near(ce.cs,riemann(q=>a-b*q-pc,0,qs),1e-7);near(ce.ps,riemann(q=>pc-c-d*q,0,qs),1e-7);near(ce.dwl,shoelace([[qs,a-b*qs],[qs,c+d*qs],[Q,P]]),1e-9);
   near(ce.cs+ce.ps+ce.dwl,f.cs+f.ps,1e-9);near(ce.csTh,ce.cs,1e-9);near(ce.psTh,ce.ps,1e-9);near(ce.dwlTh,ce.dwl,1e-9);ok(ce.ps<f.ps,'tavan üretici artığını azaltır');}
  if(fl.active){const qd=Math.max(0,(a-pc)/b),qs=(pc-c)/d;near(fl.Q,qd,1e-9);near(fl.gapQ,qs-qd,1e-9,'fazla');
   near(fl.cs,riemann(q=>a-b*q-pc,0,qd),1e-7);near(fl.ps,riemann(q=>pc-c-d*q,0,qd),1e-7);near(fl.cs+fl.ps+fl.dwl,f.cs+f.ps,1e-9);near(fl.csTh,fl.cs,1e-9);near(fl.psTh,fl.ps,1e-9);ok(fl.cs<f.cs,'taban tüketici artığını azaltır');}
 }
}
{const r=K.market({a:120,b:1,c:20,d:1,mode:'tax',t:20});near(r.free.Q,50);near(r.free.P,70);near(r.free.cs,1250);near(r.free.ed,-1.4,1e-8);near(r.iv.Q,40);near(r.iv.Pb,80);near(r.iv.Psell,60);near(r.iv.gov,800);near(r.iv.dwl,100);
 const i=K.market({a:120,b:3,c:20,d:1,mode:'tax',t:20}).iv;near(i.share,.75,1e-9,'dik talep: alıcı payı 3/4');near(i.dwl,50);
 const c=K.market({a:120,b:1,c:20,d:1,mode:'ceiling',pc:50}).iv;near(c.gapQ,40);near(c.dwl,400);near(c.cs,1650);near(c.ps,450);
 eq(K.market({a:120,b:1,c:20,d:1,mode:'ceiling',pc:70}).iv.active,false);eq(K.market({a:120,b:1,c:20,d:1,mode:'floor',pc:70}).iv.active,false);
 eq(K.market({a:60,b:3,c:0,d:.2,mode:'subsidy',t:60}).iv.valid,false);eq(K.market({a:120,b:1,c:20,d:1,mode:'tax',t:0}).iv.active,false);}
for(const bad of[{a:20,b:1,c:20,d:1},{a:120,b:0,c:20,d:1},{a:120,b:1,c:20,d:-1},{a:NaN,b:1,c:20,d:1}]){assert.throws(()=>K.market(bad));checks++;}

/* ---------- 02 tüketici ---------- */
const U={cd:(al,x,y)=>x**al*y**(1-al),subs:(al,x,y)=>al*x+(1-al)*y,comp:(al,x,y)=>Math.min(x/al,y/(1-al))};
for(const type of['cd','subs','comp'])for(const alpha of[.1,.35,.5,.9])for(const[px,py,M,px2]of[[4,5,200,2],[4,5,200,8],[1,20,400,20],[20,1,20,1],[7.5,3,150,7.5],[3,6.5,90,11]]){
 const r=K.consumer({type,alpha,px,py,M,px2});
 // bağımsız kaba kuvvet: bütçe doğrusu üzerinde 40.001 nokta
 const brute=(p,m)=>{let bu=-1,bx=0;for(let i=0;i<=40000;i++){const x=m/p*i/40000,u=U[type](alpha,x,(m-p*x)/py);if(u>bu){bu=u;bx=x;}}return{x:bx,U:bu};};
 const tieA=type==='subs'&&Math.abs(alpha/px-(1-alpha)/py)<1e-12,tieC=type==='subs'&&Math.abs(alpha/px2-(1-alpha)/py)<1e-12;
 eq(r.A.tie,tieA);eq(r.C.tie,tieC);
 const utol=type==='comp'?2e-4:1e-7; // köşeli fayda: ızgara hatası adımla doğrusal
 const b0=brute(px,M);near(r.A.U,b0.U,utol,'en büyük fayda');ok(r.A.U>=b0.U*(1-1e-12),'çekirdek kaba kuvvetten kötü değil');if(!tieA){near(r.A.x,b0.x,2e-4*Math.max(1,M/px)/Math.max(1,b0.x),'x*');near(px*r.A.x+py*r.A.y,M,1e-9,'bütçe');near(r.A.x,r.Ac.x,1e-5);near(r.A.y,r.Ac.y,1e-5);}
 if(type==='cd'){near(r.A.x,alpha*M/px,1e-5,'x* = aM/px');near(r.mrs,px/py,1e-5,'MRS = fiyat oranı');near(px*r.A.x/M,alpha,1e-5,'harcama payı');}
 if(type==='comp'){near(r.A.x/r.A.y,alpha/(1-alpha),1e-8,'sabit oran');eq(r.mrs,null);}
 if(type==='subs'&&!tieA){ok(r.A.x===0||r.A.y<1e-9,'köşe çözümü');near(r.mrs,alpha/(1-alpha),1e-6);}
 if(!tieC){const b1=brute(px2,M);near(r.C.U,b1.U,utol);near(r.C.x,r.Cc.x,1e-5);}
 if(r.ok){near(U[type](alpha,r.H.x,r.H.y),r.A.U,1e-8,'B eski fayda düzeyinde');near(px2*r.H.x+py*r.H.y,r.H.m,1e-9);near(r.SE+r.IE,r.C.x-r.A.x,1e-9,'ikame + gelir = toplam');
  ok(r.SE*(px2-px)<=1e-6,'ikame etkisi fiyatla ters yönlü');
  if(type==='cd'){const e=r.A.U*(px2/alpha)**alpha*(py/(1-alpha))**(1-alpha);near(r.H.m,e,1e-8,'harcama fonksiyonu');near(r.H.x,alpha*e/px2,1e-5);}
  if(type==='comp')near(r.SE,0,1e-7,'tamamlayıcıda ikame etkisi yok');
  // telafi edilmiş gelirden azı eski faydaya yetmez (kaba kuvvet)
  ok(brute(px2,r.H.m*.999).U<r.A.U,'daha az gelir yetmez');near(r.SE,r.SETh,1e-5);near(r.IE,r.IETh,1e-5);}
 eq(r.demand.length,39);ok(r.demandDev<1e-6,'talep eğrisi kapalı biçime uyuyor');
 for(let i=1;i<r.demand.length;i++)if(r.demand[i].x!==null&&r.demand[i-1].x!==null){ok(r.demand[i].x<=r.demand[i-1].x+1e-7,'talep aşağı eğimli');}
 for(let i=1;i<r.icc.length;i++)ok(r.icc[i].x>=r.icc[i-1].x-1e-9&&r.icc[i].y>=r.icc[i-1].y-1e-9,'gelir-tüketim yolu artan');
}
{const r=K.consumer({type:'cd',alpha:.5,px:4,py:5,M:200,px2:2});near(r.A.x,25,1e-6);near(r.A.y,20,1e-6);near(r.H.x,25*Math.SQRT2,1e-6);near(r.H.m,100*Math.SQRT2,1e-8);near(r.SE,25*(Math.SQRT2-1),1e-6);near(r.IE,50-25*Math.SQRT2,1e-6);
 const s=K.consumer({type:'cd',alpha:.5,px:4,py:5,M:200,px2:4});eq(s.same,true);near(s.SE,0,1e-6);
 const t=K.consumer({type:'subs',alpha:.5,px:5,py:5,M:200,px2:2});eq(t.A.tie,true);eq(t.ok,false);eq(t.SE,null);}

/* ---------- 03 firma ---------- */
for(const alpha of[.2,.5,.75,.9])for(const beta of[.1,.5,.9])for(const[Kc,w,r0,L0]of[[16,20,10,4],[1,5,1,.5],[64,60,30,10],[9,33,7,0],[25,12,30,2.5]])for(const P of[1,15,40,80]){
 const cfg={alpha,beta,K:Kc,w,r:r0,L0,P},f=K.firm(cfg),FC=r0*Kc;
 // bağımsız maliyet: üretim fonksiyonunun elle tersi
 const Lof=q=>L0+(q/Kc**beta)**(1/alpha),TC=q=>FC+w*Lof(q);
 for(const q of[.5,3,11])near(f.TC(q),TC(q),1e-9,'TC');
 // en düşük ATC ve AVC: logaritmik ızgarada kaba kuvvet + yerel incelik
 const scan=g=>{let bv=Infinity,bq=0;for(let i=0;i<=6000;i++){const q=10**(-4+8*i/6000),v=g(q);if(v<bv){bv=v;bq=q;}}for(let k=0;k<4;k++){const lo=bq*(1-10**(-2-k)),hi=bq*(1+10**(-2-k));for(let i=0;i<=400;i++){const q=lo+(hi-lo)*i/400,v=g(q);if(v<bv){bv=v;bq=q;}}}return{q:bq,v:bv};};
 const a=scan(q=>TC(q)/q);near(f.atc.value,a.v,1e-8,'min ATC');near(f.atc.q,a.q,2e-3,'argmin ATC');near(f.atcCross,f.atc.q,1e-4,'MC, ATC’yi en düşük noktasında keser');near(f.MC(f.atcCross),f.atc.value,1e-5,'kesişimde MC = min ATC');
 near(f.minAtcTh,a.v,1e-8);near(f.atc.q,f.qAtcTh,1e-4);
 if(L0>0){const v=scan(q=>w*Lof(q)/q);near(f.avc.value,v.v,1e-8,'min AVC');near(f.avcCross,f.avc.q,1e-4,'MC, AVC’yi en düşük noktasında keser');near(f.minAvcTh,v.v,1e-8);
  near(f.apMax.L,L0/(1-alpha),1e-4,'AP tepe');near(f.apMax.mp,f.apMax.value,1e-5,'tepede MP = AP');near(w/f.apMax.value,f.avc.value,1e-8,'AVC = w/AP');ok(f.avc.value<f.atc.value,'min AVC < min ATC');ok(f.avc.q<f.atc.q);}
 else{eq(f.avc,null);eq(f.apMax,null);eq(f.avcCross,null);}
 // azalan verimler: MP, L0'dan sonra tekdüze azalır
 let prev=Infinity;for(const e of[.5,1,2,5,10,40]){const mp=f.MP(L0+e);ok(mp<prev,'azalan marjinal ürün');prev=mp;near(mp,alpha*f.prod(L0+e)/e,1e-6);}
 // kâr: bağımsız kaba kuvvet (Q = 0 seçeneği dahil)
 let bp=-FC,bq=0;const qTop=Math.max(4*a.q,(P*alpha*Kc**(beta/alpha)/w)**(alpha/(1-alpha))*2);for(let i=1;i<=60000;i++){const q=qTop*i/60000,v=P*q-TC(q);if(v>bp){bp=v;bq=q;}}
 const ptol=1e-6*Math.max(1,FC/Math.max(1,Math.abs(bp)));near(f.profit,bp,ptol,'kâr');near(f.profitTh,f.profit,ptol);
 const shutRef=L0>0?scan(q=>w*Lof(q)/q).v:0;
 if(P<shutRef*(1-1e-6)){eq(f.operate,false);eq(f.Q,0);near(f.profit,-FC,1e-12);}
 if(f.negligible){eq(L0,0);ok(bp+FC<=2e-7*Math.max(FC,1),'ihmal edilen kazanç gerçekten küçük');}
 else if(P>shutRef*(1+1e-6)){eq(f.operate,true);near(f.mcAtQ,P,1e-5,'P = MC');near(f.Q,f.QTh,1e-4);ok(f.profit>-FC);if(P>a.v*(1+1e-6))ok(f.profit>0,'P > min ATC ise kâr');if(P<a.v*(1-1e-6))ok(f.profit<0,'P < min ATC ise zarar');}
 near(f.scale,2**(alpha+beta),1e-12,'ölçek');near(f.scaleTh,f.scale,1e-12);
 // doğrudan üretim fonksiyonuyla (L0 = 0 kipinde) iki katına çıkarma
 near(f.prod(2*7,2*Kc,0)/f.prod(7,Kc,0),2**(alpha+beta),1e-12);
}
{const f=K.firm({alpha:.5,beta:.5,K:16,w:20,r:10,L0:4,P:40});near(f.Q,16,1e-6);near(f.profit,80,1e-8);near(f.L,20,1e-6);near(f.atc.q,Math.sqrt(192),1e-6);near(f.atc.value,Math.sqrt(1200),1e-9);near(f.avc.q,8,1e-6);near(f.avc.value,20,1e-9);near(f.apMax.L,8,1e-6);
 const l=K.firm({alpha:.5,beta:.5,K:16,w:20,r:10,L0:4,P:30});near(l.Q,12,1e-6);near(l.profit,-60,1e-8);eq(l.operate,true);
 const i=K.firm({alpha:.5,beta:.5,K:16,w:20,r:10,L0:4,P:20});eq(i.indifferent,true);near(i.profit,-160,1e-7);near(i.Q,8,1e-5);
 const c=K.firm({alpha:.5,beta:.5,K:16,w:20,r:10,L0:4,P:15});eq(c.operate,false);eq(c.Q,0);near(c.profit,-160);
 const p=K.firm({alpha:.5,beta:.5,K:16,w:20,r:10,L0:0,P:40});eq(p.avc,null);near(p.Q,16,1e-6);near(p.profit,160,1e-8);near(p.atc.value,Math.sqrt(800),1e-9);
 const g=K.firm({alpha:.5,beta:.8,K:16,w:20,r:10,L0:4,P:40});near(g.scale,2**1.3,1e-12);}
for(const bad of[{alpha:1,beta:.5,K:16,w:20,r:10,L0:4,P:40},{alpha:.5,beta:.5,K:0,w:20,r:10,L0:4,P:40},{alpha:.5,beta:.5,K:16,w:20,r:10,L0:-1,P:40}]){assert.throws(()=>K.firm(bad));checks++;}
ok(Object.isFrozen(K),'çekirdek dondurulmuş');
console.log(`G mikro ekonomi: ${checks.toLocaleString('tr-TR')} bağımsız denge, artık, vergi, tüketici ve maliyet kontrolü PASS`);

if(process.argv.includes('--browser')){
 const {chromium}=await import('playwright');const {createServer}=await import('node:http');const {join,extname}=await import('node:path');const {fileURLToPath}=await import('node:url');const root=fileURLToPath(new URL('../',import.meta.url));
 const server=createServer((req,res)=>{const file=join(root,decodeURIComponent(new URL(req.url,'http://localhost').pathname));if(!fs.existsSync(file)||fs.statSync(file).isDirectory()){res.writeHead(404).end();return;}res.setHeader('Content-Type',({'.html':'text/html; charset=utf-8','.js':'text/javascript; charset=utf-8','.css':'text/css; charset=utf-8'})[extname(file)]||'application/octet-stream');res.end(fs.readFileSync(file));});await new Promise(r=>server.listen(0,'127.0.0.1',r));let browser;
 try{browser=await chromium.launch();const before=checks;
  for(const[theme,width]of[['light',390],['dark',1280]]){
   const ctx=await browser.newContext({viewport:{width,height:900},deviceScaleFactor:2,locale:'tr-TR'});await ctx.addInitScript(t=>{localStorage.setItem('acelya-theme',t);localStorage.setItem('acelya-sound-muted','1');},theme);
   const page=await ctx.newPage();page.setDefaultTimeout(5000);const errors=[];page.on('pageerror',e=>errors.push(e.message));page.on('console',m=>{if(m.type()==='error'&&!/404|Failed to load resource/.test(m.text()))errors.push(m.text());});
   await page.goto(`http://127.0.0.1:${server.address().port}/${SLUG}.html`);await page.waitForTimeout(400);
   const click=id=>page.locator('#'+id).click(),read=async id=>(await page.locator('#'+id).textContent()).trim(),range=(id,v)=>page.locator('#'+id).evaluate((e,v)=>{e.value=v;e.dispatchEvent(new Event('input',{bubbles:true}));},v),
    has=async(id,text)=>{const t=await read(id);assert(t.includes(text),`${theme} ${id}: "${t}" içinde "${text}" yok`);checks++;},is=async(id,text)=>{eq(await read(id),text,`${theme} ${id}`);},
    fits=async tag=>{eq(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),true,`${theme} ${tag}: yatay taşma`);},
    painted=async id=>{eq(assertCanvasDrawn(await canvasInk(page,'#'+id),{minDistinct:4,label:`${theme} ${id}`}),true,`${theme} ${id} boş`);};
   // erişilebilirlik: her denetimin etiketi, her tuvalin rolü
   eq(await page.evaluate(()=>[...document.querySelectorAll('main input,main select')].every(e=>e.id&&document.querySelector(`label[for="${e.id}"]`))),true,'etiketler');
   eq(await page.evaluate(()=>[...document.querySelectorAll('main canvas')].every(c=>c.getAttribute('role')==='img'&&c.getAttribute('aria-label'))),true,'tuval rolleri');
   eq(await page.evaluate(()=>[...document.querySelectorAll('main input[type=range]')].every(e=>{const k=(+e.defaultValue-+e.min)/+e.step;return Math.abs(k-Math.round(k))<1e-9;})),true,'varsayılanlar adım ızgarasında');
   eq(await page.evaluate(()=>/[̀-ͯ]/.test(document.querySelector('main').textContent.normalize('NFC'))),false,'birleşik işaret yok');
   // 01 piyasa
   await is('mP','70 TL');await is('mQ','50 birim');await is('mW','2.500 TL');await is('mDwl','0 TL');await is('csM','1.250 TL');await is('csT','1.250 TL');await is('csD','%0,0000');await is('edM','−1,4');await is('eqRM','3.500 TL');await is('eqRT','3.500 TL');/* doğrulayıcı eki: dengede hasılat satırı, U+2212 eksi, hazır ayar notu */ok(!/-\d/.test(await page.locator('#panel-market').innerText()),'gösterilen sayılarda kısa çizgili eksi yok');eq(await page.locator('#mInel').getAttribute('title'),'Öteki denetimleri varsayılan değerlerine döndürür');await is('revQM','60 birim');await is('edRevM','−1');await has('marketStatus','Serbest piyasa dengesi');
   eq(await page.locator('#mTField').isHidden(),true);eq(await page.locator('#mPcField').isHidden(),true);await painted('marketCanvas');await painted('revenueCanvas');await fits('piyasa');
   await click('mTax20');await is('ivQM','40 birim');await is('ivPbM','80 TL');await is('ivPsM','60 TL');await is('ivShareM','0,5');await is('ivShareT','0,5');await is('ivGovM','800 TL');await is('ivDwlM','100 TL');await is('ivDwlT','100 TL');await is('ivExpM','2');await is('mDwl','100 TL');await is('mW','2.400 TL');await has('marketStatus','%50');
   await click('mTax40');await is('ivDwlM','400 TL');await is('ivGovM','1.200 TL');
   await click('mInel');await is('ivShareM','0,75');await is('ivDwlM','50 TL');await is('mAOut','120 TL');await is('mBOut','3 TL/birim');
   await click('mCeil');await is('ivGapM','40 birim');await is('ivDwlM','400 TL');await is('ivCsM','1.650 TL');await has('marketStatus','kıtlık 40 birim');await has('marketStatus','Etkin dağıtım');
   await range('mPc',70);await has('marketStatus','bağlayıcı olmadığı');await is('mDwl','0 TL');await range('mPc',0);await has('marketStatus','Hiç işlem olmuyor');await is('ivQM','0 birim');
   await click('mFloor');await is('ivGapM','40 birim');await is('ivPsurM','1.650 TL');await has('marketStatus','fazla 40 birim');await range('mPc',200);await is('ivQM','0 birim');
   await click('marketReset');await page.locator('#mMode').selectOption('tax');await range('mA',60);await range('mC',50);await range('mT',60);await has('marketStatus','hiç işlem olmuyor');await is('ivShareM','—');await is('ivExpM','—');await is('ivQM','0 birim');
   await range('mT',0);await has('marketStatus','t = 0');
   await page.locator('#mMode').selectOption('subsidy');await range('mC',0);await range('mB',3);await range('mD',.2);await range('mT',60);await has('marketStatus','sıfırın altına');await is('mW','—');await is('mDwl','—');
   await click('marketReset');await page.locator('#mMode').selectOption('subsidy');await is('ivQM','60 birim');await is('ivGovM','1.200 TL');await is('ivDwlM','100 TL');
   await click('marketReset');await is('mP','70 TL');eq(await page.locator('#mMode').inputValue(),'none');await is('mTOut','20 TL/birim');
   // 02 tüketici
   await click('tab-consumer');await is('uBundle','(25; 20)');await is('uxM','25 birim');await is('uxT','25 birim');await is('umrsM','0,8');await is('umrsT','0,8');await is('uhxM','35,355 birim');await is('uhmM','141,421 TL');await is('uSE','10,36 birim');await is('uIE','14,64 birim');await is('useD','%0,0000');await has('consumerStatus','İç çözüm');await painted('consCanvas');await painted('demandCanvas');await fits('tüketici');
   await click('uRise');await is('ucxM','12,5 birim');await is('uhxM','17,678 birim');await is('uSE','−7,32 birim');await is('uIE','−5,18 birim');
   await click('uSubs');await is('uBundle','(50; 0)');await is('uSE','0 birim');await is('uIE','50 birim');await has('consumerStatus','köşede');await is('umrsD','köşe çözümü');
   await range('uPx',5);await is('uBundle','Tek değil');await is('uxM','—');await is('uSE','—');await has('consumerStatus','tek bir en iyi sepet yok');
   await click('uComp');await is('uBundle','(22,22; 22,22)');await is('uSE','0 birim');await is('uIE','6,35 birim');await has('umrsM','Tanımsız');await has('uMrs','Tanımsız');
   await click('consumerReset');await range('uPx2',4);await is('uSE','0 birim');await is('uIE','0 birim');await has('consumerStatus','fiyat değişmedi');
   await range('uAlpha',.9);await range('uPx',1);await range('uPy',20);await range('uM',400);await range('uPx2',20);await is('uxM','360 birim');await is('ucxM','18 birim');await fits('tüketici sınır');
   await range('uAlpha',.1);await range('uPx',20);await range('uPy',1);await range('uM',20);await range('uPx2',1);await is('uxM','0,1 birim');await is('ucxM','2 birim');
   await click('consumerReset');await is('uBundle','(25; 20)');eq(await page.locator('#uType').inputValue(),'cd');
   // 03 firma
   await click('tab-firm');await is('fQ','16 birim');await is('fProfit','80 TL');await is('fShut','20 TL');await is('fBreak','34,64 TL');await is('fqM','16 birim');await is('fmcM','40 TL');await is('fatcqM','13,856 birim');await is('fatcxM','13,856 birim');await is('fatcxD','%0,0000');await is('favcqM','8 birim');await is('favcxM','8 birim');await is('fapM','8 işçi');await is('fscaleM','2');await has('firmStatus','80 TL iktisadi kâr');await has('firmScale','sabit getiri');
   for(const id of['costCanvas','totalCanvas','prodCanvas'])await painted(id);await fits('firma');
   await click('fLoss');await is('fQ','12 birim');await is('fProfit','−60 TL');await has('firmStatus','zarar eder ama üretir');
   await click('fClose');await is('fQ','0 birim');await is('fProfit','−160 TL');await has('firmStatus','üretimi durdurur');await is('fmcM','Üretim yok');
   await range('fP',20);await has('fQ','ya da 0');await has('firmStatus','kayıtsız');await is('fProfit','−160 TL');
   await click('fPure');await is('fShut','İç en düşük yok');await is('fQ','16 birim');await is('fProfit','160 TL');await has('favcM','Yok');await has('firmStatus','kapanma fiyatı yoktur');await is('fBreak','28,28 TL');
   await click('fIncr');await is('fscaleM','2,4623');await is('fscaleT','2,4623');await has('firmScale','artan getiri');
   await range('fAlpha',.9);await range('fBeta',.9);await range('fK',64);await range('fL0',10);await range('fW',60);await range('fR',30);await range('fP',80);await is('fatcxD','%0,0000');await is('fapM','100 işçi');await fits('firma sınır');
   await range('fAlpha',.2);await range('fBeta',.1);await range('fK',1);await range('fL0',0);await range('fW',5);await range('fR',1);await range('fP',1);assert(!/NaN|Infinity|undefined/.test(await page.locator('#panel-firm').textContent()));checks++;await is('fscaleM','1,2311');
   await click('firmReset');await is('fQ','16 birim');await is('fPOut','40 TL');
   // klavye
   await page.locator('#tab-firm').focus();await page.keyboard.press('Home');eq(await page.locator('#tab-market').getAttribute('aria-selected'),'true');await page.keyboard.press('ArrowRight');eq(await page.locator('#tab-consumer').getAttribute('aria-selected'),'true');eq(await page.locator('#panel-consumer').isVisible(),true);await page.keyboard.press('End');eq(await page.locator('#tab-firm').getAttribute('aria-selected'),'true');await page.keyboard.press('ArrowRight');eq(await page.locator('#tab-market').getAttribute('aria-selected'),'true');eq(await page.locator('#tab-market').getAttribute('tabindex'),'0');eq(await page.locator('#tab-firm').getAttribute('tabindex'),'-1');
   await click('mTax40');await page.locator('h1').click();await page.keyboard.press('r');await is('mDwl','0 TL');eq(await page.locator('#mMode').inputValue(),'none');
   await click('mTax40');await page.locator('#mA').focus();await page.keyboard.press('r');await is('mDwl','400 TL');await click('marketReset');
   eq(await page.evaluate(()=>Object.isFrozen(MikroLab)&&!Object.getOwnPropertyDescriptor(window,'MikroLab').writable),true);
   assert(!/NaN|Infinity|undefined/.test(await page.locator('main').textContent()));checks++;
   await fits('son');assert.deepEqual(errors,[]);checks++;await ctx.close();}
  console.log(`G mikro ekonomi: ${checks-before} kalıcı tarayıcı kontrolü (390 px aydınlık + 1280 px koyu; sekmeler, hazır ayarlar, sınırlar, klavye) PASS`);
 }finally{await browser?.close();await new Promise(r=>server.close(r));}
}
