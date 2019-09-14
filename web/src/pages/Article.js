import React, { useState, useEffect } from "react";
import ArticlesList from "../components/ArticlesList";
import CommentsList from "../components/CommentsList";
import UpvotesSection from "../components/UpvotesSection";
import CommentForm from "../components/CommentForm";
import NotFound from "./NotFound";
import articleContent from "./article-content";

const Article = ({ match }) => {
    const { name } = match.params;
    const article = articleContent.find(article => article.name === name);
    const otherArticles = articleContent.filter(article => article.name !== name);

    const [articleInfo, setArticleInfo] = useState({ upvotes: 0, comments: [] });

    useEffect(() => {
        (async () => {
            const result = await fetch(`/api/articles/${name}`);
            const json = await result.json();
            setArticleInfo(json);
        })();
    }, [name]);

    if (!article) {
        return <NotFound />;
    }
    return (
        <>
            <h1>{article.title}</h1>
            <UpvotesSection articleName={name} upvotes={articleInfo.upvotes} setArticleInfo={setArticleInfo} />
            {article.content.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
            ))}
            <CommentsList comments={articleInfo.comments} />
            <CommentForm articleName={name} setArticleInfo={setArticleInfo} />
            <h3>Other Articles:</h3>
            <ArticlesList articles={otherArticles} />
        </>
    );
};

export default Article;
