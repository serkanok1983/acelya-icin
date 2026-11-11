// Kalıcı denetim: bilgisayar-sistemleri-ve-mimarisi.html çekirdeği (window.ArchLab).
// Başvurular sayfanın kendi kodunu yinelemez: BigInt aritmetiği, DataView, Number.prototype.toFixed'in tam
// ondalık açılımı, bilinen IEEE 754 sabitleri, ikinci bir sıralı yorumlayıcı, aşama zamanlarını yineleme
// bağıntısıyla kuran ikinci bir boru hattı modeli, zaman damgalı kaba kuvvet LRU ve kapalı biçimler.
// `--browser` ile gerçek tarayıcıda arayüz denetimleri de çalışır (390 px aydınlık, 1280 px karanlık).
import fs from 'node:fs';
import vm from 'node:vm';
import assert from 'node:assert/strict';
const html=fs.readFileSync(new URL('../bilgisayar-sistemleri-ve-mimarisi.html',import.meta.url),'utf8');
const source=html.split('/* KERNEL-BEGIN */')[1]?.split('/* KERNEL-END */')[0];
assert(source,'KERNEL-BEGIN / KERNEL-END sınırları gerekli');
const context={window:{}};vm.createContext(context);vm.runInContext(source+';globalThis.K=window.ArchLab;',context);
const K=context.K;let checks=0;
const plain=v=>JSON.parse(JSON.stringify(v,(k,x)=>typeof x==='bigint'?x.toString():x));
const eq=(a,b,msg)=>{assert.deepEqual(plain(a),plain(b),msg||`${JSON.stringify(plain(a))} ≠ ${JSON.stringify(plain(b))}`);checks++;};
const ok=(v,msg)=>{assert(v,msg);checks++;};
let seed=20261111;const rnd=()=>{seed^=seed<<13;seed^=seed>>>17;seed^=seed<<5;seed>>>=0;return seed/4294967296;};
const ri=(a,b)=>a+Math.floor(rnd()*(b-a+1));

/* ---------- 1. tam sayılar: BigInt başvurusu ---------- */
function refAdd(a,b,n){const m=1n<<BigInt(n),A=BigInt(a),B=BigInt(b),s=A+B,sg=x=>x>=m/2n?x-m:x,t=sg(A)+sg(B);return{u:Number(s%m),carry:s>=m?1:0,overflow:t<-(m/2n)||t>=m/2n,signed:Number(sg(s%m))};}
let bad=0;
for(let a=0;a<256;a++)for(let b=0;b<256;b++){const r=K.addBits(a,b,8),e=refAdd(a,b,8);if(r.u!==e.u||r.carry!==e.carry||r.overflow!==e.overflow||r.signed!==e.signed)bad++;}
eq(bad,0,'8 bit toplayıcı: 65 536 çiftin tümü');
for(const n of[16,32])for(let i=0;i<4000;i++){const a=Math.floor(rnd()*2**n),b=Math.floor(rnd()*2**n),r=K.addBits(a,b,n),e=refAdd(a,b,n);eq([r.u,r.carry,r.overflow,r.signed],[e.u,e.carry,e.overflow,e.signed]);eq(K.negate(a,n),Number((2n**BigInt(n)-BigInt(a))%2n**BigInt(n)));}
eq(plain(K.addBits(100,50,8)),{u:150,carry:0,overflow:true,signed:-106,trueUnsigned:150,trueSigned:150});
eq(K.addBits(2147483647,1,32).signed,-2147483648);eq(K.addBits(255,1,8).u,0);eq(K.addBits(255,1,8).carry,1);eq(K.addBits(255,1,8).overflow,false);
eq(K.addBits(128,255,8).overflow,true);eq(K.addBits(128,255,8).signed,127);
for(const[t,n,want]of[['12abc',8,null],['3.7',8,null],['',8,null],['-0x10',8,240],['0x7F',8,127],['0b101',8,5],['255',8,255],['256',8,null],['-128',8,128],['-129',8,null],['2147483648',32,2147483648],['4294967295',32,4294967295],['4294967296',32,null],['-2147483648',32,2147483648],['−5',16,65531],['1e3',16,null],['0x',8,null]]){const r=K.parseIntStrict(t,n);eq(r.ok?r.u:null,want,'parseIntStrict '+t);}
for(let i=0;i<500;i++){const u=Math.floor(rnd()*2**32),dv=new DataView(new ArrayBuffer(4));dv.setUint32(0,u,true);eq(K.bytesOf(u,32,true),[0,1,2,3].map(k=>dv.getUint8(k)));dv.setUint32(0,u,false);eq(K.bytesOf(u,32,false),[0,1,2,3].map(k=>dv.getUint8(k)));}
eq(K.bytesOf(0x7E8,32,true),[0xE8,7,0,0]);eq(K.bytesOf(0x1234,16,false),[0x12,0x34]);

