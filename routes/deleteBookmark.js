const express = require("express");
const router = express.Router();
const data = require("../data");
const xss = require("xss");
const passport = require("passport");

const bookmark = data.bookmark;

router.delete("/", async (req, res) => {
    const id = xss(req.body.id);
    const userId = req.session.passport.user;

    try{
        const insertBookmark = await bookmark.deleteBookmarkByID(id);
    } catch(e){
        req.flash('error_msg', 'Bookmark doesn\'t exist!' + e);
        res.end('{"failed" : "Deletion failed", "status" : 500, "redirect": "/dashboard", "error": '+ e.toString()+ '}');
    }
    req.flash('success_msg', 'Bookmark deleted!');
    res.end('{"success" : "Deleted Successfully", "status" : 200, "redirect": "/dashboard"}');
});



module.exports = router;