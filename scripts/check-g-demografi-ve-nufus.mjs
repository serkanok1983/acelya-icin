// Demografi ve nüfus: çekirdeğin bağımsız denetimi.
// Başvurular: BM WPP 2024'ün yayımladığı göstergeler (TDH, kaba doğum hızı, e₀, bebek ölüm hızı, bağımlılık oranları),
// kaynak dosyalarından elle aktarılmış nokta değerleri, testin kendi yaşam tablosu ve açık Leslie matrisi, kuvvet
// yinelemesiyle baskın özdeğer, kapalı biçimler (sıfır ölümlülük, sabit risk) ve kaba kuvvet sayımları.
import fs from 'node:fs';
import vm from 'node:vm';
import assert from 'node:assert/strict';
const SLUG='demografi-ve-nufus';
const html=fs.readFileSync(new URL(`../${SLUG}.html`,import.meta.url),'utf8');
const source=html.split('/* KERNEL-BEGIN */')[1]?.split('/* KERNEL-END */')[0];
assert(source,'Çekirdek sınırları gerekli');
const context={window:{}};vm.createContext(context);vm.runInContext(source,context);
const K=context.window.Demografi;let checks=0;
const eq=(a,b,m)=>{const x=JSON.stringify(a),y=JSON.stringify(b);assert(x===y,(m?m+': ':'')+x+' ≠ '+y);checks++;},ok=(c,m)=>{assert(c,m);checks++;};
const near=(a,b,tol,m)=>{assert(Math.abs(a-b)<=tol,`${m}: ${a} ≉ ${b} (tol ${tol})`);checks++;};
const rel=(a,b,tol,m)=>{assert(Math.abs(a-b)<=tol*Math.max(1e-300,Math.abs(b)),`${m}: ${a} ≉ ${b} (göreli ${tol})`);checks++;};
const S=a=>a.reduce((s,x)=>s+x,0);
ok(Object.isFrozen(K)&&Object.isFrozen(K.DATA)&&Object.isFrozen(K.DATA.pyr.TUR2023.m),'çekirdek dondurulmuş');

/* 0. Sayı biçimi */
const NB=' ';
for(const[x,d,s]of[[0.5,2,'0,50'],[-1.25,2,'−1,25'],[9950,0,'9950'],[10000,0,'10'+NB+'000'],[87270504,0,'87'+NB+'270'+NB+'504'],[-0.001,2,'0,00']])eq(K.fmt(x,d),s,'fmt '+x);
eq(K.fmtPct(12.345),'%12,3');eq(K.fmtPop(87270504),'87,27 milyon');eq(K.fmtPop(8091734930),'8,092 milyar');eq(K.fmtPop(52000),'52 bin');eq(K.fmtPop(-6.31e6),'−6,31 milyon');
eq(K.parseNum('2,1'),2.1);eq(K.parseNum(' 1.625 '),1.625);ok(Number.isNaN(K.parseNum('iki')));ok(Number.isNaN(K.parseNum('')));

/* 1. Veri: kaynak dosyalarından elle aktarılan nokta değerleri (OWID'in WPP 2024 ve HMD dosyaları) */
const D=K.DATA;eq(K.KEYS.length,24);
eq(D.pyr.TUR2023.m[0],2932953);eq(D.pyr.TUR2023.f[0],2813409);eq(D.pyr.JPN2023.m[0],2122563);eq(D.pyr.NGA2023.f[0],16556885);
eq(S(D.pyr.TUR2023.m)+S(D.pyr.TUR2023.f),87270504,'Türkiye 2023 toplam');eq(S(D.pyr.WLD2023.m)+S(D.pyr.WLD2023.f),8091734930,'Dünya 2023');
for(const[k,f,v]of[['TUR2023','tfr',1.625],['TUR2023','cbr',12.284],['TUR2023','e0',77.156],['TUR1950','tfr',6.468],['KOR2023','tfr',0.72],['JPN2023','cdr',12.257],['NGA2023','e0',54.462],['TUR2023','srb',104.933]])near(D.ind[k][f],v,0.0006,k+' '+f);
const trAt=(c,y)=>{const s=D.tr[c];return{b:s.b[y-s.y0],d:s.d[y-s.y0]};};
eq(trAt('SWE',1773),{b:25.37,d:44.89});eq(trAt('FRA',1816),{b:32.24,d:18.38});eq(trAt('KOR',1950),{b:39.72,d:47.12});eq(trAt('ZWE',2000),{b:36.13,d:16.25});eq(trAt('JPN',2023),{b:6.03,d:12.26});
for(const c of K.TR_KEYS){const s=D.tr[c];eq(s.b.length,s.d.length,c);eq(s.y0+s.b.length-1,2023,c+' son yıl');ok(s.b.every(x=>x>0&&x<70)&&s.d.every(x=>x>0&&x<80),c+' aralık');}
eq(D.tr.SWE.y0,1751);eq(D.tr.FRA.y0,1816);eq(D.tr.TUR.y0,1950);

