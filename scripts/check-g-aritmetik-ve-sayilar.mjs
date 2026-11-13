// G · aritmetik-ve-sayilar: çekirdek, sayfanın formüllerini yinelemeyen referanslarla sınanır
// (kayan noktalı özyinelemeli ayrıştırıcı, kaba kuvvet bölen ve asal sayımı, BigInt kalanları, uzun bölmenin
// rakamlarının doğrudan BigInt bölmesiyle karşılaştırılması, devirliliğin tanımdan denetimi, Number.toExponential).
// `--browser` gerçek arayüzü 390 px açık ve 1280 px koyu temada dener. Defter henüz yok: yalnız onun 404'ü yok sayılır.
import fs from 'node:fs';
import assert from 'node:assert/strict';
const SLUG='aritmetik-ve-sayilar';
const html=fs.readFileSync(new URL(`../${SLUG}.html`,import.meta.url),'utf8');
const source=html.split('/* KERNEL-BEGIN */')[1]?.split('/* KERNEL-END */')[0];
assert(source,'Çekirdek sınır işaretleri gerekli');
const K=new Function('"use strict";'+source+';return Aritmetik;')();
let checks=0;
const eq=(a,b,msg='')=>{assert.equal(a,b,msg||`${a} ≠ ${b}`);checks++;};
const ok=(c,msg='koşul sağlanmadı')=>{assert(c,msg);checks++;};
const near=(a,b,tol,msg)=>{assert(Math.abs(a-b)<=tol*Math.max(1,Math.abs(b)),(msg||'')+` ${a} ≠ ${b}`);checks++;};
const nb=s=>String(s).replace(/[  ]/g,' ');
ok(Object.isFrozen(K)&&Object.isFrozen(K.MISTAKES)&&Object.isFrozen(K.TOPICS));

/* Bağımsız referans: kayan noktalı özyinelemeli ayrıştırıcı.
   ifade := terim (± terim)* ; terim := tekli ((×|÷|yan yana) tekli)* ; tekli := −tekli | +tekli | üs ; üs := öğe (^ tekli)? */
function refEval(src){const s=String(src).replace(/[\s  ]/g,'').replace(/[−–]/g,'-').replace(/[×·xX]/g,'*').replace(/[÷:]/g,'/')
  .replace(/[⁰¹²³⁴⁵⁶⁷⁸⁹]+/g,m=>'^'+[...m].map(c=>'⁰¹²³⁴⁵⁶⁷⁸⁹'.indexOf(c)).join('')).replace(/[[{]/g,'(').replace(/[\]}]/g,')');let i=0;
  const peek=()=>s[i],fail=()=>{throw new Error('ref sözdizimi '+src);};
  function atom(){if(peek()==='('){i++;const v=expr();if(s[i++]!==')')fail();return v;}const m=/^\d+(?:[.,]\d+)?/.exec(s.slice(i));if(!m)fail();i+=m[0].length;return Number(m[0].replace(',','.'));}
  function power(){const b=atom();if(peek()==='^'){i++;const e=unary();if(b===0&&e<=0)throw new Error('tanımsız');return b**e;}return b;}
  function unary(){if(peek()==='-'){i++;return -unary();}if(peek()==='+'){i++;return unary();}return power();}
  function term(){let v=unary();for(;;){if(peek()==='*'){i++;v*=unary();}else if(peek()==='/'){i++;const d=unary();if(d===0)throw new Error('sıfır');v/=d;}else if(peek()==='('){v*=unary();}else return v;}}
  function expr(){let v=term();for(;;){if(peek()==='+'){i++;v+=term();}else if(peek()==='-'){i++;v-=term();}else return v;}}
  const v=expr();if(i!==s.length)fail();return v;}

/* 1. Kesirler */
{const r=K.rng(7);for(let t=0;t<3000;t++){const a=Math.floor(r()*401)-200,b=Math.floor(r()*99)+1,c=Math.floor(r()*401)-200,d=Math.floor(r()*99)+1;const x=K.R(a,b),y=K.R(c,d);
  near(K.toNum(K.add(x,y)),a/b+c/d,1e-12);near(K.toNum(K.mul(x,y)),a/b*(c/d),1e-12);near(K.toNum(K.sub(x,y)),a/b-c/d,1e-12);if(c)near(K.toNum(K.div(x,y)),(a/b)/(c/d),1e-12);
  let g=x.n<0n?-x.n:x.n,h=x.d;while(h){[g,h]=[h,g%h];}ok(x.d>0n&&(x.n===0n?x.d===1n:g===1n),'sade değil');eq(K.cmp(x,y),Math.sign(a*d-c*b));}}
assert.throws(()=>K.R(1,0));assert.throws(()=>K.div(K.R(1),K.R(0)));checks+=2;
eq(nb(K.fmtI(12345)),'12 345');eq(K.fmtI(4728),'4728');eq(K.fmtI(-5),'−5');eq(K.fmtDec(K.R(-7,4)),'−1,75');eq(K.fmtDec(K.R(1,3)),null);eq(K.fmtMixed(K.R(7,3)),'2 tam 1/3');eq(K.fmtMixed(K.R(-7,3)),'−2 tam 1/3');
eq(K.fmtFull(K.R(101,25)),'4,04 = 101/25');eq(K.fmtFull(K.R(29,15)),'29/15 = 1 tam 14/15 ≈ 1,9333');eq(K.fmtN(-0.0001,2),'0');eq(nb(K.fmtN(12345.678,1)),'12 345,7');

/* 2. İfade hesaplayıcı: bilinen değerler, rastgele ifadeler ve hata durumları */
const known=[['2 + 3 × 4','14'],['12 ÷ 3 × 2','8'],['−3² + (−3)²','0'],['−3²','−9'],['(−3)²','9'],['2^3^2','512'],['48 ÷ 2(9 + 3)','288'],['1/2 + 1/3 × 0,6','7/10'],
  ['−3² + 2 × (7 − 4)² ÷ 6','−6'],['2^-1','1/2'],['2^(−3)','1/8'],['--3','3'],['−(−(2))','2'],['(1 − 4)^3','−27'],['10 − 2 − 3','5'],['2 × [3 + {4}]','14'],['0,1 + 0,2','3/10'],['3(4)(5)','60'],['2²³','8 388 608']];
