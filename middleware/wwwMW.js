module.exports = function () {
    return function (req, res, next) {
        if (!req.secure && req.get('x-forwarded-proto') !== 'https' && process.env.NODE_ENV !== "development") {
            return res.redirect('https://' + req.get('host') + req.url);
        }
       /*  if (req.headers.host.match(/^www/) === null) {
            res.redirect('https://www.' + req.headers.host + req.url);
        } else {
            next();
        } */
        next();
    };
};
