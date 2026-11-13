// Anlambilim ve Edimbilim: çekirdeğin bağımsız denetimi.
// Başvurular sayfanın yollarını yinelemez: elle yazılmış ilişki, gerektirme, doğruluk ve yansıtma tabloları; kapalı
// biçimli dünya sayımları (2¹² − 15³, 7⁴); kapalı Spearman formülü ve ayrı bir sıralama; bütün küme bileşimlerinde
// sayımla tanımlanmış niceleyiciler; uygunluk koşullarının bütün bileşimleri; gösterim için ayrı takvim hesabı.
import fs from 'node:fs';
import vm from 'node:vm';
import assert from 'node:assert/strict';
const SLUG='anlambilim-ve-edimbilim';
const html=fs.readFileSync(new URL(`../${SLUG}.html`,import.meta.url),'utf8');
const source=html.split('/* KERNEL-BEGIN */')[1]?.split('/* KERNEL-END */')[0];
assert(source,'Çekirdek sınırları gerekli');
const context={window:{}};vm.createContext(context);vm.runInContext(source,context);
const K=context.window.Anlam;let checks=0;
const eq=(a,b,m)=>{const x=JSON.stringify(a),y=JSON.stringify(b);assert(x===y,(m?m+': ':'')+x+' ≠ '+y);checks++;},ok=(c,m)=>{assert(c,m);checks++;};
const near=(a,b,tol,m)=>{assert(Math.abs(a-b)<=tol,`${m}: ${a} ≉ ${b}`);checks++;};
let seed=20261113;const rnd=()=>{seed=(seed*1664525+1013904223)>>>0;return seed/4294967296;},ri=n=>Math.floor(rnd()*n);
ok(Object.isFrozen(K)&&Object.isFrozen(K.PAIRS)&&Object.isFrozen(K.PAIRS[0].f)&&Object.isFrozen(K.EPAIRS[0]),'çekirdek dondurulmuş');

/* 0. Sayı biçimi */
const NB=' ';
for(const[x,d,s]of[[0.5,2,'0,50'],[-0.83,2,'−0,83'],[4096,0,'4096'],[10000,0,'10'+NB+'000'],[1234567,0,'1'+NB+'234'+NB+'567'],[-0.001,2,'0,00']])eq(K.fmt(x,d),s,'fmt '+x);
eq(K.fmt(NaN,2),'—');

/* 1. Sözcük ilişkileri: elle yazılmış beklenen tablo */
const REL={sicak:'der',olu:'tam',ogretmen:'kar',sat:'kar',lale:'alt',tekerlek:'par',cay:'ess',agiz:'cok',yanit:'es',tek:'tam',uzun:'der',serce:'alt',ver:'kar',dogru:'tam',dil:'cok',yaprak:'par'};
eq(K.PAIRS.map(p=>p.k),Object.keys(REL));for(const p of K.PAIRS){eq(p.rel,REL[p.k],p.k);eq(K.classify(p.f),REL[p.k],p.k);}
eq(K.RELS.map(r=>r.k),['es','der','tam','kar','alt','par','cok','ess']);
for(const r of K.RELS)ok(K.PAIRS.some(p=>p.rel===r.k),'her ilişkiden en az bir çift: '+r.k);
/* her çiftte tam bir “ayırıcı” evet (biçim çiftlerinde ilişkililik ek bilgidir) */
for(const p of K.PAIRS){const yes=['bicim','tur','parca','cevir','tamam','ara','yerine'].filter(k=>p.f[k]);eq(yes.length,1,'tek ayırıcı '+p.k);if(!p.f.bicim)eq(p.f.iliskili,0,'ilişkililik yalnız biçim çiftinde '+p.k);}
/* karar işlevinin bütün 256 bileşimde tanımı: null ancak hiçbir ayırıcı evet değilse */
const TK=['bicim','iliskili','tur','parca','cevir','tamam','ara','yerine'];
for(let m=0;m<256;m++){const f={};TK.forEach((k,i)=>f[k]=(m>>i)&1);const r=K.classify(f);const anyKey=['bicim','tur','parca','cevir','tamam','ara','yerine'].some(k=>f[k]);eq(r===null,!anyKey,'tanım '+m);
  if(f.bicim)eq(r,f.iliskili?'cok':'ess');}
