const mongoose = require('mongoose')

var addSchema = new mongoose.Schema({
  caption: {
    type: String,
    required: true,
    default: 'Add Caption'
  },
  advertiser: {
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Advertiser',
    required: false
  },
  image_url: {
    type: String,
    required: false,
    default: 'https://advertisements.s3.amazonaws.com/10743.jpg'
  },
  link: {
    type: String,
    required: false,
    default: 'https://www.apple.com/'
  }
});
  
var Add = mongoose.model('Add', addSchema);

module.exports = Add