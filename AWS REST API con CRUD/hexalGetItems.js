//Para que no podamos usar variables que no han sido declaradas
'use strict';

const AWS = require('aws-sdk');

//Función para GET todo el contenido de la BD
exports.handler = async(event, context) => {

    //Instanciamos lo que nos permite comunicarnos con DynamoDB
    const documentClient = new AWS.DynamoDB.DocumentClient();

    //Variables que mandamos como metadata
    let responseBody = '';
    let statusCode  = 0;

    //Parámetros que contienen la información de aquello a lo que queremos acceder
    const params = {
        TableName: "Productos"
    };

    //Obtenemos el responseBody y el statusCode de AWS
    //Scan itera sobre todo el contenido de la Tabla 
    try {
        const informacion = await documentClient.scan(params).promise();
        responseBody = JSON.stringify(informacion.Items);
        statusCode = 200;
    } catch (error) {
        responseBody = `No se pudieron recuperar los productos: ${error}`;
        statusCode = 403;
    }

    //Lo que AWS nos da lo metemos dentro de la respuesta
    const respuesta = {
        statusCode: statusCode,
        headers: {
            "Content-Type": "application/json"
        },
        body: responseBody
    };

    //Devolvemos la respuesta
    return respuesta;
};