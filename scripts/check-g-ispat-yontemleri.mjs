// G · ispat-yontemleri: çekirdek, sayfanın kodunu yinelemeyen referanslarla sınanır (kendi deneme bölmesi,
// kendi kare ve çarpan sınamaları, Pell özyinelemesi, bütün permütasyonların taranması, BigInt kesir toplamları).
// `--browser` gerçek arayüzü 390 px açık ve 1280 px koyu temada dener.
import fs from 'node:fs';
import assert from 'node:assert/strict';
const html=fs.readFileSync(new URL('../ispat-yontemleri.html',import.meta.url),'utf8');
const source=html.split('/* KERNEL-BEGIN */')[1]?.split('/* KERNEL-END */')[0];
assert(source,'Çekirdek sınır işaretleri gerekli');
const K=new Function('"use strict";'+source+';return ProofLab;')();
let checks=0;
const show=v=>{try{return JSON.stringify(v,(k,x)=>typeof x==='bigint'?x+'n':x);}catch(_){return String(v);}};
const eq=(a,b,msg)=>{assert.deepEqual(a,b,(msg||'eşitlik')+`: ${show(a)} ≠ ${show(b)}`);checks++;};
const ok=(c,msg)=>{assert(c,msg||'koşul sağlanmadı');checks++;};
const throwsU=(f,msg)=>{let e=null;try{f();}catch(x){e=x;}ok(e&&e.user,msg||'kullanıcı hatası bekleniyordu');};
ok(Object.isFrozen(K)&&Object.isFrozen(K.PROOFS)&&Object.isFrozen(K.PROOFS[0].steps[0])&&Object.isFrozen(K.CLAIMS));

/* Bağımsız referanslar */
const tdPrime=n=>{n=BigInt(n);if(n<2n)return false;for(let d=2n;d*d<=n;d++)if(n%d===0n)return false;return true;};
const tdFactor=n=>{const f=[];let m=BigInt(n);for(let d=2n;d*d<=m;d++)while(m%d===0n){f.push(d);m/=d;}if(m>1n)f.push(m);return f;};
const isSq=v=>{if(v<0n)return false;let lo=0n,hi=1n;while(hi*hi<=v)hi*=2n;while(lo<hi){const mid=(lo+hi+1n)/2n;if(mid*mid<=v)lo=mid;else hi=mid-1n;}return lo*lo===v;};
const perms=a=>a.length<=1?[a]:a.flatMap((x,i)=>perms([...a.slice(0,i),...a.slice(i+1)]).map(p=>[x,...p]));

/* 1. Asallık ve çarpanlar */
for(let n=0;n<=30000;n++)eq(K.isPrime(n),tdPrime(n),'asal '+n);
for(const n of[9999991,10000019,10000079,1000000007,999999937,2147483647])eq(K.isPrime(n),tdPrime(n),'asal '+n);
let seed=12345;const rnd=()=>{seed=(seed*1103515245+12345)%2147483648;return seed;};
for(let i=0;i<300;i++){const n=BigInt(rnd())*BigInt(rnd()%1000+1)+BigInt(rnd()%7);eq(K.isPrimeBig(n),tdPrime(n),'MR '+n);}
// Bilinen değerler: Mersenne 2⁶¹ − 1 asal; 2⁶⁷ − 1 = 193707721 · 761838257287 (Cole); güçlü sözde asallar.
eq(K.isPrimeBig(2n**61n-1n),true);eq(K.isPrimeBig(2n**67n-1n),false);eq(193707721n*761838257287n,2n**67n-1n);
eq(K.isPrimeBig(2n**89n-1n),null,'sınır üstü bilinmez');eq(K.isPrimeBig(3215031751n),false);eq(K.isPrimeBig(3825123056546413051n),false);eq(K.isPrimeBig(561n),false);
eq(K.isPrimeBig(2n**32n+1n),false);eq(K.smallestFactor(2n**32n+1n),641n);eq(641n*6700417n,2n**32n+1n);
for(let n=2;n<=5000;n++)eq(K.factorNum(n).map(BigInt),tdFactor(n),'çarpan '+n);
for(let n=0n;n<=3000n;n++){const s=K.isqrt(n);ok(s*s<=n&&(s+1n)*(s+1n)>n);}
{const big=12345678901234567890123n;const s=K.isqrt(big*big+5n);eq(s,big);}