/* bileşen çözümlemesi: 27 süzgecin hepsi, elle değer tablosu */
const CV={adam:'+++',kadın:'+-+',oğlan:'++-',kız:'+--',çocuk:'+±-',insan:'+±±',kardeş:'+±±',boğa:'-++',inek:'--+',buzağı:'-±-'};
eq(K.CWORDS.map(c=>c.w),Object.keys(CV));for(const c of K.CWORDS)eq(c.v.map(v=>v===null?'±':v?'+':'-').join(''),CV[c.w],c.w);
for(const a of['*','+','-'])for(const b of['*','+','-'])for(const c of['*','+','-']){const F=[a,b,c];const exact=[],soft=[];
  for(const[w,v]of Object.entries(CV)){let bad=false,amb=false;F.forEach((f,i)=>{if(f==='*')return;if(v[i]==='±')amb=true;else if(v[i]!==f)bad=true;});if(!bad)(amb?soft:exact).push(w);}
  eq(K.cMatch(F),{exact,soft},F.join(''));}
eq(K.cMatch(['+','+','+']),{exact:['adam'],soft:['insan','kardeş']});eq(K.cMatch(['+','*','-']).exact,['oğlan','kız','çocuk']);eq(K.cMatch(['-','*','*']).exact,['boğa','inek','buzağı']);
eq(K.cDiff('adam','oğlan').diff,['YETİŞKİN']);eq(K.cDiff('adam','inek').diff,['İNSAN','ERKEK']);eq(K.cDiff('çocuk','kız').undet,['ERKEK']);eq(K.cDiff('insan','kardeş').same,true);eq(K.cSame(),[['insan','kardeş']]);
/* örnekçe: kapalı Spearman formülü (bağsız) ve ayrı bir sıralama ile Pearson (bağlı) */
const sc=K.BIRDS.map(b=>b.f.reduce((s,x)=>s+x,0));eq(sc,[6,5,5,4,3,3]);eq(K.pScore(K.BAT.f),3);eq(K.classical(K.BAT.f),false);for(const b of K.BIRDS)eq(K.classical(b.f),true,b.k);
const perms=a=>a.length<=1?[a]:a.flatMap((x,i)=>perms(a.slice(0,i).concat(a.slice(i+1))).map(p=>[x,...p]));
for(const p of perms([1,2,3,4,5,6])){const y=[3,1,6,2,5,4];let d2=0;for(let i=0;i<6;i++)d2+=(p[i]-y[i])**2;near(K.spearman(p,y),1-6*d2/(6*35),1e-12,'Spearman kapalı biçim');}
const rk=a=>a.map(v=>a.filter(w=>w<v).length+(a.filter(w=>w===v).length+1)/2);
const pear=(x,y)=>{const n=x.length,mx=x.reduce((a,b)=>a+b)/n,my=y.reduce((a,b)=>a+b)/n;let a=0,b=0,c=0;for(let i=0;i<n;i++){a+=(x[i]-mx)*(y[i]-my);b+=(x[i]-mx)**2;c+=(y[i]-my)**2;}return a/Math.sqrt(b*c);};
for(let r=0;r<3000;r++){const x=Array.from({length:6},()=>1+ri(7));eq(K.ranks(x),rk(x));const rx=rk(x),ry=rk(sc);if(new Set(x).size===1){ok(isNaN(K.spearman(x,sc)),'eşit puanlar tanımsız');continue;}near(K.spearman(x,sc),pear(rx,ry),1e-12,'Spearman bağlı');}
near(K.spearman([7,6,6,5,4,4],sc),1,1e-12,'özellik sırası');near(K.spearman([1,2,2,3,4,4],sc),-1,1e-12,'ters sıra');

/* 2. Frege: elle doğruluk tablosu */
const FT={f1:{sabah:1,aksam:1,venus:1,mars:0},f2:{sabah:1,aksam:1,venus:1,mars:0},f3:{sabah:0,aksam:1,venus:1,mars:0},f4:{sabah:0,aksam:1,venus:1,mars:0}};
const EX=['sabah','aksam','venus','mars'];
for(const f of K.FRAMES)for(const a of EX){eq(K.frEval(f.k,a,a).ta,!!FT[f.k][a],f.k+a);}
eq(K.FRAMES.map(f=>f.ext),[true,true,false,false]);
/* özdeşlerin yerine konması: olağan bağlamda bütün eş göndergeli çiftlerde korunur; dolaylı bağlamda en az bir çiftte bozulur */
const REF={sabah:'venus',aksam:'venus',venus:'venus',mars:'mars'};
for(const f of K.FRAMES){let broke=0;for(const a of EX)for(const b of EX){const r=K.frEval(f.k,a,b);eq(r.coref,REF[a]===REF[b]);eq(r.kept,FT[f.k][a]===FT[f.k][b]);if(r.coref&&!r.kept)broke++;}
  if(f.ext)eq(broke,0,'olağan bağlam '+f.k);else ok(broke>0,'dolaylı bağlam '+f.k);}
