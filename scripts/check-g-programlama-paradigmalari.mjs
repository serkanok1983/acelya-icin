// Programlama Paradigmaları laboratuvarı: kalıcı denetim.
// Çekirdek (KERNEL-BEGIN/END) sayfadan yüklenir; başvurular sayfanın formüllerini YENİDEN KULLANMAZ:
//  - elle sayaç konmuş düz JS döngüleri ve yerleşik filter/map/reduce,
//  - kaba kuvvetle ilk indeks araması,
//  - yerel JS özyinelemesiyle çağrı/derinlik sayımı ve kapalı biçimler (2·F(n+1) − 1, 2n − 1, n + 1),
//  - bu dosyada bağımsız yazılmış ikinci bir ayrıştırıcı + birleştirici + çözümleyici,
//  - aile ilişkilerinin kaba kuvvetle (döngü, geçişli kapanış) sayımı.
// Kullanım: node scripts/check-g-programlama-paradigmalari.mjs [--browser]
import fs from 'node:fs';
import vm from 'node:vm';
import assert from 'node:assert/strict';
const SLUG='programlama-paradigmalari';
const html=fs.readFileSync(new URL(`../${SLUG}.html`,import.meta.url),'utf8');
const source=html.split('/* KERNEL-BEGIN */')[1]?.split('/* KERNEL-END */')[0];
assert(source,'KERNEL sınırları gerekli');
const context={window:{}};vm.createContext(context);vm.runInContext(source,context);
const K=context.window.ParadigmLab;let checks=0;
const eq=(a,b,msg)=>{assert.deepEqual(JSON.parse(JSON.stringify(a)),JSON.parse(JSON.stringify(b)),msg);checks++;};
const ok=(v,msg)=>{assert(v,msg);checks++;};
let seed=20261111;const rnd=()=>(seed=(seed*1664525+1013904223)>>>0)/2**32,ri=(a,b)=>a+Math.floor(rnd()*(b-a+1));

// ---------- 1. buyurgan / fonksiyonel ----------
const refImp={
  kareler(L){let a=0,t=0,toplam=0;a++;let i=0;a++;for(;;){t++;if(!(i<L.length))break;const x=L[i];a++;t++;if(x%2===0){toplam+=x*x;a++;}i++;a++;}return{result:toplam,a,t};},
  enb(L){let a=0,t=0,m=L[0];a++;let i=1;a++;for(;;){t++;if(!(i<L.length))break;t++;if(L[i]>m){m=L[i];a++;}i++;a++;}return{result:m,a,t};},
  ters(L){const l=L.slice();let a=0,t=0,i=0,j=l.length-1;a+=2;for(;;){t++;if(!(i<j))break;const g=l[i];l[i]=l[j];l[j]=g;i++;j--;a+=5;}return{result:l,a,t};},
  ortalama(L){let a=0,t=0,s=0;const o=[];let i=0;a+=3;for(;;){t++;if(!(i<L.length))break;s+=L[i];o[i]=s/(i+1);i++;a+=3;}return{result:o,a,t};}
};
const refFn={
  kareler(L){let c=0;const r=L.filter(x=>(c++,x%2===0)).map(x=>(c++,x*x)).reduce((s,x)=>(c++,s+x),0);return{result:r,apps:c+3};},
  enb(L){let c=0;const r=L.slice(1).reduce((m,x)=>(c++,x>m?x:m),L[0]);return{result:r,apps:c+2};},
  ters(L){let c=0;const r=L.reduce((acc,x)=>(c++,[x,...acc]),[]);return{result:r,apps:c+1};},
  ortalama(L){let c=0,s=0;const sums=L.map(x=>(c++,s+=x));const r=sums.map((v,i)=>(c++,v/(i+1)));return{result:r,apps:c+3};}
};
const lists=[[3,8,5,2,7,4],[1],[2],[-4],[0,0,0],[1,2,3,4,5,6,7,8],[7,1,9,3,5,11],[2,6,4,10,8,12],[12,11,10,9,8,7,6,5,4,3,2,1],[-3,-2,-1,0,1,2,3],[999,-999]];
for(let i=0;i<60;i++)lists.push(Array.from({length:ri(1,12)},()=>ri(-20,20)));
for(const L of lists)for(const task of['kareler','enb','ters','ortalama']){
  const I=K.runImperative(task,L),F=K.runFunctional(task,L),p=K.predictOps(task,L),ri_=refImp[task](L),rf=refFn[task](L);
  eq(I.result,ri_.result,`${task} buyurgan sonuç ${L}`);eq(F.result,rf.result,`${task} fonksiyonel sonuç ${L}`);eq(I.result,F.result);
  eq(I.assigns,ri_.a,`${task} atama ${L}`);eq(I.tests,ri_.t,`${task} karşılaştırma ${L}`);eq(F.apps,rf.apps,`${task} uygulama ${L}`);
  eq(p.assigns,ri_.a,`${task} kuram atama ${L}`);eq(p.tests,ri_.t);eq(p.apps,rf.apps,`${task} kuram uygulama ${L}`);
  // iz tutarlılığı: sayaçlar azalmaz, son olay toplamı verir, girdi listesi değişmez
  ok(I.trace.every((e,j)=>j===0||(e.assigns>=I.trace[j-1].assigns&&e.assigns-I.trace[j-1].assigns<=1)));
  ok(F.trace.every((e,j)=>j===0||e.apps===F.trace[j-1].apps+1),'her yeniden yazma adımı tam bir uygulama');
  eq(I.trace.at(-1).assigns,I.assigns);eq(F.trace.at(-1).apps,F.apps);eq(F.trace.at(-1).expr,K.fmt(F.result));
}
const frozenInput=Object.freeze([3,8,5,2,7,4]);K.runImperative('ters',frozenInput);K.runFunctional('ters',frozenInput);ok(true);
// varsayılan durumun sayfada görünen sayıları
{const L=[3,8,5,2,7,4],I=K.runImperative('kareler',L),F=K.runFunctional('kareler',L);eq([I.result,I.assigns,I.tests,F.apps],[84,17,13,15]);eq(F.inter.map(x=>x.value),[[8,2,4],[64,4,16]]);}
for(const bad of[[],Array(13).fill(1),[1.5],[1000],'abc'])for(const f of[K.runImperative,K.runFunctional]){assert.throws(()=>f('kareler',bad));checks++;}
assert.throws(()=>K.runImperative('yok',[1]));checks++;

