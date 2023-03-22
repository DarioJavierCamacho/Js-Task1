const ApiUrl = "https://mindhub-xj03.onrender.com/api/amazing"
const nodoTarjeta = document.getElementById('card-container');

const queryString = location.search;
const params = new URLSearchParams(queryString);
const id = params.get("id");

let arrayDatos = [];
let arrayActual = [];
let fechaActual = "";
/* getEvents()
    obtiene el array de elementos de la api

*/
async function getEvents(){
    let arrayJson
    await fetch(ApiUrl)
    .then(response => response.json() )
    .then(dataJson => {
        arrayJson = dataJson;
        crearTarjeta(arrayJson.events, nodoTarjeta, id, arrayJson.currentDate); 
        arrayDatos= dataJson.events;   
        arrayActual= dataJson.events; 
        fechaActual = dataJson.currentDate;  
    })
    .catch(()=>console.log(error.message))
}


/*  crearTarjeta():
                crea un string con la tarjeta en html y luego la dibuja
    Parametros   
                arrayData:array con los todos los eventos
                nodo:   nodo donde insertar el contenido html  
                id:     id de el evento
                date:   fecha actual           
*/
function crearTarjeta(arrayData, nodo, id,date) {
    let stringTarjeta = "";
    let assistEst = "";   
    let dato = arrayData.find((evento) => evento._id == id);
    if (dato.date < date) {
        assistEst = "Assitance: " + dato.assistance
    } else {
        assistEst = "Estimate: " + dato.estimate
    }
    stringTarjeta = `<div class="col-12  mb-5 mt-5">
                        <div class="row gap-3" id="card-container" >
                            <div class="col-sm-10 col-md-4 image-container" style="background-color:#dadcdd">
                                <img src="${dato.image}" class="img-fluid rounded-start image-details" alt="...">
                            </div>
                            <div class="col-md-7 d-flex flex-column justify-content-center card-body-container" style="background-color:#dadcdd">
                                <div class="card-body d-flex flex-column">
                                    <h3 class="card-title">${dato.name}</h3>
                                    <p class="card-text">${dato.description}</p>
                                    <p>Date: ${dato.date}</p>
                                    <p>Place: ${dato.place}</p>
                                    <p>Category: ${dato.category}</p>
                                    <p>Capacity: ${dato.capacity}</p>
                                    <p class="flex-grow-1">${assistEst}</p>
                                    <div class="card-bottom d-flex flex-row justify-content-between">
                                        <div>Price: $${dato.price}</div>
                                        <button type="button" class="btn btn-primary" onclick="onClick()">Go Back</a>
                                    </div>
                            </div>
                        </div>
                    </div>`
    nodo.innerHTML = stringTarjeta;
    return;
}

function onClick(){
    document.referrer ? window.location = document.referrer : history.back(); // vuelve atras y recarga la pagina (googleado)
}


function init(){
    getEvents();
}


init();