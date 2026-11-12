// Mantık ve argümantasyon: çekirdeğin bağımsız denetimi.
// Başvurular sayfanın yollarını yinelemez: testin kendi rastgele ağaçları ve değerlendiricisi, JS'in mantık işleçleri,
// kaba kuvvet model taraması, rastgele kanıt üretimiyle sağlamlık sınaması, kapalı biçimler ve ikiye bölme.
import fs from 'node:fs';
import vm from 'node:vm';
import assert from 'node:assert/strict';
const SLUG='mantik-ve-argumantasyon';
const html=fs.readFileSync(new URL(`../${SLUG}.html`,import.meta.url),'utf8');
const source=html.split('/* KERNEL-BEGIN */')[1]?.split('/* KERNEL-END */')[0];
assert(source,'Çekirdek sınırları gerekli');
const context={window:{}};vm.createContext(context);vm.runInContext(source,context);
const K=context.window.LogicArg;let checks=0;
const eq=(a,b,m)=>{const x=JSON.stringify(a),y=JSON.stringify(b);assert(x===y,(m?m+': ':'')+x+' ≠ '+y);checks++;},ok=(c,m)=>{assert(c,m);checks++;};
let seed=20261112;const rnd=()=>{seed=(seed*1664525+1013904223)>>>0;return seed/4294967296;},ri=n=>Math.floor(rnd()*n),pick=a=>a[ri(a.length)];
const V=['p','q','r','s'];

/* 1. Ayrıştırıcı: testin kendi ağacı → farklı yazımlarla metin → sayfa ayrıştırır → testin değerlendiricisiyle tablo karşılaştırması */
function rTree(d){if(d<=0||rnd()<.22)return rnd()<.06?{c:ri(2)}:{v:pick(V)};const r=rnd();if(r<.2)return{op:'not',a:rTree(d-1)};return{op:pick(['and','or','imp','iff']),a:rTree(d-1),b:rTree(d-1)};}
const W={not:['¬','~','!','değil ','DEĞİL '],and:['∧','&','ve','VE','·'],or:['∨','|','veya'],imp:['→','->','=>','ise'],iff:['↔','<->','<=>','ancak ve ancak']};
function txt(t){if('c'in t)return pick([t.c?'⊤':'⊥',String(t.c)]);if(t.v)return rnd()<.2?t.v.toUpperCase():t.v;if(t.op==='not')return pick(W.not)+'('+txt(t.a)+')';return '('+txt(t.a)+' '+pick(W[t.op])+' '+txt(t.b)+')';}
const ev=(t,e)=>'c'in t?!!t.c:t.v?e[t.v]:t.op==='not'?!ev(t.a,e):t.op==='and'?ev(t.a,e)&&ev(t.b,e):t.op==='or'?ev(t.a,e)||ev(t.b,e):t.op==='imp'?(!ev(t.a,e)||ev(t.b,e)):ev(t.a,e)===ev(t.b,e);
const envs=Array.from({length:16},(_,m)=>({p:!!(m&8),q:!!(m&4),r:!!(m&2),s:!!(m&1)}));
for(let i=0;i<700;i++){const t=rTree(5),s=txt(t);if(s.length>200){assert.throws(()=>K.parse(s));checks++;continue;}const a=K.parse(s);
  for(const e of envs)eq(K.evalF(a,e),+ev(t,e),s);
  for(const alt of[K.show(a),K.full(a)]){const b=K.parse(alt);ok(K.eqAst(a,b),'yeniden yazım aynı ağacı vermeli: '+alt);}
}
/* öncelik ve birleşme: bağımsız JS ifadeleriyle */
const PJ=[['p ∧ q ∨ r','(p&&q)||r'],['p ∨ q ∧ r','p||(q&&r)'],['p → q → r','!p||(!q||r)'],['p ∧ q → r','!(p&&q)||r'],['p → q ∨ r','!p||(q||r)'],['¬p ∧ q','(!p)&&q'],['p ↔ q → r','p===(!q||r)'],['eğer p ise q ve r','!p||(q&&r)'],['p ise q ise r','!p||(!q||r)'],['değil değil p','p'],['p ancak ve ancak q ↔ r','(p===q)===r']];
for(const[s,js]of PJ){const f=new Function('p','q','r','return !!('+js+')');const a=K.parse(s);for(const e of envs)eq(K.evalF(a,e),+f(e.p,e.q,e.r),s);}
for(const[bad,pos]of[['',0],['p ∧',2],['(p',0],['p)',1],['p # q',2],['pq',0],['x',0],['()',0],['∧ p',0],['p q',2],['p ve',2],['değil',0],['p (q)',2],['p → ¬',4]]){try{K.parse(bad);assert.fail('hata bekleniyordu: '+bad);}catch(e){ok(e.logic===true,bad+' '+e.message);eq(e.pos,pos,bad);ok(e.message.length>10);}}
assert.throws(()=>K.parse('p'.repeat(201)));checks++;
ok(K.eqAst(K.parse('p veya q'),K.parse('p ∨ q')));ok(!K.eqAst(K.parse('p → q'),K.parse('q → p')));

