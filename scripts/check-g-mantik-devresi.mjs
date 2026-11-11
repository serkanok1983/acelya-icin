// Mantık devreleri laboratuvarı: çekirdeğin bağımsız denetimi.
// Başvurular sayfanın kendi yollarını yinelemez: JS'in bit işleçleri, kaba kuvvet örtü araması,
// zaman adımlı (olaysız) gecikme benzetimi, doğrudan dizi araması ve aritmetik.
import fs from 'node:fs';
import vm from 'node:vm';
import assert from 'node:assert/strict';
const html=fs.readFileSync(new URL('../mantik-devresi.html',import.meta.url),'utf8');
const source=html.split('/* KERNEL-BEGIN */')[1]?.split('/* KERNEL-END */')[0];
assert(source,'Çekirdek sınırları gerekli');
const context={window:{}};vm.createContext(context);vm.runInContext(source,context);
const K=context.window.LogicLab;let checks=0;
/* çekirdek ayrı bir vm bağlamında çalışır; dizileri JSON üzerinden karşılaştır */
const eq=(a,b,m)=>{const x=JSON.stringify(a),y=JSON.stringify(b);assert(x===y,(m?m+': ':'')+x+' ≠ '+y);checks++;},ok=(c,m)=>{assert(c,m);checks++;};
let seed=20261111;const rnd=()=>{seed=(seed*1664525+1013904223)>>>0;return seed/4294967296;},ri=n=>Math.floor(rnd()*n);

/* 1. Ayrıştırıcı: JS'in ! & ^ | işleçleri aynı öncelik sırasına sahiptir; eval bağımsız başvurudur. */
function randExpr(d){
  if(d<=0||rnd()<.25)return rnd()<.1?String(ri(2)):'ABCD'[ri(4)];
  const r=rnd();if(r<.2)return'!'+randExpr(d-1);if(r<.35)return'('+randExpr(d-1)+')';
  return randExpr(d-1)+' '+'&^|'[ri(3)]+' '+randExpr(d-1);
}
for(let i=0;i<600;i++){
  const e=randExpr(5),ast=K.parse(e),f=new Function('A','B','C','D','return ('+e+')&1;');
  for(let r=0;r<16;r++){const b=[r>>3&1,r>>2&1,r>>1&1,r&1];eq(K.evalAst(ast,b),f(...b),e);}
  /* aynı ifadenin başka yazımları ve yeniden yazdırılmış biçimi aynı tabloyu vermeli */
  const alt=e.replace(/&/g,()=>['·','*',' AND ',' VE ',' '][ri(5)]).replace(/\|/g,()=>['+',' OR ',' VEYA ','∨'][ri(4)]).replace(/\^/g,()=>['⊕',' XOR '][ri(2)]).replace(/!/g,()=>['¬','~','NOT ','DEĞİL '][ri(4)]);
  const v=[0,1,2,3];eq(K.table(K.parse(alt),v),K.table(ast,v),alt);eq(K.table(K.parse(K.show(ast)),v),K.table(ast,v));eq(K.table(K.parse(K.show(ast,true)),v),K.table(ast,v));
  eq(K.table(K.flatten(ast),v),K.table(ast,v));
}
const T=(s,v)=>K.table(K.parse(s),v||undefined).join('');
eq(T("A'B + AB'"),'0110');eq(T('A NAND B'),'1110');eq(T('A NOR B'),'1000');eq(T('A XNOR B'),'1001');eq(T('a nand b nand c'),T('!(!(A&B)&C)'));
eq(T('A + B C'),T('A | (B & C)'));eq(T('A ^ B + C'),T('(A^B)|C'));eq(T('A B ^ C'),T('(A&B)^C'));eq(T("(A+B)'"),'1000');eq(T('1'),'1');eq(T('A·0'),'00');eq(T('A(B+C)'),T('A&(B|C)'));eq(T("A''"),'01');
for(const[bad,pos]of[['',0],['A+',2],['(A',0],['A)',1],['A # B',2],['E',0],['()',0],["'A",0],['+A',0],['A B +',5],['A ! ',4],['AxB',1]]){try{K.parse(bad);assert.fail('hata bekleniyordu: '+bad);}catch(e){ok(e.logic===true,bad);eq(e.pos,pos,bad);ok(e.message.length>8);}}
assert.throws(()=>K.parse('A'.repeat(201)));checks++;
for(const[a,b,same]of[['!(A&B)','!A|!B',true],['!(A|B)','!A&!B',true],['A(B+C)','AB+AC',true],['A+AB','A',true],['A^B',"AB'+A'B",true],["AB+A'C+BC","AB+A'C",true],['A+BC','(A+B)(A+C)',true],['A+BC','(A+B)C',false],['A^B^C','A^(B^C)',true],['A NAND (B NAND C)','(A NAND B) NAND C',false]]){
  const c=K.compare(K.parse(a),K.parse(b));eq(c.equal,same,a+' / '+b);if(!same){ok(c.counter&&c.counter.a!==c.counter.b);eq(K.evalAst(K.parse(a),c.counter.bits),c.counter.a);eq(K.evalAst(K.parse(b),c.counter.bits),c.counter.b);}
}
eq(K.compare(K.parse('A+BC'),K.parse('(A+B)C')).counter.row,4);
const gs=K.gateStats(K.parse('AB + CD + !A'));eq([gs.gates,gs.depth,gs.inputs],[4,2,8]);

