/**
 * Açelya — ortak kabuk: yıldızlar, ana sayfa, sesler, giriş rehberi
 */

/* Sesler — sayfa scriptlerinden önce kullanılabilir */
(function initSounds() {
  const SOUND_PREF_KEY = "acelya-sound-muted";
  const SOUND_FILES = {
    hit: "hit.m4a",
    explode: "explode.m4a",
    laser: "laser.m4a",
    thrust: "thrust.m4a",
  };
  const soundCache = {};
  let unlocked = false;
  let muted = false;
  try {
    muted = localStorage.getItem(SOUND_PREF_KEY) === "1";
  } catch (_) {
    // Depolama kapalıysa ses tercihi yalnız bu oturumda tutulur.
  }
  function getSound(name) {
    if (!SOUND_FILES[name]) return null;
    if (!soundCache[name]) {
      const a = new Audio(SOUND_FILES[name]);
      a.volume = name === "thrust" ? 0.35 : 0.55;
      soundCache[name] = a;
    }
    return soundCache[name];
  }
  window.AcelyaSounds = {
    play(name) {
      if (!unlocked || muted) return;
      const s = getSound(name);
      if (!s) return;
      try {
        s.currentTime = 0;
      } catch (_) {}
      s.play().catch(() => {
        const c = new Audio(SOUND_FILES[name]);
        c.volume = s.volume;
        c.play().catch(() => {});
      });
    },
    hit() {
      window.AcelyaSounds.play("hit");
    },
    explode() {
      window.AcelyaSounds.play("explode");
    },
    laser() {
      window.AcelyaSounds.play("laser");
    },
    thrust() {
      window.AcelyaSounds.play("thrust");
    },
    isMuted() {
      return muted;
    },
    setMuted(value) {
      muted = Boolean(value);
      Object.values(soundCache).forEach((sound) => {
        sound.muted = muted;
        if (muted) sound.pause();
      });
      try {
        localStorage.setItem(SOUND_PREF_KEY, muted ? "1" : "0");
      } catch (_) {
        // Tercihin saklanamaması ses kontrolünü engellememeli.
      }
      window.dispatchEvent(
        new CustomEvent("acelya-sound-change", { detail: { muted } }),
      );
      return muted;
    },
    toggleMuted() {
      return window.AcelyaSounds.setMuted(!muted);
    },
  };

  function unlockAudio() {
    unlocked = true;
    // Ses bağlamını açmak için sessizce dene — muted ile garantili sessiz
    Object.keys(SOUND_FILES).forEach((key) => {
      const s = getSound(key);
      if (!s) return;
      s.muted = true;
      s.play()
        .then(() => {
          s.pause();
          s.currentTime = 0;
          s.muted = muted;
          s.volume = key === "thrust" ? 0.35 : 0.55;
        })
        .catch(() => {
          s.muted = muted;
          s.volume = key === "thrust" ? 0.35 : 0.55;
        });
    });
    window.removeEventListener("pointerdown", unlockAudio);
    window.removeEventListener("keydown", unlockAudio);
    window.removeEventListener("touchstart", unlockAudio);
  }

  window.addEventListener("pointerdown", unlockAudio, { once: true });
  window.addEventListener("keydown", unlockAudio, { once: true });
  window.addEventListener("touchstart", unlockAudio, { once: true, passive: true });
})();

