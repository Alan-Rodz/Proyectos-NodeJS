//Allows us to use path.join
const path = require('path')

//Create a basic express server
const express = require('express')

//Bring in Mongoose
const mongoose = require('mongoose')

//dotenv has our configuration variables
const dotenv = require('dotenv')

//Bring in morgan for logins
const morgan = require('morgan')

//exphbs stands for expresshandlebars (brings in handlebars)
const exphbs = require('express-handlebars')

//Allows us to method override
const methodOverride = require('method-override')

//Bring in passport
const passport = require('passport')

//Allows us to use express with passport
const session = require('express-session')

//We use this so that our sessions dont expire everytime the server gets restarted
const MongoStore = require('connect-mongo')(session)

//Allows us to connect to our DB
const connectDB = require('./config/db')

//Load config file (dotenv object with path to config file)
dotenv.config({path:'./config/config.env'})

//Passport config
require('./config/passport')(passport)

//We connect to our DB
connectDB()

//Initialize our app
const app = express()

//Body parser middleware
app.use(express.urlencoded({extended:false}))
app.use(express.json())

//Method override middleware
app.use(
  methodOverride(function (req, res) {
    if (req.body && typeof req.body === 'object' && '_method' in req.body) {
      // look in urlencoded POST bodies and delete it
      let method = req.body._method
      delete req.body._method
      return method
    }
  })
)

//Handlebars helpers
const {formatDate, stripTags, truncate, editIcon, select} = require('./helpers/hbs')

//Handlebars
app.engine('.hbs', exphbs({helpers: 
    {
        formatDate,
        stripTags,
        truncate,
        editIcon,
        select
    }, 
    
    defaultLayout:'main', extname:'.hbs'}))
app.set('view engine', '.hbs');

//Express session middleware to communicate with passport middleware
app.use(session(
    {
        secret: 'keyboard cat',

        //We dont want to save a session if nothing is modified
        resave: false,

        //Dont create a session until something is
        saveUninitialized: false,

        //So that we dont lose logins when server get restarted
        store: new MongoStore({mongooseConnection:mongoose.connection})

        //This wont work withouth https
        //cookie:{secure:true}
    }))

//Passport middleware
app.use(passport.initialize())
app.use(passport.session())

//Express global variable to make sure users can edit their posts (set as middleware)
app.use(function(req, res, next)
    {
        res.locals.user = req.user || null
        next()
    })

//Static folder
app.use(express.static(path.join(__dirname, 'public')))

//Routes
app.use('/', require('./routes/index')) 
app.use('/auth', require('./routes/auth'))
app.use('/stories', require('./routes/stories'))

//We're accessing variables inside the config/config.env file (if it doesnt find it it will use 5000)
const PORT = process.env.PORT || 3000
app.listen(PORT, console.log(`Servidor activo en modo ${process.env.NODE_ENV} en el puerto ${PORT}`))
//If we're on development mode, then morgan will notify us in the console when we get a request (logging)
if(process.env.NODE_ENV === 'development'){app.use(morgan('dev'))}

