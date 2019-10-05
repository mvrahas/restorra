var mongoose = require("mongoose");
var Schema = mongoose.Schema;


var HoleSchema = new Schema({
  created_date: {
    type: Date,
    default: Date.now
  },
  course_name: {
    type: String,
    required: true
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
  },
  putts: {
    type: Number,
    required: false
  },
  fairway: {
    type: String,
    required: false
  },
  green: {
    type: String,
    required: false
  },
  scrambling: {
    type: String,
    required: false
  },
  sand: {
    type: String,
    required: false
  },
});

module.exports = mongoose.model('Holes', HoleSchema);