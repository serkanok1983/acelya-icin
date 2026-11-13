// Takvimler ve Zaman Ölçümü: çekirdeğin bağımsız denetimi.
// Başvurular sayfanın formüllerini yinelemez: USNO Julian Date Converter yanıtları, kaynaklardaki haftanın günleri ve
// Paskalya tarihleri, gün gün sayan ayrı takvim yürüyücüleri (Jülyen, Gregoryen, Hicrî tablo, Rumî), kaba kuvvet
// artık gün sayımı ve kapalı biçimler.
import fs from 'node:fs';
import vm from 'node:vm';
import assert from 'node:assert/strict';
const SLUG='takvimler-ve-zaman-olcumu';
const html=fs.readFileSync(new URL(`../${SLUG}.html`,import.meta.url),'utf8');
const source=html.split('/* KERNEL-BEGIN */')[1]?.split('/* KERNEL-END */')[0];
assert(source,'Çekirdek sınırları gerekli');
const context={window:{}};vm.createContext(context);vm.runInContext(source,context);
const K=context.window.Takvim;let checks=0;
const eq=(a,b,m)=>{const x=JSON.stringify(a),y=JSON.stringify(b);assert(x===y,(m?m+': ':'')+x+' ≠ '+y);checks++;},ok=(c,m)=>{assert(c,m);checks++;};
const near=(a,b,tol,m)=>{assert(Math.abs(a-b)<=tol,`${m}: ${a} ≉ ${b}`);checks++;};
let seed=20261113;const rnd=()=>{seed=(seed*1664525+1013904223)>>>0;return seed/4294967296;},ri=n=>Math.floor(rnd()*n);
ok(Object.isFrozen(K)&&Object.isFrozen(K.ASTRO)&&Object.isFrozen(K.HIJRI_VARIANTS.std.leap),'çekirdek dondurulmuş');
const NB=' ';

/* 0. Sayı biçimi */
for(const[x,d,s]of[[0.5,4,'0,5000'],[-1.25,2,'−1,25'],[9950,0,'9950'],[10000,0,'10'+NB+'000'],[2424511,0,'2'+NB+'424'+NB+'511'],[86164.0905,4,'86'+NB+'164,0905'],[-0.00001,2,'0,00']])eq(K.fmt(x,d),s,'fmt '+x);
eq(K.fmtSigned(13,0),'+13');eq(K.fmtSigned(0,0),'0');eq(K.fmtSigned(-2.5,1),'−2,5');

/* 1. USNO Julian Date Converter (12:00 UT; 4 Ekim 1582 ve öncesi Jülyen) */
const USNO=[['jul',-4712,1,1,0],['jul',622,7,16,1948440],['jul',1582,10,4,2299160],['greg',1582,10,15,2299161],['greg',1752,9,14,2361222],['greg',1840,3,13,2393178],['greg',1917,3,1,2421289],['greg',1926,1,1,2424517],['greg',2000,1,1,2451545]];
for(const[c,y,m,d,j]of USNO){eq(c==='greg'?K.gregToJdn(y,m,d):K.julToJdn(y,m,d),j,`USNO ${c} ${y}-${m}-${d}`);eq(c==='greg'?K.jdnToGreg(j):K.jdnToJul(j),{y,m,d},'ters '+j);}
/* JGN 0 = proleptik Gregoryen 24 Kasım MÖ 4714 (Wikipedia: Julian day) */
eq(K.jdnToGreg(0),{y:-4713,m:11,d:24});

/* 2. Haftanın günleri: kaynaklardaki geçişler (0 = Pazar) */
const W=['Pazar','Pazartesi','Salı','Çarşamba','Perşembe','Cuma','Cumartesi'];eq(K.WEEKDAYS,W);
for(const[j,w,m]of[[0,'Pazartesi','JGN 0'],[K.julToJdn(1582,10,4),'Perşembe','4 Ekim 1582'],[K.gregToJdn(1582,10,15),'Cuma','15 Ekim 1582'],[K.julToJdn(622,7,16),'Cuma','16 Temmuz 622'],
  [K.julToJdn(1582,12,9),'Pazar','Fransa son'],[K.gregToJdn(1582,12,20),'Pazartesi','Fransa ilk'],[K.julToJdn(1752,9,2),'Çarşamba','Britanya son'],[K.gregToJdn(1752,9,14),'Perşembe','Britanya ilk'],
  [K.julToJdn(1753,2,17),'Çarşamba','İsveç son'],[K.gregToJdn(1753,3,1),'Perşembe','İsveç ilk'],[K.julToJdn(1918,1,31),'Çarşamba','Rusya son'],[K.gregToJdn(1918,2,14),'Perşembe','Rusya ilk'],
  [K.julToJdn(1923,2,15),'Çarşamba','Yunanistan son'],[K.gregToJdn(1923,3,1),'Perşembe','Yunanistan ilk'],[K.RUMI.start,'Cuma','1 Mart 1256 Cuma (Vikipedi)']])eq(W[K.dow(j)],w,m);
