const path = require('path')
const express = require('express')
const axios = require('axios')
var hbs = require('hbs')
const app = express()
const port = process.env.PORT || 3000
const viewsPath = path.join(__dirname, '/views')


app.set('view engine', 'hbs')
app.set('views', viewsPath)



app.get('/menu', async (req, res) => {


  try {

    const response0 = await axios.get('https://v2-api.sheety.co/c8d0b3b214a817554114d96220e3c881/restoAdds/default')
    const defaultAddIndex = response0.data.default[0].addId
    const defaultRestaurantIndex = response0.data.default[0].restaurantId

    const restaurantIndex = parseInt(req.query.restaurant) - 2 || defaultRestaurantIndex
    const addIndex = parseInt(req.query.add) - 2 || defaultAddIndex


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



app.use(express.static('public'))

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})