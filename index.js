const datos = data.events;
const fechaActual = data.currentDate;
const nodoTarjetas = document.getElementById('card-container');


/* Parametros   
                arrayData:array con los todos los eventos
                nodo: nodo donde insertar el contenido html
                
*/ 
function crearTarjetas(arrayData,nodo){
    let stringTarjeta = "";
    for(let  dato of arrayData){
        stringTarjeta +=  `<div class="col-sm-11 col-md-5 col-xxl-4 mt-4 mb-4 d-flex justify-content-center">
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
    }
    nodo.innerHTML = stringTarjeta;
}

crearTarjetas(datos,nodoTarjetas);