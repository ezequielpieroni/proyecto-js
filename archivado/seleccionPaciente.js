

// const lista = document.createElement("datalist")
// lista.setAttribute("id", "pacientes")

// let inputPacientes = document.querySelector(".listaPacientes")
// inputPacientes.append(lista)

// const pacientes = [
//     {
//         nombre: "Enrique",
//         apellido: "Fulano",
//         edad: 22,
//         id: "P001",
//     },
//     {
//         nombre: "María",
//         apellido: "Mengano",
//         edad: 41,
//         id: "P002",
//     },
//     {
//         nombre: "Luis",
//         apellido: "Zultano",
//         edad: 38,
//         id: "P003",
//     },
//     {
//         nombre: "Micaela",
//         apellido: "Mambrin",
//         edad: 30,
//         id: "P004",
//     }
// ]

// //----------------------------------------------------------//
// //----------------------------------------------------------//
// // Agrega los pacientes al DOM
// //----------------------------------------------------------//
// //----------------------------------------------------------//
// pacientes.forEach (function(paciente){
//     nomCompletoId = paciente.nombre + " " + paciente.apellido + " id: " + paciente.id
//     lista.innerHTML += "<option value='"+ nomCompletoId + "'></option>"

// })



// //----------------------------------------------------------//
// //----------------------------------------------------------//
// // Guarda el turno en un array y en el local storage
// //----------------------------------------------------------//
// //----------------------------------------------------------//

// const listaTurnos = []
// const guardar = document.querySelector(".guardarTurno")

// function turno(paciente, dia, hora) {
//     this.nombre = paciente.nombre;
//     this.apellido = paciente.apellido;
//     this.edad = paciente.edad;
//     this.id = paciente.id;
//     this.dia = dia;
//     this.hora = hora;
// }

// guardar.addEventListener("click", () => {
//     let nombrePaciente = inputPacientes.value 

//     if (nombrePaciente) {
//         // Obtiene el ID del paciente desde el valor de entrada
//         const regex = /id: (P\d+)$/
//         const idPaciente = nombrePaciente.match(regex)[1];
        
//         //Asigna el objeto paciente y crea el objeto turnoAsignado
//         let paciente = pacientes.find(paciente => paciente.id === idPaciente)
//         const  turnoAsignado= new turno(paciente, dia, hora)
     

//         //Agrega el turno a listaTurnos y al local storage
//         const turnosExistentes = obtenerTurnosDesdeLocalStorage();
//         listaTurnos.push(...turnosExistentes);

//         listaTurnos.push(turnoAsignado)
//         console.log(listaTurnos);

//         localStorage.setItem("lista-turnos", JSON.stringify(listaTurnos))
//     } else {
//         alert("Selecciona un paciente antes de guardar el turno");
//     }
// })


//  // Retorna los turnos desde el local storage o un array vacío 
// function obtenerTurnosDesdeLocalStorage() {
   
//     return JSON.parse(localStorage.getItem("lista-turnos")) || [];
// }




