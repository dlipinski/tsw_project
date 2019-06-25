const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const cookieSession = require('cookie-session')
const passport = require('passport')
const initPassport = require('./passport/init');
const routes = require('./routes')

const app = express()
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(express.static('public'))

mongoose.connect('mongodb://localhost:27017/tsw_project', { useNewUrlParser: true, useFindAndModify: false })

app.use(cookieSession({ name: 'mysession', keys: ['somerandomkey'], maxAge: 1000 * 60 * 60 }))
app.use(passport.initialize())
app.use(passport.session())

initPassport(passport)

app.use('/api', routes(passport))

app.listen(5000, () => {
    console.log('App listening on port 5000')
    console.log('Press Ctrl+C to quit.')
})
