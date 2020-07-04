;
'use strict'

const express = require('express')
let app = express()
const connectDB = require('../config/db')
let db = connectDB()

const bodyParser = require('body-parser')
const cors = require('cors')
const passport = require('passport')


/**
 * Import routes
 */
let userRoute = require('../routes/user.route')

app.use(bodyParser.urlencoded({
    extended: false
}))
let corsOptions = {
    origin: 'http://localhost:3500',
    optionsSuccessStatus: 200
}

app.use(bodyParser.json())
app.use(cors(corsOptions))

let session = require('express-session')
let sess = {
    secret: process.env.KEY_SESSION,
    resave: false,
    saveUninitialized: true,
    name: 'sessionID',
    cookie: {
        httpOnly: false,
        maxAge: parseInt(process.env.TIME)
    }
}
// SESSION
app.use(session(sess))
// PASSPORT
app.use(passport.initialize())
app.use(passport.session())

/****************
 * USER ROUTES
 ****************/
app.use('/server', userRoute)

/**
 * EJEMPLOS PARA VERIFICACIÓN DE SESIÓN
 */
app.use((req, res, next) => {
    if (!req.session.views) {
        req.session.views = {}
    }

    // Get the url pathname
    let pathname = parseUrl(req).pathname

    // Count the views
    req.session.views[pathname] = (req.session.views[pathname] || 0) + 1
    next()
})
app.get('/session1', (req, res) => {
    res.send(`Las visitas de esta página son: ${req.session.views['/session1']}`)
})

app.get('/session2', (req, res) => {
    res.send(`Las visitas de esta página son: ${req.session.views['/session2']} SessionID: ${req.sessionID}`)
})

module.exports = app
