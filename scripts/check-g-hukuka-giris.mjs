// G · hukuka-giris: çekirdek, sayfanın kodunu yinelemeyen referanslarla sınanır.
// Süreler gün gün sayan bağımsız bir takvimle (yerel Date, ayrı tatil listesi), norm çatışmaları ayrı yazılmış bir karar
// tablosuyla, ehliyet bütün girdi birleşimleri üzerinde TMK maddelerinden kurulan ayrı bir kuralla karşılaştırılır.
// `--browser` gerçek arayüzü 390 px açık ve 1280 px koyu temada dener.
import fs from 'node:fs';
import assert from 'node:assert/strict';
const SLUG='hukuka-giris';
const html=fs.readFileSync(new URL(`../${SLUG}.html`,import.meta.url),'utf8');
const source=html.split('/* KERNEL-BEGIN */')[1]?.split('/* KERNEL-END */')[0];
assert(source,'Çekirdek sınır işaretleri gerekli');
const K=new Function('"use strict";'+source+';return HukukLab;')();
let checks=0;
const eq=(a,b,msg)=>{assert.deepEqual(a,b,(msg||'eşitlik')+`: ${JSON.stringify(a)} ≠ ${JSON.stringify(b)}`);checks++;};
const ok=(c,msg)=>{assert(c,msg||'koşul sağlanmadı');checks++;};
ok(Object.isFrozen(K)&&Object.isFrozen(K.PARK.cases[0].v)&&Object.isFrozen(K.NORM_PRESETS[0].A)&&Object.isFrozen(K.DL_TEMPLATES[0]));

/* 1. Bağımsız takvim: yerel saatle öğlen tarihleri, gün gün yürüyerek */
const pad=n=>String(n).padStart(2,'0');
const iso=dt=>`${dt.getFullYear()}-${pad(dt.getMonth()+1)}-${pad(dt.getDate())}`;
const fromK=t=>{const x=new Date(t);return`${x.getUTCFullYear()}-${pad(x.getUTCMonth()+1)}-${pad(x.getUTCDate())}`;};
const mk=s=>{const[y,m,d]=s.split('-').map(Number);return new Date(y,m-1,d,12);};
const step=(dt,n)=>{const x=new Date(dt);x.setDate(x.getDate()+n);return x;};
const HOL=new Set(['01-01','04-23','05-01','05-19','07-15','08-30','10-29']); // 2429 sayılı Kanun m. 2, elle yazıldı
const off=dt=>dt.getDay()===0||dt.getDay()===6||HOL.has(iso(dt).slice(5));
function refDeadline(startIso,unit,n,adli){let dt=mk(startIso);
  if(unit==='gun'){for(let i=0;i<n;i++)dt=step(dt,1);}
  else if(unit==='hafta'){for(let i=0;i<7*n;i++)dt=step(dt,1);}
  else{const y=dt.getFullYear(),m=dt.getMonth()+n,d=dt.getDate();const last=new Date(y,m+1,0,12).getDate();dt=new Date(y,m,Math.min(d,last),12);}
  if(adli){const md=iso(dt).slice(5);if(md>='07-20'&&md<='08-31')dt=new Date(dt.getFullYear(),8,7,12);}
  while(off(dt))dt=step(dt,1);return iso(dt);}
// doğrulayıcı: Cumartesiyi iş günü sayan ikinci referans; üretici yalnız iki varsayımın aynı sonucu verdiği olayları sormalı
const offNoSat=dt=>dt.getDay()===0||HOL.has(iso(dt).slice(5));
function refDeadlineSatWork(startIso,unit,n,adli){let dt=mk(startIso);
  if(unit==='gun')dt=step(dt,n);else if(unit==='hafta')dt=step(dt,7*n);
  else{const y=dt.getFullYear(),m=dt.getMonth()+n,d=dt.getDate();const last=new Date(y,m+1,0,12).getDate();dt=new Date(y,m,Math.min(d,last),12);}
  if(adli){const md=iso(dt).slice(5);if(md>='07-20'&&md<='08-31')dt=new Date(dt.getFullYear(),8,7,12);}
  while(offNoSat(dt))dt=step(dt,1);return iso(dt);}
