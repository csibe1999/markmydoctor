module.exports = function () {
    return function (req, res, next) {
		 if (!req.headers.host.includes("www")) {
             return res.redirect('https://www.' + req.get('host') + req.url);
		 }
        if (!req.secure && req.get('x-forwarded-proto') !== 'https' && process.env.NODE_ENV !== "development") {
            return res.redirect('https://' + req.get('host') + req.url);
		}  
        return next();
    };
};