// Kalıcı denetim: makine-dili-assembly-c.html çekirdeği (window.MachineLab).
// Başvurular sayfanın kodunu yinelemez: BigInt aritmetiğiyle yazılmış ikinci bir öğretim-işlemcisi yorumlayıcısı
// (rastgele bellek görüntüleriyle adım adım karşılaştırma), elle kodlanmış baytlar, yinelemeli (recurrence) sayımlar,
// yüksek düzeyli JS başvuruları ve korunan x86-64 panelinin 30 baytını yürüten küçük bir x86 alt küme yorumlayıcısı.
// `--browser` ile gerçek tarayıcıda (390 px açık, 1280 px koyu) arayüz denetimleri de çalışır.
import fs from 'node:fs';
import vm from 'node:vm';
import assert from 'node:assert/strict';
const html=fs.readFileSync(new URL('../makine-dili-assembly-c.html',import.meta.url),'utf8');
const source=html.split('/* KERNEL-BEGIN */')[1]?.split('/* KERNEL-END */')[0];
assert(source,'KERNEL-BEGIN / KERNEL-END sınırları gerekli');
const context={};vm.createContext(context);vm.runInContext(source+';globalThis.K=MachineLab;',context);
const K=context.K;let checks=0;
const plain=v=>v===undefined?null:JSON.parse(JSON.stringify(v));
const eq=(a,b,msg)=>{assert.deepEqual(plain(a),plain(b),msg||`${JSON.stringify(a)} ≠ ${JSON.stringify(b)}`);checks++;};
const ok=(v,msg)=>{assert(v,msg);checks++;};
let seed=20261111;const rnd=()=>{seed=(Math.imul(seed,1664525)+1013904223)>>>0;return seed/4294967296;},ri=n=>Math.floor(rnd()*n);

/* ---------- 1. ALU: 8 işlem × 65.536 çift, BigInt başvurusu ---------- */
const S8=x=>x>127n?x-256n:x,out=s=>s>127n||s<-128n;
function refAlu(op,a,b){const A=BigInt(a),B=BigInt(b);let r,c=false,v=false;
 if(op==='ADD'){const u=A+B;r=u%256n;c=u>255n;v=out(S8(A)+S8(B));}
 else if(op==='SUB'||op==='CMP'){const u=A-B;r=((u%256n)+256n)%256n;c=A<B;v=out(S8(A)-S8(B));}
 else if(op==='AND')r=A&B;else if(op==='OR')r=A|B;else if(op==='XOR')r=A^B;
 else if(op==='SHL'){r=(A*2n)%256n;c=A>=128n;v=out(S8(A)*2n);}
 else if(op==='SHR'){r=A/2n;c=A%2n===1n;v=A>=128n;}
 else throw new Error(op);
 return{r:Number(r),z:r===0n?1:0,c:c?1:0,n:r>=128n?1:0,v:v?1:0};}
const OPS=['ADD','SUB','CMP','AND','OR','XOR','SHL','SHR'];
for(const op of OPS){let bad=0,c=0,v=0,both=0;
 for(let a=0;a<256;a++)for(let b=0;b<256;b++){const x=K.alu(op,a,b),y=refAlu(op,a,b);if(x.r!==y.r||x.z!==y.z||x.c!==y.c||x.n!==y.n||x.v!==y.v)bad++;c+=y.c;v+=y.v;both+=y.c&y.v;}
 eq(bad,0,op+': ALU ile BigInt başvurusu ayrışıyor');
 const cnt=K.flagCounts(op),th=K.flagTheory(op);eq([cnt.c,cnt.v,cnt.both],[c,v,both],op+' sayımı');eq([th.c,th.v,th.both],[c,v,both],op+' kapalı biçimi');}
eq(K.flagTheory('ADD'),{c:32640,v:16384,both:8256});
{let bad=0;for(let a=0;a<256;a++)for(let b=0;b<256;b++){const f=K.alu('CMP',a,b),sa=a>127?a-256:a,sb=b>127?b-256:b;
  if(K.cond('JZ',f)!==(a===b)||K.cond('JNZ',f)!==(a!==b)||K.cond('JC',f)!==(a<b)||K.cond('JNC',f)!==(a>=b)||K.cond('JLT',f)!==(sa<sb)||K.cond('JGE',f)!==(sa>=sb))bad++;}
 eq(bad,0,'CMP sonrası atlama koşulları');}
const ver=K.verifyAlu();eq([ver.pairs,ver.mismatches,ver.jumpMismatches],[65536,0,0]);
// bilinen tekil durumlar
eq((({r,z,c,n,v})=>[r,z,c,n,v])(K.alu('ADD',127,1)),[128,0,0,1,1]);eq((({r,z,c,n,v})=>[r,z,c,n,v])(K.alu('ADD',255,1)),[0,1,1,0,0]);
eq((({r,z,c,n,v})=>[r,z,c,n,v])(K.alu('ADD',128,128)),[0,1,1,0,1]);eq((({r,z,c,n,v})=>[r,z,c,n,v])(K.alu('SUB',5,7)),[254,0,1,1,0]);
eq((({r,z,c,n,v})=>[r,z,c,n,v])(K.alu('SUB',128,1)),[127,0,0,0,1]);
// elde zinciri: toplamın her biti a ^ b ^ elde girişi
for(let k=0;k<400;k++){const a=ri(256),b=ri(256),t=K.alu('ADD',a,b),cin=(t.chain<<1)&255;eq(t.r,(a^b^cin)&255);}