// el ile doğrulanmış örnekler (haftanın günleri takvimden): 10 Temmuz 2027 + 2 hafta = 24 Temmuz (adli tatil) → 7 Eylül 2027 Salı
eq(fromK(K.deadline({start:K.D(2027,7,10),unit:'hafta',n:2,adliTatil:true,regime:'hmk'}).end),'2027-09-07');
eq(new Date(2027,8,7,12).getDay(),2);
eq(fromK(K.deadline({start:K.D(2027,1,31),unit:'ay',n:1,adliTatil:false,regime:'hmk'}).end),'2027-03-01','31 Ocak + 1 ay = 28 Şubat Pazar → 1 Mart');
eq(fromK(K.deadline({start:K.D(2028,1,31),unit:'ay',n:1,adliTatil:false,regime:'hmk'}).end),'2028-02-29','artık yıl');
eq(fromK(K.deadline({start:K.D(2027,4,9),unit:'hafta',n:2,adliTatil:true,regime:'hmk'}).end),'2027-04-26');
eq(refDeadline('2027-04-09','hafta',2,true),'2027-04-26','23 Nisan 2027 Cuma tatil → 26 Nisan Pazartesi');
eq(fromK(K.deadline({start:K.D(2029,8,10),unit:'hafta',n:2,adliTatil:true,regime:'hmk'}).end),'2029-09-07');
eq(fromK(K.deadline({start:K.D(2027,8,20),unit:'hafta',n:2,adliTatil:false,regime:'hmk'}).end),'2027-09-03','adli tatile tabi değil');
// geniş tarama
for(let y=2027;y<=2029;y++)for(let doy=0;doy<366;doy+=1){const s=new Date(y,0,1+doy,12);if(s.getFullYear()!==y)continue;const si=iso(s);const[a,b,c]=si.split('-').map(Number);
  for(const[unit,n]of[['gun',10],['gun',30],['gun',60],['hafta',2],['ay',1]])for(const adli of[false,true]){if(doy%3&&unit!=='hafta')continue;
    eq(fromK(K.deadline({start:K.D(a,b,c),unit,n,adliTatil:adli,regime:'hmk'}).end),refDeadline(si,unit,n,adli),`${si} ${unit} ${n} ${adli}`);}}
// tatil adları
eq(K.holidayName(K.D(2027,10,29)),'Cumhuriyet Bayramı');eq(K.holidayName(K.D(2027,9,7)),'');eq(K.holidayName(K.D(2027,9,5)),'Pazar');eq(K.holidayName(K.D(2027,9,4)),'Cumartesi');
eq(K.fmtDate(K.D(2027,9,7)),'7 Eylül 2027 Salı');

/* 2. Tarih ayrıştırıcı */
const P=s=>{const t=K.parseDateTR(s,2027);return t===null?null:fromK(t);};
for(const s of['7.9.2027','07/09/2027','7-9-2027','2027-09-07','7 Eylül 2027','7 eylul 2027','7 EYLÜL 2027 SALI','  7 Eylül 2027 Salı günü ','7.9','7 Eylül','7,9,2027'])eq(P(s),'2027-09-07',s);
for(const s of['','abc','31.2.2027','32.1.2027','7 Eylol 2027','2027','7.13.2027','7 9 27','1.2.3.4','Salı'])eq(P(s),null,s);
eq(P('29.2.2028'),'2028-02-29');eq(P('29.2.2027'),null);eq(P('1 Ağustos 2029'),'2029-08-01');eq(P('1 agustos 2029'),'2029-08-01');eq(P('3 Şubat 2028'),'2028-02-03');eq(P('3 subat'),'2027-02-03');

/* 3. Norm çatışması: bağımsız karar tablosu */
const RANK={anayasa:1,andlasma_th:2,andlasma:2,kanun:2,cbk:3,yonetmelik:4,genelge:5};
function refResolve(A,B){const s=[A.type,B.type].sort().join('+');
  if(s==='anayasa+andlasma_th')return{w:null,r:'tartismali'};
  if(s==='andlasma_th+kanun')return{w:A.type==='andlasma_th'?'A':'B',r:'m90'};
  if(s==='cbk+kanun')return{w:A.type==='kanun'?'A':'B',r:'m104'};
  if(RANK[A.type]<RANK[B.type])return{w:'A',r:'ust'};if(RANK[B.type]<RANK[A.type])return{w:'B',r:'ust'};
  if(A.scope!==B.scope)return{w:A.scope==='ozel'?'A':'B',r:'ozel'};
  if(A.year!==B.year)return{w:A.year>B.year?'A':'B',r:'sonraki'};return{w:null,r:'cozulemez'};}
