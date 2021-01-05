const express = require('express');
const uuid = require('uuid');
const router = express.Router();
const miembros = require('../../miembros');

//Creamos rutas
//app.get('/', (req, res)=>{
//Enviando texto
//res.send('<h1>Hello World!</h1>');

//Enviando archivos
//En el directorio actual, ve a uno llamado public, y regresa index.html  
//res.sendFile(path.join(__dirname, 'public', 'index.html'));
//})


//Creando más rutas
//En este ejemplo queremos devolver el arreglo miembros cuando consultemos la ruta en cuestion
//Por tanto esta ruta nos da todos los miembros
router.get('/', (req, res) => {
    //Usamos res.json cuando queremos devolver json
    res.json(miembros);
});

//Ruta para obtener un solo miembro
router.get('/:id', (req, res) => {
    //Nos dice si el miembro en cuestión está o no en el arreglo
    const encontrado = miembros.some(miembro => miembro.id === parseInt(req.params.id));

    if (encontrado) {
        res.json(miembros.filter(miembro => miembro.id === parseInt(req.params.id)));
    } else {
        //Mandamos un 404
        res.status(400).json({ mensaje: `El miembro con el id ${req.params.id} no fue encontrado` });
    }


});

//Creando un miembro, notese que aunque estamos usando /, aquí es un post en vez de un get
router.post('/', (req, res) => {

    const nuevoMiembro = {
        id: uuid.v4(),
        nombre: req.body.nombre,
        email: req.body.email,
        status: 'activo'
    }

    //Nos aseguramos de que estamos recibiendo la informacion correcta
    if (!nuevoMiembro.nombre || !nuevoMiembro.email) {
        return res.status(400).json({ mensaje: 'Porfavor incluye un nombre y un email' });
    }

    //Agregamos al arreglo
    miembros.push(nuevoMiembro);

    //Devolvemos el nuevo arreglo que incluye al miembro recientemente agregado
    res.json(miembros);

    //Redirigimos a la pagina principal como hariamos normalmente en una webapp
    //res.redirect('/');

});


//Actualizar miembro
router.put('/:id', (req, res) => {
    //Nos dice si el miembro en cuestión está o no en el arreglo
    const encontrado = miembros.some(miembro => miembro.id === parseInt(req.params.id));

    if (encontrado) {
        const miembroActualizado = req.body;
        //Hacemos un loop a través de los miembros que tenemos y donde el id sea el mismo hacemos la actualizacion
        miembros.forEach(miembro => {
            if (miembro.id === parseInt(req.params.id)) {

                //Si en la solicitud viene para actualizar el nombre lo actualizamos, si no, conservamos lo anterior
                //lo mismo con el email
                miembro.nombre = miembroActualizado.nombre ? miembroActualizado.nombre : miembro.nombre;
                miembro.email = miembroActualizado.email ? miembroActualizado.email : miembro.email;

                res.json({ mensaje: 'El miembro fue actualizado: ', miembro });
            }
        });
    } else {
        //Mandamos un 404
        res.status(400).json({ mensaje: `El miembro con el id ${req.params.id} no fue encontrado` });
    }


});

//Ruta para borrar un miembro
router.delete('/:id', (req, res) => {
    //Nos dice si el miembro en cuestión está o no en el arreglo
    const encontrado = miembros.some(miembro => miembro.id === parseInt(req.params.id));

    if (encontrado) {
        res.json({ mensaje: 'Miembro borrado, ahora el arreglo se ve así:', miembros: miembros.filter(miembro => miembro.id !== parseInt(req.params.id)) });
    } else {
        //Mandamos un 404
        res.status(400).json({ mensaje: `El miembro con el id ${req.params.id} no fue encontrado` });
    }


});

module.exports = router;