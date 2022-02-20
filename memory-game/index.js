const cardsEl = document.querySelector('.cards');
const turnsSpan = document.querySelector('.turns span');
const attemptsSpan = document.querySelector('.attempts span');
const winsSpan = document.querySelector('.wins span');
const volume = document.querySelector('.volume');
const volumeIcon = document.querySelector('.volume i');
const scoreboard = document.querySelector('.scoreboard-board');
const continueBtn = document.querySelector('.continue');
const resultsEl = document.querySelector('.results');
const grats = resultsEl.querySelector('.grats');
const playBtn = document.querySelector('.play');
const playIcon = playBtn.querySelector('.play i');
const scoreboardBtn = document.querySelector('.scoreboard-btn');

const timeout = 650;
let difficulty = 'hard';
let turnsCount = 2;
let attemptsCount = 0;
let winsCount = 0;
let attemptsOverallCount = 0;
let isVolumeUp = volumeIcon.classList.contains('fa-volume-high');
let isMusicPlaying = false;

const soundTurn = new Audio('./assets/audio/blop.mp3');
const soundMatch = new Audio('./assets/audio/match.mp3');
const soundFail = new Audio('./assets/audio/fail.m4a');
const soundReset = new Audio('./assets/audio/reset.m4a');
const soundWin = new Audio('./assets/audio/win.m4a');
const soundSlide = new Audio('./assets/audio/slide.mp3');
const soundBattle = new Audio('./assets/audio/battle-cry.m4a');
const soundMusic = new Audio('./assets/audio/background-music.mp3');

soundTurn.volume = 0.5;
soundMatch.volume = 0.5;
soundFail.volume = 0.5;
soundReset.volume = 0.5;
soundWin.volume = 0.5;
soundSlide.volume = 0.5;
soundBattle.volume = 0.5;
soundMusic.volume = 0.1;
soundMusic.loop = true;

shuffleCards();
function shuffleCards() {
  let cards = Array.from(cardsEl.children);
  while (cards.length) {
    cardsEl.append(cards.splice(Math.floor(Math.random() * cards.length), 1)[0]);
  }
}

function selectCard(e) {
  const selectedLength = cardsEl.querySelectorAll('.selected').length;
  if (
    !e.target.classList.contains('cards') &&
    !e.target.closest('.card').classList.contains('selected') &&
    e.target.closest('.card').dataset.matched !== 'true' &&
    selectedLength < 2
  ) {
    if (isVolumeUp) soundTurn.play();
    e.target.closest('.card').classList.toggle('selected');
    const selected = cardsEl.querySelectorAll('.selected');
    if (selected.length === 2) {
      cardsEl.removeEventListener('click', selectCard);
      const [cardOneEl, cardTwoEl] = selected;
      const cardOne = cardOneEl.dataset.type;
      const cardTwo = cardTwoEl.dataset.type;
      if (cardOne === cardTwo) {
        setTimeout(() => {
          if (isVolumeUp) soundMatch.play();
          document.body.classList.add('bright');
          if (difficulty === 'normal') turnsCount += 1;
          turnsSpan.textContent = turnsCount;
          setTimeout(() => {
            document.body.classList.remove('bright');
          }, 100);
        }, timeout);
        cardOneEl.dataset.matched = true;
        cardTwoEl.dataset.matched = true;
        cardOneEl.classList.toggle('selected');
        cardTwoEl.classList.toggle('selected');
      } else {
        setTimeout(() => {
          if (((turnsCount > 0 && difficulty === 'hard') || difficulty === 'normal') && isVolumeUp) soundFail.play();
          if (difficulty === 'hard') turnsCount -= 1;
          else turnsCount += 1;
          turnsSpan.textContent = turnsCount;
          cardOneEl.classList.toggle('selected');
          cardTwoEl.classList.toggle('selected');
        }, timeout);

        if (turnsCount === 1 && difficulty === 'hard') {
          setTimeout(() => {
            turnsSpan.classList.add('last-turn');
          }, timeout);
        }

        if (turnsCount <= 0 && difficulty === 'hard') {
          setTimeout(() => {
            if (isVolumeUp) soundReset.play();
            turnsCount = 2;
            turnsSpan.textContent = turnsCount;
            attemptsCount += 1;
            attemptsSpan.textContent = attemptsCount;
            turnsSpan.classList.remove('last-turn');
            cardsEl.querySelectorAll('[data-matched="true"').forEach(el => (el.dataset.matched = false));
          }, timeout);
        }
      }
      cardsEl.addEventListener('click', selectCard);
    }

    if (cardsEl.querySelectorAll('[data-matched="true').length === cardsEl.children.length) {
      setTimeout(() => {
        let results = [];
        if (localStorage.results !== undefined) results = JSON.parse(localStorage.results);
        if (results.length === 10) {
          results.pop();
        }
        attemptsOverallCount += attemptsCount;
        winsCount += 1;
        winsSpan.textContent = winsCount;
        results.unshift({
          turnsCount,
          attemptsCount,
          winsCount,
          difficulty,
          attemptsOverallCount,
          date: new Date().format('HH:MM:ss dd.mm.yyyy'),
        });
        localStorage.results = JSON.stringify(results);
        setTimeout(() => {
          cardsEl.classList.add('win');
          if (isVolumeUp) soundWin.play();
          setTimeout(() => {
            // scoreboard.style.height = '0px';
            resultsToHTML(results);
            resultsEl.classList.add('visible');
            resultsEl.querySelector(
              '.result'
            ).innerHTML = `<div class="turns">Turns: <span>${turnsCount}</span></div><div class="attempts">Attempts: <span>${attemptsCount}</span></div>${
              difficulty === 'hard' ? `<div class="attempts">Overall Attempts: <span>${attemptsOverallCount}</span></div>` : ''
            }<div class="wins">Wins: <span>${winsCount}</span></div><div class="difficulty">Difficulty: <span>${difficulty}</span></div>`;
            cardsEl.classList.remove('win');
            // resultsEl.style.display = 'flex';
            grats.style.display = 'flex';
          }, timeout);
        }, timeout);
        // alert('WINNER');
      }, timeout);
    }
  }
}

