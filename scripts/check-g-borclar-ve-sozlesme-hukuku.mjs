// Borçlar ve sözleşme hukuku: öneri–kabul motoru, haksız fiil, irade bozukluğu, ifa yeri, temerrüt, güven oyunu, etkin ihlal,
// alıştırma üreteci ve yanıt ayrıştırıcısı için kalıcı denetim.
// Başvurular sayfanın kurallarını kullanmaz: 13 Kasım 2026'da mevzuat.gov.tr'den okunan 6098 sayılı TBK metninden kısa parçalar
// (madde numaralarının doğruluğu ve alıntıların harfi harfine uyuşması), tek öneri–tek kabul olayları için ayrı yazılmış doğrudan
// bir karar yordamı, oyun ağacında kaba kuvvetle geriye doğru tümevarım, elle yazılmış doğruluk tabloları.
import fs from 'node:fs';
import vm from 'node:vm';
import assert from 'node:assert/strict';
const SLUG='borclar-ve-sozlesme-hukuku';
const html=fs.readFileSync(new URL(`../${SLUG}.html`,import.meta.url),'utf8');
const source=html.split('/* KERNEL-BEGIN */')[1]?.split('/* KERNEL-END */')[0];
assert(source,'Çekirdek sınırları gerekli');
const context={window:{}};vm.createContext(context);vm.runInContext(source,context);
const K=context.window.BorclarHukuku;let checks=0;
const eq=(a,b,msg)=>{assert.equal(a,b,String(msg??`${a} ≠ ${b}`));checks++;};
const ok=(c,msg)=>{assert(c,msg);checks++;};
const H=(d,h)=>(d-1)*24+h;

// 0. TBK metninden parçalar (mevzuat.gov.tr, 13 Kasım 2026). Sayfadaki alıntılar bunların harfi harfine parçası olmalı.
const TBK={
 1:'Sözleşme, tarafların iradelerini karşılıklı ve birbirine uygun olarak açıklamalarıyla kurulur. İrade açıklaması, açık veya örtülü olabilir.',
 2:'Taraflar sözleşmenin esaslı noktalarında uyuşmuşlarsa, ikinci derecedeki noktalar üzerinde durulmamış olsa bile, sözleşme kurulmuş sayılır.',
 3:'Kabul için süre belirleyerek bir sözleşme yapılmasını öneren, bu sürenin sona ermesine kadar önerisiyle bağlıdır. Kabul bu süre içinde kendisine ulaşmazsa; öneren, önerisiyle bağlılıktan kurtulur.',
 4:'Kabul için süre belirlenmeksizin hazır olan bir kişiye yapılan öneri hemen kabul edilmezse; öneren, önerisiyle bağlılıktan kurtulur. Telefon, bilgisayar gibi iletişim sağlayabilen araçlarla doğrudan iletişim sırasında yapılan öneri, hazır olanlar arasında yapılmış sayılır.',
 5:'Kabul için süre belirlenmeksizin hazır olmayan bir kişiye yapılan öneri, zamanında ve usulüne uygun olarak gönderilmiş bir yanıtın ulaşmasının beklenebileceği ana kadar, önereni bağlar. Öneren, önerisini zamanında ulaşmış sayabilir. Zamanında gönderilen kabul, önerene geç ulaşır ve öneren onunla bağlı olmak istemezse, durumu hemen kabul edene bildirmek zorundadır.',
 6:'Öneren, kanun veya işin özelliği ya da durumun gereği açık bir kabulü beklemek zorunda değilse, öneri uygun bir sürede reddedilmediği takdirde, sözleşme kurulmuş sayılır.',
 7:'Ismarlanmamış bir şeyin gönderilmesi öneri sayılmaz. Bu şeyi alan kişi, onu geri göndermek veya saklamakla yükümlü değildir.',
 8:'Fiyatını göstererek mal sergilenmesi veya tarife, fiyat listesi ya da benzerlerinin gönderilmesi, aksi açıkça ve kolaylıkla anlaşılmadıkça öneri sayılır.',
 9:'Bir sonucun gerçekleşmesi karşılığında ödül vereceğini ilan yoluyla duyuran kimse, sözünü yerine getirmekle yükümlüdür.',
 10:'Geri alma açıklaması, diğer tarafa öneriden önce veya aynı anda ulaşmış ya da daha sonra ulaşmakla birlikte diğer tarafça öneriden önce öğrenilmiş olursa, öneri yapılmamış sayılır. Bu kural, kabulün geri alınmasında da uygulanır.',
 11:'Hazır olmayanlar arasında kurulan sözleşmeler, kabulün gönderildiği andan başlayarak hüküm doğurur. Açık bir kabulün gerekli olmadığı durumlarda, sözleşme önerinin ulaşma anından başlayarak hüküm doğurur.',
 12:'Sözleşmelerin geçerliliği, kanunda aksi öngörülmedikçe, hiçbir şekle bağlı değildir. Kanunda sözleşmeler için öngörülen şekil, kural olarak geçerlilik şeklidir. Öngörülen şekle uyulmaksızın kurulan sözleşmeler hüküm doğurmaz.',
 14:'Yazılı şekilde yapılması öngörülen sözleşmelerde borç altına girenlerin imzalarının bulunması zorunludur.',
 27:'Kanunun emredici hükümlerine, ahlaka, kamu düzenine, kişilik haklarına aykırı veya konusu imkânsız olan sözleşmeler kesin olarak hükümsüzdür.',
 28:'bir yıl ve her hâlde sözleşmenin kurulduğu tarihten başlayarak beş yıl içinde kullanabilir.',
 32:'Saikte yanılma, esaslı yanılma sayılmaz.',
 36:'Taraflardan biri, diğerinin aldatması sonucu bir sözleşme yapmışsa, yanılması esaslı olmasa bile, sözleşmeyle bağlı değildir.',
 39:'andan başlayarak bir yıl içinde sözleşme ile bağlı olmadığını bildirmez veya verdiği şeyi geri istemezse, sözleşmeyi onamış sayılır.',
 49:'Kusurlu ve hukuka aykırı bir fiille başkasına zarar veren, bu zararı gidermekle yükümlüdür.',
 50:'Zarar gören, zararını ve zarar verenin kusurunu ispat yükü altındadır.',
 63:'Zarar görenin rızası, daha üstün nitelikte özel veya kamusal yarar, zarar verenin davranışının haklı savunma niteliği taşıması',
 64:'Haklı savunmada bulunan, saldıranın şahsına veya mallarına verdiği zarardan sorumlu tutulamaz.',
 65:'Hakkaniyet gerektiriyorsa; hâkim, ayırt etme gücü bulunmayan kişinin verdiği zararın, tamamen veya kısmen giderilmesine karar verir.',
 66:'Adam çalıştıran, çalışanın, kendisine verilen işin yapılması sırasında başkalarına verdiği zararı gidermekle yükümlüdür.',
 67:'Bir hayvanın bakımını ve yönetimini sürekli veya geçici olarak üstlenen kişi, hayvanın verdiği zararı gidermekle yükümlüdür.',
 69:'Bir binanın veya diğer yapı eserlerinin maliki, bunların yapımındaki bozukluklardan veya bakımındaki eksikliklerden doğan zararı gidermekle yükümlüdür.',
 71:'Önemli ölçüde tehlike arzeden bir işletmenin faaliyetinden zarar doğduğu takdirde, bu zarardan işletme sahibi ve varsa işleten müteselsilen sorumludur.',
 72:'Tazminat istemi, zarar görenin zararı ve tazminat yükümlüsünü öğrendiği tarihten başlayarak iki yılın ve her hâlde fiilin işlendiği tarihten başlayarak on yılın geçmesiyle zamanaşımına uğrar.',
 77:'Haklı bir sebep olmaksızın, bir başkasının malvarlığından veya emeğinden zenginleşen, bu zenginleşmeyi geri vermekle yükümlüdür.',
 89:'1. Para borçları, alacaklının ödeme zamanındaki yerleşim yerinde, 2. Parça borçları, sözleşmenin kurulduğu sırada borç konusunun bulunduğu yerde, 3. Bunların dışındaki bütün borçlar, doğumları sırasında borçlunun yerleşim yerinde, ifa edilir.',
 90:'her borç, doğumu anında muaccel olur.',
 112:'Borç hiç veya gereği gibi ifa edilmezse borçlu, kendisine hiçbir kusurun yüklenemeyeceğini ispat etmedikçe, alacaklının bundan doğan zararını gidermekle yükümlüdür.',
 117:'Muaccel bir borcun borçlusu, alacaklının ihtarıyla temerrüde düşer.',
 123:'taraflardan biri temerrüde düştüğü takdirde diğeri, borcun ifa edilmesi için uygun bir süre verebilir',
 125:'borcun ifa edilmemesinden doğan zararın giderilmesini isteyebilir veya sözleşmeden dönebilir.',
 136:'Borcun ifası borçlunun sorumlu tutulamayacağı sebeplerle imkânsızlaşırsa, borç sona erer.',
 138:'hâkimden sözleşmenin yeni koşullara uyarlanmasını isteme',
 146:'Kanunda aksine bir hüküm bulunmadıkça, her alacak on yıllık zamanaşımına tabidir.',
 237:'Taşınmaz satışının geçerli olabilmesi için, sözleşmenin resmî şekilde düzenlenmesi şarttır.',
 288:'Bağışlama sözü vermenin geçerliliği, bu sözleşmenin yazılı şekilde yapılmasına bağlıdır.',
 583:'Kefalet sözleşmesi, yazılı şekilde yapılmadıkça ve kefilin sorumlu olacağı azamî miktar ile kefalet tarihi belirtilmedikçe geçerli olmaz.',
 647:'22/4/1926 tarihli ve 818 sayılı Borçlar Kanunu yürürlükten kaldırılmıştır.',
 648:'Bu Kanun 1 Temmuz 2012 tarihinde yürürlüğe girer.'};
