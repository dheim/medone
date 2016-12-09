var mongoose = require('mongoose');

var prescriptionSchema = new mongoose.Schema({
    patientId: Number,
    drugDocId: Number,
    drugName: String,
    unity: String,
    dosageSet: {
        dosageScheme: String,
        disposalsMorningNoonEveningNight: {
            morning: Number,
            noon: Number,
            evening: Number,
            night: Number
        },
        disposalsSpecificTimes: [{
            time: String,
            dosage: String
        }]
    },
    updated_at: {type: Date, default: Date.now}
});

module.exports = mongoose.model('Prescription', prescriptionSchema);
