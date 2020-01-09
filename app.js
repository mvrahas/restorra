const express = require('express')
const mongoose = require('mongoose')
const chalk = require('chalk')
const app = express()

const port = process.env.PORT || 3000
 





//mongoose stuff

mongoose.connect('mongodb://localhost:27017/test', { useNewUrlParser: true, dbName: 'golf-app', useUnifiedTopology: true }).
  catch((error) => {console.log(error)})

var db = mongoose.connection;
db.on('error', err => {
  console.log('error')
});
db.once('open', function() {
  console.log('connected')
});

var scoreSchema = new mongoose.Schema({
  name: String
});

var Score = mongoose.model('Score', scoreSchema);











//express stuff

app.listen(port, () => {console.log(chalk.green('App is up on ' +port))})



app.get('/', (req, res) => {
  res.send('Hello World')
})

app.get('/scores', (req, res) => {
  res.send('This is where the scores will be listed')
})

app.post('/scores/:score', (req, res) => {

  var entry = new Score({ name: req.params.score });

  entry.save((err, entry) => {
    if (err) {
      console.log(err)
      res.status(400).send()
    }
    res.status(200).send(entry)
  })

})