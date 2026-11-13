// G · us-ve-logaritma.html — kalıcı denetim.
// Çekirdek (KERNEL-BEGIN … KERNEL-END) node'da yüklenir ve sayfanın formüllerini KULLANMAYAN başvurularla
// karşılaştırılır: Math.pow / Math.cbrt / Math.log2 ile kapalı biçimler, asal çarpanlara ayırarak kök sadeleştirme,
// ikiye bölmeyle bağımsız denklem çözümü, tamsayı kaba kuvvet aramaları, döngüyle bileşik faiz, ikili açılımın
// floor(frac·2^i) ile doğrudan hesabı, elle yazılmış çözümleyici tablosu ve alıştırma metinlerinden geri okunan
// sayılarla yeniden çözme (500 tohum × 3 seviye).
// `--browser`: Playwright ile gerçek arayüz (390 px açık tema ve 1280 px koyu tema).
import fs from 'node:fs';
import vm from 'node:vm';
import assert from 'node:assert/strict';
import { canvasInk, assertCanvasDrawn } from './lib/canvas-check.mjs';
const html=fs.readFileSync(new URL('../us-ve-logaritma.html',import.meta.url),'utf8');
const source=html.split('/* KERNEL-BEGIN */')[1]?.split('/* KERNEL-END */')[0];
assert(source,'us-ve-logaritma.html: KERNEL sınırları gerekli');
const context={window:{}};vm.createContext(context);vm.runInContext(source,context);
const K=context.window.UsLog;assert(K,'UsLog yok');assert(Object.isFrozen(K),'çekirdek donmuş olmalı');
let checks=0;
const near=(a,e,tol=1e-10,msg='')=>{assert(Number.isFinite(a)&&Math.abs(a-e)<=tol*Math.max(1,Math.abs(e)),`${msg} ${a} ≠ ${e} (tol ${tol})`);checks++;};
const ok=(c,msg='koşul sağlanmadı')=>{assert(c,msg);checks++;};
const eq=(a,b,msg)=>{assert.equal(a,b,(msg||'eşitlik')+`: ${a} ≠ ${b}`);checks++;};
const bisect=(f,lo,hi)=>{let flo=f(lo);for(let i=0;i<200;i++){const m=(lo+hi)/2,fm=f(m);if((fm>0)===(flo>0)){lo=m;flo=fm;}else hi=m;}return(lo+hi)/2;};
const NB=' ';

// 1) Sayı biçimi: ondalık virgül, "−", 10 000'den itibaren dar boşluk
for(const[x,sd,s]of[[12345.678,4,'12'+NB+'346'],[1234,4,'1234'],[0.5,4,'0,5'],[-2.5,4,'−2,5'],[0,4,'0'],[1e12,4,'10¹²'],[1.2e-5,4,'1,2·10⁻⁵'],[9999.6,4,'10'+NB+'000'],[Math.E,6,'2,71828'],[NaN,4,'—'],[Infinity,4,'+∞'],[-3.2e9,3,'−3,2·10⁹'],[0.000123,3,'0,000123'],[1000000,7,'1'+NB+'000'+NB+'000']])eq(K.fmt(x,sd),s,'fmt '+x);
for(const[x,dp,s]of[[-0.0001,2,'0,00'],[12345.6,1,'12'+NB+'345,6'],[33003.869,2,'33'+NB+'003,87'],[-1.005,1,'−1,0'],[7,0,'7']])eq(K.fix(x,dp),s,'fix '+x);
eq(K.sup(-12),'⁻¹²');

// 2) Üs merdiveni ve kökler
for(const a of[0.5,2,3,7.5,10])K.powLadder(a,4,-3).forEach(r=>near(r.v,Math.pow(a,r.n),1e-14,'merdiven '+a+'^'+r.n));
eq(K.powLadder(2,4,-3).find(r=>r.n===0).v,1,'2⁰ tam 1');
for(const[a,q,e]of[[8,3,2],[27,3,3],[16,4,2],[32,5,2],[100,2,10],[2,2,Math.SQRT2],[10,3,Math.cbrt(10)],[0.5,2,Math.sqrt(.5)],[0,3,0]])near(K.nthRoot(a,q),e,1e-13,`kök ${a} ${q}`);
ok(Number.isNaN(K.nthRoot(-8,3)),'negatif sayıya kök çekirdekte tanımsız');
// kare çarpanı: asal çarpanlara ayırarak bağımsız hesap
const sqf=n=>{let out=1,inn=1,m=n;for(let p=2;p*p<=m;p++){let e=0;while(m%p===0){m/=p;e++;}out*=Math.pow(p,Math.floor(e/2));if(e%2)inn*=p;}inn*=m;return{out,inn};};
for(let n=1;n<=3000;n++){const r=K.simplifySqrt(n),s=sqf(n);eq(r.out,s.out,'√'+n+' dış');eq(r.inn,s.inn,'√'+n+' iç');}
for(const n of[72,1e6,999999,524288])eq(K.simplifySqrt(n).out*K.simplifySqrt(n).out*K.simplifySqrt(n).inn,n);
eq(K.simplifySqrt(-4),null);eq(K.simplifySqrt(2.5),null);
// üs kuralları
for(const id of['carpim','bolum','kuvvet','dagilma','sifir','negatif','kok'])for(const a of[0.5,2,3.7])for(const m of[-2,0.5,3])for(const n of[-1.5,2,4]){const r=K.checkRule(id,{a,b:1.3,m,n});if(id==='kok'&&n<=0){eq(r.why,'kokn');continue;}ok(r.ok,id);ok(r.diff<1e-12,id+' fark '+r.diff);}
eq(K.checkRule('carpim',{a:-2,m:3,n:4}).ok,true,'tamsayı üste negatif taban olur');near(K.checkRule('carpim',{a:-2,m:3,n:4}).lhs,-128);
eq(K.checkRule('kok',{a:-8,n:3}).why,'taban');eq(K.checkRule('kuvvet',{a:-8,m:0.5,n:2}).why,'taban');eq(K.checkRule('negatif',{a:0,n:2}).why,'sifir');eq(K.checkRule('kok',{a:4,n:-2}).why,'kokn');eq(K.checkRule('carpim',{a:10,m:400,n:400}).why,'tasma');

