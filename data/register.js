const mongoCollections = require("./collections.js");
const users = mongoCollections.Users;
const bcrypt = require("bcrypt");
const saltRounds = 6;

function validateInputParam(val, variableName) {
    if (!val) {
        throw `${variableName || "provided variable"} doesn't exist!`;
    }

    if (typeof val !== "string") {
        throw `${variableName || "provided variable"} is not a string!`;
    }

}

async function create(fname, lname, age, gender, city, state, country, email, phoneNumber, passWord) {

    validateInputParam(fname, "First Name");
    validateInputParam(lname, "Last name");
    validateInputParam(age, "age");
    validateInputParam(gender, "gender");
    validateInputParam(city, "city");
    validateInputParam(state, "state");
    validateInputParam(country, "country");
    validateInputParam(email, "email");
    validateInputParam(phoneNumber, "phoneNumber");
    validateInputParam(passWord, "password");

    const hashedPW = await bcrypt.hash(passWord, saltRounds);
    const usersCollection = await users();
    let userProfile = {
        hashedPassword: hashedPW,
        profile: {
            firstName: fname,
            lastName: lname,
            age: age,
            gender: gender,
            City: city,
            state: state,
            country: country,
            Email: email,
            phoneNumber: phoneNumber,
        }
    };
    const insertInfo = await usersCollection.insertOne(userProfile);
    if (insertInfo.insertedCount === 0) throw "Created failed";
    return userProfile;
}

async function findExist(email) {
    validateInputParam(email, "email");

    const userInfo = await users();
    const currUser = await userInfo.findOne({
        "profile.Email": email
    });
    if (currUser == null)
        return false;
    else
        return true;
}

module.exports = {
    create,
    findExist
};