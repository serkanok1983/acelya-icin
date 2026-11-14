// G · gen-muhendisligi: çekirdek, sayfanın formüllerini yinelemeyen bağımsız referanslarla sınanır.
// Kesim: diziyi düzenli ifadeyle tarayan ayrı bir uygulama, parça toplamının korunumu, açılan kaynaktaki
// tanıma dizileri ve kesim yerleri. PCR: platosuz kapalı biçim, Cq'nun kapalı çözümü, standart eğriden
// verimin geri kazanılması. Primer: elle sayımla Wallace ve GC formülleri. Bilgisayarda PCR: indexOf ile
// bağımsız konum bulma. Dizileme: gürültüsüz okumada tam doğruluk, Poisson kapalı biçimi. CRISPR: NGG
// yerlerini ayrı bir tarayıcıyla bulma, kesimin PAM'dan 3 bp önce olması, eşleşmezliklerin kaba kuvvetle
// sayılması. Onarım: çerçeve kayması oranının sayımla hesaplanması. Ayrıştırıcı ve 1 650 üretilmiş soru,
// sorunun metninden bağımsız yeniden hesaplanarak. `--browser` arayüzü 390 px açık ve 1280 px koyu temada dener.
import fs from 'node:fs';
import assert from 'node:assert/strict';
const SLUG='gen-muhendisligi';
const html=fs.readFileSync(new URL('../'+SLUG+'.html',import.meta.url),'utf8');
const source=html.split('/* KERNEL-BEGIN */')[1]?.split('/* KERNEL-END */')[0];
assert(source,'Çekirdek sınır işaretleri gerekli');
const K=new Function('"use strict";'+source+';return GenLab;')();
let checks=0;
const eq=(a,b,msg)=>{assert.equal(a,b,(msg??'')+` · ${a} ≠ ${b}`);checks++;};
const ok=(c,msg)=>{assert(c,msg??'koşul sağlanmadı');checks++;};
const near=(a,b,tol,msg)=>{assert(Math.abs(a-b)<=tol,(msg||'')+` ${a} ≠ ${b} (±${tol})`);checks++;};
const rel=(a,b,r,msg)=>near(a,b,r*Math.abs(b),msg);
const M='−',N=' ';
ok(Object.isFrozen(K)&&Object.isFrozen(K.ENZYMES)&&Object.isFrozen(K.SEQS)&&Object.isFrozen(K.MISTAKES)&&Object.isFrozen(K.GOALS));

/* ── Sayı biçimi ── */
eq(K.fmt(-3.25,2),M+'3,25');eq(K.fmt(12345.6,1),'12'+N+'345,6');eq(K.fmt(9999,0),'9999');
eq(K.fmtSci(1.073741824e9,2),'1,07 × 10⁹');eq(K.fmtSci(9.96e5,1),'1,0 × 10⁶');eq(K.pct(0.9444,1),'%94,4');
eq(K.fmtN(2635,4),'2635');eq(K.fmtN(250000,3),'2,50 × 10⁵');

/* ── Diziler ── */
const PUC=K.SEQS.find(s=>s.id==='puc19').seq;
eq(PUC.length,2686,'GenBank L09137.2 · 2686 bp');
ok(/^TCGCGCGTTTCGGTGATGACGGTGAAAACCTCTGACACATGCAGCTCCCGG/.test(PUC),'dizinin başı GenBank kaydıyla aynı');
ok(PUC.includes('GAATTCGAGCTCGGTACCCGGGGATCCTCTAGAGTCGACCTGCAGGCATGCAAGCTT'),'çoklu klonlama bölgesi');
eq(K.revcomp('GAATTC'),'GAATTC','palindrom');eq(K.revcomp('ACGT'),'ACGT');eq(K.revcomp('AAGCTT'),'AAGCTT');
eq(K.revcomp('CTGCAG'),'CTGCAG');eq(K.clean(' acg-t x '),'ACGT');
near(K.gcFrac('GGCCAATT'),0.5,1e-12);
for(const s of K.SEQS)if(s.seq)eq(/^[ACGT]+$/.test(s.seq),true,s.id);
eq(K.SEQS.find(s=>s.id==='synA').seq.length,1200);eq(K.SEQS.find(s=>s.id==='synB').seq.length,420);
eq(K.randomSeq(20261113,1200),K.SEQS.find(s=>s.id==='synA').seq,'yapay dizi tohumla yeniden üretilebilir');

/* ── Enzimler: açılan kaynaklardaki tanıma dizileri, kesim yerleri ve uç türleri ── */
const REF={EcoRI:['GAATTC',1,"5'",'AATT'],BamHI:['GGATCC',1,"5'",'GATC'],BglII:['AGATCT',1,"5'",'GATC'],
  HindIII:['AAGCTT',1,"5'",'AGCT'],XbaI:['TCTAGA',1,"5'",'CTAG'],SalI:['GTCGAC',1,"5'",'TCGA'],
  XhoI:['CTCGAG',1,"5'",'TCGA'],PstI:['CTGCAG',5,"3'",'TGCA'],KpnI:['GGTACC',5,"3'",'GTAC'],
  SacI:['GAGCTC',5,"3'",'AGCT'],SmaI:['CCCGGG',3,'kör',''],EcoRV:['GATATC',3,'kör',''],
  PvuII:['CAGCTG',3,'kör',''],ScaI:['AGTACT',3,'kör',''],NdeI:['CATATG',2,"5'",'TA'],
  HaeIII:['GGCC',2,'kör',''],AluI:['AGCT',2,'kör',''],TaqI:['TCGA',1,"5'",'CG']};
eq(K.ENZYMES.length,Object.keys(REF).length);
for(const[id,[site,cut,kind,over]]of Object.entries(REF)){const e=K.enzOf(id);ok(e,id);
  eq(e.site,site,id);eq(e.cut,cut,id);const E=K.endInfo(e);eq(E.kind,kind,id);eq(E.over,over,id);
  eq(e.site,K.revcomp(e.site),id+' palindrom');
  eq(E.len,Math.abs(e.site.length-2*e.cut),id);}
/* Ligasyon: aynı çıkıntı ya da iki kör uç */
eq(K.ligate('BamHI','BglII').ok,true);eq(K.ligate('SalI','XhoI').ok,true);eq(K.ligate('SalI','TaqI').ok,false);
eq(K.ligate('SmaI','EcoRV').ok,true);eq(K.ligate('HaeIII','AluI').ok,true);eq(K.ligate('SmaI','EcoRI').ok,false);
eq(K.ligate('HindIII','SacI').ok,false,"5' AGCT ile 3' AGCT uyuşmaz");
eq(K.ligate('EcoRI','EcoRI').ok,true);
for(const a of K.ENZYMES)for(const b of K.ENZYMES){const A=K.endInfo(a),B=K.endInfo(b),r=K.ligate(a.id,b.id);
  eq(r.ok,A.kind===B.kind&&A.over===B.over,a.id+'/'+b.id);}

