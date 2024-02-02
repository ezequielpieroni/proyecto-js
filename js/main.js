let usuario = "Eze";
let pass = "123456";
let resultado = false;

function logIn() {
     for (let i=0; i<3; i++){
        let ingresoUser = prompt("Ingrese usuario");
        let ingresoPass = prompt("Ingrese contraseña"); 
        if (ingresoUser == usuario && ingresoPass == pass ) {
            return true;
            break;
        } else {
            alert("Usuario o contraseña incorrecta")
        }    
    }
}

resultado = logIn();

if (resultado) {
    alert ("Bienvenido/a")
} else {
    alert ("Has superado el numero de intentos")
}
