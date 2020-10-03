const express = require('express')
const axios = require('axios')
const router = express.Router()
var path = require('path');


  router.get('/menu/:id', async (req, res) => {

    if(req.params.id == 'bartakito') {
      
      res.render('bartakito', {
        addsWillDisplay: "false",
        restaurantName: "bartakito",
        amplitudeAPIKey: global.gConfig.amplitude_api_key
      });

    } else {

      const menuURL = req.query.menu || 'https://jeffersontap.com/menu'
  
      try {
        const response = await axios.get('http://'+ req.rawHeaders[1] +'/adds')
        var randSelection = Math.floor(Math.random() * response.data.length)
        var currentAdd = response.data[randSelection]
  
        res.render('frame', {
          menuURL: menuURL,
          title: currentAdd.caption,
          link: currentAdd.link,
          imageURL: currentAdd.image_url,
          restaurantName: "lookinnicetest",
          amplitudeAPIKey: global.gConfig.amplitude_api_key
        });
      } catch (e) {
        res.send(e)
      }

    }
  
  })

  
  module.exports = router