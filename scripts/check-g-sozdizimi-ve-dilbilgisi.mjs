// Sözdizimi ve dilbilgisi: çekirdeğin bağımsız denetimi.
// Başvurular sayfanın yollarını yinelemez: elle yazılmış bölmeler, baş dizileri ve bileşen kümeleri, Leipzig
// listesinin ayrı bir kopyası, kaba kuvvet permütasyonlar ve WALS'tan elle aktarılmış sayılar.
import fs from 'node:fs';
import vm from 'node:vm';
import assert from 'node:assert/strict';
const SLUG='sozdizimi-ve-dilbilgisi';
const html=fs.readFileSync(new URL(`../${SLUG}.html`,import.meta.url),'utf8');
const source=html.split('/* KERNEL-BEGIN */')[1]?.split('/* KERNEL-END */')[0];
assert(source,'Çekirdek sınırları gerekli');
const context={window:{}};vm.createContext(context);vm.runInContext(source,context);
const K=context.window.Sozdizim;let checks=0;
const eq=(a,b,m)=>{const x=JSON.stringify(a),y=JSON.stringify(b);assert(x===y,(m?m+': ':'')+x+' ≠ '+y);checks++;},ok=(c,m)=>{assert(c,m);checks++;};
let seed=20261113;const rnd=()=>{seed=(seed*1664525+1013904223)>>>0;return seed/4294967296;},ri=n=>Math.floor(rnd()*n);
ok(Object.isFrozen(K)&&Object.isFrozen(K.WORDS)&&Object.isFrozen(K.WORDS[0].segs)&&Object.isFrozen(K.SENTS[0].units),'çekirdek dondurulmuş');

/* 0. Sayı biçimi */
const NB=' ';
for(const[x,d,s]of[[0.5,2,'0,50'],[-1.25,2,'−1,25'],[9950,0,'9950'],[10000,0,'10'+NB+'000'],[1376,0,'1376'],[-0.001,2,'0,00']])eq(K.fmt(x,d),s,'fmt '+x);
eq(K.pct(564,1376),'%41,0');eq(K.pct(1,0),'—');

/* 1. Leipzig: listenin ayrı kopyası (eva.mpg.de, 13 Kasım 2026) */
const LEIPZIG=new Set('1 2 3 A ABL ABS ACC ADJ ADV AGR ALL ANTIP APPL ART AUX BEN CAUS CLF COM COMP COMPL COND COP CVB DAT DECL DEF DEM DET DIST DISTR DU DUR ERG EXCL F FOC FUT GEN IMP INCL IND INDF INF INS INTR IPFV IRR LOC M N NEG NMLZ NOM OBJ OBL P PASS PFV PL POSS PRED PRF PRS PROG PROH PROX PST PTCP PURP Q QUOT RECP REFL REL RES S SBJ SBJV SG TOP TR VOC'.split(' '));
const nonStd=Object.keys(K.LAB).filter(k=>!LEIPZIG.has(k)).sort();eq(nonStd,['ABIL','EVID','IMPOT','PRIV','VBLZ']);
for(const[k,[,std]]of Object.entries(K.LAB))eq(!!std,LEIPZIG.has(k),'standart bayrağı '+k);
/* elle yazılmış beklenen bölmeler */
const EXP={evler:'ev-ler-imiz-de-ki-ler',cocuk:'çocuk-luğ-umuz-u',kitap:'kitap-sız-lar',yazdir:'yaz-dır-ıl-ma-dı',oku:'oku-yabil-ecek-ler-imiz-den',
 avrupa:'Avrupa-lı-laş-tır-ama-dık-lar-ımız-dan-mış-sınız',teyze:'teyze-m-ler'};
