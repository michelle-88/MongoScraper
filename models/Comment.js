var mongoose = require("mongoose");

// Reference to the mongoose Schema constructor
var Schema = mongoose.Schema;

// Schema for documents that will be inserted into Comment collection
var CommentSchema = new Schema({
    body: String
});

// Create Comment model with previously defined schema
var Comment = mongoose.model("Comment", CommentSchema);

// Export Comment model
module.exports = Comment;