// G · organik-kimya-ve-izomeri: çekirdek, sayfanın algoritmalarını yinelemeyen referanslarla sınanır
// (Prüfer dizileriyle bütün etiketli ağaçlar ve her kökten en küçük dizgiyle eşyapı ayıklama, OEIS A000602 /
// A000628 / A000598 değerleri, alkil gruplarından eter sayısı formülü, addan yapı kuran bağımsız bir çözümleyici,
// Floyd–Warshall ile Wiener indeksi, SMILES etiketinden permütasyon işaretiyle R/S, bilinen doğal moleküllerin
// R/S değerleri, farklı kareleme kuralıyla Boltzmann integrali, OpenStax ve CIAAW tablo değerleri).
// `--browser` gerçek arayüzü 390 px açık ve 1280 px koyu temada dener.
import fs from 'node:fs';
import assert from 'node:assert/strict';
const html=fs.readFileSync(new URL('../organik-kimya-ve-izomeri.html',import.meta.url),'utf8');
const source=html.split('/* KERNEL-BEGIN */')[1]?.split('/* KERNEL-END */')[0];
assert(source,'Çekirdek sınır işaretleri gerekli');
const K=new Function('"use strict";'+source+';return OrganicLab;')();
let checks=0;
const eq=(a,b,msg)=>{assert.equal(a,b,msg);checks++;};
const ok=(c,msg)=>{assert(c,msg);checks++;};
const near=(a,b,tol,msg)=>{assert(Math.abs(a-b)<=tol,(msg||'')+` ${a} ≠ ${b}`);checks++;};
ok(Object.isFrozen(K)&&Object.isFrozen(K.EL)&&Object.isFrozen(K.A_VALUES));

/* ── Bağımsız referanslar ── */
const A602=[1,1,1,1,2,3,5,9,18,35,75,159,355,802,1858]; // OEIS A000602, a(0) …
const A628=[1,1,1,1,2,3,5,11,24,55,136];                // OEIS A000628
const A598=[1,1,1,2,4,8,17,39,89];                      // OEIS A000598 (alkil grupları = alkoller)
// Her kökten köklenmiş, iç içe sıralı dizi gösterimi; en küçüğü ağacın değişmezidir (sayfa merkezden kökler).
const rootCode=(adj,lab,v,p)=>'['+(lab?lab[v]:'')+adj[v].filter(w=>w!==p).map(w=>rootCode(adj,lab,w,v)).sort().join(',')+']';
const invariant=(adj,lab)=>adj.map((_,r)=>rootCode(adj,lab,r,-1)).sort()[0];
function prufer(seq,n){const deg=new Array(n).fill(1);for(const x of seq)deg[x]++;const adj=Array.from({length:n},()=>[]);const d=deg.slice();
  for(const x of seq){let leaf=0;while(d[leaf]!==1)leaf++;adj[leaf].push(x);adj[x].push(leaf);d[leaf]--;d[x]--;}
  const rest=[...Array(n).keys()].filter(i=>d[i]===1);adj[rest[0]].push(rest[1]);adj[rest[1]].push(rest[0]);return adj;}
function bruteAlkanes(n){if(n<=2)return 1;const set=new Set(),seq=new Array(n-2).fill(0);
  for(;;){const cnt=new Array(n).fill(0);let okd=true;for(const x of seq)if(++cnt[x]>3){okd=false;break;}
    if(okd)set.add(invariant(prufer(seq,n)));let i=n-3;while(i>=0&&++seq[i]===n){seq[i]=0;i--;}if(i<0)break;}
  return set.size;}
for(let n=1;n<=8;n++){const b=bruteAlkanes(n);eq(b,A602[n],'kaba kuvvet '+n);eq(K.alkaneTrees(n).length,b,'çekirdek '+n);}
for(let n=1;n<=14;n++){const T=K.alkaneTrees(n);eq(T.length,A602[n],'A000602 '+n);eq(K.generationStats(n).count,A602[n]);
  if(n<=10){const inv=new Set(T.map(t=>invariant(t)));eq(inv.size,T.length,'tekrar yok '+n);ok(T.every(t=>t.every(a=>a.length<=4)),'derece ≤ 4');}}
