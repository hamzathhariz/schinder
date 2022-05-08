var express = require('express');
var router = express.Router();
var scholarhip = require('../repositories/scholarship/scholarship.repository');

router.post('/creation', (req, res, next) => {
    scholarhip.scholarshipCreation(req, res, next);
});

router.get('/view', (req, res, next) => {
    scholarhip.scholarshipView(req, res, next)
})
module.exports = router;