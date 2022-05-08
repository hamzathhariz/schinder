const asyncMiddleware = require('../../middlewares/asyncMiddleware');
const Response = require('../../middlewares/response');
const { Scholarship, validateScholarshipCreate } = require('../../models/scholarship');

exports.scholarshipCreation = asyncMiddleware(async (req, res, next) => {
    const { error } = validateScholarshipCreate(req.body);

    if(error) {
        let response = Response('error', error.details[0].message);
        return res.status(response.statusCode).send(response);
    };

    var scholarship = new Scholarship(req.body);
    await scholarship.save();
    let response = Response('success', '', scholarship);
    return res.send(response); 
}); 


exports.scholarshipView = asyncMiddleware(async (req, res, next) => {
    var scholarship = await Scholarship.find();
    
    let response = Response('success', '', scholarship);
    return res.send(response);
});