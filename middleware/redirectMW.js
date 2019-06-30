const requireOption = require("./requireOption");

module.exports = function(objectrepository) {
  const Doctormodell = requireOption(objectrepository, "Doctormodell");

  return function(req, res, next) {
    if(!req.body.search)
      return next();
    else return res.redirect('/'+req.body.search); 
  };
};
