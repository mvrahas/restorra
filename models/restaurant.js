const mongoose = require('mongoose')

var restaurantSchema = new mongoose.Schema({
  restaurant_name: {
    type: String,
    required: true,
    unique: true
  },
  display_ads: {
    type: Boolean,
    required: true,
    default: false
  },
  menu_type: {
    type: String,
    required: true,
    default: 'fixed'
  },
  menu_url: {
    type: String,  
    required: true
  },
  exclusive_advertisers: [{
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'Advertiser',
      required: false
  }],
  restricted_advertisers: [{
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Advertiser',
    required: false
  }]
});
  
var Restaurant = mongoose.model('Restaurant', restaurantSchema);

module.exports = Restaurant