/* 2. Sınıflama, eşdeğerlik, geçerlilik: kaba kuvvet */
const brute=(prem,concl,vars)=>{const n=vars.length,c=[],sup=[];for(let r=0;r<(1<<n);r++){const e={};vars.forEach((v,i)=>e[v]=!((r>>(n-1-i))&1));if(prem.every(p=>ev(p,e))){sup.push(r);if(!ev(concl,e))c.push(r);}}return{c,sup};};
for(let i=0;i<300;i++){const ps=Array.from({length:1+ri(3)},()=>rTree(3)),c=rTree(3);const pa=ps.map(t=>K.parse(txt(t))),ca=K.parse(txt(c));const vars=K.varsOf([...pa,ca]);const v=K.validity(pa,ca),b=brute(ps,c,vars);eq(v.counters,b.c);eq(v.support,b.sup);eq(v.valid,b.c.length===0);}
const T=(ps,c)=>K.validity(ps.map(K.parse),K.parse(c));
for(const[ps,c,valid,ncount,nsup]of[[['p → q','p'],'q',true,0,1],[['p → q','¬q'],'¬p',true,0,1],[['p → q','q'],'p',false,1,2],[['p → q','¬p'],'¬q',false,1,2],[['p → q','q → r'],'p → r',true,0,4],[['p ∨ q','¬p'],'q',true,0,1],[['p ∨ q','p'],'¬q',false,1,2],[['p → r','q → r','p ∨ q'],'r',true,0,3],[['p','¬p'],'q',true,0,0]]){const v=T(ps,c);eq([v.valid,v.counters.length,v.support.length],[valid,ncount,nsup],ps.join(', ')+' ⊢ '+c);}
eq(T(['p → q','q'],'p').counters,[2]);/* p = Y, q = D: üçüncü satır */
for(const[f,kind,tr]of[['p ∨ ¬p','totoloji',2],['p ∧ ¬p','çelişki',0],['p → q','olumsal',3],['((p → q) → p) → p','totoloji',4],['(p ∧ q) → r','olumsal',7],['p ↔ p','totoloji',2],['⊥','çelişki',0],['⊤','totoloji',1]]){const c=K.classify(K.parse(f));eq([c.kind,c.trueRows],[kind,tr],f);}
for(const[a,b,same,ab,ba]of[['¬(p ∧ q)','¬p ∨ ¬q',true,true,true],['p → q','¬p ∨ q',true,true,true],['p → q','¬q → ¬p',true,true,true],['p → q','q → p',false,false,false],['p ∧ (q ∨ r)','(p ∧ q) ∨ (p ∧ r)',true,true,true],['(p ∧ q) → r','p → (q → r)',true,true,true],['p ∧ q','p ∨ q',false,true,false]]){const c=K.compare(K.parse(a),K.parse(b));eq([c.equal,c.aEntailsB,c.bEntailsA],[same,ab,ba],a+' / '+b);}
eq(K.compare(K.parse('p → q'),K.parse('q → p')).diff,[1,2]);
eq(K.subformulas(K.parse('¬(p ∧ q) ∨ (p ∧ q)')).map(x=>K.show(x)),['p ∧ q','¬(p ∧ q)','¬(p ∧ q) ∨ p ∧ q']);

