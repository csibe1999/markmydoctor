const requireOption = require("../requireOption");

module.exports = function(objectrepository) {
  const Doctormodell = requireOption(objectrepository, "Doctormodell");

  return function(req, res, next) {
    Doctormodell.find({}, (err, doctor) => {
      if (err || !doctor) {
        return next(err);
      }
      let sum = 0;
      for (let i = 0; i < doctor.length; i++) {
        for (let j = 0; j < doctor[i].rate.length; j++) {
          sum += parseInt(doctor[i].rate[j]);
        }
        sum /= Math.round(doctor[i].rate.length);
      }
      doctor.sumrate = sum;
      res.locals.doctor = doctor;
      return next();
    });
  };
};