/* ── Kesim: bağımsız tarayıcı ── */
function sitesRef(seq,site,circular){const out=[];const ext=circular?seq+seq.slice(0,site.length-1):seq;
  let i=ext.indexOf(site);while(i!==-1){if(i<seq.length)out.push(i);i=ext.indexOf(site,i+1);}return out;}
for(const id of Object.keys(REF))for(const circ of[true,false])
  assert.deepEqual(K.findSites(PUC,REF[id][0],circ),sitesRef(PUC,REF[id][0],circ),id+(circ?' halka':' doğru')),checks++;
/* pUC19'da bilinen tek kesim yerleri (bağımsız sayım) */
for(const[id,n]of[['EcoRI',1],['BamHI',1],['HindIII',1],['SmaI',1],['PstI',1],['KpnI',1],['SacI',1],['XbaI',1],['SalI',1],['NdeI',1],['ScaI',1],['EcoRV',0],['PvuII',2],['HaeIII',11],['AluI',16],['TaqI',4]])
  eq(K.findSites(PUC,REF[id][0],true).length,n,id+' yer sayısı');
{const D=K.digest(PUC,['EcoRI','HindIII'],true);
  assert.deepEqual(D.cuts,[396,447]);checks++;assert.deepEqual(D.sizes,[2635,51]);checks++;eq(D.sum,2686);
  const e=K.enzOf('EcoRI'),h=K.enzOf('HindIII');
  eq(D.cuts[0],sitesRef(PUC,'GAATTC',true)[0]+e.cut);eq(D.cuts[1],sitesRef(PUC,'AAGCTT',true)[0]+h.cut);}
{const D=K.digest(PUC,['EcoRI'],true);eq(D.frags.length,1);eq(D.sizes[0],2686,'tek kesim halkayı doğrusallaştırır');}
{const D=K.digest(PUC,['EcoRI'],false);eq(D.frags.length,2);eq(D.sum,2686);}
{const D=K.digest(PUC,['HaeIII'],true);eq(D.frags.length,11);eq(D.sum,2686);
  assert.deepEqual(D.sizes,[587,458,434,298,267,257,174,102,80,18,11]);checks++;}
/* Halkasal: n kesim n parça, doğrusal: n + 1 parça; her zaman toplam korunur */
for(const sid of['puc19','synA','synB'])for(const ids of[['AluI'],['HaeIII'],['AluI','HaeIII'],['TaqI'],['EcoRI','PstI']]){
  const seq=K.SEQS.find(s=>s.id===sid).seq;
  for(const circ of[true,false]){const D=K.digest(seq,ids,circ);eq(D.sum,seq.length,sid+ids.join('+')+circ);
    if(D.cuts.length)eq(D.frags.length,D.cuts.length+(circ?0:1),sid+ids.join('+')+circ);}}
eq(K.digest('',['EcoRI'],true).frags.length,0);
eq(K.digest(PUC,[],true).sizes[0],2686,'enzimsiz kesim yok');
/* Halkada başlangıç noktasını aşan tanıma dizisi bulunur */
{const s='ATTCAAAAAAAAAAGA';eq(K.findSites(s,'GAATTC',true).length,1,'halkada başı aşan yer');
  eq(K.findSites(s,'GAATTC',false).length,0,'doğrusalda bulunmaz');}

/* ── Jel: log-boyut modeli ── */
for(const a of[0.7,1,1.5,2]){const g=K.gelRange(a);ok(g.lo<g.hi);
  let prev=-1;const list=[...new Set([g.hi,5000,2000,1000,500,200,g.lo])].sort((p,q)=>q-p);
  for(const s of list){if(s>g.hi||s<g.lo)continue;
    const d=K.migration(s,a).d;ok(d>prev,'küçük parça daha uzağa göçer');prev=d;}}
{const a=1,g=K.gelRange(a);
  /* Model tam olarak logaritmiktir: eşit oranlar eşit mesafeler verir */
  const d1=K.migration(1000,a).d,d2=K.migration(2000,a).d,d3=K.migration(4000,a).d;
  near(d1-d2,d2-d3,1e-12,'eşit oran = eşit mesafe');
  near(K.migration(g.hi,a).d,Math.log10(1)/1,1e-9+0.03,'üst sınır kuyuya yakın');
  eq(K.migration(g.hi*2,a).over,true);eq(K.migration(g.lo/2,a).under,true);}
{const b=K.resolveBands([2635,2600,51],1);ok(b.some(x=>x.sizes.length===2),'çok yakın iki bant birleşir');
  eq(K.resolveBands([2635,51],1).length,2);}

/* ── PCR ── */
{const p=K.pcrDefaults();
  /* Plato çok yüksekken yineleme kapalı biçme eşittir */
  const big={...p,P:1e300,n:30};const R=K.pcrRun(big);
  rel(R.last,p.N0*(1+p.E)**30,1e-9,'platosuz yineleme = kapalı biçim');
  rel(R.theory,p.N0*(1+p.E)**30,1e-12);
  for(let i=0;i<=30;i++)rel(R.copies[i],p.N0*(1+p.E)**i,1e-9,'döngü '+i);}
for(const E of[0.3,0.5,0.9,1])for(const N0 of[1,100,1e4]){const p={...K.pcrDefaults(),E,N0,P:1e300,n:120,T:1e8};
  near(K.cq(p),Math.log(1e8/N0)/Math.log(1+E),0.02,`Cq E=${E} N0=${N0}`);
  near(K.cqIdeal(N0,E,1e8),Math.log(1e8/N0)/Math.log(1+E),1e-9);}
for(const E of[0.5,0.8,1])near(K.doublingCycles(E),Math.log(2)/Math.log(1+E),1e-12);
eq(K.doublingCycles(1),1,'tam verimde bir döngü ikiye katlar');
{const p=K.pcrDefaults();const R=K.pcrRun(p);ok(R.last<p.P,'plato aşılmaz');ok(R.last<R.theory,'plato kuramın altında');
  const c=K.cq(p);ok(c>0&&c<p.n);near(c,K.cqIdeal(p.N0,p.E,p.T),0.05,'eşik üstel evredeyken Cq kapalı çözüme eşit');}
