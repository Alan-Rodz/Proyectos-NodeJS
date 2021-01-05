const express = require('express')
const { graphqlHTTP } = require('express-graphql'); const app = express()
const {
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLString,
    GraphQLList,
    GraphQLInt,

    //No podemos regresar null para este tipo
    GraphQLNonNull
} = require('graphql')

//Informacion de ejemplo para autores en vez de usar BD
const autores = [
	{ id: 1, nombre: 'J. K. Rowling' },
	{ id: 2, nombre: 'J. R. R. Tolkien' },
	{ id: 3, nombre: 'Brent Weeks' }
]

//Informacion de ejemplo para libros en vez de usar BD
const libros = [
	{ id: 1, nombre: 'Harry Potter', idAutor: 1 },
	{ id: 2, nombre: 'Harry Potter Y el Prisionero de Azkabán', idAutor: 1 },
	{ id: 3, nombre: 'Harry Potter 2', idAutor: 1 },
	{ id: 4, nombre: 'La comunidad del anillo', idAutor: 2 },
	{ id: 5, nombre: 'Las dos torres', idAutor: 2 },
	{ id: 6, nombre: 'El retorno del rey', idAutor: 2 },
	{ id: 7, nombre: 'El camino de las sombras', idAutor: 3 },
	{ id: 8, nombre: 'Más allá de las sombras', idAutor: 3 }
]

//tipoLibro es un custom object definido aquí
const tipoLibro = new GraphQLObjectType({
    name: 'Libro',
    description: 'Esto representa un libro escrito por un determinado autor',
    fields: () => ({
        id:{type:  GraphQLNonNull(GraphQLInt) },
        nombre: {type: GraphQLNonNull(GraphQLString)},
        idAutor: {type: GraphQLNonNull(GraphQLInt)},
        autor: {type: tipoAutor,
            
            //Resolve para cómo obtenemos este autor ya que libros no tiene este campo por default
            resolve: (libroPadre) => {
                return autores.find(autor => autor.id === libroPadre.idAutor)
            }
        }
    })
})


//tipoAutor es un custom object definido aquí
const tipoAutor = new GraphQLObjectType({
    name: 'Autor',
    description: 'Esto representa un autor de un libro',
    fields: () => ({
        id:{type:  GraphQLNonNull(GraphQLInt) },
        nombre: {type: GraphQLNonNull(GraphQLString)},
        libros:{ type: new GraphQLList(tipoLibro),
        
        resolve: (autorPadre) => {
            return libros.filter(libro => libro.idAutor === autorPadre.id)
        }}
    })
})

const RootMutationType = new GraphQLObjectType({
    name: 'Mutation', 
    description: 'Root Mutation - Mutacion Raiz', 
    fields: () => ({
        agregarLibro:{
            type: tipoLibro, 
            description: 'Añadir un libro', 
            args:{
                nombre:{type: GraphQLNonNull(GraphQLString)},
                idAutor: {type: GraphQLNonNull(GraphQLInt)}
            },

            resolve: (parent, args) => {
                //La id es la longitud del arreglo de libros + 1
                const libro = {id: libros.length + 1, nombre: args.nombre, idAutor:args.idAutor}
                libros.push(libro)
                return libro
            }
        },

        agregarAutor:{
            type: tipoAutor, 
            description: 'Añadir un autor', 
            args:{
                nombre:{type: GraphQLNonNull(GraphQLString)},
            },

            resolve: (parent, args) => {
                //La id es la longitud del arreglo de libros + 1
                const autor = {id: autores.length + 1, nombre: args.nombre}
                autores.push(autor)
                return autor
            }
        }
    })
})


const RootQueryType = new GraphQLObjectType({
    name:'Query', 
    description: 'Root Query - Query Raiz', 

    //Envolvemos la funcion en () para no tener que agregar return statement (porque regresa un solo objeto, lo que hay dentro de {})
    fields: ()=>({

        //Query para un solo libro
        libro:{
            type: tipoLibro,
            description: 'Un solo libro devuelto dependiendo del argumento que recibimos', 
            //Definimos qué argumentos son válidos
            args:{
                id:{type: GraphQLInt}
            },
            resolve: (padre, args) => libros.find(libro => libro.id === args.id)
        },


        libros:{
            type: new GraphQLList(tipoLibro),
            description: 'Lista de todos los libros',
            resolve: () => libros
        },

        autores:{
            type: new GraphQLList(tipoAutor),
            description: 'Lista de todos los autores', 
            resolve: () => autores   
        },

        autor:{
            type: tipoAutor,
            description: 'Un solo autor',
            args:{
                id:{type: GraphQLInt}
            },
            resolve: (autorPadre, args) => autores.find(autor=> autor.id === args.id)
        }
    })
})

//Schema que usa lo que tenemos definido arriba
const schema = new GraphQLSchema({
    query: RootQueryType,
    mutation: RootMutationType,
})

app.use('/graphql', graphqlHTTP({

    //El schema que estamos usando
    schema: schema,

    //Nos da una GUI para usar graphql
    graphiql: true
}));
app.listen(5000., () => console.log('El servidor está funcionando'))