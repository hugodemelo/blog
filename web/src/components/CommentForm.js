import React, { useState } from "react";

const FormHook = initialValues => {
    const [state, setState] = useState(initialValues);
    return [
        state,
        e => {
            const { name, value } = e.target;
            return setState({ ...state, [name]: value });
        },
        resetState => {
            return setState(resetState);
        }
    ];
};

const CommentForm = ({ articleName, setArticleInfo }) => {
    const [state, setState, resetState] = FormHook({ username: "", commentText: "" });

    const addComment = async () => {
        const result = await fetch(`/api/articles/${articleName}/comments`, {
            method: "post",
            body: JSON.stringify({
                username: state.username,
                text: state.commentText
            }),
            headers: {
                "Content-Type": "application/json"
            }
        });
        const json = await result.json();
        setArticleInfo(json);

        resetState({ username: "", commentText: "" });
    };

    return (
        <div id="add-comment-form">
            <h3>Add a Comment</h3>
            <label>
                Name:
                <input type="text" name="username" onChange={setState} value={state.username} />
            </label>
            <label>
                Comment:
                <textarea rows="4" name="commentText" cols="50" onChange={setState} value={state.commentText} />
            </label>
            <button onClick={addComment}>Add Comment</button>
        </div>
    );
};

export default CommentForm;