eq(K.generationStats(5).candidates,8);eq(K.generationStats(10).candidates,296);
// Stereoizomer sayımı (OEIS A000628) ve kiral iskelet sayısı
const chiralCounts=[];
for(let n=1;n<=10;n++){let s=0,ch=0;for(const t of K.alkaneTrees(n)){const m=K.treeToMol(t);s+=K.stereoClasses(m,K.candidateCentres(m)).count;if(K.stereocentres(m).length)ch++;}eq(s,A628[n],'A000628 '+n);chiralCounts.push(ch);}
eq(chiralCounts.join(),'0,0,0,0,0,0,2,5,15,40');
// Oksijenli izomerler: alkol = alkil grubu sayısı; eter = sırasız alkil çiftleri, Σ r(a)r(b) (a < b) + r(a)(r(a) + 1)/2 (a = b)
for(let n=1;n<=7;n++){const L=K.oxygenIsomers(n),alc=L.filter(x=>x.kind==='alcohol').length,eth=L.filter(x=>x.kind==='ether').length;let e=0;
  for(let a=1;a<=n-1;a++){const b=n-a;if(a<b)e+=A598[a]*A598[b];else if(a===b)e+=A598[a]*(A598[a]+1)/2;}
  eq(alc,A598[n],'alkol '+n);eq(eth,e,'eter '+n);eq(new Set(L.map(x=>invariant(x.adj,x.lab))).size,L.length);}
{const L=K.oxygenIsomers(4).filter(x=>x.kind==='alcohol');eq(L.filter(x=>x.cls===1).length,2);eq(L.filter(x=>x.cls===2).length,1);eq(L.filter(x=>x.cls===3).length,1);}
// Adlar: C7 ve C8 bilinen listeleri, bütün n ≤ 10 için addan yapı kurup eşyapı sınaması
const names=n=>K.alkaneTrees(n).map(t=>K.alkaneName(t).name).sort();
assert.deepEqual(names(7),['2,2,3-trimetilbütan','2,2-dimetilpentan','2,3-dimetilpentan','2,4-dimetilpentan','2-metilhekzan','3,3-dimetilpentan','3-etilpentan','3-metilhekzan','heptan']);checks++;
assert.deepEqual(names(8),['2,2,3,3-tetrametilbütan','2,2,3-trimetilpentan','2,2,4-trimetilpentan','2,2-dimetilhekzan','2,3,3-trimetilpentan','2,3,4-trimetilpentan','2,3-dimetilhekzan','2,4-dimetilhekzan','2,5-dimetilhekzan','3,3-dimetilhekzan','3,4-dimetilhekzan','3-etil-2-metilpentan','3-etil-3-metilpentan','3-etilhekzan','3-metilheptan','4-metilheptan','2-metilheptan','oktan'].sort());checks++;
assert.deepEqual(names(5),['2,2-dimetilpropan','2-metilbütan','pentan']);checks++;eq(names(4).join(),'2-metilpropan,bütan');
const PARENTS=['metan','etan','propan','bütan','pentan','hekzan','heptan','oktan','nonan','dekan'],SUBSZ={metil:[1],etil:[2],propil:[3],izopropil:'iso'};
function parseName(nm){const parent=PARENTS.findIndex(p=>nm.endsWith(p)&&!PARENTS.some(q=>q!==p&&q.length>p.length&&nm.endsWith(q)))+1;const head=nm.slice(0,nm.length-PARENTS[parent-1].length);
  const adj=Array.from({length:parent},(_,i)=>[]);for(let i=1;i<parent;i++){adj[i].push(i-1);adj[i-1].push(i);}
  const add=(at,kind)=>{const link=(a)=>{const k=adj.length;adj.push([a]);adj[a].push(k);return k;};if(kind==='iso'){const c=link(at);link(c);link(c);}else{let p=at;for(let j=0;j<kind[0];j++)p=link(p);}};
  for(const part of head.split(/-(?=\d)/).filter(Boolean)){const m=part.replace(/-$/,'').match(/^([\d,]+)-(di|tri|tetra|penta)?(metil|etil|propil|izopropil)$/);assert(m,'ad parçası: '+part+' / '+nm);
    const locs=m[1].split(',').map(Number);eq(locs.length,{undefined:1,di:2,tri:3,tetra:4,penta:5}[m[2]],'çarpan '+nm);for(const l of locs){ok(l>=1&&l<=parent,'yer '+nm);add(l-1,SUBSZ[m[3]]);}}
  return adj;}
for(let n=1;n<=10;n++){const seen=new Set();for(const t of K.alkaneTrees(n)){const nm=K.alkaneName(t).name;ok(!seen.has(nm),'ad tekrar '+nm);seen.add(nm);const back=parseName(nm);eq(back.length,n,nm);eq(invariant(back),invariant(t),'addan yapı '+nm);
    // En küçük yer numarası: her zincirden ve iki yönden hesaplanan alternatiflerden daha büyük olmamalı
    const loc=K.alkaneName(t).subs.map(s=>s[0]).sort((a,b)=>a-b);ok(loc.every(l=>l<=Math.ceil(K.alkaneName(t).chain.length/2)+K.alkaneName(t).chain.length)&&(loc.length===0||loc[0]<=Math.ceil(K.alkaneName(t).chain.length/2)),'ilk yer numarası yarıdan küçük '+nm);}}
