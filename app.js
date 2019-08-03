// Building an api with express js https://medium.com/@onejohi/building-a-simple-rest-api-with-nodejs-and-express-da6273ed7ca9
// Connect api to mongo db https://codeburst.io/building-a-rest-api-using-mongo-db-75cac3403fab
// Use mongoode to create data models and api methods https://www.codementor.io/olatundegaruba/nodejs-restful-apis-in-10-minutes-q0sgsfhbd
// Config for managing variables in different environments https://codeburst.io/node-js-best-practices-smarter-ways-to-manage-config-files-and-variables-893eef56cbef

process.env.NODE_ENV = 'staging';

const _ = require('lodash');
const config = require('./config.json');
const defaultConfig = config.development;
const environment = process.env.NODE_ENV || 'development';
const environmentConfig = config[environment];
const finalConfig = _.merge(defaultConfig, environmentConfig);
global.gConfig = finalConfig;
console.log(finalConfig.node_port);




var express = require("express");
var app = express();
var port = finalConfig.node_port;
var mongoose = require('mongoose');
var Hole = require('./api/models/appModel');
var bodyParser = require("body-parser");

//mongodb driver
var MongoClient = require('mongodb').MongoClient;
var url = finalConfig.database_url;

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