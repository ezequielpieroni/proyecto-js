insertarDiasSemanalYModal()  //inserta los dias de entrada en la grilla 

//---------------------------------------------------------------//
//---------------------------------------------------------------//
// Imprime en pantalla los turnos del dia actual 
//---------------------------------------------------------------//
//---------------------------------------------------------------//

const turnosDiaGrilla = document.querySelector(".listaTurnosDia")
let diaSeleccionado = dt.setLocale('es').toLocaleString({ weekday: 'long' });
let mesSeleccionado = dt.toLocaleString({ month: "long" });  
let turnosDeHoy = []

function insertarTurnosDelDia() {
    const turnosHoy = turnosExistentes.filter(turnoExistente => turnoExistente.fecha === dt.toISODate()) 
    if (turnosExistentes){ // declarado en grillaModal.js        
        console.log(turnosHoy.length);
        if (turnosHoy.length){ 
            console.log("hola");   
            turnosHoy.forEach(turno => insertarTurnos(turno))  
        } else {
            turnosDiaGrilla.innerHTML = "<h6>Aun no hay turnos asignados para este dia</h6>" 
        }
    } else {
        turnosDiaGrilla.innerHTML = "<h6>Aun no hay turnos asignados para este dia</h6>"
    }

    function insertarTurnos(turnoHoy) {
        let horaTurno = turnoHoy.hora 
        horaSiguiente = DateTime.fromFormat(horaTurno, "H:mm").plus({ minutes: 30 });
        horaSiguiente = horaSiguiente.toFormat('H:mm')
        if (turnoHoy.fecha === dt.toISODate()) {  
            const turnoDelDia = document.createElement("div")
            turnoDelDia.classList.add("turnoDelDia")
            turnoDelDia.innerHTML += `<div class = "horaGrilla ${turnoHoy.hora}"><p>${turnoHoy.hora}</p><img src="../images/MaterialSymbolsArrowDownward.svg"<img><p>${horaSiguiente}</p></div>`
            turnoDelDia.innerHTML += `<h5 class = 'paciente'>${turnoHoy.nombre}</h5>`
            turnoDelDia.innerHTML += `<h5 class = 'comentario '>Aca va un comentario o tratamiento</h5>`
            turnoDelDia.innerHTML += `<button class = 'botonEliminarPaciente'><img src="../images/MaterialSymbolsDeleteOutline.svg"></button>`
            turnosDeHoy.push(turnoDelDia)
            
        }
    } 
    if (turnosHoy.length > 1) {
        ordenarTurnos(turnosDeHoy)  
    }
}

