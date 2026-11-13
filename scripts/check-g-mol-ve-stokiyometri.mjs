// G · mol-ve-stokiyometri: çekirdek, sayfanın formül ayrıştırıcısını ve formüllerini yinelemeyen referanslarla sınanır
// (testin kendi parantez açıcısı ve atom ağırlığı tablosu, NIST/BIPM/CIAAW'dan alınan sayılar, kaba kuvvetle eşleştirme,
// soru metinlerinden bağımsız yeniden hesap). `--browser` gerçek arayüzü 390 px açık ve 1280 px koyu temada dener.
import fs from 'node:fs';
import assert from 'node:assert/strict';
const html=fs.readFileSync(new URL('../mol-ve-stokiyometri.html',import.meta.url),'utf8');
const source=html.split('/* KERNEL-BEGIN */')[1]?.split('/* KERNEL-END */')[0];
assert(source,'Çekirdek sınır işaretleri gerekli');
const K=new Function('"use strict";'+source+';return MolLab;')();
let checks=0;
const eq=(a,b,msg)=>{assert.equal(a,b,(msg??'')+` · ${a} ≠ ${b}`);checks++;};
const ok=(c,msg)=>{assert(c,msg??'koşul sağlanmadı');checks++;};
const near=(a,b,tol,msg)=>{assert(Math.abs(a-b)<=tol,(msg||'')+` ${a} ≠ ${b} (tol ${tol})`);checks++;};
const rel=(a,b,tol,msg)=>near(a/b,1,tol,msg);
const M='−';
ok(Object.isFrozen(K)&&Object.isFrozen(K.AW)&&Object.isFrozen(K.REACTIONS)&&Object.isFrozen(K.MISTAKES)&&Object.isFrozen(K.TYPES));

/* ── Sabitler: açılan kaynaklardaki değerler ── */
eq(K.NA,6.02214076e23,'N_A (BIPM/NIST, tam)');eq(K.KB,1.380649e-23);near(K.R,8.314462618,1e-9,'R = N_A·k');
eq(K.U_KG,1.66053906892e-27,'u, CODATA 2022');near(K.MU,1.00000000105,1e-14,'M_u, CODATA 2022 (g/mol)');near(K.NA*K.U_KG*1000,K.MU,1e-9,'M_u = N_A·u');
near(K.Vm(273.15,100),22.71095464,1e-7,'NIST molar hacim 273,15 K, 100 kPa');near(K.Vm(273.15,101.325),22.41396954,1e-7,'NIST molar hacim 273,15 K, 101,325 kPa');
// CIAAW 2024 kısaltılmış tablo (açılan sayfa), testin kendi kopyası
const AWT={H:1.0080,C:12.011,N:14.007,O:15.999,Na:22.990,Mg:24.305,Al:26.982,P:30.974,S:32.06,Cl:35.45,K:39.098,Ca:40.078,Mn:54.938,Fe:55.845,Cu:63.546,Ba:137.33,Zn:65.38,Pb:207.2,I:126.90,Ag:107.87};
for(const[e,v]of Object.entries(AWT))eq(K.AW[e],v,'A_r '+e);
// Klor: NIST izotop kütleleri ve bollukları; CIAAW aralığı
near(K.clAvg(0.7576),0.7576*34.968852682+0.2424*36.965902602,1e-12);near(K.clAvg(0.7576),35.4529,1e-4);ok(K.clAvg(0.7576)>=35.446&&K.clAvg(0.7576)<=35.457,'NIST bolluğu CIAAW aralığında');
ok(K.clAvg(0.755)>=35.446&&K.clAvg(0.761)<=35.457,'CIAAW bolluk aralığının uçları ağırlık aralığında');

/* ── Bağımsız formül sayıcı: parantezi metin tekrarıyla açar ── */
const SUBS='₀₁₂₃₄₅₆₇₈₉';
function countsRef(f){f=f.replace(/[₀-₉]/g,c=>String(SUBS.indexOf(c))).replace(/[.*•]/g,'·').replace(/\[/g,'(').replace(/\]/g,')');const tot={};
  for(let part of f.split('·')){let mult=1;const m=part.match(/^(\d+)(.*)$/);if(m){mult=+m[1];part=m[2];}
    let prev;do{prev=part;part=part.replace(/\(([^()]*)\)(\d*)/,(_,x,n)=>x.repeat(n?+n:1));}while(part!==prev);
    for(const[,e,n]of part.matchAll(/([A-Z][a-z]?)(\d*)/g))tot[e]=(tot[e]||0)+(n?+n:1)*mult;}return tot;}
