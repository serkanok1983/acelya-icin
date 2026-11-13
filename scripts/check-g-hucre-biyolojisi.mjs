// G · hucre-biyolojisi.html — kalıcı denetim.
// Çekirdek (KERNEL-BEGIN … KERNEL-END) node'da yüklenir ve sayfanın formüllerini KULLANMAYAN başvurularla karşılaştırılır:
// küre difüzyonu için v = r·u dönüşümüyle düzleme indirilmiş Crank–Nicolson çözümü, osmoz ODE'sinin kapalı biçimli
// zaman integrali, darbe-takip bölmeleri için ayrı bir RK4 integrali, kaba kuvvet yüzey sayımı, elle yazılmış
// çözümleyici tablosu ve alıştırma metinlerinden geri okunan sayılarla bağımsız çözüm (500 tohum × 3 seviye).
// `--browser`: Playwright ile gerçek arayüz (390 px açık tema ve 1280 px koyu tema).
import fs from 'node:fs';
import vm from 'node:vm';
import assert from 'node:assert/strict';
import { canvasInk, assertCanvasDrawn } from './lib/canvas-check.mjs';
const html=fs.readFileSync(new URL('../hucre-biyolojisi.html',import.meta.url),'utf8');
const source=html.split('/* KERNEL-BEGIN */')[1]?.split('/* KERNEL-END */')[0];
assert(source,'hucre-biyolojisi.html: KERNEL sınırları gerekli');
const context={window:{}};vm.createContext(context);vm.runInContext(source,context);
const K=context.window.HucreBio;assert(K,'HucreBio yok');assert(Object.isFrozen(K),'çekirdek donmuş olmalı');
let checks=0;
const near=(a,e,tol=1e-10,msg='')=>{assert(Number.isFinite(a)&&Math.abs(a-e)<=tol*Math.max(1,Math.abs(e)),`${msg} ${a} ≠ ${e} (tol ${tol})`);checks++;};
const ok=(c,msg='koşul sağlanmadı')=>{assert(c,msg);checks++;};
const eq=(a,b,msg)=>{assert.equal(a,b,(msg||'eşitlik')+`: ${a} ≠ ${b}`);checks++;};
const NB=' ';

// 1) Sayı biçimi
for(const[x,sd,s]of[[12345.678,4,'12'+NB+'350'],[1234,4,'1234'],[0.5,4,'0,5'],[-2.5,4,'−2,5'],[0,4,'0'],[1e12,4,'10¹²'],[1.2e-5,4,'1,2·10⁻⁵'],[9999.6,4,'10'+NB+'000'],[NaN,4,'—'],[0.000123,3,'0,000123'],[196.42857,4,'196,4']])eq(K.fmt(x,sd),s,'fmt '+x);
for(const[x,dp,s]of[[-0.0001,2,'0,00'],[15660,0,'15'+NB+'660'],[137.6866,1,'137,7']])eq(K.fix(x,dp),s,'fix '+x);
for(const[m,s]of[[2.5e-8,'25 nm'],[6e-6,'6 µm'],[1e-2,'10 mm'],[1,'1 m'],[5e-11,'50 pm']])eq(K.fmtLen(m),s,'fmtLen '+m);
for(const[t,s]of[[1.65e-5,'16,5 µs'],[6.61e-3,'6,61 ms'],[30,'30 s'],[1652,'27,5 dk']])eq(K.fmtTime(t),s,'fmtTime '+t);

// 2) Abbe ve görünürlük
for(const lam of[380,450,550,700])for(const NA of[0.1,0.65,1,1.4])near(K.abbe(lam,NA)*2*NA,lam,1e-14,'abbe');
near(K.abbe(550,1.4),196.42857142857142,1e-12);ok(Number.isNaN(K.abbe(550,0)));
// 0,1 + 0,05k ızgarası 0,65 ve 1,40'ı içerir; 380 + 5k 400 ve 550'yi
ok([0.65,1.4].every(v=>Math.abs((v-0.1)/0.05-Math.round((v-0.1)/0.05))<1e-9)&&[400,550].every(v=>(v-380)%5===0),'hazır değerlere kaydırıcıyla ulaşılır');
const S=Object.fromEntries(K.SCALE.map(s=>[s.id,s]));eq(K.SCALE.length,16);
eq(K.visibility(S.ribozom,196),'elektron');eq(K.visibility(S.atom,196),'elektron');eq(K.visibility(S.mitokondri,196),'isik');eq(K.visibility(S.lizozom,196),'kismen');eq(K.visibility(S.insanyum,196),'goz');eq(K.visibility(S.virus,196),'elektron');eq(K.visibility(S.virus,90),'isik');
for(const s of K.SCALE)ok(s.lo>0&&s.hi>=s.lo,'aralık '+s.id);
near(K.gmean(S.okaryot)/K.gmean(S.ribozom),Math.sqrt(1e-5*1e-4)/Math.sqrt(2e-8*3e-8),1e-12);

