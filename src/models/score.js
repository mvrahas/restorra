const mongoose = require('mongoose')
const validator = require('validator')


var scoreSchema = new mongoose.Schema({
  score: {
    type: Number,
    required: true
  },
  date: {
    type: String,
    required: true,
    validate: {
      validator: function(value) {
        return validator.isAfter(value,'1950-12-24T08:00:00.000Z')
      },
      message: 'That score is too old to post!'
    }
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
  }
});
  
var Score = mongoose.model('Score', scoreSchema);

module.exports = Score