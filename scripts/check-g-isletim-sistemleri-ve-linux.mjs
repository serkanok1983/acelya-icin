#!/usr/bin/env node
// G grubu: isletim-sistemleri-ve-linux.html çekirdeğinin bağımsız doğrulaması.
// Başvurular sayfanın kendi formüllerini yinelemez: ayrı yazılmış olay tabanlı zamanlayıcı, permütasyon kaba kuvveti,
// sayfa değiştirmede bütün kurban seçimlerini deneyen arama, serpiştirmelerin tam sayımı, ayrı filozof modeli,
// Banker için bütün sıraların denenmesi, dosya sistemi değişmezleri ve ders kitabı değerleri.
// Kullanım: node scripts/check-g-isletim-sistemleri-ve-linux.mjs [--browser]
import fs from 'node:fs';
import vm from 'node:vm';
import assert from 'node:assert/strict';
import { canvasInk, canvasInkAll, assertCanvasDrawn } from './lib/canvas-check.mjs';
const html=fs.readFileSync(new URL('../isletim-sistemleri-ve-linux.html',import.meta.url),'utf8');
const source=html.split('/* KERNEL-BEGIN */')[1]?.split('/* KERNEL-END */')[0];
assert(source,'KERNEL sınırları gerekli');
const context={window:{},TextEncoder};vm.createContext(context);vm.runInContext(source,context);
const K=context.window.OsLab;let checks=0;
const ok=(c,m)=>{assert(c,m);checks++;},eq=(a,b,m)=>{const cl=v=>v===undefined?v:JSON.parse(JSON.stringify(v)),x=cl(a),y=cl(b);if(m===undefined)assert.deepEqual(x,y);else assert.deepEqual(x,y,m+' · '+JSON.stringify(x)+' ≠ '+JSON.stringify(y));checks++;},near=(a,b,t=1e-9,m)=>{assert(Math.abs(a-b)<=t*Math.max(1,Math.abs(b)),(m||'')+` ${a} ≠ ${b}`);checks++;};
let seed=12345;const rnd=()=>{seed=(seed*1103515245+12345)%2147483648;return seed/2147483648;},ri=(a,b)=>a+Math.floor(rnd()*(b-a+1));
assert.throws(()=>{K.schedule=1;K.schedule([{id:'x',arrival:0,burst:1}],{}).x.y;});checks++;ok(Object.isFrozen(K));

/* ---------- 1. Zamanlama ---------- */
// Bağımsız başvuru: olay tabanlı (süreç bir seferde bir sonraki karar anına kadar çalışır), bağlam maliyeti 0.
function refSchedule(procs,algo,q){
  const P=procs.map((p,i)=>({...p,i,rem:p.burst,first:null,finish:null,enq:p.arrival}));let t=0,left=P.length;const queue=[];let admitted=new Set();
  const arrive=(upto,exclude)=>{P.filter(p=>!admitted.has(p.i)&&p.arrival<=upto).sort((a,b)=>a.arrival-b.arrival||a.i-b.i).forEach(p=>{admitted.add(p.i);queue.push(p);});};
  while(left){arrive(t);
    if(!queue.length){t=Math.min(...P.filter(p=>!admitted.has(p.i)).map(p=>p.arrival));continue;}
    let p;
    if(algo==='fcfs'||algo==='rr')p=queue.shift();
    else{const key=x=>algo==='sjf'?x.burst:algo==='srtf'?x.rem:x.priority;p=queue.slice().sort((a,b)=>key(a)-key(b)||a.arrival-b.arrival||a.i-b.i)[0];queue.splice(queue.indexOf(p),1);}
    if(p.first===null)p.first=t;
    let run;
    if(algo==='fcfs'||algo==='sjf')run=p.rem;
    else if(algo==='rr')run=Math.min(q,p.rem);
    else{ // kesintili: daha iyi anahtarlı bir varışa kadar
      run=p.rem;const key=x=>algo==='srtf'?x.rem:x.priority;
      for(const o of P.filter(x=>!admitted.has(x.i)).sort((a,b)=>a.arrival-b.arrival)){const dt=o.arrival-t;if(dt<p.rem&&key(o)<(algo==='srtf'?p.rem-dt:p.priority)){run=dt;break;}}
      // kuyrukta zaten bekleyen eşit/daha kötü anahtarlılar kesmez
    }
    if(algo==='rr'){ // dilim bitince kuyruk boşsa aynı süreç sürer
      t+=run;p.rem-=run;arrive(t);if(p.rem>0)queue.push(p);else{p.finish=t;left--;}continue;}
    t+=run;p.rem-=run;if(p.rem>0){arrive(t);queue.push(p);}else{p.finish=t;left--;}
  }
  return P.map(p=>({wait:p.finish-p.arrival-p.burst,turnaround:p.finish-p.arrival,response:p.first-p.arrival,finish:p.finish}));
}
function perms(a){if(a.length<=1)return[a];return a.flatMap((x,i)=>perms(a.filter((_,j)=>j!==i)).map(r=>[x,...r]));}
function refBrute(procs){let best=Infinity,worst=-Infinity;for(const o of perms(procs.map((_,i)=>i))){let t=0,w=0;for(const i of o){const s=Math.max(t,procs[i].arrival);w+=s-procs[i].arrival;t=s+procs[i].burst;}best=Math.min(best,w/procs.length);worst=Math.max(worst,w/procs.length);}return{best,worst};}
for(let trial=0;trial<400;trial++){
  const n=ri(1,6),same=trial%4===0,procs=Array.from({length:n},(_,i)=>({id:'P'+(i+1),arrival:same?0:ri(0,12),burst:ri(1,12),priority:ri(0,9)}));
  // öncelik eşitliğinde iki uygulamanın bağ kuralı aynı tanımlı: varış, sonra sıra
  for(const algo of K.ALGOS){const q=ri(1,6),r=K.schedule(procs,{algo,quantum:q}),ref=refSchedule(procs,algo,q);
    r.stats.forEach((s,i)=>{assert.equal(s.wait,ref[i].wait,`${algo} wait ${JSON.stringify(procs)} q=${q}`);assert.equal(s.response,ref[i].response,`${algo} response`);assert.equal(s.finish,ref[i].finish);});checks+=3;
    const c=K.census(procs,r.segments);c.forEach((x,i)=>{assert.equal(x.run,procs[i].burst);assert.equal(x.wait,r.stats[i].wait);assert.equal(x.first,r.stats[i].first);});checks+=3;
    assert.equal(r.busy+r.idle+r.csTime,r.end);assert.equal(r.busy,procs.reduce((s,p)=>s+p.burst,0));checks+=2;
    for(let k=1;k<r.segments.length;k++)assert.equal(r.segments[k].start,r.segments[k-1].end);checks++;
  }
  const b=K.bruteOrders(procs),rb=refBrute(procs);near(b.best,rb.best);near(b.worst,rb.worst);
  const sjf=K.schedule(procs,{algo:'sjf'}),srtf=K.schedule(procs,{algo:'srtf'}),fcfs=K.schedule(procs,{algo:'fcfs'});
  if(same)near(sjf.meanWait,rb.best,1e-9,'SJF en iyi (eş varış)');
  ok(sjf.meanWait>=rb.best-1e-9);ok(fcfs.meanWait<=rb.worst+1e-9&&fcfs.meanWait>=rb.best-1e-9);
  ok(srtf.meanWait<=rb.best+1e-9,'SRTF kesintisiz en iyiden kötü olamaz');
  const big=K.schedule(procs,{algo:'rr',quantum:20});eq(big.segments,fcfs.segments,'q ≥ en uzun iş → FCFS');
  // bağlam maliyeti ve yaşlandırma: korunum değişmezleri
  for(const algo of K.ALGOS){const cs=ri(1,3),r=K.schedule(procs,{algo,quantum:ri(1,4),cs,aging:trial%2===0,agingStep:ri(1,5)}),c=K.census(procs,r.segments);
    c.forEach((x,i)=>{assert.equal(x.run,procs[i].burst);assert(x.first>=procs[i].arrival);assert.equal(x.wait,r.stats[i].wait);});
    const css=r.segments.filter(s=>s.kind==='cs');assert.equal(css.length,r.switches);css.forEach(s=>assert.equal(s.end-s.start,cs));assert.equal(r.busy+r.idle+r.csTime,r.end);
    const runs=r.segments.filter(s=>s.kind==='run');let changes=0;for(let k=1;k<runs.length;k++)if(runs[k].pid!==runs[k-1].pid)changes++;assert.equal(changes,r.switches);checks+=4;}
}
// Ders kitabı değerleri (Silberschatz, Galvin, Gagne; CPU zamanlama bölümünün klasik örnekleri)
const conv24=[{id:'P1',arrival:0,burst:24},{id:'P2',arrival:0,burst:3},{id:'P3',arrival:0,burst:3}];
near(K.schedule(conv24,{algo:'fcfs'}).meanWait,17);near(K.schedule(conv24,{algo:'sjf'}).meanWait,3);near(K.schedule(conv24,{algo:'rr',quantum:4}).meanWait,17/3);
const book=[{id:'P1',arrival:0,burst:8,priority:2},{id:'P2',arrival:1,burst:4,priority:4},{id:'P3',arrival:2,burst:9,priority:1},{id:'P4',arrival:3,burst:5,priority:3}];
near(K.schedule(book,{algo:'srtf'}).meanWait,6.5);near(K.schedule(book,{algo:'sjf'}).meanWait,7.75);near(K.schedule(book,{algo:'fcfs'}).meanWait,8.75);
const sjf4=[{id:'P1',arrival:0,burst:6},{id:'P2',arrival:0,burst:8},{id:'P3',arrival:0,burst:7},{id:'P4',arrival:0,burst:3}];near(K.schedule(sjf4,{algo:'sjf'}).meanWait,7);near(K.schedule(sjf4,{algo:'fcfs'}).meanWait,10.25);
const pr5=[{id:'P1',arrival:0,burst:10,priority:3},{id:'P2',arrival:0,burst:1,priority:1},{id:'P3',arrival:0,burst:2,priority:4},{id:'P4',arrival:0,burst:1,priority:5},{id:'P5',arrival:0,burst:5,priority:2}];near(K.schedule(pr5,{algo:'prio'}).meanWait,8.2);
// Sayfanın varsayılanı ve hazır kümeleri (rapordaki sayılar)
const def=K.schedule(book,{algo:'rr',quantum:2});near(def.meanWait,12.75);near(def.meanTurnaround,19.25);near(def.meanResponse,2);eq(def.switches,12);eq(def.end,26);
const convoy=[{id:'P1',arrival:0,burst:20,priority:1},{id:'P2',arrival:0,burst:3,priority:2},{id:'P3',arrival:0,burst:3,priority:3}];
near(K.schedule(convoy,{algo:'fcfs'}).meanWait,43/3);near(K.schedule(convoy,{algo:'sjf'}).meanWait,3);eq(K.bruteOrders(convoy).bestOrder,['P2','P3','P1']);
const starve=[[0,4,2],[0,5,0],[5,5,0],[10,5,0],[15,5,0],[20,5,0]].map((r,i)=>({id:'P'+(i+1),arrival:r[0],burst:r[1],priority:r[2]}));
const st0=K.schedule(starve,{algo:'prio'}),st1=K.schedule(starve,{algo:'prio',aging:true,agingStep:2});
eq(st0.stats[0].first,25);eq(st0.stats[0].wait,25);ok(st1.stats[0].first<st0.stats[0].first,'yaşlandırma açlığı kısaltır');
// Açlık hazır kümesi (sayfadaki CPU_PRE.starve ile aynı olmalı): yaşlandırma adımının 1–10 değerlerinin hepsi P1'in beklemesini kısaltır.
ok(html.includes('starve:[[0,4,2],[0,5,0],[5,5,0],[10,5,0],[15,5,0],[20,5,0]]'),'Açlık hazır kümesi test ile aynı');
{const w=[];for(let s=1;s<=10;s++){const r=K.schedule(starve,{algo:'prio',aging:true,agingStep:s});w.push(r.stats[0].wait);eq(r.stats[0].wait,5*Math.ceil(2*s/5),'P1, ilk karar anı ≥ 2·adım');ok(r.stats[0].wait<st0.stats[0].wait,'adım '+s+' açlığı kısaltır');}eq(w,[5,5,10,10,10,15,15,20,20,20]);}
const cs1=K.schedule(book,{algo:'rr',quantum:2,cs:1});eq(cs1.csTime,cs1.switches);eq(cs1.end,26+cs1.switches);
for(const bad of[()=>K.schedule([],{}),()=>K.schedule(book,{algo:'x'}),()=>K.schedule([{id:'a',arrival:0,burst:0}],{}),()=>K.schedule(book,{algo:'rr',quantum:0})]){assert.throws(bad);checks++;}

