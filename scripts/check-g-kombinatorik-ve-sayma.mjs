// G · kombinatorik-ve-sayma: çekirdek, sayfanın formüllerini yinelemeyen referanslarla sınanır
// (kendi kaba kuvvet sayımları, Pascal üçgeni ve kafes yolu dinamik programlaması, Set ile tekrarsız sayım,
// D(n) = n·D(n − 1) + (−1)ⁿ özyinelemesi, BigInt kesirlerle tam olasılık). `--browser` gerçek arayüzü 390 px açık
// ve 1280 px koyu temada dener.
import fs from 'node:fs';
import assert from 'node:assert/strict';
const html=fs.readFileSync(new URL('../kombinatorik-ve-sayma.html',import.meta.url),'utf8');
const source=html.split('/* KERNEL-BEGIN */')[1]?.split('/* KERNEL-END */')[0];
assert(source,'Çekirdek sınır işaretleri gerekli');
const K=new Function('"use strict";'+source+';return CombinatoricsLab;')();
let checks=0;
const eq=(a,b,msg)=>{assert.equal(a,b,msg);checks++;};
const ok=(c,msg)=>{assert(c,msg);checks++;};
const near=(a,b,tol,msg)=>{assert(Math.abs(a-b)<=tol,(msg||'')+` ${a} ≠ ${b}`);checks++;};
ok(Object.isFrozen(K)&&Object.isFrozen(K.KINDS));

/* Bağımsız referanslar */
const pascal=(()=>{const T=[[1n]];for(let n=1;n<=60;n++){const r=[1n];for(let k=1;k<n;k++)r.push(T[n-1][k-1]+T[n-1][k]);r.push(1n);T.push(r);}return(n,k)=>k<0||k>n?0n:T[n][k];})();
const fact=n=>{let f=1n;for(let i=1n;i<=BigInt(n);i++)f*=i;return f;};
// Bütün k-uzunluklu dizileri özyinelemeyle kur, dört türü Set ile say (sırasızlar sıralanmış anahtarla).
function refCounts(n,k){const P=new Set(),PR=new Set(),C=new Set(),CR=new Set();const a=[];
  const rec=i=>{if(i===k){const key=a.join(','),sorted=a.slice().sort((x,y)=>x-y).join(',');PR.add(key);CR.add(sorted);if(new Set(a).size===k){P.add(key);C.add(sorted);}return;}for(let x=0;x<n;x++){a.push(x);rec(i+1);a.pop();}};
  rec(0);return{P:P.size,PR:PR.size,C:C.size,CR:CR.size};}

/* 1. Seçimler */
for(let n=1;n<=7;n++)for(let k=0;k<=6;k++){const r=refCounts(n,k),F=K.formulas(n,k),M=K.measure(n,k);
  for(const t of K.KINDS){eq(F[t],BigInt(r[t]),`formül ${t} n=${n} k=${k}`);eq(M[t],r[t],`ölçüm ${t} n=${n} k=${k}`);}eq(M.method,'scan');}
for(let n=1;n<=20;n++)for(let k=0;k<=20;k++){const F=K.formulas(n,k);eq(F.C,pascal(n,k));eq(F.CR,pascal(n+k-1,k));eq(F.PR,BigInt(n)**BigInt(k));eq(F.P,k>n?0n:fact(n)/fact(n-k));}
eq(K.formulas(20,20).PR,104857600000000000000000000n);ok(K.formulas(20,20).PR>2n**53n);eq(K.formulas(20,10).C,184756n);eq(K.formulas(20,10).CR,20030010n);
{const M=K.measure(12,6);eq(M.method,'direct');eq(M.P,665280);eq(M.C,924);eq(M.CR,12376);eq(M.PR,null);
  const M2=K.measure(20,10);eq(M2.C,184756);eq(M2.P,null);eq(M2.CR,null);eq(K.measure(3,5).P,0);eq(K.measure(3,5).CR,21);eq(K.measure(1,0).PR,1);eq(K.measure(20,0).CR,1);}
