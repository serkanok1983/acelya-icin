// G · makine-ogrenmesi-derin-ogrenme-llm.html — kalıcı denetim.
// Çekirdek (KERNEL-BEGIN … KERNEL-END) node'da yüklenir ve sayfanın kendi formüllerini KULLANMAYAN başvurularla
// karşılaştırılır: sonlu farklarla gradyan ve Hessian, Cramer ile normal denklem, kuvvet yinelemesiyle özdeğer,
// skaler özyinelemeyle momentum oranı, burada baştan yazılmış ikinci bir ileri/geri geçiş (katman dizileriyle),
// softmax özdeşlikleri, kaba kuvvet kırpma, Map tabanlı ikili sayım.
// `--browser`: Playwright ile gerçek arayüz (390 px açık tema ve 1280 px koyu tema).
import fs from 'node:fs';
import vm from 'node:vm';
import assert from 'node:assert/strict';
import { canvasInk, canvasInkAll, assertCanvasDrawn } from './lib/canvas-check.mjs';
const SLUG='makine-ogrenmesi-derin-ogrenme-llm';
const html=fs.readFileSync(new URL(`../${SLUG}.html`,import.meta.url),'utf8');
const source=html.split('/* KERNEL-BEGIN */')[1]?.split('/* KERNEL-END */')[0];
assert(source,'KERNEL sınırları gerekli');
const context={window:{}};vm.createContext(context);vm.runInContext(source,context);
const K=context.window.MLLab;assert(K,'MLLab yok');
let checks=0;
const near=(a,e,tol=1e-10,msg='')=>{assert(Number.isFinite(a)&&Math.abs(a-e)<=tol*Math.max(1,Math.abs(e)),`${msg} ${a} ≠ ${e} (tol ${tol})`);checks++;};
const ok=(c,msg='koşul sağlanmadı')=>{assert(c,msg);checks++;};
const eq=(a,b,msg='')=>{assert.equal(a,b,msg);checks++;};
ok(Object.isFrozen(K),'MLLab dondurulmuş olmalı');

// ---------- 0) tohumlu üreteç ----------
{const a=K.rng(7),b=K.rng(7),c=K.rng(8);let same=true,diff=false,s=0,s2=0,g=0,g2=0;const N=200000;for(let i=0;i<50;i++){const x=a.u();if(x!==b.u())same=false;if(x!==c.u())diff=true;}ok(same,'aynı tohum aynı dizi');ok(diff,'farklı tohum farklı dizi');
 const r=K.rng(3);for(let i=0;i<N;i++){const u=r.u();ok(u>=0&&u<1);checks--;s+=u;s2+=u*u;const z=r.g();g+=z;g2+=z*z;}checks++;near(s/N,.5,5e-3);near(s2/N-(s/N)**2,1/12,1e-2);near(g/N,0,1e-2);near(g2/N,1,1e-2);}

// ---------- 1a) doğrusal regresyon ----------
const power=(H,it=4000)=>{let v=[1,.3];for(let i=0;i<it;i++){const w=[H[0][0]*v[0]+H[0][1]*v[1],H[1][0]*v[0]+H[1][1]*v[1]],n=Math.hypot(...w);v=[w[0]/n,w[1]/n];}return v[0]*(H[0][0]*v[0]+H[0][1]*v[1])+v[1]*(H[1][0]*v[0]+H[1][1]*v[1]);};
for(const seed of[1,2,3,7,13,20]){const d=K.regData(seed);eq(d.n,24);ok(d.x.every(x=>x>=-1&&x<=3));
 // normal denklem: Cramer ile (XᵀX)θ = Xᵀy
 let a=0,b=0,c=0,p=0,q=0;for(let i=0;i<24;i++){a+=d.x[i]**2;b+=d.x[i];c+=1;p+=d.x[i]*d.y[i];q+=d.y[i];}const det=a*c-b*b,wN=(p*c-b*q)/det,bN=(a*q-b*p)/det,o=K.regNormal(d);near(o.w,wN,1e-12);near(o.b,bN,1e-12);
 const L=(w,bb)=>{let s=0;for(let i=0;i<24;i++)s+=(w*d.x[i]+bb-d.y[i])**2;return s/24;};near(o.loss,L(wN,bN),1e-12);
 // en küçük olduğunun doğrudan sınaması ve gradyanın sıfırlığı
 for(const[dw,db]of[[.01,0],[-.01,0],[0,.01],[0,-.01],[.007,-.004]])ok(L(wN+dw,bN+db)>o.loss);const g0=K.regGrad(d,o.w,o.b);near(g0[0],0,1e-12);near(g0[1],0,1e-12);
 // gradyan ↔ merkezî fark; Hessian ↔ ikinci fark
 for(const[w,bb]of[[-.5,2.5],[0,0],[3,-2],[1.3,.4]]){const g=K.regGrad(d,w,bb),h=1e-5;near(g[0],(L(w+h,bb)-L(w-h,bb))/(2*h),1e-7);near(g[1],(L(w,bb+h)-L(w,bb-h))/(2*h),1e-7);near(K.regLoss(d,w,bb),L(w,bb),1e-13);}
 const h=1e-3,Hfd=[[(L(1+h,1)-2*L(1,1)+L(1-h,1))/h/h,(L(1+h,1+h)-L(1+h,1-h)-L(1-h,1+h)+L(1-h,1-h))/4/h/h],[0,(L(1,1+h)-2*L(1,1)+L(1,1-h))/h/h]];Hfd[1][0]=Hfd[0][1];const H=K.regHessian(d);near(H.hww,Hfd[0][0],1e-6);near(H.hwb,Hfd[0][1],1e-6);near(H.hbb,Hfd[1][1],1e-6);
 const lmax=power(Hfd),tr=Hfd[0][0]+Hfd[1][1],lmin=tr-lmax;near(H.lmax,lmax,1e-6);near(H.lmin,lmin,1e-5);ok(H.lmin>0);
 // kararlılık eşiği: ölçüm (gerçek koşu + ikiye bölme) ↔ 2(1+β)/λ_max (λ kuvvet yinelemesinden)
 for(const beta of[0,.5,.9]){const m=K.regEtaCritMeasured(d,beta);near(m,2*(1+beta)/lmax,2e-5,'eşik');near(K.regEtaCritTheory(H,beta),2*(1+beta)/lmax,1e-6);
  const below=K.regRun(d,{w0:-.5,b0:2.5,eta:m*.98,beta,steps:3000}),above=K.regRun(d,{w0:-.5,b0:2.5,eta:m*1.02,beta,steps:3000}),Db=K.regDist(below,o),Da=K.regDist(above,o);ok(below.complete&&Db[3000]<1e-6*Db[0],'eşiğin altında yakınsar');ok(!above.complete||Da[Da.length-1]>1e6*Da[0],'eşiğin üstünde ıraksar');}
 // daralma oranı: ölçülen ↔ kuram ↔ bağımsız skaler özyineleme
 for(const beta of[0,.5,.9])for(const eta of[.02,.05,.1,.2,.28]){const th=K.regRateTheory(H,eta,beta);
  const mode=l=>{let e0=1,e1=1+0-eta*l*1;/* e₁ = e₀ + v₁, v₁ = −ηλe₀ */e1=1-eta*l;let prev=e0,cur=e1,logs=0,cnt=0;for(let k=2;k<4000;k++){const nx=(1+beta-eta*l)*cur-beta*prev;prev=cur;cur=nx;const s=Math.hypot(prev,cur);if(k>=2000){logs+=0;cnt++;}if(s>1e100||s<1e-100){prev/=s;cur/=s;logs+=Math.log(s);}}return logs;};
  // skaler modda uzun dönem büyüme oranı: log normunun eğimi
  const rate=l=>{let prev=1,cur=1-eta*l,acc=0;const n=6000;for(let k=1;k<n;k++){const nx=(1+beta-eta*l)*cur-beta*prev;prev=cur;cur=nx;const s=Math.hypot(prev,cur);prev/=s;cur/=s;acc+=Math.log(s);}return Math.exp(acc/(n-1));};void mode;
  near(th,Math.max(rate(lmax),rate(lmin)),3e-3,'oran kuramı');
  const run=K.regRun(d,{w0:-.5,b0:2.5,eta,beta,steps:3000}),rm=K.regRateMeasured(K.regDist(run,o));ok(rm!==null);near(rm,th,beta?0.06:2e-4,`ölçülen oran s${seed} β${beta} η${eta}`);}
 // iniş çözümü ↔ normal denklem
 const run=K.regRun(d,{w0:-.5,b0:2.5,eta:.1,beta:0,steps:3000});ok(run.complete);near(run.w[3000],wN,1e-11);near(run.b[3000],bN,1e-11);near(run.loss[3000],o.loss,1e-12);
 // mini yığın: bir devirdeki yığın gradyanlarının ortalaması tam gradyana eşittir (yansızlık); yol optimuma oturmaz
 for(const B of[8,4,1]){const g=K.regGrad(d,.3,1.1);let sw=0,sb=0;const idx=Array.from({length:24},(_,i)=>i);for(let s=0;s<24;s+=B){const gg=K.regGrad(d,.3,1.1,idx.slice(s,s+B));sw+=gg[0];sb+=gg[1];}near(sw/(24/B),g[0],1e-12);near(sb/(24/B),g[1],1e-12);
  const tail=eta=>{const r=K.regRun(d,{w0:-.5,b0:2.5,eta,batch:B,steps:3000,seed}),D=K.regDist(r,o);let s=0;for(let k=2501;k<=3000;k++)s+=D[k]*D[k];return Math.sqrt(s/500);};const t1=tail(.05),t2=tail(.0125);ok(t1>1e-3,'gürültülü yol tam oturmaz');ok(t2<t1,'η küçülünce bulut daralır');
  const r1=K.regRun(d,{w0:-.5,b0:2.5,eta:.05,batch:B,steps:200,seed}),r2=K.regRun(d,{w0:-.5,b0:2.5,eta:.05,batch:B,steps:200,seed});near(r1.w[200],r2.w[200],0);}
}
{const d=K.regData(1),H=K.regHessian(d),o=K.regNormal(d);near(o.w,1.1844,1e-4);near(o.b,.7687,1e-4);near(o.loss,.2818,2e-4);near(H.lmax,6.882,1e-4);near(H.lmin,.886,1e-3);near(2/H.lmax,.2906,2e-4);
 near(K.regRateTheory(H,.1,0),.9114,1e-4);near(K.regRateTheory(H,.25,0),Math.max(Math.abs(1-.25*H.lmax),Math.abs(1-.25*H.lmin)),1e-12);near(Math.abs(1-.25*H.lmax),.7206,1e-4);ok(K.regRateTheory(H,.3,0)>1);ok(K.regRateTheory(H,.25,0)<1);
 const div=K.regRun(d,{w0:-.5,b0:2.5,eta:.3,beta:0,steps:3000});ok(K.regDist(div,o).at(-1)>1e50,'η = 0,3 ıraksar');}

