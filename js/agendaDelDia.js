// Obtener la lista de turnos del localStorage

const turnosAlmacenados = JSON.parse(localStorage.getItem("lista-turnos"));
// Verificar si hay turnos almacenados

const turnosDiaGrilla = document.querySelector(".turnosDia")

if (turnosAlmacenados){
    const turnosHoy = turnosAlmacenados.filter(turno => turno.dia === "Lunes")
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













//     // Crear una lista <ul> para los turnos
//     const ul = document.createElement("ul");

//     // Iterar sobre la lista de turnos y crear elementos <li> para cada turno
//     listaTurnos.forEach(turno => {
//         const li = document.createElement("li");
//         // Cada paciente en una línea separada
//         li.innerHTML = `<p>${turno.nombre} ${turno.apellido}</p><p>Día: ${turno.dia}</p><p>Hora: ${turno.hora}</p>`;
//         ul.appendChild(li);
//     });

//     // Agregar la lista <ul> al contenedor
//     listaTurnosContainer.appendChild(ul);
// } else {
//     // Si no hay turnos almacenados, mostrar un mensaje o realizar otras acciones
//     console.log("No hay turnos almacenados.");
// }


