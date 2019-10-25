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
            $(".postComment").attr("data-id", data._id);

            if(data.comments.length !== 0) {
                for(var i = 0; i < data.comments.length; i ++) {
                    $("#commentsDiv").append("<p>" + data.comments[i].body + "</p>")
                }
            }
            
            // $("#commentsDiv").append("<p class='text-center'> No comments for this article yet.</p>")
            $("#commentsModal").modal("show");
        });
    });

    // Click listener for Post Comment button
    $(document).on("click", ".btn.postComment", function(event) {
        event.preventDefault();

        var articleId = $(this).attr("data-id");

        $.ajax({
            method: "POST",
            url: "/api/articles/" + articleId,
            data: {
                body: $("#commentBody").val().trim()
            }
        }).then(function(data) {
            console.log(data);
            location.reload();
        });
    });
});