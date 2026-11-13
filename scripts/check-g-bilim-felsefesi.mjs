// Bilim felsefesi: çekirdeğin bağımsız denetimi.
// Başvurular sayfanın yollarını yinelemez: elle yazılmış ölçüt tablosu ve uyum sayımı, kaba kuvvet doğruluk tablosu,
// Lagrange ara değerlemesi, ayrı bir evre izleyici, rastgele Dirichlet örneklemesiyle ağırlık payı, ayrı pencere sayacı,
// Bayes kuralının doğrudan sayım biçimi ve elle yazılmış konum tablosu.
import fs from 'node:fs';
import vm from 'node:vm';
import assert from 'node:assert/strict';
const SLUG='bilim-felsefesi';
const html=fs.readFileSync(new URL(`../${SLUG}.html`,import.meta.url),'utf8');
const source=html.split('/* KERNEL-BEGIN */')[1]?.split('/* KERNEL-END */')[0];
assert(source,'Çekirdek sınırları gerekli');
const context={window:{}};vm.createContext(context);vm.runInContext(source,context);
const K=context.window.BilimFel;let checks=0;
const eq=(a,b,m)=>{const x=JSON.stringify(a),y=JSON.stringify(b);assert(x===y,(m?m+': ':'')+x+' ≠ '+y);checks++;},ok=(c,m)=>{assert(c,m);checks++;};
const near=(a,b,tol,m)=>{assert(Math.abs(a-b)<=tol*Math.max(1,Math.abs(b)),`${m}: ${a} ≉ ${b}`);checks++;};
let seed=20261113;const rnd=()=>{seed=(seed*1664525+1013904223)>>>0;return seed/4294967296;},ri=n=>Math.floor(rnd()*n);
ok(Object.isFrozen(K)&&Object.isFrozen(K.DEM)&&Object.isFrozen(K.DEM[0].c)&&Object.isFrozen(K.REVS.kopernik.ev[0]),'çekirdek dondurulmuş');

/* 0. Sayı biçimi */
const NB='\u202F';
for(const[x,d,s]of[[0.5,3,'0,500'],[-1.25,2,'−1,25'],[9999,0,'9999'],[10000,0,'10'+NB+'000'],[1001,0,'1001'],[-0.0001,2,'0,00'],[24*0.25,2,'6,00']])eq(K.fmt(x,d),s,'fmt '+x);
eq(K.pct(0.5),'%50,0');eq(K.pct(0.161,1),'%16,1');

/* 1. Sınır çizme: elle yazılmış tablo. Sütunlar V F P K L; E bilimsel, H değil, ? tartışmalı, . uygulanmaz */
const EXP={metal:'HEE..',demir:'EHH..',neden:'HHH..',su:'EEE..',zar:'HH?..',gorelilik:'HEEEE',astroloji:'H?HHH',psikanaliz:'H?H..',marx:'HEH.H',darwin:'H?E..',sicim:'HH...'};
const CK=['V','F','P','K','L'];eq(K.CRIT.map(c=>c.k),CK);eq(K.DEM.map(d=>d.k),Object.keys(EXP));
for(const[k,row]of Object.entries(EXP))CK.forEach((c,i)=>eq(K.demVerdict(k,c),row[i]==='.'?null:row[i],k+'/'+c));
assert.throws(()=>K.demVerdict('yok','V'));checks++;
/* evrensel ve varlık önermesi iki ölçütü ters yöne çeker */
eq([K.demVerdict('metal','V'),K.demVerdict('metal','F')],['H','E']);eq([K.demVerdict('demir','V'),K.demVerdict('demir','F')],['E','H']);
for(const d of K.DEM)for(const c of CK)ok(typeof d.why[c]==='string'&&d.why[c].length>10,'gerekçe '+d.k+c);
/* uyum: 400 rastgele yanıt setinde bağımsız sayım */
for(let r=0;r<400;r++){const ans={};for(const k of Object.keys(EXP)){const u=ri(4);if(u<3)ans[k]='BDK'[u];}
  const ag=K.demAgreement(ans);
  CK.forEach((c,i)=>{let a=0,n=0;for(const k in ans){const v=EXP[k][i];if(ans[k]==='K'||v==='?'||v==='.')continue;n++;if((ans[k]==='B')===(v==='E'))a++;}eq([ag[c].agree,ag[c].n],[a,n],'uyum '+c);});
  const sh=CK.map(c=>ag[c].n?ag[c].agree/ag[c].n:-1),top=Math.max(...sh);const b=K.demBest(ans);
  eq(b.keys,top<0?[]:CK.filter((c,i)=>Math.abs(sh[i]-top)<1e-12),'en iyi');}
