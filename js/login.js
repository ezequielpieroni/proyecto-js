const botonLogin = document.querySelector(".botonLogin");
botonLogin.addEventListener("click", ingreso);


function ingreso() {
    let user = "hola";
    let pass = "123";
    if (document.getElementById("password").value === pass && document.getElementById("username").value === user) {
        location.href = "../../proyecto-js/pages/agendadiaria.html";
    } else {
        alert("Usuario o contraseña incorrecta");
    } 
}
    


