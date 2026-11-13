// Anlatı yapısı ve edebiyat çözümlemesi: cevap anahtarları, sıra denetimi, anakroni ve düzey çekirdeği için kalıcı denetim.
// Başvurular sayfanın formüllerini kullanmaz: Freytag'ın Kral Oidipus bölümlemesi (Technique of the Drama, s. 171–172),
// Poetika 11. bölüm (baht dönüşü örneği haberci), Vikipedi'deki 31 işlevin İngilizce adları ve sırası, Odysseia kitap
// numaraları (Butler), kaba kuvvetle en uzun azalmayan alt dizi, ters çift ve hamle bölmesi, kamu malı ölçütü, alıntı uzunluğu.
import fs from 'node:fs';
import vm from 'node:vm';
import assert from 'node:assert/strict';
const SLUG='anlati-yapisi-ve-edebiyat-cozumlemesi';
const html=fs.readFileSync(new URL(`../${SLUG}.html`,import.meta.url),'utf8');
const source=html.split('/* KERNEL-BEGIN */')[1]?.split('/* KERNEL-END */')[0];
assert(source,'Çekirdek sınırları gerekli');
const context={window:{}};vm.createContext(context);vm.runInContext(source,context);
const K=context.window.Anlati;let checks=0;
const eq=(a,b,msg=`${JSON.stringify(a)} ≠ ${JSON.stringify(b)}`)=>{if(a&&typeof a==='object')a=JSON.parse(JSON.stringify(a));assert.deepEqual(a,b,String(msg));checks++;};
const ok=(c,msg)=>{assert(c,msg);checks++;};
let seed=20261113;const rnd=()=>((seed=(seed*1103515245+12345)%2147483648)/2147483648);

