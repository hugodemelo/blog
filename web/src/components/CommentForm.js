import React, { useState } from "react";

const CommentForm = ({ articleName, setArticleInfo }) => {
    const [username, setUsername] = useState("");
    const [commentText, setCommentText] = useState("");

    const addComment = async () => {
        const result = await fetch(`/api/articles/${articleName}/comments`, {
            method: "post",
            body: JSON.stringify({
                username,
                text: commentText
            }),
            headers: {
                "Content-Type": "application/json"
            }
        });
        const json = await result.json();
        setArticleInfo(json);

        setUsername("");
        setCommentText("");
    };

    return (
        <div id="add-comment-form">
            <h3>Add a Comment</h3>
            <label>
                Name:
                <input type="text" onChange={e => setUsername(e.target.value)} value={username} />
            </label>
            <label>
                Comment:
                <textarea rows="4" cols="50" onChange={e => setCommentText(e.target.value)} value={commentText} />
            </label>
            <button onClick={addComment}>Add Comment</button>
        </div>
    );
};

export default CommentForm;
