// G · biyoinformatik-ve-dizi-hizalama: çekirdek, sayfanın kendi formüllerini yinelemeyen referanslarla sınanır:
// testin kendi kodon tablosu (amino asit → kodonlar, ders kitabı düzeninde), NCBI BLOSUM62 dosyasının birebir kopyası,
// NCBI/UniProt kayıtlarından alınan diziler, bütün hizalamaları tek tek sayan kaba kuvvet, ayrı yazılmış özyinelemeli
// (belleklemeli) bir Gotoh, Wikipedia’daki çözülmüş UPGMA ve NJ örnekleri, Jukes–Cantor benzetimi.
// `--browser` gerçek arayüzü 390 px açık ve 1280 px koyu temada dener.
import fs from 'node:fs';
import assert from 'node:assert/strict';
const html=fs.readFileSync(new URL('../biyoinformatik-ve-dizi-hizalama.html',import.meta.url),'utf8');
const source=html.split('/* KERNEL-BEGIN */')[1]?.split('/* KERNEL-END */')[0];
assert(source,'Çekirdek sınır işaretleri gerekli');
const K=new Function('"use strict";'+source+';return BioLab;')();
let checks=0;
const eq=(a,b,msg)=>{assert.equal(a,b,(msg??'')+` · ${a} ≠ ${b}`);checks++;};
const ok=(c,msg)=>{assert(c,msg??'koşul sağlanmadı');checks++;};
const near=(a,b,tol,msg)=>{assert(Math.abs(a-b)<=tol,(msg||'')+` ${a} ≠ ${b} (tol ${tol})`);checks++;};
ok(Object.isFrozen(K)&&Object.isFrozen(K.CODE)&&Object.isFrozen(K.B62)&&Object.isFrozen(K.MISTAKES)&&Object.isFrozen(K.TYPES)&&Object.isFrozen(K.PROT));

/* ── Sayı biçimi ── */
eq(K.fmt(12345.678,2),'12 345,68');eq(K.fmt(9999,0),'9999');eq(K.fmt(-2.5,1),'−2,5');eq(K.fmt(-0.0001,2),'0,00');eq(K.sci(1.234e-7,2),'1,23 × 10⁻⁷');eq(K.sci(0.5,2),'0,500');eq(K.bigSci(48639n),'48\u202F639');

/* ── Standart genetik kod: testin kendi tablosu (amino asit → kodonlar) ── */
const BY_AA={F:'TTT TTC',L:'TTA TTG CTT CTC CTA CTG',I:'ATT ATC ATA',M:'ATG',V:'GTT GTC GTA GTG',S:'TCT TCC TCA TCG AGT AGC',P:'CCT CCC CCA CCG',T:'ACT ACC ACA ACG',A:'GCT GCC GCA GCG',
  Y:'TAT TAC',H:'CAT CAC',Q:'CAA CAG',N:'AAT AAC',K:'AAA AAG',D:'GAT GAC',E:'GAA GAG',C:'TGT TGC',W:'TGG',R:'CGT CGC CGA CGG AGA AGG',G:'GGT GGC GGA GGG','*':'TAA TAG TGA'};
const MYCODE={};for(const[aa,cs]of Object.entries(BY_AA))for(const c of cs.split(' ')){ok(!(c in MYCODE),'kodon iki kez: '+c);MYCODE[c]=aa;}
eq(Object.keys(MYCODE).length,64);eq(Object.keys(K.CODE).length,64);for(const c of Object.keys(MYCODE))eq(K.CODE[c],MYCODE[c],'kodon '+c);
assert.deepEqual([...K.ALT_STARTS].sort(),['ATG','CTG','TTG']);checks++;
eq(K.NCBI1.ncbieaa,'FFLLSSSSYY**CC*WLLLLPPPPHHQQRRRRIIIMTTTTNNKKSSRRVVVVAAAADDEEGGGG','NCBI gc.prt, transl_table 1');
const myRC=s=>[...s].reverse().map(c=>({A:'T',T:'A',C:'G',G:'C',N:'N'})[c]).join('');const myTr=(s,o=0)=>{let p='';for(let i=o;i+3<=s.length;i+=3)p+=MYCODE[s.slice(i,i+3)];return p;};
const rr=K.rng(11);for(let t=0;t<200;t++){const s=[...Array(1+Math.floor(rr()*40))].map(()=>'ACGTN'[Math.floor(rr()*4.2)]).join('');eq(K.revcomp(s),myRC(s));eq(K.revcomp(K.revcomp(s)),s);if(!s.includes('N'))for(const o of[0,1,2])eq(K.translate(s,o),myTr(s,o));}
eq(K.cleanDNA("5'-acg u-3'"),'ACGT');assert.throws(()=>K.cleanDNA('ACGX'),K.ParseError);checks++;assert.throws(()=>K.cleanProt('MKV#'),K.ParseError);checks++;
const fa=K.parseFasta('>x1 desc\nAC\nGT\n>x2\nTT');eq(fa.length,2);eq(fa[0].seq,'ACGT');eq(fa[0].id,'x1');eq(K.guessKind('ACGTTGCA'),'dna');eq(K.guessKind('MVLSPADKTN'),'prot');near(K.gc('GGCA'),0.75,1e-12);

/* ── Gerçek kayıtlar: NM_000207.3 (465 bp, CDS 60..392) ve UniProt P01308 ── */
const INS_P01308='MALWMRLLPLLALLALWGPDPAAAFVNQHLCGSHLVEALYLVCGERGFFYTPKTRREAEDLQVGQVELGGGPGAGSLQPLALEGSLQKRGIVEQCCTSICSLYQLENYCN';
eq(K.INS_MRNA.length,465);eq(K.PROT.INS.seq,INS_P01308);eq(myTr(K.INS_MRNA.slice(59,392)),INS_P01308+'*','CDS 60..392 çevirisi = P01308 + dur');
const O=K.findORFs(K.INS_MRNA,30);eq(O[0].strand,'+');eq(O[0].frame,3);eq(O[0].start,60);eq(O[0].end,392);eq(O[0].lenAA,110);eq(O[0].prot,INS_P01308);
eq(K.INS_MRNA.slice(445,451),'AATAAA','poliA sinyali 446..451');eq(myTr(K.INS_MRNA.slice(131,221)),'FVNQHLCGSHLVEALYLVCGERGFFYTPKT','B zinciri 132..221');eq(myTr(K.INS_MRNA.slice(326,389)),'GIVEQCCTSICSLYQLENYCN','A zinciri 327..389');
const LEN={HBA:142,HBB:147,HBD:147,HBG1:147,MB:154,LYZ:148,INS:110};for(const[k,v]of Object.entries(LEN))eq(K.PROT[k].seq.length,v,k+' uzunluğu (UniProt)');
eq(K.PROT.HBB.seq.slice(0,10),'MVHLTPEEKS');eq(K.PROT.HBA.seq.slice(-6),'LTSKYR');eq(K.PROT.MB.acc,'P02144');
/* bağımsız ORF tarayıcısı ile karşılaştırma (rastgele diziler) */
function myORFs(s,k){let n=0;for(const t of[s,myRC(s)])for(let f=0;f<3;f++){let st=-1;for(let i=f;i+3<=s.length;i+=3){const c=t.slice(i,i+3);if(st<0&&c==='ATG')st=i;else if(st>=0&&MYCODE[c]==='*'){if((i-st)/3>=k)n++;st=-1;}}}return n;}
{const r=K.rng(5);let sim=0;const N=500;for(let t=0;t<N;t++){const s=[...Array(600)].map(()=>'ACGT'[Math.floor(r()*4)]).join('');const a=myORFs(s,30),b=K.findORFs(s,30).filter(o=>!o.open).length;eq(a,b,'ORF sayısı');sim+=a;}
  near(sim/N,K.orfExpect('ACGT'.repeat(150),30).E,0.15,'beklenen ORF sayısı ≈ benzetim ortalaması');near(K.orfExpect('ACGT'.repeat(2500),30).Einf,(3*10000/128)*Math.pow(61/64,29),1e-9,'uzun dizi sınırı (3L/128)(61/64)^(k−1)');}

