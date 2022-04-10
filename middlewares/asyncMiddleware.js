const winston = require("winston");

module.exports = function(handler) {
    return async(req, res, next) => {
        try {
            handler(req, res, next);
        } catch(ex) {
            next(ex);
        }
    }
}