const ALL=Object.values(TBK).join(' ');
const quotes=[...html.matchAll(/<q class="bs-q">([^<]*)<\/q>/g)].map(m=>m[1]);
ok(quotes.length>=4,'alıntı sayısı');
for(const q of quotes){ok(ALL.includes(q),'alıntı TBK metninde yok: '+q);ok(q.split(/\s+/).length<=15,'alıntı 15 sözcüğü aşıyor: '+q);}
for(const q of Object.values(K.QUOTES))ok(ALL.includes(q),'QUOTES: '+q);
// Madde numaraları: kuralların dayandığı maddelerin metni beklenen kavramı içeriyor.
const RULE_WORDS=[[3,'süre'],[4,'hazır olan'],[5,'hazır olmayan'],[6,'açık bir kabulü'],[7,'Ismarlanmamış'],[8,'Fiyatını göstererek'],[9,'ödül'],[10,'Geri alma'],[11,'kabulün gönderildiği'],[12,'hiçbir şekle'],[27,'imkânsız'],[49,'Kusurlu ve hukuka aykırı'],[65,'ayırt etme gücü'],[66,'Adam çalıştıran'],[67,'hayvan'],[69,'yapı eserlerinin maliki'],[71,'tehlike'],[77,'Haklı bir sebep olmaksızın'],[117,'ihtarıyla'],[237,'resmî şekilde'],[288,'yazılı şekilde'],[583,'yazılı şekilde']];
for(const[n,w]of RULE_WORDS)ok(TBK[n].includes(w),'m. '+n+' '+w);
eq(K.CONTRACTS.tasinmaz.rule,'TBK m. 237/1');eq(K.CONTRACTS.tasinmaz.need,'resmi');eq(K.CONTRACTS.kefalet.rule,'TBK m. 583/1');eq(K.CONTRACTS.kefalet.need,'yazili');eq(K.CONTRACTS.bagis.rule,'TBK m. 288/1');eq(K.CONTRACTS.bagis.need,'yazili');eq(K.CONTRACTS.tasinir.need,null);
eq(K.KINDS.vitrin.offer,true,'m. 8/2: fiyatlı sergileme öneridir');eq(K.KINDS.vitrin.rule,'TBK m. 8/2');eq(K.KINDS.kayitli.offer,false);eq(K.KINDS.ilan.offer,false);
// Sayfadaki her "m. N" atfı okunan maddeler arasında.
const READ=new Set([48,76,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,20,21,25,26,27,28,30,31,32,33,34,35,36,37,38,39,49,50,51,52,53,54,55,56,57,58,63,64,65,66,67,68,69,71,72,74,77,82,83,89,90,112,113,114,117,118,123,124,125,136,137,138,146,147,219,237,288,583,647,648]);
const text=html.replace(/<script[\s\S]*?<\/script>/g,' ')+source;
for(const m of text.matchAll(/\bm\. (\d+)(?:[–-](\d+))?/g)){ok(READ.has(+m[1]),'okunmamış madde: m. '+m[1]);if(m[2])ok(READ.has(+m[2]),'okunmamış madde: m. '+m[2]);}

