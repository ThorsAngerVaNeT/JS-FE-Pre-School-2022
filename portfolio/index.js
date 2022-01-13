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
const navLinks = document.querySelectorAll('.nav-link');

function toggleMenu() {
  hamburger.classList.toggle('open');
  nav.classList.toggle('open');
}
hamburger.addEventListener('click', toggleMenu);

for (let i = 0; i < navLinks.length; i++) {
  navLinks[i].addEventListener('click', toggleMenu);
}