eq(K.cq({...K.pcrDefaults(),n:5}),null,'eşik aşılmazsa Cq yok');
eq(K.cq({...K.pcrDefaults(),N0:1e9}),0,'başlangıç eşiğin üstündeyse Cq sıfır');
/* Standart eğri: eğimden verim geri kazanılır */
for(const E of[0.7,0.8,0.9,1]){const S=K.standardCurve({...K.pcrDefaults(),E,N0:1e6,n:60},5,10);
  rel(S.E,E,0.01,'eğimden verim E='+E);near(S.fit.m,-1/Math.log10(1+E),0.02,'eğim');ok(S.fit.r2>0.999);}
near(K.standardCurve({...K.pcrDefaults(),E:1,N0:1e6,n:60},5,10).fit.m,-3.3219,0.01,'tam verimde eğim ≈ −3,32');
{const f=K.linfit([0,1,2,3],[1,3,5,7]);near(f.m,2,1e-12);near(f.b,1,1e-12);near(f.r2,1,1e-12);}

/* ── Primer ── */
function tmRef(s){let at=0,gc=0;for(const c of s)(c==='G'||c==='C')?gc++:at++;return{w:2*at+4*gc,g:64.9+41*(gc-16.4)/s.length};}
for(const s of['GTAAAACGACGGCCAGT','CAGGAAACAGCTATGAC','AAAAAAAAAA','GCGCGCGCGCGCGCGCGCGC',K.randomSeq(5,22)]){
  const r=tmRef(s);eq(K.tmWallace(s),r.w,s);near(K.tmGC(s),r.g,1e-9,s);}
eq(K.tmWallace('GTAAAACGACGGCCAGT'),52,'8 A/T, 9 G/C → 2·8 + 4·9');
eq(K.tmWallace('AT'),4);eq(K.tmWallace('GC'),8);
{const c=K.primerCheck('GTAAAACGACGGCCAGT');eq(c.n,17);near(c.gc,9/17,1e-12);ok(c.notes.some(t=>/kısa/.test(t)));}
{const c=K.primerCheck(K.randomSeq(11,30));ok(c.notes.some(t=>/uzun/.test(t)),'uzun primer uyarısı');}
{const c=K.primerCheck('AAAAAAAAAAAAAAAAAAAA');ok(c.notes.some(t=>/GC oranı düşük/.test(t)));
  ok(c.notes.some(t=>/ucunda G ya da C yok/.test(t)));}
eq(K.selfDimer('GGGGCCCC')>=4,true,'kendine tamamlayıcı primer');
/* Bilgisayarda PCR: bağımsız konum bulma */
{const f='GTAAAACGACGGCCAGT',r='CAGGAAACAGCTATGAC';
  const i=PUC.indexOf(f),j=PUC.indexOf(K.revcomp(r));
  ok(i>=0&&j>=0);const P=K.inSilicoPCR(PUC,f,r,0);
  eq(P.ok,true);eq(P.main.from,i);eq(P.main.to,j+r.length);eq(P.main.len,j+r.length-i);eq(P.main.len,103,'M13 çifti pUC19 çoklu klonlama bölgesinde 103 bp');
  eq(P.f.length,1);eq(P.r.length,1);eq(P.products.length,1);}
{/* 3' ucundaki son üç harf tam oturmalı */
  const f='GTAAAACGACGGCCAGT';const bad=f.slice(0,-1)+'A';
  eq(K.inSilicoPCR(PUC,bad,'CAGGAAACAGCTATGAC',3).ok,false,"3' ucu bozuksa bağlanmaz");
  const mid='GTAAAACGACGGCCAGT'.split('');mid[2]='T';
  eq(K.inSilicoPCR(PUC,mid.join(''),'CAGGAAACAGCTATGAC',1).ok,true,'ortada bir eşleşmezlik hoş görülür');
  eq(K.inSilicoPCR(PUC,mid.join(''),'CAGGAAACAGCTATGAC',0).ok,false,'pay sıfırken hoş görülmez');}
{/* İleri primer, geri primerin sağında: bağlanma var ama ürün yok */
  const f=PUC.substr(500,20),r=K.revcomp(PUC.substr(100,20));
  const P=K.inSilicoPCR(PUC,f,r,0);
  eq(P.f.length,1);eq(P.r.length,1);eq(P.ok,false);
  ok(/solunda değil/.test(P.why),'ters sıralı primerlerden ürün çıkmaz');}
eq(K.inSilicoPCR(PUC,'','ACGT',0).ok,false);
{const b=K.bindSites('AAACGTAAACGTAAA','ACGT',0);eq(b.length,2);eq(b[0].start,2);eq(b[1].start,8);}

/* ── Sanger ── */
{const R=K.readAccuracy(100,40,0,7);eq(R.acc,1,'gürültüsüz okuma tam doğru');
  eq(R.truth,K.SQ_READ.slice(99,139),'gerçek dizi okuma kalıbından gelir');eq(R.called,R.truth);}
{const a=K.readAccuracy(200,40,0.2,1),b=K.readAccuracy(760,40,0.2,1);
  ok(K.traceQuality(220)>K.traceQuality(780),'okuma sonunda kalite düşer');
  ok(a.acc>=b.acc,'temiz bölgede doğruluk daha yüksek: '+a.acc+' / '+b.acc);}
ok(K.traceQuality(5)<K.traceQuality(100),'okumanın ilk harflerinde kalite düşük');
{let worse=0,conf=0;for(let s=1;s<=20;s++){
  const a=K.readAccuracy(750,30,0.1,s),b=K.readAccuracy(750,30,0.45,s);if(b.acc<a.acc)worse++;
  const c=K.readAccuracy(200,30,0.05,s),d=K.readAccuracy(200,30,0.5,s);if(d.minConf<c.minConf)conf++;}
  ok(worse>=15,'okumanın sonunda gürültü doğruluğu düşürür: '+worse+'/20');
  ok(conf===20,'temiz bölgede gürültü güveni düşürür (çağrı yine doğru): '+conf+'/20');}
{const t=K.chromatogram(300,10,0.2,3);for(const x of t){ok(x.h[x.base]>=0);ok(x.conf>=0&&x.conf<=1);}}

/* ── Kapsama ── */
for(const[L,n]of[[100,2000],[150,10000],[300,20000],[600,3000]]){
  near(K.coverage(L,n),L*n/K.COV_G,1e-12);
  const S=K.coverageSim(L,n,3);near(S.C,L*n/K.COV_G,1e-12);
  const tol=Math.max(0.004,0.2*S.theory);
  near(S.frac,Math.exp(-S.C),tol,`Poisson L=${L} N=${n}`);}
{const S=K.coverageSim(150,0,1);eq(S.frac,1);eq(S.C,0);}

