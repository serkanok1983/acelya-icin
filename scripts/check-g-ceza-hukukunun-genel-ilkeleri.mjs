// G · ceza-hukukunun-genel-ilkeleri: çekirdek, sayfanın kodunu yinelemeyen referanslarla sınanır.
// Zaman kuralları (Anayasa m. 38/1, TCK m. 7) bütün girdi bileşimlerinde kanun metninden ayrıca yazılmış bir karar
// prosedürüyle; kusur sınıflandırması TCK m. 21–22 tanımlarından kurulan bağımsız bir doğruluk tablosuyla; madde
// ayrıştırıcı elle yazılmış girdilerle; sayfadaki her madde numarası, 13 Kasım 2026'da mevzuat.gov.tr'de okunan
// metinlerde var olduğu doğrulanan maddeler listesiyle; tırnak içindeki aktarımlar resmî metnin sözcükleriyle.
// `--browser` gerçek arayüzü 390 px açık ve 1280 px koyu temada dener.
import fs from 'node:fs';
import assert from 'node:assert/strict';
const SLUG='ceza-hukukunun-genel-ilkeleri';
const html=fs.readFileSync(new URL(`../${SLUG}.html`,import.meta.url),'utf8');
const source=html.split('/* KERNEL-BEGIN */')[1]?.split('/* KERNEL-END */')[0];
assert(source,'Çekirdek sınır işaretleri gerekli');
const K=new Function('"use strict";'+source+';return CezaLab;')();
let checks=0;
const eq=(a,b,msg)=>{assert.deepEqual(a,b,(msg||'eşitlik')+`: ${JSON.stringify(a)} ≠ ${JSON.stringify(b)}`);checks++;};
const ok=(c,msg)=>{assert(c,msg||'koşul sağlanmadı');checks++;};
ok(Object.isFrozen(K)&&Object.isFrozen(K.CASES[0].adim[0])&&Object.isFrozen(K.L2_T[0])&&Object.isFrozen(K.MISTAKES));
const text=html.replace(/<script[\s\S]*?<\/script>/g,' ').replace(/<[^>]+>/g,' ');
const allText=text+' '+JSON.stringify([K.CASES,K.MISTAKES,K.ROLE_QUIZ,K.KQ,K.ITER,K.TIMELINE,K.L2_T,K.L3_T,K.ZAMAN_TXT,K.L1_CTX,K.KUSUR]);

