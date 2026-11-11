// Kalıcı denetim: veritabanlari.html çekirdeği (window.DbLab).
// Başvurular sayfanın kodunu yinelemez: elle yazılmış iç içe döngülü ikinci bir sorgu değerlendirici ve min/max
// kodlamalı üç değerli mantık, sıralı dizi üzerinde B+ağacı başvurusu ve ayrı bir değişmez denetçisi, iki satırlı
// ilişkilerle anlamsal kapanış ve kaba kuvvet anahtar/normal form/izdüşüm hesabı, rastgele örneklerle birleştirme
// sınaması, bütün seri sıraların tanımdan denenmesi. `--browser` ile gerçek tarayıcıda arayüz denetimleri çalışır.
import fs from 'node:fs';
import vm from 'node:vm';
import assert from 'node:assert/strict';
const html=fs.readFileSync(new URL('../veritabanlari.html',import.meta.url),'utf8');
const source=html.split('/* KERNEL-BEGIN */')[1]?.split('/* KERNEL-END */')[0];
assert(source,'KERNEL-BEGIN / KERNEL-END sınırları gerekli');
const context={};vm.createContext(context);vm.runInContext(source+';globalThis.K=DbLab;',context);
const K=context.K;let checks=0;
const plain=v=>v===undefined?null:JSON.parse(JSON.stringify(v));
const eq=(a,b,msg)=>{assert.deepEqual(plain(a),plain(b),msg||`${JSON.stringify(a)} ≠ ${JSON.stringify(b)}`);checks++;};
const ok=(v,msg)=>{assert(v,msg);checks++;};
function rng(seed){let s=seed>>>0||1;return()=>{s^=s<<13;s>>>=0;s^=s>>>17;s^=s<<5;s>>>=0;return s/4294967296;};} // xorshift32; sayfadaki üreteçten farklı
const pick=(r,a)=>a[Math.floor(r()*a.length)];

/* ================= 1. B+ağacı ================= */
// Bağımsız değişmez denetçisi: anlık görüntüyü düzey düzey dolaşır.
function refCheck(s){const m=s.m;let level=[{n:s.root,lo:-Infinity,hi:Infinity}],depth=1,leaves=null;
  for(;;){const allLeaf=level.every(x=>x.n.leaf),anyLeaf=level.some(x=>x.n.leaf);if(anyLeaf&&!allLeaf)return'yapraklar farklı derinlikte';
    for(const{n,lo,hi}of level){const root=n===s.root,k=n.keys.length;
      if(k>m)return'taşmış düğüm';if(n.leaf){if(!root&&k<Math.ceil(m/2))return'eksik yaprak';}else{if(k<(root?1:Math.floor(m/2)))return'eksik iç düğüm';if(n.kids.length!==k+1)return'çocuk sayısı';}
      for(let i=0;i<k;i++){if(i&&!(n.keys[i-1]<n.keys[i]))return'sıra';if(!(n.keys[i]>=lo&&n.keys[i]<hi))return'ayırıcı aralığı';}}
    if(allLeaf){leaves=level.map(x=>x.n);break;}
    level=level.flatMap(({n,lo,hi})=>n.kids.map((c,i)=>({n:c,lo:i?n.keys[i-1]:lo,hi:i<n.keys.length?n.keys[i]:hi})));depth++;}
  if(depth!==s.height)return'yükseklik';
  for(let i=0;i<leaves.length;i++)if(leaves[i].next!==(leaves[i+1]?leaves[i+1].id:null))return'zincir';
  if(leaves.reduce((a,l)=>a+l.keys.length,0)!==s.size)return'boyut';return null;}
// Düğüm kurallarından özyinelemeyle en az / en çok anahtar; yükseklik sınırları buradan.
function refBounds(n,m){const maxKeys=h=>h===1?m:(m+1)*maxKeys(h-1),minNR=h=>h===1?Math.ceil(m/2):(Math.floor(m/2)+1)*minNR(h-1),minRoot=h=>h===1?1:2*minNR(h-1);
  let lo=1;while(maxKeys(lo)<n)lo++;let hi=1;while(minRoot(hi+1)<=n)hi++;return{min:lo,max:hi};}
for(const m of[3,4,5,6,7,8]){
  for(let n=0;n<=3000;n+=n<60?1:37)eq(K.heightBounds(n,m),n?refBounds(n,m):{min:1,max:1},`sınır n=${n} m=${m}`);
  for(const seed of[1,2,3]){const r=rng(seed*100+m),t=K.bplus(m),ref=new Set(),universe=m<5?140:400;let ops=0;
    for(let i=0;i<2500;i++){const k=1+Math.floor(r()*universe),phase=i<900?.7:i<1700?.3:.5,u=r();
      if(u<phase){const res=t.insert(k);eq(res.inserted,!ref.has(k));ref.add(k);}else if(u<.92){const res=t.remove(k);eq(res.removed,ref.has(k));ref.delete(k);}
      else{const lo=1+Math.floor(r()*universe),hi=lo+Math.floor(r()*40),h=t.height(),res=t.range(lo,hi),want=[...ref].filter(x=>x>=lo&&x<=hi).sort((a,b)=>a-b);eq(res.keys,want);eq(res.visits,h+res.leaves-1);}
      ops++;const s=t.snapshot(),bad=refCheck(s);ok(bad===null,`m=${m} tohum=${seed} işlem ${i}: ${bad}`);
      if(i%7===0){eq(t.keys(),[...ref].sort((a,b)=>a-b));ok(t.check().ok);const b=refBounds(ref.size,m);ok(ref.size===0||(s.height>=b.min&&s.height<=b.max),`yükseklik ${s.height} sınır dışı`);
        const q=1+Math.floor(r()*universe),sr=t.search(q);eq(sr.found,ref.has(q));eq(sr.visits,s.height);ok(sr.comparisons<=s.height*m);eq(sr.trail.length,s.height);}}
    ok(ops===2500);
    // boşalana dek sil: yükseklik 1'e inmeli
    for(const k of[...ref].sort(()=>r()-.5)){t.remove(k);ok(refCheck(t.snapshot())===null);}eq(t.snapshot().height,1);eq(t.size,0);}
  for(const dir of['asc','desc'])for(const n of[1,m,m+1,m+2,2*m+1,50,137,300,1000]){const t=K.bplus(m);for(let i=1;i<=n;i++)t.insert(dir==='asc'?i:n+1-i);const s=t.stats();eq(s.leaves,K.sequentialLeaves(n,m,dir),`${dir} n=${n} m=${m}`);ok(refCheck(t.snapshot())===null);
    if(n>m){let leaf=t.snapshot().root;while(!leaf.leaf)leaf=leaf.kids[dir==='asc'?0:leaf.kids.length-1];eq(leaf.keys.length,dir==='asc'?Math.ceil((m+1)/2):Math.floor((m+1)/2));}} // bölünme payı
  const p=K.shuffled(200,m);eq([...p].sort((a,b)=>a-b),Array.from({length:200},(_,i)=>i+1));eq(K.shuffled(200,m),p);}
// Elle izlenmiş küçük örnekler (m = 3)
{const shape=n=>n.leaf?n.keys:{k:n.keys,c:n.kids.map(shape)};const t=K.bplus(3);for(let i=1;i<=4;i++)t.insert(i);
  eq(shape(t.snapshot().root),{k:[3],c:[[1,2],[3,4]]}); // yaprak bölünmesi: 3 yukarı kopyalandı, yaprakta da duruyor
  t.insert(5);const b=K.bplus(3);for(let i=1;i<=5;i++)b.insert(i);const rb=b.remove(1);eq(shape(b.snapshot().root),{k:[4],c:[[2,3],[4,5]]});eq(rb.borrows,1); // sağdan ödünç
  for(let i=6;i<=10;i++)t.insert(i);eq(shape(t.snapshot().root),{k:[7],c:[{k:[3,5],c:[[1,2],[3,4],[5,6]]},{k:[9],c:[[7,8],[9,10]]}]}); // iç bölünme: 7 taşındı
  const c=K.bplus(3);for(let i=1;i<=4;i++)c.insert(i);const rc=c.remove(4);eq(shape(c.snapshot().root),[1,2,3]);eq(rc.merges,1);eq(rc.shrank,true);
  const g=K.bplus(3);for(let i=1;i<=3;i++)g.insert(i);const ri=g.insert(4);eq(ri.splits,1);eq(ri.grew,true);eq(g.insert(4).inserted,false);
  const steps=[];t.insert(11,undefined,steps);ok(steps.length>=2&&steps.every(s=>typeof s.msg==='string'&&s.snap.root));
  // bozulmuş görüntüleri sayfanın denetçisi de yakalamalı
  const base=()=>plain(t.snapshot()),first=s=>{let n=s.root;while(!n.leaf)n=n.kids[0];return n;};
  ok(K.checkTree(base()).ok);
  let s=base();first(s).keys.reverse();ok(!K.checkTree(s).ok&&!K.checkTree(s).order);
  s=base();first(s).keys.pop();ok(!K.checkTree(s).counts);
  s=base();first(s).next=null;ok(!K.checkTree(s).chain);
  s=base();s.root.kids[0]=first(s);ok(!K.checkTree(s).depth);
  s=base();s.root.keys[0]=1;ok(!K.checkTree(s).order);
  assert.throws(()=>K.bplus(2));checks++;}