function resetGame(e) {
  resultsEl.classList.remove('visible');
  cardsEl.querySelectorAll('[data-matched="true"').forEach(el => (el.dataset.matched = false));
  shuffleCards();
  if (difficulty === 'hard') turnsCount = 2;
  else turnsCount = 0;
  turnsSpan.textContent = turnsCount;
  attemptsCount = 0;
  attemptsSpan.textContent = attemptsCount;
  turnsSpan.classList.remove('last-turn');
  if (isVolumeUp && grats.style.display !== 'none' && e.target.name !== 'difficulty') soundBattle.play();
}

// resultsEl.classList.add('visible');
resultsToHTML(JSON.parse(localStorage.getItem('results')));

function resultsToHTML(results) {
  scoreboard.style.display = 'none';
  scoreboard.innerHTML = '';
  if (results) {
    results.forEach(r => {
      scoreboard.insertAdjacentHTML(
        'beforeend',
        `<div class="scoreboard-board-item"><div class="date">Date: <span>${r.date}</span></div><div class="turns">Turns: <span>${
          r.turnsCount
        }</span></div><div class="wins">Wins: <span>${r.winsCount}</span></div><div class="difficulty">Difficulty: <span>${
          r.difficulty
        }</span></div>${
          r.difficulty === 'hard'
            ? `<div class="attempts">Attempts: <span>${r.attemptsCount}</span></div><div class="attempts">Overall Attempts: <span>${r.attemptsOverallCount}</span></div>`
            : ''
        }</div>`
      );
    });
  }
  // showResults();
}

function volumeToggle() {
  volumeIcon.classList.toggle('fa-volume-high');
  volumeIcon.classList.toggle('fa-volume-xmark');
  isVolumeUp = !isVolumeUp;
}

function toggleResults(e) {
  const isScoreboardBtnClick = e?.target.classList.contains('scoreboard-btn');
  const isItemsShowed = document.querySelectorAll('.scoreboard-board-item.show').length > 0;

  if (isScoreboardBtnClick) {
    resultsEl.classList.add('visible');
    grats.style.display = 'none';
  }
  if (!(isScoreboardBtnClick && isItemsShowed)) {
    const isShowing = window.getComputedStyle(scoreboard).display === 'none' || isScoreboardBtnClick;
    if (isShowing) showResults();
    else hideResults();
  }
}

function showResults() {
  const items = document.querySelectorAll('.scoreboard-board-item');
  scoreboard.style.height = '0px';
  scoreboard.style.display = 'flex';
  items.forEach((el, i) => {
    setTimeout(() => {
      scoreboard.style.height = `${(i + 1) * 48}px`;
      el.classList.add('show');
    }, 600 * i);
  });
}

function hideResults() {
  const items = document.querySelectorAll('.scoreboard-board-item');
  Array.from(items)
    .reverse()
    .forEach((el, i) => {
      setTimeout(() => {
        scoreboard.style.height = `${(items.length - i) * 48}px`;
        el.classList.remove('show');
      }, 600 * i);
    });
  setTimeout(() => {
    scoreboard.style.display = 'none';
  }, items.length * 600);
}

function toggleMusic() {
  playIcon.classList.toggle('fa-play');
  playIcon.classList.toggle('fa-pause');
  isMusicPlaying = !isMusicPlaying;
  if (isMusicPlaying) {
    soundMusic.play();
    playBtn.title = 'Pause background music';
  } else {
    soundMusic.pause();
    playBtn.title = 'Play background music';
  }
}

function setDifficulty(e) {
  difficulty = e.target.value;
  resetGame(e);
}

cardsEl.addEventListener('click', selectCard);
volume.addEventListener('click', volumeToggle);
continueBtn.addEventListener('click', resetGame);
playBtn.addEventListener('click', toggleMusic);
scoreboardBtn.addEventListener('click', toggleResults);

document.querySelector('.scoreboard h3').addEventListener('click', toggleResults);
document.querySelectorAll('input[type="radio"]').forEach(r => r.addEventListener('click', setDifficulty));

console.log(
  'js30#3.2-memory-game. Самооценка 70/70 баллов:\n' +
    '%c\t\u2713 %cВёрстка +10\n' +
    '%c\t\u2713 %cЛогика игры. Карточки, по которым кликнул игрок, переворачиваются согласно правилам игры +10\n' +
    '%c\t\u2713 %cИгра завершается, когда открыты все карточки +10\n' +
    '%c\t\u2713 %cПо окончанию игры выводится её результат - количество ходов, которые понадобились для завершения игры +10\n' +
    '%c\t\u2713 %cРезультаты последних 10 игр сохраняются в local storage. Есть таблица рекордов, в которой сохраняются результаты предыдущих 10 игр +10\n' +
    '%c\t\u2713 %cПо клику на карточку – она переворачивается плавно, если пара не совпадает – обе карточки так же плавно переварачиваются рубашкой вверх +10\n' +
    '%c\t\u2713 %cОчень высокое качество оформления приложения и/или дополнительный не предусмотренный в задании функционал, улучшающий качество приложения +10\n',
  'color: green',
  '',
  'color: green',
  '',
  'color: green',
  '',
  'color: green',
  '',
  'color: green',
  '',
  'color: green',
  '',
  'color: green',
  ''
);
