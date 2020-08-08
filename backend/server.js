const express = require('express')
const mongoose = require('mongoose')
const projectRoute = require('./routes/project.route')
const authRoutes = require('./routes/auth.routes')
const passportSetup = require('./config/passport-setup')
const passport = require('passport')
const cookieSession = require('cookie-session')
const cookieparser = require('cookie-parser')

const app = express()

app.use(cookieSession({
    name: 'session',
    //a day
    maxAge: 24 * 60 * 60 * 1000,
    keys: [process.env.PASSPORT_KEY]
}))

app.use(cookieparser())

app.use(passport.initialize())
app.use(passport.session())

//cors allows to use stuff outside server into server
//somewhat axios requests
const cors = require('cors')
app.use(cors({
    origin: "http://localhost:3001", // allow to server to accept request from different origin
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true// allow session cookie from browser to pass through
}))

//Dotenv is a zero-dependency module that loads environment variables from a .env file into process.env
require('dotenv').config()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

mongoose.connect(process.env.MONGO_URI, { useCreateIndex: true, useNewUrlParser: true, useUnifiedTopology: true })
    .then((res) => {
        console.log("Mongoose Connected")
        app.listen(process.env.PORT , () => {
            console.log(`Connected To Port: ${process.env.PORT}`)
        })
    })
    .catch(err => console.log(err))


app.use('/auth',authRoutes)
app.use('/project',projectRoute)