import { createSlice } from "@reduxjs/toolkit";
// import { current } from "immer";

const initialState = {
  tasks: [],
  // detailedTask: undefined,
};

const TasksSlice = createSlice({
  name: "Tasks",
  initialState,
  reducers: {
    // Sets the entire tasks array
    setTasksAction: (state, action) => {
      state.tasks = action.payload;
    },

    // Adds a new task to the tasks array
    createTaskAction: (state, action) => {
      state.tasks.push(action.payload);
    },

    // Edits an existing task in the tasks array
    editTaskAction: (state, action) => {
      const updatedTask = action.payload;
      const index = state.tasks.findIndex(
        (task) => task._id === updatedTask._id
      );

      if (index !== -1) {
        state.tasks[index] = { ...state.tasks[index], ...updatedTask };
        // state.tasks = [...state.tasks];  
      }
    },

    // Sets the entire tasks array
    // setDetailedTaskAction: (state, action) => {
    //   state.detailedTask = action.payload;
    // },

    // Deletes a task from the tasks array
    deleteTaskAction: (state, action) => {
      const id = action.payload;
      state.tasks = state.tasks.filter((task) => task._id !== id);
    },
  },
});

// Exporting actions for use in components or thunks
export const {
  setTasksAction,
  createTaskAction,
  editTaskAction,
  deleteTaskAction,
  // setDetailedTaskAction,
} = TasksSlice.actions;

// export const selectTasks = (state) => state.Tasks;

export default TasksSlice.reducer;
