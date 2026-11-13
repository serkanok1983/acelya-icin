// G · kumeler-bagintilar-ve-fonksiyonlar: çekirdek, sayfanın kodunu yinelemeyen referanslarla sınanır
// (JS Set ile küme işlemleri, kendi ifade ağacı değerlendiricisi, niceleyici tanımlarıyla bağıntı özellikleri,
// erişilebilirlik aramasıyla geçişken kapanış, kaba kuvvet bağıntı/fonksiyon sayımları, Stirling özyinelemesi,
// JSON'a çevrilen küme metinleriyle ∈/⊆ denetimi). `--browser` gerçek arayüzü 390 px açık ve 1280 px koyu temada dener.
import fs from 'node:fs';
import assert from 'node:assert/strict';
const SLUG='kumeler-bagintilar-ve-fonksiyonlar';
const html=fs.readFileSync(new URL(`../${SLUG}.html`,import.meta.url),'utf8');
const source=html.split('/* KERNEL-BEGIN */')[1]?.split('/* KERNEL-END */')[0];
assert(source,'Çekirdek sınır işaretleri gerekli');
const K=new Function('"use strict";'+source+';return SetsLab;')();
let checks=0;
const eq=(a,b,msg)=>{assert.equal(a,b,msg);checks++;};
const ok=(c,msg)=>{assert(c,msg);checks++;};
ok(Object.isFrozen(K));
const R=(seed=>()=>{seed=(seed*1103515245+12345)%2147483648;return seed/2147483648;})(42);
const rnd=(a,b)=>a+Math.floor(R()*(b-a+1));
const randSet=(max=9)=>{const s=new Set();const k=rnd(0,6);for(let i=0;i<k;i++)s.add(rnd(1,max));return[...s];};
const sorted=s=>[...s].sort((a,b)=>a-b).join(',');

/* 1. Ayrıştırıcı: kabul edilen yazımlar ve hata iletileri */
const P=t=>{const r=K.parseSet(t);return r.ok?K.show(r.value):'HATA'};
const cases=[['{1, 2, 3}','{1, 2, 3}'],['{3,2,1}','{1, 2, 3}'],['  { 3 ,1 ,2 }  ','{1, 2, 3}'],['1, 2, 3','{1, 2, 3}'],['3','{3}'],['{1;2;3}','{1, 2, 3}'],
  ['∅','∅'],['Ø','∅'],['{}','∅'],['{ }','∅'],['{∅}','{∅}'],['{∅, ∅}','{∅}'],['{{}}','{∅}'],['{1, 1, 2, 2}','{1, 2}'],['{-3, −2, – 1}','{−3, −2, −1}'],['{-0, 0}','{0}'],
  ['{(1, a), (2,b)}','{(1, a), (2, b)}'],['(1,a),(1,b)','{(1, a), (1, b)}'],['{{1, 2}, {2, 1}}','{{1, 2}}'],['{b, a, 2, 1}','{1, 2, a, b}'],['{1,{2}}','{1, {2}}'],
  ['{∅, {a}, {b}, {a, b}}','{∅, {a}, {b}, {a, b}}'],['{{a,b},{b},∅,{a}}','{∅, {a}, {b}, {a, b}}'],['{ğ, ç, x1}','{x1, ç, ğ}'],['{1},{2}','{{1}, {2}}'],
  ['{1,,2}','HATA'],['{1,2','HATA'],['{1,2}}','HATA'],['1.5','HATA'],['{1 2}','HATA'],['{1,2,}','HATA'],['','HATA'],['   ','HATA'],['{(1,2}','HATA'],['{1}x','HATA'],['{#}','HATA'],['{-}','HATA'],['(1)','HATA']];
for(const[i,o]of cases)eq(P(i),o,'ayrıştır '+JSON.stringify(i));
ok(K.parseSet('{1,1}').dup&&!K.parseSet('{1,2}').dup&&K.parseSet('1,2').bare&&!K.parseSet('{1,2}').bare);
ok(/virgül/.test(K.parseSet('{1 2}').error)&&/eksik/.test(K.parseSet('{1,2').error)&&/ondalık/.test(K.parseSet('{1.5}').error));
for(const[i,o]of[['12',12],[' 1 000 ',1000],['1.000',1000],['1 000',1000],['3,5',3.5],['3.5',3.5],['−4',-4],['3/4',0.75],['-6/3',-2],['1/0',null],['abc',null],['',null],['1,000',1],['12 345 678',12345678]])eq(K.parseNum(i),o,'sayı '+i);
for(const[i,o]of[['Doğru',true],['d',true],['evet',true],['YANLIŞ',false],['hayır',false],['belki',null]])eq(K.parseTF(i),o);

/* Doğrulayıcı eklemeleri: terim birliği, önceki ders bağlantısı, Türkçe ek */
ok(html.includes('içerme–dışlama (içerme–dışarma)')&&(html.match(/dışarma/g)||[]).length===1,'içerme–dışlama terimi tek biçimde, dışarma yalnız bir kez');
ok((html.match(/href="ispat-yontemleri\.html"/g)||[]).length>=2&&!/İspat Yöntemleri dersi/.test(html),'İspat Yöntemleri bağlantısı');
for(let s=1;s<400;s++){const q=K.gen(1,s,'eqclass');if(q.data.n===2){ok(q.hint.includes('2’ye bölündüğünde'),'2’ye eki');break;}}
for(let s=1;s<400;s++){const q=K.gen(1,s,'eqclass');if(q.data.n===3){ok(q.hint.includes('3’e bölündüğünde'),'3’e eki');break;}}
/* 2. Küme işlemleri: JS Set ile */
for(let t=0;t<400;t++){const a=randSet(),b=randSet(),A=K.setOf(a),B=K.setOf(b),sa=new Set(a),sb=new Set(b);
  eq(sorted(K.union(A,B).items.map(x=>x.v)),sorted(new Set([...a,...b])));eq(sorted(K.inter(A,B).items.map(x=>x.v)),sorted(a.filter(x=>sb.has(x))));
  eq(sorted(K.diff(A,B).items.map(x=>x.v)),sorted(a.filter(x=>!sb.has(x))));eq(sorted(K.symdiff(A,B).items.map(x=>x.v)),sorted([...a.filter(x=>!sb.has(x)),...b.filter(x=>!sa.has(x))]));
  eq(K.subset(A,B),a.every(x=>sb.has(x)));eq(K.card(A),sa.size);eq(K.same(A,B),sorted(sa)===sorted(sb));
  const E=K.setOf([1,2,3,4,5,6,7,8,9]);eq(K.same(K.diff(E,K.union(A,B)),K.inter(K.diff(E,A),K.diff(E,B))),true,'De Morgan 1');eq(K.same(K.diff(E,K.inter(A,B)),K.union(K.diff(E,A),K.diff(E,B))),true,'De Morgan 2');}
