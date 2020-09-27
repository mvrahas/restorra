const express = require('express')
const axios = require('axios')
const router = express.Router()
var path = require('path');


router.get('/menu', async (req, res) => {
  
      res.render('index', {
        background: 'https://images.squarespace-cdn.com/content/v1/54f74c5ee4b05bbdbef997f4/1436220105808-BLNDJEQ467JCIIW0VZ2V/ke17ZwdGBToddI8pDm48kLkXF2pIyv_F2eUT9F60jBl7gQa3H78H3Y0txjaiv_0fDoOvxcdMmMKkDsyUqMSsMWxHk725yiiHCCLfrh8O1z4YTzHvnKhyp6Da-NYroOW3ZGjoBKy3azqku80C789l0iyqMbMesKd95J-X4EagrgU9L3Sa3U8cogeb0tjXbfawd0urKshkc5MgdBeJmALQKw/BrewBokeh25.jpg?format=2500w',
        name: 'Half Acre Brewing Co',
        subtitle: 'Chicago, IL',
        restaurantlogo: 'https://images.squarespace-cdn.com/content/54f74c5ee4b05bbdbef997f4/1562615459208-P37AUVP0IM5NJHEU1UU4/HABC_Owlhead-GREY.png?format=750w&content-type=image%2Fpng',
        addcaption: 'Rhona Hoffmannn Gallery',
        addimage: 'https://media.timeout.com/images/100824847/1372/772/image.jpg',
        addlink: 'https://www.rhoffmangallery.com/'
      })
  
})
  
  router.get('/insertaddsfixed', async (req, res) => {
  
    const menuURL = req.query.menu || 'https://jeffersontap.com/menu'
  
    try {
      const response = await axios.get('/adds')
      var randSelection = Math.floor(Math.random() * response.data.length)
      var currentAdd = response.data[randSelection]
  
      res.render('frame', {
        menuURL: menuURL,
        title: currentAdd.caption,
        link: currentAdd.link,
        imageURL: currentAdd.image_url,
        restaurantName: "wedidittest",
        amplitudeAPIKey: '0f10c615555664f4e9ee4308d2e108d4'
      });
    } catch (e) {
      res.send(e)
    }
  
  })
  



  router.get('/insertaddsinlineframe', async (req, res) => {
  
    const menuURL = req.query.menu || 'https://jeffersontap.com/menu'
  
    try {
      const response = await axios.get('/adds')
      var randSelection = Math.floor(Math.random() * response.data.length)
      var currentAdd = response.data[randSelection]
  
      res.render('frame2', {
        menuURL: menuURL,
        title: currentAdd.caption,
        link: currentAdd.link,
        imageURL: currentAdd.image_url
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