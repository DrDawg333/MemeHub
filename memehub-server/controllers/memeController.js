const Meme = require("../models/Meme");

const createMeme = async (req, res) => {
    try {
        const meme = await Meme.create({
            user: req.user.id,
            title: req.body.title,
            imageUrl: req.body.imageUrl,
        });

        res.status(201).json(meme);
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

const getMemes = async (req, res) => {
    try {
        const memes = await Meme.find()
            .populate("user", "username")
            .sort({ createdAt: -1 });

        res.status(200).json(memes);
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

const likeMeme = async (req, res) => {
    try {
        const meme = await Meme.findById(req.params.id);

        if (!meme) {
            return res.status(404).json({
                message: "Meme not found",
            });
        }
        // console.log("Before:", meme.likes);
        const alreadyLiked = meme.likes.some((id) => id.toString() === req.user.id);
        // console.log("Already liked:", alreadyLiked);
        if (alreadyLiked) {
            meme.likes = meme.likes.filter((id) => id.toString() !== req.user.id);
        } else {
            meme.likes.push(req.user.id);
        }

        await meme.save();

        res.status(200).json({
            likes: meme.likes.length,
        });
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

const getMyMemes = async (req, res) => {
    try {
        const memes = await Meme.find({
            user: req.user.id,
        }).sort({
            createdAt: -1,
        });

        res.status(200).json(memes);
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

const deleteMeme = async (req, res) => {

    try {

        const meme = await Meme.findById(
            req.params.id
        );

        if (!meme) {

            return res.status(404).json({
                message: "Meme not found"
            });

        }

        if (
            meme.user.toString() !==
            req.user.id
        ) {

            return res.status(401).json({
                message: "Not authorized"
            });

        }

        await Meme.findByIdAndDelete(
            req.params.id
        );

        res.status(200).json({
            message: "Meme deleted"
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }
};

module.exports = {
    createMeme,
    getMemes,
    likeMeme,
    getMyMemes,
    deleteMeme
};