/* 2. Quine–McCluskey: bağımsız kaba kuvvet (asal kavramını kullanmayan küp araması). */
function brute(n,on,dc){
  const size=1<<n,allowed=new Set([...on,...dc]),cubes=[];
  for(let m=0;m<size;m++)for(let v=0;v<size;v++){if(v&m)continue;const cells=[];for(let x=0;x<size;x++)if((x&~m)===v)cells.push(x);if(cells.every(x=>allowed.has(x)))cubes.push({cells,lits:n-m.toString(2).split('1').length+1});}
  if(!on.length)return[0,0];
  for(let k=1;k<=size;k++){
    let best=Infinity;
    (function go(covered,left,lits){
      const m=on.find(x=>!covered.has(x));if(m===undefined){best=Math.min(best,lits);return;}
      if(!left||lits>=best)return;
      for(const c of cubes)if(c.cells.includes(m))go(new Set([...covered,...c.cells]),left-1,lits+c.lits);
    })(new Set(),k,0);
    if(best<Infinity)return[k,best];
  }
}
function checkMin(n,on,dc){
  for(const kind of['sop','pos']){
    const r=K.minimal(n,on,dc,kind),v=K.verifyCover(n,on,dc,r.cover,kind);eq(v.ok,true);
    for(let x=0;x<(1<<n);x++)if(!dc.includes(x))eq(K.evalCover(r.cover,x,kind),+on.includes(x));
    const off=[];for(let x=0;x<(1<<n);x++)if(!on.includes(x)&&!dc.includes(x))off.push(x);
    const want=brute(n,kind==='sop'?on:off,dc);eq([r.terms,r.literals],want,`n=${n} on=${on} dc=${dc} ${kind}`);
    for(const sol of r.solutions){eq(sol.length,r.terms);eq(K.coverCost(sol,n).literals,r.literals);eq(K.verifyCover(n,on,dc,sol,kind).ok,true);}
    /* yazılan ifade ayrıştırılınca aynı işlevi vermeli */
    const tab=K.table(K.parse(K.coverText(r.cover,n,kind)),Array.from({length:n},(_,i)=>i));for(let x=0;x<(1<<n);x++)if(!dc.includes(x))eq(tab[x],+on.includes(x));
  }
}
for(let f=0;f<256;f++){const on=[];for(let x=0;x<8;x++)if(f>>x&1)on.push(x);checkMin(3,on,[]);}
for(let f=0;f<16;f++){const on=[];for(let x=0;x<4;x++)if(f>>x&1)on.push(x);checkMin(2,on,[]);}
for(let i=0;i<150;i++){const on=[],dc=[];for(let x=0;x<8;x++){const r=rnd();if(r<.4)on.push(x);else if(r<.6)dc.push(x);}checkMin(3,on,dc);}
for(let i=0;i<220;i++){const on=[],dc=[],pd=i%2?0:.2;for(let x=0;x<16;x++){const r=rnd();if(r<.45)on.push(x);else if(r<.45+pd)dc.push(x);}checkMin(4,on,dc);}
{const seg=K.minimal(4,[0,2,3,5,6,7,8,9],[10,11,12,13,14,15]);eq([seg.terms,seg.literals,seg.solutions.length],[4,6,1]);eq(K.coverText(seg.cover,4).split(' + ').sort(),['A','B·D','C','¬B·¬D']);
 const par=K.minimal(4,[1,2,4,7,8,11,13,14],[]);eq([par.terms,par.literals],[8,32]);
 const maj=K.minimal(3,[3,5,6,7],[]);eq([maj.terms,maj.literals],[3,6]);eq(K.coverCost(maj.cover,3).gates,4);eq(K.coverCost(K.canonicalCover(3,[3,5,6,7]),3),{terms:4,literals:12,termGates:4,join:1,nots:3,gates:8,inputs:19});
 eq(K.minimal(4,Array.from({length:16},(_,i)=>i),[]).constant,1);eq(K.coverText(K.minimal(3,[],[]).cover,3),'0');}
/* harita: Gray sırası ve grup parçaları */
for(const n of[2,3,4]){const k=K.kmap(n),seen=new Set();k.rows.forEach((_,r)=>k.cols.forEach((_,c)=>{seen.add(k.cell(r,c));const right=k.cell(r,(c+1)%k.cols.length),down=k.cell((r+1)%k.rows.length,c);for(const o of[right,down])if(o!==k.cell(r,c)){const d=o^k.cell(r,c);ok((d&(d-1))===0,'komşular tek bitte ayrılmalı');}}));eq(seen.size,1<<n);
  for(let m=0;m<(1<<n);m++)for(let v=0;v<(1<<n);v++){if(v&m)continue;const cells=new Set();for(const q of K.groupRects({v,m},n))for(let r=q.r0;r<=q.r1;r++)for(let c=q.c0;c<=q.c1;c++){ok(!cells.has(k.cell(r,c)));cells.add(k.cell(r,c));}const want=[];for(let x=0;x<(1<<n);x++)if((x&~m)===v)want.push(x);eq([...cells].sort((a,b)=>a-b),want);}}
eq(K.groupRects({v:0,m:0b1010},4).length,4);eq(K.groupRects({v:0b0101,m:0b1010},4).length,1);

