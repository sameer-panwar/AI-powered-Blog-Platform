const express = require("express");
const { verifyToken } = require("../middlewares/authMiddleware");
const { postBlog, updateLike, updateComment, getAllBlogs, getUserBlogs, deletePost, getBlogsInfo, getBlogsById, updateBookmark, getSavedBlogs } = require("../controllers/postController");

const router = express.Router();

router.get("/getBlogsInfo", verifyToken, getBlogsInfo);
router.get("/getBlogsById/:id", verifyToken, getBlogsById);
router.get("/getAllBlogs", verifyToken, getAllBlogs);
router.get("/getUserBlogs/:id", verifyToken, getUserBlogs);
router.post("/postBlog",verifyToken,  postBlog);
router.put("/updateLike/:id",verifyToken,  updateLike);
router.put("/updateBookmark/:id",verifyToken,  updateBookmark);
router.post("/getSavedBlogs",verifyToken,  getSavedBlogs);
router.put("/comment", verifyToken, updateComment);
router.delete("/deletePost/:postId", verifyToken, deletePost);

module.exports = router;