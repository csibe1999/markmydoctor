const renderMW = require('../middleware/renderMW');
const authMW = require('../middleware/authMW');
const isloggedMW = require('../middleware/isloggedMW');

const registeruserMW = require('../middleware/user/registeruserMW');
const loginuserMW = require('../middleware/user/loginuserMW');
const verifyemailMW = require('../middleware/user/verifyemailMW');
const forgotMW = require('../middleware/user/forgotMW');
const logoutMW = require('../middleware/user/logoutMW');


const savedoctorMW = require('../middleware/doctor/savedoctorMW');
const getdoctorsMW = require('../middleware/doctor/getdoctorsMW');
const getdoctorMW = require('../middleware/doctor/getdoctorMW');
const save_comment_rateMW = require('../middleware/doctor/save-comment-rateMW');

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
        authMW(objRepo),
        save_comment_rateMW(objRepo),
        renderMW(objRepo, 'doctor'));
    
    app.get('/new',
        authMW(objRepo),
        renderMW(objRepo,'new'));
    app.post('/new',
        savedoctorMW(objRepo));

    app.get('/mail',
        renderMW(objRepo, 'mail'));

    app.get('/logout',
        logoutMW(objRepo));

    app.get('/login',
        renderMW(objRepo, 'login'));
    app.post('/login',
        loginuserMW(objRepo));
        
    app.get('/:email/:token',
        verifyemailMW(objRepo));

    app.get('/register',
        renderMW(objRepo, 'register'));
    app.post('/register',
        registeruserMW(objRepo),
        renderMW(objRepo, 'register'));

    app.get('/forgot',
        renderMW(objRepo, 'forgot'));
    app.post('/forgot',
        forgotMW(objRepo));

    app.get('/',
        isloggedMW(objRepo),
        getdoctorsMW(objRepo),
        renderMW(objRepo, 'home'));

    app.get('/*',
        isloggedMW(objRepo),
        getdoctorsMW(objRepo),
        renderMW(objRepo, 'home'));
    
};