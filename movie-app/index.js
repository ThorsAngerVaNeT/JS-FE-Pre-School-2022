import { API_CONF, API_URL, SEARCH_URL } from './js/api-config.js';
import data from './js/movies.js';

const searchForm = document.getElementById('search-form');
const search = document.getElementById('search');
const main = document.querySelector('.main');
const radios = document.querySelectorAll('input[name="radio"]');

async function fetchAPI() {
  try {
    const radio = document.querySelector('input[name="radio"]:checked');
    const radioValue = '/' + radio.value;
    const response = await fetch(`${API_URL.replace('/movie', radioValue)}`);
    const json = await response.json();
    insertMovieDivs(json);
  } catch (error) {
    console.log(error);
  }
}

function insertMovieDivs(json) {
  main.innerHTML = '';
  if (json?.results.length === 0) main.innerHTML = 'Nothing Found!';
  else
    json.results.forEach(movie => {
      const divMovie = `<div class="movie-card">
          <div class="poster"></div>
          <div class="overview"><h3>Overview</h3><hr>${movie.overview}</div>
          <div class="info">              
            <div class="info-title">
              <h3>${movie.title || movie.name}</h3> (${new Date(movie.release_date || movie.first_air_date).getFullYear()})
            </div>
            <div class="info-score">
              <i class="fa-solid fa-star"></i>
              <span title="${movie.vote_count} votes">${movie.vote_average}</span>
            </div>
          </div>
        </div>`;
      main.insertAdjacentHTML('beforeend', divMovie);
      const poster = main.querySelector('.movie-card:last-child .poster');
      poster.style.backgroundImage = `url("${API_CONF.images.secure_base_url}w780${movie.poster_path}")`;
    });
}

async function searchAPI(e) {
  e.preventDefault();

  if (search.value !== '') {
    try {
      const radio = document.querySelector('input[name="radio"]:checked');
      const radioValue = '/' + radio.value;
      const response = await fetch(`${SEARCH_URL.replace('/movie', radioValue)}${search.value}`);
      const json = await response.json();
      insertMovieDivs(json);
    } catch (error) {
      console.log(error);
    }
  }
}

fetchAPI();
// insertMovieDivs(data);
searchForm.addEventListener('submit', searchAPI);
radios.forEach(r => r.addEventListener('click', fetchAPI));

console.log(
  'js30#2.3-movie-app. Самооценка 70/70 баллов:\n' +
    '%c\t\u2713 %cВёрстка +10\n' +
    '%c\t\u2713 %cПри загрузке приложения на странице отображаются карточки фильмов с полученными от API данными +10\n' +
    '%c\t\u2713 %cЕсли в поле поиска ввести слово и отправить поисковый запрос, на странице отобразятся карточки фильмов, в названиях которых есть это слово, если такие данные предоставляет API +10\n' +
    '%c\t\u2713 %cПоиск +30\n' +
    '%c\t\u2713 %cОчень высокое качество оформления приложения и/или дополнительный не предусмотренный в задании функционал, улучшающий качество приложения +10:\n' +
    '\tреализовано собственное оригинальное оформление и возможность переключения вывода информации по фильмам или ТВ-сериалам',
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
