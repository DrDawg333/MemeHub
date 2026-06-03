const Comment = require("../models/Comment");

const createComment = async (req, res) => {
    try {

        const comment = await Comment.create({
            meme: req.params.memeId,
            user: req.user.id,
            text: req.body.text
        });

        res.status(201).json(comment);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }
};

const getComments = async (req, res) => {

    try {

        const comments = await Comment.find({
            meme: req.params.memeId
        })
        .populate("user", "username")
        .sort({ createdAt: -1 });

        res.status(200).json(comments);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }
};

module.exports = {
    createComment,
    getComments
};