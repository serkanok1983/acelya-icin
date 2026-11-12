// Türkçenin ses yapısı: ek motoru, ünlü uyumu, hece ve TDK verisi için kalıcı denetim.
// Başvurular sayfanın formüllerini kullanmaz: TDK yazım kuralları sayfalarındaki ve Zeynep Korkmaz'ın (Türk Dili, Şubat 2021)
// örnekleri, Wikipedia "Turkish phonology"/"Vowel harmony" örnekleri, 12 Kasım 2026'da TDK Güncel Türkçe Sözlük'ten alınan
// madde başı ekleri ve küme tabanlı bağımsız bir uyum denetleyicisi.
import fs from 'node:fs';
import vm from 'node:vm';
import assert from 'node:assert/strict';
const html=fs.readFileSync(new URL('../turkcenin-ses-yapisi.html',import.meta.url),'utf8');
const source=html.split('/* KERNEL-BEGIN */')[1]?.split('/* KERNEL-END */')[0];
assert(source,'Çekirdek sınırları gerekli');
const context={window:{}};vm.createContext(context);vm.runInContext(source,context);
const K=context.window.TurkishPhonology;let checks=0;
const eq=(a,b,msg=`${a} ≠ ${b}`)=>{assert.equal(a,b,String(msg));checks++;};
const D=(w,p,k,o)=>K.derive(w,p,k,o).form;

// 1. Kaynaklardaki tam biçimler (her satırın sonunda kaynak).
const FORMS=[
 ['saat','n',['DAT'],'saate'],['santral','n',['PL'],'santraller'],['alkol','n',['ACC'],'alkolü'],['hakikat','n',['ACC'],'hakikati'],['helal','n',['P1P'],'helalimiz'], // TDK büyük ünlü uyumu
 ['idrak','n',['ACC'],'idraki'],['meçhul','n',['DAT'],'meçhule'],['mentol','n',['LOC'],'mentolde'],['sembol','n',['PL'],'semboller'],['akşam','n',['LEYIN'],'akşamleyin'],['bakla','n',['GIL','PL'],'baklagiller'],['din','n',['DER_DAS'],'dindaş'],['meslek','n',['DER_DAS'],'meslektaş'],['akşam','n',['KI'],'akşamki'],['duvar','n',['LOC','KI'],'duvardaki'],['yol','n',['LOC','KI'],'yoldaki'],['anne','n',['P3S'],'annesi'],['kardeş','n',['DER_LIK'],'kardeşlik'],['şişman','n',['DER_LIK'],'şişmanlık'],['adalet','n',['DER_LI'],'adaletli'],['çalış','v',['AOR_IR','KEN'],'çalışırken'],['yürü','v',['PROG'],'yürüyor'], // TDK büyük ünlü uyumu
 ['kavun','n',['P3S'],'kavunu'],['konsolos','n',['DER_LIK'],'konsolosluk'],['muzır','n',['DER_LIK'],'muzırlık'],['müzik','n',['DER_CI'],'müzikçi'],['yağmur','n',['DER_LIK'],'yağmurluk'],['alkol','n',['DER_LI'],'alkollü'],['kabul','n',['ACC'],'kabulü'],['bandrol','n',['DER_LI'],'bandrollü'],['saat','n',['DER_LIK'],'saatlik'],['bugün','n',['KI'],'bugünkü'],['dün','n',['KI'],'dünkü'],['öbür','n',['KI'],'öbürkü'], // TDK küçük ünlü uyumu
 ['başla','v',['PROG'],'başlıyor'],['bekle','v',['PROG'],'bekliyor'],['ye','v',['FUT'],'yiyecek'],['burun','n',['P3S'],'burnu'],['omuz','n',['P3S'],'omzu'], // Korkmaz 2021
 ['şev','n',['LOC'],'şevde'],['şef','n',['LOC'],'şefte'],['ağaç','n',['DER_LIK'],'ağaçlık'],['dağ','n',['GEN'],'dağın'],['ip','n',['PL','P3S','GEN'],'iplerinin'],['el','n',['PL','GEN'],'ellerin'],['kız','n',['PL','GEN'],'kızların'],['roma','n',['LOC','KEN'],'romadayken'],['dün','n',['KI'],'dünkü'],['sön','v',['PROG'],'sönüyor'],['voleybol','n',['DER_CI'],'voleybolcu'],['kapı','n',['DIR'],'kapıdır'],['gün','n',['DIR'],'gündür'],['karpuz','n',['DIR'],'karpuzdur'],['rol','n',['DAT'],'role'], // Wikipedia
 // Okul dil bilgisi örnekleri (TDK sözlük ekleriyle tutarlı): yumuşama, ikizleşme, kaynaştırma, zamir n'si, kişi ekleri.
 ['kitap','n',['ACC'],'kitabı'],['kitap','n',['P3S','LOC'],'kitabında'],['kitap','n',['DER_CI'],'kitapçı'],['kitap','n',['DER_LIK','P3S'],'kitaplığı'],['araba','n',['P3S','ACC'],'arabasını'],['araba','n',['INS'],'arabayla'],['kalem','n',['INS'],'kalemle'],['su','n',['P3S'],'suyu'],['su','n',['GEN'],'suyun'],['hak','n',['ACC'],'hakkı'],['tıp','n',['ACC'],'tıbbı'],['kayıp','n',['ACC'],'kaybı'],['renk','n',['ACC'],'rengi'],['millet','n',['ACC'],'milleti'],['oğul','n',['P3S'],'oğlu'],['ağız','n',['P3S'],'ağzı'],['gök','n',['P3S'],'göğü'],['at','n',['ACC'],'atı'],['tat','n',['ACC'],'tadı'],['psikolog','n',['ACC'],'psikoloğu'],
 ['git','v',['PROG','Z1S'],'gidiyorum'],['gitmek','v',['PST','K1P'],'gittik'],['git','v',['FUT','Z1S'],'gideceğim'],['söyle','v',['PROG'],'söylüyor'],['oyna','v',['PROG'],'oynuyor'],['de','v',['PROG'],'diyor'],['ye','v',['PROG'],'yiyor'],['de','v',['FUT','Z1S'],'diyeceğim'],['gel','v',['NEG','PROG'],'gelmiyor'],['kork','v',['NEG','PROG','Z1P'],'korkmuyoruz'],['oku','v',['PROG'],'okuyor'],['gel','v',['EV','Z1S'],'gelmişim'],['bak','v',['PST','K3P'],'baktılar'],['iç','v',['INF'],'içmek']];
