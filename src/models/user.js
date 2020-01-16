const mongoose = require('mongoose')
mongoose.set('useCreateIndex', true);
const validator = require('validator')

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
    goal : {
        type: String,
        required: false
    },
})

const User = mongoose.model('User', userSchema);

module.exports = User