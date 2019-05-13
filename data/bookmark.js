const mongoCollections = require("./collections.js");
const book = mongoCollections.Bookmark_category;

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

async function checkBookmark(url) {
    const bookmark = await book();
    const existBookmark = await bookmark.findOne({ url });
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
    const allBookmark = await bookmark.find({userId: id, genre: genre}).toArray();
    return allBookmark;
}

async function edit(genre, description, url){
    const bookmark = await book();
    const data = await bookmark.findOne({url: url});
    const id = data["_id"]
    const allBookmark = await bookmark.updateMany({_id: id}, {$set:{genre: genre, description: description, url: url}});
    return "good"; 
}

async function isFavorite(userId, url) {
    const bookmark = await book();
    const allBookmark = await bookmark.updateMany({userId: userId, url: url}, {$set:{"isFavorite": "Yes"}}).toArray();
    console.log(allBookmark);
    return "good";
}

async function notFavorite(userId, url) {
    const bookmark = await book();
    const allBookmark = await bookmark.updateMany({userId: userId, url: url}, {$set:{"isFavorite": "No"}}).toArray();
    console.log(allBookmark);
    return "good";
}

async function findByURL(id, url) {
    const bookmark = await book();
    const allBookmark = await bookmark.find({userId: id,url: url}).toArray();
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
    const bookmarkResultByGenre = await bookmark.find({ userId: userId, genre: {$regex: searchStr, $options: "$i" }}).toArray();
    const bookmarkResultByDes = await bookmark.find({ userId: userId, description: {$regex: searchStr, $options: "$i" } }).toArray();
    const bookmarkResultByUrl = await bookmark.find({ userId: userId, url: {$regex: searchStr, $options: "$i" } }).toArray();
    bookmarkResult = bookmarkResultByGenre.concat(bookmarkResultByDes).concat(bookmarkResultByUrl);

    //console.log(bookmarkResult);
    return bookmarkResult;
}


// Search for genre, url and description of any bookmark that contains the input string as a substring
async function searchBookmark(searchStr, userId) {
    if (typeof searchStr !== String) throw "Url is not a string!";
    if (!searchStr || searchStr.length === 0) throw "Missing url for bookmarkSearchByUrl()!";
    if (userId) throw "Missing userID for bookmarkSearchByTag()!";

    const bookmarkCollections = await book();
    let searchResultByBookmarkId = new Set();
    for (i = 0; i < bookmarkCollections.length; i++) {
        let bookmarkIdStr = bookmarkCollections._id.str;
        let userId = bookmarkCollections[i].userId;
        let tag = bookmarkCollections[i].genre;
        let url = bookmarkCollections[i].url;
        let description = bookmarkCollections[i].description;
        if (userId === currUserId.str) {
            if (tag.includes(searchStr)) {
                searchResultByBookmarkId.add(bookmarkIdStr);
            }
            if (url.includes(searchStr)) {
                searchResultByBookmarkId.add(bookmarkIdStr);
            }
            if (description.includes(searchStr)) {
                searchResultByBookmarkId.add(bookmarkIdStr);
            }
        }
    }

    return searchResultByBookmarkId;
}


module.exports = {
    addBookmark,
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
