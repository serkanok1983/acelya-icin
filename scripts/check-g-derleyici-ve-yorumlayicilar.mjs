// G: derleyici ve yorumlayıcılar laboratuvarı. Çekirdek, sayfanın kodunu yinelemeyen bağımsız
// başvurularla sınanır: düzenli ifadeyle yazılmış ayrı bir sözcük çözümleyici, JavaScript'in kendi
// ifade değerlendiricisi, BigInt ile 32 bit aritmetik, kapalı biçimli komut sayıları ve en önemlisi
// fark sınaması: testin ürettiği rastgele programlar, testin kendi ağacı üzerinde çalışan bağımsız
// bir başvuru değerlendiricisiyle ve sayfanın dört yürütücüsüyle (sekiz iyileştirme bileşiminde) koşulur.
// Kullanım: node scripts/check-g-derleyici-ve-yorumlayicilar.mjs [--browser]
import fs from 'node:fs';
import vm from 'node:vm';
import assert from 'node:assert/strict';
const SLUG='derleyici-ve-yorumlayicilar';
const html=fs.readFileSync(new URL(`../${SLUG}.html`,import.meta.url),'utf8');
const source=html.split('/* KERNEL-BEGIN */')[1]?.split('/* KERNEL-END */')[0];
assert(source,'Çekirdek sınırları (KERNEL-BEGIN/END) gerekli');
const context={window:{}};vm.createContext(context);vm.runInContext(source,context);
const K=context.window.CompilerLab;let checks=0;
const eq=(a,b,msg)=>{assert.equal(JSON.stringify(a),JSON.stringify(b),msg||'beklenen değer');checks++;},ok=(c,msg)=>{assert(c,msg);checks++;};
let seed=20261111;const rnd=n=>{seed=(Math.imul(seed,1664525)+1013904223)>>>0;return Math.floor(seed/4294967296*n);},pick=a=>a[rnd(a.length)];
const ALL={fold:true,simplify:true,dce:true},NONE={};
// Doğrulayıcı düzeltmeleri (11 Kasım 2026): gramer listesinde karşılaştırma kuralı tanımlı; sayaç grafiğinin ara çizgisi tam sayı değerinde çizilir; yürütücülerin bağımsızlığı abartılmaz
ok(html.includes('karşılaştırma = "==" | "!=" | "&lt;" | "&lt;=" | "&gt;" | "&gt;="'),'EBNF: karşılaştırma kuralı');ok(html.includes('new Set([0,Math.round(max/2),max])')&&!html.includes('for(const f of[0,.5,1])'),'sayaç grafiği eksen çizgileri');ok(!html.includes('Dördü de ayrı yazılmıştır')&&!html.includes('ikisinin arasında durur'),'panel metni');

