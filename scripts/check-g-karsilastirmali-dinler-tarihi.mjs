// Karşılaştırmalı Dinler Tarihi: çekirdeğin ve sayfanın bağımsız denetimi.
// Başvurular sayfanın formüllerini yinelemez: Pew 2025 raporunun basılmış tablosu (PDF'ten aktarıldı), SEP'in
// tanımlar hakkında söyledikleri (hangi tanım hangi vakayı içeri alır / dışarıda bırakır), kaynaklardaki tarihler,
// sıfır yılı olmayan takvimde yıl yıl sayan ayrı bir sayaç, kaba kuvvet aralık karşılaştırması, kapalı biçimler.
// Ayrıca üçüncü halka kuralları için metin denetimleri (görüntü yok, sıralama dili yok, kısa alıntılar, izinli kaynaklar).
import fs from 'node:fs';
import vm from 'node:vm';
import assert from 'node:assert/strict';
const SLUG='karsilastirmali-dinler-tarihi';
const html=fs.readFileSync(new URL(`../${SLUG}.html`,import.meta.url),'utf8');
const source=html.split('/* KERNEL-BEGIN */')[1]?.split('/* KERNEL-END */')[0];
assert(source,'Çekirdek sınırları gerekli');
const context={window:{}};vm.createContext(context);vm.runInContext(source,context);
const K=context.window.DinlerTarihi;let checks=0;
const eq=(a,b,m)=>{const x=JSON.stringify(a),y=JSON.stringify(b);assert(x===y,(m?m+': ':'')+x+' ≠ '+y);checks++;},ok=(c,m)=>{assert(c,m);checks++;};
const near=(a,b,tol,m)=>{assert(Math.abs(a-b)<=tol,`${m}: ${a} ≉ ${b}`);checks++;};
let seed=20261113;const rnd=()=>{seed=(seed*1664525+1013904223)>>>0;return seed/4294967296;},ri=n=>Math.floor(rnd()*n);
ok(Object.isFrozen(K)&&Object.isFrozen(K.CASES[0].f)&&Object.isFrozen(K.PEW25[0]),'çekirdek dondurulmuş');
const NB=' ';

/* 0. Sayı ve yıl biçimi */
for(const[x,d,s]of[[0.5,1,'0,5'],[-5.4,1,'−5,4'],[9950,0,'9950'],[10000,0,'10'+NB+'000'],[2147230000,0,'2'+NB+'147'+NB+'230'+NB+'000'],[-0.01,1,'0,0']])eq(K.fmt(x,d),s,'fmt '+x);
eq(K.fmtSigned(20.7,1),'+20,7');eq(K.pct(23.3),'23,3 %');
eq([K.yearLabel(-1500),K.yearLabel(30),K.yearLabel(1040),K.yearLabel(-1)],['MÖ 1500','MS 30','1040','MÖ 1']);
eq([K.rangeLabel(-551,-479),K.rangeLabel(610,632),K.rangeLabel(-7,60),K.rangeLabel(1469,1539)],['MÖ 551–479','MS 610–632','MÖ 7 – MS 60','1469–1539']);
/* sıfır yılı yok: yıl yıl sayan bağımsız sayaç */
const walk=(a,b)=>{let n=0,y=a;while(y<b){y=y===-1?1:y+1;n++;}return n;};
for(let r=0;r<400;r++){const a=-2000+ri(3000),b=a+ri(2500);if(a===0||b===0)continue;eq(K.span(a,b),walk(a,b),`span ${a} ${b}`);}
eq(K.span(-1,1),1);eq(K.span(-1000,1040),2039);

