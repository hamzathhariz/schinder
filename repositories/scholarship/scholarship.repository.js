const asyncMiddleware = require('../../middlewares/asyncMiddleware');
const Response = require('../../middlewares/response');
const pagination = require('../../utilities/pagination');
const { Scholarship, validateScholarshipCreate, validateApproveScholarship, validateApplyScholarship } = require('../../models/scholarship');
const { AppliedScholarship } = require('../../models/appliedScholarship');
const { User } = require('../../models/user');

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

    let response = Response('success', '', { scholarship });
    response = pagination(response, count, 10, page_no);
    return res.send(response);
});

exports.adminScholarshipView = asyncMiddleware(async (req, res, next) => {
    var appliedScholarship = await AppliedScholarship.find()
        .populate('student')
        .populate('scholarship');

    let response = Response('success', '', appliedScholarship);
    return res.send(response);
});

exports.approveScholarship = asyncMiddleware(async (req, res, next) => {
    const { error } = validateApproveScholarship(req.query);

    if(error) {
        let response = Response('error', error.details[0].message);
        return res.status(response.statusCode).send(response);
    };
    
    var result = await AppliedScholarship.updateOne({ _id: req.query.id }, { isApproved: true });

    if(result.modifiedCount > 0) {
        let response = Response('success', '');
        return res.send(response);
    }

    let response = Response('error', '');
    return res.status(response.statusCode).send(response);
});


exports.applyScholarship = asyncMiddleware(async (req, res, next) => {
    const { error } = validateApplyScholarship(req.query);

    if(error) {
        let response = Response('error', error.details[0].message);
        return res.status(response.statusCode).send(response);
    };

    var user = User.findById(req.query.user);

    var scholarship = Scholarship.findById(req.query.scholarship);

    if( !user.relegion in scholarship.criteria.relegion ) {
        let response = Response('error', 'Relegion Mismatch');
        return res.send(response);
    }

    if( !user.category in scholarship.criteria.category ) {
        let response = Response('error', 'Category Mismatch');
        return res.send(response);
    }

    if( user.percentage < scholarship.criteria.percentage ) {
        let response = Response('error', 'Percentage is not enough');
        return res.send(response);
    }

    if( user.income > scholarship.criteria.income ) {
        let response = Response('error', 'income is not valid');
        return res.send(response);
    }

    if( !user.residence in scholarship.criteria.residence ) {
        let response = Response('error', 'income is not valid');
        return res.send(response);
    } 

    var applied = new AppliedScholarship({
        student: req.query.user,
        scholarship: req.query.scholarship
    });

    await applied.save();

    let response = Response('success', 'applied');
    return res.send(response);
});