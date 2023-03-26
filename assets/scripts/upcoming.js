const ApiUrl = "https://mindhub-xj03.onrender.com/api/amazing"

const nodoTarjetas = document.getElementById('card-container');
const nodoSearch = document.getElementById('search');
const nodoInputSearch = document.getElementById('input-search');

let arrayChk = document.querySelectorAll('.chk-box');
const nodoChk = document.getElementById('fieldset');

let arrayDatos = [];
let arrayActual = [];
let fechaActual = "";
let futuro = [];
let arrayCategory = [];

let arrayBoxes = [];


/*  filtrarFuturo()
                funcion que filtra el array de eventos que son posteriores a la fecha actual suministrada
    Parametros    
                arrayData: array con los eventos
                fecActual: fecha actual con la cual comparar los eventos
*/

function filtrarFuturo(arrayData, fecActual) {
    let arrayFuturo = arrayData.filter(dato => dato.date > fecActual);
    return arrayFuturo;
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
            arrayDatos = arrayJson.events;
            fechaActual = arrayJson.currentDate;
            futuro = filtrarFuturo(arrayDatos, fechaActual);
            getCategory(futuro);
            crearTarjetas(futuro, nodoTarjetas);
            crearCheckBoxes(arrayCategory, nodoChk)
        })
        .catch(() => console.log(error.message))
}


/*  crearTarjetas():
                crea un string con las tarjetas en html y luego las dibuja
    Parametros   
                nodo: nodo donde insertar el contenido html
                futuros:array con los eventos futuros
*/

function crearTarjetas(futuros, nodo) {
    let stringTarjeta = "";
    if (futuros.length > 0) {
    futuros.forEach(futuro => {
            stringTarjeta += `<div class="col-sm-11 col-md-5 col-lg-4 col-xxl-3 mt-4 mb-4 d-flex justify-content-center">
        <div class="card" style="width: 18rem;">
            <img src="${futuro.image}" class="card-img-top" alt="...">
            <div class="card-body d-flex flex-column" style="background-color:#dadcdd">
                <h5 class="card-title">${futuro.name}</h5>
                <p class="card-text flex-grow-1">${futuro.description}</p>
                <p>Date: ${futuro.date} </p>
                <div class="card-bottom d-flex flex-row justify-content-between">
                    <div>Price $${futuro.price}</div>
                    <a href="details.html?id=${futuro._id}" class="btn btn-primary">See more...</a>
                </div>
            </div>
        </div>
    </div>`    

    });
    }else{
        stringTarjeta = "<h2>No hay elementos que coincidan con la busqueda</h2>"
    }
    nodo.innerHTML = stringTarjeta; 
    return;
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
    if(evento.keyCode == 13){
        evento.preventDefault();
    }
    if (input.value == "" || evento.key == "Backspace") { //si el buscador esta vacio o si borro vuelvo a llenar el array para luego filtrar
        arrayData = futuro;
    }
    arrayData = filtroDoble(futuro, input, nodoTarjetas)
    return arrayData;
}






function filtrarCheck(arrayData) {
    let dataBoxes = [];
    arrayBoxes = getChecked();
    if (arrayBoxes.length > 0) {
        dataBoxes = arrayData.filter(dato => arrayBoxes.includes(dato.category))
    }
    else
        dataBoxes = futuro;
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

function crearCheckBoxes(categorias, nodo) {
    let stringCheckBoxes = "";
    categorias.forEach(dato => {
        stringCheckBoxes += `<div class="chk-container"><input type="checkbox" class="chk-box" name="${dato}" id="${dato}" value="${dato}"
        ><label for="${dato}">${dato}</label>
        </div>`
    });
    nodo.innerHTML = stringCheckBoxes;
    arrayChk = document.querySelectorAll('.chk-box');// despues de crearlos les agrego el escuchador
    arrayChk.forEach((nodo) => nodo.addEventListener('change', () => filtroDoble(futuro, nodoInputSearch, nodoTarjetas)))
}

function filtroDoble(arrayData, nodo, tarjeta) {
    let arrayDobleFiltrado = filtrarCheck(arrayData);
    arrayDobleFiltrado = searchFilter(arrayDobleFiltrado, nodo);
    crearTarjetas(arrayDobleFiltrado, tarjeta)
}

/*inicializo*/

function init() {
    getEvents();
    nodoInputSearch.addEventListener('click', (e) => arrayActual = onSearch(e, arrayActual, nodoInputSearch, arrayDatos));
    nodoInputSearch.addEventListener('keydown', (e) => arrayActual = onSearch(e, arrayActual, nodoInputSearch, arrayDatos));
    nodoInputSearch.addEventListener('search', (e) => arrayActual = onSearch(e, arrayActual, nodoInputSearch, arrayDatos));

}

init();


