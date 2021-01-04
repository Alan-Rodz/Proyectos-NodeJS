const { readFile } = require('fs').promises;

const express = require('express');

const app = express();

app.get('/', async (req, res)=>{

    res.send( await readFile('./home.html', 'utf-8'));

})

const PORT = 3000
app.listen(process.env.PORT || 3000, () => console.log(`Aplicación disponible en localhost en el puerto ${PORT}`))