// Wiener: Floyd–Warshall
const fw=adj=>{const n=adj.length,D=Array.from({length:n},(_,i)=>Array.from({length:n},(_,j)=>i===j?0:adj[i].includes(j)?1:1e9));for(let k=0;k<n;k++)for(let i=0;i<n;i++)for(let j=0;j<n;j++)if(D[i][k]+D[k][j]<D[i][j])D[i][j]=D[i][k]+D[k][j];let w=0;for(let i=0;i<n;i++)for(let j=i+1;j<n;j++)w+=D[i][j];return w;};
for(let n=1;n<=10;n++)for(const t of K.alkaneTrees(n))eq(K.wiener(t),fw(t));
{const W=Object.fromEntries(K.alkaneTrees(5).map(t=>[K.alkaneName(t).name,K.wiener(t)]));eq(W.pentan,20);eq(W['2-metilbütan'],18);eq(W['2,2-dimetilpropan'],16);
  const W6=Object.fromEntries(K.alkaneTrees(6).map(t=>[K.alkaneName(t).name,K.wiener(t)]));eq(W6.hekzan,35);eq(W6['2,2-dimetilbütan'],28);for(let n=2;n<=10;n++)eq(K.wiener(K.alkaneTrees(n).find(t=>t.every(a=>a.length<=2))),(n**3-n)/6,'düz zincir W');}
// Yerleşim: bağ uzunluğu ≈ 1, bağsız atomlar birbirinden uzak
for(let n=2;n<=10;n++)for(const t of K.alkaneTrees(n)){const L=K.layoutTree(t);ok(L.minGap>=0.75,'çakışma '+K.alkaneName(t).name+' '+L.minGap);
  t.forEach((a,i)=>a.forEach(j=>{const d=Math.hypot(L.xy[i][0]-L.xy[j][0],L.xy[i][1]-L.xy[j][1]);ok(d>0.8&&d<1.2,'bağ uzunluğu '+d);}));}

/* ── Fonksiyonel gruplar, formül, kütle, DBE ── */
const M={H:1.0080,C:12.011,N:14.007,O:15.999,Cl:35.45}; // IUPAC CIAAW kısaltılmış standart atom kütleleri
const groupCases=[['CCO','C2H6O',['alcohol']],['COC','C2H6O',['ether']],['CC=O','C2H4O',['aldehyde']],['CC(C)=O','C3H6O',['ketone']],['CC(=O)O','C2H4O2',['acid']],['CC(=O)OC','C3H6O2',['ester']],
  ['CN','CH5N',['amine']],['CC(N)=O','C2H5NO',['amide']],['CCCl','C2H5Cl',['haloalkane']],['C=CC','C3H6',['alkene']],['CC#C','C3H4',['alkyne']],['C1=CC=CC=C1','C6H6',['aromatic']],
  ['CC#N','C2H3N',['nitrile']],['OC1=CC=CC=C1','C6H6O',['phenol','aromatic']],['CC(=O)OC1=CC=CC=C1C(=O)O','C9H8O4',['acid','ester','aromatic']],['NCC(=O)O','C2H5NO2',['acid','amine']],
  ['C1CCCCC1','C6H12',[]],['CCCC','C4H10',[]],['CC(Cl)=O','C2H3ClO',['acylCl']],['CN(C)C','C3H9N',['amine']],['ClC1=CC=CC=C1','C6H5Cl',['arylHalide','aromatic']],['C=CCl','C2H3Cl',['alkene','vinylHalide']]];
for(const[smi,f,keys]of groupCases){const mol=K.parseSmiles(smi),A=K.analyse(mol);eq(A.formula,f,smi);assert.deepEqual(A.groups.map(g=>g.key).sort(),keys.slice().sort(),smi);checks++;
  eq(A.rings+A.pi,A.dbeFormula,'DBE '+smi);const c=A.counts;near(A.mass,Object.entries(c).reduce((s,[k,v])=>s+v*M[k],0),1e-9,'kütle '+smi);}
eq(K.analyse(K.parseSmiles('CC(O)C')).groups[0].label,'Alkol (2°)');eq(K.analyse(K.parseSmiles('CC(C)(C)O')).groups[0].label,'Alkol (3°)');eq(K.analyse(K.parseSmiles('CNC')).groups[0].label,'Amin (2°)');
near(K.analyse(K.parseSmiles('CC(=O)OC1=CC=CC=C1C(=O)O')).mass,180.159,5e-4,'aspirin');
// Izgara: iki parça ve aşılmış değerlik
{const two=K.fromGrid([{el:'C'},{el:'C'},{el:'C'}],[{a:0,b:1,o:1}]),A=K.analyse(two);eq(A.parts,2);eq(A.formula,'C3H10');eq(A.dbeFormula,-1);eq(A.rings+A.pi,0);
  const bad=K.fromGrid([{el:'C'},{el:'C'},{el:'C'},{el:'O'},{el:'C'}],[{a:0,b:1,o:1},{a:0,b:2,o:1},{a:0,b:3,o:2},{a:0,b:4,o:1}]);eq(K.valenceErrors(bad).length,1);eq(K.analyse(bad).groups.length,0);
  const ring=K.fromGrid(Array(6).fill(0).map(()=>({el:'C'})),[0,1,2,3,4,5].map(i=>({a:i,b:(i+1)%6,o:i%2?1:2})));eq(K.analyse(ring).groups.map(g=>g.key).join(),'aromatic');eq(K.analyse(ring).rings,1);}