// 3) Büyüme
for(const[P,d,r,N]of[[100,10,10,30],[50,3,-20,40],[1000,0,3,60]]){const S=K.series(P,d,r,N);for(let k=0;k<=N;k++){near(S.lin[k],P+k*d,1e-14);near(S.ex[k],P*Math.pow(1+r/100,k),1e-12,'üstel '+k);}}
for(let r=1;r<=50;r++){const T=bisect(t=>Math.pow(1+r/100,t)-2,0,100);near(K.doublingExact(r),T,1e-12,'katlanma '+r);const S=K.series(100,0,r,200);near(K.crossTime(S.ex,200),T,1e-10,'ölçülen katlanma '+r);near(K.crossTime(S.ex,400)-K.crossTime(S.ex,200),T,1e-9,'ikinci katlanma '+r);}
for(const r of[-5,-10,-30,-50]){const T=bisect(t=>Math.pow(1+r/100,t)-0.5,0,100);near(K.halvingExact(r),T,1e-12);near(K.crossTime(K.series(100,0,r,100).ex,50),T,1e-10);}
ok(Number.isNaN(K.doublingExact(0))&&Number.isNaN(K.halvingExact(0))&&Number.isNaN(K.halvingExact(-100)));
eq(K.crossTime(K.series(100,0,1,10).ex,200),null,'ulaşılmayan hedef');
near(K.doublingExact(10),7.272540897341713,1e-14);near(70/10/K.doublingExact(10)-1,-0.03748,1e-3);
// bileşik faiz: döngüyle çarpma
const loop=(P,r,m,t)=>{let A=P;for(let i=0;i<m*t;i++)A*=1+r/100/m;return A;};
for(const m of[1,2,4,12,365])for(const[P,r,t]of[[10000,12,10],[2500,3.5,7]])near(K.compound(P,r,m,t).A,loop(P,r,m,t),1e-11,'faiz m='+m);
near(K.compound(10000,12,1,10).A,31058.48206,1e-9);near(K.compound(10000,12,12,10).A,33003.868946,1e-9);near(K.compound(10000,12,'c',10).A,33201.169227,1e-9);
near(K.compound(10000,12,12,1).eff,0.12682503013,1e-9);near(K.compound(1,100,'c',1).A,Math.E,1e-15);
{let prev=0;for(const m of[1,2,4,12,365,10000]){const A=K.compound(10000,12,m,10).A;ok(A>prev&&A<K.compound(10000,12,'c',10).A,'sıklaştıkça artar ve sınırın altında kalır');prev=A;}}

// 4) e
for(const[n,v]of[[1,2],[2,2.25],[10,2.5937424601],[100,2.704813829421526],[1e6,2.7182804693193768]])near(K.eSeq(n),v,1e-12,'e dizisi '+n);
for(const n of[1e3,1e4,1e5,1e6])near((Math.E-K.eSeq(n))/(Math.E/(2*n)),1-11/(12*n),2e-4,'asimptotik oran '+n);
near((Math.E-K.eSeq(1))/(Math.E/2),0.5285,1e-3,'n = 1 asimptotik değil');
eq(K.eNaive(1e16),1,'1 + 10⁻¹⁶ = 1');ok(Math.abs(K.eNaive(1e15)-K.eSeq(1e15))>0.1,'naif hesap 10¹⁵\'te bozulur');ok(Math.abs(K.eNaive(1e6)-K.eSeq(1e6))<1e-9);
for(const b of[1.1,2,Math.E,3,5])near(K.slope0(b),Math.log(b),1e-9,'eğim '+b);
near(K.secant(2,1),1,1e-15);near(K.secant(2,0.001),0.6933874625807412,1e-12);
// e'nin bağımsız tanımı: Σ 1/k!
{let s=0,f=1;for(let k=0;k<20;k++){if(k)f*=k;s+=1/f;}near(K.eSeq(1e8),s,1e-7);}

// 5) Logaritma
for(const b of[2,3,10,0.5,Math.E])for(const x of[0.01,1,7,1e5])near(K.logb(x,b),Math.log10(x)/Math.log10(b),1e-12);
for(const[x,b]of[[10,2],[1000,10],[0.3,2],[50,3],[1,2],[7.25,10],[2,2],[1e-5,3],[123456,2]]){
 const D=K.logDigits(x,b,20),L=Math.log(x)/Math.log(b);eq(D.k,Math.floor(L+1e-12),'tam kısım '+x);ok(Math.abs(D.value-L)<=Math.pow(2,-20)+1e-12,'log digits '+x+' '+b);
 const fr=L-D.k;for(let i=1;i<=18;i++){const v=fr*Math.pow(2,i);if(Math.abs(v-Math.round(v))<1e-6)break;eq(D.bits[i-1],Math.floor(v)%2,`ikili basamak ${i} (${x}, ${b})`);}}