/* ---------- 2. Derleyici: belgelenen kodlamadan elle hesaplanmış baytlar ---------- */
const NAMES=[null,'HLT','MOV','MOV','LOAD','LOAD','STORE','STORE','ADD','ADD','SUB','SUB','AND','OR','XOR','SHL','SHR','CMP','CMP','JMP','JZ','JNZ','JC','JNC','JLT','JGE','CALL','RET','PUSH','POP'];
eq(K.SPEC.map(s=>[s[0],s[1]]),NAMES.slice(1).map((n,i)=>[i+1,n]));
const enc=(code,rd,b1)=>[(code<<3)|rd,b1&255];
const hand=[['HLT',enc(1,0,0)],['MOV R2, R5',enc(2,2,5)],['mov r3, #0x2A',enc(3,3,42)],['LOAD R1, [64]',enc(4,1,64)],['LOAD R1, [R6]',enc(5,1,6)],['STORE R4, [0b101]',enc(6,4,5)],['STORE R4, [sp]',enc(7,4,7)],
 ['ADD R0, R1',enc(8,0,1)],['ADD R7, #-1',enc(9,7,255)],['SUB R2, R3',enc(10,2,3)],['SUB R2, #200',enc(11,2,200)],['AND R1, R2',enc(12,1,2)],['OR R1, R2',enc(13,1,2)],['XOR R5, R5',enc(14,5,5)],
 ['SHL R6',enc(15,6,0)],['SHR R6',enc(16,6,0)],['CMP R0, R7',enc(17,0,7)],['CMP R0, #-128',enc(18,0,128)],['JMP 4',enc(19,0,4)],['JZ 0xFE',enc(20,0,254)],['JNZ 0',enc(21,0,0)],['JC 2',enc(22,0,2)],['JNC 2',enc(23,0,2)],
 ['JLT 2',enc(24,0,2)],['JGE 2',enc(25,0,2)],['CALL 100',enc(26,0,100)],['RET',enc(27,0,0)],['PUSH R3',enc(28,3,0)],['POP SP',enc(29,7,0)]];
for(const[src,bytes]of hand){const a=K.assemble(src);ok(a.ok,src);eq(a.bytes,bytes,src);ok(K.disasm(bytes[0],bytes[1]),src);eq(K.assemble(K.disasm(bytes[0],bytes[1])).bytes,bytes,'disasm gidiş-dönüş: '+src);}
eq(K.assemble(hand.map(h=>h[0]).join('\n')).bytes,hand.flatMap(h=>h[1]));
{const a=K.assemble('  JMP son ; ileri başvuru\nveri: .byte 1, 0x10, -1, veri, son\nson: MOV R0, #veri\n HLT');ok(a.ok);eq(a.bytes,[...enc(19,0,7),1,16,255,2,7,...enc(3,0,2),...enc(1,0,0)]);eq(a.labels,{veri:2,son:7});eq(a.size,11);eq(a.instructions,3);
 eq(a.rows.map(r=>r.addr),[0,2,7,9]);eq(a.lineOfAddr,{0:1,7:3,9:4});}
{const a=K.assemble('döngü: SUB R1, #1\nJNZ döngü\nçıkış_2: HLT');ok(a.ok,'Türkçe harfli etiket');eq(a.bytes,[...enc(11,1,1),...enc(21,0,0),...enc(1,0,0)]);}
const errLines=src=>K.assemble(src).errors.map(e=>e.line);
eq(errLines('MOV R0, 5'),[1]);eq(errLines('HLT\nJMP yok'),[2]);eq(errLines('a: HLT\na: HLT'),[2]);eq(errLines('HLT\n\nFOO R1'),[3]);eq(errLines('MOV R8, #1'),[1]);eq(errLines('.byte 256'),[1]);eq(errLines('.byte -129'),[1]);
eq(errLines('ADD R1,,R2'),[1]);eq(errLines('R1: HLT'),[1]);eq(errLines('mov: HLT'),[1]);eq(errLines('1a: HLT'),[1]);eq(errLines('HLT R1'),[1]);eq(errLines('PUSH #1'),[1]);eq(errLines('LOAD R1, R2'),[1]);eq(errLines('MOV R0, #1\nXX\nYY\nHLT'),[2,3]);
eq(errLines('.byte'),[1]);eq(errLines('x: .byte '+Array(257).fill(0).join(',')),[1]);ok(K.assemble('.byte '+Array(256).fill(7).join(',')).ok);eq(K.assemble('; yalnız açıklama\n\n').bytes,[]);
ok(K.assemble('MOV R0, 5').errors[0].msg.includes('#sabit'));ok(!K.assemble('MOV R0, 5').ok);eq(K.assemble('MOV R0, 5').bytes,[]);

/* ---------- 3. İkinci yorumlayıcı (BigInt bayraklar, ad tablosu) ile adım adım karşılaştırma ---------- */
function refMachine(bytes,protect){const mem=new Array(256).fill(0);bytes.slice(0,256).forEach((b,i)=>mem[i]=b&255);
 return{mem,reg:[0,0,0,0,0,0,0,255],pc:0,f:{z:0,c:0,n:0,v:0},halted:false,fault:null,steps:0,calls:0,maxDepth:0,limit:Math.min(256,bytes.length),protect};}
function refStep(m){if(m.halted)return;const pc=m.pc;if(pc>254){m.halted=true;m.fault='pc';return;}
 const b0=m.mem[pc],b1=m.mem[pc+1],name=NAMES[b0>>3],code=b0>>3,rd=b0&7,rs=b1&7,R=m.reg;if(!name){m.halted=true;m.fault='badop';return;}
 const imm=code===3||code===9||code===11||code===18,src=imm?b1:R[rs];let next=pc+2;
 const setF=t=>{m.f={z:t.z,c:t.c,n:t.n,v:t.v};};
 const push=v=>{const sp=R[7];if(sp<m.limit&&m.protect){m.halted=true;m.fault='overflow';return false;}m.mem[sp]=v;R[7]=(sp+255)%256;return true;};
 const pop=()=>{if(R[7]===255){m.halted=true;m.fault='underflow';return null;}R[7]++;return m.mem[R[7]];};
 if(name==='HLT'){m.steps++;m.halted=true;return;}
 else if(name==='MOV')R[rd]=src;
 else if(name==='LOAD')R[rd]=m.mem[code===4?b1:R[rs]];
 else if(name==='STORE')m.mem[code===6?b1:R[rs]]=R[rd];
 else if(['ADD','SUB','AND','OR','XOR'].includes(name)){const t=refAlu(name,R[rd],src);R[rd]=t.r;setF(t);}
 else if(name==='SHL'||name==='SHR'){const t=refAlu(name,R[rd],0);R[rd]=t.r;setF(t);}
 else if(name==='CMP')setF(refAlu('CMP',R[rd],src));
 else if(name==='JMP')next=b1;
 else if(name==='JZ'){if(m.f.z)next=b1;}else if(name==='JNZ'){if(!m.f.z)next=b1;}else if(name==='JC'){if(m.f.c)next=b1;}else if(name==='JNC'){if(!m.f.c)next=b1;}
 else if(name==='JLT'){if(m.f.n!==m.f.v)next=b1;}else if(name==='JGE'){if(m.f.n===m.f.v)next=b1;}
 else if(name==='CALL'){if(!push(next%256))return;m.calls++;next=b1;}
 else if(name==='RET'){const v=pop();if(v===null)return;next=v;}
 else if(name==='PUSH'){if(!push(R[rd]))return;}
 else if(name==='POP'){const v=pop();if(v===null)return;R[rd]=v;}
 m.pc=next;m.steps++;m.maxDepth=Math.max(m.maxDepth,255-R[7]);}
