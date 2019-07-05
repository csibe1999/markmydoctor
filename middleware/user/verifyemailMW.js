const requireOption = require('../requireOption');

module.exports = function (objectrepository) {

    const Usermodel = requireOption(objectrepository, 'Usermodel');

    return function (req, res, next) {
        Usermodel.findOne({ email: req.params.email }, function(err, user) {
            if (err||!user) {
              return res.redirect("/");
            }
            if(user.verify===req.params.token)
            {
                user.level = 900;
                user.save();
                return res.redirect('/');
            }
            return next();
          });
        
    };
};