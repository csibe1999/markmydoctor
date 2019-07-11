const requireOption = require('../requireOption');

const bcrypt = require('bcrypt');
const saltRounds = 10;

const mailMW = require('../mailMW');

const TokenGenerator = require('uuid-token-generator');
const nodemailer = require('nodemailer');

module.exports = function (objectrepository) {

    const Usermodel = requireOption(objectrepository, 'Usermodel');

    return function (req, res, next) {
        Usermodel.findOne({ email:req.body.email }, function(err, user) {
            if (!user||err) {
                req.flash('error','Email cím nem található!')
                res.locals.message = req.flash();
                return next();
            }
            const tokgen = new TokenGenerator(256, TokenGenerator.BASE62);
            const token = tokgen.generate();
            bcrypt.hash(token, saltRounds, function (err, hash) {
                user.password = token;
                let date = new Date();
                user.date= date.getTime();
                user.save();
                
                mailMW.mailfor(req.body.email,token)
                
                req.flash('success','Email elküldve <br> Kérem nézze meg a postafiókját');
                res.locals.message = req.flash();
                return next();
            });
          });
    };
};