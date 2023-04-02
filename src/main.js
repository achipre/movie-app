const api = axios.create({
  baseURL: "https://api.themoviedb.org/3/",
  headers: {
    "Content-Type": "application/json; charset=utf-8",
  },
  params: {
    api_key: APIkey,
    language: "es",
  },
});

// Utils
function createMovies(movies, container) {
  container.innerHTML = "";
  movies.forEach((movie) => {
    const movieContainer = document.createElement("div");
    movieContainer.classList.add("movie-container");
    const movieImg = document.createElement("img");
    movieImg.addEventListener("click", () => {
      location.hash = `#movie=${movie.id}`;
    });
    movieImg.classList.add("movie-img");

    movieImg.setAttribute("alt", movie.title);
    movieImg.setAttribute(
      "src",
      "https://www.themoviedb.org/t/p/w440_and_h660_face/" + movie.poster_path
    );
    movieContainer.appendChild(movieImg);
    container.appendChild(movieContainer);
  });
}

function createCategory(cat, container) {
  container.innerHTML = "";
  cat.forEach((category) => {
    const categoryContainer = document.createElement("li");
    const categoryTitle = document.createElement("p");
    categoryContainer.classList.add("container-category");
    categoryContainer.setAttribute("id", `id${category.id}`);
    categoryTitle.textContent = category.name;
    categoryContainer.appendChild(categoryTitle);
    container.appendChild(categoryContainer);

    categoryContainer.addEventListener("click", () => {
      const categoryName = category.name;
      location.hash = `#category=${category.id}-${category.name}`;
    });
  });
}

// LLamados a las APIS
async function getTendingPreview() {
  const { data } = await api("trending/movie/week");
  const movies = data.results;

  createMovies(movies, articleT);
}

async function getCategoryPreview() {
  const { data } = await api("genre/movie/list");
  const categories = data.genres;
  createCategory(categories, categoriesC);
}
async function getCategory(id, name_genre) {
  const { data } = await api("/discover/movie", {
    params: {
      with_genres: id,
    },
  });
  const movies = data.results;

  createMovies(movies, articleT);
}

async function movieBySearch(query_S) {
  const { data } = await api("/search/movie", {
    params: {
      query: query_S,
    },
  });
  const movies = data.results;
  createMovies(movies, articleT);
}
async function getTending() {
  const { data } = await api("trending/movie/week");
  const movies = data.results;
  createMovies(movies, articleT);
}

async function movieDatail(id) {
  const { data } = await api(`/movie/${id}`);
  console.log(data);
  movieDI.innerHTML = "";
  const imgCover = document.createElement("div");
  imgCover.setAttribute("class", "movie__detalle-img");

  imgCover.style.backgroundImage = `url(https://www.themoviedb.org/t/p/w440_and_h660_face/${data.backdrop_path})`;
  movieDI.appendChild(imgCover);
}