const MR=f=>Object.entries(countsRef(f)).reduce((s,[e,n])=>s+n*AWT[e],0);
const known={'H2O':18.015,'CO2':44.009,'O2':31.998,'C6H12O6':180.156,'NaCl':58.44,'CaCO3':100.086,'Ca(OH)2':74.092,'Al2(SO4)3':342.132,'CuSO4·5H2O':249.677,'(NH4)3PO4':149.087,'NH3':17.031,'CH4':16.043,'Fe2O3':159.687,'H2SO4':98.072};
for(const[f,v]of Object.entries(known)){near(K.mm(f),v,0.002,f);near(MR(f),v,0.002,'ref '+f);}
const forms=['H2O','C6H12O6','Ca(OH)2','Al2(SO4)3','CuSO4·5H2O','CuSO4.5H2O','CuSO4*5H2O','(NH4)3PO4','K4[Fe(CN)6]','Ca3(PO4)2','Ba(OH)2·8H2O','Na2CO3·10H2O','Mg(NO3)2','Fe2(SO4)3','C₆H₁₂O₆','CuSO₄·5H₂O','Mn(NO3)2·4H2O','Pb(NO3)2','AgNO3','Zn(OH)2','(CH3)3COH','Cu(NH3)4SO4·H2O'];
for(const f of forms){const A=Object.fromEntries(K.parseFormula(f).counts),B=countsRef(f);assert.deepEqual(A,B,f);checks++;near(K.mm(f),MR(f),1e-9,f);}
for(const s of['','2H2O','H2o','co2','Xx2','H2O·','·H2O','Ca(OH','Ca(OH))2','Ca)OH(2','H0','4','H2O!','Be','H2O·0H2O','(NH4]2SO4'])assert.throws(()=>K.parseFormula(s),K.ParseError,s),checks++;
assert.throws(()=>K.parseFormula('2H2O'),/katsayı/);assert.throws(()=>K.parseFormula('co'),/büyük harf/);checks+=2;
eq(K.pretty('CuSO4·5H2O'),'CuSO₄·5H₂O');eq(K.pretty('Al2(SO4)3'),'Al₂(SO₄)₃');eq(K.hill(K.parseFormula('O6H12C6').counts),'C₆H₁₂O₆');eq(K.hill(K.parseFormula('SO4Na2').counts),'Na₂O₄S');
eq(K.particleWord(K.parseFormula('NaCl').counts),'formül birimi');eq(K.particleWord(K.parseFormula('H2O').counts),'molekül');eq(K.particleWord(K.parseFormula('Fe').counts),'atom');eq(K.particleWord(K.parseFormula('O2').counts),'molekül');
// Kütlece yüzde toplamı 100
for(const f of forms){const R0=K.molarMass(f);near(R0.parts.reduce((s,p)=>s+p.pct,0),100,1e-9);eq(R0.atoms,Object.values(countsRef(f)).reduce((a,b)=>a+b,0));}

/* ── Sayı biçimi ── */
eq(K.fmt(-3.5,2),M+'3,50');eq(K.fmt(12345.678,1),'12\u202F345,7');eq(K.fmt(9999,0),'9999');eq(K.fmt(-0.0001,2),'0,00');
eq(K.sci(6.02214076e23,4),'6,022 × 10²³');eq(K.sci(9.9996e5,4),'1,000 × 10⁶');eq(K.sci(3.3e-24,3),'3,30 × 10⁻²⁴');eq(K.sig(1.998,4),'1,998');eq(K.sig(0.999996,4),'1,000');eq(K.sig(9.99996,4),'10,00');eq(K.sig(99.9996,3),'100');eq(K.sig(0.0992,3),'0,0992');eq(K.sig(1234567,4),'1,235 × 10⁶');eq(K.sig(22.711,5),'22,711');eq(K.pct(11.19),'%11,19');

/* ── Tolerant nicelik ayrıştırıcı ── */
const Q=s=>K.parseQty(s);
for(const[s,v,dim]of[['3',3,null],['0,5',0.5,null],['0.5',0.5,null],['-2',-2,null],['−2',-2,null],['12 000',12000,null],['1 000 000',1e6,null],['1/4',0.25,null],[' 7 ',7,null],
  ['6,02·10^23',6.02e23,null],['6.02e23',6.02e23,null],['6,02E23',6.02e23,null],['6,02 × 10²³',6.02e23,null],['6,02x10^23',6.02e23,null],['6,02 * 10^(23)',6.02e23,null],['1,5e-3',1.5e-3,null],['3,32 × 10⁻²⁴',3.32e-24,null],['10^23',1e23,null],['10²³',1e23,null],
  ['18 g',18,'mass'],['250 mg',0.25,'mass'],['0,25 kg',250,'mass'],['0,5 mol',0.5,'amount'],['500 mmol',0.5,'amount'],['2,5 L',2.5,'vol'],['250 mL',0.25,'vol'],['250 ml',0.25,'vol'],['100 cm³',0.1,'vol'],['1 dm3',1,'vol'],
  ['58,44 g/mol',58.44,'molar'],['0,2 mol/L',0.2,'conc'],['0,2 M',0.2,'conc'],['200 mmol/L',0.2,'conc'],['%40',40,'pct'],['40 %',40,'pct'],['40%',40,'pct'],['3,01·10^23 tane',3.01e23,'count'],['6,022e23 molekül',6.022e23,'count'],['1,2 × 10²⁴ atom',1.2e24,'count'],
  ['6,02⋅10²³',6.02e23,null],['6,02∙10^23',6.02e23,null],['5 g / mol',5,'molar'],['100,09 g/mol.',100.09,'molar'],
  ['n = 0,25 mol',0.25,'amount'],['m(H₂O) = 36 g',36,'mass'],['V = 5,68 L',5.68,'vol']]){const q=Q(s);const got=q.dim?q.v:q.num;rel(got,v,1e-12,s);eq(q.dim,dim,s);}
for(const s of['','abc','1,2.3','2 3','5 m','g','1/0','e23','× 10^23','1,5 kilo','12 elma','3 4 mol','6,02·10^','1.000,5'])assert.throws(()=>Q(s),K.ParseError,s),checks++;

