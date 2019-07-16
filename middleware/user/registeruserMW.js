const requireOption = require('../requireOption');

const bcrypt = require('bcrypt');
const saltRounds = 10;

const mailMW = require('../other/mailMW');
const TokenGenerator = require('uuid-token-generator');

module.exports = function (objectrepository) {

    const Usermodel = requireOption(objectrepository, 'Usermodel');

    return function (req, res, next) {

        if (!req.body.email || !req.body.password || !req.body.repassword) {
            req.flash('error','Kérem adjon meg minden adatot!')
            res.locals.message = req.flash();
            return next();
        }
        if (req.body.password === req.body.repassword) {
            Usermodel.findOne({email: req.body.email}, (err, user) => {
                if (user) {
                    req.flash('error','Az email már foglalt!')
                    res.locals.message = req.flash();
                    return next();
                } else {
                    req.session.email = req.body.email;
                    res.locals.user = new Usermodel();
                    res.locals.user.email = req.body.email;
                    res.locals.user.level = 1000;
                    res.locals.user.username = "user-1"

                    const tokgen = new TokenGenerator(256, TokenGenerator.BASE62);
                    const token = tokgen.generate();
                    res.locals.user.verify = token;

                    mailMW.mailreg(req.body.email,token);

                    bcrypt.hash(req.body.password, saltRounds, function (err, hash) {
                        res.locals.user.password = hash;
                        res.locals.user.save();
                        return res.redirect('/');
                    });

                }
            });
        } else {
            req.flash('error','Nem egyezik a jelszó!')
            res.locals.message = req.flash();
            return next();
        }
    };
};