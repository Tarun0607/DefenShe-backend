const mongoose = require("mongoose");
const Float = require('mongoose-float').loadType(mongoose);
const Schema = mongoose.Schema;

// creating a schema for locationData table
const locationSchema = new Schema({
    deviceID:{ type: String, required: true},
    latitude:{ type: Float, required: true},
    longitude:{ type: Float, required: true},
});

module.exports = mongoose.model('location', locationSchema);