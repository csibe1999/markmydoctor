var Schema = require('mongoose').Schema;
var db = require('../config/db');

const Ip= db.model('Ip',{
    ip: String,
    date: String,
    time: String,
    count:Number
});
module.exports=Ip;