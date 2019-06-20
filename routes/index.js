const renderMW = require('../middleware/renderMW');
const registeruserMW = require('../middleware/user/registeruserMW.js');
const loginuserMW = require('../middleware/user/loginuserMW.js');

const Usermodel = require('../models/user');

module.exports = function (app) {
    const objRepo = {
        Usermodel:Usermodel
    };

    
    app.get('/doctor',
        renderMW(objRepo, 'doctor'));

    
    app.get('/login',
        renderMW(objRepo, 'login'));
    app.post('/login',
        loginuserMW(objRepo));


    app.get('/register',
        renderMW(objRepo, 'register'));
    app.post('/register',
        registeruserMW(objRepo));




    app.get('/forgot',
        renderMW(objRepo, 'forgot'));


    




    app.get('/',
        renderMW(objRepo, 'home'));
    
};