const treeChecks=checks;

/* ================= 2. SQL ================= */
const db=K.createDb(4),TB=plain(db.tables),R=name=>TB[name].rows.map(r=>Object.fromEntries(TB[name].cols.map((c,i)=>[c.n,r[i]])));
const og=R('ogrenciler'),ki=R('kitaplar'),od=R('odunc'),bo=R('bolumler');
eq([og.length,ki.length,od.length,bo.length],[12,10,30,5]);
// veri bütünlüğü: birincil anahtarlar tekil, yabancı anahtarlar var olan satırı gösteriyor
ok(new Set(od.map(o=>o.id)).size===30&&od.every(o=>og.some(g=>g.id===o.ogrenci_id)&&ki.some(k=>k.id===o.kitap_id)&&(o.iade===null||o.iade>o.verilis)));
ok(og.every(g=>g.bolum_kod===null||bo.some(b=>b.kod===g.bolum_kod)));
const tr=new Intl.Collator('tr'),canon=rows=>rows.map(r=>JSON.stringify(r)).sort(),
  run=(sql,useIndex)=>plain(db.run(sql,{useIndex}));
function same(sql,want,ordered){for(const ix of[false,true]){const r=run(sql,ix);if(ordered)eq(r.rows,want,sql);else eq(canon(r.rows),canon(want),sql);}}
// İkinci değerlendirici: elle yazılmış döngüler; NULL kuralları JS koşullarıyla açıkça yazılı.
{let w=[];for(const o of od)for(const g of og)if(g.id===o.ogrenci_id)for(const k of ki)if(k.id===o.kitap_id&&o.iade===null)w.push([g.ad,k.baslik,o.verilis]);
  w.sort((a,b)=>a[2]<b[2]?-1:1);same("SELECT g.ad, k.baslik, o.verilis FROM odunc o JOIN ogrenciler g ON g.id = o.ogrenci_id JOIN kitaplar k ON k.id = o.kitap_id WHERE o.iade IS NULL ORDER BY o.verilis",w,true);
  const r=run("SELECT g.ad, k.baslik, o.verilis FROM odunc o JOIN ogrenciler g ON g.id = o.ogrenci_id JOIN kitaplar k ON k.id = o.kitap_id WHERE o.iade IS NULL ORDER BY o.verilis",false);
  eq(r.counters.rowsRead,30+30*12+30*10);eq(r.counters.joinCmp,30*12+30*10);eq(r.counters.predRowsRead,690);eq(r.counters.predJoinCmp,660);eq(r.rows.length,6);
  const ri=run("SELECT g.ad, k.baslik, o.verilis FROM odunc o JOIN ogrenciler g ON g.id = o.ogrenci_id JOIN kitaplar k ON k.id = o.kitap_id WHERE o.iade IS NULL ORDER BY o.verilis",true);
  eq(ri.counters.probes,60);eq(ri.counters.nodeVisits,60*2);eq(ri.counters.rowsRead,30+30+30);eq(ri.counters.nodeVisits,ri.counters.predNodeVisits);
  same("SELECT * FROM ogrenciler",og.map(g=>[g.id,g.ad,g.bolum_kod,g.sinif]),true);
  same("select AD, Sinif from OGRENCILER where (bolum_kod = 'BIL' or bolum_kod = 'MAT') and not sinif = 1 order by ad",og.filter(g=>(g.bolum_kod==='BIL'||g.bolum_kod==='MAT')&&g.sinif!==1).sort((a,b)=>tr.compare(a.ad,b.ad)).map(g=>[g.ad,g.sinif]),true);
  same("SELECT ad FROM ogrenciler WHERE bolum_kod = NULL",[]);same("SELECT ad FROM ogrenciler WHERE NOT bolum_kod = NULL",[]);same("SELECT ad FROM ogrenciler WHERE bolum_kod <> NULL",[]);
  same("SELECT ad FROM ogrenciler WHERE bolum_kod IS NULL",og.filter(g=>g.bolum_kod===null).map(g=>[g.ad]));eq(run("SELECT ad FROM ogrenciler WHERE bolum_kod IS NULL").rows,[['Umut']]);
  same("SELECT ad FROM ogrenciler WHERE bolum_kod <> 'BIL'",og.filter(g=>g.bolum_kod!==null&&g.bolum_kod!=='BIL').map(g=>[g.ad]));
  same("SELECT ad FROM ogrenciler WHERE bolum_kod = 'BIL' OR bolum_kod <> 'BIL'",og.filter(g=>g.bolum_kod!==null).map(g=>[g.ad])); // dışlanan üçüncü yok: 11 satır
  same("SELECT ad FROM ogrenciler WHERE bolum_kod NOT IN ('BIL', NULL)",[]);same("SELECT ad FROM ogrenciler WHERE bolum_kod IN ('BIL', NULL)",og.filter(g=>g.bolum_kod==='BIL').map(g=>[g.ad]));
  same("SELECT ad FROM ogrenciler WHERE sinif NOT IN (1, 2) AND ad LIKE '%e%'",og.filter(g=>g.sinif!==1&&g.sinif!==2&&g.ad.includes('e')).map(g=>[g.ad]));
  same("SELECT baslik FROM kitaplar WHERE baslik LIKE '_l%' OR yazar NOT LIKE '%a%'",ki.filter(k=>k.baslik[1]==='l'||!k.yazar.includes('a')).map(k=>[k.baslik]));
  same("SELECT baslik, 2026 - yil AS yas FROM kitaplar WHERE yil >= 2010 AND yil < 2020 ORDER BY yas DESC, baslik",ki.filter(k=>k.yil!==null&&k.yil>=2010&&k.yil<2020).map(k=>[k.baslik,2026-k.yil]).sort((a,b)=>b[1]-a[1]||tr.compare(a[0],b[0])),true);
  w=[];for(const g of og){let hit=false;for(const o of od)if(o.ogrenci_id===g.id)hit=true;if(!hit)w.push([g.ad]);}
  same("SELECT g.ad FROM ogrenciler g LEFT JOIN odunc o ON o.ogrenci_id = g.id WHERE o.id IS NULL ORDER BY g.ad",w.sort((a,b)=>tr.compare(a[0],b[0])),true);eq(w.map(x=>x[0]),['Barış','Şule']);
  w=[];for(const g of og){let hit=false;for(const b of bo)if(g.bolum_kod!==null&&b.kod===g.bolum_kod){w.push([g.ad,b.ad]);hit=true;}if(!hit)w.push([g.ad,null]);}
  same("SELECT g.ad, b.ad FROM ogrenciler g LEFT OUTER JOIN bolumler b ON b.kod = g.bolum_kod",w);eq(run("SELECT g.ad, b.ad FROM ogrenciler g LEFT JOIN bolumler b ON b.kod = g.bolum_kod",false).counters.joinCmp,60);
  w=[];for(const g of og){let n=0;for(const o of od)if(o.ogrenci_id===g.id)n++;if(n>=3)w.push([g.ad,n]);}
  same("SELECT g.ad, COUNT(*) AS adet FROM ogrenciler g JOIN odunc o ON o.ogrenci_id = g.id GROUP BY g.ad HAVING COUNT(*) >= 3 ORDER BY adet DESC, g.ad",w.sort((a,b)=>b[1]-a[1]||tr.compare(a[0],b[0])),true);
  w=bo.map(b=>[b.ad,og.filter(g=>g.bolum_kod===b.kod).length]);same("SELECT b.ad, COUNT(g.id) AS ogrenci FROM bolumler b LEFT JOIN ogrenciler g ON g.bolum_kod = b.kod GROUP BY b.ad ORDER BY ogrenci DESC, b.ad",w.sort((a,b)=>b[1]-a[1]||tr.compare(a[0],b[0])),true);ok(w.some(x=>x[1]===0));
  w=[...new Set(ki.map(k=>k.tur))].map(t=>{const g=ki.filter(k=>k.tur===t),ys=g.map(k=>k.yil).filter(y=>y!==null);return[t,g.length,ys.length,ys.length?Math.min(...ys):null,ys.length?ys.reduce((a,b)=>a+b,0)/ys.length:null,ys.length?ys.reduce((a,b)=>a+b,0):null,ys.length?Math.max(...ys):null];});
  same("SELECT tur, COUNT(*), COUNT(yil), MIN(yil), AVG(yil), SUM(yil), MAX(yil) FROM kitaplar GROUP BY tur",w);
  same("SELECT COUNT(*), COUNT(iade), COUNT(DISTINCT ogrenci_id), MIN(verilis), MAX(iade) FROM odunc",[[30,od.filter(o=>o.iade!==null).length,new Set(od.map(o=>o.ogrenci_id)).size,od.map(o=>o.verilis).sort()[0],od.map(o=>o.iade).filter(Boolean).sort().pop()]]);
  same("SELECT COUNT(*), SUM(sinif), MAX(ad) FROM ogrenciler WHERE sinif > 9",[[0,null,null]]);same("SELECT sinif, COUNT(*) FROM ogrenciler WHERE sinif > 9 GROUP BY sinif",[]);
  same("SELECT DISTINCT yazar FROM kitaplar WHERE baslik LIKE '%i%' AND tur IN ('bilgisayar', 'matematik') ORDER BY yazar LIMIT 3",[...new Set(ki.filter(k=>k.baslik.includes('i')&&['bilgisayar','matematik'].includes(k.tur)).map(k=>k.yazar))].sort(tr.compare).slice(0,3).map(y=>[y]),true);
  same("SELECT DISTINCT bolum_kod, sinif FROM ogrenciler",[...new Map(og.map(g=>[g.bolum_kod+'|'+g.sinif,[g.bolum_kod,g.sinif]])).values()]);
  same("SELECT ad FROM ogrenciler ORDER BY ad",og.map(g=>g.ad).sort(tr.compare).map(a=>[a]),true); // Türk alfabesi: Çınar, Deniz'den önce; Işıl, İpek'ten önce
  same("SELECT ad FROM ogrenciler ORDER BY 1 DESC LIMIT 2",og.map(g=>g.ad).sort(tr.compare).reverse().slice(0,2).map(a=>[a]),true);
  same("SELECT ad, bolum_kod FROM ogrenciler ORDER BY bolum_kod, sinif DESC, id",[...og].sort((a,b)=>(a.bolum_kod===null?-1:b.bolum_kod===null?1:a.bolum_kod<b.bolum_kod?-1:a.bolum_kod>b.bolum_kod?1:0)||b.sinif-a.sinif||a.id-b.id).map(g=>[g.ad,g.bolum_kod]),true); // NULL en başta
  w=[];for(const o of od)if(o.ogrenci_id===7)for(const k of ki)if(k.id===o.kitap_id)w.push([o.id,o.verilis,k.baslik]);
  same("SELECT o.id, o.verilis, k.baslik FROM odunc o JOIN kitaplar k ON k.id = o.kitap_id WHERE o.ogrenci_id = 7",w);
  {const a=run("SELECT o.id, o.verilis, k.baslik FROM odunc o JOIN kitaplar k ON k.id = o.kitap_id WHERE o.ogrenci_id = 7",false).counters,b=run("SELECT o.id, o.verilis, k.baslik FROM odunc o JOIN kitaplar k ON k.id = o.kitap_id WHERE o.ogrenci_id = 7",true).counters,n7=od.filter(o=>o.ogrenci_id===7).length;
    eq(a.rowsRead,30+30*10);eq(b.rowsRead,2*n7);eq(b.probes,1+n7);ok(b.rowsRead<a.rowsRead);}
  {const a=run("SELECT * FROM odunc WHERE id = 17",false),b=run("SELECT * FROM odunc WHERE id = 17",true),h=db.indexes.odunc.id.height();eq(a.counters.rowsRead,30);eq(b.counters.rowsRead,1);eq(b.counters.nodeVisits,h);eq(h,3);eq(a.rows,b.rows);
    const hb=K.heightBounds(30,4);ok(h>=hb.min&&h<=hb.max);eq(run("SELECT * FROM odunc WHERE id = 99",true).rows,[]);eq(run("SELECT * FROM odunc WHERE 17 = id AND kitap_id > 0",true).counters.rowsRead,1);
    eq(run("SELECT * FROM odunc WHERE id = 17 OR id = 18",true).counters.rowsRead,30);} // OR altında indeks kullanılmaz
  // çapraz çarpım boyutu ve ON içinde eşitsizlik
  w=[];for(const a of bo)for(const b of bo)if(a.kod<b.kod&&a.fakulte===b.fakulte)w.push([a.kod,b.kod]);
  same("SELECT a.kod, b.kod FROM bolumler a JOIN bolumler b ON a.kod < b.kod AND a.fakulte = b.fakulte",w);eq(run("SELECT a.kod FROM bolumler a JOIN bolumler b ON 1 = 1").rows.length,25);
  eq(run("SELECT g.ad FROM ogrenciler g JOIN odunc o ON o.ogrenci_id = g.id").counters.joinCmp,12*30);}
