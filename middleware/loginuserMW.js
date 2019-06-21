const requireOption = require('./requireOption');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const myPlaintextPassword = 's0/\/\P4$$w0rD';
const someOtherPlaintextPassword = 'not_bacon';


module.exports = function (objectrepository) {

    const Usermodel = requireOption(objectrepository, 'Usermodel');

    return function (req, res, next) {
        if (!req.body.email||!req.body.password) {
            console.log("addj meg mindent");
            return res.redirect('/login');
        }
        Usermodel.findOne({email: req.body.email}, (err, user) => {
            if(!user){
                console.log("nincs ilyen user");
                return res.redirect('/login');
            }
            if (bcrypt.compareSync(req.body.password, user.password)) {
                /* req.session.email=req.body.email; */
                console.log("bent");
                return res.redirect('/');
            }
            else
            {
                console.log("rossz jelszó");
                return res.redirect('/login');
            }
            return next();
        });
    };
};