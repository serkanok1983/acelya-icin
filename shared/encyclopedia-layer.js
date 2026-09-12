/**
 * Açelya'nın Yeri — erişilebilir araştırma defteri katmanı
 * Sayfa yerleşimini değiştirmeden, ortak bir modal çekmece olarak eklenir.
 */
(function exposeEncyclopediaLayer(root) {
  "use strict";

  const STORAGE_KEY = "acelya-encyclopedia-progress-v1";
  let mounted = null;
  let previousFocus = null;
  let previousOverflow = "";
  let previouslyPaused = false;
  let changedSiblings = [];

  function escapeHtml(value) {
    return String(value ?? "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  function readProgress() {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}") || {};
    } catch (_) {
      return {};
    }
  }

  function writeProgress(slug, patch) {
    try {
      const progress = readProgress();
      progress[slug] = {
        ...(progress[slug] || {}),
        ...patch,
        updatedAt: new Date().toISOString(),
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
    } catch (_) {
      // Depolama kapalıysa bilgi katmanı yine eksiksiz çalışır.
    }
  }

  function renderTabs(slug) {
    const tabs = [
      ["overview", "Bakış", "01"],
      ["concepts", "Kavramlar", "02"],
      ["inquiry", "Sorgula", "03"],
      ["continue", "Devam et", "04"],
    ];
    return tabs
      .map(
        ([id, label, number], index) => `
          <button
            class="encyclopedia-tab"
            type="button"
            role="tab"
            id="encyclopedia-tab-${id}-${escapeHtml(slug)}"
            aria-controls="encyclopedia-panel-${id}-${escapeHtml(slug)}"
            aria-selected="${index === 0 ? "true" : "false"}"
            tabindex="${index === 0 ? "0" : "-1"}"
            data-tab="${id}"
          ><span aria-hidden="true">${number}</span>${label}</button>`,
      )
      .join("");
  }

  function renderConcepts(model) {
    return model.concepts
      .map(
        (concept, index) => `
          <article class="encyclopedia-concept-card">
            <span class="encyclopedia-card-index" aria-hidden="true">K-${String(index + 1).padStart(2, "0")}</span>
            <h3>${escapeHtml(concept.term)}</h3>
            <p>${escapeHtml(concept.definition)}</p>
          </article>`,
      )
      .join("");
  }

  function renderGlossary(model) {
    return model.glossary
      .map(
        (entry) => `
          <div class="encyclopedia-glossary-entry">
            <dt>${escapeHtml(entry.term)}</dt>
            <dd>${escapeHtml(entry.definition)}</dd>
          </div>`,
      )
      .join("");
  }

  function renderDepth(model) {
    return model.depth
      .map(
        (item, index) => `
          <article class="encyclopedia-depth-card">
            <div class="encyclopedia-depth-mark" aria-hidden="true">
              <span>${String(index + 1).padStart(2, "0")}</span>
              <i></i>
            </div>
            <div>
              <small>${escapeHtml(item.label)}</small>
              <h3>${escapeHtml(item.heading)}</h3>
              <p>${escapeHtml(item.body)}</p>
            </div>
          </article>`,
      )
      .join("");
  }

  function renderEvidence(model) {
    if (!model.evidence) return "";
    const cards = [
      ["İDDİA", "Ne söylüyoruz?", model.evidence.claim],
      ["DAYANAK", "Neye dayanıyor?", model.evidence.evidence],
      ["SINIR", "Nerede dikkatli olmalı?", model.evidence.boundary],
    ];
    return `
      <div class="encyclopedia-section-label encyclopedia-section-label--secondary">
        <span>K</span><h3>İddia · dayanak · sınır</h3>
      </div>
      <div class="encyclopedia-evidence-grid">
        ${cards
          .map(
            ([label, heading, body]) => `
              <article>
                <span>${label}</span>
                <h3>${heading}</h3>
                <p>${escapeHtml(body)}</p>
              </article>`,
          )
          .join("")}
      </div>`;
  }

  function renderQuestions(model) {
    return model.questions
      .map(
        (question, index) => `
          <li>
            <span aria-hidden="true">${String(index + 1).padStart(2, "0")}</span>
            <p>${escapeHtml(question)}</p>
          </li>`,
      )
      .join("");
  }

  function renderSteps(steps) {
    return steps
      .map(
        (step, index) => `
          <li>
            <span aria-hidden="true">${index + 1}</span>
            <p>${escapeHtml(step)}</p>
          </li>`,
      )
      .join("");
  }

  function renderQuiz(model) {
    return model.quiz
      .map(
        (question, questionIndex) => `
          <fieldset class="encyclopedia-question" data-question="${questionIndex}">
            <legend><span>${questionIndex + 1}</span>${escapeHtml(question.question)}</legend>
            <div class="encyclopedia-options">
              ${question.options
                .map(
                  (option, optionIndex) => `
                    <label class="encyclopedia-option">
                      <input
                        type="radio"
                        name="encyclopedia-${escapeHtml(model.slug)}-q${questionIndex}"
                        value="${optionIndex}"
                      />
                      <span class="encyclopedia-option-marker" aria-hidden="true"></span>
                      <span>${escapeHtml(option)}</span>
                    </label>`,
                )
                .join("")}
            </div>
            <p class="encyclopedia-explanation" hidden>${escapeHtml(question.explanation)}</p>
          </fieldset>`,
      )
      .join("");
  }

  function renderRelated(model) {
    return model.related
      .map(
        (item, index) => `
          <a class="encyclopedia-related-card" href="${escapeHtml(item.href)}">
            <span aria-hidden="true">${String(index + 1).padStart(2, "0")}</span>
            <strong>${escapeHtml(item.title)}</strong>
            <small>Aynı kavram ailesinde yeni bir bağlantı</small>
          </a>`,
      )
      .join("");
  }

  function renderSources(model) {
    if (!model.sources.length) {
      return `
        <p class="encyclopedia-source-note">
          Bu oyun sayfasında amaç, kuralı deneyerek strateji kurmaktır. Bilimsel konu bağlantıları için ilgili sayfalara ilerleyebilirsin.
        </p>`;
    }
    return `
      <ul class="encyclopedia-sources">
        ${model.sources
          .map(
            (source) => `
              <li>
                <a href="${escapeHtml(source.url)}" target="_blank" rel="noopener noreferrer">
                  ${escapeHtml(source.label)}<span aria-hidden="true"> ↗</span>
                </a>
              </li>`,
          )
          .join("")}
      </ul>`;
  }

  function render(model) {
    const overlay = document.createElement("div");
    overlay.id = "appEncyclopediaOverlay";
    overlay.className = "encyclopedia-overlay";
    overlay.hidden = true;
    overlay.setAttribute("aria-hidden", "true");
    overlay.style.setProperty("--encyclopedia-accent", model.accent);
    overlay.innerHTML = `
      <button class="encyclopedia-backdrop" type="button" data-encyclopedia-close tabindex="-1" aria-label="Araştırma defterini kapat"></button>
      <section
        class="encyclopedia-sheet"
        role="dialog"
        aria-modal="true"
        aria-labelledby="encyclopedia-title"
        aria-describedby="encyclopedia-description"
      >
        <header class="encyclopedia-header">
          <div class="encyclopedia-binding" aria-hidden="true"></div>
          <div class="encyclopedia-heading-copy">
            <p class="encyclopedia-kicker">
              <span>${escapeHtml(model.code)} / NOT-${escapeHtml(model.slug.slice(0, 3).toLocaleUpperCase("tr-TR"))}</span>
              Araştırma defteri
              ${model.enriched ? '<strong class="encyclopedia-depth-badge">KONUYA ÖZGÜ</strong>' : ""}
            </p>
            <h2 id="encyclopedia-title">${escapeHtml(model.title)}</h2>
            <p id="encyclopedia-description" class="encyclopedia-field">
              <span aria-hidden="true">${escapeHtml(model.icon)}</span>${escapeHtml(model.field)}
            </p>
          </div>
          <button class="encyclopedia-close" type="button" data-encyclopedia-close aria-label="Araştırma defterini kapat">
            <span aria-hidden="true">×</span>
          </button>
        </header>

        <div class="encyclopedia-tabs" role="tablist" aria-label="Araştırma defteri bölümleri">
          ${renderTabs(model.slug)}
        </div>

        <div class="encyclopedia-content">
          <section
            class="encyclopedia-panel is-active"
            id="encyclopedia-panel-overview-${escapeHtml(model.slug)}"
            role="tabpanel"
            aria-labelledby="encyclopedia-tab-overview-${escapeHtml(model.slug)}"
            data-panel="overview"
          >
            <div class="encyclopedia-section-label"><span>01</span><h3>Kısa bağlam</h3></div>
            <div class="encyclopedia-context"><span class="encyclopedia-context-label" aria-hidden="true">GÖZLEM</span>${model.contextHtml}</div>
            <div class="encyclopedia-learning-route" aria-label="Öğrenme rotası">
              <article>
                <span class="encyclopedia-route-icon" aria-hidden="true">◎</span>
                <div>
                  <h3>Bu sayfada ne kazanacaksın?</h3>
                  <p>${escapeHtml(model.objective)}</p>
                </div>
              </article>
              <article>
                <span class="encyclopedia-route-icon" aria-hidden="true">↳</span>
                <div>
                  <h3>Başlamadan önce</h3>
                  <p>${escapeHtml(model.prerequisite)}</p>
                </div>
              </article>
            </div>
            <div class="encyclopedia-section-label encyclopedia-section-label--secondary"><span>↗</span><h3>Derinleşme merdiveni</h3></div>
            <div class="encyclopedia-depth-path">${renderDepth(model)}</div>
            <p class="encyclopedia-depth-note"><strong>Bilimsel düşünme notu:</strong> ${escapeHtml(model.depthNote)}</p>
            <div class="encyclopedia-observation-grid">
              <article>
                <span class="encyclopedia-stamp" aria-hidden="true">NEDEN?</span>
                <h3>Neden önemli?</h3>
                <p>${escapeHtml(model.why)}</p>
              </article>
              <article>
                <span class="encyclopedia-stamp" aria-hidden="true">SAHADA</span>
                <h3>Gerçek yaşam bağlantısı</h3>
                <p>${escapeHtml(model.realWorld)}</p>
              </article>
            </div>
          </section>

          <section
            class="encyclopedia-panel"
            id="encyclopedia-panel-concepts-${escapeHtml(model.slug)}"
            role="tabpanel"
            aria-labelledby="encyclopedia-tab-concepts-${escapeHtml(model.slug)}"
            data-panel="concepts"
            hidden
          >
            <div class="encyclopedia-section-label"><span>02</span><h3>Temel kavramlar</h3></div>
            <div class="encyclopedia-concept-grid">${renderConcepts(model)}</div>
            ${renderEvidence(model)}
            <div class="encyclopedia-section-label encyclopedia-section-label--secondary"><span>Ç</span><h3>Çözümlü düşünme örneği</h3></div>
            <article class="encyclopedia-worked-example">
              <header>
                <span aria-hidden="true">ÇÖZÜM DEFTERİ</span>
                <h3>${escapeHtml(model.example.title)}</h3>
                <p>${escapeHtml(model.example.prompt)}</p>
              </header>
              <ol>${renderSteps(model.example.steps)}</ol>
              <p class="encyclopedia-example-result"><strong>Sonuç:</strong> ${escapeHtml(model.example.result)}</p>
            </article>
            <div class="encyclopedia-reasoning-grid">
              <article class="encyclopedia-misconception">
                <span aria-hidden="true">DİKKAT</span>
                <h3>Sık görülen yanılgı</h3>
                <p>“${escapeHtml(model.misconception[0])}”</p>
                <small>Bu ifadeyi sayfadaki kanıt ve koşullarla yeniden değerlendir.</small>
              </article>
              <article class="encyclopedia-model-limit">
                <span aria-hidden="true">MODEL SINIRI</span>
                <h3>Görsel neyi göstermiyor?</h3>
                <p>${escapeHtml(model.modelLimit)}</p>
              </article>
            </div>
            <div class="encyclopedia-section-label encyclopedia-section-label--secondary"><span>G</span><h3>Kısa sözlük</h3></div>
            <dl class="encyclopedia-glossary">${renderGlossary(model)}</dl>
          </section>

          <section
            class="encyclopedia-panel"
            id="encyclopedia-panel-inquiry-${escapeHtml(model.slug)}"
            role="tabpanel"
            aria-labelledby="encyclopedia-tab-inquiry-${escapeHtml(model.slug)}"
            data-panel="inquiry"
            hidden
          >
            <div class="encyclopedia-section-label"><span>03</span><h3>Merak soruları</h3></div>
            <ol class="encyclopedia-inquiry-list">${renderQuestions(model)}</ol>
            <div class="encyclopedia-section-label encyclopedia-section-label--secondary"><span>D</span><h3>Yönlendirilmiş deney</h3></div>
            <article class="encyclopedia-experiment">
              <header>
                <span aria-hidden="true">TAHMİN → DENE → AÇIKLA</span>
                <h3>${escapeHtml(model.experiment.question)}</h3>
              </header>
              <ol>${renderSteps(model.experiment.steps)}</ol>
              <p class="encyclopedia-observe"><strong>Gözlem odağı:</strong> ${escapeHtml(model.experiment.observe)}</p>
            </article>
            <div class="encyclopedia-section-label encyclopedia-section-label--secondary"><span>?</span><h3>Mini bilgi kontrolü</h3></div>
            <form class="encyclopedia-quiz" novalidate>
              ${renderQuiz(model)}
              <div class="encyclopedia-quiz-actions">
                <button class="encyclopedia-check" type="submit">Yanıtları değerlendir</button>
                <p class="encyclopedia-quiz-result" role="status" aria-live="polite"></p>
              </div>
            </form>
          </section>

          <section
            class="encyclopedia-panel"
            id="encyclopedia-panel-continue-${escapeHtml(model.slug)}"
            role="tabpanel"
            aria-labelledby="encyclopedia-tab-continue-${escapeHtml(model.slug)}"
            data-panel="continue"
            hidden
          >
            <div class="encyclopedia-section-label"><span>04</span><h3>İlgili konular</h3></div>
            <div class="encyclopedia-related-grid">${renderRelated(model)}</div>
            <div class="encyclopedia-section-label encyclopedia-section-label--secondary"><span>K</span><h3>Güvenilir başvuru kaynakları</h3></div>
            ${renderSources(model)}
            <footer class="encyclopedia-revision">
              <span>NOT DEFTERİ / ${escapeHtml(model.code)}</span>
              <span>İçerik katmanı gözden geçirme: ${escapeHtml(model.revision)}</span>
            </footer>
          </section>
        </div>
      </section>`;
    return overlay;
  }

  function activateTab(tab, focus = false) {
    if (!mounted) return;
    const tabs = Array.from(mounted.overlay.querySelectorAll('[role="tab"]'));
    const panels = Array.from(mounted.overlay.querySelectorAll('[role="tabpanel"]'));
    const selected = typeof tab === "string" ? tabs.find((item) => item.dataset.tab === tab) : tab;
    if (!selected) return;
    tabs.forEach((item) => {
      const active = item === selected;
      item.setAttribute("aria-selected", String(active));
      item.tabIndex = active ? 0 : -1;
    });
    panels.forEach((panel) => {
      const active = panel.dataset.panel === selected.dataset.tab;
      panel.hidden = !active;
      panel.classList.toggle("is-active", active);
    });
    if (focus) selected.focus();
  }

  function handleTabKeys(event) {
    if (!event.target.matches('[role="tab"]')) return;
    const tabs = Array.from(mounted.overlay.querySelectorAll('[role="tab"]'));
    const current = tabs.indexOf(event.target);
    let next = null;
    if (event.key === "ArrowRight" || event.key === "ArrowDown") next = (current + 1) % tabs.length;
    if (event.key === "ArrowLeft" || event.key === "ArrowUp") next = (current - 1 + tabs.length) % tabs.length;
    if (event.key === "Home") next = 0;
    if (event.key === "End") next = tabs.length - 1;
    if (next === null) return;
    event.preventDefault();
    activateTab(tabs[next], true);
  }

  function focusableElements() {
    if (!mounted) return [];
    return Array.from(
      mounted.overlay.querySelectorAll(
        'a[href], button:not([disabled]):not([tabindex="-1"]), input:not([disabled]), [tabindex]:not([tabindex="-1"])',
      ),
    ).filter((element) => !element.closest("[hidden]") && !element.hidden);
  }

  function handleDialogKeys(event) {
    if (!mounted || mounted.overlay.hidden) return;
    if (event.key === "Escape") {
      event.preventDefault();
      close();
      return;
    }
    if (event.key !== "Tab") return;
    const focusable = focusableElements();
    if (!focusable.length) return;
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  }

  function gradeQuiz(event) {
    event.preventDefault();
    if (!mounted) return;
    const fieldsets = Array.from(mounted.overlay.querySelectorAll(".encyclopedia-question"));
    const result = mounted.overlay.querySelector(".encyclopedia-quiz-result");
    const selections = fieldsets.map((fieldset) => fieldset.querySelector('input[type="radio"]:checked'));
    if (selections.some((selection) => !selection)) {
      result.textContent = "İki soruyu da yanıtladıktan sonra değerlendirebilirsin.";
      selections.find((selection) => !selection)?.closest("fieldset")?.querySelector("input")?.focus();
      return;
    }

    let score = 0;
    fieldsets.forEach((fieldset, questionIndex) => {
      const answer = mounted.model.quiz[questionIndex].answer;
      const selected = Number(selections[questionIndex].value);
      if (selected === answer) score += 1;
      fieldset.querySelectorAll(".encyclopedia-option").forEach((option, optionIndex) => {
        option.classList.toggle("is-correct", optionIndex === answer);
        option.classList.toggle("is-wrong", optionIndex === selected && selected !== answer);
      });
      const explanation = fieldset.querySelector(".encyclopedia-explanation");
      explanation.hidden = false;
      explanation.dataset.result = selected === answer ? "correct" : "incorrect";
    });

    const messages = [
      "Sorulara yeniden dön; kavram kartları iyi bir ipucu verecek.",
      "Bir bağlantı tamam. Açıklamaları okuyup ikinci fikri de sağlamlaştır.",
      "İki bağlantı da tamam — konuyu kanıtla açıklamaya hazırsın.",
    ];
    result.textContent = `${score}/2 doğru. ${messages[score]}`;
    writeProgress(mounted.model.slug, { opened: true, quizScore: score, completed: score === 2 });
    updateTriggerState();
  }

  function updateTriggerState() {
    if (!mounted?.trigger) return;
    const progress = readProgress()[mounted.model.slug];
    mounted.trigger.classList.toggle("has-notebook-progress", Boolean(progress?.opened));
    mounted.trigger.classList.toggle("has-notebook-complete", Boolean(progress?.completed));
    mounted.trigger.title = progress?.completed
      ? "Araştırma defteri · Bilgi kontrolü tamamlandı"
      : "Araştırma defterini aç";
  }

  function open(tab = "overview") {
    if (!mounted || !mounted.overlay.hidden) return;
    previousFocus = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    previousOverflow = document.body.style.overflow;
    previouslyPaused = Boolean(root.AcelyaPause?.isPaused?.());
    changedSiblings = Array.from(document.body.children).filter(
      (element) => element !== mounted.overlay && !element.inert,
    );
    changedSiblings.forEach((element) => {
      element.inert = true;
    });
    document.body.style.overflow = "hidden";
    root.AcelyaPause?.setPaused?.(true);
    mounted.overlay.hidden = false;
    mounted.overlay.removeAttribute("aria-hidden");
    mounted.overlay.dataset.state = "open";
    activateTab(tab);
    writeProgress(mounted.model.slug, { opened: true });
    updateTriggerState();
    requestAnimationFrame(() => mounted.overlay.querySelector(".encyclopedia-close")?.focus());
  }

  function close() {
    if (!mounted || mounted.overlay.hidden) return;
    mounted.overlay.dataset.state = "closing";
    const finish = () => {
      if (!mounted) return;
      mounted.overlay.hidden = true;
      mounted.overlay.setAttribute("aria-hidden", "true");
      mounted.overlay.dataset.state = "closed";
      changedSiblings.forEach((element) => {
        element.inert = false;
      });
      changedSiblings = [];
      document.body.style.overflow = previousOverflow;
      root.AcelyaPause?.setPaused?.(previouslyPaused);
      if (previousFocus?.isConnected) previousFocus.focus();
    };
    // AcelyaPause sayfa zamanlayıcılarını bilinçli olarak durdurur; bu
    // nedenle kapanışı setTimeout'a bağlamak çekmeceyi kilitleyebilirdi.
    finish();
  }

  function bind(overlay) {
    overlay.querySelectorAll("[data-encyclopedia-close]").forEach((button) =>
      button.addEventListener("click", close),
    );
    overlay.querySelectorAll('[role="tab"]').forEach((tab) => {
      tab.addEventListener("click", () => activateTab(tab));
      tab.addEventListener("keydown", handleTabKeys);
    });
    overlay.querySelector(".encyclopedia-quiz")?.addEventListener("submit", gradeQuiz);
    document.addEventListener("keydown", handleDialogKeys);
  }

  function mount({ pageId, info, allInfo, trigger }) {
    if (!root.AcelyaEncyclopediaData || !pageId || mounted) return false;
    const model = root.AcelyaEncyclopediaData.resolve(pageId, info, allInfo);
    const overlay = render(model);
    document.body.appendChild(overlay);
    mounted = { model, overlay, trigger };
    bind(overlay);

    if (trigger) {
      trigger.textContent = "📓";
      trigger.setAttribute("aria-label", "Araştırma defterini aç");
      trigger.setAttribute("aria-haspopup", "dialog");
      trigger.setAttribute("aria-controls", overlay.id);
      trigger.title = "Araştırma defterini aç";
      trigger.dataset.encyclopediaReady = "true";
      updateTriggerState();
    }
    return true;
  }

  root.AcelyaEncyclopedia = { mount, open, close };
})(window);