/* 3. Doğal çıkarım: hazır çözümler, el yapımı hatalar ve rastgele kanıtlarla sağlamlık */
const L=a=>a.map(([f,rule,refs,depth])=>({f,rule,refs,depth}));
for(const[k,T0]of Object.entries(K.TASKS)){const r=K.checkProof(K.parseTask(T0.task),L(T0.sol));eq(r.complete,k!=='bad',k);
  const t=K.parseTask(T0.task);
  const v=K.validity(t.premises,t.goal);eq(v.valid,k!=='bad',k+' geçerlilik');}
{const r=K.checkProof(K.parseTask('p → q, q ⊢ p'),L(K.TASKS.bad.sol));eq(r.errors,1);ok(/sonucudur/.test(r.lines[2].msg));}
const mt=K.parseTask('p → q, ¬q ⊢ ¬p'),base=[['p → q','oncul','',0],['¬q','oncul','',0]];
const bad=(lines,k,re,task=mt)=>{const r=K.checkProof(task,L(lines)),x=r.lines[k-1];ok(!x.ok,'hata bekleniyordu: satır '+k+' '+JSON.stringify(lines[k-1]));ok(re.test(x.msg),x.msg+' ~ '+re);ok(!r.complete);};
bad([...base,['p','varsayim','',1],['q','impE','1, 3',1],['⊥','notE','4, 2',1],['¬p','notI','3–5',0],['q','tekrar','4',0]],7,/kapanmış/);
bad([...base,['p','varsayim','',1],['q','impE','1, 3',1],['¬p','notI','3–4',0]],5,/⊥/);
bad([...base,['p','varsayim','',1],['q','impE','1, 3',1],['⊥','notE','4, 2',1],['¬q','notI','3–5',0]],6,/yalnız ¬p/);
bad([...base,['r','oncul','',0]],3,/öncüllerinden biri değil/);
bad([...base,['p','varsayim','',1],['q','impE','1',1]],4,/2 dayanak/);
bad([...base,['p','varsayim','',1],['q','impE','1, 3',3]],4,/girinti|Varsayım/);
bad([...base,['p','varsayim','',1],['q','impE','1, 3',1],['⊥','notE','4, 2',1],['¬p','notI','3–4',0]],6,/bitmiyor/);
bad([...base,['q ∧ p','andE','1',0]],3,/“ve”/);
bad([...base,['q','varsayim','',1],['p ∨ q','orI','5',1]],4,/önce gelmeli/);
bad([...base,['p','varsayim','',2]],3,/bir düzey içinde/);
bad([...base,['p','tekrar','1–2',0]],3,/tek bir satır/);
bad([...base,['p','varsayim','',1],['⊥','notE','3, 1',1]],4,/değili/);
bad([...base,['p → q','impI','1–2',0]],3,/varsayım değil/);
bad([['p ∨ q','oncul','',0],['¬p','oncul','',0],['p','varsayim','',1],['⊥','notE','3, 2',1],['q','botE','4',1],['p','varsayim','',1],['q','tekrar','5',1],['q','orE','1, 3–5, 6–7',0]],7,/kapanmış/,K.parseTask('p ∨ q, ¬p ⊢ q'));
bad([['p ∨ q','oncul','',0],['¬p','oncul','',0],['p','varsayim','',1],['⊥','notE','3, 2',1],['q','botE','4',1],['p','varsayim','',1],['p','tekrar','6',1],['q','orE','1, 3–5, 6–7',0]],8,/varsayımlarıyla|bitmeli/,K.parseTask('p ∨ q, ¬p ⊢ q'));
bad([...base,['x','tekrar','1',0]],3,/okunamadı/);
bad([...base,['p','varsayim','',1],['q','impE','1, 3',1],['p → q','impI','3 - 4 - 5',0]],5,/okunamadı/);
/* dayanak yazımları */
eq(K.parseRefs('1, 3–5').map(r=>[r.a,r.b]),[[1,1],[3,5]]);eq(K.parseRefs('6 - 7').map(r=>[r.a,r.b]),[[6,7]]);eq(K.parseRefs('2 4').map(r=>r.a),[2,4]);eq(K.parseRefs(''),[]);
assert.throws(()=>K.parseTask('p, q'));assert.throws(()=>K.parseTask('p ⊢ q ⊢ r'));checks+=2;eq(K.parseTask('⊢ p ∨ ¬p').premises.length,0);
/* boş öncüllü kanıt: ⊢ p → p */
eq(K.checkProof(K.parseTask('⊢ p → p'),L([['p','varsayim','',1],['p → p','impI','1',0]])).complete,true);
/* rastgele kanıtlar: denetçinin kabul ettiği her satır, öncüllerle açık varsayımlardan anlamca çıkmalı (sağlamlık) */
let accepted=0;
for(let trial=0;trial<260;trial++){
  const prem=Array.from({length:1+ri(3)},()=>rTree(2)).map(t=>K.show(K.parse(txt(t))));const task=K.parseTask(prem.join(', ')+' ⊢ p');
  const lines=prem.map(f=>({f,rule:'oncul',refs:'',depth:0}));let depth=0;
  for(let step=0;step<30;step++){
    const n=lines.length,res=K.checkProof(task,lines),asts=res.lines.map(x=>x.ast);const rl=()=>1+ri(n),f=i=>asts[i-1],S=x=>K.show(x);
    const atom=()=>({t:'var',n:pick(['p','q','r'])});let cand=null;const r=rnd();
    const subs=[];res.lines.forEach((x,i)=>{if(lines[i].rule==='varsayim'){let j=i;while(j+1<n&&res.lines[j+1].path.includes(x.k))j++;const last=[...Array(j-i+1).keys()].map(o=>i+o).filter(o=>res.lines[o].path.length===x.path.length).pop();subs.push([x.k,last+1]);}});
    try{
      if(r<.12&&depth<3){cand={f:pick([...asts.filter(Boolean).map(S),S(atom()),'¬'+S(atom())]),rule:'varsayim',refs:'',depth:depth+1};}
      else if(r<.17&&depth>0){depth--;continue;}
      else{const rule=pick(['tekrar','andI','andE','orI','impE','notE','botE','dne','impI','notI','orE','iffI','iffE']);let a=rl(),b=rl(),F,refs=a+', '+b;const sb=subs.length?pick(subs):[1,1],sb2=subs.length?pick(subs):[1,1],sr=sb[0]+'–'+sb[1];const fa=f(a),fb=f(b);if(!fa||!fb)continue;
        switch(rule){case'tekrar':F=fa;refs=String(a);break;case'andI':F={t:'and',a:fa,b:fb};break;case'andE':if(fa.t!=='and')continue;F=rnd()<.5?fa.a:fa.b;refs=String(a);break;case'orI':F=rnd()<.5?{t:'or',a:fa,b:atom()}:{t:'or',a:atom(),b:fa};refs=String(a);break;
          case'impE':if(fa.t!=='imp')continue;F=fa.b;break;case'notE':F={t:'const',v:0};break;case'botE':F=atom();refs=String(a);break;case'dne':if(fa.t!=='not'||fa.a.t!=='not')continue;F=fa.a.a;refs=String(a);break;
          case'impI':F={t:'imp',a:f(sb[0])||atom(),b:f(sb[1])||atom()};refs=sr;break;case'notI':F={t:'not',a:f(sb[0])||atom()};refs=sr;break;
          case'orE':F=f(sb[1])||atom();refs=a+', '+sr+', '+sb2[0]+'–'+sb2[1];break;case'iffI':if(fa.t!=='imp')continue;F={t:'iff',a:fa.a,b:fa.b};break;case'iffE':if(fa.t!=='iff')continue;F=rnd()<.5?fa.a:fa.b;break;}
        let d=depth;if(['impI','notI','orE'].includes(rule)&&depth>0&&rnd()<.8)d=depth-1;cand={f:S(F),rule,refs,depth:d};}
    }catch(e){if(e.logic)continue;throw e;}
    if(!cand)continue;lines.push(cand);const r2=K.checkProof(task,lines);
    if(r2.lines[lines.length-1].ok&&r2.errors===0){depth=cand.depth;accepted++;}else lines.pop();
  }
  /* sağlamlık: her satır, öncüller + o satırda açık olan varsayımlardan çıkar */
  const res=K.checkProof(task,lines);eq(res.errors,0);
  res.lines.forEach(x=>{const hyps=x.path.map(k=>res.lines[k-1].ast),v=K.validity([...task.premises,...hyps],x.ast);
    /* bağımsız tablo: testin değerlendiricisiyle */
    const toT=a=>a.t==='var'?{v:a.n}:a.t==='const'?{c:a.v}:a.t==='not'?{op:'not',a:toT(a.a)}:{op:a.t,a:toT(a.a),b:toT(a.b)};
    const b=brute([...task.premises,...hyps].map(toT),toT(x.ast),v.vars);eq(b.c.length,0,'sağlamlık: '+lines.map(l=>l.f+' '+l.rule+' '+l.refs+' @'+l.depth).join(' | ')+' → satır '+x.k);});
}
ok(accepted>800,'rastgele kanıtlarda yeterince kabul edilen satır olmalı: '+accepted);

