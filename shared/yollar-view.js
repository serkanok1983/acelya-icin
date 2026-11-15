/**
 * Açelya — Öğrenme Yolları ve Önşart sayfalarının çizimi.
 * Veri: shared/yollar.js (ACELYA_YOLLAR), ders başlıkları: shared/catalog.js (ACELYA_CATALOG).
 * Sayfa türü: <body data-yol-mode="yollar|onsart">.
 * "Tamamlandı" işaretleri Keşif Defteri ile ortak ders ilerlemesinden okunur.
 */
(function () {
  "use strict";

  const DATA = window.ACELYA_YOLLAR;
  const CATALOG = window.ACELYA_CATALOG || {};
  const lessonProgress = window.AcelyaLessonProgress;
  const root = document.getElementById("yol-root");
  if (!DATA || !root) return;

  const mode = document.body.dataset.yolMode === "onsart" ? "onsart" : "yollar";

  const esc = (v) =>
    String(v).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

  const exists = (slug) => Object.prototype.hasOwnProperty.call(CATALOG, slug);
  const shortTitle = (t) => String(t).split(":")[0].trim();
  const lessonHref = (slug, trackId) => `${slug}.html?yol=${encodeURIComponent(trackId)}`;

  function itemHtml(slug, n, progress, trackId) {
    if (exists(slug)) {
      const info = CATALOG[slug];
      const meta = [info.level, info.minutes ? `~${info.minutes} dk` : ""].filter(Boolean).join(" · ");
      const done = Boolean(progress[slug]);
      const href = lessonHref(slug, trackId);
      return `<li class="yol-item${done ? " is-done" : ""}">
        <span class="yol-n" aria-hidden="true">${n}</span>
        <a class="yol-link" href="${esc(href)}" title="${esc(info.title)}"><span class="yol-name">${esc(shortTitle(info.title))}</span><span class="yol-meta">${esc(meta)}</span></a>
        <label class="yol-check"><input type="checkbox" autocomplete="off" data-done="${esc(slug)}" aria-label="${esc(`${shortTitle(info.title)} · Tamamlandı`)}"${done ? " checked" : ""}><span>Tamamlandı</span></label>
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
    return {
      total: all.length,
      ready: ready.length,
      done: done.length,
      hours: Math.round(minutes / 6) / 10,
      next: ready.find((slug) => !progress[slug]),
    };
  }

  function fmtHours(h) {
    return String(h).replace(".", ",");
  }

  function trackHtml(track, progress, openId) {
    const st = stats(track, progress);
    const pct = st.ready ? Math.round((100 * st.done) / st.ready) : 0;
    const planned = st.total - st.ready;
    const nextTitle = st.next ? esc(shortTitle(CATALOG[st.next].title)) : "";
    const nextStatus = planned ? "Hazır dersler tamamlandı." : "Bütün dersler tamamlandı.";
    const nextPreview = st.next ? `Sıradaki ders · ${nextTitle}` : st.ready ? nextStatus : "";
    const nextLink = st.next
      ? `<a class="yol-next" href="${esc(lessonHref(st.next, track.id))}">
          <span class="yol-next-copy"><span>Sıradaki ders</span><strong>${nextTitle}</strong></span>
          <span class="yol-next-arrow" aria-hidden="true">→</span>
        </a>`
      : st.ready ? `<p class="yol-next yol-next--done">${nextStatus}</p>` : "";
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
          <ol class="yol-list">${s.items.map((slug) => itemHtml(slug, ++n, progress, track.id)).join("")}</ol>
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
      pre = `<div class="yol-stage yol-stage--pre"><h3>Önerilen temel</h3><p class="yol-note">Gerek duyduğun konulara bu dizilerden dönebilirsin.</p><div class="yol-chips">${chips}</div></div>`;
    }
    let post = "";
    if (mode === "onsart") {
      const users = DATA.yollar.filter((y) => (y.onsart || []).includes(track.id));
      if (users.length)
        post = `<div class="yol-stage yol-stage--pre"><h3>Bu temelden yararlanan yollar</h3><div class="yol-chips">${users
          .map((y) => `<a class="yol-chip" href="ogrenme-yollari.html#${esc(y.id)}">${esc(y.title)}</a>`)
          .join("")}</div></div>`;
    }

    return `<details class="yol" id="${esc(track.id)}"${openId === track.id ? " open" : ""}>
      <summary>
        <span class="yol-icon" aria-hidden="true">${esc(track.icon)}</span>
        <span class="yol-head"><span class="yol-title">${esc(track.title)}</span><span class="yol-sum">${esc(track.summary)}</span>
        <span class="yol-stats">${esc(lines.join(" · "))}</span>
        <span class="yol-bar" role="img" aria-label="${st.done} / ${st.ready} ders tamamlandı"><span style="width:${pct}%"></span></span>
        ${nextPreview ? `<span class="yol-next-preview">${nextPreview}</span>` : ""}</span>
      </summary>
      <div class="yol-body">${nextLink}${pre}${stages}${post}</div>
    </details>`;
  }

  function trackList(tracks, label, progress, openSet) {
    const jump = tracks
      .map((t) => `<a class="yol-chip" href="#${esc(t.id)}"><span aria-hidden="true">${esc(t.icon)}</span> ${esc(shortTitle(t.title))}</a>`)
      .join("");
    return `<nav class="yol-jump" aria-label="${esc(label)}">${jump}</nav>` +
      tracks.map((t) => trackHtml(t, progress, openSet.has(t.id) ? t.id : null)).join("");
  }

  function render(progress = lessonProgress.read()) {
    const openSet = new Set([...root.querySelectorAll("details.yol[open]")].map((d) => d.id));
    if (mode === "onsart") {
      root.innerHTML = trackList(DATA.onsart, "Önşart dizileri", progress, openSet);
      return;
    }
    root.innerHTML = [
      { id: "secmeli-yollar", label: "Seçmeli Yollar", tracks: DATA.yollar.filter((y) => y.elective) },
      { id: "meslek-yollari", label: "Meslek Yolları", tracks: DATA.yollar.filter((y) => !y.elective) },
    ].map(({ id, label, tracks }) =>
      `<section class="yol-group" aria-labelledby="${id}"><h2 id="${id}" tabindex="-1">${label}</h2>${trackList(tracks, label, progress, openSet)}</section>`,
    ).join("");
  }

  root.addEventListener("change", (e) => {
    const box = e.target.closest("input[data-done]");
    if (!box) return;
    const slug = box.dataset.done;
    const trackId = box.closest("details.yol").id;
    const scrollY = window.scrollY;
    lessonProgress.set(slug, box.checked);
    const again = document.getElementById(trackId)?.querySelector(`input[data-done="${CSS.escape(slug)}"]`);
    if (again) again.focus({ preventScroll: true });
    window.scrollTo(0, scrollY);
  });

  lessonProgress.subscribe(render);

  function focusTrack() {
    let id;
    try {
      id = decodeURIComponent(location.hash.slice(1));
    } catch (_) {
      return;
    }
    const target = document.getElementById(id);
    if (!target || !root.contains(target)) return;
    if (target.matches("details.yol")) {
      target.open = true;
      target.querySelector("summary").focus({ preventScroll: true });
    } else {
      target.focus({ preventScroll: true });
    }
    target.scrollIntoView({ block: "start" });
  }

  root.addEventListener("click", (event) => {
    if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    if (event.target.closest(".yol-jump a")?.hash !== location.hash) return;
    event.preventDefault();
    focusTrack();
  });
  window.addEventListener("hashchange", focusTrack);

  render();
  focusTrack();
})();