/* ---------- 2. IEEE 754 ---------- */
const D='double',S='single',bitsOf=(t,k)=>{const r=K.roundDecimal(t,k);assert(r.ok,t);return r.bits;};
// Bilinen tam açılımlar (IEEE 754 ikili64 / ikili32; toFixed ile de doğrulanır)
const KNOWN=[['0.1',D,'0.1000000000000000055511151231257827021181583404541015625'],['0.2',D,'0.200000000000000011102230246251565404236316680908203125'],['0.3',D,'0.299999999999999988897769753748434595763683319091796875'],['0.1',S,'0.100000001490116119384765625'],['0.5',D,'0.5'],['16777217',S,'16777216'],['9007199254740993',D,'9007199254740992'],['-2.5',D,'-2.5'],['1e21',D,'1000000000000000000000']];
for(const[t,k,want]of KNOWN)eq(K.exactDecimal(bitsOf(t,k),k),want,'tam açılım '+t+' '+k);
eq((0.1).toFixed(55),'0.1000000000000000055511151231257827021181583404541015625');
for(let i=0;i<3000;i++){const x=(rnd()-.5)*10**ri(-4,14),b=K.f2bits(x,D),s=K.exactDecimal(b,D);const dec=s.includes('.')?s.split('.')[1].length:0;eq(s,x.toFixed(dec),'toFixed başvurusu');ok(dec+3>100||x.toFixed(dec+3).endsWith('000'),'toFixed tam: '+x+' '+dec);eq(Number(s),x);eq(K.bits2f(b,D),x);}
for(let i=0;i<2000;i++){const x=Math.fround((rnd()-.5)*10**ri(-4,14)),b=K.f2bits(x,S),s=K.exactDecimal(b,S);eq(Number(s),x);eq(s,x.toFixed(s.includes('.')?s.split('.')[1].length:0));}
{const tiny=K.exactDecimal(1n,D);eq(tiny.length,1076);eq(tiny,'0.'+(5n**1074n).toString().padStart(1074,'0'),'2^-1074 = 5^1074 / 10^1074');ok(tiny.startsWith('0.'+'0'.repeat(323)+'4940656458412465'));ok(tiny.endsWith('625'));eq(Number(tiny),5e-324);}
eq(K.exactDecimal(K.f2bits(Infinity,D),D),'Infinity');eq(K.exactDecimal(K.f2bits(NaN,D),D),'NaN');eq(K.exactDecimal(K.f2bits(-0,D),D),'-0');
// alan çözümü: 0,1 → işaret 0, ham üs 1019, e = −4; 1 → 1023; tek duyarlık 1 → 127
{const d=K.decode(bitsOf('0.1',D),D);eq([d.sign,d.expRaw,d.e,d.cls],[0,1019,-4,'normal']);eq(K.f2bits(0.1,D).toString(16),'3fb999999999999a');eq(K.f2bits(1,S).toString(16),'3f800000');eq(K.decode(1n,D).cls,'subnormal');eq(K.decode(0n,S).cls,'zero');eq(K.decode(K.f2bits(-Infinity,S),S).cls,'inf');}
// aralık: ölçülen = kuram = 2^(floor(log2|x|) − p)
for(const[k,p]of[[D,52],[S,23]])for(let i=0;i<2000;i++){let x=(rnd()+.01)*10**ri(-20,20);if(k===S)x=Math.fround(x);const b=K.f2bits(x,k),m=K.ulpMeasured(b,k),t=K.ulpTheory(b,k);eq(m,t);let e=Math.floor(Math.log2(x));if(2**e>x)e--;if(2**(e+1)<=x)e++;eq(t,2**(e-p));}
eq(K.ulpTheory(bitsOf('0.1',D),D),2**-56);eq(K.ulpTheory(bitsOf('1',D),D),Number.EPSILON);eq(K.ulpMeasured(0n,D),5e-324);eq(K.ulpMeasured(K.f2bits(Number.MAX_VALUE,D),D),null);eq(K.ulpMeasured(K.f2bits(Infinity,D),D),null);eq(K.ulpTheory(K.f2bits(NaN,D),D),null);
// ondalık metni yuvarlama: çift duyarlıkta Number() ile aynı; her iki türde "en yakın komşu" özelliği bağımsız BigInt kesirleriyle
const fracOf=(b,k)=>{const F={double:[64,52,1023],single:[32,23,127]}[k],fb=BigInt(F[1]),mag=b&((1n<<BigInt(F[0]-1))-1n),er=mag>>fb,fr=mag&((1n<<fb)-1n),m=er===0n?fr:fr|(1n<<fb),q=Number(er===0n?1n:er)-F[2]-F[1];return q>=0?[m<<BigInt(q),1n]:[m,1n<<BigInt(-q)];};
const decFrac=t=>{const m=/^-?(\d*)\.?(\d*)(?:e(-?\d+))?$/.exec(t),e=(m[3]?+m[3]:0)-m[2].length;const n=BigInt(m[1]+m[2]);return e>=0?[n*10n**BigInt(e),1n]:[n,10n**BigInt(-e)];};
const absDiff=(a,b)=>{const n=a[0]*b[1]-b[0]*a[1];return[n<0n?-n:n,a[1]*b[1]];},less=(a,b)=>a[0]*b[1]<b[0]*a[1];
for(let i=0;i<1500;i++){const digits=ri(1,25);let t='';for(let j=0;j<digits;j++)t+=ri(0,9);t=ri(0,9)+'.'+t+'e'+ri(-30,30);
  for(const k of[D,S]){const b=bitsOf(t,k);if(k===D)eq(K.bits2f(b,D),Number(t),'Number() başvurusu '+t);const target=decFrac(t),err=absDiff(target,fracOf(b,k));ok(!less(absDiff(target,fracOf(b+1n,k)),err)&&(b===0n||!less(absDiff(target,fracOf(b-1n,k)),err)),'en yakın komşu '+t+' '+k);}}
// çifte yuvarlama tuzağı: 1 + 1,5·2^-23'ün hemen altı tek duyarlıkta 1 + 2^-23 olmalı (önce çifte yuvarlamak 1 + 2^-22 verir)
eq(K.roundDecimal('1.00000017881393432617187499',S).bits.toString(16),'3f800001');eq(Math.fround(Number('1.00000017881393432617187499')),1+2**-22);
eq(K.roundDecimal('1.000000178813934326171875',S).bits.toString(16),'3f800002','eşitlikte çift kesir');
eq(K.roundDecimal('1e400',D).bits,K.f2bits(Infinity,D));eq(K.roundDecimal('-0',D).bits,K.f2bits(-0,D));eq(K.roundDecimal('0,5',D).bits,K.f2bits(.5,D));eq(K.roundDecimal('nan',S).bits,K.f2bits(NaN,S));
for(const t of['abc','1..2','','.','1e','0x10','12abc'])eq(K.roundDecimal(t,D).ok,false,'geçersiz '+t);
// toplama: 0,1 ⊕ 0,2 ≠ 0,3 (1 aralık); tam toplam, ondalık dizgilerin BigInt toplamıyla
const addDec=(a,b)=>{const[ai,af='']=a.split('.'),[bi,bf='']=b.split('.'),L=Math.max(af.length,bf.length),s=(BigInt(ai+af.padEnd(L,'0'))+BigInt(bi+bf.padEnd(L,'0'))).toString().padStart(L+1,'0');return L?(s.slice(0,-L)+'.'+s.slice(-L)).replace(/\.?0+$/,''):s;};
{const a=bitsOf('0.1',D),b=bitsOf('0.2',D),c=bitsOf('0.3',D),s=K.fadd(a,b,D);eq(K.exactDecimal(s.bits,D),'0.3000000000000000444089209850062616169452667236328125');eq(K.ratToDecimal(s.exact.num,s.exact.den),addDec(KNOWN[0][2],KNOWN[1][2]));eq(K.ratToDecimal(s.exact.num,s.exact.den),'0.3000000000000000166533453693773481063544750213623046875');eq(K.ordered(s.bits,D)-K.ordered(c,D),1n);eq(K.bits2f(s.bits,D),0.1+0.2);
 const h=K.fadd(bitsOf('0.5',D),bitsOf('0.25',D),D);eq(h.bits,bitsOf('0.75',D));
 const big=K.fadd(bitsOf('9007199254740992',D),bitsOf('1',D),D);eq(K.exactDecimal(big.bits,D),'9007199254740992');eq(K.ratToDecimal(big.exact.num,big.exact.den),'9007199254740993');
 const sg=K.fadd(bitsOf('16777216',S),bitsOf('1',S),S);eq(K.exactDecimal(sg.bits,S),'16777216');}
