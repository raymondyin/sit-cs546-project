const express = require("express");
const router = express.Router();
const data = require("../data");;
const passport = require("passport");

const userInfo = data.userData;

var sessionChecker = async (req, res, next) => {
    if (req.session.passport) {
        next();
    } else {
        res.redirect('/login');
    }    
};

router.get('/', sessionChecker, async (req, res) => {
    const userOBJ = req.session.passport;
    const userID = userOBJ.user;
    const userPersonalInfo = await userInfo.getUserById(userID);
    const userFN = userPersonalInfo.profile.firstName;
    res.render('static/dashboard', {title: "User Dashboard", userName: userFN});
});

module.exports = router;