const mongoose = require('mongoose')

var restaurantSchema = new mongoose.Schema({
  restaurant_name: {
    type: String,
    required: true,
    unique: true
  },
  display_adds: {
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
  }
});
  
var Restaurant = mongoose.model('Restaurant', restaurantSchema);

module.exports = Restaurant