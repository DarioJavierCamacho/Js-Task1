const datos = data.events;
const fechaActual = data.currentDate;
const nodoTarjetas = document.getElementById('card-container');


function crearTarjetas(arrayData){
    let stringTarjeta = "";
    for(let  dato of arrayData){
        stringTarjeta +=  `<div class="col-sm-11 col-md-5 col-xxl-4 mt-4 mb-4 d-flex justify-content-center">
        <div class="card" style="width: 18rem;">
            <img src="${dato.image}" class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">${dato.name}</h5>
                <p class="card-text">${dato.description}</p>
                <div class="card-bottom d-flex flex-row justify-content-between">
                    <div>Price $${dato.price}</div>
                    <a href="#" class="btn btn-primary">Ver más...</a>
                </div>
            </div>
        </div>
    </div>`
    }
    nodoTarjetas.innerHTML = stringTarjeta;
}

crearTarjetas(datos);