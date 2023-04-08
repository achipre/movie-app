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
const likedMovieList = () => {
  const ITEM = localStorage.getItem("AddFav");
  const MOVIES = ITEM ? JSON.parse(ITEM) : {};

  return MOVIES;
};

function toggleFav(movie) {
  const likeado = likedMovieList();
  if (likeado[movie.id]) {
    likeado[movie.id] = undefined;
  } else {
    likeado[movie.id] = movie;
  }
  localStorage.setItem("AddFav", JSON.stringify(likeado));
}
// Utils
const lazyLoader = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const url = entry.target.getAttribute("data-src");
      entry.target.setAttribute("src", url);
    }
  });
});
function createMovies(
  movies,
  container,
  { lazyLoad = true, cleanContainer = true } = {}
) {
  if (cleanContainer) {
    container.innerHTML = "";
  }
  movies.forEach((movie) => {
    const movieContainer = document.createElement("div");
    movieContainer.classList.add("movie-container");
    movieContainer.style.position = "relative";
    const movieImg = document.createElement("img");

    const favContainer = document.createElement("div");
    favContainer.classList.add("movie-container");
    favContainer.style.cssText =
      "position: absolute; top: 0; width: 20%;top: 0px; width: 20%; height: 20%; right: 6px; background-color: transparent;";

    const favImg = document.createElement("img");
    const favImgActive = document.createElement("img");
    favImg.setAttribute("src", "./img/heart.svg");
    favImgActive.setAttribute("src", "./img/heart-active.svg");
    favImg.style.cssText =
      "min-height: 100%; background-color: transparent; filter: drop-shadow(5px 5px 10px black); position: absolute; z-index: 0";
    favImgActive.style.cssText =
      "min-height: 100%; background-color: transparent; filter: drop-shadow(5px 5px 10px black); position: absolute; z-index: 0";
    favContainer.appendChild(favImgActive);
    favContainer.appendChild(favImg);
    likedMovieList()[movie.id] && favImgActive.classList.add("active-fav");
    favContainer.addEventListener("click", () => {
      toggleFav(movie);
      favImgActive.classList.toggle("active-fav");
      likedMoviesSection();
    });

    movieImg.addEventListener("click", () => {
      location.hash = `#movie=${movie.id}`;
    });
    movieImg.classList.add("movie-img");

    movieImg.setAttribute("alt", movie.title);

    movieImg.setAttribute(
      lazyLoad ? "data-src" : "src",
      movie.poster_path == null
        ? "./img/imgerror.png"
        : "https://image.tmdb.org/t/p/w300/" + movie.poster_path
    );
    if (lazyLoad) {
      lazyLoader.observe(movieImg);
    }
    movieContainer.appendChild(movieImg);
    movieContainer.appendChild(favContainer);
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
async function getCategory(id) {
  const { data } = await api("/discover/movie", {
    params: {
      with_genres: id,
    },
  });
  const movies = data.results;
  pageMAx = data.total_pages;
  createMovies(movies, sectionMCM);
}
function showMoreC(id) {
  return async function () {
    const { clientHeight, scrollHeight, scrollTop } = document.documentElement;
    const isScrollDown = scrollTop + clientHeight >= scrollHeight;
    const isNotMax = page < pageMAx;
    if (isScrollDown && isNotMax) {
      page++;
      const { data } = await api("/discover/movie", {
        params: {
          with_genres: id,
          page,
        },
      });
      const movies = data.results;
      setTimeout(() => {
        createMovies(movies, sectionMCM, {
          lazyLoad: true,
          cleanContainer: false,
        });
      }, 500);
    }
  };
}

async function movieBySearch(query_S) {
  const { data } = await api("/search/movie", {
    params: {
      query: query_S,
    },
  });
  const movies = data.results;
  pageMAx = data.total_pages;
  createMovies(movies, mainSM);
}
function showMoreS(query_S) {
  return async function () {
    const { clientHeight, scrollHeight, scrollTop } = document.documentElement;
    const isScrollDown = scrollTop + clientHeight >= scrollHeight;
    const isNotMax = page < pageMAx;
    if (isScrollDown && isNotMax) {
      page++;
      const { data } = await api("/search/movie", {
        params: {
          query: query_S,
          page,
        },
      });
      const movies = data.results;
      setTimeout(() => {
        createMovies(movies, mainSM, {
          lazyLoad: true,
          cleanContainer: false,
        });
      }, 500);
    }
  };
}

async function getTending() {
  const { data } = await api("trending/movie/week");
  const movies = data.results;
  pageMAx = data.total_pages;
  createMovies(movies, sectionMTM, {
    lazyLoad: true,
    cleanContainer: true,
  });
}
async function showMoreT() {
  const { clientHeight, scrollHeight, scrollTop } = document.documentElement;
  const isScrollDown = scrollTop + clientHeight >= scrollHeight;
  if (isScrollDown && pageMAx) {
    page++;
    const { data } = await api("trending/movie/week", {
      params: {
        page,
      },
    });
    const movies = data.results;
    setTimeout(() => {
      createMovies(movies, sectionMTM, {
        lazyLoad: true,
        cleanContainer: false,
      });
    }, 500);
  }
}
async function backdorImgen(id) {
  const { data } = await api(`movie/${id}/images`);
  // const categories = data.genres;
  // console.log(data);
  // createCategory(categories, movieDGC);
  // const imgCover = document.createElement("div");
  // imgCover.setAttribute("class", "movie__detalle-img");

  // console.log(
  //   `url(https://www.themoviedb.org/t/p/w780/${data.backdrops[2].file_path})`
  // );
  // imgCover.style.backgroundImage = `url(https://www.themoviedb.org/t/p/w780/${data.poster_path})`;
  // movieDI.appendChild(imgCover);
}
async function movieDatail(id) {
  const { data } = await api(`/movie/${id}`);
  movieDI.innerHTML = "";
  movieDTHT.innerHTML = data.title;
  movieDS.innerHTML = data.vote_average;
  movieDDT.innerHTML = data.overview;
  const categories = data.genres;
  createCategory(categories, movieDGC);
  const imgCover = document.createElement("div");
  imgCover.setAttribute("class", "movie__detalle-img");

  imgCover.style.backgroundImage = `url(https://image.tmdb.org/t/p/w780/${data.poster_path})`;
  movieDI.appendChild(imgCover);
}
async function getRecomendation(id) {
  const { data } = await api(`/movie/${id}/recommendations`);
  const movies = data.results;
  createMovies(movies, movieDSM);
}

function likedMoviesSection() {
  const likesMovies = likedMovieList();
  const moviesArray = Object.values(likesMovies);
  createMovies(moviesArray, sectionFC, {
    lazyLoad: true,
    cleanContainer: true,
  });
}
