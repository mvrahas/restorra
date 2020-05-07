const hbs = require('hbs')
const path = require('path')
const express = require('express')
const chalk = require('chalk')
const scoreRouter = require('./routes/score')
const userRouter = require('./routes/user')
const webRouter = require('../web/router.js')
const mongooseConnection = require('./mongoose')

const app = express()
const port = process.env.PORT || 3000
 

// API Routes
app.use(express.json())
app.use(scoreRouter)
app.use(userRouter)

// Web App
const publicDirectoryPath = path.join(__dirname, '../web/public')
const viewsPath = path.join(__dirname, '../web/templates/views')
const partialsPath = path.join(__dirname, '../web/templates/partials')
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)
app.use(express.static(publicDirectoryPath))
app.use(express.static(publicDirectoryPath))
app.use(webRouter)



app.listen(port, () => {console.log(chalk.green('App is up on ' +port))})

app.get('/', (req, res) => {
  res.send('Hello World')
})