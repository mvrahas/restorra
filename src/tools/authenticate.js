const jwt = require('jsonwebtoken')
const props = require('../props.js')
const User = require('../models/user.js')

authenticate = async function (req, res, next) {
    token = req.headers.authorization
    token = token.replace('Bearer ', '')

    try {
        const verified_json = await jwt.verify(token,props.secret)
        const user = await User.findOne({_id: verified_json._id, 'tokens.token': token})
        
        if(!user) {
            throw new Error ('Authentication needed')
        }
        req.token = token
        req.user = user
        return next()

    } catch (e) {
        console.log(e)
        res.status(401).send('Authentication needed')
    }
}

module.exports = authenticate