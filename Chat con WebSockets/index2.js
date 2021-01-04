const WebSocket = require('ws')

//Inicializamos el servidor en puerto 8080
const servidor = new WebSocket.Server({port:8080})

//Cuando un cliente se conecta
//Cuando alguien se conecta obtenemos acceso a un objeto websocket en el callback
servidor.on('connection', socket => {

    //Escuchamos por mensajes y cuando los recibimos confirmamos
    socket.on('message', message => {
        socket.send(`Se recibió el mesaje ${message}`)
    })
})