/* 3. Kapı ağı: hazır devreler aritmetiğe ve tanımlara karşı. */
const tbl=name=>K.circuitTable(K.preset(name).nodes);
{const h=tbl('half');h.rows.forEach(r=>{const[a,b]=r.bits;eq(r.cells,[(a+b)&1,(a+b)>>1]);});
 const f=tbl('full');eq(f.rows.length,8);f.rows.forEach(r=>{const s=r.bits[0]+r.bits[1]+r.bits[2];eq(r.cells,[s&1,s>>1]);eq(r.fixed,1);});
 const m=tbl('mux');m.rows.forEach(r=>eq(r.cells,[r.bits[2]?r.bits[1]:r.bits[0]]));
 const x=tbl('xornand');x.rows.forEach(r=>eq(r.cells,[r.bits[0]^r.bits[1]]));ok(K.preset('xornand').nodes.filter(n=>n.type!=='IN'&&n.type!=='OUT').every(n=>n.type==='NAND'));
 const l=tbl('latch');eq(l.rows.map(r=>r.cells.join('')+r.fixed),['TT2','011','101','001']);eq(l.feedback.length,2);eq(K.depthOf(K.preset('latch').nodes),null);eq(K.depthOf(K.preset('full').nodes),3);eq(K.depthOf(K.preset('half').nodes),1);
 /* SR kilidi durum tutar: kur, bırak, sıfırla, bırak */
 const p=K.preset('latch'),S=p.nodes.find(n=>n.name==='A'),R=p.nodes.find(n=>n.name==='B'),Q=p.nodes.find(n=>n.name==='Q'),Qn=p.nodes.find(n=>n.name==='Qn');let st=p.state;
 const step=(s,r)=>{S.value=s;R.value=r;const res=K.settle(p.nodes,st);st=res.state;ok(res.stable);return[st[Q.id],st[Qn.id],res.race];};
 eq(step(0,0),[0,1,false]);eq(step(1,0),[1,0,false]);eq(step(0,0),[1,0,false]);eq(step(0,1),[0,1,false]);eq(step(0,0),[0,1,false]);eq(step(1,1),[0,0,false]);const race=step(0,0);ok(race[2]===true&&race[0]!==race[1],'simetrik bırakma yarış olarak çözülmeli');
 /* kendi girişine bağlı NOT: kararlı durum yok */
 const ring=[{id:'g',type:'NOT',ins:['g']},{id:'o',type:'OUT',ins:['g'],name:'Y'}];eq(K.settle(ring,{}).stable,false);eq(K.circuitTable(ring).rows[0].cells,['S']);
 /* rastgele döngüsüz ağlar: özyinelemeli değerlendirme ile karşılaştır */
 for(let t=0;t<120;t++){const nodes=[];for(let i=0;i<3;i++)nodes.push({id:'i'+i,type:'IN',name:'ABC'[i],value:0,ins:[]});const ng=2+ri(7);for(let i=0;i<ng;i++){const type=K.GATE_TYPES[ri(7)],pool=nodes.map(n=>n.id);nodes.push({id:'g'+i,type,ins:type==='NOT'?[pool[ri(pool.length)]]:[pool[ri(pool.length)],rnd()<.1?null:pool[ri(pool.length)]]});}nodes.push({id:'o',type:'OUT',name:'Y',ins:['g'+(ng-1)]});
  const by=Object.fromEntries(nodes.map(n=>[n.id,n])),f={AND:(a,b)=>a&b,OR:(a,b)=>a|b,NOT:a=>1-a,NAND:(a,b)=>1-(a&b),NOR:(a,b)=>1-(a|b),XOR:(a,b)=>a^b,XNOR:(a,b)=>1-(a^b)};
  const ct=K.circuitTable(nodes);ct.rows.forEach(r=>{const val=id=>id==null?0:by[id].type==='IN'?r.bits['ABC'.indexOf(by[id].name)]:f[by[id].type](...by[id].ins.map(val));eq(r.cells[0],val('g'+(ng-1)));
   nodes.slice(0,3).forEach((n,j)=>n.value=r.bits[j]);const s=K.settle(nodes,{});ok(s.stable&&!s.race);eq(s.state.o,r.cells[0]);});}
}

/* 4. Gecikme benzetimi: olaysız, zaman adımlı başvuru v_g(t) = f(girişler(t − d)). */
function reference(net,prev,next,horizon){
  const fn={and:v=>+v.every(Boolean),or:v=>+v.some(Boolean),xor:v=>v.reduce((a,b)=>a^b,0)};
  const hist={};net.inputs.forEach((s,i)=>hist[s]=t=>t<0?prev[i]:next[i]);
  const steady={};net.inputs.forEach((s,i)=>steady[s]=prev[i]);for(const g of net.gates)steady[g.out]=fn[g.type](g.ins.map(s=>steady[s]));
  const memo={};for(const g of net.gates){memo[g.out]=new Map();hist[g.out]=t=>{if(t<0)return steady[g.out];if(!memo[g.out].has(t))memo[g.out].set(t,fn[g.type](g.ins.map(s=>hist[s](t-g.d))));return memo[g.out].get(t);};}
  let settle=0,glitches=0;const final={};
  for(const o of net.outputs){let tr=0;for(let t=0;t<=horizon+1;t++)if(hist[o](t)!==hist[o](t-1)){tr++;settle=Math.max(settle,t);}final[o]=hist[o](horizon+1);glitches+=tr-(final[o]!==steady[o]?1:0);}
  return{settle,glitches,final,hist};
}
const longest=net=>{const a={};net.inputs.forEach(s=>a[s]=0);for(const g of net.gates)a[g.out]=g.d+Math.max(...g.ins.map(s=>a[s]));return Math.max(...net.outputs.map(o=>a[o]));};
for(const k of[1,2]){
  for(let n=1;n<=8;n++){
    const net=K.rippleAdder(n,k),c=K.compile(net),M=2**n;eq(K.netStats(net).gates,5*n);eq(longest(net),K.rippleFormula(n,k),'en uzun yol = formül');eq(c.horizon,longest(net));
    const pairs=n<=2?null:60;
    const one=(p,q)=>{const r=K.adderRun(c,p,q,true),ref=reference(net,K.adderInputs(n,p.a,p.b,p.cin),K.adderInputs(n,q.a,q.b,q.cin),c.horizon);
      eq(r.value,q.a+q.b+q.cin);eq(r.settle,ref.settle);eq(r.glitches,ref.glitches);ok(r.settle<=K.rippleFormula(n,k));
      for(const o of net.outputs){const w=r.waves[c.idx.get(o)];for(let t=-1;t<=c.horizon+1;t++)eq(K.waveAt(w,t),ref.hist[o](t));}};
    if(!pairs){for(let p=0;p<2*M*M;p++)for(let q=0;q<2*M*M;q++){const d=x=>({a:x%M,b:Math.floor(x/M)%M,cin:Math.floor(x/M/M)});one(d(p),d(q));}}
    else for(let i=0;i<pairs;i++)one({a:ri(M),b:ri(M),cin:ri(2)},{a:ri(M),b:ri(M),cin:ri(2)});
    /* elde zinciri çifti formüle ulaşır */
    eq(K.adderRun(c,{a:0,b:0,cin:1},{a:M-1,b:0,cin:1},false).settle,K.rippleFormula(n,k),`zincir n=${n} k=${k}`);
    const w=K.worstCase(c,{samples:1500});eq(w.settle,K.rippleFormula(n,k),`en kötü n=${n} k=${k}`);eq(w.exhaustive,n<=4);if(n<=4)eq(w.pairs,4**(2*n+1));
    const pr=K.adderRun(c,w.pair[0],w.pair[1],false);eq(pr.settle,w.settle);
  }
  const net=K.lookaheadAdder(k),c=K.compile(net),st=K.netStats(net);eq([st.gates,st.inputs,st.fanin],[26,68,5]);eq(longest(net),K.lookaheadFormula(k));
  for(let i=0;i<200;i++){const p={a:ri(16),b:ri(16),cin:ri(2)},q={a:ri(16),b:ri(16),cin:ri(2)},r=K.adderRun(c,p,q,true),ref=reference(net,K.adderInputs(4,p.a,p.b,p.cin),K.adderInputs(4,q.a,q.b,q.cin),c.horizon);eq(r.value,q.a+q.b+q.cin);eq(r.settle,ref.settle);eq(r.glitches,ref.glitches);}
  for(let a=0;a<16;a++)for(let b=0;b<16;b++)for(const cin of[0,1])eq(K.adderRun(c,{a:0,b:0,cin:0},{a,b,cin},false).value,a+b+cin);
  const w=K.worstCase(c);eq(w.settle,K.lookaheadFormula(k));eq(w.pairs,262144);
}
eq([K.rippleFormula(4,1),K.rippleFormula(4,2),K.rippleFormula(8,1),K.rippleFormula(1,2),K.lookaheadFormula(1),K.lookaheadFormula(2)],[9,10,17,4,4,6]);
eq(K.adderRun(K.compile(K.rippleAdder(4,1)),{a:15,b:15,cin:0},{a:15,b:0,cin:1},false).glitches,22);
eq(K.adderRun(K.compile(K.rippleAdder(4,1)),{a:0,b:0,cin:1},{a:15,b:0,cin:1},false).glitches,6);
assert.throws(()=>K.rippleAdder(9));assert.throws(()=>K.rippleAdder(4,3));checks+=2;

