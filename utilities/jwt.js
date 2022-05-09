const jwt = require('jsonwebtoken');;
const winston = require('winston');


/**
 * JWT Encoding
 * @param {object} payload
 * @param {number} ttl (seconds)
 */
exports.encode = async (payload, ttl=60) => {
    try {
        if (!payload) return null;
    
        return await jwt.sign(payload, 'F&CKL;x&7%AgP.E%', { expiresIn: ttl });
    } catch(error) {
        winston.error('JWT ENCODE function error', error);
        return null;
    }
};


/**
 * JWT Decoding
 * @param {string} token
 */
exports.decode = async (token) => {
    try {
        if (!token) return null;

        const decoded = await jwt.verify(token, 'F&CKL;x&7%AgP.E%');
        return decoded;
    } catch(error) {
        winston.error('JWT DECODE function error', error);
        return null;
    }
};