eq(K.WORDS.map(w=>w.k),Object.keys(EXP));
for(const w of K.WORDS){eq(K.glossLines(w.k).obj,EXP[w.k],'bölme '+w.k);eq(EXP[w.k].replace(/-/g,''),w.word,'birleşim '+w.k);
 const n=w.segs.length;eq([w.gl.length,w.kind.length,w.arch.length],[n,n,n],'uzunluk '+w.k);
 const gl=K.glossLines(w.k);eq(gl.obj.split('-').length,gl.gl.split('-').length,'kural 2: aynı sayıda kısa çizgi '+w.k);
 eq(w.kind[0],'kok');ok(w.kind.slice(1).every(t=>['yapim','cekim','sinir'].includes(t)),'tür '+w.k);
 /* her etiket tanımlı; büyük harfli parçalar kişi-sayı kuralına uyar (kural 5: 1PL, nokta yok) */
 for(const g of w.gl.slice(1)){for(const t of K.glossTokens(g))ok(t in K.LAB,`etiket ${t} (${w.k})`);ok(!/[123]\.(SG|PL)/.test(g),'kural 5 '+g);}
 ok(w.gl[0]===w.gl[0].toLocaleLowerCase('tr')||w.k==='avrupa','kök açıklaması küçük harf '+w.k);
 /* kaba kuvvet sınır denetimi: rastgele kesimler */
 const L=Array.from(w.word).length,ref=[];let p=0;for(const s of EXP[w.k].split('-').slice(0,-1)){p+=Array.from(s).length;ref.push(p);}eq(K.refCuts(w),ref,'kesim '+w.k);
 for(let r=0;r<200;r++){const cuts=[];for(let i=1;i<L;i++)if(rnd()<0.25)cuts.push(i);const c=K.segCheck(w.k,cuts);
  eq(c.hits,ref.filter(x=>cuts.includes(x)));eq(c.missing,ref.filter(x=>!cuts.includes(x)));eq(c.extra,cuts.filter(x=>!ref.includes(x)));eq(c.exact,c.missing.length===0&&c.extra.length===0);
  eq(K.splitAt(w.word,cuts).join(''),w.word);eq(K.splitAt(w.word,cuts).length,cuts.length+1);}
 ok(K.segCheck(w.k,ref).exact,'kaynak kesimi tam '+w.k);}
eq(K.glossLines('evler').gl,'ev-PL-1PL.POSS-LOC-REL-PL');eq(K.glossLines('yazdir').gl,'yaz-CAUS-PASS-NEG-PST[3SG]');eq(K.glossLines('oku').gl,'oku-ABIL-FUT.PTCP-PL-1PL.POSS-ABL');
eq(K.glossTokens('PST[3SG]'),['PST','3','SG']);eq(K.glossTokens('FUT.PTCP'),['FUT','PTCP']);eq(K.glossTokens('1PL.POSS'),['1','PL','POSS']);
/* Greenberg 28: elle beklenen */
eq(K.u28('evler'),{ok:true,viol:[],border:[4]});for(const k of['cocuk','kitap','yazdir','oku','avrupa','teyze'])eq(K.u28(k).ok,true);
/* ek sırası: bütün permütasyonlar, elle yazılmış hükümler */
const ORD={ev:{'PL,POSS,LOC':'ok','POSS,LOC,PL':'other'},yaz:{'CAUS,PASS,NEG':'ok'}};
for(const o of K.ORDERS){const ids=o.chips.map(c=>c.id);const all=[];(function perm(pre,rest){if(!rest.length){all.push(pre);return;}rest.forEach((x,i)=>perm([...pre,x],rest.filter((_,j)=>j!==i)));})([],ids);
 eq(all.length,6);eq(Object.keys(o.perms).sort(),all.map(p=>p.join(',')).sort(),'permütasyon anahtarları '+o.k);eq(K.permutations(ids).map(p=>p.join(',')).sort(),all.map(p=>p.join(',')).sort());
 for(const p of all){const r=K.orderResult(o.k,p);eq(r.complete,true);eq(r.v,ORD[o.k][p.join(',')]||'no',o.k+' '+p);ok(r.v==='no'?r.form.startsWith('*'):!r.form.startsWith('*'),'yıldız '+p);}
 const good=all.find(p=>ORD[o.k][p.join(',')]==='ok');eq(K.orderResult(o.k,good).form,o.base+good.map(id=>o.chips.find(c=>c.id===id).f).join('')+o.end,'iyi biçim birleşimi');
 eq(K.orderResult(o.k,[]).complete,false);eq(K.orderResult(o.k,[ids[0]]).partial,o.base+'-'+o.chips[0].f);}
