//Recuperamos variables
const btn = document.querySelector(".switch-btn");
const video = document.querySelector(".video-container");

btn.addEventListener("click", function(){

    //Si el botón no tiene la clase de slide en el CSS, lo añadimos, para que se mueva el botón
    if(!btn.classList.contains("slide")){
        btn.classList.add("slide");

        //Ponemos pausa al video
        video.pause();
    }

    //Si ya tiene la clase, la quitamos, para que el botón vuelva a la posición original
    else{
        btn.classList.remove("slide");
        video.play();
    }
});

//Recuperamos la pantalla de carga
const preloader = document.querySelector(".preloader");
window.addEventListener("load", function(){
    //DOMContentLoaded se ejecuta cuando el documento HTML inicial ha sido completamente cargado y parseado, sin esperar a CSS, ni imágenes, ni nada de ese tipo.
    //En cambio el evento load se ejecuta cuando toda la página ha cargado, incluyendo todos los recursos dependientes como CSS e imágenes.
    //Incorporamos la funcionalidad haciendo que el preloader se oculte cuando la página termine de cargar
    preloader.classList.add("hide-preloader");

})