// Kalıcı denetim: hesaplama-teorisi.html çekirdeği (window.ComputeLab).
// Başvurular sayfanın kendi kodunu yinelemez: yayımlanmış meşgul kunduz değerleri, ikinci bir Turing makinesi
// yürütücüsü (iki yığınlı bant), kaba kuvvet makine taraması, dil tanımları, aritmetik ve de Bruijn indisli
// ikinci bir β-indirgeyici. `--browser` ile gerçek tarayıcıda arayüz denetimleri de çalışır.
import fs from 'node:fs';
import vm from 'node:vm';
import assert from 'node:assert/strict';
const html=fs.readFileSync(new URL('../hesaplama-teorisi.html',import.meta.url),'utf8');
const source=html.split('/* KERNEL-BEGIN */')[1]?.split('/* KERNEL-END */')[0];
assert(source,'KERNEL-BEGIN / KERNEL-END sınırları gerekli');
const context={};vm.createContext(context);vm.runInContext(source+';globalThis.K=ComputeLab;',context);
const K=context.K;let checks=0;
const plain=v=>v===undefined?null:JSON.parse(JSON.stringify(v)); // vm bağlamından gelen diziler başka bir Array prototipi taşır
const eq=(a,b,msg)=>{assert.deepEqual(plain(a),plain(b),msg||`${JSON.stringify(a)} ≠ ${JSON.stringify(b)}`);checks++;};
const ok=(v,msg)=>{assert(v,msg);checks++;};

/* ---------- İkinci Turing makinesi yürütücüsü: iki yığın, kural sözlüğü ---------- */
function refRun(rules,blank,input,limit,halts=['dur','kabul','ret'],start){
  const left=[],right=[...input].reverse();let cur=right.length?right.pop():blank,state=start,steps=0,pos=0,min=0,max=Math.max(0,[...input].length-1);
  while(steps<limit){
    if(halts.includes(state))return{status:'halt',state,steps,tape:tape(),ones:count(),cells:max-min+1,pos};
    const r=rules[state+' '+cur];if(!r)return{status:'norule',state,steps,tape:tape(),ones:count(),cells:max-min+1,pos};
    cur=r[0];
    if(r[1]==='R'){left.push(cur);cur=right.length?right.pop():blank;pos++;}else if(r[1]==='L'){right.push(cur);cur=left.length?left.pop():blank;pos--;}
    state=r[2];steps++;if(pos<min)min=pos;if(pos>max)max=pos;
  }
  if(halts.includes(state))return{status:'halt',state,steps,tape:tape(),ones:count(),cells:max-min+1,pos};
  return{status:'limit',state,steps,tape:tape(),ones:count(),cells:max-min+1,pos};
  function all(){return[...left,cur,...right.slice().reverse()];}
  function tape(){const a=all();let i=0,j=a.length-1;while(i<=j&&a[i]===blank)i++;while(j>=i&&a[j]===blank)j--;return a.slice(i,j+1).join('');}
  function count(){return blank==='1'?0:all().filter(c=>c==='1').length;}
}
// Sayfanın tablo metnini bağımsız, en yalın biçimde okur (yalnız geçerli hazır tablolar için).
function refTable(text){const rules={};let blank='_',start=null;for(const raw of text.split('\n')){const l=raw.split('#')[0].trim();if(!l)continue;if(l.startsWith('boş:')){blank=l.slice(4).trim();continue;}const[q,r,,w,m,n]=l.split(/\s+/);rules[q+' '+r]=[w,m,n];start??=q;}return{rules,blank,start};}
// Standart gösterim (Wikipedia · Busy beaver): "1RB1LB_1LA1RH"
function stdTable(s){const rules={};s.split('_').forEach((row,i)=>{for(const b of[0,1]){const t=row.slice(b*3,b*3+3);rules['ABCDE'[i]+' '+b]=[t[0],t[1],t[2]==='H'?'dur':t[2]];}});return rules;}
const PUBLISHED=[ // n, tablo, adım, bir sayısı — Wikipedia · Busy beaver (11 Kasım 2026'da açıldı)
  ['bb1','1RH---',1,1],['bb2','1RB1LB_1LA1RH',6,4],['bb3s','1RB1RH_1LB0RC_1LC1LA',21,5],['bb3o','1RB1RH_0RC1RB_1LC1LA',14,6],
  ['bb4','1RB1LB_1LA0LC_1RH1LD_1RD0RA',107,13],['bb5','1RB1LC_1RC1RB_1RD0LE_1LA1LD_1RH0LA',47176870,4098]];
