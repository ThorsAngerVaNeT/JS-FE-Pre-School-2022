const cardsEl = document.querySelector('.cards');
const turnsSpan = document.querySelector('.turns span');
const attemptsSpan = document.querySelector('.attempts span');
const winsSpan = document.querySelector('.wins span');
const volume = document.querySelector('.volume');
const volumeIcon = document.querySelector('.volume i');

let turnsCount = 2;
let attemptsCount = 0;
let winsCount = 0;
const timeout = 650;

const soundTurn = new Audio('./assets/audio/blop.mp3');
const soundMatch = new Audio('./assets/audio/2sec.mp3');
const soundFail = new Audio('./assets/audio/fail.m4a');
const soundReset = new Audio('./assets/audio/reset.m4a');
const soundWin = new Audio('./assets/audio/win.m4a');

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
    if (volumeIcon.classList.contains('fa-volume-high')) soundTurn.play();
    e.target.closest('.card').classList.toggle('selected');
    const selected = cardsEl.querySelectorAll('.selected');
    if (selected.length === 2) {
      cardsEl.removeEventListener('click', selectCard);
      const [cardOneEl, cardTwoEl] = selected;
      const cardOne = cardOneEl.dataset.type;
      const cardTwo = cardTwoEl.dataset.type;
      if (cardOne === cardTwo) {
        setTimeout(() => {
          if (
            cardsEl.querySelectorAll('[data-matched="true').length !== cardsEl.children.length &&
            volumeIcon.classList.contains('fa-volume-high')
          )
            soundMatch.play();
          document.body.classList.add('bright');
          setTimeout(() => {
            document.body.classList.remove('bright');
          }, 100);
        }, timeout);
        //play sound
        //add match animation
        // document.body.style.filter = 'brightness(3)';
        cardOneEl.dataset.matched = true;
        cardTwoEl.dataset.matched = true;
        cardOneEl.classList.toggle('selected');
        cardTwoEl.classList.toggle('selected');
      } else {
        //play sound
        setTimeout(() => {
          if (turnsCount > 0 && volumeIcon.classList.contains('fa-volume-high')) soundFail.play();
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
            if (volumeIcon.classList.contains('fa-volume-high')) soundReset.play();
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
        //play sound
        //show win message
        let results = [];
        console.log(localStorage.results);
        if (localStorage.results !== undefined) results = JSON.parse(localStorage.results);
        if (results.length === 10) {
          results.pop();
        }
        results.unshift({ turnsCount, attemptsCount, winsCount, date: new Date().format('hh:MM:ss dd.mm.yyyy') });
        localStorage.results = JSON.stringify(results);
        winsCount += 1;
        winsSpan.textContent = winsCount;
        setTimeout(() => {
          cardsEl.classList.add('win');
          if (volumeIcon.classList.contains('fa-volume-high')) soundWin.play();
          setTimeout(() => {
            cardsEl.classList.remove('win');
          }, timeout);
        }, timeout);
        // alert('WINNER');
        // cardsEl.querySelectorAll('[data-matched="true"').forEach(el => (el.dataset.matched = false));
        // shuffleCards();
      }, timeout);
    }
  }
}

function volumeToggle() {
  volumeIcon.classList.toggle('fa-volume-high');
  volumeIcon.classList.toggle('fa-volume-xmark');
}

cardsEl.addEventListener('click', selectCard);
volume.addEventListener('click', volumeToggle);
