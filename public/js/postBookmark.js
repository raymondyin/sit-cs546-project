$("#post-bookmark").submit(function (event) {
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
            if(result["success"] == "Updated Successfully") {
                alert('Upload successfully!');
                window.location.href = '/'
            }
            else
            if(result["success"] == "Updated failed") {
                alert('Bookmark exists!');
            }
        },
        error: function (result) {
            console.log(result);
            alert("error");
        }
    });
});