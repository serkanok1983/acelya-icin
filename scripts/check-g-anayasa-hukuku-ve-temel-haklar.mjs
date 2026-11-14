// G · anayasa-hukuku-ve-temel-haklar: çekirdek, sayfanın kodunu yinelemeyen referanslarla sınanır.
// m. 175 yolu madde metninden bağımsız yazılmış bir karar tablosuyla bütün oy sayıları için; zaman çizelgesi ve
// değişiklik tablosu açılan kaynaklardan elle aktarılmış tarihlerle; “nereye gider?” ağacı kaba kuvvet dolaşmayla;
// ölçülülük puanlaması bütün yanıt birleşimleriyle; alıştırma üreteci her düzeyde yüzlerce tohumla.
// `--browser` gerçek arayüzü 390 px açık ve 1280 px koyu temada dener.
import fs from 'node:fs';
import assert from 'node:assert/strict';
const SLUG='anayasa-hukuku-ve-temel-haklar';
const html=fs.readFileSync(new URL(`../${SLUG}.html`,import.meta.url),'utf8');
const source=html.split('/* KERNEL-BEGIN */')[1]?.split('/* KERNEL-END */')[0];
assert(source,'Çekirdek sınır işaretleri gerekli');
const K=new Function('"use strict";'+source+';return AnayasaLab;')();
let checks=0;
const eq=(a,b,msg)=>{assert.deepEqual(a,b,(msg||'eşitlik')+`: ${JSON.stringify(a)} ≠ ${JSON.stringify(b)}`);checks++;};
const ok=(c,msg)=>{assert(c,msg||'koşul sağlanmadı');checks++;};
ok(Object.isFrozen(K)&&Object.isFrozen(K.TIMELINE[0])&&Object.isFrozen(K.CASES[0].ans)&&Object.isFrozen(K.TREE.n1.o[0]));

/* 1. m. 175: kesirlerden tamsayı arayla bağımsız eşikler (600 üye, m. 75) */
const N=600,least=(p,q)=>{let n=0;while(n*q<N*p)n++;return n;};
const T1=least(1,3),T35=least(3,5),T23=least(2,3);eq([T1,T35,T23],[200,360,400]);eq([K.TH.teklif,K.TH.kabul,K.TH.ucteIki,K.TH.besteBir],[T1,T35,T23,least(1,5)]);
function ref175({imza,oy,iade,oy2,cb,evet}){/* metin: f.1 teklif ≥ 1/3, kabul ≥ 3/5; f.3 iade, 2/3 ile aynen kabul → CB halkoyuna sunabilir; f.4 3/5–2/3 arası, iade yoksa halkoyu; f.5 2/3: CB sunar ya da yayımlanır; f.6 evet > yarı */
  if(imza<T1)return'teklif-yok';if(oy<T35)return'red';let v=oy;
  if(iade){if(oy2>=T23)v=oy2;else if(oy2>=T35)return'belirsiz';else return'red-iade';}
  const referendum=v<T23||cb==='halkoyu';if(!referendum)return'yayim';return evet>50?'halkoyu-kabul':'halkoyu-red';}
{let n=0;for(const imza of[0,199,200,201,330,600])for(let oy=0;oy<=600;oy+=1)for(const iade of[false,true])for(const oy2 of iade?[0,359,360,399,400,600]:[0])for(const cb of['halkoyu','yayim'])for(const evet of[0,50,50.1,73]){
  const r=K.amend175({imza,oy,iade,oy2,cb,evet});const e=ref175({imza,oy,iade,oy2,cb,evet});if(r.result!==e)assert.fail(`m. 175 ${JSON.stringify({imza,oy,iade,oy2,cb,evet})}: ${r.result} ≠ ${e}`);n++;
  if((r.result==='halkoyu-kabul'||r.result==='halkoyu-red')!==r.ref&&r.result!=='belirsiz')assert.fail('ref bayrağı');
  if(r.final!==({'teklif-yok':'red',red:'red','red-iade':'red',belirsiz:'belirsiz',yayim:'yururluk','halkoyu-kabul':'yururluk','halkoyu-red':'red'})[r.result])assert.fail('final');}
  checks+=n;ok(n>100000,'m. 175 tarama '+n);}
