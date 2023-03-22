const ApiUrl = "https://mindhub-xj03.onrender.com/api/amazing"

const nodoTarjetas = document.getElementById('card-container');
const nodoSearch = document.getElementById('search');
const nodoInputSearch = document.getElementById('input-search');

let arrayChk = document.querySelectorAll('.chk-box');
const nodoChk = document.getElementById('fieldset');

let datos = [];
let arrayActual = [];
let arrayCategory = [];

let arrayBoxes = []; 
let arrayBoxesFiltrados = [];




/*  crearTarjetas():
                crea un string con las tarjetas en html y luego las dibuja
    Parametros   
                arrayData:array con los todos los eventos
                nodo: nodo donde insertar el contenido html             
*/
function crearTarjetas(arrayData, nodo) {
    let stringTarjeta = "";
    arrayData.forEach(dato => {
        stringTarjeta += `<div class="col-sm-11 col-md-5 col-lg-4 col-xxl-3 mt-4 mb-4 d-flex justify-content-center">
        <div class="card" style="width: 18rem;">
            <img src="${dato.image}" class="card-img-top" alt="...">
            <div class="card-body d-flex flex-column" style="background-color:#dadcdd">
                <h5 class="card-title">${dato.name}</h5>
                <p class="card-text flex-grow-1">${dato.description}</p>
                <p>Date: ${dato.date} </p>
                <div class="card-bottom d-flex flex-row justify-content-between">
                    <div>Price $${dato.price}</div>
                    <a href="details.html?id=${dato._id}" class="btn btn-primary">See more...</a>
                </div>
            </div>
        </div>
    </div>`
        return;
    });
    nodo.innerHTML = stringTarjeta;
}
/*  searchFilter(): 
                Filtra los datos del array segun los datos en el input search
    Parametros: 
                arrayData:      array de eventos 
                nodo:           nodo del input con el texto para filtrar
    Retorna 
                arraySearch:    array filtrado con los elementos que contengan el texto del input
                                
*/
function searchFilter(arrayData, nodo) {
    let searchValue = nodo.value.toLowerCase();
    let arraySearch = arrayData.filter((data) => data.category.toLowerCase().includes(searchValue) || data.name.toLowerCase().includes(searchValue) || data.description.toLowerCase().includes(searchValue) || data.place.toLowerCase().includes(searchValue))
    return arraySearch;
}

/*  onSearch():
                Funcion que se activa con un evento en el input search
     Parametros:                           
                evento:         evento el cual se activa y se llama a la funcion
                arrayData:      array de eventos 
                input:          nodo del input con el texto para filtrar
                tarjeta:        nodo donde insertar las tarjetas

                aChk:           array con los nodos correspondientes a los checkbox                              
*/
function onSearch(evento, arrayData, input, aDatos, aChk) {
    if (input.value == "" || evento.key == "Backspace") { //si el buscador esta vacio o si borro vuelvo a llenar el array para luego filtrar
       arrayData = aDatos;
    }
    arrayData = filtroDoble(aDatos,input,nodoTarjetas)
    return arrayData;
}
/*  clickSearch():
                Funcion que se activa al clickear el boton search o presionar enter en el input search
    Parametros: 
                evento:         evento el cual se activa y se llama a la funcion
                arrayData:      array de eventos 
                input:          nodo del input con el texto para filtrar
                tarjeta:        nodo donde insertar las tarjetas

                aChk:           array con los nodos correspondientes a los checkbox                           
*/
function clickSearch(evento, arrayData, input,  aDatos) {
    evento.preventDefault();
    filtroDoble(aDatos,input,nodoTarjetas)
    return arrayData;
}



function filtrarCheck( arrayData) {
    let dataBoxes = [];
    arrayBoxes = getChecked();
    if(arrayBoxes.length>0){
         dataBoxes = arrayData.filter(dato => arrayBoxes.includes(dato.category))
    }
        else 
            dataBoxes=arrayData;
    return dataBoxes;
}

function getChecked() {
    let boxes = [];
    arrayChk.forEach(dato => {
        if (dato.checked) {
            if (!boxes.includes(dato.value)) {
                boxes.push(dato.value);
            }
        }          
    })
    return boxes;   
}

function getCategory(arrayData) {
    arrayData.forEach(element => {
        if (!arrayCategory.includes(element.category)) {
            arrayCategory.push(element.category)
        }
    });
}



/* getEvents()
    obtiene el array de elementos de la api

*/
async function getEvents() {
    let arrayJson
    await fetch(ApiUrl)
        .then(response => response.json())
        .then(dataJson => {
            arrayJson = dataJson;
            datos = arrayJson.events;
            arrayActual = arrayJson.events;
            getCategory(datos);
            crearTarjetas(arrayActual, nodoTarjetas);
            crearCheckBoxes(arrayCategory, nodoChk)
        })
        .catch(() => console.log(error.message))
}

function crearCheckBoxes(categorias, nodo) {
    let stringCheckBoxes = "";
    categorias.forEach(dato => {
        stringCheckBoxes += `<div class="chk-container"><input type="checkbox" class="chk-box" name="${dato}" id="${dato}" value="${dato}"
        ><label for="${dato}">${dato}</label>
        </div>`
    });
    nodo.innerHTML = stringCheckBoxes;
    arrayChk = document.querySelectorAll('.chk-box');// despues de crearlos les agrego el escuchador
    arrayChk.forEach((nodo) => nodo.addEventListener('change', () => filtroDoble(datos,nodoInputSearch,nodoTarjetas)))
}


function filtroDoble(arrayData,nodo,tarjeta) {
    let arrayDobleFiltrado = filtrarCheck(arrayData);
    arrayDobleFiltrado = searchFilter(arrayDobleFiltrado, nodo);
    crearTarjetas(arrayDobleFiltrado, tarjeta)
}

/*inicializo*/
function init() {
    getEvents();

    nodoSearch.addEventListener('click', (e) => arrayActual = clickSearch(e, arrayData, nodoInputSearch,  datos));
    nodoInputSearch.addEventListener('click', (e) => arrayActual = onSearch(e, arrayActual, nodoInputSearch,  datos));
    nodoInputSearch.addEventListener('keyup', (e) => arrayActual = onSearch(e, arrayActual, nodoInputSearch,  datos));
    nodoInputSearch.addEventListener('search', (e) => arrayActual = onSearch(e, arrayActual, nodoInputSearch,  datos));
    //arrayChk.forEach((nodo) => nodo.addEventListener('change', () => arrayActual = filtrarCheck(nodo, arrayActual, datos, nodoTarjetas, nodoInputSearch)));
}

init();