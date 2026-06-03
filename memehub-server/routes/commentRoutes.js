const express = require("express");

const router = express.Router();

const protect = require("../middleware/authMiddleware");

const {
    createComment,
    getComments
} = require("../controllers/commentController");

router.post("/:memeId", protect, createComment);
router.get("/:memeId", getComments);

module.exports = router;