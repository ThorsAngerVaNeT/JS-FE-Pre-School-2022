console.log(
  'Portfolio#2. Самооценка 85/85 баллов:\n' +
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

const toggleMenu = () => {
  hamburger.classList.toggle('open');
  nav.classList.toggle('open');
};

const closeMenu = (event) => {
  if (event.target.classList.contains('nav-link')) {
    hamburger.classList.toggle('open');
    nav.classList.toggle('open');
  }
};

hamburger.addEventListener('click', toggleMenu);
nav.addEventListener('click', closeMenu);

const seasons = ['winter', 'spring', 'summer', 'autumn'];

const preloadImages = () => {
  for (const season of seasons) {
    for (let i = 1; i <= 6; i++) {
      const img = new Image();
      img.src = `./assets/img/${season}/${i}.jpg`;
    }
  }
};

preloadImages();

const portfolioBtns = document.querySelector('.portfolio-btns');
const portfolioImages = document.querySelectorAll('.portfolio-item > img');

const changeClassActive = (className, target) => {
  target.classList.add('selected');
};

const changeImages = (event) => {
  if (event.target.classList.contains('portfolio-btn')) {
    for (const btn of document.querySelectorAll('.portfolio-btn')) {
      btn.classList.remove('selected');
    }
    changeClassActive('selected', event.target);

    const season = event.target.dataset.season;
    portfolioImages.forEach((img, i) => {
      img.src = `./assets/img/${season}/${i + 1}.jpg`;
      img.alt = `Portfolio ${season[0].toUpperCase()}${season.slice(1)} Photo ${
        i + 1
      }`;
    });
  }
};

portfolioBtns.addEventListener('click', changeImages);
