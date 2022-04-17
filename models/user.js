const Joi = require('joi');
const mongoose = require('mongoose');
var crypto = require('crypto');


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
        },
        hash : {
            type: String,
            require: true
        }, 
        salt : {
            type: String,
            require: true
        }
    },
    { timestamps: true }
);

// Method to set salt and hash the password for a user 
userSchema.methods.setPassword = function(password) { 
     
    // Creating a unique salt for a particular user 
       this.salt = crypto.randomBytes(16).toString('hex'); 
     
       // Hashing user's salt and password with 1000 iterations, 
        
       this.hash = crypto.pbkdf2Sync(password, this.salt,  
       1000, 64, `sha512`).toString(`hex`); 
   }; 
     
   // Method to check the entered password is correct or not 
   userSchema.methods.validPassword = function(password) { 
       var hash = crypto.pbkdf2Sync(password,  
       this.salt, 1000, 64, `sha512`).toString(`hex`); 
       return this.hash === hash; 
   }; 

exports.User = mongoose.model('User', userSchema);

exports.validateUser = function validateUser(user){
    const schema = Joi.object({
        phone: Joi.string().length(10).pattern(/^[0-9]+$/).required()
            .messages({'string.pattern.base': "Phone Number must contain numbers only"}),
        email: Joi.string().pattern(/.+\@.+\..+/).required(),
        isAdmin: Joi.boolean(),
        password: Joi.string().required(),
        name: Joi.string().required()
    });
    return schema.validate(user);
}
