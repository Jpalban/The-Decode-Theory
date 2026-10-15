(function () {
  // ---------- Settings ----------
  // Paste your scheduling link here (Calendly, Patreon, etc.). Leave blank to hide the button.
  const DISCOVERY_CALL_URL = '';

  const TOTAL_TYPES = 9;
  const MAX_RATING = 5;
  const MIN_RATING = 1;
  const CLOSE_MATCH_THRESHOLD = 3; // in weighted score points
  const STORAGE_KEY = 'enneagramAssessmentProgress';

  const ratingOptions = [
    { value: 1, text: 'Disagree' },
    { value: 2, text: 'Slightly Disagree' },
    { value: 3, text: 'Neutral' },
    { value: 4, text: 'Slightly Agree' },
    { value: 5, text: 'Agree' }
  ];

  const ui = {
    welcomeScreen: document.getElementById('enneagramWelcome'),
    assessmentScreen: document.getElementById('enneagramAssessment'),
    resultsScreen: document.getElementById('enneagramResults'),
    form: document.getElementById('enneagramForm'),
    startButton: document.getElementById('enneagramStart'),
    calculateButton: document.getElementById('enneagramCalculate'),
    retakeButton: document.getElementById('enneagramRetake'),
    printButton: document.getElementById('enneagramPrint'),
    validationMessage: document.getElementById('enneagramValidation'),
    progressBar: document.getElementById('enneagramProgressBar'),
    progressText: document.getElementById('progressText'),
    resultsContent: document.getElementById('resultsContent')
  };

  const totalQuestions = enneagramQuestions.length;
  // Give each question a stable id (its position in the question bank).
  enneagramQuestions.forEach((q, i) => { q.id = i; });

  // ---------- Helpers ----------
  function escapeHtml(value) {
    return String(value)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
  }

  function paragraphs(text) {
    return String(text).split(/\n\s*\n/).map(p => `<p>${escapeHtml(p.trim())}</p>`).join('');
  }

  function shuffle(arr) {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  // Shuffle within each section so sections stay together but the type pattern is hidden.
  function buildQuestionOrder() {
    const groups = [];
    enneagramQuestions.forEach(q => {
      let g = groups.find(x => x.name === q.group);
      if (!g) { g = { name: q.group, ids: [] }; groups.push(g); }
      g.ids.push(q.id);
    });
    return groups.flatMap(g => shuffle(g.ids));
  }

  // ---------- Saved progress ----------
  function loadSaved() {
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
      if (saved && Array.isArray(saved.order) && saved.order.length === totalQuestions) return saved;
    } catch (e) { /* storage unavailable or corrupt: start fresh */ }
    return null;
  }

  function saveProgress() {
    try {
      const answers = {};
      ui.form.querySelectorAll('input[type="radio"]:checked').forEach(input => {
        answers[input.name] = input.value;
      });
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ order: questionOrder, answers }));
    } catch (e) { /* ignore */ }
  }

  function clearSaved() {
    try { localStorage.removeItem(STORAGE_KEY); } catch (e) { /* ignore */ }
  }

  let saved = loadSaved();
  let questionOrder = saved ? saved.order : buildQuestionOrder();

  // ---------- Question rendering ----------
  function buildRatingOptions(id) {
    return ratingOptions.map(option => {
      const inputId = `q${id}_${option.value}`;
      return `
        <input type="radio" id="${inputId}" name="q${id}" value="${option.value}">
        <label for="${inputId}">
          <span class="number">${option.value}</span>
          ${escapeHtml(option.text)}
        </label>`;
    }).join('');
  }

  function generateQuestions() {
    let currentGroup = '';
    let html = '';
    questionOrder.forEach((id, position) => {
      const question = enneagramQuestions[id];
      if (question.group !== currentGroup) {
        currentGroup = question.group;
        html += `<h3 class="enneagram-section-title">${escapeHtml(currentGroup)}</h3>`;
      }
      html += `
        <div class="enneagram-question" data-question-id="${id}">
          <div class="enneagram-question-number">${position + 1}</div>
          <fieldset class="enneagram-question-fieldset">
            <legend class="enneagram-question-text">${escapeHtml(question.text)}</legend>
            <div class="enneagram-rating">${buildRatingOptions(id)}</div>
          </fieldset>
        </div>`;
    });
    ui.form.innerHTML = html;

    if (saved && saved.answers) {
      Object.entries(saved.answers).forEach(([name, value]) => {
        const input = ui.form.querySelector(`input[name="${name}"][value="${value}"]`);
        if (input) input.checked = true;
      });
    }
  }

  function getAnsweredCount() {
    return ui.form.querySelectorAll('input[type="radio"]:checked').length;
  }

  function updateProgress() {
    const answered = getAnsweredCount();
    ui.progressBar.style.width = `${(answered / totalQuestions) * 100}%`;
    ui.progressText.textContent = `${answered} of ${totalQuestions} completed`;
    if (ui.startButton) {
      ui.startButton.textContent = answered > 0 ? 'Continue Assessment' : 'Start Assessment';
    }
  }

  function onAnswerChange(event) {
    const block = event.target.closest('.enneagram-question');
    if (block) block.classList.remove('is-missing');
    updateProgress();
    saveProgress();
  }

  // ---------- Scoring ----------
  function buildEmptyScores() {
    return Object.fromEntries(Array.from({ length: TOTAL_TYPES }, (_, i) => [i + 1, 0]));
  }

  function getMaxWeightedScoreByType(type) {
    return enneagramQuestions
      .filter(q => q.type === Number(type))
      .reduce((sum, q) => sum + sectionWeights[q.group] * MAX_RATING, 0);
  }

  function getMinWeightedScoreByType(type) {
    return enneagramQuestions
      .filter(q => q.type === Number(type))
      .reduce((sum, q) => sum + sectionWeights[q.group] * MIN_RATING, 0);
  }

  // 0% = disagreed with every statement for this type, 100% = fully agreed with all of them.
  function toPercent(type, score) {
    const min = getMinWeightedScoreByType(type);
    const max = getMaxWeightedScoreByType(type);
    return max > min ? Math.round(((score - min) / (max - min)) * 100) : 0;
  }

  function markUnanswered() {
    const missing = [];
    ui.form.querySelectorAll('.enneagram-question').forEach(block => {
      const answered = block.querySelector('input[type="radio"]:checked');
      block.classList.toggle('is-missing', !answered);
      if (!answered) missing.push(block);
    });
    return missing;
  }

  function calculateResults() {
    const missing = markUnanswered();
    if (missing.length > 0) {
      const n = missing.length;
      ui.validationMessage.textContent =
        `${n} ${n === 1 ? 'question still needs' : 'questions still need'} an answer. ` +
        `${n === 1 ? 'It is' : 'They are'} highlighted in red.`;
      ui.validationMessage.classList.remove('enneagram-hidden');
      missing[0].scrollIntoView({ behavior: 'smooth', block: 'center' });
      return null;
    }

    ui.validationMessage.classList.add('enneagram-hidden');
    const scores = buildEmptyScores();
    new FormData(ui.form).forEach((value, key) => {
      const question = enneagramQuestions[Number(key.replace('q', ''))];
      scores[question.type] += Number(value) * sectionWeights[question.group];
    });
    return scores;
  }

  // ---------- Results ----------
  function getCloseMatchMessage(sorted) {
    const [first, second, third] = sorted;
    const gap12 = first.score - second.score;
    const gap23 = second.score - third.score;

    if (gap12 === 0) {
      return `Your scores for Type ${first.type} and Type ${second.type} are tied, so read both descriptions carefully and focus on your core motivation, not just your behavior.`;
    }
    if (gap12 <= CLOSE_MATCH_THRESHOLD && gap23 <= CLOSE_MATCH_THRESHOLD) {
      return `Your results are close between Types ${first.type}, ${second.type}, and ${third.type}. Read all three descriptions and focus on core motivation, not just behavior.`;
    }
    if (gap12 <= CLOSE_MATCH_THRESHOLD) {
      return `Your results are especially close between Type ${first.type} and Type ${second.type}, so it may help to read both descriptions carefully and focus on core motivation, not just behavior.`;
    }
    return `Your strongest pattern appears to be Type ${first.type}, with Types ${second.type} and ${third.type} also worth exploring.`;
  }

  function renderBreakdown(sorted) {
    return sorted.map(({ type, score }) => {
      const pct = toPercent(type, score);
      return `
        <div class="score-item">
          <div class="score-label">${escapeHtml(typeLabel(type))}</div>
          <div class="score-bar-container">
            <div class="enneagram-score-bar"><div class="enneagram-score-fill" style="width:${pct}%;"></div></div>
          </div>
          <div class="score-percentage">${pct}%</div>
        </div>`;
    }).join('');
  }

  function typeLabel(type) {
    const name = typeDescriptions[type].name;
    return name ? `Type ${type}: ${name}` : `Type ${type}`;
  }

  function renderSectionContent(section) {
    const list = section.items && section.items.length
      ? `<ul>${section.items.map(item => `<li>${escapeHtml(item)}</li>`).join('')}</ul>`
      : '';
    return (section.body ? paragraphs(section.body) : '') + list;
  }

  function renderTypeSections(info) {
    return (info.sections || []).map(section => `
      <div class="results-section">
        <h4>${escapeHtml(section.heading)}</h4>
        ${renderSectionContent(section)}
      </div>`).join('');
  }

  function renderReflection() {
    if (typeof reflectionQuestions === 'undefined' || !reflectionQuestions.length) return '';
    return `
      <div class="results-section">
        <h4>Reflection Questions</h4>
        <ul>${reflectionQuestions.map(q => `<li>${escapeHtml(q)}</li>`).join('')}</ul>
      </div>`;
  }

  function displayResults(scores) {
    // Sort by score; ties keep the lower type number first, and the tie message flags it.
    const sorted = Object.entries(scores)
      .map(([type, score]) => ({ type: Number(type), score }))
      .sort((a, b) => b.score - a.score || a.type - b.type);

    const primary = sorted[0];
    const info = typeDescriptions[primary.type];

    const chips = sorted.slice(0, 3).map((m, i) =>
      `<div class="results-chip">#${i + 1}: ${escapeHtml(typeLabel(m.type))} • ${toPercent(m.type, m.score)}%</div>`
    ).join('');

    const cta = DISCOVERY_CALL_URL ? `
      <div class="results-cta">
        <p>Want to confirm your type? Review these results with me on a Free Discovery Call.</p>
        <a class="enneagram-button cta" href="${escapeHtml(DISCOVERY_CALL_URL)}" target="_blank" rel="noopener">Schedule your Free Discovery Call</a>
      </div>` : '';

    ui.resultsContent.innerHTML = `
      <div class="results-primary-card">
        <h3 class="results-primary-title">Your primary type is likely ${escapeHtml(typeLabel(primary.type))}</h3>
        <p class="results-primary-subtitle">Your core patterns align most closely with this Enneagram type.</p>
        <div class="results-chip-row">${chips}</div>
      </div>

      <p class="results-welcome">${escapeHtml(typeWelcome)}</p>

      ${renderTypeSections(info)}

      ${renderReflection()}

      <div class="results-section">
        <h4>How to read these results</h4>
        <p>${escapeHtml(getCloseMatchMessage(sorted))}</p>
        <p>Scores weight core fears, desires, and internal patterns a little more heavily than behavior, since those usually reveal type more accurately. Each percentage shows how strongly you agreed with the statements for that type.</p>
      </div>

      <div class="results-summary-text">
        Remember, this is a starting point for self-discovery, not a final label. Your results show your most probable type based on your current self-perception. Explore it with curiosity, and pay close attention to the motivation underneath your behavior.
      </div>

      ${cta}

      <div class="results-breakdown">
        <h3>Full Score Breakdown</h3>
        ${renderBreakdown(sorted)}
      </div>`;

    ui.assessmentScreen.classList.add('enneagram-hidden');
    ui.resultsScreen.classList.remove('enneagram-hidden');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // ---------- Navigation ----------
  function startAssessment() {
    ui.welcomeScreen.classList.add('enneagram-hidden');
    ui.assessmentScreen.classList.remove('enneagram-hidden');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function retakeAssessment() {
    clearSaved();
    saved = null;
    questionOrder = buildQuestionOrder();
    ui.resultsScreen.classList.add('enneagram-hidden');
    ui.validationMessage.classList.add('enneagram-hidden');
    generateQuestions();
    updateProgress();
    ui.assessmentScreen.classList.remove('enneagram-hidden');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // ---------- Init ----------
  function init() {
    ui.startButton.addEventListener('click', startAssessment);
    ui.calculateButton.addEventListener('click', event => {
      event.preventDefault();
      const scores = calculateResults();
      if (scores) displayResults(scores);
    });
    ui.retakeButton.addEventListener('click', retakeAssessment);
    ui.printButton.addEventListener('click', () => window.print());
    ui.form.addEventListener('change', onAnswerChange);

    generateQuestions();
    updateProgress();
  }

  // Run once the page is ready, even if this script loads after DOMContentLoaded.
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
