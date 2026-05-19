/**
 * Açelya — mobil dokunmatik kontroller
 */
(function () {
  "use strict";

  const layouts = {
    tetris: {
      className: "layout-tetris",
      buttons: [
        { id: "left", label: "←", code: "ArrowLeft" },
        { id: "down", label: "↓", code: "ArrowDown" },
        { id: "right", label: "→", code: "ArrowRight" },
        { id: "rot", label: "↻", code: "ArrowUp" },
        { id: "drop", label: "⏬", code: "Space", span: 4 },
      ],
    },
    asteroids: {
      buttons: [
        { id: "left", label: "↺", code: "ArrowLeft" },
        { id: "thrust", label: "↑", code: "ArrowUp" },
        { id: "right", label: "↻", code: "ArrowRight" },
        { id: "fire", label: "🔫", code: "Space", fire: true },
      ],
    },
    "gezegen-savunmasi": {
      buttons: [
        { id: "left", label: "←", code: "ArrowLeft" },
        { id: "fire", label: "🔥", code: "Space", fire: true },
        { id: "right", label: "→", code: "ArrowRight" },
      ],
    },
    pong: {
      buttons: [
        { id: "up", label: "▲", code: "ArrowUp" },
        { id: "down", label: "▼", code: "ArrowDown" },
      ],
    },
    snake: {
      buttons: [
        { id: "up", label: "▲", code: "ArrowUp" },
        { id: "left", label: "←", code: "ArrowLeft" },
        { id: "right", label: "→", code: "ArrowRight" },
        { id: "down", label: "▼", code: "ArrowDown" },
      ],
    },
    breakout: {
      buttons: [
        { id: "left", label: "◀", code: "ArrowLeft" },
        { id: "right", label: "▶", code: "ArrowRight" },
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
    if (isCoarsePointer()) {
      bar.classList.add("is-visible");
      document.body.classList.add("game-has-touch");
    }

    layout.buttons.forEach((b) => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.textContent = b.label;
      btn.dataset.code = b.code;
      if (b.fire) btn.classList.add("touch-fire");
      if (b.span) btn.style.gridColumn = `span ${b.span}`;

      const down = (e) => {
        e.preventDefault();
        btn.classList.add("is-active");
        dispatchKey(b.code, "keydown");
      };
      const up = (e) => {
        e.preventDefault();
        btn.classList.remove("is-active");
        dispatchKey(b.code, "keyup");
      };
      btn.addEventListener("touchstart", down, { passive: false });
      btn.addEventListener("touchend", up, { passive: false });
      btn.addEventListener("touchcancel", up, { passive: false });
      btn.addEventListener("mousedown", down);
      btn.addEventListener("mouseup", up);
      btn.addEventListener("mouseleave", up);
      bar.appendChild(btn);
    });

    const stage = document.querySelector(".game-stage");
    if (stage && stage.parentNode) stage.parentNode.insertBefore(bar, stage.nextSibling);
    else document.body.appendChild(bar);

    window.addEventListener("resize", () => {
      if (isCoarsePointer()) {
        bar.classList.add("is-visible");
        document.body.classList.add("game-has-touch");
      }
    });
  }

  window.AcelyaMobile = { mount, isCoarsePointer };
})();
