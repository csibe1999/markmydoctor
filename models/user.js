var Schema = require('mongoose').Schema;
var db = require('../config/db');

const User= db.model('User',{
    email: String,
    password: String,
    username: String,
    level: Number,
    verify: String
});
module.exports=User;