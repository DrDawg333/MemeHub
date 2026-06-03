import { useState } from "react";
import api from "../services/api";

function CreateMeme() {

    const [title, setTitle] = useState("");
    const [image, setImage] = useState(null);

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            const formData =
                new FormData();

            formData.append(
                "image",
                image
            );

            const uploadRes =
                await api.post(
                    "/upload",
                    formData
                );

            const imageUrl =
                uploadRes.data.imageUrl;

            await api.post(
                "/memes",
                {
                    title,
                    imageUrl
                }
            );

            alert(
                "Meme Created Successfully"
            );

        } catch (error) {

            console.error(error);

        }
    };

    return (
        <div>

            <h1>Create Meme</h1>

            <form
                onSubmit={handleSubmit}
            >

                <input
                    type="text"
                    placeholder="Title"
                    value={title}
                    onChange={(e) =>
                        setTitle(
                            e.target.value
                        )
                    }
                />

                <br />

                <input
                    type="file"
                    onChange={(e) =>
                        setImage(
                            e.target.files[0]
                        )
                    }
                />

                <br />

                <button type="submit">
                    Upload Meme
                </button>

            </form>

        </div>
    );
}

export default CreateMeme;