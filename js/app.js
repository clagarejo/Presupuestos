const ingresos = [
    new Ingreso('Ingreso 1', 100.000),
    new Ingreso('Ingreso 2', 700.000)
];

const egresos = [
    new Egreso('Egreso 1', 100.000),
    new Egreso('Egreso 2', 300.000)
]

let cargarApp = () => {
    cargarCabecero()
    cargarIngresos()
    cargarEgresos()
}

let totalIngresos = () => {

    let ingresoTotal = 0;

    for (let ingreso of ingresos) {
        ingresoTotal += ingreso.valor;
    }

    return ingresoTotal;
}

let totalEgresos = () => {

    let egresoTotal = 0;

    for (let egreso of egresos) {
        egresoTotal += egreso.valor;
    }

    return egresoTotal;
}



let cargarCabecero = () => {
    let presupuesto = totalIngresos() - totalEgresos()
    let porcentajeTotal = totalEgresos() / totalIngresos();

    document.getElementById('presupuesto').innerHTML = monedaLocal(presupuesto);
    document.getElementById('porcentaje').innerHTML = porcentajeLocal(porcentajeTotal);
    document.getElementById('ingresos').innerHTML = monedaLocal(totalIngresos());
    document.getElementById('egresos').innerHTML = monedaLocal(totalEgresos())
}

let monedaLocal = (valor) => {
    return valor.toLocaleString('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 3})
}

let porcentajeLocal = (valor) => {
    return valor.toLocaleString('en-US', { style: 'percent', minimumFractionDigits: 2 })
}

const cargarIngresos = () => {
    let ingresosHTML = '';
    for (let ingreso of ingresos) {
        ingresosHTML += crearIngresoHTML(ingreso)
    }

    document.getElementById('lista-ingresos').innerHTML = ingresosHTML;
}

const crearIngresoHTML = (ingreso) => {
    let ingresoHTML = `
    <div class="elemento limpiarEstilos">
    <div class="elemento_descripcion">${ingreso.descripcion}</div>
    <div class="derecha limpiarEstilos">
        <div class="elemento_valor">+${monedaLocal(ingreso.valor)}</div>
        <div class="elemento_eliminar">
            <button class="elemento_eliminar--btn">
                <ion-icon name="trash-outline"
                onclick="eliminarIngreso(${ingreso.id})"></ion-icon>
            </button>
        </div>
    </div>
</div>
    `

    return ingresoHTML
}

const eliminarIngreso = (id)=>{
   let indiceEliminar = ingresos.findIndex( ingreso => ingreso.id === id );
   ingresos.splice(indiceEliminar, 1)
   cargarCabecero()
   cargarIngresos()
}

const cargarEgresos = () => {
    let egresosHTML = '';
    for (let egreso of egresos) {
        egresosHTML += crearegresoHTML(egreso)
    }

    document.getElementById('lista-egresos').innerHTML = egresosHTML;
}

const crearegresoHTML = (egreso) => {
    let egresoHTML = `
    <div class="elemento limpiarEstilos">
    <div class="elemento_descripcion">${egreso.descripcion}</div>
    <div class="derecha limpiarEstilos">
        <div class="elemento_valor">-  ${monedaLocal(egreso.valor)}</div>
        <div class="elemento_eliminar">
            <button class="elemento_eliminar--btn">
                <ion-icon name="trash-outline"
                onclick="eliminarEgresos(${egreso.id})"></ion-icon>
            </button>
        </div>
    </div>
</div>
    `;
    return egresoHTML
}


const eliminarEgresos = (id) =>{
    let egresoEliminar = egresos.findIndex( egreso => egreso.id === id)
    egresos.splice(egresoEliminar, 1)
    cargarCabecero()
    cargarEgresos()
}

const agregarDato = () =>{
    let forma = document.forms['forma'];
    let tipo = forma['tipo']
    let descripcion = forma['descripcion']
    let valor = forma['valor']

    if (descripcion.value !== '' && valor.value !== '') {
        if(tipo.value === 'ingreso'){
            ingresos.push( new Ingreso(descripcion.value, +valor.value));
            cargarCabecero()
            cargarIngresos()

        } else if(tipo.value === 'egreso'){
            egresos.push(new Egreso(descripcion.value, +valor.value))
            cargarCabecero()
            cargarEgresos()
        }
    }
}