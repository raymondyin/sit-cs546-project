
    var saveBookmark = $("#saveBookmark"),
         genre = $("#bookCategory").val(),
         //image = $("#inputImgFile").val(),
         description = $("#bookDes").val(),
         bookUrl = $("#bookmarkURL").val();


        saveBookmark.click(function() {
            //event.preventDefault();
            $.ajax({
                type: "POST",
                url: "/addBookmark",
                data: {
                    genre: genre,
                    //image: image,
                    description: description,
                    bookUrl: bookUrl
                },
                dataType: "json",
                success: function(result) {
                    console.log(result);
                    alert("Success");
                },
                error: function(result) {
                    alert("error");
                }
            });
        });
    

        