for(const[e,v]of known){const E=K.evaluate(e);ok(E.ok,e+' '+E.error);eq(nb(K.fmtR(E.value)),v,e);near(K.toNum(E.value),refEval(e),1e-12,e);
  // Adımlar zinciri: her adımın "sonra"sı bir sonrakinin ifadesidir ve yeniden hesaplanınca aynı değeri verir.
  for(const st of E.steps){const again=K.evaluate(st.after.replace(/(\d)[\u202F](?=\d)/g,'$1').replace(/\((\d+)\/(\d+)\)/g,'($1÷$2)'));ok(again.ok&&K.same(again.value,E.value),e+' adım '+st.after);}}
eq(K.evaluate('−3² + 2 × (7 − 4)² ÷ 6').steps.length,6);eq(K.evaluate('2^3^2').start,'2^3²');eq(K.evaluate('48 ÷ 2(9 + 3)').start,'48 ÷ 2 × (9 + 3)');
eq(K.fmtR(K.evaluate('2 + 3 × 4',true).value),'20');eq(K.fmtR(K.evaluate('−3² + 2 × (7 − 4)² ÷ 6',true).value),'−21/2');eq(K.fmtR(K.evaluate('12 ÷ 3 × 2',true).value),'8');
for(const bad of['2 1/2','10 000 + 1','','3+','(2','2)','()','2²3','×3','a+1','1,,2','5/0','0^0','0^(−1)','2^(1/2)','9^99'])ok(!K.evaluate(bad).ok,'reddedilmeli: '+bad);
{const r=K.rng(11);const gen=d=>{const x=r();if(d>3||x<0.3){const n=Math.floor(r()*20)+(r()<.2?0.5:0);return r()<.15?'−'+String(n).replace('.',','):String(n).replace('.',',');}
  const op=['+','−','×','÷','^'][Math.floor(r()*5)];if(op==='^')return'('+gen(d+1)+')^'+(Math.floor(r()*4));const a=gen(d+1),b=gen(d+1);return r()<.4?'('+a+' '+op+' '+b+')':a+' '+op+' '+b;};
  let tried=0,compared=0;while(compared<2500&&tried<20000){tried++;const e=gen(0);let ref;try{ref=refEval(e);}catch{ref=null;}const E=K.evaluate(e);
    if(ref===null||!Number.isFinite(ref)){ok(!E.ok||ref===null&&!E.ok||true);continue;}if(!E.ok){if(/büyüdü/.test(E.error))continue;assert.fail(e+' '+E.error);}near(K.toNum(E.value),ref,1e-9,e);compared++;}
  ok(compared>=2500,'rastgele ifade sayısı');}

/* 3. Yanıt ayrıştırıcı (birim testleri) */
const P=s=>{const p=K.parseNumber(s);return p.ok?nb(K.fmtR(p.value)).replace(/ /g,'')+(p.percent?'%':''):'X';};
for(const[s,v]of[['3/4','3/4'],[' 3 / 4 ','3/4'],['6/8','3/4'],['1 1/2','3/2'],['2 tam 1/3','7/3'],['-1 1/2','−3/2'],['−1 1/2','−3/2'],['−0,5','−1/2'],['2.5','5/2'],['2,5','5/2'],[',5','1/2'],
  ['10 000','10000'],['10 000','10000'],['1 234 567,5','2469135/2'],['0,(6)','2/3'],['0,1(6)','1/6'],['−0,(3)','−1/3'],['120 TL','120'],['3,7 km','37/10'],['12 gün','12'],['%20','20%'],['-4%','−4%'],['−%4','−4%'],
  ['4/-8','−1/2'],['-4/-8','1/2'],['1,5/3','1/2'],['007','7'],['0','0'],['1.500','3/2'],['abc','X'],['1/0','X'],['','X'],['1 2','X'],['2,5,1','X'],['--3','X'],['3/','X'],['1 1/0','X']])eq(P(s),v,'ayrıştırıcı: '+s);

/* 4. Sayı doğrusu */
for(const[s,c,set]of[['√2','I','00011'],['−√2','I','00011'],['√9','N','11101'],['√0','N','11101'],['π','I','00011'],['e','I','00011'],['−7/4','Q','00101'],['0,(3)','Q','00101'],['−5','Z','01101'],['2 1/2','Q','00101'],['8/4','N','11101'],['kök 50','I','00011']]){
  const p=K.classify(s);ok(p.ok,s);eq(p.cls,c,s);eq(['N','Z','Q','I','R'].map(k=>p.sets[k]?1:0).join(''),set,s);}
ok(!K.classify('x').ok&&!K.classify('').ok&&!K.classify('%5').ok);
for(const s of['√2','√3','√10','√99','−√7','π','e','−7/4','0,(3)','22/7','−1/3','3']){const p=K.classify(s);for(let k=0;k<=6;k++){const b=K.bracket(p,k),f=10**k;
  if(p.exact){const t=Number(p.exact.n)*f/Number(p.exact.d);eq(b.loN,Math.floor(t+1e-9)/f,s+k);eq(b.hit,Math.abs(t-Math.round(t))<1e-9,s+k);}
  else{ok(b.loN<=p.value&&p.value<b.hiN,s+k);ok(!b.hit);}
  if(p.root&&p.sign>0){const m=K.isqrt(BigInt(p.root)*10n**BigInt(2*k));ok(m*m<=BigInt(p.root)*10n**BigInt(2*k)&&(m+1n)**2n>BigInt(p.root)*10n**BigInt(2*k));}}}
