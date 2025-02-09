import { useDispatch, useSelector } from "react-redux";
import { setLoading, setError, setIsCreating } from "../store/reducers/uiState";
import {
  setTasksAction,
  createTaskAction,
  editTaskAction,
  deleteTaskAction,
  // setDetailedTaskAction,
} from "../store/reducers/task";
import {
  getTasksService,
  createTaskService,
  updateTaskService,
  deleteTaskService,
  getTaskByIdService,
} from "../services/taskServices";
import { useUiStateActions } from "./useUiStateActions";

export const useTaskActions = () => {
  const dispatch = useDispatch();
  const isCreating = useSelector((state) => state.uiState.isCreating);
  const tasks = useSelector((state) => state.tasks.tasks);
  // const detailedTask = useSelector((state) => state.tasks.detailedTask);
  const { closeModal } = useUiStateActions();

  // to fetch tasks, filter tasks etc
  const fetchTasks = async (params = {}) => {
    dispatch(setLoading(true));
    try {
      const data = await getTasksService(params);
      if (Array.isArray(data)) {
        dispatch(setTasksAction(data));
      } else {
        console.error("Data fetched is not an array:", data);
      }
    } catch (err) {
      dispatch(setError(err.message || "Error fetching tasks."));
    } finally {
      dispatch(setLoading(false));
    }
  };

  // Fetching a single task by ID and updating it in the tasks array
  const fetchTaskById = async (taskId) => {
    dispatch(setLoading(true));
    try {
      const task = await getTaskByIdService(taskId);
      dispatch(editTaskAction(task));
    } catch (err) {
      dispatch(
        setError(err.message || `Error fetching task with ID ${taskId}.`)
      );
    } finally {
      dispatch(setLoading(false));
    }
  };

  // to create a new task
  const createTask = async (newTask) => {
    if (!newTask) {
      dispatch(setIsCreating(false));
      return;
    }

    dispatch(setLoading(true));
    try {
      const createdTask = await createTaskService(newTask);
      dispatch(createTaskAction(createdTask));
    } catch (err) {
      dispatch(setError(err.message || "Error creating task."));
    } finally {
      dispatch(setLoading(false));
      dispatch(setIsCreating(false));
    }
  };

  // to update an existing task
  const updateTask = async (updatedTask) => {
    dispatch(setLoading(true));
    try {
      const updatedData = await updateTaskService(updatedTask._id, updatedTask);
      dispatch(editTaskAction(updatedData));
    } catch (err) {
      dispatch(setError(err.message || "Error updating task."));
    } finally {
      dispatch(setLoading(false));
    }
  };

  // to delete a task
  const deleteTask = async (taskId) => {
    dispatch(setLoading(true));
    try {
      await deleteTaskService(taskId);
      closeModal();
      dispatch(deleteTaskAction(taskId));
    } catch (err) {
      dispatch(setError(err.message || "Error deleting task."));
    } finally {
      dispatch(setLoading(false));
    }
  };

  // to toggle task completion
  const toggleComplete = async (taskId) => {
    const task = tasks.find((task) => task._id === taskId);
    if (!task) return;

    await updateTask({
      ...task,
      completed: !task.completed,
      completedAt: !task.completed ? new Date().toISOString() : null,
    });
  };

  return {
    fetchTasks,
    fetchTaskById,
    createTask,
    updateTask,
    deleteTask,
    toggleComplete,
    setIsCreating: (isCreating) => dispatch(setIsCreating(isCreating)),
    isCreating,
  };
};
