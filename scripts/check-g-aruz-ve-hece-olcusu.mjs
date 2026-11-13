// Aruz ve hece ölçüsü: heceleme, ağırlık, taktî motoru, hece sayacı ve sayfa için kalıcı denetim.
// Başvurular sayfanın formüllerini kullanmaz: Vikipedi "Aruz ölçüsü" (hece örnekleri, tef'ile dizileri, Bâkî'nin
// "Meddâh olalı" taktîi), Vikikaynak vezin notları, turkedebiyati.org Nef'î şerhi (tî zihafı, lâf meddi),
// TDV İslâm Ansiklopedisi "Hece Vezni" durak kalıpları, bağımsız ünlü sayacı ve kaba kuvvetle (DFS) en iyi okuma araması.
import fs from 'node:fs';
import vm from 'node:vm';
import assert from 'node:assert/strict';
const SLUG='aruz-ve-hece-olcusu';
const html=fs.readFileSync(new URL(`../${SLUG}.html`,import.meta.url),'utf8');
const source=html.split('/* KERNEL-BEGIN */')[1]?.split('/* KERNEL-END */')[0];
assert(source,'Çekirdek sınırları gerekli');
const context={window:{}};vm.createContext(context);vm.runInContext(source,context);
const K=context.window.Aruz;let checks=0;
const eq=(a,b,msg=`${a} ≠ ${b}`)=>{if(a&&typeof a==='object')a=JSON.parse(JSON.stringify(a));assert.deepEqual(a,b,String(msg));checks++;};
const ok=(c,msg)=>{assert(c,msg);checks++;};

