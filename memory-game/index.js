const cardsEl = document.querySelector('.cards');
const turnsSpan = document.querySelector('.turns span');
const attemptsSpan = document.querySelector('.attempts span');
const winsSpan = document.querySelector('.wins span');
const volume = document.querySelector('.volume');
const volumeIcon = document.querySelector('.volume i');
const scoreboard = document.querySelector('.scoreboard-board');
const continueBtn = document.querySelector('.continue');
const resultsEl = document.querySelector('.results');

const timeout = 650;
let turnsCount = 2;
let attemptsCount = 0;
let winsCount = 0;
let attemptsOverallCount = 0;
let isVolumeUp = volumeIcon.classList.contains('fa-volume-high');

const soundTurn = new Audio('./assets/audio/blop.mp3');
const soundMatch = new Audio('./assets/audio/match.mp3');
const soundFail = new Audio('./assets/audio/fail.m4a');
const soundReset = new Audio('./assets/audio/reset.m4a');
const soundWin = new Audio('./assets/audio/win.m4a');
const soundSlide = new Audio('./assets/audio/slide.mp3');
const soundBattle = new Audio('./assets/audio/battle-cry.m4a');

soundTurn.volume = 0.5;
soundMatch.volume = 0.5;
soundFail.volume = 0.5;
soundReset.volume = 0.5;
soundWin.volume = 0.5;
soundSlide.volume = 0.5;
soundBattle.volume = 0.5;

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
          if (turnsCount > 0 && isVolumeUp) soundFail.play();
          turnsCount -= 1;
          turnsSpan.textContent = turnsCount;
          cardOneEl.classList.toggle('selected');
          cardTwoEl.classList.toggle('selected');
        }, timeout);

        if (turnsCount === 1) {
          setTimeout(() => {
            turnsSpan.classList.add('last-turn');
          }, timeout);
        }

        if (turnsCount <= 0) {
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
        results.unshift({ turnsCount, attemptsCount, winsCount, attemptsOverallCount, date: new Date().format('HH:MM:ss dd.mm.yyyy') });
        localStorage.results = JSON.stringify(results);
        setTimeout(() => {
          cardsEl.classList.add('win');
          if (isVolumeUp) soundWin.play();
          setTimeout(() => {
            resultsToHTML(results);
            cardsEl.classList.remove('win');
            resultsEl.style.display = 'flex';
          }, timeout);
        }, timeout);
        // alert('WINNER');
      }, timeout);
    }
  }
}

function resetGame() {
  resultsEl.classList.remove('visible');
  cardsEl.querySelectorAll('[data-matched="true"').forEach(el => (el.dataset.matched = false));
  shuffleCards();
  turnsCount = 2;
  turnsSpan.textContent = turnsCount;
  attemptsCount = 0;
  attemptsSpan.textContent = attemptsCount;
  turnsSpan.classList.remove('last-turn');
  if (isVolumeUp) soundBattle.play();
}

// resultsEl.classList.add('visible');
// resultsToHTML(JSON.parse(localStorage.results));

function resultsToHTML(results) {
  scoreboard.innerHTML = '';
  results.forEach(r => {
    scoreboard.insertAdjacentHTML(
      'beforeend',
      `<div class="scoreboard-board-item"><div class="turns">Turns: <span>${r.turnsCount}</span></div><div class="attempts">Attempts: <span>${r.attemptsCount}</span></div><div class="attempts">Overall Attempts: <span>${r.attemptsOverallCount}</span></div><div class="wins">Wins: <span>${r.winsCount}</span></div><div class="date">Date: <span>${r.date}</span></div></div>`
    );
  });
  resultsEl.classList.add('visible');
  // showResults();
}

function volumeToggle() {
  volumeIcon.classList.toggle('fa-volume-high');
  volumeIcon.classList.toggle('fa-volume-xmark');
  isVolumeUp = volumeIcon.classList.contains('fa-volume-high');
}

function showResults() {
  const items = document.querySelectorAll('.scoreboard-board-item');
  const isShowing = window.getComputedStyle(document.querySelector('.scoreboard-board')).display === 'none';
  const scoreBoard = document.querySelector('.scoreboard-board');
  if (isShowing) {
    scoreBoard.style.height = '0px';
    scoreBoard.style.display = 'block';
    items.forEach((el, i) => {
      setTimeout(() => {
        // if (volumeIcon.classList.contains('fa-volume-high')) soundSlide.play();
        scoreBoard.style.height = `${(i + 1) * 48}px`;
        el.classList.toggle('show');
      }, 600 * i);
    });
  } else {
    Array.from(items)
      .reverse()
      .forEach((el, i) => {
        setTimeout(() => {
          // console.log(scoreBoard.style.height);
          scoreBoard.style.height = `${(items.length - i) * 48}px`;
          // if (volumeIcon.classList.contains('fa-volume-high')) soundSlide.play();
          el.classList.toggle('show');
        }, 600 * i);
      });
    setTimeout(() => {
      scoreBoard.style.display = 'none';
    }, items.length * 600);
  }
}

function getResults() {
  resultsToHTML(JSON.parse(localStorage.results));
}

cardsEl.addEventListener('click', selectCard);
volume.addEventListener('click', volumeToggle);
continueBtn.addEventListener('click', resetGame);

document.querySelector('.scoreboard h3').addEventListener('click', showResults);
