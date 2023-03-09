const nodoTarjeta = document.getElementById('card-container');

const queryString = location.search;
const params = new URLSearchParams(queryString);
const id = params.get("id");

const arrayDatos = data.events;
const currentDate = data.currentDate;
/*  crearTarjeta():
                crea un string con la tarjeta en html y luego la dibuja
    Parametros   
                arrayData:array con los todos los eventos
                nodo:   nodo donde insertar el contenido html  
                id:     id de el evento
                date:   fecha actual           
*/
function crearTarjeta(arrayData, nodo, id, date) {
    let stringTarjeta = "";
    let assistEst = "";   
    let dato = arrayData.find((evento) => evento._id == id);
    if (dato.date < date) {
        assistEst = "Assitance: " + dato.assistance
    } else {
        assistEst = "Estimate: " + dato.estimate
    }
    stringTarjeta = `<div class="col-12  mb-5">
                        <div class="row gap-3" id="card-container">
                            <div class="col-sm-10 col-md-4 image-container">
                                <img src="${dato.image}" class="img-fluid rounded-start image-details" alt="...">
                            </div>
                            <div class="col-md-7 d-flex flex-column justify-content-center card-body-container">
                                <div class="card-body d-flex flex-column">
                                    <h3 class="card-title">${dato.name}</h3>
                                    <p class="card-text">${dato.description}</p>
                                    <p>Date: ${dato.date}</p>
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
    crearTarjeta(arrayDatos, nodoTarjeta, id, currentDate);
}


init();