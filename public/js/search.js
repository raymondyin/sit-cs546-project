$("#searchForm").submit(function (event) {
    var Str = $("#searchText").val().toLowerCase();
    $.ajax({
        type: "POST",
        url: "/editBookmark",
        data: {
            searchStr: Str
        },
        dataType: "json",
        success: function (result) {
        },
        error: function (result) {
            console.log(result);
            alert("error");
        }
    });
});