/* 2. Doğurganlık: BM'nin yayımladığı TDH ve kaba doğum hızı (bağımsız toplam) */
for(const k of K.KEYS){const F=D.asfr[k];const mine=5*S(F)/1000;near(K.tfr(F),mine,1e-12,'tdh '+k);near(mine,D.ind[k].tfr,0.04,'tdh ≈ BM '+k);
  const p=D.pyr[k];let b=0;for(let i=0;i<9;i++)b+=F[i]*p.f[i+2]/1000;near(1000*b/(S(p.m)+S(p.f)),D.ind[k].cbr,0.25,'kdh ≈ BM '+k);
  let w=0,wa=0;for(let i=0;i<9;i++){w+=F[i];wa+=F[i]*(12.5+5*i);}near(K.mac(F),wa/w,1e-12,'ODY '+k);}
near(K.femShare(105),100/205,1e-15);
/* sıfır ölümlülük (açık aralık çok büyük hız): NRR = TDH × kız payı, yenileme TDH = (100 + oran)/100 */
{const lt0=K.lifeTable([0,0,0,0,0,0,0,0,0,0,0,0,1e6]);for(const k of['TUR2023','NGA1950','KOR2023'])near(K.nrr(D.asfr[k],105,lt0),K.tfr(D.asfr[k])*100/205,1e-9,'sıfır ölüm NRR '+k);
  near(K.tfr(D.asfr.TUR2023)/K.nrr(D.asfr.TUR2023,105,lt0),2.05,1e-9,'yenileme 2,05');}
/* yenileme düzeyi ölümlülükle artar */
{const F=D.asfr.TUR2023,r=k=>K.tfr(F)/K.nrr(F,104.9,K.lifeTable(K.mxFrom(k,'f')));ok(r('TUR2023')>2.05&&r('TUR2023')<2.15,'Türkiye 2023 yenileme ≈ 2,1');ok(r('TUR1950')>3,'1950 ölümlülüğünde yenileme > 3');ok(r('NGA1950')>r('TUR1950'),'Nijerya 1950 > Türkiye 1950');}

/* 3. Yaşam tablosu */
/* ölüm hızları: testin kendi hesabıyla ham ölüm / nüfus */
for(const k of K.KEYS)for(const sx of['f','m']){const r=D.lt[k][sx];const M=K.mxFrom(k,sx);for(let i=0;i<12;i++)rel(M[i],r.d[i]/r.pop[i],1e-12,'M '+k+sx+i);rel(M[12],(r.d[12]+r.d[13])/(r.pop[12]+r.pop[13]),1e-12,'M90+ '+k);}
/* BM'nin yayımladığı e₀ (kadın, erkek, iki cinsiyet) ve bebek ölüm hızı */
let worst=0;
for(const k of K.KEYS){for(const[sx,f]of[['f','e0f'],['m','e0m'],['b','e0']]){const e=K.lifeTable(K.mxFrom(k,sx)).e0;worst=Math.max(worst,Math.abs(e-D.ind[k][f]));near(e,D.ind[k][f],0.5,'e₀ ≈ BM '+k+sx);}
  const q0=K.lifeTable(K.mxFrom(k,'b')).rows[0].q;near(q0,D.ind[k].imr/100,0.1*D.ind[k].imr/100+2e-4,'q₀ ≈ BM bebek ölüm hızı '+k);}
