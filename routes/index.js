const path = require("path");
const register = require("./Register");
const bodyParser = require('body-parser');
const login = require("./login");

const constructorMethod = app => {

    app.get("/", (req, res) => {
      res.redirect("/login");
    });
    app.use("/register", register);
    app.use(bodyParser.json());
   
    app.use("/login", login);
    
app.get('/dashboard',  (req, res) => {
  res.render('static/dashboard');
});
    app.use("*", (req, res) => {
      res.status(404).send("error");
    });
  };

module.exports = constructorMethod;