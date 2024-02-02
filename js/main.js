let usuario = "Eze";
let pass = "123456";
let resultado;

function logIn() {
     for (let i=0; i<3; i++){
        let ingresoUser = prompt("Ingrese usuario");
        let ingresoPass = prompt("Ingrese contraseña"); 
        if (ingresoUser == usuario && ingresoPass == pass ) {
            return true;
        } else {
            alert("Usuario o contraseña incorrecta");
        } 
    }
    return false;
}

resultado = logIn();

if (resultado) {
    alert ("Bienvenido/a")
} else {
    alert ("Has superado el numero de intentos")
}
