const axios = require('axios')

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
app.set('view engine', 'hbs')
app.set('views', viewsPath)
app.use(express.static(publicDirectoryPath))




































app.get('/menu', async (req, res) => {


  try {


    const response0 = await axios.get('https://v2-api.sheety.co/c8d0b3b214a817554114d96220e3c881/restoAdds/default')
    const defaultAddIndex = response0.data.default[0].addId + 2
    const defaultRestaurantIndex = response0.data.default[0].restaurantId + 2



    var restaurantIndex = parseInt(req.query.restaurant) || defaultRestaurantIndex
    var addIndex = parseInt(req.query.add) || defaultAddIndex

    restaurantIndex = restaurantIndex - 2
    addIndex = addIndex - 2


    let url = 'https://api.sheety.co/c8d0b3b214a817554114d96220e3c881/restoAdds/default/2';
    let body = {
      default: {
        restaurantId: restaurantIndex,
        addId: addIndex
      }
    }
    await axios.put(url, body)

    const response1 = await axios.get('https://v2-api.sheety.co/c8d0b3b214a817554114d96220e3c881/restoAdds/restaurants')
    const restaurant = response1.data.restaurants[restaurantIndex]
    const response2 = await axios.get('https://v2-api.sheety.co/c8d0b3b214a817554114d96220e3c881/restoAdds/adds')
    const add = response2.data.adds[addIndex]

    res.render('index', {
      background: restaurant.restaurantBackgroundUrl,
      name: restaurant.title,
      subtitle: restaurant.restaurantSubtitle,
      restaurantlogo: restaurant.restaurantLogoUrl,
      addcaption: add.title,
      addimage: add.addImageUrl,
      addlink: add.addLink
    })
  } catch {

  }

})


app.get('/selectrestaurant', async (req, res) => {
  
  const nextLink = "/selectadd?"
  const type = "restaurant"

  try {

    const response = await axios.get('https://api.sheety.co/c8d0b3b214a817554114d96220e3c881/restoAdds/restaurants')
    const restaurants = response.data.restaurants

    for (var i=0; i < restaurants.length; i++) {
      restaurants[i].nextLink = nextLink
      restaurants[i].type = type
    }
    res.render('selection', {
      items: restaurants,
      type: type
    })

  } catch (e) {
    res.send(e)
  }

})

app.get('/selectadd', async (req, res) => {
  const nextLink = "/menu?restaurant=" + req.query.restaurant + "&"
  const type = "add"

  try {

    const response = await axios.get('https://api.sheety.co/c8d0b3b214a817554114d96220e3c881/restoAdds/adds')
    const adds = response.data.adds
    for (var i=0; i < adds.length; i++) {
      adds[i].nextLink = nextLink
      adds[i].type = type
    }
    res.render('selection', {
      items: adds,
      type: type
    })

  } catch (e) {
    res.send(e)
  }



  
})


app.get('/insertadds', (req, res) => {

  // http://www.bandofbohemia.com/menu
  // https://www.kayak.com/
  // http://shabu-shabu-zen.com/menu

  //https://www.hamasushi.com/menus
  //resto-adds.herokuapp.com/insertadds?menu=http://shabu-shabu-zen.com/menu
  //http://resto-adds.herokuapp.com/insertadds?menu=%20https://jeffersontap.com/menu
  //resto-adds.herokuapp.com/insertadds?menu=https://www.swiftandsonschicago.com/menu.php
  //resto-adds.herokuapp.com/insertadds?menu=https://www.toasttab.com/tallula-s/v3
  //setup ssl https://medium.com/@franxyzxyz/setting-up-free-https-with-heroku-ssl-and-lets-encrypt-80cf6eac108e


  const menuURL = req.query.menu

  axios.get(menuURL)
  .then(function (response) {

      var a = response.data;
      var b = "<script src='/js/insertadd.js'></script>";
      var position = response.data.length - 8
      var output = [a.slice(0, position), b, a.slice(position)].join('');
      res.send(output);
  })
  .catch(function (error) {
      res.send(error);
  })
  .then(function () {
    // always executed
});

})














// Start Server

app.listen(port, () => {console.log(chalk.green(global.gConfig.APPLICATION_TITLE + " " + global.gConfig.APPLICATION_VERSION + ' is up on ' + port))})

app.get('/', (req, res) => {
  res.send("Hello World!")
})