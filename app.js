const path = require('path')
const express = require('express')
const axios = require('axios')
var hbs = require('hbs')
const app = express()
const port = process.env.PORT || 3000
const viewsPath = path.join(__dirname, '/views')


app.set('view engine', 'hbs')
app.set('views', viewsPath)



app.get('/', (req, res) => {

  axios.get('https://v2-api.sheety.co/c8d0b3b214a817554114d96220e3c881/restoAdds/config')
  .then(function (response) {
    // handle success
    console.log(response.data.config[0].id)

    res.render('index', {
      background: response.data.config[0].restaurantBackgroundUrl,
      name: response.data.config[0].restaurantTitle,
      subtitle: response.data.config[0].restaurantSubtitle,
      restaurantlogo: response.data.config[0].restaurantLogoUrl,
      addcaption: response.data.config[0].addCaption,
      addimage: response.data.config[0].addImageUrl,
      addlink: response.data.config[0].addLink
  })

  })
  .catch(function (error) {
    // handle error
    console.log(error);
    res.send('opps')
  }).then(function () {
    
  });



})

app.use(express.static('public'))

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})