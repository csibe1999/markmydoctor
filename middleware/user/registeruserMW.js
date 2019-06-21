const requireOption = require('../requireOption');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const myPlaintextPassword = 's0/\/\P4$$w0rD';
const someOtherPlaintextPassword = 'not_bacon';

module.exports = function (objectrepository) {

    const Usermodel = requireOption(objectrepository, 'Usermodel');

    return function (req, res, next) {
        
        if (!req.body.email||!req.body.password||!req.body.repassword) {
            console.log("addj meg mindent");
            return res.redirect('/register');
        }
        if(req.body.password===req.body.repassword)
        {
            Usermodel.findOne({email: req.body.email}, (err, user) => {
                if (user) {
                    console.log("van ilyen user");
                    return res.redirect('/register'); //////////////////////////////////////////////////////////////
                } else {
                    /* req.session.email = req.body.email;
                    req.session.password = req.body.regpass; */
                    console.log('reg');
                    res.locals.user = new Usermodel();
                    res.locals.user.email = req.body.email;

                    //res.locals.user.password = req.body.password;
                    
                    res.locals.user.username = "user-1"
                    bcrypt.hash(req.body.password, saltRounds, function(err, hash) {
                        res.locals.user.password=hash;
                        res.locals.user.save();
                        return res.redirect('/');
                    });

                    
                }
            });
        }
        else return res.redirect('/register');
    };
};