/* 2. İfade ayrıştırıcı ve değerlendirme */
const fact=n=>{let f=1n;for(let i=2n;i<=BigInt(n);i++)f*=i;return f;};
const EXPR=[['n^2 + n + 41',n=>n*n+n+41n],['991n² + 1',n=>991n*n*n+1n],['2n',n=>2n*n],['n(n+1)(n+2)',n=>n*(n+1n)*(n+2n)],['(n+1)^3 − n^3',n=>(n+1n)**3n-n**3n],['n! + 1',n=>fact(n)+1n],['2^(2^n) + 1',n=>2n**(2n**n)+1n],['2^2^n',n=>2n**(2n**n)],['-n^2 - (n - 1)',n=>-(n*n)-(n-1n)],['3 × n ** 2',n=>3n*n*n],['n^5 - n',n=>n**5n-n]];
for(const[s,f]of EXPR){const ast=K.parseExpr(s);for(let n=0n;n<=6n;n++)eq(K.evalExpr(ast,n),f(n),s+' @'+n);}
eq(K.showExpr(K.parseExpr('991n^2+1')),'991n² + 1');eq(K.showExpr(K.parseExpr('2^n-1')),'2ⁿ − 1');eq(K.showExpr(K.parseExpr('2^(2^n)+1')),'2^(2ⁿ) + 1');
for(const bad of['','n^','(n+1','x + 1','n 2','2^','*n','n)'])throwsU(()=>K.parseExpr(bad),'hatalı ifade: '+bad);
throwsU(()=>K.evalExpr(K.parseExpr('2^(0-1)'),1));throwsU(()=>K.evalExpr(K.parseExpr('10^5000'),1));throwsU(()=>K.evalExpr(K.parseExpr('(0-1)!'),1));
{let e=null;try{K.evalExpr(K.parseExpr('3^n'),9000);}catch(x){e=x;}ok(e&&e.big);}

/* 3. Karşı örnek aramaları: bağımsız tarama ile */
const refSearch=(f,pred,cond,a,b)=>{for(let n=a;n<=b;n++){if(!cond(n))continue;if(!pred(f(BigInt(n))))return n;}return null;};
const PRED={asal:v=>tdPrime(v),bilesik:v=>v>1n&&!tdPrime(v),karedegil:v=>!isSq(v),cift:v=>v%2n===0n,bolunur3:v=>v%3n===0n};
const CON={her:()=>true,asal:n=>tdPrime(n),bilesik:n=>n>1&&!tdPrime(n)};
const C=id=>K.CLAIMS.find(c=>c.id===id);
{const r=K.search(C('euler'));eq(r.found.n,refSearch(n=>n*n+n+41n,PRED.asal,CON.her,0,1000));eq(r.found.n,40);eq(r.found.v,1681n);eq(r.checked,41);}
{const r=K.search(C('euler2'));eq(r.found.n,refSearch(n=>n*n-n+41n,PRED.asal,CON.her,1,1000));eq(r.found.n,41);}
{const r=K.search(C('mersenne'));eq(r.found.n,refSearch(n=>2n**n-1n,PRED.asal,CON.asal,1,30));eq(r.found.n,11);eq(r.found.detail.d*r.found.detail.q,2047n);eq(r.found.detail.d,23n);eq(r.checked,5);}
{const r=K.search(C('mersenneKT'));eq(r.found,null);eq(r.stopped,null);let cnt=0;for(let n=1;n<=80;n++)if(CON.bilesik(n)){cnt++;const a=K.factorNum(n)[0];ok((2n**BigInt(n)-1n)%(2n**BigInt(a)-1n)===0n,'2^a − 1 | 2^n − 1');}eq(r.checked,cnt);eq(r.skipped,80-cnt);}
{const r=K.search(C('fermat'));eq(r.found.n,5);eq(r.found.detail.d,641n);for(let n=0n;n<=4n;n++)ok(tdPrime(2n**(2n**n)+1n));}
{const r=K.search(C('fakt'));eq(r.found.n,refSearch(n=>fact(n)+1n,PRED.asal,CON.her,1,50));eq(r.found.v,25n);}
{const r=K.search(C('pell'));eq(r.found,null);eq(r.checked,100000);for(let n=1n;n<=3000n;n++)ok(!isSq(991n*n*n+1n));}
{const r=K.search(C('goldbach'));eq(r.found,null);eq(r.checked,99999);}
{const r=K.search(C('mod3'));eq(r.found,null);for(let n=0n;n<200n;n++)ok((n*n+1n)%3n!==0n);}
{const r=K.search(C('n5'));eq(r.found,null);for(let n=0n;n<500n;n++)ok((n**5n-n)%30n===0n);}
{const r=K.search(C('ardisik'));eq(r.found,null);}
{const r=K.search({expr:'n^2+n',prop:'tek',a:0,b:10});eq(r.found.n,0);const r2=K.search({expr:'2n+1',prop:'bolunmez',d:'3',a:0,b:10});eq(r2.found.n,1);eq(r2.found.detail.r,0n);}
{const r=K.search({expr:'n',prop:'ikiasal',a:0,b:200});eq(r.found.n,0);const r2=K.search({expr:'2n+4',prop:'ikiasal',a:0,b:5000});eq(r2.found,null);const r3=K.search({expr:'n',prop:'ikiasal',a:4,b:200});
  let ref=null;for(let m=4;m<=200;m++){let g=false;for(let p=2;p<=m/2;p++)if(tdPrime(p)&&tdPrime(m-p)){g=true;break;}if(!g){ref=m;break;}}eq(r3.found.n,ref);eq(ref,11);}
{const r=K.search({expr:'n^2',prop:'kare',a:0,b:1000});eq(r.found,null);const r2=K.search({expr:'n^2+1',prop:'kare',a:0,b:10});eq(r2.found.n,1);eq(r2.found.detail.s,1n);}
{const r=K.search({expr:'2^89 - 1 + 0n',prop:'asal',a:0,b:5});eq(r.stopped?.reason,'unknown');const r2=K.search({expr:'2^n',prop:'cift',a:4090,b:4200});eq(r2.stopped?.reason,'big');}
throwsU(()=>K.search({expr:'n',prop:'asal',a:0,b:100000}));throwsU(()=>K.search({expr:'n',prop:'asal',a:5,b:4}));throwsU(()=>K.search({expr:'n',prop:'asal',a:0,b:1000001}));throwsU(()=>K.search({expr:'n',prop:'bolunur',d:'0',a:0,b:4}));throwsU(()=>K.search({expr:'n',prop:'xx',a:0,b:4}));
// Pell: en küçük çözümü x² − 991y² = 1 ile doğrula; küçük D'ler için kaba tarama ile karşılaştır.
{const p=K.pell(991);eq(p.y,12055735790331359447442538767n);eq(p.x*p.x-991n*p.y*p.y,1n);eq(p.x,379516400906811930638014896080n);}
for(const D of[2,3,5,6,7,8,10,11,12,13,61]){const p=K.pell(D);let y=1n;while(!isSq(BigInt(D)*y*y+1n))y++;eq(p.y,y,'Pell '+D);}eq(K.pell(9),null);

