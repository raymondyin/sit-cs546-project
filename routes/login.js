const express = require("express");
const router = express.Router();
const data = require("../data");
const passport = require("passport")
const LocalStrategy = require('passport-local').Strategy;

const user = data.userData;

router.get("/", async (req, res) => {
    res.render("static/login");
});

passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
    } ,  
    async function (email, password, done) {
        const result = await user.findUserByEmail(email);
        if (result === null) {
            return done(null, false, { message: 'unknown user' });
        } else {
            const isMatch = await user.comparePassword(password, result.hashedPassword);
            if (isMatch) {
                return done(null, result);
            } else {
                return done(null, false, { message: 'invalid password' });
            }
        }
    }
));

passport.serializeUser(async function (user, done) {
    done(null, user._id);
});

passport.deserializeUser(async function (id, done) {
    const userInfo = await user.getUserById(id);
    done(null, userInfo);
});


router.post('/',
    passport.authenticate('local', { successRedirect: '/dashboard', failureRedirect: '/login', failureFlash: true }),
    async function (req, res) {
        res.redirect('/dashboard');
});


module.exports = router; 