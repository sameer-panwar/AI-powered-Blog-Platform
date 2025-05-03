const express = require('express');
const { verifyToken } = require('../middlewares/authMiddleware');
const { adminBlogs, profile, editProfile, searchUser } = require('../controllers/userController');

const router = express.Router();

router.get('/profile/:id', verifyToken, profile);
router.get('/adminBlogs/:id', verifyToken, adminBlogs);
router.put('/editProfile', verifyToken, editProfile);
router.get('/searchUser/:id', verifyToken, searchUser);

module.exports = router;