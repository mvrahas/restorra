// Resto Adds

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
const addRouter = require('./routes/add')
const advertiserRouter = require('./routes/advertiser')
const mongooseConnection = require('./mongooseconnection')

app.use(express.json())
app.use(addRouter)
app.use(advertiserRouter)


// Web App Initialization

const hbs = require('hbs')
const path = require('path')
const publicDirectoryPath = path.join(__dirname, './public')
const viewsPath = path.join(__dirname, './views')
const webRouter = require('./routes/webRoutes')
app.set('view engine', 'hbs')
app.set('views', viewsPath)
app.use(webRouter)
app.use(express.static(publicDirectoryPath))



// Start Server

app.listen(port, () => {console.log(chalk.green(global.gConfig.APPLICATION_TITLE + " " + global.gConfig.APPLICATION_VERSION + ' is up on ' + port))})

app.get('/', (req, res) => {
  res.send("Hello World!")
})