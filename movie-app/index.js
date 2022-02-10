import { API_CONF, API_URL, SEARCH_URL } from './js/api-config.js';
import data from './js/movies.js';

const searchForm = document.getElementById('search-form');
const search = document.getElementById('search');
const main = document.querySelector('.main');

async function fetchAPI() {
  try {
    const response = await fetch(`${API_URL}`);
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
          <img src="${API_CONF.images.base_url}w780${movie.poster_path}" alt="${movie.title}">
          <div class="info">
            <div class="info-title">
              <h3>${movie.title}</h3> (${new Date(movie.release_date).getFullYear()})
            </div>
            <div class="info-score">
              <i class="fa-solid fa-star"></i>
              <span title="${movie.vote_count} votes">${movie.vote_average}</span>
            </div>
          </div>
          <div class="desc-text"><h3>Overview</h3>${movie.overview}</div>
        </div>`;
      main.insertAdjacentHTML('beforeend', divMovie);
    });
}

async function searchAPI(e) {
  e.preventDefault();

  if (search.value !== '') {
    try {
      const response = await fetch(`${SEARCH_URL}${search.value}`);
      const json = await response.json();
      insertMovieDivs(json);
    } catch (error) {
      console.log(error);
    }
  }
}

function toggleDesc(e) {
  if (e.target.classList.contains('desc-toggle-btn')) {
    e.target.style.opacity = 0;
    e.target.nextElementSibling.style.transform = 'translateY(0)';
    console.dir(e.target);
  }
}

fetchAPI();
searchForm.addEventListener('submit', searchAPI);
main.addEventListener('click', toggleDesc);