/* 1. Hukuki dayanak: sayfadaki her madde numarası açılan resmî metinde var olan bir maddeye gider */
// 13 Kasım 2026'da mevzuat.gov.tr'den okunan ve bu sayfada anılan maddeler (metinleri tek tek açılıp okundu).
const OKUNAN={TCK:new Set([1,2,3,4,7,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,45,46,52,53,54,55,56,57,58,59,60,81,85,86,89,116,151,152,153,157,168,344]),Anayasa:new Set([13,15,38]),CMK:new Set([217,223])};
const refs=[];for(const m of allText.matchAll(/(TCK|Anayasa|CMK) m\. (\d+)(?:[–-](\d+))?/g)){refs.push(m[0]);const set=OKUNAN[m[1]];ok(set.has(+m[2]),'okunmamış madde: '+m[0]);if(m[3])ok(set.has(+m[3]),'okunmamış madde: '+m[0]);}
ok(refs.length>=60,'madde göndermesi sayısı '+refs.length);
// Ardışık “m. 21, 22” gibi listeler ve “m. 23” biçimli kısa göndermeler: “m. N” biçimindeki her sayı TCK ya da Anayasa/CMK listesinde
for(const m of allText.matchAll(/\bm\. (\d+)/g)){const aihs=/Sözleşme(si)?\b[^.]{0,40}$/.test(allText.slice(Math.max(0,m.index-60),m.index))||/Sözleşme[^;]{0,60}$/.test(allText.slice(Math.max(0,m.index-70),m.index));ok(OKUNAN.TCK.has(+m[1])||OKUNAN.Anayasa.has(+m[1])||OKUNAN.CMK.has(+m[1])||(aihs&&[6,7].includes(+m[1]))||(/5252/.test(allText.slice(Math.max(0,m.index-160),m.index))&&[12,13].includes(+m[1])),'bilinmeyen madde '+m[0]);}
// Kanun künyeleri (mevzuat.gov.tr başlık bilgisi)
for(const s of['kabul 26.9.2004, Resmî Gazete 12.10.2004, sayı 25611','1 Haziran 2005','kabul 18.10.1982, Resmî Gazete 9.11.1982','8.8.2026 tarihli 7593 sayılı','24.12.2025 tarihli 7571 sayılı','4 Kasım 1950','1 Mart 1926'])ok(html.includes(s),'künye: '+s);
// Tırnak içindeki aktarımlar: resmî metnin sözcükleri (kesme imleri hariç), en çok 15 sözcük
const RESMI=['Ceza ve ceza yerine geçen güvenlik tedbirleri ancak kanunla konulur.','Kanunun açıkça suç saymadığı bir fiil için kimseye ceza verilemez','Suçluluğu hükmen sabit oluncaya kadar, kimse suçlu sayılamaz.'];
const quotes=[...html.matchAll(/<blockquote class="ch-quote">“([^”]+)”/g)].map(m=>m[1].replace(/…$/,''));
eq(quotes.length,3);for(const q of quotes){ok(RESMI.includes(q),'aktarım resmî metinle aynı değil: '+q);ok(q.split(/\s+/).length<=15,'15 sözcüğü aşan aktarım');}
// Sakin not ve hukuki danışmanlık uyarısı (önşart kuralı, birebir)
ok(html.includes('Bu sayfa hukuki danışmanlık değildir; somut bir durum için bir avukata ya da baro adli yardım bürosuna başvurun.'));
ok(html.includes('13 Kasım 2026’da mevzuat.gov.tr’deki metin')&&/güncel metni (her zaman )?(kendin )?denetle/i.test(text));
// Sayısal bir mahkûmiyet eşiği iddiası yok; ceza hesaplayıcı yok
ok(/sayısal bir olasılık eşiği yoktur/.test(text)&&!/%\s?\d+.{0,30}(mahkûmiyet|şüphe)/.test(text));ok(/ceza hesaplayıcı yoktur/.test(text));
// Her olay ve alıştırma kurgusal diye etiketli
for(const C of K.CASES)ok(C.olgu.startsWith('Kurgusal olay.'),C.id);
// Doğrulayıcı: karar-ve-bilissel-yanliliklar sayfası geriye dönük bakış yanlılığını işlemez; sayfa bunu vaat etmez, yanlılığı adıyla ve kaynağıyla anar
ok(/hindsight bias/.test(K.MISTAKES[0].why)&&!/bkz\. Karar ve Bilişsel/.test(K.MISTAKES[0].why));ok(html.includes('https://en.wikipedia.org/wiki/Hindsight_bias')&&/o sayfada işlenmez/.test(text));
// Doğrulayıcı: m. 32 metni tanıyı yok saymaz; m. 31/4 anılır; çekmece olayında m. 116/4 (gece) gündeme gelmez; kıyas sorusunda başkasının fiilinden sorumluluk yok
ok(!/ölçütü (bir )?tanı değil/.test(allText)&&/yalnız bir tanıya bakmaz/.test(allText));ok(/m\. 31\/4/.test(text));ok(!/gece/.test(K.CASES.find(c=>c.id==='vazgecme').olgu));ok(!/velisi/.test(K.KQ[3].s));ok(/Anayasa m\. 15\/2/.test(text));

/* 2. Zaman bakımından uygulama: kanun metninden bağımsız karar prosedürü, bütün bileşimler */
function refZaman(k0,k1,k2,g){
  // Anayasa 38/1, TCK 2/1, 7/1 c.1: fiil anında suç değilse ceza yok
  if(k0===0)return{none:true,rank:null,src:'fiilAni'};
  // TCK 7/4: geçici/süreli kanun yürürlükteyken işlenen suçlara uygulanır
  if(g)return{none:false,rank:k0,src:'gecici'};
  const seq=[k0];if(k1!==null)seq.push(k1);seq.push(k2);
  // TCK 7/1 c.2: sonra yürürlüğe giren herhangi bir kanuna göre suç değilse ceza yok
  if(seq.slice(1).some(x=>x===0))return{none:true,rank:null,src:'sonra'};
  // TCK 7/2: en lehe kanun; Anayasa 38/1: ağır olan geriye yürümez (lehe olanın seçimiyle zaten sağlanır)
  let best=seq[0];for(const x of seq)if(x<best)best=x;return{none:false,rank:best,src:'lehe'};}
