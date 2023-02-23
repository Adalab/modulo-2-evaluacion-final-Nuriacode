'use strict';

//Variables
//Obtener los datos del servidor
//Pintar los datos del cóctel (imagen y nombre)

const descCocktail = document.querySelector('.js_descSearch'); //cóctel que busco
const btnSearch = document.querySelector('.js_btnSearch'); //botón de buscar
const listCocktail = document.querySelector('.js_listCocktail'); //lista de cocteles que vienen del servidor
let listCocktailData=[];

//crear función render de los coteles que va a ir detrás dentro de handleclick




//función manejadora de click buscar
const handleClickSearch = (ev) => {
    ev.preventDefault();
    console.log('funciona');

    fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=margarita')
    .then(response => response.json())
    .then(data=>{
        console.log(data);
        listCocktailData=data.drinks
        console.log(listCocktailData)
        
    })
}


btnSearch.addEventListener('click',handleClickSearch); //evento click en botón buscar