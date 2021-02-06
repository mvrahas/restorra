const express = require('express')
const axios = require('axios')
const router = express.Router()
var path = require('path');

router.get('/', async (req, res) => {
  res.send('Hello World!')
})

  router.get('/m/:id', async (req, res) => {

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
      res.render('404')
    }

  })



  router.get('/jeffersontap', (req, res) => {
  
  
    axios.get('https://jeffersontap.com/menu')
    .then(function (response) {
        
        var a = response.data;
        var b = "<script src='/js/amplitude.js'></script><script src='/js/insertadinline.js'></script><script>window.addEventListener('load', async (event) => {insertAdInline('"+global.gConfig.amplitude_api_key+"')})</script>"
        var position = response.data.length - 9
        var output = [a.slice(0, position), b, a.slice(position)].join('');
        output = output.replace('https://jeffersontap.com/wp-content/themes/SolvedSystems-CHT/css/styles.min.css','https://restorra.s3.amazonaws.com/jeffersontap/standard.css')
        output = output.replace('https://jeffersontap.com/wp-content/themes/SolvedSystems-CHT/css/MyFontsWebfontsKit.css','https://restorra.s3.amazonaws.com/jeffersontap/font-import.css')
        res.send(output);
    })
    .catch(function (error) {
        res.redirect('https://jeffersontap.com/menu');
    })

  
  })



  
  module.exports = router