const TYPES=Object.keys(RANK);
for(const ta of TYPES)for(const tb of TYPES)for(const sa of['genel','ozel'])for(const sb of['genel','ozel'])for(const[ya,yb]of[[2000,2010],[2010,2000],[2005,2005]]){
  const A={type:ta,year:ya,scope:sa},B={type:tb,year:yb,scope:sb};const r=K.resolve(A,B),f=refResolve(A,B);eq([r.winner,r.rule],[f.w,f.r],JSON.stringify([A,B]));ok(r.steps.length>=2);
  if(r.winner)ok(r.ok.includes(r.rule));
  const r2=K.resolve(B,A);eq(r2.winner===null?null:(r2.winner==='A'?'B':'A'),r.winner,'simetri');}
eq(K.NORM_PRESETS.map(p=>{const r=K.resolve(p.A,p.B);return r.winner+':'+r.rule;}),['A:ust','B:sonraki','A:ozel','A:m104','B:m90','A:ust','B:sonraki','null:tartismali']);
ok(K.resolve(K.NORM_PRESETS[5].A,K.NORM_PRESETS[5].B).note.includes('m. 152'),'Anayasa–kanun notu itiraz yolunu anar');
ok(K.NORM_PRESETS.every(p=>/^Kurgusal/.test(p.A.text)&&/^Kurgusal/.test(p.B.text)),'hazır normlar kurgusal');

/* 4. Ehliyet: TMK m. 8–16, 28, 124, 405–406, 429'dan kurulan ayrı kural, bütün birleşimler */
function refEhliyet(p){if(p.cenin)return{v:true,cat:'tam-ehliyetsiz',hak:'sartli'};const y=p.yas;
  const ergin=y>=18||(p.evli&&y>=16)||(p.erginKilindi&&y>=15);
  if((p.erginKilindi&&y<15)||(p.evli&&y<16)||(p.kisitli&&!ergin)||(p.danisman&&(!ergin||p.kisitli)))return{v:false};
  const cat=!p.ayirt?'tam-ehliyetsiz':(!ergin||p.kisitli)?'sinirli-ehliyetsiz':p.danisman?'sinirli-ehliyetli':'tam-ehliyetli';return{v:true,cat,hak:'var',ergin};}
let combos=0;for(const yas of[0,7,14,15,16,17,18,30,90])for(let m=0;m<32;m++){const p={cenin:false,yas,ayirt:!!(m&1),kisitli:!!(m&2),evli:!!(m&4),erginKilindi:!!(m&8),danisman:!!(m&16)};
  const r=K.ehliyet(p),f=refEhliyet(p);eq(r.valid,f.v,JSON.stringify(p));if(f.v){eq([r.cat,r.hak,r.ergin],[f.cat,f.hak,f.ergin],JSON.stringify(p));ok(r.steps.length>=3);}else ok(r.issues.length>=1);combos++;}
eq(combos,288);eq(K.ehliyet({cenin:true,yas:0}).hak,'sartli');eq(K.ehliyet({cenin:false,yas:-1}).valid,false);eq(K.ehliyet({cenin:false,yas:NaN}).valid,false);
eq(K.EHLIYET_PRESETS.map(p=>K.ehliyet(p.p).cat),['tam-ehliyetli','sinirli-ehliyetsiz','tam-ehliyetsiz','tam-ehliyetli','sinirli-ehliyetsiz','sinirli-ehliyetli','tam-ehliyetsiz']);
for(const c of Object.keys(K.CAT_NAMES))for(const a of K.ACTS)ok(['evet','kosullu','hayir'].includes(K.ACT_TABLE[c][a.id][0])&&/m\. \d/.test(K.ACT_TABLE[c][a.id][1])||a.id==='haksiz'&&c!=='tam-ehliyetsiz',`dayanak ${c} ${a.id}`);
eq(K.ACT_TABLE['sinirli-ehliyetsiz'].hediye[0],'evet');eq(K.ACT_TABLE['sinirli-ehliyetsiz'].borc[0],'kosullu');eq(K.ACT_TABLE['sinirli-ehliyetsiz'].haksiz[0],'evet');eq(K.ACT_TABLE['sinirli-ehliyetli'].tasinmaz[0],'kosullu');

