const months = [
  "Enero",
  "Febrero",
  "Marzo",
  "Abril",
  "Mayo",
  "Junio",
  "Julio",
  "Agosto",
  "Septiembre",
  "Octubre",
  "Noviembre",
  "Diciembre",
];
const weekdays = [
  "Domingo",
  "Lunes",
  "Martes",
  "Miércoles",
  "Jueves",
  "Viernes",
  "Sábado",
];

//Recuperamos variables
const giveaway = document.querySelector(".giveaway");
const deadline = document.querySelector(".deadline");
const items = document.querySelectorAll(".deadline-format h4");

//Fecha opcional que se usa para que cuando mostremos el proyecto, siempre tenga 10 días más que la fecha actual
let tempDate = new Date();
let tempYear = tempDate.getFullYear();
let tempMonth = tempDate.getMonth();
let tempDay = tempDate.getDay();

//Mostramos cuándo terminará el sorteo de manera dinámica. Primero obtenemos los datos de las fechas. Luego lo ponemos donde va.
//Esta es la variable que modificaríamos para que mostrara la fecha deseada.
//let futureDate = new Date(2020, 11, 31, 23, 59, 0);

//Esta fecha es de muestra, siempre pone la fecha en 1 mes - 10 días en el futuro
const futureDate = new Date(tempYear, tempMonth+1, tempDay, 11, 30, 0);

const year = futureDate.getFullYear();
const date = futureDate.getDate();
const hours = futureDate.getHours();
const minutes = futureDate.getMinutes();

let month = futureDate.getMonth();
month = months[month];

let weekday = futureDate.getDay();
weekday = weekdays[weekday];

giveaway.textContent = `El sorteo termina el ${weekday} ${date} de ${month} de ${year} a las ${hours}:${minutes}AM.`;

//Tiempo que falta para la fecha de arriba en milisegundos. 
const futureTime = futureDate.getTime();

//Función que calcula los milisegundos que faltan para llegar a la fecha de arriba
function getRemainingTime(){
  const today = new Date().getTime();
  const t = futureTime-today;
  //1s = 1000ms
  //1m = 60s
  //1hr = 60min
  //1dia = 24h

  //Obtenemos los valores de días, horas, minutos, segundos, en milisegundos.
  const oneDay = 24*60*60*1000;
  const oneHour = 60*60*1000;
  const oneMinute = 60*1000;
  
  //Calculamos los valores correspondientes
  //Días
  let days = t/oneDay;
  days = Math.floor(days);
  
  //Horas
  let hours = ((t%oneDay)/ oneHour);
  hours = Math.floor(hours);

  //Minutos
  let minutes = Math.floor((t%oneHour)/oneMinute);

  //Segundos
  let seconds = Math.floor((t%oneMinute)/1000);

  //Metemos todo dentro de un arreglo
  const values = [days, hours, minutes, seconds];

  //Función que añade un 0 a la derecha para que los números aparezcan como "02, 03, 04", etc, en vez de "2, 3, 4".
  function format(item){
    if(item < 10){
      return item = `0${item}`;
    }
    return item
  }

  //Iteramos sobre los elementos de la página y ponemos el contenido que recuperamos en ellos
  items.forEach(function(item, index){
    item.innerHTML = format(values[index]);
  });

  //Si ya pasó la fecha, modificamos la sección donde se muestra la deadline para que muestre otro mensaje
  if(t < 0){
    clearInterval(countdown);
    deadline.innerHTML = `<h4 class = "expired">El sorteo ha expirado!</h4>`;
  }
}

//Esta variable nos dice que cada 1000ms (cada segundo) llamaremos la función getRemainingTime
let countdown = setInterval(getRemainingTime, 1000);

getRemainingTime();