// Arreglo con las reseñas
//Normalmente esto se obtendría desde AJAX y una HTTP request pero aquí está hard-coded
const reviews = [
  {
    id: 1,
    name: "Susana Salcedo",
    job: "Desarrolladora Web",
    img:
      "https://res.cloudinary.com/diqqf3eq2/image/upload/v1586883334/person-1_rfzshl.jpg",
    text:
      "¡El mejor producto que he usado!",
  },
  {
    id: 2,
    name: "Sarahí Gómez",
    job: "Diseñadora Web",
    img:
      "https://res.cloudinary.com/diqqf3eq2/image/upload/v1586883409/person-2_np9x5l.jpg",
    text:
      "¡Excelente variedad!",
  },
  {
    id: 3,
    name: "Pedro Rodríguez",
    job: "Interno en IBM Guadalajara",
    img:
      "https://res.cloudinary.com/diqqf3eq2/image/upload/v1586883417/person-3_ipa0mj.jpg",
    text:
      "En mi trabajo usamos este producto todo el tiempo. Hace mi día a día mucho más cómodo.",
  },
  {
    id: 4,
    name: "Patricio Sosa",
    job: "Ingeniero de Software",
    img:
      "https://res.cloudinary.com/diqqf3eq2/image/upload/v1586883423/person-4_t9nxjt.jpg",
    text:
      "En definitiva usar este producto ha ayudado a nuestra compañia. Desde que lo usamos nuestra producción ha mejorado muchísimo.",
  },
];

//Obteniendo variables
const img = document.getElementById("person-img");
const author = document.getElementById("author");
const job = document.getElementById("job");
const info = document.getElementById("info");

const prevBtn = document.querySelector(".prev-btn");
const nextBtn = document.querySelector(".next-btn");
const randomBtn = document.querySelector(".random-btn");

//Poniendo la reseña inicial
let currentItem = 0;

//Cargando la reseña inicial
window.addEventListener("DOMContentLoaded", function () {
  const item = reviews[currentItem];
  img.src = item.img;
  author.textContent = item.name;
  job.textContent = item.job;
  info.textContent = item.text;
});

//Mostrando a la persona dependiendo de la reseña
function showPerson(person) {
  const item = reviews[person];
  img.src = item.img;
  author.textContent = item.name;
  job.textContent = item.job;
  info.textContent = item.text;
}


//Botón Siguiente
nextBtn.addEventListener("click", function () {
  currentItem++;
  if (currentItem > reviews.length - 1) {
    currentItem = 0;
  }
  showPerson(currentItem);
});

//Botón Anterior
prevBtn.addEventListener("click", function () {
  currentItem--;
  if (currentItem < 0) {
    currentItem = reviews.length - 1;
  }
  showPerson(currentItem);
});

//Botón aleatorio
randomBtn.addEventListener("click", function(){
  currentItem = Math.floor(Math.random()*reviews.length);
  showPerson(currentItem);
}); 