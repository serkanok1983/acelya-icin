// G · dogal-secilim.html — kalıcı denetim.
// Çekirdek (KERNEL-BEGIN … KERNEL-END) node'da yüklenir ve sayfanın formüllerini KULLANMAYAN başvurularla
// karşılaştırılır: tam binom olasılıkları (ayrı log-gama), χ²(1) yoğunluğunun sayısal integrali, dokuz eşleşme
// tipinin kaba kuvvet sayımı, seçilim için bağımsız yineleme ve kök bulma, Wright–Fisher zincirinin dağılım
// yinelemesiyle (Gauss yok etme değil) sabitlenme olasılığı ve süresi, göç/mutasyon için kapalı biçim ve ikiye bölme,
// Cook ve ark. (2012) tablo toplamları. `--browser`: Playwright ile gerçek arayüz (390 px açık, 1280 px koyu).
import fs from 'node:fs';
import vm from 'node:vm';
import assert from 'node:assert/strict';
import { canvasInk, canvasInkAll, assertCanvasDrawn } from './lib/canvas-check.mjs';
const html=fs.readFileSync(new URL('../dogal-secilim.html',import.meta.url),'utf8');
const source=html.split('/* KERNEL-BEGIN */')[1]?.split('/* KERNEL-END */')[0];
assert(source,'dogal-secilim.html: KERNEL sınırları gerekli');
const context={window:{}};vm.createContext(context);vm.runInContext(source,context);
const K=context.window.SelectionLab;assert(K,'SelectionLab yok');
let checks=0;
const near=(a,e,tol=1e-10,msg='')=>{assert(Number.isFinite(a)&&Math.abs(a-e)<=tol*Math.max(1,Math.abs(e)),`${msg} ${a} ≠ ${e} (tol ${tol})`);checks++;};
const abs=(a,e,tol,msg='')=>{assert(Number.isFinite(a)&&Math.abs(a-e)<=tol,`${msg} |${a} − ${e}| > ${tol}`);checks++;};
const ok=(c,msg='koşul')=>{assert(c,msg);checks++;};
const eq=(a,b,msg)=>{assert.equal(a,b,msg??`${a} ≠ ${b}`);checks++;};
// --- bağımsız araçlar ---
function lgamma(x){const g=7,c=[0.99999999999980993,676.5203681218851,-1259.1392167224028,771.32342877765313,-176.61502916214059,12.507343278686905,-0.13857109526572012,9.9843695780195716e-6,1.5056327351493116e-7];if(x<0.5)return Math.log(Math.PI/Math.sin(Math.PI*x))-lgamma(1-x);x-=1;let a=c[0];const t=x+g+0.5;for(let i=1;i<9;i++)a+=c[i]/(x+i);return 0.5*Math.log(2*Math.PI)+(x+0.5)*Math.log(t)-t+Math.log(a);}
const binPmf=(n,p,k)=>Math.exp(lgamma(n+1)-lgamma(k+1)-lgamma(n-k+1)+k*Math.log(p)+(n-k)*Math.log(1-p));
const step=(p,a,b,c)=>{const q=1-p,num=p*(p*a+q*b),den=p*p*a+2*p*q*b+q*q*c;return num/den;}; // p' = p(p w11 + q w12)/w̄
// 1) üreteç ve binom örneklemesi: χ² uyumu tam olasılıklara karşı
{const r1=K.rng(42),r2=K.rng(42),a=[...Array(20)].map(()=>r1()),b=[...Array(20)].map(()=>r2());assert.deepEqual(a,b);checks++;ok(a.every(x=>x>=0&&x<1));}
for(const[n,p]of[[10,0.3],[20,0.5],[60,0.05],[200,0.5],[400,0.97],[400,0.0025],[2000,0.3]]){const r=K.rng(n*31+7),M=60000,cnt=new Map();let valid=true;for(let i=0;i<M;i++){const k=K.binomial(r,n,p);valid&&=Number.isInteger(k)&&k>=0&&k<=n;cnt.set(k,(cnt.get(k)||0)+1);}ok(valid,'binom tam sayı aralığı');
 // bölmeleri beklenen ≥ 10 olacak biçimde birleştir
 let chi=0,df=-1,eb=0,ob=0;for(let k=0;k<=n;k++){eb+=M*binPmf(n,p,k);ob+=cnt.get(k)||0;if(eb>=10){chi+=(ob-eb)**2/eb;df++;eb=0;ob=0;}}if(eb>0){chi+=(ob-eb)**2/Math.max(eb,1e-9);df++;}
 const crit=df+4.5*Math.sqrt(2*Math.max(df,1))+10;ok(chi<crit,`binom n=${n} p=${p}: χ²=${chi.toFixed(1)} df=${df}`);}