// ---------- 1c. istekli / tembel ----------
for(let i=0;i<400;i++){
  const N=ri(1,200),pred=rnd()<.5?'esik':'bolunur',param=pred==='esik'?ri(0,45000):ri(1,60);
  let k=null;for(let j=1;j<=N;j++){const x=j*j;if(pred==='esik'?x>param:x%param===0){k=j;break;}}
  const E=K.firstMatch({N,pred,param,lazy:false}),Z=K.firstMatch({N,pred,param,lazy:true}),tE=K.firstTheory({N,pred,param,lazy:false}),tZ=K.firstTheory({N,pred,param,lazy:true});
  eq([E.index,Z.index],[k,k],`ilk indeks N=${N} ${pred} ${param}`);eq(E.value,k===null?null:k*k);eq(Z.value,E.value);
  eq([E.source,E.map,E.pred],[N,N,N]);const t=k===null?N:k;eq([Z.source,Z.map,Z.pred],[t,t,t]);
  eq([tE.source,tE.apps,tE.k],[N,2*N,k]);eq([tZ.source,tZ.apps,tZ.k],[t,2*t,k]);
}
eq(K.firstMatch({N:100,pred:'esik',param:2500,lazy:true}).apps,102);eq(K.firstMatch({N:100,pred:'bolunur',param:12,lazy:true}).index,6);
assert.throws(()=>K.firstMatch({N:0,pred:'esik',param:1,lazy:true}));assert.throws(()=>K.firstMatch({N:10,pred:'bolunur',param:0,lazy:true}));checks+=2;

// ---------- 2. özyineleme ----------
const fibs=[0,1];for(let i=2;i<40;i++)fibs.push(fibs[i-1]+fibs[i-2]);
function native(fn,n,memo){let calls=0,depth=0,max=0;const tab=new Map();
  const enter=()=>{calls++;depth++;if(depth>max)max=depth;};
  const fakt=k=>{enter();const v=k===0?1:k*fakt(k-1);depth--;return v;};
  const topla=l=>{enter();const v=l.length?l[0]+topla(l.slice(1)):0;depth--;return v;};
  const fib=k=>{enter();let v;if(memo&&tab.has(k))v=tab.get(k);else{v=k<2?k:fib(k-1)+fib(k-2);if(memo)tab.set(k,v);}depth--;return v;};
  const value=fn==='fakt'?fakt(n):fn==='topla'?topla(Array.from({length:n},(_,i)=>i+1)):fib(n);return{value,calls,max};}
for(let n=0;n<=18;n++){
  for(const fn of['fakt','topla','fib'])for(const memo of[false,true]){
    if(memo&&fn!=='fib')continue;
    const R=K.runRecursive({fn,n,memo}),ref=native(fn,n,memo),t=K.recursionTheory({fn,n,memo});
    eq([R.result,R.calls,R.maxDepth],[ref.value,ref.calls,ref.max],`${fn}(${n}) memo=${memo}`);eq([t.calls,t.depth],[ref.calls,ref.max],`kuram ${fn}(${n}) memo=${memo}`);
    eq(R.events.filter(e=>e.t==='call').length,R.events.filter(e=>e.t==='ret').length);
  }
  eq(K.runRecursive({fn:'fib',n}).calls,2*fibs[n+1]-1,'saf fib çağrı kapalı biçimi');
  eq(K.runRecursive({fn:'fib',n,memo:true}).calls,n<2?1:2*n-1,'notlu fib çağrı kapalı biçimi');
  eq(K.runRecursive({fn:'fib',n}).maxDepth,Math.max(1,n));
  const values={fakt:Array.from({length:n},(_,i)=>i+1).reduce((a,b)=>a*b,1),topla:n*(n+1)/2,fib:fibs[n]};
  for(const fn of['fakt','topla','fib'])for(const tco of[false,true]){
    const R=K.runRecursive({fn,form:'kuyruk',n,tco}),t=K.recursionTheory({fn,form:'kuyruk',n,tco});
    eq(R.result,values[fn],`${fn} kuyruk n=${n}`);eq(R.calls,n+1);eq(R.maxDepth,tco?1:n+1,`${fn} kuyruk derinlik tco=${tco}`);eq([t.calls,t.depth],[n+1,tco?1:n+1]);
    eq(R.events.filter(e=>e.t==='reuse').length,tco?n:0);
    eq(K.runRecursive({fn,form:'duz',n,tco}).maxDepth,K.runRecursive({fn,form:'duz',n}).maxDepth,'düz biçimde TCO etkisiz');
  }
}
eq(K.runRecursive({fn:'fib',n:18}).calls,8361);eq(K.runRecursive({fn:'topla',n:30}).result,465);eq(K.runRecursive({fn:'fakt',n:18}).result,6402373705728000);
ok(Number.isSafeInteger(K.runRecursive({fn:'fakt',n:18}).result));
for(const bad of[{fn:'x',n:1},{fn:'fib',n:-1},{fn:'fib',n:31},{fn:'fib',n:1.5},{fn:'fib',form:'z',n:1}]){assert.throws(()=>K.runRecursive(bad));checks++;}

