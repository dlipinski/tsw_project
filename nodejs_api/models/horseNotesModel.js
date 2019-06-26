const mongoose = require('mongoose')

require('./horseModel')
require('./noteModel')

const horseNotesSchema = new mongoose.Schema({
    horse : { type: mongoose.Schema.Types.ObjectId, ref: 'Horse' },
    sumAvg: Number,
    typeAvg: Number,
    moveAvg: Number,
    notes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Note' }]
})

module.exports = mongoose.model('HorseNote', horseNotesSchema)