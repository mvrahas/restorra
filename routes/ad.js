const express = require('express')
const mongoose = require('mongoose')
const Ad = require('../models/ad')



const router = express.Router()


// Create an ad

router.post('/ads', (req, res) => {
    
    const adToCreate = new Ad(req.body)
    
    adToCreate.save().then((createdAd) => {
        res.status(200).send(createdAd)
    }).catch((e) => {
        res.status(400).send(e)
    })

})

// Show all ads

router.get('/ads', (req, res) => {

    Ad.find({}).then((resultsOfQuery) => {
        res.status(200).send(resultsOfQuery)
    }).catch((e) => {
        res.status(400).send("Something went wrong")
    })
    

})




module.exports = router