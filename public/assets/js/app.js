$(document).ready(function() {
    // Click listener for Scrape New Articles button
    $(document).on("click", ".scrape-new", function() {
        $.ajax({
            method: "GET",
            url: "/scrape"
        })
        .then(function() {
            location.reload();
        });
    });
});