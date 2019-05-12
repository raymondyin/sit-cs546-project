const path = require("path");
const register = require("./Register");
const bodyParser = require('body-parser');
const login = require("./login");
const dashboard = require("./dashboard");
const addBookmark = require("./addBookmark");
const addfavorite = require("./addfavorite");

const constructorMethod = app => {

    app.get("/", (req, res) => {
      res.redirect("/login");
    });
    app.use("/register", register);
    app.use(bodyParser.json());
   
    app.use("/login", login);
    app.use('/dashboard', dashboard);
    app.use("/addBookmark", addBookmark);
    app.use("/addfavorite", addfavorite);
    


app.get('/logout', (req, res) => {
  req.session.destroy();
  res.redirect("/");
});
    app.use("*", (req, res) => {
      res.redirect('/');
    });
  };

module.exports = constructorMethod;