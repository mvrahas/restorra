const mongoose = require('mongoose')

var advertiserSchema = new mongoose.Schema({
  advertiser_name: {
    type: String,
    required: true,
    default: 'Default Advertiser'
  }
});
  
var Advertiser = mongoose.model('Advertiser', advertiserSchema);

module.exports = Advertiser