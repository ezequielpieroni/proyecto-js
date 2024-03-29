//----------------------------------------------------------------------------------------
//Si se guardo un turno en un dia posterior al actual, se guarda el "dia elegido" en el LS
//Asi, al actualizar la pagina; la fecha se convierte para no volver al dia actual
//----------------------------------------------------------------------------------------

console.log(dtDiario.toISODate());
let hoyFormatoTS= DateTime.now().toMillis();
const diaElegidoActualizado = JSON.parse(localStorage.getItem("dia")) 

if (diaElegidoActualizado > hoyFormatoTS || hoyFormatoTS < diaElegidoActualizado) {
    const diaElegido = JSON.parse(localStorage.getItem("dia")) 
    dtDiario = DateTime.fromMillis(diaElegido)  
    localStorage.setItem("dia", 0)  //Resetea el dia a 0 en el LS (siempre que se inicie el simulador empezara en el dia actual) 
}

console.log(dtDiario.toISODate());
insertarDiasSemanalYModal()  //inserta los dias de entrada en la grilla modal

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
                                <h5 class = 'paciente'>${turno.nombre}</h5>
                                <h5 class = 'comentario '>Aca va un comentario o tratamiento</h5>
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
            console.log(id1, turno.hora, id2 ,turno.fecha, turno.nombre);
            console.log(turno.hora !== id1 && turno.fecha !== id2);
            return !(turno.hora === id1 && turno.fecha === id2)
        })
        console.log(listaNueva);
        guardarCambio(listaNueva)  
    }

    function guardarCambio(lista) {
        console.log(lista);
        localStorage.setItem("lista-turnos", JSON.stringify(lista)) 
        localStorage.setItem("semana", semanaElegida)  
        location.reload() 
    }

}

insertarTurnosDelDia()

//---------------------------------------------------------------//
//---------------------------------------------------------------//
// Dia actual. Agenda Diaria
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

//------------------------------------------------------------------//
//------------------------------------------------------------------//
//------------------------------------------------------------------//
// Cambia la fecha al dia siguiente

const botonSiguienteDia = document.querySelector(".siguienteDia")

botonSiguienteDia.addEventListener("click", ()=>{
    //borrarAside()
    dtDiario = dtDiario.plus({day: 1})
    if (dtDiario.weekday === 1) { // Si pasa de domingo a lunes actualiza la grilla modal
        semanaElegida++
        reemplazarGrillaModal(grillaHorarios[semanaElegida]) 
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
    if (dtDiario.toISODate() <= grillaHorarios[0][0].fecha) {
        alert ("Historial vacio")
    } else {
        dtDiario = dtDiario.minus({day: 1})
        if (dtDiario.weekday === 7) { //Si pasa de lunes a domingo actualiza la semana de la grilla modal
            semanaElegida--
            dtDiario = dtDiario.minus({day: 6})
            reemplazarGrillaModal(grillaHorarios[semanaElegida])
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
    insertarDiasSemanalYModal() // declarado en grillaModal.js
    crearGrillaModal()          // declarado en grillaModal.js
}

function borrarGrillaModal() {
    while (grillaModal.firstChild) {
        grillaModal.removeChild(grillaModal.firstChild)
    }
}

function borrarDiasGrillaModal() {
    diasSemanaGrilla.forEach(nodo => {
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






// // ------------------------------------------------------------------//
// // ------------------------------------------------------------------//
// // ------------------------------------------------------------------//
// // Cambia la fecha actual por la del lunes proximo

// const botonSiguienteSemanaDiaria = document.querySelectorAll("#siguienteSemanaDiaria")
// botonSiguienteSemanaDiaria.addEventListener("click", ()=>{
//         semanaElegida ++
//         fechaHoy = dtDiario.plus({day: 1})
//         while (fechaHoy.weekday !== 1) {
//             fechaHoy = fechaHoy.plus({day: 1})
//         }
//         dtDiario = fechaHoy
//         fechaHoy = fechaHoy.toISODate();
//         reemplazarSemanaGrillaModal(grillaHorarios[semanaElegida])
// });



// // Cambia la fecha actual por la del lunes anterior

// const botonAnteriorSemanaDiaria = document.querySelector("#anteriorSemanaDiaria")
// botonAnteriorSemanaDiaria.addEventListener("click", ()=>{
//         semanaElegida--
//         if (semanaElegida < 0) {
//             alert ("Historial vacio")
//             semanaElegida = 0
//         } else if (semanaElegida > 0){
//             fechaHoy = dtDiario.minus({day: 1})
//             while (fechaHoy.weekday !== 1) {
//                 fechaHoy = fechaHoy.minus({day: 1})
//             }
//             dtDiario = fechaHoy
//             fechaHoy = fechaHoy.toISODate();
//             reemplazarGrillas(grillaHorarios[semanaElegida])
//         } else {
//             dtDiario = DateTime.now()
//             fechaHoy = dtDiario.toISODate()
//             reemplazarGrillas(grillaHorarios[semanaElegida])
//         }
// }); 




// function borrarDiasSemanalModal() {
//     diasSemanaGrilla.forEach(nodo => {
//         while (nodo.firstChild) {
//             nodo.removeChild(nodo.firstChild);
//         }
//     });
// }

// function reemplazarSemanaGrillaModal() {
//     borrarGrillaModal()
//     borrarDiasSemanalYModal()  
//     insertarDiasSemanalYModal() // declarado en grillaModal.js
//     crearGrillaModal()
// }
