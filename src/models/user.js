const mongoose = require('mongoose')
mongoose.set('useCreateIndex', true);
const validator = require('validator')
const bcrypt = require('bcrypt');

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


const User = mongoose.model('User', userSchema);

module.exports = User