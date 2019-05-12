function addFavorite(genre, description, url) {
    $.ajax({
        type: "POST",
        url: "/addfavorite",
        data: {
            genre: genre,
            description: description,
            bookUrl: url
        },
        dataType: "json",
        success: function (result) {
            console.log(result);
            window.location.href = result.redirect;
        },
        error: function (result) {
            console.log(result);
            alert("error");
        }
    });
};