const express = require("express");

const {
    signup,
    login,
    getProfile
} = require("../controllers/authController");

const router = express.Router();
const protect = require("../middleware/authMiddleware");

router.post("/signup", signup);
router.post("/login", login);
router.get("/profile", protect, getProfile);

module.exports = router;