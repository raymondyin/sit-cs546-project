$(document).ready(function () {
    $("form").on('submit', function(event) {
        event.preventDefault();
        var genre = $("#bookCategory").val().toUpperCase(),
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
                window.location.href = result.redirect;
            },
            error: function (result) {
                console.log(result);
                alert("error");
            }
        });
        return false;
    });
});





