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
});