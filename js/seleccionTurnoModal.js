
//----------------------------------------------------------//
// La funcion "crearGrilla" busca los horarios disponibles, ocupados y  
// deshabilitados en un array de objetos y los inserta en el html
//----------------------------------------------------------//


const botonDarTurno = document.querySelector(".botonDarTurno"); 
botonDarTurno.addEventListener("click", crearGrilla, { once: true }); //Asigna el evento 'click' al boton 'Dar turno' 
const grillaModal = document.querySelector(".grillaModal")

let semanaElegida = 0
let semana = grillaHorarios[semanaElegida]

function crearGrilla() {    

    actualizarGrillaHorarios(semana)
    
    semana.forEach(function(horario, i){  
        //fechas en formato YYYY-MM-DD
        //----------------------------
        const primerDiaSemana = lunesEstaSemana.toISODate() 
        const ultimoDiaSemana = lunesEstaSemana.plus({ days: 6 }).toISODate() 
        let fechaHoy = dt.toISODate();
        //-----------------------------
        const minDia = horario.fecha >= primerDiaSemana
        const maxDia = horario.fecha <= ultimoDiaSemana
        const nodoModal = document.createElement("div");
        crearNodoGrillaModal(horario, nodoModal)
            //Inserta los nodos "disponibles" desde el dia de hoy hasta el ultimo dia de la semana    
        if (horario.estado == "disponible" && horario.fecha >= fechaHoy && maxDia) {
            nodoModal.innerHTML += "<a><input type=checkbox class=seleccion value= " + i + ">" + horario.hora + "</a>";
            grillaModal.append(nodoModal)
            //Los horarios disponibles de la semana, anteriores al dia actual, los inserta sin el checkbox
        } else if (horario.estado == "disponible" && minDia && horario.fecha < fechaHoy){
            //Si el horario esta ocupado inserta un icono simbolizando "ocupado"
        } else if (horario.estado == "ocupado") {
            nodoModal.innerHTML += "<a><img src=../images/MaterialSymbolsSensorOccupiedOutlineRounded.png class=busy>" + horario.hora + "</a>";
            grillaModal.append(nodoModal) 
        // Inserta los nodos de los horarios "deshabilitados" de la semana actual
        } else if (horario.estado == "deshabilitado" && minDia && maxDia){
            grillaModal.append(nodoModal)
        }
    })
}



//------------------------------------------------------------------//
//------------------------------------------------------------------//
// Crea cada nodo a insertar en la grilla de la ventana Modal
//------------------------------------------------------------------//
//------------------------------------------------------------------//

function crearNodoGrillaModal(turno, nodo){
    let diaLetra = turno.dia.substring(0, 2) // asigna las dos primeras letras del dia del turno
    if (diaLetra === "sá") { //elimina el tilde del dia sábado
        diaLetra = "sa" 
    }
    const clase = "m" + turno.hora.replace(":", "") + diaLetra // "m" es en referencia a modal 
    
    nodo.classList.add(clase)
    nodo.classList.add("celdaModal")
    nodo.style.gridArea = clase;    
}

//------------------------------------------------------------------//
//------------------------------------------------------------------//
// Actualiza el array con los turnos disponibiles
//------------------------------------------------------------------//
//------------------------------------------------------------------//

function actualizarGrillaHorarios(grilla) {
    turnosExistentes.forEach(turnoLS => {
        
        let diaAsignado = grilla.findIndex(elemento => elemento.dia === turnoLS.dia && elemento.hora === turnoLS.hora)
        console.log(grilla[diaAsignado].estado);
        grilla[diaAsignado].estado = "ocupado";
    })   
}

//----------------------------------------------------------//
// La funcion "verSeleccionados" busca las casillas marcadas por
// el usuario e imprime la seleccion realizada
//----------------------------------------------------------//

const botonSiguiente = document.querySelector(".botonSiguiente");
const mensajeSeleccion = document.querySelector(".seleccionFecha")
let dia = ""
let hora = ""
let fecha= ""
let sobreturno = document.querySelector(".sobreturno");  

