const express = require("express");
const router = express.Router();

arr = []
const Location = require('../../models/locationData');

router.post('/',(req,res)=>{
    const deviceID = req.body.deviceID;
    const lat = req.body.latitude;
    const lon = req.body.longitude;
    const query = { deviceID: deviceID };
    const update = { $set: { deviceID: deviceID, latitude: lat, longitude: lon}};
    const options = { upsert: true };
    Location.updateOne(query, update, options, function (err, docs) { 
        if (err){ 
            res.send("error")
        } 
        else{ 
            res.send("updated")
        } 
    });
})

router.get('/:id',(req,res)=>{
    const id = req.params.id;
    arr.forEach(function(element){
        if(element[0]==id){
            res.send(element)
        }
    })
    res.send([])
})

module.exports = router;