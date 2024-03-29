//---------------------------------------------------------------//
//---------------------------------------------------------------//
// Dias de la semana. Menu modal y agenda semanal 
//---------------------------------------------------------------//
//---------------------------------------------------------------//
// let diasAgregados = 0; // estas dos variables se usan para cambiar de semana
// let semanasAgregadas = 0;



const DateTime = luxon.DateTime;
const hoy = DateTime.now()
const diaSemana = hoy.setLocale('es').toLocaleString({ weekday: 'long' });
const nombreMes = hoy.toLocaleString({ month: "long" });

const diaSemanaActual = hoy.weekday; // Obtiene el numero de dia de la semana actual (1 lunes, 2 martes, etc)
let dtDiario = DateTime.now()
let dtSemanal = DateTime.now()

//fechas en formato YYYY-MM-DD
// let fechaActual = dt.toISODate();
//hora en formato HH:mm
const horaActual = DateTime.now().toFormat('HH:mm');