/* ── Tepkimeler: atom denkliği (bağımsız sayıcı) ── */
for(const rx of K.REACTIONS){const L={},R={};for(const[nu,f]of rx.re)for(const[e,n]of Object.entries(countsRef(f)))L[e]=(L[e]||0)+nu*n;for(const[nu,f]of rx.pr)for(const[e,n]of Object.entries(countsRef(f)))R[e]=(R[e]||0)+nu*n;assert.deepEqual(L,R,rx.id);checks++;
  // kütle korunumu ν·M
  near(rx.re.reduce((s,[nu,f])=>s+nu*MR(f),0),rx.pr.reduce((s,[nu,f])=>s+nu*MR(f),0),1e-9,rx.id);
  ok((rx.def[0]*10)%1===0&&(rx.def[1]*10)%1===0&&rx.def.every(v=>v>=0.1&&v<=200),'varsayılan kütle kaydırıcıyla ulaşılabilir');ok(rx.pt.every(v=>Number.isInteger(v)&&v>=0&&v<=12));}
/* Sınırlayıcı: her girenin tek başına vereceği ürün; en azı gerçek ürün. Kaba kuvvet: ξ'yi küçük adımlarla ilerlet */
for(const rx of K.REACTIONS)for(let i=0;i<60;i++){const r=K.rng(i+5);const ms=[0.5+r()*80,0.5+r()*80];const S=K.stoich(rx,ms);
  const each=rx.re.map(([nu,f],k)=>ms[k]/MR(f)/nu);const xi=Math.min(...each);near(S.xi,xi,1e-12);eq(S.lim,each.indexOf(xi));
  let n=rx.re.map(([nu,f],k)=>ms[k]/MR(f)),steps=0;const d=xi/2000;while(n.every((v,k)=>v-rx.re[k][0]*d>=-1e-12)){n=n.map((v,k)=>v-rx.re[k][0]*d);steps++;if(steps>5000)break;}near(steps*d,xi,2*d,'kaba kuvvet ξ');
  const mIn=ms[0]+ms[1],mOut=S.pr.reduce((s,p)=>s+p.m,0)+S.re.reduce((s,q)=>s+q.mLeft,0);near(mIn,mOut,1e-9,'kütle korunumu');ok(S.re[S.lim].mLeft<1e-9);}
{const S=K.stoich(K.REACTIONS[0],[4,16]);eq(S.lim,1,'4 g H₂ + 16 g O₂: O₂ sınırlayıcı');eq(S.smaller,0);const xo=16/MR('O2');near(S.pr[0].m,xo*2*MR('H2O'),1e-9);near(S.re[0].mLeft,4-2*xo*MR('H2'),1e-9);}
{const S=K.stoich(K.REACTIONS[0],[2*MR('H2'),MR('O2')]);ok(S.exact,'tam oran');}
// Molekül düzeyi eşleştirme: kaba kuvvet döngüsü
for(const rx of K.REACTIONS)for(let a=0;a<=12;a++)for(let b=0;b<=12;b++){const E=K.events(rx,[a,b]);let c=[a,b],e=0;while(c[0]>=rx.re[0][0]&&c[1]>=rx.re[1][0]){c=[c[0]-rx.re[0][0],c[1]-rx.re[1][0]];e++;}eq(E.e,e);assert.deepEqual(E.left,c);checks++;
  const T1=K.atomTally(rx.re,[a,b]),T2=K.atomTally([...rx.pr,...rx.re],[...E.prod,...E.left]);for(const[el,nn]of T1)eq(T2.get(el)||0,nn,'atom korunumu');}

/* ── Basit formül ve yakma analizi ── */
for(const f of['C6H12O6','C2H6O','C6H6','C2H4O2','C6H8O6','C3H6O','C4H10'])for(let sd=1;sd<=12;sd++)for(const ms of[0.1,0.25,0.5]){const C=K.combustion(f,ms,0,sd);
  // 0,1 mg yuvarlamalı kusursuz ölçüm gerçek formülü bulur
  ok(C.emp&&K.keyOf(C.mol)===K.keyOf(K.parseFormula(f).counts),f+' '+ms+' '+sd);
  // bağımsız: CO2 ve H2O kütleleri
  const c=countsRef(f),n=ms/MR(f);near(C.mCO2,n*c.C*MR('CO2'),6e-5);near(C.mH2O,n*c.H/2*MR('H2O'),6e-5);}
{let wrong=0,fail=0,tot=0;for(let sd=1;sd<=50;sd++){const C=K.combustion('C6H8O6',0.25,3,sd);tot++;if(!C.emp)fail++;else if(K.keyOf(C.mol)!==K.keyOf(K.parseFormula('C6H8O6').counts))wrong++;}ok(wrong+fail>0,'%3 hata en az bir ölçümde yöntemi şaşırtır ('+wrong+' yanlış, '+fail+' bulunamadı / '+tot+')');}
{const E=K.empirical(new Map([['C',1],['H',4/3],['O',1]]));eq(E.k,3);const E2=K.empirical(new Map([['P',1],['O',2.5]]));eq(E2.k,2);const E3=K.empirical(new Map([['C',1],['H',2.25]]));eq(E3.k,4);}
{const C=K.combustion('C6H12O6',0.25,0.2,1);for(const[,p]of C.pct)ok(p>0);near([...C.pct.values()].reduce((a,b)=>a+b,0),100,1e-9,'yüzdeler toplamı (O farktan)');}
{const C=K.combustion('C4H10',0.25,0,1);ok(!C.masses.has('O'));near(C.masses.get('C')+C.masses.get('H'),0.25,2e-4,'oksijensiz bileşikte C + H = örnek');}