for(let n=0;n<=6;n++){const A=K.setOf(Array.from({length:n},(_,i)=>'abcdef'[i])),Pw=K.power(A);eq(Pw.length,2**n);eq(new Set(Pw.map(e=>K.key(e.set))).size,2**n);ok(Pw.every(e=>K.subset(e.set,A)&&e.bits.length===n&&K.card(e.set)===[...e.bits].filter(c=>c==='1').length));
  for(let k=0;k<=n;k++)eq(Pw.filter(e=>K.card(e.set)===k).length,K.binom(n,k));}
eq(K.show(K.power(K.setOf(['a','b','c']))[5].set),'{a, c}');
eq(K.card(K.product(K.setOf([1,2,3]),K.setOf(['a','b']))),6);ok(!K.same(K.product(K.setOf([1,2]),K.setOf(['a'])),K.product(K.setOf(['a']),K.setOf([1,2]))));eq(K.card(K.product(K.setOf([]),K.setOf([1]))),0);

/* 3. Venn ifadeleri: elle bulunmuş maskeler ve rastgele ifade ağaçlarının gerçek kümelerle değerlendirilmesi */
const M2={'A ∪ B':14,'A ∩ B':8,'A ∖ B':2,'B ∖ A':4,'A Δ B':6,'A′':5,'(A ∪ B)′':1,'A′ ∩ B′':1,'(A ∩ B)′':7,'A′ ∪ B':13,"a u b":14,"(a+b)'":1,'E':15,'∅':0,'A - B':2,'A ^ B':6,"A n B'":2,'E ∖ A':5};
for(const[e,m]of Object.entries(M2))eq(K.parseExpr(e,2).mask,m,e);
for(const t of K.TARGETS[2])ok(K.parseExpr(t,2).ok);for(const t of K.TARGETS[3])ok(K.parseExpr(t,3).ok);
eq(K.parseExpr('A ∩ B ∩ C',3).mask,1<<7);eq(K.parseExpr('A′ ∩ B′ ∩ C′',3).mask,1);eq(K.parseExpr('A Δ B Δ C',3).mask,(1<<1)|(1<<2)|(1<<4)|(1<<7));
eq(K.parseExpr('A ∪ B ∩ C',3).mask,K.parseExpr('A ∪ (B ∩ C)',3).mask,'∩ önce');eq(K.parseExpr("A ∩ B'",2).mask,2,'′ önce');
for(const bad of['A B','(A ∪ B','A ∪','∪ A','A ∪ C','A ? B','',')A('])ok(!K.parseExpr(bad,2).ok,'hatalı ifade '+bad);
ok(/C kümesi/.test(K.parseExpr('A ∪ C',2).error));
const OPS=[['∪',(x,y)=>new Set([...x,...y])],['∩',(x,y)=>new Set([...x].filter(v=>y.has(v)))],['∖',(x,y)=>new Set([...x].filter(v=>!y.has(v)))],['Δ',(x,y)=>new Set([...x,...y].filter(v=>x.has(v)!==y.has(v)))]];
function tree(d,k){if(d===0||R()<0.25){const i=rnd(0,k-1);return{s:'ABC'[i],f:S=>S[i]};}if(R()<0.2){const t=tree(d-1,k);return{s:'('+t.s+')′',f:(S,U)=>new Set([...U].filter(v=>!t.f(S,U).has(v)))};}
  const[o,g]=OPS[rnd(0,3)],a=tree(d-1,k),b=tree(d-1,k);return{s:'('+a.s+' '+o+' '+b.s+')',f:(S,U)=>g(a.f(S,U),b.f(S,U))};}
for(let t=0;t<300;t++){const k=rnd(2,3),T=tree(4,k),U=new Set(Array.from({length:40},(_,i)=>i)),S=Array.from({length:k},()=>new Set([...U].filter(()=>R()<0.5)));
  const val=T.f(S,U),m=K.parseExpr(T.s,k).mask;for(const x of U){let r=0;S.forEach((s,i)=>{if(s.has(x))r|=1<<i;});eq(!!(m>>r&1),val.has(x),T.s);}}
eq(K.regionName(5,3),'A ∩ B′ ∩ C');eq(K.regionName(0,2),'A′ ∩ B′');
// Sayfadaki Venn dairelerinin bütün bölgeleri gerçekten var olmalı.
{const m=html.match(/const VG=\{2:\{h:(\d+),c:(\[\[.*?\]\])\},3:\{h:(\d+),c:(\[\[.*?\]\])\}\};/);ok(m,'VG');for(const[h,c,k]of[[+m[1],JSON.parse(m[2]),2],[+m[3],JSON.parse(m[4]),3]]){const seen=new Set();for(let x=7;x<394;x+=2)for(let y=7;y<h-6;y+=2){let r=0;c.forEach(([cx,cy,rr],i)=>{if((x-cx)**2+(y-cy)**2<rr*rr)r|=1<<i;});seen.add(r);}eq(seen.size,2**k,'Venn '+k);}}

