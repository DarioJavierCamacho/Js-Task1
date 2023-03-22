const ApiUrl = "https://mindhub-xj03.onrender.com/api/amazing";

const nodoTabla = document.getElementById('tabla-stats')

let arrayDatos = [];
let arrayActual = [];
let fechaActual = "";
let arrayCategory = [];


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
            arrayActual = arrayDatos;
            fechaActual = arrayJson.currentDate;
            getCategory(arrayDatos);
            crearTabla(arrayDatos, arrayCategory, filtrarFuturo(arrayDatos, fechaActual), filtrarPasado(arrayDatos, fechaActual), nodoTabla);
        })
        .catch(() => console.log(error.message))
}

/*  filtrarPasado()
                funcion que filtra el array de eventos que son anteriores a la fecha actual suministrada
    Parametros:
                arrayData: array con los eventos
                fecActual: fecha actual con la cual comparar los eventos
*/
function filtrarPasado(arrayData, fecActual) {
    let arrayPasado = arrayData.filter(dato => dato.date < fecActual);
    return arrayPasado;
}

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


function getCategory(arrayData) {
    arrayData.forEach(element => {
        if (!arrayCategory.includes(element.category)) {
            arrayCategory.push(element.category)
        }
    });
}

function crearTabla(array, category, futuro, pasado, nodo) {
    let stringTarjeta = "";

    let highAttendance = "";
    let lowerAttendance = "";
    let highEstOAssis = "";
    let lowerEstOAssis = "";
    let highAssist = Math.max(...pasado.map(o => o.assistance / o.capacity));//mayor asistencia en %
    let highEstimate = Math.max(...futuro.map(o => o.estimate / o.capacity));//mayor estimacion  en %
    let lowerAssist = Math.min(...pasado.map(o => o.assistance / o.capacity));//mayor asistencia  en %
    let lowerEstimate = Math.min(...futuro.map(o => o.estimate / o.capacity));//mayor estimacion  en %

    let largerCap = Math.max(...array.map(o => o.capacity))//mayor capacidad
    /* ---------soy un separador--------*/
    if (highAssist > highEstimate) { // filtro si es mayor la asistencia o el estimado, guardo el elemento que es mayor y una variable para mostrar
        highAttendance = pasado.find(element => element.assistance / element.capacity == highAssist);
        highEstOAssis = ((highAttendance.assistance / highAttendance.capacity) * 100).toFixed(2) + "%";
    } else {
        highAttendance = futuro.find(element => element.estimate / element.capacity == highEstimate);
        highEstOAssis = ((highAttendance.estimate / highAttendance.capacity) * 100).toFixed(2) + "%";
    }
    /* ---------soy un separador--------*/
    if (lowerAssist < lowerEstimate) { // filtro si es menor la asistencia o el estimado, guardo el elemento que es menor y una variable para mostrar
        lowerAttendance = pasado.find(element => element.assistance / element.capacity == lowerAssist);
        lowerEstOAssis = ((lowerAttendance.assistance / lowerAttendance.capacity) * 100).toFixed(2) + "%";
    } else {
        lowerAttendance = futuro.find(element => element.estimate / element.capacity == lowerEstimate);
        lowerEstOAssis = ((lowerAttendance.estimate / lowerAttendance.capacity) * 100).toFixed(2) + "%";
    }
    /* ---------soy un separador--------*/
    stringTarjeta += `<tr>
    <th colspan="3">Events Statistics</th>
        </tr>
        <tr>
            <td class="td-sub">Events with the highest percentage of attendance</td>
            <td class="td-sub">Events with the lowest percentage of attendance</td>
            <td class="td-sub">Event with larger capacity</td>
        </tr>
        <tr>
        <td class="blank-td">${highAttendance.name} (${highEstOAssis})</td>
        <td class="blank-td">${lowerAttendance.name} (${lowerEstOAssis})</td>
        <td class="blank-td">${array.find(element => element.capacity == largerCap).name} (${largerCap})</td>
    </tr>`
    stringTarjeta += `<th colspan="3">Upcoming events statistics by category</th>
                <tr>
                    <td class="td-sub">Categories</td>
                    <td class="td-sub">Revenues</td>
                    <td class="td-sub">Percentage of attendance</td>
                </tr>`
    category.forEach(dato => { //upcoming
        let promedio = promedioPorCategoria(futuro, dato, true);
        let ganancia = gananciasPorCategoria(futuro, dato, true);
        if (promedio != 0) {
            stringTarjeta += `<tr>
                    <td class="blank-td">${dato}</td>
                    <td class="blank-td">$${ganancia}</td>
                    <td class="blank-td">${promedio}%</td>
                </tr>`
        }
    });
    stringTarjeta += `<th colspan="3">Past events statistics by category</th>
                <tr>
                    <td class="td-sub">Categories</td>
                    <td class="td-sub">Revenues</td>
                    <td class="td-sub">Percentage of attendance</td>
                </tr>`
    category.forEach(dato => {//past
        let promedio = promedioPorCategoria(pasado, dato, false);
        let ganancia = gananciasPorCategoria(pasado, dato, false);
        stringTarjeta += `<tr>
        <td class="blank-td">${dato}</td>
        <td class="blank-td">$${ganancia}</td>
        <td class="blank-td">${promedio}%</td>
    </tr>`
    });
    nodo.innerHTML = stringTarjeta;
}

