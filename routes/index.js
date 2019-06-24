const renderMW = require('../middleware/renderMW');
const registeruserMW = require('../middleware/user/registeruserMW.js');
const loginuserMW = require('../middleware/user/loginuserMW.js');


const savedoctorMW = require('../middleware/doctor/savedoctorMW.js');
const getdoctorsMW = require('../middleware/doctor/getdoctorsMW.js');
const getdoctorMW = require('../middleware/doctor/getdoctorMW.js');
const save_comment_rateMW = require('../middleware/doctor/save-comment-rateMW.js');

const Usermodel = require('../models/user');
const Doctormodell = require('../models/doctor');

module.exports = function (app) {
    const objRepo = {
        Usermodel:Usermodel,
        Doctormodell:Doctormodell
    };

    
    app.get('/doctor/:id',
        getdoctorMW(objRepo),
        renderMW(objRepo, 'doctor'));
    app.post('/doctor/:id',
        save_comment_rateMW(objRepo),
        renderMW(objRepo, 'doctor'));
    
    app.get('/new',
        renderMW(objRepo,'new'));
    app.post('/new',
        savedoctorMW(objRepo));

    
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
        getdoctorsMW(objRepo),
        renderMW(objRepo, 'home'));

    app.get('/*',
        getdoctorsMW(objRepo),
        renderMW(objRepo, 'home'));
    
};