// 1. Hazır olaylar: elle çözülmüş sonuçlar.
const EXP={telefon:['kuruldu',H(1,10),H(1,10),'A','B'],dusuneyim:['kurulmadi'],sureli:['kurulmadi'],'geri-once':['kurulmadi'],'geri-gec':['kuruldu',H(5,14),H(3,14),'A','B'],'posta-gecikti':['kuruldu',H(5,16),H(2,16),'A','B'],'posta-bildirim':['kurulmadi'],vitrin:['kuruldu',H(1,11),H(1,11),'A','B'],kayitli:['kuruldu',H(4,22),H(3,22),'B','A'],tasinmaz:['gecersiz',H(1,16)],ortulu:['kuruldu',H(4,9),H(2,9),'A','B'],karsi:['kuruldu',H(1,10),H(1,10),'B','A']};
eq(K.PRESETS.length,Object.keys(EXP).length);
for(const p of K.PRESETS){const r=K.formation(p.sc),e=EXP[p.id];eq(r.status,e[0],p.id);if(e[1]!=null)eq(r.at,e[1],p.id+' an');if(e[2]!=null)eq(r.eff,e[2],p.id+' hüküm');if(e[3]){eq(r.offerer,e[3],p.id);eq(r.acceptor,e[4],p.id);}ok(r.steps.length>=2&&r.steps.every(s=>s.text.length>10),p.id+' adımlar');}
eq(K.DEFAULT_PRESET,'geri-gec');
// Şekil: aynı olay, dört sözleşme türü, üç şekil.
const base=K.PRESETS[0].sc.msgs;
for(const[c,need]of[['tasinir',0],['tasinmaz',2],['kefalet',1],['bagis',1]])for(const[f,have]of[['yok',0],['yazili',1],['resmi',2]])eq(K.formation({msgs:base,contract:c,form:f}).status,have>=need?'kuruldu':'gecersiz',c+' '+f);
// Değişen düşünme süresi m. 5'teki sınırı kaydırır.
eq(K.formation({msgs:K.PRESETS.find(p=>p.id==='geri-gec').sc.msgs,params:{think:0}}).status,'kurulmadi','düşünme 0');
// Kabulün geri alınması, öğrenilme, karşı öneri, red, örtülü kabulün reddi.
eq(K.formation({msgs:[{from:'A',type:'oneri',t:9,d:24},{from:'B',type:'kabul',t:40,d:24},{from:'B',type:'geri',t:41,d:0}]}).status,'kurulmadi','kabul geri alındı');
eq(K.formation({msgs:[{from:'A',type:'oneri',t:9,d:24},{from:'B',type:'kabul',t:40,d:1},{from:'B',type:'geri',t:42,d:0}]}).status,'kuruldu','kabul geri alma geç');
eq(K.formation({msgs:[{from:'A',type:'oneri',t:9,d:24},{from:'A',type:'geri',t:20,d:24,learnedFirst:true},{from:'B',type:'kabul',t:50,d:0}]}).status,'kurulmadi','önce öğrenilen geri alma');
eq(K.formation({msgs:[{from:'A',type:'oneri',t:9,d:24},{from:'B',type:'red',t:35,d:0},{from:'B',type:'kabul',t:36,d:0}]}).status,'kurulmadi','redden sonra kabul');
eq(K.formation({msgs:[{from:'A',type:'oneri',t:9,d:24,tacit:true},{from:'B',type:'red',t:40,d:0}]}).status,'kurulmadi','örtülü kabul, red');
eq(K.formation({msgs:[{from:'A',type:'oneri',t:9,d:0},{from:'B',type:'karsi',t:9,d:0}]}).status,'kurulmadi','karşı öneri tek başına');
eq(K.formation({msgs:[{from:'A',type:'oneri',kind:'ilan',t:9,d:24},{from:'B',type:'kabul',t:40,d:24}]}).status,'kurulmadi','ilana kabul');
eq(K.formation({msgs:[]}).status,'kurulmadi');eq(K.formation({}).status,'kurulmadi');
// Doğrulayıcı eki: süresi öneri ulaşmadan dolan örtülü kabul önerisi sözleşme kurmaz; süre içinde red gelmezse kurar.
eq(K.formation({msgs:[{from:'A',type:'oneri',t:H(2,9),d:48,deadline:H(1,17),tacit:true}]}).status,'kurulmadi','örtülü kabul, süre ulaşmadan dolmuş');
{const r=K.formation({msgs:[{from:'A',type:'oneri',t:H(1,9),d:24,deadline:H(5,17),tacit:true}]});eq(r.status,'kuruldu');eq(r.at,H(5,17));eq(r.eff,H(2,9));}
// Geçersiz (şekil) sözleşmede hüküm anı yok.
{const r=K.formation(K.PRESETS.find(p=>p.id==='tasinmaz').sc);eq(r.status,'gecersiz');eq(r.at,H(1,16));eq(r.eff,null,'geçersizde hüküm anı');}

// 2. Tek öneri, isteğe bağlı geri alma, tek kabul, isteğe bağlı kabulün geri alınması: doğrudan karar yordamıyla karşılaştırma.
function ref(o,g,k,kg,think){const oa=o.t+o.d;if(g&&(g.t+g.d<=oa||g.learned))return{status:'kurulmadi'};if(!k||k.t<oa)return{status:'kurulmadi'};const ka=k.t+k.d;
 if(kg&&kg.t+kg.d<=ka)return{status:'kurulmadi'};let f;
 if(o.deadline!=null)f=ka<=o.deadline;else if(o.d===0)f=k.t===oa;else{const D=oa+think+o.d;f=ka<=D||k.t+o.d<=D;}
 return f?{status:'kuruldu',at:ka,eff:k.d>0?k.t:ka}:{status:'kurulmadi'};}
