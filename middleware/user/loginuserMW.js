const requireOption = require('../requireOption');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const myPlaintextPassword = 's0/\/\P4$$w0rD';
const someOtherPlaintextPassword = 'not_bacon';


module.exports = function (objectrepository) {

    const Usermodel = requireOption(objectrepository, 'Usermodel');

    return function (req, res, next) {
        if (!req.body.email||!req.body.password) {
            req.flash('error','Hibás adat')
            res.locals.message = req.flash();
            return next();
        }
        Usermodel.findOne({email: req.body.email}, (err, user) => {
            if(!user){
                return res.redirect('/register');
            }
            if (bcrypt.compareSync(req.body.password, user.password)) {
                req.session.email = req.body.email;
                return res.redirect('/');
            }
            else
            {
                req.flash('error','Hibás adat')
                res.locals.message = req.flash();
                return next();
            }
        });
    };
};