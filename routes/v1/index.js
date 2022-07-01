const express = require("express");
const router = express.Router();

router.use("/auth", require("./auth"));
router.use("/dashboard", require("./dashboard"));
router.use("/posts", require("./posts"));

module.exports = router;
