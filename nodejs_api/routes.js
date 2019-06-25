const router = require('express').Router()

const classController = require('./controllers/classController')
const personController = require('./controllers/personController')
const horseController = require('./controllers/horseController')
const noteController = require('./controllers/noteController')

//temp
const User = require('./models/userModel')


module.exports = (passport) => {

    /* LOGIN */
    router.post('/login', (req, res, next) => {
        passport.authenticate('login', (err, user, info) => {
            if (err) return next(err)
            if (!user) return res.status(400).send([user, 'Cannot log in', info])
            req.login(user, err => {
                res.send('Logged in')
            })
        })(req, res, next)
    })
    router.get('/logout', (req, res) => {
        req.logout()
        res.end()
    })
    router.get("/user", authMiddleware, (req, res) => {
        User.findById(
            req.session.passport.user,
            (err, user) => {
                res.send({user})
            }
        )
    })

    /* CLASS */
    router.get('/classes', (req, res) => {
        res.redirect('/api/classes/1')
    })
    router.get('/classes/:page', classController.list)
    router.get('/class/:id', classController.show)
    router.post('/class', classController.create)
    router.put('/class/:id', classController.update)
    router.delete('/class/:id', classController.remove)

    /* PERSON */
    router.get('/persons', (req, res) => {
        res.redirect('/api/persons/1')
    })
    router.get('/persons/:page', personController.list)
    router.get('/person/:id', personController.show)
    router.post('/person', personController.create)
    router.put('/person/:id', classController.update)
    router.delete('/person/:id', personController.remove)

    /* HORSE */
    router.get('/horses', (req, res) => {
        res.redirect('/api/horses/1')
    })
    router.get('/horses/:page', horseController.list)
    router.get('/horse/:id', horseController.show)
    router.post('/horse', horseController.create)
    router.put('/horse/:id', horseController.update)
    router.delete('/horse/:id', horseController.remove)

    /* NOTE */
    router.get('/notes', (req, res) => {
        res.redirect('/api/notes/1')
    })
    router.get('/notes/:page', noteController.list)
    router.get('/note/:id', noteController.show)
    router.post('/note', noteController.create)
    router.put('/note/:id', noteController.update)
    router.delete('/note/:id', noteController.remove)

    return router
}

const authMiddleware = (req, res, next) => {
    if (!req.isAuthenticated()) {
        res.status(401).send('You are not authenticated')
    } else {
        return next()
    }
}