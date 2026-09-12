(function () {
  "use strict";

  const pageId = document.body.dataset.stemPage;
  const page = window.STEM_CONTENT && window.STEM_CONTENT[pageId];
  const root = document.getElementById("stem-root");
  if (!page || !root) return;

  const esc = (value) =>
    String(value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");

  document.title = `${page.title} | Üniversite STEM Omurgası`;
  const descriptionMeta = document.querySelector('meta[name="description"]');
  if (descriptionMeta) descriptionMeta.content = page.description;

  const goalCards = page.goals
    .map(([title, body]) => `<article class="learning-goal"><h3>${esc(title)}</h3><p>${esc(body)}</p></article>`)
    .join("");

  const chapters = page.sections
    .map((section, index) => `
      <section class="atlas-chapter" id="bolum-${index + 1}" aria-labelledby="bolum-${index + 1}-baslik">
        <p class="atlas-kicker">${esc(section.kicker)}</p>
        <h2 id="bolum-${index + 1}-baslik">${esc(section.title)}</h2>
        ${section.paragraphs.map((paragraph) => `<p>${paragraph}</p>`).join("")}
        ${section.equation ? `<div class="equation">${section.equation}<small>${esc(section.equationNote || "")}</small></div>` : ""}
        ${section.note ? `<div class="stem-note"><strong>Düşünme notu</strong><br>${esc(section.note)}</div>` : ""}
      </section>`)
    .join("");

  const toc = page.sections
    .map((section, index) => `<li><a href="#bolum-${index + 1}">${esc(section.title)}</a></li>`)
    .join("");

  const workedSteps = page.worked.steps.map((step) => `<li>${esc(step)}</li>`).join("");
  const misconceptions = page.misconceptions
    .map(([claim, truth]) => `<article class="misconception"><h3>${esc(claim)}</h3><p><span class="truth">Daha doğru okuma</span>${esc(truth)}</p></article>`)
    .join("");
  const limits = page.limits
    .map(([title, body]) => `<article class="stem-limit"><strong>${esc(title)}</strong><p>${esc(body)}</p></article>`)
    .join("");
  const glossary = page.glossary
    .map(([term, definition]) => `<div class="glossary-item"><dt>${esc(term)}</dt><dd>${esc(definition)}</dd></div>`)
    .join("");
  const connections = page.connections
    .map(([href, title, description]) => `<a class="stem-connection" href="${esc(href)}"><small>Sonraki bağlantı</small><strong>${esc(title)}</strong><span>${esc(description)}</span></a>`)
    .join("");
  const sources = page.sources
    .map((source) => `<li><a href="${esc(source.url)}" target="_blank" rel="noopener noreferrer">${esc(source.title)}</a><span>${esc(source.note)}</span></li>`)
    .join("");
  const prereqs = page.prerequisites
    .map((item, index) => `${index ? '<span class="stem-arrow" aria-hidden="true">→</span>' : ""}<a href="${esc(item.href)}">${esc(item.label)}</a>`)
    .join("");

  const quiz = page.quiz
    .map(([question, choices], questionIndex) => `
      <fieldset class="quiz-question" data-stem-question="${questionIndex}">
        <legend>${questionIndex + 1}. ${esc(question)}</legend>
        <div class="quiz-options">
          ${choices.map((choice, choiceIndex) => `<label><input type="radio" name="stem-q-${questionIndex}" value="${choiceIndex}"><span>${esc(choice)}</span></label>`).join("")}
        </div>
        <p class="quiz-feedback" aria-live="polite"></p>
      </fieldset>`)
    .join("");

  root.innerHTML = `
    <a class="atlas-skip" href="#stem-main">Ana içeriğe geç</a>
    <main class="atlas-shell atlas-shell--article" id="stem-main">
      <nav class="atlas-breadcrumbs" aria-label="İçerik yolu">
        <a href="index.html">Açelya'nın Yeri</a><span aria-hidden="true">/</span>
        <a href="bilim-atlasi.html">Bilim Atlası</a><span aria-hidden="true">/</span>
        <span>${esc(page.field)}</span>
      </nav>

      <header class="atlas-hero atlas-hero--article stem-hero" data-field-mark="${esc(page.mark)}">
        <p class="atlas-kicker">${esc(page.field)}</p>
        <h1>${esc(page.title)}</h1>
        <p class="atlas-lead" id="stem-intro">${esc(page.description)}</p>
        <div class="atlas-meta">
          <span class="atlas-chip">Düzey: ${esc(page.level)}</span>
          <span class="atlas-chip">Süre: ${esc(page.duration)}</span>
          <span class="atlas-chip">Laboratuvar: ${esc(page.labLabel)}</span>
          <span class="atlas-chip">Kanıt + model sınırı + sınav</span>
        </div>
        <div class="stem-route-strip"><span>Önerilen hazırlık:</span>${prereqs}</div>
        <div class="atlas-actions">
          <a class="atlas-button" href="#laboratuvar">Laboratuvara git</a>
          <button class="atlas-button atlas-button--secondary" type="button" data-narrate-target="#stem-reading" data-idle-label="Anlatımı dinle" data-active-label="Anlatımı durdur">Anlatımı dinle</button>
          <button class="atlas-button atlas-button--secondary" type="button" data-mark-complete="${esc(pageId)}">Tamamlandı işaretle</button>
        </div>
        <p class="narration-status" data-narration-status aria-live="polite"></p>
      </header>

      <section class="atlas-section stem-question" aria-labelledby="central-question">
        <span class="stem-question-mark" aria-hidden="true">?</span>
        <div><p class="atlas-kicker">Merkez soru</p><h2 id="central-question">${esc(page.question)}</h2><p>${esc(page.questionDetail)}</p></div>
      </section>

      <section class="atlas-section" aria-labelledby="goals-title">
        <div class="atlas-section-head"><div><p class="atlas-kicker">Öğrenme hedefleri</p><h2 id="goals-title">Bu sayfada neyi gerçekten kuracağız?</h2></div><p>Hedef, simgeleri tanımak değil; temsiller arasında geçmek, varsayımı söylemek ve sonucu yeni bir durumda kullanmaktır.</p></div>
        <div class="learning-goals">${goalCards}</div>
      </section>

      <section class="atlas-section stem-reading-grid" id="stem-reading" aria-label="Konu anlatımı">
        <div class="stem-chapters">${chapters}</div>
        <aside class="stem-toc" aria-label="Sayfa içeriği"><strong>Kavram omurgası</strong><ol>${toc}<li><a href="#laboratuvar">Etkileşimli model</a></li><li><a href="#sinav">Kendini sına</a></li></ol></aside>
      </section>

      <section class="atlas-section" id="laboratuvar" aria-labelledby="lab-title">
        <div class="lab stem-lab">
          <p class="atlas-kicker">Etkileşimli laboratuvar</p>
          <h2 id="lab-title">${esc(page.lab.title)}</h2>
          <p class="stem-lab-intro">${esc(page.lab.intro)}</p>
          <div class="stem-lab-stage">
            <div><div class="stem-lab-controls" id="stem-controls"></div><p class="stem-lab-output" id="stem-output" aria-live="polite"></p></div>
            <div class="stem-canvas-wrap"><canvas id="stem-canvas" role="img" aria-label="${esc(page.labLabel)} görselleştirmesi"></canvas></div>
          </div>
        </div>
      </section>

      <section class="atlas-section" aria-labelledby="worked-title">
        <div class="worked-example"><p class="atlas-kicker">Adım adım akıl yürütme</p><h2 id="worked-title">${esc(page.worked.title)}</h2><p>${esc(page.worked.intro)}</p><ol>${workedSteps}</ol></div>
      </section>

      <section class="atlas-section" aria-labelledby="misconception-title">
        <div class="atlas-section-head"><div><p class="atlas-kicker">Kavram kontrolü</p><h2 id="misconception-title">Sık karıştırılanlar</h2></div><p>İleri konularda en kalıcı hatalar çoğu kez yanlış bir zihinsel modelden doğar. Cümleyi düzeltmek, işlemi düzeltmekten önce gelir.</p></div>
        <div class="misconception-grid">${misconceptions}</div>
      </section>

      <section class="atlas-section" aria-labelledby="limits-title">
        <div class="atlas-section-head"><div><p class="atlas-kicker">Modelin sınırı</p><h2 id="limits-title">Bu anlatım nerede eksik kalır?</h2></div><p>İyi bir model yalnız neyi açıkladığını değil; hangi ölçek, koşul ve varsayımlarda çalıştığını da söyler.</p></div>
        <div class="stem-model-limits">${limits}</div>
      </section>

      <section class="atlas-section" id="sinav" aria-labelledby="quiz-title">
        <div class="atlas-section-head"><div><p class="atlas-kicker">Geri çağırma + açıklama</p><h2 id="quiz-title">Kendini sına</h2></div><p>Önce gerekçeni zihninde kur, sonra seçimini işaretle. Değerlendirme her sorunun nedenini ayrıca gösterir.</p></div>
        <form class="quiz" id="stem-quiz">${quiz}<button class="atlas-button" type="submit">Yanıtları değerlendir</button><p class="quiz-result" id="stem-quiz-result" aria-live="polite"></p></form>
      </section>

      <section class="atlas-section" aria-labelledby="glossary-title">
        <div class="atlas-chapter"><p class="atlas-kicker">Kavram sözlüğü</p><h2 id="glossary-title">Dört ana terim</h2><dl class="glossary-grid">${glossary}</dl></div>
      </section>

      <section class="atlas-section" aria-labelledby="connections-title">
        <div class="atlas-section-head"><div><p class="atlas-kicker">Bilgi ağı</p><h2 id="connections-title">Buradan nereye?</h2></div><p>Bir konuyu öğrenmek, onu başka bir açıklama aracına bağlayabildiğinde kalıcı hâle gelir.</p></div>
        <div class="stem-connection-grid">${connections}</div>
      </section>

      <section class="atlas-section" aria-labelledby="sources-title">
        <div class="atlas-chapter"><p class="atlas-kicker">Kaynak izi</p><h2 id="sources-title">Derinleşmek için açık kaynaklar</h2><p>Bu sayfa bir öğrenme köprüsüdür. Tanım, kapsam ve ileri örnekleri karşılaştırmak için aşağıdaki açık üniversite kaynaklarına ilerle.</p><ul class="stem-source-list">${sources}</ul></div>
      </section>

      <nav class="stem-footer-nav" aria-label="Alt gezinme"><a href="bilim-atlasi.html">← Üniversite STEM rotasına dön</a><a href="index.html">Bütün içerikler →</a></nav>
    </main>`;

  function setupQuiz() {
    const form = document.getElementById("stem-quiz");
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      let score = 0;
      page.quiz.forEach((item, index) => {
        const selected = form.querySelector(`input[name="stem-q-${index}"]:checked`);
        const card = form.querySelector(`[data-stem-question="${index}"]`);
        const feedback = card.querySelector(".quiz-feedback");
        const correct = selected && Number(selected.value) === item[2];
        if (correct) score += 1;
        card.classList.toggle("is-correct", Boolean(correct));
        card.classList.toggle("is-wrong", Boolean(selected) && !correct);
        feedback.textContent = !selected
          ? `Yanıt bekleniyor. ${item[3]}`
          : `${correct ? "Doğru." : `Doğru yanıt: ${item[1][item[2]]}.`} ${item[3]}`;
      });
      const result = document.getElementById("stem-quiz-result");
      result.textContent = `${score}/${page.quiz.length} doğru. ${score === page.quiz.length ? "Kavram omurgası sağlam görünüyor." : "Açıklamaları okuyup ilgili bölüme dön; ikinci denemede gerekçeyi sesli kur."}`;
    });
  }

  const controlSets = {
    matrix: [
      ["a", "Yatay ölçek a", -2, 3, 0.1, 1.6], ["b", "Simetrik karışım b", -2, 2, 0.1, 0.8],
      ["d", "Düşey ölçek d", -2, 3, 0.1, 0.4], ["theta", "Vektör açısı", 0, 360, 1, 28, "°"],
    ],
    gradient: [
      ["x", "Noktanın x değeri", -2.5, 2.5, 0.1, 1], ["y", "Noktanın y değeri", -2.5, 2.5, 0.1, -1],
      ["cross", "xy bağlaşımı", -1.6, 1.6, 0.1, 0.6], ["direction", "Yürüyüş açısı", 0, 360, 1, 35, "°"],
    ],
    ode: [
      ["k", "Yay sabiti k", 0.3, 5, 0.1, 2], ["c", "Sönüm c", 0, 5, 0.1, 0.5],
      ["x0", "Başlangıç konumu", -2, 2, 0.1, 1.5], ["v0", "Başlangıç hızı", -2, 2, 0.1, 0],
    ],
    em: [
      ["frequency", "Göreli frekans", 0.5, 3, 0.1, 1], ["amplitude", "E alanı genliği", 0.3, 1, 0.05, 0.8],
      ["phase", "Faz", 0, 360, 1, 0, "°"],
    ],
    entropy: [
      ["N", "Toplam parçacık N", 4, 100, 1, 24], ["n", "Soldaki parçacık n", 0, 24, 1, 12],
    ],
    equilibrium: [
      ["dg0", "ΔG°", -20, 20, 0.5, -5, " kJ/mol"], ["temp", "Sıcaklık", 250, 800, 5, 298, " K"],
      ["logQ", "log₁₀Q", -4, 4, 0.1, 0],
    ],
    gene: [
      ["alpha", "Transkripsiyon α", 0.5, 10, 0.1, 4], ["beta", "Translasyon β", 0.2, 3, 0.1, 1.4],
      ["deltaM", "mRNA yıkımı δₘ", 0.1, 1.2, 0.05, 0.5], ["deltaP", "Protein yıkımı δₚ", 0.05, 0.8, 0.05, 0.2],
    ],
    complexity: [["n", "Girdi boyutu n", 2, 100, 1, 30]],
  };

  function initLab() {
    const type = page.lab.type;
    const defs = controlSets[type];
    const controls = document.getElementById("stem-controls");
    const canvas = document.getElementById("stem-canvas");
    const output = document.getElementById("stem-output");
    const values = {};

    controls.innerHTML = defs.map(([id, label, min, max, step, value, unit = ""]) => `
      <label class="stem-control" for="stem-${id}">
        <span class="stem-control-head"><span>${esc(label)}</span><output id="stem-${id}-out">${esc(value)}${esc(unit)}</output></span>
        <input id="stem-${id}" type="range" min="${min}" max="${max}" step="${step}" value="${value}" data-unit="${esc(unit)}">
      </label>`).join("");

    defs.forEach(([id]) => {
      const input = document.getElementById(`stem-${id}`);
      values[id] = Number(input.value);
      input.addEventListener("input", () => {
        values[id] = Number(input.value);
        if (type === "entropy" && id === "N") {
          const nInput = document.getElementById("stem-n");
          nInput.max = input.value;
          if (Number(nInput.value) > Number(input.value)) nInput.value = input.value;
          values.n = Number(nInput.value);
          document.getElementById("stem-n-out").textContent = nInput.value;
        }
        document.getElementById(`stem-${id}-out`).textContent = `${input.value}${input.dataset.unit || ""}`;
        draw();
      });
    });

    const context = canvas.getContext("2d");
    function draw() {
      const box = canvas.getBoundingClientRect();
      const width = Math.max(300, Math.round(box.width));
      const height = Math.max(280, Math.round(box.height));
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      if (canvas.width !== width * ratio || canvas.height !== height * ratio) {
        canvas.width = width * ratio;
        canvas.height = height * ratio;
      }
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
      context.clearRect(0, 0, width, height);
      const style = getComputedStyle(document.documentElement);
      const colors = {
        ink: style.getPropertyValue("--atlas-ink").trim() || "#edf4f5",
        muted: style.getPropertyValue("--atlas-muted").trim() || "#9eb0b8",
        cyan: style.getPropertyValue("--atlas-cyan").trim() || "#69e3d2",
        gold: style.getPropertyValue("--atlas-gold").trim() || "#f5c96a",
        coral: style.getPropertyValue("--atlas-coral").trim() || "#ff8f7a",
        violet: style.getPropertyValue("--stem-violet").trim() || "#b9a6ff",
        lime: style.getPropertyValue("--stem-lime").trim() || "#c9f36a",
      };
      drawers[type](context, width, height, values, colors, output);
    }

    new ResizeObserver(draw).observe(canvas.parentElement);
    new MutationObserver(draw).observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
    draw();
  }

  function line(ctx, x1, y1, x2, y2, color, width = 1) {
    ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(x2, y2); ctx.strokeStyle = color; ctx.lineWidth = width; ctx.stroke();
  }

  function arrow(ctx, x1, y1, x2, y2, color, width = 2) {
    line(ctx, x1, y1, x2, y2, color, width);
    const angle = Math.atan2(y2 - y1, x2 - x1);
    ctx.beginPath(); ctx.moveTo(x2, y2);
    ctx.lineTo(x2 - 9 * Math.cos(angle - 0.45), y2 - 9 * Math.sin(angle - 0.45));
    ctx.lineTo(x2 - 9 * Math.cos(angle + 0.45), y2 - 9 * Math.sin(angle + 0.45));
    ctx.closePath(); ctx.fillStyle = color; ctx.fill();
  }

  function label(ctx, text, x, y, color, align = "left") {
    ctx.fillStyle = color; ctx.font = "12px Outfit, sans-serif"; ctx.textAlign = align; ctx.fillText(text, x, y);
  }

  const drawers = {
    matrix(ctx, w, h, v, c, output) {
      const cx = w / 2, cy = h / 2, scale = Math.min(w, h) / 9;
      const transform = (x, y) => [v.a * x + v.b * y, v.b * x + v.d * y];
      for (let i = -4; i <= 4; i += 1) {
        const p1 = transform(i, -4), p2 = transform(i, 4), p3 = transform(-4, i), p4 = transform(4, i);
        line(ctx, cx + p1[0] * scale, cy - p1[1] * scale, cx + p2[0] * scale, cy - p2[1] * scale, c.cyan + "55");
        line(ctx, cx + p3[0] * scale, cy - p3[1] * scale, cx + p4[0] * scale, cy - p4[1] * scale, c.cyan + "55");
      }
      line(ctx, 0, cy, w, cy, c.muted + "66"); line(ctx, cx, 0, cx, h, c.muted + "66");
      const angle = v.theta * Math.PI / 180;
      const original = [1.6 * Math.cos(angle), 1.6 * Math.sin(angle)];
      const changed = transform(original[0], original[1]);
      arrow(ctx, cx, cy, cx + original[0] * scale, cy - original[1] * scale, c.violet, 3);
      arrow(ctx, cx, cy, cx + changed[0] * scale, cy - changed[1] * scale, c.lime, 3);
      const trace = v.a + v.d, disc = Math.sqrt((v.a - v.d) ** 2 + 4 * v.b ** 2);
      const l1 = (trace + disc) / 2, l2 = (trace - disc) / 2;
      [l1, l2].forEach((lambda) => {
        let ex = v.b, ey = lambda - v.a;
        if (Math.hypot(ex, ey) < 1e-6) { ex = lambda - v.d; ey = v.b; }
        if (Math.hypot(ex, ey) < 1e-6) { ex = 1; ey = 0; }
        const n = Math.hypot(ex, ey); ex /= n; ey /= n;
        line(ctx, cx - ex * w, cy + ey * w, cx + ex * w, cy - ey * w, c.gold + "99", 1.5);
      });
      label(ctx, "mor: v", 14, 24, c.violet); label(ctx, "yeşil: Av", 14, 42, c.lime); label(ctx, "altın: özdoğrultular", 14, 60, c.gold);
      output.innerHTML = `<strong>A = [[${v.a.toFixed(1)}, ${v.b.toFixed(1)}], [${v.b.toFixed(1)}, ${v.d.toFixed(1)}]]</strong><br>λ₁=${l1.toFixed(2)}, λ₂=${l2.toFixed(2)} · det A=${(v.a * v.d - v.b ** 2).toFixed(2)}. Mor vektör giriş, yeşil vektör Av'dir.`;
    },

    gradient(ctx, w, h, v, c, output) {
      const scale = Math.min(w, h) / 6.5, cx = w / 2, cy = h / 2;
      const f = (x, y) => x * x + 1.5 * y * y + v.cross * x * y;
      for (let py = 0; py < h; py += 7) for (let px = 0; px < w; px += 7) {
        const x = (px - cx) / scale, y = (cy - py) / scale;
        const q = Math.min(f(x, y) / 14, 1);
        ctx.fillStyle = `rgba(${Math.round(30 + 120 * q)},${Math.round(80 + 70 * (1 - q))},${Math.round(130 + 90 * (1 - q))},0.28)`;
        ctx.fillRect(px, py, 8, 8);
      }
      line(ctx, 0, cy, w, cy, c.muted + "88"); line(ctx, cx, 0, cx, h, c.muted + "88");
      const gx = 2 * v.x + v.cross * v.y, gy = 3 * v.y + v.cross * v.x;
      const px = cx + v.x * scale, py = cy - v.y * scale;
      ctx.beginPath(); ctx.arc(px, py, 6, 0, Math.PI * 2); ctx.fillStyle = c.ink; ctx.fill();
      const mag = Math.hypot(gx, gy) || 1;
      arrow(ctx, px, py, px + (gx / mag) * 75, py - (gy / mag) * 75, c.lime, 3);
      const theta = v.direction * Math.PI / 180, ux = Math.cos(theta), uy = Math.sin(theta);
      arrow(ctx, px, py, px + ux * 62, py - uy * 62, c.violet, 2);
      const directional = gx * ux + gy * uy;
      label(ctx, "yeşil: ∇f", 14, 24, c.lime); label(ctx, "mor: seçilen u yönü", 14, 42, c.violet);
      output.innerHTML = `<strong>f(${v.x.toFixed(1)}, ${v.y.toFixed(1)})=${f(v.x, v.y).toFixed(2)}</strong><br>∇f=(${gx.toFixed(2)}, ${gy.toFixed(2)}), |∇f|=${mag.toFixed(2)} · Seçilen yöndeki türev Dᵤf=${directional.toFixed(2)}.`;
    },

    ode(ctx, w, h, v, c, output) {
      const points = []; let x = v.x0, vel = v.v0; const dt = 0.015, total = 14;
      for (let t = 0; t <= total; t += dt) {
        points.push([t, x, vel]);
        const accel = (xx, vv) => -v.c * vv - v.k * xx;
        const k1x = vel, k1v = accel(x, vel);
        const k2x = vel + k1v * dt / 2, k2v = accel(x + k1x * dt / 2, vel + k1v * dt / 2);
        const k3x = vel + k2v * dt / 2, k3v = accel(x + k2x * dt / 2, vel + k2v * dt / 2);
        const k4x = vel + k3v * dt, k4v = accel(x + k3x * dt, vel + k3v * dt);
        x += dt * (k1x + 2 * k2x + 2 * k3x + k4x) / 6;
        vel += dt * (k1v + 2 * k2v + 2 * k3v + k4v) / 6;
      }
      const mid = h * 0.48; line(ctx, 40, mid / 2, w - 14, mid / 2, c.muted + "66");
      ctx.beginPath(); points.forEach(([t, xx], i) => { const px = 40 + (t / total) * (w - 56), py = mid / 2 - xx * mid / 5; i ? ctx.lineTo(px, py) : ctx.moveTo(px, py); });
      ctx.strokeStyle = c.cyan; ctx.lineWidth = 2.5; ctx.stroke(); label(ctx, "x(t)", 14, 20, c.cyan);
      const pcx = w / 2, pcy = mid + (h - mid) / 2, pscale = Math.min(w / 8, (h - mid) / 6);
      line(ctx, 20, pcy, w - 14, pcy, c.muted + "66"); line(ctx, pcx, mid + 8, pcx, h - 12, c.muted + "66");
      ctx.beginPath(); points.forEach(([, xx, vv], i) => { const px = pcx + xx * pscale, py = pcy - vv * pscale; i ? ctx.lineTo(px, py) : ctx.moveTo(px, py); });
      ctx.strokeStyle = c.violet; ctx.lineWidth = 2; ctx.stroke(); label(ctx, "faz düzlemi: (x,v)", 14, mid + 20, c.violet);
      const critical = 2 * Math.sqrt(v.k); const regime = v.c < critical - 0.05 ? "az sönümlü: salınımlı" : v.c > critical + 0.05 ? "aşırı sönümlü: salınımsız" : "kritik sönüme yakın";
      output.innerHTML = `<strong>${regime}</strong><br>Doğal açısal frekans ω₀=${Math.sqrt(v.k).toFixed(2)} rad/s; kritik sönüm cₖ=${critical.toFixed(2)} (m=1). Faz alanı enerji kaybını geometrik olarak gösterir.`;
    },

    em(ctx, w, h, v, c, output) {
      const mid = h / 2, phase = v.phase * Math.PI / 180;
      line(ctx, 24, mid, w - 12, mid, c.muted + "66");
      const drawWave = (offset, color, sign) => {
        ctx.beginPath();
        for (let x = 24; x < w - 12; x += 2) {
          const y = mid + offset + sign * v.amplitude * h * 0.18 * Math.sin((x / w) * Math.PI * 4 * v.frequency - phase);
          x === 24 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
        }
        ctx.strokeStyle = color; ctx.lineWidth = 3; ctx.stroke();
      };
      drawWave(-h * 0.18, c.cyan, 1); drawWave(h * 0.18, c.violet, 1);
      arrow(ctx, 35, 42, w - 35, 42, c.gold, 2); label(ctx, "yayılma + enerji akışı", w / 2, 30, c.gold, "center");
      label(ctx, "E alanı (bir düzlem)", 16, mid - h * 0.31, c.cyan); label(ctx, "B alanı (dik düzlem)", 16, mid + h * 0.31, c.violet);
      const lambda = 1 / v.frequency;
      output.innerHTML = `<strong>Göreli dalga boyu λ=${lambda.toFixed(2)}</strong><br>Frekans arttıkça aynı yayılma hızında dalga boyu azalır. Çizimler görünürlük için ayrı şeritlere taşındı; fiziksel düzlem dalgada E ve B aynı yerde, aynı fazda ve birbirine diktir.`;
    },

    entropy(ctx, w, h, v, c, output) {
      const N = Math.round(v.N), n = Math.min(Math.round(v.n), N); v.n = n;
      line(ctx, w / 2, 24, w / 2, h - 24, c.muted + "aa", 2);
      const drawParticles = (count, left) => {
        const cols = Math.max(2, Math.floor((w / 2 - 36) / 25));
        for (let i = 0; i < count; i += 1) {
          const col = i % cols, row = Math.floor(i / cols);
          const baseX = left ? 24 : w / 2 + 24;
          const x = baseX + col * 25 + ((i * 17) % 7), y = 58 + row * 25 + ((i * 11) % 5);
          ctx.beginPath(); ctx.arc(x, y, 7, 0, Math.PI * 2); ctx.fillStyle = left ? c.cyan : c.violet; ctx.fill();
        }
      };
      drawParticles(n, true); drawParticles(N - n, false);
      label(ctx, `SOL · ${n}`, w * 0.25, 32, c.cyan, "center"); label(ctx, `SAĞ · ${N - n}`, w * 0.75, 32, c.violet, "center");
      let logOmega = 0; for (let i = 1; i <= n; i += 1) logOmega += Math.log(N - n + i) - Math.log(i);
      const logTotal = N * Math.log(2), probability = Math.exp(logOmega - logTotal);
      const omega = logOmega < 35 ? Math.round(Math.exp(logOmega)).toLocaleString("tr-TR") : `10^${(logOmega / Math.LN10).toFixed(2)}`;
      output.innerHTML = `<strong>Ω=C(${N},${n}) ≈ ${omega}</strong><br>Bu tek makrodurumun tüm sol/sağ mikrodurumları içindeki olasılığı %${(probability * 100).toPrecision(3)}. Boyutsuz S/kᴮ=lnΩ=${logOmega.toFixed(2)}.`;
    },

    equilibrium(ctx, w, h, v, c, output) {
      const R = 8.314, dg0 = v.dg0 * 1000, Q = 10 ** v.logQ, K = Math.exp(-dg0 / (R * v.temp));
      const deltaG = (dg0 + R * v.temp * Math.log(Q)) / 1000;
      const xK = Math.log10(K), min = Math.min(-5, xK - 2), max = Math.max(5, xK + 2);
      const xOf = (x) => 45 + ((x - min) / (max - min)) * (w - 80);
      const baseline = h * 0.62;
      ctx.fillStyle = c.cyan + "22"; ctx.fillRect(45, 70, Math.max(0, xOf(xK) - 45), baseline - 70);
      ctx.fillStyle = c.coral + "22"; ctx.fillRect(xOf(xK), 70, Math.max(0, w - 35 - xOf(xK)), baseline - 70);
      line(ctx, 45, baseline, w - 35, baseline, c.muted, 2);
      line(ctx, xOf(xK), 60, xOf(xK), baseline + 26, c.lime, 3);
      const nowX = Math.max(45, Math.min(w - 35, xOf(v.logQ)));
      arrow(ctx, nowX, baseline - 35, nowX, baseline - 2, c.gold, 3);
      label(ctx, "Q<K · ileri yön", 55, 94, c.cyan); label(ctx, "Q>K · geri yön", w - 45, 94, c.coral, "right");
      label(ctx, `denge: log₁₀K=${xK.toFixed(2)}`, xOf(xK), baseline + 44, c.lime, "center"); label(ctx, "şimdiki Q", nowX, baseline - 44, c.gold, "center");
      const direction = Math.abs(deltaG) < 0.08 ? "dengeye çok yakın" : deltaG < 0 ? "ileri / ürünler yönü" : "geri / girenler yönü";
      output.innerHTML = `<strong>ΔG=${deltaG.toFixed(2)} kJ/mol · ${direction}</strong><br>K=${K.toExponential(2)}, Q=${Q.toExponential(2)}. Sıcaklık değişince K yeniden hesaplanır; bileşim değişimi yalnız Q'yu doğrudan değiştirir.`;
    },

    gene(ctx, w, h, v, c, output) {
      const dt = 0.02, total = 25, data = []; let m = 0, p = 0;
      for (let t = 0; t <= total; t += dt) { data.push([t, m, p]); m += (v.alpha - v.deltaM * m) * dt; p += (v.beta * m - v.deltaP * p) * dt; }
      const mStar = v.alpha / v.deltaM, pStar = v.beta * mStar / v.deltaP, max = Math.max(mStar, pStar, 1);
      const graph = (index, color) => { ctx.beginPath(); data.forEach((row, i) => { const x = 42 + row[0] / total * (w - 62), y = h - 38 - row[index] / max * (h - 78); i ? ctx.lineTo(x, y) : ctx.moveTo(x, y); }); ctx.strokeStyle = color; ctx.lineWidth = 3; ctx.stroke(); };
      line(ctx, 42, h - 38, w - 18, h - 38, c.muted + "88"); line(ctx, 42, 24, 42, h - 38, c.muted + "88");
      graph(1, c.cyan); graph(2, c.violet);
      label(ctx, "mRNA", 58, 28, c.cyan); label(ctx, "protein", 114, 28, c.violet); label(ctx, "zaman", w - 18, h - 16, c.muted, "right");
      output.innerHTML = `<strong>Durağan mRNA m*=${mStar.toFixed(2)}, protein p*=${pStar.toFixed(2)}</strong><br>mRNA yarı ömrü ≈${(Math.LN2 / v.deltaM).toFixed(2)}, protein yarı ömrü ≈${(Math.LN2 / v.deltaP).toFixed(2)} zaman birimi. Protein eğrisi üretim zinciri nedeniyle gecikmeli yükselir.`;
    },

    complexity(ctx, w, h, v, c, output) {
      const nMax = 100, left = 45, bottom = h - 36, top = 28, right = w - 18;
      const functions = [
        ["log n", (n) => Math.log2(n), c.lime], ["n", (n) => n, c.cyan],
        ["n log n", (n) => n * Math.log2(n), c.violet], ["n²", (n) => n * n, c.gold], ["2ⁿ", (n) => 2 ** n, c.coral],
      ];
      const maxLog = Math.log10(2 ** nMax);
      line(ctx, left, bottom, right, bottom, c.muted + "88"); line(ctx, left, top, left, bottom, c.muted + "88");
      functions.forEach(([name, fn, color], idx) => {
        ctx.beginPath();
        for (let n = 2; n <= nMax; n += 1) {
          const x = left + (n - 2) / (nMax - 2) * (right - left), y = bottom - Math.log10(Math.max(fn(n), 1)) / maxLog * (bottom - top);
          n === 2 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
        }
        ctx.strokeStyle = color; ctx.lineWidth = 2.4; ctx.stroke(); label(ctx, name, left + idx * 62, 18, color);
      });
      const currentX = left + (v.n - 2) / (nMax - 2) * (right - left); line(ctx, currentX, top, currentX, bottom, c.ink + "bb", 2); label(ctx, `n=${Math.round(v.n)}`, currentX, bottom + 20, c.ink, "center");
      const n = Math.round(v.n), items = functions.map(([name, fn]) => `${name}: ${fn(n) > 1e9 ? fn(n).toExponential(2) : Math.round(fn(n)).toLocaleString("tr-TR")}`);
      output.innerHTML = `<strong>Logaritmik düşey ölçek</strong><br>${items.join(" · ")}. Eşit dikey aralık eşit kat büyümeyi temsil eder; bu sayede üstel ve polinom eğriler aynı grafikte okunabilir.`;
    },
  };

  setupQuiz();
  initLab();
})();
