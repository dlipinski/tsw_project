const Note = require('../models/noteModel')

exports.list = (req, res) => {
    let page = parseInt(req.params.page)
    if (page < 0) {
        page = 0
    }
    Note.find()
        .skip((page - 1) * 10)
        .limit(10)
        .exec((err, notes) => {
            if (err) {
                console.log(err)
                res.status(400).end()
            }
            res.send(notes)
        })
}

exports.show = (req, res) => {
    let id = req.params.id
    Note.findById(id)
        .exec((err, note) => {
            if (err) {
                console.log(err)
                res.status(400).end()
            }
            res.send(note)
        })
}

exports.create = (req, res) => {
    let newNote = new Note()
    newNote.type = req.body.type
    newNote.head = req.body.head
    newNote.clog = req.body.clog
    newNote.legs = req.body.legs
    newNote.move = req.body.move
    newNote.save(err => {
        if (err) {
            console.log(err)
            res.status(400).end()
        }
    })
    res.end()
}

exports.update = (req, res) => {
    let id = req.params.id
    Note.findByIdAndUpdate(
        id,
        req.body,
        (err, note) => {
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
    Note.findByIdAndDelete(
        id,
        (err, note) => {
            if (err) {
                console.log(err)
                res.status(400).end()
            }
            res.end()
        }
    )
}