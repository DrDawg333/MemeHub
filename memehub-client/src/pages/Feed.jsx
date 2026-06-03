import { useEffect, useState } from "react";
import api from "../services/api";

function Feed() {

    const [memes, setMemes] = useState([]);

    const [comments, setComments] =
        useState({});

    const [commentText, setCommentText] =
        useState({});

    const [showComments, setShowComments] =
        useState({});

    useEffect(() => {

        const fetchMemes = async () => {

            try {

                const res =
                    await api.get("/memes");

                setMemes(res.data);

            } catch (error) {

                console.error(error);

            }
        };

        fetchMemes();

    }, []);

    const fetchComments = async (memeId) => {

        try {

            const res = await api.get(
                `/comments/${memeId}`
            );

            setComments(prev => ({
                ...prev,
                [memeId]: res.data
            }));

        } catch (error) {

            console.error(error);

        }
    };

    const toggleComments = async (memeId) => {

        if (!showComments[memeId]) {

            await fetchComments(
                memeId
            );

        }

        setShowComments(prev => ({
            ...prev,
            [memeId]: !prev[memeId]
        }));

    };

    const handleComment = async (memeId) => {

        try {

            await api.post(
                `/comments/${memeId}`,
                {
                    text:
                        commentText[memeId]
                }
            );

            setCommentText(prev => ({
                ...prev,
                [memeId]: ""
            }));

            await fetchComments(
                memeId
            );

        } catch (error) {

            console.error(error);

        }
    };

    const handleLike = async (id) => {

        try {

            await api.put(
                `/memes/${id}/like`
            );

            const res =
                await api.get(
                    "/memes"
                );

            setMemes(
                res.data
            );

        } catch (error) {

            console.error(error);

        }
    };

    return (

        <div className="feed-container">

            <h1>
                Trending Memes 🔥
            </h1>

            {
                memes.map((meme) => (

                    <div
                        key={meme._id}
                        className="meme-card"
                    >

                        <p>
                            Posted by{" "}
                            {meme.user?.username}
                        </p>

                        <h3>
                            {meme.title}
                        </h3>

                        <img
                            src={meme.imageUrl}
                            alt={meme.title}
                        />

                        <div
                            className="card-actions"
                        >

                            <button
                                onClick={() =>
                                    handleLike(
                                        meme._id
                                    )
                                }
                            >
                                ❤️ {
                                    meme.likes
                                        ?.length || 0
                                }
                            </button>

                            <button
                                onClick={() =>
                                    toggleComments(
                                        meme._id
                                    )
                                }
                            >
                                💬 {meme.commentCount || 0}
                            </button>

                        </div>

                        {
                            showComments[
                            meme._id
                            ] && (

                                <div
                                    className="comments-section"
                                >

                                    <input
                                        type="text"
                                        placeholder="Write a comment..."
                                        value={
                                            commentText[
                                            meme._id
                                            ] || ""
                                        }
                                        onChange={(e) =>
                                            setCommentText(
                                                prev => ({
                                                    ...prev,
                                                    [meme._id]:
                                                        e.target.value
                                                })
                                            )
                                        }
                                    />

                                    <button
                                        onClick={() =>
                                            handleComment(
                                                meme._id
                                            )
                                        }
                                    >
                                        Post
                                    </button>

                                    {
                                        comments[
                                            meme._id
                                        ]?.map(
                                            (
                                                comment
                                            ) => (

                                                <div
                                                    key={
                                                        comment._id
                                                    }
                                                    className="comment"
                                                >

                                                    <strong>
                                                        {
                                                            comment.user
                                                                ?.username
                                                        }
                                                    </strong>

                                                    <p>
                                                        {
                                                            comment.text
                                                        }
                                                    </p>

                                                </div>

                                            )
                                        )
                                    }

                                </div>

                            )
                        }

                    </div>

                ))
            }

        </div>

    );
}

export default Feed;