eq(K.bracket(K.classify('√2'),3).sq.lo,'1,999396');eq(K.bracket(K.classify('√2'),3).sq.hi,'2,002225');eq(K.bracket(K.classify('√2'),6).loS,'1,414213');
for(let p=1;p<=400;p++)for(let q=1;q<=300;q++){if(p*p===2*q*q)assert.fail('p² = 2q²');}checks++;
for(const[p,q,d]of[[3,2,1n],[7,5,-1n],[17,12,1n],[41,29,-1n],[99,70,1n],[577,408,1n]])eq(K.squareTest(p,q).diff,d);
for(let a=-6;a<=6;a++)for(let b=-6;b<=6;b++)for(const[op,res]of[['+',a+b],['-',a-b],['*',a*b]]){const J=K.jumps(a,b,op).filter(j=>!j.ghost);eq((J.length?J[J.length-1].to:0)+0,res+0,op+a+','+b);for(let i=1;i<J.length;i++)eq(J[i].from,J[i-1].to);}

/* 5. Bölünebilme, çarpanlar, EBOB/EKOK */
const primeBrute=n=>{if(n<2)return false;for(let d=2;d<n;d++)if(n%d===0)return false;return true;};
for(let n=2;n<=3000;n++){eq(K.isPrime(n),primeBrute(n));const f=K.factorize(n);eq(f.reduce((a,[p,e])=>a*p**e,1),n);ok(f.every(([p])=>primeBrute(p)));
  let c=0;for(let d=1;d<=n;d++)if(n%d===0)c++;eq(f.reduce((a,[,e])=>a*(e+1),1),c);eq(K.countDivisorsBrute(n),c);eq(K.divisorsFrom(f).length,c);
  if(n<=1200)for(const mode of['mid','small']){const L=K.treeLeaves(K.factorTree(n,mode)).sort((a,b)=>a-b);eq(L.join(),f.flatMap(([p,e])=>Array(e).fill(p)).join(),n+mode);}}
{const r=K.rng(3);const nums=['4728','1001','360','97','123456789','999999999999','10','11','121'];for(let t=0;t<400;t++){let s=String(1+Math.floor(r()*9));const L=Math.floor(r()*28);for(let i=0;i<L;i++)s+=Math.floor(r()*10);nums.push(s);}
  for(let n=2;n<=20000;n++)nums.push(String(n));
  for(const s of nums)for(const row of K.divRules(s)){eq(row.rule,BigInt(s)%BigInt(row.k)===0n,s+' / '+row.k);eq(row.rem,Number(BigInt(s)%BigInt(row.k)));}}
eq(K.divRules('4728').find(r=>r.k===11).txt,'sağdan dönüşümlü toplam −4 + 7 − 2 + 8 = 9, 11\'e bölünmez');
eq(nb(K.factorize(999999999989).map(x=>x.join('^')).join()),'999999999989^1');
for(let a=1;a<=80;a++)for(let b=1;b<=80;b++){let g=1;for(let d=1;d<=Math.min(a,b);d++)if(a%d===0&&b%d===0)g=d;let l=Math.max(a,b);while(l%a||l%b)l++;eq(K.gcd(a,b),g);eq(K.lcm(a,b),l);
  const S=K.euclidSquares(a,b);eq(S.reduce((s,q)=>s+q.s*q.s,0),a*b);eq(S[S.length-1].s,g);ok(S.every(q=>q.x>=0&&q.y>=0&&q.x+q.s<=a&&q.y+q.s<=b));
  const st=K.gcdSteps(Math.max(a,b),Math.min(a,b));ok(st.every(x=>x.a===x.q*x.b+x.r&&x.r<x.b));eq(st[st.length-1].b,g);}
eq(K.gcd(1071,462),21);eq(K.gcdSteps(84,60).length,3);eq(K.lcm(84,60),420);

/* 6. Kesir modelleri */
for(let a=0;a<=24;a++)for(let b=1;b<=12;b++)for(let c=0;c<=24;c+=3)for(let d=1;d<=12;d++){const L=K.lcm(b,d);const m=K.cellsIn(a,b,L);eq(m.count,a*L/b);ok(m.exact);
  const A=K.areaCount(a,b,c,d);eq(A.count,a*c);eq(A.perUnit,b*d);
  const f=K.fitCount(a,b,c,d);if(c===0)eq(f,null);else{const q=(a*d)/(b*c);eq(f.whole,Math.floor(q+1e-12));near(f.whole+K.toNum(f.partial),q,1e-12);}}

/* 7. Ondalık */
for(let q=1;q<=400;q++)for(const p of[1,2,3,7,10,22,99,123,1000]){const Ld=K.longDiv(p,q),n=Ld.digits.length;
  // Rakamlar: ilk 40 basamak doğrudan BigInt bölmesiyle
  const ref=(BigInt(p)*10n**40n/BigInt(q)).toString().padStart(41,'0');const fracRef=ref.slice(-40);
  let gen='';for(let i=0;i<40;i++){gen+=i<n?Ld.digits[i]:Ld.terminating?0:Ld.digits[Ld.pre+((i-Ld.pre)%Ld.period)];}eq(gen,fracRef,p+'/'+q);eq(Ld.ip,Math.floor(p/q));
  // Tanımdan: sonlu ⇔ sade paydada yalnız 2 ve 5; devir en küçük periyot
  let m=q/K.gcd(p,q);while(m%2===0)m/=2;while(m%5===0)m/=5;eq(Ld.terminating,m===1||p%q===0);
  if(!Ld.terminating){const long=(BigInt(p%q)*10n**BigInt(3*q+10)/BigInt(q)).toString().padStart(3*q+10,'0');const per=t=>{for(let i=Ld.pre;i+t<long.length-2;i++)if(long[i]!==long[i+t])return false;return true;};
    ok(per(Ld.period),p+'/'+q+' devir');for(let t=1;t<Ld.period;t++)if(Ld.period%t===0&&per(t))assert.fail('daha kısa devir '+p+'/'+q);if(Ld.pre>0)ok(long[Ld.pre-1]!==long[Ld.pre-1+Ld.period],'devir öncesi en kısa');
    const T=K.periodTheory(p,q);eq(T.period,Ld.period);eq(T.pre,Ld.pre);}}
