var express = require('express');
var router = express.Router();
var scholarhip = require('../repositories/scholarship/scholarship.repository');

router.post('/creation', (req, res, next) => {
    scholarhip.scholarshipCreation(req, res, next);
});

router.get('/view', (req, res, next) => {
    scholarhip.scholarshipView(req, res, next)
});

router.get('/applied-scholarship', (req, res, next) => {
    scholarhip.adminScholarshipView(req, res, next);
});

router.post('/approve-scholarship', (req, res, next) => {
    scholarhip.approveScholarship(req, res, next);
});

router.post('/apply-scholarship', (req, res, next) => {
    scholarhip.applyScholarship(req, res, next);
});

module.exports = router;