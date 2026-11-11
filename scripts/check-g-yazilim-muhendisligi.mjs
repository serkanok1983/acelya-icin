// G · yazilim-muhendisligi.html kalıcı denetimi.
// Çekirdek (KERNEL-BEGIN/END) node'da yüklenir; başvurular sayfanın formüllerini yeniden kullanmaz:
// geçişli kapanış matrisi (Git), elle araçlanmış yerel işlev ve JS motorunda derlenen mutant kaynakları (test),
// yoğunlukların sayısal integrali ve ayrı bir integratör (tahmin), doğum-ölüm ve CTMC durağan çözümü (kanban).
// Kullanım: node scripts/check-g-yazilim-muhendisligi.mjs [--browser]
import fs from 'node:fs';
import vm from 'node:vm';
import assert from 'node:assert/strict';
const html=fs.readFileSync(new URL('../yazilim-muhendisligi.html',import.meta.url),'utf8');
const source=html.split('/* KERNEL-BEGIN */')[1]?.split('/* KERNEL-END */')[0];
assert(source,'KERNEL sınırları gerekli');
const context={window:{}};vm.createContext(context);vm.runInContext(source,context);
const K=context.window.SoftEngLab;let checks=0;
const ok=(c,m)=>{assert(c,m);checks++;},plain=v=>v!==null&&typeof v==='object'?JSON.parse(JSON.stringify(v)):v,eq=(a,b,m)=>{assert.deepStrictEqual(plain(a),plain(b),m||"eşitlik");checks++;};
const near=(a,b,tol,m)=>{assert(Math.abs(a-b)<=tol*Math.max(1,Math.abs(b)),`${m||''} ${a} ≠ ${b} (tol ${tol})`);checks++;};
const lcg=seed=>{let s=seed>>>0;return()=>{s=(Math.imul(s,1664525)+1013904223)>>>0;return s/4294967296;};};
ok(Object.isFrozen(K)&&Object.isFrozen(K.git)&&Object.isFrozen(K.test)&&Object.isFrozen(K.plan)&&Object.isFrozen(K.flow),'API dondurulmuş olmalı');

/* ── 1. Git: bağımsız geçişli kapanış ── */
const G=K.git;
function closure(st){const n=st.order.length,idx=Object.fromEntries(st.order.map((id,i)=>[id,i])),R=Array.from({length:n},(_,i)=>{const r=new Uint8Array(n);r[i]=1;return r;});
  for(const id of st.order)for(const p of st.commits[id].parents){ok(idx[p]<idx[id],'ebeveyn çocuktan önce');R[idx[id]][idx[p]]=1;}
  for(let k=0;k<n;k++)for(let i=0;i<n;i++)if(R[i][k])for(let j=0;j<n;j++)if(R[k][j])R[i][j]=1;
  return{R,idx,n};}
function refAB(c,a,b){let ahead=0,behind=0;for(let j=0;j<c.n;j++){if(c.R[c.idx[a]][j]&&!c.R[c.idx[b]][j])ahead++;if(c.R[c.idx[b]][j]&&!c.R[c.idx[a]][j])behind++;}return{ahead,behind};}
function refBases(st,c,a,b){const common=[];for(let j=0;j<c.n;j++)if(c.R[c.idx[a]][j]&&c.R[c.idx[b]][j])common.push(j);return common.filter(j=>!common.some(d=>d!==j&&c.R[d][j])).map(j=>st.order[j]).sort();}
const diff3=(b,u,v)=>u===b?v:v===b?u:u===v?u:null;
let seenKinds=new Set(),multiBase=0;
for(let seed=1;seed<=140;seed++){const rnd=lcg(seed*7919);let st=G.init();
  for(let step=0;step<34;step++){const names=Object.keys(st.branches),others=names.filter(b=>b!==st.head),pick=()=>others[Math.floor(rnd()*others.length)],x=rnd(),before=st;let r;
    if(x<.36)r=G.commit(st,Math.floor(rnd()*4));
    else if(x<.46)r=G.branch(st);
    else if(x<.62&&others.length)r=G.switchTo(st,pick());
    else if(x<.80&&others.length){const o=pick(),pv=G.mergePreview(st,o),res=[null,'ours','theirs'][Math.floor(rnd()*3)],c0=closure(st),T=st.branches[st.head],O=st.branches[o];
      const kind=c0.R[c0.idx[T]][c0.idx[O]]?'uptodate':c0.R[c0.idx[O]][c0.idx[T]]?'ff':null,bases=refBases(st,c0,T,O);
      eq(pv.bases.slice().sort(),bases,'birleştirme tabanları');ok(bases.includes(pv.base),'seçilen taban en iyi adaylardan');if(bases.length>1)multiBase++;
      if(kind)eq(pv.kind,kind,'ff/güncel sınıfı');
      const bt=st.commits[pv.base].tree,tt=st.commits[T].tree,ot=st.commits[O].tree,want=bt.map((b,i)=>diff3(b,tt[i],ot[i]));
      eq(pv.rows.map(q=>q.result),want,'satır satır üç yollu sonuç');eq(pv.conflicts,want.map((v,i)=>v===null?i:-1).filter(i=>i>=0));
      r=G.merge(st,o,res);seenKinds.add('merge:'+r.kind);
      if(r.kind==='ff'){eq(r.state.branches[st.head],O);eq(r.state.order.length,st.order.length,'ileri sarma commit üretmez');}
      if(r.kind==='three'||r.kind==='resolved'){const m=r.state.commits[r.id];eq([...m.parents],[T,O],'iki ebeveyn');eq([...m.tree],want.map((v,i)=>v!==null?v:res==='ours'?tt[i]:ot[i]));}
      if(r.kind==='conflict'){ok(r.state===st,'çakışmada depo değişmez');ok(res===null);}
      if(r.kind==='uptodate')ok(r.state===st);}
    else if(x<.92&&others.length){const o=pick(),T=st.branches[st.head],O=st.branches[o],pv=G.mergePreview(st,o);r=G.rebase(st,o);seenKinds.add('rebase:'+r.kind);
      if(r.kind==='replayed'){const tip=r.state.branches[st.head],c1=closure(r.state);ok(c1.R[c1.idx[tip]][c1.idx[O]],'yeni uç hedefin torunu');
        for(const[oldId,newId]of r.map)if(newId){ok(oldId!==newId,'yeni kimlik');eq(r.state.commits[newId].msg,st.commits[oldId].msg,'aynı ileti');ok(!(newId in st.commits),'gerçekten yeni commit');
          const oc=st.commits[oldId],op=st.commits[oc.parents[0]],nc=r.state.commits[newId],np=r.state.commits[nc.parents[0]];
          eq(nc.tree.map((v,i)=>v!==np.tree[i]?i+':'+v:'').filter(Boolean).every(q=>oc.tree.map((v,i)=>v!==op.tree[i]?i+':'+v:'').includes(q)),true,'aynı yama');}
        if(pv.kind==='three')eq([...r.state.commits[tip].tree],pv.rows.map(q=>q.result),'rebase ile merge aynı içeriğe varır');
        eq(refAB(c1,tip,O).behind,0,'rebase sonrası geride 0');}
      if(r.kind==='conflict'||r.kind==='hasmerge')ok(r.state===st);}
    else{const t=st.commits[st.branches[st.head]];r=G.revert(st);seenKinds.add('revert:'+r.kind);
      if(r.ok){eq([...r.state.commits[r.id].tree],[...st.commits[t.parents[0]].tree],'revert ebeveynin içeriğine döner');eq([...r.state.commits[r.id].parents],[t.id]);eq(r.state.order.length,st.order.length+1);}
      else ok(t.parents.length!==1||st.order.length>=G.MAX);}
    if(!r)continue;st=r.state;ok(before.order.every((id,i)=>st.order[i]===id&&st.commits[id]===before.commits[id]),'eski commit\'ler değişmez');ok(st.order.length<=G.MAX);eq(new Set(st.order).size,st.order.length);
    const c=closure(st),tips=Object.values(st.branches);
    for(const a of tips)for(const b of tips){const want=refAB(c,a,b);eq(G.aheadBehind(st,a,b),want,'boyalı yürüyüş');eq(G.aheadBehindSets(st,a,b),want,'küme farkı');}
    let reach=0;for(let j=0;j<c.n;j++)if(tips.some(t=>c.R[c.idx[t]][j]))reach++;eq(G.reachable(st).size,reach);
    for(const t of tips){let cnt=0;for(let j=0;j<c.n;j++)cnt+=c.R[c.idx[t]][j];eq(G.ancestors(st,t).size,cnt);}}}
