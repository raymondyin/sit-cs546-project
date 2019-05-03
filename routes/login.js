const express = require("express");
const router = express.Router();
const data = require("../data");
const passport = require("passport")
const LocalStrategy = require('passport-local').Strategy;

const user = data.userData;

router.get("/", async (req, res) => {
    res.render("static/login");
});

passport.use(new LocalStrategy(
    function (email, password, done) {
        user.findUserByEmail(email, function (err, result) {
            if (err) throw err;
            if (!result)
                return done(null, false, { message: 'unknown user' });
            user.comparePassword(password, result.hashedPassword, function (err, isMatch) {
                if (err) throw err;
                if (isMatch) {
                    return done(null, result);
                } else {
                    return done(null, false, { message: 'invalid password' });
                }
            });
        });
    }
));

passport.serializeUser(function (user, done) {
    done(null, user.id);
});

passport.deserializeUser(function (id, done) {
    user.getUserById(id, function (err, user) {
        done(err, user);
    });
});


router.post('/',
    passport.authenticate('local', { successRedirect: '/', failureRedirect: '/login', failureFlash: true }),
    function (req, res) {
        res.redirect('/');
});


module.exports = router; 