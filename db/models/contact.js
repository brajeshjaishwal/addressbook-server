const Mongoose = require('mongoose')
const validator = require('validator')
const Schema = Mongoose.Schema
const currentDomain = require('../../config/config').config.DOMAIN

const ContactSchema = new Schema({
    name: {
        type: String,
        required: [true,'name is a required field.'],
    },
    email: {
        type: String,
        validate: [ {validator: function(value) {
                                    return value.indexOf(currentDomain) !== -1 
                                },
                                message: `Email is not ${currentDomain}`
                    },
                    {validator: function(value) {
                                    return validator.isEmail(value)
                                },
                                message: 'Email is not valid'
                    }],
        required: [true, 'email is a required field.'],
        unique: [true, 'this email already exist']
    },
    phone: {
        type: Number,
        minlength: 10
    },
    job: {
        type: String,
        default: ''
    },
    //social accounts e.g. facebook, linkedin and etc.
    photo: String,              //photo url
    starred: {
        type: Boolean,           //important
        default: false
    },
    active: {
        type: Boolean,            //active/inactive
        default: true
    },
    user: Schema.Types.ObjectId,//which user this belongs to
    group: Schema.Types.ObjectId,//which group this belongs to
})

module.exports = Mongoose.model('Contact', ContactSchema)