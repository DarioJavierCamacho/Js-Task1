const datos = data.events;
const fechaActual = data.currentDate;
const nodoTarjetas = document.getElementById('card-container');


/*Parametros    
                arrayData: array con los eventos
                fecActual: fecha actual con la cual comparar los eventos
*/ 


function filtrarPasado(arrayData,fecActual){
    let arrayPasado = [];
    for(let dato of arrayData){    
        if(dato.date < fecActual)
        arrayPasado.push(dato);
    }
    return arrayPasado;
}

/* Parametros   
                nodo: nodo donde insertar el contenido html
                pasados:array con los eventos pasados
*/ 

function crearTarjetas(nodo,pasados){ 
    let stringTarjeta = "";
    for(let  pasado of pasados){
        stringTarjeta +=  `<div class="col-sm-11 col-md-5 col-lg-4 col-xxl-3 mt-4 mb-4 d-flex justify-content-center">
        <div class="card" style="width: 18rem;">
            <img src="${pasado.image}" class="card-img-top" alt="...">
            <div class="card-body d-flex flex-column">
                <h5 class="card-title">${pasado.name}</h5>
                <p class="card-text flex-grow-1">${pasado.description}</p>
                <div class="card-bottom d-flex flex-row justify-content-between">
                    <div>Price $${pasado.price}</div>
                    <a href="#" class="btn btn-primary">See More...</a>
                </div>
            </div>
        </div>
    </div>`
    }
    nodo.innerHTML = stringTarjeta;
}

let arrayDatos = filtrarPasado(datos,fechaActual)
crearTarjetas(nodoTarjetas,arrayDatos);