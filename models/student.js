const Joi = require('joi');
const mongoose = require('mongoose');
const isObjectId = require('./validation/isObjectId');

const studentSchema = new mongoose.Schema({
    student: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        // unique: true
    },
    aadharNo:{
        type: String,
        max: 12,
        min: 12,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    caste: {
        type: String,
        required: true,
        enum: ['pentacostal', 'latin', 'viswakarma', 'dheevara']
    },
    relegion: {
        type: String,
        enum: ['muslim', 'budhist', 'christian', 'jains', 'general', 'ezhava'],
        required: true
    },
    category: {
        type: String,
        required: true,
        enum: ['obc', 'oec', 'sc/st']
    },
    percentage: {
        type: Number,
        required: true,
        max: 100,
        min: 0
    },
    fathersName: {
        type: String,
        required: true
    },
    fathersOccupation: {
        type: String,
        required: true
    },
    income: {
        type: String,
        required: true
    },
    residence: {
        type: String,
        required: true,
        enum: ['kerala']
    }
});

exports.Student = mongoose.model('Student', studentSchema);

exports.validateStudent = function validateStudent(student) {
    const schema = Joi.object({
        student: Joi.custom(isObjectId).required(),
        relegion: Joi.string().valid('muslim', 'budhist', 'christian', 'jains').required(),
        category: Joi.string().required().valid('obc', 'oec', 'sc/st'),
        percentage: Joi.number().min(0).required(),
        income: Joi.number().required().min(0),
        residence: Joi.string().required().valid('kerala'),
        aadharNo: Joi.string().max(12).min(12).required(),
        address: Joi.string().required(),
        caste: Joi.string().valid('pentacostal', 'latin', 'viswakarma', 'dheevara').required(),
        fathersName: Joi.string().required(),
        fathersOccupation: Joi.string().required()
    });

    return schema.validate(student);
}