(() => {
  "use strict";

  const options = JSON.parse(document.getElementById("reading-options").textContent);
  const select = document.getElementById("yaklasim-sec");
  const passage = document.getElementById("okuma-metni");
  const example = document.querySelector("[data-reading-example]");
  const selection = new URLSearchParams(location.search).get("yaklasim");
  if (Object.hasOwn(options, selection)) select.value = selection;

  window.AcelyaLessonLab.mount({
    atolye({ lens }) {
      const [sample, ...readouts] = options[lens];
      passage.replaceChildren(...sample.split(/⟦([^⟧]+)⟧/g).map((part, index) => {
        if (index % 2 === 0) return document.createTextNode(part);
        const mark = document.createElement("mark");
        mark.textContent = part;
        return mark;
      }));
      if (example) example.hidden = example.dataset.readingExample !== lens;
      return { readouts };
    },
  });
})();