for(let i=0;i<1500;i++){const x=(rnd()-.5)*10**ri(-3,6),y=(rnd()-.5)*10**ri(-3,6),s=K.fadd(K.f2bits(x,D),K.f2bits(y,D),D);eq(K.bits2f(s.bits,D),x+y);eq(K.ratToDecimal(s.exact.num,s.exact.den),(()=>{const a=K.exactDecimal(K.f2bits(x,D),D),b=K.exactDecimal(K.f2bits(y,D),D);if(a.startsWith('-')!==b.startsWith('-'))return K.ratToDecimal(s.exact.num,s.exact.den);const r=addDec(a.replace('-',''),b.replace('-',''));return(a.startsWith('-')?'-':'')+r;})());
  const tgt=[s.exact.num<0n?-s.exact.num:s.exact.num,s.exact.den],err=absDiff(tgt,fracOf(s.bits,D));ok(!less(absDiff(tgt,fracOf(s.bits+1n,D)),err)&&!less(absDiff(tgt,fracOf(s.bits-1n,D)),err),'toplam en yakına yuvarlanır');}
for(let i=0;i<300;i++){const num=BigInt(ri(-1e6,1e6)),den=2n**BigInt(ri(0,60))*5n**BigInt(ri(0,10));const v=K.ratToNumber({num,den});ok(Math.abs(v-Number(num)/Number(den))<=1e-12*Math.abs(v)+1e-300);}

/* ---------- 3. boru hattı ---------- */
const MEM0=[3,1,4,1,5,9,2,6,5,3,5,8,9,7,9,3];eq(K.MEM0,MEM0);
// Bağımsız çevirici + yorumlayıcı: kaynak metni kendi düzenli ifadeleriyle okur.
function refParse(src){const ins=[],labels={};for(const raw of src.split('\n')){let l=raw.split('#')[0].trim();const m=/^(\w+):\s*(.*)$/.exec(l);if(m){labels[m[1]]=ins.length;l=m[2];}if(!l)continue;const[op,...rest]=l.split(/[\s,()]+/).filter(Boolean);ins.push([op,...rest]);}return{ins,labels};}
const rx=t=>+t.slice(1);
function refExec(src){const{ins,labels}=refParse(src),R=new Int32Array(8),M=Int32Array.from(MEM0),trace=[];let pc=0;
  while(pc<ins.length&&trace.length<500){const[op,a,b,c]=ins[pc];let taken=false,dest=0,srcs=[];
    if(op==='add'||op==='sub'){dest=rx(a);srcs=[rx(b),rx(c)];const v=op==='add'?R[rx(b)]+R[rx(c)]:R[rx(b)]-R[rx(c)];if(dest)R[dest]=v;}
    else if(op==='addi'){dest=rx(a);srcs=[rx(b)];if(dest)R[dest]=R[rx(b)]+(+c);}
    else if(op==='lw'){dest=rx(a);srcs=[rx(c)];const v=M[(R[rx(c)]+(+b))/4];if(dest)R[dest]=v;}
    else if(op==='sw'){srcs=[rx(c),rx(a)];M[(R[rx(c)]+(+b))/4]=R[rx(a)];}
    else if(op==='beq'){srcs=[rx(a),rx(b)];taken=R[rx(a)]===R[rx(b)];}
    trace.push({pc,op,dest,srcs:srcs.filter(r=>r),taken,target:op==='beq'?labels[c]:-1});pc=taken?labels[c]:pc+1;}
  return{regs:[...R],mem:[...M],trace,len:ins.length};}
// İkinci model: mandal benzetimi yok; her dinamik komutun EX çevrimi bir yineleme bağıntısından çıkar.
function refSchedule(ref,fw,pred){const tr=ref.trace,n=tr.length,EX=[],lastWriter=new Map(),table=new Map(),log=[];let lp=0,F=1,flushed=false,mis=0,costly=0;
  const look=pc=>pred==='nt'?false:pred==='t'?true:pred==='2bit'?(table.has(pc)?table.get(pc):1)>=2:(table.get(pc)||0)===1;
  for(let k=0;k<n;k++){const I=tr[k],idEntry=k===0||flushed?F+1:Math.max(F+1,EX[k-1]);let ex=idEntry+1;
    for(const r of I.srcs){if(!lastWriter.has(r))continue;const p=lastWriter.get(r);ex=Math.max(ex,EX[p]+(fw?(tr[p].op==='lw'?2:1):3));}
    EX[k]=ex;flushed=false;let next=idEntry;
    if(I.op==='beq'){const L=idEntry-1;while(lp<log.length&&log[lp][0]<L){const[,pc,t]=log[lp++];if(pred==='1bit')table.set(pc,t?1:0);else if(pred==='2bit'){const s=table.has(pc)?table.get(pc):1;table.set(pc,t?Math.min(3,s+1):Math.max(0,s-1));}}
      const guess=look(I.pc);log.push([ex,I.pc,I.taken]);if(guess!==I.taken){mis++;flushed=true;next=ex+1;if(k<n-1)costly++;}}
    if(I.dest)lastWriter.set(I.dest,k);F=next;}
  return{cycles:n?EX[n-1]+2:0,mis,costly};}
function randomProgram(){const L=[],nL=ri(3,14),R=()=>'x'+ri(0,7),off=()=>4*ri(0,15);let lab=0;
  if(rnd()<.5){const cnt=ri(1,5),body=ri(0,4);L.push('addi x7, x0, '+cnt);L.push('bas: addi x7, x7, -1');for(let i=0;i<body;i++)L.push(line());L.push('beq x7, x0, cik');L.push('beq x0, x0, bas');L.push('cik: nop');}
  for(let i=0;i<nL;i++){if(rnd()<.18){const name='e'+(lab++),skip=ri(0,3);L.push('beq '+R()+', '+R()+', '+name);for(let j=0;j<skip;j++)L.push(line());L.push(name+': '+line());}else L.push(line());}
  if(rnd()<.3){L.push('beq '+(rnd()<.5?'x0, x0':R()+', '+R())+', son');for(let j=ri(0,3);j>0;j--)L.push(line());L.push('son:');}
  return L.join('\n');
  function line(){const t=rnd();return t<.25?'add x'+ri(0,6)+', '+R()+', '+R():t<.4?'sub x'+ri(0,6)+', '+R()+', '+R():t<.6?'addi '+'x'+ri(0,6)+', '+R()+', '+ri(-9,9):t<.8?'lw x'+ri(0,6)+', '+off()+'(x0)':t<.95?'sw '+R()+', '+off()+'(x0)':'nop';}}
