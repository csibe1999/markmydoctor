//const Doctormodell = require('./models/doctor');
/* const Ipmodell = require('./models/ip');
Ipmodell.remove({},(err,doc)=>{}); */
var fs = require('fs');
var http = require('http');
var https = require('https');
var privateKey  = fs.readFileSync('.key/private.key', 'utf8');
var certificate = fs.readFileSync('.key/certificate.crt', 'utf8');
var car = fs.readFileSync('.key/ca_bundle.crt', 'utf8');

const express = require("express");
const app = express();

const cookieSession = require('cookie-session')
var cookieParser = require('cookie-parser')
const bodyParser = require('body-parser');
var flash = require('connect-flash');

var credentials = {ca:car, key: privateKey, cert: certificate};

var httpServer = http.createServer(app);
var httpsServer = https.createServer(credentials, app);

app.set("view engine", "ejs");
app.use(express.static("static"));


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cookieSession({
  name: 'session',
  keys: ['key1', 'key2'],
  maxAge: 1000*60*60
}));

app.use(cookieParser());

app.use(flash());

require("./routes/index")(app);

app.use((err, req, res, next) => {
  res.end(err);
  console.log(err);
});

// For https
httpsServer.listen(443,()=>{
  console.log("443 is run");
});
httpServer.listen(80,()=>{
  console.log("80 is run");
});

/* app.listen(3000, function() {
  console.log("Hello :3000");
});
 */