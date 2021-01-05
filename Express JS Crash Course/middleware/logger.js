const moment = require('moment');

//Función middleware, siempre toman req, res y next, luego la inicializamos 
//En este caso, cuando llamamos la api de abajo, en la consola aparece lo que queramos poner
const logger = (req, res, next) => {
    console.log(`${req.protocol}://${req.get('host')}${req.originalUrl}: ${moment().format()}`);
    next();
}

module.exports = logger;