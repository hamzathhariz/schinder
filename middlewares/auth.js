const jwt = require('jsonwebtoken');
const Response = require('../middlewares/response');

/**
 * Validate JWT Token
 */
module.exports = (req, res, next) => {
    try {
        const token = req.header('x-auth-token');
        if (!token) {
            let response = Response('error', 'Unauthorized', {}, 401);
            return res.status(response.statusCode).send(response);
        }

        const decoded = jwt.verify(token, 'F&CKL;x&7%AgP.E%');
        req.user = decoded;
        next();
    } catch(ex) {
        let response = Response('error', 'Invalid Token', {}, 401);
        return res.status(response.statusCode).send(response);
    }
}