const Joi = require('joi');
const mongoose = require('mongoose');
const { criteriaSchema } = require('./schemas/criteria.schema');
const isObjectId = require('./validation/isObjectId');

const scholarshipSchema = new mongoose.Schema({
    title: {
        type: String,
        min: 8,
        required: true
    },
    description: {
        type: String,
        required: true,
        min: 23
    },
    criteria: criteriaSchema
});

exports.Scholarship = mongoose.model('Scholarship', scholarshipSchema);

exports.validateScholarshipCreate = function validateScholarshipCreate(scholarhip){
    const schema = Joi.object({
        title: Joi.string().required().min(8),
        description:Joi.string().required().min(23),
        criteria: Joi.object({
            relegion: Joi.array().items(Joi.string().valid('muslim', 'budhist', 'christian', 'jains')).required(),
            category: Joi.array().items(Joi.string().valid('obc', 'oec', 'sc/st')).required(),
            percentage: Joi.number().min(0).required(),
            caste: Joi.array().items(Joi.string().valid('pentacostal', 'latin', 'viswakarma', 'dheevara')).required(),
            income: Joi.number().required().min(0),
            residence: Joi.array().items(Joi.string().valid('kerala')).required()
        }).required()
    })

   return schema.validate(scholarhip);
}

exports.validateApproveScholarship = function validateApproveScholarship(id) {
    const schema = Joi.object({
        id: Joi.custom(isObjectId).required()
    });

    return schema.validate(id);
}

exports.validateApplyScholarship = function validateApplyScholarship(data) {
    const schema = Joi.object({
        user: Joi.custom(isObjectId).required(),
        scholarhip: Joi.custom(isObjectId).required()
    });

    return schema.validate(data);
}