const express = require("express");
const { AuthorizationError } = require("../../../errors");
const Post = require("./../../../models/post");
const moment = require("moment");
const { faker } = require("@faker-js/faker");

module.exports.getPost = async (req, res) => {
  const post = await Post.findById(req.params.id);
  res.json({ post });
};

module.exports.savePost = async (req, res, next) => {
  req.post = new Post();
  next();
};

module.exports.editPost = async (req, res, next) => {
  req.post = await Post.findById(req.params.id);
  next();
};

module.exports.getAllPosts = async (req, res) => {
  // let startDate = moment();
  // let anotherDate = new Date();
  // const randomName = faker.name.fullName();
  // let endDate = moment().add(34, "months");

  // res.json({ startDate, anotherDate, endDate, randomName });
  try {
    const posts = await Post.find().sort({
      createdAt: "desc",
    });
    res.json({ posts: posts });
  } catch (error) {
    res.json({ error: error });
  }
};

// module.exports.getSingleUserPosts = async (req, res) => {
//   const posts = await Post.find({}, { description: 0 });
//   if (!posts) return res.status(400).send("no posts found");
//   res.status(200).json(posts);
//   //    res.send(req.user);
// };

module.exports.deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.userId.toString() !== req.user._id.toString()) {
      throw AuthorizationError;
    } else {
      await Post.findByIdAndDelete(req.params.id);
      res.status(200).json({ message: "success" });
    }
  } catch (error) {
    res.json({ error: error });
  }
};

module.exports.handleLikes = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.likedBy.includes(req.user._id) === true) {
      post.likes = post.likes - 1;
      post.likedBy.splice(post.likedBy.indexOf(req.user._id), 1);
      await Post.findByIdAndUpdate(
        { _id: post._id },
        { likes: post.likes, likedBy: post.likedBy }
      );
      res.status(200).json({ message: "success" });
    } else if (post.likedBy.includes(req.user._id) === false) {
      post.likes = post.likes + 1;
      post.likedBy.push(req.user._id);
      //        console.log(post.likedBy);

      await Post.findByIdAndUpdate(
        { _id: post._id },
        { likes: post.likes, likedBy: post.likedBy }
        // function (err, result) {
        //   if (err) {
        //     console.log(err);
        //   } else {
        //     console.log(result);
        //   }
        // }
      );
      res.status(200).json({ message: "success" });
    }
  } catch (error) {
    res.json({ error: error });
  }
};

function setUser(req, res, next) {
  const userId = req.body.userId;
  if (userId) {
    req.user = users.find((user) => user.id === userId);
  }
  next();
}
