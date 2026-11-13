// Felsefi düşünce deneyleri: çekirdeğin bağımsız denetimi.
// Başvurular sayfanın yollarını yinelemez: ilkelerin öngörüleri durumların özniteliklerinden (ölüm araç mı, kişisel güç
// var mı) türetilir; eşleşmeler bütün yanıt bileşimleri için ayrıca sayılır; kesinlik eşdeğerleri kapalı biçimlerle
// (geometrik, harmonik ortalama) ve güç ortalaması eşitsizliğiyle; seçimler kaba kuvvetle; yayımlanmış sayılar açılan
// kaynaklardan (Awad ve ark. 2020 PNAS; Wikipedia'nın aktardığı 2009 PhilPapers anketi).
import fs from 'node:fs';
import vm from 'node:vm';
import assert from 'node:assert/strict';
const SLUG='felsefi-dusunce-deneyleri';
const html=fs.readFileSync(new URL(`../${SLUG}.html`,import.meta.url),'utf8');
const source=html.split('/* KERNEL-BEGIN */')[1]?.split('/* KERNEL-END */')[0];
assert(source,'Çekirdek sınırları gerekli');
const context={window:{}};vm.createContext(context);vm.runInContext(source,context);
const K=context.window.ThoughtExp;let checks=0;
const eq=(a,b,m)=>{const x=JSON.stringify(a),y=JSON.stringify(b);assert(x===y,(m?m+': ':'')+x+' ≠ '+y);checks++;},ok=(c,m)=>{assert(c,m);checks++;};
const near=(a,b,tol,m)=>ok(Math.abs(a-b)<=tol,(m||'')+` ${a} ≈ ${b}`);

/* 1. Tramvay: öngörüler durum özniteliklerinden */
const ATTR={makas:{means:false,personal:false},dongu:{means:true,personal:false},kopru:{means:true,personal:true}};
const RULE={sonuc:()=>1,cifte:a=>a.means?0:1,kisisel:a=>a.personal?0:1,mutlak:()=>0};
eq(K.CASES.map(c=>c.id),['makas','dongu','kopru']);
eq(K.PRINCIPLES.map(p=>p.id).sort(),Object.keys(RULE).sort());
for(const p of K.PRINCIPLES)for(const c of K.CASES)eq(p.pred[c.id],RULE[p.id](ATTR[c.id]),p.id+'/'+c.id);
const VALS=[null,0,1];let combos=0;
for(const a of VALS)for(const b of VALS)for(const c of VALS){const ans={makas:a,dongu:b,kopru:c};const m=K.matchPrinciples(ans);combos++;
  K.PRINCIPLES.forEach((p,i)=>{let ag=0,an=0;for(const[k,v]of Object.entries(ans)){if(v===null)continue;an++;if(v===RULE[p.id](ATTR[k]))ag++;}eq([m[i].agree,m[i].answered,m[i].full],[ag,an,an===3&&ag===3],JSON.stringify(ans)+' '+p.id);});}
eq(combos,27);
/* her tam örüntü en çok bir ilkeyle tam uyuşur; 8 örüntüden 4'ü bir ilkeye karşılık gelir */
let mapped=0;for(const a of[0,1])for(const b of[0,1])for(const c of[0,1]){const n=K.matchPrinciples({makas:a,dongu:b,kopru:c}).filter(r=>r.full).length;ok(n<=1);mapped+=n;}eq(mapped,4);
/* Awad ve ark. 2020 (PNAS 117(5), PMC7007553): ülke ortalamaları; sıralama makas > döngü > köprü */
eq(K.POP.awad2020,{makas:81,dongu:72,kopru:51});ok(K.POP.awad2020.makas>K.POP.awad2020.dongu&&K.POP.awad2020.dongu>K.POP.awad2020.kopru);
eq(K.POP.pp2009,{cek:68,cekme:8,diger:24});eq(68+8+24,100);

