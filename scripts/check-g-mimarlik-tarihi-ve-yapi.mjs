// Mimarlık tarihi ve yapı: çekirdeğin bağımsız denetimi.
// Başvurular sayfanın yollarını yinelemez: halka alanı ve blok ağırlık merkezi için kapalı biçimler, parabolün
// kapalı biçimli itkisi (qL²/8h), yayımlanmış en ince yarım daire kemer kalınlığı (Milankoviç; Makris ve Alexakis
// 2013: t/R = 0,1075), her derzde moment dengesi, kaba kuvvet itki çizgisi araması, kubbe zar kuvvetleri için sayısal
// halka toplamı, Vitruvius metnindeki bölenler (elle yazılmış) ve bağımsız sayımlar.
import fs from 'node:fs';
import vm from 'node:vm';
import assert from 'node:assert/strict';
const SLUG='mimarlik-tarihi-ve-yapi';
const html=fs.readFileSync(new URL(`../${SLUG}.html`,import.meta.url),'utf8');
const source=html.split('/* KERNEL-BEGIN */')[1]?.split('/* KERNEL-END */')[0];
assert(source,'Çekirdek sınırları gerekli');
const context={window:{}};vm.createContext(context);vm.runInContext(source,context);
const Y=context.window.Yapi;let checks=0;
const eq=(a,b,m)=>{const x=JSON.stringify(a),y=JSON.stringify(b);assert(x===y,(m?m+': ':'')+x+' ≠ '+y);checks++;},ok=(c,m)=>{assert(c,m);checks++;};
const near=(a,b,tol,m)=>{assert(Math.abs(a-b)<=tol*Math.max(1,Math.abs(b)),`${m}: ${a} ≉ ${b}`);checks++;};
let seed=20261113;const rnd=()=>{seed=(seed*1664525+1013904223)>>>0;return seed/4294967296;};
ok(Object.isFrozen(Y)&&Object.isFrozen(Y.ORDERS)&&Object.isFrozen(Y.EVENTS[0]),'çekirdek dondurulmuş');
const title=html.match(/<title>([^<]+)<\/title>/)[1];ok(title.startsWith('Mimarlık Tarihi ve Yapı: ')&&title.length<=80,'başlık');
ok(html.includes(`data-page="${SLUG}"`),'data-page');ok(!/[̀-ͯ]/.test(html.normalize('NFC')),'birleşik işaret yok');

/* 0. Sayı biçimi */
const NB=' ';
for(const[x,d,s]of[[0.5,2,'0,50'],[-1.25,2,'−1,25'],[9950,0,'9950'],[10000,0,'10'+NB+'000'],[1234567.891,2,'1'+NB+'234'+NB+'567,89'],[-0.00001,2,'0,00']])eq(Y.fmt(x,d),s,'fmt '+x);

/* 1. Geometri: kapalı biçimler */
for(const[L,t]of[[10,1],[8,0.3],[20,2.5]]){const R=L/2,g=Y.geometry({shape:'yarim',L,rise:0.5,t});
  near(g.area,Math.PI*R*t,1e-3,'yarım halka alanı πRt');
  for(const j of g.joints){near(Math.hypot(j.I[0],j.I[1]),R-t/2,1e-9,'iç yüz');near(Math.hypot(j.E[0],j.E[1]),R+t/2,1e-9,'dış yüz');}
  /* blok ağırlık merkezi: halka diliminin yarıçapı (2/3)(Ro³−Ri³)/(Ro²−Ri²) · sin(Δ/2)/(Δ/2) */
  const Ro=R+t/2,Ri=R-t/2,D=Math.PI/(2*g.m),rbar=(2/3)*(Ro**3-Ri**3)/(Ro**2-Ri**2)*Math.sin(D/2)/(D/2);
  for(const b of g.blocks){near(b.area,D*R*t,2e-3,'blok alanı');near(Math.hypot(b.cx,b.cy),rbar,2e-3,'blok merkezi');}
  eq(g.joints.length,2*g.m+1);}
