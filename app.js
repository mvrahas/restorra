// Building an api with express js https://medium.com/@onejohi/building-a-simple-rest-api-with-nodejs-and-express-da6273ed7ca9
// Connect api to mongo db https://codeburst.io/building-a-rest-api-using-mongo-db-75cac3403fab

var express = require("express");
var app = express();
//var bodyParser = require("body-parser");
//var Activity = require("./models/activity");
var mongoose = require("mongoose");

var MongoClient = require('mongodb').MongoClient;
var url = "mongodb+srv://telemarkus:Vrahas128@telemarkus-rp9d8.gcp.mongodb.net/test?retryWrites=true&w=majority";





// This is my function for connecting to mydb

MongoClient.connect(url, { useNewUrlParser: true },
	function(err, db){
		if(err) throw err;
		var dbo = db.db("mydb");
		var holes_collection = dbo.collection("holes");

		//insertDocIntoCollection({hole_number: "5", par: "5", score: "4", other_category: "7"}, holes_collection)
		//queryDocInCollection({}, dbo, holes_collection);

		db.close();
	}    
);


//This is my function for inserting data

function insertDocIntoCollection(doc, collection) {
	collection.insertOne(doc, 
		function(err, res) {
			if (err) throw err;
			console.log("document inserted");
		}
	);
}


//This is my function for querying data

function queryDocInCollection(query, database, collection){
	collection.find(query).toArray(
		function(err, result){
			if (err) throw err;
			console.log(result);
		}
	);
}
//Possible solution for returning the queried data to use in a controller https://stackoverflow.com/questions/45118957/node-js-mongodb-collection-find-toarray-returns-nothing







/*This is the basic code required to return a json response*/

//app.use(bodyParser.urlencoded({extended: true}));
//app.use(bodyParser.json());

app.get("/url", 
	function(req, res){
		res.json({message: "This is what we are returning."});
	}
);

app.listen(3000, () => {
 console.log("Server running on port 3000");
});


