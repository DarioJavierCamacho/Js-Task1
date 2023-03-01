const datos = data.events;
const fechaActual = data.currentDate;

const nodoTarjetas = document.getElementById('card-container');
const nodoSearch = document.getElementById('search');
const nodoInputSearch = document.getElementById('input-search');

const nodoFFChk = document.getElementById('Food-Fair');
const nodoMusChk = document.getElementById('Museum');
const nodoCostPartyChk = document.getElementById('Costume-Party');
const nodoMusicChk = document.getElementById('Music-Concert');
const nodoRaceChk = document.getElementById('Race');
const nodoBookExChk = document.getElementById('Book-Exchange');
const nodoCinemaChk = document.getElementById('Cinema');


/*Parametros    
                arrayData: array con los eventos
                fecActual: fecha actual con la cual comparar los eventos
*/

function filtrarFuturo(arrayData, fecActual) {
    let arrayFuturo = arrayData.filter(dato => dato.date > fecActual);
    return arrayFuturo;
}

/* Parametros   
                nodo: nodo donde insertar el contenido html
                futuros:array con los eventos futuros
*/

function crearTarjetas(futuros, nodo) {
    let stringTarjeta = "";
    futuros.forEach(futuro => {
        stringTarjeta += `<div class="col-sm-11 col-md-5 col-lg-4 col-xxl-3 mt-4 mb-4 d-flex justify-content-center">
        <div class="card" style="width: 18rem;">
            <img src="${futuro.image}" class="card-img-top" alt="...">
            <div class="card-body d-flex flex-column">
                <h5 class="card-title">${futuro.name}</h5>
                <p class="card-text flex-grow-1">${futuro.description}</p>
                <div class="card-bottom d-flex flex-row justify-content-between">
                    <div>Price $${futuro.price}</div>
                    <a href="#" class="btn btn-primary">See more...</a>
                </div>
            </div>
        </div>
    </div>`
        return;
    });

    nodo.innerHTML = stringTarjeta;
}


/*  Parametros: 
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

/*  Parametros: 
                evento:         evento el cual se activa y se llama a la funcion
                arrayData:      array de eventos 
                input:          nodo del input con el texto para filtrar
                tarjeta:        nodo donde insertar las tarjetas

                foodfair, museum, party, music, race, book, cinema:  nodos correspondientes a los checkbox                              
*/
function clickSearch(evento, arrayData, input, tarjeta, aDatos, foodfair, museum, party, music, race, book, cinema) {
    evento.preventDefault();
    if (input.value == "") {
        arrayData = aDatos.filter((aDato) => (foodfair.checked && aDato.category == foodfair.value) || (museum.checked && aDato.category == museum.value) || (party.checked && aDato.category == party.value) || (music.checked && aDato.category == music.value) || (race.checked && aDato.category == race.value) || (book.checked && aDato.category == book.value) || (cinema.checked && aDato.category == cinema.value));
    }
    crearTarjetas(arrayData = searchFilter(arrayData, input), tarjeta);

    return arrayData;
}


/*  Parametros:
                checkBox: nodo perteneciente al checkbox que cambio su estado
                arrayAct: array que contiene los elementos filtrados por input search y checkbox
                arrayData: array con todos los elementos que necesita la pagina
                tarjeta: nodo donde insertar las tarjetas
                input: nodo del input con el texto para filtrar
                */

function filtrarCheck(checkBox, arrayAct, arrayData, tarjeta, input) {
    if (checkBox.checked) {
        arrayData.forEach((data) => {
            if (data.category == checkBox.value) {
                if (data.category.toLowerCase().includes(input.value.toLowerCase()) || data.name.toLowerCase().includes(input.value.toLowerCase()) || data.description.toLowerCase().includes(input.value.toLowerCase()) || data.place.toLowerCase().includes(input.value.toLowerCase())) {
                    arrayAct.push(data);
                }
            }
        });
    } else {
        arrayAct = arrayAct.filter((actual) => actual.category != checkBox.value);
    }
    arrayAct.sort((a, b) => {
        const _idA = a._id;
        const _idB = b._id;
        if (_idA < _idB) {
            return -1;
        }
        if (_idA > _idB) {
            return 1;
        }

        // names must be equal
        return 0;
    });
    crearTarjetas(arrayAct, tarjeta)
    return arrayAct;
}

/*inicializo*/

function init() {
    let aFuturo = filtrarFuturo(datos, fechaActual); // array filtrado con eventos futuros
    let arrayActual = aFuturo;   //array actual para usar filtro de input search y checkbox

    crearTarjetas(arrayActual, nodoTarjetas);
    nodoSearch.addEventListener('click', (e) => arrayActual = clickSearch(e, arrayActual, nodoInputSearch, nodoTarjetas, aFuturo, nodoFFChk, nodoMusChk, nodoCostPartyChk, nodoMusicChk, nodoRaceChk, nodoBookExChk, nodoCinemaChk));

    nodoFFChk.addEventListener('click', () => arrayActual = filtrarCheck(nodoFFChk, arrayActual, aFuturo, nodoTarjetas, nodoInputSearch));
    nodoMusChk.addEventListener('click', () => arrayActual = filtrarCheck(nodoMusChk, arrayActual, aFuturo, nodoTarjetas, nodoInputSearch));
    nodoCostPartyChk.addEventListener('click', () => arrayActual = filtrarCheck(nodoCostPartyChk, arrayActual, aFuturo, nodoTarjetas, nodoInputSearch));
    nodoMusicChk.addEventListener('click', () => arrayActual = filtrarCheck(nodoMusicChk, arrayActual, aFuturo, nodoTarjetas, nodoInputSearch));
    nodoRaceChk.addEventListener('click', () => arrayActual = filtrarCheck(nodoRaceChk, arrayActual, aFuturo, nodoTarjetas, nodoInputSearch));
    nodoBookExChk.addEventListener('click', () => arrayActual = filtrarCheck(nodoBookExChk, arrayActual, aFuturo, nodoTarjetas, nodoInputSearch));
    nodoCinemaChk.addEventListener('click', () => arrayActual = filtrarCheck(nodoCinemaChk, arrayActual, aFuturo, nodoTarjetas, nodoInputSearch));

}

init();


