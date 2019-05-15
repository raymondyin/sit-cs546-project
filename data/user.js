// NOTE: all the functions have inputs checked and will catch any exceptions within itself, due to the design of password module (these functions won't throw error to outside)

const mongoCollections = require("./collections.js");
const users = mongoCollections.Users;
const bcrypt = require("bcrypt");
const {
    ObjectId
} = require('mongodb').ObjectID;

function validateInputParam(val, variableName) {
    if (!val) {
        throw `${variableName || "provided variable"} doesn't exist!`;
    }

    if (typeof val !== "string") {
        throw `${variableName || "provided variable"} is not a string!`;
    }

}

async function findUserByEmail(email) {
    let currUser = null;
    try {
        validateInputParam(email, "email");
        const userInfo = await users();
        currUser = await userInfo.findOne({
            "profile.Email": email
        });
    } catch (e) {
        console.log("error in user.js: " + e);
        return currUser;
    }
    return currUser;
}

async function comparePassword(currPassword, userPassword) {
    let compare = null;
    try {
        validateInputParam(currPassword, "currenty password");
        validateInputParam(userPassword, "user password");

        compare = await bcrypt.compare(currPassword, userPassword);
    } catch (e) {
        console.log("error in user.js: " + e);
        return compare;
    }
    return compare;
}

async function getUserById(id) {
    let currUser = null;
    try {
        validateInputParam(id, "user id");

        const object = new ObjectId(id);
        const userInfo = await users();
        currUser = await userInfo.findOne(object);

    } catch (e) {
        console.log("error in user.js: " + e);
        return currUser;
    }
    return currUser;
}

module.exports = {
    findUserByEmail,
    comparePassword,
    getUserById
};