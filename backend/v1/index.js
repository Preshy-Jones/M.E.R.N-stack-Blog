const express = require("express");
const router = express.Router();

router.use("/auth", require("./auth"));
router.use("/dashboard", require("./dashboard"));
router.use("/posts", require("./posts"));
router.use("/users", require("./users"));

module.exports = router;
