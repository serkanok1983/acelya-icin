(() => {
  "use strict";

  const films = JSON.parse(document.getElementById("archive-films").textContent);
  const panel = document.getElementById("atolye");
  const filmSelect = document.getElementById("film-sec");
  const sceneSelect = document.getElementById("sahne-sec");
  const play = document.getElementById("sahneyi-oynat");
  const video = document.getElementById("arsiv-video");
  const status = document.getElementById("arsiv-durum");
  const placeholder = document.getElementById("arsiv-bekliyor");
  const range = document.getElementById("sahne-zamani");
  const archiveLink = document.getElementById("arsiv-kaydi");
  const copyLink = document.getElementById("arsiv-kopyasi");
  const rights = document.getElementById("arsiv-hak");
  const shotList = document.getElementById("plan-dizisi");
  const readouts = panel.querySelectorAll("[data-result]");
  const exercise = document.getElementById("sahne-sorusu");
  const params = new URLSearchParams(location.search);
  let film;
  let scene;
  let playingScene = null;

  const clock = (seconds) => {
    const whole = Math.floor(seconds);
    return Math.floor(whole / 60) + ":" + String(whole % 60).padStart(2, "0");
  };

  function seekStart() {
    if (video.readyState >= 1) video.currentTime = scene.start;
  }

  function showScene() {
    playingScene = null;
    video.pause();
    status.textContent = "";
    scene = film.scenes.find(({ id }) => id === sceneSelect.value);
    seekStart();
    range.textContent = clock(scene.start) + "–" + clock(scene.end);
    shotList.replaceChildren(...scene.shots.map((text) => {
      const item = document.createElement("li");
      item.textContent = text;
      return item;
    }));
    readouts.forEach((item, index) => { item.textContent = scene.readouts[index]; });
    exercise.open = false;
    exercise.querySelector("summary").textContent = scene.question;
    exercise.querySelector("p").textContent = scene.answer;
  }

  function showFilm(requestedScene) {
    video.pause();
    playingScene = null;
    if (video.hasAttribute("src")) {
      video.removeAttribute("src");
      video.load();
    }
    video.hidden = true;
    placeholder.hidden = false;
    film = films.find(({ id }) => id === filmSelect.value);
    video.setAttribute("aria-label", film.title);
    archiveLink.href = film.archive;
    copyLink.href = film.copy;
    rights.textContent = film.rights;
    sceneSelect.replaceChildren(...film.scenes.map(({ id, title, start }) =>
      new Option(clock(start) + " · " + title, id)));
    if (film.scenes.some(({ id }) => id === requestedScene)) sceneSelect.value = requestedScene;
    showScene();
  }

  function saveSelection() {
    const url = new URL(location.href);
    url.searchParams.set("film", film.id);
    url.searchParams.set("sahne", scene.id);
    history.replaceState(history.state, "", url.href);
  }

  function playbackError(message) {
    playingScene = null;
    video.hidden = true;
    placeholder.hidden = false;
    status.textContent = message;
  }

  play.addEventListener("click", async () => {
    const requested = scene;
    playingScene = requested;
    if (video.getAttribute("src") !== film.stream || video.error) video.src = film.stream;
    seekStart();
    video.hidden = false;
    placeholder.hidden = true;
    status.textContent = "Arşiv videosu yükleniyor.";
    try {
      await video.play();
      if (playingScene === requested) status.textContent = "";
    } catch (error) {
      if (playingScene !== requested) return;
      const message = error.name === "NotAllowedError"
        ? "Oynatıcıdaki düğmeyle videoyu başlat."
        : "Video açılamadı. Filmi arşiv kopyası bağlantısından izleyebilirsin.";
      if (error.name === "NotAllowedError") status.textContent = message;
      else playbackError(message);
    }
  });

  video.addEventListener("loadedmetadata", seekStart);
  video.addEventListener("timeupdate", () => {
    if (!playingScene || video.currentTime < playingScene.end) return;
    video.pause();
    playingScene = null;
    status.textContent = "Seçili sahne bitti.";
  });
  video.addEventListener("error", () => {
    if (video.hasAttribute("src")) playbackError("Video açılamadı. Filmi arşiv kopyası bağlantısından izleyebilirsin.");
  });
  filmSelect.addEventListener("change", () => {
    showFilm();
    saveSelection();
  });
  sceneSelect.addEventListener("change", () => {
    showScene();
    saveSelection();
  });
  panel.querySelector("form").addEventListener("submit", (event) => event.preventDefault());
  window.addEventListener("pagehide", () => video.pause());

  if (films.some(({ id }) => id === params.get("film"))) filmSelect.value = params.get("film");
  showFilm(params.get("sahne"));
})();
