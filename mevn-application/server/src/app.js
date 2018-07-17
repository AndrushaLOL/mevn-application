const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')

var Post = require("../models/post");
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/posts');
var db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error"));
db.once("open", function(callback){
  console.log("Connection Succeeded");
});

const app = express()
app.use(morgan('combined'))
app.use(bodyParser.json())
app.use(cors())

// Fetch all posts
app.get('/posts', (req, res) => {
  Post.find({}, 'title description', function (error, posts) {
    if (error) { console.error(error); }
    res.send({
      posts: posts
    })
  }).sort({_id:-1})
})

// Fetch a single posts
app.get('/posts/:id', (req, res) => {
    Post.findById(req.params.id, 'title description', function (error, post) {
        if (error) { console.error(error); }
        res.send({
            title: post.title,
            description: post.description
        })
    })
})

// Add new post
app.post('/posts', (req, res) => {
  var db = req.db;
  var title = req.body.title;
  var description = req.body.description;
  var new_post = new Post({
    title: title,
    description: description
  })

  new_post.save(function (error) {
    if (error) {
      console.log(error)
    }
    res.send({
      success: true,
      message: 'Post saved successfully!'
    })
  })
})

// Delete post
app.delete('/posts/:id', (req, res) => {
	var db = req.db;
	Post.remove({_id: req.params.id}, function (err) {
		if (err) {
			console.log(err)
		}
		res.send({
			success: true,
			message: 'success!'
		})
	})
})

// Update post
app.put('/posts/:id', (req, res) => {
    var db = req.db;
    Post.findById(req.params.id,'title description',  function (err, post) {
        if (err) {
            console.log(err)
        }
        post.title = req.body.title
        post.description = req.body.description
        post.save(function (err) {
            if (err) {
                console.log(err)
            }
            res.send({
                success: true
            })
        })
    })
})

app.listen(process.env.PORT || 8081)