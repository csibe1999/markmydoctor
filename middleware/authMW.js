const requireOption = require('./requireOption');
module.exports = function (objectrepository) {

    const Usermodel = requireOption(objectrepository, 'Usermodel');

    return function (req, res, next) {
        if (!req.session.email) {
            res.redirect('/login');
        } else {
            Usermodel.findOne({email: req.session.email}, function (err, user) {
                if (user.level === 1000) {
                    res.redirect('/mail');
                }
                else return next();
            });
        };

    };
};