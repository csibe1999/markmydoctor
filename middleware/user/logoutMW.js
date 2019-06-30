const requireOption = require('../requireOption');
module.exports = function (objectrepository) {

    return function (req, res, next) {
        req.session = null;
        return res.redirect('/');
    };
};