import { Calendar, Edit2, Trash2 } from "lucide-react";
import PropTypes from "prop-types";
import { TaskForm } from "./TaskEdit";
import { useEffect, useState } from "react";
import { useTaskActions } from "../hooks/useTaskActions";
import { TaskPropType } from "../utils/propTypes";

const TaskDetailedView = ({ task, onClose }) => {
  const {
    createTask,
    updateTask,
    deleteTask,
    toggleComplete,
    fetchTaskById,
    isCreating,
  } = useTaskActions();

  const [isEditing, setIsEditing] = useState(isCreating);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const getDetailedTask = async () => {
      try {
        setLoading(true);
        await fetchTaskById(task._id);
      } catch (error) {
        console.error("Error fetching task details:", error);
      } finally {
        setLoading(false);
      }
    };
    if (task && !task.description) {
      getDetailedTask();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [task?._id]);

  if (!task && !isCreating) return null;

  const getPriorityColor = (priority = 2) => {
    const colors = {
      3: "bg-status-high",
      2: "bg-status-medium",
      1: "bg-status-low",
    };
    return colors[priority] || "bg-text-muted";
  };

  const getPriorityLabel = (priority = 2) => {
    const labels = {
      3: "High",
      2: "Medium",
      1: "Low",
    };
    return labels[priority] || "Medium";
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (isEditing || isCreating) {
    return (
      <TaskForm
        task={task}
        onSave={(updatedTask) => {
          if (isCreating) {
            createTask(updatedTask);
          } else {
            updateTask(updatedTask);
          }
          setIsEditing(false);
        }}
        onCancel={() => {
          if (isCreating) {
            createTask(null);
          } else {
            setIsEditing(false);
          }
        }}
        isCreateMode={isCreating}
      />
    );
  }

  return (
    <div className="card-base p-4 shadow-lg rounded-md">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={task.completed}
            onChange={() => toggleComplete(task._id)}
            className="w-6 h-6 bg-white border border-gray-300 rounded-md cursor-pointer"
          />
          <h3
            className={`text-lg font-semibold ${
              task.completed
                ? "line-through text-text-muted"
                : "text-text-primary"
            }`}
          >
            {task.title || "Untitled task"}
          </h3>
        </div>
        <span
          className={`px-2 py-1 text-sm text-bg-main rounded-md ${getPriorityColor(
            task.priority
          )}`}
        >
          {getPriorityLabel(task.priority)}
        </span>
      </div>

      <div className="mb-4">
        <p className="text-text-secondary mb-2">
          {task.description || "No description provided"}
        </p>
        <div className="flex items-center text-text-muted text-sm">
          <Calendar className="w-4 h-4 mr-1" />
          {task.dueDate
            ? new Date(task.dueDate).toLocaleDateString()
            : "No due date"}
        </div>
      </div>

      <div className="flex justify-between items-center">
        <div className="flex gap-2">
          <button
            className="btn-icon text-text-secondary hover:bg-bg-hover"
            onClick={() => setIsEditing(true)}
            aria-label="Edit task"
          >
            <Edit2 className="w-4 h-4" color={"green"} />
          </button>
          <button
            className="btn-icon text-status-high hover:bg-bg-hover"
            onClick={() => deleteTask(task._id)}
            aria-label="Delete task"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
        <button className="btn-secondary   " onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
};

TaskDetailedView.propTypes = {
  task: TaskPropType,
  onEdit: PropTypes.func,
  onDelete: PropTypes.func,
  onToggleComplete: PropTypes.func,
  onCreate: PropTypes.func,
  isCreateMode: PropTypes.bool,
  onClose: PropTypes.func,
};

export default TaskDetailedView;
