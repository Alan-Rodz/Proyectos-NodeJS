//Auth sdk
const auth = firebase.auth();

//Sign user in / out on click of button
//We wouldnt do this if we were using react or somthn like that
const whenSignedIn = document.getElementById('whenSignedIn');
const whenSignedOut = document.getElementById('whenSignedOut');

const signInBtn = document.getElementById('signInBtn');
const signOutBtn = document.getElementById('signOutBtn');

const userDetails = document.getElementById('userDetails');

//Instancia
const provider = new firebase.auth.GoogleAuthProvider();

//Inicio de sesión
signInBtn.onclick = () => auth.signInWithPopup(provider);

//Cierre de sesión
signOutBtn.onclick = () => auth.signOut();

//Mostramos cosas dependiendo de si el usuario ha iniciado sesión o no
auth.onAuthStateChanged(user => {
    if(user){
        //Signed in
        whenSignedIn.hidden = false;
        whenSignedOut.hidden = true;
        userDetails.innerHTML = `<h3>Hola ${user.displayName}!</h3> <p>ID de Usuario: ${user.uid}</p>`;
    } else {
        //Not signed in
        whenSignedIn.hidden = true;
        whenSignedOut.hidden = false;
        userDetails.innerHTML = '';
    }
});

//Referencia al FirestoreSDK
const db = firebase.firestore();

const createThing = document.getElementById('createThing');
const thingsList = document.getElementById('thingsList');

//Referencia a una locación en la base de datos y variable que nos deja des-suscribirnos al stream de eventos en la DB
let thingsRef;
let unsubscribe;

//Funcionalidad para que el usuario vea la lista de cosas asociadas con el
auth.onAuthStateChanged(user => {
    if(user){
        //Referencia a la base de datos
        thingsRef = db.collection('things');

        //Eventhandler en el botón que crea cosas aleatoriamente
        createThing.onclick = () => {

            //Nos sirve para saber cuando fue creado este documento
            //Funciona mejor que Date.now()
            const { serverTimestamp } = firebase.firestore.FieldValue;

            //.add crea un nuevo documento a esa colección cuando tenemos una referencia a dicha colección
            //el uid se genera de manera automática
            //Toma un JSObject como su argumento
            thingsRef.add({

                //Asociamos un documento con un usuario haciendo una referencia a su userid en el documento 
                //Así podemos hacer query con todos los documentos que tienen el userid correspondiente
                uid:user.uid,

                //Faker.js
                name: faker.commerce.productName(),
                createdAt: serverTimestamp()

            });
        }

        //Query que nos devuelve la lista de cosas que este usuario ha creado 
        //.onSnapshot nos da un real-time-stream de todos los cambios al query
        //Si solo quisieramos obtener la información 1 vez usariamos get
        //a .onSnapshot le damos una callback function que es llamada cada vez que la información cambia
        //Compound query porque estamos usando .orderBy('createdAt')
        unsubscribe = thingsRef.where('uid', '==', user.uid).orderBy('createdAt')
        .onSnapshot(querySnapshot => {
            //Se ejecuta cuando la informacion de la DB cambia
            //querySnapshot es un objeto con un arreglo de documentos que podemos usar para actualizar la UI

            //Aquí tomamos el arreglo de documentos y los mapeamos a un arreglo de listitems que podemos mostrar en html
            const items = querySnapshot.docs.map(doc => {
                return `<li>${doc.data().name}</li>`;
            });

            //Actualizamos el html
            thingsList.innerHTML = items.join('');
        });

        //Nos des-suscribimos cuando ya no necesitamos la informacion
    } else {
        unsubscribe && unsubscribe();

    }
    
});

