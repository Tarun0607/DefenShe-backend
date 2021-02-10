const express = require("express");
const router = express.Router();

const Location = require('../../models/locationData');
router.post('/',(req,res)=>{
    const query = { deviceID: req.body.deviceID };
    const update = { $set: { deviceID: req.body.deviceID, latitude: req.body.latitude, longitude: req.body.longitude}};
    const options = { upsert: true };
    Location.updateOne(query, update, options, function (err, docs) { 
        if (err){res.send("error in updation")} 
        else{res.send("updated records")} 
    });
})

router.get('/:id',async (req,res)=>{
    const id = req.params.id;
    arr = await Location.find({deviceID: id})
    res.send(arr)
})

router.delete('/:id',(req,res)=>{
    const id = req.params.id;
    Location.deleteMany({deviceID: id},function(err,doc){
        if (err){res.send("error in deletion")} 
        else{res.send("deleted records")} 
    })
})

module.exports = router;