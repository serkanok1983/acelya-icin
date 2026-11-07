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

  function mountFeedbackLayer() {
    if (!document.getElementById("acelyaGameLive")) {
      const live = document.createElement("div");
      live.id = "acelyaGameLive";
      live.className = "visually-hidden";
      live.setAttribute("role", "status");
      live.setAttribute("aria-live", "polite");
      live.setAttribute("aria-atomic", "true");
      document.body.appendChild(live);
    }
    if (!document.getElementById("acelyaGameToast")) {
      const toast = document.createElement("div");
      toast.id = "acelyaGameToast";
      toast.className = "acelya-game-toast";
      toast.setAttribute("aria-hidden", "true");
      document.body.appendChild(toast);
    }

    document.querySelectorAll(".game-stage canvas").forEach((canvas) => {
      if (!canvas.hasAttribute("tabindex")) canvas.tabIndex = 0;
      const label = canvas.getAttribute("aria-label") || "Oyun alanı";
      canvas.setAttribute(
        "aria-label",
        `${label}. Kontrolleri öğrenmek için üst çubuktaki bilgi düğmesini kullan.`,
      );
    });
  }

  let toastTimer = 0;
  function announce(message, visual = false) {
    const live = document.getElementById("acelyaGameLive");
    if (live) {
      live.textContent = "";
      requestAnimationFrame(() => { live.textContent = message; });
    }
    if (!visual) return;
    const toast = document.getElementById("acelyaGameToast");
    if (!toast) return;
    clearTimeout(toastTimer);
    toast.textContent = message;
    toast.classList.add("is-visible");
    toast.setAttribute("aria-hidden", "false");
    toastTimer = setTimeout(() => {
      toast.classList.remove("is-visible");
      toast.setAttribute("aria-hidden", "true");
    }, 2600);
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
      announce("Yeni kişisel rekor! Harika ilerleme.", true);
    }
    return improved;
  }

  async function initGamePage(pageId) {
    if (!GAME_PAGES.has(pageId)) return;

    loadCSS("shared/game-mobile.css");

    const modules = [
      "shared/auth.js",
      "shared/firebase-config.js",
      "shared/leaderboard.js",
      "shared/game-juice.js",
      "shared/game-mobile.js",
      "shared/game-hooks.js",
    ];
    for (const src of modules) {
      try {
        await loadScript(src);
      } catch (error) {
        console.warn(`Oyun yardımcı modülü yüklenemedi: ${src}`, error);
      }
    }

    window.AcelyaLeaderboard?.mount(pageId);
    window.AcelyaMobile?.mount(pageId);
    mountFeedbackLayer();

    window.AcelyaGame = {
      pageId,
      recordScore: (score, opts) => recordScore(pageId, score, opts),
      announce,
      isPaused() {
        return Boolean(window.AcelyaPause?.isPaused?.());
      },
      isSoundEnabled() {
        return !window.AcelyaSounds?.isMuted?.();
      },
      juice(canvas) {
        return window.AcelyaJuice?.create(canvas);
      },
    };
    window.dispatchEvent(new Event("acelya-game-ready"));
  }

  window.AcelyaGameKit = { GAME_PAGES, initGamePage };
})();
