const jwt = require('jsonwebtoken');
const SECRETS = require('../config/secrets');
const Response = require('./response');


/**
 * Validate Store User JWT Token
 */
exports.storeUser = (req, res, next) => {
    const token = req.header('x-auth-token');
    if (!token) {
        let response = Response('error', 'Unauthorized', {}, 401);
        return res.status(response.statusCode).send(response);
    }
    try {
        const decoded = jwt.verify(token, SECRETS.JWT_SECRET_KEY);

        if (decoded.userPermission != 'storeManager' && decoded.userPermission != 'storeUser') {
                let response = Response('error', 'Forbidden', {}, 403);
                return res.status(response.statusCode).send(response);
        }

        req.user = decoded;

        next();
    } catch(ex) {
        let response = Response('error', 'Invalid Token', {}, 401);
        return res.status(response.statusCode).send(response);
    }
}


/**
 * Validate Store Manager JWT Token
 */
 exports.storeManager = (req, res, next) => {
    const token = req.header('x-auth-token');
    if (!token) {
        let response = Response('error', 'Unauthorized', {}, 401);
        return res.status(response.statusCode).send(response);
    }
    try {
        const decoded = jwt.verify(token, SECRETS.JWT_SECRET_KEY);

        if (decoded.userPermission != 'storeManager') {
            let response = Response('error', 'Forbidden', {}, 403);
            return res.status(response.statusCode).send(response);
        }

        req.user = decoded;

        next();
    } catch(ex) {
        let response = Response('error', 'Invalid Token', {}, 401);
        return res.status(response.statusCode).send(response);
    }
}