const snap=m=>[Array.from(m.mem),Array.from(m.reg),m.pc,m.halted,m.steps,m.calls,m.maxDepth];
function lockstep(bytes,protect,limit){const a=K.createMachine(bytes,{protect}),b=refMachine(bytes,protect);let n=0;
 while(n<limit&&!(a.halted&&b.halted)){K.step(a);refStep(b);n++;
  assert.deepEqual(plain([...snap(a),a.z,a.c,a.n,a.v,a.fault?a.fault.kind:null]),[...snap(b),b.f.z,b.f.c,b.f.n,b.f.v,b.fault],'ayrışma, adım '+n);}
 checks++;return{a,b,n};}
// rastgele bellek görüntüleri: geçerli/geçersiz kodlar, taşmalar, kendi kendini değiştiren kod dahil
for(let t=0;t<400;t++){const len=2+ri(120),bytes=[];for(let i=0;i<len;i++)bytes.push(i%2===0&&rnd()<.85?((1+ri(29))<<3)|ri(8):ri(256));lockstep(bytes,t%2===0,400);}
// hazır programlar: çekirdek, ikinci yorumlayıcı ve yüksek düzeyli başvurular
const runRef=(src,protect=true)=>{const a=K.assemble(src);ok(a.ok,'hazır program derlenmeli');const r=lockstep(a.bytes,protect,K.STEP_LIMIT);return{a,m:r.a,ref:r.b};};
const result=r=>r.m.mem[r.a.labels['sonuç']];
for(let n=0;n<=40;n++){const r=runRef(K.programs.sum(n));let s=0,steps=6;for(let i=1;i<=n;i++){s+=i;steps+=5;}eq([r.m.fault,r.m.steps,result(r)],[null,steps,s%256]);eq(K.theory.sum(n),{steps,exact:s,result:s%256});}
for(const a of[0,1,7,13,255])for(const b of[0,1,6,37,50]){const r=runRef(K.programs.mul(a,b));eq([r.m.steps,result(r)],[7+5*b,(a*b)%256]);eq(K.theory.mul(a,b).steps,r.m.steps);eq(K.theory.mul(a,b).result,result(r));}
for(let t=0;t<120;t++){const len=t<4?t:ri(17),arr=Array.from({length:len},()=>ri(256)-128),r=runRef(K.programs.max(arr)),want=len?Math.max(...arr):0;
 let u=0,best=arr[0];for(let i=1;i<len;i++)if(arr[i]>best){best=arr[i];u++;}
 eq(K.signed(r.m.reg[0]),want);eq(K.signed(result(r)),want);eq(r.m.steps,len?8*len+6+u:9);eq(K.theory.max(arr).steps,r.m.steps);eq(K.theory.max(arr).signedResult,want);eq(r.m.maxDepth,1);}
eq(runRef(K.programs.max([12,45,-7,88,23,61,90])).m.steps,65);
// faktöriyel: adım sayısı yineleme bağıntısıyla, derinlik açık bir çağrı modeliyle
{let steps=8,size=null;for(let n=0;n<=120;n++){if(n)steps+=5*n+14;const r=runRef(K.programs.fact(n));size=r.a.size;const cap=256-size;
  let depth=0,maxD=0,calls=0;const call=f=>{depth++;calls++;maxD=Math.max(maxD,depth);f();depth--;},fact=k=>{if(k===0)return;depth++;maxD=Math.max(maxD,depth);call(()=>fact(k-1));depth--;call(()=>{});};call(()=>fact(n));
  let f=1n;for(let i=2n;i<=BigInt(n);i++)f*=i;const th=K.theory.fact(n);eq([th.steps,th.depth,th.calls,th.result],[steps,maxD,calls,Number(f%256n)]);eq(maxD,2*n+1);
  if(maxD<=cap)eq([r.m.fault,r.m.steps,r.m.maxDepth,r.m.calls,result(r)],[null,steps,maxD,calls,Number(f%256n)]);
  else{eq(r.m.fault.kind,'overflow');eq(r.m.maxDepth,cap);eq(Array.from(r.m.mem.slice(0,size)),r.a.bytes,'korumalı taşmada program görüntüsü bozulmamalı');}}
 eq(size,48);ok(2*103+1<=256-size&&2*104+1>256-size,'taşma eşiği n = 104');eq(K.theory.fact(5),{steps:153,depth:11,calls:11,result:120});}
// Fibonacci
{const I=[4,4],C=[1,1],D=[0,0];for(let n=2;n<=13;n++){I[n]=12+I[n-1]+I[n-2];C[n]=1+C[n-1]+C[n-2];D[n]=Math.max(2+D[n-1],3+D[n-2]);}
 const fib=n=>n<2?n:fib(n-1)+fib(n-2);
 for(let n=0;n<=13;n++){const r=runRef(K.programs.fib(n));eq([r.m.fault,r.m.steps,r.m.maxDepth,r.m.calls,result(r)],[null,4+I[n],1+D[n],C[n],fib(n)%256]);const th=K.theory.fib(n);eq([th.steps,th.depth,th.calls,th.result],[4+I[n],1+D[n],C[n],fib(n)%256]);}
 eq(K.theory.fib(6),{steps:200,depth:12,calls:25,exact:8,result:8});eq(fib(13),233);}
