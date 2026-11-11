// G grubu: PLC tarama çevrimi, pnömatik sıralama, G-kodu yorumlayıcısı ve CAM hesapları.
// Çekirdek sayfadan (KERNEL işaretleri arasından) yüklenir; başvurular sayfanın formüllerini yinelemez:
// kaba kuvvet Boole değerlendirmesi, kapalı biçimler, ayrı bir yay integratörü, tanımdan kaba kuvvet alan ölçümü.
import fs from 'node:fs';
import vm from 'node:vm';
import assert from 'node:assert/strict';
const SLUG='plc-hidrolik-pnomatik-cnc-cadcam';
const html=fs.readFileSync(new URL(`../${SLUG}.html`,import.meta.url),'utf8');
const source=html.split('/* KERNEL-BEGIN */')[1]?.split('/* KERNEL-END */')[0];
assert(source,'KERNEL sınırları gerekli');
const context={window:{}};vm.createContext(context);vm.runInContext(source,context);
const K=context.window.AutomationLab;assert(Object.isFrozen(K));
const presets=name=>{const m=html.match(new RegExp('const '+name+'=\\{([\\s\\S]*?)\\};\\n'));const o={};for(const x of m[1].matchAll(/(\w+):`([\s\S]*?)`/g))o[x[1]]=x[2];return o;};
const PLC=presets('PLC_PRESETS'),CNC=presets('CNC_PRESETS');
let checks=0;
const ok=(c,msg)=>{assert(c,msg);checks++;};
const eq=(a,b,msg)=>{assert.equal(JSON.stringify(a),JSON.stringify(b),msg||'');checks++;}; // JSON: vm bağlamından gelen diziler başka realm'dendir
const near=(a,b,tol=1e-9,msg)=>{assert(Math.abs(a-b)<=tol*Math.max(1,Math.abs(b)),`${msg||''} ${a} ≠ ${b}`);checks++;};
let seed=12345;const rnd=()=>{seed=(seed*1664525+1013904223)>>>0;return seed/4294967296;};

