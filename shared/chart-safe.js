/** Chart.js 3.x güvenli sarmalayıcı — hata olsa animasyon devam eder */
window.createSafeChart = function (canvasOrCtx, config) {
  if (typeof Chart === "undefined") {
    console.warn("Chart.js yüklenmedi");
    return null;
  }
  try {
    return new Chart(canvasOrCtx, config);
  } catch (e) {
    console.error("Chart oluşturulamadı:", e);
    return null;
  }
};
