const express = require('express')
const mongoose = require('mongoose')
const Ad = require('../models/ad')
const Restaurant = require('../models/restaurant')



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

router.get('/ads', async (req, res) => {
    debugger
    try {
        
        var addsToDisplay = {}

        if (typeof req.query.restaurant === 'undefined' || req.query.restaurant === null) {
            addsToDisplay = await Ad.find({})
            res.status(200).send(addsToDisplay)
        } else {
            const restaurantInfo = await Restaurant.findOne({ restaurant_name: req.query.restaurant})
            if(restaurantInfo.exclusive_advertisers.length > 0) {
                addsToDisplay = await Ad.find({
                    'advertiser': {
                        $in: restaurantInfo.exclusive_advertisers,
                        $nin: restaurantInfo.restricted_advertisers
                    }
                })
            } else if (restaurantInfo.restricted_advertisers.length > 0) {
                addsToDisplay = await Ad.find({
                    'advertiser': {
                        $nin: restaurantInfo.restricted_advertisers
                    }
                })
            } else {
                addsToDisplay = await Ad.find({})
            }
            
            res.status(200).send(addsToDisplay)
        }



    } catch (e) {
        res.send(e)
    }

    
})




module.exports = router