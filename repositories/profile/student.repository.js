const asyncMiddleware = require('../../middlewares/asyncMiddleware');
const Response = require('../../middlewares/response');
const { Student, validateStudent } = require('../../models/student');


exports.studentCreation = asyncMiddleware(async (req, res, next) => {
    const { error } = validateStudent(req.body);

    if(error) {
        let response = Response('error', error.details[0].message);
        return res.status(response.statusCode).send(response);
    };

    var student = new Student(req.body);
    await student.save();
    let response = Response('success', '', student);
    return res.send(response);
});