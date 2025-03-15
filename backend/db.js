const mongoose=require("mongoose");

mongoose.connect("mongodb+srv://sameerpanwar:Sp%40817161@sameersdatabase.gc3nk.mongodb.net/BlogPlatform");


const userSchema= mongoose.Schema({
    username: String,
    name: String,
    email: String,
    password: String,
    role: String,
    bio: String,
    blogCount: Number,
    blogsLikes: Number
})

const blogSchema=mongoose.Schema({
    title: String,
    content: String,
    keyword: { type: [String], default: [] },
    name: String,
    role: String,
    likes: Number,
    createdAt: { type: Date, default: Date.now }
})

const userDB=mongoose.model("Users", userSchema);
const blogsDB=mongoose.model("Blogs", blogSchema);

module.exports={
    userDB,
    blogsDB
}

