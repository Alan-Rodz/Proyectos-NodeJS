const express = require('express');
const app = express();
const servidor = require('http').Server(app);
const io = require('socket.io')(servidor);
const {v4:uuidV4} = require('uuid');


//Rutas
app.set('view engine', 'ejs');
app.use(express.static('public'));

//Creamos una nueva habitación con id único y redireccionamos al usuario a esa habitación
app.get('/', (req, res) => {
    res.redirect(`/${uuidV4()}`)
})

app.get('/:habitacion', (req, res) => {
    res.render('habitacion', {idHabitacion: req.params.habitacion})
})

//Cada que alguien se conecta a la pagina
io.on('connection', socket => {

    socket.on('join-room', (idHabitacion, idUsuario) => {
        socket.join(idHabitacion);
        socket.to(idHabitacion).broadcast.emit('user-connected', idUsuario);

        socket.on('disconnect', () => {
            socket.to(idHabitacion).broadcast.emit('user-disconnected', idUsuario)
        })
    })
} )

servidor.listen(3000);