const Class = require('../models/classModel')

exports.list = (req, res) => {
    let page = parseInt(req.params.page)
    if (page < 1) {
        page = 1
    }
    Class.find()
        .skip((page - 1) * 10)
        .limit(10)
        .exec((err, classes) => {
            if (err) {
                console.log(err)
                res.status(400).end()
            }
            res.send(classes)
        })
}

exports.show = (req, res) => {
    let id = req.params.id
    Class.findById(id)
        .populate('judges')
        .exec((err, clas) => {
            if (err) {
                console.log(err)
                res.status(400).end()
            }
            res.send(clas)
        })
}

exports.create = (req, res) => {
    let newClass = new Class()
    newClass.category = req.body.category
    newClass.judges = req.body.judges
    newClass.save((err) => {
        if (err) {
            console.log(err)
            res.status(400).end()
        }
        res.end()
    })
}

exports.update = (req, res) => {
    let id = req.params.id
    Class.findByIdAndUpdate(
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
    Class.findByIdAndDelete(
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