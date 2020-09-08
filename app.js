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

    console.log('hey')

    const response0 = await axios.get('https://v2-api.sheety.co/c8d0b3b214a817554114d96220e3c881/restoAdds/default')
    const defaultAddIndex = response0.data.default[0].addId + 2
    const defaultRestaurantIndex = response0.data.default[0].restaurantId + 2

    console.log(defaultAddIndex)
    console.log(defaultRestaurantIndex)
    console.log(parseInt(req.query.restaurant))
    console.log(parseInt(req.query.add))


    var restaurantIndex = parseInt(req.query.restaurant) || defaultRestaurantIndex
    var addIndex = parseInt(req.query.add) || defaultAddIndex
    console.log(restaurantIndex)
    console.log(addIndex)
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
  //axios.get('http://www.kayak.com')
  axios.get('http://www.bandofbohemia.com/menu')
  .then(function (response) {
      console.log(response.data.length)

      var a = response.data;
      var b = "<div style='display: block; position: fixed; top: 0px; background-color:red; width: 100px; height: 100px; z-index:100000000000000;'>This is the shit</div>";
      var position = 79300
      var output = [a.slice(0, position), b, a.slice(position)].join('');
      console.log(output);
      res.send(output);
  })
  .catch(function (error) {
      res.send(error);
  })
  .then(function () {
    // always executed
});

})






app.use(express.static('public'))

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})