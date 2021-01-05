//Creamos un servidor express sencillo
const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const logger = require('./middleware/logger');
const miembros = require('./miembros');
const app = express();

//app.use(logger);

//Middleware para usar handlebars
//Queremos que nuestro main layout se llame main.handlebars
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

//body parser middleware para json y para raw submissions
app.use(express.json());
app.use(express.urlencoded({extended:false}));

//Ruta para la homepage, se está comunicando con handlebars
app.get('/', (req, res) =>{
    res.render('index', {
        titulo:'Aplicación de Miembros',
        miembros
    })
});

//Directorio estático
app.use(express.static(path.join(__dirname, 'public')));

//Cuando recibimos algo del tipo /api/miembros consultamos lo que tenemos en ./routes/api/miembros
app.use('/api/miembros', require('./routes/api/miembros'));

//Queremos ver en las variables del environment a ver si encontramos PORT, sino, usamos 5000
const PORT = process.env.PORT || 5000;

app.listen(PORT, ()=> console.log(`Servidor funcionando en el puerto ${PORT}`));