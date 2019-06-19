const renderMW = require('../middleware/renderMW');


module.exports = function (app) {
    const objRepo = {};

    
    app.get('/doctor',
        renderMW(objRepo, 'doctor'));


    app.get('/login',
        renderMW(objRepo, 'login'));


    app.get('/forgot',
        renderMW(objRepo, 'forgot'));


    app.get('/register',
        renderMW(objRepo, 'register'));




    app.get('/',
        renderMW(objRepo, 'home'));
    
};