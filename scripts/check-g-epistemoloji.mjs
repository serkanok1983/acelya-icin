// Epistemoloji: çekirdeğin bağımsız denetimi.
// Başvurular sayfanın yollarını yinelemez: elle yazılmış hüküm tabloları, kaba kuvvet doğruluk tablosu, ayrı bir
// zincir izleyici, BigInt kesirleriyle kesin Bayes çarpanları, açık nesne listesinden örnekleme ve kapalı biçimler.
import fs from 'node:fs';
import vm from 'node:vm';
import assert from 'node:assert/strict';
const SLUG='epistemoloji';
const html=fs.readFileSync(new URL(`../${SLUG}.html`,import.meta.url),'utf8');
const source=html.split('/* KERNEL-BEGIN */')[1]?.split('/* KERNEL-END */')[0];
assert(source,'Çekirdek sınırları gerekli');
const context={window:{}};vm.createContext(context);vm.runInContext(source,context);
const K=context.window.Episteme;let checks=0;
const eq=(a,b,m)=>{const x=JSON.stringify(a),y=JSON.stringify(b);assert(x===y,(m?m+': ':'')+x+' ≠ '+y);checks++;},ok=(c,m)=>{assert(c,m);checks++;};
const near=(a,b,tol,m)=>{assert(Math.abs(a-b)<=tol*Math.max(1,Math.abs(b)),`${m}: ${a} ≉ ${b}`);checks++;};
let seed=20261113;const rnd=()=>{seed=(seed*1664525+1013904223)>>>0;return seed/4294967296;},ri=n=>Math.floor(rnd()*n);
ok(Object.isFrozen(K)&&Object.isFrozen(K.CASES)&&Object.isFrozen(K.CASES[0].f),'çekirdek dondurulmuş');

/* 0. Sayı biçimi */
const NB=' ';
for(const[x,d,s]of[[0.5,4,'0,5000'],[-1.25,2,'−1,25'],[9950,0,'9950'],[10000,0,'1'+'0'+NB+'000'],[990000,0,'990'+NB+'000'],[1234567.891,2,'1'+NB+'234'+NB+'567,89'],[-0.00001,2,'0,00']])eq(K.fmt(x,d),s,'fmt '+x);
eq(K.sci(1.0101e-6,3),'1,01 × 10⁻⁶');eq(K.sci(9.999e-5,3),'1,00 × 10⁻⁴');eq(K.fmtExcess(0),'1 (tam)');eq(K.fmtExcess(1/99),'1,0101');eq(K.fmtExcess(-0.5),'0,5000');
eq(K.fmtProb(0.5),'0,5000');eq(K.fmtProb(0,-Infinity),'0');eq(K.fmtProb(1,Infinity),'1');ok(K.fmtProb(1/(1+Math.exp(-12)),12).startsWith('1 − 6,14 × 10⁻⁶'),'uçta 1 − x');

/* 1. Bilgi çözümlemeleri: elle yazılmış beklenen tablo (B = bilgi) */
const EXP={/*            gdi yd boz ned guv duy gvn */
 yagmur:  'BBBBBBB', tahmin:'-------', yanlis:'-------', para:'B---B--', ford:'B---B--',
 ambar:   'BB-B---', saat:  'B---B--', piyango:'BBB-B--', beyin:'BBBBB-B'};
