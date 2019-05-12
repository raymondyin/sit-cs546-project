const express = require("express");
const router = express.Router();
const data = require("../data");
const xss = require("xss");
const passport = require("passport");

const bookmark = data.bookmark;

router.delete("/", async (req, res) => {
    const url = xss(req.body.bookUrl);
    const id = xss(req.body._id);
    const userId = req.session.passport.user;
    if (await bookmark.checkBookmark(url) === false) { // Bookmark exists
        const insertBookmark = await bookmark.deleteBookmarkByID(id);
        req.flash('success_msg', 'Bookmark deleted!');
        res.end('{"success" : "Deleted Successfully", "status" : 200, "redirect": "/dashboard"}');
    } else {
        req.flash('error_msg', 'Bookmark doesn\'t exist!');
        res.end('{"failed" : "Deletion failed", "status" : 500, "redirect": "/dashboard"}');
    }
});



module.exports = router;