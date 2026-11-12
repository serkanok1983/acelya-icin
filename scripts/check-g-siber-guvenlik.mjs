#!/usr/bin/env node
// G: siber-guvenlik.html — bağımsız çekirdek denetimleri (+ --browser ile arayüz denetimleri).
// Dayanaklar sayfanın kendi formüllerini yinelemez: yayımlanmış vektörler (RFC 6234, RFC 4231, RFC 7914 §11),
// Node.js crypto, BigInt aritmetiği, kaba kuvvet sayımı ve ayrı yazılmış bir Türk alfabesi uygulaması.
import fs from 'node:fs';
import vm from 'node:vm';
import crypto from 'node:crypto';
import assert from 'node:assert/strict';
import { canvasInk, canvasInkAll, assertCanvasDrawn } from './lib/canvas-check.mjs';
const html=fs.readFileSync(new URL('../siber-guvenlik.html',import.meta.url),'utf8');
const source=html.split('/* KERNEL-BEGIN */')[1]?.split('/* KERNEL-END */')[0];
assert(source,'KERNEL-BEGIN / KERNEL-END işaretleri gerekli');
const context={};vm.createContext(context);vm.runInContext(source+';globalThis.K=SiberCore;',context);
const K=context.K,F=K.fmt;let checks=0;
const ok=(cond,msg)=>{assert(cond,msg);checks++;};
const plain=v=>v!==null&&typeof v==='object'?JSON.parse(JSON.stringify(v)):v; // vm bağlamından gelen dizileri bu bölgeye taşı
const eq=(a,b,msg)=>{assert.deepEqual(plain(a),plain(b),msg||'eşit değil');checks++;};
const near=(a,b,tol,msg)=>{assert(Math.abs(a-b)<=tol,`${msg||''} ${a} ≠ ${b} (±${tol})`);checks++;};
const rnd=(()=>{let s=20261111;return()=>{s=(Math.imul(s,1664525)+1013904223)>>>0;return s/4294967296;};})();
const bytes=n=>Uint8Array.from({length:n},()=>Math.floor(rnd()*256));
const buf=u8=>Buffer.from(u8);

/* --- çekirdek donmuş ve salt okunur --- */
ok(Object.isFrozen(K)&&Object.isFrozen(K.fmt)&&Object.isFrozen(K.REF)&&Object.isFrozen(K.PRESETS));

/* --- 1. SHA-256: yayımlanmış vektörler ve node:crypto --- */
const sha=s=>K.hex(K.sha256(typeof s==='string'?K.utf8(s):s));
eq(sha('abc'),'ba7816bf8f01cfea414140de5dae2223b00361a396177a9cb410ff61f20015ad'); // RFC 6234 TEST1
eq(sha('abcdbcdecdefdefgefghfghighijhijkijkljklmklmnlmnomnopnopq'),'248d6a61d20638b8e5c026930c3e6039a33ce45964ff2167f6ecedd419db06c1'); // RFC 6234 TEST2_1
for(let n=0;n<=200;n++){const m=bytes(n);eq(sha(m),crypto.createHash('sha256').update(buf(m)).digest('hex'),'uzunluk '+n);}
for(const n of[1000,4096,65537]){const m=bytes(n);eq(sha(m),crypto.createHash('sha256').update(buf(m)).digest('hex'));}
{const m=new Uint8Array(1e6).fill(97);eq(sha(m),crypto.createHash('sha256').update(buf(m)).digest('hex'));}
for(const s of['','ğüşıöç İIiı','Açelya\'nın Yeri','𝛑 ≈ 3.14159','😀']){eq(K.hex(K.utf8(s)),Buffer.from(s,'utf8').toString('hex'));eq(sha(s),crypto.createHash('sha256').update(s,'utf8').digest('hex'));}

/* --- 2. HMAC-SHA-256: RFC 4231 ve node:crypto --- */
eq(K.hex(K.hmac(new Uint8Array(20).fill(0x0b),K.utf8('Hi There'))),'b0344c61d8db38535ca8afceaf0bf12b881dc200c9833da726e9376c2e32cff7');
eq(K.hex(K.hmac(K.utf8('Jefe'),K.utf8('what do ya want for nothing?'))),'5bdcc146bf60754e6a042426089575c75a003f089d2739839dec58b964ec3843');
for(const kl of[0,1,31,32,63,64,65,100,131])for(const ml of[0,1,55,56,64,119,300]){const k=bytes(kl),m=bytes(ml);eq(K.hex(K.hmac(k,m)),crypto.createHmac('sha256',buf(k)).update(buf(m)).digest('hex'),`hmac ${kl}/${ml}`);}

/* --- 3. PBKDF2-HMAC-SHA-256: RFC 7914 §11 (ilk 32 bayt = ilk blok) ve node:crypto --- */
eq(K.hex(K.pbkdf2(K.utf8('passwd'),K.utf8('salt'),1)),'55ac046e56e3089fec1691c22544b605f94185216dde0465e68b9d57c20dacbc');
eq(K.hex(K.pbkdf2(K.utf8('Password'),K.utf8('NaCl'),80000)),'4ddcd8f60b98be21830cee5ef22701f9641a4418d04c0414aeff08876b34ab56');
for(const c of[1,2,3,10,257,1000]){const p=bytes(1+Math.floor(rnd()*40)),s=bytes(Math.floor(rnd()*24));eq(K.hex(K.pbkdf2(p,s,c)),crypto.pbkdf2Sync(buf(p),buf(s),c,32,'sha256').toString('hex'),'pbkdf2 c='+c);}
for(const c of[1,2,5,10,100,1000,5000]){const before=K.compressionCount();K.pbkdf2(K.utf8('ölçüm parolası'),K.saltFor(1,0),c);eq(K.compressionCount()-before,2*c+2,'sıkıştırma sayısı c='+c);}
assert.throws(()=>K.pbkdf2(K.utf8('a'),K.utf8('b'),0));checks++;
eq(K.storedValue('limonata',K.saltFor(1,0),1000),crypto.pbkdf2Sync('limonata',buf(K.saltFor(1,0)),1000,32,'sha256').toString('hex'));
ok(K.storedValue('limonata',K.saltFor(1,0),1000)!==K.storedValue('limonata',K.saltFor(1,1),1000),'farklı tuz farklı kayıt');
eq(K.storedValue('limonata',new Uint8Array(0),1000),K.storedValue('limonata',new Uint8Array(0),1000));
{const salts=new Set();for(let seed=1;seed<=20;seed++)for(let u=0;u<4;u++)salts.add(K.hex(K.saltFor(seed,u)));eq(salts.size,80,'tuzlar ayrık');}
// süre doğrusal ölçekleniyor mu (kaba, cihazdan bağımsız sınır): c 100 kat artınca süre 50–200 kat artmalı
{const time=c=>{const p=K.utf8('x'),s=K.saltFor(1,0);let best=Infinity;for(let r=0;r<3;r++){let n=0;const t0=performance.now();let t1;do{K.pbkdf2(p,s,c);n++;t1=performance.now();}while(t1-t0<30);best=Math.min(best,(t1-t0)/n);}return best;};time(200);const r=time(20000)/time(200);ok(r>50&&r<200,'PBKDF2 süre oranı '+r.toFixed(1));}

