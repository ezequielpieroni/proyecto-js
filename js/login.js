const botonLogin = document.querySelector(".botonLogin");
botonLogin.addEventListener("click", ingreso);

alert("Ingrese usuario y contraseña")

function ingreso() {
    let user = "hola";
    let pass = "123";
    if (document.getElementById("password").value === pass && document.getElementById("username").value === user) {
        alert ("Bienvenido/a");
        window.location = "../pages/agendadiaria.html";
    } else {
        alert("Usuario o contraseña incorrecta");
    } 
}
    


