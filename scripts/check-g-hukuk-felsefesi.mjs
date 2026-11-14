// Hukuk felsefesi: çekirdeğin bağımsız denetimi.
// Başvurular sayfanın yollarını yinelemez: okul uyumu bütün 3⁷ tutum bileşiminde ayrı bir puan tablosuyla, argüman
// ağının dayanaklı genişlemesi karakteristik fonksiyonun en küçük sabit noktasıyla, tercih edilen genişlemeler bütün
// alt kümelerin kaba kuvvet taramasıyla, adalet modelleri tamsayı ızgarasında kaba kuvvet eniyilemesi ve KKT
// koşullarıyla, sivil itaatsizlik sınıflandırıcısı ayrı yazılmış bir karar tablosuyla, alıştırma üreteci ise her
// sorunun verisinden yanıtı yeniden hesaplayarak denetlenir. Ayrıca yansızlık, kaynak, alıntı ve hukuk sayfası kuralları.
import fs from 'node:fs';
import vm from 'node:vm';
import assert from 'node:assert/strict';
const SLUG='hukuk-felsefesi';
const html=fs.readFileSync(new URL(`../${SLUG}.html`,import.meta.url),'utf8');
const source=html.split('/* KERNEL-BEGIN */')[1]?.split('/* KERNEL-END */')[0];
assert(source,'Çekirdek sınırları gerekli');
const context={window:{}};vm.createContext(context);vm.runInContext(source,context);
const K=context.window.HukukFelsefe;let checks=0;
const eq=(a,b,m)=>{const x=JSON.stringify(a),y=JSON.stringify(b);assert(x===y,(m?m+': ':'')+x+' ≠ '+y);checks++;},ok=(c,m)=>{assert(c,m);checks++;};
const near=(a,b,tol,m)=>ok(Math.abs(a-b)<=tol,(m||'')+` ${a} ≈ ${b}`);

/* 1. okullar ve tezler */
const TH=K.THESES.map(t=>t.id),SC=K.SCHOOLS.map(s=>s.id);
eq(TH,['T1','T2','T3','T4','T5','T6','T7']);eq(SC,['dogal','pozitivizm','dworkin','fuller','realizm','elestirel']);
for(const s of K.SCHOOLS){ok(s.claims.length>=4,s.id+' iddialar');ok(s.objections.length>=2,s.id+': en az iki itiraz');ok(s.texts.length>10&&s.who.length>5);
  for(const t of TH){const c=s.cells[t];ok(c&&['kabul','ret','kismen','yok'].includes(c[0])&&c[1].length>8,s.id+'/'+t+' hücre');}
  for(const o of s.objections){ok(o.target.length&&o.target.every(t=>TH.includes(t)),s.id+'/'+o.id+' hedef');ok(o.t.length>30&&o.reply.length>30&&o.who,s.id+'/'+o.id+' metin');}
  ok(new Set(s.objections.map(o=>o.id)).size===s.objections.length);
  ok(TH.some(t=>s.cells[t][0]!=='yok'),s.id+' en az bir tutum');}
/* bilinen tutumlar (kaynaklara göre) */
eq(K.SCHOOLS.find(s=>s.id==='pozitivizm').cells.T1[0],'kabul');eq(K.SCHOOLS.find(s=>s.id==='pozitivizm').cells.T2[0],'ret');
eq(K.SCHOOLS.find(s=>s.id==='dworkin').cells.T3[0],'ret','Dworkin takdiri reddeder');eq(K.SCHOOLS.find(s=>s.id==='dworkin').cells.T6[0],'kabul');
eq(K.SCHOOLS.find(s=>s.id==='fuller').cells.T4[0],'kabul');eq(K.SCHOOLS.find(s=>s.id==='realizm').cells.T5[0],'kabul');eq(K.SCHOOLS.find(s=>s.id==='dogal').cells.T2[0],'kabul');
/* her tez en az iki okulu ayırır */
for(const t of TH){const v=new Set(K.SCHOOLS.map(s=>s.cells[t][0]).filter(x=>x!=='yok'));ok(v.size>=2,t+' ayırt edici');}
/* bağımsız puan tablosu, 3⁷ bileşim */
const PT={kabul:{kabul:1,ret:0,kismen:0.5},ret:{kabul:0,ret:1,kismen:0.5}};let combos=0;
for(let m=0;m<3**7;m++){const st={};let x=m;TH.forEach(t=>{const v=['kabul','askida','ret'][x%3];x=Math.floor(x/3);if(v!=='askida')st[t]=v;});combos++;
  const f=K.fit(st);
  K.SCHOOLS.forEach((s,i)=>{let n=0,d=0;for(const t of Object.keys(st)){const c=s.cells[t][0];if(c==='yok')continue;d++;n+=PT[st[t]][c];}eq([f[i].num,f[i].den],[n,d]);eq(f[i].score,d?n/d:null);});
  if(m%97===0)for(const s of K.SCHOOLS){const o=K.objStatus(s.id,st);s.objections.forEach((ob,i)=>eq(o[i].live,ob.target.some(t=>st[t]==='kabul')));}}
