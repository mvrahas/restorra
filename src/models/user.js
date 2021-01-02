const mongoose = require('mongoose')
mongoose.set('useCreateIndex', true);
const validator = require('validator')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const props = require('../props.js')
const axios = require('axios')

userSchema = new mongoose.Schema({

    name : {
        type: String,
        required: true
    },
    email : {
        type: String,
        required: true,
        lowercase: true,
        unique: true,
        trim: true,
        validate: {
            validator: function (value) {
                return validator.isEmail(value)
            },
            message: 'This is not a valid email address'
        }
    },
    ghin_number : {
        type: String,
        required: true
    },
    tokens : {
        type: Array
    },
    ghin_token : {
        type: String,
        default: 'NA'
    },
    goal : {
        type: Number,
        required: false,
        default: 100
    }
})


/*

This will eventually be replaced by a passwordless login system when the application has subscriptions and email functionality. No login for now

userSchema.statics.findByCredentials = async (email, password) => {
    const user = await User.findOne({email})
    if (!user) {
        throw new Error('Unable to log in')
    }

    const ismatch = await bcrypt.compare(password, user.password)

    if(!ismatch) {
        throw new Error('Unable to log in')
    }

    return user

}
*/



userSchema.pre('save', async function(next) {
    const user = this
    next()
});


userSchema.methods.toJSON = function () {
    const user = this
    const userObject = user.toObject()
    
    delete userObject.tokens
    delete userObject.ghin_token
    
    return userObject
}

userSchema.methods.issueAuthToken = async function () {
    const user = this
    const token = jwt.sign({_id: user._id}, props.secret, {expiresIn: 172800})
    user.tokens = user.tokens.concat({token})
    await user.save()
    return token
}

userSchema.methods.logIntoGHIN = async function () {
    const user = this
    // needs handling for if the request is unsuccessful or GHIN is down
    url = 'https://api2.ghin.com/api/v1/public/login.json?ghinNumber='+user.ghin_number+'&lastName='+user.name+'&remember_me=false'

  try {
    const response = await axios.get(url)
    if (response.data.golfers.length == 1) {
        const new_ghin_token = response.data.golfers[0].NewUserToken
        user.ghin_token = new_ghin_token
        await user.save()
        return new_ghin_token
    } else {
        throw new Error("Golfer not found in GHIN")
    }
  } catch (error) {
    if(error.message != "Golfer not found in GHIN") {
        throw new Error("Something went wrong. Cannot connect to GHIN")
    } else {
        throw new Error(error)
    }
  }


}


const User = mongoose.model('User', userSchema);

module.exports = User