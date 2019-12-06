
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
   },
   street:{
    type: String,
    default: ''
},
name:{
    type: String,
    default:''
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
 
});
module.exports.UxdScheduleModel = UxdScheduleModel