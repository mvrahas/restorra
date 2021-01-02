// Golf App

const express = require('express')
const app = express()


// API Initialization

const _ = require('lodash')
const config = require('./config.json')
const environment = process.env.DEPLOYMENT_ENV || 'local'
const port = process.env.PORT || 3000
const updated_config_based_on_environment = _.merge(config.local, config[environment])
global.gConfig = updated_config_based_on_environment
const chalk = require('chalk')
const scoreRouter = require('./routes/score')
const userRouter = require('./routes/user')
const analyzeRouter = require('./routes/analyze')
const webRouter = require('../web/router.js')
const mongooseConnection = require('./mongoose')

app.use(express.json())
app.use(scoreRouter)
app.use(userRouter)
app.use(analyzeRouter)


// Web App Initialization

const hbs = require('hbs')
const path = require('path')
const publicDirectoryPath = path.join(__dirname, '../web/public')
const viewsPath = path.join(__dirname, '../web/templates/views')
const partialsPath = path.join(__dirname, '../web/templates/partials')
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)
app.use(express.static(publicDirectoryPath))
app.use(webRouter)


// Start Server

app.listen(port, () => {console.log(chalk.green(global.gConfig.APPLICATION_TITLE + " " + global.gConfig.APPLICATION_VERSION + ' is up on ' + port))})

app.get('/', (req, res) => {
  res.redirect('/register')
})