assert.throws(()=>K.fit({T1:'belki'}));assert.throws(()=>K.objStatus('yok',{}));checks+=2;

/* 2. argüman ağı */
const N=K.NODES.map(n=>n.id);eq(new Set(N).size,N.length);ok(N.length>=10);
for(const[a,b]of K.ATTACKS){ok(N.includes(a)&&N.includes(b)&&a!==b,'ok '+a+'→'+b);}
for(const n of K.NODES){ok(n.t.length>40&&n.who&&n.year,'düğüm '+n.id);ok(n.x>=50&&n.x<=630&&n.y>=30&&n.y<=370,'düğüm tuvalde '+n.id);}
for(let i=0;i<K.NODES.length;i++)for(let j=i+1;j<K.NODES.length;j++){const a=K.NODES[i],b=K.NODES[j];ok(Math.abs(a.x-b.x)>=100||Math.abs(a.y-b.y)>=60,'kutular çakışmamalı '+a.id+' '+b.id);}
const att=(inc,a)=>K.ATTACKS.filter(e=>e[1]===a&&inc.includes(e[0])).map(e=>e[0]);
function groundedRef(inc){let S=[];for(;;){const nx=inc.filter(a=>att(inc,a).every(b=>att(inc,b).some(c=>S.includes(c))));if(nx.length===S.length)break;S=nx;}
  const lab={};inc.forEach(a=>{lab[a]=S.includes(a)?'in':att(inc,a).some(b=>S.includes(b))?'out':'undec';});return lab;}
const admRef=(set,inc)=>!set.some(a=>att(inc,a).some(b=>set.includes(b)))&&set.every(a=>att(inc,a).every(b=>att(inc,b).some(c=>set.includes(c))));
const subsets=arr=>{const r=[];for(let m=0;m<(1<<arr.length);m++)r.push(arr.filter((_,i)=>m&(1<<i)));return r;};
function prefRef(inc){const adm=subsets(inc).filter(s=>admRef(s,inc));return adm.filter(s=>!adm.some(t=>t.length>s.length&&s.every(x=>t.includes(x)))).map(s=>s.slice().sort()).sort((a,b)=>a.join().localeCompare(b.join()));}
const allInc=subsets(N);let gchecks=0;
for(const inc of allInc){const g=K.grounded(inc),r=groundedRef(inc);eq(Object.keys(g).sort(),inc.slice().sort());for(const a of inc)eq(g[a],r[a],'dayanaklı '+inc.join());gchecks++;}
const sortSets=p=>p.map(s=>s.slice().sort()).sort((a,b)=>a.join().localeCompare(b.join()));
let pc=0;for(let i=0;i<allInc.length;i+=13){const inc=allInc[i];eq(sortSets(K.preferred(inc)),prefRef(inc),'tercih '+inc.join());pc++;}
for(const mine of subsets(N)){const a=K.analyzeSet(mine);eq(a.admissible,admRef(mine,N),'kabul edilebilirlik '+mine.join());eq(a.conflictFree,!mine.some(x=>att(N,x).some(y=>mine.includes(y))));}
{const g=K.grounded();eq(N.filter(a=>g[a]==='in').sort(),['F2','F3','N1','P2']);eq(N.filter(a=>g[a]==='undec').sort(),['F1','H1','R1']);
  const p=sortSets(K.preferred());eq(p.length,2,'iki savunulabilir konum: kazanan yok');ok(p.some(s=>s.includes('H1'))&&p.some(s=>s.includes('R1')&&s.includes('F1')));ok(!p.some(s=>s.includes('H1')&&s.includes('R1')));}
eq(K.analyzeSet(['H1','R1']).conflictFree,false);eq(K.analyzeSet(['H2']).undefended,[['H2','N1']]);
assert.throws(()=>K.grounded(['X9']));assert.throws(()=>K.analyzeSet(['Q']));checks+=2;
for(const k of['cezasiz','geriye','radbruch','yorum'])ok(K.ROUTES[k]&&K.ROUTES[k].t.length>40,'yol '+k);

/* 3. zor davalar */
ok(K.CASES.length>=5);eq(K.CASES.filter(c=>c.real).map(c=>c.id),['riggs'],'tek gerçek dava');
for(const c of K.CASES){const ids=c.options.map(o=>o.id);ok(ids.length>=3&&new Set(ids).size===ids.length);const sch=Object.keys(c.answers);ok(sch.length>=3,c.id+' en az üç okul');
  for(const s of sch){ok(Object.keys(K.CSCHOOL).includes(s));ok(ids.includes(c.answers[s][0]),c.id+'/'+s);ok(c.answers[s][1].length>40);}
  ok(new Set(sch.map(s=>c.answers[s][0])).size>=3,c.id+': okullar en az üç farklı yanıta dağılmalı');
  for(let m=0;m<(ids.length+1)**sch.length&&m<4000;m++){const pk={};let x=m;sch.forEach(s=>{const v=x%(ids.length+1);x=Math.floor(x/(ids.length+1));if(v)pk[s]=ids[v-1];});
    const g=K.gradeCase(c.id,pk);eq([g.correct,g.answered,g.total],[sch.filter(s=>pk[s]===c.answers[s][0]).length,Object.keys(pk).length,sch.length]);}}
{const r=K.CASES.find(c=>c.id==='riggs');eq(r.answers.dworkin[0],'B');ok(r.facts.join(' ').includes('8 Ekim 1889')&&r.facts.join(' ').includes('5’e 2'));}
assert.throws(()=>K.gradeCase('yok',{}));assert.throws(()=>K.gradeCase('riggs',{dworkin:'Z'}));checks+=2;

