// Require npm dependencies
var express = require("express");
var mongoose = require("mongoose");
var axios = require("axios");
var cheerio = require("cheerio");

// Require all models
var db = require("./models");

var PORT = process.env.PORT || 3000;

// Initialize express
var app = express();

// Express middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

// Variable to determine which DB to connect to
// If deployed, use deployed DB. Otherwise, use the local DB.
var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";

// Connect to the DB
mongoose.connect(MONGODB_URI);
mongoose.set('useCreateIndex', true);

// ROUTES


// Start express server
app.listen(PORT, function() {
    console.log(`Listening on PORT ${PORT}...`)
});