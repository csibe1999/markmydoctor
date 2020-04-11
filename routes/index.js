const renderMW = require('../middleware/renderMW');
const authMW = require('../middleware/authMW');
const ip = require('../middleware/ip');

const isloggedMW = require('../middleware/other/isloggedMW');
const redirectMW = require('../middleware/other/redirectMW');
const setdefaultMW = require('../middleware/other/setdefaultMW');
const wwwMW = require('../middleware/other/wwwMW');
const viewcounterMW = require('../middleware/other/viewcounterMW');


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
const Ipmodell = require('../models/ip');

module.exports = function (app) {
    const objRepo = {
        Usermodel:Usermodel,
        Doctormodell:Doctormodell,
        Ipmodell:Ipmodell
    };
    /* app.get('/ip',
        ip(objRepo),
        renderMW(objRepo, 'ip')); */
    app.get('/doctor/:link',
        wwwMW(),
        viewcounterMW(objRepo),
        setdefaultMW(),
        isloggedMW(objRepo), 
        getdoctorMW(objRepo),
        renderMW(objRepo, 'doctor'));
    app.post('/doctor/:link',
		redirectMW(objRepo),
        authMW(objRepo),
        isloggedMW(objRepo),
        getdoctorMW(objRepo),
        save_comment_rateMW(objRepo),
        renderMW(objRepo, 'doctor'));
    
    app.get('/new',
        wwwMW(),
        viewcounterMW(objRepo),
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
        wwwMW(),
        viewcounterMW(objRepo),
        isloggedMW(objRepo),
        renderMW(objRepo, 'mail'));
    app.post('/mail',
        redirectMW(objRepo), 
        isloggedMW(objRepo),
        renderMW(objRepo,'mail'));

    app.get('/law',
        wwwMW(),
        viewcounterMW(objRepo),
        isloggedMW(objRepo),
        renderMW(objRepo, 'law'));
    app.post('/law',
        redirectMW(objRepo), 
        isloggedMW(objRepo),
        renderMW(objRepo,'law'));

    app.get('/logout',
        wwwMW(),
        viewcounterMW(objRepo),
        logoutMW(objRepo));

    app.get('/login',
        wwwMW(),
        viewcounterMW(objRepo),
        setdefaultMW(),
        renderMW(objRepo, 'login'));
        
    app.post('/login',
        loginuserMW(objRepo),
        renderMW(objRepo, 'login'));

    app.get('/password/:email/:token',
        wwwMW(),
        viewcounterMW(objRepo),
        isloggedMW(objRepo),
        setdefaultMW(),
        renderMW(objRepo, 'password'));

    app.post('/password/:email/:token',
        isloggedMW(objRepo),
        setdefaultMW(),
        passwordchangeMW(objRepo),
        renderMW(objRepo, 'password'));

    app.get('/auth/:email/:token',
        wwwMW(),
        viewcounterMW(objRepo),
        verifyemailMW(objRepo));

    app.get('/register',
        wwwMW(),
        viewcounterMW(objRepo),
        setdefaultMW(),
        renderMW(objRepo, 'register'));
    app.post('/register',
        registeruserMW(objRepo),
        renderMW(objRepo, 'register'));

    app.get('/forgot',
        wwwMW(),
        viewcounterMW(objRepo),
        setdefaultMW(),
        renderMW(objRepo, 'forgot'));
    app.post('/forgot',
        forgotMW(objRepo),
        renderMW(objRepo, 'forgot'));
    
    app.get('/search/:search',
        wwwMW(),
        viewcounterMW(objRepo),
        searchdoctorMW(objRepo),
        isloggedMW(objRepo),
        renderMW(objRepo, 'home2'));
    
    app.post('/search/:search',
        redirectMW(objRepo));

    app.get('/',
<<<<<<< HEAD
=======
        getdoctorsMW(objRepo),
>>>>>>> 4a57a176937fc6ddce0227da3d9c6a8f4aebd76b
        wwwMW(),
        getdoctorsMW(objRepo),
        viewcounterMW(objRepo),
        isloggedMW(objRepo), 
        renderMW(objRepo, 'home2'));

    app.post('/',
        redirectMW(objRepo));

    /* app.get('/*',
        wwwMW(),
        viewcounterMW(objRepo),
        isloggedMW(objRepo),
        getdoctorsMW(objRepo),
        renderMW(objRepo, 'home2')); */
    
};