const mongoose = require('mongoose')

var adSchema = new mongoose.Schema({
  caption: {
    type: String,
    required: true,
    default: 'Ad Caption'
  },
  image_url: {
    type: String,
    required: false,
    default: 'https://advertisements.s3.amazonaws.com/10743.jpg'
  },
  restaurants: [{
    type: mongoose.Schema.Types.ObjectId, ref: 'Restaurant' 
  }],
  link: {
    type: String,
    required: false,
    default: 'https://www.apple.com/'
  }
});
  
var Ad = mongoose.model('Ad', adSchema);

module.exports = Ad