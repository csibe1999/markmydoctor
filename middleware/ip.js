const requireOption = require("./requireOption");

module.exports = function(objectrepository) {
  const Ipmodell = requireOption(objectrepository, "Ipmodell");

  return function(req, res, next) {
    Ipmodell.find({}).sort({ time : 'desc'}).exec((err, ip)=>{

      res.locals.ip = ip;
      //console.log(ip);
      return next();
    });
  };
};