// ---------- 1b) iki çukurlu kayıp ----------
{const f=x=>x**4-3*x*x+x,fd=x=>(f(x+1e-6)-f(x-1e-6))/2e-6,bis=(a,b)=>{for(let i=0;i<80;i++){const m=(a+b)/2;if((fd(a)<0)===(fd(m)<0))a=m;else b=m;}return(a+b)/2;},ref=[bis(-2,-1),bis(-.5,.6),bis(.8,2)],c=K.ncCritical();
 for(let i=0;i<3;i++){near(c[i],ref[i],1e-7);near(K.ncF(c[i]),f(c[i]),1e-12);}for(const x of[-2,-1.3,0,.17,1.1,2]){near(K.ncD(x),fd(x),1e-6);near(K.ncD2(x),(f(x+1e-4)-2*f(x)+f(x-1e-4))/1e-8,1e-5);}
 ok(K.ncD2(c[0])>0&&K.ncD2(c[1])<0&&K.ncD2(c[2])>0);ok(f(c[0])<f(c[2]),'sol çukur genel minimum');near(c[0],-1.3008,1e-4);near(c[1],.16994,1e-4);near(c[2],1.1309,1e-4);near(f(c[0]),-3.5139,1e-4);near(f(c[2]),-1.0702,1e-4);
 for(const eta of[.005,.01,.02,.05,.07,.1,.13]){near(K.ncBoundaryMeasured(eta),ref[1],1e-9,'havza sınırı');}
 for(const eta of[.15,.18,.25])eq(K.ncBoundaryMeasured(eta),null);
 near(K.ncEtaCritMeasured(0),2/K.ncD2(c[0]),1e-5);near(K.ncEtaCritMeasured(2),2/K.ncD2(c[2]),1e-5);near(2/(12*ref[0]**2-6),.1398,1e-4);near(2/(12*ref[2]**2-6),.214,1e-3);
 for(const x0 of[-2,-1,-.5,.15]){const r=K.ncRun(x0,.02);eq(r.state,'left');near(r.end,ref[0],1e-7);ok(r.settled>0);}
 for(const x0 of[.2,.5,1,2]){const r=K.ncRun(x0,.02);eq(r.state,'right');near(r.end,ref[2],1e-7);}
 eq(K.ncRun(2,.1).state,'left');eq(K.ncRun(-1,.15).state,'unsettled');eq(K.ncRun(1,.15).state,'right');eq(K.ncRun(-2,.3).state,'diverged');
 // her adım gerçekten x − η f′(x)
 const r=K.ncRun(.5,.02);for(let k=0;k<20;k++)near(r.xs[k+1],r.xs[k]-.02*fd(r.xs[k]),1e-8);}

