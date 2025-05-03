const express = require('express');
const { verifyToken } = require('../middlewares/authMiddleware');
const { adminBlogs, profile, editProfile, searchUser } = require('../controllers/userController');

const router = express.Router();

router.get('/profile', verifyToken, profile);
router.get('/adminBlogs', verifyToken, adminBlogs);
router.put('/editProfile', verifyToken, editProfile);
router.get('/searchUser', verifyToken, searchUser);

module.exports = router;