const express = require('express');
const cors = require ('cors');
const app = express();
const mongoose = require ("mongoose");
const bodyParser = require('body-parser');


mongoose.connect("mongodb+srv://Badal:ambadcr7@learn.fxagg.mongodb.net/weather?retryWrites=true&w=majority",
{ useNewUrlParser: true ,useUnifiedTopology: true,useCreateIndex: true,}).then(() => console.log('MongoDB Connected'))
.catch(err => console.log(err))
app.use(cors());
app.use(bodyParser.json());

app.use('/api/signUp', require('./route/signUp'));
app.use('/api/signIn', require('./route/signIn'));
app.use('/weather', require('./route/weather'));


app.get('/',(req, res)=>{
     res.json({Project:"MERN"});
});

const port = process.env.PORT || 5000;
app.listen(port);