/* ── BLOSUM62: NCBI blast/matrices/BLOSUM62 dosyasının birebir kopyası ── */
const NCBI_B62=`   A  R  N  D  C  Q  E  G  H  I  L  K  M  F  P  S  T  W  Y  V  B  Z  X  *
A  4 -1 -2 -2  0 -1 -1  0 -2 -1 -1 -1 -1 -2 -1  1  0 -3 -2  0 -2 -1  0 -4 
R -1  5  0 -2 -3  1  0 -2  0 -3 -2  2 -1 -3 -2 -1 -1 -3 -2 -3 -1  0 -1 -4 
N -2  0  6  1 -3  0  0  0  1 -3 -3  0 -2 -3 -2  1  0 -4 -2 -3  3  0 -1 -4 
D -2 -2  1  6 -3  0  2 -1 -1 -3 -4 -1 -3 -3 -1  0 -1 -4 -3 -3  4  1 -1 -4 
C  0 -3 -3 -3  9 -3 -4 -3 -3 -1 -1 -3 -1 -2 -3 -1 -1 -2 -2 -1 -3 -3 -2 -4 
Q -1  1  0  0 -3  5  2 -2  0 -3 -2  1  0 -3 -1  0 -1 -2 -1 -2  0  3 -1 -4 
E -1  0  0  2 -4  2  5 -2  0 -3 -3  1 -2 -3 -1  0 -1 -3 -2 -2  1  4 -1 -4 
G  0 -2  0 -1 -3 -2 -2  6 -2 -4 -4 -2 -3 -3 -2  0 -2 -2 -3 -3 -1 -2 -1 -4 
H -2  0  1 -1 -3  0  0 -2  8 -3 -3 -1 -2 -1 -2 -1 -2 -2  2 -3  0  0 -1 -4 
I -1 -3 -3 -3 -1 -3 -3 -4 -3  4  2 -3  1  0 -3 -2 -1 -3 -1  3 -3 -3 -1 -4 
L -1 -2 -3 -4 -1 -2 -3 -4 -3  2  4 -2  2  0 -3 -2 -1 -2 -1  1 -4 -3 -1 -4 
K -1  2  0 -1 -3  1  1 -2 -1 -3 -2  5 -1 -3 -1  0 -1 -3 -2 -2  0  1 -1 -4 
M -1 -1 -2 -3 -1  0 -2 -3 -2  1  2 -1  5  0 -2 -1 -1 -1 -1  1 -3 -1 -1 -4 
F -2 -3 -3 -3 -2 -3 -3 -3 -1  0  0 -3  0  6 -4 -2 -2  1  3 -1 -3 -3 -1 -4 
P -1 -2 -2 -1 -3 -1 -1 -2 -2 -3 -3 -1 -2 -4  7 -1 -1 -4 -3 -2 -2 -1 -2 -4 
S  1 -1  1  0 -1  0  0  0 -1 -2 -2  0 -1 -2 -1  4  1 -3 -2 -2  0  0  0 -4 
T  0 -1  0 -1 -1 -1 -1 -2 -2 -1 -1 -1 -1 -2 -1  1  5 -2 -2  0 -1 -1  0 -4 
W -3 -3 -4 -4 -2 -2 -3 -2 -2 -3 -2 -3 -1  1 -4 -3 -2 11  2 -3 -4 -3 -2 -4 
Y -2 -2 -2 -3 -2 -1 -2 -3  2 -1 -1 -2 -1  3 -3 -2 -2  2  7 -1 -3 -2 -1 -4 
V  0 -3 -3 -3 -1 -2 -2 -3 -3  3  1 -2  1 -1 -2 -2  0 -3 -1  4 -3 -2 -1 -4 
B -2 -1  3  4 -3  0  1 -1  0 -3 -4  0 -3 -3 -2  0 -1 -4 -3 -3  4  1 -1 -4 
Z -1  0  0  1 -3  3  4 -2  0 -3 -3  1 -1 -3 -1  0 -1 -3 -2 -2  1  4 -1 -4 
X  0 -1 -1 -1 -2 -1 -1 -1 -1 -1 -1 -1 -1 -1 -2  0  0 -2 -1 -1 -1 -1 -1 -4 
* -4 -4 -4 -4 -4 -4 -4 -4 -4 -4 -4 -4 -4 -4 -4 -4 -4 -4 -4 -4 -4 -4 -4  1 `;
{const L=NCBI_B62.split('\n'),cols=L[0].trim().split(/\s+/);eq(cols.length,24);for(const line of L.slice(1)){const p=line.trim().split(/\s+/);for(let j=0;j<24;j++)eq(K.B62[p[0]][cols[j]],Number(p[j+1]),'BLOSUM62 '+p[0]+cols[j]);}
  for(const a of cols)for(const b of cols)eq(K.B62[a][b],K.B62[b][a],'simetri');eq(K.blosum('W','W'),11);eq(K.blosum('C','C'),9);eq(K.blosum('A','A'),4);eq(K.blosum('I','V'),3);eq(K.blosum('W','G'),-2);}

