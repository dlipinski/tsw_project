const mongoose = require('mongoose')

require('./personModel')

const personSchema = new mongoose.Schema({
    category : String,
    judges: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Person' }]
})

module.exports = mongoose.model('Class', personSchema)