// Türkçe dilbilgisinin temelleri: ek dizicisi, çekim tabloları, soru eki, veri bankaları ve alıştırma üreteci için kalıcı denetim.
// Başvurular sayfanın kurallarını kullanmaz: TDK yazım kuralları sayfalarındaki örnekler (ek-fiil, ünlü daralması, soru eki,
// bağlaç da/de, bulunma eki), Wikipedia "Turkish grammar" (olumsuz geniş zaman), elle yazılmış çekim tabloları,
// 13 Kasım 2026'da TDK Güncel Türkçe Sözlük'te tek tek aranıp bulunan türev listesi ve küme tabanlı bağımsız bir uyum denetleyicisi.
import fs from 'node:fs';
import vm from 'node:vm';
import assert from 'node:assert/strict';
const SLUG='turkce-dilbilgisinin-temelleri';
const html=fs.readFileSync(new URL(`../${SLUG}.html`,import.meta.url),'utf8');
const source=html.split('/* KERNEL-BEGIN */')[1]?.split('/* KERNEL-END */')[0];
assert(source,'Çekirdek sınırları gerekli');
const context={window:{}};vm.createContext(context);vm.runInContext(source,context);
const K=context.window.TurkceDilbilgisi;let checks=0;
const eq=(a,b,msg)=>{assert.equal(a,b,String(msg??`${a} ≠ ${b}`));checks++;};
const ok=(c,msg)=>{assert(c,msg);checks++;};
const F=(w,p,k)=>K.form(w,p,k);

// 1. TDK sayfalarındaki tam biçimler.
const TDK=[
 // Ek-fiilin Yazılışı
 ['yorgun','isim',['C_DI'],'yorgundu'],['güzel','isim',['C_MIS'],'güzelmiş'],['gel','fiil',['AOR','C_SA'],'gelirse'],['sonuncu','isim',['C_DI'],'sonuncuydu'],['yabancı','isim',['C_MIS'],'yabancıymış'],['ne','isim',['C_SA'],'neyse'],
 ['başla','fiil',['FUT','C_KEN'],'başlayacakken'],['çalış','fiil',['PROG','C_KEN'],'çalışıyorken'],['durgun','isim',['C_KEN'],'durgunken'],['oku','fiil',['AOR','C_KEN'],'okurken'],['olgun','isim',['C_KEN'],'olgunken'],['uyu','fiil',['AOR','C_KEN'],'uyurken'],['yaz','fiil',['AOR','C_KEN'],'yazarken'],['gel','fiil',['PROG','C_KEN'],'geliyorken'],['gül','fiil',['EV','C_KEN'],'gülmüşken'],['öğretmen','isim',['C_KEN'],'öğretmenken'],
 ['ev','isim',['LOC','C_KEN'],'evdeyken'],['okul','isim',['LOC','C_KEN'],'okuldayken'],['oku','fiil',['F_MAK','LOC','C_KEN'],'okumaktayken'],['yol','isim',['LOC','C_KEN'],'yoldayken'],
 // Ünlü Daralması
 ['başla','fiil',['PROG'],'başlıyor'],['oyna','fiil',['PROG'],'oynuyor'],['doy','fiil',['NEG','PROG'],'doymuyor'],['izle','fiil',['PROG'],'izliyor'],['de','fiil',['PROG'],'diyor'],['gel','fiil',['NEG','PROG'],'gelmiyor'],['göz','isim',['Y_LA','PROG'],'gözlüyor'],
 ['başla','fiil',['F_AN'],'başlayan'],['yaşa','fiil',['F_ACAK'],'yaşayacak'],['atla','fiil',['F_ARAK'],'atlayarak'],['sakla','fiil',['F_ALI'],'saklayalı'],['at','fiil',['NEG','OPT','PS1P'],'atmayalım'],['gel','fiil',['NEG','F_AN'],'gelmeyen'],['izle','fiil',['NEG','F_ACAK'],'izlemeyecek'],['git','fiil',['NEG','F_ARAK'],'gitmeyerek'],['gizle','fiil',['F_ALI'],'gizleyeli'],['besle','fiil',['OPT','PS1P'],'besleyelim'],
 ['de','fiil',['F_AN'],'diyen'],['de','fiil',['F_ARAK'],'diyerek'],['de','fiil',['F_ACAK'],'diyecek'],['de','fiil',['OPT','PS1P'],'diyelim'],['de','fiil',['OPT'],'diye'],['ye','fiil',['F_AN'],'yiyen'],['ye','fiil',['F_ARAK'],'yiyerek'],['ye','fiil',['F_ACAK'],'yiyecek'],['ye','fiil',['OPT','PS1P'],'yiyelim'],['ye','fiil',['OPT'],'yiye'],['ye','fiil',['F_INCA'],'yiyince'],['ye','fiil',['F_IP'],'yiyip'],['de','fiil',['F_INCA'],'deyince'],['de','fiil',['F_IP'],'deyip'],['de','fiil',['IMP2P'],'deyin'],['ye','fiil',['IMP2P'],'yiyin'],
 // Bulunma Durumu Eki
 ['deve','isim',['LOC'],'devede'],['yol','isim',['LOC'],'yolda'],['ayak','isim',['LOC'],'ayakta'],['iş','isim',['LOC'],'işte'],
 // Wikipedia: olumsuz geniş zaman
 ['gel','fiil',['NEG','AOR','PS1S'],'gelmem'],['gel','fiil',['NEG','AOR','PS1P'],'gelmeyiz'],['gel','fiil',['NEG','AOR'],'gelmez'],
 // TDK madde başı ekleri (Güncel Türkçe Sözlük): kitap -bı, su -yu, burun -rnu, hak -kkı, saat -ti, kalp -bi, renk -gi, millet (eksiz), ağaç -cı, oğul -ğlu
 ['kitap','isim',['ACC'],'kitabı'],['su','isim',['P3S'],'suyu'],['burun','isim',['P3S'],'burnu'],['hak','isim',['ACC'],'hakkı'],['saat','isim',['ACC'],'saati'],['saat','isim',['DAT'],'saate'],['kalp','isim',['ACC'],'kalbi'],['renk','isim',['ACC'],'rengi'],['millet','isim',['ACC'],'milleti'],['ağaç','isim',['ACC'],'ağacı'],['oğul','isim',['P3S'],'oğlu']];
