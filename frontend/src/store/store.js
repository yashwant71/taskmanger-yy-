import { configureStore } from "@reduxjs/toolkit";
import tasks from "./reducers/task";
import uiStateReducer from "./reducers/uistate";

export const store = configureStore({
  reducer: {
    tasks: tasks,
    uiState: uiStateReducer,
  },
});
