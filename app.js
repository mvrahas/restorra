// https://medium.com/@onejohi/building-a-simple-rest-api-with-nodejs-and-express-da6273ed7ca9

var express = require("express");
var app = express();

var MongoClient = require('mongodb').MongoClient;
var url = "mongodb+srv://telemarkus:Vrahas128@telemarkus-rp9d8.gcp.mongodb.net/test?retryWrites=true&w=majority";

MongoClient.connect(url, { useNewUrlParser: true },
	function(err, db){
		if(err) throw err;
		var dbo = db.db("mydb");
		var holes_collection = dbo.collection("holes");


		//console.log("Check this out on hole 1:" + queryDocInCollection(holes_collection));
		//insertDocIntoCollection({hole_number: "5", par: "5", score: "4"}, holes_collection)
		queryDocInCollection({}, dbo, holes_collection);
		/*
		holes_collection.findOne({}, 
			function(err, result){
				if (err) throw err;
				console.log(result.score);
			}
		);
		*/


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
//https://stackoverflow.com/questions/45118957/node-js-mongodb-collection-find-toarray-returns-nothing
//Possible solution for returning the queried data to use in a controller


/*This is the basic code required to return a json response*/

app.get("/url", (req, res, next) => {
 res.json(["Tony","Lisa","Michael","Ginger","Food"]);
});

app.listen(3000, () => {
 console.log("Server running on port 3000");
});







/*

Steps to create a Node project




*/