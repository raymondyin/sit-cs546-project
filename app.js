// main code for setup and initialization for the application 
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const configRoutes = require("./routes");
const exphbs = require("express-handlebars");
const session = require('express-session');
const cookieParser = require("cookie-parser");
const flash = require("connect-flash");
const passport = require('passport');
const static = express.static(__dirname + "/public");
app.use(cookieParser());
app.use(session({
  secret: 'secret',
  resave: true,
  saveUninitialized: true,
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(passport.authenticate('remember-me'));
var log = async (req, res, next) => {
  let currentTime = new Date().toUTCString();
  let method = req.method;
  let route = req.originalUrl;
  let something = "";
  if (req.session.passport) {
      something = "(Authenticated User)";
  } else {
      something = "(Non-Authenticated User)";
  }
  console.log("[" +currentTime + "]: " + method + " " + route + " " + something);
  next();
};

app.use(flash());
app.use(function (req, res, next) {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  next();
});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/", static);
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");
configRoutes(app);
app.listen(3000, () => {
  console.log("We've now got a server!");
  console.log("Your routes will be running on http://localhost:3000");
});