/* ---------- PLC ---------- */
for(const k in PLC){const p=K.plcParse(PLC[k]);ok(p.ok,'hazır program: '+k);eq(p.warnings.length,0);}
{ // mühürleme: bağımsız yineleme m = (s || m) && d
  const p=K.plcParse(PLC.seal),st=K.plcCreate(p,100);let m=0;
  for(let i=0;i<400;i++){const s=rnd()<.15,stopPressed=rnd()<.1;const r=K.plcScan(st,{'BAŞLAT':s,'DUR':stopPressed});m=(s||m)&&!stopPressed?1:0;eq(r.bits.MOTOR,m);}
  // kopuk kablo: NK butonda güvenli yön
  const a=K.plcCreate(p,100);K.plcScan(a,{'BAŞLAT':true});eq(a.bits.MOTOR,1);K.plcScan(a,{});eq(a.bits.MOTOR,1);K.plcScan(a,{},'DUR');eq(a.bits.MOTOR,0);
  // NA butonda kopuk kablo: durdurulamaz
  const u=K.plcParse(PLC.unsafe),b=K.plcCreate(u,100);K.plcScan(b,{'BAŞLAT':true});K.plcScan(b,{'DUR':true},'DUR');eq(b.bits.MOTOR,1);K.plcScan(b,{'DUR':true});eq(b.bits.MOTOR,0);
}
{ // rastgele seri/paralel ağlar: JS'in kendi Boole değerlendirmesiyle karşılaştır, güç akışı kurallarını sına
  const names=['A','B','C','D'];
  const gen=d=>{if(d===0||rnd()<.3)return(rnd()<.4?'!':'')+names[Math.floor(rnd()*4)];const n=2+Math.floor(rnd()*2),op=rnd()<.5?' & ':' | ';return'('+Array.from({length:n},()=>gen(d-1)).join(op)+')';};
  for(let t=0;t<150;t++){const e=gen(3),p=K.plcParse('ANAHTAR A B C D\nÇIKIŞ Q\n'+e+' -> Q');ok(p.ok,e);
    for(let v=0;v<16;v++){const inp={A:!!(v&1),B:!!(v&2),C:!!(v&4),D:!!(v&8)},st=K.plcCreate(p,50),r=K.plcScan(st,inp);
      const ref=Function('A','B','C','D','return ('+e.replace(/&/g,'&&').replace(/\|/g,'||')+')?1:0')(inp.A,inp.B,inp.C,inp.D);eq(r.bits.Q,ref,e);eq(st.flow[0].out,ref);
      const walk=n=>{const f=st.flow[0].nodes[n.id];if(n.k==='c'){assert.equal(f.pout,f.pin&&f.cond?1:0);assert.equal(f.cond,(inp[n.name]?1:0)^(n.neg?1:0));}
        else if(n.k==='and'){let q=f.pin;for(const c of n.items){assert.equal(st.flow[0].nodes[c.id].pin,q);q=st.flow[0].nodes[c.id].pout;walk(c);}assert.equal(f.pout,q);}
        else{let q=0;for(const c of n.items){assert.equal(st.flow[0].nodes[c.id].pin,f.pin);q|=st.flow[0].nodes[c.id].pout;walk(c);}assert.equal(f.pout,q);}};
      walk(p.rungs[0].expr);checks++;}}
}
{ // basamak sırası: tek taramalık darbe
  const p=K.plcParse(PLC.order),st=K.plcCreate(p,100),seq=[0,1,1,1,0,0,1,0,1,1],out=seq.map(b=>K.plcScan(st,{B:!!b}).bits.DARBE);
  eq(out,[0,1,0,0,0,0,1,0,1,0]);eq(st.ct.C1.cv,3);
  const L=PLC.order.split('\n'),i=L.findIndex(l=>l.includes('-> DARBE')),j=L.findIndex(l=>l.includes('-> ESKİ'));[L[i],L[j]]=[L[j],L[i]];
  const q=K.plcParse(L.join('\n')),s2=K.plcCreate(q,100);eq(seq.map(b=>K.plcScan(s2,{B:!!b}).bits.DARBE),Array(10).fill(0));eq(s2.ct.C1.cv,0);
}
{ // zamanlayıcılar: ölçülen gecikme PT'nin bir üst tarama katı
  const p=K.plcParse(PLC.delay);
  for(const T of[10,30,70,100,150,270,500]){const st=K.plcCreate(p,T);let on=null,off=null;
    for(let i=0;i<400&&on===null;i++){const r=K.plcScan(st,{S1:true});if(r.bits.FAN)on=r.t;}
    near(on-T,Math.ceil(2000/T)*T,1e-12,'TON');eq(st.lastTimer.meas,Math.ceil(2000/T)*T);ok(st.lastTimer.meas-2000<T);eq(st.bits.LAMBA,1);
    const t0=st.t;for(let i=0;i<400&&off===null;i++){const r=K.plcScan(st,{S1:false});if(!r.bits.LAMBA)off=r.t;}
    near(off-(t0+T),Math.ceil(1500/T)*T,1e-12,'TOF');eq(st.bits.FAN,0);
    // kesintiye uğrayan TON yeniden başlar
    const s3=K.plcCreate(p,T);for(let i=0;i<Math.floor(1900/T);i++)K.plcScan(s3,{S1:true});K.plcScan(s3,{S1:false});K.plcScan(s3,{S1:true});eq(s3.bits.FAN,0);eq(s3.tm.T1.et,0);}
}
{ // trafik ışığı: her taramada tam bir ışık, periyot = ΣPT + 2T
  const p=K.plcParse(PLC.traffic);
  for(const T of[50,100,200,250]){const st=K.plcCreate(p,T),rises=[];let prev=0;const dur={KIRMIZI:0,'YEŞİL':0,SARI:0};
    for(let i=0;i<Math.ceil(30000/T);i++){const r=K.plcScan(st,{'ÇALIŞ':true});eq(r.bits.KIRMIZI+r.bits['YEŞİL']+r.bits.SARI,1);if(r.bits.KIRMIZI&&!prev)rises.push(r.t);prev=r.bits.KIRMIZI;if(rises.length>=2&&rises.length<3)for(const k in dur)dur[k]+=r.bits[k]*T;}
    ok(rises.length>=4);for(let i=2;i<rises.length;i++)eq(rises[i]-rises[i-1],7000+2*T);eq(st.edges.KIRMIZI.period,7000+2*T);eq(dur['YEŞİL'],3000);eq(dur.SARI,1000+T);eq(dur.KIRMIZI,3000+T);}
}
{ // kilitleme ve sayaç
  const p=K.plcParse(PLC.interlock),st=K.plcCreate(p,100);
  for(let i=0;i<500;i++){const r=K.plcScan(st,{'İLERİ':rnd()<.2,'GERİ':rnd()<.2,'DUR':rnd()<.08});ok(!(r.bits['KM_İLERİ']&&r.bits['KM_GERİ']));}
  const s2=K.plcCreate(p,100),r=K.plcScan(s2,{'İLERİ':true,'GERİ':true});eq([r.bits['KM_İLERİ'],r.bits['KM_GERİ']],[1,0]);
  const b=K.plcParse(PLC.batch),sb=K.plcCreate(b,100);K.plcScan(sb,{'ÇALIŞ':true});eq(sb.bits['KONVEYÖR'],1);
  for(let n=1;n<=7;n++){K.plcScan(sb,{'ÇALIŞ':true,'SENSÖR':true});K.plcScan(sb,{'ÇALIŞ':true,'SENSÖR':true});K.plcScan(sb,{'ÇALIŞ':true});eq(sb.ct.C1.cv,n);eq(sb.bits.KUTU_DOLU,n>=5?1:0);eq(sb.bits['KONVEYÖR'],n>=5?0:1);}
  K.plcScan(sb,{'ÇALIŞ':true,SIFIRLA:true});eq(sb.ct.C1.cv,0);K.plcScan(sb,{'ÇALIŞ':true});eq(sb.bits['KONVEYÖR'],1);
  // set/reset mandalı
  const sr=K.plcParse('BUTON A B\nÇIKIŞ L\nA -> S L\nB -> R L'),ss=K.plcCreate(sr,10);eq([[1,0],[0,0],[0,1],[0,0],[1,1]].map(([a,bb])=>K.plcScan(ss,{A:!!a,B:!!bb}).bits.L),[1,1,0,0,0]);
}
{ // ayrıştırıcı hataları satır numarasıyla
  const errs=(src)=>K.plcParse(src).errors.map(e=>e.line);
  eq(errs('BUTON A\nÇIKIŞ Q\nA & -> Q'),[3]);eq(errs('BUTON A\nÇIKIŞ Q\n\n(A | Q -> Q'),[4]);eq(errs('BUTON A\nA -> A'),[2]);eq(errs('ÇIKIŞ Q\nX -> Q'),[2]);
  eq(errs('BUTON A\nA -> TON T1 abc'),[2]);eq(errs('BUTON A\nA -> CTU C1 0'),[2]);eq(errs('BUTON A\nBUTON A'),[2]);eq(errs('BUTON A\nA Q'),[2]);eq(errs('# yalnız yorum'),[1]);
  eq(K.plcParse('BUTON A\nÇIKIŞ Q\nA -> Q\n!A -> Q').warnings.map(w=>w.line),[4]);
  assert.throws(()=>K.plcCreate(K.plcParse('x'),100));checks++;assert.throws(()=>K.plcCreate(K.plcParse(PLC.seal),0));checks++;
}

