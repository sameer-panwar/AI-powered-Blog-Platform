const express = require('express');
const { verifyToken } = require('../middlewares/authMiddleware');
const { adminBlogs, profile, editProfile, searchUser, getNotifications, suggestedAuthors, savedBlogs } = require('../controllers/userController');

const router = express.Router();

router.get('/profile/:id', verifyToken, profile);
router.get('/adminBlogs/:id', verifyToken, adminBlogs);
router.put('/editProfile', verifyToken, editProfile);
router.get('/searchUser/:id', verifyToken, searchUser);
router.get('/suggestedAuthors', verifyToken, suggestedAuthors);
router.get('/getNotifications/:id', verifyToken, getNotifications);

module.exports = router;