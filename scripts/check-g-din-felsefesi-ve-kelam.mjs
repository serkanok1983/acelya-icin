// Din felsefesi ve kelâm: çekirdeğin bağımsız denetimi.
// Başvurular sayfanın yollarını yinelemez: formüller testin kendi ayrıştırıcısıyla (Pratt, ters Lehçe gösterim
// üzerinden) değerlendirilir; geçerlilik, tutarlılık ve karşı modeller kaba kuvvetle yeniden sayılır; bütün tutum
// bileşimleri (3ⁿ) taranır; Bayes sonucu oran biçimiyle (sonsal oran = önsel oran × çarpan), Pascal beklentileri
// elle hesaplanmış değerlerle, kanıt etiği ölçütleri bağımsız bir karar tablosuyla karşılaştırılır. Kaynak alanları
// scripts/check-site.mjs içindeki izinli önek listesinden okunur. Ayrıca yansızlık ve kaynak kuralları denetlenir.
import fs from 'node:fs';
import vm from 'node:vm';
import assert from 'node:assert/strict';
const SLUG='din-felsefesi-ve-kelam';
const html=fs.readFileSync(new URL(`../${SLUG}.html`,import.meta.url),'utf8');
const source=html.split('/* KERNEL-BEGIN */')[1]?.split('/* KERNEL-END */')[0];
assert(source,'Çekirdek sınırları gerekli');
const context={window:{}};vm.createContext(context);vm.runInContext(source,context);
const K=context.window.DinFelsefe;let checks=0;
const eq=(a,b,m)=>{const x=JSON.stringify(a),y=JSON.stringify(b);assert(x===y,(m?m+': ':'')+x+' ≠ '+y);checks++;},ok=(c,m)=>{assert(c,m);checks++;};
const near=(a,b,tol,m)=>ok(Math.abs(a-b)<=tol,(m||'')+` ${a} ≈ ${b}`);

/* bağımsız mantık: belirteç → ters Lehçe gösterim (shunting-yard) → yığınla değerlendirme */
const PREC={'~':4,'&':3,'|':2,'->':1},RIGHT={'~':true,'->':true};
function rpn(s){const toks=s.match(/->|[~&|()]|[A-Z][A-Za-z0-9]*/g);assert.equal(toks.join(''),s.replace(/\s+/g,''),'tanınmayan simge: '+s);const out=[],ops=[];
  for(const t of toks){if(/^[A-Z]/.test(t))out.push(t);else if(t==='(')ops.push(t);else if(t===')'){while(ops.at(-1)!=='(')out.push(ops.pop());ops.pop();}
    else{if(t!=='~')while(ops.length&&ops.at(-1)!=='('&&(PREC[ops.at(-1)]>PREC[t]||(PREC[ops.at(-1)]===PREC[t]&&!RIGHT[t])))out.push(ops.pop());ops.push(t);}}
  while(ops.length)out.push(ops.pop());return out;}
function val(s,env){const st=[];for(const t of rpn(s)){if(/^[A-Z]/.test(t))st.push(!!env[t]);else if(t==='~')st.push(!st.pop());else{const b=st.pop(),a=st.pop();st.push(t==='&'?a&&b:t==='|'?a||b:(!a||b));}}assert.equal(st.length,1);return st[0];}
const vars=list=>[...new Set(list.flatMap(s=>s.match(/[A-Z][A-Za-z0-9]*/g)))].sort();
function* envs(names){for(let m=0;m<(1<<names.length);m++){const e={};names.forEach((n,i)=>e[n]=!!(m&(1<<i)));yield e;}}
function brute(prem,concl){const names=vars(concl?prem.concat([concl]):prem);let support=0,counter=0;for(const e of envs(names)){if(prem.every(p=>val(p,e))){support++;if(concl&&!val(concl,e))counter++;}}return{support,counter,rows:1<<names.length,valid:counter===0,consistent:support>0};}
/* ayrıştırıcının kendisi: bilinen totolojiler ve hatalar */
for(const t of['P | ~P','(P -> Q) | (Q -> P)','((P -> Q) -> P) -> P','~(P & Q) -> (~P | ~Q)'])eq(K.entails([],t).valid,true,t);
eq(K.entails(['P -> Q','Q'],'P').valid,false,'sonucu doğrulama');eq(K.entails(['P','~P'],null).consistent,false);
eq(K.pretty('A -> B -> C'),'A → (B → C)');eq(K.pretty('~(A & B) | C'),'¬(A ∧ B) ∨ C');
for(const bad of['A &','(A','A B','a -> b','A -> ','',null])assert.throws(()=>K.parse(bad)),checks++;
eq(K.sameForm(['P -> Q','P','Q'],['A -> B','A','B']),true);eq(K.sameForm(['P -> Q','Q','P'],['A -> B','A','B']),false);