eq(K.orderResult('ev',['POSS','LOC','PL']).form,'evimizdeler');
/* tipoloji */
eq(K.TYPO.map(t=>t.ans),['yalin','buk','ek','cok']);ok(K.TYPO.every(t=>K.TYPES.some(y=>y.k===t.ans)));
{const y=K.TYPO.find(t=>t.k==='ypk');const[seg,gl]=y.gl.split(' · ');eq(seg.split('-').length,gl.split('-').length,'Yupikçe kural 2');ok(seg.replace(/-/g,'')!==y.form,'Yupikçe alt satır temel biçimler');eq(seg,'tuntu-ssur-qatar-ni-ksaite-ngqiggte-uq');eq(gl,'ren_geyiği-avla-FUT-söyle-NEG-yine-3SG.IND','Yupikçe açıklama: “say” = söyle');}
/* doğrulayıcı düzeltmeleri */
ok(!K.WORDS.find(w=>w.k==='teyze').note.includes('“teyzelerim”.'),'teyzelerim açıklaması totoloji değil');ok(!/MÖ 4\. yüzyıl dolayı/.test(html),'Pāṇini tarihi');ok(/belirtili nesne durum ekiyle/.test(html),'altı diziliş belirtili nesneyle');

/* 2. Ağaçlar: elle yazılmış baş dizileri ve bileşen kümeleri */
const T={yasli:{heads:[1,7,7,7,6,6,7,-1],ps:['0-0','0-1','0-7','1-1','2-2','2-7','3-3','3-7','4-4','4-6','4-7','5-5','6-6','7-7'],dg:['0-0','0-1','0-7','2-2','3-3','4-4','4-6','5-5']},
 cicek:{heads:[1,2,5,4,5,-1],ps:['0-0','0-1','0-2','0-5','1-1','2-2','3-3','3-4','3-5','4-4','5-5'],dg:['0-0','0-1','0-2','0-5','3-3','3-4']}};
eq(K.SENTS.map(s=>s.k),Object.keys(T));
const subtree=(h,w)=>{const s=[w];for(let k=0;k<s.length;k++)h.forEach((x,i)=>{if(x===s[k]&&!s.includes(i))s.push(i);});return s.sort((a,b)=>a-b);};
for(const s of K.SENTS){const I=K.sentInfo(s.k),e=T[s.k];eq(K.leaves(I.t).map(l=>l.word),[...s.words],'yaprak '+s.k);eq([...I.heads],e.heads,'baş '+s.k);
 eq([...I.ps].sort(),e.ps,'öbek yapısı '+s.k);eq([...I.dg].sort(),e.dg,'bağımlılık '+s.k);ok([...I.dg].every(x=>I.ps.has(x)),'DG ⊆ PS '+s.k);
 eq(e.heads.filter(h=>h===-1).length,1,'tek kök');eq(e.heads.indexOf(-1),s.verb,'kök yüklem');
 /* izdüşümsellik: her alt ağaç bitişik; kesişen yay yok */
 e.heads.forEach((_,w)=>{const st=subtree(e.heads,w);eq(st[st.length-1]-st[0]+1,st.length,'bitişik '+w);});
 const arcs=e.heads.map((h,i)=>h<0?null:[Math.min(h,i),Math.max(h,i)]).filter(Boolean);for(const a of arcs)for(const b of arcs)ok(!(a[0]<b[0]&&b[0]<a[1]&&a[1]<b[1]),'kesişen yay');
 /* her öbek düğümünün başı son sözcük (Türkçe baş sonda) */
 for(const n of K.phrases(I.t)){const h=K.headWord(n);ok(h===n.j,`baş sonda ${s.k} ${n.label} ${n.i}-${n.j}`);}
 /* her bileşenin bir birim kaydı var ya da varsayılan; taşınabilir birimler bileşen ve yüklemsiz */
 for(const[key,u]of Object.entries(s.units)){ok(I.ps.has(key),'birim bileşen '+key);const[a,b]=key.split('-').map(Number);if(u.mv)ok(!(a<=s.verb&&s.verb<=b),'taşınabilir yüklemsiz '+key);}
 /* bütün diziler: sınıf ve testler tutarlı */
 const n=s.words.length;for(let i=0;i<n;i++)for(let j=i;j<n;j++){const r=K.runTests(s.k,i,j),c=K.classify(s.k,i,j);eq(r.cls,c.cls);
  if(i===0&&j===n-1){eq(r.cls,'all');continue;}
  eq(c.cls==='oz',e.ps.includes(i+'-'+j),'öz '+i+'-'+j);
  if(c.cls==='dizi'){eq(c.parts[0][0],i);eq(c.parts[c.parts.length-1][1],j);for(let q=1;q<c.parts.length;q++)eq(c.parts[q][0],c.parts[q-1][1]+1);for(const[a,b]of c.parts){ok(e.ps.includes(a+'-'+b));ok(s.units[a+'-'+b]?.mv,'dizi parçası taşınabilir');}}
  eq(r.tests.map(t=>t.k),['pro','wh','mv','co','el']);
  const mv=r.tests.find(t=>t.k==='mv');const hasV=i<=s.verb&&s.verb<=j;eq(mv.pass===null,hasV,'taşıma uygulanabilirliği');
  if(!hasV){/* taşınan cümle aynı sözcükleri içerir, yer değiştirmiş */const ws=mv.text.replace(/^\*/,'').replace(/\.$/,'').toLocaleLowerCase('tr').split(' ');eq([...ws].sort(),[...s.words].sort(),'taşıma çoklu kümesi');
   const blk=s.words.slice(i,j+1).join(' ');ok(i===0?ws.join(' ').endsWith(blk):ws.join(' ').startsWith(blk),'taşınan blok');eq(mv.pass,(c.cls==='oz'&&!!s.units[i+'-'+j]?.mv)||c.cls==='dizi');ok(mv.pass||mv.text.startsWith('*'),'başarısız taşıma yıldızlı');}
  if(c.cls==='kesik')ok(r.tests.every(t=>t.pass!==true),'kesik dizi hiçbir testten geçmez '+i+'-'+j);
  const u=s.units[i+'-'+j]||{};eq(r.tests[0].pass,!!u.pro);eq(r.tests[1].pass,!!u.wh);eq(r.tests[4].pass===true,!!u.ell);
  if(u.pro)eq(r.tests[0].text,K.sentence([...s.words.slice(0,i),u.pro,...s.words.slice(j+1)]));
  if(u.wh)ok(r.tests[1].text.includes('?')&&r.tests[1].text.toLocaleLowerCase('tr').includes(u.wh),'soru');
  if(u.alt)ok(r.tests[3].text.includes(' ve '),'bağlama ve');}}
