$(document).ready(function () {
    $("form").on('submit', function(event) {
        event.preventDefault();
        var genre = $("#bookCategory").val(),
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
                alert("success");
            },
            error: function (result) {
                console.log(result);
                alert("error");
            }
        });
        return false;
    });
});





