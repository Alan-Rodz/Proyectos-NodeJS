// //Instanciamos la websocket class que ya está presente en el browser
// //Se instancia con una url que apunta al servidor y que usa el prefijo ws    
// const socket =  new WebSocket('ws://localhost:8080');

// //Escuchamos mensajes
// socket.onmessage = ({informacion}) => {
//     console.log('Mensaje del servidor: ', informacion);
// };

// document.querySelector('button').onclick() = () => {
//     socket.send('Hola');
// }

//Ahora podemos recuperar el objeto io
//Creamos la conexión apuntando a la url de nuestro servidor 
const socket = io('ws://localhost:8080');

//Escuchamos por mensajes
//Cuando recibimos un mensaje lo mostramos en el html
socket.on('message', texto => {
    const elemento = document.createElement('li');
    elemento.innerHTML = texto;
    document.querySelector('ul').appendChild(elemento);
})

//Le damos la habilidad al usuario para que mande mensajes a través de un eventListener en el botón de enviar mensajes
document.querySelector('button').onclick = () => {
    const texto = document.querySelector('input').value;
    socket.emit('message', texto);
}