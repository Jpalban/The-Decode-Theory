(function () {
  // ---------- Settings ----------
  // Link for step 1 of the Next Steps box (your Patreon page).
  const PATREON_URL = 'https://www.patreon.com/cw/TheNautilusCompany';
  // Link for step 2 (your scheduling page). Leave blank to show the text without a link.
  const ASSESSMENT_CALL_URL = 'https://calendar.google.com/calendar/u/0/appointments/schedules/AcZssZ1Q8WMa4uzJ5sTAofww3etFva5Jb6vTcMZRxZrLmrrdmSxIeHg5iJlc4mOTGQ2Ltbje7PGIafsf';

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

  function linkOrText(url, text) {
    return url
      ? `<a href="${escapeHtml(url)}" target="_blank" rel="noopener">${escapeHtml(text)}</a>`
      : escapeHtml(text);
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

    const nextStepBoxes = `
      <div class="next-steps-group">
        <div class="next-steps">
          <h3>Ready for the next step?</h3>
          <p class="next-steps-link">${linkOrText(PATREON_URL, 'Click here for your Free Intro Video to The Decode Theory!')}</p>
        </div>
        <div class="next-steps">
          <h3>Doesn't feel like the correct results?</h3>
          <p class="next-steps-link">${linkOrText(ASSESSMENT_CALL_URL, 'Click here for your Free Assessment Call to Find your Type!')}</p>
        </div>
      </div>`;

    ui.resultsContent.innerHTML = `
      <div class="results-primary-card">
        <h3 class="results-primary-title">Your primary type is likely ${escapeHtml(typeLabel(primary.type))}</h3>
        <p class="results-primary-subtitle">Your core patterns align most closely with this Enneagram type.</p>
        <div class="results-chip-row">${chips}</div>
      </div>

      ${nextStepBoxes}

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


      <div class="results-breakdown">
        <h3>Full Score Breakdown</h3>
        ${renderBreakdown(sorted)}
      </div>`;

    ui.assessmentScreen.classList.add('enneagram-hidden');
    ui.resultsScreen.classList.remove('enneagram-hidden');
    window.scrollTo({ top: 0, behavior: 'smooth' });
    launchConfetti();
  }

  // ---------- Confetti ----------
  let confettiRunning = false;

  function launchConfetti() {
    if (confettiRunning) return;
    // Respect people who have asked their device to reduce motion.
    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    confettiRunning = true;

    const canvas = document.createElement('canvas');
    canvas.setAttribute('aria-hidden', 'true');
    canvas.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;pointer-events:none;z-index:2000;';
    document.body.appendChild(canvas);
    const ctx = canvas.getContext('2d');
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let w = 0;
    let h = 0;

    function resize() {
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
    resize();
    window.addEventListener('resize', resize);

    const colors = ['#2563EB', '#1E3A8A', '#60A5FA', '#F59E0B', '#EC4899', '#10B981', '#8B5CF6'];
    const count = w < 600 ? 90 : 170;
    const pieces = Array.from({ length: count }, () => ({
      x: Math.random() * w,
      y: -20 - Math.random() * h * 0.6,       // start above the screen, staggered
      size: 6 + Math.random() * 7,
      vy: 2 + Math.random() * 3,              // fall speed (px per 1/60s)
      sway: Math.random() * 2 * Math.PI,
      swaySpeed: 0.03 + Math.random() * 0.05,
      drift: (Math.random() - 0.5) * 1.2,
      angle: Math.random() * 2 * Math.PI,
      spin: (Math.random() - 0.5) * 0.3,
      color: colors[Math.floor(Math.random() * colors.length)],
      round: Math.random() < 0.25
    }));

    const MAX_MS = 7000;
    const FADE_MS = 1200;
    let start = null;
    let last = null;

    function finish() {
      window.removeEventListener('resize', resize);
      if (canvas.parentNode) canvas.parentNode.removeChild(canvas);
      confettiRunning = false;
    }

    function frame(now) {
      if (start === null) { start = now; last = now; }
      const elapsed = now - start;
      const dt = Math.min((now - last) / 16.667, 3); // keeps speed steady on 60Hz and 120Hz screens
      last = now;

      ctx.clearRect(0, 0, w, h);
      ctx.globalAlpha = elapsed > MAX_MS - FADE_MS ? Math.max(0, (MAX_MS - elapsed) / FADE_MS) : 1;

      let stillFalling = false;
      pieces.forEach(p => {
        p.y += p.vy * dt;
        p.sway += p.swaySpeed * dt;
        p.x += (p.drift + Math.sin(p.sway) * 0.8) * dt;
        p.angle += p.spin * dt;
        if (p.y < h + 20) stillFalling = true;
        if (p.y > -20 && p.y < h + 20) {
          ctx.save();
          ctx.translate(p.x, p.y);
          ctx.rotate(p.angle);
          ctx.fillStyle = p.color;
          if (p.round) {
            ctx.beginPath();
            ctx.arc(0, 0, p.size / 2, 0, 2 * Math.PI);
            ctx.fill();
          } else {
            ctx.fillRect(-p.size / 2, -p.size / 4, p.size, p.size / 2);
          }
          ctx.restore();
        }
      });

      if (stillFalling && elapsed < MAX_MS) {
        requestAnimationFrame(frame);
      } else {
        finish();
      }
    }
    requestAnimationFrame(frame);
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
