/**
 * Açelya — giriş ve sayfa gezintisi kaydı (yalnızca acelya kullanıcısı)
 */
(function () {
  "use strict";

  const LOCAL_KEY = "acelya-activity-v1";
  const MAX_LOCAL = 250;
  const TRACKED_USER = "acelya";
  let dbReady = null;

  function loadScript(src) {
    return new Promise((resolve, reject) => {
      if (document.querySelector(`script[src="${src}"]`)) {
        resolve();
        return;
      }
      const s = document.createElement("script");
      s.src = src;
      s.onload = resolve;
      s.onerror = reject;
      document.head.appendChild(s);
    });
  }

  async function initDb() {
    if (dbReady) return dbReady;
    dbReady = (async () => {
      const cfg = window.ACELYA_FIREBASE;
      if (!cfg || !cfg.apiKey || !cfg.databaseURL) return null;
      try {
        if (!window.firebase) {
          await loadScript("https://www.gstatic.com/firebasejs/10.14.0/firebase-app-compat.js");
          await loadScript("https://www.gstatic.com/firebasejs/10.14.0/firebase-database-compat.js");
        }
        if (!firebase.apps.length) firebase.initializeApp(cfg);
        return firebase.database();
      } catch (e) {
        console.warn("Activity DB:", e);
        return null;
      }
    })();
    return dbReady;
  }

  function readLocal() {
    try {
      return JSON.parse(localStorage.getItem(LOCAL_KEY) || '{"logins":[],"pages":[]}');
    } catch {
      return { logins: [], pages: [] };
    }
  }

  function writeLocal(data) {
    localStorage.setItem(LOCAL_KEY, JSON.stringify(data));
  }

  function getUser() {
    if (window.AcelyaAuth?.getCurrentUser) return AcelyaAuth.getCurrentUser();
    return sessionStorage.getItem("acelya-user") || localStorage.getItem("acelya-user");
  }

  function shouldTrack() {
    return getUser() === TRACKED_USER;
  }

  function entry(ts, extra) {
    return { t: ts || Date.now(), ...extra };
  }

  function trimLocal(arr) {
    return arr.slice(0, MAX_LOCAL);
  }

  async function pushLocalAndCloud(kind, item) {
    const data = readLocal();
    if (!data[kind]) data[kind] = [];
    data[kind].unshift(item);
    data[kind] = trimLocal(data[kind]);
    writeLocal(data);

    const db = await initDb();
    if (db) {
      try {
        await db.ref(`activity/acelya/${kind}`).push(item);
      } catch (e) {
        console.warn("Activity yazılamadı:", e);
      }
    }
  }

  async function logLogin() {
    if (!shouldTrack()) return;
    await pushLocalAndCloud("logins", entry());
  }

  async function logPageVisit(pageId, title) {
    if (!shouldTrack()) return;
    const pid = String(pageId || "bilinmeyen").replace(/\.html$/, "");
    await pushLocalAndCloud(
      "pages",
      entry(null, { page: pid, title: title || pid })
    );
  }

  async function readList(kind) {
    const local = readLocal()[kind] || [];
    const db = await initDb();
    if (!db) return local;

    try {
      const snap = await db.ref(`activity/acelya/${kind}`).once("value");
      const val = snap.val();
      if (!val) return local;
      const remote = Object.values(val).filter((x) => x && x.t);
      const merged = [...remote, ...local];
      merged.sort((a, b) => b.t - a.t);
      const seen = new Set();
      return merged.filter((item) => {
        const key = `${item.t}-${item.page || ""}-${item.title || ""}`;
        if (seen.has(key)) return false;
        seen.add(key);
        return true;
      });
    } catch (e) {
      console.warn("Activity okunamadı:", e);
      return local;
    }
  }

  function formatTr(ts) {
    return new Intl.DateTimeFormat("tr-TR", {
      dateStyle: "medium",
      timeStyle: "short",
    }).format(new Date(ts));
  }

  function groupLoginsByDay(logins) {
    const days = new Map();
    logins.forEach((item) => {
      const d = new Date(item.t);
      const key = d.toLocaleDateString("tr-TR", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      });
      if (!days.has(key)) days.set(key, []);
      days.get(key).push(item);
    });
    return days;
  }

  function summarizePages(pages) {
    const map = new Map();
    pages.forEach((p) => {
      const id = p.page || "bilinmeyen";
      const cur = map.get(id) || {
        page: id,
        title: p.title || id,
        count: 0,
        last: 0,
      };
      cur.count++;
      cur.title = p.title || cur.title;
      if (p.t > cur.last) cur.last = p.t;
      map.set(id, cur);
    });
    return [...map.values()].sort((a, b) => b.last - a.last);
  }

  async function fetchReport() {
    const [logins, pages] = await Promise.all([readList("logins"), readList("pages")]);
    return {
      logins,
      pages,
      loginDays: groupLoginsByDay(logins),
      pageSummary: summarizePages(pages),
    };
  }

  window.AcelyaActivity = {
    logLogin,
    logPageVisit,
    fetchReport,
    formatTr,
  };
})();