// Üç değerli mantık: min/max kodlaması (D=1, B=½, Y=0) ile dokuz bileşim
{const lit={1:'1 = 1',0:'1 = 0',.5:'NULL = 1'};for(const a of[1,0,.5])for(const b of[1,0,.5])for(const[op,f]of[['AND',Math.min],['OR',Math.max]]){
    eq(run(`SELECT COUNT(*) FROM bolumler WHERE (${lit[a]}) ${op} (${lit[b]})`).rows[0][0],f(a,b)===1?5:0);
    eq(run(`SELECT COUNT(*) FROM bolumler WHERE NOT ((${lit[a]}) ${op} (${lit[b]}))`).rows[0][0],1-f(a,b)===1?5:0);
    eq(run(`SELECT COUNT(*) FROM bolumler WHERE ((${lit[a]}) ${op} (${lit[b]})) IS NULL`).rows.length,1);}
  // rastgele koşul ağaçları: SQL metni ile JS başvurusu yan yana üretilir
  const r=rng(77),cols=[['sinif','n'],['id','n'],['bolum_kod','s'],['ad','s']],sv=['BIL','MAT','FIZ','Umut','Deniz','Z'];
  const gen=d=>{const u=r();if(d>0&&u<.3){const a=gen(d-1),b=gen(d-1);return{sql:`(${a.sql} AND ${b.sql})`,f:g=>Math.min(a.f(g),b.f(g))};}
    if(d>0&&u<.6){const a=gen(d-1),b=gen(d-1);return{sql:`(${a.sql} OR ${b.sql})`,f:g=>Math.max(a.f(g),b.f(g))};}
    if(d>0&&u<.75){const a=gen(d-1);return{sql:`NOT ${a.sql}`,f:g=>1-a.f(g)};}
    const[c,t]=pick(r,cols),v=t==='n'?1+Math.floor(r()*6):pick(r,sv),L=t==='n'?String(v):`'${v}'`,w=r();
    if(w<.15){const neg=r()<.5;return{sql:`${c} IS ${neg?'NOT ':''}NULL`,f:g=>(g[c]===null)!==neg?1:0};}
    if(w<.3){const v2=t==='n'?1+Math.floor(r()*6):pick(r,sv),hasNull=r()<.3,neg=r()<.5,list=[L,t==='n'?String(v2):`'${v2}'`].concat(hasNull?['NULL']:[]);
      return{sql:`${c} ${neg?'NOT ':''}IN (${list.join(', ')})`,f:g=>{if(g[c]===null)return.5;const x=g[c]===v||g[c]===v2?1:hasNull?.5:0;return neg?1-x:x;}};}
    const op=pick(r,['=','<>','<','<=','>','>=']),c3=(a,b)=>t==='n'?a-b:tr.compare(a,b);
    return{sql:`${c} ${op} ${L}`,f:g=>{if(g[c]===null)return.5;const d3=c3(g[c],v);return(op==='='?g[c]===v:op==='<>'?g[c]!==v:op==='<'?d3<0:op==='<='?d3<=0:op==='>'?d3>0:d3>=0)?1:0;}};};
  for(let i=0;i<400;i++){const e=gen(3);same(`SELECT id FROM ogrenciler WHERE ${e.sql}`,og.filter(g=>e.f(g)===1).map(g=>[g.id]));}}