/* 1. Tanımlar: SEP'in söyledikleriyle (The Concept of Religion) */
const C=id=>K.CASES.find(c=>c.id===id).f;
eq(K.classify('tylor',C('navajo')),'in','SEP: Tylor Navajo’yu içeri alır');
eq(K.classify('spiro',C('theravada')),'out','SEP: Spiro Theravāda’yı din saymaz');
eq(K.classify('durkheim',C('roma')),'out','SEP: Durkheim için yolculuk öncesi kuş kurbanı büyüdür');
eq(K.classify('durkheim',C('muska')),'out','SEP: Durkheim için muska büyüdür');
eq(K.classify('tillich',C('roma')),'out','SEP: Tillich için kuş kurbanı gündelik');
eq(K.classify('geertz',C('stoa')),'in','SEP: Geertz Stoacı Logos’u içeri alır');
for(const id of['ulus','marx']){ok(['in','edge'].includes(K.classify('durkheim',C(id)))||['in','edge'].includes(K.classify('tillich',C(id))),'SEP: işlevsel tanım '+id+' içeri alabilir');for(const d of['tylor','spiro','geertz'])eq(K.classify(d,C(id)),'out','SEP: öz tanım '+id+' dışarıda bırakır ('+d+')');}
eq(K.classify('tylor',C('hayalet')),'in');eq(K.classify('durkheim',C('hayalet')),'out','topluluk yok');
/* bağımsız yeniden uygulama: 3 değerli mantıkta en küçük değer; Smart için alt / üst sayım */
const REQ={tylor:['spirit'],spiro:['spirit','interact'],durkheim:['sacred','community'],geertz:['order'],tillich:['ultimate']};
const DIMK=['doc','myth','eth','rit','exp','inst','mat'],FK=['spirit','interact','sacred','community','order','ultimate'];
const ref=(d,f,k)=>{if(d==='smart'){const lo=DIMK.filter(x=>f[x]===1).length,hi=DIMK.filter(x=>f[x]>0).length;return lo>=k?'in':hi<k?'out':'edge';}const m=Math.min(...REQ[d].map(x=>f[x]));return m===1?'in':m===0?'out':'edge';};
for(let r=0;r<4000;r++){const f={};for(const x of FK.concat(DIMK))f[x]=[0,0.5,1][ri(3)];const k=1+ri(7);for(const d of K.DEFS)eq(K.classify(d.id,f,k),ref(d.id,f,k),'rastgele '+d.id);}
eq(K.classify('tylor',{spirit:2}),null,'geçersiz değer');eq(K.classify('smart',C('navajo'),0),null,'eşik 1–7');
/* karşılaştırma: kaba kuvvet */
for(const a of K.DEFS)for(const b of K.DEFS){const exp=K.CASES.filter(c=>K.classify(a.id,c.f)!==K.classify(b.id,c.f)).map(c=>c.id);eq(K.compareDefs(a.id,b.id).map(x=>x.id),exp);}
eq(K.compareDefs('tylor','durkheim').length,9);
for(const d of K.DEFS){const t=K.tally(d.id);eq(t.in+t.out+t.edge,10);}
eq(K.tally('tylor'),{in:4,out:3,edge:3});eq(K.tally('smart',null,5),{in:4,out:3,edge:3});eq(K.tally('smart',null,1).out,0);eq(K.tally('smart',null,7).in,2);
/* cümleler */
eq(K.STMTS.length,8);eq(K.checkStmts(Object.fromEntries(K.STMTS.map(s=>[s.id,s.ans]))).correct,8);eq(K.checkStmts({}).correct,0);
const ans=Object.fromEntries(K.STMTS.map(s=>[s.id,s.ans]));eq([ans.s2,ans.s3],['h','h'],'askıya alma iki yöne de');eq(ans.s5,'d');eq(ans.s8,'d');

/* 2. Gelenekler: kaynaklardaki aralıklar */
const R=id=>K.TRADS.find(t=>t.id===id).range;
eq(R('zerdust'),[-1500,-500],'Zoroaster: 1500–500 BCE');eq(K.TRADS.find(t=>t.id==='zerdust').mark,-1000);
eq(R('budist'),[-486,-368],'Buddha: uzun 566–486, kısa 448–368');eq(R('konfucyus'),[-551,-479]);eq(R('islam'),[610,632]);eq(R('sih'),[1469,1539]);eq(R('bahai'),[1844,1863]);eq(R('hristiyan'),[-7,60]);
eq(R('hindu'),[-1500,300]);eq(R('tao'),[-400,142]);eq(R('sinto'),[712,1868]);eq(K.TRADS.find(t=>t.id==='yerli').range,null);
eq(K.TRADS.length,13);
for(const t of K.TRADS){if(t.range)ok(t.range[0]<=t.range[1],'aralık sırası '+t.id);for(const m of t.m){ok(m[1]>=-20&&m[1]<=150&&m[2]>=-12&&m[2]<=60,'harita sınırı '+t.id+' '+m[3]);ok(m[0]!==0,'sıfır yılı');}
  for(let i=1;i<t.m.length;i++)ok(t.m[i][0]>=t.m[i-1][0],'iz sırası '+t.id);}
