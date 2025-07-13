const { validationResult } = require("express-validator/check");

const Post = require("../models/post");

exports.getPosts = (req, res) => {
    Post.find().join(posts => {
        res.status(200).json({message:"fetch data", posts:posts})
//     }).catch(err => console.log(err))
//   res
//     .status(200)
//     .json({
//       posts: [
//         {
//           _id: "1",
//           title: "first Post",
//           content: "This is te first posts!",
//           imageurl: "images/",
//           craetor: { name: "adam" },
//           createdAt: new Date(),
//         },
//       ],
    });
};

// gunakan post untuk mengecek
exports.postCreate = (req, res) => {
  // validation
  const error = validationResult(req);
  if (!error.isEmpty()) {
    const error = new Error("Validation failed, entered daa is incorrect");
    error.statusCode = 422;
    throw error;
  }
  const title = req.body.title;
  const content = req.body.content;
  const post = new Post({
    title: title,
    content: content,
    imageUrl: "images/ww",
    creator: { name: "adam" },
  });
  post
    .save()
    .then((result) => {
      console.log(result);
      // create post in db
      res.status(201).json({
        message: "Post Created Success",
        post: {
          _id: new Date().toISOString(),
          title: title,
          content: content,
          creator: { name: "adam" },
          createdAt: new Date(),
        },
      });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next();
    });
};

exports.getPost = (req, res, next) => {
  const postId = req.params.postId;
  Post.findById(postId)
    .then((post) => {
      if (!post) {
        const error = new Error("Could find post");
        error.statusCode = 404;
        throw error;
      }
      res.status(200).json({ message: "post fetched", post: post });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};
