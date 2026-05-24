const express = require("express");
const path = require("path");
const fs = require("fs");

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static("public"));

const postsFile = "./data/posts.json";

// 取得文章
app.get("/api/posts", (req, res) => {
    const posts = JSON.parse(fs.readFileSync(postsFile));
    res.json(posts);
});

// 新增文章
app.post("/api/posts", (req, res) => {
    const posts = JSON.parse(fs.readFileSync(postsFile));

    const newPost = {
        id: Date.now(),
        title: req.body.title,
        content: req.body.content
    };

    posts.push(newPost);

    fs.writeFileSync(postsFile, JSON.stringify(posts, null, 2));

    res.json({
        message: "文章新增成功",
        post: newPost
    });
});

app.listen(PORT, () => {
    console.log(`伺服器啟動：http://localhost:${PORT}`);
});