for(const[w,p,k,e]of FORMS)eq(D(w,p,k),e,w+' + '+k.join('+'));
const AOR=[['gel',{},'gelir'],['al',{},'alır'],['at',{},'atar'],['git',{},'gider'],['et',{},'eder'],['oku',{},'okur'],['ye',{},'yer'],['çalış',{},'çalışır'],['seyret',{},'seyreder'],['gel',{neg:true},'gelmez'],['gel',{neg:true,person:'1s'},'gelmem'],['gel',{neg:true,person:'1p'},'gelmeyiz'],['gel',{neg:true,person:'2p'},'gelmezsiniz'],['gel',{person:'2p'},'gelirsiniz'],['gör',{person:'ken'},'görürken']];
for(const[w,o,e]of AOR)eq(D(w,'v',K.verbChain(w,{tense:'AOR',...o})),e,w+' geniş zaman');

// 2. TDK verisi: elle denetlenmiş madde başı ekleri sayfadaki tabloyla aynı olmalı; motor her satırda TDK biçimini vermeli.
const TDK_SPOT={kitap:'bı',saat:'ti',his:'ssi',uç:'cu',hak:'kkı',ret:'ddi',tıp:'bbı',burun:'rnu',ağız:'ğzı',renk:'gi',kalp:'bi',alkol:'lü',su:'yu',ok:'',at:'',süt:'',millet:'',devlet:'',sanat:'',bulut:'',dikkat:'ti',kâğıt:'dı',merak:'',hukuk:'',idrak:'ki',gök:'ğü',kurt:'du',omuz:'mzu',oğul:'ğlu',sır:'rrı',futbol:'',kontrol:'lü',kanaat:'ti',inşaat:''};
const nouns=Object.fromEntries(K.TDK_NOUNS.map(r=>[r[0],r]));
for(const[w,t]of Object.entries(TDK_SPOT))eq(nouns[w]?.[1],t,'TDK eki '+w);
eq(K.TDK_NOUNS.length,188);eq(K.TDK_VERBS.length,48);
const independentTaki=(w,t)=>{if(!t)return null;const hard={b:'p',c:'ç',d:'t',ğ:'k',g:'k'};for(let i=w.length-1;i>=w.length-3;i--)if(w[i]===t[0]||hard[t[0]]===w[i]||(t[0]==='ğ'&&w[i]==='g'))return w.slice(0,i)+t;return w+t;};
const VOW='aeıioöuüâ',BACK='aıouâ',ROUND='oöuü';
const regularAcc=w=>{const vs=[...w].filter(c=>VOW.includes(c)),v=vs[vs.length-1],back=BACK.includes(v),round=ROUND.includes(v);return w+(back?(round?'u':'ı'):(round?'ü':'i'));};
for(const[w,t]of K.TDK_NOUNS){if(VOW.includes(w.slice(-1)))continue;eq(D(w,'n',['ACC']),independentTaki(w,t)??regularAcc(w),'TDK biçimi '+w);}
const aorTdk=(s,t)=>VOW.includes(t[0])||VOW.includes(s.slice(-1))?s+t:s.slice(0,-1)+t;
for(const[inf,t]of K.TDK_VERBS){if(!t)continue;const s=inf.slice(0,-3);eq(D(s,'v',K.verbChain(s,{tense:'AOR'})),aorTdk(s,t),'TDK geniş zaman '+inf);}
const ruleMiss=K.verbRows().filter(v=>v.match===false).map(v=>v.stem).sort();
assert.equal(JSON.stringify(ruleMiss),JSON.stringify([...K.AOR_IR_ROOTS,'git','et','güt','tat','seyret','hisset','kaybet','affet'].sort()));checks++;
eq(K.AOR_IR_ROOTS.length,13);
const S=K.stats();eq(S.poly.n+S.mono.n+S.other.n,S.all.n);eq(S.all.n,187);eq(S.poly.match,51);eq(S.poly.n,79);eq(S.mono.match,21);eq(S.mono.n,46);eq(S.byLetter.t.poly.match,9);eq(S.byLetter.t.poly.n,31);
for(const r of K.compareNouns()){eq(r.match,r.rule===r.tdk);eq(r.tdk,independentTaki(r.word,r.taki)??regularAcc(r.word));}

