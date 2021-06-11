
const mongoose = require('mongoose');

const WeatherSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  temp:{
    type:String,
    required: true,
  },

  weather: { type: String, required: true }
},

{ timestamps: true }

);

module.exports = mongoose.model('weather', WeatherSchema);