for(const k of['merge:ff','merge:three','merge:resolved','merge:conflict','merge:uptodate','rebase:replayed','rebase:ff','rebase:uptodate','rebase:conflict','rebase:hasmerge','revert:reverted','revert:merge'])ok(seenKinds.has(k),'rastgele geçmişlerde görülmeli: '+k);
{ // çapraz birleştirme: iki en iyi ortak ata
  let st=G.init();st=G.branch(st).state;st=G.branch(st).state;st=G.commit(st,0).state;const B1=st.branches['düzeltme'];st=G.switchTo(st,'main').state;st=G.commit(st,1).state;const A1=st.branches.main;
  st=G.switchTo(st,'özellik').state;eq(G.merge(st,'main').kind,'ff');st=G.merge(st,'main').state;st=G.merge(st,'düzeltme').state;st=G.switchTo(st,'düzeltme').state;st=G.merge(st,'main').state;
  const c=closure(st),bs=G.mergeBases(st,st.branches['özellik'],st.branches['düzeltme']);eq(bs.slice().sort(),[A1,B1].sort(),'iki taban');eq(bs.slice().sort(),refBases(st,c,st.branches['özellik'],st.branches['düzeltme']));eq(G.aheadBehind(st,st.branches['özellik'],st.branches['düzeltme']),{ahead:1,behind:1});multiBase++;}
ok(multiBase>0);
{ // sabit senaryolar: sayfadaki hazır düzenler
  const build=steps=>{let st=G.init();for(const[op,a]of steps)st=(op==='c'?G.commit(st,a):op==='b'?G.branch(st):G.switchTo(st,a)).state;return st;};
  const def=build([['c',0],['b'],['c',1],['s','main'],['c',2]]);eq(def.head,'main');eq(G.mergePreview(def,'özellik').kind,'three');eq(G.aheadBehind(def,def.branches.main,def.branches['özellik']),{ahead:1,behind:1});eq(G.mergePreview(def,'özellik').base,def.order[1]);
  const m=G.merge(def,'özellik');eq(m.kind,'three');eq([...m.state.commits[m.id].tree],['main·1','özellik·2','main·3','taban']);eq(G.aheadBehind(m.state,m.state.branches.main,m.state.branches['özellik']),{ahead:2,behind:0});
  const ff=build([['c',0],['b'],['c',1],['c',2],['s','main']]),f=G.merge(ff,'özellik');eq(f.kind,'ff');eq(f.state.order.length,4);eq(f.state.branches.main,ff.branches['özellik']);
  const cf=build([['c',0],['b'],['c',1],['c',3],['s','main'],['c',1]]),c1=G.merge(cf,'özellik',null);eq(c1.kind,'conflict');eq(c1.conflicts,[1]);
  eq(G.merge(cf,'özellik','ours').state.commits[G.merge(cf,'özellik','ours').id].tree[1],'main·4');eq(G.merge(cf,'özellik','theirs').state.commits[G.merge(cf,'özellik','theirs').id].tree[1],'özellik·2');
  const rb=build([['c',0],['b'],['c',1],['c',2],['s','main'],['c',3],['s','özellik']]),r=G.rebase(rb,'main');eq(r.kind,'replayed');eq(r.map.length,2);eq(r.state.order.length,7);eq(G.reachable(r.state).size,5);
  eq([...r.state.commits[r.state.branches['özellik']].tree],['main·1','özellik·2','özellik·3','main·4']);eq(G.merge(G.switchTo(r.state,'main').state,'özellik').kind,'ff','rebase sonrası birleştirme ileri sarar');
  eq(G.revert(G.init()).kind,'root');let full=G.init();for(let i=0;i<30;i++)full=G.commit(full,i%4).state;eq(full.order.length,G.MAX);eq(G.commit(full,0).kind,'full');
  let b=G.init();for(let i=0;i<3;i++)b=G.branch(b).state;eq(G.branch(b).kind,'nobranch');eq(Object.keys(b.branches),['main','özellik','düzeltme','deneme']);
  eq(build([['c',0]]).order,build([['c',0]]).order,'kimlikler belirlenimci');assert.throws(()=>G.commit(G.init(),4));checks++;
}

