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
  if (location.hash.startsWith("#trends")) {
    trendsPage();
  } else if (location.hash.startsWith("#search=")) {
    searchPage();
  } else if (location.hash.startsWith("#movie=")) {
    moviePage();
  } else if (location.hash.startsWith("#category=")) {
    categoryPage();
    window.scrollTo(0, 0);
  } else {
    homePage();
  }
}
function homePage() {
  sectionS.classList.remove("inactive");
  sectionT.classList.remove("inactive");
  titleT.classList.remove("inactive");
  sectionC.classList.remove("inactive");
  titleS.classList.add("inactive");
  barS.classList.remove("inactive");
  mainS.classList.add("inactive");

  btnLogoS.addEventListener("click", () => {
    location.hash = "#search=" + inputS.value;
  });
  buttonT.addEventListener("click", () => {
    location.hash = "#trends";
  });
  getTendingPreview();
  getCategoryPreview();
}
function trendsPage() {
  sectionS.classList.remove("inactive");
  sectionS.style.display = "block";
  sectionT.classList.remove("inactive");
  titleT.classList.add("inactive");
  sectionC.classList.add("inactive");
  titleS.classList.remove("inactive");
  titleGS.classList.remove("inactive");
  barS.classList.add("inactive");
  mainS.classList.add("inactive");
  titleGS.innerHTML = "Tendencias";
  getTending();
}

function searchPage() {
  sectionS.classList.remove("inactive");
  sectionS.style.display = "flex";
  sectionS.style.flexDirection = "row";
  sectionS.style.alignItems = "center";
  barS.style.width = "100%";
  sectionT.classList.remove("inactive");
  titleT.classList.add("inactive");
  sectionC.classList.add("inactive");
  titleS.classList.remove("inactive");
  titleS.style.paddingBottom = 0;
  titleS.style.paddingRight = "1rem";
  titleGS.classList.add("inactive");
  barS.classList.remove("inactive");
  mainS.classList.add("inactive");
  movieDI.classList.add("inactive");
  // history.go(0);
  inputS.value = location.hash.split("=")[1];

  btnLogoS.addEventListener("click", () => {
    location.hash = "#search=" + inputS.value.split(" ").join();
  });
  const query_S = location.hash.split("=")[1];
  movieBySearch(query_S);
}
function moviePage() {
  body.style.background =
    "linear-gradient(180deg, rgba(0,0,0,1) 15%, rgba(255,255,255,0) 100%)";
  header.style.backgroundColor = "transparent";
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
  mainS.classList.add("inactive");
  sectionT.classList.add("inactive");
  sectionC.classList.add("inactive");
  movieDI.classList.remove("inactive");
  const imgCoverId = location.hash.split("=")[1];
  movieDatail(imgCoverId);
}
function categoryPage() {
  sectionS.classList.remove("inactive");
  sectionS.style.display = "block";
  sectionT.classList.remove("inactive");
  titleT.classList.add("inactive");
  titleGS.classList.remove("inactive");
  sectionC.classList.add("inactive");
  titleS.classList.remove("inactive");
  barS.classList.add("inactive");
  mainS.classList.add("inactive");

  const id_genre = location.hash.split("=")[1].split("-")[0];
  const name_genre = location.hash.split("=")[1].split("-")[1];
  titleGS.innerHTML = name_genre;
  getCategory(id_genre);
}
