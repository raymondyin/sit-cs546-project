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

async function searchBookmarkByTag(tag, userId) {
    if (typeof tag !== String) throw "Tag is not a string!";
    if (!tag || tag.length === 0) throw "Missing tag for bookmarkSearchByTag()!";
    if (userId) throw "Missing userID for bookmarkSearchByTag()!";

    const bookmarkCollections = await book();
    let tagSearchResult = [];
    for (i = 0; i < bookmarkCollections.length; i++) {
        let currUserId = bookmarkCollections[i].userId;
        let currGenre = bookmarkCollections[i].genre;
        if (userId === currUserId.str && currGenre.includes(tag)) {
            tagSearchResult.push(currGenre);
        }
    }
    return tagSearchResult;
}

async function searchBookmarkByUrl(url, userId) {
    if (typeof url !== String) throw "Url is not a string!";
    if (!url || url.length === 0) throw "Missing url for bookmarkSearchByUrl()!";
    if (userId) throw "Missing userID for bookmarkSearchByTag()!";

    const bookmarkCollections = await book();
    let urlSearchResult = [];
    for (i = 0; i < bookmarkCollections.length; i++) {
        let currUserId = bookmarkCollections[i].userId;
        let currUrl = bookmarkCollections[i].url;
        if (userId === currUserId.str && currUrl.includes(url)) {
            tagSearchResult.push(currUrl);
        }
    }
    return urlSearchResult;
}

async function searchBookmarkByDescription(description, userId) {
    if (typeof description !== String) throw "Description is not a string!";
    if (!description || description.length === 0) throw "Missing description for bookmarkSearchByDescription()!";
    if (userId) throw "Missing userID for bookmarkSearchByTag()!";

    const bookmarkCollections = await book();
    let descriptionSearchResult = [];
    for (i = 0; i < bookmarkCollections.length; i++) {
        let currUserId = bookmarkCollections[i].userId;
        let currDescription = bookmarkCollections[i].description;
        if (userId === currUserId.str && currDescription.includes(description)) {
            descriptionSearchResult.push(currDescription);
        }
    }
    return descriptionSearchResult;
}

module.exports = {
    addBookmark,
    checkBookmark,
    getBookmarkById,
    addCategory,
    getCategoryById,
    checkCategory,
    searchBookmarkByTag,
    searchBookmarkByUrl,
    searchBookmarkByDescription
}
