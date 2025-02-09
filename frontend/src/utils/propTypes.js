import PropTypes from "prop-types";

// Updated PropTypes
export const TaskPropType = PropTypes.shape({
  _id: PropTypes.string,
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  dueDate: PropTypes.instanceOf(Date).isRequired,
  priority: PropTypes.oneOf([1, 2, 3]).isRequired, // Use numbers for priority
  completed: PropTypes.bool,
  completedAt: PropTypes.instanceOf(Date),
});