eq(K.binomial(K.rng(1),50,0),0);eq(K.binomial(K.rng(1),50,1),50);
// 2) χ²(1) kuyruk olasılığı: yoğunluğun sayısal integraliyle (x = z², P = 2·∫_z^∞ φ)
const phiTail=z=>{const n=20000,h=(12-z)/n;let s=0;for(let i=0;i<=n;i++){const x=z+i*h,f=Math.exp(-x*x/2)/Math.sqrt(2*Math.PI);s+=f*(i===0||i===n?1:i%2?4:2);}return 2*s*h/3;};
for(const x of[0.01,0.5,1,3.841,6.635,10.83])near(K.chi2p1(x),phiTail(Math.sqrt(x)),3e-6,'χ² p '+x);
near(K.chi2p1(3.841),0.05,1e-3);eq(K.chi2p1(0),1);
// 3) Hardy–Weinberg: kaba kuvvet ve örneklem
for(const p of[0.01,0.3,0.5,0.7,0.99]){const e=K.hw(p);let AA=0,Aa=0;for(const a of[[1,p],[0,1-p]])for(const b of[[1,p],[0,1-p]]){const w=a[1]*b[1];if(a[0]+b[0]===2)AA+=w;else if(a[0]+b[0]===1)Aa+=w;}near(e.AA,AA,1e-14);near(e.Aa,Aa,1e-14);near(e.AA+e.Aa+e.aa,1,1e-14);}
{const c=K.samplePopulation(1,200,0.7);eq(c.AA+c.Aa+c.aa,200);const t=K.hwTest(c);const n=200,ph=(2*c.AA+c.Aa)/400,E=[ph*ph*n,2*ph*(1-ph)*n,(1-ph)**2*n],O=[c.AA,c.Aa,c.aa];near(t.chi2,O.reduce((s,o,i)=>s+(o-E[i])**2/E[i],0),1e-12);near(t.F,1-(c.Aa/n)/(2*ph*(1-ph)),1e-12);
 // sayfanın varsayılan durumundaki sayılar (tohum 1)
 eq(c.AA,111);eq(c.Aa,73);eq(c.aa,16);}
