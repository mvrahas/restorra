const path = require('path')
const express = require('express')
var hbs = require('hbs')
const app = express()
const port = process.env.PORT || 3000
const viewsPath = path.join(__dirname, '/views')




app.set('view engine', 'hbs')
app.set('views', viewsPath)



app.get('/', (req, res) => {
  res.render('index', {
    background: "https://images.squarespace-cdn.com/content/v1/54f74c5ee4b05bbdbef997f4/1436220105808-BLNDJEQ467JCIIW0VZ2V/ke17ZwdGBToddI8pDm48kLkXF2pIyv_F2eUT9F60jBl7gQa3H78H3Y0txjaiv_0fDoOvxcdMmMKkDsyUqMSsMWxHk725yiiHCCLfrh8O1z4YTzHvnKhyp6Da-NYroOW3ZGjoBKy3azqku80C789l0iyqMbMesKd95J-X4EagrgU9L3Sa3U8cogeb0tjXbfawd0urKshkc5MgdBeJmALQKw/BrewBokeh25.jpg?format=2500w",
    name: "Half Acre Brewing Co",
    subtitle: "Chicago, IL",
    restaurantlogo: "https://images.squarespace-cdn.com/content/54f74c5ee4b05bbdbef997f4/1562615459208-P37AUVP0IM5NJHEU1UU4/HABC_Owlhead-GREY.png?format=750w&content-type=image%2Fpng",
    addcaption: "Rhona Hoffman Gallery",
    addimage: "https://media.timeout.com/images/100824847/1372/772/image.jpg"
})


})

app.use(express.static('public'))

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})