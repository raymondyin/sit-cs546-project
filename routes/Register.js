const express = require("express");
const router = express.Router();
const data = require("../data");
const registerData = data.register;
const path = require("path");
const xss = require("xss");

// var popupS = require('popups');
router.get('/', async (req, res) => {
    res.render('static/register');
});

router.post("/", async (req, res) => {
    try {
        const fname = xss(req.body.fname);
        const lname = xss(req.body.lname);
        const age = xss(req.body.age);
        const gender = xss(req.body.gender);
        const country = xss(req.body.country);
        const city = xss(req.body.city);
        const state = xss(req.body.state);
        const email = xss(req.body.email);
        const phoneNumber = xss(req.body.phoneNumber);
        const password = xss(req.body.pw1);
        const createAccount = await registerData.create(fname, lname, age, gender, city, state, country, email, phoneNumber, password);
        req.flash('success_msg', 'You are now registered and can now login');
        res.redirect('/login');
    } catch(e) {
        console.log(e);
        res.status(500).send();
    }
        
});

module.exports = router;
