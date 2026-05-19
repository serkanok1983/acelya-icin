/**
 * Açelya — parçacık, ekran sarsıntısı, skor patlaması
 */
(function () {
  "use strict";

  function create(canvas) {
    const stage = canvas.parentElement;
    if (stage && !stage.classList.contains("game-stage-juice")) {
      stage.classList.add("game-stage-juice");
    }

    const state = {
      particles: [],
      floats: [],
      shake: 0,
      shakeDecay: 0.86,
      flash: 0,
    };

    function burst(x, y, color = "#5eead4", count = 14, speed = 4) {
      for (let i = 0; i < count; i++) {
        const a = (Math.PI * 2 * i) / count + Math.random() * 0.4;
        const v = speed * (0.5 + Math.random());
        state.particles.push({
          x,
          y,
          vx: Math.cos(a) * v,
          vy: Math.sin(a) * v,
          life: 28 + Math.random() * 18,
          color,
          size: 2 + Math.random() * 3,
        });
      }
    }

    function popScore(x, y, text, color = "#fbbf24") {
      state.floats.push({ x, y, text, color, life: 48, vy: -1.2 });
    }

    function shakeScreen(amount = 6) {
      state.shake = Math.min(18, state.shake + amount);
    }

    function flashScreen(alpha = 0.25) {
      state.flash = Math.max(state.flash, alpha);
    }

    function update() {
      state.particles = state.particles.filter((p) => {
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.12;
        p.life -= 1;
        return p.life > 0;
      });
      state.floats = state.floats.filter((f) => {
        f.y += f.vy;
        f.life -= 1;
        return f.life > 0;
      });
      if (state.shake > 0.2) state.shake *= state.shakeDecay;
      else state.shake = 0;
      if (state.flash > 0) state.flash *= 0.88;
    }

    function applyTransform(ctx) {
      if (state.shake > 0.2) {
        const dx = (Math.random() - 0.5) * state.shake;
        const dy = (Math.random() - 0.5) * state.shake;
        ctx.translate(dx, dy);
      }
    }

    function draw(ctx, w, h) {
      if (state.flash > 0.02) {
        ctx.save();
        ctx.fillStyle = `rgba(255,255,255,${state.flash})`;
        ctx.fillRect(0, 0, w, h);
        ctx.restore();
      }
      for (const p of state.particles) {
        ctx.globalAlpha = Math.min(1, p.life / 30);
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
      for (const f of state.floats) {
        ctx.globalAlpha = Math.min(1, f.life / 40);
        ctx.fillStyle = f.color;
        ctx.font = "bold 18px system-ui, sans-serif";
        ctx.textAlign = "center";
        ctx.fillText(f.text, f.x, f.y);
      }
      ctx.globalAlpha = 1;
    }

    return { burst, popScore, shakeScreen, flashScreen, update, applyTransform, draw };
  }

  window.AcelyaJuice = { create };
})();
