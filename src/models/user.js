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
        type: String,
        required: false
    }
})

userSchema.pre('save', async function(next) {
    const user = this
    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8)
    }
    next()
});

userSchema.methods.issueAuthToken = async function () {
    const user = this
    const token = jwt.sign({_id: user._id}, props.secret, {expiresIn: 172800})
    user.tokens = user.tokens.concat({token})
    await user.save()
    return token
}

const User = mongoose.model('User', userSchema);

module.exports = User