ok(worst<0.5,'en büyük e₀ farkı '+worst);
/* tablo özdeşlikleri */
for(const k of['TUR1950','TUR2023','NGA2023','KOR1950']){const lt=K.lifeTable(K.mxFrom(k,'b'),0.15);near(S(lt.rows.map(r=>r.d)),1,1e-12,'Σd = 1');near(lt.rows[0].T,S(lt.rows.map(r=>r.L)),1e-9,'T₀ = ΣL');
  for(let i=0;i<12;i++){near(lt.rows[i+1].l,lt.rows[i].l*(1-lt.rows[i].q),1e-14,'l zinciri');near(K.lAt(lt,lt.rows[i].x),lt.rows[i].l,1e-12,'lAt sınır');}
  rel(K.lInt(lt,0,1000),lt.e0,0.01,'∫l ≈ e₀ '+k);
  const med=K.medianDeathAge(lt);near(K.lAt(lt,med),0.5,1e-9,'ortanca ölüm yaşında l = 0,5 '+k);}
/* sabit risk: açık aralıkta e = 1/c tam; e₀ ≈ 1/c */
for(const c of[0.005,0.01,0.02]){const lt=K.lifeTable(new Array(13).fill(c),0.5,2);rel(lt.rows[12].e,1/c,1e-12,'e₉₀ = 1/c');rel(lt.e0,1/c,0.004,'e₀ ≈ 1/c '+c);}
/* bebek ölümünü sıfırlamak e₀'ı yükseltir; Türkiye 1950'de 1 yaşındakinin beklenen ölüm yaşı e₀'dan büyük */
{const M=K.mxFrom('TUR1950','b');const a=K.lifeTable(M).e0,b=K.lifeTable(M.map((m,i)=>i<2?0:m)).e0;ok(b-a>15,'1950 çocuk ölümü etkisi '+(b-a));const lt=K.lifeTable(M);ok(1+lt.rows[1].e>lt.e0+9,'1 + e₁ > e₀');}
{const lt=K.lifeTable([0.3,0.3,0.3,0.3,0.3,0.3,0.3,0.3,0.3,0.3,0.3,0.3,0.3]);ok(lt.clipped,'q > 1 kesilir');}
/* a₀ duyarlılığı (sayfadaki cümle): Türkiye 1950'de 0,05 → 0,50 iken e₀ 0,85 yıl düşer, 2023'te 0,01'in altında */
{const d=k=>{const M=K.mxFrom(k,'b');return K.lifeTable(M,0.05).e0-K.lifeTable(M,0.5).e0;};near(d('TUR1950'),0.85,0.01,'a₀ 1950');ok(Math.abs(d('TUR2023'))<0.01,'a₀ 2023');}

/* 4. Piramit göstergeleri */
for(const k of K.KEYS){const p=D.pyr[k],st=K.pyrStats(p.m,p.f);const t=p.m.map((x,i)=>x+p.f[i]);const y=t[0]+t[1]+t[2],o=S(t.slice(13)),w=S(t)-y-o;
  near(st.dep,100*(y+o)/w,1e-9);near(st.dep,D.ind[k].dep,0.2,'bağımlılık ≈ BM '+k);near(st.depY,D.ind[k].depy,0.2,'genç ≈ BM '+k);near(st.depO,D.ind[k].depo,0.2,'yaşlı ≈ BM '+k);
  /* ortanca yaş: tek yaşlara düzgün dağıtıp kaba kuvvetle */
  const single=[];t.forEach(v=>{for(let j=0;j<5;j++)single.push(v/5);});let c=0,half=S(t)/2,med=NaN;for(let a=0;a<single.length;a++){if(c+single[a]>=half){med=a+(half-c)/single[a];break;}c+=single[a];}
  near(st.median,med,1e-9,'ortanca '+k);const off=st.median-D.ind[k].med;ok(off>0.8&&off<1.2,'BM ortanca yaşı ≈ 1 yıl küçük '+k+' '+off);}