// 3. Bağımsız küme tabanlı uyum denetleyicisi.
const major=w=>{const v=[...w].filter(c=>VOW.includes(c)).map(c=>c==='â'?'a':c);return v.every(c=>BACK.includes(c))||v.every(c=>!BACK.includes(c));};
const minor=w=>{const v=[...w].filter(c=>VOW.includes(c)).map(c=>c==='â'?'a':c);for(let i=1;i<v.length;i++){const ok=ROUND.includes(v[i-1])?'aeuü'.includes(v[i]):'aeıi'.includes(v[i]);if(!ok)return false;}return true;};
for(const w of'adım ayak boyunduruk burun dalga dudak kırlangıç beşik bilezik gelincik gözlük üzengi vergi yüzük'.split(' '))eq(K.harmony(w).major,true,w);
for(const w of'anne dahi elma hangi hani inanmak kardeş şişman ahenk badem ceylan çiroz dükkân fidan gazete hamsi kestane limon model açıkgöz bilgisayar çekyat hanımeli'.split(' '))eq(K.harmony(w).major,false,w);
for(const w of'anlaşmalı bilek çilek ısırmak ılıklaşmak kayıkçı seslenmek yeşil boyunduruk börekçi çocuk güreşmek ocakçı odun özlemek sürmek vurmak yoklamak yorgunluk yumurta yüreksiz'.split(' '))eq(K.harmony(w).minor,true,w);
for(const w of'avuç avurt çamur kabuk kavuk kavun kavurmak kavuşmak savurmak yağmur aktör alkol bandrol daktilo kabul doktor muzır mühim mümin müzik profesör radyo vakur'.split(' '))eq(K.harmony(w).minor,false,w);
const V8='aeıioöuü';for(const a of V8)for(const b of V8)for(const c of V8){const w='k'+a+'l'+b+'m'+c;eq(K.harmony(w).major,major(w),w);eq(K.harmony(w).minor,minor(w),w);}
// Ek ünlüleri ve D: her ad ve iki ek için bağımsız kural (ince ek alan alıntılar ayrı).
for(const[w]of K.TDK_NOUNS){const lx=K.LEXICON.n[w];if(lx.front)continue;const f=D(w,'n',['LOC']),stem=f.slice(0,-2),last=stem.slice(-1),vs=[...stem].filter(c=>VOW.includes(c));eq(f.slice(-2),('çfhkpsşt'.includes(last)?'t':'d')+(BACK.includes(vs[vs.length-1])?'a':'e'),w+'+DA');}
for(const w of['saat','kalp','alkol','santral','dikkat'])eq('eiöü'.includes(D(w,'n',['PL']).slice(-2,-1)),true,w+' ince ek');

