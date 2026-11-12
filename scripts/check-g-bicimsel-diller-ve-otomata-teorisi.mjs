// G: biçimsel diller ve otomata laboratuvarı. Çekirdek, sayfanın formüllerini yinelemeyen
// bağımsız başvurularla sınanır: dil yüklemleri, kapalı biçimler, geri izlemeli NFA araması,
// JavaScript RegExp, gramerden en soldan türetme sayımı ve "()" silme indirgemesi.
// Kullanım: node scripts/check-g-bicimsel-diller-ve-otomata-teorisi.mjs [--browser]
import fs from 'node:fs';
import vm from 'node:vm';
import assert from 'node:assert/strict';
import { canvasInk, canvasInkAll, assertCanvasDrawn } from './lib/canvas-check.mjs';
const SLUG='bicimsel-diller-ve-otomata-teorisi';
const html=fs.readFileSync(new URL(`../${SLUG}.html`,import.meta.url),'utf8');
const source=html.split('/* KERNEL-BEGIN */')[1]?.split('/* KERNEL-END */')[0];
assert(source,'Çekirdek sınırları (KERNEL-BEGIN/END) gerekli');
const context={window:{}};vm.createContext(context);vm.runInContext(source,context);
const K=context.window.AutomataLab;let checks=0;
const eq=(a,b,msg)=>{assert.equal(JSON.stringify(a),JSON.stringify(b),msg||'beklenen değer');checks++;},ok=(c,msg)=>{assert(c,msg);checks++;};
const words=(alphabet,L)=>{const out=[''];for(let i=0;i<out.length;i++)if(out[i].length<L)for(const c of alphabet)out.push(out[i]+c);return out;};
let seed=20261111;const rnd=n=>{seed=(Math.imul(seed,1664525)+1013904223)>>>0;return seed%n;};

/* 1 · DFA hazırları: bağımsız yüklemler ve kapalı biçimler */
const B12=words('01',12),fib=n=>{let a=0,b=1;for(let i=0;i<n;i++)[a,b]=[b,a+b];return a;};
const PRED={even:w=>(w.split('0').length-1)%2===0&&(w.split('1').length-1)%2===0,ends01:w=>w.endsWith('01'),div3:w=>(w?BigInt('0b'+w):0n)%3n===0n,has11:w=>w.includes('11')};
const CLOSED={even:l=>l===0?1:l%2?0:2**(l-1),ends01:l=>l<2?0:2**(l-2),div3:l=>Math.floor((2**l-1)/3)+1,has11:l=>2**l-fib(l+2)};
for(const[id,p]of Object.entries(K.DFA_PRESETS)){const d=K.makeDfa(['0','1'],p.delta,p.accept);for(const w of B12)eq(K.dfaRun(d,w).accepted,PRED[id](w),`${id} / ${w}`);
 const brute=K.dfaCountBrute(d,12),mat=K.dfaCountMatrix(d,14);for(let l=0;l<=14;l++){eq(mat[l],CLOSED[id](l),`${id} kapalı biçim l=${l}`);if(l<=12)eq(brute[l],B12.filter(w=>w.length===l&&PRED[id](w)).length);}
 ok(K.dfaRun(d,p.sample).accepted,`${id} örnek dizgisi kabul edilmeli`);const bad=K.dfaRun(d,'01x1');eq([bad.valid,bad.badIndex,bad.badChar,bad.accepted],[false,2,'x',null]);eq(K.dfaRun(d,'').trace,[0]);}
