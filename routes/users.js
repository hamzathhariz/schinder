var express = require('express');
var router = express.Router();
const profileRepository = require('../repositories/profile/profile.repository');
const studentRepository = require('../repositories/profile/student.repository');
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

router.post('/student', (req, res, next) => {
  studentRepository.studentCreation(req, res, next);
});

module.exports = router;
