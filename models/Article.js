var mongoose = require("mongoose");

// Reference to the mongoose Schema constructor
var Schema = mongoose.Schema;

// Schema for documents that will be inserted into Article collection
var ArticleSchema = new Schema({
    title: {
        type: String,
        unique: true
    },
    summary: String,
    url: String,
    saved: {
        type: Boolean,
        default: false
    },
    comments: [
        {
            type: Schema.Types.ObjectId,
            ref: "Comment"
        }
    ]
});

// Create Article model with previously defined schema
var Article = mongoose.model("Article", ArticleSchema);

// Export Article model
module.exports = Article;