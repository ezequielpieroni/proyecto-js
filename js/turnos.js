const grilla = document.createElement("div");   //Asigna el nodo 'div' a la variable grilla
grilla.classList.add("horas");                  //Agrega la clase 'horas' 

const cuadroEntrada = document.querySelector(".cuadroEntrada");  
cuadroEntrada.append(grilla);        //Arega el nodo que contiene la variable grilla al nodo de clase 'cuadroEntrada'

const botonDarTurno = document.querySelector(".botonDarTurno"); 
botonDarTurno.addEventListener("click", crearGrilla, { once: true }); //Asigna el evento 'click' al boton 'Dar turno' 


alert("Presione el boton 'Dar turno'")

//----------------------------------------------------------//
// La funcion crearGrilla busca los horarios disponibles, ocupados y  
// deshabilitados en un array de objetos y los inserta en el html
//----------------------------------------------------------//


function crearGrilla() {    //Agrega nodos 'a' con cada horario
    
    const grillaHorarios = [    //Array de objetos

        {dia: "Lunes",    hora: "9:00",    estado: "ocupado"},
        {dia: "Lunes",    hora: "9:30",    estado: "disponible"},
        {dia: "Lunes",    hora: "10:00",    estado: "disponible"},
        {dia: "Lunes",    hora: "10:30",    estado: "disponible"},
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

    let i= 0;  //Se utiliza para darle un id a cada nodo 
    let miNodo
    
    alert("Seleccione un turno y presione el boton siguiente")

    grillaHorarios.forEach(function(horario, i){  //recorre el array de objetos insertando nodos con distintas clases al html
            if (horario.estado == "disponible") {
                grilla.innerHTML += "<a id=horarioDisponible class='items hora" + i + "'><input type=checkbox class=seleccion value= " + i + ">" + horario.hora + "</a>";
                miNodo = document.querySelector(".hora"+i).style.gridArea = "hora" + i; //agrega el horario al grid css
          

            } else if (horario.estado == "ocupado")  {
                grilla.innerHTML += "<a id=horarioOcupado class='items hora" + i + "'><img src=../images/MaterialSymbolsSensorOccupiedOutlineRounded.png class=busy>" + horario.hora + "</a>";
                miNodo = document.querySelector(".hora"+i).style.gridArea = "hora" + i;
                
            } else {
                grilla.innerHTML += "<a id=horarioDeshabilitado class='items hora" + i + "'>" + " " + "</a>";
                miNodo = document.querySelector(".hora"+i).style.gridArea = "hora" + i;
            }  
    })
}


//----------------------------------------------------------//
// La funcion verSeleccionados busca las casillas marcadas por
// el usuario e imprime la seleccion realizada
//----------------------------------------------------------//


const botonSiguiente = document.querySelector(".botonSiguiente");
botonSiguiente.addEventListener("click", verSeleccionados);

function verSeleccionados(){

    const grillaHorarios = [    //Array de objetos

    {dia: "Lunes",    hora: "9:00",    estado: "ocupado"},
    {dia: "Lunes",    hora: "9:30",    estado: "disponible"},
    {dia: "Lunes",    hora: "10:00",    estado: "disponible"},
    {dia: "Lunes",    hora: "10:30",    estado: "disponible"},
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
    let horaSeleccionada = document.querySelectorAll(".seleccion")
    let boxChecked = [];

    horaSeleccionada.forEach(function(input){
        if (input.checked == true){
            boxChecked.push(input.value);
        }
    })

    console.log(boxChecked.length);
        //console.log(boxChecked.length);        
    if (boxChecked.length == 0) {
        alert("Ningun horario seleccionado. Vuelva atras o cierre la ventana")
    } else if ( boxChecked.length == 1) {
        alert("Ha seleccionado el turno del dia " + grillaHorarios[boxChecked[0]].dia + " a las " + grillaHorarios[boxChecked[0]].hora + " horas.") //+ grillaHorarios[boxChecked[0]].dia + " a las " + grillaHorarios[boxChecked[0]].hora)
    } else {
        alert("Ha seleccionado mas de un horario, aun estamos trabajando para poder seleccionar multiples horarios")
    }
   
}




// horaSeleccionada.addEventListener("click", seleccionarPaciente);

// function seleccionarPaciente() {
//     alert("seleccionar paciente");
//     console.log("hola");
// }








