const mongoose  = require('mongoose');
const Schema  = mongoose.Schema;

const DocSchema = new Schema({
    name : String,
    email : String,
    pwd : String,
    qualification : String,
    pmdc_no : Number,
    specialization : String,
    experience : String,
    address : String,
    charges : String,
    desc : String,
    StartTime : String,
    EndTime : String
    
});

module.exports = Docs = mongoose.model('doc',DocSchema);