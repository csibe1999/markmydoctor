const requireOption = require("../requireOption");

module.exports = function (objectrepository) {
  const Doctormodell = requireOption(objectrepository, "Doctormodell");

  return function (req, res, next) {
    let nam = req.params.search.charAt(0).toUpperCase() + req.params.search.slice(1);
    let spe = req.params.search.charAt(0).toUpperCase() + req.params.search.slice(1);
    Doctormodell.find({$or: [{name: {"$regex": nam}}, {spec: spe}]}).sort({ name : 'asc'}).exec((err, doctor)=>{
      if (err || !doctor) {
        return next(err);
      }
      res.locals.doctor = doctor;
      return next();
    });
  };
};