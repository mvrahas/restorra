// Building an api with express js https://medium.com/@onejohi/building-a-simple-rest-api-with-nodejs-and-express-da6273ed7ca9
// Connect api to mongo db https://codeburst.io/building-a-rest-api-using-mongo-db-75cac3403fab
// Use mongoode to create data models and api methods https://www.codementor.io/olatundegaruba/nodejs-restful-apis-in-10-minutes-q0sgsfhbd

var express = require("express");
var app = express();
var port = process.env.PORT || 3000;
var mongoose = require('mongoose');
var Hole = require('./api/models/appModel');
var bodyParser = require("body-parser");

//mongodb driver
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb+srv://telemarkus:Vrahas128@telemarkus-rp9d8.gcp.mongodb.net/golf_app?retryWrites=true&w=majority";

// mongoose instance connection url connection
mongoose.Promise = global.Promise;
mongoose.connect(url, { useNewUrlParser: true }); 


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());



var routes = require('./api/routes/appRoutes'); //importing route
routes(app); //register the route



app.listen(port, () => {
 console.log("App started on port " + port);
});




/*

Follow up

- Understand the code. Learn how Mongoose is doing work behind the scenes (eg. How is it deleting data? DeprecationWarning: collection.remove is deprecated. Use deleteOne, deleteMany, or bulkWrite instead)

- Running code on cloud server

- Dev prod environments

- Better error handling

- Added data fields, validation, and manipulations

*/