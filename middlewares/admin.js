const jwt = require('jsonwebtoken');
const Response = require('../middlewares/response');


/**
 * Validate Admin User
 */
module.exports = (req, res, next) => {
    try {
        const token = req.header('x-auth-token');
        if (!token) {
            let response = Response('error', 'Unauthorized', {}, 401);
            return res.status(response.statusCode).send(response);
        }
    
        const decoded = jwt.verify(token, 'F&CKL;x&7%AgP.E%');

        // If not admin - forbidden
        if (!decoded.admin) {
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
