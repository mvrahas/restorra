const mongoose = require('mongoose')

const connectionURL = 'mongodb://127.0.0.1:27017'
const databaseName = 'golf-app'

//Creates the initial connection to MongoDB. A connection = a database

mongoose.connect(connectionURL, { useNewUrlParser: true, dbName: databaseName, useUnifiedTopology: true }).
  catch((error) => {console.log(error)})


//Listens for errors and successful connection to MongoDB

var db = mongoose.connection;
db.on('error', err => {
  console.log('Lost Connection to MongoDB')
});
db.once('open', function() {
  console.log('Successful Connection to MongoDB')
});


// Run the following to start MongoDB locally... "/Users/telemarkus/mongodb/bin/mongod --dbpath /Users/telemarkus/mongodb-data"