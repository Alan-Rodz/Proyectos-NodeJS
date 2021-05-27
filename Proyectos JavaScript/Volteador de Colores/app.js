const colors = ["rgba(123,239,178,1)", "rgba(246,36,89,1)", "rgba(133,122,200)", "rgba(154,18,179,1)"];

const btn = document.getElementById("btn");
const color = document.querySelector(".color");

//Esto es lo que hace que cambie de color el fondo
btn.addEventListener("click", function(){
    //Obtener numero aleatorio entre 0 y 3
    const randomNumber = getRandomNumber();
    console.log(randomNumber);
    document.body.style.backgroundColor = colors[randomNumber];
    color.textContent = colors[randomNumber];

})

//Esto es lo que genera numeros aleatorios
function getRandomNumber(){
    return Math.floor(Math.random()*colors.length)
}