/* --- 4. Türk alfabesi: bağımsız uygulama ile karşılaştırma --- */
const UP=[...'ABCÇDEFGĞHIİJKLMNOÖPRSŞTUÜVYZ'];
eq(K.M,29);eq(K.UP,UP.join(''));eq([...K.LO].map(c=>c.toLocaleUpperCase('tr-TR')).join(''),K.UP);eq([...K.UP].map(c=>c.toLocaleLowerCase('tr-TR')).join(''),K.LO);
function refShift(text,fn){let pos=0,out='';for(const ch of text){const up=ch.toLocaleUpperCase('tr-TR'),i=UP.indexOf(up);if(i<0||up.length!==1||/[^\p{L}]/u.test(ch)){out+=ch;continue;}const j=((fn(i,pos++)%29)+29)%29,isUp=ch===up;out+=isUp?UP[j]:UP[j].toLocaleLowerCase('tr-TR');}return out;}
const pool=[...'abcçdefgğhıijklmnoöprsştuüvyzABCÇDEFGĞHIİJKLMNOÖPRSŞTUÜVYZ qwxQWX0123456789.,;!?\'-\n'];
for(let t=0;t<300;t++){let s='';const L=Math.floor(rnd()*80);for(let i=0;i<L;i++)s+=pool[Math.floor(rnd()*pool.length)];const k=Math.floor(rnd()*60)-15;
 eq(K.caesar(s,k),refShift(s,i=>i+k));eq(K.atbash(s),refShift(s,i=>28-i));eq(K.atbash(K.atbash(s)),s);eq(K.caesar(K.caesar(s,k),-k),s);
 const key=['LİMON','ığdır','Çay','ŞİİR','Z','qLxİ9m'][t%6],kidx=[...key].map(c=>UP.indexOf(c.toLocaleUpperCase('tr-TR'))).filter(i=>i>=0);
 eq(K.vigenere(s,key),refShift(s,(i,p)=>i+kidx[p%kidx.length]));eq(K.vigenere(K.vigenere(s,key),key,true),s);}
eq(K.caesar('Iıİi',1),'İiJj');eq(K.caesar('Hh',1),'Iı');eq(K.caesar('Zz',1),'Aa');eq(K.caesar('Aa',-1),'Zz');eq(K.caesar('QWX qwx 2026!',7),'QWX qwx 2026!');
eq(K.atbash('AaZzIıİi'),'ZzAaÖöOo');eq(K.caesar('Kağıt',29),'Kağıt');eq(K.caesar('Kağıt',0),'Kağıt');
eq(K.vigenere('AAAAA','ABC'),'ABCAB');eq(K.vigenere('ıiIİ','B'),'ijİJ');eq(K.keyString(K.lettersOf('lİmon')),'LİMON');
assert.throws(()=>K.vigenere('abc',''));assert.throws(()=>K.vigenere('abc','123 qwx'));checks+=2;
eq(K.lettersOf('a1b2c3 qwx ç',2),[0,1]);eq(K.takeLetters('a, b! c?',2),'a, b! ');eq(K.takeLetters('abc',Infinity),'abc');eq(K.takeLetters('abc',0),'');
ok(![...K.REF_TEXT,...Object.values(K.PRESETS).map(p=>p.text).join('')].some(c=>/[̀-ͯ]/.test(c)),'birleşik işaret yok');

/* --- 5. Sıklık, χ², IC --- */
{const idx=K.lettersOf(K.REF_TEXT);eq(idx.length,K.REF_N);ok(K.REF_N>=2000);near(K.REF.reduce((a,b)=>a+b,0),1,1e-12);ok(Math.min(...K.REF)>0,'her harf örnekte var');
 const manual=new Array(29).fill(0);for(const ch of K.REF_TEXT){const i=UP.indexOf(ch.toLocaleUpperCase('tr-TR'));if(i>=0&&/\p{L}/u.test(ch))manual[i]++;}eq(K.counts(idx),manual);
 near(K.LANG_IC,manual.reduce((s,c)=>s+(c/K.REF_N)**2,0),1e-15);ok(K.LANG_IC>0.05&&K.LANG_IC<0.07);
 ok(K.REF[0]===Math.max(...K.REF),'örnekte en sık harf A');}
{const idx=K.lettersOf(K.PRESETS.fener.text),n=idx.length;let same=0;for(let i=0;i<n;i++)for(let j=i+1;j<n;j++)if(idx[i]===idx[j])same++;near(K.ic(K.counts(idx),n),same/(n*(n-1)/2),1e-14,'IC kaba kuvvet');
 for(const k of[1,7,28])near(K.ic(K.counts(K.lettersOf(K.caesar(K.PRESETS.fener.text,k))),n),K.ic(K.counts(idx),n),1e-15,'IC kaydırmayla değişmez');
 near(K.ic(K.counts(K.lettersOf(K.atbash(K.PRESETS.fener.text))),n),K.ic(K.counts(idx),n),1e-15);
 eq(K.ic([1,...new Array(28).fill(0)],1),null);eq(K.ic(new Array(29).fill(0),0),null);
 const uni=Array.from({length:40000},()=>Math.floor(rnd()*29));near(K.ic(K.counts(uni),uni.length),1/29,0.0006,'rastgele metnin IC değeri');
 const c=K.counts(idx);let chi=0;for(let j=0;j<29;j++)chi+=(c[j]-n*K.REF[j])**2/(n*K.REF[j]);near(K.chi2(c,n),chi,1e-9);near(K.caesarScan(c,n).chi[0],chi,1e-9);}
for(const p of Object.values(K.PRESETS)){ok(K.lettersOf(p.text).length>=700);for(const L of[50,100,200,Infinity])for(let k=0;k<29;k++){const idx=K.lettersOf(K.caesar(K.takeLetters(p.text,L),k)),s=K.caesarScan(K.counts(idx),idx.length);eq(s.best,k,`${p.name} L=${L} k=${k}`);ok(s.second!==s.best&&s.chi[s.second]>=s.chi[s.best]);}}