let combos=0;
for(const k0 of[0,1,2,3])for(const k1 of[null,0,1,2,3])for(const k2 of[0,1,2,3])for(const g of[false,true]){
  const z=K.zaman(k0,k1,k2,g),r=refZaman(k0,k1,k2,g);combos++;
  eq(z.cezasiz,r.none,`cezasızlık ${k0},${k1},${k2},${g}`);
  if(!r.none){const ranks=[k0,k1,k2];eq(ranks[z.uygulanan],r.rank,`uygulanan düzey ${k0},${k1},${k2},${g}`);ok(ranks[z.uygulanan]<=k0,'sonraki ağır kanun geriye yürümemeli');}
  ok(typeof K.ZAMAN_TXT[z.neden]==='string'&&z.kural.length>=1);
  if(r.src==='gecici')eq(z.kural,['TCK m. 7/4']);if(r.src==='fiilAni')ok(z.kural.includes('Anayasa m. 38/1'));if(r.src==='sonra')eq(z.kural,['TCK m. 7/1 (2. cümle)']);
  if(k1!==null&&!g&&k0>0&&k1>0&&k1<k0&&k1<k2)eq(z.neden,'araLehe','ara kanun lehe');}
eq(combos,160);
eq(K.zaman(3,null,2,false).uygulanan,2);eq(K.zaman(2,null,3,false).neden,'agirGeriYurumez');eq(K.zaman(2,null,2,false).neden,'ayni');eq(K.zaman(3,0,3,false).neden,'sonraKalkti');
{let e=null;try{K.zaman(5,null,1,false);}catch(x){e=x;}ok(e,'geçersiz düzey reddedilmeli');}
// Doğrulayıcı: ara kanun ile hüküm anındaki kanun eşit lehe ise hüküm anındaki kanun gösterilir (aynı sonuç)
for(const k0 of[1,2,3])for(const k of[1,2,3])if(k<k0){const z=K.zaman(k0,k,k,false);eq(z.uygulanan,2,'eşitlikte hüküm anı');eq(z.neden,'leheAraEsit');}
ok(/aynı sonucu/.test(K.ZAMAN_TXT.leheAraEsit));

/* 3. Kusur biçimi: TCK m. 21–22 tanımlarından doğruluk tablosu */
// kast: bilerek ve isteyerek; olası kast: öngörüp yine de işleme (öğretide: kabullenme); bilinçli taksir: öngördüğü neticeyi istememe (güven);
// taksir: özen yükümlülüğüne aykırılıkla öngörmeme; ikisi de değilse kusur yok.
for(const istedi of[true,false])for(const ongordu of[true,false])for(const tutum of['kabul','guven'])for(const ongorulebilir of[true,false]){
  const exp=istedi?'kast':ongordu?(tutum==='kabul'?'olasi':'bilincli'):(ongorulebilir?'taksir':'yok');
  const r=K.kusurSinifla({istedi,ongordu,tutum,ongorulebilir});eq(r.id,exp);ok(r.yol.length>=1);}
eq(K.KUSUR.map(k=>k.madde).slice(0,4),['TCK m. 21/1','TCK m. 21/2','TCK m. 22/3','TCK m. 22/2']);

/* 4. Olay çözümleyici: veri bütünlüğü */
ok(K.CASES.length>=10);const ids=new Set(K.CASES.map(c=>c.id));eq(ids.size,K.CASES.length);
let debates=0;
for(const C of K.CASES){ok(C.adim.length>=2&&C.sonuc.startsWith('Öğretim çözümü'),C.id);
  C.adim.forEach((S,i)=>{ok(S.a>=0&&S.a<K.ASAMA.length&&S.o.length>=2&&S.why.length>30,C.id+i);ok(S.ok.every(j=>Number.isInteger(j)&&j>=0&&j<S.o.length));
    eq(new Set(S.o).size,S.o.length);if(S.d){debates++;ok(S.ok.length>=2,'tartışmalı adımda en az iki savunulabilir yanıt');}else eq(S.ok.length,1,C.id+' adım '+i);
    for(let j=0;j<S.o.length;j++){const r=K.caseAnswer(C.id,i,j);eq(r.ok,S.ok.includes(j));eq(r.debate,!!S.d);}});
  eq(K.caseAnswer(C.id,0,99),null);eq(K.caseAnswer(C.id,99,0),null);}