eq(K.frEval('f3','aksam','sabah').kept,false);eq(K.frEval('f3','aksam','venus').kept,true);
eq(K.frEval('f2','aksam','sabah').info,{a:false,b:true});ok(K.frEval('f3','sabah','mars').sa.includes("Sabah Yıldızı'nın"),'iyelik eki');
/* gerektirme: elle beklenen ilişkiler */
const ER={lale:['gerek',null,false,false],olu:['bagdasmaz','celisik',false,false],sicak:['hicbiri',null,false,true],renk:['bagdasmaz','karsit',false,false],anne:['gerek',null,false,false],bazi:['hicbiri',null,false,true],hepsi:['gerek',null,false,false],birakti:['gerek',null,false,false],hem:['bagdasmaz','karsit',false,false],hicbir:['bagdasmaz','karsit',false,false],yada:['hicbiri',null,false,true]};
eq(K.EPAIRS.map(p=>p.k),Object.keys(ER));
for(const p of K.EPAIRS){const d=K.decide(p);eq([d.rel,d.sub,d.eqv,d.rel==='gerek'?false:d.reverse],ER[p.k],p.k);}
eq(K.decide(K.EPAIRS.find(p=>p.k==='sicak')).rows.length,3);eq(K.decide(K.EPAIRS.find(p=>p.k==='bazi')).rows.length,8);
/* rastgele ilişkiler: doğruluk tablosu olarak verilen A, B ve kısıt; tanımlar doğrudan */
for(let r=0;r<3000;r++){const n=1+ri(3),N=1<<n;const post=Array.from({length:N},()=>rnd()<.8),A=Array.from({length:N},()=>rnd()<.5),B=Array.from({length:N},()=>rnd()<.5);
  const idx=v=>v.reduce((s,b)=>s*2+(b?1:0),0);
  const p={atoms:Array.from({length:n},(_,i)=>'p'+i),post:v=>post[idx(v)],A:v=>A[idx(v)],B:v=>B[idx(v)]};
  const S=[...Array(N).keys()].filter(i=>post[i]);const sA=S.some(i=>A[i]);if(!sA)continue;
  const entails=S.every(i=>!A[i]||B[i]),compat=S.some(i=>A[i]&&B[i]),bothF=S.some(i=>!A[i]&&!B[i]),back=S.every(i=>!B[i]||A[i]);
  const d=K.decide(p);const exp=!compat?'bagdasmaz':entails?'gerek':'hicbiri';eq(d.rel,exp,'rastgele ilişki');eq(d.rows.length,S.length);
  if(exp==='bagdasmaz')eq(d.sub,bothF?'karsit':'celisik');if(exp==='gerek')eq(d.eqv,back);}

/* 3. Kapsam: kapalı biçimli sayımlar */
const C=K.census(3,4);eq(C.n,4096);eq(C.s,4096-15**3);eq(C.i,7**4);eq(C.onlyS,0);eq(C.onlyI,7**4-(4096-15**3));
for(const[h,p]of[[1,1],[2,2],[2,3],[3,2]]){const c=K.census(h,p),N=2**(h*p);eq([c.n,c.s,c.i,c.onlyS],[N,N-(2**p-1)**h,(2**h-1)**p,0],`census ${h}×${p}`);}
for(let r=0;r<2000;r++){const V=Array.from({length:3},()=>Array.from({length:4},()=>rnd()<.5));const res=K.scope(V);
  let s=false;for(let h=0;h<3;h++){let all=true;for(let q=0;q<4;q++)if(!V[h][q])all=false;if(all)s=true;}let inv=true;for(let q=0;q<4;q++){let any=false;for(let h=0;h<3;h++)if(V[h][q])any=true;if(!any)inv=false;}
  eq([res.surface,res.inverse],[s,inv]);if(res.surface)ok(V[res.sw].every(x=>x));if(!res.inverse)ok(!V.some(row=>row[res.iw]));}