/* 1. argüman haritası */
const ids=K.ARGS.map(a=>a.id);eq(new Set(ids).size,ids.length,'benzersiz kimlik');
const kinds=K.ARGS.map(a=>a.kind);ok(kinds.filter(k=>k==='teistik').length>=8&&kinds.filter(k=>k==='ateistik').length>=2,'iki yön de temsil edilmeli');
ok(K.ARGS.some(a=>a.id==='nyaya'),'Batı dışı gelenek haritada');let combos=0;
for(const a of K.ARGS){
  const P=a.premises.map(p=>p.f),C=a.concl.f,b=brute(P,C),r=K.analyze(a.id,{});
  eq(b.valid,true,a.id+' geçerli');eq([r.valid,r.rows,r.support],[b.valid,b.rows,b.support],a.id+' sayım');
  eq(r.needed,P.map((_,i)=>!brute(P.filter((_,j)=>j!==i),C).valid),a.id+' gerekli öncüller');ok(r.needed.every(Boolean),a.id+': her öncül gerekli olmalı');
  eq(Object.keys(a.atoms).sort(),vars(P.concat([C])),a.id+' simge açıklamaları');
  for(const o of a.objections){ok(o.target.length>0&&o.target.every(t=>a.premises.some(p=>p.id===t)),a.id+'/'+o.id+' hedef');ok(o.who&&o.t.length>20,a.id+'/'+o.id+' metin');}
  if(a.kind!=='parodi'){ok(a.objections.length>=2,a.id+': en az iki itiraz');ok(new Set(a.objections.map(o=>o.id)).size===a.objections.length);}
  const n=a.premises.length;
  for(let m=0;m<3**n;m++){const st={};let x=m;a.premises.forEach(p=>{st[p.id]=K.STANCES[x%3];x=Math.floor(x/3);});combos++;
    const acc=a.premises.filter(p=>st[p.id]==='kabul').map(p=>p.f),q=K.analyze(a.id,st),bb=brute(acc,C);
    eq(q.follows,bb.valid,a.id+' çıkar mı '+JSON.stringify(st));eq([q.nAcc,q.nRej,q.nOpen],[acc.length,a.premises.filter(p=>st[p.id]==='ret').length,a.premises.filter(p=>st[p.id]==='askida').length]);
    if(q.counter){ok(acc.every(f=>val(f,q.counter))&&!val(C,q.counter),a.id+': karşı model öncülleri doğrulayıp sonucu yanlışlamalı');}else ok(bb.valid);
    q.claims.forEach((c,i)=>{const f=i<a.claims.length?a.claims[i].f:C;eq(c.follows,brute(acc,f).valid,a.id+' ara sonuç');});
    a.objections.forEach((o,i)=>{const s=o.target.map(t=>st[t]);eq(q.obj[i].status,s.includes('kabul')?'canli':s.every(v=>v==='ret')?'ortak':'askida');});}}
