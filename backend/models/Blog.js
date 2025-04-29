const mongoose = require("mongoose");

const blogSchema=mongoose.Schema({
    title: String,
    content: String,
    keyword: { type: [String], default: [] },
    name: String,
    role: String,
    username: String,
    likes: Number,
    likedBy: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "users"
    }],
    comments:[{
        comment: {type: String},
        postedBy: {type: mongoose.Schema.Types.ObjectId, ref: "users"}
    }],
    createdAt: { type: Date, default: Date.now }
});

const blogsDB = mongoose.model("blogs", blogSchema);

module.exports = blogsDB;