for(const[w,p,k,e]of TDK)eq(F(w,p,k),e,w+' + '+k.join('+'));
for(const[w,k,e]of[['kaldı',[],'kaldı mı'],['olur',[],'olur mu'],['öldü',[],'öldü mü'],['verecek',['PS2S'],'verecek misin'],['okuyor',['PS1P'],'okuyor muyuz'],['çocuk',['PS1S'],'çocuk muyum'],['gelecek',['C_DI'],'gelecek miydi'],['güler',['PS2S'],'güler misin'],['ağlar',['PS2S'],'ağlar mısın']])eq(K.soru(w,k),e,'soru '+w);
eq(K.daDe('kızı'),'da');eq(K.daDe('gelini'),'de');eq(K.daDe('gidip'),'de');

// 2. Elle yazılmış tablolar.
const PARA={
 'gel|PROG':'geliyorum geliyorsun geliyor geliyoruz geliyorsunuz geliyorlar','gel|PST':'geldim geldin geldi geldik geldiniz geldiler','gel|EV':'gelmişim gelmişsin gelmiş gelmişiz gelmişsiniz gelmişler','gel|FUT':'geleceğim geleceksin gelecek geleceğiz geleceksiniz gelecekler','gel|AOR':'gelirim gelirsin gelir geliriz gelirsiniz gelirler','gel|NEC':'gelmeliyim gelmelisin gelmeli gelmeliyiz gelmelisiniz gelmeliler','gel|OPT':'geleyim gelesin gele gelelim gelesiniz geleler','gel|COND':'gelsem gelsen gelse gelsek gelseniz gelseler',
 'gel|AOR|neg':'gelmem gelmezsin gelmez gelmeyiz gelmezsiniz gelmezler','gel|PROG|neg':'gelmiyorum gelmiyorsun gelmiyor gelmiyoruz gelmiyorsunuz gelmiyorlar','git|PROG':'gidiyorum gidiyorsun gidiyor gidiyoruz gidiyorsunuz gidiyorlar','git|AOR':'giderim gidersin gider gideriz gidersiniz giderler','oku|FUT':'okuyacağım okuyacaksın okuyacak okuyacağız okuyacaksınız okuyacaklar','de|FUT':'diyeceğim diyeceksin diyecek diyeceğiz diyeceksiniz diyecekler','al|AOR':'alırım alırsın alır alırız alırsınız alırlar','yap|AOR':'yaparım yaparsın yapar yaparız yaparsınız yaparlar','çalış|AOR':'çalışırım çalışırsın çalışır çalışırız çalışırsınız çalışırlar','başla|PROG':'başlıyorum başlıyorsun başlıyor başlıyoruz başlıyorsunuz başlıyorlar','söyle|PST':'söyledim söyledin söyledi söyledik söylediniz söylediler',
 'gel|PROG|C_DI':'geliyordum geliyordun geliyordu geliyorduk geliyordunuz geliyorlardı','gel|EV|C_DI':'gelmiştim gelmiştin gelmişti gelmiştik gelmiştiniz gelmişlerdi','gel|FUT|C_MIS':'gelecekmişim gelecekmişsin gelecekmiş gelecekmişiz gelecekmişsiniz geleceklermiş','gel|AOR|C_SA':'gelirsem gelirsen gelirse gelirsek gelirseniz gelirlerse','gel|COND|C_DI':'gelseydim gelseydin gelseydi gelseydik gelseydiniz gelselerdi','gel|NEC|C_DI':'gelmeliydim gelmeliydin gelmeliydi gelmeliydik gelmeliydiniz gelmelilerdi',
 'gel|IMP':'- gel gelsin - gelin gelsinler','gel|IMP|neg':'- gelme gelmesin - gelmeyin gelmesinler'};
