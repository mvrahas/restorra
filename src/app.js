const express = require('express')
const chalk = require('chalk')
const scoreRouter = require('./routes/score')
const userRouter = require('./routes/user')
const mongooseConnection = require('./mongoose')

const app = express()
const port = process.env.PORT || 3000
 


app.use(express.json())
app.use(scoreRouter)
app.use(userRouter)


//express stuff

app.listen(port, () => {console.log(chalk.green('App is up on ' +port))})

app.get('/', (req, res) => {
  res.send('Hello World')
})