const express = require("express");
const { getSingleUserPosts } = require("../../../controllers/v1/dashboard");
const ensureAuthenticated = require("../../../middlewares/auth");

const router = express.Router();

router.get("/posts", ensureAuthenticated, getSingleUserPosts);

module.exports = router;