for(const[key,exp]of Object.entries(PARA)){const[v,kip,...rest]=key.split('|');const neg=rest.includes('neg'),cop=rest.find(x=>x.startsWith('C_'))||'';const r=K.conjugate(v,kip,{neg,cop});ok(r.ok,key);eq(r.rows.map(x=>x.form??'-').join(' '),exp,key);}
eq(K.conjugate('gel','PROG',{cop:'C_DI'}).rows[5].alt,'geliyordular');eq(K.conjugate('gel','IMP').rows[4].alt,'geliniz');
for(const[k,c]of[['PST','C_MIS'],['EV','C_MIS'],['IMP','C_DI'],['OPT','C_DI']])eq(K.conjugate('gel',k,{cop:c}).ok,false,k+'+'+c);
const NT={kitap:[['kitap','kitaplar','kitabım','kitabı'],['kitabı','kitapları','kitabımı','kitabını'],['kitaba','kitaplara','kitabıma','kitabına'],['kitapta','kitaplarda','kitabımda','kitabında'],['kitaptan','kitaplardan','kitabımdan','kitabından'],['kitabın','kitapların','kitabımın','kitabının'],['kitapla','kitaplarla','kitabımla','kitabıyla']],
 su:[['su','sular','suyum','suyu'],['suyu','suları','suyumu','suyunu'],['suya','sulara','suyuma','suyuna'],['suda','sularda','suyumda','suyunda'],['sudan','sulardan','suyumdan','suyundan'],['suyun','suların','suyumun','suyunun'],['suyla','sularla','suyumla','suyuyla']],
 burun:[['burun','burunlar','burnum','burnu'],['burnu','burunları','burnumu','burnunu'],['burna','burunlara','burnuma','burnuna'],['burunda','burunlarda','burnumda','burnunda'],['burundan','burunlardan','burnumdan','burnundan'],['burnun','burunların','burnumun','burnunun'],['burunla','burunlarla','burnumla','burnuyla']],
 saat:[['saat','saatler','saatim','saati'],['saati','saatleri','saatimi','saatini'],['saate','saatlere','saatime','saatine'],['saatte','saatlerde','saatimde','saatinde'],['saatten','saatlerden','saatimden','saatinden'],['saatin','saatlerin','saatimin','saatinin'],['saatle','saatlerle','saatimle','saatiyle']],
 araba:[['araba','arabalar','arabam','arabası'],['arabayı','arabaları','arabamı','arabasını'],['arabaya','arabalara','arabama','arabasına'],['arabada','arabalarda','arabamda','arabasında'],['arabadan','arabalardan','arabamdan','arabasından'],['arabanın','arabaların','arabamın','arabasının'],['arabayla','arabalarla','arabamla','arabasıyla']]};
for(const[w,rows]of Object.entries(NT))eq(JSON.stringify(K.nounTable(w).map(r=>r.cells)),JSON.stringify(rows),'isim tablosu '+w);

// 3. Ek dizicisinin yapım türevleri: TDK sözlüğünde bulunan 126 madde (fiiller mastarıyla).
const TDK_DERIVED='gözlük gözlükçü gözcü gözlemek gözlem gözlemci gözlemlemek gözlü gözsüz kitapçı kitaplık kitapçık kitapsız işçi işçilik işlemek işlem işlemci işletmek işletme işletmeci işlenmek işsiz işsizlik sulu susuz susuzluk sulamak sulanmak sulak sucu yolcu yolculuk yollamak yollanmak yoldaş yolsuz yolsuzluk ağaçlık ağaçlanmak renkli renksiz renklenmek sözlük sözcü sözlü sözleşmek sözleşme başlamak başlatmak başlanmak başlık tuzlu tuzsuz tuzluk tuzlamak tuzlanmak yazı yazıcı yazar yazdırmak yazılmak yazışmak yazışma yazgı yazım sevgi sevgili sevgisiz sevilmek sevişmek sevdirmek sevinmek sevinç görüş görüşmek görüşme görülmek gördürmek görev görevli görünmek görüntü bilgi bilgili bilgisiz bilinmek bilinç bilinçli bildirmek bildiri bilim bilgin okul okur okuyucu okutmak okutturmak okunmak seçim seçmen seçici seçilmek seçkin ölüm ölümlü ölümsüz ölümsüzlük öldürmek gelir gelecek geliş gelinmek deyim deyiş denmek yemek yemiş alış alıcı alım alınmak alıntı gidiş gider gidilmek'.split(' ');
const got=new Set();for(const r of Object.keys(K.ATTESTED)){const pos=K.VERBS[r]?'fiil':'isim';for(const c of K.ATTESTED[r]){const p=c.split('>');for(let i=1;i<=p.length;i++){const d=K.derive(r,pos,p.slice(0,i));ok(d.ok,r+' '+p.slice(0,i));got.add(d.pos==='fiil'?d.form+(/[aıou][^aeıioöuü]*$/.test(d.form)?'mak':'mek'):d.form);}}}
eq(got.size,126);eq(JSON.stringify([...got].sort()),JSON.stringify([...TDK_DERIVED].sort()),'türev listesi');
// Sözlükte olmayan türev reddedilir; serbest kipte ses kuralları yine çalışır.
eq(K.derive('renk','isim',['Y_LIK']).ok,false);eq(K.form('renk','isim',['Y_LIK']),'renklik');

