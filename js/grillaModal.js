//--------------------------------------------------
//--------------------------------------------------
//Inserta los dias de entrada en la grilla modal
//--------------------------------------------------
//--------------------------------------------------

const diasModalGrilla = document.querySelectorAll(".diasGrilla")

function insertarDiasModal() {
    const lunesEstaSemana = dtDiario.plus({ weeks: 0}).startOf('week')
    diasModalGrilla.forEach(nodo => {
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

insertarDiasModal() 

//--------------------------------------------------
//--------------------------------------------------
//Inserta los turnos en la grilla modal
//--------------------------------------------------
//--------------------------------------------------

const grillaModal = document.querySelector(".grillaModal")

function crearGrillaModal() {    

    actualizarGrillaHorarios(turnosBD[semanaElegida])  //funcion en main.js
    
    turnosBD[semanaElegida].forEach(function(horario, i){  
        
        const primerDiaSemana= dtDiario.plus({ weeks: 0}).startOf('week')
        const ultimoDiaSemana = primerDiaSemana.plus({ days: 6 })
        //fechas en formato YYYY-MM-DD--//
        const lunesEstaSemana = primerDiaSemana.toISODate()
        const domingoEstaSemana = ultimoDiaSemana.toISODate()
        const fechaHoy = hoy.toISODate();

        //Rangos de fecha seleccionada entre primer y ultimo dia de la semana//
        const minDia = lunesEstaSemana >= horario.fecha
        const maxDia = horario.fecha <= domingoEstaSemana

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

crearGrillaModal()

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