/* 2. Theseus'un gemisi: korunum ve görüşlerin tanımları */
eq(K.PLANKS,30);
for(let n=0;n<=30;n++)for(const r of[false,true]){const s=K.ship(n,r);
  eq(s.aOrig+s.aNew,30);ok(s.aOrig+s.bOrig===30||!r||n===0,'özgün kalaslar korunur');eq(s.bOrig,r?n:0);
  const half=15;const maj=(30-n)>half?'A':(r&&n>half?'B':'belirsiz');eq(s.verdicts.cogunluk,maj,'çoğunluk '+n+r);
  eq(s.verdicts.parcasal,n===0?'A':(r&&n===30?'B':'hicbiri'),'parçasal '+n+r);
  eq([s.verdicts.sureklilik,s.verdicts.olusturma,s.verdicts.sozel],['A','A','belirsiz']);
  eq(Object.keys(s.verdicts).sort(),K.SHIP_VIEWS.map(v=>v.id).sort());}
eq(K.ship(15,true).verdicts.cogunluk,'belirsiz');eq(K.ship(16,true).verdicts.cogunluk,'B');eq(K.ship(14,true).verdicts.cogunluk,'A');eq(K.ship(16,false).verdicts.cogunluk,'belirsiz');
for(const bad of[-1,31,2.5,NaN])assert.throws(()=>K.ship(bad,false)),checks++;

/* 3. Işınlama: bütün yanıt bileşimleri */
const IDP={psikolojik:{isin:'evet',kopya:'hayir',bolunme:'hicbiri'},hayvan:{isin:'hayir',kopya:'hayir',bolunme:'hicbiri'},coklu:{isin:'evet',kopya:null,bolunme:'ikisi'}};
eq(K.ID_VIEWS.map(v=>v.id),Object.keys(IDP));for(const v of K.ID_VIEWS)eq(v.pred,IDP[v.id]);
for(const i of[null,'evet','hayir'])for(const k of[null,'evet','hayir'])for(const b of[null,'sol','sag','ikisi','hicbiri']){const ans={isin:i,kopya:k,bolunme:b};const m=K.matchIdentity(ans);
  K.ID_VIEWS.forEach((v,j)=>{let ag=0,an=0,op=0;for(const q of['isin','kopya','bolunme']){if(!ans[q])continue;if(IDP[v.id][q]===null){op++;continue;}an++;if(IDP[v.id][q]===ans[q])ag++;}eq([m[j].agree,m[j].answered,m[j].open],[ag,an,op]);});}

/* 4. Çin odası: kural kitabı tutarlı, girdiler ve çıktılar ayrık, Çince yalnız CJK + Çince noktalama */
eq(K.RULES.length,5);eq(new Set(K.RULES.map(r=>r[0])).size,5);eq(new Set(K.RULES.map(r=>r[1])).size,5);
for(const r of K.RULES){eq(K.roomReply(r[0]),r[1]);ok(/^[一-鿿，。？]+$/.test(r[0]+r[1]),'Çince dizgi: '+r[0]);ok(r[0].endsWith('？'));ok(r[2].endsWith('?'));}
eq(K.roomReply('你好'),null);eq(K.roomReply(''),null);

/* 5. Peçe: istatistikler, kesinlik eşdeğeri, kurallar */
eq(K.DISTS.map(d=>d.id),['A','B','C','D']);for(const d of K.DISTS)eq(d.v.length,5);
const mean=v=>v.reduce((a,b)=>a+b,0)/v.length;
for(const d of K.DISTS){const s=K.stats(d.v);eq([s.min,s.max,s.sum],[Math.min(...d.v),Math.max(...d.v),d.v.reduce((a,b)=>a+b,0)]);near(s.mean,mean(d.v),1e-12);
  near(K.ce(d.v,0),mean(d.v),1e-12,'ρ=0');near(K.ce(d.v,1),Math.pow(d.v.reduce((a,b)=>a*b,1),1/5),1e-9,'geometrik');near(K.ce(d.v,2),5/d.v.reduce((a,b)=>a+1/b,0),1e-9,'harmonik');
  near(K.ce(d.v,1+1e-9),K.ce(d.v,1),1e-5,'ρ=1 sürekliliği');
  let prev=Infinity;for(let r=0;r<=60;r+=0.25){const c=K.ce(d.v,r);ok(c<=prev+1e-9&&c>=Math.min(...d.v)-1e-9&&c<=mean(d.v)+1e-9,'güç ortalaması eşitsizliği');prev=c;}
  near(K.ce(d.v,400),Math.min(...d.v),1.0,'ρ → ∞');}
