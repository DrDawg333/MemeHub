const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const protect = require("./middleware/authMiddleware");
const memeRoutes = require("./routes/memeRoutes");
const { createMeme } = require("./controllers/memeController");
const commentRoutes = require("./routes/commentRoutes");
const uploadRoutes =
    require("./routes/uploadRoutes");

connectDB();

const app = express();


app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/memes", memeRoutes);
app.use("/api/comments", commentRoutes);
app.use("/api/upload", uploadRoutes);
app.get("/", (req, res) => {
    res.send("MemeHub API Running");
});

app.get("/profile", protect, (req, res) => {
    res.json({
        message: "Protected Route",
        user: req.user
    });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
