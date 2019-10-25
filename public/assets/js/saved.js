$(document).ready(function() {

    // Click listener for Clear Articles button
    $(".clear").on("click", function() {
        $.get("/api/clear").then(function() {
            $(".article-container").empty();
        });
    });

    // Click listener for Delete From Saved button
    $(document).on("click", ".btn.delete", function() {

        var articleId = $(this).parents(".card").attr("data-id");

        $.ajax({
            method: "DELETE",
            url: "/api/articles/" + articleId
        })
        .then(function(data) {
            location.reload();
            console.log(data);
        });
    });

    // Click listener for Article Comments button
    $(document).on("click", ".btn.comments", function() {
        var articleId = $(this).parents(".card").attr("data-id");

        $.ajax({
            method: "GET",
            url: "/api/articles/" + articleId
        })
        .then(function(data) {
            console.log(data)
            $("#articleId").text(data._id);
            $("#commentTitle").attr("data-id", data._id);

            if(data.comments) {
                for(var i = 0; i < data.comments.length; i ++) {
                    $("#commentsDiv").append("<p>" + data.comments[i].body + "</p>")
                }
            }
    
            $("#commentsDiv").html("<p class='text-center'> No comments for this article yet.</p>")
            $("#commentsModal").modal("show");
        });
    });

    // Click listener for Post Comment button
    $(document).on("click", ".btn.postComment", function() {
        
    })
});