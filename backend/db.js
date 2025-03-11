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
    title: { type: String, required: true },
    content: { type: String, required: true },
    keywords: { type: [String], default: [] },
    name: String,
    role: String,
    likes: Number
})

const userDB=mongoose.model("Users", userSchema);
const blogsDB=mongoose.model("Blogs", blogSchema);

module.exports={
    userDB,
    blogsDB
}