// I. tür hata oranı birçok tohumda %5'e yakın
{let rej=0,M=3000;for(let k=1;k<=M;k++){const t=K.hwTest(K.samplePopulation(500000+k,500,0.4));if(t.chi2>3.841)rej++;}abs(rej/M,0.05,0.015,'I. tür hata');}
// 4) bir kuşak rastgele çiftleşme: genotipleri tek tek eşleştiren kaba kuvvet
for(const[D,H]of[[0.5,0],[0,1],[0.41,0.18],[0.25,0.5],[0.1,0.3],[1,0]]){const g=[D,H,1-D-H],out=[0,0,0];const al=[[1,1],[1,0],[0,0]];for(let i=0;i<3;i++)for(let j=0;j<3;j++)for(const x of al[i])for(const y of al[j])out[2-(x+y)]+=g[i]*g[j]/4;const ex=K.randomMatingExact(D,H),p=D+H/2;near(ex.AA,out[0],1e-14);near(ex.Aa,out[1],1e-14);near(ex.aa,out[2],1e-14);near(ex.AA,p*p,1e-14);const g2=K.randomMatingExact(ex.AA,ex.Aa);near(g2.AA,ex.AA,1e-14);near(g2.Aa,ex.Aa,1e-14);}
{let sAA=0,sAa=0,R=300;for(let k=1;k<=R;k++){const o=K.randomMatingSample(k,400,0.5,0).offspring;sAA+=o.AA;sAa+=o.Aa;eq(o.AA+o.Aa+o.aa,400);}abs(sAA/(R*400),0.25,0.01);abs(sAa/(R*400),0.5,0.01);}
assert.throws(()=>K.randomMatingExact(0.7,0.5));checks++;
// 5) belirlenimci seçilim
const W={add:{AA:1,Aa:0.95,aa:0.9},dom:{AA:1,Aa:1,aa:0.9},rec:{AA:1,Aa:0.9,aa:0.9},over:{AA:0.9,Aa:1,aa:0.8},under:{AA:1,Aa:0.9,aa:1}};
for(const w of Object.values(W))for(const p of[0.01,0.2,0.5,0.8,0.99]){const pn=step(p,w.AA,w.Aa,w.aa);near(K.selStep(p,w).p,pn,1e-13);near(K.deltaP(p,w),pn-p,1e-12);}
// iç denge: Δp'nin işaret değiştirdiği yer ikiye bölmeyle; kararlılık yakın başlangıçlardan yineleyerek
for(const[k,w,pstar,stable]of[['over',W.over,2/3,true],['under',W.under,0.5,false]]){let a=0.05,b=0.95;const f=x=>step(x,w.AA,w.Aa,w.aa)-x;for(let i=0;i<200;i++){const m=(a+b)/2;if(f(a)*f(m)<=0)b=m;else a=m;}near(a,pstar,1e-12,k);const e=K.equilibria(w).find(e=>e.interior);near(e.p,pstar,1e-12);eq(e.stable,stable);
 let x=pstar+0.01;for(let t=0;t<3000;t++)x=step(x,w.AA,w.Aa,w.aa);ok(stable?Math.abs(x-pstar)<1e-6:Math.abs(x-pstar)>0.3,k+' kararlılık');}
