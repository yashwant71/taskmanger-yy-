import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  error: null,
  isCreating: false,
  isModalOpen: false,
  selectedTaskId: null, // Track which task is selected
};

const UIStateSlice = createSlice({
  name: "UIState",
  initialState,
  reducers: {
    // Sets the loading state
    setLoading: (state, action) => {
      state.loading = action.payload;
    },

    // Sets the error state
    setError: (state, action) => {
      state.error = action.payload;
    },

    // Sets the creating state
    setIsCreating: (state, action) => {
      state.isCreating = action.payload;
    },

    // Sets the modal state
    setIsModalOpen: (state, action) => {
      state.isModalOpen = action.payload.open;
      state.selectedTaskId = action.payload.taskId || null; // Set selected task
    },

    // Clears the error state
    clearError: (state) => {
      state.error = null;
    },
  },
});

// Exporting actions
export const {
  setLoading,
  setError,
  clearError,
  setIsCreating,
  setIsModalOpen,
} = UIStateSlice.actions;

export default UIStateSlice.reducer;
