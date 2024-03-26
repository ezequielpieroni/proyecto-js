//---------------------------------------------------------------//
//---------------------------------------------------------------//
// Dias de la semana. Menu modal y agenda semanal 
//---------------------------------------------------------------//
//---------------------------------------------------------------//
// let diasAgregados = 0; // estas dos variables se usan para cambiar de semana
// let semanasAgregadas = 0;

let DateTime = luxon.DateTime;
let dt = DateTime.now()
const diaSemana = dt.setLocale('es').toLocaleString({ weekday: 'long' });
const nombreMes = dt.toLocaleString({ month: "long" });

const diaSemanaActual = dt.weekday; // Obtiene el dia de la semana actual (0 domingo, 1 lunes, etc)
let lunesEstaSemana = dt.plus({ weeks: 0}).startOf('week')
let domingoEstaSemana = lunesEstaSemana.plus({ days: 6 });


const diasSemanaGrilla = document.querySelectorAll(".diasGrilla")

//Inserta los dias de la semana actual al DOM en la ventana modal y en la grilla semanal
function insertarDiasGrilla() {
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

insertarDiasGrilla()

//fechas en formato YYYY-MM-DD
//----------------------------
let fechaActual = dt.toISODate();
//hora en formato HH:mm
const horaActual = DateTime.now().toFormat('HH:mm');
//----------------------------------------------------
