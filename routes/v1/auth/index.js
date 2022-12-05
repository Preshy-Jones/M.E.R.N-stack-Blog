const express = require("express");
const passport = require("passport");
const {
  login,
  register,
  handleRefreshToken,
} = require("../../../controllers/v1/auth");
const ensureAuthenticated = require("../../../middlewares/auth");
const loginLimiter = require("../../../middlewares/loginLimiter");
const router = express.Router();

router.post("/login", loginLimiter, login);
router.get("/refresh", handleRefreshToken);
router.post("/register", register);
router.get("/protected", ensureAuthenticated, (req, res) => {
  return res.status(200).send({
    success: true,
    user: {
      id: req.user.id,
      email: req.user.email,
    },
  });
});

module.exports = router;