/* geçişlerde art arda günler ve atlanan tarih sayısı */
for(const[a,b,n]of[[[1582,10,4],[1582,10,15],10],[[1582,12,9],[1582,12,20],10],[[1752,9,2],[1752,9,14],11],[[1753,2,17],[1753,3,1],11],[[1918,1,31],[1918,2,14],13],[[1923,2,15],[1923,3,1],13]]){const x=K.julToJdn(...a),y=K.gregToJdn(...b);eq(y,x+1,'art arda '+a);eq(K.julGregDiff(y),n,'atlanan '+a);}
/* haftanın günü bağımsız: 1 Ocak 2000 Cumartesi, her gün bir ilerler */
for(let r=0;r<2000;r++){const j=ri(5373484);eq(K.dow(j),((j-2451545)%7+7+6)%7);}

/* 3. Bağımsız yürüyücüler: JGN 0'dan 5 373 484'e gün gün */
{const jl=y=>((y%4)+4)%4===0,gl=y=>(((y%4)+4)%4===0&&((y%100)+100)%100!==0)||((y%400)+400)%400===0;
 const ml=(leap,y,m)=>[31,leap(y)?29:28,31,30,31,30,31,31,30,31,30,31][m-1];
 let J={y:-4712,m:1,d:1},G={y:-4713,m:11,d:24},bad=0,n=0;
 const inc=(o,leap)=>{o.d++;if(o.d>ml(leap,o.y,o.m)){o.d=1;o.m++;if(o.m>12){o.m=1;o.y++;}}};
 for(let j=0;j<=5373484;j++){
   if(j%97===0||(j>2299150&&j<2299170)){const a=K.jdnToJul(j),b=K.jdnToGreg(j);if(a.y!==J.y||a.m!==J.m||a.d!==J.d||b.y!==G.y||b.m!==G.m||b.d!==G.d)bad++;if(K.julToJdn(J.y,J.m,J.d)!==j||K.gregToJdn(G.y,G.m,G.d)!==j)bad++;n+=4;}
   inc(J,jl);inc(G,gl);}
 eq(bad,0,'Jülyen ve Gregoryen yürüyücüleri');checks+=n;}
/* geçerlilik: ay uzunlukları */
eq([K.valid('greg',1900,2,29),K.valid('jul',1900,2,29),K.valid('greg',2000,2,29),K.valid('greg',2023,4,31),K.valid('jul',-4712,2,29)],[false,true,true,false,true]);

/* 4. Jülyen–Gregoryen farkı: kapalı biçim fark = ⌊Y/100⌋ − ⌊Y/400⌋ − 2 (Y: Ocak–Şubat'ta bir önceki yıl) */
const fd=(a,b)=>Math.floor(a/b);
for(let r=0;r<20000;r++){const j=ri(5373484),g=K.jdnToGreg(j),Y=g.m<=2?g.y-1:g.y;eq(K.julGregDiff(j),fd(Y,100)-fd(Y,400)-2);}
eq(K.julGregDiff(K.gregToJdn(2026,11,13)),13);eq(K.julGregDiff(K.gregToJdn(2100,2,28)),13);eq(K.julGregDiff(K.gregToJdn(2100,3,1)),14,'2100 (Wikipedia)');eq(K.julGregDiff(K.gregToJdn(250,6,1)),0);
/* Jülyen 25 Aralık = Gregoryen 7 Ocak, 1901–2099 (Wikipedia: Julian calendar) */
for(let y=1901;y<=2098;y++){const g=K.jdnToGreg(K.julToJdn(y,12,25));eq([g.y,g.m,g.d],[y+1,1,7]);}
/* farkın geçerli aralığı */
for(let r=0;r<500;r++){const j=500000+ri(4500000),s=K.diffSpan(j);ok(s.from<=j&&j<=s.to,'aralık');eq(K.julGregDiff(s.from),s.d);eq(K.julGregDiff(s.to),s.d);ok(K.julGregDiff(s.from-1)!==s.d&&K.julGregDiff(s.to+1)!==s.d,'aralık sınırı');}
eq([K.jdnToGreg(K.diffSpan(K.gregToJdn(2026,3,1)).from),K.jdnToGreg(K.diffSpan(K.gregToJdn(2026,3,1)).to)],[{y:1900,m:3,d:1},{y:2100,m:2,d:28}]);

