console.log(
  'Самооценка 110 баллов/100 баллов:\n' +
    '%c\t\u2713 %cВёрстка валидная +10\n' +
    '%c\t\u2713 %cВёрстка семантическая +20\n' +
    '%c\t\u2713 %cВёрстка соответствует макету +48\n' +
    '%c\t\u2713 %cТребования к css + 12\n' +
    '%c\t\u2713 %cИнтерактивность, реализуемая через css +20\n',
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

const hamburger = document.querySelector('.hamburger');
const nav = document.querySelector('.nav');

function toggleMenu() {
  hamburger.classList.toggle('open');
  nav.classList.toggle('open');
}

function closeMenu(event) {
  if (event.target.classList.contains('nav-link')) {
    hamburger.classList.toggle('open');
    nav.classList.toggle('open');
  }
}

hamburger.addEventListener('click', toggleMenu);
nav.addEventListener('click', closeMenu);

const btn = document.querySelector('.portfolio-btns');

btn.addEventListener('click', selectBtn);

function selectBtn(event) {
  if (event.target.classList.contains('black-btn')) {
    for (const btn of document.querySelectorAll('.black-btn')) {
      btn.classList.remove('selected');
    }
    event.target.classList.toggle('selected');
  }
}