eq(K.logDigits(0,2,5),null);eq(K.logDigits(-1,2,5),null);eq(K.logDigits(5,1,5),null);
eq(K.logDigits(10,2,20).bits.slice(0,10).join(''),'0101001001');
for(const id of['carpim','bolum','kuvvet','taban','ters'])for(const b of[2,10,0.3])for(const x of[0.2,8,1e4]){const r=K.checkLogRule(id,{x,y:3.3,k:-2.5,b});ok(r.ok);ok(r.diff<1e-9*Math.max(1,Math.abs(r.rhs)),id);}
eq(K.checkLogRule('carpim',{x:-1,y:2,b:2}).why,'arguman');eq(K.checkLogRule('carpim',{x:1,y:2,b:1}).why,'taban');eq(K.checkLogRule('taban',{x:5,y:-3,b:2}).ok,true,'kullanılmayan y önemsiz');

// 6) Denklemler: kökleri özgün denklemde yerine koy, kaba kuvvet tarama ile kök sayısını say
const signRoots=(f,lo,hi,n=200000)=>{const R=[];let px=lo,pv=f(lo);for(let i=1;i<=n;i++){const x=lo+(hi-lo)*i/n,v=f(x);if(Number.isFinite(v)&&v===0)R.push(x);else if(Number.isFinite(pv)&&Number.isFinite(v)&&pv*v<0)R.push(bisect(f,px,x));px=x;pv=v;}return R;};
for(const b of[2,3,10,Math.E])for(const a of[-5,-2,0.5,5])for(const c of[-50,0,1,70,200]){const S=K.solveEq('E1',{b,a,c});const f=x=>a*Math.pow(b,x)-c,R=signRoots(f,-30,30,6000);eq(S.roots.length,R.length,`E1 kök sayısı ${b},${a},${c}`);S.roots.forEach((x,i)=>near(x,R[i],1e-8));(S.check||[]).forEach(C=>near(C.lhs,c,1e-9));}
eq(K.solveEq('E1',{b:2,a:0,c:3}).reason,'a0');near(K.solveEq('E1',{b:2,a:5,c:70}).roots[0],Math.log2(14),1e-14);
for(const b of[2,3,10,Math.E])for(let p=-10;p<=10;p+=2)for(let q=-10;q<=10;q+=3){const S=K.solveEq('E2',{b,p,q});const f=x=>Math.pow(b,2*x)+p*Math.pow(b,x)+q,R=signRoots(f,-25,25,20000);eq(S.roots.length,R.length,`E2 kök sayısı ${b},${p},${q}`);S.roots.slice().sort((x,y)=>x-y).forEach((x,i)=>near(x,R[i],1e-7));for(const x of S.roots)ok(Math.abs(f(x))<1e-8*Math.max(1,Math.pow(b,2*x)),'E2 yerine koyma');}
{const S=K.solveEq('E2',{b:2,p:-5,q:6});near(S.roots[0],1,1e-14);near(S.roots[1],Math.log2(3),1e-14);eq(K.solveEq('E2',{b:2,p:1,q:-6}).rejected.length,1);eq(K.solveEq('E2',{b:2,p:3,q:2}).roots.length,0);ok(K.solveEq('E2',{b:2,p:-5,q:6}).steps[2].includes('(−5)²'));}
for(const b of[2,10,Math.E])for(let p=-5;p<=5;p++)for(let q=-10;q<=10;q+=4)for(const r of[-2,0,1.5,3]){const S=K.solveEq('E3',{b,p,q,r});if(p===0){eq(S.reason,'p0');continue;}eq(S.roots.length,1);const x=S.roots[0];ok(p*x+q>0);near(Math.log(p*x+q)/Math.log(b),r,1e-10,'E3');}
near(K.solveEq('E3',{b:2,p:2,q:3,r:3}).roots[0],2.5,1e-14);
for(const b of[2,3,10,Math.E])for(let p=-10;p<=10;p++)for(const r of[0,0.5,1,2,4]){const S=K.solveEq('E4',{b,p,r}),f=x=>x>0&&x+p>0?Math.log(x)/Math.log(b)+Math.log(x+p)/Math.log(b)-r:NaN;const R=signRoots(f,1e-9,Math.max(20,Math.pow(b,r)+Math.abs(p)+5),40000);eq(S.roots.length,R.length,`E4 kök ${b},${p},${r}`);S.roots.forEach((x,i)=>near(x,R[i],1e-7));eq(S.roots.length+S.rejected.length,2);}
{const S=K.solveEq('E4',{b:10,p:-3,r:1});eq(S.roots.length,1);near(S.roots[0],5,1e-14);near(S.rejected[0].x,-2,1e-14);}

