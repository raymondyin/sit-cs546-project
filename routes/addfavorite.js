const express = require("express");
const router = express.Router();
const data = require("../data");
const xss = require("xss");
const passport = require("passport");

const addfavorite = data.bookmark;

router.post('/', async (req, res) => {
    try {
        const url = xss(req.body.url);
        const userId = xss(req.session.passport.user);
        console.log(url);
        console.log(userId);
        const data = await addfavorite.findByURL(userId, url);
        console.log(data);
        var fav;
        if(data[0]["isFavorite"] == "Yes")
            fav = await addfavorite.notFavorite(userId, url);
        else
            fav = await addfavorite.isFavorite(userId, url);
        console.log(data);
        res.send({"success" : "Updated Successfully", "status" : 200});
    }
    catch(e) {
        res.send({"err": "error"});
    }
});

module.exports = router;