/* ── Kaba kuvvet ve ayrı yazılmış DP: testin kendi puanlayıcısı ── */
const sub=(sc,x,y)=>sc.kind==='prot'?K.B62[x][y]:sc.kind==='text'?(x===y?sc.match:-sc.mismatch):(x===y&&x!=='N'?sc.match:-sc.mismatch);
function myScore(A,B,sc){let s=0,prev='';for(let k=0;k<A.length;k++){const x=A[k],y=B[k];assert(!(x==='-'&&y==='-'));const st=x==='-'?'a':y==='-'?'b':'m';if(st==='m')s+=sub(sc,x,y);else s-=(prev===st?sc.ext:sc.open+sc.ext);prev=st;}return s;}
function allAlignments(a,b){const out=[];(function go(i,j,A,B){if(i===a.length&&j===b.length){out.push([A,B]);return;}if(i<a.length&&j<b.length)go(i+1,j+1,A+a[i],B+b[j]);if(i<a.length)go(i+1,j,A+a[i],B+'-');if(j<b.length)go(i,j+1,A+'-',B+b[j]);})(0,0,'','');return out;}
function bruteBest(a,b,sc,mode){let best=-Infinity,cnt=0;for(const[A,B]of allAlignments(a,b)){let v;if(mode==='global')v=myScore(A,B,sc);else{v=0;for(let s0=0;s0<A.length;s0++)for(let e=s0+1;e<=A.length;e++)v=Math.max(v,myScore(A.slice(s0,e),B.slice(s0,e),sc));}if(v>best){best=v;cnt=1;}else if(v===best)cnt++;}return{best,cnt};}
/* belleklemeli özyinelemeli Gotoh: durum = son sütunun türü */
function myGotoh(a,b,sc,mode){const memo=new Map(),NI=-1e12;
  function f(i,j,st){/* a[0..i) ve b[0..j) hizalaması, son sütun st ('m','a': a’da boşluk, 'b'), en iyi puan */const key=i+','+j+','+st;if(memo.has(key))return memo.get(key);let v=NI;
    if(st==='m'){if(i>0&&j>0){let p=Math.max(f(i-1,j-1,'m'),f(i-1,j-1,'a'),f(i-1,j-1,'b'));if(i-1===0&&j-1===0)p=Math.max(p,0);if(mode==='local')p=Math.max(p,0);v=p+sub(sc,a[i-1],b[j-1]);}}
    else if(st==='b'){if(i>0){/* a[i-1] boşlukla */const opts=[f(i-1,j,'m')-sc.open-sc.ext,f(i-1,j,'b')-sc.ext,f(i-1,j,'a')-sc.open-sc.ext];if(mode==='global'&&i-1===0&&j===0)opts.push(-sc.open-sc.ext);v=Math.max(...opts);}}
    else{if(j>0){const opts=[f(i,j-1,'m')-sc.open-sc.ext,f(i,j-1,'a')-sc.ext,f(i,j-1,'b')-sc.open-sc.ext];if(mode==='global'&&i===0&&j-1===0)opts.push(-sc.open-sc.ext);v=Math.max(...opts);}}
    memo.set(key,v);return v;}
  if(mode==='global'){if(!a.length&&!b.length)return 0;return Math.max(f(a.length,b.length,'m'),f(a.length,b.length,'a'),f(a.length,b.length,'b'));}
  let best=0;for(let i=1;i<=a.length;i++)for(let j=1;j<=b.length;j++)best=Math.max(best,f(i,j,'m'));return best;}
const rd=(r,n,al)=>[...Array(n)].map(()=>al[Math.floor(r()*al.length)]).join('');
{const r=K.rng(77);let nBrute=0;
  for(let t=0;t<260;t++){const prot=t%3===2,al=prot?'ARNDCWGHILK':'ACGT',a=rd(r,Math.floor(r()*6),al),b=rd(r,Math.floor(r()*6),al);
    const lin=K.scheme({kind:prot?'prot':'dna',match:1+Math.floor(r()*3),mismatch:Math.floor(r()*3),ext:1+Math.floor(r()*4)});
    const aff=K.scheme({kind:prot?'prot':'dna',match:lin.match,mismatch:lin.mismatch,open:1+Math.floor(r()*5),ext:1+Math.floor(r()*2)});
    for(const mode of['global','local']){
      const BL=bruteBest(a,b,lin,mode),R=K.dpLinear(a,b,lin,mode);eq(R.score,BL.best,'doğrusal '+mode+' '+a+'/'+b);eq(myScore(R.rows[0],R.rows[1],lin),R.score,'geri izleme puanı');
      eq(R.rows[0].replace(/-/g,''),mode==='global'?a:a.slice(R.start[0],R.end[0]));eq(R.rows[1].replace(/-/g,''),mode==='global'?b:b.slice(R.start[1],R.end[1]));if(mode==='global')eq(R.count,BL.cnt,'eş-en iyi hizalama sayısı');
      const pb=K.bruteAlign(a,b,lin,mode);eq(pb.best,BL.best,'sayfanın kaba kuvveti');
      const BA=bruteBest(a,b,aff,mode),RA=K.dpAffine(a,b,aff,mode);eq(RA.score,BA.best,'afin '+mode+' '+a+'/'+b+' '+JSON.stringify(aff));eq(K.scoreAffine(a,b,aff,mode),BA.best,'afin yalnız puan');eq(myGotoh(a,b,aff,mode),BA.best,'testin Gotoh’u');
      if(RA.rows[0].length){eq(myScore(RA.rows[0],RA.rows[1],aff),RA.score,'afin geri izleme');eq(K.scoreRows(RA.rows[0],RA.rows[1],aff),RA.score);}nBrute++;}}
  /* orta boy: kaba kuvvet yok, ayrı yazılmış Gotoh ile */
  for(let t=0;t<40;t++){const prot=t%2===1,al=prot?'ARNDCQEGHILKMFPSTWYV':'ACGT',a=rd(r,15+Math.floor(r()*25),al),b=rd(r,15+Math.floor(r()*25),al);const sc=K.scheme({kind:prot?'prot':'dna',match:2,mismatch:1,open:Math.floor(r()*12),ext:1+Math.floor(r()*3)});
    for(const mode of['global','local']){const v=myGotoh(a,b,sc,mode),R=K.dpAffine(a,b,sc,mode);eq(R.score,v,'Gotoh orta boy '+mode);eq(K.scoreAffine(a,b,sc,mode),v);eq(myScore(R.rows[0],R.rows[1],sc),v);if(sc.open===0)eq(K.dpLinear(a,b,sc,mode).score,v,'açma 0 = doğrusal');}}
  console.log(`  kaba kuvvet: ${nBrute} küçük dizi çifti, bütün hizalamalar tek tek puanlandı`);}
/* Wikipedia örnekleri */
{const sc=K.scheme({kind:'dna',match:1,mismatch:1,ext:1});eq(K.dpLinear('GCATGCG','GATTACA',sc,'global').score,0,'NW örneği');eq(bruteBest('GCATGCG','GATTACA',sc,'global').best,0);
  const sw=K.scheme({kind:'dna',match:3,mismatch:3,ext:2}),S=K.dpLinear('TGTTACGG','GGTTGACTA',sw,'local');eq(S.score,13,'SW örneği');eq(S.rows.join('/'),'GTT-AC/GTTGAC');
  eq(K.editDistance('kitten','sitting').d,3,'Levenshtein örneği');}
/* düzenleme uzaklığı: kaba kuvvet ve NW denkliği */
function myEdit(a,b){if(!a.length)return b.length;if(!b.length)return a.length;return Math.min(myEdit(a.slice(1),b)+1,myEdit(a,b.slice(1))+1,myEdit(a.slice(1),b.slice(1))+(a[0]===b[0]?0:1));}
{const r=K.rng(3);for(let t=0;t<120;t++){const a=rd(r,Math.floor(r()*7),'abc'),b=rd(r,Math.floor(r()*7),'abc');const E=K.editDistance(a,b);eq(E.d,myEdit(a,b),'düzenleme '+a+'/'+b);eq(0-K.dpLinear(a,b,K.scheme({kind:'text',match:0,mismatch:1,ext:1}),'global').score+0,E.d);eq(E.ops.filter(o=>o.op!=='=').length,E.d);}}
/* Delannoy: hizalama sayısı */
[1n,3n,13n,63n,321n,1683n,8989n,48639n].forEach((v,n)=>eq(K.delannoy(n,n),v,'D('+n+','+n+')'));for(const[m,n]of[[2,3],[4,1],[3,5],[0,4]])eq(K.delannoy(m,n),BigInt(allAlignments('x'.repeat(m),'y'.repeat(n)).length));eq(K.bigSci(K.delannoy(142,147)),'1,88 × 10¹⁰⁹');

