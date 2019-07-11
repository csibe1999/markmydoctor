const requireOption = require("../requireOption");
const URLvalidationMW = require('../URLvalidationMW');
module.exports = function (objectrepository) {
  const Doctormodell = requireOption(objectrepository, "Doctormodell");

  return function (req, res, next) {
    if (
      !req.body.name ||
      !req.body.spec ||
      !req.body.city
    ) {
      req.flash('error', 'Kérem adja meg a kötelező adatokat')
      res.locals.message = req.flash();
      return next();
    }
    res.locals.doctor = new Doctormodell();
    res.locals.doctor.name = req.body.name;
    res.locals.doctor.spec = req.body.spec.charAt(0).toUpperCase() + req.body.spec.slice(1);
    res.locals.doctor.city = req.body.city.charAt(0).toUpperCase() + req.body.city.slice(1);
    res.locals.doctor.wait = req.body.wait;
    if(URLvalidationMW.isURL(req.body.cont))
      res.locals.doctor.cont = req.body.cont;
    else{
      req.flash('error', 'Kérem érvényes linket adjon meg!')
      res.locals.message = req.flash();
      return next();
    }
    if (req.body.rate !== "0") {
      res.locals.doctor.rate = req.body.rate;
      res.locals.doctor.sumrate = req.body.rate;
      res.locals.doctor.comment = req.body.comment;
    }
    res.locals.doctor.save();
    return res.redirect("/");
  };
};