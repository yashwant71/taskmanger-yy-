const taskService = require("../services/taskService");

// Create a new task
const createTask = async (req, res) => {
  try {
    const task = await taskService.createTask(req.body);
    res.status(201).json(task);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getTasks = async (req, res) => {
  try {
    const { sort, search, status } = req.query;

    // Initialize filters and sortBy objects
    const filters = {};
    const sortBy = {};

    // Search logic: Filter by title or description
    if (search) {
      filters.$or = [
        { title: { $regex: search, $options: "i" } }, // Case-insensitive search by title
        { description: { $regex: search, $options: "i" } }, // Case-insensitive search by description
      ];
    }
    // Add status filter
    if (status === "completed") {
      filters.completed = true;
    } else if (status === "pending") {
      filters.completed = false;
    }

    // Sort logic
    if (sort) {
      if (sort === "dueDate") {
        // Sort by dueDate (ascending order)
        sortBy.dueDate = -1;
      } else if (sort === "priority") {
        // Sort by priority (high > medium > low)
        sortBy.priority = -1; // Descending order for priority
      }
    }

    // Fetch tasks with filters and sorting
    const tasks = await taskService.getTasks(filters, sortBy, {
      title: 1,
      dueDate: 1,
      priority: 1,
      completed: 1,
      completedAt: 1,
    });
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// Get a single task by ID
const getTaskById = async (req, res) => {
  try {
    const task = await taskService.getTaskById(req.params.id);
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a task by ID
const updateTask = async (req, res) => {
  try {
    const task = await taskService.updateTask(req.params.id, req.body);
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
    res.status(200).json(task);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a task by ID
const deleteTask = async (req, res) => {
  try {
    const task = await taskService.deleteTask({ _id: req.params.id });
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
    res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createTask,
  getTasks,
  getTaskById,
  updateTask,
  deleteTask,
};
