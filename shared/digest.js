/**
 * Açelya — Keşif Defteri
 * Her konu sayfasının altına, shared/digest/<slug>.js verisinden üretilen
 * katmanlı bir içerik bölümü ekler: kanca, büyük fikir, hikâye, kavramlar,
 * laboratuvar görevleri, "vay" notları, çözümlü örnek, yanılgılar, sözlük,
 * üniversiteye köprü, mini sınav, sonraki duraklar ve kaynaklar.
 *
 * Veri dosyası biçimi:
 *   window.ACELYA_DIGEST = window.ACELYA_DIGEST || {};
 *   window.ACELYA_DIGEST["slug"] = { ...docs/icerik-rehberi.md'deki şema... };
 */
(function () {
  "use strict";

  const PROGRESS_KEY = "acelya-atlas-progress-v1";
  const QUIZ_KEY = "acelya-digest-quiz-v1";
  const ALLOWED_TAGS = new Set([
    "p", "strong", "em", "b", "i", "sup", "sub", "code", "kbd", "var", "br",
    "span", "small", "ul", "ol", "li", "a", "mark",
  ]);

  let pageId = "";
  let speech = null;

  /* ── Yardımcılar ── */
  function esc(value) {
    return String(value ?? "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  // Yazar HTML'ini güvenli alt kümeye indirger (yalnız biçimleme etiketleri).
  function sanitize(html) {
    const doc = new DOMParser().parseFromString(`<div>${String(html ?? "")}</div>`, "text/html");
    const root = doc.body.firstElementChild;
    const walk = (node) => {
      Array.from(node.childNodes).forEach((child) => {
        if (child.nodeType === Node.TEXT_NODE) return;
        if (child.nodeType !== Node.ELEMENT_NODE) {
          child.remove();
          return;
        }
        const tag = child.tagName.toLowerCase();
        if (!ALLOWED_TAGS.has(tag)) {
          const text = doc.createTextNode(child.textContent || "");
          child.replaceWith(text);
          return;
        }
        Array.from(child.attributes).forEach((attr) => {
          const name = attr.name.toLowerCase();
          const keep =
            (tag === "a" && name === "href" && /^(https?:\/\/|[a-z0-9+-]+\.html(#.*)?$|#)/i.test(attr.value)) ||
            (name === "class" && /^[a-z0-9 _-]+$/i.test(attr.value));
          if (!keep) child.removeAttribute(attr.name);
        });
        if (tag === "a" && /^https?:/i.test(child.getAttribute("href") || "")) {
          child.setAttribute("target", "_blank");
          child.setAttribute("rel", "noopener noreferrer");
        }
        walk(child);
      });
    };
    walk(root);
    return root.innerHTML;
  }

  function paragraphs(value) {
    const list = Array.isArray(value) ? value : [value];
    return list
      .filter(Boolean)
      .map((item) => (/^\s*<(p|ul|ol)\b/i.test(item) ? sanitize(item) : `<p>${sanitize(item)}</p>`))
      .join("");
  }

  function textOf(html) {
    const div = document.createElement("div");
    div.innerHTML = sanitize(html);
    return div.textContent || "";
  }

  function readJSON(key, fallback) {
    try {
      const parsed = JSON.parse(localStorage.getItem(key) || "null");
      return parsed && typeof parsed === "object" ? parsed : fallback;
    } catch (_) {
      return fallback;
    }
  }

  function writeJSON(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (_) {
      // Depolama kapalıysa ilerleme yalnızca bu oturumda kalır.
    }
  }

  function isComplete(slug) {
    return Boolean(readJSON(PROGRESS_KEY, {})[slug]);
  }

  function setComplete(slug, complete) {
    const progress = readJSON(PROGRESS_KEY, {});
    if (complete) progress[slug] = { completedAt: new Date().toISOString() };
    else delete progress[slug];
    writeJSON(PROGRESS_KEY, progress);
    window.dispatchEvent(new CustomEvent("acelya-atlas-progress", { detail: progress }));
  }

  /* ── Bölüm üreticileri ── */
  function sectionHead(num, title, note) {
    return `
      <div class="digest-section-head">
        <span class="digest-num" aria-hidden="true">${esc(num)}</span>
        <h3>${esc(title)}</h3>
        ${note ? `<small>${esc(note)}</small>` : ""}
      </div>`;
  }

  function renderStory(d) {
    if (!d.story?.length) return "";
    return `
      <section class="digest-section" id="defter-hikaye" aria-labelledby="defter-hikaye-baslik">
        ${sectionHead("01", "Hikâye", "Nereden çıktı, neden önemli")}
        <div class="digest-story">${paragraphs(d.story)}</div>
      </section>`;
  }

  function renderCore(d) {
    if (!d.core?.length) return "";
    const cards = d.core
      .map(
        (item, i) => `
        <article class="digest-card">
          <span class="digest-num" aria-hidden="true">${String(i + 1).padStart(2, "0")}</span>
          <h4>${esc(item.heading)}</h4>
          <div class="digest-body">${paragraphs(item.body)}</div>
          ${
            item.formula
              ? `<div class="digest-formula">${sanitize(item.formula)}${
                  item.formulaNote ? `<small>${esc(item.formulaNote)}</small>` : ""
                }</div>`
              : ""
          }
        </article>`,
      )
      .join("");
    return `
      <section class="digest-section" id="defter-kavramlar" aria-labelledby="defter-kavramlar-baslik">
        ${sectionHead("02", "Kavramlar", "Katman katman")}
        <div class="digest-core">${cards}</div>
      </section>`;
  }

  function renderLab(d) {
    const exps = d.lab?.experiments || [];
    if (!exps.length) return "";
    const cards = exps
      .map(
        (e) => `
        <article class="digest-card digest-exp">
          <h4>${esc(e.title)}</h4>
          <dl>
            <dt data-step="predict">Tahmin</dt><dd>${sanitize(e.predict)}</dd>
            <dt data-step="do">Dene</dt><dd>${sanitize(e.do)}</dd>
            <dt data-step="observe">Gözle</dt><dd>${sanitize(e.observe)}</dd>
            <dt data-step="explain">Açıkla</dt><dd>${sanitize(e.explain)}</dd>
          </dl>
        </article>`,
      )
      .join("");
    return `
      <section class="digest-section" id="defter-laboratuvar" aria-labelledby="defter-laboratuvar-baslik">
        ${sectionHead("03", "Simülasyonda dene", "Tahmin → Dene → Gözle → Açıkla")}
        ${d.lab.intro ? `<p class="digest-lab-intro">${sanitize(d.lab.intro)}</p>` : ""}
        <div class="digest-lab">${cards}</div>
      </section>`;
  }

  function renderWow(d) {
    if (!d.wow?.length) return "";
    const cards = d.wow
      .map((w) => `<article class="digest-card"><h4>${esc(w.title)}</h4><p>${sanitize(w.body)}</p></article>`)
      .join("");
    return `
      <section class="digest-section" id="defter-vay" aria-labelledby="defter-vay-baslik">
        ${sectionHead("04", "Vay dedirtenler", "Aklında kalacak üç şey")}
        <div class="digest-wow">${cards}</div>
      </section>`;
  }

  function renderWorked(d) {
    const w = d.worked;
    if (!w?.steps?.length) return "";
    return `
      <section class="digest-section digest-worked" id="defter-ornek" aria-labelledby="defter-ornek-baslik">
        ${sectionHead("05", "Çözümlü örnek", w.title || "")}
        <p class="digest-prompt">${sanitize(w.prompt)}</p>
        <ol class="digest-steps">${w.steps.map((s) => `<li>${sanitize(s)}</li>`).join("")}</ol>
        ${w.result ? `<p class="digest-result"><strong>Sonuç.</strong> ${sanitize(w.result)}</p>` : ""}
      </section>`;
  }

  function renderMyths(d) {
    if (!d.misconceptions?.length) return "";
    const cards = d.misconceptions
      .map(
        (m) => `
        <article class="digest-card digest-myth">
          <p class="digest-myth-claim">${sanitize(m.myth)}</p>
          <p class="digest-myth-truth">${sanitize(m.truth)}</p>
        </article>`,
      )
      .join("");
    return `
      <section class="digest-section" id="defter-yanilgilar" aria-labelledby="defter-yanilgilar-baslik">
        ${sectionHead("06", "Yaygın yanılgılar", "Herkes bir kez düşer")}
        <div class="digest-myths">${cards}</div>
      </section>`;
  }

  function renderGlossary(d) {
    if (!d.glossary?.length) return "";
    const items = d.glossary
      .map((g) => `<div><dt>${esc(g.term)}</dt><dd>${sanitize(g.definition)}</dd></div>`)
      .join("");
    return `
      <section class="digest-section" id="defter-sozluk" aria-labelledby="defter-sozluk-baslik">
        ${sectionHead("07", "Sözlük", "Kısa ve kesin")}
        <dl class="digest-glossary">${items}</dl>
      </section>`;
  }

  function renderBridge(d) {
    const b = d.bridge;
    if (!b?.body) return "";
    const topics = (b.topics || []).map((t) => `<li>${esc(t)}</li>`).join("");
    return `
      <section class="digest-section" id="defter-kopru" aria-labelledby="defter-kopru-baslik">
        ${sectionHead("08", b.heading || "Üniversiteye köprü", "Bu fikir nereye gidiyor")}
        <div class="digest-bridge">
          ${paragraphs(b.body)}
          ${topics ? `<ul class="digest-bridge-topics">${topics}</ul>` : ""}
        </div>
      </section>`;
  }

  function renderQuiz(d) {
    if (!d.quiz?.length) return "";
    const items = d.quiz
      .map(
        (q, qi) => `
        <fieldset class="digest-q" data-q="${qi}" data-answer="${Number(q.answer)}">
          <legend><span aria-hidden="true">${qi + 1}.</span>${esc(q.question)}</legend>
          <div class="digest-options">
            ${q.options
              .map(
                (opt, oi) => `
              <label class="digest-option" data-opt="${oi}">
                <input type="radio" name="digest-${esc(pageId)}-q${qi}" value="${oi}">
                <span>${sanitize(opt)}</span>
              </label>`,
              )
              .join("")}
          </div>
          <p class="digest-feedback" aria-live="polite" data-explanation="${esc(q.explanation || "")}"></p>
        </fieldset>`,
      )
      .join("");
    return `
      <section class="digest-section" id="defter-sinav" aria-labelledby="defter-sinav-baslik">
        ${sectionHead("09", "Kendini sına", "Geri bildirimli")}
        <div class="digest-quiz">${items}</div>
      </section>`;
  }

  function renderNext(d) {
    if (!d.next?.length) return "";
    const cards = d.next
      .map(
        (n) => `
        <a href="${esc(n.href)}">
          <strong>${esc(n.title)}</strong>
          <span>${sanitize(n.why)}</span>
        </a>`,
      )
      .join("");
    return `
      <section class="digest-section" id="defter-sonraki" aria-labelledby="defter-sonraki-baslik">
        ${sectionHead("10", "Sonraki durak", "Merak buradan devam eder")}
        <div class="digest-next">${cards}</div>
      </section>`;
  }

  function renderSources(d) {
    if (!d.sources?.length) return "";
    const items = d.sources
      .map(
        (s) => `
        <li>
          <a href="${esc(s.url)}" target="_blank" rel="noopener noreferrer">${esc(s.title)}</a>
          ${s.note ? `<small>${esc(s.note)}</small>` : ""}
        </li>`,
      )
      .join("");
    return `
      <section class="digest-section" id="defter-kaynaklar" aria-labelledby="defter-kaynaklar-baslik">
        ${sectionHead("11", "Daha derine", "Güvenilir kaynaklar")}
        <ul class="digest-sources">${items}</ul>
      </section>`;
  }

  const NAV = [
    ["defter-hikaye", "Hikâye", (d) => d.story?.length],
    ["defter-kavramlar", "Kavramlar", (d) => d.core?.length],
    ["defter-laboratuvar", "Dene", (d) => d.lab?.experiments?.length],
    ["defter-vay", "Vay", (d) => d.wow?.length],
    ["defter-ornek", "Örnek", (d) => d.worked?.steps?.length],
    ["defter-yanilgilar", "Yanılgılar", (d) => d.misconceptions?.length],
    ["defter-sozluk", "Sözlük", (d) => d.glossary?.length],
    ["defter-kopru", "Köprü", (d) => d.bridge?.body],
    ["defter-sinav", "Sına", (d) => d.quiz?.length],
    ["defter-sonraki", "Sonraki", (d) => d.next?.length],
    ["defter-kaynaklar", "Kaynaklar", (d) => d.sources?.length],
  ];

  function render(d) {
    const meta = [d.field, d.level, d.minutes ? `~${d.minutes} dk` : ""].filter(Boolean);
    const nav = NAV.filter(([, , has]) => has(d))
      .map(([id, label]) => `<li><a href="#${id}">${label}</a></li>`)
      .join("");
    return `
      <div class="digest-inner">
        <div class="digest-head">
          <p class="digest-kicker">
            <span class="digest-mark">Keşif Defteri</span>
            ${meta.map((m) => `<span class="digest-sep" aria-hidden="true">·</span><span>${esc(m)}</span>`).join("")}
          </p>
          <h2 id="kesif-defteri-baslik">${esc(d.title)}</h2>
          ${d.tagline ? `<p class="digest-tagline">${sanitize(d.tagline)}</p>` : ""}
          <div class="digest-tools">
            <button type="button" class="digest-btn digest-btn--done" id="digestDoneBtn" aria-pressed="false">Bu konuyu tamamladım</button>
            ${
              "speechSynthesis" in window
                ? '<button type="button" class="digest-btn" id="digestListenBtn" aria-pressed="false">🔈 Hikâyeyi dinle</button>'
                : ""
            }
          </div>
          ${nav ? `<ul class="digest-nav" aria-label="Defter bölümleri">${nav}</ul>` : ""}
        </div>
        ${d.hook ? `<p class="digest-hook">${sanitize(d.hook)}</p>` : ""}
        ${
          d.bigIdea
            ? `<div class="digest-idea"><span class="digest-idea-label">✦ Büyük fikir</span><p>${sanitize(d.bigIdea)}</p></div>`
            : ""
        }
        ${renderStory(d)}
        ${renderCore(d)}
        ${renderLab(d)}
        ${renderWow(d)}
        ${renderWorked(d)}
        ${renderMyths(d)}
        ${renderGlossary(d)}
        ${renderBridge(d)}
        ${renderQuiz(d)}
        ${renderNext(d)}
        ${renderSources(d)}
        <footer class="digest-foot">
          ${d.revision ? `<p>Son gözden geçirme: ${esc(d.revision)}</p>` : ""}
          <p>İlerleme yalnızca bu cihazda saklanır.</p>
        </footer>
      </div>`;
  }

  /* ── Etkileşimler ── */
  function bindDone(root, slug) {
    const btn = root.querySelector("#digestDoneBtn");
    if (!btn) return;
    const sync = () => {
      const done = isComplete(slug);
      btn.setAttribute("aria-pressed", String(done));
      btn.textContent = done ? "Tamamlandı" : "Bu konuyu tamamladım";
    };
    btn.addEventListener("click", () => {
      setComplete(slug, !isComplete(slug));
      sync();
    });
    window.addEventListener("acelya-atlas-progress", sync);
    sync();
  }

  function bindListen(root, d) {
    const btn = root.querySelector("#digestListenBtn");
    if (!btn) return;
    const text = [d.hook, d.bigIdea, ...(d.story || [])].filter(Boolean).map(textOf).join(" ");
    const stop = () => {
      window.speechSynthesis.cancel();
      speech = null;
      btn.setAttribute("aria-pressed", "false");
      btn.textContent = "🔈 Hikâyeyi dinle";
    };
    btn.addEventListener("click", () => {
      if (speech) {
        stop();
        return;
      }
      const utter = new SpeechSynthesisUtterance(text);
      utter.lang = "tr-TR";
      const voice = window.speechSynthesis.getVoices().find((v) => /^tr/i.test(v.lang));
      if (voice) utter.voice = voice;
      utter.rate = 0.98;
      utter.onend = stop;
      utter.onerror = stop;
      speech = utter;
      btn.setAttribute("aria-pressed", "true");
      btn.textContent = "⏹ Durdur";
      window.speechSynthesis.cancel();
      window.speechSynthesis.speak(utter);
    });
    window.addEventListener("pagehide", stop);
  }

  function bindQuiz(root, slug) {
    const stored = readJSON(QUIZ_KEY, {});
    root.querySelectorAll(".digest-q").forEach((fs) => {
      const answer = Number(fs.dataset.answer);
      const feedback = fs.querySelector(".digest-feedback");
      const explanation = feedback?.dataset.explanation || "";
      const options = Array.from(fs.querySelectorAll(".digest-option"));
      fs.addEventListener("change", (event) => {
        const chosen = Number(event.target.value);
        const correct = chosen === answer;
        options.forEach((o) => {
          o.classList.toggle("is-chosen", Number(o.dataset.opt) === chosen);
          o.classList.toggle("is-answer", Number(o.dataset.opt) === answer);
        });
        fs.classList.toggle("is-correct", correct);
        fs.classList.toggle("is-wrong", !correct);
        feedback.innerHTML = `<strong>${correct ? "Doğru." : "Henüz değil."}</strong>${esc(explanation)}`;
        const key = `${slug}:${fs.dataset.q}`;
        stored[key] = { correct, at: new Date().toISOString() };
        writeJSON(QUIZ_KEY, stored);
      });
    });
  }

  function addTopbarButton() {
    const actions = document.querySelector(".app-topbar-actions");
    if (!actions || document.getElementById("appDigestBtn")) return;
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "app-btn-icon";
    btn.id = "appDigestBtn";
    btn.title = "Keşif Defteri'ne git";
    btn.setAttribute("aria-label", "Keşif Defteri'ne git");
    btn.textContent = "📖";
    btn.addEventListener("click", () => {
      document.getElementById("kesif-defteri")?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
    actions.insertBefore(btn, actions.firstChild);
  }

  function ensureMeta(d) {
    if (!d.tagline || document.querySelector('meta[name="description"]')) return;
    const meta = document.createElement("meta");
    meta.name = "description";
    meta.content = textOf(d.tagline);
    document.head.appendChild(meta);
  }

  function mount(d) {
    if (document.getElementById("kesif-defteri")) return;
    const section = document.createElement("section");
    section.className = "digest";
    section.id = "kesif-defteri";
    section.setAttribute("aria-labelledby", "kesif-defteri-baslik");
    section.innerHTML = render(d);
    document.body.appendChild(section);
    document.body.classList.add("digest-ready");
    document.documentElement.classList.add("digest-ready");
    bindDone(section, d.slug || pageId);
    bindListen(section, d);
    bindQuiz(section, d.slug || pageId);
    addTopbarButton();
    ensureMeta(d);
    window.dispatchEvent(new CustomEvent("acelya-digest-ready", { detail: { slug: d.slug || pageId } }));
  }

  function loadCss() {
    if (document.querySelector('link[href="shared/digest.css"]')) return;
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "shared/digest.css";
    document.head.appendChild(link);
  }

  function init(id) {
    pageId = id;
    const body = document.body;
    if (!body || !pageId) return;
    if (
      pageId === "index" ||
      pageId === "bilgi" ||
      pageId === "404" ||
      body.classList.contains("atlas-experience") ||
      body.dataset.stemPage
    ) {
      return;
    }
    const existing = window.ACELYA_DIGEST?.[pageId];
    if (existing) {
      loadCss();
      mount(existing);
      return;
    }
    const script = document.createElement("script");
    script.src = `shared/digest/${encodeURIComponent(pageId)}.js`;
    script.async = true;
    script.onload = () => {
      const data = window.ACELYA_DIGEST?.[pageId];
      if (!data) return;
      loadCss();
      mount(data);
    };
    script.onerror = () => {
      // Bu sayfa için defter henüz yazılmamış; sayfa normal çalışmaya devam eder.
    };
    document.head.appendChild(script);
  }

  window.AcelyaDigest = { init, mount, sanitize };
})();
