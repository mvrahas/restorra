const mongoose = require('mongoose')

const advertiserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: True
    },
    zipcode: {
        type: Number,
        required: True
    }
})

var Advertiser = mongoose.Model('Advertiser', advertiserSchema)

module.exports = Advertiser