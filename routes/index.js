const renderMW = require('../middleware/renderMW');
const authMW = require('../middleware/authMW');
const isloggedMW = require('../middleware/isloggedMW');
const redirectMW = require('../middleware/redirectMW');
const setdefaultMW = require('../middleware/setdefaultMW');
const URLvalidationMW = require('../middleware/URLvalidationMW');

const registeruserMW = require('../middleware/user/registeruserMW');
const loginuserMW = require('../middleware/user/loginuserMW');
const verifyemailMW = require('../middleware/user/verifyemailMW');
const forgotMW = require('../middleware/user/forgotMW');
const logoutMW = require('../middleware/user/logoutMW');
const passwordchangeMW = require('../middleware/user/passwordchangeMW');


const savedoctorMW = require('../middleware/doctor/savedoctorMW');
const getdoctorsMW = require('../middleware/doctor/getdoctorsMW');
const getdoctorMW = require('../middleware/doctor/getdoctorMW');
const save_comment_rateMW = require('../middleware/doctor/save-comment-rateMW');
const searchdoctorMW = require('../middleware/doctor/searchdoctorMW');

const Usermodel = require('../models/user');
const Doctormodell = require('../models/doctor');

module.exports = function (app) {
    const objRepo = {
        Usermodel:Usermodel,
        Doctormodell:Doctormodell
    };

    
    app.get('/doctor/:id',
        setdefaultMW(),
        isloggedMW(objRepo),
        getdoctorMW(objRepo),
        renderMW(objRepo, 'doctor'));
    app.post('/doctor/:id',
        authMW(objRepo),
        isloggedMW(objRepo),
        getdoctorMW(objRepo),
        redirectMW(objRepo),
        save_comment_rateMW(objRepo),
        renderMW(objRepo, 'doctor'));
    
    app.get('/new',
        setdefaultMW(),
        isloggedMW(objRepo),
        authMW(objRepo),
        renderMW(objRepo,'new'));
    app.post('/new',
        redirectMW(objRepo), 
        isloggedMW(objRepo),
        savedoctorMW(objRepo),
        renderMW(objRepo,'new'));

    app.get('/mail',
        isloggedMW(objRepo),
        renderMW(objRepo, 'mail'));

    app.get('/logout',
        logoutMW(objRepo));

    app.get('/login',
        setdefaultMW(),
        renderMW(objRepo, 'login'));
        
    app.post('/login',
        loginuserMW(objRepo),
        renderMW(objRepo, 'login'));

    app.get('/password/:email/:token',
        isloggedMW(objRepo),
        setdefaultMW(),
        renderMW(objRepo, 'password'));

    app.post('/password/:email/:token',
        isloggedMW(objRepo),
        setdefaultMW(),
        passwordchangeMW(objRepo),
        renderMW(objRepo, 'password'));

    app.get('/:email/:token',
        verifyemailMW(objRepo));

    app.get('/register',
        setdefaultMW(),
        renderMW(objRepo, 'register'));
    app.post('/register',
        registeruserMW(objRepo),
        renderMW(objRepo, 'register'));

    app.get('/forgot',
        setdefaultMW(),
        renderMW(objRepo, 'forgot'));
    app.post('/forgot',
        forgotMW(objRepo),
        renderMW(objRepo, 'forgot'));
    
    app.get('/:search',
        searchdoctorMW(objRepo),
        isloggedMW(objRepo),
        renderMW(objRepo, 'home'));
    
    app.post('/:search',
        redirectMW(objRepo));

    app.get('/',
        
        isloggedMW(objRepo),
        getdoctorsMW(objRepo),
        renderMW(objRepo, 'home'));

    app.post('/',
        redirectMW(objRepo));

    app.get('/*',
        isloggedMW(objRepo),
        getdoctorsMW(objRepo),
        renderMW(objRepo, 'home'));
    
};