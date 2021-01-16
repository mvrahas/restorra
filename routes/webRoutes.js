const express = require('express')
const axios = require('axios')
const router = express.Router()
var path = require('path');



router.get('/template-test', (req, res) => {
  res.render('template')
})

router.get('/', async (req, res) => {
  res.send('Hello World!')
})

  router.get('/:id', async (req, res) => {

    try {

      const getRestaurant = await axios.get('http://'+ req.rawHeaders[1] +'/restaurants/' + req.params.id)
      const restaurantInfo = getRestaurant.data

      if(restaurantInfo.redirect_menu) {
        res.redirect(restaurantInfo.menu_url)
      } else {
      
        if(restaurantInfo.menu_type == 'inline') {
      
          res.render(restaurantInfo.restaurant_name, {
            //adsWillDisplay: restaurantInfo.display_ads,
            adsWillDisplay: 'true',
            restaurantName: restaurantInfo.restaurant_name,
            amplitudeAPIKey: global.gConfig.amplitude_api_key
          });
  
        } else {
          const menuURL = restaurantInfo.menu_url || 'https://jeffersontap.com/menu'
          const getAds = await axios.get('http://'+ req.rawHeaders[1] +'/ads')
          var randSelection = Math.floor(Math.random() * getAds.data.length)
          var currentAd = getAds.data[randSelection]
    
          res.render('frame', {
            menuURL: menuURL,
            title: currentAd.caption,
            link: currentAd.link,
            imageURL: currentAd.image_url,
            restaurantName: restaurantInfo.restaurant_name,
            amplitudeAPIKey: global.gConfig.amplitude_api_key
          });
        }
      }

    } catch (e) {
      res.redirect(restaurantInfo.menu_url)
    }

  })

  
  module.exports = router