/* 5. Veri bütünlüğü */
eq(K.BRANCHES.filter(b=>b.side==='kamu').length,8);eq(K.BRANCHES.filter(b=>b.side==='karma').length,2);eq(K.BRANCHES.filter(b=>b.side==='ozel').length,4);
for(const c of K.BRANCH_CASES){ok(K.BRANCHES.find(b=>b.id===c.branch)?.side===c.side||c.branch==='is'||c.branch==='sosyal','dal tarafı '+c.id);ok(K.CRITERIA.every(k=>['kamu','ozel'].includes(c.c[k.id])));}
ok(K.BRANCH_CASES.some(c=>new Set(Object.values(c.c)).size>1),'ölçütlerin ayrıştığı örnek var');
for(const c of K.PARK.cases)for(const m of K.METHODS)ok(['yasak','serbest','belirsiz'].includes(c.v[m.id][0])&&c.v[m.id][1].length>15);
eq(K.PARK.cases.map(c=>K.tally(c.id).agree),[true,false,false,false,false,false]);eq(K.tally('ambulans'),{yasak:1,serbest:2,belirsiz:1,agree:false});
for(const a of K.ARGS)ok(K.ARG_METHODS.some(m=>m.id===a.ans)&&K.ARG_RULES[a.rule]);for(const m of K.ARG_METHODS)ok(K.ARGS.some(a=>a.ans===m.id),'her yöntem için örnek: '+m.id);
eq(K.ARG_METHODS.length,7);
for(const c of K.TMK1_CASES){ok(c.path[0]==='kanun'&&c.path.every((s,i)=>K.TMK1_STEPS[i].id===s));ok(/^Kurgusal olay/.test(c.text));}
for(const g of K.GOOD_FAITH)ok(/^Kurgusal olay/.test(g.text)&&g.steps.length>=2&&g.steps.some(s=>/m\. \d/.test(s)));
eq(K.GOOD_FAITH.map(g=>g.ans),[true,false,false,true,false]);
eq(K.SANC_QUIZ.length,8);for(const q of K.SANC_QUIZ)ok(K.RULE_KINDS.some(k=>k.id===q.ans));
ok(K.COURT_QUIZ.every(q=>q.ans>=0&&q.ans<K.COURT_QUIZ_OPTS.length));ok(K.COURTS.every(c=>c.src&&c.d.length>40));
ok(K.MISTAKES.length>=5);for(const m of K.MISTAKES)ok(m.wrong.length>20&&m.why.length>60,'hata: '+m.title);ok(K.MISTAKES.filter(m=>/m\. \d/.test(m.why)).length>=K.MISTAKES.length-2,'hataların dayanağı');
// süre şablonları: dayanak maddeleri ve birimler
eq(K.DL_TEMPLATES.map(t=>[t.id,t.unit,t.n,t.adli]),[['istinaf','hafta',2,true],['isci','hafta',2,false],['temyiz','hafta',2,true],['kesin','gun',10,false],['ay','ay',1,false],['iyuk','gun',60,false],['iyuk-ist','gun',30,false]]);
ok(K.DL_TEMPLATES.every(t=>/^Kurgusal olay/.test(t.make('X'))));

