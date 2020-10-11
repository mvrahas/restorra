const express = require('express')
const mongoose = require('mongoose')
const Restaurant = require('../models/restaurant')

const router = new express.Router()

router.post('/restaurants', async (req, res) => {
    const newRestaurant = new Restaurant(req.body)

    try {
        const createdRestaurant = await newRestaurant.save()
        res.status(200).send(createdRestaurant)
    } catch (e) {
        res.status(400).send(e)
    }

})

router.get('/restaurants', (req, res) => {

    Restaurant.find({}).then((resultsOfQuery) => {
        res.status(200).send(resultsOfQuery)
    }).catch((e) => {
        res.status(400).send("Something went wrong")
    })
    

})

router.get('/restaurants/:id', (req, res) => {

    Restaurant.findOne({ restaurant_name: req.params.id }).then((resultsOfQuery) => {
        res.status(200).send(resultsOfQuery)
    }).catch((e) => {
        res.status(400).send("Something went wrong")
    })
    
})

module.exports = router