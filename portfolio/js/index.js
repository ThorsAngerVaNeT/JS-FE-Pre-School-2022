import i18Obj from './translate.js';

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
  if (
    event.target.classList.contains('nav-link') &&
    event.target.closest('.nav').classList.contains('open')
  ) {
    hamburger.classList.toggle('open');
    nav.classList.toggle('open');
  }
};

hamburger.addEventListener('click', toggleMenu);
nav.addEventListener('click', closeMenu);

const seasons = ['winter', 'spring', 'summer', 'autumn'];

const preloadImages = () => {
  console.log('preload images');
  for (const season of seasons) {
    for (let i = 1; i <= 6; i++) {
      const img = new Image();
      img.src = `./assets/img/${season}/${i}.jpg`;
    }
  }
};

preloadImages();

const changeClassActive = (className, target) => {
  target.classList.add(className);
};

const portfolioBtns = document.querySelector('.portfolio-btns');
const portfolioImages = document.querySelectorAll('.portfolio-item > img');

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

const getTranslate = (lang) => {
  for (const el of document.querySelectorAll('[data-i18]')) {
    el.textContent = i18Obj[lang][el.dataset.i18];
    el.title = i18Obj[lang][el.dataset.i18];
    el.alt = i18Obj[lang][el.dataset.i18];
    el.placeholder = i18Obj[lang][el.dataset.i18];
  }
};

const setActiveLng = (lang) => {
  const langSwitcher = document.querySelector(
    `.switch-lng > span[data-lang='${lang}']`
  );
  document.querySelector('.lng-active').classList.remove('lng-active');
  changeClassActive('lng-active', langSwitcher);
};

const langSwitches = document.querySelector('.switch-lng');
const switchLang = (event) => {
  if (event.target.dataset.hasOwnProperty('lang')) {
    getTranslate(event.target.dataset.lang);
    setActiveLng(event.target.dataset.lang);
  }
};

langSwitches.addEventListener('click', switchLang);

const themeSwitch = document.querySelector('.theme-switch');
const iconEl = themeSwitch.lastElementChild,
  titleEl = themeSwitch.firstElementChild;
const themes = { moon: 'Light', sun: 'Dark' };

const setActiveTheme = (icon) => {
  const themeText = themes[icon];
  iconEl.setAttribute('xlink:href', `./assets/svg/sprite.svg#${icon}`);
  iconEl.dataset.icon = icon;
  titleEl.textContent = `Switch to ${themeText} Theme`;
  icon === 'sun'
    ? document.body.classList.remove('light')
    : document.body.classList.add('light');
};

const switchTheme = () => {
  const dataIcon = iconEl.dataset.icon === 'sun' ? 'moon' : 'sun';
  setActiveTheme(dataIcon);
};

themeSwitch.addEventListener('click', switchTheme);

// TODO localStorage settings save

function setLocalStorage() {
  const lang = document.querySelector('.lng-active').dataset.lang;
  localStorage.setItem('lang', lang);
  const theme = document.querySelector('.theme-switch use').dataset.icon;
  localStorage.setItem('theme', theme);
}
window.addEventListener('beforeunload', setLocalStorage);

function getLocalStorage() {
  if (localStorage.getItem('lang')) {
    const lang = localStorage.getItem('lang');
    setActiveLng(lang);
    getTranslate(lang);
  }
  if (localStorage.getItem('theme')) {
    setActiveTheme(localStorage.getItem('theme'));
  }
}
window.addEventListener('load', getLocalStorage);
window.addEventListener('load', preloadImages);
