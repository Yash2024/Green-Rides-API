const mongoose = require('mongoose');

const cycleSchema = {
    _id: mongoose.Schema.Types.ObjectId,
    cycleid: {type: String},
    status: {type: String},
    stdid: {type: String}
}

module.exports = mongoose.model('Cycle', cycleSchema);