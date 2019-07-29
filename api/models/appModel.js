var mongoose = require("mongoose");
var Schema = mongoose.Schema;


var HoleSchema = new Schema({
  created_date: {
    type: Date,
    default: Date.now
  },
  course_name: {
    type: String,
    required: false
  },
  course_slope: {
    type: Number,
    required: true
  },
  course_rating: {
    type: Number,
    required: true
  },
  hole_number: {
    type: Number,
    required: true
  },
  par: {
    type: Number,
    required: true
  },
  score: {
    type: Number,
    required: true
  }
});

module.exports = mongoose.model('Holes', HoleSchema);