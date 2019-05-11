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
 
async function addCategory(genre) {
    const bookmark = await book();
    const categoryInfo = {
        genre: genre
    }
    const insertInfo = await bookmark.insertOne(categoryInfo);
    if (insertInfo.insertedCount === 0) throw "Insert new category failed";
    return insertInfo;
}

async function checkCategory(genre) {
    const category = await book();
    const existCategory = await category.findOne({genre});
    if (existCategory === null) {
        return true; 
    } else {
        return false;
    }
}

async function getCategoryById(id, genre){
    const category = await book();
    const allCategory = await category.find({userId:id, genre: genre}).toArray();
    return allCategory;
}

module.exports = {
    addBookmark,
    checkBookmark,
    getBookmarkById,
    addCategory,
    getCategoryById,
    checkCategory
}
