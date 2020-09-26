//add some here

const express = require('express')
const mongoose = require('mongoose')
const Add = require('../models/add')



const router = express.Router()

router.get('/user', (req, res) => {
    const addToCreate = new Add(req.body)
    
    addToCreate.save().then((createdAdd) => {
        res.status(200).send(createdAdd)
    }).catch((e) => {
        res.status(400).send(e)
    })
})

module.exports = router