const datos = data.events;
const fechaActual = data.currentDate;
const nodoTarjetas = document.getElementById('card-container');


/*Parametros    
                arrayData: array con los eventos
                fecActual: fecha actual con la cual comparar los eventos
*/ 

function filtrarFuturo(arrayData,fecActual){
    let arrayFuturo = []
    for(let dato of arrayData){    
        if(dato.date > fecActual)
        arrayFuturo.push(dato);
    }
    return arrayFuturo;
}

/* Parametros   
                nodo: nodo donde insertar el contenido html
                futuros:array con los eventos futuros
*/ 

function crearTarjetas(nodo,futuros){   
    let stringTarjeta = "";
    for(let  futuro of futuros){
        stringTarjeta +=  `<div class="col-sm-11 col-md-5 col-lg-4 col-xxl-3 mt-4 mb-4 d-flex justify-content-center">
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
    }
    nodo.innerHTML = stringTarjeta;
}
let aFuturo  = filtrarFuturo(datos,fechaActual);
crearTarjetas(nodoTarjetas,aFuturo);