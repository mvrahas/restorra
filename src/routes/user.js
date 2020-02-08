const express = require('express')
const User = require('../models/user')
const router = express.Router()
const jwt = require('jsonwebtoken')
const props = require('../props.js')
const bcrypt = require('bcrypt')



router.post('/register', async (req, res) => {
  const user = new User(req.body)
    try {
      user.tokens = [issueAuthToken('admin', user.email)]
      await user.save()
      res.status(201).send(user)
    } catch (e) {
      res.status(400).send(e)
    }
})


const issueAuthToken = function (lvl, usr) {
  return jwt.sign({lvl, usr}, props.secret, {expiresIn: 172800})
}

router.post('/login', async (req, res) => {
  try {
    const user = await User.findOne({email: req.body.email})
    if (user) {
      const match = await bcrypt.compare(req.body.password, user.password)
      if (match) {
        user.tokens.push(issueAuthToken('admin', user.email))
        res.status(200).send(user)
      } else {
        res.status(400).send('Incorrect login information')
      }
    } else {
      res.status(404)
    }
  } catch (e) {
    res.status(500).send(e)
  }
})




router.patch('/users/:id', async (req, res) => {
  
  const updates = Object.keys(req.body)
  const allowedUpdates = ['name', 'email', 'password', 'goal']
  const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

  if (!isValidOperation) {
      return res.status(400).send({error: 'invalid updates!'})
  }

  try {
    const user = await User.findById(req.params.id)
    if(!user) {
      res.status(400).send('None Found')
    }
    updates.forEach((update) => user[update] = req.body[update])
    await user.save()
    res.send(user)
  } catch (e) {
      res.status(500).send(e)
  }

})


router.get('/users', async (req, res) => {

  try {
    const users = await User.find({})
    res.status(200).send(users)
  } catch (e) {
    res.status(500).send(e)
  }
})



module.exports = router