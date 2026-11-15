(() => {
  "use strict";

  const button = document.getElementById("sinema-ses");
  const status = document.getElementById("ses-durum");
  const knock = [[0, 120, 0.16, "triangle"], [0.36, 131, 0.15, "triangle"]];
  const motif = [[0, 392, 0.16], [0.22, 493.88, 0.17], [0.44, 440, 0.23]];
  const examples = {
    knock,
    motif,
    offscreen: knock.map(([time, ...note]) => [time + 0.25, ...note]),
    bridge: [[0, 164.81, 0.8], ...knock.map(([time, ...note]) => [time + 0.35, ...note])],
    leitmotif: [...motif, ...motif.map(([time, tone, length]) => [1.15 + time * 1.4, tone * 0.75, length * 1.4])],
    muffled: knock.map(([time, tone, length]) => [time, tone * 0.76, length, "sine"]),
  };

  let context;
  let choice;
  let revision = 0;
  let sources = [];
  let timer;

  function stop() {
    revision++;
    clearTimeout(timer);
    for (const oscillator of sources) oscillator.stop();
    sources = [];
    status.textContent = "";
  }

  async function play() {
    stop();
    const started = revision;
    try {
      const Audio = window.AudioContext || window.webkitAudioContext;
      context ??= new Audio();
      await context.resume();
      if (started !== revision) return;

      const start = context.currentTime + 0.025;
      const notes = examples[choice];
      for (const [time, frequency, length, type = "sine"] of notes) {
        const onset = start + time;
        const oscillator = context.createOscillator();
        const envelope = context.createGain();
        oscillator.type = type;
        oscillator.frequency.value = frequency;
        envelope.gain.setValueAtTime(0, onset);
        envelope.gain.linearRampToValueAtTime(choice === "muffled" ? 0.06 : 0.13, onset + 0.025);
        envelope.gain.exponentialRampToValueAtTime(0.001, onset + length);
        oscillator.connect(envelope).connect(context.destination);
        oscillator.start(onset);
        oscillator.stop(onset + length);
        oscillator.onended = () => {
          oscillator.disconnect();
          envelope.disconnect();
          sources = sources.filter((source) => source !== oscillator);
        };
        sources.push(oscillator);
      }
      status.textContent = "Ses örneği çalıyor.";
      const end = Math.max(...notes.map(([time, , length]) => time + length));
      timer = setTimeout(() => {
        status.textContent = "Ses örneği bitti.";
      }, 1000 * end + 50);
    } catch {
      if (started === revision) status.textContent = "Ses bu tarayıcıda başlatılamadı. Plan açıklamasını okuyabilirsin.";
    }
  }

  button.addEventListener("click", play);
  window.addEventListener("pagehide", stop);
  window.AcelyaCinemaAudio = Object.freeze({
    select(next) {
      if (next === choice) return;
      stop();
      choice = next;
    },
  });
})();
