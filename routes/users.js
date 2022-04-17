var express = require('express');
var router = express.Router();
const profileRepository = require('../repositories/profile/profile.respository');
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/signup', (req, res, next) => {
  profileRepository.userSignUp(req, res, next);
});

router.post('/login', (req, res, next) => {
  profileRepository.userLogin(req, res, next);
});

module.exports = router;
