require('dotenv').config()

const express = require('express')
const session = require('express-session')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const helmet = require('helmet')
const passport = require('passport')
const mongoose = require('mongoose')
const consola = require('consola')

const app = express()

// Configures IP and port
const host = process.env.HOST || '127.0.0.1'
const port = process.env.PORT || 3000

// Import route(s)
const routes = require('./routes')

// Configures Express App
app.set('port', port)
app.use(helmet())
app.use(bodyParser.json())
app.use(cookieParser())
app.use(
  session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
    // Expires in forever
    cookie: { maxAge: new Date(253402300000000) }
  })
)
app.use(passport.initialize())
app.use(passport.session())

async function start () {
  // Connect to MongoDB
  console.log('Connecting to MongoDB...')
  await mongoose.connect(process.env.DATABASE)
  console.log('Connected to MongoDB!')

  // Set up Passport Auth
  require('./auth_config')(passport)

  // Loads Express API routes
  app.use('/', routes)

  // Listen the server
  app.listen(port, host)
  consola.ready({
    message: `Server listening on http://${host}:${port}`,
    badge: true
  })
}

start()