assert.throws(()=>K.formulas(0,1));assert.throws(()=>K.formulas(21,1));assert.throws(()=>K.formulas(5,-1));checks+=3;
// Listeleme: sayfalar birleşince tam, sözlük sıralı, tekrarsız ve türün koşulunu sağlayan liste.
for(const[n,k]of[[5,3],[4,4],[6,2],[3,5]])for(const kind of K.KINDS){const all=[];for(let p=0;;p++){const pg=K.listPage(n,k,kind,p,7);all.push(...pg);if(pg.length<7)break;}
  eq(all.length,Number(K.formulas(n,k)[kind]),`liste ${kind} ${n},${k}`);const keys=all.map(a=>a.join(','));eq(new Set(keys).size,keys.length);
  for(let i=1;i<all.length;i++){const a=all[i-1],b=all[i];let j=0;while(a[j]===b[j])j++;if(!(a[j]<b[j]))assert.fail('sözlük sırası');}checks++;
  for(const a of all){if(kind==='P'&&new Set(a).size!==k)assert.fail();if(kind==='C'&&a.some((x,i)=>i&&x<=a[i-1]))assert.fail();if(kind==='CR'&&a.some((x,i)=>i&&x<a[i-1]))assert.fail();}checks++;}
// Yıldız ve çubuk: kod çözülünce aynı çoklu küme; ikili dizi sayımı = Pascal.
for(const[n,k]of[[5,3],[3,5],[1,4],[6,0],[7,7]]){const total=Number(K.formulas(n,k).CR),codes=new Set();
  for(let r=1;r<=total;r++){const a=K.nthMultiset(n,k,r),code=K.starsBars(n,a);eq(code.length,n+k-1);codes.add(code);
    const back=[];let letter=0;for(const ch of code){if(ch==='|')letter++;else back.push(letter);}eq(back.join(),a.join());}
  eq(codes.size,total);const b=K.countBarStrings(n,k);eq(BigInt(b.count),pascal(n+k-1,n-1));}
eq(K.countBarStrings(20,10),null);eq(K.nthMultiset(5,3,1).join(),'0,0,0');eq(K.nthMultiset(5,3,35).join(),'4,4,4');
// Anagramlar: Set ile bütün permütasyonlar (bağımsız) ve bilinen değerler.
const perms=s=>{const out=new Set();const a=[...s],used=new Array(a.length).fill(false),cur=[];const rec=()=>{if(cur.length===a.length){out.add(cur.join(''));return;}for(let i=0;i<a.length;i++){if(used[i])continue;used[i]=true;cur.push(a[i]);rec();cur.pop();used[i]=false;}};rec();return out;};
for(const w of['KELEBEK','ANANAS','ABC','AAAA','ÇİÇEK','BAB']){const L=K.parseWord(w),ref=perms(L.join('')),A=K.anagrams(L,K.LIMIT,1e9);eq(A.count,ref.size,w);eq(K.multinomial(L).count,BigInt(ref.size));eq(new Set(A.first).size,A.first.length);ok(A.first.every(x=>ref.has(x)));}
eq(K.anagrams(K.parseWord('KELEBEK')).count,420);eq(K.anagrams(K.parseWord('MISSISSIPPI')).count,34650);eq(K.multinomial(K.parseWord('MISSISSIPPI')).count,34650n);
eq(K.anagrams(K.parseWord('KOMBİNATORİK')).count,null);eq(K.multinomial(K.parseWord('KOMBİNATORİK')).count,59875200n);
eq(K.parseWord('kelebek').join(''),'KELEBEK');eq(K.parseWord('i ı').join(''),'İI');eq(K.parseWord('a1'),null);eq(K.parseWord(''),null);eq(K.parseWord('A'.repeat(21)),null);
eq(K.multinomial(K.parseWord('ABCDEFGHIJKLMNOPQRST')).count,fact(20));

