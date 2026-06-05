(() => {
  /* ===== CONFIG ===== */
  const SYMBOLS = ['🍎', '🍋', '🌟', '🎯'];   // 4 pairs = 8 cards
  const TOTAL_PAIRS = SYMBOLS.length;

  /* ===== STATE ===== */
  let cards       = [];    // { id, symbol, matched, element }
  let score       = 0;
  let round       = 0;
  let misses      = 0;
  let pairsLeft   = TOTAL_PAIRS;
  let computerCard = null;
  let locked       = false;
  let history      = [];   // { round, computerSymbol, computerIdx, userIdx, userSymbol, matched }

  /* ===== ELEMENTS ===== */
  const $ = id => document.getElementById(id);

  const screens = {
    start:  $('startScreen'),
    game:   $('gameScreen'),
    result: $('resultScreen')
  };

  function showScreen(name) {
    Object.values(screens).forEach(s => s.classList.remove('active'));
    screens[name].classList.add('active');
  }

  /* ===== SHUFFLE ===== */
  function shuffle(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }

  /* ===== BUILD CARDS ===== */
  function buildCards() {
    const grid = $('cardGrid');
    grid.innerHTML = '';

    // Create pairs
    const deck = [];
    SYMBOLS.forEach((sym, idx) => {
      deck.push({ id: idx * 2,     symbol: sym, matched: false });
      deck.push({ id: idx * 2 + 1, symbol: sym, matched: false });
    });

    shuffle(deck);
    cards = deck;

    cards.forEach((card, index) => {
      const el = document.createElement('div');
      el.className = 'card';
      el.innerHTML = `
        <div class="card-back">?</div>
        <div class="card-face">${card.symbol}</div>
      `;
      el.addEventListener('click', () => onUserClick(index));
      card.element = el;
      grid.appendChild(el);
    });
  }

  /* ===== START GAME ===== */
  function startGame() {
    score     = 0;
    round     = 0;
    misses    = 0;
    pairsLeft = TOTAL_PAIRS;
    history   = [];
    computerCard = null;
    locked    = false;

    showScreen('game');
    buildCards();
    updateUI();
    computerPick();
  }

  /* ===== UPDATE UI ===== */
  function updateUI() {
    $('roundLabel').textContent = `Round: ${round}`;
    $('scoreLabel').textContent = `Score: ${score}`;
    $('turnLabel').textContent  = `Pairs Left: ${pairsLeft}`;
    $('progText').textContent   = `${score} / ${TOTAL_PAIRS}`;
    $('progBar').style.width    = (score / TOTAL_PAIRS * 100) + '%';
  }

  function setMessage(text, type) {
    const msg = $('msg');
    msg.textContent = text;
    msg.className = 'message';
    if (type) msg.classList.add('msg-' + type);
  }

  /* ===== COMPUTER PICKS ===== */
  function computerPick() {
    locked = true;
    round++;
    updateUI();

    // Get unmatched cards
    const available = cards.filter(c => !c.matched);
    if (available.length === 0) { endGame(); return; }

    // Disable all cards
    cards.forEach(c => c.element.classList.add('card-disabled'));

    setMessage('🤖 Computer is picking a card...', 'wait');

    setTimeout(() => {
      // Pick random unmatched card
      const pick = available[Math.floor(Math.random() * available.length)];
      computerCard = pick;

      // Flip it
      pick.element.classList.add('card-flipped', 'card-computer');

      setMessage(`🤖 Computer picked a card! Now find its match!`, 'info');

      // Enable unmatched cards (except computer's card) for user to click
      cards.forEach(c => {
        if (!c.matched && c.id !== pick.id) {
          c.element.classList.remove('card-disabled');
        }
      });

      locked = false;
    }, 1200);
  }

  /* ===== USER CLICKS ===== */
  function onUserClick(index) {
    if (locked) return;

    const userCard = cards[index];
    if (userCard.matched) return;
    if (computerCard && userCard.id === computerCard.id) return;

    locked = true;

    // Disable all cards
    cards.forEach(c => c.element.classList.add('card-disabled'));

    // Flip user card
    userCard.element.classList.add('card-flipped');

    const matched = userCard.symbol === computerCard.symbol;

    history.push({
      round: round,
      computerSymbol: computerCard.symbol,
      computerIdx: cards.indexOf(computerCard) + 1,
      userIdx: index + 1,
      userSymbol: userCard.symbol,
      matched: matched
    });

    if (matched) {
      // Match found!
      score++;
      pairsLeft--;
      updateUI();

      setTimeout(() => {
        setMessage(`✅ Match! Both cards are ${userCard.symbol}!`, 'good');
        userCard.element.classList.add('card-matched');
        userCard.element.classList.remove('card-flipped');
        computerCard.element.classList.add('card-matched');
        computerCard.element.classList.remove('card-flipped', 'card-computer');
        userCard.matched = true;
        computerCard.matched = true;

        setTimeout(() => {
          if (pairsLeft <= 0) {
            endGame();
          } else {
            computerPick();
          }
        }, 1200);
      }, 800);

    } else {
      // No match
      misses++;

      setTimeout(() => {
        setMessage(`❌ No match! ${computerCard.symbol} ≠ ${userCard.symbol} — Remember positions!`, 'bad');
        userCard.element.classList.add('card-wrong');
        computerCard.element.classList.add('card-wrong');

        setTimeout(() => {
          // Flip both back
          userCard.element.classList.remove('card-flipped', 'card-wrong');
          computerCard.element.classList.remove('card-flipped', 'card-computer', 'card-wrong');

          setTimeout(() => {
            computerPick();
          }, 600);
        }, 1500);
      }, 800);
    }
  }

  /* ===== END GAME ===== */
  function endGame() {
    showScreen('result');

    $('finalScore').textContent  = `${score} / ${TOTAL_PAIRS}`;
    $('rcOk').textContent        = score;
    $('rcMiss').textContent      = misses;
    $('rcRounds').textContent    = round;
    $('resultBar').style.width   = (score / TOTAL_PAIRS * 100) + '%';

    let msg = '';
    if (misses === 0)      msg = '🌟 Perfect memory! No mistakes!';
    else if (misses <= 2)  msg = '🔥 Excellent memory!';
    else if (misses <= 4)  msg = '👍 Good job!';
    else                   msg = '💪 Keep practicing your memory!';
    $('gradeMsg').textContent = msg;

    // Build log
    const list = $('logList');
    list.innerHTML = '';

    history.forEach(h => {
      const div = document.createElement('div');
      div.className = 'log-item ' + (h.matched ? 'log-ok' : 'log-no');
      div.innerHTML = `
        <span class="log-num">#${h.round}</span>
        <span class="log-detail">
          🤖 Card ${h.computerIdx} (${h.computerSymbol}) &nbsp;→&nbsp;
          👆 Card ${h.userIdx} (${h.userSymbol})
        </span>
        <span class="log-icon">${h.matched ? '✅' : '❌'}</span>
      `;
      list.appendChild(div);
    });
  }

  /* ===== EVENTS ===== */
  $('btnStart').addEventListener('click', startGame);
  $('btnRestart').addEventListener('click', startGame);

})();
