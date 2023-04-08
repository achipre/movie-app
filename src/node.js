const $ = (id) => document.querySelector(id);
// Body
const body = $("body");
// header
const header = $("header");
const headerT = $("header h1");

// Search
const sectionS = $(".search");
const arrowT = $(".search-title svg");
const titleS = $(".search-title");
const titleGS = $(".search-title h2");
const barS = $(".bar-search");
const inputS = $(".search-input");
const inputSV = inputS.value;
const btnLogoS = $(".icon-search");
// Main Search
const main = $("main");
const mainS = $(".main-search");
const mainSM = $(".main-search-movies");

// Tendencias
const sectionT = $(".tendencias");
const titleT = $(".tendencias-title");
const buttonT = $(".tendencias-title button");
const articleT = $(".tendencias-article");
// Main Tendencias
const sectionMT = $(".main-tendencia");
const sectionMTM = $(".main-tendencia-movies");
// Main Category
const sectionMC = $(".main-category");
const sectionMCM = $(".main-category-movies");
// Movie Detail
const movieD = $(".movie__detalle");
const movieDI = $(".movie__detalle--container-img");
const movieDT = $(".movie__detalle-text");
const movieDTHT = $(".movie__detalle--text-header-title");
const movieDS = $(".stars");
const movieDDT = $(".movie__detalle--description-text");
const movieDGC = $(".movie__detalle--genre-container");
const movieDSM = $(".movie__detalle--similar-movie");
// Category
const sectionC = $(".categoria");
const titleC = $(".categoria-title");
const listC = $(".categoria-list");
const categoriesC = $(".categories-container");
// Fvorite
const sectionF = $(".favorites");
const sectionFC = $(".favorites-list");
