const mongoCollections = require("./collections.js");
const users = mongoCollections.Users;
const bcrypt = require("bcrypt");
const saltRounds = 6;
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
        }
    };
//   console.log(userProfile);
    const insertInfo = await usersCollection.insertOne(userProfile);
    if (insertInfo.insertedCount === 0) throw "Created failed";
    return userProfile;
}

async function findExist(email) {  
    const userInfo = await users();
    const currUser = await userInfo.findOne({"profile.Email": email});
    if (currUser == null)
        return false;
    else 
        return true;
}

module.exports = {
    create,
    findExist
};
