const mongoose = require('mongoose')

var scoreSchema = new mongoose.Schema({
  score: {
    type: Number,
    required: true
  },
  player: {
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User',
    required: true
  },
  type: {
    type: String,
    required: false
  },
  course: {
    type: String,
    required: false
  },
  courseRating: {
    type: Number,
    required: true
  },
  courseSlope: {
    type: Number,
    required: true
  },
  putts: {
    type: Number,
    required: false
  },
  fairways: {
    type: Number,
    required: false
  },
  greens: {
    type: Number,
    required: false
  }
});
  
var Score = mongoose.model('Score', scoreSchema);

module.exports = Score