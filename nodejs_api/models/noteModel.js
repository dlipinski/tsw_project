const mongoose = require('mongoose')

const noteSchema = new mongoose.Schema({
    type : Number,
    head: Number,
    clog: Number,
    legs: Number,
    move: Number
})

noteSchema.set('timestamps', true)

module.exports = mongoose.model('Note', noteSchema)