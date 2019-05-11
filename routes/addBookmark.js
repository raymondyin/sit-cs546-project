const express = require("express");
const router = express.Router();
const data = require("../data");;

router.post("/", async(req, res) => {
    console.log(req.body);
    res.send({"name": "success"});
});



module.exports = router;