// 0. Sayfa kabuğu, bağlantılar, alıntı uzunluğu
const title=/<title>([^<]+)<\/title>/.exec(html)[1];ok(title.startsWith('Anlatı Yapısı: ')&&title.length<=80,'başlık');ok(html.includes(`data-page="${SLUG}"`),'data-page');
ok(!/[̀-ͯ⃗]/.test(html),'birleşik işaret yok');ok(!/<script[^>]+src="https?:/.test(html),'dış betik yok');
for(const l of['aruz-ve-hece-olcusu.html','anlambilim-ve-edimbilim.html','sozdizimi-ve-dilbilgisi.html','zipf-yasasi-ve-dil-istatistigi.html']){ok(html.includes(`href="${l}"`),'bağlantı '+l);ok(fs.existsSync(new URL(`../${l}`,import.meta.url)),'dosya '+l);}
const quotes=[...html.matchAll(/“([^”]*)”/g)].map(m=>m[1]);ok(quotes.length>=20,'alıntılar bulundu');
for(const q of quotes)ok(q.trim().split(/\s+/).filter(w=>/[\p{L}\d]/u.test(w)).length<=15,'alıntı 15 sözcüğü aşıyor: '+q);

// 1. Freytag ve Aristoteles: Freytag'ın kendi bölümlemesi (bağımsız yazılmış) ve Poetika 11. bölüm
const FREYTAG_SAYS={1:'giris',2:'yukselis',3:'yukselis',4:'doruk',6:'dusus',7:'dusus',8:'dusus',9:'felaket',10:'felaket'};
eq(K.OEDIPUS.length,10);eq(K.FREYTAG.map(f=>f.id),['giris','yukselis','doruk','dusus','felaket']);
for(const e of K.OEDIPUS){if(FREYTAG_SAYS[e.id])eq(e.parts[0],FREYTAG_SAYS[e.id],'Freytag sahne '+e.id);ok(e.why.length>20,'gerekçe '+e.id);}
eq(K.OEDIPUS[4].parts,['doruk','dusus'],'5. sahne iki bölüm');
ok(/Korinthos/.test(K.OEDIPUS[5].t)&&/haberci/.test(K.OEDIPUS[5].t),'6. sahne Korinthos habercisi');eq(K.TAGS.P.need,[6]);eq(K.TAGS.P.ok,[6]);
ok(/çoban/.test(K.OEDIPUS[7].t),'8. sahne çoban');ok(/kör/.test(K.OEDIPUS[8].t),'9. sahne kör etme');
{const k=K.keyPlot(),g=K.gradePlot(k.parts,k.tags);eq(g.correct,10);eq(g.tagsCorrect,3);
 const z=K.gradePlot(K.OEDIPUS.map(()=>null),{});eq(z.correct,0);eq(z.tagsCorrect,0);
 eq(K.gradePlot(k.parts,{P:[6],A:[7],S:[9]}).tags.A.ok,false,'A yalnız 7 yetmez');eq(K.gradePlot(k.parts,{P:[6],A:[6,9],S:[9]}).tags.A.ok,false,'A fazlası');
 eq(K.gradePlot(k.parts,{P:[6],A:[8,7],S:[10]}).tagsCorrect,3);eq(K.gradePlot(k.parts,{P:[4],A:[8],S:[9]}).tags.P.ok,false);
 const alt=[...k.parts];alt[4]='dusus';eq(K.gradePlot(alt,k.tags).correct,10,'5. sahne düşüş de kabul');alt[0]='doruk';eq(K.gradePlot(alt,k.tags).correct,9);}
eq(K.HAMARTIA.length,4);ok(K.HAMARTIA.some(h=>/Hyde/.test(h.r))&&K.HAMARTIA.some(h=>/Harsh/.test(h.r)),'hamartia okumaları');eq(K.BACKSTORY.length,5);

// 2. Propp: Vikipedi'deki 31 işlevin İngilizce adları ve sırası; 7 eylem alanı
const EN=['Absentation','Interdiction','Violation','Reconnaissance','Delivery','Trickery','Complicity','Villainy or lacking','Mediation','Beginning counteraction','Departure','First function of the donor','Hero’s reaction','Receipt of a magical agent','Guidance','Struggle','Branding','Victory','Liquidation','Return','Pursuit','Rescue','Unrecognized arrival','Unfounded claims','Difficult task','Solution','Recognition','Exposure','Transfiguration','Punishment','Wedding'];
eq(K.FUNCS.map(f=>f.en),EN);eq(K.FUNCS.map(f=>f.n),EN.map((_,i)=>i+1));ok(K.FUNCS.every(f=>f.tr&&f.gloss),'Türkçe ad ve açıklama');
eq(K.ROLES.length,7);eq(K.ROLES.map(r=>r.id).sort(),['bagisci','gonderen','kahraman','kotu','prenses','sahte','yardimci']);
for(const T of K.TALES){for(const e of T.ep){ok(e.ok.includes(e.key),T.id+' anahtar kabul listesinde');ok(e.ok.every(f=>Number.isInteger(f)&&f>=0&&f<=31),T.id+' işlev aralığı');ok(e.why.length>3,'gerekçe');}
 for(const r of T.roles){ok(r.ok.includes(r.key),'rol anahtarı');ok(r.ok.every(x=>K.ROLES.some(y=>y.id===x)),'rol tanımlı');}
 eq(K.gradeTale(T.id,T.ep.map(e=>e.key)).correct,T.ep.length);eq(K.gradeRoles(T.id,T.roles.map(r=>r.key)).correct,T.roles.length);eq(K.gradeTale(T.id,[]).correct,0);}
eq(K.TALES.map(t=>t.id),['hayatsuyu','sarik']);eq(K.TALES[0].ep.length,19);eq(K.TALES[1].ep.length,13);ok(/551/.test(K.TALES[0].origin),'ATU 551');

// 3. Sıra denetimi: bağımsız hamle bölmesi, kaba kuvvetle en uzun azalmayan alt dizi, ters çiftler
function movesRef(seq){const out=[];let cur=null;for(const f of seq){if(f==null||f===0)continue;if(f===8&&cur&&cur.includes(8)){out.push(cur);cur=null;}(cur=cur||[]).push(f);}if(cur)out.push(cur);return out;}
function lndsBrute(a){let best=0;const n=a.length;for(let m=0;m<(1<<n);m++){let last=-Infinity,c=0,good=true;for(let i=0;i<n;i++)if(m>>i&1){if(a[i]<last){good=false;break;}last=a[i];c++;}if(good&&c>best)best=c;}return best;}
function ref(seq){const mv=movesRef(seq);let desc=0,inv=0,drop=0;for(const m of mv){for(let k=1;k<m.length;k++)if(m[k]<m[k-1])desc++;for(let a=0;a<m.length;a++)for(let b=a+1;b<m.length;b++)if(m[a]>m[b])inv++;drop+=m.length-lndsBrute(m);}return{count:mv.length,desc,inv,drop,n:mv.flat().length};}
const cmp=(seq,msg)=>{const a=K.orderCheck(seq),b=ref(seq);eq([a.count,a.descents,a.inversions,a.drop,a.n],[b.count,b.desc,b.inv,b.drop,b.n],msg+' '+JSON.stringify(seq));};
for(const T of K.TALES)cmp(T.ep.map(e=>e.key),T.id);
eq((({count,descents,drop,n})=>({count,descents,drop,n}))(K.orderCheck(K.TALES[0].ep.map(e=>e.key))),{count:2,descents:4,drop:4,n:19},'Hayat Suyu');
eq((({count,descents,drop,n})=>({count,descents,drop,n}))(K.orderCheck(K.TALES[1].ep.map(e=>e.key))),{count:1,descents:2,drop:2,n:12},'Sarık');
for(let t=0;t<400;t++){const n=1+Math.floor(rnd()*13),seq=Array.from({length:n},()=>{const r=rnd();return r<0.08?null:r<0.14?0:r<0.3?8:1+Math.floor(rnd()*31);});cmp(seq,'rastgele');}
for(let t=0;t<200;t++){const a=Array.from({length:1+Math.floor(rnd()*12)},()=>1+Math.floor(rnd()*10));eq(K.lnds(a),lndsBrute(a),'lnds '+a);}
eq(K.orderCheck([]).n,0);eq(K.orderCheck([0,null]).count,0);eq(K.splitMoves([1,8,9,8,11,8]).length,3);

// 4. Odysseia: kitap sırası, ters çift sayımı, anahtar, anakroniler
const book=s=>+/Kitap (\d+)/.exec(s.books)[1];for(let i=1;i<K.ODY.length;i++)ok(book(K.ODY[i])>=book(K.ODY[i-1]),'anlatım sırası kitap sırasıdır '+K.ODY[i].id);
eq(K.ODY.length,12);const ids=K.ODY.map(s=>s.id);const R=Object.fromEntries(K.ODY.map(s=>[s.id,s.rank]));
const discRef=o=>{let d=0;for(let i=0;i<o.length;i++)for(let j=0;j<o.length;j++)if(i<j&&R[o[i]]>R[o[j]])d++;return d;};
eq(K.maxDiscordant(),66-1,'12 parça, bir eşit çift');eq(K.discordant(ids),discRef(ids));const key=K.keyOrder();eq(K.discordant(key),0);eq(K.discordant([...key].reverse()),65);
ok(key.indexOf('D12')===0&&key.at(-1)==='D7','yara en başta, kehanet en sonda');ok(key.indexOf('D3')<key.indexOf('D4'),'Truva Kikonlardan önce');ok(key.indexOf('D8')<key.indexOf('D1')&&key.indexOf('D8')<key.indexOf('D2'),'Kalypso, Telemakhos ve saldan önce');
eq(K.positionsOk(key).every(Boolean),true);{const sw=[...key],a=sw.indexOf('D1'),b=sw.indexOf('D2');[sw[a],sw[b]]=[sw[b],sw[a]];eq(K.discordant(sw),0);eq(K.positionsOk(sw).every(Boolean),true,'eşzamanlı iplikler iki sırada da doğru');}
for(let t=0;t<300;t++){const o=[...ids];for(let i=o.length-1;i>0;i--){const j=Math.floor(rnd()*(i+1));[o[i],o[j]]=[o[j],o[i]];}eq(K.discordant(o),discRef(o));const p=K.positionsOk(o);eq(p.every(Boolean),discRef(o)===0,'yerinde = ters çift yok');}
{const pos=Object.fromEntries(key.map((id,i)=>[id,i+1])),an=K.anachronies(pos);eq(an.filter(a=>a.type==='geri').map(a=>a.id).sort(),['D12','D3','D4','D5','D6','D8']);eq(an.filter(a=>a.type==='ileri').map(a=>a.id),['D7']);eq(an.filter(a=>a.type==='geri'||a.type==='ileri').every(a=>a.external),true,'hepsi dış');eq(an.filter(a=>a.type==='sirada').length,0);
 eq(an.find(a=>a.id==='D12').present,'D11','yara, ayak yıkama anına gömülü');eq(K.ODY.filter(s=>s.first).map(s=>s.id),['D1','D2','D10','D11','D13']);
 const disc=Object.fromEntries(ids.map((id,i)=>[id,i+1]));eq(K.anachronies(disc).filter(a=>a.type==='geri'||a.type==='ileri').length,0,'anlatım sırası olay sırası sayılırsa sapma yok');}
assert.throws(()=>K.discordant(['X1','D1']));checks++;

// 5. Anlatı düzeyleri
eq(K.LEVELS.length,9);eq(K.gradeLevels(K.LEVELS.map(l=>({level:l.level,self:l.self}))).correct,9);eq(K.gradeLevels([]).correct,0);
eq(K.LEVELS.map(l=>l.level),[1,2,2,3,1,2,3,4,2]);eq(K.LEVELS.filter(l=>l.self==='homo').length,2,'yalnız Odysseus ve Agamemnon kendi öyküsünü anlatır');

// 6. Süre, sıklık, odaklanma, iddia–kanıt
for(const[items,opts]of[[K.DUR,K.DUR_OPTS],[K.FREQ,K.FREQ_OPTS],[K.FOC,K.FOC_OPTS],[K.CLAIMS,K.EVID]]){for(const x of items){ok(x.ok.includes(x.key),'anahtar');ok(x.ok.every(o=>opts.some(y=>y.id===o)),'seçenek var');}eq(K.gradeSet(items,items.map(x=>x.key)).correct,items.length);eq(K.gradeSet(items,[]).correct,0);}
eq(K.DUR.map(x=>x.key),['ozet','sahne','ozet','duraklama','eksilti']);eq(K.FREQ.map(x=>x.key),['yinelemeli','tekil','yinelemeli','tekrarli','tekrarli']);eq(K.FOC.map(x=>x.key),['sifir','ic','ic','ic','dis','ic']);
eq(new Set(K.CLAIMS.map(c=>c.key)).size,5,'her kanıt bir iddianın anahtarı');

// 7. Kamu malı ölçütü (yazar 1956'dan önce öldü, yapıt 1930'dan önce yayımlandı)
for(const w of K.WORKS){ok(w.died===null||(Number.isInteger(w.died)&&w.died<1956),'ölüm '+w.w);ok(w.pub<=1930,'yayın '+w.w);eq(K.pdOk(w),true);}
eq(K.pdOk({died:1961,pub:1927}),false);eq(K.pdOk({died:1900,pub:1931}),false);ok(K.WORKS.length>=14,'yapıt listesi');
assert.throws(()=>K.gradeTale('yok',[]));checks++;
console.log(`Anlatı yapısı: ${checks.toLocaleString('tr-TR')} anahtar, sıra, anakroni, düzey, alıntı ve kamu malı kontrolü PASS`);

if(process.argv.includes('--browser')){
 const {chromium}=await import('playwright');const {createServer}=await import('node:http');const {join,extname}=await import('node:path');const {fileURLToPath}=await import('node:url');const root=fileURLToPath(new URL('../',import.meta.url));
 const server=createServer((req,res)=>{const file=join(root,decodeURIComponent(new URL(req.url,'http://localhost').pathname));if(!fs.existsSync(file)||fs.statSync(file).isDirectory()){res.writeHead(404).end();return;}res.setHeader('Content-Type',({'.html':'text/html; charset=utf-8','.js':'text/javascript; charset=utf-8','.css':'text/css; charset=utf-8'})[extname(file)]||'application/octet-stream');res.end(fs.readFileSync(file));});
 await new Promise(r=>server.listen(0,'127.0.0.1',r));let browser;const before=checks;ok(fs.existsSync(new URL(`../shared/digest/${SLUG}.js`,import.meta.url)),'defter dosyası var');
 try{browser=await chromium.launch();
  for(const[width,theme]of[[390,'light'],[1280,'dark']]){const page=await browser.newPage({viewport:{width,height:900},deviceScaleFactor:2});await page.addInitScript(t=>{localStorage.setItem('acelya-theme',t);localStorage.setItem('acelya-sound-muted','1');},theme);page.setDefaultTimeout(5000);const errors=[];page.on('pageerror',e=>errors.push(e.message));page.on('console',m=>{if(m.type()==='error')errors.push(m.text()+' '+(m.location().url||''));});
   await page.goto(`http://127.0.0.1:${server.address().port}/${SLUG}.html`);await page.waitForTimeout(300);
   const read=id=>page.locator('#'+id).textContent(),has=async(id,t)=>{const x=await read(id);assert(x.includes(t),id+': '+x+' / '+t);checks++;},click=id=>page.locator('#'+id).click();
   // 1. sekme
   eq(await page.locator('#pItems li').count(),10);await has('pScore','seçilen 0 / 10');await page.locator('#pSel0').selectOption('giris');eq(await page.locator('#pPyr .chip').count(),1);await click('pCheck');await has('pScore','1 / 10');
   await page.locator('#pItems [data-tag="P"][data-id="6"]').click();eq(await page.locator('#pItems [data-tag="P"][data-id="6"]').getAttribute('aria-pressed'),'true');
   await click('pShow');await has('pScore','10 / 10');await has('pTags','3 / 3');await has('pStatus','Hepsi');eq(await page.locator('#pPyr .chip').count(),10);eq(await page.locator('#pPyr .chip.wrong').count(),0);eq(await page.locator('#pItems li.right').count(),10);
   await page.locator('#pSel3').selectOption('felaket');await click('pCheck');await has('pScore','9 / 10');eq(await page.locator('#pPyr .chip.wrong').count(),1);
   await page.locator('#hamGroup input[value="bilgi"]').check();await has('hamOut','Hyde');eq(await page.locator('#pBack tr').count(),5);await click('pReset');await has('pScore','seçilen 0 / 10');
   // 2. sekme
   await click('tab-propp');eq(await page.locator('#prItems li').count(),19);await has('prMoves','—');await page.locator('#prSel0').selectOption('8');await page.locator('#prSel1').selectOption('9');await page.locator('#prSel2').selectOption('11');await has('prDesc','0');await page.locator('#prSel3').selectOption('5');await has('prDesc','1');
   await click('prShow');await has('prScore','19 / 19');await has('prMoves','2');await has('prDesc','4');await has('prDrop','4');await has('prRoleScore','6 / 6');eq(await page.locator('#prChart line.bad').count(),4);
   await page.locator('#prSel9').selectOption('31');await click('prCheck');await has('prScore','18 / 19');eq(await page.locator('#prItems li.wrong').count(),1);
   await page.locator('#prTale').selectOption('sarik');eq(await page.locator('#prItems li').count(),13);await click('prShow');await has('prScore','13 / 13');await has('prMoves','1');await has('prDesc','2');await has('prRoleScore','6 / 6');await click('prReset');await has('prMoves','—');eq(await page.locator('#prTale').inputValue(),'hayatsuyu');
   // 3. sekme
   await click('tab-order');eq(await page.locator('#oList li').count(),12);await has('oDisc',K.discordant(ids)+' / 65');await has('oAna','0 parça');
   await page.locator('#oList [data-down="0"]').click();await has('oStatus','Şu anki sırada');await page.locator('#oList [data-up="1"]').click();await has('oStatus','Başlangıçta');for(let k=10;k>=1;k--)await page.locator(`#oList [data-up="${k}"]`).click();await has('oDisc','14 / 65');await has('oAna','1 parça (1 dış)');await click('oReset');await has('oDisc',K.discordant(['D2','D1',...ids.slice(2)])+' / 65');
   await click('oShow');await has('oDisc','0 / 65');await has('oPos','12 / 12');await has('oAna','6 parça (6 dış)');await has('oPro','1 parça (1 dış)');eq(await page.locator('#oChart rect.geri').count(),6);eq(await page.locator('#oChart path.ileri').count(),1);
   await page.locator('#oList [data-up="11"]').click();await click('oCheck');await has('oPos','10 / 12');
   await click('lvShow');await has('lvScore','9 / 9');await page.locator('#lvL0').selectOption('2');await click('lvCheck');await has('lvScore','8 / 9');await click('oReset');await has('oDisc',K.discordant(ids)+' / 65');await has('lvScore','Denetleyince');
   // 4. sekme
   await click('tab-voice');await has('vDur','—');await page.locator('#duSel0').selectOption('ozet');await click('vCheck');await has('vDur','1 / 5');await click('vShow');await has('vDur','5 / 5');await has('vFreq','5 / 5');await has('vFoc','6 / 6');await has('vRel','5 / 5');await has('vStatus','Hepsi');
   await page.locator('body').click({position:{x:2,y:300}});await page.keyboard.press('r');await has('vDur','—');
   // kamu malı tablosu, klavye, erişilebilirlik, taşma
   eq(await page.locator('#pdRows tr').count(),K.WORKS.length);ok(!(await read('pdRows')).includes('karşılamıyor'),'kamu malı tablosu');
   await page.locator('#tab-voice').focus();await page.keyboard.press('Home');eq(await page.locator('#tab-plot').getAttribute('aria-selected'),'true');await page.keyboard.press('ArrowLeft');eq(await page.locator('#tab-voice').getAttribute('aria-selected'),'true');await page.keyboard.press('ArrowRight');eq(await page.locator('#tab-plot').getAttribute('aria-selected'),'true');
   eq(await page.evaluate(()=>[...document.querySelectorAll('main input,main select')].every(e=>e.closest('label')||document.querySelector('label[for="'+e.id+'"]'))),true,'etiketsiz denetim');
   for(const t of['plot','propp','order','voice']){await click('tab-'+t);eq(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),true,'taşma '+t+' '+width);}
   eq(await page.evaluate(()=>Object.isFrozen(Anlati)&&!Object.getOwnPropertyDescriptor(window,'Anlati').writable&&Object.isFrozen(Anlati.TALES[0].ep[0])),true);
   await page.locator('#kesif-defteri').waitFor({state:'visible',timeout:8000});eq(await page.locator('#kesif-defteri').isVisible(),true,'defter görünür');
   assert.deepEqual(errors,[]);checks++;await page.close();}
  console.log(`Anlatı yapısı: ${checks-before} tarayıcı kontrolü (390 açık, 1280 koyu) PASS (defter görünür)`);
 }finally{await browser?.close();await new Promise(r=>server.close(r));}
}
