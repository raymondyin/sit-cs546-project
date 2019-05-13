function deleteBookmark(id) {
    $.ajax({
        type: "POST",
        url: "/delete",
        data: {
            id: id
        },
        dataType: "json",
        success: function (result) {
            //console.log(result);
            alert('delete successfully!');
            window.location.href = "/"
            /*if(result["success"] == "Updated Successfully") {
                
            }*/
        },
        error: function (result) {
            console.log(result);
            alert("error");
        }
    });
};