/* sivri kemer: iki merkezli yayların yarıçapı r = (h² + L²/4)/L ve tepede eksen yüksekliği h */
for(const rise of[0.6,0.75,0.87,1]){const L=10,g=Y.geometry({shape:'sivri',L,rise,t:0.5}),h=rise*L,r=(h*h+L*L/4)/L;near(g.r,r,1e-12,'sivri r');near(g.joints[g.m].C[1],h,1e-9,'sivri tepe');
  const cx=r-L/2;for(let j=0;j<g.m;j++)near(Math.hypot(g.joints[j].C[0]-cx,g.joints[j].C[1]),r,1e-9,'sol yay');}
/* zincir eğrisi: h = a(cosh(L/2a) − 1); parabolde alan ≈ t × yay uzunluğu */
for(const[L,h]of[[10,6],[16,4.8],[30,6]]){const a=Y.catA(L,h);near(a*(Math.cosh(L/(2*a))-1),h,1e-9,'katener a');}
{const L=16,h=4.8,t=0.3,g=Y.geometry({shape:'parabol',L,rise:h/L,t});const k=4*h/L;const S=(L/2)*(Math.sqrt(1+k*k)+Math.asinh(k)/k);near(g.area,t*S,2e-3,'parabol alanı');}
ok(Y.geometry({shape:'parabol',L:10,rise:1,t:3}).error,'eğrilikten kalın halka reddedilir');

/* 2. İtki çizgisi: her derzde moment dengesi (bağımsız toplam) ve derz içinde kalma */
function verifyLine(res,ln,tag){const g=res.g,per=res.per;let S=0,Mx=0;const p0=ln.pts[0],H=ln.H,V=ln.V;
  for(let j=0;j<g.joints.length;j++){const p=ln.pts[j];
    /* soldaki serbest cismin p etrafındaki momenti: tepki (H,V) p0'da + yükler (0,−W) */
    const m=(p0[0]-p[0])*V-(p0[1]-p[1])*H-(Mx-S*p[0]);near(m/(res.Wt*g.L),0,1e-7,tag+' moment '+j);
    const jt=g.joints[j],d=[jt.E[0]-jt.I[0],jt.E[1]-jt.I[1]],v=[p[0]-jt.I[0],p[1]-jt.I[1]];near((d[0]*v[1]-d[1]*v[0])/(g.L*g.L),0,1e-9,tag+' derz doğrusu');
    if(j<g.joints.length-1)for(const l of per[j]){S+=l.W;Mx+=l.W*l.x;}}
  near(ln.V+ln.VR,res.Wt,1e-9,tag+' düşey denge');}
const cases=[];for(let r=0;r<40;r++){const shape=Y.SHAPES[Math.floor(rnd()*4)],rr=Y.riseRange(shape),L=4+rnd()*20;cases.push({shape,L,rise:rr[0]+rnd()*(rr[1]-rr[0]),t:L*(0.04+rnd()*0.12),q:rnd()<0.4?rnd()*100:0,P:rnd()<0.5?rnd()*300:0,xP:(rnd()-0.5)*L});}
let nSafe=0;
for(const o of cases){const res=Y.analyze(o);if(res.error)continue;verifyLine(res,res.mid,'orta');
  if(res.safe){nSafe++;for(const ln of[res.mid,res.minLine,res.maxLine]){verifyLine(res,ln,'güvenli');ok(ln.s.every(s=>s>=-1e-6&&s<=1+1e-6),'güvenli çizgi derzlerde');}
    ok(res.Hmin<=res.mid.H*(1+1e-9)&&res.mid.H<=res.Hmax*(1+1e-9),'H aralığı');ok(res.mid.s.every(s=>Math.abs(s-0.5)<=res.rho/2+1e-6),'ρ sınırı');}
  else ok(res.mid.s.some(s=>s<-1e-6||s>1+1e-6),'güvensizde çizgi dışarıda');}
ok(nSafe>=5&&nSafe<=35,'karışık rastgele vakalar ('+nSafe+' güvenli)');

/* 3. Parabol + düzgün yayılı yük (öz ağırlık yok): H = qL²/8h, çizgi eksende */
for(const[L,h,q]of[[10,4,50],[16,4.8,120],[24,12,30]]){const res=Y.analyze({shape:'parabol',L,rise:h/L,t:0.3,gamma:0,q});near(res.mid.H,q*L*L/(8*h),1e-4,'qL²/8h');ok(res.rho<1e-4,'parabol fünikülerdir');
  ok(res.Hmin<q*L*L/(8*h)&&q*L*L/(8*h)<res.Hmax,'kapalı biçim aralıkta');}
