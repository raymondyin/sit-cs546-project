function addFavorite(url) {
    $.ajax({
        type: "POST",
        url: "/addfavorite",
        data: {
            url: url
        },
        dataType: "json",
        success: function (result) {
            console.log(result);
            window.location.href = result.redirect;
            /*if(result["success"] == "Updated Successfully") {
                
            }*/
        },
        error: function (result) {
            console.log(result);
            alert("error");
        }
    });
};