/* ölçüt çatışması */
for(const[k,row]of Object.entries(EXP)){const c=K.demConflict(k),y=CK.filter((x,i)=>row[i]==='E'),n=CK.filter((x,i)=>row[i]==='H');eq(c.yes,y);eq(c.no,n);eq(c.split,y.length>0&&n.length>0);}
/* elle örnek: her şeye "bilimsel" diyen okur */
{const ans={};for(const k of Object.keys(EXP))ans[k]='B';const ag=K.demAgreement(ans);eq([ag.F.agree,ag.F.n],[4,8]);eq([ag.V.agree,ag.V.n],[2,11]);}

/* 2. Duhem–Quine: kendi doğruluk tablom */
const P=['H','Y1','Y2','G'];eq(K.PREMS,P);
for(let m=0;m<16;m++){const kept={};P.forEach((p,i)=>kept[p]=!!(m&(1<<i)));
  let rows=0;const fail=new Set();for(const H of[0,1])for(const Y1 of[0,1])for(const Y2 of[0,1])for(const G of[0,1]){const v={H,Y1,Y2,G};if(P.some(p=>kept[p]&&!v[p]))continue;if(H&&Y1&&Y2&&G)continue;rows++;P.forEach(p=>{if(!v[p])fail.add(p);});}
  eq(K.dqRows(kept).length,rows,'satır '+m);eq(K.dqCanFail(kept),P.filter(p=>fail.has(p)),'yanlış olabilir '+m);
  const nk=P.filter(p=>!kept[p]).length;eq(rows,nk===0?0:(1<<nk)-1,'kapalı biçim (2^k − 1) '+m);}
eq(K.DQ.uranus.hist,'Y1');eq(K.DQ.merkur.hist,'H');
for(const c of Object.values(K.DQ))for(const p of P){ok(c.p[p].length>10);ok(c.out[p].length>20);}
ok(K.DQ.uranus.out.Y1.includes('23 Eylül 1846')&&K.DQ.uranus.out.Y1.includes('bir dereceden az'),'Neptün tarihi');ok(K.DQ.merkur.out.H.includes('43'),'43 yay saniyesi');
/* eğri: Lagrange ara değerlemesi ile bağımsız denetim */
const lag=(xs,ys,x)=>xs.reduce((s,xi,i)=>s+ys[i]*xs.reduce((p,xj,j)=>j===i?p:p*(x-xj)/(xi-xj),1),0);
for(const c of[-0.5,-0.25,0,0.05,0.25,0.5]){const f=K.cfFit(c);near(f.a,0,1e-12,'A sapma');near(f.b,0,1e-12,'B sapma');
  const xs=[0,1,2,3,5],ys=xs.map(x=>K.cfB(c,x));for(const x of[4,-0.3,4.8])near(lag(xs,ys,x),K.cfB(c,x),1e-9,'B polinom '+c);
  near(K.cfB(c,4)-K.cfA(4),24*c,1e-12,'24c');}
eq(K.cfA(4),9);near(K.cfB(0.25,4),15,1e-12);

