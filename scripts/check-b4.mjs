// B4: sayfalardaki gerçek çekirdekler; bağımsız hücre, cebir ve rasyonel referanslar.
import fs from 'node:fs';
import vm from 'node:vm';
import assert from 'node:assert/strict';
const root=new URL('..',import.meta.url);let checks=0;
const equal=(a,b,label)=>{assert.deepEqual(a,b,label);checks++;};
const near=(a,b,label,tol=1e-11)=>{assert.ok(Number.isFinite(a)&&Math.abs(a-b)<=tol*Math.max(1,Math.abs(b)),`${label}: ${a} ≠ ${b}`);checks++;};
function kernel(slug,name,start='/* PURE KERNEL START */',end='/* PURE KERNEL END */'){
  const source=fs.readFileSync(new URL(slug+'.html',root),'utf8'),a=source.indexOf(start),b=source.indexOf(end,a);
  assert.ok(a>=0&&b>a,slug+': çekirdek sınırları');const c=vm.createContext({window:{}});vm.runInContext(source.slice(a,b),c);
  equal(Object.isFrozen(c.window[name]),true,'Salt okunur hesap API');return c.window[name];
}
const S=kernel('tek-sayi-toplam3','OddSquareLab');
const keys=cells=>Array.from(cells,c=>`${c.x},${c.y}`).sort();
for(let n=0;n<=16;n++){
  const cells=S.squareCells(n),expected=[];
  for(let x=0;x<n;x++)for(let y=0;y<n;y++)expected.push({x,y});
  equal(keys(cells),keys(expected),'Kare bütün birim hücreleri bir kez içerir');
  for(let k=1;k<=n;k++)equal(cells.filter(c=>c.layer===k).length,2*k-1,'Gerçek L katmanı');
}
for(let n=0;n<=12;n++)for(let m=0;m<=n;m++){
  const cells=S.ringCells(n,m),ring=[],rectangle=[];
  for(let x=0;x<n;x++)for(let y=0;y<n;y++)if(x>=m||y>=m)ring.push({x,y});
  for(let x=0;x<n+m;x++)for(let y=0;y<n-m;y++)rectangle.push({x,y});
  equal(keys(cells),keys(ring),'Kare farkının gerçek hücre kümesi');
  equal(keys(cells.map(c=>c.target)),keys(rectangle),'Hedefte boşluk ve örtüşme yok');
  equal(cells.length,(n-m)*(n+m),'Alan korunur');
  for(const part of ['A','B']){
    const group=cells.filter(c=>c.part===part),first=group[0];
    for(const c of group){
      equal((c.x-first.x)**2+(c.y-first.y)**2,(c.target.x-first.target.x)**2+(c.target.y-first.target.y)**2,'Parçada uzaklık korunur');
    }
  }
}
const budgets=[0n,1n,2n,73n,80n,81n,9007199254740991n,9007199254740992n,9007199254740993n,10n**119n,10n**120n-1n];
for(const n of [1n,2n,16n,17n,12345n,2n**53n,10n**30n,10n**59n])budgets.push(n*n-1n,n*n,n*n+1n);
for(const L of budgets){
  const d=S.budget(L),n=d.n;
  equal(n*n<=L&&(n+1n)**2n>L,true,'Karekökün iki eşitsizlikli kesin sertifikası');
  equal(d.square,n*n,'Alt kare');equal(d.nextSquare,(n+1n)**2n,'Üst kare');
  equal(d.remainder,L-n*n,'Artan bütçe');equal(d.missing+d.remainder,d.nextCost,'Eksik + kalan = yeni katman');
  equal(d.nextCost,2n*n+1n,'Yeni L maliyeti');equal(d.drawable,n<=16n,'Kesin hesap ile çizim sınırı ayrılır');
  equal(S.parseBudget(String(L)),L,'120 rakama kadar kayıpsız okuma');
}
equal(S.parseBudget(' 00073 '),73n,'Baş sıfırlar ve dış boşluklar');
for(const s of ['', '-1','1.5','1e3','1,000','12x','9'.repeat(121)]){assert.throws(()=>S.parseBudget(s));checks++;}

const D=kernel('tek-sayi-toplam4','DifferenceSumLab');
for(const p of [2,3])for(let N=2;N<=16;N++){
  const d=D.sequence(N,p);let telescoped=0;
  for(const row of d.rows){const n=row.n;
    equal(row.value,n**p,'Polinom değeri');
    equal(row.backward,n===0?null:p===2?2*n-1:3*n*n-3*n+1,'Geri farkın bağımsız açılımı');
    equal(row.forward,n===N?null:p===2?2*n+1:3*n*n+3*n+1,'İleri farkın bağımsız açılımı');
    equal(row.second,n>=N-1?null:p===2?2:6*n+6,'İkinci farkın bağımsız açılımı');
    telescoped+=row.backward??0;equal(telescoped,n**p,'Bütün ara toplamlar teleskopiktir');
  }
}
for(let n=0;n<=30;n++)for(const a of [-10,-1,0,1,6,10])for(const delta of [-5,-2,0,2,5]){
  const d=D.arithmetic(n,a,delta),terms=Array.from({length:n},(_,i)=>a+i*delta),sum=terms.reduce((s,x)=>s+x,0);
  equal(Array.from(d.terms),terms,'Aritmetik dizi terimleri');equal(d.sum,sum,'İşaretli toplam');equal(d.formula,sum,'Eşleştirme özdeşliği');
  equal(d.last,n?terms.at(-1):null,'Boş dizinin son terimi yok');equal(d.mean,n?sum/n:null,'Boş dizinin ortalaması yok');
  equal(d.pairSum,2*sum,'Ters sıra iki kat toplam');equal(d.positive+d.negative,sum,'Pozitif ve negatif katkılar');
  for(const row of d.rows)equal(row.value+terms[n-row.k],row.pair,'Gerçek ters sıra eşleştirmesi');
}
for(let n=1;n<=64;n++)for(const L of [.5,1,2,3.5,5])for(const kind of ['linear','square']){
  const d=D.riemann(n,L,kind),I=kind==='linear'?L*L:L**3/3;
  const exact=kind==='linear'?{left:I-L*L/n,mid:I,right:I+L*L/n}:{left:I-L**3/(2*n)+L**3/(6*n*n),mid:I-L**3/(12*n*n),right:I+L**3/(2*n)+L**3/(6*n*n)};
  near(d.integral,I,'Analitik integral');
  for(const method of ['left','mid','right']){near(d.totals[method],exact[method],'Bağımsız kuvvet toplamı');near(d.errors[method],exact[method]-I,'İmzalı yaklaşım hatası');}
  near(d.rows[0].leftX,0,'İlk aralık sıfırdan');near(d.rows.at(-1).rightX,L,'Son aralık L noktasında');
  for(let i=1;i<d.rows.length;i++)near(d.rows[i-1].rightX,d.rows[i].leftX,'Bölmelerde boşluk yok');
}