// {a, b} alfabesi yalnız ad değiştirir.
{const p=K.DFA_PRESETS.div3,d=K.makeDfa(['a','b'],p.delta,p.accept);for(const w of words('ab',8))eq(K.dfaRun(d,w).accepted,PRED.div3(w.replace(/a/g,'0').replace(/b/g,'1')));eq(K.dfaRun(d,'0').valid,false);}
/* 2 · Rastgele DFA: sayım = matris; küçültme = kaba kuvvet ayırt edilebilirlik */
const classesBrute=d=>{const reach=new Set([0]),q=[0];while(q.length)for(const t of d.delta[q.pop()])if(!reach.has(t)){reach.add(t);q.push(t);}const W=words(d.alphabet,d.n),from=(s,w)=>{for(const c of w)s=d.delta[s][d.alphabet.indexOf(c)];return d.accept[s];};return{reachable:reach.size,minimal:new Set([...reach].map(s=>W.map(w=>+from(s,w)).join(''))).size};};
for(let t=0;t<300;t++){const n=2+rnd(5),d=K.makeDfa(['0','1'],Array.from({length:n},()=>[rnd(n),rnd(n)]),Array.from({length:n},()=>rnd(2)===1));eq(K.dfaCountBrute(d,9),K.dfaCountMatrix(d,9));const m=K.dfaMinimize(d),b=classesBrute(d);eq([m.reachable,m.minimal],[b.reachable,b.minimal]);}
for(const call of[()=>K.makeDfa(['0','1'],[[0,2],[0,0]],[true,false]),()=>K.makeDfa(['0','0'],[[0,0]],[true]),()=>K.makeDfa(['0','1'],[[0]],[true]),()=>K.kthFromEnd(0),()=>K.makeNfa(['0','1'],2,[[0,'2',1]],[1])]){assert.throws(call);checks++;}
/* 3 · NFA: geri izlemeli yol araması (kapanış ya da küme kullanmadan) */
const pathAccept=(nfa,w)=>{const dead=new Set;const go=(q,i)=>{const key=q+':'+i;if(dead.has(key))return false;dead.add(key);if(i===w.length&&nfa.accept[q])return true;for(const[f,c,t]of nfa.edges){if(f!==q)continue;if(c===K.EPS&&go(t,i))return true;if(i<w.length&&c===w[i]&&go(t,i+1))return true;}return false;};return go(0,0);};
const NPRED={eps01:w=>/^0*1*$/.test(w),mod23:w=>w.length%2===0||w.length%3===0,ends01:w=>w.endsWith('01'),opt:w=>/^(01)*1?$/.test(w)};
const B10=words('01',10);
for(const[id,p]of Object.entries(K.NFA_PRESETS)){if(id==='kth')continue;const nfa=p.build(),sub=K.subsetConstruction(nfa);for(const w of B10){const a=K.nfaRun(nfa,w).accepted;eq(a,NPRED[id](w),`${id} / ${w}`);eq(K.dfaRun(sub.dfa,w).accepted,a);}ok(K.nfaRun(nfa,p.sample).accepted);const e=K.equivalence(nfa,sub.dfa,10);eq([e.tested,e.mismatches,e.accepted],[2047,0,B10.filter(NPRED[id]).length]);ok(sub.subsets.length<=2**nfa.n);}
eq(K.subsetConstruction(K.NFA_PRESETS.eps01.build()).subsets,[[0,1],[1],[]]);eq(K.subsetConstruction(K.NFA_PRESETS.mod23.build()).subsets.length,7);eq(K.dfaMinimize(K.subsetConstruction(K.NFA_PRESETS.mod23.build()).dfa).minimal,6);
for(let k=1;k<=10;k++){const nfa=K.kthFromEnd(k),sub=K.subsetConstruction(nfa);eq(nfa.n,k+1);eq(sub.subsets.length,2**k,`k=${k} ulaşılabilir`);eq(K.dfaMinimize(sub.dfa).minimal,2**k,`k=${k} en küçük`);if(k<=5)for(const w of B10){const want=w.length>=k&&w[w.length-k]==='1';eq(K.nfaRun(nfa,w).accepted,want);eq(K.dfaRun(sub.dfa,w).accepted,want);eq(pathAccept(nfa,w),want);}}
for(let t=0;t<200;t++){const n=1+rnd(5),edges=[];for(let i=0,m=1+rnd(3*n);i<m;i++)edges.push([rnd(n),[K.EPS,'0','1'][rnd(3)],rnd(n)]);const nfa=K.makeNfa(['0','1'],n,edges,[rnd(n)]),sub=K.subsetConstruction(nfa);ok(sub.subsets.length<=2**n);for(const w of words('01',6)){const want=pathAccept(nfa,w);eq(K.nfaRun(nfa,w).accepted,want);eq(K.dfaRun(sub.dfa,w).accepted,want);}eq(K.equivalence(nfa,sub.dfa,7).mismatches,0);}
// Bilerek bozulmuş bir DFA yakalanmalı.
{const nfa=K.kthFromEnd(2),sub=K.subsetConstruction(nfa),broken=K.makeDfa(['0','1'],sub.dfa.delta,sub.dfa.accept.map((a,i)=>i===3?!a:a)),e=K.equivalence(nfa,broken,6);ok(e.mismatches>0&&typeof e.first==='string');}
/* 4 · Düzenli ifadeler: JavaScript RegExp başvuru */
const STATES={'(a|b)*abb':14,'a*b*':8,'(ab)+':6,'(a|b)*a(a|b)(a|b)':22,'(00|11|(01|10)(00|11)*(01|10))*':44,'a?b+':8,'':2,'a':2,'(a|)b':8,'a|b|ab':10};
for(const[src,states]of Object.entries(STATES)){const c=K.regexCompile(src);eq(c.states,states,src);eq(c.states,2*(c.leaves+c.ops));eq(c.nfa.n,states);const seen=new Set([0]),st=[0];while(st.length){const q=st.pop();for(const[f,,t]of c.nfa.edges)if(f===q&&!seen.has(t)){seen.add(t);st.push(t);}}eq(seen.size,states,'her durum başlangıçtan ulaşılabilir');
 const js=new RegExp('^(?:'+src+')$'),W=words(c.alphabet,7);for(const w of W){eq(K.regexMatch(c,w).accepted,js.test(w),`${src} / ${w}`);}const cmp=K.regexCompare(c,7);eq([cmp.tested,cmp.mismatches,cmp.accepted],[W.length,0,W.filter(w=>js.test(w)).length]);}
