const datos = data.events;
const fechaActual = data.currentDate;
const nodoTarjetas = document.getElementById('card-container');


function filtrarFuturo(arrayData){
    let arrayFuturo = [];
    for(let dato of arrayData){    
        if(dato.date > fechaActual)
        arrayFuturo.push(dato);
    }
    return arrayFuturo;
}


function crearTarjetas(arrayData){
    let futuros = filtrarFuturo(arrayData);
    let stringTarjeta = "";
    for(let  futuro of futuros){
        stringTarjeta +=  `<div class="col-sm-11 col-md-5 col-xxl-4 mt-4 mb-4 d-flex justify-content-center">
        <div class="card" style="width: 18rem;">
            <img src="${futuro.image}" class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">${futuro.name}</h5>
                <p class="card-text">${futuro.description}</p>
                <div class="card-bottom d-flex flex-row justify-content-between">
                    <div>Price $${futuro.price}</div>
                    <a href="#" class="btn btn-primary">Ver más...</a>
                </div>
            </div>
        </div>
    </div>`
    }
    nodoTarjetas.innerHTML = stringTarjeta;
}

crearTarjetas(datos);