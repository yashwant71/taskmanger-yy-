import { Plus, Home, List } from "lucide-react"; // List icon for "My Tasks"
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

export default function Header({ onCreateTask, isDashboard }) {
  const navigate = useNavigate();

  return (
    <header className="flex items-center justify-between text-2xl font-bold text-white bg-gray-800 py-4 px-6 rounded-md shadow-md w-full max-w-md">
      {/* Left Button: Dynamic based on isDashboard */}
      <button
        onClick={() => navigate(isDashboard ? "/myTasks" : "/dashboard")}
        className="text-white hover:text-blue-400 transition-colors p-2 bg-gray-700 hover:bg-gray-600 rounded-lg"
        aria-label={isDashboard ? "Go to My Tasks" : "Go to Dashboard"}
        title={isDashboard ? "My Tasks" : "Dashboard"}
      >
        {isDashboard ? (
          <List className="w-6 h-6" />
        ) : (
          <Home className="w-6 h-6" />
        )}
      </button>

      {/* Header Title: Always centered */}
      <div className="flex-grow flex justify-center">
        <span>{isDashboard ? "Dashboard" : "Your Tasks"}</span>
      </div>

      {/* Right Button: Fixed width for layout consistency */}
      <div
        className="flex items-center justify-center"
        style={{ width: "2.5rem" }} // Fixed width allocated
      >
        {!isDashboard && (
          <button
            onClick={onCreateTask}
            className="text-white hover:text-green-400 transition-colors p-2 bg-gray-700 hover:bg-gray-600 rounded-lg"
            aria-label="Create Task"
            title="Create Task"
          >
            <Plus className="w-6 h-6" />
          </button>
        )}
      </div>
    </header>
  );
}

Header.propTypes = {
  onCreateTask: PropTypes.func, // Function to handle creating a task
  isDashboard: PropTypes.bool, // Flag to indicate if it's the dashboard view
};

Header.defaultProps = {
  onCreateTask: () => {}, // Provide a default no-op function
};