eq(K.analyze('kalam',{P1:'kabul',P2:'kabul'}).claims.map(c=>c.follows),[true,false],'kalâm: birinci aşama çıkar, ikinci çıkmaz');
/* doğrulayıcı: “ilk neden Tanrı’dır” özdeşliği ayrı öncül; ona yönelen itiraz o öncülü hedefler */
{const y=K.ARGS.find(a=>a.id==='ikinciyol');eq(y.premises.map(p=>p.f),['N','N -> (S | I)','~S','I -> T']);eq(y.objections.find(o=>o.id==='tanri').target,['P4']);eq(K.analyze('ikinciyol',{P1:'kabul',P2:'kabul',P3:'kabul'}).claims.map(c=>c.follows),[true,false]);}
assert.throws(()=>K.analyze('yok',{}));assert.throws(()=>K.analyze('kalam',{P1:'belki'}));checks+=2;
/* biçim ikizleri: aynı biçim; başka argümanlarla değil */
for(const[x,y]of[['anselm','gaunilo'],['plantinga','tersmodal']]){eq(K.twinCheck(x).same,true,x);eq(K.twinCheck(y).same,true,y);}
const form=id=>{const a=K.ARGS.find(v=>v.id===id);return a.premises.map(p=>p.f).concat([a.concl.f]);};
eq(K.sameForm(form('anselm'),form('kalam')),false);eq(K.twinCheck('kalam'),null);
/* ters kipsel ve Plantinga'nın ilk öncülleri, ikinci-üçüncü öncüllerle birlikte tutarsızdır (G ve Y = ¬G eşlenince) */
eq(brute(['M','M -> N','N -> G','Q','Q -> Z','Z -> ~G'],null).consistent,false,'simetri');
/* genel görünüm: kaba kuvvet sayımı */
for(const o of K.overview()){const a=K.ARGS.find(v=>v.id===o.id);const cnt=a.premises.map(p=>a.objections.filter(b=>b.target.includes(p.id)).length);eq(o.topCount,Math.max(...cnt));eq(cnt[a.premises.findIndex(p=>p.id===o.top)],o.topCount);eq([o.premises,o.objections],[a.premises.length,a.objections.length]);}
eq(K.overview().length,K.ARGS.filter(a=>a.kind!=='parodi').length);

/* 2a. mantıksal kötülük sorunu: 64 alt kümenin tutarlılığı ve en küçük tutarsız kümeler */
const ES=K.EVIL_SET;eq(ES.map(c=>c.id),['C1','C2','C3','C4','C5','C6']);
const inc=[];for(let m=1;m<64;m++){const sel=ES.filter((_,i)=>m&(1<<i));const r=K.evilCheck(sel.map(c=>c.id)),b=brute(sel.map(c=>c.f),null);eq(r.consistent,b.consistent);eq(r.models,b.support);
  if(r.model)ok(sel.every(c=>val(c.f,r.model)),'model doğrulanmalı');if(!b.consistent)inc.push(m);}
const minimal=inc.filter(m=>!inc.some(n=>n!==m&&(n&m)===n)).map(m=>ES.filter((_,i)=>m&(1<<i)).map(c=>c.id).join(','));
eq(minimal.sort(),['C1,C2,C3,C4','C1,C3,C5,C6'].sort());eq(K.evilCheck(ES.map(c=>c.id)).minimal.map(x=>x.join(',')).sort(),minimal.sort());
eq(K.evilCheck(['C1','C2','C4','C5','C6']).consistent,true,'özgür irade savunması tutarlı');eq(K.evilCheck(['C1','C2','C3','C4']).consistent,false,'Mackie kümesi tutarsız');
eq(Object.keys(K.EVIL_ATOMS).sort(),vars(ES.map(c=>c.f)));

/* 2b. Bayes oyuncağı: oran biçimi */
for(const pr of[0.01,0.2,0.5,0.8,0.99])for(const a of[0.01,0.3,0.55,1])for(const b of[0.05,0.6,1]){const r=K.bayes(pr,a,b);near(r.postOdds,pr/(1-pr)*a/b,1e-9*(1+r.postOdds));near(r.post,(pr*a)/(pr*a+(1-pr)*b),1e-12);ok(r.post>0&&r.post<1);ok((a>b)===(r.post>pr)||a===b);}
near(K.posterior(0.5,0.3,0.6),1/3,1e-12,'varsayılan');near(K.posterior(0.8,0.3,0.6),2/3,1e-12);near(K.posterior(0.5,0.55,0.6),0.55/1.15,1e-12);
{const r=K.bayesInterval(0.5,0.05,0.95,0.6);near(r.lo,0.05/0.65,1e-12);near(r.hi,0.95/1.55,1e-12);ok(r.lo<1/3&&r.hi>1/3);}
for(const bad of[[0,0.3,0.6],[1,0.3,0.6],[0.5,0,0.6],[0.5,0.3,1.2]])assert.throws(()=>K.posterior(...bad)),checks++;
assert.throws(()=>K.bayesInterval(0.5,0.9,0.1,0.6));checks++;