function promedioPorCategoria(array, categoria, flag) { // flag true= futuro , false= pasado
    let promedioPorCategoria = 0;
    let arrayPorCategoria = array.filter(dato => dato.category == categoria)
    if (flag) {
        if (arrayPorCategoria != 0) {
            for (let porCategoria of arrayPorCategoria) {
                promedioPorCategoria += (porCategoria.estimate / porCategoria.capacity) * 100;
            }
            promedioPorCategoria /= arrayPorCategoria.length;
        } else {
            promedioPorCategoria = 0;
        }
    } else {
        if (arrayPorCategoria != 0) {
            for (let porCategoria of arrayPorCategoria) {
                promedioPorCategoria += (porCategoria.assistance / porCategoria.capacity) * 100;
            }
            promedioPorCategoria /= arrayPorCategoria.length;
        } else {
            promedioPorCategoria = 0;
        }
    }
    return promedioPorCategoria.toFixed(2);
}

function gananciasPorCategoria(array, categoria, flag) {// flag true= futuro , false= pasado
    let gananciaPorCategoria = 0;
    let arrayPorCategoria = array.filter(dato => dato.category == categoria)
    if (flag) {
        if (arrayPorCategoria != 0) {
            for (let porCategoria of arrayPorCategoria) {
                gananciaPorCategoria += porCategoria.estimate * porCategoria.price;
            }
        } else {
            gananciaPorCategoria = 0;
        }
    } else {
        if (arrayPorCategoria != 0) {
            for (let porCategoria of arrayPorCategoria) {
                gananciaPorCategoria += porCategoria.assistance * porCategoria.price;
            }
        } else {
            gananciaPorCategoria = 0;
        }
    }
    return gananciaPorCategoria;

}
function init() {
    getEvents();
}

init();

/*<tr>
            <th colspan="3">Events Statistics</th>
                </tr>
                <tr>
                    <td>Events with the highest percentage of attendance</td>
                    <td>Events with the lowest percentage of attendance</td>
                    <td>Event with larger capacity</td>
                </tr>
                <tr>
                    <td class="blank-td"></td>
                    <td class="blank-td"></td>
                    <td class="blank-td"></td>
                </tr>
                <tr>
                    <th colspan="3">Upcoming events statistics by category</th>
                </tr>
                <tr>
                    <td>Categories</td>
                    <td>Revenues</td>
                    <td>Percentage of attendance</td>
                </tr>
                <tr>
                    <td class="blank-td"></td>
                    <td class="blank-td"></td>
                    <td class="blank-td"></td>
                </tr>
                <tr>
                    <td class="blank-td"></td>
                    <td class="blank-td"></td>
                    <td class="blank-td"></td>
                </tr>
                <tr>
                    <td class="blank-td"></td>
                    <td class="blank-td"></td>
                    <td class="blank-td"></td>
                </tr>
                <tr>
                    <th colspan="3">Past events statistics by category</th>
                </tr>
                <tr>
                    <td>Categories</td>
                    <td>Revenues</td>
                    <td>Percentage of attendance</td>
                </tr>
                <tr>
                    <td class="blank-td"></td>
                    <td class="blank-td"></td>
                    <td class="blank-td"></td>
                </tr>
                <tr>
                    <td class="blank-td"></td>
                    <td class="blank-td"></td>
                    <td class="blank-td"></td>
                </tr>
                <tr>
                    <td class="blank-td"></td>
                    <td class="blank-td"></td>
                    <td class="blank-td"></td>
                </tr>
                <tr>
                    <td class="blank-td"></td>
                    <td class="blank-td"></td>
                    <td class="blank-td"></td>
                </tr>
                <tr>
                    <td class="blank-td"></td>
                    <td class="blank-td"></td>
                    <td class="blank-td"></td>
                </tr>*/