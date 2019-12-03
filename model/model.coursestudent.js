
var mongoose = require('mongoose');
var validator = require('validator');
var UxdScheduleModel = mongoose.model('UxdScheduleModel', {
    clientId: {
    type: String,
    required: true,
    trim: true,
    minlength: 6
   },
   advisorId: {
    type: String,
    required: true,
    trim: true,
    minlength: 6
   },
   time:{
    type: Date,
    require: true,
   },
   paid:{
    type: Boolean,
    default: false
   },
   paymentId: {
    type: String,
   },
   paymentDate: {
       type: Date
   },
   paymentMethod:{
       type: String
   }
});
module.exports.UxdScheduleModel = UxdScheduleModel