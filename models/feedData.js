const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// creating a schema for feedData table
const feedSchema = new Schema({
    title:{ type: String, required: true},
    description:{ type: String, required: true},
    image:{ type: String, required: true},
    url:{ type: String, required: true},
    date:{ type: Date, required: true},
},{ timestamps: true });

module.exports = mongoose.model('feed', feedSchema);