/**
 * Oyun sayfaları — skor tablosu, mobil kontroller, yardımcılar
 */
(function () {
  "use strict";

  const GAME_PAGES = new Set([
    "pong",
    "asteroids",
    "snake",
    "breakout",
    "oyun-2048",
    "yasam-oyunu",
    "tetris",
    "gezegen-savunmasi",
    "formul-hafiza",
    "mayin-tarlasi",
    "hanoi-kuleleri",
    "uzay-kosucusu",
    "isik-sondurme",
  ]);

  const SCORE_OPTS = {
    "formul-hafiza": { higherBetter: true },
    "mayin-tarlasi": { higherBetter: true },
    "hanoi-kuleleri": { higherBetter: false },
    "isik-sondurme": { higherBetter: false },
  };

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

  function loadCSS(href) {
    if (document.querySelector(`link[href="${href}"]`)) return;
    const l = document.createElement("link");
    l.rel = "stylesheet";
    l.href = href;
    document.head.appendChild(l);
  }

  async function recordScore(gameId, score, opts) {
    const merged = { ...SCORE_OPTS[gameId], ...opts };
    const improved = await window.AcelyaLeaderboard?.submit(gameId, score, merged);
    if (improved) {
      const lb = document.getElementById("acelyaLeaderboard");
      if (lb) {
        lb.classList.add("acelya-new-record");
        setTimeout(() => lb.classList.remove("acelya-new-record"), 700);
      }
    }
    return improved;
  }

  async function initGamePage(pageId) {
    if (!GAME_PAGES.has(pageId)) return;

    loadCSS("shared/game-mobile.css");

    await loadScript("shared/auth.js");
    await loadScript("shared/firebase-config.js");
    await loadScript("shared/leaderboard.js");
    await loadScript("shared/game-juice.js");
    await loadScript("shared/game-mobile.js");
    await loadScript("shared/game-hooks.js");

    window.AcelyaLeaderboard?.mount(pageId);
    window.AcelyaMobile?.mount(pageId);

    window.AcelyaGame = {
      pageId,
      recordScore: (score, opts) => recordScore(pageId, score, opts),
      juice(canvas) {
        return window.AcelyaJuice?.create(canvas);
      },
    };
    window.dispatchEvent(new Event("acelya-game-ready"));
  }

  window.AcelyaGameKit = { GAME_PAGES, initGamePage };
})();
