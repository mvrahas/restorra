const mongoose = require('mongoose')

var scoreSchema = new mongoose.Schema({
    name: String
  });
  
var Score = mongoose.model('Score', scoreSchema);

module.exports = Score