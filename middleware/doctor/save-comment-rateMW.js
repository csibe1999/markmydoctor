const requireOption = require("../requireOption");

module.exports = function (objectrepository) {
  const Doctormodell = requireOption(objectrepository, "Doctormodell");

  return function (req, res, next) {
    if (req.body.rate === "0") {
      req.flash('error', 'Kérem ne 0-ás értékelést adjon!');
      res.locals.message = req.flash();
      return next();
    } else {
      let rate = req.body.rate;
      let comment = req.body.comment;
      Doctormodell.findOne({_id: req.params.id}, function (err, doctor) {
        res.locals.doctor = doctor;
        doctor.rate.push(rate);
        doctor.comment.push(comment);
        doctor.save();
        return res.redirect("/doctor/" + req.params.id);
      });
    }
  };
};