function ordenarTurnos(turnos) {
    turnos.sort((a, b) => {
        console.log();
        const horaA = parseInt(a.querySelector('.horaGrilla').classList[1].split(':')[0]);
        const horaB = parseInt(b.querySelector('.horaGrilla').classList[1].split(':')[0]);
        const minutoA = parseInt(a.querySelector('.horaGrilla').classList[1].split(':')[1]);
        const minutoB = parseInt(b.querySelector('.horaGrilla').classList[1].split(':')[1]);
    
        // Comparar las horas
        if (horaA !== horaB) {
            return horaA - horaB;
        } else {
            // Si las horas son iguales, comparar los minutos
            return minutoA - minutoB;
        }
    });
    turnosDeHoy.forEach(turno => {
        turnosDiaGrilla.appendChild(turno);
    });
    turnos = []
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
                            <img class="flechaCambioDia"src="../images/RiArrowLeftSLine.svg">
                            <p class="numeroDiaAside">
                                ${dt.day}
                            </p>
                            <img class="flechaCambioDia"src="../images/RiArrowRightSLine.svg">
                        </div>
                        <div class= "mesyano">
                            <p class="mesAside">${mesSeleccionado}</p> 
                            <p class="anoAside">${dt.year}</p> 
                        </div>`;
fechaActual.append(divFecha);





//------------------------------------------------------------------//
//------------------------------------------------------------------//
//------------------------------------------------------------------//
// Cambia la fecha al dia siguiente

const botonSiguienteDia = document.querySelector(".siguienteDia")

botonSiguienteDia.addEventListener("click", ()=>{
    dt = dt.plus({day: 1})
    if (dt.weekday === 1) { // Si pasa de domingo a lunes actualiza la grilla modal
        semanaElegida++
        reemplazarGrillaModal(grillaHorarios[semanaElegida]) 
    }
    diaSeleccionado = dt.setLocale('es').toLocaleString({ weekday: 'long' });
    mesSeleccionado = dt.toLocaleString({ month: "long" });  
    divFecha.innerHTML = `  <p class="diaAside">${diaSeleccionado}</p>
                            <div class="cuadroFecha">
                                <img class="flechaCambioDia"src="../images/RiArrowLeftSLine.svg">
                                <p class="numeroDiaAside">
                                    ${dt.day}
                                </p>
                                <img class="flechaCambioDia"src="../images/RiArrowRightSLine.svg">
                            </div>
                            <div class= "mesyano">
                                <p class="mesAside">${mesSeleccionado}</p> 
                                <p class="anoAside">${dt.year}</p> 
                            </div>`;
    fechaActual.append(divFecha);
    borrarTurnosDelDia() 
    insertarTurnosDelDia()
})


// Cambia la fecha al dia anterior

const botonAnteriorDia = document.querySelector(".anteriorDia")

botonAnteriorDia.addEventListener("click", ()=>{
    if (dt.toISODate() <= hoy.toISODate()) {
        alert ("Historial vacio")
    } else {
        dt = dt.minus({day: 1})
        if (dt.weekday === 7) { //Si pasa de lunes a domingo actualiza la semana de la grilla modal
            semanaElegida--
            dt = dt.minus({day: 6})
            reemplazarGrillaModal(grillaHorarios[semanaElegida])
            dt = dt.plus({day: 6})
        }
        diaSeleccionado = dt.setLocale('es').toLocaleString({ weekday: 'long' });
        mesSeleccionado = dt.toLocaleString({ month: "long" });    
        divFecha.innerHTML = `  <p class="diaAside">${diaSeleccionado}</p>
                                <div class="cuadroFecha">
                                    <img class="flechaCambioDia"src="../images/RiArrowLeftSLine.svg">
                                    <p class="numeroDiaAside">
                                        ${dt.day}
                                    </p>
                                    <img class="flechaCambioDia"src="../images/RiArrowRightSLine.svg">
                                </div>
                                <div class= "mesyano">
                                    <p class="mesAside">${mesSeleccionado}</p> 
                                    <p class="anoAside">${dt.year}</p> 
                                </div>`;
        fechaActual.append(divFecha);
        borrarTurnosDelDia()
        insertarTurnosDelDia()
    } 
})



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


function reemplazarGrillaModal(semana) {
    borrarGrillaModal()
    borrarDiasGrillaModal()  
    insertarDiasSemanalYModal() // declarado en grillaModal.js
    crearGrillaModal()
}









// // ------------------------------------------------------------------//
// // ------------------------------------------------------------------//
// // ------------------------------------------------------------------//
// // Cambia la fecha actual por la del lunes proximo

// const botonSiguienteSemanaDiaria = document.querySelectorAll("#siguienteSemanaDiaria")
// botonSiguienteSemanaDiaria.addEventListener("click", ()=>{
//         semanaElegida ++
//         fechaHoy = dt.plus({day: 1})
//         while (fechaHoy.weekday !== 1) {
//             fechaHoy = fechaHoy.plus({day: 1})
//         }
//         dt = fechaHoy
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
//             fechaHoy = dt.minus({day: 1})
//             while (fechaHoy.weekday !== 1) {
//                 fechaHoy = fechaHoy.minus({day: 1})
//             }
//             dt = fechaHoy
//             fechaHoy = fechaHoy.toISODate();
//             reemplazarGrillas(grillaHorarios[semanaElegida])
//         } else {
//             dt = DateTime.now()
//             fechaHoy = dt.toISODate()
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
