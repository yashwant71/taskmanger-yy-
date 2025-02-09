import PropTypes from "prop-types";

const SearchAndFilter = ({
  callfetchTasks,
  setSortOption,
  sortOption,
  setSearchQuery,
  searchQuery,
  setStatusFilter,
  statusFilter,
}) => {
  const handleSearch = () => {
    // Trigger search based on searchQuery and filters
    callfetchTasks({
      search: searchQuery,
      sort: sortOption,
      status: statusFilter,
    });
  };

  const handleSortChange = async (e) => {
    const selectedSort = e.target.value;
    setSortOption(selectedSort); // Update the local state
    await callfetchTasks({
      search: searchQuery,
      sort: selectedSort,
      status: statusFilter,
    }); // Ensure tasks are fetched before proceeding
  };

  const handleStatusChange = async (e) => {
    const selectedStatus = e.target.value;
    setStatusFilter(selectedStatus); // Update the local state
    await callfetchTasks({
      search: searchQuery,
      sort: sortOption,
      status: selectedStatus,
    }); // Fetch tasks based on the selected status
  };

  return (
    <>
      <div className="flex flex-col gap-4 mb-4">
        <div className="flex items-center gap-2">
          <input
            type="text"
            placeholder="Search tasks"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)} // Only updates state
            className="input-base w-full"
          />
          <button onClick={handleSearch} className="btn-primary p-2 rounded-md">
            Search
          </button>
        </div>
      </div>
      <div className="flex justify-between items-center mb-4">
        <select
          value={statusFilter}
          onChange={handleStatusChange}
          className="input border p-2 rounded-md"
        >
          <option value="all">All Tasks</option>
          <option value="completed">Completed</option>
          <option value="pending">Pending</option>
        </select>
        <select
          value={sortOption}
          onChange={handleSortChange} // Handle the sort change
          className="input border p-2 rounded-md"
        >
          <option value="">None</option>
          <option value="dueDate">Due Date</option>
          <option value="priority">Priority</option>
        </select>
      </div>
    </>
  );
};

// Add PropTypes validation
SearchAndFilter.propTypes = {
  callfetchTasks: PropTypes.func.isRequired, // Must be a function
  setIsCreating: PropTypes.func.isRequired, // Must be a function
  setSortOption: PropTypes.func.isRequired, // Must be a function
  setSearchQuery: PropTypes.func.isRequired, // Must be a function
  setStatusFilter: PropTypes.func.isRequired, // Must be a function
  sortOption: PropTypes.string.isRequired, // Must be a string
  searchQuery: PropTypes.string.isRequired, // Must be a string
  statusFilter: PropTypes.string.isRequired, // Must be a string
};

export default SearchAndFilter;
