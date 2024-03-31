//----------------------------------------------------------------------------------------
//Si se guardo un turno en un dia posterior al actual, se guarda el "dia elegido" en el LS
//Asi, al actualizar la pagina; la fecha se convierte para no volver al dia actual
//----------------------------------------------------------------------------------------

let hoyFormatoTS= DateTime.now().toMillis();
const diaElegidoActualizado = JSON.parse(localStorage.getItem("dia")) 

if (diaElegidoActualizado > hoyFormatoTS || hoyFormatoTS < diaElegidoActualizado) {
    const diaElegido = JSON.parse(localStorage.getItem("dia")) 
    dtDiario = DateTime.fromMillis(diaElegido)  
    localStorage.setItem("dia", 0)  //Resetea el dia a 0 en el LS (siempre que se inicie el simulador empezara en el dia actual) 
}

//---------------------------------------------------------------//
//---------------------------------------------------------------//
// Imprime en pantalla los turnos del dia actual 
//---------------------------------------------------------------//
//---------------------------------------------------------------//

const turnosDiaGrilla = document.querySelector(".listaTurnosDia")
let diaSeleccionado = dtDiario.setLocale('es').toLocaleString({ weekday: 'long' });
let mesSeleccionado = dtDiario.toLocaleString({ month: "long" });  

function insertarTurnosDelDia() {
    const turnosHoy = turnosExistentes.filter(turnoExistente => turnoExistente.fecha === dtDiario.toISODate()) 


    if (turnosHoy.length){  // Si hay turnos, los ordena e inserta en el DOM
        if (turnosHoy.length > 1) {     
            turnosHoy.sort((a, b) => {  
                if (a.fechaTS < b.fechaTS) { //Ordena segun la hora del turno
                    return -1
                }
                if (a.fechaTS > b.fechaTS) {
                    return 1
                }
                return 0
            })  
        }
        turnosHoy.forEach(turnoHoy => { 
            insertarTurnos(turnoHoy)
        })  
    } else {
        if (dtDiario.toISODate() < hoy.toISODate() ) {
            turnosDiaGrilla.innerHTML = "<h6>No hubo turnos asignados para este dia.</h6>"
        } else if (dtDiario.toISODate() == hoy.toISODate() ) {
            turnosDiaGrilla.innerHTML = "<h6>Aun no hay turnos asignados para el dia de hoy.</h6>"
        } else {
            turnosDiaGrilla.innerHTML = "<h6>Aun no hay turnos asignados para este dia.</h6>"
        }
    }

    function insertarTurnos(turno) {
        let horaSiguiente = DateTime.fromFormat(turno.hora, "H:mm").plus({ minutes: 30 });
        horaSiguiente = horaSiguiente.toFormat('H:mm') 
        const nodoTurno = document.createElement("div")
        nodoTurno.classList.add("turnoDelDia")
        nodoTurno.innerHTML += `<div class = "horaGrilla ${turno.hora}">
                                    <p>${turno.hora}</p>
                                    <img src="../images/MaterialSymbolsArrowDownward.svg"<img>
                                    <p>${horaSiguiente}</p>
                                </div>
                                <span class = 'paciente'><h8>Paciente:</h8><h5>${turno.nombre}</h5></span>
                                <span class = 'esp'><h8>Especialidad:</h8><h5>${turno.especialidad}</h5></span>
                                <span class = 'comentario'><h8>Comentario:</h8><h6>${turno.comentario}</h6></span>
                                <button class="${turno.hora} ${turno.fecha} boton-eliminar">
                                    <img src="../images/MaterialSymbolsDeleteOutline.svg">
                                </button>` 
        turnosDiaGrilla.append(nodoTurno)
    } 

    // Funcionalidad a boton eliminar turno
    const botonEliminar = document.querySelectorAll(".boton-eliminar")
    botonEliminar.forEach(boton => {
        boton.addEventListener("click", () => {
            const identificador1 = boton.classList[0]
            const identificador2 = boton.classList[1]
            eliminarDelLocalStorage (identificador1, identificador2)
        })
    })

    function eliminarDelLocalStorage (id1, id2) {
        const listaLS = [];
        const turnosEnLS = obtenerTurnosDesdeLocalStorage();
        listaLS.push(...turnosEnLS); //declarada en grillaModal
        const listaNueva = listaLS.filter(turno => {
            return !(turno.hora === id1 && turno.fecha === id2)
        })
        guardarCambio(listaNueva)  
    }

    function guardarCambio(lista) {
        localStorage.setItem("lista-turnos", JSON.stringify(lista)) 
        localStorage.setItem("dia", dtDiario.toMillis())  
        localStorage.setItem("semana", semanaElegida)  
        location.reload() 
    }
}

insertarTurnosDelDia()
crearGrillaModal()

//----------------------------------------------------------//
//----------------------------------------------------------//
// La funcion "verSeleccionados" busca las casillas marcadas por
// el usuario e imprime la seleccion realizada
//----------------------------------------------------------//
//----------------------------------------------------------//

const botonSiguiente = document.querySelector(".botonSiguiente");
const mensajeSeleccion = document.querySelector(".seleccionFecha")
let dia = ""
let hora = ""
let fecha= ""
let sobreturno = document.querySelector(".sobreturno");  

botonSiguiente.addEventListener("click", verSeleccionados);