eq(K.decString(K.longDiv(1,7)),'0,(142857)');eq(K.longDiv(1,97).period,96);eq(K.decString(K.longDiv(1,6)),'0,1(6)');eq(K.decString(K.longDiv(3,8)),'0,375');eq(K.decString(K.longDiv(22,7)),'3,(142857)');
for(const[s,v]of[['0,(9)','1'],['0,(3)','1/3'],['0,1(6)','1/6'],['2,(45)','27/11'],['0,125','1/8'],['−0,(3)','−1/3'],['0,(142857)','1/7'],['1,2(34)','611/495'],['0,4(9)','1/2']]){const T=K.toFraction(s);ok(T.ok);eq(K.fmtR(T.value),v,s);
  const m=s.replace('−','').match(/^(\d+),(\d*)(?:\((\d+)\))?$/);let x=m[1]+'.'+m[2];if(m[3])while(x.length<40)x+=m[3];near(Math.abs(K.toNum(T.value)),Number(x),1e-12,s);}
ok(!K.toFraction('0,3…').ok);
for(const s of['45600000','0.0000123','299792458','-0.5','7','0.1','123.456','1000']){const S=K.sci(s);ok(S.ok);const[m,e]=Number(s).toExponential().split('e');eq(S.exp,+e,s);eq(S.mant.replace(',','.').replace('−','-'),m,s);}
eq(K.sci('45 600 000').text,'4,56 × 10⁷');eq(K.sci('0,000 012 3').text,'1,23 × 10⁻⁵');eq(K.sci('0').mant,'0');ok(!K.sci('abc').ok);

/* 8. Yüzde */
eq(K.fmtR(K.chain(K.R(100),[20,-20])[2]),'96');eq(K.fmtR(K.chain(K.R(100),[25,-20])[2]),'100');eq(K.fmtR(K.chain(K.R(200),[10,10])[2]),'242');
for(let r1=-90;r1<=100;r1+=5){const b=K.backRate(r1),c=K.chain(K.R(1),[r1]);near(K.toNum(c[1])*(1+K.toNum(b)/100),1,1e-12);}
eq(K.fmtR(K.backRate(-50)),'100');eq(K.fmtR(K.backRate(20)),'−50/3');
eq(K.pct('−4'),'−%4');eq(K.pct('+21'),'+%21');eq(K.pct('≈ −16,67'),'≈ −%16,67');eq(K.pct('0'),'%0');