/* ── 2. Test: yerel başvuru işlevi, elle araçlama, motor tarafından derlenen mutantlar ── */
const T=K.test;
function refTri(a,b,c){if(Math.min(a,b,c)<=0)return'geçersiz';const s=[a,b,c].sort((x,y)=>x-y);if(s[0]+s[1]<=s[2])return'üçgen değil';const d=new Set(s).size;return d===1?'eşkenar':d===2?'ikizkenar':'çeşitkenar';}
for(const t of T.TESTS)eq(t.expect,refTri(...t.args),'beklenen değer bağımsız tanımla uyuşmalı');
const prog=T.program();const dom=[];for(let a=-2;a<=7;a++)for(let b=-2;b<=7;b++)for(let c=-2;c<=7;c++)dom.push([a,b,c]);
for(const d of dom)eq(T.run(prog,d),refTri(...d));
const compile=p=>new Function('return '+T.source(p).join('\n'))();
const native=compile(prog);for(const d of dom)eq(native(...d),refTri(...d),'üretilen kaynak da aynı işlev');
function handCount(tests){const s=Array(9).fill(0),br=Array(8).fill(0),cd=Array(22).fill(0),C=(k,v)=>{cd[2*k+(v?0:1)]++;return v;};
  for(const[a,b,c]of tests){s[0]++;if(C(0,a<=0)||C(1,b<=0)||C(2,c<=0)){br[0]++;s[1]++;continue;}br[1]++;
    s[2]++;if(C(3,a+b<=c)||C(4,a+c<=b)||C(5,b+c<=a)){br[2]++;s[3]++;continue;}br[3]++;
    s[4]++;if(C(6,a===b)&&C(7,b===c)){br[4]++;s[5]++;continue;}br[5]++;
    s[6]++;if(C(8,a===b)||C(9,b===c)||C(10,a===c)){br[6]++;s[7]++;continue;}br[7]++;s[8]++;}
  return{s,br,cd};}
const muts=T.mutants(prog),natives=muts.map(m=>compile(m.prog)),origSrc=T.source(prog);
eq(muts.length,37);
muts.forEach((m,i)=>{const src=T.source(m.prog),diff=src.map((l,j)=>l!==origSrc[j]?j+1:0).filter(Boolean);eq(diff,[m.line],'mutant tek satırı değiştirir');eq(m.id,i+1);
  ok(dom.some(d=>natives[i](...d)!==native(...d)),'eşdeğer mutant yok: '+m.desc);for(const d of dom.filter((_,j)=>j%37===i%37))eq(T.run(m.prog,d),natives[i](...d),'yorumlayıcı = motor');});
const rnd2=lcg(4242),subsets=[[1,2,3,4,5],[],[1,2,3,4,5,8,9,10],T.TESTS.map(t=>t.id)];for(let i=0;i<40;i++)subsets.push(T.TESTS.map(t=>t.id).filter(()=>rnd2()<.45));
const tri=new Set(['eşkenar','ikizkenar','çeşitkenar']);
for(const sel of subsets)for(const oracle of['tam','kaba','yok']){const a=T.analyze(sel,oracle),tests=T.TESTS.filter(t=>sel.includes(t.id)),h=handCount(tests.map(t=>t.args));
  eq(a.stmtHits,h.s,'deyim sayaçları');eq(a.branchHits,h.br,'dal sayaçları');eq(a.condHits,h.cd,'koşul sayaçları');eq(a.stmt.hit,h.s.filter(Boolean).length);eq(a.branch.hit,h.br.filter(Boolean).length);eq(a.cond.hit,h.cd.filter(Boolean).length);
  const pass=(out,exp)=>oracle==='yok'?true:oracle==='kaba'?tri.has(out)===tri.has(exp):out===exp;let killed=0;
  natives.forEach((f,i)=>{const kills=tests.map(t=>!pass(f(...t.args),t.expect));eq(a.mutants[i].kills,kills,'öldürme matrisi');const first=kills.indexOf(true);eq(a.mutants[i].killedBy,first<0?null:tests[first].id);if(first>=0)killed++;});
  eq(a.killed,killed);near(a.score,killed/37,1e-12);ok(a.results.every(r=>r.pass),'özgün kod bütün testleri geçer');}
{const d=T.analyze([1,2,3,4,5],'tam');eq([d.stmt.hit,d.branch.hit,d.cond.hit,d.killed],[9,8,16,29]);eq(T.analyze([1,2,3,4,5],'yok').killed,0);eq(T.analyze([1,2,3,4,5],'kaba').killed,12);eq(T.analyze([1,2,3,4,5,8,9,10],'tam').killed,32);
 const all=T.analyze(T.TESTS.map(t=>t.id),'tam');eq([all.killed,all.cond.hit],[37,22]);eq(T.analyze([],'tam').stmt.hit,0);assert.throws(()=>T.analyze([1],'x'));checks++;}

