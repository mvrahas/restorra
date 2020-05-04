const Score = require('../models/score.js')
const express = require('express')
const router = express.Router()
const authenticate = require('../tools/authenticate.js')

router.get('/scores', authenticate, async (req, res) => {

  try {
    const scores = await Score.find({player: req.user._id})
    res.status(200).send(scores)
  } catch (e) {
    res.status(500).send(e)
  }
  
})
  
router.post('/scores', authenticate, async (req, res) => {
  req.body.player = req.user._id
  var entry = new Score(req.body)
  try {
    await entry.save()
    res.status(201).send(entry)
  } catch (e) {
    res.status(400).send(e)
  }

})

router.get('/scores/summary', authenticate, async (req, res) => {
  
    const aggregate = await Score.aggregate([
      { $match: {player: req.user._id}},
      {$group: {_id: '$player', average: {$avg: '$score'}}}
    ])
    const score_obj = {
      avg_score: aggregate[0].average,
      goal_score: aggregate[0].average - 2,
      putts: {
        current: 28,
        goal: 25
      },
      greens: {
        current: 5,
        goal: 8
      },
      fairways: {
        current: 3,
        goal: 5
      }
    }
    res.status(200).send(score_obj)
})



module.exports = router