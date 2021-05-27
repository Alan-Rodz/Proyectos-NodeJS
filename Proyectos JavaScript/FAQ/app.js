//Recuperamos variables
const btns = document.querySelectorAll(".question-btn");

//Añadimos EventListener a cada botón
btns.forEach(function(btn){
    btn.addEventListener("click", function(e){
        const question = e.currentTarget.parentElement.parentElement;
        question.classList.toggle("show-text");
    });
});