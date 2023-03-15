const express = require('express');
const {randomBytes } = require('crypto');
const bodyParser = require('body-parser')

const app = express();
app.use(bodyParser);

const posts = {};

app.get('/posts', (req, res)=>{
    res.send(posts)
});
app.post('/post', (req, res)=>{
    const id = randomBytes(4).toString('hex');
    const {title} = req.body;
    posts[id] = {
        id, title
    };
    res.send()
});

app.listen(4000, ()=>{
    console.log('Listening on 4000')
})