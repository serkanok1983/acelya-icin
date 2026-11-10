// Targeted regression: direct quadrature, force/moment balances, and support geometry.
// The HTML is the implementation; these references do not repeat its closed-form solvers.
import fs from 'node:fs';
import vm from 'node:vm';
import assert from 'node:assert/strict';
const html=fs.readFileSync(new URL('../statik.html',import.meta.url),'utf8');
const source=html.split('/* KERNEL-BEGIN */')[1]?.split('/* KERNEL-END */')[0];
assert(source,'Statics kernel boundaries are required');
const context={window:{}};vm.createContext(context);vm.runInContext(source+';globalThis.K={distributed,beam,truss,supports,rank};',context);
const K=context.K;let checks=0;
const near=(actual,expected,tolerance=2e-9)=>{assert(Math.abs(actual-expected)<=tolerance*Math.max(1,Math.abs(expected)),`${actual} ≠ ${expected}`);checks++;};
const eq=(a,b)=>{assert.equal(a,b);checks++;};
const simpson=(fn,a,b)=>{const n=20,h=(b-a)/n;let sum=fn(a)+fn(b);for(let i=1;i<n;i++)sum+=(i%2?4:2)*fn(a+i*h);return h*sum/3;};
for(const[a,b]of[[0,6],[1,5],[2.5,3],[0,.5]])for(const q0 of[0,.5,2,6,10])for(const q1 of[0,.5,2,6,10]){
 const q=x=>q0+(q1-q0)*(x-a)/(b-a),W=simpson(q,a,b),M=simpson(x=>x*q(x),a,b),r=K.distributed({a,b,q0,q1});near(r.W,W);near(r.moment,M);if(W===0)eq(r.x,null);else near(r.x,M/W);
 for(const supportB of[1,3,6])for(const P of[-20,0,10]){const c={L:6,supportB,loadA:a,loadB:b,q0,q1,P,xP:5.5},s=K.beam(c);near(s.RA+s.RB-W-P,0);for(const O of[-2,0,3,6])near(-O*s.RA+(supportB-O)*s.RB-simpson(x=>(x-O)*q(x),a,b)-P*(5.5-O),0);}
}
const triangle=K.beam({L:6,supportB:6,loadA:0,loadB:6,q0:0,q1:4,P:0,xP:3});near(triangle.load.W,12);near(triangle.load.x,4);near(triangle.RA,4);near(triangle.RB,8);
const trap=K.distributed({a:1,b:5,q0:2,q1:6});near(trap.W,16);near(trap.x,10/3);
const lift=K.beam({L:6,supportB:3,loadA:0,loadB:6,q0:0,q1:0,P:10,xP:6});near(lift.RA,-10);near(lift.RB,20);eq(lift.contact,false);
for(const span of[2,4,10])for(const height of[.05,.1,1,3,5])for(const Fx of[-20,0,20])for(const Fy of[-20,0,20]){
 const r=K.truss({span,height,Fx,Fy});eq(r.singular,false);eq(r.rank,6);const[NAC,NBC,NAB]=r.forces,[Ax,Ay,By]=r.reactions;
 // Reconstruct all joint force vectors from physical coordinates, independent of the HTML matrix.
 const sums=[[Ax,Ay],[0,By],[Fx,Fy]],points=[[0,0],[span,0],[span/2,height]];
 for(const[u,v,N]of[[0,2,NAC],[1,2,NBC],[0,1,NAB]]){const dx=points[v][0]-points[u][0],dy=points[v][1]-points[u][1],l=Math.hypot(dx,dy);sums[u][0]+=N*dx/l;sums[u][1]+=N*dy/l;sums[v][0]-=N*dx/l;sums[v][1]-=N*dy/l;}
 sums.flat().forEach(v=>near(v,0));near(Ax+Fx,0);near(Ay+By+Fy,0);near(span*By+span/2*Fy-height*Fx,0);
 const mirror=K.truss({span,height,Fx:-Fx,Fy});near(mirror.forces[0],NBC);near(mirror.forces[1],NAC);near(mirror.reactions[1],By);
}
const ref=K.truss({span:4,height:3,Fx:0,Fy:-10});near(ref.forces[0],-5*Math.sqrt(13)/3);near(ref.forces[1],-5*Math.sqrt(13)/3);near(ref.forces[2],10/3);
const shallow=K.truss({span:4,height:.05,Fx:0,Fy:-10});near(shallow.forces[2],200);assert(shallow.forces[0]<-200);checks++;
for(const Fy of[-10,0,10]){const s=K.truss({span:4,height:0,Fx:3,Fy});eq(s.singular,true);eq(s.rank,5);eq(s.compatible,Fy===0);eq(s.forces,null);}
for(const[kind,count,rank]of[['simple',3,3],['pins',4,3],['rollers',2,2],['parallel3',3,2],['fixed',3,3]])for(const Fx of[-1,0,1])for(const Fy of[-10,0,10])for(const x of[0,2,4])for(const lambda of[-7,0,9]){
 const s=K.supports(kind,{L:4,Fx,Fy,x,lambda});eq(s.count,count);eq(s.rank,rank);eq(s.freedom,3-rank);eq(s.redundancy,count-rank);eq(s.compatible,rank===3||Fx===0);
 if(s.values){near(s.matrix[0].reduce((sum,v,i)=>sum+v*s.values[i],Fx),0);near(s.matrix[1].reduce((sum,v,i)=>sum+v*s.values[i],Fy),0);near(s.matrix[2].reduce((sum,v,i)=>sum+v*s.values[i],x*Fy),0);}
 if(rank===2){assert(s.matrix[0].every(v=>v===0));checks++;} // horizontal translation is invisible to every reaction.
}
const p0=K.supports('pins',{lambda:0}),p1=K.supports('pins',{lambda:5});near(p1.values[0]-p0.values[0],-5);near(p1.values[2]-p0.values[2],5);
const fixed=K.supports('fixed',{Fx:2,Fy:-10,x:3});near(fixed.values[0],-2);near(fixed.values[1],10);near(fixed.values[2],30);
for(const call of[()=>K.distributed({a:2,b:2,q0:1,q1:2}),()=>K.truss({span:0,height:1,Fx:0,Fy:0}),()=>K.beam({L:6,supportB:0,loadA:0,loadB:6,q0:2,q1:2,P:0,xP:3}),()=>K.supports('unknown')]){assert.throws(call);checks++;}
console.log(`F1 statik: ${checks.toLocaleString('tr-TR')} bağımsız integral, kuvvet/moment, düğüm ve rank kontrolü PASS`);

