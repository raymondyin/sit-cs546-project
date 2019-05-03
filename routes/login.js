const express = require("express");
const router = express.Router();
const data = require("../data");
const passport = require("passport")
const LocalStrategy = require('passport-local').Strategy;
const RememberMeStrategy = require('passport-remember-me').Strategy;
const user = data.userData;

router.get("/", async (req, res) => {
    if (req.session.passport) {
        res.redirect('/dashboard');
    } else {
        res.render("static/login");
    }
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

passport.use(new RememberMeStrategy(
    function(token, done) {
      Token.consume(token, function (err, user) {
        if (err) { return done(err); }
        if (!user) { return done(null, false); }
        return done(null, user);
      });
    },
    function(user, done) {
      var token = utils.generateToken(64);
      Token.save(token, { userId: user._id }, function(err) {
        if (err) { return done(err); }
        return done(null, token);
      });
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
    passport.authenticate('local', {failureRedirect: '/login', failureFlash: true }),
    async function (req, res, next) {
       if (!req.body.remember_me) {return next()};
       var token = utils.generateToken(64);
       Token.save(token, { userId: req.user._id }, async function(err) {
         if (err) { return done(err); }
         res.cookie('remember_me', token, { path: '/', httpOnly: true, maxAge: 604800000 }); // 7 days
         return next();
       });
     },
     async function(req, res) {
       res.redirect('/dashboard');
});


module.exports = router; 