/* ---------- 2. Sanal bellek ---------- */
function refFIFO(refs,n){const q=[];let f=0;for(const p of refs)if(!q.includes(p)){f++;if(q.length===n)q.shift();q.push(p);}return f;}
function refLRU(refs,n){let s=[];let f=0;for(const p of refs){if(s.includes(p))s=s.filter(x=>x!==p);else{f++;if(s.length===n)s.shift();}s.push(p);}return f;}
function refMin(refs,n){const memo=new Map();const go=(i,set)=>{if(i===refs.length)return 0;const key=i+'|'+[...set].sort().join(',');if(memo.has(key))return memo.get(key);let r;const p=refs[i];
  if(set.includes(p))r=go(i+1,set);else if(set.length<n)r=1+go(i+1,[...set,p]);else r=1+Math.min(...set.map(v=>go(i+1,[...set.filter(x=>x!==v),p])));memo.set(key,r);return r;};return go(0,[]);}
function refClock(refs,n){const pg=Array(n).fill(null),bit=Array(n).fill(0);let h=0,f=0;for(const p of refs){const k=pg.indexOf(p);if(k>=0){bit[k]=1;continue;}f++;for(;;){if(pg[h]===null||bit[h]===0){pg[h]=p;bit[h]=1;h=(h+1)%n;break;}bit[h]=0;h=(h+1)%n;}}return f;}
const belady=[1,2,3,4,1,2,5,1,2,3,4,5],book20=[7,0,1,2,0,3,0,4,2,3,0,3,2,1,2,0,1,7,0,1];
eq(K.pageReplace(belady,3,'fifo').faults,9);eq(K.pageReplace(belady,4,'fifo').faults,10);eq(K.pageReplace(belady,3,'lru').faults,10);eq(K.pageReplace(belady,4,'lru').faults,8);eq(K.pageReplace(belady,3,'opt').faults,7);eq(K.pageReplace(belady,4,'opt').faults,6);
eq(K.pageReplace(book20,3,'fifo').faults,15);eq(K.pageReplace(book20,3,'lru').faults,12);eq(K.pageReplace(book20,3,'opt').faults,9);
eq(K.parseRefs('1 2 3 4 1 2 5 1 2 3 4 5'),belady);eq(K.parseRefs('1, 2;3'),[1,2,3]);eq(K.parseRefs('1 x'),null);eq(K.parseRefs(''),null);eq(K.parseRefs('1 100'),null);eq(K.parseRefs('1.5'),null);
for(let trial=0;trial<300;trial++){const len=ri(1,trial<150?14:40),refs=trial%5===0?K.localityRefs(trial+1,len):Array.from({length:len},()=>ri(0,ri(2,8))),distinct=new Set(refs).size;let prevL=Infinity,prevO=Infinity;
  for(let n=1;n<=7;n++){const fi=K.pageReplace(refs,n,'fifo'),lr=K.pageReplace(refs,n,'lru'),op=K.pageReplace(refs,n,'opt'),cl=K.pageReplace(refs,n,'clock');
    assert.equal(fi.faults,refFIFO(refs,n));assert.equal(lr.faults,refLRU(refs,n));assert.equal(cl.faults,refClock(refs,n),'clock '+refs+' '+n);checks+=3;
    if(len<=14){assert.equal(op.faults,refMin(refs,n),'OPT en az '+refs+' '+n);checks++;}
    for(const r of[fi,lr,cl]){assert(r.faults>=op.faults);assert(r.faults>=Math.min(distinct,refs.length)&&op.faults>=distinct);if(n>=distinct)assert.equal(r.faults,distinct);
      assert.equal(r.steps.filter(s=>s.fault).length,r.faults);r.steps.forEach((s,i)=>{assert(s.frames.includes(refs[i]));assert.equal(new Set(s.frames.filter(x=>x!==null)).size,s.frames.filter(x=>x!==null).length);});}
    checks+=3;assert(lr.faults<=prevL&&op.faults<=prevO,'yığın özelliği');prevL=lr.faults;prevO=op.faults;checks++;}}