/* zincir eğrisi kendi ağırlığında: ince halkada bile çizgi eksene çok yakın */
for(const[L,rise]of[[10,0.6],[20,0.35]]){const res=Y.analyze({shape:'katener',L,rise,t:L*0.02});ok(res.safe&&res.rho<0.02,'katener öz ağırlık ρ = '+res.rho);}

/* 4. Yayımlanmış değer: yarım daire kemerin en ince kalınlığı t/R = 0,1075 (radyal derz) */
const mt=Y.minThickness({shape:'yarim',L:10,rise:0.5,t:1});near(mt.tmin/5,0.1075,0.003,'Milankoviç t/R');ok(Math.abs(mt.tmin/5-0.1075)<0.0005,'t/R 0,1075 ± 0,0005: '+mt.tmin/5);
ok(Y.analyze({shape:'yarim',L:10,rise:0.5,t:0.1075*5*1.02}).safe,'t_min üstü güvenli');ok(!Y.analyze({shape:'yarim',L:10,rise:0.5,t:0.1075*5*0.97}).safe,'t_min altı güvensiz');
/* t_min'de mafsal düzeni: tepe dış yüz, iki böğür iç yüz, iki üzengi dış yüz (beş mafsal) */
{const r=Y.analyze({shape:'yarim',L:10,rise:0.5,t:mt.tmin*1.0005});const hs=Y.hinges(r.minLine.s,2e-3);eq(hs.map(h=>h.side),['dis','ic','dis','ic','dis'],'beş mafsal');
  const ang=hs.filter(h=>h.side==='ic').map(h=>{const C=r.g.joints[h.j].C;return Math.atan2(Math.abs(C[0]),C[1])*180/Math.PI;});ok(ang.every(a=>a>48&&a<62),'böğür mafsalı tepeden yaklaşık 54°: '+ang);}
/* kaba kuvvet: simetrik yükte (V = W/2) üzengi noktası × H ızgarasında derz içinde kalan bir çizgi aranır */
function brute(o){const g=Y.geometry(o),per=Y.loads(g,o);let W=0;for(const a of per)for(const l of a)W+=l.W;const V=W/2,j0=g.joints[0];
  for(let i=0;i<=60;i++){const s0=i/60,P0=[j0.I[0]+s0*(j0.E[0]-j0.I[0]),j0.I[1]+s0*(j0.E[1]-j0.I[1])];
    for(let k=0;k<=400;k++){const H=W*Math.exp(Math.log(0.02)+k/400*Math.log(5/0.02));const M0=P0[0]*V-P0[1]*H;let S=0,Q=0,good=true;
      for(let j=0;j<g.joints.length&&good;j++){const jt=g.joints[j],I=jt.I,d=[jt.E[0]-I[0],jt.E[1]-I[1]],Fy=V-S,Mj=M0-Q;const s=(Mj-(I[0]*Fy-I[1]*H))/(d[0]*Fy-d[1]*H);if(!(s>=-1e-9&&s<=1+1e-9))good=false;if(j<g.joints.length-1)for(const l of per[j]){S+=l.W;Q+=l.W*l.x;}}
      if(good)return{H,s0};}}return null;}
ok(brute({shape:'yarim',L:10,rise:0.5,t:0.1075*5*1.15}),'kaba kuvvet: kalın kemerde çizgi bulunur');ok(!brute({shape:'yarim',L:10,rise:0.5,t:0.1075*5*0.9}),'kaba kuvvet: ince kemerde çizgi yok');
ok(brute({shape:'sivri',L:10,rise:0.87,t:1,P:150,xP:0}),'kaba kuvvet: sivri kemer tepe yükünü taşır');ok(!brute({shape:'yarim',L:10,rise:0.5,t:1,P:150,xP:0}),'kaba kuvvet: yarım daire taşıyamaz');
eq([Y.analyze({shape:'sivri',L:10,rise:0.87,t:1,P:150,xP:0}).safe,Y.analyze({shape:'yarim',L:10,rise:0.5,t:1,P:150,xP:0}).safe],[true,false],'çekirdek kaba kuvvetle aynı');
/* sayfadaki varsayılan ve hazır değerler */
{const r=Y.analyze({shape:'yarim',L:10,rise:0.5,t:1});near(r.Wt,20*Math.PI*5*1,1e-3,'öz ağırlık γπRt');eq([Y.fmt(r.Hmin,1),Y.fmt(r.Hmax,1),Y.fmt(r.Wt,1),Math.round(100*r.rho)],['48,4','80,0','314,2',54]);ok(!r.middleThird);}
eq(Y.analyze({shape:'yarim',L:10,rise:0.5,t:0.4}).safe,false,'ince yarım daire');eq(Y.analyze({shape:'yarim',L:10,rise:0.5,t:1,P:150,xP:2.5}).safe,false,'çeyrek açıklık yükü');
ok(Y.analyze({shape:'katener',L:10,rise:0.6,t:0.2}).middleThird,'ince katener orta üçte bir');