/* ── 3. Tahmin: yoğunlukların sayısal integrali, standart hata, ayrı integratör ── */
const P=K.plan;
const simpson=(f,a,b,n=4000)=>{const h=(b-a)/n;let s=f(a)+f(b);for(let i=1;i<n;i++)s+=(i%2?4:2)*f(a+i*h);return s*h/3;};
function numMoments(t,dist){const{a,m,b}=t,al=1+4*(m-a)/(b-a),be=1+4*(b-m)/(b-a),pdf=dist==='ucgen'?x=>x<m?2*(x-a)/((b-a)*(m-a||1)):2*(b-x)/((b-a)*(b-m||1)):x=>Math.pow(x-a,al-1)*Math.pow(b-x,be-1);
  const z=simpson(pdf,a,b),mean=simpson(x=>x*pdf(x),a,b)/z,vari=simpson(x=>(x-mean)*(x-mean)*pdf(x),a,b)/z;return{mean,vari};}
for(const t of[{a:2,m:4,b:8},{a:6,m:10,b:22},{a:1,m:2,b:5},{a:3,m:6,b:9},{a:6,m:10,b:40},{a:2,m:7,b:8}])for(const d of['beta','ucgen']){const x=P.moments(t,d),r=numMoments(t,d);near(x.mean,r.mean,2e-4,'ortalama '+d);near(x.vari,r.vari,2e-3,'varyans '+d);}
eq(P.moments({a:5,m:5,b:5},'beta'),{mean:5,vari:0});
const TASKS=[[2,4,8],[3,5,10],[6,10,22],[3,6,14],[2,4,12],[1,2,5]].map(t=>({a:t[0],m:t[1],b:t[2]}));
{const p=P.plan(TASKS,'beta');near(p.pert.mean,212/6,1e-12);near(p.pert.sd,Math.sqrt((36+49+256+121+100+16)/36),1e-12);eq(p.modeSum,31);
 for(const d of['beta','ucgen']){const pl=P.plan(TASKS,d),ref=TASKS.map(t=>numMoments(t,d)),em=ref.reduce((s,r)=>s+r.mean,0),ev=ref.reduce((s,r)=>s+r.vari,0);near(pl.exact.mean,em,2e-4);near(pl.exact.sd,Math.sqrt(ev),1e-3);
  for(const seed of[1,2,3,11,50]){const s=P.simulate(TASKS,d,20000,seed),se=Math.sqrt(ev/20000);ok(Math.abs(s.mean-em)<4*se,`MC ortalaması ${d} tohum ${seed}: ${s.mean} / ${em}`);near(s.sd,Math.sqrt(ev),.03,'MC σ');
   ok(s.sorted.every((v,i)=>i===0||v>=s.sorted[i-1]));ok(s.sorted[0]>=17&&s.sorted[19999]<=71,'örnekler [Σa, Σb] içinde');
   const direct=[...s.sorted].filter(v=>v<=38).length/20000;eq(P.prob(s.sorted,38),direct);ok(Math.abs(P.quantile(s.sorted,.8)-[...s.sorted][15999])<1e-12);}
  eq(P.simulate(TASKS,d,2000,7).mean,P.simulate(TASKS,d,2000,7).mean,'tohumlu');ok(P.simulate(TASKS,d,2000,7).mean!==P.simulate(TASKS,d,2000,8).mean);}
 const s=P.simulate(TASKS.map(t=>({a:t.m,m:t.m,b:t.m})),'beta',100,1);near(s.mean,31,1e-12);near(s.sd,0,1e-12);assert.throws(()=>P.plan([{a:3,m:2,b:5}],'beta'));checks++;}
for(const[z,v]of[[0,.5],[1,.8413447461],[-1,.1586552539],[1.96,.9750021049],[-2.5,.0062096653],[3,.9986501020]])near(P.normCdf(z),v,3e-7,'Φ');
for(let n=1;n<=22;n++){let c=0;for(let i=0;i<n;i++)for(let j=i+1;j<n;j++)c++;eq(P.channels(n),c);}
function refBrooks(p){const N=p.n+p.k,eff=Math.max(0,1-p.comm*(N-1));if(eff<=0)return Infinity;const rate=t=>eff*(p.k>0&&t<p.ramp?Math.max(0,p.n-p.mentor*p.k)+p.k*t/p.ramp:N);
  let t=0,w=0;const h=1/512;for(;;){const dw=h*(rate(t)+4*rate(t+h/2)+rate(t+h-1e-13))/6;if(w+dw>=p.R){let lo=0,hi=h;for(let i=0;i<60;i++){const mid=(lo+hi)/2,part=mid*(rate(t)+4*rate(t+mid/2)+rate(t+mid-1e-13))/6;if(w+part<p.R)lo=mid;else hi=mid;}return t+lo;}w+=dw;t+=h;if(t>5000)return Infinity;}}
