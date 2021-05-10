const mongoose  = require('mongoose');
const Schema  = mongoose.Schema;

const PatientSchema = new Schema({
    name : String,
    email : String,
    pwd : String,
});

module.exports = Patients = mongoose.model('patient',PatientSchema);