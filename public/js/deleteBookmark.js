$(document).ready(function () {
    $("#delete-bookmark-op").click(function (event) {
        alert("called delete script");
        event.preventDefault();
        var genre = $("#bookCategory").val().toLowerCase(),
            description = $("#bookDes").val(),
            id = $("#bookmarkURL").val();
        $.ajax({
            type: "DELETE",
            url: "/deleteBookmark",
            data: {
                id: id,
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