/* 4. adalet: kaba kuvvet ızgarası ve KKT */
function brute(h,k,B,obj){let best=-Infinity;for(let a=0;a<=B;a++)for(let b=0;a+b<=B;b++)for(let c=0;a+b+c<=B;c++){const x=[a,b,c,B-a-b-c];const v=obj(x);if(v>best)best=v;}return best;}
const OBJ={faydaci:(h,k)=>x=>x.reduce((s,v,i)=>s+Math.sqrt(k[i]*(h[i]+v)),0),rawls:(h)=>x=>Math.min(...x.map((v,i)=>h[i]+v)),yetenek:(h,k)=>x=>Math.min(...x.map((v,i)=>k[i]*(h[i]+v)))};
const R0=K.rng(424242);const scen=[K.JPRESETS.temel,K.JPRESETS.esit,K.JPRESETS.engel];
for(let i=0;i<9;i++)scen.push({B:10*Math.floor(R0()*13),h:[0,1,2,3].map(()=>5*Math.floor(R0()*21)),m:[0,1,2,3].map(()=>Math.floor(R0()*6)),k:[0,1,2,3].map(()=>[0.25,0.5,0.75,1][Math.floor(R0()*4)]),deal:'katki',theft:false});
for(const p of scen){const r=K.justice(p);
  for(const t of['faydaci','rawls','yetenek']){const x=r[t].x;near(x.reduce((s,v)=>s+v,0),p.B,1e-9,t+' bütçe');ok(x.every(v=>v>=-1e-12),t+' negatif pay yok');
    const v=OBJ[t](p.h,p.k)(x),bb=brute(p.h,p.k,p.B,OBJ[t](p.h,p.k));ok(v>=bb-1e-9,`${t}: çekirdek ızgaradan kötü olamaz ${v} < ${bb}`);ok(v-bb<=(t==='faydaci'?0.02:1.0001),`${t}: ızgarayla yakın ${v} ${bb}`);}
  {const x=r.faydaci.x,mu=x.map((v,i)=>Math.sqrt(p.k[i])/(2*Math.sqrt(p.h[i]+v)));const act=x.map(v=>v>1e-9);if(p.B>0&&act.some(Boolean)){const lam=mu[act.indexOf(true)];x.forEach((v,i)=>{if(act[i])near(mu[i],lam,1e-9,'KKT eşit marjinal');else ok(mu[i]<=lam+1e-9,'KKT pasif');});}}
  const sm=p.m.reduce((s,v)=>s+v,0);if(sm>0)p.m.forEach((m,i)=>near(r.aristo.x[i],p.B*m/sm,1e-9,'dağıtıcı orantı'));}
{const r=K.justice(K.JPRESETS.temel);near(r.faydaci.x[2],130/7,1e-9,'Cem faydacı 18,57');near(r.yetenek.x[2],70,1e-9);near(r.rawls.minR,50,1e-9);near(r.yetenek.minC,40,1e-9);near(r.faydaci.minC,100/7,1e-9);
  eq(r.rawls.x,[10,20,40,30]);eq(r.aristo.x,[40,30,20,10]);eq(['aristo','faydaci','rawls','yetenek','nozick'].filter(t=>r[t].equal),[]);
near(r.faydaci.U,Math.sqrt(7)*10,1e-9,'faydacı Σ√c = 10√7');}
{const r=K.justice(K.JPRESETS.esit);for(const t of['aristo','faydaci','rawls','yetenek','nozick'])eq(r[t].x,[25,25,25,25],'eşit senaryo '+t);}
{const r=K.justice(K.JPRESETS.engel);eq(r.faydaci.x,[20,20,0,20],'Sen’in itirazı: düşük dönüşüm, düşük pay');eq(r.yetenek.x,[0,0,60,0]);eq(r.rawls.x,[15,15,15,15]);}
{const a=K.justice(K.JPRESETS.temel),b=K.justice({...K.JPRESETS.temel,theft:true});for(const t of['faydaci','rawls','yetenek'])eq(b[t].r,a[t].r,'son durum kuramları geçmişe bakmaz: '+t);
  eq(b.nozick.r[1]-a.nozick.r[1],-10);eq(b.nozick.r[2]-a.nozick.r[2],10);eq(b.aristo.r[2]-a.aristo.r[2],10);eq(b.rect,true);}