const PRESETS=[...html.matchAll(/\['(\w+)','[^']+',\[((?:'[^']*',?)+)\]\]/g)].map(m=>[m[1],[...m[2].matchAll(/'([^']*)'/g)].map(x=>x[1]).join('\n')]);
eq(PRESETS.map(p=>p[0]),['mix','indep','chain','load','loop','nest']);
const sources=[...PRESETS.map(p=>p[1])];for(let i=0;i<500;i++)sources.push(randomProgram());
let pipeRuns=0,withStall=0,withFlush=0,freeFlush=0;
for(const src of sources){const asm=K.assemble(src);ok(asm.ok,'çevrilmeli:\n'+src+'\n'+JSON.stringify(asm.errors));const ref=refExec(src);eq(asm.prog.length,ref.len);
  const seq=K.runSequential(asm.prog);eq(seq.error,null);eq(seq.regs,ref.regs);eq(seq.mem,ref.mem);eq(seq.trace,ref.trace.map(t=>t.pc));
  for(const fw of[true,false])for(const pred of['nt','t','1bit','2bit']){const r=K.runPipeline(asm.prog,{forwarding:fw,predictor:pred}),sch=refSchedule(ref,fw,pred),tag=(fw?'fw ':'nofw ')+pred+'\n'+src;
    eq(r.error,null);eq(r.regs,ref.regs,'yazmaçlar '+tag);eq(r.mem,ref.mem,'bellek '+tag);eq(r.n,ref.trace.length);
    eq(r.cycles,sch.cycles,'çevrim sayısı (yineleme modeli) '+tag);eq(r.mispredicts,sch.mis,'yanlış tahmin '+tag);eq(r.flushCycles,2*sch.costly);
    eq(r.cycles,r.n+4+r.dataStalls+r.flushCycles,'n + 4 + bekleme '+tag);
    eq(r.branches,ref.trace.filter(t=>t.op==='beq').length);
    // çizelge tutarlılığı: yürütülen her komut IF→ID→EX→MEM→WB sırasını izler; WB sırası program sırasıdır
    const done=r.inst.filter(x=>!x.squashed);eq(done.map(x=>x.pc),ref.trace.map(t=>t.pc));
    let prevWB=0;for(const x of done){const st=x.cells.map(c=>c[1]);ok(st[0]===0&&st.at(-1)===4&&st.every((s,i)=>i===0||s===st[i-1]+1||(s===st[i-1]&&s<=1)),'aşama sırası');ok(x.cells.every((c,i)=>i===0||c[0]===x.cells[i-1][0]+1));const wb=x.cells.at(-1)[0];ok(wb>prevWB);prevWB=wb;}
    for(const x of r.inst.filter(x=>x.squashed))ok(x.cells.every(c=>c[1]<=1)&&x.cells.at(-1)[0]===x.squashed,'boşaltılan komut EX\'e ulaşmaz');
    if(!fw)ok(r.timeline.every(t=>t.fwd.length===0));
    pipeRuns++;if(r.dataStalls)withStall++;if(r.flushCycles)withFlush++;if(r.timeline.some(t=>t.flush&&t.flush.free))freeFlush++;}}
ok(withStall>500&&withFlush>500&&freeFlush>0,'rastgele programlar bekleme, boşaltma ve bedelsiz boşaltma içermeli: '+[withStall,withFlush,freeFlush]);
// Hazır programların elle hesaplanan değerleri
const P=id=>K.assemble(PRESETS.find(p=>p[0]===id)[1]).prog,run=(id,fw,pred)=>{const r=K.runPipeline(P(id),{forwarding:fw,predictor:pred});return[r.cycles,r.n,r.dataStalls,r.flushCycles,r.mispredicts,r.branches];};
eq(run('indep',true,'nt'),[10,6,0,0,0,0]);eq(run('indep',false,'nt'),[10,6,0,0,0,0]);   // k + n − 1 = 5 + 6 − 1
eq(run('chain',true,'nt'),[10,6,0,0,0,0]);eq(run('chain',false,'nt'),[20,6,10,0,0,0]);  // 5 bağımlılık × 2 çevrim
eq(run('load',true,'nt'),[14,8,2,0,0,0]);
eq(run('mix',true,'nt'),[14,7,1,2,1,1]);eq(run('mix',false,'nt'),[19,7,6,2,1,1]);eq(run('mix',true,'t'),[12,7,1,0,0,1]);
eq(run('loop',true,'nt'),[71,43,8,16,8,15]);eq(run('loop',true,'1bit'),[59,43,8,4,2,15]);eq(run('loop',true,'2bit'),[59,43,8,4,2,15]);
eq(run('nest',true,'nt'),[97,61,0,32,16,27]);eq(run('nest',true,'1bit'),[85,61,0,20,10,27]);eq(run('nest',true,'2bit'),[79,61,0,14,7,27]);
eq(K.runSequential(P('loop')).mem[15],3+1+4+1+5+9+2+6);eq(K.runSequential(P('nest')).regs[3],12);eq(K.runSequential(P('mix')).regs,[0,4,4,8,4,0,0,12]);
// Çevirici hataları ve çalışma zamanı sınırları
for(const[src,frag]of[['add x1, x2','işlenen'],['foo x1','Bilinmeyen'],['addi x9, x0, 1','yazmaç'],['beq x1, x2, yok','tanımlı değil'],['lw x1, 8','kayma'],['a: nop\na: nop','iki kez'],['','boş'],['addi x1, x0, 5000','2047'],['x1: nop','yazmaç adı']]){const a=K.assemble(src);eq(a.ok,false,src);ok(a.errors.some(e=>e.msg.includes(frag)),src+' → '+JSON.stringify(a.errors));}
{const inf=K.assemble('a: beq x0, x0, a').prog;eq(K.runSequential(inf).error.type,'limit');eq(K.runPipeline(inf,{predictor:'nt'}).error.type,'limit');eq(K.runPipeline(inf,{predictor:'2bit'}).error.type,'limit');
 const badAddr=K.assemble('lw x1, 64(x0)').prog;eq(K.runSequential(badAddr).error.type,'address');eq(K.runPipeline(badAddr).error.type,'address');eq(K.assemble('lw x1, 2(x0)').ok,true);eq(K.runPipeline(K.assemble('lw x1, 2(x0)').prog).error.addr,2);
 const x0=K.assemble('addi x0, x0, 7\nadd x1, x0, x0').prog;eq(K.runPipeline(x0).regs,[0,0,0,0,0,0,0,0]);eq(K.runPipeline(x0).dataStalls,0);
 const wrap=K.assemble('addi x1, x0, 2047\n'+Array(21).fill('add x1, x1, x1').join('\n')).prog;eq(K.runPipeline(wrap).regs[1],(2047*2**21)|0);}

/* ---------- 4. önbellek ---------- */
// Başvuru: zaman damgalı LRU (dizi sırası yerine en küçük damgayı atar)
function refCache(size,block,assoc,addrs){const lines=size/block,ways=assoc==='full'?lines:Math.min(assoc,lines),nsets=lines/ways,sets=Array.from({length:nsets},()=>new Map());let miss=0,t=0;const res=[];
  for(const a of addrs){t++;const blk=(a-(a%block))/block,s=sets[blk%nsets];if(s.has(blk)){s.set(blk,t);res.push(1);continue;}miss++;res.push(0);if(s.size>=ways){let old=null,ot=Infinity;for(const[b,tt]of s)if(tt<ot){ot=tt;old=b;}s.delete(old);}s.set(blk,t);}
  return{miss,res};}
const base={rows:32,cols:32,stride:2,passes:1,seed:1};
for(const kind of['row','col','stride','random'])for(const rows of[8,32,64])for(const cols of[8,16,64])for(const size of[128,256,1024,4096])for(const block of[8,16,64])for(const assoc of[1,2,4,'full']){
  const p={rows,cols,stride:ri(1,9),passes:ri(1,3),seed:ri(1,20)},tr=K.makeTrace(kind,p),sim=K.cacheSim({size,block,assoc},tr),ref=refCache(size,block,assoc,tr);
  eq(sim.misses,ref.miss,[kind,rows,cols,size,block,assoc].join(' '));eq(sim.hits+sim.misses,tr.length);ok(ref.res.every((v,i)=>v===sim.results[i]));
  const c=K.classifyMisses({size,block,assoc},tr);eq(c.compulsory+c.capacity+c.conflict,sim.misses);eq(c.compulsory,new Set(tr.map(a=>Math.floor(a/block))).size);ok(c.capacity>=0);if(assoc==='full')eq(c.conflict,0);
  ok(sim.sets.every(s=>s.length<=sim.ways));eq(sim.nsets*sim.ways,size/block);}
{const row=K.makeTrace('row',base),col=K.makeTrace('col',base);eq(row.length,1024);eq(row,Array.from({length:1024},(_,i)=>4*i));eq([...col].sort((a,b)=>a-b),row);eq(col.slice(0,3),[0,128,256]);
 for(const B of[8,16,32,64])for(const a of[1,2,4,'full'])for(const z of[128,1024,4096])if(z>=B)eq(K.cacheSim({size:z,block:B,assoc:a},row).misses,4096/B,'sıralı yürüyüş: blok başına 1 ıska');
 eq(K.cacheSim({size:1024,block:16,assoc:1},col).misses,1024);eq(K.cacheSim({size:1024,block:16,assoc:4},col).misses,1024);eq(K.cacheSim({size:1024,block:16,assoc:'full'},col).misses,256);eq(K.cacheSim({size:256,block:16,assoc:'full'},col).misses,1024);
 eq(plain(K.classifyMisses({size:1024,block:16,assoc:1},col)),{compulsory:256,capacity:0,conflict:768,total:1024});
 eq(K.makeTrace('stride',{...base,stride:2}).length,512);eq(K.cacheSim({size:1024,block:16,assoc:1},K.makeTrace('stride',{...base,stride:2})).misses,256);eq(K.cacheSim({size:1024,block:16,assoc:1},K.makeTrace('stride',{...base,stride:8})).misses,128);
 eq(K.cacheSim({size:4096,block:16,assoc:1},K.makeTrace('stride',{...base,stride:1,passes:3})).misses,256);   // dizi sığar: sonraki geçişler isabet
 eq(K.cacheSim({size:1024,block:16,assoc:1},K.makeTrace('stride',{...base,stride:1,passes:3})).misses,768);   // sığmaz
 const r1=K.makeTrace('random',base);eq(r1,K.makeTrace('random',base));ok(r1.every(a=>a%4===0&&a>=0&&a<4096));ok(new Set(r1).size>550&&new Set(r1).size<750,'düzgün dağılım: beklenen farklı eleman ≈ 647');
 // düzgün rastgele erişim: uzun izde ıska oranı → 1 − C/M (16 tohumun ortalaması, 64/256 blok)
 let m=0,N=0;for(let s=1;s<=16;s++){const tr=K.makeTrace('random',{rows:64,cols:64,seed:s}).map(a=>a%4096),sim=K.cacheSim({size:1024,block:16,assoc:'full'},tr);m+=sim.misses;N+=tr.length;}ok(Math.abs(m/N-.75)<.012,'rastgele ıska oranı '+m/N);
 // tam ilişkili LRU kapsama özelliği: boyut büyüdükçe ıska artmaz
 for(const kind of['col','random','stride']){let prev=Infinity;for(const z of[128,256,512,1024,2048,4096]){const v=K.cacheSim({size:z,block:16,assoc:'full'},K.makeTrace(kind,base)).misses;ok(v<=prev);prev=v;}}
 eq(K.cacheSim({size:1024,block:16,assoc:1},row,100).misses,25);eq(K.cacheSim({size:1024,block:16,assoc:1},row,0).misses,0);
 eq(K.amat(1,.02,100),3);eq(K.amat(1,.25,100),26);assert.throws(()=>K.cacheSim({size:100,block:16,assoc:1},row));checks++;}

/* ---------- 5. başarım ---------- */
eq(K.CLASS_COST,[4,5,4,3]);ok(Math.abs(K.cpiOf([.5,.25,.1,.15],[4,5,4,3])-4.1)<1e-12);ok(Math.abs(K.cpuTime(10e9,4.1,2)-20.5)<1e-9);
for(let s=1;s<=20;s++){const fr=[.5,.25,.1,.15],c=K.mixStream(fr,100000,s);eq(c.reduce((a,b)=>a+b,0),100000);fr.forEach((f,i)=>ok(Math.abs(c[i]/1e5-f)<5*Math.sqrt(f*(1-f)/1e5),'pay '+i+' tohum '+s));}
eq(K.mixStream([1,0,0,0],1000,3),[1000,0,0,0]);eq(K.mixStream([0,0,0,1],1000,3),[0,0,0,1000]);
ok(Math.abs(K.amdahl(.9,8)-1/(.1+.9/8))<1e-12);eq(K.amdahl(0,64),1);ok(Math.abs(K.amdahl(1,64)-64)<1e-9);ok(Math.abs(K.amdahl(.9,1e12)-10)<1e-6);
for(let fi=0;fi<=100;fi++)for(const p of[1,2,3,7,8,16,64,256])for(const over of[0,3]){const f=fi/100,r=K.simulateParallel({work:1000,f,p,overhead:over}),S=Math.round((1-f)*1000),Pp=1000-S;
  eq(r.ticks,S+Math.ceil(Pp/p)+(Pp>0&&p>1?over*(p-1):0));eq([r.serial,r.par],[S,Pp]);
  if(over===0){const sp=1000/r.ticks,th=K.amdahl(Pp/1000,p);ok(sp<=th+1e-9,'ölçülen hızlanma Amdahl\'ı aşamaz');ok(sp>=1000/(S+Pp/p+1)-1e-9);if(Pp%p===0)ok(Math.abs(sp-th)<1e-9);}}
eq(K.simulateParallel({work:1000,f:.9,p:8}).ticks,213);eq(K.simulateParallel({work:1000,f:.9,p:1}).ticks,1000);
ok(Object.isFrozen(K));
console.log(`G bilgisayar mimarisi: ${checks.toLocaleString('tr-TR')} bağımsız çekirdek denetimi PASS (${pipeRuns} boru hattı koşusu)`);

/* ---------- tarayıcı ---------- */
if(process.argv.includes('--browser')){
  const {chromium}=await import('playwright');const {createServer}=await import('node:http');const {join,extname}=await import('node:path');const {fileURLToPath}=await import('node:url');const root=fileURLToPath(new URL('../',import.meta.url));
  const server=createServer((req,res)=>{const file=join(root,decodeURIComponent(new URL(req.url,'http://localhost').pathname));if(!fs.existsSync(file)||fs.statSync(file).isDirectory()){res.writeHead(404).end();return;}res.setHeader('Content-Type',({'.html':'text/html; charset=utf-8','.js':'text/javascript; charset=utf-8','.css':'text/css; charset=utf-8'})[extname(file)]||'application/octet-stream');res.end(fs.readFileSync(file));});
  await new Promise(r=>server.listen(0,'127.0.0.1',r));let browser;const before=checks;
  try{browser=await chromium.launch();
    for(const[theme,width]of[['light',390],['dark',1280]]){
      const page=await browser.newPage({viewport:{width,height:900},deviceScaleFactor:width===390?2:1});
      await page.addInitScript(t=>{localStorage.setItem('acelya-theme',t);localStorage.setItem('acelya-sound-muted','1');},theme);page.setDefaultTimeout(5000);
      const errors=[];page.on('pageerror',e=>errors.push(e.message));page.on('console',m=>{if(m.type()==='error'&&!/404|Failed to load resource/.test(m.text()))errors.push(m.text());});
      await page.goto(`http://127.0.0.1:${server.address().port}/bilgisayar-sistemleri-ve-mimarisi.html`);
      const norm=t=>t.replace(/ /g,' ').replace(/−/g,'-');
      const click=id=>page.locator('#'+id).click(),read=async id=>norm(await page.locator('#'+id).textContent());
      const has=async(id,t)=>{const v=await read(id);assert(v.includes(t),`#${id}: «${v}» içinde «${t}» yok`);checks++;};
      const is=async(id,t)=>{const v=await read(id);assert.equal(v,t,'#'+id);checks++;};
      const set=async(id,v)=>page.locator('#'+id).evaluate((e,v)=>{e.value=v;e.dispatchEvent(new Event('input',{bubbles:true}));},String(v));
      const fits=async tag=>{eq(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),true,'yatay taşma: '+tag+' '+width);};
      const tab=async t=>{await click('tab-'+t);await page.waitForTimeout(60);await fits(t);};
      // --- 01
      await is('nAcard','0x64 · 100 · 100');await is('nBcard','0x32 · 50 · 50');await is('nFlags','C = 0 · V = 1');await is('nStoredS','-106');await is('nTrueS','150');await is('nDiffS','-256 = -2⁸');await is('nStoredU','150 (0x96)');await is('nDiffU','0');await has('nStatus','taşma var');
      await click('nMinusOne');await is('nFlags','C = 1 · V = 0');await is('nStoredS','0');await is('nStoredU','0 (0x00)');await is('nDiffU','-256 = -2⁸');
      await click('nMaxPlus');await is('nStoredS','-128');await is('nFlags','C = 0 · V = 1');
      await click('nMinMinus');await has('nStatus','-128 + (-1) = -129');ok(!(await page.locator('main').innerText()).includes('\\'),'durağan metinde ters bölü yok');await is('cP2','Çakışmayı tam ilişkiyle çöz');await is('nStoredS','127');await is('nFlags','C = 1 · V = 1');await is('nDiffS','256 = +2⁸');
      await set('nA','12abc');await has('nAMsg','okunamadı');await is('nStoredS','127');await set('nA','300');await has('nAMsg','Aralık dışı');await set('nA','3.7');await has('nAMsg','okunamadı');
      await set('nA','-0x10');await is('nAMsg','');await is('nAcard','0xF0 · 240 · -16');
      await set('nWidth','32');await set('nA','2147483647');await set('nB','1');await is('nStoredS','-2 147 483 648');await is('nTrueS','2 147 483 648');await is('nDiffS','-4 294 967 296 = -2³²');
      await set('nA','4294967296');await has('nAMsg','Aralık dışı');await set('nA','2024');await is('nAcard','0x000007E8 · 2024 · 2024');eq(await page.locator('#nBytes tr').count(),4);await has('nBytes','E8');await has('nBytesNote','0xE8070000');
      await page.locator('#bitsA button[data-bit="31"]').click();await is('nAcard','0x800007E8 · 2 147 485 672 · -2 147 481 624');eq(await page.locator('#nA').inputValue(),'-2147481624');
      await click('nNegate');eq(await page.locator('#nA').inputValue(),'2147481624');
      await set('nWidth','8');eq(await page.locator('#bitsA button').count(),8);
      await is('fClass','Normal sayı');await is('fFields','0 (+) · 1019 · -4');await is('fExact','0,1000000000000000055511151231257827021181583404541015625');await has('fErr','5,551 × 10⁻¹⁸');await has('fErr','+0,4 aralık');await is('fUlpM','1,388 × 10⁻¹⁷');await is('fUlpT','1,388 × 10⁻¹⁷ = 2⁻⁵⁶');
      await is('sFl','0,3000000000000000444089209850062616169452667236328125');await is('sExact','0,3000000000000000166533453693773481063544750213623046875');await is('sC','0,299999999999999988897769753748434595763683319091796875');await is('sEq','Hayır');await is('sUlps','+1 aralık');await has('sRound','2,776 × 10⁻¹⁷');
      await click('fP2');await is('sEq','Evet, bit bit aynı');await is('sUlps','0');await is('sRound','0 (toplam tam gösterilir)');
      await click('fP3');await is('sFl','9007199254740992');await is('sExact','9007199254740993');await is('sEq','Evet, bit bit aynı');await has('sStatus','rastlantı');
      await click('fP4');eq(await page.locator('#fKind').inputValue(),'single');eq(await page.locator('#bitsF button').count(),32);await is('sFl','16777216');await is('fExact','0,100000001490116119384765625');await is('fUlpT','7,451 × 10⁻⁹ = 2⁻²⁷');
      await set('fX','inf');await is('fClass','+∞');await is('fUlpM','Tanımsız');await set('fX','nan');await is('fClass','NaN (sayı değil)');await set('fX','0');await is('fClass','Sıfır');await is('fUlpM','1,401 × 10⁻⁴⁵');await click('fNext');await is('fClass','Normal altı sayı');await click('fPrev');await click('fPrev');await is('fClass','Normal altı sayı');await has('fFields','1 (-)');
      await set('fX','abc');await has('fXMsg','okunamadı');await set('fX','1');await page.locator('#bitsF button[data-bit="31"]').click();eq(await page.locator('#fX').inputValue(),'-1');await is('fErr','— (bitlerden girildi)');
      await set('fA','x');await has('fSMsg','ondalık sayı');
      await click('fP1');await click('fShowSum');eq(await page.locator('#fX').inputValue(),'0,30000000000000004');
      await click('numReset');await is('nAcard','0x64 · 100 · 100');await is('fClass','Normal sayı');eq(await page.locator('#fKind').inputValue(),'double');await is('sUlps','+1 aralık');eq(await page.locator('#bitsF button').count(),64);await fits('num');
      // --- 02
      await tab('pipe');await is('pCycles','14');await is('pFormula','7 + 4 + 3 = 14');await is('pDiff','0 çevrim');await is('pN','7');await is('pStalls','1');await is('pFlush','2 (1 yanlış tahmin)');await is('pCPI','2');await is('pBranch','0 / 1 (0 %)');await is('pRef','Aynı: 8 yazmaç, 16 sözcük');await is('pSpeed','2,5 kat');await is('pCPIinf','1,429');await is('pCycleOut','14 / 14');await has('pRegs','x7 = 12');await has('pMem','[12] = 8');
      await click('pStart');await is('pCycleOut','0 / 14');await has('pStatus','Çevrim 0');await has('pRegs','x7 = 0');
      for(let i=0;i<4;i++)await click('pStep');await is('pCycleOut','4 / 14');await has('pStatus','bekliyor');await has('pStatus','yükle–kullan');await has('pStages','bekliyor');
      for(let i=0;i<4;i++)await click('pStep');await is('pCycleOut','8 / 14');await has('pStatus','tahmin yanlış');await has('pStatus','Kayıp 2 çevrim');await has('pStages','boşaltıldı');
      await click('pBack');await is('pCycleOut','7 / 14');await has('pStatus','EX/MEM');await click('pEnd');await is('pCycleOut','14 / 14');await set('pCycle',6);await is('pCycleOut','6 / 14');await has('pStatus','MEM/WB');
      await page.locator('#pFwd').uncheck();await is('pCycles','19');await is('pFormula','7 + 4 + 8 = 19');await is('pStalls','6');await is('pRef','Aynı: 8 yazmaç, 16 sözcük');await page.locator('#pFwd').check();
      await set('pPred','t');await is('pCycles','12');await is('pBranch','1 / 1 (100 %)');await set('pPred','nt');
      const expect={indep:['10','6 + 4 + 0 = 10'],chain:['10','6 + 4 + 0 = 10'],load:['14','8 + 4 + 2 = 14'],loop:['71','43 + 4 + 24 = 71'],nest:['97','61 + 4 + 32 = 97']};
      for(const[id,[cyc,form]]of Object.entries(expect)){await set('pPreset',id);await is('pCycles',cyc);await is('pFormula',form);await is('pDiff','0 çevrim');await is('pRef','Aynı: 8 yazmaç, 16 sözcük');await fits('pipe '+id);}
      await set('pPred','1bit');await is('pCycles','85');await set('pPred','2bit');await is('pCycles','79');await is('pBranch','20 / 27 (74,1 %)');
      await set('pPreset','chain');await page.locator('#pFwd').uncheck();await is('pCycles','20');await is('pStalls','10');await is('pSpeed','1,5 kat');
      await set('pCode','add x1, x2');await has('pMsg','Satır 1');await is('pCycles','—');eq(await page.locator('#pPreset').inputValue(),'custom');await has('pStatus','çözülemedi');
      await set('pCode','a: beq x0, x0, a');await has('pStatus','sınırında durduruldu');await is('pFormula','Tanımsız');
      await set('pCode','lw x1, 64(x0)');await has('pStatus','geçersiz bir adrese');
      await set('pCode','addi x1, x0, 7\nsw x1, 0(x0)');await is('pCycles','8');await page.locator('#pFwd').check();await is('pCycles','6');await has('pMem','[0] = 7');
      await click('pStart');await click('pPlay');eq(await page.locator('#pPlay').getAttribute('aria-pressed'),'true');await page.waitForFunction(()=>document.getElementById('pCycleOut').textContent==='6 / 6',null,{timeout:8000});await page.waitForFunction(()=>document.getElementById('pPlay').getAttribute('aria-pressed')==='false');checks++;
      await click('pipeReset');await is('pCycles','14');eq(await page.locator('#pFwd').isChecked(),true);eq(await page.locator('#pPred').inputValue(),'nt');eq(await page.locator('#pPreset').inputValue(),'mix');
      // --- 03
      await tab('cache');await is('cCounts','1024 · 768 · 256');await is('cMiss','25 %');await is('cExpect','25 %');await is('cDiff','0');await is('c3C','256 · 0 · 0');await is('cGeom','64 × 1 · 64 blok');await is('cAmatM','26 çevrim');await is('cAmatT','1 + 0,25 × 100 = 26');await is('cSpeed','3,88 kat');
      await click('cP1');await is('cMiss','100 %');await is('c3C','256 · 0 · 768');await is('cAmatM','101 çevrim');await has('cStatus','çakışmadan');
      await click('cP2');await is('cMiss','25 %');await is('cGeom','1 × 64 · 64 blok');await is('c3C','256 · 0 · 0');
      await click('cP3');await is('cCounts','1024 · 252 · 772');await is('cExpect','75 %');await is('cDiff','+0,39');eq(await page.locator('#cSeedField').isVisible(),true);eq(await page.locator('#cStrideField').isVisible(),false);
      await set('cTrace','stride');await set('cAssoc','1');await is('cCounts','512 · 256 · 256');await is('cMiss','50 %');await is('cExpect','50 %');await set('cStride',8);await is('cMiss','100 %');await set('cStride',1);await set('cPasses',3);await is('cMiss','25 %');await set('cSize',4096);await is('cMiss','8,33 %');await is('cExpect','8,33 %');
      await set('cStep',0);await is('cMiss','Tanımsız');await has('cStatus','Henüz erişim yok');await set('cStep',100);await is('cCounts','100 · 75 · 25');await is('c3C','İz bitince');
      await set('cSize',128);await set('cBlock',64);await set('cAssoc','4');await is('cGeom','1 × 2 · 2 blok');await has('cLinesNote','sınırlandı');
      for(const r of[8,64])for(const c of[8,64]){await set('cRows',r);await set('cCols',c);await fits('cache '+r+'×'+c);}
      await set('cPenalty',200);await set('cHit',4);await is('cPenaltyOut','200 çevrim');
      await click('cacheReset');await is('cCounts','1024 · 768 · 256');await is('cAmatM','26 çevrim');await is('cStepOut','1024 / 1024');
      // --- 04
      await tab('perf');await is('eCpiM','4,0982');await is('eCpiT','4,1');await is('eCpiD','-0,044 %');await is('eTimeA','20,491 s');await is('eTimeB','4,893 · 16,31 s');await is('eRatio','1,256 / 1,255');await has('eStatus','daha hızlı');
      await set('eExtra',4);await has('eStatus','yüzde 7,9 daha hızlı');await set('eFB',2.5);await has('eStatus','yüzde 11,2 daha uzun sürüyor, yani daha yavaş');await has('eStatus','Daha yüksek GHz');await set('eLoad',40);await set('eStore',30);await set('eBranch',30);await has('eBranchOut','aritmetik % 0');await is('eCpiT','4,1');await set('eLoad',0);await set('eStore',0);await set('eBranch',0);await is('eCpiM','4');await is('eCpiD','0 %');
      await is('aTicks','1000 · 213');await is('aMeasured','4,695 kat');await is('aTheory','4,706 kat');await is('aDiff','-0,23 %');await is('aLimit','10 kat');await is('aEff','58,7 %');
      await set('aP',256);await is('aTicks','1000 · 104');await is('aMeasured','9,615 kat');await set('aP',1);await is('aMeasured','1 kat');await is('aDiff','0 %');
      await set('aF',1);await set('aP',8);await is('aLimit','Sınırsız (f = 1)');await is('aMeasured','8 kat');await set('aF',0);await is('aMeasured','1 kat');await is('aLimit','1 kat');
      await set('aF',0.9);await set('aP',64);await set('aOver',2);await is('aTicks','1000 · 241');await has('aStatus','varsayımının dışında');await has('aStatus','yasanın yüzde 52,7 altında');
      await click('perfReset');await is('aMeasured','4,695 kat');await is('eCpiM','4,0982');await fits('perf');
      // --- klavye, etiketler, çekirdek
      await page.locator('#tab-perf').focus();await page.keyboard.press('Home');eq(await page.locator('#tab-num').getAttribute('aria-selected'),'true');await page.keyboard.press('ArrowRight');eq(await page.locator('#tab-pipe').getAttribute('aria-selected'),'true');eq(await page.locator('#panel-pipe').isVisible(),true);await page.keyboard.press('End');eq(await page.locator('#tab-perf').getAttribute('aria-selected'),'true');await page.keyboard.press('ArrowRight');eq(await page.locator('#tab-num').getAttribute('aria-selected'),'true');await page.keyboard.press('ArrowLeft');eq(await page.locator('#tab-perf').getAttribute('aria-selected'),'true');
      await set('aP',32);await page.locator('h1').click();await page.keyboard.press('r');await is('aPOut','8');
      await click('tab-pipe');await click('pStart');await page.locator('h1').click();await page.keyboard.press('Space');eq(await page.locator('#pPlay').getAttribute('aria-pressed'),'true');await page.keyboard.press('Space');eq(await page.locator('#pPlay').getAttribute('aria-pressed'),'false');
      await page.locator('#pCode').focus();await page.keyboard.type('# r');await is('pCycles','14');
      eq(await page.evaluate(()=>[...document.querySelectorAll('.app-content input,.app-content select,.app-content textarea')].filter(e=>!(e.id&&document.querySelector('label[for="'+e.id+'"]'))&&!e.getAttribute('aria-label')).map(e=>e.id)),[],'etiketsiz denetim');
      eq(await page.evaluate(()=>[...document.querySelectorAll('.app-content button')].filter(b=>!b.textContent.trim()||(/^[01]$/.test(b.textContent.trim())&&!b.getAttribute('aria-label'))).length),0,'adsız düğme');
      eq(await page.evaluate(()=>[...document.querySelectorAll('.app-content canvas')].every(c=>c.getAttribute('role')==='img'&&c.getAttribute('aria-label'))),true);
      eq(await page.evaluate(()=>Object.isFrozen(ArchLab)&&!Object.getOwnPropertyDescriptor(window,'ArchLab').writable),true);
      eq(await page.evaluate(()=>/[̀-ͯ]/.test(document.querySelector('.app-content').textContent.normalize('NFC'))),false,'birleşik işaret yok');
      assert.deepEqual(errors,[]);checks++;await page.close();
    }
    console.log(`G bilgisayar mimarisi: ${checks-before} tarayıcı denetimi PASS (390 px aydınlık + 1280 px karanlık)`);
  }finally{await browser?.close();await new Promise(r=>server.close(r));}
}
