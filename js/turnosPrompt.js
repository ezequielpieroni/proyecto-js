

//------------------------------------------------------------------//
// Pushea los dias de la semana en los que hay horarios disponibles //
//------------------------------------------------------------------//
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
let diasDisponibles =[];
grillaHorarios.forEach(function(turno){  

    let agregado = diasDisponibles.some((disponible) => disponible === turno.dia) 

    if (turno.estado == "disponible"  && !+agregado ) {
        diasDisponibles.push(turno.dia);
    }  
})


//------------------------------------------------------------------------------//
// Concatena el mensaje con los dias disponibles y se ingresa el dia por prompt //
//------------------------------------------------------------------------------//

let mensajeDias = "Los dias disponibles para turnos odontologicos son: ";
let diaIngresado = ""

if (diasDisponibles.length != 0) {
    diasDisponibles.forEach(function(disponible, i) {
        
        if (i < diasDisponibles.length - 2) {
            mensajeDias = mensajeDias + disponible + ", "
        } else if (i < diasDisponibles.length - 1) {
            mensajeDias = mensajeDias + disponible 
        } else {
            mensajeDias = mensajeDias + " y " + disponible 
        }        
    })
    diaIngresado = prompt(mensajeDias  + ". Ingrese uno a continuacion"); 
    let correcto = false

    // Si el dia fue mal ingresado se repite el proceso //
    do {
        let bienIngresado = diasDisponibles.some((disponible) => disponible === diaIngresado) 
        if (bienIngresado) {
            alert("Dia " + diaIngresado +" ingresado correctamente.");
            correcto =  true;
            
        } else {
            alert("Dia incorrecto")
            diaIngresado = prompt(mensajeDias  + ". Ingrese uno a continuacion"); 
        } 
        
    } while (correcto == false);
    
} else {
    alert("No hay dias disponibles")
}


//------------------------------------------------------//
// Pushea los horarios disponibles del dia seleccionado //
//------------------------------------------------------//

let horariosDisponibles = []

grillaHorarios.forEach(function(turno){ 
    if (turno.estado == "disponible"  && turno.dia == diaIngresado ) {
       horariosDisponibles.push(turno.hora)
    }  
})





//--------------------------------------------------------------------------------//
// Concatena el mensaje con las horas disponibles y se ingresa la hora por prompt //
//--------------------------------------------------------------------------------//

mensajeHoras = "Los horarios disponibles para el dia "+ diaIngresado + " son: "

horariosDisponibles.forEach(function(disponible, i) {
        
    if (i < horariosDisponibles.length - 2) {
        mensajeHoras = mensajeHoras + disponible + ", "
    } else if (i < horariosDisponibles.length - 1) {
        mensajeHoras = mensajeHoras + disponible 
    } else {
        mensajeHoras = mensajeHoras + " y " + disponible 
    }        
})

let horaIngresada = prompt(mensajeHoras  + ". Ingrese uno a continuacion");   
correcto = false

// Si el horario fue mal ingresado se repite el proceso //
do {
    let horaBienIngresada = horariosDisponibles.some((disponible) => disponible === horaIngresada) 
    if (horaBienIngresada) {
        alert("Horario de las " + horaIngresada +" ingresado correctamente.");
        correcto =  true;
        
    } else {
        alert("Hora incorrecta")
        horaIngresada = prompt(mensajeHoras  + ". Ingrese uno a continuacion");   
    } 
    
} while (correcto == false);


alert("Turno reservado con exito para el dia " + diaIngresado + " a las " + horaIngresada)


