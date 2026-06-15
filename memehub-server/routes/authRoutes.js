const express = require("express");

const {
    signup,
    login,
    getProfile,
    updateAvatar
} = require("../controllers/authController");

const router = express.Router();
const protect = require("../middleware/authMiddleware");

router.post("/signup", signup);
router.post("/login", login);
router.get("/profile", protect, getProfile);
router.put("/avatar", protect, updateAvatar);

module.exports = router;