const express = require("express");
const app = express();
const session = require('express-session')

app.set("view engine", "ejs");
app.use(express.static("static"));

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
var cookieSession = require('cookie-session')
app.use(cookieSession({
  name: 'session',
  keys: ['key1', 'key2'],
  maxAge: 1000*60*60
}));

require("./routes/index")(app);

app.use((err, req, res, next) => {
  res.end("Problem...");
  console.log(err);
});

app.listen(3000, function() {
  console.log("Hello :3000");
});
