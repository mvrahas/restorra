const express = require('express')
const User = require('../models/user')
const router = express.Router()
const bcrypt = require('bcrypt')


// Register a new user
router.post('/register', async (req, res) => {

  const user = new User(req.body)
    try {
      token = await user.issueAuthToken()
      ghin_token = await user.logIntoGHIN()
      res.status(201).send({user, token})
    } catch (e) {
      res.status(400).send(e.message)
    }
})

// Login an exisiting user
router.post('/login', async (req, res) => {
  try {
    const user = await User.findByCredentials(req.body.email, req.body.password)
    token = await user.issueAuthToken()
    res.status(200).send({user, token})
  } catch (e) {
    res.status(400).send(e.message)
  }
})

// Read user profile
router.get('/me', authenticate, async (req, res) => {
  res.send(req.user)
})


// Update user profile
router.patch('/users', authenticate, async (req, res) => {
  
  const updates = Object.keys(req.body)
  const allowedUpdates = ['name', 'email', 'password', 'goal']
  const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

  if (!isValidOperation) {
      return res.status(400).send({error: 'invalid updates!'})
  }

  try {
    const user = req.user
    updates.forEach((update) => user[update] = req.body[update])
    await user.save()
    res.send(user)
  } catch (e) {
      res.status(500).send(e)
  }

})

// Show all users
router.get('/users', authenticate, async (req, res) => {

  try {
    const users = await User.find({})
    res.status(200).send(users)
  } catch (e) {
    res.status(500).send(e)
  }
})

// Remove current session token
router.patch('/logout', authenticate, async (req, res) => {

  // remove all sessions with the addition of a query parameter all = 'true'
  var filtered = []
  if (req.query.all != 'true'){
    var array = req.user.tokens
    filtered = array.filter(
    function(value){
      return value.token != req.token
    })
  }
  
  try {
    updated = await User.findByIdAndUpdate({ _id: req.user._id },{ tokens: filtered },{ useFindAndModify: false })
    res.status(200).send('Successfully logged out')
  } catch (e) {
      console.log(e)
      res.status(500).send(e)
  }
})



module.exports = router