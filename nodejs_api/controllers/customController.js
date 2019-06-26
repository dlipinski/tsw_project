const Person = require('../models/personModel')
const Class = require('../models/classModel')

exports.list_judges = (req, res) => {
    let page = parseInt(req.params.page)
    if (page < 0) {
        page = 0
    }
    Person
        .find({ 'type': 'judge' })
        .sort('name')
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

exports.list_classes_client = (req, res) => {
    let page = parseInt(req.params.page)
    if (page < 0) {
        page = 0
    }
    Class
        .find({ 'pending': false })
        .sort('-createdAt')
        .skip((page - 1) * 3)
        .limit(3)
        .populate('horses')
        .exec((err, classes) => {
            if (err) {
                console.log(err)
                res.status(400).end()
            }
            res.send(classes)
        })
}

exports.show_class_client = (req, res) => {
    let id = req.params.id
    Class
        .findOne({ '_id': id })
        .populate('judges')
        .populate('horses')
        .populate('horseNotes')
        .populate({
            path: 'horseNotes',
            model: 'HorseNote',
            populate: {
              path: 'horse',
              model: 'Horse'
            }
        })
        .populate({
            path: 'horseNotes',
            model: 'HorseNote',
            populate: {
              path: 'notes',
              model: 'Note',
              populate: {
                path: 'judge',
                model: 'Person'
              }
            }
        })
        .exec((err, clas) => {
            if (err) {
                console.log(err)
                res.status(400).end()
            }
            res.send(clas)
        })
}