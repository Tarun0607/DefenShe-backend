const express = require("express");
const router = express.Router();
const path = require('path');

const Location = require(path.join(__dirname,'..','..', 'models','locationData'));
const Trigger = require(path.join(__dirname,'..','..', 'models','triggerData'));

router.get('/:id',(req,res)=>{
    const proxyID = req.params.id;
    Trigger.find({proxyID: proxyID})
    .then((object)=>{
        if(object){
            Location.find({deviceID: object[0].callerID})
            .then((obj)=>{
                res.json({
                    render: true,
                    latitude: obj[0].latitude,
                    longitude: obj[0].longitude,
                })
            })
            .catch((err)=>{
                res.json({
                    render: false,
                })
            })
        }else{
            res.json({
                render: false,
            })
        }
        
    })
    .catch((err)=>{
        res.json({
            render: false,
        })
    })
})

router.post('/',(req,res)=>{
    const callerID = req.body.deviceID;
    const lat1 = parseFloat(req.body.latitude)+0.093; // 0.003
    const lat2 = parseFloat(req.body.latitude)-0.093;
    const lon1 = parseFloat(req.body.longitude)+0.093;
    const lon2 = parseFloat(req.body.longitude)-0.093;
    Location.find({latitude: { $lte: lat1, $gte: lat2 }, longitude: { $lte: lon1, $gte: lon2 }})
    .then((arr)=>{
        arr.forEach((proxy)=>{
            const triggerObj = new Trigger({
                proxyID: proxy.deviceID,
                callerID: callerID,
            })
            if(proxy.deviceID!==callerID)
            triggerObj.save();
        })
        res.sendStatus(200);
    })
    .catch((err)=>{
        res.sendStatus(500);
    })   
})

router.delete('/',(req,res)=>{
    const callerID = req.body.deviceID;
    Trigger.deleteMany({callerID: callerID})
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