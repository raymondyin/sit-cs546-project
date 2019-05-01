const express = require("express");
const router = express.Router();
const data = require("../data");
const registerData = data.register;
const path = require("path");
const xss = require("xss");

// var popupS = require('popups');

router.post("/", async (req, res) => {
    let userData = xss(req.body);
    try {
        const fname = userData.fname;
        const lname = userData.lname;
        const age = userData.age;
        const gender = userData.gender;
        const city = userData.city;
        const state = userData.state;
        const email = userData.email;
        const phoneNumber = userData.phontNumber;
        const password = userData.pw1;
        const createAccount = await registerData.create(fname, lname, age, gender, city, state, email, phoneNumber, password);
        res.sendFile(path.resolve("static/login.html"));
    } catch(e) {
        console.log(e);
        res.status(500).send();
    }
        
});

module.exports = router;
