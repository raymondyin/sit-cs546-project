const express = require("express");
const router = express.Router();
const data = require("../data");;
const passport = require("passport");

const userInfo = data.userData;
const bookmark = data.bookmark;
const xss = require("xss");

var sessionChecker = async (req, res, next) => {
    if (req.session.passport) {
        next();
    } else {
        res.redirect('/login');
    }    
};

router.get('/', sessionChecker, async (req, res) => {
    const userOBJ = req.session.passport;
    const userID = userOBJ.user;
    const userPersonalInfo = await userInfo.getUserById(userID);
    const userFN = userPersonalInfo.profile.firstName;
    const allBookmark = await bookmark.getBookmarkById(req.session.passport.user);
    //console.log(allBookmark);
    let genre = [];
    for (let i in allBookmark) {
        if (!genre.includes(allBookmark[i]["genre"])) {
            genre.push(allBookmark[i]["genre"]);
            genre.sort();
        }
    }
    if (xss(req.query.catalog)) {
        const getGenre = xss(req.query.catalog);
        const userBookmark = await bookmark.findAllbyGenreId(userID, getGenre);
        //console.log(userBookmark);
        res.render('static/dashboard', {title: "User Dashboard", userName: userFN, posts: userBookmark, cata: genre});
    } else {
        res.render('static/dashboard', {title: "User Dashboard", userName: userFN, posts: allBookmark, cata: genre});
    }
    // }
});

module.exports = router;