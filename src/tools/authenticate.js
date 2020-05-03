const jwt = require('jsonwebtoken')
const props = require('../props.js')
const User = require('../models/user.js')

authenticate = async function (req, res, next) {
    token = req.headers.authorization
    token = token.slice(7, token.length)

    try {
        const verified_json = await jwt.verify(token,props.secret)
        const user = await User.findOne({_id: verified_json._id})
        req.token = token
        req.user = user

        const filtered = user.tokens.filter((value) => {
            return value.token == token
        })

        if (filtered.length != 0){
            return next()
        }else{
            res.send('could not authenticate')
        }

    } catch (e) {
        console.log(e)
        res.send('could not authenticate')
    }
}

module.exports = authenticate