/* 4. Bağıntılar: niceleyici tanımları, kapanışlar, sayımlar */
const props=(n,pairs)=>{const has=(a,b)=>pairs.some(p=>p[0]===a&&p[1]===b),U=[...Array(n).keys()];return{refl:U.every(a=>has(a,a)),sym:pairs.every(([a,b])=>has(b,a)),anti:pairs.every(([a,b])=>a===b||!has(b,a)),trans:pairs.every(([a,b])=>pairs.every(([c,d])=>c!==b||has(a,d)))};};
for(let t=0;t<600;t++){const n=rnd(2,5),M=Array.from({length:n},()=>Array.from({length:n},()=>R()<0.35)),pr=K.relPairs(M),ref=props(n,pr),P=K.relProps(M);
  for(const k of['refl','sym','anti','trans'])eq(P[k].ok,ref[k],k);
  if(!P.sym.ok){const[a,b]=P.sym.w;ok(M[a][b]&&!M[b][a]);}if(!P.trans.ok){const[a,b,c]=P.trans.w;ok(M[a][b]&&M[b][c]&&!M[a][c]);}if(!P.anti.ok){const[a,b]=P.anti.w;ok(a!==b&&M[a][b]&&M[b][a]);}
  const T=K.closeTrans(M);for(let a=0;a<n;a++){const seen=new Set(),st=[a];while(st.length){const x=st.pop();for(let y=0;y<n;y++)if(M[x][y]&&!seen.has(y)){seen.add(y);st.push(y);}}for(let b=0;b<n;b++)eq(T[a][b],seen.has(b),'kapanış');}
  ok(K.relProps(K.closeSym(M)).sym.ok&&K.relProps(K.closeRefl(M)).refl.ok&&K.relProps(T).trans.ok);
  const C=K.eqClasses(M);if(P.equiv){eq(C.flat().length,n);eq(new Set(C.flat()).size,n);for(const c of C)for(const a of c)for(const b of c)ok(M[a][b]);}else eq(C,null);}
for(const n of[2,3]){let all=0,refl=0,sym=0,anti=0;for(let m=0;m<2**(n*n);m++){const pairs=[];for(let i=0;i<n*n;i++)if(m>>i&1)pairs.push([Math.floor(i/n),i%n]);const p=props(n,pairs);all++;if(p.refl)refl++;if(p.sym)sym++;if(p.anti)anti++;}
  const C=K.relCounts(n);eq(C.all,all);eq(C.refl,refl);eq(C.sym,sym);eq(C.anti,anti);}
eq(K.relCounts(4).all,65536);eq(K.relCounts(4).refl,4096);eq(K.relCounts(4).sym,1024);
{const ref={empty:[0,1,1,1],eq:[1,1,1,1],le:[1,0,1,1],lt:[0,0,1,1],div:[1,0,1,1],par:[1,1,0,1],full:[1,1,0,1],trap:[0,1,0,1]};
  for(const[k,v]of Object.entries(ref)){const P=K.relProps(K.relFrom(4,K.REL_PRESETS[k]));eq([P.refl.ok,P.sym.ok,P.anti.ok,P.trans.ok].map(Number).join(),v.join(),k);}}
// Her görev n = 3'te çözülebilir; kaba kuvvetle bir çözüm bulunur ve boş bağıntı (sa, po dışında) reddedilir.
for(const g of K.REL_GOALS){let found=0;for(let m=0;m<512;m++){const M=Array.from({length:3},(_,i)=>Array.from({length:3},(_,j)=>!!(m>>(3*i+j)&1)));if(K.checkRelGoal(g.id,M).ok)found++;}ok(found>0,'görev '+g.id);ok(!K.checkRelGoal(g.id,K.relEmpty(3)).ok||g.id==='st','boş '+g.id);}
ok(K.checkRelGoal('st',K.relFrom(3,K.REL_PRESETS.trap)).ok);ok(K.checkRelGoal('eq2',K.relFrom(4,K.REL_PRESETS.par)).ok);ok(K.checkRelGoal('po',K.relFrom(4,K.REL_PRESETS.div)).ok);ok(!K.checkRelGoal('po',K.relFrom(4,K.REL_PRESETS.eq)).ok);
for(let n=1;n<=8;n++){const M=Array.from({length:24},(_,a)=>Array.from({length:24},(_,b)=>(a-b)%n===0));ok(K.relProps(M).equiv);eq(K.eqClasses(M).length,n);}
eq(K.mod(-1,5),4);eq(K.mod(-10,3),2);eq(K.mod(7,1),0);
// Bölünebilme: kendi bölen ve asal sınaması.
const dv=N=>{const o=[];for(let d=1;d<=N;d++)if(N%d===0)o.push(d);return o;},pr=p=>p>1&&dv(p).length===2;
for(const N of[1,2,12,18,24,30,36,45,50,60,72,97]){const D=dv(N),Pp=K.divPoset(D);eq(K.divisors(N).join(),D.join());let pairs=0,cov=0;for(const a of D)for(const b of D)if(b%a===0){pairs++;if(pr(b/a))cov++;}eq(Pp.pairs.length,pairs);eq(Pp.covers.length,cov);eq(Pp.minimal.join(),'1');eq(Pp.maximal.join(),String(N));}
eq(K.divPoset(dv(30)).pairs.length,27);eq(K.divPoset(dv(30)).covers.length,12);eq(K.divPoset(dv(12)).covers.length,7);
{const D=dv(30).filter(d=>d!==1&&d!==30),Pp=K.divPoset(D);eq(Pp.minimal.join(),'2,3,5');eq(Pp.maximal.join(),'6,10,15');}
for(let x=2;x<=200;x++){let c=0,y=x;for(let d=2;y>1;)if(y%d===0){y/=d;c++;}else d++;eq(K.bigOmega(x),c);eq(K.isPrime(x),pr(x));}

