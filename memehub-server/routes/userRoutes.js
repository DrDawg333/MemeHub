const express = require("express");
const router = express.Router();

const {
    followUser,
    unfollowUser,
    getUserById
} = require("../controllers/userController");

const protect =
    require("../middleware/authMiddleware");

router.put("/follow/:id", protect, followUser);

router.put("/unfollow/:id", protect, unfollowUser);

router.get("/:id", protect, getUserById);

module.exports = router;