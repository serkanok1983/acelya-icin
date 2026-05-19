/** Oyun sayfalarında juice + skor kaydı yardımcıları */
(function () {
  "use strict";

  function bindJuice(canvas) {
    let juice = null;
    const boot = () => {
      if (window.AcelyaGame && !juice) juice = AcelyaGame.juice(canvas);
    };
    window.addEventListener("acelya-game-ready", boot);
    boot();
    return {
      get: () => juice,
      burst(x, y, color, n) {
        juice?.burst(x, y, color, n);
      },
      pop(x, y, text, color) {
        juice?.popScore(x, y, text, color);
      },
      shake(n) {
        juice?.shakeScreen(n);
      },
      flash(a) {
        juice?.flashScreen(a);
      },
      update() {
        juice?.update();
      },
      draw(ctx, w, h) {
        juice?.draw(ctx, w, h);
      },
      wrapDraw(ctx, fn) {
        ctx.save();
        juice?.applyTransform(ctx);
        fn();
        ctx.restore();
        juice?.update();
        juice?.draw(ctx, w, h);
      },
    };
  }

  function recordScore(score, opts) {
    if (window.AcelyaGame) return AcelyaGame.recordScore(score, opts);
    const once = () => {
      if (window.AcelyaGame) {
        AcelyaGame.recordScore(score, opts);
        window.removeEventListener("acelya-game-ready", once);
      }
    };
    window.addEventListener("acelya-game-ready", once);
  }

  const noop = {
    get: () => null,
    burst() {},
    pop() {},
    shake() {},
    flash() {},
    update() {},
    draw() {},
  };

  window.AcelyaHooks = { bindJuice, recordScore, noop };
})();