function verSeleccionados(){
    dia = ""
    hora = ""
    fecha = ""
    let horaSeleccionada = document.querySelectorAll(".seleccion")
    let boxChecked = [];
        
    horaSeleccionada.forEach(function(input){
        if (input.checked == true){
            boxChecked.push(input.value);
        }
    })

    if (boxChecked.length == 0) {
        
        alert("Ningun horario seleccionado.")
        localStorage.setItem("dia", dtDiario.toMillis())  
        location.reload()
    // 1 horario seleccionado
    } else if ( boxChecked.length == 1) {
        const turnoElegido = boxChecked[0]
        const {dia:diaTurno, hora:horaTurno, fecha: fechaTurno, estado:condicion} = turnosBD[semanaElegida][turnoElegido]
        mensajeSeleccion.innerText = ("Ha seleccionado el turno del dia " + diaTurno + " a las " + horaTurno + " horas.")
        dia = diaTurno
        hora = horaTurno
        fecha = fechaTurno
        
     // mas de 1 horario seleccionado
    } else {
        alert("Solo puede asignar un horario a la vez")
        localStorage.setItem("dia", dtDiario.toMillis())  
        location.reload()    
    }
}

//---------------------------------------------------------------//
//---------------------------------------------------------------//
// Selector de dias en el DOM
//---------------------------------------------------------------//
//---------------------------------------------------------------//

fechaActual = document.querySelector(".asideFecha")
let divFecha = document.createElement("div")

divFecha.classList.add("fechaAgenda")
divFecha.innerHTML = `  <p class="diaAside">${diaSeleccionado}</p>
                        <div class="cuadroFecha">
                            <button class="anteriorDia"><img class="flechaCambioDia"src="../images/RiArrowLeftSLine.svg"></button>
                            <p class="numeroDiaAside">
                                ${dtDiario.day}
                            </p>
                            <button class="siguienteDia"><img class="flechaCambioDia"src="../images/RiArrowRightSLine.svg"></button>
                        </div>
                        <div class= "mesyano">
                            <p class="mesAside">${mesSeleccionado}</p> 
                            <p class="anoAside">${dtDiario.year}</p> 
                        </div>`;
fechaActual.append(divFecha);

const diaAside = document.querySelector(".diaAside")
const numeroDiaAside = document.querySelector(".numeroDiaAside")
const mesAside = document.querySelector(".mesAside")
const anoAside = document.querySelector(".anoAside")

//--------------------------------------------------
//--------------------------------------------------
//Cambia la fecha al dia siguiente
//--------------------------------------------------
//--------------------------------------------------

const botonSiguienteDia = document.querySelector(".siguienteDia")

botonSiguienteDia.addEventListener("click", (e)=>{
    dtDiario = dtDiario.plus({day: 1})
    
    let indiceUltimoArray = turnosBD.length - 1;
    let indiceUltimoObjeto = turnosBD[indiceUltimoArray].length - 1; // Obtiene el indice del ultimo objeto
    const ultimoObjeto = turnosBD[indiceUltimoArray][indiceUltimoObjeto].fecha
    if (dtDiario.toISODate() >= ultimoObjeto) {
        alert ("Fin de la base de datos")
        dtDiario = dtDiario.minus({day: 1})
    }

    if (dtDiario.weekday === 1) { // Si pasa de domingo a lunes actualiza la grilla modal
        semanaElegida++
        reemplazarGrillaModal(turnosBD[semanaElegida]) 
    }
    diaSeleccionado = dtDiario.setLocale('es').toLocaleString({ weekday: 'long' });
    mesSeleccionado = dtDiario.toLocaleString({ month: "long" });  
    
    //Actualiza lafecha en el DOM
    diaAside.textContent = diaSeleccionado
    numeroDiaAside.textContent = dtDiario.day
    mesAside.textContent = mesSeleccionado
    anoAside.textContent = dtDiario.year

    borrarTurnosDelDia() 
    insertarTurnosDelDia()
})


// Cambia la fecha al dia anterior

const botonAnteriorDia = document.querySelector(".anteriorDia")

botonAnteriorDia.addEventListener("click", ()=>{
    //borrarAside()
    if (dtDiario.toISODate() <= turnosBD[0][0].fecha) {
        alert ("Historial vacio")
    } else {
        dtDiario = dtDiario.minus({day: 1})
        if (dtDiario.weekday === 7) { //Si pasa de lunes a domingo actualiza la semana de la grilla modal
            semanaElegida--
            dtDiario = dtDiario.minus({day: 6})
            reemplazarGrillaModal(turnosBD[semanaElegida])
            dtDiario = dtDiario.plus({day: 6})
        }
        diaSeleccionado = dtDiario.setLocale('es').toLocaleString({ weekday: 'long' });
        mesSeleccionado = dtDiario.toLocaleString({ month: "long" });    

        //Actualiza lafecha en el DOM
        diaAside.textContent = diaSeleccionado
        numeroDiaAside.textContent = dtDiario.day
        mesAside.textContent = mesSeleccionado
        anoAside.textContent = dtDiario.year

        borrarTurnosDelDia()
        insertarTurnosDelDia()
    }
})

function reemplazarGrillaModal(semana) {
    borrarGrillaModal()
    borrarDiasGrillaModal()  
    insertarDiasModal() 
    crearGrillaModal()          // declarado en grillaModal.js
}

function borrarGrillaModal() {
    while (grillaModal.firstChild) {
        grillaModal.removeChild(grillaModal.firstChild)
    }
}

function borrarDiasGrillaModal() {
    diasModalGrilla.forEach(nodo => {
        while (nodo.firstChild) {
            nodo.removeChild(nodo.firstChild); 
        }
    });
}


function borrarTurnosDelDia() {
    const turnos = document.querySelectorAll(".turnoDelDia");
    turnos.forEach(turno => {
        while (turno.firstChild) {
            turno.removeChild(turno.firstChild);
        }
    });
    while (turnosDiaGrilla.firstChild) {
        turnosDiaGrilla.removeChild(turnosDiaGrilla.firstChild)
    }
}