// 3) Yüzey/hacim: kaba kuvvet sayım ve Arşimet
for(const L of[1e-6,2e-5,3.7e-3])for(let n=1;n<=10;n++){const G=K.geom('kup',L,n);let A=0;const s=L/n;for(let i=0;i<n*n*n;i++)A+=6*s*s;near(G.A,A,1e-12,'küp yüzeyi');near(G.V,L*L*L,1e-12);near(G.ratio,A/(L*L*L),1e-12);}
for(const L of[1e-6,2e-5]){const G=K.geom('kure',L),r=L/2;let V=0;const M=20000;for(let i=0;i<M;i++){const z=-r+(i+0.5)*2*r/M;V+=Math.PI*(r*r-z*z)*2*r/M;}near(G.V,V,1e-7,'küre hacmi dilimle');near(G.A,2*Math.PI*r*2*r,1e-12,'Arşimet: küre yüzeyi = silindir yan yüzü');near(G.ratio,6/L,1e-12);}
{const L=1e-5,G=K.geom('levha',L);near(G.ratio,(2*L*L+4*L*L/10)/(L*L*L/10),1e-12);near(G.ratio*L,24,1e-12);}
eq(K.LSTEPS.indexOf(1),3);eq(K.LSTEPS.indexOf(20),7);eq(K.LSTEPS.indexOf(10000),15);eq(K.LSTEPS.length,16);

// 4) Küre difüzyonu: bağımsız Crank–Nicolson (v = r·u: v_t = v_rr, v(0)=0, v(1)=1; merkezde u = ∂v/∂r)
function cn(N,dt){const h=1/N;const v=new Float64Array(N+1);v[N]=1;let t=0,prevU=0,half=null;const lam=dt/(h*h);
 const a=-lam/2,b=1+lam,cc=-lam/2;
 while(t<0.5){const d=new Float64Array(N+1);for(let i=1;i<N;i++)d[i]=lam/2*v[i-1]+(1-lam)*v[i]+lam/2*v[i+1];d[N-1]-=cc*1;
  const cp=new Float64Array(N),dp=new Float64Array(N);cp[1]=cc/b;dp[1]=d[1]/b;for(let i=2;i<N;i++){const m=b-a*cp[i-1];cp[i]=cc/m;dp[i]=(d[i]-a*dp[i-1])/m;}
  const nv=new Float64Array(N+1);nv[N]=1;nv[N-1]=dp[N-1];for(let i=N-2;i>=1;i--)nv[i]=dp[i]-cp[i]*nv[i+1];
  const u0=(-3*0+4*nv[1]-nv[2])/(2*h);for(let i=0;i<=N;i++)v[i]=nv[i];
  if(half===null&&prevU<0.5&&u0>=0.5)half=t+(0.5-prevU)/(u0-prevU)*dt;prevU=u0;t+=dt;}
 return half;}
const cnHalf=cn(800,2e-6);near(K.TAU_HALF,cnHalf,2e-4,'τ½ seri vs Crank–Nicolson');near(K.TAU_HALF,0.1387853,1e-6);
for(const tau of[0.02,0.05,0.1,0.2,0.4]){ok(K.centreSeries(tau)>K.centreSeries(tau*0.9),'artan');}
near(K.centreSeries(3),1,1e-12);eq(K.centreSeries(0),0);
{const e={};for(const N of[10,20,40,80]){const R=K.fdSphere(N,0.5);e[N]=Math.abs(R.tauHalf-K.TAU_HALF);ok(R.hist.length>50);}
 ok(e[20]<e[10]&&e[40]<e[20]&&e[80]<e[40],'ızgara inceldikçe hata azalır');for(const[a,b]of[[10,20],[20,40],[40,80]])ok(e[a]/e[b]>3.2&&e[a]/e[b]<5,`ikinci derece yakınsama ${a}/${b}: ${e[a]/e[b]}`);
 ok(e[40]/K.TAU_HALF<5e-4,'varsayılan ızgarada fark < %0,05');}
{const R=K.fdSphere(40,0.5);for(const[t,u]of R.hist)if(t>0.01)ok(Math.abs(u-K.centreSeries(t))<3e-3,'ızgara ve seri eğrileri '+t);}
near(K.halfTime(0.5e-6,2.1e-9),1.6522e-5,1e-4);near(K.halfTime(10e-6,2.1e-9),6.6088e-3,1e-4);near(K.halfTime(0.5e-2,2.1e-9)/60,27.537,1e-3);
near(K.halfTime(20e-6,2.1e-9)/K.halfTime(2e-6,2.1e-9),100,1e-12,'t ∝ a²');near(K.roughTime(1e-5,2.1e-9),1e-10/(6*2.1e-9),1e-12);
eq(K.DIFF.o2,2.1e-9);eq(K.DIFF.co2,1.92e-9);

