import apiConfig from "./apiConfig";

// Fetch all tasks with optional query parameters
export const getTasksService = async (params = {}) => {
  try {
    const response = await apiConfig.get(`/tasks`, { params }); // Pass params directly to the API request
    return response.data;
  } catch (error) {
    console.error("Error fetching tasks:", error);
    throw error;
  }
};  
// Fetch a single task by ID
export const getTaskByIdService = async (id) => {
  try {
    const response = await apiConfig.get(`/tasks/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching task with ID ${id}:`, error);
    throw error;
  }
};

// Create a new task
export const createTaskService = async (taskData) => {
  try {
    const response = await apiConfig.post(`/tasks`, taskData);
    return response.data;
  } catch (error) {
    console.error("Error creating task:", error);
    throw error;
  }
};

// Update an existing task
export const updateTaskService = async (id, updatedData) => {
  try {
    const response = await apiConfig.put(`/tasks/${id}`, updatedData);
    return response.data;
  } catch (error) {
    console.error(`Error updating task with ID ${id}:`, error);
    throw error;
  }
};

// Delete a task
export const deleteTaskService = async (id) => {
  try {
    const response = await apiConfig.delete(`/tasks/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error deleting task with ID ${id}:`, error);
    throw error;
  }
};
