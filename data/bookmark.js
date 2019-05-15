const mongoCollections = require("./collections.js");
const book = mongoCollections.Bookmark_category;
const ObjectID = require('mongodb').ObjectID

function validateInputParam(val, variableName) {
    if (!val) {
        throw `${variableName || "provided variable"} doesn't exist!`;
    }

    if (typeof val !== "string") {
        throw `${variableName || "provided variable"} is not a string!`;
    }

}

async function addBookmark(genre, description, url, id) {
    validateInputParam(genre, "genre");
    validateInputParam(description, "description");
    validateInputParam(url, "url");
    validateInputParam(id, "id");

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
    validateInputParam(id, "id");

    const bookmarkCollection = await book();
    const bookmarkToBeDelated = await bookmarkCollection.findOne({
        _id: ObjectID(id)
    });

    const deletionInfo = await bookmarkCollection.removeOne({
        _id: ObjectID(id)
    });

    if (deletionInfo.deletedCount === 0) {
        throw `Could not delete bookmark with id of ${id}`;
    }
    return bookmarkToBeDelated;
}

async function checkBookmark(url, id) {
    validateInputParam(url, "url");
    validateInputParam(id, "User ID");

    const bookmark = await book();
    const existBookmark = await bookmark.findOne({
        url: url,
        userId: (id)
    });
    if (existBookmark === null) { // Bookmark doesn't exist
        return true;
    } else { // Bookmark exists
        return false;
    }
}

// Get all bookmarks with the specified user ID
async function getBookmarkById(id) {
    validateInputParam(id, "User ID");

    const bookmark = await book();
    const allBookmark = await bookmark.find({
        userId: id
    }).toArray();
    return allBookmark;
}

async function findAllbyGenreId(id, genre) {
    validateInputParam(id, "User ID");
    validateInputParam(genre, "genre");

    const bookmark = await book();
    const allBookmark = await bookmark.find({
        userId: id,
        genre: genre
    }).toArray();
    return allBookmark;
}

async function edit(genre, description, url) {
    validateInputParam(genre, "genre");
    validateInputParam(description, "description");
    validateInputParam(url, "url");

    const bookmark = await book();
    const data = await bookmark.findOne({
        url: url
    });
    const id = data["_id"]
    const allBookmark = await bookmark.updateMany({
        _id: id
    }, {
        $set: {
            genre: genre,
            description: description,
            url: url
        }
    });
    return "good";
}

async function isFavorite(userId, url) {
    validateInputParam(userId, "userId");
    validateInputParam(url, "url");

    const bookmark = await book();
    const allBookmark = await bookmark.updateMany({
        userId: userId,
        url: url
    }, {
        $set: {
            "isFavorite": "Yes"
        }
    })
    return "good";
}

async function notFavorite(userId, url) {
    validateInputParam(userId, "userId");
    validateInputParam(url, "url");

    const bookmark = await book();
    const allBookmark = await bookmark.updateMany({
        userId: userId,
        url: url
    }, {
        $set: {
            "isFavorite": "No"
        }
    })
    return "good";
}

async function findByURL(id, url) {
    validateInputParam(id, "id");
    validateInputParam(url, "url");
    const bookmark = await book();
    const allBookmark = await bookmark.find({
        userId: id,
        url: url
    }).toArray();
    return allBookmark;
}

async function addCategory(genre) {
    validateInputParam(genre, "genre");

    const bookmark = await book();
    const categoryInfo = {
        genre: genre
    }
    const insertInfo = await bookmark.insertOne(categoryInfo);
    if (insertInfo.insertedCount === 0) throw "Insert new category failed";
    return insertInfo;
}

async function checkCategory(genre) {
    validateInputParam(genre, "genre");

    const category = await book();
    const existCategory = await category.findOne({
        genre
    });
    if (existCategory === null) {
        return true;
    } else {
        return false;
    }
}

async function getCategoryById(id, genre) {
    validateInputParam(id, "id");
    validateInputParam(genre, "genre");

    const category = await book();
    const allCategory = await category.find({
        userId: id,
        genre: genre
    }).toArray();
    return allCategory;
}

async function searchBookmark(searchStr, userId) {
    validateInputParam(searchStr, "search string");
    validateInputParam(userId, "userId");

    const bookmark = await book();
    var bookmarkResult = [];
    const bookmarkResultByGenre = await bookmark.find({
        userId: userId,
        genre: {
            $regex: searchStr,
            $options: "$i"
        }
    }).toArray();
    const bookmarkResultByDes = await bookmark.find({
        userId: userId,
        description: {
            $regex: searchStr,
            $options: "$i"
        }
    }).toArray();
    const bookmarkResultByUrl = await bookmark.find({
        userId: userId,
        url: {
            $regex: searchStr,
            $options: "$i"
        }
    }).toArray();

    const map = {};
    bookmarkResult = bookmarkResultByGenre.concat(bookmarkResultByDes).concat(bookmarkResultByUrl);
    var i = 0;
    while (i < bookmarkResult.length) {
        if (map[bookmarkResult[i]["url"]] == undefined) {
            map[bookmarkResult[i]["url"]] = 1;
        } else {
            bookmarkResult.splice(i, 1);
            i--;
        }
        i++;
    }

    return bookmarkResult;
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