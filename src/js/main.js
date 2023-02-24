"use strict";

//Variables
//Obtener los datos del servidor
//Pintar los datos del cóctel (imagen y nombre)
const descCocktail = document.querySelector(".js_descSearch"); //cóctel que busco
const placeholder =
  "https://via.placeholder.com/210x295/ffffff/666666/?text=TV";
const urlmargarita = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=margarita`;
const btnSearch = document.querySelector(".js_btnSearch"); //botón de buscar
const listCocktail = document.querySelector(".js_listCocktail"); //lista de cocteles
const listCocktailFav = document.querySelector(".js_listFavorites"); //lista favoritos
let listCocktailData = []; //array de cocteles
let listFavCocktail = []; //array de cocteles favoritos




//crear función pinta la lista de los cocteles
const renderListCocktail = (listCocktailData) => {
  listCocktail.innerHTML = "";
  for (const cocktail of listCocktailData) {
    listCocktail.innerHTML += renderCocktail(cocktail);
  }
  eventToCocktail();
};

//función pinta la lista de favoritos
const renderFavListCocktail = (listFavCocktail) => {
  listCocktailFav.innerHTML = "";
  for (const item of listFavCocktail) {
    listCocktailFav.innerHTML += renderCocktail(item);
  }
};

//función para pintar un cóctel
const renderCocktail = (cocktail) => {
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

//función manejadora de click buscar
const handleClickSearch = (ev) => {
  ev.preventDefault();
  console.log("funciona");
  const valueDesc = descCocktail.value;
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
    ev.currentTarget.classList.toggle('selected');
    const idSelected = ev.currentTarget.id;
    //buscar el objeto del coctel seleccionado en toda la lista de cocteles
    const cocktailSelected = listCocktailData.find(cocktail=>cocktail.idDrink === idSelected);
    console.log(cocktailSelected);
    //buscar la posición del coctel en mi lista de favoritos. si es -1 no está en esa lista y hay que ponerlo
    const indexCocktail= listFavCocktail.findIndex(cocktail=>cocktail.idDrink===idSelected);
    console.log(indexCocktail);
    if(indexCocktail === -1){
      listFavCocktail.push(cocktailSelected);
      console.log(listFavCocktail);
    } else {
      listFavCocktail.splice(indexCocktail,1);
     }
     const indexCocktailPost= listFavCocktail.findIndex(cocktail=>cocktail.idDrink===idSelected);
     console.log(indexCocktailPost);
    //pintar la lista de favoritos con función renderFavListCocktail
    renderFavListCocktail(listFavCocktail);
    //4Localstorage: qué voy a guardar y en qué momento. Guardar la lista de favoritos cuando se haga click en uno de los elementos. 
    localStorage.setItem('Cocktail_favorito', JSON.stringify(listFavCocktail));
    
  };



//función que se ejecuta una vez cogidos los datos del servidor e incluye un evento click en cada coctel 
const eventToCocktail = () => {
  const liElementCocktail = document.querySelectorAll(".js_liElement"); //elementos de li
  //hacer bucle para que me seleccione todos los elementos y añadirle un evento click a cada uno de ellos
  for (const item of liElementCocktail) {
    item.addEventListener("click", handleClickCocktail);
  }

};


//1-Llamada al servidor para que salga de primeras la lista de margaritas
fetch(urlmargarita)
  .then((response) => response.json())
  .then((data) => {
    console.log(data);
    listCocktailData = data.drinks;
    console.log(listCocktailData);

    renderListCocktail(listCocktailData);
    
  });

//localstorage
const cocktailStoraged = JSON.parse(localStorage.getItem('Cocktail_favorito'));
listFavCocktail=cocktailStoraged;
renderFavListCocktail(listFavCocktail);
