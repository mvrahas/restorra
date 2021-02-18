const express = require('express')
const axios = require('axios')
const router = express.Router()


//Hello World
router.get('/', async (req, res) => {
  res.send('Hello World!')
})


// Display the jefferson tap menu with ad placed inline
router.get('/jeffersontap', (req, res) => {
  
    axios.get('https://jeffersontap.com/menu')
    .then(function (response) {
        
        var a = response.data;
        var b = "<script src='/js/amplitude.js'></script><script src='/js/insertadinline.js'></script><script>window.addEventListener('load', async (event) => {amplitude.getInstance().init('"+global.gConfig.amplitude_api_key+"'); trackMenuViewedEvent(); insertAdInline();})</script>"
        var position = response.data.length - 9
        var output = [a.slice(0, position), b, a.slice(position)].join('');
        output = output.replace('https://jeffersontap.com/wp-content/themes/SolvedSystems-CHT/css/styles.min.css','/menu-files/jeffersontap/standard.css')
        output = output.replace('https://jeffersontap.com/wp-content/themes/SolvedSystems-CHT/css/MyFontsWebfontsKit.css','/menu-files/jeffersontap/font-import.css')
        res.send(output);
    })
    .catch(function (error) {
        res.redirect('https://jeffersontap.com/menu');
    })

})


// Display any menu with ad placed fixed
router.get('/fixed', async (req, res) => {
  
  try {
    const menuURL = req.query.menu || 'https://jeffersontap.com/menu'
    res.render('frame', {
      menuURL: menuURL
    })
  } catch (e) {
    res.render('404')
  }

})


module.exports = router