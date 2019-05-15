const express = require("express");
const router = express.Router();
const data = require("../data");
const xss = require("xss");
const passport = require("passport");

const addBookmark = data.bookmark;

router.post("/", async (req, res) => {
    try {
        const genre = xss(req.body.genre);
        const description = xss(req.body.description);
        const url = xss(req.body.bookUrl);
        const userId = req.session.passport.user;

        var judge = await addBookmark.checkBookmark(url, userId);
        console.log(judge)
        if (judge == false) {
            throw "Updated failed";
        } else {
            // succeeded (no errors)
            const insertBookmark = await addBookmark.addBookmark(genre, description, url, userId);
            res.send({
                "success": "Updated Successfully",
                "status": 200
            });
        }
    } catch (e) {
        console.log(e);
        res.status(500).send("error: " + e);
    }

});



module.exports = router;