// 7) Ölçekler ve doğru uydurma
near(K.pH(1e-7),7,1e-14);near(K.pH(3e-5),4.522878745,1e-9);near(K.dB(1e-12),0,1e-14);near(K.dB(1),120,1e-14);near(K.dB(2e-12),3.0103,1e-4);
near(K.quakeEnergy(1),31.622776601683793,1e-14);near(K.quakeEnergy(2),1000,1e-13);near(K.quakeAmp(2),100,1e-14);eq(Math.round(K.quakeEnergy(1)),32,'USGS: yaklaşık 32 kat');
{const F=K.fitLine([1,2,3,4],[3,5,7,9]);near(F.m,2);near(F.c,1);near(F.r2,1);}
{const F=K.fitLine([0,1,2],[1,0,1]);near(F.m,0,1e-14);near(F.r2,0,1e-14);}
for(const[kind,ax,key,val]of[['ustel','yarilog','base',1.5],['kuvvet','loglog','p',1.7]]){const F=K.fitAxes(K.dataset(kind,0,1),ax);near(F[key],val,1e-12);near(F.r2,1,1e-12);near(F.A,kind==='ustel'?3:2,1e-12);}
{const F=K.fitAxes(K.dataset('dogrusal',0,1),'dogrusal');near(F.m,4,1e-13);near(F.c,5,1e-12);}
for(let s=1;s<=40;s++){const D=K.dataset('ustel',10,s);const b=K.fitAxes(D,'yarilog').base;ok(Math.abs(b/1.5-1)<0.03,'tohum '+s+' taban '+b);const R={d:K.fitAxes(D,'dogrusal').r2,y:K.fitAxes(D,'yarilog').r2,l:K.fitAxes(D,'loglog').r2};ok(R.y>R.d&&R.y>R.l,'üstel veri yarı-log\'da en düz, tohum '+s);
 const P=K.fitAxes(K.dataset('kuvvet',10,s),'loglog').p;ok(Math.abs(P-1.7)<0.12,'üs '+P);const D2=K.dataset('kuvvet',10,s);ok(K.fitAxes(D2,'loglog').r2>K.fitAxes(D2,'yarilog').r2,'kuvvet log-log\'da daha düz');}
{const D=K.dataset('ustel',20,3),D2=K.dataset('ustel',20,3);eq(JSON.stringify(D),JSON.stringify(D2),'tohumlu veri tekrarlanır');}

// 8) Cevap çözümleyici (elle yazılmış tablo)
const ACC=[['12',12],['−3',-3],['-3',-3],['+4',4],['2,5',2.5],['2.5',2.5],[' 2,5 ',2.5],['1 000',1000],['1 000',1000],['3/4',0.75],['−3/4',-0.75],['-3/-4',0.75],['1,5/2',0.75],[',5',0.5],['.5',0.5],['0',0],['1.000',1],['1,000',1],['–7',-7],['10 000 000',1e7],['17,67',17.67]];
for(const[s,v]of ACC){const r=K.parseAnswer(s);ok(r.ok,'kabul edilmeli: '+s);near(r.value,v,1e-15,s);}
const REJ=[['',/sayı yaz/],['   ',/sayı yaz/],[null,/sayı yaz/],['log2(8)',/Yalnız sayı/],['2^3',/Yalnız sayı/],['√4',/Yalnız sayı/],['1e3',/Yalnız sayı/],['x',/Yalnız sayı/],['3*4',/Yalnız sayı/],['%5',/Yalnız sayı/],['1/2/3',/Tek bir kesir/],['3/0',/Payda sıfır/],['1.000,5',/Tek bir ondalık/],['1,2,3',/Tek bir ondalık/],['/4',/pay\/payda/],['3/',/pay\/payda/],['--3',/tanınmadı/],['5-',/tanınmadı/],['1 2-3',/tanınmadı|binlik/],['.',/tanınmadı/]];
for(const[s,re]of REJ){const r=K.parseAnswer(s);eq(r.ok,false,'reddedilmeli: '+s);ok(re.test(r.error),s+': '+r.error);}
// doğrulayıcı eki: boşluk yalnız binlik ayırıcı; tam sayılı kesir ve rastgele boşluk sessizce birleşmez
for(const s of['2 1/2','2 5','1 00','3 1/4'])ok(/binlik/.test(K.parseAnswer(s).error||''),'boşluk birleşmemeli: '+s);
for(const[s,v]of[['12 345,5',12345.5],['1 000/3',1000/3],['- 3',-3],['3 / 4',0.75]])near(K.parseAnswer(s).value,v,1e-15,s);
// doğrulayıcı eki: 1.000 binlik sanılırsa ayrı ipucu
ok(/binlik/.test(K.grade({answer:1000,mode:'exact'},'1.000').msg||''),'1.000 ipucu');eq(K.grade({answer:1,mode:'exact'},'1.000').status,'correct');
// doğrulayıcı eki: overtake yuvarlama artığını "geçti" saymaz (100·1,1 = 110,00000000000001); bağımsız: tamsayı eşitlik + ara değerleme
{const S=K.series(100,10,10,30);near(K.overtake(S.lin,S.ex),1,1e-9,'overtake varsayılan');
 const S2=K.series(100,20,5,60);let k=1;while(!(S2.ex[k]>S2.lin[k]))k++;const d0=S2.ex[k-1]-S2.lin[k-1],d1=S2.ex[k]-S2.lin[k];near(K.overtake(S2.lin,S2.ex),k-1+d0/(d0-d1),1e-12,'overtake %5/+20');eq(k,49);
 const S3=K.series(100,5,10,10);eq(K.overtake(S3.lin,S3.ex),0,'baştan önde');eq(K.overtake(K.series(100,10,0,10).lin,K.series(100,10,0,10).ex),null,'hiç geçmez');}
{const ex={mode:'exact',answer:1/9};eq(K.grade(ex,'1/9').status,'correct');eq(K.grade(ex,'0,1111').status,'close');eq(K.grade(ex,'0,2').status,'wrong');eq(K.grade(ex,'-1/9').msg?.includes('İşaret'),true);eq(K.grade(ex,'log(3)').status,'invalid');}
{const ex={mode:'approx',answer:7.2725,tol:0.01};eq(K.grade(ex,'7,27').status,'correct');eq(K.grade(ex,'7.28').status,'correct');eq(K.grade(ex,'7,3').status,'close');eq(K.grade(ex,'7').status,'wrong');eq(K.grade(ex,'8').status,'wrong');eq(K.grade(ex,'-7,27').status,'wrong');}
{const ex={mode:'exact',answer:0};eq(K.grade(ex,'0').status,'correct');eq(K.grade(ex,'-0').status,'correct');}