/* 5. Ardışıl mantık: rastgele uyarımlar, doğrudan tanımla karşılaştırma. */
function randomStim(sigs,n,grid){const ch=[],cur={CLK:0};sigs.forEach(s=>cur[s]=0);let t=0;for(let i=0;i<n;i++){t+=(1+ri(4))*grid;const s=rnd()<.45?'CLK':sigs[ri(sigs.length)];cur[s]^=1;ch.push({t:Math.round(t*1000)/1000,sig:s,v:cur[s]});}return ch;}
const at=(ch,sig,t,incl)=>{let v=0;for(const e of ch)if(e.sig===sig&&(incl?e.t<=t:e.t<t))v=e.v;return v;};
const rises=ch=>{const out=[];let c=0;for(const e of ch)if(e.sig==='CLK'){if(!c&&e.v)out.push(e.t);c=e.v;}return out;};
for(let trial=0;trial<200;trial++){
  const tsu=[0,.1,.2][trial%3];
  { const ch=randomStim(['D'],40,.25),r=K.seqRun('dpair',{init:{},changes:ch},{tsu}),ed=rises(ch);eq(r.edges.map(e=>e.t),ed);
    let viol=0;ed.forEach((t,i)=>{const lastD=Math.max(-Infinity,...ch.filter(e=>e.sig==='D'&&e.t<=t).map(e=>e.t)),bad=lastD===t||t-lastD<tsu;if(bad)viol++;eq(r.edges[i].violation,bad);eq(K.waveAt(r.waves.QF,t),bad?'X':at(ch,'D',t,false));
      const nextEdge=ed[i+1]??Infinity;for(const e of ch)if(e.t>t&&e.t<nextEdge)eq(K.waveAt(r.waves.QF,e.t),bad?'X':at(ch,'D',t,false),'flip-flop kenarlar arasında değişmemeli');});
    eq(r.violations,viol);
    /* kilit: saat 1 iken D'yi izler */
    for(const e of ch)if(at(ch,'CLK',e.t,true)===1)eq(K.waveAt(r.waves.QL,e.t),at(ch,'D',e.t,true)); }
  { const ch=randomStim(['J','K'],40,.25),r=K.seqRun('jk',{init:{},changes:ch},{tsu:0});let q=0;rises(ch).forEach((t,i)=>{if(r.edges[i].violation){q='X';}else{const j=at(ch,'J',t,false),k=at(ch,'K',t,false);q=j&&k?(q==='X'?'X':1-q):j?1:k?0:q;}eq(K.waveAt(r.waves.Q,t),q);}); }
  { const ch=randomStim(['T'],40,.5),r=K.seqRun('t',{init:{},changes:ch},{tsu:0});let q=0;rises(ch).forEach((t,i)=>{if(r.edges[i].violation)q='X';else if(q!=='X'&&at(ch,'T',t,false))q=1-q;eq(K.waveAt(r.waves.Q,t),q);}); }
  { const bits=3+trial%2,ch=randomStim(['EN'],60,.5),r=K.seqRun('counter',{init:{},changes:ch},{bits});let n=0;rises(ch).forEach(t=>{n=(n+at(ch,'EN',t,false))%(1<<bits);eq(r.outs.reduce((s,o,i)=>s+K.waveAt(r.waves[o],t)*2**i,0),n);});eq(r.outs.length,bits); }
  { const bits=3+trial%2,ch=randomStim(['D'],60,.5),r=K.seqRun('shift',{init:{},changes:ch},{bits}),ed=rises(ch);ed.forEach((t,i)=>{for(let b=0;b<bits;b++)eq(K.waveAt(r.waves['Q'+b],t),i-b>=0?at(ch,'D',ed[i-b],false):0);}); }
  { const len=2+ri(3),pattern=Array.from({length:len},()=>ri(2)).join(''),overlap=trial%2===0,stream=Array.from({length:40},()=>ri(2)).join('');
    const d=K.detectorRun(pattern,overlap,stream);let hits=0,lastEnd=-1;const z=[];for(let i=0;i<stream.length;i++){const m=i+1>=len&&stream.slice(i+1-len,i+1)===pattern&&(overlap||i-len+1>lastEnd);if(m){hits++;lastEnd=i;}z.push(+!!m);}
    eq(d.z,z,pattern+' '+overlap+' '+stream);eq(d.hits,hits);eq(d.machine.states,len+1);
    const ch=[];let cur=0;[...stream].forEach((b,i)=>{if(+b!==cur){ch.push({t:i+.25,sig:'X',v:+b});cur=+b;}ch.push({t:i+.5,sig:'CLK',v:1},{t:i+1,sig:'CLK',v:0});});
    const r=K.seqRun('fsm',{init:{},changes:ch},{pattern,overlap});eq(r.sampled.map(s=>s[0]).join(''),stream);z.forEach((v,i)=>eq(K.waveAt(r.waves.Z,i+.5),v)); }
}
{ /* SR kilidi */
  const r=K.seqRun('sr',{init:{},changes:[{t:1,sig:'S',v:1},{t:2,sig:'S',v:0},{t:3,sig:'R',v:1},{t:4,sig:'R',v:0},{t:5,sig:'S',v:1},{t:6,sig:'R',v:1},{t:7,sig:'S',v:0},{t:7,sig:'R',v:0},{t:8,sig:'S',v:1}]});
  eq([0,1,2,3,4,5,6,7,8].map(t=>K.waveAt(r.waves.Q,t)+''+K.waveAt(r.waves.Qn,t)),['01','10','10','01','01','10','00','XX','10']);
  const c16=K.seqRun('counter',{init:{EN:1},changes:Array.from({length:40},(_,i)=>({t:(i+1)/2,sig:'CLK',v:(i+1)%2}))},{bits:4});
  for(let b=0;b<4;b++){const up=c16.waves['Q'+b].slice(1).filter(p=>p[1]===1).map(p=>p[0]);if(up.length>1)eq(up[1]-up[0],2**(b+1));}
  eq(K.kmpTable('101').next,[[0,1],[2,1],[0,3],[2,1]]);eq(K.kmpTable('101',false).next[3],[0,1]);eq(K.kmpTable('1011').flipflops,3);eq(K.kmpTable('11').flipflops,2);
  assert.throws(()=>K.kmpTable('12'));assert.throws(()=>K.seqRun('zz',{changes:[]}));assert.throws(()=>K.seqRun('t',{changes:[{t:-1,sig:'T',v:1}]}));checks+=3;
}
{ /* doğrulayıcı: kurulum sınırı kayan nokta yuvarlamasına bağlı olmamalı; tam t_k önceki değişim temiz, daha yakını ihlal */
  for(let i=1;i<=20;i++)for(let j=0;j<=20;j++){const r=K.seqRun('dpair',{init:{},changes:[{t:.25,sig:'D',v:1},{t:.5,sig:'CLK',v:1},{t:1,sig:'CLK',v:0},{t:1.5-i/100,sig:'D',v:0},{t:1.5,sig:'CLK',v:1}]},{tsu:j/100});eq(r.violations,+(j>i),'sınır i='+i+' j='+j);}
}
ok(Object.isFrozen(K));
console.log(`G mantık devresi: ${checks.toLocaleString('tr-TR')} bağımsız ayrıştırma, sadeleştirme, ağ, gecikme ve ardışıl mantık kontrolü PASS`);