const R=K.rng(20261113);const ri=(a,b)=>a+Math.floor(R()*(b-a+1));let nForm=0,nNot=0;
for(let i=0;i<4000;i++){const d=[0,1,24,48][ri(0,3)];const o={t:ri(0,60),d,deadline:R()<0.4?ri(0,200):null};const think=[0,6,24,48][ri(0,3)];
 const g=R()<0.3?{t:o.t+ri(0,60),d:[0,1,24][ri(0,2)],learned:R()<0.2}:null;const k=R()<0.9?{t:o.t+ri(0,120),d:[0,1,24,48,72][ri(0,4)]}:null;const kg=k&&R()<0.2?{t:k.t+ri(0,30),d:[0,1,24][ri(0,2)]}:null;
 const msgs=[{from:'A',type:'oneri',t:o.t,d:o.d,deadline:o.deadline}];if(g)msgs.push({from:'A',type:'geri',t:g.t,d:g.d,learnedFirst:g.learned});if(k)msgs.push({from:'B',type:'kabul',t:k.t,d:k.d});if(kg)msgs.push({from:'B',type:'geri',t:kg.t,d:kg.d});
 const a=K.formation({msgs,params:{think}}),b=ref(o,g,k,kg,think);const tag=JSON.stringify({o,g,k,kg,think});
 eq(a.status,b.status,tag);if(b.status==='kuruldu'){eq(a.at,b.at,tag);eq(a.eff,b.eff,tag);eq(a.offerer,'A');nForm++;}else nNot++;}
ok(nForm>500&&nNot>500,'rastgele olaylarda iki sonuç da yeterince sık: '+nForm+' / '+nNot);
// Sıranın önemi yok: açıklamaların listedeki sırası karıştırılınca sonuç değişmez.
for(const p of K.PRESETS){const rev=Object.assign({},p.sc,{msgs:p.sc.msgs.slice().reverse()});const a=K.formation(p.sc),b=K.formation(rev);eq(a.status,b.status,p.id+' sıra');eq(a.at,b.at);}
eq(K.fmtT(0),'1. gün 00.00');eq(K.fmtT(H(5,17)),'5. gün 17.00');eq(K.fmtDur(0),'anında');eq(K.fmtDur(48),'2 gün');eq(K.fmtDur(30),'1 gün 6 saat');
eq(K.num(1234567),'1 234 567');eq(K.num(3000),'3000');eq(K.num(-12.5,1),'−12,5');eq(K.num(-0.04,1),'0,0');

// 3. Haksız fiil: unsurları bağımsız olarak sırayla sına.
const ORDER=['fiil','hukuka','zarar','illiyet','kusur'];
eq(K.ELEMENTS.map(e=>e.k).join(),ORDER.join());
const EXPT={bisiklet:[null,'m49'],savunma:['hukuka','yok'],izinsiz:['zarar','yok'],kirmizi:['illiyet','yok'],cocuk:['kusur','m65'],kopek:['kusur','m67'],kargo:[null,'m49'],balkon:['kusur','m69'],deprem:['fiil','yok'],boks:['hukuka','yok']};
eq(K.TORT_CASES.length,Object.keys(EXPT).length);
for(const c of K.TORT_CASES){const first=ORDER.find(k=>!c.a[k])||null;eq(first,EXPT[c.id][0],c.id);const t=K.tort(Object.assign({},c.a,{ozel:c.ozel}));
 const want=EXPT[c.id][1];eq(t.liable===true,want!=='yok',c.id);if(want==='m49')eq(t.basis,'TBK m. 49/1');else if(want!=='yok')eq(t.basis,'TBK m. '+want.slice(1));
 for(const k of ORDER.slice(0,first?ORDER.indexOf(first)+1:5))ok(c.why[k]&&c.why[k].length>10,c.id+' gerekçe '+k);ok(c.conclusion.length>30);}
eq(K.tort({fiil:1,hukuka:1,zarar:1,illiyet:1,kusur:0}).liable,false);eq(K.tort({fiil:1,hukuka:0,zarar:1,illiyet:1,kusur:0,ozel:'m67'}).liable,false,'kusursuz sorumluluk hukuka aykırılığı aşmaz');

// 4. İrade bozukluğu: doğruluk tablosu (öncelik: korkutma > aldatma > esaslı yanılma > aşırı yararlanma > saik/yok).
for(const t of[0,1])for(const a of[0,1])for(const y of[null,'esasli','saik'])for(const o of[0,1]){const r=K.irade({tehdit:t,aldatma:a,yanilma:y,oran:o});
 const want=t?'korkutma':a?'aldatma':y==='esasli'?'yanilma':o?'asiri':'yok';eq(r.k,want,JSON.stringify({t,a,y,o}));ok(/TBK m\. \d+/.test(r.rule));}
eq(K.irade({yanilma:'saik'}).rule,'TBK m. 32');

// 5. İfa yeri (m. 89) ve temerrüt (m. 117–125).
eq(K.ifaYeri('para',false).rule,'TBK m. 89/1-1');ok(/alacaklının/i.test(K.ifaYeri('para',false).yer));eq(K.ifaYeri('parca',false).rule,'TBK m. 89/1-2');eq(K.ifaYeri('diger',false).rule,'TBK m. 89/1-3');ok(/borçlunun/i.test(K.ifaYeri('diger',false).yer));for(const k of['para','parca','diger'])eq(K.ifaYeri(k,true).rule,'TBK m. 89/1');
for(const mu of[0,1])for(const g of[0,1])for(const ih of[0,1])for(const ka of[0,1])for(const su of['gecti','yok','gereksiz']){const r=K.temerrut({muaccel:!!mu,gun:!!g,ihtar:!!ih,karsilikli:!!ka,sure:su});
 const tem=!!mu&&(!!g||!!ih);eq(r.temerrut,tem,'temerrüt');eq(r.secimlik,tem&&!!ka&&su!=='yok','seçimlik');}