/* 3a. Pascal */
const base={p:0.5,q:0,many:false,mixed:false,inf:true,v11:1000,v12:-1,v21:-10,v22:1};
{const r=K.pascal(base);eq(r.eFor,Infinity);near(r.eAg,-4.5,1e-12);eq(r.best,['inan']);eq([r.domFor,r.domAg],[false,false]);}
{const r=K.pascal({...base,inf:false});near(r.eFor,499.5,1e-12);near(r.eAg,-4.5,1e-12);}
{const r=K.pascal({...base,p:0});near(r.eFor,-1,1e-12);near(r.eAg,1,1e-12);eq(r.best,['inanma'],'p = 0');}
{const r=K.pascal({...base,p:0.001});eq(r.eFor,Infinity,'küçük artı olasılık');}
{const r=K.pascal({...base,v12:0,v22:0});eq(r.domFor,true,'üstün baskınlık');}
{const r=K.pascal({...base,many:true,q:0.01});ok(Number.isNaN(r.eFor),'çok tanrı: ∞ − ∞');eq(r.eAg,Infinity);eq(r.undefinedAny,true);eq(r.best,[]);near(r.probs.reduce((s,x)=>s+x,0),1,1e-12);}
{const r=K.pascal({...base,mixed:true});eq(r.eMix,Infinity);eq(r.best.sort(),['inan','karma'],'Pascal’ın intikamı');}
{const r=K.pascal({...base,many:true,q:0});eq(r.eFor,Infinity,'q = 0 terimi düşer');}
assert.throws(()=>K.pascal({...base,p:0.8,many:true,q:0.3}));assert.throws(()=>K.pascal({...base,p:-0.1}));checks+=2;
eq(K.dominates([1,2],[1,1]),true);eq(K.dominates([1,1],[1,1]),false);eq(K.dominates([2,0],[1,1]),false);

/* 3b. kanıt etiği: bağımsız karar tablosu, 3 × 2⁶ durum */
let vcount=0;for(const ev of['yeterli','dengede','yetersiz'])for(let m=0;m<64;m++){const c={evidence:ev,live:!!(m&1),forced:!!(m&2),momentous:!!(m&4),religious:!!(m&8),basic:!!(m&16),defeater:!!(m&32)};const v=K.verdicts(c);vcount++;
  const exp={clifford:ev==='yeterli'?'evet':'hayir',james:ev==='yeterli'||(ev==='dengede'&&c.live&&c.forced&&c.momentous)?'evet':'hayir',reformcu:ev==='yeterli'?'evet':!c.basic?'hayir':c.defeater?'bozucu':'evet',imanci:c.religious?'disinda':'konudisi'};
  eq([v.clifford,v.james,v.reformcu,v.imanci],[exp.clifford,exp.james,exp.reformcu,exp.imanci],JSON.stringify(c));}
eq(vcount,192);assert.throws(()=>K.verdicts({evidence:'belki'}));checks++;

