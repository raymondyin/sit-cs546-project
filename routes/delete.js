const express = require("express");
const router = express.Router();
const data = require("../data");
const xss = require("xss");
const passport = require("passport");

const deleteBookmark = data.bookmark;

router.post("/", async (req, res) => {
    const markId = xss(req.body.id);
    const userId = req.session.passport.user;
    try {
        const result = await deleteBookmark.deleteById(markId);
        res.send({"success": "success"})
    }
    catch(e) {
        res.status(500).send({"success": "failed"})
    }
});



module.exports = router;