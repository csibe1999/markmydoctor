const requireOption = require("../requireOption");

module.exports = function(objectrepository) {
  const Doctormodell = requireOption(objectrepository, "Doctormodell");

  return function(req, res, next) {
    Doctormodell.findOne({ _id: req.params.id }, function(err, doctor) {
      if (err) {
        return res.redirect("/");
      }
      let sum = 0;
      for (let i = 0; i < doctor.rate.length; i++) {
        sum += parseInt(doctor.rate[i]);
      }
      let a = sum / doctor.rate.length.toString();
      doctor.sumrate = Math.round(a * 100) / 100;
      res.locals.doctor = doctor;
      res.locals.doctor.save();
      return next();
    });
  };
};
