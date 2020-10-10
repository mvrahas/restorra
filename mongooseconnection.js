const mongoose = require('mongoose')

const connectionURL = global.gConfig.db_connection_string
const databaseName = global.gConfig.db_name

//Creates the initial connection to MongoDB. A connection = a database

mongoose.connect(connectionURL, { useNewUrlParser: true, useCreateIndex: true, dbName: databaseName, useUnifiedTopology: true }).catch((error) => {console.log(error)})


//Listens for errors and successful connection to MongoDB

var db = mongoose.connection;
db.on('error', err => {
  console.log('Lost Connection to MongoDB')
});
db.once('open', function() {
  console.log('Successful Connection to MongoDB')
});


// Run locally on PC... mongod --dbpath "C:\Users\vraha\Development\Data"
// Run locally on Mac... mongod --dbpath "/Users/markvrahas/Development/data"