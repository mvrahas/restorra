'use strict';
module.exports = function(app) {
  var holes_list = require('../controllers/appController');

  // Routes
  app.route('/holes')
    .get(holes_list.list_all_holes)
    .post(holes_list.create_a_hole);


  app.route('/holes/:holeId')
    .get(holes_list.read_a_hole)
    .put(holes_list.update_a_hole)
    .delete(holes_list.delete_a_hole);
};