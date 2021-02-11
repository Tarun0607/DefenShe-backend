const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require('cors');
const compression = require('compression');

const location = require("./routes/api/location");
const trigger = require("./routes/api/trigger");
const app = express();

// middleware setup
app.use(bodyParser.json());     //usage of body parser
app.use(cors());                //allow cross origin reference
app.use(compression());         //compress all the route responses

// DB configuration
const url = require('./config/keys').mongoURI;

// database connection
mongoose.connect(url, { useUnifiedTopology: true, useNewUrlParser: true})
    .then(()=> console.log("Connected to mongoDB"))
    .catch(err => console.log(err));

// Using the routes
app.use("/location", location);
app.use("/trigger", trigger);

// port for connection
const port = process.env.PORT || 5000;

// listen for connection
app.listen(port, () => console.log("Server started at "+port));

app.get("/",(req,res)=>{
    res.send("Homepage")
})