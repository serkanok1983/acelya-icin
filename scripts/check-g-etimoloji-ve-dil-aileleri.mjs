// Etimoloji ve dil aileleri: denklik sayımı, rastlantı olasılığı, ağaç, Türk eşses çizgileri, Türkçe alıntılar,
// Dil Devrimi çiftleri ve etimoloji iddiaları için kalıcı denetim.
// Başvurular sayfanın formüllerini kullanmaz: 13 Kasım 2026'da TDK Güncel Türkçe Sözlük API'sinden (sozluk.gov.tr/gts)
// alınmış köken ve gönderme kayıtları, TDK 2005 köken dökümü (İnternet Arşivi), Wikipedia tablolarından elle yazılmış
// beklenen değerler, kapalı biçim olasılıklar ve bağımsız bir Monte Carlo.
import fs from 'node:fs';
import vm from 'node:vm';
import assert from 'node:assert/strict';
const SLUG='etimoloji-ve-dil-aileleri';
const html=fs.readFileSync(new URL(`../${SLUG}.html`,import.meta.url),'utf8');
const source=html.split('/* KERNEL-BEGIN */')[1]?.split('/* KERNEL-END */')[0];
assert(source,'Çekirdek sınırları gerekli');
const context={window:{}};vm.createContext(context);vm.runInContext(source,context);
const E=context.window.Etymology;let checks=0;
const eq=(a,b,msg=`${a} ≠ ${b}`)=>{assert.equal(a,b,String(msg));checks++;};
const near=(a,b,tol,msg)=>{assert(Math.abs(a-b)<=tol,`${msg}: ${a} ≉ ${b} (±${tol})`);checks++;};
const same=(a,b,msg)=>{assert.deepEqual(JSON.parse(JSON.stringify(a)),b,msg);checks++;};

// 0. Sayfa kuralları: başlık uzunluğu, birleşik işaret yok, emoji yok.
const title=html.match(/<title>([^<]+)<\/title>/)[1];assert(title.length<=80&&title.startsWith('Etimoloji ve Dil Aileleri: '),title);checks++;
eq([...html].filter(c=>/\p{M}/u.test(c)).length,0,'birleşik işaret');eq(/\p{Extended_Pictographic}/u.test(html.replace(/[©®™]/g,'')),false,'emoji');
eq(/data-page="etimoloji-ve-dil-aileleri"/.test(html),true);

// 1. Denklikler. Beklenen ilk ünsüzler elle (Wikipedia Comparative method ve Grimm's law tablolarından).
const INIT={foot:['f','p'],three:['th','t'],hound:['h','c'],what:['wh','qu'],ten:['t','d'],two:['t','d'],tow:['t','d'],tongue:['t','d'],tooth:['t','d'],cold:['c','g'],brother:['b','f'],day:['d','d'],devil:['d','d']};
eq(E.CORR.length,13);for(const c of E.CORR){eq(E.initial(c.en,'en'),INIT[c.id][0],c.id+' en');eq(E.initial(c.la,'la'),INIT[c.id][1],c.id+' la');}
const KIND={day:'rastlanti',devil:'alinti'};for(const c of E.CORR)eq(c.kind,KIND[c.id]||'soydas',c.id);
const tally=ids=>{const m={};for(const id of ids){const k=INIT[id].join(' : ');m[k]=(m[k]||0)+1;}return m;};
for(const ids of[E.CORR.map(c=>c.id),['day','devil'],['ten','two','day'],[],['foot']]){const g=E.correspondences(ids),m=tally(ids);eq(g.length,Object.keys(m).length);for(const x of g)eq(x.ids.length,m[x.key],x.key);for(let i=1;i<g.length;i++)assert(g[i-1].ids.length>=g[i].ids.length);checks++;}
const all=E.correspondences(E.CORR.map(c=>c.id));eq(all[0].key,'t : d');eq(all[0].ids.length,5);eq(all[0].kin,5);const dd=all.find(x=>x.key==='d : d');eq(dd.loan,1);eq(dd.chance,1);eq(dd.kin,0);
// Wikipedia'daki biçimler aynen.
const FORMS={foot:['pēs, pedis','poús','pāda'],three:['trēs','treîs','tri'],hound:['canis','kýōn','śván'],ten:['decem','déka','daśan'],brother:['frāter','phrātēr','bhrātṛ'],tow:['dūcō','',''],tongue:['dingua (Eski Latince)','',''],tooth:['dent-','',''],two:['duo','',''],day:['diēs','',''],devil:['diabolus','','']};
for(const[id,[la,gr,sa]]of Object.entries(FORMS)){const c=E.CORR.find(x=>x.id===id);eq(c.la,la);eq(c.gr,gr);eq(c.sa,sa);}

