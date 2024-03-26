insertarDiasSemanalYModal()

//---------------------------------------------------------------//
//---------------------------------------------------------------//
// Imprime en pantalla los turnos del dia actual 
//---------------------------------------------------------------//
//---------------------------------------------------------------//

const turnosDiaGrilla = document.querySelector(".turnosDia")

if (turnosExistentes){
    const turnosHoy = turnosExistentes.filter(turno => turno.dia == diaSemana) 
    if (turnosHoy.length){
        turnosHoy.forEach(function(turno){
            turnosDiaGrilla.innerHTML += `<h4 class = 'horaGrilla'>${turno.hora}</h4>`
            turnosDiaGrilla.innerHTML += `<h5 class = 'pacienteGrilla'>${turno.nombre}</h5>`
            turnosDiaGrilla.innerHTML += `<h5 class = 'pacienteGrilla'>Aca va un comentario o tratamiento</h5>`
            turnosDiaGrilla.innerHTML += `<button class = 'pacienteGrilla'>E</button>`
        })
    } else {
        turnosDiaGrilla.innerHTML = "<h6>Aun no hay turnos asignados para este dia</h6>"    
    }
    
} else {
    turnosDiaGrilla.innerHTML = "<h6>Aun no hay turnos asignados para este dia</h6>"
}


//---------------------------------------------------------------//
//---------------------------------------------------------------//
// Dia actual. Agenda Diaria
//---------------------------------------------------------------//
//---------------------------------------------------------------//

fechaActual = document.querySelector(".asideFecha")
let divFecha = document.createElement("div")
divFecha.classList.add("fechaAgenda")
divFecha.innerHTML = ` <p>${hoy.day}<p>
                  <p>&lt;${diaSemana}&gt;<p>
                  <p>${nombreMes}<p> 
                  <p>${hoy.year}<p> `;
fechaActual.append(divFecha);