// 0. Sayfa kabuğu
ok(/<title>([^<]+)<\/title>/.exec(html)[1].length<=80,'başlık ≤ 80');ok(html.includes(`data-page="${SLUG}"`),'data-page');ok(!/[̀-ͯ]/.test(html),'birleşik işaret yok');ok(!/<script[^>]+src="https?:/.test(html),'dış betik yok');

// 1. Heceleme ve ağırlık: Vikipedi "Aruz ölçüsü" örnekleri (bağımsız sınıflandırıcıyla).
const VOW='aeıioöuüâîû',LONG='âîû';
const indepWeight=s=>{const v=[...s].findIndex(c=>VOW.includes(c)),coda=s.slice(v+1);return coda===''?(LONG.includes(s[v])?'H':'L'):'H';};
for(const[w,sy,wt]of[['uzun','u-zun','LH'],['gülü','gü-lü','LL'],['öptü','öp-tü','HL'],['gönlüm','gön-lüm','HH'],['ârif','â-rif','HH'],['şâir','şâ-ir','HH'],['selâm','se-lâm','LH'],['türk','türk','H'],['aşk','aşk','H']]){
 const r=K.syllabifyWord(w);eq(r.map(x=>x.text).join('-'),sy,w);eq(r.map(x=>indepWeight(x.text)).join(''),wt,w+' ağırlık');}
// iki ünsüz ya da uzun ünlü + ünsüz: med adayı; uzun ünlü + n: değil (Vikipedi "devrân" notu)
const mid=w=>K.syllables(w+' ve').find(s=>s.word===0&&s.last);
eq(K.baseWeight(mid('çarh')).w,'HL');eq(K.baseWeight(mid('yâr')).w,'HL');eq(K.baseWeight(mid('devrân')).w,'H');eq(K.baseWeight(mid('dost')).w,'HL');
eq(K.baseWeight(K.syllables('gelir mi').at(-1)).w,'H','son hece hep ağır');
// vasl: "gördüm onu" → gör-dü-mo-nu (Vikipedi)
{const sy=K.syllables('gördüm onu'),r=K.readings(sy[1]);ok(r.some(x=>x.u==='L'&&x.t.includes('vasl')),'gördüm onu vasl');}
eq(K.syllables("tûtî-i mu'cize").map(s=>s.text).join('-'),"tû-tî-i-mu'-ci-ze");eq(K.syllables('dil-i nâ-şâda').map(s=>s.text).join('-'),'di-li-nâ-şâ-da');

// 2. Tef'ile dizileri: Vikipedi tablosu (. kısa, - uzun).
const WP={feulun:'. - -',failun:'- . -',mefailun2:'. - . -',failatun:'- . - -',mustefilun:'- - . -'};
for(const[k,p]of Object.entries(WP))eq(K.FEET[k].p.split('').map(c=>c==='L'?'.':'-').join(' '),p,k);
eq(K.FEET.mefailun.p,'LHHH');eq(K.FEET.mefulu.p,'HHL');eq(K.FEET.mefailu.p,'LHHL');eq(K.FEET.feilatun.p,'LLHH');eq(K.FEET.falun.p,'HH');

// 3. Yayımlanmış vezinler: her beyitte iki mısranın da en iyi kalıbı kaynağın kalıbı.
const PUB={fuzuli1:'hezec4',nedim1:'remelF',nedim2:'hezec4',baki1:'muzari',baki2:'ahreb',ahmed:'ahreb',nefi:'remelF'};
for(const p of K.ARUZ_POEMS){if(p.pub)eq(p.meter,PUB[p.id],p.id);for(const s of p.scan)eq(K.scan(s).best.meter.id,p.meter,p.id+': '+s);}
eq(K.ARUZ_POEMS.filter(p=>p.pub).length,7);eq(K.ARUZ_POEMS.length,9);
// Nef'î: "tî" zihaflı, "lâf" medli (turkedebiyati.org)
{const r=K.scan(K.ARUZ_POEMS.find(p=>p.id==='nefi').scan[0]).best;eq(r.rows.find(x=>x.text==='tî').tags.includes('zihaf'),true);eq(r.rows.find(x=>x.text==='lâf').units,'HL');eq(r.licences.zihaf,1);
 const r2=K.scan(K.ARUZ_POEMS.find(p=>p.id==='nefi').scan[1]).best;eq(r2.licences.zihaf,0,'âyine: şerhe göre ikinci hece uzatılmaz');eq(r2.cost,2);eq(r2.licences.med,1);}
// Bâkî: Vikipedi tef'ile bölmesi "Meddâh o/lalı çeşm-i/ gazâlâne/ne Bâki", "Öğrendi/ gazel tarzı/nı Rûm'un şu/'arâsi"
{const P=K.ARUZ_POEMS.find(p=>p.id==='baki2');const WPF=[['meddâho','lalıçeşmi','gazâlâne','nebâkî'],['öğrendi','gazeltarzı',"nırûmunşu","'arâsı"]];
 P.scan.forEach((s,i)=>{const r=K.scan(s).best,txt=r.feet.map((f,fi)=>r.rows.filter(x=>x.foot===fi).map(x=>x.text).join(''));eq(txt.join('|'),WPF[i].join('|'),'Bâkî bölme '+i);});}
// Fuzûlî "Beni candan": iki imâle (be-ni, usandır-dı); ikinci mısra ödünsüz
{const P=K.ARUZ_POEMS[0];const a=K.scan(P.scan[0]).best,b=K.scan(P.scan[1]).best;eq(a.rows.filter(r=>r.tags.includes('imale')).map(r=>r.text),['ni','dı']);eq(b.cost,0);}
// Zorlanmış kalıp: Fuzûlî mısraı remel 4'e sığmaz
eq(K.scanMeter(K.ARUZ_POEMS[0].scan[0],'remel4').fits,false);

// 4. Bağımsız kaba kuvvet: her mısra × her kalıp türevi için DFS ile en düşük bedel = dinamik programlama sonucu.
function brute(sy,pat){let best=Infinity;const R=sy.map(K.readings);(function go(i,j,c){if(c>=best)return;if(i===sy.length){if(j===pat.length)best=c;return;}for(const r of R[i])if(pat.startsWith(r.u,j))go(i+1,j+r.u.length,c+r.c);})(0,0,0);return best;}
const LINES=[...K.ARUZ_POEMS.flatMap(p=>p.scan),...K.HECE_POEMS.flatMap(p=>p.lines),'gördüm onu sevdim','dost yâr ile'];
for(const l of LINES){const sy=K.syllables(l);for(const m of K.METERS)for(const v of K.variants(m)){const a=K.align(sy,v.pattern),b=brute(sy,v.pattern);eq(a?a.cost:Infinity,b===Infinity?Infinity:Math.round(b*100)/100,l+' / '+m.id);
 if(a){eq(a.used.reduce((s,u)=>s+u.u.length,0),v.pattern.length);eq(a.used.map(u=>u.u).join(''),v.pattern);}}}

// 5. Hece ölçüsü: bağımsız ünlü sayacı ve TDV durak kalıpları.
const count=l=>(l.toLocaleLowerCase('tr-TR').match(/[aeıioöuüâîû]/g)||[]).length;
const EXPECT={karaca9:11,karaca8:11,karaca4:8,yunus:8,muhyiddin:7,emin:11};
for(const p of K.HECE_POEMS)for(const l of p.lines){eq(K.hece(l).total,count(l),l);eq(K.hece(l).total,EXPECT[p.id],p.id+' ölçü');}
eq(K.DURAK[11].map(x=>x.join('+')),['6+5','4+4+3']);eq(K.DURAK[14].map(x=>x.join('+')),['7+7']);ok(K.DURAK[7].some(x=>x.join('+')==='4+3')&&K.DURAK[8].some(x=>x.join('+')==='4+4'),'7 ve 8');
const okp=l=>K.hece(l).patterns.filter(x=>x.ok).map(x=>x.name);
eq(okp('Elâ gözlerini sevdiğim dilber'),['6+5']);eq(okp('Yurtlarınız çayır çimen pınar mı'),['6+5','4+4+3']);eq(okp('Seni gören başkasını dener mi'),['4+4+3']);eq(okp('Ben bir Türküm; dinim, cinsim uludur;'),['6+5','4+4+3']);eq(okp('Muhyeddin’im dervişim'),['4+3']);
eq(K.durakSplit('Ilgıt ılgıt esen seher yelleri',[3]).name,'6+5');eq(K.durakSplit('Ilgıt ılgıt esen seher yelleri',[3]).known,true);eq(K.durakSplit('Ilgıt ılgıt esen seher yelleri',[2]).known,false);eq(K.durakSplit('Ilgıt ılgıt esen seher yelleri',[2,4]).name,'4+4+3');

// 6. Karşılaştırma tablosu
{const C=K.compareAll(),ar=C.filter(r=>r.kind==='aruz'),he=C.filter(r=>r.kind==='hece');eq(ar.length,18);eq(he.length,24);eq(ar.reduce((a,r)=>a+r.imale,0),18);eq(ar.reduce((a,r)=>a+r.zihaf,0),1);eq(he.filter(r=>r.meter&&r.cost<=2).length,2);eq(Math.min(...ar.map(r=>r.syl)),14);eq(Math.max(...ar.map(r=>r.syl)),16);
 let iz=0,tr=0;for(const p of K.ARUZ_POEMS)for(const s of p.scan)for(const r of K.scan(s).best.rows)if(r.tags.includes('imale'))r.izafet?iz++:tr++;eq([tr,iz],[11,7],'imâle: Türkçe / tamlama-bağlaç');}

// 7. Hatalar
for(const call of[()=>K.syllables(''),()=>K.syllables('krt bir'),()=>K.scanMeter('gel','yok'),()=>K.hece('...')]){assert.throws(call);checks++;}
console.log(`Aruz ve hece ölçüsü: ${checks.toLocaleString('tr-TR')} heceleme, kalıp, yayımlanmış vezin, kaba kuvvet, hece ve karşılaştırma kontrolü PASS`);

if(process.argv.includes('--browser')){
 const {chromium}=await import('playwright');const {createServer}=await import('node:http');const {join,extname}=await import('node:path');const {fileURLToPath}=await import('node:url');const root=fileURLToPath(new URL('../',import.meta.url));
 const server=createServer((req,res)=>{const file=join(root,decodeURIComponent(new URL(req.url,'http://localhost').pathname));if(!fs.existsSync(file)||fs.statSync(file).isDirectory()){res.writeHead(404).end();return;}res.setHeader('Content-Type',({'.html':'text/html; charset=utf-8','.js':'text/javascript; charset=utf-8','.css':'text/css; charset=utf-8'})[extname(file)]||'application/octet-stream');res.end(fs.readFileSync(file));});
 await new Promise(r=>server.listen(0,'127.0.0.1',r));let browser;const before=checks;assert(fs.existsSync(new URL(`../shared/digest/${SLUG}.js`,import.meta.url)),'defter dosyası gerekli');
 try{browser=await chromium.launch();
  for(const[width,theme]of[[390,'light'],[1280,'dark']]){const page=await browser.newPage({viewport:{width,height:900},deviceScaleFactor:2});await page.addInitScript(t=>{localStorage.setItem('acelya-theme',t);localStorage.setItem('acelya-sound-muted','1');},theme);page.setDefaultTimeout(5000);const errors=[];page.on('pageerror',e=>errors.push(e.message));page.on('console',m=>{if(m.type()==='error')errors.push(m.text()+' '+(m.location().url||''));});
   await page.goto(`http://127.0.0.1:${server.address().port}/${SLUG}.html`);await page.waitForTimeout(300);
   const read=id=>page.locator('#'+id).textContent(),has=async(id,t)=>{const x=await read(id);assert(x.includes(t),id+': '+x+' / '+t);checks++;},click=id=>page.locator('#'+id).click();
   // 1. sekme
   eq(await page.locator('#wChips button').count(),14);await has('wScore','işaretlenen 0 / 14');await page.locator('#wChips button').first().click();await has('wChips','.');await click('wCheck');await has('wScore','1 / 14');await click('wShow');await has('wScore','14 / 14');await has('wPattern','. . – –');await has('wWhy','mısranın son hecesi');
   await page.locator('#wInput').fill('yâr dost cân');eq(await page.locator('#wChips button').count(),3);await click('wShow');await has('wPattern','–. –. –');await page.locator('#wInput').fill('krt');await has('wStatus','Yalnız harflerden');await click('wReset');eq(await page.locator('#wChips button').count(),14);
   // 2. sekme
   await click('tab-aruz');await has('aBest',"mefâ'îlün mefâ'îlün mefâ'îlün mefâ'îlün");await has('aCost','2');await has('aLic','2 imâle');await has('aStatus','aynı kalıbı buldu');eq(await page.locator('#aFeet .ar-foot').count(),4);eq(await page.locator('#aFeet .ar-cell.imale').count(),2);
   await page.locator('#aMeter').selectOption('remel4');await has('aStatus','hiçbir ödünle sığmıyor');await page.locator('#aMeter').selectOption('');
   await page.locator('#aPoem').selectOption(String(K.ARUZ_POEMS.findIndex(p=>p.id==='nefi')));await has('aLic','1 zihaf');eq(await page.locator('#aFeet .ar-cell.zihaf').count(),1);eq(await page.locator('#aFeet .ar-cell.medtail').count(),1);await has('aCost','3');
   await page.locator('#aPoem').selectOption(String(K.ARUZ_POEMS.findIndex(p=>p.id==='kemal')));await has('aStatus','motorun bulduğudur');
   await page.locator('#aPoem').selectOption(String(K.ARUZ_POEMS.findIndex(p=>p.id==='nedim2')));await has('aLic','1 med');await page.locator('#aLine').selectOption('1');await has('aCost','1');
   await page.locator('#aInput').fill('ılgıt ılgıt esen seher yelleri');await has('aStatus','hiçbir kalıba sığmıyor');await page.locator('#aInput').fill('ey fitnesi çok kavli yalan yandum elünden');await has('aBest',"mef'ûlü mefâ'îlü");await has('aStatus','Kendi yazdığın');
   await page.locator('#aInput').blur();await page.locator('body').click({position:{x:2,y:300}});await page.keyboard.press('r');await has('aCost','2');
   // 3. sekme
   await click('tab-hece');await has('hTotal','?');await page.locator('#hGuess').fill('11');await page.locator('#hWords button[data-gap="3"]').click();await click('hCheck');await has('hVerdict','Hece sayın doğru: 11');await has('hVerdict','6+5: bu sayının bilinen');await has('hParts','6 + 5');
   await page.locator('#hWords button[data-gap="3"]').click();await page.locator('#hWords button[data-gap="2"]').click();await has('hVerdict','tablodaki kalıplardan biri değil');
   await page.locator('#hPoem').selectOption(String(K.HECE_POEMS.findIndex(p=>p.id==='muhyiddin')));await click('hShow');await has('hTotal','7');await has('hParts','4 + 3');await has('hForm','mâni');
   await page.locator('#hPoem').selectOption(String(K.HECE_POEMS.findIndex(p=>p.id==='karaca8')));await page.locator('#hLine').selectOption('3');await click('hShow');await has('hParts','4 + 4 + 3');await click('hReset');await has('hTotal','?');
   // 4. sekme
   await click('tab-compare');eq(await page.locator('#cRows tr').count(),42);await has('cImale','18 / 18');await has('cZihaf','1');await has('cFit','2 / 24');await has('cRange','14–16');await click('cHece');eq(await page.locator('#cRows tr').count(),24);await click('cAruz');eq(await page.locator('#cRows tr').count(),18);
   // klavye, erişilebilirlik, taşma
   await page.locator('#tab-compare').focus();await page.keyboard.press('Home');eq(await page.locator('#tab-weight').getAttribute('aria-selected'),'true');await page.keyboard.press('ArrowLeft');eq(await page.locator('#tab-compare').getAttribute('aria-selected'),'true');await page.keyboard.press('ArrowRight');eq(await page.locator('#tab-weight').getAttribute('aria-selected'),'true');
   eq(await page.evaluate(()=>[...document.querySelectorAll('input,select')].filter(e=>!e.closest('.digest')).every(e=>document.querySelector('label[for="'+e.id+'"]'))),true,'etiketsiz denetim');
   for(const t of['weight','aruz','hece','compare']){await click('tab-'+t);eq(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),true,'taşma '+t+' '+width);}
   eq(await page.evaluate(()=>Object.isFrozen(Aruz)&&!Object.getOwnPropertyDescriptor(window,'Aruz').writable),true);
   await page.locator('#kesif-defteri').waitFor({state:'visible',timeout:8000});eq(await page.locator('#kesif-defteri').isVisible(),true,'defter görünür');assert.deepEqual(errors,[]);checks++;await page.close();}
  console.log(`Aruz ve hece ölçüsü: ${checks-before} tarayıcı kontrolü (390 açık, 1280 koyu) PASS (defter görünür)`);
 }finally{await browser?.close();await new Promise(r=>server.close(r));}
}
