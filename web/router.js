var express = require('express')
var router = express.Router()

router.get('/welcome', (req, res) => {
    res.render('welcome', {
        title: "Login",
        name: "telemarkus"
    })
})

router.get('/index', (req, res) => {
    res.render('index', {
        title: "Weather",
        name: "telemarkus"
    })
})

router.get('/about', (req, res) => {
    res.render('about', {
        title: "About",
        name: "telemarkus"
    })
})

router.get('/help', (req, res) => {
    res.render('help', {
        title: "Help",
        message: "This is where you can go for help",
        name: "telemarkus"
    })
})


module.exports = router