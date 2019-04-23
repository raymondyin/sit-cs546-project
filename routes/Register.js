const express = require("express");
const router = express.Router();

// var popupS = require('popups');


router.post("/", async (req, res) => {
    let userData = req.body;
    console.log(userData.fname);
        
});

module.exports = router;
