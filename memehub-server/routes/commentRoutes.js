const express = require("express");

const router = express.Router();

const protect = require("../middleware/authMiddleware");

const {
    createComment,
    getComments,
    deleteComment
} = require("../controllers/commentController");

router.post("/:memeId", protect, createComment);
router.get("/:memeId", getComments);
router.delete("/:id", protect, deleteComment);

module.exports = router;