/* ── CRISPR ── */
function guidesRef(seq){const out=[];const scan=(s,top)=>{for(let i=0;i+3<=s.length;i++){
  if(s[i+1]!=='G'||s[i+2]!=='G')continue;if(i-20<0)continue;
  out.push({top,proto:s.substr(i-20,20),pam:s.substr(i,3),cut:top?i-3:s.length-(i-3)});}};
  scan(seq,true);scan(K.revcomp(seq),false);return out;}
for(const sid of['synB','synA','puc19']){const seq=K.SEQS.find(s=>s.id===sid).seq;
  const got=K.findGuides(seq,'iki'),want=guidesRef(seq);
  eq(got.length,want.length,sid+' kılavuz sayısı');
  const key=g=>(g.strand==='ust'||g.top?'+':'-')+g.cut+g.proto;
  assert.deepEqual(got.map(key).sort(),want.map(key).sort(),sid);checks++;
  for(const g of got){eq(g.proto.length,20);eq(g.pam.length,3);eq(g.pam.slice(1),'GG','PAM = NGG');
    const strandSeq=g.strand==='ust'?seq:K.revcomp(seq);
    const local=g.strand==='ust'?g.cut:seq.length-g.cut;
    eq(strandSeq.substr(local-17,20),g.proto,'kesim protospacer’ın 17. harfinden sonra');
    eq(strandSeq.substr(local+3,3),g.pam,'PAM kesimden 3 bp sonra');
    near(g.gc,K.gcFrac(g.proto),1e-12);}}
{const up=K.findGuides(K.SEQS.find(s=>s.id==='synB').seq,'ust');
  const dn=K.findGuides(K.SEQS.find(s=>s.id==='synB').seq,'alt');
  const both=K.findGuides(K.SEQS.find(s=>s.id==='synB').seq,'iki');
  eq(up.length+dn.length,both.length);ok(up.every(g=>g.strand==='ust'));ok(dn.every(g=>g.strand==='alt'));}
eq(K.findGuides('ACGT','iki').length,0,'kısa dizide kılavuz yok');
eq(K.findGuides('A'.repeat(20)+'AGG','iki').length,1);
eq(K.mismatches('AAAA','AAAA'),0);eq(K.mismatches('AAAA','AATA'),1);eq(K.mismatches('AAAA','TTTT'),4);
{const seq=K.SEQS.find(s=>s.id==='synB').seq;const g=K.findGuides(seq,'iki')[0];
  const O=K.offTargets(seq,g.proto,5);
  /* Kaba kuvvet: bütün kılavuzlarla eşleşmezlik say */
  const all=K.findGuides(seq,'iki');const ref={};
  for(const x of all){const m=K.mismatches(g.proto,x.proto);if(m<=5)ref[m]=(ref[m]||0)+1;}
  assert.deepEqual(O.hist,ref);checks++;eq(O.exact,1,'kılavuz yalnız kendi yerine tam uyar');
  for(const r of O.rows)ok(r.seedMis<=r.mis,'çekirdek eşleşmezliği toplamı aşamaz');}
{const seq='T'.repeat(20)+'AGG'+'A'.repeat(30)+'T'.repeat(20)+'CGG';
  const O=K.offTargets(seq,'T'.repeat(20),0);eq(O.exact,2,'aynı hedef iki PAM’da');}

/* ── Onarım ── */
for(const m of[3,6,9,12,15]){let bad=0;for(let k=1;k<=m;k++)if(k%3)bad++;
  near(K.frameshiftTheory(m),bad/m,1e-12,'kuram m='+m);}
near(K.frameshiftTheory(9),2/3,1e-12);near(K.frameshiftTheory(3),2/3,1e-12);
ok(Math.abs(K.frameshiftTheory(10)-2/3)>0.01,'üçün katı olmayan sınırda kuram 2/3’ten sapar');
{let worst=0,sum=0;for(let s=1;s<=20;s++){const R=K.repairSim({...K.repairDefaults(),n:5000,seed:s});
  ok(R.cut<=5000&&R.hdr<=R.cut);ok(R.indels===R.nhej-R.clean0);
  worst=Math.max(worst,Math.abs(R.measured-R.theory));sum+=R.measured;}
  ok(worst<0.06,'20 deneyde çerçeve kayması kuramdan en çok %6 sapar: '+worst);
  near(sum/20,2/3,0.012,'20 deneyin ortalaması');}
{const R=K.repairSim({...K.repairDefaults(),eff:0,n:1000});eq(R.cut,0);eq(R.measured,null);}
{const R=K.repairSim({...K.repairDefaults(),eff:1,hdr:1,n:1000});eq(R.hdr,1000);eq(R.nhej,0);eq(R.measured,null);}
{const a=K.repairSim({...K.repairDefaults(),seed:4}),b=K.repairSim({...K.repairDefaults(),seed:4});
  eq(a.shift,b.shift,'tohum aynıysa sonuç aynı');}
for(const eff of[0.3,0.7,1]){const R=K.repairSim({...K.repairDefaults(),n:4000,eff});near(R.cutFrac,eff,0.03,'kesim verimi');}
for(const h of[0.1,0.3,0.5]){const R=K.repairSim({...K.repairDefaults(),n:4000,hdr:h});near(R.hdrFrac,h,0.04,'HDR payı');}

/* ── Ayrıştırıcı ── */
const pv=s=>K.parseNum(s).v;
for(const[s,v]of[['51',51],['2,5',2.5],['2.5',2.5],['−3',-3],['3/4',0.75],['1 000 000',1e6],['1.000.000',1e6],
  ['1'+N+'280',1280],['8 × 10^6',8e6],['8·10⁶',8e6],['8x10^6',8e6],['8e6',8e6],['8 milyon',8e6],['2 milyar',2e9],
  ['10^9',1e9],['10⁹',1e9],['1,07 × 10⁹',1.07e9],['%52,5',52.5],['52,5 %',52.5],['yüzde 80',80],
  ['52 °C',52],['52 derece',52],['103 bp',103],['103 baz çifti',103],['17,9 döngü',17.9],['n = 30',30],['1024 kat',1024]])
  near(pv(s),v,1e-9*Math.max(1,Math.abs(v)),s);
