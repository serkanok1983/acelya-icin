// G · akademik-yazma-ve-kaynak-kullanimi: çekirdek, sayfanın kodunu yinelemeyen referanslarla sınanır.
// Atıf biçimleri İSNAD 2 kılavuzunun açılan sayfalarındaki resmî örneklerle birebir karşılaştırılır; örtüşme ölçüsü
// kendi n-gram sayımı ve kaba kuvvet en uzun ortak dizi ile; sıralama denetçisi bütün permütasyonların taranmasıyla.
// `--browser` gerçek arayüzü 390 px açık ve 1280 px koyu temada dener.
import fs from 'node:fs';
import assert from 'node:assert/strict';
const SLUG='akademik-yazma-ve-kaynak-kullanimi';
const html=fs.readFileSync(new URL(`../${SLUG}.html`,import.meta.url),'utf8');
const source=html.split('/* KERNEL-BEGIN */')[1]?.split('/* KERNEL-END */')[0];
assert(source,'Çekirdek sınır işaretleri gerekli');
const K=new Function('"use strict";'+source+';return YazmaLab;')();
let checks=0;
const eq=(a,b,msg)=>{assert.deepEqual(a,b,(msg||'eşitlik')+`: ${JSON.stringify(a)} ≠ ${JSON.stringify(b)}`);checks++;};
const ok=(c,msg)=>{assert(c,msg||'koşul sağlanmadı');checks++;};
ok(Object.isFrozen(K)&&Object.isFrozen(K.PASSAGES[0])&&Object.isFrozen(K.ORDER_TASKS[0].rules[0])&&Object.isFrozen(K.PRESETS[0].rec));

/* 1. Türkçe normalleştirme */
eq(K.normTR('İSTANBUL'),'istanbul');eq(K.normTR('IRMAK'),'ırmak');eq(K.normTR('Işık ılık'),'ışık ılık');eq(K.normTR('Kâğıt Hâlâ Mûsikî'),'kağıt hala musiki');
eq(K.tokenize('Fransa’dır, an\'aneperest!'),['fransadır','ananeperest']);eq(K.tokenize('  '),[]);eq(K.tokenize('ÇİĞDEM 1918.'),['çiğdem','1918']);
eq(K.normAns('  Ön   Baskı. '),'ön baskı');eq(K.normAns('AŞIRMA'),'aşırma');eq(K.normAns('İNTİHAL'),'intihal');

/* 2. Örtüşme: bağımsız referans */
const LOW=c=>({'I':'ı','İ':'i'}[c]??c.toLowerCase());
const refTok=s=>{let w='',out=[];for(const ch of Array.from(String(s)+' ')){let c=LOW(ch);c={'â':'a','î':'i','û':'u','ô':'o'}[c]??c;if('’\'`´ʼ'.includes(c))continue;if(/[a-zçğıöşü0-9]/.test(c))w+=c;else{if(w)out.push(w);w='';}}return out;};
const refQuote=s=>{const q=[];let rest='';let i=0;s=String(s);const pairs={'“':'”','"':'"','«':'»'};while(i<s.length){const c=s[i];if(pairs[c]){const j=s.indexOf(pairs[c],i+1);if(j>=0){q.push(s.slice(i+1,j));rest+=' ';i=j+1;continue;}}rest+=c;i++;}return{q,rest};};
const STOPS=new Set(K.STOP);
function refOverlap(src,para,k){const st=t=>k&&t.length>k?t.slice(0,k):t;const S=refTok(src).map(st);const{q,rest}=refQuote(para);const O=refTok(rest).map(st);
  const ng=(a,n)=>{const r=[];for(let i=0;i+n<=a.length;i++)r.push(a.slice(i,i+n).join('|'));return r;};
  const cont=O.filter(t=>!STOPS.has(t)&&!/^\d+$/.test(t));const uni=cont.length?cont.filter(t=>S.includes(t)).length/cont.length:0;
  const sb=ng(S,2),stt=ng(S,3),ob=ng(O,2),ot=ng(O,3);const bi=ob.length?ob.filter(g=>sb.includes(g)).length/ob.length:0;const tri=ot.length?ot.filter(g=>stt.includes(g)).length/ot.length:0;
  let run=0;for(let i=0;i<O.length;i++)for(let j=0;j<S.length;j++){let L=0;while(i+L<O.length&&j+L<S.length&&O[i+L]===S[j+L])L++;if(L>run)run=L;}
  const exact=q.map(x=>{const t=refTok(x).map(st);if(!t.length)return false;for(let j=0;j+t.length<=S.length;j++)if(t.every((v,m)=>S[j+m]===v))return true;return false;});
  return{uni,bi,tri,run,n:O.length,exact};}
const close=(a,b,m)=>ok(Math.abs(a-b)<1e-12,m+`: ${a} ≠ ${b}`);
let seed=7;const rnd=()=>{seed=(seed*1103515245+12345)%2147483648;return seed/2147483648;};
const samples=[];for(const P of K.PASSAGES){samples.push([P.text,P.text],[P.text,'']);for(const g of P.good)samples.push([P.text,g]);const keys=Object.keys(P.syn);for(let k=1;k<=keys.length;k++)samples.push([P.text,K.substitute(P.text,P.syn,keys.slice(0,k))]);
  samples.push([P.text,'Anlatıcıya göre “'+P.text.split(/(?<=\.)\s/)[0].replace(/\.$/,'')+'” '+P.cite+'.']);samples.push([P.text,'“Bu cümle kaynakta yok” dedi.']);
  const w=refTok(P.text);for(let r=0;r<40;r++){const a=[];const n=3+Math.floor(rnd()*25);let i=Math.floor(rnd()*w.length);for(let j=0;j<n;j++){if(rnd()<0.25)i=Math.floor(rnd()*w.length);a.push(rnd()<0.15?'yeni':w[i%w.length]);i++;}samples.push([P.text,a.join(' ')]);}}