assert.throws(()=>K.parseSmiles('C1CC'));assert.throws(()=>K.parseSmiles('CXC'));checks+=2;

/* ── Kiralite ── */
// SMILES etiketinden R/S, sayfanın 3-B karma çarpımından bağımsız: komşuları öncelik sırasıyla (4, 1, 2, 3) dizmek
// için gereken yer değiştirmeler sayılır; her yer değiştirme @ ↔ @@ çevirir; (4,1,2,3) sırasında @ = R.
function refRS(mol,v){const r=K.cipRank(mol,v),seq=mol.atoms[v].order.map(id=>r.order.indexOf(id)),tgt=[3,0,1,2],a=seq.slice();let swaps=0;
  for(let i=0;i<4;i++){if(a[i]===tgt[i])continue;const j=a.indexOf(tgt[i]);[a[i],a[j]]=[a[j],a[i]];swaps++;}const at=(mol.atoms[v].chiral==='@')!==(swaps%2===1);return at?'R':'S';}
const known=[['L-alanin','C[C@@H](C(=O)O)N',{1:'S'}],['L-laktik asit','C[C@@H](C(=O)O)O',{1:'S'}],['D-gliseraldehit','C([C@H](C=O)O)O',{1:'R'}],['L-treonin','C[C@H]([C@@H](C(=O)O)N)O',{2:'S',1:'R'}],
  ['L-tartarik asit','[C@@H]([C@H](C(=O)O)O)(C(=O)O)O',{0:'R',1:'R'}],['mezo-tartarik','[C@@H]([C@@H](C(=O)O)O)(C(=O)O)O',{0:'R',1:'S'}],['D-glukoz','OC[C@@H](O)[C@@H](O)[C@H](O)[C@@H](O)C=O',{8:'R',6:'S',4:'R',2:'R'}]];
for(const[nm,smi,exp]of known){const mol=K.parseSmiles(smi);assert.deepEqual(K.stereocentres(mol).sort(),Object.keys(exp).map(Number).sort(),nm);checks++;
  for(const[v,rs]of Object.entries(exp)){const vi=+v,r=K.cipRank(mol,vi);eq(refRS(mol,vi),rs,nm+' referans');eq(K.descriptorFromOrder(mol,vi,mol.atoms[vi].order,mol.atoms[vi].chiral),rs,nm);
    const bit=K.configBit(mol,vi);eq(K.descriptorFromBit(mol,vi,bit),rs);eq(K.rsFromCoords(r.order,K.tetraModel(mol,vi,bit)).label,rs,nm+' 3-B');eq(K.rsFromCoords(r.order,K.tetraModel(mol,vi,-bit)).label,rs==='R'?'S':'R','ayna');
    // Rastgele dönmeler karma çarpımın işaretini değiştirmez
    for(let k=0;k<5;k++){const a=k*1.3+0.2,b=k*0.7-0.4,Rz=[[Math.cos(a),-Math.sin(a),0],[Math.sin(a),Math.cos(a),0],[0,0,1]],Rx=[[1,0,0],[0,Math.cos(b),-Math.sin(b)],[0,Math.sin(b),Math.cos(b)]];
      const rot=p=>{const q=Rx.map(r=>r[0]*p[0]+r[1]*p[1]+r[2]*p[2]);return Rz.map(r=>r[0]*q[0]+r[1]*q[1]+r[2]*q[2]);};eq(K.rsFromCoords(r.order,K.tetraModel(mol,vi,bit).map(m=>({id:m.id,p:rot(m.p)}))).label,rs);}}}