eq(K.DISTS.map(d=>mean(d.v)),[40,66,85,77]);eq(K.DISTS.map(d=>Math.min(...d.v)),[40,45,20,30]);
const brute=f=>{let b=null,bv=-Infinity;K.DISTS.forEach((d,i)=>{const x=f(d.v);if(x!==null&&x>bv+1e-12){bv=x;b=i;}});return b;};
eq(K.choose('maximin'),brute(v=>Math.min(...v)));eq(K.choose('maximin'),1);eq(K.choose('ortalama'),brute(mean));eq(K.choose('ortalama'),2);
for(let f=0;f<=60;f+=5)eq(K.choose('taban',f),brute(v=>Math.min(...v)>=f?mean(v):null),'taban '+f);
eq([0,25,35,50].map(f=>K.choose('taban',f)),[2,3,1,null]);
const pm=(v,r)=>r===1?Math.exp(mean(v.map(Math.log))):Math.pow(mean(v.map(x=>x**(1-r))),1/(1-r));
for(let r=0;r<=5;r+=0.5)eq(K.choose('risk',r),brute(v=>r===0?mean(v):pm(v,r)),'risk '+r);
eq([0,1,1.5,2,5].map(r=>K.DISTS[K.choose('risk',r)].id),['C','C','D','B','B']);
for(let k=0;k<5;k++){eq(K.position(k/5+1e-9),k);eq(K.position((k+1)/5-1e-9),k);}assert.throws(()=>K.position(1));assert.throws(()=>K.position(-0.1));checks+=2;
assert.throws(()=>K.choose('yok'));assert.throws(()=>K.ce([1,2],-1));checks+=2;