const TK=['gdi','yd','boz','ned','guv','duy','gvn'];
eq(K.THEORIES.map(t=>t.k),TK);eq(K.CASES.map(c=>c.k),Object.keys(EXP));
for(const[ck,row]of Object.entries(EXP))TK.forEach((tk,i)=>eq(K.verdict(tk,ck),row[i]==='B',`${tk}/${ck}`));
/* koşulların elle kontrolü: üçlü koşul yalnız yanlış, tahmin vakalarında eksik */
eq(K.failing('yanlis'),['doğruluk']);eq(K.failing('tahmin'),['gerekçe']);for(const c of['yagmur','para','ford','ambar','saat','piyango','beyin'])eq(K.failing(c),[]);
const COMMON={yagmur:'B',tahmin:'D',yanlis:'D',para:'D',ford:'D',ambar:'D',saat:'D',piyango:'D',beyin:'?'};for(const c of K.CASES)eq(c.common,COMMON[c.k],'sezgi '+c.k);
eq(K.CASES.filter(c=>c.contested).map(c=>c.k),['ambar','piyango','beyin']);
/* karşı örnekler: kuramın “bilgi” dediği ama yaygın sezginin “değil” dediği vakalar (bağımsız sayım) */
for(const tk of TK){const exp=Object.keys(EXP).filter(ck=>COMMON[ck]!=='?'&&(EXP[ck][TK.indexOf(tk)]==='B')!==(COMMON[ck]==='B'));eq(K.counterexamples(tk).map(x=>x.k),exp,'karşı örnek '+tk);}
eq(K.counterexamples('gdi').map(x=>x.k),['para','ford','ambar','saat','piyango']);eq(K.counterexamples('duy'),[]);eq(K.counterexamples('gvn'),[]);
/* uyum sayımı: rastgele yanıtlar, bağımsız sayım */
for(let r=0;r<300;r++){const ans={};for(const ck of Object.keys(EXP)){const u=ri(4);if(u===0)ans[ck]='B';else if(u===1)ans[ck]='D';else if(u===2)ans[ck]='K';}
  const ag=K.agreement(ans);let n=0;for(const ck in ans)if(ans[ck]==='B'||ans[ck]==='D')n++;
  TK.forEach((tk,i)=>{let a=0;for(const ck in ans)if((ans[ck]==='B'||ans[ck]==='D')&&(ans[ck]==='B')===(EXP[ck][i]==='B'))a++;eq([ag[tk].agree,ag[tk].n],[a,n]);});
  const top=Math.max(...TK.map(tk=>ag[tk].agree));eq(K.best(ans).keys,TK.filter(tk=>ag[tk].agree===top));}
{const ans={...COMMON};delete ans.beyin;eq(K.best(ans).keys,['duy','gvn']);eq(K.best(ans).agree,8);eq(K.agreement(ans).gdi.agree,3);}

/* 2. Şüpheci üçlü: kendi doğruluk tablomla bütün 27 tutum bileşimi */
const ATT=['kabul','ret','askida'];
for(const a of ATT)for(const b of ATT)for(const c of ATT){const rows=[];for(const A of[true,false])for(const Kn of[true,false]){const val={A,B:(!A)||Kn,C:!Kn};const att={A:a,B:b,C:c};if(Object.keys(att).every(p=>att[p]==='askida'||(att[p]==='kabul')===val[p]))rows.push({A,K:Kn});}
  const r=K.triad({A:a,B:b,C:c});eq(r.consistent,rows.length>0,a+b+c);eq(r.rows.map(x=>[x.A,x.K]),rows.map(x=>[x.A,x.K]),a+b+c);}
eq(K.triad({A:'kabul',B:'kabul',C:'kabul'}).pos,'tutarsiz');eq(K.triad({A:'ret',B:'kabul',C:'kabul'}).pos,'supheci');eq(K.triad({A:'kabul',B:'kabul',C:'ret'}).pos,'moore');
eq(K.triad({A:'kabul',B:'ret',C:'kabul'}).pos,'kapanis');eq(K.triad({A:'askida',B:'askida',C:'askida'}).pos,'pyrrhon');eq(K.triad({A:'askida',B:'askida',C:'askida'}).rows.length,4);
for(const[att,n]of[[['ret','kabul','kabul'],1],[['kabul','kabul','ret'],1],[['kabul','ret','kabul'],1]])eq(K.triad({A:att[0],B:att[1],C:att[2]}).rows.length,n);
/* bağlamcı okuma: her bağlamda B doğru ve A, B, C birlikte tutarlı */
for(const ctx of['gundelik','supheci']){const v=K.contextual(ctx);eq(v.B,(!v.A)||v.K);eq(v.C,!v.K);ok(v.B);}eq(K.contextual('yok'),null);

/* 3. Gerekçe zinciri: ayrı bir izleyiciyle 2000 rastgele dayanak ataması */
const KINDS=['deneyim','yok','sonsuz'];
function trace(sup,s){let cur=s;const order=[s];for(let step=0;step<50;step++){const v=sup[cur];if(typeof v==='string')return{len:order.length,end:v};const at=order.indexOf(v);if(at>=0)return{len:order.length,end:'dongu',cyc:order.length-at};order.push(v);cur=v;}throw 0;}
for(let r=0;r<2000;r++){const sup=Array.from({length:6},(_,i)=>{if(rnd()<.3)return KINDS[ri(3)];let j;do j=ri(6);while(j===i);return j;});
  for(let s=0;s<6;s++){const a=K.chain(sup,s),b=trace(sup,s);eq(a.path.length,b.len);eq(a.end,b.end);eq(a.horn,b.end==='dongu'?'dongu':b.end==='sonsuz'?'sonsuz':'durma');if(b.end==='dongu')eq(a.path.length-a.loopAt,b.cyc);}
  const cen=K.census(sup);eq(cen.durma+cen.dongu+cen.sonsuz,6);}
