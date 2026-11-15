/**
 * Açelya — mobil dokunmatik kontroller
 */
(function () {
  "use strict";

  const layouts = {
    tetris: {
      className: "layout-tetris",
      buttons: [
        { id: "left", label: "←", name: "Sola taşı", code: "ArrowLeft", repeat: true },
        { id: "down", label: "↓", name: "Hızlı düşür", code: "ArrowDown", repeat: true },
        { id: "right", label: "→", name: "Sağa taşı", code: "ArrowRight", repeat: true },
        { id: "rot", label: "↻", name: "Döndür", code: "ArrowUp" },
        { id: "drop", label: "⏬", name: "Anında düşür", code: "Space", span: 4 },
      ],
    },
    asteroids: {
      buttons: [
        { id: "left", label: "↺", name: "Sola dön", code: "ArrowLeft" },
        { id: "thrust", label: "↑", name: "Motor itişi", code: "ArrowUp" },
        { id: "right", label: "↻", name: "Sağa dön", code: "ArrowRight" },
        { id: "fire", label: "●", name: "Lazer ateşle", code: "Space", fire: true },
      ],
    },
    "gezegen-savunmasi": {
      buttons: [
        { id: "left", label: "←", name: "Sola nişan al", code: "ArrowLeft" },
        { id: "fire", label: "●", name: "Ateş et", code: "Space", fire: true },
        { id: "right", label: "→", name: "Sağa nişan al", code: "ArrowRight" },
      ],
    },
    pong: {
      buttons: [
        { id: "up", label: "▲", name: "Raketi yukarı taşı", code: "ArrowUp" },
        { id: "down", label: "▼", name: "Raketi aşağı taşı", code: "ArrowDown" },
      ],
    },
    snake: {
      className: "layout-dpad",
      buttons: [
        { id: "up", label: "▲", name: "Yukarı dön", code: "ArrowUp" },
        { id: "left", label: "←", name: "Sola dön", code: "ArrowLeft" },
        { id: "right", label: "→", name: "Sağa dön", code: "ArrowRight" },
        { id: "down", label: "▼", name: "Aşağı dön", code: "ArrowDown" },
      ],
    },
    breakout: {
      buttons: [
        { id: "left", label: "◀", name: "Raketi sola taşı", code: "ArrowLeft", repeat: true },
        { id: "right", label: "▶", name: "Raketi sağa taşı", code: "ArrowRight", repeat: true },
      ],
    },
  };

  function isCoarsePointer() {
    return window.matchMedia("(pointer: coarse)").matches || window.innerWidth < 768;
  }

  const KEY_CODES = {
    ArrowLeft: 37,
    ArrowUp: 38,
    ArrowRight: 39,
    ArrowDown: 40,
    Space: 32,
  };

  function dispatchKey(code, type) {
    const keyCode = KEY_CODES[code] || 0;
    document.dispatchEvent(
      new KeyboardEvent(type, {
        code,
        key: code === "Space" ? " " : code,
        keyCode,
        which: keyCode,
        bubbles: true,
        cancelable: true,
      })
    );
  }

  function mount(gameId) {
    const layout = layouts[gameId];
    if (!layout || document.getElementById("gameTouchBar")) return;

    const bar = document.createElement("div");
    bar.id = "gameTouchBar";
    bar.className = `game-touch-bar ${layout.className || ""}`.trim();
    bar.setAttribute("role", "group");
    bar.setAttribute("aria-label", "Dokunmatik oyun kontrolleri");

    const releaseHandlers = [];

    layout.buttons.forEach((b) => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.textContent = b.label;
      btn.dataset.code = b.code;
      btn.dataset.control = b.id;
      btn.setAttribute("aria-label", b.name);
      btn.title = b.name;
      if (b.fire) btn.classList.add("touch-fire");
      if (b.span) btn.style.gridColumn = `span ${b.span}`;

      let pressed = false;
      let repeatDelay = 0;
      let repeatTimer = 0;

      const clearRepeat = () => {
        clearTimeout(repeatDelay);
        clearInterval(repeatTimer);
        repeatDelay = 0;
        repeatTimer = 0;
      };
      const down = (e) => {
        e.preventDefault();
        if (pressed) return;
        pressed = true;
        if (e.pointerId != null) {
          try { btn.setPointerCapture(e.pointerId); } catch (_) {}
        }
        btn.classList.add("is-active");
        dispatchKey(b.code, "keydown");
        if (navigator.vibrate) navigator.vibrate(8);
        if (b.repeat) {
          repeatDelay = setTimeout(() => {
            repeatTimer = setInterval(() => dispatchKey(b.code, "keydown"), 85);
          }, 260);
        }
      };
      const up = (e) => {
        e?.preventDefault?.();
        if (!pressed) return;
        pressed = false;
        clearRepeat();
        btn.classList.remove("is-active");
        dispatchKey(b.code, "keyup");
      };
      btn.addEventListener("pointerdown", down);
      btn.addEventListener("pointerup", up);
      btn.addEventListener("pointercancel", up);
      btn.addEventListener("lostpointercapture", up);
      btn.addEventListener("click", (e) => {
        if (e.detail !== 0) return;
        dispatchKey(b.code, "keydown");
        dispatchKey(b.code, "keyup");
      });
      releaseHandlers.push(up);
      bar.appendChild(btn);
    });

    const stage = document.querySelector(".game-stage");
    if (stage && stage.parentNode) stage.parentNode.insertBefore(bar, stage.nextSibling);
    else document.body.appendChild(bar);

    const syncVisibility = () => {
      if (isCoarsePointer()) {
        bar.classList.add("is-visible");
        document.body.classList.add("game-has-touch");
      } else {
        bar.classList.remove("is-visible");
        document.body.classList.remove("game-has-touch");
      }
    };
    syncVisibility();
    window.addEventListener("resize", syncVisibility);
    window.addEventListener("blur", () => releaseHandlers.forEach((release) => release()));
    document.addEventListener("visibilitychange", () => {
      if (document.hidden) releaseHandlers.forEach((release) => release());
    });
  }

  window.AcelyaMobile = { mount, isCoarsePointer };
})();