/* 6. Yöntem: SEP, Thought Experiments sınıflaması */
eq(Object.fromEntries(K.ROLES.map(r=>[r.id,r.ans])),{galileo:'yikici',newton:'yapici',einstein:'yapici',thomson:'ikisi',schrodinger:'yikici'});
eq(Object.keys(K.MARY).sort(),['hic','kavram','olgu','tanisiklik','yetenek']);
ok(Object.isFrozen(K)&&Object.isFrozen(K.DISTS[0].v)&&Object.isFrozen(K.PRINCIPLES[1].pred));
/* sayfa metni: başlık, birleşik işaret yok, emoji yok */
const title=html.match(/<title>([^<]*)<\/title>/)[1];ok(title.length<=80&&title.startsWith('Felsefi Düşünce Deneyleri: '),title);
ok(!/[̀-ͯ⃗]/.test(html.normalize('NFC')),'birleşik işaret');ok(!/[\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}]/u.test(html),'emoji');
ok(!/localStorage|sessionStorage|indexedDB|fetch\(|XMLHttpRequest|sendBeacon/.test(html.split('<script>')[1]+html.split('<script>')[2]),'sayfa bir şey saklamamalı ya da göndermemeli');
console.log(`G felsefi düşünce deneyleri: ${checks.toLocaleString('tr-TR')} bağımsız çekirdek kontrolü PASS`);

if(process.argv.includes('--browser')){
  const {chromium}=await import('playwright');const {createServer}=await import('node:http');const {join,extname}=await import('node:path');const {fileURLToPath}=await import('node:url');const root=fileURLToPath(new URL('../',import.meta.url));
  const server=createServer((req,res)=>{const file=join(root,decodeURIComponent(new URL(req.url,'http://localhost').pathname));if(!fs.existsSync(file)||fs.statSync(file).isDirectory()){res.writeHead(404).end();return;}res.setHeader('Content-Type',({'.html':'text/html; charset=utf-8','.js':'text/javascript; charset=utf-8','.css':'text/css; charset=utf-8'})[extname(file)]||'application/octet-stream');res.end(fs.readFileSync(file));});await new Promise(r=>server.listen(0,'127.0.0.1',r));let browser;
  try{browser=await chromium.launch();const before=checks;
  for(const[width,theme]of[[390,'light'],[1280,'dark']]){
    const page=await browser.newPage({viewport:{width,height:900},deviceScaleFactor:width===390?2:1,hasTouch:width===390});await page.addInitScript(t=>{localStorage.setItem('acelya-theme',t);localStorage.setItem('acelya-sound-muted','1');},theme);page.setDefaultTimeout(8000);
    const errors=[];page.on('pageerror',e=>errors.push(e.message));page.on('console',m=>{if(m.type()==='error')errors.push(m.text());});
    page.on('response',r=>{if(r.status()>=400)errors.push(r.status()+' '+r.url());});
    const requests=[];page.on('request',r=>{const u=new URL(r.url());if(u.hostname!=='127.0.0.1'&&!/^fonts\.(googleapis|gstatic)\.com$/.test(u.hostname))requests.push(r.url());/* ortak kabuğun yazı tipi dışında */});
    await page.goto(`http://127.0.0.1:${server.address().port}/${SLUG}.html`);
    const click=id=>page.locator('#'+id).click(),read=id=>page.locator('#'+id).textContent(),has=async(id,text)=>{const t=await read(id);assert(t.includes(text),`${id}: “${t}” içinde “${text}” yok (${width})`);checks++;},
      range=(id,v)=>page.locator('#'+id).evaluate((e,v)=>{e.value=v;e.dispatchEvent(new Event('input',{bubbles:true}));},v),sel=(id,v)=>page.locator('#'+id).selectOption(v),
      pressed=async id=>page.locator('#'+id).getAttribute('aria-pressed'),
      noflow=async tag=>{eq(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),true,'yatay taşma: '+tag+' '+width);};
    eq(await page.evaluate(()=>document.title.length<=80),true);await page.waitForSelector('.digest',{timeout:8000});ok(await page.locator('.digest').first().isVisible(),'Keşif Defteri görünür');
    /* 1. sekme */
    await has('tCount','0 / 3');await has('tPattern','— · — · —');await has('tStatus','Üç duruma da yanıt ver');eq(await page.locator('#tPrinciples .dd-item').count(),4);
    await has('tBar-makas','%81');await has('tBar-dongu','%72');await has('tBar-kopru','%51');
    await click('tMakas1');await click('tDongu1');await click('tKopru0');await has('tCount','3 / 3');await has('tPattern','evet · evet · hayır');await has('tStatus','Thomson döngüyü');eq(await page.locator('#tP-kisisel.is-match').count(),1);eq(await pressed('tMakas1'),'true');
    await click('tDongu0');await has('tStatus','Çifte etki öğretisi');eq(await page.locator('#tP-cifte.is-match').count(),1);await has('tP-sonuc','1 / 3');
    await click('tMakas0');await click('tKopru1');await has('tStatus','hiçbiriyle tam uyuşmuyor');eq(await page.locator('.dd-item.is-match').count(),0);
    await click('tKopru1');await has('tCount','2 / 3');await has('tStatus','1 durum yanıtsız');eq(await pressed('tKopru1'),'false');
    await click('ahlakReset');await has('tCount','0 / 3');await noflow('ahlak');
    /* 2. sekme */
    await click('tab-kimlik');await has('sNOut','30 / 30');await has('sStatus','Plutarkhos');await has('sV-olusturma','hepsi atıldı ve onlardan ikinci bir gemi kurulmadı');eq((await read('sV-olusturma')).includes('B\'de'),false,'B yokken B\'de denmemeli');await has('sV-parcasal','Hiçbiri');eq(await page.locator('#shipA i.n').count(),30);eq(await page.locator('#shipB i.o').count(),0);
    await click('sHobbes');await has('sStatus','Hobbes');await has('sV-parcasal','B, eski');await has('sV-cogunluk','B, eski');eq(await page.locator('#shipB i.o').count(),30);await has('sV-olusturma','tamamı şimdi B');
    await click('sHalf');await has('sV-cogunluk','Kesin bir yanıt yok');await has('sStatus','eşitlik');await range('sN',0);await has('sStatus','bütün görüşler A');await has('sV-parcasal','A, onarılan');await has('sV-olusturma','tamamı (30 kalas) hâlâ onda');
    await click('sOne');await has('sV-cogunluk','A, onarılan');await has('sV-olusturma','29 kalas A\'da, atılan 1 kalastan');await sel('sPick','A');await has('sStatus','uyuşan görüş sayısı: 3 / 5');eq(await page.locator('#sViews .is-match').count(),3);
    await page.locator('#sRebuilt').check();await has('shipBText','1 özgün kalas');
    await click('pIsinEvet');await click('pKopyaHayir');await click('pBolHicbiri');await has('pStatus','dallanmasız');eq(await page.locator('#pV-psikolojik.is-match').count(),1);await has('pV-coklu','yoruma açık');await has('pV-hayvan','2 / 3');
    await click('pKopyaEvet');await has('pStatus','geçişli');await click('pIsinHayir');await has('pStatus','beyin nakli');
    await click('kimlikReset');await has('sNOut','30 / 30');eq(await page.locator('#sPick').inputValue(),'');eq(await page.locator('#panel-kimlik [aria-pressed=true]').count(),0);await noflow('kimlik');
    /* 3. sekme */
    await click('tab-zihin');await has('rScore','0 / 0');await has('rProgress','1 / 5');await has('rInput','今天天气怎么样？');
    const answer=async()=>{const q=(await read('rInput')).trim();const r=K.RULES.find(x=>x[0]===q);const j=K.RULES.indexOf(r);await click('rOpt'+j);};
    await answer();await has('rScore','1 / 1');await has('rStatus','Kural kitabına uygun');await click('rOpt1');await has('rScore','1 / 2');await has('rStatus','uymuyor');
    for(let i=0;i<3;i++)await answer();await has('rProgress','Bitti');await has('rScore','4 / 5');await has('rStatus','Beş kâğıdın 4 tanesine');eq(await page.locator('#rOpts button[disabled]').count(),5);
    await click('rReveal');await has('rBook','Çince anlıyor musun?');await has('rStatus','Son kâğıt “Çay içmeyi sever misin?”');await has('rStatus','“Çay içmeyi çok severim.” idi');await has('rStatus','Üçüncü kâğıt “Çince anlıyor musun?” diye soruyordu ve sen “Çince anlıyorum.”');await has('rReveal','gizle');
    eq(await page.locator('#mTomato').getAttribute('class'),'gray');await click('mOut');eq(await page.locator('#mTomato').getAttribute('class'),'');await has('mState','ilk kez renkli');
    for(const[k,t]of[['olgu','Jackson'],['yetenek','Lewis'],['tanisiklik','Conee'],['kavram','Loar'],['hic','Dennett']]){await sel('mPick',k);await has('mStatus',t);}
    await click('zihinReset');await answer();await answer();await click('rOpt0');await answer();await answer();await click('rReveal');await has('rStatus','sen “İyiyim, teşekkürler.” yanıtını verdin');await has('rStatus','Son kâğıt “Çay içmeyi sever misin?”');await click('zihinReset');await has('rScore','0 / 0');eq(await page.locator('#mTomato').getAttribute('class'),'gray');await has('rBook','你好吗？');eq((await read('rBook')).includes('Nasılsın'),false);await noflow('zihin');
    /* 4. sekme */
    await click('tab-adalet');await has('vStatus','Bir toplum seç');await has('vPos','peçe iniyor');await has('vR-maximin','B');await has('vR-ortalama','C');await has('vR-taban','D');await has('vR-risk','C');
    await click('vPickB');eq(await page.locator('#vRowB.is-pick').count(),1);await has('vStatus','en kötü durumda 45, ortalamada 66');await has('vStatus','Maximin');
    await click('vLift');const pos=await read('vPos');ok(/^[1-5]\. kesim/.test(pos),pos);eq(await page.locator('#vRowB td.is-you').count(),1);await has('vStatus','Peçe kalktı');const k=+pos[0]-1;await has('vGet',String(K.DISTS[1].v[k]));
    await click('vVeil');await has('vPos','peçe iniyor');eq(await page.locator('td.is-you').count(),0);
    await range('vRho',2);await click('vPickB');await has('vStatus','Bu seçimi yapan kurallar: Maximin, Riskten kaçınan beklenen fayda');await range('vRho',1.5);await has('vRhoOut','1,5');await has('vR-risk','D');await has('vR-risk','62,9');await range('vRho',5);await has('vR-risk','B');
    await range('vFloor',50);await has('vR-taban','hiçbiri');await range('vFloor',35);await has('vR-taban','B');await click('vPickA');await has('vStatus','hiçbiri bu toplumu seçmiyor');
    await click('adaletReset');await has('vFloorOut','30');await has('vRhoOut','0,0');eq(await page.locator('#vPickRow [aria-pressed=true]').count(),0);await noflow('adalet');
    /* 5. sekme ve profil */
    await click('tab-ahlak');await click('tMakas1');await click('tab-adalet');await click('vPickC');
    await click('tab-yontem');await has('qAnswered','2 / 10');await has('qProfile','evet · — · —');await has('qProfile','Peçe');eq((await read('qProfile')).includes('C'),true);
    await click('q0y');await has('qScore','1 / 1');await has('qFb0','Ansiklopediyle aynı');await click('q1y');await has('qScore','1 / 2');await has('qFb1','başka türlü');eq(await page.locator('#q1y').getAttribute('data-res'),'no');eq(await page.locator('#q1k').getAttribute('data-res'),'ok');
    await click('q3k');await has('qFb3','iki yerde');eq(await page.locator('#q3k').getAttribute('data-res'),'ok');eq((await read('panel-zihin')).includes('hazırlanıyor'),false);await click('yontemReset');await has('qScore','0 / 0');await has('qAnswered','2 / 10');await click('allReset');await has('qAnswered','0 / 10');await noflow('yontem');
    /* sekme klavyesi, R tuşu, etiketler */
    await page.locator('#tab-yontem').focus();await page.keyboard.press('Home');eq(await page.locator('#tab-ahlak').getAttribute('aria-selected'),'true');await page.keyboard.press('ArrowLeft');eq(await page.locator('#tab-yontem').getAttribute('aria-selected'),'true');await page.keyboard.press('ArrowRight');eq(await page.locator('#tab-ahlak').getAttribute('aria-selected'),'true');await page.keyboard.press('End');eq(await page.locator('#tab-yontem').getAttribute('aria-selected'),'true');
    await click('tab-ahlak');await click('tMakas1');await page.locator('h1').click();await page.keyboard.press('r');await has('tCount','0 / 3');
    eq(await page.evaluate(()=>[...document.querySelectorAll('main input,main select')].filter(e=>!(e.labels&&e.labels.length)&&!e.getAttribute('aria-label')).map(e=>e.id)),[]);
    eq(await page.evaluate(()=>Object.isFrozen(ThoughtExp)&&!Object.getOwnPropertyDescriptor(window,'ThoughtExp').writable),true);
    eq(await page.evaluate(()=>/\d\.\d/.test([...document.querySelectorAll('.dd-stat strong,.dd-status,output,.dd-item em,#vRows,#vRules')].map(e=>e.textContent).join(' '))),false,'ondalık nokta');
    eq(await page.evaluate(()=>Object.keys(localStorage).filter(k=>!/^acelya-(theme|sound-muted)$/.test(k))),[],'sayfa localStorage kullanmamalı');
    eq(requests,[],'dış istek');
    assert.deepEqual(errors,[]);checks++;await page.close();
  }
  console.log(`G felsefi düşünce deneyleri: ${checks-before} tarayıcı kontrolü (390 açık / 1280 koyu; beş sekme, hazırlar, sıfırlamalar, klavye) PASS`);
  }finally{await browser?.close();await new Promise(r=>server.close(r));}
}