/* 4. Niceleyiciler: açık döngülerle */
const R=(m,x,y)=>(m>>(x*3+y))&1,I=[0,1,2];
const ref=[[m=>I.every(x=>I.some(y=>R(m,x,y))),m=>I.some(y=>I.every(x=>R(m,x,y)))],[m=>I.every(y=>I.some(x=>R(m,x,y))),m=>I.some(x=>I.every(y=>R(m,x,y)))],[m=>!I.every(x=>I.every(y=>R(m,x,y))),m=>I.every(x=>!I.every(y=>R(m,x,y))),m=>I.every(x=>I.every(y=>!R(m,x,y)))]];
K.SENTENCES.forEach((S,s)=>S.readings.forEach((rd,j)=>{for(let m=0;m<512;m++)eq(K.qEval(rd.ast,m),+ref[s][j](m),s+'/'+j+'/'+m);}));
let c174=0;for(let m=0;m<512;m++)if(ref[0][0](m)&&!ref[0][1](m))c174++;eq(c174,174);
eq(K.qCount(K.SENTENCES[0].readings[0].ast,K.SENTENCES[0].readings[1].ast),174);eq(K.qCount(K.SENTENCES[0].readings[1].ast,K.SENTENCES[0].readings[0].ast),0);
eq(343-169,174);/* 7³ satırı dolu dünya − bir sütunu dolu dünya (içerme-dışlama: 3·64 − 3·8 + 1) */
{const r=K.SENTENCES[2].readings;let a=0,b=0,c=0,d=0;for(let m=0;m<512;m++){const v=r.map((_,j)=>ref[2][j](m));if(v[0]&&!v[1])a++;if(v[1]&&!v[0])b++;if(v[2]&&!v[1])c++;if(v[1]&&!v[2])d++;}eq([K.qCount(r[0].ast,r[1].ast),K.qCount(r[1].ast,r[0].ast),K.qCount(r[2].ast,r[1].ast),K.qCount(r[1].ast,r[2].ast)],[a,b,c,d]);eq([a,b,c],[511-343,0,0]);eq(d,342);}
eq(K.qEval(K.SENTENCES[0].readings[0].ast,0b100010001),1);eq(K.qEval(K.SENTENCES[0].readings[1].ast,0b100010001),0);

/* 5. Yalancı ve benzerleri: değerlendirmeyi açıkça yaz */
const says={liar:v=>[!v[0]],truth:v=>[v[0]],cycle:v=>[v[1],!v[0]],pair:v=>[!v[1],!v[0]]};
for(const[sys,fn]of Object.entries(says)){const n=K.LIARS[sys].names.length,fps=[];for(let m=0;m<(1<<n);m++){const v=Array.from({length:n},(_,i)=>!!((m>>i)&1));if(fn(v).every((x,i)=>x===v[i]))fps.push(v.map(Number).join(''));}
  eq(K.fixedPoints(sys).map(v=>v.join('')).sort(),fps.sort(),sys);
  for(let m=0;m<(1<<n);m++){const init=Array.from({length:n},(_,i)=>(m>>i)&1);let v=init.map(Boolean);const seq=K.revise(sys,init,10);for(let s=1;s<=10;s++){v=fn(v);eq(seq[s],v.map(Number));}}}