eq(K.parseNum('%5').pct,true);eq(K.parseNum('5').pct,false);
eq(K.parseNum('103 bp').unit,'uzunluk');eq(K.parseNum('52 °C').unit,'sıcaklık');eq(K.parseNum('12 döngü').unit,'döngü');
for(const s of['','abc','2,,5','3 elma','1/0','e5','%'])assert.throws(()=>K.parseNum(s),K.ParseError,s),checks++;
for(const[s,v]of[['acgt','ACGT'],[' A C G T ','ACGT'],['AcGt','ACGT']])eq(K.parseSeq(s),v,s);
for(const s of['','xyz','123'])assert.throws(()=>K.parseSeq(s),K.ParseError),checks++;
for(const[s,m]of[['PCR','pcr'],['pcr','pcr'],['qPCR','pcr'],['CRISPR','crispr'],['cas9','crispr'],
  ['dizileme','dizileme'],['Sanger','dizileme'],['NGS','dizileme'],['restriksiyon','restriksiyon'],['ligaz','restriksiyon']])
  eq(K.parseMethod(s),m,s);
for(const s of['','elektroforez'])assert.throws(()=>K.parseMethod(s),K.ParseError),checks++;

/* ── Alıştırma üreteci: 11 tür × 150 soru, hedefler metinden bağımsız yeniden hesaplanır ── */
const numsOf=p=>[...p.replace(/(\d)[  ](?=\d{3}\b)/g,'$1').matchAll(/(\d+(?:,\d+)?)(?: × 10([⁻⁰¹²³⁴⁵⁶⁷⁸⁹]+))?/g)]
  .map(m=>Number(m[1].replace(',','.'))*(m[2]?10**Number([...m[2]].map(c=>'⁰¹²³⁴⁵⁶⁷⁸⁹'.indexOf(c)<0?'-':'⁰¹²³⁴⁵⁶⁷⁸⁹'.indexOf(c)).join('')):1));
const seqOfPrompt=p=>{const m=p.match(/[ACGT]{20,}/);return m?m[0]:null;};
let generated=0;const seen=new Set();
for(let L=1;L<=3;L++)for(const[type]of K.TYPES[L-1])for(let n=1;n<=150;n++){
  const ex=K.makeExercise(L,n,type);generated++;seen.add(ex.prompt);eq(ex.type,type);
  ok(ex.steps.length>=2&&ex.hint.length>15,type+' ipucu/adım');
  ok(!/\s-\d/.test(ex.prompt),'tire yerine eksi: '+ex.prompt);
  const g=K.grade(ex,ex.answer);eq(g.st,'dogru',`${type} ${n}: “${ex.answer}” → ${g.msg}`);
  const p=ex.prompt;
  const one=(re,s=p)=>{const m=s.match(re);ok(m,'desen bulunamadı: '+re+' · '+s);return numsOf(m[1])[0];};
  if(type==='parca'){const Lp=one(/plazmit ([\d  ]+) bp/);const pos=[...p.matchAll(/([\d  ]+)\. konumdan/g)].map(m=>numsOf(m[1])[0]);
    eq(pos.length,2,p);const a=pos[1]-pos[0];eq(ex.target,Math.min(a,Lp-a),p);}
  else if(type==='kopya'){const N0=one(/PCR ([\d  ]+) kopyayla/),n2=one(/([\d]+) döngü sonunda/);
    rel(ex.target,N0*2**n2,1e-12,p);}
  else if(type==='pamsay'){const s=p.match(/[ACGT]{40}/)[0];let c=0;
    for(let i=0;i+3<=s.length;i++)if(s[i+1]==='G'&&s[i+2]==='G')c++;eq(ex.target,c,p);}
  else if(type==='tm'){const s=p.match(/[ACGT]{14,}/)[0];eq(ex.target,tmRef(s).w,p);}
  else if(type==='dongu'){const N0=one(/PCR ([\d  ]+) kopyayla/),E=one(/E = ([\d,]+)/),
    Nt=one(/([\d,]+(?: × 10[⁰¹²³⁴⁵⁶⁷⁸⁹]+)?) kopyaya/);
    near(ex.target,Math.log(Nt/N0)/Math.log(1+E),1e-9,p);}
  else if(type==='urun'){const a=one(/([\d  ]+)\. bazdan/),b=one(/([\d  ]+)\. bazda bitiyor/);
    eq(ex.target,b-a+1,p);}
  else if(type==='kesimsayi'){const s=p.match(/[ACGT]{60}/)[0];const site=p.match(/([ACGT]{4}) dizisini/)[1];
    let c=0;for(let i=0;i+4<=s.length;i++)if(s.substr(i,4)===site)c++;eq(ex.target,c,p);
    ok(c>=1&&c<=6,'soru boş çıkmıyor: sayılacak en az bir yer var ('+c+')');}
  else if(type==='cqfark'){const fold=one(/ötekinin ([\d  ]+) katı/),E=one(/E = ([\d,]+)/);
    near(ex.target,Math.log(fold)/Math.log(1+E),1e-9,p);}
  else if(type==='verim'){const m=-one(/eğimi −([\d,]+)/);
    /* metindeki eğim iki basamağa yuvarlanmıştır; geri hesap bu yüzden yaklaşık tutar */
    near(ex.target,100*(10**(-1/m)-1),0.3,p);
    ok(Math.abs(100*(10**(-1/m)-1)-ex.target)<=ex.tol,'yuvarlanmış eğimden hesap kabul payı içinde');}
  else if(type==='protospacer'){const s=seqOfPrompt(p);
    const idx=(()=>{for(let k=0;k+3<=s.length;k++)if(s[k+1]==='G'&&s[k+2]==='G'&&k>=20)return k;return -1;})();
    ok(idx>=20,p);eq(ex.target,s.substr(idx-20,20),p);eq(ex.target.length,20);
    let pam=0;for(let k=0;k+3<=s.length;k++)if(s[k+1]==='G'&&s[k+2]==='G')pam++;
    eq(pam,1,'metindeki “tek bir NGG” iddiası doğru: '+p);}
  else if(type==='yontem'){ok(['pcr','crispr','dizileme','restriksiyon'].includes(ex.target),p);
    const goal=K.GOALS.find(g2=>p.includes(g2.goal));ok(goal,p);eq(ex.target,goal.method,p);}
  else assert.fail('denetlenmeyen tür '+type);}