// 2. Sınıflandırma: bağımsız yanıt anahtarı.
const KEY=[['ten','soydas'],['day','rastlanti'],['devil','alinti'],['dog','rastlanti'],['foot','soydas'],['taboo','alinti'],['dokuz','soydas'],['bad','rastlanti'],['äiti','alinti'],['hound','soydas'],['kuningas','alinti'],['what','soydas']];
eq(E.CLASSIFY.length,KEY.length);E.CLASSIFY.forEach((q,i)=>{eq(q.a,KEY[i][0]);eq(q.k,KEY[i][1]);assert(q.why.length>40);checks++;});
eq(E.CLASSIFY.find(q=>q.a==='dokuz').b,'tăχăr');eq(E.CLASSIFY.find(q=>q.a==='äiti').b,'aiþei');eq(E.CLASSIFY.find(q=>q.a==='dog').lb,'Mbabaram');

// 3. Olasılık: kapalı biçimler, bağımsız özyineli olasılık dağılımı, Monte Carlo.
const pmfRec=(n,p)=>{let d=[1];for(let i=0;i<n;i++){const e=new Array(d.length+1).fill(0);d.forEach((v,x)=>{e[x]+=v*(1-p);e[x+1]+=v*p;});d=e;}return d;};
for(const[n,p]of[[10,0.3],[100,0.05],[60,0.271],[300,0.02],[40,0.9]]){const d=pmfRec(n,p);for(const m of[0,1,2,5,10,Math.round(n*p),n]){near(E.binomTail(n,p,m),d.slice(m).reduce((a,b)=>a+b,0),1e-10,`kuyruk ${n},${p},${m}`);}
 near(E.binomTail(n,p,1),1-(1-p)**n,1e-12,'P(X≥1)');near(E.binomTail(n,p,n),p**n,1e-12,'P(X=n)');near(d.reduce((s,v,x)=>s+x*v,0),n*p,1e-9,'ortalama');}
eq(E.binomTail(50,0,0),1);eq(E.binomTail(50,0,1),0);eq(E.binomTail(50,1,50),1);
for(const[k,c,s]of[[20,1,1],[20,2,3],[5,5,1],[40,1,5],[7,3,2]]){const exact=1-((k-Math.min(c,k))/k)**s;near(E.chanceP(k,c,s),exact,1e-12,'p '+[k,c,s]);
 // bağımsız Monte Carlo (Math.random değil, kendi doğrusal eşleşik üreteci)
 let st=12345+k*7+c*3+s;const r=()=>(st=(st*1103515245+12345)%2147483648)/2147483648;let hit=0;const T=60000;for(let i=0;i<T;i++){const a=Math.floor(r()*k);let h=false;for(let j=0;j<s;j++){const b=Math.floor(r()*k);if(((b-a)%k+k)%k<c)h=true;}if(h)hit++;}near(hit/T,exact,0.01,'MC '+[k,c,s]);
 // sayfanın örnekleyicisi de aynı oranı vermeli
 let tot=0;for(let sd=1;sd<=40;sd++)tot+=E.sampleLookalikes(sd,500,k,c,s);near(tot/(40*500),exact,0.015,'örnekleyici '+[k,c,s]);}
