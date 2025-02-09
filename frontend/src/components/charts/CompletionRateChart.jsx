import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import PropTypes from "prop-types";

export default function CompletionRateChart({ completionRateData }) {
  return (
    <div className="w-full max-w-lg">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">
        Completion Rate
      </h2>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={completionRateData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="completed" stroke="#82ca9d" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

CompletionRateChart.propTypes = {
  completionRateData: PropTypes.arrayOf(
    PropTypes.shape({
      date: PropTypes.string.isRequired,
      completed: PropTypes.number.isRequired,
    })
  ).isRequired,
};