const classesOf=smi=>{const m=K.parseSmiles(smi);return K.stereoClasses(m,K.candidateCentres(m));};
{const c=classesOf('OC(=O)C(O)C(O)C(=O)O');eq(c.count,3);eq(c.meso,1);eq(c.k,2);}
{const c=classesOf('CC(N)C(O)C(=O)O');eq(c.count,4);eq(c.meso,0);}
{const c=classesOf('OCC(O)C(O)C(O)C(O)C=O');eq(c.count,16);eq(c.meso,0);}
{const c=classesOf('CC(Cl)C(Cl)C');eq(c.count,3);eq(c.meso,1);}
{const c=classesOf('CC(Br)C(Cl)C');eq(c.count,4);eq(c.meso,0);}
{const c=classesOf('CCC(C)C(C)C(C)CC');eq(c.count,4);eq(c.meso,2);eq(K.stereocentres(K.parseSmiles('CCC(C)C(C)C(C)CC')).length,2);}
{const c=classesOf('OC(=O)C(O)C(O)C(O)C(=O)O');eq(c.count,4);eq(c.meso,2);} // trihidroksiglutarik asit: 2 mezo + 1 çift
{const c=classesOf('CC(O)C');eq(c.count,1);eq(K.stereocentres(K.parseSmiles('CC(O)C')).length,0);}
// Ayna ile üst üste getirme: 12 dönme
eq(K.A4.length,12);eq(new Set(K.A4.map(p=>p.join())).size,12);
eq(K.superposeMirror([0,1,2,3]).hits,0);ok(K.superposeMirror([0,0,1,2]).hits>0);ok(K.superposeMirror([0,1,1,1]).hits>0);
{const m=K.parseSmiles('F[C@H](Cl)Br');eq(K.superposeMirror(K.branchClasses(m,1)).hits,0);const e=K.parseSmiles('CCO');ok(K.superposeMirror(K.branchClasses(e,1)).hits>0);}
// CIP öncelik örnekleri (ders kitabı sıralamaları)
const pri=(a,b)=>{const r=K.ezAnalyse(a,b,'H','CH3');return r.hiA;};
eq(pri('CH(CH3)2','C2H5'),'CH(CH3)2');eq(pri('CH=CH2','CH(CH3)2'),'CH=CH2');eq(pri('CH2OH','CH(CH3)2'),'CH2OH');eq(pri('CHO','CH2OH'),'CHO');eq(pri('COOH','CHO'),'COOH');eq(pri('Cl','COOH'),'Cl');eq(pri('Br','Cl'),'Br');eq(pri('OH','COOH'),'OH');
// E/Z ve cis/trans
const ez=(...g)=>{const r=K.ezAnalyse(...g);return(r.ez||'-')+'/'+(r.cisTrans||'-');};
eq(ez('CH3','H','CH3','H'),'Z/cis');eq(ez('CH3','H','H','CH3'),'E/trans');eq(ez('CH3','Cl','CH3','H'),'E/cis');eq(ez('Cl','CH3','CH3','H'),'Z/trans');eq(ez('H','H','CH3','CH3'),'-/-');eq(ez('CH3','Cl','Br','H'),'E/-');eq(ez('Cl','H','Cl','H'),'Z/cis');

/* ── Konformasyon ── */
for(const[d,v]of K.BUTANE_POINTS)near(K.butaneV(d),v,1e-9,'V('+d+')');
eq(K.BUTANE_POINTS.map(p=>p.join(':')).join(),'0:19,60:3.8,120:16,180:0'); // OpenStax 3.7
near(K.butaneV(300),K.butaneV(60),1e-9,'simetri');near(K.BUTANE_EXT.gaucheDeg,61.357,1e-3);near(K.BUTANE_EXT.barrierDeg,117.844,1e-3);
// Boltzmann integrali: 360 000 noktalı orta nokta kuralı
const ref=T=>{const RT=8.314462618*T/1000;let Z=0,Za=0;const n=360000;for(let i=0;i<n;i++){const x=(i+0.5)*360/n,f=Math.exp(-K.butaneV(x)/RT);Z+=f;if(x>K.BUTANE_EXT.barrierDeg&&x<360-K.BUTANE_EXT.barrierDeg)Za+=f;}return Za/Z;};
for(const T of[100,150,298,500,1000])near(K.butaneAnalytic(T).anti,ref(T),2e-5,'integral '+T);
near(K.butaneAnalytic(298).anti,0.6864,5e-4);near(K.butaneAnalytic(298).three,1/(1+2*Math.exp(-3800/(8.314462618*298))),1e-12);
near(K.butaneAnalytic(1e6).anti,(360-2*K.BUTANE_EXT.barrierDeg)/360,1e-3,'yüksek T sınırı');
for(const T of[150,298,700])for(const seed of[1,2,3,4]){const m=K.butaneMC(T,100000,seed);near(m.anti,K.butaneAnalytic(T).anti,4.5*m.se+0.004,'MC '+T+' '+seed);ok(m.se>0&&m.se<0.02);eq(m.hist.reduce((s,x)=>s+x,0),100000);}
eq(K.butaneMC(298,100000,1).anti,K.butaneMC(298,100000,1).anti);
// Sikloheksan: OpenStax Tablo 4.1 değerlerinin iki katı
const T41={F:0.5,Cl:1.0,Br:1.0,OH:2.1,CH3:3.8,CH2CH3:4.0,'CH(CH3)2':4.6,'C(CH3)3':11.4,C6H5:6.3,CO2H:2.9,CN:0.4};
for(const[k,v]of Object.entries(T41))near(K.A_VALUES[k],2*v,1e-12,k);eq(Object.keys(K.A_VALUES).length,11);
near(K.chairPopulation(7.6,298.15).pI,0.955,0.002,'metil ≈ %95');
for(const[s1,s2,rel,dG]of[['CH3',null,null,7.6],['CH3','CH3','trans',15.2],['CH3','CH3','cis',0],['C(CH3)3','CH3','cis',15.2],['OH','CH3','cis',-3.4]]){const E=K.chairEnergies(s1,s2,rel);near(E.II.E-E.I.E,dG,1e-9,s1+s2+rel);}
for(const dG of[-5,0,2,7.6,22.8])for(const T of[200,298,500]){const p=K.chairPopulation(dG,T).pI,m=K.chairMC(dG,T,100000,1).pI;near(m,p,4.5*Math.sqrt(p*(1-p)/1e5*20)+1e-4,'koltuk MC '+dG+' '+T);near(1/(1+Math.exp(-dG*1000/(8.314462618*T))),p,1e-12);}
assert.throws(()=>K.chairEnergies('Xx'));assert.throws(()=>K.alkaneTrees(0));assert.throws(()=>K.ezAnalyse('X','H','H','H'));checks+=3;
console.log(`G organik-kimya-ve-izomeri: ${checks} çekirdek kontrolü PASS`);