if(process.argv.includes('--browser')){
  const {chromium}=await import('playwright');const {createServer}=await import('node:http');const {join,extname}=await import('node:path');const {fileURLToPath}=await import('node:url');const root=fileURLToPath(new URL('../',import.meta.url));
  const server=createServer((req,res)=>{const file=join(root,decodeURIComponent(new URL(req.url,'http://localhost').pathname));if(!fs.existsSync(file)||fs.statSync(file).isDirectory()){res.writeHead(404).end();return;}res.setHeader('Content-Type',({'.html':'text/html; charset=utf-8','.js':'text/javascript; charset=utf-8','.css':'text/css; charset=utf-8'})[extname(file)]||'application/octet-stream');res.end(fs.readFileSync(file));});await new Promise(r=>server.listen(0,'127.0.0.1',r));let browser;
  try{browser=await chromium.launch();const before=checks;
  for(const[width,theme]of[[390,'light'],[1280,'dark']]){
    const page=await browser.newPage({viewport:{width,height:900},deviceScaleFactor:width===390?2:1,hasTouch:width===390});await page.addInitScript(t=>{localStorage.setItem('acelya-theme',t);localStorage.setItem('acelya-sound-muted','1');},theme);page.setDefaultTimeout(8000);
    const errors=[];page.on('pageerror',e=>errors.push(e.message));page.on('console',m=>{if(m.type()==='error'&&!/404/.test(m.text()))errors.push(m.text());});
    await page.goto(`http://127.0.0.1:${server.address().port}/mantik-devresi.html`);
    const click=id=>page.locator('#'+id).click(),read=id=>page.locator('#'+id).textContent(),has=async(id,text)=>{const t=await read(id);assert(t.includes(text),`${id}: “${t}” içinde “${text}” yok (${width})`);checks++;},
      fill=async(id,v)=>{await page.locator('#'+id).fill(v);},range=(id,v)=>page.locator('#'+id).evaluate((e,v)=>{e.value=v;e.dispatchEvent(new Event('input',{bubbles:true}));},v),sel=(id,v)=>page.locator('#'+id).selectOption(v),
      noflow=async tag=>{eq(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),true,'yatay taşma: '+tag+' '+width);},painted=async id=>{ok(await page.locator('#'+id).evaluate(c=>{const d=c.getContext('2d').getImageData(0,0,c.width,c.height).data,seen=new Set();for(let i=0;i<d.length;i+=4*97)seen.add(d[i]+','+d[i+1]+','+d[i+2]);return seen.size>2;}),id+' boş');};
    /* 1. sekme */
    await has('exEq','4 / 4');await has('exStatus','Özdeş: iki ifade 4 satırın 4');await has('exVars','2 / 4');await has('exOnes','3 / 4');await has('exGates','2 / 2');await has('exLists','F₁ = Σm(0, 1, 2) = ΠM(3)');await painted('exCanvas');
    for(const[id,res]of[['exDM2','4 / 4'],['exDist','8 / 8'],['exAbs','4 / 4'],['exXor','4 / 4'],['exCons','8 / 8']]){await click(id);await has('exEq',res);await has('exStatus','Özdeş:');}
    await click('exWrong');await has('exEq','6 / 8');await has('exStatus','İlk karşı örnek satır 4 (A = 1, B = 0, C = 0): ifade 1 → 1, ifade 2 → 0');eq(await page.locator('#exRows td.is-bad').count(),2);
    await fill('exA','A + ');await has('exErrA','sağında bir terim eksik');await has('exVars','—');await fill('exA','A # B');await has('exErrA','3. karakterde tanınmayan simge');await fill('exA','(A + B');await has('exErrA','kapatılmamış');
    await fill('exA',"a'b + c d");await fill('exB','');await has('exEq','İfade 2 yok');await has('exVars','4 / 16');await has('exParsed','(¬A·B) + (C·D)');eq(await page.locator('#exErrA').isHidden(),true);
    await range('exRow',7);await has('exRowOut','satır 7 · 0111');eq(await page.locator('#exRows tr.is-now th').textContent(),'7');
    await fill('exA','1');await has('exVars','0 / 1');await has('exOnes','1 / 1');
    await click('exprReset');await has('exEq','4 / 4');eq(await page.locator('#exA').inputValue(),'¬(A·B)');await noflow('expr');
    /* 2. sekme */
    await click('tab-build');await has('edMatch','8 / 8');await has('edGates','2 / 6');await has('edFeedback','yok');await painted('edCanvas');
    await page.locator('#edInputs button').nth(0).click();await page.locator('#edInputs button').nth(1).click();await has('edStatus','S = 0, E = 1');eq(await page.locator('#edRows tr.is-now').textContent(),'1101');
    for(const[p,match,gates]of[['full','16 / 16','5 / 12'],['mux','8 / 8','4 / 8'],['xornand','4 / 4','4 / 9']]){await sel('edPreset',p);await click('edLoad');await has('edMatch',match);await has('edGates',gates);await has('edStatus','hepsinde uyuşuyor');}
    await has('edExprs','Y = ¬A·B + A·¬B');
    await sel('edPreset','latch');await click('edLoad');await has('edFeedback','var · 2 kapı döngüde');await has('edDepth','tanımsız');await has('edStatus','Q = 0, Qn = 1');eq(await page.locator('#edRows tr').first().textContent(),'00TT');
    const toggle=async i=>page.locator('#edInputs button').nth(i).click();
    await toggle(0);await has('edStatus','Q = 1, Qn = 0');await toggle(0);await has('edStatus','Q = 1, Qn = 0');await toggle(1);await has('edStatus','Q = 0, Qn = 1');await toggle(1);await has('edStatus','Q = 0, Qn = 1');await has('edStatus','devre bit saklıyor');
    /* klavye yolu: sıfırdan NAND kur, hedefle karşılaştır */
    await click('edClear');await has('edGates','0 / 0');await click('edAddIN');await click('edAddIN');await click('edAddNAND');await click('edAddOUT');await has('edStatus','giriş pimi bağlı değil');
    const opt=async(id,text)=>{const v=await page.locator(`#${id} option`).evaluateAll((os,t)=>os.find(o=>o.textContent.includes(t))?.value,text);assert(v,'seçenek yok: '+text);await sel(id,v);};
    await opt('edSrc','A girişi');await opt('edDst','K1 · NAND · 1. giriş');await click('edConnect');await opt('edSrc','B girişi');await opt('edDst','K1 · NAND · 2. giriş');await click('edConnect');await opt('edSrc','K1 · NAND');await opt('edDst','Y çıkışı');await click('edConnect');
    await has('edGates','1 / 3');await fill('edTarget','Y = !(A B)');await has('edMatch','4 / 4');await fill('edTarget','Y = A + B');await has('edMatch','2 / 4');await has('edStatus','Hedefle uyuşmuyor');await fill('edTarget','Q = A');await has('edTargetErr','adlı bir çıkış yok');await fill('edTarget','Y = A C');await has('edTargetErr','C girişi yok');await fill('edTarget','');
    await opt('edSel','Y çıkışı');await fill('edName','F');await click('edRename');await has('edHead','F');
    await click('edUndo');await has('edHead','Y');await opt('edSel','K1 · NAND');await click('edDelete');await has('edGates','0 / 0');await click('edUndo');await has('edGates','1 / 3');
    /* işaretçi yolu: çıkış pimine, sonra giriş pimine dokunarak bağla; gövdeye dokunarak anahtarı çevir */
    await click('edAddNOT');const geo=await page.evaluate(()=>{const c=document.getElementById('edCanvas').getBoundingClientRect();return{x:c.left,y:c.top,s:Math.min(c.width/620,c.height/400),ox:(c.width-620*Math.min(c.width/620,c.height/400))/2,oy:(c.height-400*Math.min(c.width/620,c.height/400))/2};});
    await page.evaluate(()=>document.getElementById('edCanvas').scrollIntoView({block:'center'}));const g2=await page.evaluate(()=>{const c=document.getElementById('edCanvas').getBoundingClientRect();return{x:c.left,y:c.top};});
    const P=(wx,wy)=>[g2.x+geo.ox+wx*geo.s,g2.y+geo.oy+wy*geo.s],tap=async(wx,wy)=>{const[x,y]=P(wx,wy);await page.mouse.click(x,y);};
    /* K1 (NAND) 150,20 boyut 58x40 → çıkış pimi (208,40); K2 (NOT) 250,20 → giriş pimi (250,40) */
    await tap(208,40);await has('edStatus','Kaynak seçildi: K1 · NAND');await tap(250,40);await has('edStatus','Bağlandı: K1 · NAND → K2 · NOT');await has('edGates','2 / 4');
    await tap(44,35);await has('edStatus','0 adımda yerleşti').catch(async()=>{await has('edStatus','yerleşti');});eq(await page.locator('#edInputs button').first().getAttribute('aria-pressed'),'true');
    /* sürükleyerek bağla: K2 çıkışı (308,40) → Y girişi (550,35) */
    {const[a,b]=P(308,40),[c2,d]=P(550,35);await page.mouse.move(a,b);await page.mouse.down();await page.mouse.move((a+c2)/2,(b+d)/2,{steps:4});await page.mouse.move(c2,d,{steps:4});await page.mouse.up();}
    await has('edStatus','Bağlandı: K2 · NOT → Y çıkışı');await fill('edTarget','Y = A B');await has('edMatch','4 / 4');
    /* kendi girişine bağlı NOT salınır */
    await click('edClear');await click('edAddNOT');await opt('edSrc','K1 · NOT');await opt('edDst','K1 · NOT');await click('edConnect');await has('edStatus','Devre salınıyor');
    for(let i=0;i<5;i++)await click('edAddIN').catch(()=>{});eq(await page.locator('#edAddIN').isDisabled(),true);
    await click('buildReset');await has('edMatch','8 / 8');eq(await page.locator('#edUndo').isDisabled(),true);await noflow('build');
    /* 3. sekme */
    await click('tab-kmap');await has('kmResult','F = C + A + ¬B·¬D + B·D');await has('kmBefore','8 / 32 / 13');await has('kmAfter','4 / 6 / 5');await has('kmSaving','44 → 12');await has('kmVerify','10 / 10');await has('kmStatus','1 grup haritanın kenarından sarıyor (¬B·¬D)');await painted('kmCanvas');await painted('kmOverlay');
    await sel('kmKind','pos');await has('kmResult','(¬B + C + D)·(A + B + C + ¬D)');await has('kmVerify','10 / 10');await sel('kmKind','sop');
    await click('kmMaj');await has('kmResult','B·C');await has('kmAfter','3 / 6 / 4');await has('kmBefore','4 / 12 / 8');await has('kmVerify','8 / 8');eq(await page.locator('#kmGrid button').count(),8);
    await click('kmChecker');await has('kmAfter','8 / 32 / 13');await has('kmSaving','44 → 44');await click('kmCorners');await has('kmResult','F = ¬B·¬D');await has('kmStatus','sarıyor');
    await click('kmZero');await has('kmResult','F = 0');await has('kmStatus','hiç 1 yok');await click('kmCell5');await has('kmResult','F = ¬A·B·¬C·D');await click('kmCell5');eq(await page.locator('#kmCell5').getAttribute('data-v'),'X');await has('kmResult','F = 0');await click('kmCell5');eq(await page.locator('#kmCell5').getAttribute('data-v'),'0');
    await page.locator('#kmCell7').focus();await page.keyboard.press('Enter');await has('kmResult','F = ¬A·B·C·D');
    await fill('kmExpr','A B + !C D');await click('kmFill');await has('kmResult','A·B');await has('kmVerify','16 / 16');await sel('kmN','2');await has('kmResult','F = B + A');await fill('kmExpr','A C');await click('kmFill');await has('kmErr','C değişkenini kullanıyor');await fill('kmExpr','A +');await click('kmFill');await has('kmErr','eksik');
    await click('kmapReset');await has('kmResult','F = C + A + ¬B·¬D + B·D');eq(await page.locator('#kmErr').isHidden(),true);await noflow('kmap');
    /* 4. sekme */
    await click('tab-adder');await page.waitForFunction(()=>!document.querySelector('#panel-adder').textContent.includes('ölçülüyor'),null,{timeout:30000});
    await has('adSettle','9 τ = 90 ns');await has('adWorst','9 τ = 90 ns');await has('adFormula','9 τ = 90 ns');await has('adDiff','0 τ');await has('adGlitch','6');await has('adSum','16 / 16 · tutuyor');await has('adStatus','C₁: 3 τ, C₂: 5 τ, C₃: 7 τ, C₄: 9 τ');await has('adCmp','20');await has('adCmp','26');await has('adCmp','68');await has('adCmp','4 τ = 40 ns');await painted('adChain');await painted('adTiming');
    for(const[n,k,f]of[[1,1,'3 τ'],[2,1,'5 τ'],[3,2,'8 τ'],[8,1,'17 τ'],[8,2,'18 τ'],[6,1,'13 τ']]){await sel('adK',String(k));await range('adN',n);await page.waitForFunction(()=>!document.querySelector('#panel-adder').textContent.includes('ölçülüyor'),null,{timeout:30000});await has('adFormula',f+' =');await has('adWorst',f+' =');await has('adSettle',f+' =');await has('adDiff','0 τ');await has('adSum','tutuyor');}
    await sel('adK','1');await range('adN',4);await range('adTau',20);await has('adSettle','9 τ = 180 ns');await range('adTau',1);await has('adFormula','9 τ = 9 ns');
    await click('adGlitchBtn');await has('adGlitch','22');await has('adSum','16 / 16');ok(!(await read('adStatus')).includes('getirildi'),'yapı değişmediyse not yazılmamalı');await sel('adArch','cla');await click('adGlitchBtn');await has('adStatus','yapı dalgalı eldeye getirildi');eq(await page.locator('#adArch').inputValue(),'ripple');await has('adGlitch','22');await range('adN',6);await click('adGlitchBtn');await has('adStatus','bit sayısı 4\'e getirildi');await has('adNOut','4 bit');await click('adSearch');await has('adSettle','9 τ');
    await fill('adA1','16');await has('adErr','Sonraki A 0 ile 15 arasında');await has('adSettle','—');await fill('adA1','x');await has('adErr','tam sayı');await fill('adA1','7');eq(await page.locator('#adErr').isHidden(),true);
    await fill('adA0','7');await fill('adB0','0');await fill('adB1','0');await page.locator('#adC0').setChecked(true);await page.locator('#adC1').setChecked(true);await has('adSettle','0 τ · çıkış değişmedi');await has('adGlitch','0');
    await sel('adArch','cla');await page.waitForFunction(()=>!document.querySelector('#panel-adder').textContent.includes('ölçülüyor'),null,{timeout:30000});await has('adFormula','4 τ');await has('adWorst','4 τ');await has('adSettle','4 τ');eq(await page.locator('#adN').isDisabled(),true);await sel('adK','2');await page.waitForFunction(()=>!document.querySelector('#panel-adder').textContent.includes('ölçülüyor'),null,{timeout:30000});await has('adFormula','6 τ');await has('adWorst','6 τ');await has('adCmp','10 τ');
    await click('adRandom');await has('adSum','tutuyor');await range('adTime',3);await has('adTimeOut','t = 3 τ');await click('adPlay');eq(await page.locator('#adPlay').getAttribute('aria-pressed'),'true');await page.waitForFunction(()=>document.getElementById('adPlay').getAttribute('aria-pressed')==='false',null,{timeout:15000});checks++;
    await click('adderReset');await page.waitForFunction(()=>!document.querySelector('#panel-adder').textContent.includes('ölçülüyor'),null,{timeout:30000});await has('adSettle','9 τ = 90 ns');eq(await page.locator('#adA1').inputValue(),'15');await noflow('adder');
    /* 5. sekme */
    await click('tab-seq');await has('sqEdges','0 / 0');await has('sqNow','kilit Q = 0, flip-flop Q = 0');await painted('sqTiming');await painted('sqDiagram');
    await click('sqIn0');await has('sqNow','kilit Q = 0, flip-flop Q = 0');await click('sqClk');await has('sqNow','kilit Q = 1, flip-flop Q = 1');await click('sqIn0');await has('sqNow','kilit Q = 0, flip-flop Q = 1');await has('sqM1','1 / 0');await click('sqClk');await click('sqPulse');await has('sqNow','kilit Q = 0, flip-flop Q = 0');await has('sqEdges','2 / 0');await has('sqM2','2 / 2');
    await click('sqDemo');await has('sqEdges','4 / 0');await has('sqM1','5 / 0');await has('sqM2','4 / 4');await click('sqViolate');await has('sqEdges','4 / 1');await has('sqStatus','kurulum penceresi');await has('sqStatus','(2. kenar)');await has('sqStatus','taralı bölge');await range('sqTsu',.05);await has('sqEdges','4 / 0');await range('sqTsu',.06);await has('sqEdges','4 / 1');await range('sqTsu',.1);await range('sqTsu',0);await has('sqEdges','4 / 0');await click('sqViolate');await has('sqEdges','4 / 1');await range('sqTsu',.1);
    await sel('sqKind','sr');eq(await page.locator('#sqClk').isHidden(),true);await click('sqIn0');await has('sqNow','Q = 1, Qn = 0');await click('sqIn0');await has('sqNow','Q = 1, Qn = 0');await click('sqIn1');await has('sqNow','Q = 0, Qn = 1');await click('sqIn0');await has('sqM1','hayır');await has('sqM2','1');await click('sqDemo');await has('sqNow','Q = 1, Qn = 0');await has('sqM2','1');
    await sel('sqKind','jk');await click('sqDemo');await has('sqEdges','6 / 0');await has('sqM1','4');await has('sqM2','4');await click('sqViolate');await has('sqEdges','4 / 1');
    await sel('sqKind','t');await click('sqDemo');await has('sqM1','6');await has('sqM2','6');await click('sqIn0');await click('sqPulse');await has('sqM1','7');
    await sel('sqKind','counter');await click('sqDemo');await has('sqEdges','26 / 0');await has('sqNow','1010₂ = 10');await has('sqM1','2; 4; 8; 16');await has('sqM2','2; 4; 8; 16');await sel('sqBits','3');await has('sqNow','000₂ = 0');await click('sqDemo');await has('sqNow','110₂ = 6');await has('sqM1','2; 4; 8');for(let i=0;i<3;i++)await click('sqPulse');await has('sqNow','001₂ = 1');await click('sqIn0');await click('sqPulse');await has('sqNow','001₂ = 1');
    await sel('sqKind','shift');await sel('sqBits','4');await click('sqDemo');await has('sqM1','0 0 0 0');await has('sqM2','0 0 0 0');await click('sqIn0');await click('sqPulse');await click('sqIn0');await click('sqPulse');await has('sqM1','0 1 0 0');await has('sqM2','0 1 0 0');
    await sel('sqKind','fsm');await click('sqDemo');await has('sqStatus','Okunan dizi: 1101011010');await has('sqM1','3');await has('sqM2','3');await sel('sqOverlap','0');await click('sqDemo');await has('sqM1','2');await has('sqM2','2');await fill('sqPattern','11');await click('sqDemo');await has('sqM1','2');await has('sqM2','2');await fill('sqPattern','12');await has('sqErr','2–4 bitlik');await fill('sqPattern','1011');await has('sqRows','D₄');
    /* otomatik saat gerçek zamanda ilerler */
    await sel('sqKind','t');await click('sqIn0');await range('sqPeriod',.5);await page.locator('#sqAuto').setChecked(true);await page.waitForFunction(()=>parseInt(document.getElementById('sqEdges').textContent)>=3,null,{timeout:15000});checks++;await page.locator('#sqAuto').setChecked(false);const e1=await read('sqEdges');await page.waitForTimeout(700);eq(await read('sqEdges'),e1);
    await click('seqReset');await has('sqEdges','0 / 0');eq(await page.locator('#sqKind').inputValue(),'dpair');eq(await page.locator('#sqPeriod').inputValue(),'2');await noflow('seq');
    /* sekme klavyesi, R tuşu, etiketler */
    await page.locator('#tab-seq').focus();await page.keyboard.press('Home');eq(await page.locator('#tab-expr').getAttribute('aria-selected'),'true');await page.keyboard.press('ArrowRight');eq(await page.locator('#tab-build').getAttribute('aria-selected'),'true');await page.keyboard.press('End');eq(await page.locator('#tab-seq').getAttribute('aria-selected'),'true');await page.keyboard.press('ArrowRight');eq(await page.locator('#tab-expr').getAttribute('aria-selected'),'true');await page.keyboard.press('ArrowLeft');eq(await page.locator('#tab-seq').getAttribute('aria-selected'),'true');
    await click('tab-kmap');await click('kmZero');await page.locator('h1').click();await page.keyboard.press('r');await has('kmResult','F = C + A');
    eq(await page.evaluate(()=>[...document.querySelectorAll('main input,main select')].filter(e=>!(e.labels&&e.labels.length)&&!e.getAttribute('aria-label')).map(e=>e.id)),[]);
    eq(await page.evaluate(()=>[...document.querySelectorAll('main canvas')].filter(c=>c.getAttribute('role')!=='img'&&c.getAttribute('aria-hidden')!=='true').length),0);
    eq(await page.evaluate(()=>Object.isFrozen(LogicLab)&&!Object.getOwnPropertyDescriptor(window,'LogicLab').writable),true);eq(await page.evaluate(()=>/[̀-ͯ⃗]/.test(document.querySelector('main').textContent.normalize('NFC').replace(/[çğıöşüÇĞİÖŞÜ]/g,''))),false);
    assert.deepEqual(errors,[]);checks++;await page.close();
  }
  console.log(`G mantık devresi: ${checks-before} tarayıcı kontrolü (390 açık / 1280 koyu; beş sekme, hazırlar, sınırlar, klavye, işaretçi) PASS`);
  }finally{await browser?.close();await new Promise(r=>server.close(r));}
}
