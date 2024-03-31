//------------------------------------------------------------------
//------------------------------------------------------------------
// Encuentra el indice del array correspondiente a la semana actual
//------------------------------------------------------------------
//------------------------------------------------------------------

let indiceSemanaActual = 0;
const fomatoFecha = DateTime.fromISO
for (let i = 0; i < turnosBD.length; i++) {
    const semana = turnosBD[i];
    const fechaInicioSemana = fomatoFecha(semana[0].fecha);
    const fechaFinSemana = fomatoFecha(semana[semana.length - 1].fecha);
    if (fechaInicioSemana <= hoy && hoy <= fechaFinSemana) {
        indiceSemanaActual = i;
        break;
    }
}

//----------------------------------------------------------------------------------------
//Si se guardo un turno en una semana posterior a la primer semana, se guarda la "semana elegida" en el LS
//Asi, al actualizar la pagina; la fecha se convierte para no volver a la semana actual
//----------------------------------------------------------------------------------------

let semanaElegida = indiceSemanaActual
const semanaElegidaActualizada = JSON.parse(localStorage.getItem("semana")) 

if (semanaElegidaActualizada > 0) {
    semanaElegida = JSON.parse(localStorage.getItem("semana")) 
    for (let i = 0; i < semanaElegidaActualizada; i++) {
        dtSemanal= dtSemanal.plus({day: 1})
        while (dtSemanal.weekday !== 1) {
            dtSemanal = dtSemanal.plus({day: 1})
        }
    }    
    localStorage.setItem("semana", 0)  //Resetea la semana a 0 en el LS (siempre que se inicie el simulador empezara en la semana actual) 
}


function actualizarGrillaHorarios(grillaSemanal) {
    turnosExistentes.forEach(turnoLS => {  
        let diaAsignado = grillaSemanal.findIndex(elemento => elemento.fecha === turnoLS.fecha && elemento.hora === turnoLS.hora)
        if (diaAsignado > -1) {
            grillaSemanal[diaAsignado].estado = "ocupado";
        }    
    }) 
}

//----------------------------------------------------------//
//----------------------------------------------------------//
// Agrega los pacientes traidos de JSON Placeholder al DOM
//----------------------------------------------------------//
//----------------------------------------------------------//

const URL = 'https://jsonplaceholder.typicode.com/users'
const getData = async(URL) => {
    const response = await fetch(URL)
    const data = await response.json()
    insertarPacientes(data)
}
getData(URL)

const listaPacientes = document.querySelector(".listaPacientes")

function insertarPacientes(pacientes){
    pacientes.forEach (function(paciente, i){
        const nodoPaciente = document.createElement("option")
        nodoPaciente.setAttribute("id", paciente.id);
        nodoPaciente.innerHTML += paciente.name
        listaPacientes.append(nodoPaciente)
    })
}



//---------------------------------------------------------------//
//---------------------------------------------------------------//
// Guarda el turno seleccionado en un array y en el local storage
//---------------------------------------------------------------//
//---------------------------------------------------------------//

function generarTurno(nombrePaciente, idPaciente, dia, hora, fecha, fechaTS, comentario, especialidad) {  //funcion constructora 
    this.nombre = nombrePaciente;
    this.id = idPaciente;
    this.dia = dia;
    this.hora = hora;
    this.fecha = fecha;
    this.fechaTS = fechaTS;
    this.comentario = comentario;
    this.especialidad = especialidad;
}

const guardar = document.querySelector(".guardarTurno")

guardar.addEventListener("click", () => {

    const nombrePaciente = listaPacientes.options[listaPacientes.selectedIndex].textContent;
    const idPaciente = listaPacientes.options[listaPacientes.selectedIndex].id
    
    const especialidadSelect = document.querySelector(".seleccionEspecialidad")
    let especialidad = especialidadSelect.value
    if (especialidad === "Especialidad") {
        especialidad = "Sin Seleccion"
    }

    const tratamiento = document.querySelector("#tratamiento")
    let coment = tratamiento.value;
    if (coment == "") {
        coment = "Sin comentarios"
    }
    
    if (nombrePaciente) {
        let horaConvertida = hora + ':00';
        horaConvertida = horaConvertida.padStart(8, '0');
        const fechaFormatoTS = fecha + "T" + horaConvertida
        //Crea el objeto con los datos del turno
        const  turnoAsignado= new generarTurno(nombrePaciente, idPaciente, dia, hora, fecha, fechaFormatoTS, coment, especialidad)
        especialidad = ""
        guardarTurnoLS(turnoAsignado)   
        alert("Turno asignado correctamente")

    } else {
        alert("Selecciona un paciente antes de guardar el turno");
    }
})


//Agrega el objeto a listaTurnos y al local storage

const turnosExistentes = obtenerTurnosDesdeLocalStorage();
let listaTurnos = []
listaTurnos.push(...turnosExistentes);

function guardarTurnoLS(turno) {
    listaTurnos.push(turno)
    localStorage.setItem("lista-turnos", JSON.stringify(listaTurnos)) 
    localStorage.setItem("semana", semanaElegida) 
    localStorage.setItem("dia", dtDiario.toMillis())  
    location.reload() 
}

// Retorna los turnos desde el local storage o un array vacío 
function obtenerTurnosDesdeLocalStorage() {
    return JSON.parse(localStorage.getItem("lista-turnos")) || [];
}










