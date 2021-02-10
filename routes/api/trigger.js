const express = require("express");
const router = express.Router();

const Location = require('../../models/locationData');
const Trigger = require('../../models/triggerData');

router.get('/',(req,res)=>{
    const proxyID = req.body.deviceID;
    Trigger.find({proxyID: proxyID})
    .then((object)=>{
        if(object){
            Location.find({deviceID: object[0].callerID})
            .then((obj)=>{
                res.json({
                    render: true,
                    latitude: obj[0].latitude,
                    longitude: obj[0].longitude
                })
            })
            .catch((err)=>{
                res.send({
                    render: false,
                })
            })
        }else{
            res.send({
                render: false,
            })
        }
        
    })
    .catch((err)=>{
        res.send({
            render: false,
        })
    })
})

router.post('/',(req,res)=>{
    const callerID = req.body.deviceID;
    const lat1 = parseFloat(req.body.latitude)+0.003;
    const lat2 = parseFloat(req.body.latitude)-0.003;
    const lon1 = parseFloat(req.body.longitude)+0.003;
    const lon2 = parseFloat(req.body.longitude)-0.003;
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
    Trigger.deleteMany({callerID: callerID},function(err,doc){
        if (err){res.sendStatus(500)} 
        else{res.sendStatus(200)} 
    })
})

module.exports = router;