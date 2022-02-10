import { API_CONF, API_KEY, API_URL } from './js/api-config.js';
import data from './movies.js';

const searchForm = document.getElementById('search-form');
const search = document.getElementById('search');
const main = document.querySelector('.main');

function fetchAPI() {
  fetch(`${API_URL}discover/movie/?sort_by=popularity.desc&api_key=${API_KEY}&page=1`)
    .then(res => res.json())
    .then(json => insertMovieDivs(json))
    .catch(err => console.log(err));
}
//https://api.themoviedb.org/3/search/movie?api_key=3fd2be6f0c70a2a598f084ddfb75487c&query=%22captain
insertMovieDivs(data);
function insertMovieDivs(json) {
  // console.log(json);
  main.innerHTML = '';
  if (json.results.length === 0) main.innerHTML = 'Nothing Found!';
  else
    json.results.forEach(movie => {
      let divMovie = document.createElement('div');
      divMovie.classList.add('movie-card');

      let imgMovie = document.createElement('img');
      imgMovie.src = `${API_CONF.images.base_url}/w780/${movie.poster_path}`;
      imgMovie.alt = `${movie.title}`;
      divMovie.appendChild(imgMovie);

      let divInfo = document.createElement('div');
      divInfo.classList.add('info');
      let title = document.createElement('h3');
      title.textContent = movie.title;
      let score = document.createElement('span');
      score.textContent = movie.vote_average;
      divInfo.appendChild(title);
      divInfo.appendChild(score);
      divMovie.appendChild(divInfo);

      let divOverview = document.create;

      // TODO add poster, title, score, desc
      main.appendChild(divMovie);
    });
}

function searchAPI(e) {
  e.preventDefault();

  if (search.value !== '') {
    fetch(`${API_URL}search/movie/?sort_by=popularity.desc&api_key=${API_KEY}&query=${search.value}`)
      .then(res => res.json())
      .then(json => insertMovieDivs(json))
      .catch(err => console.log(err));
  }
}

searchForm.addEventListener('submit', searchAPI);

// fetchAPI();

// adult: false
// backdrop_path: "/iQFcwSGbZXMkeyKrxbPnwnRo5fl.jpg"
// genre_ids: (3) [28, 12, 878]
// id: 634649
// original_language: "en"
// original_title: "Spider-Man: No Way Home"
// overview: "Peter Parker is unmasked and no longer able to separate his normal life from the high-stakes of being a super-hero. When he asks for help from Doctor Strange the stakes become even more dangerous, forcing him to discover what it truly means to be Spider-Man."
// popularity: 11286.376
// poster_path: "/1g0dhYtq4irTY1GPXvft6k4YLjm.jpg"
// release_date: "2021-12-15"
// title: "Spider-Man: No Way Home"
// video: false
// vote_average: 8.4
// vote_count: 7408