/* ortanca yaş farkı gruplamadan gelmez: birikimli nüfusa monoton kübik (PCHIP) eğriyle de BM'den ≈ 1 yıl büyük */
{const pch=t=>{const x=t.map((_,i)=>5*i).concat([105]),C=[0];t.forEach(v=>C.push(C[C.length-1]+v));const n=x.length,dl=[];for(let i=0;i<n-1;i++)dl.push((C[i+1]-C[i])/5);
  const d=new Array(n).fill(0);for(let i=1;i<n-1;i++)if(dl[i-1]*dl[i]>0)d[i]=2/(1/dl[i-1]+1/dl[i]);d[0]=dl[0];d[n-1]=dl[n-2];const half=C[n-1]/2;let i=0;while(C[i+1]<half)i++;
  const f=s=>{const u=(s-x[i])/5;return(2*u**3-3*u**2+1)*C[i]+(u**3-2*u**2+u)*5*d[i]+(-2*u**3+3*u**2)*C[i+1]+(u**3-u**2)*5*d[i+1];};let lo=x[i],hi=x[i+1];for(let k=0;k<60;k++){const m=(lo+hi)/2;f(m)<half?lo=m:hi=m;}return lo;};
  let close=0,maxShift=0;for(const k of K.KEYS){const p=D.pyr[k],t=p.m.map((x,i)=>x+p.f[i]),sm=pch(t),st=K.pyrStats(p.m,p.f);maxShift=Math.max(maxShift,Math.abs(sm-st.median));const off=sm-D.ind[k].med;ok(off>0.8&&off<1.15,'pürüzsüz ortanca − BM '+k+' '+off);if(Math.abs(off-1)<=0.03)close++;}
  eq(close,20,'0,97–1,03 aralığındaki set sayısı');ok(maxShift<0.125&&maxShift>0.115,'en büyük kayma 0,12: '+maxShift);}
/* sayfa metinleri: sıfır ölümde yenileme (100 + oran)/100; Thompson 1929 */
{const txt=html.replace(/<[^>]+>/g,'');ok(txt.includes('yenileme düzeyi tam (100 + oran) / 100, yani kız payının tersi çıkar (oran 105 iken 2,05)'),'sıfır ölüm metni');ok(!/2 × \(100 \+ oran\)/.test(txt),'eski hatalı ifade yok');
  ok(txt.includes("Thompson'ın 1929'da"),'Thompson 1929');ok(!txt.includes('Thompson 1930'),'Thompson 1930 yok');ok(txt.includes("24 setin 20'sinde 0,97 ile 1,03"),'ortanca yaş açıklaması');}

/* 5. Geçiş: aşama kuralı ve kalıcı eşik */
for(const[b,d,s]of[[40,31,1],[40,30,2],[40,25,2],[45,15,2],[32,10,2],[25,8,3],[18,9,3],[17.9,9,4],[10,10,4],[6,12,5],[39.7,47.1,1]])eq(K.stage(b,d),s,`aşama ${b}/${d}`);
for(const c of K.TR_KEYS){const ser=K.trSeries(c);for(const[key,th]of[['d',20],['b',30],['b',18]]){let exp=null;for(let i=0;i<ser.length;i++){if(ser.slice(i).every(r=>r[key]<th)){exp={y:ser[i].y,fromStart:i===0};break;}}eq(K.sustainedBelow(ser,key,th),exp,c+key+th);}}
eq(K.sustainedBelow(K.trSeries('SWE'),'d',20).y,1858);eq(K.sustainedBelow(K.trSeries('SWE'),'b',30).y,1885);eq(K.sustainedBelow(K.trSeries('NGA'),'b',30),null);

/* 6. Projeksiyon: testin kendi beş yaşlık tablosu ve açık Leslie matrisi */
function myL(M,k,a0){const m=i=>M[i]*k;const L=[];const q0=m(0)/(1+(1-a0)*m(0)),l1=1-q0;L[0]=l1+a0*q0+(m(1)>0?l1*(1-Math.exp(-4*m(1)))/m(1):4*l1);let l=l1*Math.exp(-4*m(1));
  const idx=g=>g===1?2:g===2?3:g===3?4:g>=18?12:5+Math.floor((5*g-20)/10);
  for(let g=1;g<20;g++){const r=m(idx(g));L[g]=r>0?l*(1-Math.exp(-5*r))/r:5*l;l*=Math.exp(-5*r);}L[20]=l/m(12);return L;}
