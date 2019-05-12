const express = require("express");
const router = express.Router();
const data = require("../data");
const xss = require("xss");
const passport = require("passport");

const addfavorite = data.userData;

router.post('/', async (req, res) => {
    const genre = xss(req.body.genre);
    const description = xss(req.body.description);
    const url = xss(req.body.url);
    console.log(genre);
    res.end('{"success" : "Updated Successfully", "status" : 200, "redirect": "/dashboard"}');
});

module.exports = router;