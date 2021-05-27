// ****** Recuperamos Variables **********

const form = document.querySelector(".grocery-form");
const alert = document.querySelector(".alert");
const grocery = document.getElementById("grocery");
const submitBtn = document.querySelector(".submit-btn");
const container = document.querySelector(".grocery-container");
const list = document.querySelector(".grocery-list");
const clearBtn = document.querySelector(".clear-btn");

// Variables que usamos para manejar la edición de los artículos
let editElement;
let editFlag = false;
let editID = "";

// ****** Eventos **********
//Evento para cuando se añade artículo
form.addEventListener("submit", addItem);

//Evento para cuando se borran todos los artículos de la lista
clearBtn.addEventListener("click", clearItems);

//Evento para cuando la página termina de cargar y recuperamos la información que teníamos del almacenamiento local
window.addEventListener("DOMContentLoaded", setupItems);

// ****** Funciones **********
//Función para añadir artículos
function addItem(e) {
    //Como por default manda a un servidor, lo evitamos. Luego accesamos el valor que se ha escrito. El ID que estamos usando no sería usado en un proyecto serio pero de momento nos sirve para generar números únicos.
    e.preventDefault();
    const value = grocery.value;
    const id = new Date().getTime().toString();

    //Si queremos añadir un artículo a la lista y no estamos editando. (Recordamos que por default las cosas en JavaScript son verdaderas o falsas)
    if (value !== "" && !editFlag) {
        const element = document.createElement("article");
        let attr = document.createAttribute("data-id");
        attr.value = id;
        element.setAttributeNode(attr);
        element.classList.add("grocery-item");
        element.innerHTML = `<p class="title">${value}</p>
            <div class="btn-container">
              <!-- edit btn -->
              <button type="button" class="edit-btn">
                <i class="fas fa-edit"></i>
              </button>
              <!-- delete btn -->
              <button type="button" class="delete-btn">
                <i class="fas fa-trash"></i>
              </button>
            </div>
          `;
        
        //Ahora que tenemos acceso a los elementos que hemos creado, es cuando podemos interactuar con ellos
        const deleteBtn = element.querySelector(".delete-btn");
        deleteBtn.addEventListener("click", deleteItem);
        const editBtn = element.querySelector(".edit-btn");
        editBtn.addEventListener("click", editItem);
        list.appendChild(element);
        
        //Alerta positiva
        displayAlert("item added to the list", "success");

        ////Mostramos lo que hemos añadido
        container.classList.add("show-container");
        
        //Lo añadimos al almacenamiento local
        addToLocalStorage(id, value);

        //Volvemos a la visión default (es decir, limpiamos la form)
        setBackToDefault();

    } 

    //Si queremos añadir un artículo a la lista pero sí estamos editando
    else if (value !== "" && editFlag) {
        editElement.innerHTML = value;
        displayAlert("value changed", "success");

        //Editamos el artículo en el almacenamiento local
        editLocalStorage(editID, value);
        setBackToDefault();
    } 
    
    //Si estamos añadiendo un artículo vacío (no hay nada en el form y estamos dando click en añadir) 
    else {
        displayAlert("please enter value", "danger");
    }
}

//Función para mostrar alertas rojas o verdes
function displayAlert(text, action) {
    alert.textContent = text;
    alert.classList.add(`alert-${action}`);
    
    //Después de cierto tiempo removemos el letrero
    setTimeout(function () {
        alert.textContent = "";
        alert.classList.remove(`alert-${action}`);
    }, 1000);
}

//Función para borrar toda la lista de artículos
function clearItems() {
    //Seleccionamos todos los artículos que haya
    const items = document.querySelectorAll(".grocery-item");
    if (items.length > 0) {
        items.forEach(function (item) {
            list.removeChild(item);
        });
    }
    //Escondemos el botón de "remover todos los artículos" y volvemos al default. 
    container.classList.remove("show-container");
    displayAlert("empty list", "danger");
    setBackToDefault();

    //Removemos la lista entera del almacenamiento local
    localStorage.removeItem("list");
}

//Función para borrar artículos
function deleteItem(e) {
    const element = e.currentTarget.parentElement.parentElement;
    const id = element.dataset.id;

    list.removeChild(element);

    if (list.children.length === 0) {
        container.classList.remove("show-container");
    }
    displayAlert("item removed", "danger");

    setBackToDefault();

    //Removemos de almacenamiento local
    removeFromLocalStorage(id);
}

//Función para editar artículos
function editItem(e) {
    //Recuperamos el artículo de la lista y lo podemos en la sección para editar
    const element = e.currentTarget.parentElement.parentElement;
    editElement = e.currentTarget.parentElement.previousElementSibling;
    grocery.value = editElement.innerHTML;
    editFlag = true;
    editID = element.dataset.id;
    
    //Ponemos "Editando" en el botón, en vez de "Añadir"
    submitBtn.textContent = "edit";
}

//Función para mostrar lo que se ve por default
function setBackToDefault() {
    grocery.value = "";
    editFlag = false;
    editID = "";
    submitBtn.textContent = "submit";
}

// ****** Almacenamiento Local **********
//Función que añade al almacenamiento local
function addToLocalStorage(id, value) {
    const grocery = { id, value };
    let items = getLocalStorage();
    items.push(grocery);
    localStorage.setItem("list", JSON.stringify(items));
}

//Función que devuelve arreglo con los artículos que hemos metido dentro de él
function getLocalStorage() {
    return localStorage.getItem("list")
        ? JSON.parse(localStorage.getItem("list"))
        : [];
}

//Función que remueve del almacenamiento local
function removeFromLocalStorage(id) {

    //Iteramos sobre los artículos de nuestro arreglo y removemos el que ya no queremos
    let items = getLocalStorage();
    items = items.filter(function (item) {
        if (item.id !== id) {
            return item;
        }
    });

    localStorage.setItem("list", JSON.stringify(items));
}

//Función que edita el almacenamiento local
function editLocalStorage(id, value) {
    let items = getLocalStorage();

    items = items.map(function (item) {
        if (item.id === id) {
            item.value = value;
        }
        return item;
    });
    localStorage.setItem("list", JSON.stringify(items));
}

// ****** Recuperando artículos de almacenamiento local **********
function setupItems() {
    let items = getLocalStorage();

    if (items.length > 0) {
        items.forEach(function (item) {
            createListItem(item.id, item.value);
        });
        container.classList.add("show-container");
    }
}

//Función que "crea" los artículos que añadimos a la lista
function createListItem(id, value) {
    //Creamos lo que hemos añadido como un artículo y le añadimos clase e id
    const element = document.createElement("article");
    let attr = document.createAttribute("data-id");
    attr.value = id;
    element.setAttributeNode(attr);
    element.classList.add("grocery-item");
    element.innerHTML = `<p class="title">${value}</p>
            <div class="btn-container">
              <!-- edit btn -->
              <button type="button" class="edit-btn">
                <i class="fas fa-edit"></i>
              </button>
              <!-- delete btn -->
              <button type="button" class="delete-btn">
                <i class="fas fa-trash"></i>
              </button>
            </div>
          `;

    //Ahora que tenemos acceso a los elementos que hemos creado, es cuando podemos interactuar con ellos
    const deleteBtn = element.querySelector(".delete-btn");
    deleteBtn.addEventListener("click", deleteItem);
    const editBtn = element.querySelector(".edit-btn");
    editBtn.addEventListener("click", editItem);
    list.appendChild(element);
}