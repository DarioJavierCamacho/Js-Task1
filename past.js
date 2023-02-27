const datos = data.events;
const fechaActual = data.currentDate;
const nodoTarjetas = document.getElementById('card-container');


function filtrarPasado(arrayData){
    let arrayPasado = [];
    for(let dato of arrayData){    
        if(dato.date < fechaActual)
        arrayPasado.push(dato);
    }
    return arrayPasado;
}



function crearTarjetas(arrayData){
    let pasados= filtrarPasado(arrayData);
    let stringTarjeta = "";
    for(let  pasado of pasados){
        stringTarjeta +=  `<div class="col-sm-11 col-md-5 col-xxl-4 mt-4 mb-4 d-flex justify-content-center">
        <div class="card" style="width: 18rem;">
            <img src="${pasado.image}" class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">${pasado.name}</h5>
                <p class="card-text">${pasado.description}</p>
                <div class="card-bottom d-flex flex-row justify-content-between">
                    <div>Price $${pasado.price}</div>
                    <a href="#" class="btn btn-primary">See More...</a>
                </div>
            </div>
        </div>
    </div>`
    }
    nodoTarjetas.innerHTML = stringTarjeta;
}

crearTarjetas(datos);