// 4. Sıra kuralı: her yapım eki her çekim ekinden sonra reddedilir; çekim ekleri sırayla kabul edilir.
const YAP_N=Object.keys(K.SFX).filter(k=>K.SFX[k].cls==='yapim'&&K.SFX[k].from==='isim'&&k!=='KI'),YAP_V=Object.keys(K.SFX).filter(k=>K.SFX[k].cls==='yapim'&&K.SFX[k].from==='fiil');
for(const c of['PL','P1S','P3S','ACC','LOC','GEN','INS'])for(const y of YAP_N){const r=K.derive('kitap','isim',[c,y],{free:true});eq(r.ok,false,c+'+'+y);ok(/yapım ekleri çekim eklerinden önce/.test(r.error),r.error);}
for(const c of[['NEG'],['PST'],['NEG','PROG']])for(const y of YAP_V){eq(K.derive('yaz','fiil',c.concat(y),{free:true}).ok,false,c+'+'+y);}
for(const bad of[['ACC','PL'],['LOC','P1S'],['P1S','PL'],['PL','P3P'],['C_DI','PL'],['C_DIR','PS1S']])eq(K.derive('kalem','isim',bad).ok,false,bad.join('+'));
for(const bad of[['PROG','NEG'],['PS1S'],['PST','PROG'],['PROG','PS1S','C_DI'],['F_IP','PL'],['NEG','F_MADAN'],['NEG','NEG']])eq(K.derive('gel','fiil',bad).ok,false,bad.join('+'));
eq(F('ev','isim',['LOC','KI','PL','ACC']),'evdekileri');eq(F('ev','isim',['LOC','KI','ACC']),'evdekini');eq(K.derive('ev','isim',['KI']).ok,false);
// Kişi eki -DIr'den önce gelir (doğrulayıcı): öğretmen-im-dir, gel-miş-im-dir, gel-miş-ler-dir; -DIr'den sonra kişi eki gelmez.
eq(F('öğretmen','isim',['PS1S','C_DIR']),'öğretmenimdir');eq(F('gel','fiil',['EV','PS1S','C_DIR']),'gelmişimdir');eq(F('gel','fiil',['EV','PS3P','C_DIR']),'gelmişlerdir');eq(K.derive('gel','fiil',['PST','PS1S','C_DIR']).ok,false);eq(K.derive('gel','fiil',['EV','PS1S','C_DIR','PS1S']).ok,false);
eq(F('kitap','isim',['Y_LIK','PL','P1P','LOC']),'kitaplıklarımızda');eq(F('gör','fiil',['V_RECIP','NEG','FUT','C_MIS','PS1P']),'görüşmeyecekmişiz');eq(F('oku','fiil',['F_DIK','P1S','ACC']),'okuduğumu');eq(F('iş','isim',['Y_LA','V_CAUS','Y_MA','Y_CI','PL','GEN']),'işletmecilerin');
// Sınıflar
const cls=(w,p,k)=>K.derive(w,p,k).segs.slice(1).map(s=>s.cls).join(',');
eq(cls('göz','isim',['Y_LIK','Y_CI','PL','ABL']),'yapim,yapim,cekim,cekim');eq(cls('oku','fiil',['F_DIK','P1S','ACC']),'fiilimsi,cekim,cekim');eq(cls('gel','fiil',['NEG','PST']),'cekim,cekim');
eq(K.derive('ye','fiil',['Y_MAK']).segs[1].cls,'yapim');eq(K.derive('ye','fiil',['F_MAK']).segs[1].cls,'fiilimsi');eq(F('ye','fiil',['Y_MAK']),F('ye','fiil',['F_MAK']));

// 5. Bağımsız uyum denetleyicisi: ince ek almayan adların bütün çekim biçimlerinde ek ünlüleri kökün son ünlüsüyle aynı kalınlıkta.
const BACK='aıou',FRONT='eiöü',V='aeıioöuü';
for(const w of['kitap','ev','araba','su','burun','hak','renk','ağaç','oğul','millet','çocuk','gün','kalem','kuş','dolap','sokak','köpek','kapı'])for(const row of K.nounTable(w))for(const c of row.cells){const rv=[...w].filter(x=>V.includes(x)).pop();const tail=c.slice(Math.max(0,w.length-2)).split('').filter(x=>V.includes(x));ok(tail.every(x=>BACK.includes(rv)?BACK.includes(x):FRONT.includes(x)),w+' → '+c);}
for(const v of['gel','oku','yaz','gör','iç','sev','koş','bul'])for(const k of['PST','EV','FUT','AOR','NEC','COND'])for(const row of K.conjugate(v,k).rows){const rv=[...v].filter(x=>V.includes(x)).pop();const tail=[...row.form.slice(v.length)].filter(x=>V.includes(x));ok(tail.every(x=>BACK.includes(rv)?BACK.includes(x):FRONT.includes(x)),row.form);}
// Ünsüz benzeşmesi: sert ünsüzden sonra d → t.
for(const w of['kitap','ağaç','iş','kuş','sokak','millet','kalp','his'])ok(/t[ae]$/.test(F(w,'isim',['LOC'])),w);for(const w of['ev','kalem','gün','yol','araba','burun'])ok(/d[ae]$/.test(F(w,'isim',['LOC'])),w);