if(process.argv.includes('--browser')){
 const {chromium}=await import('playwright');const {createServer}=await import('node:http');const {join,extname}=await import('node:path');const {fileURLToPath}=await import('node:url');const root=fileURLToPath(new URL('../',import.meta.url));
 const server=createServer((req,res)=>{const file=join(root,decodeURIComponent(new URL(req.url,'http://localhost').pathname));if(!fs.existsSync(file)||fs.statSync(file).isDirectory()){res.writeHead(404).end();return;}res.setHeader('Content-Type',({'.html':'text/html; charset=utf-8','.js':'text/javascript; charset=utf-8','.css':'text/css; charset=utf-8'})[extname(file)]||'application/octet-stream');res.end(fs.readFileSync(file));});await new Promise(r=>server.listen(0,'127.0.0.1',r));let browser;
 try{browser=await chromium.launch();const page=await browser.newPage({viewport:{width:390,height:900},deviceScaleFactor:2});await page.addInitScript(()=>{localStorage.setItem('acelya-theme','light');localStorage.setItem('acelya-sound-muted','1');});page.setDefaultTimeout(5000);const errors=[];page.on('pageerror',e=>errors.push(e.message));await page.goto(`http://127.0.0.1:${server.address().port}/statik.html`);
 const before=checks,click=id=>page.locator('#'+id).click(),read=id=>page.locator('#'+id).textContent(),range=async(id,v)=>page.locator('#'+id).evaluate((e,v)=>{e.value=v;e.dispatchEvent(new Event('input',{bubbles:true}));},v),has=async(id,text)=>{assert((await read(id)).includes(text),id+' / '+text);checks++;};
 await has('beamRA','6 kN');await click('beamTriangle');await has('beamX','4 m');await has('beamRA','4 kN');await has('beamRB','8 kN');await click('beamTrap');await has('beamW','16 kN');await has('beamX','3,333');await has('beamRA','7,111');await has('beamRB','8,889');await click('beamLift');await has('beamRA','-10');await has('beamRB','20');await has('beamStatus','Temas koşulu sağlanmıyor');await has('beamX','Tanımsız');await click('beamReset');await has('beamRA','6 kN');
 await click('tab-truss');await click('trussZero');await has('trussRank','5 / 6');await has('trussAC','Tanımsız');await has('trussStatus','dengesi kurulamaz');await range('trussFy',0);await has('trussStatus','denge ailesi');await click('trussReset');await has('trussAC','-6,009');await has('trussRank','6 / 6');
 await click('tab-support');await page.locator('#supportKind').selectOption('parallel3');await has('supportCount','3');await has('supportRank','2');await has('supportFreedom','1');await click('supportNudge');await has('supportStatus','Denge yok');await has('supportRows','Çözüm yok');await range('supportFx',0);await page.locator('#supportKind').selectOption('pins');await range('supportLambda',5);await has('supportRows','-5');await has('supportCheck','ΣFₓ=0 kN; ΣFᵧ=0 kN; ΣM_A=0 kN·m');await has('supportExtra','1');await click('supportReset');await has('supportExtra','0');eq(await page.locator('#supportLambda').isDisabled(),true);
 await page.locator('#tab-support').focus();await page.keyboard.press('Home');eq(await page.locator('#tab-beam').getAttribute('aria-selected'),'true');await page.keyboard.press('ArrowRight');eq(await page.locator('#tab-truss').getAttribute('aria-selected'),'true');await page.keyboard.press('End');eq(await page.locator('#tab-support').getAttribute('aria-selected'),'true');eq(await page.evaluate(()=>Object.isFrozen(StaticsLab)&&!Object.getOwnPropertyDescriptor(window,'StaticsLab').writable),true);eq(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),true);assert.deepEqual(errors,[]);checks++;console.log(`F1 statik: ${checks-before} kalıcı gerçek mobil UI/tekillik/temas/rank/klavye kontrolü PASS`);
 }finally{await browser?.close();await new Promise(r=>server.close(r));}
}