// ---------- 2) sinir ağı: bağımsız ikinci ileri/geri geçiş ----------
const sig=z=>1/(1+Math.exp(-z));
function refNet(net){const Ws=[],bs=[];for(let l=0;l<net.L;l++){const m=net.sizes[l],n=net.sizes[l+1];Ws.push(Array.from({length:n},(_,j)=>Array.from({length:m},(_,i)=>net.theta[net.offW[l]+j*m+i])));bs.push(Array.from({length:n},(_,j)=>net.theta[net.offB[l]+j]));}return{Ws,bs};}
function refPass(net,X,y,l2){const{Ws,bs}=refNet(net),L=Ws.length,act=net.act,f=z=>act==='tanh'?(Math.exp(z)-Math.exp(-z))/(Math.exp(z)+Math.exp(-z)):act==='sigmoid'?sig(z):Math.max(0,z),fp=z=>act==='tanh'?1-f(z)**2:act==='sigmoid'?sig(z)*(1-sig(z)):(z>0?1:0);
 const gW=Ws.map(W=>W.map(r=>r.map(()=>0))),gb=bs.map(b=>b.map(()=>0));let loss=0,hit=0;
 X.forEach((x,n)=>{const as=[x],zs=[];for(let l=0;l<L;l++){const z=Ws[l].map((row,j)=>row.reduce((s,w,i)=>s+w*as[l][i],bs[l][j]));zs.push(z);as.push(l<L-1?z.map(f):z);}const p=sig(zs[L-1][0]);loss+=-(y[n]?Math.log(p):Math.log(1-p));if((p>.5?1:0)===y[n])hit++;
  let dz=[p-y[n]];for(let l=L-1;l>=0;l--){dz.forEach((dj,j)=>{gb[l][j]+=dj/X.length;as[l].forEach((ai,i)=>{gW[l][j][i]+=dj*ai/X.length;});});if(l>0){const da=as[l].map((_,i)=>dz.reduce((s,dj,j)=>s+dj*Ws[l][j][i],0));dz=da.map((v,i)=>v*fp(zs[l-1][i]));}}});
 let reg=0;Ws.forEach((W,l)=>W.forEach((row,j)=>row.forEach((w,i)=>{reg+=w*w;gW[l][j][i]+=l2*w;})));const flat=[];for(let l=0;l<L;l++){gW[l].forEach(r=>flat.push(...r));flat.push(...gb[l]);}return{loss:loss/X.length,total:loss/X.length+.5*l2*reg,acc:hit/X.length,grad:flat};}
for(const act of['tanh','sigmoid','relu'])for(const hidden of[[],[1],[4],[8],[3,5],[8,8]])for(const l2 of[0,.01]){const data=K.nnData(['xor','circles','spirals','blobs'][hidden.length+(l2?1:0)],3,40,.1),net=K.netCreate({hidden,act,seed:5});
 // eşikleri de sıfırdan farklı yap ki sınanabilsin
 const r0=K.rng(99);for(let i=0;i<net.P;i++)if(!K.netIsWeight(net,i))net.theta[i]=.3*r0.g();
 eq(net.P,[2,...hidden,1].slice(0,-1).reduce((s,m,i)=>s+(m+1)*[...hidden,1][i],0),'parametre sayısı');
 const a=K.netLossGrad(net,data.X,data.y,l2),b=refPass(net,data.X,data.y,l2);near(a.loss,b.loss,1e-11,'kayıp');near(a.total,b.total,1e-11);near(a.acc,b.acc,0);near(K.netTotal(net,data.X,data.y,l2),b.total,1e-11);
 eq(a.grad.length,b.grad.length);for(let i=0;i<net.P;i++)ok(Math.abs(a.grad[i]-b.grad[i])<=1e-11*Math.max(1,Math.abs(b.grad[i])),`geri yayılım ${act} ${hidden} #${i}: ${a.grad[i]} ≠ ${b.grad[i]}`);
 // sonlu fark: sayfanın gradCheck'i ve burada ayrı bir merkezî fark
 let worst=0;for(let i=0;i<net.P;i++){const gc=K.gradCheck(net,data.X,data.y,l2,i);near(gc.analytic,a.grad[i],1e-13);const t=net.theta[i],h=1e-5;net.theta[i]=t+h;const lp=refPass(net,data.X,data.y,l2).total;net.theta[i]=t-h;const lm=refPass(net,data.X,data.y,l2).total;net.theta[i]=t;const numf=(lp-lm)/(2*h);ok(Math.abs(numf-a.grad[i])<2e-8,`sonlu fark ${act} ${hidden} #${i}`);ok(Math.abs(gc.numeric-numf)<2e-9);if(gc.rel!==null)worst=Math.max(worst,gc.rel);}ok(worst<(act==='relu'?1e-3:2e-5),`en büyük bağıl hata ${worst}`);
 for(const x of[[0,0],[.5,-.7],[-1.2,1.2]]){const{Ws,bs}=refNet(net);void Ws;void bs;near(K.netProb(net,x),sig(K.netLogit(net,x)),1e-14);ok(K.netProb(net,x)>0&&K.netProb(net,x)<1);}
 const names=new Set();for(let i=0;i<net.P;i++)names.add(K.netName(net,i));eq(names.size,net.P,'parametre adları tekil');}
// softplus ve güncelleme kuralları
for(const z of[-800,-30,-1,0,1,30,800])near(K.softplus(z),z>30?z:Math.log(1+Math.exp(z)),1e-12);
{const net=K.netCreate({hidden:[3],act:'tanh',seed:2}),g=Float64Array.from({length:net.P},(_,i)=>Math.sin(i+1)),t0=Float64Array.from(net.theta);
 let o=K.optCreate(net,'sgd');K.optStep(net,o,g,.1);for(let i=0;i<net.P;i++)near(net.theta[i],t0[i]-.1*g[i],1e-14);
 net.theta.set(t0);o=K.optCreate(net,'momentum');K.optStep(net,o,g,.1);K.optStep(net,o,g,.1);for(let i=0;i<net.P;i++)near(net.theta[i],t0[i]-.1*g[i]-(.9*.1*g[i]+.1*g[i]),1e-13);
 net.theta.set(t0);o=K.optCreate(net,'adam');K.optStep(net,o,g,.01);for(let i=0;i<net.P;i++)near(net.theta[i],t0[i]-.01*Math.sign(g[i]),1e-6,'Adam ilk adım ≈ η·işaret');
 K.optStep(net,o,g.map(v=>2*v),.01);for(let i=0;i<net.P;i++){const m=(.9*.1*g[i]+.1*2*g[i])/(1-.81),v=(.999*.001*g[i]**2+.001*4*g[i]**2)/(1-.999**2);near(net.theta[i],t0[i]-.01*Math.sign(g[i])/(1+1e-8/Math.abs(g[i]))-.01*m/(Math.sqrt(v)+1e-8),1e-9);}}
