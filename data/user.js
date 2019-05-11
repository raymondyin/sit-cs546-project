const mongoCollections = require("./collections.js");
const users = mongoCollections.Users;
const bcrypt = require("bcrypt");
const { ObjectId } = require('mongodb').ObjectID;


async function findUserByEmail(email) {
    const userInfo = await users();
    const currUser = await userInfo.findOne({"profile.Email": email});
    return currUser;
}

async function comparePassword(currPassword, userPassword) {
    const compare = await bcrypt.compare(currPassword, userPassword);
    return compare;
}

async function getUserById(id) {
    const object = new ObjectId(id);
    const userInfo = await users();
    const currUser = await userInfo.findOne(object);
    return currUser;
}

module.exports = {
    findUserByEmail,
    comparePassword,
    getUserById
};