const O=kernel('tek-sayi-toplam5','OddSeriesLab','/* KERNEL-BEGIN','/* KERNEL-END */');
// Rasyonel r=p/q için bütün polinom terimlerini ortak paydada tam tamsayıyla topla.
// Üretimdeki kayan nokta toplaması ve Horner yöntemi kullanılmaz.
function rationalSum(N,p,q){
  if(!N)return{num:0n,den:1n};let num=0n;
  for(let k=1;k<=N;k++)num+=BigInt(2*k-1)*p**BigInt(k-1)*q**BigInt(N-k);
  return{num,den:q**BigInt(N-1)};
}
// Büyük pay/payda Number'a ayrı çevrilmez: taşma olmadan 20 basamak kesir.
const ratio=(num,den)=>Number(num*10n**20n/den)/1e20;
const fractions=[[0n,1n],[1n,100n],[1n,10n],[1n,2n],[4n,5n],[19n,20n],[1n,1n],[11n,10n]];
for(const[p,q]of fractions)for(const N of [0,1,2,6,8,30,100,300]){
  const r=Number(p)/Number(q),a=O.finiteSum(N,r),ref=rationalSum(N,p,q),expected=ratio(ref.num,ref.den);
  near(a.sum,expected,'Tam rasyonel sonlu toplam');near(a.horner,expected,'Horner bağımsız rasyonel referansla');
  equal(a.partials.length,N+1,'Boş toplam dahil bütün kısmi toplamlar');
  if(p>=q){equal(O.infiniteSum(r),null,'Iraksak serinin sonlu limiti yok');equal(O.tail(N,r),null,'Iraksak seride kalan yok');continue;}
  const G=ratio(q*(q+p),(q-p)**2n),tailNumerator=p**BigInt(N)*((q+p)+2n*BigInt(N)*(q-p)),tailDenominator=q**BigInt(N)*(q+p);
  near(O.infiniteSum(r),G,'Geometrik türev özdeşliği');near(O.relativeTail(N,r),ratio(tailNumerator,tailDenominator),'Tam rasyonel bağıl kalan');
  near(a.sum+O.tail(N,r),G,'Sonlu katkı + kalan = tam seri');
  const g=O.geometric(N,r),massNum=q**BigInt(N)-p**BigInt(N),massDen=q**BigInt(N);
  near(g.mass,ratio(massNum,massDen),'Tam rasyonel olasılık kütlesi');near(g.outside,ratio(p**BigInt(N),massDen),'Dışarıdaki olasılık');
  near(g.mean,ratio(q+p,q-p),'Geometrik dönüşümün ortalaması');
  near(g.contribution,ratio((q-p)*ref.num,q*ref.den),'Kesilen aralığın tam ortalamaya katkısı');
  if(N)near(g.conditional,ratio((q-p)*ref.num*massDen,q*ref.den*massNum),'Yeniden normalize edilmiş koşullu ortalama');else equal(g.conditional,null,'Sıfır olasılıklı koşul tanımsız');
}
// Minimum N: tolerans karşılaştırmasını bölme ve logaritma olmadan tamsayılarla yap.
for(const[p,q]of fractions.filter(([p,q])=>p<q))for(const digits of [1,2,6,12])for(const cap of [20,100,2000]){
  let N=0;while(N<=cap&&p**BigInt(N)*((q+p)+2n*BigInt(N)*(q-p))*10n**BigInt(digits)>q**BigInt(N)*(q+p))N++;
  const d=O.firstN(Number(p)/Number(q),10**-digits,cap);
  equal(d.found,N<=cap,'Hedef arama sınırı');equal(d.N,N<=cap?N:null,'Tamsayılarla bağımsız ilk uygun N');
  equal(d.lastN,Math.min(N,cap),'Başarısız aramada son denenmiş N');
}
// G-A yaklaşık sıfır olsa bile gerçek pozitif kuyruk kaybolmamalı.
const small=O.relativeTail(100,.5),exactSmall=203/(3*2**100);
near(small/exactSmall,1,'Çok küçük kalan bağıl doğruluğu',1e-12);
equal(O.tail(300,.5)>0,true,'Toplam yuvarlanınca pozitif kuyruk sıfırlanmaz');
console.log(JSON.stringify({checks,pages:3,errors:0}));