// veri kümeleri
for(const kind of['blobs','xor','circles','spirals'])for(const seed of[1,5,12]){const d=K.nnData(kind,seed,80,.1);eq(d.X.length,80);eq(d.y.filter(v=>v===1).length,40,'sınıflar dengeli');ok(d.X.every(p=>Math.abs(p[0])<2.5&&Math.abs(p[1])<2.5));const e=K.nnData(kind,seed,80,.1);near(e.X[17][0],d.X[17][0],0);ok(K.nnData(kind,seed+101,80,.1).X[17][0]!==d.X[17][0]);}
{const d=K.nnData('xor',1,200,0);ok(d.X.every((p,i)=>((p[0]*p[1]<0)?1:0)===d.y[i]),'XOR etiketi: işaretler zıtsa 1');const c=K.nnData('circles',1,200,0);ok(c.X.every((p,i)=>(Math.hypot(...p)>.5?1:0)===c.y[i]),'halkalar yarıçapla ayrılır');}
// eğitim davranışı (tohumlu, tam yığın → yinelenebilir)
function train(kind,o){const tr=K.nnData(kind,o.seed,o.n,o.noise),te=K.nnData(kind,o.seed+101,200,o.noise),net=K.netCreate({hidden:o.hidden,act:o.act||'tanh',seed:o.seed}),opt=K.optCreate(net,o.opt||'adam');let minTe=Infinity,minAt=0;const first=K.netEval(net,tr.X,tr.y).loss;for(let s=1;s<=o.steps;s++){K.optStep(net,opt,K.netLossGrad(net,tr.X,tr.y,o.l2||0).grad,o.eta||.03);const b=K.netEval(net,te.X,te.y).loss;if(b<minTe){minTe=b;minAt=s;}}return{first,tr:K.netEval(net,tr.X,tr.y),te:K.netEval(net,te.X,te.y),minTe,minAt,net,data:tr};}
for(const seed of[1,2,3,4,5]){const r=train('xor',{seed,n:80,noise:.1,hidden:[],steps:1500});ok(r.tr.acc<=.75,`gizli katmansız XOR doğruluğu ≤ %75 (tohum ${seed}: ${r.tr.acc})`);ok(r.tr.loss>.6&&r.tr.loss<=Math.LN2+1e-9,`gizli katmansız XOR kaybı ln 2 dolayında: ${r.tr.loss}`);
 // hiçbir doğru XOR'u ayıramaz: rastgele 4000 doğruyla kaba kuvvet
 const rr=K.rng(seed);let best=0;for(let q=0;q<4000;q++){const a=rr.g(),b=rr.g(),c=.8*rr.g();let hit=0;r.data.X.forEach((p,i)=>{if(((a*p[0]+b*p[1]+c>0)?1:0)===r.data.y[i])hit++;});best=Math.max(best,hit/80);}ok(best<=.8,`kaba kuvvet doğrusal sınır: ${best}`);
 const h=train('xor',{seed,n:80,noise:.1,hidden:[4],steps:600});ok(h.tr.acc>=.97,`4 gizli nöron XOR'u çözer (tohum ${seed}: ${h.tr.acc})`);ok(h.te.acc>=.9);
 const bl=train('blobs',{seed,n:80,noise:.1,hidden:[],steps:600});ok(bl.tr.acc>=.95,'doğrusal ayrılabilir öbekler gizli katmansız çözülür');}
{const r=train('xor',{seed:1,n:80,noise:.1,hidden:[4],steps:500});near(r.first,.7259,2e-3,'başlangıç kaybı');near(r.tr.loss,.0146,.03,'500 adım eğitim kaybı');near(r.te.loss,.0926,.03,'500 adım test kaybı');eq(r.tr.acc,1);near(r.te.acc,.96,.011);
 const s=train('spirals',{seed:1,n:200,noise:0,hidden:[8,8],steps:2000});ok(s.tr.acc>=.99,'iki sarmal 2×8 tanh ile çözülür');ok(s.te.acc>=.97);
 const lin=train('spirals',{seed:1,n:200,noise:0,hidden:[],steps:1000});ok(lin.tr.acc<.75,'sarmal doğrusal sınırla çözülmez');
 const o=train('xor',{seed:1,n:24,noise:.3,hidden:[8,8],steps:2000});eq(o.tr.acc,1);ok(o.te.loss>2*o.minTe&&o.minAt<1000,`aşırı öğrenme: test kaybı ${o.minTe} → ${o.te.loss}`);ok(o.te.acc<.85);
 const reg=train('xor',{seed:1,n:24,noise:.3,hidden:[8,8],steps:2000,l2:.01});ok(reg.te.loss<o.te.loss/2,'L2 test kaybını düşürür');ok(K.netReg(reg.net)<K.netReg(o.net)/2,'L2 ağırlıkları küçültür');}

// ---------- 3a) softmax ----------
{const z=[2,1.5,1,.2,-.5,-1];for(const T of[.05,.1,.5,1,2,5]){const p=K.softmax(z,T);near(p.reduce((a,b)=>a+b,0),1,1e-13);const q=K.softmax(z.map(v=>v+123.4),T);p.forEach((v,i)=>near(q[i],v,1e-10,'kaydırma değişmezliği'));for(let i=0;i<5;i++)near(Math.log(p[i]/p[i+1]),(z[i]-z[i+1])/T,1e-9,'log-oran özdeşliği');const H=K.entropyBits(p);ok(H>=0&&H<=Math.log2(6)+1e-12);}
 near(K.softmax(z,1)[0],.4402,2e-4);near(K.entropyBits(K.softmax(z,1)),2.024,5e-4);ok(K.softmax(z,.05)[0]>.9999,'T → 0: argmax');ok(K.entropyBits(K.softmax(z,1e6))>Math.log2(6)-1e-9,'T → ∞: tekdüze');ok(K.softmax([1000,0,-1000],1).every(Number.isFinite));near(K.softmax([3,3,3,3],.7)[2],.25,1e-14);
 // entropi sıcaklıkla artar
 let prev=-1;for(let T=.05;T<=5;T+=.05){const H=K.entropyBits(K.softmax(z,T));ok(H>prev);prev=H;}
 // kırpma: kaba kuvvet
 const p=K.softmax(z,1),ord=p.map((v,i)=>[v,i]).sort((a,b)=>b[0]-a[0]);for(let k=1;k<=6;k++)for(let tp=.05;tp<=1.0001;tp+=.05){let m=6,c=0;for(let j=0;j<6;j++){c+=ord[j][0];if(c>=tp-1e-12){m=j+1;break;}}m=Math.min(m,k);const t=K.truncate(p,k,tp);eq(t.size,m);eq(t.kept.filter(Boolean).length,m);near(t.q.reduce((a,b)=>a+b,0),1,1e-13);for(let j=0;j<6;j++){eq(t.kept[ord[j][1]],j<m);if(j<m)near(t.q[ord[j][1]],ord[j][0]/t.mass,1e-13);else eq(t.q[ord[j][1]],0);}}
 eq(K.truncate(p,6,.9).size,4);near(K.truncate(p,6,.9).mass,.9420,2e-4);eq(K.truncate(p,6,1).size,6);eq(K.truncate(K.softmax(z,.05),6,1).size,6,'top-p = 1 hiçbir adayı kesmez');eq(K.truncate(p,1,1).size,1);
 // örnekleme: toplam, yinelenebilirlik, sapma ölçeği, χ²
 for(const N of[100,1000,10000,100000]){let big=0;for(let seed=1;seed<=20;seed++){const c=K.sampleCounts(p,N,seed);eq(c.reduce((a,b)=>a+b,0),N);if(seed<3)eq(K.sampleCounts(p,N,seed).join(),c.join());let dev=0,sc=0;for(let i=0;i<6;i++){dev=Math.max(dev,Math.abs(c[i]/N-p[i]));sc=Math.max(sc,Math.sqrt(p[i]*(1-p[i])/N));}ok(dev<4.5*sc,`N=${N} tohum ${seed}: sapma ${dev} ölçek ${sc}`);const x=K.chi2(c,p,N);eq(x.df,5);let ref=0;for(let i=0;i<6;i++)ref+=(c[i]-N*p[i])**2/(N*p[i]);near(x.chi2,ref,1e-12);ok(x.chi2<25,'χ² aşırı değil');big+=x.chi2;}near(big/20,5,.5,`χ² ortalaması ≈ sd (N=${N})`);}
 {const t=K.truncate(p,3,1),c=K.sampleCounts(t.q,5000,4);eq(c[3]+c[4]+c[5],0,'kesilen adaydan örnek çıkmaz');eq(K.chi2(c,t.q,5000).df,2);const one=K.truncate(p,1,1);eq(K.sampleCounts(one.q,300,2)[0],300);eq(K.chi2(K.sampleCounts(one.q,300,2),one.q,300).df,0);}
 // sapma 1/√N ile küçülür
 {const avg=N=>{let s=0;for(let seed=1;seed<=20;seed++){const c=K.sampleCounts(p,N,seed);s+=Math.max(...c.map((v,i)=>Math.abs(v/N-p[i])));}return s/20;};const r=avg(100)/avg(10000);ok(r>6&&r<16,`sapma oranı ${r} ≈ 10`);}
 // çapraz entropi ve gradyanı
 for(const T of[.3,1,2.5])for(let t=0;t<6;t++){const pp=K.softmax(z,T);near(K.xent(z,T,t),-Math.log(pp[t]),1e-11);const ga=K.xentGrad(z,T,t),gn=K.xentGradNum(z,T,t);near(ga.reduce((a,b)=>a+b,0),0,1e-12,'gradyan toplamı 0');for(let i=0;i<6;i++){near(ga[i],(pp[i]-(i===t?1:0))/T,1e-13);const a=z.slice(),b=z.slice();a[i]+=1e-6;b[i]-=1e-6;const fdv=(-Math.log(K.softmax(a,T)[t])+Math.log(K.softmax(b,T)[t]))/2e-6;ok(Math.abs(ga[i]-fdv)<1e-8);ok(Math.abs(gn[i]-ga[i])<1e-9);}}
 near(K.xent(z,1,0),.8205,2e-4);near(K.xent([0,-2000],1,1),2000,1e-12,'taşmadan büyük kayıp');}

