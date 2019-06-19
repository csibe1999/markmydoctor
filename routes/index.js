const renderMW = require('../middleware/renderMW');


module.exports = function (app) {
    const objRepo = {};

    app.get('/',
        renderMW(objRepo, 'home'));
    app.get('/doctor',
        renderMW(objRepo, 'doctor'));

    
};