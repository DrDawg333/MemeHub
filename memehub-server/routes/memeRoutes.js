const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");

const {
    createMeme,
    getMemes,
    likeMeme,
    getMyMemes,
    deleteMeme
} = require("../controllers/memeController");

router.get("/", getMemes);
router.post("/", protect, createMeme);
router.get("/my", protect, getMyMemes);
router.delete("/:id", protect, deleteMeme);
router.put("/:id/like", protect, likeMeme);

module.exports = router;