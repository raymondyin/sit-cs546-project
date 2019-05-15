$(document).ready(function () {
    $("#delete-bookmark-confirm-button").click(function (event) {
        event.preventDefault();
        var genre = $("#bookCategory").val().toLowerCase(),
            description = $("#bookDes").val(),
            id = $("#bookmarkID").text();
        const redirect = window.location.href;    
        $.ajax({
            type: "DELETE",
            url: "/deleteBookmark",
            data: {
                id: id,
            },
            dataType: "json",
            success: function (result) {
                console.log(result);
                window.location.href = redirect;
            },
            error: function (result) {
                console.log(result);
                alert("error" + JSON.stringify( result));
            }
        });
        return false;
    });
});
