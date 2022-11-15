const express = require("express");
const router = express.Router();
const authController = require("../controller/auth");

router.use("/auth", authController.signUp);

module.exports = router;
