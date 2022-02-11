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
          <div class="img-desc">
            <img src="${API_CONF.images.base_url}w780${movie.poster_path}" alt="${movie.title || movie.name}">
            <div class="desc-text"><h3>Overview</h3>${movie.overview}</div>
          </div>
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
searchForm.addEventListener('submit', searchAPI);
radios.forEach(r => r.addEventListener('click', fetchAPI));
