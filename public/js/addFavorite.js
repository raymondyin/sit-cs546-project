function addFavorite(url) {
    const redirect = window.location.href;
    $.ajax({
        type: "POST",
        url: "/addfavorite",
        data: {
            url: url
        },
        dataType: "json",
        success: function (result) {
            console.log(result);
            window.location.href = redirect;
        },
        error: function (result) {
            console.log(result);
            alert("error");
        }
    });
};