eq(K.justice({...K.JPRESETS.temel,deal:'yok'}).nozick.x,null);eq(K.justice({...K.JPRESETS.temel,deal:'esit'}).nozick.x,[25,25,25,25]);
eq(K.justice({...K.JPRESETS.temel,B:0}).faydaci.x,[0,0,0,0]);
for(const bad of[{B:-1},{k:[0,1,1,1]},{h:[1,2,3]},{deal:'x'}])assert.throws(()=>K.justice({...K.JPRESETS.temel,...bad})),checks++;
/* her hazır değer kaydırıcı adımıyla erişilebilir */
for(const p of Object.values(K.JPRESETS)){ok(p.B%10===0&&p.B<=200);p.h.forEach(v=>ok(v%5===0&&v<=100));p.m.forEach(v=>ok(Number.isInteger(v)&&v<=5));p.k.forEach(v=>ok([0.25,0.5,0.75,1].includes(v)));}

/* 5. sivil itaatsizlik: bağımsız karar tablosu, 2⁸ durum */
const VC=K.VCRIT.map(c=>c.id);eq(VC,['ihlal','aleni','siddetsiz','siyasi','ceza','muafiyet','devir','kisisel']);
for(let m=0;m<256;m++){const f={};VC.forEach((c,i)=>{if(m&(1<<i))f[c]=true;});const r=K.classify(f);
  /* sıra: yasa çiğnenmiyorsa yasal; düzene karşıysa devrimci; siyasi amaç yoksa: yalnız muafiyet (kişisel çıkar olmadan) vicdani ret, değilse sıradan ihlal; siyasi amaçlıysa Rawls'un üç koşulu */
  const exp=!f.ihlal?'yasal':f.devir?'devrimci':!f.siyasi?(f.muafiyet&&!f.kisisel?'vicdani':'suc'):(f.aleni&&f.siddetsiz&&f.ceza?'sivil':'sinirda');
  eq(r.cls,exp,JSON.stringify(f));if(exp==='sinirda')eq(r.missing,['aleni','siddetsiz','ceza'].filter(k=>!f[k]));}
eq(K.classify(Object.fromEntries(K.VPRESETS.oturma.map(k=>[k,true]))).cls,'sivil');eq(K.classify(Object.fromEntries(K.VPRESETS.gizli.map(k=>[k,true]))).missing,['aleni','ceza']);
eq(Object.keys(K.VPRESETS).map(p=>K.classify(Object.fromEntries(K.VPRESETS[p].map(k=>[k,true]))).cls),['sivil','sinirda','vicdani','yasal','suc','devrimci','sinirda']);
assert.throws(()=>K.classify({uydurma:true}));checks++;

/* alıştırma: ayrıştırıcı */
const P=K.parseNum;
for(const[s,v]of[['30',30],[' 30 ',30],['30,0',30],['30.0',30],['12,5',12.5],['12.5',12.5],['25/2',12.5],['25 / 2',12.5],['−5',-5],['-5',-5],['1 200',1200],['1 200',1200],['18 birim',18],[',5',0.5],['7,5/3',2.5]])near(P(s),v,1e-12,'ayrıştır '+s);
for(const s of['','abc','3/0','1,2,3','12a','--4','/2',null])ok(Number.isNaN(P(s)),'reddet '+s);
/* üreteç: 3 düzey × 300 tohum */
let gen=0;
for(const level of[1,2,3])for(let seed=1;seed<=300;seed++){const it=K.generate(level,seed),again=K.generate(level,seed);eq(JSON.stringify(it),JSON.stringify(again),'belirlenimci');gen++;
  ok(it.prompt.length>20&&it.hint.length>5&&it.steps.length>=2,'metin');
  if(level===1){eq(it.options.length,6);eq(K.SORDER[it.answer],K.STATEMENTS[it.data.index][0]);ok(it.prompt.includes(K.STATEMENTS[it.data.index][1]));}
  else if(level===2){const c=K.CONCEPTS[it.data.index];eq(it.options[it.answer],c[1][0]);eq(it.options.slice().sort(),c[1].slice().sort());ok(new Set(it.options).size===4);}
  else{const d=it.data;let exp;
    if(it.kind==='dagitici'){const s=d.c[0]+d.c[1]+d.c[2];exp=d.c[d.j]*d.T/s;ok(Number.isInteger(exp));ok(it.prompt.includes(String(d.T)));}
    else if(it.kind==='duzeltici'){exp=d.b;ok(it.prompt.includes(String(d.a+d.d))&&it.prompt.includes(String(d.b-d.d))&&d.b-d.d>0);}
    else{const mins=d.rows.map(r=>Math.min(...r)),sums=d.rows.map(r=>r.reduce((a,b)=>a+b,0));ok(new Set(mins).size===3&&new Set(sums).size===3,'tek en iyi');
      const bm=mins.indexOf(Math.max(...mins)),bs=sums.indexOf(Math.max(...sums));ok(bm!==bs,'maximin ve toplam farklı toplum seçmeli');exp=it.kind==='maximin'?mins[bm]:sums[bs];d.rows.flat().forEach(v=>ok(it.prompt.includes(String(v))));}
    eq(it.answer,exp,it.kind+' '+seed);eq(K.gradeItem(it,String(exp).replace('.',',')).ok,true);eq(K.gradeItem(it,String(exp+1)).ok,false);eq(K.gradeItem(it,'abc').valid,false);}
  if(it.options){eq(K.gradeItem(it,it.answer).ok,true);eq(K.gradeItem(it,(it.answer+1)%it.options.length).ok,false);}}
{const kinds=new Set();for(let s=1;s<=60;s++)kinds.add(K.generate(3,s).kind);eq([...kinds].sort(),['dagitici','duzeltici','maximin','toplam']);}
{const seen=new Set();for(let s=1;s<=300;s++)seen.add(K.generate(1,s).data.index);ok(seen.size===K.STATEMENTS.length,'bütün cümleler üretilir');}
for(const sc of K.SORDER)ok(K.STATEMENTS.filter(s=>s[0]===sc).length>=3,'her okuldan en az üç cümle: '+sc);
eq(K.QUIZ_IDX.map(i=>K.STATEMENTS[i][0]).filter((v,i,a)=>a.indexOf(v)===i).length,6,'sınıflandırma alıştırması altı okulu da içerir');
assert.throws(()=>K.generate(4,1));assert.throws(()=>K.generate(1,0));checks+=2;
ok(K.MISTAKES.length>=5);for(const k of['kanun ne derse adildir','dine dayanmak','Hart','Dworkin','eşitlik'])ok(K.MISTAKES.some(m=>m[0].includes(k)),'sık hata: '+k);