// Adres çevirisi
for(const ps of K.PAGE_SIZES){const frames=new Set();for(let va=0;va<65536;va+=ps===256?37:ps===1024?151:613){const t=K.translate(va,ps);assert.equal(t.vpn*ps+t.offset,va);assert.equal(t.vpn,va>>>Math.log2(ps));assert.equal(t.offset,va&(ps-1));assert.equal(t.present,va>=0x1000&&va<0xC000);if(t.present){assert.equal(t.pa%ps,t.offset);assert(t.pa>=0&&t.pa<65536);}checks++;}
  for(let v=0;v<65536/ps;v++){const t=K.translate(v*ps,ps);if(t.present){assert(!frames.has(t.frame));frames.add(t.frame);}}eq(frames.size,0xB000/ps);}
eq(K.translate(0x1234,4096),{vpn:1,offset:0x234,offsetBits:12,vpnBits:4,pages:16,present:true,frame:8,pa:0x8234});ok(!K.translate(0x0010,4096).present);ok(!K.translate(0xC000,256).present);
function refTlb(trace,ps,size){const m=new Map();let hits=0,tick=0;for(const va of trace){const v=Math.floor(va/ps);tick++;if(m.has(v))hits++;else if(m.size>=size){let old=null;for(const[k,t]of m)if(old===null||t<m.get(old))old=k;m.delete(old);}m.set(v,tick);}return hits;}
for(const ps of K.PAGE_SIZES)for(const size of[1,2,4,8,11,16])for(const tm of[50,100,200]){
  for(const stride of[4,16,64,256]){const tr=K.makeTrace('seq',4096,ps,stride,1),s=K.tlbSim(tr,ps,size,1,tm),th=K.tlbTheory('seq',4096,ps,size,stride);assert.equal(s.hits,refTlb(tr,ps,size));assert.equal(s.misses,th.misses,`seq ${ps} ${size} ${stride}`);near(s.mean,K.eat(th.hitRatio,1,tm));near(s.mean,(s.hits*(1+tm)+s.misses*(1+2*tm))/4096);assert(th.exact);checks+=2;}
  for(let k=1;k<=11;k++){const tr=K.makeTrace('loop',4096,ps,k,1),s=K.tlbSim(tr,ps,size,1,tm),th=K.tlbTheory('loop',4096,ps,size,k);assert.equal(s.hits,refTlb(tr,ps,size));assert.equal(s.misses,th.misses,`loop ${ps} ${size} ${k}`);assert.equal(s.faults,0);checks+=2;}
  let sum=0;const th=K.tlbTheory('rand',4096,ps,size,0);for(let sd=1;sd<=8;sd++){const tr=K.makeTrace('rand',4096,ps,0,sd),s=K.tlbSim(tr,ps,size,1,tm);assert.equal(s.hits,refTlb(tr,ps,size));assert(Math.abs(s.hitRatio-th.hitRatio)<.04,`rand ${ps} ${size} ${s.hitRatio} ${th.hitRatio}`);sum+=s.hitRatio;}
  ok(Math.abs(sum/8-th.hitRatio)<.012,`rand ortalama ${ps} ${size}: ${sum/8} vs ${th.hitRatio}`);ok(!th.exact);}
{const s=K.tlbSim(K.makeTrace('seq',4096,4096,64,1),4096,4,1,100);eq(s.hits,4032);near(s.mean,102.5625);eq(s.tlb,[6,7,8,9]);const l=K.tlbSim(K.makeTrace('loop',4096,4096,5,1),4096,4,1,100);eq(l.hits,0);near(l.mean,201);}

/* ---------- 3. Eşzamanlılık ---------- */
// Bağımsız yürütücü: iş parçacığı sırası dizisini doğrudan çalıştırır.
function runSchedule(K_,sched){let c=0;const reg=[0,0],pc=[0,0];for(const i of sched){const op=pc[i]%3;if(op===0)reg[i]=c;else if(op===1)reg[i]++;else c=reg[i];pc[i]++;}return c;}
function allSchedules(n){const out=[];(function rec(a,b,cur){if(a===0&&b===0){out.push(cur.slice());return;}if(a){cur.push(0);rec(a-1,b,cur);cur.pop();}if(b){cur.push(1);rec(a,b-1,cur);cur.pop();}})(n,n,[]);return out;}
for(const k of[1,2,3]){const scheds=allSchedules(3*k),finals=new Set(scheds.map(s=>runSchedule(k,s))),list=[...finals].sort((a,b)=>a-b),reach=K.raceReach(k,false);
  eq(reach.finals,list);eq(reach.max,2*k);eq(reach.min,k===1?1:2);
  for(const p of[.05,.3,.5,.85,1]){const dist=Array(2*k+1).fill(0);for(const s of scheds){let pr=.5,okp=true;const left=[3*k,3*k];for(let j=0;j<s.length;j++){left[s[j]]--;if(j+1<s.length){const stay=s[j+1]===s[j];if(left[s[j]]===0){/* zorunlu geçiş */}else if(left[1-s[j]]===0){/* tek seçenek */}else pr*=stay?1-p:p;}}dist[runSchedule(k,s)]+=pr;}
    const ex=K.raceExact(k,p);ex.dist.forEach((v,i)=>near(v,dist[i],1e-9,`raceExact K=${k} p=${p} [${i}]`));near(ex.dist.reduce((a,b)=>a+b,0),1);}
  eq(K.raceReach(k,true).finals,[2*k]);}
for(const k of[1,2,3,4,5,6]){const r=K.raceReach(k,false);eq(r.min,k===1?1:2);eq(r.max,2*k);eq(r.finals.length,r.max-r.min+1,'aralıktaki her tam sayı');eq(K.raceReach(k,true).finals,[2*k]);
  near(K.raceExact(k,1).dist[k],1,1e-12,'p = 1: sıkı nöbetleşme her turda bir güncelleme kaybeder');
  for(const p of[.05,.5]){const ex=K.raceExact(k,p),m=K.raceTrials(k,false,p,77+k,20000),sd=Math.sqrt(ex.pCorrect*(1-ex.pCorrect)/20000);ok(Math.abs(m.pCorrect-ex.pCorrect)<=5*sd+1e-4,`MC K=${k} p=${p}: ${m.pCorrect} vs ${ex.pCorrect}`);ok(Math.abs(m.lostMean-ex.lostMean)<.06,`kayıp K=${k} p=${p}`);near(m.hist.reduce((a,b)=>a+b,0),20000);}
  const mx=K.raceTrials(k,true,.5,3,500);eq(mx.hist[2*k],500);ok(mx.blockedMean>=0);}
near(K.raceExact(1,.5).pCorrect,.25);near(K.raceExact(1,.2).pCorrect,.64);
{ // en kötü sıra: K ≥ 2 için son değer 2
  for(const k of[2,3,6]){const seq=[0];for(let j=0;j<3*(k-1);j++)seq.push(1);seq.push(0,0,1);for(let j=0;j<3*(k-1);j++)seq.push(0);seq.push(1,1);eq(runSchedule(k,seq),2);let s=K.raceInit(k,false);for(const i of seq)s=K.raceStep(s,i).state;eq(s.counter,2);ok(K.raceDone(s,0)&&K.raceDone(s,1));}
  let s=K.raceInit(2,true);s=K.raceStep(s,0).state;const b=K.raceStep(s,1);ok(b.blocked&&K.raceBlocked(s,1));eq(b.state.th[1].pc,0);}