/* izler: yıl yıl, bağımsız sayım */
for(let y=-1600;y<=2025;y+=7){if(y===0)continue;const exp=K.TRADS.filter(t=>t.m.some(m=>m[0]<=y)).map(t=>t.id);eq(K.attestedAt(y,'hepsi'),exp,'iz '+y);}
eq(K.attestedAt(-1600).length,0);eq(K.attestedAt(2025).length,12);eq(K.attestedAt(500).length,8);eq(K.attestedAt(500,'hint'),['hindu','cayna','budist']);
eq(K.marksUpTo('islam',711).length,6);eq(K.firstSeen('sinto'),712);
/* sıralama: kaba kuvvet aralık ayrıklığı */
const Rs=K.TRADS.filter(t=>t.range);let sure=0,over=0;
for(const a of Rs)for(const b of Rs){if(a===b)continue;const r=K.relation(a.id,b.id),disj=a.range[1]<b.range[0]||b.range[1]<a.range[0];eq(r==='ortusme',!disj);if(disj)eq(r,a.range[0]<b.range[0]?'once':'sonra');}
for(let i=0;i<Rs.length;i++)for(let j=i+1;j<Rs.length;j++)(K.relation(Rs[i].id,Rs[j].id)==='ortusme')?over++:sure++;
eq([sure,over],[45,21]);eq(K.relation('zerdust','yahudi'),'ortusme');eq(K.relation('zerdust','budist'),'once');eq(K.relation('cayna','budist'),'ortusme','Mahāvīra ve Buda çağdaş');eq(K.relation('islam','yerli'),null);

/* 3. Metinler */
const st=K.corpusStats('rigveda');eq([st.compFrom,st.compTo,st.firstMs],[-1500,-1000,1040]);eq([st.gapMin,st.gapMax],[walk(-1000,1040),walk(-1500,1040)]);
eq(K.corpusStats('avesta').firstMs,1323);eq(K.corpusStats('kuran').overlap,true);eq(K.corpusStats('ahit').firstMs,125);eq([K.corpusStats('ahit').gapMin,K.corpusStats('ahit').gapMax],[25,75]);
const ev=(c,s)=>K.CORPORA.find(x=>x.id===c).ev.some(e=>e[3].includes(s));
ok(ev('kuran','568–645'),'Birmingham 568–645');ok(ev('kuran','578–669'),'San’a 578–669');ok(ev('ahit','367'),'Atanasius 367');ok(ev('pali','Alu Vihara'),'Pali');ok(ev('agama','454 ya da 466'),'Valabhi');ok(ev('granth','1604'),'Adi Granth');ok(ev('tanah','Graetz 1871'),'Jamnia');ok(ev('rigveda','1040'),'Rigveda yazması');
for(const c of K.CORPORA)for(const e of c.ev)ok(e[1]<=e[2]&&'cowke'.includes(e[0]),'olay '+c.id);
/* tarihleme: radyokarbon alt sınır verir */
for(const d of K.DATING)for(let y=-50;y<=800;y+=3){const r=K.datingCheck(d.id,y);r.forEach((x,i)=>{const[t,lo,hi]=d.est[i];eq(x.s,y<lo?'once':y<=hi?'icinde':t==='c'?'sonra-olasi':'sonra');});}
eq(K.datingCheck('birmingham',600).map(x=>x.s),['icinde','icinde']);eq(K.datingCheck('birmingham',560)[0].s,'once');eq(K.datingCheck('birmingham',650)[0].s,'sonra-olasi');eq(K.datingCheck('sanaa',700).map(x=>x.s),['sonra-olasi','icinde']);
eq(K.datingCheck('p52',200).map(x=>x.s),['sonra','sonra','icinde']);eq(K.datingCheck('yok',1),null);
/* kanon sayımı: 32 durumun hepsi */
for(let m=0;m<32;m++){const o={twelve:!!(m&1),sam:!!(m&2),kings:!!(m&4),chron:!!(m&8),ezra:!!(m&16)};eq(K.tanakhCount(o),24+(o.twelve?11:0)+[o.sam,o.kings,o.chron,o.ezra].filter(Boolean).length);}
eq(K.tanakhCount({}),24);eq(K.tanakhCount({twelve:1,sam:1,kings:1,chron:1,ezra:1}),39);
eq(K.CANONS.map(c=>c[1]),[24,66,73,81,22],'Biblical canon');

