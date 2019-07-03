var Schema = require('mongoose').Schema;
var db = require('../config/db');

const Doctor= db.model('Doctor',{
    name: String,
    spec: String,
    wait: String,
    rate: [],
    sumrate: String,
    cont: String,
    city: String,
    comment :[]
});
module.exports=Doctor;