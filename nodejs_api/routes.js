const router = require('express').Router()

const classController = require('./controllers/classController')
const personController = require('./controllers/personController')
const horseController = require('./controllers/horseController')
const noteController = require('./controllers/noteController')
const customController = require('./controllers/customController')

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

    /* CLASS */
    router.get('/classes/:page', classController.list)
    router.get('/class/:id', classController.show)
    router.post('/class', classController.create)
    router.put('/class/:id', classController.update)
    router.delete('/class/:id', classController.remove)

    /* PERSON */
    router.get('/persons/:page', personController.list)
    router.get('/person/:id', personController.show)
    router.post('/person', personController.create)
    router.put('/person/:id', personController.update)
    router.delete('/person/:id', personController.remove)

    /* HORSE */
    router.get('/horses/:page', horseController.list)
    router.get('/horse/:id', horseController.show)
    router.post('/horse', horseController.create)
    router.put('/horse/:id', horseController.update)
    router.delete('/horse/:id', horseController.remove)

    /* NOTE */
    router.get('/notes/:page', noteController.list)
    router.get('/note/:id', noteController.show)
    router.post('/note', noteController.create)
    router.put('/note/:id', noteController.update)
    router.delete('/note/:id', noteController.remove)

    /* CUSTOM */
    router.get('/judges/:page', customController.list_judges)
    router.get('/classesClient/:page', customController.list_classes_client)
    router.get('/classClient/:id', customController.show_class_client)
    
    return router
}

const authMiddleware = (req, res, next) => {
    if (!req.isAuthenticated()) {
        res.status(401).send('You are not authenticated')
    } else {
        return next()
    }
}