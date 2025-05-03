const mongoose=require("mongoose");


const userSchema= mongoose.Schema({
    username: String,
    name: String,
    email: String,
    password: String,
    role: String,
    bio: String,
    blogs: Number,
    likes: Number,
    notifications: [
        {
          type: { type: String, enum: ["like", "comment"], required: true },
          blogId: { type: mongoose.Schema.Types.ObjectId, ref: "blogs" },
          from: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
          isRead: { type: Boolean, default: false },
          createdAt: { type: Date, default: Date.now }
        }
      ]
      
});

const userDB=mongoose.model("users", userSchema);

module.exports = userDB;