// 4. Hece: TDK ve Korkmaz örnekleri.
for(const s of'a-ra-ba bi-çi-mi-ne in-sa-nın ka-ra-ca al-dı bir-lik sev-mek alt-lık türk-çe kork-mak band-rol kont-rol port-re prog-ram sant-ral sürp-riz tund-ra volf-ram ba-şöğ-ret-men il-ko-kul ör-tü yır-tık bu-nalt-mak tu-ta-nak yo-rul-mak sa-at'.split(' '))eq(K.syllabify(s.replace(/-/g,'')).syllables.join('-'),s);
for(const[w,t]of[['o','V'],['ay','VC'],['bu','CV'],['söz','CVC'],['üst','VCC'],['kalk','CVCC']]){const r=K.syllabify(w);eq(r.types[0],t);eq(r.native,true);}
for(const w of['tren','spor','plan'])eq(K.syllabify(w).native,false,w);

// 5. Sınama: doğru biçim elle yazılmış listeyle aynı; çeldiriciler farklı ve her biri tek bir kural kapatılınca çıkar.
const QZ=['kitabı','saatine','ağaçta','burnu','renginde','hakkı','kalpte','milletinden','çocuklarına','suyu','arabasında','alkolü','gidiyorum','başlıyor','alırız','tadar','yiyecek','korkmuyoruz','oğlu','kâğıdı'];
eq(K.QUIZ.length,QZ.length);
K.QUIZ.forEach((_,i)=>{const q=K.quizOptions(i);eq(q.correct,QZ[i]);assert(q.options.length>=3,'en az üç seçenek '+QZ[i]);checks++;eq(new Set(q.options.map(o=>o.form)).size,q.options.length);eq(q.options.filter(o=>!o.missing).length,1);
 for(const o of q.options.filter(o=>o.missing)){const keys=o.missing==='lexicon'?K.quizChain(i,false):K.quizChain(i);eq(D(K.QUIZ[i][0],K.QUIZ[i][1],keys,{off:[o.missing]}),o.form);}});

// 6. Kural kapatınca beklenen bozulmalar ve hatalar.
eq(D('kitap','n',['ACC'],{off:['softening']}),'kitapı');eq(D('ağaç','n',['LOC'],{off:['assimilation']}),'ağaçda');eq(D('araba','n',['ACC'],{off:['buffer']}),'arabaı');eq(D('burun','n',['P3S'],{off:['drop']}),'burunu');eq(D('başla','v',['PROG'],{off:['narrowing']}),'başlayor');eq(D('saat','n',['PL'],{off:['lexicon']}),'saatlar');eq(D('kız','n',['PL'],{off:['harmony']}),'kızler');
eq(D('yatak','n',['ACC']),'yatağı');eq(K.derive('yatak','n',['ACC']).known,false);eq(D('gelmek','v',['PROG']),'geliyor');
for(const call of[()=>K.derive('','n',['ACC']),()=>K.derive('x1','n',[]),()=>K.derive('krt','n',['ACC']),()=>K.derive('ev','q',[]),()=>K.derive('ev','n',['NOPE']),()=>K.verbChain('gel',{tense:'X'})]){assert.throws(call);checks++;}
console.log(`Türkçenin ses yapısı: ${checks.toLocaleString('tr-TR')} kaynak biçimi, TDK verisi, bağımsız uyum, hece ve sınama kontrolü PASS`);