for(const k of['TUR2023','NGA2023']){const M=K.mxFrom(k,'f');for(const kk of[1,0.5,2]){const a=K.lt5(M,kk,0.15).L,b=myL(M,kk,0.15);for(let g=0;g<21;g++)rel(a[g],b[g],1e-12,'₅L '+k+g);}}
function leslie(c,T){const B=K.baseOf(c),L=myL(B.Mf,1,0.15),ff=100/(100+B.srb),F=new Array(21).fill(0);for(let j=0;j<9;j++)F[j+2]=T*B.shape[j];
  const A=Array.from({length:21},()=>new Array(21).fill(0));for(let g=0;g<19;g++)A[g+1][g]=L[g+1]/L[g];A[20][19]=L[20]/(L[19]+L[20]);A[20][20]=L[20]/(L[19]+L[20]);
  for(let g=0;g<21;g++){const sNext=g<19?L[g+1]/L[g]:g===19?A[20][19]:A[20][20];const fn=g<20?F[g+1]:F[20];A[0][g]=ff*L[0]/5*5/1000*(F[g]+fn*sNext)/2;}return A;}
const mul=(A,v)=>A.map(r=>S(r.map((a,j)=>a*v[j])));
for(const c of['TUR','NGA','JPN']){const B=K.baseOf(c);const r=K.project({base:c,tfr:B.tfr,e0:B.e0,mig:0,path:'hemen'});const A=leslie(c,B.tfr);let v=B.f.slice();
  for(let i=1;i<=16;i++){v=mul(A,v);const f=r.steps[i].f;for(let g=0;g<21;g++)rel(f[g],v[g],1e-9,`Leslie ${c} adım ${i} grup ${g}`);}
  /* ölüm sayısı: grup grup kayıplar + doğup 0–4'e ulaşamayanlar */
  const Lf=myL(B.Mf,1,0.15),Lm=myL(B.Mm,1,0.15);for(const i of[1,8,16]){const p=r.steps[i-1],q=r.steps[i];let d=0;for(let g=0;g<19;g++){d+=p.f[g]*(1-Lf[g+1]/Lf[g])+p.m[g]*(1-Lm[g+1]/Lm[g]);}
    d+=(p.f[19]+p.f[20])*(1-Lf[20]/(Lf[19]+Lf[20]))+(p.m[19]+p.m[20])*(1-Lm[20]/(Lm[19]+Lm[20]));const bf=q.births*100/(100+B.srb);d+=bf*(1-Lf[0]/5)+(q.births-bf)*(1-Lm[0]/5);rel(q.deaths,d,1e-9,'ölümler '+c+i);
    rel(q.tot,p.tot+q.births-q.deaths+q.mig,1e-12,'denge '+c+i);}}
/* baskın özdeğer: kuvvet yinelemesi ile 300 yıllık sabit hızlı koşu */
function lambda(A){let v=new Array(21).fill(1),l=0;for(let it=0;it<4000;it++){const w=mul(A,v);const s=S(w);l=s/S(v);v=w.map(x=>x/s);}return l;}
for(const[c,T]of[['TUR',1.63],['NGA',4.48],['KOR',0.72]]){const B=K.baseOf(c);const r=K.project({base:c,tfr:T,e0:B.e0,mig:0,path:'hemen',years:2000});const s=r.steps;const lam=lambda(leslie(c,T));rel(s[s.length-1].f.reduce((a,b)=>a+b,0)/s[s.length-2].f.reduce((a,b)=>a+b,0),lam,1e-6,'λ '+c);}
/* yenileme TDH'si: NRR = 1 ⇔ λ = 1 */
for(const c of K.COUNTRIES){const B=K.baseOf(c);const R=K.replacementTfr(B.shape,B.srb,K.lt5(B.Mf,1,0.15).L);near(lambda(leslie(c,R)),1,1e-9,'yenileme λ = 1 '+c);ok(R>2.0&&R<2.7,'yenileme aralığı '+c+' '+R);}
/* ivme: Nijerya > 1, Japonya ve Kore < 1; 300 yılda durağanlaşır */
{const n=K.momentum('NGA'),j=K.momentum('JPN'),k=K.momentum('KOR');ok(n.ratio>1.3,'Nijerya ivmesi '+n.ratio);ok(j.ratio<0.8,'Japonya ivmesi '+j.ratio);ok(k.ratio<0.9,'Kore ivmesi');near(n.last,1,1e-4,'durağan');near(j.last,1,1e-3,'durağan JPN');}
/* hedef e₀ ölçeklemesi ve göç */
for(const[c,e]of[['TUR',85],['NGA',70],['JPN',80]]){const B=K.baseOf(c);const k=K.scaleK(B.Mf,B.Mm,e);near(K.e0avg(B.Mf,B.Mm,k),e,1e-6,'e₀ hedefi '+c);}
{const B=K.baseOf('FRA');const r=K.project({base:'FRA',tfr:B.tfr,e0:B.e0,mig:5,path:'hemen'});rel(r.steps[1].mig,5/1000*r.steps[0].tot*5,1e-12,'göç miktarı');near(S(K.MIG_W),1,1e-12,'göç ağırlıkları');}
{const r=K.project({base:'TUR',tfr:0.5,e0:60,mig:-10,path:'kademeli'});ok(r.steps.every(s=>s.f.every(x=>x>=0)&&s.m.every(x=>x>=0)),'negatif nüfus yok');eq(r.steps.length,17);eq(r.steps[16].year,2103);}
{const a=K.project({base:'TUR',tfr:1.2,e0:80,mig:0,path:'kademeli'}),b=K.project({base:'TUR',tfr:1.2,e0:80,mig:0,path:'hemen'});ok(a.steps[16].tot>b.steps[16].tot,'kademeli düşüş daha yavaş');near(a.steps[5].tfr,1.2,1e-12,'2048\'de hedef');}
/* tohumlu üreteç */
{const r1=K.mulberry32(7),r2=K.mulberry32(7);for(let i=0;i<50;i++)eq(r1(),r2());}