// 6. Güven oyunu: oyun ağacında kaba kuvvetle geriye doğru tümevarım.
function solveTree(node){if(node.leaf)return node.pay;let best=null;for(const ch of node.children){const v=solveTree(ch);if(!best||v[node.player]>best[node.player]||(v[node.player]===best[node.player]&&ch.tiePref))best=v;}return best;}
for(let i=0;i<3000;i++){const V=ri(0,30)*10,P=ri(0,30)*10,c=ri(0,30)*10,T=ri(0,30)*10,q=ri(0,20)/20;
 const tree={player:1,children:[{leaf:true,pay:[0,0]},{player:0,children:[{leaf:true,pay:[P-c,V-P],tiePref:true},{leaf:true,pay:[P-q*T,-P+q*T]}]}]};
 // oyuncu 0 = A (satıcı), 1 = B (alıcı). B eşitlikte ödemez (ilk çocuk); A eşitlikte gönderir.
 const v=solveTree(tree),r=K.trustGame({V,P,c,T,q});ok(Math.abs(v[0]-r.seller)<1e-9&&Math.abs(v[1]-r.buyer)<1e-9,JSON.stringify({V,P,c,T,q,v,r}));}
{const r0=K.trustGame({V:150,P:100,c:60,T:0,q:1});eq(r0.trade,false);eq(r0.welfare,0);eq(r0.potential,90);const r1=K.trustGame({V:150,P:100,c:60,T:150,q:1});eq(r1.trade,true);eq(r1.seller,40);eq(r1.buyer,50);eq(r1.welfare,90);
 eq(K.trustGame({V:150,P:100,c:60,T:60,q:1}).deliver,true,'eşik: q·T = c');eq(K.trustGame({V:150,P:100,c:60,T:100,q:0.5}).trade,false,'q·T = 50 < 60');}
// Etkin ihlal: elle hesaplanmış varsayılan değerler ve özdeşlikler.
{const r=K.breach({price:1000,vA:1200,b:1500,lit:100,neg:50});eq(r.perform.total,1200);eq(r.exp.breach,true);eq(r.exp.S,1200);eq(r.exp.A,100);eq(r.exp.total,1300);eq(r.spec.release,true);eq(r.spec.S,1125);eq(r.spec.A,325);eq(r.spec.total,1450);}
for(let i=0;i<2000;i++){const p={price:ri(0,60)*50,vA:ri(0,60)*50,b:ri(0,60)*50,lit:ri(0,20)*25,neg:ri(0,20)*25};const r=K.breach(p);
 for(const o of[r.perform,r.exp,r.spec])ok(Math.abs(o.S+o.A-o.total)<1e-9,'toplam');
 eq(r.exp.breach,p.b-p.vA-p.lit>0);eq(r.spec.release,p.b-p.vA-p.neg>0);ok(r.spec.S>=p.price-1e-9&&r.spec.A>=p.vA-p.price-1e-9,'pazarlık iki tarafa da en az ifa kadar verir');
 if(r.exp.breach)ok(r.exp.S>p.price,'bozmak satıcıya kazandırır');}

// 7. Yanıt ayrıştırıcı.
const P=K.parseCount;
for(const[s,v]of[['3',3],['3.',3],['3. gün',3],['3.gün',3],['gün 3',3],['3 gün',3],['üç',3],['Üç',3],[' 5 ',5],['3,0',3],['10',10],['on',10],['3’üncü',3],['3 üncü gün',3]])if(v==null)eq(P(s,'gün').ok,false,s);else{const r=P(s,'gün');eq(r.ok,true,s);eq(r.value,v,s);}
for(const s of['kurulmadı','Kurulmadı.','KURULMADI','yok','Yok.','hayır','-'])eq(JSON.stringify(P(s,'gün')),'{"ok":true,"value":null}',s);
for(const s of['3,5','2.5','0','abc','3 4','gün','1000'])eq(P(s,'gün').ok,false,s);eq(P('3,5','gün').notInt,true);eq(P('','gün').empty,true);eq(P('   ','gün').empty,true);
for(const[s,v]of[['1',1],['1 yıl',1],['bir yıl',1],['bir',1],['5 yıl',5]]){eq(P(s,'yıl').value,v,s);}
eq(P('0','gün').range,true);eq(P('1000','yıl').range,true);eq(P('3. günde','gün').value,3);eq(P('bir yılda','yıl').value,1);eq(P('3,5','gün').range,undefined);
ok(html.includes('Satıcı B, e-postayla gönderdiği teklifte'),'esaslı yanılma olayında yanılan satıcı');
eq(K.normalize('  KURULMADI. '),'kurulmadı');eq(K.normalize('İKİ'),'iki');eq(K.normalize('IŞIK'),'ışık');

// 8. Alıştırma üreteci: belirlenimci, her tür görünüyor, yanıt anahtarı bağımsız yeniden hesapla tutarlı.
const seen={1:new Set(),2:new Set(),3:new Set()};let nk=0;
for(const lv of[1,2,3])for(let seed=1;seed<=50;seed++)for(let n=0;n<8;n++){const e=K.exercise(lv,seed,n),e2=K.exercise(lv,seed,n);eq(JSON.stringify(e),JSON.stringify(e2),'belirlenimci');seen[lv].add(e.type);ok(K.TYPES_BY_LEVEL[lv].includes(e.type));
 ok(e.steps.length>=2,'en az iki adım');for(const s of e.steps){ok(Number.isInteger(s.answer)&&s.answer>=0&&s.answer<s.options.length,'anahtar');eq(new Set(s.options).size,s.options.length,'yinelenen seçenek');ok(s.why&&s.why.length>3);}
 ok(e.hint.length>10&&e.solution.length>=1);ok(/^Kurgusal olay: |^A |^B |^C |^K/.test(e.facts)||e.type==='kaynak');
 const all=K.grade(e,{steps:e.steps.map(s=>s.answer),typed:e.typed?(e.typed.answer==null?'kurulmadı':String(e.typed.answer)):''});eq(all.all,true,'tam doğru yanıt');eq(all.total,e.steps.length+(e.typed?1:0));
 const none=K.grade(e,{steps:e.steps.map(s=>(s.answer+1)%s.options.length),typed:'abc'});eq(none.correct,0,'hepsi yanlış');
 if(e.type==='kurulma'){nk++;const m=e.scenario.msgs;const o=m[0],g=m.find(x=>x.type==='geri'),k=m.find(x=>x.type==='kabul');const b=ref({t:o.t,d:o.d,deadline:o.deadline},g?{t:g.t,d:g.d,learned:false}:null,{t:k.t,d:k.d},null,24);
  eq(e.typed.answer,b.status==='kuruldu'?Math.floor(b.at/24)+1:null,'kurulma günü');eq(e.result,b.status);}
 if(e.type==='unsur'){const c=K.TORT_CASES.find(x=>e.facts.includes(x.facts));ok(c,'olay bulundu');const first=ORDER.find(k=>!c.a[k]);eq(e.steps[0].answer,first?ORDER.indexOf(first):5);}
 if(e.type==='sekil'){const need=/arsa/.test(e.facts)?2:/kefil|bağışlayacağına/.test(e.facts)?1:0;eq(e.steps[0].answer,need,e.facts);}}