// taban durumu olmayan özyineleme: kapasitenin tamamı dolar, program görüntüsü korunur
{const r=runRef(K.programs.runaway()),cap=256-r.a.size;eq(r.a.size,14);eq(r.m.fault.kind,'overflow');eq([r.m.maxDepth,r.m.calls,r.m.steps],[cap,Math.ceil(cap/2),cap+Math.floor(cap/2)]);eq(K.theory.runaway(cap),{depth:242,calls:121,steps:363});
 eq(Array.from(r.m.mem.slice(0,14)),r.a.bytes);eq(r.m.overwritten,0);
 const off=runRef(K.programs.runaway(),false);ok(off.m.overwritten>0,'koruma kapalıyken görüntünün üstüne yazılır');ok(Array.from(off.m.mem.slice(0,14)).join()!==off.a.bytes.join());
 const off2=runRef(K.programs.fact(120),false);ok(off2.m.overwritten>0&&off2.m.halted);}
// tekil hatalar ve sınırlar
{let m=K.createMachine(K.assemble('POP R1').bytes);K.run(m);eq([m.fault.kind,m.steps],['underflow',0]);m=K.createMachine(K.assemble('RET').bytes);K.run(m);eq(m.fault.kind,'underflow');
 m=K.createMachine(K.assemble('MOV R0, #1').bytes);K.run(m);eq([m.fault.kind,m.fault.pc,m.steps],['badop',2,1]);m=K.createMachine(K.assemble('JMP 255').bytes);K.run(m);eq(m.fault.kind,'pc');
 m=K.createMachine(K.assemble('x: JMP x').bytes);eq(K.run(m),K.STEP_LIMIT);ok(!m.halted);eq(m.steps,200000);
 m=K.createMachine(K.assemble('MOV R1, #9\nPUSH R1\nCALL f\nHLT\nf: RET').bytes);K.step(m);K.step(m);eq([m.reg[7],m.mem[255],m.tags[255].k,m.tags[255].r],[254,9,'reg',1]);K.step(m);eq([m.mem[254],m.tags[254].k,m.pc,m.depth],[6,'ret',8,2]);K.step(m);eq([m.pc,m.tags[254],m.depth],[6,null,1]);K.step(m);ok(m.halted&&!m.fault);eq([m.steps,m.maxDepth,m.calls,m.pc],[5,2,1,6]);
 m=K.createMachine(K.assemble('MOV R1, #7\nSTORE R1, [200]\nHLT').bytes);K.run(m);eq([m.mem[200],m.changed[200],m.changed[199]],[7,1,0]);}
ok(Object.isFrozen(K)&&Object.isFrozen(K.SPEC)&&Object.isFrozen(K.programs)&&Object.isFrozen(K.theory));

/* ---------- 4. Korunan x86-64 paneli: metin birebir, 30 bayt küçük bir x86 yorumlayıcısında ---------- */
const PANEL=["31 C0          ; xor eax, eax\n85 F6          ; test esi, esi\n7E 17          ; jle .done\n8B 07          ; mov eax, [rdi]\nB9 01 00 00 00 ; mov ecx, 1\nEB 0A          ; jmp .check\n8B 14 8F       ; .loop: mov edx, [rdi+rcx*4]\n39 D0          ; cmp eax, edx\n0F 4C C2       ; cmovl eax, edx\nFF C1          ; inc ecx\n39 F1          ; .check: cmp ecx, esi\n7C F2          ; jl .loop\nC3             ; .done: ret",
 "max_value:\n    xorl   %eax, %eax       # dönüş = 0\n    testl  %esi, %esi       # len <= 0 ?\n    jle    .done            # evetse 0 döndür\n    movl   (%rdi), %eax     # max = arr[0]\n    movl   $1, %ecx         # i = 1\n    jmp    .check\n.loop:\n    movl   (%rdi,%rcx,4), %edx # arr[i]\n    cmpl   %edx, %eax       # max - arr[i]\n    cmovll %edx, %eax       # max < arr[i] ise\n    incl   %ecx             # i++\n.check:\n    cmpl   %esi, %ecx       # i < len ?\n    jl     .loop\n.done:\n    ret    ",
 "int max_value(int *arr, int len) {\n    if (len <= 0) return 0;\n    int max = arr[0];\n    for (int i = 1; i < len; i++) {\n        if (arr[i] > max)\n            max = arr[i];\n    }\n    return max;\n}"];
const unhtml=s=>s.replace(/<[^>]+>/g,'').replace(/&lt;/g,'<').replace(/&gt;/g,'>').replace(/&amp;/g,'&');
['colHex','colAtt','colC'].forEach((id,i)=>{const m=new RegExp('<div class="cb-body" id="'+id+'">([\\s\\S]*?)</div>').exec(html);ok(m,id+' bulunmalı');eq(unhtml(m[1]),PANEL[i],id+' metni korunmalı');});
const code=PANEL[0].split('\n').flatMap(l=>l.split(';')[0].trim().split(/\s+/).map(h=>parseInt(h,16)));eq(code.length,30);eq(PANEL[0].split('\n').length,13);
eq(PANEL[1].split('\n').filter(l=>/^\s+\S/.test(l)).length,13,'AT&T sütununda 13 komut');
function x86max(arr,len){const R=new Int32Array(8),mem=Int32Array.from(arr);/* 0 eax,1 ecx,2 edx,6 esi,7 rdi (bayt adresi) */R[6]=len;R[7]=0;let ip=0,zf=0,sf=0,of=0,n=0;const starts=new Set();
 const sub=(a,b)=>{const r=(a-b)|0;zf=r===0?1:0;sf=r<0?1:0;of=((a^b)&(a^r))<0?1:0;},rel=b=>b>127?b-256:b,rd=a=>{assert(a%4===0&&a/4<mem.length&&a>=0,'bellek dışı okuma');return mem[a/4];};
 for(;;){assert(++n<10000);starts.add(ip);const op=code[ip];
  if(op===0x31){const m=code[ip+1];assert(m>>6===3);R[m&7]^=R[m>>3&7];zf=R[m&7]===0?1:0;sf=R[m&7]<0?1:0;of=0;ip+=2;}
  else if(op===0x85){const m=code[ip+1];assert(m>>6===3);const r=R[m&7]&R[m>>3&7];zf=r===0?1:0;sf=r<0?1:0;of=0;ip+=2;}
  else if(op===0x7E){ip+=2+((zf||sf!==of)?rel(code[ip+1]):0);}
  else if(op===0x7C){ip+=2+((sf!==of)?rel(code[ip+1]):0);}
  else if(op===0xEB){ip+=2+rel(code[ip+1]);}
  else if(op===0x8B){const m=code[ip+1];assert(m>>6===0);if((m&7)===4){const sib=code[ip+2];R[m>>3&7]=rd(R[sib&7]+R[sib>>3&7]*(1<<(sib>>6)));ip+=3;}else{R[m>>3&7]=rd(R[m&7]);ip+=2;}}
  else if(op===0xB9){R[1]=code[ip+1]|code[ip+2]<<8|code[ip+3]<<16|code[ip+4]<<24;ip+=5;}
  else if(op===0x39){const m=code[ip+1];assert(m>>6===3);sub(R[m&7],R[m>>3&7]);ip+=2;}
  else if(op===0x0F){assert(code[ip+1]===0x4C);const m=code[ip+2];assert(m>>6===3);if(sf!==of)R[m>>3&7]=R[m&7];ip+=3;}
  else if(op===0xFF){const m=code[ip+1];assert(m>>6===3&&(m>>3&7)===0);R[m&7]=(R[m&7]+1)|0;ip+=2;}
  else if(op===0xC3)return{value:R[0],starts};
  else assert.fail('beklenmeyen bayt '+op.toString(16)+' @'+ip);}}
