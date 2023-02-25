"use strict";

//Variables
//Obtener los datos del servidor
//Pintar los datos del cóctel (imagen y nombre)

//Global variables: getting from HTML
const input = document.querySelector(".js_descSearch"); //what of someone type insside input
const placeholder =
  "https://via.placeholder.com/210x295/ffffff/666666/?text=TV"; //img url of random image
const urlCocktails = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=margarita`;
const btnSearch = document.querySelector(".js_btnSearch"); //search button
const Cocktails = document.querySelector(".js_listCocktail"); //cocktails list
const favCocktail = document.querySelector(".js_listFavorites"); //Favorites cocktail list

let listCocktailData = []; //cocktail array
let listFavCocktailData = []; //favorites cocktail array

//localstorage
const cocktailStoraged = JSON.parse(localStorage.getItem("Cocktail"));
console.log(listFavCocktailData);

function getFavStorage (){
  if(cocktailStoraged){
listFavCocktailData = cocktailStoraged;
renderFavListCocktail(listFavCocktailData);}}
getFavStorage();


console.log(listFavCocktailData);
console.log(cocktailStoraged);

//1-Getting information of server. The information will show when user load the page. Each cocktail objets will be in cocktail array, (listCocktailData). Then, the function renderListCocktail, show the objetcs in the screen.
fetch(urlCocktails)
  .then((response) => response.json())
  .then((data) => {
    console.log(data);
    listCocktailData = data.drinks;
    console.log(listCocktailData);

    renderListCocktail(listCocktailData);
    
  });

//crear función pinta la lista de los cocteles
function renderListCocktail (listCocktailData) {
  Cocktails.innerHTML = "";
  for (const cocktail of listCocktailData) {
    Cocktails.innerHTML += renderCocktail(cocktail);
  }
  eventToCocktail();
};

//función para pintar un cóctel
function renderCocktail (cocktail) {
  if (!cocktail.strDrinkThumb) {
    cocktail.strDrinkThumb = placeholder;
  }
  let html = "";
  html += `<li> 
  <article class="js_liElement" id="${cocktail.idDrink}">
    <img class="img" src="${cocktail.strDrinkThumb}" alt="Foto Cocktail ${cocktail.strDrink}"> 
    <h3>${cocktail.strDrink}</h3>
  </article>
  </li>`;
  return html;
};

//función pinta la lista de favoritos
function renderFavListCocktail(listFavCocktail){
  favCocktail.innerHTML = "";
  for (const item of listFavCocktail) {
    favCocktail.innerHTML += renderCocktail(item);
  }
};

//función manejadora de click buscar
const handleClickSearch = (ev) => {
  ev.preventDefault();
  console.log("funciona");
  const valueDesc = input.value;
  const url = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${valueDesc}`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      listCocktailData = data.drinks;
      console.log(listCocktailData);

      renderListCocktail(listCocktailData);
    });
};

//2- Evento click en botón buscar
btnSearch.addEventListener("click", handleClickSearch);

//3- Favoritos: 3.1-seleccionar todos los elementos de la lista: añadir una clase en todos los li. 3.2-

//función manejadora de eventToCocktail
const handleClickCocktail = (ev) => {
  console.log("Me has seleccionado");
  console.log(ev.currentTarget.id);
  ev.currentTarget.classList.toggle("selected");
  const idSelected = ev.currentTarget.id;
  //buscar el objeto del coctel seleccionado en toda la lista de cocteles
  const cocktailSelected = listCocktailData.find(
    (cocktail) => cocktail.idDrink === idSelected
  );
  console.log(cocktailSelected);
  //buscar la posición del coctel en mi lista de favoritos. si es -1 no está en esa lista y hay que ponerlo
  const indexCocktail = listFavCocktailData.findIndex(
    (cocktail) => cocktail.idDrink === idSelected
  );
  console.log(indexCocktail);
  if (indexCocktail === -1) {
    listFavCocktailData.push(cocktailSelected);
    console.log(listFavCocktailData);
  } else {
    listFavCocktailData.splice(indexCocktail, 1);
  }
  //pintar la lista de favoritos con función renderFavListCocktail
  renderFavListCocktail(listFavCocktailData);
  //4Localstorage: qué voy a guardar y en qué momento. Guardar la lista de favoritos cuando se haga click en uno de los elementos.
  localStorage.setItem(
    "Cocktail",
    JSON.stringify(listFavCocktailData)
  );
};

//función que se ejecuta una vez cogidos los datos del servidor e incluye un evento click en cada coctel
const eventToCocktail = () => {
  const liElementCocktail = document.querySelectorAll(".js_liElement"); //elementos de li
  //hacer bucle para que me seleccione todos los elementos y añadirle un evento click a cada uno de ellos
  for (const item of liElementCocktail) {
    item.addEventListener("click", handleClickCocktail);
  }
};
