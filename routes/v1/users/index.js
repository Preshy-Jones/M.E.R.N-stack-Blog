const express = require("express");
const passport = require("passport");
const {
  getUsers,
  getUser,
  getUserByEmail,
} = require("../../../controllers/v1/users");
const ensureAuthenticated = require("../../../middlewares/auth");
const router = express.Router();

router.get("/", getUsers);
router.get("/:id", getUser);
router.get("/email/:email", getUserByEmail);

module.exports = router;
