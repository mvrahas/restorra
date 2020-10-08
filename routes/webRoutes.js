const express = require('express')
const axios = require('axios')
const router = express.Router()
var path = require('path');

router.get('/', async (req, res) => {
  res.send('Hello World!')
})

  router.get('/:id', async (req, res) => {

    try {

      const response1 = await axios.get('http://'+ req.rawHeaders[1] +'/restaurants/' + req.params.id)
      
      if(response1.data.menu_type == 'inline') {
      
        res.render('bartakito', {
          addsWillDisplay: response1.data.display_adds,
          restaurantName: response1.data.restaurant_name,
          amplitudeAPIKey: global.gConfig.amplitude_api_key
        });
  
      } else {
        const menuURL = response1.data.menu_url || 'https://jeffersontap.com/menu'
        const response2 = await axios.get('http://'+ req.rawHeaders[1] +'/adds')
        var randSelection = Math.floor(Math.random() * response2.data.length)
        var currentAdd = response2.data[randSelection]
    
        res.render('frame', {
          menuURL: menuURL,
          title: currentAdd.caption,
          link: currentAdd.link,
          imageURL: currentAdd.image_url,
          restaurantName: response1.data.restaurant_name,
          amplitudeAPIKey: global.gConfig.amplitude_api_key
        });
      }

    } catch (e) {
      res.send(e)
    }

  })

  
  module.exports = router