// Filozoflar: ayrı yazılmış model
function refDine(n,strategy){const first=i=>strategy==='ordered'?Math.min(i,(i+1)%n):i,second=i=>strategy==='ordered'?Math.max(i,(i+1)%n):(i+1)%n;
  const moves=s=>{const out=[],held=new Map();s.forEach((st,i)=>{if(st>=2)held.set(first(i),i);if(st===3)held.set(second(i),i);});
    s.forEach((st,i)=>{const t=s.slice();if(st===0){if(strategy==='waiter'&&s.filter(x=>x>0).length>=n-1)return;t[i]=1;}else if(st===1){if(held.has(first(i)))return;t[i]=2;}else if(st===2){if(held.has(second(i)))return;t[i]=3;}else t[i]=0;out.push(t);});return out;};
  const seen=new Set(),q=[Array(n).fill(0)];seen.add(q[0].join(''));let dead=0;for(let h=0;h<q.length;h++){const mv=moves(q[h]);if(!mv.length){dead++;continue;}for(const t of mv){const k=t.join('');if(!seen.has(k)){seen.add(k);q.push(t);}}}return{states:seen.size,dead};}
for(let n=3;n<=6;n++)for(const st of['naive','ordered','waiter']){const a=K.dineExplore(n,st),b=refDine(n,st);eq(a.states,b.states,`dine ${n} ${st}`);eq(a.deadlocks,b.dead);eq(a.deadlocks,st==='naive'?1:0);
  const p=K.dineExact(n,st,200),m=K.dineTrials(n,st,5+n,4000,200);if(st==='naive'){ok(p>0&&p<=1);ok(Math.abs(m.fraction-p)<=5*Math.sqrt(p*(1-p)/4000)+1e-3,`dine MC ${n}: ${m.fraction} vs ${p}`);}else{eq(p,0);eq(m.deadlocked,0);ok(m.mealsPerRun>5);}}
{let s=K.dineInit(5,'naive');for(let r=0;r<2;r++)for(let i=0;i<5;i++)s=K.dineStep(s,i).state;const c=K.dineCycle(s);eq(c.length,10);for(let i=0;i<5;i++)ok(!K.dineStep(s,i).moved);eq(K.dineCycle(K.dineInit(5,'naive')),null);
  let o=K.dineInit(5,'ordered');for(let r=0;r<2;r++)for(let i=0;i<5;i++)o=K.dineStep(o,i).state;eq(K.dineCycle(o),null);eq(o.st,[2,2,2,2,1]);
  let w=K.dineInit(5,'waiter');for(let i=0;i<5;i++)w=K.dineStep(w,i).state;eq(w.st,[1,1,1,1,0]);eq(K.dineStep(w,4).why,'waiter');}
// Banker
function refSafeCount(alloc,max,avail){let count=0;for(const o of perms(alloc.map((_,i)=>i))){const w=avail.slice();let good=true;for(const i of o){if(max[i].some((v,j)=>v-alloc[i][j]>w[j])){good=false;break;}alloc[i].forEach((v,j)=>w[j]+=v);}if(good)count++;}return count;}
const AL=[[0,1,0],[2,0,0],[3,0,2],[2,1,1],[0,0,2]],MX=[[7,5,3],[3,2,2],[9,0,2],[2,2,2],[4,3,3]];
{const r=K.bankerSafe(AL,MX,[3,3,2]);ok(r.safe);eq(r.sequence,[1,3,4,0,2]);eq(r.need,[[7,4,3],[1,2,2],[6,0,0],[0,1,1],[4,3,1]]);eq(K.bankerCount(AL,MX,[3,3,2]),{count:refSafeCount(AL,MX,[3,3,2]),total:120});eq(r.steps[4].after,[10,5,7]);
  const q=K.bankerRequest(AL,MX,[3,3,2],1,[1,0,2]);ok(q.granted);eq(q.avail,[2,3,0]);eq(K.bankerRequest(q.alloc,MX,q.avail,4,[3,3,0]).reason,'avail');eq(K.bankerRequest(q.alloc,MX,q.avail,0,[0,2,0]).reason,'unsafe');eq(K.bankerRequest(AL,MX,[3,3,2],1,[2,0,0]).reason,'need');
  const u=K.bankerSafe(AL,MX,[2,1,1]);ok(!u.safe);eq(u.sequence,[3,1,2]);eq(u.stuck,[0,4]);eq(K.bankerCount(AL,MX,[2,1,1]).count,0);ok(!K.bankerSafe([[2,0,0]],[[1,0,0]],[0,0,0]).valid);}
for(let t=0;t<400;t++){const n=ri(1,5),max=Array.from({length:n},()=>[ri(0,6),ri(0,6),ri(0,6)]),alloc=max.map(r=>r.map(v=>ri(0,v))),avail=[ri(0,4),ri(0,4),ri(0,4)],r=K.bankerSafe(alloc,max,avail),c=refSafeCount(alloc,max,avail);
  assert.equal(r.safe,c>0);assert.equal(K.bankerCount(alloc,max,avail).count,c);if(r.safe){const w=avail.slice();for(const i of r.sequence){assert(max[i].every((v,j)=>v-alloc[i][j]<=w[j]));alloc[i].forEach((v,j)=>w[j]+=v);}}checks+=2;}

