/**
 * Açelya — kalıcı skor tablosu (Firebase + yerel yedek)
 */
(function () {
  "use strict";

  const LOCAL_KEY = "acelya-leaderboard-v1";
  const PLAYERS = ["acelya", "serkan"];
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
    if (dbReady) {
      try {
        return await Promise.race([
          dbReady,
          new Promise((_, rej) => setTimeout(() => rej(new Error("firebase-timeout")), 8000)),
        ]);
      } catch {
        dbReady = null;
        return null;
      }
    }
    dbReady = (async () => {
      const cfg = window.ACELYA_FIREBASE;
      if (!cfg || !cfg.apiKey || !cfg.databaseURL) return null;
      try {
        await loadScript("https://www.gstatic.com/firebasejs/10.14.0/firebase-app-compat.js");
        await loadScript("https://www.gstatic.com/firebasejs/10.14.0/firebase-database-compat.js");
        if (!firebase.apps.length) firebase.initializeApp(cfg);
        return firebase.database();
      } catch (e) {
        console.warn("Firebase yüklenemedi:", e);
        return null;
      }
    })();
    try {
      return await Promise.race([
        dbReady,
        new Promise((_, rej) => setTimeout(() => rej(new Error("firebase-timeout")), 8000)),
      ]);
    } catch {
      dbReady = null;
      return null;
    }
  }

  function readLocal() {
    try {
      return JSON.parse(localStorage.getItem(LOCAL_KEY) || "{}");
    } catch {
      return {};
    }
  }

  function writeLocal(data) {
    localStorage.setItem(LOCAL_KEY, JSON.stringify(data));
  }

  function getLocalBest(gameId, user) {
    const data = readLocal();
    return data[gameId]?.[user] ?? 0;
  }

  function setLocalBest(gameId, user, score, higherBetter) {
    const data = readLocal();
    if (!data[gameId]) data[gameId] = {};
    const cur = data[gameId][user] ?? 0;
    const better = higherBetter ? score > cur : score < cur || cur === 0;
    if (better) {
      data[gameId][user] = score;
      writeLocal(data);
      return true;
    }
    return false;
  }

  function getCurrentUser() {
    return window.AcelyaAuth?.getCurrentUser?.() || null;
  }

  function getLocalScores(gameId) {
    const out = {};
    PLAYERS.forEach((p) => {
      out[p] = getLocalBest(gameId, p);
    });
    return out;
  }

  async function fetchGame(gameId) {
    const out = getLocalScores(gameId);

    const database = await initDb();
    if (!database) return out;

    try {
      const snap = await database.ref(`leaderboard/${gameId}`).once("value");
      const val = snap.val() || {};
      PLAYERS.forEach((p) => {
        if (typeof val[p] === "number") out[p] = val[p];
      });
    } catch (e) {
      console.warn("Skor okunamadı:", e);
    }
    return out;
  }

  async function submit(gameId, score, opts = {}) {
    const higherBetter = opts.higherBetter !== false;
    const user = getCurrentUser();
    if (!user || !gameId || !Number.isFinite(score)) return false;

    const s = Math.round(score);
    const improved = setLocalBest(gameId, user, s, higherBetter);

    const database = await initDb();
    if (database && improved) {
      try {
        const ref = database.ref(`leaderboard/${gameId}/${user}`);
        const snap = await ref.once("value");
        const cur = snap.val();
        const isBetter =
          cur == null ||
          (higherBetter && s > cur) ||
          (!higherBetter && (s < cur || cur === 0));
        if (isBetter) await ref.set(s);
      } catch (e) {
        console.warn("Skor yazılamadı:", e);
      }
    }

    const lb = document.getElementById("acelyaLeaderboard");
    if (lb && lb._refresh) lb._refresh();

    return improved;
  }

  function formatScores(scores) {
    return PLAYERS.map((p) => {
      const label = p === "acelya" ? "Açelya" : "Serkan";
      return `${label}: ${scores[p] ?? 0}`;
    }).join(" · ");
  }

  function mount(gameId) {
    const hud = document.querySelector(".hud");
    if (!hud || document.getElementById("acelyaLeaderboard")) return null;

    const board = document.createElement("div");
    board.id = "acelyaLeaderboard";
    board.className = "acelya-leaderboard";
    board.innerHTML = `
      <span class="acelya-lb-label">🏆 Rekorlar</span>
      <span class="acelya-lb-scores" id="acelyaLbScores">yükleniyor…</span>
      <span class="acelya-lb-you" id="acelyaLbYou"></span>`;

    const status = hud.querySelector("#status, #score, #info");
    if (status && status.nextSibling) hud.insertBefore(board, status.nextSibling);
    else hud.appendChild(board);

    async function refresh() {
      const scoresEl = document.getElementById("acelyaLbScores");
      const youEl = document.getElementById("acelyaLbYou");
      if (!scoresEl) return;
      const localScores = getLocalScores(gameId);
      scoresEl.textContent = formatScores(localScores);
      const user = getCurrentUser();
      if (user && youEl) {
        const name = user === "acelya" ? "Açelya" : "Serkan";
        youEl.textContent = `Sen (${name}): ${localScores[user] ?? 0}`;
      }

      const scores = await fetchGame(gameId);
      const scoresEl2 = document.getElementById("acelyaLbScores");
      const youEl2 = document.getElementById("acelyaLbYou");
      if (!scoresEl2) return;
      scoresEl2.textContent = formatScores(scores);
      if (user && youEl2) {
        const name = user === "acelya" ? "Açelya" : "Serkan";
        youEl2.textContent = `Sen (${name}): ${scores[user] ?? 0}`;
      }
    }

    board._refresh = refresh;
    refresh();
    const interval = setInterval(refresh, 12000);
    window.addEventListener("beforeunload", () => clearInterval(interval));
    return { refresh };
  }

  window.AcelyaLeaderboard = {
    PLAYERS,
    submit,
    fetch: fetchGame,
    mount,
    getLocalBest,
  };
})();
