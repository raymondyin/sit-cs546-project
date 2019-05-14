const dbConnection = require('./connection');
const mongoCollections = require("./collections.js");
const bookmark = require("./bookmark.js");
const register = require("./register.js");
const users = mongoCollections.Users;
const bookmarkCategories = mongoCollections.Bookmark_category;
const ObjectId = require("mongodb").ObjectId;

const main = async () => {
    const db = await dbConnection();
    await db.dropDatabase();

    // let userList = [];
    let userTony = await register.create("Tony", "Stark", "45", "Male", "New York", "NY", "US", "tony-stark@avengers.com", "201-111-1111", "iamironman123");
    // userList.push();
    // userList.push(await register.create("Steve", "Rogers", "78", "Male", "New York", "NY", "US", "steve-rogers@avengers.com", "201-111-1112", "language!123"));
    // userList.push(await register.create("Thor", "Odinson", "1500", "Male", "New Asgadian", "NY", "US", "thor-odinson@avengers.com", "201-111-1113", "iamodinson123"));

    // let bookmarkList = [];
    await bookmark.addBookmark("search", "Google's search engine", "www.google.com", userTony._id.toString());
    await bookmark.addBookmark("search", "Baidu's search engine, it searches Chinese characters well", "www.baidu.com", userTony._id.toString());
    await bookmark.addBookmark("search", "Microsoft's search engine, it's okay but its marketshare is so sad", "www.bing.com", userTony._id.toString());
    await bookmark.addBookmark("drama", "Game of Throne", "www.gameofthrone.com", userTony._id.toString());
    await bookmark.addBookmark("drama", "Silicon Valley", "www.thesiliconvalley.com", userTony._id.toString());
    await bookmark.addBookmark("drama", "Westworld", "www.westworld.com", userTony._id.toString());
    await bookmark.addBookmark("movie", "Avenger: Endgame", "https://www.wikiwand.com/en/Avengers:_Endgame", userTony._id.toString());
    // for (i in userList) {
    //     let userId = userList[i]._id;
    //     bookmarkList.push(await bookmark.addBookmark("search", "search engine", "www.google.com", userId));
    // }
    console.log("Done seeding database");
    await db.serverConfig.close();
}

main().catch(console.log);