/* 4. Sayısal tanıklar */
{const r=K.sqrt2Search(1000000);eq(r.zero,0);eq(r.minAbs,1);let p=1,q=1,d=-1;const ref=[];while(q<=1000000){ref.push({p,q,d});[p,q]=[p+2*q,p+q];d=-d;}eq(r.ones,ref);}
{const r=K.sqrt2Search(1000);eq(r.ones.at(-1),{p:1393,q:985,d:-1});}
throwsU(()=>K.sqrt2Search(0));throwsU(()=>K.sqrt2Search(1000001));
const PR=[2,3,5,7,11,13,17,19,23,29];
for(let k=1;k<=10;k++){const E=K.euclid(k);const N=PR.slice(0,k).reduce((s,x)=>s*BigInt(x),1n)+1n;eq(BigInt(E.N),N);eq(E.factors.map(BigInt),tdFactor(N));eq(E.inList,[]);ok(E.factors.every(p=>!PR.slice(0,k).includes(p)));}
eq(K.euclid(6).factors,[59,509]);eq(K.euclid(10).factors,[331,571,34231]);eq(K.euclid(5).isPrime,true);
for(let k=1;k<=8;k++){const L=K.consecComposites(k).list;eq(L.length,k);for(let i=0;i<k;i++){ok(!tdPrime(L[i].x)&&L[i].x>1);if(i)eq(L[i].x,L[i-1].x+1);eq(L[i].d*L[i].q,L[i].x);}}
for(const n of[2,3,4,12,360,1024,9973,999999937,123456789,600851475143]){const t=K.splitTree(n);const L=K.treeLeaves(t);eq(L.reduce((s,x)=>s*BigInt(x),1n),BigInt(n));ok(L.every(x=>tdPrime(x)));const walk=x=>{if(x.a){ok(x.a.n>1&&x.b.n>1&&x.a.n<x.n&&x.b.n<x.n&&x.a.n*x.b.n===x.n);walk(x.a);walk(x.b);}};walk(t);}
throwsU(()=>K.splitTree(1));
for(let N=1;N<=10;N++)for(const base of[true,false])for(let k=0;k<=9;k++){let fallen=0;if(base){fallen=1;while(fallen<N&&fallen!==k)fallen++;}eq(K.domino(N,base,k),fallen);}
for(const n of[1,2,100,99999,1000000]){const g=K.gaussCheck(n);let s=0n;for(let i=1n;i<=BigInt(n);i++)s+=i;eq(BigInt(g.left),s);eq(BigInt(g.right),s);}

/* 5. Koşullu önerme dörtlüsü (kendi yüklemlerimle) */
const dc=n=>{let c=0;for(let d=1;d*d<=n;d++)if(n%d===0)c+=d*d===n?1:2;return c;};
const REFQ={q4:[n=>n%4===0,n=>n%2===0],kare:[n=>n*n%2===0,n=>n%2===0],asal:[n=>tdPrime(n),n=>n%2===1],d6:[n=>n%6===0,n=>n%3===0],buyuk:[n=>n>10,n=>n*n>50],bolen:[n=>{const s=Math.round(Math.sqrt(n));return s*s===n;},n=>dc(n)%2===1]};
for(const Q of K.QUADS)for(const N of[20,100,1000]){const[p,q]=REFQ[Q.id];const r=K.quadCheck(Q.id,N);const ce={orig:[],karsit:[],ters:[],kt:[]};
  for(let n=1;n<=N;n++){if(p(n)&&!q(n))ce.orig.push(n);if(q(n)&&!p(n))ce.karsit.push(n);if(!p(n)&&q(n))ce.ters.push(n);if(!q(n)&&p(n))ce.kt.push(n);}
  for(const f of K.QFORMS){eq(r[f].count,ce[f].length,Q.id+f+N);eq(r[f].first,ce[f].slice(0,5));}eq(r.orig,r.kt);eq(r.karsit,r.ters);}
eq(K.quadCheck('asal',1000).orig,{count:1,first:[2]});eq(K.quadCheck('q4',100).karsit.count,25);eq(K.quadCheck('buyuk',100).karsit.first,[8,9,10]);
throwsU(()=>K.quadCheck('q4',50));

