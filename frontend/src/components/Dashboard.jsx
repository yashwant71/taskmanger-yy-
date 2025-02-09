import Header from "./header";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import TaskDistributionChart from "./charts/TaskDistributionChart";
import CompletionRateChart from "./charts/CompletionRateChart";
import UpcomingDeadlines from "./upcomingDeadlineTask";
import { useTaskActions } from "../hooks/useTaskActions";
import Modal from "./common/Modal";
import TaskDetailedView from "./TaskDetailedView";
import { useUiStateActions } from "../hooks/useUiStateActions";

const Dashboard = () => {
  const tasks = useSelector((state) => state.tasks.tasks) ?? []; // to access tasks from Redux state
  const { isModalOpen, selectedTaskId, error } = useSelector(
    (state) => state.uiState
  );
  const { closeModal } = useUiStateActions();
  const { fetchTasks } = useTaskActions();

  // Initial fetch on mount
  useEffect(() => {
    fetchTasks({
      params: {}, // Initial fetch with no parameters
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Calculate task distribution by priority
  const taskDistribution = [
    {
      name: "High",
      value: tasks.filter((task) => task.priority === 3).length,
    },
    {
      name: "Medium",
      value: tasks.filter((task) => task.priority === 2).length,
    },
    {
      name: "Low",
      value: tasks.filter((task) => task.priority === 1).length,
    },
  ];

  // Preparing data for completion rate chart
  const completionRateData = tasks
    .filter((task) => task.completed && task.completedAt) // Only including completed tasks with a completedAt date
    .sort((a, b) => new Date(a.completedAt) - new Date(b.completedAt)) // Sort by completion date
    .reduce((acc, task, index) => {
      const date = new Date(task.completedAt).toLocaleDateString(); // Format the date
      const existing = acc.find((item) => item.date === date);
      if (existing) {
        existing.completed += 1; // Incrementing completed count for the same date
      } else {
        acc.push({ date, completed: index + 1 }); // Adding new date entry
      }
      return acc;
    }, []);

  if (error) return <p>{error}</p>;

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100 p-4">
      <Header isDashboard={true} />
      <div className="mt-6 w-full max-w-md">
        {/* Task Distribution Chart */}
        <TaskDistributionChart taskDistribution={taskDistribution} />

        {/* Completion Rate Chart */}
        <CompletionRateChart completionRateData={completionRateData} />

        {/* Upcoming Deadlines */}
        <UpcomingDeadlines tasks={tasks} />
      </div>

      {/* Modal for Task Details */}
      {!!(isModalOpen && selectedTaskId) && (
        <Modal onClose={closeModal}>
          <TaskDetailedView
            task={tasks.find((task) => task._id === selectedTaskId)}
            onClose={closeModal}
          />
        </Modal>
      )}
    </div>
  );
};

export default Dashboard;
