const express = require("express");
const router = express.Router();
const path = require('path');


const Credit = require(path.join(__dirname,'..','..', 'models','creditData'));

module.exports = router;