for(const lv of[1,2,3])eq(seen[lv].size,2,'seviye '+lv+' türleri');ok(nk>=40,'kurulma olayı sayısı');
ok(JSON.stringify(K.exercise(2,1,0))!==JSON.stringify(K.exercise(2,2,0))||JSON.stringify(K.exercise(2,1,1))!==JSON.stringify(K.exercise(2,2,1)));
eq(K.exercise(9,0,-3).level,1);eq(K.exercise(1,'abc',0).seed,1);
// Kısmi puan: adımlar ayrı sayılır.
{const e=K.exercise(3,1,2);const g=K.grade(e,{steps:e.steps.map((s,i)=>i===0?s.answer:(s.answer+1)%s.options.length),typed:'abc'});eq(g.correct,1);eq(g.total,e.steps.length+(e.typed?1:0));}

// 9. Veri bankaları ve kurallar.
ok(K.MISTAKES.length>=5);for(const m of K.MISTAKES){ok(m.bad>=0&&m.bad<m.wrong.length);ok(m.why.length>40&&m.right.length>40);}
const mt=K.MISTAKES.map(m=>m.title).join(' ');for(const w of['yazılı','Vitrin','Sessizlik','Her zarar','İmza'])ok(mt.includes(w),'yaygın hata: '+w);
ok(/m\. 8\/2/.test(K.MISTAKES.find(m=>/Vitrin/.test(m.title)).right),'vitrin hatası m. 8/2 ile düzeltilir');
for(const c of K.REL_CASES){ok(['A','B'].includes(c.alacakli)&&['verme','yapma','yapmama'].includes(c.edim)&&['sozlesme','haksiz','sebepsiz'].includes(c.kaynak));}
eq(new Set(K.REL_CASES.map(c=>c.kaynak)).size,3);eq(new Set(K.REL_CASES.map(c=>c.edim)).size,3);
for(const c of K.NULL_CASES)ok(c.a in K.NULL_OPTS&&/m\. 2[67]|m\. 12/.test(c.why));
eq(Object.isFrozen(K),true);
// Sayfa metni: sakin not, kurgusal etiket, “hazırlanıyor” düz metin, tarihli kaynak, başlık uzunluğu.
ok(html.includes('Bu sayfa hukuki danışmanlık değildir; somut bir durum için bir avukata ya da baro adli yardım bürosuna başvurun.'),'sakin not');
ok(html.includes('13 Kasım 2026’da mevzuat.gov.tr’deki metninden')||html.includes('13 Kasım 2026’da okunan metin'),'tarihli sürüm');
const title=html.match(/<title>([^<]*)<\/title>/)[1];ok(title.length<=80,'başlık '+title.length);
for(const h of['roma-hukuku','oyun-kurami','mikro-ekonomi-ve-uretim-faktorleri','isletme-bilimi-ve-yonetim'])ok(html.includes(`href="${h}.html"`),h);
for(const h of['hukuka-giris','anayasa-hukuku-ve-temel-haklar','ceza-hukukunun-genel-ilkeleri','hukuk-felsefesi'])ok(html.includes(`href="${h}.html"`),'hukuk sayfasına bağlantı: '+h);
ok((html.match(/\(hazırlanıyor\)/g)||[]).length===0);
ok(!/[̀-ͯ]/.test(html),'birleşik işaret yok');ok(!/[\u{1F300}-\u{1FAFF}☀-➿]/u.test(html),'emoji yok');
console.log(`Borçlar ve sözleşme hukuku: ${checks.toLocaleString('tr-TR')} TBK metni, olay motoru, rastgele karşılaştırma, haksız fiil, irade, ifa, oyun ağacı, etkin ihlal, ayrıştırıcı ve üreteç kontrolü PASS`);

