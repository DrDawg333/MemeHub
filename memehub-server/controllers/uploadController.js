const cloudinary = require("../config/cloudinary");

const uploadImage = async (req, res) => {
    try {

        const file = req.file;

        const base64 = Buffer.from(
            file.buffer
        ).toString("base64");

        const dataURI =
            `data:${file.mimetype};base64,${base64}`;

        const result =
            await cloudinary.uploader.upload(dataURI);

        res.status(200).json({
            imageUrl: result.secure_url
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }
};

module.exports = {
    uploadImage
};