// G · cebirin-temelleri: çekirdek, sayfanın ayrıştırıcısını ve formüllerini yinelemeyen referanslarla sınanır
// (soru metinleri ayrı bir dönüştürücüyle JavaScript'e çevrilip yerine koyma ile denetlenir; kökler, aralıklar ve
// sistemler örnek noktalarla, çarpanlara ayrılabilirlik Δ'nın tam kare olmasıyla, sözel problemler kendi denklemleriyle).
// `--browser` gerçek arayüzü 390 px açık ve 1280 px koyu temada dener.
import fs from 'node:fs';
import assert from 'node:assert/strict';
const html=fs.readFileSync(new URL('../cebirin-temelleri.html',import.meta.url),'utf8');
const source=html.split('/* KERNEL-BEGIN */')[1]?.split('/* KERNEL-END */')[0];
assert(source,'Çekirdek sınır işaretleri gerekli');
const K=new Function('"use strict";'+source+';return AlgebraLab;')();
let checks=0;
const eq=(a,b,msg)=>{assert.equal(a,b,(msg??'')+` · ${a} ≠ ${b}`);checks++;};
const ok=(c,msg)=>{assert(c,msg??'koşul sağlanmadı');checks++;};
const near=(a,b,tol,msg)=>{assert(Math.abs(a-b)<=tol,(msg||'')+` ${a} ≠ ${b}`);checks++;};
const M='−';
ok(Object.isFrozen(K)&&Object.isFrozen(K.WORD)&&Object.isFrozen(K.MISTAKES)&&Object.isFrozen(K.TYPES));

/* ── Bağımsız dönüştürücü: sayfanın yazdığı matematik metnini JavaScript işlevine çevirir ── */
function squareGroups(s){// “(…)²” → “((…)*(…))”, “x²” → “(x*x)”
  s=s.replace(/x²/g,'(x*x)');let i;while((i=s.indexOf(')²'))>=0){let d=0,j=i;for(;j>=0;j--){if(s[j]===')')d++;if(s[j]==='(')d--;if(d===0)break;}const g=s.slice(j,i+1);s=s.slice(0,j)+'('+g+'*'+g+')'+s.slice(i+2);}return s;}