/* olumsuzluk kapsamı ve niceleyiciler: 2¹² küme bileşiminin hepsi, sayıma dayalı tanımlar */
const DEF={her:(ab,amb)=>amb===0,bazi:ab=>ab>0,hicbir:ab=>ab===0,cogu:(ab,amb)=>ab>amb,enaz2:ab=>ab>=2,tambir:ab=>ab===1,yaridanaz:(ab,amb)=>ab<amb};
eq(K.DETS.map(d=>d.k),Object.keys(DEF));
for(let m=0;m<4096;m++){const A=[],B=[];for(let x=0;x<6;x++){A.push(!!(m>>x&1));B.push(!!(m>>(x+6)&1));}
  let ab=0,amb=0,na=0;for(let x=0;x<6;x++)if(A[x]){na++;if(B[x])ab++;else amb++;}
  const ng=K.negScope(A,B);eq([ng.wide,ng.narrow,ng.vacuous],[ab===0,amb>0,na===0]);if(na>0&&ng.wide)ok(ng.narrow,'∀¬ ⇒ ¬∀ (A boş değilken)');
  const AB=A.map((a,i)=>a&&B[i]);
  for(const k of Object.keys(DEF)){const g=K.gq(k,A,B);eq([g.ab,g.amb,g.val],[ab,amb,!!DEF[k](ab,amb)]);eq(K.gq(k,A,AB).val,g.val,'korunumluluk '+k);}}

/* 4. Edimbilim */
eq(K.MAXIMS.map(m=>m.k),['nicelik','nitelik','ilgi','tarz']);
eq(Object.fromEntries(K.DIALOGS.map(d=>[d.k,[...d.ok]])),{staj:['nicelik','ilgi'],yagmur:['nitelik'],sinema:['ilgi'],cikolata:['tarz'],sinav:['nicelik']});for(const d of K.DIALOGS)ok(d.ok.includes(d.main));
eq(K.CANCEL.map(c=>c.kind),['sezdirim','gerektirme','sezdirim','sezdirim','gerektirme','onvarsayim']);
/* iptal tutarlılığı: gerektirme satırları 2. sekmedeki hesapla da gerektirme */
eq(K.decide(K.EPAIRS.find(p=>p.k==='birakti')).rel,'gerek');eq(K.decide(K.EPAIRS.find(p=>p.k==='bazi')).rel,'hicbiri');
for(const S of K.SCALES)S.terms.forEach((t,i)=>{const r=K.scalar(S.k,i);eq(r.entails.length,i);eq(r.strongest,i===S.terms.length-1);eq(r.implicates.length,i===S.terms.length-1?0:1);eq(r.cancel===null,i===S.terms.length-1);eq(r.allStronger.length,S.terms.length-1-i);if(r.cancel)ok(r.cancel.startsWith(S.sent[i].replace(/\.$/,'')),'iptal cümlesi '+S.k+i);});
eq(K.scalar('nicel',0).implicates,['öğrencilerin çoğu gelmiş değil']);eq(K.scalar('baglac',0).implicates,['ikisini birden içmedi']);
/* yansıtma: elle tablo (P önvarsayım, E gerektirme; sırayla olumlu, olumsuz, soru, koşul, belki, süzgeç) */
const PT={kardes:'PPPPP-',birakti:'PPPPP-',biliyor:'PPPPP-',saniyor:'------',sonra:'PPPPP-',yarik:'PPPPP-'};
const OPS=['olumlu','olumsuz','soru','kosul','belki','suzgec'];eq(K.OPS.map(o=>o.k),OPS);eq(K.TRIGGERS.map(t=>t.k),Object.keys(PT));
for(const t of K.TRIGGERS)OPS.forEach((o,i)=>{const r=K.project(t.k,o);eq(r.p,PT[t.k][i]==='P',t.k+o);eq(r.e,o==='olumlu',t.k+o+' e');ok(typeof r.sent==='string'&&r.sent.length>8);});
eq(new Set(K.TRIGGERS.flatMap(t=>OPS.map(o=>t.s[o]))).size,36,'bütün cümleler farklı');
eq(K.king('russell','olumlu').val,false);eq(K.king('russell','dar').val,false);eq(K.king('russell','genis').val,true);for(const f of['olumlu','dar','genis'])eq(K.king('strawson',f).val,null);