const D=E.chance({n:100,k:20,c:1,s:1,m:5});near(D.p,0.05,1e-12,'p');near(D.expected,5,1e-9,'E');near(D.tail,0.5640186993,1e-8,'kuyruk varsayılan');near(D.sd,Math.sqrt(4.75),1e-12,'sd');
near(E.chance({n:100,k:20,c:2,s:3,m:30}).tail,0.2905234685,1e-8,'kuyruk 2');eq(E.sampleLookalikes(1,100,20,1,1),E.sampleLookalikes(1,100,20,1,1));
for(const bad of[()=>E.chanceP(0,1,1),()=>E.binomTail(-1,0.5,0),()=>E.binomTail(10,1.5,1),()=>E.isoGroups('yok')]){assert.throws(bad);checks++;}

// 4. Ağaç: benzersiz kimlikler; Wikipedia "List of language families" dil sayıları; Johanson sınıflandırması.
const ids=[];E.walk(n=>ids.push(n.id));eq(new Set(ids).size,ids.length,'benzersiz kimlik');
const COUNTS={ie:586,trk:35,ura:49,mon:16,tun:15,kor:2,jpn:13,afa:381,sit:514,ac:1410,an:1274,dra:84,kar:4};
eq(E.TREE.length,Object.keys(COUNTS).length);for(const f of E.TREE){eq(f.count,COUNTS[f.id],f.id);eq(f.kind,'family');}
eq(E.findNode('ie').node.children.length,10,'on Hint-Avrupa dalı');
const kids=id=>E.findNode(id).node.children.map(n=>n.id).sort().join(',');
eq(kids('trk-og'),['tr','gag','az','tk','qxq'].sort().join(','));eq(kids('trk-kr'),['uz','ug','chg'].sort().join(','));eq(kids('trk-ogr'),['cv','xbo','zkz'].sort().join(','));eq(kids('trk-ar'),'klj');
for(const l of['tt','ba','kk','kaa','nog','kum','krc','ky'])eq(E.findNode(l).path.map(p=>p.id).join('>'),'trk>trk-ct>trk-kp',l);
for(const l of['sah','dlg','tyv','kjh','cjs','otk'])eq(E.findNode(l).path.at(-1).id,'trk-sb',l);
eq(E.findNode('ura').node.children.length,9,'Ural: dokuz dal');eq(E.leaves(E.findNode('trk').node),26);eq(E.leaves(E.findNode('ie-bs').node),5);
eq(E.PROPOSALS.map(p=>p.id).join(','),'altaic,transeurasian,uralaltaic,nostratic');for(const p of E.PROPOSALS){assert(p.pro&&p.con&&p.status);checks++;}
eq(E.findNode('altaic'),null,'öneriler ağaçta aile olarak yer almaz');

// 5. Türk eşses çizgileri: Wikipedia tablosundaki biçimler ve elle gruplanmış beklenen sonuçlar.
const ISO={otk:['toquz','adaq','tāɣ'],tr:['dokuz','ayak','dağ'],az:['doqquz','ayaq','dağ'],tk:['dokuz','aýak','dag'],uz:['toʻqqiz','oyoq','togʻ'],ug:['toqquz','ayaq','tagh'],tt:['tuɣïz','ayaq','taw'],kk:['toğyz','aiaq','tau'],ky:['toɣuz','ayaq','tō'],sah:['toɣus','ataχ','tıa'],tyv:['tos','adaq','daɣ'],kjh:['toɣïs','azaq','taɣ'],klj:['toqquz','hadaq','tāɣ'],cv:['tăχăr','ura','tu']};
eq(E.ISO_LANGS.length,14);for(const l of E.ISO_LANGS)same(l.f,ISO[l.id],l.id);
const grp=id=>Object.fromEntries([...E.isoGroups(id)].map(([k,v])=>[k,[...v].sort().join(',')]));
same(grp('zr'),{'z / s (Ortak Türkçe)':Object.keys(ISO).filter(x=>x!=='cv').sort().join(','),'r (Oğur)':'cv'},'z/r');
same(grp('h'),{'h- düşmüş':Object.keys(ISO).filter(x=>x!=='klj').sort().join(','),'h- korunmuş':'klj'},'h');
same(grp('d'),{d:'klj,otk,tyv',y:'az,kk,ky,tk,tr,tt,ug,uz',t:'sah',z:'kjh',r:'cv'},'d');
same(grp('g'),{'ɣ / g / ğ korunmuş':'az,kjh,klj,otk,tk,tr,tyv,ug,uz','w / u olmuş':'kk,tt','düşmüş, ünlü değişmiş':'cv,ky,sah'},'g');