for(const[id,std,steps,ones]of PUBLISHED){
  const ref=refRun(stdTable(std),'0','',1e8,['dur'],'A');eq([ref.status,ref.steps,ref.ones],['halt',steps,ones],id+' bağımsız yürütücü');
  if(id==='bb1')continue;
  const s=K.tmRun(K.TM_PRESETS[id].table,'',1e8);eq([s.status,s.state,s.steps,s.ones],['halt','dur',steps,ones],id+' sayfa çekirdeği');
  eq(s.tape,ref.tape);eq(s.cells,ref.cells);
}
eq(JSON.parse(JSON.stringify(K.BB_KNOWN)),[{n:1,S:1,sigma:1},{n:2,S:6,sigma:4},{n:3,S:21,sigma:6},{n:4,S:107,sigma:13},{n:5,S:47176870,sigma:4098}]);
// 5 durumlu şampiyon: yayımlanan bant biçimi — 4098 bir, aralarında 8191 sıfır → 12289 hücre.
{const s=K.tmRun(K.TM_PRESETS.bb5.table,'',1e8);eq(s.tape.length,12289);eq([...s.tape].filter(c=>c==='0').length,8191);}
// Kaba kuvvet: duran bütün 2 ve 3 durumlu makineler arasında en çok adım ve en çok 1 (bütçe içinde duranlar).
function brute(n,budget){
  const opts=[];for(const w of[0,1])for(const m of[-1,1])for(let q=0;q<n;q++)opts.push([w,m,q]);opts.push([1,1,-1]);
  const cells=2*n,idx=new Array(cells).fill(0),tape=new Uint8Array(2*budget+3);let maxS=0,maxO=0,halting=0,total=0;
  for(;;){
    total++;tape.fill(0);let pos=budget+1,q=0,steps=0,halted=false;
    while(steps<budget){const o=opts[idx[q*2+tape[pos]]];tape[pos]=o[0];pos+=o[1];steps++;if(o[2]<0){halted=true;break;}q=o[2];}
    if(halted){halting++;let ones=0;for(const c of tape)ones+=c;if(steps>maxS)maxS=steps;if(ones>maxO)maxO=ones;}
    let k=0;while(k<cells&&++idx[k]===opts.length){idx[k]=0;k++;}if(k===cells)break;
  }
  return{maxS,maxO,halting,total};
}
{const b=brute(2,60);eq([b.maxS,b.maxO,b.total],[6,4,9**4]);}
if(!process.argv.includes('--quick')){const b=brute(3,60);eq([b.maxS,b.maxO,b.total],[21,6,13**6]);}

/* ---------- Tanıyıcılar ve hesaplayıcılar: dil tanımına ve aritmetiğe karşı ---------- */
const words=(alpha,max)=>{let out=[''],layer=[''];for(let n=1;n<=max;n++){layer=layer.flatMap(w=>alpha.map(c=>w+c));out=out.concat(layer);}return out;};
const P=K.TM_PRESETS;
for(const w of words(['0','1'],10)){const s=K.tmRun(P.palindrome.table,w,1e5);eq(s.state,w===[...w].reverse().join('')?'kabul':'ret','palindrom '+w);ok(s.status==='halt');}
for(const w of words(['a','b'],10)){const m=w.match(/^(a*)(b*)$/),s=K.tmRun(P.anbn.table,w,1e5);eq(s.state,m&&m[1].length===m[2].length?'kabul':'ret','anbn '+w);}
for(let n=0;n<=300;n++){const w=n.toString(2),s=K.tmRun(P.increment.table,w);eq([s.status,s.tape],['halt',(n+1).toString(2)]);}
eq(K.tmRun(P.increment.table,'0011').tape,'0100');eq(K.tmRun(P.increment.table,'').tape,'1');
eq(K.tmRun(P.increment.table,'1'.repeat(70)).tape,(BigInt('0b'+'1'.repeat(70))+1n).toString(2));
for(let a=0;a<=12;a++)for(let b=0;b<=12;b++){const s=K.tmRun(P.unary.table,'1'.repeat(a)+'+'+'1'.repeat(b));eq([s.status,s.state,s.tape],['halt','dur','1'.repeat(a+b)]);}
// "Kural yok" bir bitiş durumu değildir.
{const s=K.tmRun(P.unary.table,'111');eq([s.status,s.state,s.steps],['norule','ara',3]);}
// Elle sayılmış kapalı biçimler (sayfadaki ölçüm bölümünün kuram sütunu) — burada bağımsız yürütücüyle sınanır.
for(let n=0;n<=64;n++){
  const run=(id,w)=>{const t=refTable(P[id].table),r=refRun(t.rules,t.blank,w,1e6,undefined,t.start),s=K.tmRun(P[id].table,w,1e6);eq([s.status,s.state,s.steps,s.tape,s.cells],[r.status,r.state,r.steps,r.tape,r.cells],id+' '+n);return s.steps;};
  eq(run('palindrome','0'.repeat(n)),(n+1)*(n+2)/2);
  if(n>=1)eq(run('palindrome','0'.repeat(n-1)+'1'),n+2);
  eq(run('increment','1'.repeat(n)),2*n+2);
  eq(run('unary','1'.repeat(n)+'+'+'1'.repeat(n)),(2*n+1)+2);
  eq(run('anbn','a'.repeat(n)+'b'.repeat(n)),(2*n)**2/2+2*n+1);
  eq(run('anbn','a'.repeat(n)),n+1);
}
// Palindrom makinesinin bandı tek yönde n + 1 hücre kullanır; adım sayısı ikiye katlanınca ~4 kat.
{const T=n=>K.tmRun(P.palindrome.table,'0'.repeat(n),1e6).steps;ok(Math.abs(Math.log2(T(64)/T(32))-2)<0.07);ok(Math.abs(Math.log2(T(32)/T(16))-1.874)<0.001);eq(T(32),561);}

