import express from "express";
import bodyParser from "body-parser";
import { MongoClient } from "mongodb";
import path from "path";

const app = express();

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "/build")));

const withDB = async (operations, res) => {
    try {
        const client = await MongoClient.connect("mongodb://localhost:27017", {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        const db = client.db("blog");
        await operations(db);
        client.close();
    } catch (error) {
        res.status(500).json({ message: error });
    }
};

app.get("/api/articles/:name", (req, res) => {
    const { name } = req.params;
    withDB(async db => {
        const articleInfo = await db.collection("articles").findOne({ name: name });
        res.status(200).json(articleInfo);
    }, res);
});

app.post("/api/articles/:name/upvotes", (req, res) => {
    const { name } = req.params;
    withDB(async db => {
        const articleInfo = await db.collection("articles").findOne({ name: name });
        await db.collection("articles").updateOne(
            { name: name },
            {
                $set: {
                    upvotes: articleInfo.upvotes + 1
                }
            }
        );
        const updatedArticleInfo = await db.collection("articles").findOne({ name: name });
        res.status(200).json(updatedArticleInfo);
    }, res);
});

app.post("/api/articles/:name/comments", (req, res) => {
    const {
        params: { name },
        body: { username, text }
    } = req;
    withDB(async db => {
        await db.collection("articles").updateOne(
            { name: name },
            {
                $addToSet: {
                    comments: { username, text }
                }
            }
        );
        const updatedArticleInfo = await db.collection("articles").findOne({ name: name });
        res.status(200).json(updatedArticleInfo);
    }, res);
});

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname + "/build/index.html"));
});

app.listen(8000, () => {
    console.log("Listening on port 8000...");
});
