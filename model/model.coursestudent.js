
var mongoose = require('mongoose');
var validator = require('validator');
var UxdScheduleModel = mongoose.model('UxdScheduleModel', {
    clientId: {
    type: String,
    required: true,
   },
   advisorId: {
    type: String,
    required: true,
   },
   date:{
    type: Date,
    require: true,
   },
   paid:{
    type: Boolean,
    default: false
   },
   paymentId: {
    type: String,
    default: null
   },
   paymentDate: {
       type: Date,
       default:null
   },
   message:{
       type: String,
       default:''
   }
 
});
module.exports.UxdScheduleModel = UxdScheduleModel