assert.throws(()=>K.chain([0,'yok','yok','yok','yok','yok'],0));checks++;
eq(K.BELIEFS.length,6);eq(K.IE_CASES.map(c=>[c.internal,c.reliab]),[[true,true],[false,true],[true,false]]);

/* 4. Kuzgunlar: BigInt kesirleriyle kesin çarpan, açık nesne listesiyle olabilirlik */
const W=K.PRESETS;
const frac=(A,B,ev,m)=>{const pick=(X)=>{const tot=m==='nesne'?X.BR+X.WR+X.BN+X.NN:m==='kuzgun'?X.BR+X.WR:X.WR+X.NN;const ok=m==='nesne'||(m==='kuzgun'?['BR','WR']:['WR','NN']).includes(ev);return[ok?X[ev]:0,tot];};const[a,na]=pick(A),[b,nb]=pick(B);return{n:BigInt(a)*BigInt(nb),d:BigInt(b)*BigInt(na),a,b};};
for(const[pk,P]of Object.entries(W))for(const m of['nesne','kuzgun','siyahdegil'])for(const ev of K.EV){const f=frac(P.A,P.B,ev,m),r=K.factor(P.A,P.B,ev,m);
  if(f.a===0&&f.b===0){eq(r.possible,false,pk+m+ev);continue;}ok(r.possible);
  if(f.b===0){eq(r.f,Infinity);continue;}if(f.a===0){eq(r.f,0);continue;}
  const ex=Number(f.n-f.d)/Number(f.d);near(r.ex,ex,1e-12,pk+m+ev);near(r.ln,Math.log(Number(f.n)/Number(f.d)),1e-9,pk+m+ev+' ln');}
/* Good 1960 tarzı: ayakkabının fazlası tam 1/989 999, kuzgununki 1/99 */
near(K.factor(W.good60.A,W.good60.B,'NN','nesne').ex,1/989999,1e-12,'ayakkabı');near(K.factor(W.good60.A,W.good60.B,'BR','nesne').ex,1/99,1e-12,'kuzgun');
near(K.shoesPerRaven(W.good60.A,W.good60.B,'nesne'),Math.log(100/99)/Math.log1p(1/989999),1e-9,'ayakkabı/kuzgun');ok(Math.abs(K.shoesPerRaven(W.good60.A,W.good60.B,'nesne')-9950)<1,'≈ 9950');
eq(K.shoesPerRaven(W.good60.A,W.good60.B,'kuzgun'),null);
/* Good 1967: siyah kuzgun H'nin aleyhine; çarpan (100/1 000 100)/(1000/1 001 001) */
near(K.factor(W.good67.A,W.good67.B,'BR','nesne').f,(100/1000100)/(1000/1001001),1e-12,'Good 1967');ok(K.factor(W.good67.A,W.good67.B,'BR','nesne').f<0.11);
/* siyah olmayan nesne seçiminde ayakkabının çarpanı 1 + WR/NN (değil-H) */
near(K.factor(W.kucuk.A,W.kucuk.B,'NN','siyahdegil').f,(12/12)/(11/12),1e-12,'küçük dünya');
/* açık nesne listesi: her yöntemde olabilirlik = uygun nesnelerin oranı */
for(const P of[W.kucuk.A,W.kucuk.B]){const objs=[];for(const e of K.EV)for(let i=0;i<P[e];i++)objs.push(e);
  for(const m of['nesne','kuzgun','siyahdegil']){const pool=objs.filter(o=>m==='nesne'||(m==='kuzgun'?o==='BR'||o==='WR':o==='WR'||o==='NN'));for(const e of K.EV)near(K.likelihood(P,e,m),pool.filter(o=>o===e).length/pool.length,1e-15,m+e);}
  /* örnekleyici: 40 000 çekimde sıklıklar olabilirliklere yakın */
  for(const m of['nesne','siyahdegil']){const cnt={BR:0,WR:0,BN:0,NN:0};for(let i=0;i<40000;i++)cnt[K.sample(P,m,rnd)]++;for(const e of K.EV){const p=K.likelihood(P,e,m);ok(Math.abs(cnt[e]/40000-p)<4*Math.sqrt(p*(1-p)/40000)+1e-9,`örnekleme ${m} ${e}`);}}}