// 6. TDK verisi. 13 Kasım 2026'da sozluk.gov.tr/gts'den alınan "lisan" alanı (ilk madde); "-" = köken yok.
const TDK={kitap:'Arapça kitāb',kalem:'Arapça ḳalem',hesap:'Arapça ḥisāb',saat:'Arapça sāʿat',millet:'Arapça millet',devlet:'Arapça devlet',hayat:'Arapça ḥayāt',kalp:'Arapça ḳalb',akıl:'Arapça ʿaḳl',fikir:'Arapça fikr',insan:'Arapça insān',dünya:'Arapça dunyā',cevap:'Arapça cevāb',kelime:'Arapça kelime',kahve:'Arapça ḳahve',mektep:'Arapça mekteb',tayyare:'Arapça ṭayyāre',imtihan:'Arapça imtiḥān',ilim:'Arapça ʿilm',
 pencere:'Farsça pencere',şehir:'Farsça şehr',hafta:'Farsça hefte',rüzgâr:'Farsça rūzgār',renk:'Farsça reng',dert:'Farsça derd',çare:'Farsça çāre',bahçe:'Farsça bāġçe',pazar:'Farsça bāzār',hoş:'Farsça ḫoş',tahta:'Farsça taḫte',şeker:'Farsça şeker',
 otobüs:'Fransızca autobus',kuaför:'Fransızca coiffeur',şoför:'Fransızca chauffeur',istasyon:'Fransızca station',asansör:'Fransızca ascenseur',kamyon:'Fransızca camion',bisiklet:'Fransızca bicyclette',garaj:'Fransızca garage',kültür:'Fransızca culture',parti:'Fransızca parti',televizyon:'Fransızca télévision',pantolon:'Fransızca pantalon',rekor:'Fransızca record',centilmen:'Fransızca gentleman',
 fırtına:'İtalyanca fortunale',banka:'İtalyanca banca',gazete:'İtalyanca gazzetta',iskele:'İtalyanca scala',lokanta:'İtalyanca locanda',fatura:'İtalyanca fattura',tiyatro:'İtalyanca teatro',
 liman:'Rumca',kiremit:'Rumca',kilise:'Rumca',lahana:'Rumca',fasulye:'Rumca',avlu:'Rumca',efendi:'Rumca',fener:'Rumca',temel:'Rumca',çipura:'Rumca',kutu:'Rumca',kalamar:'Rumca',
 futbol:'İngilizce football',kek:'İngilizce cake',gol:'İngilizce goal',sandviç:'İngilizce sandwich',tişört:'İngilizce T-shirt',blucin:'İngilizce blue-jeans',tost:'İngilizce toast',
 semaver:'Rusça',borç:'Soğdca',çay:'Çince',şalter:'Almanca Schalter'};
