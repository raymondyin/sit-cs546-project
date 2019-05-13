$(document).ready(function () {
    $("#post-bookmark").on('submit', function (event) {
        event.preventDefault();
        var genre = $("#bookCategory").val().toLowerCase(),
            description = $("#bookDes").val(),
            bookUrl = $("#bookmarkURL").val();
        $.ajax({
            type: "POST",
            url: "/addBookmark",
            data: {
                genre: genre,
                description: description,
                bookUrl: bookUrl
            },
            dataType: "json",
            success: function (result) {
                console.log(result);
            },
            error: function (result) {
                console.log(result);
                alert("error");
            }
        });
        return false;
    });
});