console.log(`G demografi-ve-nufus: ${checks.toLocaleString('tr-TR')} bağımsız veri, doğurganlık, yaşam tablosu, piramit, geçiş ve projeksiyon kontrolü PASS (en büyük e₀ farkı ${worst.toFixed(3)} yıl)`);

if(process.argv.includes('--browser')){
  const {chromium}=await import('playwright');const {createServer}=await import('node:http');const {join,extname}=await import('node:path');const {fileURLToPath}=await import('node:url');const root=fileURLToPath(new URL('../',import.meta.url));
  const server=createServer((req,res)=>{const file=join(root,decodeURIComponent(new URL(req.url,'http://localhost').pathname));if(!fs.existsSync(file)||fs.statSync(file).isDirectory()){res.writeHead(404).end();return;}res.setHeader('Content-Type',({'.html':'text/html; charset=utf-8','.js':'text/javascript; charset=utf-8','.css':'text/css; charset=utf-8'})[extname(file)]||'application/octet-stream');res.end(fs.readFileSync(file));});await new Promise(r=>server.listen(0,'127.0.0.1',r));let browser;
  try{browser=await chromium.launch();const before=checks;
  for(const[width,theme]of[[390,'light'],[1280,'dark']]){
    const page=await browser.newPage({viewport:{width,height:900},deviceScaleFactor:width===390?2:1,hasTouch:width===390});await page.addInitScript(t=>{localStorage.setItem('acelya-theme',t);localStorage.setItem('acelya-sound-muted','1');},theme);page.setDefaultTimeout(8000);
    const errors=[];page.on('pageerror',e=>errors.push(e.message));page.on('console',m=>{if(m.type()==='error')errors.push(m.text());});page.on('response',r=>{if(r.status()>=400)errors.push(r.status()+' '+r.url());});
    await page.goto(`http://127.0.0.1:${server.address().port}/${SLUG}.html`);
    const click=id=>page.locator('#'+id).click(),read=id=>page.locator('#'+id).textContent(),has=async(id,text)=>{const t=await read(id);assert(t.includes(text),`${id}: “${t}” içinde “${text}” yok (${width})`);checks++;},
      range=(id,v)=>page.locator('#'+id).evaluate((e,v)=>{e.value=v;e.dispatchEvent(new Event('input',{bubbles:true}));},v),sel=(id,v)=>page.locator('#'+id).selectOption(v),
      noflow=async tag=>{eq(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),true,'yatay taşma: '+tag+' '+width);eq(await page.evaluate(()=>[...document.querySelectorAll('.dm-table-wrap')].filter(e=>e.offsetParent&&e.scrollWidth>e.clientWidth+1).length),0,'tablo kutusu taşması '+tag+' '+width);};
    eq(await page.evaluate(()=>document.title.length<=80&&document.title.startsWith('Demografi: ')),true);eq(await page.locator('[role=tab]').count(),5);
    await page.waitForSelector('.digest',{timeout:8000});ok(await page.locator('.digest').first().isVisible(),'Keşif Defteri görünür');
    /* 1. sekme */
    await has('fxTfr','1,629');await has('fxUn','1,625 (fark 0,004)');await has('fxSum','325,7');await has('fxMac','29,2');await has('fxGrr','0,795');await has('fxNrr','0,773');await has('fxRepl','2,11');await has('fxStatus','küçülür');
    await has('fxCbr','12,24');await has('fxCbrUn','12,28');await has('fxBirths','1,07 milyon');
    await page.locator('#fxGuess').fill('1,63');await click('fxCheck');await has('fxGuessOut','Doğru');await page.locator('#fxGuess').fill('0,326');await click('fxCheck');await has('fxGuessOut','5 ile çarpmayı');
    await page.locator('#fxGuess').fill('abc');await click('fxCheck');await has('fxGuessOut','Bir sayı yaz');
    await sel('fxMort','TUR1950');await has('fxRepl','3,07');await sel('fxMort','same');await range('fxSrb','120');await has('fxRepl','2,26');
    await sel('fxPyr','JPN2023');await has('fxCbr','8,01');await has('fxCbrStatus','yaş yapısını');
    await sel('fxPreset','NGA2023');await has('fxTfr','4,481');await has('fxRepl','2,60');await has('fxStatus','büyür');
    await range('fx3','0');eq(await page.locator('#fxPreset').inputValue(),'custom');await has('fxUn','düzen değiştirildi');
    for(let i=0;i<9;i++)await range('fx'+i,'0');await has('fxStatus','hiç doğum yok');
    await click('dogReset');await has('fxTfr','1,629');eq(await page.locator('#fxPreset').inputValue(),'TUR2023');await noflow('dog');
    /* 2. sekme */
    await click('tab-yasam');await has('ltE0','77,21');await has('ltE0Un','77,16');await has('ltMed','80,8');await has('ltModal','80–89');await has('ltQ0','9,2');await has('ltQ0Un','9,2');await has('ltStatus','fark 0,05');
    eq(await page.locator('#ltRows tr').count(),13);await has('ltCe0','77,21');
    await sel('ltPreset','TUR1950');await has('ltE0','47,61');await has('ltE1','57,33 (58,33)');await has('ltStatus','e₀\'dan');await range('ltChild','0');await has('ltE0','68,24');await has('ltStatus','Çocuk ölümleri sıfırlandı');
    await range('ltChild','1');await range('ltAdult','2');await has('ltE0','40,51');await range('ltAdult','1');
    await sel('ltSex','f');await has('ltE0Un','50,41');await has('ltQ0Un','yalnız iki cinsiyet');
    await page.locator('#ltM12').fill('0');await has('ltStatus','Geçersiz hız');await has('ltE0','—');eq(await page.locator('#ltPreset').inputValue(),'custom');
    await page.locator('#ltM12').fill('250');await has('ltStatus','Doğumda yaşam beklentisi');
    await page.locator('#ltM5').fill('900');await has('ltStatus','ₙqₓ = 1 alındı');
    await click('yasamReset');await has('ltE0','77,21');await noflow('yasam');
    eq(await page.evaluate(()=>{const c=document.getElementById('cvL');return c.width>0&&c.height>0;}),true);
    /* 3. sekme */
    await click('tab-piramit');await has('pyHA','Türkiye 2023');await has('pyRows','87,27 milyon');await has('pyRows','46,7 [46,7]');await has('pyRows','33,5 [32,5]');await has('pyStatus','Ortanca yaş 1975 yılında 19,1 iken 2023 yılında 33,5');
    await sel('pyB','JPN2023');await has('pyRows','70,1 [69,9]');await has('pyStatus','daralan');await click('pySwap');await has('pyHA','Japonya 2023');await sel('pyScale','abs');
    const q1=await page.locator('#qzOpts').textContent();await page.locator('#qzOpts button').first().click();await has('qzOut','bu ');await has('qzScore','/ 1');eq(await page.locator('#qzOpt1').isDisabled(),true);
    await click('qzNew');await click('piramitReset');eq(await page.locator('#qzOpts').textContent(),q1,'bilmece tohumu');await has('qzScore','Henüz');await has('pyHA','Türkiye 2023');await noflow('piramit');
    /* 4. sekme */
    await click('tab-gecis');await has('trYearOut','1850');await has('trB','32,1');await has('trD','15,2');await has('trStage','2:');await has('trTiming','KÖH < 20: 1858');await has('trTiming','1885');await has('trTiming','27 yıl sonra');
    await range('trYear','1773');await has('trStatus','kriz yılı');await has('trNi','yılda −%1,95');await has('trStage','kriz yılı');eq(/^[1-5]/.test(await read('trStage')),false,'kriz yılında aşama yok');await sel('trCountry','FRA');await has('trTiming','yıl önce');await has('trStatus','birlikte');
    await sel('trCountry','JPN');await has('trYearOut','2023');await has('trStage','5');await has('trTiming','serinin başından');await sel('trCountry','KOR');await range('trYear','1950');await has('trStatus','kriz');await has('trStage','kriz yılı');
    await sel('trCountry','NGA');await has('trTiming','KDH < 30: henüz değil');await click('gecisReset');await has('trYearOut','1850');await noflow('gecis');
    /* 5. sekme */
    await click('tab-proj');await has('pjStart','87,27 milyon');await has('pjEnd','41,74 milyon');await has('pjPeak','2033');await has('pjRepl','2,106');await has('pjMom','1,169');await has('pjStatus','öngörü değil');eq(await page.locator('#pjRows tr').count(),5);
    await click('pjPresetRepl');await has('pjEnd','102,45');await has('pjStatus','ivme');await click('pjPresetLow');await has('pjNrr','1,00');
    await sel('pjBase','NGA');await click('pjPresetRepl');await has('pjEnd','330,53');await has('pjMom','1,450');await has('pjPeak','2083');
    await sel('pjBase','JPN');await click('pjPresetRepl');await has('pjPeak','2023 (başlangıç)');await has('pjMom','0,744');
    await range('pjMig','10');await has('pjMigOut','10,0');await range('pjE0','95');await has('pjE0Out','95,0');await range('pjTfr','0.5');await has('pjTfrOut','0,50');
    await click('projReset');await has('pjEnd','41,74 milyon');await noflow('proj');
    /* klavye, R tuşu, etiketler, çekirdek */
    await page.locator('#tab-proj').focus();await page.keyboard.press('Home');eq(await page.locator('#tab-dog').getAttribute('aria-selected'),'true');await page.keyboard.press('ArrowLeft');eq(await page.locator('#tab-proj').getAttribute('aria-selected'),'true');await page.keyboard.press('ArrowRight');eq(await page.locator('#tab-dog').getAttribute('aria-selected'),'true');await page.keyboard.press('End');eq(await page.locator('#tab-proj').getAttribute('aria-selected'),'true');
    await click('tab-yasam');await range('ltChild','0');await page.locator('h1').click();await page.keyboard.press('r');await has('ltE0','77,21');
    eq(await page.evaluate(()=>[...document.querySelectorAll('main input,main select')].filter(e=>!(e.labels&&e.labels.length)&&!e.getAttribute('aria-label')).map(e=>e.id)),[]);
    eq(await page.evaluate(()=>[...document.querySelectorAll('main canvas')].filter(c=>c.getAttribute('role')!=='img'||!c.getAttribute('aria-label')).length),0);
    eq(await page.evaluate(()=>Object.isFrozen(Demografi)&&!Object.getOwnPropertyDescriptor(window,'Demografi').writable),true);
    eq(await page.evaluate(()=>/[̀-ͯ⃗]/.test(document.body.textContent.normalize('NFC'))),false,'birleşik işaret');
    for(const t of['dog','yasam','piramit','gecis','proj']){await click('tab-'+t);await noflow('sekme '+t);
      eq(await page.evaluate(()=>/\d\.\d/.test([...document.querySelectorAll('.dm-stat strong,.dm-status,output,.dm-table td')].filter(e=>e.offsetParent).map(e=>e.textContent).join(' '))),false,'ondalık nokta '+t);}
    assert.deepEqual(errors,[]);checks++;await page.close();
  }
  console.log(`G demografi-ve-nufus: ${checks-before} tarayıcı kontrolü (390 açık / 1280 koyu; beş sekme, hazırlar, sınırlar, klavye) PASS`);
  }finally{await browser?.close();await new Promise(r=>server.close(r));}
}
