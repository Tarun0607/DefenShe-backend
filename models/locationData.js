const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// creating a schema for locationData table
const locationSchema = new Schema({
    deviceID:{ type: String, required: true},
    latitude:{ type: mongoose.Types.Decimal128, required: true},
    longitude:{ type: mongoose.Types.Decimal128, required: true},
});

module.exports = mongoose.model('location', locationSchema);