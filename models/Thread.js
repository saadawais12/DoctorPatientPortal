const mongoose  = require('mongoose');
const Schema  = mongoose.Schema;

const ThreadSchema = new Schema({
    desc : String,
    location : String,
    threadOwner : String,
    threadOwnerName : String,
    docId : Array,
    docProposal : Array,
    status :{
        type : String,
        default:"1",
    },
    date : {
        type : Date,
        default: Date.now,
    }
});

module.exports = Threads = mongoose.model('thread',ThreadSchema);