for(const R of[20,60,120,300,400])for(const n of[2,5,12])for(const k of[0,1,3,10])for(const ramp of[0,5,15,40])for(const mentor of[0,.5,1])for(const comm of[0,.02,.08]){const p={R,n,k,ramp,mentor,comm},b=P.brooks(p),ref=refBrooks(p);
  if(!Number.isFinite(ref)){eq(b.T,Infinity);eq(P.brooksSim(p),Infinity);continue;}near(b.T,ref,1e-6,'Brooks kapalı biçim');near(P.brooksSim(p),ref,1e-6,'Brooks adımlı');eq(b.channels,(n+k)*(n+k-1)/2);}
{const p={R:120,n:5,k:3,ramp:15,mentor:.5,comm:.02};near(P.brooks({...p,k:0}).T,120/(5*.92),1e-12);near(P.brooks(p).T,15+(120-.86*75)/(.86*8),1e-12);ok(P.brooks({...p,R:60}).T>P.brooks({...p,R:60,k:0}).T,'son düzlükte eklemek geciktirir');ok(P.brooks({...p,R:300}).T<P.brooks({...p,R:300,k:0}).T,'erken eklemek hızlandırır');ok(P.brooks({...p,R:60}).inRamp);assert.throws(()=>P.brooks({...p,R:0}));checks++;}

/* ── 4. Kanban: Jackson kapalı biçimi, doğum-ölüm zinciri, iki sütunlu CTMC, Little, korunum ── */
const F=K.flow,I=Infinity;
for(const seed of[1,2,3,4]){const c={lambda:.7,mu:[1.5,1.2,1.5],limit:[I,I,I],s:0,seed,items:120000},r=F.kanban(c),W=1/.8+1/.5+1/.8,th=F.theory(c);
  near(th.W,W,1e-12);near(th.L,.7*W,1e-12);near(r.W,W,.04,'Jackson W');near(r.L,.7*W,.04,'Jackson L');near(r.throughput,.7,.015);[.7/.8,.7/.5,.7/.8].forEach((v,i)=>near(r.stages[i].avg,v,.05,'sütun ort.'));[.7/1.5,.7/1.2,.7/1.5].forEach((v,i)=>near(r.stages[i].busy,v,.03,'doluluk'));ok(r.stages.every(s=>s.blocked===0&&s.full===null));ok(!r.unstable);}
eq(F.theory({lambda:.7,mu:[1.5,1.2,1.5],limit:[3,3,3],s:0}).applies,false);eq(F.theory({lambda:.7,mu:[1.5,1.2,1.5],limit:[I,I,I],s:.1}).applies,false);eq(F.theory({lambda:1.3,mu:[1.5,1.2,1.5],limit:[I,I,I],s:0}).stable,false);
// Tek sütun, sınır Lm, geçiş kaybı s: doğum-ölüm zinciri (ölüm hızı μ/(1+s(min(n,Lm)−1))).
for(const[lambda,mu,Lm,s]of[[.7,1.2,3,.1],[.6,1,2,.3],[.8,1.5,5,.1],[.5,1,1,.5],[.9,1.2,4,0]]){let p=1,z=1,L=0,busy=0;for(let n=1;n<4000;n++){p*=lambda*(1+s*(Math.min(n,Lm)-1))/mu;z+=p;L+=n*p;if(p<1e-18)break;}L/=z;
  const r=F.kanban({lambda,mu:[mu],limit:[Lm],s,seed:3,items:200000});near(r.L,L,.05,'doğum-ölüm L');near(r.W,L/lambda,.05,'doğum-ölüm W');near(r.stages[0].busy,1-1/z,.02);ok(r.stages[0].max<=Lm);}
// İki sütun, bloke olma: kesilmiş CTMC'nin durağan dağılımı (tekdüzeleştirme + kuvvet yinelemesi).
function ctmc2(lambda,mu,lim,s,B=70){const key=q=>q.join(','),states=new Map(),list=[];
  const settle=q=>{let[b,k1,d1,k2]=q;for(let ch=true;ch;){ch=false;if(d1>0&&k2<lim[1]){d1--;k2++;ch=true;}if(b>0&&k1+d1<lim[0]){b--;k1++;ch=true;}}return[b,k1,d1,k2];};
  const add=q=>{const k=key(q);if(!states.has(k)){states.set(k,list.length);list.push(q);}return states.get(k);},rate=(m,k)=>k?m/(1+s*(k-1)):0,trans=[];add([0,0,0,0]);
  for(let i=0;i<list.length;i++){const[b,k1,d1,k2]=list[i],out=[];if(b<B)out.push([lambda,add(settle([b+1,k1,d1,k2]))]);if(k1)out.push([rate(mu[0],k1),add(settle([b,k1-1,d1+1,k2]))]);if(k2)out.push([rate(mu[1],k2),add(settle([b,k1,d1,k2-1]))]);trans.push(out);}
  const n=list.length,Lam=lambda+mu[0]+mu[1];let pi=new Float64Array(n).fill(1/n);
  for(let it=0;it<60000;it++){const nx=new Float64Array(n);for(let i=0;i<n;i++){let stay=1;for(const[r,j]of trans[i]){nx[j]+=pi[i]*r/Lam;stay-=r/Lam;}nx[i]+=pi[i]*stay;}let d=0;for(let i=0;i<n;i++)d+=Math.abs(nx[i]-pi[i]);pi=nx;if(d<1e-13)break;}
  let L=0,TH=0,blocked=0,board=0;list.forEach(([b,k1,d1,k2],i)=>{L+=pi[i]*(b+k1+d1+k2);board+=pi[i]*(k1+d1+k2);TH+=pi[i]*rate(mu[1],k2);if(d1)blocked+=pi[i];});return{L,TH,blocked,board};}
for(const[lambda,mu,lim,s]of[[.6,[1.2,1],[2,2],.1],[.5,[1,1.1],[1,1],0],[.7,[1.5,1.2],[3,2],.15]]){const ref=ctmc2(lambda,mu,lim,s),r=F.kanban({lambda,mu,limit:lim,s,seed:5,items:250000});
  near(ref.TH,lambda,1e-3,'CTMC akış dengesi');near(r.L,ref.L,.05,'CTMC L');near(r.boardWip,ref.board,.03,'CTMC pano');near(r.stages[0].blocked,ref.blocked,.04,'CTMC bloke oranı');near(r.W,ref.L/lambda,.05,'CTMC W');}