/* 6. Veri bütünlüğü ve matematiksel iddialar */
ok(K.FLAWED.length>=6&&K.MISTAKES.length>=5&&K.CLASSIFY.length>=6&&K.NEG.length>=5);
for(const f of K.FLAWED){ok(f.lines.length>=2&&f.bad.length>=1&&f.bad.every(i=>i>=0&&i<f.lines.length)&&f.why.length>40&&typeof f.truth==='boolean');}
for(const x of K.CLASSIFY)ok(x.ans>=0&&x.ans<K.KINDS.length);for(const x of K.NEG)ok(x.ans>=0&&x.ans<x.opts.length&&new Set(x.opts).size===x.opts.length);
// Hatalı ispatlardaki sayısal iddialar
for(let n=1;n<=60;n++)eq(n*(n+1)/2+1,(n*n+n+2)/2,'taban: hep 1 fazla');
for(let n=1;n<=200;n++)eq(2n**BigInt(n)>=BigInt(n*n),n!==3,'2ⁿ ≥ n² yalnız n = 3’te bozulur');
for(let k=1;k<=50;k++)eq(2*k*k>=(k+1)**2,k>=3);
for(const v of[41,43,47,53,151,461])ok(tdPrime(v));for(let n=0;n<40;n++)ok(tdPrime(n*n+n+41));ok(!tdPrime(1681));
for(let n=0n;n<100n;n++){ok((n**3n-n)%6n===0n);ok((7n**n-1n)%6n===0n);ok((n*n+n)%2n===0n);ok(((n*n)%4n)<2n);}
for(let n=1n;n<=20n;n++){let s=0n;for(let i=0n;i<n;i++)s+=3n**i;eq(2n*s,3n**n-1n);}
ok(Math.ceil(100/12)===9&&12*8<100);eq(6n**0n,1n);
for(const a of[0n,1n,2n,3n,5n,9n,13n])for(const b of[0n,1n,2n,4n,6n])ok(((a*a+b*b)%4n)!==3n);
// Ardışık bileşikler örneği: 6! + 2 … 6! + 6
for(let j=2;j<=6;j++)ok((720+j)%j===0);
// İspat kurucu: her permütasyonu kendi denetçimle sına; geçerli sıra sayısı ile karşılaştır.
for(const P of K.PROOFS){const ids=P.steps.map(s=>s.id);ok(P.steps.filter(s=>s.goal).length===1);ok(P.steps.every(s=>s.deps.every(d=>ids.includes(d))&&s.j.length&&s.j.every(j=>K.JUST[j])));
  let valid=0;for(const o of perms(ids)){const pos=Object.fromEntries(o.map((id,i)=>[id,i]));const good=P.steps.every(s=>s.deps.every(d=>pos[d]<pos[s.id]))&&P.steps.find(s=>s.goal).id===o.at(-1);if(good)valid++;eq(K.checkOrder(P.steps,o).ok,good);}
  eq(K.countOrders(P.steps),valid,P.id);ok(K.checkOrder(P.steps,K.topoOne(P.steps)).ok);
  const sol=K.topoOne(P.steps);const js=sol.map(id=>P.steps.find(s=>s.id===id).j[0]);eq(K.proofCheck(P.id,sol,js).allOk,true);eq(K.proofCheck(P.id,sol,js.map(()=>'V')).allOk,false);}
eq(K.PROOFS.map(p=>K.countOrders(p.steps)),[4,5,1,4,1]);eq(K.checkOrder(K.PROOFS[0].steps,['a','b']).malformed,true);
for(const P of K.ORDER_BANK){const ids=P.steps.map(s=>s.id);let valid=0;for(const o of perms(ids)){const pos=Object.fromEntries(o.map((id,i)=>[id,i]));if(P.steps.every(s=>s.deps.every(d=>pos[d]<pos[s.id]))&&P.steps.find(s=>s.goal).id===o.at(-1))valid++;}eq(K.countOrders(P.steps),valid);ok(valid>=1);}

/* 7. Yanıt ayrıştırıcıları */
const PN=(s,n,d)=>{const r=K.parseNum(s);ok(r&&r.num===BigInt(n)&&r.den===BigInt(d),`parseNum(${JSON.stringify(s)})`);};
PN('0,875',7,8);PN('0.875',7,8);PN('7/8',7,8);PN(' 7 / 8 ',7,8);PN('14/16',7,8);PN('−3',-3,1);PN('-3',-3,1);PN('+5',5,1);PN('1 681',1681,1);PN('1 681',1681,1);PN('.5',1,2);PN(',25',1,4);PN('-7/-8',7,8);PN('−7/8',-7,8);PN('0',0,1);PN('12,0',12,1);
for(const bad of['','abc','3/0','1,2,3','5.','1/2/3','--3','2e3','½',null,'1'.repeat(41)])eq(K.parseNum(bad),null,'parseNum kötü: '+bad);
eq(K.parseOrder('B A C D',4).order,[1,0,2,3]);eq(K.parseOrder('bacd',4).order,[1,0,2,3]);eq(K.parseOrder('2, 1, 3, 4',4).order,[1,0,2,3]);eq(K.parseOrder('2134',4).order,[1,0,2,3]);eq(K.parseOrder('2-1-3-4',4).order,[1,0,2,3]);eq(K.parseOrder('B → A → C → D',4).order,[1,0,2,3]);eq(K.parseOrder('10 1 2 3 4 5 6 7 8 9',10).order,[9,0,1,2,3,4,5,6,7,8]);
for(const bad of['','A A B C','A B C','A B C D E','A B C G','a b c ç','1 2 3 9'])ok(K.parseOrder(bad,4).error,'parseOrder kötü: '+bad);

