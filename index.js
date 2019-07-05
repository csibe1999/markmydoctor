const express = require("express");
const app = express();
const cookieSession = require('cookie-session')
var cookieParser = require('cookie-parser')
const bodyParser = require('body-parser');
var flash = require('connect-flash');


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
  res.end("Problem...");
  console.log(err);
});

app.listen(3000, function() {
  console.log("Hello :3000");
});