// Little yasası, korunum, sınırlar, CFD sıralaması, belirlenimcilik.
const DEFC={lambda:.7,mu:[1.5,1.2,1.5],limit:[3,3,3],s:.1};
for(const cfg of[DEFC,{...DEFC,limit:[2,2,2]},{...DEFC,limit:[1,1,1]},{...DEFC,limit:[5,5,5]},{...DEFC,mu:[1.5,1.2,1]},{...DEFC,s:0},{...DEFC,s:.2},{...DEFC,limit:[I,I,I],s:0},{...DEFC,lambda:.5,limit:[6,2,4]}])for(const seed of[1,2,3,9,50]){const r=F.kanban({...cfg,seed});
  ok(!r.unstable,'kararlı olmalı '+JSON.stringify(cfg));near(r.littleRhs,r.L,.01,'Little (sistem)');near(r.throughput*r.cycle,r.boardWip,.01,'Little (pano)');near(r.throughput,cfg.lambda,.03,'çıktı = girdi');near(r.backlog+r.boardWip,r.L,1e-9,'L = kuyruk + pano');near(r.stages.reduce((s,q)=>s+q.avg,0),r.boardWip,1e-9);
  eq(r.arrivals-r.departures,r.nEnd-r.n0,'iş korunumu');r.stages.forEach((q,i)=>{ok(q.max<=cfg.limit[i],'WIP sınırı aşılmaz');ok(q.busy>=0&&q.busy<=1&&q.blocked>=0&&q.blocked<=1);});ok(r.stages[2].blocked===0,'son sütun bloke olmaz');ok(r.p85>=r.W*.5&&r.cycle<=r.W+1e-9);
  ok(r.cfd.length===121&&Math.abs(r.cfd[120][0]-60)<1e-9);r.cfd.forEach((q,i)=>{for(let j=1;j<5;j++)ok(q[j]>=q[j+1],'CFD sıralı');if(i)for(let j=1;j<=5;j++)ok(q[j]>=r.cfd[i-1][j],'CFD azalmaz');});
  const sn=r.snapshot;sn.prog.forEach((k,i)=>ok(k+sn.done[i]<=cfg.limit[i]));}
{const a=F.kanban({...DEFC,seed:4}),b=F.kanban({...DEFC,seed:4}),c=F.kanban({...DEFC,seed:5});eq(a.W,b.W);eq(a.L,b.L);ok(a.W!==c.W);
 for(const cfg of[{...DEFC,limit:[I,I,I]},{...DEFC,lambda:1.4},{...DEFC,lambda:.9,limit:[1,1,1]},{...DEFC,s:.5}]){const r=F.kanban({...cfg,seed:1});ok(r.unstable,'kararsız olmalı '+JSON.stringify(cfg));ok(r.throughput<cfg.lambda*.98);ok(r.nEnd-r.n0>.02*r.arrivals);eq(r.arrivals-r.departures,r.nEnd-r.n0);}
 const w=l=>F.kanban({...DEFC,limit:[l,l,l],seed:1}).W;ok(w(2)<w(1)&&w(3)<w(6)&&w(6)<w(8),'teslim süresi sınırın U biçimli işlevi');
 const bt=F.kanban({...DEFC,mu:[1.5,1.2,1],seed:1}),df=F.kanban({...DEFC,seed:1});ok(bt.stages[1].blocked>3*df.stages[1].blocked&&bt.stages[2].busy>df.stages[2].busy&&bt.W>df.W,'darboğaz önündeki sütunu bloke eder');
 assert.throws(()=>F.kanban({...DEFC,lambda:0}));assert.throws(()=>F.kanban({...DEFC,limit:[3,3]}));checks+=2;}
console.log(`G yazılım mühendisliği: ${checks.toLocaleString('tr-TR')} bağımsız çekirdek kontrolü PASS`);