// ---------- 3. mini Prolog: bağımsız ikinci ayrıştırıcı + çözümleyici ----------
const isVar=t=>typeof t==='string'&&/^[\p{Lu}_]/u.test(t);
function splitTop(s){const out=[];let d=0,cur='';for(const ch of s){if(ch==='(')d++;if(ch===')')d--;if(ch===','&&d===0){out.push(cur);cur='';}else cur+=ch;}out.push(cur);return out.map(x=>x.trim());}
function T2(s){s=s.trim();const i=s.indexOf('(');return i<0?s:[s.slice(0,i).trim(),...splitTop(s.slice(i+1,s.lastIndexOf(')'))).map(T2)];}
function G2(s){const m=s.match(/^(.*?)\s*(\\=|=)\s*(.*)$/s);return m?[m[2],T2(m[1]),T2(m[3])]:T2(s);}
function parse2(src){return src.replace(/%[^\n]*/g,'').split(/\.\s*(?:\n|$)/).map(c=>c.trim()).filter(Boolean).map(c=>{const i=c.indexOf(':-');return i<0?{h:T2(c),b:[]}:{h:T2(c.slice(0,i)),b:splitTop(c.slice(i+2)).map(G2)};});}
function solve2(clauses,goals){
  const sols=[];let unifs=0,backs=0,fresh=0;
  const walk=(t,env)=>{while(isVar(t)&&Object.hasOwn(env,t))t=env[t];return t;};
  const occurs=(v,t,env)=>{t=walk(t,env);return typeof t==='string'?t===v:t.slice(1).some(x=>occurs(v,x,env));};
  const unify=(a,b,env)=>{a=walk(a,env);b=walk(b,env);
    if(isVar(a)){if(a===b)return env;return occurs(a,b,env)?null:{...env,[a]:b};}
    if(isVar(b))return occurs(b,a,env)?null:{...env,[b]:a};
    if(typeof a==='string'||typeof b==='string')return a===b?env:null;
    if(a[0]!==b[0]||a.length!==b.length)return null;
    for(let i=1;i<a.length&&env;i++)env=unify(a[i],b[i],env);return env;};
  const rename=(t,k)=>typeof t==='string'?(isVar(t)?t+'~'+k:t):[t[0],...t.slice(1).map(x=>rename(x,k))];
  const show=(t,env)=>{t=walk(t,env);return typeof t==='string'?t:t[0]+'('+t.slice(1).map(x=>show(x,env)).join(', ')+')';};
  const qv=[];const collect=t=>{if(typeof t==='string'){if(isVar(t)&&!qv.includes(t))qv.push(t);}else t.slice(1).forEach(collect);};goals.forEach(collect);
  const key=t=>typeof t==='string'?t+'/0':t[0]+'/'+(t.length-1);
  (function prove(gs,env){
    if(!gs.length){sols.push(qv.map(v=>v+' = '+show(v,env)).join(', ')||'doğru');return;}
    const[g,...rest]=gs;
    if(Array.isArray(g)&&(g[0]==='='||g[0]==='\\=')&&g.length===3){unifs++;const e=unify(g[1],g[2],env);if(g[0]==='='){if(e)prove(rest,e);}else if(!e)prove(rest,env);return;}
    clauses.filter(c=>key(c.h)===key(g)).forEach((c,i)=>{if(i>0)backs++;unifs++;const k=++fresh,e=unify(rename(c.h,k),g,env);if(e)prove(c.b.map(x=>rename(x,k)).concat(rest),e);});
  })(goals,{});
  return{sols,unifs,backs};
}
const FACTS=['ebeveyn(ayla, cem).','ebeveyn(ayla, derya).','ebeveyn(bora, cem).','ebeveyn(bora, derya).','ebeveyn(cem, elif).','ebeveyn(cem, fırat).','ebeveyn(derya, gül).','ebeveyn(elif, hakan).'].join('\n');
const RULES='büyükebeveyn(X, Z) :- ebeveyn(X, Y), ebeveyn(Y, Z).\nkardeş(X, Y) :- ebeveyn(P, X), ebeveyn(P, Y), X \\= Y.\n';
const RIGHT='ata(X, Y) :- ebeveyn(X, Y).\nata(X, Y) :- ebeveyn(X, Z), ata(Z, Y).',LEFT='ata(X, Y) :- ata(X, Z), ebeveyn(Z, Y).\nata(X, Y) :- ebeveyn(X, Y).',SWAP='ata(X, Y) :- ebeveyn(X, Y).\nata(X, Y) :- ata(X, Z), ebeveyn(Z, Y).';
// sayfadaki hazır bilgi tabanı bu olguları ve kuralları içermeli
for(const frag of[...FACTS.split('\n'),'büyükebeveyn(X, Z) :- ebeveyn(X, Y), ebeveyn(Y, Z).','ata(X, Y) :- ebeveyn(X, Z), ata(Z, Y).'])ok(html.includes(frag.replace(/\\/g,'\\\\'))||html.includes(frag),'sayfada: '+frag);
function both(kbText,q){const a=K.plSolveAll(K.plParse(kbText),K.plParseQuery(q)),b=solve2(parse2(kbText),splitTop(q).map(G2));
  eq(a.halted,null,q);eq(a.solutions,b.sols,'çözüm sırası '+q);eq(a.unifications,b.unifs,'birleştirme '+q);eq(a.backtracks,b.backs,'geri izleme '+q);return a;}