/* 3. Kuhn: ayrı evre izleyici */
const ROLES=['paradigma','bulmaca','anomali','rakip','yerlesme','direnc'];eq(K.ROLES.map(r=>r[0]),ROLES);
for(const[rk,rev]of Object.entries(K.REVS)){let an=0,ri2=0,ye=0;
  rev.ev.forEach((e,i)=>{ok(ROLES.includes(e.role));if(i)ok(e.y>rev.ev[i-1].y,'kronoloji '+rk+i);if(e.role==='anomali')an++;if(e.role==='rakip')ri2++;if(e.role==='yerlesme')ye++;
    const exp=ye>0?'yeni':(an>0&&ri2>0)?'bunalim':an>0?'anomali':ri2>0?'erken':'normal';const s=K.stageAt(rk,i);eq([s.stage,s.anomalies,s.rivals,s.settled],[exp,an,ri2,ye],rk+' '+i);});}
eq(K.REVS.kopernik.ev.map(e=>K.stageAt('kopernik',K.REVS.kopernik.ev.indexOf(e)).stage),['normal','erken','bunalim','bunalim','bunalim','bunalim','bunalim','bunalim','yeni','yeni','yeni']);
eq(K.REVS.kimya.ev.map((e,i)=>K.stageAt('kimya',i).stage),['normal','normal','normal','anomali','anomali','bunalim','bunalim','bunalim','yeni','yeni','yeni']);
eq(K.REVS.kopernik.ev.map(e=>e.y).slice(1,4),[1543,1572,1577]);eq(K.REVS.kimya.ev.find(e=>e.t.startsWith('Oksijen')).y,1778);
{const ans={0:'paradigma',1:'anomali',2:'anomali'};eq(K.roleAgreement('kopernik',ans),{agree:2,n:3});eq(K.roleAgreement('kimya',{}),{agree:0,n:0});}
/* beş değer: ızgara sayısı C(14,4) = 1001, varsayılan puanlarla kapalı biçim: Kopernik − Ptolemaios = 2(w_yal + w_ver − w_tut) */
const S=K.VDEFAULT;eq(S.ptol,[3,4,3,2,2]);eq(S.kop,[3,2,3,4,4]);
{const sh=K.vShare(S,10);eq(sh.N,1001);let kop=0,pt=0,es=0;for(let a=0;a<=10;a++)for(let b=0;a+b<=10;b++)for(let c=0;a+b+c<=10;c++)for(let d=0;a+b+c+d<=10;d++){const e=10-a-b-c-d;const diff=2*(d+e-b);if(diff>0)kop++;else if(diff<0)pt++;else es++;}
  near(sh.kop,kop/1001,1e-15,'Kopernik payı');near(sh.ptol,pt/1001,1e-15,'Ptolemaios payı');near(sh.esit,es/1001,1e-15,'eşitlik');near(sh.kop+sh.ptol+sh.esit,1,1e-12,'toplam');}
/* rastgele puanlarda ızgara payı, Dirichlet(1,…,1) Monte Carlo ile yaklaşık (eşitlikler ölçü sıfır; ızgara ile MC farkı sınırlı) */
for(let r=0;r<6;r++){const sc={ptol:Array.from({length:5},()=>1+ri(5)),kop:Array.from({length:5},()=>1+ri(5))};const g=K.vShare(sc,40);let kw=0,M=20000;
  for(let m=0;m<M;m++){const w=Array.from({length:5},()=>-Math.log(1-rnd()));if(K.vTotal(sc.kop,w)>K.vTotal(sc.ptol,w))kw++;}
  ok(Math.abs(g.kop+g.esit/2-kw/M)<0.03,`ızgara ~ MC ${g.kop} ${kw/M}`);}
for(let r=0;r<200;r++){const sc={ptol:Array.from({length:5},()=>1+ri(5)),kop:Array.from({length:5},()=>1+ri(5))},w=Array.from({length:5},()=>ri(6));const v=K.vWinner(sc,w);
  const a=sc.ptol.reduce((s,x,i)=>s+x*w[i],0),b=sc.kop.reduce((s,x,i)=>s+x*w[i],0);eq([v.ptol,v.kop,v.win],[a,b,a>b?'ptol':b>a?'kop':'esit']);}

