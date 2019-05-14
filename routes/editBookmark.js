const express = require("express");
const router = express.Router();
const data = require("../data");
const xss = require("xss");
const passport = require("passport");

const editBookmark = data.bookmark;

router.post("/", async (req, res) => {
    const genre = xss(req.body.genre);
    const description = xss(req.body.description);
    const url = xss(req.body.bookUrl);
    const userId = req.session.passport.user;

    try {
        const result = await editBookmark.edit(genre, description, url);
        res.status(200).send({"success": "yes"});
    }
    catch(e) {
        res.status(500).send({"failed": "Something went wrong, update failed"});
    }

});



module.exports = router; 