/* 4. kelâm karşılaştırması: kapsam ve kaynaklar */
const site=fs.readFileSync(new URL('./check-site.mjs',import.meta.url),'utf8');const prefixes=[...site.split('const SOURCE_PREFIXES = [')[1].split('];')[0].matchAll(/"([^"]+)"/g)].map(m=>m[1]);ok(prefixes.length>50);
for(const[k,u]of Object.entries(K.SOURCES))ok(prefixes.some(p=>u.startsWith(p)),'izinli kaynak: '+k+' '+u);
const T=new Set(K.TRADS.map(t=>t.id)),TP=new Set(K.TOPICS.map(t=>t.id));let cells=0;
for(const[tr,row]of Object.entries(K.CELLS)){ok(T.has(tr),'gelenek '+tr);for(const[tp,c]of Object.entries(row)){ok(TP.has(tp),'konu '+tp);ok(c[0].length>30,'hücre metni');ok(K.SOURCES[c[1]],'kaynak anahtarı '+c[1]);cells++;}}
for(const t of K.TRADS)ok(K.CELLS[t.id]&&Object.keys(K.CELLS[t.id]).length>=1,'her geleneğin en az bir hücresi: '+t.id);
const gr=new Set(K.TRADS.map(t=>t.group));for(const g of['Kelâm','İslam felsefesi','Skolastik','Hint','Budist'])ok(gr.has(g),'grup '+g);
{const all=K.TRADS.map(t=>t.id);let tot=0;for(let i=0;i<all.length;i+=3){const ids=all.slice(i,i+3);const r=K.compare(ids,'hepsi');eq(r.total,ids.length*K.TOPICS.length);eq(r.filled,ids.reduce((s,id)=>s+Object.keys(K.CELLS[id]).length,0));tot+=r.filled;}eq(tot,cells);}
eq(K.compare(['mutezile','esariyye','maturidiyye'],'hepsi').filled,15);eq(K.compare(['mutezile','esariyye','maturidiyye'],'iyikotu').filled,3);
assert.throws(()=>K.compare(['yok'],'hepsi'));assert.throws(()=>K.compare(['mutezile'],'yok'));checks+=2;
/* sınama soruları: yanıt okulu, ilgili konuda tabloda bir hücresi olan bir kelâm okulu; her okul en az iki soruda */
const QS=['mutezile','esariyye','maturidiyye'];for(const q of K.QUIZ)ok(QS.includes(q.ans),'soru okulu');for(const s of QS)ok(K.QUIZ.filter(q=>q.ans===s).length>=2,'denge '+s);
const QT=['iyikotu','iyikotu','iyikotu','fiil','neden','fiil','sifat','sifat'];K.QUIZ.forEach((q,i)=>ok(K.CELLS[q.ans][QT[i]],'soru '+i+' tabloya dayanmalı'));