/* 6. Alıştırma üreticisi: her düzey, çok tohum, bağımsız referanslarla */
for(let lv=1;lv<=4;lv++)for(let s=1;s<=150;s++){const e=K.gen(lv,s);ok(e&&e.prompt.length>20&&e.hint&&e.solution.length>=2,`üretim ${lv}/${s}`);eq(JSON.stringify(K.gen(lv,s)),JSON.stringify(e),'tohum kararlı');
  if(e.kind==='choice'){eq(new Set(e.options).size,e.options.length,'seçenekler ayrı');ok(e.answer.length>=1&&e.answer.every(i=>i>=0&&i<e.options.length));eq(K.grade(e,String(e.answer[0])).ok,true);
    const wrong=e.options.findIndex((_,i)=>!e.answer.includes(i));if(wrong>=0)eq(K.grade(e,String(wrong)).ok,false);eq(K.grade(e,'x').parse,true);eq(K.grade(e,'99').parse,true);}
  if(lv===1){const c=K.BRANCH_CASES.find(c=>e.prompt.includes(c.text));ok(c);const want=e.topic==='side'?K.SIDES[c.side]:K.BRANCHES.find(b=>b.id===c.branch).name;eq(e.options[e.answer[0]],want);}
  if(lv===2){const f=refResolve(e.A,e.B);ok(f.w);for(let i=0;i<e.options.length;i++){const o=e.options[i];const w=o[0];const good=w===f.w&&(o.includes(K.RULE_NAMES[f.r])||(f.r==='m104'&&o.includes(K.RULE_NAMES.ust))||(f.r==='ozel'&&o.includes(K.RULE_NAMES.sonraki)&&(f.w==='A'?e.A.year>e.B.year:e.B.year>e.A.year)));eq(e.answer.includes(i),good,`L2 ${s} seçenek ${i}: ${o}`);}}
  if(lv===3){const a=K.ARGS.find(a=>a.text===e.quote);ok(a);eq(K.ARG_METHODS[e.answer[0]].id,a.ans);}
  if(lv===4){const tpl=K.DL_TEMPLATES.find(t=>t.id===e.tpl);const si=fromK(e.start);eq(fromK(e.acc),refDeadline(si,tpl.unit,tpl.n,tpl.adli),`L4 ${s}`);ok(e.prompt.includes(K.fmtDate(e.start)));ok(!K.holidayName(e.start));
    const a=K.ymd(e.acc);eq(K.grade(e,`${a.d}.${a.m}.${a.y}`).ok,true);eq(K.grade(e,`${a.d} ${K.MONTHS[a.m-1]}`).ok,true);eq(K.grade(e,`${a.y}-${pad(a.m)}-${pad(a.d)}`).ok,true);
    eq(K.grade(e,'').parse,true);eq(K.grade(e,'yarın').parse,true);eq(K.grade(e,K.fmtDate(e.acc+K.DAY)).ok,false);
    // doğrulayıcı: Cumartesi iş günü sayılsa da yanıt değişmemeli (Cumartesi varsayımı doğrulanmadı)
    eq(refDeadlineSatWork(si,tpl.unit,tpl.n,tpl.adli),fromK(e.acc),`L4 Cumartesi ${s}`);
    if(tpl.regime==='iyuk')ok(e.solution.some(x=>x.includes('izleyen günden işlemeye başlar (İYUK m. 7, 8)'))&&!e.solution.some(x=>x.includes('Süre bildirimi izleyen')),'İYUK adımı tutarlı');}}
// dört düzeyde de bütün konular üretilebiliyor
const topics=new Set();for(let s=1;s<=150;s++){topics.add(K.gen(1,s).topic);topics.add(K.gen(4,s).tpl);}ok(['side','branch','istinaf','isci','temyiz','kesin','ay','iyuk','iyuk-ist'].every(t=>topics.has(t)),'bütün konular');

