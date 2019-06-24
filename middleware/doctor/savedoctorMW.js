const requireOption = require('../requireOption');

module.exports = function (objectrepository) {

    const Doctormodell = requireOption(objectrepository, 'Doctormodell');


    return function (req, res, next) {
        console.log(req.body.rate)
        if (!req.body.name||!req.body.spec||!req.body.wait||!req.body.rate||!req.body.cont) {
            console.log("addj meg mindent");
            return res.redirect('/new');
        }
        res.locals.doctor = new Doctormodell();
        res.locals.doctor.name = req.body.name;
        res.locals.doctor.spec = req.body.spec;
        res.locals.doctor.wait = req.body.wait;
        res.locals.doctor.rate = req.body.rate;
        res.locals.doctor.sumrate = req.body.rate;

        res.locals.doctor.cont = req.body.cont;
        res.locals.doctor.comment = req.body.comment;
        res.locals.doctor.save();
        return res.redirect('/');
    };
};