/* ---------- Pnömatik ---------- */
const cfg0={seq:'s1',p:6,D:50,d:20,sA:200,sB:100,v:.2,continuous:false};
{ const th=K.pneuTheory(cfg0);near(th.Fext,6e5*Math.PI*.05**2/4);near(th.Fret,6e5*Math.PI*(.05**2-.02**2)/4);near(th.Fext,1178.0972,1e-6);near(th.Fret,989.6017,1e-6);
  // serbest hava: iki strok hacmi, mutlak/atmosfer oranı
  const Vcomp=(Math.PI*.5**2/4*2+Math.PI*.5**2/4*1)+(Math.PI*(.5**2-.2**2)/4*3);near(th.freeAir,Vcomp*(6+1.01325)/1.01325);near(th.freeAir,7.5019,1e-4);eq(th.cycleTime,3);
}
const expectEv={s1:['A+','B+','A-','B-'],s2c:['A+','B+','B-','A-']};
for(const seq of['s1','s2c'])for(const c of[cfg0,{...cfg0,sA:50,sB:500,v:1},{...cfg0,sA:330,sB:70,v:.05,D:100,d:8,p:10},{...cfg0,sA:100,sB:100,v:.35}])for(const dt of[.37,.1,.016,.0031]){
  const st=K.pneuCreate({...c,seq});K.pneuPress(st);const t0=st.t;for(let t=0;t<2*(c.sA+c.sB)/(c.v*1000)+1.5;t+=dt)K.pneuAdvance(st,dt);
  eq(st.events.map(e=>e.ev),expectEv[seq]);eq(st.cycles,1);
  const tA=c.sA/(c.v*1000),tB=c.sB/(c.v*1000),times=seq==='s1'?[tA,tA+tB,2*tA+tB,2*tA+2*tB]:[tA,tA+tB,tA+2*tB,2*tA+2*tB];
  st.events.forEach((e,i)=>near(e.t-t0,times[i],1e-9,'olay zamanı'));near(st.cycleTimes[0],2*(tA+tB),1e-9);
  const A=Math.PI*c.D**2/4,a=Math.PI*c.d**2/4;near(K.pneuAir(st),(2*A-a)*(c.sA+c.sB)*1e-6*(c.p+1.01325)/1.01325,1e-9);eq([st.xA,st.xB],[0,0]);ok(!st.lastConflict);}
{ // doğrudan bağlantıda A+ B+ B− A− hiç başlamaz
  const st=K.pneuCreate({...cfg0,seq:'s2d'});K.pneuPress(st);eq(st.conflicts,['A']);for(let i=0;i<300;i++)K.pneuAdvance(st,.02);eq(st.events.length,0);eq(st.cycles,0);eq(K.pneuAir(st),0);eq(st.lastConflict.valves,['A']);
  const cont=K.pneuCreate({...cfg0,seq:'s2d',continuous:true});for(let i=0;i<300;i++)K.pneuAdvance(cont,.02);eq(cont.events.length,0);eq(cont.conflicts,['A']);
  eq(K.pneuOverlap('s2d').filter(o=>o.opposing).map(o=>o.step),[1,3]);eq(K.pneuOverlap('s1').filter(o=>o.opposing||!o.signal).length,0);eq(K.pneuOverlap('s2c').filter(o=>o.opposing||!o.signal).length,0);
  // sürekli çalışma: her çevrim aynı süre, hava çevrimle orantılı
  for(const seq of['s1','s2c']){const s=K.pneuCreate({...cfg0,seq,continuous:true});for(let i=0;i<1000;i++)K.pneuAdvance(s,.0153);const T=1000*.0153;eq(s.cycles,Math.floor(T/3+1e-9));s.cycleTimes.forEach(x=>near(x,3,1e-9));near(K.pneuAir(s,s.doneTravel),s.cycles*K.pneuTheory(s.cfg).freeAir,1e-9);
    // valf belleği: karşıt pilotlar hiçbir an birlikte basınçlı değil
    const z=K.pneuCreate({...cfg0,seq,continuous:true});for(let i=0;i<2000;i++){K.pneuAdvance(z,.007);ok(z.conflicts.length===0);const p=z.pilots;ok(!(p.Ap&&p.Am)&&!(p.Bp&&p.Bm)&&!(p.Y1&&p.Y2));}}
  assert.throws(()=>K.pneuCreate({...cfg0,d:60}));checks++;assert.throws(()=>K.pneuCreate({...cfg0,seq:'x'}));checks++;
}

