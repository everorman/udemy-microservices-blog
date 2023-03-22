const express = require("express");
const bodyParser = require("body-parser");
const { randomBytes } = require("crypto");
const cors = require("cors");
const axios = require("axios");

const app = express();
app.use(bodyParser.json());
app.use(cors());

const commentsByPostId = {};

app.get("/posts/:id/comments", (req, res) => {
  res.send(commentsByPostId[req.params.id] || []);
});

app.post("/posts/:id/comments", (req, res) => {
  const { content } = req.body;
  const postId = req.params.id;
  const commentId = randomBytes(4).toString("hex");
  const comments = commentsByPostId[postId] || [];

  const comment = { id: commentId, content, status: "pending" };
  comments.push(comment);
  commentsByPostId[postId] = comments;

  axios.post("http://localhost:4005/events", {
    type: "CommentCreated",
    data: {
      ...comment,
      postId,
    },
  });
  res.status(201).send(commentsByPostId[postId]);
});

app.post("/events", async (req, res) => {
  console.log("Event received", req.body.type);
  const { type, data } = req.body;
  if (type === "CommentModerated") {
    const { postId, id, status } = data;
    const comments = commentsByPostId[postId];
    const comment = comments.find((comment) => {
      return comment.id === id;
    });

    comment.status = status;

    await axios
      .post("http://localhost:4005/events", {
        type: "CommentUpdated",
        data: {
          ...data,
        },
      })
      .catch((err) => {
        console.log(err.message);
      });
  }
  res.send({});
});

app.listen(4001, () => {
  console.log("listening at 4001");
});