/* 1 · Sözcük çözümleme: düzenli ifadeyle yazılmış bağımsız çözümleyici */
const RX=/[ \t\r\n]+|#[^\n]*|\d+|[\p{L}_][\p{L}\d_]*|==|!=|<=|>=|[-+*\/%<>=(){};]/gu;
function refLex(src){const out=[];let m,last=0;RX.lastIndex=0;while((m=RX.exec(src))){assert.equal(m.index,last,'başvuru: tanınmayan parça');last=RX.lastIndex;if(/^[ \t\r\n#]/.test(m[0]))continue;
  const before=Array.from(src.slice(0,m.index)),line=before.filter(c=>c==='\n').length+1,col=before.length-before.lastIndexOf('\n');out.push([m[0],line,col]);}assert.equal(last,src.length);return out;}
const mine=src=>K.lex(src).tokens.filter(t=>t.kind!=='EOF').map(t=>[t.text,t.line,t.col]);
for(const p of Object.values(K.PRESETS)){if(K.lex(p.src).errors.length)continue;eq(mine(p.src),refLex(p.src),p.label);}
const WORDS=['x','y1','_a','sayı','ifade','if','else','while','print','Print','0','7','007','2147483647','+','-','*','/','%','=','==','!=','<','<=','>','>=','(',')','{','}',';',' ','  ','\t','\n','\r\n','# yorum ğ $ \' . !\n'];
for(let t=0;t<600;t++){let src='';for(let i=0,n=rnd(30);i<n;i++){const w=pick(WORDS),prev=src.slice(-1);if(/[\p{L}\d_]/u.test(prev)&&/^[\p{L}\d_]/u.test(w))src+=' ';src+=w;}
 const L=K.lex(src);eq(L.errors.length,0,JSON.stringify(src));eq(mine(src),refLex(src),JSON.stringify(src));
 for(const k of L.tokens){if(k.kind==='NUMBER'){eq(k.value,parseInt(k.text,10));}if(k.kind==='KEYWORD')ok(K.KEYWORDS.includes(k.text));if(k.kind==='IDENT')ok(!K.KEYWORDS.includes(k.text));}}
// Tür ve değer tablosu
const kinds=src=>K.lex(src).tokens.map(t=>t.kind+':'+t.text).join(' ');
eq(kinds('a<=b'),'IDENT:a OP:<= IDENT:b EOF:');eq(kinds('a< =b'),'IDENT:a OP:< OP:= IDENT:b EOF:');eq(kinds('a===b'),'IDENT:a OP:== OP:= IDENT:b EOF:');eq(kinds('a!=b'),'IDENT:a OP:!= IDENT:b EOF:');
eq(kinds('ifx if Print print'),'IDENT:ifx KEYWORD:if IDENT:Print KEYWORD:print EOF:');eq(kinds('a--b'),'IDENT:a OP:- OP:- IDENT:b EOF:');eq(kinds('x1 _ _9'),'IDENT:x1 IDENT:_ IDENT:_9 EOF:');
eq(K.lex('007').tokens[0].value,7);eq(K.lex('2147483647').tokens[0].value,2147483647);eq(K.lex('').tokens.length,1);eq(K.lex(' \n# yalnız yorum').tokens.length,1);
// Hata tablosu: [kaynak, [kod, satır, sütun, metin]…]
const E=(src,...want)=>eq(K.lex(src).errors.map(e=>[e.code,e.line,e.col,e.text]),want,JSON.stringify(src));
E("c = 'a';",['char',1,5,"'"],['char',1,7,"'"]);E('y = 1.2.3;',['number',1,5,'1.2.3']);E('z = 10e5;',['number',1,5,'10e5']);E('3.14',['number',1,1,'3.14']);E('0x1F',['number',1,1,'0x1F']);E('12abc',['number',1,1,'12abc']);E('3.',['number',1,1,'3.']);E('5ş',['number',1,1,'5ş']);E('7_',['number',1,1,'7_']);
E('.5',['char',1,1,'.']);E('x = 3 $ 4;',['char',1,7,'$']);E('a ! b',['bang',1,3,'!']);E('!a',['bang',1,1,'!']);E('2147483648',['range',1,1,'2147483648']);E('99999999999999999999999',['range',1,1,'99999999999999999999999']);
E('a && b',['char',1,3,'&'],['char',1,4,'&']);E('x = 1,\n\ty = "2"',['char',1,6,','],['char',2,6,'"'],['char',2,8,'"']);E('a\r\n@',['char',2,1,'@']);E('😀 x',['char',1,1,'😀']);E('# $ . \' !\nx',);
eq(K.lex('😀 x').tokens[1].col,3,'sütun karakter sayar, UTF-16 birimi değil');eq(K.lex('x'.repeat(4001)).errors[0].code,'long');eq(K.lex('x'.repeat(4000)).errors.length,0);eq(K.lex('$'.repeat(80)).errors.length,50);
eq(K.lex(K.PRESETS.sozcukHatasi.src).errors.map(e=>e.line+':'+e.col),['1:7','2:5','3:5','4:5','4:7']);
// Döşeme: rastgele (çoğu hatalı) metinlerde tokenlar ve atlanan parçalar kaynağı boşluksuz, örtüşmesiz kaplar
const POOL=[...'abxyzığ_0123456789+-*/%=!<>(){};#.$\'" \t\n\r,&'];
for(let t=0;t<500;t++){let src='';for(let i=0,n=rnd(60);i<n;i++)src+=pick(POOL);const L=K.lex(src),ch=Array.from(src),parts=[...L.tokens.filter(k=>k.kind!=='EOF'),...L.skipped].sort((a,b)=>a.offset-b.offset);let at=0;
 for(const p of parts){assert.equal(p.offset,at,JSON.stringify(src));at+=p.length;assert(p.length>0);const before=ch.slice(0,p.offset);assert.equal(p.line,before.filter(c=>c==='\n').length+1);assert.equal(p.col,before.length-before.lastIndexOf('\n'));if(p.text!==undefined)assert.equal(p.text,ch.slice(p.offset,p.offset+p.length).join(''));}
 eq(at,ch.length);eq(L.length,ch.length);eq(L.tokens.filter(k=>k.kind==='ERROR').length>0,L.errors.length>0);}

/* 2 · Ayrıştırma */
const P=(src,mode)=>{const L=K.lex(src);assert.equal(L.errors.length,0,src);return K.parse(L.tokens,mode);};
const strip=n=>Array.isArray(n)?n.map(strip):n&&typeof n==='object'?Object.fromEntries(Object.entries(n).filter(([k])=>k!=='line'&&k!=='col').map(([k,v])=>[k,strip(v)])):n;
const read=(src,mode)=>K.paren(P('print '+src+';',mode).ast.body[0].expr);
eq(read('a - b - c'),'((a - b) - c)');eq(read('a - (b - c)'),'(a - (b - c))');eq(read('2 + 3 * 4'),'(2 + (3 * 4))');eq(read('(2 + 3) * 4'),'((2 + 3) * 4)');eq(read('a * b + c * d'),'((a * b) + (c * d))');
eq(read('-a * b'),'((-a) * b)');eq(read('- - a'),'(-(-a))');eq(read('a - -b'),'(a - (-b))');eq(read('a + b < c * d'),'((a + b) < (c * d))');eq(read('a / b % c * d'),'(((a / b) % c) * d)');eq(read('-(a + b)'),'(-(a + b))');eq(read('((a))'),'a');
eq(read('a - b - c','right'),'(a - (b - c))');eq(read('2 + 3 * 4','flat'),'((2 + 3) * 4)');eq(read('2 * 3 + 4','flat'),'((2 * 3) + 4)');eq(read('a - b * c - d','right'),'(a - ((b * c) - d))');eq(read('a / b / c','right'),'(a / (b / c))');eq(read('a - b - c','flat'),'((a - b) - c)');
assert.throws(()=>K.parse(K.lex('x=1;').tokens,'lr'));checks++;
// Öncelik ve birleşme: JavaScript'in kendi ifade değerlendiricisi başvuru (yalnız taşmayan değerler)
const genE=d=>{const r=rnd(d>0?10:2);if(r<2)return String(rnd(9));if(r<4)return'('+genE(d-1)+')';if(r===4)return('-'+genE(d-1)).replace(/--/g,'- -');return genE(d-1)+' '+pick(['+','-','*','+','-','%'])+' '+genE(d-1);};
const js=e=>Number(Function('"use strict";return ('+e+')')());
let jsCases=0;for(let t=0;t<1500;t++){const sides=[genE(4)];if(rnd(4)===0)sides.push(genE(3));const e=sides.join(' '+pick(['==','!=','<','<=','>','>='])+' '),parts=sides.map(js);
 if(parts.some(v=>Number.isNaN(v))){eq(K.interpret(K.compile('print '+e+';',NONE).ast).status,'error',e);continue;}if(parts.some(v=>Math.abs(v)>2e9))continue;
 const C=K.compile('print '+e+';',NONE);eq(C.stage,'ok',e);const r=K.interpret(C.ast);eq([r.status,r.output],['done',[js(e)+0]],e);jsCases++;}
ok(jsCases>800,'JavaScript karşılaştırması yeterince örnek üretmeli');
// Sözdizimi hataları: [kaynak, satır, sütun, beklenen]
for(const[src,line,col,expected]of[['x = (2 + 3 * 4;\nprint x;',1,15,'“)”'],['x = 2 +;',1,8,'sayı, ad ya da “(”'],['x = 2',1,6,'“;”'],['print 1 2;',1,9,'“;”'],['x 3;',1,3,'“=”'],['3 = x;',1,1,'deyim (ad, print, if ya da while)'],[';',1,1,'deyim (ad, print, if ya da while)'],
 ['if x { }',1,4,'“(”'],['if (x) print 1;',1,8,'“{”'],['x = 1;\nwhile (x) {\n  x = 0;\n',4,1,'“}”'],['else { }',1,1,'deyim (ad, print, if ya da while)'],['}',1,1,'deyim (ad, print, if ya da while)'],['x = 1 < 2 < 3;',1,11,'“;”, “)” ya da bir aritmetik işleç'],['x = ();',1,6,'sayı, ad ya da “(”'],['print;',1,6,'sayı, ad ya da “(”'],['x = 1; if (x) { } else print 1;',1,24,'“{”'],['x = 2 * * 3;',1,9,'sayı, ad ya da “(”'],['while () { }',1,8,'sayı, ad ya da “(”'],['x = = 1;',1,5,'sayı, ad ya da “(”']]){
 const r=P(src);eq([r.ok,r.error&&r.error.line,r.error&&r.error.col,r.error&&r.error.expected],[false,line,col,expected],src);ok(r.error.msg.includes('Beklenen: ')&&r.error.msg.includes('bulunan: '));}
eq(P('x = (1;').error.found,'“;”');eq(P('x = (1').error.found,'kaynağın sonu');
eq(P('x = '+'('.repeat(200)+'1'+')'.repeat(200)+';').ok,true);eq(P('x = '+'('.repeat(201)+'1'+')'.repeat(201)+';').ok,false);eq(P('x = '+'-'.repeat(201)+'1;').ok,false);
{const long='x = 1'+' + 1'.repeat(900)+';print x;',C=K.compile(long,ALL);eq(C.stage,'ok');eq(K.runVM(C.bc0).output,[901]);eq(K.runVM(C.bc1).output,[901]);eq(K.interpret(K.parse(C.lex.tokens,'right').ast).output,[901]);}
eq(P('').ast.body.length,0);eq(strip(P('if (a) { } else if (b) { } else { x = 1; }').ast.body[0].else.type),'If');

/* 3 · Rastgele programlar: testin kendi ağacı, kendi yazıcısı, kendi değerlendiricisi (BigInt) */
const W=v=>BigInt.asIntN(32,v);
function genProgram(){let counter=0;const live=[];
 const expr=(d,vars)=>{const r=rnd(d>0?12:3);if(r<2||(r===2&&!vars.length))return{t:'n',v:pick([0,0,1,1,2,3,7,10,100,65536,2147483647,46341])};if(r===2)return{t:'v',n:pick(vars)};if(r===3&&vars.length)return{t:'v',n:pick(vars)};if(r===4)return{t:'u',e:expr(d-1,vars)};
  return{t:'b',op:pick(['+','+','-','-','*','*','/','%','==','!=','<','<=','>','>=']),l:expr(d-1,vars),r:expr(d-1,vars)};};
 const block=(d,vars,n)=>{const out=[],mine=vars.slice();for(let i=0;i<n;i++){const r=rnd(d>0?10:6);
   if(r<4){const name=pick(['a','b','c','d','e']);out.push({t:'=',n:name,e:expr(3,mine)});if(!mine.includes(name))mine.push(name);}
   else if(r<6)out.push({t:'p',e:expr(3,mine)});
   else if(r<8)out.push({t:'if',c:rnd(4)===0?{t:'n',v:rnd(2)}:expr(2,mine),a:block(d-1,mine,rnd(3)),b:rnd(2)?block(d-1,mine,rnd(3)):null});
   else if(r===8){const k='k'+(counter++);out.push({t:'=',n:k,e:{t:'n',v:rnd(5)}});out.push({t:'w',c:{t:'b',op:'>',l:{t:'v',n:k},r:{t:'n',v:0}},a:[...block(d-1,mine.concat(k),rnd(3)),{t:'=',n:k,e:{t:'b',op:'-',l:{t:'v',n:k},r:{t:'n',v:1}}}]});mine.push(k);}
   else out.push({t:'w',c:{t:'n',v:0},a:block(d-1,mine,rnd(2))});}
  if(vars===live)for(const v of mine)if(!live.includes(v))live.push(v);return out;};
 return block(3,live,2+rnd(6));}
const E2=e=>e.t==='n'?String(e.v):e.t==='v'?e.n:e.t==='u'?'(-'+E2(e.e)+')':'('+E2(e.l)+' '+e.op+' '+E2(e.r)+')';
const S2=(b,ind)=>b.map(s=>s.t==='='?ind+s.n+' = '+E2(s.e)+';':s.t==='p'?ind+'print '+E2(s.e)+';':s.t==='w'?ind+'while '+(E2(s.c).startsWith('(')?E2(s.c):'('+E2(s.c)+')')+' {\n'+S2(s.a,ind+' ')+'\n'+ind+'}':ind+'if ('+E2(s.c)+') {\n'+S2(s.a,ind+' ')+'\n'+ind+'}'+(s.b?' else {\n'+S2(s.b,ind+' ')+'\n'+ind+'}':'')).join('\n');
function refRun(prog){const env=new Map,out=[];const ev=e=>{if(e.t==='n')return BigInt(e.v);if(e.t==='v'){assert(env.has(e.n),'başvuru: tanımsız '+e.n);return env.get(e.n);}if(e.t==='u')return W(-ev(e.e));const a=ev(e.l),b=ev(e.r);
  switch(e.op){case'+':return W(a+b);case'-':return W(a-b);case'*':return W(a*b);case'/':if(b===0n)throw'div0';return W(a/b);case'%':if(b===0n)throw'div0';return W(a%b);case'==':return a===b?1n:0n;case'!=':return a!==b?1n:0n;case'<':return a<b?1n:0n;case'<=':return a<=b?1n:0n;case'>':return a>b?1n:0n;default:return a>=b?1n:0n;}};
 const run=b=>{for(const s of b){if(s.t==='=')env.set(s.n,ev(s.e));else if(s.t==='p')out.push(Number(ev(s.e)));else if(s.t==='if'){if(ev(s.c)!==0n)run(s.a);else if(s.b)run(s.b);}else while(ev(s.c)!==0n)run(s.a);}};
 try{run(prog);return['done',out];}catch(e){if(e==='div0')return['error',out];throw e;}}
const OPTS=[];for(let m=0;m<8;m++)OPTS.push({fold:!!(m&1),simplify:!!(m&2),dce:!!(m&4)});
let errRuns=0,shrunk=0,programs=0;
for(let t=0;t<1500;t++){const prog=genProgram(),src=S2(prog,''),want=refRun(prog),C0=K.compile(src,NONE);eq(C0.stage,'ok',src);programs++;if(want[0]==='error')errRuns++;
 const tree=K.interpret(C0.ast),raw=K.runVM(C0.bc0),tac=K.runTac(C0.tac0);
 for(const[name,r]of[['ağaç',tree],['vm',raw],['tac',tac]])eq([r.status,r.output],want,name+'\n'+src);
 eq(K.agree(raw,tree),'exact');eq(K.agree(raw,tac),'exact');eq(raw.steps,tree.steps,'VM komutu = yorumlayıcı sayacı\n'+src);
 if(raw.status==='error')eq([raw.error.code,tree.error.line,tree.error.col,tac.error.line,tac.error.col],['div0',raw.error.line,raw.error.col,raw.error.line,raw.error.col]);
 // ölçüler: token → düğüm, düğüm → komut, yığın üst sınırı, kodlama
 const st=C0.stats;eq(st.nodes,K.nodesFromTokens(C0.lex.tokens));eq(C0.bc0.code.length,st.bytecodeLength);eq(C0.tac0.count,st.tacLength);ok(raw.maxStack<=st.stackNeed);eq(raw.hits.reduce((a,b)=>a+b,0),raw.steps);
 const enc=K.encode(C0.bc0.code);eq(K.decode(enc.bytes),C0.bc0.code.map(i=>({op:i.op,arg:i.arg})));eq(enc.bytes.length,C0.bc0.code.reduce((a,i)=>a+1+K.OPCODES.find(o=>o[0]===i.op)[1],0));
 eq(K.runVM({code:K.decode(enc.bytes),vars:C0.bc0.vars}).output,raw.output);
 // en az parantezli yazım aynı ağaca geri döner
 eq(strip(P(K.prettyProgram(C0.ast)).ast),strip(C0.ast),'yazım → ayrıştırma gidiş dönüşü');
 for(const o of OPTS){const O=K.optimize(C0.ast,o),bc=K.bytecode(O.ast),r=K.runVM(bc),tr=K.interpret(O.ast),tc=K.runTac(K.tac(O.ast));
  eq([r.status,r.output],want,JSON.stringify(o)+'\n'+src);eq(K.agree(raw,r),'exact');eq(K.agree(r,tr),'exact');eq(K.agree(r,tc),'exact');eq(r.steps,tr.steps);ok(r.steps<=raw.steps,'iyileştirme yürütülen komutu artırmamalı');ok(bc.code.length<=C0.bc0.code.length);
  const so=K.stats(O.ast);eq(bc.code.length,so.bytecodeLength);eq(K.tac(O.ast).count,so.tacLength);
  if(!o.fold&&!o.simplify&&!o.dce){eq(O.ast===C0.ast,true);eq(O.log.length,0);}
  if(o.fold&&o.simplify&&o.dce){if(bc.code.length<C0.bc0.code.length)shrunk++;const again=K.compile(K.prettyProgram(O.ast),NONE);eq(again.stage,'ok',K.prettyProgram(O.ast));const ra=K.runVM(again.bc0);eq([ra.status,ra.output],want,'iyileştirilmiş kaynağın yeniden derlenmesi');
   const twice=K.optimize(O.ast,o);eq(twice.log.filter(l=>l.rule!=='dce').length,0,'iyileştirme sabit noktaya varmış olmalı\n'+src);}}
 // öbür ayrıştırma kuralları da çökmeden çalışır, sayımları tutar
 for(const m of['flat','right']){const a=K.parse(C0.lex.tokens,m).ast;eq(K.stats(a).nodes,st.nodes);const r1=K.interpret(a),r2=K.runVM(K.bytecode(a));eq(K.agree(r2,r1),'exact');eq(r1.steps,r2.steps);}}
ok(errRuns>100&&errRuns<programs-300,'rastgele programların bir bölümü sıfıra bölmeli: '+errRuns);ok(shrunk>700,'iyileştirme çoğu programı kısaltmalı: '+shrunk);

/* 4 · Aritmetik: BigInt başvuru, uç değerler */
const EDGE=[0,1,-1,2,-2,3,7,-7,46340,46341,65535,65536,-65536,2147483647,-2147483648,2147483646,-2147483647,123456789,-987654321];
for(const a of EDGE)for(const b of EDGE){const A=BigInt(a),B=BigInt(b);for(const[op,f]of[['+',()=>W(A+B)],['-',()=>W(A-B)],['*',()=>W(A*B)],['/',()=>B===0n?null:W(A/B)],['%',()=>B===0n?null:W(A%B)],['==',()=>A===B?1n:0n],['!=',()=>A!==B?1n:0n],['<',()=>A<B?1n:0n],['<=',()=>A<=B?1n:0n],['>',()=>A>B?1n:0n],['>=',()=>A>=B?1n:0n]]){const w=f();eq(K.arith(op,a,b),w===null?null:Number(w),`${a} ${op} ${b}`);}}
const out=(src,o)=>{const C=K.compile(src,o||NONE);assert.equal(C.stage,'ok',src);return K.runVM(o?C.bc1:C.bc0);};
eq(out('print 2147483647 + 1;').output,[-2147483648]);eq(out('print -7 / 2; print -7 % 2; print 7 / -2; print 7 % -2;').output,[-3,-1,-3,1]);eq(out('x = -2147483647 - 1; print x / -1; print x % -1; print -x;').output,[-2147483648,0,-2147483648]);
eq(out('print 46341 * 46341;').output,[-2147479015]);eq(out('print 1 < 2; print 2 < 1; print (1 < 2) + (3 == 3);').output,[1,0,2]);
eq(out('print 2147483647 + 1;',ALL).output,[-2147483648],'katlama da sarar');eq(out('x = 0 - 2147483647 - 1; print -x; print x * 1 + 0;',ALL).output,[-2147483648,-2147483648]);
{const C=K.compile('x = 0 - 2147483647 - 1;',ALL);eq(K.prettyProgram(C.opt.ast),'x = (-2147483647 - 1);');eq(K.compile(K.prettyProgram(C.opt.ast),NONE).stage,'ok');}

/* 5 · Anlam denetimi: kesin atama */
const sem=src=>{const C=K.compile(src,NONE);return C.stage==='sem'?C.sem.errors.map(e=>e.name+'@'+e.line+':'+e.col):C.stage;};
eq(sem('print x;'),['x@1:7']);eq(sem('x = x + 1;'),['x@1:5']);eq(sem('a = 5;\nif (a > 3) {\n  b = 1;\n}\nprint a + b;'),['b@5:11']);eq(sem('a = 1; if (a) { b = 1; } else { b = 2; } print b;'),'ok');eq(sem('a = 1; if (a) { b = 1; } else if (a) { b = 2; } print b;'),['b@1:55']);
eq(sem('a = 1; if (a) { b = 1; } else if (a) { b = 2; } else { b = 3; } print b;'),'ok');eq(sem('a = 0; while (a) { b = 1; } print b;'),['b@1:35']);eq(sem('if (1) { x = 1; } print x;'),['x@1:25']);eq(sem('while (y) { y = 1; }'),['y@1:8']);eq(sem('print x; print x; print y;'),['x@1:7','y@1:25']);
eq(K.check(P('b = 1; a = 2; if (a) { c = 3; } b = 4;').ast).vars,['b','a','c']);eq(K.compile(K.PRESETS.anlamHatasi.src,ALL).stage,'sem');
{let s='';for(let i=0;i<257;i++)s+='v'+i+'=1;';eq(K.compile(s,NONE).stage,'sem');eq(K.compile(s.slice(0,s.lastIndexOf('v')),NONE).stage,'ok');}

/* 6 · İyileştirme: tek tek kurallar ve güvenlik koşulları */
const opt=(src,o)=>{const C=K.compile(src,o||ALL);assert.equal(C.stage,'ok',src);return K.prettyProgram(C.opt.ast);};
eq(opt('x = 2 + 3 * 4;'),'x = 14;');eq(opt('a = 1; x = a + 0; y = 0 + a; z = a - 0; w = a * 1; v = 1 * a; u = a / 1;'),'a = 1;\nx = a;\ny = a;\nz = a;\nw = a;\nv = a;\nu = a;');
eq(opt('a = 1; x = a * 0; y = 0 * a; z = -(-a);'),'a = 1;\nx = 0;\ny = 0;\nz = a;');eq(opt('a = 1; x = a + (3 - 3);'),'a = 1;\nx = a;');eq(opt('a = 1; x = 0 - a; y = 0 / a; z = a % 1; w = a - a;'),'a = 1;\nx = 0 - a;\ny = 0 / a;\nz = a % 1;\nw = a - a;','uygulanmayan özdeşlikler');
eq(opt('x = 1 / 0;'),'x = 1 / 0;','sıfıra bölme katlanmaz');eq(opt('x = 5 % 0;'),'x = 5 % 0;');eq(opt('a = 0; x = (1 / a) * 0;'),'a = 0;\nx = 1 / a * 0;','hata verebilecek ifade x * 0 ile silinmez');eq(opt('a = 4; x = (a / 2) * 0; y = 0 * (a % 0);'),'a = 4;\nx = 0;\ny = 0 * (a % 0);');
eq(out('a = 0; print 7; x = (1 / a) * 0; print 8;',ALL).status,'error');eq(out('print 1; if (1 / 0) { print 2; }',ALL).output,[1]);
eq(opt('if (2 > 3) { print 1; } else { print 2; }'),'print 2;');eq(opt('if (2 > 3) { print 1; }'),'');eq(opt('if (3 > 2) { print 1; } else { print 2; }'),'print 1;');eq(opt('if (0) { print 1; } else if (1) { print 2; } else { print 3; }'),'print 2;');
eq(opt('a = 1; if (a) { print 1; } else if (0) { print 2; } else { print 3; }'),'a = 1;\nif (a) {\n  print 1;\n} else {\n  print 3;\n}');eq(opt('a = 1; if (a) { print 1; } else if (0) { print 2; }'),'a = 1;\nif (a) {\n  print 1;\n}');
eq(opt('while (0) { print 1; } print 2;'),'print 2;');eq(opt('while (1) { print 1; } print 2; print 3;'),'while (1) {\n  print 1;\n}');eq(opt('if (2 > 3) { print 1; }',{dce:true}),'if (2 > 3) {\n  print 1;\n}','katlama kapalıyken koşul sabit sayılmaz');eq(opt('if (0) { print 1; }',{dce:true}),'');eq(opt('if (2 > 3) { print 1; }',{fold:true}),'if (0) {\n  print 1;\n}');
eq(opt('x = 2 + 3 * 4;',{simplify:true,dce:true}),'x = 2 + 3 * 4;');eq(opt('a = 2; x = a * 1 + 0;',{fold:true,dce:true}),'a = 2;\nx = a * 1 + 0;');
{const C=K.compile(K.PRESETS.iyilestir.src,ALL),n=r=>C.opt.log.filter(l=>l.rule===r).length;eq([n('fold'),n('simplify'),n('dce')],[3,2,2]);eq(K.prettyProgram(C.opt.ast),'gun = 86400;\nx = 7;\ny = x;\nprint y + gun;');eq(C.opt.log[0],{rule:'fold',line:1,col:10,before:'60 * 60',after:'3600'});
 const table={};for(const o of OPTS){const c=K.compile(K.PRESETS.iyilestir.src,o);table[(o.fold?'K':'')+(o.simplify?'S':'')+(o.dce?'Ö':'')]=[c.tac1.count,c.bc1.code.length,K.encode(c.bc1.code).bytes.length,K.runVM(c.bc1).steps];eq(K.runVM(c.bc1).output,[86407]);}
 // Beklenen değerler elle sayıldı: ham kod 31 komut; katlama gun için 4, koşul için 2 komut; sadeleştirme y için 4 komut; ölü kod while(0) için 5, katlanmış if için 7 komut siler.
 eq(table,{'':[14,31,89,25],K:[12,25,71,19],S:[13,27,77,21],KS:[11,21,59,15],'Ö':[11,26,72,23],'KÖ':[6,15,37,15],'SÖ':[10,22,60,19],'KSÖ':[5,11,25,11]},'iyileştirme tablosu (üç adresli, bytecode, bayt, yürütülen)');}

/* 7 · Kod üretimi: elle yazılmış beklenen listeler */
const list=src=>{const C=K.compile(src,NONE);return[C.tac0.code.map(K.tacText).join(' | '),C.bc0.code.map(i=>K.insText(i,C.bc0.vars)).join(' | ')];};
eq(list('x = 2 + 3 * 4;'),['t1 = 3 * 4 | x = 2 + t1','PUSH 2 | PUSH 3 | PUSH 4 | MUL | ADD | STORE x | HALT']);
eq(list('a = 1; print -a;'),['a = 1 | t1 = -a | print t1','PUSH 1 | STORE a | LOAD a | NEG | PRINT | HALT']);
eq(list('a = 1; if (a < 2) { print 1; } else { print 2; }'),['a = 1 | t1 = a < 2 | ifFalse t1 goto L1 | print 1 | goto L2 | L1: | print 2 | L2:','PUSH 1 | STORE a | LOAD a | PUSH 2 | LT | JZ 9 | PUSH 1 | PRINT | JMP 11 | PUSH 2 | PRINT | HALT']);
eq(list('n = 3; while (n) { n = n - 1; }'),['n = 3 | L1: | ifFalse n goto L2 | n = n - 1 | goto L1 | L2:','PUSH 3 | STORE n | LOAD n | JZ 9 | LOAD n | PUSH 1 | SUB | STORE n | JMP 2 | HALT']);
eq(K.insBytes({op:'PUSH',arg:-2}),[1,254,255,255,255]);eq(K.insBytes({op:'JZ',arg:258}),[17,2,1]);eq(K.insBytes({op:'STORE',arg:3}),[3,3]);eq(K.OPCODES.map(o=>o[0]).join(' '),'HALT PUSH LOAD STORE ADD SUB MUL DIV MOD NEG EQ NE LT LE GT GE JMP JZ PRINT');
assert.throws(()=>K.decode([99]));assert.throws(()=>K.decode([1,0,0]));checks+=2;
// Yığın derinliği: sola ve sağa yatık ağaçlar
for(let n=1;n<=12;n++){const left='print 1'+' - 1'.repeat(n)+';',right='print '+'1 - ('.repeat(n)+'1'+')'.repeat(n)+';';eq([K.compile(left,NONE).stats.stackNeed,out(left).maxStack],[2,2]);eq([K.compile(right,NONE).stats.stackNeed,out(right).maxStack],[n+1,n+1]);}
// Makinenin savunması (derleyicinin üretmeyeceği kodlar)
const raw=(code,vars)=>K.runVM({code:code.map(([op,arg])=>({op,arg:arg===undefined?null:arg,line:0,col:0})),vars:vars||[]});
eq(raw([['ADD']]).error.code,'stack');eq(raw([['PRINT']]).error.code,'stack');eq(raw([['LOAD',0]],['x']).error.code,'undef');eq(raw([['PUSH',1]]).error.code,'pc');eq(raw([['JMP',0]]).status,'limit');eq(raw([['PUSH',1],['PUSH',0],['MOD'],['HALT']]).error.msg,'Sıfıra göre kalan');

/* 8 · Hazır programlar: kapalı biçimli komut sayıları ve gösterilen değerler */
const fact=n=>{let f=1n;for(let i=2n;i<=BigInt(n);i++)f*=i;return Number(W(f));};
for(let n=0;n<=14;n++){const src=K.PRESETS.faktoriyel.src.replace('n = 5','n = '+n),C=K.compile(src,ALL),r=K.runVM(C.bc0),m=Math.max(n,1);eq([r.status,r.output,r.steps],['done',[fact(n)],13*m-2],'faktöriyel '+n);eq(K.interpret(C.ast).steps,13*m-2);eq(r.maxStack,2);}
const euclid=(a,b)=>{let k=0;while(b){[a,b]=[b,a%b];k++;}return[a,k];};
for(const[a,b]of[[1071,462],[462,1071],[17,5],[100,10],[13,13],[0,9],[9,0],[2147483647,2],[832040,514229]]){const[g,k]=euclid(a,b),C=K.compile(K.PRESETS.ebob.src.replace('a = 1071; b = 462','a = '+a+'; b = '+b),ALL),r=K.runVM(C.bc0);eq([r.output,r.steps],[[g],13*k+11],`ebob(${a}, ${b})`);}
const show=id=>{const C=K.compile(K.PRESETS[id].src,ALL);if(C.stage!=='ok')return[C.stage];const a=K.runVM(C.bc0),b=K.runVM(C.bc1),t=K.interpret(C.ast),c=K.runTac(C.tac0);{const w=a.status==='limit'?'prefix':'exact';eq([K.agree(a,t),K.agree(a,c)],[w,w],id);}
 return[C.lex.tokens.length-1,C.stats.nodes,C.stats.height,C.tac0.count,C.tac1.count,C.bc0.code.length,C.bc1.code.length,K.encode(C.bc0.code).bytes.length,K.encode(C.bc1.code).bytes.length,a.status,a.output.join(','),a.steps,b.steps,t.steps,c.steps,a.maxStack,C.stats.stackNeed,K.agree(a,b)];};
eq(show('oncelik'),[20,15,4,6,3,15,7,41,17,'done','14,20',15,7,15,6,3,3,'exact']);eq(show('parantez'),[28,19,4,9,9,19,19,40,40,'done','20,14',19,19,19,9,3,3,'exact']);eq(show('birlesme'),[28,19,4,9,9,19,19,40,40,'done','3,9',19,19,19,9,3,3,'exact']);
eq(show('faktoriyel'),[31,20,5,8,8,20,20,49,49,'done','120',63,63,63,25,2,2,'exact']);eq(show('ebob'),[33,20,5,9,9,20,20,47,47,'done','21',50,50,50,23,2,2,'exact']);eq(show('iyilestir'),[48,32,5,14,5,31,11,89,25,'done','86407',25,11,25,10,2,2,'exact']);
eq(show('sifiraBolme'),[21,15,3,6,6,15,15,36,36,'error','1',11,11,11,4,2,2,'exact']);eq(show('sonsuz'),[19,12,5,5,4,12,10,32,29,'limit','',100000,100000,100000,100000,2,2,'prefix']);eq(show('sozcukHatasi'),['lex']);eq(show('sozdizimHatasi'),['parse']);eq(show('anlamHatasi'),['sem']);
{const C=K.compile(K.PRESETS.sifiraBolme.src,ALL),r=K.runVM(C.bc0);eq(r.error,{code:'div0',msg:'Sıfıra bölme',line:4,col:9});eq(K.compile(K.PRESETS.oncelik.src,ALL).opt.visits,15);}
// Üç kuralın hazır programlardaki çıktıları
const modeOut=(id,m)=>K.interpret(K.parse(K.lex(K.PRESETS[id].src).tokens,m).ast).output;
eq([modeOut('oncelik','std'),modeOut('oncelik','flat'),modeOut('oncelik','right')],[[14,20],[20,20],[14,20]]);eq([modeOut('birlesme','std'),modeOut('birlesme','flat'),modeOut('birlesme','right')],[[3,9],[3,9],[9,9]]);eq([modeOut('parantez','std'),modeOut('parantez','flat'),modeOut('parantez','right')],[[20,14],[20,20],[20,14]]);
// Adım sınırı: yorumlayıcı ve makine aynı noktada durur; karşılaştırma ortak başlangıçla yapılır
for(const max of[1,2,7,50,1000]){const C=K.compile('i = 0; while (1) { i = i + 1; print i; }',NONE),a=K.runVM(C.bc0,max),t=K.interpret(C.ast,max);eq([a.status,t.status,a.steps,t.steps],['limit','limit',max,max]);eq(a.output,t.output);eq(K.agree(a,t),'prefix');}
eq(K.agree({status:'limit',output:[1,2]},{status:'done',output:[1,3,4]}),'diff');eq(K.agree({status:'done',output:[1]},{status:'done',output:[1,2]}),'diff');eq(K.agree({status:'done',output:[1]},{status:'error',output:[1],error:{}}),'diff');
// Adım adım makine = tek seferde çalıştırma
{const C=K.compile(K.PRESETS.faktoriyel.src,NONE),s=K.vmStart(C.bc0,1e5);let n=0;while(s.status==='run'){K.vmStep(s);n++;}eq([n,s.steps,s.output,s.pc],[63,63,[120],19]);K.vmStep(s);eq(s.steps,63);eq(K.vmResult(s).vars,{n:1,f:120});}
ok(Object.isFrozen(K)&&Object.isFrozen(K.PRESETS)&&Object.isFrozen(K.OPCODES)&&Object.isFrozen(K.LIMITS));
console.log(`G ${SLUG}: ${checks.toLocaleString('tr-TR')} bağımsız çekirdek kontrolü PASS (${programs.toLocaleString('tr-TR')} rastgele program × 8 iyileştirme bileşimi, ${jsCases.toLocaleString('tr-TR')} JavaScript ifade karşılaştırması)`);

if(process.argv.includes('--browser')){
 const {chromium}=await import('playwright');const {createServer}=await import('node:http');const {join,extname}=await import('node:path');const {fileURLToPath}=await import('node:url');const root=fileURLToPath(new URL('../',import.meta.url));
 const server=createServer((req,res)=>{const file=join(root,decodeURIComponent(new URL(req.url,'http://localhost').pathname));if(!fs.existsSync(file)||fs.statSync(file).isDirectory()){res.writeHead(404).end();return;}res.setHeader('Content-Type',({'.html':'text/html; charset=utf-8','.js':'text/javascript; charset=utf-8','.css':'text/css; charset=utf-8'})[extname(file)]||'application/octet-stream');res.end(fs.readFileSync(file));});await new Promise(r=>server.listen(0,'127.0.0.1',r));let browser,code=0;
 try{browser=await chromium.launch();
  for(const[theme,width]of[['light',390],['dark',1280]]){const before=checks,page=await browser.newPage({viewport:{width,height:900},deviceScaleFactor:width<500?2:1});await page.addInitScript(t=>{localStorage.setItem('acelya-theme',t);localStorage.setItem('acelya-sound-muted','1');},theme);page.setDefaultTimeout(5000);const errors=[];page.on('pageerror',e=>errors.push(e.message));page.on('console',m=>{if(m.type()==='error'&&!/Failed to load resource/.test(m.text()))errors.push(m.text());});await page.goto(`http://127.0.0.1:${server.address().port}/${SLUG}.html`);
   const click=id=>page.locator('#'+id).click(),read=id=>page.locator('#'+id).textContent(),has=async(id,text)=>{const t=await read(id);assert(t.includes(text),`${id}: “${t}” içinde “${text}” yok`);checks++;},range=(id,v)=>page.locator('#'+id).evaluate((e,v)=>{e.value=v;e.dispatchEvent(new Event('input',{bubbles:true}));},String(v)),type=v=>page.locator('#src').fill(v),sel=(id,v)=>page.locator('#'+id).selectOption(v),count=q=>page.locator(q).count(),val=id=>page.locator('#'+id).inputValue(),
    noflow=async()=>eq(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),true,'yatay taşma'),painted=async id=>ok(await page.locator('#'+id).evaluate(c=>{const d=c.getContext('2d').getImageData(0,0,c.width,c.height).data,first=[d[0],d[1],d[2]];for(let i=0;i<d.length;i+=16)if(Math.abs(d[i]-first[0])+Math.abs(d[i+1]-first[1])+Math.abs(d[i+2]-first[2])>60)return true;return false;}),id+' boş');
   // Ortak düzenleyici ve 01 · Sözcük çözümleme
   eq(await val('preset'),'oncelik');await has('stages','20 token');await has('stages','15 düğüm');await has('stages','1 değişken');await has('stages','15 → 7 komut');await has('stages','2 çıktı');await has('srcStatus','Çıktı: 14, 20');await has('srcGutter','5');eq(await page.locator('#srcGoto').isHidden(),true);
   await has('tokCount','20 token');await has('tokTile','77 · 77 karakter');await has('tokTileNote','fark 0 · token 28 + boşluk 16 + yorum 33');await has('lexErrs','0');await has('tokKinds','Sayı 6 · Ad 2 · Anahtar sözcük 2 · İşleç 5 · Ayraç 5');eq(await count('#tokRows tr'),21);eq(await count('#tokStrip span'),21);await has('tokRows','2:13');
   await page.locator('#lexWs').check();eq(await count('#tokRows tr'),21+17);await has('tokRows','Yorum (atlanır)');await click('lexReset');eq(await page.locator('#lexWs').isChecked(),false);eq(await count('#tokRows tr'),21);
   await sel('preset','sozcukHatasi');await has('lexErrs','5');await has('lexErrsNote','1:7');await has('srcStatus','Sözcük hatası (1:7)');await has('srcStatus','x = 3 $ 4;');await has('lexStatus','Hatalı sayı “10e5”');await has('stages','5 hata');await has('stages','bekliyor');eq(await count('#tokRows tr.dy-bad'),5);
   await click('srcGoto');eq(await page.locator('#src').evaluate(e=>[e.selectionStart,e.selectionEnd]),[6,7]);
   await click('tab-parse');await has('parseStatus','Ayrıştırıcı çalışmadı');await has('astNodes','—');await painted('treeCanvas');await click('tab-gen');await has('genStatus','Kod üretilmedi');await has('bcCount','—');await click('tab-run');await has('runStatus','Program çalıştırılmadı');eq(await page.locator('#vmStep').isDisabled(),true);await has('runAgree','—');await click('tab-lex');
   await type('z = 10e5;');eq(await val('preset'),'custom');await has('lexStatus','1:5 Hatalı sayı “10e5”');await type("c = 'a';");await has('lexErrs','2');await has('lexStatus','1:5');await has('lexStatus','1:7');await type('y = 1.2.3;');await has('lexStatus','sayının içinde nokta olamaz');await type('a ! b');await has('lexStatus','“!=” biçiminde');
   await type('sayı = 007;\nprint sayı <= 7;');await has('tokCount','9 token');await has('tokRows','<=');await has('srcStatus','Çıktı: 1');await type('');await has('tokCount','0 token');await has('lexStatus','Kaynak boş');await has('stages','0 çıktı');await has('tokTile','0 · 0 karakter');
   await type(K.PRESETS.ebob.src);eq(await val('preset'),'ebob');await click('srcReset');eq(await val('src'),K.PRESETS.ebob.src);await type('x=1;');await click('srcReset');eq(await val('preset'),'oncelik');await has('tokCount','20 token');await noflow();
   // 02 · Ayrıştırma
   await click('tab-parse');await has('astNodes','15 · 15');await has('astNodesNote','fark 0');await has('astHeight','4 kenar');await has('astLeaves','7 · 8');await has('ruleRows','2 + (3 * 4)');await has('ruleRows','20, 20');await has('parseStatus','çıktı değişiyor');await painted('treeCanvas');eq(await count('#parseStmt option'),4);
   await sel('parseMode','flat');await has('astNodes','15 · 15');await has('parseStatus','Deney kuralı');await has('astText','*');eq(await page.locator('#ruleRows tr.dy-sel th').textContent(),'Önceliksiz');await sel('parseStmt','0');eq((await read('astText')).split('\n')[0],'x =   [2:1]');eq((await read('astText')).split('\n')[1].trim(),'*   [2:11]');
   await sel('parseMode','std');eq((await read('astText')).split('\n')[1].trim(),'+   [2:7]');await sel('preset','birlesme');eq(await val('parseStmt'),'all');await has('ruleRows','(a - b) - c  ·  a - (b - c)');await has('ruleRows','3, 9');await has('ruleRows','9, 9');await has('astNodes','19 · 19');
   await sel('preset','parantez');await has('ruleRows','20, 14');await has('ruleRows','20, 20');await sel('preset','faktoriyel');await has('astNodes','20 · 20');await has('astHeight','5 kenar');await has('parseStatus','üç kural da aynı çıktıyı');await painted('treeCanvas');
   await sel('preset','sozdizimHatasi');await has('parseStatus','Sözdizimi hatası (1:15)');await has('parseStatus','Beklenen: “)” · bulunan: “;”');await has('parseStatus','1:5 konumunda açılan parantez kapanmadı');await has('astNodes','—');await has('stages','sözdizimi hatası');eq(await page.locator('#parseStmt').isDisabled(),true);
   await sel('preset','anlamHatasi');await has('astNodes','14 · 14');await has('parseStatus','“b” bu noktada değer almamış olabilir');await has('stages','1 hata');await painted('treeCanvas');
   await type('x = 1 < 2 < 3;');await has('parseStatus','karşılaştırmalar zincirlenemez');await type('x = 2 +;');await has('parseStatus','sayı, ad ya da “(”');await type('if (1) { print 1; }');await has('astNodes','6 · 6');await type('');await has('astNodes','1 · 1');await has('astHeight','0 kenar');
   await type('x = 1'+' + 1'.repeat(700)+';');await has('astNodes','1.403 · 1.403');await has('parseStatus','1.403 düğümlü');await painted('treeCanvas');
   await sel('preset','oncelik');await sel('parseMode','right');await sel('parseStmt','2');await click('parseReset');eq([await val('parseMode'),await val('parseStmt')],['std','all']);eq(await val('preset'),'oncelik');await noflow();
   // 03 · Kod üretimi ve iyileştirme
   await click('tab-gen');await has('tacCount','6 → 3 komut');await has('tacCountNote','%50,0 azalma · geçici ad 3 → 0');await has('bcCount','15 → 7 komut');await has('bcCountNote','%53,3 azalma');await has('bcBytes','41 → 17 bayt');await has('genTheory','bytecode 7 · 7');await has('genTheory','üç adresli 3 · 3');await has('genTheoryNote','fark 0 ve 0');await has('genEq','Aynı sonuç');await has('genEqNote','15 → 7 komut');
   eq(await count('#bcRows tr'),7);await has('bcRows','01 0E 00 00 00');await has('bcRows','PUSH 14');eq(await count('#optRows tr'),4);await has('tacRaw','t1 = 3 * 4');await has('tacOpt','x = 14');await has('optSrc','print 20;');eq(await count('#opRows tr'),19);
   await sel('genView','raw');eq(await count('#bcRows tr'),15);await has('genTheory','bytecode 15 · 15');await has('genTheory','üç adresli 6 · 6');
   await sel('preset','iyilestir');await has('bcCount','31 → 11 komut');await has('tacCount','14 → 5 komut');await has('bcBytes','89 → 25 bayt');eq(await count('#optRows tr'),7);await has('genStatus','3 sabit katlama, 2 sadeleştirme, 2 ölü kod eleme');await has('optSrc','gun = 86400;');await has('genEqNote','çıktı 86407');
   await page.locator('#optFold').uncheck();await has('bcCount','31 → 22 komut');await page.locator('#optDce').uncheck();await has('bcCount','31 → 27 komut');await has('genStatus','0 ölü kod eleme');await page.locator('#optSimplify').uncheck();await has('bcCount','31 → 31 komut');await has('bcCountNote','değişmedi');await has('genStatus','İyileştirme kapalı');eq(await count('#optRows tr'),1);await has('genEq','Aynı sonuç');
   await page.locator('#optDce').check();await has('bcCount','31 → 26 komut');await page.locator('#optFold').check();await has('bcCount','31 → 15 komut');await has('stages','31 → 15 komut');
   await click('genReset');await has('bcCount','31 → 11 komut');eq([await page.locator('#optFold').isChecked(),await page.locator('#optSimplify').isChecked(),await page.locator('#optDce').isChecked(),await val('genView')],[true,true,true,'opt']);
   await type('a = 0;\nx = (1 / a) * 0;\nprint 1 / 0;');await has('optRows','uygulanabileceği bir yer bulunamadı');await has('genEq','Aynı sonuç');await has('genEqNote','Sıfıra bölme (2:8)');await sel('preset','sonsuz');await has('genEq','Sınır içinde uyumlu');await has('optRows','silindi (ulaşılamaz)');await type('');await has('bcCount','1 → 1 komut');await has('tacCount','0 → 0 komut');await has('tacRaw','(komut yok)');await sel('preset','oncelik');await noflow();
   // 04 · Yürütme
   await click('tab-run');await has('runAgree','Dördü de aynı sonucu verdi');await has('runSteps','15 · 15 komut');await has('runStepsNote','fark 0 · yaprak 7 + işleç 4 + atama 1 + print 2 + sınama 0 + atlama 0 + bitiş 1');await has('runStack','3 · 3');await has('runGain','15 → 7 komut');await has('runGainNote','%53,3 daha az komut');await has('payback','ham 1.500 · iyileştirilmiş 715');await has('paybackNote','2. çalıştırmadan');eq(await count('#execRows tr'),4);await has('execRows','6 komut');await painted('profCanvas');
   await range('runCount',1);await has('payback','ham 15 · iyileştirilmiş 22');await range('runCount',1000);await has('payback','ham 15.000 · iyileştirilmiş 7.015');await has('runCountOut','1.000 kez');
   await has('vmPc','pc = 0');eq(await count('#vmRows tr'),15);await click('vmStep');await click('vmStep');await click('vmStep');await has('vmPc','pc = 3');await has('vmPc','MUL');eq(await page.locator('#vmStack li').allTextContents(),['2','3','4']);await click('vmStep');eq(await page.locator('#vmStack li').allTextContents(),['2','12']);await has('runStatus','4 komut yürütüldü');eq(await page.locator('#vmRows tr.dy-now th').textContent(),'4');
   await click('vmEnd');await has('vmOut','14\n20');await has('vmVars','x = 14');await has('runStatus','HALT komutuna vardı: 15 komut, en çok 3 yığın gözü');eq(await page.locator('#vmStep').isDisabled(),true);await click('vmRewind');await has('vmPc','pc = 0');await has('vmVars','x = —');eq(await page.locator('#vmStep').isDisabled(),false);
   await sel('vmWhich','opt');eq(await count('#vmRows tr'),7);await click('vmEnd');await has('runStatus','7 komut');await has('vmOut','14\n20');
   await sel('preset','faktoriyel');await has('runSteps','63 · 63 komut');await has('runStack','2 · 2');await has('runGainNote','kazanç yok');await has('paybackNote','bedel hiç geri dönmez');await has('execRows','120');await has('vmPc','pc = 0');await range('vmSpeed',60);await has('vmSpeedOut','60 komut/s');await click('vmPlay');eq(await read('vmPlay'),'Duraklat');
   await page.waitForFunction(()=>document.getElementById('vmPlay').textContent==='Çalıştır'&&document.getElementById('vmOut').textContent==='120',null,{timeout:8000});checks++;await has('runStatus','63 komut');await has('vmVars','n = 1');await has('vmRows','JMP 4');
   await click('vmRewind');await click('vmPlay');await page.waitForFunction(()=>+document.getElementById('vmPc').textContent.slice(5,7)>0,null,{timeout:4000});await sel('preset','ebob');eq(await read('vmPlay'),'Çalıştır');await has('vmPc','pc = 0');await has('runSteps','50 · 50 komut');await has('execRows','21');
   await sel('preset','sifiraBolme');await has('runAgree','Dördü de aynı sonucu verdi');await has('runAgreeNote','aynı konumda aynı hata (4:9)');await has('srcStatus','çalışma hatası (4:9)');await has('stages','çalışma hatası');await has('runSteps','11 · 11 komut');await click('vmEnd');await has('runStatus','Çalışma hatası: Sıfıra bölme (kaynak 4:9, adres 10)');await has('vmOut','1');await has('payback','—');
   await sel('preset','sonsuz');await has('runAgree','Sınır içinde uyumlu');await has('stages','adım sınırı');await has('runGain','—');await has('execRows','100.000 komut');await sel('runLimit','10000');await has('execRows','10.000 komut');await has('srcStatus','10.000 komutluk adım sınırını');await click('vmEnd');await has('runStatus','Adım sınırı: makine 10.000 komuttan sonra durduruldu');await has('vmPc','adım sınırında durduruldu');
   await sel('runLimit','1000000');await has('execRows','1.000.000 komut');await sel('vmWhich','opt');await range('runCount',7);await click('runReset');eq([await val('runLimit'),await val('vmWhich'),await val('vmSpeed'),await val('runCount')],['100000','raw','8','100']);eq(await val('preset'),'sonsuz');await has('execRows','100.000 komut');
   await type('a = 1;\nif (a > 5) {\n  print 1 - (2 - (3 - 4));\n}\nprint a;');await has('runStack','2 · 4');await has('runStackNote','tamamlanmadı');await type('');await has('runSteps','1 · 1 komut');await has('vmVars','(değişken yok)');await sel('preset','oncelik');await noflow();
   // Klavye, etiketler, çekirdek
   await page.locator('#tab-run').focus();await page.keyboard.press('Home');eq(await page.locator('#tab-lex').getAttribute('aria-selected'),'true');await page.keyboard.press('ArrowRight');eq(await page.locator('#tab-parse').getAttribute('aria-selected'),'true');await page.keyboard.press('End');eq(await page.locator('#tab-run').getAttribute('aria-selected'),'true');await page.keyboard.press('ArrowRight');eq(await page.locator('#tab-lex').getAttribute('aria-selected'),'true');await page.keyboard.press('ArrowLeft');eq(await page.locator('#tab-run').getAttribute('aria-selected'),'true');eq(await page.locator('#panel-lex').isHidden(),true);eq(await page.locator('#tab-lex').getAttribute('tabindex'),'-1');
   await page.locator('h1').click();await page.keyboard.press('Space');await has('vmPc','pc = 1');await page.keyboard.press('Space');await has('vmPc','pc = 2');await sel('vmWhich','opt');await page.locator('h1').click();await page.keyboard.press('r');eq(await val('vmWhich'),'raw');
   await click('tab-gen');await page.locator('#optFold').uncheck();await page.locator('h1').click();await page.keyboard.press('R');eq(await page.locator('#optFold').isChecked(),true);await page.locator('#optFold').uncheck();await page.locator('#src').focus();await page.keyboard.press('End');await page.keyboard.type('r ');eq(await page.locator('#optFold').isChecked(),false);await has('srcStatus','Sözdizimi hatası');await click('genReset');await click('srcReset');
   eq(await page.evaluate(()=>[...document.querySelectorAll('main input,main select,main button,main textarea')].filter(e=>!e.closest('.digest,[class*=digest]')&&!(e.labels&&e.labels.length)&&!e.getAttribute('aria-label')&&!(e.tagName==='BUTTON'&&e.textContent.trim())).map(e=>e.id)),[]);
   eq(await page.evaluate(()=>[...document.querySelectorAll('main canvas')].filter(c=>c.getAttribute('role')!=='img'||!c.getAttribute('aria-label')).length),0);
   eq(await page.evaluate(()=>/[̀-ͯ]/.test([...document.querySelectorAll('.dy-editor,.dy-tabs,[role=tabpanel],.dy-sum')].map(e=>e.textContent).join(' ').normalize('NFC'))),false,'birleşik işaret');
   eq(await page.evaluate(()=>/\p{Extended_Pictographic}/u.test([...document.querySelectorAll('.dy-editor,.dy-tabs,[role=tabpanel],.dy-sum')].map(e=>e.textContent).join(' ').replace(/[↵→]/g,''))),false,'emoji');
   eq(await page.evaluate(()=>Object.isFrozen(CompilerLab)&&!Object.getOwnPropertyDescriptor(window,'CompilerLab').writable),true);eq(await count('.dy-sum a[href="bicimsel-diller-ve-otomata-teorisi.html"]'),1);
   for(const t of['lex','parse','gen','run']){await click('tab-'+t);for(const p of['iyilestir','sozcukHatasi','oncelik']){await sel('preset',p);await noflow();}}assert.deepEqual(errors,[]);checks++;await page.close();console.log(`G ${SLUG}: ${checks-before} UI kontrolü PASS (${width} px, ${theme})`);}
 }catch(e){console.error(e);code=1;}finally{await browser?.close();server.close();}
 process.exit(code);
}
