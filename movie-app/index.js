import { API_CONF, API_URL, SEARCH_URL } from './js/api-config.js';
import data from './movies.js';

const searchForm = document.getElementById('search-form');
const search = document.getElementById('search');
const main = document.querySelector('.main');

function fetchAPI() {
  fetch(`${API_URL}`)
    .then(res => res.json())
    .then(json => insertMovieDivs(json))
    .catch(err => console.log(err));
}

fetchAPI();
function insertMovieDivs(json) {
  main.innerHTML = '';
  if (json.results.length === 0) main.innerHTML = 'Nothing Found!';
  else
    json.results.forEach(movie => {
      const divMovie = `<div class="movie-card">
          <img src="${API_CONF.images.base_url}w780${movie.poster_path}" alt="${movie.title}">
          <div class="info">
            <div class="info-title">
              <h3>${movie.title}</h3> (${new Date(movie.release_date).getFullYear()})
            </div>
            <div class="info-score">
              <i class="fa-solid fa-star"></i>
              <span>${movie.vote_average}</span>
            </div>
          </div>
        </div>`;

      let divOverview = document.create;

      // TODO add desc
      main.insertAdjacentHTML('beforeend', divMovie);
    });
}

function searchAPI(e) {
  e.preventDefault();

  if (search.value !== '') {
    fetch(`${SEARCH_URL}${search.value}`)
      .then(res => res.json())
      .then(json => insertMovieDivs(json))
      .catch(err => console.log(err));
  }
}

searchForm.addEventListener('submit', searchAPI);