// Hata iletileri: konum bilgisi doğru yeri göstermeli
for(const[sql,pos,frag]of[["SELEC * FROM ogrenciler",0,'SELECT ile'],["SELECT * FROM ogrenci",14,'tablo yok'],["SELECT adi FROM ogrenciler",7,'sütun yok'],["SELECT id FROM ogrenciler g JOIN odunc o ON o.ogrenci_id = g.id",7,'birden çok tabloda'],
  ["SELECT ad FROM ogrenciler WHERE sinif = 'iki'",38,'Tip uyuşmazlığı'],["SELECT ad FROM ogrenciler WHERE ad = 'Deniz",37,'kapanmamış'],["SELECT ad FROM ogrenciler WHERE",31,'bekleniyordu'],
  ["SELECT bolum_kod, ad FROM ogrenciler GROUP BY bolum_kod",18,'GROUP BY listesinde değil'],["SELECT ad FROM ogrenciler WHERE COUNT(*) > 1",32,'Kümeleme işlevi'],["SELECT ad FROM ogrenciler RIGHT JOIN odunc ON 1 = 1",26,'desteklenmiyor'],
  ["SELECT ad FROM ogrenciler ORDER BY ad WHERE sinif = 1",38,'sırası'],["SELECT ad FROM ogrenciler LIMIT x",32,'LIMIT'],["SELECT ad FROM ogrenciler WHERE sinif",32,'Mantıksal'],["SELECT ad FROM ogrenciler HAVING sinif > 1",26,'HAVING'],
  ["SELECT * FROM ogrenciler g JOIN odunc o ON k.id = g.id JOIN kitaplar k ON k.id = o.kitap_id",43,'henüz birleştirilmemiş'],["SELECT ad FROM ogrenciler WHERE sinif / 0 = 1",38,'Sıfıra bölme'],["SELECT ad, FROM ogrenciler",11,'bekleniyordu'],["SELECT ad FROM ogrenciler; DROP",27,'desteklenmiyor'],["SELECT # FROM x",7,'Tanınmayan']]){
  let err=null;try{db.run(sql,{});}catch(e){err=e;}ok(err&&err.sql,`hata bekleniyordu: ${sql}`);eq(err.pos,pos,`${sql} → konum ${err.pos}: ${err.message}`);ok(err.message.includes(frag),`${sql}: ${err.message}`);}
{const r=run("SELECT g.ad, COUNT(*) AS n FROM ogrenciler g LEFT JOIN odunc o ON o.ogrenci_id = g.id WHERE g.sinif > 1 GROUP BY g.ad HAVING COUNT(*) > 1 ORDER BY n LIMIT 2");
  for(const sym of['σ','π','⟕','γ','τ','ρ','LIMIT'])ok(r.plan.join('\n').includes(sym),sym);ok(run("SELECT DISTINCT tur FROM kitaplar k JOIN odunc o ON o.kitap_id = k.id").algebra.startsWith('δ(π[tur]('));
  ok(run("SELECT ad FROM ogrenciler WHERE bolum_kod = NULL").notes.length===1);}
const sqlChecks=checks-treeChecks;

/* ================= 3. Fonksiyonel bağımlılıklar ================= */
// Anlamsal başvuru: X → A çıkarsanır ⇔ F'yi sağlayan hiçbir iki satırlı ilişki onu bozmaz.
// İki satırın uzlaştığı küme T, her U → V için (U ⊆ T ⇒ V ⊆ T) koşulunu sağlamalıdır.
function refClosure(x,fds,all){let c=all;for(let t=0;t<=all;t++){if((t&all)!==t||(t&x)!==x)continue;if(fds.every(f=>(f.l&t)!==f.l||(f.r&t)===f.r))c&=t;}return c;}
const bits=x=>{let n=0;for(;x;x&=x-1)n++;return n;},subsetsOf=s=>{const o=[];for(let x=s;;x=(x-1)&s){o.push(x);if(!x)break;}return o;};
function refKeys(sub,fds,all){const sk=subsetsOf(sub).filter(x=>(refClosure(x,fds,all)&sub)===sub);return sk.filter(x=>!sk.some(y=>y!==x&&(y&x)===y)).sort((a,b)=>a-b);}
function refForms(sub,fds,all){const keys=refKeys(sub,fds,all),prime=keys.reduce((a,b)=>a|b,0);let n2=true,n3=true,bc=true;
  for(const x of subsetsOf(sub)){const c=refClosure(x,fds,all)&sub,sup=c===sub;for(let b=1;b<=sub;b<<=1){if(!(c&b)||(x&b))continue;if(!sup)bc=false;if(!sup&&!(prime&b))n3=false;if(!(prime&b)&&keys.some(k=>(k&x)===x&&k!==x))n2=false;}}
  return{keys,prime,n2,n3,bc};}
function refProject(fds,rels,all){const g=[];for(const r of rels)for(const x of subsetsOf(r))g.push({l:x,r:refClosure(x,fds,all)&r});return g;}
// Rastgele örnekle birleştirme sınaması: F'yi sağlayan bir ilişkiyi parçala, doğal birleştir, karşılaştır.
function joinTest(n,fds,rels,r){const rows=[];for(let i=0;i<40&&rows.length<7;i++){const t=Array.from({length:n},()=>Math.floor(r()*2));
    if(rows.every(u=>fds.every(f=>{for(let b=0;b<n;b++)if((f.l>>b&1)&&u[b]!==t[b])return true;for(let b=0;b<n;b++)if((f.r>>b&1)&&u[b]!==t[b])return false;return true;}))&&!rows.some(u=>u.join()===t.join()))rows.push(t);}
  let acc=[Array(n).fill(null)];for(const rel of rels){const proj=[...new Set(rows.map(t=>t.map((v,b)=>rel>>b&1?v:'').join(',')))].map(s=>s.split(',')),next=[];
    for(const a of acc)for(const p of proj){let okk=true;const m=a.slice();for(let b=0;b<n&&okk;b++)if(rel>>b&1){if(m[b]!==null&&String(m[b])!==p[b])okk=false;else m[b]=+p[b];}if(okk)next.push(m);}acc=next;}
  return new Set(acc.map(t=>t.join())).size===rows.length;}
{const r=rng(2026);let nonBcnf=0,lossyDep=0;
  for(let it=0;it<450;it++){const n=3+Math.floor(r()*4),all=(1<<n)-1,fds=[];for(let i=Math.floor(r()*6);i>0;i--){const l=1+Math.floor(r()*all),rr=1+Math.floor(r()*all);fds.push({l:r()<.6?l&(1<<Math.floor(r()*n)|1<<Math.floor(r()*n))||l:l,r:rr&~l||rr});}
    for(let i=0;i<6;i++){const x=Math.floor(r()*(all+1));eq(K.closure(x,fds),refClosure(x,fds,all));}
    const A=K.analyze(all,fds),ref=refForms(all,fds,all);eq([...A.keys].sort((a,b)=>a-b),ref.keys);eq(A.prime,ref.prime);eq([A.nf2.ok,A.nf3.ok,A.bcnf.ok],[ref.n2,ref.n3,ref.bc]);eq(A.tested,1<<n);
    ok(!A.nf3.ok||A.nf2.ok);ok(!A.bcnf.ok||A.nf3.ok);eq(A.highest,ref.bc?'BCNF':ref.n3?'3NF':ref.n2?'2NF':'1NF');
    for(const v of[A.nf2.viol,A.nf3.viol,A.bcnf.viol])if(v){ok((refClosure(v.l,fds,all)&v.a)===v.a&&!(v.l&v.a)&&refClosure(v.l,fds,all)!==all);}
    if(A.nf2.viol)ok(ref.keys.includes(A.nf2.viol.key)&&(A.nf2.viol.key&A.nf2.viol.l)===A.nf2.viol.l&&!(ref.prime&A.nf2.viol.a));
    const D=K.bcnfDecompose(all,fds);if(!ref.bc)nonBcnf++;eq(D.relations.reduce((a,b)=>a|b,0),all);eq(D.steps.length,D.relations.length-1);
    for(const rel of D.relations){ok(refForms(rel,fds,all).bc,'ayrışım parçası BCNF değil');eq(K.analyze(rel,fds).bcnf.ok,true);}
    ok(K.lossless(all,fds,D.relations));ok(joinTest(n,fds,D.relations,r),'BCNF ayrışımı örnekte kayıplı çıktı');
    const G=refProject(fds,D.relations,all),lost=fds.map((f,i)=>(refClosure(f.l,G,all)&f.r)===f.r?-1:i).filter(i=>i>=0),P=K.preserved(fds,D.relations);eq(P.lost,lost);eq(P.ok,lost.length===0);if(lost.length)lossyDep++;
    const Y=K.synth3NF(all,fds);eq(Y.relations.reduce((a,b)=>a|b,0),all);for(const rel of Y.relations)ok(refForms(rel,fds,all).n3,'sentez parçası 3NF değil');
    ok(K.lossless(all,fds,Y.relations));ok(joinTest(n,fds,Y.relations,r));const G3=refProject(fds,Y.relations,all);ok(fds.every(f=>(refClosure(f.l,G3,all)&f.r)===f.r),'sentez bağımlılık kaybetti');eq(K.preserved(fds,Y.relations).ok,true);
    const C=K.minimalCover(fds);for(const x of subsetsOf(all))if(refClosure(x,fds,all)!==refClosure(x,C,all))assert.fail('en küçük örtü eşdeğer değil');checks++;
    ok(C.every((f,i)=>bits(f.r)===1&&(refClosure(f.l,C.filter((_,j)=>j!==i),all)&f.r)===0));
    // ikili ayrışımlar: kayıpsız ⇔ (R1 ∩ R2) → R1 ya da (R1 ∩ R2) → R2
    for(let i=0;i<4;i++){const r1=1+Math.floor(r()*all),r2=(all&~r1)|(Math.floor(r()*(all+1))&r1);if(!r2||r2===all||r1===all)continue;const c=refClosure(r1&r2,fds,all),want=(c&r1)===r1||(c&r2)===r2;eq(K.lossless(all,fds,[r1,r2]),want);if(!want&&n<=4)checks++;}}
  ok(nonBcnf>100&&lossyDep>5,`örneklem zayıf: ${nonBcnf}, ${lossyDep}`);}
{const names=(S,list)=>list.map(k=>K.setText(k,S.attrs));
  let S=K.parseSchema('ABCDE','A -> BC\nCD -> E\nB -> D\nE -> A'),A=K.analyze(S.all,S.fds);eq(names(S,A.keys).sort(),['A','BC','CD','E']);eq(A.highest,'3NF');eq(K.setText(K.closure(S.fds[1].l,S.fds),S.attrs),'ABCDE');
  S=K.parseSchema('Sehir, Sokak, PostaKodu','Sehir, Sokak -> PostaKodu\nPostaKodu -> Sehir');A=K.analyze(S.all,S.fds);eq(names(S,A.keys),['Sehir, Sokak','Sokak, PostaKodu']);eq(A.highest,'3NF');
  let D=K.bcnfDecompose(S.all,S.fds);eq(names(S,D.relations),['Sehir, PostaKodu','Sokak, PostaKodu']);eq(K.preserved(S.fds,D.relations),{ok:false,lost:[0]});ok(K.lossless(S.all,S.fds,D.relations));
  // bu şemanın HİÇBİR kayıpsız BCNF ayrışımı bağımlılıkları korumaz: bütün örtüleri kaba kuvvetle dene
  {const cand=subsetsOf(S.all).filter(x=>x&&x!==S.all);let found=false;for(let mask=1;mask<1<<cand.length;mask++){const rels=cand.filter((_,i)=>mask>>i&1);if(rels.reduce((a,b)=>a|b,0)!==S.all)continue;
      if(rels.every(rr=>refForms(rr,S.fds,S.all).bc)&&K.lossless(S.all,S.fds,rels)&&S.fds.every(f=>(refClosure(f.l,refProject(S.fds,rels,S.all),S.all)&f.r)===f.r))found=true;}ok(!found,'adres şemasında hem BCNF hem bağımlılık koruyan ayrışım bulundu');}
  eq(names(S,K.synth3NF(S.all,S.fds).relations),['Sehir, Sokak, PostaKodu']);
  S=K.parseSchema('OgrNo, Ders, Ad, Bolum, Not','OgrNo -> Ad, Bolum\nOgrNo, Ders -> Not');A=K.analyze(S.all,S.fds);eq(names(S,A.keys),['OgrNo, Ders']);eq(A.highest,'1NF');eq([A.tested,A.superkeys],[32,8]);eq(K.setText(A.nf2.viol.l,S.attrs),'OgrNo');
  D=K.bcnfDecompose(S.all,S.fds);eq(names(S,D.relations),['OgrNo, Ad, Bolum','OgrNo, Ders, Not']);eq(K.preserved(S.fds,D.relations).ok,true);
  S=K.parseSchema('OgrNo, Bolum, Fakulte','OgrNo -> Bolum\nBolum -> Fakulte');eq(K.analyze(S.all,S.fds).highest,'2NF');
  S=K.parseSchema('ABCD','AB -> C\nC -> D\nD -> A');A=K.analyze(S.all,S.fds);eq(names(S,A.keys).sort(),['AB','BC','BD']);eq(A.highest,'3NF');eq(A.nonprime,0);
  S=K.parseSchema('ABC','');eq(names(S,K.analyze(S.all,S.fds).keys),['ABC']);eq(K.analyze(S.all,S.fds).highest,'BCNF');eq(K.lossless(7,[],[3,6]),false);eq(K.lossless(7,[{l:2,r:4}],[3,6]),true);
  for(const bad of[['',''],['A B','A -> Z'],['A B','A B'],['A A','A -> A'],['A B C D E F G H I J K','A -> B'],['A B','-> A']]){assert.throws(()=>K.parseSchema(bad[0],bad[1]),e=>e.fd===true);checks++;}}
