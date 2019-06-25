const mongoose = require('mongoose')

require('./personModel')
require('./noteModel')

const horseSchema = new mongoose.Schema({
    name : String,
    country: String,
    year: Number,
    ointment: String,
    sex: String,
    class: { type: mongoose.Schema.Types.ObjectId, ref: 'Class' },
    breeder: { type: mongoose.Schema.Types.ObjectId, ref: 'Person' },
    owner: { type: mongoose.Schema.Types.ObjectId, ref: 'Person' },
    o: { type: mongoose.Schema.Types.ObjectId, ref: 'Person' },
    m: { type: mongoose.Schema.Types.ObjectId, ref: 'Person' },
    om: { type: mongoose.Schema.Types.ObjectId, ref: 'Person' },
    notes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Note' }]
})

module.exports = mongoose.model('Horse', horseSchema)