/* 4. Lakatos: ayrı pencere sayacı */
const myStatus=(st,w)=>st.map((_,i)=>st.slice(Math.max(0,i-w+1),i+1).includes('N')?'ilerleyen':'yozlasan');
for(let r=0;r<2000;r++){const n=ri(11),st=Array.from({length:n},()=>'NRA'[ri(3)]),w=1+ri(10);eq(K.lkStatus(st,w),myStatus(st,w));
  const c=K.lkCounts(st);eq([c.N,c.R,c.A],['N','R','A'].map(x=>st.filter(s=>s===x).length));}
assert.throws(()=>K.lkStatus(['N'],0));assert.throws(()=>K.lkCounts(['X']));checks+=2;
const pre=k=>K.LK_PRESETS[k].steps.map(s=>s.s);
eq(pre('newton'),['N','N','R']);eq(pre('einstein'),['A','N']);eq(pre('ornek'),['N','A','A','R','A','N']);eq(pre('bos'),[]);
eq(K.lkStatus(pre('ornek'),3),['ilerleyen','ilerleyen','ilerleyen','yozlasan','yozlasan','ilerleyen']);
eq(K.lkStatus(pre('ornek'),6)[4],'ilerleyen','pencere 6 ile 5. adım');eq(K.lkStatus(pre('newton'),1),['ilerleyen','ilerleyen','yozlasan']);
ok(K.LK_PRESETS.newton.steps[0].d.includes('1758')&&K.LK_PRESETS.newton.steps[0].d.includes('yetmiş iki'),'Halley 1758, Lakatos “yetmiş iki”');
ok(K.REVS.kimya.ev[9].d.includes('33 “basit madde”')&&K.REVS.kimya.ev[10].y===1796,'Traité 33 basit madde, Priestley 1796');
ok(!/Laudan/.test(K.DEM.find(d=>d.k==='sicim').src)&&K.DEM.find(d=>d.k==='sicim').src.includes('Hossenfelder'),'sicim kuramı Laudan\'a atfedilmiyor');

/* 5. Gerçekçilik */
eq(K.RL.map(x=>[x.k,x.S,x.R]),[['kure',true,false],['flojiston',true,false],['kalorik',true,false],['esir',true,false],['atomculuk',false,true],['prout',false,true],['wegener',false,true]]);
eq(K.RL.filter(x=>x.contested).map(x=>x.k),['kure','flojiston']);
for(let r=0;r<300;r++){const ans={};const q={SR:[],Sr:[],sR:[],sr:[]};let a=0,n=0;for(const it of K.RL){const u=ri(5);if(u===4)continue;const S=!!(u&1),R=!!(u&2);if(ri(6)===0){ans[it.k]={S,R:null};continue;}ans[it.k]={S,R};n++;if(S===it.S&&R===it.R)a++;q[(S?'S':'s')+(R?'R':'r')].push(it.k);}
  const res=K.rlCheck(ans);eq([res.agree,res.n],[a,n]);eq(res.quad,q);}
/* Bayes: sayım biçimi (10^6 kuramlık bir nüfus) */
for(const[b,pt,pf]of[[0.5,0.95,0.05],[0.01,0.95,0.05],[0.3,0.8,0.2],[0.99,0.5,0.5]]){const N=1e6,T=b*N,succT=T*pt,succF=(N-T)*pf;near(K.nmaPost(b,pt,pf),succT/(succT+succF),1e-12,'nma');}
near(K.nmaPost(0.5,0.95,0.05),0.95,1e-12);near(K.nmaPost(0.01,0.95,0.05),0.0095/(0.0095+0.0495),1e-12);eq(K.nmaPost(0,1,0),null);
/* konumlar: elle yazılmış tablo (i inan, a askı) */
const POS={gercekci:'iiii',yapisal:'iaia',varlik:'iiaa',kurucu:'iaaa'};eq(K.POSITIONS.map(p=>p.k),Object.keys(POS));eq(K.PS.map(p=>p.k),['gozlem','elektron','yapi','doga']);
for(const[k,row]of Object.entries(POS))K.PS.forEach((p,i)=>eq(K.POSITIONS.find(x=>x.k===k).a[p.k],row[i]==='i'?'inan':'aski'));
for(let r=0;r<500;r++){const ans={};K.PS.forEach(p=>{const u=ri(4);if(u<3)ans[p.k]=['inan','aski','ret'][u];});const m=K.psMatch(ans);
  const sc=Object.entries(POS).map(([k,row])=>K.PS.reduce((s,p,i)=>s+(ans[p.k]&&ans[p.k]===(row[i]==='i'?'inan':'aski')?1:0),0));const n=Object.keys(ans).length,top=Math.max(...sc);
  eq(m.n,n);eq(m.scores.map(s=>s.agree),sc);eq(m.best,n?Object.keys(POS).filter((k,i)=>sc[i]===top):[]);}
