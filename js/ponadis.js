const usuario = document.querySelector(".usuario");
const usuarioMenu = document.querySelector(".usuario-menu")

usuario.addEventListener("click", () =>{
    usuarioMenu.classList.toggle("activo");
})