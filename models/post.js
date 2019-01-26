var mongoose = require("mongoose");

var postSchema = new mongoose.Schema({
    name: String,
    images: [],
    body: String,
})

var Post = mongoose.model("Post", postSchema);

module.exports = Post;