eq(K.amend175({imza:300,oy:372,iade:false,cb:'yayim',evet:10}).result,'halkoyu-red','360–399: Cumhurbaşkanı halkoylamasını atlayamaz');
eq(K.amend175({imza:'abc',oy:9999,cb:'halkoyu',evet:60}).result,'teklif-yok');eq(K.fmtPct(52),'%52');eq(K.fmtPct(50.05),'%50,1');eq(K.fmtPct(33.333),'%33,3');
eq(K.ETERNAL,[1,2,3]);ok(!K.isEternal(4)&&K.isEternal(3));

/* 2. Zaman çizelgesi: açılan kaynaklardan elle aktarılan tarihler */
const DATES={sened:'1808-09-29',tanzimat:'1839-11-03',ke1876:'1876-12-23',ke1878:'1878-02-13',ke1908:'1908-07-24',ke1909:'1909-08-08',a1921:'1921-01-20',a1923:'1923-10-29',a1924:'1924-04-20',a1928:'1928-04-10',a1934:'1934-12-05',a1937:'1937-02-05',d1960:'1960-05-27',a1961:'1961-07-09',m1971:'1971-03-12',d1980:'1980-09-12',a1982:'1982-11-07',d1987:'1987-09-06',aihm1987:'1987-01-28',aihm1990:'1990-01-22',d1995:'1995-07-23',d2001:'2001-10-03',d2004:'2004-05-07',d2007:'2007-10-21',d2010:'2010-09-12',bb2012:'2012-09-23',d2016:'2016-07-15',d2017:'2017-04-16'};
eq(Object.fromEntries(K.TIMELINE.map(e=>[e.id,e.d])),DATES,'zaman çizelgesi tarihleri');
for(const e of K.TIMELINE){ok(/^\d{4}-\d{2}-\d{2}$/.test(e.d)&&!isNaN(Date.parse(e.d)),e.d);ok(K.KINDS[e.kind]&&K.SRC[e.s]&&e.x.length>30&&e.t.length>5,e.id);}
{const S=K.sortedTimeline();for(let i=1;i<S.length;i++)ok(S[i-1].d<=S[i].d);eq(K.filterTimeline('hepsi','hepsi').length,28);
  const byKind={};for(const e of K.TIMELINE)byKind[e.kind]=(byKind[e.kind]||0)+1;for(const k of Object.keys(K.KINDS))eq(K.filterTimeline(k,'hepsi').length,byKind[k]);
  let tot=0;for(const E of K.ERAS)tot+=K.filterTimeline('hepsi',E.id).length;eq(tot,28,'dönemler örtüşmez, boşluk bırakmaz');eq(K.filterTimeline('kesinti','osm').map(e=>e.id),['ke1878']);}
eq(K.fmtDate('1982-11-07'),'7 Kasım 1982');eq(K.fmtDate('2012-09-23'),'23 Eylül 2012');
// Resmî tablo: kanun numaraları, halkoylamaları
eq(K.AMENDMENTS.map(a=>a.no),[3361,3913,4121,4388,4446,4709,4720,4777,5170,5370,5428,5551,5659,5678,5735,5982,6214,6718,6771]);
eq(K.AMENDMENTS.filter(a=>a.ref).map(a=>[a.no,a.ref]),[[3361,'1987-09-06'],[5678,'2007-10-21'],[5982,'2010-09-12'],[6771,'2017-04-16']]);
for(const a of K.AMENDMENTS){ok(a.kabul||a.yur);if(a.kabul&&a.yur)ok(a.kabul<=a.yur,'kabul yürürlükten önce '+a.no);}
for(const[no,id]of[[3361,'d1987'],[5678,'d2007'],[5982,'d2010'],[6771,'d2017']])eq(K.AMENDMENTS.find(a=>a.no===no).ref,DATES[id]);
{const S=K.amendStats(false);eq([S.n,S.ref],[19,4]);eq(S.byDecade,{1980:1,1990:4,2000:10,2010:4});eq(K.amendStats(true).n,4);}
ok(K.AMENDMENTS.find(a=>a.no===4709).m.split(',').some(x=>x.trim()==='13'),'m. 13 2001’de değişti');
// Doğrulayıcı (13 Kasım 2026): 1987 metni resmî tabloyla tutarlı; kadınların siyasi hakları iki ayrı adım; HSK notu 6087 geçici m. 8’e dayanır; m. 116 istisnası.
{const d=K.TIMELINE.find(e=>e.id==='d1987').x;ok(['67','75','175','geçici 4'].every(m=>d.includes(m))&&K.AMENDMENTS.find(a=>a.no===3361).m==='67, 75, 175, geçici 4','1987 değişikliği resmî tabloyla aynı');
  ok(/1930.*1934|1934.*1930/s.test(K.TIMELINE.find(e=>e.id==='a1934').x)&&K.SRC[K.TIMELINE.find(e=>e.id==='a1934').s].u.includes('kad%C4%B1nlara'),'1930 ve 1934 ayrı adımlar');
  const h=K.CHECKS.find(c=>c.f==='yurutme'&&c.to==='yargi'&&c.a.startsWith('m. 159'));ok(h.x.includes('Adalet Bakanlığı Müsteşarı')&&h.x.includes('geçici 8')&&K.SRC.k6087,'HSK notu');
  ok(K.SYSTEMS.find(s=>s.id==='tr').rows[0].includes('m. 116'),'m. 116 istisnası');ok(!html.includes('öğretide farklı görüşler var'),'gri alan yalnız metnin sustuğunu söyler');}ok(K.AMENDMENTS.find(a=>a.no===5170).m.includes('90'));

