const express = require("express");
const router = express.Router();
const path = require('path');
const { route } = require("./trigger");

const Location = require(path.join(__dirname,'..','..', 'models','locationData'));
router.post('/',(req,res)=>{
    const query = { deviceID: req.body.deviceID };
    const update = { $set: { deviceID: req.body.deviceID, latitude: req.body.latitude, longitude: req.body.longitude}};
    const options = { upsert: true };
    Location.updateOne(query, update, options)
    .then((doc)=>{
        res.sendStatus(200);
    })
    .catch((err)=>{
        res.sendStatus(400);
    })
})

router.get('/:id',async (req,res)=>{
    const id = req.params.id;
    arr = await Location.find({deviceID: id})
    res.send(arr)
})

router.delete('/:id',(req,res)=>{
    const id = req.params.id;
    Location.deleteMany({deviceID: id})
    .then((doc)=>{
        res.sendStatus(200);
    })
    .catch((err)=>{
        res.sendStatus(400);
    })
})

router.get('*',(req,res) =>{
    res.status(404).json({message: "Route not found"})
})

router.post('*',(req,res) =>{
    res.status(404).json({message: "Route not found"})
})

module.exports = router;