import PropTypes from "prop-types";
import TaskCompactView from "./TaskCompactView";
import { useUiStateActions } from "../hooks/useUiStateActions";

const UpcomingDeadlines = ({ tasks }) => {
  // Filter tasks with due dates in the future
  const { openModal } = useUiStateActions();
  const upcomingTasks = tasks
    .filter((task) => task.dueDate && new Date(task.dueDate) > new Date())
    .sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate)); // Sort by nearest deadline

  if (upcomingTasks.length === 0) {
    return <p className="text-gray-500 text-sm mt-4">No upcoming deadlines!</p>;
  }

  return (
    <div className="mt-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">
        Upcoming Deadlines
      </h3>
      <ul className="space-y-3">
        {upcomingTasks.map((task, id) => (
          <TaskCompactView
            task={task}
            key={id}
            setIsModalOpen={() => openModal(task._id)}
          />
        ))}
      </ul>
    </div>
  );
};

UpcomingDeadlines.propTypes = {
  tasks: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string,
      title: PropTypes.string,
      dueDate: PropTypes.string,
      priority: PropTypes.oneOf([1, 2, 3]),
    })
  ).isRequired,
};

export default UpcomingDeadlines;