/* 4. Yapılar */
const cal=Object.fromEntries(K.FESTS.map(f=>[f.id,f.cal]));
eq(cal,{ramazan:'ay',pesah:'aygunes',vesak:'aygunes',divali:'aygunes',nevruz:'gunes',vaisakhi:'gunes',noel:'gunes',paskalya:'aygunes'},'kaynaklardaki tarih kuralları');
eq(K.checkFests(cal).correct,8);eq(K.checkFests({ramazan:'gunes'}).correct,0);
near(K.DRIFT,365.2421897-354.367066332,1e-6,'ay yılı farkı');near(K.CYCLE,33.585,0.001,'dolaşma süresi');near(K.lunarDrift(1),10.875,0.001,'yıllık kayma');near(K.lunarDrift(34),369.75,0.01,'34 yıl');
eq(K.checkRite(Object.fromEntries(K.RITE_STEPS.map(s=>[s.id,s.ans]))).correct,6);eq(K.RITE_STEPS.filter(s=>s.ans==='ayrilma').length,2);

/* 5. Pew: 2025 raporunun basılmış ana tablosu (PDF'ten) */
const PDF={hristiyan:[2147230000,2268860000,5.7,30.6,28.8],musluman:[1675800000,2022590000,20.7,23.9,25.6],bagsiz:[1635250000,1905360000,16.5,23.3,24.2],hindu:[1051540000,1177860000,12.0,15.0,14.9],budist:[342750000,324190000,-5.4,4.9,4.1],diger:[154110000,172170000,11.7,2.2,2.2],yahudi:[13910000,14780000,6.2,0.2,0.2]};
for(const r of K.PEW25){eq([r.p10,r.p20,r.chg,r.s10,r.s20],PDF[r.id],'Pew '+r.id);near(K.relChange(r.p10,r.p20),r.chg,0.06,'yeniden hesap '+r.id);near(K.shareOf(r.id,2010),r.s10,0.06,'pay 2010 '+r.id);near(K.shareOf(r.id,2020),r.s20,0.06,'pay 2020 '+r.id);}
near(K.PEW25.reduce((s,r)=>s+r.s20,0),100,0.15,'paylar 100');near(K.PEW25.reduce((s,r)=>s+r.p20,0)/1e9,7.886,0.001,'2020 toplam');
/* basılmış metin: Hristiyan payı 1,8 puan düştü, Müslümanlar 347 milyon arttı, bağsızlar 270 milyon */
near(PDF.hristiyan[3]-PDF.hristiyan[4],1.8,1e-9);near((PDF.musluman[1]-PDF.musluman[0])/1e6,347,0.5);near((PDF.bagsiz[1]-PDF.bagsiz[0])/1e6,270,0.5);near((PDF.budist[0]-PDF.budist[1])/1e6,19,0.5);
eq(K.pewRow('bagsiz').o.s,16,'2012 raporu yüzde 16');near(K.pewRow('bagsiz').rev,7.3,1e-9);eq(K.pewRow('budist').o.s,7);eq(K.PEW12.find(x=>x.id==='hristiyan').s,32);
eq(Math.abs(+K.relChange(13910000,14780000).toFixed(1)-6.2)>0.05,true,'Yahudi satırı: yuvarlanmış sayılardan 6,3');
/* sentetik ölçüm: korunum ve kapalı biçimler */
for(let r=0;r<3000;r++){const n=ri(61),f=ri(31),u=ri(61),p={nominal:n,folk:f,none:u,twoStep:rnd()<.5,drop:ri(101),folkOption:rnd()<.5,folkListed:ri(101)};const m=K.measure(p);
  if(n+f+u>100){eq(m,null);continue;}near(m.listed+m.other+m.none,100,1e-9,'toplam');ok(m.none>=u-1e-9,'“yok” girdiden az olamaz');if(!p.twoStep&&p.folkOption)near(m.none,u,1e-9,'yansız tasarım');
  if(p.twoStep&&p.folkOption)near(m.none,u+n*p.drop/100,1e-9,'iki adım');}
