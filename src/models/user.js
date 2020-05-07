const mongoose = require('mongoose')
mongoose.set('useCreateIndex', true);
const validator = require('validator')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const props = require('../props.js')

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
    password : {
        type: String,
        required: true
    },
    tokens : {
        type: Array
    },
    goal : {
        type: Number,
        required: false,
        default: 100
    }
})



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



userSchema.pre('save', async function(next) {
    const user = this
    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8)
    }
    next()
});


userSchema.methods.toJSON = function () {
    const user = this
    const userObject = user.toObject()
    
    delete userObject.tokens
    delete userObject.password
    
    return userObject
}



userSchema.methods.issueAuthToken = async function () {
    const user = this
    const token = jwt.sign({_id: user._id}, props.secret, {expiresIn: 172800})
    user.tokens = user.tokens.concat({token})
    await user.save()
    return token
}

const User = mongoose.model('User', userSchema);

module.exports = User