/* 2. Güvercin yuvası ve doğum günü */
for(let N=1;N<=60;N+=3)for(let k=1;k<=20;k+=2){const q=Math.ceil(N/k);eq(K.ceilDiv(N,k),q);const b=K.balanced(N,k);eq(b.reduce((s,x)=>s+x,0),N);eq(Math.max(...b),q);
  for(let seed=1;seed<=5;seed++){const P=K.place(N,k,seed);eq(P.cnt.reduce((s,x)=>s+x,0),N);ok(P.max>=q);eq(P.cnt[P.arg],P.max);}ok(K.pigeonSweep(N,k,200,3).min>=q);}
{const P=K.place(13,4,1);eq(P.max,4);eq(P.cnt.join(),'2,4,4,3');const S=K.pigeonSweep(13,4,1000,1);eq(S.min,4);eq(S.max,9);eq(S.atBound,276);}
for(let n=2;n<=30;n++){for(let seed=1;seed<=20;seed++){const D=K.divisorDemo(n,n+1,seed);eq(D.xs.length,n+1);eq(new Set(D.xs).size,n+1);ok(D.xs.every(x=>x>=1&&x<=2*n));ok(D.pair&&D.pair[1]%D.pair[0]===0&&D.pair[0]<D.pair[1]);}
  const T=K.divisorTop(n);eq(K.hasDividingPair(T.xs),false);eq(T.boxes.size,n);eq(K.divisorSweep(n,n+1,200,7).hit,200);}
{const D=K.divisorDemo(10,11,1);eq(D.xs.join(),'2,4,5,7,10,12,13,14,15,17,20');eq(D.pair.join(),'2,4');}
// Tam olasılık BigInt kesirle: 1 − d!/((d − n)! dⁿ).
const bdRef=(n,d)=>{if(n>d)return 1;let num=1n;for(let i=0;i<n;i++)num*=BigInt(d-i);const den=BigInt(d)**BigInt(n);return 1-Number(num*10n**18n/den)/1e18;};
for(const d of[2,12,50,365,366,1000])for(let n=1;n<=100;n+=3)near(K.bdExact(n,d),bdRef(n,d),1e-12,`p(${n},${d})`);
near(K.bdExact(23,365),0.5072972343,1e-9);near(K.bdExact(22,365),0.4756953077,1e-9);eq(K.bdCross(365),23);eq(K.bdCross(12),5);eq(K.bdCross(366),23);eq(K.bdCross(365,K.bdApprox),23);
for(const d of[2,12,100,365,1000]){let n=1;while(bdRef(n,d)<0.5)n++;eq(K.bdCross(d),n);}
eq(K.bdExact(366,365),1);eq(K.bdExact(1,365),0);
for(const seed of[1,2,3]){const S=K.bdSim(365,100000,seed);eq(K.simCross(S),23);for(const n of[10,23,40,60]){const p=bdRef(n,365);near(K.simAt(S,n),p,4.5*Math.sqrt(p*(1-p)/1e5)+1e-9,`sim ${n}`);}eq(K.simAt(S,366),1);}
for(let seed=1;seed<=10;seed++)ok(Math.abs(K.simCross(K.bdSim(365,10000,seed))-23)<=1);
{const S=K.bdSim(365,10000,1);near(K.simAt(S,23),0.5035,1e-12);}