const fdChecks=checks-treeChecks-sqlChecks;

/* ================= 4. İşlem çizelgeleri ================= */
const INIT={A:100,B:50,C:20};
function perms(a){return a.length<2?[a]:a.flatMap((x,i)=>perms(a.filter((_,j)=>j!==i)).map(p=>[x,...p]));}
// Başvuru yürütücü ve tanımdan çakışma eşdeğerliği (yalnız R/W adımları, hepsi kalıcı).
function refRun(ops){const dbs={...INIT},loc={},reads={};for(const o of ops){loc[o.t]??={};reads[o.t]??=[];if(o.k==='R'){loc[o.t][o.item]=dbs[o.item];reads[o.t].push(dbs[o.item]);}else if(o.k==='W'){const v=o.val!==undefined?o.val:loc[o.t][o.item]+o.add;dbs[o.item]=v;loc[o.t][o.item]=v;}}return{dbs,reads};}
const refConf=(a,b)=>a.t!==b.t&&a.item===b.item&&a.item!==undefined&&(a.k==='W'||b.k==='W');
function refEquivalentOrders(ops){const txs=[...new Set(ops.map(o=>o.t))].sort();return perms(txs).filter(p=>{const ser=p.flatMap(t=>ops.filter(o=>o.t===t));
    for(let i=0;i<ops.length;i++)for(let j=i+1;j<ops.length;j++)if(refConf(ops[i],ops[j])&&ser.indexOf(ops[i])>ser.indexOf(ops[j]))return false;return true;});}
{const r=rng(4242);let ser=0,non=0;
  for(let it=0;it<600;it++){const nt=2+Math.floor(r()*2),progs=[];for(let t=1;t<=nt;t++){const p=[],read=new Set();for(let i=1+Math.floor(r()*3);i>0;i--){const item=pick(r,['A','B','C']);
        if(r()<.5){p.push({t,k:'R',item});read.add(item);}else if(read.has(item))p.push({t,k:'W',item,add:1+Math.floor(r()*9)});else p.push({t,k:'W',item,val:Math.floor(r()*50)});}p.push({t,k:'C'});progs.push(p);}
    const ops=[],idx=progs.map(()=>0);while(idx.some((v,i)=>v<progs[i].length)){const i=Math.floor(r()*nt);if(idx[i]<progs[i].length)ops.push(progs[i][idx[i]++]);}
    const textOf=o=>o.k==='C'?'C'+o.t:o.k==='R'?`R${o.t}(${o.item})`:`W${o.t}(${o.item}=${o.val!==undefined?o.val:o.item+'+'+o.add})`,sched=ops.map(textOf).join(' ');
    const P=K.parseSchedule(sched);eq(K.scheduleText(P),sched);const pr=K.precedence(P,INIT),want=refEquivalentOrders(ops),sc=K.serialCompare(P,INIT),run=K.runSchedule(P,INIT),rr=refRun(ops);
    eq(pr.serializable,want.length>0,sched);eq(plain(pr.orders).map(String).sort(),want.map(String).sort(),sched);eq(pr.cycle===null,want.length>0);
    if(pr.cycle){for(let i=0;i+1<pr.cycle.length;i++)ok(pr.edges.some(e=>e.from===pr.cycle[i]&&e.to===pr.cycle[i+1]));eq(pr.cycle[0],pr.cycle[pr.cycle.length-1]);non++;}else ser++;
    eq(run.final,rr.dbs);eq(sc.rows.length,nt===2?2:6);eq(sc.rows.filter(x=>x.conflictEq).map(x=>String(x.order)).sort(),want.map(String).sort());
    for(const row of sc.rows){const s2=refRun(row.order.flatMap(t=>ops.filter(o=>o.t===t)));eq(row.final,s2.dbs);eq(row.sameFinal,JSON.stringify(s2.dbs)===JSON.stringify(rr.dbs));
      if(row.conflictEq){ok(row.sameFinal&&row.sameReads,'çakışma eşdeğeri seri sıra farklı sonuç verdi: '+sched);} // kuram: çakışma eşdeğerliği ⇒ aynı okumalar ve aynı son durum
      eq(row.sameReads,row.order.every(t=>JSON.stringify(s2.reads[t]??[])===JSON.stringify(rr.reads[t]??[])));}
    // seri çizelgede hiçbir aykırılık kalıbı bulunmamalı
    if(it<150){const serial=K.parseSchedule(progs.flat().map(textOf).join(' '));eq(K.anomalies(serial),[]);ok(K.precedence(serial,INIT).serializable);}}
  ok(ser>100&&non>100,`örneklem dengesiz: ${ser} / ${non}`);}
{const go=s=>{const o=K.parseSchedule(s);return{o,run:K.runSchedule(o,INIT),p:K.precedence(o,INIT),sc:K.serialCompare(o,INIT),an:plain(K.anomalies(o)).map(a=>a.type)};};
  let x=go('R1(A) R2(A) W1(A=A+10) W2(A=A+20) C1 C2');eq(x.run.final,{A:120,B:50,C:20});eq(x.p.cycle,[1,2,1]);eq(x.an,['lost']);eq(x.sc.rows.map(r=>r.final.A),[130,130]);eq(x.sc.anySameFinal,false);
  x=go('R1(A) W1(A=A-60) R2(A) W2(B=A) RB1 C2');eq(x.run.final,{A:100,B:40,C:20});eq(x.an,['dirty']);eq(x.p.serializable,true);eq(x.p.committed,[2]);eq(x.sc.rows[0].final,{A:100,B:100,C:20});eq(x.sc.anySameAll,false);
  x=go('R1(A) R2(A) W2(A=A-30) C2 R1(A) C1');eq(x.run.reads[1],['A=100','A=70']);eq(x.an,['nonrep']);eq(x.p.serializable,false);eq(x.sc.anySameFinal,true);eq(x.sc.anySameAll,false);
  x=go('S1 I2(D=30) C2 S1 C1');eq(x.run.reads[1],['say=3,toplam=170','say=4,toplam=200']);eq(x.an,['phantom']);eq(x.p.serializable,false);eq(x.run.final,{A:100,B:50,C:20,D:30});
  x=go('R1(A) W1(A=A-10) R2(B) W2(B=B*2) C2 R1(B) W1(B=B+10) C1');eq(x.run.final,{A:90,B:110,C:20});eq(x.p.orders,[[2,1]]);eq(x.an,[]);eq(x.sc.rows.find(r=>r.conflictEq).sameReads,true);
  x=go('R1(A) W1(A=A+10) C1 R2(A) W2(A=A+20) C2');eq(x.run.final.A,130);eq(x.p.orders,[[1,2]]);eq(x.an,[]);
  x=go('R1(A) W2(A=1) R2(B) W3(B=2) R3(C) W1(C=3) C1 C2 C3');eq(x.p.cycle,[1,2,3,1]);eq(x.sc.rows.length,6);eq(x.sc.rows.filter(r=>r.conflictEq).length,0);ok(x.sc.rows.every(r=>r.sameFinal&&!r.sameReads));
  x=go('I1(D=7) W1(D=D*2) RB1 R2(A) C2');eq(x.run.final,INIT);x=go('R1(A)   W1( A = A + 2*3 - 1 )');eq(x.run.final.A,105);eq(x.p.committed,[]);
  for(const bad of['R1','W1(A=)','Q1(A)','R4(A)','C1 R1(A)','R1(a)','I1(D)','R1(A=3)','W1(A=A++1)','']){assert.throws(()=>K.parseSchedule(bad),e=>e.tx===true,bad);checks++;}
  for(const bad of['W1(A)','W1(A=B+1)','R1(Z)','I1(A=3)','W1(Z=1)']){assert.throws(()=>K.runSchedule(K.parseSchedule(bad),INIT),e=>e.tx===true,bad);checks++;}}