/* ── Gerçek proteinler ── */
{const R=K.dpAffine(K.PROT.HBA.seq,K.PROT.HBB.seq,K.BLAST_SC,'local'),S=K.alnStats(...R.rows);ok(S.identity>0.40&&S.identity<0.48,'HBA–HBB özdeşlik '+S.identity);eq(R.score,myGotoh(K.PROT.HBA.seq,K.PROT.HBB.seq,K.BLAST_SC,'local'));
  const D=K.alnStats(...K.dpAffine(K.PROT.HBB.seq,K.PROT.HBD.seq,K.BLAST_SC,'global').rows);ok(D.identity>0.9,'HBB–HBD');eq(D.gaps,0);
  const L=K.dpAffine(K.PROT.HBB.seq,K.PROT.LYZ.seq,K.BLAST_SC,'local');ok(L.score<40,'HBB–LYZ düşük puan');}
/* ── Karıştırma testi ── */
{const r=K.rng(1),s='MVLSPADKTNVKAAWGKVGAHAG';for(let t=0;t<30;t++){const x=K.shuffle(s,r);eq([...x].sort().join(''),[...s].sort().join(''),'bileşim korunur');}
  const xs=K.shuffleScores(K.PROT.HBB.seq,K.PROT.LYZ.seq,K.BLAST_SC,'local',60,2);const xs2=[...K.shuffleScores(K.PROT.HBB.seq,K.PROT.LYZ.seq,K.BLAST_SC,'local',60,2,0,25),...K.shuffleScores(K.PROT.HBB.seq,K.PROT.LYZ.seq,K.BLAST_SC,'local',60,2,25,60)];assert.deepEqual(xs,xs2);checks++;
  const P=K.permSummary(10,[1,5,10,12,3]);eq(P.k,2);near(P.p,3/6,1e-12);near(P.pMin,1/6,1e-12);
  const G=K.gumbelFit([1,2,3,4,5]);near(G.sd,Math.sqrt(2.5),1e-12);near(G.lambda,Math.PI/(Math.sqrt(2.5)*Math.sqrt(6)),1e-12);near(G.u,3-0.5772156649015329/G.lambda,1e-12);near(K.gumbelP(G.u,G),1-Math.exp(-1),1e-12);
  /* Gumbel örneklemiyle uyum: ters dönüşümle üretilen örneğin momentleri parametreleri geri verir */
  const rg=K.rng(9),lam=0.3,u=20,smp=[...Array(20000)].map(()=>u-Math.log(-Math.log(rg()))/lam),Gf=K.gumbelFit(smp);near(Gf.lambda,lam,0.01,'Gumbel λ');near(Gf.u,u,0.15,'Gumbel u');}

/* ── Uzaklıklar ve Jukes–Cantor ── */
eq(K.jc(0),0);eq(K.jc(0.75),Infinity);near(K.jc(0.2),-0.75*Math.log(1-0.8/3),1e-12);for(const d of[0.01,0.3,1,2.5])near(K.jc(K.jcP(d)),d,1e-9);near(K.jc(0.5,20),-(19/20)*Math.log(1-0.5*20/19),1e-12);
eq(K.pDistance('AC-GT','ACTGA').p,1/4);eq(K.pDistance('AC-GT','ACTGA').cols,4);
{/* benzetim: tek dalda gözlenen p, JC olasılığına uyar */const T={ch:[[{name:'X'},0.4],[{name:'Y'},0]]};const ev=K.evolve(T,40000,7);near(K.pDistance(ev.X,ev.Y).p,K.jcP(0.4),0.008,'JC benzetimi');near(K.jc(K.pDistance(ev.X,ev.Y).p),0.4,0.02);}
/* UPGMA: Wikipedia 5S rRNA örneği */
{const D=[[0,17,21,31,23],[17,0,30,34,21],[21,30,0,28,39],[31,34,28,0,43],[23,21,39,43,0]],U=K.upgma(D,['a','b','c','d','e']);assert.deepEqual(U.steps.map(s=>s.h),[8.5,11,14,16.5]);checks++;eq(U.height,16.5);
  assert.deepEqual([...K.clades(U.tree)].sort(),['a,b','a,b,c,d,e','a,b,e','c,d']);checks++;const PD=K.pathDist(U.tree);eq(PD.a.c,33);eq(PD.e.a,22);}
/* NJ: Wikipedia beş taksonlu örnek (toplanabilir uzaklık, ağaç tam geri kazanılır) */
{const N=['a','b','c','d','e'],D=[[0,5,9,9,8],[5,0,10,10,9],[9,10,0,8,7],[9,10,8,0,3],[8,9,7,3,0]],R=K.nj(D,N);
  const Q1=[[null,-50,-38,-34,-34],[-50,null,-38,-34,-34],[-38,-38,null,-40,-40],[-34,-34,-40,null,-48],[-34,-34,-40,-48,null]];assert.deepEqual(R.steps[0].Q,Q1);checks++;
  eq(R.steps[0].q,-50);assert.deepEqual(R.steps[0].pair,['a','b']);checks++;eq(R.steps[0].li,2);eq(R.steps[0].lj,3);eq(R.steps[1].q,-28);
  const PD=K.pathDist(R.tree);for(let i=0;i<5;i++)for(let j=0;j<5;j++)near(PD[N[i]][N[j]],D[i][j],1e-9,'toplanabilir uzaklık');
  /* el ile kurulan 4 yapraklı toplanabilir ağaç: ((A:1,B:2):3,(C:4,D:5)) → d(A,C)=8 */const T4={ch:[[{ch:[[{name:'A'},1],[{name:'B'},2]]},3],[{ch:[[{name:'C'},4],[{name:'D'},5]]},0]]},P4=K.pathDist(T4),n4=['A','B','C','D'];
  eq(P4.A.C,8);eq(P4.B.D,10);const R4=K.nj(K.matrixFrom(n4,(x,y)=>P4[x][y]),n4);eq(K.rf(R4.tree,T4),0);const Q4=K.pathDist(R4.tree);for(const x of n4)for(const y of n4)near(Q4[x][y],P4[x][y],1e-9);
  /* aynı veride UPGMA: d(A,B)=3 en küçük, ilk düğüm 1,5 yükseklikte */eq(K.upgma(K.matrixFrom(n4,(x,y)=>P4[x][y]),n4).steps[0].h,1.5);}
/* köksüz karşılaştırma ve dış grupla köklendirme */
{const t1={ch:[[{ch:[[{name:'A'},1],[{name:'B'},1]]},1],[{name:'C'},1],[{name:'D'},1]]},t2={ch:[[{ch:[[{name:'A'},1],[{name:'C'},1]]},1],[{name:'B'},1],[{name:'D'},1]]};eq(K.rf(t1,t1),0);eq(K.rf(t1,t2),2);
  const r=K.rootOnLeaf(t1,'D');assert.deepEqual([...K.clades(r)].sort(),['A,B','A,B,C','A,B,C,D']);checks++;near(K.pathDist(r).A.D,K.pathDist(t1).A.D,1e-12);eq(K.splitKey(['C','D'],['A','B','C','D']),'C,D');eq(K.splitKey(['A','B'],['A','B','C','D']),'C,D');}
