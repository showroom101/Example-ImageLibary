var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var schema = {};
schema.sampleSchema = new Schema({
    Name: {
        type : String,
        require : true,
        trim : true
    },
    bCreate : {
        type: Boolean,
        default: true
    },
    createDate : {
        type: Date,
        default: Date.now
    },
    lastUpdate : {
        type: Date,
        default: Date.now
    },
    refID :Schema.ObjectId
})


schema.instagram = new Schema({
    CreateDateFormat      : { type: Date, default: Date.now }
})


module.exports = schema;