if(process.argv.includes('--browser')){
  const{chromium}=await import('playwright');const{createServer}=await import('node:http');const{join,extname}=await import('node:path');const{fileURLToPath}=await import('node:url');const root=fileURLToPath(new URL('../',import.meta.url));
  const server=createServer((req,res)=>{const file=join(root,decodeURIComponent(new URL(req.url,'http://localhost').pathname));if(!fs.existsSync(file)||fs.statSync(file).isDirectory()){res.writeHead(404).end();return;}res.setHeader('Content-Type',({'.html':'text/html; charset=utf-8','.js':'text/javascript; charset=utf-8','.css':'text/css; charset=utf-8'})[extname(file)]||'application/octet-stream');res.end(fs.readFileSync(file));});
  await new Promise(r=>server.listen(0,'127.0.0.1',r));let browser;const before=checks;
  try{browser=await chromium.launch();
    for(const[width,theme]of[[390,'light'],[1280,'dark']]){const ctx=await browser.newContext({viewport:{width,height:900},deviceScaleFactor:width===390?2:1,locale:'tr-TR'});await ctx.addInitScript(t=>{localStorage.setItem('acelya-theme',t);localStorage.setItem('acelya-sound-muted','1');},theme);
      const page=await ctx.newPage();page.setDefaultTimeout(8000);const errors=[];page.on('pageerror',e=>errors.push(e.message));page.on('console',m=>{if(m.type()==='error'&&!/404/.test(m.text()))errors.push(m.text());});
      await page.goto(`http://127.0.0.1:${server.address().port}/yazilim-muhendisligi.html`);await page.waitForSelector('#gitHead:not(:empty)');
      const click=id=>page.locator('#'+id).click(),read=id=>page.locator('#'+id).textContent(),has=async(id,t)=>{const v=await read(id);assert(v.includes(t),`${id}: "${v}" içinde "${t}" yok`);checks++;},
        range=(id,v)=>page.locator('#'+id).evaluate((e,v)=>{e.value=v;e.dispatchEvent(new Event('input',{bubbles:true}));},v),noOverflow=async w=>{eq(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),true,'yatay taşma: '+w);},
        canvases=async panel=>{eq(await page.evaluate(p=>[...document.querySelectorAll('#'+p+' canvas')].every(c=>c.width>100&&c.height>60&&c.getAttribute('role')==='img'&&c.getAttribute('aria-label')),panel),true,'tuvaller: '+panel);};
      eq(await page.evaluate(()=>[...document.querySelectorAll('main input,main select')].filter(e=>!document.querySelector('label[for="'+e.id+'"]')).map(e=>e.id),[]),[],'her denetimin etiketi olmalı');
      eq(await page.evaluate(()=>Object.isFrozen(SoftEngLab)&&!Object.getOwnPropertyDescriptor(window,'SoftEngLab').writable),true);
      eq(await page.evaluate(()=>/[̀-ͯ]/.test(document.querySelector('main').textContent.normalize('NFC'))),false,'birleşik işaret yok');
      // 1 · Git
      await has('gitAB','1 önde · 1 geride');await has('gitABset','tutuyor');await has('gitKind','Üç yollu');await has('gitCount','4 / 4');await canvases('panel-git');await noOverflow('git');
      await click('gitMerge');await has('gitStatus','üç yollu birleştirme');await has('gitAB','2 önde · 0 geride');await has('gitKind','Zaten güncel');await has('gitCount','5 / 5');
      await click('gitMerge');await has('gitStatus','zaten güncel');eq(await page.locator('#gitRevert').isDisabled(),true,'birleştirme commit\'i revert edilemez');
      await click('gitPFf');await has('gitKind','İleri sarma');await has('gitAB','0 önde · 2 geride');await click('gitMerge');await has('gitStatus','ileri sarma');await has('gitCount','4 / 4');await has('gitAB','0 önde · 0 geride');
      await click('gitPConf');await has('gitKind','Çakışma: 2. satır');await click('gitMerge');await has('gitStatus','Birleştirme durduruldu');await has('gitCount','5 / 5');
      await page.locator('#gitResolve').selectOption('theirs');await click('gitMerge');await has('gitStatus','onlarınki seçilerek çözüldü');await has('gitCount','6 / 6');
      await click('gitPRebase');await has('gitHead','özellik');await has('gitAB','2 önde · 1 geride');await click('gitRebase');await has('gitStatus','2 commit main ucuna');await has('gitCount','5 / 7');await has('gitAB','2 önde · 0 geride');
      await click('gitRevert');await has('gitStatus','git revert');await has('gitCount','6 / 8');await click('gitSwitch');await has('gitHead','main');await has('gitKind','İleri sarma');
      await click('gitPEmpty');await has('gitCount','1 / 1');for(const id of['gitSwitch','gitMerge','gitRebase','gitRevert'])eq(await page.locator('#'+id).isDisabled(),true,id+' devre dışı olmalı');await has('gitBase','öteki dal yok');
      await click('gitBranch');await click('gitBranch');await click('gitBranch');eq(await page.locator('#gitBranch').isDisabled(),true);await has('gitHead','deneme');
      for(let i=0;i<22;i++)await click('gitCommit');await has('gitStatus','Depo dolu');await has('gitCount','20 / 20');await noOverflow('git dolu');
      await click('gitReset');await has('gitCount','4 / 4');await has('gitHead','main');
      // 2 · Test
      await click('tab-test');await has('covStmt','%100 · 9 / 9');await has('covBranch','%100 · 8 / 8');await has('covCond','%72,7 · 16 / 22');await has('mutScore','%78,4 · 29 / 37');await has('mutGap','+21,6 puan');await has('testPass','5 / 5');await canvases('panel-test');await noOverflow('test');
      await click('testPWeak');await has('covBranch','%100');await has('mutScore','%0 · 0 / 37');await has('mutGap','+100 puan');await has('testStatus','İddia kapalı');
      await page.locator('#testOracle').selectOption('kaba');await has('mutScore','%32,4 · 12 / 37');
      await click('testPEdge');await has('mutScore','%86,5 · 32 / 37');await has('covCond','18 / 22');await click('testPAll');await has('mutScore','%100 · 37 / 37');await has('covCond','%100 · 22 / 22');await has('testStatus','Bütün mutantlar öldürüldü');
      await click('testPNone');await has('covStmt','%0 · 0 / 9');await has('testPass','test seçilmedi');await has('testStatus','Test seçilmedi');eq(await page.locator('#covCode li.miss').count(),5);
      await page.locator('#tc3').check();await has('covStmt','4 / 9');await has('covBranch','3 / 8');eq(await page.locator('#mutRows tr').count(),37);
      await click('testReset');await has('mutScore','%78,4');eq(await page.locator('#covCode li.full').count(),5);
      // 3 · Tahmin ve ekip
      await click('tab-plan');await has('estMean','ölçülen 35,31 gün');await has('estMeanSub','PERT 35,33');await has('estSd','ölçülen 4,27 gün');await has('estSdSub','PERT 4,01');await has('estSdSub','dağılımın kendisi 4,29');await has('estProb','%73,9');await has('estProbSub','%74,7');await has('estMode','31 gün');await has('estModeSub','%16,3');await canvases('panel-plan');await noOverflow('plan');
      await page.locator('#estDist').selectOption('ucgen');await has('estMeanSub','dağılımın kendisi 39,67');await has('estMean','ölçülen 39,64');await has('estStatus','(a + m + b)/3');await page.locator('#estDist').selectOption('beta');
      await page.locator('#estTask').selectOption('2');eq(await page.locator('#estB').inputValue(),'22');await range('estA',30);eq(await page.locator('#estM').inputValue(),'30');eq(await page.locator('#estB').inputValue(),'30');await has('estAOut','30 gün');
      await range('estB',1);eq(await page.locator('#estA').inputValue(),'1');eq(await page.locator('#estM').inputValue(),'1');await range('estDeadline',6);await has('estProb','%0');await range('estDeadline',240);await has('estProb','%100');
      await click('estPSym');await has('estMode','38 gün');await has('estStatus','simetrik');await has('estMeanSub','PERT 38 ');await click('estPSkew');await has('estSdSub','PERT 6,41');await has('estModeSub','%11,5');
      await has('brChan','5 kişi: 10 → 8 kişi: 28');await click('planReset');await has('brT0','26,09 gün');await has('brTk','23,07 gün');await has('brTkSub','fark 0 gün');await has('brStatus','Eklemek hızlandırıyor');await has('estMean','35,31');
      await click('brPLate');await has('brT0','13,04 gün');await has('brTk','14,18 gün');await has('brStatus','Eklemek geciktiriyor');await has('brBest','k = 0');await click('brPEarly');await has('brTk','49,23 gün');await has('brStatus','hızlandırıyor');
      await range('brK',0);await has('brStatus','Kimse eklenmedi');await has('brChan','5 kişi: 10');await range('brN',12);await range('brK',10);await range('brComm',8);await has('brTk','bitmez');await has('brStatus','verim sıfıra');await range('brComm',0);await range('brRamp',0);await has('brStatus','hızlandırıyor');await noOverflow('plan uç');
      await click('planReset');
      // 4 · Akış
      await click('tab-flow');await has('flowTH','0,697 iş/gün');await has('flowL','4,46 iş');await has('flowW','6,4 gün');await has('flowLittle','4,46 ile 4,46');await has('flowBoard','3,76 ile 3,77');await has('flowTheory','kapalı biçim yok');await has('flowStatus','Kararlı');await canvases('panel-flow');await noOverflow('flow');
      await click('kbPJackson');await has('kbLim1Out','sınırsız');await has('flowTheory','W = 4,5 gün · L = 3,15');await has('flowW','4,49 gün');await has('flowLittleSub','fark %');
      await click('kbPNoLimit');await has('flowL','kararlı değer yok');await has('flowLittle','uygulanamaz');await has('flowBoard','uygulanamaz');await has('flowStatus','Kararsız');await has('flowStatus','kararlı bir durumu yoktur');
      await click('kbPBottle');await has('flowW','13,98 gün');await has('flowStatus','En meşgul sütun Test');
      await click('flowReset');await range('kbLim1',1);await range('kbLim2',1);await range('kbLim3',1);await has('flowW','13,09 gün');await has('kbLim1Out','1');await range('kbLambda',2);await has('flowStatus','Kararsız');await has('flowStatus','Neden: Analiz sütunu sınırına (1 iş) dayandığında hızı μ/[1 + s·(k − 1)] = 1,5 iş/gün');await has('flowStatus','aşmıyor');await range('kbLambda',.2);await has('flowStatus','Kararlı');
      // doğrulayıcı (11 Kasım): kararsızlığın nedeni ve kaba eşik uyarısı durum satırında
      await click('flowReset');for(const id of['kbLim1','kbLim2','kbLim3'])await range(id,9);await has('flowStatus','Kararsız');await has('flowStatus','Neden: Geliştirme sütunu sınırına (9 iş) dayandığında hızı μ/[1 + s·(k − 1)] = 0,667 iş/gün; bu hız geliş hızını (λ = 0,7 iş/gün) aşmıyor.');
      await range('kbLim1',3);await range('kbLim3',3);await has('flowStatus','Kararlı');await has('flowStatus','Dikkat: Geliştirme sütunu sınırına (9 iş)');await click('flowReset');eq((await read('flowStatus')).includes('Dikkat'),false,'varsayılanda uyarı yok');
      await range('kbLambda',.95);await has('flowStatus','Kararsız');await has('flowStatus','Neden: hiçbir sütunun kendi hızı');await click('flowReset');
      await range('kbSwitch',50);await range('kbSeed',50);await range('kbMu1',.5);await range('kbMu2',3);await has('flowTH','iş/gün');await noOverflow('flow uç');await click('flowReset');await has('flowL','4,46 iş');
      // klavye
      await page.locator('#tab-flow').focus();await page.keyboard.press('Home');eq(await page.locator('#tab-git').getAttribute('aria-selected'),'true');await page.keyboard.press('ArrowRight');eq(await page.locator('#tab-test').getAttribute('aria-selected'),'true');eq(await page.locator('#panel-test').isVisible(),true);
      await page.keyboard.press('End');eq(await page.locator('#tab-flow').getAttribute('aria-selected'),'true');await page.keyboard.press('ArrowRight');eq(await page.locator('#tab-git').getAttribute('aria-selected'),'true');await page.keyboard.press('ArrowLeft');eq(await page.locator('#tab-flow').getAttribute('aria-selected'),'true');
      await range('kbLambda',1.5);await page.locator('h1').click();await page.keyboard.press('r');await has('kbLambdaOut','0,7 iş/gün');
      await page.locator('#kbLambda').focus();await range('kbLambda',1);await page.keyboard.press('r');await has('kbLambdaOut','1 iş/gün');await click('flowReset');
      assert.deepEqual(errors,[],'konsol hatası');checks++;await ctx.close();}
    console.log(`G yazılım mühendisliği: ${checks-before} tarayıcı kontrolü (390 açık, 1280 koyu) PASS`);
  }finally{await browser?.close();await new Promise(r=>server.close(r));}
}
