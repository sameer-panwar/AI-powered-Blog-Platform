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
        ref: "UserDB"
    }],
    comments:[{
        comment: {type: String},
        postedBy: {type: mongoose.Schema.Types.ObjectId, ref: "UserDB"}
    }],
    createdAt: { type: Date, default: Date.now }
});

const blogsDB = mongoose.model("Blogs", blogSchema);

module.exports = blogsDB;