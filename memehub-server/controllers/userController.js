const User = require("../models/User");

const followUser = async (req, res) => {
    try {
        const currentUserId = req.user.id;
        const targetUserId = req.params.id;

        if (currentUserId === targetUserId) {
            return res.status(400).json({
                message: "You cannot follow yourself"
            });
        }

        const currentUser =
            await User.findById(currentUserId);

        const targetUser =
            await User.findById(targetUserId);

        if (!targetUser) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        if (
            currentUser.following.includes(
                targetUserId
            )
        ) {
            return res.status(400).json({
                message: "Already following"
            });
        }

        currentUser.following.push(
            targetUserId
        );

        targetUser.followers.push(
            currentUserId
        );

        await currentUser.save();
        await targetUser.save();

        res.json({
            message: "User followed successfully"
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }
};

const unfollowUser = async (req, res) => {
    try {
        const currentUserId = req.user.id;
        const targetUserId = req.params.id;

        const currentUser =
            await User.findById(currentUserId);

        const targetUser =
            await User.findById(targetUserId);

        if (!targetUser) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        currentUser.following =
            currentUser.following.filter(
                (id) =>
                    id.toString() !== targetUserId
            );

        targetUser.followers =
            targetUser.followers.filter(
                (id) =>
                    id.toString() !== currentUserId
            );

        await currentUser.save();
        await targetUser.save();

        res.json({
            message: "User unfollowed successfully"
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }
};

const getUserById = async (req, res) => {

    try {

        const user = await User.findById(
            req.params.id
        ).select("-password");

        if (!user) {

            return res.status(404).json({
                message: "User not found"
            });

        }

        res.json(user);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};

module.exports = {
    followUser,
    unfollowUser,
    getUserById
};