//Recuperamos variables
const slides = document.querySelectorAll(".slide");
const nextBtn = document.querySelector(".nextBtn");
const prevBtn = document.querySelector(".prevBtn");

//Iteramos a través de las slides y las metemos todas dentro de la misma linea horizontal
slides.forEach(function(slide, index){
    slide.style.left = `${index*100}%`;
});

//Funcionalidad para que se mueva a la izquierda o a la derecha
let counter = 0;
prevBtn.addEventListener("click", function(){
    counter--;
    carousel();
});
nextBtn.addEventListener("click", function(){
    counter++;
    carousel();
});

//Función que se llama cuando presionamos los botones
function carousel(){

    //Dependiendo de la slide mostramos los botones necesarios
    if(counter < slides.length - 1){
        nextBtn.style.display = "block";
    }
    else{
        nextBtn.style.display = "none";
    }
    if(counter > 0){
        prevBtn.style.display = "block";
    }
    else{
        prevBtn.style.display = "none";
    }

    slides.forEach(function(slide){
        slide.style.transform = `translateX(-${counter*100}%)`;
    });
}

//Por default escondemos el botón anterior, ya que siempre iniciamos en la primera slide
prevBtn.style.display = "none";
