const Task = require("../models/Task");

// Create a new task
const createTask = async (taskData) => {
  const task = new Task(taskData);
  return await task.save();
};

// Get all tasks with optional filtering and sorting
const getTasks = async (filters = {}, sortBy = {}, fields = {}) => {
  return await Task.find(filters).sort(sortBy).select(fields);
};

// Get a single task by ID
const getTaskById = async (taskId) => {
  return await Task.findById(taskId);
};

// Update a task by ID
const updateTask = async (taskId, updateData) => {
  return await Task.findByIdAndUpdate(taskId, updateData, { new: true });
};

// Delete a task by ID
const deleteTask = async (taskId) => {
  return await Task.findByIdAndDelete(taskId);
};

module.exports = {
  createTask,
  getTasks,
  getTaskById,
  updateTask,
  deleteTask,
};
