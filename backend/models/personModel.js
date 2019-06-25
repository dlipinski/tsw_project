const mongoose = require('mongoose')

const personSchema = new mongoose.Schema({
    name : String,
    country: String
})

module.exports = mongoose.model('Person', personSchema)