// 6. Yanıt ayrıştırıcı.
const N=K.normalize;
eq(N('KİTABI'),'kitabı');eq(N('IŞIK'),'ışık');eq(N('Kitab-ı.'),'kitabı');eq(N('  Gelecek   misin? '),'gelecek misin');eq(N('İstanbul’da'),'istanbulda');eq(N('“Ben de geldim!”'),'ben de geldim');eq(N('kâğıt'),'kağıt');eq(N(''),'');
const exT={kind:'typed',answer:'kitabı',alts:[]};eq(K.grade(exT,'KİTABI').ok,true);eq(K.grade(exT,'Kitabı.').ok,true);eq(K.grade(exT,'kitabi').ok,false);eq(K.grade(exT,'kitabi').near,true);eq(K.grade(exT,'kitapı').near,undefined);eq(K.grade(exT,'   ').empty,true);
eq(K.grade({kind:'typed',answer:'gelecek misin',alts:[]},'GELECEK MİSİN?').ok,true);eq(K.grade({kind:'typed',answer:'gelecek misin',alts:[]},'gelecekmisin').ok,false);
eq(K.grade({kind:'choice',answer:1,options:['a','b'],explain:''},1).ok,true);eq(K.grade({kind:'choice',answer:1,options:['a','b'],explain:''},'0').ok,false);

