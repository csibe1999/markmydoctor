const requireOption = require('./requireOption');
module.exports = function (objectrepository) {

    const Usermodel = requireOption(objectrepository, 'Usermodel');

    return function (req, res, next) {
        console.log(req.session.email);
        if (!req.session.email) {
            res.redirect('/login');
            console.log("lépj be")
        } else {
            Usermodel.findOne({email: req.session.email}, function (err, user) {
                console.log(user);
                if (user.level === 1000) {
                    res.redirect('/mail');
                }
                else return next();
                
            });
        };

    };
};