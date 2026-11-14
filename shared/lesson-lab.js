(() => {
  "use strict";

  function format(value, digits = 2) {
    return new Intl.NumberFormat("tr", { maximumFractionDigits: digits, useGrouping: false })
      .format(Object.is(value, -0) ? 0 : value)
      .replace(/^-/u, "−")
      .replace(/\d{5,}/u, (whole) => whole.replace(/\B(?=(\d{3})+(?!\d))/g, "\u202f"));
  }

  function draw(canvas, chart) {
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    if (!width || !height) return;
    const scale = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = width * scale;
    canvas.height = height * scale;

    const ctx = canvas.getContext("2d");
    ctx.scale(scale, scale);
    const theme = getComputedStyle(canvas);
    const color = (token) => theme.getPropertyValue(token).trim();
    const colors = ["--accent", "--accent-2", "--accent-warm", "--danger", "--text"];
    const { labels, series, axis } = chart;
    const values = series.flatMap((s) => s.values).filter(Number.isFinite);
    const min = chart.min ?? Math.min(0, ...values);
    const max = Math.max(min + 1e-9, chart.max ?? (Math.max(0, ...values) || 1));
    const left = width < 360 ? 50 : 70;
    const right = width - 14;
    const top = 24;
    const bottom = height - 27;
    const x = (i) => left + (right - left) * i / Math.max(1, labels.length - 1);
    const y = (value) => bottom - (bottom - top) * (value - min) / (max - min);

    ctx.font = "12px system-ui";
    ctx.fillStyle = color("--text");
    ctx.fillText(axis, 10, 15);
    ctx.textAlign = "right";
    for (let tick = 0; tick <= 4; tick++) {
      const value = min + (max - min) * tick / 4;
      const row = y(value);
      ctx.strokeStyle = color("--border-hover");
      ctx.beginPath();
      ctx.moveTo(left, row);
      ctx.lineTo(right, row);
      ctx.stroke();
      ctx.fillStyle = color("--text-muted");
      const digits = Math.max(1, Math.min(6, 1 - Math.floor(Math.log10((max - min) / 4))));
      ctx.fillText(format(value, digits), left - 6, row + 4, left - 10);
    }

    ctx.textAlign = "center";
    const labelStep = Math.max(1, Math.ceil(labels.length / (width < 360 ? 4 : 7)));
    labels.forEach((label, i) => {
      if (label && (i === 0 || i === labels.length - 1 || (i % labelStep === 0 && i < labels.length - labelStep))) {
        ctx.fillText(label, x(i), height - 8, (right - left) / Math.min(labels.length, 4));
      }
    });

    series.forEach(({ values: line, dashed, tone, stepped }, index) => {
      ctx.strokeStyle = ctx.fillStyle = color(tone ?? colors[index]);
      ctx.lineWidth = 2;
      ctx.setLineDash(dashed ? [5, 5] : []);
      ctx.beginPath();
      let connected = false;
      line.forEach((value, i) => {
        if (!Number.isFinite(value)) {
          connected = false;
          return;
        }
        if (connected) {
          if (stepped) ctx.lineTo(x(i), y(line[i - 1]));
          ctx.lineTo(x(i), y(value));
        }
        else ctx.moveTo(x(i), y(value));
        connected = true;
      });
      ctx.stroke();
      ctx.setLineDash([]);
      if (line.length <= 60 && !dashed) {
        line.forEach((value, i) => {
          if (!Number.isFinite(value)) return;
          ctx.beginPath();
          ctx.arc(x(i), y(value), 2.8, 0, 2 * Math.PI);
          ctx.fill();
        });
      }
    });
  }

  function showRows(table, rows) {
    const body = table.tBodies[0];
    body.replaceChildren(...rows.map(([label, ...values]) => {
      const row = document.createElement("tr");
      const heading = document.createElement("th");
      heading.scope = "row";
      heading.textContent = label;
      row.append(heading);
      for (const value of values) row.insertCell().textContent = value;
      return row;
    }));
  }

  function mount(models) {
    const canvases = new Map();
    const redraw = () => canvases.forEach((chart, canvas) => draw(canvas, chart));
    const resize = new ResizeObserver(redraw);
    new MutationObserver(redraw).observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });

    for (const [id, view] of Object.entries(models)) {
      const panel = document.getElementById(id);
      const form = panel.querySelector("form");
      const canvas = panel.querySelector("canvas");
      const table = panel.querySelector("table");
      const readouts = panel.querySelectorAll("[data-result]");
      const settings = panel.querySelectorAll("[data-setting]");
      const refresh = () => {
        const inputs = Object.fromEntries(new FormData(form));
        settings.forEach((output) => {
          const value = format(Number(inputs[output.dataset.setting]));
          const label = output.dataset.unit === "%" ? `%\u00a0${value}` : `${value} ${output.dataset.unit}`.trim();
          output.textContent = label;
          form.elements.namedItem(output.dataset.setting).setAttribute("aria-valuetext", label);
        });
        const result = view(inputs);
        readouts.forEach((output, i) => { output.textContent = result.readouts[i]; });
        if (table) showRows(table, result.rows);
        if (canvas) {
          canvases.set(canvas, result.chart);
          draw(canvas, result.chart);
        }
      };

      form.addEventListener("submit", (event) => event.preventDefault());
      form.addEventListener("input", refresh);
      form.addEventListener("reset", () => requestAnimationFrame(refresh));
      if (canvas) resize.observe(canvas);
      refresh();
    }
  }

  window.AcelyaLessonLab = Object.freeze({ format, mount });
})();