/* sayfa kuralları: başlık, birleşik işaretler, yansızlık, dış kaynaklar, alıntı uzunluğu */
const title=html.match(/<title>([^<]+)<\/title>/)[1];ok(title.startsWith('Din Felsefesi ve Kelâm: ')&&title.length<=80,'başlık');
ok(/data-page="din-felsefesi-ve-kelam"/.test(html));ok(!/[̀-ͯ⃗]/.test(html),'birleşik harf üstü işaret yok');
ok(!/<script[^>]+src="https?:/.test(html)&&!/<link[^>]+href="https?:/.test(html),'dış betik/yazı tipi yok');
const text=html.replace(/<script[\s\S]*?<\/script>/g,'').replace(/<style[\s\S]*?<\/style>/g,'').replace(/<[^>]+>/g,' ');
for(const re of[/\bilkel\b/i,/\bbatıl\b/i,/\bhurafe/i,/doğru din/i,/üstün din/i,/kanıtlanmıştır/i,/çürütülmüştür/i,/ispatlanmıştır/i])ok(!re.test(text+source),'yansızlık: '+re);
ok(/hiçbir argümanı kazanan/.test(text)&&/hiçbir inancı doğru ya da yanlış ilan etmez/.test(text),'yansızlık beyanı');
for(const u of[...html.matchAll(/href="(https?:[^"]+)"/g)].map(m=>m[1]))ok(prefixes.some(p=>u.startsWith(p)),'izinli bağlantı '+u);
for(const l of['mantik-ve-argumantasyon','epistemoloji','felsefi-dusunce-deneyleri','bilim-felsefesi','bayes-olasilik'])ok(html.includes(`href="${l}.html"`)&&fs.existsSync(new URL(`../${l}.html`,import.meta.url)),'bağlantı '+l);
for(const q of[...text.matchAll(/“([^”]+)”/g)].map(m=>m[1]))ok(q.split(/\s+/).length<=15,'alıntı en çok 15 sözcük: '+q);
console.log(`G din felsefesi ve kelâm: ${checks.toLocaleString('tr-TR')} bağımsız çekirdek kontrolü PASS (${combos} tutum bileşimi)`);

if(process.argv.includes('--browser')){
  const {chromium}=await import('playwright');const {createServer}=await import('node:http');const {join,extname}=await import('node:path');const {fileURLToPath}=await import('node:url');const root=fileURLToPath(new URL('../',import.meta.url));
  const server=createServer((req,res)=>{const file=join(root,decodeURIComponent(new URL(req.url,'http://localhost').pathname));if(!fs.existsSync(file)||fs.statSync(file).isDirectory()){res.writeHead(404).end();return;}res.setHeader('Content-Type',({'.html':'text/html; charset=utf-8','.js':'text/javascript; charset=utf-8','.css':'text/css; charset=utf-8'})[extname(file)]||'application/octet-stream');res.end(fs.readFileSync(file));});await new Promise(r=>server.listen(0,'127.0.0.1',r));let browser;
  try{browser=await chromium.launch();const before=checks;
  for(const[width,theme]of[[390,'light'],[1280,'dark']]){
    const page=await browser.newPage({viewport:{width,height:900},deviceScaleFactor:width===390?2:1,hasTouch:width===390});await page.addInitScript(t=>{localStorage.setItem('acelya-theme',t);localStorage.setItem('acelya-sound-muted','1');},theme);page.setDefaultTimeout(8000);
    const errors=[];page.on('pageerror',e=>errors.push(e.message));page.on('console',m=>{if(m.type()==='error'&&!/404|Failed to load resource/.test(m.text()))errors.push(m.text());});
    page.on('response',r=>{if(r.status()>=400)errors.push(r.status()+' '+r.url());});
    const requests=[];page.on('request',r=>{const u=new URL(r.url());if(u.hostname!=='127.0.0.1'&&!/^fonts\.(googleapis|gstatic)\.com$/.test(u.hostname))requests.push(r.url());});
    await page.goto(`http://127.0.0.1:${server.address().port}/${SLUG}.html`);
    const click=id=>page.locator('#'+id).click(),read=id=>page.locator('#'+id).textContent(),has=async(id,text)=>{const t=await read(id);assert(t.includes(text),`${id}: “${t}” içinde “${text}” yok (${width})`);checks++;},
      range=(id,v)=>page.locator('#'+id).evaluate((e,v)=>{e.value=v;e.dispatchEvent(new Event('input',{bubbles:true}));},v),sel=(id,v)=>page.locator('#'+id).selectOption(v),
      cls=async(id,c)=>{eq((await page.locator('#'+id).getAttribute('class')).split(' ').includes(c),true,id+' sınıfı '+c);},
      noflow=async tag=>{eq(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),true,'yatay taşma: '+tag+' '+width);};
    eq(await page.evaluate(()=>document.title.length<=80),true);
    /* Keşif Defteri yüklenip görünür olmalı */
    await page.waitForFunction(()=>{const d=document.querySelector('.digest');return !!d&&d.getBoundingClientRect().height>0&&getComputedStyle(d).display!=='none';},null,{timeout:8000});checks++;
    { const d=await page.evaluate(()=>document.querySelector('.digest').textContent);ok(d.includes('Aynı kanıt, farklı sonsallar')&&d.includes('karma strateji'),'defter içeriği'); }
    await page.locator('#pStepNote').waitFor({state:'attached'});checks++;
    /* 1. sekme */
    eq(await page.locator('#aSel').inputValue(),'kalam');await has('aValid','Geçerli · 8 satır');await has('aSupport','1 / 8');await has('aCount','0 kabul · 3 askıda · 0 ret');await has('aFollow','Hayır');await has('aStatus','Henüz hiçbir öncüle');
    eq(await page.locator('#aObj .df-obj').count(),6);eq(await page.locator('#aObj .is-canli').count(),0);
    await click('aP-P1-kabul');await click('aP-P2-kabul');await has('aFollow','Hayır');await has('aClaims','çıkıyor');await has('aCounter','T yanlış');await has('aStatus','askıda');eq(await page.locator('#aObj .is-canli').count(),5);await cls('aP-P1','is-kabul');
    await click('aP-P3-kabul');await has('aFollow','Evet');await has('aStatus','Bütün öncülleri kabul ettin');eq(await page.locator('#aClaims em.ok').count(),2);
    await click('aP-P3-ret');await has('aStatus','Ö3 öncülünü reddettin');await cls('aO-martin','is-ortak');await cls('aP-P3','is-ret');eq(await page.locator('#aP-P3-ret').getAttribute('aria-pressed'),'true');
    await sel('aSel','anselm');await has('aCount','0 kabul');await has('aFormula','U ∧ ¬R');eq(await page.locator('#aTwinSec').isVisible(),true);await click('aTwinBtn');await has('aTwinStatus','Aynı biçim');await has('aTwinR','ada');
    await click('aAll');await has('aFollow','Evet');await cls('aO-kant','is-canli');await click('aNone');await has('aCount','0 kabul');
    await sel('aSel','plantinga');await click('aTwinBtn');await has('aTwinStatus','birlikte doğru olamaz');
    await sel('aSel','rowe');await has('aWho','ateistik');await has('aValid','4 satır');eq(await page.locator('#aTwinSec').isVisible(),false);
    eq(await page.locator('#aOverRows tr').count(),12);await click('aOv-nyaya');eq(await page.locator('#aSel').inputValue(),'nyaya');await has('aIntro','Udayana');
    await sel('aSel','inceayar');await click('aP-P4-kabul');eq(await page.locator('#aObj .is-canli').count(),4);
    await click('haritaReset');eq(await page.locator('#aSel').inputValue(),'kalam');await has('aCount','0 kabul');await noflow('harita');
    /* 2. sekme */
    await click('tab-kotuluk');await has('eStatus','Bir ya da birkaç');await click('eMackie');await has('eStatus','Tutarsız');await has('eMin','{C1, C2, C3, C4}');await has('eModels','0 / 8');
    await click('eFwd');await has('eStatus','Tutarlı');await has('eStatus','birlikte doğru olabiliyor');await has('eModels','1 / 16');
    await click('eAllC');await has('eMin','{C1, C3, C5, C6}');await page.locator('#eC3').uncheck();await has('eStatus','Tutarlı');
    await has('bPost','%33,3');await has('bBF','0,50');await has('bStatus','düşürüyor');await range('bLikT',0.6);await has('bStatus','değiştirmiyor');await has('bPost','%50,0');
    await click('bTheo');await has('bPost','%47,8');await has('bReply','P(E | T) yükselir');await click('bSkep');await has('bPost','%7,7 – %61,3');eq(await page.locator('#bIntBox').isVisible(),true);
    await click('bCum');await has('bPost','%66,7');await has('bPriorOut','%80');await click('bDraper');await has('bPost','%33,3');await click('bayesReset');await has('bLikTOut','0,30');await noflow('kotuluk');
    /* 3. sekme */
    await click('tab-iman');await has('pEFor','+∞');await has('pEAg','−4,50');await has('pDom','Baskın eylem yok');await has('pStatus','genel beklenti');
    await click('pZeroP');await has('pEFor','−1,00');await has('pEAg','1,00');await has('pStatus','0 · ∞ = 0');
    await click('pDomP');await has('pDom','Bahse girmek baskın');await has('pStatus','üstün baskınlık');
    await click('pEqualP');await page.locator('#pInf').uncheck();await has('pEFor','499,50');await page.locator('#pInf').check();
    await page.locator('#pMany').check();await has('pEFor','tanımsız');await has('pEAg','+∞');await has('pStatus','çok tanrı');eq(await page.locator('#pColT2').isVisible(),true);await range('pP',0.99);await range('pQ',0.5);await has('pQOut','0,01');
    await click('pascalReset');await page.locator('#pMixed').check();await has('pEMix','+∞');await has('pStatus','karma strateji itirazı');await click('pascalReset');eq(await page.locator('#pMixStat').isVisible(),false);
    await has('cV-clifford','izin vermez');await has('cV-james','izin vermez');await has('cV-imanci','konu dışı');await has('cStatus','0 tanesi');
    await sel('cPreset','james');await has('cV-james','izin verir');await has('cV-clifford','izin vermez');await has('cV-imanci','kanıt ölçüsünün dışında');
    await sel('cPreset','temel');await has('cV-reformcu','izin verir');await page.locator('#cDef').check();await has('cV-reformcu','bozucu');eq(await page.locator('#cPreset').inputValue(),'ozel');
    await sel('cPreset','agac');await has('cStatus','3 tanesi');await click('kanitReset');eq(await page.locator('#cPreset').inputValue(),'gemi');await noflow('iman');
    /* 4. sekme */
    await click('tab-kelam');await has('kCount','15 / 24');await has('kGroups','Kelâm');eq(await page.locator('#kRows tr').count(),8);await has('kR-iyikotu','şer‘î');
    await sel('kTopic','neden');eq(await page.locator('#kRows tr').count(),1);await has('kCount','1 / 3');
    await click('kFalsafa');await has('kCount','3 / 3');await has('kStatus','Farklı gruplardan');await sel('kTopic','hepsi');await click('kHint');await has('kGroups','Hint · Budist');await has('kRows','Vasubandhu');
    await sel('kB','nyaya');await has('kStatus','Aynı gelenek');
    await click('kq0-mutezile');await has('kqScore','1 / 1');await has('kqFb0','Doğru');await click('kq1-mutezile');await has('kqScore','1 / 2');eq(await page.locator('#kq1-esariyye').getAttribute('data-res'),'ok');await has('kqFb1','Eş‘ariyye');
    await click('kelamReset');await has('kqScore','0 / 0');await has('kCount','15 / 24');await noflow('kelam');
    await click('kOpenImkan');eq(await page.locator('#tab-harita').getAttribute('aria-selected'),'true');eq(await page.locator('#aSel').inputValue(),'imkan');
    /* klavye, R tuşu, etiketler, sayı biçimi, gizlilik */
    await page.locator('#tab-harita').focus();await page.keyboard.press('End');eq(await page.locator('#tab-kelam').getAttribute('aria-selected'),'true');await page.keyboard.press('ArrowRight');eq(await page.locator('#tab-harita').getAttribute('aria-selected'),'true');await page.keyboard.press('ArrowLeft');eq(await page.locator('#tab-kelam').getAttribute('aria-selected'),'true');await page.keyboard.press('Home');eq(await page.locator('#tab-harita').getAttribute('aria-selected'),'true');
    await click('aP-P1-kabul');await page.locator('h1').click();await page.keyboard.press('r');await has('aCount','0 kabul');
    eq(await page.evaluate(()=>[...document.querySelectorAll('main input,main select')].filter(e=>!(e.labels&&e.labels.length)&&!e.getAttribute('aria-label')).map(e=>e.id)),[]);
    eq(await page.evaluate(()=>[...document.querySelectorAll('main button')].filter(b=>!b.textContent.trim()&&!b.getAttribute('aria-label')).length),0);
    eq(await page.evaluate(()=>Object.isFrozen(DinFelsefe)&&Object.isFrozen(DinFelsefe.ARGS[0].premises)&&!Object.getOwnPropertyDescriptor(window,'DinFelsefe').writable),true);
    eq(await page.evaluate(()=>/\d\.\d/.test([...document.querySelectorAll('.df-stat strong,.df-status,output,#kRows')].map(e=>e.textContent).join(' '))),false,'ondalık nokta');
    eq(await page.evaluate(()=>Object.keys(localStorage).filter(k=>!/^acelya-(theme|sound-muted)$/.test(k))),[],'sayfa localStorage kullanmamalı');
    eq(requests,[],'dış istek');
    assert.deepEqual(errors,[]);checks++;await page.close();
  }
  console.log(`G din felsefesi ve kelâm: ${checks-before} tarayıcı kontrolü (390 açık / 1280 koyu; dört sekme, hazırlar, sıfırlamalar, klavye) PASS`);
  }finally{await browser?.close();await new Promise(r=>server.close(r));}
}
