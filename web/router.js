var express = require('express')
var router = express.Router()
var getCookie = require('./public/js/get-cookie.js')
var rp = require('request-promise')

router.get('/index', (req, res) => {
    res.render('index', {
        title: "Login",
        name: "telemarkus"
    })
})

router.get('/post', (req, res) => {
    res.render('post', {
        title: "Post Score",
        name: "telemarkus"
    })
})

router.get('/summary', (req, res) => {
    res.render('summary', {
        title: "Summary",
        name: "telemarkus"
    })
})

router.get('/register', (req, res) => {
    res.render('register', {
        title: "Register",
        name: "telemarkus"
    })
})

router.get('/allscores', getCookie, async (req, res) => {
    
    var options = {
        uri: 'http://' + req.headers.host + '/scores',
        headers: {
            'Authorization': 'Bearer ' + req.token
        },
        json: true
    };
    
    try {
        const scores = await rp(options)
        res.render('allscores', {
            title: "All Scores",
            name: "telemarkus",
            scores: scores
        })
    } catch (e) {
        console.log(e)
    }


})


module.exports = router