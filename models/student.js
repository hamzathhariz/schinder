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
    relegion: {
        type: String,
        enum: ['muslim', 'budhist', 'christian', 'jains'],
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
        residence: Joi.string().required().valid('kerala')
    });

    return schema.validate(student);
}