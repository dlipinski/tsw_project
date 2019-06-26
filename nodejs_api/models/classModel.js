const mongoose = require('mongoose')

require('./personModel')
require('./horseModel')
require('./horseNotesModel')

const classSchema = new mongoose.Schema({
    category : String,
    pending: Boolean,
    judges: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Person' }],
    horses: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Horse' }],
    horseNotes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'HorseNote' }]
})

classSchema.set('timestamps', true)

module.exports = mongoose.model('Class', classSchema)