near(K.settle(0.01,W.over).p,0.2/(0.1+0.2),1e-6);
for(const w of[W.add,W.dom,W.rec])eq(K.equilibria(w).some(e=>e.interior),false);
// %1 → %99: tam sayı kuşak sayımı ve kesir aralığı; sürekli zaman integrali trapez ile (p uzayında, ince ağ)
const brute=(w,a,b)=>{let p=a,t=0;while(p<b&&t<1e7){p=step(p,w.AA,w.Aa,w.aa);t++;}return t;};
const trap=(w,a,b)=>{const n=400000,h=(b-a)/n;let s=0;for(let i=0;i<=n;i++){const p=a+i*h,d=step(p,w.AA,w.Aa,w.aa)-p;s+=(i===0||i===n?0.5:1)/d;}return s*h;};
for(const[k,w,ref]of[['add',W.add,174.5],['dom',W.dom,1074.8],['rec',W.rec,980.4]]){const tc=K.crossTime(w),n=brute(w,0.01,0.99);ok(tc>n-1&&tc<=n,k+' kesir aralığı '+tc+' '+n);abs(tc,ref,0.05,k);near(K.continuousTime(w),trap(w,0.01,0.99),2e-4,k+' süreklilik');}
eq(K.crossTime(W.over),null);eq(K.crossTime(W.under,0.45),null);
near(K.continuousTime(W.add),174.6,3e-4);near(2/0.1*Math.log(9801),183.8,3e-4);
// çekinik yararlı alel nadirken: Δp(%1) eklemeli eşdeğerin ~1/50'si
near(K.deltaP(0.01,W.rec)/K.deltaP(0.01,W.add),0.020,0.02);
// 6) Wright–Fisher: dağılım yinelemesiyle tam sabitlenme olasılığı ve koşullu süre
function chain(N,s,i0,G=40000){const M=2*N,P=[];for(let i=0;i<=M;i++){const p=i/M,ps=i===0||i===M?p:step(p,1+2*s,1+s,1),row=new Float64Array(M+1);for(let j=0;j<=M;j++)row[j]=ps<=0?+(j===0):ps>=1?+(j===M):binPmf(M,ps,j);P.push(row);}let v=new Float64Array(M+1);v[i0]=1;let prev=0,acc=0;for(let t=1;t<=G;t++){const w=new Float64Array(M+1);for(let i=0;i<=M;i++)if(v[i]>1e-300){const row=P[i],vi=v[i];for(let j=0;j<=M;j++)w[j]+=vi*row[j];}v=w;acc+=t*(v[M]-prev);prev=v[M];if(1-v[0]-v[M]<1e-13)break;}return{u:prev,time:acc/prev};}
for(const[N,s]of[[10,0],[10,0.05],[20,0.01],[25,0.03]]){const c=chain(N,s,1);near(K.exactFixation(N,s,1),c.u,1e-8,`tam zincir N=${N} s=${s}`);}
near(K.exactFixation(20,0,7),7/40,1e-10);
for(const[N,s]of[[50,0.01],[100,0.01],[100,0.02],[200,0.005]]){const ex=K.exactFixation(N,s,1),km=K.kimura(N,s,1/(2*N));near(km,(1-Math.exp(-2*s))/(1-Math.exp(-4*N*s)),1e-12);ok(Math.abs(km/ex-1)<0.012,`Kimura difüzyonu N=${N} s=${s}: ${km} / ${ex}`);}
abs(K.exactFixation(50,0.01,1),0.02279,5e-6);
// nötr deney: birçok tohumda sabitlenme = p₀, E[H_t] = H₀(1 − 1/2N)^t (tam), koşullu süre ≈ zincir
for(const[N,p0]of[[20,0.1],[50,0.3]]){let zs=0,hz=0;const ct=chain(N,0,Math.round(p0*2*N));for(const seed of[1,2,3,4]){const r=K.neutralExperiment(seed*101,N,p0,1500,50);eq(r.fixed+r.lost+r.open,1500);const z=(r.fixed/1500-p0)/Math.sqrt(p0*(1-p0)/1500);ok(Math.abs(z)<3.5,'nötr z '+z);zs+=z;const hse=Math.sqrt((r.H2[50]-r.H[50]**2)/1499);hz+=(r.H[50]-r.H[0]*Math.pow(1-1/(2*N),50))/hse;abs(r.meanFix,ct.time,ct.time*0.12,'süre');}ok(Math.abs(zs/2)<3.5);ok(Math.abs(hz/2)<3.5,'H ortalama z '+hz);}
// sayfanın parça düzeni (250'lik parçalar, tohum·1000003 + i·7919 + 17) ile varsayılan deney
{let f=0;for(let i=0;i<4;i++)f+=K.neutralExperiment(1*1000003+i*7919+17,50,0.3,250,100).fixed;eq(f,292);}
// yararlı mutasyon: simülasyon tam zincirle uyumlu
for(const[N,s]of[[50,0.02],[100,0.01]]){const ex=K.exactFixation(N,s,1);let f=0,n=0;for(const seed of[7,8]){const r=K.mutantExperiment(seed,N,s,15000);f+=r.fixed;n+=r.reps;}const z=(f/n-ex)/Math.sqrt(ex*(1-ex)/n);ok(Math.abs(z)<3.5,`mutant N=${N} s=${s} z=${z}`);}
near(K.hetDecay(50,100),Math.exp(100*Math.log(0.99)),1e-14);near(K.kimuraOhtaFix(100,0.5),400*0.5*Math.log(2)/0.5,1e-12);
// 7) göç: kapalı biçim, sonlu N ortalaması, yarılanma
{const r=K.migration(1,Infinity,0.05,0.9,0.1,60,1);r.mean.forEach((d,t)=>near(d,0.8*Math.pow(0.9,t),1e-12));near(K.halfTime(r.mean),Math.log(2)/-Math.log(0.9),3e-3);const ht=K.halfTime(r.mean);let t=Math.floor(ht);ok(r.mean[t]/0.8>0.5&&r.mean[t+1]/0.8<=0.5);}
{const r=K.migration(5,100,0.05,0.9,0.1,50,600);for(const t of[5,10,20])ok(Math.abs(r.mean[t]-0.8*Math.pow(0.9,t))<3.5*r.se[t]+1e-9,'göç sonlu N t='+t);eq(r.reps,600);}
eq(K.halfTime(K.migration(1,Infinity,0,0.9,0.1,30,1).mean),null);
// 8) mutasyon–seçilim: denge q* ikiye bölmeyle (q′ − q = 0), yaklaşımlarla kıyas
function qstar(mu,s,h){const f=q=>{const qm=q+mu*(1-q),p=1-qm;return 1-step(p,1,1-h*s,1-s)-q;};let a=1e-9,b=0.5;for(let i=0;i<200;i++){const m=(a+b)/2;if(f(a)*f(m)<=0)b=m;else a=m;}return a;}
for(const[mu,s,h]of[[1e-5,0.1,0],[1e-6,1,0],[1e-5,0.1,0.1],[1e-4,1,0.01],[1e-5,0.5,0.5]]){const r=K.mutSel(mu,s,h),q=qstar(mu,s,h);near(r.q,q,2e-6,`q* μ=${mu} s=${s} h=${h}`);if(h===0){ok(Math.abs(r.q/Math.sqrt(mu/s)-1)<0.01);near(r.load,mu,0.01);}if(h>=0.1){ok(Math.abs(r.q/(mu*(1-h*s)/(h*s))-1)<0.03,'μ(1−hs)/hs');if(h*s<=0.02)ok(Math.abs(r.q/(mu/(h*s))-1)<0.03);}}
// 9) örnek olay: tablo toplamları ve model
{const M=K.MOTH,sum=a=>a.reduce((x,y)=>x+y,0);eq(sum(M.relTyp)+sum(M.relMel),4864);eq(sum(M.eatTyp),963);eq(sum(M.eatMel),100);eq(sum(M.relTyp),4522);eq(sum(M.relMel),342);ok(Object.isFrozen(M)&&Object.isFrozen(M.melanic));
 const model=(s,n)=>{let q=Math.sqrt(1-0.12);const o=[0.12];for(let i=0;i<n;i++){const p=1-q,A=p*p*(1-s)+p*q*(1-s),W=p*p*(1-s)+2*p*q*(1-s)+q*q;q=1-A/W;o.push(1-q*q);}return o;};
 K.mothModel(0.12,0.1,6).forEach((v,i)=>near(v,model(0.1,6)[i],1e-13));let best=0,bv=1e9;for(let s=-0.5;s<=0.95;s+=1e-4){const m=model(s,6),e=m.reduce((a,v,i)=>a+(v-M.melanic[i])**2,0);if(e<bv){bv=e;best=s;}}abs(K.mothFit(M.melanic).s,best,2e-4);abs(best,0.269,1e-3);}
