// Require npm dependencies
var express = require("express");
var mongoose = require("mongoose");
var axios = require("axios");
var cheerio = require("cheerio");
var exphbs = require("express-handlebars");

// Require all models
var db = require("./models");

var PORT = process.env.PORT || 3000;

// Initialize express
var app = express();

// Express middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

// Set up Handlebars
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Variable to determine which DB to connect to
// If deployed, use deployed DB. Otherwise, use the local DB.
var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";

// Connect to the DB
mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.set('useCreateIndex', true);

// ROUTES

app.get("/", function(req, res) {
    db.Article.find({}).then(function(dbArticles) {
        var allArticles = {
            articles: dbArticles
        }
        res.render("index", allArticles);
    })
    .catch(function(err) {
        res.json(err);
    }); 
});

app.get("/api/clear", function(req, res) {
    db.Article.deleteMany({}).then(function(deletedCount) {
        console.log(deletedCount);
        res.redirect("/")
    })
    .catch(function(err) {
        console.log(err);
    }); 
});

app.get("/saved", function(req, res) {
    db.Article.find({ saved: true }).then(function(dbArticles) {
        var savedArticles = {
            articles: dbArticles
        }
        res.render("saved", savedArticles);
    })
    .catch(function(err) {
        res.json(err);
    }); 
});

app.get("/api/scrape", function(req, res) {
    axios.get("https://www.bbc.com/news/world").then(function(response) {
        
        var $ = cheerio.load(response.data);

        $("article").each(function(i, element) {
            var result = {};

            result.title = $(this).find("span.lx-stream-post__header-text").text();
            result.summary = $(this).find("p.qa-sty-summary").text();
            result.url = $(this).find("a.qa-heading-link").attr("href");
            
        if(result.summary !== "") {
            db.Article.create(result).then(function(dbArticle) {
                console.log(dbArticle);
            })
            .catch(function(err) {
                console.log(err);
            });
        }
        });
       
        res.end();
    });
});

app.put("/api/articles/:id", function(req, res) {
    db.Article.findOneAndUpdate({ _id: req.params.id }, { $set: { saved: req.body.saved }})
    .then(function(dbArticle) {
        console.log(dbArticle);
        res.end();
    })
    .catch(function(err) {
        // If an error occurs, send it back to the client
        console.log(err);
    });
});

app.delete("/api/articles/:id", function(req, res) {
    db.Article.findOneAndDelete({ _id: req.params.id }).then(function(dbArticle) {
        console.log(dbArticle);
        res.end();
    })
    .catch(function(err) {
        // If an error occurs, send it back to the client
        console.log(err);
    });
});

// Start express server
app.listen(PORT, function() {
    console.log(`Listening on PORT ${PORT}...`)
});