/* ---------- 4. Dosya sistemi ve kabuk ---------- */
function refMode(type,m){const t={f:'-',d:'d',l:'l',c:'c'}[type];let s='';for(const sh of[6,3,0]){const b=(m>>sh)&7;s+=(b&4?'r':'-')+(b&2?'w':'-')+(b&1?'x':'-');}return t+s;}
for(let m=0;m<512;m++){assert.equal(K.modeString('f',m),refMode('f',m));assert.equal(K.octal(m),m.toString(8).padStart(3,'0'));assert.equal(parseInt(K.octal(m),8),m);}checks+=3;eq(K.modeString('d',0o1777),'drwxrwxrwt');eq(K.modeString('d',0o1776),'drwxrwxrwT');eq(K.octal(0o1777),'1777');
const sh=()=>{const f=K.createFS();const run=c=>{const r=f.exec(c);return{out:r.out.filter(x=>x.t==='out').map(x=>x.s),err:r.out.filter(x=>x.t==='err').map(x=>x.s),sys:r.sys,r};};return{f,run};};
function invariants(f,label){const nodes=f.inodes(),by=new Map(nodes.map(n=>[n.ino,n])),refc=new Map();
  for(const n of nodes)if(n.entries)for(const[,ino]of n.entries){assert(by.has(ino),label+': sarkan dizin girdisi');refc.set(ino,(refc.get(ino)||0)+1);}
  for(const n of nodes){if(n.type==='d'){const sub=n.entries.filter(([,i])=>by.get(i).type==='d').length;assert.equal(n.nlink,2+sub,label+': dizin bağ sayısı '+n.ino);if(n.ino!==2)assert.equal(refc.get(n.ino),1,label+': dizin tek adlı olmalı');n.entries.forEach(([,i])=>{if(by.get(i).type==='d')assert.equal(by.get(i).parent,n.ino);});}
    else assert.equal(n.nlink,refc.get(n.ino)||0,label+': dosya bağ sayısı '+n.ino);assert(n.nlink>=1);}
  assert.equal(new Set(f.allNames().map(x=>x.ino)).size+1,nodes.length,label+': erişilemeyen inode');assert.equal(f.inodeCount(),nodes.length);checks++;}
{const{f,run}=sh();invariants(f,'başlangıç');
  eq(run('pwd').out,['/home/acelya']);eq(run('ls').out,['calistir.sh  notlar.txt  odev']);eq(run('ls -a').out,['.  ..  .bashrc  calistir.sh  notlar.txt  odev']);
  const ll=run('ls -l').out;eq(ll.length,4);ok(/^toplam \d+$/.test(ll[0]));ok(!ll.some(x=>x.includes('.bashrc')));ok(/^-rwxr-xr-x +1 acelya acelya +\d+ Kas 11 \d\d:\d\d calistir\.sh$/.test(ll[1]),ll[1]);ok(/^drwxr-xr-x +2 /.test(ll[3]));
  const la=run('ls -la').out;eq(la.length,7);ok(la[1].endsWith(' .')&&la[2].endsWith(' ..')&&la[3].endsWith(' .bashrc'));ok(/^drwxr-xr-x +3 acelya/.test(la[1]),'ev dizini: 2 + 1 alt dizin');
  eq(run('ls -d odev').out,['odev']);eq(run('ls yok').err.length,1);eq(run('ls -z').err,["ls: geçersiz seçenek -- 'z'"]);
  // /proc: simulasyon-notlari.md'deki açık madde
  const cpu=run('cat /proc/cpuinfo');eq(cpu.err,[]);ok(cpu.out[0].includes('MODEL ÇIKTISI'));ok(cpu.out.some(l=>l.startsWith('model name')));eq(run('ls /proc').out,['cpuinfo  meminfo  uptime  version']);
  const mi=run('cat /proc/meminfo').out;ok(mi[0].includes('MODEL ÇIKTISI'));const kb=k=>+mi.find(l=>l.startsWith(k+':')).match(/(\d+) kB/)[1];ok(kb('MemAvailable')>kb('MemFree')&&kb('MemAvailable')<kb('MemTotal'));
  ok(/ 0 Kas 11 /.test(run('ls -l /proc/cpuinfo').out[0]),'/proc dosyası 0 bayt görünür');ok(run('echo 1 > /proc/uptime').err.length===1);ok(run('touch /proc/x').err.length===1);ok(run('rm /proc/cpuinfo').err.length===1);
  const u1=run('cat /proc/uptime').out[0],u2=run('cat /proc/uptime').out[0];ok(u1!==u2,'sanal dosya her okumada yeniden üretilir');
  // ps: bayraksız yalnız bu terminal
  const ps=run('ps').out;eq(ps.length,3);ok(ps[1].endsWith('bash')&&ps[2].endsWith('ps'));const pse=run('ps -e').out;ok(pse.length>=9&&pse.some(l=>/ +1 \?.* init$/.test(l)));ok(run('ps -ef').out[0].startsWith('UID'));ok(run('ps aux').out[0].startsWith('USER'));eq(run('ps aux').out.length,pse.length);eq(run('ps -f').out.length,3);ok(run('ps -q').err.length===1);
  const pid=l=>+l.trim().split(/\s+/)[0];ok(pid(run('ps').out[2])>pid(ps[2]),'her komut yeni PID alır');
  // doğrulayıcı düzeltmeleri: ps -e komut adı (sshd, kthreadd), yeni sürecin başlangıç saati model saatine eşit
  ok(pse.every(l=>!/[:\[\]]$/.test(l))&&pse.filter(l=>l.endsWith(' sshd')).length===2&&pse.some(l=>l.endsWith(' kthreadd')),'ps -e CMD sütunu yalın komut adı');
  {const{run:r3}=sh();for(let k=0;k<5;k++)r3('pwd');r3('touch zaman');const now=r3('ls -l zaman').out[0].match(/(\d\d:\d\d) zaman$/)[1],pf=r3('ps -ef').out,hm=s=>+s.slice(0,2)*60+ +s.slice(3),st=pf[pf.length-1].trim().split(/\s+/)[4];ok(/^\d\d:\d\d$/.test(st)&&hm(st)-hm(now)===2,'ps STIME model saatini izler: '+st+' / '+now);ok(pf[pf.length-2].includes(' 09:58 ')&&pf[pf.length-2].endsWith('-bash'));const pa=r3('ps aux').out;ok(!pa[pa.length-1].includes(' 09:58 ')&&pa[pa.length-2].includes(' 09:58 '));}
  // izinler
  {const{run:r2}=sh();r2('chmod 444 notlar.txt');r2('chmod +w notlar.txt');ok(r2('ls -l notlar.txt').out[0].startsWith('-rw-r--r--'),'chmod +w, umask 022 ile yalnız sahibe yazma verir');r2('chmod a+w notlar.txt');ok(r2('ls -l notlar.txt').out[0].startsWith('-rw-rw-rw-'));r2('chmod 7 notlar.txt');ok(r2('ls -l notlar.txt').out[0].startsWith('-------rwx'));r2('chmod 644 notlar.txt');
    r2('chmod a-x odev');eq(r2('ls odev').out,['rapor.md  veri.csv']);const l=r2('ls -l odev');eq(l.err.length,2);ok(l.err[0].includes('odev/rapor.md')&&l.err[0].includes('Erişim engellendi'));ok(l.out.slice(1).every(x=>x.includes('?????????')),'x olmadan ls -l ayrıntı gösteremez');r2('chmod 755 odev');eq(r2('ls -l odev').err,[]);
    ok(r2('ln /etc/shadow s').err[0].includes('izin verilmedi'));ok(r2('ln /etc/passwd p').err[0].includes('izin verilmedi'),'başkasının yazılamayan dosyasına sabit bağ yok (protected_hardlinks)');eq(r2('ln notlar.txt n2').err,[]);}
  ok(run('cat /etc/shadow').err[0].includes('Erişim engellendi'));ok(run('cd /root').err[0].includes('Erişim engellendi'));ok(run('touch /etc/x').err[0].includes('Erişim engellendi'));ok(run('chmod 777 /etc/passwd').err[0].includes('izin verilmedi'));eq(run('cat /etc/hostname').out,['acelya-lab']);
  run('chmod 000 notlar.txt');ok(run('cat notlar.txt').err[0].includes('Erişim engellendi'));eq(f.inspect('notlar.txt').modeString,'----------');run('chmod u+rw,go+r notlar.txt');eq(f.inspect('notlar.txt').octal,'644');eq(run('cat notlar.txt').out.length,2);
  run('chmod a-x odev');ok(run('cat odev/rapor.md').err[0].includes('Erişim engellendi'));eq(run('ls odev').out,['rapor.md  veri.csv']);ok(run('cd odev').err.length===1);run('chmod 755 odev');eq(run('cat odev/rapor.md').err,[]);
  run('chmod 555 odev');ok(run('touch odev/yeni').err[0].includes('Erişim engellendi'));ok(run('rm odev/veri.csv').err[0].includes('Erişim engellendi'));run('chmod u=rwx odev');eq(f.inspect('odev').octal,'755');ok(run('chmod 9z9 odev').err[0].includes('geçersiz kip'));
  // sabit bağ
  run('echo "önemli veri" > asil.txt');run('ln asil.txt yedek.txt');const a=f.inspect('asil.txt'),b=f.inspect('yedek.txt');eq(a.ino,b.ino);eq(a.nlink,2);eq(a.counted,2);eq(a.names,['/home/acelya/asil.txt','/home/acelya/yedek.txt']);
  const li=run('ls -li').out;ok(li.filter(l=>l.trim().startsWith(a.ino+' ')).length===2);const before=f.inodeCount();run('rm asil.txt');eq(f.inodeCount(),before,'veri duruyor');eq(run('cat yedek.txt').out,['önemli veri']);eq(f.inspect('yedek.txt').nlink,1);
  run('echo ek >> yedek.txt');eq(run('cat yedek.txt').out,['önemli veri','ek']);eq(f.inspect('yedek.txt').size,new TextEncoder().encode('önemli veri\nek\n').length);run('rm yedek.txt');eq(f.inodeCount(),before-1);eq(f.freed(),1);ok(run('ln odev odev2').err[0].includes('dizine sabit bağ'));
  // sembolik bağ
  run('echo veri > asil.txt');run('ln -s asil.txt kisayol');eq(run('cat kisayol').out,['veri']);eq(f.inspect('kisayol').type,'l');ok(f.inspect('kisayol').ino!==f.inspect('asil.txt').ino);eq(f.inspect('asil.txt').nlink,1);eq(run('readlink kisayol').out,['asil.txt']);ok(run('ls -l kisayol').out[0].startsWith('lrwxrwxrwx')&&run('ls -l kisayol').out[0].endsWith('kisayol -> asil.txt'));
  run('rm asil.txt');ok(run('cat kisayol').err[0].includes('Böyle bir dosya'));eq(f.inspect('kisayol').target,'asil.txt');run('ln -s kisayol2 kisayol2');ok(run('cat kisayol2').err[0].includes('sembolik bağ'));run('rm kisayol kisayol2');
  run('ln -s odev d');eq(run('ls d').out,['rapor.md  veri.csv']);eq(run('cat d/veri.csv').out.length,3);run('cd d');eq(run('pwd').out,['/home/acelya/odev']);run('cd ..');eq(run('pwd').out,['/home/acelya']);run('rm d');eq(run('ls odev').out,['rapor.md  veri.csv']);
  // mkdir, mv, cp, rm, rmdir
  run('mkdir -p x/y/z');eq(f.inspect('x').nlink,3);eq(f.inspect('x/y/z').nlink,2);ok(run('mkdir x').err[0].includes('Dosya var'));ok(run('rmdir x').err[0].includes('boş değil'));ok(run('rm x').err[0].includes('Bir dizin'));run('mv x/y .');eq(f.inspect('x').nlink,2);eq(f.inspect('y').nlink,3);ok(run('mv y y/z').err.length===1);
  const ino=f.inspect('notlar.txt').ino;run('mv notlar.txt x');eq(f.inspect('x/notlar.txt').ino,ino,'mv inode değiştirmez');run('cp x/notlar.txt notlar.txt');ok(f.inspect('notlar.txt').ino!==ino,'cp yeni inode');eq(run('cat notlar.txt').out,run('cat x/notlar.txt').out);
  run('cp -r odev kopya');eq(run('ls kopya').out,['rapor.md  veri.csv']);ok(f.inspect('kopya/rapor.md').ino!==f.inspect('odev/rapor.md').ino);ok(run('cp odev k2').err[0].includes('-r'));invariants(f,'ara');
  run('rm -r kopya x y');eq(run('ls').out,['calistir.sh  notlar.txt  odev']);ok(run('rm yok').err.length===1);eq(run('rm -f yok').err,[]);run('touch bos');eq(f.inspect('bos').size,0);eq(f.inspect('bos').octal,'644');run('mkdir d2');eq(f.inspect('d2').octal,'755');run('rmdir d2');run('rm bos');
  eq(run('echo a   b "c   d"').out,['a b c   d']);eq(run('cd').err,[]);run('cd /tmp');run('echo x > t');eq(run('cat /tmp/t').out,['x']);eq(run('ls -ld /tmp').out[0].slice(0,10),'drwxrwxrwt');run('cd ~/odev');eq(run('pwd').out,['/home/acelya/odev']);ok(run('rm -r ../odev').err.length===1);eq(run('cat ~/notlar.txt').out.length,2);
  run('echo gizli > /dev/null');eq(run('cat /dev/null').out,[]);ok(run('ls -l /dev/null').out[0].startsWith('crw-rw-rw-'));ok(run('ls | wc').err[0].includes('desteklenmiyor'));ok(run('foo').err[0].includes('komut bulunamadı'));ok(run('echo "a').err[0].includes('tırnak'));eq(run('').r.out,[]);eq(run('whoami').out,['acelya']);ok(run('help').out.length>5);ok(run('uname -a').out[0].includes('model'));ok(run('stat ~/notlar.txt').out.some(l=>l.includes('Bağ sayısı: 1')));
  // sistem çağrısı modeli: yerleşik komut süreç yaratmaz
  eq(run('cd /').sys,['chdir']);eq(run('pwd').sys,['getcwd']);const c=run('cat /etc/hostname').sys;eq(c.slice(0,2),['clone','execve']);eq(c.slice(-2),['exit_group','wait4']);ok(c.includes('openat')&&c.includes('read')&&c.includes('write'));ok(run('ls').r.builtin===false&&run('cd').r.builtin===true);
  invariants(f,'son');}
