import { useEffect, useState } from "react";
import Header from "./header";
import SearchAndFilter from "./Filters";
import { useSelector } from "react-redux";
import { useTaskActions } from "../hooks/useTaskActions";
import Modal from "./common/Modal";
import { useUiStateActions } from "../hooks/useUiStateActions";
import TaskDetailedView from "./TaskDetailedView";
import TaskCompactView from "./TaskCompactView";

const Tasks = () => {
  const { fetchTasks, setIsCreating } = useTaskActions();
  const { closeModal, openModal } = useUiStateActions();

  const tasks = useSelector((state) => state.tasks.tasks) ?? [];
  const { isModalOpen, selectedTaskId, isCreating, error } = useSelector(
    (state) => state.uiState
  );

  const [sortOption, setSortOption] = useState(""); // For sorting
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  // Initial fetch on mount
  useEffect(() => {
    fetchTasks(); // Initial fetch with no parameters
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (error) return <p>{error}</p>;
  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100 p-4">
      <Header onCreateTask={() => setIsCreating(true)} />
      <div className="mt-6 w-full max-w-md">
        <div className="space-y-4">
          <SearchAndFilter
            callfetchTasks={fetchTasks}
            setSearchQuery={setSearchQuery}
            setSortOption={setSortOption}
            searchQuery={searchQuery}
            sortOption={sortOption}
            setStatusFilter={setStatusFilter}
            statusFilter={statusFilter}
          />

          {isCreating && (
            <Modal onClose={closeModal}>
              <TaskDetailedView onClose={closeModal} />
            </Modal>
          )}
          {tasks && tasks.length > 0 ? (
            tasks.map((task, id) => (
              <TaskCompactView
                task={task}
                setIsModalOpen={() => openModal(task._id)}
                key={id}
              />
            ))
          ) : (
            <p>No tasks available.</p>
          )}
        </div>
      </div>

      {/* Modal for Task Details */}
      {!!(isModalOpen && selectedTaskId) && (
        <Modal onClose={closeModal}>
          <TaskDetailedView
            task={tasks.find((task) => task._id === selectedTaskId) ?? {}}
            onClose={closeModal}
          />
        </Modal>
      )}
    </div>
  );
};
export default Tasks;