/* 5. Hicrî tablo takvim: ayrı yürüyücü (açık artık yıl listeleri, ay uzunlukları), 1–3000 yılları */
const LEAPS={std:[2,5,7,10,13,16,18,21,24,26,29],v15:[2,5,7,10,13,15,18,21,24,26,29],tayyibi:[2,5,8,10,13,16,19,21,24,27,29]};
for(const v of Object.keys(LEAPS)){eq([...K.HIJRI_VARIANTS[v].leap],LEAPS[v],'dizi '+v);
  let j=1948440,bad=0,n=0;for(let y=1;y<=3000;y++){const leap=LEAPS[v].includes(((y-1)%30)+1);eq(K.hLeap(y,v),leap);
    for(let m=1;m<=12;m++){const L=m%2?30:(m===12&&leap?30:29);if(K.hMonthLen(y,m,v)!==L)bad++;
      for(let d=1;d<=L;d++,j++){if(d===1||d===L||((j*7)%53===0)){const o=K.jdnToHijri(j,v);if(!o||o.y!==y||o.m!==m||o.d!==d||K.hijriToJdn(y,m,d,v)!==j)bad++;n+=2;}}}}
  eq(bad,0,'Hicrî yürüyücü '+v);checks+=n;
  eq(K.hijriToJdn(31,1,1,v)-K.hijriToJdn(1,1,1,v),10631,'30 yıl = 10 631 gün');}
eq(K.HEPOCH,1948440);eq(K.jdnToHijri(1948439,'std'),null);eq(K.hValid(1446,12,30,'std'),K.hLeap(1446,'std'));
/* 698 sayılı Kanun: belgede 9 Cemaziyelahir 1344; tablo bir gün sonrasını verir (gözleme dayalı tarihle fark) */
eq(K.jdnToHijri(K.gregToJdn(1925,12,26),'std'),{y:1344,m:6,d:10});
/* 1 Mart 1256 Rumî günü Hicrî yıl da 1256 (Wikipedia: Rumi calendar) */
eq(K.jdnToHijri(K.RUMI.start,'std').y,1256);
near(10631/360,29.53056,5e-6,'Tabular Islamic calendar: ortalama ay 29,53056');

/* 6. Rumî takvim: ayrı yürüyücü 1 Mart 1256'dan 31 Kânunuevvel 1341'e */
{const jl=y=>y%4===0,gl=y=>(y%4===0&&y%100!==0)||y%400===0;let st={y:1256,m:3,d:1,cy:1840,base:'jul'},bad=0,n=0;
 for(let j=2393178;j<=2424516;j++){const r=K.jdnToRumi(j);if(!r||r.y!==st.y||r.m!==st.m||r.d!==st.d)bad++;const b=K.rumiToJdn(st.y,st.m,st.d);if(!b.ok||b.j!==j)bad++;n+=2;
   /* sonraki gün */
   if(j+1===2421289){st={y:1333,m:3,d:1,cy:1917,base:'greg'};continue;}
   const L=[31,(st.base==='jul'?jl:gl)(st.cy)?29:28,31,30,31,30,31,31,30,31,30,31][st.m-1];st.d++;
   if(st.d>L){st.d=1;st.m++;if(st.m>12){st.m=1;st.cy++;if(st.base==='greg')st.y++;}if(st.m===3&&st.base==='jul')st.y++;}}
 eq(bad,0,'Rumî yürüyücü');checks+=n;eq(st,{y:1342,m:1,d:1,cy:1926,base:'greg'},'yürüyücü sonu');}