// 5) Taşıma
near(K.fick(0.2,5),1,1e-14);near(K.mm(2,10,2),5,1e-14);near(K.mm(5,10,2),50/7,1e-14);eq(K.mm(0,10,2),0);
for(const C of[0.5,5,30])ok(K.mm(2*C,10,2)/K.mm(C,10,2)<2&&K.mm(2*C,10,2)/K.mm(C,10,2)>1,'doyum');
// kesişim: 0,2C = 10C/(2 + C) → C = 48
near(K.fick(0.2,48),K.mm(48,10,2),1e-12);
// osmoz: Boyle–van 't Hoff ve kapalı biçimli zaman: x = V − Vb, dx/dt = k (c − πx)/x → t = −x/(kπ) − c/(kπ²) ln|c − πx|
const R=K.RBC;eq(R.V0,90);eq(R.pi0,290);near(K.rbcEq(290),90,1e-14);near(K.rbcEq(580),36+27,1e-12);near(K.rbcEq(145),36+108,1e-12);near(K.lysisPi(),290*54/114,1e-12);
near(K.naclOsm(0.9),308.008,1e-5);near(K.naclOsm(0.45),154.004,1e-5);
for(const pi of[100,154,200,308,600,900]){const sim=K.rbcSim(pi,20,0.01),c=290*54,k=54/290;const T=x=>-x/(k*pi)-c/(k*pi*pi)*Math.log(Math.abs(c-pi*x));
 for(let i=10;i<sim.ts.length;i+=37){const x=sim.Vs[i]-36;if(Math.abs(c-pi*x)<1e-6*c)continue;if(Math.abs(sim.Vs[i]-K.rbcEq(pi))<0.05)break;near(T(x)-T(54),sim.ts[i],2e-6,`osmoz zamanı π=${pi} t=${sim.ts[i]}`);}
 if(K.rbcEq(pi)<150){eq(sim.lysisT,null);ok(Math.abs(sim.Vend/K.rbcEq(pi)-1)<1e-3,`20 τ'da denge π=${pi}: ${sim.Vend}`);}else{ok(sim.lysisT>0);near(sim.lysisT,T(114)-T(54),1e-5,'patlama zamanı');}}
eq(K.waterDir(290,150),'iceri');eq(K.waterDir(290,600),'disari');eq(K.waterDir(290,290),'yok');
{const P=K.pumpCount(7);eq(P.na,21);eq(P.k,14);eq(P.atp,7);eq(P.charge,7);}

// 6) Darbe-takip: analitik çözüm ayrı RK4 ile, sayım istatistikle
{const k=K.PC,f=y=>[-k.k1*y[0],k.k1*y[0]-k.k2*y[1],k.k2*y[1]-k.k3*y[2],k.k3*y[2]];let y=[1,0,0,0],t=0;const h=0.01;
 for(let step=1;step<=12000;step++){const a=f(y),b=f(y.map((v,i)=>v+h/2*a[i])),c=f(y.map((v,i)=>v+h/2*b[i])),d=f(y.map((v,i)=>v+h*c[i]));y=y.map((v,i)=>v+h/6*(a[i]+2*b[i]+2*c[i]+d[i]));t+=h;
  if(step%1000===0){const A=K.pcAnalytic(t);near(A.er,y[0],1e-9);near(A.golgi,y[1],1e-9);near(A.vez,y[2],1e-9);near(A.out,y[3],1e-9);}}}
for(const t of[0,5,20,60,120]){const A=K.pcAnalytic(t);near(A.er+A.golgi+A.vez+A.out,1,1e-12);
 for(const seed of[1,2,3,4,5]){const M=K.pcMonte(t,20000,seed);near(M.er+M.golgi+M.vez+M.out,1,1e-12);for(const key of['er','golgi','vez','out']){const sd=Math.sqrt(Math.max(A[key]*(1-A[key]),1e-6)/20000);ok(Math.abs(M[key]-A[key])<5*sd+1e-4,`Monte Carlo ${key} t=${t} tohum ${seed}`);}}}
eq(JSON.stringify(K.pcMonte(20,2000,1)),JSON.stringify(K.pcMonte(20,2000,1)),'tohum tekrarlanır');

