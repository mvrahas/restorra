const User = require('../models/user.js')
const express = require('express')
const router = express.Router()
const authenticate = require('../tools/authenticate.js')
const axios = require('axios')


router.get('/analyze/handicap-projection', authenticate, async (req, res) => {

    const output = {
        current_handicap: 11,
        goal_handicap: 9.0,
        rounds_needed: 3,
        courses : [
            {course: "Wilshire CC", score: 88},
            {course: "Newton Comm", score: 84},
            {course: "Rancho Park", score: 86},
        ]
    }
    
    res.status(200).send(req.user)
  })



router.get('/analyze/index-history', authenticate, async (req, res) => {

    const url = 'https://api2.ghin.com/api/v1/golfermethods.asmx/HandicapHistory.json?username=GHIN2020&password=GHIN2020&club=0&ghin_number='+req.user.ghin_number+'&revCount=0&assoc=0&service=0&date_begin='+req.query.date_begin+'&date_end='+req.query.date_end
    const requestOptions = {
        headers: {
            authorization: req.user.ghin_token
        }
    }

    try {
        const response = await axios.get(url, requestOptions )
        res.status(200).send(response.data)
    } catch(e) {

    }
})

module.exports = router