/* 5. Söz edimleri */
eq(K.ACTS.map(a=>a.k),['bet','yon','yuk','dis','bil']);
eq(Object.fromEntries(K.UTTS.map(u=>[u.k,[...u.cls].join('+')+(u.direct?'':'~')])),{soz:'yuk',kapi:'yon~',nikah:'bil',bas:'dis',toplanti:'bet',soguk:'yon~',iddia:'yuk+yon',tebrik:'dis',suclu:'bil'});
for(const a of K.ACTS)ok(K.UTTS.some(u=>u.cls.includes(a.k)),'her sınıftan örnek '+a.k);
for(const S of K.FELICITY){const n=S.conds.length;for(let m=0;m<(1<<n);m++){const st={};S.conds.forEach((c,i)=>st[c.k]=!!(m>>i&1));const fails=S.conds.filter(c=>!st[c.k]).map(c=>c.fail);
  const type=!fails.length?'yok':fails.some(f=>f==='bosa')?'bosa':fails.some(f=>f==='kusur')?'kusur':'kotuye';const r=K.felicity(S.k,st);
  eq([r.ok,r.type,r.done],[!fails.length,type,type!=='bosa'],S.k+m);eq(r.failed,S.conds.filter(c=>!st[c.k]).map(c=>c.k));}}
eq(K.FELICITY.map(s=>s.conds.length),[3,3,5]);eq(K.FELICITY[2].conds.map(c=>c.fail),['bosa','kusur','kusur','kotuye','bosa']);eq(K.FELICITY[1].conds.map(c=>c.fail),['bosa','kusur','kotuye']);
/* metin ile sınıf uyumu: “boşa” ya da “hiç” yalnız boşa çıkma koşullarında, “kusurlu” yalnız gerçekleşen edimlerde */
for(const S of K.FELICITY)for(const c of S.conds){if(c.fail!=='bosa')ok(!/boşa|hiç/.test(c.why),'gerekçe sınıfla çelişiyor: '+c.k);}
ok(K.UTTS.find(u=>u.k==='suclu').alt.includes('bet'),'betimleyici bildirimsel');
ok(K.EPAIRS.find(p=>p.k==='hem').note.includes('yalnız çay'),'hem notu');ok(K.EPAIRS.find(p=>p.k==='birakti').note.includes('önvarsayar'),'bıraktı notu');
/* gösterim: ayrı takvim hesabı (gün numarası mod 7) */
const DN={Pazartesi:1,Salı:2,Çarşamba:3,Perşembe:4,Cuma:5,Cumartesi:6,Pazar:7};const nameOf=n=>Object.keys(DN).find(k=>DN[k]===n);
for(const w of['Ayşe','Can'])for(const wd of Object.keys(DN))for(const rd of Object.keys(DN))for(const wp of K.PLACES)for(const rp of K.PLACES){const r=K.deixis({writer:w,wday:wd,wplace:wp,rday:rd,rplace:rp});
  eq(r.W.yarin,nameOf(DN[wd]%7+1));eq(r.R.yarin,nameOf(DN[rd]%7+1));eq(r.W.burada,wp);eq(r.W.ben,w);eq(r.W.sen,w==='Ayşe'?'Can':'Ayşe');eq(r.W.ben,r.R.ben);ok(r.W.su.startsWith(w==='Ayşe'?"Ayşe'nin":"Can'ın"),'iyelik eki '+w);
  eq(r.diff.includes('yarin'),wd!==rd);eq(r.diff.includes('burada'),wp!==rp);ok(r.diff.includes('su'));}

console.log(`G anlambilim-ve-edimbilim: ${checks.toLocaleString('tr-TR')} bağımsız ilişki, gerektirme, kapsam, niceleyici, yansıtma ve edim kontrolü PASS`);