// Yalıtım düzeyi tablosu: PostgreSQL 18 belgeleri, Tablo 13.1'den elle aktarılmış başvuru (P = possible, N = not possible, * = allowed but not in PG)
{const doc={'READ UNCOMMITTED':['*','P','P','P'],'READ COMMITTED':['N','P','P','P'],'REPEATABLE READ':['N','N','*','P'],'SERIALIZABLE':['N','N','N','N']};
  eq(K.ISOLATION.phenomena,['dirty','nonrep','phantom','serialization']);eq(K.ISOLATION.levels.length,4);
  for(const l of K.ISOLATION.levels)eq(l.allows.map((a,i)=>a?(l.pg[i]?'*':'P'):'N'),doc[l.name]);ok(Object.isFrozen(K)&&Object.isFrozen(K.ISOLATION));}
const txChecks=checks-treeChecks-sqlChecks-fdChecks;
const f=n=>n.toLocaleString('tr-TR');
console.log(`G veritabanları: ${f(checks)} bağımsız çekirdek kontrolü PASS (B+ağacı ${f(treeChecks)}, SQL ${f(sqlChecks)}, bağımlılıklar ${f(fdChecks)}, çizelgeler ${f(txChecks)})`);

/* ================= Tarayıcı ================= */
if(process.argv.includes('--browser')){
  const{createRequire}=await import('node:module');const{createServer}=await import('node:http');const{join,extname}=await import('node:path');const{fileURLToPath}=await import('node:url');const root=fileURLToPath(new URL('../',import.meta.url));
  let chromium;for(const dir of[root,...(process.env.NODE_PATH||'').split(':').filter(Boolean),'/opt/node-tools']){try{({chromium}=createRequire(join(dir,'package.json'))('playwright'));break;}catch{}}
  assert(chromium,'playwright bulunamadı');
  const server=createServer((req,res)=>{const file=join(root,decodeURIComponent(new URL(req.url,'http://localhost').pathname));if(!file.startsWith(root)||!fs.existsSync(file)||fs.statSync(file).isDirectory()){res.writeHead(404).end();return;}res.setHeader('Content-Type',({'.html':'text/html; charset=utf-8','.js':'text/javascript; charset=utf-8','.css':'text/css; charset=utf-8'})[extname(file)]||'application/octet-stream');res.end(fs.readFileSync(file));});
  await new Promise(r=>server.listen(0,'127.0.0.1',r));let browser;const before=checks;
  try{browser=await chromium.launch();
    for(const[theme,width]of[['light',390],['dark',1280]]){const ctx=await browser.newContext({viewport:{width,height:900},deviceScaleFactor:width<500?2:1});await ctx.addInitScript(t=>{localStorage.setItem('acelya-theme',t);localStorage.setItem('acelya-sound-muted','1');},theme);
      const page=await ctx.newPage();page.setDefaultTimeout(6000);const errors=[];page.on('pageerror',e=>errors.push(e.message));page.on('console',m=>{if(m.type()==='error'&&!/404|Failed to load resource/.test(m.text()))errors.push(m.text());});
      await page.goto(`http://127.0.0.1:${server.address().port}/veritabanlari.html`);
      const click=id=>page.locator('#'+id).click(),read=async id=>(await page.locator('#'+id).textContent()).replace(/\s+/g,' ').trim(),has=async(id,t)=>{const v=await read(id);assert(v.includes(t),`[${width}] #${id}: "${v.slice(0,160)}" içinde "${t}" yok`);checks++;},
        lacks=async(id,t)=>{const v=await read(id);assert(!v.includes(t),`[${width}] #${id} "${t}" içermemeli`);checks++;},sel=(id,v)=>page.locator('#'+id).selectOption(v),fill=(id,v)=>page.locator('#'+id).fill(v),
        noOverflow=async()=>{eq(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),true,`[${width}] yatay taşma`);};
      eq(await page.locator('h1').count(),1);await has('tab-sql','SQL');eq(await page.evaluate(()=>Object.isFrozen(DbLab)&&!Object.getOwnPropertyDescriptor(window,'DbLab').writable),true);
      // her denetimin etiketi var; düğmelerin adı var
      eq(await page.evaluate(()=>[...document.querySelectorAll('main input,main select,main textarea')].filter(e=>!(e.labels&&e.labels.length)&&!e.getAttribute('aria-label')).map(e=>e.id)),[]);
      eq(await page.evaluate(()=>[...document.querySelectorAll('main button')].filter(b=>!(b.textContent.trim()||b.getAttribute('aria-label'))).length),0);
      eq(await page.evaluate(()=>[...document.querySelectorAll('main canvas')].every(c=>c.getAttribute('role')==='img'&&c.getAttribute('aria-label'))),true);
      /* --- 01 SQL --- */
      await has('sqlStatus','6 satır döndü');await has('sqlReads','690');await has('sqlReadsTh','öngörü 690 · fark 0');await has('sqlCmp','660');await has('sqlCmpTh','660 · fark 0');await has('sqlVisits','0');await has('sqlPlan','⋈ k.id = o.kitap_id');await has('sqlPlan','σ o.iade IS NULL');await has('sqlSteps','30 · 12 = 360');
      eq(await page.locator('#sqlResult tbody tr').count(),6);eq(await page.locator('#sqlTables table').count(),4);eq(await page.locator('#sqlTruth tr').count(),9);
      await page.locator('#useIndex').check();await has('sqlReads','90');await has('sqlReadsTh','indekssiz 690');await has('sqlVisits','120');await has('sqlVisitsTh','120 · fark 0');await has('sqlCompare','indekssiz 690 satır okuması; indeksle 90');eq(await page.locator('#sqlResult tbody tr').count(),6);
      await sel('sqlPreset','point');await has('sqlReads','1');await has('sqlVisits','3');await has('sqlSteps','h = 3 düğüm');await has('sqlSteps','tam tarama 30 satır okurdu');
      await page.locator('#useIndex').uncheck();await has('sqlReads','30');await has('sqlVisitsTh','indeks kullanılmadı');
      await sel('sqlPreset','eqnull');await has('sqlStatus','0 satır döndü');await has('sqlStatus','IS NULL');await sel('sqlPreset','isnull');await has('sqlResult','Umut');
      await sel('sqlPreset','neq');eq(await page.locator('#sqlResult tbody tr').count(),7);await lacks('sqlResult','Umut');
      await sel('sqlPreset','left');await has('sqlResult','Barış');await has('sqlResult','Şule');await has('sqlPlan','⟕');eq(await page.locator('#sqlResult tbody tr').count(),2);
      await sel('sqlPreset','group');await has('sqlPlan','γ g.ad ; COUNT(*)');await has('sqlRowsOutTh','grup');await sel('sqlPreset','leftcount');await has('sqlResult','Kimya');
      await sel('sqlPreset','agg');await has('sqlResult','2015,5');await has('sqlResult','2012,333');await sel('sqlPreset','distinct');await has('sqlPlan','δ');await sel('sqlPreset','bool');await sel('sqlPreset','all');eq(await page.locator('#sqlResult tbody tr').count(),12);await sel('sqlPreset','fk');await has('sqlResult','2026');
      await fill('sqlText',"SELECT ad FROM ogrenciler\nWHERE sinif = 'iki'");await click('sqlRun');await has('sqlStatus','Hata (satır 2, sütun 13)');await has('sqlStatus','Tip uyuşmazlığı');eq(await page.locator('#sqlError').isVisible(),true);await has('sqlError','^');await has('sqlReads','—');
      await fill('sqlText','');await click('sqlRun');await has('sqlStatus','SELECT ile başlamalı');
      await fill('sqlText','select count(*) as n from odunc');await page.locator('#sqlText').press('Control+Enter');await has('sqlResult','30');eq(await page.locator('#sqlError').isHidden(),true);
      await click('sqlReset');await has('sqlReads','690');eq(await page.locator('#useIndex').isChecked(),false);eq(await page.locator('#sqlPreset').inputValue(),'join');await noOverflow();
      /* --- sekme klavyesi --- */
      await page.locator('#tab-sql').focus();await page.keyboard.press('ArrowRight');eq(await page.locator('#tab-btree').getAttribute('aria-selected'),'true');eq(await page.locator('#panel-sql').isHidden(),true);
      await page.keyboard.press('End');eq(await page.locator('#tab-norm').getAttribute('aria-selected'),'true');await page.keyboard.press('ArrowRight');eq(await page.locator('#tab-sql').getAttribute('aria-selected'),'true');await page.keyboard.press('Home');await page.keyboard.press('ArrowLeft');eq(await page.locator('#tab-norm').getAttribute('aria-selected'),'true');
      /* --- 02 B+ağacı --- */
      await click('tab-btree');await has('treeN','12 anahtar · 4 yaprak');await has('treeH','2');await has('treeHTh','2 ≤ h ≤ 3');await has('treeFill','%75,0');await has('treeInvHead','Değişmezler sağlanıyor');await has('treeVisit','—');
      ok(await page.locator('#treeCanvas').evaluate(c=>c.width>100&&c.getAttribute('aria-label').includes('2 düzey')));
      await sel('treeSpeed','instant');await click('treeSearch');await has('treeStatus','45 yok');await has('treeVisit','2');await has('treeVisitTh','h = 2 · fark 0');await has('treeCmpTh','sınır içinde');
      await click('treeInsert');await has('treeN','13 anahtar · 4 yaprak');await has('treeOps','0 bölünme');await fill('treeKey','33');await click('treeInsert');await has('treeOps','1 bölünme');await has('treeN','14 anahtar · 5 yaprak');await has('treeLog','üst düğüme kopyalandı');
      await click('treeInsert');await has('treeStatus','zaten yaprakta');await has('treeN','14 anahtar');
      await click('treeRange');await has('treeStatus','25 … 60 aralığında 8 anahtar: 25, 30, 33, 35, 40, 45, 50, 60');await has('treeVisitTh','fark 0');
      await click('stepPrev');await has('stepInfo','/');eq(await page.locator('#stepNext').isDisabled(),false);await click('stepEnd');eq(await page.locator('#stepNext').isDisabled(),true);
      await sel('treeSpeed','manual');await fill('treeKey','34');await click('treeInsert');await has('stepInfo','Adım 1 /');await click('stepNext');await has('stepInfo','Adım 2 /');await page.locator('#stepEnd').evaluate(b=>b.disabled||b.click());await has('treeN','15 anahtar');
      await sel('treeSpeed','fast');await fill('treeKey','36');await click('treeInsert');await page.waitForFunction(()=>document.getElementById('stepNext').disabled,null,{timeout:8000});await has('treeN','16 anahtar');await has('treeInvHead','Değişmezler sağlanıyor');
      await sel('treeSpeed','instant');for(const k of['10','15','20','25','30','33','34','35','36','40','45','50','60','70','80']){await fill('treeKey',k);await click('treeDelete');await has('treeInvHead','Değişmezler sağlanıyor');}
      await has('treeN','1 anahtar · 1 yaprak');await has('treeH','1');await click('treeDelete');await has('treeStatus','yok');await fill('treeKey','90');await click('treeDelete');await has('treeN','0 anahtar');await has('treeFill','—');await click('treeSearch');await has('treeStatus','90 yok');
      for(const bad of['0','abc','1000','4.5','']){await fill('treeKey',bad);await click('treeInsert');await has('treeStatus','1 ile 999 arasında');}await fill('rangeLo','70');await fill('rangeHi','20');await click('treeRange');await has('treeStatus','baş, sondan büyük olamaz');
      await click('bulkAsc');await has('treeN','30 anahtar · 10 yaprak');await has('treeFill','%75,0');await has('treeFillTh','öngörü: 10 yaprak, %75,0 · yaprak farkı 0');await has('treeH','3');
      await click('bulkDesc');await has('treeN','30 anahtar · 14 yaprak');await has('treeFillTh','öngörü: 14 yaprak');await has('treeFillTh','yaprak farkı 0');
      await sel('bulkN','60');await click('bulkRandom');await has('treeN','60 anahtar');await has('treeInvHead','Değişmezler sağlanıyor');await has('treeHTh','sınırlar içinde');eq(await page.evaluate(()=>{const w=document.getElementById('treeScroll');return w.scrollWidth>=w.clientWidth;}),true);await noOverflow();
      for(const m of['3','5','6','4']){await sel('treeOrder',m);await has('treeInvHead','Değişmezler sağlanıyor');await has('treeN','60 anahtar');await has('bulkCap','m = '+m);await has('bulkRows','sağlanıyor');await lacks('bulkRows','bozuk');}
      await has('bulkRows','333 (fark 0)');await has('bulkRows','499 (fark 0)');await has('bulkRows','%75,1');await has('bulkRows','%50,1');const b1=await read('bulkRows');await click('bulkSeed');await has('bulkSeedInfo','tohumu: 2');ok(await read('bulkRows')!==b1);
      await click('treeCorrupt');await has('treeInvHead','Değişmez bozuk');await has('treeInvList','sıra bozuk');eq(await page.locator('#treeCorrupt').getAttribute('aria-pressed'),'true');await click('treeCorrupt');await has('treeInvHead','Değişmezler sağlanıyor');
      await click('treeReset');await has('treeN','12 anahtar · 4 yaprak');eq(await page.locator('#treeOrder').inputValue(),'4');eq(await page.locator('#treeKey').inputValue(),'45');await noOverflow();
      /* --- 03 Normalizasyon --- */
      await click('tab-norm');await has('fdKeys','{OgrNo, Ders}');await has('fdHighest','1NF');await has('fdKeysTh','32 alt küme denendi: 8 üst anahtar, 1 aday anahtar');await has('fdNF','kısmi bağımlılık');await has('fdClosureResult','{OgrNo}⁺ = {OgrNo, Ad, Bolum}');await has('fdBcnfRels','(OgrNo, Ders, Not)');await has('fdBcnfTh','kayıpsız · bağımlılıklar korunuyor');
      await sel('fdPreset','gecisli');await has('fdHighest','2NF');await sel('fdPreset','adres');await has('fdHighest','3NF');await has('fdKeys','{Sehir, Sokak}, {Sokak, PostaKodu}');await has('fdBcnfTh','kayıpsız · 1 bağımlılık korunmuyor');await has('fdBcnfCheck','Sehir, Sokak → PostaKodu');await has('fdSynthRels','(Sehir, Sokak, PostaKodu)');await has('fdSynthCheck','bütün bağımlılıklar korunuyor');
      await sel('fdPreset','klasik');await has('fdKeys','{A}, {E}, {BC}, {CD}');await has('fdHighest','3NF');await has('fdClosureResult','{CD}⁺ = {ABCDE}');await has('fdClosureResult','aday anahtar');await sel('fdPreset','dongu');await has('fdPrimeTh','asal olmayanlar: yok');await sel('fdPreset','bcnf');await has('fdHighest','BCNF');await has('fdBcnfSteps','zaten BCNF');await sel('fdPreset','bos');await has('fdKeys','{ABC}');
      await fill('fdList','A -> Z');await has('fdStatus','Girdi hatası');await has('fdKeys','—');await fill('fdList','A -> B\nB -> C');await has('fdHighest','2NF');await fill('fdClosure','B');await has('fdClosureResult','{B}⁺ = {BC}');await fill('fdClosure','Q');await has('fdClosureResult','okunamadı');await fill('fdAttrs','');await has('fdStatus','En az bir nitelik');
      await sel('fdPreset','kayit');await has('fdHighest','1NF');
      await has('txFinal','A = 120, B = 50, C = 20');await has('txGraph','Döngü var');await has('txBrute','0 / 2');await has('txAgree','Uyuşuyor');await has('txAnomalies','Kayıp güncelleme');await has('txSerial','A = 130');eq(await page.locator('#txTimeline tbody tr').count(),6);eq(await page.locator('#txIso tbody tr').count(),4);await has('txIso','PostgreSQL');
      ok(await page.locator('#txCanvas').evaluate(c=>c.width>100&&c.getAttribute('aria-label').includes('Döngü var')));
      await sel('txPreset','dirty');await has('txFinal','B = 40');await has('txAnomalies','Kirli okuma');await has('txGraph','Döngü yok');await has('txStatus','kurtarılabilirlik');await has('txIsoNote','kirli okuma: en az READ COMMITTED');
      await sel('txPreset','nonrep');await has('txAnomalies','Yinelenemeyen okuma');await has('txIsoNote','en az REPEATABLE READ');await has('txStatus','son duruma bakmak yetmez');
      await sel('txPreset','phantom');await has('txAnomalies','Hayalet okuma');await has('txIsoNote','hayalet okuma: en az SERIALIZABLE');await has('txFinal','D = 30');
      await sel('txPreset','ok');await has('txGraph','Döngü yok');await has('txGraphTh','T2 → T1');await has('txBrute','1 / 2');await has('txAnomalies','bulunmadı');await has('txIsoNote','hiçbiri görülmedi');
      await sel('txPreset','three');await has('txBrute','0 / 6');await has('txGraphTh','T1 → T2 → T3 → T1');eq(await page.locator('#txSerial tr').count(),6);
      await sel('txPreset','serial');await has('txBrute','1 / 2');await has('txFinal','A = 130');
      // seri çizelgeden kayıp güncellemeye: 3. adımı (C1) iki kez aşağı, sonra R2'yi yukarı taşı
      await page.locator('button[aria-label="3. adımı aşağı taşı"]').click();await page.locator('button[aria-label="4. adımı aşağı taşı"]').click();await has('txGraph','Döngü yok');
      await page.locator('button[aria-label="3. adımı yukarı taşı"]').click();await has('txGraph','Döngü var');await has('txFinal','A = 120');await has('txAnomalies','Kayıp güncelleme');eq(await page.locator('#txText').inputValue(),'R1(A) R2(A) W1(A=A+10) W2(A=A+20) C1 C2');
      eq(await page.locator('button[aria-label="1. adımı yukarı taşı"]').isDisabled(),true);
      // gerçek fareyle aynı noktaya iki kez basmak ilk taşımayı geri almamalı: taşınan adım (C1) ilerlemeyi sürdürür
      {await sel('txPreset','serial');const b=page.locator('button[aria-label="3. adımı aşağı taşı"]');await b.scrollIntoViewIfNeeded();const bx=await b.boundingBox(),x=bx.x+bx.width/2,y=bx.y+bx.height/2;
        await page.mouse.move(x,y);await page.mouse.click(x,y);eq(await page.locator('#txText').inputValue(),'R1(A) W1(A=A+10) R2(A) C1 W2(A=A+20) C2');
        await page.mouse.click(x,y);eq(await page.locator('#txText').inputValue(),'R1(A) W1(A=A+10) R2(A) W2(A=A+20) C1 C2');await has('txAnomalies','Kirli okuma');await has('txGraph','Döngü yok');
        // imleç başka yere gidip dönünce düğme yeniden o satırdaki adımı taşır
        await sel('txPreset','serial');await page.mouse.move(x,y);await page.mouse.click(x,y);await page.mouse.move(x+40,y+90,{steps:3});await page.mouse.move(x,y,{steps:3});await page.mouse.click(x,y);eq(await page.locator('#txText').inputValue(),'R1(A) W1(A=A+10) C1 R2(A) W2(A=A+20) C2');
        // klavyede odak taşınan adımla gider
        await sel('txPreset','serial');await page.locator('button[aria-label="3. adımı aşağı taşı"]').focus();await page.keyboard.press('Enter');await page.keyboard.press('Enter');eq(await page.locator('#txText').inputValue(),'R1(A) W1(A=A+10) R2(A) W2(A=A+20) C1 C2');}
      await fill('txText','R1(A) W1(A=A+1) Q2');await click('txLoad');await has('txStatus','çalıştırılamadı');await has('txFinal','—');await fill('txText','W1(B=B+1) C1');await page.locator('#txText').press('Enter');await has('txStatus','daha önce okumadı');
      await fill('txText','r1(A) w1(A=A*2) c1');await click('txLoad');await has('txFinal','A = 200');await has('txBrute','1 / 1');
      await click('normReset');await has('txFinal','A = 120');await has('fdHighest','1NF');eq(await page.locator('#txPreset').inputValue(),'lost');await noOverflow();
      // R kısayolu: form denetiminde değilken etkin sekmeyi sıfırlar
      await sel('txPreset','three');await page.locator('h1').click();await page.keyboard.press('r');await has('txBrute','0 / 2');
      await click('tab-sql');await sel('sqlPreset','all');await page.locator('#sqlText').press('r');eq(await page.locator('#sqlPreset').inputValue(),'all');await page.locator('h1').click();await page.keyboard.press('r');eq(await page.locator('#sqlPreset').inputValue(),'join');
      // indeks açıkken FROM tablosundaki eşitlik birleştirmelerden önce uygulanır; sayfa bunu açıkça söyler, mantıksal plan değişmez
      await click('tab-sql');await sel('sqlPreset','fk');await has('sqlRowsOutTh','birleştirmelerden 30');await lacks('sqlStatus','aşağı itildi');await page.locator('#useIndex').check();
      await has('sqlRowsOutTh','birleştirmelerden 7');await has('sqlStatus','odunc.ogrenci_id = 7 eşitliği en başta');await has('sqlStatus','birleştirmelere 30 yerine 7 satır girdi');await has('sqlStatus','mantıksal plandaki σ yerinde durur');await has('sqlPlan','σ o.ogrenci_id = 7');eq(await page.locator('#sqlResult tbody tr').count(),7);
      await sel('sqlPreset','join');await lacks('sqlStatus','aşağı itildi');await page.locator('#useIndex').uncheck();await has('panel-sql','Tek ayrıcalık «İndeks kullan» açıkken görülür');
      await click('tab-btree');await click('treeReset');await has('treeStatus','Kutudaki 45 henüz ağaçta yok');
      for(const t of['sql','btree','norm']){await click('tab-'+t);await noOverflow();}
      eq(await page.evaluate(()=>/[̀-ͯ]/.test(document.querySelector('main').innerText.normalize('NFC'))),false);
      eq(await page.evaluate(()=>/\p{Extended_Pictographic}/u.test(document.querySelector('main').innerText.replace(/[↑↓→←]/g,''))),false);
      assert.deepEqual(errors,[],`[${width}] konsol hataları`);checks++;await ctx.close();}
    console.log(`G veritabanları: ${f(checks-before)} tarayıcı kontrolü PASS (390 px açık tema ve 1280 px koyu tema)`);
  }finally{await browser?.close();await new Promise(r=>server.close(r));}
}
