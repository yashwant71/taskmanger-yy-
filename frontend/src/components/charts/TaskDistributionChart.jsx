import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import PropTypes from "prop-types";

const COLORS = [
  "var(--color-status-high)",
  "var(--color-status-medium)",
  "var(--color-status-low)",
]; // Colors for the pie chart

export default function TaskDistributionChart({ taskDistribution }) {
  return (
    <div className="w-full max-w-lg mb-8">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">
        Task Distribution
      </h2>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={taskDistribution}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={100}
            fill="#8884d8"
            label
          >
            {taskDistribution.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

TaskDistributionChart.propTypes = {
  taskDistribution: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      value: PropTypes.number.isRequired,
    })
  ).isRequired,
};