// 7) Çözümleyici
for(const[s,v]of[['12',12],['2,5',2.5],['2.5',2.5],[' 0,3 ',0.3],['1 000',1000],['3/4',0.75],['−3',-3],['-3',-3],['6/20',0.3],[',5',0.5],['0.125',0.125],['1,000',1],['2.5',2.5]]){const r=K.parseNumber(s);ok(r.ok,'kabul: '+s);near(r.value,v,1e-15,s);}
for(const[s,re]of[['',/sayı yaz/],[null,/sayı yaz/],['0,3 µm',/birimsiz/],['5 mM',/birimsiz/],['2^3',/Yalnız sayı/],['1,2,3',/Tek bir ondalık/],['1/2/3',/Tek bir kesir/],['3/0',/Payda/],['2 5',/binlik/],['--3',/tanınmadı/],['1.000',/Belirsiz/],['12.500',/Belirsiz/],['1.000.000',/Belirsiz/]]){const r=K.parseNumber(s);eq(r.ok,false,'red: '+s);ok(re.test(r.error),s+': '+r.error);}
for(const[a,b]of[['GOLGİ','golgi'],['Golgi Aygıtı','golgiaygiti'],['IŞIK','isik'],['  çekirdek. ','cekirdek'],['Dışarı!','disari']])eq(K.normText(a),b,'normText '+a);
const ORG=['cekirdek','ribozom','mitokondri','ger','der','golgi','lizozom','kloroplast','koful','duvar'];
for(const[s,k]of[['golgi cisimcigi','golgi'],['GOLGİ AYGITI','golgi'],['Pürüzlü ER','ger'],['granülsüz endoplazmik retikulum','der'],['mitokondriler','mitokondri'],['Ribozomlar','ribozom'],['çeper','duvar'],['VAKUOL','koful']]){const m=K.matchTerm(s,ORG);ok(m.ok,'eşleşme '+s);eq(m.key,k,s);}
ok(/Seçenekler/.test(K.matchTerm('sentriyol',ORG).error));ok(/sözcükle/.test(K.matchTerm('12',ORG).error));ok(!K.matchTerm('',ORG).ok);
{const ex={kind:'text',options:['iceri','disari','yok'],accept:['iceri']};eq(K.grade(ex,'İÇERİ').status,'correct');eq(K.grade(ex,'hücreye').status,'correct');eq(K.grade(ex,'dışarıya').status,'wrong');eq(K.grade(ex,'golgi').status,'wrong');eq(K.grade(ex,'qwerty').status,'invalid');}
{const ex={kind:'num',mode:'exact',answer:0.3};eq(K.grade(ex,'0,3').status,'correct');eq(K.grade(ex,'3/10').status,'correct');eq(K.grade(ex,'0.301').status,'close');eq(K.grade(ex,'0,5').status,'wrong');eq(K.grade(ex,'abc').status,'invalid');}
{const ex={kind:'num',mode:'approx',answer:196.43,tol:1};eq(K.grade(ex,'196').status,'correct');eq(K.grade(ex,'197,4').status,'correct');eq(K.grade(ex,'200').status,'close');eq(K.grade(ex,'393').status,'wrong');}

// 8) Alıştırmalar: metinden sayıları geri oku, bağımsız çöz
const N=s=>Number(String(s).replace(/[  ]/g,'').replace('−','-').replace(',','.'));
const nums=h=>[...h.replace(/<[^>]+>/g,' ').matchAll(/\d+(?:[.,]\d+)?/g)].map(m=>N(m[0]));
const ORGKW=[[/ATP üreten|alyuvarda hiç/,'mitokondri'],[/Zarı olmayan|zarsız protein/,'ribozom'],[/cis|mannoz/,'golgi'],[/sindirim enzimi/,'lizozom'],[/Fotosentez/,'kloroplast'],[/Gözenekli çift zar/,'cekirdek'],[/ribozomlarla kaplı/,'ger'],[/Ribozomsuz/,'der'],[/turgor/,'koful'],[/patlamasını önleyen/,'duvar']];
const TRKW=[[/ATP harcanarak|ATP harcayarak/,'aktif'],[/su giriyor|su çıkıyor/,'osmoz'],[/içine alıyor/,'endo'],[/boşaltıyor/,'ekzo'],[/taşıyıcı proteiniyle|kanal proteininden/,'kolay'],[/doğrudan/,'basit']];
const solve={
 organFn:h=>ORGKW.find(([re])=>re.test(h))[1],
 cellKind:h=>/çekirdeği yok|mitokondrisi, ER/.test(h)?'bakteri':/kloroplast(?!ı yok)/.test(h)&&!/kloroplastı yok/.test(h)?'bitki':'hayvan',
 microscope:h=>{const m=h.match(/Boyu (?:yaklaşık )?([\d,]+) (nm|µm)/);const nm=N(m[1])*(m[2]==='µm'?1000:1);return nm>200?'isik':'elektron';},
 unitConv:h=>{const x=nums(h)[0];return/µm kaç nanometre/.test(h)?x*1000:x/1000;},
 savCube:h=>{const a=nums(h)[0];return 6*a*a/(a*a*a);},
 savSphere:h=>{const r=nums(h)[0];return 4*Math.PI*r*r/(4/3*Math.PI*r*r*r);},
 savCompare:h=>{const[a,b]=nums(h);return(6/a)/(6/b);},
 osmosisDir:h=>{const[pin,pout]=nums(h);return pout<pin?'iceri':pout>pin?'disari':'yok';},
 abbeEx:h=>{const[lam,NA]=nums(h);return lam/(2*NA);},
 transportType:h=>TRKW.find(([re])=>re.test(h))[1],
 diffScale:h=>{if(/katına çıkarsa/.test(h)){const k=nums(h).find(v=>v>1);return Math.pow(k,2);}const[r1,t1,r2]=nums(h);return t1*Math.pow(r2/r1,2);},
 naK:h=>{const n=nums(h)[0];if(/ATP harcadığında kaç Na/.test(h))return 3*n;if(/kaç K/.test(h))return 2*n;if(/net kaç birim/.test(h))return n;return n/3;},
 rbcVol:h=>{const[pi0,V0,Vb,X]=nums(h);return Vb+pi0*(V0-Vb)/X;}
};
const seen={1:new Set(),2:new Set(),3:new Set()};
for(const L of[1,2,3])for(let s=1;s<=500;s++){
 const ex=K.genExercise(L,s);seen[L].add(ex.type);ok(!/NaN|undefined|Infinity|null/.test(ex.html+ex.steps.join('')+ex.hint+ex.shown),`L${L} s${s} metin`);
 const ref=solve[ex.type];assert(ref,'bağımsız çözücü yok: '+ex.type);const v=ref(ex.html);
 if(ex.kind==='text'){eq(ex.accept[0],v,`L${L} s${s} ${ex.type}: ${ex.html}`);ok(ex.options.includes(v));}
 else if(ex.mode==='exact')near(ex.answer,v,1e-9,`L${L} s${s} ${ex.type}`);else ok(Math.abs(ex.answer-v)<1e-9*Math.max(1,v),`L${L} s${s} ${ex.type} ${ex.answer} ≠ ${v}`);
 eq(K.grade(ex,ex.shown).status,'correct',`L${L} s${s} gösterilen cevap doğru sayılmalı (${ex.shown})`);
 eq(JSON.stringify(K.genExercise(L,s)),JSON.stringify(ex),'tohum tekrarlanabilir');}