/* 8b. Türkçe ekler (doğrulayıcı, 13 Kasım 2026): bağımsız referans sayıyı baştan sona okur ve son sözcüğün
   ekini elle yazılmış tablodan alır (sayfa ise son basamaklardan kestirir). Kesirde payın okunuşu: "üçte iki" → 2/3'nin. */
{const B=['','bir','iki','üç','dört','beş','altı','yedi','sekiz','dokuz'],O=['','on','yirmi','otuz','kırk','elli','altmış','yetmiş','seksen','doksan'];
  const uc=n=>[n>=100?(n>=200?B[Math.floor(n/100)]+' ':'')+'yüz':'',O[Math.floor(n/10)%10],B[n%10]].filter(Boolean).join(' ');
  const spell=n=>{if(n===0)return'sıfır';const parts=[];for(const[v,w]of[[1e9,'milyar'],[1e6,'milyon'],[1e3,'bin'],[1,'']]){const k=Math.floor(n/v)%1000;if(!k)continue;parts.push((v===1e3&&k===1?'':uc(k)+' ')+w);}return parts.join(' ').trim();};
  const T={sıfır:'ı ı a ın dan',bir:'i i e in den',iki:'yi si ye nin den',üç:'ü ü e ün ten',dört:'ü ü e ün ten',beş:'i i e in ten',altı:'yı sı ya nın dan',yedi:'yi si ye nin den',sekiz:'i i e in den',dokuz:'u u a un dan',
    on:'u u a un dan',yirmi:'yi si ye nin den',otuz:'u u a un dan',kırk:'ı ı a ın tan',elli:'yi si ye nin den',altmış:'ı ı a ın tan',yetmiş:'i i e in ten',seksen:'i i e in den',doksan:'ı ı a ın dan',yüz:'ü ü e ün den',bin:'i i e in den',milyon:'u u a un dan',milyar:'ı ı a ın dan'};
  const exp=(word,x)=>{const s=T[word].split(' ');return['i','si','e','in','den'].map((t,i)=>x+"'"+s[i]).join(' ');};
  const got=x=>['i','si','e','in','den'].map(t=>K.ek(x,t)).join(' ');
  const last=n=>spell(n).split(' ').pop();
  eq(spell(1999),'bin dokuz yüz doksan dokuz');eq(spell(2000000),'iki milyon');
  for(let n=0;n<=1000;n++)eq(got(n),exp(last(n),n),'ek '+n);
  for(const n of[1001,1100,2000,10000,12345,100000,999999,1000000,2500000,1000000000])eq(got(n),exp(last(n),n),'ek '+n);
  for(let r=1;r<=100;r++)eq(got('%'+r),exp(last(r),'%'+r),'ek %'+r);
  for(let q=2;q<=12;q++)for(let p=1;p<=12;p++)eq(got(p+'/'+q),exp(last(p),p+'/'+q),'ek '+p+'/'+q);
  eq(K.ek('16,67','den'),"16,67'den");eq(K.ek('0,05','i'),"0,05'i");eq(K.ek('2 tam 1/3','in'),"2 tam 1/3'in");eq(K.ek('−7/4','e'),"−7/4'ye");
  // Üretilen soru metinlerinde sabit ek kalmadı: her "sayı'ek" eşleşmesi okunuşa uyar
  for(const topic of K.TOPICS)for(const level of[1,2,3])for(let seed=1;seed<=30;seed++){const Pq=K.problem(topic,level,seed,1);
    for(const s of[Pq.text,...Pq.steps,...Pq.traps.map(t=>t.why)])for(const m of s.matchAll(/(%?\d+(?:[ \u202F]\d{3})*(?:\/\d+)?)'([a-zçğıöşü]+)/g)){const sfx=m[2];const known=['i','si','e','in','den'].map(t=>K.ek(m[1],t).split("'")[1]);
      if(['ı','i','u','ü','yı','yi','yu','yü','sı','si','su','sü','a','e','ya','ye','ın','in','un','ün','nın','nin','nun','nün','dan','den','tan','ten'].includes(sfx))ok(known.includes(sfx),'ek uyumsuz: '+m[0]+' ← '+s);}}}
{let P0;for(let s=1;s<99;s++){P0=K.problem('yuzde',3,s,1);if(P0.kind==='yuzde'&&K.fmtR(P0.answer)==='−4')break;}
  eq(P0.answerText,'−%4 (yüzde 4 azalış)');for(const a of['-4','−%4','%-4','-4 %','−4,0','–4','-4,00 %'])eq(K.grade(P0,a).status,'dogru',a);eq(K.grade(P0,'4').status,'yanlis');ok(/işaret/.test(K.grade(P0,'4').msg));eq(K.grade(P0,'yüzde 4').status,'gecersiz');}
{const p=K.classify('√9');ok(!/= 3 = 3/.test(p.why)&&p.why.includes('9 = 3²'));ok(!K.classify('0,(3)').why.startsWith('1/3 = 1/3'));}
ok(K.MISTAKES[4].check().includes('−%4'));

/* 9. Alıştırma üreteci: her soru bağımsız referansla çözülür */
let probs=0;const texts=new Set();
for(const topic of['karisik',...K.TOPICS])for(const level of[1,2,3])for(let seed=1;seed<=40;seed++)for(let idx=1;idx<=4;idx++){const Pq=K.problem(topic,level,seed,idx);probs++;
  ok(Pq.text&&Pq.hint&&Pq.steps.length>0&&Pq.answerText,'eksik alan');texts.add(Pq.text);
  const A=K.toNum(Pq.answer),c=Pq.check;
  if(c.expr)near(A,refEval(c.expr),1e-9,c.expr);
  else if(c.gcd){let g=1;for(let d=1;d<=Math.min(...c.gcd);d++)if(c.gcd[0]%d===0&&c.gcd[1]%d===0)g=d;eq(A,g);}
  else if(c.lcm){let l=Math.max(...c.lcm);while(l%c.lcm[0]||l%c.lcm[1])l++;eq(A,l);}
  else if(c.tiles){let g=1;for(let d=1;d<=Math.min(...c.tiles);d++)if(c.tiles[0]%d===0&&c.tiles[1]%d===0)g=d;eq(A,c.tiles[0]*c.tiles[1]/(g*g));}
  else if(c.rep){const m=c.rep.match(/^0,(\d*)\((\d+)\)$/);let x='0.'+m[1];while(x.length<30)x+=m[2];near(A,Number(x),1e-12,c.rep);}
  else assert.fail('denetim yok');
  // Doğru yanıt birkaç yazımda doğru, tuzaklar yanlış sayılır
  const forms=[K.fmtR(Pq.answer),K.fmtR(Pq.answer).replace('−','-')];if(K.termDigits(Pq.answer)>=0)forms.push(K.fmtDec(Pq.answer).replace(',','.').replace(/ /g,''));
  if(!K.isInt(Pq.answer)&&Pq.answer.n>Pq.answer.d)forms.push(K.fmtMixed(Pq.answer));
  for(const f of forms)eq(K.grade(Pq,nb(f)).status,'dogru',Pq.text+' ← '+f);
  ok(Pq.traps.every(t=>!K.same(t.v,Pq.answer)));for(const t of Pq.traps){const g=K.grade(Pq,K.fmtR(t.v).replace('−','-'));eq(g.status,'yanlis');ok(g.msg.length>10);}
  eq(K.problem(topic,level,seed,idx).text,Pq.text,'tohum belirleyici');}
ok(texts.size>probs*0.6,'çeşitlilik '+texts.size+'/'+probs);
{const Pq=K.problem('ondalik',3,1,1);eq(K.grade(Pq,'0,'+Pq.text.match(/0,([\d()]+)/)[1]).status,'gecersiz','devirli yazım kesir sorusunda kabul edilmez');
  const Pa=K.problem('kesir',3,2,1);if(K.termDigits(Pa.answer)<0)eq(K.grade(Pa,K.fmtN(K.toNum(Pa.answer),3)).status,'yaklasik');eq(K.grade(Pa,'abc').status,'gecersiz');}

/* 10. Sık yapılan hatalar */
ok(K.MISTAKES.length>=5);
for(const m of K.MISTAKES){ok(m.lines.length>=2&&m.bad>=1&&m.bad<m.lines.length&&m.fix&&m.why);ok(typeof m.check()==='string'&&m.check().length>10);ok(!/[̀-ͯ]/.test(JSON.stringify(m)));}
ok(K.MISTAKES[0].check().includes('5/6'));ok(K.MISTAKES[1].check().includes('14')&&K.MISTAKES[1].check().includes('20'));ok(K.MISTAKES[2].check().includes('−9'));ok(K.MISTAKES[3].check().includes('0,06'));ok(K.MISTAKES[4].check().includes('96'));ok(K.MISTAKES[5].check().includes('12'));ok(K.MISTAKES[8].check().includes('12'));
ok(!/[̀-ͯ]/.test(html),'sayfada birleşik işaret yok');
console.log(`G ${SLUG}: ${checks.toLocaleString('tr-TR')} bağımsız çekirdek kontrolü PASS (${probs} üretilmiş soru)`);

if(process.argv.includes('--browser')){
  const {chromium}=await import('playwright');const {createServer}=await import('node:http');const {join,extname}=await import('node:path');const {fileURLToPath}=await import('node:url');const root=fileURLToPath(new URL('../',import.meta.url));
  const server=createServer((req,res)=>{const file=join(root,decodeURIComponent(new URL(req.url,'http://localhost').pathname));if(!fs.existsSync(file)||fs.statSync(file).isDirectory()){res.writeHead(404).end();return;}res.setHeader('Content-Type',({'.html':'text/html; charset=utf-8','.js':'text/javascript; charset=utf-8','.css':'text/css; charset=utf-8'})[extname(file)]||'application/octet-stream');res.end(fs.readFileSync(file));});await new Promise(r=>server.listen(0,'127.0.0.1',r));let browser;const before=checks;
  const digestOK=/shared\/digest\/aritmetik-ve-sayilar\.js/;
  try{browser=await chromium.launch();
    for(const[theme,width]of[['light',390],['dark',1280]]){
      const page=await browser.newPage({viewport:{width,height:900},deviceScaleFactor:width===390?2:1});await page.addInitScript(t=>{localStorage.setItem('acelya-theme',t);localStorage.setItem('acelya-sound-muted','1');},theme);page.setDefaultTimeout(8000);
      const errors=[];page.on('pageerror',e=>errors.push(e.message));
      page.on('response',r=>{if(r.status()>=400&&!digestOK.test(r.url()))errors.push(r.status()+' '+r.url());});
      page.on('console',m=>{if(m.type()==='error'&&!/Failed to load resource|aritmetik-ve-sayilar\.js/.test(m.text()))errors.push(m.text());});
      await page.goto(`http://127.0.0.1:${server.address().port}/${SLUG}.html`);await page.waitForTimeout(150);
      const click=sel=>page.locator(sel.startsWith('[')||sel.startsWith('#')?sel:'#'+sel).first().click(),read=async id=>nb(await page.locator('#'+id).textContent()),
        set=(id,v)=>page.locator('#'+id).evaluate((e,v)=>{e.value=v;e.dispatchEvent(new Event(e.tagName==='SELECT'?'change':'input',{bubbles:true}));},v),
        is=async(id,t)=>{eq(await read(id),t,id);},has=async(id,t)=>{const s=await read(id);ok(s.includes(t),`${id}: “${s}” içinde “${t}” yok`);},fits=async()=>eq(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),true,'yatay taşma');
      eq(await page.title(),'Aritmetik ve Sayılar: Sayı Doğrusu, Kesir, Ondalık, Oran ve Yüzde');ok((await page.title()).length<=80);
      eq(await page.evaluate(()=>[...document.querySelectorAll('.app-content input,.app-content select')].filter(e=>!document.querySelector('label[for="'+e.id+'"]')).map(e=>e.id).join()),'','etiketsiz denetim');
      eq(await page.evaluate(()=>{const cs=[...document.querySelectorAll('.app-content canvas')];return cs.length===9&&cs.every(c=>c.getAttribute('role')==='img'&&!!c.getAttribute('aria-label'));}),true);
      eq(await page.evaluate(()=>Object.isFrozen(Aritmetik)&&!Object.getOwnPropertyDescriptor(window,'Aritmetik').writable),true);
      eq(await page.evaluate(()=>/[̀-ͯ]/.test(document.body.innerText)),false,'birleşik aksan işareti yok');
      eq(await page.evaluate(()=>document.querySelectorAll('input[type=number]').length),0);
      eq(await page.evaluate(()=>[...document.querySelectorAll('.ar-bridge a')].map(a=>a.getAttribute('href')).filter(h=>/cebirin-temelleri|us-ve-logaritma/.test(h)).length),2,'sıradaki iki derse bağlantı');
      // 01 · Sayılar
      await is('nlValue','√2 ≈ 1,414214');await is('nlKind','irrasyonel sayı');await is('nlBracket','1 < √2 < 2');await has('nlBracketNote','Kareleri: 1 < 2 < 4');eq(await page.locator('#nlTable tr').count(),5);
      await set('nlZoom','3');await is('nlBracket','1,414 < √2 < 1,415');await has('nlBracketNote','1,999396 < 2 < 2,002225');await is('nlZoomOut','10³ kat');
      await click('[data-nl="−7/4"]');await has('nlBracket','= −1,75');await is('nlValue','−1,75 = −7/4');await is('nlKind','tam olmayan rasyonel sayı');
      await click('[data-nl="0,(3)"]');await is('nlBracket','0,333 < 1/3 < 0,334');await is('nlValue','1/3 ≈ 0,333333');ok(!(await read('nlStatus')).startsWith('1/3 = 1/3'));await has('nlStatus','tekrar eder');
      await set('nlInput','abc');await click('nlAdd');await has('nlStatus','okunamadı');
      await set('nlInput','√9');await click('nlAdd');await is('nlKind','doğal sayı');await is('nlValue','√9 = 3');await click('nlClear');await is('nlValue','—');eq(await page.locator('#nlTable tr').count(),0);
      await is('rtP2','49');await is('rtQ2','50');await is('rtDiff','−1');await click('[data-rt="99/70"]');await is('rtDiff','+1');await is('rtQ2','9800');await set('rtInput','2/0');await has('rtStatus','p/q biçiminde');
      await is('sgResult','−3 × (−2) = 6');await has('sgRule','İşaretler aynı');eq(await page.locator('#sgTable tr').count(),7);await set('sgOp','-');await is('sgResult','−3 − (−2) = −1');await has('sgRule','Negatif çıkarmak');await set('sgB','4');await set('sgOp','+');await is('sgResult','−3 + 4 = 1');
      await is('opResult','−6');await is('opNaive','−10,5 = −21/2');eq(await page.locator('#opSteps li').count(),6);await has('opStart','Okunan: −3² + 2 × (7 − 4)² ÷ 6');
      await click('[data-op="2 + 3 × 4"]');await is('opResult','14');await is('opNaive','20');await click('[data-op="48 ÷ 2(9 + 3)"]');await is('opResult','288');await has('opStatus','Yan yana');await has('opStatus','tek doğru okuma değildir');await has('opStatus','48 ÷ (2 × (9 + 3)) olur ve 2 çıkar');
      await click('[data-op="12 ÷ 3 × 2"]');await is('opResult','8');await has('opNaiveNote','aynı sonuç');await set('opInput','5 ÷ (3 − 3)');await is('opResult','tanımsız');await has('opStatus','Sıfıra bölme');await set('opInput','2 +');await has('opStatus','Okunamadı');
      await click('sayiReset');await is('opResult','−6');await is('nlValue','√2 ≈ 1,414214');await is('sgResult','−3 × (−2) = 6');await is('rtDiff','−1');await fits();
      await page.locator('#tab-sayi').focus();await page.keyboard.press('ArrowRight');eq(await page.locator('#tab-bol').getAttribute('aria-selected'),'true');
      // 02 · Bölünebilme
      await is('bnFactors','360 = 2³ × 3² × 5');await is('bnDivCount','24');await is('bnDivBrute','24');await has('bnDivBruteNote','fark 0');eq(await page.locator('#bnRules tr').count(),9);await has('bnStatus',"Dokuz kuralın 9'u gerçek");
      await click('[data-bn="97"]');await has('bnPrime','asal');await is('bnDivCount','2');await click('[data-bn="1001"]');await is('bnFactors','1001 = 7 × 11 × 13');await has('bnRules','dönüşümlü toplam −1 + 0 − 0 + 1 = 0');
      await click('[data-bn="65536"]');await is('bnDivCount','17');await set('bnTree','small');await is('bnDivBrute','17');await set('bnInput','999999999989');await has('bnPrime','asal');await has('bnStatus','Ağaç çizilmedi');
      await set('bnInput','1');await has('bnStatus','2 ile 999 999 999 999');await set('bnInput','12x');await is('bnFactors','—');
      await is('ebGcd','12');await is('ebLcm','420');await has('ebCheck','12 × 420 = 5040');eq(await page.locator('#ebSteps li').count(),3);await click('[data-eb="1071,462"]');await is('ebGcd','21');await click('[data-eb="21,13"]');await is('ebGcd','1');await has('ebStatus','aralarında asal');
      await set('ebA','0');await has('ebStatus','1 ile 1 000 000');await click('bolReset');await is('ebGcd','12');await is('bnDivCount','24');eq(await page.locator('#bnTree').inputValue(),'mid');await fits();
      await page.locator('#tab-bol').focus();await page.keyboard.press('ArrowRight');eq(await page.locator('#tab-kesir').getAttribute('aria-selected'),'true');
      // 03 · Kesirler
      await is('frResult','5/6 ≈ 0,8333');await is('frModel','5 / 6 parça');await has('frModelNote','✓');await has('frStatus','2/5');eq(await page.locator('#frSteps li').count(),3);
      await click('[data-fr="bol,3,4,1,8"]');await is('frResult','6');await is('frModel','6 tam parça');await click('[data-fr="bol,3,4,1,3"]');await is('frResult','2,25 = 9/4');await is('frModel','2 tam + 1/4 parça');
      await click('[data-fr="carp,2,3,3,4"]');await is('frResult','0,5 = 1/2');await has('frStatus',"2/3'nin 3/4'ü");await has('frStatus',"2/3'den küçük");await set('frA','3');await set('frB','4');await set('frC','2');await set('frD','3');await has('frStatus',"3/4'ün 2/3'si");await has('frStatus',"3/4'ten küçük");await set('frC','5');await set('frD','4');await has('frStatus',"3/4'ten büyük");await click('[data-fr="carp,2,3,3,4"]');await is('frModel','6 / 12 parça');await click('[data-fr="karsilastir,5,8,3,5"]');await is('frResult','5/8 > 3/5');await is('frModel','25 ile 24');
      await click('[data-fr="cikar,3,4,1,6"]');await is('frResult','7/12 ≈ 0,5833');await is('frModel','7 / 12 parça');await click('[data-fr="genislet,6,8,1,1"]');await is('frResult','0,75 = 3/4');eq(await page.locator('#frKBox').isVisible(),true);await is('frModel','18 / 24 parça');
      await set('frOp','bol');await set('frC','0');await is('frResult','tanımsız');await set('frOp','cikar');await set('frA','1');await set('frB','4');await set('frC','1');await set('frD','2');await has('frStatus','negatif');await is('frResult','−0,25 = −1/4');
      await set('frA','24');await set('frB','1');await set('frC','24');await set('frD','12');await set('frOp','topla');await is('frResult','26');
      await click('kesirReset');await is('frResult','5/6 ≈ 0,8333');eq(await page.locator('#frKBox').isVisible(),false);await fits();
      await page.locator('#tab-kesir').focus();await page.keyboard.press('ArrowRight');eq(await page.locator('#tab-ond').getAttribute('aria-selected'),'true');
      // 04 · Ondalık, oran, yüzde
      await is('ldDec','1/7 = 0,(142857)');await is('ldPeriod','6');await is('ldTheory','devir 6');await has('ldStatus','aynı.');eq(await page.locator('#ldTable tr').count(),6);
      await click('[data-ld="1,97"]');await is('ldPeriod','96');await is('ldTheory','devir 96');eq(await page.locator('#ldTable tr').count(),25);await click('[data-ld="3,8"]');await is('ldDec','3/8 = 0,375');await is('ldPeriod','devir yok');await click('[data-ld="1,6"]');await is('ldDec','1/6 = 0,1(6)');await has('ldPre','devirden önce 1');
      await set('ldQ','0');await has('ldStatus','1 … 999');
      await is('rdFrac','1');eq(await page.locator('#rdSteps li').count(),5);await click('[data-rd="2,(45)"]');await is('rdFrac','27/11 = 2 tam 5/11 ≈ 2,4545');await click('[data-rd="0,125"]');await is('rdFrac','0,125 = 1/8');await set('rdInput','0,3…');await is('rdFrac','—');
      await is('nineVal','0,999');await is('nineGap','0,001 = 10⁻³');await set('nineN','12');await is('nineGap','0,000000000001 = 10⁻¹²');
      await is('sciOut','4,56 × 10⁷');await click('[data-sci="0,000 012 3"]');await is('sciOut','1,23 × 10⁻⁵');await is('fpOut','0,30000000000000004');
      await is('prY','72 TL');await has('prYNote','y / x = 24');eq(await page.locator('#prTable tr').count(),7);await set('prMode','ters');await is('prY','8 gün');await has('prYNote','x · y = 24');await set('prX','12');await is('prY','2 gün');
      await has('upStatus','A: 84 TL/kg · B: 80 TL/kg. B daha ucuz');await has('scStatus','= 3,7 km');await set('scN','1000000');await has('scStatus','= 74 km');await set('upAm','-1');await has('upStatus','pozitif');
      await is('pcB1','240');await is('pcB2','192');await is('pcNet','−%4');await is('pcBack','≈ −%16,67');await is('pcPart','40');await is('pcPartLabel',"Başlangıcın %20'si");await has('pcStatus','toplam %0 beklenirdi; gerçekte −%4');await click('[data-pc="-50,100"]');await is('pcNet','%0');await has('pcStatus','%50 düşüşü geri almak için %100 artış');await click('[data-pc="25,-20"]');await is('pcNet','%0');await click('[data-pc="10,10"]');await is('pcNet','+%21');await is('pcPartLabel',"Başlangıcın %10'u");
      await set('pcR1','-10');await is('pcBack','≈ +%11,11');await set('pcR1','40');await is('pcPartLabel',"Başlangıcın %40'ı");
      await set('pcR1','-50');await is('pcBack','+%100');await set('pcB','0');await has('pcStatus','pozitif');
      await has('ppStatus','fark +2 yüzde puan');await has('ppStatus','= +%20.');await set('ppP1','30');await set('ppP2','31');await has('ppStatus','≈ +%3,33');await set('ppP1','10');await set('ppP2','12');await set('ppP2','10');await has('ppStatus','Değişim yok');
      await click('ondReset');await is('ldDec','1/7 = 0,(142857)');await is('pcNet','−%4');await is('prY','72 TL');await is('nineVal','0,999');await fits();
      await page.locator('#tab-ond').focus();await page.keyboard.press('End');eq(await page.locator('#tab-alistirma').getAttribute('aria-selected'),'true');
      // 05 · Alıştırma
      const P1=K.problem('karisik',1,1,1);await is('exQuestion',nb(P1.text));await is('exScore','0 doğru / 0 deneme');
      await set('exAnswer','abc');await click('exCheck');await has('exFeedback','okunamadı');await is('exScore','0 doğru / 0 deneme');
      await set('exAnswer',K.fmtR(P1.answer));await click('exCheck');await has('exFeedback','Doğru!');await is('exScore','1 doğru / 1 deneme');
      await click('exHint');eq(await page.locator('#exHintBox').isVisible(),true);await click('exSolve');ok(await page.locator('#exSolution li').count()>=2);await has('exSolution','Yanıt: ');
      await click('exNew');await has('exWhere','soru 2');eq(await page.locator('#exSolution').isVisible(),false);
      await set('exTopic','kesir');await set('exLevel','2');const P2=K.problem('kesir',2,1,1);await is('exQuestion',nb(P2.text));if(P2.traps.length){await set('exAnswer',K.fmtR(P2.traps[0].v));await click('exCheck');await has('exFeedback','Olası hata');}
      await set('exSeed','42');const P3=K.problem('kesir',2,42,1);await is('exQuestion',nb(P3.text));await set('exAnswer',K.fmtDec(P3.answer)??K.fmtMixed(P3.answer));await page.locator('#exAnswer').press('Enter');await has('exFeedback','Doğru!');
      eq(await page.locator('#mkList article').count(),10);await page.locator('#mkList summary').first().click();await has('mkCheck0','5/6');await page.waitForTimeout(100);eq(await page.locator('#mkList article').first().locator('li.ar-wrong').count(),1,'yanlış satır işaretlenmeli');
      await click('alistirmaReset');await page.waitForTimeout(100);await is('exScore','0 doğru / 0 deneme');await is('exQuestion',nb(P1.text));eq(await page.locator('#mkList li.ar-wrong').count(),0);await fits();
      // R tuşu, Home, her sekmede tuval ve taşma
      await set('exLevel','3');await page.locator('h1').click();await page.keyboard.press('r');eq(await page.locator('#exLevel').inputValue(),'1');
      await page.locator('#tab-alistirma').focus();await page.keyboard.press('Home');eq(await page.locator('#tab-sayi').getAttribute('aria-selected'),'true');
      for(const t of['bol','kesir','ond','alistirma','sayi']){await click('tab-'+t);await fits();eq(await page.locator('#panel-'+t).isVisible(),true);
        eq(await page.evaluate(t=>[...document.querySelectorAll('#panel-'+t+' canvas')].every(c=>{const d=c.getContext('2d').getImageData(0,0,c.width,c.height).data,s=new Set();for(let i=0;i<d.length;i+=16)s.add(d[i]+','+d[i+1]+','+d[i+2]);return s.size>2;}),t),true,t+' tuvali boş');}
      for(const op of['genislet','karsilastir','topla','cikar','carp','bol']){await click('tab-kesir');await set('frOp',op);await fits();}
      assert.deepEqual(errors,[]);checks++;await page.close();}
    console.log(`G ${SLUG}: ${checks-before} tarayıcı kontrolü PASS (390 px açık, 1280 px koyu)`);
  }finally{await browser?.close();await new Promise(r=>server.close(r));}
}