for(const w of'su göz el taş ev yol ağaç kulak et dağ ayak dokuz demir gök kurt gelmek bilmek uçak üçgen oran kuzey ekim yanıt sözcük bilim örnek sınav öğrenci ulus'.split(' '))TDK[w]='-';
const LANG={Arapça:'ar',Farsça:'fa',Fransızca:'fr',İtalyanca:'it',Rumca:'el',İngilizce:'en'};
eq(E.WORDS.length,Object.keys(TDK).length,'sözcük sayısı');eq(new Set(E.WORDS.map(w=>w.w)).size,E.WORDS.length,'yinelenen sözcük');
for(const e of E.WORDS){const t=TDK[e.w];assert(t!==undefined,'TDK kaydı yok: '+e.w);checks++;if(t==='-'){eq(e.l,'tr',e.w);eq(e.src,'',e.w);continue;}const[lang,...rest]=t.split(' ');if(LANG[lang]){eq(e.l,LANG[lang],e.w);eq(e.src,rest.join(' '),e.w+' kaynak biçim');}else{eq(e.l,'ot',e.w);eq(e.lang,lang,e.w);eq(e.src,rest.join(' '),e.w);}}
same(Object.fromEntries(Object.entries(E.layerCounts())),{tr:29,ar:19,fa:12,fr:14,it:7,el:12,en:7,ot:4},'katman sayıları');
eq(E.WORDS.filter(w=>w.reform).length,12);
// Ses uyarlamaları: elle yazılmış beklenenler (kaynak biçim ile Türkçe biçim karşılaştırması).
const AD={kitap:'devoice,long',kalem:'special',hesap:'devoice,long,special',saat:'long,special',hayat:'long,special',kalp:'devoice,special',akıl:'special,epenthesis',fikir:'epenthesis',insan:'long',dünya:'long',cevap:'devoice,long',kahve:'special',mektep:'devoice',tayyare:'long,special',imtihan:'long,special',ilim:'special,epenthesis',şehir:'epenthesis',rüzgâr:'circ',renk:'devoice',dert:'devoice',çare:'long',bahçe:'long,special',pazar:'initial,long',hoş:'special',tahta:'special,harmony',fırtına:'harmony',gazete:'double',iskele:'prothesis',fatura:'double',tiyatro:'hiatus',istasyon:'prothesis,spoken'};
for(const e of E.WORDS){const got=E.adaptations(e).sort().join(','),want=(AD[e.w]||(['fr','en'].includes(e.l)?'spoken':'')).split(',').filter(Boolean).sort().join(',');eq(got,want,'uyarlama '+e.w);}
// Bağımsız ünlü uyumu: küme denetimi.
const BK=new Set('aıouâ'),FR=new Set('eiöü');const harm=w=>{const v=[...w].filter(c=>BK.has(c)||FR.has(c));return v.length<2||v.every(c=>BK.has(c))||v.every(c=>FR.has(c));};
for(const e of E.WORDS)eq(E.harmonic(e.w),harm(e.w),'uyum '+e.w);
eq(E.WORDS.filter(e=>E.harmonic(e.w)).length,E.WORDS.filter(e=>harm(e.w)).length);
for(const w of['kitap','otobüs','kalem','tiyatro'])eq(E.harmonic(w),false,w);for(const w of['fırtına','iskele','göz','pencere'])eq(E.harmonic(w),true,w);

// 7. TDK 2005 dökümü: arşiv sayfasındaki 24 satır, toplam 14 816.
const T05={Almanca:85,Arapça:6463,Arnavutça:1,Bulgarca:8,Ermenice:23,Farsça:1374,Fince:2,Fransızca:4974,İbranice:9,İngilizce:538,İspanyolca:36,İtalyanca:632,Japonca:7,Korece:1,Latince:147,Macarca:19,Moğolca:13,Norveççe:2,Portekizce:4,Rumca:14,Rusça:40,Slavca:24,Soğdca:1,Yunanca:399};
eq(E.TDK2005.length,24);for(const[l,n]of E.TDK2005)eq(n,T05[l],l);const S=E.tdkShares();eq(S.total,14816);near(S.rows.reduce((a,r)=>a+r.share,0),1,1e-12,'paylar');near(S.rows.find(r=>r.lang==='Arapça').share,6463/14816,1e-15,'Arapça');eq((100*6463/14816).toFixed(1),'43.6');