/* 3. İçerme–dışlama */
const brute=(N,D)=>{let c=0;for(let x=1;x<=N;x++)if(D.some(d=>x%d===0))c++;return c;};
for(const D of[[2],[2,3],[4,6],[2,3,5],[2,3,5,7],[6,10,15],[2,2],[4,2],[7,11,13,17],[30,29,28,27]])for(const N of[1,7,100,360,999,10000]){const T=K.ieTerms(N,D);eq(T.union,brute(N,D),`${D} ${N}`);const B=K.bruteRegions(N,D);eq(B.union,brute(N,D));eq(B.reg.reduce((s,x)=>s+x,0),N);eq(T.terms.length,2**D.length-1);}
{let phi=0;const g=(a,b)=>b?g(b,a%b):a;for(let x=1;x<=360;x++)if(g(x,360)===1)phi++;eq(K.bruteRegions(360,[2,3,5]).none,phi);eq(phi,96);}
eq(K.ieTerms(100,[4,6]).union,33);eq(K.ieTerms(1000,[2,3,5,7]).union,772);eq(K.ieTerms(100,[2,3,5]).union,74);
// Bonferroni: birikimli toplam j terimli katmandan sonra dönüşümlü üst/alt sınır.
{const T=K.ieTerms(1000,[2,3,5,7]);for(let j=1;j<=4;j++){const last=T.terms.filter(t=>t.size===j).pop().run;ok(j%2?last>=772:last<=772,'Bonferroni '+j);}}
// 4 elips Venn şemasının 16 bölgesi de dolu olmalı (sayfadaki geometri).
{const m=html.match(/const a=0\.9,b=0\.4,r=40\*Math\.PI\/180;return\[(.*?)\];\}/);ok(m,'dört elips tanımı');
  const E=[{c:[-0.15,-0.15],a:.9,b:.4,r:-40*Math.PI/180},{c:[0,0.15],a:.9,b:.4,r:-40*Math.PI/180},{c:[0,0.15],a:.9,b:.4,r:40*Math.PI/180},{c:[0.15,-0.15],a:.9,b:.4,r:40*Math.PI/180}];
  const seen=new Set();for(let i=0;i<=300;i++)for(let j=0;j<=300;j++){const x=-1.1+2.2*i/300,y=-1.1+2.2*j/300;let mask=0;E.forEach((e,k)=>{const dx=x-e.c[0],dy=y-e.c[1],u=dx*Math.cos(e.r)+dy*Math.sin(e.r),v=-dx*Math.sin(e.r)+dy*Math.cos(e.r);if((u/e.a)**2+(v/e.b)**2<1)mask|=1<<k;});seen.add(mask);}eq(seen.size,16);}
// Düzensizlikler: kendi permütasyon taraması ve farklı özyineleme D(n) = n D(n − 1) + (−1)ⁿ.
const refD=[1n];for(let n=1;n<=40;n++)refD.push(BigInt(n)*refD[n-1]+(n%2?-1n:1n));
const rec=K.derangeRec(40);for(let n=0;n<=40;n++){eq(rec[n],refD[n]);eq(K.derangeIE(n),refD[n]);}
eq(refD[20],895014631192902121n);eq(refD[10],1334961n);eq(refD[6],265n);
for(let n=1;n<=8;n++){const h=new Array(n+1).fill(0);const a=[],used=new Array(n).fill(false);const r=()=>{if(a.length===n){h[a.filter((x,i)=>x===i).length]++;return;}for(let x=0;x<n;x++)if(!used[x]){used[x]=true;a.push(x);r();a.pop();used[x]=false;}};r();
  eq(K.permFixedHist(n).join(),h.join(),'sabit nokta dağılımı '+n);const fd=K.fixedDist(n);fd.forEach((p,j)=>near(p,h[j]/Number(fact(n)),1e-15));}
eq(K.permFixedHist(10)[0],1334961);eq(K.permFixedHist(10).reduce((s,x)=>s+x,0),3628800);eq(K.permFixedHist(11),null);
for(let n=1;n<=20;n++){const e=K.factOverE(n),v=Number(e.int)+e.frac;near(v,Number(fact(n))/Math.E,Number(fact(n))*1e-15+1e-12);const diff=Number(refD[n]-e.int)-e.frac;ok(Math.abs(diff)<1/(n+1),'|D − n!/e| < 1/(n+1)');
  eq(refD[n],e.frac>=0.5?e.int+1n:e.int,'D(n) en yakın tam sayı');}
near(K.factOverE(6).frac,0.873197643,1e-9);
for(const n of[3,6,10,20]){const h=K.hatSim(n,100000,5),p=Number(refD[n]*10n**15n/fact(n))/1e15;eq(h.reduce((s,x)=>s+x,0),100000);near(h[0]/1e5,p,4.5*Math.sqrt(p*(1-p)/1e5));eq(h[n-1],0,'tam n − 1 sabit nokta olamaz');}
{const h=K.hatSim(6,10000,1);eq(h[0],3736);}

