const asyncMiddleware = require('../../middlewares/asyncMiddleware');
const Response = require('../../middlewares/response');
const pagination = require('../../utilities/pagination');
const { Scholarship, validateScholarshipCreate, validateApproveScholarship, validateApplyScholarship } = require('../../models/scholarship');
const { AppliedScholarship } = require('../../models/appliedScholarship');
const { User } = require('../../models/user');
const message = require('../../services/sms.service');

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
    var user = await User.findById(req.query._id);

    const page_no = Number(req.query.page) > 0 ? Number(req.query.page) : 1;
    var count = await Scholarship.count({'criteria.relegion': user.relegion, 'criteria.category': user.category,
        'criteria.percentage': { $gte: user.percentage },
        'criteria.income': { $lte: user.income },
        'criteria.residence': user.residence
    });
    
    var scholarship = await Scholarship.find({ 
        'criteria.relegion': user.relegion, 'criteria.category': user.category,
        'criteria.percentage': { $gte: user.percentage },
        'criteria.income': { $lte: user.income },
        'criteria.residence': user.residence
        }).sort('-_id');

    let response = Response('success', '', { scholarship });
    response = pagination(response, count, 10, page_no);
    return res.send(response);
});

exports.adminScholarshipView = asyncMiddleware(async (req, res, next) => {
    var appliedScholarship = await AppliedScholarship.find()
        .populate('student', 'name email phone ')
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
    
    var result = await AppliedScholarship.findByIdAndUpdate(req.query.id , { isApproved: true });
    if(result) {
        var user = await User.findById(result.student);
        var scholarhip = await Scholarship.findById(result.scholarship);

        message('9180755 43244', `Approved: ${scholarhip.title}`);

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

    var applied = new AppliedScholarship({
        student: req.query.user,
        scholarship: req.query.scholarship
    });

    await applied.save();

    let response = Response('success', 'applied');
    return res.send(response);
});