// 8. Dil Devrimi: TDK göndermeleri (yanıt ► cevap: tanım eski sözde).
const POINT={tayyare:'uçak',müselles:'üçgen',nispet:'oran',şimal:'kuzey',teşrinievvel:'ekim',yanıt:'cevap',sözcük:'kelime',ilim:'bilim',misal:'örnek',imtihan:'sınav',talebe:'öğrenci',ulus:'millet',lisan:'dil'};
eq(E.REFORM.length,13);for(const r of E.REFORM){const holder=POINT[r.old]===r.neu?'new':POINT[r.neu]===r.old?'old':null;assert(holder,'gönderme yok '+r.old);eq(r.holder,holder,r.old);}
same(E.reformStats(),{n:13,newHolds:10,oldHolds:3},'Dil Devrimi');

// 9. İddialar.
// Doğrulayıcı düzeltmeleri: İslambol bir halk etimolojisi değil, fetihten sonra bilerek kullanılan ayrı bir ad (Wikipedia, Names of Istanbul);
// oran Eski Türkçe oran adından, ulus Moğolca uluş'tan (Wikipedia, List of replaced loanwords in Turkish).
assert(/ayrı bir addır/.test(E.CLAIMS[0].why)&&!/halk etimolojisi/.test(E.CLAIMS[0].why));checks++;
assert(/oran \(ölçü/.test(E.REFORM.find(r=>r.neu==='oran').how)&&/uluş/.test(E.REFORM.find(r=>r.neu==='ulus').how));checks++;
assert(!/720–735/.test(html)&&/731 ve 734/.test(html));checks++;
eq(E.CLAIMS.length,12);eq(E.CLAIMS.map(c=>c.ok?1:0).join(''),'010101001000');for(const c of E.CLAIMS){assert(E.CRITERIA[c.crit]&&c.why.length>50);checks++;}
assert(Object.isFrozen(E)&&Object.isFrozen(E.WORDS)&&Object.isFrozen(E.WORDS[0])&&Object.isFrozen(E.TREE[0].children[0]));checks++;
console.log(`Etimoloji ve dil aileleri: ${checks.toLocaleString('tr-TR')} denklik, olasılık, ağaç, eşses, TDK ve iddia kontrolü PASS`);

if(process.argv.includes('--browser')){
 const {chromium}=await import('playwright');const {createServer}=await import('node:http');const {join,extname}=await import('node:path');const {fileURLToPath}=await import('node:url');const root=fileURLToPath(new URL('../',import.meta.url));
 const server=createServer((req,res)=>{const file=join(root,decodeURIComponent(new URL(req.url,'http://localhost').pathname));if(!fs.existsSync(file)||fs.statSync(file).isDirectory()){res.writeHead(404).end();return;}res.setHeader('Content-Type',({'.html':'text/html; charset=utf-8','.js':'text/javascript; charset=utf-8','.css':'text/css; charset=utf-8'})[extname(file)]||'application/octet-stream');res.end(fs.readFileSync(file));});
 await new Promise(r=>server.listen(0,'127.0.0.1',r));let browser;const before=checks;
 assert(fs.existsSync(new URL(`../shared/digest/${SLUG}.js`,import.meta.url)),'defter dosyası gerekli');
 try{browser=await chromium.launch();
  for(const[width,theme]of[[390,'light'],[1280,'dark']]){const page=await browser.newPage({viewport:{width,height:900},deviceScaleFactor:2});await page.addInitScript(t=>{localStorage.setItem('acelya-theme',t);localStorage.setItem('acelya-sound-muted','1');},theme);page.setDefaultTimeout(5000);const errors=[];page.on('pageerror',e=>errors.push(e.message));page.on('console',m=>{if(m.type()==='error')errors.push(m.text()+' '+(m.location().url||''));});
   await page.goto(`http://127.0.0.1:${server.address().port}/${SLUG}.html`);await page.waitForTimeout(400);
   const read=id=>page.locator('#'+id).textContent(),has=async(id,t)=>{const x=await read(id);assert(x.includes(t),id+': '+x+' / '+t);checks++;},click=id=>page.locator('#'+id).click(),setRange=async(id,v)=>{await page.locator('#'+id).evaluate((el,v)=>{el.value=v;el.dispatchEvent(new Event('input',{bubbles:true}));},v);};
   // 1. sekme
   await has('crTop','t : d · 5 çift');await has('crDD','2 (day, devil)');await has('crN','13 / 13');await has('crStatus','alıntı');eq(await page.locator('#crMatrix tr').count(),8);
   await click('crOnlyKin');await has('crDD','0');await has('crStatus','t : d denkliği 5');await click('crLook');await has('crStatus','rastlantı');eq(await page.locator('#crMatrix tr').count(),1);
   await page.locator('#cr-day').uncheck();await has('crDD','1 (devil)');await click('crReset');await has('crN','13 / 13');
   await has('clCounter','Çift 1 / 12');await page.locator('#clOptions [data-k="soydas"]').click();await has('clScore','1');await has('clFeedback','beş temel sözcükte');eq(await page.locator('#clOptions button[disabled]').count(),3);await click('clNext');await page.locator('#clOptions [data-k="soydas"]').click();await has('clScore','1');await has('clDone','2 / 12');await has('clFeedback','rastlantı');await click('clReset');await has('clCounter','Çift 1 / 12');await has('clScore','0');
   await has('chP','0,05');await has('chE','5,0');await has('chTail','0,564');await has('chSample','henüz');await has('chStatus','olağandır');
   await setRange('chC',2);await setRange('chS',3);await has('chP','0,271');await has('chTail','≈ 1 (> %99,9)');eq((await read('chTail')).includes('%100'),false,'≈ 1 iken %100 yazılmaz');await setRange('chM',60);await has('chTail','< 0,0001');await has('chStatus','zor çıkar');
   await click('chDraw');const want=E.sampleLookalikes(1,100,20,2,3);await has('chSample',want+' benzer çift · deneme 1');await click('chReset');await has('chP','0,05');await has('chNo','100');
   // 2. sekme
   await click('tab-tree');await has('ndName','Türk');await has('ndLeaves','26');await has('isoStatus','Gruplar');eq(await page.locator('#propRows tr').count(),4);await has('propRows','Transavrasya');
   await page.locator('#tree [data-sel="tr"]').click();await has('ndName','Türkçe');await has('ndPath','Oğuz');eq(await page.locator('#isoRows tr.et-hl').count(),1);await has('isoStatus','Seçili dil: Türkçe');
   await page.locator('#isoSel').selectOption('d');await has('isoStatus','y (8)');await page.locator('#isoSel').selectOption('h');await has('isoRows','h- korunmuş');
   await page.locator('#tree [data-tog="ie"]').click();eq(await page.locator('#tree [data-sel="ie-ger"]').count(),0);await click('trOpen');eq(await page.locator('#tree [data-sel="hu"]').count(),1);await page.locator('#tree [data-sel="hu"]').click();await has('ndPath','Ural');await click('trClose');eq(await page.locator('#tree [data-sel="tr"]').count(),0);
   await page.locator('#tree [data-sel="ie"]').click();await has('ndKids','10');await click('trReset');await has('ndName','Türk');eq(await page.locator('#isoSel').inputValue(),'zr');
   // 3. sekme
   await click('tab-layers');await has('tdkTotal','14 816');await has('tdkAr','%43,6');await has('tdkFr','%33,6');await has('tdkFa','%9,3');eq(await page.locator('#tdkBars .et-bar').count(),7);await page.locator('#tdkSmall').check();eq(await page.locator('#tdkBars .et-bar').count(),24);await page.locator('#tdkSort').selectOption('alpha');await has('tdkBars','Almanca');
   await has('wdShown','104 / 104');await page.locator('#wdLayer').selectOption('ar');await has('wdShown','19 / 104');await page.locator('#wdAdapt').selectOption('devoice');await has('wdShown','5 / 104');await page.locator('#wdLayer').selectOption('');await has('wdShown','7 / 104');await page.locator('#wdAdapt').selectOption('');await page.locator('#wdSearch').fill('kit');await has('wdShown','1 / 104');await has('wdList','kitāb');await page.locator('#wdSearch').fill('');await page.locator('#wdLayer').selectOption('reform');await has('wdShown','12 / 104');await click('wdReset');await has('wdShown','104 / 104');
   await has('gsWord','kitap');await page.locator('#gsOptions [data-l="ar"]').click();await has('gsScore','1');await has('gsFeedback','sonda tonsuzlaşma');await click('gsNext');await has('gsWord','pencere');await page.locator('#gsOptions [data-l="tr"]').click();await has('gsScore','1');await has('gsDone','2 / 20');await click('gsReset');await has('gsWord','kitap');
   // 4. sekme
   await click('tab-reform');await has('rfNew','?');await page.locator('#rfRows [data-rf="0"][data-g="new"]').click();await has('rfScore','1');await page.locator('#rfRows [data-rf="5"][data-g="new"]').click();await has('rfScore','1');await has('rfRows','yanıt ► cevap');await has('rfDone','2 / 13');await click('rfReveal');await has('rfNew','10 / 13');await has('rfOld','3 / 13');await has('rfStatus','cevap, kelime, millet');await click('rfReset');await has('rfNew','?');await has('rfDone','0 / 13');
   // 5. sekme
   await click('tab-folk');await has('fkCounter','İddia 1 / 12');await page.locator('#fkOptions [data-v="0"]').click();await has('fkScore','1');await has('fkFeedback','Tanıklık');eq(await page.locator('#fkRows tr').count(),1);await click('fkNext');await page.locator('#fkOptions [data-v="0"]').click();await has('fkScore','1');await has('fkDone','2 / 12');await page.evaluate(()=>document.activeElement?.blur());await page.keyboard.press('r');await has('fkDone','0 / 12');await has('fkRows','Henüz');
   // klavye, erişilebilirlik, taşma
   await page.locator('#tab-folk').focus();await page.keyboard.press('Home');eq(await page.locator('#tab-comp').getAttribute('aria-selected'),'true');await page.keyboard.press('ArrowLeft');eq(await page.locator('#tab-folk').getAttribute('aria-selected'),'true');await page.keyboard.press('End');await page.keyboard.press('ArrowRight');eq(await page.locator('#tab-comp').getAttribute('aria-selected'),'true');
   eq(await page.evaluate(()=>[...document.querySelectorAll('main input,main select')].filter(e=>!e.closest('.digest')).every(e=>e.getAttribute('aria-label')||document.querySelector('label[for="'+e.id+'"]'))),true,'etiketsiz denetim');
   for(const t of['comp','tree','layers','reform','folk']){await click('tab-'+t);eq(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),true,'taşma '+t+' '+width);}
   eq(await page.evaluate(()=>Object.isFrozen(Etymology)&&!Object.getOwnPropertyDescriptor(window,'Etymology').writable),true);
   // Keşif Defteri yüklenmeli ve görünmeli; hiçbir konsol hatası (404 dahil) hoş görülmez.
   await page.waitForSelector('.digest',{state:'attached',timeout:15000});await page.locator('.digest').scrollIntoViewIfNeeded();eq(await page.locator('.digest').isVisible(),true,'Keşif Defteri görünür');
   assert(((await page.locator('.digest').textContent())||'').includes('Benzerlik Değil Düzen'),'defter içeriği yüklendi');checks++;
   assert.deepEqual(errors,[]);checks++;await page.close();}
  console.log(`Etimoloji ve dil aileleri: ${checks-before} tarayıcı kontrolü (390 açık, 1280 koyu) PASS`);
 }finally{await browser?.close();await new Promise(r=>server.close(r));}
}
