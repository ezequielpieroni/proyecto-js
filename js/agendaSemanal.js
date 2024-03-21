const grillaSemanal = document.querySelector(".grillaTurnosSemana")
const turnosAlmacenados = JSON.parse(localStorage.getItem("lista-turnos"));

//---------------------------------------------------------------//
//---------------------------------------------------------------//
// Busca los turnos disponibles y los inserta en la grilla
//---------------------------------------------------------------//
//---------------------------------------------------------------//

grillaHorarios.forEach(function(horario){  

    let diaLetra = horario.dia.substring(0, 2) // asigna las dos primeras letras del dia del turno
    if (diaLetra === "sá") {
        diaLetra = "sa" 
    }
    
    const div = document.createElement("div")
    const clase = "h" + horario.hora.replace(":", "") + diaLetra 
    console.log(clase);
    div.classList.add(clase)
    div.classList.add("celda")
    div.style.gridArea = clase;

    if (horario.estado == "disponible" && turnoDado(horario.hora, horario.dia) ) {
        div.innerHTML = "<p>+<p>"
        grillaSemanal.append(div)
    } else if (horario.estado == "deshabilitado"){
        div.innerHTML = "<p>des<p>"
        grillaSemanal.append(div)
    } else {
        div.innerHTML = "<p>ocupado<p>"
        grillaSemanal.append(div)
    }
})

//------------------------------------------------------------------//
//------------------------------------------------------------------//
// Busca los turnos asignados a pacientes y los inserta en la grilla
//------------------------------------------------------------------//
//------------------------------------------------------------------//

turnosAlmacenados.forEach(function(turno, i){
    const div = document.createElement("div")
    const clase = "h" + turno.hora.replace(":", "") + turno.dia.substring(0, 2) 
    div.classList.add(clase)
    div.classList.add("celda")
    div.style.gridArea = clase 
    div.innerHTML = turno.nombre + " " + turno.apellido
    grillaSemanal.append(div)
})

//Busca si el turno esta asignado a un paciente
function turnoDado(hora,dia) {
    return !turnosAlmacenados.some(turno => turno.dia === dia && turno.hora === hora)
}