function toJs(expr){let s=expr.replace(/−/g,'-').replace(/·/g,'*').replace(/\s+/g,'');s=s.replace(/\|([^|]+)\|/g,'Math.abs($1)');s=squareGroups(s);
  s=s.replace(/(\d)(x|\(|M)/g,'$1*$2').replace(/\)(x|\(|\d)/g,')*$1').replace(/x\(/g,'x*(').replace(/x/g,'(X)');return new Function('X','return '+s+';');}
const side=(p,re)=>p.replace(/^[^:]*:\s*/,'').split(re);

/* ── Kesir ve biçim ── */
for(let i=0;i<300;i++){const a=(i*37%41)-20,b=(i*53%29)+1,c=(i*17%31)-15,d=(i*7%13)+1;const A=K.Q(a,b),B=K.Q(c,d);
  near(K.qNum(K.qAdd(A,B)),a/b+c/d,1e-12);near(K.qNum(K.qMul(A,B)),a/b*(c/d),1e-12);if(c)near(K.qNum(K.qDiv(A,B)),(a/b)/(c/d),1e-12);ok(A.d>0n&&K.gcdB(A.n,A.d)<=1n||A.n===0n);}
eq(K.qStr(K.Q(-7,2)),M+'7/2');eq(K.qStr(K.Q(4,-2)),M+'2');eq(K.fmt(-3.5,2,true),M+'3,5');eq(K.fmt(12345.678,1),'12 345,7');eq(K.fmt(9999,0),'9999');eq(K.fmt(-0.0001,2),'0,00');
eq(K.qNice(K.Q(5,2)),'2,5');eq(K.qNice(K.Q(1,3)),'1/3 ≈ 0,333');eq(K.polyStr([K.Q(6),K.Q(-5),K.Q(1)]),'x² '+M+' 5x + 6');eq(K.polyStr([K.Q(0),K.Q(1,2)]),'(1/2)x');eq(K.polyStr([K.Q(0)]),'0');

/* ── Ayrıştırıcı: kabul edilen biçimler (sayfadaki “Cevap nasıl yazılır?” listesi) ── */
const num=s=>K.parseNum(s).v;
for(const[s,v]of[['3',3],['-3',-3],['−3',-3],['3,5',3.5],['3.5',3.5],['7/2',3.5],['-7/2',-3.5],['x = 7/2',3.5],['x=−2',-2],['  4 ',4],['2√3',2*Math.sqrt(3)],['√(16)',4],['kök 9',3],['sqrt(2)',Math.sqrt(2)],['(1+√5)/2',(1+Math.sqrt(5))/2],['2^3',8],['2³',8],['1/3',1/3],['6 cm',6],['12 yıl',12],['3 saat',3],['15 L',15],['0,25',0.25],['−(2−5)',3],['2·3',6],['2×3',6],['10 : 2',null]]){
  if(v===null){assert.throws(()=>num(s),K.ParseError);checks++;}else near(num(s),v,1e-12,s);}
for(const s of['','x','2 3','3 1/2','(2','2)','2,,5','abc','1/0','√(−4)','2 ± 1','2; 3','x < 3'])assert.throws(()=>K.parseNum(s),K.ParseError,s),checks++;
eq(K.parseNum('2,5').dec,true);eq(K.parseNum('5/2').dec,false);ok(K.qEq(K.parseNum('2,5').q,K.Q(5,2)));
const roots=s=>{const r=K.parseRoots(s);return r.none?'yok':r.vals.map(v=>+v.v.toFixed(9)).sort((a,b)=>a-b).join(';');};
for(const[s,e]of[['2, -3','-3;2'],['2,-3','-3;2'],['2; -3','-3;2'],['2 veya -3','-3;2'],['x=2 veya x=-3','-3;2'],['x₁ = 2, x₂ = −3','-3;2'],['x1=2; x2=-3','-3;2'],['{2, −3}','-3;2'],['Ç = {−3, 2}','-3;2'],['±3','-3;3'],['1 ± √3',[1-Math.sqrt(3),1+Math.sqrt(3)].map(v=>+v.toFixed(9)).join(';')],
  ['(−1 ± √5)/2',[(-1-Math.sqrt(5))/2,(-1+Math.sqrt(5))/2].map(v=>+v.toFixed(9)).join(';')],['2,5','2.5'],['2,5; 1','1;2.5'],['2 ve 5','2;5'],['4 (çift kök)','4'],['yok','yok'],['∅','yok'],['Reel kök yok','yok'],['çözüm yok','yok'],['x = 1/2 ya da x = −4','-4;0.5'],['+-2','-2;2'],['3, 3','3;3']])eq(roots(s),e,s);
for(const s of['','x=','y = 2','1 ± 2 ± 3','2 <3','x² = 4'])assert.throws(()=>K.parseRoots(s),K.ParseError,s),checks++;
const iv=s=>K.setInterval(K.parseIneq(s));
for(const[s,e]of[['x < 3','('+M+'∞, 3)'],['x<=3','('+M+'∞, 3]'],['x ≤ 3','('+M+'∞, 3]'],['x =< 3','('+M+'∞, 3]'],['x ≥ −2','[−2, ∞)'.replace('−',M)],['x>=-2','['+M+'2, ∞)'],['3 > x','('+M+'∞, 3)'],['−1 < x < 5','('+M+'1, 5)'],['5 > x ≥ -1','['+M+'1, 5)'],
  ['(−1, 5)','('+M+'1, 5)'],['[2, ∞)','[2, ∞)'],['(-∞; 3]','('+M+'∞, 3]'],['(2,5, 4)','(5/2, 4)'],['x < −1 veya x > 5','('+M+'∞, '+M+'1) ∪ (5, ∞)'],['(5, ∞) ∪ (−∞, −1)','('+M+'∞, '+M+'1) ∪ (5, ∞)'],['x ≤ 1 ya da x ≥ 2','('+M+'∞, 1] ∪ [2, ∞)'],['yok','∅'],['R','('+M+'∞, ∞)'],['her x','('+M+'∞, ∞)'],['x > 1/2','(1/2, ∞)'],['x > 0,5','(1/2, ∞)']])eq(iv(s),e,s);
for(const s of['','x','x < 3 < 4 < 5','3 < 5','x < y','[−∞, 3)','(5, 1)','−1 < x > 5','x <','(1, 2, 3)'])assert.throws(()=>K.parseIneq(s),K.ParseError,s),checks++;
const pair=s=>{const p=K.parsePair(s);return p.none?'yok':p.inf?'sonsuz':p.x.v+','+p.y.v;};
for(const[s,e]of[['(2, -1)','2,-1'],['(2,-1)','2,-1'],['(2; −1)','2,-1'],['x=2, y=-1','2,-1'],['y = −1, x = 2','2,-1'],['x = 2 ve y = −1','2,-1'],['2, -1','2,-1'],['(x, y) = (2, −1)','2,-1'],['(2,5; 1)','2.5,1'],['(2,5, 1)','2.5,1'],['(28/5, 19/5)','5.6,3.8'],['yok','yok'],['çözüm yok','yok'],['sonsuz','sonsuz'],['sonsuz çözüm','sonsuz'],['Sonsuz çok çözüm','sonsuz']])eq(pair(s),e,s);
for(const s of['','(2)','(1, 2, 3)','x=1, x=2','±1, 2'])assert.throws(()=>K.parsePair(s),K.ParseError,s),checks++;
// İfade biçimleri
const poly=s=>K.polyStr(K.parsePolyAnswer(s).p);
for(const[s,e]of[['(x+2)(x+3)','x² + 5x + 6'],['(x + 2)·(x + 3)','x² + 5x + 6'],['2(x−1)²','2x² '+M+' 4x + 2'],['x(x−5)','x² '+M+' 5x'],['−(x−1)(x+2)',M+'x² '+M+' x + 2'],['(2x+1)^2','4x² + 4x + 1'],['x² + 5x + 6 = (x+2)(x+3)','x² + 5x + 6'],['(x+6)/3','(1/3)x + 2'],['3x+2−x+5','2x + 7']])eq(poly(s),e,s);
for(const s of['1/x','√x','x^x','x2','(x+1','x < 2'])assert.throws(()=>K.parsePolyAnswer(s),K.ParseError,s),checks++;
const E=s=>K.parseExpr(K.normalize(s));
for(const[s,v]of[['x² + 5x + 6',true],['6 + x² + 5x',true],['x² + 2x + 3x + 6',false],['(x+2)(x+3)',false],['2x + 7',true],['−x² − x + 2',true]])eq(K.isExpanded(E(s)),v,s);
for(const[s,c,l,cf]of[['(x+2)(x+3)',2,true,false],['2(x+1)(x+3)',2,true,false],['(2x+2)(x+3)',2,true,true],['(x+3)^2',2,true,false],['x(x−5)',2,true,false],['x²+5x+6',1,false,false],['−(x−1)(x+2)',2,true,false]]){const S=K.factorShape(E(s));eq(S.count,c,s);eq(S.linear,l,s);eq(!!S.contentFactor,cf,s);}
for(const[s,v]of[['(x+3)^2 − 4',true],['2(x−1)² + 5',true],['(x+3)²',true],['x² + 6x + 5',false],['(x+1)(x+5)',false],['(x+3)^2 + x',false]])eq(K.isVertexForm(E(s)),v,s);

/* ── Alıştırma üreteci: her seviye ve tür için 150 soru; hedef bağımsız yerine koymayla denetlenir ── */
const sample=[];for(let i=-200;i<=200;i++)sample.push(i/10+0.013);
const okIneq=(set,f)=>sample.every(x=>K.inSet(set,x)===f(x));
const OPF={'<':(a,b)=>a<b,'≤':(a,b)=>a<=b,'>':(a,b)=>a>b,'≥':(a,b)=>a>=b};
const tvals=t=>t.map(r=>r.v);
let generated=0;const seen=new Set();
for(let L=1;L<=3;L++)for(const[type]of K.TYPES[L-1])for(let n=1;n<=150;n++){const ex=K.makeExercise(L,n,type);generated++;seen.add(ex.prompt);
  eq(ex.type,type);ok(ex.steps.length>=2&&ex.hint.length>10,type+' adım/ipucu');ok(!/-/.test(ex.prompt+ex.answer+ex.steps.join('')),type+' tire yerine eksi işareti');
  const g=K.grade(ex,ex.answer);ok(g.st==='dogru'||g.st==='yaklasik',`${type} ${n}: kendi cevabı ${ex.answer} → ${g.st} ${g.msg}`);
  const p=ex.prompt;
  if(/^(esitlik1|esitlik2|parantez)$/.test(type)){const[l,r]=side(p,'=').map(toJs),x=ex.target.v;near(l(x),r(x),1e-9,p);}
  else if(type==='deger'){const x=Number(p.match(/x = (\S+) için/)[1].replace(M,'-'));const f=toJs(p.match(/için (.*) ifadesinin/)[1]);eq(f(x),ex.target.v,p);}
  else if(/^(sadelestir|dagit|ozdeslik)$/.test(type)){const f=toJs(p.replace(/^[^:]*:\s*/,'')),g2=toJs(ex.answer);for(const x of[-3,-1,0,2,5,7.5])near(f(x),g2(x),1e-9,p);}
  else if(/^carpan/.test(type)){const f=toJs(p.replace(/^[^:]*:\s*/,'')),g2=toJs(ex.answer);for(const x of[-3,-1,0,2,5,7.5])near(f(x),g2(x),1e-9,p);ok(/\)/.test(ex.answer)||/^x\(/.test(ex.answer));}
  else if(/^esitsizlik/.test(type)){const m=p.replace(/^[^:]*:\s*/,'').match(/^(.*) ([<>≤≥]) (\S+)$/);const f=toJs(m[1]),c=Number(m[3].replace(M,'-'));ok(okIneq(ex.target,x=>OPF[m[2]](f(x),c)),p);}
  else if(type==='mutlak'){const m=p.replace(/^[^:]*:\s*/,'').match(/^(.*) ([<>≤≥]) (\S+)$/);const f=toJs(m[1]),c=Number(m[3]);ok(okIneq(ex.target,x=>OPF[m[2]](f(x),c)),p);}
  else if(type==='ikinci'){const s=p.replace(/^[^:]*:\s*/,'').replace(/ = 0$/,'');const f=toJs(s);const m=s.replace(/−/g,'-').replace(/\s/g,'');
    const co=[0,0,0];for(const t of m.match(/[+-]?[^+-]+/g)){const mm=t.match(/^([+-]?\d*)(x²|x)?$/);const c=mm[1]===''||mm[1]==='+'?1:mm[1]==='-'?-1:Number(mm[1]);co[mm[2]==='x²'?2:mm[2]==='x'?1:0]+=c;}
    const D=co[1]**2-4*co[2]*co[0];eq(ex.target.length,D>0?2:D===0?1:0,p);for(const r of tvals(ex.target))near(f(r),0,1e-7,p);}
  else if(/^sistem/.test(type)){const eqs=p.replace(/^[^:]*:\s*/,'').split(' ve ').map(e=>e.split(' = '));const fs=eqs.map(([l,r])=>{const s=l.replace(/−/g,'-').replace(/\s/g,'');const a=s.match(/([+-]?\d*)x/),b=s.match(/([+-]?\d*)y/);const v=t=>t===undefined?0:t===''||t==='+'?1:t==='-'?-1:Number(t);return[a?v(a[1]):0,b?v(b[1]):0,Number(r.replace(M,'-'))];});
    const T=ex.target;if(T.x)for(const[a,b,c]of fs)near(a*T.x.v+b*T.y.v,c,1e-9,p);else{const[[a1,b1,c1],[a2,b2,c2]]=fs;eq(a1*b2-a2*b1,0,p);const r=a2/a1;eq(Math.abs(c2-r*c1)<1e-9,!!T.inf,p);}}
  else if(type==='tamkare'){const f=toJs(p.replace(/^[^:]*:\s*/,'').split(' = ')[0]),g2=toJs(ex.answer);for(const x of[-3,0,2,5])near(f(x),g2(x),1e-9,p);ok(/\)²/.test(ex.answer));}
  else if(type==='sozel1'){const nums=p.match(/\d+/g).map(Number);if(/annenin/.test(p)){const[Mo,C,k]=nums;near(Mo+ex.target.v,k*(C+ex.target.v),1e-9,p);ok(ex.target.v>0);ok(Mo-C>=18,'yaş problemi: anne ile kız arasında en az 18 yaş — '+p);}else{const[k,m,nn]=nums;near(k*ex.target.v+m,nn,1e-9,p);}}
  else if(type==='sozel2'){const[d,A]=p.match(/\d+/g).map(Number);const x=ex.target.v;near(x*(x+d),A,1e-9,p);ok(x>0);}
  else assert.fail('denetlenmeyen tür '+type);}
ok(seen.size>generated*0.6,'sorular yeterince çeşitli: '+seen.size+'/'+generated);
for(let L=1;L<=3;L++)for(let n=1;n<=40;n++){eq(K.makeExercise(L,n).prompt,K.makeExercise(L,n).prompt);}
eq(K.makeExercise(1,1).prompt,'Çöz: 6x '+M+' 2 = 4');

/* Notlama: tipik yanlış ve yarım cevaplar */
const ex=t=>({...t});
const G=(e,s)=>K.grade(e,s).st;
{const e=ex({kind:'num',target:K.tv(K.Q(1,3)),answer:'1/3'});eq(G(e,'1/3'),'dogru');eq(G(e,'2/6'),'dogru');eq(G(e,'0,33'),'yaklasik');eq(G(e,'0.333'),'yaklasik');eq(G(e,'0,3'),'yanlis');eq(G(e,'abc'),'gecersiz');eq(G(e,''),'gecersiz');}
{const e=ex({kind:'roots',target:[K.tv(-3),K.tv(2)],answer:'−3 ve 2'});eq(G(e,'2, -3'),'dogru');eq(G(e,'2'),'eksik');eq(G(e,'2, 3'),'yanlis');eq(G(e,'yok'),'yanlis');eq(G(e,'2, −3, 5'),'yanlis');eq(G(e,'x=2 veya x=-3'),'dogru');}
{const I=K.quadInfo(1,-2,-2);const e=ex({kind:'roots',target:I.roots,answer:I.exact});eq(I.exact,'1 ± √3');eq(G(e,'1 ± √3'),'dogru');eq(G(e,'1+√3; 1-√3'),'dogru');eq(G(e,'2,73; −0,73'),'yaklasik');eq(G(e,'2,7; −0,7'),'yanlis');eq(G(e,'(2 ± √12)/2'),'dogru');}
{const e=ex({kind:'roots',target:[],answer:'reel kök yok'});eq(G(e,'yok'),'dogru');eq(G(e,'0'),'yanlis');}
{const e=ex({kind:'ineq',target:K.linearIneq(-2,3,'<',9).set,answer:'x > −3'});eq(G(e,'x > -3'),'dogru');eq(G(e,'(−3, ∞)'),'dogru');eq(G(e,'-3 < x'),'dogru');eq(G(e,'x < -3'),'yanlis');ok(/yön ters/.test(K.grade(e,'x < -3').msg));eq(G(e,'x ≥ -3'),'yanlis');ok(/dahil/.test(K.grade(e,'x ≥ -3').msg));}
{const e=ex({kind:'ineq',target:K.absIneq(2,3,'>'),answer:''});eq(G(e,'x < -1 veya x > 5'),'dogru');eq(G(e,'-1 < x < 5'),'yanlis');}
{const e=ex({kind:'pair',target:{x:K.tv(2),y:K.tv(-1)}});eq(G(e,'(2, -1)'),'dogru');eq(G(e,'(-1, 2)'),'yanlis');ok(/yeri karışmış/.test(K.grade(e,'(-1, 2)').msg));eq(G(e,'yok'),'yanlis');eq(G(e,'(2)'),'gecersiz');}
{const e=ex({kind:'pair',target:{none:true}});eq(G(e,'yok'),'dogru');eq(G(e,'sonsuz'),'yanlis');eq(G(e,'(1, 1)'),'yanlis');}
{const e=ex({kind:'factor',target:[K.Q(6),K.Q(8),K.Q(2)]});eq(G(e,'2(x+1)(x+3)'),'dogru');eq(G(e,'(2x+2)(x+3)'),'eksik');eq(G(e,'2x²+8x+6'),'eksik');eq(G(e,'2(x+1)(x+2)'),'yanlis');eq(G(e,'(x+3)·2·(x+1)'),'dogru');}
{const e=ex({kind:'expr',form:'expanded',target:[K.Q(9),K.Q(6),K.Q(1)]});eq(G(e,'x²+6x+9'),'dogru');eq(G(e,'(x+3)²'),'eksik');eq(G(e,'x²+3x+3x+9'),'eksik');eq(G(e,'x²+9'),'yanlis');}
{const e=ex({kind:'expr',form:'vertex',target:[K.Q(5),K.Q(6),K.Q(1)]});eq(G(e,'(x+3)²−4'),'dogru');eq(G(e,'(x+3)^2 - 4'),'dogru');eq(G(e,'x²+6x+5'),'eksik');eq(G(e,'(x+3)²+4'),'yanlis');}

/* ── Birinci derece, eşitsizlik, mutlak değer: örnek noktalarla ── */
for(let a=-6;a<=6;a++)for(let b=-6;b<=6;b+=3)for(let c=-6;c<=6;c++)for(let d=-6;d<=6;d+=4){const S=K.solveLinear(a,b,c,d);
  if(a===c)eq(S.kind,b===d?'all':'none');else{const x=K.qNum(S.x);near(a*x+b,c*x+d,1e-9);const st=K.linearSteps(a,b,c,d);ok(st[st.length-1].startsWith('Denetim'));}}
for(let a=-5;a<=5;a++)for(let b=-6;b<=6;b+=2)for(const op of['<','≤','>','≥'])for(let c=-9;c<=9;c+=3){const L=K.linearIneq(a,b,op,c);ok(okIneq(L.set,x=>OPF[op](a*x+b,c)),`${a}x+${b}${op}${c}`);
  if(L.bound){const v=K.qNum(L.bound);eq(K.inSet(L.set,v),op==='≤'||op==='≥');}}
for(let m=-5;m<=5;m++)for(const r of[-2,-0.5,0,0.5,1,3,6])for(const op of['<','≤','>','≥','=']){const S=K.absIneq(m,K.qOf(r),op);ok([...sample,m,m-r,m+r].every(x=>K.inSet(S,x)===(op==='='?Math.abs(x-m)===r:OPF[op](Math.abs(x-m),r))),`|x−${m}|${op}${r}`);}

/* ── Sistemler: yerine koyma ve paralellik ── */
let sysN=0;for(let a1=-3;a1<=3;a1++)for(let b1=-3;b1<=3;b1++)for(let a2=-3;a2<=3;a2++)for(let b2=-3;b2<=3;b2+=2)for(const[c1,c2]of[[5,1],[2,4],[0,0],[-3,6]]){const R=K.solveSystem(a1,b1,c1,a2,b2,c2);sysN++;
  if((a1===0&&b1===0)||(a2===0&&b2===0)){eq(R.kind,'bad');continue;}
  if(R.kind==='one'){const x=K.qNum(R.x),y=K.qNum(R.y);near(a1*x+b1*y,c1,1e-9);near(a2*x+b2*y,c2,1e-9);
    for(const st of[K.eliminationSteps(a1,b1,c1,a2,b2,c2),K.substitutionSteps(a1,b1,c1,a2,b2,c2)])ok(st[st.length-1].endsWith('('+K.qStr(R.x)+', '+K.qStr(R.y)+')'),'adımlar aynı çözümle biter');}
  else{eq(a1*b2-a2*b1+0,0);// paralel ya da çakışık: ikinci doğrunun bir noktasını birincide dene
    const P=b2!==0?[0,c2/b2]:[c2/a2,0];const on=Math.abs(a1*P[0]+b1*P[1]-c1)<1e-9;eq(R.kind,on?'inf':'none');}}
ok(sysN>2000);

/* ── İkinci derece: kökler denklemi sağlar, sayısı Δ işaretinden; ölçülen kesimler formülle örtüşür ── */
for(let a2=-6;a2<=6;a2++){if(!a2)continue;const a=a2/2;for(let b=-12;b<=12;b++)for(let c=-40;c<=40;c+=3){const I=K.quadInfo(K.qOf(a),b,c),f=x=>a*x*x+b*x+c,D=b*b-4*a*c;
  eq(I.roots.length,D>0?2:D===0?1:0);for(const r of I.roots)near(f(r.v),0,1e-8*Math.max(1,Math.abs(b*r.v),Math.abs(c)));near(K.qNum(I.D),D,1e-9);
  const h=-b/(2*a);near(K.qNum(I.h),h,1e-12);near(K.qNum(I.k),f(h),1e-9);
  const span=I.roots.length?Math.max(4,1.6*Math.max(...I.roots.map(r=>Math.abs(r.v-h)))+1):4;const meas=K.bisectRoots(f,h-span,h+span);eq(meas.length,I.roots.length,`ölçülen kök sayısı ${a},${b},${c}`);meas.forEach((v,i)=>near(v,I.roots[i].v,1e-7));}}
eq(K.quadInfo(1,10,-39).exact,M+'13 ve 3');eq(K.quadInfo(2,-3,-1).exact,'(3 ± √17)/4');eq(K.quadInfo(1,-6,9).exact,'3 (çift kök)');eq(K.quadInfo(1,2,5).kind,'yok');eq(K.quadInfo(0,1,1),null);

/* ── Çarpanlara ayırma: sonuç açılınca aynı polinom; ayrılabilirlik ⇔ Δ tam kare ── */
const isSq=n=>n>=0&&Math.round(Math.sqrt(n))**2===n;let fN=0;
for(let a=1;a<=6;a++)for(let b=-15;b<=15;b++)for(let c=-30;c<=30;c++){const R=K.factorQuad(a,b,c);fN++;eq(R.result!==null,isSq(b*b-4*a*c),`${a},${b},${c}`);
  if(R.result){const f=toJs(R.result);for(const x of[-2.5,0,1,3.25])near(f(x),a*x*x+b*x+c,1e-9,R.result);const hit=R.pairs.filter(p=>p.hit).length;ok(R.pairs.length===0||hit>=1);}}
eq(K.factorQuad(2,7,3).result,'(x + 3)(2x + 1)');eq(K.factorQuad(3,0,-12).result,'3(x '+M+' 2)(x + 2)');eq(K.factorQuad(1,-5,0).result,'x(x '+M+' 5)');eq(K.factorQuad(1,1,1).result,null);eq(K.factorQuad(1,-6,9).result,'(x '+M+' 3)²');

/* ── Terazi: iki kefeye uygulanan işlem çözümü korur, tek kefeye uygulanan değiştirir ── */
for(let i=0;i<400;i++){const r=K.rng(i+1);const ri=(a,b)=>a+Math.floor(r()*(b-a+1));let a=ri(-6,6),c=ri(-6,6);if(a===c)c=a+1;const E0={a:K.Q(a),b:K.Q(ri(-12,12)),c:K.Q(c),d:K.Q(ri(-12,12))};const x0=K.solveLinear(E0.a,E0.b,E0.c,E0.d).x;
  let E=E0;for(let j=0;j<5;j++){const op=[{t:'const',k:ri(-5,5)},{t:'x',k:ri(-3,3)},{t:'mul',k:ri(1,4)*(r()<0.5?-1:1)}][ri(0,2)];E=K.balOp(E,op,true);}const S=K.solveLinear(E.a,E.b,E.c,E.d);ok(S.kind==='one'&&K.qEq(S.x,x0),'yasal adımlar çözümü korur');
  const E1=K.balOp(E0,{t:'const',k:ri(1,5)},false),S1=K.solveLinear(E1.a,E1.b,E1.c,E1.d);ok(S1.kind!=='one'||!K.qEq(S1.x,x0),'tek kefe çözümü değiştirir');}
assert.throws(()=>K.balOp({a:K.Q(1),b:K.Q(1),c:K.Q(0),d:K.Q(2)},{t:'mul',k:0}));checks++;

/* ── Sözel problemler: her parametrede kendi denklemi ── */
for(const W of K.WORD){const P=W.params;const grid=P.map(p=>{const v=[];for(let x=p.min;x<=p.max;x+=p.step)v.push(x);return v;});
  const combos=[[]];for(const g of grid){const nxt=[];for(const c of combos)for(const v of g.filter((_,i)=>i%Math.max(1,Math.floor(g.length/9))===0||_===P[combos[0].length]?.def))nxt.push([...c,v]);combos.splice(0,combos.length,...nxt);}
  for(const vals of combos){const p={};P.forEach((q,i)=>p[q.id]=vals[i]);const B=W.build(p);const x=B.ans?K.qNum(B.ans):B.ansV;checks++;
    if(W.id==='sayi')near(p.k*x+p.m,p.n,1e-9);else if(W.id==='yas')near(p.M+x,p.k*(p.C+x),1e-9);else if(W.id==='kumbara'){const y=p.N-x;near(5*x+y,p.V,1e-9);}
    else if(W.id==='karisim')near(0.2*p.V0+0.5*x,p.p/100*(p.V0+x),1e-9);else if(W.id==='hareket')near((p.v1+p.v2)*x,p.D,1e-9);else if(W.id==='alan'){near(x*(x+p.d),p.A,1e-9);ok(x>0);}
    ok(W.text(p).length>20&&B.eq&&B.check&&B.mean);}
  const p={};P.forEach(q=>{p[q.id]=q.def;ok((q.def-q.min)%q.step===0&&q.def<=q.max,'varsayılan kaydırıcıyla ulaşılabilir');});}
{const B=K.WORD[1].build({M:30,C:12,k:3});ok(/negatif/.test(B.mean));const C=K.WORD[2].build({N:20,V:51});ok(/Gerçek bir dağılım yok/.test(C.mean));const D=K.WORD[2].build({N:20,V:52});eq(K.qStr(D.ans),'8');}

/* ── Sık yapılan hatalar: her a, b için yanlış kural gerçekten yanlış, doğrusu doğru ── */
for(let a=1;a<=9;a++)for(let b=1;b<=9;b++){const T=Object.fromEntries(K.MISTAKES.map(m=>[m.id,m.test(a,b)]));
  eq(T.kare.differs,true);ok((a+b)**2!==a*a+b*b&&(a+b)**2===a*a+2*a*b+b*b);ok(Math.sqrt(a*a+b*b)<a+b);eq(T.bolme.lost,true);ok(0*0===b*0);
  ok(-a*0<a*b&&!(0<-b));const xw=b-a;ok(3*xw-a!==2*xw+b&&3*(a+b)-a===2*(a+b)+b);ok(-(b-a)!==-b-a);eq(T.sadele.differs,b!==0);ok((b+3*a)/3!==b+a);}
eq(K.MISTAKES.length,7);
// Doğrulayıcı (13 Kasım): “sonsuz” açık iletiyle reddedilir; iki denklemde de y yoksa adımlar çökmez; sözel denetimlerde kesirler parantezli
assert.throws(()=>K.parseRoots('sonsuz'),/en çok iki kökü/);assert.throws(()=>K.parseNum('sonsuz'),/bir sayı değil/);checks+=2;
for(const[sys,w]of[[[2,0,4,3,0,6],'sonsuz çözüm'],[[2,0,4,3,0,5],'çözüm yok']])for(const f of[K.eliminationSteps,K.substitutionSteps]){const st=f(...sys).join(' ');ok(st.includes('dikey')&&st.includes(w),st);}
ok(K.WORD[1].build({M:41,C:13,k:4}).check.endsWith('4·(28/3) = 112/3'));ok(K.WORD[2].build({N:20,V:200}).check.startsWith('45 + ('+M+'25)'));ok(K.WORD[4].build({D:100,v1:20,v2:50}).check.startsWith('20·(10/7) + 50·(10/7) = 200/7 + 500/7'));eq(K.WORD[4].build({D:360,v1:70,v2:50}).mean.slice(0,12),'Tam 3 saat. ');

console.log(`G cebirin-temelleri: ${checks.toLocaleString('tr-TR')} bağımsız çekirdek kontrolü PASS (${generated} üretilmiş soru, ${fN} çarpanlara ayırma, ${sysN} sistem)`);

if(process.argv.includes('--browser')){
  const {chromium}=await import('playwright');const {createServer}=await import('node:http');const {join,extname}=await import('node:path');const {fileURLToPath}=await import('node:url');const root=fileURLToPath(new URL('../',import.meta.url));
  const server=createServer((req,res)=>{const file=join(root,decodeURIComponent(new URL(req.url,'http://localhost').pathname));if(!fs.existsSync(file)||fs.statSync(file).isDirectory()){res.writeHead(404).end();return;}res.setHeader('Content-Type',({'.html':'text/html; charset=utf-8','.js':'text/javascript; charset=utf-8','.css':'text/css; charset=utf-8'})[extname(file)]||'application/octet-stream');res.end(fs.readFileSync(file));});await new Promise(r=>server.listen(0,'127.0.0.1',r));let browser;const before=checks;
  try{browser=await chromium.launch();
    for(const[theme,width]of[['light',390],['dark',1280]]){
      const page=await browser.newPage({viewport:{width,height:900},deviceScaleFactor:width===390?2:1});await page.addInitScript(t=>{localStorage.setItem('acelya-theme',t);localStorage.setItem('acelya-sound-muted','1');},theme);page.setDefaultTimeout(8000);
      const errors=[];page.on('pageerror',e=>errors.push(e.message));
      page.on('response',r=>{if(r.status()>=400&&!/shared\/digest\/cebirin-temelleri\.js$/.test(r.url()))errors.push(r.status()+' '+r.url());});
      page.on('console',m=>{if(m.type()==='error'&&!/Failed to load resource/.test(m.text()))errors.push(m.text());});
      await page.goto(`http://127.0.0.1:${server.address().port}/cebirin-temelleri.html`);await page.waitForTimeout(250);
      const click=id=>page.locator('#'+id).click(),read=async id=>(await page.locator('#'+id).textContent()).replace(/ /g,' '),set=(id,v)=>page.locator('#'+id).evaluate((e,v)=>{if(e.type==='checkbox')e.checked=v;else e.value=v;e.dispatchEvent(new Event(e.tagName==='SELECT'||e.type==='checkbox'?'change':'input',{bubbles:true}));},v),
        is=async(id,t)=>{eq(await read(id),t,id);},has=async(id,t)=>{const s=await read(id);ok(s.includes(t),`${id}: “${s}” içinde “${t}” yok`);},fits=async()=>eq(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),true,'yatay taşma');
      eq(await page.evaluate(()=>[...document.querySelectorAll('.app-content input,.app-content select')].filter(e=>!document.querySelector('label[for="'+e.id+'"]')).map(e=>e.id).join()),'','etiketsiz denetim');
      eq(await page.evaluate(()=>{const cs=[...document.querySelectorAll('.app-content svg.cb-svg')];return cs.length===10&&cs.every(c=>c.getAttribute('role')==='img'&&!!c.getAttribute('aria-label'));}),true,'svg erişilebilirliği');
      eq(await page.evaluate(()=>Object.isFrozen(AlgebraLab)&&!Object.getOwnPropertyDescriptor(window,'AlgebraLab').writable),true);
      eq(await page.evaluate(()=>/[̀-ͯ]/.test(document.body.innerText)),false,'birleşik aksan işareti yok');
      eq(await page.evaluate(()=>document.querySelectorAll('input[type=number]').length),0);
      eq(await page.evaluate(()=>document.title.length<=80),true);
      ok((await page.locator('#bundan-sonra ~ .cb-next a').count())===3,'Bundan sonra: üç mevcut sayfa bağlantısı');eq(await page.locator('#bundan-sonra + .cb-lead a[href="aritmetik-ve-sayilar.html"]').count(),1);eq(await page.locator('.cb-next a[href="us-ve-logaritma.html"]').count(),1);eq(await page.evaluate(()=>document.body.innerText.includes('hazırlanıyor')),false);
      // 01 · İfade
      await is('exSimp','2x + 7');await is('exVal1','11');await is('exVal2','11');await has('exVal2n','eşdeğer');
      await click('exP2');await is('exSimp',M+'x + 8');await has('exTerms','Parantez açılır');await click('exP3');await is('exSimp','2x + 1');await set('exX',-5);await is('exVal1',M+'9');
      await set('exIn','2x+');await has('exStatus','Anlaşılamadı');await is('exSimp','—');await set('exIn','x = 2');await has('exStatus','denklem');await set('exIn','1/x');await is('exDeg','polinom değil');
      await is('arProd','(4 + 3)·(4 + 2) = 42');await is('arSum','16 + 8 + 12 + 6 = 42');await is('arExp','x² + 5x + 6');await set('arX',10);await set('arP',9);await set('arQ',9);await is('arProd','(10 + 9)·(10 + 9) = 361');await is('arExp','x² + 18x + 81');
      await is('idLeft','64');await is('idRight','25 + 30 + 9 = 64');await is('idWrong','34');eq(await page.locator('#idTF').isHidden(),true);
      await set('idKind','diff');await is('idLeft','4');await is('idRight','25 '+M+' 30 + 9 = 4');await is('idWrong','16');await set('idB',7);await has('idStatus','a > b olmalı');
      await set('idKind','sq');await set('idB',3);eq(await page.locator('#idTF').isVisible(),true);await is('idRight','8·2 = 16');await set('idT',100);await has('idStatus','Dikdörtgen tamam: 8 × 2 = 16');
      await is('fResult','(x + 2)(x + 3)');await is('fCheckN','çarpım açılınca aynı ifade: doğru');eq(await page.locator('#fPlate').isVisible(),true);
      await click('fP2');await is('fResult','(x + 3)(2x + 1)');await is('fCheck','2x² + 7x + 3');await click('fP3');await is('fResult','3(x '+M+' 2)(x + 2)');eq(await page.locator('#fPlate').isHidden(),true);
      await click('fP4');await is('fResult','x(x '+M+' 5)');await click('fP5');await is('fResult','ayrılmaz');await has('fSteps','Δ = '+M+'3 < 0');
      await set('fA',6);await set('fB',-15);await set('fC',-21);await is('fExpr','6x² '+M+' 15x '+M+' 21');await is('fResult','3(x + 1)(2x '+M+' 7)');await set('fC',-30);await is('fResult','ayrılmaz');
      await click('ifadeReset');await is('fResult','(x + 2)(x + 3)');await is('arProd','(4 + 3)·(4 + 2) = 42');await is('exSimp','2x + 7');eq(await page.locator('#idKind').inputValue(),'sum');await fits();
      await page.locator('#tab-ifade').focus();await page.keyboard.press('ArrowRight');eq(await page.locator('#tab-denklem').getAttribute('aria-selected'),'true');
      // 02 · Terazi
      await is('balEq','3x + 4 = x + 10');await is('balL','3x + 4 = 7');await is('balR','x + 10 = 11');await is('balSol','x = 3');await is('balCheck','sol 13, sağ 13');await has('balLR','sağ ağır');
      await set('eqT',3);await has('balLR','denge');await has('balStatus','çözüm: terazi dengede');
      await click('opXR');await is('balEq','2x + 4 = 10');await click('opKL');await is('balEq','2x = 6');await click('opDiv');await is('balEq','x = 3');await has('balStatus','x yalnız kaldı: x = 3');eq(await page.locator('#balLog li').count(),4);await is('balSolN','başlangıçtakiyle aynı');
      await click('eqUndo');await is('balEq','2x = 6');await set('eqOne',true);await click('opAdd1');await is('balEq','2x + 1 = 6');await has('balStatus','Denge bozuldu');await is('balSol','x = 5/2');await has('balCheckN','eşit değil');eq(await page.locator('#balLog li.is-bad').count(),1);
      await set('eqOne',false);await click('opNeg');await is('balEq',M+'2x '+M+' 1 = '+M+'6');
      await click('eqP3');await is('balSol','çözüm yok');await has('balStatus','Çözüm yok');await click('opXR');await is('balEq','1 = 5');eq(await page.locator('#opDiv').isDisabled(),true);
      await click('eqP4');await is('balSol','her x çözüm');await has('balStatus','özdeşlik');await click('eqP2');await is('balSol','x = 5');
      await set('eqA',0);await set('eqC',0);await has('balStatus','x’ler iki tarafta aynı');await set('eqA',-6);await set('eqB',-12);await set('eqC',6);await set('eqD',12);await is('balSol','x = '+M+'2');
      await page.locator('h1').click();await page.keyboard.press('r');await is('balEq','3x + 4 = x + 10');eq(await page.locator('#balLog li').count(),1);await fits();
      // 03 · Eşitsizlik
      await click('tab-esitsizlik');await is('inSol','x > '+M+'3');await has('inInt','yön değişti');await has('inTest','doğru');await is('inTest2','kümede');
      await set('iT',-5);await has('inTest','yanlış');await is('inTest2','kümede değil');await set('iT',-3);await is('inTest2','kümede değil');await set('iOp','≤');await is('inSol','x ≥ '+M+'3');await is('inTest2','kümede');
      await click('iP2');await is('inSol','x ≥ 3');await click('iP3');await has('inSol','her x');await set('iOp','<');await has('inSol','çözüm yok');
      await is('flNew','k·u = '+M+'2, k·v = '+M+'5: '+M+'2 > '+M+'5');await is('flNewN','yön değişti');await set('mK',2.5);await is('flNewN','yön aynı kaldı');await set('mK',0);await has('flNewN','k = 0');
      await is('abSol',M+'1 < x < 5');await is('abInt','('+M+'1, 5)');await set('aOp','≥');await is('abSol','x ≤ '+M+'1 veya x ≥ 5');await set('aOp','=');await is('abSol','x = '+M+'1 veya x = 5');await set('aR',-2);await has('abStatus','Uzaklık negatif olamaz');await is('abSol','çözüm yok (∅)');await set('aR',0);await is('abSol','x = 2');
      await click('esitsizlikReset');await is('inSol','x > '+M+'3');await is('abSol',M+'1 < x < 5');await is('flNewN','yön değişti');await fits();
      // 04 · Sistemler
      await page.locator('#tab-esitsizlik').focus();await page.keyboard.press('ArrowRight');eq(await page.locator('#tab-sistem').getAttribute('aria-selected'),'true');
      await is('sySol','(2, 3)');await is('syDet','1·('+M+'1) '+M+' 2·1 = '+M+'3');await is('syCheck','(1) 5 = 5, (2) 1 = 1');await has('sySteps','Taraf tarafa çıkar');
      await set('sMethod','sub');await has('sySteps','y’yi yalnız bırak');await has('sySteps','(2, 3)');
      await click('syP2');await is('sySol','(34/11, 3/11)');await click('syP3');await is('sySol','çözüm yok');await has('syStatus','paralel');await click('syP4');await is('sySol','sonsuz çözüm');
      await set('s1b','0');await set('s2b','0');await set('sMethod','sub');await has('sySteps','dikey');await set('sMethod','elim');await has('sySteps','dikey');await click('sistemReset');await set('s1a','x');await has('syStatus','tam sayı olmalı');await set('s1a','0');await set('s1b','0');await has('syStatus','bu bir doğru değil');
      await click('sistemReset');await is('sySol','(2, 3)');
      {await page.locator('#sysSvg').scrollIntoViewIfNeeded();const box=await page.locator('#sysSvg').boundingBox();const pt=await page.evaluate(()=>{const s=document.getElementById('sysSvg'),h=s.querySelector('[data-h="00"]');const r=s.getBoundingClientRect(),vb=s.viewBox.baseVal;return[+h.getAttribute('cx')*r.width/vb.width,+h.getAttribute('cy')*r.height/vb.height,r.width/vb.width*(vb.width-44)/20];});
        await page.mouse.move(box.x+pt[0],box.y+pt[1]);await page.mouse.down();await page.mouse.move(box.x+pt[0],box.y+pt[1]+pt[2]*4,{steps:6});await page.mouse.up();
        const s1=[await page.locator('#s1a').inputValue(),await page.locator('#s1b').inputValue(),await page.locator('#s1c').inputValue()].join(',');ok(s1!=='1,1,5','sürükleme denklemi değiştirir: '+s1);await has('syCheckN','iki denklem de sağlanıyor');}
      await click('sistemReset');await fits();
      // 05 · İkinci derece
      await click('tab-ikinci');await is('qDisc','36');await is('qRoots',M+'4 ve 2');await is('qMeas',M+'4 ve 2');await has('qMeasN','formülle en büyük fark');await is('qVertex','(h, k) = ('+M+'1, '+M+'9)');await is('qForm','(x + 1)² '+M+' 9');
      eq(await page.locator('#qDer tr').count(),7);await has('qDer','(x + 1)² = 9');
      await click('qP2');await is('qRoots','3 (çift kök)');await is('qMeas','3');await click('qP3');await is('qRoots','reel kök yok');await is('qMeas','kesim yok');await has('qRootsN',M+'1 ± 2·i');
      await click('qP4');await is('qRoots','(3 ± √17)/4');await is('qMeas',M+'0,280776 ve 1,780776');await click('qP5');await is('qRoots',M+'13 ve 3');await has('csqCaption','64');await has('csqCaption','x = kenar '+M+' 5 = 3');
      await set('qa',1);await set('qb',7);await set('qc',-40);await has('csqCaption','alanı 40 + 12,25 = 52,25, kenarı √52,25 = √209/2 ≈ 7,228; x = kenar '+M+' 3,5 ≈ 3,728');await has('qDer','= ±√209/2');
      await set('qc',-60);eq(await page.locator('#qc').inputValue(),'-60');await is('qRoots',M+'12 ve 5');await has('csqCaption','alanı 60 + 12,25 = 72,25, kenarı √72,25 = 8,5; x = kenar '+M+' 3,5 = 5.');
      await set('qa',2);await set('qb',3);await set('qc',-5);await has('csqCaption','0,75² = 0,5625');await set('qa',3);await set('qb',7);await set('qc',-2);await has('csqCaption','(7/6)² = 49/36');await has('csqCaption','= 73/36, kenarı √(73/36) = √73/6 ≈ 1,424; x = kenar '+M+' 7/6 ≈ 0,257');await has('qDer','±√73/6');
      await set('qa',0.5);await set('qb',3);await set('qc',-4);await is('qForm','(1/2)(x + 3)² '+M+' 17/2');await set('qa',1);await set('qb',7);await set('qc',40);await has('qRootsN','± (√111/2)·i');
      await set('qa',0);await has('qStatus','birinci derece');await set('qa',-0.5);await set('qb',0);await set('qc',8);await is('qRoots',M+'4 ve 4');
      await click('ikinciReset');await is('qDisc','36');await fits();
      // 06 · Problem
      await click('tab-problem');await has('wText','3 katının 7 fazlası 25');eq(await page.locator('#wSteps li').count(),0);await click('wNext');await click('wNext');eq(await page.locator('#wTr tr').count(),4);await click('wAll');eq(await page.locator('#wSteps li').count(),8);eq(await page.locator('#wNext').isDisabled(),true);
      await set('wAns','6');await click('wCheck');eq(await page.locator('#wFb').getAttribute('data-st'),'dogru');await set('wAns','5');await click('wCheck');eq(await page.locator('#wFb').getAttribute('data-st'),'yanlis');await set('wAns','?');await click('wCheck');eq(await page.locator('#wFb').getAttribute('data-st'),'gecersiz');
      await set('wSel','yas');eq(await page.locator('#w3F').isVisible(),true);await has('wText','38');await click('wAll');await has('wSteps','t = 7');await set('w1',30);await set('w2',12);await click('wAll');await has('wSteps','negatif');await set('w1',25);await set('w2',14);await click('wAll');await has('wSteps','yaş fark var');
      await set('wSel','kumbara');eq(await page.locator('#w3F').isHidden(),true);eq(await page.locator('#w3').isDisabled(),true);await is('w3L','(kullanılmıyor)');await click('wAll');await has('wSteps','x = 8');await set('wAns','8 tane');await click('wCheck');eq(await page.locator('#wFb').getAttribute('data-st'),'dogru');
      await set('wSel','alan');await click('wAll');await has('wSteps','7 cm');await set('wSel','karisim');await click('wAll');await has('wSteps','v = 15 L');await set('wSel','hareket');await click('wAll');await has('wSteps','t = 3 saat');
      await click('problemReset');await has('wText','Bir sayının 3 katının');await fits();
      await page.locator('#tab-problem').focus();await page.keyboard.press('Home');eq(await page.locator('#tab-ifade').getAttribute('aria-selected'),'true');await page.keyboard.press('End');eq(await page.locator('#tab-problem').getAttribute('aria-selected'),'true');
      // Alıştırma
      await is('pQ','Çöz: 6x '+M+' 2 = 4');eq(await page.locator('#pStep').isDisabled(),true);await set('pAns','1');await click('pCheck');eq(await page.locator('#pFb').getAttribute('data-st'),'dogru');await has('pScore','1 soru doğru, 1 deneme');
      await click('pCheck');await has('pScore','1 soru doğru, 2 deneme');await set('pAns','2');await click('pCheck');eq(await page.locator('#pFb').getAttribute('data-st'),'yanlis');
      await click('pHint');eq(await page.locator('#pHintBox').isVisible(),true);eq(await page.locator('#pStep').isDisabled(),false);const nst=await page.evaluate(()=>AlgebraLab.makeExercise(1,1).steps.length);for(let i=0;i<nst;i++)await click('pStep');eq(await page.locator('#pSteps li').count(),nst);eq(await page.locator('#pStep').isDisabled(),true);
      await click('pNew');await is('pNoOut','2');eq(await page.locator('#pSteps').isHidden(),true);
      for(const L of['1','2','3']){await set('pLevel',L);const nT=await page.locator('#pType option').count();eq(nT,[0,5,7,6][+L]+1);for(let i=1;i<nT;i++){await page.locator('#pType').selectOption({index:i});const ans=await page.evaluate(()=>{const L=+document.getElementById('pLevel').value,n=+document.getElementById('pNo').value,t=document.getElementById('pType').value;return AlgebraLab.makeExercise(L,n,t).answer;});
        await set('pAns',ans);await click('pCheck');ok(['dogru','yaklasik'].includes(await page.locator('#pFb').getAttribute('data-st')),'arayüz notlaması '+ans);}}
      await set('pLevel','3');await page.locator('#pType').selectOption('ikinci');await set('pAns','2 3 4');await click('pCheck');eq(await page.locator('#pFb').getAttribute('data-st'),'gecersiz');
      // Hatalar
      eq(await page.locator('#mistakes .cb-card').count(),7);await has('mk-kare-t','49');await set('mA',1);await set('mB',1);await has('mk-kare-t','(a + b)² = 4');await has('mk-kok-t','≈ 1,414');await set('mA',3);await set('mB',4);await has('mk-kok-t','√25 = 5');
      for(const t of['denklem','esitsizlik','sistem','ikinci','problem','ifade']){await click('tab-'+t);await fits();eq(await page.locator('#panel-'+t).isVisible(),true);
        eq(await page.evaluate(t=>[...document.querySelectorAll('#panel-'+t+' svg.cb-svg')].filter(s=>s.closest('[hidden]')===null).every(s=>s.childElementCount>3&&s.viewBox.baseVal.width>200),t),true,t+' svg boş');}
      assert.deepEqual(errors,[]);checks++;await page.close();}
    console.log(`G cebirin-temelleri: ${checks-before} tarayıcı kontrolü PASS (390 px açık, 1280 px koyu)`);
  }finally{await browser?.close();await new Promise(r=>server.close(r));}
}