eq(K.fixedPoints('liar').length,0);eq(K.fixedPoints('truth').length,2);eq(K.fixedPoints('cycle').length,0);eq(K.fixedPoints('pair').length,2);
eq(K.period('liar',[1]),{pre:0,len:2});eq(K.period('cycle',[1,1]),{pre:0,len:4});eq(K.period('pair',[1,1]),{pre:0,len:2});eq(K.period('pair',[1,0]),{pre:0,len:1});

/* 6. Yığın: kayıpların toplamı teleskopiktir; en büyük adım türevin tepesindedir (n0/√3) */
{const c=K.soritesChain(1000000),d=n=>n*n/(n*n+1e6);ok(Math.abs(c.loss-(d(1e6)-d(1)))<1e-9);ok([577,578].includes(c.minAt),'tepe '+c.minAt);
 const peak=1e3/Math.sqrt(3),slope=2*peak*1e6/(peak*peak+1e6)**2;ok(Math.abs((1-c.minC)-slope)<2e-6,'eğim '+(1-c.minC)+' / '+slope);ok(c.minC>0.999&&c.minC<0.9994);ok(c.bound<1e-5);
 const v=K.soritesViews(1000);eq([v.super,v.borderline],[null,true]);eq(K.soritesViews(99).super,0);eq(K.soritesViews(10000).super,1);ok(Math.abs(K.soritesViews(1000).degree-.5)<1e-12);}

/* 7. Akhilleus: ikiye bölmeyle buluşma anı, aşama sayısı için logaritma */
for(const[vA,vT,d]of[[10,1,90],[1,.1,.9],[12,11.5,200],[5,0,10],[8,4,1]]){const a=K.achilles(vA,vT,d,40);let lo=0,hi=1e6;for(let i=0;i<200;i++){const m=(lo+hi)/2;if(vA*m<d+vT*m)lo=m;else hi=m;}
  ok(Math.abs(a.T-lo)<1e-9*Math.max(1,lo),vA+' '+vT+' '+d);ok(Math.abs(a.D-vA*lo)<1e-8*Math.max(1,a.D));const last=a.stages[39];ok(Math.abs(last.cum+last.gap/(1-a.r)*(1)-a.D)<1e-8*a.D||vT===0);
  if(vT>0){const want=Math.ceil(Math.log(0.001/d)/Math.log(vT/vA)-1e-12);const n=K.stagesTo(vA,vT,d,0.001);ok(n===want||n===want+1&&Math.abs(d*Math.pow(vT/vA,want)-0.001)<1e-12,`aşama ${n} / ${want}`);}}
eq(K.achilles(10,1,90,2).stages.map(s=>[s.run,s.cum,s.t]),[[90,90,9],[9,99,9.9]]);eq(K.stagesTo(10,1,90,0.001),5);eq(K.achilles(5,5,10,3).finite,false);eq(K.stagesTo(5,6,10,0.001),Infinity);
ok(Object.isFrozen(K));
console.log(`G mantık ve argümantasyon: ${checks.toLocaleString('tr-TR')} bağımsız ayrıştırma, geçerlilik, kanıt, niceleyici ve paradoks kontrolü PASS (rastgele kanıtlarda ${accepted} kabul edilen satır)`);

