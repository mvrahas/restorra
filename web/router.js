var express = require('express')
var router = express.Router()

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

router.get('/allscores', (req, res) => {
    res.render('allscores', {
        title: "All Scores",
        name: "telemarkus",
        scores: [
            {
                putts: 2,
                fairways: 3,
                other: 2
            },
            {
                putts: 6,
                fairways: 3,
                other: 9
            },
            {
                putts: 8,
                fairways: 3,
                other: 2
            }
        ]
    })
})


module.exports = router