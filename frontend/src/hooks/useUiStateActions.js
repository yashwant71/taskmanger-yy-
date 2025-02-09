import { useDispatch } from "react-redux";
import { setIsModalOpen } from "../store/reducers/uiState";
// import { setDetailedTaskAction } from "../store/reducers/task";
export const useUiStateActions = () => {
  const dispatch = useDispatch();

  const openModal = (taskId) => {
    dispatch(setIsModalOpen({ open: true, taskId: taskId }));
  };

  const closeModal = () => {
    dispatch(setIsModalOpen({ open: false, task: null }));
    // dispatch(setDetailedTaskAction());
  };

  return {
    openModal,
    closeModal,
  };
};
