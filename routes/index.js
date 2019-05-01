const path = require("path");
const register = require("./Register");
const bodyParser = require('body-parser');
const login = require("./login");
const passport = require("passport");

const constructorMethod = app => {

    app.get("/", (req, res) => {
      res.redirect("/login");
    });
    app.use("/register", register);
    app.use(bodyParser.json());
    app.get("/register.html", (req, res) => {
        res.sendFile(path.resolve("static/register.html"));
    });
    app.use("/login", login);
  
    app.use("*", (req, res) => {
      res.status(404).send("error");
    });
  };

module.exports = constructorMethod;