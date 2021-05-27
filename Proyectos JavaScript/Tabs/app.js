//Recuperamos variables
const btns = document.querySelectorAll(".tab-btn");
const about = document.querySelector(".about");
const articles = document.querySelectorAll(".content");

//Le ponemos eventos a los botones de "about"
about.addEventListener("click", function(e){
    //Usamos dataset.id para recuperar el botón en el que estamos dando click
    const id = e.target.dataset.id;
    //Si el botón existe, significa que hemos dado click en él, por lo que lo volvemos el único botón activo. Si en cambio es "undefined" simplemente lo ignoramos
    if(id){
        //Removemos "activo" de los otros botones y se lo agregamos sólo a aquél donde dimos click
        btns.forEach(function(btn){
            btn.classList.remove("active");
            e.target.classList.add("active");
        });

        //Hacemos lo mismo de arriba pero para el contenido de los botones
        //A cada uno le quitamos la clase activa
        articles.forEach(function(article){
            article.classList.remove("active");
            
        });
        //Solo le añadimos la clase activa a aquél donde dimos click
        const element = document.getElementById(id);
        element.classList.add("active");
    }
});