eq(K.caseAnswer('yok',0,0),null);ok(debates>=5,'tartışmalı adım sayısı');
// İstenen zor olaylar: olası kast/bilinçli taksir sınırı, meşru savunmada sınırın aşılması, araya giren olay, zorunluluk hâlinin yeri
for(const id of['sinir','asim','ambulans','zorunluluk'])ok(K.CASES.find(c=>c.id===id).adim.some(s=>s.d),'tartışmalı: '+id);
// Kusur adımlarında öğretim çözümü, aynı olgularla bağımsız sınıflandırmayla tutarlı
const cKusur=id=>{const C=K.CASES.find(c=>c.id===id);const S=C.adim.find(s=>s.o.length===5&&s.o[0]==='Kast');return S.ok.map(j=>K.KUSUR[j].id);};
eq(cKusur('saksi'),['taksir']);eq(cKusur('arac-bilincli'),['bilincli']);eq(cKusur('arac-olasi'),['olasi']);eq(cKusur('sinir'),['olasi','bilincli']);eq(cKusur('mesru'),['kast']);
eq(K.CASES.find(c=>c.id==='uyku').adim[0].ok,[1],'uykuda hareket yok');eq(K.CASES.find(c=>c.id==='yas').adim.at(-1).ok,[0]);ok(/on iki yaşını/.test(K.CASES.find(c=>c.id==='yas').adim.at(-1).o[0]));

/* 5. Öbür veri */
eq(K.KQ.length,5);for(const q of K.KQ)ok([0,1].includes(q.ans)&&q.why.length>30);ok(new Set(K.KQ.map(q=>q.ans)).size===2);
eq(K.ROLE_QUIZ.length,6);for(const q of K.ROLE_QUIZ)ok(q.ans>=0&&q.ans<K.ROLES.length);eq(new Set(K.ROLE_QUIZ.map(q=>q.ans)).size,K.ROLES.length);
for(let i=0;i<4;i++){ok(K.iterDurum(i,false).length>40);ok(K.iterDurum(i,true).length>40);}eq(K.iterDurum(4,false),null);ok(/TCK m\. 36/.test(K.iterDurum(2,true))&&!/TCK m\. 36/.test(K.iterDurum(2,false)));ok(/TCK m\. 35/.test(K.iterDurum(2,false)));
ok(K.MISTAKES.length>=5&&K.MISTAKES.every(m=>m.title&&m.wrong.length>20&&m.why.length>80&&m.fix));
for(const t of['Sonuç ağırsa kast vardır','Her zarar suçtur','Meşru savunma her karşılığı haklı kılar','Ahlaka aykırı olan suçtur','Kanunda yazmayan benzer fiil de cezalandırılır'])ok(K.MISTAKES.some(m=>m.title.includes(t)),'yanılgı: '+t);
ok(K.TIMELINE.some(t=>t[0]==='1764'&&/Livorno/.test(t[1]))&&K.TIMELINE.some(t=>t[0]==='2005'&&/5252/.test(t[1])));
for(let i=1;i<K.TIMELINE.length;i++)ok(+K.TIMELINE[i][0]>+K.TIMELINE[i-1][0],'zaman çizelgesi sıralı');