/* --- 6. Vigenère: anahtar uzunluğu ve anahtar, yalnız şifreli metinden --- */
const KEYS=['AY','SU','GÖL','KUŞ','ELMA','KEDİ','LİMON','KALEM','ÇİLEK','DEFTER','GÜNEŞ','PENCERE','YILDIZ','ÇİÇEKLER','KÜTÜPHANE','GÖKYÜZÜNDE','ŞEMSİYE','ZEYTİN','MAVİ','ORMAN','ÖRDEK','VAPUR'];
for(const p of Object.values(K.PRESETS))for(const key of KEYS){const ct=K.vigenere(p.text,key),idx=K.lettersOf(ct),e=K.estimateLength(idx);eq(e.m,key.length,`${p.name}/${key} uzunluk`);eq(K.keyString(K.breakVigenere(idx,e.m)),key);eq(K.vigenere(ct,K.keyString(K.breakVigenere(idx,e.m)),true),p.text);
 ok(K.ic(K.counts(idx),idx.length)<e.threshold||key.length===1);}
{const idx=K.lettersOf(K.vigenere(K.PRESETS.fener.text,'LİMON')),ka=K.kasiski(idx);eq(ka.m,5);ok(ka.repeats>=20);const r5=ka.rows.find(r=>r.m===5);ok(r5.share>0.8);
 // Kasiski uzaklıklarını bağımsız say
 const txt=idx.join(','),seen=new Map();let rep=0,div=0;for(let i=0;i+3<=idx.length;i++){const g=idx.slice(i,i+3).join('.');if(seen.has(g)){rep++;if((i-seen.get(g))%5===0)div++;}seen.set(g,i);}eq(ka.repeats,rep);eq(r5.divisible,div);ok(txt.length>0);
 const rows=K.icByLength(idx,12);eq(rows.length,12);eq(rows[4].perColumn,Math.floor(idx.length/5));near(rows[0].ic,K.ic(K.counts(idx),idx.length),1e-15);}
{const short=K.lettersOf(K.vigenere(K.takeLetters(K.PRESETS.fener.text,25),'LİMON'));eq(K.estimateLength(short).m,null,'kısa metinde tahmin yok');eq(K.kasiski(short).m,null);eq(K.estimateLength([]).m,null);}

/* --- 7. Sayılar kuramı: BigInt ve kaba kuvvet --- */
const bigpow=(b,e,m)=>{let r=1n,x=BigInt(b)%BigInt(m),k=BigInt(e);while(k>0n){if(k&1n)r=r*x%BigInt(m);x=x*x%BigInt(m);k>>=1n;}return Number(r);};
const DH=[23,47,101,251,509,1019,2039,4093,8191,16381,32749,65521];
for(const p of DH){ok(K.isPrime(p));for(let t=0;t<40;t++){const b=1+Math.floor(rnd()*(p-1)),e=Math.floor(rnd()*p),tr=K.powTrace(b,e,p);eq(K.modpow(b,e,p),bigpow(b,e,p));eq(tr.value,bigpow(b,e,p));
 if(e>0){eq(tr.total,Math.floor(Math.log2(e))+e.toString(2).replace(/0/g,'').length-1,'kare-çarp sayısı');eq(tr.total,K.sqmFormula(e));eq(tr.squares,e.toString(2).length-1);eq(tr.steps.length,tr.total+1);}}}
eq(K.powTrace(5,0,23).total,0);eq(K.powTrace(5,0,23).value,1);eq(K.powTrace(5,1,23).total,0);eq(K.powTrace(5,6,23).value,8);eq(K.powTrace(5,6,23).total,3);eq(K.powTrace(2,65535,65521).total,30);
assert.throws(()=>K.modpow(2,3,2**26));assert.throws(()=>K.modpow(2,3,1));checks+=2;
for(const p of DH.filter(p=>p<=4093)){const roots=K.primitiveRoots(p,5);eq(roots.length,5);
 for(let g=2;g<Math.min(p,40);g++){const seen=new Set();let v=1;do{v=v*g%p;seen.add(v);}while(v!==1);eq(K.orderOf(g,p),seen.size,`mertebe p=${p} g=${g}`);eq(roots.includes(g),seen.size===p-1&&g<=roots[4]);}}
for(const p of DH){const g=K.primitiveRoots(p,1)[0];eq(K.orderOf(g,p),p-1);for(const f of K.primeFactors(p-1))ok(bigpow(g,(p-1)/f,p)!==1,'ilkel kök ölçütü');}
eq(K.primitiveRoots(23,5),[5,7,10,11,14]);eq(K.orderOf(2,23),11);eq(K.primeFactors(3120),[2,3,5,13]);
for(const[p,g]of[[23,5],[101,2],[1019,2]]){let sum=0;for(let a=1;a<p;a++){const d=K.dlog(g,K.modpow(g,a,p),p);eq(d.x,a);eq(d.steps,a);sum+=d.steps;}eq(sum/(p-1),p/2);const e=K.eveExperiment(p,g,null,1);eq(e.mean,p/2);eq(e.theory,p/2);eq(e.exhaustive,true);eq(e.se,null);}
{const e=K.eveExperiment(23,2,null,1);eq(e.order,11);eq(e.mean,6);eq(e.theory,6);eq(K.dlog(2,5,23).x,null,'5, 2\'nin kuvveti değil');}
{const e=K.eveExperiment(65521,17,400,1);eq(e.count,400);ok(Math.abs(e.mean-e.theory)<4*e.se,'örneklenen ortalama 4 standart hata içinde');near(e.se,65520/Math.sqrt(12*400),150);}
// DH: ortak sır eşitliği
for(let t=0;t<300;t++){const p=DH[t%DH.length],g=K.primitiveRoots(p,1)[0],a=1+Math.floor(rnd()*(p-1)),b=1+Math.floor(rnd()*(p-1));eq(K.modpow(K.modpow(g,b,p),a,p),K.modpow(K.modpow(g,a,p),b,p));eq(K.modpow(K.modpow(g,a,p),b,p),bigpow(g,BigInt(a)*BigInt(b),p));}
eq([K.modpow(5,6,23),K.modpow(5,15,23),K.modpow(19,6,23),K.modpow(8,15,23)],[8,19,2,2]);
// Öklid ve RSA
for(let t=0;t<500;t++){const a=1+Math.floor(rnd()*60000),b=1+Math.floor(rnd()*60000),r=K.egcd(a,b);eq(r.x*a+r.y*b,r.g);ok(a%r.g===0&&b%r.g===0);for(const row of r.rows)eq(row.s*a+row.t*b,row.r);const inv=K.modinv(a,b);if(r.g===1&&b>1)eq(inv*a%b,1%b);else if(r.g!==1)eq(inv,null);}
{const key=K.rsaKey(61,53,17);eq([key.ok,key.n,key.phi,key.d],[true,3233,3120,2753]);eq(K.modpow(65,17,3233),2790);eq(K.modpow(2790,2753,3233),65);
 for(let m=0;m<3233;m++)eq(K.modpow(K.modpow(m,17,3233),2753,3233),m);
 eq(K.modpow(K.modpow(2,17,3233)*2790%3233,2753,3233),130,'çarpımsallık');}
