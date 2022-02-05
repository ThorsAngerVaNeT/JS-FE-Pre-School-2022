import i18Obj from './translate.js';

console.log(
  'Portfolio#3. Самооценка 85/85 баллов:\n' +
    '%c\t\u2713 %cСмена изображений в секции portfolio +25\n' +
    '%c\t\u2713 %cПеревод страницы на два языка +25\n' +
    '%c\t\u2713 %cПереключение светлой и тёмной темы +25\n' +
    '%c\t\u2713 %cДополнительный функционал: выбранный пользователем язык отображения страницы и светлая или тёмная тема сохраняются при перезагрузке страницы +5\n' +
    '%c\t\u2713 %cДополнительный функционал: сложные эффекты для кнопок при наведении и/или клике +5:\n' +
    '\t\t1) при наведении на иконку смены темы;\n' +
    '\t\t2) при длительном клике на золотые кнопки;\n' +
    '\t\t3) переключение сезона в разделе Portfolio;\n' +
    '\t\t4) при наведении на иконки соцсетей.',
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
  // console.log('preload images');
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
    // if (el.alt) el.alt = i18Obj[lang][el.dataset.i18];
    if (el.title) el.title = i18Obj[lang][el.dataset.i18];
    if (el.placeholder) {
      el.placeholder = i18Obj[lang][el.dataset.i18];
      el.textContent = '';
    }
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
const themes = { moon: 'dark', sun: 'light' };

const setActiveTheme = (icon) => {
  const themeText = themes[icon];
  iconEl.setAttribute('xlink:href', `./assets/svg/sprite.svg#${icon}`);
  iconEl.dataset.icon = icon;
  titleEl.dataset.i18 = `${themes[icon]}-theme`;
  titleEl.textContent =
    i18Obj[localStorage.getItem('lang') || 'en'][titleEl.dataset.i18];
  icon === 'sun'
    ? document.body.classList.remove('light')
    : document.body.classList.add('light');
};

const switchTheme = () => {
  const dataIcon = iconEl.dataset.icon === 'sun' ? 'moon' : 'sun';
  setActiveTheme(dataIcon);
};

themeSwitch.addEventListener('click', switchTheme);

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

const video = document.querySelector('.video-player');
const videoControls = document.querySelector('.video-controls');
const playBtn = document.querySelector('.play');
const videoPlayerBtn = document.querySelector('.video-player-btn');
const playbackIcons = document.querySelectorAll('.play-icons use');
const timeElapsed = document.getElementById('time-elapsed');
const duration = document.getElementById('duration');
const progressBar = document.querySelector('.progress-bar');
const seek = document.querySelector('.seek');
const seekTooltip = document.querySelector('.seek-tooltip');

const volumeBtn = document.querySelector('.volume-btn');
const volumeIcons = document.querySelectorAll('.volume-btn use');
const volume = document.querySelector('.volume');

function togglePlay() {
  video.volume = volume.value;
  if (video.paused || video.ended) {
    video.play();
  } else {
    video.pause();
  }
  updatePlayButton();
}

function updatePlayButton() {
  playbackIcons.forEach((icon) => icon.classList.toggle('hidden'));
  videoPlayerBtn.classList.toggle('hidden');
  if (video.paused) {
    playBtn.setAttribute('data-title', 'Play (k)');
  } else {
    playBtn.setAttribute('data-title', 'Pause (k)');
  }
}

function formatTime(timeInSeconds) {
  const result = new Date(timeInSeconds * 1000).toISOString().substr(11, 8);

  return {
    minutes: result.substr(3, 2),
    seconds: result.substr(6, 2),
  };
}

function initializeVideo() {
  const videoDuration = Math.round(video.duration);
  const time = formatTime(videoDuration);
  seek.setAttribute('max', videoDuration);
  progressBar.setAttribute('max', videoDuration);
  duration.innerText = `${time.minutes}:${time.seconds}`;
  duration.setAttribute('datetime', `${time.minutes}m ${time.seconds}s`);
}

function updateTimeElapsed() {
  const time = formatTime(Math.round(video.currentTime));
  timeElapsed.innerText = `${time.minutes}:${time.seconds}`;
  timeElapsed.setAttribute('datetime', `${time.minutes}m ${time.seconds}s`);
}

function updateProgress() {
  seek.value = Math.floor(video.currentTime);
  progressBar.value = Math.floor(video.currentTime);
}

function updateSeekTooltip(event) {
  const rect = video.getBoundingClientRect();
  const skipTo = Math.round(
    (event.offsetX / event.target.clientWidth) *
      parseInt(event.target.getAttribute('max'), 10)
  );
  const t = formatTime(skipTo);
  seek.setAttribute('data-seek', skipTo);
  seekTooltip.textContent = `${t.minutes}:${t.seconds}`;
  seekTooltip.style.left = `${event.pageX - rect.left}px`;
}

function skipAhead(event) {
  const skipTo = event.target.dataset.seek
    ? event.target.dataset.seek
    : event.target.value;
  video.currentTime = skipTo;
  progressBar.value = skipTo;
  seek.value = skipTo;
}

function updateVolume() {
  if (video.muted) {
    video.muted = false;
  }
  console.log(video.volume);
  video.volume = volume.value;
}

function updateVolumeBtn() {
  volumeIcons.forEach((icon) => icon.classList.add('hidden'));
  volumeBtn.setAttribute('data-title', 'Mute (m)');
  if (video.muted || video.volume === 0) {
    volumeIcons[1].classList.remove('hidden');
    volumeBtn.setAttribute('data-title', 'Unmute (m)');
  } else {
    volumeIcons[0].classList.remove('hidden');
  }
}

function toggleMute() {
  video.muted = !video.muted;

  if (video.muted) {
    volume.setAttribute('data-volume', volume.value);
    volume.value = 0;
  } else {
    volume.value = volume.dataset.volume;
  }
}

function hideControls() {
  videoControls.classList.add('hide');
}

function showControls() {
  videoControls.classList.remove('hide');
}

video.addEventListener('click', togglePlay);
playBtn.addEventListener('click', togglePlay);
videoPlayerBtn.addEventListener('click', togglePlay);

video.addEventListener('loadedmetadata', initializeVideo);
video.addEventListener('timeupdate', updateTimeElapsed);
video.addEventListener('timeupdate', updateProgress);

seek.addEventListener('mousemove', updateSeekTooltip);
seek.addEventListener('input', skipAhead);

volume.addEventListener('input', updateVolume);
video.addEventListener('volumechange', updateVolumeBtn);

volumeBtn.addEventListener('click', toggleMute);

video.addEventListener('mouseenter', showControls);
video.addEventListener('mouseleave', hideControls);
videoControls.addEventListener('mouseenter', showControls);
videoControls.addEventListener('mouseleave', hideControls);
