const express = require("express");
const router = express.Router();
const taskController = require("../controller/taskController");
const authController = require("../controller/authController");
const authMiddleware = require("../middleware/authMiddleware");

router.post("/register", authController.signUp);
router.post("/login", authController.login);
router.get("/user", authMiddleware.protect, authController.getCurrentUser);

router.post("/create-task", authMiddleware.protect, taskController.createTask);
router.get("/list-tasks", authMiddleware.protect, taskController.getTaskList);

module.exports = router;