/* 3. Organlar, denetim, sistemler */
for(const c of K.CHECKS){ok(K.ORGANS[c.f]&&K.ORGANS[c.to]&&c.f!==c.to);ok(/^m\. \d/.test(c.a),c.a);}
eq(K.PAIRS.map(([a,b])=>K.checksBetween(a,b).length),[8,4,3,2,2,3]);
eq(K.PAIRS.reduce((s,[a,b])=>s+K.checksBetween(a,b).length,0),K.CHECKS.length,'her denetim bir yönde');
{const truth=[];for(const halk of[false,true])for(const sorumlu of[false,true])for(const ikili of[false,true]){const exp=!halk&&sorumlu?'parlamenter':halk&&!sorumlu&&!ikili?'baskanlik':halk&&sorumlu&&ikili?'yari':'diger';eq(K.classify({halk,sorumlu,ikili}),exp);truth.push(exp);}eq(truth.filter(x=>x==='diger').length,4);}
eq(K.SYSTEMS.map(s=>[s.id,K.classify(s.f)]),[['de','parlamenter'],['us','baskanlik'],['fr','yari'],['tr','baskanlik']]);
ok(html.includes('sınıflandırma öğretide tartışmalı')&&html.includes('kendine özgü bir model sayanlar'),'Türkiye sınıflandırması görüş olarak');

/* 4. Haklar, m. 15, ölçülülük */
for(const R of K.RIGHTS){const exp=R.a<=40?'kisi':R.a<=65?'sosyal':'siyasi';eq(R.c,exp,'m. '+R.a);eq(K.catOfArticle(R.a),exp);}
eq(new Set(K.RIGHTS.map(r=>r.a)).size,K.RIGHTS.length);eq([K.catOfArticle(16),K.catOfArticle(75)],[null,null]);eq(K.RIGHTS.find(r=>r.a===35).c,'kisi');eq(K.RIGHTS.find(r=>r.a===48).c,'sosyal');
eq(K.CORE15.length,5);for(const e of K.EMERG)ok(e.core===null||K.CORE15.some(c=>c.id===e.core));ok(K.EMERG.filter(e=>e.core).length>=4&&K.EMERG.filter(e=>!e.core).length>=2);
eq(K.STEPS.map(s=>s.id),['kanun','sebep','oz','elver','gerek','oran']);
const stopRef=c=>{for(let i=0;i<c.ans.length;i++)if(!c.ans[i])return i;return c.ans.length;};
eq(K.CASES.map(stopRef),[0,1,2,3,4,5,6],'her adımda takılan bir olay ve geçen bir olay');
for(const c of K.CASES){eq(K.firstFail(c),stopRef(c));ok(c.x.startsWith('Kurgusal olay:'),c.id);const st=stopRef(c);c.why.forEach((w,i)=>ok(i<=st||(st===6)?w!=='—':w==='—','gerekçe '+c.id+i));
  for(let i=st+1;i<6;i++)eq(c.ans[i],false,'durduktan sonraki adımlar incelenmez');
  const last=Math.min(st,5);for(let mask=0;mask<3**(last+1);mask++){const user=[];let m=mask,okc=0,n=0;for(let i=0;i<=last;i++){const d=m%3;m=(m-d)/3;user[i]=d===0?null:d===1;if(d){n++;if(user[i]===c.ans[i])okc++;}}const g=K.gradeCase(c,user);eq([g.ok,g.n,g.need],[okc,n,last+1]);}}
ok(html.includes('üç alt ilkeden')||html.includes('alt ilkeleriyle açıklar'),'AYM ölçülülük kaynağı');