eq(K.psMatch({gozlem:'inan',elektron:'aski',yapi:'inan',doga:'aski'}).best,['yapisal']);eq(K.psMatch({gozlem:'inan',elektron:'inan',yapi:'aski',doga:'aski'}).best,['varlik']);

console.log(`G bilim-felsefesi: ${checks.toLocaleString('tr-TR')} bağımsız ölçüt, mantık, evre, ağırlık, program ve Bayes kontrolü PASS`);

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
      noflow=async tag=>{eq(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),true,'yatay taşma: '+tag+' '+width);};
    eq(await page.evaluate(()=>document.title.length<=80&&document.title.startsWith('Bilim Felsefesi: ')),true);eq(await page.locator('[role=tab]').count(),5);
    eq(await page.evaluate(()=>document.body.dataset.page),SLUG);await page.waitForSelector('.digest',{timeout:8000});ok(await page.locator('.digest').first().isVisible(),'Keşif Defteri görünür');
    ok((await page.locator('#panel-sinir').textContent()).includes('McLean v. Arkansas')&&(await page.locator('#panel-sinir').textContent()).includes('5 Ocak 1982'),'McLean tarihi');ok((await page.locator('#panel-dq').textContent()).includes('ilk baskı 1906'),'Duhem 1906');
    /* 1. sekme */
    await has('dmTitle','Bütün metaller');await has('dmAnswered','0 / 11');await has('dmStatus','ayrılıyor');await has('dmStatus','Doğrulama');eq(await page.locator('#dmRows tr').count(),11);
    await click('dmYes');await has('dmAnswered','1 / 11');await has('dmAgreeF','1 / 1');await has('dmAgreeV','0 / 1');await has('dmStatus','Senin yargından ayrılanlar: Doğrulama');eq(await page.locator('#dmRows td.miss').count(),1);
    await click('dmCase-demir');await click('dmNo');await has('dmAgreeF','2 / 2');await has('dmAgreeV','0 / 2');await has('dmBest','Yanlışlama, Popper · %100');
    await click('dmCase-astroloji');await has('dmStatus','Tartışmalı: Yanlışlama');await has('dmFeat','Thagard');await click('dmSkip');await has('dmAnswered','(kararsız 1)');
    await page.locator('#dmRows button[data-go="marx"]').click();await has('dmTitle','Marx');await has('dmStatus','ayrılıyor');await has('dmFeat','pekiştirilmiş dogmacılık');
    await click('dmCase-sicim');await has('dmFeat','uygulanmaz');
    await click('sinirReset');await has('dmAnswered','0 / 11');await has('dmTitle','Bütün metaller');await noflow('sinir');
    /* 2. sekme */
    await click('tab-dq');await has('dqConsistent','Hayır');await has('dqRows','0 / 16');await has('dqStatus','tutarsızdır');await has('dqCanFail','hiçbiri');
    await page.locator('#dqKeep-Y1').uncheck();await has('dqConsistent','Evet');await has('dqRows','1 / 16');await has('dqOutcome','tarihte sonunda izlenen yol');await has('dqOutcome','23 Eylül 1846');await has('dqCanFail','Y₁');
    await page.locator('#dqKeep-Y1').check();await page.locator('#dqKeep-H').uncheck();await has('dqOutcome','izlenen yol bu değildi');await page.locator('#dqKeep-G').uncheck();await has('dqRows','3 / 16');await has('dqStatus','2 öncül');
    await sel('dqCase','merkur');await has('dqRows','0 / 16');await page.locator('#dqKeep-Y1').uncheck();await has('dqOutcome','Vulkan');await has('dqOutcome','26 Mart 1859');await has('dqOutcome','izlenen yol bu değildi');
    await page.locator('#dqKeep-Y1').check();await page.locator('#dqKeep-H').uncheck();await has('dqOutcome','1915');await has('dqOutcome','sonunda izlenen');
    await has('cfFit','0,00 / 0,00');await has('cfPred','9,00 / 15,00');await range('cfC','-0.5');await has('cfPred','9,00 / −3,00');await range('cfC','0');await has('cfStatus','aynıdır');
    await click('dqReset');await has('dqRows','0 / 16');await has('cfCOut','0,25');eq(await page.locator('#dqCase').inputValue(),'uranus');await noflow('dq');
    /* 3. sekme */
    await click('tab-kuhn');await has('kuStage','Olağan bilim');await has('kuStepOut','1 / 11');eq(await page.locator('#kuPrev').isDisabled(),true);await has('kuRoleRes','Önce kendi');
    await click('kuRole-paradigma');await has('kuRoleRes','Sayfanın okumasıyla aynı');await has('kuScore','1 / 1');
    await click('kuNext');await has('kuStage','Rakip var, anomali yok');await has('kuStatus','aynı sırayla');await click('kuRole-anomali');await has('kuRoleRes','Sayfanın okuması');await has('kuScore','1 / 2');
    await click('kuNext');await has('kuStage','Bunalım');await has('kuAnom','1');await has('kuTitle','1572');
    await range('kuStep','11');await has('kuStage','Yeni olağan bilim');await has('kuText','61 Cygni');eq(await page.locator('#kuNext').isDisabled(),true);await has('kuAnom','3');
    await page.locator('#kuList button[data-i="8"]').click();await has('kuTitle','Principia');
    await sel('kuRev','kimya');await has('kuStepOut','1 / 11');await range('kuStep','4');await has('kuStage','Anomaliler birikiyor');await range('kuStep','6');await has('kuStage','Bunalım');await range('kuStep','11');await has('kuStatus','savunan var');await has('kuTitle','1796');
    await has('kvTot','14 / 16');await has('kvWin','Kopernik');await has('kvShare','1001 bileşim');
    await range('kvW1','2');await has('kvTot','18 / 18');await has('kvWin','Eşitlik');await range('kvW1','4');await range('kvW4','0');await has('kvWin','Ptolemaios');
    await sel('kvS-kop-0','5');await has('kvTot','24 / 20');await click('kuhnReset');await has('kvTot','14 / 16');await has('kuStage','Olağan bilim');eq(await page.locator('#kuRev').inputValue(),'kopernik');await has('kuScore','henüz yok');await noflow('kuhn');
    /* 4. sekme */
    await click('tab-lakatos');await has('lkStatus','İlerleyen');await has('lkN','3');await has('lkNovel','2 / 1');eq(await page.locator('#lkSteps li').count(),3);await has('lkSteps','Halley');
    await range('lkWin','1');await has('lkStatus','Yozlaşan');await has('lkMsg','Pencere uzunluğu hükmü değiştiriyor');
    await sel('lkPreset','ornek');await range('lkWin','3');await has('lkN','6');await has('lkStatus','İlerleyen');await has('lkMsg','4, 6. adımlarda');await click('lkUndo');await has('lkStatus','Yozlaşan');await range('lkWin','6');await has('lkStatus','İlerleyen');
    await sel('lkPreset','bos');await has('lkStatus','Adım yok');eq(await page.locator('#lkUndo').isDisabled(),true);await click('lkAddA');await click('lkAddA');await has('lkStatus','Yozlaşan');await click('lkAddN');await has('lkStatus','İlerleyen');await has('lkAdhoc','2');
    for(let i=0;i<9;i++)await click('lkAddR');await has('lkN','10');await click('lkClear');await has('lkN','0');
    await sel('lkPreset','einstein');await has('lkSteps','1919');await has('lkSteps','43 yay saniyelik');
    await click('lakatosReset');await has('lkN','3');await has('lkWinOut','3');await noflow('lakatos');
    /* 5. sekme */
    await click('tab-gercek');await has('rlN','0 / 7');await has('rlAgree','henüz yok');await has('nmPost','0,950');await has('psBest','Önce bir tutum');
    await sel('rlS0','1');await has('rlRes0','İki soruyu');await sel('rlR0','0');await has('rlRes0','seninkiyle aynı');await has('rlN','1 / 7');await has('rlStatus','“Başarılı ama göndermeyen” kutusunda 1');
    await sel('rlS4','1');await sel('rlR4','1');await has('rlAgree','1 / 2');await has('rlQuad','18. yüzyıl kimyasal');
    await click('nmPes');await has('nmPost','0,161');await has('nmStatus','çoğu yanlıştır');await has('nmFalse','%83,9');await click('nmOpt');await has('nmPost','0,950');await range('nmPF','0.5');await has('nmPost','0,655');
    await sel('psS0','inan');await sel('psS1','aski');await sel('psS2','inan');await sel('psS3','aski');await has('psBest','Yapısal gerçekçilik (epistemik) · 4 / 4');eq(await page.locator('#psRows td.miss').count(),5);
    await sel('psS3','ret');await has('psNote','dört konumun hiçbirinde');
    await click('gercekReset');await has('rlN','0 / 7');await has('psN','0 / 4');await has('nmPost','0,950');await noflow('gercek');
    /* sekme klavyesi, R tuşu, etiketler */
    await page.locator('#tab-gercek').focus();await page.keyboard.press('Home');eq(await page.locator('#tab-sinir').getAttribute('aria-selected'),'true');await page.keyboard.press('ArrowLeft');eq(await page.locator('#tab-gercek').getAttribute('aria-selected'),'true');await page.keyboard.press('ArrowRight');eq(await page.locator('#tab-sinir').getAttribute('aria-selected'),'true');await page.keyboard.press('End');eq(await page.locator('#tab-gercek').getAttribute('aria-selected'),'true');
    await click('tab-lakatos');await sel('lkPreset','bos');await page.locator('h1').click();await page.keyboard.press('r');await has('lkN','3');
    eq(await page.evaluate(()=>[...document.querySelectorAll('main input,main select')].filter(e=>!(e.labels&&e.labels.length)&&!e.getAttribute('aria-label')).map(e=>e.id)),[]);
    eq(await page.evaluate(()=>[...document.querySelectorAll('main svg.bf-svg,main canvas')].filter(c=>c.getAttribute('role')!=='img'||!c.getAttribute('aria-label')).length),0);
    eq(await page.evaluate(()=>Object.isFrozen(BilimFel)&&!Object.getOwnPropertyDescriptor(window,'BilimFel').writable),true);
    eq(await page.evaluate(()=>/[̀-ͯ⃗]/.test(document.body.textContent.normalize('NFC'))),false,'birleşik işaret');
    eq(await page.evaluate(()=>/\d\.\d/.test([...document.querySelectorAll('.bf-stat strong,.bf-status,output,.bf-note,.res,.bf-steps,.bf-quad')].map(e=>e.textContent).join(' '))),false,'ondalık nokta');
    for(const t of['sinir','dq','kuhn','lakatos','gercek']){await click('tab-'+t);await noflow('sekme '+t);}
    assert.deepEqual(errors,[]);checks++;await page.close();
  }
  console.log(`G bilim-felsefesi: ${checks-before} tarayıcı kontrolü (390 açık / 1280 koyu; beş sekme, hazırlar, sınırlar, klavye) PASS`);
  }finally{await browser?.close();await new Promise(r=>server.close(r));}
}
