#!/usr/bin/env node
// C crypto regression: external reference vectors + invariant/boundary scenarios.
// Each named scenario is counted once; exhaustive combinatorial assertion totals are not inflated.
import fs from 'node:fs';
import vm from 'node:vm';
import assert from 'node:assert/strict';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
function load(slug,key){const html=fs.readFileSync(path.join(root,slug+'.html'),'utf8');const body=html.split('/* PURE KERNEL START */')[1]?.split('/* PURE KERNEL END */')[0];assert.ok(body,'Pure kernel markers: '+slug);const scope={window:{}};vm.createContext(scope);vm.runInContext(body,scope);const api=scope.window[key];assert.ok(Object.isFrozen(api));assert.equal(Object.getOwnPropertyDescriptor(scope.window,key).writable,false);return api;}
const C=load('sezar-sifre','CaesarLab'),E=load('enigma-makinesi','EnigmaLab');
let passed=0;function test(name,fn){fn();passed++;console.log('✓ '+name);}
const plain=x=>JSON.parse(JSON.stringify(x));
// Cornell CS2112 A2 §4.1.1: cat -> dbu at k=1; key 0 is identity, negative keys allowed.
// https://www.cs.cornell.edu/courses/cs2112/2020fa/hw/a2/a2.pdf
// TÜBİTAK BİLGEM Bilbul 2023, pp3,8: explicit ordered 29-letter alphabet.
// https://en.bilgem.tubitak.gov.tr/wp-content/uploads/sites/8/teknofest-2023-bilgem-bilbul-sorular.pdf
test('Sezar · published cat→dbu and wraparound',()=>{assert.equal(C.transform('cat',1).output,'dbu');assert.equal(C.transform('XYZ xyz',3).output,'ABC abc');assert.equal(C.transform('ATTACK AT DAWN',3).output,'DWWDFN DW GDZQ');assert.equal(C.transform('A a',-1).output,'Z z');});
test('Sezar · strict ASCII leaves Turkish, ß and emoji unchanged',()=>{assert.equal(C.transform('Iı İi Çç Ğğ Öö Şş Üü ß 😀',1).output,'Jı İj Çç Ğğ Öö Şş Üü ß 😀');});
test('Sezar · Turkish alphabet, case pairs and 29-wrap',()=>{assert.equal(C.ALPHABETS.turkish,'ABCÇDEFGĞHIİJKLMNOÖPRSŞTUÜVYZ');assert.equal(C.transform('Iı İi Şş Zz qwx',1,'turkish').output,'İi Jj Tt Aa qwx');assert.equal(C.transform('ABCÇ',29,'turkish').output,'ABCÇ');});
test('Sezar · NFC precedes cipher; folding is explicitly lossy',()=>{assert.equal(C.transform('I\u0307 C\u0327',1,'turkish').output,'J D');assert.equal(C.prepare('Iı İi Çç Ğğ Öö Şş Üü','fold'),'Ii Ii Cc Gg Oo Ss Uu');assert.equal(C.prepare('I','fold'),C.prepare('İ','fold'));assert.notEqual(C.prepare('I','turkish'),C.prepare('İ','turkish'));});
test('Sezar · round trips, identity and composition across profiles',()=>{const text='Iı İi Çç Aa Zz qwx, ß 123 😀';for(const profile of ['ascii','turkish','fold']){const m=C.ALPHABETS[profile].length;for(const k of [-m-1,-1,0,1,m-1,m,m+1]){const out=C.transform(text,k,profile);assert.equal(C.transform(out.output,k,profile,true).output,C.prepare(text,profile));}assert.equal(C.transform(C.transform(text,7,profile).output,11,profile).output,C.transform(text,18,profile).output);}});
test('Sezar · exhaustive key search does not invent a language decision',()=>{const rows=C.candidates('DWWDFN DW GDZQ','ascii','attack');assert.equal(rows.length,26);assert.deepEqual(plain(rows.filter(r=>r.match).map(r=>[r.key,r.output])),[[3,'ATTACK AT DAWN']]);assert.equal(C.candidates('DWWDFN','ascii','impossible').filter(r=>r.match).length,0);const punctuation=C.candidates('!? 123');assert.equal(punctuation.length,26);assert.equal(new Set(punctuation.map(r=>r.output)).size,1);});
test('Sezar · measured collision ratio from independently counted text',()=>{const f=C.frequencies('ANANAS BANANA');assert.equal(f.N,12);assert.equal(f.counts[0],6);assert.equal(f.counts[13],4);assert.equal(f.counts[1],1);assert.equal(f.counts[18],1);assert.equal(f.pairs,42);assert.equal(f.ic,7/22);const g=C.frequencies(C.transform('ANANAS BANANA',3).output);assert.equal(g.ic,f.ic);assert.deepEqual([...g.counts].sort((a,b)=>a-b),[...f.counts].sort((a,b)=>a-b));});
test('Sezar · empty/singleton IC is undefined; uniform unique alphabet is zero',()=>{assert.equal(C.frequencies('').ic,null);assert.equal(C.frequencies('A!!').ic,null);assert.equal(C.frequencies(C.ALPHABETS.turkish,'turkish').ic,0);assert.equal(C.frequencies('aaaa').ic,1);});
test('Sezar · invalid inputs and actual processing length are bounded',()=>{assert.throws(()=>C.transform('A',.5));assert.throws(()=>C.transform('A',1,'unknown'));assert.throws(()=>C.transform('A'.repeat(501)));assert.equal(C.transform('A'.repeat(500)).count,500);});
test('Sezar · residual combining marks stay intact through shift and counting',()=>{for(const profile of ['ascii','turkish','fold']){const text='B\u0301 D\u0301 I\u0338 ı\u0301 Ç\u0327 AAAAA BBBB';for(let key=0;key<C.ALPHABETS[profile].length;key++){const r=C.transform(text,key,profile);assert.equal(C.transform(r.output,key,profile,true).output,r.prepared);assert.equal(C.prepare(r.output,profile),r.output);assert.equal(C.frequencies(text,profile).ic,C.frequencies(r.output,profile).ic);assert.equal(r.count,9);}assert.equal(C.candidates('B\u0301',profile).every(r=>r.output==='B\u0301'),true);}assert.equal(C.frequencies('B\u0301 D\u0301').N,0);});
test('Sezar · preparation remains idempotent across combining marks and folding',()=>{const bases='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyzÇĞİÖŞÜçğıöşü';const marks=['\u0301','\u0307','\u0327','\u0338','\u0301\u0327','\u0327\u0327'];for(const profile of ['ascii','turkish','fold'])for(const b of bases)for(const mark of marks){const input=b+mark,prepared=C.prepare(input,profile);assert.equal(C.prepare(prepared,profile),prepared);for(const key of[1,3,C.ALPHABETS[profile].length-1]){const r=C.transform(input,key,profile);assert.equal(C.transform(r.output,key,profile,true).output,prepared);}}});
test('Sezar · normalized length bounds expansion before producing a result',()=>{for(const profile of ['ascii','turkish','fold']){assert.throws(()=>C.transform('\u0344'.repeat(500),3,profile),/NFC sonrası 500/);const accepted=C.transform('\u0344'.repeat(250),3,profile);assert.equal([...accepted.prepared].length,500);assert.equal(C.transform(accepted.output,3,profile,true).output,accepted.prepared);assert.equal(C.frequencies(accepted.output,profile).N,0);}});
// Primary curator worked example, frozen AAA / I-II-III / B, no plugboard.
// https://www.codesandciphers.org.uk/enigma/example1.htm
const saleMapping='UEJOBTPZWCNSRKDGVMLFAQIYXH';
test('Enigma · Tony Sale full frozen AAA 26-letter vector',()=>{assert.equal(E.frozen().mapping,saleMapping);assert.equal(E.signal('G').output,'P');assert.deepEqual(plain(E.signal('G').stages.map(v=>v.output)),['G','G','C','D','F','S','S','E','P','P','P']);assert.equal(E.signal('P').output,'G');});
test('Enigma · current flows AFTER stepping: AAZ G→P at AAA',()=>{const r=E.process('G',{positions:'AAZ'});assert.equal(r.output,'P');assert.equal(r.final,'AAA');assert.equal(r.rows[0].before,'AAZ');assert.equal(r.rows[0].after,'AAA');});
// Brian Neal's independent Py-Enigma reference tests: published AAAAA vector,
// double-step sequence, and historical message (II-IV-V, rings B-U-L, 10 plugs).
// https://raw.githubusercontent.com/gremmie/enigma/master/enigma/tests/test_enigma.py
test('Enigma · AAAAA↔BDZGO published message vector',()=>{assert.equal(E.process('AAAAA').output,'BDZGO');assert.equal(E.process('BDZGO').output,'AAAAA');assert.equal(E.process('AAAAA').final,'AAF');assert.equal(E.process('BDZGO',{positions:'AAF'}).output==='AAAAA',false);});
// Hamer's original table uses slow III, middle II, fast I: ADO ADP ADQ AER BFS BFT BFU.
// https://www.cryptomuseum.com/people/hamer/files/double_stepping.pdf (Table1)
test('Enigma · Hamer double-step sequence and separate consecutive middle steps',()=>{const r=E.stepping({order:['III','II','I'],positions:'ADO'},6);assert.deepEqual(plain(r.rows.map(v=>v.after)),['ADP','ADQ','AER','BFS','BFT','BFU']);assert.deepEqual(plain(r.counts),[1,2,6]);assert.deepEqual(plain(r.rows.slice(2,4).map(v=>v.moved)),[[false,true,true],[true,true,true]]);const d=E.stepping({positions:'ADU'},3);assert.deepEqual(plain(d.rows.map(v=>v.after)),['ADV','AEW','BFX']);});
test('Enigma · index-ring turnover is independent of ring wiring offset',()=>{const a=E.stepping({positions:'ADU',rings:'AAA'},60),b=E.stepping({positions:'ADU',rings:'BDF'},60);assert.deepEqual(plain(a),plain(b));for(const [rotor,letter] of [['I','Q'],['II','E'],['III','V'],['IV','J'],['V','Z']]){const other=Object.keys(E.ROTORS).filter(x=>x!==rotor);const r=E.step({order:[other[0],other[1],rotor],positions:'AA'+letter,rings:'ZZZ'});assert.equal(r.moved[1],true);assert.equal(r.after[1],'B');}});
test('Enigma · historical multi-rotor/ring/10-plug message reference',()=>{const settings={order:['II','IV','V'],rings:'BUL',reflector:'B',plugs:'AV BS CG DL FU HZ IN KM OW RX'};const msgKey=E.process('KCH',{...settings,positions:'WXC'}).output;const ciphertext='EDPUDNRGYSZRCXNUYTPOMRMBOFKTBZREZKMLXLVEFGUEYSIOZVEQMIKUBPMMYLKLTTDEISMDICAGYKUACTCDOMOHWXMUUIAUBSTSLRNBZSZWNRFXWFYSSXJZVIJHIDISHPRKLKAYUPADTXQSPINQMATLPIFSVKDASCTACDPBOPVHJK'.replace(/\s/g,'');const expected='AUFKLXABTEILUNGXVONXKURTINOWAXKURTINOWAXNORDWESTLXSEBEZXSEBEZXUAFFLIEGERSTRASZERIQTUNGXDUBROWKIXDUBROWKIXOPOTSCHKAXOPOTSCHKAXUMXEINSAQTDREINULLXUHRANGETRETENXANGRIFFXINFXRGTX';assert.equal(E.process(ciphertext,{...settings,positions:msgKey}).output,expected);assert.equal(E.process(expected,{...settings,positions:msgKey}).output,ciphertext);});
test('Enigma · frozen permutations reciprocal and fixed-point-free with both reflectors',()=>{for(const cfg of [{},{order:['V','IV','II'],positions:'KQZ',rings:'BUL',reflector:'C',plugs:'AV BS CG DL FU HZ IN KM OW RX'}]){const r=E.frozen(cfg);assert.equal(r.reciprocal,true);assert.equal(r.fixed,0);assert.equal(r.pairs.length,13);assert.equal(new Set(r.mapping).size,26);}});
test('Enigma · window-minus-ring equivalence only for the frozen mapping',()=>{assert.equal(E.frozen({positions:'BBB',rings:'BBB'}).mapping,saleMapping);assert.notEqual(E.frozen({positions:'AAA',rings:'AAB'}).mapping,saleMapping);assert.notEqual(E.process('A'.repeat(40),{positions:'ADU',rings:'AAA'}).output,E.process('A'.repeat(40),{positions:'BEV',rings:'BBB'}).output);});
test('Enigma · plugboard rejects reused/self/non-ASCII letters and repeated rotors',()=>{for(const p of ['AA','AB AC','A','ıB','ABC','AB,CD'])assert.throws(()=>E.plugboard(p));assert.throws(()=>E.config({order:['I','I','III']}));assert.throws(()=>E.config({rings:'AıA'}));assert.throws(()=>E.config({reflector:'D'}));assert.throws(()=>E.signal('ß'));assert.throws(()=>E.stepping({},61));assert.throws(()=>E.process('A'.repeat(501)));});
test('Enigma · only ASCII letters step; display-only symbols are preserved',()=>{const r=E.process('a ıİçß!? a');assert.equal(r.output,'B ıİçß!? D');assert.equal(r.count,2);assert.equal(r.final,'AAC');assert.equal(E.process('!? ıİ😀').final,'AAA');assert.equal(E.stepping({},0).rows.length,0);});
// Optional real UI regression for the Unicode failures found in independent review.
// It verifies rendered errors, removal of stale results, and recovery, not just the kernel.
if(process.argv.includes('--browser')){
  const {createServer}=await import('node:http');
  const {createRequire}=await import('node:module');
  const {chromium}=createRequire(import.meta.url)('playwright');
  const server=createServer((req,res)=>{
    const file=path.join(root,decodeURIComponent(new URL(req.url,'http://localhost').pathname));
    if(!fs.existsSync(file)||fs.statSync(file).isDirectory()){res.writeHead(404).end();return;}
    res.setHeader('Content-Type',({'.html':'text/html; charset=utf-8','.js':'text/javascript; charset=utf-8','.css':'text/css; charset=utf-8'})[path.extname(file)]||'application/octet-stream');
    res.end(fs.readFileSync(file));
  });
  await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));
  let browser;
  try{
    browser=await chromium.launch();
    const context=await browser.newContext({viewport:{width:390,height:844},locale:'tr-TR'});
    await context.addInitScript(()=>localStorage.setItem('acelya-theme','light'));
    const page=await context.newPage(),errors=[];
    page.setDefaultTimeout(10000);
    page.on('pageerror',error=>errors.push(error.message));
    await page.goto(`http://127.0.0.1:${server.address().port}/sezar-sifre.html`);
    const text=async(id,expected)=>assert.equal(await page.locator('#'+id).textContent(),expected);
    const value=async(id,expected)=>assert.equal(await page.locator('#'+id).inputValue(),expected);
    const lengthError=async id=>assert.match(await page.locator('#'+id).textContent(),/NFC sonrası 500/);
    const browserTest=async(name,fn)=>{await fn();passed++;console.log('✓ Sezar UI · '+name);};
    const expanded='\u0344'.repeat(500),accepted='\u0344'.repeat(250);
    await browserTest('combining clusters survive the visible inverse and stay outside counts',async()=>{
      await page.locator('#inputText').fill('B\u0301 D\u0301 A');
      await page.locator('#shift').evaluate(el=>{el.value='1';el.dispatchEvent(new Event('input',{bubbles:true}));});
      await value('outputText','B\u0301 D\u0301 B');
      await text('letterCount','1');await text('roundTrip','Hazır metne eşit');
      await page.locator('#swapBtn').click();await value('outputText','B\u0301 D\u0301 A');
      await page.locator('#tab-count').click();
      await page.locator('#countText').fill('A A B\u0301 D\u0301');
      await text('frequencyN','2');await text('inputIC','1,000000');await text('outputIC','1,000000');
    });
    await browserTest('shift rejects normalized overflow, clears results and accepts the exact boundary',async()=>{
      await page.locator('#tab-shift').click();await page.locator('#shiftReset').click();
      await value('outputText','PHUKDED DFHOBD');
      await page.locator('#inputText').fill(expanded);await lengthError('shiftStatus');
      await value('outputText','');await text('preparedText','');await text('traceRows','');
      await text('alphabetMap','');await text('letterCount','—');await text('roundTrip','Geçersiz metin');
      await page.locator('#inputText').fill(accepted);
      await value('outputText',accepted.normalize('NFC'));await text('roundTrip','Hazır metne eşit');
      await text('letterCount','0');
      await page.locator('#swapBtn').click();await value('outputText',accepted.normalize('NFC'));
      await page.locator('#inputText').fill('ABC');await page.locator('#direction').selectOption('encrypt');
      await value('outputText','DEF');await text('letterCount','3');await text('alphabetSize','26');
    });
    await browserTest('candidate search clears an invalid normalized message and recovers',async()=>{
      await page.locator('#tab-break').click();await page.locator('#breakReset').click();
      await text('matchCount','1');
      await page.locator('#cipherInput').fill(expanded);await lengthError('breakStatus');
      await text('candidateRows','');for(const id of ['candidateCount','matchCount','uniqueCount'])await text(id,'—');
      await page.locator('#cipherInput').fill('DWWDFN DW GDZQ');
      await text('candidateCount','26');await text('matchCount','1');await text('uniqueCount','26');
      assert.match(await page.locator('#candidateRows tr').nth(3).textContent(),/ATTACK AT DAWN/);
    });
    await browserTest('frequency overflow clears table and pixels, then restores valid IC',async()=>{
      await page.locator('#tab-count').click();await page.locator('#countReset').click();
      await text('frequencyN','12');await text('inputIC','0,318182');
      await page.locator('#countText').fill(expanded);await lengthError('countStatus');
      await value('countCipher','');await text('frequencyRows','');
      for(const id of ['frequencyN','inputIC','outputIC'])await text(id,'—');
      assert.equal(await page.locator('#frequencyCanvas').evaluate(canvas=>{
        return canvas.getContext('2d').getImageData(0,0,canvas.width,canvas.height).data.every(v=>v===0);
      }),true);
      await page.locator('#countText').fill('AA');
      await text('frequencyN','2');await text('inputIC','1,000000');await text('outputIC','1,000000');
      assert.equal(await page.locator('#frequencyRows tr').count(),26);
    });
    assert.deepEqual(errors,[],'No uncaught exception during invalid input or recovery');
    assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth+1),false);
    await context.close();
  }finally{
    await browser?.close();
    await new Promise(resolve=>server.close(resolve));
  }
}
console.log(`C kriptografi: ${passed} anlamlı regresyon senaryosu geçti.`);