eq(K.classify('yasli',2,3).cls,'dizi');eq(K.classify('yasli',3,4).cls,'kesik');eq(K.classify('yasli',4,6).cls,'oz');eq(K.classify('cicek',0,4).cls,'dizi');eq(K.classify('cicek',1,2).cls,'kesik');
eq(K.runTests('yasli',0,1).tests[0].text,'O dün torununa eski bir kitap verdi.');eq(K.runTests('yasli',0,1).tests[2].text,'Dün torununa eski bir kitap verdi yaşlı adam.');
eq(K.sentence(['yaşlı','adam']),'Yaşlı adam.');eq(K.sentence(['ilk']),'İlk.');

/* 3. Belirsizlik: aynı dizi, farklı ağaç; okuma–ağaç eşlemesi birebir */
for(const a of K.AMB){const ts=a.trees.map(K.parseTree);for(const t of ts)eq(K.leaves(t).map(l=>l.word).join(' '),a.str,'yaprak '+a.k);
 const sets=ts.map(t=>[...K.psConstituents(t)].sort().join());eq(new Set(sets).size,ts.length,'farklı ağaçlar '+a.k);
 eq(a.readings.map(r=>r.tree).sort(),a.trees.map((_,i)=>i),'birebir '+a.k);
 /* ikili ya da üçlü (bağlaç) dallanma: düğüm çocuk sayısı 2 ya da 3 */
 for(const t of ts)for(const n of K.phrases(t))ok(n.kids.length>=2&&n.kids.length<=3,'dallanma');
 for(let r=0;r<50;r++){const ans={};a.readings.forEach((_,i)=>{if(rnd()<0.7)ans[i]=ri(a.trees.length);});const c=K.ambCheck(a.k,ans);let o=0,n=0;a.readings.forEach((x,i)=>{if(ans[i]!=null){n++;if(ans[i]===x.tree)o++;}});eq([c.ok,c.n,c.total],[o,n,a.readings.length]);}}
eq(K.AMB.find(a=>a.k==='kapi').trees.length,3);
/* sıfatın bağlandığı ad: kapı örneğinde üç ağaçta üç farklı ad */
{const ts=K.AMB.find(a=>a.k==='kapi').trees.map(K.parseTree);const att=ts.map(t=>{const p=K.phrases(t).find(n=>n.kids.some(c=>c.word==='eski'));return K.headWord(p.kids.find(c=>c.word!=='eski'));});eq(att,[1,2,3]);}

