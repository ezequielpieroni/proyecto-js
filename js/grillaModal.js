//------------------------------------------------------------------
//------------------------------------------------------------------
// Encuentra el indice del array correspondiente a la semana actual
//------------------------------------------------------------------
//------------------------------------------------------------------
let indiceSemanaActual = -1;
const fomatoFecha = DateTime.fromISO
for (let i = 0; i < grillaHorarios.length; i++) {
    const semana = grillaHorarios[i];
    const fechaInicioSemana = fomatoFecha(semana[0].fecha);
    const fechaFinSemana = fomatoFecha(semana[semana.length - 1].fecha);
    if (fechaInicioSemana <= hoy && hoy <= fechaFinSemana) {
        indiceSemanaActual = i;
        break;
    }
}

//----------------------------------------------------------------------------------------
//Si se guardo un turno en una semana posteriora la primer semana, se guarda la "semana elegida" en el LS
//Asi, al actualizar la pagina; la fecha se convierte para no volver a la semana 0
//----------------------------------------------------------------------------------------

let semanaElegida = indiceSemanaActual
const semanaElegidaActualizada = JSON.parse(localStorage.getItem("semana")) 

if (semanaElegidaActualizada > 0) {
    semanaElegida = JSON.parse(localStorage.getItem("semana")) 
    for (let i = 0; i < semanaElegidaActualizada; i++) {
        fechaHoy = dt.plus({day: 1})
        while (fechaHoy.weekday !== 1) {
            fechaHoy = fechaHoy.plus({day: 1})
        }
        dt = fechaHoy
        fechaHoy = fechaHoy.toISODate();
    }    
    localStorage.setItem("semana", 0)  //Resetea la semana a 0 en el LS (siempre que se inicie el simulador empezara en la semana actual) 
}

//--------------------------------------------------------------------------------------
//Inserta los dias de la semana elegida al DOM en la ventana modal y en la grilla semanal
//--------------------------------------------------------------------------------------

const diasSemanaGrilla = document.querySelectorAll(".diasGrilla")

function insertarDiasSemanalYModal() {
    lunesEstaSemana = dt.plus({ weeks: 0}).startOf('week')
    domingoEstaSemana = lunesEstaSemana.plus({ days: 6 });
    diasSemanaGrilla.forEach(nodo => {
        for (let i = 0; i < 7; i++) {
            const dia = lunesEstaSemana.plus({ days: i });
            const mes = dia.setLocale('es').toFormat('LLL')
            const numeroDia = dia.toFormat('d')
            let nombreDia = dia.setLocale('es').toFormat('EEEE')
            nombreDia = nombreDia.charAt(0).toUpperCase() + nombreDia.slice(1); //Convierte en mayuscula la primera letra

            nodo.innerHTML += `<p class="dias">${nombreDia}<br>${numeroDia} ${mes}</p>`;
        }
    });
}

//----------------------------------------------------------//
// La funcion "crearGrillaModal" busca los horarios disponibles, ocupados y  
// deshabilitados en un array de objetos y los inserta en el html
//----------------------------------------------------------//


const grillaModal = document.querySelector(".grillaModal")

function crearGrillaModal() {    

    actualizarGrillaHorarios(grillaHorarios[semanaElegida])
    
    
    grillaHorarios[semanaElegida].forEach(function(horario, i){  
        //fechas en formato YYYY-MM-DD--//
        const primerDiaSemana = lunesEstaSemana.toISODate() 
        const ultimoDiaSemana = lunesEstaSemana.plus({ days: 6 }).toISODate() 
        let fechaHoy = dt.toISODate();
        //Rangos de fecha seleccionada entre primer y ultimo dia de la semana//
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
            grillaModal.append(nodoModal)
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
    nodo.classList.add(turno.fecha)
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
        let diaAsignado = grilla.findIndex(elemento => elemento.fecha === turnoLS.fecha && elemento.hora === turnoLS.hora)
        if (diaAsignado > -1) {
            grilla[diaAsignado].estado = "ocupado";
            //console.log(grilla[diaAsignado].estado);
        }    
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
        const turnoElegido = boxChecked[0]
        const {dia:diaTurno, hora:horaTurno, fecha: fechaTurno, estado:condicion} = grillaHorarios[semanaElegida][turnoElegido]
        console.log(grillaHorarios[semanaElegida][turnoElegido]);

        if (condicion == "disponible") {
            mensajeSeleccion.innerText = ("Ha seleccionado el turno del dia " + diaTurno + " a las " + horaTurno + " horas.")
            dia = diaTurno
            hora = horaTurno
            fecha = fechaTurno
        } else {
            alert("Horario ocupado")
            location.reload() 
        }
     // mas de 1 horario seleccionado
    } else {
        alert("Solo puede asignar un horario a la vez")
        location.reload() 
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

        //Crea el objeto con los datos del turno
        const  turnoAsignado= new generarTurno(nombrePaciente, idPaciente, dia, hora, fecha)
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
    console.log(listaTurnos);
    localStorage.setItem("lista-turnos", JSON.stringify(listaTurnos)) 
    localStorage.setItem("semana", semanaElegida)  
    location.reload() 
}

// Retorna los turnos desde el local storage o un array vacío 
function obtenerTurnosDesdeLocalStorage() {
    return JSON.parse(localStorage.getItem("lista-turnos")) || [];
}


crearGrillaModal()


