const mongoCollections = require("./collections.js");
const users = mongoCollections.Users;
const bcrypt = require("bcrypt");
const saltRounds = 10;

async function create(fname, lname, age, gender, city, state, country, email, phoneNumber, passWord) {
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
        }, 
        bookmark: []
    };
//   console.log(userProfile);
    const insertInfo = await usersCollection.insertOne(userProfile);
    if (insertInfo.insertedCount === 0) throw "Created failed";
    return userProfile;
}

module.exports = {
    create
};