/* 5. Nereye gider: ağaç dolaşması */
{const leaves=[];const seen=new Set();const dfs=(id,depth)=>{ok(depth<12,'döngü yok');seen.add(id);K.TREE[id].o.forEach(([,nx])=>{if(nx.startsWith('E:')){ok(K.ENDS[nx.slice(2)],nx);leaves.push(nx.slice(2));}else{ok(K.TREE[nx],nx);dfs(nx,depth+1);}});};dfs('n1',0);
  eq([...seen].sort(),Object.keys(K.TREE).sort(),'her düğüme ulaşılır');eq([...new Set(leaves)].sort(),Object.keys(K.ENDS).sort(),'her sona ulaşılır');ok(leaves.length>=Object.keys(K.ENDS).length);}
for(const c of K.RCASES){const w=K.walk(c.w);eq(w.end,c.end,c.id);eq(w.path.length,Object.keys(c.w).length,'olay yalnız yoldaki düğümleri yanıtlar '+c.id);ok(K.ROUTE_OPTS.includes(c.end));ok(c.x.startsWith('Kurgusal olay:'));}
eq(new Set(K.RCASES.map(c=>c.end)).size,K.RCASES.length,'her olay farklı bir sona');eq(K.walk({}).at,'n1');eq(K.walk({n1:0,n2:9}).end,null);
for(const E of Object.values(K.ENDS))ok(E.t&&E.x.length>40&&E.a&&typeof E.ok==='boolean');

