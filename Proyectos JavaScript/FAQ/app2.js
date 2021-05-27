//De manera alternativa también podemos hacerlo así
const questions = document.querySelectorAll(".question");

questions.forEach(function(question){
    const btn = question.querySelector(".question-btn");
    btn.addEventListener("click", function(){

        //Añadimos la funcionalidad para que si abrimos una pregunta se cierren las demás que están abiertas
        questions.forEach(function(item){
            if(item !== question){
                item.classList.remove("show-text");
            }
        });

        question.classList.toggle("show-text");
    });
});