// 7. Veri bankaları.
const TAGK=Object.keys(K.TAGS);ok(K.TAG_SENTENCES.length>=8);
for(const s of K.TAG_SENTENCES){eq(s.words.map(w=>w.w).join(' '),s.s);for(const w of s.words){ok(TAGK.includes(w.tag),w.w);ok(w.why.length>5,w.w);}}
const tagOf=t=>K.TAG_SENTENCES.flatMap(s=>s.words).filter(w=>K.normalize(w.w)===t).map(w=>w.tag);
eq(JSON.stringify([...new Set(tagOf('güzel'))].sort()),'["sifat","zarf"]');eq(JSON.stringify([...new Set(tagOf('hızlı'))].sort()),'["sifat","zarf"]');eq(JSON.stringify([...new Set(tagOf('çok'))].sort()),'["sifat","zarf"]');
eq(new Set(K.TAG_SENTENCES.flatMap(s=>s.words.map(w=>w.tag))).size,8,'sekiz türün hepsi');
const OK=Object.keys(K.OGE_LABELS);ok(K.OGE_SENTENCES.length>=10);
for(const s of K.OGE_SENTENCES){eq(s.chunks.filter(c=>c.o==='yuklem').length,1);for(const c of s.chunks)ok(OK.includes(c.o));for(const d of['yuklem','dizilis','anlam','yapi'])ok(s.type[d] in K.TYPE_LABELS[d],d);eq(s.type.dizilis,s.chunks[s.chunks.length-1].o==='yuklem'?'kuralli':'devrik');eq(s.type.anlam==='soru',s.end==='?');}
ok(new Set(K.OGE_SENTENCES.flatMap(s=>s.chunks.map(c=>c.o))).size===7,'yedi öğe türü');
for(const it of K.FM_ITEMS){ok(it.a in K.FM_LABELS);ok(it.s.includes('«'+it.w+'»'),it.s);}ok(new Set(K.FM_ITEMS.map(i=>i.a)).size===4);
for(const it of K.STRUCT_ITEMS)ok(it.a in K.TYPE_LABELS.yapi);ok(new Set(K.STRUCT_ITEMS.map(i=>i.a)).size===4);
ok(K.YAZIM.length>=12);for(const y of K.YAZIM){ok(y.ok!==y.bad);ok(K.normalize(y.ok).replace(/ /g,'')===K.normalize(y.bad).replace(/ /g,'')||/ta |ta$|da |d[ae] |’|'/.test(y.bad)||y.bad.includes('ağaçda'),y.ok);}
ok(K.MISTAKES.length>=5);for(const m of K.MISTAKES){ok(m.bad>=0&&m.bad<m.wrong.length);ok(m.why.length>40);}
eq(K.soru('gelecek',['PS2S']),'gelecek misin');eq(K.YAZIM.find(y=>y.ok.startsWith('Yarın gelecek')).ok,'Yarın '+K.soru('gelecek',['PS2S'])+'?');
eq(K.YAZIM.find(y=>y.ok.startsWith('Hazır')).ok,K.soru('hazır',['PS1P']).replace(/^h/,'H')+'?');
eq(K.YAZIM.find(y=>y.ok.startsWith('Kuş')).ok,'Kuş '+F('ağaç','isim',['LOC'])+' ötüyor.');

// 8. Alıştırma üreteci.
const seen={1:new Set(),2:new Set(),3:new Set()};
for(const lv of[1,2,3])for(let seed=1;seed<=40;seed++)for(let n=0;n<8;n++){const e=K.exercise(lv,seed,n),e2=K.exercise(lv,seed,n);eq(JSON.stringify(e),JSON.stringify(e2),'belirlenimci');seen[lv].add(e.type);ok(K.TYPES[lv].includes(e.type));
 if(e.kind==='typed'){eq(K.grade(e,e.answer).ok,true);eq(K.grade(e,e.answer.toLocaleUpperCase('tr-TR')+'.').ok,true);eq(K.grade(e,e.answer+'x').ok,false);ok(e.steps.length>=1&&e.hint.length>10);}
 else{ok(Number.isInteger(e.answer)&&e.answer>=0&&e.answer<e.options.length);eq(K.grade(e,e.answer).ok,true);eq(K.grade(e,(e.answer+1)%e.options.length).ok,false);}}
for(const lv of[1,2,3])eq(seen[lv].size,3,'seviye '+lv+' türleri');
ok(JSON.stringify(K.exercise(1,1,0))!==JSON.stringify(K.exercise(1,2,0))||JSON.stringify(K.exercise(1,1,1))!==JSON.stringify(K.exercise(1,2,1)),'tohum değişince soru değişir');
eq(K.exercise(9,0,-3).level,1);
eq(Object.isFrozen(K),true);
console.log(`Türkçe dilbilgisinin temelleri: ${checks.toLocaleString('tr-TR')} TDK örneği, tablo, türev, sıra, uyum, ayrıştırıcı, veri ve üreteç kontrolü PASS`);

if(process.argv.includes('--browser')){
 const {chromium}=await import('playwright');const {createServer}=await import('node:http');const {join,extname}=await import('node:path');const {fileURLToPath}=await import('node:url');const root=fileURLToPath(new URL('../',import.meta.url));
 const server=createServer((req,res)=>{const file=join(root,decodeURIComponent(new URL(req.url,'http://localhost').pathname));if(!fs.existsSync(file)||fs.statSync(file).isDirectory()){res.writeHead(404).end();return;}res.setHeader('Content-Type',({'.html':'text/html; charset=utf-8','.js':'text/javascript; charset=utf-8','.css':'text/css; charset=utf-8'})[extname(file)]||'application/octet-stream');res.end(fs.readFileSync(file));});
 await new Promise(r=>server.listen(0,'127.0.0.1',r));let browser;const before=checks;
 const digestExists=fs.existsSync(new URL(`../shared/digest/${SLUG}.js`,import.meta.url));
 try{browser=await chromium.launch();
  for(const[width,theme]of[[390,'light'],[1280,'dark']]){const page=await browser.newPage({viewport:{width,height:900}});await page.addInitScript(t=>{localStorage.setItem('acelya-theme',t);localStorage.setItem('acelya-sound-muted','1');},theme);page.setDefaultTimeout(5000);const errors=[];page.on('pageerror',e=>errors.push(e.message));page.on('console',m=>{if(m.type()==='error'&&!(!digestExists&&/404|Failed to load resource/.test(m.text())))errors.push(m.text());});
   await page.goto(`http://127.0.0.1:${server.address().port}/${SLUG}.html`);
   if(digestExists){await page.waitForSelector('section.digest',{state:'visible',timeout:15000});ok(true);}
   const text=id=>page.locator('#'+id).textContent(),has=async(id,t)=>{const x=await text(id);assert(x.includes(t),id+': '+x+' / '+t);checks++;},click=id=>page.locator('#'+id).click(),sfx=k=>page.locator(`#kbButtons button[data-k="${k}"]`).click();
   // 01 dizici
   await has('kbForm','kitaplıklarımızda');await has('kbCount','1 / 3 / 0');await has('kbTable','isimden isim yapım eki');await has('kbSteps','kitaplıklarımızda');
   await sfx('Y_CI');await has('kbStatus','yapım ekleri çekim eklerinden önce');await has('kbForm','kitaplıklarımızda');
   await click('kbUndo');await has('kbForm','kitaplıklarımız');await sfx('P3S').catch(()=>{});await has('kbStatus','Eklenemedi');
   await page.locator('#kbRoot').selectOption('burun|isim');await has('kbForm','burun');await has('kbAttested','dizicide kayıtlı başka türev yok');await sfx('Y_LIK');await has('kbStatus','sözlükte yerleşik bir sözcük değil');await sfx('P3S');await sfx('LOC');await has('kbForm','burnunda');await has('kbRules','ünlü düşmesi');await has('kbRules','zamir n’si');
   await page.locator('#kbRoot').selectOption('gör|fiil');await has('kbAttested','görev');await sfx('V_RECIP');await sfx('NEG');await sfx('FUT');await sfx('C_MIS');await sfx('PS1P');await has('kbForm','görüşmeyecekmişiz');await has('kbPos','çekimli fiil');
   await page.locator('#kbRoot').selectOption('oku|fiil');await sfx('F_IP');await has('kbPos','zarf');eq(await page.locator('#kbButtons button').count(),0);
   await page.locator('#kbPresets button',{hasText:'evdekiler'}).click();await has('kbForm','evdekiler');await page.locator('#kbPresets button',{hasText:'+ -lık'}).click();await has('kbStatus','Sıra kuralı');await has('kbForm','kitaplar');
   await page.locator('#kbPresets button',{hasText:'diyen'}).click();await has('kbSteps','de-, ye-');
   await click('kbReset');await has('kbForm','kitaplıklarımızda');
   // 02 sözcük türleri
   await click('tab-tur');await has('tgTitle','Cümle 1 / 10');for(const t of['sifat','isim','isim','sifat','fiil'])await page.locator(`#tgTags button[data-tag="${t}"]`).click();await click('tgCheck');await has('tgScore','4 / 5');await has('tgResult','fiili niteliyor');
   await page.locator('#tgWords button').nth(3).click();await page.locator('#tgTags button[data-tag="zarf"]').click();await click('tgCheck');await has('tgScore','5 / 5');await has('tgStatus','Hepsi doğru');
   await click('tgNext');await has('tgTitle','Cümle 2 / 10');await click('tgCheck');await has('tgStatus','Önce bütün sözcüklere');await click('tgShow');await has('tgScore','4 / 4');await has('tgDone','2 / 10');
   await page.locator('#tgSentence').selectOption('4');await has('tgTitle','Cümle 5');await click('turReset');await has('tgTitle','Cümle 1 / 10');await has('tgDone','0 / 10');
   // 03 çekim
   await click('tab-cekim');await has('ntBody','kitabında');await page.locator('#ntNoun').selectOption('su');await has('ntBody','suyum');await has('ntCaption','-yu');
   await has('vtBody','geliyorum');await page.locator('#vtKip').selectOption('AOR');await page.locator('#vtNeg').check();await has('vtBody','gelmem');await has('vtBody','gelmeyiz');await page.locator('#vtNeg').uncheck();
   await page.locator('#vtCop').selectOption('C_DI');await has('vtBody','gelirdim');await page.locator('#vtKip').selectOption('OPT');await has('vtStatus','seyrektir');await page.locator('#vtKip').selectOption('PST');await page.locator('#vtCop').selectOption('C_MIS');await has('vtStatus','Rivayet');
   await page.locator('#vtCop').selectOption('');await page.locator('#vtVerb').selectOption('de');await page.locator('#vtKip').selectOption('FUT');await has('vtBody','diyeceğim');await page.locator('#vtKip').selectOption('IMP');await has('vtBody','deyin');
   await has('fmCounter','Cümle 1 / 14');await page.locator('#fmOpts button[data-a="sifat"]').click();await has('fmScore','1');await has('fmFeedback','Doğru');eq(await page.locator('#fmOpts button[disabled]').count(),4);await click('fmNext');await page.locator('#fmOpts button[data-a="zarf"]').click();await has('fmFeedback','Doğru yanıt: İsim-fiil');await has('fmDone','2 / 14');
   await click('cekimReset');await has('fmDone','0 / 14');await has('vtBody','geliyorum');
   // 04 cümle
   await click('tab-cumle');await has('ogTitle','Cümle 1 / 13');for(const o of['ozne','zarf','yer','bnesne','yuklem'])await page.locator(`#ogLabels button[data-o="${o}"]`).click();
   await page.locator('#ogYuklem').selectOption('fiil');await page.locator('#ogDizilis').selectOption('kuralli');await page.locator('#ogAnlam').selectOption('olumlu');await page.locator('#ogYapi').selectOption('basit');await click('ogCheck');await has('ogScore','4 / 5');await has('ogTypeScore','4 / 4');await has('ogResult','Belirtme eki yok');
   await page.locator('#ogSentence').selectOption('7');await has('ogTitle','(soru)');await click('ogShow');await has('ogResult','Seslenme');await has('ogScore','4 / 4');
   await page.locator('#ctOpts button[data-a="basit"]').click();await has('ctScore','1');await click('ctNext');await page.locator('#ctOpts button[data-a="bagli"]').click();await has('ctFeedback','Doğru yanıt: Sıralı');await click('cumleReset');await has('ogTitle','Cümle 1 / 13');await has('ctDone','0 / 8');
   // 05 yazım ve alıştırma
   await click('tab-yazim');await has('yzCounter','Soru 1 / 15');await page.locator('#yzOpts button',{hasText:'Ben de geldim.'}).click();await has('yzScore','1');await click('yzNext');await page.locator('#yzOpts button',{hasText:'ev de'}).click();await has('yzFeedback','Doğrusu');await has('yzDone','2 / 15');
   // üretici: seviye 1 tohum 1 soruları sırayla; yazılı soruyu büyük harfle yanıtla
   let typed=null;for(let i=0;i<12&&!typed;i++){const ex=await page.evaluate(()=>{const q=document.getElementById('exHead').textContent;return q;});const lvl=1,seed=1,n=i;const e=K.exercise(lvl,seed,n);if(e.kind==='typed')typed=e;else await click('exNew');}
   assert(typed,'yazılı soru bulunamadı');await has('exQuestion',typed.prompt.replace(/[«»]/g,''));await page.locator('#exAnswer').fill(typed.answer.toLocaleUpperCase('tr-TR')+'.');await page.locator('#exAnswer').press('Enter');await has('exFeedback','Doğru');await has('exScore','1 / 1');
   await click('exHint');await has('exHintBox','İpucu');await click('exSolve');await has('exSteps',typed.answer);await click('exNew');
   await page.locator('#exLevel').selectOption('3');await has('exHead','Seviye 3 · soru 1');const e3=K.exercise(3,1,0);await has('exQuestion',e3.prompt.replace(/[«»]/g,''));if(e3.kind==='choice'){await page.locator('#exOpts button').nth(e3.answer).click();await has('exFeedback','Doğru');}else{await page.locator('#exAnswer').fill(e3.answer);await click('exCheck');await has('exFeedback','Doğru');}
   await page.locator('#exSeed').fill('abc');await page.locator('#exSeed').dispatchEvent('change');await has('exFeedback','Tohum 1 ile 999 999');
   eq(await page.locator('#mkList details').count(),K.MISTAKES.length);await page.locator('#mkList summary').first().click();await has('mkList','yanlış adım');
   await click('yazimReset');await has('exScore','0 / 0');await has('yzDone','0 / 15');
   // Çözümü göster soruyu denenmiş sayar; sonraki doğru yanıt puana eklenmez ve bu söylenir (doğrulayıcı).
   {const e0=K.exercise(1,1,0);eq(e0.kind,'choice');await click('exSolve');await has('exScore','0 / 1');await has('exFeedback','denenmiş sayıldı');await page.locator('#exOpts button').nth(e0.answer).click();await has('exFeedback','Puana sayılmadı');await has('exScore','0 / 1');await click('yazimReset');await has('exScore','0 / 0');}
   // TDK yazımı: dil bilgisi, söz dizimi, öge (doğrulayıcı).
   eq(await page.evaluate(()=>{const t=document.title+' '+[...document.querySelectorAll('main')].map(m=>m.textContent).join(' ');return /[Dd]ilbilgi|[Ss]özdizim|[öÖ]ğe/.test(t.replace(/[a-z-]*dilbilgisi[a-z-]*\.html/g,''));}),false,'TDK yazımı');ok((await page.title()).startsWith('Türkçe Dil Bilgisinin Temelleri'));
   // R tuşu ve sekme klavyesi
   await click('tab-kok');await page.locator('#kbRoot').selectOption('sev|fiil');await page.locator('#tab-kok').focus();await page.keyboard.press('r');await has('kbForm','kitaplıklarımızda');
   await page.locator('#tab-kok').focus();await page.keyboard.press('End');eq(await page.locator('#tab-yazim').getAttribute('aria-selected'),'true');await page.keyboard.press('ArrowRight');eq(await page.locator('#tab-kok').getAttribute('aria-selected'),'true');await page.keyboard.press('ArrowLeft');eq(await page.locator('#tab-yazim').getAttribute('aria-selected'),'true');await page.keyboard.press('Home');eq(await page.locator('#tab-kok').getAttribute('aria-selected'),'true');
   eq(await page.evaluate(()=>[...document.querySelectorAll('main input,main select')].filter(e=>!e.closest('.digest')).every(e=>document.querySelector('label[for="'+e.id+'"]'))),true,'etiketsiz denetim');
   for(const t of['kok','tur','cekim','cumle','yazim']){await click('tab-'+t);eq(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),true,'taşma '+t+' '+width);}
   eq(await page.evaluate(()=>!!document.querySelector('a[href="akademik-yazma-ve-kaynak-kullanimi.html"]')&&!/\(hazırlanıyor\)/.test(document.body.textContent)),true,'Akademik Yazma bağlantısı');
   eq(await page.evaluate(()=>Object.isFrozen(TurkceDilbilgisi)&&!Object.getOwnPropertyDescriptor(window,'TurkceDilbilgisi').writable),true);
   assert.deepEqual(errors,[]);checks++;await page.close();}
  console.log(`Türkçe dilbilgisinin temelleri: ${checks-before} tarayıcı kontrolü (390 açık, 1280 koyu) PASS`);
 }finally{await browser?.close();await new Promise(r=>server.close(r));}
}
