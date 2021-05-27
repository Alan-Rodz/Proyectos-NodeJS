//Arreglo con la información del menú. Normalmente se obtendría con AJAX o una API
const menu = [
  {
    id: 1,
    title: "Hot Cakes",
    category: "Desayuno",
    price: 150,
    img: "./images/item-1.jpeg",
    desc: `I'm baby woke mlkshk wolf bitters live-edge blue bottle, hammock freegan copper mug whatever cold-pressed `,
  },
  {
    id: 2,
    title: "Hamburguesa",
    category: "Almuerzo",
    price: 130,
    img: "./images/item-2.jpeg",
    desc: `vaporware iPhone mumblecore selvage raw denim slow-carb leggings gochujang helvetica man braid jianbing. Marfa thundercats `,
  },
  {
    id: 3,
    title: "Malteada Sencilla",
    category: "Malteadas",
    price: 50,
    img: "./images/item-3.jpeg",
    desc: `ombucha chillwave fanny pack 3 wolf moon street art photo booth before they sold out organic viral.`,
  },
  {
    id: 4,
    title: "Desayuno",
    category: "Desayuno",
    price: 130,
    img: "./images/item-4.jpeg",
    desc: `Shabby chic keffiyeh neutra snackwave pork belly shoreditch. Prism austin mlkshk truffaut, `,
  },
  {
    id: 5,
    title: "Hamburguesa Especial",
    category: "Almuerzo",
    price: 120,
    img: "./images/item-5.jpeg",
    desc: `franzen vegan pabst bicycle rights kickstarter pinterest meditation farm-to-table 90's pop-up `,
  },
  {
    id: 6,
    title: "Malteada de Oreo",
    category: "Malteadas",
    price: 50,
    img: "./images/item-6.jpeg",
    desc: `Portland chicharrones ethical edison bulb, palo santo craft beer chia heirloom iPhone everyday`,
  },
  {
    id: 7,
    title: "Hamburguesa con Tocino",
    category: "Desayuno",
    price: 100,
    img: "./images/item-7.jpeg",
    desc: `carry jianbing normcore freegan. Viral single-origin coffee live-edge, pork belly cloud bread iceland put a bird `,
  },
  {
    id: 8,
    title: "Hamburguesa Tradicional",
    category: "Almuerzo",
    price: 120,
    img: "./images/item-8.jpeg",
    desc: `on it tumblr kickstarter thundercats migas everyday carry squid palo santo leggings. Food truck truffaut  `,
  },
  {
    id: 9,
    title: "Malteada de Cuarentena",
    category: "Malteadas",
    price: 70,
    img: "./images/item-9.jpeg",
    desc: `skateboard fam synth authentic semiotics. Live-edge lyft af, edison bulb yuccie crucifix microdosing.`,
  },
  {
    id: 10,
    title: "Filete",
    category: "Cena",
    price: 170,
    img: "./images/item-10.jpeg",
    desc: `skateboard fam synth authentic semiotics. Live-edge lyft af, edison bulb yuccie crucifix microdosing.`,
  },
];

//Recuperamos las variables que usaremos
const sectionCenter = document.querySelector(".section-center");
const btnContainer = document.querySelector(".btn-container");

//Cuando la página termina de cargar mostramos el contenido
window.addEventListener("DOMContentLoaded", function () {
  diplayMenuItems(menu);
  displayMenuButtons();
});

//Función que sirve para mostrar el contenido
function diplayMenuItems(menuItems) {
  let displayMenu = menuItems.map(function (item) {
    
    //Obtenemos un solo arreglo con la información del arreglo "menu", que convertiremos en un solo string
    return `<article class="menu-item">
          <img src=${item.img} alt=${item.title} class="photo" />
          <div class="item-info">
            <header>
              <h4>${item.title}</h4>
              <h4 class="price">$${item.price}</h4>
            </header>
            <p class="item-text">
              ${item.desc}
            </p>
          </div>
        </article>`;
  });
  //Lo convertimos en 1 solo string
  displayMenu = displayMenu.join("");
  
  //Ponemos el string en la sección correspondiente del HTML
  sectionCenter.innerHTML = displayMenu;
}

//Función que sirve para mostrar lo que tendrán los botones basándonos en el arreglo menu
function displayMenuButtons() {

  //Obtenemos las categorías únicas del arreglo "menu"
  const categories = menu.reduce(
    function (values, item) {
      
      //Si no está la categoría todavía en nuestro arreglo, la añadimos
      if (!values.includes(item.category)) {
        values.push(item.category);
      }
      return values;
    },
    ["all"]
  );

  //De manera similar a como hicimos con el contenido, lo meteremos todo dentro de 1 sólo string
  const categoryBtns = categories
    .map(function (category) {
      return `<button type="button" class="filter-btn" data-id=${category}>
          ${category}
        </button>`;
    })
    .join("");

  //Ponemos ese string en la sección correspondiente
  btnContainer.innerHTML = categoryBtns;

  //Recuperamos los botones para poder darles su funcionalidad
  const filterBtns = btnContainer.querySelectorAll(".filter-btn");
  
  //Añadimos evento a cada botón
  filterBtns.forEach(function (btn) {
    btn.addEventListener("click", function (e) {
      
      //Basándonos en la categoría de cada botón los usaremos para filtrar el contenido
      const category = e.currentTarget.dataset.id;
      const menuCategory = menu.filter(function (menuItem) {
        
        //Si la categoría del elemento en el arreglo "menu" es igual a la categoría que hemos usado para el botón, la usaremos
        if (menuItem.category === category) {
          return menuItem;
        }
      });
      if (category === "all") {
        diplayMenuItems(menu);
      } else {
        diplayMenuItems(menuCategory);
      }
    });
  });
}