// 9) Alıştırmalar: metinden sayıları geri oku ve bağımsız çöz
const N=s=>Number(String(s).replace(/[  ]/g,'').replace('−','-').replace(',','.'));
const vfrac=s=>{s=String(s).trim();if(s.includes('/')){const[a,b]=s.split('/');return N(a)/N(b);}return N(s);};
const baseOf=s=>{const m=s.match(/log<sub>([\d,]+)<\/sub>/);return m?N(m[1]):10;};
const linParse=s=>{s=s.replace(/\s/g,'').replace(/−/g,'-');const m=s.match(/^(-?\d*)x([+-]\d+)?$/);assert(m,'doğrusal ifade '+s);const p=m[1]===''?1:m[1]==='-'?-1:Number(m[1]);return{p,q:m[2]?Number(m[2]):0};};
const solveIndep={
 evalPow:h=>{const m=h.match(/^(\d+)<sup>(−?\d+)<\/sup>/);return Math.pow(N(m[1]),N(m[2]));},
 ratPow:h=>{const m=h.match(/^(\d+)<sup>(−?\d+)\/(\d+)<\/sup>/);return Math.pow(N(m[1]),N(m[2])/N(m[3]));},
 logInt:h=>{const b=baseOf(h),m=h.match(/(?:log|<\/sub>) ([\d, /]+) kaç/);return Math.log(vfrac(m[1]))/Math.log(b);},
 expRule:h=>{if(h.startsWith('(')){const m=h.match(/<sup>(−?\d+)<\/sup>\)<sup>(\d+)<\/sup>/);return N(m[1])*N(m[2]);}const e=[...h.matchAll(/<sup>(−?\d+)<\/sup>/g)].map(m=>N(m[1]));const b=N(h.match(/^(\d+)/)[1]);return Math.round(Math.log(Math.pow(b,e[0])*Math.pow(b,e[1])/Math.pow(b,e[2]))/Math.log(b));},
 expEq:h=>{const m=h.match(/^(\d+)<sup>([^<]+)<\/sup> = ([\d ]+)/),b=N(m[1]),L=linParse(m[2]),v=N(m[3]);const xs=[];for(let x=-20;x<=20;x++)if(Math.pow(b,L.p*x+L.q)===v)xs.push(x);eq(xs.length,1,'expEq tek kök');return xs[0];},
 logEq:h=>{const b=baseOf(h),m=h.match(/\(([^)]+)\) = (\d+)/),L=linParse(m[1]),r=N(m[2]);const xs=[];for(let x=-200;x<=2000;x++){const a=L.p*x+L.q;if(a>0&&Math.abs(Math.log(a)/Math.log(b)-r)<1e-9)xs.push(x);}eq(xs.length,1,'logEq tek kök');return xs[0];},
 logRule:h=>{const b=baseOf(h),n=[...h.replace(/<sub>\d+<\/sub>/g,'').matchAll(/log (\d+)/g)].map(m=>N(m[1]));return h.includes(' + ')?Math.log(n[0]*n[1])/Math.log(b):Math.log(n[0]/n[1])/Math.log(b);},
 doubling:h=>{const r=N(h.match(/%(\d+)/)[1]);return bisect(t=>Math.pow(1+r/100,t)-2,0,100);},
 compoundEx:h=>{const m=h.match(/^([\d ]+) TL yıllık %(\d+) .* (\d+) yıl bekliyor/),P=N(m[1]),r=N(m[2]),t=N(m[3]);let A=P;for(let i=0;i<t;i++)A*=1+r/100;return A;},
 expEqLog:h=>{const m=h.match(/^(\d+)·(\d+)<sup>x<\/sup> = (\d+)/),a=N(m[1]),b=N(m[2]),c=N(m[3]);return bisect(x=>Math.pow(b,x)-c/a,-10,20);},
 halfLife:h=>{const m=h.match(/süresi (\d+) gün .* (\d+) mg vardı; şimdi (\d+) mg/),T=N(m[1]),N0=N(m[2]),Nn=N(m[3]);return bisect(t=>N0*Math.pow(0.5,t/T)-Nn,0,1000);},
 continuous:h=>{const m=h.match(/^([\d ]+) TL yıllık %(\d+) .* Kaç yılda ([\d ]+) TL/),P=N(m[1]),r=N(m[2]),A=N(m[3]);return bisect(t=>P*Math.exp(r/100*t)-A,0,200);},
 logQuad:h=>{const b=baseOf(h),m=h.match(/\(x ([+−]) (\d+)\) = (\d+)/),p=(m[1]==='−'?-1:1)*N(m[2]),n=N(m[3]);const xs=[];for(let x=1;x<=400;x++)if(x+p>0&&Math.abs(Math.log(x*(x+p))/Math.log(b)-n)<1e-9)xs.push(x);eq(xs.length,1,'logQuad tek kök');return xs[0];},
 phEx:h=>{const m=h.match(/= ([\d,]+)·10<sup>−(\d+)<\/sup>/);return-Math.log10(N(m[1])*Math.pow(10,-N(m[2])));},
 dbEx:h=>{const m=h.match(/öbürününkinin ([\d, ]+) katı/);return 10*Math.log10(N(m[1]));},
 quakeEx:h=>{const d=N(h.match(/büyüklüğü (\d+) birim/)[1]);return Math.pow(Math.pow(10,1.5),d);},
};
const seen={1:new Set(),2:new Set(),3:new Set()};
for(const L of[1,2,3])for(let s=1;s<=500;s++){
 const ex=K.genExercise(L,s);seen[L].add(ex.type);ok(Number.isFinite(ex.answer),`L${L} s${s} cevap`);ok(!/NaN|undefined|Infinity/.test(ex.html+ex.steps.join('')+ex.hint),`L${L} s${s} metin`);
 const ref=solveIndep[ex.type];assert(ref,'bağımsız çözücü yok: '+ex.type);const v=ref(ex.html);
 if(ex.mode==='exact')near(ex.answer,v,1e-9,`L${L} s${s} ${ex.type}`);else ok(Math.abs(ex.answer-v)<1e-6*Math.max(1,Math.abs(v)),`L${L} s${s} ${ex.type} ${ex.answer} ≠ ${v}`);
 const sh=K.parseAnswer(ex.shown);ok(sh.ok,'gösterilen cevap çözümlenmeli: '+ex.shown);eq(K.grade(ex,ex.shown).status,'correct',`L${L} s${s} gösterilen cevap doğru sayılmalı (${ex.shown})`);
 if(ex.type==='ratPow')ok(!/<sup>−?(\d+)\/\1<\/sup>/.test(ex.html)&&!/<sup>−?(2\/2|3\/3|4\/2)<\/sup>/.test(ex.html),'sadeleşen kesirli üs olmamalı: '+ex.html);
 eq(JSON.stringify(K.genExercise(L,s)),JSON.stringify(ex),'tohum tekrarlanabilir');}