/* 8. Alıştırma üreteci: her düzeyde yüzlerce tohum, yanıtlar bağımsız hesapla */
const ratEq=(r,n,d)=>r.num*BigInt(d)===BigInt(n)*r.den;
const seen={1:new Set(),2:new Set(),3:new Set(),4:new Set()};
for(let level=1;level<=4;level++)for(let s=1;s<=400;s++){const e=K.gen(level,s);eq(JSON.stringify(K.gen(level,s),(k,v)=>typeof v==='bigint'?String(v):v),JSON.stringify(e,(k,v)=>typeof v==='bigint'?String(v):v),'tohum kararlı');
  seen[level].add(e.topic+(e.quote||e.prompt));ok(e.hint&&e.solution.length>=1&&e.prompt);
  if(e.kind==='choice'){ok(e.answer.length>=1&&e.answer.every(i=>i>=0&&i<e.options.length));eq(K.grade(e,e.answer[0]).ok,true);const w=e.options.findIndex((_,i)=>!e.answer.includes(i));if(w>=0)eq(K.grade(e,w).ok,false);eq(K.grade(e,'x').parse,true);
    if(e.topic==='missing'){ok(e.lines.filter(l=>l.startsWith('▢')).length===1);}}
  else if(e.kind==='order'){eq(K.grade(e,e.answer.join(' ')).ok,true);eq(K.grade(e,e.answer.join('').toLowerCase()).ok,true);const lab=e.steps.map(x=>x.label).join(' ');const self=K.grade(e,lab);eq(self.ok,false,'karışık sıra zaten geçerli olmamalı');eq(K.grade(e,'A').parse,true);
    let valid=0;for(const o of perms(e.steps.map((_,i)=>i))){if(K.grade(e,o.map(i=>e.steps[i].label).join(' ')).ok)valid++;}eq(valid,e.nValid);}
  else{const a=e.answer;let ref;
    if(e.topic==='euclid'){const raw=e.prompt.match(/= ([\d\u202F]+)\./)[1];const N=BigInt(raw.replace(/\u202F/g,''));ref=tdFactor(N)[0];ok(ratEq(a,ref,1));ok(N<10000n||/\d\u202F\d{3}/.test(raw),'Öklid sayısı ince boşlukla');ok(!/\d{5}/.test(e.prompt+e.solution.join(' ')),'binlik ayırıcısız uzun sayı');}
    else if(e.topic==='tele'){const k=Number(e.prompt.match(/k = (\d+)/)[1]);let num=0n,den=1n;for(let i=1n;i<=BigInt(k+1);i++){num=num*i*(i+1n)+den;den=den*i*(i+1n);}ok(ratEq(a,num,den),'teleskop');ok(!/\d\.\d/.test(e.solution.join(' ')),'ondalık virgül');}
    else if(e.topic==='euler'){const p=BigInt(e.prompt.match(/n \+ (\d+) her/)[1]);let n=0n;while(tdPrime(n*n+n+p))n++;ok(ratEq(a,n,1));}
    else if(e.topic==='geo'){const k=Number(e.prompt.match(/k = (\d+)/)[1]);let s=0n;for(let i=0n;i<=BigInt(k+1);i++)s+=2n**i;ok(ratEq(a,s,1));}
    else if(e.topic==='gauss'){const k=Number(e.prompt.match(/k = (\d+)/)[1]);let s=0n;for(let i=1n;i<=BigInt(k+1);i++)s+=i;ok(ratEq(a,s,1));}
    else assert.fail('konu '+e.topic);
    eq(K.grade(e,a.den===1n?String(a.num):`${a.num}/${a.den}`).ok,true);eq(K.grade(e,`${a.num*3n}/${a.den*3n}`).ok,true);eq(K.grade(e,String(a.num+a.den*7n)+'/'+a.den).ok,false);eq(K.grade(e,'abc').parse,true);
    if(a.den!==1n){const x=Number(a.num)/Number(a.den);eq(K.grade(e,x.toFixed(4).replace('.',',')).ok,true);eq(K.grade(e,(x+0.01).toFixed(2)).ok,false);}}}
ok(seen[1].size>=25&&seen[2].size>=12&&seen[3].size>=6&&seen[4].size>=20,'çeşitlilik '+Object.values(seen).map(s=>s.size));
{const e={kind:'number',answer:K.rat(5,6)};eq(K.grade(e,'0,83').ok,true);eq(K.grade(e,'0,833').ok,true);eq(K.grade(e,'0,8').ok,false);eq(K.grade(e,'0,84').ok,false);eq(K.grade(e,'5/6').ok,true);}
{const e={kind:'number',answer:K.rat(7,8)};eq(K.grade(e,'0,88').ok,false);eq(K.grade(e,'0,875').ok,true);}
throwsU(()=>K.gen(5,1));
console.log(`G ispat-yontemleri: ${checks.toLocaleString('tr-TR')} bağımsız çekirdek kontrolü PASS`);

