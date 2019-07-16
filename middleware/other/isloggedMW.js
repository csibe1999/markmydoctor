const requireOption = require('../requireOption');
module.exports = function (objectrepository) {

    const Usermodel = requireOption(objectrepository, 'Usermodel');

    return function (req, res, next) {
        if (!req.session.email) {
            res.locals.logged = false;
            res.locals.user = "";
            return next();
        } else {
            res.locals.logged = true;
            res.locals.user = req.session.email.split('@')[0];
             return next();
            
        };
    };
};