eq(K.jdnToRumi(2393177),null);eq(K.jdnToRumi(2424517),null,'1 Ocak 1926 (698 sayılı Kanun)');
eq(K.rumiToJdn(1341,12,31).j+1,K.gregToJdn(1926,1,1),'31 Kânunuevvel 1341 → 1 Ocak 1926');
eq(K.rumiToJdn(1332,2,15).j+1,K.rumiToJdn(1333,3,1).j,'15 Şubat 1332 → 1 Mart 1333');eq(K.julGregDiff(K.rumiToJdn(1333,3,1).j),13,'13 gün');
for(let d=16;d<=28;d++)ok(!K.rumiToJdn(1332,2,d).ok&&/hiç yaşanmadı/.test(K.rumiToJdn(1332,2,d).why),'atlanan '+d);
ok(!K.rumiToJdn(1333,1,5).ok&&!K.rumiToJdn(1255,12,1).ok&&!K.rumiToJdn(1342,1,1).ok&&K.rumiToJdn(1256,2,10).ok,'Rumî sınırlar');eq(K.jdnToJul(K.rumiToJdn(1256,2,10).j),{y:1841,m:2,d:10},'Şubat 1256 = Şubat 1841');
eq(K.jdnToGreg(K.rumiToJdn(1334,1,1).j),{y:1918,m:1,d:1});eq(K.jdnToGreg(K.rumiToJdn(1256,3,1).j),{y:1840,m:3,d:13});

/* 7. Paskalya: kaynaktaki örnekler (Wikipedia: Date of Easter) ve kaba kuvvet özellikleri */
for(const[y,m,d]of[[1961,4,2],[2026,4,5],[2027,3,28]]){const e=K.easterGreg(y);eq([e.m,e.d],[m,d],'Batı '+y);}
for(const[y,m,d]of[[2008,4,27],[2009,4,19],[2010,4,4],[2011,4,24],[2016,5,1],[2026,4,12],[2027,5,2]]){const e=K.easterJul(y),g=K.jdnToGreg(K.julToJdn(y,e.m,e.d));eq([g.m,g.d],[m,d],'Ortodoks '+y);}
for(let y=1583;y<=9999;y++){const e=K.easterGreg(y),j=K.gregToJdn(y,e.m,e.d);ok(K.dow(j)===0,'Pazar '+y);ok((e.m===3&&e.d>=22)||(e.m===4&&e.d<=25),'aralık '+y);
  const u=K.easterJul(y);ok(K.dow(K.julToJdn(y,u.m,u.d))===0,'Jülyen Pazar '+y);ok((u.m===3&&u.d>=22)||(u.m===4&&u.d<=25),'Jülyen aralık '+y);}
{let c22=0;for(let y=1900;y<=2199;y++){const e=K.easterGreg(y);if(e.m===3&&e.d===22)c22++;}eq(c22,0,'1900–2199 arasında 22 Mart yok');}
/* Gregoryen Paskalya tarihleri 5 700 000 yılda yinelenir: 5 700 000 yıl ötede aynı tarih (örnekleme) */
for(let r=0;r<200;r++){const y=1583+ri(8000);const a=K.easterGreg(y),b=K.easterGreg(y+5700000);eq([a.m,a.d],[b.m,b.d],'döngü '+y);}

/* 8. Gökbilimsel sabitler ve yaklaşıklıklar */
const A=K.ASTRO;eq([A.tropical,A.synodic,A.siderealMonth,A.siderealDay,A.equinoxYear2000,A.tropicalSolar],[365.2421897,29.530588861,27.321661554,86164.0905,365.242374,365.24217]);
near(86400*A.tropicalSolar/(A.tropicalSolar+1),86164.0905,0.001,'yıldız günü sağlaması');
{const L=K.lunisolar(19,235);near(L.hours,2+4/60+58/3600,0.001,'Metonik: 2 sa 4 dk 58 s');near(235*29.53059-19*365.2422,0.087,0.0005,'Metonik fark 0,087 gün');ok(Math.abs(L.yearsPerDay-219)<1,'219 yıl');}
near(940*29.53059/76,365.25*940*29.53059/(76*365.25),1e-9,'Callippus');
{const c=K.contFrac(A.tropical/A.synodic,8).conv.map(x=>x.p+'/'+x.q);eq(c.slice(0,7),['12/1','25/2','37/3','99/8','136/11','235/19','4131/334']);
 for(const x of K.contFrac(Math.PI,5).conv)ok(Math.abs(Math.PI-x.p/x.q)<1/(x.q*x.q),'zincir kesir özelliği');eq(K.contFrac(Math.PI,4).conv.map(x=>x.p+'/'+x.q),['3/1','22/7','333/106','355/113']);}
