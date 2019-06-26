const mongoose = require('mongoose')

require('./personModel')
require('./noteModel')

const horseSchema = new mongoose.Schema({
    name : String,
    country: String,
    year: Number,
    ointment: String,
    sex: String,
    breeder: { type: mongoose.Schema.Types.ObjectId, ref: 'Person' },
    owner: { type: mongoose.Schema.Types.ObjectId, ref: 'Person' },
    o: { type: mongoose.Schema.Types.ObjectId, ref: 'Person' },
    m: { type: mongoose.Schema.Types.ObjectId, ref: 'Person' },
    om: { type: mongoose.Schema.Types.ObjectId, ref: 'Person' }
})

module.exports = mongoose.model('Horse', horseSchema)