if(process.argv.includes('--browser')){
  const {chromium}=await import('playwright');const {createServer}=await import('node:http');const {join,extname}=await import('node:path');const {fileURLToPath}=await import('node:url');const root=fileURLToPath(new URL('../',import.meta.url));
  const server=createServer((req,res)=>{const file=join(root,decodeURIComponent(new URL(req.url,'http://localhost').pathname));if(!fs.existsSync(file)||fs.statSync(file).isDirectory()){res.writeHead(404).end();return;}res.setHeader('Content-Type',({'.html':'text/html; charset=utf-8','.js':'text/javascript; charset=utf-8','.css':'text/css; charset=utf-8'})[extname(file)]||'application/octet-stream');res.end(fs.readFileSync(file));});await new Promise(r=>server.listen(0,'127.0.0.1',r));let browser;
  try{browser=await chromium.launch();const before=checks;
  for(const[width,theme]of[[390,'light'],[1280,'dark']]){
    const page=await browser.newPage({viewport:{width,height:900},deviceScaleFactor:width===390?2:1,hasTouch:width===390});await page.addInitScript(t=>{localStorage.setItem('acelya-theme',t);localStorage.setItem('acelya-sound-muted','1');},theme);page.setDefaultTimeout(8000);
    const errors=[];page.on('pageerror',e=>errors.push(e.message));page.on('console',m=>{if(m.type()==='error')errors.push(m.text());});page.on('response',r=>{if(r.status()>=400)errors.push(r.status()+' '+r.url());});
    await page.goto(`http://127.0.0.1:${server.address().port}/${SLUG}.html`);
    const click=id=>page.locator('#'+id).click(),read=id=>page.locator('#'+id).textContent(),has=async(id,text)=>{const t=await read(id);assert(t.includes(text),`${id}: “${t}” içinde “${text}” yok (${width})`);checks++;},
      fill=id=>v=>page.locator('#'+id).fill(v),range=(id,v)=>page.locator('#'+id).evaluate((e,v)=>{e.value=v;e.dispatchEvent(new Event('input',{bubbles:true}));},v),sel=(id,v)=>page.locator('#'+id).selectOption(v),
      noflow=async tag=>{eq(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),true,'yatay taşma: '+tag+' '+width);};
    eq(await page.evaluate(()=>document.title.length<=80),true);
    /* 1. sekme */
    await has('tVars','2 / 4');await has('tKind1','Olumsal · 3 / 4');await has('tCmp','4 / 4 · eşdeğer');await has('tStatus','Eşdeğer: iki formül 4 satırın hepsinde');eq(await page.locator('#tRows tr').count(),4);
    await click('tbConv');await has('tCmp','2 / 4 · eşdeğer değil');await has('tStatus','İlk ayrılan satır 2 (p = D, q = Y): F₁ Y, F₂ D');eq(await page.locator('#tRows tr.is-bad').count(),2);
    await click('tbPeirce');await has('tKind1','Totoloji · 4 / 4');await has('tCmp','Formül 2 yok');await has('tStatus','Totoloji');
    await click('tbLem');await has('tKind2','Çelişki · 0 / 2');await has('tCmp','0 / 2');
    await click('tbDist');await has('tVars','3 / 8');await has('tCmp','8 / 8');await click('tbExport');await has('tCmp','8 / 8');
    await fill('tF1')('p ∧ q');await fill('tF2')('p ∨ q');await has('tStatus','F₁, F₂\'yi gerektirir');
    await fill('tF1')('p ∧');await has('tErr1','sağında bir terim eksik');await has('tVars','—');await fill('tF1')('pq');await has('tErr1','bağlaç koy');
    await fill('tF1')('eğer p ve q ise r');await fill('tF2')('');await has('tParsed','((p ∧ q) → r)');await has('tKind1','7 / 8');eq(await page.locator('#tErr1').isHidden(),true);
    await fill('tF1')('p ∨ q ∨ r ∨ s ∨ t ∨ u');await has('tVars','6 / 64');eq(await page.locator('#tRows tr').count(),64);
    await fill('tF1')('');await page.locator('#tF1').focus();for(const s of['¬','('])await page.locator(`#panel-tablo [data-sym="${s}"]`).click();await page.locator('#tF1').press('End');await page.keyboard.type('p');await page.locator(`#panel-tablo [data-sym="∧"]`).click();await page.keyboard.type('q');await page.locator(`#panel-tablo [data-sym=")"]`).click();
    eq(await page.locator('#tF1').inputValue(),'¬(p ∧ q)');await page.locator('#tSub').setChecked(false);eq(await page.locator('#tHead th').count(),3);
    await click('tabloReset');await has('tCmp','4 / 4');eq(await page.locator('#tSub').isChecked(),true);await noflow('tablo');
    /* 2. sekme */
    await click('tab-gecerlilik');await has('gVerdict','Geçersiz');await has('gCounter','1 satır · ilk: 3');await has('gStatus','3. satır bir karşı model (p = Y, q = D)');eq(await page.locator('#gRows tr.is-bad').count(),1);eq(await page.locator('#gRows tr.is-good').count(),1);
    for(const[k,verd,sup]of[['mp','Geçerli','1 / 4'],['mt','Geçerli','1 / 4'],['da','Geçersiz','2 / 4'],['hs','Geçerli','4 / 8'],['ds','Geçerli','1 / 4'],['ad','Geçersiz','2 / 4'],['cd','Geçerli','3 / 8'],['ex','Geçerli','0 / 4']]){await sel('gPreset',k);await has('gVerdict',verd);await has('gSupport',sup);}
    await has('gStatus','boş yere');await has('gExample','Ay peynirden');
    await fill('gC')('q ∧ ¬q');await has('gExample','Kendi biçimin');eq(await page.locator('#gPreset').inputValue(),'custom');
    await fill('gC')('');await page.locator('[data-default="gC"] [data-sym="¬"]').click();await page.keyboard.type('q');eq(await page.locator('#gC').inputValue(),'¬q');
    await fill('gP1')('p →');await has('gErr','Öncül 1');await has('gVerdict','—');await sel('gPreset','mp');eq(await page.locator('#gErr').isHidden(),true);
    /* niceleyiciler */
    await has('qR0','Doğru');await has('qR1','Yanlış');await has('qStatus','ayrılıyor');await has('qEntail','174 dünya');await has('qEntail',' 0 dünya');
    await click('qCol');await has('qR1','Doğru');await has('qStatus','bütün okunuşlar doğru');await click('qc12');await has('qR0','Doğru');await click('qc00');await has('qR0','Yanlış');eq(await page.locator('#qc00').getAttribute('aria-pressed'),'false');
    await sel('qSentence','2');await click('qNone');eq(await page.locator('#qReadings > div').count(),3);for(const i of[0,1,2])await has('qR'+i,'Doğru');await click('qAll');for(const i of[0,1,2])await has('qR'+i,'Yanlış');await has('qEntail','342');
    await click('qDiag');await has('qR0','Doğru');await has('qR1','Doğru');await has('qR2','Yanlış');
    await sel('qSentence','1');await click('qDiag');await has('qR0','Doğru');await has('qR1','Yanlış');
    await click('gecerlilikReset');await has('gVerdict','Geçersiz');eq(await page.locator('#qSentence').inputValue(),'0');await noflow('gecerlilik');
    /* 3. sekme */
    await click('tab-kanit');await has('kStatus','Kanıt tamam: hedef ¬p, 6. satırda');await has('kLines','6 / 0');await has('kSem','geçerli');eq(await page.locator('#kL6.is-goal').count(),1);eq(await page.locator('#kL3 .ma-bar').count(),1);
    await click('kStart');await has('kLines','2 / 0');await has('kStatus','henüz');
    const add=async(f,rule,refs)=>{await fill('kFormula')(f);await sel('kRule',rule);await fill('kRefs')(refs);await click('kAdd');};
    await add('p','varsayim','');await has('kDepth','1 açık');await add('q','impE','1, 3');await add('⊥','notE','2, 4');await add('¬p','notI','3–5');await has('kDepth','yok');await has('kStatus','Kanıt tamam');
    await add('q','tekrar','4');await has('kStatus','İlk hata 7. satırda');await has('kL7','kapanmış');await click('kUndo');await has('kStatus','Kanıt tamam');
    for(const k of['hs','ds','dm','contra','comm','iff','dne']){await sel('kTask',k);await click('kSolve');await has('kStatus','Kanıt tamam');}
    await sel('kTask','bad');await has('kSem','geçersiz · karşı model satır 3');await has('kStatus','hiçbir doğru kanıt');await click('kSolve');await has('kL3','sonucudur');await has('kStatus','1 satır hatalı');
    /* ∨E: kapatma düğmesiyle iki alt kanıt */
    await sel('kTask','ds');await add('p','varsayim','');await add('⊥','notE','3, 2');await add('q','botE','4');await click('kClose');await has('kDepth','yok');await add('q','varsayim','');await add('q','tekrar','6');await add('q','orE','1, 3–5, 6–7');await has('kStatus','Kanıt tamam: hedef q, 8. satırda');
    await fill('kCustom')('p ∧ q, r ⊢ q ∧ r');await click('kCustomStart');await has('kGoal','p ∧ q, r ⊢ q ∧ r');await has('kLines','2 / 0');await add('q','andE','1');await add('q ∧ r','andI','3, 2');await has('kStatus','Kanıt tamam');
    await click('kSolve');await has('kTaskErr','hazır çözüm yok');await fill('kCustom')('p, q');await click('kCustomStart');await has('kTaskErr','⊢');
    await fill('kFormula')('');await click('kAdd');await has('kTaskErr','formülünü yaz');
    await fill('kFormula')('');await page.locator('#kFormula').focus();await page.locator('[data-default="kFormula"] [data-sym="¬"]').click();await page.keyboard.type('p');eq(await page.locator('#kFormula').inputValue(),'¬p');
    await fill('kCustom')('p');await page.locator('#kCustom').focus();await page.locator('#kCustom').press('End');await page.locator('[data-default="kFormula"] [data-sym="⊢"]').click();await page.keyboard.type('p ∨ q');await click('kCustomStart');await has('kGoal','p ⊢ p ∨ q');
    await click('kanitReset');await has('kLines','6 / 0');eq(await page.locator('#kTaskErr').isHidden(),true);await noflow('kanit');
    /* 4. sekme */
    await click('tab-safsata');await has('sScore','0 / 0');await has('sShown','13 / 13');
    const names=await page.evaluate(()=>[...document.querySelectorAll('.ma-fal')].map(c=>[...c.querySelectorAll('button')].map(b=>b.textContent)));eq(names.length,13);
    await click('sOpt0-0');await has('sFb0','Doğru teşhis');await has('sFb0','Ne zaman safsata sayılmaz?');await has('sScore','1 / 1');eq(await page.locator('#sOpt0-0').getAttribute('data-res'),'ok');
    await click('sOpt1-0');await has('sFb1','Burada daha uygun ad: Sen de (tu quoque)');await has('sScore','1 / 2');eq(await page.locator('#sOpt1-1').getAttribute('data-res'),'ok');eq(await page.locator('#sOpt1-0').getAttribute('data-res'),'no');
    await sel('sFilter','bicim');await has('sShown','1 / 13');await click('sOpt12-0');await has('sFb12','Biçimsel hata');await sel('sFilter','varsayim');await has('sShown','5 / 13');await sel('sFilter','dil');await has('sShown','1 / 13');await sel('sFilter','ilgi');await has('sShown','6 / 13');
    await click('safsataReset');await has('sScore','0 / 0');await has('sShown','13 / 13');eq(await page.locator('#sFb0').isHidden(),true);await noflow('safsata');
    /* 5. sekme */
    await click('tab-paradoks');await has('lFixed','yok');await has('lCycle','2 adımda');eq(await page.locator('#lSeq span').count(),9);await has('lSeq','8: LD');
    await sel('lSys','truth');await has('lFixed','D = D ya da D = Y');await has('lCycle','sabit');await sel('lSys','cycle');await has('lFixed','yok');await has('lCycle','4 adımda');await sel('lSys','pair');await has('lFixed','A = D, B = Y ya da A = Y, B = D');await sel('lInit','10');await has('lCycle','sabit');await range('lSteps',12);await has('lStepsOut','12 adım');eq(await page.locator('#lSeq span').count(),13);
    await click('lReset');await has('lFixed','yok');
    await has('sorN','1000 tane');await has('sorV2','0,500');await has('sorV1','ne süper doğru');await has('sorChain','578 tanede');await has('sorChain','0,99935');
    await range('sorExp',6);await has('sorN','1 000 000 tane');await has('sorV1','süper doğru');await has('sorV0','Yığındır');await range('sorExp',1);await has('sorV1','süper yanlış');await range('sorExp',0);await has('sorN','1 tane');await click('sorReset');await has('sorN','1000 tane');
    await has('acRatio','0,100');await has('acTotal','100,00 m · 10,00 s');await has('acTime','10,00 s · 100,00 m');await has('acStages','5');eq(await page.locator('#acRows tr').count(),10);await has('acRows','99,900 m');
    const ink=await page.evaluate(()=>{const c=document.getElementById('acCanvas'),d=c.getContext('2d').getImageData(0,0,c.width,c.height).data;let n=0;for(let i=3;i<d.length;i+=4)if(d[i])n++;return n;});ok(ink>500,'Akhilleus tuvali boş');
    await range('acVT',10);await has('acTotal','∞');await has('acStatus','Hızlar eşit');await range('acVT',12);await has('acStatus','Kaplumbağa daha hızlı');await range('acVT',0);await has('acStages','1 (kaplumbağa duruyor)');await has('acTotal','90,00 m');
    await range('acVA',1);await range('acVT',0.5);await range('acD',200);await has('acTotal','400,00 m');await has('acStages','18');await click('acReset');await has('acTotal','100,00 m');
    await has('cuSteps','Ay peynirden yapılmıştır');await fill('cuQ')('<b>2 + 2 = 5</b>');await has('cuSteps','“<b>2 + 2 = 5</b>”');eq(await page.locator('#cuSteps b').count(),0);eq(await page.locator('#cuSteps li').count(),7);
    await click('paradoksReset');await has('cuSteps','Ay peynirden');await noflow('paradoks');
    /* sekme klavyesi, R tuşu, etiketler */
    await page.locator('#tab-paradoks').focus();await page.keyboard.press('Home');eq(await page.locator('#tab-tablo').getAttribute('aria-selected'),'true');await page.keyboard.press('ArrowLeft');eq(await page.locator('#tab-paradoks').getAttribute('aria-selected'),'true');await page.keyboard.press('ArrowRight');eq(await page.locator('#tab-tablo').getAttribute('aria-selected'),'true');await page.keyboard.press('End');eq(await page.locator('#tab-paradoks').getAttribute('aria-selected'),'true');
    await click('tab-tablo');await click('tbConv');await page.locator('h1').click();await page.keyboard.press('r');await has('tCmp','4 / 4');
    eq(await page.evaluate(()=>[...document.querySelectorAll('main input,main select')].filter(e=>!(e.labels&&e.labels.length)&&!e.getAttribute('aria-label')).map(e=>e.id)),[]);
    eq(await page.evaluate(()=>[...document.querySelectorAll('main canvas')].filter(c=>c.getAttribute('role')!=='img').length),0);
    eq(await page.evaluate(()=>Object.isFrozen(LogicArg)&&!Object.getOwnPropertyDescriptor(window,'LogicArg').writable),true);
    eq(await page.evaluate(()=>/[̀-ͯ⃗]/.test(document.body.textContent.normalize('NFC').replace(/[çğıöşüÇĞİÖŞÜ]/g,''))),false);
    eq(await page.evaluate(()=>/\d\.\d/.test([...document.querySelectorAll('.ma-stat strong,.ma-status,output,#acRows,#sorViews')].map(e=>e.textContent).join(' '))),false,'ondalık nokta');
    /* Keşif Defteri yüklenmiş ve görünür olmalı */
    await page.locator('.digest').first().waitFor({state:'attached',timeout:8000});await page.locator('.digest').first().scrollIntoViewIfNeeded();
    eq(await page.locator('.digest').first().isVisible(),true,'defter görünür');ok((await page.locator('.digest').first().textContent()).includes('Khrysippos'),'defter içeriği');
    /* doğrulayıcı düzeltmeleri: Curry'de doğruluk şeması, safsatada "hafif"in iki anlamı */
    await click('tab-paradoks');await has('cuIntro','doğruluk şeması');await click('tab-safsata');eq((await page.locator('#sCard11 blockquote').textContent()).includes('ağırlığını'),true);
    assert.deepEqual(errors,[]);checks++;await page.close();
  }
  console.log(`G mantık ve argümantasyon: ${checks-before} tarayıcı kontrolü (390 açık / 1280 koyu; beş sekme, hazırlar, sınırlar, klavye) PASS`);
  }finally{await browser?.close();await new Promise(r=>server.close(r));}
}