for(const call of[()=>K.hw(1.2),()=>K.selStep(0.5,{AA:-1,Aa:1,aa:1}),()=>K.mutSel(0,0.1,0),()=>K.migration(1,10,0.6,0.5,0.5,10,1),()=>K.neutralExperiment(1,0,0.5,10,10),()=>K.samplePopulation(1,0,0.5)]){assert.throws(call);checks++;}
ok(Object.isFrozen(K));
// 10) sayıdan sonraki Türkçe ek (sayfa betiği, çekirdek dışı): okunuşun son sözcüğüne göre ünlü ve ünsüz uyumu
{const a=html.indexOf('function okunus'),b=html.indexOf('function rel(');assert(a>0&&b>a,'ek yardımcısı yok');const E=new Function(html.slice(a,b)+';return ek;')();
 for(const[x,t,e]of[['10','de',"10'da"],['50','de',"50'de"],['5','de',"5'te"],['40','de',"40'ta"],['6','de',"6'da"],['100','de',"100'de"],['%98','i',"%98'i"],['%97','i',"%97'si"],['%99,0','i',"%99,0'ı"],['%26','i',"%26'sı"],['%100','i',"%100'ü"],['0,010','in',"0,010'un"],['1,0·10⁻³','in',"1,0·10⁻³'ün"],['3,2·10⁻²','in',"3,2·10⁻²'nin"]])eq(E(x,t),e);}
console.log(`G dogal-secilim: ${checks.toLocaleString('tr-TR')} bağımsız çekirdek kontrolü PASS`);