/* ---------- CNC ---------- */
{ const closed={square:160+7,circle:2*Math.PI*20+6,slot:60+2*Math.PI*6+8,contour:130+4*(Math.PI/2*10)+7};
  for(const k in closed){const g=K.gcodeParse(CNC[k]);ok(g.ok,k);near(g.feedLen,closed[k],1e-12,k);
    g.moves.forEach((m,i)=>{const e=K.gcodePoint(m,1),s=K.gcodePoint(m,0);for(let a=0;a<3;a++){near(e[a],m.to[a],1e-9,'bitiş');near(s[a],m.from[a],1e-9);}if(i)eq(m.from,g.moves[i-1].to);
      if(m.type==='arc'){ // bağımsız yay integratörü: başlangıç vektörünü küçük açılarla döndür
        const dir=m.cw?-1:1,h=1e-4;let x=m.from[0]-m.center[0],y=m.from[1]-m.center[1],L=0,n=0;const co=Math.cos(dir*h),si=Math.sin(dir*h),tx=m.to[0]-m.center[0],ty=m.to[1]-m.center[1];
        do{const nx=x*co-y*si,ny=x*si+y*co;L+=Math.hypot(nx-x,ny-y);x=nx;y=ny;n++;}while((Math.hypot(x-tx,y-ty)>m.r*h||n<10)&&n<1e6);near(L,m.len,2e-4,'yay boyu');
        // teğetlik: yayın başındaki yön, önceki hareketin sonundaki yönle aynı
        if(k!=='circle'&&g.moves[i-1].type!=='rapid'){const p0=K.gcodePoint(g.moves[i-1],1-1e-6),p1=K.gcodePoint(g.moves[i-1],1),q1=K.gcodePoint(m,1e-6),u=[p1[0]-p0[0],p1[1]-p0[1]],v=[q1[0]-s[0],q1[1]-s[1]];near((u[0]*v[0]+u[1]*v[1])/Math.hypot(...u)/Math.hypot(...v),1,1e-5,'teğet');}}});
    // süre: Σ boy / hız
    near(g.time,g.moves.reduce((t,m)=>t+m.len/m.feed*60,0),1e-12);
    // ölçüm: kiriş toplamı ≤ analitik; adım yarılanınca hata ~4 kat küçülür; süre blok başına en çok bir adım uzun
    const m1=K.gcodeMeasure(g,.01),m2=K.gcodeMeasure(g,.005);ok(m1.feedLen<=g.feedLen+1e-9);near(m1.rapidLen,g.rapidLen,1e-9);ok(m1.time>=g.time-1e-9&&m1.time<g.time+g.moves.length*.01+1e-9);eq(Math.round(m1.time/.01),m1.ticks);
    if(k!=='square'){const e1=g.feedLen-m1.feedLen,e2=g.feedLen-m2.feedLen;ok(e1>0&&e2>0&&e1/e2>3.5&&e1/e2<4.5,'O(dt²) '+e1/e2);}else near(m1.feedLen,167,1e-9);
    eq(K.gcodeAt(g,0).pos,[0,0,0]);eq(K.gcodeAt(g,g.time+1).done,true);eq(K.gcodeAt(g,g.time+1).pos,g.end);}
  near(K.gcodeParse(CNC.square).time,7/150*60+160/600*60+K.gcodeParse(CNC.square).rapidLen/5000*60,1e-12);
  // yön: G2 ↔ G3 aynı iki nokta arasında çemberin öbür parçası
  const q=(c)=>K.gcodeParse('G90 F100\nG1 X10 Y0\n'+c+' X0 Y10 I-10 J0').moves[1];near(q('G3').len,Math.PI*5,1e-12);near(q('G2').len,Math.PI*15,1e-12);
  const mid3=K.gcodePoint(q('G3'),.5),mid2=K.gcodePoint(q('G2'),.5);near(mid3[0],10*Math.SQRT1_2);near(mid3[1],10*Math.SQRT1_2);near(mid2[0],-10*Math.SQRT1_2);near(mid2[1],-10*Math.SQRT1_2);
  near(K.gcodeParse('F100\nG1 X5\nG2 X5 Y0 I5 J0').moves[1].len,2*Math.PI*5,1e-12); // tam çember
  // G91 ve G20
  const inc=K.gcodeParse('G91 F100\nG1 X10\nG1 Y5\nG1 X-3 Y-1');eq(inc.end,[7,4,0]);const inch=K.gcodeParse('G20 G90\nG1 X1 Y2 F10');eq(inch.end,[25.4,50.8,0]);near(inch.moves[0].feed,254);
  const N=K.gcodeParse('N10 g1 x5 f50 (yorum) ; kuyruk\nN20 G1 Y5\nM30\nG1 X99');eq(N.end,[5,5,0]);eq(N.warnings.map(w=>w.line),[1,4]);
  // hatalar satır numarasıyla
  const line=src=>{const g=K.gcodeParse(src);eq(g.ok,false);eq(g.moves.length,0);return g.errors.map(e=>e.line);};
  eq(line(CNC.bad),[7]);eq(line('G1 X5'),[1]);eq(line('G0 X1\nG4'),[2]);eq(line('G0 X1\n\nG1 X5 F100 (açık'),[3]);eq(line('F100\nG2 X5 Y5'),[2]);eq(line('F100\nG2 X5 Y5 Z1 I5'),[2]);eq(line('X5'),[1]);eq(line('G1 X5 F0'),[1]);eq(line('G0 X5 T2'),[1]);eq(line('F9\nG1 X1\nG2 X2 I0 J0'),[3]);eq(line('G0 X1 M6'),[1]);eq(line('G0 X1 X2'),[1]);eq(line('G0 G1 X1 F5'),[1]);
  ok(K.gcodeParse('F100\nG1 X10\nG2 X20 Y0 I5.004 J0').ok);eq(line('F100\nG1 X10\nG2 X20 Y0 I5.02 J0'),[3]);
}

