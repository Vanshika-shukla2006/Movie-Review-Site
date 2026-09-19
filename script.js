const API_KEY = "api_key=dcef2c8c8fe725e3845ce5cdaece8c96";
const BASE_URL = "https://api.themoviedb.org/3";
const API_URL = `${BASE_URL}/discover/movie?sort_by=popularity.desc&${API_KEY}`;
const IMG_URL = "https://image.tmdb.org/t/p/w500";
const searchURL = `${BASE_URL}/search/movie?${API_KEY}`;

const main = document.getElementById("main");
const form = document.getElementById("form");
const search = document.getElementById("search");

// Fetch popular movies
getMovies(API_URL);
// JSON -> JAVASCRIPT OBJECT NOTATION
function getMovies(url) {
  fetch(url)
    .then((res) => res.json())
    .then((data) => showMovies(data.results));
}

function showMovies(data) {
  main.innerHTML = "";
  data.forEach((movie) => {
    const { title, poster_path, vote_average, overview } = movie;
    const movieEl = document.createElement("div");
    movieEl.classList.add("movie");
    movieEl.innerHTML = `
      <img src="${IMG_URL + poster_path}" alt="${title}">
      <div class="movie-info">
        <h3>${title}</h3>
        <span class="${getColor(vote_average)}">${Math.round(vote_average * 10) / 10}</span>
      </div>
      <div class="overview">
        <h3>Overview</h3>
        ${overview}
      </div>
    `;
    main.appendChild(movieEl);
  });
}

function getColor(vote) {
  return vote >= 8 ? "green" : vote >= 5 ? "orange" : "red";
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const searchTerm = search.value;
  searchTerm ? getMovies(`${searchURL}&query=${searchTerm}`) : getMovies(API_URL);
});

// Modal functionality
const aboutBtn = document.getElementById("about-btn");
const aboutModal = document.getElementById("about-modal");
const closeBtn = document.querySelector(".close-btn");

aboutBtn.addEventListener("click", (e) => {
  e.preventDefault(); // Prevent default link behavior
  aboutModal.style.display = "block";
});

closeBtn.addEventListener("click", () => {
  aboutModal.style.display = "none";
});

window.addEventListener("click", (event) => {
  if (event.target === aboutModal) aboutModal.style.display = "none";
});