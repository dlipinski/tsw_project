const router = require('express').Router()

const classController = require('./controllers/classController')
const personController = require('./controllers/personController')
const noteController = require('./controllers/noteController')



module.exports = (passport) => {

    /* LOGIN */
	router.post('/signin', passport.authenticate('signin', {
		successRedirect: '/',
        failureRedirect: 'signin',
        failureMessage: "Nieprawidłowa nazwa użytkownika lub hasło." 
    }))
    router.get('/signout', (req, res) => {
        req.logout()
        res.end()
    })

    /* CLASS */
    router.get('/classes', (req, res) => { res.redirect('/classes/1') })
    router.get('/classes/:page', classController.list)
    router.get('/class/:id', classController.show)
    router.post('/class', classController.create)
    router.put('/class/:id', classController.update)
    router.delete('/class/:id', classController.remove)

    /* PERSON */
    router.get('/persons', (req, res) => { res.redirect('/persons/1') })
    router.get('/persons/:page', personController.list)
    router.get('/person/:id', personController.show)
    router.post('/person', personController.create)
    router.put('/person/:id', classController.update)
    router.delete('/person/:id', personController.remove)

    /* NOTE */
    router.get('/notes', (req, res) => { res.redirect('/notes/1') })
    router.get('/notes/:page', noteController.list)
    router.get('/note/:id', noteController.show)
    router.post('/note', noteController.create)
    router.put('/note/:id', noteController.update)
    router.delete('/note/:id', noteController.remove)

    return router
}