eq(K.dfaMinimize(K.subsetConstruction(K.regexCompile('(a|b)*abb').nfa).dfa).minimal,4);
eq(K.dfaMinimize(K.subsetConstruction(K.regexCompile('(00|11|(01|10)(00|11)*(01|10))*').nfa).dfa).minimal,4);
eq(K.dfaMinimize(K.subsetConstruction(K.regexCompile('(a|b)*a(a|b)(a|b)').nfa).dfa).minimal,8);
const gen=d=>{const r=rnd(d>0?8:2);if(r<2)return'ab'[rnd(2)];if(r<4)return gen(d-1)+gen(d-1);if(r===4)return'('+gen(d-1)+'|'+gen(d-1)+')';return'('+gen(d-1)+')'+'*+?'[rnd(3)];};
for(let t=0;t<250;t++){const src=gen(3);if(src.length>60)continue;const c=K.regexCompile(src),js=new RegExp('^(?:'+src+')$');for(const w of words('ab',6))eq(K.regexMatch(c,w).accepted,js.test(w),`${src} / ${w}`);}
for(const[bad,pos]of[['a**',2],['(a',0],['a)',1],['*a',0],['ac',1],['a|*',2],['a+?',2],['(a|b))',5]]){try{K.regexCompile(bad);assert.fail(bad+' kabul edildi');}catch(e){ok(e.name==='RangeError',bad);eq(e.pos,pos,bad);}}
eq(K.regexMatch(K.regexCompile('a*'),'ac').valid,false);
/* 5 · Pompalama */
const anbn=w=>{let i=0;while(w[i]==='a')i++;const a=i;while(w[i]==='b')i++;return i===w.length&&2*a===w.length;};
for(let p=1;p<=8;p++){const s='a'.repeat(p)+'b'.repeat(p);for(let x=0;x<2*p;x++)for(let y=1;x+y<=2*p;y++)for(let i=0;i<=4;i++){const r=K.pump('anbn',p,x,y,i),want=s.slice(0,x)+s.slice(x,x+y).repeat(i)+s.slice(x+y);eq(r.pumped,want);eq(r.inLang,anbn(want));if(x+y<=p)eq(r.inLang,i===1,'aⁿbⁿ: lemmanın izin verdiği bölmelerde yalnız i = 1 dilde kalır');else if(i===0)eq(r.inLang,y%2===0&&x===p-y/2,'ortadan aʲbʲ silmek dilde bırakır');eq(r.lemma,x+y<=p);}
 const a=K.pumpSurvey('anbn',p);eq([a.splits,a.survivors],[p*(p+1)/2,0]);const b=K.pumpSurvey('abstar',p);let want=0;for(let y=2;y<=p;y+=2)want+=p-y+1;eq([b.splits,b.survivors],[p*(p+1)/2,want]);}
