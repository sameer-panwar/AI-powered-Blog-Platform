const mongoose=require("mongoose");


const userSchema= mongoose.Schema({
    username: String,
    name: String,
    email: String,
    password: String,
    role: String,
    bio: String,
    blogs: Number,
    likes: Number
});

const userDB=mongoose.model("users", userSchema);

module.exports = userDB;