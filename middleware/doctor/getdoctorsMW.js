const requireOption = require("../requireOption");

module.exports = function(objectrepository) {
  const Doctormodell = requireOption(objectrepository, "Doctormodell");

  return function(req, res, next) {
    console.log(req.connection.remoteAddress.split(':')[3]);
    Doctormodell.find({}, (err, doctor) => {
      if (err || !doctor) {
        return next(err);
      }
      let sum = 0;
      for (let i = 0; i < doctor.length; i++) {
        for (let j = 0; j < doctor[i].rate.length; j++) {
          sum += parseInt(doctor[i].rate[j]);
        }
        sum /= doctor[i].rate.length;
      }
      doctor.sumrate = Math.round(sum * 100) / 100 .toString();
      res.locals.doctor = doctor;
      for(let i =0;i<doctor.length;i++)doctor[i].save();
      return next();
    });
  };
};