const RP=[];for(let n=11;n<=251;n++)if(K.isPrime(n))RP.push(n);eq(RP.length,50);
for(let t=0;t<200;t++){const p=RP[Math.floor(rnd()*50)],q=RP[Math.floor(rnd()*50)];if(p===q){eq(K.rsaKey(p,q,3).ok,false);continue;}const phi=(p-1)*(q-1),es=K.validExponents(phi,10);ok(es.length===10);
 for(const e of es){const key=K.rsaKey(p,q,e);ok(key.ok);eq(Number(BigInt(e)*BigInt(key.d)%BigInt(phi)),1);const m=Math.floor(rnd()*key.n);eq(K.modpow(K.modpow(m,e,key.n),key.d,key.n),m);
  const h=K.hashMod(K.utf8('ileti '+t),key.n);eq(h,Number(BigInt('0x'+crypto.createHash('sha256').update('ileti '+t).digest('hex'))%BigInt(key.n)));eq(K.modpow(K.modpow(h,key.d,key.n),e,key.n),h,'imza doğrulanır');}
 for(let e=3;e<40;e+=2)if(!es.includes(e)&&e<es[9])eq(K.rsaKey(p,q,e).ok,false);}
eq(K.rsaKey(61,53,3).ok,false);eq(K.rsaKey(61,53,1).ok,false);eq(K.rsaKey(60,53,7).ok,false);eq(K.rsaKey(61,61,7).ok,false);

/* --- 8. Çığ etkisi --- */
{const m=K.utf8('Açelya\'nın Yeri');eq(m.length,17);for(const i of[0,7,8,77,135]){const f=K.flipBit(m,i);const nb=buf(m);nb[i>>3]^=0x80>>(i&7);eq(K.hex(f),nb.toString('hex'));
  const a=crypto.createHash('sha256').update(buf(m)).digest(),b=crypto.createHash('sha256').update(nb).digest();let d=0;for(let j=0;j<32;j++)d+=(a[j]^b[j]).toString(2).replace(/0/g,'').length;eq(K.bitDiff(K.sha256(m),K.sha256(f)),d);}
 eq(K.bitDiff(K.sha256(m),K.sha256(K.flipBit(m,0))),124);
 for(const[trials,seed]of[[1000,1],[1000,2],[5000,3],[200,4]]){const e=K.avalancheExperiment(trials,seed);eq(e.hist.reduce((a,b)=>a+b,0),trials);near(e.mean,128,5*8/Math.sqrt(trials),'çığ ortalaması');near(e.sd,8,trials>=1000?0.6:1.5,'çığ standart sapması');ok(e.min>=90&&e.max<=166);near(e.hist.reduce((s,c,k)=>s+c*k,0)/trials,e.mean,1e-9);}
 near(K.avalancheExperiment(1000,1).mean,128.26,0.005);
 near(K.BINOM256.reduce((a,b)=>a+b,0),1,1e-12);near(K.BINOM256.reduce((s,p,k)=>s+p*k,0),128,1e-9);near(Math.sqrt(K.BINOM256.reduce((s,p,k)=>s+p*(k-128)**2,0)),8,1e-9);}

/* --- 9. Doğum günü sınırı --- */
{const exactRational=N=>{let sum=0,term=1;for(let k=1;k<=N;k++){term*=(N-k+1)/N;sum+=term;}return 1+sum;}; // 1 + Q(N), Ramanujan'ın Q işlevi
 eq(K.birthdayExact(1),2);eq(K.birthdayExact(2),2.5);near(K.birthdayExact(365),24.6166,0.0005,'365 gün');
 for(const N of[4,16,256,4096,65536,2**20,2**24]){near(K.birthdayExact(N),exactRational(N),1e-9*Math.sqrt(N)+1e-9);near(K.birthdayExact(N)-K.birthdayApprox(N),2/3,N>=256?0.03:0.2,'kesin − yaklaşık ≈ 2/3');}
 const s=K.birthdaySurvival(256,80);eq(s[0],1);eq(s[1],1);near(s[2],255/256,1e-15);near(s.reduce((a,b)=>a+b,0),K.birthdayExact(256),0.01);
 for(const[k,runs,seed]of[[8,400,1],[12,300,2],[16,200,1],[20,60,3]]){const e=K.birthdayExperiment(k,runs,seed);eq(e.trials.length,runs);eq(e.hashes,e.trials.reduce((a,b)=>a+b,0));ok(Math.abs(e.mean-K.birthdayExact(2**k))<4*e.se,`k=${k} ortalama ${e.mean}`);
  const x=e.example;ok(x.first!==x.second);const h=m=>BigInt('0x'+crypto.createHash('sha256').update(m).digest('hex'))>>BigInt(256-k);eq(h(x.first),h(x.second),'çakışma node ile doğrulandı');eq(Number(h(x.first)),x.value);eq(x.second.endsWith('/'+x.trials),true);ok(Math.min(...e.trials)>=2);}
 near(K.birthdayExperiment(16,200,1).mean,330.765,1e-9);
 eq(K.truncate(Uint8Array.from([0xab,0xcd,0xef,0x12]),8),0xab);eq(K.truncate(Uint8Array.from([0xab,0xcd,0xef,0x12]),12),0xabc);eq(K.truncate(Uint8Array.from([0xab,0xcd,0xef,0x12]),32),0xabcdef12);
 near(Math.log2(Math.sqrt(Math.PI*2**256/2)),128.33,0.01);near(Math.sqrt(Math.PI*2**256/2)/1e38,4.26,0.01);}

/* --- 10. PIN taraması ve sahte etiket --- */
for(const[d,trials,seed]of[[1,400,1],[2,400,2],[3,100,1],[3,300,5]]){const e=K.pinExperiment(d,trials,seed),N=10**d;eq(e.theory,(N+1)/2);eq(e.hashes,e.tries.reduce((a,b)=>a+b,0)+trials);ok(e.tries.every(t=>t>=1&&t<=N));near(e.mean,e.theory,4*N/Math.sqrt(12*trials),'PIN ortalaması');}
near(K.pinExperiment(3,100,1).mean,488.18,1e-9);
for(const bits of[4,8,12,16])for(const seed of[1,2]){const target=Math.floor(rnd()*2**bits),f=K.forgeExperiment(bits,100000,seed,target);eq(f.expected,100000/2**bits);near(f.hits,f.expected,5*Math.sqrt(f.expected)+1,'sahte etiket isabeti');}
{const tag=K.hmac(K.utf8('yalnız ikimizin bildiği anahtar'),K.utf8('Açelya\'ya 100 TL öde')),tag2=K.hmac(K.utf8('yalnız ikimizin bildiği anahtar'),K.utf8('Açelya\'ya 900 TL öde'));ok(K.hex(tag)!==K.hex(tag2));ok(K.bitDiff(tag,tag2)>90);}