/* 4. Catalan */
// Kafes yolu DP: köşegenin altına inmeyen yollar.
const latticeCat=n=>{const W=Array.from({length:n+1},()=>new Array(n+1).fill(0n));W[0][0]=1n;for(let i=0;i<=n;i++)for(let j=0;j<=i;j++){if(!i&&!j)continue;W[i][j]=(i>0&&j<=i-1?W[i-1][j]:0n)+(j>0?W[i][j-1]:0n);}return W[n][n];};
for(let n=0;n<=60;n++){eq(K.catalan(n),latticeCat(n),'C('+n+')');}
eq(K.catalan(10),16796n);eq(K.catalanRec(60)[60],K.catalan(60));eq(K.catalan(200).toString().length,117);
for(let n=1;n<=9;n++){const C=Number(K.catalan(n)),P=K.parens(n);eq(P.list.length,C);eq(P.scanned,4**n);eq(new Set(P.list).size,C);
  for(let i=1;i<P.list.length;i++)ok(P.list[i-1]<P.list[i],'sıralı');for(const w of P.list){let h=0;for(const ch of w){h+=ch==='('?1:-1;if(h<0)assert.fail();}eq(h,0);}
  const D=K.dyckCount(n);eq(D.count,C);eq(BigInt(D.scanned),pascal(2*n,n));
  const T=K.trees(n);eq(T.length,C);eq(new Set(T.map(t=>JSON.stringify(t))).size,C);ok(T.every(t=>K.treeSize(t)===n));
  const Tr=K.triangulationCount(n);eq(Tr.count,C);eq(Tr.diagonals,(n+2)*(n-1)/2);
  // Eşleme: dizi → ağaç birebir; ağaç → n üçgen, n − 1 farklı ve kesişmeyen köşegen.
  const seen=new Set();for(const w of P.list){const t=K.treeFromParens(w);seen.add(JSON.stringify(t));eq(K.treeSize(t),n);const tris=K.triFromTree(t,n);eq(tris.length,n);
    const m=n+2,side=(a,b)=>Math.abs(a-b)===1||Math.abs(a-b)===m-1,dg=new Set();for(const tr of tris){ok(tr[0]<tr[1]&&tr[1]<tr[2]);for(const[a,b]of[[tr[0],tr[1]],[tr[1],tr[2]],[tr[0],tr[2]]])if(!side(a,b))dg.add(a+'-'+b);}
    eq(dg.size,n-1);const arr=[...dg].map(s=>s.split('-').map(Number));for(let i=0;i<arr.length;i++)for(let j=i+1;j<arr.length;j++)if(K.crosses(arr[i],arr[j]))assert.fail('kesişen köşegen');}
  eq(seen.size,C);}
// Büyüme: oran BigInt ile ölçeklenmiş bağımsız hesap; açılım hatası O(n⁻³).
for(const n of[1,5,10,50,100,200]){const r=K.catRatio(n);const lg=Math.log10(Number(K.catalan(n)*10n**20n/(4n**BigInt(n)))/1e20)+1.5*Math.log10(n)+0.5*Math.log10(Math.PI);near(r,10**lg,1e-12);
  if(n>=10)ok(Math.abs(r-K.catTheory(n))<2/n**3,'açılım '+n);}
near(K.catRatio(50),0.977944278,1e-8);near(K.catRatio(200),0.99440318,1e-8);
console.log(`G kombinatorik-ve-sayma: ${checks.toLocaleString('tr-TR')} bağımsız çekirdek kontrolü PASS`);