if(process.argv.includes('--browser')){
 const {chromium}=await import('playwright');const {createServer}=await import('node:http');const {join,extname}=await import('node:path');const {fileURLToPath}=await import('node:url');const root=fileURLToPath(new URL('../',import.meta.url));
 const server=createServer((req,res)=>{const file=join(root,decodeURIComponent(new URL(req.url,'http://localhost').pathname));if(!fs.existsSync(file)||fs.statSync(file).isDirectory()){res.writeHead(404).end();return;}res.setHeader('Content-Type',({'.html':'text/html; charset=utf-8','.js':'text/javascript; charset=utf-8','.css':'text/css; charset=utf-8'})[extname(file)]||'application/octet-stream');res.end(fs.readFileSync(file));});
 await new Promise(r=>server.listen(0,'127.0.0.1',r));let browser;const before=checks;
 try{browser=await chromium.launch();
  for(const[width,theme]of[[390,'light'],[1280,'dark']]){const page=await browser.newPage({viewport:{width,height:900},deviceScaleFactor:2});await page.addInitScript(t=>{localStorage.setItem('acelya-theme',t);localStorage.setItem('acelya-sound-muted','1');},theme);page.setDefaultTimeout(5000);const errors=[];page.on('pageerror',e=>errors.push(e.message));page.on('console',m=>{if(m.type()==='error')errors.push(m.text()+' '+(m.location().url||''));});
   await page.goto(`http://127.0.0.1:${server.address().port}/turkcenin-ses-yapisi.html`);
   // Defter: 404 hoş görülmez; yüklenmiş ve görünür olmalı.
   await page.waitForSelector('section.digest',{state:'visible',timeout:15000});eq(await page.evaluate(()=>!!window.ACELYA_DIGEST?.['turkcenin-ses-yapisi']&&/Türkçenin Ses Yapısı/.test(document.querySelector('section.digest').textContent)),true,'defter yüklü ve görünür');
   const read=id=>page.locator('#'+id).textContent(),has=async(id,t)=>{const x=await read(id);assert(x.includes(t),id+': '+x+' / '+t);checks++;},type=async(id,v)=>{await page.locator('#'+id).fill(v);},click=id=>page.locator('#'+id).click();
   // 1. sekme
   await has('vSel','a');await has('vI','ı');await click('flipRound');await has('vSel','o');await has('vI','u');await click('flipBack');await has('vSel','ö');await has('vA','e');await page.locator('#vButtons button',{hasText:/^ü$/}).click();await has('vFeat','ince, yuvarlak, dar');await page.locator('#cube .node[data-v="ı"]').click();await has('vSel','ı');await page.locator('#cubeSet').selectOption('I');await has('vStatus','dar yüzünü');eq(await page.locator('#cube .edge.on').count(),4);await click('vowelReset');await has('vSel','a');
   await has('hwSyl','bo-yun-du-ruk');await has('hwStatus','Büyük ünlü uyumu: uyar');await type('hwWord','kardeş');await has('hwStatus','Büyük ünlü uyumu: uymaz');await type('hwWord','kavun');await has('hwStatus','Küçük ünlü uyumu: uymaz');await type('hwWord','tren');await has('hwStatus','alıntı');await type('hwWord','x1');await has('hwStatus','Yalnız Türkçe');await type('hwWord','kontrol');await has('hwSyl','kont-rol');await click('hwReset');await has('hwSyl','bo-yun-du-ruk');
   // 2. sekme
   await click('tab-engine');await has('egForm','kitabında');await has('egSource','TDK: kitap, -bı');await has('egSteps','ünsüz yumuşaması');await has('egSteps','zamir n’si');
   await page.locator('#egPresets button',{hasText:'saatler'}).click();await has('egForm','saatler');await has('egSteps','ince ek alan alıntı');await page.locator('#rule-lexicon').uncheck();await has('egForm','saatlar');await has('egStatus','Kapalı kural');await page.locator('#rule-lexicon').check();
   await page.locator('#egPresets button',{hasText:'gidiyorum'}).click();await has('egForm','gidiyorum');eq(await page.locator('#verbSlots').isVisible(),true);eq(await page.locator('#nounSlots').isVisible(),false);await page.locator('#egTense').selectOption('INF');eq(await page.locator('#egPerson').isDisabled(),true);await has('egForm','gitmek');await page.locator('#egTense').selectOption('AOR');await has('egForm','gider');
   await page.locator('#egPresets button',{hasText:'gelmeyiz'}).click();await has('egForm','gelmeyiz');await page.locator('#egPerson').selectOption('');await has('egForm','gelmez');await page.locator('#egNeg').uncheck();await has('egForm','gelir');await has('egStatus','13 fiilden');await page.locator('#egTense').selectOption('PST');await page.locator('#egPerson').selectOption('ken');await has('egForm','geldiyken');await has('egStatus','standart Türkçe değildir');await page.locator('#egTense').selectOption('EV');await has('egForm','gelmişken');await has('egStatus','standart yazı dilinde');
   await page.locator('#egPresets button',{hasText:'başlıyor'}).click();await page.locator('#rule-narrowing').uncheck();await has('egForm','başlayor');await page.locator('#egPresets button',{hasText:'diyecek'}).click();await has('egForm','diyecek');
   await click('egReset');await page.locator('#egPos').selectOption('n');await type('egWord','yatak');await page.locator('#egPoss').selectOption('');await page.locator('#egCase').selectOption('ACC');await has('egForm','yatağı');await has('egSource','Sözlükte yok');await type('egWord','123');await has('egStatus','yalnız Türkçe');await type('egWord','ev');await page.locator('#egCase').selectOption('LOC');await page.locator('#egLast').selectOption('KI');await has('egForm','evdeki');
   await page.locator('#egWord').blur();await page.keyboard.press('r');await has('egForm','kitabında');
   // 3. sekme
   await click('tab-data');await has('stPoly','51 / 79');await has('stMono','21 / 46');await has('stT','9 / 31');await has('stAor','17 / 38');eq(await page.locator('#dtRows tr').count(),187);await page.locator('#dtFilter').selectOption('drop');await has('dtRows','burnu');await has('dtStatus','Gösterilen');await page.locator('#dtFilter').selectOption('front');await has('dtRows','saati');await type('dtSearch','kalp');eq(await page.locator('#dtRows tr').count(),1);await click('dtReset');eq(await page.locator('#dtRows tr').count(),187);eq(await page.locator('#vbRows tr').count(),48);
   // 4. sekme
   await click('tab-quiz');await has('qzCounter','Soru 1 / 20');await page.locator('#qzOptions button',{hasText:/^kitapı$/}).click();await has('qzFeedback','Doğru biçim: kitabı');await has('qzFeedback','ünsüz yumuşaması');await has('qzScore','0');eq(await page.locator('#qzOptions button[disabled]').count(),3);await click('qzNext');await has('qzCounter','Soru 2 / 20');await page.locator('#qzOptions button',{hasText:/^saatine$/}).click();await has('qzScore','1');await has('qzDone','2 / 20');await click('qzReset');await has('qzScore','0');await has('qzCounter','Soru 1 / 20');
   // klavye, erişilebilirlik, taşma
   await page.locator('#tab-quiz').focus();await page.keyboard.press('Home');eq(await page.locator('#tab-vowel').getAttribute('aria-selected'),'true');await page.keyboard.press('ArrowLeft');eq(await page.locator('#tab-quiz').getAttribute('aria-selected'),'true');await page.keyboard.press('End');await page.keyboard.press('ArrowRight');eq(await page.locator('#tab-vowel').getAttribute('aria-selected'),'true');
   eq(await page.evaluate(()=>[...document.querySelectorAll('input,select')].filter(e=>!e.closest('.digest')).every(e=>document.querySelector('label[for="'+e.id+'"]'))),true,'etiketsiz denetim');
   for(const t of['vowel','engine','data','quiz']){await click('tab-'+t);eq(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),true,'taşma '+t+' '+width);}
   eq(await page.evaluate(()=>Object.isFrozen(TurkishPhonology)&&!Object.getOwnPropertyDescriptor(window,'TurkishPhonology').writable),true);
   assert.deepEqual(errors,[]);checks++;await page.close();}
  console.log(`Türkçenin ses yapısı: ${checks-before} tarayıcı kontrolü (390 açık, 1280 koyu) PASS`);
 }finally{await browser?.close();await new Promise(r=>server.close(r));}
}