/* 6. Madde ayrıştırıcı */
const P=(s)=>K.parseMadde(s);
eq(P('TCK 2/3'),{kanun:'TCK',madde:2,fikra:3});eq(P('tck m. 2 f. 3'),{kanun:'TCK',madde:2,fikra:3});eq(P('5237 s. K. 2-3'),{kanun:'TCK',madde:2,fikra:3});eq(P('TCK 2(3)'),{kanun:'TCK',madde:2,fikra:3});
eq(P('Türk Ceza Kanunu madde 7 fıkra 2'),{kanun:'TCK',madde:7,fikra:2});eq(P('ANAYASA 38'),{kanun:'AY',madde:38,fikra:null});eq(P('AY m. 38/1'),{kanun:'AY',madde:38,fikra:1});eq(P('Any. 38'),{kanun:'AY',madde:38,fikra:null});
eq(P('  7/1  '),{kanun:null,madde:7,fikra:1});eq(P('İKİ'),null);eq(P(''),null);eq(P('TCK 999'),null);eq(P('1 2 3 4'),null);eq(P('TCK 2/99'),null);eq(P('TCK 2,3'),{kanun:'TCK',madde:2,fikra:3});
ok(K.maddeEsit('tck 2/3','TCK 2/3'));ok(K.maddeEsit('2','TCK 2/3'),'fıkrasız yanıt kabul');ok(!K.maddeEsit('TCK 2/2','TCK 2/3'));ok(!K.maddeEsit('Anayasa 2/3','TCK 2/3'));ok(K.maddeEsit('anayasa 38/1','Anayasa 38'));ok(!K.maddeEsit('TCK 38','Anayasa 38'));ok(K.maddeEsit('7/2','TCK 7/2'));
// Doğrulayıcı: başka kanunlar TCK sayılmaz; kanun numaraları madde sanılmaz
eq(P('CMK 2/3').kanun,'DIGER');eq(P('AİHS 7').kanun,'DIGER');eq(P('5271 s. K. 223'),{kanun:'DIGER',madde:223,fikra:null});ok(!K.maddeEsit('CMK 2/3','TCK 2/3'));ok(!K.maddeEsit('AİHS 7','TCK 7/1'));
eq(P('Anayasa’nın 38. maddesi'),{kanun:'AY',madde:38,fikra:null});eq(P('Türk Ceza Kanunu 7. madde 2. fıkra'),{kanun:'TCK',madde:7,fikra:2});eq(P('TCK 2/3 ve 7/1'),null);

