const grillaSemanal = document.querySelector(".grillaTurnosSemana")
const turnosAlmacenados = JSON.parse(localStorage.getItem("lista-turnos"));

//---------------------------------------------------------------//
//---------------------------------------------------------------//
// Busca los turnos disponibles y los inserta en la grilla semanal
//---------------------------------------------------------------//
//---------------------------------------------------------------//
console.log(semanaElegida);
semana = grillaHorarios[semanaElegida]


function  crearGrillaSemanal(week) { 

    actualizarGrillaHorarios(week)
    
    //fechas en formato YYYY-MM-DD
    //----------------------------
    const primerDiaSemana = dt.startOf('week').toISODate() 
    const ultimoDiaSemana = dt.startOf('week').plus({ days: 6 }).toISODate() 
    let fechaHoy = dt.toISODate();
    //-----------------------------

    week.forEach(function(horario){ 

        const minDia = horario.fecha >= primerDiaSemana //primerDiaSemana y ultimoDiaSemana declaradas en fechasLuxon.js
        const maxDia = horario.fecha <= ultimoDiaSemana
        const nodoDisponible = document.createElement("div")
        crearNodoGrillaSemanal(horario, nodoDisponible)
            //Inserta los nodos "disponibles" desde el dia de hoy hasta el ultimo dia de la semana
        if (horario.estado == "disponible" && horario.fecha >= fechaHoy && maxDia ) { 
            nodoDisponible.innerHTML = `<button class="${horario.hora} ${horario.dia} ${horario.fecha} botonGrillaSemanal" data-bs-target="#exampleModalToggle2" data-bs-toggle="modal">+</button>`   //Agraga las clases de Bootstrap para abir la ventana modal
            grillaSemanal.append(nodoDisponible)
            //Los horarios disponibles de la semana, anteriores al dia actual, los inserta sin el boton para asignar turno
        } else if(horario.estado == "disponible" && minDia && horario.fecha < fechaHoy){
            grillaSemanal.append(nodoDisponible)//.style.backgroundColor = '#ff0000')
            // Inserta los nodos de los horarios "deshabilitados"
        } else if (horario.estado == "deshabilitado" && minDia && maxDia){
            grillaSemanal.append(nodoDisponible)
        }
    })

    //Agraga el evento click a cada boton de la grilla semanal para asignar turno
    const botonAgregar = document.querySelectorAll(".botonGrillaSemanal")
    botonAgregar.forEach(boton => boton.addEventListener("click", () => agregarTurno(boton)));

    function agregarTurno(botonAgregar) {
        const clases = botonAgregar.classList
        const clasesArray = Array.from(clases)
        hora = clasesArray[0]
        dia = clasesArray[1]
        fecha = clasesArray[2]
        mensajeSeleccion.innerText = ("Ha seleccionado el turno del dia " + dia + " a las " + hora + " horas.")  //declarada en seleccionTurnosPacientes
    }

    // Busca los turnos asignados a pacientes y los inserta en la grilla Semanal
    turnosExistentes.forEach(function(turnoExistente){ //turnosExistentes declarada en seleccionTurnosModal.js
        const nodoTurno = document.createElement("div") 
        if (turnoExistente.fecha >= fechaHoy && turnoExistente.fecha < ultimoDiaSemana) { //Agrega boton para eliminar turnos
            nodoTurno.innerHTML += `<button>E</button>`
            console.log(turnoExistente.fecha);
            console.log(fechaActual);
        } 
        if (turnoExistente.fecha >= primerDiaSemana && turnoExistente.fecha <= ultimoDiaSemana) {
            crearNodoGrillaSemanal(turnoExistente, nodoTurno)
            nodoTurno.innerHTML += turnoExistente.nombre
            grillaSemanal.append(nodoTurno)
        }

    })
}
crearGrillaSemanal(semana)  // grillaHorarios declarada en turnos.js

//------------------------------------------------------------------//
//------------------------------------------------------------------//
// Crea cada nodo a insertar en la grilla semanal
//------------------------------------------------------------------//
//------------------------------------------------------------------//

function crearNodoGrillaSemanal(turno, nodo){
    let diaLetra = turno.dia.substring(0, 2) // asigna las dos primeras letras del dia del turno
    if (diaLetra === "sá") { //elimina el tilde del dia sábado
        diaLetra = "sa" 
    }
    const clase = "s" + turno.hora.replace(":", "") + diaLetra 
    nodo.classList.add("celdaSemanal")
    nodo.classList.add(clase)
    nodo.classList.add(turno.fecha)
    nodo.style.gridArea = clase;    
}



//------------------------------------------------------------------//
//------------------------------------------------------------------//
// Cambia la fecha actual por la del lunes proximo
//------------------------------------------------------------------//
//------------------------------------------------------------------//

const botonSiguienteSemana = document.querySelector("#siguienteSemana")

botonSiguienteSemana.addEventListener("click", ()=>{
    fechaHoy = dt.plus({day: 1})
    while (fechaHoy.weekday !== 1) {
        fechaHoy = fechaHoy.plus({day: 1})
    }
    dt = fechaHoy
    fechaHoy = fechaHoy.toISODate();
    semanaElegida ++
    semana = grillaHorarios[semanaElegida]
    borrarGrillaSemanal()
    borrarDiasGrilla()
    insertarDiasGrilla()
    crearGrillaSemanal(semana)
})

const botonAnteriorSemana = document.querySelector("#anteriorSemana")

botonAnteriorSemana.addEventListener("click", ()=>{
    semanaElegida--
    if (semanaElegida < 0) {
        alert ("Historial vacio")
        semanaElegida = 0
    } else if (semanaElegida > 0){
        fechaHoy = dt.minus({day: 1})
        while (fechaHoy.weekday !== 1) {
            fechaHoy = fechaHoy.minus({day: 1})
        }
        dt = fechaHoy
        fechaHoy = fechaHoy.toISODate();
        semana = grillaHorarios[semanaElegida]
        borrarGrillaSemanal()
        borrarDiasGrilla()
        insertarDiasGrilla()
        crearGrillaSemanal(semana)
    } else {
        dt = DateTime.now()
        fechaHoy = dt.toISODate()
        semana = grillaHorarios[semanaElegida]
        borrarGrillaSemanal()
        borrarDiasGrilla()
        insertarDiasGrilla()
        crearGrillaSemanal(semana)
    }
})

function borrarGrillaSemanal() {
    while (grillaSemanal.firstChild) {
        grillaSemanal.removeChild(grillaSemanal.firstChild)
    }
}

function borrarDiasGrilla() {
    diasSemanaGrilla.forEach(nodo => {
        while (nodo.firstChild) {
            nodo.removeChild(nodo.firstChild);
        }
    });
}