if(process.argv.includes('--browser')){
 const {createRequire}=await import('node:module');const {createServer}=await import('node:http');const {join,extname}=await import('node:path');const {fileURLToPath}=await import('node:url');const root=fileURLToPath(new URL('../',import.meta.url));
 let chromium;for(const dir of[root,...(process.env.NODE_PATH||'').split(':').filter(Boolean),'/opt/node-tools']){try{({chromium}=createRequire(join(dir,'package.json'))('playwright'));break;}catch(_){}}
 if(!chromium)({chromium}=await import('playwright'));
 const server=createServer((req,res)=>{const file=join(root,decodeURIComponent(new URL(req.url,'http://localhost').pathname));if(!file.startsWith(root)||!fs.existsSync(file)||fs.statSync(file).isDirectory()){res.writeHead(404).end();return;}res.setHeader('Content-Type',({'.html':'text/html; charset=utf-8','.js':'text/javascript; charset=utf-8','.css':'text/css; charset=utf-8'})[extname(file)]||'application/octet-stream');res.end(fs.readFileSync(file));});
 await new Promise(r=>server.listen(0,'127.0.0.1',r));let browser;const before=checks;
 try{browser=await chromium.launch();
  for(const[width,theme]of[[390,'light'],[1280,'dark']]){
   const ctx=await browser.newContext({viewport:{width,height:900},deviceScaleFactor:width<500?2:1,locale:'tr-TR'});await ctx.addInitScript(t=>{localStorage.setItem('acelya-theme',t);localStorage.setItem('acelya-sound-muted','1');},theme);
   const page=await ctx.newPage();page.setDefaultTimeout(8000);const errors=[];page.on('pageerror',e=>errors.push(e.message));page.on('console',m=>{if(m.type()==='error'&&!/404|Failed to load resource/.test(m.text()))errors.push(m.text());});
   await page.goto(`http://127.0.0.1:${server.address().port}/dogal-secilim.html`,{waitUntil:'load'});await page.waitForTimeout(300);
   const click=id=>page.locator('#'+id).click(),read=async id=>(await page.locator('#'+id).textContent()).trim(),has=async(id,t)=>{const s=await read(id);assert(s.includes(t),`[${width}] #${id}: "${s}" içinde "${t}" yok`);checks++;};
   const range=(id,v)=>page.locator('#'+id).evaluate((e,v)=>{e.value=v;e.dispatchEvent(new Event('input',{bubbles:true}));},v),pick=(id,v)=>page.locator('#'+id).selectOption(String(v));
   const settled=()=>page.waitForFunction(()=>!/ölçülüyor/.test(document.getElementById('drFix').textContent+document.getElementById('muFix').textContent),null,{timeout:60000});
   const noOverflow=async w=>{eq(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),true,`[${width}] yatay taşma: ${w}`);};
   const painted=async id=>{ok(assertCanvasDrawn(await canvasInk(page,'#'+id),{minDistinct:4,label:`[${width}] ${id}`}),`[${width}] ${id} boş`);};
   eq(await page.evaluate(()=>[...document.querySelectorAll('main input,main select')].filter(e=>!(e.labels&&e.labels.length)&&!e.getAttribute('aria-label')).map(e=>e.id).join()),'','etiketsiz denetim');
   eq(await page.evaluate(()=>[...document.querySelectorAll('main canvas')].every(c=>c.getAttribute('role')==='img'&&c.getAttribute('aria-label'))),true);
   eq(await page.evaluate(()=>[...document.querySelectorAll('input[type=range]')].every(e=>{const d=(+e.max-+e.min)/+e.step;return Math.abs(d-Math.round(d))<1e-9&&Math.abs(((+e.value-+e.min)/+e.step)-Math.round((+e.value-+e.min)/+e.step))<1e-9;})),true,'adım ızgarası');
   // 01
   await has('hwPhat','0,738');await has('hwChi','0,657');await has('hwPval','P = 0,418');await has('hwF','0,057');await has('hwAlpha','%5,4 (54 / 1000)');await has('hwAlphaT','tohum 1: %2,9');await range('hwN',2000);await has('hwAlpha','%2,9 (29 / 1000)');await range('hwN',200);await has('hwAlpha','%5,4');await has('hwRows','111');await painted('hwCanvas');await painted('mateCanvas');
   await has('mtF0','1,000');await has('mtDev','0');await has('mtFs','0,020');await click('mtWahl');await has('mtF0','0,640');await has('mtP','0,500');await click('mtHet');await has('mtF0','−1,000');await has('mtStatus','fazlalığı');
   await range('hwD',0.8);await range('hwH',0.5);eq(await page.locator('#hwD').inputValue(),'0.5','toplam 1 sınırı');await has('hwRnote','0');await click('mtHW');await has('mtStatus','zaten HW');
   await range('hwP',0.01);await range('hwN',20);await has('hwStatus','');{const s=await read('hwStatus');ok(/5'in altında|tek alel/.test(s),'küçük beklenen uyarısı: '+s);}
   await click('hwNext');await has('hwSeedOut','2');await click('hwReset');await has('hwPhat','0,738');await has('hwSeedOut','1');await has('mtF0','1,000');await noOverflow('hw');
   // 02
   await click('tab-sel');await has('selTime','174,5 kuşak');await has('selTimeC','174,6');await has('selLog','183,8');await has('selDsim','5,49·10⁻⁴');await has('selDwr','5,49·10⁻⁴');await has('selEq','1,000 kararlı');await painted('selTraj');await painted('selPhase');
   await click('selDom');await has('selTime','1074,8');await has('selHalf','53,2 + 1021,7');await has('selStatus','baskın');
   await click('selRec');await has('selTime','980,4');await has('selRareA','oran 0,020');await has('selHalf','927,6 + 52,9');
   await click('selOver');await has('selEnd','0,6667');await has('selEndT','p* = 0,6667');await has('selEqT','s₂/(s₁+s₂) = 0,6667');await has('selTime','ulaşılmıyor');await range('selP0',0.99);await has('selStatus','üstten');
   await click('selUnder');await has('selEq','0,500 kararsız');await has('selStatus','p₀ = 0,45, dengenin altında: a sabitlenir');await has('selEnd','0,0000');await range('selP0',0.55);await has('selEnd','1,0000');await range('selP0',0.5);await has('selStatus','tam dengede');
   await range('selAA',0.9);await range('selAa',0.9);await range('selaa',0.9);await has('selTime','tanımsız');await has('selStatus','seçilim yok');
   await range('selAA',0);await range('selAa',0);await range('selaa',0);await has('selStatus','tanımsız');
   await range('selAA',0.9);await range('selAa',0.95);await range('selaa',1);await range('selP0',0.5);await has('selTimeL','a için');await has('selTime','174,5');
   await page.locator('h1').click();await page.keyboard.press('r');await has('selTime','174,5');eq(await page.locator('#selAa').inputValue(),'0.95');await noOverflow('sel');
   // 03
   await click('tab-drift');await settled();await has('drFix','0,292 ± 0,014');await has('drFixT','0,30');await has('drH','0,3613');await has('drHT','0,3660');await has('drTime','164,6');await has('drTimeT','166,4');await has('drOpen','0 / 1000');
   await has('muFix','0,0235');await has('muKim','0,02290');await has('muExact','0,02279');await has('muRef','1/2N = 0,0100');await painted('driftLines');await painted('driftH');await painted('mutCanvas');
   await range('muS',0);await settled();await has('muExact','0,0100');await has('muStatus','nötr');
   await pick('drN',200);await range('muS',0.05);await range('drP0',0.95);await range('drT',400);await pick('drReps',200);await pick('muReps',2000);await settled();await has('drFixT','0,95');await has('muKim','0,09516');await has('muStatus','Seçilim baskın');
   await pick('drN',10);await range('drP0',0.05);await range('muS',0.001);await settled();await has('muStatus','Sürüklenme baskın');
   await range('drP0',0.4);await range('drP0',0.3);await click('drReset');await settled();await has('drFix','0,292');await click('drNext');await has('drSeedOut','2');await settled();ok(!(await read('drFix')).startsWith('0,292 ±'),'tohum değişmeli');await click('drReset');await settled();await noOverflow('drift');
   // 04
   await click('tab-mig');await has('mgHalf','6,59');await has('mgHalfT','6,58');await has('mgRate','0,9000');await has('mgD50','0,0041');await has('mgEq','0,500');await has('mgStatus','6,6 kuşakta yarıya, 22 kuşakta onda birine');await range('mgM',0.01);await has('mgStatus','34,3 kuşakta yarıya');ok((await read('mgStatus')).includes('yalnızca %1,0 göçmen'),'m küçükken yalnızca');await range('mgM',0.2);ok(!(await read('mgStatus')).includes('yalnızca'),'büyük m için yalnızca yok');await range('mgM',0.05);
   await has('msQ','0,009990');await has('msRec','0,01000');await has('msLoad','1,000·10⁻⁵');await has('moFit','0,269');await has('moEat','%21,3 / %29,2');await has('moEatN','4864');await has('moEnd','%6,9 / %1');await has('moStatus','düşüş hızından çıkardığı kuşak başına 0,1–0,2');for(const c of['migCanvas','msCanvas','mothCanvas'])await painted(c);
   await pick('mgN',100);await has('mgD50','±');await has('mgStatus','200 bağımsız');await range('mgM',0);await pick('mgN','inf');await has('mgHalf','ulaşılmadı');await range('mgP2',0.9);await has('mgHalf','tanımsız');
   await pick('msH','0.1');await has('msDom','1,000·10⁻³');await has('msStatus','μ/(hs) geçerli');await has('msStatus',"Küçük bir baskınlık bile dengeyi çekinik durumun yaklaşık 10'da birine");await has('msStatus',"0,010'un 10 katı");await pick('msH','0.5');await has('msStatus',"Eklemeli etkide heterozigot zararın yarısını taşır; denge çekinik durumun yaklaşık 50'de birine iner");await has('msStatus','μ(1 − hs)/(hs) = 1,90·10⁻⁴');ok(!(await read('msStatus')).includes('Küçük bir baskınlık'),'h = 0,5 küçük değil');await pick('msH','0.05');await has('msStatus',"5'te birine");await pick('msH','0');await has('msStatus',"%99,0'ı heterozigotlarda");await pick('msH','0.01');await pick('msMu','0.0001');await range('msS',1);await has('msStatus','Ara bölge');
   await click('moBest');eq(await page.locator('#moS').inputValue(),'0.27');await has('moSSE','10⁻⁴');await range('moS',-0.2);await has('moStatus','s = −0,20');
   await click('migReset');await has('mgHalf','6,59');await has('msQ','0,009990');eq(await page.locator('#moS').inputValue(),'0.1');await noOverflow('mig');
   // klavye ve bütünlük
   await page.locator('#tab-mig').focus();await page.keyboard.press('Home');eq(await page.locator('#tab-hw').getAttribute('aria-selected'),'true');await page.keyboard.press('ArrowLeft');eq(await page.locator('#tab-mig').getAttribute('aria-selected'),'true');await page.keyboard.press('ArrowRight');eq(await page.locator('#tab-hw').getAttribute('aria-selected'),'true');await page.keyboard.press('End');eq(await page.locator('#tab-mig').getAttribute('aria-selected'),'true');eq(await page.locator('#panel-hw').isHidden(),true);
   await page.locator('#mgM').focus();await page.keyboard.press('ArrowRight');await has('mgMOut','0,055');await page.keyboard.press('r');await has('mgMOut','0,055');
   eq(await page.evaluate(()=>Object.isFrozen(SelectionLab)&&!Object.getOwnPropertyDescriptor(window,'SelectionLab').writable),true);
   eq(await page.evaluate(()=>/[̀-ͯ]/.test(document.querySelector('main').textContent.normalize('NFC').replace(/[çÇğĞıİöÖşŞüÜ]/g,''))),false,'birleşik işaret');
   await noOverflow('son');assert.deepEqual(errors,[]);checks++;await ctx.close();}
  console.log(`G dogal-secilim: ${checks-before} gerçek arayüz kontrolü (390 px açık + 1280 px koyu) PASS`);
 }finally{await browser?.close();await new Promise(r=>server.close(r));}
}