if(process.argv.includes('--browser')){
  const {chromium}=await import('playwright');const {createServer}=await import('node:http');const {join,extname}=await import('node:path');const {fileURLToPath}=await import('node:url');const root=fileURLToPath(new URL('../',import.meta.url));
  const server=createServer((req,res)=>{const file=join(root,decodeURIComponent(new URL(req.url,'http://localhost').pathname));if(!fs.existsSync(file)||fs.statSync(file).isDirectory()){res.writeHead(404).end();return;}res.setHeader('Content-Type',({'.html':'text/html; charset=utf-8','.js':'text/javascript; charset=utf-8','.css':'text/css; charset=utf-8'})[extname(file)]||'application/octet-stream');res.end(fs.readFileSync(file));});await new Promise(r=>server.listen(0,'127.0.0.1',r));let browser;const before=checks;
  try{browser=await chromium.launch();
    for(const[theme,width]of[['light',390],['dark',1280]]){
      const page=await browser.newPage({viewport:{width,height:900},deviceScaleFactor:width===390?2:1});await page.addInitScript(t=>{localStorage.setItem('acelya-theme',t);localStorage.setItem('acelya-sound-muted','1');},theme);page.setDefaultTimeout(8000);
      const errors=[];page.on('pageerror',e=>errors.push(e.message));
      page.on('response',r=>{if(r.status()>=400)errors.push(r.status()+' '+r.url());});
      page.on('console',m=>{if(m.type()==='error'&&!/Failed to load resource/.test(m.text()))errors.push(m.text());});
      await page.goto(`http://127.0.0.1:${server.address().port}/kombinatorik-ve-sayma.html`);
      await page.locator('.digest .digest-core').first().waitFor({state:'visible',timeout:8000});ok(await page.locator('.digest').isVisible(),'defter görünür');
      {const txt=await page.evaluate(()=>document.body.textContent);ok(txt.includes("Euler 1751'de Goldbach'a"),'Euler 1751 notu');ok(!txt.includes('parantezleme problemi üzerine yazan'),'eski Catalan cümlesi yok');ok(txt.includes('John Riordan'),'Riordan adlandırması');}
      const click=id=>page.locator('#'+id).click(),read=async id=>(await page.locator('#'+id).textContent()).replace(/ /g,' '),set=(id,v)=>page.locator('#'+id).evaluate((e,v)=>{e.value=v;e.dispatchEvent(new Event(e.tagName==='SELECT'?'change':'input',{bubbles:true}));},v),is=async(id,t)=>{eq(await read(id),t,id);},has=async(id,t)=>{const s=await read(id);ok(s.includes(t),`${id}: “${s}” içinde “${t}” yok`);},fits=async()=>eq(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),true,'yatay taşma');
      eq(await page.evaluate(()=>[...document.querySelectorAll('.app-content input,.app-content select')].filter(e=>!document.querySelector('label[for="'+e.id+'"]')).map(e=>e.id).join()),'');
      eq(await page.evaluate(()=>{const cs=[...document.querySelectorAll('.app-content canvas')];return cs.length===8&&cs.every(c=>c.getAttribute('role')==='img'&&!!c.getAttribute('aria-label'));}),true);
      eq(await page.evaluate(()=>Object.isFrozen(CombinatoricsLab)&&!Object.getOwnPropertyDescriptor(window,'CombinatoricsLab').writable),true);
      eq(await page.evaluate(()=>/[̀-ͯ]/.test(document.body.innerText)),false,'birleşik aksan işareti yok');
      eq(await page.evaluate(()=>document.querySelectorAll('input[type=number]').length),0);
      // 01 · Seçimler
      await is('cP','60');await is('cPR','125');await is('cC','10');await is('cCR','35');await is('cCm','sayılan 10 · fark 0');await has('cStatus','Bütün 125 harf dizisi');await has('cStatus','6 = 3!');
      await is('cPage','Sayfa 1 / 1 · öğe 1–10');eq(await page.locator('#cList span').count(),10);eq(await page.locator('#cList span').first().textContent(),'{A,B,C}');
      await is('sbSet','{A,A,A}');await is('sbCode','★★★││││');await is('sbCount','35');await has('sbCountTh','C(7, 4) = 35 · fark 0');await is('sbROut','1 / 35');await set('sbR',35);await is('sbSet','{E,E,E}');await is('sbCode','││││★★★');
      await is('aFormula','420');await is('aBrute','420');await has('aStatus','5 040 / 12 = 420');
      await set('cKind','P');await is('cPage','Sayfa 1 / 2 · öğe 1–30');await click('cNext');await is('cPage','Sayfa 2 / 2 · öğe 31–60');eq(await page.locator('#cNext').isDisabled(),true);eq(await page.locator('#cList span').last().textContent(),'EDC');
      await click('cPreset2010');await is('cC','184 756');await is('cCm','sayılan 184 756 · fark 0');await is('cPR','10 240 000 000 000');await is('cPRm','sayılmadı: 2 000 000 sınırı aşıldı');await is('cCR','20 030 010');await has('cStatus','doğrudan sayıldı');await is('cPage','Sayfa 1 / 6 159 · öğe 1–30');await is('sbCount','sayılmadı');
      await click('cPresetKN');await is('cP','0');await is('cC','0');await is('cCR','21');await is('cPR','243');await has('cStatus','k > n');await is('cNOut','3');await is('cKOut','5');
      await set('cKind','C');await is('cPage','Liste boş: bu türde seçim yok.');
      await set('cN',20);await set('cK',20);await is('cPR','104 857 600 000 000 000 000 000 000');await is('cP','2 432 902 008 176 640 000');await is('cC','1');await is('cCm','sayılan 1 · fark 0');
      await set('cN',1);await set('cK',0);await is('cP','1');await is('cCR','1');await has('cStatus','k = 0');await is('sbCode','(boş)');
      await click('aMiss');await is('aFormula','34 650');await is('aBrute','34 650');await click('aLong');await is('aFormula','59 875 200');await is('aBrute','sayılmadı');await click('aAnanas');await is('aBrute','60');
      await set('aWord','x1');await has('aStatus','Geçersiz');await is('aFormula','—');await set('aWord','çiçek');await is('aFormula','60');
      await click('countReset');await is('cC','10');await is('aFormula','420');await is('sbROut','1 / 35');eq(await page.locator('#cKind').inputValue(),'C');await fits();
      await page.locator('#tab-count').focus();await page.keyboard.press('ArrowRight');eq(await page.locator('#tab-pigeon').getAttribute('aria-selected'),'true');
      // 02 · Güvercin yuvası ve doğum günü
      await is('pMax','4');await is('pBound','4');await is('pBal','4');await is('pSweep','4');await has('pSweepNote','276 / 1 000');await has('pStatus','en az 4 nesne');
      await is('dPair','2 | 4');await is('dSweep','1 000 / 1 000');await has('dSet','2, 4, 5, 7, 10, 12, 13, 14, 15, 17, 20');
      await is('bExact','50,73 %');await is('bSim','50,35 %');await is('bApprox','51,55 %');await is('bCross','23');await has('bCrossNote','benzetim 23');await has('bSimNote','−0,8 σ');await has('bStatus','p(22) = 47,57 %');
      await click('pPlus1');await is('pBound','2');await is('pBal','2');await is('pNOut','11');await click('pMonth');await is('pBound','3');await set('pN',3);await set('pK',5);await has('pStatus','N ≤ k');await set('pK',1);await is('pMax','3');await has('pStatus','Tek kutu');
      await set('dCount','top');await is('dPair','Yok');await is('dSweep','Yok');await has('dStatus','11 … 20');eq(await page.locator('#dSeed').isDisabled(),true);await set('dCount','n');await has('dSweepNote','zorunlu değil');
      await click('b70');await is('bExact','99,92 %');await is('bNOut','70');await click('bMonth');await is('bCross','5');await is('bExact','61,81 %');await set('bN',13);await has('bStatus','güvercin yuvası');await is('bExact','100,00 %');await is('bSim','100,00 %');
      await set('bD',365);await set('bN',100);await is('bExact','> 99,99 %');await set('bN',1);await is('bExact','0,00 %');await has('bStatus','Tek kişi');
      await set('bTrials','100000');await set('bN',23);await is('bSim','50,80 %');await has('bCrossNote','benzetim 23');await set('bD',2);await is('bCross','2');await set('bD',1000);await is('bCross','38');
      await click('pigeonReset');await is('bExact','50,73 %');await is('bSim','50,35 %');await is('pMax','4');await is('dPair','2 | 4');eq(await page.locator('#dSeed').isDisabled(),false);await fits();
      await page.locator('#tab-pigeon').focus();await page.keyboard.press('ArrowRight');eq(await page.locator('#tab-ie').getAttribute('aria-selected'),'true');
      // 03 · İçerme–dışlama
      await is('iUnion','74');await is('iBrute','74');await is('iNone','26');await is('iNaive','103');eq(await page.locator('#iTerms tr').count(),8);
      await is('hD','265');await is('hBrute','265');await is('hE','264,8732');await has('hENote','+0,1268');await is('hSim','37,36 %');await has('hSimNote','36,81 %');
      await click('iPhi');await is('iNone','96');await has('iStatus','φ(360) = 96');await click('iLcm');await is('iUnion','33');await has('iStatus','ekok(4, 6) = 12');eq(await page.locator('#iTerms tr').count(),4);
      await click('iFour');await is('iUnion','772');await is('iBrute','772');eq(await page.locator('#iTerms tr').count(),16);
      await set('iD1','0');await set('iD2','0');await set('iD3','0');await set('iD4','0');await has('iStatus','Hiç bölen');await is('iUnion','—');await set('iD2','7');await has('iStatus','Tek küme');await is('iUnion','142');
      await set('iN',1);await is('iUnion','0');await is('iNone','1');await set('iN',10000);await set('iD1','2');await set('iD3','2');await has('iStatus','bölgeler boş');
      await click('hTen');await is('hBrute','1 334 961');await has('hStatus','2,3 × 10⁻⁶');await click('hTwo');await is('hD','1');await has('hStatus','İki kişi');
      await set('hN',20);await is('hD','895 014 631 192 902 121');await is('hBrute','sayılmadı');await has('hENote','+0,0455');await set('hN',1);await is('hD','0');await has('hStatus','Tek kişi');
      await click('ieReset');await is('iUnion','74');await is('hD','265');await is('iNOut','100');await fits();
      await page.locator('#tab-ie').focus();await page.keyboard.press('End');eq(await page.locator('#tab-cat').getAttribute('aria-selected'),'true');
      // 04 · Catalan
      for(const id of['tParens','tDyck','tTrees','tTri'])await is(id,'14');await has('tStatus','(((())))');await has('tRec','1·5 + 1·2 + 2·1 + 5·1 = 14');await is('tIdxOut','1 / 14');
      await click('tNext');await is('tIdxOut','2 / 14');await has('tStatus','((()()))');await click('tPrev');await click('tPrev');await is('tIdxOut','1 / 14');
      await is('gRatio','0,977944');await is('gTheory','0,977953');await is('gStep','3,882353');await has('gC','1 978 261 657 756 160 653 623 774 456');
      await set('tN',9);for(const id of['tParens','tDyck','tTrees','tTri'])await is(id,'4 862');await is('tIdxOut','1 / 4 862');await set('tIdx',4862);await has('tStatus','()()()()()()()()()');
      await set('tN',1);await is('tTri','1');await is('tIdxOut','1 / 1');
      await click('g200');await is('gC','5,122 × 10¹¹⁶');await is('gRatio','0,994403');await set('gN',1);await is('gStep','—');await has('gStatus','n küçükken');
      await click('catReset');await is('tParens','14');await is('gNOut','50');await fits();
      // R tuşu ve Home
      await set('gN',7);await page.locator('h1').click();await page.keyboard.press('r');await is('gNOut','50');
      await page.locator('#tab-cat').focus();await page.keyboard.press('Home');eq(await page.locator('#tab-count').getAttribute('aria-selected'),'true');
      for(const t of['pigeon','ie','cat','count']){await click('tab-'+t);await fits();eq(await page.locator('#panel-'+t).isVisible(),true);
        eq(await page.evaluate(t=>[...document.querySelectorAll('#panel-'+t+' canvas')].every(c=>{const d=c.getContext('2d').getImageData(0,0,c.width,c.height).data,s=new Set();for(let i=0;i<d.length;i+=4)s.add(d[i]+','+d[i+1]+','+d[i+2]);return s.size>2;}),t),true,t+' tuvali boş');}
      assert.deepEqual(errors,[]);checks++;await page.close();}
    console.log(`G kombinatorik-ve-sayma: ${checks-before} tarayıcı kontrolü PASS (390 px açık, 1280 px koyu)`);
  }finally{await browser?.close();await new Promise(r=>server.close(r));}
}