if(process.argv.includes('--browser')){
  const {chromium}=await import('playwright');const {createServer}=await import('node:http');const {join,extname}=await import('node:path');const {fileURLToPath}=await import('node:url');const root=fileURLToPath(new URL('../',import.meta.url));
  const server=createServer((req,res)=>{const file=join(root,decodeURIComponent(new URL(req.url,'http://localhost').pathname));if(!fs.existsSync(file)||fs.statSync(file).isDirectory()){res.writeHead(404).end();return;}res.setHeader('Content-Type',({'.html':'text/html; charset=utf-8','.js':'text/javascript; charset=utf-8','.css':'text/css; charset=utf-8'})[extname(file)]||'application/octet-stream');res.end(fs.readFileSync(file));});await new Promise(r=>server.listen(0,'127.0.0.1',r));let browser;
  ok(fs.existsSync(new URL(`../shared/digest/${SLUG}.js`,import.meta.url)),'defter dosyası var');
  try{browser=await chromium.launch();const before=checks;
  for(const[width,theme]of[[390,'light'],[1280,'dark']]){
    const page=await browser.newPage({viewport:{width,height:900},deviceScaleFactor:width===390?2:1,hasTouch:width===390});await page.addInitScript(t=>{localStorage.setItem('acelya-theme',t);localStorage.setItem('acelya-sound-muted','1');},theme);page.setDefaultTimeout(8000);
    const errors=[];page.on('pageerror',e=>errors.push(e.message));page.on('console',m=>{if(m.type()==='error')errors.push(m.text());});page.on('response',r=>{if(r.status()>=400)errors.push(r.status()+' '+r.url());});
    await page.goto(`http://127.0.0.1:${server.address().port}/${SLUG}.html`);
    const click=id=>page.locator('#'+id).click(),read=id=>page.locator('#'+id).textContent(),has=async(id,text)=>{const t=await read(id);assert(t.includes(text),`${id}: “${t}” içinde “${text}” yok (${width})`);checks++;},
      sel=(id,v)=>page.locator('#'+id).selectOption(v),range=(id,v)=>page.locator('#'+id).evaluate((e,v)=>{e.value=v;e.dispatchEvent(new Event('input',{bubbles:true}));},v),
      noflow=async tag=>{eq(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),true,'yatay taşma: '+tag+' '+width);};
    eq(await page.evaluate(()=>document.title.length<=80&&document.title.startsWith('Anlambilim ve Edimbilim: ')),true);eq(await page.locator('[role=tab]').count(),5);
    /* 1. sekme */
    await has('lxDone','0 / 16');await has('lxPair','sıcak');await has('lxStatus','Bir ilişki seç');
    await click('lxR-der');await has('lxStatus','Uyuşuyor');await has('lxScore','1 / 1');await has('lxTests','Arada değer');
    await click('lxP-cay');await click('lxR-cok');await has('lxStatus','Eşseslilik');await has('lxStatus','Farsça');await has('lxScore','1 / 2');eq(await page.locator('#lxP-cay.is-wrong').count(),1);
    await click('lxP-tekerlek');await click('lxR-alt');await has('lxStatus','Parça–bütün');
    await has('caExact','adam, kadın, oğlan, kız, çocuk');await sel('caF1','+');await sel('caF2','-');await has('caExact','oğlan');await has('caSoft','insan, kardeş');
    await sel('caA','insan');await sel('caB','kardeş');await has('caDiff','ayırt edilemiyor');await sel('caA','adam');await sel('caB','inek');await has('caDiff','İNSAN ve ERKEK');
    await has('ptRho','—');await click('ptByScore');await has('ptRho','1,00');await has('ptStatus','güçlü');await range('pt-serce','1');await range('pt-devekusu','7');await has('pt-serce-out','1');
    {const t=await read('ptRho');ok(/^−?\d,\d\d$/.test(t),'ρ biçimi '+t);}
    await click('ptFlat');await has('ptStatus','klasik görüşe');await has('ptBat','yarasa kuş değildir');
    await click('sozcukReset');await has('lxDone','0 / 16');await has('caExact','adam');await noflow('sozcuk');
    /* 2. sekme */
    await click('tab-gonderge');await has('frSent','Akşam Yıldızı, Güneş');await has('frKept','Evet');await has('frKind','Olağan');
    await click('frPresetOpaque');await has('frKept','Hayır');await has('frTruth','Doğru → Yanlış');await has('frStatus','olağan anlamlarını');
    await click('frPresetIdent');await has('frStatus','incelemeden bilinen');await has('frStatus','2. cümle bilgi verici');
    await sel('frFrame','f1');await sel('frB','mars');await has('frKept','Sınama dışı');await sel('frFrame','f3');await sel('frA','aksam');await sel('frB','venus');await has('frKept','Evet');
    await has('enDone','0 / 11');eq(await page.locator('#enTableWrap').isHidden(),true);await click('enGerek');await has('enStatus','Uyuşuyor');eq(await page.locator('#enRows tr').count(),3);await has('enScore','1 / 1');
    await click('enP-sicak');await click('enGerek');await has('enStatus','ikisi de değil');await has('enStatus','B, A\'yı gerektirir');eq(await page.locator('#enRows td.w').count(),4);
    await click('enP-hem');await click('enBag');await has('enStatus','karşıt');await click('enP-olu');await click('enBag');await has('enStatus','çelişik');await has('enScore','3 / 4');
    await click('gondergeReset');await has('enDone','0 / 11');await has('frKept','Evet');await noflow('gonderge');
    /* 3. sekme */
    await click('tab-kapsam');await has('scSurf','Yanlış');await has('scInv','Doğru');await has('scCensus','4096 dünyanın 721');await has('scCensus','2401');await has('scCensus','1680');
    await click('scYes');await has('scJudge','yalnız ters');await click('scPresetTek');await has('scSurf','Doğru (hemşire 1)');await click('scNo');await has('scJudge','uyuşmuyor');
    await click('scPresetEksik');await has('scInv','Yanlış (hasta 4)');await click('scPresetBos');await page.locator('#sc-1-0').check();await page.locator('#sc-1-1').check();await page.locator('#sc-1-2').check();await page.locator('#sc-1-3').check();await has('scSurf','Doğru (hemşire 2)');
    await has('ngWide','Yanlış');await has('ngNarrow','Doğru');eq(await page.locator('#ngNarrow').evaluate(e=>e.previousElementSibling.textContent),'Okuma 2: hepsi girmiş değil');eq(await page.evaluate(()=>/Horn \(2004\)/.test(document.body.textContent)),false,'Horn 1984');await has('gqVal','Yanlış');await has('gqAB','2');await has('gqAmB','2');
    await sel('gqDet','enaz2');await has('gqVal','Doğru');await click('gqPresetHic');await has('ngWide','Doğru');await has('ngNarrow','Doğru');
    await click('gqPresetBos');await has('ngStatus','hiç öğrenci yok');await sel('gqDet','her');await has('gqVal','Doğru');await click('gqPresetHep');await has('ngNarrow','Yanlış');
    await page.locator('#gqB-5').uncheck();await has('gqVal','Doğru');await page.locator('#gqB-0').uncheck();await has('gqVal','Yanlış');await has('gqAmB','1');
    await click('kapsamReset');await has('scInv','Doğru');await has('gqCond','|A ∩ B| > |A − B|');await noflow('kapsam');
    /* 4. sekme */
    await click('tab-edim');await has('grDone','0 / 5');await click('grM-nicelik');await has('grStatus','Uyuşuyor');await click('grD-yagmur');await click('grM-ilgi');await has('grStatus','Nitelik');await has('grScore','1 / 2');
    await click('cxN0');await has('cxRes0','Doğru teşhis');await click('cxN1');await has('cxRes1','Bir daha bak');await click('cxY5');await has('cxRes5','Önvarsayım');await has('cxScore','2 / 3');
    await has('slOut','öğrencilerin çoğu gelmiş değil');await click('slT-2');await has('slOut','en güçlü terimi');await click('slS-baglac');await has('slOut','ikisini birden içmedi');await has('slOut','hatta ikisini de içti');
    await has('psSent','Deniz sigarayı bıraktı.');await click('psO-olumsuz');await has('psSent','bırakmadı');await click('psYes');await has('psStatus','Tahminin doğru');await has('psStatus','Gerektirme adayı: Korunmaz');
    await click('psO-suzgec');await click('psYes');await has('psStatus','tutmadı');await has('psStatus','Karttunen');eq(await page.locator('#psRows tr').count(),2);
    await click('psT-saniyor');await click('psO-soru');await click('psNo');await has('psStatus','olgusal bir fiil değildir');
    await has('kgVal','Yanlış');await sel('kgForm','genis');await has('kgVal','Doğru');await sel('kgTheory','strawson');await has('kgVal','değer yok');
    await click('edimReset');await has('grDone','0 / 5');await has('cxDone','0 / 6');await has('kgVal','Yanlış');await noflow('edim');
    /* 5. sekme */
    await click('tab-soz');await has('saDone','0 / 9');await click('saC-yuk');await has('saStatus','Uyuşuyor');await has('saDirect','Doğrudan');
    await click('saU-kapi');await click('saC-bet');await has('saStatus','Yönlendirici');await has('saDirect','Dolaylı');await has('saForm','Soru');
    await click('saU-iddia');await click('saC-yon');await has('saStatus','Uyuşuyor');await has('saScore','2 / 3');
    await has('flDone','Evet, kusursuz');await page.locator('#flC-yetki').uncheck();await has('flType','Boşa çıkma');await has('flDone','Hayır');await click('flAll');await has('flType','Yok');
    await sel('flScen','soz');await page.locator('#flC-niyet').uncheck();await has('flType','Kötüye kullanma');await has('flDone','Evet, ama kusurlu');
    await sel('flScen','rica');eq(await page.locator('#flConds input').count(),5);await page.locator('#flC-hazirlik1').uncheck();await has('flType','Kusurlu');await has('flDone','Evet, ama kusurlu');await has('flStatus','kusurludur');await click('flAll');await page.locator('#flC-icerik').uncheck();await has('flDone','Hayır');await has('flType','Boşa çıkma');await click('flAll');await page.locator('#flC-ictenlik').uncheck();await has('flDone','Evet, ama kusurlu');await has('flType','Kötüye kullanma');await click('flAll');await page.locator('#flC-temel').uncheck();await has('flType','Boşa çıkma');
    await has('dxRows','Salı');await has('dxRows','Perşembe');await has('dxStatus','Salı günü, kütüphane');await sel('dxRDay','Pazartesi');await sel('dxRPlace','kütüphane');await has('dxStatus','Yalnız “şu”');
    await sel('dxWDay','Pazar');await has('dxRows','Pazartesi');await sel('dxWriter','Can');await has('dxNote','Can');
    await click('sozReset');await has('saDone','0 / 9');await has('dxStatus','Salı');await noflow('soz');
    /* klavye, R, etiketler, biçim */
    await page.locator('#tab-soz').focus();await page.keyboard.press('Home');eq(await page.locator('#tab-sozcuk').getAttribute('aria-selected'),'true');await page.keyboard.press('ArrowLeft');eq(await page.locator('#tab-soz').getAttribute('aria-selected'),'true');await page.keyboard.press('ArrowRight');eq(await page.locator('#tab-sozcuk').getAttribute('aria-selected'),'true');await page.keyboard.press('End');eq(await page.locator('#tab-soz').getAttribute('aria-selected'),'true');
    await click('tab-kapsam');await click('scPresetTek');await page.locator('h1').click();await page.keyboard.press('r');await has('scSurf','Yanlış');
    eq(await page.evaluate(()=>[...document.querySelectorAll('main input,main select')].filter(e=>!(e.labels&&e.labels.length)&&!e.getAttribute('aria-label')).map(e=>e.id)),[]);
    eq(await page.evaluate(()=>Object.isFrozen(Anlam)&&!Object.getOwnPropertyDescriptor(window,'Anlam').writable),true);
    eq(await page.evaluate(()=>/[̀-ͯ⃗]/.test(document.body.textContent.normalize('NFC'))),false,'birleşik işaret');
    eq(await page.evaluate(()=>/\d\.\d/.test([...document.querySelectorAll('.ab-stat strong,.ab-status,output,.ab-note')].map(e=>e.textContent).join(' '))),false,'ondalık nokta');
    for(const t of['sozcuk','gonderge','kapsam','edim','soz']){await click('tab-'+t);await noflow('sekme '+t);}
    await page.waitForSelector('.digest',{timeout:8000});eq(await page.locator('.digest').first().isVisible(),true,'defter görünür');ok((await page.locator('.digest').first().textContent()).includes('Bir ricayı iki türlü bozmak'),'defter içeriği');
    assert.deepEqual(errors,[]);checks++;await page.close();
  }
  console.log(`G anlambilim-ve-edimbilim: ${checks-before} tarayıcı kontrolü (390 açık / 1280 koyu; beş sekme, hazırlar, sınırlar, klavye) PASS`);
  }finally{await browser?.close();await new Promise(r=>server.close(r));}
}