for(const L of[1,2,3])eq([...seen[L]].sort().join(),[...K.GEN_TYPES[L]].sort().join(),'seviye '+L+' bütün türleri üretir');
ok(K.GEN_TYPES[1].length+K.GEN_TYPES[2].length+K.GEN_TYPES[3].length>=13);

// 9) Yaygın hatalar
eq(K.MISTAKE_IDS.length,8);
for(let s=1;s<=60;s++){
 const B=K.mistake('buyukVerimli',s);near(B.ra/B.rb,B.b/B.a,1e-12);ok(B.rb<B.ra,'büyük küpün oranı küçük');
 const D=K.mistake('difDogrusal',s);eq(D.right,D.k*D.k);ok(D.wrong!==D.right);
 const O=K.mistake('osmozCozunen',s);near(O.solAfter,O.solIn,1e-12,'çözünen sabit');near(O.piAfter,O.p,1e-12,'iç derişim dışarıya eşit');
 const C=K.mistake('kolaySinirsiz',s);ok(C.ratio<2&&C.ratio>1,'doyum: oran < 2');near(C.ratio,(2*C.C/(2+2*C.C))/(C.C/(2+C.C)),1e-12);}

console.log(`G hucre-biyolojisi: ${checks.toLocaleString('tr-TR')} bağımsız çekirdek kontrolü PASS`);