// kaba kuvvet başvuruları
const brute={
  buyuk:E=>{const o=[];for(const[a,b]of E)for(const[c,d]of E)if(b===c)o.push(`X = ${a}, Z = ${d}`);return o;},
  kardes:E=>{const o=[];for(const[p,x]of E)for(const[q,y]of E)if(p===q&&x!==y)o.push(`X = ${x}, Y = ${y}`);return o;},
  torun:(E,who)=>{const names=[...new Set(E.flat())],reach=new Map(names.map(n=>[n,new Set()]));let ch=true;for(const[a,b]of E)reach.get(a).add(b);
    while(ch){ch=false;for(const[a,b]of E)for(const x of reach.get(b))if(!reach.get(a).has(x)){reach.get(a).add(x);ch=true;}}return[...(reach.get(who)||[])].sort();},
  paths:(E,who)=>{const f=x=>1+E.filter(([a])=>a===x).reduce((s,[,b])=>s+f(b),0);return f(who);}
};
const famE=FACTS.split('\n').map(l=>l.match(/\((\S+), (\S+)\)/).slice(1));
{const kb=FACTS+'\n'+RULES+RIGHT;
  const g=both(kb,'büyükebeveyn(X, Z)');eq(g.solutions,brute.buyuk(famE));eq([g.unifications,g.backtracks,g.solutions.length],[73,63,7]);
  const s=both(kb,'kardeş(X, Y)');eq(s.solutions,brute.kardes(famE));eq([s.unifications,s.backtracks,s.solutions.length],[87,63,6]);
  const a=both(kb,'ata(ayla, Y)');eq(a.solutions.map(x=>x.slice(4)).sort(),brute.torun(famE,'ayla'));eq([a.unifications,a.backtracks],[126,105]);eq(a.solutions,['Y = cem','Y = derya','Y = elif','Y = fırat','Y = hakan','Y = gül']);
  eq(both(kb,'ata(X, hakan)').solutions.map(x=>x.slice(4)).sort(),['ayla','bora','cem','elif']);
  eq(both(kb,'ebeveyn(X, cem)').solutions,['X = ayla','X = bora']);eq(both(kb,'kardeş(cem, K), ebeveyn(K, T)').solutions,['K = derya, T = gül','K = derya, T = gül']);
  eq(both(kb,'ebeveyn(hakan, X)').solutions,[]);eq(both(kb,'ebeveyn(ayla, cem)').solutions,['doğru']);eq(both(kb,'ata(hakan, ayla)').solutions,[]);
  eq(both(kb,'büyükebeveyn(ayla, T), T \\= elif').solutions,['T = fırat','T = gül']);eq(both(kb,'ebeveyn(X, Y), X = cem').solutions,['X = cem, Y = elif','X = cem, Y = fırat']);
  eq(both(kb,'yok(X)').solutions,[]);
  // sayfanın kuram işlevi ve buyurgan karşılığı, kaba kuvvetle
  for(const[kind,ref,who]of[['buyukebeveyn',brute.buyuk(famE)],['kardes',brute.kardes(famE)]]){const r=K.imperativeFamily(kind,famE,who);eq(r.rows.length,ref.length);eq(r.ops,famE.length**2);}
  eq(K.imperativeFamily('ata',famE,'ayla').rows.flat(),a.solutions.map(x=>x.slice(4)));eq(K.imperativeFamily('ata',famE,'ayla').ops,112);
}
// rastgele çevrimsiz aileler: iki çözümleyici, kaba kuvvet ve kapalı biçimler
for(let trial=0;trial<40;trial++){
  const people=['a','b','c','d','e','f','g','h'],E=[],seen=new Set();const m=ri(2,10);
  while(E.length<m){const i=ri(0,6),j=ri(i+1,7),k=i+'-'+j;if(seen.has(k))continue;seen.add(k);E.push([people[i],people[j]]);}
  const kb=E.map(([a,b])=>`ebeveyn(${a}, ${b}).`).join('\n')+'\n'+RULES+RIGHT;
  const g=both(kb,'büyükebeveyn(X, Z)');eq(g.solutions,brute.buyuk(E));eq([g.unifications,g.backtracks],[1+m+m*m,m*m-1]);
  const s=both(kb,'kardeş(X, Y)');eq(s.solutions,brute.kardes(E));const cnt={};E.forEach(([p])=>cnt[p]=(cnt[p]||0)+1);const S=Object.values(cnt).reduce((x,c)=>x+c*c,0);eq([s.unifications,s.backtracks],[1+m+m*m+S,m*m-1]);
  for(const who of['a','c','h']){const a=both(kb,`ata(${who}, Y)`),C=brute.paths(E,who);
    eq([...new Set(a.solutions.map(x=>x.slice(4)))].sort(),brute.torun(E,who));eq(a.solutions.length,C-1,'her iniş yolu bir çözüm');eq([a.unifications,a.backtracks],[(2*m+2)*C,(2*m-1)*C]);
    const th=K.familyTheory('ata',E,who),im=K.imperativeFamily('ata',E,who);eq([th.unifications,th.backtracks,th.ops,th.extra],[a.unifications,a.backtracks,2*m*C,C]);eq(im.ops,2*m*C);eq(im.rows.flat(),a.solutions.map(x=>x.slice(4)),'buyurgan sıra = Prolog sırası');}
  const tg=K.familyTheory('buyukebeveyn',E),ts=K.familyTheory('kardes',E);eq([tg.unifications,tg.backtracks,tg.ops],[g.unifications,g.backtracks,m*m]);eq([ts.unifications,ts.backtracks,ts.ops,ts.extra],[s.unifications,s.backtracks,m*m,S]);
  eq(K.imperativeFamily('buyukebeveyn',E).rows.map(r=>`X = ${r[0]}, Z = ${r[1]}`),g.solutions);eq(K.imperativeFamily('kardes',E).rows.map(r=>`X = ${r[0]}, Y = ${r[1]}`),s.solutions);
}
// bileşik terimler, oluşum denetimi, Peano toplaması
{const peano='topla(sifir, N, N).\ntopla(s(M), N, s(K)) :- topla(M, N, K).';
  eq(both(peano,'topla(X, Y, s(s(s(sifir))))').solutions,['X = sifir, Y = s(s(s(sifir)))','X = s(sifir), Y = s(s(sifir))','X = s(s(sifir)), Y = s(sifir)','X = s(s(s(sifir))), Y = sifir']);
  eq(both(peano,'topla(s(s(sifir)), s(sifir), T)').solutions,['T = s(s(s(sifir)))']);
  eq(both('esit(X, X).','esit(f(A, b), f(a, B))').solutions,['A = a, B = b']);eq(both('esit(X, X).','esit(X, f(X))').solutions,[],'oluşum denetimi');
  eq(both('p(a).\np(b).','p(X), p(Y), X \\= Y').solutions,['X = a, Y = b','X = b, Y = a']);eq(both('p(a).','X = f(Y), Y = a').solutions,['X = f(a), Y = a']);
  const E=new Map();ok(K.plUnify(K.plParseQuery('f(X, g(Y))')[0],K.plParseQuery('f(a, g(b))')[0],E).ok);ok(!K.plUnify(K.plParseQuery('f(a)')[0],K.plParseQuery('f(b)')[0],E).ok);ok(!K.plUnify(K.plParseQuery('f(a)')[0],K.plParseQuery('f(a, b)')[0],E).ok);eq(E.size,0,'birleştirme girdiyi değiştirmez');
}
// sol özyineleme: döngü sınırda yakalanır; tümce sırası değişince yanıtlar gelir ama arama yine bitmez
{const L=K.plSolveAll(K.plParse(FACTS+'\n'+RULES+LEFT),K.plParseQuery('ata(ayla, Y)'));eq([L.halted,L.solutions.length],['goals',0]);ok(L.maxStack>=64);
  const S=K.plSolveAll(K.plParse(FACTS+'\n'+RULES+SWAP),K.plParseQuery('ata(ayla, Y)'));eq(S.halted,'unify');eq(S.unifications,2000);eq(S.solutions.map(x=>x.slice(4)).sort(),brute.torun(famE,'ayla'));
  const big=K.plSolveAll(K.plParse(FACTS+'\n'+RULES+SWAP),K.plParseQuery('ata(ayla, Y)'),{maxUnify:20000,maxGoals:400});ok(big.halted!==null,'sınır büyüyünce de bitmiyor');
  const R=K.plSolveAll(K.plParse(FACTS+'\n'+RULES+RIGHT),K.plParseQuery('ata(ayla, Y)'));eq(R.halted,null);
  // adım adım çözümleyici ile toplu çalıştırma aynı sayıları verir; ağaç tutarlı
  const st=K.plSolver(K.plParse(FACTS+'\n'+RULES+RIGHT),K.plParseQuery('kardeş(X, Y)'));let n=0,sol=0,fail=0;for(let e;(e=st.step());){n++;if(e.t==='solution')sol++;}
  eq([st.state.unifications,st.state.backtracks,sol],[87,63,6]);eq(st.nodes.filter(x=>x.status==='solution').length,6);ok(st.nodes.every(x=>x.status!=='open'),'arama bitince açık düğüm kalmaz');ok(st.nodes.every((x,i)=>i===0||(x.parent<i&&st.nodes[x.parent].depth===x.depth-1)));eq(st.step(),null);
}
for(const bad of['ebeveyn(ayla cem).','ebeveyn(ayla, cem)','X :- a.','a :- .','ebeveyn(ayla, cem). $','f(.']){assert.throws(()=>K.plParse(bad),e=>e.name==='SyntaxError'&&/^Satır \d+: /.test(e.message),bad);checks++;}
for(const bad of['','X','f(a','f(a) b']){assert.throws(()=>K.plParseQuery(bad),e=>e.name==='SyntaxError',bad);checks++;}
eq(K.plParseQuery('?- ebeveyn(X, cem).').length,1);assert.throws(()=>K.plParse('% yorum\nA_b(x).'),e=>/^Satır 2: /.test(e.message),'büyük harfle başlayan baş reddedilmeli; satır numarası yorumdan sonra doğru');checks++;eq(K.plParse('% yorum\np(a). % son\n').clauses.length,1);
ok(Object.isFrozen(K));
ok(!/[̀-ͯ]/.test(html.normalize('NFC').replace(/[À-ɏ]/g,'')),'birleşik işaret yok');ok(!/https?:\/\/[^"']*\.(js|css|woff2?)/.test(html),'dış betik/yazı tipi yok');
console.log(`G ${SLUG}: ${checks.toLocaleString('tr-TR')} bağımsız çekirdek kontrolü PASS`);

if(process.argv.includes('--browser')){
  const {chromium}=await import('playwright');const {createServer}=await import('node:http');const {join,extname}=await import('node:path');const {fileURLToPath}=await import('node:url');const root=fileURLToPath(new URL('../',import.meta.url));
  const server=createServer((req,res)=>{const file=join(root,decodeURIComponent(new URL(req.url,'http://localhost').pathname));if(!fs.existsSync(file)||fs.statSync(file).isDirectory()){res.writeHead(404).end();return;}res.setHeader('Content-Type',({'.html':'text/html; charset=utf-8','.js':'text/javascript; charset=utf-8','.css':'text/css; charset=utf-8'})[extname(file)]||'application/octet-stream');res.end(fs.readFileSync(file));});
  await new Promise(r=>server.listen(0,'127.0.0.1',r));let browser;const before=checks;
  try{
    browser=await chromium.launch();
    for(const[width,height,theme]of[[390,900,'light'],[1280,900,'dark']]){
      const ctx=await browser.newContext({viewport:{width,height},deviceScaleFactor:2});const page=await ctx.newPage();
      await page.addInitScript(t=>{localStorage.setItem('acelya-theme',t);localStorage.setItem('acelya-sound-muted','1');},theme);page.setDefaultTimeout(5000);
      const errors=[];page.on('pageerror',e=>errors.push(e.message));page.on('console',m=>{if(m.type()==='error'&&!/404|Failed to load resource/.test(m.text()))errors.push(m.text());});
      await page.goto(`http://127.0.0.1:${server.address().port}/${SLUG}.html`);await page.waitForSelector('#atamaOlc');
      const click=id=>page.locator('#'+id).click(),read=async id=>(await page.locator('#'+id).textContent()).trim(),
        range=(id,v)=>page.locator('#'+id).evaluate((e,v)=>{e.value=v;e.dispatchEvent(new Event('input',{bubbles:true}));},v),
        type=(id,v)=>page.locator('#'+id).evaluate((e,v)=>{e.value=v;e.dispatchEvent(new Event('input',{bubbles:true}));e.dispatchEvent(new Event('change',{bubbles:true}));},v),
        sel=(id,v)=>page.locator('#'+id).selectOption(v),is=async(id,t)=>{eq(await read(id),String(t),id);},has=async(id,t)=>{const v=await read(id);assert(v.includes(t),`${id}: «${v}» içinde «${t}» yok`);checks++;},
        noOverflow=async where=>{eq(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),true,'yatay taşma: '+where+' @'+width);},
        count=async q=>page.locator(q).count();
      // erişilebilirlik: her denetimin etiketi var
      eq(await page.evaluate(()=>[...document.querySelectorAll('.app-content input,.app-content select,.app-content textarea')].filter(e=>!(e.labels&&e.labels.length)&&!e.getAttribute('aria-label')).map(e=>e.id)),[],'etiketsiz denetim');
      eq(await page.evaluate(()=>[...document.querySelectorAll('.app-content canvas')].filter(c=>c.getAttribute('role')!=='img'||!c.getAttribute('aria-label')).length),0);
      eq(await page.evaluate(()=>Object.isFrozen(ParadigmLab)&&!Object.getOwnPropertyDescriptor(window,'ParadigmLab').writable),true);
      // --- sekme 1
      await is('atamaOlc',17);await is('atamaKuram',17);await is('atamaFark',0);await is('uygOlc',15);await is('uygKuram',15);await is('testOlc',13);await has('sonucEsit','Eşit: 84');await has('fnIfade','fold(topla, 0, map(kare, filter(çift?, [3, 8, 5, 2, 7, 4])))');
      await click('durumAdim');await click('durumAdim');await has('impNot','i ← 0');eq(await count('#impKod li.on'),1);await has('fnIfade','[8] ++ filter');
      await range('adim1',5);await has('impNot','Koşul yanlış');await click('durumSon');await has('impNot','Sonuç: 84');await is('fnIfade','84');await has('fnAra','[64, 4, 16]');await has('durumDurum','aynı sonuca ulaştı');
      await sel('gorev','enb');await has('sonucEsit','Eşit: 8');await is('atamaOlc',8);await is('uygOlc',7);await sel('gorev','ters');await has('sonucEsit','Eşit: [4, 7, 2, 5, 8, 3]');await is('atamaOlc',17);
      await sel('gorev','ortalama');await has('sonucEsit','4.833');await is('atamaOlc',21);await is('uygOlc',15);await sel('gorev','kareler');
      await click('listeCift');await is('atamaOlc',20);await is('uygOlc',21);await click('listeTek');await is('atamaOlc',14);await is('uygOlc',9);await has('sonucEsit','Eşit: 0');await click('listeArtan');await is('atamaOlc',22);await has('sonucEsit','Eşit: 120');
      await type('liste','a, 2');eq(await page.locator('#listeMesaj').isVisible(),true);await has('listeMesaj','tam sayı değil');await type('liste','1 2 3 4 5 6 7 8 9 10 11 12 13');await has('listeMesaj','En çok 12');await type('liste','');await has('listeMesaj','boş');
      await type('liste','5');eq(await page.locator('#listeMesaj').isVisible(),false);await sel('gorev','enb');await is('atamaOlc',2);await is('atamaFark',0);await is('uygOlc',2);await has('sonucEsit','Eşit: 5');
      await type('liste','-999, 999, 0, -4');await sel('gorev','kareler');await is('atamaFark',0);await is('uygFark',0);await has('sonucEsit','Eşit: 16');
      await is('dokOlc',100);await is('tuygOlc',200);await is('tuygFark',0);await sel('strateji','tembel');await is('dokOlc',51);await is('tuygOlc',102);await is('tuygKuram',102);await has('tembelSonuc','2601');await has('tembelDiger','200');
      await range('esik',0);await is('tuygOlc',2);await range('uzunlukN',200);await range('esik',40000);await has('tembelSonuc','Yok');await is('tuygOlc',400);await is('tuygFark',0);await has('tembelDurum','yok');
      await range('uzunlukN',10);await sel('yuklem','bolunur');await is('dokOlc',6);await range('bolen',60);await has('tembelSonuc','Yok');await range('bolen',2);await is('dokOlc',2);eq(await page.locator('#esik').isDisabled(),true);
      await noOverflow('sekme 1');await click('durumReset');eq(await page.locator('#liste').inputValue(),'3, 8, 5, 2, 7, 4');await is('atamaOlc',17);await is('dokOlc',100);eq(await page.locator('#strateji').inputValue(),'istekli');
      // klavye: Boşluk oynatır/duraklatır, R sıfırlar, form denetiminde yok sayılır
      await page.locator('h1').click();await page.keyboard.press('Space');await is('durumOynat','Duraklat');await page.waitForFunction(()=>+document.getElementById('adim1').value>=2);await page.keyboard.press('Space');await is('durumOynat','Oynat');
      await page.keyboard.press('r');eq(await page.locator('#adim1').inputValue(),'0');await page.locator('#liste').focus();await page.keyboard.press('r');eq((await page.locator('#liste').inputValue()).endsWith('r'),true);await click('durumReset');
      // --- sekme 2
      await click('tab-yigin');await is('cagriOlc',6);await is('cagriKuram',6);await is('derinOlc',6);await is('derinFark',0);await has('yiginSonuc','fakt(5) = 120');eq(await page.locator('#tco').isDisabled(),true);eq(await page.locator('#memo').isDisabled(),true);
      await click('yiginAdim');await click('yiginAdim');await click('yiginAdim');eq(await count('#yiginListe li'),3);await has('yiginListe','bekliyor: 5 · □');await click('yiginSon');await has('yiginListe','Yığın boş');await has('yiginOlay','120');
      await sel('bicim','kuyruk');await is('derinOlc',6);await page.locator('#tco').check();await is('derinOlc',1);await is('derinKuram',1);await is('cagriOlc',6);await has('yiginDurum','tek çerçevede');await range('adim2',4);eq(await count('#yiginListe li'),1);await has('yiginListe','yeniden kullanıldı');
      await sel('islev','fib');await is('cagriOlc',7);await sel('bicim','duz');await is('cagriOlc',25);await is('cagriKuram',25);await is('derinOlc',6);eq(await page.locator('#tco').isChecked(),false);await page.locator('#memo').check();await is('cagriOlc',11);await is('cagriKuram',11);await is('cagriFark',0);
      await range('nDeger',18);await is('cagriOlc',35);await page.locator('#memo').uncheck();await is('cagriOlc',8361);await is('cagriKuram',8361);await is('derinOlc',18);await has('yiginSonuc','2584');
      await range('nDeger',0);await is('cagriOlc',1);await is('derinOlc',1);await is('derinFark',0);await is('cagriFark',0);await range('nDeger',1);await is('cagriFark',0);await is('derinFark',0);
      await sel('islev','topla');await range('nDeger',30);await is('cagriOlc',31);await has('yiginSonuc','465');await sel('islev','fakt');await range('nDeger',18);await has('yiginSonuc','6402373705728000');await range('nDeger',0);await has('yiginSonuc','fakt(0) = 1');await is('derinOlc',1);
      await noOverflow('sekme 2');await click('yiginReset');await is('cagriOlc',6);eq(await page.locator('#nDeger').inputValue(),'5');eq(await page.locator('#islev').inputValue(),'fakt');
      // --- sekme 3
      await click('tab-mantik');await is('birOlc',73);await is('birKuram',73);await is('birFark',0);await is('geriOlc',63);await is('geriKuram',63);await has('cozumSayi','7 çözüm');await is('bkOlc',64);await is('bkKuram',64);await has('buyurganSonuc','sıra da aynı');
      await click('mantikAdim');await has('tumce','büyükebeveyn(X_1, Z_1)');await has('mantikDurum','birleşti');await click('mantikCozum');eq(await count('#cozumler li'),1);await has('cozumler','X = ayla, Z = elif');await has('mantikDurum','1. çözüm');
      await click('mantikTum');eq(await count('#cozumler li'),7);await has('mantikDurum','Arama bitti');await has('mantikAnlik','73 birleştirme denemesi, 63 geri izleme, 7 çözüm');await range('adim3',3);await has('mantikAnlik','Adım 3 /');
      await sel('sorguHazir','ata(ayla, Y)');await is('birOlc',126);await is('birKuram',126);await is('geriOlc',105);await is('geriFark',0);await is('bkOlc',112);await is('bkKuram',112);await has('buyurganSonuc','sıra da aynı');await has('buyurganKod','altsoy(k):');await has('buyurganKod','altsoy(ayla)');eq((await page.locator('#buyurganKod').textContent()).includes('torunlar'),false);
      await sel('sorguHazir','kardeş(X, Y)');await is('birOlc',87);await is('birKuram',87);await is('geriOlc',63);await has('cozumSayi','6 çözüm');
      await sel('sorguHazir','kardeş(cem, K), ebeveyn(K, T)');await has('birFark','tanımsız');await has('cozumSayi','2 çözüm');await has('buyurganSonuc','yalnız üç hazır sorgu');
      await sel('kbHazir','sol');await has('birOlc','≥ 64');await has('birFark','arama bitmedi');await click('mantikTum');await has('mantikDurum','Arama kesildi: hedef yığını 64');eq((await page.locator('#mantikDurum').textContent()).includes('gidermedi'),false);await has('cozumSayi','≥ 0 çözüm');await has('buyurganSonuc','112 karşılaştırmada bitti');
      await sel('kbHazir','sira');await has('birOlc','≥ 2000');await has('cozumSayi','≥ 6 çözüm');await click('mantikTum');await has('mantikDurum','2000 birleştirme sınırına');eq(await count('#cozumler li'),6);await has('mantikDurum','sol özyinelemeyi gidermedi');
      await sel('kbHazir','aile');await is('birOlc',73);await page.locator('#sorgu').fill('ebeveyn(X, cem)');await page.locator('#sorgu').press('Enter');await has('cozumSayi','2 çözüm');await is('birOlc',8);await has('birFark','tanımsız');
      await page.locator('#sorgu').fill('ebeveyn(hakan, X)');await click('mantikSorgula');await click('mantikTum');await has('mantikDurum','yanlış');await page.locator('#sorgu').fill('ebeveyn(ayla, cem)');await click('mantikSorgula');await click('mantikTum');await has('cozumler','doğru');
      await page.locator('#sorgu').fill('ebeveyn(X');await click('mantikSorgula');eq(await page.locator('#bilgiMesaj').isVisible(),true);await has('bilgiMesaj','Sorgu okunamadı');eq(await page.locator('#mantikAdim').isDisabled(),true);
      await page.locator('#sorgu').fill('ata(ayla, Y)');await type('bilgi','ebeveyn(ayla cem).');await has('bilgiMesaj','Bilgi tabanı okunamadı');await has('bilgiMesaj','Satır 1');
      await type('bilgi','ebeveyn(ayla, cem).\nebeveyn(cem, ayla).\nata(X, Y) :- ebeveyn(X, Y).\nata(X, Y) :- ebeveyn(X, Z), ata(Z, Y).');await click('mantikSorgula');await has('birOlc','≥');await has('bkFark','tanımsız');
      await noOverflow('sekme 3');await click('mantikReset');await is('birOlc',73);eq(await page.locator('#sorgu').inputValue(),'büyükebeveyn(X, Z)');eq(await page.locator('#kbHazir').inputValue(),'aile');eq(await page.locator('#bilgiMesaj').isVisible(),false);
      // sekme klavyesi
      await page.locator('#tab-mantik').focus();await page.keyboard.press('Home');eq(await page.locator('#tab-durum').getAttribute('aria-selected'),'true');await page.keyboard.press('ArrowRight');eq(await page.locator('#tab-yigin').getAttribute('aria-selected'),'true');await page.keyboard.press('End');eq(await page.locator('#tab-mantik').getAttribute('aria-selected'),'true');await page.keyboard.press('ArrowRight');eq(await page.locator('#tab-durum').getAttribute('aria-selected'),'true');eq(await page.locator('#panel-mantik').isHidden(),true);
      await noOverflow('son');assert.deepEqual(errors,[],'konsol/sayfa hatası @'+width);checks++;await ctx.close();
    }
    console.log(`G ${SLUG}: ${checks-before} tarayıcı kontrolü (390 px açık + 1280 px koyu; sekmeler, hazırlar, sınır değerleri, klavye, taşma, etiketler) PASS`);
  }finally{await browser?.close();await new Promise(r=>server.close(r));}
}