for(const[s,p]of samples)for(const k of[0,5]){const o=K.overlap(s,p,k),r=refOverlap(s,p,k);close(o.uni,r.uni,'uni');close(o.bi,r.bi,'bi');close(o.tri,r.tri,'tri');eq(o.run,r.run,'run');eq(o.ownTokens,r.n);eq(o.quotes.map(x=>x.exact),r.exact);
  eq(o.markOwn.length,o.ownTokens);eq(o.markSrc.length,o.srcTokens);}
// Hazır örneklerin sınıfı; yamalı yazımda her sayıda değiştirmenin sınıfı
for(const P of K.PASSAGES){for(const g of P.good)for(const k of[0,5])eq(K.verdict(K.overlap(P.text,g,k)),'ok','iyi açımlama '+P.id);
  eq(K.verdict(K.overlap(P.text,P.text,0)),'verbatim');eq(K.verdict(K.overlap(P.text,P.text+' '+P.cite,0)),'verbatim');
  const keys=Object.keys(P.syn);for(let k=3;k<=6;k++)eq(K.verdict(K.overlap(P.text,K.substitute(P.text,P.syn,keys.slice(0,k)),0)),'patch','yamalı '+P.id+' '+k);
  eq(K.verdict(K.overlap(P.text,'Anlatıcıya göre “'+P.text.split(/(?<=\.)\s/)[0].replace(/\.$/,'')+'” '+P.cite+'.',0)),'quote');
  eq(K.verdict(K.overlap(P.text,'“Bu cümle kaynakta yok” dedi.',0)),'badquote');eq(K.verdict(K.overlap(P.text,'kısa',0)),'short');
  ok(P.died<1956&&/^https:\/\/tr\.wikisource\.org\/wiki\//.test(P.url));for(const k of Object.keys(P.syn))ok(P.text.includes(k),'eş anlamlı anahtarı metinde: '+k);}
ok(K.PASSAGES[0].text.startsWith('Dar kapısından başka aydınlık')&&K.PASSAGES[2].text.endsWith("memleket yine Fransa'dır."),'Vikikaynak metni');
eq(K.substitute('tek başına tek',{tek:'yalnız'},['tek']),'yalnız başına tek');eq(K.substitute('Bekardı. bekardı',{Bekardı:'Evli değildi'},['Bekardı']),'Evli değildi. bekardı');eq(K.substitute('tekrar tek',{tek:'yalnız'},['tek']),'tekrar yalnız');
// Eşikler sayfadaki açıklamayla uyumlu
eq([K.OV_TH.patchTri,K.OV_TH.patchRun,K.OV_TH.verbTri],[0.15,4,0.9]);ok(html.includes('%15’i ya da dört sözcüklük')&&html.includes('%90’ı ya da metnin dörtte üçünü'));eq([K.OV_TH.verbRun,K.OV_TH.verbShare],[8,0.75]);

/* 3. Sıralama denetçisi: bütün permütasyonlar, kendi kısıt yorumum */
const perms=a=>a.length<=1?[a]:a.flatMap((x,i)=>perms([...a.slice(0,i),...a.slice(i+1)]).map(p=>[x,...p]));
for(const T of K.ORDER_TASKS){const ids=T.items.map(x=>x.id);let valid=0;ok(T.items.every(x=>x.text.length>30&&x.role));
  for(const o of perms(ids)){const p=Object.fromEntries(o.map((x,i)=>[x,i]));const good=T.rules.every(r=>r.t==='first'?p[r.a]===0:r.t==='last'?p[r.a]===ids.length-1:r.t==='before'?p[r.a]<p[r.b]:p[r.b]-p[r.a]===1);if(good)valid++;eq(K.checkOrder(T,o).ok,good);}
  eq(K.countOrders(T),valid,T.id);ok(valid>=1);}
eq(K.ORDER_TASKS.map(T=>K.countOrders(T)),[3,1,1]);
{const T=K.ORDER_TASKS[0];eq(K.checkOrder(T,['A','B','C','D','E','F','G']).ok,true);eq(K.checkOrder(T,['A','B','E','F','C','D','G']).ok,true);eq(K.checkOrder(T,['A','B','C','E','D','F','G']).broken.length,1);eq(K.checkOrder(T,['A','B']).malformed,true);eq(K.checkOrder(T,['A','A','C','D','E','F','G']).malformed,true);
  eq(K.checkOrder(T,['G','F','E','D','C','B','A']).broken.length,8);}

/* 4. Atıf biçimleri: İSNAD 2 kılavuzunun resmî örnekleri (isnadsistemi.org, açıldı) */
const R=(o)=>Object.assign({authors:K.parseAuthors(o.authorsText||'')},o);
const F=(rec,page,lang)=>{const r=K.formatRef(R(rec),{page,lang:lang||'en'}).out;const m={};for(const s of K.STYLE_IDS){m[s]={};for(const[k,v]of Object.entries(r[s]))m[s][k]=K.marked(v);}return m;};
{const f=F({type:'book',authorsText:'Afet İnan',year:'2018',title:'Piri Reis’in Hayatı ve Eserleri',place:'Ankara',publisher:'Türk Tarih Kurumu'},'22');
  eq(f.isn.note,'Afet İnan, _Piri Reis’in Hayatı ve Eserleri_ (Ankara: Türk Tarih Kurumu, 2018), 22.');eq(f.ism.paren,'(İnan, 2018, 22)');eq(f.ism.bib,'İnan, Afet. _Piri Reis’in Hayatı ve Eserleri_. Ankara: Türk Tarih Kurumu, 2018.');
  eq(F({type:'book',authorsText:'İnan, Afet',year:'2018',title:'Piri Reis’in Hayatı ve Eserleri',place:'Ankara',publisher:'Türk Tarih Kurumu',edition:'2'},'34').isn.bib,'İnan, Afet. _Piri Reis’in Hayatı ve Eserleri_. Ankara: Türk Tarih Kurumu, 2. Basım, 2018.');
  eq(F({type:'book',authorsText:'İnan, Afet',year:'2018',title:'Piri Reis’in Hayatı ve Eserleri',shortTitle:'Piri Reis’in Hayatı ve Eserleri',place:'Ankara',publisher:'Türk Tarih Kurumu'},'34').isn.short,'İnan, _Piri Reis’in Hayatı ve Eserleri_, 34.');
  eq(F({type:'book',authorsText:'Fuat Sezgin',year:'1967',title:'Geschichte des arabischen Schrifttums',shortTitle:'GAS',place:'Leiden',publisher:'Brill'},'48').isn.short,'Sezgin, _GAS_, 48.');}
{const f=F({type:'book',authorsText:'Topaloğlu, Bekir\nÇelebi, İlyas',year:'2015',title:'Kelâm Terimleri Sözlüğü',place:'İstanbul',publisher:'İSAM Yayınları',edition:'4'},'55');
  eq(f.isn.note,'Bekir Topaloğlu – İlyas Çelebi, _Kelâm Terimleri Sözlüğü_ (İstanbul: İSAM Yayınları, 4. Basım, 2015), 55.');eq(f.isn.bib,'Topaloğlu, Bekir – Çelebi, İlyas. _Kelâm Terimleri Sözlüğü_. İstanbul: İSAM Yayınları, 4. Basım, 2015.');}
{const rec={type:'article',authorsText:'Adem Çiftci',year:'2015',month:'6',title:'İslam Ceza Hukukunda Suça Teşebbüsten Vazgeçme',shortTitle:'Suça Teşebbüsten Vazgeçme',journal:'Cumhuriyet İlahiyat Dergisi',volume:'19',issue:'1',pages:'23-46',doi:'10.18505/cuifd.48242'};const f=F(rec,'23');
  eq(f.isn.note,'Adem Çiftci, “İslam Ceza Hukukunda Suça Teşebbüsten Vazgeçme”, _Cumhuriyet İlahiyat Dergisi_ 19/1 (Haziran 2015), 23.');eq(f.isn.short,'Çiftci, “Suça Teşebbüsten Vazgeçme”, 23.');
  eq(f.isn.bib,'Çiftci, Adem. “İslam Ceza Hukukunda Suça Teşebbüsten Vazgeçme”. _Cumhuriyet İlahiyat Dergisi_ 19/1 (Haziran 2015), 23-46. https://doi.org/10.18505/cuifd.48242');eq(F(rec,'45-46').ism.paren,'(Çiftci, 2015, 45-46)');eq(F(rec,'45–46').ism.paren,'(Çiftci, 2015, 45-46)');}
{const T='Kelâm’ın Meşrûiyeti Sorunu: Ehl-i Sünnet Kelâmı ve Olgusal Gerçeklik Arasındaki İlişki';const f=F({type:'article',authorsText:'Galip Türcan',year:'2005',title:T,shortTitle:'Kelâm’ın Meşrûiyeti Sorunu',journal:'Marife',volume:'5',issue:'3',pages:'175-193'},'175-193');
  eq(f.isn.note,`Galip Türcan, “${T}”, _Marife_ 5/3 (2005), 175-193.`);eq(f.isn.bib,`Türcan, Galip. “${T}”. _Marife_ 5/3 (2005), 175-193.`);eq(F({type:'article',authorsText:'Galip Türcan',year:'2005',title:T,shortTitle:'Kelâm’ın Meşrûiyeti Sorunu',journal:'Marife',volume:'5',issue:'3'},'177').isn.short,'Türcan, “Kelâm’ın Meşrûiyeti Sorunu”, 177.');}
{const T='Reflection of Qāḍīzādelīs-Khalwatīs Tension on the Islamic Heresiography: Muṣṭafá Ibn Ibrāhīm and is Alphabetical Classifıcation of Sects';const rec={type:'article',authorsText:'Kalaycı, Mehmet\nEren, Muhammet Emin',year:'2018',title:T,journal:'Ilahiyat Studies',volume:'9',issue:'2',pages:'249-290',doi:'https://doi.org/10.12730/13091719.2018.92.182'};
  eq(F(rec,'281').ism.paren,'(Kalaycı – Eren, 2018, 281)');eq(F(rec,'249').isn.note,`Mehmet Kalaycı – Muhammet Emin Eren, “${T}”, _Ilahiyat Studies_ 9/2 (2018), 249.`);
  eq(F(rec,'').isn.bib,`Kalaycı, Mehmet – Eren, Muhammet Emin. “${T}”. _Ilahiyat Studies_ 9/2 (2018), 249-290. https://doi.org/10.12730/13091719.2018.92.182`);}
{const T='Dini Başa Çıkma, Şükür ve Hayat Memnuniyeti İlişkisi: Hastalar, Hasta Yakınları ve Hastane Çalışanları Üzerine Bir Araştırma';const rec={type:'article',authorsText:'Ayten, Ali\nBirinci, Ortak\nİkinci, Ortak',year:'2012',title:T,journal:'Dinbilimleri Akademik Araştırma Dergisi',volume:'12',issue:'2',pages:'45-79'};
  eq(F(rec,'55').ism.paren,'(Ayten vd., 2012, 55)');eq(F(rec,'').isn.bib,`Ayten, Ali vd. “${T}”. _Dinbilimleri Akademik Araştırma Dergisi_ 12/2 (2012), 45-79.`);eq(F(rec,'45-79').isn.note,`Ali Ayten vd., “${T}”, _Dinbilimleri Akademik Araştırma Dergisi_ 12/2 (2012), 45-79.`);}
{const rec={type:'web',authorsText:'',title:'Din İşleri Yüksel Kurulu Başkanlığı',site:'Diyanet İşleri Başkanlığı',siteAbbr:'DİB',url:'https://kurul.diyanet.gov.tr',accessed:{y:2017,m:5,d:1}};const f=F(rec,'');
  eq(f.isn.note,'Diyanet İşleri Başkanlığı (DİB), “Din İşleri Yüksel Kurulu Başkanlığı” (Erişim 1 Mayıs 2017).');eq(f.isn.short,'DİB, “Din İşleri Yüksel Kurulu Başkanlığı”.');
  eq(f.isn.bib,'DİB, Diyanet İşleri Başkanlığı. “Din İşleri Yüksel Kurulu Başkanlığı”. Erişim 1 Mayıs 2017. https://kurul.diyanet.gov.tr');eq(f.ism.paren,'(DİB, 1 Mayıs 2017)');
  eq(F({type:'web',title:'İSNAD Nedir?',site:'İSNAD Atıf Sistemi',siteAbbr:'İSNAD',url:'http://www.isnadsistemi.org',accessed:{y:2018,m:5,d:12}},'').isn.bib,'İSNAD, İSNAD Atıf Sistemi. “İSNAD Nedir?”. Erişim 12 Mayıs 2018. http://www.isnadsistemi.org');}
// İSNAD: eksik bilgi kısaltmaları (Genel İlkeler / Kaynakça örnekleri: b.y., y.y., ts.)
eq(F({type:'book',authorsText:'Ad Soyad',title:'Eser'},'3').isn.note,'Ad Soyad, _Eser_ (b.y.: y.y., ts.), 3.');ok(!/ s\. \d/.test(F({type:'book',authorsText:'Ad Soyad',year:'2000',title:'Eser',place:'X',publisher:'Y'},'7').isn.note),'İSNAD “s.” yazmaz');

/* 5. APA 7 ve Chicago 18: yaygın bilinen kalıplar (APA sayfaları bot korumasıyla açılamadı; elle yazılmış beklenen dizgiler) */
{const f=F(K.PRESETS[0].rec,'45');eq(f.apa.ref,'Demirci, S. (2021). _Kıyı Kentlerinde Su ve Bellek_ (2nd ed.). Örnek Yayınları.');eq(f.apa.paren,'(Demirci, 2021, p. 45)');eq(f.apa.narr,'Demirci (2021, p. 45)');
  eq(f.cnb.note,'Selin Demirci, _Kıyı Kentlerinde Su ve Bellek_, 2nd ed. (İzmir: Örnek Yayınları, 2021), 45.');eq(f.cnb.short,'Demirci, _Kıyı Kentlerinde Su_, 45.');eq(f.cnb.bib,'Demirci, Selin. _Kıyı Kentlerinde Su ve Bellek_. 2nd ed. İzmir: Örnek Yayınları, 2021.');
  eq(f.cad.paren,'(Demirci 2021, 45)');eq(f.cad.ref,'Demirci, Selin. 2021. _Kıyı Kentlerinde Su ve Bellek_. 2nd ed. İzmir: Örnek Yayınları.');
  const t=F(K.PRESETS[0].rec,'45','tr');eq(t.apa.ref,'Demirci, S. (2021). _Kıyı Kentlerinde Su ve Bellek_ (2. bs.). Örnek Yayınları.');eq(t.apa.paren,'(Demirci, 2021, s. 45)');eq(t.isn,f.isn,'İSNAD dil seçeneğinden etkilenmez');}
{const f=F(K.PRESETS[1].rec,'220');eq(f.apa.ref,'Aksoy, M., & Yalın, D. (2019). Lise öğrencilerinde kaynak gösterme alışkanlığı: Bir sınıf içi deneme. _Örnek Eğitim Araştırmaları Dergisi, 12_(3), 211–230. https://doi.org/10.5555/ornek.2019.03');
  eq(f.apa.paren,'(Aksoy & Yalın, 2019, p. 220)');eq(f.apa.narr,'Aksoy and Yalın (2019, p. 220)');eq(F(K.PRESETS[1].rec,'220','tr').apa.narr,'Aksoy ve Yalın (2019, s. 220)');
  eq(f.cnb.note,'Mert Aksoy and Deniz Yalın, “Lise öğrencilerinde kaynak gösterme alışkanlığı: Bir sınıf içi deneme,” _Örnek Eğitim Araştırmaları Dergisi_ 12, no. 3 (June 2019): 220, https://doi.org/10.5555/ornek.2019.03.');
  eq(f.cnb.short,'Aksoy and Yalın, “Kaynak gösterme alışkanlığı,” 220.');eq(f.cnb.bib,'Aksoy, Mert, and Deniz Yalın. “Lise öğrencilerinde kaynak gösterme alışkanlığı: Bir sınıf içi deneme.” _Örnek Eğitim Araştırmaları Dergisi_ 12, no. 3 (June 2019): 211–230. https://doi.org/10.5555/ornek.2019.03.');
  eq(f.cad.ref,'Aksoy, Mert, and Deniz Yalın. 2019. “Lise öğrencilerinde kaynak gösterme alışkanlığı: Bir sınıf içi deneme.” _Örnek Eğitim Araştırmaları Dergisi_ 12 (3): 211–230. https://doi.org/10.5555/ornek.2019.03.');eq(f.cad.paren,'(Aksoy and Yalın 2019, 220)');}
{const f=F(K.PRESETS[2].rec,'50-51');eq(f.apa.paren,'(Kaya et al., 2023, pp. 50–51)');eq(f.apa.ref.slice(0,36),'Kaya, E. S., Tan, B., & Oral, Z. (20');eq(f.cnb.note.slice(0,20),'Elif Su Kaya et al.,');eq(f.cad.paren,'(Kaya et al. 2023, 50–51)');eq(f.cnb.bib.slice(0,44),'Kaya, Elif Su, Burak Tan, and Zehra Oral. “Ö');eq(F(K.PRESETS[2].rec,'50-51','tr').apa.paren,'(Kaya vd., 2023, ss. 50–51)');}
{const f=F(K.PRESETS[3].rec,'');eq(f.apa.ref,'Örnek Yazım Kurumu. (n.d.). _Kaynak Gösterme Rehberi_. Retrieved March 12, 2026, from https://www.example.org/rehber');eq(f.apa.paren,'(Örnek Yazım Kurumu, n.d.)');
  eq(f.cnb.note,'Örnek Yazım Kurumu, “Kaynak Gösterme Rehberi,” accessed March 12, 2026, https://www.example.org/rehber.');eq(f.cad.ref,'Örnek Yazım Kurumu. n.d. “Kaynak Gösterme Rehberi.” Accessed March 12, 2026. https://www.example.org/rehber.');}
{const f=F(K.PRESETS[4].rec,'');eq(f.apa.ref,'Ömer Seyfettin. (1918). Diyet. _Yeni Mecmua, 1_(27).');eq(f.isn.bib,'Ömer Seyfettin. “Diyet”. _Yeni Mecmua_ 1/27 (Ocak 1918).');eq(f.cnb.short,'Ömer Seyfettin, “Diyet.”');}
// APA yazar sayısı kuralları: 20'ye kadar hepsi, 21 ve üstünde ilk 19, “. . .” ve son yazar
{const names=n=>Array.from({length:n},(_,i)=>'Y'+(i+1)+', A'+(i===0?'yşe':'')).join('\n');const ref=n=>F({type:'book',authorsText:names(n),year:'2020',title:'T',publisher:'P'},'').apa.ref;
  ok(ref(20).includes('Y19, A., & Y20, A. (2020)'));ok(ref(21).includes('Y19, A., . . . Y21, A. (2020)')&&!ref(21).includes('Y20,'));eq(ref(1).slice(0,11),'Y1, A. (202');
  const cb=n=>F({type:'book',authorsText:names(n),year:'2020',title:'T',publisher:'P'},'').cnb.bib;ok(cb(6).includes(', and A Y6.'));ok(cb(7).startsWith('Y1, Ayşe, A Y2, A Y3, et al.'));}
eq(K.initials('Ayşe Nur'),'A. N.');eq(K.initials('ismet'),'İ.');eq(K.initials('Jean-Paul'),'J.-P.');eq(K.parseAuthors('{Türk Dil Kurumu}\nAdı Orta Soyadı; Soy, Ad'),[{family:'Türk Dil Kurumu',given:'',whole:true},{family:'Soyadı',given:'Adı Orta',whole:false},{family:'Soy',given:'Ad',whole:false}]);
eq(K.normDOI('doi: 10.1000/xyz'),'https://doi.org/10.1000/xyz');eq(K.normDOI('https://dx.doi.org/10.1000/a'),'https://doi.org/10.1000/a');eq(K.normDOI('abc'),null);eq(K.normDOI(''),'');
eq([1,2,3,4,11,12,13,21,22,101,111].map(K.ordEN),['1st','2nd','3rd','4th','11th','12th','13th','21st','22nd','101st','111th']);
eq(K.parsePages('45 – 46'),{range:true,a:'45',b:'46'});eq(K.parsePages('par. 3'),{range:false,other:'par. 3'});eq(K.parsePages(''),null);
{const w=K.formatRef(R({type:'article',authorsText:'',title:'',journal:'',doi:'x1'}),{}).warn.join(' ');ok(/DOI/.test(w)&&/Başlık boş/.test(w)&&/Yazar yok/.test(w)&&/Dergi adı yok/.test(w)&&/Yıl yok/.test(w));}

/* 6. Atıf yanıtı ayrıştırıcı */
for(const[a,b]of[['(Aksoy & Yalın, 2019, p. 220)','( aksoy ve yalın,2019, s. 220 )'],['(Kaya et al., 2023, pp. 50–51)','(KAYA VD., 2023, ss. 50-51)'],['(İnan, 2018, 22)','(inan, 2018, 22)'],['(Aksoy and Yalın 2019, 220)','(Aksoy & Yalın 2019, 220)']])ok(K.citeMatches(b,[a]),b);
for(const bad of['(Aksoy, 2019, p. 220)','(Aksoy & Yalın, 2018, p. 220)','(Aksoy & Yalın 2019 p. 220)','(Yalın & Aksoy, 2019, p. 220)'])ok(!K.citeMatches(bad,['(Aksoy & Yalın, 2019, p. 220)']),bad);
// Doğrulayıcı: tek sayfada “p./s.”, aralıkta “pp./ss.” ayrımı korunur (APA 7, Purdue OWL “In-Text Citations: The Basics”)
for(const bad of['(Kaya et al., 2023, p. 50–51)','(Kaya vd., 2023, s. 50-51)'])ok(!K.citeMatches(bad,['(Kaya et al., 2023, pp. 50–51)']),bad);
ok(!K.citeMatches('(Aksoy & Yalın, 2019, pp. 220)',['(Aksoy & Yalın, 2019, p. 220)']));ok(K.citeMatches('(Aksoy ve Yalın, 2019, s. 220)',['(Aksoy & Yalın, 2019, p. 220)']));
// Doğrulayıcı: yamalı yazım açıklaması hangi kuralın tuttuğunu söyler
{const P=K.PASSAGES[0];const w=K.overlap(P.text,'Koca Ali dar kapılı dükkânında gece gündüz tek başına çalışırdı.',0);eq([K.verdict(w),K.verdictKey(w),w.run,Math.round(w.tri*100)],['patch','patchWords',2,0]);ok(!/uzun sözcük dizileri korunmuş/.test(K.VERDICT_TXT.patchWords));
  const y=K.overlap(P.text,K.substitute(P.text,P.syn,Object.keys(P.syn).slice(0,5)),0);eq([K.verdict(y),K.verdictKey(y)],['patch','patch']);}
ok(!html.includes('doğrulayıcıya açık')&&html.includes('Purdue OWL'),'APA/Chicago doğrulama etiketi');
eq(K.normCite('(İnan, 2018)'),K.normCite('(inan,2018)'));ok(K.normCite('(Işık, 2020)')!==K.normCite('(Isik, 2020)'),'ı ile i ayrı harflerdir');

/* 7. Veri bütünlüğü */
for(const[L,n]of[[K.THESIS_QUIZ,K.THESIS_KINDS.length],[K.SRC_QUIZ,K.SRC_KINDS.length],[K.PLAG_QUIZ,K.PLAG_KINDS.length],[K.QVP_QUIZ,K.QVP_KINDS.length]])for(const q of L)ok(Number.isInteger(q.ans)&&q.ans>=0&&q.ans<n&&q.why.length>20);
for(const p of[...K.THESIS_PARAS,...K.UNSUP_PARAS])ok(p.s.length===4&&p.ans>=0&&p.ans<4);
ok(K.MISTAKES.length>=5&&K.MISTAKES.every(m=>m.title&&m.wrong.length>8&&m.why.length>40&&m.fix));ok(K.THESIS_QUIZ.length>=6&&K.SRC_QUIZ.length>=8&&K.PLAG_QUIZ.length>=6&&K.QVP_QUIZ.length>=6&&K.TERM_QUIZ.length>=5);
ok(new Set(K.THESIS_QUIZ.map(q=>q.ans)).size===4&&new Set(K.PLAG_QUIZ.map(q=>q.ans)).size===K.PLAG_KINDS.length);
for(const S of K.EVAL_SOURCES){ok(K.EVAL_CRIT.every(c=>[0,1,2].includes(S.ans[c.id])&&S.why[c.id]));eq(K.evalCompare(S.id,S.ans).same,5);eq(K.evalCompare(S.id,{}).given,0);}
eq(K.evalCompare('s2',{yazar:0}).same,0);eq(K.evalCompare('s2',{yazar:1,tarih:1}).same,2);eq(K.evalCompare('yok',{}),null);
ok(['aktaran','intihal'].every(w=>K.TERM_QUIZ.some(q=>q.acc.includes(w))));

/* 8. Alıştırma üreteci: her düzeyde yüzlerce tohum */
const topics={};const dist={1:new Set(),2:new Set(),3:new Set(),4:new Set()};
for(let level=1;level<=4;level++)for(let s=1;s<=300;s++){const e=K.gen(level,s);eq(JSON.stringify(K.gen(level,s)),JSON.stringify(e),'tohum kararlı');topics[level+e.topic]=(topics[level+e.topic]||0)+1;dist[level].add(e.prompt+(e.quote||''));
  ok(e.hint&&e.solution.length>=1&&e.prompt);
  if(e.kind==='choice'){ok(e.answer.length===1&&e.answer[0]>=0&&e.answer[0]<e.options.length&&new Set(e.options).size===e.options.length);eq(K.grade(e,String(e.answer[0])).ok,true);for(let j=0;j<e.options.length;j++)if(j!==e.answer[0])eq(K.grade(e,String(j)).ok,false);eq(K.grade(e,'x').parse,true);eq(K.grade(e,String(e.options.length)).parse,true);}
  else{for(const a of e.acc)eq(K.grade(e,a).ok,true,'kabul '+a);eq(K.grade(e,'').parse,true);eq(K.grade(e,'yanlış yanıt xyz').ok,false);}
  if(e.topic==='term'){eq(K.grade(e,'  '+e.acc[0].toLocaleUpperCase('tr-TR')+' .').ok,true);}
  if(e.topic==='detect'){const P=K.PASSAGES.find(p=>p.id===e.passage);const v=K.verdict(K.overlap(P.text,e.quote,0));eq(v,{ok:'ok',patch:'patch',verbatim:'verbatim',quote:'quote'}[e.cat],'dedektif sınıfı ölçüyle uyumlu');}
  if(e.topic==='fix'){const right=e.options[e.answer[0]];const correct=e.solution[1].replace('Doğru girdi: ','');if(right==='Hata yok')eq(e.quote,correct);else ok(e.quote!==correct,'bozulmuş girdi farklı olmalı: '+right);eq(e.options.length,4);}
  if(e.topic==='cite'){const t=e.acc[0];eq(K.grade(e,t.replace(/ /g,'   ').replace(',',' ,')).ok,true);eq(K.grade(e,t.replace(/\d{4}/,y=>String(+y+1))).ok,false);eq(K.grade(e,'Kaya 2023').parse,true);}}
ok(['1thesis','1src','1term','2unsup','2qvp','2plag','3fix','3cite','4detect'].every(t=>topics[t]>=10),'konu dağılımı '+JSON.stringify(topics));
ok(dist[1].size>=15&&dist[2].size>=15&&dist[3].size>=25&&dist[4].size>=20,'çeşitlilik '+Object.values(dist).map(s=>s.size));
{let e=null;try{K.gen(5,1);}catch(x){e=x;}ok(e&&e.user);}
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
      const click=id=>page.locator('#'+id).click(),read=async id=>(await page.locator('#'+id).textContent()).replace(/[  ]/g,' '),set=(id,v)=>page.locator('#'+id).evaluate((e,v)=>{if(e.type==='checkbox'){e.checked=v;e.dispatchEvent(new Event('change',{bubbles:true}));return;}e.value=v;e.dispatchEvent(new Event(e.tagName==='SELECT'||e.type==='date'?'change':'input',{bubbles:true}));},v),is=async(id,t)=>{eq(await read(id),t,id);},has=async(id,t)=>{const s=await read(id);ok(s.includes(t),`${id}: “${s}” içinde “${t}” yok`);},fits=async()=>eq(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),true,'yatay taşma'),sel=async t=>eq(await page.locator('#tab-'+t).getAttribute('aria-selected'),'true');
      eq(await page.evaluate(()=>[...document.querySelectorAll('.app-content input,.app-content select,.app-content textarea')].filter(e=>!document.querySelector('label[for="'+e.id+'"]')).map(e=>e.id).join()),'');
      eq(await page.evaluate(()=>Object.isFrozen(YazmaLab)&&!Object.getOwnPropertyDescriptor(window,'YazmaLab').writable),true);
      eq(await page.evaluate(()=>/[̀-ͯ]/.test(document.body.innerHTML)),false,'birleşik aksan işareti yok');
      eq(await page.evaluate(()=>document.querySelectorAll('input[type=number]').length),0);eq(await page.evaluate(()=>document.title.length<=80),true);
      eq(await page.evaluate(()=>['mantik-ve-argumantasyon','epistemoloji','bilim-felsefesi','anlati-yapisi-ve-edebiyat-cozumlemesi'].every(s=>document.querySelector('.ay-next a[href="'+s+'.html"]'))),true,'sonraki sayfa bağlantıları');
      eq(await page.evaluate(()=>!!document.querySelector('a[href="turkce-dilbilgisinin-temelleri.html"]')&&!document.querySelector('.ay-next').textContent.includes('(hazırlanıyor)')),true);
      // 01
      await is('oOrders','3');eq(await page.locator('#oList li').count(),7);await click('oCheck');ok(!(await read('oBroken')).startsWith('0 /'),'karışık sıra geçerli olmamalı');eq(await page.locator('#oList .role').count(),7);
      await click('oSolve');await has('oStatus','Tamam');await is('oBroken','0 / 8');
      {const first=await read('oList');await click('oDn0');ok((await read('oList'))!==first);await has('oStatus','denetle');await click('oCheck');await has('oStatus','kuralı bozuyor');await has('oStatus','soru ve bağlam girişte');}
      eq(await page.locator('#oUp0').isDisabled(),true);eq(await page.locator('#oDn6').isDisabled(),true);
      await set('oTask','paragraf1');await is('oOrders','1');eq(await page.locator('#oList li').count(),5);await click('oSolve');await has('oStatus','Tamam');
      await click('th0-1');await has('thFb0','Doğru.');await click('th1-0');await has('thFb1','Değil.');await has('thScore','1 / 2 doğru');
      await click('yapiReset');await is('oOrders','3');eq(await page.locator('#thFb0').isHidden(),true);eq(await page.locator('#oTask').inputValue(),'deneme');await fits();
      await page.locator('#tab-yapi').focus();await page.keyboard.press('ArrowRight');await sel('kanit');
      // 02
      eq(await page.locator('#sqList .ay-q').count(),K.SRC_QUIZ.length);await click('sq0-0');await has('sqFb0','Doğru.');await click('sq10-2');await has('sqFb10','Değil.');
      await has('eClaim','uydurma');await is('eGiven','0 / 5');for(const c of K.EVAL_CRIT)await set('eC-'+c.id,String(K.EVAL_SOURCES[0].ans[c.id]));await is('eGiven','5 / 5');await click('eCompare');await is('eScore','5 / 5');await has('eOverall','En güçlü aday');
      await set('eSrc','s2');await is('eGiven','0 / 5');await set('eC-yazar','0');await click('eCompare');await is('eScore','0 / 5');await has('eOverall','İşaretlenmemiş');await has('eRows','zayıf');
      await click('eClear');await is('eGiven','0 / 5');await click('kanitReset');eq(await page.locator('#eSrc').inputValue(),'s1');eq(await page.locator('#sqFb0').isHidden(),true);await fits();
      // 03
      await click('tab-alinti');await has('pvVerdict','Bir metin yaz');await has('pvSrcInfo','Yeni Mecmua');
      await click('pvGood');await has('pvVerdict','açımlamaya benziyor');await has('pvVerdict','Kaynağı andığın');await is('pvTri','%0');
      await click('pvPatch');await has('pvVerdict','Yamalı yazım');ok(await page.locator('#pvOwnMark mark').count()>5);ok(await page.locator('#pvSrcMark mark').count()>5);
      await click('pvVerb');await has('pvVerdict','tırnaksız aynen aktarım');await is('pvTri','%100');await is('pvRun',refTok(K.PASSAGES[0].text).length+' sözcük');await has('pvVerdict','kaynağa bir gönderme görünmüyor');
      await click('pvQuote');await has('pvVerdict','doğru bir alıntı');await is('pvQ','kaynakla aynı');eq(await page.locator('#pvOwnMark .qq').count(),1);
      await page.locator('#pvText').fill('Ona göre “Koca Ali çok güçlü bir adamdı” (Ömer Seyfettin, 1918).');await has('pvVerdict','kaynakta aynen geçmiyor');await is('pvQ','kaynakta yok');
      await page.locator('#pvText').fill('Koca Ali dar kapılı dükkânında gece gündüz tek başına çalışırdı.');await has('pvVerdict','uzun ortak dizi yüzünden değil');await is('pvTri','%0');await is('pvRun','2 sözcük');
      await set('pvSrc','diyet2');await page.locator('#pvText').fill('Kimseyle konuşmazdı ve dükkânını hiç bırakmazdı.');const t0=await read('pvUni');await set('pvStem','5');ok((await read('pvUni'))!==t0,'ilk beş harf seçeneği sonucu değiştirir');
      await set('pvSrc','hasim');await click('pvGood');await has('pvVerdict','açımlamaya benziyor');await has('pvSrcText','Fransa');
      await click('qv0-0');await has('qvFb0','Doğru.');await click('alintiReset');await is('pvTri','—');eq(await page.locator('#pvSrc').inputValue(),'diyet1');eq(await page.locator('#qvFb0').isHidden(),true);await fits();
      // 04
      await click('tab-intihal');eq(await page.locator('#mkList .ay-mist').count(),K.MISTAKES.length);await click('pq0-0');await has('pqFb0','Doğru.');await click('pq1-0');await has('pqFb1','Değil.');await has('pqScore','1 / 2');
      eq(await page.locator('#mk0').isHidden(),true);await click('mkBtn0');eq(await page.locator('#mk0').isVisible(),true);eq(await page.locator('#mkBtn0').getAttribute('aria-expanded'),'true');await click('mkBtn0');eq(await page.locator('#mk0').isHidden(),true);
      await click('mkBtn3');await click('intihalReset');eq(await page.locator('#mk3').isHidden(),true);eq(await page.locator('#pqFb0').isHidden(),true);await fits();
      // 05
      await click('tab-atif');await is('out-apa-paren','(Aksoy & Yalın, 2019, p. 220)');await is('out-ism-paren','(Aksoy – Yalın, 2019, 220)');eq(await page.locator('#out-apa-ref i').count(),1);await has('out-apa-ref','https://doi.org/10.5555/ornek.2019.03');
      eq(await page.locator('#fArtRow').isVisible(),true);eq(await page.locator('#fBookRow').isHidden(),true);
      await set('fLang','tr');await is('out-apa-paren','(Aksoy & Yalın, 2019, s. 220)');await is('out-apa-narr','Aksoy ve Yalın (2019, s. 220)');
      await set('fPreset','kitap');await has('out-isn-note','(İzmir: Örnek Yayınları, 2. Basım, 2021), 45.');eq(await page.locator('#fBookRow').isVisible(),true);await is('out-apa-paren','(Demirci, 2021, s. 45)');
      await set('fPreset','web');await has('out-isn-bib','ÖYK, Örnek Yazım Kurumu. “Kaynak Gösterme Rehberi”. Erişim 12 Mart 2026. https://www.example.org/rehber');await has('fWarn','Yıl yok');eq(await page.locator('#fWebRow').isVisible(),true);
      await set('fChanging',false);eq((await read('out-apa-ref')).includes('erişildi'),false);await set('fAcc','2025-01-05');await is('out-ism-paren','(ÖYK, 5 Ocak 2025)');eq(await page.locator('#fPreset').inputValue(),'custom');
      await set('fPreset','makale3');await set('fLang','en');await is('out-apa-paren','(Kaya et al., 2023, pp. 50–51)');await set('fAuthors','Kaya, Elif Su');await is('out-apa-paren','(Kaya, 2023, pp. 50–51)');
      await set('fDoi','abc');await has('fWarn','DOI');await set('fType','book');eq(await page.locator('#fDoiWrap').isVisible(),true);await has('fWarn','Yayınevi yok');
      await set('fPreset','diyet');await is('out-isn-bib','Ömer Seyfettin. “Diyet”. Yeni Mecmua 1/27 (Ocak 1918).');
      await click('atifReset');await is('out-apa-paren','(Aksoy & Yalın, 2019, p. 220)');eq(await page.locator('#fLang').inputValue(),'en');await fits();
      await set('fPage','300');await page.locator('h1').click();await page.keyboard.press('r');await is('out-apa-paren','(Aksoy & Yalın, 2019, p. 220)');
      // 06
      await click('tab-alistirma');await is('pSeed','1 · 1');await is('pScore','—');
      {const e=K.gen(1,1);await has('pPrompt',e.prompt.slice(0,25));if(e.kind==='choice'){const w=(e.answer[0]+1)%e.options.length;await click('pOpt'+w);await has('pFb','Henüz değil');await click('pOpt'+e.answer[0]);await has('pFb','Doğru.');await is('pScore','0 / 1');}else{await page.locator('#pAns').fill('xx');await click('pCheck');await has('pFb','Henüz değil');}}
      await click('pHintBtn');eq(await page.locator('#pHint').isVisible(),true);await click('pSolBtn');await has('pSol','Çözüm, adım adım');await click('pNew');await is('pSeed','1 · 2');eq(await page.locator('#pSol').isHidden(),true);
      {let s=1;while(K.gen(1,s).kind!=='text')s++;await click('alistirmaReset');for(let i=1;i<s;i++)await click('pNew');const e=K.gen(1,s);await has('pPrompt',e.prompt.slice(0,20));await page.locator('#pAns').fill('');await click('pCheck');await has('pFb','boş');await page.locator('#pAns').fill(' '+e.acc[0].toLocaleUpperCase('tr-TR')+'. ');await page.locator('#pAns').press('Enter');await has('pFb','Doğru.');}
      {await set('pLevel','3');let s=1;while(K.gen(3,s).topic!=='cite')s++;for(let i=1;i<s;i++)await click('pNew');const e=K.gen(3,s);await has('pPrompt','ayraç içi');await page.locator('#pAns').fill('Kaya 2023');await click('pCheck');await has('pFb','Ayraç içi atıf');await page.locator('#pAns').fill(e.acc[0].toLocaleUpperCase('tr-TR'));await click('pCheck');await has('pFb','Doğru.');}
      {await set('pLevel','4');const e=K.gen(4,1);eq(await page.locator('#pQuote').isVisible(),true);await click('pOpt'+e.answer[0]);await has('pFb','Ölçüm:');}
      await click('alistirmaReset');await is('pSeed','1 · 1');await is('pScore','—');await fits();
      await page.locator('#tab-alistirma').focus();await page.keyboard.press('Home');await sel('yapi');await page.keyboard.press('End');await sel('alistirma');await page.keyboard.press('ArrowLeft');await sel('atif');
      for(const t of['yapi','kanit','alinti','intihal','atif','alistirma']){await click('tab-'+t);await fits();eq(await page.locator('#panel-'+t).isVisible(),true);}
      assert.deepEqual(errors,[]);checks++;await page.close();}
    console.log(`G ${SLUG}: ${checks-before} tarayıcı kontrolü PASS (390 px açık, 1280 px koyu)`);
  }finally{await browser?.close();await new Promise(r=>server.close(r));}
}