/* sayfa kuralları */
const site=fs.readFileSync(new URL('./check-site.mjs',import.meta.url),'utf8');const prefixes=[...site.split('const SOURCE_PREFIXES = [')[1].split('];')[0].matchAll(/"([^"]+)"/g)].map(m=>m[1]);ok(prefixes.length>50);
const title=html.match(/<title>([^<]+)<\/title>/)[1];ok(title.startsWith('Hukuk Felsefesi: ')&&title.length<=80,'başlık');
ok(/data-page="hukuk-felsefesi"/.test(html));ok(!/[̀-ͯ⃗]/.test(html),'birleşik harf üstü işaret yok');
ok(!/<script[^>]+src="https?:/.test(html)&&!/<link[^>]+href="https?:/.test(html),'dış betik/yazı tipi yok');
const text=html.replace(/<script[\s\S]*?<\/script>/g,'').replace(/<style[\s\S]*?<\/style>/g,'').replace(/<[^>]+>/g,' ');
const all=text+source;
for(const re of[/kanıtlanmıştır/i,/çürütülmüştür/i,/doğru okul/i,/kazanan okul/i,/en doğru kuram/i,/haklı olan .{0,20}(okul|kuram)/i])ok(!re.test(all),'yansızlık: '+re);
ok(/hiçbir okulu kazanan ilan etmez/.test(text),'yansızlık beyanı');
ok(text.includes('Bu sayfa hukuki danışmanlık değildir; somut bir durum için bir avukata ya da baro adli yardım bürosuna başvurun.'),'hukuki danışmanlık notu');
ok((source.match(/Kurgusal olay:/g)||[]).length===K.CASES.filter(c=>!c.real).length,'kurgusal olay etiketi');ok(/kurgusal olay/.test(text));
for(const u of[...html.matchAll(/href="(https?:[^"]+)"/g)].map(m=>m[1]))ok(prefixes.some(p=>u.startsWith(p)),'izinli bağlantı '+u);
for(const l of['felsefi-dusunce-deneyleri','epistemoloji','roma-hukuku','mantik-ve-argumantasyon','oyun-kurami'])ok(html.includes(`href="${l}.html"`)&&fs.existsSync(new URL(`../${l}.html`,import.meta.url)),'bağlantı '+l);
for(const[p,n]of[['hukuka-giris','Hukuka Giriş: Norm, Kaynak, Yorum'],['anayasa-hukuku-ve-temel-haklar','Anayasa Hukuku ve Temel Haklar'],['ceza-hukukunun-genel-ilkeleri','Ceza Hukukunun Genel İlkeleri'],['borclar-ve-sozlesme-hukuku','Borçlar ve Sözleşme Hukuku']]){ok(html.includes(`href="${p}.html"`),'hukuk sayfasına bağlantı: '+p);ok(!text.includes(n+' (hazırlanıyor)'),'hazırlanıyor notu kalmadı: '+p);}
for(const q of[...text.matchAll(/“([^”]+)”/g)].map(m=>m[1]))ok(q.split(/\s+/).length<=15,'alıntı en çok 15 sözcük: '+q);
ok(/telif hakkıyla korunduğu için burada yalnız açımlanmıştır/.test(text),'King mektubu açımlama notu');
ok(!/\b\d+\.\d+\s*(birim|%)/.test(text),'ondalık nokta yok');
/* doğrulayıcı eklemeleri (13.11.2026) */
for(let sd=1;sd<=300;sd++){const it=K.generate(3,sd);if(it.kind==='dagitici'){ok(!/A’nin/.test(it.prompt+it.steps.join(' ')),'ek uyumu: A’nın '+sd);if(it.data.j===0)ok(it.prompt.includes('A’nın payı'),'A’nın payı '+sd);}}
ok(K.NODES.find(n=>n.id==='F3').year.includes('sayfanın yeniden kurgusu'),'F3 sayfanın yeniden kurgusu olarak etiketli');
ok(/F3 tek bir yazarın metni değildir/.test(html),'sınırlar notunda F3 etiketi');
{const r=K.SCHOOLS.find(s=>s.id==='pozitivizm').objections.find(o=>o.id==='nazi').reply;ok(!/Hart ve Raz bunu açıkça reddeder/.test(r)&&/suçlaması temelsizdir/.test(r),'nazi itirazının yanıtı SEP’in dediğiyle sınırlı');}
ok(!/yasaların kadının davranışını haklı kılmadığı/.test(html)&&/vicdanına ve adalet duygusuna aykırı/.test(html),'ihbarcı eş: mahkemenin gerekçesi Hart’ın aktardığı gibi');
ok(/evlilik iyisi/.test(html)&&html.includes('https://plato.stanford.edu/entries/natural-law-ethics/'),'Finnis: evlilik sonradan, kaynaklı');
console.log(`G hukuk felsefesi: ${checks.toLocaleString('tr-TR')} bağımsız çekirdek kontrolü PASS (${combos} tutum bileşimi, ${gchecks} ağ alt kümesi, ${pc} tercih taraması, ${gen} üretilmiş soru)`);

if(process.argv.includes('--browser')){
  const {chromium}=await import('playwright');const {createServer}=await import('node:http');const {join,extname}=await import('node:path');const {fileURLToPath}=await import('node:url');const root=fileURLToPath(new URL('../',import.meta.url));
  const server=createServer((req,res)=>{const file=join(root,decodeURIComponent(new URL(req.url,'http://localhost').pathname));if(!fs.existsSync(file)||fs.statSync(file).isDirectory()){res.writeHead(404).end();return;}res.setHeader('Content-Type',({'.html':'text/html; charset=utf-8','.js':'text/javascript; charset=utf-8','.css':'text/css; charset=utf-8'})[extname(file)]||'application/octet-stream');res.end(fs.readFileSync(file));});await new Promise(r=>server.listen(0,'127.0.0.1',r));let browser;
  const DIGEST=`/shared/digest/${SLUG}.js`,hasDigest=fs.existsSync(new URL(`..${DIGEST}`,import.meta.url));
  try{browser=await chromium.launch();const before=checks;
  for(const[width,theme]of[[390,'light'],[1280,'dark']]){
    const page=await browser.newPage({viewport:{width,height:900},deviceScaleFactor:width===390?2:1,hasTouch:width===390});await page.addInitScript(t=>{localStorage.setItem('acelya-theme',t);localStorage.setItem('acelya-sound-muted','1');},theme);page.setDefaultTimeout(8000);
    const errors=[];page.on('pageerror',e=>errors.push(e.message));page.on('console',m=>{if(m.type()==='error'&&!/404|Failed to load resource/.test(m.text()))errors.push(m.text());});
    page.on('response',r=>{if(r.status()>=400&&!(r.status()===404&&!hasDigest&&r.url().endsWith(DIGEST)))errors.push(r.status()+' '+r.url());});
    const requests=[];page.on('request',r=>{const u=new URL(r.url());if(u.hostname!=='127.0.0.1'&&!/^fonts\.(googleapis|gstatic)\.com$/.test(u.hostname))requests.push(r.url());});
    await page.goto(`http://127.0.0.1:${server.address().port}/${SLUG}.html`);await page.locator('#pSeed').waitFor();
    const click=id=>page.locator('#'+id).click(),read=id=>page.locator('#'+id).textContent(),has=async(id,text)=>{const t=await read(id);assert(t.includes(text),`${id}: “${t}” içinde “${text}” yok (${width})`);checks++;},
      range=(id,v)=>page.locator('#'+id).evaluate((e,v)=>{e.value=v;e.dispatchEvent(new Event('input',{bubbles:true}));},v),sel=(id,v)=>page.locator('#'+id).selectOption(v),
      cls=async(id,c)=>{eq((await page.locator('#'+id).getAttribute('class')).split(' ').includes(c),true,id+' sınıfı '+c);},
      noflow=async tag=>{eq(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),true,'yatay taşma: '+tag+' '+width);};
    eq(await page.evaluate(()=>document.title.length<=80),true);
    /* 1. sekme */
    await has('tCount','0 kabul · 7 askıda · 0 ret');await has('tStatus','Henüz hiçbir teze');await has('tBest','—');eq(await page.locator('#tRows tr').count(),7);
    await click('t-T1-kabul');await has('tCount','1 kabul · 6 askıda · 0 ret');await has('tB-pozitivizm','1,0 / 1 · %100');await has('tB-dogal','0,5 / 1 · %50');await has('tB-dworkin','0,0 / 1 · %0');await has('tB-elestirel','karşılaştırılacak tez yok');
    await cls('tT-T1','is-kabul');eq(await page.locator('#t-T1-kabul').getAttribute('aria-pressed'),'true');await cls('sO-dworkin','is-canli');await has('tStatus','haklı olduğu anlamına gelmez');
    await click('t-T3-ret');await has('tB-dworkin','1,0 / 2 · %50');await has('tB-pozitivizm','1,0 / 2 · %50');
    await click('t-T5-kabul');await has('tBest','Hukuki realizm');
    await sel('sSel','fuller');await has('sCard','Kral Rex');eq(await page.locator('#sObj .hf-obj').count(),2);await sel('sSel','realizm');await cls('sO-icbakis','is-canli');
    await click('c0-pozitivizm');await has('cFb0','Yanlış; doğrusu Doğal hukuk');eq(await page.locator('#c0-dogal').getAttribute('data-res'),'ok');await click('c1-pozitivizm');await has('cScore','1 / 2 doğru');
    await click('tNone');await has('tCount','0 kabul');await click('t-T2-ret');await click('okulReset');await has('tCount','0 kabul · 7 askıda');await has('cScore','Henüz yanıt yok');eq(await page.locator('#sSel').inputValue(),'pozitivizm');await noflow('okullar');
    /* 2. sekme */
    await click('tab-hartfuller');await has('gGround','{F2, F3, N1, P2}');await has('gUndec','H1, R1, F1');await has('gPref','2 konum');await has('gMine','boş');await has('gStatus','tek bir kazanan belirlemez');
    eq(await page.locator('#gSvg .nd').count(),11);await cls('gN-H1','undec');await cls('gN-Z1','out');await cls('gN-F3','in');
    await click('gHart');await has('gMine','Savunulabilir');eq(await page.locator('#gM-H1').isChecked(),true);eq(await page.locator('#gM-R1').isChecked(),false);
    await click('gRad');await has('gMine','Savunulabilir');eq(await page.locator('#gM-F1').isChecked(),true);await cls('gN-R1','mine');
    await page.locator('#gM-H1').check();await has('gMine','Çelişkili');await has('gStatus','birbirine saldırıyor');
    await click('hfReset');await page.locator('#gM-H2').check();await has('gMine','Kendini savunmuyor');await has('gStatus','N1, H2 argümanına saldırıyor');
    await page.locator('#gI-F3').uncheck();await has('gUndec','H1, R1');await cls('gN-F3','off');await cls('gN-Z1','in');eq(await page.locator('#gM-F3').isDisabled(),true);
    await sel('iRoute','geriye');await has('iRouteFb','Hart (1958)');await click('hfReset');eq(await page.locator('#iRoute').inputValue(),'');await has('gUndec','H1, R1, F1');await noflow('hartfuller');
    /* 3. sekme */
    await click('tab-davalar');eq(await page.locator('#dSel').inputValue(),'riggs');await has('dCase','gerçek dava');await has('dScore','0 / 4 seçildi');
    for(const[s,v]of[['dworkin','B'],['pozitivizm','C'],['dogal','B'],['realizm','D']])await sel('dP-'+s,v);await has('dScore','4 / 4 seçildi');await click('dCheck');await has('dScore','4 / 4 doğru');await has('dTotal','4 / 4');await has('dV-dworkin','ilkelerin de hukuk');
    await sel('dSel','gizli');await has('dCase','kurgusal olay');await sel('dP-fuller','A');await click('dCheck');await has('dScore','0 / 4 doğru');await has('dTotal','4 / 4');await has('dV-fuller','tipik yanıt: B');
    await sel('dSel','park');await click('dShow');await has('dV-pozitivizm','Tipik yanıt: C');await click('davaReset');await has('dTotal','0 / 0');eq(await page.locator('#dSel').inputValue(),'riggs');await noflow('davalar');
    /* 4. sekme */
    await click('tab-adalet');await has('jCem','18,6 / 70,0');await has('jMinC','14,3 / 25,0 / 40,0');await has('jU','26,46 / 26,21');await has('jEq','hiçbiri');await has('jStatus','Sen’in itirazı');await has('jBOut','100 birim');
    await has('jC-rawls-2','40,0');await has('jC-yetenek-0','0,0');await has('jUt-yetenek','25,30');
    await sel('jPreset','esit');await has('jEq','Aristoteles, faydacı, Rawls, yetenek, Nozick');await has('jStatus','Bütün kuramlar eşit pay');
    await sel('jPreset','engel');await has('jCem','0,0 / 60,0');await has('jBOut','60 birim');
    await sel('jPreset','temel');await page.locator('#jTheft').check();await has('jStatus','Haksız edinim düzeltildi');await has('jC-nozick-2','r 40,0');eq(await page.locator('#jPreset').inputValue(),'ozel');
    await sel('jDeal','yok');await has('jC-nozick-0','—');await has('jStatus','formülü vermez');
    await range('jB',0);await has('jStatus','sıfır');await has('jEq','gelir yok');
    await sel('jWho','2');await range('jK',1);await has('jKOut','1,00');await click('adaletReset');await has('jCem','18,6 / 70,0');eq(await page.locator('#jWho').inputValue(),'0');await noflow('adalet');
    /* 5. sekme */
    await click('tab-itaat');await has('vClass','Sivil itaatsizlik');await has('vMissing','yok');
    await sel('vPreset','gizli');await has('vClass','Rawls’un tanımının dışında');await has('vMissing','aleni olması, yasal sonuçlara katlanılması');
    await sel('vPreset','vicdani');await has('vClass','Vicdani ret');await page.locator('#v-ihlal').uncheck();await has('vClass','Yasal eylem');eq(await page.locator('#vPreset').inputValue(),'ozel');
    await sel('vPreset','devrim');await has('vClass','Devrimci');await click('itaatReset');await has('vClass','Sivil itaatsizlik');await noflow('itaat');
    /* alıştırma */
    await has('pSeed','1 · 1');await has('pScore','—');const ans1=K.generate(1,1).answer;await click('pOpt'+((ans1+1)%6));await has('pFb','Henüz değil');await has('pScore','0 / 1');await click('pOpt'+ans1);await has('pFb','Doğru');await has('pScore','0 / 1');
    await click('pNew');await has('pSeed','1 · 2');await click('pOpt'+K.generate(1,2).answer);await has('pScore','1 / 2');
    await sel('pLevel','3');await has('pSeed','3 · 1');eq(await page.locator('#pNumBox').isVisible(),true);const it3=K.generate(3,1);
    await page.locator('#pAns').fill('abc');await click('pCheck');await has('pFb','okunamadı');await has('pScore','1 / 2');
    await page.locator('#pAns').fill(String(it3.answer)+',0');await page.locator('#pAns').press('Enter');await has('pFb','Doğru');await has('pScore','2 / 3');
    await click('pNew');await click('pSolBtn');eq(await page.locator('#pSol').isVisible(),true);await page.locator('#pAns').fill(String(K.generate(3,2).answer));await click('pCheck');await has('pScore','2 / 3');
    await sel('pLevel','2');await click('pHintBtn');eq(await page.locator('#pHint').isVisible(),true);await click('alistirmaReset');await has('pSeed','1 · 1');await has('pScore','—');
    await page.locator('#m0 summary').click();eq(await page.locator('#m0 p').isVisible(),true);eq(await page.locator('#mList details').count(),8);
    /* klavye, R tuşu, etiketler, biçim, gizlilik */
    await page.locator('#tab-okullar').focus();await page.keyboard.press('End');eq(await page.locator('#tab-itaat').getAttribute('aria-selected'),'true');await page.keyboard.press('ArrowRight');eq(await page.locator('#tab-okullar').getAttribute('aria-selected'),'true');await page.keyboard.press('ArrowLeft');eq(await page.locator('#tab-itaat').getAttribute('aria-selected'),'true');await page.keyboard.press('Home');eq(await page.locator('#tab-okullar').getAttribute('aria-selected'),'true');
    await click('t-T4-kabul');await page.locator('h1').click();await page.keyboard.press('r');await has('tCount','0 kabul');
    await click('tab-adalet');await range('jB',50);await page.locator('h1').click();await page.keyboard.press('r');await has('jBOut','100 birim');
    eq(await page.evaluate(()=>[...document.querySelectorAll('main input,main select')].filter(e=>!(e.labels&&e.labels.length)&&!e.getAttribute('aria-label')).map(e=>e.id)),[]);
    eq(await page.evaluate(()=>[...document.querySelectorAll('main button')].filter(b=>!b.textContent.trim()&&!b.getAttribute('aria-label')).length),0);
    eq(await page.evaluate(()=>Object.isFrozen(HukukFelsefe)&&Object.isFrozen(HukukFelsefe.SCHOOLS[0].cells)&&!Object.getOwnPropertyDescriptor(window,'HukukFelsefe').writable),true);
    eq(await page.evaluate(()=>/\d\.\d/.test([...document.querySelectorAll('.hf-stat strong,.hf-status,output,#jRows,#tBars')].map(e=>e.textContent).join(' '))),false,'ondalık nokta');
    eq(await page.evaluate(()=>Object.keys(localStorage).filter(k=>!/^acelya-(theme|sound-muted)$/.test(k))),[],'sayfa localStorage kullanmamalı');
    eq(requests,[],'dış istek');
    assert.deepEqual(errors,[]);checks++;await page.close();
  }
  console.log(`G hukuk felsefesi: ${checks-before} tarayıcı kontrolü (390 açık / 1280 koyu; beş sekme, alıştırma, hazırlar, sıfırlamalar, klavye) PASS`);
  }finally{await browser?.close();await new Promise(r=>server.close(r));}
}
