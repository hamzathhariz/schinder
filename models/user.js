const Joi = require('joi');
const mongoose = require('mongoose');


const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            min: 3,
            max: 128 
        },
        phone: {
            type: String,
            required: true,
            trim: true,
            unique: true,
            match: /^[0-9]{10}$/
        },
        email: { 
            type: String,
            trim: true,
            min: 3,
            max: 128,
            match: /.+\@.+\..+/
        },
        isAdmin: {
            type: Boolean,
            default: false
        }
    },
    { timestamps: true }
);

exports.User = mongoose.model('User', userSchema);
