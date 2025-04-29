const express = require("express");
const { verifyToken } = require("../middlewares/authMiddleware");
const { postBlog, updateLike, updateComment } = require("../controllers/postController");

const router = express.Router();

router.post("/postBlog",verifyToken,  postBlog);
router.put("/updateLike",verifyToken,  updateLike);
router.put("/comment", verifyToken, updateComment);

module.exports = router;