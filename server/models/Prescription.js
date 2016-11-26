var mongoose = require('mongoose');

var prescriptionSchema = new mongoose.Schema({
    drugDocId: Number,
    drugName: String,
    updated_at: {type: Date, default: Date.now}
});

module.exports = mongoose.model('Prescription', prescriptionSchema);