/* 5. Fonksiyonlar: kaba kuvvet ve Stirling sayıları */
const stir=(m,n)=>m===0&&n===0?1:m===0||n===0?0:n*stir(m-1,n)+stir(m-1,n-1),fact=n=>n<=1?1:n*fact(n-1);
for(let m=1;m<=6;m++)for(let n=1;n<=6;n++){const C=K.countMaps(m,n);eq(C.all,n**m);eq(C.inj,m<=n?fact(n)/fact(n-m):0);eq(C.surj,stir(m,n)*fact(n));eq(C.bij,m===n?fact(n):0);eq(K.surjFormula(m,n),stir(m,n)*fact(n));eq(K.falling(n,m),m<=n?fact(n)/fact(n-m):0);
  eq(K.funcGoalPossible(m,n,'inj'),m<n);eq(K.funcGoalPossible(m,n,'surj'),m>n);eq(K.funcGoalPossible(m,n,'bij'),m===n);eq(K.funcGoalPossible(m,n,'none'),m>=2&&n>=2);}
for(let t=0;t<500;t++){const m=rnd(1,5),n=rnd(1,5),M=Array.from({length:m},()=>Array.from({length:n},()=>R()<0.3)),F=K.funcOf(M);eq(F.isFunc,M.every(r=>r.filter(Boolean).length===1));
  if(F.isFunc){const f=F.f,P=K.funcProps(f,n);eq(P.inj,new Set(f).size===m);eq(P.surj,new Set(f).size===n);eq(P.image.join(),[...new Set(f)].sort((a,b)=>a-b).join());
    if(P.bij){ok(f.every((y,x)=>P.inverse[y]===x));eq(K.compose(f,P.inverse).join(),f.map((_,i)=>i).join());}else eq(P.inverse,null);}}
{const f=[1,0,2],g=[0,2,1];eq(K.compose(f,g).join(),'2,0,1');eq(K.compose(g,f).join(),'1,2,0');}
for(let t=0;t<200;t++){const f=[0,1,2].map(()=>rnd(0,2)),g=[0,1,2].map(()=>rnd(0,2)),h=[0,1,2].map(()=>rnd(0,2));eq(K.compose(K.compose(f,g),h).join(),K.compose(f,K.compose(g,h)).join(),'birleşme');}

/* 6. Sonsuz kümeler */
{const seen=new Set();for(let k=0;k<20001;k++){const z=K.natToInt(k);ok(!seen.has(z));seen.add(z);eq(K.intToNat(z),k);}for(let z=-10000;z<=10000;z++)ok(seen.has(z));}
eq([0,1,2,3,4].map(K.natToInt).join(),'0,1,-1,2,-2');eq(K.natToEven(7),14);
{const L=K.ratList(2000),keys=L.map(([p,q])=>p+'/'+q);eq(new Set(keys).size,2000);ok(L.every(([p,q])=>K.gcd(p,q)===1));eq(keys.slice(0,7).join(' '),'1/1 1/2 2/1 3/1 1/3 1/4 2/3');
  for(let p=1;p<=25;p++)for(let q=1;q<=25;q++)if(K.gcd(p,q)===1&&p+q<=40)ok(keys.includes(p+'/'+q),'zikzak '+p+'/'+q);
  let tot=0;for(let s=2;s<=9;s++)for(let p=1;p<s;p++)if(K.gcd(p,s-p)===1)tot++;eq(tot,27);const W=K.cantorWalk(27);ok(W.every(s=>s.p<=8&&s.q<=8));eq(W.filter(s=>!s.skip).length,27);
  const Q=new Set();for(let k=0;k<801;k++){const[p,q]=K.natToRat(k);ok(!Q.has(p+'/'+q));Q.add(p+'/'+q);}ok(Q.has('0/1')&&Q.has('-1/2')&&Q.has('3/1'));}
for(let s=1;s<=50;s++){const L=K.diagList(s);eq(L.length,6);const ch=L.map((r,i)=>K.diagRule(r[i])),C=K.diagCheck(L,ch);ok(C.every(c=>c.ok&&!c.edge));ok(ch.every(d=>d===4||d===5));for(let i=0;i<6;i++)ok(L[i].join('')!==ch.join('')+'');}
eq(K.diagList(1).map(r=>r.join('')).join(' '),'60599267 49441421 40372104 57226571 74792713 42175120');
{let maps=0;for(let m=0;m<512;m++){const F=[0,1,2].map(x=>[0,1,2].filter(y=>m>>(3*x+y)&1)),D=K.cantorD(F),Dset=[0,1,2].filter(x=>!F[x].includes(x));eq(D.join(),Dset.join());ok(F.every(s=>s.join()!==D.join()));maps++;}eq(maps,512);}