/* 4. WALS sayıları (13 Kasım 2026, elle aktarıldı) */
eq(K.W81.map(r=>r[1]),[564,488,95,25,11,4,189]);eq(K.W81.reduce((s,r)=>s+r[1],0),1376);
eq(K.wordOrder(false).tot,1187);eq(K.wordOrder(true).tot,1376);ok(Math.abs(K.wordOrder(true).rows[0].p-564/1376)<1e-12);
eq(K.W95,{OVPo:472,OVPr:14,VOPo:42,VOPr:456,Diger:158});eq(Object.values(K.W26).reduce((a,b)=>a+b,0),969);eq(K.W83.OV+K.W83.VO+K.W83.yok,1518);
eq(K.pct(406,969),'%41,9');eq(K.pct(58,969),'%6,0');ok(/%41,9['’]u \(406\)/.test(html)&&/%6,0['’]ı \(58\)/.test(html),'26A metni hesapla aynı');
{const u=K.univ('u1');eq([u.f,u.e],[1147,40]);eq(K.pct(u.f,u.f+u.e),'%96,6');}
{const u=K.univ('u4');eq([u.f,u.e],[472,14]);eq(K.pct(u.f,u.f+u.e),'%97,1');}
{const u=K.univ('vo');eq([u.f,u.e],[456,42]);eq(K.pct(u.f,u.f+u.e),'%91,6');}
eq(K.univ('u3').f,null);
eq(K.TURKISH.length,9);
/* baş sonda */
for(const h of K.HEADS)eq(h.head,h.words.length-1,'Türkçe baş sonda '+h.k);eq(K.HEADS.filter(h=>h.enPos==='bas').length,4);
/* odak: 120 dizilişin hepsi, ayrı hesap */
eq(K.factorial(5),120);eq(K.factorial(4),24);
{const keys=K.FUNITS.map(u=>u.k);const all=[];(function perm(pre,rest){if(!rest.length){all.push(pre);return;}rest.forEach((x,i)=>perm([...pre,x],rest.filter((_,j)=>j!==i)));})([],keys);eq(all.length,120);
 for(const o of all){const I=K.info(o),v=o.indexOf('git');eq(I.v,v);eq(I.focus,v>0?o[v-1]:null);eq(I.topic,v>0?o[0]:null);eq([...I.post],o.slice(v+1));eq(I.sentence.replace(/\.$/,'').toLocaleLowerCase('tr').split(' ').sort(),K.FUNITS.map(u=>u.w.toLocaleLowerCase('tr')).sort());
  if(v>0){const wh=K.FUNITS.find(u=>u.k===o[v-1]).wh;ok(I.question.toLocaleLowerCase('tr').includes(wh)&&I.question.endsWith('?'),'soru '+o);}else eq(I.question,null);}
 eq(all.filter(o=>o[4]==='git').length,24);}
eq(K.info(['ali','bugun','eve','araba','git']).question,'Ali bugün eve neyle gidiyor?');eq(K.info(['ali','eve','araba','bugun','git']).focus,'bugun');eq(K.info(['ali','araba','bugun','eve','git']).focus,'eve');

/* 5. Yargılar: rastgele puanlarla ayrı hesap */
eq(K.RATE.map(r=>r.cat).join(''),'gguuggtu');
for(let r=0;r<400;r++){const ans={};K.RATE.forEach((_,i)=>{if(rnd()<0.7)ans[i]=1+ri(7);});const s=K.rateSummary(ans);const g=[],u=[];K.RATE.forEach((it,i)=>{if(ans[i]==null)return;if(it.cat==='g')g.push(ans[i]);if(it.cat==='u')u.push(ans[i]);});
 const m=a=>a.length?a.reduce((x,y)=>x+y,0)/a.length:null;eq(s.n,Object.keys(ans).length);ok(s.mg===m(g)||Math.abs(s.mg-m(g))<1e-12);ok(s.mu===m(u)||Math.abs(s.mu-m(u))<1e-12);
 if(s.lowG!=null)eq(ans[s.lowG],Math.min(...g));if(s.highU!=null)eq(ans[s.highU],Math.max(...u));}