/* ---------- Ayrıştırıcı, sınırlar, bant büyümesi ---------- */
const bad=t=>K.tmParse(t);
eq(bad('q0 0 -> 1 R').ok,false);eq(bad('q0 0 -> 1 X q1').ok,false);eq(bad('q0 00 -> 1 R q1').ok,false);
eq(bad('q0 0 -> 1 R q1\nq0 0 -> 0 L q1').ok,false);eq(bad('dur 0 -> 1 R q1').ok,false);eq(bad('# yalnız açıklama').ok,false);
eq(bad('q0 0 -> 1 R q1\nboş: 0').ok,false);
{const p=bad('q0 0 -> 1 R q1');eq(p.ok,true);eq(p.warnings.length,1);eq(K.tmRun(p,'0').status,'norule');}
{const p=bad('q0, 0, 1, r, dur  # virgüllü yazım');eq(p.ok,true);eq(K.tmRun(p,'0').tape,'1');}
assert.throws(()=>K.tmInit(K.tmCompile(K.tmParse(P.palindrome.table)),'012'));checks++;
assert.throws(()=>K.tmInit(K.tmCompile(K.tmParse(P.palindrome.table)),'0_1'));checks++;
assert.throws(()=>K.tmCompile(K.tmParse('bozuk')));checks++;
{const s=K.tmRun('boş: 0\nA 0 -> 1 L A\nA 1 -> 1 L A','',100000);eq([s.status,s.steps,s.head,s.cells,s.ones],['limit',100000,-100000,100001,100000]);}
{const s=K.tmRun('boş: 0\nA 0 -> 1 R A\nA 1 -> 1 R A','',70000);eq([s.status,s.head,s.tape.length],['limit',70000,70000]);}
{const s=K.tmRun(P.loop.table,'',5000);eq(s.status,'limit');const p=K.tmParse(P.loop.table);eq(p.halts.length,0);eq(p.rules.length,p.states.length*p.symbols.length);}
// "Hiç durmayan sayaç" gerçekten ikili sayar: her artıştan sonra bant sırayla 1, 10, 11, 100, …
{const tapes=[];let prev='';for(let k=1;k<=400;k++){const s=K.tmRun(P.loop.table,'',k);if(s.state==='sag'&&s.tape!==prev){tapes.push(s.tape);prev=s.tape;}}ok(tapes.length>50&&tapes.every((x,i)=>x===(i+1).toString(2)),'sayaç ikili saymalı: '+tapes.slice(0,6));eq(K.tmRun(P.loop.table,'',1000).tape,'11111110');}
// Adım adım ilerleme ile toplu ilerleme aynı konfigürasyonu verir.
{const m=K.tmCompile(K.tmParse(P.bb4.table)),a=K.tmInit(m,''),b=K.tmInit(m,'');for(let i=0;i<107;i++)K.tmAdvance(a,1);K.tmAdvance(b,1000);eq(JSON.stringify(K.tmSnapshot(a)),JSON.stringify(K.tmSnapshot(b)));eq(K.tmAdvance(a,5),'halt');eq(a.steps,107);}

/* ---------- Numaralama ve köşegen sınıflandırması ---------- */
eq(K.ENUM_COUNT,34012224);eq([0,1,2,3,4,5,6,7,14,15].map(K.shortlex),['','0','1','00','01','10','11','000','111','0000']);
{const seen=new Set();for(let i=0;i<3000;i++)seen.add(K.tmEnum((i*11317+5)%K.ENUM_COUNT));eq(seen.size,3000);assert.throws(()=>K.tmEnum(K.ENUM_COUNT));checks++;eq(K.tmEnum(0).split('\n')[0],'A _ -> _ L A');}
{let halt=0,loop=0,unknown=0;
  for(let i=0;i<600;i++){const table=K.tmEnum((i*3455273+777)%K.ENUM_COUNT),w=K.shortlex(i%12),c=K.tmClassify(table,w,150),t=refTable(table),r=refRun(t.rules,'_',w,1500,['dur'],'A');
    if(c.result==='halt'){halt++;eq([r.status==='limit'?'x':'stop',r.steps],['stop',c.steps]);}
    else if(c.result==='loop'){loop++;eq(r.status,'limit','kanıtlı döngü 1.500 adımda da durmamalı');}
    else{unknown++;ok(r.status==='limit'||r.steps>150,'bilinmiyor: 150 adımda durmamış olmalı');}}
  ok(halt>100&&loop>5&&unknown>20,'üç sonuç türü de örneklemde görülmeli: '+[halt,loop,unknown]);}

