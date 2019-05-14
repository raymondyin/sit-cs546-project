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
            //if(result["success"] == "Updated Successfully") {
            
            //}
            //else
            //if(result["success"] == "Updated failed") {
              //  alert('Bookmark exists!');
            //}
        },
        error: function (result) {
            console.log(result);
            alert("error");
        }
    });
    //return false;
});