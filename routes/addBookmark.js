const express = require("express");
const router = express.Router();
const data = require("../data");
const xss = require("xss");

const addBookmark = data.bookmark;

router.post("/", async (req, res) => {
    const genre = xss(req.body.genre);
    const description = xss(req.body.description);
    const url = xss(req.body.bookUrl);
    const userId = req.session.passport.user;
    const insertBookmark = await addBookmark.addBookmark(genre, description, url, userId);
    req.flash('success_msg', 'Bookmark added!');
    res.end('{"success" : "Updated Successfully", "status" : 200}');
});



module.exports = router;