/* ── Tartarak saymak, izotop örneği ── */
for(const obj of Object.keys(K.OBJECTS)){let sumErr=0;for(let sd=1;sd<=40;sd++){const W=K.weighCount(obj,1000,50,sd);sumErr+=Math.abs(W.err);const tot=Math.round(W.masses.reduce((a,b)=>a+b,0)*100)/100;near(W.total,tot,1e-9);
    const W2=K.weighCount(obj,1000,10,sd);eq(W2.total,W.total,'örnek büyüklüğü kavanozu değiştirmez');const W3=K.weighCount(obj,500,10,sd);near(W3.masses[0],W.masses[0],0,'adet kavanozun ilk nesnelerini değiştirmez');}
  ok(sumErr/40<(obj==='pirinc'?8:2),obj+': 50 tanelik örnekle ortalama sapma %'+(sumErr/40).toFixed(2));}
{let s1=0,s50=0;for(let sd=1;sd<=60;sd++){s1+=Math.abs(K.weighCount('vida',500,1,sd).err);s50+=Math.abs(K.weighCount('vida',500,50,sd).err);}ok(s50<s1/3,'büyük örnek daha iyi tahmin: '+(s1/60).toFixed(2)+' → '+(s50/60).toFixed(2));}
for(let sd=1;sd<=20;sd++){const S=K.isoSample(0.7576,100000,sd);near(S.avg,K.clAvg(0.7576),4*Math.sqrt(0.7576*0.2424/1e5)*2,'büyük örnek ortalamaya oturur');eq(S.draws.length,400);eq(S.c35+S.c37,100000);}

/* ── Seyreltme ── */
for(const c1 of[0.5,1,2,6,12])for(const c2 of[0.01,0.1,0.5,1])for(const V2 of[50,250,1000]){const D=K.dilution(c1,c2,V2);if(c2>c1){ok(!D.ok);continue;}near(c1*D.V1,c2*V2,1e-9);near(D.V1+D.water,V2,1e-9);}

/* ── Alıştırma üreteci: her tür için 150 soru, hedef soru metninden bağımsız hesaplanır ── */
const unsub=s=>s.replace(/[₀-₉]/g,c=>String(SUBS.indexOf(c)));
const numTr=s=>Number(s.replace(/ /g,'').replace(M,'-').replace(',','.'));
const VSTP=22.71095464;
function eqParse(p){const m=p.match(/^(.*?) → (.*?) tepkimesi/);const side=t=>t.split(' + ').map(x=>{const mm=unsub(x).match(/^(\d*)(.*)$/);return[mm[1]?+mm[1]:1,mm[2]];});return{re:side(m[1]),pr:side(m[2])};}
let generated=0;const seen=new Set();
for(let L=1;L<=3;L++)for(const[type]of K.TYPES[L-1])for(let n=1;n<=150;n++){const ex=K.makeExercise(L,n,type);generated++;seen.add(ex.prompt);const p=ex.prompt;
  eq(ex.type,type);ok(ex.steps.length>=2&&ex.hint.length>10,type+' adım/ipucu');ok(!/-\d/.test(p+ex.answer),type+' tire yerine eksi işareti');
  const g=K.grade(ex,ex.answer);eq(g.st,'dogru',`${type} ${n}: kendi cevabı ${ex.answer} → ${g.msg}`);
  for(const tr of ex.traps){ok(Math.abs(tr.v/ex.target-1)>0.012,type+' tuzak hedeften ayrık');const tv=String(tr.v/K.UNITS[ex.unitKey][1]);eq(K.grade(ex,tv).st,'yanlis',type+' tuzak yanlış sayılır');ok(K.grade(ex,tv).msg.includes(tr.msg),type+' tuzak iletisi');}
  let t;const nums=[...p.matchAll(/(\d[\d ]*(?:,\d+)?)/g)].map(m=>numTr(m[1]));
  if(type==='mm'||type==='mmHyd'){t=MR(unsub(p.split(' ')[0]));}
  else if(type==='g2mol'){const m=p.match(/^([\d,]+) g (\S+) kaç mol/);t=numTr(m[1])/MR(unsub(m[2]));}
  else if(type==='mol2g'){const m=p.match(/^([\d,]+) mol (\S+) kaç gram/);t=numTr(m[1])*MR(unsub(m[2]));}
  else if(type==='mol2N'){const m=p.match(/^([\d,]+) mol/);t=numTr(m[1])*6.02214076e23;}
  else if(type==='g2Natoms'){const m=p.match(/^([\d,]+) g (\S+) içinde kaç (\S+) atomu/);t=numTr(m[1])/MR(unsub(m[2]))*6.02214076e23*countsRef(unsub(m[2]))[m[3]];}
  else if(type==='pct'){const m=p.match(/^(\S+) bileşiğinde (\S+) elementinin/);const f=unsub(m[1]);t=countsRef(f)[m[2]]*AWT[m[2]]/MR(f)*100;}
  else if(type==='ratio'){const R=eqParse(p),m=p.match(/tepkimesinde ([\d,]+) mol (\S+) tamamen.*kaç mol (\S+) (oluşur|harcanır)/);const all=[...R.re,...R.pr];const ni=all.find(x=>x[1]===unsub(m[2]))[0],nj=all.find(x=>x[1]===unsub(m[3]))[0];t=numTr(m[1])*nj/ni;}
  else if(type==='molar'){const m=p.match(/^([\d,]+) g (\S+) suda.*?(\d+) mL/);t=numTr(m[1])/MR(unsub(m[2]))/(+m[3]/1000);}
  else if(type==='gas'){const m=p.match(/^([\d,]+) g (\S+) gazı/);t=numTr(m[1])/MR(unsub(m[2]))*VSTP;}
  else if(type==='m2m'){const R=eqParse(p),m=p.match(/tepkimesinde ([\d,]+) g (\S+) tamamen.*kaç gram (\S+) oluşur/);const fi=unsub(m[2]),fj=unsub(m[3]);const ni=R.re.find(x=>x[1]===fi)[0],nj=R.pr.find(x=>x[1]===fj)[0];t=numTr(m[1])/MR(fi)*nj/ni*MR(fj);}
  else if(type==='limit'||type==='yield'||type==='limitWho'){const R=eqParse(p),m=p.match(/için ([\d,]+) g (\S+) ve ([\d,]+) g (\S+) karıştırılıyor/);const ms=[numTr(m[1]),numTr(m[3])],fs=[unsub(m[2]),unsub(m[4])];const per=fs.map((f,k)=>ms[k]/MR(f)/R.re.find(x=>x[1]===f)[0]);const xi=Math.min(...per);
    const prod=R.pr[0];const theo=xi*prod[0]*MR(prod[1]);if(type==='limit')t=theo;else if(type==='yield'){const a=numTr(p.match(/sonunda ([\d,]+) g/)[1]);t=a/theo*100;ok(t<100&&t>50);}else{ok(K.keyOf(ex.target)===K.keyOf(K.parseFormula(fs[per.indexOf(xi)]).counts),'sınırlayıcı formül');eq(K.grade(ex,fs[1-per.indexOf(xi)]).st,'yanlis');continue;}}
  else if(type==='emp'||type==='mol'){const pcts=[...p.matchAll(/%([\d,]+) ([A-Z][a-z]?)/g)].map(m=>[m[2],numTr(m[1])]);const c=countsRef(unsub(ex.answer));const Mf=MR(unsub(ex.answer));
    for(const[e,v]of pcts)near(c[e]*AWT[e]/Mf*100,v,0.006,'yüzdeler cevabı doğrular '+p);eq(pcts.length,Object.keys(c).length);
    const vals=Object.values(c),gg=vals.reduce((a,b)=>{while(b){[a,b]=[b,a%b];}return a;});if(type==='emp')eq(gg,1,'basit formül sadeleşmiş');else{near(Mf,numTr(p.match(/Molar kütlesi ([\d,]+)/)[1]),0.051);ok(gg>1,'molekül formülü basit formülden farklı');
      const half=Object.entries(c).map(([e,v])=>e+v/gg).join('');eq(K.grade(ex,half).st,'eksik','basit formül eksik sayılır');}
    const dbl=Object.entries(c).map(([e,v])=>e+v*2).join('');eq(K.grade(ex,dbl).st,type==='emp'?'eksik':'yanlis');continue;}
  else if(type==='dil'){const m=p.match(/^([\d,]+) M stok.*?([\d,]+) M derişimli (\d+) mL/);t=numTr(m[2])*(+m[3])/numTr(m[1])/1000;}
  else assert.fail('denetlenmeyen tür '+type);
  rel(ex.target,t,1e-9,`${type} ${n}: ${p}`);}
