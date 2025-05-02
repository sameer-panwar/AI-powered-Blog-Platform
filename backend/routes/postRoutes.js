const express = require("express");
const { verifyToken } = require("../middlewares/authMiddleware");
const { postBlog, updateLike, updateComment, getBlogs } = require("../controllers/postController");

const router = express.Router();

router.get("/getBlogs", verifyToken, getBlogs);
router.post("/postBlog",verifyToken,  postBlog);
router.put("/updateLike",verifyToken,  updateLike);
router.put("/comment", verifyToken, updateComment);

module.exports = router;