const Score = require('../models/score.js')
const express = require('express')
const router = express.Router()

router.get('/scores', (req, res) => {
    res.send('This is where the scores will be listed')
  })
  
router.post('/scores', (req, res) => {


var entry = new Score(req.body);
    entry.save((err, entry) => {
      if (err) {
        console.log(err)
        res.status(400).send()
      }
      res.status(200).send(entry)
    })
})

module.exports = router