/* 7. Alıştırma üreteci: her düzeyde yüzlerce tohum */
const keys={1:new Set(),2:new Set(),3:new Set()},dist={1:new Set(),2:new Set(),3:new Set()};
const L1def=t=>({istedi:t==='kast'?0:1,ongordu:['kast','olasi','bilincli'].includes(t)?0:1,tutum:t==='olasi'?0:t==='bilincli'?1:2,ongorulebilir:t==='taksir'?0:t==='yok'?1:2});
for(const level of[1,2,3])for(let s=1;s<=300;s++){const e=K.gen(level,s);eq(JSON.stringify(K.gen(level,s)),JSON.stringify(e),'tohum kararlı');keys[level].add(e.key);dist[level].add(e.scenario);
  ok(e.scenario.startsWith('Kurgusal '),'kurgusal etiketi');ok(e.hint.length>40&&e.solution.length>=2);
  const right=e.steps.map(x=>x.ans);const tx=e.text?(e.text.acc[0]||''):'';
  eq(K.grade(e,{steps:right,text:tx}).ok,true,`doğru yanıt ${level}/${s}`);
  for(let i=0;i<e.steps.length;i++)for(let j=0;j<e.steps[i].o.length;j++){if(j===e.steps[i].ans)continue;const w=right.slice();w[i]=j;const g=K.grade(e,{steps:w,text:tx});eq(g.ok,false);eq(g.stepOk[i],false);}
  eq(K.grade(e,{steps:right.map((v,i)=>i===0?null:v),text:tx}).parse,true);eq(K.grade(e,{}).parse,true);
  if(level===1){const d=L1def(e.key);eq(right,[d.istedi,d.ongordu,d.tutum,d.ongorulebilir,K.L1_TUR.indexOf(e.key)]);
    const c=K.L1_CTX[e.ctx];ok(e.scenario.includes(c.olgu));ok(e.key==='kast'?e.scenario.includes(c.kast):e.key==='yok'?e.scenario.includes(c.yok):e.scenario.includes(c.risk));
    ok(e.solution.at(-1).includes(K.kusurAd(e.key)));}
  if(level===2){const T=K.L2_T[e.key];eq(right,[T.tip,T.eksik,T.sonuc]);ok((T.eksik===0)===(T.sonuc!==5),'eksik koşul ⇔ neden yok');ok(!/\$\{/.test(e.solution.join(' ')),'şablon artığı');
    ok(!/[PRSTVZCD]’(yı|nın|ya)\b/.test(e.scenario),'ek uyumu: '+e.scenario);}
  if(level===3){eq(e.steps.length,1);if(e.key===0){eq(K.grade(e,{steps:right,text:''}).ok,true);eq(K.grade(e,{steps:right,text:'yok'}).ok,true);eq(K.grade(e,{steps:right,text:'TCK 2/3'}).ok,false);}
    else{eq(K.grade(e,{steps:right,text:''}).parse,true);eq(K.grade(e,{steps:right,text:'abc'}).parse,true);for(const a of e.text.acc){eq(K.grade(e,{steps:right,text:a}).ok,true);eq(K.grade(e,{steps:right,text:'  '+a.toLocaleLowerCase('tr-TR').replace(' ',' m. ')+' '}).ok,true);}
      eq(K.grade(e,{steps:right,text:'TCK 157'}).textOk,false);eq(K.grade(e,{steps:right,text:'TCK 157'}).ok,false);}}}
eq([...keys[1]].sort(),[...K.L1_TUR].sort());
// Doğrulayıcı: “Yeni olay” ardışık tohumlarda aynı olayı vermez; Anayasa fıkrası yanlışsa kabul edilmez; “yoktur” kabul edilir
for(const level of[1,2,3])for(let s=2;s<=300;s++)ok(K.gen(level,s).scenario!==K.gen(level,s-1).scenario,`ardışık aynı olay ${level}/${s}`);
{let s=1;while(K.gen(3,s).key!==3)s++;const e=K.gen(3,s);ok(K.grade(e,{steps:[3],text:'AY m. 38/1'}).ok);ok(!K.grade(e,{steps:[3],text:'AY m. 38/4'}).ok);ok(K.grade(e,{steps:[3],text:'Anayasa 38'}).ok);}
{let s=1;while(K.gen(3,s).key!==0)s++;const e=K.gen(3,s);for(const t of['yoktur','İhlal yoktur','Yok.'])ok(K.grade(e,{steps:[0],text:t}).ok,t);}eq(keys[2].size,K.L2_T.length);eq(keys[3].size,K.L3_T.length);
ok(dist[1].size>=25&&dist[2].size>=25&&dist[3].size>=12,'çeşitlilik '+Object.values(dist).map(s=>s.size));
{let e=null;try{K.gen(4,1);}catch(x){e=x;}ok(e&&e.user);}eq(K.gen(1,0).seed,1);
// L3 dayanakları kanun metniyle: kıyas yasağı 2/3, idari düzenleme 2/2, lehe kanun 7/2, geriye yürümezlik 7/1
eq(K.L3_ACC[2],['TCK 2/3']);eq(K.L3_ACC[4],['TCK 7/2']);ok(K.L3_ACC[1].includes('TCK 2/2')&&K.L3_ACC[3].includes('TCK 7/1'));
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
      const unlabeled=()=>page.evaluate(()=>[...document.querySelectorAll('.app-content input,.app-content select,.app-content textarea')].filter(e=>!document.querySelector('label[for="'+e.id+'"]')).map(e=>e.id).join());
      eq(await unlabeled(),'');
      eq(await page.evaluate(()=>Object.isFrozen(CezaLab)&&!Object.getOwnPropertyDescriptor(window,'CezaLab').writable),true);
      eq(await page.evaluate(()=>/[̀-ͯ]/.test(document.body.innerHTML)),false,'birleşik aksan işareti yok');
      eq(await page.evaluate(()=>document.querySelectorAll('input[type=number]').length),0);eq(await page.evaluate(()=>document.title.length<=80),true);
      eq(await page.evaluate(()=>['mantik-ve-argumantasyon','bayes-olasilik','karar-ve-bilissel-yanliliklar','felsefi-dusunce-deneyleri'].every(s=>document.querySelector('.ch-next a[href="'+s+'.html"]'))),true,'sonraki sayfa bağlantıları');
      eq(await page.evaluate(()=>document.querySelectorAll('.ch-next a[href="hukuka-giris.html"],.ch-next a[href="anayasa-hukuku-ve-temel-haklar.html"],.ch-next a[href="borclar-ve-sozlesme-hukuku.html"],.ch-next a[href="hukuk-felsefesi.html"]').length===4&&!/\(hazırlanıyor\)/.test(document.querySelector('.ch-next').textContent)),true,'öteki hukuk sayfalarına bağlantı');
      await has('calmNote','Bu sayfa hukuki danışmanlık değildir');
      // 01
      await is('zApplied','Hüküm anındaki kanun');await is('zRule','TCK m. 7/2');eq(await page.locator('#zBox2').getAttribute('class'),'is-on');
      await set('zK0','0');await is('zApplied','Hiçbiri: ceza verilemez');await has('zRule','Anayasa m. 38/1');
      await set('zK0','2');await set('zK2','3');await is('zApplied','Fiil anındaki kanun');await has('zStatus','geriye yürümez');
      await set('zK1','1');await is('zApplied','Ara kanun');await has('zStatus','ara kanun');await set('zK1','0');await has('zStatus','suç olmaktan çıkardı');
      await set('zK0','3');await set('zK1','1');await set('zK2','1');await is('zApplied','Hüküm anındaki kanun');await has('zStatus','aynı sonucu');eq(await page.locator('#zBox2').getAttribute('class'),'is-on');await set('zK0','2');await set('zK1','0');await set('zK2','3');
      await set('zGecici',true);await is('zApplied','Fiil anındaki kanun');await has('zStatus','TCK m. 7/4');await set('zK1','');await is('zApplied','Fiil anındaki kanun');await is('zRule','TCK m. 7/4');
      await click('kq1-1');await has('kqFb1','Doğru.');await click('kq0-1');await has('kqFb0','Değil.');await has('kqScore','1 / 2');
      await click('ilkeReset');await is('zApplied','Hüküm anındaki kanun');eq(await page.locator('#zGecici').isChecked(),false);eq(await page.locator('#kqFb0').isHidden(),true);await fits();
      await page.locator('#tab-ilke').focus();await page.keyboard.press('ArrowRight');await sel('unsur');
      // 02
      await is('kSonuc','Bilinçli taksir');await is('kMadde','TCK m. 22/3');await set('kTutum','kabul');await is('kSonuc','Olası kast');await set('kIstedi','1');await is('kSonuc','Kast');await has('kNote','1.');
      await set('kIstedi','0');await set('kOngordu','0');await is('kSonuc','Taksir');await set('kOngorulebilir','0');await is('kSonuc','Kusur yok');await has('kYol','öngöremezdi');
      await click('unsurReset');await is('kSonuc','Bilinçli taksir');await fits();
      // 03
      await click('tab-olay');eq(await page.locator('#oCase option').count(),K.CASES.length);await has('oFacts','Kurgusal olay.');await is('oProg','1 / 5');eq(await page.locator('#oNext').isHidden(),true);
      {const C=K.CASES[0];for(let i=0;i<C.adim.length;i++){await click(`oS${i}-${C.adim[i].ok[0]}`);await has('oFb'+i,'Öğretim çözümüyle uyuşuyor.');if(i<C.adim.length-1)await click('oNext');}
        eq(await page.locator('#oResult').isVisible(),true);await has('oResult','taksirle yaralama');await is('oScore','5 / 5');}
      await set('oCase','sinir');await is('oProg','1 / 4');await is('oScore','—');await click('oS0-1');await has('oFb0','Öğretim çözümü başka.');await click('oS0-0');await is('oScore','0 / 1');await click('oNext');await click('oS1-0');await click('oNext');
      await click('oS2-1');await has('oFb2','Savunulabilir bir yanıt.');eq(await page.locator('.ch-step .tag').count(),1);await click('oNext');await click('oS3-0');await has('oFb3','Bu yanıt savunulamaz.');eq(await page.locator('#oResult').isVisible(),true);
      await set('oCase','zorunluluk');await is('oProg','1 / 4');await page.locator('h1').click();await set('oCase','uyku');await click('oS0-0');await page.locator('h1').click();await page.keyboard.press('r');eq(await page.locator('#oCase').inputValue(),K.CASES[0].id);eq(await page.locator('#oFb0').count(),0);
      await click('olayReset');await fits();
      // 04
      await click('tab-tesebbus');await has('iDurum','teşebbüs');eq(await page.locator('#iS2').getAttribute('aria-pressed'),'true');await set('iVazgec',true);await has('iDurum','gönüllü vazgeçme');
      await click('iS1');await has('iDurum','Hazırlık hareketleri');await click('iS3');await has('iDurum','etkin pişmanlık');await set('iVazgec',false);await click('iS0');await has('iDurum','Düşünce cezalandırılmaz');
      await click('rq4-4');await has('rqFb4','Doğru.');await click('rq4-3');await has('rqFb4','Değil.');await click('tesebbusReset');eq(await page.locator('#iS2').getAttribute('aria-pressed'),'true');eq(await page.locator('#rqFb4').isHidden(),true);await fits();
      // 05
      await click('tab-tarih');eq(await page.locator('#tlList li').count(),K.TIMELINE.length);eq(await page.locator('#mkList .ch-mist').count(),K.MISTAKES.length);
      eq(await page.locator('#mk0').isHidden(),true);await click('mkBtn0');eq(await page.locator('#mk0').isVisible(),true);eq(await page.locator('#mkBtn0').getAttribute('aria-expanded'),'true');await click('tarihReset');eq(await page.locator('#mk0').isHidden(),true);await fits();
      // 06
      await click('tab-alistirma');await is('pSeed','1 · 1');await is('pScore','—');eq(await page.locator('#pTextWrap').isHidden(),true);
      {const e=K.gen(1,1);await has('pScenario',e.scenario.slice(0,40));await click('pCheck');await has('pFb','Bütün adımları yanıtla');
        for(let i=0;i<e.steps.length;i++)await set('pStep'+i,String(i===0?1-e.steps[0].ans:e.steps[i].ans));await click('pCheck');await has('pFb',`${e.steps.length-1} / ${e.steps.length} adım doğru`);await is('pScore','0 / 1');
        await set('pStep0',String(e.steps[0].ans));await click('pCheck');await has('pFb','Bütün adımlar doğru.');await is('pScore','0 / 1');eq(await unlabeled(),'');}
      await click('pHintBtn');eq(await page.locator('#pHint').isVisible(),true);await click('pSolBtn');await has('pSol','Çözüm, adım adım');await click('pNew');await is('pSeed','1 · 2');eq(await page.locator('#pSol').isHidden(),true);
      {await set('pLevel','3');let s=1;while(K.gen(3,s).key!==2)s++;for(let i=1;i<s;i++)await click('pNew');const e=K.gen(3,s);await has('pScenario','zararı benzer');eq(await page.locator('#pTextWrap').isVisible(),true);
        await set('pStep0','2');await click('pCheck');await has('pFb','Dayanak maddeyi yaz');await page.locator('#pText').fill('xyz');await click('pCheck');await has('pFb','Madde okunamadı');
        await page.locator('#pText').fill('tck m. 2 f. 3');await page.locator('#pText').press('Enter');await has('pFb','Bütün adımlar doğru.');eq(e.key,2);}
      {await set('pLevel','2');const e=K.gen(2,1);await has('pScenario',e.scenario.slice(0,30));for(let i=0;i<3;i++)await set('pStep'+i,String(e.steps[i].ans));await click('pCheck');await has('pFb','Bütün adımlar doğru.');}
      await click('alistirmaReset');await is('pSeed','1 · 1');await is('pScore','—');await fits();
      await page.locator('#tab-alistirma').focus();await page.keyboard.press('Home');await sel('ilke');await page.keyboard.press('End');await sel('alistirma');await page.keyboard.press('ArrowLeft');await sel('tarih');
      for(const t of['ilke','unsur','olay','tesebbus','tarih','alistirma']){await click('tab-'+t);await fits();eq(await page.locator('#panel-'+t).isVisible(),true);}
      assert.deepEqual(errors,[]);checks++;await page.close();}
    console.log(`G ${SLUG}: ${checks-before} tarayıcı kontrolü PASS (390 px açık, 1280 px koyu)`);
  }finally{await browser?.close();await new Promise(r=>server.close(r));}
}