/* uzun dal: UPGMA yanılır, NJ bulur (uzun dizide) */
{let ru=0,rn=0;for(let s=1;s<=10;s++){const B=K.buildTrees(K.evolve(K.T_UZUN,3000,s),K.TAXA,'jc');if(K.rf(B.up.tree,K.T_UZUN)===0)ru++;if(K.rf(B.nj.tree,K.T_UZUN)===0)rn++;}eq(ru,0,'UPGMA uzun dalda yanılır');eq(rn,10,'NJ uzun dalı çözer');
  let both=0;for(let s=1;s<=10;s++){const B=K.buildTrees(K.evolve(K.T_SAAT,1000,s),K.TAXA,'jc');if(K.rf(B.up.tree,K.T_SAAT)+K.rf(B.nj.tree,K.T_SAAT)===0)both++;}eq(both,10,'saat geçerliyken ikisi de');
  const PD=K.pathDist(K.T_SAAT);ok(['B','C','D','E','F'].every(x=>Math.abs(PD.A[x]/2-(x==='B'?0.05:x==='E'||x==='F'?0.3:0.15))<1e-12),'saat ağacı ultrametrik');
  const bs=K.bootstrap(K.evolve(K.T_SAAT,1000,1),K.TAXA,'jc','nj',50,1);eq(bs.B,50);ok((bs.support.get('E,F')||0)>=45,'güçlü grup yüksek destek');}
{const g=K.globinMatrix();near(g.P[1][2],K.pDistance(...K.dpAffine(K.PROT.HBB.seq,K.PROT.HBD.seq,K.BLAST_SC,'global').rows).p,1e-12);const NJ=K.rootOnLeaf(K.nj(g.J,K.GLOBINS).tree,'MB');ok([...K.clades(NJ)].includes('HBB,HBD')&&[...K.clades(NJ)].includes('HBB,HBD,HBG1'),'β-benzeri globinler bir grup');}

/* ── Ayrıştırıcılar ── */
for(const[s,v]of[['3',3],['-3',-3],['−3',-3],['0,25',0.25],['0.25',0.25],['3/12',0.25],['d = 0,5',0.5],[' 12 000 ',12000],['+2',2]])near(K.parseNumber(s).v,v,1e-12,'sayı '+s);
eq(K.parseNumber('%25').pct,true);eq(K.parseNumber('25 %').v,25);for(const s of['','1,2.3','abc','1/0','2..5'])assert.throws(()=>K.parseNumber(s),K.ParseError,'geçersiz '+s),checks++;
eq(K.parseDNAans("5'-ac gt-3'").seq,'ACGT');eq(K.parseDNAans('ACGU').rna,true);assert.throws(()=>K.parseDNAans('ACGX'),K.ParseError);checks++;
assert.deepEqual(K.parseProtAns('Met-Lys-Val'),['MKV']);assert.deepEqual(K.parseProtAns('m k v'),['MKV']);assert.deepEqual(K.parseProtAns('MET'),['M','MET']);assert.deepEqual(K.parseProtAns('Met Ala Dur'),['MA*']);checks+=4;assert.throws(()=>K.parseProtAns('MKB#'),K.ParseError);checks++;
eq(K.parseChoice('Küresel',{kuresel:['küresel'],yerel:['yerel']}),'kuresel');eq(K.parseChoice('LOCAL',{kuresel:['global'],yerel:['local']}),'yerel');assert.throws(()=>K.parseChoice('belki',{a:['x']}),K.ParseError);checks++;
{const t=K.parseNewick('((A:1,B:2),(C, D));',['A','B','C','D']);assert.deepEqual([...K.clades(t)].sort(),['A,B','A,B,C,D','C,D']);checks++;for(const s of['((A,B),(C,D)','((A,B),(C,C))','((A,B),C)','((A,B),(C,X))'])assert.throws(()=>K.parseNewick(s,['A','B','C','D']),K.ParseError,s),checks++;
  assert.deepEqual([...K.clades(K.parseNewick('[[a,b],c],d',['A','B','C','D']))].sort(),['A,B','A,B,C','A,B,C,D']);checks++;}

/* ── Alıştırmalar: her soru kendi cevabıyla doğru; bir kısmı testin kendi hesabıyla yeniden çözülür ── */
let generated=0;
for(let L=1;L<=3;L++)for(const[t]of K.TYPES[L-1])for(let n=1;n<=120;n++){const ex=K.makeExercise(L,n,t);generated++;eq(K.grade(ex,ex.answer.replace(/ \(.*\)$/,'')).st,'dogru',`${L}/${t}/${n} cevap: ${ex.answer}`);
  eq(K.makeExercise(L,n,t).prompt,ex.prompt,'tohum kararlı');ok(ex.steps.length>=2&&ex.hint.length>10);
  if(t==='rc'){const s=ex.prompt.match(/5′-([ACGT]+)-3′/)[1];eq(ex.target,myRC(s));eq(K.grade(ex,s.toLowerCase()).st,'yanlis');}
  if(t==='cevir'){const s=ex.prompt.match(/5′-([ACGT]+)-3′/)[1];eq(ex.target,myTr(s).replace(/\*$/,''));const three=[...ex.target].map(c=>Object.entries({A:'Ala',R:'Arg',N:'Asn',D:'Asp',C:'Cys',Q:'Gln',E:'Glu',G:'Gly',H:'His',I:'Ile',L:'Leu',K:'Lys',M:'Met',F:'Phe',P:'Pro',S:'Ser',T:'Thr',W:'Trp',Y:'Tyr',V:'Val'}).find(([k])=>k===c)[1]).join('-');eq(K.grade(ex,three).st,'dogru','üç harfli '+three);}
  if(t==='puan'||t==='blosum'){const[A,B]=ex.pre.split('\n');const m=ex.prompt.match(/eşleşme \+(\d), uyuşmazlık −(\d), boşluk −(\d)/);const sc=t==='blosum'?K.scheme({kind:'prot',ext:4}):K.scheme({kind:'dna',match:+m[1],mismatch:+m[2],ext:+m[3]});eq(ex.target,myScore(A,B,sc),'hizalama puanı');}
  if(t==='pmesafe'){const[A,B]=ex.pre.split('\n');eq(ex.target,[...A].filter((c,k)=>c!==B[k]).length/A.length);eq(K.grade(ex,String(ex.target*100).replace('.',',')+' %').st,'dogru');}
  if(t==='hucre'||t==='swhucre'){const m=ex.prompt.match(/satır harfi (\w), sütun harfi (\w)\. Çapraz(?: komşu)? (−?\d+), üst(?: komşu)? (−?\d+), sol(?: komşu)? (−?\d+)\. Puanlama: eşleşme \+(\d), uyuşmazlık −(\d), boşluk −(\d)/);const v=x=>Number(x.replace('−','-'));
    const s=m[1]===m[2]?+m[6]:-m[7];const c=[v(m[3])+s,v(m[4])-m[8],v(m[5])-m[8]];if(t==='swhucre')c.push(0);eq(ex.target,Math.max(...c),'göz '+t);}
  if(t==='jc'){const m=ex.prompt.match(/^(\d+) konumluk.* (\d+) konumda/);const p=m[2]/m[1];near(ex.target,-0.75*Math.log(1-4*p/3),1e-12);eq(K.grade(ex,String(p)).st,'yanlis');if(ex.target>0.35)eq(K.grade(ex,(ex.target*1.008).toFixed(5)).st,'yaklasik');eq(K.grade(ex,(ex.target*1.05).toFixed(5)).st,'yanlis');}
  if(t==='duzen'){const m=ex.prompt.match(/^([ACGT]+) dizisini ([ACGT]+) dizisine/);eq(ex.target,myEdit(m[1],m[2]));}
  if(t==='nw'||t==='sw'){const m=ex.prompt.match(/“([ACGT]+)” ile “([ACGT]+)”.*eşleşme \+(\d), uyuşmazlık −(\d), boşluk −(\d)/);const sc=K.scheme({kind:'dna',match:+m[3],mismatch:+m[4],ext:+m[5]});eq(ex.target,bruteBest(m[1],m[2],sc,t==='nw'?'global':'local').best,'kaba kuvvet '+t);}
  if(t==='njq'){const m=ex.prompt.match(/Q\((\w),(\w)\)/),i='ABCD'.indexOf(m[1]),j='ABCD'.indexOf(m[2]),D=ex.D;const R=D.map(r=>r.reduce((a,b)=>a+b,0));eq(ex.target,2*D[i][j]-R[i]-R[j]);}
  if(t==='upgma'){const D=ex.D,N=ex.names;/* testin kendi UPGMA’sı: ultrametrik tabloda en küçük çiftler */const cl=[];let groups=N.map(x=>[x]);const dist=(g,h)=>{let s=0;for(const x of g)for(const y of h)s+=D[N.indexOf(x)][N.indexOf(y)];return s/(g.length*h.length);};
    while(groups.length>1){let bi=0,bj=1,bv=Infinity;for(let i=0;i<groups.length;i++)for(let j=i+1;j<groups.length;j++){const v=dist(groups[i],groups[j]);if(v<bv-1e-12){bv=v;bi=i;bj=j;}}const g=[...groups[bi],...groups[bj]];cl.push(g.slice().sort().join(','));groups=groups.filter((_,k)=>k!==bi&&k!==bj).concat([g]);}
    assert.deepEqual(ex.target.slice().sort(),cl.filter(c=>c.length<7).sort());checks++;eq(K.grade(ex,'(A,B,C,D)').st,'eksik');}
  if(t==='secim')eq(K.grade(ex,ex.target==='kuresel'?'yerel':'global').st,'yanlis');}