ok(seen.size>generated*0.3,'sorular yeterince çeşitli: '+seen.size+'/'+generated);
for(let L=1;L<=3;L++)for(let n=1;n<=40;n++)eq(K.makeExercise(L,n).prompt,K.makeExercise(L,n).prompt);
const ex1=K.makeExercise(1,1);eq(ex1.prompt,'CaCO₃ bileşiğinin molar kütlesi kaç g/mol?');

/* Notlama: tipik doğru, yaklaşık, yanlış ve geçersiz cevaplar */
const G=(e,s)=>K.grade(e,s).st;
{const e=K.makeExercise(1,1,'g2mol');const t=e.target;eq(G(e,String(t)),'dogru');eq(G(e,K.fmt(t,3)),'dogru');eq(G(e,(t*1.008).toFixed(4)),'yaklasik');eq(G(e,(t*1.05).toFixed(4)),'yanlis');eq(G(e,t+' g'),'yanlis');ok(/Birim tutmuyor/.test(K.grade(e,t+' g').msg));eq(G(e,(t*1000)+' mmol'),'dogru');eq(G(e,String(t*10)),'yanlis');ok(/10’un kuvveti/.test(K.grade(e,String(t*10)).msg));eq(G(e,'abc'),'gecersiz');eq(G(e,''),'gecersiz');}
{const e=K.makeExercise(1,3,'mm');const f=unsub(e.prompt.split(' ')[0]);const rounded=Object.entries(countsRef(f)).reduce((s,[el,n])=>s+n*Math.round(AWT[el]*2)/2,0);eq(G(e,String(rounded)),'dogru','yuvarlanmış atom ağırlıkları (O = 16, Cl = 35,5) kabul');}
{const e=K.makeExercise(1,2,'mol2N');eq(G(e,(e.target/1e23).toFixed(3)+'e23'),'dogru');eq(G(e,(e.target/1e23).toFixed(3).replace('.',',')+'·10^23'),'dogru');eq(G(e,String(e.target/6.02214076e23/6.02214076e23)),'yanlis');eq(G(e,(e.target/1e23).toFixed(3).replace('.',',')+' × 10²³'),'dogru');}
{let found=0;for(let n=1;n<=60;n++){const e=K.makeExercise(2,n,'gas');eq(G(e,String(e.target/22.71095464*22.414)),'yanlis');ok(/eski tanım/.test(K.grade(e,String(e.target/22.71095464*22.414)).msg));found++;}ok(found===60);}
{for(let n=1;n<=40;n++){const e=K.makeExercise(3,n,'yield');eq(G(e,'%'+String(e.target).replace('.',',')),'dogru');eq(G(e,String(e.target)+' %'),'dogru');eq(G(e,'120'),'yanlis');ok(/%100/.test(K.grade(e,'120').msg)||/Henüz/.test(K.grade(e,'120').msg));}}
{for(let n=1;n<=40;n++){const e=K.makeExercise(3,n,'dil');eq(G(e,String(e.target*1000)),'dogru');eq(G(e,String(e.target)+' L'),'dogru');eq(G(e,String(e.target*1000)+' mL'),'dogru');eq(G(e,String(e.target)),'yanlis');}}
{const e=K.makeExercise(3,1,'emp');eq(G(e,'C6'),'yanlis');eq(G(e,'h2o'),'gecersiz');}