/* --- 11. Sayı ve süre biçimi --- */
const Y=K.YEAR;eq(Y,365.25*86400);
eq(F.duration(15*Y),'15.0 yıl');eq(F.duration(30*Y),'30.0 yıl');eq(F.duration(49*Y),'49.0 yıl');eq(F.duration(999*Y),'999 yıl');eq(F.duration(1000*Y),'1.00 bin yıl');eq(F.duration(5000*Y),'5.00 bin yıl');eq(F.duration(2.6e5*Y),'260 bin yıl');eq(F.duration(5e5*Y),'500 bin yıl');
eq(F.duration(1e6*Y),'1.00 milyon yıl');eq(F.duration(2.5e9*Y),'2.50 milyar yıl');eq(F.duration(1e12*Y),'1.00 × 10¹² yıl');eq(F.duration(3e25),'9.51 × 10¹⁷ yıl');
eq(F.duration(0),'0 s');eq(F.duration(1e-3),'1.00 ms');eq(F.duration(0.0010004),'1.00 ms');eq(F.duration(0.9996),'1.00 s');eq(F.duration(59.999),'1.00 dk');eq(F.duration(60),'1.00 dk');eq(F.duration(3599.99),'1.00 saat');eq(F.duration(86400),'1.00 gün');eq(F.duration(Y),'1.00 yıl');eq(F.duration(4e-6),'4.00 µs');eq(F.duration(2.5e-9),'2.50 ns');eq(F.duration(1e-14),'1.00 × 10⁻¹⁴ s');eq(F.duration(NaN),'—');eq(F.duration(-1),'—');eq(F.duration(Infinity),'sonsuz');
for(let lg=-12;lg<=40;lg+=0.0137){const s=F.duration(10**lg),v=parseFloat(s);ok(v>=1&&v<1000&&!/^0(\.0+)? /.test(s)&&!s.includes('NaN'),`süre ${lg.toFixed(3)}: ${s}`);}
eq(F.durationLog(400-Math.log10(1)),F.pow10(400-Math.log10(Y))+' yıl');eq(F.durationLog(Math.log10(15*Y)),'15.0 yıl');
eq(F.num(3233),'3233');eq(F.num(9999),'9999');eq(F.num(10000),'10 000');eq(F.num(1234567),'1 234 567');eq(F.num(-183),'−183');eq(F.num(0.03448,4),'0.0345');eq(F.num(-0.00001,2),'0.00');eq(F.num(NaN),'—');
eq(F.pow10(4),'10 000');eq(F.pow10(10*Math.log10(62)),'8.39 × 10¹⁷');eq(F.pow10(38.53),'3.39 × 10³⁸');eq(F.pow10(11.99999),'1.00 × 10¹²');eq(F.sci(390.625,1),'3.9 × 10²');eq(F.sci(9.999e5,1),'1.0 × 10⁶');eq(F.sci(0),'0');
eq(F.sig(128.26),'128');eq(F.sig(11.5),'11.5');eq(F.sig(9.999),'10.0');eq(F.sig(1.002),'1.00');eq(F.sig(0.0345),'0.0345');eq(F.sig(0),'0');
eq(F.pct(488.18,500.5),'−%2.5');eq(F.pct(128.26,128,2),'+%0.20');eq(F.pct(1,1),'%0.0');eq(F.pct(1,0),'—');
near(10*Math.log2(62),59.54,0.005);near(4*Math.log2(10),13.29,0.005);near(5*Math.log2(7776),64.62,0.005);near(62**10/1e9/Y,26.6,0.05);