// ---------- 3b) dikkat ----------
{const Q=[[1,0],[0,1],[1,1],[2,-.5]],Kk=[[2,0],[0,2],[-1,-1],[1,.5]],V=[[1,0],[0,1],[-1,0],[.5,.5]];
 for(const scaled of[true,false]){const A=K.attention(Q,Kk,V,scaled);for(let i=0;i<4;i++){const sc=Kk.map(k=>(Q[i][0]*k[0]+Q[i][1]*k[1])/(scaled?Math.SQRT2:1)),e=sc.map(Math.exp),s=e.reduce((a,b)=>a+b,0);near(A.weights[i].reduce((a,b)=>a+b,0),1,1e-13);for(let j=0;j<4;j++){near(A.scores[i][j],sc[j],1e-13);near(A.weights[i][j],e[j]/s,1e-12);}for(let c=0;c<2;c++)near(A.out[i][c],e.reduce((a,w,j)=>a+w/s*V[j][c],0),1e-12);}}
 const S=K.attention(Q,Kk,V,true),U=K.attention(Q,Kk,V,false);near(S.weights[3][0],.798,1e-3);for(let i=0;i<4;i++)ok(K.entropyBits(S.weights[i])>=K.entropyBits(U.weights[i])-1e-12,'ölçek dağılımı yumuşatır');
 // ölçekli = sorguları √d_k'ya bölüp ölçeksiz hesaplamak
 const U2=K.attention(Q.map(q=>q.map(v=>v/Math.SQRT2)),Kk,V,false);for(let i=0;i<4;i++)for(let j=0;j<4;j++)near(U2.weights[i][j],S.weights[i][j],1e-13);
 // sıfır sorgu → tekdüze ağırlık → çıktı değerlerin ortalaması
 const Z=K.attention([[0,0]],Kk,V,true);Z.weights[0].forEach(w=>near(w,.25,1e-14));near(Z.out[0][0],.125,1e-14);near(Z.out[0][1],.375,1e-14);
 // anahtarların sırasını değiştirmek ağırlıkları aynı biçimde değiştirir
 const P=K.attention(Q,[Kk[2],Kk[0],Kk[3],Kk[1]],[V[2],V[0],V[3],V[1]],true);for(let i=0;i<4;i++){near(P.weights[i][0],S.weights[i][2],1e-13);for(let c=0;c<2;c++)near(P.out[i][c],S.out[i][c],1e-12);}
 let prevMax=0,prevH=9;for(const e of[1,2,3,4,5,6,7,8,9]){const dk=2**e;for(const seed of[1,2,3]){const st=K.dotStats(dk,seed);near(st.std,Math.sqrt(dk),.06,`q·k saçılımı d_k=${dk}`);ok(Math.abs(st.mean)<.08*Math.sqrt(dk));ok(st.hScaled>1.75&&st.hScaled<2.05,'ölçekli entropi boyuttan bağımsız');ok(st.maxScaled>.4&&st.maxScaled<.5);if(seed===1){ok(st.maxRaw>prevMax,'ölçeksiz dikkat boyutla keskinleşir');ok(st.hRaw<prevH);prevMax=st.maxRaw;prevH=st.hRaw;}}}
 const st=K.dotStats(64,1);near(st.std,8.095,1e-3);near(st.maxRaw,.899,2e-3);near(st.maxScaled,.463,2e-3);}

// ---------- 3c) ikili dil modeli ----------
{const AL=K.LM_ALPHABET;eq(AL.length,31);eq(new Set(AL).size,31);eq(K.lmNormalize('İstanbul, IŞIK!  Çok\ngüzel 3 kâr.'),'istanbul ışık çok güzel kar.');eq(K.lmNormalize('  ?!  '),'');
 const t=K.lmNormalize(K.LM_TRAIN);eq(t.length,1030);ok([...t].every(c=>AL.includes(c)));const cn=K.bigramCounts(t);eq(cn.pairs,1029);
 // Map ile bağımsız sayım
 const mp=new Map(),rowc=new Map();for(let i=0;i+1<t.length;i++){const k=t[i]+t[i+1];mp.set(k,(mp.get(k)||0)+1);rowc.set(t[i],(rowc.get(t[i])||0)+1);}let tot=0;for(let a=0;a<31;a++)for(let b=0;b<31;b++){eq(cn.C[a*31+b],mp.get(AL[a]+AL[b])||0);tot+=cn.C[a*31+b];}eq(tot,1029);
 let hc=0;for(const[k,c]of mp)hc-=c/1029*Math.log2(c/rowc.get(k[0]));near(K.condEntropyBits(cn.C),hc,1e-12);near(hc,3.0806,1e-4);
 const uni=new Map();for(const c of t)uni.set(c,(uni.get(c)||0)+1);let hu=0;for(const c of uni.values())hu-=c/1030*Math.log2(c/1030);near(K.unigramBits(cn.uni),hu,1e-12);ok(hc<hu&&hu<Math.log2(31),'bağlam bilgisi entropiyi düşürür');near(hu,4.4396,1e-4);
 for(const alpha of[.001,.01,.1,.5,1]){const P=K.bigramProbs(cn.C,alpha);for(let a=0;a<31;a++){let s=0;for(let b=0;b<31;b++){s+=P[a*31+b];ok(P[a*31+b]>0);near(P[a*31+b],((mp.get(AL[a]+AL[b])||0)+alpha)/((rowc.get(AL[a])||0)+31*alpha),1e-13);}near(s,1,1e-12);}
  let ce=0;for(let i=0;i+1<t.length;i++)ce-=Math.log2(P[AL.indexOf(t[i])*31+AL.indexOf(t[i+1])]);near(K.lmXentBits(P,t),ce/1029,1e-12);ok(ce/1029>hc,'düzleştirilmiş model eğitim metninde koşullu entropinin altına inemez (Gibbs)');}
 near(K.lmXentBits(K.bigramProbs(cn.C,1e-9),t),hc,1e-6,'α → 0: çapraz entropi = koşullu entropi');
 const P=K.bigramProbs(cn.C,.1),held=K.lmNormalize(K.LM_HELD);near(K.lmXentBits(P,t),3.1634,1e-4);near(K.lmXentBits(P,held),3.6714,1e-4);ok(K.lmXentBits(P,held)>K.lmXentBits(P,t));eq(K.lmXentBits(P,'a'),null);
 near(K.lmXentBits(K.bigramProbs(new Float64Array(961),1),held),Math.log2(31),1e-12,'boş sayım → tekdüze model');
 // üretim: yinelenebilir, alfabe içinde, düşük sıcaklıkta eğitim ikililerine sadık
 for(const T of[.3,1,2]){const g=K.lmGenerate(P,{start:0,len:400,T,seed:1});eq(g,K.lmGenerate(P,{start:0,len:400,T,seed:1}));eq(g.length,400);ok([...g].every(c=>AL.includes(c)));ok(g!==K.lmGenerate(P,{start:0,len:400,T,seed:2}));}
 const seen=g=>{let s=0,prev=' ';for(const c of g){if(mp.has(prev+c))s++;prev=c;}return s/g.length;};const cold=seen(K.lmGenerate(P,{start:0,len:2000,T:.3,seed:1})),hot=seen(K.lmGenerate(P,{start:0,len:2000,T:2,seed:1}));ok(cold>.99&&hot<.9&&hot<cold,`görülmüş ikili oranı soğuk ${cold} sıcak ${hot}`);
 // T = 1'de üretilen ikili sıklıkları geçiş olasılıklarına yaklaşır
 {const g=K.lmGenerate(P,{start:0,len:200000,T:1,seed:3}),a=AL.indexOf('a');let na=0,nr=0;for(let i=0;i+1<g.length;i++)if(g[i]==='a'){na++;if(g[i+1]==='r')nr++;}near(nr/na,P[a*31+AL.indexOf('r')],.03,'örnekleme geçiş olasılığını izler');}}
