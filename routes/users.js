var express = require('express');
var router = express.Router();
const profileRepository = require('../repositories/profile/profile.respository');
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/', (req, res, next) => {
  profileRepository.userSignUp(req, res, next);
});
module.exports = router;
