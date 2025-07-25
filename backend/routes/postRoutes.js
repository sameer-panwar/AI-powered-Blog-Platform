const express = require("express");
const { verifyToken } = require("../middlewares/authMiddleware");
const { postBlog, updateLike, updateComment, getBlogs, deletePost } = require("../controllers/postController");

const router = express.Router();

router.get("/getBlogs", verifyToken, getBlogs);
router.post("/postBlog",verifyToken,  postBlog);
router.put("/updateLike",verifyToken,  updateLike);
router.put("/comment", verifyToken, updateComment);
router.delete("/deletePost/:postId", verifyToken, deletePost);

module.exports = router;