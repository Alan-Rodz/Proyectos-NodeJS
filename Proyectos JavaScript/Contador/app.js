//Cuenta inicial
let count = 0;

//Seleccionar el valor y los botones
const value = document.querySelector("#value");
const btns = document.querySelectorAll(".btn");

//A cada boton le añadimos un event listener
btns.forEach(function (btn){
    btn.addEventListener("click", function(e){

        //Cuando damos click, se guarda en "e" el botón que hemos seleccionado
        const styles = e.currentTarget.classList;

        //Si seleccionamos disminuir, decrementa el contador
        if(styles.contains("decrease")){
            count--;
        }

        //Si seleccionamos incrementar, aumenta el contador
        else if(styles.contains("increase")){
            count++;
        }

        //Si seleccionamos reiniciar, se reinicia el contador
        else{
            count = 0;
        }

        //Dependiendo del valor del contador, el número mostrado será de cierto color
        if(count > 0){
            value.style.color = "green";
        }
        if(count < 0){
            value.style.color = "red";
        }
        if(count == 0){
            value.style.color = "#222"
        }
        value.textContent = count;
    })
});