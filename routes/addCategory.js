const express = require("express");
const router = express.Router();
const data = require("../data");
const xss = require("xss");
const passport = require("passport");

const addCategory = data.bookmark;

router.post("/", async (req, res) => {
    const genre = xss(req.body.genre);
    // const description = xss(req.body.description);
    // const url = xss(req.body.bookUrl);
    // const userId = req.session.passport.user;
    console.log(genre)
    if (await addCategory.checkCategory(genre) === false) {
        req.flash('error_msg_addCategory', 'Category already exist, insert url to existing category');


        res.end('{"failed" : "Updated failed", "status" : 500, "redirect": "/dashboard"}');
    } else {
        const insertCategory = await addCategory.addCategory(genre);
        req.flash('success_msg_addCategory', 'Category added!');
        res.end('{"success" : "Updated Successfully", "status" : 200, "redirect": "/dashboard"}');
    }

});



module.exports = router;