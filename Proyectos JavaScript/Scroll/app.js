// Element.getBoundingClientRect() regresa el tamaño de un elemento y su posición relativa al viewport.
// pageYOffset es una propiedad de lectura que regresa el número de pixeles que el documento ha avanzado verticalmente.
// slice extrae una sección de un string sin modificar el string original.
//offsetTop es un número que representa la posición más alta del elemento en pixeles. 

// ********** Obtenemos la fecha de manera dinámica ************
const date = document.getElementById("date");
date.innerHTML = new Date().getFullYear();

// ********** Ocultar los Links Dependiendo del Tamaño de la Pantalla************
const navToggle = document.querySelector(".nav-toggle");
const linksContainer = document.querySelector(".links-container");
const links = document.querySelector(".links");

navToggle.addEventListener("click", function(){
    //Calculamos la altura necesaria para los links que tengamos de manera dinámica
    const containerHeight = linksContainer.getBoundingClientRect().height;
    const linksHeight = links.getBoundingClientRect().height;

    //Si los links están ocultos (el default), añadimos altura dinámicamente a nuestro contenedor
    if(containerHeight == 0){
        linksContainer.style.height = `${linksHeight}px`;
    }
    //En cambio si los links ya están abiertos, los escondemos
    else{
        linksContainer.style.height = 0;
    }
});

// ********** Hacemos que el navbar se mantenga en su lugar independientemente de la posición vertical de la página ************
// ********** También añadimos la funcionalidad para el botón que regresa a la parte de arriba del documento ************
const navbar = document.getElementById("nav");
const topLink = document.querySelector(".top-link");

window.addEventListener("scroll", function () {
    //Si la altura del documento pasa cierto límite, añadimos la propiedad al navbar que hace que baje también el navbar
    const scrollHeight = window.pageYOffset;
    const navHeight = navbar.getBoundingClientRect().height;

    if (scrollHeight > navHeight) {
        navbar.classList.add("fixed-nav");
    } else {
        navbar.classList.remove("fixed-nav");
    }

    //Hacemos lo mismo con el botón que sirve para regresar hasta la parte de arriba del documento (está escondido por default)
    //Lo único que tenemos que decidir es a partir de qué punto lo mostramos. En este caso es a partir de 500px hacia abajo.
    if(scrollHeight > 500){
        topLink.classList.add("show-link");
    }else{
        topLink.classList.remove("show-link");
    }
});


// ********** Hacemos que al dar click en una sección de la página, bajemos hacia ella "smoothly" ************
// Recuperamos los links
const scrollLinks = document.querySelectorAll(".scroll-link");

//A cada link le ponemos un event listener y añadimos su funcionalidad
scrollLinks.forEach(function(link){
    link.addEventListener("click", function(e){
        //Prevenimos el comportamiento default que sabemos que no funciona correctamente
        e.preventDefault();

        //Navegando a una parte específica del documento
        //Primero obtenemos su href (#tours, #services, etc)
        //El método slice hace que obtengamos el string en sí mismo, sin el "#"
        const id = e.currentTarget.getAttribute("href").slice(1);

        //Ahora que obtuvimos el nombre de la variable, la seleccionamos con getElementByID
        const element = document.getElementById(id);

        //Obtenemos la posición del elemento y bajamos hacia esa posición
        //Calculamos las alturas
        const navHeight = navbar.getBoundingClientRect().height;
        const containerHeight = linksContainer.getBoundingClientRect().height;
        const fixedNav = navbar.classList.contains("fixed-nav");

        //Si la navbar tiene la propiedad de "fixed" entonces lo de abajo funciona
        let position = element.offsetTop - navHeight;

        //Como si no tiene dicha propiedad no funciona, checaremos y corregiremos
        //Si no hemos bajado más allá de la posición de la navBar:
        if(!fixedNav){
            position = position - navHeight
        }

        //82 es el tamaño de la navBar
        if(navHeight > 82){
            position = position + containerHeight;
        }

        window.scrollTo({
            left:0, 
            top:position,
        });

        //En pantallas pequeñas, cerramos la parte donde se muestran todos los links una vez que damos click (para que no estorbe)
        linksContainer.style.height = 0;
    });
});