eq(K.contFrac(A.tropical-365,6).conv.slice(1).map(x=>x.p+'/'+x.q),['1/4','7/29','8/33','31/128','845/3489']);
/* artık yıl kuralı: ortalama yılı 0–399 999 arası kaba kuvvet sayımla */
for(const[a,b,c]of[[4,0,0],[4,100,400],[4,128,0],[5,0,0],[4,100,0],[2,10,50]]){let n=0;const Y=400000;for(let y=0;y<Y;y++)if(K.ruleLeap(y,a,b,c))n++;near(K.ruleMean(a,b,c),365+n/Y,1e-12,`kural ${a},${b},${c}`);}
for(let y=-1000;y<=5000;y++){eq(K.ruleLeap(y,4,100,400),K.gregLeap(y));eq(K.ruleLeap(y,4,0,0),K.julLeap(y));}
ok(K.ruleCheck(4,50,0).length>0&&K.ruleCheck(4,100,250).length>0&&K.ruleCheck(0,0,0).length>0&&K.ruleCheck(4,100,400).length===0,'kural denetimi');
near(1/(365.25-A.tropical),128,0.1,'Jülyen 128 yılda bir gün');near(1/(365.2425-A.tropical),3222.7,0.1,'Gregoryen');near(1/(365.2425-A.equinoxYear2000),7936.5,0.1,'Gregoryen / ılım yılı');
/* kayma dizisi: doğrudan gün sayımı */
{const s=K.driftSeries(4,100,400,A.tropical,2000,2400,400);near(s[1][1],146097-400*A.tropical,1e-9,'400 yıl');const t=K.driftSeries(4,0,0,365.25,0,4000,1);ok(t.every(([y,v])=>Math.abs(v)<1),'Jülyen kendine göre sınırlı');}

/* 9. İngiliz yasal yılı ve yıl numaraları */
eq(K.englishLegal(1731,2,11).dual,'11 Şubat 1731/32');eq(K.jdnToGreg(K.englishLegal(1731,2,11).j),{y:1732,m:2,d:22},'Washington');
eq([K.englishLegal(1700,3,24).hy,K.englishLegal(1700,3,25).hy],[1701,1700]);eq(K.englishLegal(1699,1,5).dual,'5 Ocak 1699/1700');ok(K.englishLegal(1751,1,10).err,'1751 Ocak yok');ok(K.englishLegal(1751,12,31).j===K.julToJdn(1751,12,31));
eq(K.jdnToGreg(K.julToJdn(1917,10,25)),{y:1917,m:11,d:7},'25 Ekim (7 Kasım)');
eq([K.yearLabel(1),K.yearLabel(0),K.yearLabel(-43)],['1','MÖ 1','MÖ 44']);

console.log(`G takvimler: ${checks.toLocaleString('tr-TR')} bağımsız USNO, yürüyücü, Hicrî, Rumî, Paskalya ve yaklaşıklık kontrolü PASS`);