{const z=K.TMK1_CASES.find(c=>c.id==='zihin');ok(!z.why.includes('bilimsel görüşlerden'),'zihin: karar metni tekrar etmez');}
ok(html.includes('2429 sayılı Kanun m. 3’e göre hafta tatili Pazar günüdür')&&!html.includes('tatil olarak Cumartesi, Pazar'),'Cumartesi varsayımı kaldırıldı');
{const e=K.gen(4,12);const a=K.ymd(e.acc);ok(K.grade(e,`${a.d}.${a.m}.${a.y-1}`).msg.includes('Yılı denetle'),'yıl hatası iletisi');}
{let bad=0;for(let s=1;s<=500;s++){const e=K.gen(2,s);for(const X of[e.A,e.B])if(X.type==='cbk'&&X.year<2018)bad++;}eq(bad,0,'CBK 2018 öncesine tarihlenmez');}
/* 7. Sayfa metni: kurallar */
ok(html.includes('Bu sayfa hukuki danışmanlık değildir;')&&html.includes('baro adli yardım bürosuna başvurun'),'sakin not');
ok(html.includes('13 Kasım 2026’da mevzuat.gov.tr’deki'),'sürüm tarihi');
const title=html.match(/<title>([^<]*)<\/title>/)[1];ok(title.length<=80);
ok(!/[̀-ͯ]/.test(html),'birleşik işaret yok');ok(!/type="number"/.test(html));
ok(!/[\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}]/u.test(html),'emoji yok');
// kanun alıntıları on beş sözcüğü geçmez
const quotes=['sözüyle ve özüyle değindiği bütün konularda uygulanır','Bir hakkın açıkça kötüye kullanılmasını hukuk düzeni korumaz.'];
for(const q of quotes){ok(html.includes('“'+q+'”'),q);ok(q.split(/\s+/).length<=15);}
for(const href of [...html.matchAll(/href="([a-z0-9-]+\.html)"/g)].map(m=>m[1]))ok(fs.existsSync(new URL('../'+href,import.meta.url)),'bağlantı var: '+href);
for(const p of['hukuk-felsefesi','anayasa-hukuku-ve-temel-haklar','ceza-hukukunun-genel-ilkeleri','borclar-ve-sozlesme-hukuku'])ok(html.includes(`href="${p}.html"`),'hukuk sayfasına bağlantı: '+p);ok(!/\(hazırlanıyor\)/.test(html),'hazırlanıyor notu kalmadı');
for(const s of['roma-hukuku','mantik-ve-argumantasyon','anlambilim-ve-edimbilim','uluslararasi-iliskiler'])ok(html.includes(`<a href="${s}.html">`),'bağlantı: '+s);
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
      const click=id=>page.locator('#'+id).click(),read=async id=>(await page.locator('#'+id).textContent()).replace(/[  ]/g,' '),
        set=(id,v)=>page.locator('#'+id).evaluate((e,v)=>{if(e.type==='checkbox'){e.checked=v;e.dispatchEvent(new Event('change',{bubbles:true}));return;}e.value=v;e.dispatchEvent(new Event(e.tagName==='SELECT'||e.type==='checkbox'?'change':'input',{bubbles:true}));},v),
        is=async(id,t)=>{eq(await read(id),t,id);},has=async(id,t)=>{const s=await read(id);ok(s.includes(t),`${id}: “${s}” içinde “${t}” yok`);},
        fits=async()=>eq(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),true,'yatay taşma yok'),
        sel=async t=>eq(await page.locator('#tab-'+t).getAttribute('aria-selected'),'true','sekme '+t);
      eq(await page.evaluate(()=>[...document.querySelectorAll('.app-content input,.app-content select')].filter(e=>!document.querySelector('label[for="'+e.id+'"]')).map(e=>e.id).join()),'','her denetimin etiketi');
      eq(await page.evaluate(()=>Object.isFrozen(HukukLab)&&!Object.getOwnPropertyDescriptor(window,'HukukLab').writable),true);
      // 01
      await has('rkBody','devlet gücüyle');eq(await page.locator('#sqList .hg-q').count(),8);await click('sq0-0');await has('sqFb0','Doğru.');await click('sq1-0');await has('sqFb1','Değil.');await has('sqScore','1 / 2 doğru');
      await has('brInfo','Bir dala dokun');await click('br-is');await has('brInfo','İş hukuku (karma alan)');eq(await page.locator('#br-is').getAttribute('aria-pressed'),'true');
      await has('crStatus','Önce kendi');await set('crCase','kira');await click('crPick-kamu');await has('crStatus','farklı');await has('crStatus','ayrışıyor');await is('crVotes','2 · 1');await has('crAccepted','Borçlar hukuku');
      await click('crPick-ozel');await has('crStatus','aynı');await click('kuralReset');await has('crStatus','Önce kendi');eq(await page.locator('#sqFb0').isHidden(),true);await fits();
      await page.locator('#tab-kural').focus();await page.keyboard.press('ArrowRight');await sel('kaynak');
      // 02
      eq(await page.locator('#srcCards .hg-card').count(),K.SOURCES.length);await has('tmText','Ece');await click('tmNo');await has('tmStatus','Bir daha bak');await is('tmErr','1');await click('tmYes');await has('tmStatus','Karar: Hâkim kanunu uygular');eq(await page.locator('#tmBtns').isHidden(),true);
      await set('tmCase','zihin');await is('tmErr','0');await click('tmNo');await click('tmNo');await has('tmStatus','kanun koyucu');await is('tmStep','Bitti');
      await set('tmCase','yayla');await click('tmNo');await click('tmYes');await has('tmStatus','örf ve âdet');
      await click('sk6-1');await has('skFb6','Doğru.');await click('kaynakReset');eq(await page.locator('#tmCase').inputValue(),'satis');await is('tmErr','0');await fits();
      // 03
      await click('tab-hiyerarsi');await click('py-yonetmelik');await has('pyName','Yönetmelik · basamak 4');await has('pyReview','İdari yargı');
      await has('nStatus','Önce bir tahmin');await click('nGuessB');await click('nSolve');await has('nStatus','Tahminin tutmadı');await has('nWinner','A: Kanun');await has('nRule','üst norm');eq(await page.locator('#nSteps li').count(),3);
      await set('nPreset','p3');await click('nGuessA');await click('nSolve');await has('nRule','özel norm');await has('nStatus','Tahminin doğru');await has('nNote','yorum kuralı');
      await set('nPreset','p4');await click('nSolve');await has('nRule','m. 104');await set('nPreset','p5');await click('nSolve');await has('nWinner','B: Temel');
      await set('nPreset','p8');await click('nGuessN');await click('nSolve');await is('nWinner','Belirlenemez');await has('nStatus','Tahminin doğru');
      await set('nAType','kanun');eq(await page.locator('#nPreset').inputValue(),'custom');await is('nAText','');await set('nAYear','20x');await has('nStatus','dört basamaklı');
      await set('nAYear','2020');await set('nBType','kanun');await set('nBYear','2020');await set('nAScope','genel');await set('nBScope','genel');await click('nSolve');await is('nWinner','Belirlenemez');await has('nRule','sonuç vermiyor');
      await click('hiyerarsiReset');eq(await page.locator('#nPreset').inputValue(),'p1');await is('nWinner','—');await fits();
      // 04
      await click('tab-yorum');eq(await page.locator('#mtCards .hg-card').count(),4);await has('yStatus','Önce kendi');await click('yGuess-yasak');await has('yStatus','Dört yöntem de aynı');await is('yTally','4 · 0 · 0');
      await set('yCase','ambulans');await has('yStatus','Önce kendi');await click('yGuess-serbest');await has('yStatus','Yöntemler ayrışıyor');await is('yTally','1 · 2 · 1');await has('yStatus','2 yöntemle');eq(await page.locator('#yRows tr').count(),4);
      eq(await page.locator('#arList .hg-q').count(),7);await click('ar0-4');await has('arFb0','Doğru.');await click('yorumReset');eq(await page.locator('#yCase').inputValue(),'motosiklet');eq(await page.locator('#arFb0').isHidden(),true);await fits();
      // 05
      await click('tab-hak');await is('eCat','Tam ehliyetli');eq(await page.locator('#eActs tr').count(),4);
      await set('ePreset','genc');await is('eCat','Sınırlı ehliyetsiz');await is('eErginOut','Küçük');await has('eActs','Koşullu');await has('eActs','Sorumlu');
      await set('eEvli',true);eq(await page.locator('#ePreset').inputValue(),'custom');await is('eCat','Tam ehliyetli');await is('eErginOut','Ergin');
      await set('eYas','15');await has('eStatus','olanaklı değil');await has('eStatus','m. 124');await is('eCat','—');
      await set('eYas','abc');await has('eStatus','0 ile 120');await set('ePreset','cenin');await has('eHak','sağ doğum');eq(await page.locator('#eYas').isDisabled(),true);
      await set('ePreset','danisman');await is('eCat','Sınırlı ehliyetli');await has('eActs','m. 429');
      await has('gStatus','Önce yanıtını');await click('gYes');await has('gStatus','Doğru.');await is('gScore','1 / 1');await set('gCase','calinti');await click('gYes');await has('gStatus','Değil.');await has('gSteps','beş yıl');await is('gScore','1 / 2');
      await click('hakReset');await is('eCat','Tam ehliyetli');await is('gScore','—');await fits();
      // 06
      await click('tab-yargi');eq(await page.locator('#ctMap button').count(),9);await click('ct-bam');await has('ctDesc','iki haftadır');await has('ctSrc','HMK m. 341, 345');await click('ct-uyusmazlik');await has('ctDesc','kesin olarak');
      await click('cq0-2');await has('cqFb0','Doğru.');await click('cq3-0');await has('cqFb3','Değil.');eq(await page.locator('#sysRows tr').count(),5);await has('sysRows','1 Ocak 2002');
      await click('yargiReset');await is('ctName','Bir yargı yeri seç');eq(await page.locator('#cqFb0').isHidden(),true);await fits();
      // 07
      await click('tab-alistirma');await is('pSeed','1 · 1');await is('pScore','—');
      {const e=K.gen(1,1);await has('pPrompt',e.prompt.slice(0,30));const w=e.options.findIndex((_,i)=>!e.answer.includes(i));await click('pOpt'+w);await has('pFb','Henüz değil');await click('pOpt'+e.answer[0]);await has('pFb','Doğru.');await is('pScore','0 / 1');}
      await click('pHintBtn');eq(await page.locator('#pHint').isVisible(),true);await click('pSolBtn');await has('pSol','Çözüm, adım adım');await click('pNew');await is('pSeed','1 · 2');eq(await page.locator('#pSol').isHidden(),true);
      {await set('pLevel','3');const e=K.gen(3,1);eq(await page.locator('#pQuote').isVisible(),true);await is('pQuote',e.quote);await click('pOpt'+e.answer[0]);await has('pFb','Doğru.');}
      {await set('pLevel','2');const e=K.gen(2,1);await click('pOpt'+e.answer[0]);await has('pFb','Doğru.');}
      {await set('pLevel','4');const e=K.gen(4,1);eq(await page.locator('#pAnsWrap').isVisible(),true);await page.locator('#pAns').fill('');await click('pCheck');await has('pFb','boş');
        await page.locator('#pAns').fill('dün');await click('pCheck');await has('pFb','okunamadı');await page.locator('#pAns').fill(K.fmtDate(e.acc+K.DAY,false));await click('pCheck');await has('pFb','Henüz değil');
        const a=K.ymd(e.acc);await page.locator('#pAns').fill(`${a.d}.${a.m}.${a.y}`);await page.locator('#pAns').press('Enter');await has('pFb','Doğru.');await click('pSolBtn');await has('pSol','Cevap:');}
      eq(await page.locator('#mkList .hg-mist').count(),K.MISTAKES.length);await click('mkBtn0');eq(await page.locator('#mk0').isVisible(),true);eq(await page.locator('#mkBtn0').getAttribute('aria-expanded'),'true');
      await click('alistirmaReset');await is('pSeed','1 · 1');await is('pScore','—');eq(await page.locator('#mk0').isHidden(),true);await fits();
      await page.locator('h1').click();await page.keyboard.press('r');await is('pSeed','1 · 1');
      await page.locator('#tab-alistirma').focus();await page.keyboard.press('Home');await sel('kural');await page.keyboard.press('End');await sel('alistirma');await page.keyboard.press('ArrowLeft');await sel('yargi');
      for(const t of['kural','kaynak','hiyerarsi','yorum','hak','yargi','alistirma']){await click('tab-'+t);await fits();eq(await page.locator('#panel-'+t).isVisible(),true);}
      assert.deepEqual(errors,[]);checks++;await page.close();}
    console.log(`G ${SLUG}: ${checks-before} tarayıcı kontrolü PASS (390 px açık, 1280 px koyu)`);
  }finally{await browser?.close();await new Promise(r=>server.close(r));}
}
