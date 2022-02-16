const cardsEl = document.querySelector('.cards');
const turnsSpan = document.querySelector('.turns span');
const attemptsSpan = document.querySelector('.attempts span');
const winsSpan = document.querySelector('.wins span');

let turnsCount = 2;
let attemptsCount = 0;
let winsCount = 0;
const timeout = 650;

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
    e.target.closest('.card').classList.toggle('selected');
    const selected = cardsEl.querySelectorAll('.selected');
    if (selected.length > 1) {
      cardsEl.removeEventListener('click', selectCard);
      const [cardOneEl, cardTwoEl] = selected;
      const cardOne = cardOneEl.dataset.type;
      const cardTwo = cardTwoEl.dataset.type;
      if (cardOne === cardTwo) {
        //play sound
        //add match animation
        cardOneEl.dataset.matched = true;
        cardTwoEl.dataset.matched = true;
        cardOneEl.classList.toggle('selected');
        cardTwoEl.classList.toggle('selected');
      } else {
        //play sound
        setTimeout(() => {
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
        winsCount += 1;
        winsSpan.textContent = winsCount;
        alert('WINNER');
        cardsEl.querySelectorAll('[data-matched="true"').forEach(el => (el.dataset.matched = false));
        shuffleCards();
      }, timeout);
    }
  }
}

cardsEl.addEventListener('click', selectCard);