/* ── Sık yapılan hatalar: yanlış adım gerçekten yanlış, doğrusu bağımsız hesapla doğru ── */
eq(K.MISTAKES.length,8);const MK=Object.fromEntries(K.MISTAKES.map(m=>[m.id,m]));
near(MK.o2.vals.right,8/MR('O2'),1e-12);near(MK.o2.vals.wrong/MK.o2.vals.right,2,0.001);
near(MK.kutle.vals.right,10/MR('O2')*2*MR('H2'),1e-12);ok(MK.kutle.vals.wrong/MK.kutle.vals.right>15);
eq(MK.katsayi.vals.right,2);eq(MK.kucuk.vals.lim,1);near(MK.kucuk.vals.left,4-2*16/MR('O2')*MR('H2'),1e-9);ok(MK.verim.vals.P>100);ok(MK.verim.wrong.includes('%116,6')&&MK.verim.wrong.includes('18,02 g'),'hata kartı sekme 04 ile aynı biçim (%116,6)');
near(MK.hidrat.vals.right,25/MR('CuSO4·5H2O'),1e-12);near(MK.hidrat.vals.wrong/MK.hidrat.vals.right,MR('CuSO4·5H2O')/MR('CuSO4'),1e-12);near(MK.seyrelt.vals.cWrong,50/550,1e-12);near(MK.na.vals.right,2*6.02214076e23,1);
for(const m of K.MISTAKES)ok(m.title&&m.wrong&&m.right&&m.why.length>60&&!/-\d/.test(m.wrong+m.right));

console.log(`G mol-ve-stokiyometri: ${checks.toLocaleString('tr-TR')} bağımsız çekirdek kontrolü PASS (${generated} üretilmiş soru)`);

