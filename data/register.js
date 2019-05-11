const mongoCollections = require("./collection.js");
const users = mongoCollections.Users;
const bcrypt = require("bcrypt");
const saltRounds = 16;  

let exportedMethods = {
    
    async getUserById(id) {
        if (!id) throw "Missing id! Please provide an id to search for a user.";

        const userCollection = await users();
        const user = await userCollection.findOne({_id: id});
        if (user === null) throw "No user with id: ${id}";

        return user;
    },

    async getAllUsers() {
        const userCollection = await users();
        const users = await userCollection.find({}).toArray();

        return users;
    },

    async addUser(fname, lname, gender, age, email, phoneNumber, city, state, country, userName, passWord) {   
        if (!fname) throw "Missing first name! Please provide your first name.";
        if (!lname) throw "Missing last name! Please provide your last name.";
        if (!gender) throw "Missing gender! Please provide your gender.";
        if (!age) throw "Missing age! Please provide your age.";    
        if (!email) throw "Missing email! Please provide an email address.";
        if (!phoneNumber) throw "Missing phone number! Please provide your phone number.";
        if (!city) throw "Missing city name! Please provide your city of residence.";
        if (!state) throw "Missing state / province name! Please provide your state / province of residence.";
        if (!country) throw "Missing country name! Please provide your country of residence.";
        if (!userName) throw "Missing user name! Please provide a user name.";
        if (!passWord) throw "Missing password! Please provide a password.";

        const hashedPW = await bcrypt.hash(passWord, saltRounds);
        
        let newUser = {
            profile: {
                firstName: fname,
                lastName: lname,
                gender: gender,
                age: age,
                email: email,
                phoneNumber: phoneNumber,
                City: city,
                state: state,
                country: country
            },
            userName: userName,
            hashedPassword: hashedPW, 
            bookmark: {}
        };

        const userCollection = await users();
        const insertedInfo = await userCollection.insertOne(newUser);
        if (insertedInfo.insertedCount === 0) throw "Missing user document for insertion!";

        const newUserId = insertInfo.insertId;
        const user = await this.getUserProfileById(newUserId);
        return user;
    },

    async deleteUser(id) {
        const userCollection = await users();
        const deletedInfo = await userCollection.removeOne({_id: id});

        if (deletedInfo.deletedCount === 0) throw "Missing user document for deletion with id: ${id}!";
    },

    async updateUser(id, fname, lname, gender, age, email, phoneNumber, city, state, country, userName, passWord) {  
        if (!id) throw "Missing user ID! Please provide a user ID."
        if (!fname) throw "Missing first name! Please provide a new first name for update";
        if (!lname) throw "Missing last name! Please provide a new last name for update.";
        if (!gender) throw "Missing gender! Please provide a new gender for update.";
        if (!age) throw "Missing age! Please provide a new age for update.";    
        if (!email) throw "Missing email! Please provide a new email address for update.";
        if (!phoneNumber) throw "Missing phone number! Please provide a new phone number for update.";
        if (!city) throw "Missing city name! Please provide a new city of residence for update.";
        if (!state) throw "Missing state / province name! Please provide a new state / province of residence for update.";
        if (!country) throw "Missing country name! Please provide a new country of residence for update.";
        if (!userName) throw "Missing user name! Please provide a new user name for update.";
        if (!passWord) throw "Missing password! Please provide a new password for update.";

        const hashedPW = await bcrypt.hash(passWord, saltRounds);

        let updatedUser = {
            profile: {
                firstName: fname,
                lastName: lname,
                gender: gender,
                age: age,
                email: email,
                phoneNumber: phoneNumber,
                City: city,
                state: state,
                country: country
            },
            userName: userName,
            hashedPassword: hashedPW, 
            bookmark: {}
        };

        const userCollection = await users();
        const updatedInfo = await userCollection.replaceOne(
            {_id: id},
            updatedUser
        );
        if (updatedInfo.modifiedCount === 0) {
            throw "Missing user document for update!";
        }

        const user = await getUserById(id);
        return user;
    },

    async findExist(email) {  
        const userInfo = await users();
        const currUser = await userInfo.findOne({"profile.Email": email});
        console.log(currUser);
        if (currUser == null)
            return false;
        else 
            return true;
    }
};

module.exports = exportedMethods;