if(process.argv.includes('--browser')){
 const {chromium}=await import('playwright');const {createServer}=await import('node:http');const {join,extname}=await import('node:path');const {fileURLToPath}=await import('node:url');const root=fileURLToPath(new URL('../',import.meta.url));
 const server=createServer((req,res)=>{const file=join(root,decodeURIComponent(new URL(req.url,'http://localhost').pathname));if(!fs.existsSync(file)||fs.statSync(file).isDirectory()){res.writeHead(404).end();return;}res.setHeader('Content-Type',({'.html':'text/html; charset=utf-8','.js':'text/javascript; charset=utf-8','.css':'text/css; charset=utf-8'})[extname(file)]||'application/octet-stream');res.end(fs.readFileSync(file));});
 await new Promise(r=>server.listen(0,'127.0.0.1',r));let browser;const before=checks;
 const digestExists=fs.existsSync(new URL(`../shared/digest/${SLUG}.js`,import.meta.url));
 try{browser=await chromium.launch();
  for(const[width,theme]of[[390,'light'],[1280,'dark']]){const page=await browser.newPage({viewport:{width,height:900}});await page.addInitScript(t=>{localStorage.setItem('acelya-theme',t);localStorage.setItem('acelya-sound-muted','1');},theme);page.setDefaultTimeout(5000);const errors=[];page.on('pageerror',e=>errors.push(e.message));page.on('console',m=>{if(m.type()==='error'&&!(!digestExists&&/404|Failed to load resource/.test(m.text())))errors.push(m.text());});
   await page.goto(`http://127.0.0.1:${server.address().port}/${SLUG}.html`);
   if(digestExists){await page.waitForSelector('section.digest',{state:'visible',timeout:15000});ok(true);}
   const text=id=>page.locator('#'+id).textContent(),has=async(id,t)=>{const x=await text(id);assert(x.includes(t),id+': '+x+' / '+t);checks++;},click=id=>page.locator('#'+id).click();
   // 01
   await has('relTitle','1 / 6');await page.locator('#relAlacakli').selectOption('B');await page.locator('#relEdim').selectOption('verme');await page.locator('#relKaynak').selectOption('haksiz');await click('relCheck');await has('relScore','2 / 3');await has('relResult','doğrusu sözleşme');
   await click('relNext');await click('relCheck');await has('relStatus','Önce üç sorunun');await page.locator('#relCase').selectOption('4');await has('relTitle','5 / 6');await click('borcReset');await has('relTitle','1 / 6');await has('relDone','0 / 6');
   // 02 varsayılan olay: geç ulaşan geri alma
   await click('tab-kurulma');await has('fmResult','Sözleşme kuruldu');await has('fmAt','5. gün 14.00');await has('fmEff','3. gün 14.00');await has('fmParties','A → B');await has('fmSteps','Geri alma geç');
   eq(await page.locator('#fmSvg line').count()>5,true);
   await page.locator('#fmThink').fill('0');await has('fmResult','kurulmadı');await has('fmThinkOut','anında');await page.locator('#fmThink').fill('24');await has('fmResult','kuruldu');
   for(const[id,res,extra]of[['telefon','kuruldu','1. gün 10.00'],['dusuneyim','kurulmadı','hemen kabul edilmedi'],['sureli','kurulmadı','süre doldu'],['geri-once','kurulmadı','yapılmamış sayılır'],['posta-gecikti','kuruldu','m. 5/3'],['posta-bildirim','kurulmadı','hemen'],['vitrin','kuruldu','m. 8/2'],['kayitli','kuruldu','öneriye davet'],['tasinmaz','geçersiz','m. 237/1'],['ortulu','kuruldu','m. 6'],['karsi','kuruldu','B → A']]){await page.locator('#fmPreset').selectOption(id);await has('fmResult',res);const all=(await text('fmSteps'))+(await text('fmParties'))+(await text('fmAt'));assert(all.includes(extra),id+': '+extra+' / '+all);checks++;}
   await page.locator('#fmPreset').selectOption('tasinmaz');await has('fmEff','—');await page.locator('#fmForm').selectOption('resmi');await has('fmResult','Sözleşme kuruldu');await page.locator('#fmContract').selectOption('tasinir');await page.locator('#fmForm').selectOption('yok');await has('fmResult','Sözleşme kuruldu');
   // kendi olayın: öneri + kabul
   await page.locator('#fmPreset').selectOption('vitrin');await page.locator('#fmPreset').selectOption('');await has('fmEvents','Henüz açıklama yok');await has('fmResult','kurulmadı');
   await page.locator('#fmPreset').selectOption('telefon');await click('evClear');await has('fmEvents','Henüz açıklama yok');await has('fmTitle','kendi olayın');
   await page.locator('#fmPreset').selectOption('');for(let i=0;i<4;i++)await click('evUndo');await has('fmEvents','Henüz açıklama yok');await has('fmResult','kurulmadı');
   await page.locator('#evWho').selectOption('A');await page.locator('#evType').selectOption('oneri');await page.locator('#evDay').selectOption('1');await page.locator('#evHour').selectOption('9');await page.locator('#evDelay').selectOption('24');await page.locator('#evDeadline').selectOption(String(H(3,17)));await click('evAdd');
   await page.locator('#evWho').selectOption('B');await page.locator('#evType').selectOption('kabul');eq(await page.locator('#evOfferFields').isHidden(),true);await page.locator('#evDay').selectOption('3');await page.locator('#evHour').selectOption('9');await page.locator('#evDelay').selectOption('1');await click('evAdd');
   await has('fmResult','Sözleşme kuruldu');await has('fmAt','3. gün 10.00');await has('fmEff','3. gün 09.00');await has('fmEvents','süre sonu 3. gün 17.00');
   await page.locator('#evDelay').selectOption('24');await click('evUndo');await click('evAdd');await has('fmResult','kurulmadı');await has('fmSteps','süre doldu');
   await page.locator('#evType').selectOption('geri');eq(await page.locator('#evLearnedWrap').isVisible(),true);
   // irade
   await has('irResult','İrade bozukluğu yok');await page.locator('#irAldatma').selectOption('1');await has('irResult','Aldatma');await page.locator('#irTehdit').selectOption('1');await has('irResult','Korkutma');await click('irReset');await page.locator('#irOran').selectOption('1');await has('irResult','Aşırı yararlanma');await has('irResult','beş yıl');
   await click('kurulmaReset');await has('fmAt','5. gün 14.00');await has('irResult','İrade bozukluğu yok');
   // 03
   await click('tab-ifa');await page.locator('#nlOpts button[data-a="hukumsuz"]').click();await has('nlFeedback','Doğru');await has('nlScore','1');await click('nlNext');await page.locator('#nlOpts button[data-a="gecerli"]').click();await has('nlFeedback','Doğru yanıt: Kesin hükümsüz');await has('nlDone','2 / 5');
   await has('iyResult','m. 89/1-1');await page.locator('#iyKind').selectOption('parca');await has('iyResult','bulunduğu yer');await page.locator('#iyAgreed').selectOption('1');await has('iyResult','kararlaştırılan');
   await has('tmResult','seçimlik');await page.locator('#tmIhtar').selectOption('0');await has('tmResult','temerrütte değil');await page.locator('#tmGun').selectOption('1');await has('tmSteps','m. 117/2');await page.locator('#tmSure').selectOption('yok');await has('tmResult','gecikme tazminatı');await page.locator('#tmMuaccel').selectOption('0');await has('tmResult','temerrütte değil');
   await click('ifaReset');await has('nlDone','0 / 5');await has('iyResult','m. 89/1-1');await has('tmResult','seçimlik');
   // 04
   await click('tab-haksiz');await has('htTitle','1 / 10');for(let i=0;i<5;i++)await click('htYes');await has('htConclusion','m. 49/1');await has('htScore','5 / 5');await has('htCount','1 / 10');
   await page.locator('#htCase').selectOption('1');await click('htYes');await click('htYes');await has('htDone','haklı savunma');await has('htConclusion','Hukuka aykırılık yok');eq(await page.locator('#htAsk').isHidden(),true);await has('htScore','6 / 7');
   await page.locator('#htCase').selectOption('5');for(let i=0;i<4;i++)await click('htYes');await click('htNo');await has('htConclusion','m. 67');await has('htConclusion','mahkemenin');
   await click('htRestart');eq(await page.locator('#htDone li').count(),0);await click('haksizReset');await has('htScore','0 / 0');await has('htCount','0 / 10');
   // 05
   await click('tab-iktisat');await has('tgBuyer','Ödemez');await has('tgWelfare','0 / 90 TL');await click('tgCourt');await has('tgBuyer','Öder');await has('tgPay','40 / 50 TL');await has('tgWelfare','90 / 90 TL');await page.locator('#tgQ').fill('35');await has('tgStatus','52,5 TL');await has('tgSeller','göndermez');await page.locator('#tgQ').fill('40');await has('tgStatus','60 TL');await has('tgBuyer','Öder');await click('tgNoCourt');await has('tgSeller','göndermez');
   await has('ebBody','1450');await has('ebBody','1300');await has('ebStatus','aynen ifa ve yeniden pazarlık');await page.locator('#ebB').fill('1000');await has('ebBody','Bozmak S’ye kazandırmaz');await has('ebStatus','ifa');await page.locator('#ebB').fill('1500');await page.locator('#ebNeg').fill('25');await has('ebBody','1137,5');await has('ebBody','337,5');
   await click('iktisatReset');await has('ebBody','1450');await has('tgWelfare','0 / 90 TL');
   // 06 alıştırma: seviye 1 tohum 1 olay 1 doğru yanıtlarla
   await click('tab-alistirma');await has('exHead','Seviye 1 · olay 1');const e0=K.exercise(1,1,0);await has('exFacts',e0.facts.replace(/^Kurgusal olay: /,'').slice(0,40));
   for(let i=0;i<e0.steps.length;i++)await page.locator('#exSteps .bs-exstep').nth(i).locator('button').nth(e0.steps[i].answer).click();await click('exCheck');await has('exFeedback','Bütün adımlar doğru');await has('exScore',`${e0.steps.length} / ${e0.steps.length}`);
   await click('exCheck');await has('exFeedback','denetlendi');
   await page.locator('#exLevel').selectOption('2');let e2=null,n2=0;for(;n2<10;n2++){const e=K.exercise(2,1,n2);if(e.type==='kurulma'){e2=e;break;}await click('exNew');}
   assert(e2,'kurulma olayı');await has('exHead','olay '+(n2+1));for(let i=0;i<e2.steps.length;i++)await page.locator('#exSteps .bs-exstep').nth(i).locator('button').nth(e2.steps[i].answer).click();
   await page.locator('#exTyped').fill('abc');await click('exCheck');await has('exFeedback','okunamadı');await page.locator('#exTyped').fill('3,5');await click('exCheck');await has('exFeedback','tam sayı');
   await page.locator('#exTyped').fill(e2.typed.answer==null?'KURULMADI.':e2.typed.answer+'. gün');await page.locator('#exTyped').press('Enter');await has('exFeedback','Bütün adımlar doğru');await has('exScore',`${3+e2.steps.length+1} / ${3+e2.steps.length+1}`);
   await click('exHint');await has('exHintBox','İpucu');await click('exNew');await click('exSolve');await has('exFeedback','denenmiş sayıldı');eq(await page.locator('#exSolution').isVisible(),true);
   await page.locator('#exSeed').fill('abc');await page.locator('#exSeed').dispatchEvent('change');await has('exFeedback','Tohum 1 ile 999');
   eq(await page.locator('#mkList details').count(),K.MISTAKES.length);await page.locator('#mkList summary').nth(1).click();await has('mkList','m. 8/2');
   await click('alistirmaReset');await has('exScore','0 / 0');await has('exHead','Seviye 1 · olay 1');
   // R tuşu ve sekme klavyesi
   await click('tab-kurulma');await page.locator('#fmPreset').selectOption('telefon');await page.locator('#tab-kurulma').focus();await page.keyboard.press('r');await has('fmAt','5. gün 14.00');
   await page.locator('#tab-borc').focus();await page.keyboard.press('End');eq(await page.locator('#tab-alistirma').getAttribute('aria-selected'),'true');await page.keyboard.press('ArrowRight');eq(await page.locator('#tab-borc').getAttribute('aria-selected'),'true');await page.keyboard.press('ArrowLeft');eq(await page.locator('#tab-alistirma').getAttribute('aria-selected'),'true');await page.keyboard.press('Home');eq(await page.locator('#tab-borc').getAttribute('aria-selected'),'true');
   eq(await page.evaluate(()=>[...document.querySelectorAll('main input,main select')].filter(e=>!e.closest('.digest')).every(e=>document.querySelector('label[for="'+e.id+'"]'))),true,'etiketsiz denetim');
   for(const t of['borc','kurulma','ifa','haksiz','iktisat','alistirma']){await click('tab-'+t);eq(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),true,'taşma '+t+' '+width);}
   eq(await page.evaluate(()=>Object.isFrozen(BorclarHukuku)&&!Object.getOwnPropertyDescriptor(window,'BorclarHukuku').writable),true);
   ok((await page.title()).length<=80);await has('calmNote','baro adli yardım bürosuna');
   assert.deepEqual(errors,[]);checks++;await page.close();}
  console.log(`Borçlar ve sözleşme hukuku: ${checks-before} tarayıcı kontrolü (390 açık, 1280 koyu) PASS`);
 }finally{await browser?.close();await new Promise(r=>server.close(r));}
}
