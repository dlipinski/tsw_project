const Person = require('../models/personModel')

exports.list = (req, res) => {
    let page = parseInt(req.params.page)
    if (page < 0) {
        page = 0
    }
    Person.find()
        .skip((page - 1) * 10)
        .limit(10)
        .exec((err, persons) => {
            if (err) {
                console.log(err)
                res.status(400).end()
            }
            res.send(persons)
        })
}

exports.show = (req, res) => {
    let id = req.params.id
    Person.findById(id)
        .exec((err, person) => {
            if (err) {
                console.log(err)
                res.status(400).end()
            }
            res.send(person)
        })
}

exports.create = (req, res) => {
    let newPerson = new Person()
    newPerson.name = req.body.name
    newPerson.country = req.body.country
    newPerson.save(err => {
        if (err) {
            console.log(err)
            res.status(400).end()
        }
    })
    res.end()
}

exports.update = (req, res) => {
    let id = req.params.id
    Person.findByIdAndUpdate(
        id,
        req.body,
        (err, person) => {
            if (err) {
                console.log(err)
                res.status(400).end()
            }
            res.end()
        }
    )
}

exports.remove = (req, res) => {
    let id = req.params.id
    Person.findByIdAndDelete(
        id,
        (err, person) => {
            if (err) {
                console.log(err)
                res.status(400).end()
            }
            res.end()
        }
    )
}