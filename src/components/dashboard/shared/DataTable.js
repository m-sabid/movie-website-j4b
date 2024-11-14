import {
  FaEdit,
  FaTrashAlt,
  FaSortAlphaDown,
  FaSortAlphaUpAlt,
} from "react-icons/fa";
import { useContext, useEffect, useState } from "react";
import { ThemeContext } from "@/providers/colors/GlobalColors";

const DataTable = ({ data, columns, onEdit, onDelete }) => {

  const {colors} = useContext(ThemeContext)

  const [sortOrder, setSortOrder] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [paginatedData, setPaginatedData] = useState([]);
  const [itemsPerPage, setItemsPerPage] = useState(5); // Default value is 5

  // Toggle sorting order for the specific column
  const toggleSortOrder = (field) => {
    setSortOrder((prevState) => {
      const currentOrder = prevState[field];
      const newOrder = currentOrder === "asc" ? "desc" : "asc";
      return { ...prevState, [field]: newOrder };
    });
  };

  // Update the number of items per page when Enter is pressed or the form is submitted
  const handleItemsPerPageSubmit = (e) => {
    if (e.key === "Enter" || e.type === "submit") {
      const value = parseInt(e.target.value, 10);
      if (!isNaN(value) && value > 0) {
        setItemsPerPage(value);
        setCurrentPage(1); // Reset to the first page when items per page changes
      } else {
        e.target.value = itemsPerPage; // Reset to previous value if invalid input
      }
    }
  };

  // Calculate and update paginated data on client
  useEffect(() => {
    const sortedData = [...data].sort((a, b) => {
      const field = columns[0].field;
      const order = sortOrder[field] || "asc"; // Default to ascending
      return order === "asc"
        ? a[field].localeCompare(b[field])
        : b[field].localeCompare(a[field]);
    });

    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentData = sortedData.slice(startIndex, startIndex + itemsPerPage);
    setPaginatedData(currentData);
  }, [data, sortOrder, currentPage, columns, itemsPerPage]);

  return (
    <div className="overflow-x-auto">
      <table className="table rounded-md text-white" style={{backgroundColor:colors.mo_primary}}>
        <thead>
          <tr className="text-white">
            <th>SN</th>
            {columns.map((col, index) => (
              <th key={index} className="flex items-center">
                {col.header}
                {col.field && (
                  <button
                    onClick={() => toggleSortOrder(col.field)}
                    className="ml-2 text-xl"
                  >
                    {sortOrder[col.field] === "asc" ? (
                      <FaSortAlphaUpAlt />
                    ) : (
                      <FaSortAlphaDown />
                    )}
                  </button>
                )}
              </th>
            ))}
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {paginatedData && paginatedData.length > 0 ? (
            paginatedData.map((item, index) => (
              <tr key={item._id}>
                <td className="text-md">
                  {(currentPage - 1) * itemsPerPage + index + 1}
                </td>
                {columns.map((col, colIndex) => (
                  <td key={colIndex} className="capitalize text-md">
                    {item[col.field]}
                  </td>
                ))}
                <td className="text-md cursor-pointer">
                  <button
                    className="py-2 px-4 rounded-md hover:bg-gray-600"
                    onClick={() => onEdit(item._id)}
                  style={{backgroundColor:colors.mo_db_primary}}
                  >
                    <FaEdit />
                  </button>
                </td>
                <td className="text-md cursor-pointer">
                  <button
                    className="py-2 px-4 rounded-md hover:bg-gray-600"
                    onClick={() => onDelete(item._id)}
                  style={{backgroundColor:colors.mo_db_primary}}
                  >
                    <FaTrashAlt />
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={columns.length + 3} className="text-center">
                <span className="loading loading-bars loading-lg"></span>
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Pagination Controls */}
      <div className="flex justify-between items-center mt-4 space-x-2">
        <div>
          <label className="text-white">Items per page:</label>
          <input
            type="number"
            defaultValue={itemsPerPage}
            onKeyDown={handleItemsPerPageSubmit}
            onBlur={handleItemsPerPageSubmit} // Handle submit on blur as well
            min="1"
            className="ml-2 p-2 text-white rounded-md"
            // Make sure the value can't be cleared by the user
            onInput={(e) => e.preventDefault()}
          />
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={() =>
              setCurrentPage((prevPage) => Math.max(prevPage - 1, 1))
            }
            disabled={currentPage === 1}
            className="bg-blue-500 py-2 px-4 rounded-md hover:bg-blue-600 disabled:bg-gray-300 text-white font-semibold transition duration-200"
          >
            Previous
          </button>
          <span className="text-white">
            Page {currentPage} of {Math.ceil(data.length / itemsPerPage)}
          </span>
          <button
            onClick={() =>
              setCurrentPage((prevPage) =>
                Math.min(prevPage + 1, Math.ceil(data.length / itemsPerPage))
              )
            }
            disabled={currentPage === Math.ceil(data.length / itemsPerPage)}
            className="bg-blue-500 py-2 px-4 rounded-md hover:bg-blue-600 disabled:bg-gray-300 text-white font-semibold transition duration-200"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default DataTable;