/* 7. Alıştırma üreteci: yanıtlar soru verisinden bağımsız hesaplanır, notlandırıcı esnek yazımları kabul eder */
const toJSON=t=>JSON.parse(t.replace(/∅/g,'[]').replace(/\{/g,'[').replace(/\}/g,']').replace(/\(/g,'[').replace(/\)/g,']').replace(/−/g,'-').replace(/([a-zçğışöü][a-z0-9]*)/gi,'"$1"'));
const canon=x=>Array.isArray(x)?'['+[...new Set(x.map(canon))].sort().join(',')+']':String(x);
const setStr=a=>'{'+a.join(', ')+'}',pairStr=ps=>'{'+ps.map(([a,b])=>'('+a+', '+b+')').join(', ')+'}';
const kindsSeen=new Set();
function expected(q){const d=q.data,S=x=>new Set(x);
  switch(q.kind){case'union':return setStr([...S([...d.A,...d.B])]);case'inter':return setStr(d.A.filter(x=>d.B.includes(x)));case'diff':return setStr(d.A.filter(x=>!d.B.includes(x)));
    case'symdiff':return setStr([...d.A,...d.B].filter(x=>d.A.includes(x)!==d.B.includes(x)));case'comp':return setStr(d.E.filter(x=>!d.A.includes(x)));
    case'demorgan':return setStr(d.E.filter(x=>!(d.isU?d.A.includes(x)||d.B.includes(x):d.A.includes(x)&&d.B.includes(x))));
    case'member':{const m=q.text.match(/A = (.*) olsun\. “(.*) (∈|⊆) A”/),A=toJSON(m[1]),Lraw=m[2],L=Lraw.startsWith('{')||Lraw==='∅'?toJSON(Lraw):Number(Lraw.replace('−','-'));
      if(m[3]==='∈')return A.some(x=>canon(x)===canon(L));return Array.isArray(L)&&L.every(y=>A.some(x=>canon(x)===canon(y)));}
    case'card':return d.raw?new Set(d.raw).size:d.sA+d.sB-d.sAB;case'powcount':return 2**d.n-(d.proper?1:0);
    case'product':return d.A?pairStr(d.A.flatMap(a=>d.B.map(b=>[a,b]))):d.a*d.b;
    case'power':{const n=d.A.length,o=[];for(let m=0;m<2**n;m++)o.push(setStr(d.A.filter((_,i)=>m>>i&1)));return'{'+o.join(', ')+'}';}
    case'ie3':return d.R.reduce((s,x)=>s+x,0);
    case'relprops':{const q3=props(3,d.pairs.map(([a,b])=>[a-1,b-1]));return[['Y',q3.refl],['S',q3.sym],['T',q3.anti],['G',q3.trans]].filter(x=>x[1]).map(x=>x[0]);}
    case'eqclass':{const o=[];for(let x=-10;x<=10;x++)if(((x-d.k)%d.n+d.n)%d.n===0)o.push(x);return setStr(o);}
    case'funcprops':return[['B',new Set(d.f).size===d.m],['O',new Set(d.f).size===d.n]].filter(x=>x[1]).map(x=>x[0]);
    case'countfun':{let all=0,inj=0,sur=0;const f=new Array(d.m).fill(0);for(let t=0;t<d.n**d.m;t++){const s=new Set(f).size;all++;if(s===d.m)inj++;if(s===d.n)sur++;for(let i=d.m-1;i>=0;i--){if(++f[i]<d.n)break;f[i]=0;}}return d.v==='all'?all:d.v==='inj'?inj:sur;}
    case'compose':return pairStr([0,1,2].map(x=>[x+1,(d.gf?d.g[d.f[x]]:d.f[d.g[x]])+1]));
    case'inverse':return pairStr(d.f.map((y,x)=>['abc'[y],x+1]));
    case'hasse':{const D=dv(d.N);let c=0;for(const a of D)for(const b of D)if(b%a===0&&(d.edges?pr(b/a):true))c++;return c;}
    case'countrel':{const n=d.n;let c=0;for(let m=0;m<2**(n*n);m++){const pairs=[];for(let i=0;i<n*n;i++)if(m>>i&1)pairs.push([Math.floor(i/n),i%n]);const p=props(n,pairs);if(d.v==='all'||(d.v==='refl'&&p.refl)||(d.v==='sym'&&p.sym))c++;}return c;}}
  throw Error('tür '+q.kind);}
const shuffleTxt=t=>{const r=K.parseSet(t);if(!r.ok||r.value.t!=='S'||!r.value.items.length)return t;const it=r.value.items.map(K.show).reverse();return' '+it.join(' ,  ')+' ';};
for(let level=0;level<3;level++)for(let seed=1;seed<=300;seed++){const q=K.gen(level,seed);kindsSeen.add(q.kind);ok(K.KINDS[level].includes(q.kind));ok(q.text.length>20&&q.hint.length>15&&q.steps.length>=1,'metin');
  const e=expected(q);
  if(q.type==='set'){const r=K.parseSet(e);ok(r.ok,'beklenen ayrışmalı '+e);eq(K.key(r.value),K.key(q.answer),`${q.kind} ${level}/${seed}`);ok(K.grade(q,e).ok);ok(K.grade(q,shuffleTxt(e)).ok,'karışık sıra');ok(K.grade(q,K.show(q.answer)).ok);
    if(K.card(q.answer)>0){ok(!K.grade(q,'∅').ok);ok(/Eksik/.test(K.grade(q,'∅').msg));}else{ok(K.grade(q,'{ }').ok);}ok(K.grade(q,'{1,,').invalid);}
  else if(q.type==='num'){eq(q.answer,e,`${q.kind} ${level}/${seed}`);ok(K.grade(q,String(e)).ok);ok(K.grade(q,' '+String(e).replace(/\B(?=(\d{3})+(?!\d))/g,' ')+' ').ok);ok(!K.grade(q,String(e+1)).ok);ok(K.grade(q,'x').invalid);}
  else if(q.type==='tf'){eq(q.answer,e,`${q.kind} ${level}/${seed} ${q.text}`);ok(K.grade(q,e).ok&&!K.grade(q,!e).ok&&K.grade(q,e?'doğru':'yanlış').ok);}
  else{eq(q.answer.slice().sort().join(),e.slice().sort().join(),`${q.kind} ${level}/${seed}`);ok(K.grade(q,[...e].reverse()).ok);const alt=q.opts.map(o=>o.k).filter(k=>!e.includes(k));ok(!K.grade(q,[...e,...alt.slice(0,1)]).ok||!alt.length);}
  const q2=K.gen(level,seed);eq(q2.text,q.text,'tohum tekrarı');}
