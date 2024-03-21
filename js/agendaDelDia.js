


//---------------------------------------------------------------//
//---------------------------------------------------------------//
// Fecha del dia de hoy
//---------------------------------------------------------------//
//---------------------------------------------------------------//

let DateTime = luxon.DateTime;
let dt = DateTime.now();
const diaSemana = dt.setLocale('es').toLocaleString({ weekday: 'long' });
const nombreMes = dt.toLocaleString({ month: "long" });


let fechaActual = document.querySelector(".asideFecha")
let div = document.createElement("div")
div.classList.add("fechaAgenda")
div.innerHTML = ` <p>${dt.day}<p>
                  <p>&lt;${diaSemana}&gt;<p>
                  <p>${nombreMes}<p> 
                  <p>${dt.year}<p> `;
fechaActual.append(div);

//---------------------------------------------------------------//
//---------------------------------------------------------------//
// Imprime en pantalla los turnos del dia actual 
//---------------------------------------------------------------//
//---------------------------------------------------------------//

const turnosAlmacenados = JSON.parse(localStorage.getItem("lista-turnos")); // Obtener la lista de turnos del localStorage
const turnosDiaGrilla = document.querySelector(".turnosDia")

if (turnosAlmacenados){
    const turnosHoy = turnosAlmacenados.filter(turno => turno.dia == diaSemana)
    
    if (turnosHoy.length > 0){
        turnosHoy.forEach(function(turno){
            turnosDiaGrilla.innerHTML += `<h4 class = 'horaGrilla'>${turno.hora}</h4>`
            turnosDiaGrilla.innerHTML += `<h5 class = 'pacienteGrilla'>${turno.nombre} ${turno.apellido}</h5>`
            turnosDiaGrilla.innerHTML += `<h5 class = 'pacienteGrilla'>Aca va un comentario o tratamiento</h5>`
        })
    } else {
        turnosDiaGrilla.innerHTML = "<h6>Aun no hay turnos asignados para este dia</h6>"    
    }
    
} else {
    turnosDiaGrilla.innerHTML = "<h6>Aun no hay turnos asignados para este dia</h6>"
}
















