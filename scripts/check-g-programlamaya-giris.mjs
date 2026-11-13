// G · programlamaya-giris: sayfanın öğretim dili yorumlayıcısı node'da sınanır.
// Bağımsız referanslar: JavaScript'in kendi aritmetiği, gerçek Python 3 (python3 varsa), çevirilerin Python ve
// Node'da çalıştırılması, alıştırma yanıtlarının sayfadan ayrı yazılmış hesapları. `--browser` gerçek arayüzü dener.
import fs from 'node:fs';
import vm from 'node:vm';
import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
const html=fs.readFileSync(new URL('../programlamaya-giris.html',import.meta.url),'utf8');
const source=html.split('/* KERNEL-BEGIN */')[1]?.split('/* KERNEL-END */')[0];
assert(source,'Çekirdek sınır işaretleri gerekli');
const context={};vm.createContext(context);vm.runInContext(source+';globalThis.K=ProgLab;',context);
const K=context.K;let checks=0;
const eq=(a,b,msg)=>{assert.equal(a,b,msg===undefined?`${JSON.stringify(a)} ≠ ${JSON.stringify(b)}`:msg);checks++;};
const ok=(c,msg)=>{assert(c,msg);checks++;};
const has=(s,t,msg)=>{assert(String(s).includes(t),`${msg||''}: “${s}” içinde “${t}” yok`);checks++;};
const out=(src,inputs=[])=>{const r=K.run(src,{inputs});assert(!r.error,`beklenmeyen hata: ${r.error&&r.error.line+': '+r.error.message}\n${src}`);return r.output;};
const errOf=(src,inputs=[])=>{const r=K.run(src,{inputs});assert(r.error,'hata bekleniyordu:\n'+src);return r.error;};
ok(Object.isFrozen(K)&&Object.isFrozen(K.EXERCISES)&&Object.isFrozen(K.EXERCISES[0])&&Object.isFrozen(K.MISTAKES));
eq(K.LIMITS.steps,100000);
// Çekirdek eval/Function/ağ/DOM kullanmaz.
for(const bad of[/\beval\s*\(/,/new Function/,/\bfetch\s*\(/,/XMLHttpRequest/,/\bdocument\./,/\bwindow\./,/importScripts/,/WebSocket/])ok(!bad.test(source),'çekirdekte yasak: '+bad);
ok(!/\beval\s*\(|new Function/.test(html),'sayfada eval yok');

/* 1. Yazım hataları: satır numarası ve anlaşılır ileti */
const SYN=[
 ['x = 5\neğer x = 5 ise\n  yaz(x)\nson\n',2,'=='],
 ['eğer 3 > 2\n  yaz(1)\nson\n',1,'ise'],
 ['x = 1\niken x < 3\n  x = x + 1\n',2,'son'],
 ['yaz(1)\nson\n',2,'hiçbir bloğu'],
 ['yaz("merhaba)\n',1,'kapatılmamış'],
 ['yaz((1 + 2)\nx = 3\n',1,'kapatılmamış'],
 ['x = 2x\n',1,'2 * x'],
 ['eğer 1 < 2 < 3 ise\nson\n',1,'zincir'],
 ['x = 1\nx + 1\n',2,'x = x + 1'],
 ['x = 1\nx == 2\n',2,'tek ='],
 ['döndür 3\n',1,'fonksiyonun içinde'],
 ['topla(1, 2)\n',1,'fonksiyon yok'],
 ['fonksiyon kare(x)\n  döndür x * x\nson\nyaz(kare(1, 2))\n',4,'1 değer'],
 ['yaz = 3\n',1,'hazır bir fonksiyon'],
 ['ekle([1])\n',1,'2 değer'],
 ['x = 1;\n',1,';'],
 ['eğer doğru ise:\nson\n',1,':'],
 ['eğer doğru ve yanlış ise\n  yaz(1)\ndeğilse\n  yaz(2)\ndeğilse\n  yaz(3)\nson\n',5,'bir kez'],
 ['her i aralık(3)\nson\n',1,'için'],
 ['iken doğru\n  fonksiyon f()\n  son\nson\n',2,'en dış'],
 ['x = 3 @ 4\n',1,'tanımıyorum'],
 ['a = 1 && 2\n',1,'ve'],
 ['yzz(3)\n',1,'yaz'],
];
for(const[src,line,txt]of SYN){const e=errOf(src);eq(e.kind,'söz dizimi',src);eq(e.line,line,src+' satırı');has(e.message,txt,src);}
// Söz dizimi hatasında hiçbir satır çalışmaz.
{const r=K.run('yaz(1)\nyaz(2\n');eq(r.output.length,0);eq(r.steps,0);}
// Türkçe karaktersiz yazımlar ve akıllı tırnaklar.
eq(out('eger dogru ise\n  yaz(sayi("3,5") + 1)\ndegilse\n  yaz(0)\nson\n').join(),'4.5');
eq(out('yaz(“akıllı” + ‘tırnak’)\n').join(),'akıllıtırnak');
eq(out('tur = 3\nyaz(tur + 1, tur(tur))\n').join(),'4 sayı','“tur” adı yalnız çağrıda tür olur');
eq(out('yaz(5 ≥ 3, 6 × 7, 7 − 2)\n').join(),'doğru 42 5');

/* 2. Aritmetik: JavaScript'in kendi hesabıyla rastgele ifadeler (+ − * / ve parantez) */
let seed=12345;const R=()=>{seed=(seed*1103515245+12345)%2147483648;return seed/2147483648;};
const ri=(a,b)=>a+Math.floor(R()*(b-a+1));
const gen=d=>{if(d===0||R()<.3){return String(ri(0,30));}const op=['+','-','*','/'][ri(0,3)];const a=gen(d-1),b=gen(d-1);return R()<.4?`(${a} ${op} ${b})`:`${a} ${op} ${b}`;};
const exprs=[];for(let k=0;k<600;k++)exprs.push(gen(4));
const pyOk=spawnSync('python3',['--version']).status===0;
// Referans: Python 3 (sıfıra bölmede ZeroDivisionError verir); python3 yoksa JavaScript (sonlu sonuçlarda).
const pyVals=pyOk?spawnSync('python3',['-I','-c','import sys\nfor l in sys.stdin.read().splitlines():\n  try: print(repr(float(eval(l))))\n  except ZeroDivisionError: print("ZD")'],{input:exprs.join('\n'),encoding:'utf8'}).stdout.trim().split('\n'):null;
exprs.forEach((e,i)=>{const r=K.run('x = '+e+'\nyaz(x)\n');const ref=pyOk?pyVals[i]:String(Function('return ('+e+')')());
  if(ref==='ZD'||!pyOk&&!Number.isFinite(Number(ref))){if(pyOk){ok(!!r.error&&r.error.message.includes('Sıfıra bölme'),'sıfıra bölme bildirilmeli: '+e);}return;}
  assert(!r.error,e+' → '+(r.error&&r.error.message));const v=Number(r.output[0]),w=Number(ref);assert(Math.abs(v-w)<=1e-9*Math.max(1,Math.abs(w)),`${e}: ${v} ≠ ${w}`);checks++;});
ok(!pyOk||pyVals.filter(v=>v==='ZD').length>5,'sıfıra bölme durumları da sınanmalı');
// Taban bölme ve kalan: Python tanımı a = b·(a // b) + a % b, kalanın işareti bölenin işareti.
for(let a=-25;a<=25;a++)for(const b of[-7,-3,-1,1,2,5,9]){const[q,m]=out(`yaz(${a} // ${b})\nyaz(${a} % ${b})\n`).map(Number);
  eq(b*q+m,a);ok(m===0||Math.sign(m)===Math.sign(b));ok(Math.abs(m)<Math.abs(b));}
// Öncelik ve mantık
eq(out('yaz(2 + 3 * 4, (2 + 3) * 4, 10 - 4 - 3, 2 * -3, -2 * -3)\n').join(),'14 20 3 -6 6');
eq(out('yaz(1 + 2 > 2 ve değil yanlış, doğru veya yanlış ve yanlış, değil 1 == 2)\n').join(),'doğru doğru doğru');
eq(out('yaz(yanlış ve 1 / 0 == 1, doğru veya 1 / 0 == 1)\n').join(),'yanlış doğru','kısa devre');
eq(out('yaz(0.1 + 0.2, 6 / 2, 7 / 2, 2 / 3)\n').join(),`${0.1+0.2} 3 3.5 ${2/3}`);
eq(out('yaz("ab" < "b", "a" == "a", [1, [2]] == [1, [2]], [1] != [2], 1 == "1")\n').join(),'doğru doğru doğru doğru yanlış');

/* 3. Türler, metin, liste, fonksiyon anlamı */
eq(out('yaz(tür(1), tür("1"), tür(doğru), tür([1]), tür(yok), tür(aralık(3)))\n').join(),'sayı metin mantıksal liste yok aralık');
eq(out('a = [3, 1, 4]\nb = a\nekle(b, 1)\na[0] = 9\nyaz(a, uzunluk(b), b[0])\n').join(),'[9, 1, 4, 1] 4 9','liste takma adı');
eq(out('m = "kalem"\nyaz(m[0], uzunluk(m), m + "lik")\n').join(),'k 5 kalemlik');
eq(out('s = 0\nher h için "abc"\n  s = s + 1\nson\nyaz(s, h)\n').join(),'3 c');
eq(out('her i için aralık(5)\nson\nyaz(i)\nher j için aralık(3, 3)\n  yaz("hiç")\nson\n').join(),'4');
eq(out('yaz(aralık(2, 5)[1], uzunluk(aralık(2, 5)), aralık(4))\n').join(),'3 3 aralık(0, 4)');
eq(out('yaz(sayı(" 12 "), sayı("-3,5"), tamsayı(-7.9), tamsayı("8.6"), metin(5) + "!", mutlak(-4))\n').join(),'12 -3.5 -7 8 5! 4');
eq(out('x = 10\nfonksiyon f(x)\n  x = x + 1\n  y = 2\n  döndür x + g\nson\ng = 100\nyaz(f(x), x)\n').join(),'111 10','yerel/genel');
has(errOf('fonksiyon f()\n  y = 2\n  döndür y\nson\nf()\nyaz(y)\n').message,'henüz bir değer almadı');
eq(out('fonksiyon fib(n)\n  eğer n < 2 ise\n    döndür n\n  son\n  döndür fib(n - 1) + fib(n - 2)\nson\nyaz(fib(15))\n').join(),'610');
eq(out('fonksiyon f()\n  x = 1\nson\nyaz(f())\n').join(),'yok');
eq(out('a = [1]\nekle(a, a)\nyaz(a)\n').join(),'[1, […]]','döngüsel liste yazımı');
// Çalışma hataları: satır ve ileti
const RT=[
 ['x = 1\ny = x / 0\n',2,'Sıfıra bölme'],['a = [1, 2]\nyaz(a[2])\n',2,'0 … 1'],['a = []\nyaz(a[0])\n',2,'boş'],['a = [1]\nyaz(a[-1])\n',2,'0\'dan başlar'],
 ['yaz(1 + "2")\n',1,'Sayı ile metin'],['yaz(toplam)\n',1,'henüz bir değer almadı'],['Toplam = 1\nyaz(toplam)\n',2,'“Toplam” mı'],
 ['eğer 1 ise\nson\n',1,'doğru ya da yanlış'],['x = oku()\ny = oku()\n',2,'Girdi kalmadı'],['yaz(sayı("abc"))\n',1,'sayıya çevrilemez'],
 ['m = "ab"\nm[0] = "c"\n',2,'değiştirilemez'],['her i için 5\nson\n',1,'aralık(…)'],['doğrula(1 == 2, "olmadı")\n',1,'olmadı'],
 ['yaz("3" < 4)\n',1,'karşılaştırılamaz'],['yaz(değil 3)\n',1,'değil'],['yaz(1 ve doğru)\n',1,'ve'],['x = [1] * 2\n',1,'yalnız sayılarla'],
 ['fonksiyon k(x)\n  yaz(x)\nson\nyaz(k(2) + 1)\n',4,'değer yok'],['yaz(kare)\nfonksiyon kare(x)\n  döndür x\nson\n',1,'kare(…)'],
];
for(const[src,line,txt]of RT){const e=errOf(src,['5']);eq(e.kind,'çalışma',src);eq(e.line,line,src+' satırı');has(e.message,txt,src);}
// Hata öncesi çıktı korunur.
{const r=K.run('yaz(1)\nyaz(2)\nyaz(1 / 0)\nyaz(3)\n');eq(r.output.join(),'1,2');eq(r.error.line,3);}

/* 4. Sınırlar: sonsuz döngü temiz durur, sayfa kilitlenmez */
for(const src of['iken doğru\nson\n','i = 0\niken i < 10\n  x = 1\nson\n','n = 10\niken n != 0\n  n = n - 3\nson\n','a = [1]\nher x için a\n  ekle(a, x)\nson\n']){
  const t0=Date.now(),r=K.run(src);const dt=Date.now()-t0;
  ok(r.error&&r.error.kind==='sınır',src+' durmalı');ok(dt<3000,`durdurma ${dt} ms sürdü`);
  if(!src.includes('ekle')){eq(r.steps,K.LIMITS.steps);has(r.error.message,'100 000 adımda bitmedi');}}
{const r=K.run('fonksiyon f(n)\n  döndür f(n + 1)\nson\nyaz(f(0))\n');eq(r.error.kind,'sınır');has(r.error.message,'200 kat');}
{const r=K.run('iken doğru\n  yaz(1)\nson\n');eq(r.error.kind,'sınır');eq(r.output.length,K.LIMITS.output+1);has(r.error.message,'satırdan fazla');}
{const r=K.run('m = "ab"\niken doğru\n  m = m + m\nson\n');eq(r.error.kind,'sınır');has(r.error.message,'karakteri aştı');}
{const r=K.run('a = []\niken doğru\n  ekle(a, 0)\nson\n');eq(r.error.kind,'sınır');}
{const r=K.run('a = aralık(0, 99999)\nb = []\nher x için a\n  ekle(b, x)\nson\nc = 0\niken doğru\n  d = b == b\nson\n');eq(r.error.kind,'sınır');}
// Doğrulayıcı (13 Kasım): ortak alt listeli iç içe listelerde == üstel sürüyordu (sayfa donuyordu); derin iç içe geçme yakalanmamış RangeError atıyordu;
// constructor/valueOf gibi adlar nesne prototipinden okunuyordu; yaz("a\nb") tek çıktı satırı sayılıyordu.
{const t0=Date.now(),r=K.run('a = [1]\nb = [1]\nher i için aralık(0, 60)\n  a = [a, a]\n  b = [b, b]\nson\nyaz(a == b)\n');eq(r.error&&r.error.kind,'sınır','paylaşılan iç içe liste karşılaştırması durmalı');ok(Date.now()-t0<6000,'karşılaştırma sınırı süreli');}
for(const src of['x = '+'('.repeat(5000)+'1'+')'.repeat(5000)+'\n','x = '+Array(20000).fill('1').join(' + ')+'\n','x = '+'-'.repeat(20000)+'1\n',Array(3000).fill('eğer doğru ise').join('\n')+'\n'+Array(3000).fill('son').join('\n')+'\n']){const r=K.run(src);eq(r.error&&r.error.kind,'söz dizimi','derin iç içe geçme temiz bir yazım hatası olmalı');has(r.error.message,'çok derin');ok(K.toPython(src).ok===false);}
{const r=K.run('b = [1]\nher j için aralık(0, 20000)\n  b = [b]\nson\nyaz(metin(b))\n');eq(r.error&&r.error.kind,'sınır');has(r.error.message,'çok derinleşti');}
eq(out('constructor = 5\ntoString = 2\nyaz(constructor + toString)\n').join(),'7');has(errOf('yaz(valueOf(1))\n').message,'“valueOf” adında bir fonksiyon yok');
eq(out('yaz("c\\nd")\n').join('|'),'c|d','yaz satır sonunda iki satır yazar');
// Kapsam: atanan ad atandığı satırdan sonra yereldir (Python'da UnboundLocalError; sayfa farkı açıkça yazar).
eq(out('g = 5\nfonksiyon f()\n  g = g + 1\n  döndür g\nson\nyaz(f(), g)\n').join(),'6 5');has(html,'UnboundLocalError');
// Adım sayısı: iken döngüsü n tur için 2n + 2 adım (atama + n + 1 denetim + n gövde).
for(const n of[0,1,7,50])eq(K.run(`i = 0\niken i < ${n}\n  i = i + 1\nson\n`).steps,2*n+2);
eq(K.run('her i için aralık(4)\n  x = i\nson\n').steps,8);eq(K.run('her i için aralık(0)\n  x = i\nson\n').steps,1);
eq(K.run('i = 0\niken i < 10\n  i = i + 1\nson\n',{maxSteps:5}).error.kind,'sınır');

/* 5. İz: her adımda satır, değişkenler, çıktı sayısı, çağrı yığını */
{const r=K.run('x = 5\nx = x + 1\nx = x * 2\nyaz(x)\n',{trace:true});eq(r.trace.length,5);
  eq(r.trace.map(s=>s.line).join(),'1,2,3,4,');eq(r.trace.map(s=>s.vars.map(v=>v.value).join()).join('|'),'|5|6|12|12');
  eq(r.trace.map(s=>s.out).join(),'0,0,0,0,1');ok(r.trace[4].final&&!r.trace[3].final);}
{const r=K.run(K.EXAMPLES.find(e=>e.title==='Değer döndüren fonksiyon').code,{trace:true});
  ok(r.trace.some(s=>s.stack.join(' → ')==='kareler_toplamı(3, 4) → kare(4)'&&s.vars.some(v=>v.name==='x'&&v.value==='4'&&v.scope==='kare')),'iç içe çağrı yığını');}
{const r=K.run('iken doğru\nson\n',{trace:true});eq(r.trace.length,K.LIMITS.trace+1);ok(r.traceCut);ok(r.trace[r.trace.length-1].final);eq(r.error.kind,'sınır');}
{const r=K.run('fonksiyon f(b)\n  c = b + 1\n  döndür c / 0\nson\nyaz(f(2))\n',{trace:true});const f=r.trace[r.trace.length-1];eq(f.line,3);eq(f.stack.join(),'f(2)');ok(f.vars.some(v=>v.name==='c'&&v.value==='3'&&v.scope==='f'),'hata anındaki yerel değişkenler');}
{const r=K.run('a = 1\nyaz(a / 0)\n',{trace:true});const f=r.trace[r.trace.length-1];eq(f.line,2);ok(f.final);}

/* 6. Hoşgörülü karşılaştırıcı ve sayı ayrıştırıcı */
const PN=[['3,5',3.5],['3.5',3.5],[' -2 ',-2],['−4',-4],['+7',7],['10 000',10000],['3/4',.75],[',5',.5],['abc',null],['',null],['1.2.3',null],['3/0',null],['1e3',null]];
for(const[s,v]of PN)eq(K.parseNumber(s),v,'parseNumber '+s);
const OM=[[['4.0'],['4'],true],[['3,5'],['3.5'],true],[['  Merhaba,   Deniz! '],['Merhaba, Deniz!'],true],[['ASAL'],['asal'],true],[['İ'],['i'],true],[['True'],['doğru'],true],
  [['1','2',''],['1','2'],true],[['1'],['1','2'],false],[['1','2'],['1'],false],[['34'],['7'],false],[['asal değil'],['asal'],false],[['0.30000000000000004'],['0.3'],true],[['5'],['5.001'],false]];
for(const[g,w,e]of OM)eq(K.outputsMatch(g,w).ok,e,JSON.stringify([g,w]));
has(K.outputsMatch(['1'],['1','2']).reason,'2. satır eksik');

/* 7. İfade indirme: her ara adım aynı değere sahip ve bir öncekinden bir işlem kısa */
for(const e of[...exprs.slice(0,120).filter(e=>!K.run('x = '+e).error),'1 + 2 > 2 ve değil yanlış','[1, 2 + 3][1] * 2','"a" + "b" == "ab" veya 1 / 0 > 1']){
  const r=K.reduceSteps(e);assert(r.ok,e+' '+r.message);const vals=r.steps.map(s=>K.run('yaz(tür('+s+'), '+s+')').output[0]);
  ok(vals.every(v=>v===vals[0]),'adımlar aynı değeri vermeli: '+e);ok(r.steps.length<=60);}
eq(K.reduceSteps('2 + 3 * 4 - (8 - 2) / 3').steps.join(' | '),'2 + 3 * 4 - (8 - 2) / 3 | 2 + 12 - (8 - 2) / 3 | 14 - (8 - 2) / 3 | 14 - 6 / 3 | 14 - 2 | 12');
ok(!K.reduceSteps('x + 1').ok);ok(!K.reduceSteps('1 / 0').ok);ok(!K.reduceSteps('').ok);

/* 8. Alıştırmalar: örnek çözüm her tohumda geçer, başlangıç kodu ve tipik yanlışlar kalır, referanslar bağımsız hesapla uyuşur */
eq(K.EXERCISES.length,14);for(const l of[1,2,3])ok(K.EXERCISES.filter(x=>x.level===l).length>=4,'her düzeyde en az dört alıştırma');
const ids=new Set();for(const x of K.EXERCISES){ok(!ids.has(x.id));ids.add(x.id);ok(x.hints.length>=2&&x.steps.length>=3&&x.text.length>40);}
for(const x of K.EXERCISES){
  for(let s=1;s<=30;s++){const r=K.checkProgram(x.id,x.solution,s);assert.equal(r.passed,r.total,`${x.id} tohum ${s}: ${r.results.filter(t=>!t.ok).map(t=>t.reason).join(' | ')}`);checks++;}
  const st=K.checkProgram(x.id,x.starter,1);ok(st.passed<st.total,x.id+' başlangıç kodu geçmemeli');
  const a=K.makeTests(x.id,5),b=K.makeTests(x.id,5),c=K.makeTests(x.id,6);eq(JSON.stringify(a),JSON.stringify(b),'tohum yinelenebilir');eq(a.length,x.fixed.length+K.RANDOM_TESTS);
  ok(JSON.stringify(a.slice(x.fixed.length))!==JSON.stringify(c.slice(x.fixed.length))||x.id==='selam','farklı tohum farklı test');}
// Referanslar, sayfadakinden farklı yollarla:
const T=(id,s=1)=>K.makeTests(id,s);
for(let s=1;s<=20;s++){
  for(const t of T('toplam',s)){const n=Number(t.input[0]);eq(t.expected[0],String(n*(n+1)/2));}
  for(const t of T('rakam',s)){let n=Number(t.input[0]),d=0;while(n>0){d+=n%10;n=Math.floor(n/10);}eq(t.expected[0],String(d));}
  for(const t of T('asal',s)){const n=Number(t.input[0]);let p=n>=2;for(let d=2;d<n;d++)if(n%d===0)p=false;eq(t.expected[0],p?'asal':'asal değil');}
  for(const t of T('fibonacci',s)){const f=t.expected.map(Number);eq(f.length,Number(t.input[0]));for(let k=2;k<f.length;k++)eq(f[k],f[k-1]+f[k-2]);eq(f[0],0);}
  for(const t of T('faktoriyel',s)){const n=Number(t.input[0]);let p=1;for(let k=1;k<=n;k++)p*=k;eq(Number(t.expected[0]),p);}
  for(const t of T('ortalama',s)){const a=t.input.slice(1).map(Number),m=a.reduce((x,y)=>x+y,0)/a.length;eq(t.expected[0],String(a.filter(x=>x>m+1e-12).length));}
  for(const t of T('sesli',s)){const c=(t.input[0].match(/[aeıioöuüAEIİOÖUÜ]/g)||[]).length;eq(t.expected[0],String(c));}
  for(const t of T('ters',s))eq(t.expected.join(),t.input.slice(1).reverse().join());
  for(const t of T('enbuyuk',s))eq(t.expected[0],String(t.input.slice(1).map(Number).sort((a,b)=>b-a)[0]));
}
eq(K.makeTests('faktoriyel',1)[3].expected[0],'6402373705728000');
const WRONG={toplam:'n = sayı(oku())\ntoplam = 0\nher i için aralık(1, n)\n  toplam = toplam + i\nson\nyaz(toplam)\n',
  enbuyuk:'k = sayı(oku())\nenbüyük = 0\nher i için aralık(0, k)\n  x = sayı(oku())\n  eğer x > enbüyük ise\n    enbüyük = x\n  son\nson\nyaz(enbüyük)\n',
  asal:'n = sayı(oku())\nasal = doğru\nd = 2\niken d < n\n  eğer n % d == 0 ise\n    asal = yanlış\n  son\n  d = d + 1\nson\neğer asal ise\n  yaz("asal")\ndeğilse\n  yaz("asal değil")\nson\n',
  topla:'a = oku()\nb = oku()\nyaz(a + b)\n',tekcift:'n = sayı(oku())\neğer n % 2 == 1 ise\n  yaz("çift")\ndeğilse\n  yaz("tek")\nson\n',
  sesli:'c = oku()\nk = 0\nher h için c\n  eğer h == "a" veya h == "e" ise\n    k = k + 1\n  son\nson\nyaz(k)\n',
  ters:'k = sayı(oku())\nl = []\nher i için aralık(0, k)\n  ekle(l, oku())\nson\nher x için l\n  yaz(x)\nson\n'};
for(const[id,src]of Object.entries(WRONG)){const r=K.checkProgram(id,src,1);ok(r.passed<r.total,id+' yanlış çözüm yakalanmalı');ok(r.results.some(t=>!t.ok&&t.reason.length>5));}
{const r=K.checkProgram('topla','a = sayı(oku())\nb = sayı(oku()\n',1);ok(r.syntax);eq(r.passed,0);eq(r.results.length,1);}
{const r=K.checkProgram('topla','iken doğru\nson\n',1);eq(r.passed,0);ok(r.results.every(t=>t.error&&t.error.kind==='sınır'));}

/* 9. Ders örnekleri ve sık hatalar */
eq(K.EXAMPLES.length,19);for(let l=0;l<9;l++)ok(K.EXAMPLES.some(e=>e.lesson===l),'her dersin örneği var');
for(const e of K.EXAMPLES){const r=K.run(e.code,{inputs:e.inputs});if(e.error){ok(r.error&&r.error.kind===e.error&&r.error.line===e.errorLine,e.title);}else{ok(!r.error&&r.output.length>0,e.title);}}
const exOut=t=>K.run(K.EXAMPLES.find(e=>e.title===t).code,{inputs:K.EXAMPLES.find(e=>e.title===t).inputs}).output;
eq(exOut('x = x + 1').join(),'12');eq(exOut('Takas').join(),'8 3');eq(exOut('Öncelik').join('|'),'14|20|3.5 3 1|3|doğru');eq(exOut('Not aralığı').join(),'iyi');
eq(exOut('Artık yıl (iç içe)').join(),'artık yıl değil');eq(exOut('Döngü değişmezi').join(),'15');eq(exOut('Yerel değişken').join(),'10 11');eq(exOut('Liste temelleri').pop(),'76.25');
eq(exOut('Bir eksik').join(),'1,2,3,4');eq(exOut('oku() metin verir').join('|'),'metin|45|9');
// Artık yıl kuralı: Gregoryen takvim (bağımsız: JavaScript Date 29 Şubat'ı tanır mı?)
const leap=K.EXAMPLES.find(e=>e.title==='Artık yıl (iç içe)').code;for(const y of[1600,1700,1900,2000,2023,2024,2100,2400])eq(out(leap,[String(y)])[0],new Date(Date.UTC(y,1,29)).getUTCMonth()===1?'artık yıl':'artık yıl değil');
eq(K.MISTAKES.length,8);
for(const m of K.MISTAKES){const b=K.run(m.buggy,{inputs:m.inputs}),f=K.run(m.fixed,{inputs:m.inputs});
  ok(!f.error&&K.outputsMatch(f.output,m.expect).ok,m.id+' düzeltilmiş hâl doğru çalışmalı');
  if(m.symptom==='yanlış')ok(!b.error&&!K.outputsMatch(b.output,m.expect).ok,m.id+' hatalı hâl yanlış sonuç vermeli');else ok(b.error&&b.error.kind===m.symptom,m.id+' belirti: '+m.symptom);
  ok(m.why.length>80&&m.diff.length>5);}

/* 10. Çeviriler: Python 3 ve Node.js'te aynı çıktı */
const runJS=(code,inputs)=>{const o=[];let k=0;const c={console:{log:(...a)=>o.push(a.map(String).join(' ')),assert:(x,m)=>{if(!x)throw new Error(m);}},prompt:()=>inputs[k++],Math,String,Number,Array};vm.createContext(c);vm.runInContext(code,c,{timeout:2000});return o;};
let pyRuns=0;
for(const x of K.EXERCISES){const py=K.toPython(x.solution),js=K.toJS(x.solution);ok(py.ok&&js.ok);ok(!/eval|Function\(/.test(js.code));
  for(const t of K.makeTests(x.id,3)){
    const jo=runJS(js.code,t.input);ok(K.outputsMatch(jo,t.expected).ok,`${x.id} JS: ${jo} ≠ ${t.expected}\n${js.code}`);
    if(pyOk){const r=spawnSync('python3',['-I','-c',py.code],{input:t.input.join('\n')+'\n',encoding:'utf8'});assert.equal(r.status,0,x.id+' Python: '+r.stderr+'\n'+py.code);
      const po=r.stdout.replace(/\n$/,'').split('\n').filter((l,i,a)=>!(a.length===1&&l===''));ok(K.outputsMatch(po,t.expected).ok,`${x.id} Python: ${po} ≠ ${t.expected}`);pyRuns++;}}}
for(const m of K.MISTAKES){const js=K.toJS(m.fixed),py=K.toPython(m.fixed);ok(js.ok&&py.ok);const jo=runJS(js.code,m.inputs.slice());ok(K.outputsMatch(jo,m.expect).ok||m.expect[0]==='doğru'&&jo[0]==='true','JS '+m.id);
  if(pyOk){const r=spawnSync('python3',['-I','-c',py.code],{input:m.inputs.join('\n')+'\n',encoding:'utf8'});eq(r.status,0,m.id+r.stderr);ok(K.outputsMatch(r.stdout.trim().split('\n'),m.expect).ok,'Python '+m.id+' '+r.stdout);pyRuns++;}}
// Taban bölme, kalan ve öncelik Python ile birebir: aynı metin Python'da da geçerli bir ifadedir.
if(pyOk){const list=[];for(let k=0;k<300;k++){const a=ri(-40,40),b=[ri(1,9),-ri(1,9)][ri(0,1)],c=ri(-9,9);list.push(`${a} // ${b} * ${c} + ${a} % ${b} - ${c}`,`(${a} - ${c}) % ${b} * 2 // ${b}`);}
  const r=spawnSync('python3',['-I','-c','import sys\nfor l in sys.stdin.read().splitlines(): print(eval(l))'],{input:list.join('\n'),encoding:'utf8'});eq(r.status,0);
  const pv=r.stdout.trim().split('\n');list.forEach((e,i)=>{eq(out('yaz('+e+')')[0],pv[i],e);});pyRuns++;}
{const js=K.toJS('x = -7 % 2\ny = -7 // 2\neğer değil x == 1 ise\n  yaz("hayır")\nson\nyaz(x, y)\n');eq(runJS(js.code,[]).join(),'1 -4');has(js.code,'!(x === 1)');has(js.code,'Math.floor(-7 / 2)');}
{const py=K.toPython('her i için aralık(3)\nson\nfonksiyon f()\nson\n').code;has(py,'pass');has(py,'for i in range(3):');}
{const js=K.toJS('n = 3\nher i için aralık(0, n + 1)\n  n = 0\nson\nyaz(i)\n').code;has(js,'for (i of aralik(0, n + 1))','gövdede değişen sınır yardımcıyla çevrilir');eq(runJS(js,[]).join(),'3');}
console.log(`G programlamaya-giris: ${checks.toLocaleString('tr-TR')} bağımsız çekirdek kontrolü PASS${pyOk?` (${pyRuns} gerçek Python 3 çalıştırması dahil)`:' (python3 bulunamadı: Python karşılaştırması atlandı)'}`);

if(process.argv.includes('--browser')){
  const {chromium}=await import('playwright');const {createServer}=await import('node:http');const {join,extname}=await import('node:path');const {fileURLToPath}=await import('node:url');const root=fileURLToPath(new URL('../',import.meta.url));
  const server=createServer((req,res)=>{const file=join(root,decodeURIComponent(new URL(req.url,'http://localhost').pathname));if(!fs.existsSync(file)||fs.statSync(file).isDirectory()){res.writeHead(404).end();return;}res.setHeader('Content-Type',({'.html':'text/html; charset=utf-8','.js':'text/javascript; charset=utf-8','.css':'text/css; charset=utf-8'})[extname(file)]||'application/octet-stream');res.end(fs.readFileSync(file));});await new Promise(r=>server.listen(0,'127.0.0.1',r));let browser;const before=checks;
  try{browser=await chromium.launch();
    for(const[theme,width]of[['light',390],['dark',1280]]){
      const page=await browser.newPage({viewport:{width,height:900},deviceScaleFactor:width===390?2:1});await page.addInitScript(t=>{localStorage.setItem('acelya-theme',t);localStorage.setItem('acelya-sound-muted','1');},theme);page.setDefaultTimeout(6000);const errors=[];page.on('pageerror',e=>errors.push(e.message));page.on('console',m=>{if(m.type()==='error'&&!/digest\/programlamaya-giris\.js|404/.test(m.text()))errors.push(m.text());});
      const net=[];page.on('request',r=>{const u=new URL(r.url());if(u.hostname!=='127.0.0.1'&&!/^fonts\.(googleapis|gstatic)\.com$/.test(u.hostname))net.push(r.url());});
      await page.goto(`http://127.0.0.1:${server.address().port}/programlamaya-giris.html`);
      const click=id=>page.locator('#'+id).click(),read=async id=>(await page.locator('#'+id).textContent()).replace(/ /g,' '),is=async(id,t)=>{eq(await read(id),t,id);},hasT=async(id,t)=>{has(await read(id),t,id);},fits=async()=>eq(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),true,'yatay taşma');
      const labelled=()=>page.evaluate(()=>[...document.querySelectorAll('.app-content input,.app-content select,.app-content textarea')].filter(e=>!document.querySelector('label[for="'+e.id+'"]')).map(e=>e.id).join());
      eq(await labelled(),'');
      eq(await page.evaluate(()=>Object.isFrozen(ProgLab)&&!Object.getOwnPropertyDescriptor(window,'ProgLab').writable),true);
      eq(await page.evaluate(()=>[...document.querySelectorAll('.pg-code')].every(t=>parseFloat(getComputedStyle(t).fontSize)>=16)),true,'telefon yakınlaştırmasın diye en az 16 px');
      // 01 · Ders 1: çalıştır
      await click('L-run');await is('L-out','42\n3.5\nmerhaba\ndoğru\nsayı metin mantıksal');await is('L-status','Program 5 adımda bitti.');
      await page.locator('#predIn').fill('sayı metin mantıksal');await click('predCheck');await hasT('predOut','Doğru tahmin');
      await page.locator('#predIn').fill('42');await click('predCheck');await hasT('predOut','senin tahminin “42”');
      // Ders 2: x = x + 1, adım adım
      await page.locator('#lessonNav button[data-l="1"]').click();await click('L-trace');eq(await page.locator('#L-view').isVisible(),true);eq(await page.locator('#L-code').isVisible(),false);
      await is('L-stepOut','0 / 4');eq(await page.locator('#L-view .is-now').getAttribute('data-n'),'1');await hasT('L-vars','Henüz değişken yok');
      await click('L-next');await click('L-next');eq(await page.locator('#L-view .is-now').getAttribute('data-n'),'3');await hasT('L-vars','6');eq(await page.locator('#L-vars tr.is-changed').count(),1);
      await click('L-last');await is('L-out','12');await hasT('L-status','Program bitti: 4 adım');eq(await page.locator('#L-next').isDisabled(),true);
      await click('L-prev');await is('L-out','');await page.locator('#L-step').evaluate(e=>{e.value='1';e.dispatchEvent(new Event('input',{bubbles:true}));});await hasT('L-vars','5');
      await page.locator('#L-view').focus();await page.keyboard.press('ArrowRight');await is('L-stepOut','2 / 4');
      await click('L-edit');eq(await page.locator('#L-code').isVisible(),true);
      // Simge tuşu ve otomatik girinti
      await page.locator('#L-code').fill('eğer 1 < 2 ise');await page.locator('#L-code').press('End');await page.locator('#L-code').press('Enter');await page.locator('#L-code').type('yaz(1');await page.locator('#L-keys button[aria-label="sağ parantez"]').click();
      eq(await page.locator('#L-code').inputValue(),'eğer 1 < 2 ise\n  yaz(1)');await page.locator('#L-code').press('Enter');await page.locator('#L-code').type('son');await page.locator('#L-code').press('Control+Enter');await is('L-out','1');
      await page.locator('#L-code').fill('x = 1\neğer x = 1 ise\nson\n');await click('L-run');await hasT('L-status','Yazım hatası · 2. satır');await hasT('L-status','==');await click('L-trace');eq(await page.locator('#L-view').isVisible(),false,'yazım hatasında iz açılmaz');
      await click('L-reset');eq(await page.locator('#L-code').inputValue(),'x = 5\nx = x + 1\nx = x * 2\nyaz(x)\n');
      await page.locator('#L-tr summary').click();await page.waitForFunction(()=>document.getElementById('L-py').textContent.length>0);await hasT('L-py','x = x + 1');await hasT('L-js','let x;');
      // Ders 3: ifade indirme
      await page.locator('#lessonNav button[data-l="2"]').click();eq(await page.locator('#exprSteps li').count(),6);await page.locator('#exprIn').fill('(1 + 2) * 3 == 9');await click('exprGo');eq((await page.locator('#exprSteps li').allTextContents()).join(' | '),'(1 + 2) * 3 == 9 | 3 * 3 == 9 | 9 == 9 | doğru');
      await page.locator('#exprIn').fill('x + 1');await page.locator('#exprIn').press('Enter');await hasT('exprNote','değişken kullanılamaz');
      // Ders 4: girdi
      await page.locator('#lessonNav button[data-l="3"]').click();eq(await page.locator('#L-in').inputValue(),'Deniz\n15');await click('L-run');await is('L-out','Merhaba, Deniz\nGelecek yıl 16 yaşında olacaksın.');
      await page.locator('#L-in').fill('Ece');await click('L-run');await hasT('L-status','Girdi kalmadı');
      // Ders 7: çağrı yığını izde görünür
      await page.locator('#lessonNav button[data-l="6"]').click();await click('L-trace');await click('L-next');await hasT('L-stack','kare(7)');await hasT('L-vars','yerel · kare');await click('L-edit');
      // Ders 9: bitmeyen döngü temiz durur
      await click('lessonNext');await click('lessonNext');await page.locator('#exampleRow button[data-e="2"]').click();eq(await page.locator('#predCard').isVisible(),false);
      const t0=Date.now();await click('L-run');await hasT('L-status','Durduruldu · 2. satır');await hasT('L-status','100 000 adımda bitmedi');ok(Date.now()-t0<4000,'durdurma hızlı');
      await click('L-trace');await click('L-last');await hasT('L-status','İz ilk 2000 adımı');eq(await page.locator('#L-view .is-err').getAttribute('data-n'),'2');await click('L-edit');
      await click('lessonPrev');await hasT('lessonNav','Listeler');eq(await page.locator('#lessonNav button[aria-pressed="true"]').getAttribute('data-l'),'7');
      await fits();
      // 02 · Alıştırmalar
      await page.locator('#tab-ders').focus();await page.keyboard.press('ArrowRight');eq(await page.locator('#tab-alistirma').getAttribute('aria-selected'),'true');eq(await page.locator('#panel-alistirma').isVisible(),true);
      await is('exSolved','çözülen 0 / 14');eq(await page.locator('#exTableWrap').isVisible(),false,'testler denemeden önce gizli');
      await click('exCheck');await hasT('exResult','0 / 6 test geçti');eq(await page.locator('#exRows tr').count(),6);await hasT('exRows','Açelya');
      await click('exHint');await click('exHint');eq(await page.locator('#exHints li').count(),2);eq(await page.locator('#exHint').isDisabled(),true);
      await click('exSol');await hasT('exSolCode','yaz("Merhaba, " + ad + "!")');await click('exSolLoad');await click('exCheck');await hasT('exResult','Bütün testler geçti: 6 / 6');await is('exSolved','çözülen 1 / 14');
      await page.locator('#exSel').selectOption('6');await hasT('exTitle','Faktöriyel');await hasT('exMeta','Gizli test sayısı: 8');await click('exCheck');await hasT('exResult','3 / 8 test geçti');
      await page.locator('#E-code').fill(K.EXERCISES[6].solution);await click('exCheck');await hasT('exResult','8 / 8');
      await page.locator('#exSeed').evaluate(e=>{e.value='77';e.dispatchEvent(new Event('input',{bubbles:true}));});await is('exSeedOut','77');await hasT('exResult','8 / 8');
      await page.locator('#E-code').fill('a = sayı(oku()\n');await click('exCheck');await hasT('exResult','Program çalışmadı');
      await click('exStarter');has(await page.locator('#E-code').inputValue(),'döndür 1');await click('E-run');await is('E-out','1');
      for(let i=0;i<14;i++){await page.locator('#exSel').selectOption(String(i));await page.locator('#E-code').fill(K.EXERCISES[i].solution);await click('exCheck');await hasT('exResult','Bütün testler geçti');}
      await is('exSolved','çözülen 14 / 14');await fits();
      // 03 · Sık hatalar
      await page.keyboard.press('Tab');await page.locator('#tab-alistirma').focus();await page.keyboard.press('ArrowRight');eq(await page.locator('#panel-hata').isVisible(),true);
      await click('M-run');await is('M-out','10');eq(await page.locator('#mWhyBox').isVisible(),false);await click('mWhy');eq(await page.locator('#mWhyBox').isVisible(),true);await hasT('mDiff','aralık(1, n + 1)');
      await click('mFix');await is('M-out','15');await click('M-reset');
      eq(await page.locator('#M-code').inputValue(),K.MISTAKES[0].buggy);
      await page.locator('#mistakeNav button[data-m="2"]').click();await click('M-run');await hasT('M-status','Durduruldu');await click('mFix');await is('M-out','15');
      await page.locator('#mistakeNav button[data-m="1"]').click();await click('M-run');await hasT('M-status','Yazım hatası · 2. satır');
      await page.locator('#mistakeNav button[data-m="7"]').click();await click('M-run');await is('M-out','16');await hasT('M-status','değer yok');await fits();
      // 04 · Bundan sonra
      await page.keyboard.press('Tab');await page.locator('#tab-hata').focus();await page.keyboard.press('End');eq(await page.locator('#panel-sonra').isVisible(),true);
      for(const href of['algoritmalar.html','veri-yapilari.html','mantik-kapilari.html','siralama-algoritmalari.html','programlama-paradigmalari.html','makine-dili-assembly-c.html'])eq(await page.locator(`#panel-sonra a[href="${href}"]`).count(),1,href);
      await fits();await page.locator('#tab-sonra').focus();await page.keyboard.press('Home');eq(await page.locator('#panel-ders').isVisible(),true);
      eq(net.length,0,'sitenin yazı tipleri dışında ağ isteği yok: '+net.join());
      assert.deepEqual(errors,[]);checks++;await page.close();}
    console.log(`G programlamaya-giris: ${checks-before} tarayıcı kontrolü PASS (390 px açık, 1280 px koyu)`);
  }finally{await browser?.close();await new Promise(r=>server.close(r));}
}