if(process.argv.includes('--browser')){
  const {chromium}=await import('playwright');const {createServer}=await import('node:http');const {join,extname}=await import('node:path');const {fileURLToPath}=await import('node:url');const root=fileURLToPath(new URL('../',import.meta.url));
  const server=createServer((req,res)=>{const file=join(root,decodeURIComponent(new URL(req.url,'http://localhost').pathname));if(!fs.existsSync(file)||fs.statSync(file).isDirectory()){res.writeHead(404).end();return;}res.setHeader('Content-Type',({'.html':'text/html; charset=utf-8','.js':'text/javascript; charset=utf-8','.css':'text/css; charset=utf-8'})[extname(file)]||'application/octet-stream');res.end(fs.readFileSync(file));});await new Promise(r=>server.listen(0,'127.0.0.1',r));let browser;
  try{browser=await chromium.launch();const before=checks;
  for(const[width,theme]of[[390,'light'],[1280,'dark']]){
    const page=await browser.newPage({viewport:{width,height:900},deviceScaleFactor:width===390?2:1,hasTouch:width===390});await page.addInitScript(t=>{localStorage.setItem('acelya-theme',t);localStorage.setItem('acelya-sound-muted','1');},theme);page.setDefaultTimeout(8000);
    const errors=[];page.on('pageerror',e=>errors.push(e.message));page.on('console',m=>{if(m.type()==='error')errors.push(m.text());});
    page.on('response',r=>{if(r.status()>=400)errors.push(r.status()+' '+r.url());});
    await page.goto(`http://127.0.0.1:${server.address().port}/${SLUG}.html`);await page.waitForTimeout(200);
    const click=id=>page.locator('#'+id).click(),read=id=>page.locator('#'+id).textContent(),has=async(id,text)=>{const t=(await read(id)).replace(/ /g,' ');assert(t.includes(text),`${id}: “${t}” içinde “${text}” yok (${width})`);checks++;},
      fill=(id,v)=>page.locator('#'+id).fill(String(v)),range=(id,v)=>page.locator('#'+id).evaluate((e,v)=>{e.value=v;e.dispatchEvent(new Event('input',{bubbles:true}));},v),sel=(id,v)=>page.locator('#'+id).selectOption(String(v)),
      hidden=async id=>page.locator('#'+id).isHidden(),noflow=async tag=>{eq(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),true,'yatay taşma: '+tag+' '+width);};
    eq(await page.evaluate(()=>document.title.length<=80&&document.title.startsWith('Takvimler ve Zaman Ölçümü: ')),true,'başlık');eq(await page.locator('[role=tab]').count(),5);
    /* 1. sekme */
    await has('sdCalc','86 164,0905 s');await has('sdDiff','0,0000');await has('lsHours','+2,08 saat');await has('lsYpd','219 yıl');await has('lsLeap','7');await has('lsStatus','Metonik');
    eq(await page.locator('#cfRows tr').count(),7);eq(await page.locator('#cfRows tr.cur').count(),1);
    await page.locator('#cfRows button[data-y="8"]').click();await has('lsMean','365,4410');await has('lsHours','+38,18');await fill('lsY','3');await fill('lsM','37');await has('lsYpd','1 yıldan kısa');await has('lsStatus','her yıl yaklaşık 1,0 gün kayar');ok(!/içinde bir gün/.test(await read('lsStatus')),'kısa kayma dili');await fill('lsY','8');await fill('lsM','500');await has('lsStatus','sığmaz');await fill('lsY','0');eq(await hidden('lsErr'),false);
    await has('lrMean','365,2425000');await has('lrSec','+26,8 s');await has('lrYpd','3223 yıl');await has('lrEnd','+0,62');eq(await page.locator('#lrGreg').getAttribute('aria-pressed'),'true');
    await click('lrJul');await has('lrYpd','128 yıl');await has('lrSec','+674,8');await click('lr128');await has('lrSec','−0,2');await has('lrYpd','454 545 yıl');
    await click('lrGreg');await sel('lrTarget','eq');await has('lrYpd','7937 yıl');await fill('lrB','50');await has('lrErr','katı');await has('lrMean','—');
    await has('fracRows','8/33');await has('fracRows','97/400');
    await click('gokReset');await has('lsYpd','219 yıl');await has('lrYpd','3223 yıl');eq(await page.locator('#lrTarget').inputValue(),'trop');await noflow('gok');
    /* 2. sekme */
    await click('tab-jg');await has('jgDiff','+13 gün');await has('jgSpan','1 Mart 1900 – 28 Şubat 2100');await has('jgXmas','7 Ocak 2027');await has('jgMar','14 Mart 2026');
    await click('jg2100');await has('jgDiff','+14 gün');await has('jgLeapJ','Evet');await has('jgLeapG','Hayır');await has('jgStatus','29 Şubat');await click('jg1582');await has('jgDiff','+10 gün');await has('jgStatus','15 Ekim Cuma');
    await click('jg1700');await has('jgDiff','+11 gün');await click('jgP1');await has('jgYearOut','1701');await range('jgYear','250');await has('jgDiff','0 gün');await has('jgStatus','İznik');await range('jgYear','-100');await has('jgYearOut','MÖ 101');await has('jgDiff','−');
    await has('adRows','4 Ekim 1582 Perşembe');await has('adRows','15 Ekim 1582 Cuma');await has('adRows','11 tarih');await has('adRows','15 Şubat 1332 Çarşamba');await has('adRows','1 Mart 1333 Perşembe');eq(await page.locator('#adRows tr').count(),7);
    await click('jgReset');await has('jgDiff','+13 gün');await noflow('jg');
    /* 3. sekme */
    await click('tab-ay');await has('hjPos','8. yıl / 30');await has('hjLen','354 gün');await has('hjStart','17 Haziran 2026 Çarşamba');await has('hjLaw','10 Cemaziyelahir 1344');await has('hjLawNote','1 gün sonrasını');await has('hjMean','2502 yıl');
    eq(await page.locator('#hjCycle span.lp').count(),11);await has('hjStatus','Ramazan 1448');await has('hjStatus','8 Şubat 2027');await has('hjStatus','33,6');
    await sel('hjVariant','tayyibi');eq(await page.locator('#hjCycle span.lp.cur').count(),1);await has('hjLen','355 gün');await sel('hjVariant','std');await fill('hjYear','1452');await has('hjStatus','26 Aralık 2030');await has('hjStatus','bu yıl yılbaşını geçip');ok(!/34 yıl sonra/.test(await read('hjStatus')),'1452 bu yıl');await fill('hjYear','1448');ok(!/bu yıl yılbaşını/.test(await read('hjStatus')),'1448');await fill('hjYear','0');await has('hjErr','1 ile 3000');
    await has('hePos','11. yıl / 19');await has('heMonths','13');await fill('heYear','5785');await has('heMonths','12');
    await click('ayReset');await has('hjPos','8. yıl / 30');await has('heMonths','13');await noflow('ay');
    /* 4. sekme */
    await click('tab-cevir');await has('cvG','26 Aralık 1925');await has('cvJdn','2 424 511');await has('cvDow','Cumartesi');await has('cvH','10 Cemaziyelahir 1344');await has('cvR','26 Kânunuevvel 1341');await has('cvStatus','9 cemaziyelâhir 1344');
    for(let i=0;i<6;i++)await click('cvNext');await has('cvG','1 Ocak 1926');await has('cvR','Kullanımdan kalktı');eq(await page.locator('#cvCal').inputValue(),'greg');
    await sel('cvPreset','reform1');await has('cvDow','Perşembe');await has('cvDiff','+10');await click('cvNext');await has('cvJ','5 Ekim 1582');await has('cvG','15 Ekim 1582');await has('cvDow','Cuma');
    await sel('cvPreset','rumi1332');await has('cvStatus','Sonraki gün');await click('cvNext');await has('cvR','1 Mart 1333');await has('cvG','1 Mart 1917');
    await sel('cvPreset','jd0');await has('cvJ','1 Ocak MÖ 4713');await has('cvG','24 Kasım MÖ 4714');await has('cvDow','Pazartesi');eq(await hidden('cvYmd'),true);await click('cvPrev');await has('cvJdn','0');
    await sel('cvPreset','hicret');await has('cvJ','16 Temmuz 622');await has('cvDow','Cuma');await has('cvJdn','1 948 440');
    await sel('cvPreset','rumi1256');await has('cvG','13 Mart 1840');await has('cvH','1256');
    await sel('cvPreset','brit1752');await click('cvNext');await has('cvG','14 Eylül 1752');await has('cvDow','Perşembe');
    await sel('cvPreset','ekim1917');await has('cvG','7 Kasım 1917');
    await sel('cvPreset','j2000');await has('cvG','1 Ocak 2000');await has('cvDow','Cumartesi');await fill('cvJdnIn','2 299 161');await has('cvG','15 Ekim 1582');await fill('cvJdnIn','abc');await has('cvErr','tam sayı');
    await sel('cvPreset','rumi1332');await fill('cvD','16');await has('cvErr','hiç yaşanmadı');await has('cvG','—');
    await sel('cvPreset','reform2');await sel('cvCal','hijri');await has('cvG','15 Ekim 1582');eq(await page.locator('#cvY').inputValue(),'990');await sel('cvHv','v15');await has('cvG','Ekim 1582');
    await sel('cvCal','rumi');await has('cvErr','takvimde yok');
    await sel('cvCal','greg');await fill('cvY','2023');await sel('cvM','2');await fill('cvD','29');await has('cvErr','28 gün');
    await has('esG','5 Nisan 2026');await has('esJ','12 Nisan 2026');await has('esJ','Jülyen 30 Mart');eq(await page.locator('#esStepsG li').count(),14);eq(await page.locator('#esStepsJ li').count(),7);
    await fill('esYear','2027');await has('esG','28 Mart 2027');await has('esJ','2 Mayıs 2027');await fill('esYear','1961');await has('esG','2 Nisan 1961');await fill('esYear','1500');await has('esErr','1583');
    await click('cevirReset');await has('cvR','26 Kânunuevvel 1341');await has('esG','5 Nisan 2026');await click('cvToday');await has('cvStatus','Gregoryen');await noflow('cevir');
    /* 5. sekme */
    await click('tab-tarihci');await has('ddDual','11 Şubat 1731/32');await has('ddHist','11 Şubat 1732');await has('ddNS','22 Şubat 1732');await has('ddDow','Cuma');await has('ddStatus','Washington');
    await sel('ddM','4');await has('ddDual','tek yıl');await fill('ddY','1751');await sel('ddM','1');await has('ddErr','1752 yılı');await fill('ddY','1100');await has('ddErr','1155');
    await has('ctRows','25 Ekim 1917');await has('ctStatus','Çarşamba');await has('ctStatus','Eski Usul');eq(await page.locator('#ctRows tr.cur').count(),1);
    await sel('ctPreset','b1752');await has('ctStatus','hiç yazılmadı');await sel('ctPreset','g1700');await has('ctStatus','1699/00');await fill('ctY','1500');await has('ctErr','1583');
    await has('zyAstro','−43 → 14');await has('zyIso','−0043 → 0014');await has('zySpan','57 yıl');await has('zyNaive','58 yıl');await sel('zyEraB','mo');await fill('zyB','4');await has('zySpan','40 yıl');await has('zyStatus','doğrudur');
    await click('tarihciReset');await has('zySpan','57 yıl');await has('ddNS','22 Şubat 1732');await noflow('tarihci');
    /* sekme klavyesi, R tuşu, etiketler, biçim */
    await page.locator('#tab-tarihci').focus();await page.keyboard.press('Home');eq(await page.locator('#tab-gok').getAttribute('aria-selected'),'true');await page.keyboard.press('ArrowLeft');eq(await page.locator('#tab-tarihci').getAttribute('aria-selected'),'true');await page.keyboard.press('ArrowRight');eq(await page.locator('#tab-gok').getAttribute('aria-selected'),'true');await page.keyboard.press('End');eq(await page.locator('#tab-tarihci').getAttribute('aria-selected'),'true');
    await click('tab-jg');await click('jg1582');await page.locator('h1').click();await page.keyboard.press('r');await has('jgDiff','+13 gün');
    eq(await page.evaluate(()=>[...document.querySelectorAll('main input,main select')].filter(e=>!(e.labels&&e.labels.length)&&!e.getAttribute('aria-label')).map(e=>e.id)),[]);
    eq(await page.evaluate(()=>[...document.querySelectorAll('main canvas')].filter(c=>c.getAttribute('role')!=='img'||!c.getAttribute('aria-label')).length),0);
    eq(await page.evaluate(()=>Object.isFrozen(Takvim)&&!Object.getOwnPropertyDescriptor(window,'Takvim').writable),true);
    eq(await page.evaluate(()=>/[̀-ͯ⃗]/.test(document.body.textContent.normalize('NFC'))),false,'birleşik işaret');
    for(const t of['gok','jg','ay','cevir','tarihci']){await click('tab-'+t);await noflow('sekme '+t);
      eq(await page.evaluate(()=>/\d\.\d/.test([...document.querySelectorAll('.tk-stat strong,.tk-status,output,.tk-table td')].filter(e=>e.offsetParent).map(e=>e.textContent).join(' '))),false,'ondalık nokta '+t);
      if(t!=='cevir'&&t!=='tarihci')eq(await page.evaluate(k=>{const c=document.querySelector('#panel-'+k+' canvas');return !!c&&c.width>0&&c.height>0;},t),true);}
    await page.waitForSelector('.digest',{state:'attached',timeout:15000});await page.locator('.digest').scrollIntoViewIfNeeded();ok(await page.locator('.digest').isVisible(),'Keşif Defteri görünür');ok(((await page.locator('.digest').textContent())||'').includes('Metonik'),'defter içeriği yüklendi');
    assert.deepEqual(errors,[]);checks++;await page.close();
  }
  console.log(`G takvimler: ${checks-before} tarayıcı kontrolü (390 açık / 1280 koyu; beş sekme, hazırlar, sınırlar, klavye) PASS`);
  }finally{await browser?.close();await new Promise(r=>server.close(r));}
}
