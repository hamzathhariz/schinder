const Joi = require('joi');
const mongoose = require('mongoose');

const appliedScholarshipSchema = new mongoose.Schema({
    scholarship: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Scholarship',
        required: true,
        // unique: true
    },
    student: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        // unique: true
    },
    isApproved: {
        type: Boolean,
        default: false
    },
    isRejected: {
        type: Boolean,
        default: false
    }
});

exports.AppliedScholarship = mongoose.model('AppliedScholarship', appliedScholarshipSchema);