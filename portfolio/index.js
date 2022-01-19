console.log(
  'Самооценка 85/85 баллов:\n' +
    '%c\t\u2713 %cВёрстка соответствует макету. Ширина экрана 768px +48\n' +
    '%c\t\u2713 %cНи на одном из разрешений до 320px включительно не появляется горизонтальная полоса прокрутки +15\n' +
    '%c\t\u2713 %cНа ширине экрана 768рх и меньше реализовано адаптивное меню +22\n',
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