/* 5. Kubbe zar kuvvetleri: halka ağırlıklarının sayısal toplamı ve normal denge */
function domeRef(phi,phi0,lam){const n=20000;let W=0;for(let i=0;i<n;i++){const p=phi0+(phi-phi0)*(i+0.5)/n;W+=2*Math.PI*Math.sin(p)*(phi-phi0)/n;}W+=2*Math.PI*Math.sin(phi0)*lam;const Np=-W/(2*Math.PI*Math.sin(phi)**2);return{Np,Nt:-Math.cos(phi)-Np};}
for(const[phi0d,lam]of[[0,0],[12,0],[10,0.5],[25,1.2]])for(const pd of[20,40,51.8,60,75,90]){if(pd<=phi0d+1)continue;const p=pd*Math.PI/180,p0=phi0d*Math.PI/180,f=Y.domeForces(p,p0,lam),r=domeRef(p,p0,lam);near(f.Nphi,r.Np,1e-6,'Nφ');near(f.Nth,r.Nt,1e-6,'Nθ');}
near(Y.domeTransition(0,0,Math.PI/2)[0].phi,Math.acos((Math.sqrt(5)-1)/2),1e-9,'51,83°');near(Y.domeTransition(0,0,Math.PI/2)[0].phi*180/Math.PI,51.827,1e-4,'derece');
{const s=Y.domeSummary({phi0:0,phiEnd:Math.PI/2});near(s.maxT,1,1e-9,'tabanda çember çekmesi qa');near(s.Hb,0,1e-9,'yarım kürede yatay itki yok');near(s.Wtot,2*Math.PI,1e-9,'ağırlık 2πa²q');}
{const e=Math.PI/3,s=Y.domeSummary({phi0:0,phiEnd:e});eq(s.transitions.length,1);near(s.Hb,Math.cos(e)/(1+Math.cos(e)),1e-9,'basık kubbe itkisi');near(s.ring,Math.cos(e)/(1+Math.cos(e))*Math.sin(e),1e-9,'çekme halkası');}
eq(Y.domeSummary({phi0:0,phiEnd:50*Math.PI/180}).transitions.length,0,'50° kubbe her yerde basınç');
{const s=Y.domeSummary({phi0:10*Math.PI/180,phiEnd:Math.PI/2,lanternFrac:0.1});eq(s.transitions.map(t=>t.from),['cekme','basinc'],'fenerli kubbede tepe çekmesi');ok(s.top.Nth>0,'göz halkasında çekme');}
ok(Y.domeSummary({phi0:0,phiEnd:Math.PI/2,lanternFrac:0.1}).error,'göz olmadan fener yok');

/* 6. Vitruvius: bölenler metinden (III.3.7; IV.3.3, IV.3.7) ve parçaların bağımsız toplamı */
const DIV={eustyle:{4:11.5,6:18,8:24.5},diastyle:{4:27,6:42},systyle:{4:19.5,6:29.5}};
const mine=(ord,n)=>ord==='eustyle'?n*1+(n-2)*2.25+3:2*1+(n-2)*(ord==='diastyle'?3:2)*(1+1.5)+(ord==='diastyle'?4:3)*(1+1.5);
for(const[ord,ds]of Object.entries(DIV))for(const[n,d]of Object.entries(ds)){const f=Y.facade(ord,+n,20);eq(f.divisor,d,ord+n);near(f.sum,mine(ord,+n),1e-12,ord+n+' toplam');ok(f.consistent);near(f.module,20/d,1e-12,'modül');}
eq(Y.facade('diastyle',8,20),null,'Dor oktastylos verilmemiş');eq([Y.ORDERS.eustyle.colH,Y.ORDERS.diastyle.colD,Y.ORDERS.diastyle.colH,Y.TRIGLYPH,Y.METOPE],[9.5,2,14,1,1.5]);

