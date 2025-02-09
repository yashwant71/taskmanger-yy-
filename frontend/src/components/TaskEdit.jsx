import { useState } from "react";
import { Check, X } from "lucide-react";
import PropTypes from "prop-types";
import { TaskPropType } from "../utils/propTypes";

export const TaskForm = ({
  task = {},
  onSave = () => {},
  onCancel = () => {},
  isCreateMode = false,
}) => {
  const [editedTask, setEditedTask] = useState({
    title: task?.title || "",
    description: task?.description || "",
    priority: task?.priority || 2, // Default to Medium priority
    dueDate: task?.dueDate || "",
    ...task,
  });
  const [errors, setErrors] = useState({});
  const requiredFields = ["title", "dueDate"];

  const validateForm = () => {
    const newErrors = {};

    requiredFields.forEach((field) => {
      if (!editedTask[field] || editedTask[field].toString().trim() === "") {
        newErrors[field] = `${
          field.charAt(0).toUpperCase() + field.slice(1)
        } is required.`;
      }
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (validateForm()) {
      onSave(editedTask);
    }
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleSave();
      }}
      className="card-base"
    >
      <div className="space-y-4">
        <div>
          <input
            type="text"
            value={editedTask.title || ""}
            onChange={(e) =>
              setEditedTask({ ...editedTask, title: e.target.value })
            }
            className="input-base"
            placeholder="Task title"
          />
          {errors.title && (
            <p className="text-red-500 text-sm mt-1">{errors.title}</p>
          )}
        </div>

        <textarea
          value={editedTask.description || ""}
          onChange={(e) =>
            setEditedTask({ ...editedTask, description: e.target.value })
          }
          className="input-base"
          rows="2"
          placeholder="Task description"
        />

        <div className="flex gap-4">
          <select
            value={editedTask.priority || 2} // Default to Medium (2)
            onChange={(e) =>
              setEditedTask({
                ...editedTask,
                priority: parseInt(e.target.value),
              })
            }
            className="input-base"
          >
            <option value={1}>Low</option>
            <option value={2}>Medium</option>
            <option value={3}>High</option>
          </select>

          <div>
            <input
              type="date"
              value={
                editedTask.dueDate
                  ? new Date(editedTask.dueDate).toISOString().split("T")[0]
                  : ""
              }
              onChange={(e) =>
                setEditedTask({
                  ...editedTask,
                  dueDate: e.target.value,
                })
              }
              className="input-base"
            />
            {errors.dueDate && (
              <p className="text-red-500 text-sm mt-1">{errors.dueDate}</p>
            )}
          </div>
        </div>

        <div className="flex justify-end gap-2">
          <button
            type="button"
            onClick={onCancel}
            className="btn-secondary flex items-center"
          >
            <X className="w-4 h-4 mr-1" />
            Cancel
          </button>
          <button type="submit" className="btn-primary flex items-center">
            <Check className="w-4 h-4 mr-1" />
            {isCreateMode ? "Create" : "Save"}
          </button>
        </div>
      </div>
    </form>
  );
};

TaskForm.propTypes = {
  task: TaskPropType,
  onSave: PropTypes.func,
  onCancel: PropTypes.func,
  isCreateMode: PropTypes.bool,
};