/* ---------- İkinci β-indirgeyici: de Bruijn indisleri ---------- */
function dbParse(src){
  const toks=src.match(/λ|[.()]|[A-Za-z_][A-Za-z0-9_']*/g)||[];let i=0;
  const atom=env=>{const t=toks[i++];if(t==='('){const e=expr(env);assert.equal(toks[i++],')');return e;}
    if(t==='λ'){const ps=[];while(toks[i]!=='.')ps.push(toks[i++]);i++;let e=expr([...ps.slice().reverse(),...env]);for(let k=0;k<ps.length;k++)e={l:e};return e;}
    const k=env.indexOf(t);return k>=0?{v:k}:{f:t};};
  const expr=env=>{let e=atom(env);while(i<toks.length&&toks[i]!==')')e={a:e,x:atom(env)};return e;};
  const e=expr([]);assert.equal(i,toks.length);return e;
}
const shift=(t,d,c)=>'v'in t?(t.v>=c?{v:t.v+d}:t):'f'in t?t:'l'in t?{l:shift(t.l,d,c+1)}:{a:shift(t.a,d,c),x:shift(t.x,d,c)};
const sub=(t,j,s)=>'v'in t?(t.v===j?s:t):'f'in t?t:'l'in t?{l:sub(t.l,j+1,shift(s,1,0))}:{a:sub(t.a,j,s),x:sub(t.x,j,s)};
const beta=t=>shift(sub(t.a.l,0,shift(t.x,1,0)),-1,0);
function dbStep(t,strategy){
  if('v'in t||'f'in t)return null;
  if('l'in t){const r=dbStep(t.l,strategy);return r?{l:r}:null;}
  if(strategy==='normal'&&'l'in t.a)return beta(t);
  let r=dbStep(t.a,strategy);if(r)return{a:r,x:t.x};
  r=dbStep(t.x,strategy);if(r)return{a:t.a,x:r};
  return strategy!=='normal'&&'l'in t.a?beta(t):null;
}
const dbStr=t=>'v'in t?String(t.v):'f'in t?'<'+t.f+'>':'l'in t?'λ'+dbStr(t.l):'('+dbStr(t.a)+' '+dbStr(t.x)+')';
function dbNormalize(t,strategy,limit){let steps=0;for(;;){if(steps>=limit)return{t,steps,status:dbStep(t,strategy)?'limit':'normal'};const r=dbStep(t,strategy);if(!r)return{t,steps,status:'normal'};t=r;steps++;}}
const dbNum=t=>{if(!('l'in t)||!('l'in t.l))return null;let b=t.l.l,n=0;while('a'in b&&b.a.v===1){n++;b=b.x;}return b.v===0?n:null;};
const lib=K.lamParseDefs(K.LAM_LIBRARY);eq(lib.errors.length,0);eq(lib.defs.size,19);
const pure=src=>K.lamShow(K.lamParse(src,lib.defs),{fold:false});
function both(src,strategy,limit=3000){
  const a=K.lamNormalize(K.lamParse(src,lib.defs),strategy,limit),b=dbNormalize(dbParse(pure(src)),strategy,limit);
  eq([a.status,a.steps],[b.status,b.steps],src+' · '+strategy+' adım/durum');
  if(a.status==='normal')eq(dbStr(dbParse(K.lamShow(a.term,{fold:false}))),dbStr(b.t),src+' · '+strategy+' normal biçim');
  return{a,b};
}
// Yazdır–oku turu: sayfanın yazdırdığı terim, bağımsız ayrıştırıcıda aynı de Bruijn terimini verir.
for(const src of['λx.x','λx y z.x z (y z)','(λx.x x) (λx.x x)','λf.(λx.f (x x)) (λx.f (x x))','a (b c) (λx.x) d','(λx.λy.x) a b'])eq(dbStr(dbParse(pure(src))),K.lamKey(K.lamParse(src)),'yazdırma '+src);
// Aritmetik: Church sayıları gerçek toplama, çarpma, üs, öncül ve faktöriyeli hesaplar.
for(let m=0;m<=5;m++)for(let n=0;n<=5;n++)for(const st of['normal','applicative']){
  for(const[op,val]of[['PLUS',m+n],['MULT',m*n]]){const r=both(`${op} ${m} ${n}`,st);eq(K.lamReadback(r.a.term).num,val,`${op} ${m} ${n}`);eq(dbNum(r.b.t),val);}
  if(m>=1&&n>=1&&m**n<=64){const r=both(`POW ${m} ${n}`,st);eq(K.lamReadback(r.a.term).num,m**n,`POW ${m} ${n}`);}
}
for(let n=0;n<=8;n++)for(const st of['normal','applicative']){eq(K.lamReadback(both(`PRED ${n}`,st).a.term).num,Math.max(0,n-1));eq(K.lamReadback(both(`SUCC ${n}`,st).a.term).num,n+1);eq(!!K.lamReadback(both(`ISZERO ${n}`,st).a.term).bool,n===0);}
const B=['FALSE','TRUE'];
for(const p of[0,1])for(const q of[0,1]){eq(!!K.lamReadback(both(`AND ${B[p]} ${B[q]}`,'normal').a.term).bool,!!(p&&q));eq(!!K.lamReadback(both(`OR ${B[p]} ${B[q]}`,'applicative').a.term).bool,!!(p||q));eq(K.lamShow(both(`IF ${B[p]} u w`,'normal').a.term),p?'u':'w');}
eq(!!K.lamReadback(both('NOT TRUE','normal').a.term).bool,false);eq(K.lamReadback(both('NOT FALSE','normal').a.term).bool,true);
eq(K.lamShow(both('FST (PAIR u w)','normal').a.term),'u');eq(K.lamShow(both('SND (PAIR u w)','applicative').a.term),'w');
// Y ile faktöriyel: normal sıra biter, uygulamalı sıra bitmez.
{const fact=[1,1,2,6,24];for(let n=0;n<=4;n++){const r=both(`FACT ${n}`,'normal',20000);eq(r.a.status,'normal');eq(K.lamReadback(r.a.term).num,fact[n]);eq(dbNum(r.b.t),fact[n]);}
  eq(K.lamNormalize(K.lamParse('FACT 3',lib.defs),'normal',20000).steps,694);
  const a=both('FACT 3','applicative',400);eq(a.a.status,'limit');ok(a.a.term.size>K.lamParse('FACT 3',lib.defs).size);
  eq(K.lamNormalize(K.lamParse('Y',lib.defs),'applicative',300).status,'limit');eq(K.lamNormalize(K.lamParse('Y',lib.defs),'normal',300).status,'limit');}
// Ω ve atılan argüman.
{const o=K.lamParse('(λx.x x) (λx.x x)');const r=K.lamStep(o,'normal');ok(K.lamAlphaEq(r.term,o),'Ω bir adımda kendine döner');
  eq(both('OMEGA','normal',500).a.status,'limit');eq(both('OMEGA','applicative',500).a.status,'limit');
  const n=both('(λx.y) OMEGA','normal',500);eq([n.a.status,n.a.steps,K.lamShow(n.a.term)],['normal',1,'y']);eq(both('(λx.y) OMEGA','applicative',500).a.status,'limit');}
// Yakalanmadan kaçınma.
{const r=K.lamStep(K.lamParse('(λx y.x y) y'),'normal');eq(r.renames.length,1);eq(r.renames[0][0],'y');ok(K.lamAlphaEq(r.term,K.lamParse('λz.y z')));ok(!K.lamAlphaEq(r.term,K.lamParse('λy.y y')));
  eq(K.lamStep(K.lamParse('(λx y.x y) w'),'normal').renames.length,0);
  ok(K.lamAlphaEq(K.lamParse('λx.λy.x y'),K.lamParse('λa.λb.a b')));ok(!K.lamAlphaEq(K.lamParse('λx.λy.x y'),K.lamParse('λa.λb.b a')));ok(!K.lamAlphaEq(K.lamParse('λx.y'),K.lamParse('λx.z')));}
// Rastgele terimler: iki indirgeyici, iki sırada, aynı adım sayısı ve aynı normal biçim; Church–Rosser.
{let seed=20261111;const rnd=n=>{seed=(Math.imul(seed,1664525)+1013904223)>>>0;return seed%n;};const vars=['x','y','z','a'];
  const gen=d=>{const k=d<=0?0:rnd(5);if(k===0)return vars[rnd(4)];if(k<=2)return'(λ'+vars[rnd(3)]+'.'+gen(d-1)+')';return'('+gen(d-1)+' '+gen(d-1)+')';};
  let terminated=0,renamed=0,cr=0;
  for(let i=0;i<1500;i++){const src=gen(5),n=both(src,'normal',150),a=both(src,'applicative',150);if(n.a.status==='normal')terminated++;renamed+=n.a.renames;
    if(n.a.status==='normal'&&a.a.status==='normal'){ok(K.lamAlphaEq(n.a.term,a.a.term),'Church–Rosser '+src);cr++;}
    if(a.a.status==='normal')eq(n.a.status,'normal','uygulamalı sıra bittiyse normal sıra da biter: '+src);}
  ok(terminated>800&&renamed>20&&cr>800,'rastgele örneklem yeterince zengin olmalı: '+[terminated,renamed,cr]);}
// Okuma, yazdırma, ayrıştırma hataları.
eq(K.lamReadback(K.church(7)).num,7);eq(K.lamReadback(K.lamParse('λa b.a')).bool,true);eq(K.lamReadback(K.lamParse('λx.x')),null);eq(K.lamReadback(K.lamParse('λf x.x f')),null);
eq(K.lamShow(K.lamParse('PLUS 2 3',lib.defs)),'PLUS 2 3');eq(K.lamShow(K.lamParse('\\x y.x',lib.defs)),'λx y.x');
ok(K.lamShow(K.lamParse('PLUS 2 3',lib.defs),{html:true,path:K.lamRedexPath(K.lamParse('PLUS 2 3',lib.defs))}).includes('<mark class="rx"><span class="rx-f">(λm n f x.m f (n f x))</span> <span class="rx-a">2</span></mark>'));
for(const src of['','(λx.x','λ.x','λx x','x)','FOO 1','x $ y','65','λX.X']){assert.throws(()=>K.lamParse(src,lib.defs),e=>e.name==='SyntaxError'&&typeof e.pos==='number',src);checks++;}
eq(K.lamParseDefs('A = λx.x\nA = λy.y').errors.length,1);eq(K.lamParseDefs('F = F 1').errors.length,1);eq(K.lamParseDefs('G = λx.y').errors.length,1);eq(K.lamParseDefs('küçük = λx.x').errors.length,1);
// Adım yolu ile gerçek adım aynı redeksi gösterir.
for(const st of['normal','applicative']){let t=K.lamParse('MULT 2 (PLUS 1 2)',lib.defs);for(let i=0;i<40;i++){const p=K.lamRedexPath(t,st),r=K.lamStep(t,st);if(!r){eq(p,null);break;}eq(r.path,p);t=r.term;}eq(K.lamReadback(t).num,6);}
ok(Object.isFrozen(K));
console.log(`G hesaplama-teorisi: ${checks.toLocaleString('tr-TR')} bağımsız çekirdek denetimi PASS (yayımlanmış S/Σ, ikinci yürütücü, kaba kuvvet, de Bruijn indirgeyici)`);

if(process.argv.includes('--browser')){
  const{createRequire}=await import('node:module');const{createServer}=await import('node:http');const{join,extname}=await import('node:path');const{fileURLToPath}=await import('node:url');
  const root=fileURLToPath(new URL('../',import.meta.url));let chromium;
  for(const dir of[root,...(process.env.NODE_PATH||'').split(':').filter(Boolean),'/opt/node-tools']){try{({chromium}=createRequire(join(dir,'package.json'))('playwright'));break;}catch{}}
  const server=createServer((req,res)=>{const file=join(root,decodeURIComponent(new URL(req.url,'http://localhost').pathname));if(!fs.existsSync(file)||fs.statSync(file).isDirectory()){res.writeHead(404).end();return;}res.setHeader('Content-Type',({'.html':'text/html; charset=utf-8','.js':'text/javascript; charset=utf-8','.css':'text/css; charset=utf-8'})[extname(file)]||'application/octet-stream');res.end(fs.readFileSync(file));});
  await new Promise(r=>server.listen(0,'127.0.0.1',r));let browser;const before=checks;
  try{browser=await chromium.launch();
    for(const[width,theme]of[[390,'light'],[1280,'dark']]){
      const ctx=await browser.newContext({viewport:{width,height:900},deviceScaleFactor:width<500?2:1});const page=await ctx.newPage();
      await page.addInitScript(t=>{localStorage.setItem('acelya-theme',t);localStorage.setItem('acelya-sound-muted','1');},theme);page.setDefaultTimeout(8000);
      const errors=[];page.on('pageerror',e=>errors.push(e.message));page.on('console',m=>{if(m.type()==='error')errors.push(m.text());});
      await page.goto(`http://127.0.0.1:${server.address().port}/hesaplama-teorisi.html`);
      const click=id=>page.locator('#'+id).click(),read=id=>page.locator('#'+id).textContent(),has=async(id,t)=>{const v=await read(id);assert(v.includes(t),`${id}: "${v}" içinde "${t}" yok`);checks++;};
      const sel=(id,v)=>page.locator('#'+id).selectOption(v),fill=(id,v)=>page.locator('#'+id).fill(v),noflow=async w=>{eq(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),true,'yatay taşma: '+w);};
      const range=(id,v)=>page.locator('#'+id).evaluate((e,v)=>{e.value=v;e.dispatchEvent(new Event('input',{bubbles:true}));},v);
      // Her denetimin etiketi var.
      eq(await page.evaluate(()=>[...document.querySelectorAll('main input,main select,main textarea')].filter(e=>!(e.labels&&e.labels.length)&&!e.getAttribute('aria-label')).map(e=>e.id)),[]);
      eq(await page.evaluate(()=>[...document.querySelectorAll('main canvas')].every(c=>c.getAttribute('role')==='img'&&c.getAttribute('aria-label'))),true);
      // 01 · Turing makinesi
      await has('tmSteps','0');await has('tmExpect','kabul');await has('tmStatus','Hazır');await has('scT','561 adım');await has('scTheory','561');await has('scDiff','0 adım');await has('scExp','1,874');await has('scExpT','1,874');await has('scOrder','2');
      await click('tmStepBtn');await has('tmSteps','1');await click('tmFastBtn');await has('tmSteps','15');await has('tmResult','kabul');await has('tmResult','uyuşuyor');eq(await page.locator('#tmStepBtn').isDisabled(),true);
      await fill('tmInput','0100');await has('tmSteps','0');await click('tmFastBtn');await has('tmResult','ret');await has('tmResult','uyuşuyor');
      await fill('tmInput','01x');await has('tmStatus','tabloda geçmeyen simge');await has('tmSteps','—');eq(await page.locator('#tmRunBtn').isDisabled(),true);
      await fill('tmInput','0110');await fill('tmTable','bas 0 -> _ R\nbas 0 -> 1 Q bas');await has('tmMsg','1. satır');await has('tmStatus','hata var');await has('scStatus','geçersiz');eq(await page.locator('#tmFastBtn').isDisabled(),true);
      await click('tmRestore');await has('tmMsg','Tablo geçerli: 6 durum');
      for(const[id,steps,ones]of[['bb2','6','4'],['bb3s','21','5'],['bb3o','14','6'],['bb4','107','13']]){await sel('tmPreset',id);await click('tmFastBtn');await has('tmSteps',steps);await has('tmOnes',ones);await has('tmResult','uyuşuyor');await has('tmStatus','Durdu');}
      await has('tmCells','14');await has('scStatus','boş banttan başlar');
      await sel('tmPreset','bb5');eq(await page.locator('#tmLimit').inputValue(),'100000000');await click('tmFastBtn');await page.waitForFunction(()=>document.getElementById('tmResult').textContent.includes('uyuşuyor'),null,{timeout:60000});await has('tmSteps','47.176.870');await has('tmOnes','4.098');await has('tmCells','12.289');
      await sel('tmPreset','loop');await sel('tmLimit','1000');await click('tmFastBtn');await has('tmStatus','1.000 adımda durmadı — bu, hiç durmayacağını kanıtlamaz');await has('tmStatus','hiçbir girdide duramaz');await has('tmResult','sınırda durmadı');
      await sel('tmPreset','bb4');await sel('tmLimit','1000');await range('tmSpeed','8');await page.locator('#tab-tm').focus();await page.locator('h1').click();await page.keyboard.press('Space');await page.waitForFunction(()=>document.getElementById('tmSteps').textContent==='107',null,{timeout:15000});await has('tmResult','uyuşuyor');
      await sel('tmPreset','unary');await fill('tmInput','111');await click('tmFastBtn');await has('tmResult','kural yok');await has('tmStatus','Takıldı');await has('tmExpect','tanımsız');
      await fill('tmInput','11+111');await click('tmFastBtn');await has('tmResult','11111');await has('tmResult','uyuşuyor');
      await sel('tmPreset','increment');await fill('tmInput','1111');await click('tmFastBtn');await has('tmResult','10000');await has('tmSteps','10');
      await sel('tmPreset','anbn');await has('scTheory','n²/2 + n + 1');await has('scT','545');await sel('scaleFamily','1');await has('scT','33 adım');await has('scOrder','1');await range('scaleN','64');await has('scT','65 adım');
      await sel('tmPreset','palindrome');await range('scaleN','64');await has('scT','2.145 adım');await sel('scaleFamily','1');await has('scT','66 adım');
      await fill('tmTable',(await page.locator('#tmTable').inputValue()).replace('bak0 1 -> 1 N ret','bak0 1 -> _ L don'));await has('tmExpect','tablo düzenlendi');await has('scTheory','tablo düzenlendi');await fill('tmInput','01');await click('tmFastBtn');await has('tmResult','UYUŞMUYOR');
      await page.locator('h1').click();await page.keyboard.press('r');await has('tmExpect','kabul (tersinden aynı)');await has('scT','561 adım');eq(await page.locator('#tmInput').inputValue(),'0110');await noflow('tm');
      // 02 · Lambda hesabı
      await click('tab-lam');await has('lamExpect','2 + 3 = 5');await has('lamCmpRows','normal biçim = 5');await has('lamCmpNote','Church–Rosser');
      await click('lamStepBtn');await has('lamSteps','1');eq(await page.locator('#lamTrace mark.rx').count()>=1,true);await click('lamFinishBtn');await has('lamSteps','6');await has('lamValue','= 5');await has('lamMatch','uyuşuyor');
      for(const[i,val,steps]of[['1','= 6','7'],['2','= 8','16'],['3','= 2','11'],['4','FALSE','4'],['5','b','5'],['8','y','1']]){await sel('lamPreset',i);await click('lamFinishBtn');await has('lamValue',val);await has('lamSteps',steps);await has('lamMatch','uyuşuyor');}
      await sel('lamPreset','2');await click('lamFinishBtn');await has('lamAlpha','7');await sel('lamPreset','9');await click('lamStepBtn');await has('lamTrace','α-yeniden adlandırma: y → y1');await has('lamMatch','uyuşuyor');
      await sel('lamPreset','6');await has('lamCmpRows','694');await has('lamCmpRows','sınırda bitmedi');await click('lamFinishBtn');await has('lamSteps','694');await has('lamValue','= 6');await has('lamMatch','uyuşuyor');
      // uygulamalı sırada derin terim: "Sona kadar" 5.000 adımda sayfayı kilitlememeli (eskiden adım başına derinliğin karesi kadar iş yapıyordu)
      await sel('lamStrategy','applicative');await sel('lamLimit','5000');await click('lamFinishBtn');await has('lamSteps','5.000');await has('lamSize','10.089');await has('lamStatus','normal biçimin olmadığını kanıtlamaz');await sel('lamLimit','1000');await sel('lamStrategy','normal');
      await sel('lamStrategy','applicative');await click('lamFinishBtn');await has('lamSteps','1.000');await has('lamStatus','kanıtlamaz');await has('lamMatch','öbür sırayı dene');
      await sel('lamPreset','7');await sel('lamStrategy','normal');await click('lamStepBtn');await has('lamStatus','Döngü kanıtlandı');await has('lamStatus','normal biçimi yoktur');await has('lamMatch','uyuşuyor');eq(await page.locator('#lamStepBtn').isDisabled(),true);
      await sel('lamPreset','8');await sel('lamStrategy','applicative');await click('lamStepBtn');await has('lamStatus','Döngü kanıtlandı');await has('lamCmpNote','hiç dokunmadan');
      await fill('lamTerm','(λx.x');await has('lamMsg','Kapanmayan parantez');await has('lamStatus','Terim okunamadı');await has('lamSteps','—');eq(await page.locator('#lamRunBtn').isDisabled(),true);
      await fill('lamTerm','MULT 3 (SUCC 3)');await sel('lamStrategy','normal');await page.waitForFunction(()=>document.getElementById('lamCmpRows').textContent.includes('= 12'));await has('lamExpect','özel terim');
      await range('lamSpeed','5');await page.locator('h1').click();await page.keyboard.press('Space');await page.waitForFunction(()=>document.getElementById('lamValue').textContent.includes('= 12'),null,{timeout:15000});
      await page.locator('#lamFold').uncheck();eq((await read('lamTrace')).includes('SUCC'),false);await page.locator('#lamFold').check();await has('lamTrace','(SUCC 3)');
      await page.locator('.ht-lib summary').click();await fill('lamDefs','TWICE = λf x.f (f x)\nBAD = λx.q');await has('lamDefsMsg','2. satır');await fill('lamTerm','TWICE TWICE g u');await click('lamFinishBtn');await has('lamValue','g (g (g (g u)))');
      await click('lamReset');await has('lamExpect','2 + 3 = 5');await has('lamDefsMsg','19 makro');await has('lamSteps','0');await noflow('lam');
      // 03 · Çözülemezlik
      await click('tab-und');eq(await page.locator('#dgBody tr').count(),8);eq(await page.locator('#dgBody td.is-diag').count(),8);await has('dgStatus','D ≠ M₀');
      const counts=async()=>(await Promise.all(['dgHalt','dgLoop','dgUnknown'].map(read))).map(t=>+t.split(' / ')[0]);
      {const c=await counts();eq(c[0]+c[1]+c[2],64);ok(c[2]>0&&c[0]>0);const marks=await page.locator('#dgBody td').allTextContents();eq(marks.filter(m=>m==='?').length,c[2]);
        const diag=await page.locator('#dgBody td.is-diag').allTextContents(),foot=await page.locator('#dgFoot td').allTextContents();eq(foot,diag.map(m=>m==='D'?'S':m==='S'?'D':'?'));
        await has('dgDiag',diag.filter(m=>m!=='?').length+' / 8');
        const k=diag.indexOf('?');if(k>=0){await page.locator(`#dgBody button[data-row="${k}"]`).click();await has('dgStatus','bilinmiyor');}}
      await sel('dgBudget','2');{const a=(await counts())[2];await sel('dgBudget','20');const m=(await counts())[2];await sel('dgBudget','2000');const b=(await counts())[2];ok(m<a&&b<=m,'bütçe artınca bilinmeyen sayısı azalmalı, hiç artmamalı: '+[a,m,b]);eq(b,23);}
      await range('dgN','12');eq(await page.locator('#dgBody tr').count(),12);eq((await counts()).reduce((a,b)=>a+b),144);await range('dgN','6');eq(await page.locator('#dgHead th').count(),7);
      await fill('dgSeed','abc');eq(await page.locator('#dgBody tr').count(),6);await fill('dgSeed','999');await click('dgNew');eq(await page.locator('#dgSeed').inputValue(),'0');
      await click('hpNext');await click('hpNext');await click('hpNext');eq(await page.locator('#hpNext').isDisabled(),true);await click('hpYes');await has('hpStatus','D(⟨D⟩) durmaz');await click('hpNo');await has('hpStatus','D(⟨D⟩) durur');await click('hpNext');eq(await page.locator('#hpSteps li:not([hidden])').count(),5);eq(await page.locator('#hpNext').isDisabled(),true);
      await has('bbRows','107');await has('bbStatus','4 makinede doğru, 2 makinede yanlış');await sel('hbBudget','10');await has('bbStatus','2 makinede doğru, 4 makinede yanlış');await sel('hbBudget','1000000');await has('bbStatus','5 makinede doğru, 1 makinede yanlış');
      if(width===1280){await click('bb5Run');await page.waitForFunction(()=>document.getElementById('bbStatus').textContent.includes('ölçüldü'),null,{timeout:60000});await has('bbStatus','47.176.870 adım, 4.098 bir, 12.289 hücre');eq((await read('bbRows')).includes('çalıştırılmadı'),false);}
      await page.locator('#mapZones button[data-problem="TOT"]').click();await has('mapDetail','Tümlük');await has('mapDetail','Ona indirgenenler');eq(await page.locator('#mapArrows tr').count(),11);
      await sel('redA','HALT');await sel('redB','ADFA');await has('redVerdict','olamaz');await sel('redA','ADFA');await sel('redB','HALT');await has('redVerdict','hiçbir şey kanıtlamaz');await sel('redA','HALT');await sel('redB','PCP');await has('redVerdict','engel değil');await sel('redB','H10');await has('redVerdict','Bilinen indirgeme');await sel('redB','NHALT');await has('redVerdict','olamaz');await sel('redA','NHALT');await sel('redB','TOT');await has('redVerdict','tanınamaz');await sel('redA','TOT');await sel('redB','HALT');await has('redVerdict','olamaz');
      await click('undReset');eq(await page.locator('#dgBody tr').count(),8);eq(await page.locator('#dgSeed').inputValue(),'7');await has('hpStatus','Adım 1 / 5');await noflow('und');
      await page.locator('#dgBody button[data-row="1"]').click();await click('dgOpen');eq(await page.locator('#tab-tm').getAttribute('aria-selected'),'true');eq(await page.locator('#tmPreset').inputValue(),'custom');await has('tmMsg','Tablo geçerli');eq(await page.locator('#tmInput').inputValue(),'0');await click('tmFastBtn');await has('tmExpect','özel makine');
      // Klavye: sekmeler
      await page.locator('#tab-tm').focus();await page.keyboard.press('End');eq(await page.locator('#tab-und').getAttribute('aria-selected'),'true');await page.keyboard.press('Home');eq(await page.locator('#tab-tm').getAttribute('aria-selected'),'true');await page.keyboard.press('ArrowRight');eq(await page.locator('#tab-lam').getAttribute('aria-selected'),'true');await page.keyboard.press('ArrowLeft');eq(await page.locator('#panel-lam').isHidden(),true);
      eq(await page.evaluate(()=>Object.isFrozen(ComputeLab)&&!Object.getOwnPropertyDescriptor(window,'ComputeLab').writable),true);await noflow('son');
      assert.deepEqual(errors,[]);checks++;await ctx.close();
    }
    console.log(`G hesaplama-teorisi: ${checks-before} tarayıcı denetimi PASS (390 px açık + 1280 px koyu; üç sekme, hazırlar, sınırlar, klavye, taşma, etiketler)`);
  }finally{await browser?.close();await new Promise(r=>server.close(r));}
}
