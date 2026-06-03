import { useEffect, useState } from "react";
import api from "../services/api";

function Profile() {

    const [user, setUser] =
        useState(null);

    const [memes, setMemes] =
        useState([]);

    useEffect(() => {

        const fetchProfile = async () => {

            try {

                const profileRes =
                    await api.get(
                        "/auth/profile"
                    );

                setUser(
                    profileRes.data
                );

                const memeRes =
                    await api.get(
                        "/memes/my"
                    );

                setMemes(
                    memeRes.data
                );

            } catch (error) {

                console.error(
                    error
                );

            }
        };

        fetchProfile();

    }, []);

    const handleDelete = async (id) => {

        try {

            await api.delete(
                `/memes/${id}`
            );

            setMemes(
                memes.filter(
                    meme => meme._id !== id
                )
            );

        } catch (error) {

            console.error(error);

        }
    };

    if (!user)
        return <h1>Loading...</h1>;

    return (

        <div
            className="profile"
        >
            <div className="profile-header">


                <h1>
                    {user.username}
                </h1>

                <p>
                    {user.email}
                </p>

                <p>
                    {user.bio}
                </p>

                <h2>
                    My Memes
                </h2>
            </div>


            {
                memes.map((meme) => (

                    <div
                        key={meme._id}
                        className="meme-card"
                    >

                        <div className="meme-header">

                            <h3>
                                {meme.title}
                            </h3>

                            <button
                                className="delete-btn"
                                onClick={() => {

                                    const ok =
                                        window.confirm(
                                            "Delete this meme?"
                                        );

                                    if (ok) {

                                        handleDelete(
                                            meme._id
                                        );

                                    }

                                }}
                            >
                                🗑
                            </button>

                        </div>

                        <img
                            src={meme.imageUrl}
                            alt={meme.title}
                        />

                    </div>

                ))
            }

        </div>

    );
}

export default Profile;