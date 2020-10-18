const express = require('express')
const mongoose = require('mongoose')
const Advertiser = require('../models/advertiser')

const router = express.Router()

// Create an advertiser
router.post('/advertiser', (req, res) => {
    
    const advertiserToCreate = new Advertiser(req.body)
    
    advertiserToCreate.save().then((createdAdvertiser) => {
        res.status(200).send(createdAdvertiser)
    }).catch((e) => {
        res.status(400).send(e)
    })

})

// Show all advertisers

router.get('/advertiser', (req, res) => {

    Advertiser.find({}).then((resultsOfQuery) => {
        res.status(200).send(resultsOfQuery)
    }).catch((e) => {
        res.status(400).send("Something went wrong")
    })
    

})




module.exports = router