(function () {
  "use strict";

  let pageId = "";
  const GAME_IDS = new Set([
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
  const PauseState = { paused: false };

  (function installPauseAwareSchedulers() {
    if (window.AcelyaPause) return;
    const rawSetInterval = window.setInterval.bind(window);
    const rawSetTimeout = window.setTimeout.bind(window);
    const rawRaf = window.requestAnimationFrame.bind(window);

    window.setInterval = function wrappedSetInterval(fn, ms, ...args) {
      if (typeof fn !== "function") return rawSetInterval(fn, ms, ...args);
      return rawSetInterval(
        function intervalProxy(...inner) {
          if (PauseState.paused) return;
          fn(...inner);
        },
        ms,
        ...args,
      );
    };

    window.setTimeout = function wrappedSetTimeout(fn, ms, ...args) {
      if (typeof fn !== "function") return rawSetTimeout(fn, ms, ...args);
      return rawSetTimeout(
        function timeoutProxy(...inner) {
          if (PauseState.paused) {
            rawSetTimeout(timeoutProxy, 50, ...inner);
            return;
          }
          fn(...inner);
        },
        ms,
        ...args,
      );
    };

    window.requestAnimationFrame = function wrappedRaf(cb) {
      if (typeof cb !== "function") return rawRaf(cb);
      function rafProxy(ts) {
        if (PauseState.paused) {
          rawRaf(rafProxy);
          return;
        }
        cb(ts);
      }
      return rawRaf(rafProxy);
    };

    window.AcelyaPause = {
      isPaused() {
        return PauseState.paused;
      },
      setPaused(v) {
        PauseState.paused = !!v;
        if (PauseState.paused) {
          const keys = ["ArrowLeft", "ArrowUp", "ArrowRight", "ArrowDown", "Space"];
          keys.forEach((code) => {
            document.dispatchEvent(
              new KeyboardEvent("keyup", {
                code,
                key: code === "Space" ? " " : code,
                bubbles: true,
              }),
            );
          });
        }
        window.dispatchEvent(
          new CustomEvent("acelya-pause-change", {
            detail: { paused: PauseState.paused },
          }),
        );
      },
    };
  })();

  /* —— Sayfa rehberleri —— */
  function slugToTitle(slug) {
    return slug
      .replace(/\+/g, " & ")
      .replace(/-/g, " ")
      .replace(/\b\w/g, (c) => c.toUpperCase());
  }

  /* —— Yıldız arka planı —— */
  function initStars() {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (document.getElementById("starCanvas")) return;
    const canvas = document.createElement("canvas");
    canvas.id = "starCanvas";
    canvas.className = "app-stars";
    canvas.setAttribute("aria-hidden", "true");
    document.body.prepend(canvas);

    if (!document.querySelector(".app-aurora")) {
      const aurora = document.createElement("div");
      aurora.className = "app-aurora";
      aurora.setAttribute("aria-hidden", "true");
      document.body.prepend(aurora);
    }

    const ctx = canvas.getContext("2d");
    let stars = [];

    function sync() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }

    function seed() {
      stars = [];
      const n = Math.min(100, Math.floor((canvas.width * canvas.height) / 15000));
      for (let i = 0; i < n; i++) {
        stars.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          r: Math.random() * 1.3 + 0.2,
          sp: Math.random() * 0.3 + 0.06,
          a: Math.random() * 0.45 + 0.2,
        });
      }
    }

    function tick() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      stars.forEach((s) => {
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${s.a})`;
        ctx.fill();
        s.y += s.sp;
        if (s.y > canvas.height) {
          s.y = 0;
          s.x = Math.random() * canvas.width;
        }
      });
      requestAnimationFrame(tick);
    }

    sync();
    seed();
    tick();
    window.addEventListener("resize", () => {
      sync();
      seed();
    });
  }

  /* —— Tema —— */
  const THEME_KEY = "acelya-theme";

  function getSavedTheme() {
    return localStorage.getItem(THEME_KEY) || "dark";
  }

  function applyTheme(theme) {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem(THEME_KEY, theme);
    updateThemeIcon(theme);
  }

  function toggleTheme() {
    const current = document.documentElement.getAttribute("data-theme") || "dark";
    applyTheme(current === "dark" ? "light" : "dark");
  }

  function updateThemeIcon(theme) {
    const btn = document.getElementById("appThemeBtn");
    if (btn) btn.textContent = theme === "dark" ? "☀️" : "🌙";
  }

  function initTheme() {
    const saved = getSavedTheme();
    if (saved === "light") {
      document.documentElement.setAttribute("data-theme", "light");
    }
  }

  /* —— PWA —— */
  function initPWA() {
    // Manifest linki
    if (!document.querySelector("link[rel='manifest']")) {
      const manifest = document.createElement("link");
      manifest.rel = "manifest";
      manifest.href = "manifest.json";
      document.head.appendChild(manifest);
    }
    // Tema rengi
    if (!document.querySelector("meta[name='theme-color']")) {
      const tc = document.createElement("meta");
      tc.name = "theme-color";
      tc.content = "#06080f";
      document.head.appendChild(tc);
    }
    // Apple web app
    if (!document.querySelector("meta[name='apple-mobile-web-app-capable']")) {
      const apple = document.createElement("meta");
      apple.name = "apple-mobile-web-app-capable";
      apple.content = "yes";
      document.head.appendChild(apple);
    }
    // Service Worker
    if ("serviceWorker" in navigator && !navigator.serviceWorker.controller) {
      navigator.serviceWorker.register("sw.js").catch(function () {});
    }
  }

  /* —— Üst çubuk —— */
  function initTopbar() {
    if (document.querySelector(".app-topbar")) return;

    const currentTheme = getSavedTheme();
    const themeIcon = currentTheme === "dark" ? "☀️" : "🌙";
    const isGame = GAME_IDS.has(pageId);

    const title = document.title.split("|")[0].trim() || slugToTitle(pageId);
    const bar = document.createElement("header");
    bar.className = "app-topbar";
    bar.innerHTML = `
      <a class="app-home" href="index.html" aria-label="Ana sayfaya dön">← <span class="app-home-label">Ana sayfa</span></a>
      <span class="app-topbar-title">${title}</span>
      <div class="app-topbar-actions">
        ${isGame ? '<button type="button" class="app-btn-icon" id="appPauseBtn" title="Oyunu duraklat (P)" aria-label="Oyunu duraklat">⏯️</button>' : ""}
        ${isGame ? '<button type="button" class="app-btn-icon" id="appSoundBtn" title="Oyun sesini kapat" aria-label="Oyun sesini kapat">🔊</button>' : ""}
        <button type="button" class="app-btn-theme" id="appThemeBtn" title="Tema değiştir" aria-label="Temayı değiştir">${themeIcon}</button>
      </div>`;
    document.body.prepend(bar);

    if (isGame) {
      document.getElementById("appPauseBtn").addEventListener("click", togglePause);
      document.getElementById("appSoundBtn").addEventListener("click", () => {
        const muted = window.AcelyaSounds?.toggleMuted?.();
        updateSoundUI(Boolean(muted));
      });
      updateSoundUI(Boolean(window.AcelyaSounds?.isMuted?.()));
    }
    document.getElementById("appThemeBtn").addEventListener("click", toggleTheme);
  }

  /* ── Pause ── */
  let pauseDialogDismiss = null;

  function togglePause() {
    const paused = !window.AcelyaPause?.isPaused();
    window.AcelyaPause?.setPaused(paused);
    updatePauseUI(paused);
  }

  function updatePauseUI(paused) {
    const btn = document.getElementById("appPauseBtn");
    if (btn) {
      btn.textContent = paused ? "▶️" : "⏯️";
      btn.title = paused ? "Oyuna devam et (P)" : "Oyunu duraklat (P)";
      btn.setAttribute("aria-label", paused ? "Oyuna devam et" : "Oyunu duraklat");
      btn.setAttribute("aria-pressed", paused ? "true" : "false");
    }
    let overlay = document.getElementById("appPauseOverlay");
    if (paused) {
      if (!overlay) {
        overlay = document.createElement("div");
        overlay.id = "appPauseOverlay";
        overlay.className = "app-pause-overlay";
        overlay.innerHTML =
          '<div class="app-pause-card" role="dialog" aria-modal="true" aria-labelledby="appPauseTitle"><span class="app-pause-kicker">OYUN BEKLEMEDE</span><div class="app-pause-text" id="appPauseTitle">⏸ Duraklatıldı</div><div class="app-pause-hint">Hazır olduğunda kaldığın yerden devam et.</div><button type="button" class="app-btn-primary" id="appPauseResume">Devam et</button></div>';
        document.body.appendChild(overlay);
        document.getElementById("appPauseResume").addEventListener("click", togglePause);
      }
      overlay.classList.remove("hidden");
      if (!pauseDialogDismiss) {
        pauseDialogDismiss = activateAccessibleDialog(
          overlay,
          document.getElementById("appPauseResume"),
          () => {
            if (window.AcelyaPause?.isPaused()) {
              window.AcelyaPause.setPaused(false);
              updatePauseUI(false);
            }
          },
        );
      }
    } else {
      if (overlay) overlay.classList.add("hidden");
      if (pauseDialogDismiss) {
        const dismiss = pauseDialogDismiss;
        pauseDialogDismiss = null;
        dismiss("programmatic");
      }
    }
  }

  function updateSoundUI(muted) {
    const btn = document.getElementById("appSoundBtn");
    if (!btn) return;
    btn.textContent = muted ? "🔇" : "🔊";
    btn.title = muted ? "Oyun sesini aç" : "Oyun sesini kapat";
    btn.setAttribute("aria-label", muted ? "Oyun sesini aç" : "Oyun sesini kapat");
    btn.setAttribute("aria-pressed", muted ? "true" : "false");
  }

  // Klavye: P tuşu ile pause toggle (sadece oyun sayfalarında)
  document.addEventListener("keydown", (e) => {
    if (e.key === "p" || e.key === "P") {
      if (
        document.activeElement?.tagName === "INPUT" ||
        document.activeElement?.tagName === "TEXTAREA"
      )
        return;
      if (!GAME_IDS.has(pageId)) return;
      const blockingDialog = Array.from(
        document.querySelectorAll('[role="dialog"]'),
      ).some(
        (dialog) =>
          dialog.getClientRects().length > 0 &&
          !dialog.closest("#appPauseOverlay"),
      );
      if (blockingDialog) return;
      e.preventDefault();
      togglePause();
    }
  });

  // Gerçek zamanlı oyunlar arka planda akıp kullanıcıyı cezalandırmasın.
  document.addEventListener("visibilitychange", () => {
    if (!GAME_IDS.has(pageId) || document.visibilityState !== "hidden") return;
    if (window.AcelyaPause?.isPaused()) return;
    window.AcelyaPause?.setPaused(true);
    updatePauseUI(true);
  });

  function activateAccessibleDialog(overlay, initialFocus, onDismiss) {
    const dialog = overlay.querySelector('[role="dialog"]');
    if (!dialog) return () => {};

    const previousFocus =
      document.activeElement instanceof HTMLElement
        ? document.activeElement
        : null;
    const changedSiblings = Array.from(document.body.children).filter(
      (element) => element !== overlay && !element.inert,
    );
    const previousOverflow = document.body.style.overflow;
    let closed = false;

    dialog.setAttribute("aria-modal", "true");
    dialog.setAttribute("tabindex", "-1");
    changedSiblings.forEach((element) => {
      element.inert = true;
    });
    document.body.style.overflow = "hidden";

    const getFocusable = () =>
      Array.from(
        dialog.querySelectorAll(
          'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])',
        ),
      ).filter((element) => element instanceof HTMLElement);

    const dismiss = (reason = "action") => {
      if (closed) return;
      closed = true;
      overlay.removeEventListener("keydown", handleKeydown);
      changedSiblings.forEach((element) => {
        element.inert = false;
      });
      document.body.style.overflow = previousOverflow;
      onDismiss(reason);
      if (previousFocus?.isConnected) previousFocus.focus();
    };

    function handleKeydown(event) {
      if (event.key === "Escape") {
        event.preventDefault();
        dismiss("escape");
        return;
      }
      if (event.key !== "Tab") return;

      const focusable = getFocusable();
      if (!focusable.length) {
        event.preventDefault();
        dialog.focus();
        return;
      }
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (
        event.shiftKey &&
        (document.activeElement === first || !dialog.contains(document.activeElement))
      ) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }

    overlay.addEventListener("keydown", handleKeydown);
    queueMicrotask(() => {
      const target = initialFocus || getFocusable()[0] || dialog;
      target.focus();
    });
    return dismiss;
  }

  function ensureFavicon() {
    if (window.AcelyaIcons) {
      AcelyaIcons.ensureIcons();
      return;
    }
    const s = document.createElement("script");
    s.src = "shared/icons.js";
    s.onload = () => window.AcelyaIcons?.ensureIcons();
    document.head.appendChild(s);
  }

  function loadScriptOnce(src, onload) {
    if (document.querySelector(`script[src="${src}"]`)) {
      onload();
      return;
    }
    const s = document.createElement("script");
    s.src = src;
    s.onload = onload;
    document.head.appendChild(s);
  }

  function loadDigest() {
    loadScriptOnce("shared/digest.js", () => {
      window.AcelyaDigest?.init(pageId);
    });
  }

  function loadActivityTracker() {
    loadScriptOnce("shared/firebase-config.js", () => {
      loadScriptOnce("shared/activity.js", trackActivityVisit);
    });
  }

  function trackActivityVisit() {
    if (pageId === "bilgi") return;
    const u =
      window.AcelyaAuth?.getCurrentUser?.() ||
      sessionStorage.getItem("acelya-user") ||
      localStorage.getItem("acelya-user");
    if (u === "acelya" && window.AcelyaActivity) {
      const title = document.title.split("|")[0].trim();
      AcelyaActivity.logPageVisit(pageId, title);
    }
  }

  function loadGameKit() {
    const s = document.createElement("script");
    s.src = "shared/game-kit.js";
    s.onload = () => {
      if (window.AcelyaGameKit) AcelyaGameKit.initGamePage(pageId);
    };
    document.head.appendChild(s);
  }

  function isLoggedIn() {
    try {
      return (
        sessionStorage.getItem("loggedIn") === "true" ||
        localStorage.getItem("loggedIn") === "true"
      );
    } catch (_) {
      return true;
    }
  }

  function init() {
    const body = document.body;
    if (!body || body.dataset.page === "index") return;
    if (!isLoggedIn()) {
      // Giriş yapılmamışsa ana sayfadaki giriş kartına dön; hedef sayfa hatırlanır.
      const target = location.pathname.replace(/.*\//, "") + location.search + location.hash;
      try {
        sessionStorage.setItem("acelya-after-login", target);
      } catch (_) {}
      location.replace("index.html");
      return;
    }
    pageId =
      body.dataset.page ||
      location.pathname.replace(/.*\//, "").replace(/\.html$/, "");
    document.documentElement.classList.add("app-root");
    body.classList.add("app-page");
    initTheme();
    initPWA();
    ensureFavicon();
    initStars();
    initTopbar();
    loadDigest();
    loadActivityTracker();
    loadGameKit();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
