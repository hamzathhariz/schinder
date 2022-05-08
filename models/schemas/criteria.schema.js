const mongoose = require('mongoose');
const Joi = require('joi');
const { array } = require('joi');

const criteriaSchema = new mongoose.Schema({
    relegion:  [{
        type: String,
        enum: ['muslim', 'budhist', 'christian', 'jains'],
        required: true
    }],
    category: [{
        type: String,
        required: true,
        enum: ['obc', 'oec', 'sc/st']
    }],
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
    residence: [{
        type: String,
        required: true,
        enum: ['kerala']
    }]
});

exports.criteriaSchema= criteriaSchema;

