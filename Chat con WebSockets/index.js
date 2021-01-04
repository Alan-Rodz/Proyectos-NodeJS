//Creamos un servidor http y llamamos a socket.io
const http = require('http').createServer();
const io = require('socket.io')(http, {

    //Cualquier url puede acceder a nuestra URL en el backend
    cors: {origin:"*"}
});

//Escuchamos por conexiones
//El callback nos dará acceso al objeto socket
io.on('connection', (socket)=>{
    console.log('Un usuario se ha conectado');

    //Cuando recibimos un mensaje obtenemos acceso al objeto (en este caso llamado mensaje) que mostramos en la consola
    socket.on('mensaje', (mensaje)=>{
        console.log('mensaje');

        //Como tenemos muchos clientes escuchando, podemos re-emitir el mensaje para que le llegue a todos
        io.emit('mensaje', `${socket.id.substr(0,2)} ha dicho: ${mensaje}`);
    });
});

//Le decimos al servidor que escuche en este puerto
http.listen(8080, ()=> console.log('Escuchando en localhost en el puerto 8080'));