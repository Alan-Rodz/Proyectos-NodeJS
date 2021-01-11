//Para que no podamos usar variables que no han sido declaradas
'use strict';

const AWS = require('aws-sdk');

//Función para DELETE
exports.handler = async(event, context) => {

    //Instanciamos lo que nos permite comunicarnos con DynamoDB
    const documentClient = new AWS.DynamoDB.DocumentClient();

    //Variables que mandamos como metadata
    let responseBody = '';
    let statusCode  = 0;

    //Obtenemos el id del event object en los parametros del path
    const {id} = event.pathParameters;

    //Parámetros que contienen la información de lo que queremos borrar
    //En este caso estamos borrando por id 
    const params = {
        TableName: "Productos", 
        Key: {
            id: id
        }
    };

    //Obtenemos el responseBody y el statusCode de AWS
    try {
        const informacion = await documentClient.delete(params).promise();
        responseBody = JSON.stringify(informacion);
        statusCode = 204;
    } catch (error) {
        responseBody = `No se pudo borrar el producto: ${error}`;
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