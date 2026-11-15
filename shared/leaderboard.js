/**
 * Açelya — bu tarayıcıya ait yerel skorlar (hesap ve ağ isteği yok)
 */
(function () {
  "use strict";

  const LOCAL_KEY = "acelya-device-best-v1";
  const HISTORY_KEY = "acelya-device-history-v1";
  const MAX_HISTORY = 20;
  const PLAYERS = ["local"];
  function readLocal() {
    try {
      return JSON.parse(localStorage.getItem(LOCAL_KEY) || "{}");
    } catch {
      return {};
    }
  }

  function writeLocal(data) {
    try {
      localStorage.setItem(LOCAL_KEY, JSON.stringify(data));
    } catch (_) {
      // Depolama kapalıysa oyun akışı skor kaydı yüzünden bozulmamalı.
    }
  }

  function getLocalBest(gameId, user) {
    const data = readLocal();
    return data[gameId]?.[user] ?? 0;
  }

  function setLocalBest(gameId, user, score, higherBetter) {
    const data = readLocal();
    if (!data[gameId]) data[gameId] = {};
    const cur = data[gameId][user];
    const better = !Number.isFinite(cur) || (higherBetter ? score > cur : score < cur);
    if (better) {
      data[gameId][user] = score;
      writeLocal(data);
      return true;
    }
    return false;
  }

  function getCurrentUser() {
    return "local";
  }

  function getLocalScores(gameId) {
    const out = {};
    PLAYERS.forEach((p) => {
      out[p] = getLocalBest(gameId, p);
    });
    return out;
  }

  async function fetchGame(gameId) {
    return getLocalScores(gameId);
  }

  async function submit(gameId, score, opts = {}) {
    const higherBetter = opts.higherBetter !== false;
    const user = getCurrentUser();
    if (!user || !gameId || !Number.isFinite(score)) return false;

    const s = Math.round(score);
    const improved = setLocalBest(gameId, user, s, higherBetter);

    // Skor geçmişine ekle
    addToHistory(gameId, user, s, higherBetter);

    const lb = document.getElementById("acelyaLeaderboard");
    if (lb && lb._refresh) lb._refresh();

    return improved;
  }

  function formatScores(scores) {
    return PLAYERS.map((p) => {
      const label = "Bu cihaz";
      return `${label}: ${scores[p] ?? 0}`;
    }).join(" · ");
  }

  /* —— Skor geçmişi —— */
  function readHistory() {
    try {
      return JSON.parse(localStorage.getItem(HISTORY_KEY) || "{}");
    } catch {
      return {};
    }
  }

  function writeHistory(data) {
    try {
      localStorage.setItem(HISTORY_KEY, JSON.stringify(data));
    } catch (_) {
      // Depolama kapalıysa yalnız geçmiş özelliğinden vazgeçilir.
    }
  }

  function getHistory(gameId, user) {
    const data = readHistory();
    const key = `${gameId}_${user}`;
    return data[key] || [];
  }

  function addToHistory(gameId, user, score, higherBetter) {
    const data = readHistory();
    const key = `${gameId}_${user}`;
    if (!data[key]) data[key] = [];
    data[key].push({ score, date: Date.now(), higherBetter: higherBetter !== false });
    if (data[key].length > MAX_HISTORY) data[key] = data[key].slice(-MAX_HISTORY);
    writeHistory(data);
    return data[key];
  }

  function getHistoryStats(gameId, user) {
    const history = getHistory(gameId, user);
    if (!history.length) return null;
    const scores = history.map((h) => h.score);
    const higherBetter = history[history.length - 1].higherBetter !== false;
    const rawTrend =
      scores.length >= 2
        ? scores[scores.length - 1] - scores[scores.length - 2]
        : 0;
    return {
      last: scores[scores.length - 1],
      best: higherBetter ? Math.max(...scores) : Math.min(...scores),
      avg: Math.round(scores.reduce((a, b) => a + b, 0) / scores.length),
      total: scores.length,
      trend: higherBetter ? rawTrend : -rawTrend,
    };
  }

  function getHistoryHTML(gameId, user) {
    const stats = getHistoryStats(gameId, user);
    if (!stats) return "";
    const trendIcon = stats.trend > 0 ? "📈" : stats.trend < 0 ? "📉" : "➡️";
    const name = "Bu cihaz";
    return `<div class="acelya-history" style="font-size:0.78rem;color:var(--text-muted);margin-top:4px">
      ${name} · Son: ${stats.last} · En iyi: ${stats.best} · Ort: ${stats.avg} ${trendIcon}
    </div>`;
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
      <span class="acelya-lb-history" id="acelyaLbHistory"></span>`;

    const status = hud.querySelector("#status, #score, #info");
    if (status && status.nextSibling) hud.insertBefore(board, status.nextSibling);
    else hud.appendChild(board);

    function refresh() {
      const scoresEl = document.getElementById("acelyaLbScores");
      const historyEl = document.getElementById("acelyaLbHistory");
      if (!scoresEl) return;
      scoresEl.textContent = formatScores(getLocalScores(gameId));
      if (historyEl) historyEl.innerHTML = getHistoryHTML(gameId, getCurrentUser());
    }

    board._refresh = refresh;
    refresh();
    window.addEventListener("storage", (event) => {
      if (event.key === LOCAL_KEY || event.key === HISTORY_KEY || event.key === null) refresh();
    });
    return { refresh };
  }

  window.AcelyaLeaderboard = {
    PLAYERS,
    getCurrentUser,
    submit,
    fetch: fetchGame,
    mount,
    getLocalBest,
    getHistory,
    addToHistory,
    getHistoryStats,
    getHistoryHTML,
  };
})();
