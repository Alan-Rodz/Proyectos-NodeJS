'use strict';
const uuid = require('uuid');
const AWS = require('aws-sdk');
AWS.config.setPromisesDependency(require('bluebird'));
const dynamoDb = new AWS.DynamoDB.DocumentClient();

//Lo que ocurre cuando usamos .submit
module.exports.submit = (event, context, callback) => {
  const requestBody = JSON.parse(event.body);
  const nombreCompleto = requestBody.nombreCompleto;
  const email = requestBody.email;
  const experiencia = requestBody.experiencia;

  if (typeof nombreCompleto !== 'string' || typeof email !== 'string' || typeof experiencia !== 'number') {
    console.error('La validación falló. Cheque que nombreCompleto == email == string y experiencia == numero');
    callback(new Error('No se pudo agregar al candidato por errores de verificación.'));
    return;
  }

//Funcion para agregar informacion de un candidato y enviarla a la base de datos
  agregarInformacionCandidato(informacionCandidato(nombreCompleto, email, experiencia))
    .then(res => {
      callback(null, {
        statusCode: 200,
        body: JSON.stringify({
          mensaje: `Se agregó de manera exitosa al candidato con email ${email}`,
          idCandidato: res.id
        })
      });
    })
    .catch(err => {
      console.log(err);
      callback(null, {
        statusCode: 500,
        body: JSON.stringify({
          mensaje: `No se pudo agregar al candidato con email ${email}`
        })
      })
    });
};

//Funcion para agregar candidatos
const agregarInformacionCandidato = candidato => {
  console.log('Agregando candidato');
  const informacionCandidato = {
    TableName: process.env.TABLA_CANDIDATOS,
    Item: candidato,
  };
  return dynamoDb.put(informacionCandidato).promise()
    .then(res => candidato);
};

//Función para generar candidatos
const informacionCandidato = (nombreCompleto, email, experiencia) => {
  const timestamp = new Date().getTime();
  return {
    id: uuid.v4(),
    nombreCompleto: nombreCompleto,
    email: email,
    experiencia: experiencia,
    agregado: timestamp,
    actualizado: timestamp,
  };
};

//Lo que ocurre cuando usamos .list
//Nos devuelve una lista con todos los candidatos que tenemos en la base de datos
module.exports.list = (event, context, callback) => {
  var params = {
    TableName: process.env.TABLA_CANDIDATOS,
    ProjectionExpression: "id, nombreCompleto, email"
  };

  console.log("Escaneando la tabla de candidatos.");
  const onScan = (err, data) => {

    if (err) {
      console.log('El escaneo falló en cargar la información. Error:', JSON.stringify(err, null, 2));
      callback(err);
    } else {
      console.log("El escaneo tuvo éxito.");
      return callback(null, {
        statusCode: 200,
        body: JSON.stringify({
          candidatos: data.Items
        })
      });
    }

  };

  dynamoDb.scan(params, onScan);

};

//Nos sirve para obtener los detalles de un candidato a partir de su ID
module.exports.get = (event, context, callback) => {
  const params = {
    TableName: process.env.TABLA_CANDIDATOS,
    Key: {
      id: event.pathParameters.id,
    },
  };

  dynamoDb.get(params).promise()
    .then(result => {
      const response = {
        statusCode: 200,
        body: JSON.stringify(result.Item),
      };
      callback(null, response);
    })
    .catch(error => {
      console.error(error);
      callback(new Error('No se pudo obtener al candidato.'));
      return;
    });
};