const mongoCollections = require("./collections.js");
const book = mongoCollections.Bookmark_category;

async function addBookmark(genre, description, url, id) {
    const bookmark = await book();
    const bookmarkInfo = {
        genre: genre,
        description: description,
        url: url,
        userId: id
    }
    const insertInfo = await bookmark.insertOne(bookmarkInfo);
    if (insertInfo.insertedCount === 0) throw "Created failed";
    return insertInfo;
}

async function checkBookmark(url) {
    const bookmark = await book();
    const existBookmark = await bookmark.findOne({url});
    if (existBookmark === null) {
        return true;
    } else {
        return false;
    }
}

async function getBookmarkById(id) {
    const bookmark = await book();
    const allBookmark = await bookmark.find({userId: id}).toArray();
    return allBookmark;
}
 
module.exports = {
    addBookmark,
    checkBookmark,
    getBookmarkById
}