const cmax=(arr,len)=>{if(len<=0)return 0;let max=arr[0];for(let i=1;i<len;i++)if(arr[i]>max)max=arr[i];return max;};
const boundaries=new Set([0,2,4,6,8,13,15,18,20,23,25,27,29]);
for(let t=0;t<3000;t++){const len=ri(24),arr=Array.from({length:Math.max(1,len)},()=>t%3?ri(2001)-1000:(ri(2)?1:-1)*ri(2147483647)),useLen=t%17===0?-ri(5):len,r=x86max(arr,useLen);eq(r.value,cmax(arr,useLen));for(const s of r.starts)assert(boundaries.has(s),'atlama komut sınırına inmeli');}
eq(x86max([5],0).value,0);eq(x86max([-2147483648,-5,-7],3).value,-5);
// öğretim çevirisi, C işleviyle aynı sonucu verir (8 bit aralığında)
for(let t=0;t<60;t++){const arr=Array.from({length:1+ri(16)},()=>ri(256)-128),m=K.createMachine(K.assemble(K.programs.max(arr)).bytes);K.run(m);eq(K.signed(m.reg[0]),x86max(arr,arr.length).value);}

/* ---------- 5. Sayfa metni: biçim kuralları ---------- */
ok(!/[̀-ͯ]/.test(html),'birleşik işaret yok');ok(!/\p{Extended_Pictographic}/u.test(html.replace(/[←→↑↓]/g,'')),'emoji yok');ok(!/https?:\/\//.test(html),'dış bağlantı/CDN yok');
ok(/<body class="app-page" data-page="makine-dili-assembly-c">/.test(html));ok(!/godbolt|simpleCompile|c2aInput/.test(html),'eski arama tablosu "derleyici gezgini" kaldırıldı');
ok(!/\b(arm|aarch64|risc-v|mips)\b/i.test(html),'başka gerçek mimari için liste yok');
console.log(`G makine-dili-assembly-c: ${checks.toLocaleString('tr-TR')} çekirdek kontrolü PASS (ALU 8 × 65.536 çift BigInt ile, ikinci yorumlayıcıyla adım adım karşılaştırma, x86-64 paneli 3.000 dizide)`);

/* ---------- 6. Tarayıcı ---------- */
if(process.argv.includes('--browser')){
 const {chromium}=await import('playwright');const {createServer}=await import('node:http');const {join,extname}=await import('node:path');const {fileURLToPath}=await import('node:url');const root=fileURLToPath(new URL('../',import.meta.url));
 const server=createServer((req,res)=>{const file=join(root,decodeURIComponent(new URL(req.url,'http://localhost').pathname));if(!fs.existsSync(file)||fs.statSync(file).isDirectory()){res.writeHead(404).end();return;}res.setHeader('Content-Type',({'.html':'text/html; charset=utf-8','.js':'text/javascript; charset=utf-8','.css':'text/css; charset=utf-8'})[extname(file)]||'application/octet-stream');res.end(fs.readFileSync(file));});
 await new Promise(r=>server.listen(0,'127.0.0.1',r));let browser;const before=checks;
 try{browser=await chromium.launch();
  for(const[theme,width]of[['light',390],['dark',1280]]){
   const page=await browser.newPage({viewport:{width,height:900},deviceScaleFactor:width<500?2:1});await page.addInitScript(t=>{localStorage.setItem('acelya-theme',t);localStorage.setItem('acelya-sound-muted','1');},theme);
   page.setDefaultTimeout(6000);const errors=[];page.on('pageerror',e=>errors.push(e.message));page.on('console',m=>{if(m.type()==='error')errors.push(m.text());});
   await page.goto(`http://127.0.0.1:${server.address().port}/makine-dili-assembly-c.html`);await page.waitForSelector('#cpuListing tr');
   const click=id=>page.locator('#'+id).click(),read=async id=>(await page.locator('#'+id).textContent()).trim(),
    range=(id,v)=>page.locator('#'+id).evaluate((e,v)=>{e.value=v;e.dispatchEvent(new Event('input',{bubbles:true}));},String(v)),
    type=(id,v)=>page.locator('#'+id).evaluate((e,v)=>{e.value=v;e.dispatchEvent(new Event('input',{bubbles:true}));},v),
    pick=(id,v)=>page.locator('#'+id).selectOption(v),
    is=async(id,text)=>{const t=await read(id);assert.equal(t,text,`${id}: "${t}" ≠ "${text}" (${theme})`);checks++;},
    has=async(id,text)=>{const t=await read(id);assert(t.includes(text),`${id}: "${t}" içinde "${text}" yok (${theme})`);checks++;},
    fits=async tag=>{const d=await page.evaluate(()=>document.documentElement.scrollWidth-innerWidth);assert(d<=0,`${tag}: yatay taşma ${d}px (${theme})`);checks++;};
   // 01 · Küçük işlemci
   await is('cpuSteps','0');await is('cpuTheory','56');await is('cpuDiff','—');await is('cpuResult','—');await has('cpuStatus','Hazır: 20 bayt');await has('cpuSize','20 bayt · 9 komut');
   await click('cpuStep');await is('cpuSteps','1');await has('cpuStatus','PC = 0x02');eq(await page.locator('#cpuListing tr.is-pc td').nth(3).textContent().then(t=>t.includes('LOAD R1')),true);
   await click('cpuFinish');await is('cpuSteps','56');await is('cpuDiff','0');await has('cpuResult','55');await is('cpuExpect','55');await has('cpuStatus','HLT ile durdu');eq(await page.locator('#panel-cpu h2').nth(1).textContent(),'Çeviricinin (assembler) çıktısı: adres, baytlar, kaynak');eq(await page.locator('#cpuStep').isDisabled(),true);
   await click('cpuRestart');await is('cpuSteps','0');await range('cpuSpeed',100);await has('cpuSpeedOut','500');await click('cpuRun');await page.waitForFunction(()=>document.getElementById('cpuDiff').textContent==='0');await is('cpuSteps','56');await is('cpuRun','Çalıştır');
   await range('cpuSumN',40);await is('cpuSteps','0');await click('cpuFinish');await is('cpuSteps','206');await is('cpuDiff','0');await has('cpuResult','52');await has('cpuExpect','820 mod 256');
   await range('cpuSumN',0);await click('cpuFinish');await is('cpuSteps','6');await is('cpuTheory','6');await has('cpuResult','0');
   await pick('cpuPreset','mul');await is('cpuTheory','37');await click('cpuFinish');await is('cpuSteps','37');await has('cpuResult','42');await range('cpuMulA',255);await range('cpuMulB',50);await click('cpuFinish');await is('cpuSteps','257');await is('cpuDiff','0');await has('cpuResult','206');
   await pick('cpuPreset','fact');await click('cpuFinish');await is('cpuSteps','153');await is('cpuTheory','153');await has('cpuResult','120');await range('cpuFactN',8);await click('cpuFinish');await is('cpuSteps','300');await has('cpuResult','128');await has('cpuExpect','8! mod 256');
   await pick('cpuPreset','max');await click('cpuFinish');await is('cpuSteps','65');await is('cpuDiff','0');await has('cpuResult','90');await type('cpuArr','-5, -9, -128');await click('cpuFinish');await is('cpuSteps','30');await has('cpuResult','işaretli −5');await is('cpuExpect','−5 (0xFB)');
   await type('cpuArr','1, x');await has('cpuStatus','Dizi okunamadı');await is('cpuTheory','—');await type('cpuArr','200');await has('cpuStatus','dışında');await type('cpuArr','');await click('cpuFinish');await is('cpuSteps','9');await is('cpuDiff','0');
   await type('cpuSrc','MOV R0, 5\nJMP yok');eq(await page.locator('#cpuErrors').isVisible(),true);await has('cpuErrors','Satır 1');await has('cpuErrors','Satır 2');await has('cpuStatus','2 hata');eq(await page.locator('#cpuFinish').isDisabled(),true);await is('cpuSteps','—');
   await type('cpuSrc','x: JMP x');eq(await page.locator('#cpuErrors').isHidden(),true);await click('cpuFinish');await is('cpuSteps','200.000');await has('cpuStatus','durmadı');await is('cpuTheory','—');await is('cpuDiff','—');
   await type('cpuSrc','MOV R1, #3\nPUSH R1\nPOP R2\nPOP R3');await click('cpuFinish');await has('cpuStatus','Boş yığından çekme');await is('cpuSteps','3');
   await type('cpuSrc','MOV R0, #200\nADD R0, #100\nSTORE R0, [sonuç]\nHLT\nsonuç: .byte 0');await click('cpuFinish');await has('cpuResult','44');await is('cpuFC','C = 1');await has('cpuStatus','kapalı biçim tanımlı değil');eq(await page.locator('#cpuMem .c.is-chg').count(),1);
   await page.locator('#cpuDoc summary').click();eq(await page.locator('#cpuSpec tbody tr').count(),29);await has('cpuSpec','1A 09');await page.locator('#cpuDoc summary').click();
   await click('cpuReset');await is('cpuTheory','56');eq(await page.locator('#cpuPreset').inputValue(),'sum');eq(await page.locator('#cpuSumN').inputValue(),'10');await is('cpuSpeedOut','10 komut/s');
   await page.locator('#tab-cpu').focus();await page.locator('h1').click();await page.keyboard.press('Space');await is('cpuRun','Duraklat');await page.keyboard.press('Space');await is('cpuRun','Çalıştır');
   await range('cpuSumN',3);await page.keyboard.press('r');eq(await page.locator('#cpuSumN').inputValue(),'10');{const len=(await page.locator('#cpuSrc').inputValue()).length;await page.locator('#cpuSrc').focus();await page.keyboard.type('r ');eq((await page.locator('#cpuSrc').inputValue()).length,len+2,'kısayollar yazı kutusunda devre dışı');await is('cpuRun','Çalıştır');}await click('cpuReset');await fits('cpu');
   // 02 · C'den makine koduna
   await click('tab-c');eq(await page.locator('#colHex').textContent(),PANEL[0]);eq(await page.locator('#colAtt').textContent(),PANEL[1]);eq(await page.locator('#colC').textContent(),PANEL[2]);
   await has('c2Result','90');await is('c2Ref','90');await is('c2Steps','65');await is('c2Theory','65');await is('c2Diff','0');await has('c2Bytes','16 komut, 32 bayt');await has('c2Bytes','13 komut, 30 bayt');
   eq(await page.locator('#colHex .ml-ln.is-map').count(),3);await pick('mapSel','5');eq(await page.locator('#colHex .ml-ln.is-map').allTextContents(),['0F 4C C2       ; cmovl eax, edx']);eq(await page.locator('#colAtt .ml-ln.is-map').count(),1);eq(await page.locator('#colC .ml-ln.is-map').allTextContents(),['            max = arr[i];']);eq(await page.locator('#c2Listing tr.is-map').count(),2);await has('mapNote','cmovll');
   await page.locator('#colHex .ml-ln').nth(12).click();eq(await page.locator('#mapSel').inputValue(),'8');eq(await page.locator('#colAtt .ml-ln.is-map').count(),2);await page.locator('#colC .ml-ln').nth(3).click();eq(await page.locator('#mapSel').inputValue(),'3');await page.locator('#colC .ml-ln').nth(3).click();eq(await page.locator('#mapSel').inputValue(),'6');
   for(let g=0;g<9;g++){await pick('mapSel',String(g));ok((await read('mapNote')).length>60);}
   await type('c2Arr','');await is('c2Steps','9');await has('c2Result','0');await has('c2Status','Boş dizi');await type('c2Arr','3 3 3');await is('c2Steps','30');await type('c2Arr','1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16');await is('c2Steps','149');await is('c2Diff','0');
   await type('c2Arr','1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17');await has('c2Status','En çok 16');await is('c2Steps','—');await type('c2Arr','-128, 127');await has('c2Result','127');
   await click('c2Open');eq(await page.locator('#tab-cpu').getAttribute('aria-selected'),'true');eq(await page.locator('#cpuPreset').inputValue(),'max');await is('cpuTheory','23');await click('cpuFinish');await is('cpuSteps','23');await has('cpuResult','127');await click('cpuReset');
   await click('tab-c');await click('c2Reset');await is('c2Steps','65');eq(await page.locator('#mapSel').inputValue(),'1');await fits('c');
   // 03 · Yığın ve çağrı
   await click('tab-stack');await is('stMax','0 bayt');await has('stTheory','11');await is('stDiff','—');await has('stCap','256 − 48 = 208');await has('stStack','Yığın boş');
   for(let i=0;i<7;i++)await click('stStep');await is('stDepth','3 bayt');eq(await page.locator('#stStack .ml-cell').count(),3);eq(await page.locator('#stStack .is-ret').count(),2);eq(await page.locator('#stStack .is-saved').count(),1);await has('stStack','R1 = 5');
   await click('stFinish');await is('stMax','11 bayt');await is('stDiff','0');await is('stCalls','11');await is('stCallsT','11');await is('stSteps','153');await is('stStepsT','153');await has('stResult','120 (beklenen 120)');await is('stDepth','0 bayt');
   await range('stN',103);await click('stFinish');await is('stMax','207 bayt');await is('stDiff','0');await is('stSteps','28.230');await is('stStepsT','28.230');
   await range('stN',104);await has('stStatus','taşması beklenir');await click('stFinish');await has('stStatus','Yığın taşması');await is('stMax','208 bayt');await has('stTheory','208');await is('stDiff','0');await is('stResult','—');await has('stStatus','209');
   await range('stN',120);await page.locator('#stProtect').uncheck();await has('stTheory','tanımsız');await click('stFinish');await has('stStatus','üstüne yazdı');await is('stDiff','—');await is('stResult','—');await page.locator('#stProtect').check();await is('stSteps','0');
   // doğrulayıcı (11 Kasım 2026): ezilen AYRI hücre sayısı ve aralığı; yalnız veri ezildiyse bunu söyle; bozulma durum satırının başında
   await page.locator('#stProtect').uncheck();await range('stN',120);await click('stFinish');await has('stStatus','28 hücrenin (0x14–0x2F)');
   await range('stN',104);await click('stFinish');ok((await read('stStatus')).startsWith('Yığın programın üstüne yazdı'),'bozulma başta söylenmeli');await has('stStatus','1 hücre (0x2F)');await has('stStatus','veri baytı (sonuç)');await is('stMax','209 bayt');await is('stResult','—');
   await range('stN',5);for(let i=0;i<7;i++)await click('stStep');await has('stStack','CALL (satır 13) yazdı');ok(!/’deki/.test(await read('stStack')),'sayıya sabit ek (’deki) yazılmamalı');
   await range('stN',105);await click('stFinish');await has('stStatus','3 hücre (0x2D–0x2F)');await has('stStatus','1 tanesi komut baytı');
   await range('stN',106);await click('stFinish');await has('stStatus','komutta durmadı');await has('stStatus','5 hücrenin (0x2B–0x2F)');
   await pick('stProg','run');await click('stFinish');ok((await read('stStatus')).startsWith('Yığın programın üstüne yazdı'),'tabansız özyineleme: bozulma başta');await has('stStatus','6 hücre (0x08–0x0D)');await has('stStatus','PC = 0xE0');await is('stSteps','481');await is('stResult','—');
   await pick('stProg','fact');await page.locator('#stProtect').check();await is('stSteps','0');
   await range('stN',0);await click('stFinish');await is('stMax','1 bayt');await is('stDiff','0');await is('stSteps','8');await has('stResult','1 (beklenen 1)');
   await pick('stProg','fib');eq(await page.locator('#stN').inputValue(),'6');eq(await page.locator('#stN').getAttribute('max'),'13');await click('stFinish');await is('stMax','12 bayt');await is('stDiff','0');await is('stCalls','25');await is('stCallsT','25');await is('stSteps','200');await is('stStepsT','200');await has('stResult','8 (beklenen 8)');
   await range('stN',13);await click('stFinish');await is('stMax','26 bayt');await is('stSteps','6.024');await is('stCallsT','753');await has('stResult','233');await range('stN',1);await click('stFinish');await is('stMax','1 bayt');await has('stTheory','1');await is('stDiff','0');
   await range('stN',4);for(let i=0;i<22;i++)await click('stStep');ok(await page.locator('#stStack .is-local').count()>=1,'yerel ara değer görünmeli');
   await pick('stProg','run');eq(await page.locator('#stNField').isHidden(),true);await has('stCap','242');await click('stFinish');await has('stStatus','Yığın taşması');await is('stMax','242 bayt');await is('stDiff','0');await is('stCalls','121');await is('stCallsT','121');await is('stSteps','363');await is('stStepsT','363');await has('stStack','hücre daha');
   await pick('stProg','fact');await range('stSpeed',100);await click('stRun');await page.waitForFunction(()=>document.getElementById('stDiff').textContent==='0');await is('stSteps','153');
   await click('stReset');eq(await page.locator('#stProg').inputValue(),'fact');eq(await page.locator('#stN').inputValue(),'5');eq(await page.locator('#stProtect').isChecked(),true);await is('stSpeedOut','10 komut/s');await is('stSteps','0');await fits('stack');
   // 04 · Bayraklar ve taşma
   await click('tab-alu');await has('aluRes','0x80 · işaretsiz 128 · işaretli −128');await has('aluFC','C = 0');await has('aluFV','V = 1');await has('aluFN','N = 1');await has('aluFZ','Z = 0');await has('aluTrueS','dışında');await has('aluTrueU','içinde');
   await is('aluCntC','32.640');await is('aluThC','32.640');await is('aluCntV','16.384');await is('aluThV','16.384');await is('aluCntB','8.256');await is('aluThB','8.256');await has('aluVerify','65.536');await has('aluVerify','uyuşmayan: 0');
   await click('aluP2');await has('aluRes','0x00');await has('aluFC','C = 1');await has('aluFV','V = 0');await has('aluFZ','Z = 1');await click('aluP3');await has('aluFC','C = 1');await has('aluFV','V = 1');await has('aluTrueS','(−128) + (−128) = −256');
   await click('aluP4');await has('aluRes','0xFE');await has('aluFC','C = 1');await has('aluFV','V = 0');await has('aluTrueU','5 − 7 = −2');eq(await page.locator('#aluRowN').isVisible(),true);await click('aluP5');await has('aluRes','0x7F');await has('aluFC','C = 0');await has('aluFV','V = 1');
   await click('aluP6');eq(await page.locator('#aluOp').inputValue(),'CMP');{const rows=await page.locator('#aluJumps tbody tr').allTextContents();eq(rows.length,6);ok(rows[2].includes('atlamaz')&&rows[3].includes('atlar')&&rows[4].includes('atlar')&&!rows[4].includes('atlamaz')&&rows[5].includes('atlamaz'),'200 ile 100: işaretsiz büyük, işaretli küçük');ok(!rows.join('').includes('UYUŞMUYOR'));}
   await range('aluA',255);await range('aluB',255);await has('aluFZ','Z = 1');await has('aluAOut','0xFF · 255 · −1');await range('aluA',0);await range('aluB',0);await pick('aluOp','ADD');await has('aluRes','0x00');await has('aluFZ','Z = 1');
   await click('aluAb7');await click('aluBb7');eq(await page.locator('#aluA').inputValue(),'128');eq(await page.locator('#aluAb7').getAttribute('aria-pressed'),'true');await has('aluFV','V = 1');await click('aluAb7');eq(await page.locator('#aluA').inputValue(),'0');
   await pick('aluOp','SHL');eq(await page.locator('#aluB').isDisabled(),true);eq(await page.locator('#aluBb0').isDisabled(),true);await range('aluA',192);await has('aluRes','0x80');await has('aluFC','C = 1');await has('aluFV','V = 0');await is('aluCntC','32.768');await is('aluThB','16.384');
   await pick('aluOp','SHR');await range('aluA',129);await has('aluRes','0x40');await has('aluFC','C = 1');await has('aluFV','V = 1');await pick('aluOp','XOR');eq(await page.locator('#aluB').isDisabled(),false);await is('aluCntC','0');await is('aluThV','0');eq(await page.locator('#aluRowC').isHidden(),true);
   await pick('aluOp','AND');await range('aluA',170);await range('aluB',204);await has('aluRes','0x88');await pick('aluOp','OR');await has('aluRes','0xEE');
   await click('aluReset');eq(await page.locator('#aluOp').inputValue(),'ADD');eq(await page.locator('#aluA').inputValue(),'127');eq(await page.locator('#aluB').inputValue(),'1');await fits('alu');
   // sekme klavyesi, etiketler, çekirdek
   await page.locator('#tab-alu').focus();await page.keyboard.press('Home');eq(await page.locator('#tab-cpu').getAttribute('aria-selected'),'true');await page.keyboard.press('ArrowRight');eq(await page.locator('#tab-c').getAttribute('aria-selected'),'true');await page.keyboard.press('End');eq(await page.locator('#tab-alu').getAttribute('aria-selected'),'true');await page.keyboard.press('ArrowRight');eq(await page.locator('#tab-cpu').getAttribute('aria-selected'),'true');await page.keyboard.press('ArrowLeft');eq(await page.locator('#tab-alu').getAttribute('aria-selected'),'true');eq(await page.locator('#panel-alu').isVisible(),true);eq(await page.locator('#panel-cpu').isHidden(),true);
   eq(await page.evaluate(()=>[...document.querySelectorAll('main input,main select,main textarea')].filter(e=>!(e.id&&document.querySelector('label[for="'+e.id+'"]'))&&!e.getAttribute('aria-label')).map(e=>e.id)),[]);
   eq(await page.evaluate(()=>[...document.querySelectorAll('main button')].filter(b=>!b.textContent.trim()&&!b.getAttribute('aria-label')).length),0);
   eq(await page.evaluate(()=>[...document.querySelectorAll('main canvas')].filter(c=>c.getAttribute('role')!=='img'||!c.getAttribute('aria-label')).length),0);
   eq(await page.evaluate(()=>Object.isFrozen(MachineLab)&&!Object.getOwnPropertyDescriptor(window,'MachineLab').writable),true);
   for(const t of['cpu','c','stack','alu']){await click('tab-'+t);await page.waitForTimeout(60);await fits('son '+t);}
   for(const id of['cpuTrace','stChart','aluMap']){await click(id==='cpuTrace'?'tab-cpu':id==='stChart'?'tab-stack':'tab-alu');ok(await page.locator('#'+id).evaluate(c=>{const d=c.getContext('2d').getImageData(0,0,c.width,c.height).data;const s=new Set();for(let i=0;i<d.length;i+=4*97)s.add(d[i]+','+d[i+1]+','+d[i+2]);return s.size>1;}),id+' boş değil');}
   assert.deepEqual(errors,[],theme+' konsol hataları');checks++;await page.close();}
  console.log(`G makine-dili-assembly-c: ${(checks-before).toLocaleString('tr-TR')} tarayıcı kontrolü PASS (390 px açık + 1280 px koyu; dört sekme, hazırlar, sınırlar, klavye)`);
 }finally{await browser?.close();await new Promise(r=>server.close(r));}
}