ok(seen.size>generated*0.3,'sorular yeterince çeşitli: '+seen.size+'/'+generated);
for(let L=1;L<=3;L++)for(let n=1;n<=30;n++)eq(K.makeExercise(L,n).prompt,K.makeExercise(L,n).prompt);
/* Notlama: tipik yanlış ve yarım cevaplar */
const G=(e,s)=>K.grade(e,s).st;
{const e={kind:'num',unit:'uzunluk',target:51,tol:0.001,type:'parca'};
  eq(G(e,'51'),'dogru');eq(G(e,'51 bp'),'dogru');eq(G(e,'51 °C'),'gecersiz');eq(G(e,'%51'),'gecersiz');eq(G(e,'abc'),'gecersiz');eq(G(e,'2635'),'yanlis');}
{const e={kind:'num',target:1024,tol:0.02,type:'kopya'};
  eq(G(e,'1024'),'dogru');eq(G(e,'1 024'),'dogru');ok(/bir döngü eksik/i.test(K.grade(e,'512').msg));}
{const e={kind:'num',unit:'uzunluk',target:400,tol:0.001,type:'urun'};
  ok(/bir baz eksik/i.test(K.grade(e,'399').msg));}
{const e={kind:'pct',target:90,tol:1.2};eq(G(e,'%90'),'dogru');eq(G(e,'0,9'),'dogru');eq(G(e,'%70'),'yanlis');}
{const e={kind:'seq',target:'ACGTACGTACGTACGTACGT'};
  eq(G(e,'acgtacgtacgtacgtacgt'),'dogru');eq(G(e,'ACGTACGTACGTACGTAC'),'yanlis');
  ok(/PAM/.test(K.grade(e,'ACGTACGTACGTACGTACGTAGG').msg),'uzunluk hatasında PAM uyarısı');
  eq(G(e,'xyz'),'gecersiz');}
{const e={kind:'method',target:'pcr'};eq(G(e,'PCR'),'dogru');eq(G(e,'CRISPR'),'yanlis');eq(G(e,'jel'),'gecersiz');}
{const e={kind:'num',unit:'sıcaklık',target:52,tol:0.004};eq(G(e,'52 °C'),'dogru');eq(G(e,'52'),'dogru');eq(G(e,'52 bp'),'gecersiz');}

/* ── Hatalar ve amaçlar ── */
eq(K.MISTAKES.length,7);eq(K.MISTAKES.filter(m=>m.kind==='kavram').length,5);
for(const id of['plato','kesmeden','yapiskan','gdo','pam'])ok(K.MISTAKES.some(m=>m.id===id),id);
for(const n of[10,20,30,40])for(const E of[0.5,0.8,1])for(const len of[12,20,30,40]){
  const X=K.mistakeNumbers(n,E,len);
  ok(X.katlama.right.includes(K.fmtN(100*(1+E)**n,4)),'doğru kopya sayısı');
  ok(X.katlama.wrong.includes(K.fmt(100*n,0)),'yanlış kopya sayısı');
  near(X.wallace.w,tmRef(K.randomSeq(13579,len)).w,1e-9);
  near(X.wallace.g,tmRef(K.randomSeq(13579,len)).g,1e-9);}
eq(K.GOALS.length,6);
for(const g of K.GOALS){ok(['pcr','crispr','dizileme','restriksiyon'].includes(g.method),g.id);
  ok(g.steps.length>=3&&g.why.length>20,g.id);}
/* Sayfanın kendisi: protokol vermez, uyarılar yerinde */
ok(/laboratuvar protokolü değildir/.test(html),'kapsam uyarısı');
ok(!/[̀-ͯ]/.test(html),'birleşik aksan işareti yok');
ok(html.length>60000,'sayfa dolu');
eq((html.match(/<title>([^<]*)<\/title>/)[1]).length<=80,true,'başlık 80 karakteri aşmaz');
for(const h of['dna-replikasyon','gen-ifadesi-ve-molekuler-biyoloji','enzim-kinetigi','us-ve-logaritma','dogal-secilim'])
  ok(html.includes('href="'+h+'.html"'),h+' bağlantısı');
for(const h of['populasyon-genetigi','biyoinformatik-ve-dizi-hizalama'])
  ok(html.includes('href="'+h+'.html"'),'yoldaki komşu basamağa bağlantı: '+h);
