const Mongoose = require('mongoose')
const validator = require('validator')
const Schema = Mongoose.Schema
const currentDomain = require('../../config/config').config.DOMAIN

const UserSchema = new Schema({
    name: {
        type: String,
        required: [true, 'name is a required field']
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
        unique: [true, 'this email is already in use'],
    },
    password: {
        type: String,
        minlength: 8,
        validate: { validator: value => {
                        var strongRegex = new RegExp("^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
                        return strongRegex.test(value)
                    }
        },
        required: [true, 'password is a required field'],
    },
    phone: {
        type: Number,
        minlength: 10,
        required: [true, 'phone number is a required field']
    },
    photo: String,       //photo url
    createdAt: {
        type: Date,
        default: Date.now
    }
})

module.exports = Mongoose.model('User', UserSchema)