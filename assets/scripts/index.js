const ApiUrl = "./amazing1.json"

const nodoTarjetas = document.getElementById('card-container');
const nodoSearch = document.getElementById('search');
const nodoInputSearch = document.getElementById('input-search');

const arrayChk = document.querySelectorAll('.chk-box');

let datos = [];
let arrayActual = [];
/* getEvents()
    obtiene el array de elementos de la api

*/
async function getEvents(){
    let arrayJson
    await fetch(ApiUrl)
    .then(response => response.json() )
    .then(dataJson => {
        arrayJson = dataJson;
        datos = arrayJson.events;
        arrayActual = arrayJson.events;
       crearTarjetas(arrayActual,nodoTarjetas);
    })
    .catch(()=>console.log(error.message))
}

/* getCurrentDAte()
    obtiene la fecha actual de la api

*/
async function getCurrentDate(){
    let arrayJson
    await fetch(ApiUrl)
    .then(response => response.json() )
    .then(dataJson => {
        arrayJson = dataJson.currentDate;
        return arrayJson;
    })
    .catch(()=>console.log(error.message))
}
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
function onSearch(evento, arrayData, input, tarjeta, aDatos, aChk) {
    if (input.value == "" || evento.key == "Backspace") { //si el buscador esta vacio o si borro vuelvo a llenar el array para luego filtrar
        arrayData = aDatos.filter((aDato) => (aChk[0].checked && aDato.category == aChk[0].value) || (aChk[1].checked && aDato.category == aChk[1].value) || (aChk[2].checked && aDato.category == aChk[2].value) || (aChk[3].checked && aDato.category == aChk[3].value) || (aChk[4].checked && aDato.category == aChk[4].value) || (aChk[5].checked && aDato.category == aChk[5].value) || (aChk[6].checked && aDato.category == aChk[6].value));
    }
    crearTarjetas(arrayData = searchFilter(arrayData, input), tarjeta);

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
function clickSearch(evento, arrayData, input, tarjeta, aDatos, aChk) {
    evento.preventDefault();
    if (input.value == "" || evento.key == "Backspace") { //si el buscador esta vacio o si borro vuelvo a llenar el array para luego filtrar
        arrayData = aDatos.filter((aDato) => (aChk[0].checked && aDato.category == aChk[0].value) || (aChk[1].checked && aDato.category == aChk[1].value) || (aChk[2].checked && aDato.category == aChk[2].value) || (aChk[3].checked && aDato.category == aChk[3].value) || (aChk[4].checked && aDato.category == aChk[4].value) || (aChk[5].checked && aDato.category == aChk[5].value) || (aChk[6].checked && aDato.category == aChk[6].value));
    }
    crearTarjetas(arrayData = searchFilter(arrayData, input), tarjeta);

    return arrayData;
}


/*  filtrarCheck()
                Funcion que filtra el array usado para crear las tarjetas segun los checkbox activados y el contenido del input search
    Parametros:
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
    getEvents();
   /* let fechaActual = getCurrentDate();*/
    
    nodoSearch.addEventListener('click', (e) => arrayActual = clickSearch(e, arrayActual, nodoInputSearch, nodoTarjetas, datos, arrayChk));
    nodoInputSearch.addEventListener('click', (e) => arrayActual = onSearch(e, arrayActual, nodoInputSearch, nodoTarjetas, datos, arrayChk));
    nodoInputSearch.addEventListener('keyup', (e) => arrayActual = onSearch(e, arrayActual, nodoInputSearch, nodoTarjetas, datos, arrayChk));
    nodoInputSearch.addEventListener('search', (e) => arrayActual = onSearch(e, arrayActual, nodoInputSearch, nodoTarjetas, datos, arrayChk));
    arrayChk.forEach((nodo) => nodo.addEventListener('change', () => arrayActual = filtrarCheck(nodo, arrayActual, datos, nodoTarjetas, nodoInputSearch)));
}

init();