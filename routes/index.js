const path = require("path");
const register = require("./Register");
const bodyParser = require('body-parser');

const constructorMethod = app => {

    app.get("/", (req, res) => {
      res.sendFile(path.resolve("static/login.html"));
    });
    app.use("/register", register);
    app.use(bodyParser.json());
    app.get("/register.html", (req, res) => {
        res.sendFile(path.resolve("static/register.html"));
    });
  
    app.use("*", (req, res) => {
      res.sendFile(path.resolve("static/login.html"));
    });
  };

module.exports = constructorMethod;