var mongoose = require("mongoose");

var postSchema = new mongoose.Schema({
    name: String,
    images: [],
    body: String,
})

var Post2 = mongoose.model("Post2", postSchema);

module.exports = Post2;