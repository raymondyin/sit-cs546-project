const mongoCollections = require("./collections.js");
const book = mongoCollections.Bookmark_category;
const ObjectID = require('mongodb').ObjectID

async function addBookmark(genre, description, url, id) {
    const bookmark = await book();
    const bookmarkInfo = {
        genre: genre,
        description: description,
        url: url,
        userId: id,
        isFavorite: "No"
    }
    const insertInfo = await bookmark.insertOne(bookmarkInfo);
    if (insertInfo.insertedCount === 0) throw "Created failed";
    return insertInfo;
}

async function deleteBookmarkByID(id) {
    if (!id) throw "You must provide an id to search for";

    const bookmarkCollection = await book();
    const bookmarkToBeDelated = await bookmarkCollection.findOne({ userId: id });

    const deletionInfo = await bookmarkCollection.removeOne({ _id: ObjectID(id) });

    if (deletionInfo.deletedCount === 0) {
        throw `Could not delete bookmark with id of ${id}`;
    }
    return bookmarkToBeDelated;
}

async function checkBookmark(url, id) {
    const bookmark = await book();
    const existBookmark = await bookmark.findOne({ url: url, userId: (id) });
    if (existBookmark === null) { // Bookmark doesn't exist
        return true;
    } else { // Bookmark exists
        return false;
    }
}


// Get all bookmarks with the specified user ID
async function getBookmarkById(id) {
    const bookmark = await book();
    const allBookmark = await bookmark.find({ userId: id }).toArray();
    return allBookmark;
}

async function findAllbyGenreId(id, genre) {
    const bookmark = await book();
    const allBookmark = await bookmark.find({ userId: id, genre: genre }).toArray();
    return allBookmark;
}

async function edit(genre, description, url) {
    const bookmark = await book();
    const data = await bookmark.findOne({ url: url });
    const id = data["_id"]
    const allBookmark = await bookmark.updateMany({ _id: id }, { $set: { genre: genre, description: description, url: url } });
    return "good";
}

async function isFavorite(userId, url) {
    const bookmark = await book();
    const allBookmark = await bookmark.updateMany({ userId: userId, url: url }, { $set: { "isFavorite": "Yes" } })
    return "good";
}

async function notFavorite(userId, url) {
    const bookmark = await book();
    const allBookmark = await bookmark.updateMany({ userId: userId, url: url }, { $set: { "isFavorite": "No" } })
    return "good";
}

async function findByURL(id, url) {
    const bookmark = await book();
    const allBookmark = await bookmark.find({ userId: id, url: url }).toArray();
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
    const existCategory = await category.findOne({ genre });
    if (existCategory === null) {
        return true;
    } else {
        return false;
    }
}

async function getCategoryById(id, genre) {
    const category = await book();
    const allCategory = await category.find({ userId: id, genre: genre }).toArray();
    return allCategory;
}

async function searchBookmark(searchStr, userId) {
    const bookmark = await book();
    var bookmarkResult = [];
    const bookmarkResultByGenre = await bookmark.find({ userId: userId, genre: { $regex: searchStr, $options: "$i" } }).toArray();
    const bookmarkResultByDes = await bookmark.find({ userId: userId, description: { $regex: searchStr, $options: "$i" } }).toArray();
    const bookmarkResultByUrl = await bookmark.find({ userId: userId, url: { $regex: searchStr, $options: "$i" } }).toArray();

    const map = {};
    bookmarkResult = bookmarkResultByGenre.concat(bookmarkResultByDes).concat(bookmarkResultByUrl);
    var i = 0;
    while (i < bookmarkResult.length) {
        if (map[bookmarkResult[i]["url"]] == undefined) {
            map[bookmarkResult[i]["url"]] = 1;
        }
        else {
            bookmarkResult.splice(i, 1);
            i--;
        }
        i++;
    }

    return bookmarkResult;
}


async function deleteBookmarkByID(id){
    if (!id) throw "You must provide an id to search for";
    
    const bookmarkCollection = await book();
    const bookmarkToBeDelated = await bookmarkCollection.findOne({userId: id});

    const deletionInfo = await bookmarkCollection.removeOne({ _id: ObjectID(id) });

    if (deletionInfo.deletedCount === 0) {
        throw `Could not delete bookmark with id of ${id}`;
    }
    return bookmarkToBeDelated;
}

module.exports = {
    addBookmark,
    deleteBookmarkByID,
    checkBookmark,
    getBookmarkById,
    addCategory,
    getCategoryById,
    checkCategory,
    searchBookmark,
    findAllbyGenreId,
    isFavorite,
    notFavorite,
    findByURL,
    edit
}
