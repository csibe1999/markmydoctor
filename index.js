const express = require("express");
const app = express();


app.set("view engine", "ejs");
app.use(express.static("static"));

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());




require("./routes/index")(app);

app.use((err, req, res, next) => {
  res.end("Problem...");
  console.log(err);
});

app.listen(3000, function() {
  console.log("Hello :3000");
});
