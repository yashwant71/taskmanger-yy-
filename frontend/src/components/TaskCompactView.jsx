import PropTypes from "prop-types";
import { Calendar } from "lucide-react";
import { TaskPropType } from "../utils/propTypes";

const TaskCompactView = ({ task, setIsModalOpen }) => {
  return (
    <li
      className="flex items-center justify-between p-3 bg-white shadow-md rounded-md border-l-4 border-blue-500 cursor-pointer"
      onClick={() => setIsModalOpen()}
    >
      <div>
        <p className="text-gray-800 font-medium">{task.title}</p>
        <div className="flex items-center text-gray-500 text-sm">
          <Calendar className="w-4 h-4 mr-1" />
          {new Date(task.dueDate).toLocaleDateString()}
        </div>
      </div>
      <span
        className={`px-2 py-1 text-xs font-semibold rounded-md ${
          task.priority === 3
            ? "bg-status-high text-white"
            : task.priority === 2
            ? "bg-status-medium text-white"
            : "bg-status-low text-white"
        }`}
      >
        {task.priority === 3 ? "High" : task.priority === 2 ? "Medium" : "Low"}
      </span>
    </li>
  );
};

TaskCompactView.propTypes = {
  task: TaskPropType,
  setIsModalOpen: PropTypes.func,
};

export default TaskCompactView;
