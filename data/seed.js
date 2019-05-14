const dbConnection = require('./connection');
const mongoCollections = require("./collections.js");
const bookmark = require("./bookmark.js");
const register = require("./register.js");
const users = mongoCollections.Users;
const bookmarkCategories = mongoCollections.Bookmark_category;

const main = async () => {
    const db = await dbConnection();
    await db.dropDatabase();

    let userList = [];
    userList.push(await register.create("Tony", "Stark", "45", "Male", "New York", "NY", "US", "tony-stark@avengers.com", "201-111-1111", "123"));
    userList.push(await register.create("Steve", "Rogers", "78", "Male", "New York", "NY", "US", "steve-rogers@avengers.com", "201-111-1112", "123"));
    userList.push(await register.create("Thor", "Odinson", "1500", "Male", "New Asgadian", "NY", "US", "thor-odinson@avengers.com", "201-111-1113", "123"));

    let bookmarkList = [];
    for (i in userList) {
        let userId = userList[i]._id;
        bookmarkList.push(await bookmark.addBookmark("search", "search engine", "www.google.com", userId));
    }
    console.log("Done seeding database");
    await db.serverConfig.close();
}

main().catch(console.log);