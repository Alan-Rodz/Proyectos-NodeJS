//Bring in mongoose
const mongoose = require('mongoose')

//Function to connect to our db
//async since we're working with promises
const connectDB = async() => 
{
    try 
    {
        const conn = await mongoose.connect(process.env.MONGO_URI, 
            {
                //Options that we use to avoid warnings appearing in the console
                useNewUrlParser: true, 
                useUnifiedTopology: true, 
                useFindAndModify: false
            })

            //After we connect
            console.log(`Conexion a MongoDB en Host:${conn.connection.host}`)
    } 

    //Si hubo un error y no nos pudimos conectar
    catch (error) 
    {
        //Mencionamos el error que ocurrio y salimos con failure (1)
        console.error(error)
        process.exit(1)
    }
}

//This allows us to run this method on the app.js file 
module.exports = connectDB