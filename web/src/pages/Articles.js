import React from "react";
import ArticlesList from "../components/ArticlesList";
import articleContent from "./article-content";

const Articles = () => (
    <>
        <h1>Articles</h1>
        <ArticlesList articles={articleContent} />
    </>
);

export default Articles;
