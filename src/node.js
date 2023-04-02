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
const mainS = $(".main-search");

// Tendencias
const sectionT = $(".tendencias");
const titleT = $(".tendencias-title");
const buttonT = $(".tendencias-title button");
const articleT = $(".tendencias-article");
// Movie Detail
const movieDI = $(".movie__detalle--container-img");
const movieDC = $(".movie__detalle-text");
// Category
const sectionC = $(".categoria");
const titleC = $(".categoria-title");
const listC = $(".categoria-list");
const categoriesC = $(".categories-container");
