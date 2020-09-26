const express = require('express')
const axios = require('axios')
const router = express.Router()
var path = require('path');


router.get('/menu', async (req, res) => {


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
  
  
  router.get('/selectrestaurant', async (req, res) => {
    
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
  
  router.get('/selectadd', async (req, res) => {
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
  
  
  
  
  
  
  router.get('/insertaddsfixed', async (req, res) => {
  
    const menuURL = req.query.menu || 'https://jeffersontap.com/menu'
  
  
    try {
      const response = await axios.get('https://v2-api.sheety.co/c8d0b3b214a817554114d96220e3c881/restoAdds/adds')
      var randSelection = Math.floor(Math.random() * response.data.adds.length)
      var currentAdd = response.data.adds[randSelection]
  
      res.render('frame', {
        menuURL: menuURL,
        title: currentAdd.title,
        link: currentAdd.addLink,
        imageURL: currentAdd.addImageUrl
      });
    } catch (e) {
      res.send(e)
    }
  
  })
  





  router.get('/insertaddsinlineframe', async (req, res) => {
  
    const menuURL = req.query.menu || 'https://jeffersontap.com/menu'
  
    try {
      const response = await axios.get('https://v2-api.sheety.co/c8d0b3b214a817554114d96220e3c881/restoAdds/adds')
      var randSelection = Math.floor(Math.random() * response.data.adds.length)
      var currentAdd = response.data.adds[randSelection]
  
      res.render('frame2', {
        menuURL: menuURL,
        title: currentAdd.title,
        link: currentAdd.addLink,
        imageURL: currentAdd.addImageUrl
      });
    } catch (e) {
      res.send(e)
    }
  
  })




  router.get('/insertaddsinlinejs', (req, res) => {
  
    const menuURL = req.query.menu || 'https://jeffersontap.com/menu'
  
    axios.get(menuURL)
    .then(function (response) {
  
        var a = response.data;
        var b = "<script src='/js/insertaddinline.js'></script>";
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

  


  router.get('/insertaddsfixedjs', (req, res) => {
  
    const menuURL = req.query.menu || 'https://jeffersontap.com/menu'
  
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


  
  module.exports = router