for(const call of[()=>K.pump('anbn',4,0,0,2),()=>K.pump('anbn',4,7,2,2),()=>K.pump('yok',4,0,1,2)]){assert.throws(call);checks++;}
/* 6 · CYK: en soldan türetmeleri sayan bağımsız üreteç */
function derive(g,L){const vars=new Set(g.rules.map(r=>r[0])),count=new Map;let layer=[[g.start]];while(layer.length){const next=[];for(const form of layer){const i=form.findIndex(x=>vars.has(x));if(i<0){const w=form.join('');count.set(w,(count.get(w)||0)+1);continue;}for(const r of g.rules)if(r[0]===form[i]){const f=[...form.slice(0,i),...r.slice(1),...form.slice(i+1)];if(f.length<=L)next.push(f);}}layer=next;}return count;}
const CAT=[1,1,2,5,14,42,132];
for(const[id,g]of Object.entries(K.GRAMMARS)){const L=g.terminals.length>2?5:8,lang=derive(g,L);for(const w of words(g.terminals,L)){const r=K.cyk(g,w);if(!w){eq([r.accepted,r.count,r.cells],[false,0,0]);continue;}eq(r.count,lang.get(w)||0,`${id} / ${w} ağaç sayısı`);eq(r.accepted,lang.has(w));eq(K.RECOGNIZERS[id](w),lang.has(w),`${id} tanıyıcı / ${w}`);eq(r.splitChecks,(w.length**3-w.length)/6);eq(r.cells,w.length*(w.length+1)/2);}
 for(const r of g.rules)ok(r.length===3?!g.terminals.includes(r[1])&&!g.terminals.includes(r[2]):r.length===2&&g.terminals.includes(r[1]),`${id} Chomsky normal biçiminde`);
 if(['parenU','anbn','arith','pal'].includes(id))ok([...lang.values()].every(c=>c===1),`${id} belirsiz olmamalı`);}
for(let k=1;k<=6;k++){eq(K.cyk(K.GRAMMARS.paren,'()'.repeat(k)).count,CAT[k-1]);eq(K.catalan(k-1),CAT[k-1]);eq(K.treeTheory('paren','()'.repeat(k)).value,CAT[k-1]);eq(K.cyk(K.GRAMMARS.parenU,'()'.repeat(k)).count,1);}
for(let m=0;m<=5;m++){const w='x'+'+x'.repeat(m);eq(K.cyk(K.GRAMMARS.arithA,w).count,CAT[m]);eq(K.treeTheory('arithA',w).value,CAT[m]);eq(K.cyk(K.GRAMMARS.arith,w).count,1);}
eq(K.cyk(K.GRAMMARS.arithA,'x+x*x').count,2);eq(K.treeTheory('paren','(())()'),null);eq(K.cyk(K.GRAMMARS.paren,'(()').accepted,false);eq(K.cyk(K.GRAMMARS.paren,'(a)').valid,false);
for(const[id,w]of[['paren','()()()()'],['arithA','x+x*x+x'],['arithA','x+x*x'],['pal','abba'],['arith','(x+x)*x']]){const g=K.GRAMMARS[id],r=K.cyk(g,w),seen=new Set,rules=new Set(g.rules.map(x=>x.join(' ')));for(let i=0;i<r.count;i++){const t=K.cykTree(r,i);seen.add(K.treeText(t));const leaves=[];(function walk(n){if(n.kids){ok(rules.has([n.v,n.kids[0].v,n.kids[1].v].join(' ')));n.kids.forEach(walk);}else{ok(rules.has(n.v+' '+n.leaf));leaves.push(n.leaf);}})(t);eq(leaves.join(''),w);eq(t.v,g.start);}eq(seen.size,r.count,`${id} / ${w}: ağaçlar birbirinden farklı`);assert.throws(()=>K.cykTree(r,r.count));checks++;}
for(const id of['paren','anbn','pal']){const s=K.cfgSurvey(id);eq([s.tested,s.mismatches],[2046,0]);}
eq(K.cfgSurvey('paren').inLang,1+2+5+14+42);eq(K.cfgSurvey('anbn').inLang,5);eq(K.cfgSurvey('pal').inLang,2*(2+4+8+16+32));eq(K.cfgSurvey('arith').mismatches,0);
/* 7 · Yığınlı otomat: "()" çiftlerini silerek indirgeme */
const reduce=w=>{let p;do{p=w;w=w.replace('()','');}while(w!==p);return w==='';};
for(const w of words('()',11)){const r=K.pdaBalanced(w);eq(r.accepted,reduce(w),w);let d=0,max=0,stuck=-1;for(let i=0;i<w.length;i++){d+=w[i]==='('?1:-1;if(d<0){stuck=i;break;}max=Math.max(max,d);}eq([r.maxDepth,r.stuckAt],[max,stuck]);eq(r.steps.length,stuck<0?w.length+1:stuck+2);ok(r.steps.every(s=>s.stack[0]==='Z'&&!s.stack.slice(1).includes('Z')));}
eq(K.pdaBalanced('(x)').valid,false);eq(K.pdaBalanced('').accepted,true);
ok(Object.isFrozen(K));
console.log(`G ${SLUG}: ${checks.toLocaleString('tr-TR')} bağımsız çekirdek kontrolü PASS`);

