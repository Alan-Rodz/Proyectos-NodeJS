// classList - Muestra todas las clases
// toggle - Activa y desactiva 

const navToggle = document.querySelector(".nav-toggle");
const links = document.querySelector(".links");

//En pantalla pequeña, cuando demos click en el menú, se mostrarán los links.
navToggle.addEventListener("click", function(){
    links.classList.toggle("show-links");
});