/* sonsal: doğrudan çarpım formülüyle 300 rastgele dizi */
for(let r=0;r<300;r++){const pk=['good60','good67','kucuk'][ri(3)],m=['nesne','kuzgun','siyahdegil'][ri(3)],P=W[pk],prior=(1+ri(99))/100;const seq=[];
  for(let i=0;i<1+ri(40);i++){const e=K.EV[ri(4)];if(K.allowed(P.A,P.B,m,seq,e))seq.push(e);}
  const res=K.run(P.A,P.B,m,seq,prior);eq(res.stopped,null);
  let la=0,lb=0,za=false,zb=false;for(const e of seq){const x=K.likelihood(P.A,e,m),y=K.likelihood(P.B,e,m);if(x===0)za=true;else la+=Math.log(x);if(y===0)zb=true;else lb+=Math.log(y);}
  const post=za?0:zb?1:1/(1+Math.exp(lb-la)*(1-prior)/prior);near(K.postOf(res.los[res.los.length-1]),post,1e-9,'sonsal '+pk+m);}
/* çürütme ve olanaksız gözlem */
{const P=W.good60;const r=K.run(P.A,P.B,'nesne',['BR','WR','BR'],0.5);eq(K.postOf(r.los[3]),0);eq(K.allowed(P.A,P.B,'kuzgun',[],'NN'),false);eq(K.allowed(P.A,P.B,'nesne',['WR'],'BR'),true);}
{const bad=K.validWorlds({BR:1,WR:0,BN:0,NN:1},{BR:1,WR:0,BN:0,NN:1});ok(bad.some(s=>/en az bir siyah olmayan kuzgun/.test(s)));eq(K.validWorlds(W.good60.A,W.good60.B),[]);ok(K.validWorlds({BR:1.5,WR:0,BN:0,NN:1},W.good60.B).length>0);}
/* yeşmavi ve eski kanıt */
for(const n of[0,1,1000,5000])for(const p of[0.01,0.3,0.99]){const g=K.grue(n,p,'yok');eq(g.lr,1);near(g.post,p,1e-15,'yeşmavi');}
eq(K.grue(10,0.2,'yesil').post,1);eq(K.grue(10,0.2,'mavi').post,0);
{const o=K.oldEvidence(0.9,0.1,0.3,false);near(o.f,9,1e-12,'çarpan');near(o.post,0.27/(0.27+0.07),1e-12,'sonsal');eq(K.oldEvidence(0.9,0.1,0.3,true),{f:1,post:0.3});}

/* 5. Tanıklık: elle yazılmış tablo (E = gerekçeli) */
const TS={/*        küresel(g=0) küresel(g=1) yerel karşıt melez */
 yol:'-EEEE'.slice(0), cocuk:'-E-E-', blog:'-E-E-', defter:'-E-E-', ansiklopedi:'-EEEE', yalanci:'-----'};
const TSX={yol:['-','E','-','E','E'],cocuk:['-','E','-','E','-'],blog:['-','E','-','E','-'],defter:['-','E','-','E','-'],ansiklopedi:['-','E','E','E','E'],yalanci:['-','-','-','-','-']};
eq(K.TS_CASES.map(c=>c.k),Object.keys(TSX));void TS;
for(const[ck,row]of Object.entries(TSX)){eq(K.tsVerdict('kuresel',ck,false),row[0]==='E',ck);eq(K.tsVerdict('kuresel',ck,true),row[1]==='E',ck);eq(K.tsVerdict('yerel',ck,false),row[2]==='E',ck);eq(K.tsVerdict('karsit',ck,false),row[3]==='E',ck);eq(K.tsVerdict('melez',ck,false),row[4]==='E',ck);}
eq(K.tsBest({yol:'E',blog:'H'},false).keys,['melez']);eq(K.tsBest({},false).n,0);
for(const[a,b,w,r]of[[0.9,0.1,0.5,0.5],[0.9,0.1,0,0.9],[0.9,0.1,1,0.1],[0.7,0.3,0.25,0.6]])near(K.blend(a,b,w),r,1e-12,'harmanlama');

