const requireOption = require('../requireOption');

const bcrypt = require('bcrypt');
const saltRounds = 10;
const myPlaintextPassword = 's0/\/\P4$$w0rD';
const someOtherPlaintextPassword = 'not_bacon';

const nodemailer = require('nodemailer');
const TokenGenerator = require('uuid-token-generator');

module.exports = function (objectrepository) {

    const Usermodel = requireOption(objectrepository, 'Usermodel');

    return function (req, res, next) {

        if (!req.body.email || !req.body.password || !req.body.repassword) {
            console.log("addj meg mindent");
            return res.redirect('/register');
        }
        if (req.body.password === req.body.repassword) {
            Usermodel.findOne({
                email: req.body.email
            }, (err, user) => {
                if (user) {
                    console.log("van ilyen user");
                    return res.redirect('/register');
                } else {
                    req.session.email = req.body.email;
                    console.log('reg');
                    res.locals.user = new Usermodel();
                    res.locals.user.email = req.body.email;
                    res.locals.user.level = 1000;
                    res.locals.user.username = "user-1"

                    const tokgen = new TokenGenerator(256, TokenGenerator.BASE62);
                    const token = tokgen.generate();
                    res.locals.user.verify = token;

                    var transporter = nodemailer.createTransport({
                        service: 'gmail',
                        auth: {
                            user: 'noreplymarkmy@gmail.com',
                            pass: 'destreater'
                        }
                    });
                    var mailOptions = {
                        from: 'MarkMyDoctor <noreplymarkmy@gmail.com>',
                        to: req.body.email,
                        subject: 'Email cím megerősítés',
                        text: 'http://csibe.us.to:3000/'+req.body.email+'/'+token,
                    };
                    transporter.sendMail(mailOptions, function (error, info) {
                        if (error) {
                            console.log(error);
                        } else {
                            console.log('Email sent: ' + info.response);
                        }
                    });


                    bcrypt.hash(req.body.password, saltRounds, function (err, hash) {
                        res.locals.user.password = hash;
                        res.locals.user.save();
                        return res.redirect('/');
                    });


                }
            });
        } else return res.redirect('/register');
    };
};