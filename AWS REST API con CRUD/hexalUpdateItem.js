//Para que no podamos usar variables que no han sido declaradas
'use strict';

const AWS = require('aws-sdk');

//Función para UPDATE
exports.handler = async(event, context) => {

    //Instanciamos lo que nos permite comunicarnos con DynamoDB
    const documentClient = new AWS.DynamoDB.DocumentClient();

    //Variables que mandamos como metadata
    let responseBody = '';
    let statusCode  = 0;

    //Extraemos la información necesaria
    const {id, nombreProducto } = JSON.parse(event.body);

    //Parámetros que contienen la información
    //Estamos actualizando informacion x id
    const params = {
        TableName: "Productos", 
        Key: {
            id: id,
        },

        //Especificamos qué es lo que vamos  actualizar
        UpdateExpression: "set nombreProducto = :n",

        //Especificamos qué es lo que pondremos en ese campo y el nuevo valor
        ExpressionAttributeValues: {
            ":n": nombreProducto
        },

        ReturnValues: "UPDATED_NEW"
    }; 

    //Obtenemos el responseBody y el statusCode de AWS
    try {
        const informacion = await documentClient.update(params).promise();
        responseBody = JSON.stringify(informacion);
        statusCode = 204;
    } catch (error) {
        responseBody = `No se pudo actualizar el producto: ${error}`;
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