for(const L of K.KINDS)for(const k of L)ok(kindsSeen.has(k),'tür görüldü '+k);
// Her türde en az bir “doğru” ve bir “yanlış” ∈/⊆ sorusu ve boş kesişim örneği var.
{const tf=[];for(let s=1;s<=600;s++){const q=K.gen(0,s,'member');tf.push(q.answer);}ok(tf.includes(true)&&tf.includes(false));let emptyInter=false;for(let s=1;s<=300;s++)if(K.card(K.gen(0,s,'inter').answer)===0)emptyInter=true;ok(emptyInter,'boş kesişim sorusu');}
eq(K.gen(0,1).text,'A = {2, 6, 8} ve B = {2, 3, 5, 7, 9} ise A ∪ B kümesini yazın.');
console.log(`G ${SLUG}: ${checks.toLocaleString('tr-TR')} bağımsız çekirdek kontrolü PASS`);

if(process.argv.includes('--browser')){
  const {chromium}=await import('playwright');const {createServer}=await import('node:http');const {join,extname}=await import('node:path');const {fileURLToPath}=await import('node:url');const root=fileURLToPath(new URL('../',import.meta.url));
  const server=createServer((req,res)=>{const file=join(root,decodeURIComponent(new URL(req.url,'http://localhost').pathname));if(!fs.existsSync(file)||fs.statSync(file).isDirectory()){res.writeHead(404).end();return;}res.setHeader('Content-Type',({'.html':'text/html; charset=utf-8','.js':'text/javascript; charset=utf-8','.css':'text/css; charset=utf-8'})[extname(file)]||'application/octet-stream');res.end(fs.readFileSync(file));});await new Promise(r=>server.listen(0,'127.0.0.1',r));let browser;const before=checks;
  try{browser=await chromium.launch();
    for(const[theme,width]of[['light',390],['dark',1280]]){
      const page=await browser.newPage({viewport:{width,height:900},deviceScaleFactor:width===390?2:1,hasTouch:width===390});await page.addInitScript(t=>{localStorage.setItem('acelya-theme',t);localStorage.setItem('acelya-sound-muted','1');},theme);page.setDefaultTimeout(8000);
      const errors=[];page.on('pageerror',e=>errors.push(e.message));
      const digest=new RegExp(`shared/digest/${SLUG}\\.js`);page.on('response',r=>{if(r.status()>=400&&!digest.test(r.url()))errors.push(r.status()+' '+r.url());});
      page.on('console',m=>{if(m.type()==='error'&&!/Failed to load resource/.test(m.text()))errors.push(m.text());});
      await page.goto(`http://127.0.0.1:${server.address().port}/${SLUG}.html`);await page.waitForFunction(()=>!!window.SetsLab);
      const click=id=>page.locator('#'+id).click(),read=async id=>(await page.locator('#'+id).textContent()).replace(/[  ]/g,' '),set=(id,v)=>page.locator('#'+id).evaluate((e,v)=>{e.value=v;e.dispatchEvent(new Event(e.tagName==='SELECT'?'change':'input',{bubbles:true}));},v),
        fill=async(id,v)=>{await page.locator('#'+id).fill(v);},is=async(id,t)=>{eq(await read(id),t,id);},has=async(id,t)=>{const s=await read(id);ok(s.includes(t),`${id}: “${s}” içinde “${t}” yok`);},fits=async()=>eq(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),true,'yatay taşma');
      eq(await page.evaluate(()=>[...document.querySelectorAll('.app-content input,.app-content select')].filter(e=>!document.querySelector('label[for="'+e.id+'"]')).map(e=>e.id).join()),'','etiketsiz denetim');
      eq(await page.evaluate(()=>[...document.querySelectorAll('.app-content svg')].every(s=>s.getAttribute('role')==='img'&&!!s.getAttribute('aria-label'))),true,'svg etiketleri');
      eq(await page.evaluate(()=>Object.isFrozen(SetsLab)&&!Object.getOwnPropertyDescriptor(window,'SetsLab').writable),true);
      eq(await page.evaluate(()=>/[̀-ͯ]/.test(document.body.innerText)),false,'birleşik işaret yok');
      eq(await page.evaluate(()=>document.querySelectorAll('input[type=number]').length),0);
      ok((await page.title()).length<=80);
      // 01
      await has('gBuilder','{x ∈ E : x çift ve x, 3’ün katı}');await is('gList','Liste: A = {6, 12, 18}');await is('gCount','3');await is('gMember','6 ∈ A');
      await set('gOp','or');await is('gList','Liste: A = {2, 3, 4, 6, 8, 9, 10, 12, 14, 15, 16, 18, 20}');await set('gX',7);await is('gMember','7 ∉ A');await set('gP1','asal');await set('gOp','none');await is('gList','Liste: A = {2, 3, 5, 7, 11, 13, 17, 19}');await set('gX',25);await has('gMemberNote','evrensel kümede değil');
      await is('eqEq','Evet');await has('eqStatus','Tekrar eden');await click('eqP3');await is('eqSub','Evet');await is('eqEq','Hayır');await has('eqStatus','{∅} bir elemanlıdır');await click('eqP4');await is('eqSub','Hayır');await has('eqSubNote','{2}');
      await fill('eqA','{1, 2');await has('eqStatus','Kapanış');await is('eqSub','—');await click('eqP2');await is('eqProper','Evet');
      await has('opStatus','s(A ∪ B) = 7');await has('opStatus','eşit.');eq(await page.locator('#opTable tr').count(),7);await fill('opA','{1, 11}');await has('opStatus','E dışı: 11');await fill('opA','{1, 2, 3, 4, 6}');
      // Venn: bölge düğmeleri ve SVG tıklaması
      await is('vStatus','Taranan bölge: 0 / 4. Hedefi tarayın, sonra “Taramamı denetle”.');
      const reg=async n=>page.locator('#vRegions button',{hasText:new RegExp('^'+n.replace(/[()]/g,'\\$&')+'$')}).click();
      await reg('A ∩ B');await reg('A ∩ B′');await click('vCheck');await has('vStatus','Taranmamış ama ifadede olan: A′ ∩ B');await reg('A′ ∩ B');await click('vCheck');await has('vStatus','Doğru: A ∪ B tam olarak bu 3 bölgedir.');
      await click('vClear');const box=await page.locator('#vSvg').boundingBox();await page.mouse.click(box.x+box.width*200/400,box.y+box.height*130/260);await has('vStatus','1 / 4');
      eq(await page.locator('#vRegions button[aria-pressed=true]').textContent(),'A ∩ B');await set('vTarget','A ∩ B');await reg('A ∩ B');await click('vCheck');await has('vStatus','Doğru');
      await set('vK','3');eq(await page.locator('#vRegions button').count(),8);await click('vNext');await is('vTitle','Hedef: (A ∪ B) ∩ C');
      await fill('vExpr',"(A u B)' n C");await click('vDraw');await has('vStatus','Turuncu');eq(await page.locator('#vSvg .kb-reg.ghost').count(),1);await fill('vExpr','A B');await click('vDraw');await has('vStatus','işlem işareti eksik');
      await is('dmStatus','Son iki sütun dört bölgenin hepsinde aynı: her eleman iki kümeye ya birlikte girer ya birlikte girmez. 1 “eleman bu kümede”, 0 “değil” demektir.');eq(await page.locator('#dmProof li').count(),1);await click('dmAll');eq(await page.locator('#dmProof li').count(),5);
      await set('dmLaw','3');await has('dmStatus','2 bölgede farklı');eq(await page.locator('#dmBody td.hl').count(),4);
      await click('kumeReset');await is('gCount','3');await is('vTitle','Hedef: A ∪ B');eq(await page.locator('#vRegions button').count(),4);await fits();
      await page.locator('#tab-kume').focus();await page.keyboard.press('ArrowRight');eq(await page.locator('#tab-carpim').getAttribute('aria-selected'),'true');
      // 02
      await is('cpCount','6');await is('cpRel','∅ (boş bağıntı)');await has('cpStatus','(a, 1) ∈ B × A');await page.locator('#cpGrid button').first().click();await is('cpRel','{(1, a)}');await has('cpRelNote','2⁶ = 64');
      await fill('cpB','{1, 2, 3}');await has('cpStatus','A × B = B × A');await fill('cpA','{1,2,3,4,5,6,7}');await has('cpStatus','En çok 6');
      await is('psSubset','{a, c}');await is('psCount','8');await page.locator('#psBits button').nth(1).click();await is('psSubset','{a, b, c}');await has('psSubsetNote','111');eq(await page.locator('#psList span').count(),8);eq(await page.locator('#psSizes tr').count(),4);
      await fill('psA','∅');await is('psSubset','∅');await is('psCount','1');
      await has('ieStatus','İçerme–dışlama 9 veriyor');await has('ieStatus','6 eleman fazladan');eq(await page.locator('#ieTerms tr').count(),7);await fill('ieC','{}');await has('ieStatus','İçerme–dışlama 8');
      await click('carpimReset');await is('cpCount','6');await is('psSubset','{a, c}');await fits();
      await page.locator('#tab-carpim').focus();await page.keyboard.press('ArrowRight');
      // 03
      await is('rReflV','Evet');await is('rSymV','Hayır');await is('rAntiV','Evet');await is('rTransV','Evet');await has('rStatus','Kısmi sıralama');await has('rCounts','65 536');
      await click('rSym');eq(await page.locator('#rSvg .kb-arrow.miss').count(),1);eq(await page.locator('#rSvg .kb-arrow.warn').count(),1);
      await set('rPreset','trap');await is('rReflV','Hayır');await has('rStatus','3 hiçbir elemanla ilişkili değil');await set('rGoal','st');await click('rGoalCheck');await has('rGoalMsg','Görev tamam');
      await set('rPreset','par');await has('rStatus','Denklik bağıntısı: sınıflar {1, 3}, {2, 4}');await set('rGoal','eq2');await click('rGoalCheck');await has('rGoalMsg','Görev tamam');
      await set('rPreset','empty');await click('rGoalCheck');await has('rGoalMsg','Henüz değil');await page.locator('#rMatrix button').nth(1).click();await has('rStatus','(1, 2)');await click('rCloS');await click('rCloT');await is('rTransV','Evet');await is('rSymV','Evet');await is('rReflV','Hayır');
      {const b=await page.locator('#rSvg').boundingBox(),sx=b.width/320,sy=b.height/290;await page.mouse.click(b.x+160*sx,b.y+45*sy);await page.mouse.click(b.x+160*sx,b.y+45*sy);await has('rStatus','(1, 1)');}
      await set('rN','5');eq(await page.locator('#rMatrix button').count(),25);await has('rCounts','33 554 432');
      await has('mStatus','192 ikilisi');await page.locator('#mGrid button',{hasText:/^7$/}).click();await has('mStatus','7 ∈ [1]');await set('mN',1);await has('mStatus','tek sınıf');eq(await page.locator('#mGrid button').count(),24);
      await is('hPairs','27');await is('hEdges','12');await is('hMin','1');await is('hMax','30');await set('hMode','mid');await is('hMin','2, 3, 5');await is('hMax','6, 10, 15');await has('hMinNote','en küçük öğe yok');
      await set('hSel','6');await has('hStatus','6 seçili: bölenleri 2, 3');await set('hN','72');await set('hMode','all');await is('hPairs','60');await is('hEdges','17');
      await click('bagReset');await is('rSymV','Hayır');await is('hPairs','27');await has('mStatus','3 sınıf');await fits();
      await page.locator('#tab-bag').focus();await page.keyboard.press('ArrowRight');
      // 04
      await is('fIsFunc','Evet');await is('fImage','{a, b, c}');await is('fInj','Evet');await is('fSurj','Hayır');await has('fSurjNote','d hiç ok almıyor');await is('fInv','fonksiyon değil');
      await click('fGoalCheck');await has('fGoalMsg','Görev tamam');await set('fGoal','surj');await click('fGoalCheck');await has('fGoalMsg','imkânsız');
      await set('fPreset','gap');await is('fIsFunc','Hayır');await has('fIsFuncNote','hiç ok çıkmıyor');eq(await page.locator('#fSvg .kb-node.bad').count(),1);
      await set('fPreset','two');await has('fIsFuncNote','2 ok çıkıyor');await set('fN','3');await set('fPreset','bij');await is('fBij','Evet');await has('fInv','f⁻¹ = {');await set('fGoal','bij');await click('fGoalCheck');await has('fGoalMsg','Görev tamam');
      await set('fM','4');await set('fPreset','surj');await is('fSurj','Evet');await is('fInj','Hayır');await has('fStatus','güvercin yuvası');
      eq(await page.locator('#fCount tr').count(),4);await has('fCountStatus','81 fonksiyonun hepsi');await has('fCountStatus','formüle eşit');eq(await page.locator('#fCount tr').nth(2).locator('td').nth(3).textContent(),'36');
      await has('cStatus','g∘f ≠ f∘g');await click('cId');await has('cStatus','g∘f = f∘g');await click('cInv');await has('cStatus','birim fonksiyon');await set('cf1','1');await set('cf2','1');await click('cInv');await has('cStatus','tersi yok');
      await click('fonkReset');await is('fSurj','Hayır');await has('cStatus','x = 1 için g(f(1)) = 3');await fits();
      await page.locator('#tab-fonk').focus();await page.keyboard.press('End');eq(await page.locator('#tab-sonsuz').getAttribute('aria-selected'),'true');
      // 05
      await has('iList','7 ↦ 14');eq(await page.locator('#iSvg line').count(),8);await click('iStep');await has('iList','8 ↦ 16');
      await set('iMode','int');await has('iList','4 ↦ −2');eq(await page.locator('#iSvg line').count(),9);await set('iMode','rat');await is('iKOut','9');await has('iList','5 ↦ 1/3');await has('iList','9 ↦ 4/1');await has('iStatus','atlandı');
      await set('iK',27);await has('iList','27 ↦ 8/1');await click('iPlay');await page.waitForTimeout(1200);ok(+(await page.locator('#iK').inputValue())>=2,'oynat ilerler');await click('iPlay');
      await is('dgNumber','0,______…');await set('dg0','6');await has('dgStatus','1. basamağınız 6');await click('dgRule');await is('dgNumber','0,555555…');await is('dgIn','Hayır');await set('dg1','9');await has('dgStatus','0 ya da 9');
      await click('dgNew');await is('dgNumber','0,______…');await click('dgRule');await is('dgIn','Hayır');
      await is('ctD','{2}');await is('ctHit','Hayır');await page.locator('#ctTable button').nth(4).click();await is('ctD','∅');await has('ctHitNote','2 ∉ D ama ∈ f(2)');await is('ctHit','Hayır');
      await click('sonsuzReset');await is('iKOut','8');await is('ctD','{2}');await fits();
      // R tuşu sıfırlar
      await set('iK',3);await page.locator('h1').click();await page.keyboard.press('r');await is('iKOut','8');
      await page.locator('#tab-sonsuz').focus();await page.keyboard.press('Home');eq(await page.locator('#tab-kume').getAttribute('aria-selected'),'true');
      // Alıştırma
      await is('pQ','A = {2, 6, 8} ve B = {2, 3, 5, 7, 9} ise A ∪ B kümesini yazın.');await fill('pInput','9,8,7,6,5,3,2');await click('pCheck');await has('pFeedback','Doğru');await has('pFeedback','Süslü parantez');
      await fill('pInput','{2, 3}');await page.locator('#pInput').press('Enter');await has('pFeedback','Eksik: 5, 6, 7, 8, 9');await fill('pInput','{2, 3');await click('pCheck');await has('pFeedback','Kapanış');await has('pScore','1 doğru / 2 denetim');
      ok(await page.locator('#pHintBox').isHidden());await click('pHint');ok(await page.locator('#pHintBox').isVisible());await click('pSol');eq(await page.locator('#pSteps li').count(),3);
      await click('pNew');eq(await page.locator('#pCode').inputValue(),'2');await set('pLevel','1');eq(await page.locator('#pCode').inputValue(),'1');ok(await page.locator('#pAnsProps').isVisible());await page.locator('#pAnsProps button',{hasText:/^Simetrik$/}).click();await click('pCheck');await has('pFeedback','Doğru: simetrik');
      await set('pLevel','2');await has('pQ','örten fonksiyon');await fill('pInput','36');await click('pCheck');await has('pFeedback','Doğru');
      await set('pLevel','0');await set('pCode','8');await page.locator('#pCode').dispatchEvent('change');{const q=await page.evaluate(()=>SetsLab.gen(0,8));if(q.type==='tf'){await click(q.answer?'pTrue':'pFalse');await has('pFeedback','Doğru');}}
      // Hatalar
      eq(await page.locator('#mistakes .kb-card').count(),8);await click('mk2');await has('mkOut2','A′ ∪ B′ = {1, 3, 4}');await click('mk3');await has('mkOut3','yansıyan hayır');await click('mk4');await has('mkOut4','6 bire bir ve 6 örten');
      for(const t of['carpim','bag','fonk','sonsuz','kume']){await click('tab-'+t);await fits();eq(await page.locator('#panel-'+t).isVisible(),true);}
      assert.deepEqual(errors,[]);checks++;await page.close();}
    console.log(`G ${SLUG}: ${checks-before} tarayıcı kontrolü PASS (390 px açık, 1280 px koyu)`);
  }finally{await browser?.close();await new Promise(r=>server.close(r));}
}