if(process.argv.includes('--browser')){
  const {chromium}=await import('playwright');const {createServer}=await import('node:http');const {join,extname}=await import('node:path');const {fileURLToPath}=await import('node:url');const root=fileURLToPath(new URL('../',import.meta.url));
  const server=createServer((req,res)=>{const file=join(root,decodeURIComponent(new URL(req.url,'http://localhost').pathname));if(!fs.existsSync(file)||fs.statSync(file).isDirectory()){res.writeHead(404).end();return;}res.setHeader('Content-Type',({'.html':'text/html; charset=utf-8','.js':'text/javascript; charset=utf-8','.css':'text/css; charset=utf-8'})[extname(file)]||'application/octet-stream');res.end(fs.readFileSync(file));});await new Promise(r=>server.listen(0,'127.0.0.1',r));let browser;const before=checks;
  const digestExists=fs.existsSync(new URL('../shared/digest/ispat-yontemleri.js',import.meta.url));
  try{browser=await chromium.launch();
    for(const[theme,width]of[['light',390],['dark',1280]]){
      const page=await browser.newPage({viewport:{width,height:900},deviceScaleFactor:width===390?2:1});await page.addInitScript(t=>{localStorage.setItem('acelya-theme',t);localStorage.setItem('acelya-sound-muted','1');},theme);page.setDefaultTimeout(8000);
      const errors=[];page.on('pageerror',e=>errors.push(e.message));
      page.on('response',r=>{if(r.status()>=400&&!(!digestExists&&r.url().endsWith('/shared/digest/ispat-yontemleri.js')))errors.push(r.status()+' '+r.url());});
      page.on('console',m=>{if(m.type()==='error'&&!/Failed to load resource/.test(m.text()))errors.push(m.text());});
      await page.goto(`http://127.0.0.1:${server.address().port}/ispat-yontemleri.html`);await page.waitForTimeout(300);
      const click=id=>page.locator('#'+id).click(),read=async id=>(await page.locator('#'+id).textContent()).replace(/[  ]/g,' '),set=(id,v)=>page.locator('#'+id).evaluate((e,v)=>{if(e.type==='checkbox'){e.checked=v;e.dispatchEvent(new Event('change',{bubbles:true}));return;}e.value=v;e.dispatchEvent(new Event(e.tagName==='SELECT'?'change':'input',{bubbles:true}));},v),is=async(id,t)=>{eq(await read(id),t,id);},has=async(id,t)=>{const s=await read(id);ok(s.includes(t),`${id}: “${s}” içinde “${t}” yok`);},fits=async()=>eq(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),true,'yatay taşma'),sel=async t=>eq(await page.locator('#tab-'+t).getAttribute('aria-selected'),'true');
      eq(await page.evaluate(()=>[...document.querySelectorAll('.app-content input,.app-content select')].filter(e=>!document.querySelector('label[for="'+e.id+'"]')).map(e=>e.id).join()),'');
      eq(await page.evaluate(()=>{const cs=[...document.querySelectorAll('.app-content canvas')];return cs.length===1&&cs.every(c=>c.getAttribute('role')==='img'&&!!c.getAttribute('aria-label'));}),true);
      eq(await page.evaluate(()=>Object.isFrozen(ProofLab)&&!Object.getOwnPropertyDescriptor(window,'ProofLab').writable),true);
      eq(await page.evaluate(()=>/[̀-ͯ]/.test(document.body.innerHTML)),false,'birleşik aksan işareti yok');
      eq(await page.evaluate(()=>document.querySelectorAll('input[type=number]').length),0);
      eq(await page.evaluate(()=>document.title.length<=80),true);
      eq(await page.evaluate(()=>[...document.querySelectorAll('.app-content a[href]')].map(a=>a.getAttribute('href')).filter(h=>/kumeler-bagintilar-ve-fonksiyonlar\.html/.test(h)).length),1,'kümeler sayfasına bağlantı');eq(await page.evaluate(()=>document.body.textContent.includes('hazırlanıyor')),false,'hazırlanıyor ibaresi kalmadı');
      // 01
      await is('qc-orig','0');await is('qc-karsit','25');await is('qc-kt','0');await is('qc-ters','25');await has('qStatus','aynı 25 sayıda');
      await set('qStmt','asal');await set('qN','1000');await is('qc-orig','1');await is('qc-kt','1');{let c=0;for(let n=1;n<=1000;n++)if(n%2&&!tdPrime(n))c++;await is('qc-karsit',c.toLocaleString('tr-TR').replace('.',' '));}await has('qStatus','2 hem asal hem çifttir');
      await click('cl0-0');await has('clFb0','Doğru.');await click('cl6-2');await has('clFb6','Değil.');await has('clScore','1 / 2 doğru');
      await click('ng0-2');await has('ngFb0','Doğru.');await click('ng1-0');await has('ngFb1','Hiçbir tam kare');
      await click('dilReset');await is('qc-karsit','25');eq(await page.locator('#clFb0').isHidden(),true);await fits();
      await page.locator('#tab-dil').focus();await page.keyboard.press('ArrowRight');await sel('yontem');
      // 02
      await has('dirOut','2 · 25 = 50: çift');await set('dirA','15');await has('dirOut','Varsayım sağlanmıyor');await set('dirA','-4');await has('dirOut','a = 2 · (−2)');await set('dirA','x');await has('dirOut','tam sayı yaz');
      await has('dirSq','n² = 49 = 2 · 24 + 1: tek');await set('dirN','-3');await has('dirSq','n = 2 · (−2) + 1');
      await is('s2Checked','1000');await is('s2Zero','0');await is('s2Min','1');await has('s2Last','1393/985');await has('s2List','99/70 (+1)');
      {await set('s2Q','1000000');let p=1,q=1;while(true){const[a,b]=[p+2*q,p+q];if(b>1e6)break;[p,q]=[a,b];}await has('s2Last',`${p.toLocaleString('tr-TR').replace(/\./g,' ')}/${q.toLocaleString('tr-TR').replace(/\./g,' ')}`);await is('s2Zero','0');}
      await set('s2Q','0');await is('s2Zero','—');
      await has('euOut','30 031 = 59 · 509');await has('euNote','N asal değil');await set('euK','10');await has('euOut','6 469 693 231 = 331 · 571 · 34 231');await set('euK','3');await has('euOut','31 (asal)');
      await set('csN','-7');await has('csOut','2. hâl');await has('csOut','kalan 1');await set('csN','10');await has('csOut','4 · 25: kalan 0');
      eq(await page.locator('#exList li').count(),5);await has('exList','6! + 2 = 722 = 2 · 361');
      await is('sbFound','n = 40');await has('sbStatus','1681 = 41 · 41');await is('sbChecked','41');await has('sbNote','Rabinowitsch 1913');await has('sbNote','Baker ile Harold Stark');
      await set('sbPreset','pell');await is('sbFound','bulunmadı');await is('sbChecked','100 000');await has('sbNote','12 055 735 790 331 359 447 442 538 767');await has('sbNote','doğruladı');await has('sbStatus','ispat değildir');
      await set('sbPreset','fermat');await is('sbFound','n = 5');await has('sbStatus','4 294 967 297 = 641 · 6 700 417');
      await set('sbPreset','mersenne');await is('sbFound','n = 11');await has('sbStatus','2047 = 23 · 89');await has('sbChecked','atlandı');
      await set('sbPreset','mersenneKT');await is('sbFound','bulunmadı');await has('sbNote','karşıt tersidir');
      await set('sbPreset','goldbach');await is('sbFound','bulunmadı');await has('sbNote','4 × 10¹⁸');
      await set('sbExpr','n^');eq(await page.locator('#sbPreset').inputValue(),'custom');await has('sbStatus','Karşı örnek ara');
      await click('sbRun');eq(await page.locator('#sbErr').isVisible(),true);await is('sbFound','—');
      await set('sbExpr','n^2 - n + 41');await set('sbProp','asal');await set('sbCond','her');await set('sbA','1');await set('sbB','500');await click('sbRun');await is('sbFound','n = 41');eq(await page.locator('#sbErr').isHidden(),true);
      await set('sbProp','bolunur');eq(await page.locator('#sbD').isVisible(),true);await set('sbD','0');await click('sbRun');eq(await page.locator('#sbErr').isVisible(),true);
      await set('sbB','2000000');await set('sbProp','asal');await click('sbRun');await has('sbErr','0 ile 1 000 000');await set('sbA','0');await set('sbB','100000');await click('sbRun');await has('sbErr','100 000');
      await page.locator('#sbExpr').fill('2n');await set('sbProp','tek');await set('sbB','10');await page.locator('#sbExpr').press('Enter');await is('sbFound','n = 0');
      await click('yontemReset');await is('sbFound','n = 40');await has('euOut','30 031');eq(await page.locator('#sbPreset').inputValue(),'euler');await fits();
      await set('euK','9');await page.locator('h1').click();await page.keyboard.press('r');await is('euKOut','6');
      // 03
      await click('tab-tumevarim');await is('dFallen','—');await click('dPush');await is('dFallen','P(1) … P(10)');await is('dRest','yok (bu on tanede)');
      await set('dBreak','1');await is('dFallen','—');await is('dBreakOut','k = 1');await click('dPush');await is('dFallen','P(1)');await is('dRest','P(2) … P(10)');await has('dStatus','Atlar');
      await set('dBreak','9');await click('dPush');await is('dRest','P(10)');
      await set('dBase',false);await click('dPush');await is('dFallen','hiçbiri');await has('dStatus','Taban yok');
      await is('smLeft','5050');await is('smRight','5050');await set('smN','1000000');await is('smLeft','500 000 500 000');await is('smRight','500 000 500 000');await set('smN','0');await is('smLeft','—');
      await is('stFac','360 = 2 · 2 · 2 · 3 · 3 · 5 (6 asal çarpan)');eq(await page.locator('#stTree .p').count(),6);await set('stN','999999937');await has('stFac','asaldır');await set('stN','1');await has('stFac','2 ile');
      await page.waitForTimeout(150);eq(await page.evaluate(()=>{const c=document.getElementById('dCanvas'),d=c.getContext('2d').getImageData(0,0,c.width,c.height).data,s=new Set();for(let i=0;i<d.length;i+=4)s.add(d[i]+','+d[i+1]+','+d[i+2]);return s.size>3;}),true,'domino tuvali boş');
      await click('tumevarimReset');await is('dFallen','—');await is('smLeft','5050');eq(await page.locator('#dBase').isChecked(),true);await fits();
      // 04
      await click('tab-kur');await is('bOrders','4');await is('bMethod','Doğrudan ispat');eq(await page.locator('#bList li').count(),6);await click('bCheck');await has('bStatus','geçerli değil');
      await click('bSolve');await has('bStatus','Tamam');await click('bDn1');await click('bCheck');await has('bStatus','Tamam');
      await click('bUp5');await click('bCheck');await has('bStatus','geçerli değil');await has('bMsg4','en sonda');
      await set('bProof','gauss');await is('bOrders','4');await click('bSolve');await click('bDn1');await click('bDn2');await click('bCheck');await has('bStatus','Tamam');
      await set('bJ0','V');await click('bCheck');await has('bStatus','5 / 6 gerekçe');await has('bMsg0','uymuyor');
      await set('bProof','kok2');await is('bOrders','1');await is('bMethod','Çelişki ile ispat');eq(await page.locator('#bList li').count(),8);
      {const a=await page.evaluate(()=>[...document.querySelectorAll('#bList .t')].map(t=>t.textContent).join('|'));await click('bShuffle');const b=await page.evaluate(()=>[...document.querySelectorAll('#bList .t')].map(t=>t.textContent).join('|'));ok(a!==b,'karıştırma');}
      eq(await page.locator('#bUp0').isDisabled(),true);await click('kurReset');await is('bOrders','4');await fits();
      // 05
      await click('tab-hata');eq(await page.locator('#flList .ip-flaw').count(),K.FLAWED.length);eq(await page.locator('#mkList .ip-mist').count(),K.MISTAKES.length);
      await click('fl0-4');await has('flFb0','Doğru buldun');await click('fl1-0');await has('flFb1','Bu satır sağlam');await has('flFb1','sıfıra bölme');await has('flScore','1 / 2');
      await click('fl4-3');await has('flFb4','Doğru buldun');
      eq(await page.locator('#mk0').isHidden(),true);await click('mkBtn0');eq(await page.locator('#mk0').isVisible(),true);eq(await page.locator('#mkBtn0').getAttribute('aria-expanded'),'true');await click('mkBtn0');eq(await page.locator('#mk0').isHidden(),true);
      await click('hataReset');eq(await page.locator('#flFb0').isHidden(),true);await fits();
      // 06
      await click('tab-alistirma');await is('pSeed','1 · 1');await is('pScore','—');
      {const e=K.gen(1,1);await has('pPrompt',e.prompt.slice(0,30));const w=e.options.findIndex((_,i)=>!e.answer.includes(i));await click('pOpt'+w);await has('pFb','Henüz değil');await click('pOpt'+e.answer[0]);await has('pFb','Doğru.');await is('pScore','0 / 1');}
      await click('pHintBtn');eq(await page.locator('#pHint').isVisible(),true);await click('pSolBtn');await has('pSol','Çözüm, adım adım');await click('pNew');await is('pSeed','1 · 2');eq(await page.locator('#pSol').isHidden(),true);
      {const e=K.gen(1,2);await click('pOpt'+e.answer[0]);await is('pScore','1 / 2');}
      await set('pLevel','3');{const e=K.gen(3,1);eq(await page.locator('#pLines li').count(),e.steps.length);await page.locator('#pAns').fill('A A');await click('pCheck');await has('pFb','adım yazıldı');await is('pScore','1 / 2');
        await page.locator('#pAns').fill(e.answer.join(' ').toLowerCase());await click('pCheck');await has('pFb','Doğru.');await is('pScore','2 / 3');}
      await set('pLevel','4');{let s=1;while(K.gen(4,s).kind!=='number')s++;for(let i=1;i<s;i++)await click('pNew');const e=K.gen(4,s);await has('pPrompt',e.prompt.slice(0,25));
        const ans=e.answer.den===1n?String(e.answer.num):`${e.answer.num} / ${e.answer.den}`;await page.locator('#pAns').fill('xyz');await click('pCheck');await has('pFb','Bir sayı yaz');await page.locator('#pAns').fill(ans);await page.locator('#pAns').press('Enter');await has('pFb','Doğru.');}
      await click('alistirmaReset');await is('pSeed','1 · 1');await is('pScore','—');await fits();
      await page.locator('#tab-alistirma').focus();await page.keyboard.press('Home');await sel('dil');await page.keyboard.press('End');await sel('alistirma');await page.keyboard.press('ArrowLeft');await sel('hata');
      for(const t of['dil','yontem','tumevarim','kur','hata','alistirma']){await click('tab-'+t);await fits();eq(await page.locator('#panel-'+t).isVisible(),true);}
      assert.deepEqual(errors,[]);checks++;await page.close();}
    console.log(`G ispat-yontemleri: ${checks-before} tarayıcı kontrolü PASS (390 px açık, 1280 px koyu)`);
  }finally{await browser?.close();await new Promise(r=>server.close(r));}
}
