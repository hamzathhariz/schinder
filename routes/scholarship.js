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

router.post('/edit', (req, res, next) => {
    scholarhip.scholarshipEdit(req, res, next);
});

router.get('/admin-view', (req, res, next) => {
    scholarhip.scholarships(req, res, next)
});

router.get('/students-list', (req, res, next) => {
    scholarhip.studentsList(req, res, next);
});

router.post('/delete', (req, res, next) => {
    scholarhip.deleteStudent(req, res, next);
});

module.exports = router;