import { useEffect, useState } from "react";
import api from "../services/api";
import { useParams } from "react-router-dom";

function Profile() {
    const currentUserId =
        localStorage.getItem("userId");

    const { id } = useParams();

    const [user, setUser] =
        useState(null);

    const [memes, setMemes] =
        useState([]);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const profileRes = id
                    ? await api.get(`/users/${id}`)
                    : await api.get("/auth/profile");

                setUser(profileRes.data);

                const memeRes = id
                    ? await api.get(`/memes/user/${id}`)
                    : await api.get("/memes/my");
                setMemes(memeRes.data);

            } catch (error) {
                console.error(error);
            }
        };

        fetchProfile();
    }, [id]);

    const handleFollow = async () => {
        console.log("Follow clicked");

        try {
            await api.put(`/users/follow/${id}`);

            console.log("Request sent");

            const profileRes =
                await api.get(`/users/${id}`);

            setUser(profileRes.data);

        } catch (error) {
            console.log(error.response?.data);
            console.error(error);
        }
    };

    const handleDelete = async (memeId) => {
        try {
            await api.delete(
                `/memes/${memeId}`
            );

            setMemes(
                memes.filter(
                    meme =>
                        meme._id !== memeId
                )
            );

        } catch (error) {
            console.error(error);
        }
    };
    // console.log("Current User ID:", currentUserId);
    // console.log("Followers Array:", user?.followers);

    const isFollowing =
        user?.followers?.includes(
            currentUserId
        );

    const handleUnfollow = async () => {

        try {

            await api.put(
                `/users/unfollow/${id}`
            );

            const profileRes =
                await api.get(
                    `/users/${id}`
                );

            setUser(
                profileRes.data
            );

        } catch (error) {

            console.error(error);

        }
    };

    const [avatar, setAvatar] =
        useState(null);

    const handleAvatarUpload =
        async (file) => {

            try {

                const formData =
                    new FormData();

                formData.append(
                    "image",
                    file
                );

                const uploadRes =
                    await api.post(
                        "/upload",
                        formData
                    );

                await api.put(
                    "/auth/avatar",
                    {
                        avatar:
                            uploadRes.data.imageUrl
                    }
                );

                const profileRes =
                    await api.get(
                        "/auth/profile"
                    );

                setUser(
                    profileRes.data
                );

            } catch (error) {

                console.error(error);

            }
        };

    if (!user)
        return <h1>Loading...</h1>;

    return (
        <div className="profile">

            <div className="profile-header">
                <div className="avatar-container">

                    <img
                        className="profile-avatar"
                        src={
                            user.avatar ||
                            `https://ui-avatars.com/api/?name=${user.username}`
                        }
                        alt="avatar"
                    />

                    {
                        !id && (
                            <>
                                <label
                                    htmlFor="avatar-upload"
                                    className="edit-avatar-btn"
                                >
                                    ✏️
                                </label>

                                <input
                                    id="avatar-upload"
                                    type="file"
                                    hidden
                                    accept="image/*"
                                    onChange={(e) => {

                                        const file =
                                            e.target.files[0];

                                        if (!file)
                                            return;

                                        handleAvatarUpload(
                                            file
                                        );

                                    }}
                                />
                            </>
                        )
                    }

                </div>

                <h1>{user.username}</h1>

                <p>{user.email}</p>

                <p>{user.bio}</p>

                <div className="follow-stats">

                    {id &&
                        id !== currentUserId && (
                            <button
                                onClick={
                                    isFollowing
                                        ? handleUnfollow
                                        : handleFollow
                                }
                            >
                                {
                                    isFollowing
                                        ? "Unfollow"
                                        : "Follow"
                                }
                            </button>
                        )}

                    <p>
                        <strong>
                            Followers:
                        </strong>{" "}
                        {user.followers?.length || 0}
                    </p>

                    <p>
                        <strong>
                            Following:
                        </strong>{" "}
                        {user.following?.length || 0}
                    </p>

                </div>

                <h2>Memes</h2>

            </div>

            {memes.map((meme) => (

                <div
                    key={meme._id}
                    className="meme-card"
                >

                    <div className="meme-header">

                        <h3>
                            {meme.title}
                        </h3>
                        {
                            !id && (
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
                            )
                        }


                    </div>

                    <img
                        src={meme.imageUrl}
                        alt={meme.title}
                    />

                </div>

            ))}

        </div>
    );
}

export default Profile;