const requireOption = require("../requireOption");

module.exports = function (objectrepository) {
    const Ipmodell = requireOption(objectrepository, "Ipmodell");

    return function (req, res, next) {
        let a = new Date();
        let b = parseInt(a.getHours()) + 1;
        let ip = req.connection.remoteAddress.split(':')[3];
        let date = a.getFullYear() + "-" + a.getMonth() + "-" + a.getDate() + " " + b + ":" + a.getMinutes() + ":" + a.getSeconds()
        let cookie = req.headers.cookie;

        Ipmodell.findOne({
            /* $or: [{ */
                ip: ip
            /* }, {
                cookie: cookie
            }] */
        }, (err, user) => {
            if (err) {
                return next();
            }
            if (user && Date.now() - user.date > 10000) {
                user.ip = ip;       
                user.date = Date.now();
                user.time = date;
                user.count++;
                user.save();
            }
            if (!user) {
                res.locals.view = new Ipmodell();
                res.locals.view.ip = ip;
                res.locals.view.date = Date.now();
                res.locals.view.time = date;
                res.locals.view.count = 1;
                res.locals.view.save();
            }
        });
        return next();
    };
};