/* tuzak geri bildirimleri */
{const e=K.makeExercise(1,4,'rc'),s=e.prompt.match(/5′-([ACGT]+)-3′/)[1];const comp=[...s].map(c=>({A:'T',T:'A',C:'G',G:'C'})[c]).join('');ok(K.grade(e,comp).msg.includes('tümleyeni'));
  const h=K.makeExercise(2,5,'hucre');eq(K.grade(h,'x').st,'gecersiz');const j=K.makeExercise(2,2,'jc');ok(K.grade(j,String(-0.75*Math.log10(1-4*(+j.prompt.match(/ (\d+) konumda/)[1]/+j.prompt.match(/^(\d+)/)[1])/3))).msg.includes('10 tabanında'));}

/* ── Sık yapılan hatalar ── */
eq(K.MISTAKES.length,8);ok(new Set(K.MISTAKES.map(m=>m.id)).size===8);for(const m of K.MISTAKES)ok(m.title&&m.wrong&&m.right&&m.why.length>80,m.id);
ok(K.MISTAKES.find(m=>m.id==='cerceve').wrong.includes(myTr(K.INS_MRNA).slice(0,20)));ok(K.MISTAKES.find(m=>m.id==='blosum').right.includes('s(W,W) = 11'));ok(K.MISTAKES.find(m=>m.id==='doyma').right.includes('0,233'));
/* ── Doğrulayıcı eklemeleri (13 Kasım 2026) ── */
/* proteinde N asparajindir: nokta grafiği onu eşleşme saymalı (testin kendi sayımı); DNA’da N eşleşmez */
{const myDots=(a,b,w,t,skipN)=>{let n=0;for(let i=0;i+w<=a.length;i++)for(let j=0;j+w<=b.length;j++){let c=0;for(let k=0;k<w;k++)if(a[i+k]===b[j+k]&&!(skipN&&a[i+k]==='N'))c++;if(c>=t)n++;}return n;};
  eq(K.dotplot(K.PROT.HBA.seq,K.PROT.HBB.seq,10,4,false,'prot').length/2,myDots(K.PROT.HBA.seq,K.PROT.HBB.seq,10,4,false),'HBA–HBB nokta sayısı (N = asparajin)');eq(myDots(K.PROT.HBA.seq,K.PROT.HBB.seq,10,4,false),192);
  const r=K.rng(77);for(let t=0;t<30;t++){const s=[...Array(40)].map(()=>'ACGTN'[Math.floor(r()*5)]).join(''),u=[...Array(35)].map(()=>'ACGTN'[Math.floor(r()*5)]).join('');eq(K.dotplot(s,u,6,4).length/2,myDots(s,u,6,4,true),'DNA nokta grafiği, N eşleşmez');}}
/* ayrıştırıcı: “5-…-3”, eksi işaretinden sonra boşluk, bilinmeyen üç harfli kısaltma, işaret geri bildirimi */
eq(K.parseDNAans('5-acgt-3').seq,'ACGT');eq(K.parseDNAans('5–ACGT–3').seq,'ACGT');eq(K.parseDNAans('ACGT').seq,'ACGT');near(K.parseNumber('- 24').v,-24,1e-12);near(K.parseNumber('− 0,5').v,-0.5,1e-12);
assert.throws(()=>K.parseProtAns('Met-Ala-Gyl'),K.ParseError);checks++;assert.deepEqual(K.parseProtAns('Met Ala Gly'),['MAG']);checks++;
{const e=K.makeExercise(3,1,'njq');eq(K.grade(e,'- '+Math.abs(e.target)).st,e.target<0?'dogru':'yanlis');if(e.target!==0)ok(K.grade(e,String(-e.target)).msg.includes('İşaret ters'));}
ok(K.MISTAKES.find(m=>m.id==='kimlik').why.includes('bir soyda hızlanma (uzun dal)'),'hata kartı gerçek menü adını kullanmalı');
console.log(`G biyoinformatik-ve-dizi-hizalama: ${checks.toLocaleString('tr-TR')} bağımsız çekirdek kontrolü PASS (${generated} üretilmiş soru)`);

