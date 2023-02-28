const datos = data.events;
const fechaActual = data.currentDate;
const nodoTarjetas = document.getElementById('card-container');
const nodoSearch = document.getElementById('search');
const nodoInputSearch = document.getElementById('input-search');


/* Parametros   
                arrayData:array con los todos los eventos
                nodo: nodo donde insertar el contenido html             
*/
function crearTarjetas(arrayData, nodo) {
    let stringTarjeta = "";
    arrayData.forEach(dato => {
        stringTarjeta += `<div class="col-sm-11 col-md-5 col-lg-4 col-xxl-3 mt-4 mb-4 d-flex justify-content-center">
        <div class="card" style="width: 18rem;">
            <img src="${dato.image}" class="card-img-top" alt="...">
            <div class="card-body d-flex flex-column">
                <h5 class="card-title">${dato.name}</h5>
                <p class="card-text flex-grow-1">${dato.description}</p>
                <div class="card-bottom d-flex flex-row justify-content-between">
                    <div>Price $${dato.price}</div>
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
*/
function clickSearch(evento, arrayData, input, tarjeta) {
    evento.preventDefault();
    crearTarjetas(searchFilter(arrayData, input), tarjeta);
    return;
}


crearTarjetas(datos, nodoTarjetas);

nodoSearch.addEventListener('click', (e) => clickSearch(e, datos, nodoInputSearch, nodoTarjetas));