eq(K.measure({nominal:30,folk:10,none:20,twoStep:false,drop:40,folkOption:true,folkListed:60}),{committed:40,listed:70,other:10,none:20,trueNone:20});
const m2=K.measure({nominal:30,folk:10,none:20,twoStep:true,drop:40,folkOption:true,folkListed:60});near(m2.none,32,1e-9);near(m2.listed,58,1e-9);
const m3=K.measure({nominal:30,folk:10,none:20,twoStep:false,drop:40,folkOption:false,folkListed:60});near(m3.listed,76,1e-9);near(m3.none,24,1e-9);

/* 6. Üçüncü halka kuralları: metin denetimleri */
const body=html.split('<body')[1];const text=body.replace(/<script[\s\S]*?<\/script>/g,' ').replace(/<[^>]+>/g,' ');
ok(!/<img\b|<svg\b|<video\b|<iframe\b/i.test(body),'görüntü yok (peygamber tasviri olanağı yok)');
ok(!/https?:\/\/(?!(?:en\.wikipedia\.org|plato\.stanford\.edu|islamansiklopedisi\.org\.tr|www\.pewresearch\.org)\/)[^"' ]+/.test(html.replace(/<script[\s\S]*$/,'')),'yalnız izinli kaynak alan adları');
const SP=fs.readFileSync(new URL('./check-site.mjs',import.meta.url),'utf8');for(const u of [...html.matchAll(/href="(https:[^"]+)"/g)].map(m=>m[1]))ok(/SOURCE_PREFIXES/.test(SP)&&[...SP.matchAll(/"(https?:\/\/[^"]+)"/g)].some(m=>u.startsWith(m[1])),'izinli önek '+u);
for(const bad of[/(?<!\p{L})batıl(?!\p{L})/iu,/hurafe/iu,/sapkın/iu,/gerçek din(?!\p{L})/iu,/yanlış din/iu,/daha üstün/iu,/daha ileri(?!\p{L})/iu])ok(!bad.test(text),'yargı dili yok: '+bad);
ok((text.match(/ilkel/g)||[]).length===0&&html.includes('ilkel düşüncesini gösterir'),'“ilkel” yalnız alıştırma cümlesinde (çekirdek verisi)');
/* İngilizce doğrudan alıntılar 15 sözcüğü aşmaz */
for(const q of [...text.matchAll(/“([^”]{3,200})”/g)].map(m=>m[1]))ok(q.split(/\s+/).length<=15,'kısa alıntı: '+q);
ok(/geleneksel anlatım/i.test(text)&&/tarihsel-eleştirel araştırma/i.test(text),'iki bakış etiketli');
for(const t of K.TRADS)ok(t.rangeText.length>20,'aralık açıklaması '+t.id);
ok(!/[̀-ͯ⃗]/.test(html.normalize('NFC')),'birleşik işaret yok');
ok(html.includes('data-page="'+SLUG+'"')&&/<title>Karşılaştırmalı Dinler Tarihi: [^<]{1,49}<\/title>/.test(html),'başlık ve data-page');
console.log(`G dinler tarihi: ${checks} çekirdek ve metin kontrolü PASS`);

if(process.argv.includes('--browser')){
  const {chromium}=await import('playwright');const {createServer}=await import('node:http');const {join,extname}=await import('node:path');const {fileURLToPath}=await import('node:url');const root=fileURLToPath(new URL('../',import.meta.url));
  const server=createServer((req,res)=>{const file=join(root,decodeURIComponent(new URL(req.url,'http://localhost').pathname));if(!fs.existsSync(file)||fs.statSync(file).isDirectory()){res.writeHead(404).end();return;}res.setHeader('Content-Type',({'.html':'text/html; charset=utf-8','.js':'text/javascript; charset=utf-8','.css':'text/css; charset=utf-8'})[extname(file)]||'application/octet-stream');res.end(fs.readFileSync(file));});await new Promise(r=>server.listen(0,'127.0.0.1',r));let browser;
  try{browser=await chromium.launch();const before=checks;
  for(const[width,theme]of[[390,'light'],[1280,'dark']]){
    const page=await browser.newPage({viewport:{width,height:900},deviceScaleFactor:width===390?2:1,hasTouch:width===390});await page.addInitScript(t=>{localStorage.setItem('acelya-theme',t);localStorage.setItem('acelya-sound-muted','1');},theme);page.setDefaultTimeout(8000);
    const errors=[];page.on('pageerror',e=>errors.push(e.message));page.on('console',m=>{if(m.type()==='error')errors.push(m.text());});
    page.on('response',r=>{if(r.status()>=400)errors.push(r.status()+' '+r.url());});
    await page.goto(`http://127.0.0.1:${server.address().port}/${SLUG}.html`);await page.waitForTimeout(200);
    const click=sel=>page.locator(sel.startsWith('[')||sel.startsWith('#')?sel:'#'+sel).first().click(),read=id=>page.locator('#'+id).textContent(),has=async(id,text)=>{const t=(await read(id)).replace(/[  ]/g,' ');assert(t.includes(text),`${id}: “${t}” içinde “${text}” yok (${width})`);checks++;},
      range=(id,v)=>page.locator('#'+id).evaluate((e,v)=>{e.value=v;e.dispatchEvent(new Event('input',{bubbles:true}));},v),sel=(id,v)=>page.locator('#'+id).selectOption(String(v)),check=(id,v)=>page.locator('#'+id).setChecked(v),
      noflow=async tag=>{eq(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),true,'yatay taşma: '+tag+' '+width);};
    await page.locator('.digest .digest-core').first().waitFor({state:'visible',timeout:8000});ok(await page.locator('.digest').isVisible(),'defter görünür '+width);
    eq(await page.evaluate(()=>document.title.length<=80&&document.title.startsWith('Karşılaştırmalı Dinler Tarihi: ')),true,'başlık');eq(await page.locator('[role=tab]').count(),5);
    /* 1. sekme */
    await has('defIn','4');await has('defOut','3');await has('defEdge','3');await has('cmpN','9 / 10');await has('cmpStatus','Yolculuktan önce');await has('bd-navajo','İçeride');await has('bd-theravada','Sınırda');
    await sel('defSel','spiro');await has('bd-theravada','Dışarıda');await has('defNote','Theravāda');await sel('defSel','geertz');await has('defGist','birleştiren');await has('defNote','öz öğesini');await sel('defSel','smart');eq(await page.locator('#smartBox').isHidden(),false);await range('smartK',7);await has('defIn','2');await has('smartKOut','7');
    await sel('defSel','durkheim');await click('[data-case="roma"]');await has('featTitle','Romalı');await has('bd-roma','Dışarıda');await sel('ft-community','1');await has('bd-roma','İçeride');await click('caseRevert');await has('bd-roma','Dışarıda');
    await sel('defA','tylor');await sel('defB','tylor');await has('cmpStatus','Aynı tanımı');await sel('defA','geertz');await sel('defB','tillich');await has('cmpN','/ 10');
    eq(await page.locator('#mxBody tr').count(),7);
    await click('stCheck');await has('stStatus','Önce bütün cümleleri');for(const s of K.STMTS)await sel('st-'+s.id,s.ans);await click('stCheck');await has('stStatus','8 cümlenin 8');eq(await page.locator('#stBox .why:not([hidden])').count(),8);
    await sel('st-s2','b');await click('stCheck');await has('stStatus','8 cümlenin 7');
    await click('alanReset');await has('cmpN','9 / 10');eq(await page.locator('#defSel').inputValue(),'tylor');eq(await page.locator('#st-s1').inputValue(),'');await noflow('alan');
    /* 2. sekme */
    await click('tab-gelenek');await has('yrOut','MS 500');await has('attN','8 / 12');await has('attPts','28');await has('trName','Hinduizm');await has('trRange','MÖ 1500 – MS 300');eq(await page.locator('#trRows tr').count(),3);
    await click('[data-y="-1000"]');await has('attN','3 / 12');await has('attList','Hinduizm, Yahudilik, Zerdüştlük');await click('[data-y="2025"]');await has('attN','12 / 12');
    await range('yr','0');await has('yrOut','MS 1');await range('yr','-1600');await has('attN','0 / 12');await has('attList','hiçbir');
    await sel('famSel','dogu');await range('yr','800');await has('attN','3 / 3');await sel('famSel','hepsi');
    await sel('tradSel','islam');await has('trTrad','son peygamber');await has('trHist','767');await has('mapCap','İslam');await range('yr','700');await has('mapCap','5 iz');
    await sel('tradSel','yerli');await has('trRows','kategori');await has('trRange','tek bir başlangıç');await sel('tradSel','zerdust');await has('trRange','MÖ 1000');
    await has('relStatus','örtüşüyor');await has('relSure','45 / 66');await has('relOver','21 / 66');await sel('relB','budist');await has('relStatus','kesin');await sel('relA','cayna');await has('relStatus','örtüşüyor');
    await sel('mapView','east');await sel('mapView','west');
    await page.locator('#tlCanvas').scrollIntoViewIfNeeded();const box=await page.locator('#tlCanvas').boundingBox();await page.mouse.click(box.x+box.width*0.6,box.y+24+(box.height-50)/13*8.5);await has('trName','İslam');
    await click('gelenekReset');await has('attN','8 / 12');await has('trName','Hinduizm');eq(await page.locator('#mapView').inputValue(),'all');await noflow('gelenek');
    /* 3. sekme */
    await click('tab-metin');await has('cpComp','MS 610–632');await has('cpMs','MS 568–645');await has('cpGap','örtüşüyor');eq(await page.locator('#cpRows tr').count(),6);
    await sel('corpSel','rigveda');await has('cpGap','2039 – 2539 yıl');await has('cpMs','1040');await has('cpStatus','sözlü aktarım');await sel('corpSel','ahit');await has('cpGap','25 – 75 yıl');await sel('corpSel','agama');await has('cpGap','hesaplanamaz');
    await has('rcStatus','aralığın içinde');await range('rcYear','560');await has('rcStatus','henüz yoktu');await range('rcYear','700');await has('rcStatus','alt sınır');
    await sel('rcMs','p52');await has('rcStatus','Paleografi');await range('rcYear','140');await has('rcStatus','uyumlu');await sel('rcMs','sanaa');await range('rcYear','700');await has('rcStatus','650–700: aralığın içinde');
    await has('cnCount','24 kitap');await check('cn12',true);await has('cnCount','35 kitap');for(const id of['cnSam','cnKings','cnChron','cnEzra'])await check(id,true);await has('cnCount','39 kitap');await has('cnStatus','içerik farkı');eq(await page.locator('#cnRows tr').count(),5);
    await click('metinReset');await has('cpComp','MS 610–632');await has('cnCount','24 kitap');eq(await page.locator('#rcYear').inputValue(),'600');await noflow('metin');
    /* 4. sekme */
    await click('tab-yapi');await has('drShift','10,9 gün');await has('drCycle','33,6 yıl');await range('drY','34');await has('drShift','369,8 gün');await has('drNote','34 yılda');
    await click('fsCheck');await has('fsStatus','Önce');for(const f of K.FESTS)await sel('fs-'+f.id,f.cal);await click('fsCheck');await has('fsStatus','8 gözlemin 8');await has('fsStatus','bütün mevsimleri');
    await sel('fs-ramazan','gunes');await click('fsCheck');await has('fsStatus','8 gözlemin 7');await has('fw-ramazan','Ay takvimi');
    for(const s of K.RITE_STEPS)await sel('rt-'+s.id,s.ans);await click('rtCheck');await has('rtStatus','6 adımın 6');
    await click('yapiReset');await has('drShift','10,9 gün');eq(await page.locator('#fs-ramazan').inputValue(),'');await noflow('yapi');
    /* 5. sekme */
    await click('tab-sayi');await has('pwA','1,64 milyar');await has('pwB','1,91 milyar');await has('pwRev','16 % → 23,3 %');await has('pwStatus','zongjiao');await has('pwPts','+0,9 puan');await has('pwAbs','+270,1 milyon');
    await sel('pwGroup','yahudi');await has('pwRel','+6,3 %');await has('pwRel','basılmış +6,2 %');await has('pwStatus','yuvarlanmamış');await sel('pwGroup','budist');await has('pwAbs','−18,56 milyon');await has('pwStatus','tek büyük grup');
    await page.locator('#pwRows tr[data-g="musluman"]').click();await has('pwB','2,02 milyar');await sel('pwMode','count');
    eq(await page.locator('#pwRows tr').count(),8);await has('pwRows','2 147 230 000');
    await has('msListed','70,0 %');await has('msNone','20,0 %');await has('msStatus','aynı');await check('msTwo',true);await has('msNone','32,0 %');await has('msStatus','+12,0 puan');
    await check('msFolkOpt',false);await has('msOther','seçenek yok');await has('msNone','36,0 %');await range('msNom','60');await range('msNoneIn','60');await has('msErr','100');await has('msStatus','geçersiz');
    eq(await page.locator('#prjRows tr').count(),8);
    await click('sayiReset');await has('msNone','20,0 %');await has('pwA','1,64 milyar');await noflow('sayi');
    /* klavye, R tuşu, etiketler, biçim */
    await page.locator('#tab-sayi').focus();await page.keyboard.press('Home');eq(await page.locator('#tab-alan').getAttribute('aria-selected'),'true');await page.keyboard.press('ArrowLeft');eq(await page.locator('#tab-sayi').getAttribute('aria-selected'),'true');await page.keyboard.press('ArrowRight');eq(await page.locator('#tab-alan').getAttribute('aria-selected'),'true');await page.keyboard.press('End');eq(await page.locator('#tab-sayi').getAttribute('aria-selected'),'true');
    await click('tab-gelenek');await click('[data-y="1500"]');await page.locator('h1').click();await page.keyboard.press('r');await has('yrOut','MS 500');
    eq(await page.evaluate(()=>[...document.querySelectorAll('main input,main select')].filter(e=>!(e.labels&&e.labels.length)&&!e.getAttribute('aria-label')).map(e=>e.id)),[]);
    eq(await page.evaluate(()=>[...document.querySelectorAll('main canvas')].filter(c=>c.getAttribute('role')!=='img'||!c.getAttribute('aria-label')).length),0);
    eq(await page.evaluate(()=>Object.isFrozen(DinlerTarihi)&&!Object.getOwnPropertyDescriptor(window,'DinlerTarihi').writable),true);
    eq(await page.evaluate(()=>document.querySelectorAll('img,svg image,video').length),0,'görüntü yok');
    for(const t of['alan','gelenek','metin','yapi','sayi']){await click('tab-'+t);await noflow('sekme '+t);
      eq(await page.evaluate(()=>/\d\.\d/.test([...document.querySelectorAll('.dn-stat strong,.dn-status,output,.dn-table td')].filter(e=>e.offsetParent).map(e=>e.textContent).join(' '))),false,'ondalık nokta '+t);
      if(['gelenek','metin','sayi'].includes(t))eq(await page.evaluate(k=>[...document.querySelectorAll('#panel-'+k+' canvas')].every(c=>c.width>0&&c.height>0),t),true);}
    assert.deepEqual(errors,[]);checks++;await page.close();
  }
  console.log(`G dinler tarihi: ${checks-before} tarayıcı kontrolü (390 açık / 1280 koyu; beş sekme, alıştırmalar, sınırlar, klavye) PASS`);
  }finally{await browser?.close();await new Promise(r=>server.close(r));}
}
