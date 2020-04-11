const requireOption = require('../requireOption');

const bcrypt = require('bcryptjs');
const saltRounds = 10;

module.exports = function (objectrepository) {

    const Usermodel = requireOption(objectrepository, 'Usermodel');

    return function (req, res, next) {

        if (!req.body.password || !req.body.repassword) {
            req.flash('error', 'Kérem adjon meg minden adatot!')
            res.locals.message = req.flash();
            return next();
        }
        Usermodel.findOne({email: req.params.email}, function (err, user) {
            let date = new Date()
            if ((date.getTime() - user.date) < 300000 && req.params.token === user.password)
            {
                if (req.body.password === req.body.repassword) {
                    bcrypt.hash(req.body.password, saltRounds, function (err, hash) {
                        user.password = hash;
                        user.save();
                        req.flash('success', 'Sikeres jelszó váltás')
                        res.locals.message = req.flash();
                        return next();
                    });
                }
            } else {
                req.flash('error', 'Lejárt az idő!')
                res.locals.message = req.flash();
                return next();
            }
        });
    };
}