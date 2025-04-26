const express = require("express");
const {loginUser, signupUser, autoLogin, userInfo} = require("../controllers/authController");
const { verifyToken } = require("../middlewares/authMiddleware");

const router = express.Router();

router.post('/login', loginUser);
router.post('/signup', signupUser);
router.get('/autoLogin', verifyToken, autoLogin);
router.post('/signup/userInfo',verifyToken, userInfo);

module.exports = router;