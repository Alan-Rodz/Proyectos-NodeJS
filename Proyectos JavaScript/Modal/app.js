//Recuperamos variables
const modalBtn = document.querySelector(".modal-btn");
const modal = document.querySelector(".modal-overlay");
const closeBtn = document.querySelector(".close-btn");

//Cuando el usuario da click abrimos 
modalBtn.addEventListener("click", function(){
    modal.classList.add("open-modal");
});

//Cuando el usuario da click en la X cerramos
closeBtn.addEventListener("click", function(){
    modal.classList.remove("open-modal");
});