const express = require("express");
const taskController = require("../controllers/TaskController");

const router = express.Router();

// Task routes
router.post("/tasks", taskController.createTask);
router.get("/tasks", taskController.getTasks);
router.get("/tasks/:id", taskController.getTaskById);
router.put("/tasks/:id", taskController.updateTask);
router.delete("/tasks/:id", taskController.deleteTask);

module.exports = router;
