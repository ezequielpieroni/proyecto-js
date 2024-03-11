const grilla = document.createElement("div");   //Asigna el nodo 'div' a la variable grilla
grilla.classList.add("horas");                  //Agrega la clase 'horas' 

const cuadroEntrada = document.querySelector(".cuadroEntrada");  
cuadroEntrada.append(grilla);        //Arega el nodo que contiene la variable grilla al nodo de clase 'cuadroEntrada'

const botonDarTurno = document.querySelector(".botonDarTurno"); 
botonDarTurno.addEventListener("click", crearGrilla, { once: true }); //Asigna el evento 'click' al boton 'Dar turno' 

const grillaHorarios = [    //Array de objetos

{dia: "Lunes",    hora: "9:00",    estado: "ocupado"},
{dia: "Lunes",    hora: "9:30",    estado: "disponible"},
{dia: "Lunes",    hora: "10:00",    estado: "disponible"},
{dia: "Lunes",    hora: "10:30",    estado: "deshabilitado"},
{dia: "Lunes",    hora: "11:00",    estado: "disponible"},
{dia: "Lunes",    hora: "11:30",    estado: "disponible"},
{dia: "Lunes",    hora: "12:00",    estado: "disponible"}, 
       
{dia: "Martes",    hora: "9:00",    estado: "disponible"},
{dia: "Martes",    hora: "9:30",    estado: "disponible"},
{dia: "Martes",    hora: "10:00",    estado: "disponible"},
{dia: "Martes",    hora: "10:30",    estado: "disponible"},
{dia: "Martes",    hora: "11:00",    estado: "disponible"},
{dia: "Martes",    hora: "11:30",    estado: "disponible"},        
{dia: "Martes",    hora: "12:00",    estado: "disponible"},

{dia: "Miercoles",    hora: "9:00",    estado: "deshabilitado"},
{dia: "Miercoles",    hora: "9:30",    estado: "deshabilitado"},
{dia: "Miercoles",    hora: "10:00",    estado: "deshabilitado"},
{dia: "Miercoles",    hora: "10:30",    estado: "deshabilitado"},
{dia: "Miercoles",    hora: "11:00",    estado: "deshabilitado"},
{dia: "Miercoles",    hora: "11:30",    estado: "deshabilitado"},
{dia: "Miercoles",    hora: "12:00",    estado: "deshabilitado"},

{dia: "Jueves",    hora: "9:00",    estado: "disponible"},
{dia: "Jueves",    hora: "9:30",    estado: "disponible"},
{dia: "Jueves",    hora: "10:00",    estado: "disponible"},
{dia: "Jueves",    hora: "10:30",    estado: "disponible"},
{dia: "Jueves",    hora: "11:00",    estado: "disponible"},
{dia: "Jueves",    hora: "11:30",    estado: "disponible"},
{dia: "Jueves",    hora: "12:00",    estado: "disponible"},

{dia: "Viernes",    hora: "9:00",    estado: "disponible"},
{dia: "Viernes",    hora: "9:30",    estado: "disponible"},
{dia: "Viernes",    hora: "10:00",    estado: "disponible"},
{dia: "Viernes",    hora: "10:30",    estado: "disponible"},
{dia: "Viernes",    hora: "11:00",    estado: "disponible"},
{dia: "Viernes",    hora: "11:30",    estado: "disponible"},
{dia: "Viernes",    hora: "12:00",    estado: "disponible"},

{dia: "Sabado",    hora: "9:00",    estado: "deshabilitado"},
{dia: "Sabado",    hora: "9:30",    estado: "deshabilitado"},
{dia: "Sabado",    hora: "10:00",    estado: "deshabilitado"},
{dia: "Sabado",    hora: "10:30",    estado: "deshabilitado"},
{dia: "Sabado",    hora: "11:00",    estado: "deshabilitado"},
{dia: "Sabado",    hora: "11:30",    estado: "deshabilitado"},
{dia: "Sabado",    hora: "12:00",    estado: "deshabilitado"},

{dia: "Domingo",    hora: "9:00",    estado: "deshabilitado"},
{dia: "Domingo",    hora: "9:30",    estado: "deshabilitado"},
{dia: "Domingo",    hora: "10:00",    estado: "deshabilitado"},
{dia: "Domingo",    hora: "10:30",    estado: "deshabilitado"},
{dia: "Domingo",    hora: "11:00",    estado: "deshabilitado"},
{dia: "Domingo",    hora: "11:30",    estado: "deshabilitado"},
{dia: "Domingo",    hora: "12:00",    estado: "deshabilitado"}
]

//----------------------------------------------------------//
// La funcion "crearGrilla" busca los horarios disponibles, ocupados y  
// deshabilitados en un array de objetos y los inserta en el html
//----------------------------------------------------------//

let a=1
function crearGrilla() {    //Agrega nodos 'a' con cada horario
  
    grillaHorarios.forEach(function(horario, i){  //recorre el array de objetos insertando nodos con distintas clases al html
            if (horario.estado == "disponible") {
                grilla.innerHTML += "<a id=horarioDisponible class='items hora" + i + "'><input type=checkbox class=seleccion value= " + i + ">" + horario.hora + "</a>";
                document.querySelector(".hora"+i).style.gridArea = "hora" + i; //agrega el horario al grid css
          
            } else if (horario.estado == "ocupado")  {
                grilla.innerHTML += "<a id=horarioOcupado class='items hora" + i + "'><input type=checkbox class=seleccion value= " + i + ">" + horario.hora + "<img src=../images/MaterialSymbolsSensorOccupiedOutlineRounded.png class=busy></a>";
                document.querySelector(".hora"+i).style.gridArea = "hora" + i;
                
            } else {
                grilla.innerHTML += "<a id=horarioDeshabilitado class='items hora" + i + "'>" + " " + "</a>";
                document.querySelector(".hora"+i).style.gridArea = "hora" + i;
            }  
    })
}