/* 7. Oran avı, sıralama puanı, veri tabloları */
for(let r=0;r<200;r++){const n=3+Math.floor(rnd()*10),Ls=Array.from({length:n},()=>({v:0.5+rnd()*20})),T=[Y.PHI,1.5,Math.SQRT2][r%3],tol=0.005+rnd()*0.05;
  let hits=0,pairs=0;for(let i=0;i<n;i++)for(let j=i+1;j<n;j++){const a=Math.max(Ls[i].v,Ls[j].v),b=Math.min(Ls[i].v,Ls[j].v);if(a===b)continue;pairs++;if(Math.abs(a/b-T)<=tol*T)hits++;}
  const h=Y.ratioHunt(Ls,T,tol);eq([h.hits.length,h.pairs],[hits,pairs]);}
for(let r=0;r<200;r++){const k=['a','b','c','d','e','f'],yr={};k.forEach((x,i)=>yr[x]=i*10+rnd());const ord=k.slice().sort(()=>rnd()-0.5);let okc=0;for(let i=0;i<6;i++)for(let j=i+1;j<6;j++)if(yr[ord[i]]<yr[ord[j]])okc++;eq(Y.orderScore(ord,yr),{ok:okc,tot:15});}
ok(Y.EVENTS.every((e,i,a)=>i===0||a[i-1].y<=e.y),'olaylar kronolojik');eq(new Set(Y.EVENTS.map(e=>e.k)).size,Y.EVENTS.length);
const EV=Object.fromEntries(Y.EVENTS.map(e=>[e.k,e.d]));eq([EV.ayasofya,EV.ayasofya558,EV.floransa,EV.suleymaniye,EV.selimiye,EV.hooke,EV.heyman,EV.modulor],['532–537','558','1420–1436','1550–1557','1568/69–1574/75','1675','1966','1948']);
const DM=Object.fromEntries(Y.DOMES.map(d=>[d.k,[d.cap,d.yuk]]));eq(DM,{pantheon:[43.3,43.3],ayasofya:[32.6,55.6],floransa:[44,114.5],sehzade:[19,37],suleymaniye:[26.5,53],selimiye:[31.28,42]});
eq(Y.periodsAt(1190).in,['yuksek']);eq(Y.periodsAt(1190).near,['erken','yuksek']);eq(Y.periodsAt(1100).in,[]);eq(Y.periodsAt(1300).in,['rayonnant']);
{const a=Y.mulberry32(5),b=Y.mulberry32(5);for(let i=0;i<10;i++)eq(a(),b());}

console.log(`G mimarlik-tarihi-ve-yapi: ${checks.toLocaleString('tr-TR')} bağımsız geometri, denge, kubbe, oran ve veri kontrolü PASS`);