/* 6. Yanılgılar ve kaynaklar */
ok(K.MISTAKES.length>=5);for(const[re]of[[/sınırsız/],[/sıradan bir kanunla/],[/dördüncü/],[/AİHM.*bozar/],[/mutlak/]])ok(K.MISTAKES.some(m=>re.test(m.t)),String(re));
for(const m of K.MISTAKES)ok(m.why.length>80&&m.a);
for(const[k,s]of Object.entries(K.SRC))ok(/^https:\/\//.test(s.u)&&s.t.length>8,k);
ok(['mevzuat.gov.tr/MevzuatMetin/1.5.2709.pdf','mevzuat.gov.tr/MevzuatMetin/1.5.6216.pdf','echr.coe.int','inhak.adalet.gov.tr','anayasa.gov.tr/media/4918'].every(u=>Object.values(K.SRC).some(s=>s.u.includes(u))),'resmî kaynaklar');

/* 7. Ayrıştırıcı */
for(const[a,b]of[['360',360],[' 360 ',360],['1987',1987],['1.987',1987],['1 987',1987],['1 987',1987],['4 ay',4],['30 gün',30],['%50',50],['50%',50],['200 imza',200],['10.000',10000],['0',0],['1987\'de',1987],['1987’de',1987],['4 Ay',4]])eq(K.parseIntTR(a),b,a);
for(const a of['','3,5','3.5','abc','-4','1.98','12 34','360 oyy',null,undefined,'1e3','٣'])eq(K.parseIntTR(a),null,String(a));

/* 8. Alıştırma üreteci */
const topics={};const dist={1:new Set(),2:new Set(),3:new Set()};
for(let level=1;level<=3;level++)for(let s=1;s<=400;s++){const e=K.gen(level,s);eq(JSON.stringify(K.gen(level,s)),JSON.stringify(e),'tohum kararlı');topics[level+e.topic]=(topics[level+e.topic]||0)+1;dist[level].add(e.prompt+(e.options||[]).join('|'));ok(e.hint&&e.solution.length>=1&&e.prompt);
  if(e.kind==='choice'){ok(e.answer>=0&&e.answer<e.options.length&&new Set(e.options).size===e.options.length);eq(K.grade(e,String(e.answer)).ok,true);for(let j=0;j<e.options.length;j++)if(j!==e.answer)eq(K.grade(e,String(j)).ok,false);eq(K.grade(e,'').parse,true);eq(K.grade(e,'9').parse,true);}
  else{eq(K.grade(e,String(e.n)).ok,true);eq(K.grade(e,' '+e.n+' ').ok,true);eq(K.grade(e,String(e.n+1)).ok,false);eq(K.grade(e,'').parse,true);eq(K.grade(e,'yaklaşık').parse,true);if(e.n>=1000)eq(K.grade(e,String(e.n).replace(/^(\d)/,'$1.')).ok,true);}
  if(e.topic==='hak'){const a=+e.prompt.match(/m\. (\d+)/)[1];eq(e.answer,['kisi','sosyal','siyasi'].indexOf(a<=40?'kisi':a<=65?'sosyal':'siyasi'));}
  if(e.topic==='yil'){const E=K.TIMELINE.find(x=>e.prompt.includes('“'+x.t+'”'));eq(e.n,+E.d.slice(0,4));}
  if(e.topic==='esik'){const oy=+e.prompt.match(/ (\d+) kabul oyu/)[1];eq(e.answer,oy<T35?0:oy<T23?1:2);}
  if(e.topic==='sayi'){const map=[['teklif edebilmek',200],['gizli oylamada en az',360],['doğrudan yayımlanabilmesi',400],['doğrudan iptal davası',60],['kaç ay içinde karar',5],['kaç gün içinde yapılır',30],['kaç ay içinde yapılmalıdır',4],['kaç üyeden',15],['aynen kabul',301],['şekil bakımından',10]];const m=map.find(([k])=>e.prompt.includes(k));ok(m,e.prompt);eq(e.n,m[1],e.prompt);}
  if(e.topic==='olcu'){const C=K.CASES.find(c=>e.prompt.startsWith(c.x));eq(e.answer,stopRef(C));}
  if(e.topic==='yol'){const C=K.RCASES.find(c=>e.prompt.startsWith(c.x));eq(e.options[e.answer],K.ENDS[C.end].t);eq(e.options.length,4);}
  if(e.topic==='cekirdek'){const E=K.EMERG.find(x=>x.t===e.options[e.answer]);ok(E&&E.core);ok(e.options.filter(o=>K.EMERG.find(x=>x.t===o).core).length===1);}}
ok(['1hak','1organ','1sira','2sayi','2yil','2esik','3olcu','3yol','3cekirdek'].every(t=>topics[t]>=30),'konu dağılımı '+JSON.stringify(topics));
ok(dist[1].size>=60&&dist[2].size>=25&&dist[3].size>=25,'çeşitlilik '+Object.values(dist).map(s=>s.size));
{let e=null;try{K.gen(4,1);}catch(x){e=x;}ok(e&&e.user);}

/* 9. Sayfa metni: alıntı uzunluğu, sakin not, birleşik işaret, bağlantılar */
const body=html.split('<body')[1].split('<script>')[0];const text=body.replace(/<[^>]+>/g,' ').replace(/&amp;/g,'&');
for(const q of text.match(/“[^”]*”/g)||[])ok(q.split(/\s+/).filter(Boolean).length<=15,'alıntı 15 sözcüğü aşmamalı: '+q);
ok(text.includes('Bu sayfa hukuki danışmanlık değildir; somut bir durum için bir avukata ya da baro adli yardım bürosuna başvurun.'));
ok(!/[̀-ͯ]/.test(html),'birleşik aksan işareti yok');ok(!/type="number"/.test(html));ok(html.match(/<title>([^<]*)<\/title>/)[1].length<=80);
for(const s of['uluslararasi-iliskiler','roma-hukuku','felsefi-dusunce-deneyleri','oyun-kurami'])ok(html.includes(`href="${s}.html"`)&&fs.existsSync(new URL(`../${s}.html`,import.meta.url)),s);
for(const s of['hukuka-giris','ceza-hukukunun-genel-ilkeleri','borclar-ve-sozlesme-hukuku','hukuk-felsefesi'])ok(html.includes(`href="${s}.html"`),'hukuk sayfasına bağlantı: '+s);
eq((text.match(/\(hazırlanıyor\)/g)||[]).length,0);
console.log(`G ${SLUG}: ${checks.toLocaleString('tr-TR')} bağımsız çekirdek kontrolü PASS`);

if(process.argv.includes('--browser')){
  const {chromium}=await import('playwright');const {createServer}=await import('node:http');const {join,extname}=await import('node:path');const {fileURLToPath}=await import('node:url');const root=fileURLToPath(new URL('../',import.meta.url));
  const server=createServer((req,res)=>{const file=join(root,decodeURIComponent(new URL(req.url,'http://localhost').pathname));if(!fs.existsSync(file)||fs.statSync(file).isDirectory()){res.writeHead(404).end();return;}res.setHeader('Content-Type',({'.html':'text/html; charset=utf-8','.js':'text/javascript; charset=utf-8','.css':'text/css; charset=utf-8'})[extname(file)]||'application/octet-stream');res.end(fs.readFileSync(file));});await new Promise(r=>server.listen(0,'127.0.0.1',r));let browser;const before=checks;
  const digestExists=fs.existsSync(new URL(`../shared/digest/${SLUG}.js`,import.meta.url));
  try{browser=await chromium.launch();
    for(const[theme,width]of[['light',390],['dark',1280]]){
      const page=await browser.newPage({viewport:{width,height:900},deviceScaleFactor:width===390?2:1});await page.addInitScript(t=>{localStorage.setItem('acelya-theme',t);localStorage.setItem('acelya-sound-muted','1');},theme);page.setDefaultTimeout(8000);
      const errors=[];page.on('pageerror',e=>errors.push(e.message));
      page.on('response',r=>{if(r.status()>=400&&!(!digestExists&&r.url().endsWith(`/shared/digest/${SLUG}.js`)))errors.push(r.status()+' '+r.url());});
      page.on('console',m=>{if(m.type()==='error'&&!/Failed to load resource/.test(m.text()))errors.push(m.text());});
      await page.goto(`http://127.0.0.1:${server.address().port}/${SLUG}.html`);await page.waitForTimeout(300);
      const click=id=>page.locator('#'+id).click(),read=async id=>(await page.locator('#'+id).textContent()).replace(/[  ]/g,' '),set=(id,v)=>page.locator('#'+id).evaluate((e,v)=>{if(e.type==='checkbox'){e.checked=v;e.dispatchEvent(new Event('change',{bubbles:true}));return;}e.value=v;e.dispatchEvent(new Event(e.tagName==='SELECT'?'change':'input',{bubbles:true}));},v),is=async(id,t)=>{eq(await read(id),t,id);},has=async(id,t)=>{const s=await read(id);ok(s.includes(t),`${id}: “${s}” içinde “${t}” yok`);},fits=async()=>eq(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),true,'yatay taşma'),sel=async t=>eq(await page.locator('#tab-'+t).getAttribute('aria-selected'),'true');
      eq(await page.evaluate(()=>[...document.querySelectorAll('.app-content input,.app-content select,.app-content textarea')].filter(e=>!document.querySelector('label[for="'+e.id+'"]')).map(e=>e.id).join()),'');
      eq(await page.evaluate(()=>Object.isFrozen(AnayasaLab)&&!Object.getOwnPropertyDescriptor(window,'AnayasaLab').writable),true);
      eq(await page.evaluate(()=>/[̀-ͯ]/.test(document.body.innerHTML)),false,'birleşik aksan işareti yok');
      eq(await page.evaluate(()=>document.title.length<=80&&document.querySelectorAll('input[type=number]').length===0),true);
      eq(await page.evaluate(()=>['uluslararasi-iliskiler','roma-hukuku','felsefi-dusunce-deneyleri','oyun-kurami'].every(s=>document.querySelector('.ah-next a[href="'+s+'.html"]'))),true);
      // 01
      await is('amFinal','Yürürlüğe girer');await is('amThK','360');eq(await page.locator('#amSteps li').count(),4);eq(await page.locator('#amOy2Wrap').isHidden(),true);eq(await page.locator('#amCbWrap').isHidden(),true);
      await click('amP-yayim');await has('amStatus','Halkoylaması yapılmadan');eq(await page.locator('#amEvetWrap').isHidden(),true);eq(await page.locator('#amCbWrap').isVisible(),true);
      await click('amP-iade');await is('amFinal','Metin açık değil');await has('amStatus','Gri alan');eq(await page.locator('#amOy2Wrap').isVisible(),true);
      await set('amOy2','400');await set('amCb','halkoyu');await set('amEvet','50');await is('amFinal','Yürürlüğe girmez');await has('amStatus','yarısını aşmadı');await set('amEvet','50.1');await is('amFinal','Yürürlüğe girer');await is('amEvetOut','%50,1');
      await click('amP-imza');await is('amFinal','Yürürlüğe girmez');eq(await page.locator('#amSteps li').count(),1);
      await click('amP-zorunlu');await has('amSteps','halkoylaması zorunlu');await set('amOy','359');await has('amStatus','beşte üç sağlanmadı');await set('amOy','360');await has('amSteps','beşte üç eşiği (360) aşıldı');
      await click('tq3-2');await has('tqFb3','Doğru.');await click('tq0-1');await has('tqFb0','Değil.');await has('tqScore','1 / 2');
      await click('anayasaReset');await is('amFinal','Yürürlüğe girer');await is('amImzaOut','330 imza');eq(await page.locator('#tqFb0').isHidden(),true);await fits();
      await set('amOy','100');await page.locator('h1').click();await page.keyboard.press('r');await is('amOyOut','370 oy');
      await page.locator('#tab-anayasa').focus();await page.keyboard.press('ArrowRight');await sel('tarih');
      // 02
      await has('tlCount','28 olay');await has('tlDetail','7 Kasım 1982');await has('tlDetail','mevzuat.gov.tr');eq(await page.locator('#tlAxis g.dot').count(),28);
      await set('tlKind','kesinti');await has('tlCount','5 olay');await has('tlDetail','Meclis süresiz tatil');await click('tl-d1980');await has('tlDetail','12 Eylül 1980');await has('tlDetail','Vikipedi');
      await set('tlEra','1982');await has('tlCount','1 olay');await has('tlDetail','15–16 Temmuz 2016');await set('tlKind','belge');await has('tlCount','1 olay');await set('tlEra','osm');await set('tlKind','yargi');await has('tlDetail','Bu süzgeçle olay yok');
      await set('tlKind','hepsi');await set('tlEra','hepsi');await page.locator('#tlAxis g[data-tl="bb2012"]').dispatchEvent('click');await has('tlDetail','23 Eylül 2012');await has('tlDetail','geçici m. 1/8');
      await is('amN','19');await is('amRefN','4');eq(await page.locator('#amRows tr').count(),19);eq(await page.locator('#amBars .ah-bar').count(),4);await set('amRef',true);eq(await page.locator('#amRows tr').count(),4);eq(await page.locator('#amRows tr.is-ref').count(),4);
      ok(await page.locator('#amBars .fill').first().evaluate(e=>e.getBoundingClientRect().width>5),'çubuk görünür');
      await click('tarihReset');await has('tlCount','28 olay');eq(await page.locator('#amRows tr').count(),19);await fits();
      // 03
      await click('tab-sistem');await is('sysOut','Parlamenter sistem');await is('sysMatch','Almanya');await click('sysP-us');await is('sysOut','Başkanlık sistemi');await is('sysMatch','ABD, Türkiye');await has('sysNote','öğretide tartışmalıdır');
      await click('sysP-fr');await is('sysOut','Yarı başkanlık sistemi');await set('sysIkili',false);await is('sysOut','Bu üç ideal tipten birine düzgün oturmuyor');await is('sysMatch','Bu dört örnekte yok');
      eq(await page.locator('#sysCards .ah-card').count(),4);await has('sysCards','tartışmalı');
      eq(await page.locator('#kaList li').count(),8);await click('ka-yargi-yasama');eq(await page.locator('#kaList li').count(),2);await has('kaTitle','Yargı');await has('kaList','m. 148');
      await page.locator('#kaSvg g[data-ka="yurutme>yargi"]').dispatchEvent('click');eq(await page.locator('#kaList li').count(),2);await has('kaList','12 üye');eq(await page.locator('#ka-yurutme-yargi').getAttribute('aria-pressed'),'true');
      await click('sistemReset');await is('sysOut','Parlamenter sistem');eq(await page.locator('#kaList li').count(),8);await fits();
      // 04
      await click('tab-haklar');eq(await page.locator('#hkList select').count(),8);await click('hkCheck');await is('hkScore','0 / 8');
      {const its=await page.evaluate(()=>[...document.querySelectorAll('#hkList label')].map(l=>+l.textContent.match(/m\. (\d+)/)[1]));for(let i=0;i<its.length;i++)await set('hk-'+i,its[i]<=40?'kisi':its[i]<=65?'sosyal':'siyasi');await click('hkCheck');await is('hkScore','8 / 8');await has('hkStatus','Hepsi doğru');
        await set('hk-0','siyasi');await click('hkCheck');await is('hkScore','7 / 8');await has('hkStatus','Düzelt');}
      await click('hkNew');await is('hkSet','2');
      await has('olFacts','genelge');await has('olQ','1. adım');eq(await page.locator('#olS1').textContent().then(t=>t.includes('incelenmez')),false,'henüz yanıtlanmayan adımın sonucu gizli');
      await click('olNo');await is('olScore','1 / 1');await has('olEnd','Kanunilik');await has('olStatus','Kanunilik');eq(await page.locator('#olYes').isDisabled(),true);await has('olS2','incelenmez');
      await set('olCase','piyano');for(const v of[true,true,true,true,false])await click(v?'olYes':'olNo');await is('olScore','5 / 5');await has('olEnd','Gereklilik');await has('olS4','ses yalıtımı');
      await set('olCase','salgin');await click('olNo');await is('olScore','0 / 1');await has('olS0','model: geçer');await has('olQ','2. adım');await click('olShow');await has('olEnd','Bütün adımları');await has('olStatus','aykırı görünmüyor');
      await click('olRestart');await is('olScore','—');eq(await page.locator('#coreList li').count(),5);
      await click('em1-0');await has('emFb1','Doğru.');await click('em0-0');await has('emFb0','Değil.');
      await click('haklarReset');await is('hkSet','1');eq(await page.locator('#olCase').inputValue(),'genelge');eq(await page.locator('#emFb1').isHidden(),true);await fits();
      // 05
      await click('tab-yargi');await has('rtFacts','45. gününde');await has('rtQ','Şikâyet neye yönelik');
      for(const k of[0,1,1,0,0])await click('rtO'+k);await has('rtEnd','İptal davası');await has('rtEnd','Beklenen yolla aynı');eq(await page.locator('#rtPath li').count(),5);
      await click('rtBack');await click('rtO1');await has('rtEnd','dava açılamaz');await has('rtEnd','Beklenen yol farklı');eq(await page.locator('#rtPath li.diff').count(),1);
      await set('rtCase','r5');for(const k of[2,0,0,0,0])await click('rtO'+k);await has('rtEnd','bireysel başvuru');await has('rtEnd','Beklenen yolla aynı');
      await set('rtCase','r6');for(const k of[2,0,0,0,0])await click('rtO'+k);await has('rtEnd','Beklenen yol farklı');await has('rtEnd','üst derece');
      await set('rtCase','serbest');for(const k of[3,1])await click('rtO'+k);await has('rtEnd','dört ay');ok(!(await read('rtEnd')).includes('Beklenen'));
      await click('rtRestart');eq(await page.locator('#rtPath li').count(),0);await click('yargiReset');eq(await page.locator('#rtCase').inputValue(),'r1');await fits();
      // 06
      await click('tab-alistirma');eq(await page.locator('#mkList .ah-mist').count(),K.MISTAKES.length);eq(await page.locator('#mk0').isHidden(),true);await click('mkBtn0');eq(await page.locator('#mk0').isVisible(),true);eq(await page.locator('#mkBtn0').getAttribute('aria-expanded'),'true');
      await is('pSeedOut','1 · 1');await is('pScore','—');{const e=K.gen(1,1);await has('pPrompt',e.prompt.slice(0,20));const w=(e.answer+1)%e.options.length;await click('pOpt'+w);await has('pFb','Henüz değil');await click('pOpt'+e.answer);await has('pFb','Doğru.');await is('pScore','0 / 1');}
      await click('pHintBtn');eq(await page.locator('#pHint').isVisible(),true);await click('pSolBtn');await has('pSol','Çözüm, adım adım');await click('pNew');await is('pSeedOut','1 · 2');eq(await page.locator('#pSol').isHidden(),true);
      {await set('pLevel','2');let s=1;while(K.gen(2,s).kind!=='num'||K.gen(2,s).n<1000)s++;for(let i=1;i<s;i++)await click('pNew');const e=K.gen(2,s);await has('pPrompt',e.prompt.slice(0,15));eq(await page.locator('#pAnsWrap').isVisible(),true);
        await page.locator('#pAns').fill('');await click('pCheck');await has('pFb','boş');await page.locator('#pAns').fill('bilmem');await click('pCheck');await has('pFb','tamsayı');
        await page.locator('#pAns').fill(String(e.n-1));await click('pCheck');await has('pFb','Henüz değil');await page.locator('#pAns').fill(String(e.n).replace(/^(\d)/,'$1.'));await page.locator('#pAns').press('Enter');await has('pFb','Doğru.');}
      {await set('pLevel','3');const e=K.gen(3,1);await click('pOpt'+e.answer);await has('pFb','Doğru.');}
      await click('alistirmaReset');await is('pSeedOut','1 · 1');await is('pScore','—');eq(await page.locator('#mk0').isHidden(),true);await fits();
      await page.locator('#tab-alistirma').focus();await page.keyboard.press('Home');await sel('anayasa');await page.keyboard.press('End');await sel('alistirma');await page.keyboard.press('ArrowLeft');await sel('yargi');
      for(const t of['anayasa','tarih','sistem','haklar','yargi','alistirma']){await click('tab-'+t);await fits();eq(await page.locator('#panel-'+t).isVisible(),true);}
      assert.deepEqual(errors,[]);checks++;await page.close();}
    console.log(`G ${SLUG}: ${checks-before} tarayıcı kontrolü PASS (390 px açık, 1280 px koyu)`);
  }finally{await browser?.close();await new Promise(r=>server.close(r));}
}
