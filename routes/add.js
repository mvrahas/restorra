//add some here

const express = require('express')
const mongoose = require('mongoose')
const Add = require('../models/add')



const router = express.Router()


// Create an add

router.post('/adds', (req, res) => {
    
    const addToCreate = new Add(req.body)
    
    addToCreate.save().then((createdAdd) => {
        res.status(200).send(createdAdd)
    }).catch((e) => {
        res.status(400).send(e)
    })

})

// Show all adds

router.get('/adds', (req, res) => {

    Add.find({}).then((resultsOfQuery) => {
        res.status(200).send(resultsOfQuery)
    }).catch((e) => {
        res.status(400).send("Something went wrong")
    })
    

})




module.exports = router