/* ---------- CAM ---------- */
{ const k=K.cutting({Vc:120,D:10,z:4,fz:.05,ap:5,ae:5,nMax:12000});near(k.n,3819.7186,1e-7);near(k.vf,763.9437,1e-7);near(k.Q,19.0986,1e-6);eq(k.limited,false);
  const lim=K.cutting({Vc:300,D:4,z:2,fz:.08,ap:2,ae:2,nMax:12000});eq(lim.limited,true);eq(lim.n,12000);near(lim.VcAct,Math.PI*4*12,1e-12);near(lim.vf,1920,1e-12);
  // zikzak: bağımsız yeniden kurulum ve örtme sınaması
  for(const W of[20,80,200])for(const H of[20,50,200])for(const D of[2,10,20])for(const pc of[10,35,50,100]){const ae=D*pc/100,z=K.zigzag({W,H,D,ae});eq(z.fits,true);
    const n=H===D?1:Math.ceil((H-D)/ae-1e-9)+1;eq(z.passes,n);near(z.length,n*(W-D)+(H-D),1e-9);near(z.formula,z.length,1e-9);near(z.estimate,W*H/ae,1e-12);ok(z.step<=ae+1e-9);
    for(const p of z.pts)ok(p[0]>=D/2-1e-9&&p[0]<=W-D/2+1e-9&&p[1]>=D/2-1e-9&&p[1]<=H-D/2+1e-9);}
  const z=K.zigzag({W:80,H:50,D:10,ae:5});eq(z.length,670);eq(z.estimate,800);eq(z.passes,9);eq(K.zigzag({W:20,H:50,D:30,ae:5}).fits,false);
  // örtme: merkez bölgesindeki her nokta yola r'den yakın
  const dseg=(x,y,a,b)=>{const vx=b[0]-a[0],vy=b[1]-a[1],L=vx*vx+vy*vy;let t=L?((x-a[0])*vx+(y-a[1])*vy)/L:0;t=Math.max(0,Math.min(1,t));return Math.hypot(x-a[0]-t*vx,y-a[1]-t*vy);};
  let bad=0;for(let x=5;x<=75;x+=.5)for(let y=5;y<=45;y+=.5){let d=Infinity;for(let i=1;i<z.pts.length;i++)d=Math.min(d,dseg(x,y,z.pts[i-1],z.pts[i]));if(d>5+1e-9)bad++;}eq(bad,0);
}
{ const rect=[[0,0],[60,0],[60,40],[0,40]],tri=[[0,0],[60,0],[30,30*Math.sqrt(3)]],hex=Array.from({length:6},(_,k)=>[30+30*Math.cos(k*Math.PI/3),26+30*Math.sin(k*Math.PI/3)]),Ls=[[0,0],[60,0],[60,25],[25,25],[25,50],[0,50]];
  for(const r of[2,5,7.5,12]){
    const i=K.offsetContour(rect,r,'in');near(i.length,2*(60-2*r)+2*(40-2*r),1e-12);near(i.theory,i.length,1e-12);near(i.uncutTheory,4*r*r*(1-Math.PI/4),1e-12);eq(i.miters,4);
    for(const[P,per]of[[rect,200],[tri,180],[hex,180]]){const o=K.offsetContour(P,r,'out');near(o.theory,per+2*Math.PI*r,1e-12);near(o.length,per+2*Math.PI*r,2e-5);eq(o.uncutTheory,0);
      near(Math.abs(K.polyArea(o.pts)),Math.abs(K.polyArea(P))+per*r+Math.PI*r*r,2e-4,'Steiner'); // paralel eğri alanı
      const cw=K.offsetContour(P.slice().reverse(),r,'out');near(cw.length,o.length,1e-12);} // dönüş yönünden bağımsız
    near(K.offsetContour(tri,r,'in').length,180-6*r*Math.sqrt(3),1e-12);near(K.offsetContour(hex,r,'in').length,180-12*r/Math.sqrt(3),1e-12);
    if(r<12.5){const Li=K.offsetContour(Ls,r,'in');eq(Li.valid,true);near(Li.theory,220-5*2*r+r*Math.PI/2,1e-12);near(Li.length,Li.theory,2e-5);
      const Lo=K.offsetContour(Ls,r,'out');near(Lo.theory,220+5*r*Math.PI/2-2*r,1e-12);near(Lo.uncutTheory,r*r*(1-Math.PI/4),1e-12);eq(Lo.miters,1);}
    // her yol noktası kontura tam r uzaklıkta ya da daha uzak (köşe içinde)
    for(const side of['in','out'])for(const P of[rect,tri,hex,Ls]){const o=K.offsetContour(P,r,side);if(!o.valid)continue;const ds=(x,y)=>{let d=Infinity;for(let a=0;a<P.length;a++){const A=P[a],B=P[(a+1)%P.length],vx=B[0]-A[0],vy=B[1]-A[1],L=vx*vx+vy*vy;let t=((x-A[0])*vx+(y-A[1])*vy)/L;t=Math.max(0,Math.min(1,t));d=Math.min(d,Math.hypot(x-A[0]-t*vx,y-A[1]-t*vy));}return d;};
      for(const q of o.pts){near(ds(q[0],q[1]),r,1e-9,'yol uzaklığı');eq(K.inPoly(P,q[0],q[1]),side==='in');}}
  }
  eq(K.offsetContour(Ls,13,'in').valid,false);eq(K.offsetContour(rect,20,'in').valid,false);eq(K.offsetContour(tri,17.5,'in').valid,false);eq(K.uncutMeasure(K.offsetContour(Ls,13,'in')),null);
  // kesilemeyen alan: tanımdan kaba kuvvet (geçerli merkez = kenara en az r uzak nokta; nokta bir merkeze r'den yakınsa kesilir)
  const brute=(P,r,side,h)=>{const dB=(x,y)=>{let d=Infinity;for(let a=0;a<P.length;a++){const A=P[a],B=P[(a+1)%P.length],vx=B[0]-A[0],vy=B[1]-A[1],L=vx*vx+vy*vy;let t=((x-A[0])*vx+(y-A[1])*vy)/L;t=Math.max(0,Math.min(1,t));d=Math.min(d,Math.hypot(x-A[0]-t*vx,y-A[1]-t*vy));}return d;},inside=(x,y)=>K.inPoly(P,x,y)===(side==='in');
    let x0=1e9,x1=-1e9,y0=1e9,y1=-1e9;for(const p of P){x0=Math.min(x0,p[0]);x1=Math.max(x1,p[0]);y0=Math.min(y0,p[1]);y1=Math.max(y1,p[1]);}const pad=side==='out'?r:0;let n=0;
    for(let y=y0-pad+h*.31;y<y1+pad;y+=h)for(let x=x0-pad+h*.73;x<x1+pad;x+=h){if(!inside(x,y))continue;const d=dB(x,y);if(d>=r)continue;let cut=false;
      for(let k=0;k<180&&!cut;k++){const a=k*Math.PI/90;for(const rho of[r,r*.999,r*.9,r*.7]){const cx=x+rho*Math.cos(a),cy=y+rho*Math.sin(a);if(inside(cx,cy)&&dB(cx,cy)>=r-1e-9){cut=true;break;}}}
      if(!cut)n++;}return n*h*h;};
  for(const[P,r,side]of[[rect,5,'in'],[rect,10,'in'],[tri,5,'in'],[Ls,5,'in'],[Ls,8,'out'],[hex,10,'in'],[rect,5,'out']]){const o=K.offsetContour(P,r,side),u=K.uncutMeasure(o),b=brute(P,r,side,.2);
    if(o.uncutTheory===0){eq(u.area,0);ok(b<.2);}else{near(u.area,o.uncutTheory,.05,'ızgara–formül');near(b,o.uncutTheory,.08,'kaba kuvvet–formül');near(u.area,b,.1,'ızgara–kaba kuvvet');}}
}
{ for(const R of[1,3,5.5,10])for(const s of[.1,.5,1,1.9,3,7.9]){const r=K.scallop({R,s});if(s>=2*R){eq(r.defined,false);continue;}
    // bağımsız: iki komşu dairenin kesişme yüksekliği (Pisagor), ve profilin doğrudan aranan en yüksek noktası
    const exact=R-Math.sqrt(R*R-s*s/4);near(r.exact,exact,1e-12);near(r.measured,exact,1e-6*Math.max(1,exact)/Math.max(exact,1e-6)*exact+1e-9);near(r.approx,s*s/(8*R),1e-12);ok(r.approx<=r.exact+1e-15);
    let h=0;for(let i=0;i<=2000;i++){const x=s*i/2000,z=Math.min(R-Math.sqrt(Math.max(0,R*R-x*x)),R-Math.sqrt(Math.max(0,R*R-(x-s)*(x-s))));h=Math.max(h,z);}near(r.measured,h,1e-5);}
  near(K.scallop({R:3,s:1}).exact,.0419601,1e-6);eq(K.scallop({R:3,s:6}).defined,false);assert.throws(()=>K.scallop({R:0,s:1}));checks++;
}
console.log(`G ${SLUG}: ${checks.toLocaleString('tr-TR')} bağımsız çekirdek kontrolü PASS`);

