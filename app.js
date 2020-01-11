const express = require('express')
const chalk = require('chalk')
const scoreRouter = require('./routes/score')
const mongooseConnection = require('./mongoose')

const app = express()
const port = process.env.PORT || 3000
 





//express stuff

app.listen(port, () => {console.log(chalk.green('App is up on ' +port))})

app.get('/', (req, res) => {
  res.send('Hello World')
})

app.use(scoreRouter)