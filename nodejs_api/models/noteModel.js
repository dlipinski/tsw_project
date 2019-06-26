const mongoose = require('mongoose')

require('./personModel')

const noteSchema = new mongoose.Schema({
    type : Number,
    head: Number,
    clog: Number,
    legs: Number,
    move: Number,
    judge: { type: mongoose.Schema.Types.ObjectId, ref: 'Person' }
})

module.exports = mongoose.model('Note', noteSchema)