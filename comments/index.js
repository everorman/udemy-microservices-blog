const express = require('express');
const bodyParser = require('body-parser');
const {randomBytes} = require('crypto');

const app = express();
app.use(bodyParser.json());

const commentsByPostId = {}

app.get('/post/:id/comments', (req, res) => {
  res.send(commentsByPostId[req.params.id] || []);
})
app.post('/post/:id/comment', (req, res) => {
  const {content} = req.body;
  const postId = req.params.id
  const commentId = randomBytes(4).toString('hex');
  const comments = commentsByPostId[postId] || [];
  comments.push({id: commentId, content })
  commentsByPostId[postId] = comments;
  res.status(201).send(commentsByPostId[postId]);
})

app.listen(4001, () => {
  console.log('listening at 4001')
})