console.log(`G makine öğrenmesi: ${checks.toLocaleString('tr-TR')} bağımsız çekirdek denetimi PASS`);

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
   await page.goto(`http://127.0.0.1:${server.address().port}/${SLUG}.html`,{waitUntil:'load'});await page.waitForTimeout(400);
   const soft=!!process.env.ML_SOFT,click=id=>page.locator('#'+id).click(),read=async id=>(await page.locator('#'+id).textContent()).trim(),has=async(id,t)=>{const s=await read(id);if(soft){if(!s.includes(t))console.log(`[${width}] #${id}: "${s}" içinde "${t}" yok`);}else assert(s.includes(t),`[${width}] #${id}: "${s}" içinde "${t}" yok`);checks++;},
    range=(id,v)=>page.locator('#'+id).evaluate((e,v)=>{e.value=v;e.dispatchEvent(new Event('input',{bubbles:true}));},v),sel=(id,v)=>page.locator('#'+id).selectOption(String(v)),
    box=async(id,v)=>{await page.locator('#'+id).fill(v);await page.locator('#'+id).dispatchEvent('change');},
    clean=async panel=>{const t=await page.locator('#'+panel).innerText();ok(!/(^|[\s(=%])-\d/.test(t),`[${width}] ${panel}: eksi işareti U+2212 olmalı: ${(t.match(/.{0,20}[\s(=%]-\d.{0,10}/)||[''])[0]}`);ok(!/NaN|undefined|Infinity|\bnull\b/.test(t),`[${width}] ${panel}: bozuk sayı metni: ${(t.match(/.{0,40}(NaN|undefined|Infinity|null).{0,20}/)||[''])[0]}`);},
    noOverflow=async()=>eq(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),true,`[${width}] yatay taşma`),
    painted=async id=>ok(assertCanvasDrawn(await canvasInk(page,'#'+id),{minDistinct:4,label:`[${width}] ${id}`}),`[${width}] ${id} boş`);
   eq(await page.title(),'Makine Öğrenmesi: Gradyan İnişi, Sinir Ağları ve Dil Modelleri');eq(await page.evaluate(()=>Object.isFrozen(MLLab)&&!Object.getOwnPropertyDescriptor(window,'MLLab').writable),true);
   // her denetimin etiketi, her tuvalin rolü
   eq(await page.evaluate(()=>[...document.querySelectorAll('.app-content input,.app-content select')].filter(e=>!e.labels||!e.labels.length).map(e=>e.id).join()),'','etiketsiz denetim');
   eq(await page.evaluate(()=>[...document.querySelectorAll('.app-content canvas')].filter(c=>c.getAttribute('role')!=='img'||!c.getAttribute('aria-label')).length),0);
   eq(await page.evaluate(()=>/[̀-ͯ]/.test(document.querySelector('.app-content').innerText.normalize('NFC'))),false,'birleşik işaret yok');

   // ---- 01 gradyan inişi ----
   await has('gdK','0 / 3.000');await has('gdNow','w = −0,5 · b = 2,5');await has('gdMeans','⟨x⟩ = 1,1661 · ⟨x²⟩ = 2,8842 · ⟨y⟩ = 2,1498 · ⟨xy⟩ = 4,3124');await has('gdLoss','4,6612');await has('gdEcT','0,2906');await has('gdEcM','0,2906');await has('gdRateT','0,9114');await has('gdRateM','0,9114');await has('gdSolWT','1,1844');await has('gdSolWM','1,1844');await has('gdSolBT','0,7687');await has('gdSolLT','0,2818');await has('gdSolLM','0,2818');await has('gdStatus','Tekdüze yakınsama');await has('gdStatus','75 adım');
   await click('gdStep');await has('gdK','1 / 3.000');await click('gdStep');await has('gdK','2 / 3.000');await click('gdEnd');await has('gdK','3.000 / 3.000');await has('gdNow','w = 1,184 · b = 0,769');await has('gdLoss','0,2818');await click('gdRestart');await has('gdK','0 / 3.000');
   await click('gdRun');eq(await page.locator('#gdRun').getAttribute('aria-pressed'),'true');await page.waitForTimeout(700);await click('gdRun');{const k=parseInt(await read('gdK'));ok(k>=6&&k<=30,`[${width}] zamanlayıcı 20 adım/s: ${k}`);}eq(await read('gdRun'),'Çalıştır');
   await click('gdPreOsc');await has('gdEtaOut','0,25');await has('gdStatus','Salınarak yakınsama');await has('gdRateT','0,7785');await has('gdRateM','0,7785');await has('gdStatus','0,721');
   await click('gdPreDiv');await has('gdStatus','Iraksama');await has('gdRateT','1,0647');await has('gdRateM','1,0647');await click('gdEnd');await has('gdLoss','× 10');
   await range('gdEta',.8);await has('gdSolWM','Sayılar taştı');await click('gdEnd');await clean('panel-gd');
   await click('gdPreSgd');await has('gdRateM','Tanımsız');await has('gdStatus','tek bir noktadan');await has('gdTailM','0,1');
   await click('gdReset');await sel('gdBeta','0.9');await has('gdEcT','0,5521');await has('gdEcM','0,5521');await has('gdRateT','0,9487');await sel('gdBeta','0.5');await has('gdEcT','0,4359');await has('gdEcM','0,4359');
   await click('gdReset');await range('gdSeed',2);await has('gdEcT','0,5875');await has('gdEcM','0,5875');await range('gdSeed',20);await clean('panel-gd');
   for(const[id,lo,hi]of[['gdW',-1,3],['gdB',-2,3],['gdEta',.01,.8],['gdSeed',1,20]])for(const v of[lo,hi]){await range(id,v);await click('gdEnd');await clean('panel-gd');}
   // tuvale tıklayınca başlangıç noktası değişir
   await click('gdReset');{await page.locator('#gdContour').scrollIntoViewIfNeeded();const bx=await page.locator('#gdContour').boundingBox();await page.mouse.click(bx.x+bx.width*.7,bx.y+bx.height*.3);ok((await read('gdWOut'))!=='−0,5',`[${width}] tuval tıklaması w'yi değiştirir`);await has('gdK','0 / 3.000');}
   await click('gdReset');await has('gdWOut','−0,5');await has('gdBOut','2,5');await has('gdEtaOut','0,1');await has('gdK','0 / 3.000');
   await has('ncEnd','Sağ çukur · x = 1,1309');await has('ncFend','−1,0702');await has('ncSteps','118');await has('ncGlobal','x = −1,3008 · f = −3,5139');await has('ncBT','0,16994');await has('ncBM','0,16994');await has('ncTLT','0,1398');await has('ncTLM','0,1398');await has('ncTRT','0,214');await has('ncTRM','0,214');
   await click('ncPreL');await has('ncEnd','Sol çukur · x = −1,3008');await has('ncFend','−3,5139');await click('ncPreR');await has('ncEnd','Sağ çukur');await click('ncPreJump');await has('ncEnd','Sol çukur');await has('ncStatus','tepeyi aştı');
   await click('ncPreSharp');await has('ncEnd','Yerleşmedi');await has('ncSteps','Yok');await has('ncBM','Tanımsız');await has('ncStatus','sol çukurun eşiğini (0,14) aşıyor');await range('ncX0',1);await has('ncEnd','Sağ çukur');await has('ncStatus','o yandaki çukura yerleşti');await has('ncStatus','havza sınırı ölçümü tanımsız');ok(!(await read('ncStatus')).includes('kendi havzasında'),`[${width}] η eşiği aşarken 'kendi havzasında' denmez`);
   await range('ncEta',.3);await range('ncX0',-2);await has('ncEnd','Iraksadı');await has('ncFend','Tanımsız');await range('ncEta',.005);await range('ncX0',2);await has('ncEnd','Sağ çukur');await clean('panel-gd');
   await click('gdReset');await has('ncX0Out','0,5');await has('ncEtaOut','0,02');for(const id of['gdData','gdContour','gdLossChart','ncCanvas'])await painted(id);await noOverflow();

   // ---- sekmeler: klavye ----
   await page.locator('#tab-gd').focus();await page.keyboard.press('ArrowRight');eq(await page.locator('#tab-nn').getAttribute('aria-selected'),'true');eq(await page.locator('#panel-gd').isHidden(),true);await page.keyboard.press('End');eq(await page.locator('#tab-lm').getAttribute('aria-selected'),'true');await page.keyboard.press('ArrowRight');eq(await page.locator('#tab-gd').getAttribute('aria-selected'),'true');await page.keyboard.press('ArrowLeft');eq(await page.locator('#tab-lm').getAttribute('aria-selected'),'true');await page.keyboard.press('Home');eq(await page.locator('#tab-gd').getAttribute('aria-selected'),'true');eq(await page.locator('#tab-gd').getAttribute('tabindex'),'0');eq(await page.locator('#tab-nn').getAttribute('tabindex'),'-1');

   // ---- 02 sinir ağı ----
   await click('tab-nn');await has('nnStepsOut','0');await has('nnP','17');await has('nnLossTr','0,7259');await has('nnAccTr','%48,8');await has('nnStatus','Başlangıç');await has('nnParamOut','W1[1,1]');await has('nnGcD','bağıl');
   {const rel=await read('nnGcAllM');ok(/× 10⁻(⁷|⁸|⁹|¹⁰|¹¹)/.test(rel),`[${width}] gradyan denetimi bağıl hata: ${rel}`);}
   await click('nnStep');await has('nnStepsOut','1');await click('nnJump');await has('nnStepsOut','501');await click('nnRestart');await has('nnStepsOut','0');await click('nnJump');await has('nnStepsOut','500');await has('nnLossTr','0,0146');await has('nnLossTe','0,0926');await has('nnAccTr','%100');await has('nnAccTe','%96');await has('nnStatus','tümü doğru sınıflanıyor');
   await has('nnProbe','p(0,5; 0,5) = 0,0018');await range('nnPx',-.5);await has('nnProbe','p(−0,5; 0,5) = 0,99');await has('nnStepsOut','500');
   // ağırlık düzenleme: geçersiz girdi geri alınır, geçerli girdi uygulanır ve kayıp değişir
   {const v0=await page.locator('#nnParamVal').inputValue();await page.locator('#nnParamVal').fill('abc');await click('nnParamSet');eq(await page.locator('#nnParamVal').inputValue(),v0);await page.locator('#nnParamVal').fill('0,25');await click('nnParamSet');eq(await page.locator('#nnParamVal').inputValue(),'0,25');ok((await read('nnLossTr'))!=='0,0146',`[${width}] ağırlık değişince kayıp değişir`);await range('nnParam',17);await has('nnParamOut','b2[1]');await range('nnParam',5);await has('nnParamOut','W1[3,1]');}
   // zamanlayıcıyla eğitim ve Boşluk tuşu
   await click('nnRestart');await click('nnRun');await page.waitForTimeout(900);await click('nnRun');{const k=parseInt((await read('nnStepsOut')).replace('.',''));ok(k>=25&&k<=140,`[${width}] eğitim hızı 100 adım/s: ${k}`);}
   await page.locator('h1').click();await page.keyboard.press(' ');eq(await page.locator('#nnRun').getAttribute('aria-pressed'),'true');await page.keyboard.press(' ');eq(await page.locator('#nnRun').getAttribute('aria-pressed'),'false');
   await click('nnPreXor0');await has('nnP','3');eq(await page.locator('#nnWidth').isDisabled(),true);await click('nnJump');await click('nnJump');await has('nnStepsOut','1.000');await has('nnAccTr','%48,8');await has('nnLossTr','0,6888');await has('nnStatus','Gizli katman yok');await has('nnLinT','%75');await has('nnLinD','sınırın altında');await has('nnLn2T','0,6931');await has('nnGcAllM','Tanımsız');await has('nnLn2D','%−0,62');
   await click('nnPreOver');await has('nnP','105');await has('nnNOut','24');for(let i=0;i<4;i++)await click('nnJump');await has('nnStepsOut','2.000');await has('nnAccTr','%100');await has('nnStatus','Aşırı öğrenme');await has('nnLossTe','2,3');
   await range('nnL2',5);await has('nnL2Out','0,01');await has('nnStepsOut','0');for(let i=0;i<4;i++)await click('nnJump');{const te=parseFloat((await read('nnLossTe')).replace(',','.'));ok(te<1,`[${width}] L2 ile test kaybı ${te}`);}await has('nnLossTe','0,4265');await range('nnL2',6);for(let i=0;i<4;i++)await click('nnJump');await has('nnStatus','Düzenlileştirme çok güçlü');await has('nnLossTr','0,6931');
   await click('nnPreSpiral');await has('nnNOut','200');for(let i=0;i<4;i++)await click('nnJump');await has('nnAccTr','%100');await painted('nnHeat');
   for(const d of['blobs','xor','circles','spirals'])for(const a of['tanh','relu','sigmoid'])for(const o of['sgd','momentum','adam']){await sel('nnData',d);await sel('nnAct',a);await sel('nnOpt',o);await click('nnStep');}await clean('panel-nn');
   for(const[id,lo,hi]of[['nnN',20,200],['nnNoise',0,.5],['nnSeed',1,20],['nnWidth',1,8],['nnEta',0,6],['nnL2',0,6],['nnPx',-1.2,1.2],['nnPy',-1.2,1.2]])for(const v of[lo,hi]){await range(id,v);await click('nnStep');await clean('panel-nn');}
   await sel('nnOpt','sgd');await range('nnEta',6);await sel('nnLayers','2');await click('nnJump');await clean('panel-nn');await sel('nnLayers','0');await click('nnJump');await clean('panel-nn');
   await click('nnReset');await has('nnStepsOut','0');await has('nnP','17');await has('nnNOut','80');await has('nnEtaOut','0,03');await has('nnL2Out','0');eq(await page.locator('#nnData').inputValue(),'xor');eq(await page.locator('#nnWidth').isDisabled(),false);for(const id of['nnHeat','nnNet','nnLossChart','nnAccChart'])await painted(id);await noOverflow();
   // R tuşu etkin sekmeyi sıfırlar
   await click('nnJump');await page.locator('h1').click();await page.keyboard.press('r');await has('nnStepsOut','0');

   // ---- 03 softmax, dikkat, dil modeli ----
   await click('tab-lm');await has('lmH','2,024 bit');await has('lmTop','güzel · p = 0,4402');await has('lmKept','6 aday · p toplamı 1');await has('lmCE','0,8205 nat');await has('lmSumM','1');await has('lmChiT','5 ± 3,16');await has('lmChiM','4,32');await has('lmDevT','0,0157');await has('lmDevM','0,016');await has('lmGradM','× 10⁻¹');
   await click('lmPreCold');await has('lmTop','güzel · p = 0,9933');await has('lmStatus','argmax');await has('lmKept','6 aday');await has('lmTokRows','× 10⁻¹⁴');await range('lmT',.05);await has('lmTop','p = > 0,9999');await clean('panel-lm');
   await click('lmPreHot');await has('lmH','2,553 bit');await has('lmTop','p = 0,2');await click('lmPreNuc');await has('lmKept','4 aday · p toplamı 0,9419');await has('lmTokRows','kesildi');await has('lmChiT','3 ± 2,45');
   await range('lmK',1);await has('lmKept','1 aday');await has('lmChiT','Tanımsız');await has('lmDevM','0');await range('lmK',2);await range('lmP',1);await has('lmKept','2 aday · p toplamı 0,7072');await range('lmP',.05);await has('lmKept','1 aday');
   await click('lmReset');await sel('lmN','100000');await has('lmDevT','0,0016');await sel('lmN','100');await has('lmDevT','0,0496');await sel('lmTarget','5');await has('lmCE','3,8205 nat');await has('lmTokRows','mavi (hedef)');
   await box('lmZ5','7,5');await has('lmTop','mavi');await box('lmZ5','x');eq(await page.locator('#lmZ5').inputValue(),'7,5');await box('lmZ5','99');eq(await page.locator('#lmZ5').inputValue(),'20');await box('lmZ0','-3.5');eq(await page.locator('#lmZ0').inputValue(),'-3,5');await clean('panel-lm');
   await click('lmReset');await has('lmH','2,024 bit');eq(await page.locator('#lmZ5').inputValue(),'-1');
   await has('atOutRows','0,863');await has('atStatus','%79,8');await has('atStdT','8');await has('atStdM','8,095');await has('atHRaw','0,364 bit');await has('atHScaled','1,878 bit');await has('atMaxRaw','0,899');await has('atMaxScaled','0,463');
   await page.locator('#atScale').uncheck();await has('atStatus','Ölçek kapalı');await has('atStatus','%89,6');await page.locator('#atScale').check();await range('atDk',1);await has('atDkOut','2');await has('atStdT','1,414');await range('atDk',9);await has('atDkOut','512');await has('atStdT','22,627');await clean('panel-lm');
   await box('atQ30','0');await box('atQ31','0');await has('atOutRows','0,125');await box('atK00','abc');eq(await page.locator('#atK00').inputValue(),'2');
   await click('lmReset');eq(await page.locator('#atQ30').inputValue(),'2');await has('atStatus','%79,8');
   await has('bgCount','1.030 karakter · 1.029 ikili');await has('bgTrT','3,0806');await has('bgTrM','3,1634');await has('bgHeM','3,6714');await has('bgHeld','3,671 bit');await has('bgPplTr','8,96');await has('bgPplHe','12,74');await has('bgUniM','4,4396');await has('bgUnifT','4,9542');await has('bgTop','“a” → r %17,1');
   {const s1=await read('bgS1');eq(s1.length,110);await range('bgSeed',2);ok((await read('bgS1'))!==s1);await range('bgSeed',1);eq(await read('bgS1'),s1);await range('bgT',.3);eq(await read('bgS1'),await read('bgS2'));await range('bgT',2);eq(await read('bgS1'),await read('bgS3'));}
   await range('bgAlpha',0);await has('bgTrM','3,0815');await has('bgAlphaOut','0,001');await range('bgAlpha',4);await has('bgTrM','3,591');await sel('bgRow','13');await has('bgTop','“j”');await has('bgTop','hiç geçmiyor');
   await page.locator('#bgHeldIn').fill('Sabah erken kalktım.');await has('bgStatus','sabah erken kalktım.');await has('bgStatus','20 karakter');await has('bgStatus','eğitim metninde geçmiyor');await page.locator('#bgHeldIn').fill('Kedi duvarın üstünde uyuyordu.');await has('bgStatus','Bu cümle eğitim metninde geçiyor');ok(!(await read('bgStatus')).includes('geçmiyor'),`[${width}] eğitim metninden kopyalanan cümle 'görülmemiş' sayılmaz`);await page.locator('#bgHeldIn').fill('?');await has('bgHeld','Tanımsız');await has('bgPplHe','Tanımsız');await has('bgStatus','tanımsız');await click('bgHeldDef');await has('bgStatus','kütüphanede');await has('bgStatus','eğitim metninde geçmiyor ve model burada daha çok şaşırıyor');await clean('panel-lm');
   for(const[id,lo,hi]of[['lmT',.05,5],['lmK',1,6],['lmP',.05,1],['lmSeed',1,20],['atDk',1,9],['atSeed',1,20],['bgAlpha',0,4],['bgT',.1,2],['bgSeed',1,20]])for(const v of[lo,hi]){await range(id,v);await clean('panel-lm');}
   await click('lmReset');await has('bgTrM','3,1634');await has('bgAlphaOut','0,1');for(const id of['lmBars','atHeat','bgHeat'])await painted(id);await noOverflow();
   await click('tab-gd');await noOverflow();assert.deepEqual(errors,[],`[${width}] konsol hataları`);checks++;await ctx.close();
  }
  console.log(`G makine öğrenmesi: ${(checks-before).toLocaleString('tr-TR')} arayüz denetimi (390 px açık + 1280 px koyu) PASS`);
 }finally{await browser?.close();await new Promise(r=>server.close(r));}
}
