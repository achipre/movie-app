let page = 1;
let pageMAx;
let infinite;
window.addEventListener("scroll", infinite, { passive: false });
window.addEventListener("DOMContentLoaded", navigator, false);
window.addEventListener("hashchange", navigator, false);

arrowT.addEventListener("click", () => {
  history.go(0);
  if (location.href.includes(location.host)) {
    history.back();
  } else {
    location.hostname = "#home";
  }
});
function navigator() {
  if (infinite) {
    window.removeEventListener("scroll", infinite);
    infinite = undefined;
  }
  if (location.hash.startsWith("#trends")) {
    trendsPage();
    infinite = showMoreT;
  } else if (location.hash.startsWith("#search=")) {
    searchPage();
  } else if (location.hash.startsWith("#movie=")) {
    moviePage();
    window.scrollTo(0, 0);
  } else if (location.hash.startsWith("#category=")) {
    categoryPage();
    window.scrollTo(0, 0);
  } else {
    homePage();
  }
  if (infinite) {
    window.addEventListener("scroll", infinite);
    infinite = undefined;
  }
}
function homePage() {
  sectionS.classList.remove("inactive");
  sectionT.classList.remove("inactive");
  sectionMT.classList.add("inactive");
  titleT.classList.remove("inactive");
  sectionMC.classList.add("inactive");
  movieD.classList.add("inactive");
  movieDT.classList.add("inactive");
  sectionC.classList.remove("inactive");
  titleS.classList.add("inactive");
  barS.classList.remove("inactive");
  main.classList.remove("inactive");

  sectionF.classList.remove("inactive");
  mainS.classList.add("inactive");

  btnLogoS.addEventListener("click", () => {
    location.hash = "#search=" + inputS.value;
  });
  buttonT.addEventListener("click", () => {
    location.hash = "#trends";
  });
  getTendingPreview();
  getCategoryPreview();
  likedMoviesSection();
}
function trendsPage() {
  sectionS.classList.remove("inactive");
  sectionS.style.display = "block";
  sectionT.classList.add("inactive");
  sectionMT.classList.remove("inactive");
  titleT.classList.add("inactive");
  sectionC.classList.add("inactive");
  titleS.classList.remove("inactive");
  titleGS.classList.remove("inactive");
  barS.classList.add("inactive");
  main.classList.remove("inactive");
  mainS.classList.add("inactive");
  movieD.classList.add("inactive");
  movieDT.classList.add("inactive");
  sectionF.classList.add("inactive");
  titleGS.innerHTML = "Tendencias";
  getTending();
}

function searchPage() {
  sectionS.classList.remove("inactive");
  sectionS.style.display = "flex";
  sectionS.style.flexDirection = "row";
  sectionS.style.alignItems = "center";
  barS.style.width = "100%";
  sectionT.classList.add("inactive");
  titleT.classList.add("inactive");
  sectionC.classList.add("inactive");
  sectionMTM.classList.add("inactive");
  titleS.classList.remove("inactive");
  titleS.style.paddingBottom = 0;
  titleS.style.paddingRight = "1rem";
  titleGS.classList.add("inactive");
  barS.classList.remove("inactive");
  main.classList.remove("inactive");
  mainS.classList.remove("inactive");
  movieDT.classList.add("inactive");
  movieDI.classList.add("inactive");
  sectionF.classList.add("inactive");
  // history.go(0);
  inputS.value = location.hash.split("=")[1];

  btnLogoS.addEventListener("click", () => {
    location.hash = "#search=" + inputS.value.split(" ").join();
  });
  const query_S = location.hash.split("=")[1];
  movieBySearch(query_S);
  infinite = showMoreS(query_S);
}
function moviePage() {
  body.style.padding = "0";
  headerT.style.backgroundColor = "transparent";
  sectionS.classList.remove("inactive");
  titleS.classList.remove("inactive");
  sectionS.style.backgroundColor = "transparent";
  titleS.style.backgroundColor = "transparent";
  sectionT.style.backgroundColor = "transparent";
  arrowT.style.backgroundColor = "transparent";
  arrowT.classList.remove("inactive");
  titleGS.classList.add("inactive");
  barS.classList.add("inactive");
  main.classList.add("inactive");
  sectionT.classList.add("inactive");
  sectionMT.classList.add("inactive");
  sectionC.classList.add("inactive");
  movieDT.classList.remove("inactive");
  movieD.classList.remove("inactive");
  movieDI.classList.remove("inactive");
  sectionF.classList.add("inactive");
  movieDSM.scrollTo(0, 0);
  const imgCoverId = location.hash.split("=")[1];
  backdorImgen(imgCoverId);
  movieDatail(imgCoverId);
  getRecomendation(imgCoverId);
}
function categoryPage() {
  sectionS.classList.remove("inactive");
  sectionS.style.display = "block";
  sectionT.classList.add("inactive");
  sectionMT.classList.add("inactive");
  titleT.classList.add("inactive");
  titleGS.classList.remove("inactive");
  sectionC.classList.add("inactive");
  sectionMC.classList.remove("inactive");
  titleS.classList.remove("inactive");
  movieDT.classList.add("inactive");
  movieD.classList.add("inactive");
  barS.classList.add("inactive");
  main.classList.remove("inactive");
  mainS.classList.add("inactive");
  sectionF.classList.add("inactive");

  const id_genre = location.hash.split("=")[1].split("-")[0];
  const name_genre = location.hash.split("=")[1].split("-")[1];
  titleGS.innerHTML = name_genre;
  getCategory(id_genre);
  infinite = showMoreC(id_genre);
}