if(process.argv.includes('--browser')){
 const {chromium}=await import('playwright');const {createServer}=await import('node:http');const {join,extname}=await import('node:path');const {fileURLToPath}=await import('node:url');const root=fileURLToPath(new URL('../',import.meta.url));
 const server=createServer((req,res)=>{const file=join(root,decodeURIComponent(new URL(req.url,'http://localhost').pathname));if(!fs.existsSync(file)||fs.statSync(file).isDirectory()){res.writeHead(404).end();return;}res.setHeader('Content-Type',({'.html':'text/html; charset=utf-8','.js':'text/javascript; charset=utf-8','.css':'text/css; charset=utf-8'})[extname(file)]||'application/octet-stream');res.end(fs.readFileSync(file));});await new Promise(r=>server.listen(0,'127.0.0.1',r));let browser,code=0;
 try{browser=await chromium.launch();
  for(const[theme,width]of[['light',390],['dark',1280]]){const before=checks,page=await browser.newPage({viewport:{width,height:900},deviceScaleFactor:width<500?2:1});await page.addInitScript(t=>{localStorage.setItem('acelya-theme',t);localStorage.setItem('acelya-sound-muted','1');},theme);page.setDefaultTimeout(5000);const errors=[];page.on('pageerror',e=>errors.push(e.message));page.on('console',m=>{if(m.type()==='error'&&!/Failed to load resource/.test(m.text()))errors.push(m.text());});await page.goto(`http://127.0.0.1:${server.address().port}/${SLUG}.html`);
   const click=id=>page.locator('#'+id).click(),read=id=>page.locator('#'+id).textContent(),has=async(id,text)=>{const t=await read(id);assert(t.includes(text),`${id}: “${t}” içinde “${text}” yok`);checks++;},range=(id,v)=>page.locator('#'+id).evaluate((e,v)=>{e.value=v;e.dispatchEvent(new Event('input',{bubbles:true}));},String(v)),type=(id,v)=>page.locator('#'+id).fill(v),pick=(id,v)=>page.locator('#'+id).selectOption(v),noflow=async()=>eq(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),true,'yatay taşma'),painted=async id=>ok(assertCanvasDrawn(await canvasInk(page,'#'+id),{minDistinct:2,label:id}),id+' boş');
   // 01 · DFA
   await has('dfaVerdict','KABUL');await has('dfaCntMeas','171');await has('dfaCntTheory','171');await has('dfaCntDiff','fark 0');await has('dfaMin','4 · 4');await has('dfaStatus','q0 —0→ q1 —1→ q3 —0→ q2 —1→ q0');await painted('dfaCanvas');await painted('dfaChart');
   await click('dfaRewind');await has('dfaVerdict','Henüz bitmedi');await click('dfaStep');await has('dfaVerdictNote','1 / 4');await click('dfaStep');await click('dfaStep');await click('dfaStep');await has('dfaVerdict','KABUL');await click('dfaStep');await has('dfaVerdictNote','1 / 4');
   await type('dfaInput','0121');await has('dfaStatus','3. sıradaki “2”');await has('dfaVerdict','—');eq(await page.locator('#dfaInput').getAttribute('aria-invalid'),'true');await click('dfaRun');await has('dfaVerdict','—');
   await type('dfaInput','');await has('dfaVerdict','KABUL');await has('dfaStatus','Boş dizgi');eq(await page.locator('#dfaInput').getAttribute('aria-invalid'),'false');
   await pick('dfaPreset','div3');await has('dfaCntMeas','175');await has('dfaVerdict','KABUL');await has('dfaStatus','q0 —1→ q1 —0→ q2 —0→ q1 —1→ q0');await pick('dfaPreset','ends01');await has('dfaCntMeas','127');await pick('dfaPreset','has11');await has('dfaCntMeas','369');await has('dfaCntTheory','369');
   await range('dfaN',0);await has('dfaCntMeas','0');await range('dfaN',14);await has('dfaCntMeas','30.185');await has('dfaCntTheory','30.185');await has('dfaCntDiff','fark 0');
   await pick('dfaAlphabet','ab');await has('dfaH0','a ile');eq(await page.locator('#dfaInput').inputValue(),'abba');await has('dfaVerdict','KABUL');await type('dfaInput','0');await has('dfaStatus','Geçersiz girdi');
   await range('dfaStates',6);eq(await page.locator('#dfaEdit tr').count(),6);eq(await page.locator('#dfaPreset').inputValue(),'custom');await has('dfaMin','3 · 3');await range('dfaStates',2);eq(await page.locator('#dfaEdit tr').count(),2);await page.locator('#dfaT-0-0').selectOption('1');await page.locator('#dfaA-1').check();await type('dfaInput','a');await has('dfaVerdict','KABUL');
   await click('dfaReset');await has('dfaCntMeas','171');eq(await page.locator('#dfaInput').inputValue(),'0101');eq(await page.locator('#dfaAlphabet').inputValue(),'01');
   await click('dfaRun');await page.waitForFunction(()=>document.getElementById('dfaRun').textContent==='Çalıştır'&&document.getElementById('dfaVerdict').textContent==='KABUL',null,{timeout:5000});checks++;await noflow();
   // 02 · NFA → DFA
   await click('tab-nfa');await has('nfaN','4');await has('nfaBound','16');await has('sdfaN','8');await has('sdfaNNote','fark 0');await has('sdfaMin','8');await has('nfaVerdict','NFA: KABUL · DFA: KABUL');await has('nfaEq','2.047 dizgi · 0 uyuşmazlık');eq(await page.locator('#subRows tr').count(),8);eq(await page.locator('#blowRows tr').count(),10);await has('blowRows','1.024');await painted('nfaCanvas');await painted('sdfaCanvas');
   await click('subClear');await has('sdfaN','1 bulundu');await has('sdfaMin','—');await click('subStep');await has('sdfaN','2 bulundu');await has('nfaStatus','D0 = {q0} işlendi');await click('subAll');await has('sdfaN','8');
   await range('nfaK',8);await has('sdfaN','256');await has('nfaBound','512');await has('sdfaMin','256');await painted('sdfaCanvas');await range('nfaK',1);await has('sdfaN','2');await has('nfaVerdict','NFA: RET');
   await pick('nfaPreset','mod23');await has('nfaN','6');await has('sdfaN','7');await has('sdfaMin','6');await has('nfaNNote','2 tanesi ε');eq(await page.locator('#nfaK').isDisabled(),true);await pick('nfaPreset','eps01');await has('sdfaN','3');await has('subRows','∅');await has('nfaEqNote','kanıt değerinde');
   await type('nfaInput','01a');await has('nfaTrace','3. sıradaki “a”');await has('nfaVerdict','—');await type('nfaInput','');await has('nfaVerdict','NFA: KABUL · DFA: KABUL');await range('nfaL',0);await has('nfaEq','1 dizgi');await range('nfaL',12);await has('nfaEq','8.191 dizgi · 0 uyuşmazlık');
   await click('nfaReset');await has('sdfaN','8');eq(await page.locator('#nfaInput').inputValue(),'0100');await noflow();
   // 03 · Düzenli ifadeler
   await click('tab-re');await has('reVerdict','NFA: KABUL · RegExp: KABUL');await has('reStates','14 · 2 × 7 = 14');await has('reDfa','5 · 4');await has('reAgree','127 dizgi · 127 uyuşma');await has('reAgreeNote','fark 0');await painted('reCanvas');
   await has('pumpVerdict','Dilde değil');await has('pumpVerdictNote','6 tane a, 4 tane b');await has('pumpSurvey','10 bölmenin 0 tanesi');
   for(const[v,states]of[['a*b*','8 ·'],['(ab)+','6 ·'],['(a|b)*a(a|b)(a|b)','22 ·'],['(00|11|(01|10)(00|11)*(01|10))*','44 ·'],['a?b+','8 ·']]){await pick('rePreset',v);await has('reStates',states);await has('reVerdict','NFA: KABUL · RegExp: KABUL');await has('reAgreeNote','fark 0');}
   await pick('rePreset','(00|11|(01|10)(00|11)*(01|10))*');await has('reDfa','· 4');await has('reAgreeNote','{0, 1}');await range('reL',8);await has('reAgree','511 dizgi · 511 uyuşma');await range('reL',1);await has('reAgree','3 dizgi · 3 uyuşma');
   await type('rePattern','(a|b');await has('reStatus','Açılan parantez kapanmamış');await has('reStates','—');eq(await page.locator('#rePattern').getAttribute('aria-invalid'),'true');eq(await page.locator('#rePreset').inputValue(),'custom');await type('rePattern','a**');await has('reStatus','Art arda iki yineleme');await type('rePattern','');await has('reStates','2 · 2 × 1 = 2');await type('reInput','');await has('reVerdict','NFA: KABUL · RegExp: KABUL');
   await type('rePattern','a*');await type('reInput','ac');await has('reStatus','2. sıradaki “c”');await has('reStatus','ifadenin alfabesiyle yeniden yaz');await has('reVerdict','—');
   await range('pumpI',1);await has('pumpVerdict','Dilde');await range('pumpI',0);await has('pumpVerdictNote','2 tane a, 4 tane b');await range('pumpX',3);await range('pumpY',2);await has('pumpStatus','lemma bu bölmeyi saymaz');await has('pumpVerdictNote','a³b³');await range('pumpI',2);await has('pumpVerdict','Dilde değil');await has('pumpStatus','sıra bozuldu');
   await range('pumpP',8);await has('pumpSurvey','36 bölmenin 0 tanesi');await range('pumpP',1);await has('pumpSurvey','1 bölmenin 0 tanesi');eq(await page.locator('#pumpX').inputValue(),'1');eq(await page.locator('#pumpY').inputValue(),'1');
   await pick('pumpLang','abstar');await has('pumpStatus','p ≥ 2 seç');await has('pumpStatus','tuzak durumuyla 3');await has('pumpSurveyNote','kuram burada söz vermez');await range('pumpP',2);await has('pumpSurvey','3 bölmenin 1 tanesi');await has('pumpSurveyNote','en az 1 kalmalı');await range('pumpP',4);await has('pumpSurvey','10 bölmenin 4 tanesi');await range('pumpX',0);await range('pumpY',2);await range('pumpI',4);await has('pumpVerdict','Dilde');
   await click('reReset');await has('reStates','14 · 2 × 7 = 14');await has('pumpSurvey','10 bölmenin 0 tanesi');eq(await page.locator('#pumpX').inputValue(),'1');eq(await page.locator('#pumpY').inputValue(),'2');await noflow();
   // 04 · CFG
   await click('tab-cfg');await has('cfgVerdict','KABUL');await has('cfgTrees','1');await has('cfgSplits','35 · 35');await has('cfgBrute','2.046 dizgi · 0 fark');await has('pdaVerdict','KABUL');await has('pdaDepth','2 · 2');eq(await page.locator('#pdaRows tr').count(),7);await painted('treeCanvas');
   await type('cfgInput','()()()');await has('cfgTrees','2 · 2');await has('cfgTreeOut','1 / 2');eq(await page.locator('#cfgTree').isDisabled(),false);await range('cfgTree',2);await has('cfgTreeOut','2 / 2');await type('cfgInput','()()()()');await has('cfgTrees','5 · 5');await has('cfgSplits','84 · 84');
   await pick('cfgPreset','parenU');await type('cfgInput','()()()()');await has('cfgTrees','1 · 1');eq(await page.locator('#cfgTree').isDisabled(),true);
   await pick('cfgPreset','arithA');await has('cfgTrees','2 · 2');await has('cfgSplits','20 · 20');await has('cfgBrute','19.530 dizgi · 0 fark');await pick('cfgPreset','arith');await has('cfgTrees','1 · 1');await pick('cfgPreset','anbn');await has('cfgVerdict','KABUL');await type('cfgInput','aabbb');await has('cfgVerdict','RET');await has('cfgTrees','0');await pick('cfgPreset','pal');await has('cfgVerdict','KABUL');await has('cfgBruteNote','124 tanesi dilde');
   await type('cfgInput','abc');await has('cfgStatus','3. sıradaki “c”');await has('cfgVerdict','—');await has('cfgSplits','—');await type('cfgInput','');await has('cfgVerdict','RET');await has('cfgStatus','Boş dizgi');
   await type('cfgInput','abba');await click('cykClear');await has('cfgVerdict','Henüz bitmedi');await has('cfgTrees','—');await click('cykStep');await has('cfgStatus','Hücre (i = 1, l = 1)');for(let i=0;i<9;i++)await click('cykStep');await has('cfgVerdict','KABUL');await click('cykStep');await has('cfgVerdict','Henüz bitmedi');await click('cykAll');await has('cfgSplits','10 · 10');
   await type('pdaInput','())(');await has('pdaVerdict','RET');await has('pdaVerdictNote','3. simgede takıldı');await type('pdaInput','((');await has('pdaVerdictNote','2 açık parantez kaldı');await type('pdaInput','');await has('pdaVerdict','KABUL');await type('pdaInput','(a');await has('pdaStatus','2. sıradaki “a”');await has('pdaDepth','—');
   await type('pdaInput','(())');await click('pdaRewind');await has('pdaVerdict','Henüz bitmedi');await click('pdaStep');await click('pdaStep');eq(await page.locator('#pdaStack li').count(),3);await click('pdaRun');await page.waitForFunction(()=>document.getElementById('pdaRun').textContent==='Çalıştır'&&document.getElementById('pdaVerdict').textContent==='KABUL',null,{timeout:6000});checks++;
   await click('cfgReset');await has('cfgSplits','35 · 35');eq(await page.locator('#cfgInput').inputValue(),'(())()');eq(await page.locator('#pdaInput').inputValue(),'(()())');await noflow();
   // Klavye, etiketler, çekirdek
   await page.locator('#tab-cfg').focus();await page.keyboard.press('Home');eq(await page.locator('#tab-dfa').getAttribute('aria-selected'),'true');await page.keyboard.press('ArrowRight');eq(await page.locator('#tab-nfa').getAttribute('aria-selected'),'true');await page.keyboard.press('End');eq(await page.locator('#tab-cfg').getAttribute('aria-selected'),'true');await page.keyboard.press('ArrowRight');eq(await page.locator('#tab-dfa').getAttribute('aria-selected'),'true');await page.keyboard.press('ArrowLeft');eq(await page.locator('#tab-cfg').getAttribute('aria-selected'),'true');eq(await page.locator('#panel-dfa').isHidden(),true);
   await click('tab-dfa');await click('dfaRewind');await page.locator('h1').click();await page.keyboard.press('Space');await has('dfaVerdictNote','1 / 4');await pick('dfaPreset','has11');await page.locator('h1').click();await page.keyboard.press('r');eq(await page.locator('#dfaPreset').inputValue(),'even');await page.locator('#dfaInput').focus();await page.keyboard.type('r');eq(await page.locator('#dfaPreset').inputValue(),'even');await has('dfaStatus','Geçersiz girdi');await click('dfaReset');
   eq(await page.evaluate(()=>[...document.querySelectorAll('main input,main select,main button')].filter(e=>!(e.labels&&e.labels.length)&&!e.getAttribute('aria-label')&&!(e.tagName==='BUTTON'&&e.textContent.trim())).map(e=>e.id)),[]);
   eq(await page.evaluate(()=>[...document.querySelectorAll('main canvas')].filter(c=>c.getAttribute('role')!=='img'||!c.getAttribute('aria-label')).length),0);
   eq(await page.evaluate(()=>/[̀-ͯ]/.test(document.querySelector('main').textContent.normalize('NFC').replace(/[çğıöşüÇĞİÖŞÜ]/g,''))),false,'birleşik işaret');
   eq(await page.evaluate(()=>Object.isFrozen(AutomataLab)&&!Object.getOwnPropertyDescriptor(window,'AutomataLab').writable),true);eq(await page.locator('.bd-sum a[href="hesaplama-teorisi.html"]').count(),2);
   for(const t of['dfa','nfa','re','cfg']){await click('tab-'+t);await noflow();}assert.deepEqual(errors,[]);checks++;await page.close();console.log(`G ${SLUG}: ${checks-before} UI kontrolü PASS (${width} px, ${theme})`);}
 }catch(e){console.error(e);code=1;}finally{await browser?.close();server.close();}
 process.exit(code);
}
