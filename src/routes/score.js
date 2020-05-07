const Score = require('../models/score.js')
const User = require('../models/user.js')
const express = require('express')
const router = express.Router()
const authenticate = require('../tools/authenticate.js')

router.get('/scores', authenticate, async (req, res) => {

  try {
    const scores = await Score.find({player: req.user._id}).sort({ date: -1 })
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

    const scores = await Score.find({player: req.user._id}).limit(10).sort({ date: -1 })
    filtered_scores = []
    for (var i = 0; i<scores.length; i++) {
      var temp_score = scores[i].toObject()
      delete temp_score._id
      delete temp_score.type
      delete temp_score.courseRating
      delete temp_score.courseSlope
      delete temp_score.fairways
      delete temp_score.greens
      delete temp_score.player
      delete temp_score.putts
      delete temp_score.__v
      filtered_scores.push(temp_score)
    }

    const aggregate = await Score.aggregate([
      {$match: {player: req.user._id}},
      {$sort: {date: -1}},
      {$limit: 3},
      {$group: {_id: '$player', score: {$avg: '$score'}, putts: {$avg: '$putts'}, greens: {$avg: '$greens'}, fairways: {$avg: '$fairways'}}}
    ])

    var summary = {}
    
    if (aggregate.length > 0) {

      const calculated_goal = Math.floor(aggregate[0].score / 5) * 5
        if (calculated_goal < req.user.goal) {
        req.user.goal = calculated_goal
        await User.findByIdAndUpdate(req.user._id, {goal: calculated_goal},{ useFindAndModify: false })
      }

      summary = {
        summary: filtered_scores,
        summary_stats: [
          {
            stat: 'Score',
            average: aggregate[0].score,
            goal: req.user.goal
          },
          {
            stat: 'Putts',
            average: aggregate[0].putts,
            goal: aggregate[0].putts - 1
          },
          {
            stat: 'Greens',
            average: aggregate[0].greens,
            goal: aggregate[0].greens + 1
          },
          {
            stat: 'Fairways',
            average: aggregate[0].fairways,
            goal: aggregate[0].greens + 1
          }
        ]
      }
    }


    res.status(200).send(summary)

})



module.exports = router