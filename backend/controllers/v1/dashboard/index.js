const express = require("express");
const Post = require("./../../../models/post");

module.exports.getSingleUserPosts = async (req, res) => {
  try {
    const tempPosts = await Post.find().sort({
      createdAt: "desc",
    });
    const posts = tempPosts.filter(
      (post) => post.userId === req.user._id.toString()
    );

    res.status(200).json({
      user: req.user,
      posts: posts,
    });
  } catch (error) {}

  // res.render("dashboard", {
  //   name: req.user.name,
  //   posts: posts,
  // });
};

// module.exports.deletePost = async (req, res) => {
//   await Post.findByIdAndDelete(req.params.id);
//   res.redirect("/dashboard");
// };