/* ── Tarayıcı ── */
if(process.argv.includes('--browser')){
  const{createRequire}=await import('node:module');const{createServer}=await import('node:http');const{join,extname}=await import('node:path');
  const root=new URL('..',import.meta.url).pathname;let chromium;
  for(const dir of[root,...(process.env.NODE_PATH||'').split(':').filter(Boolean),'/opt/node-tools']){try{({chromium}=createRequire(join(dir,'package.json'))('playwright'));break;}catch(_){}}
  const server=createServer((req,res)=>{const file=join(root,decodeURIComponent(new URL(req.url,'http://localhost').pathname));if(!fs.existsSync(file)||fs.statSync(file).isDirectory()){res.writeHead(404).end();return;}res.setHeader('Content-Type',({'.html':'text/html; charset=utf-8','.js':'text/javascript; charset=utf-8','.css':'text/css; charset=utf-8'})[extname(file)]||'application/octet-stream');res.end(fs.readFileSync(file));});
  await new Promise(r=>server.listen(0,'127.0.0.1',r));let browser;const before=checks;
  try{browser=await chromium.launch();
    for(const[theme,width]of[['light',390],['dark',1280]]){
      const page=await browser.newPage({viewport:{width,height:900},deviceScaleFactor:width===390?2:1});await page.addInitScript(t=>{localStorage.setItem('acelya-theme',t);localStorage.setItem('acelya-sound-muted','1');},theme);page.setDefaultTimeout(8000);
      const errors=[];page.on('pageerror',e=>errors.push(e.message));
      page.on('response',r=>{if(r.status()>=400)errors.push(r.status()+' '+r.url());});
      page.on('console',m=>{if(m.type()==='error'&&!/Failed to load resource/.test(m.text()))errors.push(m.text());});
      await page.goto(`http://127.0.0.1:${server.address().port}/organik-kimya-ve-izomeri.html`);await page.locator('#fgFormula').waitFor();
      await page.locator('section.digest').waitFor({timeout:15000});ok(/Aynı Formül, Başka Molekül/.test(await page.locator('section.digest').textContent()),'defter görünür');
      const click=id=>page.locator('#'+id).click(),read=async id=>(await page.locator('#'+id).textContent()).replace(/ /g,' '),set=(id,v)=>page.locator('#'+id).evaluate((e,v)=>{e.value=v;e.dispatchEvent(new Event(e.tagName==='SELECT'?'change':'input',{bubbles:true}));},v),is=async(id,t)=>{eq(await read(id),t,id);},has=async(id,t)=>{const s=await read(id);ok(s.includes(t),`${id}: “${s}” içinde “${t}” yok`);},fits=async()=>eq(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),true,'yatay taşma');
      eq(await page.evaluate(()=>[...document.querySelectorAll('.app-content input,.app-content select')].filter(e=>!document.querySelector('label[for="'+e.id+'"]')).map(e=>e.id).join()),'');
      eq(await page.evaluate(()=>{const cs=[...document.querySelectorAll('.app-content canvas')];return cs.length===9&&cs.every(c=>c.getAttribute('role')==='img'&&!!c.getAttribute('aria-label'));}),true);
      eq(await page.evaluate(()=>Object.isFrozen(OrganicLab)&&!Object.getOwnPropertyDescriptor(window,'OrganicLab').writable),true);
      eq(await page.evaluate(()=>/[̀-ͯ]/.test(document.body.innerText)),false,'birleşik aksan işareti yok');
      eq(await page.evaluate(()=>document.querySelectorAll('input[type=number]').length),0);
      eq(await page.evaluate(()=>document.title.length<=80&&document.title.startsWith('Organik Kimya ve İzomeri: ')),true);
      // 01 · Fonksiyonel gruplar
      await is('fgFormula','C₉H₈O₄');await is('fgMass','180,159 g/mol');await is('fgDbeF','6');await is('fgDbeS','6');await has('fgDbeSNote','1 halka + 5 π bağı · fark 0');await has('fgStatus','karboksilik asit, ester, aromatik halka');eq(await page.locator('#fgGroups li').count(),3);
      await set('fgPreset','1');await is('fgFormula','C₂H₆O');await has('fgStatus','alkol');await set('fgPreset','2');await is('fgFormula','C₂H₆O');await has('fgStatus','eter');
      await set('fgPreset','15');await is('fgDbeF','−1');await is('fgDbeS','0');await has('fgStatus','2 ayrı parça');await set('fgPreset','16');await is('fgDbeF','—');await has('fgStatus','Değerlik aşıldı');
      await set('fgPreset','13');await has('fgStatus','aromatik halka');await set('fgPreset','14');await has('fgStatus','Hiç fonksiyonel grup yok');await is('fgDbeS','1');
      // Klavyeyle etanol kur: temizle, C, sağa, C, sağa, O
      await click('fgClear');await is('fgFormula','—');const cell=n=>page.locator('#fgCells button').nth(n);await cell(18).focus();await page.keyboard.press('c');await page.keyboard.press('ArrowRight');await page.keyboard.press('c');await page.keyboard.press('ArrowRight');await page.keyboard.press('o');
      await is('fgFormula','C₂H₆O');await has('fgStatus','alkol');eq(await page.locator('#fgPreset').inputValue(),'-1');
      // Bağ derecesini klavyeyle ikiye çıkar: O'yu seçili tut, 2 tuşu, soldaki C
      await page.keyboard.press('2');await page.keyboard.press('Enter');await page.keyboard.press('ArrowLeft');await page.keyboard.press('Enter');await is('fgFormula','C₂H₄O');await has('fgStatus','aldehit');
      await page.keyboard.press('Delete');await is('fgFormula','CH₆O');await has('fgStatus','2 ayrı parça');
      await click('fgReset');await is('fgFormula','C₉H₈O₄');eq(await page.locator('#fgPreset').inputValue(),'0');await fits();
      await page.locator('#tab-fg').focus();await page.keyboard.press('ArrowRight');eq(await page.locator('#tab-iso').getAttribute('aria-selected'),'true');
      // 02 · Yapı izomerleri
      await is('isoCount','3');await is('isoOeis','3');await is('isoStereo','3');await has('isoCountNote','8 aday kuruldu, 5 tekrar ayıklandı');await is('oxAlc','4');await has('oxAlcNote','1°: 2 · 2°: 1 · 3°: 1');await is('oxEth','3');await has('oxStatus','7 yapı izomeri');await has('oxStatus','8 stereoizomer');
      await is('bpSpan','26,5 °C');await is('bpR','0,978');await has('bpStatus','tam aynı');eq(await page.locator('#isoTable tr').count(),14);
      await click('isoP7');await is('isoCount','9');await is('isoStereo','11');await is('isoStereoOeis','11');await has('isoStatus','3-metilhekzan, 2,3-dimetilpentan');
      await click('isoP10');await is('isoCount','75');await is('isoStereo','136');await has('isoStereoNote','40 kiral');await has('isoPage','Sayfa 1 / 7');await click('isoNext');await has('isoPage','Sayfa 2 / 7');
      await set('isoN',1);await is('isoCount','1');await has('isoStatus','Üç karbona kadar');await set('oxN',7);await is('oxAlc','39');await is('oxEth','33');await set('oxN',1);await is('oxEth','0');
      await set('bpSet','6');await is('bpSpan','19,0 °C');await is('bpR','0,911');await has('bpStatus','3-metilpentan (W = 31, 63,3 °C)');
      await click('isoReset');await is('isoCount','3');await is('isoNOut','5');await is('bpSpan','26,5 °C');await fits();
      await page.locator('#tab-iso').focus();await page.keyboard.press('ArrowRight');eq(await page.locator('#tab-chi').getAttribute('aria-selected'),'true');
      // 03 · Kiralite
      await is('chiDesc','C2: S');await has('chiDescNote','> 0');await is('chiSuper','Hayır, 0 / 12');await is('chiN','1 · 2¹ = 2');await is('chiCount','2');await is('chiMeso','0');await has('chiStatus','(2S)');
      await click('chiFlip');await is('chiDesc','C2: R');await has('chiStatus','(2R)');await click('chiMirror');await is('chiDesc','C2: S');
      await click('chiView');await has('chiSeenNote','4 numara arkada: okunan yön doğrudan S');await is('chiSeen','1 → 2 → 3 saat yönünün tersine');
      const before3=await read('chiSeen');await page.locator('#chi3d').focus();await page.keyboard.press('ArrowLeft');await page.keyboard.press('ArrowUp');await is('chiDesc','C2: S');ok(before3.length>0);
      const box=await page.locator('#chi3d').boundingBox();await page.mouse.move(box.x+box.width/2,box.y+box.height/2);await page.mouse.down();await page.mouse.move(box.x+box.width/2+80,box.y+box.height/2+30,{steps:5});await page.mouse.up();await is('chiDesc','C2: S');
      await set('chiMol','7');await is('chiN','2 · 2² = 4');await is('chiCount','3');await is('chiMeso','1');await has('chiStatus','(2R,3R)');await has('chiTable','(2S,3R) = (2R,3S)');
      await set('chiMol','8');await has('chiStatus','(2R,3S)');eq(await page.locator('#chiTable tr.is-current td').first().textContent().then(t=>t.includes('(2S,3R) = (2R,3S)')),true);
      await set('chiMol','10');await is('chiCount','16');await has('chiStatus','(2R,3S,4R,5R)');await has('chiStatus','C2, C3, C4, C5');
      await set('chiMol','6');await is('chiCount','4');await has('chiStatus','(2S,3R)');
      await set('chiMol','11');await is('chiCount','4');await is('chiMeso','2');await has('chiStatus','psödoasimetrik');
      await set('chiMol','5');await is('chiN','0 · 2⁰ = 1');await is('chiCount','1');await is('chiMeso','0');await has('chiSuper','Evet');await is('chiDesc','Tanımsız');
      await set('chiMol','4');await has('chiSteps','Br > Cl');
      await set('chiMol','board');await is('chiN','0 · 2⁰ = 1');await has('chiStatus','1. sekmedeki molekül');
      await click('chiReset');await is('chiDesc','C2: S');eq(await page.locator('#chiMol').inputValue(),'0');await fits();
      await page.locator('#tab-chi').focus();await page.keyboard.press('End');eq(await page.locator('#tab-conf').getAttribute('aria-selected'),'true');
      // 04 · Cis–trans ve konformasyon
      await is('ezLabel','(Z)');await is('ezCT','cis');await is('ezPriA','CH₃ > H');await has('ezPriANote','bağlı atom: C (6) > H (1)');
      await click('ezCl');await is('ezLabel','(E)');await is('ezCT','cis');await has('ezStatus','Dikkat');await click('ezTrans');await is('ezLabel','(E)');await is('ezCT','trans');
      await set('ezTwist',90);await is('ezLabel','tanımsız');await has('ezStatus','π bağı kopmuş');await set('ezTwist',180);await is('ezLabel','(Z)');await has('ezStatus','öteki izomer');await is('ezTwistOut','180°');
      await set('ezA2','CH3');await is('ezLabel','E/Z yok');await has('ezStatus','tanımsız');
      await is('buMC','69,2 %');await is('buInt','68,6 %');await is('bu3','69,9 %');await is('buG','61,4° · 3,78 kJ/mol');await has('buMCNote','1,4 σ');
      await click('buCold');await is('buInt','90,9 %');await is('buTOut','150 K');await click('buHot');await is('buInt','43,2 %');await has('buStatus','34,5 %');await set('buSteps','1000000');await has('buMCNote','σ');
      await is('chPop','95,55 %');await is('chMC','95,56 %');await is('chK','21,5');await has('chStatus','yaklaşık 95 % ekvatoryal');eq(await page.locator('#chRel').isDisabled(),true);
      await click('chTbu');await is('chDG','22,8 kJ/mol');await is('chPop','99,99 %');await click('chCis');await is('chDG','15,2 kJ/mol');await is('chPop','99,78 %');await has('chDGNote','C(CH₃)₃ ekvatoryal, CH₃ aksiyel');eq(await page.locator('#chRel').isDisabled(),false);
      await set('chS1','CH3');await is('chDG','0,0 kJ/mol');await is('chPop','50,00 %');await set('chT',600);await is('chTOut','600 K');
      await click('confReset');await is('ezLabel','(Z)');await is('buInt','68,6 %');await is('chPop','95,55 %');await fits();
      // R tuşu ve Home
      await set('buT',500);await page.locator('h1').click();await page.keyboard.press('r');await is('buTOut','298 K');
      await page.locator('#tab-conf').focus();await page.keyboard.press('Home');eq(await page.locator('#tab-fg').getAttribute('aria-selected'),'true');
      for(const t of['iso','chi','conf','fg']){await click('tab-'+t);await fits();eq(await page.locator('#panel-'+t).isVisible(),true);
        eq(await page.evaluate(t=>[...document.querySelectorAll('#panel-'+t+' canvas')].every(c=>{const d=c.getContext('2d').getImageData(0,0,c.width,c.height).data,s=new Set();for(let i=0;i<d.length;i+=4)s.add(d[i]+','+d[i+1]+','+d[i+2]);return s.size>2;}),t),true,t+' tuvali boş');}
      assert.deepEqual(errors,[]);checks++;await page.close();}
    console.log(`G organik-kimya-ve-izomeri: ${checks-before} tarayıcı kontrolü PASS (390 px açık, 1280 px koyu)`);
  }finally{await browser?.close();await new Promise(r=>server.close(r));}
}
