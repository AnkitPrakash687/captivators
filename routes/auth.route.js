
var express = require('express');
var router = express.Router();
var usersController = require('../controllers/controller.user')
const bodyParser = require('body-parser');

router.use(bodyParser.json());

/* GET home page. */
router.get('/', function(req, res, next) {
  res.json('auth')
});

router.post('/signup', usersController.signUp);
router.post('/signin', usersController.signIn);
router.post('/details', usersController.details)
router.post('/resetPassword', usersController.resetPassword)
router.post('/schedule', usersController.schedule)
router.post('/getschedule', usersController.getschedule)
router.post('/getuser', usersController.getuser)
router.post('/payment', usersController.payment)
router.post('/cancelappointment', usersController.cancelPayment)
module.exports = router;
