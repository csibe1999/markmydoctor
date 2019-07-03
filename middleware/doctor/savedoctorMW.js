const requireOption = require("../requireOption");

module.exports = function(objectrepository) {
  const Doctormodell = requireOption(objectrepository, "Doctormodell");

  return function(req, res, next) {
    if (
      !req.body.name ||
      !req.body.spec ||
      !req.body.city
    ) {
      return res.redirect("/new");
    }
    res.locals.doctor = new Doctormodell();
    res.locals.doctor.name = req.body.name;
    res.locals.doctor.spec = req.body.spec.charAt(0).toUpperCase() + req.body.spec.slice(1);
    res.locals.doctor.city = req.body.city.charAt(0).toUpperCase() + req.body.city.slice(1);
    res.locals.doctor.wait = req.body.wait;
    res.locals.doctor.cont = req.body.cont;
    if(req.body.rate!=="0")
    {
      res.locals.doctor.rate = req.body.rate;
      res.locals.doctor.sumrate = req.body.rate;
      res.locals.doctor.comment = req.body.comment;
    }
    
    
    
    res.locals.doctor.save();
    return res.redirect("/");
  };
};
