// B1: sayfalardaki gerçek hesap çekirdeklerinin matematiksel referanslarla denetimi.
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import assert from 'node:assert/strict';
import { fileURLToPath } from 'node:url';
const root = fileURLToPath(new URL('..', import.meta.url));
let checks = 0;
const equal = (actual, expected, label) => { assert.equal(actual, expected, label); checks++; };
const close = (actual, expected, label, tolerance = 1e-10) => { assert.ok(Math.abs(actual - expected) <= tolerance * Math.max(1, Math.abs(expected)), `${label}: ${actual} ≠ ${expected}`); checks++; };
function kernel(slug, start, end) {
  const html = fs.readFileSync(path.join(root, `${slug}.html`), 'utf8');
  const a = html.indexOf(start), b = html.indexOf(end, a);
  assert.ok(a >= 0 && b > a, `${slug}: hesap çekirdeği bulunamadı`);
  const context = vm.createContext({});
  vm.runInContext(html.slice(a, b), context, { filename: `${slug}.html` });
  return code => vm.runInContext(code, context);
}
const mandel = kernel('mandelbrot-fraktali', 'function trajectory(', '  let active=');
for (const [x,y,N,expected] of [[0,0,100,null],[-1,0,100,null],[-2,0,1000,null],[0,1,100,null],[1,0,100,3],[-.75,.1,20,null],[-.75,.1,100,33],[.25,0,1000,null],[.2501,0,100,null],[.2501,0,1000,312],[-2.01,0,100,1]]) {
  const orbit = mandel(`trajectory(${x},${y},${N})`);
  equal(orbit.escape, expected, `Mandelbrot ${x}+${y}i`);
  equal(mandel(`escapeTime(${x},${y},${N})`), expected ?? 0, 'Harita ve seçili yörünge aynı adımı sayar');
  equal(orbit.points[0].x, 0, 'z₀ gerçek'); equal(orbit.points[0].y, 0, 'z₀ sanal');
  if (expected !== null) {
    const last = orbit.points.at(-1), previous = orbit.points.at(-2);
    equal(last.x ** 2 + last.y ** 2 > 4, true, 'Sıkı kaçış eşiği');
    equal(previous.x ** 2 + previous.y ** 2 <= 4, true, 'Önceki adım henüz kaçmamış');
  }
}
close(mandel('trajectory(.2501,0,1000).points.at(-1).x'), 2.382091940180707, 'Geç kaçışın değeri');
for (let k=0; k<=90; k++) {
  const c=-2+k*.025, {alpha,inside}=mandel(`realTheory(${c})`);
  equal(inside,true,'Gerçek eksendeki kapalı aralık');
  close(alpha*alpha+c,alpha,'Koruyan aralığın üst ucu');
  equal(c>=-alpha-1e-12,true,'Koruyan aralığın alt ucu');
}
const julia = kernel('julia-fraktali', 'function escape(', '  let trace=');
for (const [cx,cy,x,y,N,expected] of [[0,0,.5,0,160,-1],[0,0,1,0,160,-1],[0,0,1.1,0,160,3],[0,0,3,0,160,0],[-1,0,0,0,160,-1],[-2,0,0,0,640,-1],[-2,0,2,0,640,-1],[-6,0,3,0,640,-1],[-6,0,0,0,160,2],[.26,0,0,0,20,-1],[.26,0,0,0,40,30],[-.8,.156,0,0,640,252]]) {
  const result=julia(`orbit([${cx},${cy}],[${x},${y}],${N})`);
  equal(result.escaped,expected,'Julia kaçış referansı');
  equal(julia(`escape(${cx},${cy},${x},${y},${N})`),expected,'Julia harita/yörünge uyumu');
}
close(julia('orbit([0,0],[.5,0],3).points[3][0]'), 1/256, 'Tekrarlanan kare alma');
close(julia('orbit([.26,0],[0,0],40).points.at(-1)[0]'), 3.998872754316501, 'Julia geç kaçış değeri');
const koch = kernel('koch-kar-tanesi', 'const $=id=>', 'function palette()');
for (let n=0;n<=6;n++) {
  for (const kind of ['curve','snowflake']) {
    const ps=koch(`kochPoints('${kind}',${n})`),factor=kind==='snowflake'?3:1;
    equal(ps.length-1,factor*4**n,'Koch parça sayısı');
    close(koch(`polylineLength(kochPoints('${kind}',${n}))`),factor*(4/3)**n,'Gerçek köşelerden uzunluk');
    if (kind==='snowflake') close(koch(`polygonArea(kochPoints('snowflake',${n}))`),Math.sqrt(3)/4*(8/5-3/5*(4/9)**n),'Gerçek köşelerden alan');
  }
}
equal(koch("kochPoints('snowflake',1)[2].y < kochPoints('snowflake',1)[0].y"),true,'İlk tepe dışarı yönelir');
for(const [pct,n] of [[1,5],[.1,8],[.01,11]]) equal(koch(`targetIteration(${pct})`),n,'Alan hedefine ilk ulaşan adım');
for(let n=0;n<=6;n++) for(let m=0;m<=8;m++) {
  const r=koch(`rulerData(${n},${m})`);
  equal(r.count,4**Math.min(n,m)*3**Math.max(m-n,0),'Sonlu çizimde cetvel parça sayısı');
  close(r.length,9*(4/3)**Math.min(n,m),'Çizimin alt ölçeğinde uzunluk sabit');
  if(m===0) equal(r.dimension,null,'İlk ölçekte eğim tanımsız');
  else close(r.dimension,m<=n?Math.log(4)/Math.log(3):1,'Sonlu çizimin ince ölçekte boyutu 1');
}
const hilbert=kernel('hilbert-egrisi','function hilbertPoint(', 'function palette()');
for(let n=1;n<=7;n++) {
  const ps=hilbert(`points(${n})`),m=2**n;
  equal(new Set(ps.map(p=>`${p.x},${p.y}`)).size,m*m,'Her hücreye tam bir ziyaret');
  for(let i=0;i<ps.length;i++) {
    const p=ps[i];equal(p.x>=0&&p.x<m&&p.y>=0&&p.y<m,true,'Hücre kare içinde');
    if(i)equal(Math.abs(p.x-ps[i-1].x)+Math.abs(p.y-ps[i-1].y),1,'Ardışık Hilbert hücreleri kenar komşusu');
  }
  close(hilbert(`metrics(points(${n})).sum`)/m,m-1/m,'Birim karede Hilbert uzunluğu');
}
equal(hilbert('furthestNeighbors(3,"hilbert").gap'),53,'Düzlemde yakınken sırada uzak olma karşı örneği');
close(hilbert('metrics(points(3,"raster")).mean'),1.674563090207275,'Satır taraması ortalama adımı');
close(hilbert('metrics(points(3,"morton")).mean'),1.4600930042830158,'Morton ortalama adımı');
console.log(JSON.stringify({checks,pages:4,errors:0}));