ok(!/\(hazırlanıyor\)/.test(html),'“(hazırlanıyor)” kalmadı: iki sayfa da yayımlandı');
{/* Yinelenen id yok: etiketler ve num() yanlış öğeyi okumasın */
  const ids=[...html.matchAll(/\sid="([^"]+)"/g)].map(m=>m[1]);
  const seen=new Set(),dup=[...new Set(ids.filter(i=>seen.size===seen.add(i).size))];
  eq(dup.join(','),'','yinelenen id');
  for(const m of html.matchAll(/<label for="([^"]+)"/g))ok(ids.includes(m[1]),'label for="'+m[1]+'" karşılığı var');}
console.log(`G ${SLUG}: ${checks.toLocaleString('tr-TR')} bağımsız çekirdek kontrolü PASS (${generated} üretilmiş soru)`);
if(process.argv.includes('--browser')){
  const {chromium}=await import('playwright');const {createServer}=await import('node:http');
  const {join,extname}=await import('node:path');const {fileURLToPath}=await import('node:url');
  const root=fileURLToPath(new URL('../',import.meta.url));
  const server=createServer((req,res)=>{const file=join(root,decodeURIComponent(new URL(req.url,'http://localhost').pathname));
    if(!fs.existsSync(file)||fs.statSync(file).isDirectory()){res.writeHead(404).end();return;}
    res.setHeader('Content-Type',({'.html':'text/html; charset=utf-8','.js':'text/javascript; charset=utf-8','.css':'text/css; charset=utf-8'})[extname(file)]||'application/octet-stream');
    res.end(fs.readFileSync(file));});
  await new Promise(r=>server.listen(0,'127.0.0.1',r));let browser;const before=checks;
  try{browser=await chromium.launch();
    for(const[theme,width]of[['light',390],['dark',1280]]){
      const page=await browser.newPage({viewport:{width,height:900},deviceScaleFactor:width===390?2:1});
      await page.addInitScript(t=>{localStorage.setItem('acelya-theme',t);localStorage.setItem('acelya-sound-muted','1');},theme);
      page.setDefaultTimeout(8000);
      const errors=[];page.on('pageerror',e=>errors.push(e.message));
      page.on('response',r=>{if(r.status()>=400&&!new RegExp('shared/digest/'+SLUG+'\\.js$').test(r.url()))errors.push(r.status()+' '+r.url());});
      page.on('console',m=>{if(m.type()==='error'&&!/Failed to load resource/.test(m.text()))errors.push(m.text());});
      await page.goto(`http://127.0.0.1:${server.address().port}/${SLUG}.html`);await page.waitForTimeout(300);
      const click=id=>page.locator('#'+id).click(),
        read=async id=>(await page.locator('#'+id).textContent()).replace(/ /g,' '),
        set=(id,v)=>page.locator('#'+id).evaluate((e,v)=>{if(e.type==='checkbox')e.checked=v;else e.value=v;
          e.dispatchEvent(new Event(e.tagName==='SELECT'||e.type==='checkbox'?'change':'input',{bubbles:true}));},v),
        is=async(id,t)=>{eq(await read(id),t,id);},
        has=async(id,t)=>{const s=await read(id);ok(s.includes(t),`${id}: “${s}” içinde “${t}” yok`);},
        fits=async()=>eq(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),true,'yatay taşma');
      /* Genel */
      eq(await page.evaluate(()=>[...document.querySelectorAll('.app-content input,.app-content select,.app-content textarea')]
        .filter(e=>!document.querySelector('label[for="'+e.id+'"]')).map(e=>e.id).join()),'','etiketsiz denetim');
      eq(await page.evaluate(()=>[...document.querySelectorAll('.app-content svg.ge-svg')].every(c=>c.getAttribute('role')==='img'&&!!c.getAttribute('aria-label'))),true,'svg erişilebilirliği');
      eq(await page.evaluate(()=>Object.isFrozen(GenLab)&&!Object.getOwnPropertyDescriptor(window,'GenLab').writable),true);
      eq(await page.evaluate(()=>/[̀-ͯ]/.test(document.body.innerText)),false,'birleşik aksan işareti yok');
      eq(await page.evaluate(()=>document.querySelectorAll('input[type=number]').length),0);
      eq(await page.evaluate(()=>document.title.length<=80),true);
      await has('yardim','laboratuvar protokolü değildir');await has('yardim','yapay dizi');
      eq(await page.locator('.ge-next a').count(),5);
      for(const h of['dna-replikasyon','gen-ifadesi-ve-molekuler-biyoloji','enzim-kinetigi','us-ve-logaritma','dogal-secilim'])
        eq(await page.locator(`.ge-next a[href="${h}.html"]`).count(),1,h);
      for(const h of['populasyon-genetigi','biyoinformatik-ve-dizi-hizalama'])
        eq(await page.locator(`#bundan-sonra ~ p a[href="${h}.html"]`).count(),1,'komşu basamak bağlantısı '+h);
      eq(await page.evaluate(()=>document.body.textContent.includes('(hazırlanıyor)')),false,'“(hazırlanıyor)” kalmadı');
      eq(await page.evaluate(()=>[...document.querySelectorAll('[id]')].length-new Set([...document.querySelectorAll('[id]')].map(e=>e.id)).size),0,'DOM’da yinelenen id yok');
      /* 01 · Kesme */
      await is('dCuts','2');await is('dFrag','2');await is('dBigSmall','2635 / 51 bp');await is('dSum','2686 bp');
      await has('dSizes','2635');await has('dSizes','51');await has('dStatus','2 parça çıktı');
      await has('dSiteNote','yapışkan uç');await has('dSiteView','G | AATTC');await has('dSiteView','CTTAA | G');
      await set('dZoom','SmaI');await has('dSiteNote','kör uç');await has('dZoomNote','EcoRV');
      await set('dE2','');await is('dFrag','1');await is('dBigSmall','2686 bp');
      await set('dTopo','dogru');await is('dFrag','2');await is('dSum','2686 bp');
      await click('dP3');await is('dFrag','11');await is('dSum','2686 bp');await has('dStatus','11 parça');
      await set('dE1','EcoRV');await is('dCuts','0');await has('dStatus','hiç tanıma yeri bulamadı');
      await set('dSeq','kendi');await has('dStatus','Önce bir dizi seç');
      await set('dCustom','gaattcAAAAAAAAAAgaattc');await set('dE1','EcoRI');await set('dTopo','dogru');await is('dCuts','2');
      await click('kesmeReset');await is('dBigSmall','2635 / 51 bp');await fits();
      await is('lFit','Birleşebilir');await has('lOver','GATC');
      await set('lB','EcoRI');await is('lFit','Birleşemez');await has('lWhy','Çıkıntı dizileri farklı');
      await set('lA','SmaI');await set('lB','EcoRV');await is('lFit','Birleşebilir');await has('lWhy','kör uç');
      await page.locator('#tab-kesme').focus();await page.keyboard.press('ArrowRight');
      eq(await page.locator('#tab-pcr').getAttribute('aria-selected'),'true');
      eq(await page.locator('#panel-kesme').isHidden(),true);
      /* 02 · PCR */
      await has('pcCq','. döngü');await has('pcDouble','döngü');await is('pcEOut','0,9');
      {const cqv=Number((await read('pcCq')).split('.')[0].replace(',','.'));ok(cqv>10&&cqv<30,'Cq makul: '+cqv);}
      await click('pcP1');await is('pcDouble','1,00 döngü');
      await click('pcP3');await has('pcStatus','plato');
      await set('pcN','10');await is('pcCq','—');await has('pcStatus','hiç aşılmadı');
      await click('pcrReset');await has('stE','%');await has('stSlopeN','3,322');
      {const e=Number((await read('stE')).replace('%','').replace(',','.'));near(e,90,1.5,'eğimden verim');}
      await set('pcE','1');{const s=Number((await read('stSlope')).replace('−','-').replace(',','.'));near(s,-3.322,0.02,'tam verimde eğim');}
      await click('pcrReset');
      await is('ipLen','103 bp');await has('ipF','379');await has('ipSpec','tek ürün');await has('prTmW','52');
      await click('ipP3');await has('prStatus','');await is('ipLen','ürün yok');
      await click('ipP1');await is('ipLen','103 bp');
      await set('ipFwd','ACGT');await has('prStatus','İleri primer kısa (4 nt)');
      await has('prStatus','Geri primer kısa (17 nt)');
      eq(await page.evaluate(()=>(document.getElementById('prStatus').textContent.match(/primer kısa/g)||[]).length),2,'iki uyarı da hangi primere ait olduğunu söyler');
      await fits();
      await click('pcrReset');
      /* 03 · Dizileme */
      await click('tab-dizileme');await has('sqWin','60–79. baz');
      await set('sqNoise','0');await is('sqAcc','20 / 20');await is('sqConf','1,00');
      {const truth=await page.evaluate(()=>GenLab.readAccuracy(60,8,0,1).truth);
        await set('sqAns',truth);await click('sqCheck');eq(await page.locator('#sqFb').getAttribute('data-st'),'dogru');
        await set('sqAns','ACGT');await click('sqCheck');eq(await page.locator('#sqFb').getAttribute('data-st'),'eksik');
        await set('sqAns','xyz');await click('sqCheck');eq(await page.locator('#sqFb').getAttribute('data-st'),'gecersiz');}
      await click('sqP1');await has('sqStatus','ilk harfleri');
      await click('sqP3');await has('sqStatus','Okumanın sonu');
      await click('dizilemeReset');await has('sqStatus','temiz bölgesi');
      await click('cvP2');{const c=Number((await read('cvC')).replace(' kat','').replace(',','.'));ok(c>25&&c<35,'30 kat kapsama: '+c);}
      await has('cvStatus','25 katın üstünde');
      await click('cvP1');{const t=await read('cvT'),m=await read('cvM');ok(t.startsWith('%')&&m.startsWith('%'),t+' / '+m);}
      await click('dizilemeReset');await fits();
      /* 04 · CRISPR */
      await click('tab-crispr');await has('crCount','52');await has('crCutN','üç baz çifti önce');
      eq(await page.evaluate(()=>document.getElementById('crGuide').textContent.length),20,'hedef 20 nt');
      eq(await page.locator('#offTable tbody tr').count(),4);
      await set('crMis','5');eq(await page.locator('#offTable tbody tr').count(),6);
      {/* Benzer yer yoksa ya da çekirdek uyumu yoksa yorum sütunu “0 tanesinde…” demez */
        const t=await page.locator('#offTable tbody').textContent();
        ok(!/\b0 tanesinde/.test(t),'çekirdek sütunu sıfırı sayıyla anlatmıyor');}
      await set('crStrand','ust');{const n=Number((await read('crCount')).replace(/\D/g,''));ok(n>0&&n<52,'tek iplik: '+n);}
      await set('crSeq','puc19');{const n=Number((await read('crCount')).replace(/[^\d]/g,''));ok(n>100,'pUC19 kılavuz sayısı: '+n);}
      await click('crP2');{const gc=await read('crGC');ok(gc.startsWith('%'),gc);}
      await click('crisprReset');await has('crCount','52');
      await has('rpTheory','%66,7');{const m=Number((await read('rpMeas')).replace('%','').replace(',','.'));ok(Math.abs(m-66.7)<6,'ölçülen çerçeve kayması: '+m);}
      await set('rpMax','12');await has('rpTheory','%66,7');
      await set('rpMax','3');await has('rpTheory','%66,7');
      {/* HDR kaydırıcısı okumaları gerçekten değiştirir (eski sürümde id çakışması yüzünden etkisizdi) */
        const h0=await read('rpHdrV'),n0=await read('rpHdrN'),m0=await read('rpMeasN');
        await set('rpHdr','0.5');
        const h1=await read('rpHdrV'),n1=await read('rpHdrN'),m1=await read('rpMeasN');
        ok(Number(h1.replace(/[^\d]/g,''))>Number(h0.replace(/[^\d]/g,'')),`HDR payı artınca kalıptan onarılan sayı artar: ${h0} → ${h1}`);
        ok(n1!==n0&&m1!==m0,'HDR kaydırıcısı payı ve indel sayısını değiştirir');
        await has('rpHdrN','kurulan %50');
        eq(await page.evaluate(()=>document.querySelector('label[for="rpHdr"]').control.type),'range','HDR etiketi kaydırıcıyı gösterir');
        await click('crisprReset');await has('rpHdrN','kurulan %10');}
      await set('rpEff','0.1');await has('rpStatus','');
      await click('crisprReset');await has('rpStatus','düzgün dağıldığı');await fits();
      /* 05 · Uygulama */
      await click('tab-uygulama');
      eq(await page.locator('#timeline li').count(),16);eq(await page.locator('#debates article').count(),4);
      await has('panel-uygulama','Asilomar');await has('panel-uygulama','5977');await has('panel-uygulama','7 Ekim 2020');
      await has('goalOut','PCR');await set('goal','yenidizi');await has('goalOut','Dizileme');
      eq(await page.locator('#goalSteps li').count()>=3,true);
      await set('goal','protein');await has('goalOut','Restriksiyon');
      await set('goal','susturma');await has('goalOut','CRISPR');await fits();
      await page.locator('#tab-uygulama').focus();await page.keyboard.press('Home');
      eq(await page.locator('#tab-kesme').getAttribute('aria-selected'),'true');
      await page.keyboard.press('End');eq(await page.locator('#tab-uygulama').getAttribute('aria-selected'),'true');
      /* Alıştırma */
      eq(await page.locator('#pStep').isDisabled(),true);
      const a1=await page.evaluate(()=>GenLab.makeExercise(1,1).answer);
      await set('pAns',a1);await click('pCheck');eq(await page.locator('#pFb').getAttribute('data-st'),'dogru');
      await has('pScore','1 soru doğru, 1 deneme');
      await set('pAns','???');await click('pCheck');eq(await page.locator('#pFb').getAttribute('data-st'),'gecersiz');
      await click('pHint');eq(await page.locator('#pHintBox').isVisible(),true);
      const nst=await page.evaluate(()=>GenLab.makeExercise(1,1).steps.length);
      for(let i=0;i<nst;i++)await click('pStep');
      eq(await page.locator('#pSteps li').count(),nst);eq(await page.locator('#pStep').isDisabled(),true);
      await click('pNew');await is('pNoOut','2');eq(await page.locator('#pSteps').isHidden(),true);
      for(const L of['1','2','3']){await set('pLevel',L);const nT=await page.locator('#pType option').count();
        eq(nT,[0,3,4,4][+L]+1);
        for(let i=1;i<nT;i++){await page.locator('#pType').selectOption({index:i});
          const ans=await page.evaluate(()=>{const L=+document.getElementById('pLevel').value,n=+document.getElementById('pNo').value,t=document.getElementById('pType').value;
            return GenLab.makeExercise(L,n,t).answer;});
          await set('pAns',ans);await page.locator('#pAns').press('Enter');
          eq(await page.locator('#pFb').getAttribute('data-st'),'dogru','arayüz notlaması '+ans);}}
      /* Hatalar */
      eq(await page.locator('#mistakes .ge-card').count(),7);
      await has('mk-katlama-w','30 kat');await has('mk-katlama-r','1,074 × 10¹¹');
      await set('mN','20');await set('mE','0.8');await has('mk-katlama-w','20 kat');await has('mk-katlama-t','Sınama');
      await set('mLen','40');await has('mk-wallace-w','40 nt');
      /* Sekmeler ve çizimler */
      for(const t of['kesme','pcr','dizileme','crispr','uygulama']){await click('tab-'+t);await fits();
        eq(await page.locator('#panel-'+t).isVisible(),true);
        eq(await page.evaluate(t=>[...document.querySelectorAll('#panel-'+t+' svg.ge-svg')].every(s=>s.childElementCount>3&&s.viewBox.baseVal.width>=300),t),true,t+' svg boş');}
      assert.deepEqual(errors,[]);checks++;await page.close();}
    console.log(`G ${SLUG}: ${checks-before} tarayıcı kontrolü PASS (390 px açık, 1280 px koyu)`);
  }finally{await browser?.close();await new Promise(r=>server.close(r));}
}