/* sayfa metni */
ok(/<title>Sözdizimi ve Dilbilgisi: [^<]{1,60}<\/title>/.test(html),'başlık');ok(html.match(/<title>([^<]*)<\/title>/)[1].length<=80,'başlık ≤ 80');
ok(!/[̀-ͯ]/.test(html.normalize('NFC')),'birleşik işaret yok');ok(!/<script[^>]+src="https?:/.test(html),'dış betik yok');
ok(!/[\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}]/u.test(html),'emoji yok');
for(const href of[...html.matchAll(/href="([a-z0-9-]+\.html)"/g)].map(m=>m[1]))ok(fs.existsSync(new URL(`../${href}`,import.meta.url)),'bağlantı '+href);
console.log(`G sözdizimi: ${checks.toLocaleString('tr-TR')} bağımsız biçimbilim, ağaç, test, belirsizlik, WALS ve odak kontrolü PASS`);

if(process.argv.includes('--browser')){
  const {chromium}=await import('playwright');const {createServer}=await import('node:http');const {join,extname}=await import('node:path');const {fileURLToPath}=await import('node:url');const root=fileURLToPath(new URL('../',import.meta.url));
  const server=createServer((req,res)=>{const file=join(root,decodeURIComponent(new URL(req.url,'http://localhost').pathname));if(!fs.existsSync(file)||fs.statSync(file).isDirectory()){res.writeHead(404).end();return;}res.setHeader('Content-Type',({'.html':'text/html; charset=utf-8','.js':'text/javascript; charset=utf-8','.css':'text/css; charset=utf-8'})[extname(file)]||'application/octet-stream');res.end(fs.readFileSync(file));});await new Promise(r=>server.listen(0,'127.0.0.1',r));let browser;
  try{browser=await chromium.launch();const before=checks;
  for(const[width,theme]of[[390,'light'],[1280,'dark']]){
    const page=await browser.newPage({viewport:{width,height:900},deviceScaleFactor:width===390?2:1,hasTouch:width===390});await page.addInitScript(t=>{localStorage.setItem('acelya-theme',t);localStorage.setItem('acelya-sound-muted','1');},theme);page.setDefaultTimeout(8000);
    const errors=[];page.on('pageerror',e=>errors.push(e.message));page.on('console',m=>{if(m.type()==='error')errors.push(m.text());});page.on('response',r=>{if(r.status()>=400)errors.push(r.status()+' '+r.url());});
    await page.goto(`http://127.0.0.1:${server.address().port}/${SLUG}.html`);
    const click=id=>page.locator('#'+id).click(),read=id=>page.locator('#'+id).textContent(),has=async(id,text)=>{const t=await read(id);assert(t.includes(text),`${id}: “${t}” içinde “${text}” yok (${width})`);checks++;},
      sel=(id,v)=>page.locator('#'+id).selectOption(v),
      noflow=async tag=>{eq(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),true,'yatay taşma: '+tag+' '+width);};
    eq(await page.evaluate(()=>document.title.length<=80),true);eq(await page.locator('[role=tab]').count(),5);
    await page.waitForSelector('.digest',{timeout:8000});ok(await page.locator('.digest').first().isVisible(),'Keşif Defteri görünür');
    /* 1. sekme */
    await has('mbCount','0 sınır · 1 parça');await has('mbScore','? / 5');eq(await page.locator('#mbGlossBox').isHidden(),true);
    for(const i of[2,5,9])await click('mbCut-'+i);await has('mbCount','3 sınır · 4 parça');await click('mbCheck');await has('mbScore','3 / 5 · 2 · 0');await has('mbStatus','2 sınır eksik');eq(await page.locator('#mbWord .miss').count(),2);
    await click('mbCut-3');await click('mbCheck');await has('mbScore','3 / 5 · 2 · 1');await has('mbStatus','1 sınır fazla');await click('mbCut-3');
    await click('mbCut-11');await click('mbCut-13');await click('mbCheck');await has('mbStatus','Tam isabet');await has('mbLines','ev-PL-1PL.POSS-LOC-REL-PL');await has('mbU28','-ki');eq(await page.locator('#mbGloss .m').count(),6);
    await click('mbWord-yazdir');await has('mbCount','0 sınır');await click('mbShow');await has('mbLines','yaz-CAUS-PASS-NEG-PST[3SG]');await has('mbScore','4 / 4 · 0 · 0');
    await click('mbWord-avrupa');await click('mbShow');eq(await page.locator('#mbGloss .m').count(),11);await has('mbNote','Wikipedia');await noflow('uzun sözcük');
    await click('mbClear');await has('mbCount','0 sınır');
    await has('orForm','ev');await click('orChip-PL');await click('orChip-POSS');await click('orChip-LOC');await has('orForm','evlerimizde');await has('orStatus','Türkçe bir sözcük');
    await click('orClear');await click('orChip-POSS');await click('orChip-LOC');await click('orChip-PL');await has('orForm','evimizdeler');await has('orStatus','3. çoğul kişi');
    await click('orUndo');await click('orUndo');await click('orChip-PL');await click('orChip-LOC');await has('orForm','*evimizlerde');
    await sel('orSet','yaz');await has('orForm','yaz');await click('orChip-CAUS');await click('orChip-PASS');await click('orChip-NEG');await has('orForm','yazdırılmadı');await click('orAll');eq(await page.locator('#orTable > div').count(),6);
    await sel('tyAns0','yalin');await has('tyRes0','Evet');await sel('tyAns1','ek');await has('tyRes1','Kaynağa göre değil');await has('tyStatus','1 / 2');
    await click('bicimReset');await has('mbCount','0 sınır');await has('orForm','ev');eq(await page.locator('#orTable').isHidden(),true);await has('tyStatus','Dört örneğin');await noflow('bicim');
    /* 2. sekme */
    await click('tab-obek');await has('obSpan','yaşlı adam');await has('obPS','AÖ');await has('obDG','baş: adam');await has('obScore','4 / 4');await has('obCounts','Öbek yapısı 14');await has('obCounts','Bağımlılık 8');
    await click('obW-2');await has('obStatus','Başlangıç');await click('obW-3');await has('obSpan','dün torununa');await has('obStatus','2 öbeğin');await has('obTests','aşırı geniş');await has('obDG','değil');
    await click('obW-3');await click('obW-4');await has('obStatus','bölüyor');await has('obScore','0 / ');
    await click('obW-1');await click('obW-1');await has('obPS','bileşen (sözcük)');await has('obDG','tam alt ağaç değil');
    await click('obW-4');await click('obW-7');await has('obPS','EÖ');await has('obTests','kızına da');await has('obHead','baş “verdi”');
    await page.locator('#obNodes button',{hasText:'AÖ: eski bir kitap'}).click();await has('obHead','baş “kitap”, öbeğin sonunda');
    await sel('obSent','cicek');await has('obSpan','—');await click('obW-3');await click('obW-4');await has('obPS','İÖ');await has('obTests','ne zamana kadar solmadı?');await has('obDG','baş: kadar');
    await click('obW-0');await click('obW-0');await has('obTests','Onun aldığı');
    eq(await page.evaluate(()=>{const s=document.getElementById('obTreePS');return s.querySelectorAll('text').length>0&&s.getAttribute('width')<=s.parentElement.clientWidth+1;}),true,'ağaç sığıyor');
    eq(await page.evaluate(()=>document.getElementById('obTreeDG').querySelectorAll('path').length),5);
    await click('obekReset');await has('obSpan','yaşlı adam');await noflow('obek');
    /* 3. sekme */
    await click('tab-belirsiz');await has('blScore','0 / 2');await has('blTotal','0 / 9');eq(await page.locator('#blTrees svg').count(),2);
    await click('blR0T0');await click('blR1T1');await has('blScore','2 / 2');await has('blRes0','Doğru');await click('blItem-kapi');eq(await page.locator('#blTrees svg').count(),3);await click('blR1T2');await has('blRes1','başka bir okumayı');await has('blTotal','2 / 9');
    await has('blStatus','[[[eski komşumuzun] evinin] kapısı]');await click('blItem-durbun');await click('blR1T1');await has('blTotal','3 / 9');
    await click('belirsizReset');await has('blTotal','0 / 9');await noflow('belirsiz');
    /* 4. sekme */
    await click('tab-dizim');await has('sdTop','%41,0');await has('sdSubjFirst','%76,5');eq(await page.locator('#sdSvg rect.b').count(),7);
    await page.locator('#sdND').uncheck();await has('sdSubjFirst','%88,6');eq(await page.locator('#sdSvg rect.b').count(),6);await has('sdStatus','1187');
    await has('sdUniFit','1147 / 1187');await has('sdUniFit','%96,6');await sel('sdUni','u4');await has('sdUniFit','472 / 486');await has('sdUniExc','14');await sel('sdUni','vo');await has('sdUniFit','%91,6');await sel('sdUni','u3');await has('sdUniStatus','sınanmadı');
    await click('hdW-kadar-1');await has('hdRes-kadar','Doğru');await click('hdW-sut-0');await has('hdRes-sut','Değil');await has('hdScore','1 / 2');
    await has('fcFocus','arabayla');await has('fcQuestion','Ali bugün eve neyle gidiyor?');await click('fcPreset-1');await has('fcFocus','bugün');await has('fcQuestion','ne zaman');
    await click('fcPreset-3');await has('fcPost','arabayla, bugün');await has('fcFocus','eve');
    await click('fcL-git');await click('fcL-git');eq(await page.locator('#fcL-git').isDisabled(),true);await has('fcFocus','—');await has('fcStatus','Yüklem başta');
    await click('dizimReset');await has('fcFocus','arabayla');eq(await page.locator('#sdND').isChecked(),true);await has('hdScore','0 / 0');await noflow('dizim');
    /* 5. sekme */
    await click('tab-yargi');await has('ykAnswered','0 / 8');await click('ykR0-7');await click('ykR4-2');await click('ykR2-1');await has('ykMeanG','4,50');await has('ykMeanU','1,00');await has('ykGap','3,50');await has('ykRes2','dilbilgisi dışı');
    await click('ykR7-3');await has('ykMeanU','2,00');await click('ykR6-4');await has('ykAnswered','5 / 8');await has('ykRes6','tartışmalı');
    await click('ykR3-7');await has('ykStatus','daha düşük ya da eşit');
    await click('yargiReset');await has('ykAnswered','0 / 8');await noflow('yargi');
    /* sekme klavyesi, R tuşu, etiketler */
    await page.locator('#tab-yargi').focus();await page.keyboard.press('Home');eq(await page.locator('#tab-bicim').getAttribute('aria-selected'),'true');await page.keyboard.press('ArrowLeft');eq(await page.locator('#tab-yargi').getAttribute('aria-selected'),'true');await page.keyboard.press('ArrowRight');eq(await page.locator('#tab-bicim').getAttribute('aria-selected'),'true');await page.keyboard.press('End');eq(await page.locator('#tab-yargi').getAttribute('aria-selected'),'true');
    await click('ykR1-5');await page.locator('h1').click();await page.keyboard.press('r');await has('ykAnswered','0 / 8');
    eq(await page.evaluate(()=>[...document.querySelectorAll('main input,main select')].filter(e=>!(e.labels&&e.labels.length)&&!e.getAttribute('aria-label')).map(e=>e.id)),[]);
    eq(await page.evaluate(()=>[...document.querySelectorAll('main svg')].filter(c=>c.getAttribute('role')!=='img').length),0);
    eq(await page.evaluate(()=>[...document.querySelectorAll('main button')].filter(b=>!b.textContent.trim()&&!b.getAttribute('aria-label')).length),0,'düğme adı');
    eq(await page.evaluate(()=>{const ids=[...document.querySelectorAll('[id]')].map(e=>e.id);return ids.length===new Set(ids).size;}),true,'tekil kimlikler');
    eq(await page.evaluate(()=>Object.isFrozen(Sozdizim)&&!Object.getOwnPropertyDescriptor(window,'Sozdizim').writable),true);
    eq(await page.evaluate(()=>/[̀-ͯ⃗]/.test(document.body.textContent.normalize('NFC'))),false,'birleşik işaret');
    for(const t of['bicim','obek','belirsiz','dizim','yargi']){await click('tab-'+t);
      eq(await page.evaluate(()=>/\d\.\d/.test([...document.querySelectorAll('.sz-stat strong,.sz-status,.sz-chart text,.res')].filter(e=>e.offsetParent||e.closest('svg')).map(e=>e.textContent).join(' ').replace(/\d+[A-Z]?\.\s?(kişi|sözcük|sekme|evrensel)/g,''))),false,'ondalık nokta '+t);
      await noflow('sekme '+t);}
    assert.deepEqual(errors,[]);checks++;await page.close();
  }
  console.log(`G sözdizimi: ${checks-before} tarayıcı kontrolü (390 açık / 1280 koyu; beş sekme, sıfırlamalar, klavye) PASS`);
  }finally{await browser?.close();await new Promise(r=>server.close(r));}
}
