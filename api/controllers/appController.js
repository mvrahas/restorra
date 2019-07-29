'use strict';


var mongoose = require('mongoose'),
Hole = mongoose.model('Holes');

exports.list_all_holes = function(req, res) {
  Hole.find({}, function(err, hole) {
    if (err)
      res.send(err);
    res.json(hole);
  });
};

exports.create_a_hole = function(req, res) {
  var new_hole = new Hole(req.body);
  new_hole.save(function(err, hole) {
    if (err)
      res.send(err);
    res.json(hole);
  });
};


exports.read_a_hole = function(req, res) {
  Hole.findById(req.params.holeId, function(err, hole) {
    if (err)
      res.send(err);
    res.json(hole);
  });
};


exports.update_a_hole = function(req, res) {
  Hole.findOneAndUpdate({_id: req.params.holeId}, req.body, {new: true}, function(err, hole) {
    if (err)
      res.send(err);
    res.json(hole);
  });
};


exports.delete_a_hole = function(req, res) {
  Hole.remove({
    _id: req.params.holeId
  }, function(err, hole) {
    if (err)
      res.send(err);
    res.json({ message: 'Hole successfully deleted' });
  });
};

