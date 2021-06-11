const express = require('express');
const router = express.Router()
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const Users = require('../model/User');


router.post('/',(req, res)=>{
    
     const user = Users.find({email:req.body.email}).exec()
      .then(user=>{
             if (user.length>=1){
              return res.status(409).json({
                     message: 'Mail exists'
                   });
             } else {
              bcrypt.hash(req.body.password, 10, (err, hash) => {
                if (err) {
                  console.log(err);
                  return res.status(500).json({
                    error: err
                  });
                } else {
                     const user = new Users({
                       _id: new mongoose.Types.ObjectId(),
                       
                       email: req.body.email,
                       password: hash
                     });
                     user.save()
              
              .then(result => {
                console.log(result);
                res.status(201).json({
                  message: 'User created',
                  ...result
                });
              })
              .catch(err => {
                console.log(err);
                res.status(500).json({
                  error: err
                });
              });
          }
        });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(422).json({
        error: err
      });
    });
});


                     
     

module.exports = router;