// Rastgele komut dizileri: değişmezler hiç bozulmamalı, hiçbir komut istisna atmamalı
const NAMES=['a','b','c','d1','d2','odev','notlar.txt','d1/a','d1/d2','d2/b','..','.','/tmp/a','/tmp','/proc/cpuinfo','/etc','~','x/y','yok/z','lnk','d1/lnk','/'];
for(let t=0;t<60;t++){const{f,run}=sh();for(let k=0;k<70;k++){const n=()=>NAMES[ri(0,NAMES.length-1)],cmds=[`touch ${n()}`,`mkdir ${n()}`,`mkdir -p ${n()}`,`rm ${n()}`,`rm -r ${n()}`,`rm -rf ${n()}`,`rmdir ${n()}`,`mv ${n()} ${n()}`,`cp ${n()} ${n()}`,`cp -r ${n()} ${n()}`,`ln ${n()} ${n()}`,`ln -s ${n()} ${n()}`,`echo hi > ${n()}`,`echo hi >> ${n()}`,`cd ${n()}`,`chmod ${['644','000','755','u-x','go+w','a=r'][ri(0,5)]} ${n()}`,`ls -la ${n()}`,`cat ${n()}`,`stat ${n()}`,'ps','ls -li'];run(cmds[ri(0,cmds.length-1)]);}
  invariants(f,'rastgele '+t);ok(typeof f.cwd()==='string'&&f.cwd().startsWith('/'));ok(f.inspect('/').ino===2);}
console.log(`G işletim sistemleri: ${checks.toLocaleString('tr-TR')} bağımsız zamanlama, sayfa değiştirme, TLB, serpiştirme, kilitlenme, Banker ve dosya sistemi kontrolü PASS`);

