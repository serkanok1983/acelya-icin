/**
 * Açelya — Öğrenme Yolları ve Önşart sayfalarının çizimi.
 * Veri: shared/yollar.js (ACELYA_YOLLAR), ders başlıkları: shared/catalog.js (ACELYA_CATALOG).
 * Sayfa türü: <body data-yol-mode="yollar|onsart">.
 * "Tamamlandı" işaretleri yalnız bu tarayıcıda tutulur; depolama kapalıysa sekme boyunca bellekte kalır.
 */
(function () {
  "use strict";

  const DATA = window.ACELYA_YOLLAR;
  const CATALOG = window.ACELYA_CATALOG || {};
  const root = document.getElementById("yol-root");
  if (!DATA || !root) return;

  const mode = document.body.dataset.yolMode === "onsart" ? "onsart" : "yollar";
  const KEY = "acelya-yol-ilerleme-v1";
  const OLD_ATLAS_KEY = "acelya-atlas-progress-v1";
  let memory = null;

  const esc = (v) =>
    String(v).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

  function readProgress() {
    if (memory) return { ...memory };
    try {
      let p = JSON.parse(localStorage.getItem(KEY) || "null");
      if (!p || typeof p !== "object") {
        // Kaldırılan Bilim Atlası'ndaki işaretler kaybolmasın.
        const old = JSON.parse(localStorage.getItem(OLD_ATLAS_KEY) || "{}");
        p = {};
        if (old && typeof old === "object") for (const k of Object.keys(old)) if (old[k]) p[k] = true;
      }
      return p;
    } catch (_) {
      return {};
    }
  }

  function writeProgress(p) {
    try {
      localStorage.setItem(KEY, JSON.stringify(p));
      memory = null;
    } catch (_) {
      memory = { ...p };
    }
  }

  const exists = (slug) => Object.prototype.hasOwnProperty.call(CATALOG, slug);
  const shortTitle = (t) => String(t).split(":")[0].trim();

  function itemHtml(slug, n, progress) {
    if (exists(slug)) {
      const info = CATALOG[slug];
      const meta = [info.level, info.minutes ? `~${info.minutes} dk` : ""].filter(Boolean).join(" · ");
      const done = Boolean(progress[slug]);
      return `<li class="yol-item${done ? " is-done" : ""}">
        <span class="yol-n" aria-hidden="true">${n}</span>
        <a class="yol-link" href="${esc(slug)}.html" title="${esc(info.title)}"><span class="yol-name">${esc(shortTitle(info.title))}</span><span class="yol-meta">${esc(meta)}</span></a>
        <label class="yol-check"><input type="checkbox" data-done="${esc(slug)}"${done ? " checked" : ""}><span>Tamamlandı</span></label>
      </li>`;
    }
    const title = DATA.planned[slug] || slug;
    return `<li class="yol-item is-planned">
        <span class="yol-n" aria-hidden="true">${n}</span>
        <span class="yol-link"><span class="yol-name">${esc(shortTitle(title))}</span><span class="yol-meta">Hazırlanıyor</span></span>
      </li>`;
  }

  function stats(track, progress) {
    const all = [...new Set(track.stages.flatMap((s) => s.items))];
    const ready = all.filter(exists);
    const done = ready.filter((s) => progress[s]);
    const minutes = ready.reduce((m, s) => m + (CATALOG[s].minutes || 0), 0);
    return { total: all.length, ready: ready.length, done: done.length, hours: Math.round(minutes / 6) / 10 };
  }

  function fmtHours(h) {
    return String(h).replace(".", ",");
  }

  function trackHtml(track, progress, openId) {
    const st = stats(track, progress);
    const pct = st.ready ? Math.round((100 * st.done) / st.ready) : 0;
    const planned = st.total - st.ready;
    const lines = [
      `${st.ready} ders hazır${planned ? `, ${planned} ders hazırlanıyor` : ""}`,
      `yaklaşık ${fmtHours(st.hours)} saat`,
    ];
    let n = 0;
    const stages = track.stages
      .map(
        (s) => `<div class="yol-stage">
          <h3>${esc(s.title)}</h3>
          ${s.note ? `<p class="yol-note">${esc(s.note)}</p>` : ""}
          <ol class="yol-list">${s.items.map((slug) => itemHtml(slug, ++n, progress)).join("")}</ol>
        </div>`,
      )
      .join("");

    let pre = "";
    if (mode === "yollar" && track.onsart?.length) {
      const chips = track.onsart
        .map((id) => DATA.onsart.find((o) => o.id === id))
        .filter(Boolean)
        .map((o) => `<a class="yol-chip" href="onsart.html#${esc(o.id)}">${esc(shortTitle(o.title))}</a>`)
        .join("");
      pre = `<div class="yol-stage yol-stage--pre"><h3>Önşart</h3><p class="yol-note">Bu yola girmeden önce, eksik hissettiğin temeli buradan tamamla.</p><div class="yol-chips">${chips}</div></div>`;
    }
    let post = "";
    if (mode === "onsart") {
      const users = DATA.yollar.filter((y) => (y.onsart || []).includes(track.id));
      if (users.length)
        post = `<div class="yol-stage yol-stage--pre"><h3>Bu temeli isteyen yollar</h3><div class="yol-chips">${users
          .map((y) => `<a class="yol-chip" href="ogrenme-yollari.html#${esc(y.id)}">${esc(y.title)}</a>`)
          .join("")}</div></div>`;
    }

    return `<details class="yol" id="${esc(track.id)}"${openId === track.id ? " open" : ""}>
      <summary>
        <span class="yol-icon" aria-hidden="true">${esc(track.icon)}</span>
        <span class="yol-head"><span class="yol-title">${esc(track.title)}</span><span class="yol-sum">${esc(track.summary)}</span>
        <span class="yol-stats">${esc(lines.join(" · "))}</span>
        <span class="yol-bar" role="img" aria-label="${st.done} / ${st.ready} ders tamamlandı"><span style="width:${pct}%"></span></span></span>
      </summary>
      <div class="yol-body">${pre}${stages}${post}</div>
    </details>`;
  }

  function render() {
    const progress = readProgress();
    const tracks = mode === "onsart" ? DATA.onsart : DATA.yollar;
    const openId = decodeURIComponent(location.hash.slice(1));
    const openSet = new Set([...root.querySelectorAll("details.yol[open]")].map((d) => d.id));
    if (openId) openSet.add(openId);
    const jump = tracks
      .map((t) => `<a class="yol-chip" href="#${esc(t.id)}">${esc(t.icon)} ${esc(shortTitle(t.title))}</a>`)
      .join("");
    root.innerHTML =
      `<nav class="yol-jump" aria-label="${mode === "onsart" ? "Önşart dizileri" : "Öğrenme yolları"}">${jump}</nav>` +
      tracks.map((t) => trackHtml(t, progress, openSet.has(t.id) ? t.id : null)).join("");
  }

  root.addEventListener("change", (e) => {
    const box = e.target.closest("input[data-done]");
    if (!box) return;
    const p = readProgress();
    if (box.checked) p[box.dataset.done] = true;
    else delete p[box.dataset.done];
    writeProgress(p);
    const slug = box.dataset.done;
    const scrollY = window.scrollY;
    render();
    // Aynı ders birden çok yolda olabilir; odağı ilk eşine geri ver, sayfa yerinden oynamasın.
    const again = root.querySelector(`input[data-done="${CSS.escape(slug)}"]`);
    if (again) again.focus({ preventScroll: true });
    window.scrollTo(0, scrollY);
  });

  window.addEventListener("hashchange", () => {
    render();
    const el = document.getElementById(decodeURIComponent(location.hash.slice(1)));
    if (el) el.scrollIntoView({ block: "start" });
  });

  render();
  if (location.hash) {
    const el = document.getElementById(decodeURIComponent(location.hash.slice(1)));
    if (el) el.scrollIntoView({ block: "start" });
  }
})();