console.log(`G epistemoloji: ${checks.toLocaleString('tr-TR')} bağımsız çözümleme, mantık, zincir, Bayes ve tanıklık kontrolü PASS`);

if(process.argv.includes('--browser')){
  const {chromium}=await import('playwright');const {createServer}=await import('node:http');const {join,extname}=await import('node:path');const {fileURLToPath}=await import('node:url');const root=fileURLToPath(new URL('../',import.meta.url));
  const server=createServer((req,res)=>{const file=join(root,decodeURIComponent(new URL(req.url,'http://localhost').pathname));if(!fs.existsSync(file)||fs.statSync(file).isDirectory()){res.writeHead(404).end();return;}res.setHeader('Content-Type',({'.html':'text/html; charset=utf-8','.js':'text/javascript; charset=utf-8','.css':'text/css; charset=utf-8'})[extname(file)]||'application/octet-stream');res.end(fs.readFileSync(file));});await new Promise(r=>server.listen(0,'127.0.0.1',r));let browser;
  ok(fs.existsSync(new URL(`../shared/digest/${SLUG}.js`,import.meta.url)),"defter dosyası var");
  try{browser=await chromium.launch();const before=checks;
  for(const[width,theme]of[[390,'light'],[1280,'dark']]){
    const page=await browser.newPage({viewport:{width,height:900},deviceScaleFactor:width===390?2:1,hasTouch:width===390});await page.addInitScript(t=>{localStorage.setItem('acelya-theme',t);localStorage.setItem('acelya-sound-muted','1');},theme);page.setDefaultTimeout(8000);
    const errors=[];page.on('pageerror',e=>errors.push(e.message));page.on('console',m=>{if(m.type()==='error')errors.push(m.text());});page.on('response',r=>{if(r.status()>=400)errors.push(r.status()+' '+r.url());});
    await page.goto(`http://127.0.0.1:${server.address().port}/${SLUG}.html`);
    const click=id=>page.locator('#'+id).click(),read=id=>page.locator('#'+id).textContent(),has=async(id,text)=>{const t=await read(id);assert(t.includes(text),`${id}: “${t}” içinde “${text}” yok (${width})`);checks++;},
      range=(id,v)=>page.locator('#'+id).evaluate((e,v)=>{e.value=v;e.dispatchEvent(new Event('input',{bubbles:true}));},v),sel=(id,v)=>page.locator('#'+id).selectOption(v),
      noflow=async tag=>{eq(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),true,'yatay taşma: '+tag+' '+width);};
    eq(await page.evaluate(()=>document.title.length<=80),true);await page.waitForSelector('.digest',{timeout:8000});ok(await page.locator('.digest').first().isVisible(),'Keşif Defteri görünür');eq(await page.locator('[role=tab]').count(),5);
    /* 1. sekme */
    await has('gtTitle','Gettier I');await has('gtAnswered','0 / 9');await has('gtStatus','Yaygın sezgi ise “bilgi değil”');await has('zOut','4. Gettier I');eq(await page.locator('#gtRows tr').count(),9);
    await click('gtYes');await has('gtAnswered','1 / 9');await has('gtGdi','1 / 1');await has('gtCommonAgree','0 / 1');eq(await page.locator('#gtRows td.miss').count(),5);
    await click('gtCase-ambar');await click('gtNo');await has('gtAnswered','2 / 9');await has('gtStatus','Güvenilir');
    await click('gtCase-beyin');await has('gtStatus','bölünüyor');await click('gtSkip');await has('gtAnswered','(kararsız 1)');
    for(const k of['yagmur','tahmin','yanlis','para','ford','ambar','saat','piyango']){await click('gtCase-'+k);await click(k==='yagmur'?'gtYes':'gtNo');}
    await has('gtCommonAgree','8 / 8');await has('gtBest','Duyarlı, Güvenli · 8 / 8');await has('gtGdi','3 / 8');
    await sel('zTheory','duy');await has('zOut','kapanış');await sel('zTheory','yd');await has('zOut','6. Sahte ambarlar');
    await page.locator('#gtRows button[data-go="saat"]').click();await has('gtTitle','Durmuş saat');
    await click('bilgiReset');await has('gtAnswered','0 / 9');await has('gtTitle','Gettier I');await noflow('bilgi');
    /* 2. sekme */
    await click('tab-supheci');await has('skConsistent','Hayır · 0 / 4');await has('skPosition','tutarsız');await has('skForm','yok');
    await click('skPresetMoore');await has('skPosition','Moore');await has('skConsistent','Evet · 1 / 4');await has('skForm','(D, D)');
    await click('skPresetSuphe');await has('skPosition','Şüpheci');await has('skForm','(Y, Y)');await click('skPresetKapanis');await has('skPosition','Dretske');await has('skForm','(D, Y)');
    await click('skPresetPyrrhon');await has('skConsistent','4 / 4');await has('skPosition','Pyrrhoncu');
    await sel('skA','kabul');await sel('skB','kabul');await has('skStatus','C\'yi reddetmen');
    await sel('skCtx','supheci');await has('skCtxNote','A yanlış, B doğru, C doğru');await sel('skCtx','gundelik');await has('skCtxNote','A doğru, B doğru, C yanlış');
    await click('supheReset');await has('skPosition','tutarsız');await noflow('supheci');
    /* 3. sekme */
    await click('tab-gerekce');await has('rgHorn','Durma');await has('rgSchool','Temelcilik');await has('rgLen','3');await has('rgChain','algı ya da deneyim');
    await click('rgPresetDongu');await has('rgHorn','Döngü');await has('rgLen','5 (döngüde 3)');await has('rgChain','yeniden 2. inanç');eq(await page.locator('#rgH-dongu.on').count(),1);
    await click('rgPresetSonsuz');await has('rgHorn','Sonsuz');await has('rgSchool','Sonsuzculuk');await click('rgPresetDogma');await has('rgSchool','dogmatizm');await has('rgStatus','varsayım');
    await sel('rgN0','yok');await has('rgLen','1');await sel('rgN0','5');await has('rgChain','6. Gökbilim');
    await has('ieRes1','Önce kendi yargını ver');await click('ieY1');await has('ieRes1','İçselcilik: gerekçesiz');await has('ieRes1','güvenilirciyle');await click('ieN2');await has('ieRes2','güvenilirciyle');
    await click('gerekceReset');await has('rgSchool','Temelcilik');await has('ieRes1','Önce kendi');await noflow('gerekce');
    /* 4. sekme */
    await click('tab-tumevarim');await has('bxN','0');await has('bxPost1','0,5000');await has('bxPost2','0,0500');ok((await page.textContent('body')).includes('1955, s. 71'),'Goodman 1955 s. 71');await has('bxEquiv','9950');await has('bxStatus','1 + 1,01 × 10⁻⁶');
    await click('bxAddBR');await has('bxLast','siyah kuzgun · 1,0101');await has('bxPost1','0,5025');await click('bxAddNN');await has('bxLast','beyaz ayakkabı · 1 + 1,01 × 10⁻⁶');await has('bxN','2');
    await click('bxAddWR');await has('bxPost1','0');await has('bxCum','H çürüdü');eq(await page.locator('#bxAddBR').isDisabled(),false);await click('bxUndo');await has('bxPost1','0,5025');
    await click('bxSimA');await has('bxN','22');await click('bxClear');await has('bxN','0');
    {await sel('bxPreset','kucuk');await click('bxSimB');await click('bxSimB');const s1=await read('bxSeq');await click('bxClear');await click('bxSimB');await click('bxSimB');eq(await read('bxSeq'),s1,'temizlenince tohum baştan');await sel('bxPreset','good60');await click('bxSimB');const s2=await read('bxSeq');await sel('bxPreset','good60');await click('bxSimA');await sel('bxPreset','good60');await click('bxSimB');eq(await read('bxSeq'),s2,'hazır değişince tohum baştan');await click('bxClear');}
    await sel('bxMethod','kuzgun');eq(await page.locator('#bxAddNN').isDisabled(),true);await has('bxEquiv','ayakkabı gözlenemez');await has('bxStatus','tanımsız (gözlenemez)');
    await sel('bxMethod','siyahdegil');eq(await page.locator('#bxAddBR').isDisabled(),true);
    await sel('bxPreset','good67');await sel('bxMethod','nesne');await click('bxAddBR');await has('bxLast','0,1001');await has('bxStatus','aleyhine');await has('bxStatus','renklerini söylemez');await has('bxPost1','0,0910');
    await sel('bxPreset','kucuk');await sel('bxMethod','siyahdegil');await has('bxStatus','1,0909');
    await page.locator('#bxB_WR').fill('0');await has('bxErr','en az bir siyah olmayan kuzgun');await has('bxN','—');eq(await page.locator('#bxPreset').inputValue(),'custom');
    await page.locator('#bxB_WR').fill('1');eq(await page.locator('#bxErr').isHidden(),true);
    await range('bxPrior1','0.99');await has('bxPrior1Out','0,99');await sel('bxScale','lo');
    await range('grN','0');await has('grNOut','0');await has('grLR','1 (tam)');await range('grPrior','0.3');await has('grPost','0,3000');await has('grPred','yeşil 0,30 · mavi 0,70');
    await sel('grAfter','mavi');await has('grPost','0');await has('grLR','yeşil çürüdü');await sel('grLang','gb');await has('grDef','Yeşil: t\'den önce gözlenmişse yeşmavi');
    await has('oeOut','Bayes çarpanı 9,000');await page.locator('#oeKnown').check();await has('oeOut','çarpan 1');
    await click('tumevarimReset');await has('bxEquiv','9950');await has('grPost','0,5000');await has('oeOut','sonsal 0,794');
    eq(await page.locator('#bxA_NN').inputValue(),'990 000');await noflow('tumevarim');
    eq(await page.evaluate(()=>{const c=document.getElementById('bxCanvas');return c.width>0&&c.height>0;}),true);
    /* 5. sekme */
    await click('tab-taniklik');await has('tsAnswered','0 / 6');await click('tsY0');await has('tsRes0','Yerel indirgemecilik: gerekçesiz');await has('tsRes0','Melez görüş (Lackey 2008): gerekçeli');
    await click('tsN2');await has('tsBest','Melez');await page.locator('#tsGlobal').check();await has('tsRes0','Küresel indirgemecilik: gerekçeli');
    await has('dgNew','0,50');await has('dgView','Eşit ağırlık');await click('dgSteadfast');await has('dgNew','0,90');await has('dgStatus','Kelly');await click('dgDefer');await has('dgNew','0,10');
    await range('dgW','0.25');await has('dgNew','0,70');await click('taniklikReset');await has('tsAnswered','0 / 6');await has('dgNew','0,50');await noflow('taniklik');
    /* sekme klavyesi, R tuşu, etiketler */
    await page.locator('#tab-taniklik').focus();await page.keyboard.press('Home');eq(await page.locator('#tab-bilgi').getAttribute('aria-selected'),'true');await page.keyboard.press('ArrowLeft');eq(await page.locator('#tab-taniklik').getAttribute('aria-selected'),'true');await page.keyboard.press('ArrowRight');eq(await page.locator('#tab-bilgi').getAttribute('aria-selected'),'true');await page.keyboard.press('End');eq(await page.locator('#tab-taniklik').getAttribute('aria-selected'),'true');
    await click('tab-supheci');await click('skPresetMoore');await page.locator('h1').click();await page.keyboard.press('r');await has('skPosition','tutarsız');
    eq(await page.evaluate(()=>[...document.querySelectorAll('main input,main select')].filter(e=>!(e.labels&&e.labels.length)&&!e.getAttribute('aria-label')).map(e=>e.id)),[]);
    eq(await page.evaluate(()=>[...document.querySelectorAll('main canvas')].filter(c=>c.getAttribute('role')!=='img').length),0);
    eq(await page.evaluate(()=>Object.isFrozen(Episteme)&&!Object.getOwnPropertyDescriptor(window,'Episteme').writable),true);
    eq(await page.evaluate(()=>/[\u0300-\u036f\u20d7]/.test(document.body.textContent.normalize('NFC'))),false,'birleşik işaret');
    eq(await page.evaluate(()=>/\d\.\d/.test([...document.querySelectorAll('.ep-stat strong,.ep-status,output,.ep-note,.res')].map(e=>e.textContent).join(' '))),false,'ondalık nokta');
    for(const t of['bilgi','supheci','gerekce','tumevarim','taniklik']){await click('tab-'+t);await noflow('sekme '+t);}
    assert.deepEqual(errors,[]);checks++;await page.close();
  }
  console.log(`G epistemoloji: ${checks-before} tarayıcı kontrolü (390 açık / 1280 koyu; beş sekme, hazırlar, sınırlar, klavye) PASS`);
  }finally{await browser?.close();await new Promise(r=>server.close(r));}
}
