const express = require('express');
const { readFile } = require('fs');

//Instancia express
const app = express();

//Cuando el usuario vaya a ./ recibimos una request (que aqui no usamos) y devolvemos una response
//Lo que estamos haciendo es leer home.html, ponerlo en utf-8 y enviarlo como el elemento html
app.get('/', (request, response)=>{

    readFile('./home.html', 'utf-8', (err, html)=>{        
        if(err){
            response.status(500).send('Algo salio mal. Error 500.')
        }
        response.send(html);
    })
})

//Le decimos a express que escuche en este puerto
app.listen(process.env.PORT || 3000, () => console.log(`Aplicación disponible en localhost en el puerto ${PORT}`))