for(const L of[1,2,3])eq([...seen[L]].sort().join(),[...K.GEN_TYPES[L]].sort().join(),'seviye '+L+' bütün türleri üretir');

// 10) Yaygın hatalar: yanlış kural her örnekte gerçekten yanlış
const sameVal=(a,b)=>Number.isFinite(a)&&Number.isFinite(b)&&Math.abs(a-b)<1e-9*Math.max(1,Math.abs(b));
for(const id of K.MISTAKE_IDS)for(let s=1;s<=60;s++){const M=K.mistake(id,s),v=M.v;
 if(id==='logNegatif'){ok(Number.isNaN(Math.log10(-v.x)));ok(Number.isNaN(M.right));ok(Math.pow(10,M.wrong)>0);continue;}
 if(id==='yabanciKok'){eq(M.wrong.length,2);eq(M.right.length,1);for(const x of M.wrong)near(x*(x+v.v-v.u),Math.pow(10,v.n),1e-12);ok(M.wrong[1]<0);continue;}
 const indep={logToplam:Math.log10(v.a+v.b),binom:Math.pow(v.a+v.b,v.n),usCarpim:Math.pow(v.a,v.m*v.n),negatifUs:Math.pow(v.a,-v.n),yuzde:(Math.pow(1+v.r/100,v.n)-1)*100,logBolum:Math.log(v.a)/Math.log(v.b)}[id];
 near(M.right,indep,1e-12,id);ok(!sameVal(M.wrong,M.right),`${id} tohum ${s}: yanlış kural tesadüfen doğru çıkmamalı`);}
eq(K.MISTAKE_IDS.length>=5,true,'en az beş yaygın hata');

