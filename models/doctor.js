var Schema = require('mongoose').Schema;
var db = require('../config/db');

const Doctor= db.model('Doctor',{
    _link: String,
    name: String,
    spec: String,
    wait: String,
    sumrate: String,
    cont: String,
    city: String,
    rate: [],
    comment: []
});
module.exports=Doctor;