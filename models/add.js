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
  imageurl: {
    type: String,
    required: false,
    default: 'https://img.grouponcdn.com/deal/cUUZE66o46Qg1GCWtu49/Fp-4764x2858/v1/c700x420.jpg'
  },
  targetlink: {
    type: String,
    required: false
  }
});
  
var Add = mongoose.model('Add', addSchema);

module.exports = Add