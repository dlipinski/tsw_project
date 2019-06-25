const Horse = require('../models/horseModel')

exports.list = (req, res) => {
    let page = parseInt(req.params.page)
    if (page < 1) {
        page = 1
    }
    Horse.find()
        .skip((page - 1) * 10)
        .limit(10)
        .exec((err, horses) => {
            if (err) {
                console.log(err)
                res.status(400).end()
            }
            res.send(horses)
        })
}

exports.show = (req, res) => {
    let id = req.params.id
    Horse.findById(id)
        .populate('class')
        .populate('breeder')
        .populate('owner')
        .populate('o')
        .populate('m')
        .populate('om')
        .exec((err, horse) => {
            if (err) {
                console.log(err)
                res.status(400).end()
            }
            res.send(horse)
        })
}

exports.create = (req, res) => {
    let newHorse = new Horse()
    newHorse.name = req.body.name
    newHorse.country = req.body.country
    newHorse.year = req.body.year
    newHorse.ointment = req.body.ointment
    newHorse.sex = req.body.sex
    newHorse.class = req.body.class
    newHorse.breeder = req.body.breeder
    newHorse.owner = req.body.owner
    newHorse.o = req.body.o
    newHorse.m = req.body.m
    newHorse.om = req.body.om
    newHorse.save((err) => {
        if (err) {
            console.log(err)
            res.status(400).end()
        }
        res.end()
    })
}

exports.update = (req, res) => {
    let id = req.params.id
    Horse.findByIdAndUpdate(
        id,
        req.body,
        (err, clas) => {
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
    Horse.findByIdAndDelete(
        id,
        (err, clas) => {
            if (err) {
                console.log(err)
                res.status(400).end()
            }
            res.end()
        }
    )
}