if(process.argv.includes('--browser')){
  const {chromium}=await import('playwright');const {createServer}=await import('node:http');const {join,extname}=await import('node:path');const {fileURLToPath}=await import('node:url');const root=fileURLToPath(new URL('../',import.meta.url));
  const server=createServer((req,res)=>{const file=join(root,decodeURIComponent(new URL(req.url,'http://localhost').pathname));if(!fs.existsSync(file)||fs.statSync(file).isDirectory()){res.writeHead(404).end();return;}res.setHeader('Content-Type',({'.html':'text/html; charset=utf-8','.js':'text/javascript; charset=utf-8','.css':'text/css; charset=utf-8'})[extname(file)]||'application/octet-stream');res.end(fs.readFileSync(file));});await new Promise(r=>server.listen(0,'127.0.0.1',r));let browser;const before=checks;
  try{browser=await chromium.launch();
    for(const[theme,width]of[['light',390],['dark',1280]]){
      const page=await browser.newPage({viewport:{width,height:900},deviceScaleFactor:width===390?2:1});await page.addInitScript(t=>{localStorage.setItem('acelya-theme',t);localStorage.setItem('acelya-sound-muted','1');},theme);page.setDefaultTimeout(8000);
      const errors=[];page.on('pageerror',e=>errors.push(e.message));
      page.on('response',r=>{if(r.status()>=400&&!/shared\/digest\/mol-ve-stokiyometri\.js$/.test(r.url()))errors.push(r.status()+' '+r.url());});
      page.on('console',m=>{if(m.type()==='error'&&!/Failed to load resource/.test(m.text()))errors.push(m.text());});
      await page.goto(`http://127.0.0.1:${server.address().port}/mol-ve-stokiyometri.html`);await page.waitForTimeout(250);
      const click=id=>page.locator('#'+id).click(),read=async id=>(await page.locator('#'+id).textContent()).replace(/[  ]/g,' '),set=(id,v)=>page.locator('#'+id).evaluate((e,v)=>{e.value=v;e.dispatchEvent(new Event(e.tagName==='SELECT'?'change':'input',{bubbles:true}));},v),
        is=async(id,t)=>{eq(await read(id),t,id);},has=async(id,t)=>{const s=await read(id);ok(s.includes(t),`${id}: “${s}” içinde “${t}” yok`);},fits=async()=>eq(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),true,'yatay taşma');
      eq(await page.evaluate(()=>[...document.querySelectorAll('.app-content input,.app-content select')].filter(e=>!document.querySelector('label[for="'+e.id+'"]')).map(e=>e.id).join()),'','etiketsiz denetim');
      eq(await page.evaluate(()=>{const cs=[...document.querySelectorAll('.app-content svg.ms-svg')];return cs.length===8&&cs.every(c=>c.getAttribute('role')==='img'&&!!c.getAttribute('aria-label'));}),true,'svg erişilebilirliği');
      eq(await page.evaluate(()=>Object.isFrozen(MolLab)&&!Object.getOwnPropertyDescriptor(window,'MolLab').writable),true);
      eq(await page.evaluate(()=>/[̀-ͯ]/.test(document.body.innerText)),false,'birleşik aksan işareti yok');
      eq(await page.evaluate(()=>document.querySelectorAll('input[type=number]').length),0);eq(await page.evaluate(()=>document.title.length<=80),true);
      eq(await page.locator('#bundan-sonra ~ .ms-next a').count(),5,'Bundan sonra: beş mevcut sayfa');for(const h of['denklem-denklestirme','ideal-gaz','cozeltiler-ve-koligatif-ozellikler','asit-baz-titrasyonu','termokimya-ve-hess-yasasi'])eq(await page.locator('.ms-next a[href="'+h+'.html"]').count(),1,h);
      // 01 · Tartarak saymak
      const W=await page.evaluate(()=>MolLab.weighCount('vida',500,10,1));await is('wTotal',K.fmt(W.total,2)+' g');await is('wEst','≈ '+K.fmt(W.estN,0)+' tane');await is('wTrue','500 tane');await is('wNOut','500 tane');
      await set('wK',50);const W50=await page.evaluate(()=>MolLab.weighCount('vida',500,50,1));await is('wEst','≈ '+K.fmt(W50.estN,0)+' tane');await is('wTotal',K.fmt(W.total,2)+' g');
      await set('wObj','pirinc');await set('wK',1);await has('wStatus','0,01');await has('wStatus','şanstır');await has('wStatus','±%25');eq(await page.locator('#wStatus.is-bad').count(),1,'tek pirinç tanesi: yuvarlama uyarısı');await click('wNew');await click('wNew');await click('wNew');await has('wStatus','yuvarlamadan geliyor');await set('wK',50);ok(!(await read('wStatus')).includes('yuvarlama tek başına'),'50 tanede yuvarlama uyarısı yok');await click('wNew');await has('wMole','ton');
      await set('aEl','O');await is('aAr','15,999');await is('aMol','15,999 g');await has('aPerG','× 10²²');await set('aEl','C');await is('aAr','12,011');
      await is('isoAvg','35,4529 u');await is('isoXOut','%75,76');await has('isoCiaawN','bu aralıkta');await set('isoX',70);await has('isoCiaawN','dışında');eq(await page.locator('#isoStatus.is-bad').count(),1);await set('isoN','100000');await click('isoNew');
      await click('tartmaReset');await is('wEst','≈ '+K.fmt(W.estN,0)+' tane');await is('isoAvg','35,4529 u');eq(await page.locator('#isoN').inputValue(),'100');await fits();
      await page.locator('#tab-tartma').focus();await page.keyboard.press('ArrowRight');eq(await page.locator('#tab-molar').getAttribute('aria-selected'),'true');
      // 02 · Molar kütle
      await is('mmM','18,015 g/mol');await is('mmAtoms','3 atom');await is('cvN','1,998 mol');await is('cvP','1,203 × 10²⁴');eq(await page.locator('#mmTable tr').count(),3);
      await click('mmP5');await is('mmM','249,677 g/mol');await has('mmStatus','Hidrat');await is('mmKind','bir formül birimi');await click('mmP4');await is('mmM','342,132 g/mol');await click('mmP6');await is('mmM','149,087 g/mol');
      await set('mmIn','K4[Fe(CN)6]');await is('mmM',K.fmt(MR('K4[Fe(CN)6]'),3)+' g/mol');await set('mmIn','2H2O');await has('mmStatus','katsayı');await is('mmM','—');await has('cvStatus','formül');await set('mmIn','co2');await has('mmStatus','büyük harf');
      await set('mmIn','H2O');await set('cvGiven','N');await set('cvVal','6,022·10^23');await is('cvN','1,000 mol');await is('cvM','18,01 g');await set('cvVal','6.022e23');await is('cvN','1,000 mol');await set('cvVal','5 g');await has('cvStatus','uyuşmuyor');
      await set('cvGiven','n');await set('cvVal','0,5 mol');await is('cvM','9,008 g');await set('cvGiven','m');await set('cvVal','250 mg');await is('cvN','0,01388 mol');await set('cvVal','x');await has('cvStatus','anlaşılamadı');
      await page.locator('h1').click();await page.keyboard.press('r');await is('cvN','1,998 mol');await is('mmM','18,015 g/mol');await fits();
      // 03 · Formül
      await click('tab-formul');await is('fmEmp','CH₂O');await is('fmMol','C₆H₁₂O₆');await is('fmTrue','C₆H₁₂O₆');await has('fmStatus','gerçek formülü buldu');eq(await page.locator('#fmTable tr').count(),3);
      await set('fmComp','C6H8O6');await is('fmEmp','C₃H₄O₃');await is('fmKTh','× 3');await is('fmMol','C₆H₈O₆');await set('fmComp','C4H10');await is('fmEmp','C₂H₅');await is('fmMol','C₄H₁₀');eq(await page.locator('#fmTable tr').count(),2);await has('fmSteps','oksijen yok');
      await set('fmComp','C6H8O6');await set('fmErr',3);let sawBad=false;for(let s=1;s<=50&&!sawBad;s++){await set('fmSeed',s);sawBad=(await page.locator('#fmStatus.is-bad').count())===1;}ok(sawBad,'yüksek hata yanlış ya da bulunamayan formül gösterir');
      await click('formulReset');await is('fmEmp','CH₂O');await is('fmErrOut','%0,2');await fits();
      // 04 · Tepkime
      await click('tab-tepkime');await is('rxEq','2H₂ + O₂ → 2H₂O');await is('ptEvents','3 olay');await is('ptLim','H₂');await is('ptLeft','1 O₂');await has('ptSvg','korundu');
      await set('ptA',4);await set('ptB',2);await is('ptLim','ikisi birlikte (tam oran)');await is('ptLeft','yok');await set('ptA',0);await is('ptEvents','0 olay');await is('ptLim','H₂');
      await is('stLim','O₂');await is('stLeft','1,98 g H₂');await is('stTheo','18,02 g');await has('stStatus','Kütlesi küçük olan H₂');await is('stPct','—');
      await set('stAct','15,2');await is('stPct','%84,4');await set('stAct','21 g');await is('stPct','%116,6');await has('stStatus','imkânsız');eq(await page.locator('#stStatus.is-bad').count(),1);await set('stAct','5 mol');await has('stPctN','anlaşılamadı');
      await set('rxSel','fe');await is('rxEq','Fe₂O₃ + 3CO → 2Fe + 3CO₂');await is('stLim','Fe₂O₃');await has('ptAL','formül birimi');eq(await page.locator('#stProd option').count(),2);await set('stProd','1');await has('stTheoL','CO₂');
      await set('rxSel','alcl3');await is('stLim','Cl₂');await has('ptAL','Al atom');await set('rxSel','c3h8');await is('stLim','O₂');await set('stA',200);await set('stB',0.1);await is('stLim','O₂');
      await set('rxSel','nh3');await set('stA',28);await set('stB',6.1);await has('stSteps','Kütle korunumu');
      await click('tepkimeReset');await is('rxEq','2H₂ + O₂ → 2H₂O');await is('stTheo','18,02 g');eq(await page.locator('#stAct').inputValue(),'');await fits();
      // 05 · Çözelti ve gaz
      await click('tab-cozelti');await is('moN','0,09925 mol');await is('moC','0,3970 mol/L');await is('dlV1','25,00 mL');await is('dlW','≈ 475,0 mL');await is('gsVm','22,711 L/mol');await is('gsV','2,271 L');eq(await page.locator('#gsTF').isHidden(),true);
      await set('moSol','CuSO4·5H2O');await set('moM',24.9);await set('moV',1000);await has('moCN','CuSO₄');await is('moC','0,09973 mol/L');
      await set('dlC2',3);await has('dlStatus','yükselmez');eq(await page.locator('#dlStatus.is-bad').count(),1);await set('dlC2',0.01);await set('dlC1',12);await set('dlV2',50);await has('dlStatus','1 mL’den az');
      await set('gsCond','old');await is('gsVm','22,414 L/mol');await set('gsCond','satp');await is('gsVm','24,790 L/mol');await set('gsCond','custom');eq(await page.locator('#gsTF').isVisible(),true);await set('gsT',25);await set('gsP',100);await is('gsVm','24,790 L/mol');
      await set('gsGas','H2');await set('gsM',0.2);await set('gsCond','stp');await is('gsV','2,253 L');
      await click('cozeltiReset');await is('moC','0,3970 mol/L');await is('gsV','2,271 L');eq(await page.locator('#gsTF').isHidden(),true);await fits();
      await page.locator('#tab-cozelti').focus();await page.keyboard.press('Home');eq(await page.locator('#tab-tartma').getAttribute('aria-selected'),'true');await page.keyboard.press('End');eq(await page.locator('#tab-cozelti').getAttribute('aria-selected'),'true');
      // Alıştırma
      await is('pQ','CaCO₃ bileşiğinin molar kütlesi kaç g/mol?');eq(await page.locator('#pStep').isDisabled(),true);await set('pAns','100,09');await click('pCheck');eq(await page.locator('#pFb').getAttribute('data-st'),'dogru');await has('pScore','1 soru doğru, 1 deneme');
      await set('pAns','68,09');await click('pCheck');eq(await page.locator('#pFb').getAttribute('data-st'),'yanlis');await has('pFb','Alt indis');await set('pAns','100 g');await click('pCheck');await has('pFb','Birim tutmuyor');
      await click('pHint');eq(await page.locator('#pHintBox').isVisible(),true);const nst=await page.evaluate(()=>MolLab.makeExercise(1,1).steps.length);for(let i=0;i<nst;i++)await click('pStep');eq(await page.locator('#pSteps li').count(),nst);eq(await page.locator('#pStep').isDisabled(),true);
      await click('pNew');await is('pNoOut','2');eq(await page.locator('#pSteps').isHidden(),true);
      for(const L of['1','2','3']){await set('pLevel',L);const nT=await page.locator('#pType option').count();eq(nT,[0,4,6,7][+L]+1);for(let i=1;i<nT;i++){await page.locator('#pType').selectOption({index:i});const ans=await page.evaluate(()=>{const L=+document.getElementById('pLevel').value,n=+document.getElementById('pNo').value,t=document.getElementById('pType').value;return MolLab.makeExercise(L,n,t).answer;});
        await set('pAns',ans);await page.locator('#pAns').press('Enter');eq(await page.locator('#pFb').getAttribute('data-st'),'dogru','arayüz notlaması '+ans);}}
      await set('pAns','1,2.3');await click('pCheck');eq(await page.locator('#pFb').getAttribute('data-st'),'gecersiz');
      // Hatalar
      eq(await page.locator('#mistakes .ms-card').count(),8);await has('mk-o2','0,250 mol');await has('mk-kucuk','O₂ sınırlayıcı');
      for(const t of['tartma','molar','formul','tepkime','cozelti']){await click('tab-'+t);await fits();eq(await page.locator('#panel-'+t).isVisible(),true);
        eq(await page.evaluate(t=>[...document.querySelectorAll('#panel-'+t+' svg.ms-svg')].every(s=>s.childElementCount>2&&s.viewBox.baseVal.width>200),t),true,t+' svg boş');}
      assert.deepEqual(errors,[]);checks++;await page.close();}
    console.log(`G mol-ve-stokiyometri: ${checks-before} tarayıcı kontrolü PASS (390 px açık, 1280 px koyu)`);
  }finally{await browser?.close();await new Promise(r=>server.close(r));}
}