if(process.argv.includes('--browser')){
  const {chromium}=await import('playwright');const {createServer}=await import('node:http');const {join,extname}=await import('node:path');const {fileURLToPath}=await import('node:url');const root=fileURLToPath(new URL('../',import.meta.url));
  const server=createServer((req,res)=>{const file=join(root,decodeURIComponent(new URL(req.url,'http://localhost').pathname));if(!fs.existsSync(file)||fs.statSync(file).isDirectory()){res.writeHead(404).end();return;}res.setHeader('Content-Type',({'.html':'text/html; charset=utf-8','.js':'text/javascript; charset=utf-8','.css':'text/css; charset=utf-8'})[extname(file)]||'application/octet-stream');res.end(fs.readFileSync(file));});await new Promise(r=>server.listen(0,'127.0.0.1',r));let browser;
  try{browser=await chromium.launch();const before=checks;
  for(const[width,theme]of[[390,'light'],[1280,'dark']]){
    const page=await browser.newPage({viewport:{width,height:900},deviceScaleFactor:width===390?2:1,hasTouch:width===390});await page.addInitScript(t=>{localStorage.setItem('acelya-theme',t);localStorage.setItem('acelya-sound-muted','1');},theme);page.setDefaultTimeout(8000);
    const errors=[];page.on('pageerror',e=>errors.push(e.message));page.on('console',m=>{if(m.type()==='error')errors.push(m.text());});page.on('response',r=>{if(r.status()>=400)errors.push(r.status()+' '+r.url());});
    await page.goto(`http://127.0.0.1:${server.address().port}/${SLUG}.html`);
    const click=id=>page.locator('#'+id).click(),read=id=>page.locator('#'+id).textContent(),has=async(id,text)=>{const t=await read(id);assert(t.includes(text),`${id}: “${t}” içinde “${text}” yok (${width})`);checks++;},
      range=(id,v)=>page.locator('#'+id).evaluate((e,v)=>{e.value=v;e.dispatchEvent(new Event('input',{bubbles:true}));},v),sel=(id,v)=>page.locator('#'+id).selectOption(v),
      noflow=async tag=>{eq(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),true,'yatay taşma: '+tag+' '+width);},
      waitHas=async(id,text)=>{await page.waitForFunction(([i,t])=>document.getElementById(i).textContent.includes(t),[id,text],{timeout:8000});checks++;};
    eq(await page.evaluate(()=>document.title.length<=80),true);eq(await page.locator('[role=tab]').count(),5);
    /* 1. sekme */
    await has('arSafe','Evet');await has('arRho','%54');await has('arMiddle','Sağlanamıyor');await has('arH','48,4 – 80,0 kN');await has('arW','314,2 kN');await has('arSel','V sol 157,1, sağ 157,1');
    await waitHas('arTmin','t/R 0,1075');await has('arTmin','katsayı 1,86');await has('arStatus','orta üçte birden çıkıyor');await has('arHinges','yok');
    await sel('arLine','min');await has('arHinges','3:');await has('arHinges','tepe (dış yüz)');await has('arSel','H 48,4');await sel('arLine','max');await has('arSel','H 80,0');await sel('arLine','mid');
    await click('arPresetInce');await has('arSafe','Hayır');await has('arH','güvenli çizgi yok');await has('arStatus','mekanizmaya');await has('arRho','(halkanın dışında)');
    await click('arPresetZincir');await has('arMiddle','Sağlanabiliyor');await has('arStatus','kendi yükünün zinciridir');await waitHas('arTmin','≈ 0');
    await click('arPresetKopru');await has('arStatus','paraboldür');await has('arQOut','120 kN/m');
    await click('arPresetCeyrek');await has('arSafe','Hayır');await has('arStatus','Çeyrek açıklıktaki');await has('arXPOut','çeyrek açıklık');await range('arT','1.1');await has('arSafe','Evet');
    await click('arPresetGotik');await has('arSafe','Evet');await sel('arShape','yarim');await has('arSafe','Hayır');eq(await page.locator('#arRise').isDisabled(),true,'yarım dairede yükseklik sabit');
    await sel('arView','zincir');ok(await page.evaluate(()=>document.getElementById('arCanvas').width>0));await sel('arView','kemer');
    await sel('arShape','parabol');await range('arT','3');await range('arRise','1');await has('arStatus','eğrilik');
    await click('kemerReset');await has('arH','48,4 – 80,0 kN');eq(await page.locator('#arXP').isDisabled(),true,'P sıfırken konum kapalı');
    /* yük okunu sürükle */
    await click('arPresetCeyrek');await page.locator('#arCanvas').scrollIntoViewIfNeeded();{const box=await page.locator('#arCanvas').boundingBox();let found=null;
      for(let fy=0.04;fy<0.7&&!found;fy+=0.02)for(let fx=0.5;fx<0.95&&!found;fx+=0.02){const x=box.x+box.width*fx,y=box.y+box.height*fy;await page.mouse.move(x,y);if(await page.evaluate(()=>document.getElementById('arCanvas').style.cursor==='grab'))found=[x,y];}
      ok(found,'yük tutamağı bulundu');await page.mouse.down();await page.mouse.move(found[0]-box.width*0.4,found[1],{steps:6});await page.mouse.up();ok(+(await page.locator('#arXP').inputValue())<0,'sürükleme P konumunu değiştirir');}
    await click('kemerReset');await noflow('kemer');
    /* 2. sekme */
    await click('tab-kubbe');await has('dmTrans','51,8° (basınçtan çekmeye)');await has('dmMaxT','1,000 · 90,0°');await has('dmHb','0,000');await has('dmRing','gerekmez');await has('dmW','6,283');await has('dmEx','400 kN/m');
    await click('dmPresetBasik');await has('dmTrans','yok');await has('dmStatus','her yerde çember basıncında');await click('dmPresetGoz');await has('dmOcOut','12°');
    await click('dmPresetFener');await has('dmTrans','çekmeden basınca');await has('dmStatus','Fenerin ağırlığı');
    await click('kubbeReset');await range('dmOc','10');await range('dmLan','0.1');await range('dmEnd','60');await has('dmHb','0,3');await range('dmOc','0');await has('dmHb','0,333');await range('dmOc','10');await has('dmRing','0,');eq(await page.locator('#dmLan').isDisabled(),false);await range('dmOc','0');eq(await page.locator('#dmLan').isDisabled(),true);
    await click('kubbeReset');await has('dmTrans','51,8°');await noflow('kubbe');
    /* 3. sekme */
    await click('tab-zaman');await has('tlCount','20 olay');eq(await page.locator('#tlList li').count(),20);await has('tlList','Neyin çöktüğünü kaynaklar farklı aktarır');await has('tlList','doğu yarım kubbesi');eq(await page.evaluate(()=>Yapi.EVENTS.find(e=>e.k==='ayasofya562').x.includes('24 Aralık 562')),true);
    await click('tlF-kuram');eq(await page.locator('#tlList li').count(),4);await page.locator('#tlList button[data-k="hooke"]').click();await has('tlList','1705');await click('tlF-hepsi');
    await has('qzStatus','Denetle');await click('qzCheck');await has('qzStatus','/ 15');
    /* doğru sıraya getir: kabarcık sıralaması düğmelerle */
    const target=['Pantheon, Roma','Ayasofya, İstanbul','Saint-Denis','Floransa','Süleymaniye','Hooke'];
    for(let it=0;it<20;it++){const names=await page.evaluate(()=>[...document.querySelectorAll('#qzList li span:nth-child(2)')].map(s=>s.textContent));const idx=names.map(n=>target.findIndex(t=>n.includes(t)));const i=idx.findIndex((v,k)=>k<idx.length-1&&v>idx[k+1]);if(i<0)break;await page.locator(`#qzList button[data-i="${i}"][data-d="1"]`).click();}
    await click('qzCheck');await has('qzStatus','15 / 15');await has('qzStatus','Tam sıra');
    await has('cmpStatus','Selimiye');await sel('cmpMetric','yuk');await has('cmpStatus','fener dahil');await page.locator('#cmpInner').check();eq(await page.locator('#cmpSvg rect').count(),2,'yalnız iç yükseklik');
    await sel('cmpMetric','oran');await has('cmpStatus','2,00');await has('cmpStatus','2,04');await click('zamanReset');await noflow('zaman');
    /* 4. sekme */
    await click('tab-oran');await has('vtStatus','20,0 m ÷ 11,5 = 1,739 m');await has('vtStatus','tam tutuyor');await has('vtRows','11,50');
    await sel('vtOrder','diastyle');eq(await page.locator('#vtCount option[value="8"]').isDisabled(),true);await has('vtStatus','÷ 27,0');await has('vtStatus','3 triglif');
    await sel('vtCount','6');await has('vtStatus','÷ 42,0');await sel('vtOrder','systyle');await has('vtStatus','÷ 29,5');await range('vtWidth','29.5');await has('vtStatus','= 1,000 m');
    await sel('vtOrder','eustyle');await sel('vtCount','8');await has('vtStatus','24,5');
    await has('phPairs','8 ölçü · 28 oran');await sel('phSource','rastgele');await range('phN','16');await has('phPairs','16 ölçü · 119 oran (1 çiftte iki uzunluk eşit');await range('phN','12');await has('phPairs','12 ölçü · ');const c1=await read('phChance');await click('phNew');await has('phPairs','12 ölçü');void c1;
    await sel('phTarget','r15');await has('phStatus',"1,5'e");await has('phStatus','1,5 gibi bir oran bulunması');await sel('phTarget','r17');await has('phStatus',"1,7'ye");await sel('phTarget','phi');await has('phStatus',"φ'ye");await has('phStatus','altın oran bulunması');await sel('phTarget','r15');await range('phTol','5');await has('phTolOut','± %5,0');await has('mdCheck','1,828');
    await click('oranReset');await has('vtStatus','11,5');await has('phPairs','8 ölçü');await noflow('oran');
    /* 5. sekme */
    await click('tab-okuma');await has('okStatus','iki yarım kubbe');await has('okSecCap','boyuna');await click('okEl-yarim');eq(await page.locator('#okEl-yarim').getAttribute('aria-pressed'),'true');await has('okStatus','enine kesitte görünmezler');
    await sel('okCut','enine');await has('okStatus','perde duvarlar');await sel('okScheme','sekiz');eq(await page.locator('#okEl-yarim').count(),0);await has('okStatus','Selimiye');
    await click('okQ0-plan');await has('okQres0','Doğru');await click('okQ1-gorunus');await has('okQres1','Değil');await click('okQ4-duvar');await has('okScore','Yanıtlanan 3 / 5 · doğru 2');
    await range('pdYear','1190');await has('pdStatus','Yüksek Gotik');await has('pdStatus','sınıra');await range('pdYear','1120');await has('pdStatus','Romanesk');await range('pdYear','1300');await has('pdStatus','Rayonnant');
    await click('okumaReset');await has('okScore','0 / 5');await noflow('okuma');
    /* sekme klavyesi, R tuşu, etiketler, çekirdek */
    await page.locator('#tab-okuma').focus();await page.keyboard.press('Home');eq(await page.locator('#tab-kemer').getAttribute('aria-selected'),'true');await page.keyboard.press('ArrowLeft');eq(await page.locator('#tab-okuma').getAttribute('aria-selected'),'true');await page.keyboard.press('ArrowRight');eq(await page.locator('#tab-kemer').getAttribute('aria-selected'),'true');await page.keyboard.press('End');eq(await page.locator('#tab-okuma').getAttribute('aria-selected'),'true');
    await click('tab-kemer');await click('arPresetInce');await page.locator('h1').click();await page.keyboard.press('r');await has('arSafe','Evet');
    eq(await page.evaluate(()=>[...document.querySelectorAll('main input,main select')].filter(e=>!(e.labels&&e.labels.length)&&!e.getAttribute('aria-label')).map(e=>e.id)),[]);
    eq(await page.evaluate(()=>[...document.querySelectorAll('main canvas, main svg[id]')].filter(c=>c.getAttribute('role')!=='img').map(c=>c.id)),[]);
    eq(await page.evaluate(()=>Object.isFrozen(Yapi)&&!Object.getOwnPropertyDescriptor(window,'Yapi').writable),true);
    eq(await page.evaluate(()=>/[̀-ͯ⃗]/.test(document.body.textContent.normalize('NFC'))),false,'birleşik işaret');
    for(const t of['kemer','kubbe','zaman','oran','okuma']){await click('tab-'+t);eq(await page.evaluate(()=>/\d\.\d/.test([...document.querySelectorAll('.mt-stat strong,.mt-status,output,.mt-table td,.mt-hits,.mt-tl b')].map(e=>e.textContent).join(' '))),false,'ondalık nokta '+t);await noflow('sekme '+t);}
    /* Keşif Defteri yüklü ve görünür; mafsal kartı güvensiz hazırda sayım istemez */
    await page.waitForFunction(()=>{const d=document.querySelector('.digest');return d&&d.offsetHeight>200&&d.textContent.includes('Taşı Ayakta Tutan Biçim');},null,{timeout:8000});checks++;
    eq(await page.evaluate(()=>document.body.textContent.includes("Kalınlığı 0,54 m'ye çıkar, sonra en küçük ve en büyük itki çizgilerinin")),true,'mafsal kartı');
    assert.deepEqual(errors,[]);checks++;await page.close();
  }
  console.log(`G mimarlik-tarihi-ve-yapi: ${checks-before} tarayıcı kontrolü (390 açık / 1280 koyu; beş sekme, hazırlar, sürükleme, sınırlar, klavye) PASS`);
  }finally{await browser?.close();await new Promise(r=>server.close(r));}
}
