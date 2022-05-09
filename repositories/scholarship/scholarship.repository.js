const asyncMiddleware = require('../../middlewares/asyncMiddleware');
const Response = require('../../middlewares/response');
const { Scholarship, validateScholarshipCreate } = require('../../models/scholarship');
const pagination = require('../../utilities/pagination');
const accountSid = 'ACc8d9ec8505e02059abe41d1e1789a429';
const authToken = 'c14acb61074a03dc7ec0c32e1d116ec4';
const client = require('twilio')(accountSid, authToken);

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
    const page_no = Number(req.query.page) > 0 ? Number(req.query.page) : 1;
    var count = await Scholarship.count();
    var scholarship = await Scholarship.find().sort('-_id');

    // var message = await client.messages
    //   .create({
    //      from: 'whatsapp:+15038529301',
    //      body: 'Hello there!',
    //      to: 'whatsapp:+918139800530'
    //    })
    // console.log(message);
    let response = Response('success', '', { scholarship });
    response = pagination(response, count, 10, page_no);
    return res.send(response);
});