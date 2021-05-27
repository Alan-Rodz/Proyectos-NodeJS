//Recuperamos variables
const toggleBtn = document.querySelector(".sidebar-toggle")
const closeBtn = document.querySelector(".close-btn")
const sidebar = document.querySelector(".sidebar")

//Añadimos evento para mostrar la sidebar
toggleBtn.addEventListener("click", function(){
    sidebar.classList.toggle("show-sidebar");
})

//Botón para cuando estemos en pantallas pequeñas y cerremos la sidebar
closeBtn.addEventListener("click", function(){
    sidebar.classList.remove("show-sidebar");
})