

var mongoose = require('mongoose');
var validator = require('validator');

var UserModel = mongoose.model('UxdUserModel', {
    email_id: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        minlength: 5,
        validate: {
            validator: (value) => {
                return validator.isEmail(value);
            }
        }
    },
    name: {
        type: String
    },
    
    password: {
        type: String,
        require: true,
    },
    role: {
        type: String,
        enum: ['admin', 'client', 'advisor'],
        require: true,
        default: 'client'
    },
    street:{
        type: String,
        default: ''
    },
    city:{
        type: String,
        default: ''
    },
    state:{
        type: String,
        default: ''
    },
    zipcode:{
        type: Number,
        default: 64468
    },
    bio:{
        type: String,
        default: ''
    },
    phone:{
        type: String
    },
    last_login:{
        type: Date,
        default: Date.now()
    }
});
module.exports.UserModel = UserModel