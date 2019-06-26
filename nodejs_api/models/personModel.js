const mongoose = require('mongoose')

const personSchema = new mongoose.Schema({
    name : String,
    country: String,
    type: String
})

module.exports = mongoose.model('Person', personSchema)