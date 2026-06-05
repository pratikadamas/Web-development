(() => {
  // -------- Settings (your rules) --------
  const TOTAL_QUESTIONS = 10;
  const TIME_LIMIT_SEC = 20.0;
  const MIN_OPERANDS = 3;
  const MAX_OPERANDS = 5;
  const OPS = ["+", "-", "*", "/"];
  const MAX_MUL = 2;
  const MAX_DIV = 2;

  // -------- State --------
  let qIndex = 0;
  let score = 0;
  let current = null;     // { display, jsExpr, answer }
  let history = [];       // { expr, correct, user, ok }
  let timerId = null;
  let timeLeft = TIME_LIMIT_SEC;

  // -------- Elements --------
  const screens = {
    start: document.getElementById("start"),
    game: document.getElementById("game"),
    results: document.getElementById("results"),
  };
  const el = {
    btnStart: document.getElementById("btnStart"),
    btnSubmit: document.getElementById("btnSubmit"),
    btnRestart: document.getElementById("btnRestart"),
    qLabel: document.getElementById("qLabel"),
    tLabel: document.getElementById("tLabel"),
    bar: document.getElementById("bar"),
    eq: document.getElementById("eq"),
    ans: document.getElementById("ans"),
    scoreTitle: document.getElementById("scoreTitle"),
    scoreText: document.getElementById("scoreText"),
    reviewBody: document.getElementById("reviewBody"),
  };
//switch between screens start, game, results
  function show(name){
    Object.values(screens).forEach(s => s.classList.remove("active"));
    screens[name].classList.add("active");
  }

  // -------- Helpers --------
  const css = getComputedStyle(document.documentElement);
  const GOOD = css.getPropertyValue('--good').trim();
  const WARN = css.getPropertyValue('--warn').trim();
  const BAD  = css.getPropertyValue('--bad').trim();

  function randInt(min ,max){
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  //pick random element from array
  function pick(arr){ return arr[Math.floor(Math.random() * arr.length)]; }

  function safeOperand(){
    // Single digit numbers (1-9) as requested
    return randInt(1, 9);
  }

  // protect xss html
  function escapeHtml(s){
    return s.replace(/[&<>"']/g, c => ({
      "&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"
    }[c]));
  }

  // -------- Equation generation with operator limits --------
  function generateOperators(count){
    // count = number of operators = operandsCount - 1
    // Must satisfy: mul <= 2, div <= 2
    // We'll randomly draw while respecting caps.
    let mul = 0, div = 0;
    const ops = [];

    for (let i = 0; i < count; i++){
      let tries = 0;
      while (true){
        tries++;
        const op = pick(OPS);

        if (op === "*" && mul >= MAX_MUL) { if (tries < 50) continue; else { /*fallback*/ } }
        if (op === "/" && div >= MAX_DIV) { if (tries < 50) continue; else { /*fallback*/ } }

        // accept
        ops.push(op);
        if (op === "*") mul++;
        if (op === "/") div++;
        break;
      }
    }

    // If we somehow exceeded due to fallback, sanitize by replacing extras with +/-
    // (very rare with tries loop, but safe)
    mul = 0; div = 0;
    for (let i = 0; i < ops.length; i++){
      if (ops[i] === "*") mul++;
      if (ops[i] === "/") div++;
      if (mul > MAX_MUL || div > MAX_DIV){
        ops[i] = (Math.random() < 0.5) ? "+" : "-";
        mul = ops.filter(x => x === "*").length;
        div = ops.filter(x => x === "/").length;
      }
    }

    return ops;
  }

  function generateExpression(){
    const operandsCount = randInt(MIN_OPERANDS, MAX_OPERANDS);
    const opCount = operandsCount - 1;

    const ops = generateOperators(opCount);

    // Build tokens; make division exact by adjusting the immediate left operand
    // so it is a multiple of the divisor (clean integer division locally).
    let tokens = [String(safeOperand())];

    for (let i = 0; i < ops.length; i++){
      const op = ops[i];

      if (op === "/"){
        const divisor = randInt(2, 12);
        const k = randInt(1, 12);
        const left = divisor * k;

        tokens[tokens.length - 1] = String(left);
        tokens.push("/");
        tokens.push(String(divisor));
      } else {
        tokens.push(op);
        tokens.push(String(safeOperand()));
      }
    }

    const jsExpr = tokens.join(" ");
    const display = tokens.map(t => t === "*" ? "×" : t === "/" ? "÷" : t).join(" ");

    const value = Function(`"use strict"; return (${jsExpr});`)();

    // Ensure a nice integer final answer (because precedence can create fractions)
    if (!Number.isFinite(value) || Math.abs(value - Math.round(value)) > 1e-9) {
      return generateExpression();
    }

    // Safety check: confirm operator counts
    const mulCount = tokens.filter(t => t === "*").length;
    const divCount = tokens.filter(t => t === "/").length;
    if (mulCount > MAX_MUL || divCount > MAX_DIV) return generateExpression();

    return { display, jsExpr, answer: Math.round(value) };
  }

  // -------- Game flow --------
  function startGame(){
    qIndex = 0;
    score = 0;
    history = [];
    show("game");
    nextQuestion();
  }

  function nextQuestion(){
    if (timerId) clearInterval(timerId);

    if (qIndex >= TOTAL_QUESTIONS){
      endGame();
      return;
    }

    qIndex++;
    el.qLabel.textContent = `Question ${qIndex} / ${TOTAL_QUESTIONS}`;

    current = generateExpression();
    el.eq.textContent = `${current.display} = ?`;

    el.ans.value = "";
    el.ans.focus();

    startTimer();
  }

  function startTimer(){
    timeLeft = TIME_LIMIT_SEC;
    updateTimerUI();

    timerId = setInterval(() => {
      timeLeft = Math.max(0, timeLeft - 0.1);
      updateTimerUI();

      if (timeLeft <= 0){
        clearInterval(timerId);
        submitAnswer(true);
      }
    }, 100);
  }

  function updateTimerUI(){
    el.tLabel.textContent = `Time: ${timeLeft.toFixed(1)}s`;
    const pct = (timeLeft / TIME_LIMIT_SEC) * 100;
    el.bar.style.width = `${pct}%`;

    if (pct > 50) el.bar.style.backgroundColor = GOOD;
    else if (pct > 25) el.bar.style.backgroundColor = WARN;
    else el.bar.style.backgroundColor = BAD;
  }

  function submitAnswer(isTimeout = false){
    if (timerId) clearInterval(timerId);

    const raw = el.ans.value.trim();
    const user = raw === "" ? null : Number(raw);
    const correct = current.answer;
    const ok = (user !== null && Number.isFinite(user) && user === correct);

    if (ok) score++;

    history.push({
      expr: current.display,
      correct,
      user: user === null ? (isTimeout ? "TIME" : "") : user,
      ok
    });

    nextQuestion();
  }

  function endGame(){
    show("results");
    el.scoreTitle.textContent = `Score: ${score} / ${TOTAL_QUESTIONS}`;

    if (score === 10) el.scoreText.textContent = "Perfect.";
    else if (score >= 7) el.scoreText.textContent = "Great job.";
    else if (score >= 4) el.scoreText.textContent = "Good effort—speed improves fast with practice.";
    else el.scoreText.textContent = "Hard set—run it again.";

    el.reviewBody.innerHTML = "";
    history.forEach((h, idx) => {
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td>${idx + 1}</td>
        <td><code>${escapeHtml(h.expr)}</code></td>
        <td>${escapeHtml(String(h.user))}</td>
        <td>${escapeHtml(String(h.correct))}</td>
        <td>${h.ok ? `<span class="tag good">Correct</span>` : `<span class="tag bad">Wrong</span>`}</td>
      `;
      el.reviewBody.appendChild(tr);
    });
  }

  // -------- Events --------
  el.btnStart.addEventListener("click", startGame);
  el.btnRestart.addEventListener("click", startGame);
  el.btnSubmit.addEventListener("click", () => submitAnswer(false));
  el.ans.addEventListener("keydown", (e) => {
    if (e.key === "Enter") submitAnswer(false);
  });
})();
