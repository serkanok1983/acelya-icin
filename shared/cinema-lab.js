(() => {
  "use strict";

  const options = JSON.parse(document.getElementById("cinema-options").textContent);
  const storyboard = document.getElementById("plan-dizisi");
  const frame = document.getElementById("sahne-cercevesi");
  window.AcelyaLessonLab.mount({
    atolye({ choice }) {
      const { shots, readouts, effect } = options[choice];
      storyboard.replaceChildren(...shots.map((shot) => {
        const item = document.createElement("li");
        item.textContent = shot;
        return item;
      }));
      if (frame) frame.dataset.look = effect;
      if (window.AcelyaCinemaAudio) window.AcelyaCinemaAudio.select(effect);
      return { readouts };
    },
  });
})();
