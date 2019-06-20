const requireOption = require('../requireOption');

module.exports = function (objectrepository) {

    const Usermodel = requireOption(objectrepository, 'Usermodel');

    return function (req, res, next) {
        if (!req.body.email||!req.body.password) {
            console.log("addj meg mindent");
            return next();
        }
        Usermodel.findOne({email: req.body.email}, (err, user) => {
            if(!user){
                console.log("nincs ilyen user");
                return res.redirect('/login');
            }
            if (user.password === req.body.password) {
                /* req.session.email=req.body.email; */
                //res.locals.user=user;
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