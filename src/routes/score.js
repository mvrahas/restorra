const Score = require('../models/score.js')
const express = require('express')
const router = express.Router()

router.get('/scores', async (req, res) => {
  
  // Implementation with callbacks

  // Score.find({}, function (err, result) {
  //   if (err) {
  //     return res.status(400).send()
  //   }
  //   return res.send(result)
  // })


  // Implementation with promises
  
  // Score.find({}).then((result) => {
  //   res.status(200).send(result)
  // }).catch((err) => {
  //   res.status(400).send('There was an issue')
  // })
  
  // Implementation with async await
  try {
    const scores = await Score.find({})
    res.status(200).send(scores)
  } catch (e) {
    res.status(500).send(e)
  }
})
  
router.post('/scores', async (req, res) => {

  var entry = new Score(req.body)
  try {
    await entry.save()
    res.status(201).send(entry)
  } catch (e) {
    res.status(400).send(e)
  }

})



module.exports = router