//----------------------------------------------------------//
// La funcion "verSeleccionados" busca las casillas marcadas por
// el usuario e imprime la seleccion realizada
//----------------------------------------------------------//

const botonSiguiente = document.querySelector(".botonSiguiente");
const mensajeSeleccion = document.querySelector(".seleccionFecha")
let dia
let hora
    
botonSiguiente.addEventListener("click", function(e){

    dia = ""
    hora = ""

    let horaSeleccionada = document.querySelectorAll(".seleccion")
    let boxChecked = [];
    let sobreturno = document.querySelector(".sobreturno"); 
    
    horaSeleccionada.forEach(function(input){
        if (input.checked == true){
            boxChecked.push(input.value);
        }
    })

    if (boxChecked.length == 0) {
        
        alert("Ningun horario seleccionado. Vuelva atras o cierre la ventana")
    // 1 horario seleccionado
    } else if ( boxChecked.length == 1) {
        if (grillaHorarios[boxChecked[0]].estado == "disponible") {
            mensajeSeleccion.innerText = ("Ha seleccionado el turno del dia " + grillaHorarios[boxChecked[0]].dia + " a las " + grillaHorarios[boxChecked[0]].hora + " horas.")
            dia = grillaHorarios[boxChecked[0]].dia
            hora = grillaHorarios[boxChecked[0]].hora
        } else if (grillaHorarios[boxChecked[0]].estado == "ocupado" && sobreturno.checked) {
            mensajeSeleccion.innerText = "Ha seleccionado un 'sobreturno' para el dia " + grillaHorarios[boxChecked[0]].dia + " a las " + grillaHorarios[boxChecked[0]].hora + " horas."
            dia = grillaHorarios[boxChecked[0]].dia
            hora = grillaHorarios[boxChecked[0]].hora
        } else {
            e.preventDefault()
            alert("Horario ocupado")
        }
     // mas de 1 horario seleccionado
    } else {
        e.preventDefault()
        alert("Solo puede asignar un horario a la vez")
    }
});


//----------------------------------------------------------//
//----------------------------------------------------------//
// Agrega los pacientes para seleccionar en el DOM
//----------------------------------------------------------//
//----------------------------------------------------------//

const lista = document.createElement("datalist")
lista.setAttribute("id", "pacientes")

let inputPacientes = document.querySelector(".listaPacientes")
inputPacientes.append(lista)

const pacientes = [
    {
        nombre: "Enrique",
        apellido: "Fulano",
        edad: 22,
        id: "P001",
    },
    {
        nombre: "María",
        apellido: "Mengano",
        edad: 41,
        id: "P002",
    },
    {
        nombre: "Luis",
        apellido: "Zultano",
        edad: 38,
        id: "P003",
    },
    {
        nombre: "Micaela",
        apellido: "Mambrin",
        edad: 30,
        id: "P004",
    }
]

pacientes.forEach (function(paciente){
    nomCompletoId = paciente.nombre + " " + paciente.apellido + " id: " + paciente.id
    lista.innerHTML += "<option value='"+ nomCompletoId + "'></option>"

})



//---------------------------------------------------------------//
//---------------------------------------------------------------//
// Guarda el turno seleccionado en un array y en el local storage
//---------------------------------------------------------------//
//---------------------------------------------------------------//

const listaTurnos = []
const turnosExistentes = obtenerTurnosDesdeLocalStorage();
listaTurnos.push(...turnosExistentes);

function turnoNuevo(paciente, dia, hora) {  //funcion constructora 
    this.nombre = paciente.nombre;
    this.apellido = paciente.apellido;
    this.edad = paciente.edad;
    this.id = paciente.id;
    this.dia = dia;
    this.hora = hora;
}

//Funcion para verificar que elturno no esté ya asignado
function verificarTurnoRepetido(paciente, dia, hora) {
    return listaTurnos.some(function (turno) {
      return turno.id === paciente.id && turno.hora === hora && turno.dia === dia;
    });
}


const guardar = document.querySelector(".guardarTurno")

guardar.addEventListener("click", () => {

    let nombrePaciente = inputPacientes.value 

    if (nombrePaciente) {
        // Obtiene el ID del paciente desde el valor de entrada
        const regex = /id: (P\d+)$/
        const idPaciente = nombrePaciente.match(regex)[1];
        
        //Busca el paciente elegido, en la lista de pacientes
        let paciente = pacientes.find(paciente => paciente.id === idPaciente)
        let turnoRepetido = verificarTurnoRepetido(paciente, dia, hora);

        //Si el turno no ha sido ya asignado previamente se procede a hacerlo
        if (turnoRepetido) {
            alert(`Turno repetido. El turno para ${paciente.nombre} ${paciente.apellido} para el dia ${dia} a las ${hora} ya fue asignado anteriormente`)

        } else {
            //Crea el objeto con los datos del turno
            const  turnoAsignado= new turnoNuevo(paciente, dia, hora)
            //Agrega el objeto a listaTurnos y al local storage
            listaTurnos.push(turnoAsignado)
            localStorage.setItem("lista-turnos", JSON.stringify(listaTurnos))   
            alert("Turno asignado correctamente")
            location.href = "../pages/agendadiaria.html";
        }
            
        

      
    } else {
        alert("Selecciona un paciente antes de guardar el turno");
    }
})



// Retorna los turnos desde el local storage o un array vacío 
function obtenerTurnosDesdeLocalStorage() {
   
    return JSON.parse(localStorage.getItem("lista-turnos")) || [];
}




