if(process.argv.includes('--browser')){
 const {createRequire}=await import('node:module');const {createServer}=await import('node:http');const {join,extname}=await import('node:path');const {fileURLToPath}=await import('node:url');const root=fileURLToPath(new URL('../',import.meta.url));
 let chromium;for(const dir of[root,...(process.env.NODE_PATH||'').split(':').filter(Boolean),'/opt/node-tools']){try{({chromium}=createRequire(join(dir,'package.json'))('playwright'));break;}catch(_){}}
 if(!chromium)({chromium}=await import('playwright'));
 const server=createServer((req,res)=>{const file=join(root,decodeURIComponent(new URL(req.url,'http://localhost').pathname));if(!file.startsWith(root)||!fs.existsSync(file)||fs.statSync(file).isDirectory()){res.writeHead(404).end();return;}res.setHeader('Content-Type',({'.html':'text/html; charset=utf-8','.js':'text/javascript; charset=utf-8','.css':'text/css; charset=utf-8'})[extname(file)]||'application/octet-stream');res.end(fs.readFileSync(file));});
 await new Promise(r=>server.listen(0,'127.0.0.1',r));let browser;const before=checks;
 try{browser=await chromium.launch();
  for(const[width,theme]of[[390,'light'],[1280,'dark']]){
   const ctx=await browser.newContext({viewport:{width,height:900},deviceScaleFactor:width<500?2:1,locale:'tr-TR'});await ctx.addInitScript(t=>{localStorage.setItem('acelya-theme',t);localStorage.setItem('acelya-sound-muted','1');},theme);
   const page=await ctx.newPage();page.setDefaultTimeout(6000);const errors=[];page.on('pageerror',e=>errors.push(e.message));page.on('console',m=>{if(m.type()==='error'&&!/404|Failed to load resource/.test(m.text()))errors.push(m.text());});
   await page.goto(`http://127.0.0.1:${server.address().port}/hucre-biyolojisi.html`,{waitUntil:'load'});await page.waitForTimeout(400);
   const click=id=>page.locator('#'+id).click(),read=async id=>(await page.locator('#'+id).textContent()).trim(),has=async(id,t)=>{const s=await read(id);assert(s.includes(t),`[${width}] #${id}: "${s}" içinde "${t}" yok`);checks++;};
   const range=(id,v)=>page.locator('#'+id).evaluate((e,v)=>{e.value=v;e.dispatchEvent(new Event('input',{bubbles:true}));},v),pick=(id,v)=>page.locator('#'+id).selectOption(v),settle=()=>page.waitForTimeout(120);
   const noOverflow=async w=>{eq(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),true,`[${width}] yatay taşma: ${w}`);};
   const painted=async id=>{ok(assertCanvasDrawn(await canvasInk(page,'#'+id),{minDistinct:4,label:`[${width}] ${id}`}),`[${width}] ${id} boş`);};
   eq(await page.evaluate(()=>[...document.querySelectorAll('main input,main select')].filter(e=>!(e.labels&&e.labels.length)&&!e.getAttribute('aria-label')).map(e=>e.id).join()),'','etiketsiz denetim');
   eq(await page.evaluate(()=>[...document.querySelectorAll('main canvas')].every(c=>c.getAttribute('role')==='img'&&c.getAttribute('aria-label'))),true,'tuval rol/etiket');
   eq(await page.evaluate(()=>[...document.querySelectorAll('main button')].filter(b=>!b.textContent.trim()&&!b.getAttribute('aria-label')).length),0,'adsız düğme');
   eq(await page.evaluate(()=>/[̀-ͯ]/.test(document.body.innerHTML)),false,'birleşik işaret');
   eq(await page.evaluate(()=>document.title.length<=80),true,'başlık ≤ 80');
   eq(await page.evaluate(()=>document.querySelectorAll('main input[type=number]').length),0,'type=number yok');
   // sekme klavyesi
   await page.locator('#tab-t1').focus();await page.keyboard.press('ArrowRight');await settle();eq(await page.locator('#tab-t2').getAttribute('aria-selected'),'true');await page.keyboard.press('End');await settle();eq(await page.locator('#panel-t6').isVisible(),true);await page.keyboard.press('Home');await settle();eq(await page.locator('#panel-t1').isVisible(),true);await page.keyboard.press('ArrowLeft');await settle();eq(await page.locator('#tab-t6').getAttribute('aria-selected'),'true');await click('tab-t1');await settle();
   // 01
   eq(await page.locator('#t1Time li').count(),17);await has('t1Info','Franz Bauer 1804');await has('t1Info','≈ 6 µm');
   await page.locator('#t1List [data-o="ribozom"]').click();await settle();await has('t1Info','Palade');await has('t1Info','elektron mikroskobunda');
   await page.locator('#t1Svg [data-o="mitokondri"] ellipse.mit').first().click({force:true});await settle();await has('t1Info','Kölliker');
   await pick('t1Cell','bitki');await settle();await has('t1Info','Kölliker');eq(await page.locator('#t1List button').count(),9);await page.locator('#t1List [data-o="kloroplast"]').click();await has('t1Info','von Mohl');
   await pick('t1Cell','bakteri');await settle();await has('t1Info','Nükleoit');await page.locator('#t1List [data-o="plazmit"]').click();await settle();await has('t1Info','Lederberg');await has('t1Info','biyokimyasal');await page.locator('#t1List [data-o="kamci"]').click();await settle();await has('t1Info','20 nm');await has('t1Info','elektron mikroskobunda');eq(await page.locator('#t1Svg [data-o="cekirdek"]').count(),0,'bakteride çekirdek yok');
   await page.locator('#t1Mem').check();await settle();ok(await page.locator('#t1Svg .o.dim').count()>0);
   await click('t1Reset');await settle();await has('t1Info','Çekirdek');eq(await page.locator('#t1Cell').inputValue(),'hayvan');eq(await page.locator('#t1Mem').isChecked(),false);
   await noOverflow('01');
   // 02
   await click('tab-t2');await settle();await painted('t2c');await has('t2Stats','196,4 nm');await has('t2Stats','−1,79 %');await has('t2Stats','9 / 16');await has('t2Status','ribozom');await has('t2Cmp','1300');
   await click('t2P1');await settle();await has('t2Stats','423,1 nm');await click('t2P3');await settle();await has('t2Stats','307,7 nm');await click('t2P2');await settle();await has('t2Stats','142,9 nm');await has('t2Status','alt sınıra');
   await range('t2na',0.1);await settle();await has('t2Status','Düşük NA');await click('t2AReset');await settle();await has('t2Stats','196,4 nm');
   await pick('t2a','okaryot');await pick('t2b','ribozom');await settle();await has('t2Cmp','ters');await range('t2w',4);await range('t2z',-7);await settle();await painted('t2c');await click('t2Reset');await settle();await has('t2Cmp','1300');eq(await page.locator('#t2w').inputValue(),'12');
   await noOverflow('02');
   // 03
   await click('tab-t3');await settle();await painted('t3c');await painted('t3g');await painted('t3p');await has('t3LOut','20 µm');await has('t3Stats','0,3 µm⁻¹');await has('t3Stats','2400 µm²');await has('t3dStats','6,61 ms');await has('t3dStats','7,94 ms');await has('t3dStats','400 kat');
   await click('t3P1');await settle();await has('t3Stats','6 µm⁻¹');await has('t3dStats','16,5 µs');await click('t3P3');await settle();await has('t3dStats','27,5 dk');await has('t3dStatus','dakikalar');
   await click('t3P2');await range('t3n',5);await settle();await has('t3Stats','5 kat');await has('t3Status','125 parçaya');await pick('t3s','levha');await settle();await has('t3Stats','1,2 µm⁻¹');ok(await page.locator('#t3n').isDisabled());
   await pick('t3N','10');await settle();await has('t3dStats','−0,54 %');await pick('t3D','co2');await settle();await has('t3dStats','7,23 ms');await click('t3dReset');await settle();await has('t3dStats','6,61 ms');await has('t3dStats','−0,03 %');
   await click('t3Reset');await settle();await has('t3Stats','2400 µm²');eq(await page.locator('#t3s').inputValue(),'kup');eq(await page.locator('#t3n').inputValue(),'1');
   await noOverflow('03');
   // 04
   await click('tab-t4');await settle();await painted('t4m');await painted('t4f');await painted('t4oc');await painted('t4og');await painted('t4pc');
   await has('t4fStats','7,143');await has('t4fStats','71,4 %');await has('t4fStatus','48,0 mM');await range('t4C',0);await settle();await has('t4fStatus','sıfır');await range('t4C',60);await settle();await has('t4fStatus','geçti');await click('t4fReset');await settle();await has('t4fStats','7,143');
   await has('t4oStats','90,0 fL');await has('t4oStatus','İzotonik');
   await click('t4oP2');await settle();await has('t4oOut','154');await has('t4oStats','Ölçülüyor');await click('t4oSkip');await settle();await has('t4oStats','137,7 fL');await has('t4oStats','−0,01 %');ok(!(await read('t4oStats')).includes('137,6 fL'),'osmoz dengeye kadar sürer');await has('t4oStatus','Hipotonik');await has('t4oStatus','%0,01');
   // eşik çevresinde kuram ve simülasyon tutarlı: 137 patlar (kuram 150,3 fL), 138 patlamaz ve 149,5 fL'de durur
   await range('t4o',137);await click('t4oSkip');await settle();await has('t4oStats','150,3 fL (150 fL\'yi aşar)');await has('t4oStats','patladı, t = 21,31 τ');await has('t4oStatus','hemoliz');
   await range('t4o',138);await click('t4oSkip');await settle();ok(!(await read('t4oStats')).includes('patladı'),'138 patlamaz');eq(((await read('t4oStats')).match(/149,5 fL/g)||[]).length,2,'138: kuram = ölçülen 149,5 fL');await has('t4oStatus','yavaşlar');
   await click('t4oP1');await click('t4oSkip');await settle();await has('t4oStats','patladı');await has('t4oStatus','hemoliz');await has('t4oStatus','137,4');
   await click('t4oP5');await click('t4oSkip');await settle();await has('t4oStats','62,1 fL');await has('t4oStatus','Hipertonik');await click('t4oP4');await settle();await has('t4oOut','308');
   await click('t4oReset');await click('t4oSkip');await settle();await has('t4oStats','90,0 fL');await has('t4oStats','15'+NB+'660');
   await has('t4pStep','Başlangıç');for(let i=0;i<4;i++)await click('t4pNext');await settle();await has('t4pStats','1');await has('t4pStep','Bir döngü tamam');await click('t4pCycle');await settle();await has('t4pStats','6');await has('t4pStats','1,50 (3:2)');await click('t4pReset');await settle();await has('t4pStep','Başlangıç');
   await noOverflow('04');
   // 05
   await click('tab-t5');await settle();await painted('t5c');await painted('t5g');await has('t5Step','1/7');eq(await page.locator('#t5Prev').isDisabled(),true);
   for(let i=0;i<6;i++)await click('t5Next');await settle();await has('t5Step','Ekzositoz');eq(await page.locator('#t5Next').isDisabled(),true);await click('t5Prev');await settle();await has('t5Step','6/7');await click('t5Reset');await settle();await has('t5Step','1/7');
   await has('t5gStats','42,1 %');await has('t5gStats','40,3 %');await range('t5t',0);await settle();await has('t5gStats','100,0 % / 100,0 %');await has('t5gStatus','Darbe yeni bitti');await pick('t5N','20000');await range('t5t',60);await settle();await has('t5gStats','70,1 %');await click('t5gReset');await settle();await has('t5gStats','42,1 %');
   await click('t5eCheck');await settle();await has('t5eOut','boş');for(const[id,v]of[['e1','b'],['e2','b'],['e3','b'],['e4','b'],['e5','k'],['e6','b']])await pick('t5'+id,v);await click('t5eCheck');await settle();await has('t5eOut','6 gözlemden 5 doğru');eq(await page.locator('#t5e6').getAttribute('aria-invalid'),'true');await click('t5eReset');await settle();eq(await read('t5eOut'),'');
   await noOverflow('05');
   // 06
   await click('tab-t6');await settle();
   const ex=await page.evaluate(()=>{const e=window.HucreBio.genExercise(1,1);return{shown:e.shown,html:e.html,kind:e.kind};});
   ok((await page.locator('#t6Q').innerHTML()).includes(ex.html));eq(ex.kind,'text');ok(await page.locator('#t6Opts button').count()===3);
   await page.locator('#t6A').fill('golgi');await click('t6Check');await settle();await has('t6F','seçeneklerinden biri değil');
   await page.locator('#t6A').fill('xyz');await click('t6Check');await settle();await has('t6F','Tanınmadı');eq(await page.locator('#t6A').getAttribute('aria-invalid'),'true');
   await click('t6Hint');eq(await page.locator('#t6H').isVisible(),true);
   await page.locator('#t6Opts button',{hasText:ex.shown}).click();eq(await page.locator('#t6A').inputValue(),ex.shown);await page.locator('#t6A').press('Enter');await settle();await has('t6F','Doğru');await has('t6Score','1 soru doğru, 2 denetleme');
   await click('t6Sol');eq(await page.locator('#t6SolBox').isVisible(),true);await has('t6Steps',ex.shown);await click('t6Next');await settle();await has('t6SOut','2');eq(await page.locator('#t6SolBox').isVisible(),false);eq(await page.locator('#t6A').inputValue(),'');
   for(const L of['2','3'])for(const sd of[1,2,3]){await pick('t6L',L);await range('t6S',sd);await settle();const e=await page.evaluate(([L,s])=>window.HucreBio.genExercise(+L,s),[L,sd]);
    if(e.kind==='num'){await page.locator('#t6A').fill('1 2 3');await click('t6Check');await settle();await has('t6F','binlik');eq(await page.locator('#t6Opts button').count(),0);}
    await page.locator('#t6A').fill(e.kind==='num'?e.shown.replace(',','.'):e.shown.toLocaleUpperCase('tr'));await click('t6Check');await settle();await has('t6F','Doğru');}
   await click('t6Reset');await settle();await has('t6Score','0 soru doğru');eq(await page.locator('#t6L').inputValue(),'1');
   eq(await page.locator('.hb-mcard').count(),8,'sekiz hata kartı');const m0=await read('m-buyukVerimli');await click('mb-buyukVerimli');await settle();ok(m0!==await read('m-buyukVerimli'),'Başka sayılar metni değiştirir');await has('m-osmozCozunen','hiç değişmedi');
   await noOverflow('06');
   // bağlantılar
   for(const href of['enzim-kinetigi.html','fotosentez-solunum.html','dna-replikasyon.html','mitoz-mayoz.html','gen-ifadesi-ve-molekuler-biyoloji.html','sinir-hucresi-ve-aksiyon-potansiyeli.html'])eq(await page.locator(`.hb-bridge a[href="${href}"]`).count()>=1,true,'köprü '+href);
   // tema değişince yeniden çizim
   await click('tab-t4');await settle();await page.evaluate(t=>document.documentElement.setAttribute('data-theme',t),theme==='light'?'dark':'light');await page.waitForTimeout(150);await painted('t4f');
   eq(errors.join(' | '),'',`[${width}] konsol hatası`);await ctx.close();
  }
  console.log(`G hucre-biyolojisi: ${checks-before} kalıcı tarayıcı kontrolü PASS (390 px açık, 1280 px koyu)`);
 }finally{await browser?.close();await new Promise(r=>server.close(r));}
}
