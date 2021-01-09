const socket = io('/')
const videoGrid = document.getElementById('video-grid')
const myPeer = new Peer(undefined, {
    host: '/',
    port: '3001'
})

//No queremos oir nuestro propio video
const miVideo = document.createElement('video')
miVideo.muted = true

//Arreglo donde guardamos los usuarios
const usuarios = {}

//Cuando alguien se conecta estos son los defaults
navigator.mediaDevices.getUserMedia({
    video: true,
    audio: true
}).then(stream => {
    agregarStreamVideo(miVideo, stream)

//Cuando alguien se desconecta
socket.on('user-disconnected', idUsuario => {
    if(usuarios[idUsuario]){
        usuarios[idUsuario].close()
    }
})

//Cuando recibimos una llamada a nuestra habitacion
    myPeer.on('call', llamada => {
        llamada.answer(stream)
        const video = document.createElement('video')
        llamada.on('stream', videoStreamUsuario => {
            agregarStreamVideo(video, videoStreamUsuario)
        })
    })


    //Cuando un nuevo usuario se conecta
    socket.on('user-connected', idUsuario => {
        conectarNuevoUsuario(idUsuario, stream)
    })
})


//Cuando nos conectamos con el servidor Peer y se nos da una id, queremos hacer:
myPeer.on('open', id => {
    //Cuando alguien se une emitimos el id de la habitación y su id
    socket.emit('join-room', ID_HABITACION, id)
})

//Funcion que nos sirve para agregar un nuevo usuario que se conecta a nuestra pagina 
function conectarNuevoUsuario(idUsuario, stream){
    const llamada = myPeer.call(idUsuario, stream)
    const video = document.createElement('video')
    llamada.on('stream', videoStreamUsuario => {
        agregarStreamVideo(video, videoStreamUsuario)
    })

    //Cuando se desconectan
    llamada.on('close', () => {
        video.remove()
    })

    usuarios[idUsuario] = llamada
}


//Función que hace que el video aparezca en el elemento video de la pagina
function agregarStreamVideo(video, stream){
    video.srcObject = stream 
    video.addEventListener('loadedmetadata', () => {
        video.play()
    })
    videoGrid.append(video);
}