/* --- 12. Sayfa: zararlı içerik ve yapı denetimi --- */
ok(!/\bOR\s+1\s*=\s*1|UNION\s+SELECT|<script>alert|DROP\s+TABLE|';\s*--/i.test(html),'saldırı yükü yok');
ok(!/[̀-ͯ]/.test(html),'sayfada birleşik işaret yok');ok(!/\p{Extended_Pictographic}/u.test(html.replace(/[©®™↔↕]/g,'')),'emoji yok');
ok(!/https?:\/\/[^"']+\.(js|css|woff2?)["']/.test(html),'dış betik/yazı tipi yok');ok(html.includes('data-page="siber-guvenlik"'));
for(const id of(html.match(/<(?:input|select|textarea)[^>]*\bid="([^"]+)"/g)||[]).map(t=>t.match(/id="([^"]+)"/)[1]))ok(html.includes(`for="${id}"`),'etiketsiz denetim: '+id);
console.log(`G siber-guvenlik: ${checks.toLocaleString('tr-TR')} bağımsız çekirdek denetimi PASS`);

if(process.argv.includes('--browser')){
 const{chromium}=await import('playwright');const{createServer}=await import('node:http');const{join,extname}=await import('node:path');const{fileURLToPath}=await import('node:url');const root=fileURLToPath(new URL('../',import.meta.url));
 const server=createServer((req,res)=>{const file=join(root,decodeURIComponent(new URL(req.url,'http://localhost').pathname));if(!file.startsWith(root)||!fs.existsSync(file)||fs.statSync(file).isDirectory()){res.writeHead(404).end();return;}res.setHeader('Content-Type',({'.html':'text/html; charset=utf-8','.js':'text/javascript; charset=utf-8','.css':'text/css; charset=utf-8'})[extname(file)]||'application/octet-stream');res.end(fs.readFileSync(file));});
 await new Promise(r=>server.listen(0,'127.0.0.1',r));let browser;const before=checks;
 try{browser=await chromium.launch();
  for(const[width,theme]of[[390,'light'],[1280,'dark']]){
   const page=await browser.newPage({viewport:{width,height:900},deviceScaleFactor:width===390?2:1});await page.addInitScript(t=>{localStorage.setItem('acelya-theme',t);localStorage.setItem('acelya-sound-muted','1');},theme);page.setDefaultTimeout(8000);
   const errors=[];page.on('pageerror',e=>errors.push(e.message));page.on('console',m=>{if(m.type()==='error')errors.push(m.text());});
   await page.goto(`http://127.0.0.1:${server.address().port}/siber-guvenlik.html`,{waitUntil:'load'});
   const click=id=>page.locator('#'+id).click(),read=async id=>(await page.locator('#'+id).textContent()).replace(/ /g,' '),val=id=>page.locator('#'+id).inputValue();
   const range=(id,v)=>page.locator('#'+id).evaluate((e,v)=>{e.value=v;e.dispatchEvent(new Event('input',{bubbles:true}));e.dispatchEvent(new Event('change',{bubbles:true}));},v);
   const pick=(id,v)=>page.locator('#'+id).selectOption(v),type=(id,v)=>page.locator('#'+id).fill(v);
   const has=async(id,text)=>{const t=await read(id);assert(t.includes(text),`${id}: “${t}” içinde “${text}” yok`);checks++;};
   const lacks=async(id,text)=>{const t=await read(id);assert(!t.includes(text),`${id}: “${t}” içinde “${text}” olmamalı`);checks++;};
   const noOverflow=async where=>{const o=await page.evaluate(()=>document.documentElement.scrollWidth-window.innerWidth);assert(o<=0,`${width}px ${where}: yatay taşma ${o}px`);checks++;};
   const painted=async id=>{assertCanvasDrawn(await canvasInk(page,'#'+id),{minDistinct:3,label:id});checks++;};
   eq(await page.evaluate(()=>Object.isFrozen(window.SiberCore)),true);eq(await page.evaluate(()=>document.body.dataset.page),'siber-guvenlik');
   eq(await page.evaluate(()=>[...document.querySelectorAll('input,select,textarea')].filter(e=>!e.labels||!e.labels.length).map(e=>e.id)),[]);
   eq(await page.evaluate(()=>[...document.querySelectorAll('main canvas')].filter(c=>c.getAttribute('role')!=='img'||!c.getAttribute('aria-label')).length),0);
   // --- 01 klasik
   await has('kN','766');await has('kFound','k = 3');await has('kTrue','k = 3');await has('kRecov','766 / 766');await has('kIC','0.0594');await has('kICrand','0.0345');await has('kIClang','0.0577');await has('kMargin','58.4');await painted('freqCanvas');await painted('scanCanvas');await noOverflow('klasik');
   ok((await val('cipherOut')).startsWith('Hğpğtlp'));ok((await val('attackOut')).startsWith('Fenerin bekçisi'));
   for(const k of[0,17,28]){await range('shift',k);await has('kFound','k = '+k);await has('kRecov','766 / 766');}
   await range('shift',3);await pick('useLen','25');await has('kN','25');await has('kFound','k = 3');await pick('useLen','0');
   await pick('cipherSel','atbash');await has('klStatus','anahtarı yoktur');await has('kRecov','766 / 766');eq(await page.locator('#shiftField').isHidden(),true);
   await pick('cipherSel','vigenere');await has('kFound','m = 5');await has('kMargin','LİMON');await has('kTrue','LİMON · 5');await has('kKas','m = 5');await has('kRecov','766 / 766');await has('kIC','0.0368');eq(await page.locator('#kasWrap').isVisible(),true);eq(await page.locator('#kasRows tr').count(),12);await noOverflow('vigenere');
   await type('vigKey','kütüphane');await has('kFound','m = 9');await has('kMargin','KÜTÜPHANE');await type('vigKey','ığdır');await has('kTrue','IĞDIR · 5');await has('kMargin','IĞDIR');
   await type('vigKey','123');await has('klStatus','Anahtar yok');await has('kFound','—');await has('klMsg','en az bir alfabe harfi');await type('vigKey','LqİxMwON');await has('klMsg','LİMON');await has('kFound','m = 5');
   await pick('useLen','100');await has('klStatus','kusurlu');await has('kRecov','60 / 100');await has('kMargin','UİCON');
   await pick('useLen','25');await has('kFound','Bulunamadı');await has('klStatus','bulunamadı');await has('kRecov','Çözüm yok');await pick('useLen','0');
   await pick('textPreset','ari');await has('kFound','m = 5');await has('kN','714');await type('plainText','QWX 123 !?');eq(await val('textPreset'),'custom');await has('kN','0');await has('kIC','Tanımsız');await has('klStatus','alfabe harfi yok');
   await type('plainText','Iıİi');await pick('cipherSel','sezar');await range('shift',1);eq(await val('cipherOut'),'İiJj');await has('kIC','0.3333');await type('plainText','a');await has('kIC','Tanımsız');
   await click('klReset');await has('kFound','k = 3');await has('kN','766');eq(await val('cipherSel'),'sezar');eq(await val('vigKey'),'LİMON');eq(await val('textPreset'),'fener');eq(await val('useLen'),'0');
   // --- 02 parola
   await click('tab-parola');await has('pwH','59.5 bit');await has('pwSpace','8.39 × 10¹⁷');await has('pwFull','26.6 yıl');await has('pwHalf','13.3 yıl');await has('pwBitsChar','5.95 bit');await has('pwLenOut','10 karakter');await has('pwRateOut','10⁹');await painted('pwChart');await painted('kdfChart');await noOverflow('parola');
   await has('kdfComp','2002');await has('kdfCompT','2002');await has('kdfDiff','Dayanak');await lacks('kdfTime','—');await has('saltDistinct','4 / 4');await has('saltPwCount','3 / 4');await has('saltSame','Hayır');
   await has('pinTheory','500.5');await has('pinMean','488.2');await has('pinSpace','1000');await has('pinDiff','−%2.5');
   await click('pwPin');await has('pwH','13.3 bit');await has('pwSpace','10 000');await has('pwFull','10.0 µs');await has('pwStatus','bir günden kısa');eq(await val('pwLen'),'4');eq(await val('pwSet'),'10');
   await click('pwLower');await has('pwH','37.6 bit');await has('pwFull','3.48 dk');await click('pwMixed');await has('pwH','78.8 bit');await has('pwFull','17.1 milyon yıl');await click('pwWords');await has('pwH','64.6 bit');await has('pwLenOut','5 sözcük');await has('pwFull','901 yıl');
   await range('pwRate',0);await has('pwRateOut','1 tahmin/s');await has('pwFull','901 milyar yıl');await range('pwRate',15);await has('pwFull','7.90 saat');await range('pwLen',40);await has('pwH','517.0 bit');await lacks('pwFull','NaN');await lacks('pwFull','Infinity');await range('pwLen',1);await has('pwSpace','7776');
   for(const L of[1,7,13,24,40])for(const r of[0,6,12,15]){await range('pwLen',L);await range('pwRate',r);const t=await read('pwFull');ok(!/^0(\.0+)? /.test(t)&&!/NaN|undefined|Infinity/.test(t),'süre biçimi: '+t);}
   await range('kdfIter',0);await has('kdfComp','4');await has('kdfIterOut','c = 1');await has('kdfRatioT','0.00200');await range('kdfIter',12);await has('kdfComp','20 002');await has('kdfRatioT','9.99');
   {const r=parseFloat(await read('kdfRatio'));ok(r>5&&r<20,'ölçülen oran c=10000: '+r);}
   await range('kdfIter',15);await has('kdfComp','200 002');await has('kdfIterOut','c = 100 000');await click('kdfAll');await lacks('kdfTime','—');await range('kdfIter',9);
   await page.locator('#saltOn').uncheck();await has('saltDistinct','3 / 4');await has('saltSame','Evet');await has('saltStatus','harfi harfine aynı');{const rows=await page.locator('#saltRows tr td:last-child').allTextContents();eq(rows[0],rows[1]);ok(rows[0]!==rows[2]);}
   await page.locator('#saltOn').check();{const a=await page.locator('#saltRows').textContent();await click('saltNew');const b=await page.locator('#saltRows').textContent();ok(a!==b);}await has('saltDistinct','4 / 4');
   await type('saltPw','başka-parola');await has('saltPwCount','4 / 4');await has('saltSame','Aynı parolalı hesap yok');await type('saltPw','');await has('saltPwCount','4 / 4');await type('saltPw','<b>x</b>');eq(await page.locator('#saltRows b').count(),0);
   await range('pinDigits',1);await has('pinSpace','10');await has('pinTheory','5.5');await range('pinDigits',4);await has('pinSpace','10 000');await has('pinTheory','5000.5');await has('pinStatus','süre sınırı');await range('pinDigits',2);await pick('pinTrials','400');await has('pinStatus','400 rastgele PIN');{const a=await read('pinMean');await click('pinNew');ok(a!==await read('pinMean'));}
   await click('pwReset');await has('pwH','59.5 bit');await has('pinMean','488.2');await has('saltSame','Hayır');await has('kdfComp','2002');eq(await val('saltPw'),'limonata');eq(await page.locator('#saltOn').isChecked(),true);
   // --- 03 açık anahtar
   await click('tab-acik');await has('dhA','8');await has('dhB','19');await has('dhS','2');await has('dhS2','2');await has('dhEq','Evet');await has('dhOrd','22 = p − 1');await has('dhSqm','3');await has('dhSqmT','3');await has('dhNaive','5');await has('dhEve','6');await has('dhEveMean','11.5');await has('dhEveT','11.5');await painted('dhChart');await noOverflow('açık');
   eq(await page.locator('#sqmRows tr').count(),4);eq(await page.locator('#dhG option').count(),6);eq(await page.locator('#dhP option').count(),12);
   await range('dhSecA',22);await has('dhA','1');await has('dhStatus','A = 1 çıktı');await range('dhSecA',1);await has('dhA','5');await has('dhSqm','0');await has('dhSqmT','0');await has('dhEve','1');
   await pick('dhG','2');await has('dhOrd','11 < p − 1');await has('dhEveT','6.00');await has('dhEveMean','6.00');await range('dhSecA',17);await has('dhStatus','Dinleyicinin bulduğu üs 6');await has('dhEq','Evet');
   await pick('dhP','65521');eq(await page.locator('#dhSecA').getAttribute('max'),'65520');eq(await val('dhG'),'17');await range('dhSecA',65520);await has('dhA','1');await range('dhSecA',40000);await range('dhSecB',65519);await has('dhEq','Evet');await has('dhEve','40 000');await has('dhEveMean','±');await has('dhEveT','32 761');await has('dhSqm','19');await has('dhSqmT','19');
   await pick('dhP','23');eq(await val('dhSecA'),'22');eq(await val('dhG'),'5');
   await has('rsaN','3233');await has('rsaPhi','3120');await has('rsaD','2753');await has('rsaCheck','1');await has('rsaC','2790');await has('rsaBack','65');await has('rsaMall','130');await has('rsaMallT','130');await has('rsaStatus','İmza geçerli');
   eq(await read('rsaH'),await read('rsaVer'));eq(await read('rsaH'),await read('rsaRecvH'));
   await click('rsaTamper');eq(await val('rsaRecv'),"Toplantı saat 14.01'te");await has('rsaStatus','İmza geçersiz');ok((await read('rsaRecvH'))!==(await read('rsaVer')));await click('rsaSame');await has('rsaStatus','İmza geçerli');
   await range('rsaM',0);await has('rsaC','0');await has('rsaStatus','hiç gizlemez');await range('rsaM',3232);await has('rsaBack','3232');await has('rsaC','3232');
   await pick('rsaQ','61');for(const id of['rsaN','rsaD','rsaC','rsaSig'])await has(id,'Tanımsız');await has('rsaStatus','farklı olmalı');await pick('rsaQ','53');await has('rsaN','3233');
   await pick('rsaP','251');await pick('rsaQ','241');await has('rsaN','60 491');await has('rsaCheck','1');eq(await page.locator('#rsaM').getAttribute('max'),'60490');await range('rsaM',60490);await has('rsaBack','60 490');
   await pick('rsaP','11');await pick('rsaQ','13');await has('rsaN','143');eq(await val('rsaM'),'142');await has('rsaBack','142');
   for(const[p,q]of[[11,13],[17,19],[31,37],[61,53]]){await pick('rsaP',String(p));await pick('rsaQ',String(q));for(const e of await page.locator('#rsaE option').evaluateAll(o=>o.map(x=>x.value))){await pick('rsaE',e);await has('rsaCheck','1');eq(await read('rsaBack'),await val('rsaM'));}}
   // tam değer kutuları (doğrulayıcı eklemesi): kaydırıcıyla aynı değeri taşır; sınır dışı ya da sayı olmayan girdi kaydırıcıyı değiştirmez
   await click('akReset');eq(await val('dhSecANum'),'6');eq(await val('dhSecBNum'),'15');eq(await val('rsaMNum'),'65');await has('dhSecALim','1 … 22');await has('dhSecBLim','1 … 22');await has('rsaMLim','0 … 3232');
   await type('dhSecANum','13');eq(await val('dhSecA'),'13');await has('dhA','21');await has('dhSecAOut','a = 13');eq(await val('dhSecANum'),'13'); // 5^13 mod 23 = 21
   await type('dhSecANum','23');eq(await val('dhSecA'),'13');await has('dhSecAMsg','1 ile 22 arasında');await has('dhSecAMsg','a = 13');eq(await page.locator('#dhSecANum').getAttribute('aria-invalid'),'true');await has('dhA','21');
   for(const bad of['abc','0','-3','4.5','']){await type('dhSecANum',bad);eq(await val('dhSecA'),'13','geçersiz girdi: '+bad);}
   await page.locator('#dhSecANum').blur();eq(await val('dhSecANum'),'13');eq(await read('dhSecAMsg'),'');eq(await page.locator('#dhSecANum').getAttribute('aria-invalid'),null);
   await range('dhSecA',9);eq(await val('dhSecANum'),'9');await range('dhSecB',4);eq(await val('dhSecBNum'),'4');
   await pick('dhP','65521');await has('dhSecALim','1 … 65 520');await type('dhSecANum','40000');eq(await val('dhSecA'),'40000');await has('dhEve','40 000');await has('dhSqm','19');await type('dhSecBNum','12345');eq(await val('dhSecB'),'12345');await has('dhEq','Evet');
   await type('dhSecANum','40 000');eq(await val('dhSecA'),'40000');await type('dhSecANum','65521');eq(await val('dhSecA'),'40000');
   await pick('dhP','23');eq(await val('dhSecANum'),'22');eq(await val('dhSecBNum'),'22');await has('dhSecALim','1 … 22');
   await type('rsaMNum','1234');eq(await val('rsaM'),'1234');eq(await read('rsaBack'),'1234');await has('rsaMallT','2468');await has('rsaMall','2468');await type('rsaMNum','3233');eq(await val('rsaM'),'1234');await has('rsaMMsg','0 ile 3232');
   await type('rsaMNum','0');eq(await val('rsaM'),'0');await has('rsaC','0');await pick('rsaP','11');await pick('rsaQ','13');await has('rsaMLim','0 … 142');await type('rsaMNum','142');await has('rsaBack','142');
   await click('akReset');eq(await val('dhSecANum'),'6');eq(await val('rsaMNum'),'65');eq(await read('rsaMMsg'),'');
   await click('tab-klasik');await pick('cipherSel','vigenere');await has('klStatus','rastgele metnin 0.0345 değerine doğru inmiş');await has('klStatus','ortalama IC değeri 0.0593');await lacks('klStatus','kabadır');await pick('useLen','100');await has('klStatus','0.0436');await has('klStatus','sütun başına 20 harfle bu ölçüm kabadır');await click('klReset');
   await click('tab-butunluk');await has('bdNote','2/3 deneme');await click('tab-parola');await has('kdfNote','64 baytı');await click('tab-acik');
   await click('akReset');await has('rsaD','2753');await has('rsaC','2790');await has('dhA','8');await has('dhEve','6');eq(await val('rsaE'),'17');eq(await val('rsaM'),'65');
   // --- 04 bütünlük
   await click('tab-butunluk');await has('avChanged','124 / 256');await has('avMean','128.26');await has('avTheory','128');await has('avSdT','8');await has('avCount','1000');await has('avHexCount','62 / 64');await has('avHexA','924055be8c460e23114da9d2144a0b70ec2e6b7a464f7bb5f16f655042c2e551');await painted('avGrid');await painted('avHist');await painted('bdHist');await noOverflow('bütünlük');
   eq(await page.locator('#avBit').getAttribute('max'),'135');await range('avBit',135);await lacks('avChanged','Tanımsız');await type('avText','');await has('avChanged','Tanımsız');await has('avStatus','İleti boş');await has('avHexA','e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855');eq(await page.locator('#avBit').isDisabled(),true);
   await type('avText','abc');await has('avHexA','ba7816bf8f01cfea414140de5dae2223b00361a396177a9cb410ff61f20015ad');eq(await page.locator('#avBit').getAttribute('max'),'23');eq(await page.locator('#avBit').isDisabled(),false);
   await pick('avTrials','5000');await has('avCount','5000');{const m=parseFloat(await read('avMean'));ok(Math.abs(m-128)<0.6,'5000 denemede ortalama '+m);}{const a=await read('avMean');await click('avNew');ok(a!==await read('avMean'));}
   await has('bdSpace','65 536');await has('bdMean','330.8 ± 11.8');await has('bdApprox','320.8');await has('bdExact','321.5');await has('bdRunsOut','200 · 66 153');await has('bdExample','1010010100011010');await has('bdStatus','iki standart hatanın içinde');
   await range('bdBits',8);await has('bdSpace','256');await has('bdApprox','20.1');await has('bdExact','20.7');await range('bdBits',24);await has('bdSpace','16 777 216');await has('bdExact','5134.2');await has('bdStatus','süre sınırı');await range('bdBits',10);await has('bdExample','(ikilik yazım)');await pick('bdRuns','1000');await has('bdRunsOut','1000 ·');{const a=await read('bdMean');await click('bdNew');ok(a!==await read('bdMean'));}
   await has('hmVerdict','Geçti');await has('hmBitsDiff','0 / 256');await has('hmForge','390 / 100 000');await has('hmForgeT','391');await click('hmTamper');eq(await val('hmRecv'),"Açelya'ya 900 TL öde");await has('hmVerdict','Reddedildi');await has('hmHashVerdict','fark edilmedi');await lacks('hmBitsDiff','0 / 256');await has('hmStatus','reddedildi');
   await click('hmSame');await has('hmVerdict','Geçti');await type('hmKey','');await has('hmStatus','Anahtar boş');await range('hmBits',4);await has('hmForgeT','6250');await range('hmBits',16);await has('hmForgeT','1.53');{const h=parseInt(await read('hmForge'));ok(h>=0&&h<=12);}
   await has('hmTags',crypto.createHmac('sha256','').update("Açelya'ya 100 TL öde").digest('hex'));
   await click('buReset');await has('avChanged','124 / 256');await has('avMean','128.26');await has('bdMean','330.8');await has('hmForge','390 / 100 000');eq(await val('hmKey'),'yalnız ikimizin bildiği anahtar');
   await has('hmTags',crypto.createHmac('sha256','yalnız ikimizin bildiği anahtar').update("Açelya'ya 100 TL öde").digest('hex'));
   // --- klavye, sekmeler, tema
   await page.locator('#tab-butunluk').focus();await page.keyboard.press('Home');eq(await page.locator('#tab-klasik').getAttribute('aria-selected'),'true');await page.keyboard.press('ArrowRight');eq(await page.locator('#tab-parola').getAttribute('aria-selected'),'true');await page.keyboard.press('End');eq(await page.locator('#tab-butunluk').getAttribute('aria-selected'),'true');await page.keyboard.press('ArrowRight');eq(await page.locator('#tab-klasik').getAttribute('aria-selected'),'true');await page.keyboard.press('ArrowLeft');eq(await page.locator('#tab-butunluk').getAttribute('aria-selected'),'true');
   eq(await page.evaluate(()=>document.activeElement.id),'tab-butunluk');eq(await page.locator('[role=tabpanel]:not([hidden])').count(),1);eq(await page.locator('[role=tab][tabindex="0"]').count(),1);
   await click('tab-klasik');await range('shift',9);await page.locator('#shift').focus();await page.keyboard.press('r');eq(await val('shift'),'9');await page.locator('h1').click();await page.keyboard.press('r');eq(await val('shift'),'3');
   await type('plainText','r harfi yazılabilmeli');await page.locator('#plainText').press('r');ok((await val('plainText')).endsWith('lir'));await click('klReset');
   for(const t of['klasik','parola','acik','butunluk']){await click('tab-'+t);await noOverflow(t+' (son)');}
   await page.evaluate(()=>{document.documentElement.dataset.theme=document.documentElement.dataset.theme==='light'?'dark':'light';});await page.waitForTimeout(80);await painted('avHist');
   eq(errors,[],`${width}px konsol hataları`);await page.close();}
  console.log(`G siber-guvenlik tarayıcı: ${(checks-before).toLocaleString('tr-TR')} arayüz denetimi PASS (390 px açık, 1280 px koyu)`);
 }finally{await browser?.close();await new Promise(r=>server.close(r));}
}