if(process.argv.includes('--browser')){
  const {chromium}=await import('playwright');const {createServer}=await import('node:http');const {join,extname}=await import('node:path');const {fileURLToPath}=await import('node:url');const root=fileURLToPath(new URL('../',import.meta.url));
  const server=createServer((req,res)=>{const file=join(root,decodeURIComponent(new URL(req.url,'http://localhost').pathname));if(!fs.existsSync(file)||fs.statSync(file).isDirectory()){res.writeHead(404).end();return;}res.setHeader('Content-Type',({'.html':'text/html; charset=utf-8','.js':'text/javascript; charset=utf-8','.css':'text/css; charset=utf-8'})[extname(file)]||'application/octet-stream');res.end(fs.readFileSync(file));});
  await new Promise(r=>server.listen(0,'127.0.0.1',r));let browser;const before=checks;
  try{browser=await chromium.launch();
    for(const[theme,width]of[['light',390],['dark',1280]]){
      const ctx=await browser.newContext({viewport:{width,height:900},deviceScaleFactor:width<500?2:1});const page=await ctx.newPage();
      await page.addInitScript(t=>{localStorage.setItem('acelya-theme',t);localStorage.setItem('acelya-sound-muted','1');},theme);page.setDefaultTimeout(6000);
      const errors=[];page.on('pageerror',e=>errors.push(e.message));page.on('console',m=>{if(m.type()==='error'&&!/404/.test(m.text()))errors.push(m.text());});
      await page.goto(`http://127.0.0.1:${server.address().port}/${SLUG}.html`);await page.waitForTimeout(300);
      const click=id=>page.locator('#'+id).click(),read=id=>page.locator('#'+id).textContent(),sel=(id,v)=>page.locator('#'+id).selectOption(v),
        range=(id,v)=>page.locator('#'+id).evaluate((e,v)=>{e.value=v;e.dispatchEvent(new Event('input',{bubbles:true}));},v),
        has=async(id,text)=>{const t=await read(id);assert(t.includes(text),`${id}: “${t}” içinde “${text}” yok`);checks++;},
        tap=n=>page.locator(`[data-in="${n}"]`).click(),bit=async(n,v)=>{const t=await page.locator(`[data-bit="${n}"]`).textContent();assert(t.includes('= '+v),`${n}: ${t}`);checks++;},
        clicks=(id,n)=>page.evaluate(([id,n])=>{for(let i=0;i<n;i++)document.getElementById(id).click();},[id,n]),
        fits=async()=>{eq(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),true,'yatay taşma');};
      // her denetimin etiketi var
      eq(await page.evaluate(()=>[...document.querySelectorAll('main input,main select,main textarea')].filter(e=>!document.querySelector(`label[for="${e.id}"]`)).map(e=>e.id)),[]);
      eq(await page.evaluate(()=>[...document.querySelectorAll('main canvas')].filter(c=>c.getAttribute('role')!=='img'||!c.getAttribute('aria-label')).length),0);
      eq(await page.evaluate(()=>Object.isFrozen(AutomationLab)&&!Object.getOwnPropertyDescriptor(window,'AutomationLab').writable),true);
      /* PLC */
      await has('plcErrors','hata yok');await has('plcScanN','0 tarama');await tap('BAŞLAT');await has('plcStatus','kuruldu');await click('plcStep');await bit('MOTOR',1);await has('plcImage','BAŞLAT = 1 · DUR = 1');
      await click('plcStep');await bit('MOTOR',1);await has('plcImage','BAŞLAT = 0');await tap('DUR');await click('plcStep');await bit('MOTOR',0);await has('plcImage','DUR = 0');
      await tap('BAŞLAT');await click('plcStep');await bit('MOTOR',1);await sel('plcBreak','DUR');await click('plcStep');await bit('MOTOR',0);await has('plcStatus','güvenli yön');
      await sel('plcPreset','unsafe');await tap('BAŞLAT');await click('plcStep');await bit('MOTOR',1);await sel('plcBreak','DUR');await tap('DUR');await click('plcStep');await bit('MOTOR',1);await has('plcStatus','göremez');
      await sel('plcPreset','interlock');await tap('İLERİ');await tap('GERİ');await click('plcStep');await bit('KM_İLERİ',1);await bit('KM_GERİ',0);
      await sel('plcPreset','delay');await range('plcScanMs',150);await tap('S1');await clicks('plcStep',15);await bit('FAN',1);await has('plcMeas','T1 (TON): 2.100 ms');eq(await page.evaluate(()=>document.getElementById('plcMeas').previousElementSibling.textContent),"Son biten zamanlayıcı: girişi ilk gören taramadan Q'ya (ölçülen)");await has('plcTheo','2.000 ms · +100 ms');
      await range('plcScanMs',100);await has('plcScanN','0 tarama');await has('plcMeas','henüz');
      await sel('plcPreset','traffic');await tap('ÇALIŞ');await clicks('plcStep',72);await has('plcPeriod','KIRMIZI: 7,1 s (1. periyot, açılıştan)');await has('plcSum','+1 tarama');await clicks('plcStep',74);await has('plcPeriod','KIRMIZI: 7,2 s (2. periyot)');await has('plcSum','7 s · +2 tarama');await has('plcTrace','14.400');
      await sel('plcPreset','batch');await tap('ÇALIŞ');for(let i=0;i<5;i++){await tap('SENSÖR');await clicks('plcStep',2);}await bit('KUTU_DOLU',1);await bit('KONVEYÖR',0);await bit('C1','5 / 5');await tap('SIFIRLA');await clicks('plcStep',2);await bit('KONVEYÖR',1);
      await sel('plcPreset','order');await tap('B');await click('plcStep');await bit('DARBE',1);await click('plcStep');await bit('DARBE',0);await bit('C1','1 / 99');
      await click('plcSwap');await tap('B');await click('plcStep');await bit('DARBE',0);await click('plcStep');await bit('C1','0 / 99');
      await page.locator('#plcSrc').fill('BUTON A\nÇIKIŞ Q\nA & -> Q');await has('plcStatus','Yazı alanı değişti');await click('plcLoad');await has('plcErrors','Satır 3');
      await page.locator('#plcSrc').fill('BUTON A\nÇIKIŞ Q\nA -> Q');await click('plcLoad');await has('plcErrors','hata yok');
      // basılı tutma: buton basılıyken çalışan PLC çıkışı 1 tutar, bırakınca 0
      await click('plcRun');const btn=page.locator('[data-in="A"]');await btn.dispatchEvent('pointerdown',{button:0});await page.waitForTimeout(450);await bit('Q',1);await btn.dispatchEvent('pointerup');await page.waitForTimeout(450);await bit('Q',0);await click('plcRun');await has('plcRun','Çalıştır');
      await click('plcReset');await has('plcSrc','');eq(await page.locator('#plcPreset').inputValue(),'seal');eq(await page.locator('#plcScanMs').inputValue(),'100');await has('plcScanN','0 tarama');
      await page.locator('h1').click();await page.keyboard.press('Space');await has('plcRun','Duraklat');await page.waitForTimeout(450);await page.keyboard.press('Space');await has('plcRun','Çalıştır');assert(!(await read('plcScanN')).startsWith('0 '));checks++;
      await page.keyboard.press('r');await has('plcScanN','0 tarama');await range('plcScanMs',10);await clicks('plcStep',3);await has('plcScanN','3 tarama · 0,03 s');await range('plcScanMs',500);await click('plcStep');await has('plcScanN','1 tarama · 0,5 s');await click('plcReset');await fits();
      /* Pnömatik */
      await click('tab-pn');await has('pnFext','1.178 N');await has('pnFret','990 N');await has('pnTtheo','3 s');await has('pnVtheo','7,502 L/çevrim');await has('pnStatus','Hazır');
      await clicks('pnStepBtn',4);await has('pnTmeas','3 s');await has('pnVmeas','7,502 L (1 çevrim)');await has('pnVtheo','%0');await has('pnStatus','A+ B+ A− B−');await has('pnOverlap','hiçbirinde');
      await sel('pnSeq','s2d');await click('pnStart');await has('pnStatus','çakışması');await has('pnSignals','çakışma: valf yerinde kalır');await page.waitForTimeout(600);await has('pnStatus','Sinyal çakışması yüzünden sıra hiç başlamadı');await has('pnSignals','BAŞLAT darbesinde çakıştı');await click('pnReset');await sel('pnSeq','s2d');await click('pnStepBtn');await has('pnStatus','Sinyal çakışması');await has('pnSignals','BAŞLAT darbesinde çakıştı');await has('pnVmeas','henüz hareket yok');await has('pnOverlap','1. adımda');await has('pnOverlap','3. adımda');
      await sel('pnSeq','s2c');await clicks('pnStepBtn',4);await has('pnStatus','A+ B+ B− A−');await has('pnTmeas','3 s');
      await range('pnV',1);await range('pnSA',50);await range('pnSB',50);await click('pnStart');await page.waitForTimeout(700);await has('pnTmeas','0,2 s');await has('pnTtheo','0,2 s · %0');
      await range('pnP',10);await range('pnD',100);await range('pnRod',8);await range('pnSA',500);await range('pnSB',500);await has('pnFext','7.854 N');await has('pnFret','7.804 N');await has('pnTmeas','henüz');
      await range('pnP',2);await range('pnD',25);await range('pnRod',20);await has('pnFext','98 N');await has('pnFret','35 N');
      await sel('pnMode','cont');await sel('pnSeq','s1');await range('pnV',1);await range('pnSA',50);await range('pnSB',50);await page.waitForTimeout(900);assert(/[2-9] çevrim/.test(await read('pnVmeas')),'sürekli çevrim');checks++;await click('pnPause');await has('pnPause','Sürdür');
      await click('pnReset');await has('pnFext','1.178 N');eq(await page.locator('#pnSeq').inputValue(),'s1');eq(await page.locator('#pnMode').inputValue(),'single');await fits();
      /* CNC */
      await click('tab-cnc');await has('cncErrors','hata yok');await has('cncLtheo','167 mm · %0');await has('cncLmeas','167 mm');await has('cncTtheo','19,28 s');await has('cncTmeas','19,29 s (1.929 adım)');
      await clicks('cncStep',2);await has('cncPos','X 10 · Y 10 · Z 5 mm');await click('cncStep');await has('cncPos','Z −2 mm');await has('cncLine','Satır 6');
      await sel('cncSpeed','20');await click('cncRun');await has('cncRun','Duraklat');await page.waitForTimeout(1500);await has('cncStatus','Program sonu');await has('cncPos','X 0 · Y 0 · Z 5 mm');
      await sel('cncPreset','circle');await has('cncLtheo','131,664 mm');await has('cncMoves','G2 yay, R 20, 180°');
      await page.locator('#cncSrc').fill((await page.locator('#cncSrc').inputValue()).replace(/G2 /g,'G3 '));await has('cncStatus','Yazı alanı değişti');await click('cncLoad');await has('cncMoves','G3 yay, R 20, 180°');await has('cncLtheo','131,664 mm');
      await sel('cncPreset','slot');await has('cncLtheo','105,699 mm');await sel('cncPreset','contour');await has('cncLtheo','199,832 mm');await has('cncLmeas','199,832 mm');
      await sel('cncPreset','bad');await has('cncErrors','Satır 7: Yay tutarsız: başlangıç yarıçapı 15,000 mm, bitiş yarıçapı 25,000 mm');await has('cncStatus','reddedildi');await has('cncLmeas','—');await click('cncRun');await has('cncRun','Çalıştır');await click('cncStep');
      await sel('cncPreset','square');await range('cncRapid',1000);await has('cncTtheo','21,22 s');await range('cncRapid',10000);await has('cncTtheo','19,04 s');
      await page.locator('#cncSrc').fill('');await click('cncLoad');await has('cncStatus','hareket yok');await click('cncRun');await click('cncStep');
      await click('cncReset');await has('cncLtheo','167 mm');eq(await page.locator('#cncRapid').inputValue(),'5000');await fits();
      /* CAM */
      await click('tab-cam');await has('camN','3.820 dev/dak');await has('camVf','763,9 mm/dak');await has('camQ','19,1 cm³/dak');await has('camLmeas','670 mm · 9 geçiş');await has('camLest','800 mm · %+19,4');await has('camTime','52,6 s');
      await sel('camMat','alu');await has('camVcOut','300 m/dak');await has('camFzOut','0,08 mm');await has('camN','9.549 dev/dak');
      await range('camD',2);await range('camVc',500);await has('camN','12.000 dev/dak (sınırda');await has('camStatus','İş mili sınırda');
      await range('camD',40);await range('camW',20);await has('camStatus','sığmıyor');await has('camLmeas','—');
      await range('camW',200);await range('camH',200);await range('camAe',10);await range('camZ',6);await range('camFz',.3);await range('camAp',20);await range('camNmax',30000);await has('camLmeas','geçiş');
      await range('camH',40);await has('camLmeas','160 mm · 1 geçiş');
      await sel('camView','comp');await has('compLmeas','160 mm');await has('compAmeas','21,28 mm² (ızgara payı ±%4)');await has('compAtheo','%−0,85');await has('compLtheo','160 mm · %0');await has('compAtheo','21,46 mm²');await has('camStatus','4 köşede');
      await sel('compSide','out');await has('compLtheo','231,416 mm');await has('compAmeas','0 mm²');await has('camStatus','keskin kalır');
      await sel('compShape','L');await has('compAtheo','5,37 mm²');await sel('compSide','in');await range('compD',30);await has('camStatus','Geçersiz telafi');await has('compLmeas','—');await range('compD',4);await has('compLmeas','203,141 mm');await has('compLtheo','203,142 mm');
      await sel('compShape','tri');await sel('compShape','hex');await has('compLtheo','mm');
      await sel('camView','ball');await has('ballMeas','41,96 µm');await has('ballExact','41,96 µm · %0');await has('ballApprox','41,67 µm');await range('ballS',8);await has('ballMeas','tanımsız');await has('camStatus','tanımlı değil');
      await range('ballR',10);await range('ballS',.1);await has('ballExact','0,13 µm');await range('ballR',1);await range('ballS',1.9);await has('ballMeas','687,75 µm');
      await click('camReset');eq(await page.locator('#camView').inputValue(),'cut');await has('camN','3.820 dev/dak');await fits();
      /* klavye */
      await page.locator('#tab-cam').focus();await page.keyboard.press('Home');eq(await page.locator('#tab-plc').getAttribute('aria-selected'),'true');await page.keyboard.press('ArrowRight');eq(await page.locator('#tab-pn').getAttribute('aria-selected'),'true');await page.keyboard.press('End');eq(await page.locator('#tab-cam').getAttribute('aria-selected'),'true');await page.keyboard.press('ArrowRight');eq(await page.locator('#tab-plc').getAttribute('aria-selected'),'true');await page.keyboard.press('ArrowLeft');eq(await page.locator('#tab-cam').getAttribute('aria-selected'),'true');
      eq(await page.locator('#panel-plc').isHidden(),true);eq(await page.locator('#panel-cam').isVisible(),true);
      assert.deepEqual(errors,[]);checks++;await ctx.close();}
    console.log(`G ${SLUG}: ${checks-before} arayüz kontrolü (390 px açık, 1280 px koyu) PASS`);
  }finally{await browser?.close();await new Promise(r=>server.close(r));}
}
