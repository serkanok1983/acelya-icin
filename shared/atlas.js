/**
 * Açelya Bilim Atlası — ilerleme, anlatım ve ortak quiz yardımcıları.
 * Tamamlanma verileri yalnızca bu tarayıcıda saklanır.
 */
(function () {
  "use strict";

  const PROGRESS_KEY = "acelya-atlas-progress-v1";
  let activeSpeechButton = null;
  let fallbackProgress = null;

  function readProgress() {
    if (fallbackProgress) return { ...fallbackProgress };
    try {
      const parsed = JSON.parse(localStorage.getItem(PROGRESS_KEY) || "{}");
      return parsed && typeof parsed === "object" ? parsed : {};
    } catch (_) {
      return {};
    }
  }

  function writeProgress(progress) {
    try {
      localStorage.setItem(PROGRESS_KEY, JSON.stringify(progress));
      fallbackProgress = null;
    } catch (_) {
      // Gizli gezinme, kota veya güvenlik ayarı depolamayı engellese bile
      // etkinlik bu sekmede çalışmaya devam etsin.
      fallbackProgress = { ...progress };
    }
    window.dispatchEvent(
      new CustomEvent("acelya-atlas-progress", { detail: progress }),
    );
  }

  function isComplete(id) {
    return Boolean(readProgress()[id]);
  }

  function setComplete(id, complete) {
    if (!id) return;
    const progress = readProgress();
    if (complete) {
      progress[id] = { completedAt: new Date().toISOString() };
    } else {
      delete progress[id];
    }
    writeProgress(progress);
    refreshCompletionButtons();
  }

  function toggleComplete(id) {
    setComplete(id, !isComplete(id));
  }

  function refreshCompletionButtons() {
    document.querySelectorAll("[data-mark-complete]").forEach((button) => {
      const id = button.dataset.markComplete;
      const complete = isComplete(id);
      button.setAttribute("aria-pressed", String(complete));
      button.classList.toggle("is-complete", complete);
      const onLabel = button.dataset.completeLabel || "Tamamlandı";
      const offLabel = button.dataset.incompleteLabel || "Tamamlandı işaretle";
      button.textContent = complete ? `✓ ${onLabel}` : offLabel;
    });
  }

  function cleanNarrationText(element) {
    if (!element) return "";
    const clone = element.cloneNode(true);
    clone
      .querySelectorAll(
        "button, a, input, select, textarea, canvas, .no-narration, [aria-hidden='true']",
      )
      .forEach((node) => node.remove());
    return clone.textContent.replace(/\s+/g, " ").trim();
  }

  function findTurkishVoice() {
    const voices = window.speechSynthesis?.getVoices?.() || [];
    return (
      voices.find((voice) => /^tr[-_]/i.test(voice.lang)) ||
      voices.find((voice) => /turk/i.test(`${voice.name} ${voice.lang}`)) ||
      null
    );
  }

  function updateNarrationStatus(message) {
    document
      .querySelectorAll("[data-narration-status]")
      .forEach((node) => (node.textContent = message));
  }

  function stopNarration() {
    if (!("speechSynthesis" in window)) return;
    window.speechSynthesis.cancel();
    if (activeSpeechButton) {
      activeSpeechButton.setAttribute("aria-pressed", "false");
      activeSpeechButton.textContent =
        activeSpeechButton.dataset.idleLabel || "Sesli anlat";
    }
    activeSpeechButton = null;
    updateNarrationStatus("Sesli anlatım durduruldu.");
  }

  function narrate(button) {
    if (!("speechSynthesis" in window)) {
      updateNarrationStatus(
        "Bu tarayıcı sesli anlatımı desteklemiyor. Metnin tamamı ekranda okunabilir.",
      );
      return;
    }

    if (activeSpeechButton === button && speechSynthesis.speaking) {
      stopNarration();
      return;
    }

    stopNarration();
    const target = document.querySelector(button.dataset.narrateTarget);
    const text = cleanNarrationText(target);
    if (!text) {
      updateNarrationStatus("Okunacak metin bulunamadı.");
      return;
    }

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "tr-TR";
    utterance.rate = 0.94;
    utterance.pitch = 1;
    const voice = findTurkishVoice();
    if (voice) utterance.voice = voice;

    activeSpeechButton = button;
    button.setAttribute("aria-pressed", "true");
    button.textContent = button.dataset.activeLabel || "Anlatımı durdur";
    updateNarrationStatus(
      voice
        ? `Sesli anlatım başladı: ${voice.name}.`
        : "Sesli anlatım başladı. Türkçe ses yoksa cihazın varsayılan sesi kullanılabilir.",
    );

    utterance.onend = () => {
      if (activeSpeechButton === button) {
        button.setAttribute("aria-pressed", "false");
        button.textContent = button.dataset.idleLabel || "Sesli anlat";
        activeSpeechButton = null;
        updateNarrationStatus("Sesli anlatım tamamlandı.");
      }
    };
    utterance.onerror = () => {
      if (activeSpeechButton === button) {
        button.setAttribute("aria-pressed", "false");
        button.textContent = button.dataset.idleLabel || "Sesli anlat";
        activeSpeechButton = null;
      }
      updateNarrationStatus(
        "Sesli anlatım başlatılamadı. Metnin tamamı ekranda okunabilir.",
      );
    };
    speechSynthesis.speak(utterance);
  }

  function bindNarration() {
    document.querySelectorAll("[data-narrate-target]").forEach((button) => {
      if (button.dataset.narrationBound) return;
      button.dataset.narrationBound = "1";
      button.setAttribute("aria-pressed", "false");
      button.addEventListener("click", () => narrate(button));
    });
  }

  function bindCompletion() {
    document.querySelectorAll("[data-mark-complete]").forEach((button) => {
      if (button.dataset.completionBound) return;
      button.dataset.completionBound = "1";
      button.addEventListener("click", () =>
        toggleComplete(button.dataset.markComplete),
      );
    });
    refreshCompletionButtons();
  }

  function gradeQuiz(root, options) {
    const quiz = typeof root === "string" ? document.querySelector(root) : root;
    if (!quiz) return { score: 0, total: 0, answered: 0 };

    const questions = [...quiz.querySelectorAll("[data-answer]")];
    let score = 0;
    let answered = 0;

    questions.forEach((question) => {
      const checked = question.querySelector("input:checked");
      question.classList.remove("is-correct", "is-wrong");
      if (!checked) return;
      answered += 1;
      const correct = checked.value === question.dataset.answer;
      if (correct) score += 1;
      question.classList.add(correct ? "is-correct" : "is-wrong");
      const feedback = question.querySelector(".quiz-feedback");
      if (feedback) {
        feedback.textContent = correct
          ? question.dataset.correctFeedback || "Doğru. Gerekçeyi de yakaladın."
          : question.dataset.wrongFeedback ||
            "Henüz değil. Açıklamayı okuyup yeniden düşün.";
      }
    });

    const result = { score, total: questions.length, answered };
    const summary = quiz.querySelector(".quiz-summary");
    if (summary) {
      if (answered < questions.length) {
        summary.textContent = `${questions.length - answered} soruyu daha yanıtlamalısın.`;
      } else {
        const message =
          score === questions.length
            ? "Tüm bağlantıları doğru kurdun."
            : score >= Math.ceil(questions.length * 0.7)
              ? "Temel fikirler yerinde; açıklamalardaki ayrıntıları gözden geçir."
              : "Bu bir ölçüm, not değil. Açıklamaları okuyup ikinci turu dene.";
        summary.textContent = `${score}/${questions.length} doğru. ${message}`;
      }
    }

    if (
      options?.completeId &&
      answered === questions.length &&
      score >= (options.passScore || Math.ceil(questions.length * 0.7))
    ) {
      setComplete(options.completeId, true);
    }
    return result;
  }

  function init() {
    bindNarration();
    bindCompletion();
  }

  window.AcelyaAtlas = {
    PROGRESS_KEY,
    readProgress,
    isComplete,
    setComplete,
    toggleComplete,
    refreshCompletionButtons,
    gradeQuiz,
    stopNarration,
  };

  window.addEventListener("beforeunload", stopNarration);
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