if(process.argv.includes('--browser')){
  const {chromium}=await import('playwright');const {createServer}=await import('node:http');const {join,extname}=await import('node:path');const {fileURLToPath}=await import('node:url');const root=fileURLToPath(new URL('../',import.meta.url));
  const server=createServer((req,res)=>{const file=join(root,decodeURIComponent(new URL(req.url,'http://localhost').pathname));if(!fs.existsSync(file)||fs.statSync(file).isDirectory()){res.writeHead(404).end();return;}res.setHeader('Content-Type',({'.html':'text/html; charset=utf-8','.js':'text/javascript; charset=utf-8','.css':'text/css; charset=utf-8'})[extname(file)]||'application/octet-stream');res.end(fs.readFileSync(file));});await new Promise(r=>server.listen(0,'127.0.0.1',r));let browser;const before=checks;
  try{browser=await chromium.launch();
    for(const[theme,width]of[['light',390],['dark',1280]]){
      const page=await browser.newPage({viewport:{width,height:900},deviceScaleFactor:width===390?2:1});await page.addInitScript(t=>{localStorage.setItem('acelya-theme',t);localStorage.setItem('acelya-sound-muted','1');},theme);page.setDefaultTimeout(8000);
      const errors=[];page.on('pageerror',e=>errors.push(e.message));
      page.on('response',r=>{if(r.status()>=400&&!/shared\/digest\/biyoinformatik-ve-dizi-hizalama\.js$/.test(r.url()))errors.push(r.status()+' '+r.url());});
      page.on('console',m=>{if(m.type()==='error'&&!/Failed to load resource/.test(m.text()))errors.push(m.text());});
      await page.goto(`http://127.0.0.1:${server.address().port}/biyoinformatik-ve-dizi-hizalama.html`);await page.waitForTimeout(250);
      const click=id=>page.locator('#'+id).click(),read=async id=>(await page.locator('#'+id).textContent()).replace(/[  ]/g,' '),set=(id,v)=>page.locator('#'+id).evaluate((e,v)=>{if(e.type==='checkbox')e.checked=v;else e.value=v;e.dispatchEvent(new Event(e.tagName==='SELECT'||e.type==='checkbox'?'change':'input',{bubbles:true}));},v),
        is=async(id,t)=>{eq(await read(id),t,id);},has=async(id,t)=>{const s=await read(id);ok(s.includes(t),`${id}: “${s}” içinde “${t}” yok`);},fits=async()=>eq(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),true,'yatay taşma'),
        waitText=async(id,t)=>{await page.waitForFunction(([id,t])=>document.getElementById(id).textContent.includes(t),[id,t],{timeout:20000});checks++;};
      eq(await page.evaluate(()=>[...document.querySelectorAll('.app-content input,.app-content select,.app-content textarea')].filter(e=>!document.querySelector('label[for="'+e.id+'"]')).map(e=>e.id).join()),'','etiketsiz denetim');
      eq(await page.evaluate(()=>{const cs=[...document.querySelectorAll('.app-content svg.bi-svg,.app-content canvas')];return cs.length===6&&cs.every(c=>c.getAttribute('role')==='img'&&!!c.getAttribute('aria-label'));}),true,'svg/canvas erişilebilirliği');
      eq(await page.evaluate(()=>Object.isFrozen(BioLab)&&!Object.getOwnPropertyDescriptor(window,'BioLab').writable),true);
      eq(await page.evaluate(()=>/[̀-ͯ]/.test(document.body.innerText)),false,'birleşik aksan işareti yok');
      eq(await page.evaluate(()=>document.querySelectorAll('input[type=number]').length),0);eq(await page.evaluate(()=>document.title.length<=80),true);
      eq(await page.locator('#bundan-sonra ~ .bi-next a').count(),5,'Bundan sonra: beş mevcut sayfa');for(const h of['algoritmalar','veri-yapilari','dogal-secilim','hipotez-testi-ve-guven-araligi','makine-ogrenmesi-derin-ogrenme-llm'])eq(await page.locator('.bi-next a[href="'+h+'.html"]').count(),1,h);
      eq(await page.locator('a[href="populasyon-genetigi.html"],a[href="gen-muhendisligi.html"]').count()>=2,true,'genetik yolu komşu derslerine bağlantı');eq(await page.evaluate(()=>/\(hazırlanıyor\)/.test(document.body.textContent)),false,'hazırlanıyor notu kalmadı');
      // 01 · Dizi
      await is('dzLen','465 baz');await is('dzGC','%63,9');await is('dzOrf','60..392 (+3)');await is('dzCds','60..392 (+3)');await has('dzStatus','harfi harfine aynı');await is('dzExp','≈ '+K.fmt(K.orfExpect(K.INS_MRNA,30).E,2));
      eq(await page.locator('#dzOrfTable tr').count(),3);eq(await page.locator('#codeTable div.is-stop').count(),3);eq(await page.locator('#codeTable div.is-start').count(),1);await has('dzRc',K.revcomp(K.INS_MRNA).slice(0,30));
      await has('dzTr','MALWMRLLPLLALLALWGPDPAAAFVNQHLCGSHLVEALYLVCGERGFFYTPKTRREAEDLQVGQVELGGGPGAGSLQPLALEGSLQKRGIVEQCCTSICSLYQLENYCN*');
      await set('dzFrame','0');await has('dzTrN','+1 çerçevesi');await set('dzMin',100);await is('dzMinOut','100 aa');eq(await page.locator('#dzOrfTable tr').count(),1);
      await click('dzP2');await has('dzStatus','yapay genden uzun');await set('dzMin',30);await has('dzOrf','(−1)');await has('dzStatus','45 kodonluk');await has('dzCds','(−)');ok((await read('dzTrN')).startsWith('−1'),'eksi çerçeve seçili');
      await click('dzP3');await has('dzCds','—');await has('dzLen','600 baz');await set('dzIn','>x\nACGTXX');await has('dzStatus','okunamadı');eq(await page.locator('#dzStatus.is-bad').count(),1);
      await set('dzIn','5\'-AUG GCC UAA-3\'');await is('dzLen','9 baz');await click('diziReset');await is('dzOrf','60..392 (+3)');await fits();
      await page.locator('#tab-dizi').focus();await page.keyboard.press('ArrowRight');eq(await page.locator('#tab-nokta').getAttribute('aria-selected'),'true');
      // 02 · Nokta grafiği ve düzenleme
      await is('npWOut','11 harf');await is('npTOut','8 / 11');await has('npDotsN','ana köşegen');await has('npStatus','gerçek benzerlik');await is('edD','3');await is('edNW','puan −3 → uzaklık 3');await is('edDel','19 825');await has('edOps','g ekle');
      await click('npP2');await ok(Number((await read('npRc')).split(' ')[0])>20,'ters dönmüş parça: mor köşegen');await click('npP4');await has('npKind','protein');await is('npDots','192');eq(await page.locator('#npRcOn').isDisabled(),true);await is('npRc','—');
      await set('npW',3);await set('npT',3);await has('npStatus','tohum');await set('npT',1);await has('npStatus','Eşik çok düşük');
      await set('npW',5);await is('npTOut','1 / 5');await set('npT',9);eq(await page.locator('#npT').inputValue(),'5','t ≤ w');
      await set('edA','ışık');await set('edB','IŞIK');await is('edD','0');await set('edA','GATTACA');await set('edB','GCATGCU');await is('edD',String(K.editDistance('gattaca','gcatgcu').d));
      await page.locator('h1').click();await page.keyboard.press('r');await is('edD','3');await is('npTOut','8 / 11');await fits();
      eq(await page.evaluate(()=>{const c=document.getElementById('dpCanvas');return c.width>100&&c.height===c.width;}),true,'kare nokta grafiği');
      // 03 · Tablo
      await click('tab-tablo');await is('tbScore','0');await is('tbBrute','0');await has('tbBruteN','48 639 hizalama');await has('tbScoreN','eş-en iyi hizalama sayısı 3');eq(await page.locator('#tbTable td.is-path').count(),9);eq(await page.locator('#tbTable td').count(),64);
      await click('tbClear');await is('tbFill','0 / 49');await is('tbScore','—');eq(await page.locator('#tbTable td.is-empty').count(),49);
      await click('tbStep');await is('tbFill','1 / 49');await has('tbCell','en büyüğü: 1');eq(await page.locator('#tbTable td.is-cur').count(),1);eq(await page.locator('#tbTable td.is-src').count(),3);
      await click('tbRow');await is('tbFill','7 / 49');await click('tbRow');await is('tbFill','14 / 49');await click('tbAll');await is('tbFill','49 / 49');await is('tbScore','0');
      await click('tbP2');await is('tbScore','13');await has('tbAln','GTT-AC');await has('tbStatus','en büyük gözden');eq(await page.locator('#tbTable td.is-max').count(),1);await is('tbBrute','13');eq(await page.locator('#tbMatchF').isVisible(),true);
      await click('tbP3');eq(await page.locator('#tbMatchF').isHidden(),true);await is('tbScore',K.fmt(K.dpLinear('HEAGAWGHEE','PAWHEAE',K.scheme({kind:'prot',ext:8}),'global').score,0));await is('tbBrute',await read('tbScore'));await set('tbA','HEAGAWGHEEKL');await set('tbB','PAWHEAEHEAGA');await is('tbBrute','yapılmadı');await has('tbBruteN','çok fazla');await set('tbA','HEAGAWGHEE');await set('tbB','PAWHEAE');
      await set('tbMode','local');await is('tbScore',K.fmt(K.dpLinear('HEAGAWGHEE','PAWHEAE',K.scheme({kind:'prot',ext:8}),'local').score,0));
      await set('tbKind','dna');await set('tbA','ACXG');await has('tbStatus','okunamadı');await set('tbA','GATTACA');await set('tbB','');await has('tbStatus','boş');
      await click('tabloReset');await is('tbScore','0');await is('tbGapOut','−1');await fits();
      // 04 · Anlamlılık
      await click('tab-anlam');await is('anScore','285');await is('anId','%44,5');await waitText('anP','0,0050');await is('anP','≤ 0,0050');await has('anPN','(0 + 1)/(200 + 1)');await has('anStatus','homoloji');
      const SS=await page.evaluate(()=>{const K=BioLab;return K.permSummary(285,K.shuffleScores(K.PROT.HBA.seq,K.PROT.HBB.seq,K.BLAST_SC,'local',200,1));});await is('anZ',K.fmt(SS.z,1));await is('anShuf','ort. '+K.fmt(SS.G.mean,1)+' ± '+K.fmt(SS.G.sd,1));
      eq(await page.evaluate(()=>document.getElementById('anSvg').childElementCount>10),true,'histogram');
      await set('anPair','HBB-LYZ');await set('anN','100');await waitText('anShufN','100 karıştırma');ok(!(await read('anP')).includes('≤'),'ilgisiz çift: p büyük');eq(await page.locator('#anStatus.is-bad').count(),1);await has('anStatus','şansla açıklanabilir');
      await set('anMode','global');await waitText('anShufN','100 karıştırma');await is('anPG','uygulanmaz');
      await set('anPair','custom');eq(await page.locator('#anA').isVisible(),true);await set('anA','MKV1');await waitText('anShufN','100 karıştırma');await set('anA','MK#');await has('anStatus','okunamadı');
      await set('anPair','HBB-HBD');await set('anOpen',0);await is('anOpenOut','0');await click('anlamReset');await is('anScore','285');await waitText('anShufN','200 karıştırma');eq(await page.locator('#anA').isHidden(),true);await fits();
      // 05 · Ağaçlar
      await click('tab-agac');await is('agUpOk','doğru topoloji');await is('agNjOk','doğru topoloji');eq(await page.locator('#agTable tr').count(),15);await has('agSteps','UPGMA');
      await set('agData','uzun');await is('agUpOk','yanlış topoloji');await is('agNjOk','doğru topoloji');await has('agStatus','UPGMA');await click('agBootBtn');await is('agBoot','100 tekrar');
      eq(await page.evaluate(()=>document.querySelectorAll('#agNj text.t-warm').length),3,'NJ iç dallarında destek');eq(await page.evaluate(()=>document.querySelectorAll('#agUp text.t-warm').length),3,'UPGMA iç düğümlerinde destek');
      await set('agL',200);await is('agBoot','—');await set('agScale',4);await has('agLOut','200');await set('agCorr','p');
      await set('agData','globin');eq(await page.locator('#agL').isHidden(),true);eq(await page.locator('#agBootBtn').isDisabled(),true);eq(await page.locator('#agTable tr').count(),10);await has('agNjOk','MB');await has('agStatus','paralog');
      await click('agacReset');await is('agUpOk','doğru topoloji');eq(await page.locator('#agL').inputValue(),'1000');await fits();
      await page.locator('#tab-agac').focus();await page.keyboard.press('Home');eq(await page.locator('#tab-dizi').getAttribute('aria-selected'),'true');await page.keyboard.press('End');eq(await page.locator('#tab-agac').getAttribute('aria-selected'),'true');
      // Alıştırma
      await has('pQ','ATGACAGAA');eq(await page.locator('#pStep').isDisabled(),true);await set('pAns','Met-Thr-Glu');await click('pCheck');eq(await page.locator('#pFb').getAttribute('data-st'),'dogru');await has('pScore','1 soru doğru, 1 deneme');
      await set('pAns','MTEX');await click('pCheck');eq(await page.locator('#pFb').getAttribute('data-st'),'gecersiz');
      await click('pHint');eq(await page.locator('#pHintBox').isVisible(),true);const nst=await page.evaluate(()=>BioLab.makeExercise(1,1).steps.length);for(let i=0;i<nst;i++)await click('pStep');eq(await page.locator('#pSteps li').count(),nst);eq(await page.locator('#pStep').isDisabled(),true);
      await click('pNew');await is('pNoOut','2');eq(await page.locator('#pSteps').isHidden(),true);
      for(const L of['1','2','3']){await set('pLevel',L);const nT=await page.locator('#pType option').count();eq(nT,[0,4,5,5][+L]+1);for(let i=1;i<nT;i++){await page.locator('#pType').selectOption({index:i});const ex=await page.evaluate(()=>{const L=+document.getElementById('pLevel').value,n=+document.getElementById('pNo').value,t=document.getElementById('pType').value;const e=BioLab.makeExercise(L,n,t);return{answer:e.answer,pre:!!e.pre,D:!!e.D};});
        eq(await page.locator('#pPre').isVisible(),ex.pre);eq(await page.locator('#pMatWrap').isVisible(),ex.D);await set('pAns',ex.answer.replace(/ \(.*\)$/,''));await page.locator('#pAns').press('Enter');eq(await page.locator('#pFb').getAttribute('data-st'),'dogru','arayüz notlaması '+ex.answer);}}
      // Hatalar
      eq(await page.locator('#mistakes .bi-card').count(),8);await has('mk-blosum','s(W,W) = 11');await has('mk-cerceve','MALWMRLL');
      for(const t of['dizi','nokta','tablo','anlam','agac']){await click('tab-'+t);await fits();eq(await page.locator('#panel-'+t).isVisible(),true);
        eq(await page.evaluate(t=>[...document.querySelectorAll('#panel-'+t+' svg.bi-svg')].every(s=>s.childElementCount>2&&s.viewBox.baseVal.width>200),t),true,t+' svg boş');}
      assert.deepEqual(errors,[]);checks++;await page.close();}
    console.log(`G biyoinformatik-ve-dizi-hizalama: ${checks-before} tarayıcı kontrolü PASS (390 px açık, 1280 px koyu)`);
  }finally{await browser?.close();await new Promise(r=>server.close(r));}
}
