const grillaSemanal = document.querySelector(".grillaTurnosSemana")
const turnosAlmacenados = JSON.parse(localStorage.getItem("lista-turnos"));

//---------------------------------------------------------------//
//---------------------------------------------------------------//
// Busca los turnos disponibles y los inserta en la grilla semanal
//---------------------------------------------------------------//
//---------------------------------------------------------------//

//semana = grillaHorarios[semanaElegida]

function  crearGrillaSemanal(semana) { 

    actualizarGrillaHorarios(semana)

    //fechas en formato YYYY-MM-DD
    //----------------------------
    const primerDiaSemana = dt.startOf('week').toISODate() 
    const ultimoDiaSemana = dt.startOf('week').plus({ days: 6 }).toISODate() 
    let fechaHoy = dt.toISODate();
    //-----------------------------

    semana.forEach(function(horario){ 

        const minDia = primerDiaSemana <= horario.fecha  //primerDiaSemana y ultimoDiaSemana declaradas en fechasLuxon.js
        const maxDia = horario.fecha <= ultimoDiaSemana
        const nodoDisponible = document.createElement("div")
        crearNodoGrillaSemanal(horario, nodoDisponible)
            //Inserta los nodos "disponibles" desde el dia de hoy hasta el ultimo dia de la semana
        if (horario.estado == "disponible" && fechaHoy <= horario.fecha && maxDia ) { 
            nodoDisponible.innerHTML = `<button class="${horario.hora} ${horario.dia} ${horario.fecha} ${"turnoLibre"} botonGrillaSemanal" data-bs-target="#exampleModalToggle2" data-bs-toggle="modal">+</button>`   //Agraga las clases de Bootstrap para abir la ventana modal
            grillaSemanal.append(nodoDisponible)
            //Los horarios disponibles de la semana, anteriores al dia actual, los inserta sin el boton para asignar turno
        } else if(horario.estado == "disponible" && minDia && horario.fecha < fechaHoy){
            nodoDisponible.classList.add("turnoViejo")
            grillaSemanal.append(nodoDisponible)//.style.backgroundColor = '#ff0000')
            // Inserta los nodos de los horarios "deshabilitados"
        } else if (horario.estado == "deshabilitado" && minDia && maxDia){
            nodoDisponible.classList.add("turnoDeshabilitado")
            grillaSemanal.append(nodoDisponible)   
        } else if (horario.estado == "ocupado") {
            //console.log("turnos ocupados");
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
        if (primerDiaSemana <= turnoExistente.fecha  && turnoExistente.fecha <= ultimoDiaSemana) {
            crearNodoGrillaSemanal(turnoExistente, nodoTurno)
            nodoTurno.innerHTML += turnoExistente.nombre
            if (fechaHoy <= turnoExistente.fecha) { //Agrega boton para eliminar turnos
                nodoTurno.innerHTML += `<button>E</button>`
            } 
            grillaSemanal.append(nodoTurno)
        }// } else if (turnoExistente.fecha < primerDiaSemana || ultimoDiaSemana < turnoExistente.fecha) {

        //     console.log("chau");
        // }
    })
}

crearGrillaSemanal(grillaHorarios[semanaElegida])  // grillaHorarios declarada en turnos.js

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

insertarDiasSemanalYModal()

//------------------------------------------------------------------//
//------------------------------------------------------------------//
//------------------------------------------------------------------//
// Cambia la fecha actual por la del lunes proximo

const botonSiguienteSemana = document.querySelector("#siguienteSemana")
botonSiguienteSemana.addEventListener("click", ()=>{
    semanaElegida ++
    fechaHoy = dt.plus({day: 1})
    while (fechaHoy.weekday !== 1) {
        fechaHoy = fechaHoy.plus({day: 1})
    }
    dt = fechaHoy
    fechaHoy = fechaHoy.toISODate();
    reemplazarGrillas(grillaHorarios[semanaElegida])
    console.log(fechaHoy);
    console.log(semanaElegida);
    console.log(grillaHorarios[semanaElegida]);
})


// Cambia la fecha actual por la del lunes anterior

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
        reemplazarGrillas(grillaHorarios[semanaElegida])
    } else {
        dt = DateTime.now()
        fechaHoy = dt.toISODate()
        reemplazarGrillas(grillaHorarios[semanaElegida])
    }
})

function borrarGrillas() {
    while (grillaSemanal.firstChild) {
        grillaSemanal.removeChild(grillaSemanal.firstChild)
    }
    while (grillaModal.firstChild) {
        grillaModal.removeChild(grillaModal.firstChild)
    }
}

function borrarDiasSemanalModal() {
    diasSemanaGrilla.forEach(nodo => {
        while (nodo.firstChild) {
            nodo.removeChild(nodo.firstChild);
        }
    });
}

function reemplazarGrillas(semana) {
    borrarGrillas()
    borrarDiasSemanalModal()  
    insertarDiasSemanalYModal() 
    crearGrillaSemanal(semana)
    crearGrillaModal()
}

console.log(semanaElegida);