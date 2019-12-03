
var express = require('express');
var router = express.Router();
var usersController = require('../controllers/controller.user')
const bodyParser = require('body-parser');
let multer = require('multer')
const tokencheck = require('../middleware/tokencheck')
router.use(bodyParser.json());

router.all('*', tokencheck.tokencheck)
/* GET home page. */
router.get('/', function(req, res, next) {
  res.json('codeword')
});


module.exports = router;