if(process.argv.includes('--browser')){
  const {createRequire}=await import('node:module');const {createServer}=await import('node:http');const {join,extname}=await import('node:path');const {fileURLToPath}=await import('node:url');
  const root=fileURLToPath(new URL('../',import.meta.url));
  const load=()=>{for(const dir of[root,...(process.env.NODE_PATH||'').split(':').filter(Boolean),'/opt/node-tools']){try{return createRequire(join(dir,'package.json'))('playwright');}catch(_){}}throw Error('playwright bulunamadı');};
  const {chromium}=load();
  const server=createServer((req,res)=>{const file=join(root,decodeURIComponent(new URL(req.url,'http://localhost').pathname));if(!file.startsWith(root)||!fs.existsSync(file)||fs.statSync(file).isDirectory()){res.writeHead(404).end();return;}res.setHeader('Content-Type',({'.html':'text/html; charset=utf-8','.js':'text/javascript; charset=utf-8','.css':'text/css; charset=utf-8'})[extname(file)]||'application/octet-stream');res.end(fs.readFileSync(file));});
  await new Promise(r=>server.listen(0,'127.0.0.1',r));let browser;const before=checks;
  try{browser=await chromium.launch();
    for(const[width,theme]of[[390,'light'],[1280,'dark']]){
      const ctx=await browser.newContext({viewport:{width,height:900},deviceScaleFactor:width===390?2:1}),page=await ctx.newPage();
      await page.addInitScript(t=>{localStorage.setItem('acelya-theme',t);localStorage.setItem('acelya-sound-muted','1');},theme);page.setDefaultTimeout(6000);
      const errors=[];page.on('pageerror',e=>errors.push(e.message));page.on('console',m=>{if(m.type()==='error'&&!/404/.test(m.text()))errors.push(m.text());});
      await page.goto(`http://127.0.0.1:${server.address().port}/isletim-sistemleri-ve-linux.html`);await page.waitForSelector('#cpuWaitMeas:not(:empty)');
      const click=id=>page.locator('#'+id).click(),read=async id=>(await page.locator('#'+id).textContent()).trim(),has=async(id,t)=>{const v=await read(id);assert(v.includes(t),`${id}: "${v}" içinde "${t}" yok (${width})`);checks++;},
        set=(id,v)=>page.locator('#'+id).evaluate((e,v)=>{if(e.type==='checkbox')e.checked=v;else e.value=v;e.dispatchEvent(new Event(e.tagName==='SELECT'||e.type==='checkbox'?'change':'input',{bubbles:true}));},v),
        noOverflow=async l=>{eq(await page.evaluate(()=>document.documentElement.scrollWidth-document.documentElement.clientWidth)<=0,true,'yatay taşma: '+l+' '+width);},
        painted=async id=>{ok(assertCanvasDrawn(await canvasInk(page,'#'+id),{minDistinct:3,label:id}),id+' boş çizildi');};
      eq(await page.evaluate(()=>document.documentElement.dataset.theme==='light'),theme==='light');
      // --- 01
      await has('cpuWaitMeas','12,75');await has('cpuWaitTheory','12,75');await has('cpuWaitDiff','0,00');await has('cpuResp','2,00');await has('cpuSwitches','12');await has('cpuBrute','24 sıranın');await painted('ganttCanvas');
      await set('cpuQ','10');await has('cpuWaitMeas','8,75');await set('cpuQ','1');await has('cpuQOut','1 birim');await set('cpuCs','3');await has('cpuCsTime','birim');await set('cpuCs','0');
      await click('cpuPreConvoy');eq(await page.locator('#cpuAlgo').inputValue(),'fcfs');await has('cpuWaitMeas','14,33');await has('cpuStatus','konvoy');await has('cpuBrute','P2 → P3 → P1');await set('cpuAlgo','sjf');await has('cpuWaitMeas','3,00');await has('cpuBrute','sayım bunu doğruluyor');
      await click('cpuPreStarve');await has('cpuStatus','25 birim bekledi');await set('cpuAging',true);await has('cpuStatus','Yaşlandırma kapalıyken');await has('cpuStatus','P1 (öncelik 2), 5 birim bekledi');for(const[s,w]of[[1,5],[4,10],[7,15],[10,20]]){await set('cpuAgeStep',String(s));await has('cpuStatus','P1 (öncelik 2), '+w+' birim bekledi');await has('cpuStatus','25 birim bekleme');}await set('cpuAgeStep','2');eq(await page.locator('#cpuAdd').isDisabled(),true);
      for(let i=0;i<5;i++)await click('cpuDel');eq(await page.locator('#cpuDel').isDisabled(),true);eq(await page.locator('#cpuTable tr').count(),1);await has('cpuWaitMeas','0,00');await click('cpuAdd');await set('cpuA2','30');await has('cpuStatus','boş kaldı');await has('cpuUtil','21,2 %');for(let i=0;i<4;i++)await click('cpuAdd');eq(await page.locator('#cpuTable tr').count(),6);
      await set('cpuB1','0');await has('cpuMsg','1–20');await set('cpuB1','21');await has('cpuMsg','1–20');await set('cpuB1','2,5');await has('cpuMsg','tam sayı');await set('cpuB1','20');eq(await read('cpuMsg'),'');await set('cpuA2','31');await has('cpuMsg','0–30');
      await click('cpuRandom');eq(await page.locator('#cpuTable tr').count(),5);for(const a of['fcfs','sjf','srtf','rr','prio']){await set('cpuAlgo',a);await has('cpuWaitDiff','0,00');}
      await click('cpuReset');await has('cpuWaitMeas','12,75');eq(await page.locator('#cpuAlgo').inputValue(),'rr');await noOverflow('cpu');
      // --- 02
      await click('tab-mem');await has('memFaults','9');await has('memPlus','10 (4 çerçeve)');await has('memStatus','Belady anomalisi');await has('memOpt','7');await has('memDistinct','5');await painted('memChart');
      await set('memFrames','4');await has('memFaults','10');await set('memAlgo','lru');await has('memFaults','8');await has('memStatus','yığın özelliklidir');await set('memFrames','1');await has('memFaults','12');await set('memFrames','7');await has('memFaults','5');await has('memPlus','8 çerçeve');
      await set('memAlgo','clock');await set('memFrames','3');ok(await page.locator('#memTable sub').count()>0);await click('memPreBook');await set('memAlgo','fifo');await has('memFaults','15');await set('memAlgo','opt');await has('memFaults','9');await click('memPreLoop');await set('memAlgo','lru');await has('memFaults','16');await has('memRate','100,0 %');
      await click('memFirst');await has('memFaultsNow','0 hata / 0 başvuru');await click('memNext');await has('memFaultsNow','1 hata / 1 başvuru');await page.locator('#memChart').click();await page.keyboard.press(' ');await has('memStepOut','2 / 16');await click('memPrev');await has('memStepOut','1 / 16');await click('memLast');await has('memStepOut','16 / 16');
      await set('memRefs','1 2 x');await has('memMsg','1–40');await set('memRefs','');await has('memMsg','1–40');await set('memRefs','5');eq(await read('memMsg'),'');await has('memFaults','1');await click('memRandom');await has('memStepOut','24 / 24');
      await has('vaVpn','1 (üst 4 bit)');await has('vaPa','0x8234');await set('vaAddr','FFFF');await has('vaPa','eşlenmemiş');await set('vaAddr','xyz');await has('vaMsg','onaltılık');await set('vaAddr','0x1234');eq(await read('vaMsg'),'');await set('vaPage','256');await has('vaVpn','18 (üst 8 bit)');await set('vaPage','4096');
      await has('tlbHitMeas','98,44 %');await has('tlbHitDiff','0,00 puan');await has('tlbEatMeas','102,56 ns');await has('tlbEatDiff','0,00 ns');await set('tlbKind','loop');await has('tlbHitMeas','0,00 %');await has('tlbEatMeas','201,00 ns');await set('tlbLoop','4');await has('tlbHitMeas','99,90 %');await set('tlbLoop','11');await set('tlbSize','16');await has('tlbHitDiff','0,00 puan');await set('tlbSize','1');await set('tlbLoop','1');await has('tlbHitDiff','0,00 puan');
      await set('tlbKind','rand');await set('tlbSize','4');await has('tlbHitTheory','≈ 36,36 %');await set('tlbMem','200');await has('tlbMemOut','200 ns');await set('tlbMem','50');
      await click('memReset');await has('memFaults','9');await has('tlbHitMeas','98,44 %');eq(await page.locator('#memRefs').inputValue(),'1 2 3 4 1 2 5 1 2 3 4 5');await noOverflow('mem');
      // --- 03
      await click('tab-sync');await has('raceCounter','0');await has('raceExpected','6');await has('racePExact','0,57 %');await has('raceReach','2 … 6');await painted('raceCanvas');await painted('dineCanvas');
      await click('raceWorst');await has('raceCounter','2');await has('raceLost','4');await has('raceStatus','4 güncelleme kayboldu');eq(await page.locator('#raceA').isDisabled(),true);
      await click('raceRestart');for(const b of['raceA','raceA','raceA','raceB','raceB','raceB'])await click(b);await has('raceCounter','2');await click('raceRestart');for(const b of['raceA','raceB','raceA','raceB','raceA','raceB'])await click(b);await has('raceCounter','1');await has('raceHist','A:r ← sayaç · B:r ← sayaç');
      await set('raceMutex',true);await has('racePMeas','100,0 %');await has('raceReach','yalnızca 6');await click('raceA');await click('raceB');await has('raceInfoB','Bloke');await click('raceWorst');await has('raceCounter','6');await has('raceLost','0');
      await set('raceMutex',false);for(const k of['1','6']){await set('raceK',k);await has('raceExpected',String(2*k));await click('raceWorst');await has('raceCounter',k==='1'?'1':'2');}await set('raceP','0.05');await has('racePOut','0,05');await set('raceP','1');await has('racePExact','0,00 %');await set('raceSeed','abc');await has('racePMeas','%');
      await has('dineStates','573 · 1');await has('dineState','İlerleme mümkün');await click('dineAll');await has('dineState','Kilitlenme');await has('dineCycle','F0 → ç1 → F1');eq(await page.locator('#dineCoffman li.is-on').count(),4);await click('dineP0');await has('dineState','Kilitlenme');await click('dineRestart');eq(await page.locator('#dineCoffman li.is-on').count(),2);
      await click('dineP0');await click('dineP0');await click('dineP0');await has('dineCount','3 adım · 1 öğün');await click('dineP0');await click('dineRandom');
      await set('dineStrategy','ordered');await has('dineStates','534 · 0');await has('dineFracMeas','0,0 %');await click('dineAll');await has('dineState','İlerleme mümkün');await has('dineCycle','yok');await set('dineStrategy','waiter');await click('dineAll');await has('dineState','İlerleme mümkün');await click('dineRandom');await has('dineState','İlerleme mümkün');
      for(const n of['3','6']){await set('dineN',n);eq(await page.locator('#dineBtns button').count(),+n);await set('dineStrategy','naive');await click('dineAll');await has('dineState','Kilitlenme');await has('dineFracDiff','puan');}
      await has('bkSafe','Güvenli');await has('bkSeq','P1 → P3 → P4 → P0 → P2');await has('bkCount','16 / 120');await has('bkReqOut','verilebilir');await click('bkApply');eq(await page.locator('#bkV0').inputValue(),'2');eq(await page.locator('#bkV2').inputValue(),'0');eq(await page.locator('#bkA1_0').inputValue(),'3');await has('bkSafe','Güvenli');await has('bkReqOut','en çok gereksinimi aşıyor');
      await set('bkProc','0');await set('bkR0','0');await set('bkR1','2');await set('bkR2','0');await has('bkReqOut','güvensiz olur');eq(await page.locator('#bkApply').isDisabled(),true);
      await click('bkPreUnsafe');await has('bkSafe','Güvensiz');await has('bkCount','0 / 120');await has('bkStatus','P0, P4');await set('bkV0','x');await has('bkMsg','0–9');await set('bkV0','3');await set('bkV1','3');await set('bkV2','2');await has('bkCount','16 / 120');await set('bkA0_0','9');await has('bkSafe','Geçersiz tablo');
      await click('syncReset');await has('bkCount','16 / 120');await has('raceExpected','6');await has('dineStates','573 · 1');eq(await page.locator('#raceMutex').isChecked(),false);await noOverflow('sync');
      // --- 04
      await click('tab-fs');await has('termPrompt','acelya@acelya-lab:~$');await has('inoLinks','1');await has('inoMode','-rw-r--r-- · 644 · acelya:acelya');
      const type=async c=>{await page.locator('#termIn').fill(c);await page.keyboard.press('Enter');};
      await type('ls');await has('termOut','calistir.sh  notlar.txt  odev');ok(!(await read('termOut')).includes('.bashrc'));await has('sysProc','evet');await type('ls -a');await has('termOut','.bashrc');await type('cat /proc/cpuinfo');await has('termOut','MODEL ÇIKTISI');await type('ps');ok(!(await read('termOut')).includes('init'));await type('ps -e');await has('termOut','init');
      await type('cd odev');await has('termPrompt','~/odev$');await has('sysProc','yerleşik');await has('sysCount','1');await has('sysMode','2');await type('cd ..');await type('clear');eq(await read('termOut'),'');await page.locator('#termIn').focus();await page.keyboard.press('ArrowUp');await page.keyboard.press('ArrowUp');eq(await page.locator('#termIn').inputValue(),'cd ..');await page.locator('#termIn').fill('');
      await click('fsExpHard');await has('termOut','önemli veri');eq(await page.locator('#inoPath').inputValue(),'yedek.txt');await has('inoLinks','1');await has('inoCounted','1 ad');await type('ln yedek.txt bir.txt');await has('inoLinks','2');await has('inoCounted','2 ad');await has('inoNames','/home/acelya/bir.txt');
      await click('pm_ux');eq(await page.locator('#pmOctal').inputValue(),'744');await has('pmString','rwxr--r--');await set('pmOctal','600');eq(await page.locator('#pm_gr').isChecked(),false);await click('pmApply');await has('inoMode','-rw------- · 600');await set('pmOctal','89');await has('pmMsg','üç basamak');await set('pmOctal','000');await click('pmApply');await type('cat yedek.txt');await has('termOut','Erişim engellendi');await click('pmLoad');eq(await page.locator('#pmOctal').inputValue(),'000');
      await set('inoPath','yok.txt');await has('inoMsg','Böyle bir dosya');await set('inoPath','/proc/cpuinfo');await has('inoSize','0 bayt');await set('inoPath','/home');await has('inoCounted','3 (2 + alt dizin)');
      await click('fsExpSym');await has('termOut','kisayol -> asil.txt');await has('inoNum','sembolik bağ');await click('fsExpPerm');await has('termOut','Erişim engellendi');await click('fsExpProc');await has('termOut','/proc/uptime: Erişim engellendi');await has('termOut','/sbin/init');
      await click('fsReset');eq(await page.locator('#inoPath').inputValue(),'notlar.txt');await has('termOut','Model kabuk');await has('sysCount','—');await page.locator('details.os-more summary').click();await has('panel-fs','bağlam değiştirme sayılmaz');await noOverflow('fs');
      // --- klavye, etiketler
      await page.locator('#tab-fs').focus();await page.keyboard.press('Home');eq(await page.locator('#tab-cpu').getAttribute('aria-selected'),'true');await page.keyboard.press('ArrowRight');eq(await page.locator('#tab-mem').getAttribute('aria-selected'),'true');await page.keyboard.press('End');eq(await page.locator('#tab-fs').getAttribute('aria-selected'),'true');await page.keyboard.press('ArrowRight');eq(await page.locator('#tab-cpu').getAttribute('aria-selected'),'true');await page.keyboard.press('ArrowLeft');eq(await page.locator('#tab-fs').getAttribute('aria-selected'),'true');
      eq(await page.locator('[role=tabpanel]:not([hidden])').count(),1);
      await click('tab-cpu');await click('cpuPreConvoy');await page.locator('#ganttCanvas').click();await page.keyboard.press('r');await has('cpuWaitMeas','12,75');await page.locator('#cpuSeed').focus();await page.keyboard.press('r');await has('cpuWaitMeas','12,75');
      eq(await page.evaluate(()=>[...document.querySelectorAll('.app-content input,.app-content select,.app-content textarea')].filter(e=>!(e.id&&document.querySelector('label[for="'+e.id+'"]'))&&!e.getAttribute('aria-label')).map(e=>e.id)),[],'etiketsiz denetim');
      eq(await page.evaluate(()=>[...document.querySelectorAll('.app-content button')].filter(b=>!b.textContent.trim()).length),0,'adsız düğme');
      eq(await page.evaluate(()=>[...document.querySelectorAll('.app-content canvas')].every(c=>c.getAttribute('role')==='img'&&c.getAttribute('aria-label'))),true);
      eq(await page.evaluate(()=>/[̀-ͯ]/.test(document.querySelector('.app-content').textContent.normalize('NFC'))),false,'birleşik işaret');
      eq(await page.evaluate(()=>{try{window.OsLab.schedule=1;}catch(_){}return typeof window.OsLab.schedule;}),'function');
      for(const t of['cpu','mem','sync','fs']){await click('tab-'+t);await noOverflow('son '+t);}
      eq(errors,[],'konsol hatası '+width);await ctx.close();}
    console.log(`G işletim sistemleri: ${(checks-before).toLocaleString('tr-TR')} tarayıcı kontrolü (390 px açık + 1280 px koyu) PASS`);
  }finally{await browser?.close();await new Promise(r=>server.close(r));}
}
