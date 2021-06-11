const express = require('express');
const Weather = require('../model/Weather');
const router = express.Router();

router.post("/add",(req,res)=>{
    try{
        const weather= new Weather(req.body
            // name:req.body.name,
            // temp:req.body.temp_max,
            // weather:req.body.weather[0].main
        );
            weather.save(()=>{
                return res.status(200).json({success:true,weather});
    
            });
    
    }
    catch(err){
        return res.status(400).json({success:false,err});
    }
})

router.get('/',async(req,res)=>{
    try {
        const weather = await Weather.find({});
        return res.status(200).json({success:true,weather});
       } 
       catch(err){
        return res.status(400).json({success:false,err});
       }
});


module.exports = router;
