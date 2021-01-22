const functions = require("firebase-functions");
var admin = require("firebase-admin");
const express = require('express');
const cors = require('cors');
//apikey de firebase
var serviceAccount = require("./permission.json"); 

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

//Iniciamos la app y le decimos que use CORS
const app = express();
app.use(cors({ origin: true }));

//Referencia a la base de datos
const db = admin.firestore();

//Rutas
app.get('/hello-world', (req, res)=>{
    return res.status(200).send('Hola mundo!');
});

//Crear
app.post('/api/crear', (req, res) => {
    (async () => {
        try {
            await db.collection('productos').doc('/'+req.body.id+'/').create({
                nombre: req.body.nombre,
                descripcion: req.body.descripcion,
                precio: req.body.precio
            })

            return res.status(200).send();
        } catch (error) {
            console.log(error);
            return res.status(500).send(error); 
        }
    })();
});

//Leer (GET)
app.get('/api/leer/:id', (req, res) => {
    (async () => {
        try {
            const documento = db.collection('productos').doc(req.params.id);
            let producto = await documento.get();
            let respuesta = producto.data();
            return res.status(200).send(respuesta);
        } catch (error) {
            console.log(error);
            return res.status(500).send(error);
        }
    })();
});

//Leer Todos los Productos (GET)
app.get('/api/leer', (req, res) => {
    (async () => {
        try {
            let query = db.collection('productos');
            let respuesta = [];
            await query.get().then(querySnapshot => {
                let documentos = querySnapshot.docs; //Resultado del query
                for(let documento of documentos){
                    const articuloSeleccionado = {
                        id: documento.id,
                        nombre: documento.data().nombre,
                        descripcion: documento.data().descripcion,
                        precio: documento.data().precio
                    };
                    respuesta.push(articuloSeleccionado);
                }

                //Cada then debe regresar un valor
                return respuesta;
            });
            return res.status(200).send(respuesta);
        } catch (error) {
            console.log(error);
            return res.status(500).send(error);
        }
    })();
});

//Actualizar
app.put('/api/actualizar/:id', (req, res) => {
    (async () => {
        try {
            const documento = db.collection('productos').doc(req.params.id);
            await documento.update({
                nombre: req.body.nombre,
                descripcion: req.body.descripcion,
                precio: req.body.precio
            });
            return res.status(200).send();
        } catch (error) {
            console.log(error);
            return res.status(500).send(error);
        }
    })();
});


//Borrar
app.delete('/api/borrar/:id', (req, res) => {
    (async () => {
        try {
            const documento = db.collection('productos').doc(req.params.id);
            await documento.delete();
            return res.status(200).send();
        } catch (error) {
            console.log(error);
            return res.status(500).send(error);
        }
    })();
});



//Llama la funcion cuando hay una nueva request
//Exporta la API a Firebase Cloud Functions
exports.app = functions.https.onRequest(app)
