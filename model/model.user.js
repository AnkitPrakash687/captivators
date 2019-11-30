

var mongoose = require('mongoose');
var validator = require('validator');

var UserModel = mongoose.model('UserModel', {
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
        minlength: 6
    },
    role: {
        type: String,
        enum: ['admin', 'client', 'advisor'],
        require: true,
        default: 'client'
    }
});
module.exports.UserModel = UserModel