botonSiguiente.addEventListener("click", verSeleccionados);

function verSeleccionados(){
    dia = ""
    hora = ""
    fecha = ""
    let horaSeleccionada = document.querySelectorAll(".seleccion")
    let boxChecked = [];
        
    horaSeleccionada.forEach(function(input){
        if (input.checked == true){
            boxChecked.push(input.value);
        }
    })

    if (boxChecked.length == 0) {
        
        alert("Ningun horario seleccionado. Vuelva atras o cierre la ventana")
    // 1 horario seleccionado
    } else if ( boxChecked.length == 1) {
        
        const {dia:diaTurno, hora:horaTurno, fecha: fechaTurno, estado:condicion} = grillaHorarios[boxChecked[0]]

        if (condicion == "disponible") {
            mensajeSeleccion.innerText = ("Ha seleccionado el turno del dia " + diaTurno + " a las " + horaTurno + " horas.")
            dia = diaTurno
            hora = horaTurno
            fecha = fechaTurno
        } else {
            //e.preventDefault()
            alert("Horario ocupado")
        }
     // mas de 1 horario seleccionado
    } else {
        //e.preventDefault()
        alert("Solo puede asignar un horario a la vez")
    }
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

const listaTurnos = []
const turnosExistentes = obtenerTurnosDesdeLocalStorage();
listaTurnos.push(...turnosExistentes);

function generarTurno(nombrePaciente, idPaciente, dia, hora, fecha) {  //funcion constructora 
    this.nombre = nombrePaciente;
    this.id = idPaciente;
    this.dia = dia;
    this.hora = hora;
    this.fecha = fecha;
}

const guardar = document.querySelector(".guardarTurno")

guardar.addEventListener("click", () => {

    const nombrePaciente = listaPacientes.options[listaPacientes.selectedIndex].textContent;
    const idPaciente = listaPacientes.options[listaPacientes.selectedIndex].id

    if (nombrePaciente) {

        let turnoRepetido = verificarTurnoRepetido(idPaciente, dia, hora);
        let turnoOcupado = verificarTurnoOcupado(dia, hora);
        //Crea el objeto con los datos del turno
        console.log(fecha);
        const  turnoAsignado= new generarTurno(nombrePaciente, idPaciente, dia, hora, fecha)
        
        // //Si el turno no ha sido ya asignado previamente se procede a hacerlo
        // if (turnoRepetido) {
        //     alert(`Turno repetido. El turno para ${paciente.nombre} ${paciente.apellido} para el dia ${dia} a las ${hora} ya fue asignado anteriormente`)
        // } else if (turnoOcupado && sobreturno.checked ) {
        //     guardarTurnoLS(listaTurnos, turnoAsignado)  
        //     alert("Sobreturno asignado correctamente")
        // } else if (turnoOcupado ){
        //     alert("Turno ocupado")   
        // } else {
            guardarTurnoLS(listaTurnos, turnoAsignado)   
            alert("Turno asignado correctamente")
        // }
      
    } else {
        alert("Selecciona un paciente antes de guardar el turno");
    }

    //Agrega el objeto a listaTurnos y al local storage
    function guardarTurnoLS(lista, turno) {
        listaTurnos.push(turno)
        localStorage.setItem("lista-turnos", JSON.stringify(lista))   
        if (window.location.pathname === "/pages/agendadiaria.html") {
            location.href = "../pages/agendadiaria.html";
        } else if (window.location.pathname === "/pages/agendasemanal.html") {
            location.href = "../pages/agendasemanal.html";
        }
    }
})

//Funciones para verificar que elturno no esté ya asignado
function verificarTurnoRepetido(id, dia, hora) {
    return listaTurnos.some(function (turno) {
      return turno.id === id && turno.hora === hora && turno.dia === dia;
    });
}

function verificarTurnoOcupado(dia, hora) {
    return listaTurnos.some(function (turno) {
      return turno.hora === hora && turno.dia === dia;
    });
}

// Retorna los turnos desde el local storage o un array vacío 
function obtenerTurnosDesdeLocalStorage() {
    return JSON.parse(localStorage.getItem("lista-turnos")) || [];
}







// const grillaHorarios = [    //Array de objetos

//     //Lunes
//     {dia: "lunes",    hora: "7:00",     estado: "disponible"},
//     {dia: "lunes",    hora: "7:30",     estado: "disponible"},
//     {dia: "lunes",    hora: "8:00",     estado: "disponible"},
//     {dia: "lunes",    hora: "8:30",     estado: "disponible"},
//     {dia: "lunes",    hora: "9:00",     estado: "disponible"},
//     {dia: "lunes",    hora: "9:30",     estado: "disponible"},
//     {dia: "lunes",    hora: "10:00",    estado: "disponible"},
//     {dia: "lunes",    hora: "10:30",    estado: "disponible"},
//     {dia: "lunes",    hora: "11:00",    estado: "disponible"},
//     {dia: "lunes",    hora: "11:30",    estado: "disponible"},
//     {dia: "lunes",    hora: "12:00",    estado: "disponible"},
//     {dia: "lunes",    hora: "12:30",    estado: "disponible"},
//     {dia: "lunes",    hora: "13:00",    estado: "disponible"},
//     {dia: "lunes",    hora: "13:30",    estado: "disponible"},
//     {dia: "lunes",    hora: "14:00",    estado: "disponible"},
//     {dia: "lunes",    hora: "14:30",    estado: "disponible"},
//     {dia: "lunes",    hora: "15:00",    estado: "disponible"},
//     {dia: "lunes",    hora: "15:30",    estado: "disponible"},
//     {dia: "lunes",    hora: "16:00",    estado: "disponible"},
//     {dia: "lunes",    hora: "16:30",    estado: "disponible"},
//     {dia: "lunes",    hora: "17:00",    estado: "disponible"},
//     {dia: "lunes",    hora: "17:30",    estado: "disponible"},
//     {dia: "lunes",    hora: "18:00",    estado: "disponible"},
//     {dia: "lunes",    hora: "18:30",    estado: "disponible"},
//     {dia: "lunes",    hora: "19:00",    estado: "disponible"},
//     {dia: "lunes",    hora: "19:30",    estado: "disponible"},
//     {dia: "lunes",    hora: "20:00",    estado: "disponible"},
//     {dia: "lunes",    hora: "20:30",    estado: "disponible"},
//     {dia: "lunes",    hora: "21:00",    estado: "disponible"},
//     {dia: "lunes",    hora: "21:30",    estado: "disponible"},
//     {dia: "lunes",    hora: "22:00",    estado: "disponible"},
       
//     // Martes
//     {dia: "martes", hora: "7:00", estado: "disponible"},
//     {dia: "martes", hora: "7:30", estado: "disponible"},
//     {dia: "martes", hora: "8:00", estado: "disponible"},
//     {dia: "martes", hora: "8:30", estado: "disponible"},
//     {dia: "martes", hora: "9:00", estado: "disponible"},
//     {dia: "martes", hora: "9:30", estado: "disponible"},
//     {dia: "martes", hora: "10:00", estado: "disponible"},
//     {dia: "martes", hora: "10:30", estado: "disponible"},
//     {dia: "martes", hora: "11:00", estado: "disponible"},
//     {dia: "martes", hora: "11:30", estado: "disponible"},
//     {dia: "martes", hora: "12:00", estado: "disponible"},
//     {dia: "martes", hora: "12:30", estado: "disponible"},
//     {dia: "martes", hora: "13:00", estado: "disponible"},
//     {dia: "martes", hora: "13:30", estado: "disponible"},
//     {dia: "martes", hora: "14:00", estado: "disponible"},
//     {dia: "martes", hora: "14:30", estado: "disponible"},
//     {dia: "martes", hora: "15:00", estado: "disponible"},
//     {dia: "martes", hora: "15:30", estado: "disponible"},
//     {dia: "martes", hora: "16:00", estado: "disponible"},
//     {dia: "martes", hora: "16:30", estado: "disponible"},
//     {dia: "martes", hora: "17:00", estado: "disponible"},
//     {dia: "martes", hora: "17:30", estado: "disponible"},
//     {dia: "martes", hora: "18:00", estado: "disponible"},
//     {dia: "martes", hora: "18:30", estado: "disponible"},
//     {dia: "martes", hora: "19:00", estado: "disponible"},
//     {dia: "martes", hora: "19:30", estado: "disponible"},
//     {dia: "martes", hora: "20:00", estado: "disponible"},
//     {dia: "martes", hora: "20:30", estado: "disponible"},
//     {dia: "martes", hora: "21:00", estado: "disponible"},
//     {dia: "martes", hora: "21:30", estado: "disponible"},
//     {dia: "martes", hora: "22:00", estado: "disponible"},

//     // Miércoles
//     {dia: "miércoles", hora: "7:00", estado: "disponible"},
//     {dia: "miércoles", hora: "7:30", estado: "disponible"},
//     {dia: "miércoles", hora: "8:00", estado: "disponible"},
//     {dia: "miércoles", hora: "8:30", estado: "disponible"},
//     {dia: "miércoles", hora: "9:00", estado: "disponible"},
//     {dia: "miércoles", hora: "9:30", estado: "disponible"},
//     {dia: "miércoles", hora: "10:00", estado: "disponible"},
//     {dia: "miércoles", hora: "10:30", estado: "disponible"},
//     {dia: "miércoles", hora: "11:00", estado: "disponible"},
//     {dia: "miércoles", hora: "11:30", estado: "disponible"},
//     {dia: "miércoles", hora: "12:00", estado: "disponible"},
//     {dia: "miércoles", hora: "12:30", estado: "disponible"},
//     {dia: "miércoles", hora: "13:00", estado: "disponible"},
//     {dia: "miércoles", hora: "13:30", estado: "disponible"},
//     {dia: "miércoles", hora: "14:00", estado: "disponible"},
//     {dia: "miércoles", hora: "14:30", estado: "disponible"},
//     {dia: "miércoles", hora: "15:00", estado: "disponible"},
//     {dia: "miércoles", hora: "15:30", estado: "disponible"},
//     {dia: "miércoles", hora: "16:00", estado: "disponible"},
//     {dia: "miércoles", hora: "16:30", estado: "disponible"},
//     {dia: "miércoles", hora: "17:00", estado: "disponible"},
//     {dia: "miércoles", hora: "17:30", estado: "disponible"},
//     {dia: "miércoles", hora: "18:00", estado: "disponible"},
//     {dia: "miércoles", hora: "18:30", estado: "disponible"},
//     {dia: "miércoles", hora: "19:00", estado: "disponible"},
//     {dia: "miércoles", hora: "19:30", estado: "disponible"},
//     {dia: "miércoles", hora: "20:00", estado: "disponible"},
//     {dia: "miércoles", hora: "20:30", estado: "disponible"},
//     {dia: "miércoles", hora: "21:00", estado: "disponible"},
//     {dia: "miércoles", hora: "21:30", estado: "disponible"},
//     {dia: "miércoles", hora: "22:00", estado: "disponible"},

//     // Jueves
//     {dia: "jueves", hora: "7:00", estado: "disponible"},
//     {dia: "jueves", hora: "7:30", estado: "disponible"},
//     {dia: "jueves", hora: "8:00", estado: "disponible"},
//     {dia: "jueves", hora: "8:30", estado: "disponible"},
//     {dia: "jueves", hora: "9:00", estado: "disponible"},
//     {dia: "jueves", hora: "9:30", estado: "disponible"},
//     {dia: "jueves", hora: "10:00", estado: "disponible"},
//     {dia: "jueves", hora: "10:30", estado: "disponible"},
//     {dia: "jueves", hora: "11:00", estado: "disponible"},
//     {dia: "jueves", hora: "11:30", estado: "disponible"},
//     {dia: "jueves", hora: "12:00", estado: "disponible"},
//     {dia: "jueves", hora: "12:30", estado: "disponible"},
//     {dia: "jueves", hora: "13:00", estado: "disponible"},
//     {dia: "jueves", hora: "13:30", estado: "disponible"},
//     {dia: "jueves", hora: "14:00", estado: "disponible"},
//     {dia: "jueves", hora: "14:30", estado: "disponible"},
//     {dia: "jueves", hora: "15:00", estado: "disponible"},
//     {dia: "jueves", hora: "15:30", estado: "disponible"},
//     {dia: "jueves", hora: "16:00", estado: "disponible"},
//     {dia: "jueves", hora: "16:30", estado: "disponible"},
//     {dia: "jueves", hora: "17:00", estado: "disponible"},
//     {dia: "jueves", hora: "17:30", estado: "disponible"},
//     {dia: "jueves", hora: "18:00", estado: "disponible"},
//     {dia: "jueves", hora: "18:30", estado: "disponible"},
//     {dia: "jueves", hora: "19:00", estado: "disponible"},
//     {dia: "jueves", hora: "19:30", estado: "disponible"},
//     {dia: "jueves", hora: "20:00", estado: "disponible"},
//     {dia: "jueves", hora: "20:30", estado: "disponible"},
//     {dia: "jueves", hora: "21:00", estado: "disponible"},
//     {dia: "jueves", hora: "21:30", estado: "disponible"},
//     {dia: "jueves", hora: "22:00", estado: "disponible"},


//     //Viernes
//     {dia: "viernes", hora: "7:00", estado: "disponible"},
//     {dia: "viernes", hora: "7:30", estado: "disponible"},
//     {dia: "viernes", hora: "8:00", estado: "disponible"},
//     {dia: "viernes", hora: "8:30", estado: "disponible"},
//     {dia: "viernes", hora: "9:00", estado: "disponible"},
//     {dia: "viernes", hora: "9:30", estado: "disponible"},
//     {dia: "viernes", hora: "10:00", estado: "disponible"},
//     {dia: "viernes", hora: "10:30", estado: "disponible"},
//     {dia: "viernes", hora: "11:00", estado: "disponible"},
//     {dia: "viernes", hora: "11:30", estado: "disponible"},
//     {dia: "viernes", hora: "12:00", estado: "disponible"},
//     {dia: "viernes", hora: "12:30", estado: "disponible"},
//     {dia: "viernes", hora: "13:00", estado: "disponible"},
//     {dia: "viernes", hora: "13:30", estado: "disponible"},
//     {dia: "viernes", hora: "14:00", estado: "disponible"},
//     {dia: "viernes", hora: "14:30", estado: "disponible"},
//     {dia: "viernes", hora: "15:00", estado: "disponible"},
//     {dia: "viernes", hora: "15:30", estado: "disponible"},
//     {dia: "viernes", hora: "16:00", estado: "disponible"},
//     {dia: "viernes", hora: "16:30", estado: "disponible"},
//     {dia: "viernes", hora: "17:00", estado: "disponible"},
//     {dia: "viernes", hora: "17:30", estado: "disponible"},
//     {dia: "viernes", hora: "18:00", estado: "disponible"},
//     {dia: "viernes", hora: "18:30", estado: "disponible"},
//     {dia: "viernes", hora: "19:00", estado: "disponible"},
//     {dia: "viernes", hora: "19:30", estado: "disponible"},
//     {dia: "viernes", hora: "20:00", estado: "disponible"},
//     {dia: "viernes", hora: "20:30", estado: "disponible"},
//     {dia: "viernes", hora: "21:00", estado: "disponible"},
//     {dia: "viernes", hora: "21:30", estado: "disponible"},
//     {dia: "viernes", hora: "22:00", estado: "disponible"},

//     // Sábado
//     {dia: "sábado", hora: "7:00", estado: "disponible"},
//     {dia: "sábado", hora: "7:30", estado: "disponible"},
//     {dia: "sábado", hora: "8:00", estado: "disponible"},
//     {dia: "sábado", hora: "8:30", estado: "disponible"},
//     {dia: "sábado", hora: "9:00", estado: "disponible"},
//     {dia: "sábado", hora: "9:30", estado: "disponible"},
//     {dia: "sábado", hora: "10:00", estado: "disponible"},
//     {dia: "sábado", hora: "10:30", estado: "disponible"},
//     {dia: "sábado", hora: "11:00", estado: "disponible"},
//     {dia: "sábado", hora: "11:30", estado: "disponible"},
//     {dia: "sábado", hora: "12:00", estado: "disponible"},
//     {dia: "sábado", hora: "12:30", estado: "disponible"},
//     {dia: "sábado", hora: "13:00", estado: "disponible"},
//     {dia: "sábado", hora: "13:30", estado: "disponible"},
//     {dia: "sábado", hora: "14:00", estado: "disponible"},
//     {dia: "sábado", hora: "14:30", estado: "disponible"},
//     {dia: "sábado", hora: "15:00", estado: "disponible"},
//     {dia: "sábado", hora: "15:30", estado: "disponible"},
//     {dia: "sábado", hora: "16:00", estado: "disponible"},
//     {dia: "sábado", hora: "16:30", estado: "disponible"},
//     {dia: "sábado", hora: "17:00", estado: "disponible"},
//     {dia: "sábado", hora: "17:30", estado: "disponible"},
//     {dia: "sábado", hora: "18:00", estado: "disponible"},
//     {dia: "sábado", hora: "18:30", estado: "disponible"},
//     {dia: "sábado", hora: "19:00", estado: "disponible"},
//     {dia: "sábado", hora: "19:30", estado: "disponible"},
//     {dia: "sábado", hora: "20:00", estado: "disponible"},
//     {dia: "sábado", hora: "20:30", estado: "disponible"},
//     {dia: "sábado", hora: "21:00", estado: "disponible"},
//     {dia: "sábado", hora: "21:30", estado: "disponible"},
//     {dia: "sábado", hora: "22:00", estado: "disponible"},

//     // Domingo
//     {dia: "domingo", hora: "7:00", estado: "disponible"},
//     {dia: "domingo", hora: "7:30", estado: "disponible"},
//     {dia: "domingo", hora: "8:00", estado: "disponible"},
//     {dia: "domingo", hora: "8:30", estado: "disponible"},
//     {dia: "domingo", hora: "9:00", estado: "disponible"},
//     {dia: "domingo", hora: "9:30", estado: "disponible"},
//     {dia: "domingo", hora: "10:00", estado: "disponible"},
//     {dia: "domingo", hora: "10:30", estado: "disponible"},
//     {dia: "domingo", hora: "11:00", estado: "disponible"},
//     {dia: "domingo", hora: "11:30", estado: "disponible"},
//     {dia: "domingo", hora: "12:00", estado: "disponible"},
//     {dia: "domingo", hora: "12:30", estado: "disponible"},
//     {dia: "domingo", hora: "13:00", estado: "disponible"},
//     {dia: "domingo", hora: "13:30", estado: "disponible"},
//     {dia: "domingo", hora: "14:00", estado: "disponible"},
//     {dia: "domingo", hora: "14:30", estado: "disponible"},
//     {dia: "domingo", hora: "15:00", estado: "disponible"},
//     {dia: "domingo", hora: "15:30", estado: "disponible"},
//     {dia: "domingo", hora: "16:00", estado: "disponible"},
//     {dia: "domingo", hora: "16:30", estado: "disponible"},
//     {dia: "domingo", hora: "17:00", estado: "disponible"},
//     {dia: "domingo", hora: "17:30", estado: "disponible"},
//     {dia: "domingo", hora: "18:00", estado: "disponible"},
//     {dia: "domingo", hora: "18:30", estado: "disponible"},
//     {dia: "domingo", hora: "19:00", estado: "disponible"},
//     {dia: "domingo", hora: "19:30", estado: "disponible"},
//     {dia: "domingo", hora: "20:00", estado: "disponible"},
//     {dia: "domingo", hora: "20:30", estado: "disponible"},
//     {dia: "domingo", hora: "21:00", estado: "disponible"},
//     {dia: "domingo", hora: "21:30", estado: "disponible"},
//     {dia: "domingo", hora: "22:00", estado: "disponible"},
// ]