console.log(`G us-ve-logaritma: ${checks.toLocaleString('tr-TR')} bağımsız çekirdek kontrolü PASS`);

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
   await page.goto(`http://127.0.0.1:${server.address().port}/us-ve-logaritma.html`,{waitUntil:'load'});await page.waitForTimeout(400);
   const click=id=>page.locator('#'+id).click(),read=async id=>(await page.locator('#'+id).textContent()).trim(),has=async(id,t)=>{const s=await read(id);assert(s.includes(t),`[${width}] #${id}: "${s}" içinde "${t}" yok`);checks++;};
   const range=(id,v)=>page.locator('#'+id).evaluate((e,v)=>{e.value=v;e.dispatchEvent(new Event('input',{bubbles:true}));},v),pick=(id,v)=>page.locator('#'+id).selectOption(v),settle=()=>page.waitForTimeout(100);
   const noOverflow=async w=>{eq(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),true,`[${width}] yatay taşma: ${w}`);};
   const painted=async id=>{ok(assertCanvasDrawn(await canvasInk(page,'#'+id),{minDistinct:4,label:`[${width}] ${id}`}),`[${width}] ${id} boş`);};
   eq(await page.evaluate(()=>[...document.querySelectorAll('main input,main select')].filter(e=>!(e.labels&&e.labels.length)&&!e.getAttribute('aria-label')).map(e=>e.id).join()),'','etiketsiz denetim');
   eq(await page.evaluate(()=>[...document.querySelectorAll('main canvas')].every(c=>c.getAttribute('role')==='img'&&c.getAttribute('aria-label'))),true);
   eq(await page.evaluate(()=>[...document.querySelectorAll('main button')].filter(b=>!b.textContent.trim()&&!b.getAttribute('aria-label')).length),0,'adsız düğme');
   eq(await page.evaluate(()=>/[̀-ͯ]/.test(document.querySelector('main').textContent)),false,'birleşik işaret');
   eq(await page.evaluate(()=>document.title.length<=80),true,'başlık ≤ 80');
   eq(await page.evaluate(()=>[...document.querySelectorAll('main input[type=number]')].length),0,'type=number yok');
   // sekme klavyesi
   await page.locator('#tab-t1').focus();await page.keyboard.press('ArrowRight');await settle();eq(await page.locator('#tab-t2').getAttribute('aria-selected'),'true');await page.keyboard.press('End');await settle();eq(await page.locator('#panel-t6').isVisible(),true);await page.keyboard.press('Home');await settle();eq(await page.locator('#panel-t1').isVisible(),true);await page.keyboard.press('ArrowLeft');await settle();eq(await page.locator('#tab-t6').getAttribute('aria-selected'),'true');await click('tab-t1');await settle();
   // 01
   await has('t1Status','= 1');ok((await read('t1Ladder')).includes('0,125'));await range('t1a',3);await range('t1n',-2);await settle();await has('t1Status','0,111111');await range('t1a',1);await settle();await has('t1Status','1\'in her kuvveti 1');await range('t1a',0.5);await settle();await has('t1Status','ters yönde');await click('t1Reset');await settle();await has('t1Status','= 1');
   await has('t1RuleStats','128');await pick('t1Rule','kok');await page.locator('#t1ra').fill('-8');await page.locator('#t1rn').fill('3');await settle();await has('t1RuleStatus','pozitif');eq(await page.locator('#t1rm').isVisible(),false,'kök kuralında m gizli');
   await page.locator('#t1ra').fill('2,5');await settle();await has('t1RuleStats','2,5');await page.locator('#t1ra').fill('abc');await settle();eq(await page.locator('#t1ra').getAttribute('aria-invalid'),'true');await has('t1RuleErr','sayı');await click('t1RuleReset');await settle();await has('t1RuleStats','128');
   await has('t1RootStats','4');await has('t1RootStatus','8 tam bir 3. kuvvettir');await painted('t1c');await range('t1x',0);await range('t1p',-1);await settle();await has('t1RootStatus','tanımsız');await click('t1RootReset');await settle();await has('t1RootStatus','8 tam bir 3. kuvvettir');
   await has('t1SqOut','6√2');await page.locator('#t1s').fill('49');await settle();await has('t1SqOut','= 7');await page.locator('#t1s').fill('30');await settle();await has('t1SqOut','sadeleşmez');await page.locator('#t1s').fill('2,5');await settle();await has('t1sErr','tamsayı');await page.locator('#t1s').fill('72');await settle();
   await noOverflow('01');
   // 02
   await click('tab-t2');await settle();await painted('t2c');await has('t2Stats','7,273 adım');await has('t2Stats','8. adım (214,359)');await has('t2Stats','2. adım');await has('t2Stats','1744,94');await has('t2Stats','7,000 adım (−3,75 %)');await has('t2Stats','10,00 ve 20,00');
   await page.locator('#t2log').check();await settle();await painted('t2c');await click('t2Pc');await settle();await has('t2Stats','6,579');await has('t2Status','yarılanma');await click('t2Pb');await settle();await has('t2Stats','14,207');await has('t2Stats','49. adım');
   await range('t2r',0);await settle();await has('t2Status','r = 0');await range('t2N',5);await range('t2r',1);await settle();await has('t2Stats','ulaşılmadı');await click('t2Reset');await settle();await has('t2Stats','7,273 adım');eq(await page.locator('#t2log').isChecked(),false);
   ok((await read('t2RuleRows')).includes('69,661'));await has('t2cStats','33'+NB+'003,87 TL');await has('t2cStats','33'+NB+'201,17 TL');await has('t2cStats','22'+NB+'000,00 TL');await pick('t2cm','c');await settle();await has('t2cStats','12,750 %');await pick('t2cm','1');await settle();await has('t2cStats','31'+NB+'058,48');await click('t2cReset');await settle();await has('t2cStats','33'+NB+'003,87');
   await noOverflow('02');
   // 03
   await click('tab-t3');await settle();await painted('t3c');await painted('t3s');await has('t3Stats','0,01347');await has('t3Stats','0,01359');await has('t3Stats','0,9909');
   await click('t3P2');await settle();await has('t3Stats','ölçülemez');await has('t3Stats','3,035');await has('t3Status','Naif hesap');await click('t3P1');await settle();await has('t3Stats','2,61303529');await has('t3kOut','n = 12');await range('t3k',6);await settle();await has('t3Stats','1'+NB+'000'+NB+'000');await click('t3Reset');await settle();await has('t3Stats','0,01347');
   ok((await read('t3Rows')).includes('ölçülemez'));await has('t3sStats','0,693147');await click('t3Be');await settle();await has('t3sStatus','e\'ye çok yakın');await has('t3sStats','0,999896');await click('t3B3');await settle();await has('t3sStats','1,098612');await click('t3sReset');await settle();await has('t3sStats','0,693147');
   await noOverflow('03');
   // 04
   await click('tab-t4');await settle();await painted('t4c');await has('t4Stats','(1,5; 2,8284)');await has('t4Stats','−1,000000');await range('t4b',1);await settle();await has('t4Status','b = 1');await click('t4B10');await settle();await has('t4Stats','31,623');await click('t4Bh');await settle();await has('t4Status','azalandır');await click('t4Reset');await settle();await has('t4Stats','(1,5; 2,8284)');
   await has('t4dOut','3,3219280');await has('t4dOut','0,0101001001');await page.locator('#t4dx').fill('0');await settle();await has('t4dErr','Pozitif');await page.locator('#t4dx').fill('0,3');await settle();await has('t4dOut','Tam kısım −2');await pick('t4db','10');await page.locator('#t4dx').fill('1000');await settle();await has('t4dOut','3,0000000');await page.locator('#t4dx').fill('10');await pick('t4db','2');await settle();
   await has('t4RuleStats','8');await pick('t4Rule','taban');await settle();eq(await page.locator('#t4ry').isVisible(),false);await page.locator('#t4rx').fill('-3');await settle();await has('t4RuleStatus','pozitif');await click('t4RuleReset');await settle();
   await has('t4EqStatus','3,80735');await pick('t4Eq','E4');await settle();await has('t4EqStatus','x = 5');ok((await read('t4Steps')).includes('atılır'));eq(await page.locator('#t4Eb').inputValue(),'10');
   await pick('t4Eq','E2');await settle();await has('t4EqStatus','x = 1');await range('t4e2',2);await range('t4e1',3);await settle();await has('t4EqStatus','gerçek çözüm yok');await click('t4EqReset');await settle();await has('t4EqStatus','x = 1');
   await pick('t4Eq','E3');await settle();await has('t4EqStatus','x = 2,5');await range('t4e1',0);await settle();await has('t4EqStatus','x\'e bağlı değil');await pick('t4Eq','E1');await settle();await range('t4e2',-10);await settle();await has('t4EqStatus','gerçek çözüm yok');await click('t4EqReset');await settle();
   await noOverflow('04');
   // 05
   await click('tab-t5');await settle();await painted('t5r');await painted('t5p');await has('t5Status','10'+NB+'000');await has('t5Stats','10⁻⁴');
   await pick('t5Q','ses');await settle();await has('t5AOut','40 dB');await has('t5Status','1000 kat');await pick('t5Q','deprem');await settle();await has('t5Stats','31,62');await has('t5Note','32');await has('t5Status','1000 kat');await click('t5Reset');await settle();await has('t5AOut','3,0');
   await has('t5pStats','1,492');await range('t5n',0);await settle();await has('t5pStats','1,0000');await has('t5pStats','1,5 (gerçek 1,5)');await pick('t5D','kuvvet');await pick('t5Ax','loglog');await settle();await has('t5pStats','1,7 (gerçek 1,7)');await has('t5pStatus','log-log');
   await pick('t5Ax','dogrusal');await settle();await has('t5pStatus','bükülüyor');await painted('t5p');await click('t5pReset');await settle();await has('t5pStats','1,492');
   await noOverflow('05');
   // 06
   await click('tab-t6');await settle();const ex=await page.evaluate(()=>{const e=window.UsLog.genExercise(1,1);return{shown:e.shown,html:e.html};});
   ok((await page.locator('#t6Q').innerHTML()).includes(ex.html));await page.locator('#t6A').fill('log2(8)');await click('t6Check');await settle();await has('t6F','Yalnız sayı');eq(await page.locator('#t6A').getAttribute('aria-invalid'),'true');
   await page.locator('#t6A').fill('99999');await click('t6Check');await settle();await has('t6F','Henüz değil');eq(await page.locator('#t6H').isVisible(),false);await click('t6Hint');eq(await page.locator('#t6H').isVisible(),true);
   await page.locator('#t6A').fill(ex.shown);await page.locator('#t6A').press('Enter');await settle();await has('t6F','Doğru');await has('t6Score','1 soru doğru, 2 denetleme');
   await click('t6Sol');eq(await page.locator('#t6SolBox').isVisible(),true);await has('t6Steps',ex.shown);await click('t6Next');await settle();await has('t6SOut','2');eq(await page.locator('#t6SolBox').isVisible(),false);eq(await page.locator('#t6A').inputValue(),'');
   for(const L of['2','3']){await pick('t6L',L);await settle();const e=await page.evaluate(L=>{const e=window.UsLog.genExercise(+L,2);return e.shown;},L);await page.locator('#t6A').fill(e);await click('t6Check');await settle();await has('t6F','Doğru');}
   await range('t6S',500);await settle();await click('t6Next');await settle();await has('t6SOut','1');await click('t6Reset');await settle();await has('t6Score','0 soru doğru');eq(await page.locator('#t6L').inputValue(),'1');
   eq(await page.locator('.ul-mcard').count(),8,'sekiz hata kartı');const m0=await read('m-logToplam');await click('mb-logToplam');await settle();ok(m0!==await read('m-logToplam'),'Başka sayılar metni değiştirir');await has('m-yabanciKok','tanımsız');
   await noOverflow('06');
   // tema değişince yeniden çizim
   await click('tab-t4');await settle();await page.evaluate(t=>document.documentElement.setAttribute('data-theme',t),theme==='light'?'dark':'light');await page.waitForTimeout(150);await painted('t4c');
   eq(errors.join(' | '),'',`[${width}] konsol hatası`);await ctx.close();
  }
  console.log(`G us-ve-logaritma: ${checks-before} kalıcı tarayıcı kontrolü PASS (390 px açık, 1280 px koyu)`);
 }finally{await browser?.close();await new Promise(r=>server.close(r));}
}
