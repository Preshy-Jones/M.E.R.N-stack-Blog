const express = require("express");
const {
  getPost,
  savePost,
  editPost,
  getAllPosts,
  handleLikes,
  deletePost,
} = require("../../../controllers/v1/posts/index");
const ensureAuthenticated = require("../../../middlewares/auth");
const router = express.Router();

router.get("/:id", getPost);
router.post("/", ensureAuthenticated, savePost, savePostAndRedirect("new"));
router.put("/:id", ensureAuthenticated, editPost, savePostAndRedirect("edit"));
router.get("/", ensureAuthenticated, getAllPosts);
router.delete("/:id", ensureAuthenticated, deletePost);
router.put("/likes/:id", ensureAuthenticated, handleLikes);

function savePostAndRedirect(path) {
  return async (req, res) => {
    let post = req.post;
    post.userId = req.user._id;
    post.title = req.body.title;
    post.description = req.body.description;
    post.markdown = req.body.markdown;
    try {
      post = await post.save();
      res.json({ posts: posts });
    } catch (error) {
      res.json({ error: error });
    }
  };
}

module.exports = router;
